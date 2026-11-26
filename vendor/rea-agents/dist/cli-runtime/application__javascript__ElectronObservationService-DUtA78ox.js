import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisOutputError, cancelledBy, init_analysisErrorCore, init_jsonValue, jsonObjectSchema, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { completeProviderEvidence, init_ProviderOperationExecution, keepIncompleteObservation } from "./ProviderOperationExecution-DJuOJe_5.js";
import { electronPageInspectionSchema, electronTargetListSchema, init_electronObservation } from "./javascriptRuntimeReconciliationExample-CfD5_IWS.js";
import { isDeepStrictEqual } from "node:util";

//#region dist/application/javascript/ElectronEvidence.js
var createElectronEvidence, parameters;
function init_ElectronEvidence() {
	return (init_ElectronEvidence = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		createElectronEvidence = (operation, input, report, provider) => {
			const result = report.facts;
			return createEvidence(unknownTarget("not-observed"), provider, {
				predicateType: operation === "list_electron_targets" ? "rea.electron-target-list" : "rea.electron-page-inspection",
				operation,
				parameters: parameters(input),
				result,
				rawResult: isDeepStrictEqual(report.source, result) ? null : report.source,
				confidence: "observed",
				authority: "external-service",
				environment: {
					id: `${result.browser.product}@${result.browser.revision}`,
					platform: "unknown",
					architecture: "unknown",
					isolation: "none"
				},
				limitations: [...result.limitations, "Browser host platform and architecture were not observed."]
			});
		};
		parameters = (input) => ({
			cdp_endpoint: input.cdp_endpoint,
			..."target_id" in input ? {
				target_id: input.target_id,
				observation_ms: input.observation_ms,
				include_script_sources: input.include_script_sources,
				...input.command_timeout_ms === undefined ? {} : { command_timeout_ms: input.command_timeout_ms }
			} : {}
		});
	})))();
}

//#endregion
//#region dist/application/javascript/ElectronObservationService.js
var listElectronTargets, inspectElectronPage, pageSelectionFailure, requireProvider;
function init_ElectronObservationService() {
	return (init_ElectronObservationService = __esmMin((() => {
		init_analysisErrorCore();
		init_result();
		init_ElectronEvidence();
		init_jsonValue();
		init_electronObservation();
		init_ProviderOperationExecution();
		listElectronTargets = async (provider, input, options = {}) => {
			const ready = requireProvider(provider, "list_electron_targets");
			if (!ready.ok) return ready;
			if (options.signal?.aborted) return err(cancelledBy("list_electron_targets", options.signal));
			const result = await ready.value.listTargets(input, options);
			if (!result.ok) return result;
			const json = jsonValueSchema.safeParse(result.value);
			if (!json.success) return err(new AnalysisOutputError("list_electron_targets", "Electron provider returned non-JSON target data.", { cause: json.error }));
			const report = electronTargetListSchema.safeParse(json.data);
			if (!report.success) return err(new AnalysisOutputError("list_electron_targets", "Electron provider returned a malformed target list.", { cause: report.error }));
			return completeProviderEvidence(createElectronEvidence("list_electron_targets", input, {
				source: json.data,
				facts: report.data
			}, ready.value.identity()), options.signal);
		};
		inspectElectronPage = async (provider, input, options = {}) => {
			const ready = requireProvider(provider, "inspect_electron_page");
			if (!ready.ok) return ready;
			if (options.signal?.aborted) return err(cancelledBy("inspect_electron_page", options.signal));
			const result = await ready.value.inspectPage(input, options);
			if (!result.ok) {
				const partial = jsonObjectSchema.safeParse(result.error.partialObservation);
				if (partial.success && partial.data.kind === "electron-page-observation") {
					const report = electronPageInspectionSchema.safeParse(partial.data.inspection);
					if (report.success) {
						const mismatch = pageSelectionFailure(input, report.data);
						if (mismatch !== undefined) {
							result.error.retainSecondaryFailure(mismatch);
							return err(keepIncompleteObservation(result.error, "inspect_electron_page", "Electron provider retained a non-JSON incomplete observation."));
						}
						const inspection = {
							...report.data,
							limitations: [...report.data.limitations, partial.data.cleanup === "transport-closed" ? "REA closed its CDP transport; this does not imply target shutdown." : "CDP transport cleanup remains incomplete."]
						};
						result.error.partialObservation = createElectronEvidence("inspect_electron_page", input, {
							source: jsonValueSchema.parse(partial.data.inspection),
							facts: inspection
						}, ready.value.identity());
						return result;
					}
				}
				return err(keepIncompleteObservation(result.error, "inspect_electron_page", "Electron provider retained a non-JSON incomplete observation."));
			}
			const json = jsonValueSchema.safeParse(result.value);
			if (!json.success) return err(new AnalysisOutputError("inspect_electron_page", "Electron provider returned non-JSON page data.", { cause: json.error }));
			const report = electronPageInspectionSchema.safeParse(json.data);
			if (!report.success) return err(new AnalysisOutputError("inspect_electron_page", "Electron provider returned a malformed page inspection.", { cause: report.error }));
			const mismatch = pageSelectionFailure(input, report.data);
			if (mismatch !== undefined) return err(mismatch.retainPartialObservation(report.data));
			return completeProviderEvidence(createElectronEvidence("inspect_electron_page", input, {
				source: json.data,
				facts: report.data
			}, ready.value.identity()), options.signal);
		};
		pageSelectionFailure = (input, report) => report.target.target_id !== input.target_id || report.capture_window.observation_ms !== input.observation_ms ? new AnalysisOutputError("inspect_electron_page", "Electron provider changed the selected page or observation window.") : undefined;
		requireProvider = (provider, operation) => provider === undefined ? err(new AnalysisCapabilityUnavailableError("rea-cdp-electron", operation, "Electron observation provider is not configured")) : ok(provider);
	})))();
}

//#endregion
init_ElectronObservationService();
export { inspectElectronPage, listElectronTargets };