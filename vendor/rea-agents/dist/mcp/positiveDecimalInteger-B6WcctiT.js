import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { z } from "zod";

//#region dist/config/positiveDecimalInteger.js
var decimalInteger, positiveDecimalIntegerSchema;
function init_positiveDecimalInteger() {
	return (init_positiveDecimalInteger = __esmMin((() => {
		decimalInteger = /^[1-9]\d*$/u;
		positiveDecimalIntegerSchema = (minimum, maximum, constraint) => z.string().regex(decimalInteger, { error: constraint }).refine((value) => {
			if (!decimalInteger.test(value)) return true;
			const parsed = BigInt(value);
			return parsed >= BigInt(minimum) && parsed <= BigInt(maximum);
		}, { error: constraint }).transform(Number);
	})))();
}

//#endregion
export { positiveDecimalIntegerSchema as n, init_positiveDecimalInteger as t };