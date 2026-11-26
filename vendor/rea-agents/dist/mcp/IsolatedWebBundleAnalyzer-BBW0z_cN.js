import { n as __exportAll, t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { At as analysisParameterLimitSchema, J as safeParseUtf8Json, K as init_safeJson, Lt as init_analysisSettingDefinitions, _n as init_javascriptSemanticPrecision, cn as JAVASCRIPT_STATIC_FACT_BYTES, f as analysisErrorRemediationAction, h as init_analysisErrorPresentation, jt as analysisResultLimitSchema, lt as init_fixedAllowanceRemediation, st as fixedAllowanceOptions, un as init_javascriptAnalysisResourceControls, vn as javaScriptSemanticPrecisionSchema } from "./analysisErrorProjection-B0_t_nHz.js";
import { n as javaScriptRuntime, t as init_runtimeVersion } from "./runtimeVersion-szp03aif.js";
import { i as init_analysisErrorBase, t as AnalysisError } from "./analysisErrorBase-C0hMa0_b.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { o as jsonValueSchema, r as init_jsonValue } from "./jsonValue-BIEmjG1z.js";
import { R as digestSchema, z as init_digests } from "./canonicalDigest-DUQN3Yyz.js";
import { _ as init_analysisErrorCore, a as AnalysisCapabilityUnavailableError, h as carriedReason, i as AnalysisCancelledError, l as AnalysisResourceConstraintError, m as cancelledBy, p as OwnerCancellation, s as AnalysisOutputError, u as AnalysisTimeoutError } from "./analysisErrorCore-CrdY4k0A.js";
import { a as invariantViolation, i as init_internalInvariant } from "./errorMessage-rfGn5D1_.js";
import { n as init_budget, t as Budget } from "./budget-CGAFFXhi.js";
import { a as javaScriptMemberMutationAllowanceField, c as javaScriptRefusedPhaseSchema, i as init_javascriptSemanticWorkAllowance, l as reportsJavaScriptMemberMutationRefusal, o as javaScriptMemberMutationAllowanceSchema, s as javaScriptMemberMutationRefusal, t as DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE } from "./javascriptSemanticWorkAllowance-DlKvoXR4.js";
import { i as init_jsonSerialization, o as jsonParts, t as bufferedJsonParts } from "./jsonSerialization-DvIEYSSO.js";
import { _a as init_WorkerFrameSignal, aa as processWorkerCleanup, ea as init_JavaScriptWorkerMemoryLimit, ga as WorkerFrameSignal, ia as init_OwnedWorkerRuntime, na as OwnedWorkerRuntime, ra as WorkerCleanupRegistry, ta as javaScriptWorkerMemoryLimitBytes } from "./createServer-Brv7NMx6.js";
import { a as init_providerCleanupError, i as ProviderCleanupError } from "./SignalAbort-CPFWtyzs.js";
import { Br as analysisErrorWithCleanupDependencies, Ct as init_readStableArtifact, Dn as artifactFileCancellationCause, En as ArtifactFileCleanupFailure, Gn as ArtifactReaderFailure, Hn as AnalysisCleanupLeaseGroup, In as init_ArtifactFileOperation, On as artifactFileCompletion, Pn as assertArtifactReadActive, Rn as withArtifactFileHandle, Un as init_AnalysisCleanupLease, Vn as AnalysisCleanupLease, Wr as init_analysisErrorCleanup, Xn as init_ArtifactReader, dn as ArtifactResourceScope, fn as init_ArtifactResourceScope, kn as artifactFilePrimaryFacts, t as init_resources, wt as readStableArtifact, xt as completedStableArtifact } from "./resources-C5FMDwcC.js";
import { n as init_appendAll, t as appendAll } from "./appendAll-CZwRQEG5.js";
import { B as init_ProcessOwnershipObservation, E as spawnOwnedProviderProcess, G as prepareProcessOwnershipInspection, Gt as RuntimeControlUnavailableError, Jt as analysisErrorWithCancellation, Kt as init_runtimeControlUnavailableError, P as runtimeExhaustionReport, T as init_ProviderProcess, Yt as init_analysisErrorCancellation, i as processInspectionFailure, j as init_RuntimeExhaustion, n as init_OwnedCommandCleanup, qt as runtimeControlCapabilityError, r as processInspectionCancellationError, s as retainProcessInspectionCleanup } from "./OwnedCommandCleanup-pq-3btab.js";
import { n as init_ProviderDeadline, t as ProviderStartupDeadline } from "./ProviderDeadline-DNC6uvib.js";
import { i as webPageInspectionSchema, r as init_browserObservationSchemas } from "./browserObservationSchemas-C2xdVg3B.js";
import { A as javaScriptRouteSourceFactsSchema, O as init_javascriptRouteFacts, _ as webBundleScriptTimeoutRecovery, a as MAX_WEB_BUNDLE_HEAP_MB, b as buildJavaScriptRouteInventorySteps, d as webBundleFixedByteBudget, f as webBundleHeapExhaustedReason, g as webBundleResultAdmissionFailure, h as webBundleMemoryExhaustion, i as DEFAULT_WEB_BUNDLE_TOTAL_TIMEOUT_MS, l as webBundleAnalysisSchema, m as webBundleHeapLimit, n as DEFAULT_WEB_BUNDLE_HEAP_MB, p as webBundleHeapExhaustedRemediation, r as DEFAULT_WEB_BUNDLE_SCRIPT_TIMEOUT_MS, s as init_webBundleAnalysis, u as webBundleCallSiteSchema, v as webBundleTotalTimeoutRecovery, x as init_javascriptRouteInventory } from "./webBundleAnalysis-DYfI7qGU.js";
import { _ as init_browserObservation, l as webTextArtifactSchema, m as browserOriginSchema, s as init_webContentArtifact } from "./cdpObservationSchemas-BCeuGdtt.js";
import { a as init_javascriptSemanticCoverage, i as RETURNED_REFERENCE_WIDENING_LIMITATION, r as init_Utf8NdjsonLineBuffer, t as Utf8NdjsonLineBuffer, v as completeSemanticSteps, y as init_javascriptSemanticTraversal } from "./Utf8NdjsonLineBuffer-Cadku5SP.js";
import { n as init_webRuntime, t as WEB_RUNTIME_LIMITS } from "./webRuntime-CkS0qD76.js";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { createHash, randomUUID } from "node:crypto";
import { open, rm } from "node:fs/promises";
import { getHeapStatistics } from "node:v8";

//#region dist/domain/webBundleAnalyzerState.js
var createWebBundleAnalysisAccumulator, isIncludedScript;
function init_webBundleAnalyzerState() {
	return (init_webBundleAnalyzerState = __esmMin((() => {
		createWebBundleAnalysisAccumulator = () => ({
			edges: [],
			routes: [],
			endpoints: [],
			unresolvedEndpoints: [],
			webMcp: [],
			inferences: [],
			seen: new Set(),
			visitedNodes: 0,
			parsedScripts: 0,
			failedScripts: [],
			recoveredScripts: [],
			widenedScripts: []
		});
		isIncludedScript = (script) => script.source.included;
	})))();
}

//#endregion
//#region dist/domain/webBundleScriptAnalysis.js
var observationsSchema, refusedScriptFactsSchema, semanticLimitSchema, webBundleScriptAnalysisSchema, recordedLimit, unavailableWebScriptRecovery;
function init_webBundleScriptAnalysis() {
	return (init_webBundleScriptAnalysis = __esmMin((() => {
		init_webBundleAnalysis();
		init_analysisSettingDefinitions();
		init_javascriptRouteFacts();
		init_javascriptSemanticWorkAllowance();
		init_analysisErrorCore();
		init_analysisErrorPresentation();
		observationsSchema = z.strictObject({
			edges: webBundleAnalysisSchema.shape.observations.shape.chunks.shape.edges,
			routes: webBundleAnalysisSchema.shape.observations.shape.routes,
			endpoints: webBundleAnalysisSchema.shape.observations.shape.endpoints,
			webmcp_declarations: webBundleAnalysisSchema.shape.observations.shape.webmcp_declarations,
			/** Browser requests whose URL argument could not be resolved statically. */
			unresolved_endpoints: z.array(webBundleCallSiteSchema)
		});
		refusedScriptFactsSchema = z.strictObject({
			refused_phase: javaScriptRefusedPhaseSchema,
			parse_status: z.enum(["parsed", "recovered"]),
			inferences: webBundleAnalysisSchema.shape.inferences
		});
		semanticLimitSchema = z.strictObject({
			reason: z.string(),
			limit: analysisParameterLimitSchema
		});
		webBundleScriptAnalysisSchema = z.discriminatedUnion("status", [z.strictObject({
			status: z.literal("analyzed"),
			script_key: z.string(),
			parse_status: z.enum([
				"parsed",
				"recovered",
				"failed"
			]),
			visited_ast_nodes: z.number().int().min(0),
			widened_return_references: z.boolean(),
			semantic_limits: z.array(semanticLimitSchema).exactOptional(),
			route_facts: javaScriptRouteSourceFactsSchema.nullable().optional(),
			observations: observationsSchema,
			inferences: webBundleAnalysisSchema.shape.inferences
		}), z.strictObject({
			status: z.literal("unavailable"),
			script_key: z.string(),
			reason: z.enum([
				"worker_failure",
				"deadline",
				"resource_constraint",
				"cancelled",
				"not_started"
			]),
			detail: z.string().optional(),
			/** The setting or request parameter that bounded this script. */
			limit: analysisResultLimitSchema.exactOptional(),
			remediation: z.string().exactOptional(),
			/** Facts gathered before a work allowance refused a later phase. */
			partial: refusedScriptFactsSchema.exactOptional()
		})]).superRefine((result, context) => {
			const checkScriptKey = (scriptKey, path) => {
				if (scriptKey !== result.script_key) context.addIssue({
					code: "custom",
					path,
					message: "Per-script analysis evidence must name its owning script"
				});
			};
			const checkInferences = (inferences, path) => inferences.forEach((inference, inferenceIndex) => inference.basis.forEach((basis, basisIndex) => checkScriptKey(basis.script_key, [
				...path,
				inferenceIndex,
				"basis",
				basisIndex,
				"script_key"
			])));
			if (result.status === "unavailable") {
				if (result.partial === undefined) return;
				if (result.reason !== "resource_constraint") context.addIssue({
					code: "custom",
					path: ["partial"],
					message: "Only a refused script carries partial facts"
				});
				checkInferences(result.partial.inferences, ["partial", "inferences"]);
				return;
			}
			result.observations.edges.forEach((edge, index) => {
				checkScriptKey(edge.from_script_key, [
					"observations",
					"edges",
					index,
					"from_script_key"
				]);
				checkScriptKey(edge.location.script_key, [
					"observations",
					"edges",
					index,
					"location",
					"script_key"
				]);
			});
			for (const collection of [
				"routes",
				"endpoints",
				"unresolved_endpoints"
			]) result.observations[collection].forEach((finding, index) => checkScriptKey(finding.location.script_key, [
				"observations",
				collection,
				index,
				"location",
				"script_key"
			]));
			result.observations.webmcp_declarations.forEach((declaration, index) => checkScriptKey(declaration.location.script_key, [
				"observations",
				"webmcp_declarations",
				index,
				"location",
				"script_key"
			]));
			checkInferences(result.inferences, ["inferences"]);
			if (result.parse_status === "failed") {
				const hasFindings = result.semantic_limits !== undefined && result.semantic_limits.length > 0 || result.observations.edges.length > 0 || result.observations.routes.length > 0 || result.observations.endpoints.length > 0 || result.observations.unresolved_endpoints.length > 0 || result.observations.webmcp_declarations.length > 0 || result.inferences.length > 0;
				if (result.visited_ast_nodes !== 0 || result.widened_return_references || hasFindings) context.addIssue({
					code: "custom",
					path: ["parse_status"],
					message: "A failed script parse cannot carry visited nodes or derived findings"
				});
			}
		});
		recordedLimit = (limit) => limit === undefined ? undefined : "setting" in limit ? limit : limit.control_kind === "parameter" ? limit : undefined;
		unavailableWebScriptRecovery = (error) => {
			const limit = recordedLimit(error.limit);
			return {
				detail: error instanceof AnalysisResourceConstraintError && error.reportedLimits !== null ? `${error.userMessage ?? error.reason} Reported limits: ${JSON.stringify(error.reportedLimits)}` : error.userMessage ?? error.message,
				...limit === undefined ? {} : {
					limit,
					remediation: analysisErrorRemediationAction(error)
				}
			};
		};
	})))();
}

//#endregion
//#region dist/domain/webBundleAnalyzerResult.js
var buildCapturedWebBundleAnalysis, mergeScriptResults, buildCaptureObservation, sourceArtifact, chunkNode, buildUnknowns, captureBudgetOmission, groupUnavailableAnalyses, analysisUnavailableReason, captureBudgetReason, buildCompleteness, bundleLimitations;
function init_webBundleAnalyzerResult() {
	return (init_webBundleAnalyzerResult = __esmMin((() => {
		init_javascriptRouteInventory();
		init_javascriptSemanticTraversal();
		init_javascriptSemanticCoverage();
		init_browserObservation();
		init_webBundleAnalysis();
		init_webBundleAnalyzerState();
		init_webBundleScriptAnalysis();
		init_appendAll();
		buildCapturedWebBundleAnalysis = (inspection, sourceMaps, rawResults) => {
			const results = rawResults.map((result) => webBundleScriptAnalysisSchema.parse(result));
			const byKey = new Map();
			for (const result of results) {
				if (byKey.has(result.script_key)) throw new TypeError(`Duplicate script analysis result: ${result.script_key}`);
				byKey.set(result.script_key, result);
			}
			const sourceScripts = inspection.scripts.items.filter(isIncludedScript);
			const expectedKeys = new Set(sourceScripts.map(({ script_key }) => script_key));
			for (const key of byKey.keys()) if (!expectedKeys.has(key)) throw new TypeError(`Unexpected script analysis result: ${key}`);
			const orderedResults = sourceScripts.map((script) => byKey.get(script.script_key) ?? {
				status: "unavailable",
				script_key: script.script_key,
				reason: "worker_failure",
				detail: "No analysis result was returned for this captured script."
			});
			const unavailableAnalyses = orderedResults.filter((result) => result.status === "unavailable");
			const accumulator = mergeScriptResults(orderedResults);
			const semanticUnknowns = orderedResults.flatMap((result) => result.status !== "analyzed" || result.semantic_limits === undefined ? [] : result.semantic_limits.map(({ reason, limit }) => ({
				dimension: "javascript_analysis",
				reason,
				limit,
				remediation: `Increase ${limit.parameter} on the next analysis call.`,
				affected_script_keys: [result.script_key]
			})));
			const attemptedScripts = orderedResults.filter((result) => !(result.status === "unavailable" && result.reason === "not_started")).length;
			const unavailable = inspection.scripts.items.filter((script) => !script.source.included).map(({ script_key }) => script_key);
			const unavailableSourceReasons = [...new Set(inspection.scripts.items.flatMap((script) => script.source.included ? [] : [script.source.reason]))].sort();
			const omittedScripts = captureBudgetOmission(inspection, "scripts");
			const omittedSourceScripts = captureBudgetOmission(inspection, "script_sources");
			const omittedSourceMaps = sourceMaps.status === "not_requested" || sourceMaps.excluded !== undefined ? undefined : captureBudgetOmission(inspection, "source_maps");
			const sourceMapIncomplete = sourceMaps.status === "partial" || sourceMaps.status === "unavailable";
			const partial = semanticUnknowns.length > 0 || accumulator.failedScripts.length > 0 || accumulator.recoveredScripts.length > 0 || accumulator.widenedScripts.length > 0 || unavailable.length > 0 || unavailableAnalyses.length > 0 || sourceMapIncomplete || omittedScripts !== undefined || omittedSourceScripts !== undefined || omittedSourceMaps !== undefined;
			return webBundleAnalysisSchema.parse({
				route_inventory: completeSemanticSteps(buildJavaScriptRouteInventorySteps(inspection.scripts.items.map((script) => {
					const result = byKey.get(script.script_key);
					const analyzed = result?.status === "analyzed" ? result : undefined;
					return {
						key: script.script_key,
						path: null,
						url: script.url,
						container_sha256: null,
						sha256: script.source.included ? script.source.artifact.sha256 : null,
						status: analyzed === undefined || analyzed.parse_status === "failed" ? "unavailable" : analyzed.parse_status === "recovered" ? "partial" : "complete",
						reason: !script.source.included ? script.source.reason : result?.status === "unavailable" ? result.reason : analyzed === undefined ? "No route syntax result was returned" : analyzed.parse_status === "failed" ? "Script parsing failed" : analyzed.parse_status === "recovered" ? "Script parsing recovered from errors" : null,
						facts: analyzed?.route_facts ?? null
					};
				}), undefined, [...omittedScripts === undefined ? [] : [{
					unit: "script-records",
					count: omittedScripts,
					reason: captureBudgetReason("script records", omittedScripts)
				}], ...omittedSourceScripts === undefined ? [] : [{
					unit: "script-sources",
					count: omittedSourceScripts,
					reason: captureBudgetReason("script source artifacts", omittedSourceScripts)
				}]])),
				capture: buildCaptureObservation(inspection, sourceScripts, attemptedScripts),
				observations: {
					chunks: {
						nodes: sourceScripts.map(chunkNode),
						edges: accumulator.edges
					},
					routes: accumulator.routes,
					endpoints: accumulator.endpoints,
					webmcp_declarations: accumulator.webMcp,
					source_maps: sourceMaps
				},
				inferences: accumulator.inferences,
				unknowns: buildUnknowns({
					semanticUnknowns,
					unavailable,
					unavailableSourceReasons,
					failedScripts: accumulator.failedScripts,
					recoveredScripts: accumulator.recoveredScripts,
					widenedScripts: accumulator.widenedScripts,
					unresolvedEndpoints: accumulator.unresolvedEndpoints,
					unavailableAnalyses,
					sourceMaps,
					omittedScripts,
					omittedSourceScripts,
					omittedSourceMaps
				}),
				completeness: buildCompleteness({
					partial,
					parsedScripts: accumulator.parsedScripts,
					parseFailures: accumulator.failedScripts.length,
					visitedNodes: accumulator.visitedNodes
				}),
				limitations: bundleLimitations()
			});
		};
		mergeScriptResults = (results) => {
			const accumulator = createWebBundleAnalysisAccumulator();
			for (const result of results) {
				if (result.status === "unavailable") {
					if (result.partial === undefined) continue;
					accumulator.parsedScripts += 1;
					if (result.partial.parse_status === "recovered") accumulator.recoveredScripts.push(result.script_key);
					appendAll(accumulator.inferences, result.partial.inferences);
					continue;
				}
				accumulator.visitedNodes += result.visited_ast_nodes;
				if (result.parse_status === "failed") {
					accumulator.failedScripts.push(result.script_key);
					continue;
				}
				accumulator.parsedScripts += 1;
				if (result.parse_status === "recovered") accumulator.recoveredScripts.push(result.script_key);
				if (result.widened_return_references) accumulator.widenedScripts.push(result.script_key);
				appendAll(accumulator.edges, result.observations.edges);
				appendAll(accumulator.routes, result.observations.routes);
				appendAll(accumulator.endpoints, result.observations.endpoints);
				appendAll(accumulator.unresolvedEndpoints, result.observations.unresolved_endpoints);
				appendAll(accumulator.webMcp, result.observations.webmcp_declarations);
				appendAll(accumulator.inferences, result.inferences);
			}
			return accumulator;
		};
		buildCaptureObservation = (inspection, sourceScripts, attemptedScripts) => {
			const targetOrigin = browserOriginSchema.safeParse(inspection.target.origin);
			return {
				target_url: inspection.target.url,
				target_origin: targetOrigin.success ? targetOrigin.data : null,
				scripts_observed: inspection.scripts.total,
				scripts_analyzed: attemptedScripts,
				source_artifacts: sourceScripts.map(sourceArtifact)
			};
		};
		sourceArtifact = (script) => {
			if (!script.source.included) throw new TypeError("Filtered source changed");
			const { text: _text, ...artifact } = script.source.artifact;
			return {
				...artifact,
				text_available: true
			};
		};
		chunkNode = (script) => {
			if (!script.source.included) throw new TypeError("Filtered source changed");
			return {
				script_key: script.script_key,
				url: script.url,
				artifact_sha256: script.source.artifact.sha256,
				bytes: script.source.artifact.bytes
			};
		};
		buildUnknowns = (input) => [
			...input.semanticUnknowns,
			...input.omittedScripts === undefined ? [] : [{
				dimension: "script_inventory",
				reason: captureBudgetReason("script records", input.omittedScripts),
				affected_script_keys: []
			}],
			...input.omittedSourceScripts === undefined ? [] : [{
				dimension: "script_source",
				reason: captureBudgetReason("script source artifacts", input.omittedSourceScripts),
				affected_script_keys: []
			}],
			...input.unavailable.length === 0 ? [] : [{
				dimension: "script_source",
				reason: input.unavailableSourceReasons.length === 0 ? "Source artifact was not captured" : `Source artifacts were not captured: ${input.unavailableSourceReasons.join("; ")}`,
				affected_script_keys: input.unavailable
			}],
			...input.failedScripts.length === 0 ? [] : [{
				dimension: "javascript_ast",
				reason: "One or more source artifacts could not be parsed",
				affected_script_keys: [...input.failedScripts]
			}],
			...input.unavailableAnalyses.length === 0 ? [] : groupUnavailableAnalyses(input.unavailableAnalyses).map(({ reason, detail, limit, remediation, refusedPhase, affectedScriptKeys }) => ({
				dimension: "javascript_analysis",
				reason: analysisUnavailableReason(reason, detail),
				affected_script_keys: affectedScriptKeys,
				...limit === undefined ? {} : { limit },
				...remediation === undefined ? {} : { remediation },
				...refusedPhase === undefined ? {} : { refused_phase: refusedPhase }
			})),
			...input.unresolvedEndpoints.length === 0 ? [] : [{
				dimension: "endpoints",
				reason: "A browser request's endpoint could not be resolved from its URL argument.",
				affected_script_keys: [...new Set(input.unresolvedEndpoints.map(({ location }) => location.script_key))],
				call_sites: [...input.unresolvedEndpoints]
			}],
			...input.widenedScripts.length === 0 ? [] : [{
				dimension: "javascript_ast",
				reason: RETURNED_REFERENCE_WIDENING_LIMITATION,
				affected_script_keys: [...input.widenedScripts]
			}],
			...input.recoveredScripts.length === 0 ? [] : [{
				dimension: "javascript_ast",
				reason: "The parser recovered from errors in one or more source artifacts; findings may be incomplete",
				affected_script_keys: [...input.recoveredScripts]
			}],
			...input.omittedSourceMaps === undefined ? [] : [{
				dimension: "source_maps",
				reason: captureBudgetReason("source-map declarations", input.omittedSourceMaps),
				affected_script_keys: []
			}],
			...input.sourceMaps.status === "not_requested" || input.sourceMaps.status === "included" ? [] : [{
				dimension: "source_maps",
				reason: input.sourceMaps.limitation ?? "One or more requested source maps were unavailable or incomplete",
				affected_script_keys: input.sourceMaps.items.filter(({ status }) => status !== "included").map(({ script_key }) => script_key).sort()
			}]
		];
		captureBudgetOmission = (inspection, section) => {
			const exclusions = inspection.completeness.excluded.filter((exclusion) => exclusion.section === section && exclusion.reason === "resource_budget_exhausted" && exclusion.count !== 0);
			if (exclusions.length === 0) return undefined;
			if (exclusions.some(({ count }) => count === null)) return null;
			return exclusions.reduce((sum, { count }) => sum + (count ?? 0), 0);
		};
		groupUnavailableAnalyses = (unavailable) => {
			const groups = new Map();
			for (const entry of unavailable) {
				const key = JSON.stringify([
					entry.reason,
					entry.detail ?? null,
					entry.limit ?? null,
					entry.remediation ?? null,
					entry.partial?.refused_phase ?? null
				]);
				const group = groups.get(key);
				if (group === undefined) groups.set(key, {
					entry,
					affectedScriptKeys: [entry.script_key]
				});
				else group.affectedScriptKeys.push(entry.script_key);
			}
			return [...groups.values()].map(({ entry, affectedScriptKeys }) => ({
				reason: entry.reason,
				detail: entry.detail,
				limit: entry.limit,
				remediation: entry.remediation,
				refusedPhase: entry.partial?.refused_phase,
				affectedScriptKeys
			}));
		};
		analysisUnavailableReason = (reason, detail) => `Analysis was unavailable for captured scripts (${reason}); findings from those scripts are unknown.${detail === undefined ? "" : ` Worker detail: ${JSON.stringify(detail)}`}`;
		captureBudgetReason = (label, count) => count === null ? `Capture omitted an unknown number of ${label} because its resource budget was exhausted.` : `Capture omitted ${String(count)} ${label} because its resource budget was exhausted.`;
		buildCompleteness = (input) => ({
			status: input.partial ? "partial" : "complete",
			parsed_scripts: input.parsedScripts,
			parse_failures: input.parseFailures,
			visited_ast_nodes: input.visitedNodes
		});
		bundleLimitations = () => [
			"Static bundle findings are observations or bounded inferences; REA does not execute captured JavaScript.",
			"Bare string arguments of unbound HTTP-method-named calls are low-confidence endpoint candidates; form, translation, storage and other APIs can use the same syntax. URL-shaped findings still do not prove network execution.",
			"Endpoint candidates are deduplicated by script, value and detector; basis retains only the first matching source coordinate. They are not a complete call-site inventory or a runtime occurrence count. completeness.status=\"complete\" describes examination of captured source, not a call-site census.",
			"String-built routes and endpoints, encrypted configuration, and server-side behavior may remain unknown.",
			"Page-declared WebMCP metadata is untrusted and is never registered or invoked as an REA tool."
		];
	})))();
}

//#endregion
//#region dist/browser/WebBundleAnalysisWorkerProtocol.js
var WEB_BUNDLE_WORKER_LIMITS, includedSourceSchema, browserScriptSchema, includedWebScriptSchema, webBundleWorkerRequestSchema, identity, webBundleWorkerMessageSchema;
function init_WebBundleAnalysisWorkerProtocol() {
	return (init_WebBundleAnalysisWorkerProtocol = __esmMin((() => {
		init_javascriptSemanticWorkAllowance();
		init_javascriptSemanticPrecision();
		init_javascriptAnalysisResourceControls();
		init_digests();
		init_jsonValue();
		init_webRuntime();
		init_browserObservationSchemas();
		init_webContentArtifact();
		init_webBundleAnalysis();
		WEB_BUNDLE_WORKER_LIMITS = {
			heapMb: DEFAULT_WEB_BUNDLE_HEAP_MB,
			scriptTimeoutMs: DEFAULT_WEB_BUNDLE_SCRIPT_TIMEOUT_MS,
			totalTimeoutMs: DEFAULT_WEB_BUNDLE_TOTAL_TIMEOUT_MS,
			protocolBytes: 64 * 1024,
			sourceBytes: 8 * WEB_RUNTIME_LIMITS.sourceBytes,
			resultBytes: JAVASCRIPT_STATIC_FACT_BYTES
		};
		includedSourceSchema = z.strictObject({
			included: z.literal(true),
			artifact: webTextArtifactSchema.strict()
		});
		browserScriptSchema = webPageInspectionSchema.shape.scripts.shape.items.element;
		includedWebScriptSchema = browserScriptSchema.extend({ source: includedSourceSchema }).strict();
		webBundleWorkerRequestSchema = z.strictObject({
			kind: z.literal("analyze"),
			semantic_precision: javaScriptSemanticPrecisionSchema.exactOptional(),
			member_mutation_allowance: javaScriptMemberMutationAllowanceSchema,
			id: z.uuid(),
			source: z.strictObject({
				bytes: z.number().int().min(0).max(WEB_BUNDLE_WORKER_LIMITS.sourceBytes),
				sha256: digestSchema
			}),
			result_budget_bytes: z.number().int().min(0).max(WEB_BUNDLE_WORKER_LIMITS.resultBytes)
		});
		identity = { id: z.uuid() };
		webBundleWorkerMessageSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("ready"),
				heap_limit_bytes: z.number().int().positive().nullable()
			}),
			z.strictObject({
				kind: z.literal("phase"),
				...identity,
				phase: z.literal("analyze")
			}),
			z.strictObject({
				kind: z.literal("complete"),
				...identity,
				result: z.strictObject({
					bytes: z.number().int().nonnegative(),
					sha256: digestSchema
				})
			}),
			z.strictObject({
				kind: z.literal("failure"),
				...identity,
				reason: z.enum([
					"input",
					"resource",
					"output",
					"io"
				]),
				/** Limits a typed resource refusal reported, such as a fixed work allowance. */
				limits: z.record(z.string(), jsonValueSchema).exactOptional(),
				message: z.string()
			})
		]);
	})))();
}

