import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { z } from "zod";

//#region dist/domain/native/pseudocodeAbsence.js
var pseudocodeAbsenceSchema;
function init_pseudocodeAbsence() {
	return (init_pseudocodeAbsence = __esmMin((() => {
		pseudocodeAbsenceSchema = z.discriminatedUnion("kind", [z.strictObject({
			kind: z.literal("provider-failure"),
			reason: z.string().min(1)
		}), z.strictObject({
			kind: z.literal("not-in-export"),
			reason: z.string().min(1)
		})]);
	})))();
}

//#endregion
export { init_pseudocodeAbsence, pseudocodeAbsenceSchema };