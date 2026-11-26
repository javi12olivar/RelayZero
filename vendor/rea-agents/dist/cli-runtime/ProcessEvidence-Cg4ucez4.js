import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { createEvidence, init_evidence, init_evidenceValidation, init_processCaptureParsing, init_processScenario, processScenarioPlanProjection, processScenarioPlanSchema, safeParseEvidence, safeParseProcessCapture } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { PROCESS_PROVIDER, init_processEvidenceProvider, isProcessEvidenceProvider } from "./sessionToolContracts-D9XcfL6p.js";
import { posix, win32 } from "node:path";

//#region dist/application/process/ProcessEvidence.js
var PROCESS_CAPTURE_EVIDENCE, PROCESS_SCENARIO_PLAN_EVIDENCE, wrongWorkflowIssueFacts, parseProcessCaptureEvidence, processEvidenceParameters, processCaptureSubject, createProcessCaptureEvidence, createProcessScenarioPlanEvidence;
function init_ProcessEvidence() {
	return (init_ProcessEvidence = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		init_processEvidenceProvider();
		init_processCaptureParsing();
		init_evidenceValidation();
		init_processScenario();
		init_result();
		PROCESS_CAPTURE_EVIDENCE = {
			operation: "capture_process_scenario",
			predicate: "rea.process-capture"
		};
		PROCESS_SCENARIO_PLAN_EVIDENCE = {
			operation: "capture_process_scenario",
			predicate: "rea.process-scenario-plan"
		};
		wrongWorkflowIssueFacts = (failure) => ({
			expected: {
				operation: failure.expected.operation,
				predicate_type: failure.expected.predicate
			},
			observed: {
				operation: failure.actual.operation,
				predicate_type: failure.actual.predicate
			}
		});
		parseProcessCaptureEvidence = (input) => {
			const parsedEvidence = safeParseEvidence(input);
			if (!parsedEvidence.ok) return err({
				kind: "invalid-evidence",
				cause: parsedEvidence.error
			});
			const record = parsedEvidence.value;
			if (record.operation !== PROCESS_CAPTURE_EVIDENCE.operation || record.predicate_type !== PROCESS_CAPTURE_EVIDENCE.predicate) return err({
				kind: "wrong-workflow",
				expected: PROCESS_CAPTURE_EVIDENCE,
				actual: {
					operation: record.operation,
					predicate: record.predicate_type
				}
			});
			if (!isProcessEvidenceProvider(record.provider)) return err({
				kind: "unsupported-provider",
				provider: record.provider
			});
			const parsedCapture = safeParseProcessCapture(record.normalized_result);
			return parsedCapture.success ? ok({
				record,
				capture: parsedCapture.data
			}) : err({
				kind: "invalid-capture",
				cause: parsedCapture.error
			});
		};
		processEvidenceParameters = (scenario, platform) => ({
			executable_name: (platform === "win32" ? win32 : posix).basename(scenario.executable),
			argument_count: scenario.arguments.length,
			event_count: scenario.events.length,
			filesystem_observation_path_count: scenario.filesystem_observation_paths.length,
			normalization: scenario.normalization
		});
		processCaptureSubject = (manifest) => {
			const root = manifest.root_process;
			switch (root.state) {
				case "observed": return {
					kind: "process",
					pid: root.pid,
					start_time: root.start_time,
					executable_sha256: manifest.executable_sha256
				};
				case "withheld-by-caller": return unknownTarget("withheld-by-caller");
				case "unknown": return unknownTarget("not-observed");
			}
		};
		createProcessCaptureEvidence = (scenario, capture) => {
			return createEvidence(processCaptureSubject(capture.manifest), PROCESS_PROVIDER, {
				predicateType: PROCESS_CAPTURE_EVIDENCE.predicate,
				operation: PROCESS_CAPTURE_EVIDENCE.operation,
				parameters: processEvidenceParameters(scenario, capture.manifest.platform),
				result: capture,
				confidence: "observed",
				authority: "controlled-replay",
				environment: {
					id: `${capture.manifest.platform}-${capture.manifest.architecture}`,
					platform: capture.manifest.platform,
					architecture: capture.manifest.architecture,
					isolation: "process"
				},
				limitations: capture.limitations
			});
		};
		createProcessScenarioPlanEvidence = (scenario, platform) => {
			const plan = processScenarioPlanSchema.parse({
				status: "planned",
				scenario: processScenarioPlanProjection(scenario),
				ambient_environment: "inherited-at-run"
			});
			return createEvidence(unknownTarget("not-observed"), PROCESS_PROVIDER, {
				predicateType: PROCESS_SCENARIO_PLAN_EVIDENCE.predicate,
				operation: PROCESS_SCENARIO_PLAN_EVIDENCE.operation,
				parameters: processEvidenceParameters(scenario, platform),
				result: plan,
				confidence: "derived",
				authority: "controlled-replay",
				environment: null,
				limitations: ["Planned only; no process was launched. Runtime behavior, exit, cleanup and the inherited ambient environment remain unobserved."]
			});
		};
	})))();
}

//#endregion
export { createProcessCaptureEvidence, createProcessScenarioPlanEvidence, init_ProcessEvidence, parseProcessCaptureEvidence, wrongWorkflowIssueFacts };