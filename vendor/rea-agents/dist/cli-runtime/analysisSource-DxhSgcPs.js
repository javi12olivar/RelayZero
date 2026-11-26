import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_localPath } from "./jsonSerialization-DAF9DVXC.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { z } from "zod";

//#region dist/domain/analysisSource.js
var analysisSourceDescriptorSchema;
function init_analysisSource() {
	return (init_analysisSource = __esmMin((() => {
		init_digests();
		init_localPath();
		analysisSourceDescriptorSchema = z.discriminatedUnion("kind", [z.strictObject({
			kind: z.literal("file-range"),
			path: absoluteLocalPathStringSchema,
			sha256: digestSchema,
			byte_offset: z.int().nonnegative(),
			byte_length: z.int().nonnegative()
		}), z.strictObject({ kind: z.literal("single-function-decompile") })]);
	})))();
}

//#endregion
export { analysisSourceDescriptorSchema, init_analysisSource };