import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { a as primaryAnalysisError, c as sourcePublicationRecoveryOf, i as init_analysisErrorBase, n as ProviderOwnedAnalysisError, r as domainErrorTag, s as resolvedAnalysisError, t as AnalysisError } from "./analysisErrorBase-C0hMa0_b.js";
import { i as init_configurationErrors, n as ConfigurationError, r as NoBinaryOpenError, t as BinaryTargetError } from "./configurationErrors-DgUy2JKH.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { $t as init_analysisResourceLimits, A as absoluteLocalPathStringSchema, At as MAXIMUM_ASAR_MAX_HEADER_BYTES, Bt as MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES, C as init_parseFailure, Ct as DEFAULT_KUNA_FUNCTION_TIMEOUT_MS, D as reportedParseLimit, Dt as DEFAULT_REGEX_MATCHING_DEADLINE_MS, Et as DEFAULT_PWNTOOLS_MAX_INPUT_BYTES, Ft as MAXIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES, Gt as MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS, Ht as MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB, It as MAXIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, Jt as MAX_NODE_TIMER_DELAY_MS, Kt as MAXIMUM_ZSTD_MAX_FRAMES, Lt as MAXIMUM_GHIDRA_DECOMPILE_PAYLOAD_MIB, Mt as MAXIMUM_BRIDGE_MAX_REPLY_BYTES, Nt as MAXIMUM_BRIDGE_MAX_REQUEST_BYTES, Ot as DEFAULT_WINDOWS_CHANGE_TIME_DRIFT_MS, Pt as MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB, Rt as MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS, St as DEFAULT_JEB_MCP_TIMEOUT_MS, Tt as DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES, Ut as MAXIMUM_WINDOWS_CHANGE_TIME_DRIFT_MS, Vt as MAXIMUM_PWNTOOLS_MAX_INPUT_BYTES, Wt as MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS, Xt as MINIMUM_BRIDGE_MAX_REQUEST_BYTES, Yt as MINIMUM_BRIDGE_MAX_REPLY_BYTES, Zt as MINIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES, _ as isImmutableJsonSnapshot, _t as DEFAULT_GHIDRA_VALUE_FLOW_MAX_OPERATIONS, b as ParseFailureError, bt as DEFAULT_JADX_OPERATION_TIMEOUT_MS, ct as DEFAULT_ASAR_MAX_HEADER_BYTES, dt as DEFAULT_BRIDGE_MAX_REQUEST_BYTES, en as timerDurationMsSchema, ft as DEFAULT_CAPTURE_PACKET_JSON_EXPANSION_BYTES, g as init_immutableJson, gt as DEFAULT_GHIDRA_VALUE_FLOW_MAX_EDGES, ht as DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS, it as init_coverage, j as init_localPath, jt as MAXIMUM_ASAR_MAX_LISTING_BYTES, kt as DEFAULT_ZSTD_MAX_FRAMES, lt as DEFAULT_ASAR_MAX_LISTING_BYTES, mt as DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, o as jsonValueSchema, ot as knownCoverageStatusSchema, pt as DEFAULT_DEBUGGER_COMMAND_DEADLINE_MS, qt as MAX_GHIDRA_DECOMPILE_TIMEOUT_SECONDS, r as init_jsonValue, ut as DEFAULT_BRIDGE_MAX_REPLY_BYTES, v as init_isRecord, vt as DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS, wt as DEFAULT_KUNA_PROJECT_TIMEOUT_MS, xt as DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES, y as isRecord, yt as DEFAULT_HOPPER_STARTUP_TIMEOUT_MS, zt as MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES } from "./jsonValue-BIEmjG1z.js";
import { G as EvidenceFileError, H as UnknownRegistryError, J as ResourceSnapshotMismatchError, K as EvidenceIntegrityError, Q as knownArgumentMistakeRemediation, U as init_unknownRegistryError, W as AnalysisSnapshotMismatchError, X as init_inputArgumentGuidance, Y as init_evidenceErrors, it as sha256Hex, nt as init_residualUnknownGraphError, q as EvidenceReferenceError, rt as init_sha256Hex, tt as describeResidualUnknownGraphConstraint } from "./canonicalDigest-DUQN3Yyz.js";
import { _ as init_analysisErrorCore, a as AnalysisCapabilityUnavailableError, d as AnalysisUnsupportedTargetError, i as AnalysisCancelledError, l as AnalysisResourceConstraintError, n as AnalysisAccessDeniedError, o as AnalysisInputError, r as AnalysisArtifactChangedError, s as AnalysisOutputError, u as AnalysisTimeoutError } from "./analysisErrorCore-CrdY4k0A.js";
import { n as init_errorMessage, t as errorMessage } from "./errorMessage-rfGn5D1_.js";
import { i as strictUtf8Decoder, n as init_strictUtf8 } from "./strictUtf8-Cx_KgW8Z.js";
import { r as init_providerAdapterError, t as ProviderAdapterError } from "./providerAdapterError-CdFzW4Ag.js";
import { posix, win32 } from "node:path";
import { z } from "zod";
import { constants } from "node:buffer";
import { AsyncLocalStorage } from "node:async_hooks";

//#region dist/platform/HostPlatform.js
var HOST_PLATFORM;
function init_HostPlatform() {
	return (init_HostPlatform = __esmMin((() => {
		HOST_PLATFORM = Object.freeze({
			platform: process.platform,
			architecture: process.arch
		});
	})))();
}

