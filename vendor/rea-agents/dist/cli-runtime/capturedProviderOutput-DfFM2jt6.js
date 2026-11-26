import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/process/capturedProviderOutput.js
var capturedProviderOutput, providerResultDiagnostics;
function init_capturedProviderOutput() {
	return (init_capturedProviderOutput = __esmMin((() => {
		capturedProviderOutput = (snapshot) => ({
			stdout: snapshot.stdout.text,
			stderr: snapshot.stderr.text,
			stdout_bytes: snapshot.stdout.observedBytes,
			stderr_bytes: snapshot.stderr.observedBytes,
			exit_code: snapshot.exitCode ?? null,
			signal: snapshot.signal ?? null,
			truncated: snapshot.diagnosticTruncated === true
		});
		providerResultDiagnostics = ({ stdout, stderr, truncated }) => ({
			stdout,
			stderr,
			truncated
		});
	})))();
}

//#endregion
export { capturedProviderOutput, init_capturedProviderOutput, providerResultDiagnostics };