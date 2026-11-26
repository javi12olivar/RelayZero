import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/zip/zipExtraFields.js
var ZIP_EXTRA_FIELD, lastZipExtraField;
function init_zipExtraFields() {
	return (init_zipExtraFields = __esmMin((() => {
		init_result();
		ZIP_EXTRA_FIELD = {
			headerBytes: 4,
			idOffset: 0,
			sizeOffset: 2,
			unicodePath: 28789
		};
		lastZipExtraField = (reader, start, end, kind) => {
			let selected;
			for (let at = start; at + ZIP_EXTRA_FIELD.headerBytes <= end;) {
				const payload = at + ZIP_EXTRA_FIELD.headerBytes;
				const next = payload + reader.u16(at + ZIP_EXTRA_FIELD.sizeOffset);
				if (next > end) return err("overrun");
				if (reader.u16(at + ZIP_EXTRA_FIELD.idOffset) === kind) selected = {
					start: payload,
					end: next
				};
				at = next;
			}
			return ok(selected);
		};
	})))();
}

//#endregion
export { ZIP_EXTRA_FIELD, init_zipExtraFields, lastZipExtraField };