//#endregion
//#region dist/filesystem/callerPath.js
var isQualifiedCallerPath, appendCallerPath, absoluteCallerPath;
function init_callerPath() {
	return (init_callerPath = __esmMin((() => {
		init_HostPlatform();
		isQualifiedCallerPath = (path, platform = HOST_PLATFORM.platform) => platform === "win32" ? win32.isAbsolute(path) && win32.parse(path).root.length > 1 : posix.isAbsolute(path);
		appendCallerPath = (parent, child, platform = HOST_PLATFORM.platform) => platform === "win32" ? win32.join(parent, child) : parent === "" ? child : `${parent.endsWith("/") ? parent : `${parent}/`}${child}`;
		absoluteCallerPath = (path, { cwd, platform = HOST_PLATFORM.platform } = {}) => {
			if (platform === "win32") return win32.resolve(cwd ?? process.cwd(), path);
			if (!posix.isAbsolute(path)) {
				const selectedCwd = cwd ?? process.cwd();
				if (cwd === undefined && !posix.isAbsolute(selectedCwd)) throw new TypeError(`Cannot resolve ${path} with POSIX semantics from the non-POSIX working directory ${selectedCwd}`);
				const base = posix.isAbsolute(selectedCwd) ? selectedCwd : absoluteCallerPath(selectedCwd, { platform });
				return absoluteCallerPath(`${base}/${path}`, { platform });
			}
			const segments = path.split("/").filter((segment) => segment !== "" && segment !== ".");
			const directory = /\/\.?$/u.test(path) && segments.length > 0;
			return `/${segments.join("/")}${directory ? "/" : ""}`;
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticPrecision.js
var JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS, work, javaScriptSemanticPrecisionSchema, resolveJavaScriptSemanticPrecision;
function init_javascriptSemanticPrecision() {
	return (init_javascriptSemanticPrecision = __esmMin((() => {
		JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS = {
			primitive_candidates: 256,
			primitive_bytes: 1048576,
			expression_depth: 256,
			getter_expansions: 512,
			alias_selections: 512,
			wrapper_visits: 1e6,
			wrapper_depth: 128
		};
		work = z.number().int().min(1).max(Number.MAX_SAFE_INTEGER);
		javaScriptSemanticPrecisionSchema = z.strictObject({
			primitive_candidates: work.exactOptional(),
			primitive_bytes: work.exactOptional().describe(`Conservative JSON string-payload allowance per evaluated candidate set; default ${String(JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS.primitive_bytes)}. Admission charges six bytes per UTF-16 code unit plus quotes before creating concatenated strings, so ordinary ASCII can exhaust this estimate before its actual JSON encoding reaches the selected byte count. Independent of graph, checkpoint and worker-transfer budgets.`),
			expression_depth: work.exactOptional(),
			getter_expansions: work.exactOptional(),
			alias_selections: work.exactOptional(),
			wrapper_visits: work.exactOptional(),
			wrapper_depth: work.exactOptional()
		});
		resolveJavaScriptSemanticPrecision = (input) => input === undefined ? JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS : {
			...JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS,
			...input
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptAnalysisResourceControls.js
var JAVASCRIPT_STATIC_FACT_BYTES, JAVASCRIPT_ANALYSIS_TRANSFER_RECORD_BYTES, JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS, JAVASCRIPT_WORKER_HEAP_MIB_MINIMUM, JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM, JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM, HEAP_DOES_NOT_RAISE, javaScriptWorkerHeapRemediation, JAVASCRIPT_PARENT_HEAP_NODE_OPTIONS, JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION, JAVASCRIPT_PARENT_CHECKPOINT_HEAP_REMEDIATION, javaScriptWorkerHeapExhaustionRecovery, semanticControl, semanticAdjustment, semanticCeilingControl, javaScriptSemanticCeilingCoverage, javaScriptAnalysisCoverageLimits, javaScriptAnalysisResourceControlsSchema;
function init_javascriptAnalysisResourceControls() {
	return (init_javascriptAnalysisResourceControls = __esmMin((() => {
		init_analysisResourceLimits();
		init_javascriptSemanticPrecision();
		JAVASCRIPT_STATIC_FACT_BYTES = 8 * 1024 * 1024;
		JAVASCRIPT_ANALYSIS_TRANSFER_RECORD_BYTES = 8 * 1024 * 1024;
		JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS = {
			heapMb: 1024,
			timeoutMs: 3e5,
			semanticNodes: 1e5,
			semanticNodesPerFile: 2e4,
			semanticUnknowns: 1e5,
			semanticUnknownsPerFile: 2e4
		};
		JAVASCRIPT_WORKER_HEAP_MIB_MINIMUM = 128;
		JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM = 16384;
		JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM = 1e6;
		HEAP_DOES_NOT_RAISE = "Raising max_heap_mb does not raise the parent result budget, transfer record or transfer file byte ceilings, the CLI/MCP process heap, or fixed parser limits.";
		javaScriptWorkerHeapRemediation = (heapMb) => {
			const bounds = `an integer from ${String(128)} to ${String(JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM)} (default ${String(JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.heapMb)} MiB)`;
			const adjustment = heapMb >= 16384 ? `max_heap_mb is already ${String(heapMb)} MiB, the maximum ${String(JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM)}. Do not increase it further.` : `Increase max_heap_mb, ${bounds}.`;
			return `${adjustment} The effective worker heap for this analysis is ${String(heapMb)} MiB. A changed max_heap_mb applies on the next analysis, which starts a new worker. It does not change a worker that is already running, and it does not require restarting the REA server. ${HEAP_DOES_NOT_RAISE} On Bun, V8 heap flags are ignored: Windows limits the analyzer's committed memory to max_heap_mb plus a 512 MiB reserve, and other Bun hosts enforce no analyzer heap limit.`;
		};
		JAVASCRIPT_PARENT_HEAP_NODE_OPTIONS = "On Node, set NODE_OPTIONS (for example --max-old-space-size=<MiB>) in the environment that starts the CLI or MCP server, then restart that process,";
		JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION = `This limit belongs to the parent result budget. That budget follows the parent V8 heap limit. Increasing max_heap_mb does not raise it. ${JAVASCRIPT_PARENT_HEAP_NODE_OPTIONS} to raise the parent heap and this budget. Use the retained static facts or analyze fewer source files.`;
		JAVASCRIPT_PARENT_CHECKPOINT_HEAP_REMEDIATION = `This limit belongs to the parent process heap. Increasing max_heap_mb does not raise it. max_heap_mb changes only the isolated analyzer, on the next analysis, by starting a new worker. ${JAVASCRIPT_PARENT_HEAP_NODE_OPTIONS} to raise the parent heap and admit this checkpoint.`;
		javaScriptWorkerHeapExhaustionRecovery = (input) => {
			if (input.heapFlagsEnforced) return {
				reason: `Owned JavaScript worker exhausted its ${String(input.heapMb)} MiB V8 old-space heap (max_heap_mb) while analyzing ${input.path} during ${input.phase}`,
				remediationAction: javaScriptWorkerHeapRemediation(input.heapMb)
			};
			return {
				reason: `Owned JavaScript worker ran out of memory while analyzing ${input.path} during ${input.phase}. Bun ignores the V8 old-space flag, so this exit is not the configured max_heap_mb limit of ${String(input.heapMb)} MiB.`,
				remediationAction: "Bun ignores V8 heap flags, so raising max_heap_mb does not change this exit. Windows limits the analyzer's committed memory to max_heap_mb plus a 512 MiB reserve and reports that separately as a process memory limit. Other Bun hosts enforce no analyzer heap limit. Reduce the analysis instead of increasing max_heap_mb."
			};
		};
		semanticControl = {
			nodes: {
				total: "max_semantic_nodes",
				perFile: "max_semantic_nodes_per_file",
				ceiling: "semantic_graph_node_ceiling",
				fileCeiling: "semantic_graph_file_node_ceiling",
				totalDefault: JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.semanticNodes,
				perFileDefault: JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.semanticNodesPerFile,
				doesNotRaise: "max_semantic_unknowns, max_heap_mb, transfer ceilings, or the parent result budget"
			},
			unknowns: {
				total: "max_semantic_unknowns",
				perFile: "max_semantic_unknowns_per_file",
				ceiling: "semantic_graph_unknown_ceiling",
				fileCeiling: "semantic_graph_file_unknown_ceiling",
				totalDefault: JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.semanticUnknowns,
				perFileDefault: JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.semanticUnknownsPerFile,
				doesNotRaise: "max_semantic_nodes, max_heap_mb, transfer ceilings, or the parent result budget"
			}
		};
		semanticAdjustment = (name, value, fallback) => value >= 1e6 ? `${name} is already ${String(value)}, the maximum ${String(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM)}. Do not increase it further.` : `${name} is ${String(value)} (default ${String(fallback)}; an integer from 1 to ${String(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM)})`;
		semanticCeilingControl = (parameter, value, fallback) => ({
			control_kind: "parameter",
			parameter,
			effective_value: value,
			unit: "count",
			minimum: 1,
			maximum: JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM,
			default_value: fallback,
			applies_at: "next_call"
		});
		javaScriptSemanticCeilingCoverage = (kind, total, perFile, reached) => {
			const control = semanticControl[kind];
			const limits = [
				{
					name: control.ceiling,
					value: total,
					unit: "items"
				},
				{
					name: control.fileCeiling,
					value: perFile,
					unit: "items"
				},
				{
					name: control.total,
					value: total,
					unit: "items"
				},
				{
					name: control.perFile,
					value: perFile,
					unit: "items"
				}
			];
			const reachedControls = [...reached.total ? [{
				name: control.total,
				value: total,
				fallback: control.totalDefault
			}] : [], ...reached.perFile ? [{
				name: control.perFile,
				value: perFile,
				fallback: control.perFileDefault
			}] : []];
			if (reachedControls.length === 0) throw new RangeError("Semantic ceiling coverage requires a ceiling that stopped retention");
			const reachedText = reachedControls.map((item) => semanticAdjustment(item.name, item.value, item.fallback)).join(" and ");
			const names = reachedControls.map((item) => item.name).join(" and ");
			const raising = reachedControls.length === 1 ? "Raising it" : "Raising them";
			const limitation = `Semantic ${kind === "nodes" ? "node" : "unknown"} retention reached ${reachedText}. Set ${names} on the next analyze_javascript_application call; coverage.controls records ${reachedControls.length === 1 ? "it" : "them"}. The change applies to that next analysis and does not restart the worker or the REA server. ${raising} does not raise ${control.doesNotRaise}. Coverage reports the same effective values as ${control.ceiling} and ${control.fileCeiling}.`;
			const controls = reachedControls.map((item) => semanticCeilingControl(item.name, item.value, item.fallback));
			return {
				limits,
				controls,
				limitation
			};
		};
		javaScriptAnalysisCoverageLimits = (limits) => {
			const result = [];
			for (const key of [
				"worker_heap_limit_bytes",
				"worker_process_memory_limit_bytes",
				"worker_timeout_ms",
				"parent_result_budget_bytes",
				"parent_available_result_budget_bytes",
				"semantic_result_budget_bytes",
				"transfer_record_bytes",
				"transfer_file_bytes"
			]) {
				const value = limits?.[key];
				if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) continue;
				result.push({
					name: `javascript_analysis_${key}`,
					value,
					unit: key.endsWith("_ms") ? "milliseconds" : "bytes"
				});
			}
			return result;
		};
		javaScriptAnalysisResourceControlsSchema = z.strictObject({
			semantic_precision: javaScriptSemanticPrecisionSchema.optional().describe(`Per-source evaluator budgets. Omitted fields preserve defaults: ${Object.entries(JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS).map(([name, value]) => `${name} ${String(value)}`).join(", ")}. Raising these does not raise graph retention, worker memory, transfer or parent result budgets; cyclic and unsupported values remain unknown.`),
			max_semantic_nodes: z.number().int().min(1).max(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM).optional().describe("Maximum retained semantic nodes across the application; defaults to 100000. Worker heap and parent result admission remain enforced."),
			max_semantic_nodes_per_file: z.number().int().min(1).max(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM).optional().describe("Maximum retained semantic nodes per source file; defaults to 20000, additionally bounded by max_semantic_nodes and memory/transfer limits."),
			max_semantic_unknowns: z.number().int().min(1).max(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM).optional().describe("Maximum retained semantic unknown records across the application; defaults to 100000. Omitted emission occurrences are counted by family and reason."),
			max_semantic_unknowns_per_file: z.number().int().min(1).max(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM).optional().describe("Maximum retained semantic unknown records per source file; defaults to 20000, additionally bounded by max_semantic_unknowns and memory/transfer limits."),
			max_heap_mb: z.number().int().min(128).max(JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM).optional().describe("Maximum V8 old-space heap in MiB for the isolated JavaScript source analyzer; defaults to 1024. This does not change the CLI/MCP process heap. When REA runs on Bun, which ignores V8 heap flags, Windows instead limits the analyzer's committed memory to this budget plus a 512 MiB runtime reserve; other Bun hosts enforce no limit."),
			analysis_timeout_ms: timerDurationMsSchema.optional().describe("Maximum startup, analysis and transfer time per JavaScript source, in milliseconds; defaults to 300000. On timeout, return collected partial Evidence and stop the analysis.")
		});
	})))();
}

//#endregion
//#region dist/domain/wasm/wasmInterface.js
var kind, valueType, limit, signature, wasmInterfaceSchema, DEFAULT_WASM_INTERFACE_REPRESENTATION_BYTES, MAX_WASM_INTERFACE_REPRESENTATION_BYTES, wasmInterfaceByteBudgetSchema, wasmInterfaceEntryRepresentationBytes;
function init_wasmInterface() {
	return (init_wasmInterface = __esmMin((() => {
		init_coverage();
		kind = z.enum([
			"func",
			"table",
			"memory",
			"global",
			"tag",
			"unknown"
		]);
		valueType = z.enum([
			"i32",
			"i64",
			"f32",
			"f64",
			"v128",
			"funcref",
			"externref"
		]);
		limit = z.string().regex(/^(?:0|[1-9][0-9]*)$/u);
		signature = z.discriminatedUnion("kind", [
			z.object({
				kind: z.literal("func"),
				params: z.array(valueType),
				results: z.array(valueType)
			}),
			z.object({
				kind: z.literal("tag"),
				params: z.array(valueType),
				results: z.array(valueType)
			}),
			z.object({
				kind: z.literal("table"),
				element: z.enum(["funcref", "externref"]),
				address_type: z.enum(["i32", "i64"]),
				minimum: limit,
				maximum: limit.nullable(),
				shared: z.boolean()
			}),
			z.object({
				kind: z.literal("memory"),
				page_size: limit,
				address_type: z.enum(["i32", "i64"]),
				minimum: limit,
				maximum: limit.nullable(),
				shared: z.boolean()
			}),
			z.object({
				kind: z.literal("global"),
				value_type: valueType,
				mutable: z.boolean()
			})
		]);
		wasmInterfaceSchema = z.object({
			state: knownCoverageStatusSchema,
			entries: z.array(z.object({
				direction: z.enum(["import", "export"]),
				module: z.string().nullable(),
				name: z.string(),
				kind,
				index: z.int().nonnegative().max(4294967295).nullable(),
				signature: signature.nullable(),
				wat_form: z.string(),
				issue: z.string().nullable()
			}).superRefine((entry, context) => {
				if (entry.direction === "export" && entry.module !== null || entry.direction === "import" && entry.module === null) context.addIssue({
					code: "custom",
					message: "Interface direction does not match module-name presence"
				});
				if (entry.signature !== null && entry.signature.kind !== entry.kind) context.addIssue({
					code: "custom",
					message: "Interface kind does not match its typed signature"
				});
			})),
			issues: z.array(z.string())
		});
		DEFAULT_WASM_INTERFACE_REPRESENTATION_BYTES = 32 * 1024 * 1024;
		MAX_WASM_INTERFACE_REPRESENTATION_BYTES = constants.MAX_STRING_LENGTH;
		wasmInterfaceByteBudgetSchema = z.number().int().min(1).max(MAX_WASM_INTERFACE_REPRESENTATION_BYTES).exactOptional().describe(`Typed interface representation admission in bytes (default ${String(DEFAULT_WASM_INTERFACE_REPRESENTATION_BYTES)}, range 1..${String(MAX_WASM_INTERFACE_REPRESENTATION_BYTES)}; maximum follows the runtime string ceiling). Applies on the next inspection or comparison without restart. Raising this does not restore facts omitted from previously produced partial Evidence; inspect again with a larger producer budget first.`);
		wasmInterfaceEntryRepresentationBytes = (entry) => {
			let bytes = 1024 + [
				entry.module,
				entry.name,
				entry.wat_form,
				entry.issue
			].reduce((sum, value) => sum + (value?.length ?? 0) * 6, 0);
			const signature = entry.signature;
			if (signature?.kind === "func" || signature?.kind === "tag") bytes += (signature.params.length + signature.results.length) * 16;
			else if (signature !== null) {
				for (const value of Object.values(signature)) if (typeof value === "string") bytes += value.length * 6;
			}
			return bytes;
		};
	})))();
}

//#endregion
//#region dist/domain/wasm/wasmArtifact.js
var WABT_VERSION, WABT_MINIMUM_PATCH, WABT_SOURCE_COMMIT, wabtReleaseBanner, digest, artifact, DEFAULT_WASM_COMMAND_TIMEOUT_MS, DEFAULT_WASM_ARTIFACT_PATHS, MAX_WASM_ARTIFACT_PATHS, WASM_RESOURCE_DEFAULTS, WASM_RESOURCE_MAXIMUMS, byteBudget, wasmArtifactPathsSchema, inspectWasmArtifactInputSchema, wasmResourceLimits, wasmArtifactSchema, wasmArtifactMatchesSubject;
function init_wasmArtifact() {
	return (init_wasmArtifact = __esmMin((() => {
		init_analysisResourceLimits();
		init_wasmInterface();
		init_coverage();
		init_localPath();
		init_sha256Hex();
		WABT_VERSION = "1.0.42";
		WABT_MINIMUM_PATCH = Number(WABT_VERSION.split(".")[2]);
		WABT_SOURCE_COMMIT = "ff0ef7e0009402740c805a9744c09b05be063e48";
		wabtReleaseBanner = z.string().regex(/^1\.0\.\d+$/u).refine((release) => Number(release.split(".")[2]) >= WABT_MINIMUM_PATCH, { message: `Expected one admitted WABT banner (^1.0.${String(WABT_MINIMUM_PATCH)})` });
		digest = z.string().regex(/^[a-f0-9]{64}$/);
		artifact = z.strictObject({
			path: z.string().min(1),
			sha256: digest,
			bytes: z.int().nonnegative()
		});
		DEFAULT_WASM_COMMAND_TIMEOUT_MS = 3e4;
		DEFAULT_WASM_ARTIFACT_PATHS = 16;
		MAX_WASM_ARTIFACT_PATHS = 4294967295;
		WASM_RESOURCE_DEFAULTS = {
			inputBytes: 8 * 1024 * 1024,
			toolBytes: 64 * 1024 * 1024,
			outputBytes: 32 * 1024 * 1024
		};
		WASM_RESOURCE_MAXIMUMS = {
			inputBytes: Math.min(constants.MAX_LENGTH, constants.MAX_STRING_LENGTH),
			toolBytes: constants.MAX_LENGTH,
			outputBytes: constants.MAX_STRING_LENGTH
		};
		byteBudget = (name, defaultValue, maximum) => z.number().int().min(1).max(maximum).exactOptional().describe(`${name} in bytes (default ${String(defaultValue)}; maximum ${String(maximum)}, the runtime representation limit). Applies to the next inspection; no restart. Does not raise the other byte budgets, command deadline, client receive budget or available host memory.`);
		wasmArtifactPathsSchema = (pathSchema = absoluteLocalPathStringSchema) => z.array(pathSchema);
		inspectWasmArtifactInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute selected local WASM artifact path"),
			glue_paths: wasmArtifactPathsSchema().default([]),
			candidate_paths: wasmArtifactPathsSchema().default([]),
			max_artifact_paths: z.number().int().min(1).max(MAX_WASM_ARTIFACT_PATHS).exactOptional().describe(`Maximum paths in each auxiliary glue/candidate selection (default ${String(16)}, range 1..${String(MAX_WASM_ARTIFACT_PATHS)}, the runtime Array-length ceiling). Admission occurs before reading files or starting WABT. Applies to the next inspection without restart; byte budgets remain independent.`),
			max_interface_bytes: wasmInterfaceByteBudgetSchema,
			max_input_bytes: byteBudget("Maximum bytes per selected module, candidate or glue file", WASM_RESOURCE_DEFAULTS.inputBytes, WASM_RESOURCE_MAXIMUMS.inputBytes),
			max_tool_bytes: byteBudget("Maximum bytes per caller-supplied WABT executable", WASM_RESOURCE_DEFAULTS.toolBytes, WASM_RESOURCE_MAXIMUMS.toolBytes),
			max_output_bytes: byteBudget("Combined retained stdout/stderr per WABT command", WASM_RESOURCE_DEFAULTS.outputBytes, WASM_RESOURCE_MAXIMUMS.outputBytes),
			command_timeout_ms: timerDurationMsSchema.exactOptional().describe(`Deadline in milliseconds for each WABT version/analysis command (default ${String(DEFAULT_WASM_COMMAND_TIMEOUT_MS)}), not the whole inspection. Allow additional client time for all commands, file checks and cleanup. Does not raise max_input_bytes, max_tool_bytes or max_output_bytes.`)
		});
		wasmResourceLimits = (input) => ({
			inputBytes: input.max_input_bytes ?? WASM_RESOURCE_DEFAULTS.inputBytes,
			toolBytes: input.max_tool_bytes ?? WASM_RESOURCE_DEFAULTS.toolBytes,
			outputBytes: input.max_output_bytes ?? WASM_RESOURCE_DEFAULTS.outputBytes
		});
		wasmArtifactSchema = z.strictObject({
			artifact,
			validation: z.literal("valid"),
			sections: z.array(z.strictObject({
				kind: z.string().min(1),
				start: z.int().nonnegative(),
				end: z.int().nonnegative(),
				bytes: z.int().nonnegative(),
				description: z.string()
			})),
			interface: wasmInterfaceSchema.exactOptional(),
			imports: z.array(z.string()),
			exports: z.array(z.string()),
			debug_name_metadata: z.enum([
				"unknown",
				"not-present",
				"complete",
				"uninterpretable"
			]).default("unknown"),
			custom_section_warnings: z.array(z.strictObject({
				tool: z.enum([
					"wasm-validate",
					"wasm-objdump",
					"wasm2wat"
				]),
				text: z.string().min(1)
			})).nullable().default(null),
			headers: z.string(),
			details: z.string(),
			wat: z.strictObject({
				text: z.string().min(1),
				sha256: digest,
				representation: z.literal("decoded-wat")
			}),
			tool_profile: z.strictObject({
				source: z.literal("https://github.com/WebAssembly/wabt"),
				release: wabtReleaseBanner,
				/**
				* Names the verified upstream revision only when that release is what
				* ran; a caller-supplied newer 1.0.x build has no revision REA knows, so
				* the field is null rather than a claim about a build that did not run.
				*/
				source_commit: z.literal(WABT_SOURCE_COMMIT).nullable(),
				commands: z.array(z.strictObject({
					tool: z.enum([
						"wasm-validate",
						"wasm-objdump",
						"wasm2wat"
					]),
					path: z.string().min(1),
					sha256: digest,
					version_banner: z.string(),
					arguments: z.array(z.string())
				})).length(3),
				timeout_ms: z.int().positive(),
				output_budget_bytes: z.int().positive()
			}),
			candidates: z.array(artifact),
			glue: z.array(z.strictObject({
				artifact,
				parse_status: z.enum([...knownCoverageStatusSchema.options, "failed"]),
				references: z.array(z.strictObject({
					value: z.string(),
					line: z.int().positive(),
					column: z.int().nonnegative(),
					candidate_paths: z.array(z.string()),
					association: z.enum([
						"local-path-candidate",
						"basename-candidates",
						"unresolved"
					]),
					evidence_kind: z.literal("static-literal")
				}))
			})),
			runtime_execution: z.literal("not-performed"),
			network_fetch: z.literal("not-performed"),
			limitations: z.array(z.string())
		}).superRefine((value, context) => {
			if (sha256Hex(value.wat.text) !== value.wat.sha256) context.addIssue({
				code: "custom",
				path: ["wat", "sha256"],
				message: "Decoded WAT digest does not match its UTF-8 text."
			});
			const selected = value.candidates[0];
			if (selected?.path !== value.artifact.path || selected.sha256 !== value.artifact.sha256 || selected.bytes !== value.artifact.bytes) context.addIssue({
				code: "custom",
				path: ["candidates"],
				message: "Selected candidate does not match artifact identity."
			});
			const tolerantCustomSections = value.tool_profile.commands[0]?.arguments.includes("--ignore-custom-section-errors");
			const releaseVersion = value.tool_profile.release;
			if (value.tool_profile.source_commit !== null && releaseVersion !== "1.0.42") context.addIssue({
				code: "custom",
				path: ["tool_profile", "source_commit"],
				message: "The known WABT source revision applies only to its verified release; other releases require an unknown source commit."
			});
			for (const [index, command] of value.tool_profile.commands.entries()) {
				const expected = [
					"wasm-validate",
					"wasm-objdump",
					"wasm2wat"
				][index];
				const argumentsExpected = command.tool === "wasm-objdump" ? [
					"-h",
					"-x",
					"module.wasm"
				] : tolerantCustomSections ? [
					"--enable-all",
					"--ignore-custom-section-errors",
					"module.wasm"
				] : ["--enable-all", "module.wasm"];
				if (command.tool !== expected || command.version_banner.trim() !== releaseVersion || JSON.stringify(command.arguments) !== JSON.stringify(argumentsExpected)) context.addIssue({
					code: "custom",
					path: [
						"tool_profile",
						"commands",
						index
					],
					message: "Unexpected WABT command profile."
				});
			}
			for (const [index, section] of value.sections.entries()) if (section.end > value.artifact.bytes || section.end - section.start !== section.bytes) context.addIssue({
				code: "custom",
				path: ["sections", index],
				message: "Section range does not match selected artifact bytes."
			});
		});
		wasmArtifactMatchesSubject = (artifact, subject) => subject != null && subject.sha256 === artifact.sha256 && subject.format === "file";
	})))();
}

//#endregion
//#region dist/domain/analysisSettingDefinitions.js
var timer, ghidraDecompileOperations, windowsChangeTimeOperations, hopperAndGhidraBridgeOperations, ANALYSIS_SETTINGS, analysisSettingIds, analysisSettingIdSchema, analysisSettingLimitSchema, analysisParameterLimitSchema, analysisResultLimitSchema, recordedControlSchemas, analysisSettingDefinition, analysisSettingValueSchema, selectedAnalysisSetting, analysisSettingLimit, invocationLimit, invocationSettingLimit;
function init_analysisSettingDefinitions() {
	return (init_analysisSettingDefinitions = __esmMin((() => {
		init_analysisResourceLimits();
		init_javascriptAnalysisResourceControls();
		init_wasmArtifact();
		timer = {
			minimum: 1,
			maximum: MAX_NODE_TIMER_DELAY_MS,
			unit: "ms",
			appliesAt: "next_operation"
		};
		ghidraDecompileOperations = [
			"procedure_pseudo_code",
			"analyze_function",
			"inspect_native_api",
			"decompile_all",
			"trace_native_values"
		];
		windowsChangeTimeOperations = [
			"open_binary",
			"export_web_scripts",
			"capture_process_scenario",
			"compare_process_captures",
			"inspect_analysis_view",
			"compare_bundles",
			"import_evidence_bundle",
			"inspect_android_package",
			"search_android_classes",
			"inspect_android_class",
			"inspect_android_method",
			"trace_android_references",
			"inventory_artifact",
			"inspect_artifact",
			"extract_artifact",
			"inspect_binary_layout",
			"inspect_recorded_crash"
		];
		hopperAndGhidraBridgeOperations = [
			"open_binary",
			"address_name",
			"comment",
			"current_address",
			"current_procedure",
			"current_document",
			"goto_address",
			"inline_comment",
			"list_bookmarks",
			"list_documents",
			"list_names",
			"list_procedures",
			"list_segments",
			"list_strings",
			"next_address",
			"prev_address",
			"procedure_address",
			"procedure_assembly",
			"procedure_callees",
			"procedure_callers",
			"procedure_info",
			"read_function_instructions",
			"read_bytes",
			"address_to_file_offset",
			"procedure_references",
			"procedure_pseudo_code",
			"resolve_containing_procedure",
			"search_procedures",
			"search_strings",
			"set_address_name",
			"set_addresses_names",
			"set_bookmark",
			"set_comment",
			"set_inline_comment",
			"unset_bookmark",
			"xrefs",
			"analyze_function",
			"binary_overview",
			"inspect_native_load_image",
			"search_bytes",
			"annotate_native_function",
			"inspect_native_data_type",
			"inspect_native_instruction",
			"resolve_native_call_targets"
		];
		ANALYSIS_SETTINGS = {
			"ghidra.decompile_max_payload_mib": {
				updateMode: "runtime",
				environment: "REA_GHIDRA_DECOMPILE_MAX_PAYLOAD_MIB",
				defaultValue: null,
				minimum: 1,
				maximum: MAXIMUM_GHIDRA_DECOMPILE_PAYLOAD_MIB,
				unit: "MiB",
				appliesAt: "next_operation",
				provider: "ghidra",
				operations: ghidraDecompileOperations
			},
			"asar.max_listing_bytes": {
				updateMode: "runtime",
				environment: "REA_ASAR_MAX_LISTING_BYTES",
				defaultValue: DEFAULT_ASAR_MAX_LISTING_BYTES,
				minimum: 1,
				maximum: MAXIMUM_ASAR_MAX_LISTING_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "rea-artifact-graph",
				relatedProviders: [
					"rea-javascript-application",
					"rea-cdp-electron",
					"rea-v8-inspector"
				],
				operations: [
					"open_binary",
					"inspect_artifact",
					"inventory_artifact",
					"extract_artifact",
					"analyze_javascript_application",
					"inspect_electron_page",
					"observe_javascript_runtime"
				]
			},
			"ghidra.value_flow_max_operations": {
				updateMode: "runtime",
				environment: "REA_GHIDRA_VALUE_FLOW_MAX_OPERATIONS",
				defaultValue: DEFAULT_GHIDRA_VALUE_FLOW_MAX_OPERATIONS,
				minimum: 1,
				maximum: MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS,
				unit: "count",
				appliesAt: "next_operation",
				provider: "ghidra",
				operations: [
					"analyze_function",
					"inspect_native_api",
					"trace_native_values"
				]
			},
			"ghidra.value_flow_max_inputs_per_operation": {
				updateMode: "runtime",
				environment: "REA_GHIDRA_VALUE_FLOW_MAX_INPUTS_PER_OPERATION",
				defaultValue: 64,
				minimum: 1,
				maximum: MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS,
				unit: "count",
				appliesAt: "next_operation",
				provider: "ghidra",
				operations: [
					"analyze_function",
					"inspect_native_api",
					"trace_native_values"
				]
			},
			"ghidra.value_flow_max_edges": {
				updateMode: "runtime",
				environment: "REA_GHIDRA_VALUE_FLOW_MAX_EDGES",
				defaultValue: DEFAULT_GHIDRA_VALUE_FLOW_MAX_EDGES,
				minimum: 1,
				maximum: MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS,
				unit: "count",
				appliesAt: "next_operation",
				provider: "ghidra",
				operations: [
					"analyze_function",
					"inspect_native_api",
					"trace_native_values"
				]
			},
			"asar.max_header_bytes": {
				updateMode: "runtime",
				environment: "REA_ASAR_MAX_HEADER_BYTES",
				defaultValue: DEFAULT_ASAR_MAX_HEADER_BYTES,
				minimum: 1,
				maximum: MAXIMUM_ASAR_MAX_HEADER_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "rea-artifact-graph",
				relatedProviders: [
					"rea-javascript-application",
					"rea-cdp-electron",
					"rea-v8-inspector"
				],
				operations: [
					"open_binary",
					"inspect_artifact",
					"inventory_artifact",
					"extract_artifact",
					"analyze_javascript_application",
					"inspect_electron_page",
					"observe_javascript_runtime"
				]
			},
			"ghidra.startup_timeout_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_GHIDRA_STARTUP_TIMEOUT_MS",
				defaultValue: DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS,
				appliesAt: "next_startup",
				provider: "ghidra",
				operations: [
					"open_binary",
					"binary_overview",
					"list_documents",
					"list_procedures",
					"search_procedures",
					"list_strings",
					"search_strings",
					"procedure_pseudo_code",
					"procedure_assembly",
					"analyze_function",
					"decompile_all",
					"trace_native_values"
				]
			},
			"hopper.startup_timeout_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_HOPPER_STARTUP_TIMEOUT_MS",
				defaultValue: DEFAULT_HOPPER_STARTUP_TIMEOUT_MS,
				appliesAt: "next_startup",
				provider: "hopper",
				operations: [
					"open_binary",
					"binary_overview",
					"list_documents",
					"list_procedures",
					"search_procedures",
					"list_strings",
					"search_strings",
					"procedure_pseudo_code",
					"procedure_assembly",
					"analyze_function",
					"decompile_all",
					"trace_native_values"
				]
			},
			"ghidra.decompile_timeout_seconds": {
				updateMode: "runtime",
				environment: "REA_GHIDRA_DECOMPILE_TIMEOUT_SECONDS",
				defaultValue: null,
				minimum: 1,
				maximum: MAX_GHIDRA_DECOMPILE_TIMEOUT_SECONDS,
				unit: "seconds",
				appliesAt: "next_operation",
				provider: "ghidra",
				operations: ghidraDecompileOperations
			},
			"jadx.operation_timeout_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_JADX_OPERATION_TIMEOUT_MS",
				defaultValue: DEFAULT_JADX_OPERATION_TIMEOUT_MS,
				provider: "jadx",
				operations: [
					"inspect_android_package",
					"search_android_classes",
					"inspect_android_class",
					"inspect_android_method",
					"trace_android_references"
				]
			},
			"regex.matching_deadline_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_REGEX_MATCHING_DEADLINE_MS",
				defaultValue: DEFAULT_REGEX_MATCHING_DEADLINE_MS,
				maximum: MAX_NODE_TIMER_DELAY_MS,
				provider: "regex",
				relatedProviders: [
					"ida",
					"hopper",
					"kuna"
				],
				operations: ["search_strings", "search_procedures"]
			},
			"regex.worker_heap_request_mib": {
				updateMode: "runtime",
				environment: "REA_REGEX_WORKER_HEAP_REQUEST_MIB",
				defaultValue: 128,
				minimum: 7,
				maximum: MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB,
				unit: "MiB",
				appliesAt: "next_worker",
				provider: "regex",
				relatedProviders: [
					"ida",
					"hopper",
					"kuna"
				],
				operations: ["search_strings", "search_procedures"]
			},
			"capture.decoder_old_generation_mib": {
				updateMode: "runtime",
				environment: "REA_CAPTURE_DECODER_OLD_GENERATION_MIB",
				defaultValue: 192,
				minimum: 8,
				maximum: MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB,
				unit: "MiB",
				appliesAt: "next_worker",
				provider: "capture",
				operations: ["inspect_web_network_capture"]
			},
			"capture.packet_json_expansion_bytes": {
				updateMode: "runtime",
				environment: "REA_CAPTURE_PACKET_JSON_EXPANSION_BYTES",
				defaultValue: DEFAULT_CAPTURE_PACKET_JSON_EXPANSION_BYTES,
				minimum: MINIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES,
				maximum: MAXIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "tshark-capture",
				operations: ["inspect_packet_capture"]
			},
			"javascript.analysis_timeout_ms": {
				updateMode: "runtime",
				...timer,
				defaultValue: JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.timeoutMs,
				provider: "rea-javascript-application",
				operations: ["analyze_javascript_application"],
				parameter: "analysis_timeout_ms"
			},
			"javascript.max_heap_mb": {
				updateMode: "runtime",
				defaultValue: JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.heapMb,
				minimum: 128,
				maximum: JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM,
				unit: "MiB",
				appliesAt: "next_worker",
				provider: "rea-javascript-application",
				operations: ["analyze_javascript_application"],
				parameter: "max_heap_mb"
			},
			"javascript.member_mutation_alias_states": {
				updateMode: "runtime",
				environment: "REA_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES",
				defaultValue: DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES,
				minimum: 1,
				maximum: MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES,
				unit: "count",
				appliesAt: "next_operation",
				provider: "rea-javascript-application",
				relatedProviders: ["web-bundle-static-analysis"],
				operations: ["analyze_javascript_application", "analyze_web_bundle"]
			},
			"wasm.command_timeout_ms": {
				updateMode: "runtime",
				...timer,
				defaultValue: DEFAULT_WASM_COMMAND_TIMEOUT_MS,
				maximum: MAX_NODE_TIMER_DELAY_MS,
				provider: "wabt-artifact",
				operations: ["inspect_wasm_artifact"],
				parameter: "command_timeout_ms"
			},
			"native.matching_representation_bytes": {
				updateMode: "runtime",
				environment: "REA_NATIVE_MATCHING_REPRESENTATION_BYTES",
				defaultValue: DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES,
				minimum: 1,
				maximum: MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "rea-function-comparison",
				operations: ["match_native_functions"]
			},
			"bridge.max_request_bytes": {
				updateMode: "runtime",
				environment: "REA_BRIDGE_MAX_REQUEST_BYTES",
				defaultValue: DEFAULT_BRIDGE_MAX_REQUEST_BYTES,
				minimum: MINIMUM_BRIDGE_MAX_REQUEST_BYTES,
				maximum: MAXIMUM_BRIDGE_MAX_REQUEST_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "hopper",
				relatedProviders: ["ghidra", "cutter"],
				operations: [
					...hopperAndGhidraBridgeOperations,
					"list_cutter_sessions",
					"cutter_command"
				]
			},
			"bridge.max_reply_bytes": {
				updateMode: "runtime",
				environment: "REA_BRIDGE_MAX_REPLY_BYTES",
				defaultValue: DEFAULT_BRIDGE_MAX_REPLY_BYTES,
				minimum: MINIMUM_BRIDGE_MAX_REPLY_BYTES,
				maximum: MAXIMUM_BRIDGE_MAX_REPLY_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "hopper",
				relatedProviders: ["ghidra"],
				operations: hopperAndGhidraBridgeOperations
			},
			"debugger.command_deadline_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_DEBUGGER_COMMAND_DEADLINE_MS",
				defaultValue: DEFAULT_DEBUGGER_COMMAND_DEADLINE_MS,
				minimum: 1,
				maximum: MAX_NODE_TIMER_DELAY_MS,
				provider: "gdb",
				relatedProviders: ["rizin"],
				operations: [
					"start_gdb_session",
					"gdb_console",
					"close_gdb_session",
					"start_rizin_debug_session",
					"rizin_debug_command",
					"close_rizin_debug_session"
				]
			},
			"debugger.max_command_output_bytes": {
				updateMode: "runtime",
				environment: "REA_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES",
				defaultValue: DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES,
				minimum: 1,
				maximum: MAXIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "gdb",
				relatedProviders: ["rizin"],
				operations: ["gdb_console", "rizin_debug_command"]
			},
			"hopper.caller_scan_budget_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_HOPPER_CALLER_SCAN_BUDGET_MS",
				defaultValue: DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS,
				minimum: 1,
				provider: "hopper",
				operations: [
					"procedure_callers",
					"analyze_function",
					"procedure_references"
				]
			},
			"jeb.mcp_timeout_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_JEB_MCP_TIMEOUT_MS",
				defaultValue: DEFAULT_JEB_MCP_TIMEOUT_MS,
				provider: "jeb",
				operations: [
					"inspect_jeb_client",
					"open_jeb_project",
					"list_jeb_units",
					"decompile_jeb_item"
				]
			},
			"kuna.project_timeout_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_KUNA_PROJECT_TIMEOUT_MS",
				defaultValue: DEFAULT_KUNA_PROJECT_TIMEOUT_MS,
				provider: "kuna",
				operations: [
					"list_strings",
					"search_strings",
					"list_procedures",
					"search_procedures",
					"xrefs",
					"procedure_callers",
					"procedure_callees",
					"procedure_pseudo_code",
					"procedure_assembly",
					"analyze_function"
				]
			},
			"kuna.function_timeout_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_KUNA_TIMEOUT_MS",
				defaultValue: DEFAULT_KUNA_FUNCTION_TIMEOUT_MS,
				provider: "kuna",
				operations: [
					"procedure_pseudo_code",
					"procedure_assembly",
					"analyze_function",
					"list_procedures"
				]
			},
			"pwntools.max_input_bytes": {
				updateMode: "runtime",
				environment: "REA_PWNTOOLS_MAX_INPUT_BYTES",
				defaultValue: DEFAULT_PWNTOOLS_MAX_INPUT_BYTES,
				minimum: 1,
				maximum: MAXIMUM_PWNTOOLS_MAX_INPUT_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "pwntools",
				operations: ["inspect_binary_layout", "inspect_recorded_crash"],
				parameter: "producer_limits.input_bytes"
			},
			"windows.change_time_drift_ms": {
				updateMode: "runtime",
				environment: "REA_WINDOWS_CHANGE_TIME_DRIFT_MS",
				defaultValue: DEFAULT_WINDOWS_CHANGE_TIME_DRIFT_MS,
				minimum: 1,
				maximum: MAXIMUM_WINDOWS_CHANGE_TIME_DRIFT_MS,
				unit: "ms",
				appliesAt: "next_operation",
				provider: "rea-artifact-graph",
				relatedProviders: ["jadx"],
				operations: windowsChangeTimeOperations
			},
			"windows.change_time_settle_poll_ms": {
				updateMode: "runtime",
				environment: "REA_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS",
				defaultValue: 25,
				minimum: 1,
				maximum: MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS,
				unit: "ms",
				appliesAt: "next_operation",
				provider: "rea-artifact-graph",
				relatedProviders: ["jadx"],
				operations: windowsChangeTimeOperations
			},
			"windows.change_time_settle_max_polls": {
				updateMode: "runtime",
				environment: "REA_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS",
				defaultValue: 40,
				minimum: 1,
				maximum: MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS,
				unit: "count",
				appliesAt: "next_operation",
				provider: "rea-artifact-graph",
				relatedProviders: ["jadx"],
				operations: windowsChangeTimeOperations
			},
			"zstd.max_frames": {
				updateMode: "runtime",
				environment: "REA_ZSTD_MAX_FRAMES",
				defaultValue: DEFAULT_ZSTD_MAX_FRAMES,
				minimum: 1,
				maximum: MAXIMUM_ZSTD_MAX_FRAMES,
				unit: "count",
				appliesAt: "next_operation",
				provider: "rea-artifact-graph",
				relatedProviders: [
					"gpu-code-objects",
					"rea-dwarf-units",
					"rea-elf-notes",
					"rea-binary-hardening",
					"rea-elf-unwind-ranges",
					"rea-native-exports",
					"rea-native-initializers",
					"rea-kernel-module",
					"rea-elf-debug-link",
					"go-build-info",
					"rust-auditable",
					"il2cpp-metadata",
					"jadx"
				],
				operations: [
					"inspect_artifact",
					"extract_artifact",
					"inspect_gpu_code_objects",
					"inspect_dwarf_units",
					"inspect_elf_notes",
					"inspect_binary_hardening",
					"inspect_elf_unwind_ranges",
					"inspect_native_exports",
					"inspect_native_initializers",
					"inspect_kernel_module",
					"inspect_elf_debug_link",
					"inspect_go_binary",
					"inspect_rust_binary",
					"inspect_il2cpp_metadata",
					"inspect_android_jni_bindings"
				]
			}
		};
		analysisSettingIds = Object.keys(ANALYSIS_SETTINGS);
		analysisSettingIdSchema = z.enum(analysisSettingIds);
		analysisSettingLimitSchema = z.strictObject({
			setting: analysisSettingIdSchema,
			effective_value: z.number().nullable(),
			unit: z.enum([
				"bytes",
				"ms",
				"seconds",
				"MiB",
				"count"
			]),
			minimum: z.number(),
			maximum: z.number(),
			source: z.enum([
				"default",
				"setting",
				"runtime",
				"request"
			]).exactOptional(),
			applies_at: z.enum([
				"next_operation",
				"next_worker",
				"next_startup"
			]),
			agent_editable: z.literal(true),
			scope: z.literal("rea-runtime"),
			update_mode: z.enum([
				"runtime",
				"restart",
				"parameter"
			]),
			pending_restart: z.literal(false),
			required_value: z.number().exactOptional(),
			parameter: z.string().exactOptional()
		});
		analysisParameterLimitSchema = z.strictObject({
			control_kind: z.literal("parameter"),
			parameter: z.string(),
			effective_value: z.number(),
			unit: z.enum([
				"bytes",
				"ms",
				"seconds",
				"MiB",
				"count"
			]),
			minimum: z.number(),
			maximum: z.number(),
			default_value: z.number(),
			applies_at: z.literal("next_call")
		});
		analysisResultLimitSchema = z.union([analysisSettingLimitSchema, analysisParameterLimitSchema]);
		recordedControlSchemas = z.registry();
		recordedControlSchemas.add(analysisSettingLimitSchema, { recordedControl: true });
		recordedControlSchemas.add(analysisParameterLimitSchema, { recordedControl: true });
		analysisSettingDefinition = (id) => ANALYSIS_SETTINGS[id];
		analysisSettingValueSchema = (id) => {
			const definition = analysisSettingDefinition(id);
			const number = z.number().int().min(definition.minimum).max(definition.maximum);
			return id === "ghidra.decompile_timeout_seconds" || id === "ghidra.decompile_max_payload_mib" ? number.nullable() : number;
		};
		selectedAnalysisSetting = (request, override, fallback) => {
			if (request !== undefined) return {
				value: request,
				source: "request"
			};
			if (override !== undefined) return {
				value: override,
				source: "runtime"
			};
			return {
				value: fallback,
				source: "default"
			};
		};
		analysisSettingLimit = (setting, effective_value, source) => {
			const definition = analysisSettingDefinition(setting);
			return {
				setting,
				effective_value,
				...source === undefined ? {} : { source },
				unit: definition.unit,
				minimum: definition.minimum,
				maximum: definition.maximum,
				applies_at: definition.appliesAt,
				agent_editable: true,
				scope: "rea-runtime",
				update_mode: source === "request" ? "parameter" : definition.updateMode,
				pending_restart: false,
				...definition.parameter === undefined ? {} : { parameter: definition.parameter }
			};
		};
		invocationLimit = (limit) => {
			if (!("control_kind" in limit)) return invocationSettingLimit(limit);
			return limit.control_kind === "environment" ? {
				...limit,
				applies_at: "next_invocation"
			} : { ...limit };
		};
		invocationSettingLimit = ({ applies_at: _appliesAt, scope: _scope, ...facts }) => {
			const environment = analysisSettingDefinition(facts.setting).environment;
			return {
				...facts,
				applies_at: "next_invocation",
				scope: "rea-invocation",
				...environment === undefined ? {} : { environment }
			};
		};
	})))();
}