//#endregion
//#region dist/browser/WebBundleAnalysisWorker.js
var OPERATION, webBundleResourceFailure, PROVIDER, scriptTimeout, MIB, RESULT_EXPANSION, WebBundleAnalysisWorker, WebBundleWorkerCleanup, processWebBundleCleanup;
function init_WebBundleAnalysisWorker() {
	return (init_WebBundleAnalysisWorker = __esmMin((() => {
		init_RuntimeExhaustion();
		init_budget();
		init_fixedAllowanceRemediation();
		init_internalInvariant();
		init_javascriptSemanticWorkAllowance();
		init_OwnedCommandCleanup();
		init_analysisErrorCancellation();
		init_WorkerFrameSignal();
		init_Utf8NdjsonLineBuffer();
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_jsonSerialization();
		init_safeJson();
		init_runtimeVersion();
		init_result();
		init_webBundleScriptAnalysis();
		init_OwnedWorkerRuntime();
		init_runtimeControlUnavailableError();
		init_ProviderProcess();
		init_ProviderDeadline();
		init_ProcessOwnershipObservation();
		init_JavaScriptWorkerMemoryLimit();
		init_webBundleAnalysis();
		init_WebBundleAnalysisWorkerProtocol();
		OPERATION = "analyze_web_bundle";
		webBundleResourceFailure = (frame, job, capturedOutput) => {
			const limits = {
				...frame.limits,
				result_budget_bytes: job.resultBudgetBytes
			};
			if (reportsJavaScriptMemberMutationRefusal(frame.limits)) return javaScriptMemberMutationRefusal(OPERATION, job.memberMutationAllowance, limits, capturedOutput);
			return new AnalysisResourceConstraintError(OPERATION, "memory", frame.message, limits, {
				...capturedOutput === undefined ? {} : { capturedOutput },
				measuredExhaustion: true
			});
		};
		PROVIDER = "web-bundle-static-analysis";
		scriptTimeout = (timeoutMs, cause) => new AnalysisTimeoutError(OPERATION, timeoutMs, {
			...cause === undefined ? {} : { cause },
			...webBundleScriptTimeoutRecovery(timeoutMs)
		});
		MIB = 1024 * 1024;
		RESULT_EXPANSION = 16;
		WebBundleAnalysisWorker = class {
			heapMb;
			#runtime;
			#files = new ArtifactResourceScope();
			#cleanup;
			#lines = new Utf8NdjsonLineBuffer(() => WEB_BUNDLE_WORKER_LIMITS.protocolBytes);
			#frames = [];
			#protocolFailure;
			#observedFailure;
			#activeDeadline;
			#activeJob;
			#activeTerminalResponseObserved = false;
			#frameSignal = new WorkerFrameSignal();
			#retainedResult = new Budget(WEB_BUNDLE_WORKER_LIMITS.resultBytes);
			#ready = false;
			#stdout = (chunk) => {
				if (this.#activeDeadline?.interruption !== undefined) return;
				if (this.#protocolFailure !== undefined) return;
				try {
					if (Buffer.byteLength(chunk) + this.#lines.pendingBytes > WEB_BUNDLE_WORKER_LIMITS.protocolBytes) throw new RangeError(webBundleFixedByteBudget(WEB_BUNDLE_WORKER_LIMITS.protocolBytes, "control-frame budget"));
					for (const line of this.#lines.pushRaw(typeof chunk === "string" ? Buffer.from(chunk) : chunk)) {
						if (!line.ok) throw line.error;
						if (this.#frames.length >= 16) throw new RangeError("Web analyzer exceeded its control-frame queue");
						const frame = webBundleWorkerMessageSchema.parse(JSON.parse(line.value));
						this.#frames.push(frame);
						this.#observeFrame(frame);
					}
					this.#frameSignal.wake("frame");
				} catch (cause) {
					this.#lines.reset();
					this.#protocolFailure = cause;
					this.#latchFailure({
						kind: "protocol",
						cause
					});
					this.#frameSignal.wake("failure");
				}
			};
			constructor(heapMb = DEFAULT_WEB_BUNDLE_HEAP_MB, launcher = spawnOwnedProviderProcess, workerCleanup = processWebBundleCleanup) {
				this.heapMb = heapMb;
				if (!Number.isSafeInteger(heapMb) || heapMb < 128 || heapMb > 16384) throw new RangeError(`Web analyzer heap must be an integer from ${String(128)} through ${String(MAX_WEB_BUNDLE_HEAP_MB)} MiB (max_heap_mb)`);
				this.#runtime = new OwnedWorkerRuntime({
					rootPrefix: "rea-web-bundle-analysis-",
					launcher,
					cleanupRegistry: workerCleanup.runtimes,
					retryCleanup: () => this.close(),
					onInputFailure: (cause) => {
						if (this.#activeDeadline?.interruption !== undefined) return;
						this.#latchFailure({
							kind: "input",
							cause
						});
						this.#frameSignal.wake("failure");
					},
					supervisorOptions: {
						captureStdout: false,
						maxDiagnosticBytes: 256 * 1024,
						runtime: "v8",
						onDiagnostic: (event) => {
							if (this.#activeDeadline?.interruption !== undefined) return;
							if (event.type === "exit" && (event.code !== 0 || event.signal !== null)) {
								const memoryLimitReached = event.snapshot.memoryLimitReached === true;
								this.#latchFailure({
									kind: "exit",
									code: event.code,
									signal: event.signal,
									memoryLimitReached,
									heapExhaustion: memoryLimitReached || event.snapshot.runtimeExhaustion !== undefined,
									...event.snapshot.runtimeExhaustion === undefined ? {} : { exhaustion: event.snapshot.runtimeExhaustion }
								});
							} else if (event.type === "output-close") {
								if (this.#activeDeadline !== undefined && (this.#activeJob === undefined || !this.#activeTerminalResponseObserved)) this.#latchFailure({ kind: "incomplete-output" });
								this.#frameSignal.wake("failure");
							} else if (event.type === "output") {
								const failure = this.#observedFailure;
								if (failure?.kind !== "exit") return;
								const snapshot = this.#runtime.supervisor?.snapshot();
								const memoryLimitReached = snapshot?.memoryLimitReached === true;
								const reported = snapshot?.runtimeExhaustion;
								if (!memoryLimitReached && reported === undefined) return;
								this.#observedFailure = {
									...failure,
									heapExhaustion: true,
									memoryLimitReached: failure.memoryLimitReached || memoryLimitReached,
									...reported === undefined ? {} : { exhaustion: reported }
								};
							}
						}
					}
				});
				const owner = this;
				this.#cleanup = new AnalysisCleanupLease(() => this.#release(), { get cleanupResources() {
					return [...owner.#files.cleanupResources, ...owner.#runtime.cleanupResources ?? []];
				} });
			}
			static async retryPending() {
				await processWebBundleCleanup.retry();
			}
			async analyze(script, timeoutMs, signal, precision, memberMutationAllowance = DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE) {
				let deadline;
				const id = randomUUID();
				this.#observedFailure = undefined;
				this.#activeJob = undefined;
				this.#activeTerminalResponseObserved = false;
				let result;
				let ownershipInspectionFailure;
				let completed = null;
				let continuation;
				let resultDescriptor;
				let artifactFailure = false;
				const failed = (error) => err({
					error: signal?.aborted ? analysisErrorWithCancellation(error, cancelledBy(OPERATION, signal)) : error,
					completed,
					...continuation === undefined ? {} : { continuation }
				});
				try {
					if (signal?.aborted) throw cancelledBy(OPERATION, signal);
					const admitted = this.#admittedResultBudget();
					if (!admitted.ok) {
						continuation = "result_capacity_exhausted";
						throw admitted.error;
					}
					const resultBudget = admitted.bytes;
					try {
						await prepareProcessOwnershipInspection(signal);
					} catch (cause) {
						ownershipInspectionFailure = this.#inspectionFailure(cause);
						throw cause;
					}
					deadline = new ProviderStartupDeadline(timeoutMs, signal);
					this.#activeDeadline = deadline;
					try {
						await this.#start(deadline);
					} catch (cause) {
						if (processInspectionFailure(cause) !== undefined || this.#runtime.launchFailure !== undefined && Object.is(this.#runtime.launchFailure.cause, cause)) ownershipInspectionFailure = this.#inspectionFailure(cause, deadline);
						throw cause;
					}
					if (this.#frames.length > 0 || this.#lines.pendingBytes !== 0) throw new AnalysisOutputError(OPERATION, "Web analyzer emitted unsolicited control data");
					const root = this.#runtime.rootPath;
					const supervisor = this.#runtime.supervisor;
					if (root === undefined || supervisor === undefined) throw new TypeError("Web analyzer resources were not acquired");
					supervisor.resetOutput();
					const source = await this.#files.run(() => this.#writeSource(join(root, `${id}.source`), script, deadline.signal)).catch((cause) => {
						artifactFailure = true;
						throw cause;
					});
					const request = webBundleWorkerRequestSchema.parse({
						kind: "analyze",
						...precision === undefined ? {} : { semantic_precision: precision },
						member_mutation_allowance: javaScriptMemberMutationAllowanceField(memberMutationAllowance),
						id,
						source,
						result_budget_bytes: resultBudget
					});
					const frame = `${JSON.stringify(request)}\n`;
					const stdin = supervisor.launch.process.stdin;
					if (stdin === null || stdin === undefined) throw new TypeError("Web analyzer request stream is unavailable");
					const job = {
						id,
						resultBudgetBytes: resultBudget,
						memberMutationAllowance
					};
					this.#activeJob = job;
					this.#activeTerminalResponseObserved = false;
					await new Promise((resolve, reject) => stdin.write(frame, (error) => error == null ? resolve() : reject(error)));
					let response;
					do {
						response = await this.#next(deadline);
						if (response.kind === "ready" || response.id !== id) throw new AnalysisOutputError(OPERATION, "Web analyzer response names another request");
					} while (response.kind === "phase");
					if (response.kind === "failure") {
						if (response.reason === "resource") throw webBundleResourceFailure(response, job);
						throw new AnalysisOutputError(OPERATION, `Web script analysis failed (${response.reason}): ${response.message}`);
					}
					if (response.kind !== "complete") throw new AnalysisOutputError(OPERATION, "Web analyzer did not complete a result");
					const descriptor = response.result;
					resultDescriptor = descriptor;
					if (descriptor.bytes > resultBudget || descriptor.bytes * RESULT_EXPANSION + 64 * MIB > getHeapStatistics().heap_size_limit - process.memoryUsage().heapUsed) throw new AnalysisResourceConstraintError(OPERATION, "memory", "Completed script facts exceed the host's remaining reserved result capacity", { result_budget_bytes: resultBudget }, { measuredExhaustion: true });
					const stored = await this.#files.run(() => readStableArtifact(join(root, `${id}.result`), descriptor.bytes, deadline.signal, undefined, this.#files)).catch((cause) => {
						artifactFailure = true;
						throw cause;
					});
					const facts = this.#validateCompletedResult(stored, descriptor, script, memberMutationAllowance);
					this.#retainedResult.charge(descriptor.bytes, () => invariantViolation("Admitted web analysis result no longer fits"));
					completed = facts;
					result = ok(facts);
				} catch (cause) {
					const completion = artifactFileCompletion(cause);
					const snapshot = completedStableArtifact(cause);
					if (snapshot !== undefined && resultDescriptor !== undefined) {
						try {
							const validated = this.#validateCompletedResult(snapshot, resultDescriptor, script, memberMutationAllowance);
							if (this.#retainedResult.tryCharge(resultDescriptor.bytes)) completed = validated;
						} catch {}
					}
					const artifactPrimary = artifactFailure ? artifactFilePrimaryFacts(cause) : undefined;
					const cancellationCause = completion?.cancellation ?? (artifactPrimary?.origin === "owned-or-classified" && artifactPrimary.cause instanceof ArtifactReaderFailure && artifactPrimary.cause.reason === "cancelled" ? { reason: artifactFileCancellationCause(artifactPrimary.cause) } : undefined);
					const interruptionApplies = !artifactFailure || cancellationCause !== undefined;
					const interrupted = interruptionApplies && deadline?.interruption === "timeout" ? scriptTimeout(timeoutMs, cause) : cancellationCause !== undefined ? cancelledBy(OPERATION, carriedReason(cancellationCause.reason)) : interruptionApplies && (deadline?.interruption === "cancelled" || signal?.aborted) ? cancelledBy(OPERATION, carriedReason(signal?.aborted ? signal.reason : deadline?.signal.reason)) : undefined;
					const observedFailure = this.#observedFailure === undefined ? ownershipInspectionFailure : this.#projectObservedFailure();
					if (observedFailure !== undefined && interrupted !== undefined) {
						if (interrupted instanceof AnalysisCancelledError) analysisErrorWithCancellation(observedFailure, interrupted);
						else observedFailure.retainSecondaryFailure(interrupted);
					}
					const primaryCause = artifactPrimary === undefined ? cause : artifactPrimary.cause;
					const primary = ownershipInspectionFailure !== undefined ? ownershipInspectionFailure : interrupted !== undefined && observedFailure !== undefined ? observedFailure : interrupted ?? (primaryCause instanceof RuntimeControlUnavailableError ? runtimeControlCapabilityError(PROVIDER, OPERATION, primaryCause) : primaryCause instanceof AnalysisError ? primaryCause : new AnalysisOutputError(OPERATION, "Owned web-script analysis failed", { cause: primaryCause }));
					const failure = cause instanceof ArtifactFileCleanupFailure ? this.#cleanupFailure(cause, completion === undefined ? primary : interrupted) : primary;
					result = err(failure);
					try {
						const stopped = await this.#runtime.stop();
						if (stopped.status === "incomplete") throw new Error(stopped.reason);
						this.#reset();
					} catch (cleanupCause) {
						result = err(this.#cleanupFailure(cleanupCause, failure));
					}
				} finally {
					this.#activeDeadline = undefined;
					deadline?.dispose();
					this.#activeJob = undefined;
					this.#activeTerminalResponseObserved = false;
				}
				if (!result.ok && result.error.cleanupIncomplete) return failed(result.error);
				if (this.#files.hasPending) return failed(this.#cleanupFailure(new Error("Web analyzer artifact cleanup is incomplete"), result.ok ? undefined : result.error));
				try {
					const root = this.#runtime.rootPath;
					if (root !== undefined) {
						await rm(join(root, `${id}.source`), { force: true });
						await rm(join(root, `${id}.result`), { force: true });
					}
				} catch (cause) {
					const previous = result.ok ? undefined : result.error;
					const primary = signal?.aborted ? analysisErrorWithCancellation(previous, cancelledBy(OPERATION, signal)) : previous;
					return failed(this.#cleanupFailure(cause, primary));
				}
				if (signal?.aborted) return failed(result.ok ? cancelledBy(OPERATION, signal) : result.error);
				return result.ok ? result : failed(result.error);
			}
			#admittedResultBudget() {
				const fixedRemaining = this.#retainedResult.remaining;
				const hostCapacity = Math.max(0, Math.floor((getHeapStatistics().heap_size_limit - process.memoryUsage().heapUsed - 64 * MIB) / RESULT_EXPANSION));
				const bytes = Math.min(fixedRemaining, hostCapacity);
				if (bytes > 0) return {
					ok: true,
					bytes
				};
				const failure = webBundleResultAdmissionFailure({
					fixedBudgetBytes: WEB_BUNDLE_WORKER_LIMITS.resultBytes,
					fixedRemainingBytes: fixedRemaining,
					hostCapacityBytes: hostCapacity
				});
				return {
					ok: false,
					error: new AnalysisResourceConstraintError(OPERATION, "memory", failure.reason, failure.reportedLimits, failure.kind === "host-capacity" ? { remediationAction: failure.remediationAction } : undefined)
				};
			}
			async #writeSource(path, script, signal) {
				const digest = createHash("sha256");
				let bytes = 0;
				const file = await open(path, "wx", 384);
				await withArtifactFileHandle(path, file, this.#files, signal, async (handle) => {
					for (const part of bufferedJsonParts(jsonParts(script))) {
						assertArtifactReadActive(signal);
						const chunk = Buffer.from(part, "utf8");
						if (chunk.length > WEB_BUNDLE_WORKER_LIMITS.sourceBytes - bytes) throw new AnalysisResourceConstraintError(OPERATION, "transport", webBundleFixedByteBudget(WEB_BUNDLE_WORKER_LIMITS.sourceBytes, "worker transfer budget"), { source_bytes: WEB_BUNDLE_WORKER_LIMITS.sourceBytes }, fixedAllowanceOptions("The web-bundle worker transfer allowance", "bytes", {
							limit: WEB_BUNDLE_WORKER_LIMITS.sourceBytes,
							unit: "bytes"
						}));
						await handle.writeFile(chunk);
						bytes += chunk.length;
						digest.update(chunk);
					}
				});
				return {
					bytes,
					sha256: digest.digest("hex")
				};
			}
			#inspectionFailure(cause, deadline) {
				const cancellation = processInspectionCancellationError(cause, OPERATION);
				const primary = cause instanceof AnalysisError ? cause : cancellation !== undefined ? deadline?.interruption === "timeout" ? scriptTimeout(deadline.timeoutMs, cause) : cancellation : cause instanceof RuntimeControlUnavailableError ? runtimeControlCapabilityError(PROVIDER, OPERATION, cause) : new AnalysisOutputError(OPERATION, "Process ownership inspection or worker startup failed", { cause });
				return retainProcessInspectionCleanup(cause, primary, this.#files, OPERATION);
			}
			async #start(deadline) {
				if (this.#ready && this.#runtime.supervisor !== undefined) return;
				const environment = {
					...process.env,
					UV_THREADPOOL_SIZE: "1"
				};
				delete environment.NODE_OPTIONS;
				const memoryLimitBytes = javaScriptWorkerMemoryLimitBytes(this.heapMb);
				await this.#runtime.start({
					command: process.execPath,
					arguments: [
						`--max-old-space-size=${String(this.heapMb)}`,
						"--max-semi-space-size=8",
						"--v8-pool-size=1",
						"--expose-gc",
						"--stack_size=2048",
						fileURLToPath(import.meta.resolve("#web-bundle-analysis-worker"))
					],
					runId: `rea-web-bundle-analysis-${randomUUID()}`,
					hostEnvironment: environment,
					stdin: "pipe",
					signal: deadline.signal,
					...memoryLimitBytes === null ? {} : { memoryLimitBytes }
				}, async () => {
					this.#runtime.onStdout(this.#stdout);
					const ready = await this.#next(deadline);
					if (ready.kind !== "ready" || ready.heap_limit_bytes === null === (javaScriptRuntime(process.versions).id === "node")) throw new AnalysisOutputError(OPERATION, "Web analyzer ready frame has an incompatible runtime heap limit");
					this.#ready = true;
				});
			}
			async #next(deadline) {
				for (;;) {
					if (deadline.interruption === "timeout") throw scriptTimeout(deadline.timeoutMs);
					if (deadline.interruption === "cancelled") throw cancelledBy(OPERATION, deadline.signal);
					const frame = this.#frames.shift();
					if (frame !== undefined) return frame;
					if (this.#runtime.inputFailure !== undefined) this.#latchFailure({
						kind: "input",
						cause: this.#runtime.inputFailure
					});
					if (this.#protocolFailure !== undefined) this.#latchFailure({
						kind: "protocol",
						cause: this.#protocolFailure
					});
					if (this.#observedFailure !== undefined && this.#observedFailure.kind !== "exit") throw this.#projectObservedFailure();
					const supervisor = this.#runtime.supervisor;
					const snapshot = supervisor?.snapshot();
					if (snapshot !== undefined && (snapshot.exitCode !== undefined || snapshot.signal !== undefined)) {
						if (supervisor === undefined) continue;
						const outcome = await this.#waitForFrameOrOutputClose(supervisor, deadline);
						if (outcome === "interrupted") {
							const completedFrame = this.#frames.shift();
							if (completedFrame !== undefined) return completedFrame;
							throw deadline.interruption === "timeout" ? scriptTimeout(deadline.timeoutMs) : cancelledBy(OPERATION, deadline.signal);
						}
						const completedFrame = this.#frames.shift();
						if (completedFrame !== undefined) return completedFrame;
						if (outcome === "failure") throw this.#projectObservedFailure();
						if (outcome === "frame") continue;
						if (this.#observedFailure !== undefined) throw this.#projectObservedFailure();
						throw new AnalysisOutputError(OPERATION, "Owned web analyzer exited before completing this script", { capturedOutput: this.#capturedOutput() });
					}
					await deadline.wait(10);
				}
			}
			#latchFailure(failure) {
				if (this.#observedFailure === undefined && this.#activeDeadline?.interruption === undefined) this.#observedFailure = failure;
			}
			#observeFrame(frame) {
				if (this.#activeDeadline?.interruption !== undefined || this.#activeJob === undefined || frame.kind === "ready" || frame.id !== this.#activeJob.id) return;
				if (frame.kind === "complete" || frame.kind === "failure") this.#activeTerminalResponseObserved = true;
				if (frame.kind !== "failure") return;
				this.#latchFailure({
					kind: "frame",
					frame,
					job: this.#activeJob
				});
			}
			#projectObservedFailure() {
				const failure = this.#observedFailure;
				if (failure === undefined) return new AnalysisOutputError(OPERATION, "Owned web analyzer exited before completing this script", { capturedOutput: this.#capturedOutput() });
				const capturedOutput = this.#capturedOutput();
				switch (failure.kind) {
					case "input": return new AnalysisOutputError(OPERATION, "Web analyzer request stream failed", {
						cause: failure.cause,
						capturedOutput
					});
					case "protocol": return new AnalysisOutputError(OPERATION, "Invalid web analyzer control frame", {
						cause: failure.cause,
						capturedOutput
					});
					case "incomplete-output": return new AnalysisOutputError(OPERATION, "Owned web analyzer output closed before completing this script", { capturedOutput });
					case "frame": return failure.frame.reason === "resource" ? webBundleResourceFailure(failure.frame, failure.job, capturedOutput) : new AnalysisOutputError(OPERATION, `Web script analysis failed (${failure.frame.reason}): ${failure.frame.message}`, { capturedOutput });
					case "exit":
						if (failure.heapExhaustion) {
							const exhaustion = webBundleMemoryExhaustion({
								runtime: javaScriptRuntime(process.versions).id,
								heapMb: this.heapMb,
								memoryLimitReached: failure.memoryLimitReached,
								processMemoryLimitBytes: javaScriptWorkerMemoryLimitBytes(this.heapMb)
							});
							return new AnalysisResourceConstraintError(OPERATION, "memory", webBundleHeapExhaustedReason(exhaustion), {
								worker_heap_limit_mb: this.heapMb,
								max_heap_mb: this.heapMb,
								worker_process_memory_limit_bytes: javaScriptWorkerMemoryLimitBytes(this.heapMb)
							}, {
								capturedOutput,
								limit: webBundleHeapLimit(exhaustion),
								...failure.exhaustion === undefined ? {} : { diagnostics: { runtime_exhaustion_report: runtimeExhaustionReport(failure.exhaustion) } },
								remediationAction: webBundleHeapExhaustedRemediation(exhaustion)
							});
						}
						return new AnalysisOutputError(OPERATION, "Owned web analyzer exited before completing this script", { capturedOutput });
				}
			}
			#capturedOutput() {
				const supervisor = this.#runtime.supervisor;
				const snapshot = supervisor?.snapshot();
				return {
					stdout: "",
					stderr: snapshot?.stderr.text ?? "",
					truncated: snapshot?.diagnosticTruncated === true || snapshot?.outputIncomplete === true || supervisor !== undefined && !supervisor.observedOutputClose(),
					exit_code: snapshot?.exitCode ?? null,
					signal: snapshot?.signal ?? null
				};
			}
			async #waitForFrameOrOutputClose(supervisor, deadline) {
				if (this.#frames.length > 0) return "frame";
				return this.#frameSignal.waitForOutputClose(supervisor, deadline.signal);
			}
			#validateCompletedResult(stored, descriptor, script, memberMutationAllowance) {
				if (stored.bytes.length !== descriptor.bytes || stored.sha256 !== descriptor.sha256) throw new AnalysisOutputError(OPERATION, "Web analyzer result differs from its descriptor");
				const parsed = safeParseUtf8Json(stored.bytes);
				if (!parsed.ok) throw parsed.cause;
				const facts = webBundleScriptAnalysisSchema.parse(parsed.value);
				if (facts.script_key !== script.script_key) throw new AnalysisOutputError(OPERATION, "Web analyzer facts name another script");
				if (facts.status === "analyzed") return facts;
				if (facts.partial === undefined) throw new AnalysisOutputError(OPERATION, "Web analyzer returned an unavailable result without partial facts");
				return {
					status: "unavailable",
					script_key: facts.script_key,
					reason: "resource_constraint",
					...unavailableWebScriptRecovery(javaScriptMemberMutationRefusal(OPERATION, memberMutationAllowance)),
					partial: facts.partial
				};
			}
			#reset() {
				this.#ready = false;
				this.#frames = [];
				this.#lines.reset();
				this.#protocolFailure = undefined;
				this.#observedFailure = undefined;
				this.#activeDeadline = undefined;
				this.#activeJob = undefined;
				this.#activeTerminalResponseObserved = false;
				this.#frameSignal.wake("failure");
			}
			#cleanupFailure(cause, primary) {
				this.#runtime.retainForCleanup();
				const cleanup = new ProviderCleanupError(PROVIDER, this.#cleanup.cleanupResources ?? [], { reason: "Owned web analyzer cleanup remains incomplete" }, {
					operation: OPERATION,
					cause
				});
				new AnalysisCleanupLeaseGroup(cleanup, [this.#cleanup]);
				return primary === undefined ? cleanup : analysisErrorWithCleanupDependencies(primary, cleanup, OPERATION);
			}
			async close() {
				try {
					await this.#cleanup.release();
				} catch (cause) {
					throw this.#cleanupFailure(cause);
				}
			}
			async #release() {
				try {
					const stopped = await this.#runtime.stop();
					if (stopped.status === "incomplete") throw new Error(stopped.reason);
					await this.#files.close();
					await this.#runtime.close();
					this.#reset();
				} catch (cause) {
					this.#runtime.retainForCleanup();
					throw cause;
				}
			}
		};
		WebBundleWorkerCleanup = class {
			runtimes;
			constructor(runtimes) {
				this.runtimes = runtimes ?? new WorkerCleanupRegistry();
			}
			async retry() {
				await this.runtimes.retry();
			}
		};
		processWebBundleCleanup = new WebBundleWorkerCleanup(processWorkerCleanup);
	})))();
}

