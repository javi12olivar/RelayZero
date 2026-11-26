import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { C as init_parseFailure, P as nulFreeStringSchema, _ as isImmutableJsonSnapshot, b as ParseFailureError, c as jsonValueValidationSteps, d as canBorrowParsedJsonSnapshot, f as freezeJsonSnapshot, g as init_immutableJson, h as immutableJsonSnapshotMember, i as jsonObjectSchema, it as init_coverage, j as init_localPath, k as unsupportedInput, m as freezeOwnedJsonTreeSnapshot, o as jsonValueSchema, r as init_jsonValue, rt as coverageStatusSchema, s as jsonValueValidationIssue, v as init_isRecord, y as isRecord } from "./jsonValue-BIEmjG1z.js";
import { A as init_binaryContainer, R as digestSchema, S as BinaryReader, V as prefixedDigestSchema, c as ZIP_MAX_COMMENT_BYTES, g as zipEndUsesSingleVolume, h as zipEndOfCentralDirectoryCandidates, n as digestCanonicalValue, r as init_canonicalDigest, t as CanonicalDigestError, u as init_zipEndOfCentralDirectory, v as init_zipLocalHeader, y as zipLocalDataOffset, z as init_digests } from "./canonicalDigest-DUQN3Yyz.js";
import { a as init_targetIdentity, c as sessionTargetIdentitySchema, i as fileTargetSelectionSchema, o as nonFileTargetIdentitySchema, s as sameTargetIdentity, t as binaryTargetIdentity, u as unknownTargetIdentitySchema } from "./targetIdentity-ZgCbCvWA.js";
import { basename } from "node:path";
import { z } from "zod";
import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";

//#region dist/domain/fixedTupleSchema.js
var fixedTupleSchema;
function init_fixedTupleSchema() {
	return (init_fixedTupleSchema = __esmMin((() => {
		fixedTupleSchema = (items) => z.tuple(items, z.union(items)).check(z.minLength(items.length), z.maxLength(items.length));
	})))();
}

//#endregion
//#region dist/domain/relationshipCoverage.js
var diagnostics, relationshipDiscoveryDirectionSchema, relationshipDiscoverySchema, discovery, completeRelationshipCoverageSchema, limitedDirections, partialRelationshipCoverageSchema, unknownRelationshipCoverageSchema, relationshipCoverageSchema, combineRelationshipDiscovery, relationshipCoverageLimitations;
function init_relationshipCoverage() {
	return (init_relationshipCoverage = __esmMin((() => {
		init_coverage();
		init_fixedTupleSchema();
		diagnostics = z.array(z.string().min(1)).min(1).exactOptional();
		relationshipDiscoveryDirectionSchema = z.strictObject({
			status: coverageStatusSchema,
			reason: z.string().min(1).exactOptional()
		});
		relationshipDiscoverySchema = z.strictObject({
			callers: relationshipDiscoveryDirectionSchema.exactOptional(),
			callees: relationshipDiscoveryDirectionSchema.exactOptional()
		});
		discovery = relationshipDiscoverySchema.exactOptional();
		completeRelationshipCoverageSchema = z.strictObject({
			status: z.literal("complete"),
			diagnostics,
			discovery
		});
		limitedDirections = z.union([
			fixedTupleSchema([z.literal("callers")]),
			fixedTupleSchema([z.literal("callees")]),
			fixedTupleSchema([z.literal("callers"), z.literal("callees")])
		]);
		partialRelationshipCoverageSchema = z.strictObject({
			status: z.literal("partial"),
			limitations: z.array(z.string().min(1)).min(1),
			limited_directions: limitedDirections.exactOptional(),
			diagnostics,
			discovery
		});
		unknownRelationshipCoverageSchema = z.strictObject({
			status: z.literal("unknown"),
			reason: z.string().min(1),
			limited_directions: limitedDirections.exactOptional(),
			diagnostics,
			discovery
		});
		relationshipCoverageSchema = z.discriminatedUnion("status", [
			completeRelationshipCoverageSchema,
			partialRelationshipCoverageSchema,
			unknownRelationshipCoverageSchema
		]);
		combineRelationshipDiscovery = (current, coverage, direction) => {
			const next = coverage?.discovery?.[direction]?.status ?? "unknown";
			if (current === "partial" || next === "partial") return "partial";
			if (current === "unknown" || next === "unknown") return "unknown";
			return "complete";
		};
		relationshipCoverageLimitations = (coverage) => {
			switch (coverage?.status) {
				case undefined: return ["Provider did not report relationship coverage."];
				case "complete": return [];
				case "partial": return coverage.limitations;
				case "unknown": return [coverage.reason];
			}
		};
	})))();
}

