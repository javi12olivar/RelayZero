import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { n as init_errorMessage, t as errorMessage } from "./errorMessage-rfGn5D1_.js";
import { z } from "zod";

//#region dist/domain/validationFailure.js
var firstValidationIssue, describeValidationFailure;
function init_validationFailure() {
	return (init_validationFailure = __esmMin((() => {
		init_errorMessage();
		firstValidationIssue = (cause) => {
			if (!(cause instanceof z.ZodError)) return undefined;
			const [first, ...rest] = cause.issues;
			if (first === undefined) return undefined;
			const constraint = first.code === "custom" ? first.params?.["constraint"] : undefined;
			return {
				path: first.path.map((key) => typeof key === "number" ? key : String(key)),
				constraint: typeof constraint === "string" ? constraint : undefined,
				remainingIssueCount: rest.length
			};
		};
		describeValidationFailure = (cause) => {
			if (!(cause instanceof z.ZodError)) return errorMessage(cause);
			const [first, ...rest] = cause.issues;
			const location = first === undefined || first.path.length === 0 ? "the document root" : first.path.map(String).join(".");
			return `at ${location}: ${first?.message ?? "invalid value"}${rest.length === 0 ? "" : ` (${String(rest.length)} more issues)`}`;
		};
	})))();
}

//#endregion
export { firstValidationIssue as n, init_validationFailure as r, describeValidationFailure as t };