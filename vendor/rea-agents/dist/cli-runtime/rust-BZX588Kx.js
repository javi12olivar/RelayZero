import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisOutputError, AnalysisResourceConstraintError, ParseFailureError, cancelledBy, carriedReason, decodeLimit, errorMessage, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_fixedAllowanceRemediation, init_parseFailure, malformedInput, truncatedInput, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_parseFailureAnalysisError, init_strictUtf8, isParseLimit, parseFailureAnalysisError, parseLimitConstraint } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryResourceFailure, binaryResourceCeiling, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { ArtifactReaderFailure, ArtifactResourceScope, artifactFileCancellationCause, artifactFilePrimaryFacts, assertArtifactReadActive, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_readStableArtifact, init_resources, projectArtifactCloseFailure, projectSelectedArtifactFileFailure, projectStableArtifactFailure, readStableArtifact, readerIntegrityFailure, stableArtifactInputFailure, yieldArtifactRead } from "./resources-B3P64jvH.js";
import { init_jsonDuplicateMember, parseJsonWithDuplicatePolicy } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_producerResourceLimits, producerLimitControl } from "./urlComponents-DJm-wtqY.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_jsonValueByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { init_machoTargetSelection, machoSelectionAnswersArchitecture, metadataReportSubjectFormat } from "./nativeValueTrace-B4vmCxtN.js";
import { RUST_AUDITABLE_FORMAT_VERSIONS, RUST_PRODUCER_DEFAULTS, binaryMetadataArchitecture, cyclicDependencyIndices, init_binaryMetadataArchitecture, init_rustBinary, init_rustBinaryQuery, init_rustResourceLimits, inspectRustBinaryRequestSchema, resolveRustProducerLimits, rustBinarySchema, rustDependencySectionName, rustProducerLimitsSchema, rustcPartialCoverage } from "./analysisViewResult-vDCF9Pxo.js";
import { init_AnalysisViewService, projectRetainedAnalysis, requireAnalysisViewRetention } from "./AnalysisViewService-D_M3W3PD.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { init_keyedCollection, keyedBy, uniqueKeyed } from "./keyedCollection-BoRfT2aE.js";
import { init_nodeCodecResult, nodeCodecResult } from "./nodeCodecResult-Ky56xTop.js";
import { init_machoSliceSelection, requireSelectedNativeImage } from "./machoSliceSelection-DdTVvVl5.js";
import { ULEB32, init_leb128, readLeb128 } from "./leb128-QVew1RrX.js";
import { init_readBinaryContainer, readBinaryContainer, readBinaryContainerCooperative } from "./readBinaryContainer-inCoG62k.js";
import { basename } from "node:path";
import { z } from "zod";
import { isUtf8 } from "node:buffer";
import { inflateSync } from "node:zlib";

//#region dist/application/rust/RustBinaryService.js
var OPERATION$1, RustBinaryService, evidenceFor;
function init_RustBinaryService() {
	return (init_RustBinaryService = __esmMin((() => {
		init_binaryMetadataArchitecture();
		init_machoTargetSelection();
		init_analysisErrorCore();
		init_evidence();
		init_rustBinary();
		init_rustBinaryQuery();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		init_AnalysisViewService();
		OPERATION$1 = "inspect_rust_binary";
		RustBinaryService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close();
			}
			/** Inspect one explicitly selected file without acquiring a binary session. */
			async inspect(rawInput, options, retention = {
				recordEvidence: undefined,
				evidenceById: undefined
			}) {
				const input = parseAnalysisInput(OPERATION$1, rawInput, inspectRustBinaryRequestSchema, options?.signal);
				if (!input.ok) return input;
				const { detail, view, ...parameters } = input.value;
				const compact = detail === "summary" || view !== undefined;
				if (compact) {
					const ready = requireAnalysisViewRetention(OPERATION$1, retention);
					if (!ready.ok) return ready;
				}
				const inspected = await this.provider.inspect(parameters, options);
				if (!inspected.ok) return inspected;
				const report = rustBinarySchema.safeParse(inspected.value);
				if (!report.success || report.data.artifact.path !== input.value.path || !machoSelectionAnswersArchitecture(report.data.selected_slice, input.value.architecture)) return err(new AnalysisOutputError(OPERATION$1, "Rust dependency reader returned malformed metadata or changed the selected artifact or slice identity."));
				const completed = completeProviderEvidence(evidenceFor(this.provider.identity, parameters, report.data), options?.signal);
				return compact && completed.ok ? projectRetainedAnalysis(completed.value, retention, view === undefined ? { kind: "summary" } : {
					kind: "rust",
					...view
				}) : completed;
			}
		};
		evidenceFor = (provider, parameters, value) => {
			const architecture = binaryMetadataArchitecture(value.architecture);
			const section = value.auditable_metadata;
			return createEvidence({
				path: value.artifact.path,
				sha256: value.artifact.sha256,
				format: metadataReportSubjectFormat(value),
				...architecture === undefined ? {} : { architecture }
			}, provider, {
				operation: OPERATION$1,
				parameters,
				result: value,
				confidence: "observed",
				limitations: value.limitations,
				locations: [{
					kind: "artifact-path",
					path: value.artifact.path
				}, ...section === null ? [] : [{
					kind: "file-offset-range",
					start: section.file_offset,
					end: section.file_offset + section.section_bytes
				}]]
			});
		};
	})))();
}