//#endregion
//#region dist/config/asarHeaderAdmission.js
var ASAR_HEADER_ADMISSION_SETTING, DEFAULT_ASAR_HEADER_ADMISSION, asarMaxHeaderBytesConstraint, asarMaxHeaderBytesSchema, parseAsarHeaderAdmission;
function init_asarHeaderAdmission() {
	return (init_asarHeaderAdmission = __esmMin((() => {
		init_analysisResourceLimits();
		init_configurationErrors();
		init_result();
		ASAR_HEADER_ADMISSION_SETTING = "REA_ASAR_MAX_HEADER_BYTES";
		DEFAULT_ASAR_HEADER_ADMISSION = {
			maximumBytes: DEFAULT_ASAR_MAX_HEADER_BYTES,
			source: "default"
		};
		asarMaxHeaderBytesConstraint = `${ASAR_HEADER_ADMISSION_SETTING} must be a positive decimal integer of at most ${String(MAXIMUM_ASAR_MAX_HEADER_BYTES)} bytes (256 MiB); the default is ${String(DEFAULT_ASAR_MAX_HEADER_BYTES)} bytes (16 MiB).`;
		asarMaxHeaderBytesSchema = z.string().regex(/^[1-9]\d*$/u, { error: asarMaxHeaderBytesConstraint }).transform(Number).pipe(z.number().int().max(MAXIMUM_ASAR_MAX_HEADER_BYTES, { error: asarMaxHeaderBytesConstraint }));
		parseAsarHeaderAdmission = (value) => {
			if (value === undefined) return ok(DEFAULT_ASAR_HEADER_ADMISSION);
			const parsed = asarMaxHeaderBytesSchema.safeParse(value);
			return parsed.success ? ok({
				maximumBytes: parsed.data,
				source: "setting"
			}) : err(new ConfigurationError(asarMaxHeaderBytesConstraint, { settings: [{
				setting: ASAR_HEADER_ADMISSION_SETTING,
				constraint: asarMaxHeaderBytesConstraint
			}] }));
		};
	})))();
}

//#endregion
//#region dist/config/asarListingAdmission.js
var ASAR_LISTING_ADMISSION_SETTING, DEFAULT_ASAR_LISTING_ADMISSION, constraint$1, asarMaxListingBytesSchema, parseAsarListingAdmission;
function init_asarListingAdmission() {
	return (init_asarListingAdmission = __esmMin((() => {
		init_analysisResourceLimits();
		init_configurationErrors();
		init_result();
		ASAR_LISTING_ADMISSION_SETTING = "REA_ASAR_MAX_LISTING_BYTES";
		DEFAULT_ASAR_LISTING_ADMISSION = {
			maximumBytes: DEFAULT_ASAR_MAX_LISTING_BYTES,
			source: "default"
		};
		constraint$1 = `${ASAR_LISTING_ADMISSION_SETTING} must be a positive decimal safe integer in bytes, at most ${String(MAXIMUM_ASAR_MAX_LISTING_BYTES)}; the default is ${String(DEFAULT_ASAR_MAX_LISTING_BYTES)} bytes.`;
		asarMaxListingBytesSchema = z.string().regex(/^[1-9]\d*$/u, { error: constraint$1 }).transform(Number).pipe(z.number().int().min(1).max(MAXIMUM_ASAR_MAX_LISTING_BYTES));
		parseAsarListingAdmission = (value) => {
			if (value === undefined) return ok(DEFAULT_ASAR_LISTING_ADMISSION);
			const parsed = asarMaxListingBytesSchema.safeParse(value);
			return parsed.success ? ok({
				maximumBytes: parsed.data,
				source: "setting"
			}) : err(new ConfigurationError(constraint$1, { settings: [{
				setting: ASAR_LISTING_ADMISSION_SETTING,
				constraint: constraint$1
			}] }));
		};
	})))();
}

//#endregion
//#region dist/domain/analysisOperationSnapshot.js
var snapshots, runWithAnalysisOperationSnapshot, currentAnalysisOperationSnapshot, currentAnalysisSettingOverride;
function init_analysisOperationSnapshot() {
	return (init_analysisOperationSnapshot = __esmMin((() => {
		snapshots = new AsyncLocalStorage();
		runWithAnalysisOperationSnapshot = (snapshot, operation) => snapshots.run(snapshot, operation);
		currentAnalysisOperationSnapshot = () => snapshots.getStore();
		currentAnalysisSettingOverride = (setting) => currentAnalysisOperationSnapshot()?.overrides[setting];
	})))();
}

//#endregion
//#region dist/config/windowsChangeTimeSettle.js
var decimalInteger$1, WINDOWS_CHANGE_TIME_DRIFT_MS, WINDOWS_CHANGE_TIME_SETTLE_POLL_MS, WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS, windowsChangeTimeSettingFailure, windowsChangeTimeSettingMessage, inRange, windowsChangeTimeSettingSchema, windowsChangeTimeDriftMsSchema, windowsChangeTimeSettlePollMsSchema, windowsChangeTimeSettleMaxPollsSchema, WINDOWS_CHANGE_TIME_OVERRIDES, readBound, resolveWindowsChangeTimeSettle, applyWindowsChangeTimeSnapshot;
function init_windowsChangeTimeSettle() {
	return (init_windowsChangeTimeSettle = __esmMin((() => {
		init_analysisOperationSnapshot();
		init_analysisResourceLimits();
		init_configurationErrors();
		init_result();
		decimalInteger$1 = /^[1-9]\d*$/u;
		WINDOWS_CHANGE_TIME_DRIFT_MS = {
			setting: "REA_WINDOWS_CHANGE_TIME_DRIFT_MS",
			defaultValue: DEFAULT_WINDOWS_CHANGE_TIME_DRIFT_MS,
			floor: 1,
			maximum: MAXIMUM_WINDOWS_CHANGE_TIME_DRIFT_MS,
			unit: "ms"
		};
		WINDOWS_CHANGE_TIME_SETTLE_POLL_MS = {
			setting: "REA_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS",
			defaultValue: 25,
			floor: 1,
			maximum: MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS,
			unit: "ms"
		};
		WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS = {
			setting: "REA_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS",
			defaultValue: 40,
			floor: 1,
			maximum: MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS,
			unit: "polls"
		};
		windowsChangeTimeSettingFailure = (bound, currentValue) => ({
			setting: bound.setting,
			currentValue,
			source: "setting",
			defaultValue: bound.defaultValue,
			floor: bound.floor,
			maximum: bound.maximum,
			unit: bound.unit,
			update_mode: "runtime"
		});
		windowsChangeTimeSettingMessage = (failure) => `The supplied ${failure.setting} value is ${failure.currentValue} ${failure.unit} (source ${failure.source}; default ${String(failure.defaultValue)} ${failure.unit}, floor ${String(failure.floor)} ${failure.unit}, maximum ${String(failure.maximum)} ${failure.unit}). windows change-time settings can be changed at runtime with update_analysis_settings. The launch seed ${failure.setting} must be a positive decimal integer from ${String(failure.floor)} to ${String(failure.maximum)}. The rejected value is not active.`;
		inRange = (bound, value) => {
			if (!decimalInteger$1.test(value)) return false;
			const parsed = BigInt(value);
			return parsed >= BigInt(bound.floor) && parsed <= BigInt(bound.maximum);
		};
		windowsChangeTimeSettingSchema = (bound) => z.string().superRefine((value, context) => {
			if (inRange(bound, value)) return;
			const failure = windowsChangeTimeSettingFailure(bound, value);
			context.addIssue({
				code: "custom",
				message: windowsChangeTimeSettingMessage(failure),
				params: { update_mode: failure.update_mode }
			});
		}).transform(Number);
		windowsChangeTimeDriftMsSchema = windowsChangeTimeSettingSchema(WINDOWS_CHANGE_TIME_DRIFT_MS);
		windowsChangeTimeSettlePollMsSchema = windowsChangeTimeSettingSchema(WINDOWS_CHANGE_TIME_SETTLE_POLL_MS);
		windowsChangeTimeSettleMaxPollsSchema = windowsChangeTimeSettingSchema(WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS);
		WINDOWS_CHANGE_TIME_OVERRIDES = {
			[WINDOWS_CHANGE_TIME_DRIFT_MS.setting]: "windows.change_time_drift_ms",
			[WINDOWS_CHANGE_TIME_SETTLE_POLL_MS.setting]: "windows.change_time_settle_poll_ms",
			[WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS.setting]: "windows.change_time_settle_max_polls"
		};
		readBound = (bound, environment, failures) => {
			const value = environment[bound.setting];
			if (value === undefined) return undefined;
			const parsed = windowsChangeTimeSettingSchema(bound).safeParse(value);
			if (parsed.success) return parsed.data;
			const override = WINDOWS_CHANGE_TIME_OVERRIDES[bound.setting];
			if (currentAnalysisOperationSnapshot()?.overrides[override] !== undefined) return undefined;
			failures.push(windowsChangeTimeSettingFailure(bound, value));
			return undefined;
		};
		resolveWindowsChangeTimeSettle = (environment) => {
			const failures = [];
			const driftMs = readBound(WINDOWS_CHANGE_TIME_DRIFT_MS, environment, failures);
			const pollMs = readBound(WINDOWS_CHANGE_TIME_SETTLE_POLL_MS, environment, failures);
			const maxPolls = readBound(WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS, environment, failures);
			if (failures.length > 0) return err(new ConfigurationError(failures.map(windowsChangeTimeSettingMessage).join(" "), { settings: failures.map((failure) => ({
				setting: failure.setting,
				constraint: windowsChangeTimeSettingMessage(failure),
				update_mode: failure.update_mode
			})) }));
			return ok({
				driftMs: driftMs ?? WINDOWS_CHANGE_TIME_DRIFT_MS.defaultValue,
				driftSource: driftMs === undefined ? "default" : "setting",
				pollMs: pollMs ?? WINDOWS_CHANGE_TIME_SETTLE_POLL_MS.defaultValue,
				pollSource: pollMs === undefined ? "default" : "setting",
				maxPolls: maxPolls ?? WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS.defaultValue,
				maxPollsSource: maxPolls === undefined ? "default" : "setting"
			});
		};
		applyWindowsChangeTimeSnapshot = (limits) => {
			const overrides = currentAnalysisOperationSnapshot()?.overrides;
			if (overrides === undefined) return limits;
			const driftMs = overrides["windows.change_time_drift_ms"];
			const pollMs = overrides["windows.change_time_settle_poll_ms"];
			const maxPolls = overrides["windows.change_time_settle_max_polls"];
			return {
				driftMs: driftMs ?? limits.driftMs,
				driftSource: driftMs === undefined ? limits.driftSource : "runtime",
				pollMs: pollMs ?? limits.pollMs,
				pollSource: pollMs === undefined ? limits.pollSource : "runtime",
				maxPolls: maxPolls ?? limits.maxPolls,
				maxPollsSource: maxPolls === undefined ? limits.maxPollsSource : "runtime"
			};
		};
	})))();
}

