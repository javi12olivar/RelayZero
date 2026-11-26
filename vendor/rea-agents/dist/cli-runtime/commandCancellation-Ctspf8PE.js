import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { CallerAbort, init_analysisErrorCore } from "./jsonSerialization-DAF9DVXC.js";

//#region dist/cli/commandCancellation.js
var CommandCancellationScope, withCommandCancellation;
function init_commandCancellation() {
	return (init_commandCancellation = __esmMin((() => {
		init_analysisErrorCore();
		CommandCancellationScope = class {
			host;
			#controller = new AbortController();
			#exitStatus;
			#finished = false;
			#closed = false;
			constructor(host = process) {
				this.host = host;
				host.on("SIGINT", this.#interrupt);
				host.on("SIGTERM", this.#terminate);
			}
			get signal() {
				return this.#controller.signal;
			}
			get exitStatus() {
				return this.#exitStatus;
			}
			#interrupt = () => this.#abort("SIGINT", 130);
			#terminate = () => this.#abort("SIGTERM", 143);
			#abort(signal, status) {
				this.#exitStatus ??= status;
				this.#controller.abort(CallerAbort.forProcessSignal(signal));
				if (this.#finished) this.finish();
			}
			/** Publish the disposition while a failed resource close still owns signals. */
			finish() {
				this.#finished = true;
				if (this.#exitStatus !== undefined) this.host.exitCode = this.#exitStatus;
			}
			/** Release signal ownership only after the resource owner confirms cleanup. */
			close() {
				if (this.#closed) return;
				this.#closed = true;
				this.host.off("SIGINT", this.#interrupt);
				this.host.off("SIGTERM", this.#terminate);
				this.finish();
			}
		};
		withCommandCancellation = async (operation, host = process) => {
			const scope = new CommandCancellationScope(host);
			try {
				return await operation(scope.signal);
			} finally {
				scope.close();
			}
		};
	})))();
}

//#endregion
export { CommandCancellationScope, init_commandCancellation, withCommandCancellation };