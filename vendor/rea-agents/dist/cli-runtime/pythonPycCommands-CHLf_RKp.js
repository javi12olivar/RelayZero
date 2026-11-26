import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisOutputError, AnalysisResourceConstraintError, decodeLimit, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_parseFailure, init_sha256Hex, malformedInput, sha256Hex, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { init_parseFailureAnalysisError, isParseLimit, parseFailureAnalysisError, parseLimitConstraint } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactReaderFailure, ArtifactResourceScope, artifactFilePrimaryFacts, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_readStableArtifact, init_resources, projectArtifactCloseFailure, projectOwnedArtifactIdentityFailure, projectSelectedArtifactFileFailure, projectStableArtifactFailure, readStableArtifact, stableArtifactInputFailure } from "./resources-B3P64jvH.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { contractNamed, deliverWithService, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { PYTHON_PYC_LIMIT_MAXIMA, PYTHON_PYC_SLICE_MAGIC, init_pythonPyc as init_pythonPyc$1, inspectPythonPycInputSchema, interpretPythonPycHeaderFlags, pythonPycMarshalProfile, pythonPycSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { MarshalReader, init_marshalReader, init_pythonBytecodeIdentity, observePythonBytecodePrefix, smallBitLength } from "./marshalReader-Df4KzAdd.js";
import { PYTHON_PYC_TOOL_CONTRACTS, init_pythonPycToolContracts } from "./pythonPycToolContracts-D5lpyL_R.js";
import { createHash } from "node:crypto";

//#region dist/application/python/PythonPycService.js
var OPERATION$1, PythonPycService;
function init_PythonPycService() {
	return (init_PythonPycService = __esmMin((() => {
		init_analysisErrorCore();
		init_evidence();
		init_pythonPyc$1();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		OPERATION$1 = "inspect_python_pyc";
		PythonPycService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close();
			}
			async inspect(rawInput, options) {
				const input = parseAnalysisInput(OPERATION$1, rawInput, inspectPythonPycInputSchema, options?.signal);
				if (!input.ok) return input;
				const result = await this.provider.inspect(input.value, options);
				if (!result.ok) return result;
				const report = pythonPycSchema.safeParse(result.value);
				if (!report.success || report.data.artifact.path !== input.value.path || report.data.artifact.bytes > input.value.max_file_bytes || report.data.coverage.objects > input.value.max_objects || report.data.coverage.marshal_depth > input.value.max_depth) return err(new AnalysisOutputError(OPERATION$1, "Python pyc provider returned malformed output or changed artifact identity."));
				const value = report.data;
				return completeProviderEvidence(createEvidence({
					path: value.artifact.path,
					format: "file",
					sha256: value.artifact.sha256
				}, this.provider.identity, {
					operation: OPERATION$1,
					parameters: input.value,
					result: value,
					confidence: "observed",
					limitations: value.limitations,
					locations: [
						{
							kind: "artifact-path",
							path: value.artifact.path
						},
						{
							kind: "file-offset-range",
							start: 0,
							end: 16
						},
						{
							kind: "file-offset-range",
							start: 16,
							end: value.artifact.bytes
						}
					]
				}), options?.signal);
			}
		};
	})))();
}

//#endregion
//#region dist/python/PythonPycProviderIdentity.js
var PYTHON_PYC_PROVIDER_IDENTITY;
function init_PythonPycProviderIdentity() {
	return (init_PythonPycProviderIdentity = __esmMin((() => {
		PYTHON_PYC_PROVIDER_IDENTITY = {
			id: "rea-python-pyc",
			name: "REA CPython pyc parser",
			version: "1"
		};
	})))();
}

//#endregion
//#region dist/python/PythonPyc.errors.js
var PYTHON_PYC_FORMAT, LIMIT_CONTROLS, pythonPycLimit, pythonPycLimitControls;
function init_PythonPyc_errors() {
	return (init_PythonPyc_errors = __esmMin((() => {
		init_parseFailure();
		PYTHON_PYC_FORMAT = "python-pyc";
		LIMIT_CONTROLS = {
			max_objects: ["max_objects"],
			max_depth: ["max_depth"],
			max_string_bytes: ["max_string_bytes"],
			reported_string_bytes: ["max_file_bytes"],
			reported_rows: ["max_objects"],
			nested_code_steps: ["max_objects", "max_depth"],
			nested_code_references: ["max_objects", "max_depth"],
			marshal_key_steps: ["max_objects"],
			marshal_key_bytes: ["max_file_bytes"]
		};
		pythonPycLimit = (name, maximum, detail) => decodeLimit(PYTHON_PYC_FORMAT, detail, {
			name,
			maximum
		});
		pythonPycLimitControls = (boundary) => Object.entries(LIMIT_CONTROLS).find(([name]) => name === boundary)?.[1] ?? [];
	})))();
}