//#endregion
//#region dist/domain/evidenceFormat.js
var EVIDENCE_FORMAT_REVISION, RECREATE_EVIDENCE_GUIDANCE, evidenceFormatSchema, EVIDENCE_BUNDLE_FORMAT, EVIDENCE_RECORD_FORMAT, isUnsupportedEvidenceFormat, admitFormat, RECORD_MEMBERS, admitEvidenceRecordFormat, admitEvidenceBundleFormat;
function init_evidenceFormat() {
	return (init_evidenceFormat = __esmMin((() => {
		init_parseFailure();
		EVIDENCE_FORMAT_REVISION = 2;
		RECREATE_EVIDENCE_GUIDANCE = "Recreate observations with the current REA release; re-exporting an earlier bundle does not update its format or identities.";
		evidenceFormatSchema = z.literal(2, { error: `evidence_format must be ${String(2)}. ${RECREATE_EVIDENCE_GUIDANCE}` });
		EVIDENCE_BUNDLE_FORMAT = "evidence-bundle";
		EVIDENCE_RECORD_FORMAT = "evidence-record";
		isUnsupportedEvidenceFormat = (cause) => cause instanceof ParseFailureError && cause.kind === "unsupported" && (cause.failure.format === EVIDENCE_BUNDLE_FORMAT || cause.failure.format === EVIDENCE_RECORD_FORMAT);
		admitFormat = (input, format, noun) => {
			const found = Reflect.get(input, "evidence_format");
			if (found === 2) return;
			throw unsupportedInput(format, `${found === undefined ? `This ${noun} predates format revision ${String(2)}` : `${noun} format ${JSON.stringify(found)} is not format ${String(2)}`}, which this REA release reads. ${RECREATE_EVIDENCE_GUIDANCE}`, {
				field: "evidence_format",
				undecodedContent: true
			});
		};
		RECORD_MEMBERS = [
			"evidence_id",
			"provider",
			"predicate_type",
			"operation",
			"normalized_result"
		];
		admitEvidenceRecordFormat = (input) => {
			if (!isRecord(input) || !Object.hasOwn(input, "evidence_id")) return;
			if (Object.hasOwn(input, "evidence_format") || RECORD_MEMBERS.every((member) => Object.hasOwn(input, member))) admitFormat(input, EVIDENCE_RECORD_FORMAT, "Evidence record");
		};
		admitEvidenceBundleFormat = (input) => {
			if (!isRecord(input) || !Object.hasOwn(input, "records")) return;
			admitFormat(input, EVIDENCE_BUNDLE_FORMAT, "Evidence bundle");
			if (Array.isArray(input.records)) for (const record of input.records) admitEvidenceRecordFormat(record);
		};
	})))();
}

//#endregion
//#region dist/domain/binaryTargetTypes.js
var BINARY_ARCHITECTURES, RAW_ONLY_ARCHITECTURES, PE_CODEVIEW_PREFIX_BYTES, ELF_METADATA_ARCHITECTURES, HEADER_ARCHITECTURE_EXCLUSIONS, isMachOFormat, artifactTargetSelectedPath;
function init_binaryTargetTypes() {
	return (init_binaryTargetTypes = __esmMin((() => {
		BINARY_ARCHITECTURES = [
			"x86",
			"x86_64",
			"arm",
			"arm64",
			"arm64_32",
			"mips",
			"6502",
			"riscv",
			"powerpc",
			"m68k",
			"hexagon",
			"xtensa"
		];
		RAW_ONLY_ARCHITECTURES = ["6502", "m68k"];
		PE_CODEVIEW_PREFIX_BYTES = 4096;
		ELF_METADATA_ARCHITECTURES = [
			"mips",
			"riscv",
			"powerpc"
		];
		HEADER_ARCHITECTURE_EXCLUSIONS = [
			...ELF_METADATA_ARCHITECTURES,
			...RAW_ONLY_ARCHITECTURES,
			"hexagon",
			"xtensa",
			"arm64_32"
		];
		isMachOFormat = (format) => format === "mach-o" || format === "mach-o-universal";
		artifactTargetSelectedPath = (target) => target.kind === "archive" || target.kind === "artifact" ? target.artifactSelectedPath ?? target.sourcePath ?? target.path : target.sourcePath ?? target.path;
	})))();
}

//#endregion
//#region dist/domain/zip/zipCentralHeader.js
var ZIP_CENTRAL_HEADER, readZipCentralExtent;
function init_zipCentralHeader() {
	return (init_zipCentralHeader = __esmMin((() => {
		init_result();
		ZIP_CENTRAL_HEADER = {
			signature: 33639248,
			bytes: 46,
			nameBytesOffset: 28,
			extraBytesOffset: 30,
			commentBytesOffset: 32,
			localHeaderOffset: 42
		};
		readZipCentralExtent = (reader, at, end) => {
			const layout = ZIP_CENTRAL_HEADER;
			const name = at + layout.bytes;
			if (at < 0 || name > end || name > reader.bytes.length) return err({
				kind: "fixed-fields",
				offset: at
			});
			if (reader.u32(at) !== layout.signature) return err({
				kind: "signature",
				offset: at
			});
			const extra = name + reader.u16(at + layout.nameBytesOffset);
			if (extra > end) return err({
				kind: "name",
				offset: name
			});
			const comment = extra + reader.u16(at + layout.extraBytesOffset);
			const next = comment + reader.u16(at + layout.commentBytesOffset);
			if (next > end) return err({
				kind: "extra-or-comment",
				offset: extra
			});
			return ok({
				name,
				extra,
				comment,
				next
			});
		};
	})))();
}

