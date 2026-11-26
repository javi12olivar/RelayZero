import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";

//#region dist/domain/internalInvariant.js
var InternalInvariantError, invariantViolation;
function init_internalInvariant() {
	return (init_internalInvariant = __esmMin((() => {
		InternalInvariantError = class extends Error {
			_tag = "InternalInvariantError";
			constructor(message, options) {
				super(message, options);
				this.name = "InternalInvariantError";
			}
		};
		invariantViolation = (message, options) => new InternalInvariantError(message, options);
	})))();
}

//#endregion
//#region dist/kernel/errorMessage.js
var errorMessage;
function init_errorMessage() {
	return (init_errorMessage = __esmMin((() => {
		errorMessage = (cause) => cause instanceof Error ? cause.message : String(cause);
	})))();
}

//#endregion
export { invariantViolation as a, init_internalInvariant as i, init_errorMessage as n, InternalInvariantError as r, errorMessage as t };