//#endregion
//#region dist/python/PythonPycBytecodeEquality.js
var inlineCacheProfiles, INLINE_CACHE_ENTRIES_BY_MAGIC, pythonPycBytecodeIdentity;
function init_PythonPycBytecodeEquality() {
	return (init_PythonPycBytecodeEquality = __esmMin((() => {
		inlineCacheProfiles = (magics, entries) => {
			const profile = new Map(entries);
			return magics.map((magic) => [magic, profile]);
		};
		INLINE_CACHE_ENTRIES_BY_MAGIC = new Map([
			...inlineCacheProfiles([3494, 3495], [
				[25, 4],
				[60, 1],
				[92, 1],
				[95, 4],
				[106, 4],
				[107, 2],
				[116, 5],
				[122, 1],
				[160, 10],
				[166, 1],
				[171, 4]
			]),
			...inlineCacheProfiles([
				3500,
				3501,
				3502
			], [
				[25, 4],
				[60, 1],
				[92, 1],
				[95, 4],
				[106, 4],
				[107, 2],
				[116, 5],
				[122, 1],
				[160, 10],
				[171, 4]
			]),
			...inlineCacheProfiles([3503], [
				[25, 4],
				[60, 1],
				[92, 1],
				[95, 4],
				[106, 4],
				[107, 2],
				[116, 5],
				[122, 1],
				[160, 9],
				[171, 4]
			]),
			...inlineCacheProfiles([3504], [
				[25, 4],
				[60, 1],
				[92, 1],
				[95, 4],
				[106, 9],
				[107, 2],
				[116, 5],
				[122, 1],
				[171, 4]
			]),
			...inlineCacheProfiles([
				3505,
				3506,
				3507,
				3508,
				3509,
				3510,
				3511,
				3512,
				3513,
				3514
			], [
				[25, 4],
				[60, 1],
				[92, 1],
				[93, 1],
				[95, 4],
				[106, 9],
				[107, 2],
				[116, 5],
				[122, 1],
				[171, 4]
			]),
			...inlineCacheProfiles([3515], [
				[25, 4],
				[60, 1],
				[92, 1],
				[93, 1],
				[95, 4],
				[106, 9],
				[107, 1],
				[116, 5],
				[122, 1],
				[171, 4]
			]),
			...inlineCacheProfiles([
				3516,
				3517,
				3518
			], [
				[25, 4],
				[60, 1],
				[92, 1],
				[93, 1],
				[95, 4],
				[106, 9],
				[107, 1],
				[116, 5],
				[122, 1],
				[141, 1],
				[171, 4]
			]),
			...inlineCacheProfiles([3519, 3520], [
				[25, 4],
				[60, 1],
				[92, 1],
				[93, 1],
				[95, 4],
				[106, 9],
				[107, 1],
				[116, 5],
				[122, 1],
				[123, 1],
				[141, 1],
				[171, 4]
			]),
			...inlineCacheProfiles([3521, 3522], [
				[25, 4],
				[60, 1],
				[92, 1],
				[93, 1],
				[95, 4],
				[106, 9],
				[107, 1],
				[116, 4],
				[122, 1],
				[123, 1],
				[141, 1],
				[171, 4]
			]),
			...inlineCacheProfiles([3523], [
				[25, 4],
				[60, 1],
				[92, 1],
				[93, 1],
				[95, 4],
				[106, 9],
				[107, 1],
				[116, 4],
				[122, 1],
				[123, 1],
				[171, 4]
			]),
			...inlineCacheProfiles([3524], [
				[25, 1],
				[60, 1],
				[92, 1],
				[93, 1],
				[95, 4],
				[106, 9],
				[107, 1],
				[116, 4],
				[122, 1],
				[123, 1],
				[171, 4]
			]),
			...inlineCacheProfiles([
				3525,
				3526,
				3527
			], [
				[25, 1],
				[60, 1],
				[92, 1],
				[93, 1],
				[95, 4],
				[106, 9],
				[107, 1],
				[116, 4],
				[122, 1],
				[123, 1],
				[171, 3]
			]),
			...inlineCacheProfiles([3528, 3529], [
				[25, 1],
				[60, 1],
				[92, 1],
				[93, 1],
				[95, 4],
				[106, 9],
				[107, 1],
				[116, 4],
				[122, 1],
				[123, 1],
				[141, 9],
				[171, 3]
			]),
			...inlineCacheProfiles([3530, 3531], [
				[25, 1],
				[60, 1],
				[92, 1],
				[93, 1],
				[95, 4],
				[106, 9],
				[107, 1],
				[116, 4],
				[122, 1],
				[123, 1],
				[141, 1],
				[171, 3]
			]),
			...inlineCacheProfiles([
				3550,
				3551,
				3552,
				3553,
				3554,
				3555,
				3556,
				3557,
				3558
			], [
				[25, 1],
				[60, 1],
				[92, 1],
				[93, 1],
				[95, 4],
				[106, 9],
				[107, 1],
				[116, 4],
				[122, 1],
				[123, 1],
				[140, 1],
				[141, 1],
				[171, 3]
			]),
			...inlineCacheProfiles([3559], [
				[12, 1],
				[53, 1],
				[56, 3],
				[67, 1],
				[75, 3],
				[97, 1],
				[114, 1],
				[123, 1],
				[129, 9],
				[150, 4],
				[154, 1],
				[168, 1],
				[173, 4],
				[183, 1]
			]),
			...inlineCacheProfiles([3560], [
				[12, 1],
				[54, 1],
				[57, 3],
				[68, 1],
				[76, 3],
				[98, 1],
				[115, 1],
				[124, 1],
				[130, 9],
				[151, 4],
				[155, 1],
				[169, 1],
				[174, 4],
				[184, 1]
			]),
			...inlineCacheProfiles([3561], [
				[12, 1],
				[54, 1],
				[57, 3],
				[68, 1],
				[76, 3],
				[98, 1],
				[115, 1],
				[124, 1],
				[130, 9],
				[151, 4],
				[155, 1],
				[161, 1],
				[162, 1],
				[163, 1],
				[164, 1],
				[169, 1],
				[174, 4],
				[184, 1]
			]),
			...inlineCacheProfiles([3562], [
				[5, 1],
				[39, 1],
				[40, 3],
				[45, 1],
				[53, 3],
				[57, 1],
				[71, 1],
				[76, 1],
				[82, 9],
				[91, 4],
				[93, 1],
				[97, 1],
				[98, 1],
				[99, 1],
				[100, 1],
				[104, 1],
				[108, 4],
				[117, 1]
			]),
			...inlineCacheProfiles([
				3563,
				3564,
				3565,
				3566,
				3567,
				3568
			], [
				[5, 1],
				[39, 1],
				[40, 3],
				[45, 1],
				[53, 3],
				[58, 1],
				[72, 1],
				[77, 1],
				[82, 9],
				[91, 4],
				[93, 1],
				[97, 1],
				[98, 1],
				[99, 1],
				[100, 1],
				[104, 1],
				[108, 4],
				[117, 1]
			]),
			...inlineCacheProfiles([
				3569,
				3570,
				3571
			], [
				[5, 1],
				[39, 1],
				[40, 3],
				[45, 1],
				[53, 3],
				[58, 1],
				[59, 1],
				[72, 1],
				[77, 1],
				[82, 9],
				[91, 4],
				[93, 1],
				[97, 1],
				[98, 1],
				[99, 1],
				[100, 1],
				[104, 1],
				[108, 4],
				[117, 1]
			]),
			...inlineCacheProfiles([3627], [
				[38, 1],
				[39, 3],
				[44, 5],
				[52, 3],
				[55, 3],
				[56, 1],
				[57, 1],
				[70, 1],
				[75, 1],
				[80, 9],
				[92, 4],
				[96, 1],
				[100, 1],
				[101, 1],
				[102, 1],
				[103, 1],
				[106, 1],
				[110, 4],
				[119, 1]
			]),
			...inlineCacheProfiles([3666], [
				[4, 1],
				[36, 1],
				[37, 3],
				[42, 5],
				[50, 3],
				[53, 3],
				[54, 1],
				[55, 1],
				[68, 1],
				[70, 1],
				[74, 1],
				[79, 9],
				[91, 4],
				[95, 1],
				[99, 1],
				[100, 1],
				[101, 1],
				[102, 1],
				[105, 1],
				[109, 4],
				[118, 1],
				[128, 1]
			])
		]);
		pythonPycBytecodeIdentity = (bytecode, magic, rawSha256) => {
			const caches = INLINE_CACHE_ENTRIES_BY_MAGIC.get(magic);
			if (caches === undefined) return `${bytecode.length}:${rawSha256}`;
			const digest = createHash("sha256");
			let activeStart = 0;
			for (let offset = 0; offset < bytecode.length;) {
				const opcode = bytecode[offset] ?? 0;
				const afterOpcode = offset + 2;
				const cacheBytes = (caches.get(opcode) ?? 0) * 2;
				offset = afterOpcode + cacheBytes;
				if (cacheBytes > 0) {
					digest.update(bytecode.subarray(activeStart, afterOpcode));
					activeStart = offset;
				}
			}
			if (activeStart < bytecode.length) {
				digest.update(bytecode.subarray(activeStart));
			}
			return `${bytecode.length}:${digest.digest("hex")}`;
		};
	})))();
}