//#endregion
//#region dist/domain/zipPackageFormat.js
var ZIP_APPLICATION_PACKAGE_FORMATS, ZIP_PACKAGE_FORMATS, isZipPackageFormat, ZIP_SIGNATURES, hasZipLocalHeader, hasZipSignature, hasTrailingZipArchive, zipPackageFormatForPath, zipRootPackageFormat, ZIP_NON_ENTRY_LIMITATION;
function init_zipPackageFormat() {
	return (init_zipPackageFormat = __esmMin((() => {
		init_binaryContainer();
		init_zipCentralHeader();
		init_zipLocalHeader();
		init_zipEndOfCentralDirectory();
		ZIP_APPLICATION_PACKAGE_FORMATS = [
			"ipa",
			"apk",
			"msix",
			"appx",
			"hap",
			"hsp",
			"app-pack"
		];
		ZIP_PACKAGE_FORMATS = ["zip", ...ZIP_APPLICATION_PACKAGE_FORMATS];
		isZipPackageFormat = (format) => ZIP_PACKAGE_FORMATS.some((candidate) => candidate === format);
		ZIP_SIGNATURES = [
			[
				80,
				75,
				3,
				4
			],
			[
				80,
				75,
				5,
				6
			],
			[
				80,
				75,
				6,
				6
			],
			[
				80,
				75,
				7,
				8
			]
		];
		hasZipLocalHeader = (bytes) => ZIP_SIGNATURES[0].every((byte, index) => bytes[index] === byte);
		hasZipSignature = (bytes) => bytes.length >= 4 && ZIP_SIGNATURES.some((signature) => signature.every((byte, index) => bytes[index] === byte));
		hasTrailingZipArchive = async (size, read) => {
			if (!Number.isSafeInteger(size) || size < 22) return false;
			const tailStart = Math.max(0, size - 22 - ZIP_MAX_COMMENT_BYTES);
			const tail = Buffer.from(await read(tailStart, size - tailStart));
			if (tail.length !== size - tailStart) return false;
			for (const candidate of zipEndOfCentralDirectoryCandidates(tail)) {
				const { offset: record, entriesOnDisk, directorySize: directoryBytes, directoryOffset: declaredDirectory } = candidate;
				if (!zipEndUsesSingleVolume(candidate) || entriesOnDisk === 0 || entriesOnDisk === 65535 || entriesOnDisk !== candidate.totalEntries || directoryBytes < ZIP_CENTRAL_HEADER.bytes || directoryBytes === 4294967295 || declaredDirectory === 4294967295) continue;
				const directory = tailStart + record - directoryBytes;
				const shift = directory - declaredDirectory;
				if (directory < 0 || shift < 0) continue;
				const header = Buffer.from(await read(directory, ZIP_CENTRAL_HEADER.bytes));
				const headerReader = new BinaryReader(header, true, "zip");
				if (!readZipCentralExtent(headerReader, 0, directoryBytes).ok) continue;
				const localOffset = headerReader.u32(ZIP_CENTRAL_HEADER.localHeaderOffset) + shift;
				if (localOffset === 0 || localOffset > directory - 30) continue;
				const local = Buffer.from(await read(localOffset, 30));
				const dataOffset = zipLocalDataOffset(new BinaryReader(local, true, "zip"), localOffset);
				if (dataOffset !== undefined && dataOffset <= directory) return true;
			}
			return false;
		};
		zipPackageFormatForPath = (path) => {
			const lower = path.toLowerCase();
			if (lower.endsWith(".zip")) return "zip";
			if (lower.endsWith(".ipa")) return "ipa";
			if (lower.endsWith(".apk")) return "apk";
			if (lower.endsWith(".msix") || lower.endsWith(".msixbundle")) return "msix";
			if (lower.endsWith(".appx") || lower.endsWith(".appxbundle")) return "appx";
			if (lower.endsWith(".hap")) return "hap";
			if (lower.endsWith(".hsp")) return "hsp";
			return undefined;
		};
		zipRootPackageFormat = (path) => {
			const lower = path.toLowerCase();
			return lower.endsWith(".app") ? "app-pack" : zipPackageFormatForPath(lower) ?? "zip";
		};
		ZIP_NON_ENTRY_LIMITATION = "ZIP inventory lists central-directory entries only. Non-entry bytes, including leading bytes before the first entry such as a self-extractor stub, an APK Signing Block before the central directory or a ZIP comment after it, are not occurrences.";
	})))();
}

//#endregion
//#region dist/domain/targetFormats.js
var BINARY_TARGET_FORMAT_KINDS, BINARY_TARGET_FORMATS, targetFormatsOfKind, TARGET_FORMAT_HINTS;
function init_targetFormats() {
	return (init_targetFormats = __esmMin((() => {
		init_zipPackageFormat();
		BINARY_TARGET_FORMAT_KINDS = {
			"analysis-database": "database",
			"mach-o": "executable",
			"mach-o-universal": "executable",
			elf: "executable",
			pe: "executable",
			"dos-mz": "executable",
			"dos-com": "executable",
			"raw-binary": "executable",
			"gamecube-dol": "executable",
			...Object.fromEntries(ZIP_PACKAGE_FORMATS.map((format) => [format, "archive"])),
			asar: "archive",
			ines: "archive",
			"godot-pck": "archive",
			unityfs: "archive",
			wxapkg: "archive",
			uimage: "archive",
			"android-boot-image": "archive",
			"android-ota-payload": "archive",
			dmg: "archive",
			pkg: "archive",
			"intel-hex": "archive",
			srec: "archive",
			"esp-image": "archive",
			uf2: "archive",
			dfuse: "archive",
			"esp-flash-image": "archive",
			fit: "archive",
			"ntfs-mft": "archive",
			plist: "artifact",
			javascript: "artifact",
			uefi: "artifact",
			"source-map": "artifact"
		};
		BINARY_TARGET_FORMATS = Object.keys(BINARY_TARGET_FORMAT_KINDS);
		targetFormatsOfKind = (kind) => BINARY_TARGET_FORMATS.filter((format) => BINARY_TARGET_FORMAT_KINDS[format] === kind);
		TARGET_FORMAT_HINTS = [
			"dos-com",
			"raw-binary",
			"gamecube-dol",
			"esp-flash-image"
		];
	})))();
}