//#endregion
//#region dist/browser/IsolatedWebBundleAnalyzer.js
var IsolatedWebBundleAnalyzer_exports = /* @__PURE__ */ __exportAll({ WebBundleAnalysisAdmission: () => WebBundleAnalysisAdmission });
var WebBundleAnalysisAdmission, IsolatedWebBundleAnalyzer;
function init_IsolatedWebBundleAnalyzer() {
	return (init_IsolatedWebBundleAnalyzer = __esmMin((() => {
		init_webBundleAnalysis();
		init_webBundleAnalyzerResult();
		init_webBundleAnalyzerState();
		init_webBundleScriptAnalysis();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_analysisErrorCleanup();
		init_analysisErrorCancellation();
		init_providerCleanupError();
		init_result();
		init_ProviderDeadline();
		init_WebBundleAnalysisWorker();
		WebBundleAnalysisAdmission = class {
			workers = new WebBundleWorkerCleanup();
			#active;
			#pendingCleanup = new Set();
			active() {
				return this.#active;
			}
			hold(analyzer) {
				this.#active = analyzer;
			}
			release(analyzer) {
				if (this.#active === analyzer) this.#active = undefined;
			}
			pending() {
				return [...this.#pendingCleanup];
			}
			retain(analyzer) {
				this.#pendingCleanup.add(analyzer);
			}
			forget(analyzer) {
				this.#pendingCleanup.delete(analyzer);
			}
		};
		IsolatedWebBundleAnalyzer = class {
			#admission;
			#closed = false;
			#running;
			#controller;
			#worker;
			createWorker;
			constructor(createWorker, admission = new WebBundleAnalysisAdmission()) {
				this.#admission = admission;
				this.createWorker = createWorker ?? ((heapMb) => new WebBundleAnalysisWorker(heapMb, undefined, admission.workers));
			}
			/** Reserve capacity before capture, so concurrent captures cannot retain source inventories. */
			async reserve() {
				if (this.#closed) return err(cancelledBy("analyze_web_bundle", OwnerCancellation.ownerClosed));
				if (this.#admission.active() !== undefined) return err(new AnalysisResourceConstraintError("analyze_web_bundle", "capacity", "Another web-bundle capture or analysis owns this admission's source and result reservation", { concurrent_web_bundle_analyses: 1 }, { measuredExhaustion: true }));
				this.#admission.hold(this);
				try {
					for (const owner of this.#admission.pending()) await owner.#releaseWorker();
					await this.#admission.workers.retry();
					await this.#releaseWorker();
				} catch (cause) {
					this.#admission.release(this);
					return err(cause instanceof AnalysisError ? cause : new ProviderCleanupError("web-bundle-static-analysis", [], { reason: "Earlier web analyzer cleanup remains incomplete" }, {
						operation: "analyze_web_bundle",
						cause
					}));
				}
				if (this.#closed) {
					this.#admission.release(this);
					return err(cancelledBy("analyze_web_bundle", OwnerCancellation.ownerClosed));
				}
				return ok(undefined);
			}
			releaseReservation() {
				this.#admission.release(this);
			}
			analyze(inspection, sourceMaps, input, signal, memberMutationAllowance) {
				if (this.#closed) return Promise.resolve(err(cancelledBy("analyze_web_bundle", OwnerCancellation.ownerClosed, { partialObservation: inspection })));
				if (this.#running !== undefined) return Promise.resolve(err(new AnalysisResourceConstraintError("analyze_web_bundle", "capacity", "This web analyzer already owns an active analysis", { concurrent_web_bundle_analyses: 1 }, { measuredExhaustion: true })));
				this.#controller = new AbortController();
				const running = this.#analyze(inspection, sourceMaps, input, signal, memberMutationAllowance).finally(() => {
					this.#running = undefined;
					this.#controller = undefined;
				});
				this.#running = running;
				return running;
			}
			async #analyze(inspection, sourceMaps, input, signal, memberMutationAllowance) {
				const scripts = inspection.scripts.items.filter(isIncludedScript);
				const results = [];
				const signals = [this.#controller.signal, ...signal === undefined ? [] : [signal]];
				const caller = AbortSignal.any(signals);
				const deadline = new ProviderStartupDeadline(input.total_analysis_timeout_ms ?? 3e5, caller);
				let failure;
				let resultCapacityExhausted = false;
				const appendUnstarted = () => {
					for (const script of scripts.slice(results.length)) results.push({
						status: "unavailable",
						script_key: script.script_key,
						reason: "not_started",
						detail: caller.aborted ? "The operation was cancelled before this script was started." : deadline.interruption === "timeout" ? `The total_analysis_timeout_ms deadline of ${String(input.total_analysis_timeout_ms ?? 3e5)} ms expired before this script was started (deadlineExpired). This is not the per-script analysis_timeout_ms. A per-script timeout above the total is rejected.` : resultCapacityExhausted ? "The host could not reserve more web-analysis result capacity; this script was not started." : "An earlier analyzer failure prevented this script from starting."
					});
				};
				try {
					await this.#admission.workers.retry();
					this.#worker = this.createWorker(input.max_heap_mb ?? 1024);
					for (const script of scripts) {
						if (deadline.signal.aborted) break;
						const analyzed = await this.#worker.analyze(script, input.analysis_timeout_ms ?? 3e4, deadline.signal, input.semantic_precision, memberMutationAllowance);
						if (analyzed.ok) results.push(analyzed.value);
						else {
							const error = analyzed.error.error;
							results.push(analyzed.error.completed ?? {
								status: "unavailable",
								script_key: script.script_key,
								reason: caller.aborted ? "cancelled" : deadline.interruption === "timeout" || error instanceof AnalysisTimeoutError ? "deadline" : error instanceof AnalysisResourceConstraintError ? "resource_constraint" : "worker_failure",
								...unavailableWebScriptRecovery(error)
							});
							if (error.cleanupIncomplete) {
								failure = error;
								break;
							}
							if (analyzed.error.continuation === "result_capacity_exhausted") {
								resultCapacityExhausted = true;
								failure = error;
								break;
							}
							if (error instanceof AnalysisCapabilityUnavailableError) {
								failure = error;
								break;
							}
							if (caller.aborted || deadline.signal.aborted) break;
						}
					}
				} catch (cause) {
					failure = cause instanceof AnalysisError ? cause : new AnalysisOutputError("analyze_web_bundle", "Web analyzer could not complete its owned work", { cause });
				}
				appendUnstarted();
				let partial;
				try {
					partial = buildCapturedWebBundleAnalysis(inspection, sourceMaps, results);
				} catch (cause) {
					failure = new AnalysisOutputError("analyze_web_bundle", "Completed web script facts could not be assembled", { cause });
				}
				const hasPrimaryFailure = failure !== undefined && (!failure.cleanupIncomplete || failure.cleanupPrimary !== undefined);
				try {
					await this.#releaseWorker();
				} catch (cause) {
					const cleanup = cause instanceof AnalysisError ? cause : new ProviderCleanupError("web-bundle-static-analysis", [], { reason: "Web analyzer final cleanup remains incomplete" }, {
						operation: "analyze_web_bundle",
						cause
					});
					failure = failure === undefined ? cleanup : analysisErrorWithCleanupDependencies(failure, cleanup, "analyze_web_bundle");
				} finally {
					deadline.dispose();
				}
				if (caller.aborted && deadline.interruption !== "timeout") {
					const cancelled = cancelledBy("analyze_web_bundle", caller, { partialObservation: partial ?? inspection });
					failure = hasPrimaryFailure ? analysisErrorWithCancellation(failure, cancelled) : failure?.cleanupIncomplete === true ? analysisErrorWithCleanupDependencies(cancelled, failure, "analyze_web_bundle") : cancelled;
				} else if (!hasPrimaryFailure && deadline.interruption === "timeout") {
					const totalTimeoutMs = input.total_analysis_timeout_ms ?? 3e5;
					const timeout = new AnalysisTimeoutError("analyze_web_bundle", totalTimeoutMs, {
						cause: deadline.signal.reason,
						partialObservation: partial ?? inspection,
						...webBundleTotalTimeoutRecovery(totalTimeoutMs)
					});
					failure = failure?.cleanupIncomplete === true ? analysisErrorWithCleanupDependencies(timeout, failure, "analyze_web_bundle") : timeout;
				}
				if (failure !== undefined) {
					failure.retainPartialObservation(partial ?? inspection);
					return err(failure);
				}
				if (partial === undefined) return err(new AnalysisOutputError("analyze_web_bundle", "Web analysis produced no result"));
				return ok(partial);
			}
			async close() {
				this.#closed = true;
				this.#controller?.abort(new Error("Browser provider closed during bundle analysis"));
				await this.#running;
				await this.#releaseWorker();
			}
			async #releaseWorker() {
				try {
					await this.#worker?.close();
					this.#worker = undefined;
					this.#admission.forget(this);
				} catch (cause) {
					this.#admission.retain(this);
					throw cause;
				}
			}
		};
	})))();
}

//#endregion
export { IsolatedWebBundleAnalyzer_exports as n, init_IsolatedWebBundleAnalyzer as r, IsolatedWebBundleAnalyzer as t };