//#endregion
//#region dist/rust/RustBinaryProviderIdentity.js
var RUST_BINARY_PROVIDER_IDENTITY;
function init_RustBinaryProviderIdentity() {
	return (init_RustBinaryProviderIdentity = __esmMin((() => {
		RUST_BINARY_PROVIDER_IDENTITY = {
			id: "rust-auditable",
			name: "REA Rust dependency reader",
			version: "1"
		};
	})))();
}

//#endregion
//#region dist/rust/RustAuditableReader.js
var RUST_SECTION_BYTES, RUST_INFLATE_RATIO, RUST_UNCOMPRESSED_BYTES, JSON_DEPTH, packageSchema, documentVersionSchema, documentSchema, RUST_AUDITABLE_FORMAT, malformedSection, RUST_AUDITABLE_GRAPH_LIMIT, compressedSectionLimit, readAuditableSection, inflateSection, inflateFailure, parseDocument, MIN_PACKAGE_OUTPUT_BYTES, MIN_EDGE_OUTPUT_BYTES, admitGraphExpansion, PACKAGE_FIELDS, rejectMalformedPackages, packageRecord, nonEmptyString, assertDepth, normalizePackages, rootIndex;
function init_RustAuditableReader() {
	return (init_RustAuditableReader = __esmMin((() => {
		init_nodeCodecResult();
		init_rustResourceLimits();
		init_rustBinary();
		init_jsonValueByteLength();
		init_parseFailure();
		init_jsonDuplicateMember();
		init_strictUtf8();
		RUST_SECTION_BYTES = 1024 * 1024;
		RUST_INFLATE_RATIO = 64;
		RUST_UNCOMPRESSED_BYTES = 8 * 1024 * 1024;
		JSON_DEPTH = 32;
		packageSchema = z.strictObject({
			name: z.string().min(1),
			version: z.string().min(1),
			source: z.string().min(1),
			kind: z.enum(["runtime", "build"]).optional(),
			dependencies: z.array(z.int().nonnegative()).optional(),
			features: z.array(z.string().min(1)).optional(),
			root: z.boolean().optional()
		});
		documentVersionSchema = z.object({ format: z.int().nonnegative().max(4294967295).optional() });
		documentSchema = documentVersionSchema.extend({ packages: z.array(packageSchema) }).strict();
		RUST_AUDITABLE_FORMAT = "rust-auditable";
		malformedSection = (detail, cause) => new ParseFailureError({
			kind: "malformed",
			format: RUST_AUDITABLE_FORMAT,
			detail
		}, { cause });
		RUST_AUDITABLE_GRAPH_LIMIT = "dependency graph output bytes";
		compressedSectionLimit = (required) => decodeLimit(RUST_AUDITABLE_FORMAT, "Dependency section exceeds the 1 MiB compressed limit", {
			name: "compressed dependency bytes",
			maximum: RUST_SECTION_BYTES,
			required
		});
		readAuditableSection = (sectionName, fileOffset, bytes, options = {}) => {
			if (bytes.length === 0) throw malformedInput(RUST_AUDITABLE_FORMAT, "Dependency section is empty");
			if (bytes.length > RUST_SECTION_BYTES && options.peFileAlignment === undefined) throw compressedSectionLimit(bytes.length);
			const inflated = inflateSection(bytes, options.peFileAlignment);
			const document = parseDocument(inflated.bytes, options.maxOutputBytes ?? RUST_PRODUCER_DEFAULTS.output_bytes);
			const packages = normalizePackages(document.packages);
			const root = rootIndex(packages);
			return {
				section_name: sectionName,
				file_offset: fileOffset,
				section_bytes: bytes.length,
				compressed_bytes: inflated.compressedBytes,
				uncompressed_bytes: inflated.bytes.length,
				format_version: document.format ?? null,
				packages,
				root_package_index: root,
				dependency_edges: packages.flatMap((pkg, fromIndex) => pkg.dependencies.map((toIndex) => ({
					from_index: fromIndex,
					to_index: toIndex
				}))),
				cyclic_dependency_indices: cyclicDependencyIndices(packages)
			};
		};
		inflateSection = (bytes, peFileAlignment) => {
			const allocationMaximum = Math.min(RUST_UNCOMPRESSED_BYTES, bytes.length * 64);
			let result;
			try {
				result = nodeCodecResult(inflateSync(bytes, {
					info: true,
					maxOutputLength: allocationMaximum
				}));
			} catch (cause) {
				throw inflateFailure(cause, allocationMaximum, peFileAlignment !== undefined && peFileAlignment > 0 && allocationMaximum < 8388608);
			}
			const compressedBytes = result.consumedBytes;
			if (compressedBytes > RUST_SECTION_BYTES) throw compressedSectionLimit(compressedBytes);
			if (peFileAlignment !== undefined && peFileAlignment > 0) {
				const padding = bytes.subarray(compressedBytes);
				const alignedRawSize = Math.ceil(compressedBytes / peFileAlignment) * peFileAlignment;
				if (bytes.length !== alignedRawSize || padding.some((byte) => byte !== 0)) throw malformedInput(RUST_AUDITABLE_FORMAT, "Dependency section has bytes after the zlib stream");
			} else if (compressedBytes !== bytes.length) {
				throw malformedInput(RUST_AUDITABLE_FORMAT, "Dependency section has bytes after the zlib stream");
			}
			const compressedMaximum = Math.min(RUST_UNCOMPRESSED_BYTES, compressedBytes * 64);
			if (result.buffer.length > compressedMaximum) throw decodeLimit(RUST_AUDITABLE_FORMAT, "Inflated dependency JSON exceeds the size limit", {
				name: "inflated dependency JSON bytes",
				maximum: compressedMaximum,
				required: result.buffer.length
			});
			return {
				bytes: result.buffer,
				compressedBytes
			};
		};
		inflateFailure = (cause, maximum, storageBounded) => {
			const code = cause instanceof Error && "code" in cause ? String(cause.code) : "";
			if (code === "ERR_BUFFER_TOO_LARGE") return decodeLimit(RUST_AUDITABLE_FORMAT, storageBounded ? `Inflated dependency JSON exceeds the ${String(maximum)}-byte allowance derived from the padded section's storage size; the zlib stream length is unknown until it inflates, so the smaller stream-based limit could not be applied first` : "Inflated dependency JSON exceeds the size limit", {
				name: "inflated dependency JSON bytes",
				maximum
			}, { cause });
			if (code === "ERR_TRAILING_JUNK_AFTER_STREAM_END" || code.startsWith("Z_") || code === "ERR_INVALID_ARG_TYPE") return malformedInput(RUST_AUDITABLE_FORMAT, "Dependency section is not a complete zlib stream");
			return cause instanceof Error ? cause : new Error(String(cause));
		};
		parseDocument = (bytes, maxOutputBytes) => {
			let text;
			try {
				text = decodeStrictUtf8(bytes, "strip-signature");
			} catch (cause) {
				throw malformedSection("Dependency JSON is not valid UTF-8", cause);
			}
			assertDepth(text);
			const decoded = parseJsonWithDuplicatePolicy(text, "reject");
			if (!decoded.ok) {
				if (decoded.duplicate !== undefined) throw malformedInput(RUST_AUDITABLE_FORMAT, `Dependency JSON contains duplicate field ${JSON.stringify(decoded.duplicate.name)}`);
				throw malformedSection("Dependency section JSON is invalid", decoded.cause);
			}
			const value = decoded.value;
			const version = documentVersionSchema.safeParse(value);
			if (!version.success) throw malformedSection("Dependency JSON does not match the format schema", version.error);
			admitGraphExpansion(value, maxOutputBytes);
			rejectMalformedPackages(value);
			const parsed = documentSchema.safeParse(value);
			if (!parsed.success) throw malformedSection("Dependency JSON does not match the package schema", parsed.error);
			return parsed.data;
		};
		MIN_PACKAGE_OUTPUT_BYTES = JSON.stringify({
			name: "a",
			version: "a",
			source: "a",
			kind: null,
			dependencies: [],
			features: null,
			root: true
		}).length;
		MIN_EDGE_OUTPUT_BYTES = JSON.stringify({
			from_index: 0,
			to_index: 0
		}).length;
		admitGraphExpansion = (value, maxOutputBytes) => {
			if (typeof value !== "object" || value === null || !("packages" in value) || !Array.isArray(value.packages)) return;
			const packages = value.packages;
			let minimumBytes = packages.length * MIN_PACKAGE_OUTPUT_BYTES + Math.max(0, packages.length - 1);
			let edges = 0;
			const admit = () => {
				const edgeBytes = edges * MIN_EDGE_OUTPUT_BYTES + Math.max(0, edges - 1);
				const required = minimumBytes + edgeBytes;
				if (required > maxOutputBytes) throw decodeLimit(RUST_AUDITABLE_FORMAT, "Dependency graph exceeds the complete report byte budget before expansion", {
					name: RUST_AUDITABLE_GRAPH_LIMIT,
					maximum: maxOutputBytes,
					required
				});
			};
			const currentEdgeBytes = () => edges * MIN_EDGE_OUTPUT_BYTES + Math.max(0, edges - 1);
			admit();
			for (const pkg of packages) {
				if (typeof pkg === "object" && pkg !== null && "features" in pkg && Array.isArray(pkg.features) && pkg.features.every((feature) => typeof feature === "string")) {
					const featureBudget = maxOutputBytes - minimumBytes - currentEdgeBytes() + 4;
					const featureBytes = jsonValueByteLength(pkg.features, featureBudget);
					minimumBytes += featureBytes - 4;
					admit();
				}
				if (typeof pkg !== "object" || pkg === null || !("dependencies" in pkg) || !Array.isArray(pkg.dependencies)) continue;
				const count = pkg.dependencies.length;
				edges += count;
				minimumBytes += Math.max(0, count * 2 - 1);
				admit();
			}
		};
		PACKAGE_FIELDS = new Set([
			"name",
			"version",
			"source",
			"kind",
			"dependencies",
			"features",
			"root"
		]);
		rejectMalformedPackages = (value) => {
			if (typeof value !== "object" || value === null || !("packages" in value) || !Array.isArray(value.packages)) return;
			for (const [index, pkg] of value.packages.entries()) {
				if (!packageRecord(pkg)) throw malformedInput(RUST_AUDITABLE_FORMAT, `Dependency package ${String(index)} does not match the package schema`);
			}
		};
		packageRecord = (pkg) => {
			if (typeof pkg !== "object" || pkg === null || Array.isArray(pkg)) return false;
			const record = pkg;
			for (const key of Object.keys(record)) {
				if (!PACKAGE_FIELDS.has(key)) return false;
			}
			if (!nonEmptyString(record.name) || !nonEmptyString(record.version) || !nonEmptyString(record.source)) return false;
			if (record.kind !== undefined && record.kind !== "runtime" && record.kind !== "build") return false;
			if (record.root !== undefined && typeof record.root !== "boolean") return false;
			const dependencies = record.dependencies;
			if (dependencies !== undefined && (!Array.isArray(dependencies) || !dependencies.every((entry) => typeof entry === "number" && Number.isInteger(entry) && entry >= 0))) return false;
			const features = record.features;
			return features === undefined || Array.isArray(features) && features.every(nonEmptyString);
		};
		nonEmptyString = (value) => typeof value === "string" && value.length > 0;
		assertDepth = (text) => {
			let depth = 0;
			let quoted = false;
			let escaped = false;
			for (const char of text) {
				if (quoted) {
					if (escaped) escaped = false;
					else if (char === "\\") escaped = true;
					else if (char === "\"") quoted = false;
					continue;
				}
				if (char === "\"") {
					quoted = true;
					continue;
				}
				if (char === "{" || char === "[") {
					depth += 1;
					if (depth > JSON_DEPTH) throw malformedInput(RUST_AUDITABLE_FORMAT, "Dependency JSON nesting exceeds 32 levels");
				} else if ((char === "}" || char === "]") && depth > 0) depth -= 1;
			}
		};
		normalizePackages = (packages) => packages.map((pkg) => ({
			name: pkg.name,
			version: pkg.version,
			source: pkg.source,
			kind: pkg.kind ?? null,
			dependencies: pkg.dependencies ?? [],
			features: pkg.features ?? null,
			root: pkg.root ?? false
		}));
		rootIndex = (packages) => {
			const roots = packages.flatMap((pkg, index) => pkg.root ? [index] : []);
			if (roots.length > 1) throw malformedInput(RUST_AUDITABLE_FORMAT, "Dependency JSON declares more than one root package");
			for (const [index, pkg] of packages.entries()) {
				const outside = pkg.dependencies.find((target) => target >= packages.length);
				if (outside !== undefined) throw malformedInput(RUST_AUDITABLE_FORMAT, `Dependency index ${String(outside)} from package ${String(index)} is outside the package list`);
			}
			return roots[0] ?? null;
		};
	})))();
}

