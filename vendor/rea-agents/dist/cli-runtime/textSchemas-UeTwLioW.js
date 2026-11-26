import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { z } from "zod";

//#region dist/domain/textSchemas.js
var nonEmptyTextSchema;
function init_textSchemas() {
	return (init_textSchemas = __esmMin((() => {
		nonEmptyTextSchema = z.string().min(1);
	})))();
}

//#endregion
export { init_textSchemas, nonEmptyTextSchema };