//#endregion
//#region dist/python/PythonPycParser.js
var TYPE_NULL, TYPE_NONE, TYPE_FALSE, TYPE_TRUE, TYPE_STOPITER, TYPE_ELLIPSIS, TYPE_INT64, TYPE_FLOAT_TEXT, TYPE_FLOAT, TYPE_COMPLEX_TEXT, TYPE_COMPLEX, TYPE_DICT, TYPE_CODE, TYPE_SET, TYPE_FROZENSET, TYPE_SLICE, TYPES_WITHOUT_REFERENCE_SLOTS, CO_VARARGS, CO_VARKEYWORDS, CO_NOFREE, CO_FAST_LOCAL, EMPTY_CODES, isContainer, containerChildren, malformed, fastLocalCount, unsupported, emptyPythonPycWork, digests, sha256, parsePythonPyc, PycMarshalReader, jsonFloat, flattenCode, asBytes, asString, asStringWithRaw, asTuple, constSummaries, summarizeConst, buildConstSummary, MARSHAL_FLOAT, parseMarshalFloat;
function init_PythonPycParser() {
	return (init_PythonPycParser = __esmMin((() => {
		init_pythonBytecodeIdentity();
		init_marshalReader();
		init_pythonPyc$1();
		init_budget();
		init_parseFailure();
		init_binaryContainer();
		init_PythonPyc_errors();
		init_PythonPycBytecodeEquality();
		init_sha256Hex();
		TYPE_NULL = 48;
		TYPE_NONE = 78;
		TYPE_FALSE = 70;
		TYPE_TRUE = 84;
		TYPE_STOPITER = 83;
		TYPE_ELLIPSIS = 46;
		TYPE_INT64 = 73;
		TYPE_FLOAT_TEXT = 102;
		TYPE_FLOAT = 103;
		TYPE_COMPLEX_TEXT = 120;
		TYPE_COMPLEX = 121;
		TYPE_DICT = 123;
		TYPE_CODE = 99;
		TYPE_SET = 60;
		TYPE_FROZENSET = 62;
		TYPE_SLICE = 58;
		TYPES_WITHOUT_REFERENCE_SLOTS = new Set([
			TYPE_NULL,
			TYPE_NONE,
			TYPE_FALSE,
			TYPE_TRUE,
			TYPE_STOPITER,
			TYPE_ELLIPSIS
		]);
		CO_VARARGS = 4;
		CO_VARKEYWORDS = 8;
		CO_NOFREE = 64;
		CO_FAST_LOCAL = 32;
		EMPTY_CODES = [];
		isContainer = (value) => value.kind === "tuple" || value.kind === "list" || value.kind === "set" || value.kind === "frozenset" || value.kind === "dict" || value.kind === "slice";
		containerChildren = (value) => {
			if (value.kind === "dict") {
				const children = [];
				for (const [key, mapped] of value.items) children.push(key, mapped);
				return children;
			}
			if (value.kind === "tuple" || value.kind === "list" || value.kind === "set" || value.kind === "frozenset" || value.kind === "slice") return value.items;
			return [];
		};
		malformed = (message) => {
			throw malformedInput(PYTHON_PYC_FORMAT, message);
		};
		fastLocalCount = (kinds) => {
			let count = 0;
			for (let index = 0; index < kinds.length; index += 1) {
				const kind = kinds[index] ?? 0;
				if ((kind & CO_FAST_LOCAL) !== 0) count += 1;
			}
			return count;
		};
		unsupported = (message) => {
			throw unsupportedInput(PYTHON_PYC_FORMAT, message);
		};
		emptyPythonPycWork = () => ({
			digestedBytes: 0,
			constSummaries: 0,
			listedChildren: 0,
			nestedSteps: 0,
			keySteps: 0,
			keyBytes: 0,
			codeVisits: 0
		});
		digests = new WeakMap();
		sha256 = (bytes, work) => {
			const cached = digests.get(bytes);
			if (cached !== undefined) return cached;
			work.digestedBytes += bytes.length;
			const digest = sha256Hex(bytes);
			digests.set(bytes, digest);
			return digest;
		};
		parsePythonPyc = (bytes, artifact, input, work = emptyPythonPycWork()) => {
			if (bytes.length !== artifact.bytes) malformed("Selected artifact length disagrees with the retained bytes.");
			const prefix = observePythonBytecodePrefix(bytes);
			if (prefix.state === "incomplete") return malformed("Selected file is shorter than a pyc magic.");
			if (prefix.state === "invalid-crlf") return malformed("Pyc magic is not a little-endian integer followed by CR LF.");
			const { magic, identity } = prefix;
			const mapped = pythonPycMarshalProfile(magic);
			if (identity !== null && identity.headerBytes !== 16) return unsupported(`Pyc magic ${magic} uses an unsupported ${identity.headerBytes}-byte CPython header.`);
			if (bytes.length < 16) malformed("Selected file is shorter than a 16-byte CPython 3.7+ pyc header.");
			const header = new BinaryReader(bytes, true, PYTHON_PYC_FORMAT);
			const flags = header.u32(4);
			const { hashBased, checkSource, inactiveCheckSource, hasUnknownFlags } = interpretPythonPycHeaderFlags(flags);
			if (mapped === null || identity === null) {
				const headerFacts = `16-byte header, flags 0x${flags.toString(16)}, ${hashBased ? "hash-based" : "timestamp-based"}`;
				return unsupported(identity === null ? `Pyc magic ${magic} is not a pinned CPython identity, so its header cannot be qualified; standalone marshal decoding is pinned for CPython 3.7–3.13 and the 3.14 and 3.15 magics 3627 and 3666.` : `CPython ${identity.pythonVersion} header is recognized (magic ${magic}, ${headerFacts}), but no marshal code layout is pinned for that version, so its code objects cannot be decoded. Standalone marshal decoding is pinned for CPython 3.7–3.13 and the 3.14 and 3.15 magics 3627 and 3666.`);
			}
			const headerFields = {
				magic,
				python_version: identity.pythonVersion,
				code_layout: mapped.code_layout,
				flags,
				hash_based: hashBased,
				check_source: checkSource,
				source_hash_hex: hashBased ? bytes.subarray(8, 16).toString("hex") : null,
				source_mtime: hashBased ? null : header.u32(8),
				source_size: hashBased ? null : header.u32(12)
			};
			const marshal = bytes.subarray(16);
			const reader = new PycMarshalReader(marshal, mapped.code_layout, magic, input, mapped.negative_code_fields === "rejected", magic >= PYTHON_PYC_SLICE_MAGIC, work);
			const root = reader.readObject(0);
			if (reader.offset !== marshal.length) malformed("Marshal stream has trailing bytes after the top-level object.");
			if (root.kind !== "code") return malformed("Top-level marshal object is not a code object.");
			reader.finishCodes();
			const codeObjects = flattenCode(root.value, work);
			return {
				artifact: {
					path: artifact.path,
					sha256: artifact.sha256,
					bytes: artifact.bytes
				},
				header: headerFields,
				code_objects: codeObjects,
				coverage: {
					status: "complete",
					objects: reader.objects,
					code_objects: codeObjects.length,
					marshal_bytes: marshal.length,
					marshal_depth: reader.depthReached
				},
				limitations: [
					"Bytecode is retained as length and SHA-256 only; this workflow does not decompile, disassemble, or recover source.",
					"The selected file is not executed and CPython is not invoked.",
					hashBased ? "source_hash_hex is the PEP 552 header field; the original .py is not read." : "source_mtime and source_size are header fields; they do not prove a matching .py is present.",
					"python_version is the pinned CPython magic table for this header, not a runtime interpreter.",
					...mapped.negative_code_fields === "revision-dependent" && codeObjects.some((code) => code.stacksize < 0 || code.flags < 0) ? ["Magic 3410 is shared by CPython revisions with different negative co_stacksize/co_flags constructor checks; these raw values are preserved, but this header cannot establish constructor acceptance."] : [],
					...inactiveCheckSource ? ["The stored check_source bit is set but applies only to hash-based pycs. This pyc carries timestamp metadata."] : [],
					...hasUnknownFlags ? [`Header flags ${flags} include unrecognized bits; only hash-based and check-source bits are decoded.`] : []
				]
			};
		};
		PycMarshalReader = class extends MarshalReader {
			layout;
			magic;
			input;
			rejectNegativeCodeFields;
			acceptSlices;
			work;
			/** Name and identifier bytes the report carries across all code objects. */
			#reportedStringBytes;
			/** Const summaries the report copies, including tables shared by TYPE_REF. */
			#reportedCopies;
			/** Bytes of hash-key descriptors materialized for set and dict rules. */
			#keyBytes;
			/** Identity keys for NaN values, which are not equal to themselves. */
			#identities = new WeakMap();
			#identityNext = 0;
			/** One Python equality key per object. Null means the value is unhashable. */
			#keyCache = new WeakMap();
			/** Constant keys keep signed zeroes distinct and give cycles an identity. */
			#constCache = new WeakMap();
			/** Interned descriptors so equal values share one token within this walk. */
			#keyTokens = new Map();
			#keyTokenNext = 0;
			/**
			* Explicit key-walk steps, `max_objects * 8`. Stream `max_depth` does not
			* bound reference chains.
			*/
			#keySteps;
			/** One code-equality key per code object. Empty while that key is in progress. */
			#codeKeys = new WeakMap();
			#codeIdentities = new WeakMap();
			#codeEquality = new WeakMap();
			/** Completed Python hashability checks per code object. */
			#codeHashable = new WeakMap();
			/** Tuples whose items are still being read; CPython cannot hash them yet. */
			#readingTuples = new WeakSet();
			/** Code objects whose const summaries wait until the graph is fully decoded. */
			#codes = [];
			/**
			* Nested code objects reached from one container. Pure wrappers store the
			* child's array; fresh arrays are counted so copies cannot grow without a
			* bound. Absent while a container is still on the explicit walk stack.
			*/
			#nestedCache = new WeakMap();
			/** Walk steps and retained code references share max_objects * max_depth. */
			#nestedSteps;
			#nestedRetained;
			constructor(bytes, layout, magic, input, rejectNegativeCodeFields, acceptSlices, work) {
				super(bytes, {
					format: PYTHON_PYC_FORMAT,
					limits: {
						maxObjects: input.max_objects,
						maxDepth: input.max_depth,
						maxStringBytes: input.max_string_bytes
					},
					previewLimit: 80,
					publishContainers: "before-items"
				});
				this.layout = layout;
				this.magic = magic;
				this.input = input;
				this.rejectNegativeCodeFields = rejectNegativeCodeFields;
				this.acceptSlices = acceptSlices;
				this.work = work;
				this.#nestedSteps = new Budget(input.max_objects * input.max_depth);
				this.#nestedRetained = new Budget(input.max_objects * input.max_depth);
				this.#reportedStringBytes = new Budget(input.max_file_bytes);
				this.#reportedCopies = new Budget(input.max_objects);
				this.#keyBytes = new Budget(input.max_file_bytes);
				this.#keySteps = new Budget(input.max_objects * 8);
			}
			wrap(value) {
				return value;
			}
			limitExceeded(exceeded) {
				const { max_objects, max_depth, max_string_bytes } = this.input;
				switch (exceeded.limit) {
					case "objects": throw pythonPycLimit("max_objects", max_objects, `Marshal object count exceeds max_objects ${max_objects}.`);
					case "depth": throw pythonPycLimit("max_depth", max_depth, `Marshal nesting exceeds max_depth ${max_depth}.`);
					case "string-bytes": throw pythonPycLimit("max_string_bytes", max_string_bytes, `Marshal string of ${exceeded.amount} bytes exceeds max_string_bytes ${max_string_bytes}.`);
					default: throw pythonPycLimit("max_string_bytes", max_string_bytes, `Marshal long of ${exceeded.amount} digit bytes exceeds max_string_bytes ${max_string_bytes}.`);
				}
			}
			reservesReference(type) {
				return !TYPES_WITHOUT_REFERENCE_SLOTS.has(type);
			}
			/**
			* A slice with a TYPE_NULL member yields no object, as in CPython, so its
			* reserved slot stays invalid for later references.
			*/
			isAbsent(value) {
				return value.kind === "null";
			}
			sequenceItem(item) {
				if (item.kind === "null") malformed("NULL object in marshal data for sequence.");
			}
			/** Tuples whose items are still being read cannot be hashed yet. */
			sequenceReading(value, reading) {
				if (value.kind !== "tuple") return;
				if (reading) this.#readingTuples.add(value);
				else this.#readingTuples.delete(value);
			}
			readExtended(type, depth, slot) {
				switch (type) {
					case TYPE_NULL: return { kind: "null" };
					case TYPE_NONE: return { kind: "none" };
					case TYPE_FALSE: return {
						kind: "bool",
						value: false
					};
					case TYPE_TRUE: return {
						kind: "bool",
						value: true
					};
					case TYPE_STOPITER: return { kind: "stopiter" };
					case TYPE_ELLIPSIS: return { kind: "ellipsis" };
					case TYPE_INT64: {
						const value = this.i64();
						return {
							kind: "int",
							value,
							bits: smallBitLength(value)
						};
					}
					case TYPE_FLOAT_TEXT: return {
						kind: "float",
						value: this.textFloat()
					};
					case TYPE_FLOAT: return {
						kind: "float",
						value: this.f64()
					};
					case TYPE_COMPLEX_TEXT: return {
						kind: "complex",
						real: this.textFloat(),
						imag: this.textFloat()
					};
					case TYPE_COMPLEX: return {
						kind: "complex",
						real: this.f64(),
						imag: this.f64()
					};
					case TYPE_SET: return this.setValue("set", this.nonNegativeInt32("Marshal set length"), depth, slot);
					case TYPE_FROZENSET: return this.setValue("frozenset", this.nonNegativeInt32("Marshal frozenset length"), depth, slot);
					case TYPE_DICT: return this.dict(depth, slot);
					case TYPE_CODE: return {
						kind: "code",
						value: this.code(depth)
					};
					case TYPE_SLICE:
						if (!this.acceptSlices) return malformed(`Unsupported marshal type 0x3a before CPython magic ${PYTHON_PYC_SLICE_MAGIC}.`);
						return this.slice(depth);
					default: return super.readExtended(type, depth, slot);
				}
			}
			code(depth) {
				const argcount = this.nonNegativeInt32("co_argcount");
				const posonlyargcount = this.layout === "py37" ? null : this.nonNegativeInt32("co_posonlyargcount");
				if (posonlyargcount !== null && argcount < posonlyargcount) malformed("co_argcount is smaller than co_posonlyargcount.");
				const kwonlyargcount = this.nonNegativeInt32("co_kwonlyargcount");
				const nlocals = this.layout === "py311" ? null : this.nonNegativeInt32("co_nlocals");
				const stacksize = this.i32();
				if (this.rejectNegativeCodeFields && stacksize < 0) malformed("co_stacksize is negative.");
				const flags = this.i32();
				if (this.rejectNegativeCodeFields && flags < 0) malformed("co_flags is negative.");
				const bytecode = asBytes(this.readObject(depth + 1), "co_code");
				if (this.layout === "py311" && bytecode.length % 2 !== 0) malformed("co_code is malformed.");
				const constsTuple = this.readObject(depth + 1);
				const consts = asTuple(constsTuple, "co_consts");
				this.#chargeConsts(consts.length);
				const names = this.#nameTable(asTuple(this.readObject(depth + 1), "co_names"));
				let varnames = null;
				let freevars = null;
				let cellvars = null;
				let localsplusnames = null;
				let localspluskinds_hex = null;
				if (this.layout === "py311") {
					localsplusnames = this.#nameTable(asTuple(this.readObject(depth + 1), "co_localsplusnames"));
					const localspluskinds = asBytes(this.readObject(depth + 1), "co_localspluskinds");
					if (localspluskinds.length !== localsplusnames.display.length) malformed("co_localspluskinds length does not match co_localsplusnames.");
					localspluskinds_hex = localspluskinds.toString("hex");
					this.#rejectUndersizedLocals(argcount, kwonlyargcount, flags, fastLocalCount(localspluskinds));
				} else {
					varnames = this.#nameTable(asTuple(this.readObject(depth + 1), "co_varnames"));
					freevars = this.#nameTable(asTuple(this.readObject(depth + 1), "co_freevars"));
					cellvars = this.#nameTable(asTuple(this.readObject(depth + 1), "co_cellvars"));
					this.#rejectUndersizedLocals(argcount, kwonlyargcount, flags, varnames.display.length);
				}
				const filename = asString(this.readObject(depth + 1), "co_filename");
				const nameObject = this.readObject(depth + 1);
				const codeName = asStringWithRaw(nameObject, "co_name");
				const name = codeName.value;
				const qualname = this.layout === "py311" ? asString(this.readObject(depth + 1), "co_qualname") : null;
				const firstlineno = this.i32();
				const linetable = asBytes(this.readObject(depth + 1), "co_linetable");
				const exceptiontable = this.layout === "py311" ? asBytes(this.readObject(depth + 1), "co_exceptiontable") : Buffer.alloc(0);
				this.#reportStrings([
					name,
					qualname ?? "",
					filename,
					...names.display,
					...varnames?.display ?? [],
					...freevars?.display ?? [],
					...cellvars?.display ?? [],
					...localsplusnames?.display ?? [],
					localspluskinds_hex ?? ""
				]);
				const node = {
					name,
					qualname,
					filename,
					firstlineno,
					argcount,
					posonlyargcount,
					kwonlyargcount,
					nlocals,
					stacksize,
					flags,
					names: names.display,
					varnames: varnames?.display ?? null,
					freevars: freevars?.display ?? null,
					cellvars: cellvars?.display ?? null,
					localsplusnames: localsplusnames?.display ?? null,
					localspluskinds_hex,
					bytecode: {
						bytes: bytecode.length,
						sha256: sha256(bytecode, this.work)
					},
					consts: [],
					nested: []
				};
				const effectiveFlags = this.layout === "py311" ? flags : (freevars?.display.length ?? 0) === 0 && (cellvars?.display.length ?? 0) === 0 ? flags | CO_NOFREE : flags & ~CO_NOFREE;
				this.#codeEquality.set(node, {
					consts,
					constsTuple,
					effectiveFlags,
					bytecode,
					name: codeName.raw,
					nameTables: localsplusnames !== null ? [names.equality, localsplusnames.equality] : [
						names.equality,
						varnames?.equality ?? [],
						freevars?.equality ?? [],
						cellvars?.equality ?? []
					],
					linetable: `${linetable.length}:${sha256(linetable, this.work)}`,
					exceptiontable: `${exceptiontable.length}:${sha256(exceptiontable, this.work)}`
				});
				this.#codes.push(node);
				return node;
			}
			/**
			* Const summaries and nested relationships follow Python's object graph.
			* Building them while `code()` is still inside an ancestor container caches
			* that container before its items exist.
			*/
			finishCodes() {
				for (const node of this.#codes) {
					const material = this.#codeEquality.get(node) ?? malformed("Code object is missing decoded constants.");
					node.consts = this.#summarizeConsts(material.consts);
					node.nested = this.#nestedCodeObjects(material.consts);
				}
			}
			/**
			* A code-constant summary copies the child's name. Charge every copy the
			* report will carry before that summary is built.
			*/
			#summarizeConsts(items) {
				const summaries = [];
				for (const item of items) {
					if (item.kind === "code") this.#reportStrings([item.value.name]);
					summaries.push(summarizeConst(item, this.work));
				}
				return summaries;
			}
			/**
			* Strings reached through TYPE_REF are one marshal object but a full copy
			* in the report, so bound what the report carries, not the stream.
			*/
			#reportStrings(values) {
				let bytes = 0;
				for (const value of values) bytes += Buffer.byteLength(value, "utf8");
				this.#reportedStringBytes.charge(bytes, () => pythonPycLimit("reported_string_bytes", this.#reportedStringBytes.maximum, `Reported code-object strings exceed max_file_bytes ${this.#reportedStringBytes.maximum}.`));
			}
			/**
			* A consts tuple shared through TYPE_REF is one decode but a full copy in
			* every code object. Stop before those copies are built.
			*/
			#chargeConsts(count) {
				this.#chargeReported(count, "constants");
			}
			/**
			* A name table shared through TYPE_REF is one marshal object and a full
			* copy in every code object. Empty strings add no report bytes, so charge
			* each copied entry before building the report and equality arrays.
			*/
			#nameTable(items) {
				this.#chargeReported(items.length, "names");
				const display = [];
				const equality = [];
				for (const [index, item] of items.entries()) {
					const string = asStringWithRaw(item, `Tuple item ${index}`);
					display.push(string.value);
					equality.push(string.raw);
				}
				return {
					display,
					equality
				};
			}
			/**
			* Charge copies the report will carry. Nested relationships are separate
			* from the immediate const tuple, which misses a shared container repeated
			* by many owners. Name-table copies are separate from the byte budget,
			* which misses an empty string repeated by many owners.
			*/
			#chargeReported(count, what) {
				this.#reportedCopies.charge(count, () => pythonPycLimit("reported_rows", this.#reportedCopies.maximum, `Reported ${what} exceed max_objects ${this.#reportedCopies.maximum}.`));
			}
			/**
			* Distinct code objects reachable from this constant tuple. Containers are
			* walked iteratively, and a wrapper keeps the child's array instead of
			* copying every descendant. Charge the owner's reported relationships
			* before the array the report keeps is built.
			*/
			#nestedCodeObjects(items) {
				const seen = new Set();
				const ordered = [];
				const add = (code) => {
					if (seen.has(code)) return;
					seen.add(code);
					ordered.push(code);
				};
				for (const item of items) {
					if (item.kind === "code") {
						add(item.value);
						continue;
					}
					for (const code of this.#reachableCodes(item)) add(code);
				}
				this.#chargeReported(ordered.length, "nested code relationships");
				return ordered;
			}
			#reachableCodes(value) {
				if (value.kind === "code") return [value.value];
				if (!isContainer(value)) return EMPTY_CODES;
				const cached = this.#nestedCache.get(value);
				if (cached !== undefined) return cached;
				const added = [];
				if (this.#memoizeNested(value, added)) {
					for (const entry of added) {
						this.#nestedCache.delete(entry.value);
						this.#nestedRetained.refund(entry.retained);
					}
					const walked = this.#walkNested(value);
					this.#nestedCache.set(value, walked);
					return walked;
				}
				return this.#nestedCache.get(value) ?? EMPTY_CODES;
			}
			/**
			* Post-order walk on an explicit stack. Each frame keeps its child list,
			* so a dictionary is not copied once per entry. A back edge returns before
			* any cyclic container is cached; the caller then scans that component once.
			*/
			#memoizeNested(root, added) {
				const gray = new Set();
				const frames = [{
					value: root,
					index: 0,
					children: this.#children(root)
				}];
				gray.add(root);
				while (frames.length > 0) {
					this.#takeNestedStep();
					const frame = frames[frames.length - 1];
					if (frame === undefined) break;
					const children = frame.children;
					if (frame.index < children.length) {
						const child = children[frame.index];
						frame.index += 1;
						if (child === undefined || !isContainer(child)) continue;
						if (this.#nestedCache.has(child)) continue;
						if (gray.has(child)) return true;
						gray.add(child);
						frames.push({
							value: child,
							index: 0,
							children: this.#children(child)
						});
						continue;
					}
					const retainedBefore = this.#nestedRetained.used;
					const codes = this.#combineNested(frame.children);
					this.#nestedCache.set(frame.value, codes);
					added.push({
						value: frame.value,
						retained: this.#nestedRetained.used - retainedBefore
					});
					gray.delete(frame.value);
					frames.pop();
				}
				return false;
			}
			/** One scan of a container cycle. Cached containers outside the cycle are reused. */
			#walkNested(root) {
				const seen = new Set();
				const visited = new Set();
				const stack = [root];
				while (stack.length > 0) {
					this.#takeNestedStep();
					const current = stack.pop();
					if (current === undefined) break;
					if (current.kind === "code") {
						seen.add(current.value);
						continue;
					}
					if (!isContainer(current) || visited.has(current)) continue;
					const known = current === root ? undefined : this.#nestedCache.get(current);
					if (known !== undefined) {
						for (const code of known) seen.add(code);
						continue;
					}
					visited.add(current);
					const children = this.#children(current);
					for (let index = children.length - 1; index >= 0; index -= 1) {
						const child = children[index];
						if (child !== undefined) stack.push(child);
					}
				}
				const codes = [...seen];
				this.#retainNested(codes);
				return codes;
			}
			/**
			* Share a child's array when this container adds no further code object.
			* Otherwise retain one new list and count its slots against the walk budget.
			* `children` is the list the frame already built.
			*/
			#combineNested(children) {
				let shared;
				let onlyShared = true;
				const codes = [];
				const seen = new Set();
				const add = (code) => {
					if (seen.has(code)) return;
					seen.add(code);
					codes.push(code);
				};
				for (const child of children) {
					if (child.kind === "code") {
						if (shared !== undefined || codes.length > 0) onlyShared = false;
						add(child.value);
						continue;
					}
					if (!isContainer(child)) continue;
					const part = this.#nestedCache.get(child);
					if (part === undefined || part.length === 0) continue;
					if (shared === undefined && codes.length === 0) shared = part;
					else onlyShared = false;
					for (const code of part) add(code);
				}
				if (codes.length === 0) return EMPTY_CODES;
				if (onlyShared && shared !== undefined && shared.length === codes.length) return shared;
				this.#retainNested(codes);
				return codes;
			}
			#takeNestedStep() {
				this.#nestedSteps.charge(1, () => pythonPycLimit("nested_code_steps", this.#nestedSteps.maximum, `Nested code walk exceeds ${String(this.#nestedSteps.maximum)} steps (max_objects * max_depth).`));
				this.work.nestedSteps += 1;
			}
			#children(value) {
				const children = containerChildren(value);
				this.work.listedChildren += children.length;
				return children;
			}
			#retainNested(codes) {
				this.#nestedRetained.charge(codes.length, () => pythonPycLimit("nested_code_references", this.#nestedRetained.maximum, `Nested code walk retains more than ${String(this.#nestedRetained.maximum)} code references.`));
			}
			/**
			* CPython 3.14 reserves a slice's reference slot before reading its start,
			* stop, and step, so a reference back into the slice is still invalid. A
			* null member leaves the slice without a value instead of failing here;
			* the enclosing container or top-level read reports it, as in CPython.
			*/
			slice(depth) {
				const items = [];
				for (let index = 0; index < 3; index += 1) {
					const item = this.readObject(depth + 1);
					if (item.kind === "null") return item;
					items.push(item);
				}
				return {
					kind: "slice",
					items
				};
			}
			/**
			* Sets are registered before their members. Frozensets are registered after,
			* matching CPython, so a reference inside a frozenset body is still invalid.
			* Equal members count once; unhashable members fail the walk.
			*/
			setValue(kind, count, depth, slot) {
				const items = [];
				const value = kind === "set" ? {
					kind: "set",
					items
				} : {
					kind: "frozenset",
					items
				};
				if (kind === "set") this.publish(slot, value);
				for (let index = 0; index < count; index += 1) {
					const item = this.readObject(depth + 1);
					if (item.kind === "null") malformed("NULL object in marshal data for set.");
					items.push(item);
				}
				const unique = this.#unique(items, "set member");
				items.length = 0;
				for (const item of unique) items.push(item);
				return value;
			}
			/**
			* Dictionaries are registered before their pairs. A null key or a null value
			* ends the dict; a null value does not become an entry. Equal keys keep the
			* first key object and replace only its value. An unhashable key fails the
			* walk.
			*/
			dict(depth, slot) {
				const items = [];
				const value = {
					kind: "dict",
					items
				};
				this.publish(slot, value);
				const indexes = new Map();
				for (;;) {
					const key = this.readObject(depth + 1);
					if (key.kind === "null") return value;
					const mapped = this.readObject(depth + 1);
					if (mapped.kind === "null") return value;
					const hash = this.#hashKey(key, "dictionary key");
					const existing = indexes.get(hash);
					if (existing === undefined) {
						indexes.set(hash, items.length);
						items.push([key, mapped]);
					} else {
						const kept = items[existing] ?? malformed("Dictionary entry is missing.");
						kept[1] = mapped;
					}
				}
			}
			#unique(items, role) {
				const seen = new Map();
				for (const item of items) {
					const key = this.#hashKey(item, role);
					if (!seen.has(key)) seen.set(key, item);
				}
				return [...seen.values()];
			}
			/**
			* CPython rejects code whose argument counts do not fit the local table.
			* 3.11+ counts `CO_FAST_LOCAL` entries (`co_varnames is too small`).
			* 3.7–3.10 count `co_varnames` the same way, including `*args` and `**kwargs`.
			*/
			#rejectUndersizedLocals(argcount, kwonlyargcount, flags, locals) {
				let plain = locals - argcount - kwonlyargcount;
				if ((flags & CO_VARARGS) !== 0) plain -= 1;
				if ((flags & CO_VARKEYWORDS) !== 0) plain -= 1;
				if (plain < 0) malformed("co_varnames is too small.");
			}
			#hashKey(value, role) {
				return this.#equalityKey(value, "hash") ?? malformed(`Unhashable ${role}.`);
			}
			/**
			* Python equality for hash-based containers and for code-constant identity.
			* Tuple and frozenset chains use an explicit stack: a `TYPE_REF` chain is
			* not stream nesting, and `max_depth` must not turn a loadable file into
			* a stack overflow. Expanded size is checked per container so a shared
			* child that is stored twice still cannot double without bound.
			*/
			#equalityKey(value, mode) {
				const resolved = this.#resolveKey(value, mode);
				return resolved === null ? null : resolved.token;
			}
			#resolveKey(value, mode) {
				const cached = this.#cachedKey(value, mode);
				if (cached !== undefined) return cached;
				const frames = [{
					value,
					index: 0,
					parts: [],
					expanded: [],
					failed: false
				}];
				const gray = new Set();
				gray.add(value);
				while (frames.length > 0) {
					this.#takeKeyStep();
					const frame = frames[frames.length - 1];
					if (frame === undefined) break;
					if (mode === "hash" && this.#readingTuples.has(frame.value)) frame.failed = true;
					const items = frame.value.kind === "tuple" || frame.value.kind === "frozenset" || frame.value.kind === "slice" ? frame.value.items : undefined;
					if (items === undefined) {
						const key = this.#leafKey(frame.value, mode);
						this.#storeKey(frame.value, mode, key, gray);
						frames.pop();
						this.#recordChild(frames, key);
						continue;
					}
					if (frame.failed || frame.index >= items.length) {
						const key = frame.failed ? null : this.#containerKey(frame.value, frame.parts, frame.expanded);
						this.#storeKey(frame.value, mode, key, gray);
						frames.pop();
						this.#recordChild(frames, key);
						continue;
					}
					const child = items[frame.index];
					frame.index += 1;
					if (child === undefined) continue;
					const known = this.#cachedKey(child, mode);
					if (known !== undefined) {
						if (known === null) frame.failed = true;
						else this.#pushPart(frame, known);
						continue;
					}
					if (gray.has(child)) {
						if (mode === "hash") frame.failed = true;
						else this.#pushPart(frame, this.#identityKey(child));
						continue;
					}
					gray.add(child);
					frames.push({
						value: child,
						index: 0,
						parts: [],
						expanded: [],
						failed: false
					});
				}
				const resolved = this.#cachedKey(value, mode);
				return resolved === undefined ? null : resolved;
			}
			#cachedKey(value, mode) {
				return mode === "hash" ? this.#keyCache.get(value) : this.#constCache.get(value);
			}
			#storeKey(value, mode, key, gray) {
				if (mode === "hash") this.#keyCache.set(value, key);
				else if (key !== null) this.#constCache.set(value, key);
				gray.delete(value);
			}
			#recordChild(frames, key) {
				const parent = frames[frames.length - 1];
				if (parent === undefined) return;
				if (key === null) {
					parent.failed = true;
					return;
				}
				this.#pushPart(parent, key);
			}
			#pushPart(frame, key) {
				frame.parts.push(key.token);
				frame.expanded.push(key.expanded);
			}
			/**
			* One step per explicit-stack iteration. The cap follows decoded objects,
			* not `max_depth`, because a reference chain is shallow in the stream.
			*/
			#takeKeyStep() {
				this.#keySteps.charge(1, () => pythonPycLimit("marshal_key_steps", this.#keySteps.maximum, `Marshal key walk exceeds ${this.#keySteps.maximum} steps (max_objects * 8).`));
				this.work.keySteps += 1;
			}
			#leafKey(value, mode) {
				const descriptor = this.#leafDescriptor(value, mode);
				if (descriptor === null) return null;
				return {
					token: this.#internToken(descriptor),
					expanded: descriptor.length
				};
			}
			#leafDescriptor(value, mode) {
				switch (value.kind) {
					case "none": return "N";
					case "ellipsis": return "E";
					case "stopiter": return "S";
					case "bool":
						if (mode === "hash") return value.value ? "i1" : "i0";
						return value.value ? "B1" : "B0";
					case "int":
						if (value.bits > this.input.max_string_bytes * 3) this.#keyTooLarge(value.bits);
						return this.#boundedJoin("i", [value.value.toString()], "");
					case "float":
						if (Number.isNaN(value.value)) return this.#identity(value);
						if (mode === "const") return this.#constFloat(value.value);
						return this.#numberKey(value.value);
					case "complex":
						if (Number.isNaN(value.real) || Number.isNaN(value.imag)) return this.#identity(value);
						if (mode === "hash" && value.imag === 0) return this.#numberKey(value.real);
						if (mode === "hash") return this.#boundedJoin("c", [this.#numberKey(value.real), this.#numberKey(value.imag)], ":");
						return this.#boundedJoin("c", [
							this.#signedZero(value.real),
							this.#signedZero(value.imag),
							this.#numberKey(value.real),
							this.#numberKey(value.imag)
						], ":");
					case "str": return this.#marshalStringKey(value.raw);
					case "bytes": {
						this.#reserveKey(value.value.length * 2 + 8);
						const prefix = mode === "hash" ? "b" : "y";
						return `${prefix}${value.value.length}:${value.value.toString("hex")}`;
					}
					case "code":
						if (mode === "hash" && !this.#isCodeHashable(value.value)) return null;
						return this.#codeKey(value.value);
					default: return mode === "const" ? this.#identity(value) : null;
				}
			}
			#constFloat(value) {
				if (Object.is(value, -0)) return "z-0";
				if (Object.is(value, 0)) return "z0";
				return `z${this.#numberKey(value)}`;
			}
			#containerKey(value, parts, childExpanded) {
				const expanded = this.#expandedContainerSize(childExpanded);
				if (expanded > this.input.max_string_bytes) this.#keyTooLarge(expanded);
				const ordered = value.kind === "frozenset" ? [...parts].sort() : parts;
				const kind = value.kind === "tuple" ? "T" : value.kind === "slice" ? "L" : "F";
				const descriptor = `${kind}:${ordered.join(",")}`;
				this.#reserveKey(descriptor.length);
				return {
					token: this.#internToken(descriptor),
					expanded
				};
			}
			/** Size of the old length-prefixed container key, without building it. */
			#expandedContainerSize(childExpanded) {
				let size = 1;
				if (childExpanded.length > 0) size += childExpanded.length - 1;
				for (const child of childExpanded) size += String(child).length + 1 + child;
				return size;
			}
			#internToken(descriptor) {
				const existing = this.#keyTokens.get(descriptor);
				if (existing !== undefined) return existing;
				this.#keyTokenNext += 1;
				const token = `k${this.#keyTokenNext.toString(36)}`;
				this.#keyTokens.set(descriptor, token);
				return token;
			}
			#identityKey(value) {
				const token = this.#identity(value);
				return {
					token,
					expanded: token.length
				};
			}
			/**
			* CPython code equality ignores filename, qualname, and stack size. Consts
			* use the constant-key rules, which keep -0 distinct from 0.
			*/
			#codeKey(node) {
				const existing = this.#codeKeys.get(node);
				if (existing !== undefined && existing !== "") return existing;
				if (existing === "") return `cycle${this.#codeIdentity(node)}`;
				this.#codeKeys.set(node, "");
				const material = this.#codeEquality.get(node) ?? malformed("Code object is missing equality material.");
				const fields = [
					this.#marshalStringKey(material.name),
					String(node.argcount),
					String(node.posonlyargcount ?? 0),
					String(node.kwonlyargcount),
					node.nlocals === null ? "" : String(node.nlocals),
					String(material.effectiveFlags),
					String(node.firstlineno),
					pythonPycBytecodeIdentity(material.bytecode, this.magic, node.bytecode.sha256),
					this.#constKeyItems(material.consts),
					...material.nameTables.map((items) => this.#nameTableKey(items)),
					...this.layout === "py311" ? [material.linetable, material.exceptiontable] : []
				];
				const key = this.#boundedJoin("", fields.map((field) => `${field.length}:${field}`), ",");
				this.#codeKeys.set(node, key);
				return key;
			}
			/**
			* CPython hashes the consts tuple itself, so one unhashable const makes the
			* code unhashable. A const that leads back to the same code counts as
			* unhashable instead of recursing.
			*/
			#isCodeHashable(node) {
				const known = this.#codeHashable.get(node);
				if (known !== undefined) return known;
				const frames = [{
					value: {
						kind: "code",
						value: node
					},
					finish: false
				}];
				const gray = new Set();
				const complete = new Set();
				const reject = () => {
					this.#codeHashable.set(node, false);
					return false;
				};
				while (frames.length > 0) {
					this.#takeKeyStep();
					const frame = frames.pop();
					const value = frame.value;
					const identity = value.kind === "code" ? value.value : value;
					if (frame.finish) {
						gray.delete(identity);
						if (value.kind === "code") {
							const material = this.#codeEquality.get(value.value) ?? malformed("Code object is missing equality material.");
							const hashable = this.#equalityKey(material.constsTuple, "hash") !== null;
							this.#codeHashable.set(value.value, hashable);
							if (!hashable) return reject();
						} else complete.add(value);
						continue;
					}
					if (value.kind === "code") {
						const cached = this.#codeHashable.get(value.value);
						if (cached === false) return reject();
						if (cached === true) continue;
					} else {
						const cached = this.#keyCache.get(value);
						if (cached === null) return reject();
						if (cached !== undefined || complete.has(value)) continue;
					}
					if (gray.has(identity) || this.#readingTuples.has(value) || value.kind === "list" || value.kind === "set" || value.kind === "dict" || value.kind === "null") return reject();
					const children = value.kind === "code" ? [(this.#codeEquality.get(value.value) ?? malformed("Code object is missing equality material.")).constsTuple] : value.kind === "tuple" || value.kind === "frozenset" || value.kind === "slice" ? value.items : [];
					gray.add(identity);
					frames.push({
						value,
						finish: true
					});
					for (let index = children.length - 1; index >= 0; index -= 1) frames.push({
						value: children[index],
						finish: false
					});
				}
				return true;
			}
			#codeIdentity(node) {
				const existing = this.#codeIdentities.get(node);
				if (existing !== undefined) return existing;
				this.#identityNext += 1;
				this.#codeIdentities.set(node, this.#identityNext);
				return this.#identityNext;
			}
			/**
			* One name table, with its length and each entry's boundary. Joining on a
			* bare NUL makes `()` and `("",)` the same key, and the same join hides
			* which of `co_varnames`, `co_freevars`, and `co_cellvars` held each name.
			*/
			#nameTableKey(items) {
				let size = `${items.length}[]`.length;
				for (let index = 0; index < items.length; index += 1) {
					const raw = items[index];
					if (raw === undefined) continue;
					const keyLength = this.#marshalStringKeyLength(raw.length);
					size += String(keyLength).length + 1 + keyLength;
					if (index > 0) size += 1;
				}
				this.#reserveKey(size);
				const entries = items.map((item) => {
					const key = this.#marshalStringKey(item);
					return `${key.length}:${key}`;
				}).join(",");
				return `${items.length}[${entries}]`;
			}
			/** Constant key used when two code objects compare their co_consts. */
			#constKeyItems(items) {
				const parts = [];
				for (const item of items) {
					const key = this.#resolveKey(item, "const");
					const token = key === null ? this.#identity(item) : key.token;
					parts.push(`${token.length}:${token}`);
				}
				return this.#boundedJoin("k", parts, ",");
			}
			/** Python string identity is the marshal bytes, not the JavaScript string. */
			#marshalStringKey(raw) {
				this.#reserveKey(this.#marshalStringKeyLength(raw.length));
				return `s${raw.length}:${raw.toString("hex")}`;
			}
			#marshalStringKeyLength(bytes) {
				return String(bytes).length + bytes * 2 + 2;
			}
			#signedZero(value) {
				if (Object.is(value, -0)) return "-";
				if (Object.is(value, 0)) return "+";
				return "n";
			}
			/**
			* Join a key only after its size fits the string budget and the running
			* key-byte budget. Caching the result does not make an oversized key safe.
			*/
			#boundedJoin(prefix, parts, separator) {
				let size = prefix.length;
				if (parts.length > 0) size += (parts.length - 1) * separator.length;
				for (const part of parts) size += part.length;
				this.#reserveKey(size);
				return prefix + parts.join(separator);
			}
			#reserveKey(size) {
				if (size > this.input.max_string_bytes) this.#keyTooLarge(size);
				this.#keyBytes.charge(size, () => pythonPycLimit("marshal_key_bytes", this.#keyBytes.maximum, `Marshal key expansion exceeds max_file_bytes ${this.#keyBytes.maximum}.`));
				this.work.keyBytes += size;
			}
			#keyTooLarge(size) {
				throw pythonPycLimit("max_string_bytes", this.input.max_string_bytes, `Marshal key of ${size} bytes exceeds max_string_bytes ${this.input.max_string_bytes}.`);
			}
			#numberKey(value) {
				if (value === 0) return "i0";
				if (Number.isFinite(value) && Number.isInteger(value)) return `i${BigInt(value).toString()}`;
				const bytes = Buffer.alloc(8);
				bytes.writeDoubleLE(value);
				return `d${bytes.toString("hex")}`;
			}
			#identity(value) {
				const existing = this.#identities.get(value);
				if (existing !== undefined) return `u${existing}`;
				this.#identityNext += 1;
				this.#identities.set(value, this.#identityNext);
				return `u${this.#identityNext}`;
			}
			/**
			* CPython stores a long as 15-bit digits, least significant first. Charge
			* the digits against the string budget (they never use another one), reject
			* the digits CPython rejects, and build the value in one linear pass.
			*/
			/** Marshal version 0 writes a one-byte length and a CPython float literal. */
			textFloat() {
				const bytes = this.blob(this.u8());
				if (bytes.some((byte) => byte > 127)) malformed("Marshal float text is not ASCII.");
				return parseMarshalFloat(bytes.toString("latin1")) ?? malformed("Marshal float text is not a CPython float.");
			}
		};
		jsonFloat = (value) => Number.isNaN(value) ? "nan" : value === Infinity ? "inf" : value === -Infinity ? "-inf" : Object.is(value, -0) ? "-0.0" : value;
		flattenCode = (root, work) => {
			const indexes = new Map();
			const order = [];
			const visit = (node) => {
				work.codeVisits += 1;
				if (indexes.has(node)) return;
				indexes.set(node, order.length);
				order.push(node);
				for (const child of node.nested) visit(child);
			};
			visit(root);
			return order.map(({ nested, ...code }) => ({
				...code,
				nested_code: nested.map((child) => indexes.get(child) ?? malformed("Nested code object was not listed."))
			}));
		};
		asBytes = (value, field) => {
			if (value.kind !== "bytes") return malformed(`${field} is not marshal bytes.`);
			return value.value;
		};
		asString = (value, field) => {
			if (value.kind !== "str") return malformed(`${field} is not a marshal string.`);
			return value.value;
		};
		asStringWithRaw = (value, field) => {
			if (value.kind !== "str") return malformed(`${field} is not a marshal string.`);
			return value;
		};
		asTuple = (value, field) => {
			if (value.kind !== "tuple") return malformed(`${field} is not a marshal tuple.`);
			return value.items;
		};
		constSummaries = new WeakMap();
		summarizeConst = (value, work) => {
			const cached = constSummaries.get(value);
			if (cached !== undefined) return cached;
			work.constSummaries += 1;
			const summary = buildConstSummary(value, work);
			constSummaries.set(value, summary);
			return summary;
		};
		buildConstSummary = (value, work) => {
			switch (value.kind) {
				case "none": return { kind: "none" };
				case "bool": return {
					kind: "bool",
					value: value.value
				};
				case "int": return {
					kind: "int",
					bits: value.bits,
					value: value.bits <= 256 ? value.value.toString() : null
				};
				case "float": return {
					kind: "float",
					value: jsonFloat(value.value)
				};
				case "str": {
					const truncated = value.value.length > 80;
					return {
						kind: "str",
						bytes: value.bytes,
						truncated,
						value: truncated ? value.value.slice(0, value.previewEnd) : value.value
					};
				}
				case "bytes": return {
					kind: "bytes",
					bytes: value.value.length,
					sha256: sha256(value.value, work)
				};
				case "code": return {
					kind: "code",
					name: value.value.name,
					firstlineno: value.value.firstlineno
				};
				case "tuple": return {
					kind: "tuple",
					length: value.items.length
				};
				case "list": return {
					kind: "list",
					length: value.items.length
				};
				case "set": return {
					kind: "set",
					length: value.items.length
				};
				case "frozenset": return {
					kind: "frozenset",
					length: value.items.length
				};
				case "dict": return {
					kind: "dict",
					length: value.items.length
				};
				case "ellipsis": return { kind: "ellipsis" };
				case "slice": return { kind: "slice" };
				case "complex": return {
					kind: "complex",
					real: jsonFloat(value.real),
					imag: jsonFloat(value.imag)
				};
				default: return {
					kind: "other",
					type: value.kind
				};
			}
		};
		MARSHAL_FLOAT = /^([+-]?)(?:(inf(?:inity)?)|(nan)|((?:\d+\.\d*|\.\d+|\d+)(?:[eE][+-]?\d+)?))$/i;
		parseMarshalFloat = (text) => {
			const match = MARSHAL_FLOAT.exec(text);
			if (match === null) return undefined;
			if (match[2] !== undefined) return match[1] === "-" ? -Infinity : Infinity;
			if (match[3] !== undefined) return Number.NaN;
			const value = Number(text);
			return Number.isNaN(value) ? undefined : value;
		};
	})))();
}