//#endregion
//#region dist/domain/evidenceSubject.js
var nonArtifactTargetFormats, trailingArchiveIndex, evidenceSubjectFormatSchema, detectedEvidenceSubjectDeclaration, rawEvidenceSubjectDeclaration, gamecubeEvidenceSubjectDeclaration, withEvidenceSubjectDeclaration;
function init_evidenceSubject() {
	return (init_evidenceSubject = __esmMin((() => {
		init_binaryTargetTypes();
		init_targetFormats();
		nonArtifactTargetFormats = BINARY_TARGET_FORMATS.filter((format) => format !== "mach-o-universal" && BINARY_TARGET_FORMAT_KINDS[format] !== "artifact");
		trailingArchiveIndex = nonArtifactTargetFormats.indexOf("intel-hex");
		evidenceSubjectFormatSchema = z.enum([
			"hopper",
			...nonArtifactTargetFormats.slice(0, trailingArchiveIndex),
			...targetFormatsOfKind("artifact"),
			"directory",
			"file",
			"unknown",
			"mach-o-universal",
			"javascript-bundle",
			"entitlements",
			"pyinstaller",
			"node-sea",
			"dotnet-bundle",
			"bun-standalone",
			"deno-standalone",
			...nonArtifactTargetFormats.slice(trailingArchiveIndex)
		]);
		detectedEvidenceSubjectDeclaration = {
			format: evidenceSubjectFormatSchema.exclude(["raw-binary", "gamecube-dol"]),
			architecture: z.enum(BINARY_ARCHITECTURES).exclude([...RAW_ONLY_ARCHITECTURES]).nullable()
		};
		rawEvidenceSubjectDeclaration = {
			format: z.literal("raw-binary"),
			architecture: z.enum(BINARY_ARCHITECTURES).nullable()
		};
		gamecubeEvidenceSubjectDeclaration = {
			format: z.literal("gamecube-dol"),
			architecture: z.literal("powerpc")
		};
		withEvidenceSubjectDeclaration = (base) => z.discriminatedUnion("format", [
			base.extend(detectedEvidenceSubjectDeclaration),
			base.extend(rawEvidenceSubjectDeclaration),
			base.extend(gamecubeEvidenceSubjectDeclaration)
		]);
	})))();
}

//#endregion
//#region dist/domain/canonicalJsonDigestSteps.js
/** Hash owned, validated JSON in bounded steps without a document-sized string. */
function* canonicalJsonDigestSteps(value) {
	const hash = createHash("sha256");
	const ancestors = new Set();
	const stack = [{
		kind: "value",
		value
	}];
	const encodedKeys = new Map();
	let remainingKeyCodeUnits = 8192;
	let buffered = "";
	let flushed = false;
	const emit = (part) => {
		buffered += part;
		if (buffered.length >= 8192) {
			hash.update(buffered);
			buffered = "";
			flushed = true;
		}
	};
	try {
		while (stack.length > 0) {
			if (flushed) {
				flushed = false;
				yield;
			}
			const frame = stack.pop();
			if (frame === undefined) break;
			if (frame.kind === "separator") {
				emit(":");
				continue;
			}
			if (frame.kind === "string") {
				if (frame.index === frame.value.length) {
					emit("\"");
					continue;
				}
				let end = Math.min(frame.index + 8192, frame.value.length);
				const last = frame.value.charCodeAt(end - 1);
				const next = frame.value.charCodeAt(end);
				if (end < frame.value.length && last >= 55296 && last <= 56319 && next >= 56320 && next <= 57343) end -= 1;
				emit(JSON.stringify(frame.value.slice(frame.index, end)).slice(1, -1));
				frame.index = end;
				stack.push(frame);
				continue;
			}
			let item;
			if (frame.kind === "array") {
				if (frame.index === frame.length) {
					emit("]");
					ancestors.delete(frame.value);
					continue;
				}
				const element = frame.value[frame.index];
				if (element === undefined) throw new TypeError("Canonical JSON digest requires dense JSON arrays");
				if (frame.index++ > 0) emit(",");
				stack.push(frame);
				item = element;
			} else if (frame.kind === "object") {
				if (frame.index === frame.keys.length) {
					emit("}");
					ancestors.delete(frame.value);
					continue;
				}
				const key = frame.keys[frame.index++];
				if (key === undefined) throw new TypeError("Canonical JSON object changed during hashing");
				const property = frame.value[key];
				if (property === undefined) {
					stack.push(frame);
					continue;
				}
				if (frame.written++ > 0) emit(",");
				if (key.length > 8192) {
					emit("\"");
					stack.push(frame, {
						kind: "value",
						value: property
					}, { kind: "separator" }, {
						kind: "string",
						value: key,
						index: 0
					});
					continue;
				}
				let encodedKey = encodedKeys.get(key);
				if (encodedKey === undefined) {
					encodedKey = JSON.stringify(key);
					if (encodedKey.length <= remainingKeyCodeUnits) {
						encodedKeys.set(key, encodedKey);
						remainingKeyCodeUnits -= encodedKey.length;
					}
				}
				emit(encodedKey);
				emit(":");
				stack.push(frame);
				item = property;
			} else {
				item = frame.value;
			}
			if (flushed) {
				flushed = false;
				yield;
			}
			if (typeof item === "string" && item.length > 8192) {
				emit("\"");
				stack.push({
					kind: "string",
					value: item,
					index: 0
				});
			} else if (item === null || typeof item !== "object") {
				if (typeof item === "number" && !Number.isFinite(item)) throw new CanonicalDigestError(Number.isNaN(item) ? "nan" : "infinity");
				emit(JSON.stringify(item));
			} else {
				if (ancestors.has(item)) throw new CanonicalDigestError("circular");
				ancestors.add(item);
				if (Array.isArray(item)) {
					emit("[");
					stack.push({
						kind: "array",
						value: item,
						length: item.length,
						index: 0
					});
				} else {
					emit("{");
					stack.push({
						kind: "object",
						value: item,
						keys: Object.keys(item).sort(),
						index: 0,
						written: 0
					});
				}
			}
		}
		if (buffered !== "") hash.update(buffered);
		return hash.digest("hex");
	} finally {
		stack.length = 0;
		ancestors.clear();
		encodedKeys.clear();
		buffered = "";
	}
}
function init_canonicalJsonDigestSteps() {
	return (init_canonicalJsonDigestSteps = __esmMin((() => {
		init_canonicalDigest();
	})))();
}

