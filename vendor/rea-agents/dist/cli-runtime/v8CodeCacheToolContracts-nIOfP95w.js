import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_localPath } from "./jsonSerialization-DAF9DVXC.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { evidenceEffects, evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/domain/v8/v8CodeCache.js
var uint, offset, MAX_INSPECT_V8_CODE_CACHE_FILE_BYTES, V8_CODE_CACHE_HEADER_BYTES, V8_CODE_CACHE_NARROW_HEADER_BYTES, V8_CODE_CACHE_HEADER_SIZES, V8_CODE_CACHE_MIN_HEADER_BYTES, V8_CODE_CACHE_MAGIC_HIGH, MAX_INSPECT_V8_CODE_CACHE_STRINGS, MIN_INSPECT_V8_CODE_CACHE_STRING_BYTES, MAX_INSPECT_V8_CODE_CACHE_MIN_STRING_BYTES, MAX_INSPECT_V8_CODE_CACHE_STRING_BYTES, V8_CODE_CACHE_COMPILE_FUNCTION_BIT, V8_CODE_CACHE_MODULE_BIT, V8_CODE_CACHE_LEGACY_MODULE_BIT, V8_CODE_CACHE_SOURCE_LENGTH_MASK, inspectV8CodeCacheInputSchema, V8_CODE_CACHE_FIELD_STATUSES, headerFieldSchema, headerSchema, embeddedStringSchema, v8CodeCacheSchema;
function init_v8CodeCache() {
	return (init_v8CodeCache = __esmMin((() => {
		init_digests();
		init_localPath();
		uint = z.number().int().min(0).max(4294967295);
		offset = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
		MAX_INSPECT_V8_CODE_CACHE_FILE_BYTES = 67108864;
		V8_CODE_CACHE_HEADER_BYTES = 32;
		V8_CODE_CACHE_NARROW_HEADER_BYTES = 28;
		V8_CODE_CACHE_HEADER_SIZES = [28, 32];
		V8_CODE_CACHE_MIN_HEADER_BYTES = Math.min(...V8_CODE_CACHE_HEADER_SIZES);
		V8_CODE_CACHE_MAGIC_HIGH = 49374;
		MAX_INSPECT_V8_CODE_CACHE_STRINGS = 65536;
		MIN_INSPECT_V8_CODE_CACHE_STRING_BYTES = 4;
		MAX_INSPECT_V8_CODE_CACHE_MIN_STRING_BYTES = 256;
		MAX_INSPECT_V8_CODE_CACHE_STRING_BYTES = 4096;
		V8_CODE_CACHE_COMPILE_FUNCTION_BIT = 536870912;
		V8_CODE_CACHE_MODULE_BIT = 1073741824;
		V8_CODE_CACHE_LEGACY_MODULE_BIT = 2147483648;
		V8_CODE_CACHE_SOURCE_LENGTH_MASK = 536870911;
		inspectV8CodeCacheInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to the selected V8 code cache (.jsc) file"),
			max_file_bytes: z.number().int().min(36).max(MAX_INSPECT_V8_CODE_CACHE_FILE_BYTES).default(32 * 1024 * 1024).describe("Maximum stable artifact bytes to read; exceeding the budget fails without partial success"),
			max_strings: z.number().int().min(1).max(MAX_INSPECT_V8_CODE_CACHE_STRINGS).default(4096).describe("Maximum embedded byte-pattern observations to report; exceeding the budget fails without partial success"),
			min_string_bytes: z.number().int().min(4).max(256).default(4).describe("Shortest printable run reported as one observation")
		});
		V8_CODE_CACHE_FIELD_STATUSES = [
			"confirmed",
			"inferred",
			"unconfirmed"
		];
		headerFieldSchema = z.strictObject({
			/** Byte offset of this word inside the container header. */
			offset: uint,
			/** The observed little-endian value. */
			value: uint,
			role: z.string().min(1),
			status: z.enum(V8_CODE_CACHE_FIELD_STATUSES)
		});
		headerSchema = z.strictObject({
			/** The full observed magic word. Its low half is a V8 build fingerprint. */
			magic: uint,
			/** High half of the magic, the only part stable across V8 builds. */
			magic_build_stable: uint,
			/** Every header word this container carries, in container order. */
			fields: z.array(headerFieldSchema).min(7).max(8),
			/** Bytes this reader treats as header before the payload begins. */
			header_bytes: uint,
			/** Source length in UTF-16 code units, as recorded by the producer, if determinable. */
			source_length: uint.nullable(),
			/**
			* Producer family observed from the source-length word.
			*
			* V8 sets bit 29 for `vm.compileFunction` and bit 30 for `vm.SourceTextModule`, the two
			* upper bits the source-length mask leaves out. Measured on Node 24.22.1: a module cache
			* reads `0x40000013` for a 19-unit source, so a producer check that only looks at the
			* function bit reports a module cache as a plain script.
			*
			* `unknown` is the unflagged case, and it is not `vm.Script` for certain: whether V8
			* marks a function cache at all is a build detail. Measured on Node 24.22.1 a
			* `vm.compileFunction` cache reads `0x20000004` for a 4-unit source while Node 22.23.4
			* writes `0x00000004` for the same call. An unflagged word is therefore either
			* `vm.Script` or a `vm.compileFunction` cache from a build that does not mark it, and
			* the file carries nothing that separates the two.
			*/
			producer: z.enum([
				"script",
				"compile_function",
				"module",
				"unknown"
			])
		});
		embeddedStringSchema = z.strictObject({
			/** Absolute byte offset in the selected file. */
			offset,
			bytes: uint,
			/** How many bytes were retained; shorter than `bytes` when the run was truncated. */
			retained_bytes: uint,
			truncated: z.boolean(),
			text: z.string()
		});
		v8CodeCacheSchema = z.strictObject({
			artifact: z.strictObject({
				path: absoluteLocalPathStringSchema,
				sha256: digestSchema,
				bytes: offset
			}),
			header: headerSchema,
			payload: z.strictObject({
				offset,
				bytes: offset,
				sha256: digestSchema,
				/** Header bytes after the container header that are not part of the declared payload. */
				trailing_bytes: offset
			}),
			/**
			* Byte-pattern observations inside the payload. Presence of a literal here is not
			* proof V8 retained it as a heap string, and absence is not proof it did not.
			*/
			embedded_strings: z.array(embeddedStringSchema),
			coverage: z.strictObject({
				status: z.literal("complete"),
				/** Payload bytes examined for printable runs. */
				scanned_bytes: offset,
				strings: uint
			}),
			limitations: z.array(z.string().min(1)).min(1)
		}).superRefine((report, context) => {
			if (!V8_CODE_CACHE_HEADER_SIZES.includes(report.header.header_bytes)) context.addIssue({
				code: "custom",
				path: ["header", "header_bytes"],
				message: "This reader only accepts the container header sizes it admits."
			});
			if (report.header.fields.length * 4 !== report.header.header_bytes || report.header.fields.some(({ offset }, index) => offset !== index * 4)) context.addIssue({
				code: "custom",
				path: ["header", "fields"],
				message: "The reported words must cover the declared header in byte order."
			});
			if (report.header.magic_build_stable !== 49374) context.addIssue({
				code: "custom",
				path: ["header", "magic_build_stable"],
				message: "The admitted magic must carry the stable V8 code cache high half."
			});
			if (report.payload.offset !== report.header.header_bytes) context.addIssue({
				code: "custom",
				path: ["payload", "offset"],
				message: "The payload must start at the end of the declared header."
			});
			if (report.payload.offset + report.payload.bytes !== report.artifact.bytes) context.addIssue({
				code: "custom",
				path: ["payload", "bytes"],
				message: "The declared payload length must reach the end of the selected file."
			});
			if (report.coverage.strings !== report.embedded_strings.length) context.addIssue({
				code: "custom",
				path: ["coverage", "strings"],
				message: "Observation coverage disagrees with the listed embedded strings."
			});
			if (report.coverage.scanned_bytes !== report.payload.bytes) context.addIssue({
				code: "custom",
				path: ["coverage", "scanned_bytes"],
				message: "Complete coverage must examine every declared payload byte."
			});
			report.embedded_strings.forEach((observation, index) => {
				if (observation.retained_bytes > observation.bytes) context.addIssue({
					code: "custom",
					path: [
						"embedded_strings",
						index,
						"retained_bytes"
					],
					message: "A retained prefix cannot exceed the observed run length."
				});
				if (observation.truncated !== observation.retained_bytes < observation.bytes) context.addIssue({
					code: "custom",
					path: [
						"embedded_strings",
						index,
						"truncated"
					],
					message: "Truncation must agree with the retained byte count."
				});
				if (observation.offset < report.payload.offset || observation.offset + observation.bytes > report.artifact.bytes) context.addIssue({
					code: "custom",
					path: [
						"embedded_strings",
						index,
						"offset"
					],
					message: "An observation must lie inside the declared payload."
				});
			});
		});
	})))();
}