//#endregion
//#region dist/rust/RustWasmImage.js
var WASM_FORMAT, MAX_WASM_SECTIONS, PREAMBLE, CORE_MODULE_VERSION, COMPONENT_LAYER, CUSTOM_SECTION, DATA_SECTION, DEPENDENCY_SECTION, hasWasmPreamble, readRustWasmSections, customSection, readU32;
function init_RustWasmImage() {
	return (init_RustWasmImage = __esmMin((() => {
		init_leb128();
		init_parseFailure();
		WASM_FORMAT = "wasm";
		MAX_WASM_SECTIONS = 65536;
		PREAMBLE = Buffer.from("\0asm", "latin1");
		CORE_MODULE_VERSION = Buffer.from([
			1,
			0,
			0,
			0
		]);
		COMPONENT_LAYER = Buffer.from([1, 0]);
		CUSTOM_SECTION = 0;
		DATA_SECTION = 11;
		DEPENDENCY_SECTION = Buffer.from(".dep-v0", "latin1");
		hasWasmPreamble = (bytes) => bytes.subarray(0, PREAMBLE.length).equals(PREAMBLE);
		readRustWasmSections = (bytes) => {
			if (bytes.length < 8) throw truncatedInput(WASM_FORMAT, "WebAssembly header is truncated", { offset: 0 });
			if (bytes.subarray(6, 8).equals(COMPONENT_LAYER)) throw unsupportedInput(WASM_FORMAT, "WebAssembly components are unsupported; their embedded core modules are not inspected", {
				offset: 6,
				field: "layer"
			});
			if (!bytes.subarray(4, 8).equals(CORE_MODULE_VERSION)) throw unsupportedInput(WASM_FORMAT, "Only version 1 WebAssembly core modules are supported", {
				offset: 4,
				field: "version"
			});
			const dependencies = [];
			let data = null;
			let cursor = 8;
			for (let sections = 0; cursor < bytes.length; sections += 1) {
				const id = bytes[cursor];
				const size = readU32(bytes, cursor + 1, bytes.length, {
					label: "section size",
					boundary: "file"
				});
				const end = size.end + size.value;
				if (end > bytes.length) throw truncatedInput(WASM_FORMAT, "WebAssembly section extends past the end of the file", {
					offset: cursor,
					field: "section"
				});
				if (sections === 65536) throw decodeLimit(WASM_FORMAT, `WebAssembly module declares more than ${MAX_WASM_SECTIONS} sections`, {
					name: "max_wasm_sections",
					maximum: MAX_WASM_SECTIONS
				}, { offset: cursor });
				if (id === CUSTOM_SECTION) {
					const custom = customSection(bytes, size.end, end);
					if (custom.name.equals(DEPENDENCY_SECTION)) {
						dependencies.push({
							offset: custom.payload,
							size: end - custom.payload
						});
						if (dependencies.length === 2) break;
					}
				} else if (id === DATA_SECTION) {
					if (data !== null) throw malformedInput(WASM_FORMAT, "WebAssembly module declares more than one data section", {
						offset: cursor,
						field: "data section"
					});
					data = {
						offset: size.end,
						size: size.value
					};
				}
				cursor = end;
			}
			return {
				dependency_sections: dependencies,
				data_section: data
			};
		};
		customSection = (bytes, start, end) => {
			const length = readU32(bytes, start, end, {
				label: "custom section name length",
				boundary: "section"
			});
			if (length.value > end - length.end) throw malformedInput(WASM_FORMAT, "WebAssembly custom section name extends past its section", {
				offset: start,
				field: "custom section name"
			});
			const payload = length.end + length.value;
			const name = bytes.subarray(length.end, payload);
			if (!isUtf8(name)) throw malformedInput(WASM_FORMAT, "WebAssembly custom section name is not valid UTF-8", {
				offset: length.end,
				field: "custom section name"
			});
			return {
				name,
				payload
			};
		};
		readU32 = (bytes, offset, end, { label, boundary }) => {
			const read = readLeb128(bytes, offset, end, ULEB32);
			if ("value" in read) return {
				value: Number(read.value),
				end: read.next
			};
			const site = {
				offset,
				field: label
			};
			if (read.failure === "truncated" && boundary === "file") throw truncatedInput(WASM_FORMAT, `WebAssembly ${label} extends past the end of the file`, site);
			throw malformedInput(WASM_FORMAT, read.failure === "truncated" ? `WebAssembly ${label} extends past its section` : `WebAssembly ${label} does not fit a 32-bit LEB128 integer`, site);
		};
	})))();
}