//#endregion
//#region dist/domain/analysisProfile.js
var committedProviderSchema, unsignedAnalysisProfileSchema, analysisProfileSchema, createAnalysisProfile, committedProvidersEqual, analysisProfilesEqual, profileDigest;
function init_analysisProfile() {
	return (init_analysisProfile = __esmMin((() => {
		init_canonicalDigest();
		init_jsonValue();
		init_digests();
		committedProviderSchema = z.strictObject({
			id: z.string().min(1),
			name: z.string().min(1),
			version: z.string().min(1)
		});
		unsignedAnalysisProfileSchema = z.strictObject({
			provider: committedProviderSchema,
			parameters: jsonObjectSchema
		});
		analysisProfileSchema = unsignedAnalysisProfileSchema.extend({ digest: digestSchema }).superRefine((profile, context) => {
			const { digest: _digest, ...unsigned } = profile;
			if (profileDigest(unsigned) !== profile.digest) context.addIssue({
				code: "custom",
				path: ["digest"],
				message: "Analysis profile digest does not match its parameters"
			});
		});
		createAnalysisProfile = (provider, parameters) => {
			const unsigned = unsignedAnalysisProfileSchema.parse({
				provider: {
					id: provider.id,
					name: provider.name,
					version: provider.version
				},
				parameters
			});
			return analysisProfileSchema.parse({
				...unsigned,
				digest: profileDigest(unsigned)
			});
		};
		committedProvidersEqual = (left, right) => left.id === right.id && left.name === right.name && left.version === right.version;
		analysisProfilesEqual = (left, right) => left.digest === right.digest && committedProvidersEqual(left.provider, right.provider);
		profileDigest = (profile) => digestCanonicalValue(profile, "Analysis profile");
	})))();
}

