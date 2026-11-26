import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisOutputError, AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, BinaryTargetError, init_analysisErrorCore, init_configurationErrors, init_sha256Hex, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ArtifactReaderFailure, ArtifactResourceScope, DirectoryArtifactReader, DirectoryArtifactRootFailure, DirectoryArtifactTraversalLimit, abortIfNeeded, artifactFileCompletion, init_ArtifactFileOperation, init_ArtifactOperationFailure, init_ArtifactReader, init_ArtifactResourceScope, init_DirectoryArtifactReader, init_StreamDigest, init_resources, translateArtifactFailure } from "./resources-B3P64jvH.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { hasDosMzMagic, init_dosMz, init_peCoffHeader, observeMzWindowsHeader, readPeCoffHeader } from "./peOptionalHeader-DrZ2zQO-.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_jsonStringByteLength, init_jsonValueByteLength, jsonStringByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { ARTIFACT_GRAPH_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { IL2CPP_METADATA_VERSIONS, desktopApplicationSchema, init_desktopApplication, init_il2cppMetadata, inspectDesktopApplicationInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { ManagedReaderFailure, init_managedReaderFailure } from "./managedInspectionEvidence-Cw9u32rc.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { hasMachoMagic, init_machoContainer } from "./machoLoadCommands-DCQgk7s-.js";
import { init_binaryTarget, parsePeRecordFacts, peRvaToFileOffset } from "./binaryTarget-BWcJ62i0.js";
import { desktopPathConventions, init_nativeConvention } from "./nativeConvention-C45X9yzb.js";
import { declaredArtifactEntries, init_ArtifactTraversalObservation, init_GodotPckLocation, observeEmbeddedGodotPck } from "./GodotPckLocation-RL8LCx06.js";
import { UNITYFS_HEADER_PREFIX_BYTES, hasGodotPckHeader, hasUnityFsHeader, init_godotPckFormat, init_unityfsFormat, readGodotPckHeaderFacts, readUnityFsHeaderFacts } from "./unityfsFormat-D0CcnmXe.js";
import { init_il2cppMetadataHeaderPrefix, observeIl2cppMetadataHeaderPrefix } from "./il2cppMetadataHeaderPrefix-hijzXSMk.js";
import { init_managedCliHeaderPrefix, init_managedMetadataInventoryRows, init_managedMetadataLayout, readAssemblyReferenceName, readManagedCliHeaderPrefix, readManagedMetadataLayout } from "./managedMetadataInventoryRows-CkQns_7a.js";
import { basename, isAbsolute } from "node:path";
import { setImmediate } from "node:timers/promises";

//#region dist/domain/desktopApplicationEvidence.js
var createDesktopApplicationEvidence;
function init_desktopApplicationEvidence() {
	return (init_desktopApplicationEvidence = __esmMin((() => {
		init_evidence();
		createDesktopApplicationEvidence = (input, report, provider) => createEvidence({
			path: report.root.path,
			format: "directory",
			sha256: report.root.snapshot_sha256
		}, provider, {
			operation: "inspect_desktop_application",
			parameters: input,
			result: report,
			rawResult: null,
			confidence: "observed",
			limitations: report.limitations,
			locations: [{
				kind: "artifact-path",
				path: input.path
			}]
		});
	})))();
}

//#endregion
//#region dist/application/artifacts/DesktopApplicationService.js
var DesktopApplicationService;
function init_DesktopApplicationService() {
	return (init_DesktopApplicationService = __esmMin((() => {
		init_investigationProviders();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		init_analysisErrorCore();
		init_desktopApplicationEvidence();
		init_desktopApplication();
		init_result();
		DesktopApplicationService = class {
			reader;
			constructor(reader) {
				this.reader = reader;
			}
			close() {
				return this.reader.close();
			}
			async inspect(rawInput, options) {
				const operation = "inspect_desktop_application";
				const parsed = parseAnalysisInput(operation, rawInput, inspectDesktopApplicationInputSchema, options?.signal);
				if (!parsed.ok) return parsed;
				const result = await this.reader.inspect(parsed.value, options);
				if (!result.ok) return result;
				const report = desktopApplicationSchema.safeParse(result.value);
				if (!report.success || report.data.root.path !== parsed.value.path) return err(new AnalysisOutputError(operation, "Directory inspection changed the selected root or returned malformed facts."));
				return completeProviderEvidence(createDesktopApplicationEvidence(parsed.value, report.data, ARTIFACT_GRAPH_PROVIDER), options?.signal);
			}
		};
	})))();
}

//#endregion
//#region dist/domain/desktopApplicationProjection.js
var DESKTOP_PROBES_PER_FACT, projectDesktopApplication;
function init_desktopApplicationProjection() {
	return (init_desktopApplicationProjection = __esmMin((() => {
		init_il2cppMetadata();
		init_canonicalDigest();
		init_nativeConvention();
		DESKTOP_PROBES_PER_FACT = 2;
		projectDesktopApplication = (files) => {
			const candidates = [];
			const components = [];
			const probes = new Map();
			const has = (file, kind) => file.facts.some((fact) => fact.kind === kind);
			const candidate = (family, basis, rationale, confidence = "derived") => {
				if (basis.length === 0) return;
				const semantic = {
					family,
					basis_file_ids: [...new Set(basis.map((file) => file.file_id))].sort(),
					rationale,
					confidence
				};
				candidates.push({
					candidate_id: `dsc_${digestCanonicalValue(semantic, "Desktop runtime candidate")}`,
					...semantic
				});
			};
			const probe = (operation, file, rationale) => {
				const semantic = {
					operation,
					path: file.local_path,
					file_id: file.file_id,
					rationale,
					confidence: "inferred"
				};
				const probe_id = `dsp_${digestCanonicalValue(semantic, "Desktop next probe")}`;
				probes.set(probe_id, {
					probe_id,
					...semantic
				});
			};
			const managed = files.filter((file) => has(file, "pe-cli-directory"));
			candidate("dotnet", managed, "PE optional headers declare nonempty CLI directories; CLR execution and metadata validity remain unverified.");
			const mono = managed.filter((file) => has(file, "unity-assembly-reference"));
			const monoDirectories = new Set(mono.flatMap((file) => file.facts.flatMap((fact) => fact.kind === "unity-assembly-reference" ? [fact.value.managed_directory] : [])));
			for (const file of managed) {
				const conventions = desktopPathConventions(file.path);
				if (conventions.unityPredefinedAssembly && conventions.unityManagedDirectory !== null && monoDirectories.has(conventions.unityManagedDirectory)) probe("inspect_managed_members", file, "Inventory types, members and user strings of this Unity predefined script assembly; its references and contents are unverified. Start with detail \"summary\" and page rows through inspect_analysis_view.");
			}
			for (const file of managed) if (has(file, "unity-il2cpp-backup-convention")) probe("inspect_managed_members", file, "Inventory types, members and user strings of this predefined script assembly in a Unity IL2CPP backup folder; its correspondence to the shipped native code is unknown. Start with detail \"summary\" and page rows through inspect_analysis_view.");
			for (const file of managed) probe("inspect_managed_artifact", file, "Inspect the declared managed metadata and references.");
			candidate("unity-mono", mono, "Managed assemblies in a Unity Data/Managed layout reference UnityEngine assemblies.");
			const metadata = files.filter((file) => has(file, "il2cpp-metadata-header"));
			for (const file of metadata) if (file.facts.some((fact) => fact.kind === "il2cpp-metadata-header" && IL2CPP_METADATA_VERSIONS.some((version) => version === fact.value.raw_version))) probe("inspect_il2cpp_metadata", file, "Inventory this supported-version metadata candidate; complete validity and native binary correspondence remain unverified.");
			const il2cpp = files.filter((file) => has(file, "il2cpp-library-convention") && has(file, "native-image-header"));
			if (metadata.length > 0 && il2cpp.length > 0) {
				candidate("unity-il2cpp", [...metadata, ...il2cpp], "IL2CPP metadata magic and conventionally named native libraries coexist; metadata validity and build correspondence are unverified.", "inferred");
				for (const file of il2cpp) probe("open_binary", file, "Inspect this native IL2CPP candidate; metadata-to-address correspondence remains unknown.");
			}
			candidate("godot", files.filter((file) => has(file, "godot-pck-header")), "A standalone or trailer-located Godot pack header was observed; pack contents and encryption are unexamined.");
			for (const file of files.filter((file) => has(file, "unityfs-header"))) probe("open_binary", file, "A UnityFS AssetBundle header was observed; member contents and encryption are unexamined.");
			candidate("gamemaker", files.filter((file) => has(file, "gamemaker-form-header")), "A FORM container begins with a GEN8 chunk; its game resources remain unexamined.");
			candidate("unreal", files.filter((file) => has(file, "unreal-container-convention")), "Unreal Content/Paks paths or an IoStore TOC header suggest an Unreal package layout.", "inferred");
			const electron = files.filter((file) => has(file, "electron-asar-convention"));
			candidate("electron", electron, "An app.asar in a resources directory suggests an Electron application; archive validity and execution are unverified.", "inferred");
			for (const file of electron) {
				probe("open_binary", file, "Select this ASAR target with open_binary, then call inspect_artifact to inventory it before selecting JavaScript sources.");
				probe("analyze_javascript_application", file, "Analyze the candidate application archive with the static JavaScript workflow.");
			}
			const componentMarkers = [
				{
					expression: /(?:^|\/)bepinex(?:\/|$)/iu,
					name: "BepInEx",
					category: "mod-loader"
				},
				{
					expression: /(?:^|\/)melonloader(?:\/|$)/iu,
					name: "MelonLoader",
					category: "mod-loader"
				},
				{
					expression: /(?:^|\/)easyanticheat(?:_eos)?(?:\/|$)/iu,
					name: "Easy Anti-Cheat",
					category: "protection"
				},
				{
					expression: /(?:^|\/)battleye(?:\/|$)/iu,
					name: "BattlEye",
					category: "protection"
				}
			];
			for (const marker of componentMarkers) {
				const basis = files.filter((file) => marker.expression.test(file.path));
				if (basis.length === 0) continue;
				const semantic = {
					name: marker.name,
					category: marker.category,
					basis_file_ids: basis.map((file) => file.file_id),
					confidence: "inferred",
					runtime_presence: "unknown"
				};
				components.push({
					component_id: `dsm_${digestCanonicalValue(semantic, "Desktop component marker")}`,
					...semantic
				});
			}
			return {
				candidates,
				components,
				next_probes: [...probes.values()]
			};
		};
	})))();
}

//#endregion
//#region dist/artifacts/DesktopFileInspection.js
var retainedTextBytes, RETAINED_FACT_BYTES, RETAINED_RANGE_BYTES, RETAINED_PROBE_BYTES, retainedFactReferenceBytes, retainedFactsLimit, DesktopProbeLimit, inspectDesktopFile, inspectPeFile, inspectPckTrailer;
function init_DesktopFileInspection() {
	return (init_DesktopFileInspection = __esmMin((() => {
		init_dosMz();
		init_binaryContainer();
		init_peCoffHeader();
		init_godotPckFormat();
		init_GodotPckLocation();
		init_jsonValueByteLength();
		init_jsonStringByteLength();
		init_desktopApplicationProjection();
		init_il2cppMetadataHeaderPrefix();
		init_binaryTarget();
		init_managedMetadataLayout();
		init_managedCliHeaderPrefix();
		init_managedMetadataInventoryRows();
		init_managedReaderFailure();
		init_resources();
		init_machoContainer();
		init_unityfsFormat();
		init_sha256Hex();
		retainedTextBytes = (text) => Math.max(2 * text.length, jsonStringByteLength(text));
		RETAINED_FACT_BYTES = 512;
		RETAINED_RANGE_BYTES = 256;
		RETAINED_PROBE_BYTES = 512;
		retainedFactReferenceBytes = (localPath) => 2 * (RETAINED_PROBE_BYTES + retainedTextBytes(localPath));
		retainedFactsLimit = () => new ArtifactReaderFailure("limit", "Directory facts reached the retained metadata budget", { boundary: "memory" });
		DesktopProbeLimit = class extends ArtifactReaderFailure {
			constructor() {
				super("limit", "Directory probe byte budget exhausted", { boundary: "capacity" });
			}
		};
		inspectDesktopFile = async (file, row, budget, signal, unityManagedDirectory = null) => {
			const size = row.bytes;
			if (size === null) throw new ArtifactReaderFailure("limit", "File extent exceeds exact host offsets", { boundary: "file-size" });
			const read = async (offset, bytes) => {
				abortIfNeeded(signal);
				if (!Number.isSafeInteger(offset) || offset < 0 || !Number.isSafeInteger(bytes) || bytes < 0 || offset > size || bytes > size - offset) throw new ArtifactReaderFailure("format", "Declared byte range lies outside the file");
				if (bytes > budget.maximum - budget.bytes) throw new DesktopProbeLimit();
				if (RETAINED_RANGE_BYTES > budget.maximumRetainedBytes - budget.retainedBytes) throw retainedFactsLimit();
				budget.retainedBytes += RETAINED_RANGE_BYTES;
				const result = Buffer.alloc(bytes);
				let consumed = 0;
				while (consumed < bytes) {
					abortIfNeeded(signal);
					const part = await file.read(result, consumed, bytes - consumed, offset + consumed);
					budget.bytes += part.bytesRead;
					if (part.bytesRead === 0) throw new ArtifactReaderFailure("integrity", "File ended before its observed extent", { integrityCheck: "read-coverage" });
					consumed += part.bytesRead;
				}
				abortIfNeeded(signal);
				row.ranges.push({
					offset,
					bytes,
					sha256: sha256Hex(result)
				});
				return result;
			};
			const fact = (observation) => {
				const remaining = budget.maximumRetainedBytes - budget.retainedBytes;
				const fixed = 512 + retainedFactReferenceBytes(row.local_path);
				const reservation = fixed + jsonValueByteLength(observation.value, (remaining - fixed) / 12) * 12;
				if (reservation > remaining) throw retainedFactsLimit();
				budget.retainedBytes += reservation;
				row.facts.push(observation);
			};
			const prefix = await read(0, Math.min(size, 64));
			const metadataPrefix = observeIl2cppMetadataHeaderPrefix(prefix);
			if (metadataPrefix.kind === "il2cpp") fact({
				kind: "il2cpp-metadata-header",
				offset: 0,
				value: {
					magic: "0xfab11baf",
					raw_version: metadataPrefix.rawVersion
				}
			});
			if (prefix.length >= 20 && hasGodotPckHeader(prefix)) {
				const pckHeader = readGodotPckHeaderFacts(prefix);
				fact({
					kind: "godot-pck-header",
					offset: 0,
					value: {
						pack_version: pckHeader.formatVersion,
						engine_version: [
							pckHeader.engineMajor,
							pckHeader.engineMinor,
							pckHeader.enginePatch
						],
						placement: "standalone"
					}
				});
			}
			if (hasUnityFsHeader(prefix)) {
				let unityfsHeader = readUnityFsHeaderFacts(prefix);
				const headerPrefixBytes = Math.min(size, UNITYFS_HEADER_PREFIX_BYTES);
				if (unityfsHeader === undefined && prefix.length < headerPrefixBytes) unityfsHeader = readUnityFsHeaderFacts(Buffer.concat([prefix, await read(prefix.length, headerPrefixBytes - prefix.length)]));
				if (unityfsHeader !== undefined) fact({
					kind: "unityfs-header",
					offset: 0,
					value: {
						format_version: unityfsHeader.formatVersion,
						engine_version: unityfsHeader.engineVersion,
						flags: unityfsHeader.flags,
						declared_size: unityfsHeader.declaredSize <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(unityfsHeader.declaredSize) : null
					}
				});
			}
			if (prefix.length >= 16 && prefix.toString("latin1", 0, 4) === "FORM" && prefix.toString("latin1", 8, 12) === "GEN8") {
				const form = new BinaryReader(prefix, true, "gamemaker-form");
				const containerBytes = form.u32(4);
				const chunkBytes = form.u32(12);
				if (containerBytes >= 8 && containerBytes <= size - 8 && chunkBytes <= containerBytes - 8) fact({
					kind: "gamemaker-form-header",
					offset: 0,
					value: {
						container: "FORM",
						first_chunk: "GEN8"
					}
				});
			}
			if (prefix.length >= 16 && prefix.toString("latin1", 0, 16) === "-==--==--==--==-") fact({
				kind: "unreal-container-convention",
				offset: 0,
				value: { format: "IoStore TOC" }
			});
			const native = prefix.length >= 4 && (prefix.subarray(0, 4).equals(Buffer.from([
				127,
				69,
				76,
				70
			])) || hasMachoMagic(prefix));
			if (native) fact({
				kind: "native-image-header",
				offset: 0,
				value: {
					format: prefix[0] === 127 ? "elf" : "mach-o",
					signature: prefix.subarray(0, 4).toString("hex")
				}
			});
			const observe = async (operation) => {
				try {
					await operation();
				} catch (cause) {
					if (!(cause instanceof ArtifactReaderFailure) || cause.reason !== "format" && cause.reason !== "limit") throw cause;
					if (!row.issues.includes(cause.message)) row.issues.push(cause.message);
				}
			};
			const mz = hasDosMzMagic(prefix);
			if (prefix.length === 64 && mz) await observe(() => inspectPeFile(prefix, size, row, read, fact, unityManagedDirectory, signal));
			if ((native || mz) && size >= 12) await observe(() => inspectPckTrailer(size, read, fact));
		};
		inspectPeFile = async (prefix, size, row, read, fact, unityManagedDirectory, signal) => {
			const observed = observeMzWindowsHeader(prefix, size);
			if (observed.state === "candidate") {
				row.issues.push("MZ Windows new-header candidate is unresolved");
				return;
			}
			if (observed.state !== "signature-needed" && observed.state !== "declared") return;
			const peOffset = observed.offset;
			const coff = await read(peOffset, Math.min(24, size - peOffset));
			const confirmed = observeMzWindowsHeader(prefix, size, {
				offset: peOffset,
				bytes: coff
			});
			if (confirmed.state === "candidate") row.issues.push("MZ Windows new-header candidate is unresolved");
			if (confirmed.state !== "declared" || confirmed.signature !== "PE") return;
			const header = readPeCoffHeader(coff.subarray(4));
			if (!header.ok) {
				row.issues.push(header.error.message);
				return;
			}
			const optionalSize = header.value.optionalHeaderSize;
			if (optionalSize > 4096) throw new ArtifactReaderFailure("format", "PE optional header exceeds the supported format bound");
			const optional = await read(peOffset + 24, optionalSize);
			const parsed = parsePeRecordFacts(Buffer.concat([coff, optional]), undefined);
			if (!parsed.ok) {
				row.issues.push(parsed.error);
				return;
			}
			if (parsed.value.metadata.format !== "pe") return;
			fact({
				kind: "native-image-header",
				offset: peOffset,
				value: {
					format: "pe",
					machine: header.value.machine
				}
			});
			if (!parsed.value.metadata.managed) return;
			const cliDirectory = parsed.value.optionalHeader.dataDirectories[14];
			if (cliDirectory === undefined) return;
			const { address: cliRva, size: cliSize } = cliDirectory;
			fact({
				kind: "pe-cli-directory",
				offset: peOffset + 24 + cliDirectory.offset,
				value: {
					rva: cliRva,
					bytes: cliSize
				}
			});
			if (unityManagedDirectory === null) return;
			const sectionCount = header.value.sectionCount;
			const sections = await read(peOffset + 24 + optionalSize, sectionCount * 40);
			const mapped = (rva, bytes) => peRvaToFileOffset(rva, sections, sectionCount, parsed.value.optionalHeader.sizeOfHeaders, bytes);
			const cliOffset = mapped(cliRva, 16);
			if (cliOffset === undefined || cliSize < 72) throw new ArtifactReaderFailure("format", "CLI metadata directory cannot be mapped");
			const cli = readManagedCliHeaderPrefix(await read(cliOffset, 16));
			if (!cli.ok || cli.value.headerSize < 72) throw new ArtifactReaderFailure("format", "CLI header declares a truncated runtime header");
			const metadataBytes = cli.value.metadata.size;
			const metadataOffset = mapped(cli.value.metadata.rva, metadataBytes);
			if (metadataOffset === undefined) throw new ArtifactReaderFailure("format", "CLI metadata range cannot be mapped");
			const bytes = await read(metadataOffset, metadataBytes);
			try {
				const layout = readManagedMetadataLayout(bytes, 0, bytes.length);
				const refs = layout.table(35);
				for (let index = 1; index <= (refs?.rowCount ?? 0); index++) {
					if ((index - 1) % 256 === 0) {
						await setImmediate();
						abortIfNeeded(signal);
					}
					const reference = readAssemblyReferenceName(bytes, layout, index);
					if (reference.name !== "UnityEngine" && !reference.name.startsWith("UnityEngine.")) continue;
					fact({
						kind: "unity-assembly-reference",
						offset: metadataOffset + reference.row_offset,
						value: {
							name: reference.name,
							token: reference.token,
							managed_directory: unityManagedDirectory
						}
					});
					return;
				}
			} catch (cause) {
				if (!(cause instanceof ManagedReaderFailure)) throw cause;
				throw new ArtifactReaderFailure(cause.issue.code === "resource-limit" ? "limit" : "format", cause.message, {
					cause,
					...cause.issue.code === "resource-limit" ? { boundary: "memory" } : {}
				});
			}
		};
		inspectPckTrailer = async (size, read, fact) => {
			const observation = await observeEmbeddedGodotPck(size, 20, read);
			if (observation.state === "invalid-extent") throw new ArtifactReaderFailure("format", "Embedded PCK trailer declares an invalid pack extent");
			if (observation.state === "header-mismatch") throw new ArtifactReaderFailure("format", "Embedded PCK trailer does not locate a pack header");
			if (observation.state === "located") {
				const offset = observation.start;
				const header = readGodotPckHeaderFacts(observation.header);
				fact({
					kind: "godot-pck-header",
					offset,
					value: {
						pack_version: header.formatVersion,
						engine_version: [
							header.engineMajor,
							header.engineMinor,
							header.enginePatch
						],
						placement: "embedded-trailer"
					}
				});
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/DesktopApplicationReader.js
var RETAINED_METADATA_BYTES, RETAINED_ROW_BYTES, RETAINED_OMISSION_BYTES, RETAINED_ISSUE_BYTES, DesktopRepresentationLimit, DesktopApplicationReader, selectedRootFailure, scanDirectory, fileRow, pathConventions, probeSelected;
function init_DesktopApplicationReader() {
	return (init_DesktopApplicationReader = __esmMin((() => {
		init_nativeConvention();
		init_resources();
		init_ArtifactTraversalObservation();
		init_DesktopFileInspection();
		init_desktopApplicationProjection();
		init_canonicalDigest();
		init_result();
		init_desktopApplicationEvidence();
		init_investigationProviders();
		init_analysisErrorCore();
		init_configurationErrors();
		RETAINED_METADATA_BYTES = 32 * 1024 * 1024;
		RETAINED_ROW_BYTES = 1024;
		RETAINED_OMISSION_BYTES = 512;
		RETAINED_ISSUE_BYTES = 64;
		DesktopRepresentationLimit = class extends ArtifactReaderFailure {
			constructor() {
				super("limit", "Directory metadata reached the 32 MiB representation budget; remaining entry and omission facts are unavailable.", { boundary: "memory" });
			}
		};
		DesktopApplicationReader = class {
			directoryReaderFor;
			#resources = new ArtifactResourceScope();
			#running = false;
			constructor(directoryReaderFor = (path) => new DirectoryArtifactReader(path)) {
				this.directoryReaderFor = directoryReaderFor;
			}
			async inspect(input, options) {
				if (this.#running) return err(new AnalysisResourceConstraintError("inspect_desktop_application", "capacity", "This artifact reader already owns a directory inspection", { max_concurrent_inspections: 1 }, {
					retryable: true,
					remediationAction: "Wait for this directory inspection to finish before submitting another."
				}));
				this.#running = true;
				try {
					return ok(await this.#resources.run(() => this.#inspect(input, options?.signal)));
				} catch (cause) {
					const error = translateArtifactFailure("inspect_desktop_application", cause);
					return err(error);
				} finally {
					this.#running = false;
				}
			}
			close() {
				return this.#resources.close();
			}
			async #inspect(input, signal) {
				if (!isAbsolute(input.path)) throw new ArtifactReaderFailure("path", "Expected an absolute directory path");
				const reader = this.directoryReaderFor(input.path);
				const owner = {
					kind: "reader",
					resource: input.path,
					reader
				};
				let outcome;
				let report;
				try {
					const scanned = await scanDirectory(reader, input, signal);
					report = scanned.report;
					outcome = scanned.failure === undefined ? {
						kind: "completed",
						value: report
					} : {
						kind: "failed",
						cause: scanned.failure.cause
					};
				} catch (cause) {
					outcome = {
						kind: "failed",
						cause
					};
				}
				const closed = await this.#resources.release(owner);
				const partial = report === undefined || closed.kind !== "failed" && outcome.kind !== "failed" && signal?.aborted !== true ? undefined : createDesktopApplicationEvidence(input, report, ARTIFACT_GRAPH_PROVIDER);
				if (closed.kind === "failed") throw this.#resources.cleanupFailure(outcome, [closed], partial);
				if (outcome.kind === "failed") {
					const cause = outcome.cause;
					if (cause instanceof DirectoryArtifactRootFailure) throw selectedRootFailure(input.path, cause, partial);
					if (!(cause instanceof ArtifactReaderFailure) || partial === undefined) throw cause;
					throw new ArtifactReaderFailure(cause.reason, cause.message, {
						cause,
						cancellation: cause.cancellation,
						cleanup: cause.cleanup,
						cleanupLeases: cause.cleanupLeases,
						partialObservation: partial,
						...cause.primaryFacts()
					}, cause.details);
				}
				if (signal?.aborted) throw new ArtifactReaderFailure("cancelled", "Directory inspection cancelled during final cleanup", {
					cause: signal.reason,
					partialObservation: partial
				});
				return outcome.value;
			}
		};
		selectedRootFailure = (path, failure, partialObservation) => failure.reason === "path" ? new AnalysisUnsupportedTargetError("inspect_desktop_application", path, failure.message, {
			cause: failure,
			partialObservation,
			remediationAction: "Select the application's local installation directory, such as a macOS .app bundle or the directory containing its executable."
		}) : new BinaryTargetError(path, failure.message, {
			cause: failure.cause,
			partialObservation
		});
		scanDirectory = async (reader, input, signal) => {
			const admittedRoot = await reader.rootObservation();
			const root = {
				canonical_path: admittedRoot.canonicalPath,
				identity: {
					device: admittedRoot.identity.dev.toString(),
					inode: admittedRoot.identity.ino.toString()
				}
			};
			const namespaceId = `dsr_${digestCanonicalValue(root, "Admitted desktop directory namespace")}`;
			const files = [];
			const omissions = [];
			const unityWitnessRoots = new Set();
			const rootName = basename(root.canonical_path);
			const budget = {
				bytes: 0,
				maximum: input.max_probe_bytes,
				retainedBytes: RETAINED_ROW_BYTES + retainedTextBytes(input.path) + retainedTextBytes(root.canonical_path),
				maximumRetainedBytes: RETAINED_METADATA_BYTES
			};
			const fits = (bytes) => {
				if (bytes > budget.maximumRetainedBytes - budget.retainedBytes) return false;
				budget.retainedBytes += bytes;
				return true;
			};
			const reserve = (bytes) => {
				if (!fits(bytes)) throw new DesktopRepresentationLimit();
			};
			let entries = 0;
			let probed = 0;
			let symlinks = 0;
			let special = 0;
			let partial = false;
			let failure;
			const limitations = [
				"Runtime candidates and component markers do not establish loaded code, execution, or build correspondence.",
				"The directory SHA-256 commits only to retained paths, omission kinds, available filesystem metadata and read-range digests, not to every file's contents. Unread bytes are unknown.",
				"Special-entry payloads are not read. Their paths and kinds are retained; other special-entry metadata is unavailable in this report.",
				"Child symlinks are not followed. Executable section-embedded PCKs without a trailer and encrypted contents remain unexamined.",
				"This is a sequence of stable entry observations, not an atomic snapshot of the entire directory.",
				"Unity reference decoding stops after a witness in each Data/Managed directory; other assemblies' references are unexamined. Header facts remain per-file."
			];
			try {
				for await (const entry of declaredArtifactEntries(reader, signal, {
					maximumEntries: input.max_entries,
					onOmission: (omission) => {
						if (omission.kind !== "directory-descendants") {
							special++;
							entries++;
						}
						partial = true;
						reserve(RETAINED_OMISSION_BYTES + retainedTextBytes(omission.path));
						const semantic = {
							root_namespace_id: namespaceId,
							path: omission.path,
							kind: omission.kind
						};
						omissions.push({
							omission_id: `dso_${digestCanonicalValue(semantic, "Desktop traversal omission")}`,
							path: omission.path,
							kind: omission.kind
						});
					},
					onCoverage: (coverage) => {
						if (coverage.examinedEntries !== undefined) entries = coverage.examinedEntries;
						if (coverage.status !== "complete") partial = true;
						limitations.push(...coverage.limitations);
					}
				})) {
					entries++;
					abortIfNeeded(signal);
					const conventions = entry.kind === "file" ? pathConventions(entry.path, rootName) : undefined;
					reserve(RETAINED_ROW_BYTES + retainedTextBytes(entry.path) + retainedTextBytes(entry.adapterKey) + (conventions?.facts.length ?? 0) * (512 + retainedTextBytes(entry.path) + retainedFactReferenceBytes(entry.adapterKey)));
					const row = fileRow(entry, namespaceId);
					files.push(row);
					if (entry.kind === "symlink") {
						symlinks++;
						continue;
					}
					if (conventions === undefined) continue;
					row.facts.push(...conventions.facts);
					const managedRoot = conventions.unityManagedDirectory;
					if (!probeSelected(entry)) continue;
					if (budget.bytes >= budget.maximum) {
						row.read_status = "unavailable";
						row.issues.push("Probe byte budget exhausted; bytes were not inspected.");
						partial = true;
						continue;
					}
					probed++;
					try {
						await reader.inspectFile(entry, (file) => inspectDesktopFile(file, row, budget, signal, managedRoot !== null && !unityWitnessRoots.has(managedRoot) ? managedRoot : null), signal);
						row.read_status = row.issues.length === 0 ? "examined" : "partial";
						if (managedRoot !== null && row.facts.some((fact) => fact.kind === "unity-assembly-reference")) unityWitnessRoots.add(managedRoot);
						if (row.issues.length > 0) partial = true;
					} catch (cause) {
						if (!(cause instanceof ArtifactReaderFailure)) throw cause;
						const probeIssueCount = row.issues.length;
						row.read_status = "unavailable";
						const issueRetained = fits(RETAINED_ISSUE_BYTES + retainedTextBytes(cause.message));
						if (issueRetained) row.issues.push(cause.message);
						partial = true;
						const completedRead = artifactFileCompletion(cause) !== undefined;
						if (completedRead) row.read_status = probeIssueCount === 0 ? "examined" : "partial";
						if (!completedRead && (cause.reason === "integrity" || cause.reason === "io" || cause.reason === "cancelled")) {
							row.facts = row.facts.filter((fact) => fact.offset === null);
							row.ranges = [];
						}
						if (cause.cleanup !== undefined || cause.reason === "cancelled") throw cause;
						if (!issueRetained) throw new DesktopRepresentationLimit();
					}
				}
			} catch (cause) {
				partial = true;
				if (cause instanceof DirectoryArtifactTraversalLimit) {
					entries = cause.examinedEntries;
					limitations.push("Directory traversal reached max_entries; unvisited paths and candidate families remain unknown.");
				} else if (cause instanceof DesktopRepresentationLimit) {
					limitations.push(cause.message);
				} else {
					failure = { cause };
					limitations.push("Inspection was interrupted; only preceding stable entry observations are retained.");
				}
			}
			files.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
			omissions.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : a.kind < b.kind ? -1 : a.kind > b.kind ? 1 : 0);
			const coverage = {
				status: partial ? "partial" : "complete-within-scan",
				entries_examined: entries,
				files_probed: probed,
				bytes_read: budget.bytes,
				symlinks_not_followed: symlinks,
				special_entries_omitted: special,
				limits: {
					max_entries: input.max_entries,
					max_probe_bytes: input.max_probe_bytes
				}
			};
			const snapshot = digestCanonicalValue({
				root_namespace_id: namespaceId,
				files: files.map(({ file_id, bytes, ranges }) => ({
					file_id,
					bytes,
					ranges
				})),
				omissions: omissions.map(({ omission_id }) => omission_id)
			}, "Examined desktop directory facts");
			const report = {
				root: {
					path: input.path,
					...root,
					namespace_id: namespaceId,
					snapshot_sha256: snapshot,
					identity_scope: "examined-metadata-and-read-ranges"
				},
				files,
				omissions,
				...projectDesktopApplication(files),
				coverage,
				limitations
			};
			return {
				report,
				...failure === undefined ? {} : { failure }
			};
		};
		fileRow = (entry, rootNamespaceId) => {
			const source = entry.sourceIdentity;
			const identity = source === undefined ? null : {
				device: source.device.toString(),
				inode: source.inode.toString(),
				size: source.size.toString(),
				mode: source.mode.toString(),
				mtime_ns: source.mtimeNs.toString(),
				ctime_ns: source.ctimeNs.toString()
			};
			const semantic = {
				root_namespace_id: rootNamespaceId,
				path: entry.path,
				kind: entry.kind,
				identity
			};
			return {
				file_id: `dsf_${digestCanonicalValue(semantic, "Desktop directory entry")}`,
				path: entry.path,
				local_path: entry.adapterKey,
				kind: entry.kind,
				bytes: entry.declaredSize,
				identity,
				read_status: "not-selected",
				ranges: [],
				facts: [],
				issues: []
			};
		};
		pathConventions = (path, rootName) => {
			const conventions = desktopPathConventions(path, rootName);
			const facts = [];
			if (conventions.unityIl2cppBackupAssembly && conventions.unityIl2cppBackupDirectory !== null) facts.push({
				kind: "unity-il2cpp-backup-convention",
				offset: null,
				value: { backup_directory: conventions.unityIl2cppBackupDirectory }
			});
			if (conventions.electronArchive) facts.push({
				kind: "electron-asar-convention",
				offset: null,
				value: path
			});
			if (conventions.unrealContainer) facts.push({
				kind: "unreal-container-convention",
				offset: null,
				value: path
			});
			if (conventions.il2cppLibrary) facts.push({
				kind: "il2cpp-library-convention",
				offset: null,
				value: path
			});
			return {
				facts,
				unityManagedDirectory: conventions.unityManagedDirectory
			};
		};
		probeSelected = (entry) => entry.executable || /(?:\.(?:exe|dll|so|dylib|pck|utoc|bundle|ab|unity3d)|(?:^|\/)(?:global-metadata\.dat|data\.win|game\.(?:unx|ios)))$/iu.test(entry.path);
	})))();
}

//#endregion
//#region dist/composition/desktop.js
var createDesktopApplicationService;
function init_desktop() {
	return (init_desktop = __esmMin((() => {
		init_DesktopApplicationService();
		init_DesktopApplicationReader();
		createDesktopApplicationService = () => new DesktopApplicationService(new DesktopApplicationReader());
	})))();
}

//#endregion
export { createDesktopApplicationService, init_desktop };