//#endregion
//#region dist/domain/fixedAllowanceRemediation.js
var FIXED_ALLOWANCE_KINDS, unchangedRequest, fixedAllowanceRemediation, fixedAllowanceOptions, fixedProducerInputAllowance;
function init_fixedAllowanceRemediation() {
	return (init_fixedAllowanceRemediation = __esmMin((() => {
		FIXED_ALLOWANCE_KINDS = [
			"parser",
			"count",
			"bytes",
			"report",
			"input",
			"capture",
			"live",
			"work"
		];
		unchangedRequest = "Repeating the unchanged request fails the same way.";
		fixedAllowanceRemediation = (allowance, kind) => {
			switch (kind) {
				case "parser": return `${allowance} is a fixed allowance. Worker memory limits, inherited limits, and additional host memory do not raise it. Select another complete input within the allowance when that preserves the needed observation. ${unchangedRequest}`;
				case "count": return `${allowance} is a fixed count. Waiting for an active analysis to finish does not raise it. ${unchangedRequest}`;
				case "bytes": return `${allowance} is a fixed byte allowance. Waiting for an active analysis to finish does not raise it. ${unchangedRequest}`;
				case "report": return `${allowance} is a fixed report allowance. This refusal does not leave a completed report or Evidence record to retrieve, and complete CLI JSON does not raise it. ${unchangedRequest}`;
				case "input": return `Select a suitable complete artifact within ${allowance}. Increasing an evidence-reply file-size allowance does not admit this input. Do not truncate required bytes. ${unchangedRequest}`;
				case "capture": return `${allowance} is a fixed capture allowance. Worker memory limits, inherited limits, and additional host memory do not raise it. ${unchangedRequest}`;
				case "live": return `${allowance} is a fixed capture allowance. Worker memory limits, inherited limits, and additional host memory do not raise it. Capturing the same output exceeds the allowance again; live output may change between requests.`;
				case "work": return `${allowance} is a fixed work allowance. Worker CPU limits and additional CPU time do not raise it. Select another complete artifact within the allowance. ${unchangedRequest}`;
			}
		};
		fixedAllowanceOptions = (allowance, kind, facts = {}) => ({
			retryable: false,
			fixedAllowance: {
				name: allowance,
				kind,
				...facts
			}
		});
		fixedProducerInputAllowance = (bytes, allowance) => fixedAllowanceOptions(allowance, "input", {
			limit: bytes,
			unit: "bytes"
		});
	})))();
}

//#endregion
//#region dist/domain/parseFailureAnalysisError.js
var isParseLimit, parseLimitConstraint, parseFailureAnalysisError;
function init_parseFailureAnalysisError() {
	return (init_parseFailureAnalysisError = __esmMin((() => {
		init_analysisErrorCore();
		init_parseFailure();
		isParseLimit = (cause, format) => cause instanceof ParseFailureError && cause.failure.kind === "limit" && cause.failure.format === format;
		parseLimitConstraint = (operation, resource, cause, options) => {
			const { detail, limit } = cause.failure;
			const { path, legacyMaximumKey, reportedLimitContext, ...errorOptions } = options;
			const reportedLimit = legacyMaximumKey === undefined ? reportedParseLimit(limit) : { [legacyMaximumKey]: limit.maximum };
			return new AnalysisResourceConstraintError(operation, resource, path === undefined ? detail : `Selected artifact ${path}: ${detail}`, {
				...reportedLimitContext,
				...reportedLimit
			}, {
				...errorOptions,
				cause
			});
		};
		parseFailureAnalysisError = (operation, path, cause, field = "path") => {
			if (!(cause instanceof ParseFailureError)) return undefined;
			const { failure } = cause;
			switch (failure.kind) {
				case "limit": return undefined;
				case "unsupported": return new AnalysisUnsupportedTargetError(operation, path, failure.detail, {
					cause,
					undecodedContent: failure.undecodedContent
				});
				case "malformed":
				case "truncated": return new AnalysisInputError(operation, { cause }, [{
					path: [field],
					reason: "invalid_format",
					message: `Selected artifact ${path}: ${failure.detail}`
				}]);
			}
		};
	})))();
}

//#endregion
//#region dist/domain/compression/zstandardFrameAllowance.js
var ZSTD_MAX_FRAMES_ENVIRONMENT, ZSTD_MAX_FRAMES_SETTING, constraint, decimalInteger, zstandardMaxFramesSchema, invalidSeed, resolveZstandardFrameAllowance, currentZstandardFrameAllowance, zstandardWorkLimitFacts, ZstandardFrameAllowanceError, zstandardFrameAllowanceCause, projectZstandardFrameAllowance;
function init_zstandardFrameAllowance() {
	return (init_zstandardFrameAllowance = __esmMin((() => {
		init_analysisResourceLimits();
		init_analysisSettingDefinitions();
		init_analysisErrorCore();
		init_analysisOperationSnapshot();
		init_configurationErrors();
		init_parseFailureAnalysisError();
		init_parseFailure();
		init_result();
		ZSTD_MAX_FRAMES_ENVIRONMENT = "REA_ZSTD_MAX_FRAMES";
		ZSTD_MAX_FRAMES_SETTING = "zstd.max_frames";
		constraint = `${ZSTD_MAX_FRAMES_ENVIRONMENT} must be a decimal integer from ${String(1)} to ${String(MAXIMUM_ZSTD_MAX_FRAMES)} frames; the default is ${String(DEFAULT_ZSTD_MAX_FRAMES)}.`;
		decimalInteger = /^[1-9]\d*$/u;
		zstandardMaxFramesSchema = z.string().regex(decimalInteger, { error: constraint }).refine((value) => {
			if (!decimalInteger.test(value)) return true;
			const parsed = BigInt(value);
			return parsed >= BigInt(1) && parsed <= BigInt(65536);
		}, { error: constraint }).transform(Number);
		invalidSeed = () => new ConfigurationError(constraint, {
			remediationAction: `On a running MCP session, call update_analysis_settings for ${ZSTD_MAX_FRAMES_SETTING}, then retry. For CLI or future REA processes, correct ${ZSTD_MAX_FRAMES_ENVIRONMENT} in the launch environment.`,
			settings: [{
				setting: ZSTD_MAX_FRAMES_ENVIRONMENT,
				constraint,
				update_mode: "runtime",
				pending_restart: false
			}]
		});
		resolveZstandardFrameAllowance = (environment, override = currentAnalysisSettingOverride(ZSTD_MAX_FRAMES_SETTING)) => {
			if (override !== undefined) return ok({
				maxFrames: override,
				source: "runtime"
			});
			const raw = environment[ZSTD_MAX_FRAMES_ENVIRONMENT];
			if (raw === undefined) return ok({
				maxFrames: DEFAULT_ZSTD_MAX_FRAMES,
				source: "default"
			});
			const parsed = zstandardMaxFramesSchema.safeParse(raw);
			return parsed.success ? ok({
				maxFrames: parsed.data,
				source: "setting"
			}) : err(invalidSeed());
		};
		currentZstandardFrameAllowance = () => resolveZstandardFrameAllowance(process.env);
		zstandardWorkLimitFacts = (allowance) => ({
			reason: "work_limit",
			setting: ZSTD_MAX_FRAMES_SETTING,
			value: allowance.maxFrames,
			source: allowance.source,
			minimum: 1,
			maximum: MAXIMUM_ZSTD_MAX_FRAMES
		});
		ZstandardFrameAllowanceError = class extends ParseFailureError {
			reason = "work_limit";
			setting = ZSTD_MAX_FRAMES_SETTING;
			value;
			source;
			minimum;
			maximum;
			offset;
			constructor(allowance, offset) {
				const facts = zstandardWorkLimitFacts(allowance);
				const detail = `${facts.setting} is ${String(facts.value)} (source ${facts.source}, range ${String(facts.minimum)}..${String(facts.maximum)})`;
				super({
					kind: "limit",
					format: "zstd",
					detail,
					offset,
					field: facts.reason,
					limit: {
						name: facts.setting,
						maximum: facts.value,
						required: facts.value + 1
					}
				});
				this.name = "ZstandardFrameAllowanceError";
				this.value = facts.value;
				this.source = facts.source;
				this.minimum = facts.minimum;
				this.maximum = facts.maximum;
				this.offset = offset;
			}
		};
		zstandardFrameAllowanceCause = (cause) => cause instanceof ZstandardFrameAllowanceError ? cause : cause instanceof AnalysisResourceConstraintError && cause.cause instanceof ZstandardFrameAllowanceError ? cause.cause : undefined;
		projectZstandardFrameAllowance = (operation, error) => parseLimitConstraint(operation, "cpu", error, {
			retryable: false,
			limit: analysisSettingLimit(error.setting, error.value, error.source),
			reportedLimitContext: {
				setting: error.setting,
				value: error.value,
				source: error.source,
				minimum: error.minimum,
				maximum: error.maximum
			}
		});
	})))();
}

//#endregion
//#region dist/domain/safeJson.js
var safeParseUtf8Json, safeParseJson;
function init_safeJson() {
	return (init_safeJson = __esmMin((() => {
		init_strictUtf8();
		init_errorMessage();
		safeParseUtf8Json = (bytes) => {
			let text;
			try {
				text = strictUtf8Decoder("preserve").decode(bytes);
			} catch (cause) {
				return {
					ok: false,
					error: errorMessage(cause),
					cause
				};
			}
			return safeParseJson(text);
		};
		safeParseJson = (value, reviver) => {
			try {
				return {
					ok: true,
					value: JSON.parse(value, reviver)
				};
			} catch (cause) {
				return {
					ok: false,
					error: errorMessage(cause),
					cause
				};
			}
		};
	})))();
}

//#endregion
//#region dist/domain/artifactIntegrity.js
var sha256, md5, crc32, artifactIntegrityClaimSchema, artifactSha256PairSchema, artifactMd5PairSchema, artifactDfuCrc32PairSchema, artifactIntegrityPair, artifactIntegrityPairOf, artifactIntegrityDetails, artifactContainerIntegrityDetails, projectedDigests, projectArtifactIntegrityDetails;
function init_artifactIntegrity() {
	return (init_artifactIntegrity = __esmMin((() => {
		sha256 = z.string().regex(/^[a-f0-9]{64}$/u);
		md5 = z.string().regex(/^[a-f0-9]{32}$/u);
		crc32 = z.string().regex(/^[a-f0-9]{8}$/u);
		artifactIntegrityClaimSchema = z.discriminatedUnion("algorithm", [z.strictObject({
			algorithm: z.literal("sha256"),
			digest: sha256
		}), z.strictObject({
			algorithm: z.literal("md5"),
			digest: md5
		})]);
		artifactSha256PairSchema = z.object({
			declared_sha256: sha256,
			observed_sha256: sha256
		});
		artifactMd5PairSchema = z.object({
			algorithm: z.literal("md5"),
			declared_md5: md5,
			observed_md5: md5
		});
		artifactDfuCrc32PairSchema = z.object({
			algorithm: z.literal("dfu-crc32"),
			declared_crc32: crc32,
			observed_crc32: crc32
		});
		artifactIntegrityPair = (claim, observed) => claim.algorithm === "sha256" ? {
			declared_sha256: claim.digest,
			observed_sha256: observed
		} : {
			algorithm: "md5",
			declared_md5: claim.digest,
			observed_md5: observed
		};
		artifactIntegrityPairOf = (pair) => {
			if ("declared_sha256" in pair) return {
				declared_sha256: pair.declared_sha256,
				observed_sha256: pair.observed_sha256
			};
			return pair.algorithm === "md5" ? {
				algorithm: pair.algorithm,
				declared_md5: pair.declared_md5,
				observed_md5: pair.observed_md5
			} : {
				algorithm: pair.algorithm,
				declared_crc32: pair.declared_crc32,
				observed_crc32: pair.observed_crc32
			};
		};
		artifactIntegrityDetails = (logicalPath, claim, observed, unpacked) => ({
			logicalPath,
			unpacked,
			...claim?.algorithm === "md5" ? {
				algorithm: "md5",
				declaredMd5: claim.digest,
				calculatedMd5: observed
			} : {
				declaredSha256: claim?.digest ?? null,
				calculatedSha256: observed
			}
		});
		artifactContainerIntegrityDetails = (logicalPath, pair) => ({
			logicalPath,
			unpacked: false,
			algorithm: pair.algorithm,
			declaredCrc32: pair.declared_crc32,
			calculatedCrc32: pair.observed_crc32
		});
		projectedDigests = (details) => {
			if ("declaredSha256" in details) return {
				declared_sha256: details.declaredSha256,
				calculated_sha256: details.calculatedSha256
			};
			return details.algorithm === "md5" ? {
				algorithm: details.algorithm,
				declared_md5: details.declaredMd5,
				calculated_md5: details.calculatedMd5
			} : {
				algorithm: details.algorithm,
				declared_crc32: details.declaredCrc32,
				calculated_crc32: details.calculatedCrc32
			};
		};
		projectArtifactIntegrityDetails = (details) => ({
			logical_path: details.logicalPath,
			...projectedDigests(details),
			unpacked: details.unpacked
		});
	})))();
}

//#endregion
//#region dist/domain/analysisErrorRecovery.js
var analysisCleanupRetrySchema, cleanupRetryRecovery, cleanupRetryRemediation, analysisErrorRecoverySchema;
function init_analysisErrorRecovery() {
	return (init_analysisErrorRecovery = __esmMin((() => {
		analysisCleanupRetrySchema = z.object({ operation: z.literal("close_binary") }).strict();
		cleanupRetryRecovery = (retry) => ({
			kind: "retry_cleanup",
			operation: retry.operation
		});
		cleanupRetryRemediation = (retry) => `This connection retains that cleanup. Keep it open; after the reported condition settles or is resolved, call ${retry.operation} without snapshot_path and check its result. That call retries the retained cleanup without rerunning the failed analysis, preserves investigation Evidence and Unknown history, and can report cleanup_incomplete again.`;
		analysisErrorRecoverySchema = z.discriminatedUnion("kind", [
			z.object({
				kind: z.literal("inspect_input_contract"),
				operation: z.string().min(1)
			}).strict(),
			z.object({
				kind: z.literal("inspect_timeout_state"),
				operation: z.string().min(1),
				timeout_ms: z.number().int().positive()
			}).strict(),
			z.object({
				kind: z.literal("retry_cleanup"),
				operation: z.string().min(1)
			}).strict()
		]);
	})))();
}

//#endregion
//#region dist/domain/artifactOperationError.js
var ARTIFACT_INTEGRITY_CHECKS, ArtifactOperationError, artifactDetailsMessage;
function init_artifactOperationError() {
	return (init_artifactOperationError = __esmMin((() => {
		init_artifactIntegrity();
		init_analysisErrorBase();
		ARTIFACT_INTEGRITY_CHECKS = [
			"foreign-entry",
			"entry-metadata",
			"container-identity",
			"unpacked-entry-identity",
			"member-identity",
			"image-checksum",
			"read-coverage",
			"declared-size",
			"reader-ownership",
			"declared-digest",
			"layout-consistency",
			"reconstruction",
			"inventory-node",
			"output-readback",
			"output-lifecycle",
			"traversal-coverage"
		];
		ArtifactOperationError = class extends AnalysisError {
			operation;
			reason;
			artifactDetails;
			detail;
			_tag = "ArtifactOperationError";
			userMessage;
			remediationAction;
			admission;
			boundary;
			readerLimit;
			parserLimit;
			/** For a `limit` reason, the release-fixed allowance that refused the input. */
			fixedAllowance;
			/** For an `integrity` reason, the check the producing reader named. */
			integrityCheck;
			constructor(operation, reason, artifactDetails, detail, options) {
				super(artifactDetails === undefined ? `Artifact ${operation} failed: ${reason}` : artifactDetailsMessage(operation, reason, artifactDetails), options);
				this.operation = operation;
				this.reason = reason;
				this.artifactDetails = artifactDetails;
				this.detail = detail;
				this.admission = options?.admission;
				this.boundary = options?.boundary;
				this.readerLimit = options?.readerLimit;
				this.parserLimit = options?.parserLimit;
				this.fixedAllowance = options?.fixedAllowance;
				this.integrityCheck = options?.integrityCheck;
				this.remediationAction = options?.remediationAction;
				this.userMessage = options?.userMessage ?? (options?.admission === undefined ? undefined : detail);
			}
		};
		artifactDetailsMessage = (operation, reason, details) => {
			const { logical_path, ...facts } = projectArtifactIntegrityDetails(details);
			const description = Object.entries(facts).map(([key, value]) => `${key}=${String(value ?? "unavailable")}`).join(", ");
			return `Artifact ${operation} failed: ${reason} at ${logical_path} (${description})`;
		};
	})))();
}

