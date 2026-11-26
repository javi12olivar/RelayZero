import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { ArtifactReaderFailure, ArtifactResourceScope, init_ArtifactReader, init_ArtifactResourceScope, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_cliResources, ownCliProcessResource } from "./cliResources-Bw83MG-j.js";
import { init_analysisEvidenceDelivery, publishCliAnalysisEvidence } from "./contractCommand-Di2ugplH.js";
import { JAVASCRIPT_APPLICATION_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { init_javascriptSourceSelection, javaScriptSourcePathsSchema } from "./javascriptSourceSelection-CZ4gLy-b.js";
import { init_cliJsonInput, parseCliJsonInput } from "./cliJsonInput-DxRb6ijM.js";
import { createProgressReporter, init_ProgressReporter } from "./ProgressReporter-B-0u8rUo.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { init_cliProgress, writeCliProgressLine } from "./cliProgress-BqujgRoY.js";
import { z } from "zod";

//#region dist/cli/javascriptApplicationAnalysis.js
var OPERATION, cliJavaScriptSourcePaths, CliJavaScriptAnalysisHost, processJavaScriptAnalysis, runCliJavaScriptApplicationAnalysis, cliError, javaScriptApplicationCliProjection, runJavaScriptApplicationCommand;
function init_javascriptApplicationAnalysis() {
	return (init_javascriptApplicationAnalysis = __esmMin((() => {
		init_analysisEvidenceDelivery();
		init_investigationProviders();
		init_ProgressReporter();
		init_resources();
		init_analysisErrorCleanup();
		init_ProviderOperationExecution();
		init_analysisErrorProjection();
		init_providerCleanupError();
		init_inputIssueProjection();
		init_javascriptSourceSelection();
		init_cliJsonInput();
		init_cliProgress();
		init_cliResources();
		OPERATION = "analyze_javascript_application";
		cliJavaScriptSourcePaths = async (sourcePath, sourcePathsJson, signal) => {
			if (sourcePathsJson === undefined) return {
				ok: true,
				value: sourcePath
			};
			const input = await parseCliJsonInput(sourcePathsJson, OPERATION, signal);
			if (!input.ok) return input;
			const parsed = javaScriptSourcePathsSchema.safeParse(input.value);
			if (!parsed.success) return {
				ok: false,
				error: cliError(analysisInputErrorFromIssues(OPERATION, parsed.error.issues.map((issue) => ({
					...issue,
					path: ["source_paths_json", ...issue.path]
				})), { source_paths_json: input.value }))
			};
			return {
				ok: true,
				value: [...sourcePath ?? [], ...parsed.data]
			};
		};
		CliJavaScriptAnalysisHost = class {
			#retainedScope;
			/** One shutdown shared by the exit callback and the dispatch `finally`. */
			#closing;
			scope() {
				this.#retainedScope ??= new ArtifactResourceScope();
				return this.#retainedScope;
			}
			/**
			* Stop this host's worker. Overlapping callers share the attempt in flight.
			* The scope stays owned when shutdown fails, so the next call retries.
			*/
			close() {
				if (this.#closing !== undefined) return this.#closing;
				const scope = this.#retainedScope;
				if (scope === undefined) return Promise.resolve();
				let published;
				published = scope.close().then(() => {
					if (this.#retainedScope === scope) this.#retainedScope = undefined;
				}).finally(() => {
					if (this.#closing === published) this.#closing = undefined;
				});
				this.#closing = published;
				return published;
			}
		};
		processJavaScriptAnalysis = new CliJavaScriptAnalysisHost();
		ownCliProcessResource("javascript-analysis", () => processJavaScriptAnalysis.close());
		runCliJavaScriptApplicationAnalysis = async (input, environment, signal, delivery, host = processJavaScriptAnalysis) => {
			const [{ analyzeJavaScriptApplication }, { javascriptSourceAnalysis }] = await Promise.all([import("./application__javascript__JavaScriptApplicationService-CykpM3f6.js"), import("./composition__javascriptSourceAnalysis-BRb8kH8w.js")]);
			const progress = createProgressReporter(async (update) => {
				writeCliProgressLine(update);
			}, { minimumIntervalMs: 0 });
			const resources = host.scope();
			const result = await analyzeJavaScriptApplication(input, resources, {
				sourceAnalysis: javascriptSourceAnalysis,
				environment,
				progress,
				...signal === undefined ? {} : { signal }
			});
			try {
				await resources.retryCleanup();
			} catch (cause) {
				const cleanup = ArtifactReaderFailure.cleanupObservation(cause, "JavaScript application resources");
				const failure = new ProviderCleanupError(JAVASCRIPT_APPLICATION_PROVIDER.id, cleanup.resources, { reason: cleanup.reason }, {
					cause,
					operation: "analyze_javascript_application"
				});
				const completed = result.ok ? completeProviderEvidence(result.value, signal) : result;
				if (completed.ok) failure.retainPartialObservation(completed.value);
				return cliError(completed.ok ? failure : analysisErrorWithCleanupFailure(completed.error, failure, "analyze_javascript_application"));
			}
			const completed = result.ok ? completeProviderEvidence(result.value, signal) : result;
			const finalized = completed.ok ? completed : {
				ok: false,
				error: cliError(completed.error)
			};
			return delivery === undefined ? finalized.ok ? finalized.value : finalized.error : publishCliAnalysisEvidence(finalized, {
				...delivery,
				operation: "analyze_javascript_application",
				signal: signal ?? new AbortController().signal
			});
		};
		cliError = (error) => ({
			error: "JavaScript application analysis failed",
			...projectAnalysisError(error)
		});
		javaScriptApplicationCliProjection = (target) => ({
			positionals: ["input_path"],
			callerPaths: ["input_path"],
			fields: {
				input_path: {
					name: "path",
					description: target
				},
				format: {
					name: "artifactFormat",
					description: "Application artifact format"
				},
				source_paths: { name: "sourcePath" },
				integrity_policy: { description: "Behavior when declared application integrity does not match" },
				semantic_precision: { description: "Inline JSON or JSON file with per-source semantic_precision evaluator budgets; independent of graph retention and worker memory." }
			},
			jsonInputs: { semantic_precision: "semanticPrecision must be inline JSON or a JSON file path" },
			cliOptions: { sourcePathsJson: z.string().min(1).optional().describe("Inline JSON array or JSON file path of exact inventoried file paths relative to the application root, selected after any --source-path values. Use a file for selections that exceed the host command-line limit.") }
		});
		runJavaScriptApplicationCommand = (environment) => async (input, { signal, delivery, cliOptions }) => {
			const sourcePaths = await cliJavaScriptSourcePaths(input.source_paths, cliOptions.sourcePathsJson, signal);
			if (!sourcePaths.ok) return sourcePaths.error;
			return runCliJavaScriptApplicationAnalysis({
				...input,
				...sourcePaths.value === undefined ? {} : { source_paths: sourcePaths.value }
			}, environment, signal, delivery);
		};
	})))();
}

//#endregion
export { init_javascriptApplicationAnalysis, javaScriptApplicationCliProjection, runJavaScriptApplicationCommand };