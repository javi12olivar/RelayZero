import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ArtifactResourceScope, init_ArtifactResourceScope, init_resources } from "./resources-B3P64jvH.js";

//#region dist/providers/ResponseBodyCleanup.js
var ResponseBodyCleanup;
function init_ResponseBodyCleanup() {
	return (init_ResponseBodyCleanup = __esmMin((() => {
		init_resources();
		ResponseBodyCleanup = class {
			resource;
			changed;
			#scope = new ArtifactResourceScope();
			constructor(resource, changed = () => {}) {
				this.resource = resource;
				this.changed = changed;
			}
			get cleanupResources() {
				return this.#scope.cleanupResources;
			}
			cancel(cancel) {
				let state = { status: "pending" };
				const owner = {
					kind: "lease",
					resource: this.resource,
					lease: { release: async () => {
						if (state.status === "pending") throw new Error(`${this.resource} cancellation is still pending`);
						if (state.status === "failed") throw state.cause;
					} }
				};
				this.#scope.retain(owner);
				this.changed();
				void Promise.resolve().then(cancel).then(async () => {
					state = { status: "done" };
					await this.#scope.release(owner);
					this.changed();
				}, (cause) => {
					state = {
						status: "failed",
						cause
					};
					this.changed();
				}).catch(() => undefined);
			}
			close() {
				return this.#scope.close();
			}
		};
	})))();
}

//#endregion
export { ResponseBodyCleanup, init_ResponseBodyCleanup };