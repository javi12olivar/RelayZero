// Quick Node smoke test for core/parser.js (run: node test-parser.js). Not shipped.
const fs = require("fs");
const ZSParse = new Function(fs.readFileSync(__dirname + "/core/parser.js", "utf8") + "; return ZSParse;")();

const ok = (name, cond) => { console.log((cond ? "PASS" : "FAIL") + "  " + name); if (!cond) process.exitCode = 1; };

const py = ZSParse.parseToolCalls("###CS###\nDebug.Log(GameObject.Find(\"Player\"));\n###END_CS###");
ok("cs block", py.length === 1 && py[0].tool === "execute_code" && py[0].arguments.code === 'Debug.Log(GameObject.Find("Player"));');
ok("cs block carries no extra args", py[0].arguments.datamodel_type === undefined && Object.keys(py[0].arguments).length === 1);

const pySpaced = ZSParse.parseToolCalls("### CS ###\nvar x = 1;\n### END_CS ###");
ok("markdown-mangled cs markers", pySpaced.length === 1 && pySpaced[0].tool === "execute_code");

const pyDash = ZSParse.parseToolCalls("###CS---\nvar x = 1;\n###END_CS###");
ok("###CS--- opener accepted", pyDash.length === 1 && pyDash[0].tool === "execute_code");

const pyLong = ZSParse.parseToolCalls("###csharp###\nDebug.Log(1);\n###END_CSHARP###");
ok("long form ###csharp### / ###END_CSHARP###", pyLong.length === 1 && pyLong[0].arguments.code === "Debug.Log(1);");

const pyHash = ZSParse.parseToolCalls("###C####\nDebug.Log(2);\n###END_C####");
ok("###C#### opener accepted", pyHash.length === 1 && pyHash[0].arguments.code === "Debug.Log(2);");

// Kimi bleeds its code-block "Copy" button caption into the block text right
// after a lowercase ###cs### marker: `###cs### Copy <code>`. The extracted code
// must NOT start with "Copy" (VS would fail to compile the snippet).
const pyCopy = ZSParse.parseToolCalls('###cs### Copy Debug.Log("dom test done");\n###END_CS###');
ok("strips Copy chrome from bare cs block", pyCopy.length === 1 && pyCopy[0].arguments.code === 'Debug.Log("dom test done");');
// A genuine identifier called Copy (no trailing space eaten) must survive.
const pyCopyIdent = ZSParse.parseToolCalls("###CS###\nCopy(gameObject);\n###END_CS###");
ok("keeps legit Copy( identifier", pyCopyIdent[0].arguments.code === "Copy(gameObject);");

// Markers left INSIDE a JSON-encoded code string must be stripped (seen live on
// GLM wrapping the block in the JSON envelope).
const nested = ZSParse.parseToolCalls('{"command":"execute_code","params":{"code":"###CS###\\nDebug.Log(1);\\n###END_CS###"}}');
ok("strips markers inside JSON code", nested.length === 1 && nested[0].arguments.code === "Debug.Log(1);");

const paramless = ZSParse.parseToolCalls('{"command":"list_commands"}');
ok("paramless command", paramless.length === 1 && paramless[0].tool === "list_commands");

const braces = ZSParse.parseToolCalls('{"command":"execute_code","params":{"code":"var d = new Dictionary<int,int>();"}}');
ok("braces inside string value", braces.length === 1 && braces[0].arguments.code === "var d = new Dictionary<int,int>();");

const legacy = ZSParse.parseToolCalls('{"tool":"find_gameobjects","arguments":{"name":"Player"}}');
ok("legacy tool/arguments schema", legacy.length === 1 && legacy[0].tool === "find_gameobjects");

const mcp = ZSParse.parseToolCalls('###MCP_TOOL###\n{"command":"manage_scene"}\n###END_MCP_TOOL###');
ok("mcp_tool wrapper", mcp.length === 1 && mcp[0].tool === "manage_scene");

// The old Luau markers are GONE. A model that still writes them must not be
// silently executed as C#: nothing parses, so the turn ends as plain text
// instead of shipping Luau anywhere.
ok("legacy ###LUA### block is not a command", ZSParse.parseToolCalls("###LUA###\nreturn 1\n###END_LUA###").length === 0);
ok("legacy ###PY### block is not a command", ZSParse.parseToolCalls("###PY###\nimport bpy\n###END_PY###").length === 0);

ok("open cs block detected", ZSParse.hasOpenToolBlock("###CS###\nDebug.Log(1);") === true);
ok("closed cs block not open", ZSParse.hasOpenToolBlock("###CS###\nDebug.Log(1);\n###END_CS###") === false);
ok("open json command detected", ZSParse.hasOpenToolBlock('{"command":"manage_scene","params":{"a":1') === true);

ok("prose has no signature", ZSParse.hasToolSignature("Here is how you could use a command in theory.") === false);
ok("command shape detected", ZSParse.hasCommandShape('{"command":"x"}') === true);
ok("injected feedback detected", ZSParse.isInjectedFeedback("Output of 'execute_code':\n2") === true);
ok("parse-error note is feedback not command", ZSParse.isInjectedFeedback('ERROR: bad JSON, write {"command": "name"}') === true);
ok("tool name mid-stream", ZSParse.toolNameFromText('{"command":"manage_') === "manage_");
ok("cs marker chips as the code tool", ZSParse.toolNameFromText("###CS###\nDebug.Log(1);") === "execute_code");

// ── salvageCutOff: auto-close a command whose trailing closers were cut ──
const cut1 = ZSParse.salvageCutOff('{"command": "find_gameobjects", "params": {"name": "Player"}');
ok("salvage: one missing root brace", cut1 && cut1.tool === "find_gameobjects" && cut1.arguments.name === "Player");
// Two missing closers (params + root) still salvages.
const cut2 = ZSParse.salvageCutOff('{"command": "memory_read", "params": {"name": "city"');
ok("salvage: two missing closers", cut2 && cut2.tool === "memory_read" && cut2.arguments.name === "city");
// Cut MID-STRING = real content amputated -> refuse.
ok("salvage refuses mid-string cut", ZSParse.salvageCutOff('{"command": "execute_code", "params": {"code": "for (var i = 0; i < 10') === null);
// Deep deficit (3 closers missing) -> refuse.
ok("salvage refuses deep deficit", ZSParse.salvageCutOff('{"command": "execute_code", "params": {"code": "x", "extra": {"a": 1') === null);
// A CLOSED command is not salvage's business.
ok("salvage ignores closed command", ZSParse.salvageCutOff('{"command": "list_commands"}') === null);
// Dangling comma after the last complete value = incomplete next value -> refuse.
ok("salvage refuses trailing comma", ZSParse.salvageCutOff('{"command": "memory_write", "params": {"content": "a"},') === null);
// Escaped quotes inside values must not confuse the string tracking.
const cutEsc = ZSParse.salvageCutOff('{"command": "execute_code", "params": {"code": "print(\\"hi\\")"}');
ok("salvage handles escaped quotes", cutEsc && cutEsc.tool === "execute_code" && cutEsc.arguments.code === 'print("hi")');