//#endregion
//#region dist/domain/evidence.js
/** Create Evidence from owned immutable JSON while exposing cooperative computation steps. */
function* createImmutableEvidenceSteps(target, provider, observation) {
	if (!isImmutableJsonSnapshot(observation.result)) throw new TypeError("Cooperative Evidence requires an authenticated immutable result");
	yield* jsonValueValidationSteps(observation.result);
	const { normalized } = normalizeEvidenceObservation(target, provider, observation);
	const digest = yield* canonicalJsonDigestSteps(evidenceSemanticContent(normalized));
	return rememberImmutableEvidence({
		...normalized,
		evidence_id: `ev_${digest}`
	});
}
var ANALYSIS_EVIDENCE_PREDICATE, providerSchema, SELECTION_FORMATS, subjectIdentitySchema, fileSubjectSchema, sessionSubjectIdentitySchema, nonFileSubjectSchema, subjectSchema, evidenceSubjectSchema, evidenceLocationSchema, evidenceAuthoritySchema, executionEnvironmentSchema, callerInputPathsSchema, evidenceBaseSchema, validateAnalysisProfileProvider, evidenceSchema, authenticatedEvidenceSchema, immutableEvidenceSnapshots, immutableResultSchema, isFileSubject, evidenceSubjectTarget, evidenceSubjectInput, evidenceSubjectTargetIdentity, rebindEvidenceSubjectTargetPath, evidenceSubject, evidenceTargetIdentity, evidenceFileTarget, evidenceSubjectDisplay, evidenceSemanticContent, computeEvidenceId, parseEvidence, evidenceDisplayMetadataAgree, immutableEvidence, rebindEvidenceToTargetPath, withEvidenceCallerInputPath, rememberReboundEvidence, isImmutableEvidence, rememberImmutableEvidence, createEvidence, evidenceEnvelopeForAdmission, normalizeEvidenceObservation;
function init_evidence() {
	return (init_evidence = __esmMin((() => {
		init_evidenceFormat();
		init_evidenceSubject();
		init_canonicalDigest();
		init_canonicalJsonDigestSteps();
		init_localPath();
		init_targetIdentity();
		init_analysisProfile();
		init_jsonValue();
		init_immutableJson();
		init_digests();
		init_relationshipCoverage();
		ANALYSIS_EVIDENCE_PREDICATE = "rea.analysis";
		providerSchema = z.strictObject({
			id: z.string().min(1),
			name: z.string().min(1),
			version: z.string().nullable()
		});
		SELECTION_FORMATS = {
			"entry-point": ["raw-binary", "gamecube-dol"],
			"esp-flash": ["esp-flash-image"],
			"universal-slice": ["mach-o-universal"]
		};
		subjectIdentitySchema = withEvidenceSubjectDeclaration(z.strictObject({
			kind: z.literal("file"),
			sha256: digestSchema,
			selection: fileTargetSelectionSchema.nullable()
		})).superRefine((identity, context) => {
			if (identity.selection !== null && !SELECTION_FORMATS[identity.selection.kind].includes(identity.format)) context.addIssue({
				code: "custom",
				path: ["selection"],
				message: `A ${identity.selection.kind} selection does not apply to format ${identity.format}`
			});
		});
		fileSubjectSchema = z.strictObject({
			/** The committed target identity; the remaining members are display facts. */
			identity: subjectIdentitySchema,
			name: z.string().min(1),
			local_path: nulFreeStringSchema
		});
		sessionSubjectIdentitySchema = sessionTargetIdentitySchema.extend({ target: z.union([subjectIdentitySchema, unknownTargetIdentitySchema]) });
		nonFileSubjectSchema = z.strictObject({
			identity: z.union([nonFileTargetIdentitySchema, sessionSubjectIdentitySchema]),
			name: z.null(),
			local_path: z.null()
		});
		subjectSchema = z.union([fileSubjectSchema, nonFileSubjectSchema]);
		evidenceSubjectSchema = subjectSchema;
		evidenceLocationSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("address"),
				address: z.string().min(1)
			}),
			z.strictObject({
				kind: z.literal("address-range"),
				start: z.string().min(1),
				end: z.string().min(1)
			}),
			z.strictObject({
				kind: z.literal("artifact-path"),
				path: z.string().min(1)
			}),
			z.strictObject({
				kind: z.literal("file-offset"),
				offset: z.int().min(0)
			}),
			z.strictObject({
				kind: z.literal("file-offset-range"),
				start: z.int().min(0),
				end: z.int().min(0)
			})
		]);
		evidenceAuthoritySchema = z.enum([
			"shipped-artifact",
			"controlled-replay",
			"historical-reference",
			"external-service",
			"analyst-inference"
		]);
		executionEnvironmentSchema = z.strictObject({
			id: z.string().min(1),
			platform: z.string().min(1),
			architecture: z.string().min(1),
			isolation: z.enum([
				"none",
				"process",
				"container",
				"virtual-machine"
			])
		});
		callerInputPathsSchema = z.record(nulFreeStringSchema, z.union([nulFreeStringSchema, z.array(nulFreeStringSchema)]));
		evidenceBaseSchema = z.object({
			evidence_id: prefixedDigestSchema("ev"),
			/** Selects the reader; not part of the committed content. */
			evidence_format: evidenceFormatSchema,
			subject: subjectSchema,
			provider: providerSchema,
			analysis_profile: analysisProfileSchema.nullable(),
			predicate_type: z.string().min(1),
			operation: z.string().min(1),
			parameters: jsonObjectSchema,
			/** Verbatim selected path; present only when the request selected one directly. */
			caller_input_path: nulFreeStringSchema.exactOptional().describe("Verbatim direct-request path; not part of semantic identity."),
			caller_input_paths: callerInputPathsSchema.exactOptional().describe("Verbatim auxiliary input paths keyed by argument name; repeated selections retain their order. Caller assertions are outside semantic identity."),
			raw_result: jsonValueSchema.nullable(),
			normalized_result: jsonValueSchema,
			confidence: z.enum([
				"observed",
				"derived",
				"inferred"
			]),
			authority: evidenceAuthoritySchema,
			environment: executionEnvironmentSchema.nullable(),
			limitations: z.array(z.string()),
			relationship_coverage: relationshipCoverageSchema.nullable(),
			locations: z.array(evidenceLocationSchema),
			evidence_links: z.array(prefixedDigestSchema("ev"))
		}).strict();
		validateAnalysisProfileProvider = (evidence, context) => {
			const profile = evidence.analysis_profile;
			if (profile !== null && (profile.provider.id !== evidence.provider.id || profile.provider.name !== evidence.provider.name || profile.provider.version !== evidence.provider.version)) context.addIssue({
				code: "custom",
				path: ["analysis_profile", "provider"],
				message: "Analysis profile provider does not match Evidence provider"
			});
		};
		evidenceSchema = evidenceBaseSchema.superRefine(validateAnalysisProfileProvider);
		authenticatedEvidenceSchema = evidenceSchema.superRefine((evidence, context) => {
			const { evidence_id: evidenceId, ...withoutId } = evidence;
			if (computeEvidenceId(withoutId) !== evidenceId) context.addIssue({
				code: "custom",
				path: ["evidence_id"],
				message: "Evidence semantic identifier does not match its record"
			});
		});
		immutableEvidenceSnapshots = new WeakMap();
		immutableResultSchema = z.custom(isImmutableJsonSnapshot).superRefine((value, context) => {
			const issue = jsonValueValidationIssue(value);
			if (issue !== undefined) context.addIssue({
				code: "custom",
				message: issue
			});
		});
		isFileSubject = (subject) => subject?.identity.kind === "file";
		evidenceSubjectTarget = (subject) => !isFileSubject(subject) ? undefined : {
			path: subject.local_path,
			sha256: subject.identity.sha256,
			format: subject.identity.format,
			name: subject.name,
			...subject.identity.architecture === null ? {} : { architecture: subject.identity.architecture },
			...subject.identity.selection === null ? {} : { selection: subject.identity.selection }
		};
		evidenceSubjectInput = (subject) => isFileSubject(subject) ? evidenceSubjectTarget(subject) : subject.identity;
		evidenceSubjectTargetIdentity = (target) => "kind" in target ? binaryTargetIdentity(target) : {
			kind: "file",
			sha256: target.sha256,
			format: target.format,
			architecture: target.architecture ?? null,
			selection: target.selection ?? null
		};
		rebindEvidenceSubjectTargetPath = (subject, target) => sameTargetIdentity(evidenceSubjectTargetIdentity(subject), evidenceSubjectTargetIdentity(target)) ? {
			...subject,
			path: target.path
		} : subject;
		evidenceSubject = (target) => subjectSchema.parse("path" in target ? {
			identity: evidenceSubjectTargetIdentity(target),
			name: ("name" in target ? target.name : undefined) ?? (basename(target.path) || "artifact"),
			local_path: target.path
		} : {
			identity: target,
			name: null,
			local_path: null
		});
		evidenceTargetIdentity = (evidence) => evidence.subject?.identity ?? null;
		evidenceFileTarget = (evidence) => {
			const identity = evidenceTargetIdentity(evidence);
			return identity?.kind === "file" ? identity : undefined;
		};
		evidenceSubjectDisplay = (evidence) => {
			const subject = evidence.subject;
			return isFileSubject(subject) ? {
				name: subject.name,
				local_path: subject.local_path
			} : undefined;
		};
		evidenceSemanticContent = (evidence) => ({
			subject: evidence.subject.identity,
			provider: evidence.provider,
			analysis_profile: evidence.analysis_profile,
			predicate_type: evidence.predicate_type,
			operation: evidence.operation,
			parameters: evidence.parameters,
			raw_result: evidence.raw_result,
			normalized_result: evidence.normalized_result,
			confidence: evidence.confidence,
			authority: evidence.authority,
			environment: evidence.environment,
			limitations: evidence.limitations,
			relationship_coverage: evidence.relationship_coverage,
			locations: evidence.locations,
			evidence_links: evidence.evidence_links
		});
		computeEvidenceId = (evidence) => `ev_${digestCanonicalValue(evidenceSemanticContent(evidence), "Evidence")}`;
		parseEvidence = (input) => {
			const immutable = typeof input === "object" && input !== null ? immutableEvidenceSnapshots.get(input) : undefined;
			if (immutable !== undefined) return immutable;
			admitEvidenceRecordFormat(input);
			return authenticatedEvidenceSchema.parse(input);
		};
		evidenceDisplayMetadataAgree = (left, right) => left.subject?.name === right.subject?.name && left.subject?.local_path === right.subject?.local_path && left.caller_input_path === right.caller_input_path && isDeepStrictEqual(left.caller_input_paths, right.caller_input_paths);
		immutableEvidence = (input) => {
			const parsed = parseEvidence(input);
			return rememberImmutableEvidence(canBorrowParsedJsonSnapshot(input, parsed) ? input : parsed);
		};
		rebindEvidenceToTargetPath = (evidence, target) => {
			const subject = evidence.subject;
			if (!isFileSubject(subject)) return evidence;
			if (!sameTargetIdentity(subject.identity, evidenceSubjectTargetIdentity(target))) return evidence;
			if (target.path === subject.local_path && (target.name === undefined || target.name === subject.name)) return evidence;
			const reboundSubject = subjectSchema.parse({
				...subject,
				name: target.name ?? (basename(target.path) || "artifact"),
				local_path: target.path
			});
			const reboundEvidence = {
				...evidence,
				subject: reboundSubject
			};
			if (!isImmutableEvidence(evidence)) return immutableEvidence(reboundEvidence);
			return rememberReboundEvidence(evidence, reboundEvidence);
		};
		withEvidenceCallerInputPath = (evidence, rawPath, additionalPaths) => {
			const callerInputPath = rawPath === undefined ? undefined : nulFreeStringSchema.parse(rawPath);
			const owned = immutableEvidence(evidence);
			const paths = additionalPaths === undefined ? undefined : callerInputPathsSchema.parse(additionalPaths);
			const samePaths = paths === undefined || isDeepStrictEqual(owned.caller_input_paths, paths);
			if ((callerInputPath === undefined || owned.caller_input_path === callerInputPath) && samePaths) return owned;
			const rebound = {
				...owned,
				...callerInputPath === undefined ? {} : { caller_input_path: callerInputPath },
				...paths === undefined ? {} : { caller_input_paths: paths }
			};
			return rememberReboundEvidence(owned, rebound);
		};
		rememberReboundEvidence = (source, rebound) => {
			for (const key of Object.keys(source)) immutableJsonSnapshotMember(source, key);
			return rememberImmutableEvidence(rebound);
		};
		isImmutableEvidence = (evidence) => immutableEvidenceSnapshots.has(evidence);
		rememberImmutableEvidence = (evidence) => {
			freezeJsonSnapshot(evidence);
			immutableEvidenceSnapshots.set(evidence, evidence);
			return evidence;
		};
		createEvidence = (target, provider, observation, options) => {
			const { normalized, sharedResult } = normalizeEvidenceObservation(target, provider, observation, options?.callerTarget);
			const evidence = {
				...normalized,
				evidence_id: computeEvidenceId(normalized)
			};
			if (sharedResult || options?.immutable === true) {
				freezeOwnedJsonTreeSnapshot(evidence);
				immutableEvidenceSnapshots.set(evidence, evidence);
			}
			return evidence;
		};
		evidenceEnvelopeForAdmission = (target, provider, observation, callerTarget) => {
			const subject = evidenceSubject(target);
			const callerInputPath = callerTarget?.callerInputPath !== undefined && isFileSubject(subject) && subject.local_path === callerTarget.path && sameTargetIdentity(subject.identity, binaryTargetIdentity(callerTarget)) ? callerTarget.callerInputPath : undefined;
			return {
				...callerInputPath === undefined ? {} : { caller_input_path: callerInputPath },
				evidence_id: `ev_${"0".repeat(64)}`,
				evidence_format: 2,
				subject,
				provider: {
					id: provider.id,
					name: provider.name,
					version: provider.version
				},
				analysis_profile: observation.analysisProfile ?? null,
				predicate_type: observation.predicateType ?? "rea.analysis",
				operation: observation.operation,
				parameters: observation.parameters,
				raw_result: observation.rawResult ?? null,
				normalized_result: observation.result,
				confidence: observation.confidence ?? "observed",
				authority: observation.authority ?? (subject.identity.kind === "unknown" ? "analyst-inference" : "shipped-artifact"),
				environment: observation.environment ?? null,
				limitations: observation.limitations ?? [],
				...observation.relationshipCoverage === undefined ? { relationship_coverage: null } : { relationship_coverage: observation.relationshipCoverage },
				locations: observation.locations ?? [],
				evidence_links: observation.evidenceLinks ?? []
			};
		};
		normalizeEvidenceObservation = (target, provider, observation, callerTarget) => {
			const envelope = evidenceEnvelopeForAdmission(target, provider, observation, callerTarget);
			const sharedResult = typeof observation.result === "object" && observation.result !== null && isImmutableJsonSnapshot(observation.result);
			const selectedSchema = sharedResult ? evidenceSchema.safeExtend({ normalized_result: immutableResultSchema }) : evidenceSchema;
			const normalized = selectedSchema.parse(envelope);
			return {
				normalized,
				sharedResult
			};
		};
	})))();
}

