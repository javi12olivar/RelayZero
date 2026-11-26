import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, cancelledBy, init_analysisErrorCore } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { createEvidence, init_evidence, init_evidenceValidation, readImmutableEvidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_EvidenceInputResolver, resolveEvidenceRequest } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { JAVASCRIPT_APPLICATION_WORKFLOW_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { GROUP_BYTES, init_webNetworkRouteTemplates, scanRouteTemplate, textBytes } from "./featureTraceView-CDxdbO2M.js";
import { init_recordedTransportUrl, parseRecordedTransportUrl } from "./browserObservation-BVcDYwHI.js";
import { admitHarCaptureParent, init_WebNetworkProjectionAccumulator } from "./WebNetworkProjectionAccumulator-DHsoO8rl.js";
import { WebNetworkApiSurfaceAccumulator, init_WebNetworkApiSurfaceAccumulator } from "./AnalysisViewService-D_M3W3PD.js";
import { compareStaticObservedEndpointsRequestSchema, init_applicationWorkflowInputContracts } from "./javascriptRuntimeReconciliationExample-CfD5_IWS.js";
import { applicationGraphEvidenceInputError, init_JavaScriptApplicationEvidenceGraph, parseApplicationGraphEvidence } from "./JavaScriptApplicationEvidenceGraph-BflWpgn6.js";
import { setImmediate } from "node:timers/promises";

//#region dist/domain/javascript/staticObservedEndpoints.js
var identity, routeKey, methodFor, targetFor, indexObservedGroups, readStaticEndpoint, matchEndpoint, finalizeObservedGroups, summarize, compareStaticObservedEndpoints;
function init_staticObservedEndpoints() {
	return (init_staticObservedEndpoints = __esmMin((() => {
		init_canonicalDigest();
		init_unicodeCodePointOrder();
		init_recordedTransportUrl();
		init_result();
		init_WebNetworkApiSurfaceAccumulator();
		init_webNetworkRouteTemplates();
		identity = (prefix, facts) => `${prefix}_${digestCanonicalValue(facts)}`;
		routeKey = (origin, path, rules) => JSON.stringify([
			origin,
			path,
			rules
		]);
		methodFor = (mechanism) => {
			if (typeof mechanism !== "string") return {
				method: null,
				method_basis: "unknown"
			};
			if (/(?:^|[.:])EventSource$/u.test(mechanism)) return {
				method: "GET",
				method_basis: "api-definition"
			};
			if (/(?:^|[.:])sendBeacon$/u.test(mechanism)) return {
				method: "POST",
				method_basis: "api-definition"
			};
			const method = /(?:^|[.:])(get|post|put|patch|delete|head|options)$/u.exec(mechanism)?.[1];
			return method === undefined ? {
				method: null,
				method_basis: "unknown"
			} : {
				method: method.toUpperCase(),
				method_basis: "callee-spelling"
			};
		};
		targetFor = (value, origin) => {
			const unknown = (reason) => ({
				origin: null,
				origin_basis: "unknown",
				path: null,
				reason
			});
			if (typeof value !== "string") return unknown("unparseable-target");
			if (value.startsWith("/") && !value.startsWith("//")) {
				const path = value.split(/[?#]/u, 1)[0];
				if (origin === undefined) return {
					...unknown("origin-required"),
					path
				};
				const parsed = parseRecordedTransportUrl(`${origin}${path}`);
				if (parsed.path !== path || parsed.origin !== origin || parsed.credentials !== null) return unknown("unparseable-target");
				if (URL.parse(`${origin}${path}`)?.pathname !== path) return unknown("normalization-required");
				return {
					origin,
					origin_basis: "caller-origin",
					path,
					reason: null
				};
			}
			if (!/^https?:\/\//iu.test(value)) return unknown(/^[A-Za-z][A-Za-z0-9+.-]*:/u.test(value) ? "non-http-target" : "unresolved-target");
			const parsed = parseRecordedTransportUrl(value);
			if (parsed.path === null || parsed.origin === null || parsed.credentials !== null) return unknown("unparseable-target");
			if (URL.parse(value)?.pathname !== parsed.path) return unknown("normalization-required");
			return {
				origin: parsed.origin,
				origin_basis: "literal-url",
				path: parsed.path,
				reason: null
			};
		};
		indexObservedGroups = (input) => {
			const { accumulator } = input;
			const index = {
				rows: [],
				routes: new Map(),
				origins: new Set(),
				complete: input.captureComplete && accumulator.comparisonCoverage().excluded_records === 0
			};
			for (const source of accumulator.comparisonGroups()) {
				const admitted = accumulator.admitDerivedBytes(GROUP_BYTES + 128 * source.record_ordinals.length);
				if (!admitted.ok) return admitted;
				const row = {
					group_id: identity("observed_endpoint", [
						input.captureEvidenceId,
						source.method,
						source.origin,
						source.path_template,
						source.templated_segments
					]),
					method: source.method,
					origin: source.origin,
					path_template: source.path_template,
					templated_segments: [...source.templated_segments],
					record_ordinals: [...source.record_ordinals],
					status: "observed-without-static-match",
					reason: null
				};
				index.rows.push(row);
				index.origins.add(source.origin);
				const key = routeKey(source.origin, source.path_template, source.rules);
				const bucket = index.routes.get(key);
				if (bucket === undefined) index.routes.set(key, {
					methods: new Map([[source.method, {
						source,
						row
					}]]),
					ambiguous: false
				});
				else bucket.methods.set(source.method, {
					source,
					row
				});
			}
			return ok(index);
		};
		readStaticEndpoint = (input, node, observation) => {
			const properties = observation.properties;
			if (properties.endpoint_kind !== "network") return ok(undefined);
			const admitted = input.accumulator.admitDerivedBytes(GROUP_BYTES + (typeof properties.value === "string" ? textBytes(properties.value.length) : 0));
			if (!admitted.ok) return admitted;
			const candidate = properties.interpretation === "candidate";
			const partial = properties.resolution === "partial";
			let reason = null;
			if (candidate) reason = "candidate-endpoint";
			else if (observation.evidence.state !== "observed") reason = "unconfirmed-static-observation";
			else if (partial) reason = "partial-target";
			return ok({
				endpoint_id: identity("static_endpoint", [
					input.applicationEvidenceId,
					node.node_id,
					observation.observation_id
				]),
				node_id: node.node_id,
				observation_id: observation.observation_id,
				...methodFor(reason === null ? properties.mechanism : undefined),
				...reason !== null ? {
					origin: null,
					origin_basis: "unknown",
					path: null,
					reason
				} : targetFor(properties.value, input.origin),
				status: "unknown"
			});
		};
		matchEndpoint = (endpoint, index, budget) => {
			if (endpoint.reason !== null || endpoint.path === null || endpoint.origin === null) return ok(undefined);
			let failure;
			const route = scanRouteTemplate(endpoint.path, (bytes) => {
				const admitted = budget.admitDerivedBytes(bytes);
				if (!admitted.ok) failure = admitted.error;
				return admitted.ok;
			});
			if (route === null) {
				if (failure === undefined) throw new Error("Route reservation failed without its owned error");
				return err(failure);
			}
			const bucket = index.routes.get(routeKey(endpoint.origin, route.template, route.rules));
			if (endpoint.method === null && bucket !== undefined && bucket.methods.size > 1) {
				endpoint.reason = "ambiguous-method";
				bucket.ambiguous = true;
				return ok(undefined);
			}
			const selected = endpoint.method === null ? bucket?.methods.values().next().value : bucket?.methods.get(endpoint.method);
			if (selected !== undefined) {
				const admitted = budget.admitDerivedBytes(GROUP_BYTES);
				if (!admitted.ok) return admitted;
				endpoint.status = "matched";
				selected.row.status = "matched";
				const exactOrdinal = selected.source.exactPathOrdinal(endpoint.path);
				const basis = exactOrdinal !== undefined ? "exact" : "template-compatible";
				return ok({
					match_id: identity("endpoint_match", [
						endpoint.endpoint_id,
						selected.row.group_id,
						basis
					]),
					endpoint_id: endpoint.endpoint_id,
					group_id: selected.row.group_id,
					basis,
					supporting_record_ordinal: exactOrdinal ?? selected.source.record_ordinals[0]
				});
			}
			if (!index.complete) endpoint.reason = "capture-incomplete";
			else if (!index.origins.has(endpoint.origin)) endpoint.reason = "origin-not-exercised";
			else {
				endpoint.status = "not-observed-in-capture";
				endpoint.reason = "no-observed-match";
			}
			return ok(undefined);
		};
		finalizeObservedGroups = (index) => {
			for (const bucket of index.routes.values()) {
				if (!bucket.ambiguous) continue;
				for (const { row } of bucket.methods.values()) {
					if (row.status === "matched") continue;
					row.status = "unknown";
					row.reason = "ambiguous-static-method";
				}
			}
			index.rows.sort((a, b) => compareUnicodeCodePoints(a.group_id, b.group_id));
		};
		summarize = (endpoints, groups, matchCount) => {
			const summary = {
				static_network_endpoint_observations: endpoints.length,
				matched: 0,
				not_observed_in_capture: 0,
				unknown: 0,
				observed_groups: groups.length,
				observed_without_static_match: 0,
				observed_unknown: 0,
				matches: matchCount
			};
			for (const endpoint of endpoints) {
				if (endpoint.status === "matched") summary.matched++;
				else if (endpoint.status === "unknown") summary.unknown++;
				else summary.not_observed_in_capture++;
			}
			for (const group of groups) {
				if (group.status === "observed-without-static-match") summary.observed_without_static_match++;
				else if (group.status === "unknown") summary.observed_unknown++;
			}
			return summary;
		};
		compareStaticObservedEndpoints = (input) => {
			const indexed = indexObservedGroups(input);
			if (!indexed.ok) return indexed;
			const index = indexed.value;
			const endpoints = [];
			const matches = [];
			for (const node of input.graph.nodes) {
				if (node.kind !== "endpoint") continue;
				for (const observation of node.observations) {
					const endpoint = readStaticEndpoint(input, node, observation);
					if (!endpoint.ok) return endpoint;
					if (endpoint.value === undefined) continue;
					endpoints.push(endpoint.value);
					const match = matchEndpoint(endpoint.value, index, input.accumulator);
					if (!match.ok) return match;
					if (match.value !== undefined) matches.push(match.value);
				}
			}
			finalizeObservedGroups(index);
			endpoints.sort((a, b) => compareUnicodeCodePoints(a.endpoint_id, b.endpoint_id));
			matches.sort((a, b) => compareUnicodeCodePoints(a.match_id, b.match_id));
			return ok({
				static_endpoints: endpoints,
				observed_groups: index.rows,
				matches,
				summary: summarize(endpoints, index.rows, matches.length)
			});
		};
	})))();
}

//#endregion
//#region dist/application/javascript/StaticObservedEndpointComparisonService.js
var OPERATION, readSources, sourceCoverage, createComparison, compareStaticAndObservedEndpointsEvidence;
function init_StaticObservedEndpointComparisonService() {
	return (init_StaticObservedEndpointComparisonService = __esmMin((() => {
		init_targetIdentity();
		init_applicationWorkflowInputContracts();
		init_evidence();
		init_evidenceValidation();
		init_analysisErrorCore();
		init_canonicalDigest();
		init_result();
		init_investigationProviders();
		init_WebNetworkApiSurfaceAccumulator();
		init_WebNetworkProjectionAccumulator();
		init_staticObservedEndpoints();
		init_EvidenceInputResolver();
		init_JavaScriptApplicationEvidenceGraph();
		OPERATION = "compare_static_and_observed_endpoints";
		readSources = (rawInput, lookup, accumulator, options) => {
			const request = resolveEvidenceRequest(OPERATION, rawInput, compareStaticObservedEndpointsRequestSchema, lookup, {
				...options,
				readEvidence: (value) => {
					const admitted = accumulator.admitInlineEvidence(value);
					return admitted.ok ? readImmutableEvidence(value) : admitted;
				}
			});
			if (!request.ok) return request;
			const input = request.value.input;
			const source = parseApplicationGraphEvidence(input.application, ["application"]);
			if (!source.ok) return err(applicationGraphEvidenceInputError(OPERATION, source.error));
			if (source.value.kind !== "static-application") return err(new AnalysisInputError(OPERATION, undefined, [{
				path: ["application"],
				reason: "invalid_value",
				message: "Use analyze_javascript_application Evidence; reconciled, managed and web-bundle graphs are outside this comparison's static scope."
			}]));
			const captureEvidence = input.capture;
			const admitted = admitHarCaptureParent({
				evidenceId: captureEvidence.evidence_id,
				operation: captureEvidence.operation,
				predicateType: captureEvidence.predicate_type,
				normalizedResult: captureEvidence.normalized_result,
				subject: captureEvidence.subject,
				parameters: captureEvidence.parameters,
				limitations: captureEvidence.limitations
			}, "api-surface", accumulator, {
				operation: OPERATION,
				sourceField: "capture"
			});
			if (!admitted.ok) return admitted;
			return ok({
				application: source.value,
				capture: admitted.value,
				captureEvidence,
				origin: input.origin
			});
		};
		sourceCoverage = ({ application, capture, captureEvidence }, excluded) => ({
			application: {
				status: application.graph.coverage.status,
				truncated: application.graph.coverage.truncated,
				omitted_count: application.graph.coverage.omitted_count,
				limit_count: application.graph.coverage.limits.length,
				limitation_count: new Set([...application.evidence.limitations, ...application.graph.limitations]).size
			},
			capture_limitation_count: new Set([...captureEvidence.limitations, ...capture.limitations]).size,
			observed_records_examined: capture.records.length,
			observed_records_total: capture.total_records,
			observed_records_excluded: excluded
		});
		createComparison = (sources, comparison, accumulator) => {
			const { application, capture, captureEvidence, origin } = sources;
			const evidenceLinks = [application.evidence.evidence_id, captureEvidence.evidence_id].sort();
			const limitations = [
				"Source-specific limitation details remain on the two source Evidence records; source_coverage reports their counts without copying unrelated capture or graph text.",
				"Not-observed-in-capture refers only to this capture; it does not establish unused, hidden, inaccessible or absent server behavior.",
				"Template-compatible pairs are inferred format matches, not handler identity or runtime execution proof. Unknown static methods are never filled from observed methods.",
				"Observed-without-static-match means no confirmed correspondence in the supplied static observations; incomplete static discovery can miss code references.",
				...origin === undefined ? [] : ["The origin for root-relative static targets is a caller assertion, not an observed application base URL."]
			].sort();
			const admittedLimitations = accumulator.addLimitations(limitations);
			if (!admittedLimitations.ok) return admittedLimitations;
			const parameters = {
				application_evidence_id: application.evidence.evidence_id,
				capture_evidence_id: captureEvidence.evidence_id,
				origin: origin ?? null
			};
			const result = {
				comparison_id: `endpoint_comparison_${digestCanonicalValue(parameters)}`,
				application: {
					evidence_id: application.evidence.evidence_id,
					graph_id: application.graph.graph_id
				},
				capture: {
					evidence_id: captureEvidence.evidence_id,
					artifact: {
						path: capture.artifact.path,
						sha256: capture.artifact.sha256
					}
				},
				declared_origin: origin ?? null,
				...comparison,
				source_coverage: sourceCoverage(sources, accumulator.comparisonCoverage().excluded_records),
				evidence_links: evidenceLinks,
				limitations
			};
			const evidence = createEvidence(unknownTarget("derived-from-linked-evidence"), JAVASCRIPT_APPLICATION_WORKFLOW_PROVIDER, {
				predicateType: "rea.static-observed-endpoint-comparison",
				operation: OPERATION,
				parameters,
				result,
				rawResult: null,
				confidence: "inferred",
				authority: "analyst-inference",
				environment: null,
				limitations,
				evidenceLinks
			});
			return ok({
				evidence,
				result,
				sources: [application.evidence, captureEvidence]
			});
		};
		compareStaticAndObservedEndpointsEvidence = async (rawInput, lookup, options = {}) => {
			const accumulator = new WebNetworkApiSurfaceAccumulator(undefined, false, { operation: OPERATION });
			const admitted = readSources(rawInput, lookup, accumulator, options);
			if (!admitted.ok) return admitted;
			const sources = admitted.value;
			const { capture, captureEvidence } = sources;
			for (const [index, record] of capture.records.entries()) {
				if (index % 256 === 0) {
					await setImmediate();
					if (options.signal?.aborted) return err(cancelledBy(OPERATION, options.signal));
				}
				const added = accumulator.add(record);
				if (!added.ok) return added;
			}
			const compared = compareStaticObservedEndpoints({
				applicationEvidenceId: sources.application.evidence.evidence_id,
				captureEvidenceId: captureEvidence.evidence_id,
				graph: sources.application.graph,
				accumulator,
				...sources.origin === undefined ? {} : { origin: sources.origin },
				captureComplete: capture.records.length === capture.total_records
			});
			if (!compared.ok) return compared;
			await setImmediate();
			if (options.signal?.aborted) return err(cancelledBy(OPERATION, options.signal));
			return createComparison(sources, compared.value, accumulator);
		};
	})))();
}

//#endregion
init_StaticObservedEndpointComparisonService();
export { compareStaticAndObservedEndpointsEvidence };