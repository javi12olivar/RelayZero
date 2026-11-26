import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { cliCompletionShell, init_cliBuiltinArguments, isProjectScopedAmpRegistration, parseCliGlobalArguments } from "./cliBuiltinArguments-CqSJFnNt.js";
import { cliConfigurationError, init_cliConfiguration, init_cliOutput, parseCliOutputArguments, readCliOutputArguments, renderCliOutputArgumentError, renderEmptyFilteredCliOutput, renderVersionReport } from "./cliOutput-B7h8Duho.js";

//#region dist/cliOneShot.js
var AMP_PROJECT_SCOPE_REFUSAL, runOneShotCli;
function init_cliOneShot() {
	return (init_cliOneShot = __esmMin((() => {
		init_cliBuiltinArguments();
		init_cliOutput();
		AMP_PROJECT_SCOPE_REFUSAL = "Amp does not support project-scoped registration. Run without --no-global to register Amp globally, or select a client with project settings. No client settings were changed.";
		runOneShotCli = async (arguments_, host) => {
			const global = cliCompletionShell(host.environment) === undefined ? parseCliGlobalArguments(arguments_) : undefined;
			const cliArguments = global?.arguments ?? arguments_;
			const outputOptions = global === undefined ? parseCliOutputArguments([]) : readCliOutputArguments(global);
			const outputArguments = outputOptions.validation;
			const versionOutput = renderVersionReport(outputOptions, host.runtime, host.stdoutIsTerminal);
			const configurationError = cliConfigurationError(host.environment);
			if (configurationError !== undefined && (global === undefined || global.command[0] !== "doctor")) {
				host.writeStderr(`${configurationError}\n`);
				host.setExitCode(1);
				return;
			}
			if (!outputArguments.ok) {
				host.writeStdout(renderCliOutputArgumentError(outputArguments));
				host.setExitCode(1);
				return;
			}
			if (versionOutput !== undefined) {
				host.writeStdout(versionOutput);
				return;
			}
			if (global !== undefined && isProjectScopedAmpRegistration(global)) {
				const refusalFormat = outputOptions.format;
				if (refusalFormat === "json" || refusalFormat === "jsonl" || refusalFormat === "yaml") {
					host.writeStdout(renderCliOutputArgumentError({
						format: refusalFormat,
						code: "AMP_PROJECT_SCOPE_UNSUPPORTED",
						message: AMP_PROJECT_SCOPE_REFUSAL
					}));
				} else {
					host.writeStderr(`${AMP_PROJECT_SCOPE_REFUSAL}\n`);
				}
				host.setExitCode(1);
				return;
			}
			const { loadCliRuntime } = await import("./cli__cliLoader-BI4MOEE2.js");
			const runtime = await loadCliRuntime(global, host.environment);
			host.ownCliResources(runtime.closeCliResources);
			const { createCliResultOutput, cliOutputCancellationStatus } = await import("./cliResultOutput.js");
			let wroteOutput = false;
			const resultOutput = createCliResultOutput(outputOptions, host.resultDestination);
			try {
				await runtime.createCli(resultOutput).serve([...cliArguments], {
					stdout: (output) => {
						if (resultOutput?.handled) {
							if (resultOutput.failed && !host.stdoutClosed()) host.writeStderr(output);
							return;
						}
						if (output.length > 0) wroteOutput = true;
						host.writeStdout(output);
					},
					exit: (code) => {
						host.exit(typeof code === "number" ? code : 0, async () => resultOutput?.finish());
					}
				});
			} catch (cause) {
				const cancelledStatus = cliOutputCancellationStatus(cause);
				if (cancelledStatus !== undefined) {
					host.exit(cancelledStatus, async () => resultOutput?.finish());
					return;
				}
				if (wroteOutput) throw cause;
				const recovered = await resultOutput?.recoverFormattingFailure(cause).catch((writeFailure) => {
					if (!host.stdoutClosed()) throw writeFailure;
					return true;
				});
				if (!recovered) throw cause;
				host.setExitCode(host.stdoutClosed() ? host.closedStdoutStatus : 1);
			}
			if (!wroteOutput && !resultOutput?.handled) host.writeStdout(renderEmptyFilteredCliOutput(outputOptions) ?? "");
			if (!host.exitRequested()) await resultOutput?.finish();
		};
	})))();
}

//#endregion
init_cliOneShot();
export { runOneShotCli };