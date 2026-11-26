// SPDX-License-Identifier: GPL-3.0-or-later
// providers/freedomgpt.js - the FreedomGPT provider.
// Exports the same ZSProvider interface as the other providers; the core is
// provider-agnostic. REA inspected the live React/Next.js DOM and shipped UI bundle.
// To disable FreedomGPT support, remove its manifest entry, URL and AI_SITES item.
// PROVIDER_URLS + core/main.js AI_SITES).
//
// FreedomGPT DOM notes (REA observation, 2026-11):
//  - Turns expose [data-history-message]; user turns contain [data-chat-role="user"].
//    The message body is [data-testid="message-body"].
//  - Composer is #editable-input-div[contenteditable="true"].
//  - Send control uses title="Send message"; generation state is internal React
//    state, so use localized stop-button labels plus stream-growth detection.
// eslint-disable-next-line no-unused-vars
const ZSProvider = (() => {
  "use strict";
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let diag = () => {}; // injected by core via init()

  const S = {
    row: '[data-history-message], [data-message-pending="true"]',
    userItem: '[data-chat-role="user"]',
    reply: '[data-testid="message-body"]',
    replyAlt: '[class*="messageText"], [class*="markdown"]',
    // Keep the selector valid while the core temporarily sets contenteditable=false.
    editor: "#editable-input-div",
    composer: ".chat-composer",
    sendBtn: 'button[title="Send message"], button[aria-label*="send" i], button[aria-label*="enviar" i]',
    copyBtn: 'button[aria-label*="copy" i], button[title*="copy" i], button[aria-label*="copiar" i]',
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
    busy: /something went wrong|an error occurred|please try again|int\u00e9ntalo de nuevo|too many requests|rate.?limit|temporarily unavailable|network error|algo sali\u00f3 mal|intenta de nuevo/i,
    continueBtn: /^\s*(continue generating|continuar generando|seguir generando)\s*$/i,
  };
  const TOOL_SHAPE = /"(?:command|tool)"\s*:\s*"|###\s*(?:cs|csharp|c#|python|py)\b/i;

  const timings = {
    GEN_IDLE_MS: 1500,
    REASON_IDLE_MS: 12000,
    WARMUP_MS: 45000,
    REASON_NOREPLY_MS: 90000,
    STABLE_MS: 9000,
    RESPONSE_TIMEOUT_MS: 300000,
  };

  // ── Turn classification ───────────────────────────────────────────────────
  const isTurn = (item) => !!item && item.matches && item.matches(S.row);
  const isUserItem = (item) =>
    !!item && (item.matches?.(S.userItem) || !!item.querySelector?.(S.userItem));
  const isAssistantItem = (item) =>
    isTurn(item) && !isUserItem(item);

  function textWithout(root, excludeSel) {
    if (!root) return "";
    const skip = S.thinking + ", .zs-chip" + (excludeSel ? ", " + excludeSel : "");
    let t = "";
    const walk = (n) => {
      if (n.nodeType === 3) { t += n.nodeValue; return; }
      if (n.nodeType !== 1) return;
      if (n.matches && n.matches(skip)) return;
      if (n.tagName === "BR") { t += "\n"; return; }
      for (const c of n.childNodes) walk(c);
    };
    walk(root);
    return t;
  }

  function artifactBlocks(item, body) {
    return [...item.querySelectorAll("button, a")].flatMap((control) => {
      if (control.closest(S.thinking + ", .zs-chip")) return [];
      const labels = [control.textContent, control.title, control.getAttribute("aria-label")];
      if (!labels.some((label) => /^(?:open preview|abrir (?:la )?(?:vista previa|previsualización))$/i.test(label?.trim()))) return [];
      for (let card = control.parentElement; card && card !== item && !card.contains(body); card = card.parentElement) {
        if (TOOL_SHAPE.test(textWithout(card))) return [card];
      }
      return [];
    });
  }

  const bodyEl = (item) => {
    if (!item) return null;
    const mds = [...item.querySelectorAll(S.reply)].filter(
      (m) => !(m.closest && m.closest(S.thinking)) && !(m.closest && m.closest(".zs-chip"))
    );
    const body = mds.length ? mds[mds.length - 1] : null;
    const fullText = textWithout(item).trim();
    if (TOOL_SHAPE.test(fullText) && (!body ||
      (!TOOL_SHAPE.test(textWithout(body)) && !artifactBlocks(item, body).length))) return item;
    if (body) return body;
    const alt = [...item.querySelectorAll(S.replyAlt)].filter(
      (m) => !(m.closest && m.closest(S.thinking)) && !(m.closest && m.closest(".zs-chip"))
    );
    if (alt.length) return alt[alt.length - 1];
    return item;
  };

  function replyText(item, excludeSel) {
    const body = bodyEl(item);
    if (!body || (excludeSel && body.closest(excludeSel))) return "";
    const parts = [textWithout(body, excludeSel)];
    if (body !== item) {
      for (const card of new Set(artifactBlocks(item, body))) {
        if (!body.contains(card)) parts.push(textWithout(card, excludeSel));
      }
    }
    return parts.join("\n");
  }

  function itemText(item) {
    if (!item) return "";
    if (isAssistantItem(item)) return replyText(item);
    return textWithout(item.querySelector(S.reply) || item);
  }
  function classifyText(item, excludeSel) {
    if (!item) return "";
    if (isAssistantItem(item)) return replyText(item, excludeSel);
    return textWithout(item.querySelector(S.reply) || item, excludeSel);
  }

  // ── DOM primitives ────────────────────────────────────────────────────────
  const allItems = () => [...document.querySelectorAll(S.row)].filter((item) =>
    !item.closest("#zs-root") && !item.parentElement?.closest(S.row)
  );
  const assistantItems = () => allItems().filter(isAssistantItem);
  const assistantCount = () => assistantItems().length;
  const userCount = () => allItems().filter(isUserItem).length;

  const getEditor = () => {
    let best = null;
    let bestArea = 0;
    for (const e of document.querySelectorAll(S.editor)) {
      if (e.closest("#zs-root")) continue;
      // FreedomGPT can briefly leave a hidden/stale composer in the DOM while
      // React swaps chats or breakpoints. Never anchor the toolbar/cover to that
      // zero-sized copy when a visible editor exists.
      const r = e.getBoundingClientRect();
      const style = getComputedStyle(e);
      const visible = e.isConnected && e.getClientRects().length > 0 &&
        style.visibility !== "hidden" && style.display !== "none" && r.width >= 120 && r.height >= 20;
      const area = visible ? r.width * r.height : 0;
      if (area > bestArea) { best = e; bestArea = area; }
    }
    return best;
  };
  const editorText = () => {
    const e = getEditor();
    if (!e) return "";
    if (e.tagName === "TEXTAREA") return e.value != null ? e.value : "";
    return e.innerText ?? e.textContent ?? "";
  };

  const lastAssistant = () => {
    const it = assistantItems();
    return it.length ? it[it.length - 1] : null;
  };

  const lastAssistantId = () => {
    const last = lastAssistant();
    return last && (last.getAttribute("data-history-message") || last.getAttribute("data-message-id"));
  };

  const chatIsEmpty = () => allItems().length === 0;
  const isFreshChat = () =>
    chatIsEmpty() && /^\/(?:[a-z]{2}(?:-[A-Z]{2})?)?\/?$/.test(location.pathname) && !!getEditor();

  const composerFrame = () => {
    const ed = getEditor();
    if (!ed) return null;
    return ed.closest(S.composer) || ed.closest("form") || ed.parentElement;
  };

  function barAnchor() {
    return getEditor()?.closest(S.composer) || null;
  }

  function chipAnchor(item) {
    const body = bodyEl(item);
    return (body && artifactBlocks(item, body === item ? null : body)[0]?.parentElement) || body || item;
  }
  function wholeChipAnchor(item) {
    const body = item.querySelector(S.reply);
    const role = item.querySelector(S.userItem);
    return body && role && role !== body && role.contains(body) ? role : body?.parentElement || item;
  }
  function chipTrailRef(item) {
    const anchor = chipAnchor(item);
    if (!anchor || !anchor.children) return null;
    for (const c of anchor.children) {
      if (c.matches(S.copyBtn) || (!c.classList.contains("zs-chip") && c.querySelector(S.copyBtn))) return c;
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
    return [...(composerFrame()?.querySelectorAll(S.sendBtn) || [])].find(
      (b) => b.getClientRects().length && !b.disabled && b.getAttribute("aria-disabled") !== "true"
    ) || null;
  };
  // The app's generation flag is private React state; match its accessible
  // stop control and retain stream-growth detection as a fallback.
  const stopButton = () => {
    for (const b of composerFrame()?.querySelectorAll("button") || []) {
      if (b.closest("#zs-root, #zs-bar") || !b.getClientRects().length) continue;
      const labels = [b.getAttribute("aria-label"), b.getAttribute("title"), b.textContent];
      if (labels.some((label) => /^(?:stop(?: generating| generation| response)?|detener(?: la generación| generación| respuesta)?|interrumpir(?: respuesta)?|cancelar respuesta|dejar de generar)$/i.test(label?.trim()))) return b;
    }
    return null;
  };

  // ── Generation detection ──────────────────────────────────────────────────
  const isHardGenerating = () => !!stopButton();

  function streamText(item) {
    return item ? replyText(item) : "";
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
      return { th: 0, rp: streamText(item).length };
    } catch { return {}; }
  }

  function readAssistant() {
    const item = lastAssistant();
    if (!item) return { present: false, reply: "", thinking: "", item: null };
    return {
      present: true,
      reply: replyText(item).trim(),
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
  const norm = (s) => String(s || "").replace(/\r\n?/g, "\n").replace(/\u00a0/g, " ").trimEnd();

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

  async function typeAndSend(text, images, canSend = () => true) {
    const ed = getEditor();
    if (!ed) return false;
    const relock = _locked;
    if (relock) ed.setAttribute("contenteditable", "true");
    try {
      if (norm(editorText()) !== norm(text)) {
        pasteText(ed, text);
        const ok = await waitFor(() => norm(editorText()) === norm(text), 1500);
        if (!ok) setContentEditableText(ed, text);
      }
      if (getEditor() !== ed || norm(editorText()) !== norm(text)) return false;
      if (images && images.length && !hasPendingAttachment()) {
        if (!await attachImages(images)) throw new Error("FreedomGPT did not accept the image attachment.");
      }
      await waitFor(() => !!sendButton() && !isHardGenerating(), 4000);
      if (!canSend() || getEditor() !== ed || isHardGenerating() || norm(editorText()) !== norm(text)) return false;
      const button = sendButton();
      if (!button) return false;
      button.click();
      return ed;
    } finally {
      if (relock && _locked) {
        setInputLock(true);
      }
    }
  }

  function stopGeneration() {
    const b = stopButton();
    if (b) try { b.click(); } catch {}
  }

  function enforceComposer() { return { ready: !!getEditor() }; }
  async function ensureComposerReady(reason) {
    diag("mode_ready", { reason, provider: "freedomgpt" });
    return { ready: !!getEditor() };
  }

  // ── Error / limit detection ───────────────────────────────────────────────
  function scanError() {
    try {
      for (const el of document.querySelectorAll(S.errorSurfaces)) {
        if (el.offsetParent === null) continue;
        if (el.closest(S.row)) continue;
        const t = (el.innerText || "").trim();
        if (t.length > 8 && t.length < 600 && (RE.contextLimit.test(t) || RE.busy.test(t))) return t.slice(0, 240);
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

  const conversationKey = () => {
    const chat = new URLSearchParams(location.search).get("chat");
    return chat || (/^\/(?:[a-z]{2}(?:-[A-Z]{2})?)?\/?$/.test(location.pathname) ? "" : location.pathname);
  };

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
        const btn = t?.closest?.("button");
        if (!btn) return;
        if (btn === stopButton()) { handlers.onNativeStop(); return; }
        if (btn !== sendButton()) return;
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
    const cards = artifactBlocks(item, md === item ? null : md);
    for (const card of cards) card.classList.add("zs-tool-hide");
    if (cards.length) {
      item.classList.add("zs-cmd-mask");
      return { parent: cards[0].parentElement, ref: cards[0] };
    }
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
    // Some FreedomGPT commands are rendered as text in a file preview rather
    // than a <pre>/<p>. Hide the smallest command-bearing element we can find.
    md.querySelectorAll("*").forEach((el) => {
      if (el.closest(".zs-chip") || el.matches(S.thinking)) return;
      const t = (el.textContent || "").trim();
      if (!t || t.length > 6000 || !TOOL_SHAPE.test(t)) return;
      if ([...el.children].some((child) => TOOL_SHAPE.test(child.textContent || ""))) return;
      el.classList.add("zs-tool-hide");
      item.classList.add("zs-cmd-mask");
      hidAny = hidAny || { parent: el.parentElement, ref: el };
    });
    return hidAny;
  }

  return {
    id: "freedomgpt",
    displayName: "FreedomGPT",
    supportsVision: true,
    timings,
    thinkingSel: S.thinking,
    chipAtItemLevel: true,
    chipAnchor,
    wholeChipAnchor,
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