//#endregion
//#region dist/domain/apple/appleBundleTypes.js
var APPLE_BUNDLE_EXTENSION, OPENABLE_APPLE_BUNDLE_EXTENSIONS, openableAppleBundleExtension, UNOPENED_APPLE_BUNDLE_EXTENSIONS, isUnopenedAppleBundleExtension, OPENABLE_APPLE_BUNDLE_TYPES_TEXT, INFO_PLIST_DECODE_MIB;
function init_appleBundleTypes() {
	return (init_appleBundleTypes = __esmMin((() => {
		APPLE_BUNDLE_EXTENSION = /\.(?:app|appex|xpc|framework|systemextension|dext|bundle|plugin|qlgenerator|mdimporter)$/iu;
		OPENABLE_APPLE_BUNDLE_EXTENSIONS = [
			".app",
			".appex",
			".framework",
			".xpc",
			".systemextension",
			".bundle",
			".plugin"
		];
		openableAppleBundleExtension = (extension) => {
			const lower = extension.toLowerCase();
			return OPENABLE_APPLE_BUNDLE_EXTENSIONS.find((candidate) => candidate === lower);
		};
		UNOPENED_APPLE_BUNDLE_EXTENSIONS = [
			".dext",
			".kext",
			".qlgenerator",
			".mdimporter"
		];
		isUnopenedAppleBundleExtension = (extension) => UNOPENED_APPLE_BUNDLE_EXTENSIONS.includes(extension.toLowerCase());
		OPENABLE_APPLE_BUNDLE_TYPES_TEXT = OPENABLE_APPLE_BUNDLE_EXTENSIONS.join(", ");
		INFO_PLIST_DECODE_MIB = 16;
	})))();
}