//#endregion
//#region dist/rust/RustBinaryImage.js
var RUSTC_PREFIX, HASH_BYTES, readRustBinaryImage, readRustBinaryImageCooperative, finishRustBinaryImage, nativeLayout, wasmLayout, duplicateDependencySection, dependencySection, rustcCommit, mergedFileRanges, collectHashes, hashAt;
function init_RustBinaryImage() {
	return (init_RustBinaryImage = __esmMin((() => {
		init_parseFailure();
		init_keyedCollection();
		init_readBinaryContainer();
		init_rustBinary();
		init_rustResourceLimits();
		init_RustAuditableReader();
		init_RustWasmImage();
		RUSTC_PREFIX = Buffer.from("/rustc/");
		HASH_BYTES = 40;
		readRustBinaryImage = (bytes, maxRustcHashes = 64, maxOutputBytes = RUST_PRODUCER_DEFAULTS.output_bytes) => finishRustBinaryImage(bytes, maxRustcHashes, maxOutputBytes, hasWasmPreamble(bytes) ? wasmLayout(bytes) : nativeLayout(bytes));
		readRustBinaryImageCooperative = async (bytes, maxRustcHashes, maxOutputBytes, pause) => finishRustBinaryImage(bytes, maxRustcHashes ?? 64, maxOutputBytes ?? RUST_PRODUCER_DEFAULTS.output_bytes, hasWasmPreamble(bytes) ? wasmLayout(bytes) : nativeLayout(bytes, await readBinaryContainerCooperative(bytes, "inspect_rust_binary", pause)));
		finishRustBinaryImage = (bytes, maxRustcHashes, maxOutputBytes, layout) => {
			const { section_name, dependency, compiler_strings, ...identity } = layout;
			return {
				...identity,
				auditable_metadata: dependency === null ? null : readAuditableSection(section_name, dependency.offset, bytes.subarray(dependency.offset, dependency.offset + dependency.size), {
					maxOutputBytes,
					peFileAlignment: dependency.peFileAlignment
				}),
				rustc_commit: rustcCommit(bytes, compiler_strings, maxRustcHashes, maxOutputBytes)
			};
		};
		nativeLayout = (bytes, container = readBinaryContainer(bytes, "inspect_rust_binary")) => {
			const section_name = rustDependencySectionName(container.format);
			const dependency = dependencySection(section_name, container.sections);
			return {
				format: container.format,
				architecture: container.architecture,
				bits: container.bits,
				byte_order: container.byte_order,
				...container.section_names_limitation === undefined ? {} : { section_names_limitation: container.section_names_limitation },
				section_name,
				dependency: dependency === null ? null : {
					offset: dependency.offset,
					size: dependency.size,
					peFileAlignment: dependency.format === "pe" && dependency.virtual_size === 0 && dependency.file_alignment > 0 && dependency.raw_size % dependency.file_alignment === 0 ? dependency.file_alignment : undefined
				},
				compiler_strings: [...container.sections.filter((section) => section.read_only), ...container.format === "elf" ? (container.load_regions ?? []).filter((region) => region.read && !region.write && !region.execute).map(({ mapping }) => mapping) : []]
			};
		};
		wasmLayout = (bytes) => {
			const { dependency_sections, data_section } = readRustWasmSections(bytes);
			if (dependency_sections.length > 1) throw duplicateDependencySection();
			return {
				format: "wasm",
				architecture: "wasm",
				bits: null,
				byte_order: "little",
				section_name: rustDependencySectionName("wasm"),
				dependency: dependency_sections[0] ?? null,
				compiler_strings: data_section === null ? [] : [data_section]
			};
		};
		duplicateDependencySection = () => malformedInput(RUST_AUDITABLE_FORMAT, "Image contains more than one dependency section");
		dependencySection = (expected, sections) => {
			const selected = uniqueKeyed(keyedBy(sections, ({ name }) => name), expected);
			if (!selected.ok) throw duplicateDependencySection();
			const section = selected.value;
			if (section === undefined) return null;
			if (section.compressed) throw unsupportedInput(RUST_AUDITABLE_FORMAT, "Compressed dependency sections are unsupported", { undecodedContent: true });
			if (!section.file_backed) throw malformedInput(RUST_AUDITABLE_FORMAT, "Dependency section is not file-backed");
			return section;
		};
		rustcCommit = (bytes, spans, maxHashes, maxOutputBytes) => {
			const retention = {
				hashes: [],
				seen: new Set(),
				maxHashes,
				maxBytes: maxOutputBytes,
				bytes: 2,
				reason: undefined
			};
			for (const range of mergedFileRanges(spans)) {
				collectHashes(bytes, range, retention);
				if (retention.reason !== undefined) break;
			}
			return retention.hashes.length === 0 ? null : {
				evidence_kind: "inferred",
				hashes: retention.hashes,
				...retention.reason !== undefined ? { coverage: rustcPartialCoverage(retention.reason, retention.reason === "report_bytes" ? maxOutputBytes : maxHashes) } : {}
			};
		};
		mergedFileRanges = (ranges) => {
			const sorted = ranges.filter(({ size }) => size > 0).map(({ offset, size }) => ({
				offset,
				end: offset + size
			})).sort((left, right) => left.offset - right.offset);
			const merged = [];
			for (const range of sorted) {
				const last = merged.at(-1);
				if (last !== undefined && range.offset <= last.end) last.end = Math.max(last.end, range.end);
				else merged.push({ ...range });
			}
			return merged;
		};
		collectHashes = (bytes, range, retention) => {
			const region = bytes.subarray(range.offset, range.end);
			let cursor = 0;
			while (cursor < region.length) {
				const at = region.indexOf(RUSTC_PREFIX, cursor);
				if (at < 0) return;
				const start = at + RUSTC_PREFIX.length;
				const hash = hashAt(region, start);
				if (hash !== null && !retention.seen.has(hash)) {
					if (retention.seen.size >= retention.maxHashes) {
						retention.reason = "max_rustc_hashes";
						return;
					}
					const entry = {
						hash,
						file_offset: range.offset + at
					};
					const entryBytes = Buffer.byteLength(JSON.stringify(entry)) + 1;
					if (entryBytes > retention.maxBytes - retention.bytes) {
						retention.reason = "report_bytes";
						return;
					}
					retention.bytes += entryBytes;
					retention.seen.add(hash);
					retention.hashes.push(entry);
				}
				cursor = at + 1;
			}
		};
		hashAt = (region, start) => {
			const end = start + HASH_BYTES;
			if (end >= region.length || region[end] !== 47 && region[end] !== 92) return null;
			for (let index = start; index < end; index += 1) {
				const byte = region[index] ?? 0;
				const hex = byte >= 48 && byte <= 57 || byte >= 97 && byte <= 102;
				if (!hex) return null;
			}
			return region.toString("latin1", start, end);
		};
	})))();
}

