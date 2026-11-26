import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, EvidenceIntegrityError, init_analysisErrorCore, init_evidenceErrors } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_inputIssueProjection, projectInputIssues } from "./inputIssueProjection-W-zXU1iH.js";
import { evidenceFileTarget, evidenceSubjectDisplay, evidenceSubjectTarget, init_evidence, init_evidenceValidation, isImmutableEvidence, readEvidence } from "./nativeValueFlow-13oOEkkJ.js";
import { JAVASCRIPT_APPLICATION_PROVIDER, JAVASCRIPT_RUNTIME_RECONCILIATION_PROVIDER, MANAGED_WORKFLOW_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { analyzeJavaScriptApplicationInputSchema, init_javascriptApplicationAnalysis, javascriptApplicationAnalysisResultSchema } from "./javascriptModuleUnits-YkbK0IJF.js";
import { init_managedApplicationGraph, managedApplicationGraphResultSchema } from "./sessionToolContracts-D9XcfL6p.js";
import { init_javascriptRuntimeReconciliationSchemas, javascriptRuntimeReconciliationResultSchema } from "./javascriptRuntimeReconciliationExample-CfD5_IWS.js";
import { z } from "zod";

//#region dist/application/javascript/JavaScriptApplicationEvidenceGraph.js
var applicationGraphSubjectTarget, applicationGraphEvidenceInputError, InvalidApplicationGraphEvidence, ownedApplicationSources, rememberOwnedApplicationGraphEvidence, parseApplicationGraphEvidence, staticApplicationSource, staticApplicationSourceForResult, staticRuntimeSource, managedApplicationSource, assertResultEvidenceLinksInEnvelope, assertApplicationSubject, providerMatches, requirePredicate, requireProvider, parseNativeApplicationEvidence, captureInputValidation, parseEvidenceInput, parseCallerValue, zodInputFailure, invalidEvidence;
function init_JavaScriptApplicationEvidenceGraph() {
	return (init_JavaScriptApplicationEvidenceGraph = __esmMin((() => {
		init_investigationProviders();
		init_evidence();
		init_evidenceValidation();
		init_evidenceErrors();
		init_analysisErrorCore();
		init_inputIssueProjection();
		init_result();
		init_javascriptApplicationAnalysis();
		init_javascriptRuntimeReconciliationSchemas();
		init_managedApplicationGraph();
		applicationGraphSubjectTarget = (source) => {
			const subject = source.evidence.subject;
			const staticRootObserved = source.kind === "static-application" && source.graph.nodes.some((node) => node.kind === "artifact" && node.identity.strategy === "content-digest" && node.identity.sha256 === source.rootArtifactSha256 && node.observations.some(({ evidence }) => evidence.extractor.operation === "inventory-root"));
			const file = evidenceFileTarget({ subject });
			return staticRootObserved || source.kind === "managed-application" && file?.format === "pe" && file.sha256 === source.rootArtifactSha256 ? evidenceSubjectTarget(subject) : undefined;
		};
		applicationGraphEvidenceInputError = (operation, failure) => failure instanceof EvidenceIntegrityError ? failure : new AnalysisInputError(operation, undefined, failure.issues);
		InvalidApplicationGraphEvidence = class extends Error {
			issues;
			constructor(issues) {
				super("Application graph Evidence failed input validation");
				this.issues = issues;
			}
		};
		ownedApplicationSources = new WeakMap();
		rememberOwnedApplicationGraphEvidence = (evidence, result) => {
			if (!isImmutableEvidence(evidence) || evidence.normalized_result !== result || evidence.operation !== "analyze_javascript_application" || !providerMatches(evidence, JAVASCRIPT_APPLICATION_PROVIDER)) throw new TypeError("Owned application Evidence must bind its exact validated immutable result");
			ownedApplicationSources.set(evidence, Object.freeze(staticApplicationSourceForResult(evidence, result, [])));
			return evidence;
		};
		parseApplicationGraphEvidence = (input, path = []) => captureInputValidation(() => {
			const evidence = parseEvidenceInput(input);
			const owned = ownedApplicationSources.get(evidence);
			if (owned !== undefined) return owned;
			if (evidence.operation === "analyze_javascript_application") {
				requirePredicate(evidence, "rea.javascript-application-analysis", path);
				requireProvider(evidence, JAVASCRIPT_APPLICATION_PROVIDER, path);
				return staticApplicationSource(evidence, path);
			}
			if (evidence.operation === "reconcile_javascript_runtime") {
				requirePredicate(evidence, "rea.javascript-runtime-reconciliation", path);
				requireProvider(evidence, JAVASCRIPT_RUNTIME_RECONCILIATION_PROVIDER, path);
				return staticRuntimeSource(evidence, path);
			}
			if (evidence.operation === "project_managed_application_graph") {
				requirePredicate(evidence, "rea.managed-application-graph", path);
				requireProvider(evidence, MANAGED_WORKFLOW_PROVIDER, path);
				return managedApplicationSource(evidence, path);
			}
			throw invalidEvidence(path, "operation", "Expected authenticated JavaScript analysis, runtime reconciliation, or managed application graph Evidence.");
		});
		staticApplicationSource = (evidence, path) => {
			const result = parseCallerValue((input) => javascriptApplicationAnalysisResultSchema.parse(input), evidence.normalized_result, [...path, "normalized_result"]);
			return staticApplicationSourceForResult(evidence, result, path);
		};
		staticApplicationSourceForResult = (evidence, result, path) => {
			if (evidence.authority !== "shipped-artifact" || evidence.confidence !== "derived") throw invalidEvidence(path, "authority", "JavaScript application Evidence must use shipped-artifact authority and derived confidence.");
			if (evidence.predicate_type !== "rea.javascript-application-analysis") throw invalidEvidence(path, "predicate_type", "JavaScript application Evidence predicate does not match its result shape.");
			parseCallerValue((input) => analyzeJavaScriptApplicationInputSchema.parse(input), {
				input_path: result.input_path,
				...evidence.parameters
			}, [...path, "parameters"]);
			assertApplicationSubject(evidence, result, path);
			return {
				evidence,
				graph: result.graph,
				kind: "static-application",
				rootArtifactSha256: result.root_artifact_sha256,
				semanticGraph: result.semantic_graph
			};
		};
		staticRuntimeSource = (evidence, path) => {
			if (evidence.authority !== "analyst-inference" || evidence.confidence !== "inferred") throw invalidEvidence(path, "authority", "Runtime reconciliation Evidence must use analyst-inference authority and inferred confidence.");
			const result = parseCallerValue((input) => javascriptRuntimeReconciliationResultSchema.parse(input), evidence.normalized_result, [...path, "normalized_result"]);
			assertResultEvidenceLinksInEnvelope(result.evidence_links, evidence, path, "Runtime reconciliation result");
			const applicationLayer = result.static_layers.find(({ role }) => role === "application");
			if (applicationLayer === undefined) throw invalidEvidence([...path, "normalized_result"], "static_layers", "Runtime reconciliation Evidence must include its application layer.");
			return {
				evidence,
				graph: result.graph,
				kind: "static-runtime-reconciliation",
				rootArtifactSha256: applicationLayer.root_artifact_sha256,
				semanticGraph: null
			};
		};
		managedApplicationSource = (evidence, path) => {
			if (evidence.authority !== "analyst-inference" || evidence.confidence !== "inferred") throw invalidEvidence(path, "authority", "Managed application graph Evidence must use analyst-inference authority and inferred confidence.");
			const result = parseCallerValue((input) => managedApplicationGraphResultSchema.parse(input), evidence.normalized_result, [...path, "normalized_result"]);
			assertResultEvidenceLinksInEnvelope(result.evidence_links, evidence, path, "Managed application graph result");
			return {
				evidence,
				graph: result.graph,
				kind: "managed-application",
				rootArtifactSha256: result.root_artifact_sha256,
				semanticGraph: null
			};
		};
		assertResultEvidenceLinksInEnvelope = (resultEvidenceLinks, evidence, path, resultLabel) => {
			const unmatchedLink = resultEvidenceLinks.find((evidenceId) => !evidence.evidence_links.includes(evidenceId));
			if (unmatchedLink !== undefined) throw invalidEvidence([...path, "normalized_result"], "evidence_links", `${resultLabel} references Evidence ${unmatchedLink} outside its envelope.`);
		};
		assertApplicationSubject = (evidence, result, path) => {
			const target = evidenceFileTarget(evidence);
			if (target === undefined || target.sha256 !== result.root_artifact_sha256 || target.format !== result.format || evidenceSubjectDisplay(evidence)?.local_path !== result.input_path) throw invalidEvidence(path, "subject", "JavaScript application Evidence subject must match the analyzed artifact identity and input path.");
		};
		providerMatches = (evidence, provider) => evidence.provider.id === provider.id && evidence.provider.name === provider.name && evidence.provider.version === provider.version;
		requirePredicate = (evidence, expected, path) => {
			if (evidence.predicate_type !== expected) throw invalidEvidence(path, "predicate_type", `Expected predicate ${expected} for operation ${evidence.operation}.`);
		};
		requireProvider = (evidence, expected, path) => {
			if (!providerMatches(evidence, expected)) throw invalidEvidence(path, "provider", `Expected provider ${expected.id} v${expected.version} for operation ${evidence.operation}.`);
		};
		parseNativeApplicationEvidence = (inputs, path = []) => captureInputValidation(() => {
			const parsed = inputs.map((input) => parseEvidenceInput(input));
			const withoutSubject = parsed.findIndex((evidence) => evidenceFileTarget(evidence) === undefined);
			if (withoutSubject !== -1) throw invalidEvidence([...path, withoutSubject], "subject", "Native handoff Evidence requires an artifact subject.");
			return parsed;
		});
		captureInputValidation = (operation) => {
			try {
				return ok(operation());
			} catch (cause) {
				if (cause instanceof InvalidApplicationGraphEvidence) return err({ issues: cause.issues });
				if (cause instanceof EvidenceIntegrityError) return err(cause);
				throw cause;
			}
		};
		parseEvidenceInput = (input) => {
			const parsed = readEvidence(input);
			if (!parsed.ok) throw parsed.error;
			return parsed.value;
		};
		parseCallerValue = (parse, input, path) => {
			try {
				return parse(input);
			} catch (cause) {
				if (cause instanceof z.ZodError) throw zodInputFailure(cause, input, path);
				throw cause;
			}
		};
		zodInputFailure = (cause, input, path) => new InvalidApplicationGraphEvidence(projectInputIssues(cause.issues, input).map((issue) => ({
			...issue,
			path: [...path, ...issue.path]
		})));
		invalidEvidence = (path, field, message) => new InvalidApplicationGraphEvidence([{
			path: [...path, field],
			reason: "invalid_value",
			message
		}]);
	})))();
}

//#endregion
export { applicationGraphEvidenceInputError, applicationGraphSubjectTarget, init_JavaScriptApplicationEvidenceGraph, parseApplicationGraphEvidence, parseNativeApplicationEvidence, rememberOwnedApplicationGraphEvidence };