//#endregion
//#region dist/domain/browserObservationError.js
var browserCleanupObservation, BrowserObservationError, observationFailureMessage;
function init_browserObservationError() {
	return (init_browserObservationError = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_errorMessage();
		browserCleanupObservation = (cause) => cause instanceof AnalysisError && cause.cleanup !== undefined ? cause.cleanup : {
			reason: errorMessage(cause),
			resources: cause instanceof AnalysisError && cause.cleanupResources.length > 0 ? cause.cleanupResources : ["browser_transport"]
		};
		BrowserObservationError = class BrowserObservationError extends AnalysisError {
			operation;
			reason;
			_tag = "BrowserObservationError";
			userCategory;
			userMessage;
			/** Producer-supplied explanation; undefined selects the operation default. */
			detail;
			remediationAction;
			constructor(operation, reason, options) {
				super(`Browser observation ${operation} failed: ${reason}`, options);
				this.operation = operation;
				this.reason = reason;
				this.detail = options?.detail;
				this.userMessage = options?.detail ?? observationFailureMessage(operation, reason);
				this.remediationAction = options?.remediationAction;
				this.markCleanupIncomplete(this.cleanup !== undefined || reason === "cleanup_failed");
				this.setCleanupResources(this.cleanup?.resources ?? (reason === "cleanup_failed" ? ["browser_transport"] : []));
				this.userCategory = reason === "cancelled" || options?.cause instanceof AnalysisCancelledError || options?.cause instanceof AnalysisError && options.cause.userCategory === "cancelled" ? "cancelled" : undefined;
			}
			/**
			* Attribute this failure to the caller's operation without discarding
			* producer facts; the original cause keeps the primary failure chain intact.
			*/
			forOperation(operation) {
				if (operation === this.operation) return this;
				return new BrowserObservationError(operation, this.reason, {
					cause: this.cause,
					...this.detail === undefined ? {} : { detail: this.detail },
					...this.remediationAction === undefined ? {} : { remediationAction: this.remediationAction },
					cleanupPrimary: this.cleanupPrimary,
					diagnostics: this.diagnostics,
					capturedOutput: this.capturedOutput,
					cleanup: this.cleanup,
					partialObservation: this.partialObservation
				});
			}
		};
		observationFailureMessage = (operation, reason) => {
			if (reason === "cancelled") return `${operation} was cancelled. Collected observations and cleanup status are reported when available.`;
			if (reason === "timeout") return `${operation} exceeded its execution deadline. Review the target's responsiveness and retained observations before retrying.`;
			if (reason === "endpoint_unreachable") return `${operation} could not reach the selected loopback debugging endpoint. Verify that the target process is running with debugging enabled and that the endpoint's port matches it, then retry.`;
			if (reason === "target_not_found") return `${operation} could not find the selected target at the debugging endpoint. Refresh target discovery for that endpoint and retry with a returned target ID.`;
			if (reason === "target_session_detached") return `${operation} lost its debugging session while the target may still exist. Refresh target discovery and attach to the selected target again.`;
			if (reason === "target_changed") return `${operation} could not retain a stable document because the target changed during observation. Retry after navigation settles; refresh target discovery if the selected page was replaced.`;
			if (reason === "service_worker_blocked") return `${operation} refused the selected page because it is controlled by or has a registered service worker while the service-worker policy is block. Set environment.service_workers to allow to permit observation, or remove the service worker registration through the browser.`;
			if (reason === "disconnected") return `${operation} lost its debugging connection. Verify that the target process is still running, refresh target discovery, and retry the observation.`;
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/providerSelectionError.js
var ProviderSelectionError, providerSelectionDiagnostic, requestedProviderRepair, providerAvailabilityOnly, providerSelectionUserMessage;
function init_providerSelectionError() {
	return (init_providerSelectionError = __esmMin((() => {
		init_analysisErrorBase();
		ProviderSelectionError = class extends AnalysisError {
			_tag = "ProviderSelectionError";
			operation;
			reason;
			requestedProviderId;
			candidateIds;
			rejections;
			remediationAction;
			userMessage;
			constructor(options) {
				const operation = options.operation ?? "open_binary";
				super(providerSelectionDiagnostic(options), {
					capturedOutput: options.capturedOutput,
					diagnostics: options.diagnostics,
					partialObservation: options.partialObservation,
					...options.cause === undefined ? {} : { cause: options.cause }
				});
				this.operation = operation;
				this.reason = options.reason;
				this.requestedProviderId = options.requestedProviderId;
				this.candidateIds = [...options.candidateIds];
				this.rejections = [...options.rejections ?? []].map((rejection) => ({
					...rejection,
					diagnostics: structuredClone(rejection.diagnostics)
				}));
				this.remediationAction = options.remediationAction ?? requestedProviderRepair(options);
				this.userMessage = options.userMessage ?? providerSelectionUserMessage(options);
			}
		};
		providerSelectionDiagnostic = (options) => {
			const candidates = options.candidateIds.length === 0 ? "none" : options.candidateIds.join(", ");
			return `Analysis provider selection failed (${options.reason}) for ${options.requestedProviderId}; candidates: ${candidates}`;
		};
		requestedProviderRepair = (options) => options.reason === "provider_unavailable" ? options.rejections?.find(({ providerId, origin }) => providerId === options.requestedProviderId && origin === "availability")?.remediation : undefined;
		providerAvailabilityOnly = (rejections) => rejections !== undefined && rejections.length > 0 && rejections.every(({ origin }) => origin === "availability");
		providerSelectionUserMessage = (options) => {
			switch (options.reason) {
				case "ambiguous": return "Multiple analysis providers support this target. Choose one with provider_id, --provider, or REA_ANALYSIS_PROVIDER.";
				case "unknown_provider": return `The requested analysis provider is unknown. Choose one of: ${options.candidateIds.join(", ") || "no configured providers"}.`;
				case "provider_unavailable": return providerAvailabilityOnly(options.rejections) ? "Provider selection failed local readiness checks. No target-support refusal was reported. Review the local provider diagnostics or run `rea doctor`, then retry." : "The selected analysis provider is unavailable. Review the reported local diagnostics or run `rea doctor`, then retry.";
				case "target_unsupported": return "The selected analysis provider does not support this target. Choose another provider or open a supported extracted binary.";
				case "invalid_options": return "The analysis provider selection or open options are invalid. Correct them and try again.";
			}
		};
	})))();
}

//#endregion
//#region dist/domain/doctorProviderIds.js
var DESKTOP_BUILD_PROVIDER_ID, DOCTOR_PROVIDER_IDS, DOCTOR_PROVIDER_ID_SET, isDoctorProviderId, isDesktopBuildCheck;
function init_doctorProviderIds() {
	return (init_doctorProviderIds = __esmMin((() => {
		DESKTOP_BUILD_PROVIDER_ID = "desktop_build";
		DOCTOR_PROVIDER_IDS = [
			"hopper",
			"ghidra",
			"ida",
			"jadx",
			"kuna",
			DESKTOP_BUILD_PROVIDER_ID
		];
		DOCTOR_PROVIDER_ID_SET = new Set(DOCTOR_PROVIDER_IDS);
		isDoctorProviderId = (providerId) => DOCTOR_PROVIDER_ID_SET.has(providerId);
		isDesktopBuildCheck = (name) => name.startsWith(`${DESKTOP_BUILD_PROVIDER_ID}-`);
	})))();
}

//#endregion
//#region dist/domain/analysisErrorRefusal.js
var analysisErrorRefusal;
function init_analysisErrorRefusal() {
	return (init_analysisErrorRefusal = __esmMin((() => {
		init_analysisErrorCore();
		init_artifactOperationError();
		analysisErrorRefusal = (error) => {
			if (error instanceof AnalysisResourceConstraintError) {
				if (error.fixedAllowance !== undefined) return {
					kind: "fixed_ceiling",
					operation: error.operation,
					ceiling: error.fixedAllowance
				};
				if (error.limit !== undefined && !("control_kind" in error.limit) && !("measuredExhaustion" in error.recovery && error.recovery.measuredExhaustion === true)) return {
					kind: "adjustable_budget",
					operation: error.operation,
					budget: error.limit
				};
				return undefined;
			}
			if (error instanceof ArtifactOperationError && error.fixedAllowance !== undefined) return {
				kind: "fixed_ceiling",
				operation: error.operation,
				ceiling: error.fixedAllowance
			};
			if (error instanceof AnalysisInputError && error.ambiguousSelector !== undefined) return {
				kind: "ambiguous_selector",
				operation: error.operation,
				selector: error.ambiguousSelector
			};
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/analysisErrorClassification.js
var RETRYABLE_CODES, classified, STATIC_ERROR_CLASSIFICATIONS, RETRYABLE_CAPABILITY_UNAVAILABLE, ARTIFACT_OPERATION_CLASSIFICATIONS, ARTIFACT_IDENTITY_MISMATCH, EVIDENCE_FILE_CLASSIFICATIONS, UNKNOWN_REGISTRY_CLASSIFICATIONS, PROVIDER_SELECTION_CLASSIFICATIONS, BINARY_TARGET_CLASSIFICATIONS, binaryTargetClassification, BROWSER_OBSERVATION_CLASSIFICATIONS, CANCELLED, PROCESS_CAPTURE_FAILED, staticClassification, classifyAnalysisError, catalogueRow, reasonRows, analysisErrorCatalogue;
function init_analysisErrorClassification() {
	return (init_analysisErrorClassification = __esmMin((() => {
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_artifactOperationError();
		init_browserObservationError();
		init_configurationErrors();
		init_evidenceErrors();
		init_providerSelectionError();
		init_unknownRegistryError();
		RETRYABLE_CODES = new Set([
			"artifact_changed",
			"provider_timeout",
			"cancelled",
			"revision_conflict",
			"provider_unavailable"
		]);
		classified = (code, category) => ({
			code,
			category
		});
		STATIC_ERROR_CLASSIFICATIONS = {
			AnalysisProtocolError: classified("unreadable_output", "execution_failure"),
			AnalysisOutputError: classified("unreadable_output", "execution_failure"),
			AnalysisInputError: classified("invalid_request", "invalid_input"),
			AnalysisAccessDeniedError: classified("access_denied", "unavailable"),
			AnalysisArtifactChangedError: classified("artifact_changed", "integrity_mismatch"),
			AnalysisCapabilityUnavailableError: classified("capability_unavailable", "unsupported_provider"),
			AnalysisUnsupportedTargetError: classified("unsupported_target", "unsupported_target"),
			AnalysisCancelledError: classified("cancelled", "cancelled"),
			AnalysisTimeoutError: classified("provider_timeout", "timeout"),
			AnalysisResourceConstraintError: classified("resource_constraint", "resource_constraint"),
			ConfigurationError: classified("configuration_invalid", "invalid_input"),
			NoBinaryOpenError: classified("target_unavailable", "unavailable"),
			EvidenceIntegrityError: classified("evidence_integrity_mismatch", "integrity_mismatch"),
			ProviderAdapterError: classified("execution_failure", "execution_failure")
		};
		RETRYABLE_CAPABILITY_UNAVAILABLE = classified("capability_unavailable", "unavailable");
		ARTIFACT_OPERATION_CLASSIFICATIONS = {
			cancelled: classified("cancelled", "cancelled"),
			malformed: classified("invalid_request", "invalid_input"),
			truncated: classified("truncated", "truncated"),
			unsupported: classified("unsupported_target", "unsupported_target"),
			format: classified("artifact_operation_failed", "execution_failure"),
			integrity: classified("artifact_operation_failed", "integrity_mismatch"),
			limit: classified("truncated", "truncated"),
			path: classified("artifact_operation_failed", "execution_failure"),
			unavailable: classified("artifact_operation_failed", "unavailable"),
			io: classified("artifact_operation_failed", "execution_failure")
		};
		ARTIFACT_IDENTITY_MISMATCH = classified("artifact_integrity_mismatch", "integrity_mismatch");
		EVIDENCE_FILE_CLASSIFICATIONS = {
			"not-file": classified("invalid_request", "invalid_input"),
			exists: classified("invalid_request", "invalid_input"),
			"wrong-kind": classified("invalid_request", "invalid_input"),
			missing: classified("invalid_request", "invalid_input"),
			"symlink-traversal": classified("invalid_request", "invalid_input"),
			"invalid-json": classified("evidence_integrity_mismatch", "execution_failure"),
			"path-limit": classified("resource_constraint", "resource_constraint"),
			"storage-limit": classified("resource_constraint", "resource_constraint"),
			io: classified("execution_failure", "execution_failure")
		};
		UNKNOWN_REGISTRY_CLASSIFICATIONS = {
			"not-found": classified("execution_failure", "execution_failure"),
			"already-exists": classified("invalid_request", "invalid_input"),
			"revision-conflict": classified("revision_conflict", "execution_failure"),
			"invalid-transition": classified("execution_failure", "execution_failure"),
			integrity: classified("evidence_integrity_mismatch", "execution_failure"),
			limit: classified("truncated", "execution_failure"),
			constraint: classified("invalid_request", "invalid_input")
		};
		PROVIDER_SELECTION_CLASSIFICATIONS = {
			unknown_provider: classified("capability_unavailable", "unsupported_provider"),
			provider_unavailable: classified("provider_unavailable", "unavailable"),
			target_unsupported: classified("capability_unavailable", "unsupported_provider"),
			ambiguous: classified("capability_unavailable", "unsupported_provider"),
			invalid_options: classified("capability_unavailable", "unsupported_provider")
		};
		BINARY_TARGET_CLASSIFICATIONS = {
			unconstrained: classified("target_unavailable", "unavailable"),
			directory_requires_file: classified("target_unavailable", "unavailable"),
			wasm_requires_static_inspection: classified("target_unavailable", "unsupported_target"),
			file_format_rejected: classified("target_unavailable", "unsupported_target"),
			load_selection_rejected: classified("invalid_request", "invalid_input"),
			bundle_type_unsupported: classified("target_unavailable", "unsupported_target"),
			bundle_info_plist_decode_budget_exceeded: classified("target_unavailable", "unavailable"),
			bundle_info_plist_missing: classified("target_unavailable", "unavailable"),
			bundle_layout_ambiguous: classified("target_unavailable", "unavailable"),
			bundle_executable_undeclared: classified("target_unavailable", "unavailable"),
			bundle_program_missing: classified("target_unavailable", "unavailable"),
			bundle_current_version_missing: classified("target_unavailable", "unavailable"),
			bundle_path_escapes: classified("target_unavailable", "unavailable")
		};
		binaryTargetClassification = (constraint, readPermissionDenied) => {
			const base = BINARY_TARGET_CLASSIFICATIONS[constraint];
			return readPermissionDenied && constraint !== "load_selection_rejected" ? {
				...base,
				code: "access_denied"
			} : base;
		};
		BROWSER_OBSERVATION_CLASSIFICATIONS = {
			endpoint_unreachable: classified("provider_unavailable", "unavailable"),
			invalid_endpoint_response: classified("unreadable_output", "execution_failure"),
			target_not_found: classified("target_unavailable", "unavailable"),
			target_not_allowed: classified("target_unavailable", "unavailable"),
			application_already_running: classified("target_unavailable", "unavailable"),
			service_worker_blocked: classified("target_unavailable", "unavailable"),
			target_changed: classified("target_unavailable", "unavailable"),
			target_session_detached: classified("target_unavailable", "unavailable"),
			protocol_error: classified("unreadable_output", "execution_failure"),
			disconnected: classified("provider_unavailable", "unavailable"),
			payload_limit: classified("truncated", "truncated"),
			window_not_found: classified("unreadable_output", "execution_failure"),
			window_metadata_missing: classified("unreadable_output", "execution_failure"),
			process_ownership_unavailable: classified("unreadable_output", "execution_failure"),
			cleanup_failed: classified("execution_failure", "execution_failure"),
			cancelled: classified("cancelled", "cancelled"),
			timeout: classified("provider_timeout", "timeout")
		};
		CANCELLED = classified("cancelled", "cancelled");
		PROCESS_CAPTURE_FAILED = classified("process_capture_failed", "execution_failure");
		staticClassification = (error) => {
			const tag = domainErrorTag(error);
			if (tag === undefined) throw new TypeError(`Unpresented provider error: ${error._tag}`);
			switch (tag) {
				case "ArtifactOperationError":
				case "BinaryTargetError":
				case "BrowserObservationError":
				case "EvidenceFileError":
				case "ProcessCaptureError":
				case "ProviderSelectionError":
				case "UnknownRegistryError": throw new TypeError(`Unhandled specialized analysis error: ${tag}`);
				default: return STATIC_ERROR_CLASSIFICATIONS[tag];
			}
		};
		classifyAnalysisError = (error) => {
			const owned = error.ownPresentation();
			if (owned !== undefined) return {
				code: owned.code,
				category: owned.category
			};
			if (error instanceof AnalysisCapabilityUnavailableError && error.retryable) return RETRYABLE_CAPABILITY_UNAVAILABLE;
			if (error instanceof ProviderSelectionError) return PROVIDER_SELECTION_CLASSIFICATIONS[error.reason];
			if (error instanceof BrowserObservationError) return error.userCategory === "cancelled" ? CANCELLED : BROWSER_OBSERVATION_CLASSIFICATIONS[error.reason];
			if (error instanceof ArtifactOperationError) return error.reason === "integrity" && error.artifactDetails !== undefined ? ARTIFACT_IDENTITY_MISMATCH : ARTIFACT_OPERATION_CLASSIFICATIONS[error.reason];
			if (error instanceof BinaryTargetError) return binaryTargetClassification(error.constraint ?? "unconstrained", error.systemCode !== undefined);
			if (error instanceof EvidenceFileError) return EVIDENCE_FILE_CLASSIFICATIONS[error.reason];
			if (error instanceof UnknownRegistryError) return UNKNOWN_REGISTRY_CLASSIFICATIONS[error.reason];
			if (error._tag === "ProcessCaptureError") return error.userCategory === "cancelled" ? CANCELLED : PROCESS_CAPTURE_FAILED;
			return staticClassification(error);
		};
		catalogueRow = (tag, discriminant, classification, retryableByDefault = RETRYABLE_CODES.has(classification.code)) => ({
			tag,
			discriminant,
			...classification,
			retryableByDefault
		});
		reasonRows = (tag, table) => Object.entries(table).map(([reason, classification]) => catalogueRow(tag, `reason=${reason}`, classification));
		analysisErrorCatalogue = () => [
			...Object.entries(STATIC_ERROR_CLASSIFICATIONS).map(([tag, classification]) => catalogueRow(tag, "", classification)),
			catalogueRow("AnalysisCapabilityUnavailableError", "retryable=true", RETRYABLE_CAPABILITY_UNAVAILABLE, true),
			...reasonRows("ArtifactOperationError", ARTIFACT_OPERATION_CLASSIFICATIONS),
			catalogueRow("ArtifactOperationError", "reason=integrity; artifact identity reported", ARTIFACT_IDENTITY_MISMATCH),
			...Object.keys(BINARY_TARGET_CLASSIFICATIONS).flatMap((key) => {
				const constraint = key;
				const allowed = binaryTargetClassification(constraint, false);
				const denied = binaryTargetClassification(constraint, true);
				return [catalogueRow("BinaryTargetError", `constraint=${constraint}`, allowed), ...denied.code === allowed.code ? [] : [catalogueRow("BinaryTargetError", `constraint=${constraint}; read permission denied`, denied)]];
			}),
			...reasonRows("BrowserObservationError", BROWSER_OBSERVATION_CLASSIFICATIONS),
			catalogueRow("BrowserObservationError", "caused by cancellation", CANCELLED),
			...reasonRows("EvidenceFileError", EVIDENCE_FILE_CLASSIFICATIONS),
			catalogueRow("ProcessCaptureError", "", PROCESS_CAPTURE_FAILED),
			catalogueRow("ProcessCaptureError", "caused by cancellation", CANCELLED),
			...reasonRows("ProviderSelectionError", PROVIDER_SELECTION_CLASSIFICATIONS),
			...reasonRows("UnknownRegistryError", UNKNOWN_REGISTRY_CLASSIFICATIONS)
		];
	})))();
}

//#endregion
//#region dist/domain/analysisRefusal.js
var fieldName, UNCHANGED, adjustableBudgetRemediation, analysisRefusalRemediation, analysisRefusalMessage, analysisRefusalDetails;
function init_analysisRefusal() {
	return (init_analysisRefusal = __esmMin((() => {
		init_analysisSettingDefinitions();
		init_fixedAllowanceRemediation();
		fieldName = (field) => field.map(String).join(".");
		UNCHANGED = "Repeating the unchanged request is not expected to succeed.";
		adjustableBudgetRemediation = (operation, budget, callerLifetime) => {
			const { unit, minimum, maximum, effective_value: value, required_value: required } = budget;
			const control = budget.parameter ?? budget.setting;
			const range = `${String(minimum)}..${String(maximum)} ${unit}`;
			const effective = value === null ? `The effective ${control} value is unknown` : `${operation} reached its ${control} budget of ${String(value)} ${unit}${budget.source === undefined ? "" : ` (source ${budget.source})`}`;
			if (value !== null && value >= maximum) return `${effective}. ${control} is already at its maximum (${range}); narrow the request or select a smaller input. ${UNCHANGED}`;
			if (required !== undefined && required > maximum) return `${effective}. The request requires ${String(required)} ${unit}, above the ${control} maximum (${range}); narrow the request or select a smaller input. ${UNCHANGED}`;
			const environment = analysisSettingDefinition(budget.setting).environment;
			const change = budget.parameter !== undefined && (budget.update_mode === "parameter" || callerLifetime === "invocation" && environment === undefined) ? `Pass a larger ${budget.parameter} on the next ${operation} call` : callerLifetime === "invocation" ? `Set ${environment ?? budget.setting} for the next invocation` : budget.update_mode === "runtime" ? `Raise ${budget.setting} with update_analysis_settings` : `Set ${environment ?? budget.setting} in the environment that starts REA, then restart REA`;
			const atLeast = required === undefined ? "" : `at least ${String(required)} ${unit}; `;
			return `${effective}. ${change} (${atLeast}range ${range}), then retry.`;
		};
		analysisRefusalRemediation = (refusal, callerLifetime = "continuing") => {
			switch (refusal.kind) {
				case "fixed_ceiling": {
					const { ceiling } = refusal;
					const base = fixedAllowanceRemediation(ceiling.name, ceiling.kind);
					const value = ceiling.limit === undefined || ceiling.unit === undefined ? "" : ` The allowance is ${String(ceiling.limit)} ${ceiling.unit}; this release has no runtime override.`;
					return ceiling.narrowing === undefined ? `${base}${value}` : `${base}${value} ${ceiling.narrowing}`;
				}
				case "adjustable_budget": return adjustableBudgetRemediation(refusal.operation, refusal.budget, callerLifetime);
				case "ambiguous_selector": {
					const { field, candidates } = refusal.selector;
					return `Set ${fieldName(field)} to exactly one of the ${String(candidates.length)} candidates in details.refusal.candidates, then retry ${refusal.operation}. ${UNCHANGED}`;
				}
			}
		};
		analysisRefusalMessage = (refusal) => refusal.kind === "ambiguous_selector" ? `${fieldName(refusal.selector.field)} matches ${String(refusal.selector.candidates.length)} candidates; ${refusal.operation} needs exactly one.` : undefined;
		analysisRefusalDetails = (refusal) => {
			switch (refusal.kind) {
				case "fixed_ceiling": {
					const { ceiling } = refusal;
					return {
						kind: refusal.kind,
						operation: refusal.operation,
						allowance: ceiling.name,
						allowance_kind: ceiling.kind,
						...ceiling.limit === undefined ? {} : { limit: ceiling.limit },
						...ceiling.unit === undefined ? {} : { unit: ceiling.unit },
						...ceiling.narrowing === undefined ? {} : { narrowing: ceiling.narrowing }
					};
				}
				case "adjustable_budget": {
					const { budget } = refusal;
					return {
						kind: refusal.kind,
						operation: refusal.operation,
						control: budget.parameter ?? budget.setting,
						setting: budget.setting,
						effective_value: budget.effective_value,
						unit: budget.unit,
						range: {
							minimum: budget.minimum,
							maximum: budget.maximum
						},
						...budget.required_value === undefined ? {} : { required_value: budget.required_value }
					};
				}
				case "ambiguous_selector": return {
					kind: refusal.kind,
					operation: refusal.operation,
					field: [...refusal.selector.field],
					candidates: [...refusal.selector.candidates]
				};
			}
		};
	})))();
}

//#endregion
//#region dist/domain/analysisErrorPresentation.js
var UNRETAINED_EVIDENCE_EXPORT_GUIDANCE, MCP_TRANSPORT_EVIDENCE_EXPORT, MCP_TRANSPORT_EVIDENCE_DISCOVERY, MCP_TRANSPORT_EVIDENCE_RECORDS, MCP_TRANSPORT_EVIDENCE_LINKS, analysisErrorRemediationAction, measuredResourceRemediation, analysisErrorCategory, analysisErrorUserMessage, analysisErrorUserMessageParts, hasAnalysisContinuingCallerGuidance, hasAuthoredRemediation, composedCallerGuidance, outcomeUserMessage, unclassifiedProviderRemediation, standardErrorMessage, timeoutUserMessage, timeoutRemediation, UNREADABLE_OUTPUT_TAGS, UNSUPPORTED_PROVIDER_TAGS, CANCELLED_TAGS, INTEGRITY_POLICY_OPERATIONS, artifactMessage, mergeRelatedList, presentedRelatedInputs, analysisErrorRelatedInputs, evidenceFileMessage, KNOWN_ERROR_TAGS, assertKnownAnalysisError;
function init_analysisErrorPresentation() {
	return (init_analysisErrorPresentation = __esmMin((() => {
		init_residualUnknownGraphError();
		init_inputArgumentGuidance();
		init_analysisErrorCore();
		init_artifactOperationError();
		init_appleBundleTypes();
		init_configurationErrors();
		init_browserObservationError();
		init_evidenceErrors();
		init_providerSelectionError();
		init_providerAdapterError();
		init_doctorProviderIds();
		init_unknownRegistryError();
		init_analysisErrorRefusal();
		init_analysisErrorClassification();
		init_analysisRefusal();
		init_analysisErrorBase();
		UNRETAINED_EVIDENCE_EXPORT_GUIDANCE = "Unretained Evidence is not included in the exported investigation; if present in this response, save it separately.";
		MCP_TRANSPORT_EVIDENCE_EXPORT = "Export complete retained session evidence through export_evidence_bundle to a caller-selected path, or use complete CLI JSON output. The connection remains usable.";
		MCP_TRANSPORT_EVIDENCE_DISCOVERY = `Discover retained records with get_evidence_bundle and detail: summary, then read selected complete records with detail: records and an exact evidence_id, or inspect compatible records through inspect_analysis_view using an exact Evidence reference. ${MCP_TRANSPORT_EVIDENCE_EXPORT}`;
		MCP_TRANSPORT_EVIDENCE_RECORDS = `Request fewer records with get_evidence_bundle detail: records, a smaller limit or an exact evidence_id filter; inspect compatible records in pages through inspect_analysis_view. A single record larger than one response needs export. ${MCP_TRANSPORT_EVIDENCE_EXPORT}`;
		MCP_TRANSPORT_EVIDENCE_LINKS = "Request fewer rows with get_evidence_bundle detail: links, a smaller limit or an exact evidence_id filter, then follow next_offset.";
		analysisErrorRemediationAction = (error, callerLifetime = "continuing") => {
			error = resolvedAnalysisError(error);
			const continuing = callerLifetime === "continuing" ? error.continuingCallerGuidance?.remediationAction ?? error.ownPresentation()?.continuing?.remediationAction : undefined;
			if (continuing !== undefined) return continuing;
			const owned = error.ownPresentation()?.remediation;
			if (owned !== undefined) return owned;
			if ((error instanceof ProviderAdapterError || error instanceof AnalysisCapabilityUnavailableError) && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof ProviderAdapterError && error.userMessage === undefined) return unclassifiedProviderRemediation(error.providerId);
			if (error instanceof BrowserObservationError && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof BrowserObservationError && error.reason === "service_worker_blocked") return "Set environment.service_workers to allow to permit this capture, or remove the service worker registration through the browser. REA never removes existing registrations.";
			if (error instanceof AnalysisCapabilityUnavailableError && error.retryable) return "Review details.reason, then retry the same analysis after the condition clears.";
			if (error instanceof AnalysisCapabilityUnavailableError && error.fallbackRemediationAction !== undefined) return error.fallbackRemediationAction;
			if (error instanceof EvidenceFileError && error.published !== undefined) return error.published.path === undefined ? "Resolve the reported staging cleanup failure. Publication completed; its path identity is excluded." : "Use the published file at details.published_path and resolve the reported staging cleanup failure.";
			if (error instanceof ProviderSelectionError && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof ResourceSnapshotMismatchError) return error.operation === "export" ? "Call close_binary without snapshot_path to close this resource-only session." : "Open an executable analysis target before importing a binary analysis snapshot.";
			if (error instanceof AnalysisSnapshotMismatchError) return "Select an artifact, provider, and analysis profile matching the snapshot, or run analysis without it and save a fresh snapshot for the intended binding.";
			if (error instanceof AnalysisUnsupportedTargetError) return error.remediationAction ?? "Select a target supported by this operation or choose an operation supporting the reported target format.";
			if (error instanceof AnalysisResourceConstraintError) {
				if (error.remediationAction !== undefined) return error.remediationAction;
				const refusal = analysisErrorRefusal(error);
				return refusal === undefined ? measuredResourceRemediation(error.resource) : analysisRefusalRemediation(refusal, callerLifetime);
			}
			if (error instanceof AnalysisTimeoutError && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof AnalysisTimeoutError) return timeoutRemediation(error);
			if (error instanceof ArtifactOperationError && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof ArtifactOperationError) {
				const refusal = analysisErrorRefusal(error);
				if (refusal !== undefined) return analysisRefusalRemediation(refusal, callerLifetime);
			}
			if (error instanceof ArtifactOperationError && error.readerLimit !== undefined) return error.userMessage ?? error.detail ?? error.message;
			if (error instanceof ArtifactOperationError && error.reason === "limit" && error.boundary === "capacity") return "Use an artifact within the capacity reported in details.detail. Changing output detail or retrying the unchanged input does not remove this boundary.";
			if (error instanceof EvidenceReferenceError) return error.reason === "missing" && error.referenceScope === "retained-closure" ? "Import the originating Evidence bundle with the selected records and their complete linked sources into the current investigation, or re-run their producers there. Retry after the required records are retained. reset_investigation clears retained records; close_binary preserves them." : "Use an exact Evidence reference available from the selected source, supply the complete inline Evidence, re-run its producer, or select/import its Evidence bundle. reset_investigation clears retained records; close_binary preserves them.";
			if (error instanceof BinaryTargetError && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof BinaryTargetError && error.constraint === "directory_requires_file") return `For a JavaScript/Electron application directory, call analyze_javascript_application with input_path. For binary analysis, select its executable file or an Apple bundle directory (${OPENABLE_APPLE_BUNDLE_TYPES_TEXT}).`;
			if (error instanceof BinaryTargetError && error.constraint === "bundle_type_unsupported") return `Select the bundle's program file directly, or open a bundle directory of a supported type (${OPENABLE_APPLE_BUNDLE_TYPES_TEXT}).`;
			if (error instanceof BinaryTargetError && (error.constraint === "bundle_executable_undeclared" || error.constraint === "bundle_program_missing") && error.infoPlist !== undefined) return `Read ${error.infoPlist} with inspect_plist to review its CFBundleExecutable, then select an existing program file directly.`;
			if (error instanceof BinaryTargetError && error.constraint === "bundle_info_plist_decode_budget_exceeded") return `Reduce the Info.plist below the ${16} MiB decoded representation allowance, then retry opening the bundle.`;
			if (error instanceof BinaryTargetError && (error.constraint === "bundle_info_plist_missing" || error.constraint === "bundle_layout_ambiguous" || error.constraint === "bundle_current_version_missing" || error.constraint === "bundle_path_escapes")) return "Review the bundle paths listed in details, then select the bundle's program file directly or repair the bundle layout.";
			if (error instanceof BinaryTargetError && error.constraint === "load_selection_rejected") return "Correct the reported load argument (format, architecture, or entry_point) and retry.";
			if (error instanceof BinaryTargetError && error.constraint === "file_format_rejected") return "Review the reported file-format reason and select a supported, well-formed target.";
			if (error instanceof BinaryTargetError && error.constraint === "wasm_requires_static_inspection") return `For static inspection, call inspect_wasm_artifact with ${JSON.stringify({ path: error.path })}. This separate lane requires caller-supplied WABT 1.0.42 via absolute REA_WABT_BIN_DIRECTORY; check its availability in binary_session. REA does not execute WASM or install tools, and the header alone does not establish that the complete module is valid.`;
			if (error instanceof AnalysisAccessDeniedError || error instanceof BinaryTargetError && error.systemCode !== undefined) return "Check the current process's read access to the selected path. Retry with a readable local file.";
			if (error instanceof AnalysisArtifactChangedError) return "Wait until the selected file is stable. For an active binary session, reopen the target with open_binary before retrying so REA acquires its current identity; for a CLI command or target-free tool, rerun the operation.";
			if (error instanceof ConfigurationError) return error.remediationAction ?? (error.settings.length > 0 ? `Correct ${[...new Set(error.settings.map(({ setting }) => setting))].join(", ")} in the environment that starts REA (your shell or the MCP client's registration), then rerun.` : analysisErrorUserMessage(error));
			if (error instanceof AnalysisInputError) {
				const refusal = analysisErrorRefusal(error);
				if (error.remediationAction === undefined && refusal !== undefined) return analysisRefusalRemediation(refusal, callerLifetime);
				const mistakeRemediation = knownArgumentMistakeRemediation(error.operation, error.issues);
				const baseAction = error.remediationAction ?? `Read the declared input schema or CLI usage for ${error.operation}; if using MCP and the catalog may be stale, call tools/list. Correct the listed fields, then retry. Do not repeat the unchanged call.`;
				return mistakeRemediation === undefined ? baseAction : `${mistakeRemediation} ${baseAction}`;
			}
			if (error instanceof AnalysisOutputError && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof UnknownRegistryError && error.reason === "constraint" && error.constraint !== undefined) {
				const suffix = " Do not repeat the unchanged call.";
				switch (error.constraint.kind) {
					case "missing_evidence": return "Use an Evidence ID retained in this session; obtain or import the missing Evidence before referencing it." + suffix;
					case "missing_unknown": return "Use an unknown_id retained in this session; create or import the related unknown before referencing it." + suffix;
					case "resolution_unproven": return "Supply supporting non-mutation Evidence matching the unknown's required authority, confidence and environment, or withdraw the unsupported resolution." + suffix;
					case "contradicting_evidence": return "Reconcile the contradicting Evidence before claiming a verified resolution." + suffix;
					case "dependency_cycle": return "Correct the depends-on relationships to remove the dependency cycle." + suffix;
					case "history_gap":
					case "revision_chain": break;
				}
			}
			if (error instanceof UnknownRegistryError && error.reason === "not-found") return "Check that the unknown_id belongs to this session, then retry.";
			return analysisErrorUserMessage(error);
		};
		measuredResourceRemediation = (resource) => {
			switch (resource) {
				case "capacity": return "Wait for an active analysis to complete, then retry within the reported admission limits.";
				case "transport": return MCP_TRANSPORT_EVIDENCE_DISCOVERY;
				case "cpu": return "Review the reported worker CPU limits and observed signal. Retry with sufficient CPU time or a smaller artifact; REA retains tighter inherited limits.";
				case "file-size": return "Review the reported worker file-size limits and write failure. Retry with a sufficient file-size allowance for the evidence reply; REA retains tighter inherited limits.";
				case "memory": return "Review the reported worker memory limits and available host memory. Retry with sufficient memory or a smaller artifact; REA retains tighter inherited limits.";
			}
		};
		analysisErrorCategory = (error) => classifyAnalysisError(primaryAnalysisError(error)).category;
		analysisErrorUserMessage = (error, callerLifetime = "continuing") => {
			const { outcome, continuing } = analysisErrorUserMessageParts(error);
			return callerLifetime === "invocation" || continuing === undefined ? outcome : `${outcome} ${continuing}`;
		};
		analysisErrorUserMessageParts = (error) => {
			error = resolvedAnalysisError(error);
			const outcome = outcomeUserMessage(error);
			const continuing = error.continuingCallerGuidance?.userMessage ?? error.ownPresentation()?.continuing?.userMessage;
			return continuing === undefined ? { outcome } : {
				outcome,
				continuing
			};
		};
		hasAnalysisContinuingCallerGuidance = (error) => error.continuingCallerGuidance !== undefined || error.ownPresentation()?.continuing !== undefined;
		hasAuthoredRemediation = (error, callerLifetime) => callerLifetime === "continuing" && error.continuingCallerGuidance?.remediationAction !== undefined || "remediationAction" in error && typeof error.remediationAction === "string" || error instanceof AnalysisCapabilityUnavailableError && error.fallbackRemediationAction !== undefined;
		composedCallerGuidance = (sources) => {
			const message = sources.message === undefined ? undefined : analysisErrorUserMessageParts(sources.message);
			const remediationOwner = (lifetime) => hasAuthoredRemediation(sources.remediation, lifetime) ? sources.remediation : sources.message !== undefined && hasAuthoredRemediation(sources.message, lifetime) ? sources.message : sources.remediation;
			const remediationAction = analysisErrorRemediationAction(remediationOwner("invocation"), "invocation");
			const continuingRemediation = analysisErrorRemediationAction(remediationOwner("continuing"));
			const continuingCallerGuidance = {
				...message?.continuing === undefined ? {} : { userMessage: message.continuing },
				...continuingRemediation === remediationAction ? {} : { remediationAction: continuingRemediation }
			};
			return {
				...message === undefined ? {} : { userMessage: message.outcome },
				remediationAction,
				...Object.keys(continuingCallerGuidance).length === 0 ? {} : { continuingCallerGuidance }
			};
		};
		outcomeUserMessage = (error) => {
			if (error instanceof AnalysisSnapshotMismatchError) return error.message;
			if (error instanceof AnalysisUnsupportedTargetError) return error.message;
			if (error instanceof AnalysisResourceConstraintError) return error.reason;
			if (error instanceof AnalysisAccessDeniedError) return "Host filesystem permissions denied read access to the selected path.";
			if (error instanceof AnalysisArtifactChangedError) return "The selected artifact changed during acquisition; no stable snapshot was decoded.";
			if (error instanceof AnalysisInputError) {
				const refusal = analysisErrorRefusal(error);
				return error.userMessage ?? (refusal === undefined ? undefined : analysisRefusalMessage(refusal)) ?? "Analysis input is invalid. Check the arguments and try again.";
			}
			if (error instanceof AnalysisTimeoutError) return error.userMessage ?? timeoutUserMessage(error);
			const ownedMessage = error.ownPresentation()?.message;
			if (ownedMessage !== undefined) return ownedMessage;
			if (error.userMessage !== undefined) return error.userMessage;
			if (error instanceof AnalysisCapabilityUnavailableError && error.retryable) return "Required runtime controls are unavailable for this attempt.";
			if (error instanceof ProviderAdapterError) return `The ${error.providerId} provider could not complete ${error.operation}, and REA did not classify the failure. Any reason the provider reported is in details.diagnostics.`;
			const standardMessage = standardErrorMessage(error);
			if (standardMessage !== undefined) return standardMessage;
			if (error instanceof ArtifactOperationError) return artifactMessage(error);
			if (error instanceof EvidenceReferenceError) return error.reason === "missing" ? error.referenceScope === "retained-closure" ? `Evidence ${error.evidenceId} is missing from the required retained Evidence closure in the current investigation. Import its originating bundle or re-create the required observations before retrying.` : `Evidence ${error.evidenceId} is not available from the selected source. Supply complete inline Evidence, re-run its producer, or select/import its bundle before using this reference.` : `Evidence ${error.evidenceId} does not match the requested reference (${error.reason}). Check the expected and actual identity in the diagnostic details.`;
			if (error instanceof EvidenceIntegrityError) return "Evidence is invalid or has changed. Recreate or re-import it, then try again.";
			if (error instanceof EvidenceFileError) return evidenceFileMessage(error);
			if (error instanceof UnknownRegistryError && error.reason === "already-exists") return "This residual unknown already exists in the session. Reuse it or call update_unknown with its current expected_revision; do not repeat record_unknown.";
			if (error instanceof UnknownRegistryError && error.reason === "not-found") return "The requested residual unknown does not exist in this session. Check the unknown_id and try again.";
			if (error instanceof UnknownRegistryError && error.constraint !== undefined) return describeResidualUnknownGraphConstraint(error.constraint);
			if (error instanceof UnknownRegistryError) return "Evidence state changed before the update completed. Refresh the current state and try again.";
			if (error instanceof ConfigurationError) return error.settings.length === 0 ? "REA configuration is invalid. Run `rea doctor` and fix the reported setting." : `REA configuration is invalid: ${error.settings.map(({ setting, constraint }) => constraint.includes(setting) ? constraint.replace(/\.$/u, "") : `${setting}: ${constraint}`).join("; ")}.`;
			if (error instanceof NoBinaryOpenError) return error.message;
			if (error instanceof BinaryTargetError && error.constraint === "wasm_requires_static_inspection") return `${error.message}. Static WebAssembly inspection uses a separate optional WABT lane, not a native analysis engine.`;
			if (error instanceof BinaryTargetError) return error.constraint === "directory_requires_file" ? `open_binary accepts files and Apple bundle directories (${OPENABLE_APPLE_BUNDLE_TYPES_TEXT}). This target is another directory; JavaScript/Electron application directories can be analyzed directly with analyze_javascript_application.` : error.constraint === undefined ? `${error.message}. Check that the path exists, is readable, and points to a supported file.` : `${error.message}.`;
			if (error._tag === "ProcessCaptureError") return error.userMessage ?? "Process capture could not complete. Review the reported details and capture policy, then try again.";
			return "Analysis could not complete, and REA did not classify the failure. Review the reported details.";
		};
		unclassifiedProviderRemediation = (providerId) => isDoctorProviderId(providerId) ? `Review the reported details. If the ${providerId} installation or configuration may be at fault, run \`rea doctor --provider ${providerId}\` and apply its fixes. Repeating the unchanged request is not expected to succeed.` : "Review the reported details for the provider's reason; REA has no specific recovery for this unclassified failure. Repeating the unchanged request is not expected to succeed.";
		standardErrorMessage = (error) => {
			const tag = error._tag;
			const code = error.ownPresentation()?.code;
			if (UNREADABLE_OUTPUT_TAGS.has(tag) || code === "unreadable_output") return "Analysis returned a result REA could not read. Review the reported details; repeating the unchanged request is not expected to succeed.";
			if (UNSUPPORTED_PROVIDER_TAGS.has(tag)) return "This analysis is unavailable for the current target. Choose another analysis or target.";
			if (CANCELLED_TAGS.has(tag) || code === "cancelled") return "Analysis was cancelled. Start it again when ready.";
			return undefined;
		};
		timeoutUserMessage = (error) => `REA's ${error.operation} operation reached its ${String(error.timeoutMs)}ms server/provider deadline. This is not a client-side timeout; extending only the MCP client's deadline does not change this budget.`;
		timeoutRemediation = (error) => `Inspect any partial Evidence, provider diagnostics and reported session/provider cleanup state for ${error.operation}. Reduce the request if supported, or resolve the reported provider condition before retrying. Do not repeat the unchanged call or retry while work or cleanup may still be active.`;
		UNREADABLE_OUTPUT_TAGS = new Set(["AnalysisProtocolError", "AnalysisOutputError"]);
		UNSUPPORTED_PROVIDER_TAGS = new Set(["AnalysisCapabilityUnavailableError", "ProviderSelectionError"]);
		CANCELLED_TAGS = new Set(["AnalysisCancelledError"]);
		INTEGRITY_POLICY_OPERATIONS = new Set([
			"inventory_artifact",
			"inspect_artifact",
			"extract_artifact",
			"analyze_javascript_application"
		]);
		artifactMessage = ({ operation, reason, artifactDetails: details, detail }) => {
			if (reason === "cancelled") return "Artifact operation was cancelled. Start it again when ready.";
			if (reason === "limit") return detail ?? "Artifact processing reached a resource limit. Select an artifact within the reported limits and retry.";
			if (reason === "unsupported") return "Artifact structure uses an unsupported format or revision. Use a decoder that supports the reported form.";
			if (reason === "truncated") return "A declared artifact structure is truncated. Select a complete copy and retry; do not pad or truncate required bytes.";
			if (reason === "malformed") return "Artifact bytes contain malformed format structure. Review the reported field and select a valid copy.";
			if (reason === "path") return detail ?? "Artifact contains a conflicting internal path. Inspect the reported path before retrying.";
			if (reason === "unavailable" && details?.unpacked === true) return `ASAR unpacked companion bytes are unavailable for ${details.logicalPath}. Select the archive in place with its .unpacked directory beside it, then retry.`;
			if (reason === "unavailable") return "Artifact processing is unavailable. Review the reported availability reason and resolve that condition before retrying.";
			if (reason === "integrity" && details !== undefined && INTEGRITY_POLICY_OPERATIONS.has(operation)) return `${details?.unpacked === true && "calculatedSha256" in details && details.calculatedSha256 !== null ? `Declared ASAR integrity for unpacked entry ${details.logicalPath} contradicts its companion file; packaging tools commonly sign or strip unpacked native binaries after writing the archive.` : "Artifact bytes contradict declared integrity."} If expected, rerun ${operation === "inventory_artifact" ? "inspect_artifact" : operation} with integrity_policy=record-and-continue to retain observed bytes as untrusted; otherwise get a fresh copy.`;
			if (reason === "format" || reason === "integrity") return "Artifact is invalid or has changed. Get a fresh copy and try again.";
			return "Artifact could not be read or written. Check file access and try again.";
		};
		mergeRelatedList = (left, right) => {
			const merged = [...new Set([...left ?? [], ...right ?? []])];
			return merged.length === 0 ? undefined : merged;
		};
		presentedRelatedInputs = (error) => {
			if (error instanceof BinaryTargetError) {
				if (error.constraint === "directory_requires_file") return { operations: ["analyze_javascript_application"] };
				if (error.remediationAction !== undefined) return undefined;
				if ((error.constraint === "bundle_executable_undeclared" || error.constraint === "bundle_program_missing") && error.infoPlist !== undefined) return { operations: ["inspect_plist"] };
				if (error.constraint === "load_selection_rejected") return { parameters: [
					"format",
					"architecture",
					"entry_point"
				] };
				if (error.constraint === "wasm_requires_static_inspection") return { operations: ["inspect_wasm_artifact"] };
			}
			if (error instanceof ArtifactOperationError && error.reason === "integrity" && error.artifactDetails !== undefined && INTEGRITY_POLICY_OPERATIONS.has(error.operation)) return {
				parameters: ["integrity_policy"],
				...error.operation === "inventory_artifact" ? { operations: ["inspect_artifact"] } : {}
			};
			return undefined;
		};
		analysisErrorRelatedInputs = (error) => {
			error = resolvedAnalysisError(error);
			const presented = presentedRelatedInputs(error);
			const parameters = mergeRelatedList(error.related?.parameters, presented?.parameters);
			const operations = mergeRelatedList(error.related?.operations, presented?.operations);
			if (parameters === undefined && operations === undefined) return undefined;
			return {
				...parameters === undefined ? {} : { parameters },
				...operations === undefined ? {} : { operations }
			};
		};
		evidenceFileMessage = ({ operation, reason, published, systemCode }) => {
			if (published !== undefined) return "The output file was published, but staging cleanup remains incomplete.";
			if (reason === "path-limit") return "Filesystem path-length constraints prevented reading or atomic publication at the selected path. Choose a shorter local path.";
			if (reason === "storage-limit") return systemCode === "EFBIG" ? "The host file-size limit prevented Evidence publication. Increase the inherited file-size allowance and retry." : systemCode === undefined ? "A host filesystem resource limit prevented Evidence publication. Check the file-size allowance, filesystem space and quota before retrying." : "The filesystem lacks space or quota for Evidence publication. Free space or increase quota and retry.";
			if (reason === "symlink-traversal") return "The selected path cannot be resolved because its symbolic-link chain loops or exceeds the host traversal limit. Repair the chain or select another path.";
			if (reason === "missing") return operation === "read" ? "Evidence file does not exist at the selected path. Check the path and try again." : "Evidence output directory does not exist. Choose an existing directory and try again.";
			if (reason === "not-file") return "Evidence path does not point to a regular file. Choose a file and try again.";
			if (reason === "exists") return "Evidence file already exists. Choose another path or allow overwrite.";
			if (reason === "invalid-json") return "Evidence file is not valid JSON. Repair or recreate the file and try again.";
			return "Evidence file could not be accessed. Check file permissions and try again.";
		};
		KNOWN_ERROR_TAGS = {
			AnalysisProtocolError: true,
			AnalysisInputError: true,
			AnalysisAccessDeniedError: true,
			AnalysisArtifactChangedError: true,
			AnalysisOutputError: true,
			AnalysisCapabilityUnavailableError: true,
			AnalysisUnsupportedTargetError: true,
			AnalysisCancelledError: true,
			AnalysisTimeoutError: true,
			AnalysisResourceConstraintError: true,
			ProviderSelectionError: true,
			ProviderAdapterError: true,
			BrowserObservationError: true,
			ArtifactOperationError: true,
			ProcessCaptureError: true,
			EvidenceIntegrityError: true,
			EvidenceFileError: true,
			UnknownRegistryError: true,
			ConfigurationError: true,
			NoBinaryOpenError: true,
			BinaryTargetError: true
		};
		assertKnownAnalysisError = (error) => {
			if (error instanceof ProviderOwnedAnalysisError) return;
			const tag = domainErrorTag(error);
			if (tag === undefined || KNOWN_ERROR_TAGS[tag] !== true) throw new TypeError("Unknown analysis error tag");
		};
	})))();
}

//#endregion
//#region dist/domain/analysisErrorProjection.js
/** Enumerate recoveries owned by this projection, including secondary failures. */
function* unretainedEvidenceCandidates(projected, secondaryPath = []) {
	for (const field of ["partial_observation", "completed_observation"]) {
		const value = projected.details?.[field];
		if (isRecord(value) && (value.kind === "unretained-evidence" || value.kind === "unretained-observation" || value.kind === "inline-evidence")) yield {
			field,
			secondaryPath,
			value
		};
	}
	const secondary = projected.details?.secondary_failures;
	if (!Array.isArray(secondary)) return;
	for (const [index, failure] of secondary.entries()) {
		if (typeof failure !== "object" || failure === null || Array.isArray(failure)) continue;
		const remediation = failure.remediation;
		if (typeof remediation !== "object" || remediation === null || Array.isArray(remediation) || typeof remediation.action !== "string") continue;
		yield* unretainedEvidenceCandidates(failure, [...secondaryPath, index]);
	}
}
var relatedInputDetails, projectAnalysisError, projectAnalysisErrorWithoutCapturedOutput, projectAnalysisErrorWithoutPartialObservation, omitUnretainedEvidenceFromError, recoveryOmissionRemediation, childFailureDiagnostics, projectionDependsOnCallerLifetime, projectError, errorRecovery, underlyingErrorCode, errorDetails, requestErrorDetails, artifactStateErrorDetails, providerErrorDetails, primaryBrowserFailureReason, lifecycleErrorDetails;
function init_analysisErrorProjection() {
	return (init_analysisErrorProjection = __esmMin((() => {
		init_artifactIntegrity();
		init_analysisErrorRecovery();
		init_jsonValue();
		init_immutableJson();
		init_analysisErrorPresentation();
		init_analysisErrorCore();
		init_artifactOperationError();
		init_configurationErrors();
		init_browserObservationError();
		init_evidenceErrors();
		init_providerAdapterError();
		init_providerSelectionError();
		init_unknownRegistryError();
		init_analysisErrorBase();
		init_analysisSettingDefinitions();
		init_analysisErrorRefusal();
		init_analysisRefusal();
		init_analysisErrorClassification();
		init_parseFailure();
		relatedInputDetails = (related) => ({
			...related?.parameters === undefined || related.parameters.length === 0 ? {} : { related_parameters: [...related.parameters] },
			...related?.operations === undefined || related.operations.length === 0 ? {} : { related_operations: [...related.operations] }
		});
		projectAnalysisError = (error, callerLifetime = "continuing") => projectError(error, {
			capturedOutput: true,
			partialObservation: true,
			secondary: true
		}, callerLifetime);
		projectAnalysisErrorWithoutCapturedOutput = (error, callerLifetime = "continuing") => projectError(error, {
			capturedOutput: false,
			partialObservation: true,
			secondary: true
		}, callerLifetime);
		projectAnalysisErrorWithoutPartialObservation = (error, callerLifetime = "continuing") => projectError(error, {
			capturedOutput: true,
			partialObservation: false,
			secondary: true
		}, callerLifetime);
		omitUnretainedEvidenceFromError = (projected, limit, candidate) => {
			const { field, secondaryPath } = candidate;
			if (secondaryPath.length > 0) {
				const [index, ...rest] = secondaryPath;
				const secondary = projected.details?.secondary_failures;
				if (!Array.isArray(secondary) || index === undefined) return undefined;
				const failure = secondary[index];
				if (typeof failure !== "object" || failure === null || Array.isArray(failure)) return undefined;
				const omitted = omitUnretainedEvidenceFromError(failure, limit, {
					...candidate,
					secondaryPath: rest
				});
				if (omitted === undefined) return undefined;
				return {
					...projected,
					details: {
						...projected.details,
						secondary_failures: secondary.map((item, i) => i === index ? omitted : item)
					}
				};
			}
			const partial = projected.details?.[field];
			if (typeof partial !== "object" || partial === null || Array.isArray(partial) || partial.kind !== "unretained-evidence" && partial.kind !== "unretained-observation" && partial.kind !== "inline-evidence") {
				return undefined;
			}
			const { [field]: _partial, ...details } = projected.details;
			const evidence = partial.evidence;
			const evidenceId = isRecord(evidence) ? evidence.evidence_id : undefined;
			const retention = partial.kind === "inline-evidence" ? typeof partial.retention === "string" ? partial.retention : "unknown" : "unretained";
			return {
				...projected,
				remediation: { action: `${projected.remediation.action} ${recoveryOmissionRemediation(retention)}` },
				details: {
					...details,
					[`${field}_omitted`]: {
						reason: "mcp-response-limit",
						retention,
						constraint: limit.constraint,
						original_response_bytes_at_least: limit.bytesAtLeast,
						...typeof evidenceId === "string" ? { evidence_id: evidenceId } : {},
						...field === "completed_observation" ? { source_closure: "not-established" } : {}
					}
				}
			};
		};
		recoveryOmissionRemediation = (retention) => retention === "unretained" ? "The omitted observation was not retained and could not fit within MCP delivery limits." : retention === "unknown" ? "The omitted observation's retention is unknown, and it could not fit within MCP delivery limits." : "The observation could not fit within MCP delivery limits.";
		childFailureDiagnostics = (children, diagnostics = {}) => {
			const entries = Object.entries(children);
			const project = ({ error, capturedOutput, omitRecovery }, callerLifetime) => projectError(error, {
				capturedOutput: capturedOutput !== "omit",
				partialObservation: omitRecovery !== true,
				secondary: omitRecovery !== true
			}, callerLifetime);
			const continuing = {
				...diagnostics,
				...Object.fromEntries(entries.map(([key, child]) => [key, project(child, "continuing")]))
			};
			const varying = entries.filter(([, { error, omitRecovery }]) => projectionDependsOnCallerLifetime(error, omitRecovery !== true));
			return varying.length === 0 ? { diagnostics: continuing } : {
				diagnostics: continuing,
				invocationDiagnostics: {
					...continuing,
					...Object.fromEntries(varying.map(([key, child]) => [key, project(child, "invocation")]))
				}
			};
		};
		projectionDependsOnCallerLifetime = (error, includeSecondary) => {
			const chainDepends = (first) => {
				for (let node = first; node !== undefined; node = node.cleanupPrimary) if (node.limit !== undefined || hasAnalysisContinuingCallerGuidance(node) || node.invocationDiagnostics !== undefined || node.workflowUnknownPublication !== undefined) return true;
				return false;
			};
			if (chainDepends(error)) return true;
			if (!includeSecondary) return false;
			for (let node = error; node !== undefined; node = node.cleanupPrimary) if (node.secondaryFailures.some(chainDepends)) return true;
			return false;
		};
		projectError = (error, options, callerLifetime) => {
			const composed = error;
			error = resolvedAnalysisError(error);
			let diagnosticSource = error;
			while (diagnosticSource.diagnostics === undefined && diagnosticSource.cleanupPrimary !== undefined) diagnosticSource = diagnosticSource.cleanupPrimary;
			const diagnostics = diagnosticSource.diagnosticsFor(callerLifetime);
			const cleanupHistory = composed === error ? undefined : composed.diagnosticsFor(callerLifetime);
			const capturedOutput = composed.capturedOutput ?? error.capturedOutput;
			const publication = sourcePublicationRecoveryOf(composed);
			const secondary = new Set();
			for (let owner = composed; owner !== undefined; owner = owner.cleanupPrimary) {
				for (const failure of owner.secondaryFailures) secondary.add(failure);
			}
			let partialObservation = composed.partialObservation ?? error.partialObservation ?? publication?.source;
			for (let owner = composed.cleanupPrimary; partialObservation === undefined && owner !== undefined; owner = owner.cleanupPrimary) partialObservation = owner.partialObservation;
			let argumentObservations = composed.argumentObservations.length > 0 ? composed.argumentObservations : error.argumentObservations;
			for (let owner = composed.cleanupPrimary; argumentObservations.length === 0 && owner !== undefined; owner = owner.cleanupPrimary) argumentObservations = owner.argumentObservations;
			const completedSourceObservation = publication?.completed.kind === "omitted" ? undefined : publication?.completed;
			const completedSourceOmission = publication?.completed.kind === "omitted" ? {
				reason: publication.completed.reason,
				source_closure: publication.completed.source_closure
			} : undefined;
			let cleanupReport = composed.cleanupReport;
			for (let owner = composed.cleanupPrimary; cleanupReport === undefined && owner !== undefined; owner = owner.cleanupPrimary) cleanupReport = owner.cleanupReport;
			assertKnownAnalysisError(error);
			const primary = primaryAnalysisError(error);
			assertKnownAnalysisError(primary);
			const underlyingCode = underlyingErrorCode(primary);
			const code = error.cleanupIncomplete ? "cleanup_incomplete" : underlyingCode;
			const primaryDetails = errorDetails(primary);
			const refusal = analysisErrorRefusal(primary);
			const unknownPublication = composed.workflowUnknownPublication ?? primary.workflowUnknownPublication;
			const details = {
				...primaryDetails,
				...unknownPublication === undefined ? {} : { workflow_unknown_publication: {
					...unknownPublication,
					evidence_retention: callerLifetime === "invocation" && unknownPublication.evidence_retention === "retained" ? "invocation-only" : unknownPublication.evidence_retention
				} },
				...primary.limit === undefined ? {} : { limit: callerLifetime === "invocation" ? { ...invocationLimit(primary.limit) } : { ...primary.limit } },
				...refusal === undefined ? {} : { refusal: analysisRefusalDetails(refusal) },
				...relatedInputDetails(analysisErrorRelatedInputs(primary)),
				...!options.secondary || secondary.size === 0 ? {} : { secondary_failures: [...secondary].map((failure) => projectError(failure, {
					...options,
					secondary: false
				}, callerLifetime)) },
				...cleanupReport === undefined ? {} : { cleanup_report: jsonValueSchema.parse(cleanupReport) },
				...diagnostics === undefined ? {} : {
					diagnostics,
					...primaryDetails?.diagnostics === undefined ? {} : { provider_diagnostics: primaryDetails.diagnostics }
				},
				...cleanupHistory === undefined ? {} : { cleanup_history: cleanupHistory },
				...error.cleanupIncomplete ? {
					cleanup: "incomplete",
					resources: [...error.cleanupResources],
					...error.cleanup === undefined ? {} : { cleanup_reason: error.cleanup.reason },
					execution_failure: primaryDetails?.execution_failure ?? underlyingCode
				} : {},
				...!options.capturedOutput || capturedOutput === undefined ? {} : { captured_output: { ...capturedOutput } },
				...!options.partialObservation || partialObservation === undefined ? {} : { partial_observation: isImmutableJsonSnapshot(partialObservation) ? partialObservation : jsonValueSchema.parse(partialObservation) },
				...!options.partialObservation || argumentObservations.length === 0 ? {} : { argument_observations: argumentObservations.map(({ argument, observation }) => ({
					argument,
					observation: isImmutableJsonSnapshot(observation) ? observation : jsonValueSchema.parse(observation)
				})) },
				...!options.partialObservation || completedSourceObservation === undefined ? {} : { completed_observation: isImmutableJsonSnapshot(completedSourceObservation) ? completedSourceObservation : jsonValueSchema.parse(completedSourceObservation) },
				...!options.partialObservation || completedSourceOmission === undefined ? {} : { completed_observation_omitted: completedSourceOmission }
			};
			const cleanupRetry = error.cleanupRetry;
			const recovery = cleanupRetry === undefined ? errorRecovery(error) : cleanupRetryRecovery(cleanupRetry);
			const remediation = analysisErrorRemediationAction(error, callerLifetime);
			const includesUnretainedEvidence = options.partialObservation && [partialObservation, completedSourceObservation].some((observation) => typeof observation === "object" && observation !== null && "kind" in observation && observation.kind === "unretained-evidence");
			const retentionGuidance = error instanceof AnalysisResourceConstraintError && error.resource === "capacity" && includesUnretainedEvidence ? ` ${UNRETAINED_EVIDENCE_EXPORT_GUIDANCE}` : "";
			const publicationRemediation = callerLifetime === "continuing" && unknownPublication?.evidence_retention === "retained" ? " Use get_evidence_bundle with the Evidence ID in details.workflow_unknown_publication to retrieve the completed result; use list_unknowns to inspect recorded questions. Publication stopped at the reported index; later questions were not checked in this attempt." : "";
			return {
				code,
				category: analysisErrorCategory(error),
				message: analysisErrorUserMessage(error, callerLifetime),
				retryable: RETRYABLE_CODES.has(code) && error.ownPresentation()?.retryable !== false || error instanceof AnalysisCapabilityUnavailableError && error.retryable || error._tag === "ProcessCaptureError" && "retryable" in error && error.retryable === true || error instanceof ArtifactOperationError && error.readerLimit?.can_increase === true && !error.cleanupIncomplete || code === "resource_constraint" && error instanceof AnalysisResourceConstraintError && (error.retryable ?? error.resource === "capacity"),
				remediation: { action: cleanupRetry === undefined ? `${remediation}${retentionGuidance}${publicationRemediation}` : `${remediation}${retentionGuidance} ${cleanupRetryRemediation(cleanupRetry)}${publicationRemediation}` },
				...recovery === undefined ? {} : { recovery },
				...Object.keys(details).length === 0 ? {} : { details }
			};
		};
		errorRecovery = (error) => {
			if (error instanceof AnalysisInputError) return error.conformsToInputContract ? undefined : {
				kind: "inspect_input_contract",
				operation: error.operation
			};
			if (error instanceof AnalysisTimeoutError) return {
				kind: "inspect_timeout_state",
				operation: error.operation,
				timeout_ms: error.timeoutMs
			};
			return undefined;
		};
		underlyingErrorCode = (error) => error._tag === "ProcessCaptureError" && error.cleanupIncomplete ? "cleanup_incomplete" : classifyAnalysisError(error).code;
		errorDetails = (error) => error.ownPresentation()?.details ?? requestErrorDetails(error) ?? artifactStateErrorDetails(error) ?? providerErrorDetails(error) ?? lifecycleErrorDetails(error);
		requestErrorDetails = (error) => {
			if (error instanceof AnalysisUnsupportedTargetError) return {
				operation: error.operation,
				path: error.path,
				reason: error.reason
			};
			if (error instanceof AnalysisResourceConstraintError) return {
				operation: error.operation,
				resource: error.resource,
				reason: error.reason,
				reported_limits: error.reportedLimits,
				...error.requestSent === undefined ? {} : { request_sent: error.requestSent }
			};
			if (error instanceof AnalysisArtifactChangedError) return {
				operation: error.operation,
				path: error.path,
				reason: error.reason,
				boundary: "stable-artifact-read",
				...error.integrityCheck === undefined ? {} : { integrity_check: error.integrityCheck }
			};
			if (error instanceof AnalysisAccessDeniedError) return {
				operation: error.operation,
				path: error.path,
				system_code: error.systemCode,
				boundary: "filesystem-read"
			};
			if (error instanceof AnalysisOutputError) return {
				operation: error.operation,
				reason: error.reason,
				...error.diagnostics === undefined ? {} : { diagnostics: error.diagnostics }
			};
			if (error instanceof AnalysisInputError && error.issues.length > 0) return {
				operation: error.operation,
				issues: error.issues.map((issue) => ({
					path: [...issue.path],
					reason: issue.reason,
					...issue.message === undefined ? {} : { message: issue.message },
					...issue.expected === undefined ? {} : { expected: issue.expected },
					...issue.observed === undefined ? {} : { observed: issue.observed },
					...issue.minimum === undefined ? {} : { minimum: issue.minimum },
					...issue.maximum === undefined ? {} : { maximum: issue.maximum }
				}))
			};
			if (error instanceof EvidenceReferenceError) return {
				evidence_id: error.evidenceId,
				reason: error.reason,
				...typeof error.diagnostics?.operation === "string" ? { operation: error.diagnostics.operation } : {},
				...error.referenceScope === undefined ? {} : { reference_scope: error.referenceScope },
				expected: error.expected,
				actual: error.actual
			};
			if (error instanceof AnalysisSnapshotMismatchError) return {
				reason: error.message,
				...error.bindingMismatch === undefined ? {} : { binding_mismatch: jsonValueSchema.parse(error.bindingMismatch) }
			};
			if (error instanceof EvidenceIntegrityError) return {
				reason: error.message,
				...error.side === undefined ? {} : { side: error.side },
				...error.issuePath === undefined ? {} : { issue_path: [...error.issuePath] },
				...error.constraint === undefined ? {} : { constraint: error.constraint },
				...error.remainingIssueCount === undefined ? {} : { remaining_issue_count: error.remainingIssueCount }
			};
			return undefined;
		};
		artifactStateErrorDetails = (error) => {
			if (error instanceof ArtifactOperationError && error.artifactDetails) return {
				...projectArtifactIntegrityDetails(error.artifactDetails),
				...error.integrityCheck === undefined ? {} : { integrity_check: error.integrityCheck }
			};
			if (error instanceof ArtifactOperationError) return {
				operation: error.operation,
				reason: error.reason,
				...error.reason === "limit" ? { truncated: true } : {},
				...error.detail === undefined ? {} : { detail: error.detail },
				...error.boundary === undefined ? {} : { boundary: error.boundary },
				...error.integrityCheck === undefined ? {} : { integrity_check: error.integrityCheck },
				...error.readerLimit === undefined ? {} : { reader_limit: { ...error.readerLimit } },
				...error.parserLimit === undefined ? {} : { reported_limits: reportedParseLimit(error.parserLimit) },
				...error.admission === undefined ? {} : {
					admission: error.admission.kind,
					...error.admission.kind === "asar-header" ? {
						maximum_header_bytes: error.admission.maximumBytes,
						maximum_header_bytes_source: error.admission.source,
						setting: "REA_ASAR_MAX_HEADER_BYTES"
					} : {
						maximum_listing_bytes: error.admission.maximumBytes,
						maximum_listing_bytes_source: error.admission.source,
						setting: "REA_ASAR_MAX_LISTING_BYTES"
					}
				}
			};
			if (error instanceof UnknownRegistryError) return {
				reason: error.reason,
				...error.constraint === undefined ? {} : { constraint: error.constraint }
			};
			if (error instanceof EvidenceFileError) return {
				operation: error.operation,
				reason: error.reason,
				...error.reason === "path-limit" ? { boundary: "filesystem-path" } : {},
				...error.detectedKind === undefined ? {} : { detected_kind: error.detectedKind },
				...error.systemCode === undefined ? {} : { system_code: error.systemCode },
				...error.path === undefined ? {} : { path: error.path },
				...error.contentIssues === undefined ? {} : { content_issues: error.contentIssues.map((issue) => ({
					...issue,
					path: [...issue.path]
				})) },
				...error.published === undefined ? {} : {
					published: true,
					bytes: error.published.bytes,
					...error.published.path === undefined ? {} : { published_path: error.published.path }
				}
			};
			return undefined;
		};
		providerErrorDetails = (error) => {
			if (error instanceof AnalysisCapabilityUnavailableError) return {
				provider_id: error.providerId,
				operation: error.operation,
				reason: error.reason,
				...error.alternatives.length === 0 ? {} : { alternatives: [...error.alternatives] }
			};
			if (error instanceof ProviderSelectionError) return {
				operation: error.operation,
				selection_reason: error.reason,
				requested_provider_id: error.requestedProviderId,
				candidate_ids: [...error.candidateIds],
				rejections: error.rejections.map((rejection) => ({
					provider_id: rejection.providerId,
					origin: rejection.origin,
					code: rejection.code,
					reason: rejection.reason,
					...rejection.remediation === undefined ? {} : { remediation: rejection.remediation },
					diagnostics: rejection.diagnostics
				}))
			};
			if (error instanceof ProviderAdapterError) return {
				provider_id: error.providerId,
				operation: error.operation,
				...error.cleanupIncomplete ? {
					cleanup: "incomplete",
					resources: [...error.cleanupResources]
				} : {}
			};
			if (error instanceof BrowserObservationError) {
				const primaryReason = primaryBrowserFailureReason(error);
				return {
					operation: error.operation,
					reason: error.reason,
					...error.cleanupIncomplete ? {
						cleanup: "incomplete",
						resources: [...error.cleanupResources],
						...primaryReason === undefined ? {} : { primary_reason: primaryReason }
					} : {}
				};
			}
			return undefined;
		};
		primaryBrowserFailureReason = (error) => {
			const aggregate = error.cause instanceof AggregateError;
			const primary = error.cause instanceof AggregateError ? error.cause.errors[0] : error.cause;
			if (primary instanceof BrowserObservationError) return primary.reason;
			if (primary instanceof AnalysisCancelledError) return "cancelled";
			if (primary instanceof AnalysisTimeoutError) return "timeout";
			if (typeof primary === "object" && primary !== null && "_tag" in primary) return typeof primary._tag === "string" ? primary._tag : "execution_failure";
			return aggregate ? "execution_failure" : undefined;
		};
		lifecycleErrorDetails = (error) => {
			if (error instanceof AnalysisCancelledError) return {
				operation: error.operation,
				cleanup: error.cleanupIncomplete ? "incomplete" : "complete",
				...error.cleanup === undefined || !error.cleanupIncomplete ? {} : {
					cleanup_reason: error.cleanup.reason,
					resources: [...error.cleanup.resources],
					execution_failure: "cancelled"
				}
			};
			if (error instanceof AnalysisTimeoutError) return {
				operation: error.operation,
				timeout_ms: error.timeoutMs,
				...error.cleanup === undefined || !error.cleanupIncomplete ? {} : {
					cleanup: "incomplete",
					cleanup_reason: error.cleanup.reason,
					resources: [...error.cleanup.resources]
				}
			};
			if (error._tag === "ProcessCaptureError" && error.cleanupIncomplete) return {
				cleanup: "incomplete",
				resources: [...error.cleanupResources],
				...error.cleanupReport === undefined ? {} : { cleanup_report: jsonValueSchema.parse(error.cleanupReport) },
				...error.executionFailure === undefined ? {} : { execution_failure: error.executionFailure }
			};
			if (error._tag === "ProcessCaptureError") {
				const details = {
					...error.userCategory === "cancelled" ? {
						operation: "process_capture",
						cleanup: "complete"
					} : {},
					...error.cleanupReport === undefined ? {} : { cleanup_report: jsonValueSchema.parse(error.cleanupReport) },
					...error.executionFailure === undefined ? {} : { execution_failure: error.executionFailure }
				};
				return Object.keys(details).length === 0 ? undefined : details;
			}
			if (error instanceof ConfigurationError && error.settings.length > 0) return { settings: error.settings.map((issue) => ({
				setting: issue.setting,
				constraint: issue.constraint,
				...issue.update_mode === undefined ? {} : { update_mode: issue.update_mode },
				...issue.pending_restart === undefined ? {} : { pending_restart: issue.pending_restart }
			})) };
			if (error instanceof BinaryTargetError) return {
				path: error.path,
				reason: error.reason,
				...error.constraint === undefined ? {} : { constraint: error.constraint },
				...error.infoPlist === undefined ? {} : { info_plist: error.infoPlist },
				...error.probedPaths === undefined ? {} : { probed_paths: [...error.probedPaths] },
				...error.systemCode === undefined ? {} : {
					system_code: error.systemCode,
					boundary: "filesystem-read"
				}
			};
			return undefined;
		};
	})))();
}

//#endregion
export { zstandardFrameAllowanceCause as $, wasmInterfaceByteBudgetSchema as $t, ARTIFACT_INTEGRITY_CHECKS as A, analysisParameterLimitSchema as At, artifactIntegrityDetails as B, MAX_WASM_ARTIFACT_PATHS as Bt, browserCleanupObservation as C, isQualifiedCallerPath as Cn, parseAsarListingAdmission as Ct, init_appleBundleTypes as D, init_asarHeaderAdmission as Dt, OPENABLE_APPLE_BUNDLE_TYPES_TEXT as E, asarMaxHeaderBytesSchema as Et, cleanupRetryRemediation as F, analysisSettingLimit as Ft, init_artifactIntegrity as G, init_wasmArtifact as Gt, artifactIntegrityPairOf as H, WABT_VERSION as Ht, init_analysisErrorRecovery as I, analysisSettingValueSchema as It, safeParseUtf8Json as J, wasmArtifactSchema as Jt, init_safeJson as K, inspectWasmArtifactInputSchema as Kt, artifactContainerIntegrityDetails as L, init_analysisSettingDefinitions as Lt, init_artifactOperationError as M, analysisSettingDefinition as Mt, analysisCleanupRetrySchema as N, analysisSettingIdSchema as Nt, isUnopenedAppleBundleExtension as O, parseAsarHeaderAdmission as Ot, analysisErrorRecoverySchema as P, analysisSettingIds as Pt, projectZstandardFrameAllowance as Q, init_wasmInterface as Qt, artifactDfuCrc32PairSchema as R, selectedAnalysisSetting as Rt, BrowserObservationError as S, init_callerPath as Sn, init_asarListingAdmission as St, APPLE_BUNDLE_EXTENSION as T, init_HostPlatform as Tn, DEFAULT_ASAR_HEADER_ADMISSION as Tt, artifactMd5PairSchema as U, WASM_RESOURCE_DEFAULTS as Ut, artifactIntegrityPair as V, WABT_SOURCE_COMMIT as Vt, artifactSha256PairSchema as W, WASM_RESOURCE_MAXIMUMS as Wt, currentZstandardFrameAllowance as X, DEFAULT_WASM_INTERFACE_REPRESENTATION_BYTES as Xt, ZstandardFrameAllowanceError as Y, wasmResourceLimits as Yt, init_zstandardFrameAllowance as Z, MAX_WASM_INTERFACE_REPRESENTATION_BYTES as Zt, init_analysisErrorClassification as _, init_javascriptSemanticPrecision as _n, currentAnalysisSettingOverride as _t, projectAnalysisErrorWithoutCapturedOutput as a, JAVASCRIPT_PARENT_HEAP_NODE_OPTIONS as an, parseLimitConstraint as at, ProviderSelectionError as b, absoluteCallerPath as bn, DEFAULT_ASAR_LISTING_ADMISSION as bt, MCP_TRANSPORT_EVIDENCE_DISCOVERY as c, JAVASCRIPT_STATIC_FACT_BYTES as cn, fixedProducerInputAllowance as ct, MCP_TRANSPORT_EVIDENCE_RECORDS as d, javaScriptAnalysisCoverageLimits as dn, init_windowsChangeTimeSettle as dt, wasmInterfaceEntryRepresentationBytes as en, zstandardMaxFramesSchema as et, analysisErrorRemediationAction as f, javaScriptAnalysisResourceControlsSchema as fn, resolveWindowsChangeTimeSettle as ft, catalogueRow as g, JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS as gn, currentAnalysisOperationSnapshot as gt, init_analysisErrorPresentation as h, javaScriptWorkerHeapRemediation as hn, windowsChangeTimeSettlePollMsSchema as ht, projectAnalysisError as i, JAVASCRIPT_PARENT_CHECKPOINT_HEAP_REMEDIATION as in, parseFailureAnalysisError as it, ArtifactOperationError as j, analysisResultLimitSchema as jt, openableAppleBundleExtension as k, ANALYSIS_SETTINGS as kt, MCP_TRANSPORT_EVIDENCE_EXPORT as l, JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM as ln, init_fixedAllowanceRemediation as lt, composedCallerGuidance as m, javaScriptWorkerHeapExhaustionRecovery as mn, windowsChangeTimeSettleMaxPollsSchema as mt, init_analysisErrorProjection as n, JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS as nn, init_parseFailureAnalysisError as nt, projectAnalysisErrorWithoutPartialObservation as o, JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION as on, FIXED_ALLOWANCE_KINDS as ot, analysisErrorUserMessage as p, javaScriptSemanticCeilingCoverage as pn, windowsChangeTimeDriftMsSchema as pt, safeParseJson as q, wasmArtifactMatchesSubject as qt, omitUnretainedEvidenceFromError as r, JAVASCRIPT_ANALYSIS_TRANSFER_RECORD_BYTES as rn, isParseLimit as rt, unretainedEvidenceCandidates as s, JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM as sn, fixedAllowanceOptions as st, childFailureDiagnostics as t, wasmInterfaceSchema as tn, zstandardWorkLimitFacts as tt, MCP_TRANSPORT_EVIDENCE_LINKS as u, init_javascriptAnalysisResourceControls as un, applyWindowsChangeTimeSnapshot as ut, init_doctorProviderIds as v, javaScriptSemanticPrecisionSchema as vn, init_analysisOperationSnapshot as vt, init_browserObservationError as w, HOST_PLATFORM as wn, ASAR_HEADER_ADMISSION_SETTING as wt, init_providerSelectionError as x, appendCallerPath as xn, asarMaxListingBytesSchema as xt, isDoctorProviderId as y, resolveJavaScriptSemanticPrecision as yn, runWithAnalysisOperationSnapshot as yt, artifactIntegrityClaimSchema as z, DEFAULT_WASM_COMMAND_TIMEOUT_MS as zt };