//#endregion
//#region dist/rust/RustBinaryProvider.js
var OPERATION, RustBinaryProvider, inFile, outputLimit, RUST_RESOURCE_GUARD_LIMITATION, limitationsFor, unknownFormatLimitation, compilerPathSource, rustcLimitation, retainCompilerPathsWithinReport, failureForPrimary, failureFor, artifactFailure, artifactReaderFailure;
function init_RustBinaryProvider() {
	return (init_RustBinaryProvider = __esmMin((() => {
		init_producerResourceLimits();
		init_RustBinaryProviderIdentity();
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_rustBinary();
		init_fixedAllowanceRemediation();
		init_providerAdapterError();
		init_result();
		init_RustBinaryImage();
		init_machoSliceSelection();
		init_RustAuditableReader();
		init_binaryContainer();
		init_RustWasmImage();
		init_parseFailureAnalysisError();
		init_rustResourceLimits();
		init_inputIssueProjection();
		init_errorMessage();
		OPERATION = "inspect_rust_binary";
		RustBinaryProvider = class {
			identity = RUST_BINARY_PROVIDER_IDENTITY;
			#resources = new ArtifactResourceScope();
			async close() {
				try {
					await this.#resources.close();
				} catch (cause) {
					throw projectArtifactCloseFailure(cause, RUST_BINARY_PROVIDER_IDENTITY.id, OPERATION);
				}
			}
			/** Read one dependency section and any inferred rustc commit from the selected file. */
			async inspect(input, options) {
				let snapshot;
				const selectedLimits = rustProducerLimitsSchema.safeParse(input.producer_limits === undefined ? {} : input.producer_limits);
				if (!selectedLimits.success) return err(analysisInputErrorFromIssues(OPERATION, selectedLimits.error.issues.map((issue) => ({
					...issue,
					path: ["producer_limits", ...issue.path]
				})), input));
				const limits = resolveRustProducerLimits(selectedLimits.data);
				try {
					return await this.#resources.run(async () => {
						snapshot = await readStableArtifact(input.path, limits.input_bytes, options?.signal, undefined, this.#resources);
						assertArtifactReadActive(options?.signal);
						const selected = requireSelectedNativeImage(OPERATION, input.path, snapshot.bytes, input.architecture);
						const image = inFile(options?.signal === undefined ? readRustBinaryImage(selected.bytes, input.max_rustc_hashes, limits.output_bytes) : await readRustBinaryImageCooperative(selected.bytes, input.max_rustc_hashes, limits.output_bytes, () => yieldArtifactRead(options.signal)), selected.fileOffset);
						const report = {
							format: image.format,
							architecture: image.architecture,
							bits: image.bits,
							byte_order: image.byte_order,
							auditable_metadata: image.auditable_metadata,
							rustc_commit: image.rustc_commit,
							artifact: {
								path: input.path,
								file_name: basename(input.path),
								sha256: snapshot.sha256,
								bytes: snapshot.bytes.length
							},
							...selected.selection === null ? {} : { selected_slice: selected.selection },
							limitations: [
								...limitationsFor(image),
								`Selected producer_limits.input_bytes=${String(limits.input_bytes)} and output_bytes=${String(limits.output_bytes)} bytes; compressed/inflated dependency parser limits remain independent.`,
								...selected.limitations
							]
						};
						retainCompilerPathsWithinReport(report, limits.output_bytes, rustcLimitation(image.rustc_commit, image.format));
						if (Buffer.byteLength(JSON.stringify(report), "utf8") > limits.output_bytes) throw outputLimit(input.path, limits.output_bytes);
						const parsed = rustBinarySchema.safeParse(report);
						if (!parsed.success) throw new AnalysisOutputError(OPERATION, "Rust reader produced an invalid dependency report.", { cause: parsed.error });
						assertArtifactReadActive(options?.signal);
						return ok(parsed.data);
					});
				} catch (cause) {
					return err(failureFor(cause, input.path, limits, snapshot));
				}
			}
		};
		inFile = (image, fileOffset) => fileOffset === 0 ? image : {
			...image,
			auditable_metadata: image.auditable_metadata === null ? null : {
				...image.auditable_metadata,
				file_offset: image.auditable_metadata.file_offset + fileOffset
			},
			rustc_commit: image.rustc_commit === null ? null : {
				...image.rustc_commit,
				hashes: image.rustc_commit.hashes.map((entry) => ({
					...entry,
					file_offset: entry.file_offset + fileOffset
				}))
			}
		};
		outputLimit = (path, maxOutputBytes) => new AnalysisResourceConstraintError(OPERATION, "transport", `Complete Rust metadata for ${path} exceeds the inline output budget; no partial success is returned.`, { maximum_output_bytes: maxOutputBytes }, {
			retryable: false,
			remediationAction: `Increase producer_limits.output_bytes above ${String(maxOutputBytes)} bytes on the next inspect_rust_binary call; no restart is required. Input, dependency parser and transport limits remain independent. Repeating the unchanged request does not raise admission.`,
			limit: producerLimitControl("output_bytes", maxOutputBytes, RUST_PRODUCER_DEFAULTS.output_bytes)
		});
		RUST_RESOURCE_GUARD_LIMITATION = "Default input and complete-report admission are 256 MiB and 8 MiB; producer_limits.input_bytes/output_bytes select larger or smaller values for the next call without restart. Independent parser guards bound the compressed dependency stream to 1 MiB and inflated JSON to the smaller of 8 MiB and 64 times the consumed compressed-stream length. Report admission applies before package schema cloning, graph objects, or reverse-edge allocation.";
		limitationsFor = (image) => [
			"Embedded dependency metadata is file content. It does not authenticate package names, versions, sources, or the compiler that produced the binary.",
			`Only the .dep-v0 dependency section and compiler path strings in ${compilerPathSource(image.format)} are inspected. Functions, types, and runtime behavior are not recovered.`,
			...image.format === "wasm" ? [`WebAssembly declares no container word size, so bits is null. Memory address types were not inspected. At most ${MAX_WASM_SECTIONS} section payloads are examined.`] : [],
			RUST_RESOURCE_GUARD_LIMITATION,
			...image.section_names_limitation === undefined ? [] : [image.section_names_limitation],
			...image.auditable_metadata === null && image.section_names_limitation === undefined ? ["No .dep-v0 section was found. Absence of .dep-v0 does not mean the binary has no dependencies."] : [],
			...image.auditable_metadata === null && image.section_names_limitation !== undefined ? ["The presence of .dep-v0 could not be determined because ELF section names are unavailable."] : [],
			...unknownFormatLimitation(image.auditable_metadata?.format_version),
			...image.auditable_metadata?.packages.some((pkg) => pkg.kind === null) ? ["An omitted package kind is left null. The embedded format treats an omitted kind as runtime, and that default was not stored in the section."] : [],
			...image.auditable_metadata !== null && image.auditable_metadata.cyclic_dependency_indices.length > 0 ? ["Dependency indices contain a cycle. The cycle is reported and was not traversed."] : []
		];
		unknownFormatLimitation = (format) => {
			if (format === null || format === undefined) return [];
			let preceding = 0;
			for (const known of RUST_AUDITABLE_FORMAT_VERSIONS) {
				if (known === format) return [];
				if (known < format) preceding = known;
			}
			return [`cargo-auditable format revision ${format} is unknown. Its schema directs readers to interpret it using the highest known preceding revision (${preceding}); this specific revision has not been independently verified.`];
		};
		compilerPathSource = (format) => format === "wasm" ? "the WebAssembly data section" : "read-only data";
		rustcLimitation = (commit, format) => {
			const source = compilerPathSource(format);
			if (commit === null) return [`No /rustc/<40-hex>/ path was found in ${source}, so a rustc commit hash is unknown.`];
			if (commit.coverage?.reason === "report_bytes") return ["Compiler-path retention exhausted the complete-report byte allowance; retained hashes are a prefix and compiler coverage is partial. Dependency observations are independent. Raise the control in rustc_commit.coverage.limit on the next call to raise report admission; no restart is required. Increasing max_rustc_hashes alone does not raise it."];
			if (commit.coverage?.status === "partial") return [`Compiler-path retention reached max_rustc_hashes=${String(commit.coverage.effective_limit)}; the listed hashes are a prefix and compiler coverage is partial. Raise the control in rustc_commit.coverage.limit on the next call to retain more paths; no restart is required. Dependency observations are independent. The complete-report byte allowance still applies.`];
			if (commit.hashes.length === 1) return [`The rustc commit hash is inferred from a /rustc/<40-hex>/ path in ${source}. It does not by itself prove which compiler produced the binary.`];
			return [`More than one /rustc/<40-hex>/ path was found in ${source}, so a single rustc commit is unknown.`];
		};
		retainCompilerPathsWithinReport = (report, maxOutputBytes, compilerGuidance) => {
			const commit = report.rustc_commit;
			const withGuidance = [...report.limitations, ...compilerGuidance];
			if (commit === null || Buffer.byteLength(JSON.stringify({
				...report,
				limitations: withGuidance
			})) <= maxOutputBytes) {
				report.limitations = withGuidance;
				return;
			}
			if (Buffer.byteLength(JSON.stringify(report)) <= maxOutputBytes) return;
			const limitation = "Compiler paths were omitted to preserve dependency facts within the complete-report byte allowance; compiler-path coverage is partial. Increase producer_limits.output_bytes on the next call; no restart is required. Increasing max_rustc_hashes alone does not raise this allowance.";
			const baseline = {
				...report,
				rustc_commit: null,
				limitations: [...report.limitations, limitation]
			};
			const empty = {
				...commit,
				hashes: [],
				coverage: rustcPartialCoverage("report_bytes", maxOutputBytes)
			};
			const available = maxOutputBytes - Buffer.byteLength(JSON.stringify({
				...baseline,
				rustc_commit: empty
			}));
			let retainedBytes = 0;
			let count = 0;
			for (const hash of commit.hashes.slice(0, -1)) {
				const bytes = Buffer.byteLength(JSON.stringify(hash)) + (count === 0 ? 0 : 1);
				if (bytes > available - retainedBytes) break;
				retainedBytes += bytes;
				count++;
			}
			if (count === 0) {
				report.rustc_commit = null;
				if (empty.coverage.limit !== undefined) report.rustc_commit_omission = {
					reason: "report_bytes",
					limit: empty.coverage.limit
				};
			} else report.rustc_commit = {
				...empty,
				hashes: commit.hashes.slice(0, count)
			};
			report.limitations = baseline.limitations;
		};
		failureForPrimary = (facts, path, limits) => {
			const { cause, origin } = facts;
			if (origin === "owned-or-classified" && cause instanceof AnalysisError) return cause;
			if (cause instanceof BinaryResourceFailure) return parseLimitConstraint(OPERATION, "memory", cause, {
				path,
				legacyMaximumKey: "maximum_bytes",
				...fixedAllowanceOptions("This native container parser allowance", "parser", binaryResourceCeiling(cause))
			});
			if (isParseLimit(cause, "rust-auditable")) {
				const { name, maximum } = cause.failure.limit;
				if (name === "dependency graph output bytes") return parseLimitConstraint(OPERATION, "transport", cause, {
					path,
					legacyMaximumKey: "maximum_output_bytes",
					retryable: false,
					remediationAction: `Increase producer_limits.output_bytes above ${String(maximum)} bytes on the next call; no restart is required. Compressed/inflated dependency parser and transport limits remain independent.`,
					limit: producerLimitControl("output_bytes", maximum, RUST_PRODUCER_DEFAULTS.output_bytes)
				});
				return parseLimitConstraint(OPERATION, "memory", cause, {
					path,
					legacyMaximumKey: "maximum_bytes",
					...fixedAllowanceOptions("This Rust dependency parser allowance", "parser", {
						limit: maximum,
						unit: "bytes"
					})
				});
			}
			if (isParseLimit(cause, "wasm")) return parseLimitConstraint(OPERATION, "cpu", cause, {
				path,
				...fixedAllowanceOptions("The WebAssembly section-walk allowance", "work", {
					limit: cause.failure.limit.maximum,
					unit: "sections"
				})
			});
			return parseFailureAnalysisError(OPERATION, path, cause) ?? artifactFailure(facts, path, limits);
		};
		failureFor = (cause, path, limits, snapshot) => {
			const primary = failureForPrimary(artifactFilePrimaryFacts(cause), path, limits);
			return projectStableArtifactFailure(cause, primary, path, RUST_BINARY_PROVIDER_IDENTITY.id, OPERATION, snapshot);
		};
		artifactFailure = (facts, path, limits) => {
			const { cause, origin } = facts;
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure) return artifactReaderFailure(cause, path, limits);
			const fileFailure = projectSelectedArtifactFileFailure(cause, OPERATION, path, "artifact");
			if (fileFailure !== undefined) return fileFailure;
			return new ProviderAdapterError(RUST_BINARY_PROVIDER_IDENTITY.id, OPERATION, {
				cause,
				diagnostics: {
					path,
					reason: errorMessage(cause)
				}
			});
		};
		artifactReaderFailure = (cause, path, limits) => {
			if (cause.reason === "integrity") return readerIntegrityFailure(OPERATION, path, cause);
			if (cause.reason === "cancelled") return cancelledBy(OPERATION, carriedReason(artifactFileCancellationCause(cause)));
			if (cause.reason === "limit") return new AnalysisResourceConstraintError(OPERATION, "file-size", cause.message, { maximum_input_bytes: limits.input_bytes }, {
				cause,
				retryable: false,
				remediationAction: `Increase producer_limits.input_bytes above ${String(limits.input_bytes)} bytes on the next inspect_rust_binary call; no restart is required. Select the same complete artifact, without truncating its bytes. Report, dependency parser and host memory limits remain independent.`,
				limit: producerLimitControl("input_bytes", limits.input_bytes, RUST_PRODUCER_DEFAULTS.input_bytes)
			});
			if (cause.reason === "path") return stableArtifactInputFailure(cause, OPERATION);
			return new ProviderAdapterError(RUST_BINARY_PROVIDER_IDENTITY.id, OPERATION, {
				cause,
				diagnostics: {
					path,
					reason: cause.message
				}
			});
		};
	})))();
}

//#endregion
//#region dist/composition/rust.js
var createRustBinaryService;
function init_rust() {
	return (init_rust = __esmMin((() => {
		init_RustBinaryService();
		init_RustBinaryProvider();
		createRustBinaryService = () => new RustBinaryService(new RustBinaryProvider());
	})))();
}

//#endregion
export { createRustBinaryService, init_rust };