//#endregion
//#region dist/python/PythonPycProvider.js
var OPERATION, parserLimitRecovery, failureForPrimary, failureFor, PythonPycProvider;
function init_PythonPycProvider() {
	return (init_PythonPycProvider = __esmMin((() => {
		init_PythonPycProviderIdentity();
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_pythonPyc$1();
		init_providerAdapterError();
		init_result();
		init_PythonPyc_errors();
		init_parseFailureAnalysisError();
		init_PythonPycParser();
		init_errorMessage();
		OPERATION = "inspect_python_pyc";
		parserLimitRecovery = (input, fields) => {
			const actions = fields.map((field) => {
				const selected = input[field];
				const maximum = PYTHON_PYC_LIMIT_MAXIMA[field];
				const option = `--${field.replaceAll("_", "-")}`;
				return selected < maximum ? `Raise ${field} (${option}) above ${selected}, up to ${maximum}, on the next call.` : `${field} (${option}) is at this operation's maximum of ${maximum}; select a complete artifact within that bound.`;
			});
			return {
				retryable: false,
				remediationAction: `${actions.join(" ")} Repeating the unchanged request fails the same way; waiting or adding host memory does not raise these parser limits.`
			};
		};
		failureForPrimary = (facts, input) => {
			const { cause, origin } = facts;
			if (origin === "owned-or-classified" && cause instanceof AnalysisError) return cause;
			const identityFailure = projectOwnedArtifactIdentityFailure(facts, OPERATION, input.path);
			if (identityFailure !== undefined) return identityFailure;
			if (isParseLimit(cause, "python-pyc")) {
				const { name } = cause.failure.limit;
				return parseLimitConstraint(OPERATION, name === "max_depth" ? "capacity" : "memory", cause, parserLimitRecovery(input, pythonPycLimitControls(name)));
			}
			const formatFailure = parseFailureAnalysisError(OPERATION, input.path, cause);
			if (formatFailure !== undefined) return formatFailure;
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure) {
				if (cause.reason === "limit") return new AnalysisResourceConstraintError(OPERATION, "file-size", cause.message, { max_file_bytes: input.max_file_bytes }, {
					cause,
					...parserLimitRecovery(input, ["max_file_bytes"])
				});
				if (cause.reason === "path" || cause.reason === "format") return stableArtifactInputFailure(cause, OPERATION);
			}
			const fileFailure = projectSelectedArtifactFileFailure(cause, OPERATION, input.path, "pyc");
			if (fileFailure !== undefined) return fileFailure;
			return new ProviderAdapterError(PYTHON_PYC_PROVIDER_IDENTITY.id, OPERATION, {
				cause,
				diagnostics: {
					path: input.path,
					reason: errorMessage(cause)
				}
			});
		};
		failureFor = (cause, input, snapshot) => {
			const primary = failureForPrimary(artifactFilePrimaryFacts(cause), input);
			return projectStableArtifactFailure(cause, primary, input.path, PYTHON_PYC_PROVIDER_IDENTITY.id, OPERATION, snapshot);
		};
		PythonPycProvider = class {
			identity = PYTHON_PYC_PROVIDER_IDENTITY;
			#resources = new ArtifactResourceScope();
			async close() {
				try {
					await this.#resources.close();
				} catch (cause) {
					throw projectArtifactCloseFailure(cause, PYTHON_PYC_PROVIDER_IDENTITY.id, OPERATION);
				}
			}
			async inspect(input, options) {
				let snapshot;
				try {
					snapshot = await this.#resources.run(() => readStableArtifact(input.path, input.max_file_bytes, options?.signal, undefined, this.#resources));
					return ok(parsePythonPyc(snapshot.bytes, {
						path: input.path,
						sha256: snapshot.sha256,
						bytes: snapshot.bytes.length
					}, input));
				} catch (cause) {
					return err(failureFor(cause, input, snapshot));
				}
			}
		};
	})))();
}

