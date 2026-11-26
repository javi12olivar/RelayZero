import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_jsonValue, jsonObjectSchema } from "./jsonSerialization-DAF9DVXC.js";
import { z } from "zod";

//#region dist/domain/jsonRecord.js
var jsonRecordSchema;
function init_jsonRecord() {
	return (init_jsonRecord = __esmMin((() => {
		init_jsonValue();
		jsonRecordSchema = (valueSchema, keySchema = z.string()) => {
			const projection = z.record(keySchema, valueSchema);
			const schema = jsonObjectSchema.transform((value, context) => {
				const entries = [];
				let invalid = false;
				for (const [key, entry] of Object.entries(value)) {
					const parsedKey = keySchema.safeParse(key);
					if (!parsedKey.success) {
						invalid = true;
						context.addIssue({
							code: "invalid_key",
							origin: "record",
							issues: parsedKey.error.issues,
							path: [key]
						});
						continue;
					}
					const parsed = valueSchema.safeParse(entry);
					if (parsed.success) entries.push([parsedKey.data, parsed.data]);
					else {
						invalid = true;
						for (const issue of parsed.error.issues) context.addIssue({
							...issue,
							path: [key, ...issue.path]
						});
					}
				}
				return invalid ? z.NEVER : Object.fromEntries(entries);
			});
			const JsonRecord = z.core.$constructor("JsonRecord", (instance, definition) => {
				z.ZodPipe.init(instance, definition);
				instance._zod.processJSONSchema = (context, json, params) => projection._zod.processJSONSchema(context, json, params);
			});
			return new JsonRecord(schema._zod.def);
		};
	})))();
}

//#endregion
export { init_jsonRecord, jsonRecordSchema };