//#endregion
//#region dist/contracts/v8/v8CodeCacheToolContracts.js
var V8_CODE_CACHE_TOOL_CONTRACTS;
function init_v8CodeCacheToolContracts() {
	return (init_v8CodeCacheToolContracts = __esmMin((() => {
		init_v8CodeCache();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		V8_CODE_CACHE_TOOL_CONTRACTS = [{
			name: "inspect_v8_code_cache",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("inspect_v8_code_cache", evidenceEffects),
			kind: "artifact-provider",
			description: "Inspect a local bytenode .jsc or compatible V8 code-cache container as static bytes, without V8, bytenode, child processes or decompilation. Returns artifact identity, header words with confirmed/inferred roles, producer family, recorded source length, payload identity and printable sequences with file ranges. Only pinned header/magic and exact payload-length layouts are admitted; unknown or malformed layouts fail, not partial-parse. Most header roles are version-dependent inferences, not a fixed ABI. Payload strings are byte patterns, not parsed heap objects; missing literals do not prove absence. The payload is not source: logic recovery needs a separate version-pinned decompiler. Resource refusals remain explicit.",
			inputSchema: inspectV8CodeCacheInputSchema,
			outputSchema: evidenceResultOf(v8CodeCacheSchema),
			examples: [{
				title: "Identify the V8 producer of a bytenode code cache",
				input: { path: "/artifacts/module.jsc" }
			}, {
				title: "Locate retained config keys in the payload",
				input: {
					path: "/artifacts/module.jsc",
					min_string_bytes: 8,
					max_strings: 256
				}
			}]
		}];
	})))();
}

//#endregion
export { MAX_INSPECT_V8_CODE_CACHE_FILE_BYTES, MAX_INSPECT_V8_CODE_CACHE_STRINGS, MAX_INSPECT_V8_CODE_CACHE_STRING_BYTES, V8_CODE_CACHE_COMPILE_FUNCTION_BIT, V8_CODE_CACHE_HEADER_SIZES, V8_CODE_CACHE_LEGACY_MODULE_BIT, V8_CODE_CACHE_MAGIC_HIGH, V8_CODE_CACHE_MIN_HEADER_BYTES, V8_CODE_CACHE_MODULE_BIT, V8_CODE_CACHE_SOURCE_LENGTH_MASK, V8_CODE_CACHE_TOOL_CONTRACTS, init_v8CodeCache, init_v8CodeCacheToolContracts, inspectV8CodeCacheInputSchema, v8CodeCacheSchema };