//#endregion
export { init_zipCentralHeader as $, init_analysisProfile as A, targetFormatsOfKind as B, validateAnalysisProfileProvider as C, committedProviderSchema as D, analysisProfilesEqual as E, withEvidenceSubjectDeclaration as F, hasTrailingZipArchive as G, ZIP_NON_ENTRY_LIMITATION as H, BINARY_TARGET_FORMATS as I, init_zipPackageFormat as J, hasZipLocalHeader as K, BINARY_TARGET_FORMAT_KINDS as L, init_canonicalJsonDigestSteps as M, evidenceSubjectFormatSchema as N, committedProvidersEqual as O, init_evidenceSubject as P, ZIP_CENTRAL_HEADER as Q, TARGET_FORMAT_HINTS as R, rebindEvidenceToTargetPath as S, analysisProfileSchema as T, ZIP_PACKAGE_FORMATS as U, ZIP_APPLICATION_PACKAGE_FORMATS as V, ZIP_SIGNATURES as W, zipPackageFormatForPath as X, isZipPackageFormat as Y, zipRootPackageFormat as Z, init_evidence as _, relationshipCoverageLimitations as _t, evidenceDisplayMetadataAgree as a, artifactTargetSelectedPath as at, providerSchema as b, fixedTupleSchema as bt, evidenceLocationSchema as c, RECREATE_EVIDENCE_GUIDANCE as ct, evidenceSubjectDisplay as d, init_evidenceFormat as dt, readZipCentralExtent as et, evidenceSubjectInput as f, isUnsupportedEvidenceFormat as ft, immutableEvidence as g, partialRelationshipCoverageSchema as gt, evidenceTargetIdentity as h, init_relationshipCoverage as ht, evidenceAuthoritySchema as i, RAW_ONLY_ARCHITECTURES as it, canonicalJsonDigestSteps as j, createAnalysisProfile as k, evidenceSchema as l, admitEvidenceBundleFormat as lt, evidenceSubjectTarget as m, completeRelationshipCoverageSchema as mt, createEvidence as n, HEADER_ARCHITECTURE_EXCLUSIONS as nt, evidenceEnvelopeForAdmission as o, init_binaryTargetTypes as ot, evidenceSubjectSchema as p, combineRelationshipDiscovery as pt, hasZipSignature as q, createImmutableEvidenceSteps as r, PE_CODEVIEW_PREFIX_BYTES as rt, evidenceFileTarget as s, isMachOFormat as st, ANALYSIS_EVIDENCE_PREDICATE as t, BINARY_ARCHITECTURES as tt, evidenceSubject as u, evidenceFormatSchema as ut, isImmutableEvidence as v, relationshipCoverageSchema as vt, withEvidenceCallerInputPath as w, rebindEvidenceSubjectTargetPath as x, init_fixedTupleSchema as xt, parseEvidence as y, unknownRelationshipCoverageSchema as yt, init_targetFormats as z };