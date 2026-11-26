// SPDX-License-Identifier: GPL-3.0-or-later
// providers/chatgpt.js - the ChatGPT (chatgpt.com / chat.openai.com) provider.
// Exports the same ZSProvider interface as providers/deepseek.js and gemini.js;
// the core (core/main.js) is provider-agnostic. To DISABLE ChatGPT support,
// remove this file from manifest.json (and its URLs from background.js
// PROVIDER_URLS + core/main.js AI_SITES).
//
// ChatGPT DOM notes (validated live, 2026-10):
//  - React (Next.js) app. One turn = an element carrying
//    `data-message-author-role` = "user" | "assistant". Turns live inside
//    `article[data-testid^="conversation-turn"]`, but the author-role node is the
//    stable, virtualization-tolerant handle we use for everything.
//  - Each message also carries `data-message-id` (a stable per-turn uuid), which
//    we expose as lastAssistantId so the core's watcher can tell a genuinely NEW
//    reply exists even when the virtual list recycles old turns.
//  - The assistant answer markdown is `.markdown` (prose). It contains fenced
//    code as a real <pre>/<code> whose textContent preserves newlines (no
//    CodeMirror/Monaco virtualization), so the command JSON/###CS### survives
//    intact.
//  - The composer is a ProseMirror contenteditable `<div id="prompt-textarea">`
//    (older builds shipped a <textarea> of the same id - we handle both). Text is
//    injected with a NATIVE PASTE of text/plain (ProseMirror handles multi-
//    paragraph paste natively: fast and faithful, keeps code fences and blank
//    lines intact - the line-by-line execCommand path is only a fallback).
//  - Send = `button[data-testid="send-button"]`; while generating it is REPLACED
//    by `button[data-testid="stop-button"]` for the WHOLE stream, so stop-button
//    present == generating (start to end). Growth tracking is the belt-and-braces
//    tail guard.
//  - Truncation shows a "Continue generating" button (no stable testid) - matched
//    by its visible label.
//  - Conversation URL is /c/<uuid>; a fresh chat is exactly "/".
// eslint-disable-next-line no-unused-vars
const ZSProvider = (() => {
  "use strict";
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let diag = () => {}; // injected by core via init()

  const S = {
    userItem: '[data-message-author-role="user"]',
    assistantItem: '[data-message-author-role="assistant"]',
    anyItem: '[data-message-author-role="user"], [data-message-author-role="assistant"]',
    reply: ".markdown",
    // The composer. Current builds: a ProseMirror contenteditable div. Older
    // builds: a <textarea id="prompt-textarea">. getEditor() returns whichever
    // exists; typeAndSend branches on the tag name.
    editor: "#prompt-textarea",
    editorAlt: 'div.ProseMirror[contenteditable="true"], textarea[data-id], textarea',
    sendBtn: 'button[data-testid="send-button"]',
    stopBtn: 'button[data-testid="stop-button"]',
    copyBtn: '[data-testid="copy-turn-action-button"]',
    // Fenced code block wrapper inside the reply.
    codeWrap: "pre",
    // Reasoning / thinking cards (o-series, GPT-5 thinking). Collapsed by default
    // and often absent from the DOM; excluded from every text read when present so
    // a command merely DRAFTED in the reasoning is never detected or executed.
    thinking: '[data-testid="reasoning"], .reasoning-content, [class*="reasoning"]',
    errorSurfaces:
      '[role="alert"],[class*="toast"],[class*="error"],[data-testid*="error"],[class*="alert"]',
  };

  const RE = {
    contextLimit: new RegExp(
      [
        "conversation.{0,20}(too long|trop long)",
        "context.{0,20}(limit|exceeded|d\\u00e9pass\\u00e9)",
        "please.{0,30}(start|cr\\u00e9er).{0,20}(new|nouveau).{0,20}(chat|conversation)",
        "(token|context).{0,10}limit",
        "message.{0,20}too.{0,10}long",
        "maximum.{0,20}context",
        "this conversation has reached",
      ].join("|"),
      "i"
    ),
    tooLong: /conversation .{0,20}(too long|getting too long|trop longue)/i,
    busy: /something went wrong|an error occurred|une erreur s.est produite|please try again|réessayer plus tard|too many requests|rate.?limit|temporarily unavailable|network error/i,
    continueBtn: /^\s*(continue generating|continuer la génération|continuer|continuar|继续生成)\s*$/i,
  };

  // ChatGPT's stop button is present for the ENTIRE generation (thinking + answer)
  // and clears when it ends, so completion windows can be tight (mirrors Gemini).
  const timings = {
    GEN_IDLE_MS: 1500,
    REASON_IDLE_MS: 12000,
    WARMUP_MS: 45000,
    REASON_NOREPLY_MS: 90000,
    STABLE_MS: 9000,
    RESPONSE_TIMEOUT_MS: 300000,
  };

  // ── Turn classification ───────────────────────────────────────────────────
  const isUserItem = (item) =>
    !!item && item.getAttribute && item.getAttribute("data-message-author-role") === "user";
  const isAssistantItem = (item) =>
    !!item && item.getAttribute && item.getAttribute("data-message-author-role") === "assistant";

  // Walk an element's text, skipping the reasoning subtree and our own chip.
  function textWithout(root, excludeSel) {
    if (!root) return "";
    const skip = S.thinking + ", .zs-chip" + (excludeSel ? ", " + excludeSel : "");
    let t = "";
    const walk = (n) => {
      if (n.nodeType === 3) { t += n.nodeValue; return; }
      if (n.nodeType !== 1) return;
      if (n.matches && n.matches(skip)) return;
      for (const c of n.childNodes) walk(c);
    };
    walk(root);
    return t;
  }

  // The reply body. Prefer the LAST `.markdown` in the assistant message (the
  // answer); broaden to any `class*="markdown"` container if ChatGPT ships a
  // build without the exact class, and only fall back to the whole turn as a
  // last resort (so a command is never missed just because a class was renamed).
  const bodyEl = (item) => {
    if (!item) return null;
    const mds = [...item.querySelectorAll(S.reply)].filter(
      (m) => !(m.closest && m.closest(S.thinking)) && !(m.closest && m.closest(".zs-chip"))
    );
    if (mds.length) return mds[mds.length - 1];
    const alt = [...item.querySelectorAll('[class*="markdown"]')].filter(
      (m) => !(m.closest && m.closest(S.thinking)) && !(m.closest && m.closest(".zs-chip"))
    );
    if (alt.length) return alt[alt.length - 1];
    return item;
  };

  function itemText(item) {
    if (!item) return "";
    if (isAssistantItem(item)) {
      const md = bodyEl(item);
      return md ? textWithout(md) : "";
    }
    return textWithout(item);
  }
  function classifyText(item, excludeSel) {
    if (!item) return "";
    if (isAssistantItem(item)) {
      const md = bodyEl(item);
      if (!md) return "";
      if (excludeSel && md.closest && md.closest(excludeSel)) return "";
      return textWithout(md, excludeSel);
    }
    return textWithout(item, excludeSel);
  }

  // ── DOM primitives ────────────────────────────────────────────────────────
  const allItems = () => [...document.querySelectorAll(S.anyItem)];
  const assistantItems = () => [...document.querySelectorAll(S.assistantItem)];
  const assistantCount = () => assistantItems().length;
  const userCount = () => document.querySelectorAll(S.userItem).length;

  // Scope to the SITE's composer only: skip RelayZero's own injected UI
  // (#zs-root). On login/OAuth pages with no site editor this returns null,
  // keeping the "not on a chat page" guard in the send hooks intact.
  const getEditor = () => {
    for (const e of document.querySelectorAll(S.editor)) {
      if (!e.closest("#zs-root")) return e;
    }
    for (const e of document.querySelectorAll(S.editorAlt)) {
      if (!e.closest("#zs-root")) return e;
    }
    return null;
  };
  const editorText = () => {
    const e = getEditor();
    if (!e) return "";
    if (e.tagName === "TEXTAREA") return e.value != null ? e.value : "";
    return e.textContent || "";
  };

  const lastAssistant = () => {
    const it = assistantItems();
    return it.length ? it[it.length - 1] : null;
  };

  // Stable per-turn identity: the assistant message carries `data-message-id`.
  // Immune to ChatGPT's list virtualization, so the core's "a NEW reply exists"
  // test survives old turns detaching.
  function lastAssistantId() {
    const last = lastAssistant();
    if (!last) return null;
    return last.getAttribute("data-message-id") || null;
  }

  const chatIsEmpty = () => allItems().length === 0;
  // A genuinely fresh chat: the root route with the composer rendered and no
  // turns. A real conversation is /c/<uuid>, so it never gates.
  const isFreshChat = () =>
    chatIsEmpty() && /^\/?$/.test(location.pathname) && !!getEditor();

  // The composer box the Start gate hides as one unit.
  const composerFrame = () => {
    const ed = getEditor();
    if (!ed) return null;
    return ed.closest("form") || ed.parentElement || null;
  };

  // Integrated status bar (same approach as Kimi/GLM/Arena): ChatGPT is a React
  // app that reconciles the composer subtree, so we must NOT insert our #zs-bar
  // into it (a foreign node in a framework-managed parent risks the diff nesting
  // the composer inside the bar). barAnchor() returns the rounded composer CARD;
  // the core's anchored branch keeps the bar in #zs-root, hugs that card's top
  // edge at full width and reserves the strip with padding-top.
  function barAnchor() {
    const ed = getEditor();
    if (!ed) return null;
    let n = ed;
    for (let i = 0; i < 12 && n; i++) {
      if (/rounded/.test(String(n.className || ""))) return n;
      n = n.parentElement;
    }
    return ed.closest("form") || ed.parentElement || null;
  }

  // ── Chip anchor ───────────────────────────────────────────────────────────
  // The assistant message root also carries action chrome; anchor the chip in the
  // reply COLUMN (the reply body's parent) and, with chipAppend, trail it after
  // the reply text so it reads in the model's order and sits BELOW the answer.
  function chipAnchor(item) {
    if (!item) return item;
    const md = bodyEl(item);
    return (md && md !== item && md.parentElement) || item;
  }
  // Keep the chip just BEFORE the copy/thumbs action toolbar when it is a sibling
  // of the markdown, so the chip hugs the reply instead of sinking below buttons.
  function chipTrailRef(item) {
    const anchor = chipAnchor(item);
    if (!anchor || !anchor.children) return null;
    for (const c of anchor.children) {
      if (c.querySelector && c.querySelector(S.copyBtn)) return c;
    }
    return null;
  }

  // ── Input lock ────────────────────────────────────────────────────────────
  // ProseMirror is a contenteditable: flipping contenteditable=false would also
  // block our own injection, so typeAndSend temporarily re-enables it. A
  // <textarea> composer locks with `readonly` (ignored by the native setter).
  let _locked = false;
  function setInputLock(on) {
    _locked = on;
    const ed = getEditor();
    if (!ed) return;
    if (ed.tagName === "TEXTAREA") {
      if (on) {
        if (!ed.dataset.zsPlaceholder) ed.dataset.zsPlaceholder = ed.getAttribute("placeholder") || "";
        ed.setAttribute("readonly", "");
        ed.setAttribute("placeholder", "⏳ Agent working… please wait");
      } else {
        ed.removeAttribute("readonly");
        if (ed.dataset.zsPlaceholder != null) ed.setAttribute("placeholder", ed.dataset.zsPlaceholder);
      }
      return;
    }
    ed.setAttribute("contenteditable", on ? "false" : "true");
    if (on) ed.setAttribute("data-zs-locked", "1");
    else ed.removeAttribute("data-zs-locked");
  }

  // ── Send / stop control ────────────────────────────────────────────────────
  const sendButton = () => {
    const b = document.querySelector(S.sendBtn);
    if (!b) return null;
    if (b.disabled || b.getAttribute("aria-disabled") === "true") return null;
    return b;
  };
  const stopButton = () => document.querySelector(S.stopBtn) || null;

  // ── Generation detection ──────────────────────────────────────────────────
  function streamText(item) {
    if (!item) return "";
    const md = bodyEl(item);
    return md ? textWithout(md, ".zs-chip") : "";
  }
  const streamLen = (item) =>
    streamText(item === undefined ? lastAssistant() : item).length;

  let _streamMax = -1, _streamAt = 0, _streamItem = null;
  function sampleStream() {
    const item = lastAssistant();
    const len = streamText(item).length;
    const now = Date.now();
    if (item !== _streamItem || len < _streamMax - 400) {
      _streamItem = item; _streamMax = len; _streamAt = now; return;
    }
    if (len > _streamMax) { _streamMax = len; _streamAt = now; }
  }
  const grewWithin = (ms) => _streamMax > 1 && Date.now() - _streamAt < ms;

  // The stop button is present for the whole generation (validated pattern); the
  // growth check covers the brief instants around start/end.
  function genActive() {
    sampleStream();
    if (stopButton()) return true;
    return grewWithin(timings.GEN_IDLE_MS);
  }
  const isGenerating = genActive;
  const isBusyNow = genActive;
  const isHardGenerating = () => !!stopButton();

  // ChatGPT exposes no reliable per-turn "stopped" marker → never halted.
  const turnHalted = () => false;

  // Truncation "Continue generating" button (matched by visible label).
  function findContinueBtn() {
    for (const b of document.querySelectorAll("button")) {
      if (b.offsetParent === null) continue;
      const t = (b.innerText || b.textContent || "").trim();
      if (t.length < 40 && RE.continueBtn.test(t)) return b;
    }
    return null;
  }
  function clickContinueBtn() {
    const b = findContinueBtn();
    if (!b) return false;
    try { b.click(); return true; } catch { return false; }
  }

  function snapshot() {
    try {
      const item = lastAssistant();
      const md = bodyEl(item);
      return { th: 0, rp: md ? (md.textContent || "").length : 0 };
    } catch { return {}; }
  }

  function readAssistant() {
    const item = lastAssistant();
    if (!item) return { present: false, reply: "", thinking: "", item: null };
    const md = bodyEl(item);
    return {
      present: true,
      reply: md ? textWithout(md).trim() : "",
      thinking: "",
      item,
    };
  }

  async function waitFor(pred, timeout) {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout) {
      if (pred()) return true;
      await sleep(120);
    }
    return false;
  }

  // ── Sending ───────────────────────────────────────────────────────────────
  // Whitespace-insensitive comparison so ProseMirror's own normalisation never
  // makes us think the text is "different" and re-inject on every retry.
  const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();

  // NATIVE PASTE (preferred): ProseMirror handles a synthetic paste of text/plain
  // natively - fast (single event, even for a 1000-line tool result) and faithful
  // (keeps blank lines + code fences as real paragraphs). The old line-by-line
  // execCommand path was slow on big payloads and could flatten the system
  // prompt's fenced blocks, so the model "didn't read" the instructions.
  function pasteText(ed, text) {
    try {
      const dt = new DataTransfer();
      dt.setData("text/plain", text);
      ed.focus();
      const ev = new ClipboardEvent("paste", {
        clipboardData: dt, bubbles: true, cancelable: true,
      });
      ed.dispatchEvent(ev);
      return true;
    } catch { return false; }
  }

  // FALLBACK injection for ProseMirror when paste doesn't land: select-all then
  // insertText line by line joined with insertLineBreak (soft break). Empty lines
  // skip insertText (an empty insertText collapses the selection).
  function setContentEditableText(ed, text) {
    ed.focus();
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(ed);
    sel.removeAllRanges();
    sel.addRange(range);
    const lines = String(text).split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]) document.execCommand("insertText", false, lines[i]);
      if (i < lines.length - 1) document.execCommand("insertLineBreak");
    }
  }

  // React-controlled <textarea> fallback (older ChatGPT builds): native setter.
  function setTextareaValue(el, v) {
    const proto = window.HTMLTextAreaElement && window.HTMLTextAreaElement.prototype;
    const setter = proto && Object.getOwnPropertyDescriptor(proto, "value");
    if (setter && setter.set) setter.set.call(el, v);
    else el.value = v;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function pressEnter(ed) {
    const o = { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true, cancelable: true };
    ed.dispatchEvent(new KeyboardEvent("keydown", o));
    ed.dispatchEvent(new KeyboardEvent("keyup", o));
  }

  async function typeAndSend(text, images) {
    const ed = getEditor();
    if (!ed) throw new Error("ChatGPT input box not found");
    const isTextarea = ed.tagName === "TEXTAREA";
    const relock = _locked;
    if (!isTextarea && relock) ed.setAttribute("contenteditable", "true");
    try {
      // submitAndGetBase RETRIES this function (up to 4x); only retype if the text
      // is not already there.
      if (norm(editorText()) !== norm(text)) {
        if (isTextarea) {
          setTextareaValue(ed, text);
        } else {
          pasteText(ed, text);
          const ok = await waitFor(() => norm(editorText()) === norm(text), 1500);
          if (!ok) setContentEditableText(ed, text);
        }
      }
      // Attach images LAST, right before the send click - see gemini.js's
      // typeAndSend for why (attaching before retyping the text can sever the
      // site's binding between the pending upload and the message being sent).
      if (images && images.length && !hasPendingAttachment()) {
        try { await attachImages(images); } catch {}
      }
      // Wait for the send button to enable (proof the composer registered the
      // text), then click and CONFIRM the send took (the composer clears the
      // instant ChatGPT accepts it).
      await waitFor(() => !!sendButton(), 4000);
      let sent = false;
      for (let i = 0; i < 4 && !sent; i++) {
        if (isBusyNow()) break; // already generating → accepted
        if (sendButton()) {
          try { sendButton().click(); } catch {}
        } else {
          pressEnter(ed);
        }
        sent = await waitFor(() => norm(editorText()) === "" || isHardGenerating(), 900);
      }
    } finally {
      if (!isTextarea && relock) {
        const e2 = getEditor();
        if (e2) e2.setAttribute("contenteditable", "false");
      }
    }
  }

  function stopGeneration() {
    const b = stopButton();
    if (b) try { b.click(); } catch {}
  }

  // No site modes to enforce (model picker left to the user).
  function enforceComposer() { return { ready: !!getEditor() }; }
  async function ensureComposerReady(reason) {
    diag("mode_ready", { reason, provider: "chatgpt" });
    return { ready: !!getEditor() };
  }

  // ── Error / limit detection (site chrome only) ────────────────────────────
  function scanError() {
    try {
      for (const el of document.querySelectorAll(S.errorSurfaces)) {
        if (el.offsetParent === null) continue;
        if (el.closest(S.anyItem)) continue; // model content, not UI chrome
        const t = (el.innerText || "").trim();
        if (t.length > 8 && t.length < 600 && RE.contextLimit.test(t)) return t.slice(0, 240);
      }
    } catch {}
    if (!getEditor()) return "The input box disappeared (session ended?).";
    return null;
  }
  const isTooLongMsg = (text) => RE.tooLong.test(text);
  const isBusyMsg = (text) => RE.busy.test(text);

  // ── Image attachment (best effort: hidden file input) ─────────────────────
  function fileFromImage(img, i) {
    const mime = img.mimeType || "image/jpeg";
    const bin = atob(img.data);
    const arr = new Uint8Array(bin.length);
    for (let j = 0; j < bin.length; j++) arr[j] = bin.charCodeAt(j);
    const ext = mime.includes("png") ? "png" : "jpg";
    return new File([arr], `zeroscript_${Date.now()}_${i}.${ext}`, { type: mime });
  }
  // The PENDING upload's preview lives in the composer; a SENT image renders in
  // its user turn instead, so scoping the probe to the composer excludes history
  // and a leftover from a PREVIOUS capture never reads as "already pending".
  const pendingPreview = () => {
    const frame = composerFrame();
    if (!frame) return null;
    return frame.querySelector('img[src^="blob:"], img[src^="data:"], [data-testid*="attachment"], [class*="thumbnail"]');
  };
  const hasPendingAttachment = () => !!pendingPreview();
  const fileInputEl = () => {
    const frame = composerFrame();
    const inFrame = frame && frame.querySelector('input[type="file"]');
    return inFrame || document.querySelector('input[type="file"]');
  };
  async function attachImages(images) {
    if (!images || !images.length) return false;
    const inp = fileInputEl();
    if (!inp) { diag("attach.noFileInput"); return false; }
    const dt = new DataTransfer();
    images.forEach((img, i) => { try { dt.items.add(fileFromImage(img, i)); } catch {} });
    if (!dt.items.length) return false;
    try {
      inp.files = dt.files;
      inp.dispatchEvent(new Event("change", { bubbles: true }));
    } catch (e) { diag("attach.setFilesThrew", { msg: String((e && e.message) || e) }); return false; }
    diag("attach.setFiles", { count: dt.items.length });
    // Preview appearing is our success signal (upload continues server-side).
    return await waitFor(hasPendingAttachment, 15000);
  }
  function clearAttachments() {
    try {
      const frame = composerFrame();
      if (!frame) return;
      frame.querySelectorAll('button[aria-label*="emove"], button[aria-label*="elete"], [data-testid*="remove"]')
        .forEach((d) => { try { d.click(); } catch {} });
    } catch {}
  }

  // /c/<uuid> = a real conversation. "/" = a fresh chat with no id yet → ""
  // (transient) so the core never persists it as "started".
  const conversationKey = () => (/^\/?$/.test(location.pathname) ? "" : location.pathname);

  // ── User-send interception ────────────────────────────────────────────────
  function installSendHooks(handlers) {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key !== "Enter" || e.shiftKey || e.isComposing) return;
        const ed = getEditor();
        if (!ed || !ed.contains(e.target)) return;
        if (editorText().trim() === "") return;
        if (handlers.isBlocked()) return;
        if (!handlers.isStarted()) {
          if (!chatIsEmpty()) return; // existing conversation → not ours to gate
          handlers.onBlockedAttempt(); // nudge only; never block plain chat
          return;
        }
        handlers.onUserMessage(assistantCount());
      },
      true
    );

    document.addEventListener(
      "click",
      (e) => {
        if (!getEditor()) return;
        const t = e.target;
        // Stop button = a native stop intent.
        const stop = t && t.closest && t.closest(S.stopBtn);
        if (stop) { handlers.onNativeStop(); return; }
        const btn = t && t.closest && t.closest(S.sendBtn);
        if (!btn) return;
        if (btn.disabled || btn.getAttribute("aria-disabled") === "true") return;
        if (handlers.isBlocked()) return;
        if (!handlers.isStarted()) {
          if (!chatIsEmpty()) return;
          handlers.onBlockedAttempt(); // nudge only; never block plain chat
          return;
        }
        handlers.onUserMessage(assistantCount());
      },
      true
    );
  }

  // ── Tool-block location for camouflage ────────────────────────────────────
  // ChatGPT renders each fenced code block as a real <pre> inside `.markdown`
  // (markers/JSON intact in textContent). React recreates the rendered subtree on
  // stream settle and on the next send (wiping per-element .zs-tool-hide), so also
  // mark the turn (its identity survives) with .zs-cmd-mask; the overlay.css rule
  // keeps recreated code blocks hidden with zero flash. Also catch a stray bare
  // inline command paragraph.
  const CMD_SHAPE = /"(?:command|tool)"\s*:\s*"|###\s*(?:cs|csharp|c#|python|py)|###mcp_tool###/i;
  const STARTS_CMD = /^\s*(?:```(?:json)?\s*)?(?:\{?\s*"(?:command|tool)"\s*:|###\s*(?:cs|csharp|c#|python|py)|###mcp_tool###)/i;
  function findToolBlockSpot(item /*, chip */) {
    const md = bodyEl(item);
    if (!md) return null;
    let hidAny = null;
    md.querySelectorAll(S.codeWrap).forEach((cw) => {
      if (cw.closest(".zs-chip")) return;
      if (CMD_SHAPE.test(cw.textContent || "")) {
        cw.classList.add("zs-tool-hide");
        item.classList.add("zs-cmd-mask");
        hidAny = hidAny || { parent: cw.parentElement, ref: cw };
      }
    });
    [...md.children].forEach((el) => {
      if (el.classList.contains("zs-chip") || el.querySelector(S.codeWrap)) return;
      const t = el.textContent || "";
      if (t.length < 600 && CMD_SHAPE.test(t)) {
        el.classList.add("zs-tool-hide");
        item.classList.add("zs-cmd-mask");
        hidAny = hidAny || { parent: el.parentElement, ref: el };
      }
    });
    // Nested inline-command paragraphs (a command rendered as a plain <p> deep in
    // the markdown, not a code block and not a direct child) - hide any whose text
    // STARTS with a command, at any length.
    md.querySelectorAll("p").forEach((el) => {
      if (el.classList.contains("zs-tool-hide") || el.closest(".zs-chip") ||
          el.closest(S.codeWrap)) return;
      if (STARTS_CMD.test((el.textContent || "").trim())) {
        el.classList.add("zs-tool-hide");
        item.classList.add("zs-cmd-mask");
        hidAny = hidAny || { parent: el.parentElement, ref: el };
      }
    });
    return hidAny;
  }

  return {
    id: "chatgpt",
    displayName: "ChatGPT",
    // GPT-4o / GPT-5 are natively multimodal, so manage_camera is safe to expose
    // here (see main.js BLOCKED_TOOLS gate).
    supportsVision: true,
    timings,
    // Reasoning-area selector, exported so the CORE's raw-command-visible probes
    // exclude it: thinking models quote the command JSON in their reasoning, which
    // the camouflage never hides - without this the core could read it as "raw
    // block still visible" and the chip would flap. No-op when absent.
    thinkingSel: S.thinking,
    // React re-renders the reply subtree on every update, wiping any chip placed
    // inside it. Anchor chips at the turn-element level instead (redirected into
    // the reply column by chipAnchor).
    chipAtItemLevel: true,
    chipAnchor,
    // ChatGPT writes narration THEN the tool call at the end of the turn, so trail
    // the chip after the reply text (chipAppend) - it then sits BELOW the reply,
    // like Qwen/Kimi/GLM. chipTrailRef keeps it just above the copy/thumbs bar.
    chipAppend: true,
    chipTrailRef,
    // Assistant turns expose a stable data-message-id identity (lastAssistantId),
    // so the core's watcher can refuse finalizing before this send's reply exists.
    reliableCounts: true,
    init({ diag: d } = {}) { if (d) diag = d; },
    // turns
    allItems, isUserItem, isAssistantItem, itemText, classifyText,
    assistantCount, userCount, lastAssistant, lastAssistantId, readAssistant,
    streamLen, snapshot,
    // composer / state
    getEditor, editorText, chatIsEmpty, isFreshChat, composerFrame, barAnchor,
    setInputLock, typeAndSend, stopGeneration,
    isGenerating, isBusyNow, isHardGenerating,
    enforceComposer, ensureComposerReady,
    turnHalted, findContinueBtn, clickContinueBtn,
    scanError, isTooLongMsg, isBusyMsg,
    // actions
    attachImages, clearAttachments, conversationKey,
    installSendHooks, findToolBlockSpot,
  };
})();