//#endregion
//#region dist/composition/pythonPyc.js
var createPythonPycService;
function init_pythonPyc() {
	return (init_pythonPyc = __esmMin((() => {
		init_PythonPycService();
		init_PythonPycProvider();
		createPythonPycService = () => new PythonPycService(new PythonPycProvider());
	})))();
}

//#endregion
//#region dist/cli/pythonPycCommands.js
var pythonPycCommands_exports = /* @__PURE__ */ __exportAll({ registerPythonPycCommands: () => registerPythonPycCommands });
var registerPythonPycCommands;
function init_pythonPycCommands() {
	return (init_pythonPycCommands = __esmMin((() => {
		init_pythonPyc();
		init_pythonPycToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		registerPythonPycCommands = (cli, logger) => {
			registerContractCommand(cli, logger, contractNamed(PYTHON_PYC_TOOL_CONTRACTS, "inspect_python_pyc"), {
				description: "Inspect a supported CPython 3.7–3.15 pyc header and marshal code objects without executing bytecode",
				positionals: ["path"],
				callerPaths: ["path"],
				evidenceDelivery: true,
				viewDelivery: { invalidJson: "view must be valid JSON" },
				fields: {
					path: { description: "Local CPython .pyc file" },
					view: { description: "JSON python-pyc view; requires --detail summary and --evidence_output" }
				}
			}, deliverWithService(createPythonPycService, "rea-python-pyc"));
		};
	})))();
}

//#endregion
export { init_pythonPycCommands, pythonPycCommands_exports };