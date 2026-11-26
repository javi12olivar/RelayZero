import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, EvidenceFileError, ParseFailureError, cancelledBy, errorMessage, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_evidenceErrors, init_fixedAllowanceRemediation, init_jsonValue, init_localPath, init_parseFailure, isAborted, jsonValueSchema, localPathStringSchema, parseFailureFromCause } from "./jsonSerialization-DAF9DVXC.js";
import { init_internalInvariant, init_parseFailureAnalysisError, init_strictUtf8, invariantViolation, isParseLimit, parseLimitConstraint, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryFormatFailure, BinaryMappingFailure, BinaryReader, BinaryResourceFailure, absoluteCallerPath, createFileMappingIndex, init_binaryContainer, init_callerPath, isZeroFilledSpan, mappedFileOffset } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { AnalysisCleanupLease, ArtifactReaderFailure, ArtifactResourceScope, artifactFileCompletion, artifactFilePrimaryFacts, assertArtifactReadActive, bindArtifactFileCleanup, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_TextFileWrite, init_readStableArtifact, init_resources, projectOwnedArtifactIdentityFailure, projectSelectedArtifactFileFailure, readStableArtifact, stableArtifactInputFailure, writeTextParts } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_jsonStringByteLength, init_jsonValueByteLength, jsonStringByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { contractNamed, deliverWithService, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { IL2CPP_METADATA_SECTION_NAMES, IL2CPP_METADATA_VERSIONS, IL2CPP_SLICE_SELECTORS, binaryMetadataArchitecture, firstDeclaringTypeCycle, il2cppMetadataSchema, il2cppMetadataSectionNames, init_binaryMetadataArchitecture, init_il2cppDeclaringTypes, init_il2cppMetadata, inspectIl2cppMetadataInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { init_AnalysisViewService, requireAnalysisViewRetention, summarizeRetainedAnalysis } from "./AnalysisViewService-D_M3W3PD.js";
import { init_machoSliceSelection, requireSelectedNativeImage, selectMachoSlice } from "./machoSliceSelection-DdTVvVl5.js";
import { ElfPointerRelocationFailure, init_elfPointerRelocations, readElfPointerValuesSteps } from "./elfPointerRelocations-mNe84IFG.js";
import { init_appleMachoFixups, init_appleMachoSelection, parseMachoLayout, parsePointerFixupsSteps } from "./appleMachoSelection-B-dGBE_6.js";
import { init_il2cppMetadataHeaderPrefix, observeIl2cppMetadataHeaderPrefix } from "./il2cppMetadataHeaderPrefix-hijzXSMk.js";
import { init_readBinaryContainer, readBinaryContainer, readBinaryContainerCooperative } from "./readBinaryContainer-inCoG62k.js";
import { MAX_GHIDRA_SEED_BYTES, MAX_GHIDRA_SEED_ENTRIES, MAX_GHIDRA_SEED_NAME_LENGTH, init_ghidraSeedFile } from "./ghidraSeedFile-Cwvba7r7.js";
import { IL2CPP_TOOL_CONTRACTS, init_il2cppToolContracts } from "./il2cppToolContracts-BAlwyFY0.js";
import { isAbsolute } from "node:path";
import { z } from "zod";
import { lstat } from "node:fs/promises";
import { setImmediate } from "node:timers/promises";

//#region dist/il2cpp/Il2cppGhidraSeeds.js
var OPERATION$4, SEED_ALLOWANCES, capacity, ghidraDefaultBase, typeName, il2cppGhidraSeeds;
function init_Il2cppGhidraSeeds() {
	return (init_Il2cppGhidraSeeds = __esmMin((() => {
		init_analysisErrorCore();
		init_fixedAllowanceRemediation();
		init_ghidraSeedFile();
		OPERATION$4 = "inspect_il2cpp_metadata";
		SEED_ALLOWANCES = {
			name: {
				name: "The IL2CPP Ghidra seed-name allowance",
				kind: "count",
				limit: MAX_GHIDRA_SEED_NAME_LENGTH,
				unit: "characters"
			},
			file: {
				name: "The IL2CPP Ghidra seed-file allowance",
				kind: "bytes",
				limit: MAX_GHIDRA_SEED_BYTES,
				unit: "bytes"
			},
			entry: {
				name: "The IL2CPP Ghidra seed-entry allowance",
				kind: "count",
				limit: MAX_GHIDRA_SEED_ENTRIES,
				unit: "entries"
			}
		};
		capacity = (message, allowance) => {
			const { name, kind, limit, unit } = SEED_ALLOWANCES[allowance];
			return new AnalysisResourceConstraintError(OPERATION$4, "capacity", message, {
				maximum_seed_bytes: MAX_GHIDRA_SEED_BYTES,
				maximum_seed_entries: MAX_GHIDRA_SEED_ENTRIES,
				maximum_seed_name_characters: MAX_GHIDRA_SEED_NAME_LENGTH
			}, fixedAllowanceOptions(name, kind, {
				limit,
				unit
			}));
		};
		ghidraDefaultBase = (binary) => {
			const linked = BigInt(binary.image_base);
			return binary.format === "elf" && linked === 0n ? 1048576n : linked;
		};
		typeName = (report, index) => {
			const parts = [];
			let namespace = "";
			const seen = new Set();
			let length = 0;
			for (let at = index; at !== -1;) {
				if (seen.has(at)) throw new AnalysisInputError(OPERATION$4, undefined, [{
					path: ["types", at],
					reason: "invalid_format",
					message: "Cyclic type ancestry cannot name a seed."
				}]);
				seen.add(at);
				const type = report.types[at];
				if (type === undefined) throw new AnalysisInputError(OPERATION$4, undefined, [{
					path: ["types", at],
					reason: "invalid_format",
					message: "Seed type owner is unavailable."
				}]);
				length += type.name.length + 1;
				if (length > 2e3) throw capacity("Qualified seed type name exceeds the Ghidra name limit.", "name");
				parts.unshift(type.name);
				namespace = type.namespace;
				if (length + namespace.length > 2e3) throw capacity("Qualified seed type name exceeds the Ghidra name limit.", "name");
				at = type.declaring_type;
			}
			return namespace === "" ? parts.join(".") : `${namespace}.${parts.join(".")}`;
		};
		il2cppGhidraSeeds = (report, base) => {
			if (report.binary === null) throw new AnalysisInputError(OPERATION$4, undefined, [{
				path: ["binary_path"],
				reason: "invalid_value",
				message: "Ghidra seeds need a report linked with binary_path."
			}]);
			const seeded = new Map();
			const lines = [];
			let folded = 0;
			let withoutAddress = 0, noBody = 0, unknown = 0, bytes = 0;
			const typeNames = new Map();
			const reserve = (length) => {
				if (length > 33554432 - bytes) throw capacity("Seed file exceeds Ghidra byte admission.", "file");
				bytes += length;
			};
			const emit = (text) => {
				reserve(Buffer.byteLength(text));
				lines.push(text);
			};
			/** Seed `name` at base + rva, or fold it under the name already there. */
			const seed = (rva, raw, path) => {
				const address = base + BigInt(rva);
				if (address < 0n || address > 18446744073709551615n) throw new AnalysisInputError(OPERATION$4, undefined, [{
					path: ["seed_base"],
					reason: "invalid_value",
					message: "Rebased seed address exceeds 64 bits."
				}]);
				if (raw.length > 2e3) throw capacity("Qualified method seed name exceeds Ghidra character admission.", "name");
				const name = raw.replace(/\s/gu, "_");
				if (name.includes("\0")) throw new AnalysisInputError(OPERATION$4, undefined, [{
					path,
					reason: "invalid_format",
					message: "Seed names cannot contain NUL."
				}]);
				const group = seeded.get(address);
				if (group !== undefined) {
					folded++;
					if (group.also.length === 0) reserve(Buffer.byteLength(`# folded 0x${address.toString(16)} ${group.kept} also\n`));
					reserve(Buffer.byteLength(` ${name}`));
					group.also.push(name);
					return;
				}
				seeded.set(address, {
					kept: name,
					also: []
				});
				if (seeded.size > 1e6) throw capacity("Seed function count exceeds Ghidra entry admission.", "entry");
				emit(`0x${address.toString(16)}\tfunction\t${name}\n`);
			};
			report.methods.forEach((method, index) => {
				const rva = report.method_addresses[index]?.rva ?? null;
				if (rva === null) {
					withoutAddress++;
					if (report.method_addresses[index]?.state === "no-body") noBody++;
					else unknown++;
					return;
				}
				let ownerName = typeNames.get(method.declaring_type);
				if (ownerName === undefined) {
					ownerName = typeName(report, method.declaring_type);
					typeNames.set(method.declaring_type, ownerName);
				}
				if (ownerName.length + 2 + method.name.length > 2e3) throw capacity("Qualified method seed name exceeds Ghidra character admission.", "name");
				seed(rva, `${ownerName}$$${method.name}`, [
					"methods",
					index,
					"name"
				]);
			});
			let genericInstances = 0, genericWithoutSeed = 0;
			report.generic_method_instances?.forEach((row, index) => {
				if (row.rva === null || row.name === null) {
					genericWithoutSeed++;
					return;
				}
				genericInstances++;
				seed(row.rva, row.name, [
					"generic_method_instances",
					index,
					"name"
				]);
			});
			const foldedGroups = [...seeded].filter(([, group]) => group.also.length > 0).map(([address, group]) => ({
				address: `0x${address.toString(16)}`,
				kept: group.kept,
				also: group.also
			}));
			for (const group of foldedGroups) {
				lines.push(`# folded ${group.address} ${group.kept} also`);
				for (const name of group.also) lines.push(` ${name}`);
				lines.push("\n");
			}
			emit(`# metadata_sha256 ${report.artifact.sha256}\n# binary_sha256 ${report.binary.artifact.sha256}\n# link_base ${report.binary.image_base}\n# seed_base 0x${base.toString(16)}\n`);
			return {
				text: lines.join(""),
				functions: seeded.size,
				folded,
				folded_groups: foldedGroups,
				without_address: withoutAddress,
				no_body: noBody,
				unknown,
				generic_instances: report.generic_method_instances == null ? null : genericInstances,
				generic_without_seed: report.generic_method_instances == null ? null : genericWithoutSeed
			};
		};
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppGhidraSeedWriter.js
var OPERATION$3, invalid, Il2cppGhidraSeedWriter;
function init_Il2cppGhidraSeedWriter() {
	return (init_Il2cppGhidraSeedWriter = __esmMin((() => {
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_evidenceErrors();
		init_providerCleanupError();
		init_result();
		init_Il2cppGhidraSeeds();
		OPERATION$3 = "inspect_il2cpp_metadata";
		invalid = (field, message) => new AnalysisInputError(OPERATION$3, undefined, [{
			path: [field],
			reason: "invalid_value",
			message
		}]);
		Il2cppGhidraSeedWriter = class {
			#resources = new ArtifactResourceScope();
			#cleanup = AnalysisCleanupLease.forCloseOwner(this.#resources, "IL2CPP seed output resources");
			#writing = false;
			async check(output, options) {
				if (options?.signal?.aborted) return err(cancelledBy(OPERATION$3, options.signal));
				if (!isAbsolute(output.path)) return err(invalid("ghidra_seeds", "Seed output needs an absolute filesystem path."));
				if (output.base !== undefined && !/^0x[0-9a-fA-F]{1,16}$/u.test(output.base)) return err(invalid("seed_base", "Seed base must be a 64-bit hexadecimal address."));
				try {
					await lstat(output.path);
					return err(invalid("ghidra_seeds", `--ghidra-seeds ${output.path} already exists; seed files are created, never replaced.`));
				} catch (cause) {
					if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return ok(undefined);
					if (cause instanceof Error && "code" in cause && cause.code === "ENOTDIR") return err(invalid("ghidra_seeds", `--ghidra-seeds ${output.path} has a parent path component that is not a directory; choose an output path inside an existing directory.`));
					return err(new EvidenceFileError("write", "io", {
						path: output.path,
						cause
					}));
				}
			}
			async write(report, output, options) {
				if (this.#writing || this.#resources.hasPending || this.#cleanup.released) return err(new AnalysisResourceConstraintError(OPERATION$3, "capacity", "Seed output is busy, closed, or awaiting owned cleanup.", { maximum_concurrent_seed_exports: 1 }));
				this.#writing = true;
				try {
					return await this.#resources.run(() => this.#write(report, output, options));
				} finally {
					this.#writing = false;
				}
			}
			async #write(report, output, options) {
				const ready = await this.check(output, options);
				if (!ready.ok) return ready;
				if (report.binary === null) return err(invalid("binary_path", "Ghidra seeds need binary_path."));
				let seeds;
				try {
					seeds = il2cppGhidraSeeds(report, output.base === undefined ? ghidraDefaultBase(report.binary) : BigInt(output.base));
				} catch (cause) {
					if (cause instanceof AnalysisError) return err(cause);
					throw cause;
				}
				const written = await writeTextParts([seeds.text], output.path, false, this.#resources, options?.signal === undefined ? undefined : {
					signal: options.signal,
					operation: OPERATION$3
				});
				if (!written.ok) {
					if (written.error.cleanupIncomplete) this.#cleanup.bindCleanupError(written.error);
					return written;
				}
				return ok({
					...written.value,
					functions: seeds.functions,
					folded: seeds.folded,
					no_body: seeds.no_body,
					unknown: seeds.unknown,
					generic_instances: seeds.generic_instances
				});
			}
			async close() {
				try {
					await this.#cleanup.release();
				} catch (cause) {
					if (!(cause instanceof ArtifactReaderFailure) || cause.cleanup === undefined) throw cause;
					const error = new ProviderCleanupError("il2cpp-metadata", cause.cleanup.resources, { reason: cause.cleanup.reason }, {
						cause,
						operation: OPERATION$3
					});
					this.#cleanup.bindCleanupError(error);
					throw error;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/application/il2cpp/Il2cppMetadataService.js
var OPERATION$2, NO_RETENTION, Il2cppMetadataService;
function init_Il2cppMetadataService() {
	return (init_Il2cppMetadataService = __esmMin((() => {
		init_AnalysisInput();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_AnalysisViewService();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_evidence();
		init_il2cppMetadata();
		init_result();
		init_errorMessage();
		OPERATION$2 = "inspect_il2cpp_metadata";
		NO_RETENTION = {
			evidenceById: undefined,
			recordEvidence: undefined
		};
		Il2cppMetadataService = class {
			provider;
			seeds;
			constructor(provider, seeds) {
				this.provider = provider;
				this.seeds = seeds;
			}
			async close() {
				let failure;
				for (const close of [() => this.provider.close(), () => this.seeds?.close()]) {
					try {
						await close();
					} catch (cause) {
						const next = cause instanceof AnalysisError ? cause : new ProviderCleanupError(this.provider.identity.id, [], { reason: errorMessage(cause) }, {
							cause,
							operation: OPERATION$2
						});
						failure = failure === undefined ? next : analysisErrorWithCleanupDependencies(failure, next, OPERATION$2);
					}
				}
				if (failure !== undefined) throw failure;
			}
			inspect(rawInput, options, retention = NO_RETENTION) {
				return this.#inspect(rawInput, options, retention);
			}
			/** Explicit output workflow for CLI/SDK callers; ordinary inspection stays read-only. */
			inspectWithGhidraSeeds(rawInput, output, options) {
				return this.#inspect(rawInput, options, NO_RETENTION, output);
			}
			/** Inspect one explicitly selected file; detail changes delivery, not decoded coverage. */
			async #inspect(rawInput, options, retention, output) {
				const input = parseAnalysisInput(OPERATION$2, rawInput, inspectIl2cppMetadataInputSchema, options?.signal);
				if (!input.ok) return input;
				if (output !== undefined) {
					if (input.value.binary_path === undefined) return err(new AnalysisInputError(OPERATION$2, undefined, [{
						path: ["ghidra_seeds"],
						reason: "invalid_value",
						message: "Ghidra seed output links method addresses in binary_path."
					}]));
					if (this.seeds === undefined) return err(new AnalysisOutputError(OPERATION$2, "No seed output adapter is configured."));
					const ready = await this.seeds.check(output, options);
					if (!ready.ok) return ready;
				}
				const { detail, ...providerInput } = input.value;
				if (detail === "summary") {
					const ready = requireAnalysisViewRetention(OPERATION$2, retention);
					if (!ready.ok) return ready;
				}
				const inspected = await this.provider.inspect(providerInput, options);
				if (!inspected.ok) return inspected;
				const report = il2cppMetadataSchema.safeParse(inspected.value);
				if (!report.success || report.data.artifact.path !== providerInput.path || (report.data.binary?.artifact.path ?? undefined) !== providerInput.binary_path || providerInput.binary_architecture !== undefined && report.data.binary?.architecture !== providerInput.binary_architecture) return err(new AnalysisOutputError(OPERATION$2, "IL2CPP metadata reader returned malformed metadata or changed the selected artifact identity."));
				const value = report.data;
				const evidence = this.#evidence(value, providerInput, output);
				let seedReceipt;
				const cancelled = (signal) => err(cancelledBy(OPERATION$2, signal, {
					partialObservation: evidence,
					...seedReceipt === undefined ? {} : { diagnostics: { published_seed_output: { ...seedReceipt } } }
				}));
				if (isAborted(options?.signal)) return cancelled(options.signal);
				if (output !== undefined && this.seeds !== undefined) {
					const written = await this.seeds.write(value, output, options);
					if (!written.ok) {
						written.error.retainPartialObservation(evidence);
						return written;
					}
					seedReceipt = written.value;
				}
				if (isAborted(options?.signal)) return cancelled(options.signal);
				return detail === "summary" ? summarizeRetainedAnalysis(evidence, retention) : ok(evidence);
			}
			#evidence(value, providerInput, output) {
				return createEvidence({
					path: value.artifact.path,
					sha256: value.artifact.sha256,
					format: "file"
				}, this.provider.identity, {
					operation: OPERATION$2,
					parameters: {
						...Object.fromEntries(Object.entries(providerInput).filter(([, value]) => value !== undefined)),
						...output === undefined ? {} : {
							ghidra_seeds: output.path,
							...output.base === undefined ? {} : { seed_base: output.base }
						}
					},
					result: value,
					confidence: value.binary === null ? "observed" : value.binary.code_gen_modules_field === null || value.binary.types_field === null ? "inferred" : "derived",
					limitations: value.limitations,
					locations: [
						{
							kind: "artifact-path",
							path: value.artifact.path
						},
						...value.binary === null ? [] : [{
							kind: "artifact-path",
							path: value.binary.artifact.path
						}],
						...value.sections.filter(({ name, size }) => size > 0 && (name === "images" || name === "typeDefinitions" || name === "methods" || name === "nestedTypes" || name === "strings" || name === "fields" || name === "properties" || name === "events" || name === "parameters" || name === "stringLiterals" || name === "stringLiteralData")).map(({ offset, size }) => ({
							kind: "file-offset-range",
							start: offset,
							end: offset + size
						}))
					]
				});
			}
		};
	})))();
}

//#endregion
//#region dist/il2cpp/Il2CppMetadataProviderIdentity.js
var IL2CPP_METADATA_PROVIDER_IDENTITY;
function init_Il2CppMetadataProviderIdentity() {
	return (init_Il2CppMetadataProviderIdentity = __esmMin((() => {
		IL2CPP_METADATA_PROVIDER_IDENTITY = {
			id: "il2cpp-metadata",
			name: "REA IL2CPP global-metadata reader",
			version: "1"
		};
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppBinaryFormat.js
var IL2CPP_BINARY_BYTES, IL2CPP_BINARY_FAILURE_REASONS, IL2CPP_BINARY_FORMAT, isUnsupported, Il2cppBinaryFormatFailure;
function init_Il2cppBinaryFormat() {
	return (init_Il2cppBinaryFormat = __esmMin((() => {
		init_parseFailure();
		IL2CPP_BINARY_BYTES = 1024 * 1024 * 1024;
		IL2CPP_BINARY_FAILURE_REASONS = {
			unsupported: [
				"unsupported-container",
				"unsupported-pointer-encoding",
				"unsupported-type-kind",
				"generic-methods-unsupported"
			],
			capacity: [
				"native-index-capacity",
				"type-nesting-capacity",
				"native-type-text-capacity"
			],
			malformed: [
				"malformed-container",
				"code-gen-modules-not-found",
				"ambiguous-code-gen-module",
				"code-registration-not-found",
				"invalid-method-pointer",
				"invalid-method-token",
				"metadata-registration-not-found",
				"invalid-type",
				"generic-method-registration-not-found",
				"ambiguous-generic-method-registration"
			]
		};
		IL2CPP_BINARY_FORMAT = "il2cpp-binary";
		isUnsupported = (reason) => IL2CPP_BINARY_FAILURE_REASONS.unsupported.includes(reason);
		Il2cppBinaryFormatFailure = class extends ParseFailureError {
			reason;
			/** What the exceeded maximum counts; set only for a capacity reason. */
			unit;
			constructor(reason, message, maximum, unit) {
				const detail = `${reason}: ${message}`;
				super(maximum !== undefined ? {
					kind: "limit",
					format: IL2CPP_BINARY_FORMAT,
					detail,
					limit: {
						name: reason,
						maximum
					}
				} : isUnsupported(reason) ? {
					kind: "unsupported",
					format: IL2CPP_BINARY_FORMAT,
					detail,
					undecodedContent: false
				} : {
					kind: "malformed",
					format: IL2CPP_BINARY_FORMAT,
					detail
				});
				this.reason = reason;
				this.unit = unit;
				this.name = "Il2cppBinaryFormatFailure";
			}
		};
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppMetadataFormat.js
var IL2CPP_METADATA_FAILURE_REASONS, IL2CPP_METADATA_FORMAT, metadataFailure, Il2cppMetadataFormatFailure, checkedSectionCount, checkRange, readIndex;
function init_Il2cppMetadataFormat() {
	return (init_Il2cppMetadataFormat = __esmMin((() => {
		init_parseFailure();
		IL2CPP_METADATA_FAILURE_REASONS = {
			unsupported: ["unrecognized-magic", "unsupported-version"],
			corrupt: [
				"truncated-header",
				"unexpected-header-size",
				"section-out-of-bounds",
				"section-overlap",
				"record-size-mismatch",
				"type-index-width",
				"index-out-of-range",
				"nested-type-conflict",
				"declaring-type-mismatch",
				"image-range-overlap",
				"invalid-string"
			]
		};
		IL2CPP_METADATA_FORMAT = "il2cpp-metadata";
		metadataFailure = (reason, detail) => IL2CPP_METADATA_FAILURE_REASONS.unsupported.includes(reason) ? {
			kind: "unsupported",
			format: IL2CPP_METADATA_FORMAT,
			detail,
			undecodedContent: false
		} : {
			kind: reason === "truncated-header" ? "truncated" : "malformed",
			format: IL2CPP_METADATA_FORMAT,
			detail
		};
		Il2cppMetadataFormatFailure = class extends ParseFailureError {
			reason;
			constructor(reason, message, options) {
				super(metadataFailure(reason, `${reason}: ${message}`), options);
				this.reason = reason;
				this.name = "Il2cppMetadataFormatFailure";
			}
		};
		checkedSectionCount = (section, recordBytes) => {
			if (section.size % recordBytes !== 0) throw new Il2cppMetadataFormatFailure("record-size-mismatch", `section ${section.name} size ${section.size} is not a whole multiple of its ${recordBytes}-byte records`);
			const count = section.size / recordBytes;
			if (section.count !== null && count !== section.count) throw new Il2cppMetadataFormatFailure("record-size-mismatch", `section ${section.name} size ${section.size} does not hold ${section.count} ${recordBytes}-byte records`);
			return count;
		};
		checkRange = (label, start, length, total) => {
			if (length === 0 && start >= -1 && start <= total) return;
			if (start < 0 || start + length > total) throw new Il2cppMetadataFormatFailure("index-out-of-range", `${label} range [${start}, ${start + length}) is outside the ${total} available entries`);
		};
		readIndex = (reader, offset, width) => {
			if (width === 1) {
				const value = reader.u8(offset);
				return value === 255 ? -1 : value;
			}
			if (width === 2) {
				const value = reader.u16(offset);
				return value === 65535 ? -1 : value;
			}
			return reader.i32(offset);
		};
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppMetadataSectionTable.js
function readIl2cppSectionTable(bytes, names, entryBytes) {
	const reader = new BinaryReader(bytes, true, IL2CPP_METADATA_FORMAT);
	return names.map((name, index) => {
		const at = 8 + index * entryBytes;
		return {
			name,
			offset: reader.i32(at),
			size: reader.i32(at + 4),
			count: entryBytes === 12 ? reader.i32(at + 8) : null
		};
	});
}
var firstIl2cppSectionIssue;
function init_Il2cppMetadataSectionTable() {
	return (init_Il2cppMetadataSectionTable = __esmMin((() => {
		init_binaryContainer();
		init_il2cppMetadataHeaderPrefix();
		init_Il2cppMetadataFormat();
		firstIl2cppSectionIssue = (sections, headerBytes, fileBytes) => {
			for (const section of sections) {
				if (section.offset < 0 || section.size < 0 || (section.count ?? 0) < 0 || section.offset + section.size > fileBytes) return {
					kind: "range",
					section
				};
				if (section.size > 0 && section.offset < headerBytes) return {
					kind: "header",
					section
				};
			}
			const occupied = sections.filter((section) => section.size > 0).sort((a, b) => a.offset - b.offset);
			for (let index = 1; index < occupied.length; index++) {
				const previous = occupied[index - 1];
				const current = occupied[index];
				if (previous.offset + previous.size > current.offset) return {
					kind: "overlap",
					previous,
					current
				};
			}
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppMetadataV108.js
var SECTION_NAMES, HEADER_BYTES, SAMPLE_STRINGS, SAMPLE_BYTES, SCAN_BATCH_BYTES, utf8, inspectIl2cppMetadataV108;
function init_Il2cppMetadataV108() {
	return (init_Il2cppMetadataV108 = __esmMin((() => {
		init_strictUtf8();
		init_il2cppMetadata();
		init_il2cppMetadataHeaderPrefix();
		init_Il2cppMetadataSectionTable();
		init_Il2cppMetadataFormat();
		SECTION_NAMES = [
			...IL2CPP_METADATA_SECTION_NAMES.slice(0, 20),
			"typeInlineArrays",
			...IL2CPP_METADATA_SECTION_NAMES.slice(20),
			"methodSpecsOnGenericType",
			"genericMethodSpecsOnType",
			"methodSpecs",
			"genericMethodFunctionsDefinitions",
			"genericMethodFunctionsDefinitionsWithAdjustor",
			"invokerIndices",
			"rgctxRanges",
			"rgctxValues",
			"staticConstructorTypeIndices"
		];
		HEADER_BYTES = 8 + SECTION_NAMES.length * 12;
		SAMPLE_STRINGS = 16;
		SAMPLE_BYTES = 128;
		SCAN_BATCH_BYTES = 64 * 1024;
		utf8 = strictUtf8Decoder("preserve");
		inspectIl2cppMetadataV108 = async (bytes, afterBatch) => {
			const prefix = observeIl2cppMetadataHeaderPrefix(bytes);
			if (prefix.kind !== "il2cpp" || prefix.version !== 108) return null;
			if (bytes.length < HEADER_BYTES) throw new Il2cppMetadataFormatFailure("unsupported-version", `version 108 layout is unverified; the file has ${bytes.length} bytes, fewer than the assumed ${HEADER_BYTES}-byte header`);
			const sections = readIl2cppSectionTable(bytes, SECTION_NAMES, 12);
			const issue = firstIl2cppSectionIssue(sections, HEADER_BYTES, bytes.length);
			if (issue !== undefined) {
				const detail = issue.kind === "overlap" ? `assumed sections ${issue.previous.name} and ${issue.current.name} overlap at ${issue.current.offset}` : `assumed section ${issue.section.name} (offset ${issue.section.offset}, size ${issue.section.size}, count ${String(issue.section.count)}) is invalid for the ${bytes.length}-byte file`;
				throw new Il2cppMetadataFormatFailure("unsupported-version", `version 108 layout is unverified; ${detail}`);
			}
			const strings = sections[2];
			const end = strings.offset + strings.size;
			const sample = [];
			let start = strings.offset;
			let terminatedCount = 0;
			for (let batch = start; batch < end; batch += SCAN_BATCH_BYTES) {
				const batchEnd = Math.min(end, batch + SCAN_BATCH_BYTES);
				for (let at = batch; at < batchEnd; at++) {
					if (bytes[at] !== 0) continue;
					terminatedCount++;
					if (sample.length < SAMPLE_STRINGS) {
						const length = at - start;
						const raw = bytes.subarray(start, start + Math.min(length, SAMPLE_BYTES));
						let value;
						try {
							value = utf8.decode(raw);
						} catch {
							value = null;
						}
						sample.push({
							offset: start - strings.offset,
							value,
							value_base64: value === null ? raw.toString("base64") : null,
							truncated: length > SAMPLE_BYTES
						});
					}
					start = at + 1;
				}
				await afterBatch?.();
			}
			return {
				magic: prefix.magic,
				metadata_version: 108,
				header_bytes: HEADER_BYTES,
				layout_status: "unverified-with-real-v108-artifact",
				sections,
				strings: {
					terminated_count: terminatedCount,
					unterminated_tail_bytes: end - start,
					sample,
					sample_limit: SAMPLE_STRINGS,
					sample_bytes_per_string: SAMPLE_BYTES
				},
				coverage: "header-and-bounded-string-sample-only"
			};
		};
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppMetadataAdmission.js
var emptyRows, IL2CPP_GENERIC_INSTANCE_MINIMUM_BYTES, createIl2cppMetadataAdmission;
function init_Il2cppMetadataAdmission() {
	return (init_Il2cppMetadataAdmission = __esmMin((() => {
		init_jsonStringByteLength();
		emptyRows = {
			images: {
				name: "",
				type_start: 0,
				type_count: 0
			},
			types: {
				name: "",
				namespace: "",
				method_start: 0,
				method_count: 0,
				nested_type_start: 0,
				nested_type_count: 0,
				declaring_type: 0
			},
			methods: {
				name: "",
				declaring_type: 0
			},
			fields: {
				name: "",
				declaring_type: 0
			},
			properties: {
				name: "",
				declaring_type: 0
			},
			events: {
				name: "",
				declaring_type: 0
			},
			parameters: {
				name: "",
				method: 0
			},
			string_literals: {
				value: "",
				value_base64: null
			}
		};
		IL2CPP_GENERIC_INSTANCE_MINIMUM_BYTES = JSON.stringify({
			state: "unknown",
			address: null,
			rva: null,
			method_spec: 0,
			method: 0,
			name: null
		}).length;
		createIl2cppMetadataAdmission = (limit, exceed, linked = false) => {
			let used = 0;
			const lengths = new Map();
			const text = (value) => {
				const cached = lengths.get(value);
				if (cached !== undefined) return cached;
				const length = jsonStringByteLength(value, limit - used);
				lengths.set(value, length);
				return length;
			};
			return {
				beforeRows(counts) {
					let minimum = 0;
					for (const key of Object.keys(emptyRows)) minimum += counts[key] * JSON.stringify(emptyRows[key]).length;
					if (linked) minimum += counts.methods * (JSON.stringify({
						state: "code",
						address: null,
						rva: null
					}).length + JSON.stringify({
						type: 0,
						name: ""
					}).length) + (counts.fields + counts.parameters) * JSON.stringify({
						type: 0,
						name: ""
					}).length;
					if (minimum > limit) exceed();
				},
				beforeText(bytes) {
					if (bytes > limit - used) exceed();
				},
				onRow(row) {
					let bytes = 2, first = true;
					for (const [key, value] of Object.entries(row)) {
						bytes += (first ? 0 : 1) + text(key) + 1;
						first = false;
						bytes += typeof value === "string" ? text(value) : value === null ? 4 : 1;
						if (used + bytes > limit) exceed();
					}
					used += bytes;
				}
			};
		};
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppBinaryImage.js
/** Open one thin image; a universal Mach-O slice is selected before this. */
function* openImageSteps(image, preparedContainer) {
	const container = preparedContainer ?? readContainer(image);
	if (container.bits !== 64 || container.byte_order !== "little") throw new Il2cppBinaryFormatFailure("unsupported-container", `only 64-bit little-endian images are supported, not ${container.bits}-bit ${container.byte_order}-endian`);
	let elfPointerOverlay;
	try {
		if (container.format === "elf") elfPointerOverlay = yield* readElfPointerValuesSteps(image, {
			bits: 64,
			little: true,
			machine: container.elf.machine,
			dynamicSegments: container.elf.dynamicSegments,
			mappings: container.mappings,
			zeroFills: container.zero_fills
		}, IL2CPP_BINARY_BYTES, { symbolResolution: "image-definitions" });
	} catch (cause) {
		if (cause instanceof ElfPointerRelocationFailure) {
			if (cause.failure.kind === "limit" && cause.unit !== undefined) throw new Il2cppBinaryFormatFailure("native-index-capacity", cause.message, cause.failure.limit.maximum, cause.unit);
			if (cause.reason !== "native-index-capacity") throw new Il2cppBinaryFormatFailure(cause.reason, cause.message);
		}
		if (cause instanceof BinaryFormatFailure) throw new Il2cppBinaryFormatFailure("malformed-container", cause.message);
		throw cause;
	}
	if (container.format === "macho" && container.macho_chained_fixups === true) throw new Il2cppBinaryFormatFailure("unsupported-pointer-encoding", "Mach-O chained fixups are not decoded");
	let machoPointerFixups;
	if (container.format === "macho") {
		const selected = selectMachoSlice(image, {
			mode: "admitted",
			architecture: binaryMetadataArchitecture(container.architecture) ?? container.architecture,
			slice: undefined
		});
		if (!selected.ok) throw new Il2cppBinaryFormatFailure(selected.error.kind === "malformed" ? "malformed-container" : "unsupported-container", selected.error.message);
		try {
			const layout = parseMachoLayout(image, selected.value);
			machoPointerFixups = yield* parsePointerFixupsSteps(image, layout.fixups, layout.segments, layout.baseAddress);
		} catch (cause) {
			const failure = parseFailureFromCause(cause);
			if (failure !== undefined) throw new Il2cppBinaryFormatFailure(failure.kind === "unsupported" ? "unsupported-container" : "malformed-container", failure.message);
			throw cause;
		}
	}
	if (container.format === "pe" && container.image_base === undefined) throw new Il2cppBinaryFormatFailure("malformed-container", "PE image base was not observed");
	const imageBase = container.image_base ?? container.mappings.find((mapping) => mapping.offset === 0)?.address ?? container.mappings.reduce((lowest, mapping) => lowest === undefined || mapping.address < lowest ? mapping.address : lowest, undefined) ?? 0n;
	return {
		stored: new BinaryReader(image, true, container.format),
		container,
		fileMappings: createFileMappingIndex(container.mappings, container.zero_fills),
		imageBase,
		...elfPointerOverlay === undefined ? {} : { elfPointerOverlay },
		...machoPointerFixups === undefined ? {} : { machoPointerFixups }
	};
}
var IL2CPP_SLICE_SELECTION_INPUT, requireIl2cppBinaryImage, OPERATION$1, rejectContainer, readContainer, readIl2cppBinaryContainerCooperative, readStoredWord, readUInt32, hexAddress, isMapped, isZeroFilled, hasPointerArrayCoverage, isExecutable, readSlot, readPointer;
function init_Il2cppBinaryImage() {
	return (init_Il2cppBinaryImage = __esmMin((() => {
		init_parseFailure();
		init_binaryMetadataArchitecture();
		init_il2cppMetadata();
		init_binaryContainer();
		init_readBinaryContainer();
		init_machoSliceSelection();
		init_appleMachoFixups();
		init_appleMachoSelection();
		init_elfPointerRelocations();
		init_Il2cppBinaryFormat();
		IL2CPP_SLICE_SELECTION_INPUT = {
			pathField: "binary_path",
			architectureField: "binary_architecture",
			spelling: Object.fromEntries(Object.entries(IL2CPP_SLICE_SELECTORS).map(([publicName, selector]) => [selector, publicName]))
		};
		requireIl2cppBinaryImage = (operation, path, bytes, architecture) => requireSelectedNativeImage(operation, path, bytes, architecture === undefined ? undefined : IL2CPP_SLICE_SELECTORS[architecture], IL2CPP_SLICE_SELECTION_INPUT);
		OPERATION$1 = "inspect_il2cpp_metadata";
		rejectContainer = (cause) => {
			if (cause instanceof BinaryResourceFailure) throw new Il2cppBinaryFormatFailure("native-index-capacity", cause.message, cause.failure.limit.maximum, "bytes");
			if (cause instanceof BinaryFormatFailure) throw new Il2cppBinaryFormatFailure(cause.kind === "unsupported" ? "unsupported-container" : "malformed-container", cause.message);
			throw cause;
		};
		readContainer = (image) => {
			try {
				return readBinaryContainer(image, OPERATION$1);
			} catch (cause) {
				return rejectContainer(cause);
			}
		};
		readIl2cppBinaryContainerCooperative = async (image, pause) => {
			try {
				return await readBinaryContainerCooperative(image, OPERATION$1, pause);
			} catch (cause) {
				return rejectContainer(cause);
			}
		};
		readStoredWord = (image, address) => {
			try {
				const offset = image.fileMappings.offset(address, 8);
				return image.stored.word(offset, 64);
			} catch (cause) {
				if (cause instanceof BinaryFormatFailure) return null;
				throw cause;
			}
		};
		readUInt32 = (image, address) => {
			if (image.machoPointerFixups?.hasUnresolvedLegacyBytes(address, 4) === true) return "unknown";
			try {
				if (image.elfPointerOverlay?.hasWrites(address, 4) === true) {
					const value = image.elfPointerOverlay.unsignedAt(address, 4);
					return value === undefined ? "unknown" : Number(value);
				}
				return image.stored.u32(image.fileMappings.offset(address, 4));
			} catch (cause) {
				if (cause instanceof BinaryFormatFailure) return null;
				throw cause;
			}
		};
		hexAddress = (value) => `0x${value.toString(16)}`;
		isMapped = (image, address, size) => {
			try {
				image.fileMappings.offset(address, size);
				return true;
			} catch (cause) {
				if (cause instanceof BinaryFormatFailure) return false;
				throw cause;
			}
		};
		isZeroFilled = (image, address, size) => isZeroFilledSpan(image.container.mappings, image.container.zero_fills, address, size);
		hasPointerArrayCoverage = (image, address, count) => {
			const end = address + BigInt(count) * 8n;
			let cursor = address;
			while (cursor < end) {
				let fileEnd = cursor;
				for (const range of image.container.mappings) if (range.address <= cursor && range.address + BigInt(range.size) > fileEnd) fileEnd = range.address + BigInt(range.size);
				let coveredEnd = fileEnd;
				if (fileEnd === cursor) {
					for (const range of image.container.zero_fills) if (range.address <= cursor && range.address + range.size > coveredEnd) coveredEnd = range.address + range.size;
				}
				const stop = coveredEnd < end ? coveredEnd : end;
				const size = Number((stop - cursor) / 8n * 8n);
				if (size <= 0) return false;
				try {
					if (fileEnd === cursor) {
						if (!isZeroFilled(image, cursor, size)) return false;
					} else {
						image.fileMappings.offset(cursor, size);
					}
				} catch (cause) {
					if (cause instanceof BinaryFormatFailure) return false;
					throw cause;
				}
				cursor += BigInt(size);
			}
			return true;
		};
		isExecutable = (image, address) => {
			try {
				const offset = image.fileMappings.offset(address, 1);
				return offset === mappedFileOffset(image.container.executable_mappings ?? [], address, 1);
			} catch (cause) {
				if (cause instanceof BinaryFormatFailure) return false;
				throw cause;
			}
		};
		readSlot = (image, address) => {
			try {
				if (image.elfPointerOverlay !== undefined) {
					const value = image.elfPointerOverlay.unsignedAt(address, 8);
					if (value !== undefined) return value;
					if (image.elfPointerOverlay.hasWrites(address, 8)) return "unknown";
				}
				let raw = readStoredWord(image, address);
				if (raw === null && isZeroFilled(image, address, 8)) raw = 0n;
				if (raw === null) return null;
				if (image.machoPointerFixups !== undefined) {
					const resolution = image.machoPointerFixups.decode(address, raw);
					if (resolution.kind === "bind" || resolution.kind === "unknown") return "unknown";
					if (resolution.kind === "unsupported") throw new Il2cppBinaryFormatFailure("unsupported-pointer-encoding", resolution.reason);
					return resolution.target;
				}
				return raw;
			} catch (cause) {
				if (cause instanceof BinaryMappingFailure) return null;
				if (cause instanceof BinaryFormatFailure) throw new Il2cppBinaryFormatFailure("malformed-container", cause.message);
				throw cause;
			}
		};
		readPointer = (image, address) => {
			const value = readSlot(image, address);
			return typeof value === "bigint" ? value : null;
		};
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppMetadataMembers.js
/** Owners come from already parsed type/method facts, never a second raw-table interpretation. */
function* claim(ranges, total, label) {
	const owners = new Int32Array(total).fill(-1);
	let work = 0;
	for (const [owner, range] of ranges.entries()) {
		if (++work % 256 === 0) yield;
		checkRange(`${label} range of owner ${owner}`, range.start, range.count, total);
		for (let row = range.start; row < range.start + range.count; row++) {
			if (++work % 256 === 0) yield;
			if (owners[row] !== -1) throw new Il2cppMetadataFormatFailure("declaring-type-mismatch", `${label} ${row} is claimed by owners ${owners[row]} and ${owner}`);
			owners[row] = owner;
		}
	}
	return owners;
}
function* readNamed(tables, name, ranges, makeRow) {
	const section = tables.section(name), total = tables.members.counts[name];
	const owners = yield* claim(ranges, total, name), rows = [];
	for (let index = 0; index < total; index++) {
		if (index % 256 === 0) yield;
		const row = makeRow(tables.readString(tables.reader.i32(section.offset + index * tables.members.recordBytes[name]), `${name} ${index} name`), owners[index]);
		if (tables.linkFacts !== undefined && (name === "fields" || name === "parameters")) {
			const column = name === "fields" ? tables.linkFacts.fieldTypes : tables.linkFacts.parameterTypes;
			column[index] = readIndex(tables.reader, section.offset + index * tables.members.recordBytes[name] + (name === "fields" ? 4 : 8), tables.widths.type);
		}
		tables.onRow?.(row);
		rows.push(row);
	}
	return rows;
}
function* readStringLiterals(tables) {
	const { reader, section, indexing, members } = tables;
	const literals = section("stringLiterals"), data = section("stringLiteralData");
	const decoder = strictUtf8Decoder("preserve");
	const decoded = new Map();
	const rows = [];
	if (indexing === "counted" && members.literalRecords === 1) {
		const sentinel = reader.i32(literals.offset);
		if (sentinel < 0 || sentinel > data.size) throw new Il2cppMetadataFormatFailure("index-out-of-range", `empty string literal sentinel ${sentinel} is outside the ${data.size}-byte literal data`);
	}
	for (let index = 0; index < members.counts.string_literals; index++) {
		if (index % 256 === 0) yield;
		const at = literals.offset + index * members.recordBytes.stringLiterals;
		const start = reader.i32(at + (indexing === "counted" ? 0 : 4));
		const length = indexing === "counted" ? reader.i32(at + 4) - start : reader.u32(at);
		if (start < 0 || length < 0 || start + length > data.size) throw new Il2cppMetadataFormatFailure("index-out-of-range", `string literal ${index} [${start}, ${start + length}) is outside the ${data.size}-byte literal data`);
		const key = `${start}:${length}`;
		let literal = decoded.get(key);
		if (literal === undefined) {
			tables.beforeText?.(length);
			const value = reader.bytes.subarray(data.offset + start, data.offset + start + length);
			try {
				literal = {
					value: decoder.decode(value),
					value_base64: null
				};
			} catch {
				tables.beforeText?.(4 * Math.ceil(length / 3));
				literal = {
					value: null,
					value_base64: value.toString("base64")
				};
			}
			decoded.set(key, literal);
		}
		tables.onRow?.(literal);
		rows.push({ ...literal });
	}
	return rows;
}
/** Decode each fact directly into its final row shape, yielding through ownership and content. */
function* readIl2cppMembers(tables, owners) {
	const member = (name, declaring_type) => ({
		name,
		declaring_type
	});
	const fields = yield* readNamed(tables, "fields", owners.fields, member);
	const properties = yield* readNamed(tables, "properties", owners.properties, member);
	const events = yield* readNamed(tables, "events", owners.events, member);
	const parameters = yield* readNamed(tables, "parameters", owners.parameters, (name, method) => ({
		name,
		method
	}));
	return {
		fields,
		properties,
		events,
		parameters,
		string_literals: yield* readStringLiterals(tables)
	};
}
var readIl2cppMemberTables;
function init_Il2cppMetadataMembers() {
	return (init_Il2cppMetadataMembers = __esmMin((() => {
		init_strictUtf8();
		init_Il2cppMetadataFormat();
		readIl2cppMemberTables = ({ typeIndexWidth, indexing, section }) => {
			const recordBytes = {
				fields: 8 + typeIndexWidth,
				properties: 20,
				events: 20 + typeIndexWidth,
				parameters: 8 + typeIndexWidth,
				stringLiterals: indexing === "counted" ? 4 : 8
			};
			const literalRecords = checkedSectionCount(section("stringLiterals"), recordBytes.stringLiterals);
			return {
				recordBytes,
				literalRecords,
				counts: {
					fields: checkedSectionCount(section("fields"), recordBytes.fields),
					properties: checkedSectionCount(section("properties"), recordBytes.properties),
					events: checkedSectionCount(section("events"), recordBytes.events),
					parameters: checkedSectionCount(section("parameters"), recordBytes.parameters),
					string_literals: indexing === "counted" ? Math.max(literalRecords - 1, 0) : literalRecords
				}
			};
		};
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppMetadataFile.js
function* readImages({ reader, section, widths, recordBytes: sizes, counts, readString, onRow }) {
	const images = section("images");
	const typeTotal = counts.typeDefinitions;
	const width = widths.type_definition;
	const result = [];
	for (let index = 0; index < counts.images; index++) {
		if (index % 256 === 0) yield;
		const at = images.offset + index * sizes.images;
		const image = {
			name: readString(reader.i32(at), `image ${index} name`),
			type_start: readIndex(reader, at + 8, width),
			type_count: reader.u32(at + 8 + width)
		};
		checkRange(`image ${index} types`, image.type_start, image.type_count, typeTotal);
		onRow?.(image);
		result.push(image);
	}
	return result;
}
/** Record each type's enclosing type from its declaring type's nestedTypes range. */
function* assignNesting({ reader, section, counts }, types) {
	let work = 0;
	const nestedTypes = section("nestedTypes");
	for (const [index, type] of types.entries()) {
		if (work++ % 256 === 0) yield;
		checkRange(`type ${index} nested types`, type.nested_type_start, type.nested_type_count, counts.nestedTypes);
		for (let offset = 0; offset < type.nested_type_count; offset += 1) {
			if (work++ % 256 === 0) yield;
			const nested = reader.i32(nestedTypes.offset + (type.nested_type_start + offset) * NESTED_TYPE_ENTRY_BYTES);
			const target = types[nested];
			if (target === undefined) throw new Il2cppMetadataFormatFailure("index-out-of-range", `type ${index} lists nested type ${nested} outside the ${types.length} type definitions`);
			if (nested === index) throw new Il2cppMetadataFormatFailure("nested-type-conflict", `type ${index} lists itself as a nested type`);
			if (target.declaring_type !== -1) throw new Il2cppMetadataFormatFailure("nested-type-conflict", `type ${nested} is listed as nested in type ${index} and type ${target.declaring_type}`);
			target.declaring_type = index;
		}
	}
	yield* rejectNestingCycles(types);
}
/** Each enclosing chain must reach a top-level type. */
function* rejectNestingCycles(types) {
	const cycle = yield* firstDeclaringTypeCycle(types);
	if (cycle !== null) throw new Il2cppMetadataFormatFailure("nested-type-conflict", `type ${cycle} is nested inside itself through its declaring types`);
}
function* readTypes(tables) {
	const { reader, section, widths, recordBytes: sizes, counts } = tables;
	const { readString, typeDefinitionTypeIndices } = tables;
	const typeDefinitions = section("typeDefinitions");
	const methodTotal = counts.methods;
	const types = [];
	const memberRanges = {
		fields: [],
		properties: [],
		events: []
	};
	const genericContainerCount = tables.linkFacts === undefined ? 0 : tables.counts.genericContainers;
	for (let index = 0; index < counts.typeDefinitions; index++) {
		if (index % 256 === 0) yield;
		const at = typeDefinitions.offset + index * sizes.typeDefinitions;
		const starts = at + 12 + typeDefinitionTypeIndices * widths.type + widths.generic_container;
		if (tables.linkFacts !== undefined) {
			const genericContainerIndex = readTypeGenericContainer(tables, index);
			if (genericContainerIndex < -1 || genericContainerIndex >= genericContainerCount) throw new Il2cppMetadataFormatFailure("index-out-of-range", `type ${index} generic container ${genericContainerIndex} is outside the ${genericContainerCount} available rows`);
			if (genericContainerIndex !== -1) {
				const argumentCount = readGenericContainer(tables, genericContainerIndex).count;
				if (argumentCount < 0) throw new Il2cppMetadataFormatFailure("index-out-of-range", `type ${index} generic container ${genericContainerIndex} has negative argument count ${argumentCount}`);
				tables.linkFacts.genericTypeArgumentCounts[index] = argumentCount;
			}
		}
		const countsAt = starts + 32;
		const type = {
			name: readString(reader.i32(at), `type ${index} name`),
			namespace: readString(reader.i32(at + 4), `type ${index} namespace`),
			method_start: reader.i32(starts + 4),
			method_count: reader.u16(countsAt),
			nested_type_start: reader.i32(starts + 16),
			nested_type_count: reader.u16(countsAt + 8),
			declaring_type: -1
		};
		checkRange(`type ${index} methods`, type.method_start, type.method_count, methodTotal);
		memberRanges.fields.push({
			start: reader.i32(starts),
			count: reader.u16(countsAt + 4)
		});
		memberRanges.events.push({
			start: reader.i32(starts + 8),
			count: reader.u16(countsAt + 6)
		});
		memberRanges.properties.push({
			start: reader.i32(starts + 12),
			count: reader.u16(countsAt + 2)
		});
		tables.onRow?.(type);
		types.push(type);
	}
	yield* assignNesting(tables, types);
	return {
		types,
		memberRanges
	};
}
function* readMethods({ reader, section, widths, recordBytes: sizes, counts, readString, methodReturnParameterToken, linkFacts, onRow }) {
	const methods = section("methods");
	const typeTotal = counts.typeDefinitions;
	const result = [];
	const parameterRanges = [];
	for (let index = 0; index < counts.methods; index++) {
		if (index % 256 === 0) yield;
		const at = methods.offset + index * sizes.methods;
		const method = {
			name: readString(reader.i32(at), `method ${index} name`),
			declaring_type: readIndex(reader, at + 4, widths.type_definition)
		};
		if (method.declaring_type < -1 || method.declaring_type >= typeTotal) throw new Il2cppMetadataFormatFailure("index-out-of-range", `method ${index} declares type ${method.declaring_type} outside the ${typeTotal} type definitions`);
		if (linkFacts !== undefined) {
			const returnAt = at + 4 + widths.type_definition;
			linkFacts.returnTypes[index] = readIndex(reader, returnAt, widths.type);
			linkFacts.methodTokens[index] = reader.u32(at + methodContainerAt({
				widths,
				methodReturnParameterToken
			}) + widths.generic_container);
		}
		parameterRanges.push({
			start: readIndex(reader, at + 4 + widths.type_definition + widths.type + (methodReturnParameterToken ? 4 : 0), widths.parameter),
			count: reader.u16(at + sizes.methods - 2)
		});
		onRow?.(method);
		result.push(method);
	}
	return {
		methods: result,
		parameterRanges
	};
}
/**
* Type method ranges and method declaring types must agree in both
* directions, so a damaged range cannot strand or misattribute a method.
*/
function* checkMethodOwners(types, methods) {
	let work = 0;
	for (const [index, type] of types.entries()) {
		if (work++ % 256 === 0) yield;
		for (let offset = 0; offset < type.method_count; offset += 1) {
			if (work++ % 256 === 0) yield;
			const method = type.method_start + offset;
			const declaring = methods[method].declaring_type;
			if (declaring !== index) throw new Il2cppMetadataFormatFailure("declaring-type-mismatch", `method ${method} is in type ${index}'s range but declares type ${declaring}`);
		}
	}
	for (const [index, method] of methods.entries()) {
		if (work++ % 256 === 0) yield;
		const owner = types[method.declaring_type];
		if (owner !== undefined && (index < owner.method_start || index >= owner.method_start + owner.method_count)) throw new Il2cppMetadataFormatFailure("declaring-type-mismatch", `method ${index} declares type ${method.declaring_type} but is outside its method range`);
	}
}
/** Each type belongs to at most one image. */
function* checkImageRanges(images) {
	const ranges = [];
	for (let index = 0; index < images.length; index++) {
		if (index % 256 === 0) yield;
		const image = images[index];
		if (image.type_count > 0) ranges.push({
			start: image.type_start,
			end: image.type_start + image.type_count,
			index
		});
	}
	ranges.sort((left, right) => left.start - right.start);
	for (let at = 1; at < ranges.length; at++) {
		if (at % 256 === 0) yield;
		const previous = ranges[at - 1];
		const current = ranges[at];
		if (previous.end > current.start) throw new Il2cppMetadataFormatFailure("image-range-overlap", `image ${previous.index} types [${previous.start}, ${previous.end}) overlap image ${current.index} starting at type ${current.start}`);
	}
}
/** Decode image, type, method and member names and string literals without native binaries or decryption. */
function* readIl2cppMetadataSteps(bytes, options = {}) {
	return (yield* readMetadataCoreSteps(bytes, options, false)).metadata;
}
/** Decode metadata and retain the typed row facts used for native linking. */
function* readIl2cppMetadataForLinkingSteps(bytes, options = {}) {
	const parsed = yield* readMetadataCoreSteps(bytes, options, true);
	if (parsed.link === undefined) throw invariantViolation("Native metadata reader did not retain requested linking facts");
	return {
		metadata: parsed.metadata,
		link: parsed.link
	};
}
function* readMetadataCoreSteps(bytes, options, linking) {
	const { magic, version, headerBytes, sections } = readHeader(bytes);
	checkSections(bytes, headerBytes, sections);
	const byName = new Map(sections.map((entry) => [entry.name, entry]));
	const section = (name) => byName.get(name);
	const layout = VERSION_LAYOUTS[version];
	const genericContainers = checkedSectionCount(section("genericContainers"), GENERIC_CONTAINER_RECORD_BYTES);
	const counted = layout.indexing === "counted" ? resolveCountedTables(section, genericContainers) : undefined;
	const widths = counted?.widths ?? FIXED_WIDTHS;
	const expected = il2cppMetadataRecordBytes(widths, version);
	let tables = {
		reader: new BinaryReader(bytes, true, IL2CPP_METADATA_FORMAT),
		section,
		widths,
		recordBytes: expected,
		counts: recordCounts(version, section, expected, widths, genericContainers),
		typeDefinitionTypeIndices: layout.typeDefinitionTypeIndices,
		indexing: layout.indexing,
		methodReturnParameterToken: layout.methodReturnParameterToken,
		readString: createStringReader(bytes, section("strings"), options.beforeText),
		members: counted?.members ?? readIl2cppMemberTables({
			typeIndexWidth: widths.type,
			indexing: layout.indexing,
			section
		}),
		beforeText: options.beforeText,
		onRow: options.onRow
	};
	options.beforeRows?.({
		images: tables.counts.images,
		types: tables.counts.typeDefinitions,
		methods: tables.counts.methods,
		...tables.members.counts
	});
	if (linking) tables = {
		...tables,
		linkFacts: {
			methodTokens: new Uint32Array(tables.counts.methods),
			returnTypes: new Int32Array(tables.counts.methods),
			fieldTypes: new Int32Array(tables.members.counts.fields),
			parameterTypes: new Int32Array(tables.members.counts.parameters),
			genericTypeArgumentCounts: new Int32Array(tables.counts.typeDefinitions),
			genericParameterName: createGenericParameterReader(tables),
			...createGenericContainerReaders(tables)
		}
	};
	yield;
	const images = yield* readImages(tables);
	yield* checkImageRanges(images);
	const { types, memberRanges } = yield* readTypes(tables);
	const { methods, parameterRanges } = yield* readMethods(tables);
	yield* checkMethodOwners(types, methods);
	const members = yield* readIl2cppMembers(tables, {
		...memberRanges,
		parameters: parameterRanges
	});
	return {
		metadata: {
			magic,
			metadata_version: version,
			index_widths: widths,
			sections,
			images,
			types,
			methods,
			...members
		},
		link: tables.linkFacts
	};
}
var NESTED_TYPE_ENTRY_BYTES, VERSION_LAYOUTS, sectionEntryBytes, il2cppMetadataHeaderBytes, isSupportedVersion, il2cppIndexWidth, il2cppMetadataRecordBytes, isIndexWidth, readHeader, checkSections, headerCount, recordBytes, FIXED_WIDTHS, GENERIC_CONTAINER_RECORD_BYTES, resolveCountedTables, recordCounts, createStringReader, methodContainerAt, readTypeGenericContainer, readGenericContainer, createGenericContainerReaders, createGenericParameterReader;
function init_Il2cppMetadataFile() {
	return (init_Il2cppMetadataFile = __esmMin((() => {
		init_binaryContainer();
		init_strictUtf8();
		init_Il2cppMetadataFormat();
		init_il2cppMetadata();
		init_il2cppMetadataHeaderPrefix();
		init_Il2cppMetadataSectionTable();
		init_Il2cppMetadataMembers();
		init_internalInvariant();
		NESTED_TYPE_ENTRY_BYTES = 4;
		VERSION_LAYOUTS = {
			27: {
				indexing: "fixed",
				typeDefinitionTypeIndices: 4,
				methodReturnParameterToken: false
			},
			24: {
				indexing: "fixed",
				typeDefinitionTypeIndices: 5,
				methodReturnParameterToken: false
			},
			29: {
				indexing: "fixed",
				typeDefinitionTypeIndices: 4,
				methodReturnParameterToken: false
			},
			31: {
				indexing: "fixed",
				typeDefinitionTypeIndices: 4,
				methodReturnParameterToken: true
			},
			39: {
				indexing: "counted",
				typeDefinitionTypeIndices: 3,
				methodReturnParameterToken: true
			}
		};
		sectionEntryBytes = (layout) => layout.indexing === "counted" ? 12 : 8;
		il2cppMetadataHeaderBytes = (version) => 8 + il2cppMetadataSectionNames(version).length * sectionEntryBytes(VERSION_LAYOUTS[version]);
		isSupportedVersion = (value) => IL2CPP_METADATA_VERSIONS.includes(value);
		il2cppIndexWidth = (entries) => entries <= 255 ? 1 : entries <= 65535 ? 2 : 4;
		il2cppMetadataRecordBytes = (widths, version) => {
			const layout = VERSION_LAYOUTS[version];
			return {
				typeDefinitions: 68 + layout.typeDefinitionTypeIndices * widths.type + widths.generic_container,
				images: 32 + 2 * widths.type_definition,
				methods: 16 + (layout.methodReturnParameterToken ? 4 : 0) + widths.type_definition + widths.type + widths.parameter + widths.generic_container
			};
		};
		isIndexWidth = (value) => value === 1 || value === 2 || value === 4;
		readHeader = (bytes) => {
			const prefix = observeIl2cppMetadataHeaderPrefix(bytes);
			if (prefix.kind !== "il2cpp") throw new Il2cppMetadataFormatFailure("unrecognized-magic", "the file does not start with the IL2CPP global-metadata magic 0xFAB11BAF; encrypted or non-metadata inputs are not decoded");
			if (prefix.version === null) throw new Il2cppMetadataFormatFailure("truncated-header", `the file has ${bytes.length} bytes, fewer than the 8-byte magic/version prefix; the metadata version is unknown`);
			const { magic, version } = prefix;
			if (!isSupportedVersion(version)) throw new Il2cppMetadataFormatFailure("unsupported-version", `metadata version ${version} is not supported; versions ${IL2CPP_METADATA_VERSIONS.join(", ")} are decoded`);
			const headerBytes = il2cppMetadataHeaderBytes(version);
			if (bytes.length < headerBytes) throw new Il2cppMetadataFormatFailure("truncated-header", `the file has ${bytes.length} bytes, fewer than the ${headerBytes}-byte version ${version} header`);
			const entryBytes = sectionEntryBytes(VERSION_LAYOUTS[version]);
			const sections = readIl2cppSectionTable(bytes, il2cppMetadataSectionNames(version), entryBytes);
			return {
				magic,
				version,
				headerBytes,
				sections
			};
		};
		checkSections = (bytes, headerBytes, sections) => {
			const first = sections[0];
			if (first?.offset !== headerBytes) throw new Il2cppMetadataFormatFailure("unexpected-header-size", `stringLiterals starts at ${String(first?.offset)}, not immediately after the ${headerBytes}-byte header`);
			const issue = firstIl2cppSectionIssue(sections, headerBytes, bytes.length);
			if (issue === undefined) return;
			if (issue.kind === "overlap") {
				const { previous, current } = issue;
				throw new Il2cppMetadataFormatFailure("section-overlap", `section ${previous.name} [${previous.offset}, ${previous.offset + previous.size}) overlaps ${current.name} starting at ${current.offset}`);
			}
			const { section } = issue;
			throw new Il2cppMetadataFormatFailure("section-out-of-bounds", issue.kind === "header" ? `section ${section.name} starts at ${section.offset}, inside the ${headerBytes}-byte header` : `section ${section.name} (offset ${section.offset}, size ${section.size}, count ${String(section.count)}) is negative or extends past the ${bytes.length}-byte file`);
		};
		headerCount = (section) => {
			if (section.count === null) throw invariantViolation(`section ${section.name} has no header count`);
			return section.count;
		};
		recordBytes = (section) => {
			const count = headerCount(section);
			if (count === 0) {
				if (section.size !== 0) throw new Il2cppMetadataFormatFailure("record-size-mismatch", `section ${section.name} declares ${section.size} bytes for zero records`);
				return null;
			}
			if (section.size === 0) throw new Il2cppMetadataFormatFailure("record-size-mismatch", `section ${section.name} declares ${count} records with no bytes`);
			if (section.size % count !== 0) throw new Il2cppMetadataFormatFailure("record-size-mismatch", `section ${section.name} size ${section.size} is not a whole multiple of its ${count} records`);
			return section.size / count;
		};
		FIXED_WIDTHS = {
			type_definition: 4,
			generic_container: 4,
			parameter: 4,
			type: 4,
			type_width_source: "fixed-width-version"
		};
		GENERIC_CONTAINER_RECORD_BYTES = 16;
		resolveCountedTables = (section, genericContainerCount) => {
			const type_definition = il2cppIndexWidth(headerCount(section("typeDefinitions")));
			const generic_container = il2cppIndexWidth(genericContainerCount);
			const interfaceOffset = recordBytes(section("interfaceOffsets"));
			let type;
			let type_width_source;
			if (interfaceOffset !== null) {
				type = interfaceOffset - 4;
				type_width_source = "interface-offsets-record";
			} else {
				const typeDefinition = recordBytes(section("typeDefinitions"));
				type = typeDefinition === null ? Number.NaN : (typeDefinition - 68 - generic_container) / 3;
				type_width_source = "type-definition-record";
			}
			if (!isIndexWidth(type)) throw new Il2cppMetadataFormatFailure("type-index-width", `the ${type_width_source} does not imply a 1-, 2- or 4-byte TypeIndex`);
			const members = readIl2cppMemberTables({
				typeIndexWidth: type,
				indexing: "counted",
				section
			});
			const widths = {
				type_definition,
				generic_container,
				parameter: il2cppIndexWidth(members.counts.parameters),
				type,
				type_width_source
			};
			return {
				widths,
				members
			};
		};
		recordCounts = (version, section, expected, widths, genericContainers) => {
			const genericParameters = checkedSectionCount(section("genericParameters"), widths.generic_container + 12);
			if (VERSION_LAYOUTS[version].indexing === "fixed") checkedSectionCount(section("interfaceOffsets"), widths.type + 4);
			const names = [
				"typeDefinitions",
				"images",
				"methods"
			];
			const sized = Object.fromEntries(names.map((name) => [name, checkedSectionCount(section(name), expected[name])]));
			return {
				...sized,
				nestedTypes: checkedSectionCount(section("nestedTypes"), NESTED_TYPE_ENTRY_BYTES),
				genericContainers,
				genericParameters
			};
		};
		createStringReader = (bytes, strings, beforeText) => {
			const stringEnd = strings.offset + strings.size;
			const pool = bytes.subarray(strings.offset, stringEnd);
			const decoder = strictUtf8Decoder("preserve");
			const cache = new Map();
			return (index, label) => {
				const cached = cache.get(index);
				if (cached !== undefined) return cached;
				const end = index < 0 || index >= pool.length ? -1 : pool.indexOf(0, index);
				if (end === -1) throw new Il2cppMetadataFormatFailure("invalid-string", `${label} string index ${index} has no terminated entry inside the ${strings.size}-byte string section`);
				beforeText?.(end - index);
				let value;
				try {
					value = decoder.decode(pool.subarray(index, end));
				} catch (cause) {
					throw new Il2cppMetadataFormatFailure("invalid-string", `${label} string index ${index} is not valid UTF-8`, { cause });
				}
				cache.set(index, value);
				return value;
			};
		};
		methodContainerAt = ({ widths, methodReturnParameterToken }) => 4 + widths.type_definition + widths.type + (methodReturnParameterToken ? 4 : 0) + widths.parameter;
		readTypeGenericContainer = (tables, index) => readIndex(tables.reader, tables.section("typeDefinitions").offset + index * tables.recordBytes.typeDefinitions + 8 + tables.typeDefinitionTypeIndices * tables.widths.type, tables.widths.generic_container);
		readGenericContainer = (tables, index) => {
			const at = tables.section("genericContainers").offset + index * GENERIC_CONTAINER_RECORD_BYTES;
			return {
				count: tables.reader.i32(at + 4),
				parameterStart: tables.reader.i32(at + 12)
			};
		};
		createGenericContainerReaders = (tables) => {
			const typeCount = tables.counts.typeDefinitions;
			const containerCount = tables.indexing === "counted" ? 0 : tables.counts.genericContainers;
			const inRange = (index, count) => Number.isInteger(index) && index >= 0 && index < count;
			const methods = tables.section("methods"), methodCount = tables.counts.methods, methodBytes = tables.recordBytes.methods, methodAt = methodContainerAt(tables);
			return {
				methodGenericContainer: (index) => !inRange(index, methodCount) ? undefined : readIndex(tables.reader, methods.offset + index * methodBytes + methodAt, tables.widths.generic_container),
				typeGenericContainer: (index) => tables.indexing === "counted" || !inRange(index, typeCount) ? undefined : readTypeGenericContainer(tables, index),
				genericContainer: (index) => !inRange(index, containerCount) ? undefined : readGenericContainer(tables, index)
			};
		};
		createGenericParameterReader = (tables) => {
			const parameters = tables.section("genericParameters"), width = tables.widths.generic_container + 12;
			const count = tables.counts.genericParameters;
			return (index) => {
				if (!Number.isInteger(index) || index < 0 || index >= count) return undefined;
				return tables.readString(tables.reader.i32(parameters.offset + index * width + tables.widths.generic_container), `generic parameter ${index} name`);
			};
		};
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppBinaryTypes.js
/** Enclosing types outermost first, with the namespace of the outermost. */
function* declaringChain(metadata, { fail, tick }, index) {
	const seen = new Set();
	const parts = [];
	let namespace = "";
	for (let at = index; at !== -1;) {
		if (seen.has(at)) fail(`cyclic declaring type at ${at}`);
		if (tick()) yield;
		seen.add(at);
		const type = metadata.types[at] ?? fail(`type definition ${at} is out of range`);
		parts.push(type.name);
		namespace = type.namespace;
		at = type.declaring_type;
	}
	return {
		parts: parts.reverse(),
		namespace
	};
}
/** Nested generic definitions take their own slice of the arguments. */
function* genericDefinitionName(metadata, facts, { fail, join, tick }, index, args) {
	if (!Number.isInteger(index) || index < 0 || index >= metadata.types.length) fail(`type definition ${index} is out of range`);
	const chain = [];
	const seen = new Set();
	for (let at = index; at !== -1;) {
		if (seen.has(at)) fail(`cyclic declaring type at ${at}`);
		if (tick()) yield;
		const type = metadata.types[at];
		if (type === undefined) return fail(`type definition ${at} is out of range`);
		seen.add(at);
		chain.push(at);
		at = type.declaring_type;
	}
	let previousArgumentCount = 0;
	const parts = [];
	for (const typeIndex of chain.reverse()) {
		if (tick()) yield;
		const type = metadata.types[typeIndex];
		const argumentCount = facts.genericTypeArgumentCounts[typeIndex];
		if (argumentCount === undefined || argumentCount < previousArgumentCount || argumentCount > args.length) return fail(`generic argument count does not match nested type definition ${typeIndex}`);
		const componentArguments = args.slice(previousArgumentCount, argumentCount);
		previousArgumentCount = argumentCount;
		const name = type.name.replace(/`\d+$/u, "");
		parts.push(componentArguments.length === 0 ? name : join([
			name,
			"<",
			join(componentArguments, ", "),
			">"
		]));
	}
	if (previousArgumentCount !== args.length) fail(`generic argument count ${args.length} does not match nested type definition ${index}`);
	const name = join(parts, "+");
	const namespace = metadata.types[chain[0]].namespace;
	return namespace === "" ? name : join([namespace, name], ".");
}
var il2cppTypeKind, IL2CPP_TYPE_KIND_MAX, isDefinitionTypeKind, PRIMITIVES, DUMPER_PRIMITIVES, TYPE_TEXT_BYTES, TYPE_DEPTH, createTypeRenderer, genericClassDefinition, createTypeNamer, createMethodSpecNamer;
function init_Il2cppBinaryTypes() {
	return (init_Il2cppBinaryTypes = __esmMin((() => {
		init_Il2cppBinaryFormat();
		init_Il2cppBinaryImage();
		il2cppTypeKind = (attributes) => attributes >>> 16 & 255;
		IL2CPP_TYPE_KIND_MAX = 30;
		isDefinitionTypeKind = (kind) => kind === 17 || kind === 18;
		PRIMITIVES = new Map([
			[1, "void"],
			[2, "bool"],
			[3, "char"],
			[4, "sbyte"],
			[5, "byte"],
			[6, "short"],
			[7, "ushort"],
			[8, "int"],
			[9, "uint"],
			[10, "long"],
			[11, "ulong"],
			[12, "float"],
			[13, "double"],
			[14, "string"],
			[22, "System.TypedReference"],
			[24, "nint"],
			[25, "nuint"],
			[28, "object"]
		]);
		DUMPER_PRIMITIVES = new Map([
			...PRIMITIVES,
			[22, "TypedReference"],
			[24, "IntPtr"],
			[25, "UIntPtr"]
		]);
		TYPE_TEXT_BYTES = 64 * 1024 * 1024;
		TYPE_DEPTH = 64;
		createTypeRenderer = (image, facts, beforeText, style) => {
			const fail = (message) => {
				throw new Il2cppBinaryFormatFailure("invalid-type", message);
			};
			const unresolved = (address, label) => {
				throw new Il2cppBinaryFormatFailure("unsupported-pointer-encoding", `${label} at 0x${address.toString(16)} is loader-unresolved; its stored bytes are not a resolved type value`);
			};
			const pointer = (address, label) => {
				const value = readSlot(image, address);
				if (value === "unknown") return unresolved(address, label);
				return value ?? fail(`${label} at 0x${address.toString(16)} is not file mapped`);
			};
			const u32 = (address, label) => {
				const value = readUInt32(image, address);
				if (value === "unknown") return unresolved(address, label);
				return value ?? fail(`${label} at 0x${address.toString(16)} is not file mapped`);
			};
			let cachedBytes = 0;
			let work = 0;
			const guard = (bytes) => {
				if (bytes > TYPE_TEXT_BYTES - cachedBytes) throw new Il2cppBinaryFormatFailure("native-type-text-capacity", `rendered type text workspace exceeds ${TYPE_TEXT_BYTES} UTF-8 bytes`, TYPE_TEXT_BYTES, "bytes");
				beforeText?.(bytes);
			};
			const join = (parts, separator = "") => {
				let bytes = Math.max(parts.length - 1, 0) * Buffer.byteLength(separator);
				for (const part of parts) {
					bytes += Buffer.byteLength(part);
					guard(bytes);
				}
				return parts.join(separator);
			};
			const tick = () => ++work % 256 === 0;
			const tools = {
				fail,
				pointer,
				u32,
				guard,
				join,
				tick
			};
			const rules = style(tools);
			const byAddress = new Map();
			const active = new Set();
			function* name(address, depth) {
				const cached = byAddress.get(address);
				if (cached !== undefined) return cached;
				if (active.has(address)) fail(`cyclic Il2CppType at 0x${address.toString(16)}`);
				if (depth > TYPE_DEPTH) throw new Il2cppBinaryFormatFailure("type-nesting-capacity", `type rendering exceeds ${TYPE_DEPTH} nested frames`, TYPE_DEPTH, "frames");
				active.add(address);
				try {
					if (tick()) yield;
					const data = pointer(address, "Il2CppType data");
					const bits = u32(address + 8n, "Il2CppType attributes");
					const kind = il2cppTypeKind(bits);
					const index = Number(BigInt.asIntN(32, data & 4294967295n));
					let result;
					const primitive = rules.primitives.get(kind);
					if (primitive !== undefined) result = primitive;
					else if (isDefinitionTypeKind(kind)) result = yield* rules.definition(index);
					else if (kind === 15 || kind === 29) result = join([yield* name(data, depth + 1), kind === 15 ? "*" : "[]"]);
					else if (kind === 20) {
						const rank = u32(data + 8n, "Il2CppArrayType rank") & 255;
						if (rank === 0) fail("array rank is zero");
						result = join([yield* name(pointer(data, "array element"), depth + 1), rank === 1 ? "[*]" : `[${",".repeat(rank - 1)}]`]);
					} else if (kind === 19 || kind === 30) result = facts.genericParameterName(index) ?? fail(`generic parameter ${index} is out of range`);
					else if (kind === 21) result = yield* rules.genericClass(data, depth);
					else throw new Il2cppBinaryFormatFailure("unsupported-type-kind", `type kind 0x${kind.toString(16)} is not rendered`);
					if (rules.byrefBit !== null && (bits >>> rules.byrefBit & 1) === 1) result = join([result, "&"]);
					const bytes = Buffer.byteLength(result);
					guard(bytes);
					cachedBytes += bytes;
					byAddress.set(address, result);
					return result;
				} finally {
					active.delete(address);
				}
			}
			/** Il2CppGenericInst argument names, reserved before each one is kept. */
			function* instanceArgumentList(instance, depth) {
				const count = u32(instance, "generic argument count");
				const argv = pointer(instance + 8n, "generic arguments");
				guard(Math.max(count - 1, 0) * 2);
				if (!hasPointerArrayCoverage(image, argv, count)) fail("generic argument array is not file mapped");
				const args = [];
				let bytes = Math.max(count - 1, 0) * 2;
				for (let slot = 0; slot < count; slot++) {
					if (tick()) yield;
					const argument = yield* name(pointer(argv + BigInt(slot * 8), "generic argument"), depth + 1);
					bytes += Buffer.byteLength(argument);
					guard(bytes);
					args.push(argument);
				}
				return args;
			}
			/** `<A, B>` for one Il2CppGenericInst, reserved before each argument joins. */
			function* instanceArguments(instance, depth) {
				const args = yield* instanceArgumentList(instance, depth);
				return join([
					"<",
					join(args, ", "),
					">"
				]);
			}
			return {
				name,
				instanceArgumentList,
				instanceArguments,
				tools
			};
		};
		genericClassDefinition = ({ fail, pointer, u32 }, data, version) => {
			if (version < 27) return u32(data, "generic class definition");
			const definitionType = pointer(data, "generic class type");
			const definitionData = pointer(definitionType, "generic class definition");
			const definitionKind = u32(definitionType + 8n, "generic class type attributes") >>> 16 & 255;
			if (definitionKind !== 17 && definitionKind !== 18) fail("generic class type is not a class or value type definition");
			return Number(BigInt.asIntN(32, definitionData & 4294967295n));
		};
		createTypeNamer = (image, metadata, facts, version, beforeText) => {
			const renderer = createTypeRenderer(image, facts, beforeText, (tools) => {
				function* definitionName(index) {
					const { parts, namespace } = yield* declaringChain(metadata, tools, index);
					const name = tools.join(parts, "+");
					return namespace === "" ? name : tools.join([namespace, name], ".");
				}
				return {
					primitives: PRIMITIVES,
					byrefBit: version >= 29 ? 29 : 30,
					definition: definitionName,
					*genericClass(data, depth) {
						const definition = genericClassDefinition(tools, data, version);
						const args = yield* renderer.instanceArgumentList(tools.pointer(data + 8n, "generic class instance"), depth);
						return yield* genericDefinitionName(metadata, facts, tools, definition, args);
					}
				};
			});
			return renderer.name;
		};
		createMethodSpecNamer = (image, metadata, facts, version, beforeText) => {
			const cut = (text) => {
				const at = text.indexOf("`");
				return at === -1 ? text : text.slice(0, at);
			};
			/** Enclosing types joined with '.', with the namespace only when asked. */
			function* nestedName(tools, index, namespaces, keepOwnArity = false) {
				const { parts, namespace } = yield* declaringChain(metadata, tools, index);
				const name = tools.join(parts.map((part, at) => keepOwnArity && at === parts.length - 1 ? part : cut(part)), ".");
				return namespaces && namespace !== "" ? tools.join([namespace, name], ".") : name;
			}
			const containerIndex = (tools, index) => facts.typeGenericContainer(index) ?? tools.fail(`type definition ${index} has no decoded generic container index`);
			function* containerParameters(tools, index) {
				const container = containerIndex(tools, index);
				if (container === -1) return "";
				const entry = facts.genericContainer(container) ?? tools.fail(`generic container ${container} is out of range`);
				if (entry.count <= 0) tools.fail(`generic container ${container} has ${entry.count} parameters`);
				const names = [];
				let bytes = (entry.count - 1) * 2;
				for (let slot = 0; slot < entry.count; slot++) {
					if (tools.tick()) yield;
					const parameter = facts.genericParameterName(entry.parameterStart + slot) ?? tools.fail(`generic parameter ${entry.parameterStart + slot} is out of range`);
					bytes += Buffer.byteLength(parameter);
					tools.guard(bytes);
					names.push(parameter);
				}
				return tools.join([
					"<",
					tools.join(names, ", "),
					">"
				]);
			}
			const renderer = createTypeRenderer(image, facts, beforeText, (tools) => ({
				primitives: DUMPER_PRIMITIVES,
				byrefBit: null,
				*definition(index) {
					return tools.join([yield* nestedName(tools, index, false), yield* containerParameters(tools, index)]);
				},
				*genericClass(data, depth) {
					const owner = genericClassDefinition(tools, data, version);
					return tools.join([yield* nestedName(tools, owner, false), yield* renderer.instanceArguments(tools.pointer(data + 8n, "generic class instance"), depth)]);
				}
			}));
			const { tools } = renderer;
			/**
			* `Namespace.Type<ClassArgs>$$Method<MethodArgs>`: the declaring type keeps
			* its arity suffix unless it is a generic definition.
			*/
			return function* methodSpecName(method, classInstance, methodInstance) {
				const definition = metadata.methods[method] ?? tools.fail(`method ${method} is out of range`);
				const owner = definition.declaring_type;
				const generic = containerIndex(tools, owner) !== -1;
				return tools.join([
					yield* nestedName(tools, owner, true, !generic),
					classInstance === null ? "" : yield* renderer.instanceArguments(classInstance, 0),
					"$$",
					definition.name,
					methodInstance === null ? "" : yield* renderer.instanceArguments(methodInstance, 0)
				]);
			};
		};
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppBinaryRegistration.js
/** Reverse byte matching permits C-string suffix sharing. Only a module's
* declared pointer later establishes which exact candidate it actually names.
* No decoding/alphabet guess or per-name binary rescan is needed.
*/
function* nameAddresses(image, names) {
	const root = {
		next: new Map(),
		owners: []
	};
	let nodes = 1, work = 0;
	for (const [index, name] of names.entries()) {
		if (++work % 256 === 0) yield;
		if (name === "") continue;
		if (Buffer.byteLength(name) > TOTAL_NAME_OCCURRENCES) throw new Il2cppBinaryFormatFailure("native-index-capacity", `module-name trie exceeds its ${TOTAL_NAME_OCCURRENCES}-node workspace`, TOTAL_NAME_OCCURRENCES, "entries");
		let node = root;
		const bytes = Buffer.from(name, "utf8");
		for (let at = bytes.length - 1; at >= 0; at--) {
			if (++work % 4096 === 0) yield;
			let next = node.next.get(bytes[at]);
			if (next === undefined) {
				if (nodes >= TOTAL_NAME_OCCURRENCES) throw new Il2cppBinaryFormatFailure("native-index-capacity", `module-name trie exceeds its ${TOTAL_NAME_OCCURRENCES}-node workspace`, TOTAL_NAME_OCCURRENCES, "entries");
				next = {
					next: new Map(),
					owners: []
				};
				node.next.set(bytes[at], next);
				nodes++;
			}
			node = next;
		}
		node.owners.push(index);
	}
	const found = new Map();
	for (const mapping of image.container.mappings) {
		const region = image.stored.range(mapping.offset, mapping.size, "module-name load range");
		for (let chunk = 0; chunk < region.length; chunk += SCAN_BYTES) {
			yield;
			const part = region.subarray(chunk, Math.min(chunk + SCAN_BYTES, region.length));
			for (let end = part.indexOf(0); end >= 0; end = part.indexOf(0, end + 1)) {
				let node = root;
				for (let at = chunk + end - 1; at >= 0; at--) {
					if (++work % 4096 === 0) yield;
					node = node.next.get(region[at]);
					if (node === undefined) break;
					if (node.owners.length === 0) continue;
					const address = mapping.address + BigInt(at);
					if (image.elfPointerOverlay?.hasWrites(address, chunk + end - at + 1)) continue;
					if (!found.has(address) && found.size >= TOTAL_NAME_OCCURRENCES) throw new Il2cppBinaryFormatFailure("native-index-capacity", `native name-address index exceeds ${TOTAL_NAME_OCCURRENCES} entries`, TOTAL_NAME_OCCURRENCES, "entries");
					found.set(address, node.owners);
				}
			}
		}
	}
	return found;
}
/** Method count per image from its contiguous type-definition range. */
function* imageMethodCounts(metadata) {
	const counts = [];
	for (const image of metadata.images) {
		yield;
		let total = 0;
		for (let offset = 0; offset < image.type_count; offset++) {
			if (offset % 256 === 0) yield;
			total += metadata.types[image.type_start + offset].method_count;
		}
		counts.push(total);
	}
	return counts;
}
/**
* Find Il2CppCodeGenModule records: a moduleName pointer to an image name
* followed by methodPointerCount equal to that image's method count.
*/
function* findModules(image, metadata) {
	const names = yield* nameAddresses(image, metadata.images.map((entry) => entry.name));
	const counts = yield* imageMethodCounts(metadata);
	const countSet = new Set(counts);
	const minimumCount = counts.reduce((minimum, count) => Math.min(minimum, count), Number.POSITIVE_INFINITY);
	const candidates = new Map();
	const unresolvedName = unresolvedPointerMatcher(image, names.keys(), (name) => (names.get(name) ?? []).map((index) => counts[index]));
	for (const mapping of image.container.mappings) {
		const start = Number((8n - mapping.address % 8n) % 8n);
		for (let at = start; at + 24 <= mapping.size; at += 8) {
			if ((at & 65535) < 8) yield;
			const offset = mapping.offset + at;
			const address = mapping.address + BigInt(at);
			const raw = image.stored.word(offset, 64);
			const elfSlot = image.elfPointerOverlay === undefined ? undefined : readSlot(image, address);
			const unresolvedLegacy = image.machoPointerFixups?.hasUnresolvedLegacyBytes(address, 8) === true;
			if (elfSlot === "unknown" || unresolvedLegacy) {
				const count = readUInt32(image, address + 8n);
				let plausibleCount = count === "unknown" ? minimumCount : count !== null && countSet.has(count) ? count : Number.POSITIVE_INFINITY;
				if (elfSlot !== "unknown" && Number.isFinite(plausibleCount)) {
					const matched = unresolvedName(address, raw, count === "unknown" || count === null ? undefined : count);
					plausibleCount = matched === undefined ? Number.POSITIVE_INFINITY : matched ?? plausibleCount;
				}
				if (Number.isFinite(plausibleCount)) {
					const pointers = readSlot(image, address + 16n);
					if (pointers === "unknown" || typeof pointers === "bigint" && hasPointerArrayCoverage(image, pointers, plausibleCount)) throw new Il2cppBinaryFormatFailure("code-gen-modules-not-found", "A loader-owned module name pointer could match an additional module record");
				}
			}
			if (unresolvedLegacy) continue;
			if (image.elfPointerOverlay === undefined && !names.has(raw)) continue;
			const target = elfSlot === undefined ? readPointer(image, address) : typeof elfSlot === "bigint" ? elfSlot : null;
			if (target === null) continue;
			const indices = names.get(target);
			if (indices === undefined) continue;
			let recordOffset;
			try {
				recordOffset = image.fileMappings.offset(address, 24);
			} catch (cause) {
				if (cause instanceof BinaryFormatFailure) throw new Il2cppBinaryFormatFailure("malformed-container", cause.message);
				throw cause;
			}
			if (recordOffset !== offset) throw new Il2cppBinaryFormatFailure("malformed-container", "code generation module record disagrees with its load mapping");
			let work = 0;
			for (const index of indices) {
				if (++work % 256 === 0) yield;
				const count = readUInt32(image, address + 8n);
				if (count !== "unknown" && count !== counts[index]) continue;
				const pointers = readSlot(image, address + 16n);
				if (pointers === "unknown") throw new Il2cppBinaryFormatFailure("code-gen-modules-not-found", "A matching module record has an unresolved method pointer array");
				if (pointers === null) continue;
				if (!hasPointerArrayCoverage(image, pointers, counts[index])) continue;
				if (count === "unknown") throw new Il2cppBinaryFormatFailure("code-gen-modules-not-found", "A matching module record has an unresolved method count");
				const list = candidates.get(index) ?? [];
				if (list.some((candidate) => candidate.address === address)) continue;
				if (list.length !== 0) throw new Il2cppBinaryFormatFailure("ambiguous-code-gen-module", `multiple records match code generation module ${metadata.images[index].name}`);
				list.push({
					image: index,
					address,
					method_pointer_count: count,
					method_pointers: pointers
				});
				candidates.set(index, list);
			}
		}
	}
	return metadata.images.map((entry, index) => {
		const list = candidates.get(index) ?? [];
		if (list.length === 0) throw new Il2cppBinaryFormatFailure("code-gen-modules-not-found", `no code generation module names ${entry.name} with ${counts[index]} method pointers`);
		if (list.length > 1) throw new Il2cppBinaryFormatFailure("ambiguous-code-gen-module", `${list.length} records match code generation module ${entry.name}`);
		return list[0];
	});
}
/**
* Find the CodeRegistration codeGenModulesCount/codeGenModules pair: a count
* equal to the image count followed by a pointer to an array holding exactly
* the located module records.
*/
function* findCodeRegistration(image, modules) {
	const expected = new Set(modules.map((module) => module.address));
	const matches = [];
	const matchedFields = new Set();
	for (const mapping of image.container.mappings) {
		const start = Number((8n - mapping.address % 8n) % 8n);
		for (let at = start; at + 16 <= mapping.size; at += 8) {
			if ((at & 65535) < 8) yield;
			const field = mapping.address + BigInt(at);
			const count = readUInt32(image, field);
			if (count !== "unknown" && count !== modules.length) continue;
			const arraySlot = readSlot(image, field + 8n);
			if (arraySlot === "unknown") throw new Il2cppBinaryFormatFailure("code-registration-not-found", "A possible CodeRegistration has an unresolved module array");
			const array = arraySlot;
			if (array === null || !isMapped(image, array, modules.length * 8)) continue;
			const seen = new Set();
			let uncertain = count === "unknown";
			let viable = true;
			for (let slot = 0; slot < modules.length; slot++) {
				if (slot % 256 === 0) yield;
				const pointer = readSlot(image, array + BigInt(slot * 8));
				if (pointer === "unknown") {
					uncertain = true;
					continue;
				}
				if (pointer === null || !expected.has(pointer) || seen.has(pointer)) {
					viable = false;
					break;
				}
				seen.add(pointer);
			}
			if (viable && uncertain) throw new Il2cppBinaryFormatFailure("code-registration-not-found", "A possible CodeRegistration has unresolved candidate fields");
			if (viable && seen.size === modules.length) {
				if (matchedFields.has(field)) continue;
				matchedFields.add(field);
				if (matches.length !== 0) throw new Il2cppBinaryFormatFailure("code-registration-not-found", "multiple CodeRegistration module tables match");
				matches.push({
					field,
					array
				});
			}
		}
	}
	const architecture = image.container.architecture;
	if (matches.length === 0 && (architecture === "amd64" || architecture === "arm64")) {
		const array = yield* findModuleArrayByCode(image, expected);
		if (array !== null) return {
			field: null,
			array
		};
	}
	if (matches.length !== 1) throw new Il2cppBinaryFormatFailure("code-registration-not-found", `${matches.length} CodeRegistration module tables list the ${modules.length} located modules`);
	return matches[0];
}
function* findModuleArrayByCode(image, expected) {
	const arrays = new Set();
	const unresolvedModule = unresolvedPointerMatcher(image, expected);
	let expectedXor = 0n;
	for (const candidate of expected) expectedXor ^= candidate;
	for (const mapping of image.container.mappings) {
		const start = Number((8n - mapping.address % 8n) % 8n);
		let runStart = start;
		const lastPosition = new Map();
		const possible = new Map();
		const occurrences = new Map();
		const unknownPositions = new Set();
		let possibleXor = 0n;
		let duplicateValues = 0;
		for (let at = start; at + 8 <= mapping.size; at += 8) {
			if ((at & 65535) < 8) yield;
			const raw = image.stored.word(mapping.offset + at, 64);
			const address = mapping.address + BigInt(at);
			const elfSlot = image.elfPointerOverlay === undefined ? undefined : readSlot(image, address);
			const unknown = elfSlot === "unknown" || unresolvedModule(address, raw) !== undefined;
			const value = !unknown && (image.elfPointerOverlay !== undefined || expected.has(raw)) ? elfSlot === undefined ? readPointer(image, address) : typeof elfSlot === "bigint" ? elfSlot : null : null;
			if (!unknown && (value === null || !expected.has(value))) {
				possible.clear();
				occurrences.clear();
				unknownPositions.clear();
				possibleXor = 0n;
				duplicateValues = 0;
			} else {
				const candidate = unknown ? null : value;
				possible.set(at, candidate);
				if (candidate === null) unknownPositions.add(at);
				else {
					possibleXor ^= candidate;
					const count = (occurrences.get(candidate) ?? 0) + 1;
					occurrences.set(candidate, count);
					if (count === 2) duplicateValues++;
				}
				const expired = at - expected.size * 8;
				if (possible.has(expired)) {
					const previous = possible.get(expired);
					possible.delete(expired);
					if (previous === null) unknownPositions.delete(expired);
					else {
						possibleXor ^= previous;
						const count = occurrences.get(previous);
						if (count === 2) duplicateValues--;
						if (count === 1) occurrences.delete(previous);
						else occurrences.set(previous, count - 1);
					}
				}
				if (possible.size === expected.size && unknownPositions.size > 0 && duplicateValues === 0) {
					if (unknownPositions.size === 1) {
						const unknownAt = unknownPositions.values().next().value;
						if (image.elfPointerOverlay !== undefined || unresolvedPointerMatcher(image, [expectedXor ^ possibleXor])(mapping.address + BigInt(unknownAt), image.stored.word(mapping.offset + unknownAt, 64)) !== undefined) return null;
					} else return null;
				}
			}
			if (value === null || !expected.has(value)) {
				runStart = at + 8;
				lastPosition.clear();
				continue;
			}
			const previous = lastPosition.get(value);
			if (previous !== undefined && previous >= runStart) runStart = previous + 8;
			lastPosition.set(value, at);
			if (at - runStart === (expected.size - 1) * 8) {
				arrays.add(mapping.address + BigInt(runStart));
				if (arrays.size > MODULE_ARRAY_CANDIDATES) throw new Il2cppBinaryFormatFailure("native-index-capacity", `module-array index exceeds ${MODULE_ARRAY_CANDIDATES} entries`, MODULE_ARRAY_CANDIDATES, "entries");
			}
		}
	}
	if (arrays.size === 0) return null;
	const referenced = image.container.architecture === "arm64" ? yield* arm64PageReferences(image, arrays) : yield* ripRelativeReferences(image, arrays);
	return referenced.size === 1 ? [...referenced][0] : null;
}
function* ripRelativeReferences(image, arrays) {
	const referenced = new Set();
	for (const mapping of image.container.executable_mappings ?? []) {
		const loaded = image.elfPointerOverlay?.hasWrites(mapping.address, mapping.size) === true;
		const end = mapping.offset + mapping.size - 7;
		for (let at = mapping.offset; at <= end; at++) {
			if ((at & 65535) < 8) yield;
			const address = mapping.address + BigInt(at - mapping.offset);
			const prefix = loaded ? readUInt32(image, address) : image.stored.u32(at);
			if (typeof prefix !== "number") continue;
			const rex = prefix & 255;
			if ((rex & 251) !== 72) continue;
			const opcode = prefix >>> 8 & 255;
			if (opcode !== 141 && opcode !== 139) continue;
			if ((prefix >>> 16 & 199) !== 5) continue;
			const next = mapping.address + BigInt(at - mapping.offset + 7);
			const displacement = loaded ? readUInt32(image, address + 3n) : image.stored.u32(at + 3);
			if (typeof displacement !== "number") continue;
			const target = next + BigInt(displacement | 0);
			if (arrays.has(target)) referenced.add(target);
		}
	}
	return referenced;
}
/**
* arm64 instructions are 4-byte aligned words, so only aligned addresses are
* decoded. `adrp xd, page` forms the 4 KiB page of pc plus a signed 21-bit
* page delta; the next word must be `add xd, xd, #imm12` (64-bit, unshifted),
* which adds the offset within that page. Pairs split by other instructions or
* loads through `ldr` are not followed.
*/
function* arm64PageReferences(image, arrays) {
	const referenced = new Set();
	for (const mapping of image.container.executable_mappings ?? []) {
		const loaded = image.elfPointerOverlay?.hasWrites(mapping.address, mapping.size) === true;
		const start = Number((4n - mapping.address % 4n) % 4n);
		for (let at = start; at + 8 <= mapping.size; at += 4) {
			if ((at & 65535) < 4) yield;
			const address = mapping.address + BigInt(at);
			const adrp = loaded ? readUInt32(image, address) : image.stored.u32(mapping.offset + at);
			if (typeof adrp !== "number") continue;
			if ((adrp & 2667577344) >>> 0 !== 2415919104) continue;
			const add = loaded ? readUInt32(image, address + 4n) : image.stored.u32(mapping.offset + at + 4);
			if (typeof add !== "number") continue;
			if ((add & 4290772992) >>> 0 !== 2432696320) continue;
			const register = adrp & 31;
			if (register === 31) continue;
			if ((add & 31) !== register || (add >>> 5 & 31) !== register) continue;
			const pages = ((adrp >>> 5 & 524287) << 2 | adrp >>> 29 & 3) << 11 >> 11;
			const pc = mapping.address + BigInt(at);
			const target = (pc & ~4095n) + (BigInt(pages) << 12n) + BigInt(add >>> 10 & 4095);
			if (arrays.has(target)) referenced.add(target);
		}
	}
	return referenced;
}
/**
* Find MetadataRegistration by its two TypeDefinitionIndex-sized counts:
* fieldOffsetsCount and typeDefinitionsSizesCount (words 10 and 12) both equal
* the metadata type-definition count and are followed by mapped pointers.
* typesCount and types are words 6 and 7. Counts are int32 in 8-byte slots.
* Linking reads only the type table, so when no static registration matches on
* x86-64 or arm64 the table is inferred from code instead (field null).
*/
function* findMetadataRegistration(image, typeDefinitions, requiredTypes) {
	const matches = [];
	const matchedFields = new Set();
	let countsMatched = false;
	for (const mapping of image.container.mappings) {
		const start = Number((8n - mapping.address % 8n) % 8n);
		for (let at = start; at + 112 <= mapping.size; at += 8) {
			if ((at & 65535) < 8) yield;
			const address = mapping.address + BigInt(at);
			const fieldCount = readUInt32(image, address + 80n);
			if (fieldCount !== "unknown" && fieldCount !== typeDefinitions) continue;
			const sizeCount = readUInt32(image, address + 96n);
			if (sizeCount !== "unknown" && sizeCount !== typeDefinitions) continue;
			if (!hasPointerArrayCoverage(image, address, 16)) continue;
			if (fieldCount !== "unknown" && sizeCount !== "unknown") countsMatched = true;
			const count = readUInt32(image, address + 48n);
			const types = readSlot(image, address + 56n);
			const fieldOffsets = readSlot(image, address + 88n);
			const typeSizes = readSlot(image, address + 104n);
			if (count === null || typeof count === "number" && (count === 0 || count > 2147483647) || types === null || fieldOffsets === null || typeSizes === null || typeof fieldOffsets === "bigint" && !isMapped(image, fieldOffsets, 8) || typeof typeSizes === "bigint" && !isMapped(image, typeSizes, 8) || typeof types === "bigint" && !isMapped(image, types, typeof count === "number" ? count * 8 : 8)) continue;
			if (fieldCount === "unknown" || sizeCount === "unknown" || count === "unknown" || types === "unknown" || fieldOffsets === "unknown" || typeSizes === "unknown") throw new Il2cppBinaryFormatFailure("metadata-registration-not-found", "A possible MetadataRegistration has unresolved candidate fields");
			const field = mapping.address + BigInt(at + 48);
			if (matchedFields.has(field)) continue;
			matchedFields.add(field);
			if (matches.length !== 0) throw new Il2cppBinaryFormatFailure("metadata-registration-not-found", "multiple MetadataRegistration candidates match");
			matches.push({
				field,
				count,
				types
			});
		}
	}
	const architecture = image.container.architecture;
	let inferred = false;
	if (!countsMatched && requiredTypes > 0 && (architecture === "amd64" || architecture === "arm64")) {
		inferred = true;
		const table = yield* findTypeTableByCode(image, typeDefinitions, requiredTypes);
		if (table !== null) return {
			field: null,
			...table
		};
	}
	if (matches.length !== 1) throw new Il2cppBinaryFormatFailure("metadata-registration-not-found", countsMatched && matches.length === 0 ? `a MetadataRegistration counts ${typeDefinitions} type definitions, but its type table, field offsets or type sizes are not mapped` : inferred ? `no MetadataRegistration counts ${typeDefinitions} type definitions, and no single code-loaded run of Il2CppType pointers covers every referenced type index` : `${matches.length} MetadataRegistration candidates count ${typeDefinitions} type definitions`);
	return matches[0];
}
function* findTypeTableByCode(image, typeDefinitions, requiredTypes) {
	const { container } = image;
	const spans = container.mappings.filter((mapping) => mapping.size > 0).map((mapping) => ({
		start: mapping.address,
		end: mapping.address + BigInt(mapping.size)
	})).sort((left, right) => left.start < right.start ? -1 : left.start > right.start ? 1 : 0);
	const reach = [];
	for (const [index, span] of spans.entries()) reach.push(index === 0 || span.end > reach[index - 1] ? span.end : reach[index - 1]);
	const maybeMapped = (address) => {
		let lowIndex = 0;
		let highIndex = spans.length - 1;
		let found = -1;
		while (lowIndex <= highIndex) {
			const middle = lowIndex + highIndex >> 1;
			if (spans[middle].start <= address) {
				found = middle;
				lowIndex = middle + 1;
			} else highIndex = middle - 1;
		}
		return found >= 0 && reach[found] >= address + 12n;
	};
	const recordOffset = (address) => {
		if (!maybeMapped(address)) return -1;
		try {
			return image.fileMappings.offset(address, 12);
		} catch (cause) {
			if (cause instanceof BinaryFormatFailure) return -1;
			throw cause;
		}
	};
	const runs = new Map();
	const recordState = (target) => {
		if (target === 0n || (target & 7n) !== 0n) return "other";
		if (recordOffset(target) < 0) return "other";
		const attributes = readUInt32(image, target + 8n);
		if (attributes === "unknown") return "unknown";
		if (attributes === null) return "other";
		const kind = il2cppTypeKind(attributes);
		if (!isDefinedTypeKind(kind)) return "other";
		if (!isDefinitionTypeKind(kind)) return "type";
		const data = readSlot(image, target);
		if (data === "unknown") return "unknown";
		return typeof data === "bigint" && data < BigInt(typeDefinitions) ? "type" : "other";
	};
	const unresolved = (address) => {
		const slot = readSlot(image, address);
		return slot === "unknown" || typeof slot === "bigint" && recordState(slot) === "unknown";
	};
	for (const mapping of container.mappings) {
		const start = Number((8n - mapping.address % 8n) % 8n);
		let runStart = -1;
		let startUnknown = false;
		let possibleLength = 0;
		let possibleUnknown = false;
		for (let at = start; at <= mapping.size; at += 8) {
			if ((at & 65535) < 8) yield;
			const address = mapping.address + BigInt(at);
			let endUnknown = at + 8 > mapping.size;
			if (!endUnknown) {
				const raw = image.stored.word(mapping.offset + at, 64);
				let state;
				if (image.elfPointerOverlay === undefined) {
					if (image.machoPointerFixups?.hasUnresolvedLegacyBytes(address, 8) === true) state = "unknown";
					else {
						const rawState = recordState(raw);
						if (rawState !== "type") state = rawState;
						else {
							const slot = readSlot(image, address);
							state = slot === raw ? rawState : typeof slot === "bigint" ? recordState(slot) : slot === "unknown" ? "unknown" : "other";
						}
					}
				} else {
					const slot = readSlot(image, address);
					state = typeof slot === "bigint" ? recordState(slot) : slot === "unknown" ? "unknown" : "other";
				}
				if (state === "other") {
					possibleLength = 0;
					possibleUnknown = false;
				} else {
					possibleLength += 1;
					possibleUnknown ||= state === "unknown";
					if (possibleUnknown && possibleLength >= requiredTypes) return null;
				}
				if (state === "type") {
					if (runStart < 0) {
						runStart = at;
						startUnknown = at === start || unresolved(address - 8n);
					}
					continue;
				}
				endUnknown = state === "unknown";
			}
			if (runStart >= 0 && (at - runStart) / 8 >= requiredTypes) {
				runs.set(mapping.address + BigInt(runStart), endUnknown || startUnknown ? null : (at - runStart) / 8);
				if (runs.size > 1) return null;
			}
			runStart = -1;
		}
	}
	if (runs.size !== 1) return null;
	const [start, count] = [...runs][0];
	if (count === null) return null;
	const starts = new Set([start]);
	const referenced = container.architecture === "arm64" ? yield* arm64PageReferences(image, starts) : yield* ripRelativeReferences(image, starts);
	if (!referenced.has(start)) return null;
	return {
		count,
		types: start
	};
}
var TOTAL_NAME_OCCURRENCES, SCAN_BYTES, unresolvedPointerMatcher, MODULE_ARRAY_CANDIDATES, isDefinedTypeKind;
function init_Il2cppBinaryRegistration() {
	return (init_Il2cppBinaryRegistration = __esmMin((() => {
		init_binaryContainer();
		init_Il2cppBinaryFormat();
		init_Il2cppBinaryImage();
		init_Il2cppBinaryTypes();
		TOTAL_NAME_OCCURRENCES = 65536;
		SCAN_BYTES = 65536;
		unresolvedPointerMatcher = (image, candidates, candidateCounts) => {
			const fixups = image.machoPointerFixups;
			if (fixups === undefined) return () => undefined;
			const values = [...candidates];
			const masks = new Map();
			const maximumEntries = 8 * TOTAL_NAME_OCCURRENCES;
			let indexedEntries = 0;
			return (address, raw, count) => {
				if (!fixups.hasUnresolvedLegacyBytes(address, 8)) return undefined;
				let knownMask = 0n;
				for (let byte = 0; byte < 8; byte++) if (!fixups.hasUnresolvedLegacyBytes(address + BigInt(byte), 1)) knownMask |= 255n << BigInt(byte * 8);
				let matches = masks.get(knownMask);
				if (matches === undefined) {
					const index = new Map();
					let entries = 0;
					for (const candidate of values) {
						const key = candidate & knownMask;
						let candidateSet = index.get(key);
						if (candidateSet === undefined) {
							candidateSet = {
								counts: new Set(),
								minimum: Number.POSITIVE_INFINITY
							};
							index.set(key, candidateSet);
							entries++;
						}
						for (const value of candidateCounts?.(candidate) ?? []) if (!candidateSet.counts.has(value)) {
							candidateSet.counts.add(value);
							candidateSet.minimum = Math.min(candidateSet.minimum, value);
							entries++;
						}
						if (entries > maximumEntries - indexedEntries) {
							masks.set(knownMask, null);
							return null;
						}
					}
					matches = index;
					indexedEntries += entries;
					masks.set(knownMask, matches);
				}
				if (matches === null) return null;
				const candidateSet = matches.get(raw & knownMask);
				if (candidateSet === undefined) return undefined;
				if (candidateCounts === undefined) return null;
				if (count !== undefined) return candidateSet.counts.has(count) ? count : undefined;
				return candidateSet.minimum;
			};
		};
		MODULE_ARRAY_CANDIDATES = 64;
		isDefinedTypeKind = (kind) => kind >= 1 && kind <= 30 && kind !== 23 && kind !== 26;
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppBinaryGenerics.js
/**
* Resolve every genericMethodTable row the way Il2CppDumper does:
* genericMethodIndex selects an Il2CppMethodSpec, whose method definition and
* class/method Il2CppGenericInst give the name, and indices.methodIndex
* selects the genericMethodPointers slot. The CodeRegistration layout is the
* one candidate whose pointer, invoker and table counts bound every row.
*/
function* linkGenericMethodsSteps(image, metadata, facts, modulesField, metadataRegistration, options) {
	const version = metadata.metadata_version;
	const layouts = genericMethodLayouts(version);
	if (modulesField === null) throw new Il2cppBinaryFormatFailure("generic-methods-unsupported", "this binary keeps no static CodeRegistration, so genericMethodPointers cannot be located");
	if (metadataRegistration === null) throw new Il2cppBinaryFormatFailure("generic-methods-unsupported", "this binary keeps no static MetadataRegistration, so genericMethodTable cannot be located");
	const word = (address) => readPointer(image, address);
	const count = (address) => {
		const value = word(address);
		return value === null || value > BigInt(16777216) ? null : Number(value);
	};
	const i32 = (address) => {
		const value = readUInt32(image, address);
		return typeof value === "number" ? value | 0 : null;
	};
	const genericInstsCount = count(metadataRegistration + 16n);
	const genericInsts = word(metadataRegistration + 24n);
	const tableCount = count(metadataRegistration + 32n);
	const table = word(metadataRegistration + 40n);
	const specsCount = count(metadataRegistration + 64n);
	const specs = word(metadataRegistration + 72n);
	if (genericInstsCount === null || genericInsts === null || tableCount === null || table === null || specsCount === null || specs === null || genericInstsCount > 0 && !hasPointerArrayCoverage(image, genericInsts, genericInstsCount)) throw new Il2cppBinaryFormatFailure("generic-method-registration-not-found", `MetadataRegistration at 0x${metadataRegistration.toString(16)} holds no readable genericInsts, genericMethodTable and methodSpecs fields`);
	options.beforeText?.(tableCount * IL2CPP_GENERIC_INSTANCE_MINIMUM_BYTES);
	if (tableCount === 0) return {
		generic_method_pointers_field: null,
		generic_method_pointers_count: null,
		generic_method_table: table,
		generic_method_table_count: 0,
		generic_method_table_stride: null,
		method_specs_count: specsCount,
		generic_insts_count: genericInstsCount,
		instances: [],
		issues: []
	};
	const candidates = [];
	for (const layout of layouts) {
		const start = modulesField - BigInt(layout.modules);
		const wrappers = count(start);
		const wrapperArray = word(start + 8n);
		const pointersCount = count(start + 16n);
		const pointers = word(start + 24n);
		const invokers = count(start + (layout.stride === 16 ? 40n : 32n));
		if (wrappers === null || wrapperArray === null || pointersCount === null || pointers === null || invokers === null || wrappers > 0 && !hasPointerArrayCoverage(image, wrapperArray, wrappers)) continue;
		let agrees = true;
		for (let row = 0; row < tableCount && agrees; row++) {
			if (row % BATCH === 0) yield;
			const at = table + BigInt(row * layout.stride);
			const spec = i32(at);
			const slot = i32(at + 4n);
			const invoker = i32(at + 8n);
			agrees = spec !== null && slot !== null && invoker !== null && spec >= 0 && spec < specsCount && slot >= 0 && slot < pointersCount && invoker >= -1 && invoker < invokers;
		}
		if (agrees) candidates.push({
			field: start + 16n,
			pointers,
			pointersCount,
			stride: layout.stride
		});
	}
	if (candidates.length === 0) throw new Il2cppBinaryFormatFailure("generic-method-registration-not-found", `no CodeRegistration layout before 0x${modulesField.toString(16)} bounds the ${tableCount} genericMethodTable rows`);
	if (candidates.length > 1) throw new Il2cppBinaryFormatFailure("ambiguous-generic-method-registration", `${candidates.length} CodeRegistration layouts bound the ${tableCount} genericMethodTable rows`);
	const chosen = candidates[0];
	const specTable = specs;
	const rowAt = (row) => table + BigInt(row * chosen.stride);
	const specRows = new Map();
	for (let row = 0; row < tableCount; row++) {
		if (row % BATCH === 0) yield;
		const spec = i32(rowAt(row));
		const rows = specRows.get(spec);
		if (rows === undefined) specRows.set(spec, [row]);
		else rows.push(row);
	}
	const issues = [];
	const issue = (row, address, message) => {
		const entry = {
			row,
			address: hexAddress(address),
			message
		};
		options.onRow?.(entry);
		issues.push(entry);
	};
	const instance = (index) => {
		if (index === -1) return null;
		if (index < 0 || index >= genericInstsCount) return undefined;
		return word(genericInsts + BigInt(index * 8)) ?? undefined;
	};
	const methodSpecName = createMethodSpecNamer(image, metadata, facts, version, options.beforeText);
	const argumentMismatch = (kind, owner, container, instance) => {
		if (instance === null || container === undefined) return null;
		const given = readUInt32(image, instance);
		const declared = container === -1 ? 0 : facts.genericContainer(container)?.count;
		if (typeof given !== "number" || given === declared) return null;
		return declared === undefined ? `gives ${kind} ${owner} ${given} generic arguments, but its generic container ${container} is out of range` : `gives ${kind} ${owner} ${given} generic arguments, but it declares ${declared}`;
	};
	const unknown = {
		state: "unknown",
		address: null,
		rva: null
	};
	const entryAt = (base, index, size) => {
		if (index < 0) return null;
		const address = base + BigInt(index * size);
		return address + BigInt(size) - 1n > MAX_ADDRESS ? null : address;
	};
	function* resolve(row) {
		const at = rowAt(row);
		const spec = i32(at);
		const slot = i32(at + 4n);
		const shared = specRows.get(spec);
		const specAt = entryAt(specTable, spec, 12);
		const method = specAt === null ? null : i32(specAt);
		const classIndex = specAt === null ? null : i32(specAt + 4n);
		const methodIndex = specAt === null ? null : i32(specAt + 8n);
		if (shared.length > 1) {
			issue(row, at, `method spec ${spec} is shared by ${shared.length} genericMethodTable rows, including row ${shared[0] === row ? shared[1] : shared[0]}`);
			return {
				method_spec: spec,
				method,
				name: null,
				...unknown
			};
		}
		const base = {
			method_spec: spec,
			method
		};
		let name = null;
		if (specAt === null) issue(row, at, `method spec ${spec} lies outside the 64-bit address space from methodSpecs at 0x${specTable.toString(16)}`);
		else if (method === null || classIndex === null || methodIndex === null) issue(row, specAt, `method spec ${spec} is not file backed`);
		else if (method < 0 || method >= metadata.methods.length) issue(row, specAt, `method spec ${spec} names method ${method} outside the ${metadata.methods.length} metadata methods`);
		else {
			const classInstance = instance(classIndex);
			const methodInstance = instance(methodIndex);
			if (classInstance === undefined || methodInstance === undefined) issue(row, specAt, `method spec ${spec} names generic instances ${classIndex} and ${methodIndex}, outside the ${genericInstsCount} readable genericInsts`);
			else {
				const owner = metadata.methods[method].declaring_type;
				const mismatch = argumentMismatch("type", owner, facts.typeGenericContainer(owner), classInstance) ?? argumentMismatch("method", method, facts.methodGenericContainer(method), methodInstance);
				if (mismatch !== null) issue(row, specAt, `method spec ${spec} ${mismatch}`);
				else try {
					name = yield* methodSpecName(method, classInstance, methodInstance);
				} catch (cause) {
					if (!(cause instanceof Il2cppBinaryFormatFailure) || cause.kind === "limit") throw cause;
					issue(row, specAt, cause.message);
				}
			}
		}
		if (name === null) return {
			...base,
			name,
			...unknown
		};
		const named = {
			...base,
			name
		};
		const slotAt = entryAt(chosen.pointers, slot, 8);
		if (slotAt === null) {
			issue(row, at + 4n, `genericMethodPointers slot ${slot} lies outside the 64-bit address space from genericMethodPointers at 0x${chosen.pointers.toString(16)}`);
			return {
				...named,
				...unknown
			};
		}
		const pointer = readSlot(image, slotAt);
		if (pointer === null) {
			issue(row, slotAt, `genericMethodPointers slot ${slot} is not file mapped`);
			return {
				...named,
				...unknown
			};
		}
		if (pointer === "unknown") {
			issue(row, slotAt, `genericMethodPointers slot ${slot} has an unresolved relocation`);
			return {
				...named,
				...unknown
			};
		}
		if (pointer === 0n) return {
			...named,
			state: "no-body",
			address: null,
			rva: null
		};
		if (pointer < image.imageBase || !isExecutable(image, pointer)) {
			issue(row, slotAt, `genericMethodPointers slot ${slot} points outside unambiguous executable file data at 0x${pointer.toString(16)}`);
			return {
				...named,
				...unknown
			};
		}
		return {
			...named,
			state: "code",
			address: hexAddress(pointer),
			rva: hexAddress(pointer - image.imageBase)
		};
	}
	const instances = [];
	for (let row = 0; row < tableCount; row++) {
		if (row % BATCH === 0) yield;
		const resolved = yield* resolve(row);
		options.onRow?.(resolved);
		instances.push(resolved);
	}
	return {
		generic_method_pointers_field: chosen.field,
		generic_method_pointers_count: chosen.pointersCount,
		generic_method_table: table,
		generic_method_table_count: tableCount,
		generic_method_table_stride: chosen.stride,
		method_specs_count: specsCount,
		generic_insts_count: genericInstsCount,
		instances,
		issues
	};
}
var CODE_REGISTRATION_LAYOUTS, genericMethodLayouts, GENERIC_TABLE_LIMIT, BATCH, MAX_ADDRESS;
function init_Il2cppBinaryGenerics() {
	return (init_Il2cppBinaryGenerics = __esmMin((() => {
		init_Il2cppBinaryFormat();
		init_Il2cppBinaryImage();
		init_Il2cppBinaryTypes();
		init_Il2cppMetadataAdmission();
		CODE_REGISTRATION_LAYOUTS = {
			27: [{
				modules: 96,
				stride: 12
			}, {
				modules: 104,
				stride: 16
			}],
			29: [{
				modules: 104,
				stride: 16
			}, {
				modules: 120,
				stride: 16
			}],
			31: [{
				modules: 104,
				stride: 16
			}, {
				modules: 120,
				stride: 16
			}]
		};
		genericMethodLayouts = (version) => {
			const layouts = CODE_REGISTRATION_LAYOUTS[version];
			if (layouts === undefined) throw new Il2cppBinaryFormatFailure("generic-methods-unsupported", `generic method instances are not decoded for metadata version ${version}`);
			return layouts;
		};
		GENERIC_TABLE_LIMIT = 16777216;
		BATCH = 256;
		MAX_ADDRESS = 18446744073709551615n;
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppBinaryFile.js
/**
* Link metadata methods to native code addresses without executing the image.
* A method token's row id selects its module's methodPointers slot.
*/
function* linkIl2cppBinarySteps(bytes, metadata, facts, options = {}) {
	assertGenericLinkLayout(metadata, options);
	yield;
	return yield* linkImageSteps(openImageSteps(bytes), metadata, facts, options);
}
function* linkImageSteps(opening, metadata, facts, options) {
	const image = yield* opening;
	const version = metadata.metadata_version;
	const modules = yield* findModules(image, metadata);
	const registration_ = yield* findCodeRegistration(image, modules);
	const methodImage = new Int32Array(metadata.methods.length).fill(-1);
	for (const [index, entry] of metadata.images.entries()) for (let offset = 0; offset < entry.type_count; offset++) {
		const type = metadata.types[entry.type_start + offset];
		if (offset % LINK_BATCH === 0) yield;
		for (let method = 0; method < type.method_count; method++) {
			if (method % LINK_BATCH === 0) yield;
			methodImage[type.method_start + method] = index;
		}
	}
	const methodByImageAndRow = metadata.images.map(() => new Map());
	for (let index = 0; index < methodImage.length; index++) {
		if (index % LINK_BATCH === 0) yield;
		const owner = methodImage[index];
		if (owner === -1) continue;
		const token = facts.methodTokens[index];
		const row = token & 16777215;
		if (token >>> 24 !== 6 || row === 0) continue;
		const methodsByRow = methodByImageAndRow[owner];
		const earlier = methodsByRow.get(row);
		if (earlier !== undefined) throw new Il2cppBinaryFormatFailure("invalid-method-token", `methods ${earlier} and ${index} in image ${metadata.images[owner].name} share MethodDef token 0x${token.toString(16)}`);
		methodsByRow.set(row, index);
	}
	yield;
	const methodAddress = (index) => {
		const owner = methodImage[index];
		if (owner === -1) return "unknown";
		const module = modules[owner];
		const token = facts.methodTokens[index];
		const row = token & 16777215;
		if (token >>> 24 !== 6 || row === 0 || row > module.method_pointer_count) throw new Il2cppBinaryFormatFailure("invalid-method-token", `method ${index} token 0x${token.toString(16)} is outside module ${metadata.images[owner].name}'s ${module.method_pointer_count} method pointers`);
		const address = readSlot(image, module.method_pointers + BigInt((row - 1) * 8));
		if (address === null || address === undefined) throw new Il2cppBinaryFormatFailure("invalid-method-pointer", `module ${metadata.images[owner].name} method pointer ${row - 1} is not file mapped`);
		if (address === "unknown") return "unknown";
		if (address === 0n) return "no-body";
		if (!isExecutable(image, address)) throw new Il2cppBinaryFormatFailure("invalid-method-pointer", `method ${index} points outside unambiguous executable file data at 0x${address.toString(16)}`);
		return address;
	};
	const method_addresses = [];
	for (let index = 0; index < metadata.methods.length; index++) {
		if (index % LINK_BATCH === 0) yield;
		const code = methodAddress(index);
		if (typeof code === "bigint" && code < image.imageBase) throw new Il2cppBinaryFormatFailure("invalid-method-pointer", "method address precedes the link image base");
		const row = typeof code === "bigint" ? {
			state: "code",
			address: `0x${code.toString(16)}`,
			rva: `0x${(code - image.imageBase).toString(16)}`
		} : {
			state: code,
			address: null,
			rva: null
		};
		options.onRow?.(row);
		method_addresses.push(row);
	}
	const registration = yield* findMetadataRegistration(image, metadata.types.length, yield* referencedTypeCount(facts));
	const typeName = createTypeNamer(image, metadata, facts, version, options.beforeText);
	function* reference(type) {
		if (type === -1) return {
			type,
			name: null
		};
		if (type < 0 || type >= registration.count) throw new Il2cppBinaryFormatFailure("invalid-type", `type index ${type} is outside the ${registration.count} binary types`);
		if (version === 27) return {
			type,
			name: null
		};
		const address = readSlot(image, registration.types + BigInt(type * 8));
		if (address === "unknown") return {
			type,
			name: null
		};
		if (address === null) throw new Il2cppBinaryFormatFailure("invalid-type", `type ${type} has no mapped type-table slot`);
		if (address === 0n) throw new Il2cppBinaryFormatFailure("invalid-type", `type ${type} has no Il2CppType record`);
		return {
			type,
			name: yield* typeName(address, 0)
		};
	}
	function* column(types) {
		const rows = [];
		for (let index = 0; index < types.length; index++) {
			if (index % LINK_BATCH === 0) yield;
			const row = yield* reference(types[index]);
			options.onRow?.(row);
			rows.push(row);
		}
		return rows;
	}
	const return_types = yield* column(facts.returnTypes);
	const field_types = yield* column(facts.fieldTypes);
	const parameter_types = yield* column(facts.parameterTypes);
	const generic_methods = options.genericInstances === true ? yield* linkGenericMethodsSteps(image, metadata, facts, registration_.field, registration.field === null ? null : registration.field - 48n, options) : null;
	return {
		format: image.container.format,
		architecture: image.container.architecture,
		image_base: image.imageBase,
		code_gen_modules_field: registration_.field,
		code_gen_modules_array: registration_.array,
		code_gen_modules: modules,
		method_addresses,
		types_field: registration.field,
		types_count: registration.count,
		return_types,
		field_types,
		parameter_types,
		generic_methods
	};
}
/** One past the highest type index any return, field or parameter references. */
function* referencedTypeCount(facts) {
	let count = 0;
	for (const types of [
		facts.returnTypes,
		facts.fieldTypes,
		facts.parameterTypes
	]) for (let index = 0; index < types.length; index++) {
		if (index % LINK_BATCH === 0) yield;
		count = Math.max(count, types[index] + 1);
	}
	return count;
}
var assertGenericLinkLayout, linkIl2cppBinaryCooperative, LINK_BATCH;
function init_Il2cppBinaryFile() {
	return (init_Il2cppBinaryFile = __esmMin((() => {
		init_Il2cppBinaryFormat();
		init_Il2cppBinaryImage();
		init_Il2cppBinaryRegistration();
		init_Il2cppBinaryTypes();
		init_Il2cppBinaryGenerics();
		assertGenericLinkLayout = (metadata, options) => {
			if (options.genericInstances === true) genericMethodLayouts(metadata.metadata_version);
		};
		linkIl2cppBinaryCooperative = async (bytes, metadata, facts, options, pause) => {
			assertGenericLinkLayout(metadata, options);
			await pause();
			const container = await readIl2cppBinaryContainerCooperative(bytes, pause);
			const steps = linkImageSteps(openImageSteps(bytes, container), metadata, facts, options);
			let step = steps.next();
			while (!step.done) {
				await pause();
				step = steps.next();
			}
			return step.value;
		};
		LINK_BATCH = 256;
	})))();
}

//#endregion
//#region dist/il2cpp/Il2cppMetadataProvider.js
var OPERATION, INPUT_BYTES, OUTPUT_BYTES, inferredReferenceForm, failureForPrimary, failureFor, binaryReport, completeReportRecovery, reportLimit, sourceArtifact, metadataSourceEvidence, Il2cppMetadataProvider;
function init_Il2cppMetadataProvider() {
	return (init_Il2cppMetadataProvider = __esmMin((() => {
		init_Il2CppMetadataProviderIdentity();
		init_Il2cppBinaryFormat();
		init_parseFailureAnalysisError();
		init_Il2cppMetadataFormat();
		init_Il2cppMetadataV108();
		init_jsonValue();
		init_resources();
		init_analysisErrorCleanup();
		init_analysisErrorBase();
		init_evidence();
		init_Il2cppMetadataAdmission();
		init_Il2cppBinaryImage();
		init_jsonValueByteLength();
		init_analysisErrorCore();
		init_il2cppMetadata();
		init_fixedAllowanceRemediation();
		init_providerAdapterError();
		init_providerCleanupError();
		init_result();
		init_Il2cppMetadataFile();
		init_Il2cppBinaryFile();
		init_errorMessage();
		OPERATION = "inspect_il2cpp_metadata";
		INPUT_BYTES = 256 * 1024 * 1024;
		OUTPUT_BYTES = 64 * 1024 * 1024;
		inferredReferenceForm = (architecture) => architecture === "arm64" ? "an adjacent ADRP+ADD pair" : "RIP-relative LEA/MOV";
		failureForPrimary = (facts, path, field, maximum, metadataPath) => {
			const { cause, origin } = facts;
			if (origin === "owned-or-classified" && cause instanceof AnalysisError) return cause;
			if (cause instanceof Il2cppBinaryFormatFailure && isParseLimit(cause, "il2cpp-binary")) return parseLimitConstraint(OPERATION, cause.reason === "native-type-text-capacity" ? "memory" : "capacity", cause, fixedAllowanceOptions("The IL2CPP native-link allowance", cause.reason === "native-type-text-capacity" ? "parser" : "count", {
				limit: cause.failure.limit.maximum,
				...cause.unit === undefined ? {} : { unit: cause.unit }
			}));
			if (cause instanceof Il2cppBinaryFormatFailure || cause instanceof Il2cppMetadataFormatFailure) {
				const binary = cause instanceof Il2cppBinaryFormatFailure;
				const target = binary ? path : metadataPath;
				return cause.kind === "unsupported" ? new AnalysisUnsupportedTargetError(OPERATION, target, cause.message, { cause }) : new AnalysisInputError(OPERATION, { cause }, [{
					path: [binary ? field : "path"],
					reason: "invalid_format",
					message: binary ? `Selected binary ${target} does not link to the metadata: ${cause.message}` : `Selected artifact ${target} is corrupt: ${cause.message}`
				}]);
			}
			const identityFailure = projectOwnedArtifactIdentityFailure(facts, OPERATION, path);
			if (identityFailure !== undefined) return identityFailure;
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure) {
				if (cause.reason === "limit") return new AnalysisResourceConstraintError(OPERATION, "file-size", cause.message, { maximum_input_bytes: maximum }, {
					cause,
					...fixedAllowanceOptions("the fixed IL2CPP input allowance", "input", {
						limit: maximum,
						unit: "bytes"
					})
				});
				if (cause.reason === "path") return stableArtifactInputFailure(cause, OPERATION, field);
			}
			const fileFailure = projectSelectedArtifactFileFailure(cause, OPERATION, path, "artifact", field);
			if (fileFailure !== undefined) return fileFailure;
			return new ProviderAdapterError(IL2CPP_METADATA_PROVIDER_IDENTITY.id, OPERATION, {
				cause,
				diagnostics: {
					path,
					reason: errorMessage(cause)
				}
			});
		};
		failureFor = (cause, path, field = "path", maximum = INPUT_BYTES, metadataPath = path) => {
			const primary = failureForPrimary(artifactFilePrimaryFacts(cause), path, field, maximum, metadataPath);
			if (cause instanceof ArtifactReaderFailure && cause.partialObservation !== undefined && primary.partialObservation === undefined) primary.retainPartialObservation(cause.partialObservation);
			if (!(cause instanceof ArtifactReaderFailure) || cause.cleanup === undefined) return primary;
			const cleanup = new ProviderCleanupError(IL2CPP_METADATA_PROVIDER_IDENTITY.id, cause.cleanup.resources, { reason: cause.cleanup.reason }, {
				operation: OPERATION,
				cause
			});
			const error = analysisErrorWithCleanupFailure(primary, cleanup, OPERATION);
			bindArtifactFileCleanup(cause, error);
			return error;
		};
		binaryReport = (link, artifact) => ({
			binary: {
				artifact,
				format: link.format,
				architecture: link.architecture,
				image_base: hexAddress(link.image_base),
				code_gen_modules_field: link.code_gen_modules_field === null ? null : hexAddress(link.code_gen_modules_field),
				code_gen_modules_array: hexAddress(link.code_gen_modules_array),
				code_gen_modules: link.code_gen_modules.map((module) => ({
					image: module.image,
					address: hexAddress(module.address),
					method_pointer_count: module.method_pointer_count
				})),
				types_field: link.types_field === null ? null : hexAddress(link.types_field),
				types_count: link.types_count,
				generic_methods: link.generic_methods === null ? null : {
					generic_method_pointers_field: link.generic_methods.generic_method_pointers_field === null ? null : hexAddress(link.generic_methods.generic_method_pointers_field),
					generic_method_pointers_count: link.generic_methods.generic_method_pointers_count,
					generic_method_table: hexAddress(link.generic_methods.generic_method_table),
					generic_method_table_count: link.generic_methods.generic_method_table_count,
					generic_method_table_stride: link.generic_methods.generic_method_table_stride,
					method_specs_count: link.generic_methods.method_specs_count,
					generic_insts_count: link.generic_methods.generic_insts_count,
					issues: link.generic_methods.issues
				}
			},
			return_types: link.return_types,
			field_types: link.field_types,
			parameter_types: link.parameter_types,
			method_addresses: link.method_addresses,
			generic_method_instances: link.generic_methods?.instances ?? null
		});
		completeReportRecovery = "The IL2CPP complete-report allowance is a fixed report allowance. No complete metadata inventory is retained. Source facts already observed stay with this refusal, and complete CLI JSON does not raise the allowance. Repeating the unchanged request fails the same way.";
		reportLimit = (path, maximumBytes) => new AnalysisResourceConstraintError(OPERATION, "memory", `Complete IL2CPP metadata for ${path} exceeds the retained report budget; no complete inventory is retained.`, { maximum_report_bytes: maximumBytes }, {
			retryable: false,
			remediationAction: completeReportRecovery
		});
		sourceArtifact = (path, snapshot) => ({
			path,
			sha256: snapshot.sha256,
			bytes: snapshot.bytes.length
		});
		metadataSourceEvidence = (artifact, counts, binary = undefined, previous, v108) => createEvidence({
			path: artifact.path,
			sha256: artifact.sha256,
			format: "file"
		}, IL2CPP_METADATA_PROVIDER_IDENTITY, {
			operation: "observe_il2cpp_metadata_source",
			predicateType: "rea.il2cpp-metadata-source",
			parameters: {
				path: artifact.path,
				...binary === undefined ? {} : {
					binary_path: binary.path,
					...binary.architecture === undefined ? {} : { binary_architecture: binary.architecture },
					...binary.genericInstances === true ? { generic_instances: true } : {}
				}
			},
			result: {
				artifact,
				inventory_status: "not-returned-as-complete",
				...binary === undefined ? {} : { selected_binary: {
					path: binary.path,
					identity_status: binary.artifact === undefined ? "unavailable" : "observed",
					...binary.artifact === undefined ? {} : {
						sha256: binary.artifact.sha256,
						bytes: binary.artifact.bytes
					},
					...binary.architecture === undefined ? {} : { architecture: binary.architecture }
				} },
				...previous === undefined ? {} : { upstream_partial_observation: jsonValueSchema.parse(previous) },
				...counts === undefined ? {} : { validated_section_row_counts: { ...counts } },
				...v108 === undefined ? {} : { version_108_partial_inventory: v108 }
			},
			confidence: "observed",
			limitations: ["This partial source observation does not contain a complete metadata inventory. Section row counts, when available, are derived from the validated header extents and record layout; names and relationships may remain unexamined.", ...v108 === undefined ? [] : ["The version 108 header layout has not been checked against the reporter's file. Only section extents and a bounded sample of metadata strings were observed; type, method, literal, and binary layouts remain unverified and are not decoded."]],
			locations: [{
				kind: "artifact-path",
				path: artifact.path
			}, {
				kind: "file-offset-range",
				start: 0,
				end: artifact.bytes
			}]
		});
		Il2cppMetadataProvider = class {
			outputBytes;
			yieldControl;
			identity = IL2CPP_METADATA_PROVIDER_IDENTITY;
			#resources = new ArtifactResourceScope();
			#inspecting = false;
			/** `close()` stops admission permanently, including while an inspection is active. */
			#admissionStopped = false;
			/** `outputBytes` exists so tests can reach the guard with small files. */
			constructor(outputBytes = OUTPUT_BYTES, yieldControl = setImmediate) {
				this.outputBytes = outputBytes;
				this.yieldControl = yieldControl;
			}
			async close() {
				this.#admissionStopped = true;
				try {
					await this.#resources.close();
				} catch (cause) {
					if (!(cause instanceof ArtifactReaderFailure) || cause.cleanup === undefined) throw cause;
					const error = new ProviderCleanupError(IL2CPP_METADATA_PROVIDER_IDENTITY.id, cause.cleanup.resources, { reason: cause.cleanup.reason }, {
						cause,
						operation: OPERATION
					});
					bindArtifactFileCleanup(cause, error);
					throw error;
				}
			}
			/** Read every image, type and method name from one stable file snapshot. */
			async inspect(input, options) {
				if (options?.signal?.aborted) return err(cancelledBy(OPERATION, options.signal));
				if (this.#admissionStopped) return err(new AnalysisCapabilityUnavailableError(IL2CPP_METADATA_PROVIDER_IDENTITY.id, OPERATION, "IL2CPP metadata reader is closed", { remediationAction: "This reader has stopped admitting inspections. Create a new IL2CPP metadata reader to inspect again. Repeating the request on this reader fails the same way." }));
				if (this.#inspecting) return err(new AnalysisResourceConstraintError(OPERATION, "capacity", "Only one IL2CPP metadata inspection is admitted per reader.", { maximum_concurrent_inspections: 1 }, { remediationAction: "Retry after the active IL2CPP metadata inspection on this reader completes." }));
				this.#inspecting = true;
				const observed = {};
				const selectedBinarySource = () => input.binary_path === undefined ? undefined : {
					path: input.binary_path,
					...input.binary_architecture === undefined ? {} : { architecture: input.binary_architecture },
					...input.generic_instances === true ? { genericInstances: true } : {},
					...observed.binary === undefined ? {} : { artifact: observed.binary }
				};
				try {
					return await this.#resources.run(async () => {
						const snapshot = await this.#readArtifact(input.path, INPUT_BYTES, options?.signal, (artifact) => {
							observed.artifact = artifact;
						});
						const artifact = sourceArtifact(input.path, snapshot);
						observed.artifact = artifact;
						assertArtifactReadActive(options?.signal);
						const v108 = await inspectIl2cppMetadataV108(snapshot.bytes, async () => {
							await this.yieldControl();
							assertArtifactReadActive(options?.signal);
						});
						assertArtifactReadActive(options?.signal);
						if (v108 !== null) {
							const failure = new AnalysisUnsupportedTargetError(OPERATION, input.path, "unsupported-version: metadata version 108 has a partial header and string observation; type, method and binary layouts are not decoded");
							failure.partialObservation = metadataSourceEvidence(artifact, undefined, selectedBinarySource(), undefined, v108);
							return err(failure);
						}
						const limit = this.outputBytes;
						const admission = createIl2cppMetadataAdmission(limit, () => {
							throw reportLimit(input.path, limit);
						}, input.binary_path !== undefined);
						const readMetadata = input.binary_path === undefined ? readIl2cppMetadataSteps : readIl2cppMetadataForLinkingSteps;
						const steps = readMetadata(snapshot.bytes, {
							...admission,
							beforeRows: (counts) => {
								observed.counts = counts;
								admission.beforeRows(counts);
							}
						});
						let step = steps.next();
						while (!step.done) {
							await this.yieldControl();
							assertArtifactReadActive(options?.signal);
							step = steps.next();
						}
						const value = step.value;
						const decoded = "metadata" in value ? value.metadata : value;
						const link = "metadata" in value ? value.link : undefined;
						const binaryPath = input.binary_path;
						let sliceLimitations = [];
						let linked = {
							binary: null,
							method_addresses: [],
							return_types: [],
							field_types: [],
							parameter_types: [],
							generic_method_instances: null
						};
						if (binaryPath !== undefined) {
							if (link === undefined) throw new AnalysisOutputError(OPERATION, "Native linking facts were not retained for the selected binary.");
							try {
								const binary = await this.#readArtifact(binaryPath, IL2CPP_BINARY_BYTES, options?.signal, (artifact) => {
									observed.binary = artifact;
								});
								assertArtifactReadActive(options?.signal);
								const selected = requireIl2cppBinaryImage(OPERATION, binaryPath, binary.bytes, input.binary_architecture);
								sliceLimitations = selected.limitations;
								const linking = await linkIl2cppBinaryCooperative(selected.bytes, decoded, link, {
									...admission,
									genericInstances: input.generic_instances === true
								}, async () => {
									await this.yieldControl();
									assertArtifactReadActive(options?.signal);
								});
								linked = binaryReport(linking, {
									path: binaryPath,
									sha256: binary.sha256,
									bytes: binary.bytes.length
								});
							} catch (cause) {
								const failure = failureFor(cause, binaryPath, "binary_path", IL2CPP_BINARY_BYTES, input.path);
								failure.partialObservation = metadataSourceEvidence(artifact, observed.counts, selectedBinarySource(), failure.partialObservation);
								return err(failure);
							}
						}
						const report = {
							...decoded,
							...linked,
							artifact,
							limitations: [
								"Only unencrypted global-metadata.dat versions 24, 27, 29, 31 and 39 are decoded; names, counts and string literals are observed file content, not runtime behavior.",
								binaryPath === undefined ? "Native code addresses and IL2CPP binary registration are not recovered without binary_path." : `Method addresses come from the binary's code-generation module methodPointers, matched by module name, method count and metadata token; ${input.generic_instances === true ? "" : "generic method instances (see generic_instances), "}adjustor thunks and invokers are not linked, no-body means an observed zero slot, and unknown means no module claimed the method or its slot has an unresolved relocation.`,
								...linked.binary?.format === "elf" ? ["ELF symbolic pointers use the selected file's defined symbols to derive link-image addresses; runtime symbol interposition, external definitions, TLS addresses and IFUNC results are not established."] : [],
								...binaryPath !== undefined && input.generic_instances === true ? ["Generic method instances come from genericMethodTable, methodSpecs, genericInsts and genericMethodPointers, with names following Il2CppDumper's GetMethodSpecName (namespace on the declaring type, nested types joined with '.', arity cut, IntPtr/UIntPtr, no byref mark). The CodeRegistration layout is the only one of the known 27.0 to 31 layouts whose counts bound every genericMethodTable row; metadata versions 24 and 39 and builds without a static CodeRegistration are refused. A generic row is no-body for an observed zero pointer slot and unknown, with no address, exactly when an issue names its row: a contradicting method spec (its name is then null), a shared method spec, an unmapped or non-executable pointer, or an unresolved relocation."] : [],
								binaryPath === undefined ? "Field, parameter and return types are not recovered without binary_path; type indices refer to the native binary." : decoded.metadata_version === 27 ? "Field, parameter and return type names are null for metadata version 27: versions 27.0 to 27.2 share that header number but place the Il2CppType byref flag differently, so a name could gain or lose & without warning; type indices are still reported." : "Field, parameter and return type names are rendered from the binary's Il2CppType table in a C#-like form (keywords for primitives, Namespace.Outer+Inner, generic parameters by metadata name); nested generic arguments stay with the type component that declares them. An unresolved type-table slot retains its type index with a null name; a loader-unresolved value inside the type graph is refused rather than rendered from stored placeholder bytes. Custom modifiers, array bounds and attributes are not reported.",
								...linked.binary !== null && linked.binary.code_gen_modules_field === null ? [`The static CodeRegistration pair was not resolved. The module array is inferred from executable bytes consistent with ${inferredReferenceForm(linked.binary.architecture)} referencing one array candidate; instruction boundaries and runtime use were not verified.`] : [],
								...linked.binary !== null && linked.binary.types_field === null ? [`No static MetadataRegistration had the type-definition counts. The type table is inferred from executable bytes consistent with ${inferredReferenceForm(linked.binary.architecture)} referencing the one run of Il2CppType-shaped pointers long enough for every referenced type index; types_count is that run's length, at least every referenced type index but not an observed typesCount, and instruction boundaries and runtime use were not verified.`] : [],
								...binaryPath === undefined ? [] : ["The binary/metadata pair is caller-selected. Module name/count/token agreement is structural evidence, not a cryptographic proof that both files come from the same build."],
								...sliceLimitations,
								"declaring_type for types is derived from the nestedTypes section, and member and parameter owners from the owners' index ranges; row positions are the metadata indices."
							]
						};
						if (jsonValueByteLength(report, limit) > limit) throw reportLimit(input.path, limit);
						const parsed = il2cppMetadataSchema.safeParse(report);
						if (!parsed.success) throw new AnalysisOutputError(OPERATION, "IL2CPP metadata reader produced invalid section ranges or report values.", { cause: parsed.error });
						assertArtifactReadActive(options?.signal);
						return ok(parsed.data);
					});
				} catch (cause) {
					const failure = failureFor(cause, input.path);
					if (observed.artifact !== undefined) failure.partialObservation = metadataSourceEvidence(observed.artifact, observed.counts, selectedBinarySource(), failure.partialObservation);
					return err(failure);
				} finally {
					this.#inspecting = false;
				}
			}
			async #readArtifact(path, maximum, signal, observe) {
				try {
					const snapshot = await readStableArtifact(path, maximum, signal, undefined, this.#resources);
					observe(sourceArtifact(path, snapshot));
					return snapshot;
				} catch (cause) {
					const completion = artifactFileCompletion(cause);
					if (completion !== undefined) observe(sourceArtifact(path, completion.value));
					throw cause;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/composition/il2cpp.js
var createIl2cppMetadataService;
function init_il2cpp() {
	return (init_il2cpp = __esmMin((() => {
		init_Il2cppGhidraSeedWriter();
		init_Il2cppMetadataService();
		init_Il2cppMetadataProvider();
		createIl2cppMetadataService = () => new Il2cppMetadataService(new Il2cppMetadataProvider(), new Il2cppGhidraSeedWriter());
	})))();
}

//#endregion
//#region dist/cli/il2cppCommands.js
var il2cppCommands_exports = /* @__PURE__ */ __exportAll({ registerIl2cppCommands: () => registerIl2cppCommands });
var il2cppService, registerIl2cppCommands;
function init_il2cppCommands() {
	return (init_il2cppCommands = __esmMin((() => {
		init_il2cpp();
		init_il2cppToolContracts();
		init_analysisErrorCore();
		init_localPath();
		init_result();
		init_callerPath();
		init_contractCliDescription();
		init_contractCommand();
		il2cppService = (ghidraSeeds, seedBase) => {
			const service = createIl2cppMetadataService();
			return {
				inspect: (input, options) => {
					if (ghidraSeeds !== undefined) return service.inspectWithGhidraSeeds(input, {
						path: absoluteCallerPath(ghidraSeeds),
						...seedBase === undefined ? {} : { base: seedBase }
					}, options);
					if (seedBase !== undefined) return Promise.resolve(err(new AnalysisInputError("inspect_il2cpp_metadata", undefined, [{
						path: ["seed_base"],
						reason: "invalid_value",
						message: "--seed-base requires --ghidra-seeds."
					}])));
					return service.inspect(input, options);
				},
				close: () => service.close()
			};
		};
		registerIl2cppCommands = (cli, logger) => {
			registerContractCommand(cli, logger, contractNamed(IL2CPP_TOOL_CONTRACTS, "inspect_il2cpp_metadata"), {
				description: "Inventory IL2CPP global-metadata.dat names, owners and string literals, optionally linking method addresses from the native binary",
				positionals: ["path"],
				callerPaths: ["path", "binary_path"],
				evidenceDelivery: true,
				fields: {
					path: { description: "Local global-metadata.dat (version 24, 27, 29, 31 or 39)" },
					binary_path: {
						name: "binary",
						description: "Matching native binary (Mach-O GameAssembly.dylib, PE GameAssembly.dll or ELF libil2cpp.so) to link method addresses; read only"
					},
					binary_architecture: {
						name: "architecture",
						description: "Slice of a universal Mach-O binary"
					},
					generic_instances: { description: "Also link generic method instances (Type<Args>$$Method<Args>) and include them in --ghidra-seeds; needs --binary" }
				},
				cliOptions: {
					ghidraSeeds: localPathStringSchema.optional().describe("Also write REA_GHIDRA_SEED_FILE function seeds named Type$$Method for every linked method; needs --binary"),
					seedBase: z.string().regex(/^0x[0-9a-fA-F]{1,16}$/u).optional().describe("Address Ghidra loads the binary at; seeds are seed-base + RVA (default: Ghidra's loader default, 0x100000 for an ELF linked at 0, else the link base)")
				},
				cliOptionDependencies: {
					ghidraSeeds: ["binary"],
					seedBase: ["ghidraSeeds"]
				}
			}, (input, context) => {
				const { ghidraSeeds, seedBase } = context.cliOptions;
				return deliverWithService(() => il2cppService(ghidraSeeds, seedBase), "il2cpp-metadata")({
					...input,
					detail: "complete"
				}, context);
			});
		};
	})))();
}

//#endregion
export { il2cppCommands_exports, init_il2cppCommands };