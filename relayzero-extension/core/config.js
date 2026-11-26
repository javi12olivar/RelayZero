// SPDX-License-Identifier: GPL-3.0-or-later
// core/config.js - provider-agnostic constants: app identity, system prompt,
// feedback strings, tool categorisation. NOTHING in this file may reference a
// specific AI site (DOM, selectors, site names) - that lives in providers/*.
// eslint-disable-next-line no-unused-vars
const ZS = (() => {
  "use strict";

  // Display name + unique marker injected at the top of the system prompt so the
  // content script can reliably recognise (and camouflage) the bootstrap turn.
  const APP_NAME = "RelayZero";
  const SYS_MARKER = "⟦ZS-SYS⟧";

  // ── Tool → visual category (icon + colour theme for the chips) ─────────
  // VS MCP tools (plus the bridge's built-ins). Returns one of:
  //   read | edit | screen | generate | vs | tool
  function toolCategory(name) {
    const n = (name || "").includes("/") ? name.split("/").pop() : (name || "");
    if (/screenshot|_preview$|^ui_capture_|^web_screenshot/.test(n)) return "screen";
    if (/^(list_|search_|describe_|poll_|get_|find_|discover_)/.test(n)) return "read";
    if (/^generate_/.test(n)) return "generate";
    if (/^(file_|edit_|build_|clean|rebuild|nuget_|output_|create_|write_|remove_|set_|debug_|breakpoint_|test_|solution_|project_|execute_|batch_|delete_|copy_|move_|download_|extract_|open_file|write_file|create_file|delete_file|rename_symbol|add_breakpoint|remove_breakpoint|start_debugging|stop_debugging|select_lines|close_)/.test(n))
      return "edit";
    if (/^(terminal_|git_|list_directory|registry_|service_|environment_|vcpkg_|cmake_|msbuild_|cl_|clang_|process_list|process_start|process_is_|process_kill|execute_in_terminal|get_terminal_output|list_files|read_files|search_files|list_logs|read_log)/.test(n))
      return "tool";
    if (/^(vs|debugger|breakpoint|solution|project|build|editor|nuget|test|immediate|watch|thread|process|module|register|exception|memory|parallel|console|ui_|web_|code_|focus_guard|error_list|diagnostics|step_|continue$|get_debug|get_stack|evaluate_in|list_workspaces|get_workspace|add_workspace|update_workspace|remove_workspace|reveal_in|focus_editor|get_hover|get_diagnostics|get_document|get_workspace_sym|find_references|go_to_|get_call|get_completions|get_code_actions|list_commands|execute_command|open_file_at)/i.test(n))
      return "vs";
    if (n === "memory_read" || n === "memory_write") return "tool";
    return "tool";
  }

  // Feedback strings sent back to the model so it can self-correct.
  const FEEDBACK = {
    // A command-shaped reply that could not be turned into a runnable call.
    // The failures are DIFFERENT problems, so the note is tailored per `reason`
    // to tell the model exactly what to fix (a generic "bad JSON" was misleading
    // for the non-JSON cases, e.g. a missing ###CS### opener). Falls back to the
    // generic "malformed" text for any unrecognised reason.
    parseError: (reason, toolName) => {
      // ###CS### is execute_code-ONLY (the parser always maps a bare
      // ###CS### block to execute_code). So only suggest it when the
      // broken command IS execute_code, or when we could not tell which
      // command it was. For a KNOWN other command the ###CS### hint is wrong and
      // misleading - a model that followed it would ship its code to the wrong
      // place - so drop it and keep the JSON-only guidance.
      const otherCmd = toolName && toolName !== "command" && toolName !== "execute_code";
      const csMalformed = otherCmd ? "" : " (or use the ###CS### / ###END_CS### block for execute_code)";
      const csUnclosed = otherCmd ? "" : " (or a complete ###CS### ... ###END_CS### block for execute_code)";
      const objAlt = otherCmd ? "" : " (or ###...### block)";
      const notes = {
        malformed:
          "ERROR: a RelayZero command was detected in your reply but its JSON could not be parsed. " +
          'Rewrite it as a single valid JSON object in plain text, exactly like {"command": "name", "params": {...}}' +
          csMalformed + ". You may add a short note around it. " +
          "Please retry.",
        unclosed:
          "ERROR: your RelayZero command was cut off before it finished - the JSON object" +
          objAlt + " never closed, so it could not run. Rewrite the WHOLE command in one " +
          'piece as valid JSON, exactly like {"command": "name", "params": {...}}' +
          csUnclosed + ". Please retry.",
        pyOpener:
          "ERROR: you wrote the closing ###END_CS### marker but not the opening ###CS### marker, " +
          "so the C# block was not detected and did not run. Put ###CS### immediately BEFORE your " +
          "code and ###END_CS### after it. Please retry.",
        envelope:
          "ERROR: you wrote a command's parameters as a bare JSON object, but without the required " +
          "envelope, so it was not recognised as a command. Wrap them like " +
          '{"command": "name", "params": { ...your parameters... }} - the parameter keys go INSIDE ' +
          '"params". Please retry.',
      };
      return notes[reason] || notes.malformed;
    },
    multiTool: (names) =>
      "ERROR: You wrote multiple commands in one reply. Write ONE command at a " +
      "time and wait for its result before the next. You tried: " +
      names.join(", ") +
      ". Start over and write only the first command you need.",
    unknownTool: (name, valid) =>
      `ERROR: unknown command "${name}". It does not exist. Valid commands are: ` +
      valid.join(", ") +
      ". Use an exact name and parameter keys from the system prompt.",
    vsOffline:
      "ERROR: VS Code is not reachable, so the command could not run. VS Code is " +
      "closed, or the MCP Server for VS Code extension (nabheet.vscode-ide-mcp) is not installed. " +
      "This is an environment problem on the user's machine, NOT your mistake. Tell the user in " +
      "one short sentence to open VS Code with that extension (Ctrl+Shift+X). " +
      "Then: if the task NEEDS VS Code, stop until they confirm it is back; otherwise " +
      "run list_mcp_servers and continue on another connected server for anything that does not " +
      "need VS Code.",
    unityOffline:
      "ERROR: VS Code is not reachable, so the command could not run. VS Code is " +
      "closed, or the MCP Server for VS Code extension is not installed. This is an environment " +
      "problem on the user's machine, NOT your mistake. Tell the user in one short sentence to " +
      "open VS Code with the MCP extension. Then: if the task NEEDS VS Code, " +
      "stop until they confirm it is back; otherwise " +
      "run list_mcp_servers and continue on another connected server for anything that does not " +
      "need VS Code.",
    blenderOffline:
      "ERROR: VS Code is not reachable, so the command could not run. VS Code is " +
      "closed, or the MCP Server for VS Code extension is not installed. This is an environment " +
      "problem on the user's machine, NOT your mistake. Tell the user in one short sentence to " +
      "open VS Code with the MCP extension. Then: if the task NEEDS VS Code, " +
      "stop until they confirm it is back; otherwise " +
      "run list_mcp_servers and continue on another connected server for anything that does not " +
      "need VS Code.",
    bridgeOffline:
      "ERROR: the local RelayZero bridge is unreachable, so no command could run. " +
      "This is an environment problem on the user's machine (the bridge is not " +
      "running, or VS Code is closed), NOT your mistake. Tell the user in " +
      "one short sentence that the bridge or VS Code is offline, then stop " +
      "sending commands until they confirm it is back.",
    truncated:
      "(System note: your previous reply was cut off by a length limit before you " +
      "finished. Continue from exactly where you stopped. Do NOT restart and do " +
      "NOT repeat what you already wrote.)",
  };

  const BT = "```";

  function compactTools(tools) {
    return (tools || [])
      .map((t) => {
        const name = t.name || "?";
        const desc = (t.description || "").split("\n")[0].trim();
        const props = (t.inputSchema && t.inputSchema.properties) || {};
        const args = Object.keys(props).join(", ");
        return `  ${name}(${args}) - ${desc}`;
      })
      .join("\n");
  }

  // ── System prompt ─────────────────────────────────────────────────────────
  // ONE unified prompt sent to every AI on the first turn. To change the wording,
  // just edit the text below - it is a single template, no profiles or branching.
  // `${siteName}` is filled in with the AI's display name (e.g. "DeepSeek").
  // `${toolsString}` is filled in with the live command list.
  //
  // `opts` may be a string (just the siteName) or an object { siteName,
  // customPrompt }. `customPrompt` is the user's own extra instructions; when
  // present it is appended at the very bottom under a clear "User's Custom prompt"
  // heading. It NEVER edits the prompt above - it only adds a layer below it.
  function buildSystemPrompt(opts = {}) {
    if (typeof opts === "string") opts = { siteName: opts };
    const { siteName = "this AI site", customPrompt = "" } = opts;

    const prompt = `━━━ /goal COMMAND (persistent objective) ━━━
'/goal' is a COMMAND you recognise in the user's messages.
- On session start, BEFORE your first list_commands, silently read the shared note named GLOBAL-GOAL: {"command": "memory_read", "params": {"name": "GLOBAL-GOAL"}}. If it has a non-empty 'Objetivo actual', treat it as a STANDING MISSION for this and every conversation.
- When the user writes '/goal <texto>', save it as the current goal: read GLOBAL-GOAL with memory_read, then rewrite the WHOLE note with memory_write, putting <texto> under 'Objetivo actual' and keeping the instructions and history.
- When the saved goal is ACHIEVED, memory_read + memory_write to CLEAR only 'Objetivo actual' (set it to '(vacio)'), append it to 'Historial de objetivos', and NEVER delete the instructions block.
- '/goal' with no text (or '/goal status') = show the current saved goal.
- If the note is missing or has no current goal, ignore this silently.

CONTEXT:
A browser extension (RelayZero) is running inside this page. It watches your replies. When it detects a RelayZero command in your text, it runs it against one or more connected MCP servers and sends the result back as the next message. You always receive a result - success or a formatted ERROR - so you can keep going on your own.

The user's running VS Code, reached through a local bridge, is always connected by default - call \`list_commands\` FIRST for its exact commands with full parameter details. Other MCP servers may ALSO be connected alongside it (each with its own command set) - you are NOT told about them upfront. So: the MOMENT the user names ANY app/tool/target that is not VS Code (or anything else you don't recognise as a VS Code command), you MUST run \`list_mcp_servers\` FIRST, before replying - never answer from your own assumptions or prior knowledge about what is or isn't connected. Only after checking may you tell the user something is unsupported. Besides VS Code there are usually ADDON MCP servers connected (for example REA, which provides browser and artifact inspection tools) and RelayZero's own BUILT-IN commands; list_mcp_servers shows every connected server, and list_commands with a server param shows one server's commands (the built-ins live under the server named zeroscript). You do not need any special capability yourself - you just write text. The extension does the rest.

CRITICAL - RelayZero commands are NOT function calls / tools. They are plain JSON you TYPE into your normal text reply; RelayZero reads your text and runs them. So NEVER use your own native/built-in tools or features for anything covered above - not code interpreter/sandbox, web search/browsing, file or web connectors, image tools, or real function calling. None of that touches the user's VS Code workspace, so it accomplishes nothing here and breaks the flow, even just to think, test, or draft. The ONLY exception is if the user EXPLICITLY asks you to search the web. Internal reasoning (deep-think modes) is fine. Do not try to "call a function" - just write the JSON below as ordinary text.

⚠️ FORMATTING RULE (MANDATORY): every command goes inside a fenced code block (triple backticks). Outside a code block this page renders your text as Markdown - it turns things like \`System.Console\` into links and mangles the ### markers, silently CORRUPTING the command. Inside a code block it is kept verbatim.

━━━━ STANDARD COMMAND FORMAT ━━━━
Write this JSON object inside a fenced code block, replacing the placeholders with a REAL command name and its parameters (never type "command_name" literally - it is not a command):
${BT}json
{
  "command": "command_name",
  "params": {"key": "value"}
}
${BT}
For example, to list every available command you would write ${BT}{"command": "list_commands"}${BT}.

RULES:
- ONE command block per reply, inside a fenced code block. If you need several, do them one at a time and wait for each result. (One command = one block; raw text gets reformatted by this page and corrupts the command.)
- A short note around a command is fine, but NEVER end a turn by only announcing a command ("let me check...", "I'll read the file") without writing it - that runs nothing and leaves the user stuck. Either write the command now, or give your final answer.
- Final answers: plain text only, no Markdown or code fences. Do ONLY what was asked - fewest commands, no unrequested double-checks. When the task is done or the user is satisfied ("thanks", "perfect"...), reply ONE short sentence and STOP.
- Use ONLY the exact command names and parameter keys from the list, with every required parameter ("... is required" means you omitted one). Do NOT use ${siteName}'s own features (web search, connectors...) unless the user explicitly asks.
- ALWAYS use JSON commands (never invent other formats). Prefer read_file / write_file / get_diagnostics / search_files over guessing. Work in SMALL steps: read, edit, build, check errors, then continue.
- BUILD BEFORE YOU CONFIRM: get_workspace_folders / list_files / read_file / get_diagnostics / search_files tell you what EXISTS and what failed. Use them instead of assuming a path or a name.
- SAVE BEFORE DESTRUCTIVE WORK: write_file replaces an entire file; stop_debugging / process_kill affect a live session. Prefer targeted edits for surgical changes. Confirm before bulk deletes.
- On ERROR: read it and adapt - fix the command, try another, or tell the user plainly if it is an environment problem (VS Code closed, extension not installed, bridge offline).
- On a property/value error (if there is any way to list valid options or inspect the real object - list_workspaces, get_workspace_folders, get_diagnostics, the command schema in list_commands), use it to check the correct value BEFORE retrying. Never guess blindly a second time.
- Debugger tools (start_debugging, step_*, add_breakpoint, get_debug_variables, evaluate_in_debug_console) only work while a debug session is active and usually in break mode. Check list_breakpoints / get_stack_trace first.
- Project memory (RelayZero memory_read / memory_write) is a bridge built-in: for durable notes use {"server": "zeroscript"} when needed.

━━━ SYSTEM COMMANDS (built-in, work with VS Code closed) ━━━
Beyond VS Code, RelayZero also ships built-ins under server "zeroscript": terminal_run (one-shot shell, or "persistent": true then terminal_send / terminal_read_output / terminal_kill), terminal_run_elevated (admin; UAC may pop), list_directory / create_directory / copy_path / move_path / delete_path (preview first, then confirm: true), download_file, extract_archive, git_clone / git_pull / git_status / git_checkout, process_list / process_is_running / process_start / process_kill (confirm: true), registry_read / registry_write (confirm: true), service_start / service_stop (stop needs confirm), environment_get / environment_set, vcpkg_install / vcpkg_integrate, cmake_configure / cmake_build, msbuild_run, cl_compile, clang_format_file / clang_tidy_run, and .vcxproj editors (project_add_item_from_path, project_remove_item, project_rename_item, project_set_include_dirs, project_set_lib_dirs, project_add_lib, project_set_subsystem, project_set_cpp_standard, project_add_preprocessor). Destructive ones need a second call with "confirm": true after the preview. Editor UI helpers: vs_open_settings, vs_install_extension, editor_format_document, editor_reload_document (these need VS Code running). Prefer VS Code's own read_file / write_file / open_file for workspace file work; use these system commands for shell, git, packages, and project-file edits when there is no dedicated VS Code command.

FILE COMMAND PRIORITY: for reading, writing, modifying, copying, moving or deleting files, PREFER the built-in commands (they take ANY absolute path, need no workspace, and work with VS Code closed). The VS Code file commands (read_file / write_file / list_files / search_files / create_file / delete_file...) only reach files INSIDE a folder open in VS Code, so use them only when the work is inside that open workspace AND you specifically want VS Code's own view of it. For anything else on the PC, use the built-ins. You can still use ALL commands - this is a priority, not a ban: reach for VS Code commands for what only they do (LSP: symbols / references / rename / go-to-definition / hover / diagnostics, debugger, breakpoints, terminal inside VS Code, format-on-save...).

NO WORKSPACE NEEDED: the VS Code file commands (read_file / write_file / list_files / search_files...) only reach files inside a folder that is open in VS Code. The RelayZero BUILT-INS do not care: with them you can create, read, write, move and delete files ANYWHERE on the user's PC by absolute path, with NO workspace open (terminal_run is the general one - write the file content with a shell command; list_directory / create_directory / copy_path / move_path / delete_path / download_file / extract_archive handle the filesystem directly). So if the user asks for a file on their PC and no workspace is open, DO IT with the built-ins - never tell the user to open a VS Code folder first. They also work with VS Code closed.

━━━━ PROJECT MEMORY (persistent notes about THIS project) ━━━
memory_read and memory_write are BUILT-IN RelayZero commands (not VS Code's) that keep your long-term notes for this project in a file on the user's PC - they work even when VS Code is closed. It is SHARED by every AI across all sessions and chats, so keep it accurate for whoever reads it next. Store ONLY durable, useful facts: what the project is, which projects/files exist and why, naming and organisation conventions, decisions and gotchas, and the user's preferences. It is NOT a task log - never dump transient steps, obvious facts, or whole scripts into it. Keep it short.

- READ IT AT STARTUP (step 4 of the startup sequence) AND WHENEVER THE WORK NEEDS IT: the FIRST time the user's request requires changing code or understanding how the solution is organised, read your memory BEFORE doing that work - ${BT}{"command": "memory_read", "params": {}}${BT} (with no name it lists the projects that have memory; then read the one for THIS project, usually the solution/project name). Skip it for pure chit-chat or questions unrelated to the project. If nothing is saved yet, create it later with memory_write - name it after the project and use exactly this skeleton:
${BT}
# Project memory
## Overview
## Where things live
## Conventions
## Key systems
## Decisions & gotchas
## User preferences
## Open questions / TODO
${BT}
- KEEP IT UPDATED: whenever you learn something lasting, rewrite the note with memory_write (memory_read it FIRST - it REPLACES the whole file, so keep everything that is still true; the section headers make good anchors). Remove facts that became wrong. Store only what will help you next time - skip everything else.
- IF SOMETHING CONTRADICTS THE MEMORY: do NOT blindly trust either side. First verify against the real files (read_file / list_files / get_diagnostics) to find out what is actually true. Then decide: if YOU misunderstood, correct yourself; if the memory is stale or wrong, fix the memory; if it is a real problem in the project, tell the user plainly. Always leave the memory consistent with reality.
- NEVER PERSIST A GUESS AS A FACT: do NOT write an unverified THEORY about why something broke into memory as if it were established - that turns one blind guess into a permanent belief you will keep re-applying every session, and the real bug never gets fixed. Store only what you actually verified. If a fix you already recorded does NOT make the symptom disappear (the user reports the same problem again), treat your recorded cause as WRONG: discard it and re-diagnose from first principles instead of re-applying it.

IMPORTANT - STARTUP SEQUENCE (do ALL of it, in order, ONE command per reply):
1) FIRST read the shared goal note (it is your standing mission). If you have not read it yet this session, write {"command": "memory_read", "params": {"name": "GLOBAL-GOAL"}} and follow whatever 'Objetivo actual' says.
2) Then call list_commands (no params) - the FULL VS Code command reference with every parameter. Never guess a command name or parameter.
3) Then call list_mcp_servers - it reveals the addon servers (for example REA) AND RelayZero's built-in commands (terminal, files, git, CMD, etc.).
4) Then read your project memory: {"command": "memory_read", "params": {}} and, if THIS project has a note, read it - it holds durable facts about the codebase from earlier sessions.
5) After all of that, reply with exactly ONE short sentence confirming you are ready, then WAIT for the user's first request. Do not start doing work before the user asks.

FILE TOOLS - PREFER THE SIMPLE, USEFUL ONES: when reading, creating, editing, copying, moving or deleting files, reach FIRST for read_file / write_file / list_files / search_files / create_file / delete_file (and the built-ins like create_directory / copy_path / move_path / delete_path / terminal_run). They take ANY absolute path and need no workspace. Only fall back to heavier tools when the simple ones cannot do the job.

If that first list_commands (or any later VS Code command) comes back offline - VS Code is down - run list_mcp_servers once, tell the user in one short sentence that VS Code is offline, list what else is connected (if anything), then ask what they want to do and wait. Do NOT act on any other server until they answer.`;

    // The user's own extra instructions, appended as a layer UNDER the system
    // prompt. Optional - empty by default. It cannot change the rules above.
    const extra = customPrompt.trim()
      ? `\n\n━━━ USER'S CUSTOM PROMPT (extra instructions from the user) ━━━\n${customPrompt.trim()}`
      : "";

    // The marker leads the prompt; it tags the bootstrap turn for camouflage.
    return `${SYS_MARKER}\n${prompt}${extra}`;
  }

  // ── Curated, TESTED usage notes per command ─────────────────────────────────
  // The nabheet MCP extension describes its own schemas well (each tool documents
  // its parameters), so these notes only cover what a schema CANNOT say: how output
  // and errors come back, when a flow is async, which operations are destructive.
  // Keyed by BARE command name; appended to that command in the list_commands
  // output. Keep each note tight and concrete - it costs context on every
  // reminder. Written against nabheet.vscode-ide-mcp (0.3.x) tool catalogue.
  const TOOL_NOTES = {
    list_workspaces:
      "Best first call: VS Code windows (leader + workers), folders, active file. " +
      "Call this before open_file / debug tools so you know the workspace layout.",
    get_workspace_folders:
      "Workspace roots. Use these absolute paths for file tools (read_file, write_file, list_files).",
    list_files:
      "Glob list under a workspace root. Prefer over guessing paths. Pass workspaceFolder in multi-root workspaces.",
    read_file:
      "Read a file (absolute path or workspace-relative). Prefer this over guessing file contents.",
    write_file:
      "Replaces the ENTIRE file (creates or overwrites). Read first when the file already exists. Confirm before bulk replaces.",
    create_file:
      "Create a new empty file. Sibling of write_file when you only need a placeholder.",
    delete_file:
      "Delete a file or directory (recursive, uses trash when available). Preview intent with the user before bulk deletes.",
    open_file:
      "Open a file in the editor. open_file_at_line / open_file_at_position jump to a line/col.",
    search_files:
      "Regex content search across the workspace (grep). Cheap first step before renaming or refactoring.",
    get_diagnostics:
      "File diagnostics (errors/warnings, capped). THE source of truth after edits - the write tool result alone does not prove the code is clean.",
    get_document_symbols:
      "Outline symbols of the active document. Use after open_file to navigate structure.",
    get_workspace_symbols:
      "Search workspace-wide symbols (classes, functions). Use before assuming a symbol name.",
    find_references:
      "All references to the symbol at the cursor. Needs the file open and cursor set (open_file_at_position).",
    go_to_definition:
      "Jump to the definition of the symbol at the cursor.",
    rename_symbol:
      "Rename across the workspace via LSP. Prefer over find-and-replace when the language server understands the project.",
    get_hover:
      "Hover info / types at the cursor.",
    get_code_actions:
      "Refactors and quick fixes available at a line. Use when get_diagnostics reports a fixable problem.",
    get_completions:
      "Completion items at the cursor. Use sparingly - usually open_file + symbols are enough.",
    execute_command:
      "Run any VS Code command by ID (e.g. editor.action.formatDocument). Use sparingly; prefer dedicated tools.",
    list_commands:
      "List VS Code commands by id (optionally internal). Call RelayZero's virtual list_commands for the RelayZero catalogue with schemas.",
    start_debugging:
      "Start a debug session by launch-config name (folder .vscode/launch.json or *.code-workspace). Requires launch config present.",
    stop_debugging:
      "Stop the active debug session.",
    step_over:
      "Step over while paused in a debug session. Pair with get_stack_trace / get_debug_variables.",
    step_into:
      "Step into while paused. Pair with get_stack_trace / get_debug_variables.",
    step_out:
      "Step out of the current frame while paused. Pair with get_stack_trace / get_debug_variables.",
    continue:
      "Resume the paused debug session. Only while a session is active.",
    add_breakpoint:
      "Add a breakpoint (file+line, optional condition / hitCondition). Confirm with list_breakpoints.",
    list_breakpoints:
      "All breakpoints. Call after add_breakpoint to verify.",
    get_debug_variables:
      "Frame-local variables while paused.",
    get_stack_trace:
      "Call stack frames while paused. Use frameId with evaluate tools.",
    evaluate_in_debug_console:
      "Frame-scoped evaluate - reads paused-session locals. Falls back to global scope when not paused.",
    execute_in_terminal:
      "Run a command in the integrated terminal (30s output capture). Prefer this over bridge terminal_run when you need VS Code's own terminal env/tasks.",
    get_terminal_output:
      "Read the integrated terminal output buffer.",
    list_logs:
      "VS Code log sessions - use when diagnosing extension or language-server failures.",
    read_log:
      "Read a VS Code log file - use after list_logs when diagnosing extension or language-server failures.",
    memory_read:
      "RelayZero project notes when called with {\"server\": \"zeroscript\"}. Without that scope it may hit another server's memory tool - prefer the zeroscript scope for durable notes.",
    memory_write:
      "RelayZero project notes: replaces the WHOLE note, so memory_read it FIRST and rewrite complete. Only durable facts.",
    terminal_run:
      "Shell on the PC. One-shot by default; {\"persistent\": true} opens a session driven by terminal_send / terminal_read_output / terminal_kill. Prefer execute_in_terminal when you need the VS Code terminal itself.",
    terminal_run_elevated:
      "Admin shell - may show a UAC prompt the user must accept. Only when the task truly needs elevation.",
    delete_path:
      "First call previews targets; re-call with confirm: true to actually delete. Never point at system roots.",
    git_status:
      "Needs Git on PATH and cwd = repo root. Use before pull/checkout when unsure of the tree state.",
    project_set_include_dirs:
      "Edits the .vcxproj XML (append keeps %(AdditionalIncludeDirectories)). Reload the project after; prefer building via msbuild_run once the file is saved.",
    project_add_lib:
      "Appends a .lib to Link AdditionalDependencies. Link order matters for some toolchains - put it first via full set if needed.",
    editor_format_document:
      "Runs editor.action.formatDocument in VS Code - needs a document focused and the MCP extension alive.",
    editor_reload_document:
      "Runs workbench.action.files.revert - discards unsaved edits for the active file.",
    vs_open_settings:
      "Opens VS Code Settings (workbench.action.openSettings), optional query.",
    vs_install_extension:
      "Installs a VS Code extension by id (default nabheet.vscode-ide-mcp) via the Code CLI, or opens the Marketplace page. Then Developer: Reload Window.",
  };


  // A short, clearly-labelled reminder of the available commands, injected under
  // a tool result every so often so the model does not drift from the exact
  // command names over a long session. It is explicitly framed as an automatic
  // RelayZero reminder (NOT a user message and NOT a new command to run).
  function toolsReminder(tools) {
    const toolsString =
      "  list_commands() - list all available VS Code commands with full parameter details\n" +
      compactTools(tools);
    return (
      "\n\n────────────────────────────────\n" +
      "(System note from RelayZero - this is an automatic REMINDER, not a request and not a new result. " +
      "Do NOT reply to it or run any command because of it; just keep it in mind for your next command.)\n" +
      "Reminder of the VS Code + built-in commands (use exact names and parameter keys; " +
      "for other connected apps call list_mcp_servers):\n" +
      toolsString
    );
  }

  // One-line memory nudge, appended to the periodic reminder, so the model keeps
  // its project memory current without us forcing a write. Clearly framed as an
  // optional reminder, NOT a command to run right now.
  function memoryNudge() {
    return (
      "(Reminder: if you've learned anything DURABLE about this project since your last memory update " +
      "(how the solution is organised, where things live, conventions, decisions, user preferences), rewrite your " +
      "shared project memory with memory_write - read it with memory_read first, since a write replaces the " +
      "whole note - only useful, lasting facts. If nothing changed, ignore this.)"
    );
  }

  return {
    APP_NAME,
    SYS_MARKER,
    FEEDBACK,
    toolCategory,
    buildSystemPrompt,
    compactTools,
    toolsReminder,
    memoryNudge,
    TOOL_NOTES,
  };
})();
