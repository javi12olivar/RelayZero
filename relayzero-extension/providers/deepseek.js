// SPDX-License-Identifier: GPL-3.0-or-later
// providers/deepseek.js - the DeepSeek (chat.deepseek.com) provider.
// EVERYTHING that knows DeepSeek's DOM, quirks, and UI strings lives here; the
// core (core/main.js) only ever talks to the ZSProvider interface this file
// exports. To support another AI site, write a sibling file exporting the same
// interface and list it (instead of this one) in the manifest's content_scripts.
//
// DeepSeek notes (validated live):
//  - One turn = one .ds-message. User turns carry a hashed modifier class +
//    a `.fbb737a4` bubble; assistant turns carry a `.ds-markdown` body.
//  - DeepThink/R1 reasoning lives in .ds-think-content; the real answer is a
//    .ds-markdown OUTSIDE that container (so drafts inside reasoning are ignored).
//  - The input is a real <textarea> (not a contenteditable): we set its value via
//    the native setter + an input event, then click the primary send button.
//  - "generating" is detected from the primary footer button: while streaming it
//    shows a STOP glyph (a <rect> in old builds, a rounded-square <path> starting
//    "M2…" in V4) and when idle a SEND arrow (<path> starting "M8…"); see
//    isStopBtn(). .ds-loading covers the brief spin-up. During the DeepThink
//    REASONING phase there is NO stop button / spinner at all - only text growth
//    says "still alive".
// eslint-disable-next-line no-unused-vars
const ZSProvider = (() => {
  "use strict";
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let diag = () => {}; // injected by core via init()

  // DOM selectors for chat.deepseek.com. Grouped so a future site tweak is a
  // one-liner. DeepSeek ships hashed CSS-module class names (e.g. `d29f3d7d`);
  // where possible we lean on its stable design-system "ds-" classes instead.
  const S = {
    chatItem: ".ds-message",
    userMod: "d29f3d7d", // hashed modifier on user turns (one-liner to update if DeepSeek redeploys)
    userBubble: ".fbb737a4", // user text bubble (secondary signal)
    box: ".ds-markdown",
    editor: "textarea", // DeepSeek uses a real <textarea>, NOT a contenteditable
    // The inline "edit this message" box is DeepSeek's design-system bordered
    // textarea (.ds-textarea--bordered), mounted UP in the turn list. The bottom
    // composer is NOT wrapped in one - so this scopes getEditor() away from it.
    msgEditBox: ".ds-textarea",
    thinking: ".ds-think-content",
    markdown: ".ds-markdown",
    generating: ".ds-loading",
    sendBtn: ".ds-button--primary",
    stopBtn: ".ds-button--primary",
    // surfaces where DeepSeek shows errors / limit modals / toasts
    errorSurfaces:
      '[class*="ds-toast"],[class*="toast"],[class*="error"],[class*="alert"],' +
      '[class*="warning"],[class*="modal"],[role="alert"],[class*="tip"],' +
      '[class*="popover"],[class*="notify"],[class*="notification"]',
    // composer image-attachment area (best-effort; DeepSeek's image support is
    // limited, so the attach path degrades gracefully if these don't match).
    attachArea: ".ds-file-list, [class*='file-preview'], [class*='upload']",
    imageThumb: "[class*='thumbnail'], [class*='file-item']",
    // ── Composer mode controls (empty chat only) ──────────────────────────
    // These two drive LAYOUT (isFreshChat/composerFrame/barMount), so they stay
    // narrow and stable - a stray tablist elsewhere in the page must never be
    // mistaken for the model picker. Detection of the Expert tab is tolerant
    // instead (see findExpertRadio), which is where UI reskins actually bite.
    modeRadioGroup: '[role="radiogroup"]',
    modeRadio: '[role="radio"]',
    deepThinkToggle: ".ds-toggle-button",
  };

  // Error / state regexes (English + French - DeepSeek's UI follows the locale).
  const RE = {
    contextLimit: new RegExp(
      [
        "conversation.{0,20}(too long|trop long)",
        "context.{0,20}(limit|exceeded|d\\u00e9pass\\u00e9)",
        "session.{0,20}(expired|expir\\u00e9e)",
        "please.{0,30}(start|cr\\u00e9er).{0,20}(new|nouveau).{0,20}(chat|conversation)",
        "(token|context).{0,10}limit",
        "message.{0,20}too.{0,10}long",
        "maximum.{0,20}context",
        "this conversation has reached",
        "cette conversation a atteint",
      ].join("|"),
      "i"
    ),
    tooLong: /conversation .{0,20}(too long|getting too long|trop longue)/i,
    busy: /server is busy|server busy|servers? (are )?(busy|overloaded)|system is currently busy|serveur est occup|please try again|r\u00e9essayer plus tard|demasiado frecuente|mensaje demasiado|too (many|frequent)|rate.?limit|servidor(es)? (ocupad|sobrecargad)|servidor no disponible|vuelve a intentarlo|int\u00e9ntalo (de nuevo|luego|m\u00e1s tarde)|reintentar|发送太频繁|消息过于频繁|服务器繁忙|请稍后再试/i,
    rateLimit: /demasiado frecuente|mensaje demasiado.{0,20}frecuente|too (many requests|frequent)|rate.?limit|发送太频繁|消息过于频繁|please slow down|por favor.{0,20}espere|intente.{0,20}más tarde/i,
    continueBtn: /^(continue|continuer|continuar|seguir|fortfahren|\u7ee7\u7eed(\u751f\u6210)?|\u7e8c\u884c|reenviar|volver a (enviar|intentar)|reintentar|retry|try again|regenerate|regenerar|send again|resend)$/i,
    stopped: /(arrêté|arrété|stopped|已停止|停止生成|已暂停)/i,
    expertMode: /expert|experto|experte|profesional|专家|专业|^pro$|reasoner|reasoning|thinking mode|deep ?think|advanced|v3\.?(?:\d+)?\s*\/?\s*reasoner/i,
    deepThink: /pensée profonde|pensee profonde|profonde|réflexion|reflexion|deep ?think|深度思考|\br1\b/i,
    searchMode: /recherche intelligente|smart search|\bsearch\b|web search|搜索/i,
  };

  // Completion-detection windows, calibrated on DeepSeek's DeepThink behaviour.
  // Exposed so the core's response watcher uses the provider's tuning.
  const timings = {
    GEN_IDLE_MS: 800,        // answer phase: text unchanged this long ⇒ idle
    REASON_IDLE_MS: 12000,   // reasoning stalls of several seconds are NORMAL
    WARMUP_MS: 45000,        // empty turn container may precede the first token
    REASON_NOREPLY_MS: 90000, // reasoning written but no answer yet: keep waiting
    STABLE_MS: 9000,         // generating-flag stuck ON but text frozen → done
    RESPONSE_TIMEOUT_MS: 300000,
  };

  // ── Turn classification (multi-signal, virtualization-safe) ──────────────
  function isUserItem(item) {
    if (!item) return false;
    if (S.userMod && item.classList.contains(S.userMod)) return true;
    if (S.userBubble && item.querySelector(S.userBubble)) return true;
    return false;
  }
  const isAssistantItem = (item) => !!item && !isUserItem(item);

  // Full text of an element with block-level structure preserved: paragraphs,
  // list items, headings, <br> and code blocks each start a new line, so
  // extracted history/answers keep their real spacing instead of collapsing
  // into one flat run (the old .textContent join). Also skips the site's UI
  // chrome (copy/download buttons, toolbars) so stray words like Copy or
  // Download never leak into the text.
  function blockText(el) {
    if (!el) return "";
    const walk = (n) => {
      let out = "";
      for (const node of n.childNodes) {
        if (node.nodeType === 3) { out += node.nodeValue; continue; }
        if (node.nodeType !== 1) continue;
        const tag = node.tagName;
        if (tag === "BUTTON" || tag === "SVG" || tag === "PATH" || tag === "STYLE" || tag === "SCRIPT") continue;
        const cls = (node.className && node.className.toString ? node.className.toString() : "");
        const role = node.getAttribute ? node.getAttribute("role") : "";
        if (role === "button" || /copy|toolbar|action|button|icon/i.test(cls)) continue;
        if (tag === "BR") { out += "\n"; continue; }
        if (tag === "PRE") { out += "\n```\n" + (node.textContent || "").replace(/\n+$/, "") + "\n```\n"; continue; }
        if (tag === "CODE") { out += "`" + (node.textContent || "") + "`"; continue; }
        if (tag === "STRONG" || tag === "B") { out += "**" + walk(node) + "**"; continue; }
        if (tag === "EM" || tag === "I") { out += "*" + walk(node) + "*"; continue; }
        const inner = walk(node);
        if (/^H[1-6]$/.test(tag)) { out += "\n" + "#".repeat(Number(tag[1])) + " " + inner.trim() + "\n"; continue; }
        if (tag === "LI") { out += "\n- " + inner.trim() + "\n"; continue; }
        const block = /^(P|DIV|UL|OL|BLOCKQUOTE|TR|TABLE|SECTION|ARTICLE|HR)$/.test(tag);
        out += block ? "\n" + inner + "\n" : inner;
      }
      return out;
    };
    let t = walk(el);
    t = t.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    return t;
  }

  // Text of an item for signature detection. For assistant turns we use ONLY
  // the non-thinking markdown, so tool blocks the model merely drafts inside
  // its reasoning are never detected, shown, or executed.
  function itemText(item) {
    if (isAssistantItem(item)) {
      const mds = [...item.querySelectorAll(S.markdown)].filter((m) => !m.closest(S.thinking));
      return mds.map((m) => m.textContent).join("\n");
    }
    return item.textContent || "";
  }

  // Text used by the core to CLASSIFY a turn for camouflage - excludes the
  // reasoning area AND any element matching `excludeSel` (the core's own chip),
  // so a recycled (virtualized) node wearing a stale chip is never mis-detected.
  function classifyText(item, excludeSel) {
    if (isAssistantItem(item)) {
      return [...item.querySelectorAll(S.markdown)]
        .filter((m) => !m.closest(S.thinking) && !(excludeSel && m.closest(excludeSel)))
        .map((m) => m.textContent).join("\n");
    }
    let t = "";
    for (const n of item.childNodes) {
      if (excludeSel && n.nodeType === 1 && n.matches && n.matches(excludeSel)) continue;
      t += n.textContent || "";
    }
    return t;
  }

  // ── DOM primitives ────────────────────────────────────────────────────────
  const allItems = () => [...document.querySelectorAll(S.chatItem)];
  const assistantItems = () => allItems().filter(isAssistantItem);
  const assistantCount = () => assistantItems().length;
  const userCount = () => allItems().filter(isUserItem).length;
  // Scope to the SITE's composer only: never match RelayZero's own injected
  // UI (e.g. the settings textarea #zs-set-text in #zs-root). Otherwise on the
  // login/OAuth pages - which have no site textarea - getEditor() would return
  // our own panel's textarea, defeating the "not on a chat page" guard in the
  // send hooks and letting them swallow the DeepSeek "Log in" click (which is
  // itself a .ds-button--primary, the same selector as the send button).
  const getEditor = () => {
    const site = [...document.querySelectorAll(S.editor)].filter(
      (e) => !e.closest("#zs-root")
    );
    // Prefer the bottom composer over the inline message-EDIT box. When the user
    // edits a turn, DeepSeek mounts a bordered .ds-textarea up in the turn list;
    // it precedes the composer in DOM order, so the old "first textarea" pick
    // returned it - and barMount() then dragged the whole RelayZero bar INTO the
    // editor. Skip any textarea inside that DS component; the composer isn't one.
    return site.find((e) => !e.closest(S.msgEditBox)) || site[0] || null;
  };
  // The composer is a <textarea>, so its live content is .value (NOT textContent).
  const editorText = () => {
    const e = getEditor();
    if (!e) return "";
    return (e.value != null ? e.value : e.textContent || "");
  };

  // Lock / unlock the user textarea during agent activity. `readonly` blocks
  // interactive typing but is IGNORED by the native prototype setter used in
  // setTextareaValue(), so the loop's own injections continue to work normally.
  function setInputLock(on) {
    const ed = getEditor();
    if (!ed) return;
    if (on) {
      if (!ed.dataset.zsPlaceholder) ed.dataset.zsPlaceholder = ed.getAttribute("placeholder") || "";
      ed.setAttribute("readonly", "");
      ed.setAttribute("placeholder", "⏳ Agent working… please wait");
    } else {
      ed.removeAttribute("readonly");
      if (ed.dataset.zsPlaceholder != null) ed.setAttribute("placeholder", ed.dataset.zsPlaceholder);
    }
  }

  const lastAssistant = () => {
    const it = assistantItems();
    return it.length ? it[it.length - 1] : null;
  };

  // Stable per-turn identity: each .ds-message's PARENT carries
  // data-virtual-list-item-key, a monotonically increasing per-turn key
  // (validated live, 2026-07). DeepSeek VIRTUALIZES its message list (the
  // attribute name says it all), so assistantCount() stalls once old turns
  // detach - which defeated the core's count-based chip.reown guard on
  // back-to-back calls to the same tool: the previous call's settled "done"
  // chip was repainted onto the NEW streaming command turn (the "chip appears
  // done with no spinner while DeepSeek is still writing" report). This key is
  // immune to that; the core prefers it over the count whenever it exists.
  function lastAssistantId() {
    const last = lastAssistant();
    if (!last) return null;
    const p = last.parentElement;
    const key = p && p.getAttribute("data-virtual-list-item-key");
    return key != null ? key : null;
  }

  // A "blank" conversation = no chat turns rendered yet.
  const chatIsEmpty = () => allItems().length === 0;

  // A genuinely FRESH/new chat (not an existing conversation whose messages are
  // still loading). Historically required the Expert/Rapide mode selector; a
  // reskin can drop role=radiogroup entirely, so an empty chat + site editor is
  // enough (same rule gemini.js uses).
  const isFreshChat = () =>
    chatIsEmpty() && (!!getEditor() || !!document.querySelector(S.modeRadioGroup));

  // The whole composer "box" = the smallest ancestor that contains the input, the
  // send button AND (on a blank chat) the Expert/Rapide mode selector. The core's
  // Start gate hides this entire frame at once. Returns null if no input yet.
  function composerFrame() {
    const ta = getEditor();
    if (!ta) return null;
    const sb = document.querySelector(S.sendBtn);
    const group = document.querySelector(S.modeRadioGroup);
    const targets = [sb, group].filter(Boolean);
    let n = ta;
    for (let i = 0; i < 14 && n && n.parentElement; i++) {
      if (targets.every((t) => n.contains(t))) return n;
      n = n.parentElement;
    }
    // Fallback: a fixed climb from the textarea.
    let f = ta;
    for (let i = 0; i < 6 && f.parentElement; i++) f = f.parentElement;
    return f;
  }

  // Where the core inserts its in-flow status bar. The INPUT BOX = the lowest
  // ancestor of the textarea that also holds the send button but NOT the model
  // tabs (so the rounded composer box, excluding Instant/Expert/Vision). It is a
  // vertical flow container (textarea + the DeepThink/Search pill row), so adding
  // the bar as its FIRST child reflows cleanly and spans the full input width.
  function barMount() {
    const ta = getEditor();
    if (!ta) return null;
    const send = document.querySelector(S.sendBtn);
    const group = document.querySelector(S.modeRadioGroup);
    let box = ta.parentElement;
    while (box && box !== document.body) {
      const holdsSend = !send || box.contains(send);
      const holdsTabs = group && box.contains(group);
      if (holdsSend && !holdsTabs) break; // the input box, without the tabs
      box = box.parentElement;
    }
    if (!box || box === document.body) box = ta.parentElement;
    if (!box) return null;
    // Insert before the first REAL child (skip our own bar if already mounted,
    // otherwise we'd try to insert the bar before itself every frame).
    let before = box.firstElementChild;
    if (before && before.id === "zs-bar") before = before.nextElementSibling;
    return { parent: box, before, inside: true }; // lives INSIDE the input box
  }

  // ── Composer mode: pick Expert (most powerful) at startup, Search OFF ──
  // Driven once at session start only; the user can switch the model tab after.
  const nodeText = (n) => (n && (n.innerText || n.textContent || "").trim()) || "";
  // Selected/on state across DeepSeek's UI generations: aria-checked (V4 radios),
  // aria-pressed (legacy pills), aria-selected (tablist), Radix-style
  // data-state="checked|on|active", or a *--selected / *selected* class.
  const isPressedOn = (n) =>
    !!n && (n.getAttribute("aria-pressed") === "true" ||
          n.getAttribute("aria-checked") === "true" ||
          n.getAttribute("aria-selected") === "true" ||
          n.getAttribute("data-checked") === "true" ||
          n.checked === true ||
          /^(?:checked|on|active|selected)$/.test(n.getAttribute("data-state") || "") ||
          /^(?:checked|on|active|selected)$/.test(n.getAttribute("data-value-checked") || "") ||
          /(?:^|[\s_-])(?:selected|active|checked)(?:$|[\s_-])/i.test(String(n.className || "")) ||
          n.classList.contains("ds-toggle-button--selected") ||
          n.classList.contains("ds-radio--checked") ||
          n.classList.contains("ds-tab--active") ||
          !!n.querySelector && !!n.querySelector('[aria-checked="true"], input:checked'));
  const isPressedOff = (n) =>
    n && (n.getAttribute("aria-pressed") === "false" ||
          n.getAttribute("aria-checked") === "false");

  function findExpertRadio() {
    // Tolerant on purpose: DeepSeek has shipped this picker as role=radio items,
    // as a tablist, and as bare [data-model-type] nodes, in three UI generations.
    // We look in the model-picker group first, then page-wide, and accept the
    // node whose model type / testid / label says "expert" (multi-locale).
    const group = document.querySelector(S.modeRadioGroup);
    const cands = [...new Set([
      ...(group ? group.querySelectorAll("[role='radio'], [role='tab'], [data-model-type]") : []),
      ...document.querySelectorAll(S.modeRadio),
      ...document.querySelectorAll("[role='tab'], [data-model-type]"),
    ])];
    const attrs = (r) => [
      r.getAttribute("data-model-type"),
      r.getAttribute("data-testid"),
      r.getAttribute("data-value"),
      r.getAttribute("data-model"),
      r.getAttribute("value"),
      r.getAttribute("aria-label"),
      r.getAttribute("title"),
      nodeText(r),
    ].filter(Boolean).join(" ");
    return cands.find((r) => /expert/i.test(attrs(r))) ||
           cands.find((r) => RE.expertMode.test(attrs(r))) ||
           null;
  }

  function findToggleBy(re) {
    return [...document.querySelectorAll(S.deepThinkToggle)].find((t) => re.test(nodeText(t))) || null;
  }

  function composerModeState() {
    const expert = findExpertRadio();
    const deepThink = findToggleBy(RE.deepThink);
    const search = findToggleBy(RE.searchMode);
    return {
      expertFound: !!expert,
      expertOn: !!expert && isPressedOn(expert),
      deepThinkFound: !!deepThink,
      deepThinkOn: !!deepThink && isPressedOn(deepThink),
      searchFound: !!search,
      searchOff: !search || !isPressedOn(search),
      searchHiddenInExpert: !search && !!expert && isPressedOn(expert),
    };
  }

  function enforceComposer(reason) {
    // We only DRIVE the composer when given a reason (i.e. at session startup).
    // Per-sweep calls pass no reason and are READ-ONLY: that leaves the user free
    // to switch the model tab afterwards (e.g. Expert → Instant to turn thinking
    // off) without RelayZero reverting their choice every frame.
    if (!reason) return composerModeState();
    try {
      // Pick the most powerful model for the agent: Expert (deep reasoning). In
      // the current DeepSeek V4 UI, Expert IS the thinking model; the three tabs
      // are Instant / Expert / Vision and there is no separate DeepThink toggle.
      const expert = findExpertRadio();
      if (expert && !isPressedOn(expert)) {
        try { expert.click(); } catch (e) { diag("mode_fallback", { reason, target: "expert", error: String(e && e.message || e) }); }
      }

      // Legacy DeepSeek UI only: if a separate DeepThink toggle still exists, turn
      // it ON once. We do NOT hide it anymore, so thinking stays user-toggleable.
      const deepThink = findToggleBy(RE.deepThink);
      if (deepThink && isPressedOff(deepThink)) {
        try { deepThink.click(); } catch (e) { diag("mode_fallback", { reason, target: "deepThink", error: String(e && e.message || e) }); }
      }

      // Search must be off (it derails the agent). Best-effort; absent in Expert.
      const search = findToggleBy(RE.searchMode);
      if (search && isPressedOn(search)) {
        try { search.click(); } catch (e) { diag("mode_fallback", { reason, target: "search", error: String(e && e.message || e) }); }
      }

      const state = composerModeState();
      diag("mode_enforce", { reason, ...state });
      return state;
    } catch (e) {
      diag("mode_fallback", { reason, target: "composer", error: String(e && e.message || e) });
      return composerModeState();
    }
  }

  // Drive the composer into its required modes; returns the final state with
  // `.ready` (the core gates session start on it).
  async function ensureComposerReady(reason) {
    let state = composerModeState();
    for (let i = 0; i < 12; i++) {
      state = enforceComposer(reason);
      // Ready as soon as Expert is on and Search is off. DeepThink is only
      // required if a legacy toggle is actually present (V4 has none).
      if (state.expertOn && state.searchOff && (state.deepThinkOn || !state.deepThinkFound)) break;
      await sleep(120);
    }
    state = composerModeState();
    // When the model picker could not be found, dump what IS in the DOM: this is
    // the only way to tell "DeepSeek reskinned the tabs" apart from "the user is
    // in an existing conversation" (the picker only exists on a blank chat).
    // Visible in the page console (filter: zs-diag) and window.__zsDiag.
    if (!state.expertFound) {
      diag("mode_ready_no_expert", {
        reason,
        groups: document.querySelectorAll(S.modeRadioGroup).length,
        radios: [...document.querySelectorAll(S.modeRadio)].slice(0, 8).map((r) => ({
          type: r.getAttribute("data-model-type"),
          testid: r.getAttribute("data-testid"),
          on: isPressedOn(r),
          label: nodeText(r).slice(0, 40),
        })),
        dataModelTypes: [...document.querySelectorAll("[data-model-type]")]
          .slice(0, 8).map((r) => r.getAttribute("data-model-type")),
      });
    }
    diag("mode_ready", { reason, ...state });
    // Prefer Expert-on; if the picker is missing (reskin / picker only on blank
    // chat) or Expert was found but never reports selected after the click
    // retries, fall back to the same editor-presence gate every other provider
    // uses so a UI change cannot hard-lock session start.
    const ready = state.expertOn || !!getEditor();
    return { ...state, ready };
  }

  // DeepSeek's footer button doubles as SEND (an upward arrow) and STOP (a
  // filled rounded square). Older builds drew the stop glyph with a <rect>; the
  // current V4 build draws BOTH as a <path>: the send arrow's path starts
  // mid-glyph ("M8.31…"), the stop square's path starts at a corner near the
  // origin ("M2 …"). We treat the button as "stop" when it carries a <rect> OR a
  // square-ish path (leading move to x ≤ 3) - never the M8 arrow. One-liner to
  // update if DeepSeek reskins the footer button.
  function isStopBtn(btn) {
    if (!btn) return false;
    if (btn.querySelector("rect")) return true; // legacy stop square
    const p = btn.querySelector("path");
    if (!p) return false;
    return /^\s*M\s*[0-3][\s.]/.test(p.getAttribute("d") || "");
  }

  // ── Generation / completion detection ────────────────────────────────────
  // Everything DeepSeek is streaming for a turn: its reasoning + its answer.
  // Excludes the core's own chip so the live token meter can't masquerade as
  // model output.
  function streamText(item) {
    if (!item) return "";
    const think = item.querySelector(S.thinking);
    const thinkTxt = think ? think.textContent || "" : "";
    const replyTxt = [...item.querySelectorAll(S.markdown)]
      .filter((m) => !m.closest(S.thinking) && !m.closest(".zs-chip"))
      .map((m) => m.textContent)
      .join("");
    return thinkTxt + "\n" + replyTxt;
  }
  const streamLen = (item) => streamText(item === undefined ? lastAssistant() : item).length;

  // Stream-growth tracking - the ONLY "is it still streaming?" signal during the
  // reasoning phase (no <rect>, no spinner then). We track the MAXIMUM length the
  // current turn has reached and WHEN it last advanced; DOM flicker of a few
  // chars never counts - only a new maximum (see content history for the full
  // war story: counting churn as growth froze the loop).
  let _streamMax = -1, _streamAt = 0, _streamItem = null;

  function sampleStream() {
    const item = lastAssistant();
    const len = streamText(item).length;
    const now = Date.now();
    // A new turn - a different node, or a big length drop (a virtualized node
    // recycled into a fresh turn) - starts tracking afresh and counts as active.
    if (item !== _streamItem || len < _streamMax - 400) {
      _streamItem = item; _streamMax = len; _streamAt = now; return;
    }
    if (len > _streamMax) { _streamMax = len; _streamAt = now; } // forward progress only
  }
  const grewWithin = (ms) => _streamMax > 1 && Date.now() - _streamAt < ms;

  // True iff `item` is an assistant turn that has begun REASONING but produced no
  // answer yet and has NOT been halted.
  function reasoningInProgress(item) {
    if (!item) return false;
    const think = item.querySelector(S.thinking);
    const thinkTxt = think ? (think.textContent || "") : "";
    if (!thinkTxt.trim().length) return false; // not reasoning
    const replyLen = [...item.querySelectorAll(S.markdown)]
      .filter((m) => !m.closest(S.thinking) && !m.closest(".zs-chip"))
      .reduce((n, m) => n + (m.textContent || "").length, 0);
    if (replyLen !== 0) return false; // already answering
    if (turnHalted(item)) return false; // halted (manual / forced stop)
    return true;
  }

  // The turn carries DeepSeek's "Arrêté/Stopped" UI marker (manual stop or a
  // forced interruption) - distinguished from the model merely WRITING such a
  // word in its reasoning by requiring the marker OUTSIDE the reasoning text.
  function turnHalted(item) {
    if (!item) return false;
    const think = item.querySelector(S.thinking);
    const thinkTxt = think ? (think.textContent || "") : "";
    return RE.stopped.test(item.textContent || "") && !RE.stopped.test(thinkTxt);
  }

  // Growth-tolerant "is a generation in progress?" - the response watcher's signal.
  // A .ds-loading inside the composer is the IMAGE-UPLOAD spinner, NOT the
  // model generating. Counting it as "generating" made isGenerating/isBusyNow
  // report busy while an image was uploading, which BLOCKED the send and
  // made the core retry (the "image attached twice" bug). Only a spinner in
  // a chat TURN (.ds-message) means the model is actually working.
  // True while a composer image is STILL UPLOADING: DeepSeek shows a
  // .ds-loading spinner inside the thumbnail (.ds-animated-size-item) until
  // the upload finishes. Pressing Enter during that window is IGNORED, so we
  // must wait for the upload to finish before sending.
  function imageUploading() {
    try {
      for (const img of document.querySelectorAll('img[src^="blob:"]')) {
        if (img.closest(".ds-message")) continue;
        const item = img.closest(".ds-animated-size-item") || img.parentElement;
        if (item && item.querySelector(".ds-loading")) return true;
      }
    } catch (e) {}
    return false;
  }

  function generatingSpinner() {
    try {
      for (const el of document.querySelectorAll(S.generating)) {
        if (!el.closest(".ds-message")) continue;
        return true;
      }
    } catch (e) {}
    return false;
  }

  function isGenerating() {
    if (generatingSpinner()) return true; // model spin-up spinner
    const btn = document.querySelector(S.sendBtn);
    if (isStopBtn(btn)) return true;                       // answer phase: stop square
    sampleStream();
    if (reasoningInProgress(lastAssistant())) return grewWithin(timings.REASON_IDLE_MS);
    return grewWithin(timings.GEN_IDLE_MS);
  }

  // STRICT "is a generation happening RIGHT NOW?" - the gate for SENDING (the send
  // button doubles as stop, so sending mid-generation aborts the turn). Does NOT
  // linger after the answer ends.
  function isBusyNow() {
    if (generatingSpinner()) return true;
    const btn = document.querySelector(S.sendBtn);
    if (isStopBtn(btn)) return true;
    sampleStream();
    if (!reasoningInProgress(lastAssistant())) return false; // answer present / stopped → free
    return grewWithin(timings.REASON_IDLE_MS); // reasoning: live only while it keeps growing
  }

  // HARD signal only (the visible stop-square): never true just because a
  // conversation (re)loads or the user scrolls. Used for the Stop button.
  function isHardGenerating() {
    return isStopBtn(document.querySelector(S.sendBtn));
  }

  // ── Diagnostic breakdown of isGenerating() ────────────────────────────────
  // The chip "settled ✓ done while DeepSeek was still writing" bug means
  // isGenerating() flickered false at the wrong moment. This exposes EACH
  // sub-signal so the core's chip.why tracker can show WHICH one failed:
  //  - spinner  : the .ds-loading spin-up flag
  //  - stopBtn  : the footer button is in its STOP-square state (answer phase)
  //  - btnGlyph : the raw first token of the button's <path d> (to catch a
  //               DeepSeek reskin that breaks isStopBtn's M[0-3] test)
  //  - reasoning: DeepThink reasoning is in progress (no stop button then)
  //  - streamMax/streamAgeMs : stream-growth meter (the ONLY liveness signal in
  //               the reasoning phase, and the fallback when stopBtn is false)
  //  - grewGen/grewReason    : did the stream grow within the answer / reasoning
  //               idle windows (what isGenerating actually gates on)
  function genDebug() {
    try {
      sampleStream();
      const btn = document.querySelector(S.sendBtn);
      const path = btn && btn.querySelector("path");
      const rp = btn && btn.querySelector("rect");
      return {
        spinner: !!document.querySelector(S.generating),
        stopBtn: isStopBtn(btn),
        btnGlyph: rp ? "rect" : (path ? (path.getAttribute("d") || "").slice(0, 6) : "none"),
        reasoning: reasoningInProgress(lastAssistant()),
        streamMax: _streamMax,
        streamAgeMs: _streamAt ? Date.now() - _streamAt : -1,
        grewGen: grewWithin(timings.GEN_IDLE_MS),
        grewReason: grewWithin(timings.REASON_IDLE_MS),
        gen: isGenerating(),
      };
    } catch (e) { return { err: String(e && e.message || e) }; }
  }

  // Lightweight turn snapshot for diagnostics (reasoning/reply lengths).
  function snapshot() {
    try {
      const it = lastAssistant();
      if (!it) return { th: 0, rp: 0 };
      const th = it.querySelector(S.thinking);
      const rp = [...it.querySelectorAll(S.markdown)]
        .filter((m) => !m.closest(S.thinking) && !m.closest(".zs-chip"))
        .reduce((n, m) => n + (m.textContent || "").length, 0);
      return { th: th ? (th.textContent || "").trim().length : 0, rp };
    } catch { return {}; }
  }

  // ── Truncation "Continue" button ──────────────────────────────────────────
  function findContinueBtn() {
    // 1) Match by visible label OR aria-label / title (the "resend" refresh
    //    button is often icon-only, so its text is empty and only the tooltip
    //    or aria-label says what it does).
    for (const b of document.querySelectorAll(".ds-button, button, [role=button]")) {
      if (b.offsetParent === null) continue; // not visible
      const label = ((b.innerText || "") + " " + (b.getAttribute("aria-label") || "") + " " + (b.getAttribute("title") || "")).trim();
      if (label && RE.continueBtn.test(label)) return b;
    }
    // 2) Fallback: a retry/resend icon button near the LAST user message
    //    (DeepSeek shows a yellow refresh there when a send failed).
    try {
      const rows = [...document.querySelectorAll(".ds-message")];
      for (let i = rows.length - 1; i >= 0 && i >= rows.length - 4; i--) {
        const row = rows[i];
        const cands = [];
        if (row.nextElementSibling) cands.push(...row.nextElementSibling.querySelectorAll("button, [role=button], .ds-button"));
        cands.push(...row.querySelectorAll("button, [role=button], .ds-button"));
        for (const b of cands) {
          if (b.offsetParent === null) continue;
          const meta = String(b.className || "") + " " + (b.getAttribute("aria-label") || "") + " " + (b.getAttribute("title") || "") + " " + String(getComputedStyle(b).backgroundColor || "");
          if (RE.continueBtn.test(meta) || /f59e0b|fbbf24|facc15|eab308|ca8a04|rgb\(2[0-4][0-9],/.test(meta)) return b;
        }
      }
    } catch (e) {}
    return null;
  }

  function clickContinueBtn() {
    const b = findContinueBtn();
    if (!b) return false;
    try { b.click(); return true; } catch { return false; }
  }

  // Read the DeepThink reasoning block of the given turn (or the last one) plus
  // its duration line ("Pensado por N segundos"). Returns { text, seconds }.
  function readThinking(item) {
    try {
      const it = item || lastAssistant();
      if (!it) return { text: "", seconds: null };
      const th = it.querySelector(".ds-think-content");
      const text = th ? (th.textContent || "").trim() : "";
      let seconds = null;
      for (const el of it.querySelectorAll("*")) {
        const t = (el.textContent || "").trim();
        if (t.length > 0 && t.length < 40 && /pensad|thought|durante|seconds|segundos/i.test(t)) {
          const m = t.match(/(\d+)\s*(segundo|second|minuto|minute)/i);
          if (m) { seconds = parseInt(m[1], 10) * (/minuto|minute/i.test(m[2]) ? 60 : 1); break; }
        }
      }
      return { text, seconds };
    } catch (e) { return { text: "", seconds: null }; }
  }
  function readAssistant() {
    const item = lastAssistant();
    if (!item) return { present: false, reply: "", thinking: "", item: null };
    const th = item.querySelector(`${S.thinking} ${S.markdown}`);
    const mds = [...item.querySelectorAll(S.markdown)].filter((m) => !m.closest(S.thinking));
    return {
      present: true,
      reply: mds.map((m) => blockText(m)).join("\n").trim(),
      thinking: th ? blockText(th) : "",
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
  // DeepSeek's composer is a <textarea> driven by React. We must set .value via
  // the native prototype setter so React's onChange fires, then dispatch an input
  // event, then click the primary send button (Enter inserts a newline).
  function setTextareaValue(el, v) {
    const proto = window.HTMLTextAreaElement && window.HTMLTextAreaElement.prototype;
    const setter = proto && Object.getOwnPropertyDescriptor(proto, "value");
    if (setter && setter.set) setter.set.call(el, v);
    else el.value = v;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function pressEnter(editor) {
    const o = { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true, cancelable: true };
    editor.dispatchEvent(new KeyboardEvent("keydown", o));
    editor.dispatchEvent(new KeyboardEvent("keyup", o));
  }

  // Click DeepSeek's primary footer button to send. Send arrow and stop square
  // are the SAME button, so we refuse to click whenever a generation is live.
  function clickSendButton() {
    if (isBusyNow()) return false;
    const btn = document.querySelector(S.sendBtn);
    if (btn && !isStopBtn(btn) && btn.getAttribute("aria-disabled") !== "true") {
      // A bare .click() is IGNORED by DeepSeek when there are pending
      // attachments (same React-synthetic quirk as the session-menu button -
      // see deleteSession). Dispatch a full, real mouse sequence so the send
      // actually fires with an image attached.
      try {
        const r = btn.getBoundingClientRect();
        const o2 = { bubbles: true, cancelable: true, view: window,
                     clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, button: 0 };
        btn.dispatchEvent(new MouseEvent("pointerdown", o2));
        btn.dispatchEvent(new MouseEvent("mousedown", o2));
        btn.dispatchEvent(new MouseEvent("pointerup", o2));
        btn.dispatchEvent(new MouseEvent("mouseup", o2));
        btn.dispatchEvent(new MouseEvent("click", o2));
      } catch (e) { try { btn.click(); } catch (e2) {} }
      return true;
    }
    return false;
  }

  async function typeAndSend(text, images) {
    const editor = getEditor();
    if (!editor) throw new Error("DeepSeek input box not found");
    editor.focus();
    setTextareaValue(editor, text);
    // Attach images LAST, right before the send click - see gemini.js's
    // typeAndSend for why (attaching before retyping the text can sever the
    // site's binding between the pending upload and the message being sent).
    if (images && images.length) {
      try { await attachImages(images); } catch {}
      // A fixed settle AFTER attaching: an Enter fired while the image is
      // still uploading is silently ignored by DeepSeek, so give the upload
      // ~3s to finish before sending (simple and reliable - the spinner-based
      // detection proved unreliable).
      await sleep(3000);
    }
    // CLICK-AND-VERIFY send loop. With an image, DeepSeek must finish the
    // upload first and silently IGNORES a send click made while it is still
    // uploading (no error, the composer just stays filled). The old code
    // clicked once, believed it sent, and never retried - so the image+text sat
    // in the box and only a MANUAL Enter pushed it through. Keep clicking until
    // the real "it sent" signal fires: the composer clears (text case) or a
    // generation starts (image-only case). ~20s budget covers the upload.
    // ONE send attempt only. The old 40x loop kept pressing Enter and
    // RE-SENT the message repeatedly, wedging the agent in a loop. Wait for
    // the button to be ready, then fire a single TRUSTED Enter (synthetic
    // clicks are ignored by DeepSeek while an image uploads).
    const waitMs = (images && images.length) ? 20000 : 800;
    await waitFor(() => {
      const btn = document.querySelector(S.sendBtn);
      return btn && btn.getAttribute("aria-disabled") !== "true" && !isStopBtn(btn);
    }, waitMs);
    let sentNow = false;
    try { if (window.__zsEnter) sentNow = await window.__zsEnter(); } catch (e) {}
    if (!sentNow) {
      if (!clickSendButton() && !isBusyNow()) pressEnter(editor);
    }
  }

  // Click DeepSeek's stop only if it is actually in the stop state (<rect>), so
  // we never accidentally re-trigger a send.
  function stopGeneration() {
    const b = document.querySelector(S.stopBtn);
    if (isStopBtn(b)) try { b.click(); } catch {}
  }

  // ── Error / limit detection (site chrome only, never model output) ───────
  let _lastLimitLogged = "";
  function scanError() {
    try {
      for (const el of document.querySelectorAll(S.errorSurfaces)) {
        if (el.offsetParent === null) continue;
        if (el.closest(S.chatItem)) continue; // inside a chat turn ⇒ model content, not UI
        const t = (el.innerText || "").trim();
        if (t.length > 8 && t.length < 600 && (RE.contextLimit.test(t) || RE.rateLimit.test(t) || RE.busy.test(t))) {
          // Diagnostic: log the notice once per distinct text, with the element
          // HTML, so the selectors can be tightened with real data.
          if (t !== _lastLimitLogged) {
            _lastLimitLogged = t;
            try { diag("site.notice", { text: t.slice(0, 200), html: (el.outerHTML || "").slice(0, 400), cls: String(el.className || "") }); } catch {}
          }
          return t.slice(0, 240);
        }
      }
    } catch {}
    if (!getEditor()) return "The input box disappeared (session ended?).";
    return null;
  }

  // Short SYSTEM-message shapes the site renders as an assistant reply.
  const isTooLongMsg = (text) => RE.tooLong.test(text);
  const isBusyMsg = (text) => RE.busy.test(text);
  const isRateLimited = (text) => RE.rateLimit.test(text || "");

  // Image attachment (viewport screenshots → composer)
  function fileFromImage(img, i) {
    const mime = img.mimeType || "image/jpeg";
    const bin = atob(img.data);
    const arr = new Uint8Array(bin.length);
    for (let j = 0; j < bin.length; j++) arr[j] = bin.charCodeAt(j);
    const ext = mime.includes("png") ? "png" : "jpg";
    return new File([arr], `zeroscript_${Date.now()}_${i}.${ext}`, { type: mime });
  }

  // Pending composer attachments. DeepSeek renders each as an <img> with a
  // blob: URL inside a .ds-animated-size-item; the OLD selector
  // (.ds-file-list/[class*=thumbnail]/[class*=file-item]) never matched, so
  // attachImages() always timed out and could not tell success from failure.
  // Exclude imgs inside chat turns (.ds-message): only composer thumbs count.
  const attachThumbs = () => {
    try {
      return [...document.querySelectorAll('img[src^="blob:"]')].filter((i) => !i.closest(".ds-message"));
    } catch { return []; }
  };

  // Remove any pending attachments from the composer (used to clean up a
  // failed upload so the feedback message still sends as clean text).
  function clearAttachments() {
    try {
      document.querySelectorAll(`${S.attachArea} [class*='delete'], ${S.attachArea} [class*='close'], ${S.attachArea} [class*='remove']`)
        .forEach((d) => ["mouseover", "mousedown", "mouseup", "click"]
          .forEach((t) => { try { d.dispatchEvent(new MouseEvent(t, { bubbles: true })); } catch {} }));
    } catch {}
  }

  async function attachImages(images) {
    const editor = getEditor();
    if (!editor || !images || !images.length) return false;
    // Clear any attachments left from a previous (failed) attempt so a retry
    // never STACKS duplicates.
    try { clearAttachments(); } catch (e) {}
    await sleep(150);
    const before = attachThumbs().length;
    const want = before + images.length;
    const dt = new DataTransfer();
    images.forEach((img, i) => { try { dt.items.add(fileFromImage(img, i)); } catch {} });
    if (!dt.items.length) return false;
    editor.focus();
    // ONLY ONE attach path: paste. The old code ALSO set input[type=file], and
    // on builds where that assignment is accepted BOTH fired -> the image was
    // attached TWICE (verified live: afterPaste=1, afterFileInput=2).
    editor.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true }));
    let ok = await waitFor(() => attachThumbs().length >= want, 4000);
    if (!ok) {
      // Paste did not take (older/newer build) - fall back to the file input.
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        try {
          fileInput.files = dt.files;
          fileInput.dispatchEvent(new Event("change", { bubbles: true }));
        } catch (e) {}
        ok = await waitFor(() => attachThumbs().length >= want, 8000);
      }
    }
    return ok;
  }

  // Stable identity of the current conversation (used to persist "started").
  // The root path = a fresh chat with no id yet → "" (transient, never persisted).
  const conversationKey = () => (location.pathname === "/" ? "" : location.pathname);

  // ── User-send interception ────────────────────────────────────────────────
  // The core supplies callbacks; this provider wires them to DeepSeek's
  // composer events (Enter key, send-button click, native stop / continue).
  // handlers = {
  //   isBlocked():bool        - agent busy (injecting/running/starting)
  //   isStarted():bool        - a RelayZero session exists in this chat
  //   onBlockedAttempt()      - user tried to send before starting (fresh chat)
  //   onUserMessage(base)     - a genuine user message is being sent
  //   onNativeStop()          - user clicked the site's own stop button
  //   onNativeContinue()      - user clicked the site's truncation Continue
  // }
  function installSendHooks(handlers) {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key !== "Enter" || e.shiftKey || e.isComposing) return;
        const editor = getEditor();
        if (!editor || !editor.contains(e.target)) return;
        const text = editorText().trim();
        if (text === "") return;

        if (handlers.isBlocked()) return;

        // No session yet → the user must click "Start session" first. ONLY on a
        // blank chat: an existing conversation isn't ours to gate.
        if (!handlers.isStarted()) {
          if (!chatIsEmpty()) return; // existing conversation → let the site handle it
          handlers.onBlockedAttempt(); // nudge only; never block plain chat
          return;
        }

        handlers.onUserMessage(assistantCount());
      },
      true
    );

    // Users also send by CLICKING the send button - handle that path too.
    document.addEventListener(
      "click",
      (e) => {
        // Not on a chat page (e.g. login / OAuth page) - never intercept anything.
        if (!getEditor()) return;
        const t = e.target;
        // The native "Continue" button = a clear intent to RESUME after a stop.
        const cont = t && t.closest && t.closest(".ds-button");
        if (cont && RE.continueBtn.test((cont.innerText || "").trim())) {
          handlers.onNativeContinue();
          return;
        }
        const btn = t && t.closest && t.closest(S.sendBtn);
        if (!btn) return;
        // DeepSeek's stop button shares the send button's spot (square = stop).
        if (isStopBtn(btn)) {
          handlers.onNativeStop();
          return;
        }
        if (btn.getAttribute("aria-disabled") === "true") return;
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
  // Hide the raw tool call so nothing of it leaks beside the core's chip.
  // DeepSeek markdown often SPLITS a ###CS### … ###END_CS### block across
  // several <p> paragraphs, so we hide the whole CONTIGUOUS RUN of block-level
  // children from the start marker through the end marker. Returns where to
  // insert the chip: {parent, ref} - or null if no tool block was found.
  function findToolBlockSpot(item, chip) {
    const P = ZSParse;
    const hasStart = (t) => P.CS_START_RE.test(t) || t.includes("###mcp_tool###");
    const hasEnd = (t) => P.CS_END_RE.test(t) || t.includes("###end_mcp_tool###") || t.includes("###end-mcp_tool###");
    const isJson = (t) => /\{\s*"(?:command|tool)"\s*:/.test(t);
    // The reply markdown containers (never the reasoning/think area).
    const containers = [...item.querySelectorAll(S.markdown)].filter((m) => !m.closest(S.thinking));
    if (!containers.length) return null;
    let parent = null, ref = null;
    for (const container of containers) {
      const kids = [...container.children].filter((k) => k !== chip && !(chip && k.contains(chip)));
      let i = 0;
      while (i < kids.length) {
        const txt = (kids[i].textContent || "");
        const tLow = txt.toLowerCase();
        const startsBlock = hasStart(tLow);
        if (!startsBlock && !isJson(txt)) { i++; continue; }
        // Found the start of a tool block. Hide this child…
        const runStart = i;
        let runEnd = i;
        if (startsBlock && !hasEnd(tLow)) {
          // multi-element LUA/MCP block → extend until the end marker (or, if the
          // turn is still truncated, to the end of this container).
          let j = i + 1;
          runEnd = kids.length - 1;
          for (; j < kids.length; j++) {
            if (hasEnd((kids[j].textContent || "").toLowerCase())) { runEnd = j; break; }
          }
        }
        for (let k = runStart; k <= runEnd; k++) {
          // Prefer hiding the whole code-block wrapper (language label / Copy bar).
          let hide = kids[k];
          const wrap = hide.closest("[class*='code'], .md-code-block");
          if (wrap && container.contains(wrap) && wrap !== container) hide = wrap;
          hide.classList.add("zs-tool-hide");
          if (!ref && hide.parentElement) { parent = hide.parentElement; ref = hide; }
        }
        i = runEnd + 1;
      }
    }
    return ref ? { parent, ref } : null;
  }

  return {
    id: "deepseek",
    displayName: "DeepSeek",
    // DeepSeek's chat web model cannot see images - keep manage_camera
    // blocked for it (see main.js BLOCKED_TOOLS gate).
    supportsVision: true,
    timings,
    // Reasoning-area selector, exported so the CORE's raw-command-visible
    // probes can exclude it: DeepSeek QUOTES the command JSON/###CS### inside
    // its thinking, which the camouflage never hides (by design) - without
    // this exclusion those quotes read as "raw block still visible" forever
    // (seen live: 60Hz chip rebuild spam + done→run→done chip flapping).
    thinkingSel: S.thinking,
    init({ diag: d } = {}) { if (d) diag = d; },
    // turns
    allItems, isUserItem, isAssistantItem, itemText, classifyText, blockText,
    assistantCount, userCount, lastAssistant, lastAssistantId, readAssistant, readThinking,
    streamLen, snapshot,
    // composer / state
    getEditor, editorText, chatIsEmpty, isFreshChat, composerFrame, barMount,
    setInputLock, typeAndSend, stopGeneration,
    isGenerating, isBusyNow, isHardGenerating, genDebug,
    enforceComposer, ensureComposerReady,
    turnHalted, findContinueBtn, clickContinueBtn,
    scanError, isTooLongMsg, isBusyMsg, isRateLimited,
    // actions
    attachImages, clearAttachments, conversationKey,
    installSendHooks, findToolBlockSpot,
  };
})();
