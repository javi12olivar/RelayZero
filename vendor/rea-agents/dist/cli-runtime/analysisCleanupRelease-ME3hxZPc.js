import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/analysisCleanupRelease.js
var AnalysisCleanupRelease;
function init_analysisCleanupRelease() {
	return (init_analysisCleanupRelease = __esmMin((() => {
		AnalysisCleanupRelease = class {
			#released = false;
			get cleanupReleased() {
				return this.#released;
			}
			/** Let `error` report this owner's release whenever it is asked. */
			bind(error) {
				return error.bindCleanupReleaseClaim(this);
			}
			/**
			* Let a failure reported by another producer read this release only when
			* its cleanup has no owner of its own; an owned failure keeps reading that
			* owner, so a later release of its resources is not hidden behind this one.
			*/
			bindUnowned(error) {
				return error.cleanupIncomplete && !error.hasCleanupOwner ? this.bind(error) : error;
			}
			confirm() {
				this.#released = true;
			}
		};
	})))();
}

//#endregion
export { AnalysisCleanupRelease, init_analysisCleanupRelease };