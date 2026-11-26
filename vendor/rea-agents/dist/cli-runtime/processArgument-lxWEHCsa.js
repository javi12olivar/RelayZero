import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { z } from "zod";

//#region dist/domain/process/processArgument.js
var processArgumentSchema;
function init_processArgument() {
	return (init_processArgument = __esmMin((() => {
		processArgumentSchema = z.string().regex(/^[^\x00]*$/u, "NUL is not an argument character");
	})))();
}

//#endregion
export { init_processArgument, processArgumentSchema };