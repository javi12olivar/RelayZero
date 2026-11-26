// SPDX-License-Identifier: GPL-3.0-or-later
// providers/claude.js - the Claude (claude.ai) provider.
// Exports the same ZSProvider interface as providers/chatgpt.js and deepseek.js;
// the core (core/main.js) is provider-agnostic. To DISABLE Claude support,
// remove this file from manifest.json (and its URL from background.js
// PROVIDER_URLS + core/main.js AI_SITES).
//
// Claude DOM notes (validated live, 2026-10):
//  - React app. One turn = a `[data-testid="transcript-row"]`; the stable handles
//    we use are `[data-testid="user-message"]` and `[data-testid="assistant-message"]`.
//  - The assistant message carries `data-is-streaming="true"|"false"` - the
//    reliable generating signal (no separate stop-button testid on cold load).
//  - Assistant answer markdown lives in `.font-claude-response` (a `.prose`
//    container); its textContent preserves fenced code/newlines (no Monaco).
//  - The composer is a tiptap/ProseMirror contenteditable div
//    `[data-testid="chat-input"]` (aria-label "Escribe tu mensaje para Claude").
//    Text is injected with a NATIVE PASTE of text/plain (tiptap handles it
//    natively and keeps multi-paragraph/fenced content intact).
//  - Send = `button[data-testid="chat-input-send"]` (disabled while empty).
//  - Conversation URL is /chat/<uuid>; a fresh chat is /new.
// eslint-disable-next-line no-unused-vars
const ZSProvider = (() => {
  "use strict";
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let diag = () => {}; // injected by core via init()

  const S = {
    row: '[data-testid="transcript-row"]',
    userItem: '[data-testid="user-message"]',
    assistantItem: '[data-testid="assistant-message"]',
    anyItem: '[data-testid="user-message"], [data-testid="assistant-message"]',
    reply: '.font-claude-response',
    replyAlt: '.prose, [class*="prose"]',
    editor: '[data-testid="chat-input"]',
    sendBtn: 'button[data-testid="chat-input-send"]',
    copyBtn: '[data-testid="action-bar-copy"]',
    retryBtn: '[data-testid="action-bar-retry"]',
    codeWrap: "pre",
    // Reasoning / thinking cards - excluded from every text read so a command
    // merely drafted in the reasoning is never detected or executed.
    thinking: '[data-testid="thinking"], [class*="thinking"], [class*="reasoning"]',
    errorSurfaces:
      '[role="alert"],[class*="toast"],[class*="error"],[data-testid*="error"],[class*="alert"]',
  };

  const RE = {
    contextLimit: new RegExp(
      [
        "conversation.{0,20}(too long|demasiado larga)",
        "context.{0,20}(limit|exceeded|excedido)",
        "(token|context).{0,10}limit",
        "message.{0,20}too.{0,10}long",
        "maximum.{0,20}context",
        "has alcanzado el l\u00edmite",
      ].join("|"),
      "i"
    ),
    tooLong: /conversation .{0,20}(too long|getting too long|demasiado larga)/i,
    busy: /something went wrong|an error occurred|please try again|int\u00e9ntalo de nuevo|too many requests|rate.?limit|temporarily unavailable|network error/i,
    continueBtn: /^\s*(continue generating|continuar generando|continuar|seguir generando)\s*$/i,
  };

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
    !!item && item.getAttribute && item.getAttribute("data-testid") === "user-message";
  const isAssistantItem = (item) =>
    !!item && item.getAttribute && item.getAttribute("data-testid") === "assistant-message";

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

  const bodyEl = (item) => {
    if (!item) return null;
    const mds = [...item.querySelectorAll(S.reply)].filter(
      (m) => !(m.closest && m.closest(S.thinking)) && !(m.closest && m.closest(".zs-chip"))
    );
    if (mds.length) return mds[mds.length - 1];
    const alt = [...item.querySelectorAll(S.replyAlt)].filter(
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

  const getEditor = () => {
    for (const e of document.querySelectorAll(S.editor)) {
      if (!e.closest("#zs-root")) return e;
    }
    for (const e of document.querySelectorAll('div.ProseMirror[contenteditable="true"]')) {
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

  // Claude exposes no stable per-turn id attribute -> return undefined so the
  // core falls back to the count test (a plain "a new reply exists" check).
  const lastAssistantId = () => undefined;

  const chatIsEmpty = () => allItems().length === 0;
  const isFreshChat = () =>
    chatIsEmpty() && /^\/(new)?\/?$/.test(location.pathname) && !!getEditor();

  const composerFrame = () => {
    const ed = getEditor();
    if (!ed) return null;
    return ed.closest("form") || ed.parentElement || null;
  };

  function barAnchor() {
    const ed = getEditor();
    if (!ed) return null;
    let n = ed;
    for (let i = 0; i < 12 && n; i++) {
      const cls = String(n.className || "");
      // Anchor to the composer CARD (surface background + rounded), NOT the
      // editor’s inner scroll wrapper (which is also "rounded" but would make
      // the reserved strip push the placeholder around inside the input).
      if (/rounded/.test(cls) && /(bg-surface|--cmp-pad-x)/.test(cls)) return n;
      n = n.parentElement;
    }
    return ed.closest("form") || ed.parentElement || null;
  }

  function chipAnchor(item) {
    if (!item) return item;
    const md = bodyEl(item);
    return (md && md !== item && md.parentElement) || item;
  }
  function chipTrailRef(item) {
    const anchor = chipAnchor(item);
    if (!anchor || !anchor.children) return null;
    for (const c of anchor.children) {
      if (c.querySelector && c.querySelector(S.copyBtn)) return c;
    }
    return null;
  }

  // ── Input lock ────────────────────────────────────────────────────────────
  // ProseMirror: flipping contenteditable=false would also block our own
  // injection, so typeAndSend temporarily re-enables it.
  let _locked = false;
  function setInputLock(on) {
    _locked = on;
    const ed = getEditor();
    if (!ed) return;
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
  // Claude swaps the send button's label/role while generating; match a stop
  // control by aria-label/testid heuristics (ES + EN).
  const stopButton = () => {
    for (const b of document.querySelectorAll("button")) {
      const a = (b.getAttribute("aria-label") || "") + " " + (b.getAttribute("data-testid") || "");
      if (/detener|stop|interrump|cancelar respuesta|stop response/i.test(a)) return b;
    }
    return null;
  };

  // ── Generation detection ──────────────────────────────────────────────────
  const streamingMsg = () =>
    document.querySelector('[data-testid="assistant-message"][data-is-streaming="true"]');
  const isHardGenerating = () => !!streamingMsg() || !!stopButton();

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

  function genActive() {
    sampleStream();
    if (isHardGenerating()) return true;
    return grewWithin(timings.GEN_IDLE_MS);
  }
  const isGenerating = genActive;
  const isBusyNow = genActive;

  const turnHalted = () => false;

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
  const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();

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

  function pressEnter(ed) {
    const o = { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true, cancelable: true };
    ed.dispatchEvent(new KeyboardEvent("keydown", o));
    ed.dispatchEvent(new KeyboardEvent("keyup", o));
  }

  async function typeAndSend(text, images) {
    const ed = getEditor();
    if (!ed) throw new Error("Claude input box not found");
    const relock = _locked;
    if (relock) ed.setAttribute("contenteditable", "true");
    try {
      if (norm(editorText()) !== norm(text)) {
        pasteText(ed, text);
        const ok = await waitFor(() => norm(editorText()) === norm(text), 1500);
        if (!ok) setContentEditableText(ed, text);
      }
      if (images && images.length && !hasPendingAttachment()) {
        try { await attachImages(images); } catch {}
      }
      await waitFor(() => !!sendButton(), 4000);
      let sent = false;
      for (let i = 0; i < 4 && !sent; i++) {
        if (isBusyNow()) break;
        if (sendButton()) {
          try { sendButton().click(); } catch {}
        } else {
          pressEnter(ed);
        }
        sent = await waitFor(() => editorText().trim() === "" || isHardGenerating(), 900);
      }
    } finally {
      if (relock) {
        const e2 = getEditor();
        if (e2) e2.setAttribute("contenteditable", "false");
      }
    }
  }

  function stopGeneration() {
    const b = stopButton();
    if (b) try { b.click(); } catch {}
  }

  function enforceComposer() { return { ready: !!getEditor() }; }
  async function ensureComposerReady(reason) {
    diag("mode_ready", { reason, provider: "claude" });
    return { ready: !!getEditor() };
  }

  // ── Error / limit detection ───────────────────────────────────────────────
  function scanError() {
    try {
      for (const el of document.querySelectorAll(S.errorSurfaces)) {
        if (el.offsetParent === null) continue;
        if (el.closest(S.anyItem)) continue;
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
    return await waitFor(hasPendingAttachment, 15000);
  }
  function clearAttachments() {
    try {
      const frame = composerFrame();
      if (!frame) return;
      frame.querySelectorAll('button[aria-label*="emove"], button[aria-label*="liminar"], button[aria-label*="elete"], [data-testid*="remove"]')
        .forEach((d) => { try { d.click(); } catch {} });
    } catch {}
  }

  // /chat/<uuid> = a real conversation. /new = a fresh chat (transient).
  const conversationKey = () => (/^\/(new)?\/?$/.test(location.pathname) ? "" : location.pathname);

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
          if (!chatIsEmpty()) return;
          handlers.onBlockedAttempt();
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
        const stop = t && t.closest && (t.closest(S.sendBtn) && isHardGenerating());
        if (stop) { handlers.onNativeStop(); return; }
        const btn = t && t.closest && t.closest(S.sendBtn);
        if (!btn) return;
        if (btn.disabled || btn.getAttribute("aria-disabled") === "true") return;
        if (handlers.isBlocked()) return;
        if (!handlers.isStarted()) {
          if (!chatIsEmpty()) return;
          handlers.onBlockedAttempt();
          return;
        }
        handlers.onUserMessage(assistantCount());
      },
      true
    );
  }

  // ── Tool-block location for camouflage ────────────────────────────────────
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
    id: "claude",
    displayName: "Claude",
    supportsVision: true,
    timings,
    thinkingSel: S.thinking,
    chipAtItemLevel: true,
    chipAnchor,
    chipAppend: true,
    chipTrailRef,
    reliableCounts: false,
    init({ diag: d } = {}) { if (d) diag = d; },
    allItems, isUserItem, isAssistantItem, itemText, classifyText,
    assistantCount, userCount, lastAssistant, lastAssistantId, readAssistant,
    streamLen, snapshot,
    getEditor, editorText, chatIsEmpty, isFreshChat, composerFrame, barAnchor,
    setInputLock, typeAndSend, stopGeneration,
    isGenerating, isBusyNow, isHardGenerating,
    enforceComposer, ensureComposerReady,
    turnHalted, findContinueBtn, clickContinueBtn,
    scanError, isTooLongMsg, isBusyMsg,
    attachImages, clearAttachments, conversationKey,
    installSendHooks, findToolBlockSpot,
  };
})();
