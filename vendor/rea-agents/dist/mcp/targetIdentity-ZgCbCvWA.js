import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { R as digestSchema, it as sha256Hex, rt as init_sha256Hex, z as init_digests } from "./canonicalDigest-DUQN3Yyz.js";
import { z } from "zod";
import canonicalize from "canonicalize";

//#region dist/domain/rawBinary.js
var BINARY_ARCHITECTURES, binaryArchitectureSchema, RAW_BINARY_ENTRY_POINT, rawBinaryEntryPointSchema, parseRawBinaryEntryPoint, validateRawBinaryLength, addressWidth, armThumbEntryNote, admitRawBinary, rawBinarySelectionError;
function init_rawBinary() {
	return (init_rawBinary = __esmMin((() => {
		init_result();
		BINARY_ARCHITECTURES = [
			"x86",
			"x86_64",
			"arm",
			"arm64",
			"6502",
			"m68k"
		];
		binaryArchitectureSchema = z.enum(BINARY_ARCHITECTURES);
		RAW_BINARY_ENTRY_POINT = /^0x[0-9A-Fa-f]{1,16}$/u;
		rawBinaryEntryPointSchema = z.string().regex(RAW_BINARY_ENTRY_POINT, { message: "entry_point must be a hexadecimal address of the form 0x…" });
		parseRawBinaryEntryPoint = (value) => {
			if (!RAW_BINARY_ENTRY_POINT.test(value)) return err("entry_point must be a hexadecimal address of the form 0x…");
			const parsed = BigInt(value);
			return ok({
				source: value,
				canonical: `0x${parsed.toString(16)}`,
				value: parsed
			});
		};
		validateRawBinaryLength = (length) => Number.isSafeInteger(length) && length >= 1 ? ok(null) : err("raw-binary requires at least one file byte");
		addressWidth = (architecture) => architecture === "6502" ? 65535n : architecture === "x86" || architecture === "arm" || architecture === "m68k" ? 4294967295n : 18446744073709551615n;
		armThumbEntryNote = "; an odd address can be a Thumb function pointer with bit 0 set, but raw-binary arm decodes ARM state only, so a Thumb entry is unsupported and the entry was not adjusted";
		admitRawBinary = (input) => {
			const architecture = binaryArchitectureSchema.safeParse(input.architecture);
			if (!architecture.success) return err({
				reason: "raw-binary format requires architecture (x86, x86_64, arm, arm64, 6502, or m68k)",
				constraint: "load_selection_rejected"
			});
			if (typeof input.entryPoint !== "string") return err({
				reason: "raw-binary format requires entry_point as a hexadecimal address of the form 0x…",
				constraint: "load_selection_rejected"
			});
			const entry = parseRawBinaryEntryPoint(input.entryPoint);
			if (!entry.ok) return err({
				reason: entry.error,
				constraint: "load_selection_rejected"
			});
			if ((architecture.data === "arm" || architecture.data === "arm64") && entry.value.value % 4n !== 0n) return err({
				reason: `raw-binary ${architecture.data} entry_point ${entry.value.canonical} must be 4-byte aligned${architecture.data === "arm" && entry.value.value % 2n === 1n ? armThumbEntryNote : ""}`,
				constraint: "load_selection_rejected"
			});
			if (architecture.data === "m68k" && entry.value.value % 2n !== 0n) return err({
				reason: `raw-binary m68k entry_point ${entry.value.canonical} must be 2-byte aligned`,
				constraint: "load_selection_rejected"
			});
			const length = validateRawBinaryLength(input.fileBytes);
			if (!length.ok) return err({
				reason: length.error,
				constraint: "file_format_rejected"
			});
			const last = entry.value.value + BigInt(input.fileBytes) - 1n;
			const max = addressWidth(architecture.data);
			if (entry.value.value > max || last > max) return err({
				reason: `raw-binary mapping from ${entry.value.canonical} must fit in the ${architecture.data} address width`,
				constraint: "load_selection_rejected"
			});
			return ok({
				architecture: architecture.data,
				entryPoint: entry.value.canonical,
				entryPointSource: entry.value.source
			});
		};
		rawBinarySelectionError = (input) => {
			const hasArchitecture = input.architecture !== undefined;
			const hasEntry = input.entryPoint !== undefined;
			if (input.format === "gamecube-dol") {
				return hasArchitecture ? "format=gamecube-dol takes its architecture from the DOL header; omit architecture" : undefined;
			}
			if (input.format === "raw-binary") {
				if (!hasArchitecture || !hasEntry) return "format=raw-binary requires architecture and entry_point";
				return undefined;
			}
			if (hasArchitecture || hasEntry) return "architecture and entry_point apply only with format=raw-binary";
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/targetIdentity.js
var flashOffsetSchema, fatCpuSchema, fileTargetSelectionSchema, fileTargetIdentitySchema, unknownTargetReasonSchema, unknownTargetIdentitySchema, unknownTarget, urlOrigin, urlTargetIdentitySchema, processTargetIdentitySchema, debuggerSessionKindSchema, sessionTargetIdentitySchema, nonFileTargetIdentitySchema, universalSliceSelection, binaryTargetSelection, binaryTargetIdentity, targetIdentityKey, sameTargetIdentity;
function init_targetIdentity() {
	return (init_targetIdentity = __esmMin((() => {
		init_digests();
		init_rawBinary();
		init_sha256Hex();
		flashOffsetSchema = z.number().int().min(0).max(4294967295).nullable();
		fatCpuSchema = z.number().int().min(0).max(4294967295).nullable();
		fileTargetSelectionSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("entry-point"),
				entry_point: rawBinaryEntryPointSchema
			}),
			z.strictObject({
				kind: z.literal("esp-flash"),
				flash_offset: flashOffsetSchema,
				partition_table_offset: flashOffsetSchema
			}),
			z.strictObject({
				kind: z.literal("universal-slice"),
				offset: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER),
				size: z.number().int().min(1).max(Number.MAX_SAFE_INTEGER),
				cpu_type: fatCpuSchema,
				cpu_subtype: fatCpuSchema
			})
		]);
		fileTargetIdentitySchema = z.strictObject({
			kind: z.literal("file"),
			sha256: digestSchema,
			format: z.string().min(1),
			architecture: z.string().min(1).nullable(),
			selection: fileTargetSelectionSchema.nullable()
		});
		unknownTargetReasonSchema = z.enum([
			"derived-from-linked-evidence",
			"not-observed",
			"unsupported-subject",
			"withheld-by-caller"
		]);
		unknownTargetIdentitySchema = z.strictObject({
			kind: z.literal("unknown"),
			reason: unknownTargetReasonSchema
		});
		unknownTarget = (reason) => ({
			kind: "unknown",
			reason
		});
		urlOrigin = (parsed) => parsed.origin === "null" ? null : parsed.origin;
		urlTargetIdentitySchema = z.strictObject({
			kind: z.literal("url"),
			url: z.string().min(1),
			origin: z.string().min(1).nullable()
		}).superRefine((identity, context) => {
			const parsed = URL.parse(identity.url);
			if (parsed === null) {
				context.addIssue({
					code: "custom",
					path: ["url"],
					message: "A URL target identity must be a parseable URL"
				});
				return;
			}
			if (parsed.username !== "" || parsed.password !== "") context.addIssue({
				code: "custom",
				path: ["url"],
				message: "A URL target identity must not carry userinfo"
			});
			if (urlOrigin(parsed) !== identity.origin) context.addIssue({
				code: "custom",
				path: ["origin"],
				message: "A URL target identity's origin must be its URL's origin"
			});
		});
		processTargetIdentitySchema = z.strictObject({
			kind: z.literal("process"),
			pid: z.int().positive(),
			start_time: z.string().min(1),
			executable_sha256: digestSchema.nullable()
		});
		debuggerSessionKindSchema = z.enum(["rizin", "gdb"]);
		sessionTargetIdentitySchema = z.strictObject({
			kind: z.literal("session"),
			session_kind: debuggerSessionKindSchema,
			id: z.string().min(1),
			target: z.union([fileTargetIdentitySchema, unknownTargetIdentitySchema])
		});
		nonFileTargetIdentitySchema = z.union([
			unknownTargetIdentitySchema,
			urlTargetIdentitySchema,
			processTargetIdentitySchema
		]);
		universalSliceSelection = (slice, declarations) => {
			const declared = declarations?.find((candidate) => candidate.offset === slice.offset && candidate.size === slice.size);
			return {
				kind: "universal-slice",
				offset: slice.offset,
				size: slice.size,
				cpu_type: declared?.cpuType ?? null,
				cpu_subtype: declared?.cpuSubtype ?? null
			};
		};
		binaryTargetSelection = (target) => target.format === "raw-binary" || target.format === "gamecube-dol" ? {
			kind: "entry-point",
			entry_point: target.entryPoint
		} : target.format === "esp-flash-image" ? {
			kind: "esp-flash",
			flash_offset: target.espFlash.flashOffset,
			partition_table_offset: target.espFlash.partitionTableOffset
		} : target.format === "mach-o-universal" ? universalSliceSelection(target.universalSlice, target.universalSlices) : null;
		binaryTargetIdentity = (target) => ({
			kind: "file",
			sha256: target.sha256,
			format: target.format,
			architecture: target.architecture ?? null,
			selection: binaryTargetSelection(target)
		});
		targetIdentityKey = (identity) => {
			const encoded = canonicalize(identity);
			if (encoded === undefined) throw new TypeError("RFC 8785 canonicalization rejected a target identity");
			return `target_${sha256Hex(encoded)}`;
		};
		sameTargetIdentity = (left, right) => targetIdentityKey(left) === targetIdentityKey(right);
	})))();
}

//#endregion
export { rawBinarySelectionError as _, init_targetIdentity as a, sessionTargetIdentitySchema as c, RAW_BINARY_ENTRY_POINT as d, admitRawBinary as f, rawBinaryEntryPointSchema as g, parseRawBinaryEntryPoint as h, fileTargetSelectionSchema as i, unknownTarget as l, init_rawBinary as m, binaryTargetSelection as n, nonFileTargetIdentitySchema as o, binaryArchitectureSchema as p, fileTargetIdentitySchema as r, sameTargetIdentity as s, binaryTargetIdentity as t, unknownTargetIdentitySchema as u };