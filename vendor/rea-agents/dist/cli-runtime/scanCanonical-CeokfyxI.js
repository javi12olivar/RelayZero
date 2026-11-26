import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ConfigurationError, ParseFailureError, artifactContainerIntegrityDetails, artifactIntegrityDetails, artifactIntegrityPair, decodeLimit, errorMessage, hostRangeErrorKind, init_artifactIntegrity, init_configurationErrors, init_errorMessage, init_jsonValue, init_localPath, init_parseFailure, init_sha256Hex, jsonValueSchema, localPathStringSchema, malformedInput, sha256Hex, truncatedInput, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { DEFAULT_ASAR_LISTING_ADMISSION, HOST_PLATFORM, ZstandardFrameAllowanceError, decodeStrictUtf8, init_HostPlatform, init_asarListingAdmission, init_internalInvariant, init_parseFailureAnalysisError, init_strictUtf8, init_zstandardFrameAllowance, invariantViolation, isParseLimit, isStrictUtf8, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryFormatFailure, BinaryReader, BinaryResourceFailure, appendCallerPath, compareUnicodeCodePoints, declaredFileRange, init_binaryContainer, init_callerPath, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ArtifactEntryContentUnavailable, ArtifactFileSource, ArtifactPathRegistry, ArtifactReaderFailure, ArtifactResourceScope, DirectoryArtifactEntryAccessDenied, DirectoryArtifactReader, DirectoryArtifactTraversalLimit, NonRegularFileReadError, OwnedFileHandle, RegularFileAdmissionFailure, RegularFileChangedError, RegularFileOperationCancelled, RoundedAsarSize, ZipArtifactReader, abortIfNeeded, admitAsarHeader, annotateEnglishUnicodeCaseCollisions, artifactExpansionBudgetBytes, artifactFileAdmissionFailure, artifactFixedLimitFailure, artifactOperationCause, artifactParseFailure, artifactReadCancelledBy, artifactReaderLimitFailure, asarDeclaredSizeSchema, asarHeaderAdmissionFailure, asarNodeSchema, assertArtifactReadActive, assertArtifactSelectedSource, assertProducedEntry, assertStableRegularFileIdentity, copyArtifactEntry, createAsarHeaderSignatureProbe, digestReadableToCompletion, hasDestinationPath, hashStableRootArtifact, hashStableRootArtifactHandle, hostExecutableMarking, init_ArtifactFileAdmission, init_ArtifactFileOperation, init_ArtifactFileSource, init_ArtifactPaths, init_ArtifactReader, init_ArtifactReaderLimits, init_ArtifactResourceScope, init_ArtifactSelectedSource, init_AsarHeader, init_ChangeTimeBaseline, init_DirectoryArtifactReader, init_OwnedFileHandle, init_OwnedRegularFile, init_RegularFile, init_StableRootArtifact, init_StreamBytes, init_StreamDigest, init_ZipArtifactReader, init_artifactExpansionBudget, init_asarNode, init_hostExecutableMarking, init_readArtifactFileChunks, init_readFileHandleChunks, init_readFileHandleRange, init_resources, normalizeArtifactPath, openRegularFile, openRootArtifact, readArtifactFileChunks, readAsarHeader, readFileHandleChunks, readFileHandleRange, regularFileCancellation, regularFileState, releaseRootArtifact, sameArtifactEntry, sameRegularFileState, settleChangeTimeBaseline, streamChunkToBuffer, yieldArtifactRead } from "./resources-B3P64jvH.js";
import { DEFAULT_BUN_READER_LIMITS, DEFAULT_DOTNET_BUNDLE_READER_LIMITS, DEFAULT_GODOT_READER_LIMITS, DEFAULT_NODE_SEA_READER_LIMITS, artifactContradictionId, artifactEdgeId, artifactGraphDigest, artifactIdForNode, artifactManifestId, digestCanonicalValue, init_artifactIdentity, init_artifactReaderLimits, init_canonicalDigest, init_excerpt, init_jsonDuplicateMember, logicalPathNfc, occurrenceIdForLocation, parseJsonWithDuplicatePolicy, quotedExcerpt, resolveArtifactReaderLimits } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PE_COFF_FRAME_BYTES, init_dosMz, init_peCoffHeader, observeMzWindowsHeader, observePeCoffFrame, parseMzHeaderEvidence } from "./peOptionalHeader-DrZ2zQO-.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { init_launchFailure, launcherFailureOf } from "./ExecFileOutput-YDVPmL3I.js";
import { ZIP_NON_ENTRY_LIMITATION, ZIP_PACKAGE_FORMATS, hasTrailingZipArchive, hasZipSignature, init_zipPackageFormat, isZipPackageFormat, zipPackageFormatForPath, zipRootPackageFormat } from "./canonicalOrdering-C7Yzy62j.js";
import { ESP_PARTITION_TABLE_SECTOR_BYTES, createMftDecoder, espBootPartitions, espPartitionSubtypeName, espPartitionTypeName, espPrimaryLayoutRole, init_espPartitionTable, init_inesContainer, init_ntfsMft, isEspAppPartition, nesContainerFormat, parseInesLayout } from "./espFlashSelection-DrhknbQ_.js";
import { init_artifactFormatMetadata, ntfsMftMetadataSchema } from "./artifactFormatMetadata-CgSGovld.js";
import { ARTIFACT_FORMAT_IDS, artifactInventoryResultSchema, init_artifactGraph } from "./artifactGraph-D-c8dgaG.js";
import { init_javascriptArtifactFiles, isJavaScriptSourcePath } from "./javascriptArtifactFiles-DG1s4eez.js";
import { ESP_SIGNATURE_BLOCK_BYTES, firstUnerased, hex as hex$1, init_espImageStructures, offsetText, u32 as u32$1 } from "./espImageStructures-Dt191T9V.js";
import { init_jsonValueByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { MAX_DEVICETREE_FILE_BYTES, init_devicetree, init_elfNotes } from "./elfNotes-CjzNcaIN.js";
import { init_machoCpuIdentity, machoArchitectureFamily, machoKnownArm32Subtype } from "./machoCpuIdentity-B0Mlm3Ly.js";
import { MAX_XML_PLIST_PROBE_BYTES, createXmlPlistSignatureProbe, hasBinaryPlistSignature, hasXmlPlistSignature, init_appleArchiveFormat } from "./appleArchiveFormat-B-JoSBSY.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { OwnedCommandFailure, init_OwnedCommand, prepareOwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { init_OwnedCommandCleanup, retainOwnedCommandCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { LC, MachoLoadCommandCursor, classifyFatContainerEvidence, init_machoContainer, init_machoLoadCommandCodes, init_machoLoadCommands, readFatContainerHeader, readFatContainerTable, readFatHeaderPrefix, readMachoHeaderPrefixFacts, readMachoLoadCommandTableHeader, validateFatSliceIdentity } from "./machoLoadCommands-DCQgk7s-.js";
import { init_peSectionHeader, peSectionTableExtent, readPeSectionHeader } from "./peSectionHeader-CdESy7pO.js";
import { init_keyedCollection, keyedBy, uniqueKeyed } from "./keyedCollection-BoRfT2aE.js";
import { init_elfFixedHeader, readElfFixedHeader, readElfHeaderFacts } from "./elfFixedHeader-D38fsdBg.js";
import { elfProgramHeaderWidth, init_elfProgramHeader, init_elfRawTableDeclarations, readElfProgramHeader, readElfRawTableDeclarations } from "./elfRawTableDeclarations-Cgbp6HKT.js";
import { elfNoteAlignment, elfNoteSectionStorage, init_elfNoteLayout, isElfNotePadding, readElfNoteFrame } from "./elfNoteLayout-MbAzXIGv.js";
import { init_elfStringTable, observeElfStringTableEntry } from "./elfStringTable-tJEHn-H2.js";
import { elfSectionHeaderWidth, init_elfDeclaredRanges, init_elfSectionHeader, readElfSectionHeader, validateElfSectionTableFields } from "./elfDeclaredRanges-BSLGQklL.js";
import { admitMachoSegmentCommand, init_machoSectionHeader, init_machoSegmentHeader, machoSectionBacking, machoSectionHeaderSize, machoSegmentSectionTableFits, readMachoSectionHeader, readMachoSegmentHeader } from "./machoSegmentHeader-Bvz3C4rO.js";
import { MAX_PE_OPTIONAL_HEADER_BYTES, claimsExecutableHeader, init_binaryTarget, parsePeRecordStructure, readNativeHeaderFormat } from "./binaryTarget-BWcJ62i0.js";
import { frameLoadCommands, init_machoLoadCommandReader, readMachoContainer, readMachoImage, readSliceCommandTable } from "./machoLoadCommandReader-BBTljx6_.js";
import { MAX_INSPECT_PE_DIRECTORY_ENTRIES, MAX_INSPECT_PE_FILE_BYTES, init_peResources } from "./peResources-86rkzSE-.js";
import { DEVICETREE_FORMAT, hasPeResourceName, init_devicetreeParser, init_peResourceInventory, init_peResourceLayout, locatePeResourcePayloads, parseDevicetree, parsePeResources, peResourceLimitBoundary, readPeResourceLayout } from "./devicetreeParser-BcA5ebNv.js";
import { init_devicetreeHeader, readDevicetreeHeader } from "./devicetreeHeader-qDz5cYn9.js";
import { ArtifactTraversalObservation, declaredArtifactEntries, init_ArtifactFileRange, init_ArtifactTraversalObservation, init_GodotPckLocation, locateGodotPck, readArtifactFileBytes } from "./GodotPckLocation-RL8LCx06.js";
import { UNITYFS_HEADER_PREFIX_BYTES, godotPckDataStartsAfterHeader, godotPckHeaderEnd, hasUnityFsHeader, init_godotPckFormat, init_unityfsFormat, readGodotPckHeaderFacts, readUnityFsHeaderFacts, unityFsLayoutFlags } from "./unityfsFormat-D0CcnmXe.js";
import { imageRegion, init_FfsFile, init_FirmwareVolume, init_UefiBytes, inspectFirmwareVolumeExtension, readFfsHeader, scanFirmwareVolumes, unsupportedVolumeBodyReason } from "./FirmwareVolume-C6tnpN0n.js";
import { UEFI_FIRMWARE_LIMITS, init_uefiLimits } from "./uefiLimits-B1Km845N.js";
import { ANDROID_BOOT_MAGIC, ANDROID_OTA_PAYLOAD_LIMITATIONS, ESP8266_REFUSAL, ESP_CHIP_TABLE_SOURCE, ESP_IMAGE_LIMITATIONS, HEX_RECORD_ENCODING_LABELS, UIMAGE_MULTI_TABLE_WINDOW, VENDOR_BOOT_MAGIC, admitWxapkgMemberExtents, androidOtaDistinctOperationDataBytes, androidOtaExtractRefusalError, androidOtaExtractRefusalLimitation, artifactNameForClassification, createDfuSeDecoder, createEspImageDecoder, createHexRecordDecoder, createUf2Decoder, espChipForId, espFlashDumpOrigin, hasDfuSePrefix, hasDiskImageSignature, hasUImageSizeTable, hasWxapkgEncryptedMagic, init_UefiFormatProbe, init_androidBootImageFormat, init_androidOtaPayload, init_artifactFormatRecognition, init_artifactNameSelection, init_dfuse, init_diskImageFormat, init_espChips, init_espFlashLocation, init_espImage, init_espImageFacts, init_hexRecords, init_uf2, init_uimageFormat, init_wxapkgFormat, locateEspFlashLayout, parseAndroidOtaHeader, parseAndroidOtaPayload, parseMultiImageTable, parseUImageHeaderFields, probeUefiFlashImage, readWxapkgHeaderFacts, recognizeArtifactFormat, recognizeEspImage, reconstructAndroidOtaPartitionCooperative, resolveWxapkgIndexLayouts, withAndroidOtaPayloadSignature } from "./diskImageFormat-BtaIuHzH.js";
import { LipoFieldRetentionError, XcrunCommandRunner, init_NativeCommandRunner, init_lipo, lipoDescribesCpu, parseLipoOutputResult } from "./lipo-CVK9D4qP.js";
import { MarshalDefectError, MarshalReader, init_marshalReader, init_pythonBytecodeIdentity, observePythonBytecodePrefix } from "./marshalReader-Df4KzAdd.js";
import { decodeLz4Block, init_Lz4Block } from "./Lz4Block-CsrHKTRN.js";
import { constants, createWriteStream } from "node:fs";
import { basename, isAbsolute, join, relative, resolve, sep } from "node:path";
import { z } from "zod";
import { Readable, Transform, pipeline } from "node:stream";
import { constants as constants$1 } from "node:buffer";
import { createHash, randomUUID } from "node:crypto";
import { lstat, mkdtemp, open, realpath, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { setImmediate } from "node:timers/promises";
import { crc32, createInflate, createInflateRaw } from "node:zlib";
import { finished as finished$1, pipeline as pipeline$1 } from "node:stream/promises";
import { parse } from "plist";

//#region dist/artifacts/bun/BunModuleGraphLayout.js
var BUN_TRAILER, BUN_TRAILER_BYTES, BUN_OFFSETS_BYTES, BUN_GRAPH_SUFFIX_BYTES, BUN_LENGTH_PREFIX_BYTES, BUN_RECORD_BYTES_1_3_3, BUN_RECORD_BYTES_1_3_9, MAX_PE_SECTIONS, BUN_LAYOUT_REVISIONS, BUN_CARRIERS, probeBunStandaloneGraph, loadBunStandaloneGraph, METADATA_CACHE_BYTES, METADATA_CACHE_ENTRIES, BunGraphRangeReader, bunPayloadBytesLimit, bunMetadataBytesLimit, bunModuleCountLimit, bunFormatFailure, presentFailure, evaluateSection, evaluateAppendedTrailer, graphPayloadLength, readBunSuffix, readPointer, machOClaims, segmentClaims, fatClaims, peClaims, ELF_BUN_NAME, ELF_SHT_NULL, ELF_SHT_STRTAB, ELF_SHT_NOBITS, MAX_SAFE_FILE_WORD, elfClaims, windowFor, exactName, tryRead, readExact;
function init_BunModuleGraphLayout() {
	return (init_BunModuleGraphLayout = __esmMin((() => {
		init_machoLoadCommandCodes();
		init_budget();
		init_binaryContainer();
		init_result();
		init_dosMz();
		init_peCoffHeader();
		init_peSectionHeader();
		init_elfFixedHeader();
		init_elfRawTableDeclarations();
		init_elfSectionHeader();
		init_elfStringTable();
		init_machoContainer();
		init_machoLoadCommands();
		init_machoSectionHeader();
		init_machoSegmentHeader();
		init_artifactReaderLimits();
		init_resources();
		BUN_TRAILER = Buffer.from("\n---- Bun! ----\n");
		BUN_TRAILER_BYTES = BUN_TRAILER.length;
		BUN_OFFSETS_BYTES = 32;
		BUN_GRAPH_SUFFIX_BYTES = BUN_OFFSETS_BYTES + BUN_TRAILER_BYTES;
		BUN_LENGTH_PREFIX_BYTES = 8;
		BUN_RECORD_BYTES_1_3_3 = 36;
		BUN_RECORD_BYTES_1_3_9 = 52;
		MAX_PE_SECTIONS = 96;
		BUN_LAYOUT_REVISIONS = ["bun-1.3.3", "bun-1.3.9"];
		BUN_CARRIERS = [
			"mach-o-section",
			"pe-section",
			"elf-section",
			"appended-trailer"
		];
		probeBunStandaloneGraph = async (handle, fileSize, signal, limits = DEFAULT_BUN_READER_LIMITS) => {
			abortIfNeeded(signal);
			const source = {
				handle,
				fileSize,
				signal,
				limits
			};
			let claims;
			try {
				claims = [
					...await machOClaims(source, 0, fileSize),
					...await peClaims(source),
					...await elfClaims(source)
				];
			} catch (cause) {
				if (!(cause instanceof ArtifactReaderFailure) || cause.reason !== "limit") throw cause;
				return {
					status: "limited",
					failure: cause
				};
			}
			const real = [];
			const rejectedSlices = [];
			let fatIdentityFailure;
			for (const claim of claims) {
				abortIfNeeded(signal);
				if ("rejectedSlice" in claim) {
					rejectedSlices.push(claim.rejectedSlice);
					fatIdentityFailure ??= claim.namedFailure;
					continue;
				}
				const evaluated = "failure" in claim ? presentFailure(claim.failure) : await evaluateSection(source, claim);
				if (evaluated.status === "present") {
					if (real.length > 0) return presentFailure(new ArtifactReaderFailure("unavailable", "Bun standalone module graph layout is unsupported: multiple embedded graphs were located"));
					real.push(evaluated);
				}
			}
			const only = real[0];
			if (only !== undefined) return only;
			const appended = await evaluateAppendedTrailer(source, rejectedSlices);
			return appended.status === "absent" && fatIdentityFailure !== undefined ? presentFailure(fatIdentityFailure) : appended;
		};
		loadBunStandaloneGraph = async (handle, claim, signal, limits = DEFAULT_BUN_READER_LIMITS) => {
			if (claim.payloadLength > limits.payload_bytes) return {
				status: "present",
				failure: bunPayloadBytesLimit(claim.payloadLength, limits)
			};
			const suffix = await readExact(handle, claim.payloadOffset + claim.payloadLength - BUN_GRAPH_SUFFIX_BYTES, BUN_GRAPH_SUFFIX_BYTES, signal);
			const parsed = readBunSuffix(suffix, claim.payloadLength);
			if (!parsed.ok) return {
				status: "present",
				failure: parsed.error
			};
			const offsets = parsed.value;
			return {
				status: "present",
				graph: {
					...claim,
					data: new BunGraphRangeReader(handle, claim.payloadOffset, claim.payloadLength - BUN_GRAPH_SUFFIX_BYTES, signal, limits.metadata_read_bytes),
					modules: readPointer(offsets, 8),
					entryPointId: offsets.u32(16),
					compileExecArgv: readPointer(offsets, 20),
					flags: offsets.u32(28)
				}
			};
		};
		METADATA_CACHE_BYTES = 256 * 1024;
		METADATA_CACHE_ENTRIES = 1024;
		BunGraphRangeReader = class {
			handle;
			start;
			length;
			signal;
			#ranges = new Map();
			#retained = new Budget(METADATA_CACHE_BYTES);
			#read;
			constructor(handle, start, length, signal, maximumReadBytes) {
				this.handle = handle;
				this.start = start;
				this.length = length;
				this.signal = signal;
				this.#read = new Budget(maximumReadBytes);
			}
			/** Drop the least recently used range and return its retained size. */
			#evictOldest = () => {
				const oldest = this.#ranges.keys().next();
				if (oldest.done === true) return undefined;
				const bytes = this.#ranges.get(oldest.value)?.length ?? 0;
				this.#ranges.delete(oldest.value);
				return bytes;
			};
			async read(offset, length) {
				abortIfNeeded(this.signal);
				if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || offset < 0 || length < 0 || offset > this.length || length > this.length - offset) throw bunFormatFailure("metadata range exceeds the Bun module graph");
				if (length === 0) return Buffer.alloc(0);
				const key = `${String(offset)}:${String(length)}`;
				const existing = this.#ranges.get(key);
				if (existing !== undefined) {
					this.#ranges.delete(key);
					this.#ranges.set(key, existing);
					return Buffer.from(existing);
				}
				this.#read.charge(length, () => artifactReaderLimitFailure("artifact_limits.bun.metadata_read_bytes", this.#read.maximum, "bytes", this.#read.used + length));
				const bytes = await readExact(this.handle, this.start + offset, length, this.signal);
				if (length > METADATA_CACHE_BYTES) return bytes;
				while (this.#ranges.size >= METADATA_CACHE_ENTRIES) this.#retained.refund(this.#evictOldest() ?? 0);
				if (!this.#retained.chargeEvicting(length, this.#evictOldest)) return bytes;
				this.#ranges.set(key, bytes);
				return Buffer.from(bytes);
			}
		};
		bunPayloadBytesLimit = (claimed, limits = DEFAULT_BUN_READER_LIMITS) => artifactReaderLimitFailure("artifact_limits.bun.payload_bytes", limits.payload_bytes, "bytes", claimed, "file-size");
		bunMetadataBytesLimit = (claimed, limits = DEFAULT_BUN_READER_LIMITS) => artifactReaderLimitFailure("artifact_limits.bun.representation_bytes", limits.representation_bytes, "bytes", claimed, "memory");
		bunModuleCountLimit = (count, limits = DEFAULT_BUN_READER_LIMITS) => artifactReaderLimitFailure("artifact_limits.bun.module_count", limits.module_count, "count", count);
		bunFormatFailure = (detail) => new ArtifactReaderFailure("format", `Bun standalone module graph is malformed: ${detail}`);
		presentFailure = (failure) => ({
			status: "present",
			failure
		});
		evaluateSection = async (source, claim) => {
			const { handle, signal, limits } = source;
			if (claim.truncated) return presentFailure(bunFormatFailure("section extends past the end of the file"));
			if (claim.available < 8) return presentFailure(bunFormatFailure("trailer is truncated"));
			const prefix = new BinaryReader(await readExact(handle, claim.fileOffset, 8, signal), true, "bun-standalone");
			let prefixBytes = 8;
			let payloadLength = prefix.word(0, 64);
			if (claim.carrier === "mach-o-section") {
				const legacyLength = prefix.u32(0);
				if (legacyLength >= BUN_GRAPH_SUFFIX_BYTES && legacyLength + 4 <= claim.available) {
					const suffix = await readExact(handle, claim.fileOffset + 4 + legacyLength - BUN_GRAPH_SUFFIX_BYTES, BUN_GRAPH_SUFFIX_BYTES, signal);
					if (readBunSuffix(suffix, legacyLength).ok) {
						prefixBytes = 4;
						payloadLength = BigInt(legacyLength);
					}
				}
			}
			if (payloadLength === 0n) return { status: "placeholder" };
			if (payloadLength < BigInt(BUN_GRAPH_SUFFIX_BYTES) || payloadLength > BigInt(claim.available - prefixBytes)) return presentFailure(bunFormatFailure("trailer is truncated"));
			const length = Number(payloadLength);
			const payloadOffset = claim.fileOffset + prefixBytes;
			if (prefixBytes === 8) {
				const suffix = await readExact(handle, payloadOffset + length - BUN_GRAPH_SUFFIX_BYTES, BUN_GRAPH_SUFFIX_BYTES, signal);
				const parsed = readBunSuffix(suffix, length);
				if (!parsed.ok) return presentFailure(parsed.error);
			}
			if (claim.loadCommandsFailure !== undefined) return presentFailure(bunFormatFailure(`Mach-O load commands: ${claim.loadCommandsFailure}`));
			if (payloadLength > BigInt(limits.payload_bytes)) return presentFailure(bunPayloadBytesLimit(payloadLength, limits));
			return {
				status: "present",
				claim: {
					carrier: claim.carrier,
					payloadOffset,
					payloadLength: length
				}
			};
		};
		evaluateAppendedTrailer = async (source, rejectedSlices) => {
			const { handle, fileSize, signal, limits } = source;
			const outsideRejectedSlices = (start, end) => !rejectedSlices.some((slice) => start < slice.offset + slice.size && slice.offset < end);
			const readTrailer = async (end) => outsideRejectedSlices(end - BUN_GRAPH_SUFFIX_BYTES, fileSize) ? readExact(handle, end - BUN_TRAILER_BYTES, BUN_TRAILER_BYTES, signal) : null;
			if (fileSize < BUN_GRAPH_SUFFIX_BYTES) return { status: "absent" };
			let graphEnd = fileSize;
			let trailer = await readTrailer(graphEnd);
			if (!trailer?.equals(BUN_TRAILER)) {
				if (fileSize < BUN_GRAPH_SUFFIX_BYTES + 8) return { status: "absent" };
				graphEnd -= 8;
				trailer = await readTrailer(graphEnd);
				if (!trailer?.equals(BUN_TRAILER)) return { status: "absent" };
				const length = await readExact(handle, graphEnd, 8, signal);
				if (new BinaryReader(length, true, "bun-standalone").word(0, 64) !== BigInt(fileSize)) return presentFailure(bunFormatFailure("appended carrier length does not match file size"));
			}
			const offsets = await readExact(handle, graphEnd - BUN_GRAPH_SUFFIX_BYTES, BUN_OFFSETS_BYTES, signal);
			const payloadLength = graphPayloadLength(new BinaryReader(offsets, true, "bun-standalone"));
			const payloadStart = BigInt(graphEnd) - payloadLength;
			if (!outsideRejectedSlices(payloadStart < 0n ? 0 : Number(payloadStart), graphEnd)) return { status: "absent" };
			if (payloadStart < 0n) return presentFailure(bunFormatFailure("trailer is truncated"));
			if (payloadLength > BigInt(limits.payload_bytes)) return presentFailure(bunPayloadBytesLimit(payloadLength, limits));
			return {
				status: "present",
				claim: {
					carrier: "appended-trailer",
					payloadOffset: Number(payloadStart),
					payloadLength: Number(payloadLength)
				}
			};
		};
		graphPayloadLength = (offsets) => offsets.word(0, 64) + BigInt(BUN_GRAPH_SUFFIX_BYTES);
		readBunSuffix = (suffix, payloadLength) => {
			if (suffix.length < BUN_GRAPH_SUFFIX_BYTES) return err(bunFormatFailure("trailer is truncated"));
			if (!suffix.subarray(BUN_OFFSETS_BYTES).equals(BUN_TRAILER)) return err(bunFormatFailure("trailer does not match the Bun sentinel"));
			const offsets = new BinaryReader(suffix.subarray(0, BUN_OFFSETS_BYTES), true, "bun-standalone");
			if (graphPayloadLength(offsets) !== BigInt(payloadLength)) return err(bunFormatFailure("byte_count does not match the located payload"));
			return ok(offsets);
		};
		readPointer = (reader, offset) => ({
			offset: reader.u32(offset),
			length: reader.u32(offset + 4)
		});
		machOClaims = async (source, imageOffset, imageLimit, fat) => {
			const { handle, fileSize, signal, limits } = source;
			if (imageOffset < 0 || imageOffset >= fileSize) return [];
			const imageSize = Math.min(fileSize - imageOffset, imageLimit);
			const imageEnd = imageOffset + imageSize;
			const header = await tryRead(handle, imageOffset, 12, imageEnd, signal);
			if (header === null || header.length < 4) return [];
			const facts = readMachoHeaderPrefixFacts(header);
			if (facts.identity === null) return imageOffset === 0 ? fatClaims(source, header) : [];
			const identityIssue = fat === undefined ? null : validateFatSliceIdentity(fat, facts.identity);
			const rejected = fat !== undefined && identityIssue !== null ? [{ rejectedSlice: fat }] : [];
			const full = await tryRead(handle, imageOffset, Math.min(32, imageSize), imageEnd, signal);
			if (full === null) return rejected;
			const parsed = readMachoLoadCommandTableHeader(full, imageSize);
			if (!parsed.ok || parsed.value === null) return rejected;
			const table = parsed.value;
			const { littleEndian, headerSize: headerBytes, commandBytes: sizeofcmds } = table;
			if (sizeofcmds > limits.recognition_load_command_bytes) {
				if (identityIssue !== null) return rejected;
				throw artifactReaderLimitFailure("artifact_limits.bun.recognition_load_command_bytes", limits.recognition_load_command_bytes, "bytes", sizeofcmds);
			}
			const commands = await tryRead(handle, imageOffset + headerBytes, sizeofcmds, imageEnd, signal);
			if (commands === null || commands.length !== sizeofcmds) return rejected;
			const claims = [];
			const cursor = new MachoLoadCommandCursor(table);
			let framingFailure;
			while (cursor.nextOffset !== null) {
				abortIfNeeded(signal);
				const read = cursor.read(commands.subarray(cursor.nextOffset));
				if (!read.ok) {
					framingFailure = read.error;
					break;
				}
				const { command: cmd, offset, size } = read.value;
				if (cmd === LC.SEGMENT_64 || cmd === LC.SEGMENT) for (const claim of segmentClaims(commands.subarray(offset, offset + size), littleEndian, cmd === LC.SEGMENT_64, imageOffset, imageSize)) {
					if (fat !== undefined && identityIssue !== null) return [{
						rejectedSlice: fat,
						namedFailure: bunFormatFailure(identityIssue)
					}];
					claims.push(claim);
				}
			}
			if (rejected.length !== 0) return rejected;
			const complete = cursor.finish();
			if (!complete.ok) framingFailure ??= complete.error;
			return framingFailure === undefined ? claims : claims.map((claim) => "failure" in claim ? claim : {
				...claim,
				loadCommandsFailure: framingFailure
			});
		};
		segmentClaims = (command, littleEndian, wide, imageOffset, imageSize) => {
			const parsedSegment = readMachoSegmentHeader(command, wide, littleEndian);
			if (!parsedSegment.ok) return [];
			const segment = parsedSegment.value;
			const { headerSize, sectionCount } = segment;
			const sectionBytes = machoSectionHeaderSize(wide);
			if (!machoSegmentSectionTableFits(segment, command.length, wide)) return [];
			const admission = admitMachoSegmentCommand(segment, command.length, wide ? 64 : 32, imageSize);
			const claims = [];
			for (let index = 0; index < sectionCount; index += 1) {
				const start = headerSize + index * sectionBytes;
				const bytes = command.subarray(start, start + sectionBytes);
				if (!exactName(bytes.subarray(0, 16), "__bun")) continue;
				if (!exactName(bytes.subarray(16, 32), "__BUN")) continue;
				const parsedSection = readMachoSectionHeader(bytes, wide, littleEndian);
				if (!parsedSection.ok) continue;
				const section = parsedSection.value;
				const { issue } = machoSectionBacking(section, segment);
				if (issue !== null) {
					claims.push({ failure: bunFormatFailure(`Mach-O __bun section ${issue}`) });
					continue;
				}
				if (section.size > BigInt(Number.MAX_SAFE_INTEGER)) {
					claims.push({ failure: bunFormatFailure("Mach-O __bun section size is not a safe integer") });
					continue;
				}
				const window = windowFor("mach-o-section", imageOffset + section.offset, Number(section.size), imageOffset + imageSize);
				if (admission.ok || window.truncated) claims.push(window);
				else claims.push({ failure: bunFormatFailure(admission.error.message) });
			}
			return claims;
		};
		fatClaims = async (source, prefix) => {
			const { handle, fileSize, signal } = source;
			let parsed = readFatContainerHeader(prefix, fileSize);
			if (parsed.state === "needs-data") {
				const table = await tryRead(handle, 0, parsed.requiredBytes, fileSize, signal);
				if (table === null) return [];
				parsed = readFatContainerHeader(table, fileSize);
			}
			if (parsed.state !== "parsed") return [];
			const claims = [];
			for (const slice of parsed.slices) {
				abortIfNeeded(signal);
				if (parsed.rangeIssues[slice.index] !== null) continue;
				for (const claim of await machOClaims(source, slice.offset, slice.size, slice)) claims.push(claim);
			}
			return claims;
		};
		peClaims = async (source) => {
			const { handle, fileSize, signal } = source;
			const dos = await tryRead(handle, 0, 64, fileSize, signal);
			if (dos === null || dos[0] !== 77 || dos[1] !== 90) return [];
			const probe = observePeCoffFrame(dos, fileSize, parseMzHeaderEvidence(dos, fileSize));
			let frame = probe.next();
			while (!frame.done) {
				const { offset, size } = frame.value;
				const bytes = await tryRead(handle, offset, size, fileSize, signal);
				if (bytes === null) return [];
				frame = probe.next(bytes);
			}
			const header = frame.value;
			if (header.kind !== "pe" || header.observation.offset < dos.length || !header.coff.ok) return [];
			const sectionCount = Math.min(header.coff.value.sectionCount, MAX_PE_SECTIONS);
			const { sectionTableOffset, sectionTableBytes } = peSectionTableExtent(header.observation.offset + PE_COFF_FRAME_BYTES, header.coff.value.optionalHeaderSize, sectionCount);
			const table = await tryRead(handle, sectionTableOffset, sectionTableBytes, fileSize, signal);
			if (table === null) return [];
			const claims = [];
			for (let index = 0; index < sectionCount; index += 1) {
				const start = index * 40;
				const entry = table.subarray(start, start + 40);
				if (!exactName(entry.subarray(0, 8), ".bun")) continue;
				const parsed = readPeSectionHeader(entry);
				if (!parsed.ok) continue;
				const section = parsed.value;
				const raw = declaredFileRange(fileSize, BigInt(section.offset), BigInt(section.raw_size));
				claims.push({
					carrier: "pe-section",
					fileOffset: section.offset,
					available: section.size,
					truncated: section.raw_size > 0 && !raw.file_backed
				});
			}
			return claims;
		};
		ELF_BUN_NAME = Buffer.from(".bun");
		ELF_SHT_NULL = 0;
		ELF_SHT_STRTAB = 3;
		ELF_SHT_NOBITS = 8;
		MAX_SAFE_FILE_WORD = BigInt(Number.MAX_SAFE_INTEGER);
		elfClaims = async (source) => {
			const { handle, fileSize, signal, limits } = source;
			const header = await tryRead(handle, 0, 64, fileSize, signal);
			if (header === null) return [];
			const format = readElfHeaderFacts(header, fileSize);
			if (!format.ok) return [];
			const { elfClass, byteOrder } = format.value;
			const declarations = readElfRawTableDeclarations(header, format.value);
			if (!declarations.ok) return [];
			const { offset, width, count, namesIndex } = declarations.value.sections;
			const sectionWidth = elfSectionHeaderWidth(elfClass);
			if (width !== 0 && width !== sectionWidth || offset === 0n || offset > MAX_SAFE_FILE_WORD || count === 0 || count === 65535 || namesIndex >= count) return [];
			const tableBytes = count * sectionWidth;
			if (tableBytes > limits.recognition_table_bytes) throw artifactReaderLimitFailure("artifact_limits.bun.recognition_table_bytes", limits.recognition_table_bytes, "bytes", tableBytes);
			const table = await tryRead(handle, Number(offset), tableBytes, fileSize, signal);
			if (table === null) return [];
			const readSection = (index) => {
				const start = index * sectionWidth;
				const section = readElfSectionHeader(table.subarray(start, start + sectionWidth), elfClass, byteOrder === "little");
				return section.ok ? section.value : null;
			};
			const strings = readSection(namesIndex);
			if (strings === null || strings.type !== ELF_SHT_STRTAB) return [];
			const stringRange = declaredFileRange(fileSize, strings.offset, strings.size);
			if (!stringRange.file_backed) return [];
			const names = new Map();
			const claims = [];
			for (let index = 0; index < count; index += 1) {
				const section = readSection(index);
				if (section === null || section.type === ELF_SHT_NULL || section.type === ELF_SHT_NOBITS || section.offset > MAX_SAFE_FILE_WORD || section.size > MAX_SAFE_FILE_WORD) continue;
				const { nameOffset } = section;
				let isBun = names.get(nameOffset);
				if (isBun === undefined) {
					const name = nameOffset >= stringRange.size ? null : await tryRead(handle, stringRange.offset + nameOffset, Math.min(ELF_BUN_NAME.length + 1, stringRange.size - nameOffset), fileSize, signal);
					isBun = name !== null && observeElfStringTableEntry(name, 0, name.length).bytes?.equals(ELF_BUN_NAME) === true;
					names.set(nameOffset, isBun);
				}
				if (!isBun) continue;
				claims.push(windowFor("elf-section", Number(section.offset), Number(section.size), fileSize));
			}
			return claims;
		};
		windowFor = (carrier, fileOffset, declaredSize, fileSize) => {
			if (!Number.isSafeInteger(fileOffset) || fileOffset < 0 || fileOffset >= fileSize) return {
				carrier,
				fileOffset,
				available: 0,
				truncated: false
			};
			const room = fileSize - fileOffset;
			return {
				carrier,
				fileOffset,
				available: Math.min(declaredSize, room),
				truncated: declaredSize > room
			};
		};
		exactName = (bytes, text) => {
			const encoded = Buffer.alloc(bytes.length);
			encoded.write(text, "utf8");
			return encoded.equals(bytes);
		};
		tryRead = async (handle, position, length, fileSize, signal) => {
			abortIfNeeded(signal);
			if (!Number.isSafeInteger(position) || !Number.isSafeInteger(length) || length < 0 || position < 0 || length === 0 || position > fileSize || fileSize - position < length) return length === 0 ? Buffer.alloc(0) : null;
			return readExact(handle, position, length, signal);
		};
		readExact = async (handle, position, length, signal) => {
			const bytes = Buffer.alloc(length);
			let offset = 0;
			while (offset < length) {
				abortIfNeeded(signal);
				const read = await handle.read(bytes, offset, length - offset, position + offset);
				abortIfNeeded(signal);
				if (read.bytesRead === 0) throw bunFormatFailure("trailer is truncated");
				offset += read.bytesRead;
			}
			return bytes;
		};
	})))();
}

//#endregion
//#region dist/artifacts/ArtifactCarrierRange.js
var readArtifactRange, hashArtifactRange;
function init_ArtifactCarrierRange() {
	return (init_ArtifactCarrierRange = __esmMin((() => {
		init_readFileHandleRange();
		init_resources();
		readArtifactRange = async (carrier, offset, length) => {
			abortIfNeeded(carrier.signal);
			if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || offset < 0 || length < 0 || offset > carrier.fileSize || length > carrier.fileSize - offset) return undefined;
			const bytes = await readFileHandleRange(carrier.handle, offset, length, () => abortIfNeeded(carrier.signal));
			abortIfNeeded(carrier.signal);
			return bytes.length === length ? bytes : undefined;
		};
		hashArtifactRange = async (carrier, offset, length) => {
			const hash = createHash("sha256");
			let remaining = length;
			let position = offset;
			while (remaining > 0) {
				const chunkLength = Math.min(64 * 1024, remaining);
				const chunk = await readArtifactRange(carrier, position, chunkLength);
				if (chunk === undefined) return undefined;
				hash.update(chunk);
				position += chunkLength;
				remaining -= chunkLength;
			}
			return hash.digest("hex");
		};
	})))();
}

//#endregion
//#region dist/artifacts/deno/DenoVirtualFs.js
var MAX_DENO_VFS_ENTRIES, MAX_DENO_LOGICAL_PATH_PARTS, MAX_DENO_VFS_NAME_UNITS, MAX_DENO_VFS_DEPTH, MAX_DENO_VFS_RETAINED_UNITS, MAX_DENO_PATH_COMPONENT_BYTES, MAX_DENO_LOGICAL_PATH_BYTES, DENO_CHILD_SUFFIXES, DENO_PATH_PARTS_LIMITATION, NAME_LIMITATION, DENO_PATH_LENGTH_LIMITATION, DENO_UNSAFE_PATH_LIMITATION, MTIME_LIMITATION, SYMLINK_PART_LIMITATION, UnsupportedVfsShape, ROOT_PARENT, walkDenoVirtualFs, walkEntries, fileRegions, childSource, taggedEntry, logicalDestination, denoLogicalPathFits, unsafeName, symlinkParts, boundedSymlinkParts, retainText, optionalRange$1, readRange, booleanField, isSafeInteger, asRecord$1, denoVfsEntryLimit, denoVfsDepthLimit, denoVfsRetainedLimit;
function init_DenoVirtualFs() {
	return (init_DenoVirtualFs = __esmMin((() => {
		init_resources();
		MAX_DENO_VFS_ENTRIES = 1e5;
		MAX_DENO_LOGICAL_PATH_PARTS = 256;
		MAX_DENO_VFS_NAME_UNITS = 4096;
		MAX_DENO_VFS_DEPTH = 512;
		MAX_DENO_VFS_RETAINED_UNITS = 32 * 1024 * 1024;
		MAX_DENO_PATH_COMPONENT_BYTES = 255;
		MAX_DENO_LOGICAL_PATH_BYTES = 512;
		DENO_CHILD_SUFFIXES = {
			transpiled: ".deno-transpiled",
			cjsExportAnalysis: ".deno-cjs-analysis",
			sourceMap: ".deno-sourcemap"
		};
		DENO_PATH_PARTS_LIMITATION = `The virtual name exceeds the fixed ${String(256)}-part logical path allowance; an indexed path is used and the original name is retained.`;
		NAME_LIMITATION = `The virtual name exceeds the fixed ${String(MAX_DENO_VFS_NAME_UNITS)}-unit name allowance; an indexed path is used and the original name is not retained.`;
		DENO_PATH_LENGTH_LIMITATION = `The virtual name exceeds the fixed ${String(MAX_DENO_PATH_COMPONENT_BYTES)}-byte path component or ${String(MAX_DENO_LOGICAL_PATH_BYTES)}-byte logical path allowance; an indexed path is used and the original name is retained.`;
		DENO_UNSAFE_PATH_LIMITATION = "The virtual name is not a safe relative path; an indexed path is used and the original name is retained.";
		MTIME_LIMITATION = "The file mtime is not a safe integer; it is omitted.";
		SYMLINK_PART_LIMITATION = `A symlink target part exceeds the fixed ${String(MAX_DENO_VFS_NAME_UNITS)}-unit name allowance; the target parts are not retained.`;
		UnsupportedVfsShape = class {
			kind = "unsupported-vfs-shape";
		};
		ROOT_PARENT = {
			path: null,
			parts: 0,
			source: null,
			limitation: null
		};
		walkDenoVirtualFs = (value, fileDataLength, signal) => {
			abortIfNeeded(signal);
			if (!Array.isArray(value)) return {
				listing: "unsupported",
				members: []
			};
			const members = [];
			const state = {
				count: 0,
				retainedUnits: 0,
				indexed: new Set(),
				naturalPaths: new Set()
			};
			try {
				walkEntries(value, ROOT_PARENT, 1, state, fileDataLength, members);
			} catch (cause) {
				if (cause instanceof UnsupportedVfsShape) return {
					listing: "unsupported",
					members: []
				};
				throw cause;
			}
			const conflictingChildren = new Set(members.filter((member) => member.role !== "vfs-file" && member.role !== "vfs-symlink" && !state.indexed.has(member.index) && state.naturalPaths.has(member.path)));
			if (state.indexed.size === 0 && conflictingChildren.size === 0) return {
				listing: "listed",
				members
			};
			const occupied = new Set();
			for (const path of state.naturalPaths) occupied.add(path.split("/", 1)[0] ?? path);
			for (const member of members) if (!state.indexed.has(member.index)) occupied.add(member.path.split("/", 1)[0] ?? member.path);
			let namespace = "deno-vfs";
			for (let salt = 1; occupied.has(namespace); salt += 1) namespace = `deno-vfs-${String(salt)}`;
			return {
				listing: "listed",
				members: members.map((member) => conflictingChildren.has(member) ? {
					...member,
					path: `${namespace}/${String(member.index)}.${member.role}`,
					limitations: [...member.limitations, "The generated region path conflicts with a natural VFS destination; an indexed path is used and the original name is retained."]
				} : state.indexed.has(member.index) ? {
					...member,
					path: `${namespace}${member.path.slice("deno-vfs".length)}`
				} : member)
			};
		};
		walkEntries = (entries, parent, depth, state, fileDataLength, members) => {
			if (depth > MAX_DENO_VFS_DEPTH) throw denoVfsDepthLimit(depth);
			for (const entry of entries) {
				const tagged = taggedEntry(entry);
				if (tagged === undefined) throw new UnsupportedVfsShape();
				const index = state.count;
				if (index >= MAX_DENO_VFS_ENTRIES) throw denoVfsEntryLimit(index + 1);
				state.count += 1;
				const name = tagged.body.n;
				if (typeof name !== "string") throw new UnsupportedVfsShape();
				const source = retainText(state, childSource(parent, name));
				const regions = tagged.kind === "File" ? fileRegions(tagged.body, fileDataLength) : undefined;
				const destination = logicalDestination(name, parent, source, index, Math.max(0, ...(regions?.children ?? []).map((c) => c.suffix.length)));
				const childParent = {
					path: destination.forceChildren ? null : destination.path,
					parts: destination.parts,
					source: destination.source,
					limitation: destination.forceChildren ? destination.limitations[0] ?? null : null
				};
				if (!destination.forceChildren) state.naturalPaths.add(destination.path);
				if (tagged.kind === "Dir") {
					if (!Array.isArray(tagged.body.e)) throw new UnsupportedVfsShape();
					walkEntries(tagged.body.e, childParent, depth + 1, state, fileDataLength, members);
					continue;
				}
				if (destination.forceChildren) state.indexed.add(index);
				if (tagged.kind === "Symlink") {
					const parts = symlinkParts(tagged.body.p);
					if (parts === undefined) throw new UnsupportedVfsShape();
					if ("d" in tagged.body && typeof tagged.body.d !== "boolean") throw new UnsupportedVfsShape();
					const bounded = boundedSymlinkParts(parts);
					if (bounded !== null) retainText(state, bounded.join("/"));
					const limitations = bounded === null ? [...destination.limitations, SYMLINK_PART_LIMITATION] : destination.limitations;
					members.push({
						role: "vfs-symlink",
						index,
						path: destination.path,
						sourcePath: destination.source,
						limitations,
						offset: null,
						length: null,
						executable: false,
						isValidUtf8: null,
						symlinkDestParts: bounded
					});
					continue;
				}
				if (regions === undefined) throw new UnsupportedVfsShape();
				const limitations = [...destination.limitations];
				if ("t" in tagged.body && !isSafeInteger(tagged.body.t)) limitations.push(MTIME_LIMITATION);
				const pushFile = (role, range, suffix, fileExecutable) => {
					members.push({
						role,
						index,
						path: `${destination.path}${suffix}`,
						sourcePath: destination.source,
						limitations,
						offset: range.offset,
						length: range.length,
						executable: fileExecutable,
						isValidUtf8: regions.utf8,
						symlinkDestParts: null
					});
				};
				pushFile("vfs-file", regions.original, "", regions.executable);
				for (const child of regions.children) pushFile(child.role, child.range, child.suffix, false);
			}
		};
		fileRegions = (body, fileDataLength) => {
			const original = readRange(body.o, fileDataLength, "original");
			if (original === undefined) throw new UnsupportedVfsShape();
			const transpiled = optionalRange$1(body, "m", fileDataLength);
			const cjs = optionalRange$1(body, "c", fileDataLength);
			const sourceMap = optionalRange$1(body, "s", fileDataLength);
			if (transpiled === "unsupported" || cjs === "unsupported" || sourceMap === "unsupported") throw new UnsupportedVfsShape();
			const utf8 = booleanField(body, "u");
			const executable = booleanField(body, "x");
			if (utf8 === "unsupported" || executable === "unsupported") throw new UnsupportedVfsShape();
			const children = [];
			if (transpiled !== undefined) children.push({
				role: "vfs-transpiled",
				range: transpiled,
				suffix: DENO_CHILD_SUFFIXES.transpiled
			});
			if (cjs !== undefined) children.push({
				role: "vfs-cjs-export-analysis",
				range: cjs,
				suffix: DENO_CHILD_SUFFIXES.cjsExportAnalysis
			});
			if (sourceMap !== undefined) children.push({
				role: "vfs-source-map",
				range: sourceMap,
				suffix: DENO_CHILD_SUFFIXES.sourceMap
			});
			return {
				original,
				children,
				utf8,
				executable
			};
		};
		childSource = (parent, name) => {
			if (name.length > MAX_DENO_VFS_NAME_UNITS) return null;
			if (parent.source === null) return parent.limitation === null ? name : null;
			return `${parent.source}/${name}`;
		};
		taggedEntry = (value) => {
			const record = asRecord$1(value);
			if (record === undefined) return undefined;
			const keys = Object.keys(record);
			const key = keys[0];
			if (keys.length !== 1 || key === undefined) return undefined;
			if (key !== "Dir" && key !== "File" && key !== "Symlink") return undefined;
			const body = asRecord$1(record[key]);
			if (body === undefined) return undefined;
			return {
				kind: key,
				body
			};
		};
		logicalDestination = (name, parent, source, index, reservedBytes) => {
			const indexed = (limitation, retained) => ({
				path: `deno-vfs/${String(index)}`,
				parts: parent.parts,
				source: retained,
				forceChildren: true,
				limitations: [limitation]
			});
			if (parent.limitation !== null) return indexed(parent.limitation, source);
			if (name.length > MAX_DENO_VFS_NAME_UNITS) return indexed(NAME_LIMITATION, null);
			if (unsafeName(name)) return indexed(DENO_UNSAFE_PATH_LIMITATION, source);
			const parts = parent.parts + 1;
			if (parts > 256) return indexed(DENO_PATH_PARTS_LIMITATION, source);
			const joined = parent.path === null ? name : `${parent.path}/${name}`;
			try {
				const path = normalizeArtifactPath(joined);
				if (!denoLogicalPathFits(path, reservedBytes)) return indexed(DENO_PATH_LENGTH_LIMITATION, source);
				return {
					path,
					parts,
					source,
					forceChildren: false,
					limitations: []
				};
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure && cause.reason === "path") return indexed(DENO_UNSAFE_PATH_LIMITATION, source);
				throw cause;
			}
		};
		denoLogicalPathFits = (path, reservedBytes = 0) => Buffer.byteLength(path, "utf8") + reservedBytes <= MAX_DENO_LOGICAL_PATH_BYTES && path.split("/").every((part, index, parts) => Buffer.byteLength(part, "utf8") + (index === parts.length - 1 ? reservedBytes : 0) <= MAX_DENO_PATH_COMPONENT_BYTES);
		unsafeName = (name) => name.length === 0 || name === "." || name === ".." || name.includes("/") || name.includes("\0");
		symlinkParts = (value) => {
			if (!Array.isArray(value) || value.some((part) => typeof part !== "string")) return undefined;
			return value;
		};
		boundedSymlinkParts = (parts) => parts.some((part) => part.length > MAX_DENO_VFS_NAME_UNITS) ? null : parts;
		retainText = (state, text) => {
			if (text === null || text.length === 0) return text;
			const next = state.retainedUnits + text.length;
			if (next > MAX_DENO_VFS_RETAINED_UNITS) throw denoVfsRetainedLimit(next);
			state.retainedUnits = next;
			return text;
		};
		optionalRange$1 = (body, key, fileDataLength) => {
			if (!Object.hasOwn(body, key) || body[key] === null) return undefined;
			const range = readRange(body[key], fileDataLength, key);
			return range === undefined ? "unsupported" : range;
		};
		readRange = (value, fileDataLength, label) => {
			if (!Array.isArray(value) || value.length !== 2) return undefined;
			const [offset, length] = value;
			if (!isSafeInteger(offset) || !isSafeInteger(length) || offset < 0 || length < 0) return undefined;
			if (BigInt(offset) + BigInt(length) > BigInt(fileDataLength)) throw new ArtifactReaderFailure("format", `Deno compile section is malformed: vfs ${label} region overruns vfs file data`);
			return {
				offset,
				length
			};
		};
		booleanField = (body, key) => {
			if (!Object.hasOwn(body, key)) return false;
			return typeof body[key] === "boolean" ? body[key] : "unsupported";
		};
		isSafeInteger = (value) => typeof value === "number" && Number.isSafeInteger(value);
		asRecord$1 = (value) => {
			if (typeof value !== "object" || value === null || Array.isArray(value)) return undefined;
			return Object.fromEntries(Object.entries(value));
		};
		denoVfsEntryLimit = (count) => artifactFixedLimitFailure({
			name: "The Deno compile virtual filesystem entry allowance",
			kind: "count",
			limit: MAX_DENO_VFS_ENTRIES,
			unit: "entries"
		}, `Deno compile virtual filesystem claims ${String(count)} entries, exceeding MAX_DENO_VFS_ENTRIES (${String(MAX_DENO_VFS_ENTRIES)} entries).`);
		denoVfsDepthLimit = (depth) => artifactFixedLimitFailure({
			name: "The Deno compile virtual filesystem depth allowance",
			kind: "count",
			limit: MAX_DENO_VFS_DEPTH,
			unit: "levels"
		}, `Deno compile virtual filesystem nests ${String(depth)} levels, exceeding MAX_DENO_VFS_DEPTH (${String(MAX_DENO_VFS_DEPTH)} levels).`);
		denoVfsRetainedLimit = (units) => artifactFixedLimitFailure({
			name: "The Deno compile virtual filesystem retained name allowance",
			kind: "bytes",
			limit: MAX_DENO_VFS_RETAINED_UNITS,
			unit: "UTF-16 code units"
		}, `Deno compile virtual filesystem paths use ${String(units)} UTF-16 code units, exceeding MAX_DENO_VFS_RETAINED_UNITS (${String(MAX_DENO_VFS_RETAINED_UNITS)} units).`, "memory");
	})))();
}

//#endregion
//#region dist/artifacts/deno/DenoSectionLayout.js
var DENO_SECTION_MAGIC, MAX_DENO_METADATA_JSON_BYTES, MAX_DENO_VFS_HEADER_JSON_BYTES, MAX_DENO_TABLE_COUNT, MAX_DENO_SPECIFIER_TEXT_BYTES, MAX_DENO_REMOTE_BODY_BYTES, KNOWN_REMOTE_FLAGS, FLAG_TRANSPILED, FLAG_SOURCE_MAP, FLAG_CJS, FLAG_UTF8, specifierDecoder, jsonDecoder, MEDIA_TYPE_NAMES, denoMediaTypeName, parseDenoSection, addRemoteBody, assertTableCount, decodeStrict, decodeJson, observeMetadata, stringArray, jsonObject, optionalString, envVars, parseCaData, caseSensitivity, asRecord, denoFormatFailure, denoUnsupported, denoByteLimit;
function init_DenoSectionLayout() {
	return (init_DenoSectionLayout = __esmMin((() => {
		init_binaryContainer();
		init_jsonValue();
		init_resources();
		init_DenoVirtualFs();
		init_jsonDuplicateMember();
		init_strictUtf8();
		DENO_SECTION_MAGIC = Buffer.from("d3n0l4nd", "latin1");
		MAX_DENO_METADATA_JSON_BYTES = 8 * 1024 * 1024;
		MAX_DENO_VFS_HEADER_JSON_BYTES = 32 * 1024 * 1024;
		MAX_DENO_TABLE_COUNT = 1e5;
		MAX_DENO_SPECIFIER_TEXT_BYTES = 8 * 1024 * 1024;
		MAX_DENO_REMOTE_BODY_BYTES = 256 * 1024 * 1024;
		KNOWN_REMOTE_FLAGS = 15;
		FLAG_TRANSPILED = 1 << 0;
		FLAG_SOURCE_MAP = 1 << 1;
		FLAG_CJS = 1 << 2;
		FLAG_UTF8 = 1 << 3;
		specifierDecoder = strictUtf8Decoder("preserve");
		jsonDecoder = strictUtf8Decoder("strip-signature");
		MEDIA_TYPE_NAMES = [
			"JavaScript",
			"Jsx",
			"Mjs",
			"Cjs",
			"TypeScript",
			"Mts",
			"Cts",
			"Dts",
			"Dmts",
			"Dcts",
			"Tsx",
			"Json",
			"Jsonc",
			"Json5",
			"Markdown",
			"Wasm",
			"Css",
			"Html",
			"SourceMap",
			"Sql",
			"Unknown"
		];
		denoMediaTypeName = (value) => MEDIA_TYPE_NAMES[value] ?? null;
		parseDenoSection = async (sectionLength, read, signal) => {
			abortIfNeeded(signal);
			if (!Number.isSafeInteger(sectionLength) || sectionLength < DENO_SECTION_MAGIC.length) throw denoUnsupported("opening marker d3n0l4nd is absent");
			const size = BigInt(sectionLength);
			const readExact = async (offset, length) => {
				abortIfNeeded(signal);
				if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || offset < 0 || length < 0 || offset > sectionLength || length > sectionLength - offset) throw denoFormatFailure("section read exceeds the declared section");
				if (length === 0) return Buffer.alloc(0);
				const bytes = await read(offset, length);
				if (bytes.length !== length) throw denoFormatFailure("section read was short");
				return bytes;
			};
			const opening = await readExact(0, DENO_SECTION_MAGIC.length);
			if (!opening.equals(DENO_SECTION_MAGIC)) throw denoUnsupported("opening marker d3n0l4nd is absent");
			let cursor = BigInt(DENO_SECTION_MAGIC.length);
			const takeRange = (claimed, scope) => {
				if (cursor > size || claimed > size - cursor) throw denoFormatFailure(scope === undefined ? "length overruns the section" : `${scope} length overruns the section`);
				const range = {
					sectionOffset: Number(cursor),
					length: Number(claimed)
				};
				cursor += claimed;
				return range;
			};
			const pull = async (bytes) => {
				const range = takeRange(BigInt(bytes));
				return readExact(range.sectionOffset, range.length);
			};
			const u8 = async () => (await pull(1))[0] ?? 0;
			const u32 = async () => new BinaryReader(await pull(4), true, "deno").u32(0);
			const u64 = async () => new BinaryReader(await pull(8), true, "deno").word(0, 64);
			const readBounded = async (claimed, max, scope) => {
				const range = takeRange(claimed, scope);
				if (claimed > BigInt(max)) throw denoByteLimit(scope, claimed, max);
				return readExact(range.sectionOffset, range.length);
			};
			const metadataBytes = await readBounded(await u64(), MAX_DENO_METADATA_JSON_BYTES, "metadata JSON");
			const metadata = observeMetadata(decodeJson(metadataBytes, "metadata JSON"));
			const npmSnapshotByteLength = takeRange(await u64(), "npm snapshot").length;
			const specifierStart = cursor;
			const specifierCount = await u32();
			assertTableCount(specifierCount, "specifier");
			const specifierText = new Map();
			let textBytes = 0;
			let invalidUtf8 = false;
			for (let index = 0; index < specifierCount; index += 1) {
				abortIfNeeded(signal);
				const length = await u32();
				const range = takeRange(BigInt(length), "specifier text");
				textBytes += length;
				if (textBytes > 8388608) throw denoByteLimit("specifier text", textBytes, MAX_DENO_SPECIFIER_TEXT_BYTES);
				const bytes = await readExact(range.sectionOffset, range.length);
				const id = await u32();
				if (specifierText.has(id)) throw denoFormatFailure(`duplicate specifier id ${String(id)}`);
				const decoded = decodeStrict(bytes, specifierDecoder);
				if (decoded === undefined) invalidUtf8 = true;
				specifierText.set(id, decoded ?? null);
			}
			const specifiers = {
				count: specifierCount,
				byteLength: Number(cursor - specifierStart),
				listing: invalidUtf8 ? "unsupported" : "listed"
			};
			const hasSpecifierText = (id) => typeof specifierText.get(id) === "string";
			const redirectStart = cursor;
			const redirectCount = await u32();
			assertTableCount(redirectCount, "redirect");
			const redirectIds = new Set();
			let redirectListing = "listed";
			for (let index = 0; index < redirectCount; index += 1) {
				abortIfNeeded(signal);
				const from = await u32();
				const to = await u32();
				if (redirectIds.has(from)) throw denoFormatFailure(`duplicate redirect specifier id ${String(from)}`);
				redirectIds.add(from);
				if (!hasSpecifierText(from) || !hasSpecifierText(to)) redirectListing = "unsupported";
			}
			const redirects = {
				count: redirectCount,
				byteLength: Number(cursor - redirectStart),
				listing: redirectListing
			};
			const remoteStart = cursor;
			const remoteCount = await u32();
			assertTableCount(remoteCount, "remote module");
			const remoteIds = new Set();
			const modules = [];
			let remoteBodies = 0n;
			const takeRemoteBody = (length, scope) => {
				const range = takeRange(BigInt(length), scope);
				remoteBodies = addRemoteBody(remoteBodies, length);
				return range;
			};
			let unresolvedRemote = false;
			for (let index = 0; index < remoteCount; index += 1) {
				abortIfNeeded(signal);
				const specifierId = await u32();
				if (remoteIds.has(specifierId)) throw denoFormatFailure(`duplicate remote specifier id ${String(specifierId)}`);
				remoteIds.add(specifierId);
				if (!hasSpecifierText(specifierId)) unresolvedRemote = true;
				const mediaType = await u8();
				const data = takeRemoteBody(await u32(), "remote module");
				const flags = await u8();
				if ((flags & ~KNOWN_REMOTE_FLAGS) !== 0) throw denoUnsupported(`remote module flags 0x${flags.toString(16)} are not a recognized layout, so later regions are not framed`);
				const optionalRegion = async (flag, scope) => {
					if ((flags & flag) === 0) return null;
					return takeRemoteBody(await u32(), scope);
				};
				const transpiled = await optionalRegion(FLAG_TRANSPILED, "remote transpiled");
				const sourceMap = await optionalRegion(FLAG_SOURCE_MAP, "remote source map");
				const cjsExportAnalysis = await optionalRegion(FLAG_CJS, "remote cjs export analysis");
				modules.push({
					index,
					specifierId,
					mediaType,
					data,
					transpiled,
					sourceMap,
					cjsExportAnalysis,
					isValidUtf8: (flags & FLAG_UTF8) !== 0
				});
			}
			const remoteModules = {
				count: remoteCount,
				byteLength: Number(cursor - remoteStart),
				listing: unresolvedRemote ? "unsupported" : "listed",
				modules
			};
			const vfsHeader = await readBounded(await u64(), MAX_DENO_VFS_HEADER_JSON_BYTES, "vfs header JSON");
			const vfsJson = decodeJson(vfsHeader, "vfs header JSON");
			const vfsFileData = takeRange(await u64(), "vfs file data");
			if (size - cursor !== BigInt(DENO_SECTION_MAGIC.length)) throw denoFormatFailure("closing marker is missing or trailing bytes follow it");
			const closing = await pull(DENO_SECTION_MAGIC.length);
			if (!closing.equals(DENO_SECTION_MAGIC)) throw denoFormatFailure("closing marker does not match d3n0l4nd");
			return {
				metadata,
				npmSnapshotByteLength,
				specifiers,
				redirects,
				remoteModules,
				vfsHeaderByteLength: vfsHeader.length,
				vfsFileData,
				vfs: walkDenoVirtualFs(vfsJson, vfsFileData.length, signal),
				specifierText
			};
		};
		addRemoteBody = (total, length) => {
			const next = total + BigInt(length);
			if (next > BigInt(268435456)) throw denoByteLimit("remote module bodies", next, MAX_DENO_REMOTE_BODY_BYTES);
			return next;
		};
		assertTableCount = (count, scope) => {
			if (count > MAX_DENO_TABLE_COUNT) throw artifactFixedLimitFailure({
				name: `The Deno compile ${scope} record allowance`,
				kind: "count",
				limit: MAX_DENO_TABLE_COUNT,
				unit: "records"
			}, `Deno compile ${scope} table claims ${String(count)} records, exceeding MAX_DENO_TABLE_COUNT (${String(MAX_DENO_TABLE_COUNT)} records).`);
		};
		decodeStrict = (bytes, decoder) => {
			try {
				return decoder.decode(bytes);
			} catch {
				return undefined;
			}
		};
		decodeJson = (bytes, scope) => {
			const text = decodeStrict(bytes, jsonDecoder);
			if (text === undefined) throw denoFormatFailure(`${scope} is invalid`);
			const parsed = parseJsonWithDuplicatePolicy(text, "reject");
			if (!parsed.ok) {
				if (parsed.duplicate !== undefined) throw denoFormatFailure(`${scope} declares member ${JSON.stringify(parsed.duplicate.name)} more than once`);
				throw denoFormatFailure(`${scope} is invalid`);
			}
			return parsed.value;
		};
		observeMetadata = (value) => {
			const record = asRecord(value);
			if (record === undefined) throw denoUnsupported("metadata JSON is not an object");
			if (typeof record.entrypoint_key !== "string") throw denoUnsupported("entrypoint_key is missing or not a string");
			const caData = parseCaData(record.ca_data);
			return {
				entrypointKey: record.entrypoint_key,
				argv: stringArray(record.argv, "argv"),
				v8Flags: stringArray(record.v8_flags, "v8_flags"),
				permissions: jsonObject(record.permissions, "permissions"),
				unstableConfig: jsonObject(record.unstable_config, "unstable_config"),
				appName: optionalString(record.app_name, "app_name"),
				selfExtracting: optionalString(record.self_extracting, "self_extracting"),
				...envVars(record.env_vars_from_env_file),
				caData,
				caDataByteLength: caData?.length ?? null,
				vfsCaseSensitivity: caseSensitivity(record.vfs_case_sensitivity)
			};
		};
		stringArray = (value, label) => {
			if (value === undefined) return null;
			if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) throw denoUnsupported(`${label} is not an array of strings`);
			return value;
		};
		jsonObject = (value, label) => {
			if (value === undefined) return null;
			const parsed = jsonValueSchema.safeParse(value);
			if (!parsed.success || parsed.data === null || typeof parsed.data !== "object" || Array.isArray(parsed.data)) throw denoUnsupported(`${label} is not a JSON object`);
			return parsed.data;
		};
		optionalString = (value, label) => {
			if (value === undefined || value === null) return null;
			if (typeof value !== "string") throw denoUnsupported(`${label} is not a string`);
			return value;
		};
		envVars = (value) => {
			if (value === undefined) return {
				envVarCount: null,
				envVars: null
			};
			const record = asRecord(value);
			if (record === undefined) throw denoUnsupported("env_vars_from_env_file is not an object");
			const vars = Object.entries(record).map(([name, stored]) => {
				if (typeof stored !== "string") throw denoUnsupported("env_vars_from_env_file values are not strings");
				return {
					name,
					value: stored,
					valueByteLength: Buffer.byteLength(stored, "utf8")
				};
			});
			return {
				envVarCount: vars.length,
				envVars: vars
			};
		};
		parseCaData = (value) => {
			if (value === undefined || value === null) return null;
			if (!Array.isArray(value) || value.some((item) => typeof item !== "number" || !Number.isInteger(item) || item < 0 || item > 255)) throw denoUnsupported("ca_data is not a byte array");
			return value;
		};
		caseSensitivity = (value) => {
			if (value === undefined) return null;
			if (value === "s") return "sensitive";
			if (value === "i") return "insensitive";
			throw denoUnsupported("vfs_case_sensitivity is not s or i");
		};
		asRecord = (value) => {
			if (typeof value !== "object" || value === null || Array.isArray(value)) return undefined;
			return Object.fromEntries(Object.entries(value));
		};
		denoFormatFailure = (detail) => new ArtifactReaderFailure("format", `Deno compile section is malformed: ${detail}`);
		denoUnsupported = (detail) => new ArtifactReaderFailure("unavailable", `Deno compile section layout is unsupported: ${detail}`);
		denoByteLimit = (scope, claimed, allowance) => artifactFixedLimitFailure({
			name: `The Deno compile ${scope} allowance`,
			kind: "parser",
			limit: allowance,
			unit: "bytes"
		}, `The ${scope} claims ${String(claimed)} bytes, above ${String(allowance)} bytes.`, "memory");
	})))();
}

//#endregion
//#region dist/artifacts/deno/DenoStandaloneLocation.js
var CPU_TYPE_ARM64, PT_NOTE$1, PN_XNUM, RT_RCDATA$1, RESOURCE_NAME$1, SECTION_NAME, SECTION_NAME_BYTES, SEGMENT_NAME, LINKEDIT_SEGMENT_NAME, ELF_NOTE_OWNER, ELF_NOTE_TYPE, INTEL_CHUNK_BYTES, MAX_DENO_INTEL_TRAILER_SENTINELS, INTEL_SENTINEL, locateDenoStandalone, findDenoSection, locateMachO, locateMachOSlice, namesDenoSection, denoSectionRange, denoSectionTruncated, locateIntelTrailers, locateElfNotes$1, readElfHeaderTable, scanElfNoteTable$1, noteTableTailIssue, confirmsSuiNote, readSuiRange, locatePeResources$1, collapseRanges$1, fixedCString, denoCarrierFailure, denoLimit, denoIntelSentinelLimit, denoElfNoteLimit, denoPeLimit;
function init_DenoStandaloneLocation() {
	return (init_DenoStandaloneLocation = __esmMin((() => {
		init_binaryContainer();
		init_machoLoadCommandCodes();
		init_ArtifactCarrierRange();
		init_machoSectionHeader();
		init_machoSegmentHeader();
		init_machoContainer();
		init_elfSectionHeader();
		init_elfProgramHeader();
		init_elfRawTableDeclarations();
		init_elfDeclaredRanges();
		init_elfFixedHeader();
		init_elfNotes();
		init_elfNoteLayout();
		init_peResources();
		init_machoLoadCommandReader();
		init_resources();
		init_parseFailure();
		init_peResourceLayout();
		init_DenoSectionLayout();
		CPU_TYPE_ARM64 = 16777228;
		PT_NOTE$1 = 4;
		PN_XNUM = 65535;
		RT_RCDATA$1 = 10;
		RESOURCE_NAME$1 = "D3N0L4ND";
		SECTION_NAME = "d3n0l4nd";
		SECTION_NAME_BYTES = Buffer.from(SECTION_NAME, "latin1");
		SEGMENT_NAME = "__SUI";
		LINKEDIT_SEGMENT_NAME = "__LINKEDIT";
		ELF_NOTE_OWNER = Buffer.from("SUI\0", "latin1");
		ELF_NOTE_TYPE = 1398098177;
		INTEL_CHUNK_BYTES = 1024 * 1024;
		MAX_DENO_INTEL_TRAILER_SENTINELS = 64;
		INTEL_SENTINEL = Buffer.concat([Buffer.from("<~sui-data~>", "latin1"), Buffer.from([
			239,
			190,
			173,
			222
		])]);
		locateDenoStandalone = async (handle, fileSize, signal, archive) => {
			try {
				const location = await findDenoSection(handle, fileSize, signal, archive);
				return location === undefined ? { status: "absent" } : {
					status: "present",
					location
				};
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure && (cause.reason === "format" || cause.reason === "malformed" || cause.reason === "truncated" || cause.reason === "unsupported" || cause.reason === "limit")) return {
					status: "present",
					failure: cause
				};
				throw cause;
			}
		};
		findDenoSection = async (handle, fileSize, signal, archive) => {
			if (!Number.isSafeInteger(fileSize) || fileSize < 4) return undefined;
			const carrier = {
				handle,
				fileSize,
				signal,
				archive
			};
			const prefix = await readArtifactRange(carrier, 0, Math.min(fileSize, 64));
			if (prefix === undefined || prefix.length < 4) return undefined;
			const thin = readMachoHeaderPrefixFacts(prefix).format;
			const fat = readFatHeaderPrefix(prefix);
			if (thin !== null || fat.state === "incomplete" || fat.state === "parsed") return collapseRanges$1(carrier, "mach-o", await locateMachO(carrier));
			if (prefix.subarray(0, 4).equals(Buffer.from([
				127,
				69,
				76,
				70
			]))) return collapseRanges$1(carrier, "elf", await locateElfNotes$1(carrier));
			if (prefix[0] === 77 && prefix[1] === 90) return collapseRanges$1(carrier, "pe", await locatePeResources$1(carrier, prefix));
			return undefined;
		};
		locateMachO = async (carrier) => {
			const readAt = async (offset, length) => await readArtifactRange(carrier, offset, length) ?? Buffer.alloc(0);
			const container = await readMachoContainer(readAt, carrier.fileSize);
			if (container.kind !== "thin" && container.kind !== "fat") return [];
			if (container.kind === "thin") return (await locateMachOSlice(carrier, readAt, 0, carrier.fileSize, null)).found;
			const found = [];
			const unread = [];
			const scan = async (label, rangeIssue, declaration) => {
				if (rangeIssue != null) {
					unread.push(`${label} ${rangeIssue}`);
					return;
				}
				const result = await locateMachOSlice(carrier, readAt, declaration.offset, declaration.size, declaration);
				found.push(...result.found);
				if (result.unread !== null) unread.push(`${label} ${result.unread}`);
			};
			for (const [index, slice] of container.header.slices.entries()) await scan(`slice ${String(index)}`, container.header.rangeIssues[index]?.reason, slice);
			const hidden = container.hidden;
			if (hidden?.status === "declared") await scan("hidden slice", hidden.rangeIssue, hidden.declaration);
			if (found.length > 0 && unread.length > 0) throw denoCarrierFailure(`universal Mach-O ${unread[0] ?? ""} beside a Deno section`);
			return found;
		};
		locateMachOSlice = async (carrier, readAt, base, sliceSize, fat) => {
			const table = await readSliceCommandTable(readAt, base, sliceSize);
			if (table.status !== "read") return {
				found: [],
				unread: `cannot be read: ${table.reason}`
			};
			const identityIssue = fat === null ? null : validateFatSliceIdentity(fat, table.header);
			if (identityIssue !== null) return {
				found: [],
				unread: identityIssue
			};
			const found = [];
			const owned = [];
			if (carrier.archive !== undefined) owned.push({
				start: BigInt(carrier.archive.start),
				end: BigInt(carrier.archive.end)
			});
			let confirmed = false;
			let damage;
			const framed = frameLoadCommands(table, (command) => {
				if (command.command !== LC.SEGMENT && command.command !== LC.SEGMENT_64) return;
				const segment64 = command.command === LC.SEGMENT_64;
				const parsedSegment = readMachoSegmentHeader(command.body, segment64, true);
				if (!parsedSegment.ok) {
					damage ??= "Mach-O segment command cannot be parsed";
					return;
				}
				const segment = parsedSegment.value;
				const admitted = admitMachoSegmentCommand(segment, command.body.byteLength, table.header.wide ? 64 : 32, sliceSize);
				if (!admitted.ok) damage ??= admitted.error.message;
				if (segment64 !== table.header.wide) damage ??= "Mach-O segment command width disagrees with its header";
				const segmentName = fixedCString(segment.nameBytes);
				if (segmentName !== LINKEDIT_SEGMENT_NAME && segment.fileSize > 0n) {
					const start = BigInt(base) + segment.fileOffset;
					owned.push({
						start,
						end: start + segment.fileSize
					});
				}
				if (segmentName !== SEGMENT_NAME) return;
				const sectionSize = segment64 ? 80 : 68;
				const fitting = Math.floor((command.body.byteLength - segment.headerSize) / sectionSize);
				for (let index = 0; index < Math.min(segment.sectionCount, fitting); index += 1) {
					abortIfNeeded(carrier.signal);
					const at = segment.headerSize + index * sectionSize;
					const parsedSection = readMachoSectionHeader(command.body.subarray(at, at + sectionSize), segment64, true);
					if (!parsedSection.ok) {
						if (namesDenoSection(command.body, at)) throw denoSectionTruncated();
						damage ??= "Mach-O __SUI section is truncated";
						return;
					}
					const record = parsedSection.value;
					if (fixedCString(record.nameBytes) !== SECTION_NAME) continue;
					confirmed = true;
					found.push(denoSectionRange(record, segment, base, sliceSize, carrier.fileSize));
				}
				if (segment.sectionCount <= fitting) return;
				if (namesDenoSection(command.body, segment.headerSize + fitting * sectionSize)) throw denoSectionTruncated();
				damage ??= "Mach-O __SUI segment is truncated";
			});
			if (confirmed && damage !== undefined) throw denoCarrierFailure(damage);
			if (confirmed && framed.status !== "framed") throw denoCarrierFailure("Mach-O load commands are truncated");
			if (framed.status !== "framed") return {
				found,
				unread: `load commands cannot be framed: ${framed.reason}`
			};
			if (damage !== undefined) return {
				found,
				unread: damage
			};
			if (found.length > 0 || table.header.cpuType === CPU_TYPE_ARM64) return {
				found,
				unread: null
			};
			return locateIntelTrailers(carrier, base, sliceSize, owned);
		};
		namesDenoSection = (body, at) => at + 16 <= body.byteLength && fixedCString(body.subarray(at, at + 16)) === SECTION_NAME;
		denoSectionRange = (record, segment, base, sliceSize, fileSize) => {
			const { issue } = machoSectionBacking(record, segment);
			if (issue !== null) throw denoCarrierFailure(`Mach-O d3n0l4nd section ${issue}`);
			if (record.size > BigInt(Number.MAX_SAFE_INTEGER)) throw denoCarrierFailure("Mach-O d3n0l4nd section size is not a safe integer");
			const length = Number(record.size);
			const fileOffset = record.offset;
			if (fileOffset > sliceSize || length > sliceSize - fileOffset || base + fileOffset > fileSize || length > fileSize - (base + fileOffset)) throw denoCarrierFailure("Mach-O d3n0l4nd section exceeds the image");
			return {
				offset: base + fileOffset,
				length,
				embedding: "mach-o-section"
			};
		};
		denoSectionTruncated = () => denoCarrierFailure("Mach-O d3n0l4nd section is truncated");
		locateIntelTrailers = async (carrier, base, sliceSize, owned) => {
			const overlap = INTEL_SENTINEL.length + 8;
			let position = base + sliceSize;
			let tail = Buffer.alloc(0);
			let examined = 0;
			let trailers = [];
			/** Sentinels of marker-confirmed trailers whose payload runs past the slice. */
			let truncated = [];
			/** Sentinels of marker-confirmed trailers too short to hold their marker. */
			let undersized = [];
			const pending = () => trailers.length > 0 || truncated.length > 0 || undersized.length > 0;
			while (position > base) {
				abortIfNeeded(carrier.signal);
				const chunkStart = Math.max(base, position - INTEL_CHUNK_BYTES);
				const chunk = await readArtifactRange(carrier, chunkStart, position - chunkStart);
				if (chunk === undefined) {
					if (pending()) throw denoCarrierFailure("Intel Mach-O slice is truncated");
					return {
						found: [],
						unread: "is truncated before its trailer search"
					};
				}
				const window = tail.length === 0 ? chunk : Buffer.concat([chunk, tail]);
				let searchFrom = chunk.length - 1;
				while (searchFrom >= 0) {
					const index = window.lastIndexOf(INTEL_SENTINEL, searchFrom);
					if (index < 0 || index > searchFrom) break;
					examined += 1;
					if (examined > MAX_DENO_INTEL_TRAILER_SENTINELS) {
						if (pending()) throw denoIntelSentinelLimit();
						return {
							found: [],
							unread: `has more than ${String(MAX_DENO_INTEL_TRAILER_SENTINELS)} trailer sentinels`
						};
					}
					const lengthAt = index + INTEL_SENTINEL.length;
					const sentinelStart = chunkStart + index;
					searchFrom = index - 1;
					const at = BigInt(sentinelStart);
					if (owned.some((range) => at >= range.start && at < range.end)) continue;
					if (lengthAt + 8 > window.length) continue;
					const claimed = new BinaryReader(window, true, "deno").word(lengthAt, 64);
					const sliceEnd = base + sliceSize;
					const offset = sentinelStart + INTEL_SENTINEL.length + 8;
					if (offset < base || offset > sliceEnd) continue;
					const marker = await readArtifactRange(carrier, offset, DENO_SECTION_MAGIC.length);
					if (marker === undefined || !marker.equals(DENO_SECTION_MAGIC)) continue;
					if (claimed < BigInt(DENO_SECTION_MAGIC.length)) {
						undersized.push(sentinelStart);
						continue;
					}
					if (claimed > BigInt(sliceEnd - offset)) {
						truncated.push(sentinelStart);
						continue;
					}
					const length = Number(claimed);
					const end = offset + length;
					const inside = (at) => at >= offset && at < end;
					trailers = trailers.filter((trailer) => !inside(trailer.sentinelOffset));
					truncated = truncated.filter((at) => !inside(at));
					undersized = undersized.filter((at) => !inside(at));
					trailers.push({
						sentinelOffset: sentinelStart,
						offset,
						length,
						embedding: "mach-o-intel-trailer"
					});
				}
				tail = Buffer.from(chunk.subarray(0, Math.min(chunk.length, overlap)));
				position = chunkStart;
			}
			if (truncated.length > 0) throw denoCarrierFailure("Intel Mach-O Deno trailer is truncated");
			if (undersized.length > 0) throw denoCarrierFailure("Intel Mach-O Deno trailer length is shorter than its marker");
			return {
				found: trailers,
				unread: null
			};
		};
		locateElfNotes$1 = async (carrier) => {
			const prefix = await readArtifactRange(carrier, 0, Math.min(carrier.fileSize, 64));
			if (prefix === undefined) return [];
			const header = readElfFixedHeader(prefix, carrier.fileSize);
			if (!header.ok) return [];
			const headerBytes = prefix.length >= header.value.headerSize ? prefix.subarray(0, header.value.headerSize) : await readArtifactRange(carrier, 0, header.value.headerSize);
			if (headerBytes === undefined) return [];
			const raw = readElfRawTableDeclarations(headerBytes, header.value);
			if (!raw.ok) return [];
			const walk = {
				found: [],
				damage: undefined
			};
			const damaged = (detail) => {
				walk.damage ??= denoCarrierFailure(detail);
			};
			const little = header.value.byteOrder === "little";
			const { elfClass } = header.value;
			const { programs, sections } = raw.value;
			if (programs.count === PN_XNUM) damaged("ELF extended program numbering is unsupported");
			const sectionTable = validateElfSectionTableFields(raw.value);
			if (!sectionTable.ok) damaged(sectionTable.error);
			else if (sections.count === 0 && sections.offset !== 0n) damaged("ELF extended section numbering is unsupported");
			const programHeaders = programs.count === PN_XNUM ? undefined : await readElfHeaderTable(carrier, walk, programs, elfProgramHeaderWidth(elfClass), "program header table");
			const sectionHeaders = sectionTable.ok ? await readElfHeaderTable(carrier, walk, sections, elfSectionHeaderWidth(elfClass), "section header table") : undefined;
			const tables = new Map();
			const addTable = (offset, length, align) => {
				if (offset < 0n || length < 0n || offset > BigInt(carrier.fileSize) || length > BigInt(carrier.fileSize) - offset) {
					damaged("ELF note table is truncated");
					return;
				}
				const fileOffset = Number(offset);
				const fileLength = Number(length);
				const alignment = elfNoteAlignment(align);
				const key = `${String(fileOffset)}:${String(fileLength)}:${String(alignment)}`;
				const existing = tables.get(key);
				if (existing !== undefined) {
					existing.copies += 1;
					return;
				}
				tables.set(key, {
					offset: fileOffset,
					length: fileLength,
					alignment,
					copies: 1
				});
			};
			if (programHeaders !== undefined) for (let index = 0; index < programHeaders.length; index += programs.width) {
				if (index % (programs.width * 128) === 0) abortIfNeeded(carrier.signal);
				const parsed = readElfProgramHeader(programHeaders.subarray(index, index + programs.width), header.value.elfClass, little);
				if (!parsed.ok) {
					damaged(parsed.error.message);
					continue;
				}
				if (parsed.value.type !== PT_NOTE$1) continue;
				addTable(parsed.value.offset, parsed.value.fileSize, parsed.value.alignment);
			}
			if (sectionHeaders !== undefined) for (let index = 0; index < sectionHeaders.length; index += sections.width) {
				if (index % (sections.width * 128) === 0) abortIfNeeded(carrier.signal);
				const parsed = readElfSectionHeader(sectionHeaders.subarray(index, index + sections.width), header.value.elfClass, little);
				if (!parsed.ok) {
					damaged(parsed.error.message);
					continue;
				}
				const storage = elfNoteSectionStorage(parsed.value);
				if (storage === "not-note") continue;
				if (storage === "compressed") {
					damaged("compressed ELF note sections are unsupported");
					continue;
				}
				addTable(parsed.value.offset, parsed.value.size, parsed.value.alignment);
			}
			let minimumNotes = 0;
			for (const table of tables.values()) if (table.length > 0) minimumNotes += table.copies;
			let examined = 0;
			if (minimumNotes > 256) walk.damage ??= denoElfNoteLimit();
			else for (const table of tables.values()) {
				const notes = await scanElfNoteTable$1(carrier, walk, table, little, examined);
				examined += notes * table.copies;
				if (examined > 256) break;
			}
			if (walk.found.length > 0 && walk.damage !== undefined) throw walk.damage;
			return walk.found;
		};
		readElfHeaderTable = async (carrier, walk, table, canonicalWidth, label) => {
			if (table.count === 0) return undefined;
			const bytes = table.count * canonicalWidth;
			const body = table.width === canonicalWidth && table.offset <= BigInt(carrier.fileSize) ? await readArtifactRange(carrier, Number(table.offset), bytes) : undefined;
			if (body === undefined) walk.damage ??= denoCarrierFailure(`ELF ${label} cannot be read`);
			return body;
		};
		scanElfNoteTable$1 = async (carrier, walk, table, little, examined) => {
			const stop = (detail, notes) => {
				walk.damage ??= denoCarrierFailure(detail);
				return notes;
			};
			let cursor = 0;
			let notes = 0;
			while (cursor + 12 <= table.length) {
				abortIfNeeded(carrier.signal);
				notes += 1;
				if (examined + notes * table.copies > 256) {
					walk.damage ??= denoElfNoteLimit();
					return notes;
				}
				const header = await readArtifactRange(carrier, table.offset + cursor, 12);
				if (header === undefined) return stop("ELF note header is truncated", notes);
				const parsed = readElfNoteFrame(header, little, table.alignment, table.length - cursor);
				if (!parsed.ok) return stop(parsed.error.message, notes);
				const { namesz, descsz, type, descriptor, next, framing } = parsed.value;
				const sui = namesz === ELF_NOTE_OWNER.length && type === ELF_NOTE_TYPE;
				if (framing !== "complete") {
					if (sui && await confirmsSuiNote(carrier, table, cursor, descriptor)) throw denoCarrierFailure("ELF SUI note entry exceeds its table");
					return stop("ELF note entry exceeds its table", notes);
				}
				if (sui) {
					const name = await readArtifactRange(carrier, table.offset + cursor + 12, namesz);
					if (name === undefined) return stop("ELF note name is truncated", notes);
					if (name.equals(ELF_NOTE_OWNER)) {
						const payload = await readSuiRange(carrier, table.offset + cursor + descriptor, descsz);
						if (payload !== undefined) walk.found.push(payload);
					}
				}
				cursor += next;
			}
			if (cursor >= table.length) return notes;
			const counted = Math.max(notes, 1);
			const tailIssue = examined + counted * table.copies > 256 ? denoElfNoteLimit() : await noteTableTailIssue(carrier, table, cursor);
			walk.damage ??= tailIssue;
			return counted;
		};
		noteTableTailIssue = async (carrier, table, cursor) => {
			const tail = await readArtifactRange(carrier, table.offset + cursor, table.length - cursor);
			if (tail === undefined) return denoCarrierFailure("ELF note table is truncated");
			if (!isElfNotePadding(tail)) return denoCarrierFailure("ELF note table has trailing non-zero bytes");
			return undefined;
		};
		confirmsSuiNote = async (carrier, table, cursor, descriptor) => {
			const wanted = descriptor + 2 + SECTION_NAME_BYTES.length;
			if (wanted > table.length - cursor) return false;
			const at = table.offset + cursor;
			const name = await readArtifactRange(carrier, at + 12, ELF_NOTE_OWNER.length);
			if (name === undefined || !name.equals(ELF_NOTE_OWNER)) return false;
			const prefix = await readArtifactRange(carrier, at + descriptor, 2 + SECTION_NAME_BYTES.length);
			return prefix !== undefined && new BinaryReader(prefix, true, "deno").u16(0) === SECTION_NAME_BYTES.length && prefix.subarray(2).equals(SECTION_NAME_BYTES);
		};
		readSuiRange = async (carrier, descriptorOffset, descriptorLength) => {
			if (descriptorLength < 2) return undefined;
			const wanted = Math.min(descriptorLength, 2 + SECTION_NAME_BYTES.length);
			const prefix = await readArtifactRange(carrier, descriptorOffset, wanted);
			if (prefix === undefined) throw denoCarrierFailure("ELF SUI descriptor is truncated");
			const nameLength = new BinaryReader(prefix, true, "deno").u16(0);
			if (nameLength !== SECTION_NAME_BYTES.length) return undefined;
			if (2 + nameLength > descriptorLength || prefix.length < 2 + nameLength) return undefined;
			if (!prefix.subarray(2, 2 + nameLength).equals(SECTION_NAME_BYTES)) return undefined;
			const length = descriptorLength - 2 - nameLength;
			const offset = descriptorOffset + 2 + nameLength;
			if (offset > carrier.fileSize || length > carrier.fileSize - offset) throw denoCarrierFailure("ELF SUI descriptor is truncated");
			return {
				offset,
				length,
				embedding: "elf-note"
			};
		};
		locatePeResources$1 = async (carrier, prefix) => {
			let payloads;
			try {
				payloads = await locatePeResourcePayloads(prefix, carrier.fileSize, (offset, length) => readArtifactRange(carrier, offset, length), RT_RCDATA$1, RESOURCE_NAME$1, MAX_INSPECT_PE_DIRECTORY_ENTRIES);
			} catch (cause) {
				if (cause instanceof ParseFailureError && cause.failure.kind === "limit") {
					const parserLimit = cause.failure.limit;
					throw new ArtifactReaderFailure("limit", cause.message, {
						cause,
						boundary: "capacity",
						parserLimit,
						fixedAllowance: {
							kind: "parser",
							name: parserLimit.name,
							limit: parserLimit.maximum,
							unit: "entries"
						}
					});
				}
				throw artifactParseFailure(cause, undefined);
			}
			return payloads.map(({ offset, bytes }) => {
				if (bytes > 536870912) throw denoPeLimit();
				return {
					offset,
					length: bytes,
					embedding: "pe-resource"
				};
			});
		};
		collapseRanges$1 = async (carrier, kind, ranges) => {
			const unique = [];
			const seen = new Set();
			for (const range of ranges) {
				const key = `${String(range.offset)}:${String(range.length)}`;
				if (seen.has(key)) continue;
				seen.add(key);
				unique.push(range);
			}
			const chosen = unique[0];
			if (chosen === undefined) return undefined;
			if (unique.length > 1) {
				const conflict = () => denoCarrierFailure("Deno compile section is declared more than once with different bytes");
				if (unique.some((range) => range.length !== chosen.length)) throw conflict();
				let remainingBytes = carrier.fileSize;
				let chosenHash;
				for (const range of unique) {
					if (range.length > remainingBytes) throw denoLimit("Deno compile duplicate-section verification exceeds the carrier file-size byte allowance. This release has no runtime override.", "capacity");
					remainingBytes -= range.length;
					const hash = await hashArtifactRange(carrier, range.offset, range.length);
					if (hash === undefined) throw denoCarrierFailure("Deno compile section is truncated");
					if (chosenHash === undefined) chosenHash = hash;
					else if (hash !== chosenHash) throw conflict();
				}
			}
			return {
				carrier: kind,
				embedding: chosen.embedding,
				offset: chosen.offset,
				length: chosen.length
			};
		};
		fixedCString = (bytes) => {
			const end = bytes.indexOf(0);
			return Buffer.from(end < 0 ? bytes : bytes.subarray(0, end)).toString("latin1");
		};
		denoCarrierFailure = (detail) => new ArtifactReaderFailure("format", `Deno compile carrier is malformed: ${detail}`);
		denoLimit = (message, boundary) => new ArtifactReaderFailure("limit", message, {
			boundary,
			userMessage: message
		});
		denoIntelSentinelLimit = () => denoLimit(`Deno compile Intel trailer search exceeds the fixed ${String(MAX_DENO_INTEL_TRAILER_SENTINELS)}-sentinel allowance before reaching the start of the image, so an enclosing trailer may remain unread. This release has no runtime override.`, "capacity");
		denoElfNoteLimit = () => denoLimit(`Deno compile ELF notes exceed the fixed ${String(256)}-note allowance. This release has no runtime override. Host memory and NODE_OPTIONS do not raise it.`, "capacity");
		denoPeLimit = () => denoLimit("Deno compile PE resource payload exceeds the 512 MiB resource reader ceiling. This release has no runtime override.", "file-size");
	})))();
}

//#endregion
//#region dist/artifacts/dotnet/DotnetBundle.js
var DOTNET_BUNDLE_SIGNATURE, findDotnetBundleHeader, readDotnetBundle, BundleCursor, fitsBeforeManifest, exactManifestInteger, fail;
function init_DotnetBundle() {
	return (init_DotnetBundle = __esmMin((() => {
		init_binaryContainer();
		init_artifactReaderLimits();
		init_resources();
		init_strictUtf8();
		DOTNET_BUNDLE_SIGNATURE = Buffer.from("8b1202b96a612038727b930214d7a03213f5b9e6efae3318ee3b2dce24b36aae", "hex");
		findDotnetBundleHeader = async (handle, size, signal, markerSearchEnd = size) => {
			abortIfNeeded(signal);
			let tail = Buffer.alloc(0);
			if (markerSearchEnd === 0) return undefined;
			for await (const value of readArtifactFileChunks(handle, {
				end: markerSearchEnd - 1,
				signal
			})) {
				abortIfNeeded(signal);
				const chunk = value;
				const bytes = Buffer.concat([tail, chunk]);
				for (let index = bytes.indexOf(DOTNET_BUNDLE_SIGNATURE); index >= 0; index = bytes.indexOf(DOTNET_BUNDLE_SIGNATURE, index + 1)) {
					if (index < 8) continue;
					const offset = new BinaryReader(bytes, true, "dotnet-bundle").word(index - 8, 64);
					if (offset === 0n) return undefined;
					if (offset > BigInt(size - 12)) fail(".NET bundle header is outside the host file");
					return Number(offset);
				}
				tail = bytes.subarray(Math.max(0, bytes.length - 39));
			}
			return undefined;
		};
		readDotnetBundle = async (handle, size, headerOffset, signal, limits = DEFAULT_DOTNET_BUNDLE_READER_LIMITS) => {
			const cursor = new BundleCursor(handle, size, headerOffset, limits, signal);
			const majorVersion = await cursor.u32();
			const minorVersion = await cursor.u32();
			if (![
				1,
				2,
				6
			].includes(majorVersion) || minorVersion !== 0) throw new ArtifactReaderFailure("unavailable", `Unsupported .NET bundle header ${majorVersion}.${minorVersion}; supported versions are 1.0, 2.0 and 6.0`);
			const count = await cursor.i32();
			if (count < 0) fail(".NET bundle entry count is negative");
			const minimumEntry = majorVersion === 6 ? 26 : 18;
			const afterBundleId = (majorVersion >= 2 ? 40 : 0) + count * minimumEntry;
			if (1 + afterBundleId > cursor.remainingBytes) fail(".NET bundle entry count cannot fit in the manifest");
			if (count > limits.entry_count) throw artifactReaderLimitFailure("artifact_limits.dotnet_bundle.entry_count", limits.entry_count, "count", count);
			await cursor.string(afterBundleId);
			const manifestStart = BigInt(headerOffset);
			const configuration = [];
			if (majorVersion >= 2) {
				for (const type of [3, 4]) {
					const offset = await cursor.nonnegativeI64();
					const size = await cursor.nonnegativeI64();
					if (!fitsBeforeManifest(offset, size, manifestStart)) fail(".NET bundle configuration location disagrees with its file table");
					configuration.push({
						offset: Number(offset),
						size: Number(size),
						type
					});
				}
				const flags = await cursor.u64();
				if (flags > 1n) throw new ArtifactReaderFailure("unavailable", `Unsupported .NET bundle flags: ${flags}`);
			}
			const files = [];
			const paths = new ArtifactPathRegistry({
				maxParts: limits.path_parts,
				maxNodes: limits.path_nodes,
				limitFailure: (field, maximum, required) => artifactReaderLimitFailure(`artifact_limits.dotnet_bundle.${field}`, maximum, "count", required)
			});
			let expandedBytes = 0n;
			for (let index = 0; index < count; index++) {
				abortIfNeeded(signal);
				const declaredOffset = await cursor.nonnegativeI64();
				const declaredSize = await cursor.nonnegativeI64();
				const declaredCompressedSize = majorVersion === 6 ? await cursor.nonnegativeI64() : 0n;
				const declaredStoredSize = declaredCompressedSize || declaredSize;
				if (!fitsBeforeManifest(declaredOffset, declaredStoredSize, manifestStart)) fail(`.NET bundle entry crosses the manifest or file boundary (entry ${index + 1}, offset ${declaredOffset}, stored size ${declaredStoredSize})`);
				const fileType = await cursor.u8();
				const path = await cursor.string((count - index - 1) * minimumEntry);
				const offset = Number(declaredOffset);
				const storedSize = Number(declaredStoredSize);
				const compressedSize = Number(declaredCompressedSize);
				const fileSize = exactManifestInteger(declaredSize);
				const normalized = normalizeArtifactPath(path);
				paths.add(normalized, "file");
				if (fileSize > limits.member_bytes || compressedSize > limits.member_bytes) throw artifactReaderLimitFailure("artifact_limits.dotnet_bundle.member_bytes", limits.member_bytes, "bytes", Math.max(fileSize, compressedSize));
				expandedBytes += BigInt(fileSize);
				if (expandedBytes > BigInt(limits.expanded_bytes)) throw artifactReaderLimitFailure("artifact_limits.dotnet_bundle.expanded_bytes", limits.expanded_bytes, "bytes", expandedBytes);
				files.push({
					path,
					offset,
					size: fileSize,
					compressedSize,
					storedSize,
					fileType
				});
			}
			const ranges = files.filter((file) => file.storedSize > 0).toSorted((a, b) => a.offset - b.offset);
			let end = 0;
			for (const file of ranges) {
				if (file.offset < end) fail(`Overlapping .NET bundle entries: ${file.path}`);
				end = file.offset + file.storedSize;
			}
			for (const item of configuration) {
				if (item.offset === 0 && item.size === 0) continue;
				if (!files.some((file) => file.fileType === item.type && file.offset === item.offset && file.size === item.size && file.compressedSize === 0)) fail(".NET bundle configuration location disagrees with its file table");
			}
			return {
				majorVersion,
				minorVersion,
				headerOffset,
				files
			};
		};
		BundleCursor = class {
			handle;
			size;
			start;
			limits;
			signal;
			#position;
			#cache = new BinaryReader(Buffer.alloc(0), true, "dotnet-bundle");
			#cacheOffset = 0;
			constructor(handle, size, start, limits, signal) {
				this.handle = handle;
				this.size = size;
				this.start = start;
				this.limits = limits;
				this.signal = signal;
				this.#position = start;
			}
			get remainingBytes() {
				return this.size - this.#position;
			}
			#requireRemaining(length) {
				const remaining = this.remainingBytes;
				if (length > remaining) fail("Truncated .NET bundle manifest");
				return remaining;
			}
			async #advance(length) {
				abortIfNeeded(this.signal);
				const remaining = this.#requireRemaining(length);
				const consumed = this.#position - this.start;
				if (consumed + length > this.limits.metadata_bytes) throw artifactReaderLimitFailure("artifact_limits.dotnet_bundle.metadata_bytes", this.limits.metadata_bytes, "bytes", consumed + length);
				const cached = this.#position - this.#cacheOffset;
				if (cached < 0 || cached + length > this.#cache.bytes.length) {
					const cacheOffset = this.#position;
					const bytes = Buffer.alloc(Math.min(Math.max(length, 64 * 1024), remaining, this.limits.metadata_bytes - consumed));
					let read = 0;
					while (read < bytes.length) {
						abortIfNeeded(this.signal);
						const reply = await this.handle.read(bytes, read, bytes.length - read, cacheOffset + read);
						abortIfNeeded(this.signal);
						if (reply.bytesRead === 0) fail("Truncated .NET bundle manifest");
						read += reply.bytesRead;
					}
					this.#cache = new BinaryReader(bytes, true, "dotnet-bundle");
					this.#cacheOffset = cacheOffset;
				}
				const at = this.#position - this.#cacheOffset;
				this.#position += length;
				return at;
			}
			async u8() {
				const at = await this.#advance(1);
				return this.#cache.u8(at);
			}
			async u32() {
				const at = await this.#advance(4);
				return this.#cache.u32(at);
			}
			async i32() {
				const at = await this.#advance(4);
				return this.#cache.i32(at);
			}
			async nonnegativeI64() {
				const at = await this.#advance(8);
				const value = this.#cache.i64(at);
				if (value < 0n) fail(".NET bundle offset or size is negative");
				return value;
			}
			async u64() {
				const at = await this.#advance(8);
				return this.#cache.word(at, 64);
			}
			async string(minimumTailBytes) {
				let length = 0;
				for (let shift = 0; shift <= 28; shift += 7) {
					const byte = await this.u8();
					if (shift === 28 && byte > 7) fail("Invalid .NET bundle string length");
					length += (byte & 127) * 2 ** shift;
					if ((byte & 128) !== 0) continue;
					this.#requireRemaining(length + minimumTailBytes);
					if (length > this.limits.string_bytes) throw artifactReaderLimitFailure("artifact_limits.dotnet_bundle.string_bytes", this.limits.string_bytes, "bytes", length);
					const at = await this.#advance(length);
					const bytes = this.#cache.range(at, length, "manifest string");
					try {
						return strictUtf8Decoder("preserve").decode(bytes);
					} catch (cause) {
						throw new ArtifactReaderFailure("format", "Invalid UTF-8 in .NET bundle manifest", { cause });
					}
				}
				return fail("Invalid .NET bundle string length");
			}
		};
		fitsBeforeManifest = (offset, size, manifestStart) => offset <= manifestStart && size <= manifestStart - offset;
		exactManifestInteger = (value) => {
			if (value > BigInt(Number.MAX_SAFE_INTEGER)) throw artifactFixedLimitFailure({
				name: "The .NET bundle exact integer range",
				kind: "parser",
				limit: Number.MAX_SAFE_INTEGER,
				unit: "integer units"
			}, `A .NET bundle offset or size of ${String(value)} is above the exact integer range of ${String(Number.MAX_SAFE_INTEGER)}.`);
			return Number(value);
		};
		fail = (message) => {
			throw new ArtifactReaderFailure("format", message);
		};
	})))();
}

//#endregion
//#region dist/artifacts/nodeSea/NodeSeaBlob.js
var NODE_SEA_MAGIC, SIZE_BYTES, MIN_ASSET_ROW_BYTES, FLAG_DISABLE_EXPERIMENTAL_SEA_WARNING, FLAG_USE_SNAPSHOT, FLAG_USE_CODE_CACHE, FLAG_INCLUDE_ASSETS, FLAG_INCLUDE_EXEC_ARGV, KNOWN_FLAGS, NODE_SEA_BAD_MAGIC, NODE_SEA_TRUNCATED, NODE_SEA_UNKNOWN_FLAGS, NODE_SEA_UNKNOWN_EXTENSION, NODE_SEA_TRAILING_BYTES, NODE_SEA_DUPLICATE_BLOB, NODE_SEA_ELF_DESCRIPTOR_TRUNCATED, NODE_SEA_ELF_TABLE_TRUNCATED, NODE_SEA_ELF_NOTES_REPEATED, NODE_SEA_MACHO_COMMANDS_TRUNCATED, NODE_SEA_MACHO_SEGMENT_TRUNCATED, NODE_SEA_FUSE_ABSENT, NODE_SEA_FUSE_UNSET, NODE_SEA_FUSE_CONFLICT, NODE_SEA_EMPTY_CODE_PATH, NODE_SEA_INVALID_UTF8, FUSE_PREFIX, formatFailure$7, decodeNodeSeaBlob, observeNodeSeaFuseMatches, extensionName, BlobCursor;
function init_NodeSeaBlob() {
	return (init_NodeSeaBlob = __esmMin((() => {
		init_resources();
		init_artifactReaderLimits();
		init_binaryContainer();
		init_parseFailure();
		init_strictUtf8();
		NODE_SEA_MAGIC = 21223968;
		SIZE_BYTES = 8;
		MIN_ASSET_ROW_BYTES = 2 * SIZE_BYTES;
		FLAG_DISABLE_EXPERIMENTAL_SEA_WARNING = 1 << 0;
		FLAG_USE_SNAPSHOT = 1 << 1;
		FLAG_USE_CODE_CACHE = 1 << 2;
		FLAG_INCLUDE_ASSETS = 1 << 3;
		FLAG_INCLUDE_EXEC_ARGV = 1 << 4;
		KNOWN_FLAGS = FLAG_DISABLE_EXPERIMENTAL_SEA_WARNING | FLAG_USE_SNAPSHOT | FLAG_USE_CODE_CACHE | FLAG_INCLUDE_ASSETS | FLAG_INCLUDE_EXEC_ARGV;
		NODE_SEA_BAD_MAGIC = "Node SEA blob magic is not 0x143da20";
		NODE_SEA_TRUNCATED = "Node SEA blob is truncated";
		NODE_SEA_UNKNOWN_FLAGS = "Node SEA blob flags contain unknown bits";
		NODE_SEA_UNKNOWN_EXTENSION = "Node SEA exec argv extension is unknown";
		NODE_SEA_TRAILING_BYTES = "Node SEA blob has trailing bytes";
		NODE_SEA_DUPLICATE_BLOB = "Node SEA blob is declared more than once";
		NODE_SEA_ELF_DESCRIPTOR_TRUNCATED = "Node SEA ELF note descriptor is truncated";
		NODE_SEA_ELF_TABLE_TRUNCATED = "Node SEA ELF note table is truncated";
		NODE_SEA_ELF_NOTES_REPEATED = "Node SEA ELF note tables declare more notes than the file holds";
		NODE_SEA_MACHO_COMMANDS_TRUNCATED = "Node SEA Mach-O load commands are truncated";
		NODE_SEA_MACHO_SEGMENT_TRUNCATED = "Node SEA Mach-O segment table is truncated";
		NODE_SEA_FUSE_ABSENT = "Node SEA blob is present but no NODE_SEA_FUSE sentinel was observed";
		NODE_SEA_FUSE_UNSET = "Node SEA blob is present but the NODE_SEA_FUSE sentinel is unset";
		NODE_SEA_FUSE_CONFLICT = "Node SEA fuse sentinels disagree";
		NODE_SEA_EMPTY_CODE_PATH = "Node SEA code path is empty";
		NODE_SEA_INVALID_UTF8 = "Node SEA string is not valid UTF-8";
		FUSE_PREFIX = "NODE_SEA_FUSE_";
		formatFailure$7 = (message, cause) => new ArtifactReaderFailure("format", message, cause === undefined ? undefined : { cause });
		decodeNodeSeaBlob = async (bytes, signal, limits = DEFAULT_NODE_SEA_READER_LIMITS) => {
			assertArtifactReadActive(signal);
			if (bytes.length > limits.blob_bytes) throw artifactReaderLimitFailure("artifact_limits.node_sea.blob_bytes", limits.blob_bytes, "bytes", bytes.length, "memory");
			const cursor = new BlobCursor(bytes, limits);
			if (cursor.remaining < 4) throw formatFailure$7(NODE_SEA_TRUNCATED);
			const magic = cursor.u32();
			if (magic !== NODE_SEA_MAGIC) throw formatFailure$7(NODE_SEA_BAD_MAGIC);
			if (cursor.remaining < 5) throw formatFailure$7(NODE_SEA_TRUNCATED);
			const flags = cursor.u32();
			if ((flags & ~KNOWN_FLAGS) !== 0) throw formatFailure$7(NODE_SEA_UNKNOWN_FLAGS);
			const execArgvExtension = extensionName(cursor.u8());
			const mainCodeFormat = cursor.mainCodeFormat();
			const useSnapshot = (flags & FLAG_USE_SNAPSHOT) !== 0;
			const useCodeCache = (flags & FLAG_USE_CODE_CACHE) !== 0;
			const includeAssets = (flags & FLAG_INCLUDE_ASSETS) !== 0;
			const includeExecArgv = (flags & FLAG_INCLUDE_EXEC_ARGV) !== 0;
			const argumentHeaderBytes = includeExecArgv ? SIZE_BYTES : 0;
			const collectionHeaderBytes = (includeAssets ? SIZE_BYTES : 0) + argumentHeaderBytes;
			const afterBody = (useCodeCache ? SIZE_BYTES : 0) + collectionHeaderBytes;
			const codePath = cursor.text(false, NODE_SEA_EMPTY_CODE_PATH, SIZE_BYTES + afterBody);
			if (codePath.startsWith("\0")) throw formatFailure$7("Node SEA code path begins with a NUL byte");
			const body = cursor.byteRange(afterBody);
			const codeCache = useCodeCache ? cursor.byteRange(collectionHeaderBytes) : null;
			const assets = includeAssets ? await cursor.assets(argumentHeaderBytes, signal) : [];
			const execArgv = includeExecArgv ? await cursor.execArgv(signal) : [];
			if (await cursor.hasNonZeroTail(signal)) throw formatFailure$7(NODE_SEA_TRAILING_BYTES);
			return {
				magic: NODE_SEA_MAGIC,
				flags,
				disableExperimentalSeaWarning: (flags & FLAG_DISABLE_EXPERIMENTAL_SEA_WARNING) !== 0,
				useSnapshot,
				useCodeCache,
				includeAssets,
				includeExecArgv,
				execArgvExtension,
				...mainCodeFormat === undefined ? {} : { mainCodeFormat },
				codePath,
				mainScript: useSnapshot ? null : body,
				snapshot: useSnapshot ? body : null,
				codeCache,
				assets,
				execArgv
			};
		};
		observeNodeSeaFuseMatches = (matches) => {
			const unique = [...new Set(matches)];
			if (unique.length === 0) return {
				fuseState: "absent",
				fuseSentinel: null,
				fuseContradiction: NODE_SEA_FUSE_ABSENT
			};
			const hashes = new Set(unique.map((item) => item.slice(FUSE_PREFIX.length, FUSE_PREFIX.length + 32)));
			const digits = new Set(unique.map((item) => item.at(-1)));
			if (hashes.size !== 1 || digits.size !== 1) return {
				fuseState: "conflicting",
				fuseSentinel: null,
				fuseContradiction: NODE_SEA_FUSE_CONFLICT
			};
			const sentinel = unique[0];
			if (sentinel === undefined) throw formatFailure$7(NODE_SEA_FUSE_CONFLICT);
			if (digits.has("1")) return {
				fuseState: "set",
				fuseSentinel: sentinel,
				fuseContradiction: null
			};
			return {
				fuseState: "unset",
				fuseSentinel: sentinel,
				fuseContradiction: NODE_SEA_FUSE_UNSET
			};
		};
		extensionName = (value) => {
			if (value === 0) return "none";
			if (value === 1) return "env";
			if (value === 2) return "cli";
			throw formatFailure$7(NODE_SEA_UNKNOWN_EXTENSION);
		};
		BlobCursor = class {
			bytes;
			limits;
			#offset = 0;
			#reader;
			constructor(bytes, limits) {
				this.bytes = bytes;
				this.limits = limits;
				this.#reader = new BinaryReader(bytes, true, "Node SEA");
			}
			get remaining() {
				return this.bytes.length - this.#offset;
			}
			u32() {
				return this.#reader.u32(this.#takeOffset(4));
			}
			u8() {
				return this.bytes[this.#takeOffset(1)];
			}
			/** The byte after the legacy size field is either the first path byte or the
			* high byte of the newer size field. A producer cannot open a path that
			* starts with NUL, and a readable blob cannot fit a size of 2^56 or more.
			*/
			mainCodeFormat() {
				if (this.bytes[this.#offset + SIZE_BYTES] !== 0) return undefined;
				const value = this.u8();
				if (value === 0) return "commonjs";
				if (value === 1) return "module";
				throw formatFailure$7("Node SEA main code format is unknown");
			}
			/** `charge` sees the raw byte length before decoding allocates a string. */
			text(allowEmpty, emptyMessage, minimumTailBytes, charge) {
				const length = this.#size(minimumTailBytes);
				charge?.(length);
				const offset = this.#takeOffset(length);
				const raw = this.bytes.subarray(offset, offset + length);
				let text;
				try {
					text = strictUtf8Decoder("preserve").decode(raw);
				} catch (cause) {
					if (hostRangeErrorKind(cause) === "host-capacity") throw new ArtifactReaderFailure("limit", "Node SEA UTF-8 text exceeds this runtime's string or memory capacity. Admission budgets do not raise runtime representation limits or reserve host memory.", {
						boundary: "memory",
						cause
					});
					throw formatFailure$7(NODE_SEA_INVALID_UTF8, cause);
				}
				if (!allowEmpty && text.length === 0) throw formatFailure$7(emptyMessage);
				return text;
			}
			byteRange(minimumTailBytes) {
				const length = this.#size(minimumTailBytes);
				return {
					offset: this.#takeOffset(length),
					length
				};
			}
			async assets(minimumTailBytes, signal) {
				const count = this.#count("asset_count", MIN_ASSET_ROW_BYTES, minimumTailBytes);
				const seen = new Set();
				const assets = [];
				let nameBytes = 0;
				const charge = (bytes) => {
					nameBytes += bytes;
					if (nameBytes > this.limits.asset_name_bytes) throw artifactReaderLimitFailure("artifact_limits.node_sea.asset_name_bytes", this.limits.asset_name_bytes, "bytes", nameBytes, "memory");
				};
				for (let index = 0; index < count; index += 1) {
					if (index % 256 === 0) {
						await setImmediate();
						assertArtifactReadActive(signal);
					}
					const tail = (count - index - 1) * MIN_ASSET_ROW_BYTES + minimumTailBytes;
					const name = this.text(true, NODE_SEA_INVALID_UTF8, SIZE_BYTES + tail, charge);
					if (seen.has(name)) throw formatFailure$7(`Node SEA asset name collides: ${name}`);
					seen.add(name);
					assets.push({
						name,
						range: this.byteRange(tail)
					});
				}
				return assets;
			}
			async execArgv(signal) {
				const count = this.#count("argument_count", SIZE_BYTES, 0);
				const values = [];
				let textBytes = 0;
				const charge = (bytes) => {
					textBytes += bytes;
					if (textBytes > this.limits.argument_bytes) throw artifactReaderLimitFailure("artifact_limits.node_sea.argument_bytes", this.limits.argument_bytes, "bytes", textBytes, "memory");
				};
				for (let index = 0; index < count; index += 1) {
					if (index % 256 === 0) {
						await setImmediate();
						assertArtifactReadActive(signal);
					}
					const tail = (count - index - 1) * SIZE_BYTES;
					values.push(this.text(true, NODE_SEA_INVALID_UTF8, tail, charge));
				}
				return values;
			}
			async hasNonZeroTail(signal) {
				for (let start = this.#offset; start < this.bytes.length; start += 64 * 1024) {
					await setImmediate();
					assertArtifactReadActive(signal);
					const end = Math.min(start + 64 * 1024, this.bytes.length);
					for (let index = start; index < end; index += 1) if (this.bytes[index] !== 0) return true;
				}
				assertArtifactReadActive(signal);
				return false;
			}
			#readSizeField() {
				return this.#reader.word(this.#takeOffset(SIZE_BYTES), 64);
			}
			#size(minimumTailBytes) {
				const value = this.#readSizeField();
				if (value > BigInt(this.remaining - minimumTailBytes)) throw formatFailure$7(NODE_SEA_TRUNCATED);
				return Number(value);
			}
			#count(field, minimumRowBytes, minimumTailBytes) {
				const value = this.#readSizeField();
				if (value > BigInt(Math.floor((this.remaining - minimumTailBytes) / minimumRowBytes))) throw formatFailure$7(NODE_SEA_TRUNCATED);
				const count = Number(value);
				if (count > this.limits[field]) throw artifactReaderLimitFailure(`artifact_limits.node_sea.${field}`, this.limits[field], "count", count);
				return count;
			}
			#takeOffset(length) {
				if (length > this.remaining) throw formatFailure$7(NODE_SEA_TRUNCATED);
				const start = this.#offset;
				this.#offset += length;
				return start;
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/nodeSea/NodeSeaLocation.js
var PT_NOTE, RT_RCDATA, RESOURCE_NAME, SEA_SECTION, FUSE_LENGTH, EMPTY_MACHO_SLICE, formatFailure$6, limitFailure, admitBlobBytes, locateNodeSea, readNodeSeaBlob, scanNodeSeaFuse, collapseRanges, locateFatMachO, locateThinMachO, locateElfNotes, readElfTables, chargeNoteFrame, scanElfNoteTable, failNoteTable, locatePeResources, cString;
function init_NodeSeaLocation() {
	return (init_NodeSeaLocation = __esmMin((() => {
		init_machoLoadCommandCodes();
		init_ArtifactCarrierRange();
		init_machoSegmentHeader();
		init_machoSectionHeader();
		init_elfSectionHeader();
		init_elfProgramHeader();
		init_elfRawTableDeclarations();
		init_elfDeclaredRanges();
		init_peResourceInventory();
		init_peResourceLayout();
		init_peResources();
		init_resources();
		init_parseFailure();
		init_artifactReaderLimits();
		init_machoContainer();
		init_elfFixedHeader();
		init_machoLoadCommands();
		init_elfNoteLayout();
		init_NodeSeaBlob();
		init_sha256Hex();
		PT_NOTE = 4;
		RT_RCDATA = 10;
		RESOURCE_NAME = "NODE_SEA_BLOB";
		SEA_SECTION = "__NODE_SEA_BLOB";
		FUSE_LENGTH = "NODE_SEA_FUSE_".length + 32 + 2;
		EMPTY_MACHO_SLICE = { ranges: [] };
		formatFailure$6 = (message) => new ArtifactReaderFailure("format", message);
		limitFailure = (message) => new ArtifactReaderFailure("limit", message, { boundary: "memory" });
		admitBlobBytes = (carrier, required) => {
			const limits = carrier.limits ?? DEFAULT_NODE_SEA_READER_LIMITS;
			if (required > limits.blob_bytes) throw artifactReaderLimitFailure("artifact_limits.node_sea.blob_bytes", limits.blob_bytes, "bytes", required, "memory");
			if (required > constants$1.MAX_LENGTH) throw limitFailure(`Node SEA blob requires ${String(required)} bytes, exceeding this runtime's ${String(constants$1.MAX_LENGTH)}-byte Buffer representation limit; increasing artifact_limits.node_sea.blob_bytes cannot raise that runtime limit`);
		};
		locateNodeSea = async (handle, fileSize, signal, limits = DEFAULT_NODE_SEA_READER_LIMITS) => {
			if (!Number.isSafeInteger(fileSize) || fileSize < 4) return undefined;
			const carrier = {
				handle,
				fileSize,
				signal,
				limits
			};
			const prefix = await readArtifactRange(carrier, 0, Math.min(fileSize, 64));
			if (prefix === undefined || prefix.length < 4) return undefined;
			const thin = readMachoHeaderPrefixFacts(prefix).format;
			const fat = readFatHeaderPrefix(prefix);
			if (thin !== null || fat.state === "incomplete" || fat.state === "parsed") {
				const ranges = thin !== null ? (await locateThinMachO(carrier, 0, fileSize)).ranges : await locateFatMachO(carrier, prefix);
				return collapseRanges(carrier, "mach-o", ranges);
			}
			if (prefix.subarray(0, 4).equals(Buffer.from([
				127,
				69,
				76,
				70
			]))) return collapseRanges(carrier, "elf", await locateElfNotes(carrier, prefix));
			if (prefix[0] === 77 && prefix[1] === 90) return collapseRanges(carrier, "pe", await locatePeResources(carrier, prefix));
			return undefined;
		};
		readNodeSeaBlob = async (source, location, signal, limits = DEFAULT_NODE_SEA_READER_LIMITS) => {
			const { handle, initial: { size: fileSize } } = source;
			admitBlobBytes({
				handle,
				fileSize,
				signal,
				limits
			}, location.blobLength);
			const bytes = await readArtifactRange({
				handle,
				fileSize,
				signal
			}, location.blobOffset, location.blobLength);
			if (bytes === undefined) throw formatFailure$6(NODE_SEA_TRUNCATED);
			return bytes;
		};
		scanNodeSeaFuse = async (handle, fileSize, signal) => {
			const carrier = {
				handle,
				fileSize,
				signal
			};
			const matches = new Set();
			const overlap = FUSE_LENGTH - 1;
			let carry = Buffer.alloc(0);
			let position = 0;
			while (position < fileSize) {
				const length = Math.min(64 * 1024, fileSize - position);
				const chunk = await readArtifactRange(carrier, position, length);
				if (chunk === undefined) throw new ArtifactReaderFailure("integrity", "Node SEA carrier shrank during the fuse scan", { integrityCheck: "read-coverage" });
				const window = carry.length === 0 ? chunk : Buffer.concat([carry, chunk]);
				for (const match of window.toString("latin1").matchAll(/NODE_SEA_FUSE_[0-9a-f]{32}:[01]/gu)) if (match[0] !== undefined) {
					matches.add(match[0]);
					if (matches.size > 1) return observeNodeSeaFuseMatches([...matches]);
				}
				carry = window.subarray(Math.max(0, window.length - overlap));
				position += length;
			}
			return observeNodeSeaFuseMatches([...matches]);
		};
		collapseRanges = async (carrier, kind, ranges) => {
			const unique = [];
			const seen = new Set();
			for (const range of ranges) {
				const key = `${String(range.offset)}:${String(range.length)}`;
				if (seen.has(key)) continue;
				seen.add(key);
				unique.push(range);
			}
			const chosen = unique[0];
			if (chosen === undefined) return undefined;
			if (unique.length > 1) {
				if (unique.some((range) => range.length !== chosen.length)) throw formatFailure$6(NODE_SEA_DUPLICATE_BLOB);
				let remainingBytes = carrier.fileSize;
				for (const range of unique) {
					if (range.length > remainingBytes) throw artifactFixedLimitFailure({
						name: "Node SEA duplicate-blob verification allowance",
						kind: "work",
						limit: carrier.fileSize,
						unit: "bytes"
					}, "Node SEA duplicate-blob verification exceeds the carrier-byte work allowance.");
					remainingBytes -= range.length;
				}
				const hashes = new Set();
				for (const range of unique) {
					const hash = await hashArtifactRange(carrier, range.offset, range.length);
					if (hash === undefined) throw formatFailure$6(NODE_SEA_TRUNCATED);
					hashes.add(hash);
				}
				if (hashes.size !== 1) throw formatFailure$6(NODE_SEA_DUPLICATE_BLOB);
			}
			return {
				carrier: kind,
				blobOffset: chosen.offset,
				blobLength: chosen.length
			};
		};
		locateFatMachO = async (carrier, prefix) => {
			let bytes = prefix;
			let header = readFatContainerHeader(bytes, carrier.fileSize);
			if (header.state === "needs-data") {
				const required = await readArtifactRange(carrier, 0, Math.min(carrier.fileSize, header.requiredBytes));
				if (required === undefined || required.length < header.requiredBytes) return [];
				bytes = required;
				header = readFatContainerHeader(bytes, carrier.fileSize);
			}
			if (header.state !== "parsed") {
				if (readMachoHeaderPrefixFacts(bytes).format !== null) return (await locateThinMachO(carrier, 0, carrier.fileSize)).ranges;
				return [];
			}
			const found = [];
			let identityIssue;
			for (const [index, slice] of header.slices.entries()) {
				if (slice === undefined || header.rangeIssues[index] != null) continue;
				const scan = await locateThinMachO(carrier, slice.offset, slice.size, slice);
				for (const range of scan.ranges) found.push(range);
				identityIssue ??= scan.identityIssue;
			}
			if (found.length === 0 && identityIssue !== undefined) throw formatFailure$6(identityIssue);
			return found;
		};
		locateThinMachO = async (carrier, base, sliceSize, fat) => {
			if (!Number.isSafeInteger(base) || !Number.isSafeInteger(sliceSize) || base < 0 || sliceSize < 4 || base > carrier.fileSize || sliceSize > carrier.fileSize - base) return EMPTY_MACHO_SLICE;
			const header = await readArtifactRange(carrier, base, Math.min(32, sliceSize));
			if (header === undefined) return EMPTY_MACHO_SLICE;
			const framing = readMachoLoadCommandTableHeader(header, sliceSize);
			if (!framing.ok || framing.value === null) return EMPTY_MACHO_SLICE;
			const identityIssue = fat === undefined ? null : validateFatSliceIdentity(fat, framing.value.identity);
			const { headerSize, littleEndian: little, commandBytes: sizeofcmds } = framing.value;
			const limits = carrier.limits ?? DEFAULT_NODE_SEA_READER_LIMITS;
			if (sizeofcmds > limits.recognition_load_command_bytes) {
				if (identityIssue !== null) return EMPTY_MACHO_SLICE;
				throw artifactReaderLimitFailure("artifact_limits.node_sea.recognition_load_command_bytes", limits.recognition_load_command_bytes, "bytes", sizeofcmds, "memory");
			}
			const commands = await readArtifactRange(carrier, base + headerSize, sizeofcmds);
			if (commands === undefined) return EMPTY_MACHO_SLICE;
			const found = [];
			const cursor = new MachoLoadCommandCursor(framing.value);
			while (cursor.nextOffset !== null) {
				abortIfNeeded(carrier.signal);
				const read = cursor.read(commands.subarray(cursor.nextOffset));
				if (!read.ok) break;
				const { command: cmd, offset, size } = read.value;
				if (cmd === LC.SEGMENT || cmd === LC.SEGMENT_64) {
					const segment64 = cmd === LC.SEGMENT_64;
					const sectionSize = segment64 ? 80 : 68;
					const parsedSegment = readMachoSegmentHeader(commands.subarray(offset, offset + size), segment64, little);
					const segment = parsedSegment.ok ? parsedSegment.value : undefined;
					const name = segment === undefined ? undefined : cString(segment.nameBytes, 0, 16);
					if (segment !== undefined && (name === "NODE_SEA" || name === "__NODE_SEA")) {
						const segmentHeader = segment.headerSize;
						const nsects = segment.sectionCount;
						const table = offset + segmentHeader;
						if (nsects > Math.floor((size - segmentHeader) / sectionSize)) {
							if (identityIssue !== null) continue;
							throw formatFailure$6(NODE_SEA_MACHO_SEGMENT_TRUNCATED);
						}
						const admission = admitMachoSegmentCommand(segment, size, framing.value.wide ? 64 : 32, sliceSize);
						for (let index = 0; index < nsects; index += 1) {
							const section = table + index * sectionSize;
							const parsedSection = readMachoSectionHeader(commands.subarray(section, section + sectionSize), segment64, little);
							if (!parsedSection.ok) throw formatFailure$6(NODE_SEA_MACHO_SEGMENT_TRUNCATED);
							const record = parsedSection.value;
							if (cString(record.nameBytes, 0, 16) !== SEA_SECTION) continue;
							if (identityIssue !== null) return {
								ranges: [],
								identityIssue
							};
							if (!admission.ok) throw formatFailure$6(`Node SEA ${admission.error.message}`);
							const { issue } = machoSectionBacking(record, segment);
							if (issue !== null) throw formatFailure$6(`Mach-O Node SEA section ${issue}`);
							const fileOffset = record.offset;
							if (fileOffset > sliceSize) throw formatFailure$6(NODE_SEA_TRUNCATED);
							const length = Number(record.size);
							admitBlobBytes(carrier, length);
							found.push({
								offset: base + fileOffset,
								length
							});
						}
					}
				}
			}
			if (found.length > 0 && !cursor.finish().ok) throw formatFailure$6(NODE_SEA_MACHO_COMMANDS_TRUNCATED);
			return { ranges: found };
		};
		locateElfNotes = async (carrier, prefix) => {
			const header = readElfFixedHeader(prefix, carrier.fileSize);
			if (!header.ok) return [];
			const little = header.value.byteOrder === "little";
			const { elfClass } = header.value;
			const fields = await readArtifactRange(carrier, 0, Math.min(carrier.fileSize, header.value.headerSize));
			if (fields === undefined) return [];
			const raw = readElfRawTableDeclarations(fields, header.value);
			if (!raw.ok) return [];
			const { programs: programDeclarations, sections: sectionDeclarations } = raw.value;
			const phoff = programDeclarations.offset <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(programDeclarations.offset) : undefined;
			const shoff = sectionDeclarations.offset <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(sectionDeclarations.offset) : undefined;
			const phentsize = programDeclarations.width;
			const phnum = programDeclarations.count;
			const shentsize = sectionDeclarations.width;
			const shnum = sectionDeclarations.count;
			const found = [];
			let opaque;
			const scan = {
				little,
				frames: Math.floor(carrier.fileSize / 12)
			};
			const programs = await readElfTables(carrier, {
				offset: phoff,
				count: phnum,
				entrySize: phentsize,
				minimumEntry: elfProgramHeaderWidth(elfClass)
			});
			if (programs === undefined && phnum > 0) opaque = NODE_SEA_ELF_TABLE_TRUNCATED;
			if (programs !== undefined) for (const entry of programs) {
				const parsedProgram = readElfProgramHeader(entry, header.value.elfClass, little);
				if (!parsedProgram.ok) continue;
				const program = parsedProgram.value;
				if (program.type !== PT_NOTE) continue;
				const note = {
					offset: program.offset <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(program.offset) : undefined,
					length: program.fileSize <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(program.fileSize) : undefined,
					align: program.alignment <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(program.alignment) : undefined
				};
				const scanned = await scanElfNoteTable(carrier, note, scan, found.length > 0);
				if (scanned === undefined) opaque ??= NODE_SEA_ELF_TABLE_TRUNCATED;
				else for (const range of scanned) found.push(range);
			}
			if (programs !== undefined && phnum > 0) {
				if (found.length > 0 && opaque !== undefined) throw formatFailure$6(opaque);
				return found;
			}
			if (!validateElfSectionTableFields(raw.value).ok) return [];
			const sections = await readElfTables(carrier, {
				offset: shoff,
				count: shnum,
				entrySize: shentsize,
				minimumEntry: elfSectionHeaderWidth(elfClass)
			});
			if (sections === undefined && shnum > 0) opaque ??= NODE_SEA_ELF_TABLE_TRUNCATED;
			if (sections !== undefined) for (const entry of sections) {
				const parsedSection = readElfSectionHeader(entry, header.value.elfClass, little);
				if (!parsedSection.ok) continue;
				const section = parsedSection.value;
				const storage = elfNoteSectionStorage(section);
				if (storage === "not-note") continue;
				if (storage === "compressed") {
					opaque ??= "Compressed ELF note sections cannot establish raw Node SEA blob offsets";
					continue;
				}
				const note = {
					offset: section.offset <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(section.offset) : undefined,
					length: section.size <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(section.size) : undefined,
					align: section.alignment <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(section.alignment) : undefined
				};
				const scanned = await scanElfNoteTable(carrier, note, scan, found.length > 0);
				if (scanned === undefined) opaque ??= NODE_SEA_ELF_TABLE_TRUNCATED;
				else for (const range of scanned) found.push(range);
			}
			if (found.length > 0 && opaque !== undefined) throw formatFailure$6(opaque);
			return found;
		};
		readElfTables = async (carrier, table) => {
			if (table.count === 0) return [];
			if (table.offset === undefined || table.entrySize < table.minimumEntry || table.offset > carrier.fileSize || table.count > Math.floor((carrier.fileSize - table.offset) / table.entrySize)) return undefined;
			const limits = carrier.limits ?? DEFAULT_NODE_SEA_READER_LIMITS;
			if (table.count > limits.recognition_header_count) throw artifactReaderLimitFailure("artifact_limits.node_sea.recognition_header_count", limits.recognition_header_count, "count", table.count);
			const entries = [];
			for (let index = 0; index < table.count; index += 1) {
				if (index % 128 === 0) abortIfNeeded(carrier.signal);
				const offset = table.offset + index * table.entrySize;
				if (offset > carrier.fileSize || table.minimumEntry > carrier.fileSize - offset) return undefined;
				const entry = await readArtifactRange(carrier, offset, table.minimumEntry);
				if (entry === undefined) return undefined;
				entries.push(entry);
			}
			return entries;
		};
		chargeNoteFrame = (scan, confirmed) => {
			if (scan.frames === 0) {
				if (confirmed) throw formatFailure$6(NODE_SEA_ELF_NOTES_REPEATED);
				return false;
			}
			scan.frames -= 1;
			return true;
		};
		scanElfNoteTable = async (carrier, note, scan, alreadyFound) => {
			if (note.offset === undefined || note.length === undefined || note.offset > carrier.fileSize || note.length > carrier.fileSize - note.offset) return undefined;
			const alignment = elfNoteAlignment(note.align === 8 ? 8 : 4);
			const found = [];
			let cursor = 0;
			while (cursor + 12 <= note.length) {
				abortIfNeeded(carrier.signal);
				if (!chargeNoteFrame(scan, alreadyFound || found.length > 0)) return undefined;
				const header = await readArtifactRange(carrier, note.offset + cursor, 12);
				if (header === undefined) return failNoteTable(alreadyFound || found.length > 0);
				const frame = readElfNoteFrame(header, scan.little, alignment, note.length - cursor);
				if (!frame.ok || frame.value.framing === "truncated-name") return failNoteTable(alreadyFound || found.length > 0);
				const { namesz, descsz, descriptor, next, framing } = frame.value;
				const name = await readArtifactRange(carrier, note.offset + cursor + 12, Math.min(namesz, RESOURCE_NAME.length + 1));
				if (name === undefined) return failNoteTable(alreadyFound || found.length > 0);
				const owner = cString(name, 0, name.length);
				if (owner === RESOURCE_NAME) {
					if (framing === "truncated-descriptor") throw formatFailure$6(NODE_SEA_ELF_DESCRIPTOR_TRUNCATED);
					admitBlobBytes(carrier, descsz);
					found.push({
						offset: note.offset + cursor + descriptor,
						length: descsz
					});
				}
				if (framing !== "complete") return failNoteTable(alreadyFound || found.length > 0);
				cursor += next;
			}
			if (cursor < note.length) {
				const confirmed = alreadyFound || found.length > 0;
				if (!chargeNoteFrame(scan, confirmed)) return undefined;
				const tail = await readArtifactRange(carrier, note.offset + cursor, note.length - cursor);
				if (tail === undefined) return failNoteTable(confirmed);
				if (!isElfNotePadding(tail)) return failNoteTable(confirmed, "ELF note table has trailing non-zero bytes");
			}
			return found;
		};
		failNoteTable = (confirmed, detail = NODE_SEA_ELF_TABLE_TRUNCATED) => {
			if (confirmed) throw formatFailure$6(detail);
			return undefined;
		};
		locatePeResources = async (carrier, prefix) => {
			if (!await hasPeResourceName(prefix, carrier.fileSize, (offset, length) => readArtifactRange(carrier, offset, length), RT_RCDATA, RESOURCE_NAME, 65536)) return [];
			if (carrier.fileSize > 536870912) {
				throw limitFailure("Node SEA PE inspection exceeds the 512 MiB PE parser input ceiling");
			}
			const bytes = await readArtifactRange(carrier, 0, carrier.fileSize);
			if (bytes === undefined) throw formatFailure$6(NODE_SEA_TRUNCATED);
			let layout;
			try {
				layout = readPeResourceLayout(bytes);
			} catch (cause) {
				if (cause instanceof ParseFailureError && cause.kind === "malformed") return [];
				throw cause;
			}
			let resources;
			try {
				resources = await parsePeResources(bytes, {
					path: "<admitted SEA carrier>",
					sha256: sha256Hex(bytes),
					bytes: bytes.length
				}, {
					path: "/admitted-sea-carrier",
					max_file_bytes: MAX_INSPECT_PE_FILE_BYTES,
					max_entries: MAX_INSPECT_PE_DIRECTORY_ENTRIES
				}, carrier.signal, layout);
			} catch (cause) {
				throw artifactParseFailure(cause, carrier.signal, peResourceLimitBoundary);
			}
			return resources.resources.flatMap((resource) => {
				if (resource.type.kind !== "id" || resource.type.id !== RT_RCDATA || resource.name.kind !== "name" || resource.name.name !== RESOURCE_NAME) return [];
				const range = resource.payload.location;
				admitBlobBytes(carrier, range.bytes);
				return [{
					offset: range.offset,
					length: range.bytes
				}];
			});
		};
		cString = (bytes, offset, length) => {
			let end = offset;
			const limit = Math.min(bytes.length, offset + length);
			while (end < limit && bytes[end] !== 0) end += 1;
			return bytes.toString("latin1", offset, end);
		};
	})))();
}

//#endregion
//#region dist/artifacts/pyinstaller/PyInstallerFailure.js
var pyInstallerReaderFailure, pyInstallerFailure, pyInstallerLayoutFailure;
function init_PyInstallerFailure() {
	return (init_PyInstallerFailure = __esmMin((() => {
		init_resources();
		pyInstallerReaderFailure = (error) => error.reason === "integrity" ? new ArtifactReaderFailure(error.reason, error.message, { integrityCheck: error.integrityCheck }) : new ArtifactReaderFailure(error.reason, error.message);
		pyInstallerFailure = (reason, message) => ({
			reason,
			message
		});
		pyInstallerLayoutFailure = (message) => ({
			reason: "integrity",
			message,
			integrityCheck: "layout-consistency"
		});
	})))();
}

//#endregion
//#region dist/artifacts/pyinstaller/PyInstallerBytes.js
var readPyInstallerBytes;
function init_PyInstallerBytes() {
	return (init_PyInstallerBytes = __esmMin((() => {
		init_result();
		init_resources();
		init_PyInstallerFailure();
		readPyInstallerBytes = async (handle, input) => {
			abortIfNeeded(input.signal);
			if (!Number.isSafeInteger(input.position) || !Number.isSafeInteger(input.length) || input.position < 0 || input.length < 0 || !Number.isSafeInteger(input.position + input.length)) return err(pyInstallerFailure("format", `${input.label} has an invalid source range`));
			const bytes = Buffer.alloc(input.length);
			let offset = 0;
			while (offset < bytes.length) {
				abortIfNeeded(input.signal);
				let count;
				try {
					const read = await handle.read(bytes, offset, bytes.length - offset, input.position + offset);
					count = read.bytesRead;
				} catch (cause) {
					throw new ArtifactReaderFailure("io", `${input.label} could not be read`, { cause });
				}
				abortIfNeeded(input.signal);
				if (count === 0) return err(pyInstallerFailure("format", `${input.label} is truncated`));
				offset += count;
			}
			return ok(bytes);
		};
	})))();
}

//#endregion
//#region dist/artifacts/pyinstaller/CArchiveLayout.js
var PYINSTALLER_COOKIE_MAGIC, PYINSTALLER_COOKIE_V21_BYTES, PYINSTALLER_COOKIE_V20_BYTES, PYINSTALLER_COOKIE_SEARCH_BYTES, MAX_TOC_BYTES, MAX_TOC_ENTRIES, TOC_HEADER_BYTES, CARCHIVE_ENTRY_ROLES, isCArchiveDeclaration, isCArchivePythonModule, observePyInstallerCookie, readCArchiveToc, parseCArchiveToc, parseCookieAt, parseCookie, libraryName, tocName, safeSum, validateCArchiveMembers;
function init_CArchiveLayout() {
	return (init_CArchiveLayout = __esmMin((() => {
		init_PyInstallerBytes();
		init_binaryContainer();
		init_result();
		init_PyInstallerFailure();
		init_strictUtf8();
		PYINSTALLER_COOKIE_MAGIC = Buffer.from("MEI\f\v\n\v");
		PYINSTALLER_COOKIE_V21_BYTES = 88;
		PYINSTALLER_COOKIE_V20_BYTES = 24;
		PYINSTALLER_COOKIE_SEARCH_BYTES = 16 * 1024 * 1024;
		MAX_TOC_BYTES = 32 * 1024 * 1024;
		MAX_TOC_ENTRIES = 1e5;
		TOC_HEADER_BYTES = 18;
		CARCHIVE_ENTRY_ROLES = new Map([
			["s", "script"],
			["m", "module"],
			["M", "package"],
			["o", "runtime-option"],
			["d", "dependency"],
			["n", "symlink"],
			["b", "binary"],
			["z", "pyz"]
		]);
		isCArchiveDeclaration = (entry) => entry.role === "runtime-option" || entry.role === "dependency";
		isCArchivePythonModule = (entry) => entry.role === "module" || entry.role === "package";
		observePyInstallerCookie = async (handle, fileSize, signal) => {
			if (!Number.isSafeInteger(fileSize) || fileSize < 24) return ok({ state: "absent" });
			const tailSize = Math.min(fileSize, PYINSTALLER_COOKIE_SEARCH_BYTES);
			const read = await readPyInstallerBytes(handle, {
				position: fileSize - tailSize,
				length: tailSize,
				label: "CArchive tail",
				signal
			});
			if (!read.ok) return read;
			const observed = read.value;
			let failure;
			let from = observed.length;
			while (from >= PYINSTALLER_COOKIE_MAGIC.length) {
				const relative = observed.subarray(0, from).lastIndexOf(PYINSTALLER_COOKIE_MAGIC);
				if (relative < 0) break;
				const cookieOffset = fileSize - tailSize + relative;
				const parsed = parseCookieAt(observed, relative, cookieOffset, fileSize);
				if (parsed.ok) return ok({
					state: "located",
					cookie: parsed.value
				});
				failure = parsed.error;
				from = relative;
			}
			return ok(failure === undefined ? { state: "absent" } : {
				state: "rejected-candidates",
				failure
			});
		};
		readCArchiveToc = async (handle, cookie, signal) => {
			if (cookie.tocLength > MAX_TOC_BYTES) return err(pyInstallerFailure("limit", "CArchive table of contents exceeds its bound"));
			const position = cookie.archiveStart + cookie.tocOffset;
			const read = await readPyInstallerBytes(handle, {
				position,
				length: cookie.tocLength,
				label: "CArchive table of contents",
				signal
			});
			if (!read.ok) return read;
			const parsed = parseCArchiveToc(read.value);
			if (!parsed.ok) return parsed;
			const valid = validateCArchiveMembers(parsed.value, cookie.tocOffset);
			return valid.ok ? parsed : valid;
		};
		parseCArchiveToc = (bytes) => {
			const reader = new BinaryReader(bytes, false, "pyinstaller");
			const entries = [];
			let offset = 0;
			const malformedEntry = (message) => err(pyInstallerFailure("format", `CArchive table index ${String(entries.length)} at TOC offset ${String(offset)}: ${message}`));
			while (offset < bytes.length) {
				if (offset + TOC_HEADER_BYTES > bytes.length) return malformedEntry("CArchive table of contents entry is truncated");
				const entryLength = reader.u32(offset);
				if (entryLength < TOC_HEADER_BYTES || offset + entryLength > bytes.length) return malformedEntry("CArchive table of contents entry extends outside the table");
				if (entries.length >= MAX_TOC_ENTRIES) return err(pyInstallerFailure("limit", "CArchive table of contents exceeds its entry bound"));
				const nameBytes = bytes.subarray(offset + TOC_HEADER_BYTES, offset + entryLength);
				const name = tocName(nameBytes);
				if (!name.ok) return malformedEntry(name.error.message);
				const compressionFlag = bytes[offset + 16] ?? 0;
				if (compressionFlag !== 0 && compressionFlag !== 1) return malformedEntry(`CArchive compression flag ${String(compressionFlag)} is not stored or zlib`);
				const typeCode = bytes[offset + 17] ?? 0;
				if (typeCode < 32 || typeCode > 126) return malformedEntry("CArchive type code is not a printable character");
				const sourceTypeCode = String.fromCharCode(typeCode);
				entries.push({
					index: entries.length,
					tocRecordOffset: offset,
					tocRecordLength: entryLength,
					name: name.value,
					typeCode: sourceTypeCode,
					role: CARCHIVE_ENTRY_ROLES.get(sourceTypeCode) ?? "other",
					offset: reader.u32(offset + 4),
					compressedSize: reader.u32(offset + 8),
					uncompressedSize: reader.u32(offset + 12),
					compressionFlag
				});
				offset += entryLength;
			}
			return ok(entries);
		};
		parseCookieAt = (tail, relative, cookieOffset, fileSize) => {
			const modern = parseCookie(tail, relative, cookieOffset, fileSize, "2.1");
			if (modern.ok) return modern;
			const legacy = parseCookie(tail, relative, cookieOffset, fileSize, "2.0");
			return legacy.ok ? legacy : modern;
		};
		parseCookie = (tail, relative, cookieOffset, fileSize, layout) => {
			const cookieBytes = layout === "2.1" ? 88 : 24;
			if (relative + cookieBytes > tail.length) return err(pyInstallerFailure("format", "CArchive cookie extends past the end of the file"));
			const view = tail.subarray(relative, relative + cookieBytes);
			const reader = new BinaryReader(view, false, "pyinstaller");
			const packageLength = reader.u32(8);
			const tocOffset = reader.u32(12);
			const tocLength = reader.u32(16);
			const pythonVersion = reader.u32(20);
			if (!safeSum(tocOffset, tocLength, cookieBytes) || packageLength !== tocOffset + tocLength + cookieBytes) return err(pyInstallerFailure("format", "CArchive cookie does not describe a table of contents inside the package"));
			const archiveStart = cookieOffset + cookieBytes - packageLength;
			if (archiveStart < 0 || archiveStart + packageLength > fileSize) return err(pyInstallerFailure("format", "CArchive cookie range is outside the file"));
			const library = layout === "2.1" ? libraryName(view.subarray(24, 88)) : ok(null);
			if (!library.ok) return library;
			return ok({
				layout,
				archiveStart,
				packageLength,
				tocOffset,
				tocLength,
				pythonVersion,
				pythonLibrary: library.value,
				cookieOffset
			});
		};
		libraryName = (bytes) => {
			const end = bytes.indexOf(0);
			const text = end < 0 ? bytes : bytes.subarray(0, end);
			if (end >= 0 && bytes.subarray(end).some((byte) => byte !== 0)) return err(pyInstallerFailure("format", "CArchive Python library name is not NUL-padded"));
			if (text.length === 0) return ok(null);
			try {
				return ok(strictUtf8Decoder("preserve").decode(text));
			} catch {
				return err(pyInstallerFailure("format", "CArchive Python library name is not valid UTF-8"));
			}
		};
		tocName = (bytes) => {
			const end = bytes.indexOf(0);
			if (end < 0 || bytes.subarray(end + 1).some((byte) => byte !== 0)) return err(pyInstallerFailure("format", "CArchive entry name is not NUL-padded"));
			if (end === 0) return err(pyInstallerFailure("format", "CArchive entry name is empty"));
			try {
				return ok(strictUtf8Decoder("preserve").decode(bytes.subarray(0, end)));
			} catch {
				return err(pyInstallerFailure("format", "CArchive entry name is not valid UTF-8"));
			}
		};
		safeSum = (left, middle, right) => Number.isSafeInteger(left) && Number.isSafeInteger(middle) && Number.isSafeInteger(right) && left >= 0 && middle >= 0 && right >= 0 && left + middle + right <= Number.MAX_SAFE_INTEGER;
		validateCArchiveMembers = (entries, tocOffset) => {
			for (const entry of entries) {
				if (isCArchiveDeclaration(entry)) {
					if (entry.compressedSize !== 0 || entry.uncompressedSize !== 0 || entry.compressionFlag !== 0) return err(pyInstallerLayoutFailure(`CArchive declaration at table index ${String(entry.index)} has local payload or compression`));
				}
				if (entry.compressionFlag === 0 && entry.compressedSize !== entry.uncompressedSize) return err(pyInstallerLayoutFailure(`Stored CArchive member size disagrees with its table entry at table index ${String(entry.index)}`));
				if (entry.offset > tocOffset) return err(pyInstallerFailure("format", `CArchive member offset is outside the archive at table index ${String(entry.index)}`));
			}
			const ranges = entries.filter((entry) => entry.compressedSize > 0).map((entry) => ({
				index: entry.index,
				start: entry.offset,
				end: entry.offset + entry.compressedSize
			})).sort((left, right) => left.start - right.start);
			let occupied = 0;
			for (const range of ranges) {
				if (!Number.isSafeInteger(range.end) || range.end > tocOffset || range.start < occupied) return err(pyInstallerLayoutFailure(`CArchive member extends outside the archive or overlaps another member at table index ${String(range.index)}`));
				occupied = range.end;
			}
			return ok(null);
		};
	})))();
}

//#endregion
//#region dist/artifacts/ArtifactEmbeddedFormatProbes.js
var ArtifactEmbeddedFormatProbes;
function init_ArtifactEmbeddedFormatProbes() {
	return (init_ArtifactEmbeddedFormatProbes = __esmMin((() => {
		init_BunModuleGraphLayout();
		init_DenoStandaloneLocation();
		init_artifactReaderLimits();
		init_RegularFile();
		init_DotnetBundle();
		init_resources();
		init_GodotPckLocation();
		init_NodeSeaLocation();
		init_CArchiveLayout();
		init_PyInstallerFailure();
		ArtifactEmbeddedFormatProbes = class {
			source;
			signal;
			limits;
			#facts;
			constructor(path, source, signal, previous, limits = resolveArtifactReaderLimits()) {
				this.source = source;
				this.signal = signal;
				this.limits = limits;
				abortIfNeeded(signal);
				if (previous !== undefined && !sameRegularFileState(previous.sourceState, source.initial)) throw new ArtifactReaderFailure("integrity", `Root artifact changed before inventory: ${path}`, { integrityCheck: "container-identity" });
				const reusable = previous !== undefined && JSON.stringify(previous.readerLimits) === JSON.stringify(limits);
				if (previous !== undefined && !reusable) {
					const { bunStandalone: _bun, nodeSea: _sea, nodeSeaRecognitionFailure: _seaLimit, ...facts } = previous;
					this.#facts = {
						...facts,
						readerLimits: limits
					};
				} else this.#facts = previous ?? {
					sourceState: regularFileState(source.initial),
					readerLimits: limits
				};
			}
			async godotPck(prefix) {
				abortIfNeeded(this.signal);
				if (this.#facts.godotPck !== undefined) return this.#facts.godotPck ?? undefined;
				const location = await locateGodotPck(this.source.handle, this.source.initial.size, this.signal, prefix);
				this.#facts = {
					...this.#facts,
					godotPck: location ?? null
				};
				return location;
			}
			async nodeSea() {
				abortIfNeeded(this.signal);
				if (this.#facts.nodeSea !== undefined) return this.#facts.nodeSea ?? undefined;
				if (this.#facts.nodeSeaRecognitionFailure !== undefined) return undefined;
				try {
					const location = await locateNodeSea(this.source.handle, this.source.initial.size, this.signal, this.limits.node_sea);
					this.#facts = {
						...this.#facts,
						nodeSea: location ?? null
					};
					return location;
				} catch (cause) {
					if (cause instanceof ArtifactReaderFailure && (cause.readerLimit?.parameter === "artifact_limits.node_sea.recognition_header_count" || cause.readerLimit?.parameter === "artifact_limits.node_sea.recognition_load_command_bytes")) {
						this.#facts = {
							...this.#facts,
							nodeSeaRecognitionFailure: cause
						};
						return undefined;
					}
					throw cause;
				}
			}
			async pyInstaller() {
				abortIfNeeded(this.signal);
				if (this.#facts.pyInstaller !== undefined) return this.#facts.pyInstaller.state === "located" ? this.#facts.pyInstaller.cookie : undefined;
				const found = await observePyInstallerCookie(this.source.handle, this.source.initial.size, this.signal);
				abortIfNeeded(this.signal);
				if (!found.ok) throw pyInstallerReaderFailure(found.error);
				this.#facts = {
					...this.#facts,
					pyInstaller: found.value
				};
				return found.value.state === "located" ? found.value.cookie : undefined;
			}
			async dotnetBundle() {
				abortIfNeeded(this.signal);
				if (this.#facts.dotnetBundleHeaderOffset !== undefined) return this.#facts.dotnetBundleHeaderOffset ?? undefined;
				const packaged = await this.pyInstaller();
				const header = await findDotnetBundleHeader(this.source.handle, this.source.initial.size, this.signal, packaged?.archiveStart ?? this.source.initial.size);
				abortIfNeeded(this.signal);
				this.#facts = {
					...this.#facts,
					dotnetBundleHeaderOffset: header ?? null
				};
				return header;
			}
			async bunStandalone() {
				abortIfNeeded(this.signal);
				if (this.#facts.bunStandalone !== undefined) return this.#facts.bunStandalone;
				const observed = await probeBunStandaloneGraph(this.source.handle, this.source.initial.size, this.signal, this.limits.bun);
				abortIfNeeded(this.signal);
				this.#facts = {
					...this.#facts,
					bunStandalone: observed
				};
				return observed;
			}
			async denoStandalone() {
				abortIfNeeded(this.signal);
				if (this.#facts.denoStandalone !== undefined) return this.#facts.denoStandalone;
				const packaged = await this.pyInstaller();
				const observed = await locateDenoStandalone(this.source.handle, this.source.initial.size, this.signal, packaged === undefined ? undefined : {
					start: packaged.archiveStart,
					end: packaged.archiveStart + packaged.packageLength
				});
				abortIfNeeded(this.signal);
				this.#facts = {
					...this.#facts,
					denoStandalone: observed
				};
				return observed;
			}
			completedFacts() {
				return this.#facts;
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/ArtifactPreparation.js
var ArtifactPreparation;
function init_ArtifactPreparation() {
	return (init_ArtifactPreparation = __esmMin((() => {
		init_resources();
		ArtifactPreparation = class {
			#pending;
			async run(signal, prepare, assertOpen) {
				for (;;) {
					const pending = this.#pending ??= {
						signal,
						promise: prepare()
					};
					try {
						await pending.promise;
						return;
					} catch (cause) {
						if (this.#pending === pending) this.#pending = undefined;
						if (pending.signal !== signal && signal?.aborted !== true && artifactReadCancelledBy(cause, pending.signal)) {
							assertOpen();
							continue;
						}
						throw cause;
					}
				}
			}
			clear() {
				this.#pending = undefined;
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/OwnedArtifactStream.js
var READER_CLOSED, ArtifactStreamLifecycle, checkedArtifactMemberStream, ownArtifactStream;
function init_OwnedArtifactStream() {
	return (init_OwnedArtifactStream = __esmMin((() => {
		init_resources();
		READER_CLOSED = Symbol("Artifact stream reader closed");
		ArtifactStreamLifecycle = class {
			label;
			#shutdown = new AbortController();
			constructor(label) {
				this.label = label;
			}
			get closed() {
				return this.#shutdown.signal.aborted;
			}
			close() {
				this.#shutdown.abort(READER_CLOSED);
			}
			member(caller) {
				const signal = caller === undefined ? this.#shutdown.signal : AbortSignal.any([caller, this.#shutdown.signal]);
				const cancellationFailure = (reason) => reason === READER_CLOSED ? new ArtifactReaderFailure("unavailable", `${this.label} reader closed`) : new ArtifactReaderFailure("cancelled", `${this.label} read cancelled`, { cause: reason });
				return {
					signal,
					cancellationFailure,
					async verify(check) {
						try {
							await check(signal);
						} catch (cause) {
							if (signal.reason === READER_CLOSED && artifactReadCancelledBy(cause, signal)) throw cancellationFailure(READER_CLOSED);
							throw cause;
						}
						if (signal.aborted) throw cancellationFailure(signal.reason);
					}
				};
			}
		};
		checkedArtifactMemberStream = (entry, label, incomplete, verify) => {
			let bytes = 0;
			return new Transform({
				transform(chunk, _encoding, callback) {
					bytes += chunk.length;
					callback(null, chunk);
				},
				flush(callback) {
					if (bytes !== entry.declaredSize) {
						callback(incomplete(`member ended early: ${entry.path}`));
						return;
					}
					void verify().then(() => callback(), (cause) => callback(cause instanceof Error ? cause : new Error(`${label} read failed`, { cause })));
				}
			});
		};
		ownArtifactStream = (source, output, { scope, streams, signal, cancellationFailure, label }) => {
			output.on("error", () => undefined);
			streams?.add(output);
			let producerComplete = false;
			const onAbort = () => {
				if (!producerComplete || output.destroyed) return;
				output.destroy(cancellationFailure(signal?.reason));
			};
			const retired = new Promise((resolve) => {
				output.once("close", () => {
					streams?.delete(output);
					signal?.removeEventListener("abort", onAbort);
					resolve();
				});
			});
			signal?.addEventListener("abort", onAbort, { once: true });
			if (signal?.aborted) onAbort();
			output.once("finish", () => {
				producerComplete = true;
				if (signal?.aborted) onAbort();
			});
			void scope.run(async () => {
				await Promise.all([new Promise((resolve) => {
					pipeline(source, output, () => {
						producerComplete = true;
						if (signal?.aborted) onAbort();
						resolve();
					});
				}), retired]);
			}).catch((cause) => output.destroy(cause instanceof Error ? cause : new Error(`${label} stream ownership failed`, { cause })));
		};
	})))();
}

//#endregion
//#region dist/artifacts/PositionalArtifactReader.js
var PositionalArtifactReader;
function init_PositionalArtifactReader() {
	return (init_PositionalArtifactReader = __esmMin((() => {
		init_ArtifactPreparation();
		init_resources();
		init_OwnedArtifactStream();
		init_readFileHandleChunks();
		init_internalInvariant();
		PositionalArtifactReader = class {
			#scope = new ArtifactResourceScope();
			#lifecycle;
			#label;
			#source;
			#preparation = new ArtifactPreparation();
			#prepared;
			constructor(path, label, admitted) {
				this.#label = label;
				this.#lifecycle = new ArtifactStreamLifecycle(label);
				this.#source = new ArtifactFileSource(path, label, admitted);
			}
			/** Metadata from the same validated preparation that established entries and coverage. */
			get preparedFormatMetadata() {
				return this.#prepared?.formatMetadata;
			}
			async prepareContainer(expectedSha256, signal) {
				await this.#scope.run(async () => {
					this.assertOpen(signal);
					await this.#source.bindSha256(expectedSha256, signal);
				});
			}
			async *entries(signal, options) {
				await this.#scope.run(async () => {
					this.assertOpen(signal);
					if (this.#prepared !== undefined) await this.#source.read(signal);
					await this.#preparation.run(signal, () => this.#prepare(signal), () => this.assertOpen(signal));
				});
				this.assertOpen(signal);
				const prepared = this.#prepared;
				if (prepared === undefined) throw invariantViolation("Positional artifact preparation did not complete");
				options?.onCoverage?.({
					...prepared.coverage,
					limitations: [...prepared.coverage.limitations]
				});
				let index = 0;
				for (const entry of prepared.entries.values()) {
					if (index++ % 256 === 0) await setImmediate();
					this.assertOpen(signal);
					yield copyArtifactEntry(entry);
				}
				this.assertOpen(signal);
			}
			async open(entry, signal) {
				return this.#scope.run(async () => {
					this.assertOpen(signal);
					const stored = this.#prepared?.entries.get(entry.adapterKey);
					assertProducedEntry(entry, stored, `${this.#label} entry does not match its owning inventory`);
					if (stored.encrypted) throw new ArtifactReaderFailure("unavailable", `Encrypted ${this.#label} member is unsupported: ${stored.path}`);
					const { handle } = await this.#source.read(signal);
					this.assertOpen(signal);
					const lifecycle = this.#lifecycle.member(signal);
					const { signal: streamSignal, cancellationFailure } = lifecycle;
					const source = stored.declaredSize === 0 ? Readable.from([]) : readFileHandleChunks(handle, {
						start: stored.byteOffset,
						end: stored.byteOffset + stored.declaredSize - 1,
						signal: streamSignal,
						cancellationFailure
					});
					const output = this.#entryStream(stored, lifecycle);
					ownArtifactStream(source, output, {
						scope: this.#scope,
						signal: streamSignal,
						cancellationFailure,
						label: this.#label
					});
					return output;
				});
			}
			async close() {
				this.#lifecycle.close();
				await this.#scope.close();
				await this.#source.close();
				this.#prepared = undefined;
				this.#preparation.clear();
			}
			provenance() {
				return [];
			}
			/** Recheck the carrier's identity and borrow its descriptor. */
			verifyCarrier(signal) {
				return this.#source.read(signal);
			}
			/** Refuse work once the caller cancels or close begins. */
			assertOpen(signal) {
				assertArtifactReadActive(signal);
				if (this.#lifecycle.closed) throw new ArtifactReaderFailure("unavailable", `${this.#label} reader is closed`);
			}
			async #prepare(signal) {
				const prepared = await this.prepareEntries(signal);
				const entries = new Map(prepared.entries.map((entry) => [entry.adapterKey, entry]));
				await this.#source.read(signal);
				this.assertOpen(signal);
				this.#prepared = {
					entries,
					coverage: prepared.coverage,
					formatMetadata: prepared.formatMetadata
				};
			}
			#entryStream(entry, lifecycle) {
				const label = this.#label;
				let bytes = 0;
				const check = async () => {
					if (bytes !== entry.declaredSize) throw new ArtifactReaderFailure("integrity", `${label} entry ended early: ${entry.path}`, { integrityCheck: "declared-size" });
					await lifecycle.verify((signal) => this.#source.read(signal));
				};
				return new Transform({
					transform(chunk, _encoding, callback) {
						bytes += chunk.length;
						callback(null, chunk);
					},
					flush(callback) {
						void check().then(() => callback(), (cause) => callback(cause instanceof Error ? cause : new Error(`${label} read failed`, { cause })));
					}
				});
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/AndroidBootImageFormat.js
var ANDROID_BOOT_HEADER_PROBE_BYTES, AVB_FOOTER_SIZE, ANDROID_BOOT_MAGIC_BYTES, VENDOR_BOOT_MAGIC_BYTES, AVB_FOOTER_MAGIC_BYTES, BOOT_V3_PAGE_SIZE, LEGACY_V0_SIZE, LEGACY_V1_SIZE, LEGACY_V2_SIZE, MODERN_V3_SIZE, MODERN_V4_SIZE, VENDOR_V3_SIZE, VENDOR_V4_SIZE, VENDOR_RAMDISK_ENTRY_SIZE, MAX_VENDOR_RAMDISKS, MAX_RAMDISK_ENTRY_SIZE, MAX_VENDOR_HEADER_SIZE, PAGE_MIN, PAGE_MAX, NAME_SIZE, BOOT_ARGS_SIZE, BOOT_EXTRA_ARGS_SIZE, VENDOR_ARGS_SIZE, RAMDISK_NAME_SIZE, BOARD_ID_BYTES, BOARD_ID_OFFSET, ANDROID_BOOT_FORMAT, formatError, capacityError, HEADER_SIZE_LIMIT, VENDOR_RAMDISK_COUNT_LIMIT, VENDOR_RAMDISK_ENTRY_SIZE_LIMIT, ANDROID_BOOT_FIXED_LIMITS, parsed, requireBytes, u32, u64, u64be, alignUp, endOf, requirePageSize, requireHeaderSize, requireFileCovers, untilNul, decodeText, decodeField, commandFields, decodeOsVersion, baseLimitations, component, place, bootParse, RAMDISK_TYPE_NAMES, ramdiskTypeName, hasPrefix, compressionFromPrefix, legacyStructSize, layoutLegacyTail, parseLegacyBoot, parseModernBoot, vendorTableByteLength, parseVendorTableHeader, requireVendorTableCapacity, parseVendorHeader, parseAndroidHeader, parseAndroidBootHeader, vendorRamdiskPath, sectionCovered, readVendorRamdiskTable, parseVendorRamdiskTable, absentFooter, rejectVbmetaOverlap, avbFooterOffset, readAvbFooter, inspectAvbFooter;
function init_AndroidBootImageFormat() {
	return (init_AndroidBootImageFormat = __esmMin((() => {
		init_strictUtf8();
		init_artifactIdentity();
		init_result();
		init_androidBootImageFormat();
		init_parseFailure();
		init_binaryContainer();
		ANDROID_BOOT_HEADER_PROBE_BYTES = 4096;
		AVB_FOOTER_SIZE = 64;
		ANDROID_BOOT_MAGIC_BYTES = Buffer.from(ANDROID_BOOT_MAGIC);
		VENDOR_BOOT_MAGIC_BYTES = Buffer.from(VENDOR_BOOT_MAGIC);
		AVB_FOOTER_MAGIC_BYTES = Buffer.from("AVBf");
		BOOT_V3_PAGE_SIZE = 4096;
		LEGACY_V0_SIZE = 1632;
		LEGACY_V1_SIZE = 1648;
		LEGACY_V2_SIZE = 1660;
		MODERN_V3_SIZE = 1580;
		MODERN_V4_SIZE = 1584;
		VENDOR_V3_SIZE = 2112;
		VENDOR_V4_SIZE = 2128;
		VENDOR_RAMDISK_ENTRY_SIZE = 108;
		MAX_VENDOR_RAMDISKS = 4096;
		MAX_RAMDISK_ENTRY_SIZE = 4096;
		MAX_VENDOR_HEADER_SIZE = 1024 * 1024;
		PAGE_MIN = 2048;
		PAGE_MAX = 65536;
		NAME_SIZE = 16;
		BOOT_ARGS_SIZE = 512;
		BOOT_EXTRA_ARGS_SIZE = 1024;
		VENDOR_ARGS_SIZE = 2048;
		RAMDISK_NAME_SIZE = 32;
		BOARD_ID_BYTES = 64;
		BOARD_ID_OFFSET = 12 + RAMDISK_NAME_SIZE;
		ANDROID_BOOT_FORMAT = "android-boot-image";
		formatError = (message) => {
			throw malformedInput(ANDROID_BOOT_FORMAT, message);
		};
		capacityError = (message, limit) => {
			throw decodeLimit(ANDROID_BOOT_FORMAT, message, limit);
		};
		HEADER_SIZE_LIMIT = {
			name: "Android boot image header_size",
			maximum: MAX_VENDOR_HEADER_SIZE,
			unit: "bytes"
		};
		VENDOR_RAMDISK_COUNT_LIMIT = {
			name: "Android vendor ramdisk table entry count",
			maximum: MAX_VENDOR_RAMDISKS,
			unit: "entries"
		};
		VENDOR_RAMDISK_ENTRY_SIZE_LIMIT = {
			name: "Android vendor ramdisk table entry size",
			maximum: MAX_RAMDISK_ENTRY_SIZE,
			unit: "bytes"
		};
		ANDROID_BOOT_FIXED_LIMITS = new Map([
			[HEADER_SIZE_LIMIT.name, HEADER_SIZE_LIMIT],
			[VENDOR_RAMDISK_COUNT_LIMIT.name, VENDOR_RAMDISK_COUNT_LIMIT],
			[VENDOR_RAMDISK_ENTRY_SIZE_LIMIT.name, VENDOR_RAMDISK_ENTRY_SIZE_LIMIT]
		]);
		parsed = (read) => {
			try {
				return ok(read());
			} catch (cause) {
				if (!(cause instanceof ParseFailureError)) throw cause;
				return err(cause);
			}
		};
		requireBytes = (buffer, length, what) => {
			if (buffer.length < length) throw truncatedInput(ANDROID_BOOT_FORMAT, `${what} is truncated: ${buffer.length} bytes available, at least ${length} required`, {
				offset: buffer.length,
				field: what
			});
		};
		u32 = (buffer, offset) => {
			requireBytes(buffer, offset + 4, "header");
			return new BinaryReader(buffer, true, ANDROID_BOOT_FORMAT).u32(offset);
		};
		u64 = (buffer, offset, what) => {
			requireBytes(buffer, offset + 8, what);
			const reader = new BinaryReader(buffer, true, ANDROID_BOOT_FORMAT);
			const low = reader.u32(offset);
			const high = reader.u32(offset + 4);
			if (high > 2097151) formatError(`${what} exceeds a safe integer`);
			return high * 4294967296 + low;
		};
		u64be = (buffer, offset, what) => {
			requireBytes(buffer, offset + 8, what);
			const reader = new BinaryReader(buffer, false, ANDROID_BOOT_FORMAT);
			const high = reader.u32(offset);
			const low = reader.u32(offset + 4);
			if (high > 2097151) formatError(`${what} exceeds a safe integer`);
			return high * 4294967296 + low;
		};
		alignUp = (value, page) => {
			if (!Number.isSafeInteger(value) || value < 0) formatError("a component extent is not a safe nonnegative integer");
			const remainder = value % page;
			if (remainder === 0) return value;
			const aligned = value + (page - remainder);
			if (!Number.isSafeInteger(aligned)) formatError("a page-aligned component extent is not a safe integer");
			return aligned;
		};
		endOf = (offset, size) => {
			if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(size) || offset < 0 || size < 0) formatError("a component range is not a safe nonnegative extent");
			const end = offset + size;
			if (!Number.isSafeInteger(end)) formatError("a component range overflows a safe integer");
			return end;
		};
		requirePageSize = (value) => {
			if (!Number.isInteger(value) || value < PAGE_MIN || value > PAGE_MAX || (value & value - 1) !== 0) formatError(`page size ${value} is not a power of two from 2048 through 65536`);
			return value;
		};
		requireHeaderSize = (value, minimum, maximum) => {
			if (!Number.isInteger(value) || value < minimum || maximum !== undefined && value > maximum) formatError(maximum === undefined ? `header_size ${value} is smaller than the ${minimum}-byte structure` : `header_size ${value} is outside the supported range ${minimum} through ${maximum}`);
			return value;
		};
		requireFileCovers = (fileSize, headerSize, ranges) => {
			if (!Number.isSafeInteger(fileSize) || fileSize < 0) formatError("file size is not a safe nonnegative integer");
			const dataEnd = ranges.reduce((end, range) => range === null || range.size === 0 ? end : Math.max(end, endOf(range.offset, range.size)), headerSize);
			if (dataEnd > fileSize) throw truncatedInput(ANDROID_BOOT_FORMAT, `image is truncated: components end at byte ${dataEnd} but the file is ${fileSize} bytes`, {
				offset: fileSize,
				field: "components"
			});
			return dataEnd;
		};
		untilNul = (bytes) => {
			const nul = bytes.indexOf(0);
			return nul === -1 ? bytes : bytes.subarray(0, nul);
		};
		decodeText = (bytes) => {
			try {
				return decodeStrictUtf8(bytes, "preserve");
			} catch {
				return null;
			}
		};
		decodeField = (bytes) => ({
			text: decodeText(untilNul(bytes)),
			hex: bytes.toString("hex")
		});
		commandFields = (cmdlineBytes, extraBytes) => {
			const cmdline = decodeField(cmdlineBytes);
			const extra = extraBytes === null ? null : decodeField(extraBytes);
			return {
				cmdline: cmdline.text,
				cmdlineBytesHex: cmdline.hex,
				extraCmdline: extra?.text ?? null,
				extraCmdlineBytesHex: extra?.hex ?? null,
				commandLine: extraBytes === null ? cmdline.text : decodeText(Buffer.concat([untilNul(cmdlineBytes), untilNul(extraBytes)]))
			};
		};
		decodeOsVersion = (raw) => {
			const major = raw >>> 25 & 127;
			const minor = raw >>> 18 & 127;
			const patch = raw >>> 11 & 127;
			const year = raw >>> 4 & 127;
			const month = raw & 15;
			const osVersion = major === 0 && minor === 0 && patch === 0 ? null : `${String(major)}.${String(minor)}.${String(patch)}`;
			if (year === 0 && month === 0) return {
				osVersion,
				securityPatchLevel: null,
				limitation: null
			};
			if (month < 1 || month > 12) return {
				osVersion,
				securityPatchLevel: null,
				limitation: `security patch month ${String(month)} is not a calendar month; the raw os_version field is retained`
			};
			const monthText = String(month).padStart(2, "0");
			return {
				osVersion,
				securityPatchLevel: `${String(2e3 + year)}-${monthText}`,
				limitation: null
			};
		};
		baseLimitations = (imageKind) => ["Command line, board name, and vendor ramdisk names are target-derived and untrusted.", ...imageKind === "boot" ? ["ANDROID! covers boot, init_boot, and recovery images; the header does not record which role the file had."] : []];
		component = (role, path, offset, size, loadAddress, extra) => ({
			role,
			path,
			index: extra?.index ?? 0,
			offset,
			size,
			loadAddress,
			ramdiskType: extra?.ramdiskType ?? null,
			ramdiskTypeName: extra?.ramdiskTypeName ?? null,
			nameBytesHex: extra?.nameBytesHex ?? null,
			boardIdHex: extra?.boardIdHex ?? null
		});
		place = (components, cursor, page, planned) => {
			if (planned === null || planned.size === 0) return cursor;
			components.push(planned);
			return alignUp(endOf(cursor, planned.size), page);
		};
		bootParse = (fields) => ({
			osVersionRaw: null,
			osVersion: null,
			securityPatchLevel: null,
			name: null,
			nameBytesHex: null,
			cmdline: null,
			extraCmdline: null,
			extraCmdlineBytesHex: null,
			commandLine: null,
			headerDigestHex: null,
			kernelAddr: null,
			ramdiskAddr: null,
			secondAddr: null,
			tagsAddr: null,
			dtbAddr: null,
			kernelSize: null,
			ramdiskSize: null,
			secondSize: null,
			recoveryDtboSize: null,
			recoveryDtboOffset: null,
			dtbSize: null,
			signatureSize: null,
			vendorRamdiskSize: null,
			vendorRamdiskTableEntryCount: null,
			vendorRamdiskTableEntrySize: null,
			bootconfigSize: null,
			tableRange: null,
			vendorRamdiskSection: null,
			...fields
		});
		RAMDISK_TYPE_NAMES = {
			0: "none",
			1: "platform",
			2: "recovery",
			3: "dlkm"
		};
		ramdiskTypeName = (value) => RAMDISK_TYPE_NAMES[value] ?? "unknown";
		hasPrefix = (buffer, bytes) => buffer.length >= bytes.length && bytes.every((byte, index) => buffer[index] === byte);
		compressionFromPrefix = (prefix) => {
			if (hasPrefix(prefix, [31, 139])) return "gzip";
			if (hasPrefix(prefix, [
				4,
				34,
				77,
				24
			])) return "lz4";
			if (hasPrefix(prefix, [
				2,
				33,
				76,
				24
			])) return "lz4";
			if (hasPrefix(prefix, [
				40,
				181,
				47,
				253
			])) return "zstd";
			return null;
		};
		legacyStructSize = (version) => {
			if (version === 0) return LEGACY_V0_SIZE;
			if (version === 1) return LEGACY_V1_SIZE;
			return LEGACY_V2_SIZE;
		};
		layoutLegacyTail = (prefix, version, page, cursor, components, limitations) => {
			if (version < 1) return {
				cursor,
				recoveryDtboSize: null,
				recoveryDtboOffset: null,
				dtbSize: null,
				dtbAddr: null
			};
			const recoveryDtboSize = u32(prefix, LEGACY_V0_SIZE);
			const recoveryDtboOffset = u64(prefix, LEGACY_V0_SIZE + 4, "recovery_dtbo offset");
			let next = cursor;
			if (recoveryDtboSize > 0) {
				if (recoveryDtboOffset % page !== 0) formatError(`recovery_dtbo offset ${recoveryDtboOffset} is not aligned to page size ${page}`);
				endOf(recoveryDtboOffset, recoveryDtboSize);
				if (recoveryDtboOffset < cursor) formatError("recovery_dtbo overlaps an earlier component");
				if (recoveryDtboOffset > cursor) limitations.push("Bytes between the sequential layout and recovery_dtbo were not exposed as entries.");
				components.push(component("recovery-dtbo", "recovery_dtbo", recoveryDtboOffset, recoveryDtboSize, null));
				next = alignUp(endOf(recoveryDtboOffset, recoveryDtboSize), page);
			}
			if (version < 2) return {
				cursor: next,
				recoveryDtboSize,
				recoveryDtboOffset,
				dtbSize: null,
				dtbAddr: null
			};
			const dtbSize = u32(prefix, LEGACY_V1_SIZE);
			const dtbAddr = u64(prefix, LEGACY_V1_SIZE + 4, "dtb address");
			return {
				cursor: place(components, next, page, dtbSize === 0 ? null : component("dtb", "dtb", next, dtbSize, dtbAddr)),
				recoveryDtboSize,
				recoveryDtboOffset,
				dtbSize,
				dtbAddr
			};
		};
		parseLegacyBoot = (prefix, fileSize, headerVersion) => {
			const structSize = legacyStructSize(headerVersion);
			requireBytes(prefix, structSize, "header");
			const pageSize = requirePageSize(u32(prefix, 36));
			const headerSize = headerVersion === 0 ? LEGACY_V0_SIZE : requireHeaderSize(u32(prefix, LEGACY_V1_SIZE - 4), structSize, pageSize);
			const limitations = baseLimitations("boot");
			if (headerVersion > 0 && headerSize > structSize) limitations.push(`Header bytes after the v${String(headerVersion)} structure were not decoded.`);
			const osRaw = u32(prefix, 44);
			const os = decodeOsVersion(osRaw);
			if (os.limitation !== null) limitations.push(os.limitation);
			const name = decodeField(prefix.subarray(48, 48 + NAME_SIZE));
			const commands = commandFields(prefix.subarray(64, 64 + BOOT_ARGS_SIZE), prefix.subarray(608, 608 + BOOT_EXTRA_ARGS_SIZE));
			const components = [];
			const kernelSize = u32(prefix, 8);
			const kernelAddr = u32(prefix, 12);
			const ramdiskSize = u32(prefix, 16);
			const ramdiskAddr = u32(prefix, 20);
			const secondSize = u32(prefix, 24);
			const secondAddr = u32(prefix, 28);
			let cursor = place(components, pageSize, pageSize, kernelSize === 0 ? null : component("kernel", "kernel", pageSize, kernelSize, kernelAddr));
			cursor = place(components, cursor, pageSize, ramdiskSize === 0 ? null : component("ramdisk", "ramdisk", cursor, ramdiskSize, ramdiskAddr));
			cursor = place(components, cursor, pageSize, secondSize === 0 ? null : component("second", "second", cursor, secondSize, secondAddr));
			const tail = layoutLegacyTail(prefix, headerVersion, pageSize, cursor, components, limitations);
			const dataEnd = requireFileCovers(fileSize, headerSize, components);
			return bootParse({
				imageKind: "boot",
				magic: ANDROID_BOOT_MAGIC,
				headerVersion,
				pageSize,
				headerSize,
				headerOccupied: pageSize,
				osVersionRaw: osRaw,
				osVersion: os.osVersion,
				securityPatchLevel: os.securityPatchLevel,
				name: name.text,
				nameBytesHex: name.hex,
				...commands,
				headerDigestHex: prefix.subarray(576, 608).toString("hex"),
				kernelAddr,
				ramdiskAddr,
				secondAddr,
				tagsAddr: u32(prefix, 32),
				dtbAddr: tail.dtbAddr,
				kernelSize,
				ramdiskSize,
				secondSize,
				recoveryDtboSize: tail.recoveryDtboSize,
				recoveryDtboOffset: tail.recoveryDtboOffset,
				dtbSize: tail.dtbSize,
				components,
				dataEnd,
				imageEnd: tail.cursor,
				limitations
			});
		};
		parseModernBoot = (prefix, fileSize, headerVersion) => {
			const structSize = headerVersion === 4 ? MODERN_V4_SIZE : MODERN_V3_SIZE;
			requireBytes(prefix, structSize, "header");
			const headerSize = requireHeaderSize(u32(prefix, 20), structSize, BOOT_V3_PAGE_SIZE);
			const limitations = baseLimitations("boot");
			if (headerSize > structSize) limitations.push(`Header bytes after the v${String(headerVersion)} structure were not decoded.`);
			const osRaw = u32(prefix, 16);
			const os = decodeOsVersion(osRaw);
			if (os.limitation !== null) limitations.push(os.limitation);
			const commands = commandFields(prefix.subarray(44, 44 + BOOT_ARGS_SIZE + BOOT_EXTRA_ARGS_SIZE), null);
			const kernelSize = u32(prefix, 8);
			const ramdiskSize = u32(prefix, 12);
			const signatureSize = headerVersion === 4 ? u32(prefix, MODERN_V3_SIZE) : null;
			const components = [];
			let cursor = place(components, BOOT_V3_PAGE_SIZE, BOOT_V3_PAGE_SIZE, kernelSize === 0 ? null : component("kernel", "kernel", BOOT_V3_PAGE_SIZE, kernelSize, null));
			cursor = place(components, cursor, BOOT_V3_PAGE_SIZE, ramdiskSize === 0 ? null : component("ramdisk", "ramdisk", cursor, ramdiskSize, null));
			cursor = place(components, cursor, BOOT_V3_PAGE_SIZE, signatureSize === null || signatureSize === 0 ? null : component("signature", "signature", cursor, signatureSize, null));
			const dataEnd = requireFileCovers(fileSize, headerSize, components);
			return bootParse({
				imageKind: "boot",
				magic: ANDROID_BOOT_MAGIC,
				headerVersion,
				pageSize: BOOT_V3_PAGE_SIZE,
				headerSize,
				headerOccupied: BOOT_V3_PAGE_SIZE,
				osVersionRaw: osRaw,
				osVersion: os.osVersion,
				securityPatchLevel: os.securityPatchLevel,
				...commands,
				kernelSize,
				ramdiskSize,
				signatureSize,
				components,
				dataEnd,
				imageEnd: cursor,
				limitations
			});
		};
		vendorTableByteLength = (entryCount, entrySize) => {
			if (entryCount > 0 && entrySize < VENDOR_RAMDISK_ENTRY_SIZE) formatError(`vendor ramdisk table entry size ${entrySize} is smaller than the ${VENDOR_RAMDISK_ENTRY_SIZE}-byte v4 entry`);
			const bytes = entryCount * entrySize;
			if (!Number.isSafeInteger(bytes)) formatError(`vendor ramdisk table dimensions ${entryCount} × ${entrySize} exceed a safe byte length`);
			return bytes;
		};
		parseVendorTableHeader = (prefix) => {
			const tableSize = u32(prefix, VENDOR_V3_SIZE);
			const entryCount = u32(prefix, VENDOR_V3_SIZE + 4);
			const entrySize = u32(prefix, VENDOR_V3_SIZE + 8);
			const bootconfigSize = u32(prefix, VENDOR_V3_SIZE + 12);
			if (vendorTableByteLength(entryCount, entrySize) !== tableSize) formatError(`vendor ramdisk table size ${tableSize} does not equal ${entryCount} entries of ${entrySize} bytes`);
			return {
				tableSize,
				entryCount,
				entrySize,
				bootconfigSize
			};
		};
		requireVendorTableCapacity = (entryCount, entrySize) => {
			if (entryCount > MAX_VENDOR_RAMDISKS) capacityError(`vendor ramdisk table declares more than ${MAX_VENDOR_RAMDISKS} entries`, VENDOR_RAMDISK_COUNT_LIMIT);
			if (entrySize > MAX_RAMDISK_ENTRY_SIZE) capacityError(`vendor ramdisk table entry size ${entrySize} exceeds the ${MAX_RAMDISK_ENTRY_SIZE} byte entry bound`, VENDOR_RAMDISK_ENTRY_SIZE_LIMIT);
		};
		parseVendorHeader = (prefix, fileSize) => {
			requireBytes(prefix, 12, "header");
			const headerVersion = u32(prefix, 8);
			if (headerVersion !== 3 && headerVersion !== 4) throw unsupportedInput(ANDROID_BOOT_FORMAT, `vendor boot header version ${headerVersion} is unsupported`, {
				offset: 8,
				field: "header_version",
				undecodedContent: true
			});
			const structSize = headerVersion === 4 ? VENDOR_V4_SIZE : VENDOR_V3_SIZE;
			requireBytes(prefix, structSize, "header");
			const pageSize = requirePageSize(u32(prefix, 12));
			const kernelAddr = u32(prefix, 16);
			const ramdiskAddr = u32(prefix, 20);
			const vendorRamdiskSize = u32(prefix, 24);
			const tagsAddr = u32(prefix, 2076);
			const name = decodeField(prefix.subarray(2080, 2080 + NAME_SIZE));
			const headerSize = requireHeaderSize(u32(prefix, 2096), structSize);
			if (headerSize > MAX_VENDOR_HEADER_SIZE) {
				requireFileCovers(fileSize, headerSize, []);
				capacityError(`header_size ${headerSize} exceeds the ${MAX_VENDOR_HEADER_SIZE} byte header bound`, HEADER_SIZE_LIMIT);
			}
			const dtbSize = u32(prefix, 2100);
			const dtbAddr = u64(prefix, 2104, "dtb address");
			const table = headerVersion === 4 ? parseVendorTableHeader(prefix) : null;
			const limitations = baseLimitations("vendor-boot");
			if (headerSize > structSize) limitations.push(`Header bytes after the v${String(headerVersion)} structure were not decoded.`);
			const headerOccupied = alignUp(headerSize, pageSize);
			const sectionOffset = headerOccupied;
			let cursor = vendorRamdiskSize === 0 ? sectionOffset : alignUp(endOf(sectionOffset, vendorRamdiskSize), pageSize);
			const components = [];
			if (headerVersion === 3 && vendorRamdiskSize > 0) components.push(component("vendor-ramdisk", "vendor_ramdisk", sectionOffset, vendorRamdiskSize, ramdiskAddr));
			cursor = place(components, cursor, pageSize, dtbSize === 0 ? null : component("dtb", "dtb", cursor, dtbSize, dtbAddr));
			const tableRange = table !== null && table.tableSize > 0 ? {
				offset: cursor,
				size: table.tableSize
			} : null;
			if (tableRange !== null) cursor = alignUp(endOf(tableRange.offset, tableRange.size), pageSize);
			const bootconfigSize = table?.bootconfigSize ?? null;
			cursor = place(components, cursor, pageSize, bootconfigSize === null || bootconfigSize === 0 ? null : component("bootconfig", "bootconfig", cursor, bootconfigSize, null));
			if (table !== null && table.entryCount === 0 && vendorRamdiskSize > 0) limitations.push("Vendor ramdisk section bytes outside the ramdisk table were not exposed as entries.");
			const section = {
				offset: sectionOffset,
				size: vendorRamdiskSize
			};
			const declared = [
				...components,
				section,
				tableRange
			];
			const dataEnd = requireFileCovers(fileSize, headerSize, declared);
			if (table !== null) requireVendorTableCapacity(table.entryCount, table.entrySize);
			return bootParse({
				imageKind: "vendor-boot",
				magic: VENDOR_BOOT_MAGIC,
				headerVersion,
				pageSize,
				headerSize,
				headerOccupied,
				name: name.text,
				nameBytesHex: name.hex,
				...commandFields(prefix.subarray(28, 28 + VENDOR_ARGS_SIZE), null),
				kernelAddr,
				ramdiskAddr,
				tagsAddr,
				dtbAddr,
				dtbSize,
				vendorRamdiskSize,
				vendorRamdiskTableEntryCount: table?.entryCount ?? null,
				vendorRamdiskTableEntrySize: table?.entrySize ?? null,
				bootconfigSize,
				components,
				dataEnd,
				imageEnd: cursor,
				limitations,
				tableRange,
				vendorRamdiskSection: section
			});
		};
		parseAndroidHeader = (prefix, fileSize) => {
			requireBytes(prefix, 44, "header");
			const headerVersion = u32(prefix, 40);
			if (headerVersion <= 2) return parseLegacyBoot(prefix, fileSize, headerVersion);
			if (headerVersion === 3 || headerVersion === 4) return parseModernBoot(prefix, fileSize, headerVersion);
			throw unsupportedInput(ANDROID_BOOT_FORMAT, `header version ${headerVersion} is unsupported`, {
				offset: 40,
				field: "header_version",
				undecodedContent: true
			});
		};
		parseAndroidBootHeader = (prefix, fileSize) => parsed(() => {
			if (!Number.isSafeInteger(fileSize) || fileSize < 0) formatError("file size is not a safe nonnegative integer");
			requireBytes(prefix, 8, "header");
			if (prefix.subarray(0, 8).equals(ANDROID_BOOT_MAGIC_BYTES)) return parseAndroidHeader(prefix, fileSize);
			if (prefix.subarray(0, 8).equals(VENDOR_BOOT_MAGIC_BYTES)) return parseVendorHeader(prefix, fileSize);
			return formatError("magic is not ANDROID! or VNDRBOOT");
		});
		vendorRamdiskPath = (text, index, used) => {
			const base = text !== null && text.length > 0 && text !== "." && text !== ".." && !text.includes("/") ? logicalPathNfc(text) : `ramdisk-${String(index)}`;
			let unique = used.has(base) ? `${base}-${String(index)}` : base;
			let extra = 2;
			while (used.has(unique)) {
				unique = `${base}-${String(index)}-${String(extra)}`;
				extra += 1;
			}
			used.add(unique);
			return `vendor_ramdisk/${unique}`;
		};
		sectionCovered = (entries, sectionOffset, sectionSize) => {
			let covered = 0;
			const spans = entries.map((entry) => ({
				start: entry.offset - sectionOffset,
				end: entry.offset - sectionOffset + entry.size
			})).sort((left, right) => left.start - right.start);
			for (const span of spans) {
				if (span.start > covered) return false;
				covered = Math.max(covered, span.end);
			}
			return covered === sectionSize;
		};
		readVendorRamdiskTable = (table, input) => {
			const expected = vendorTableByteLength(input.entryCount, input.entrySize);
			requireBytes(table, expected, "vendor ramdisk table");
			if (table.length > expected) formatError(`vendor ramdisk table is ${table.length} bytes, expected ${expected}`);
			const components = [];
			const used = new Set();
			const empty = [];
			let longer = false;
			for (let index = 0; index < input.entryCount; index += 1) {
				const base = index * input.entrySize;
				const size = u32(table, base);
				const offset = u32(table, base + 4);
				const ramdiskType = u32(table, base + 8);
				if (offset > input.sectionSize || size > input.sectionSize - offset) formatError(`vendor ramdisk table entry ${index} overruns the vendor ramdisk section`);
				if (size === 0) {
					empty.push(index);
					continue;
				}
				const fileOffset = endOf(input.sectionOffset, offset);
				endOf(fileOffset, size);
				const decoded = decodeField(table.subarray(base + 12, base + 12 + RAMDISK_NAME_SIZE));
				if (input.entrySize > VENDOR_RAMDISK_ENTRY_SIZE) longer = true;
				components.push(component("vendor-ramdisk", vendorRamdiskPath(decoded.text, index, used), fileOffset, size, null, {
					index,
					ramdiskType,
					ramdiskTypeName: ramdiskTypeName(ramdiskType),
					nameBytesHex: decoded.hex,
					boardIdHex: table.subarray(base + BOARD_ID_OFFSET, base + BOARD_ID_OFFSET + BOARD_ID_BYTES).toString("hex")
				}));
			}
			const ordered = [...components].sort((left, right) => left.offset - right.offset || left.index - right.index);
			for (let index = 1; index < ordered.length; index += 1) {
				const previous = ordered[index - 1];
				const current = ordered[index];
				if (previous !== undefined && current !== undefined && previous.offset + previous.size > current.offset) formatError(`vendor ramdisk table entry ${current.index} overlaps entry ${previous.index}`);
			}
			const limitations = [];
			if (longer) limitations.push(`Vendor ramdisk table entries are longer than the ${String(VENDOR_RAMDISK_ENTRY_SIZE)}-byte v4 structure; trailing entry bytes were not decoded.`);
			if (empty.length > 0) limitations.push(`Vendor ramdisk table entries ${empty.join(", ")} declare no bytes and were omitted.`);
			if (!sectionCovered(components, input.sectionOffset, input.sectionSize)) limitations.push("Vendor ramdisk section bytes outside the ramdisk table were not exposed as entries.");
			return {
				components,
				limitations
			};
		};
		parseVendorRamdiskTable = (table, input) => parsed(() => readVendorRamdiskTable(table, input));
		absentFooter = (limitations = []) => ({
			present: false,
			footerSize: null,
			versionMajor: null,
			versionMinor: null,
			originalImageSize: null,
			vbmetaOffset: null,
			vbmetaSize: null,
			limitations
		});
		rejectVbmetaOverlap = (vbmeta, fileSize, headerOccupied, components) => {
			if (vbmeta.size === 0) return;
			if (endOf(vbmeta.offset, vbmeta.size) > fileSize - 64) formatError("AVB vbmeta overlaps the footer");
			const occupied = [{
				offset: 0,
				size: headerOccupied
			}, ...components];
			for (const componentRange of occupied) if (componentRange.size > 0 && vbmeta.offset < componentRange.offset + componentRange.size && componentRange.offset < vbmeta.offset + vbmeta.size) formatError(componentRange.offset === 0 ? "AVB vbmeta overlaps the boot image header" : `AVB vbmeta overlaps a component at offset ${componentRange.offset}`);
		};
		avbFooterOffset = (fileSize, dataEnd) => {
			const offset = fileSize - 64;
			return offset >= dataEnd ? offset : null;
		};
		readAvbFooter = (input) => {
			if (input.fileSize < input.dataEnd) throw truncatedInput(ANDROID_BOOT_FORMAT, `image is truncated: components end at byte ${input.dataEnd} but the file is ${input.fileSize} bytes`, {
				offset: input.fileSize,
				field: "components"
			});
			const { tail } = input;
			const offset = avbFooterOffset(input.fileSize, input.dataEnd);
			if (offset !== null && (tail === null || tail.length !== 64)) return formatError("AVB footer bytes were not supplied");
			if (offset === null || !tail?.subarray(0, 4).equals(AVB_FOOTER_MAGIC_BYTES)) {
				const trailing = input.fileSize - input.imageEnd;
				if (trailing <= 0) return absentFooter();
				return absentFooter([trailing < 64 ? `${trailing} trailing bytes follow the boot image and are shorter than a 64-byte AVB footer.` : `${trailing} trailing bytes follow the boot image and were not decoded as an AVB footer.`]);
			}
			const originalImageSize = u64be(tail, 12, "AVB original image size");
			const vbmetaOffset = u64be(tail, 20, "AVB vbmeta offset");
			const vbmetaSize = u64be(tail, 28, "AVB vbmeta size");
			if (originalImageSize < input.dataEnd) formatError(`AVB original image size ${originalImageSize} ends before boot image components at ${input.dataEnd}`);
			if (originalImageSize > input.fileSize - 64) formatError(`AVB original image size ${originalImageSize} overlaps the footer`);
			rejectVbmetaOverlap({
				offset: vbmetaOffset,
				size: vbmetaSize
			}, input.fileSize, input.headerOccupied, input.components);
			if (vbmetaSize > 0 && vbmetaOffset < originalImageSize) formatError("AVB vbmeta overlaps the original boot image");
			return {
				present: true,
				footerSize: 64,
				versionMajor: new BinaryReader(tail, false, ANDROID_BOOT_FORMAT).u32(4),
				versionMinor: new BinaryReader(tail, false, ANDROID_BOOT_FORMAT).u32(8),
				originalImageSize,
				vbmetaOffset,
				vbmetaSize,
				limitations: []
			};
		};
		inspectAvbFooter = (input) => parsed(() => readAvbFooter(input));
	})))();
}

//#endregion
//#region dist/artifacts/AndroidBootImageArtifactReader.js
var COMPRESSION_LIMITATION, AndroidBootImageArtifactReader, formatFailure$5, parseFailure$2, entryFor$2, toMetadata$2;
function init_AndroidBootImageArtifactReader() {
	return (init_AndroidBootImageArtifactReader = __esmMin((() => {
		init_ArtifactFileRange();
		init_resources();
		init_PositionalArtifactReader();
		init_AndroidBootImageFormat();
		COMPRESSION_LIMITATION = "Compression was identified from the leading magic only and the stored bytes were not decompressed.";
		AndroidBootImageArtifactReader = class extends PositionalArtifactReader {
			format = "android-boot-image";
			constructor(path, admitted) {
				super(path, "Android boot image", admitted);
			}
			formatMetadata() {
				const metadata = this.preparedFormatMetadata;
				return metadata === undefined ? undefined : { ...metadata };
			}
			async prepareEntries(signal) {
				const { handle, initial } = await this.verifyCarrier(signal);
				const headerBytes = await readArtifactFileBytes(handle, 0, Math.min(initial.size, ANDROID_BOOT_HEADER_PROBE_BYTES), initial.size, signal);
				this.assertOpen(signal);
				const parsed = parseAndroidBootHeader(headerBytes, initial.size);
				if (!parsed.ok) throw parseFailure$2(parsed.error);
				const header = parsed.value;
				const table = await this.#vendorTable(handle, initial.size, header, signal);
				const plans = [...table?.components ?? [], ...header.components];
				const avb = await this.#footer(handle, initial.size, header, plans, signal);
				const compressions = await this.#compression(handle, initial.size, plans, signal);
				const entries = new Map();
				for (const plan of plans) {
					const entry = entryFor$2(plan, compressions.get(plan.path) ?? null);
					if (entries.has(entry.adapterKey)) throw formatFailure$5(`duplicate component path ${plan.path}`);
					entries.set(entry.adapterKey, entry);
				}
				return {
					entries: [...entries.values()],
					formatMetadata: toMetadata$2(header, avb, plans.length),
					coverage: {
						status: "complete",
						limitations: [
							...header.limitations,
							...table?.limitations ?? [],
							...avb.limitations
						]
					}
				};
			}
			async #vendorTable(handle, fileSize, header, signal) {
				const range = header.tableRange;
				if (range === null) return undefined;
				const section = header.vendorRamdiskSection;
				if (section === null || header.vendorRamdiskTableEntryCount === null || header.vendorRamdiskTableEntrySize === null) throw formatFailure$5("vendor ramdisk table is missing its section");
				this.assertOpen(signal);
				const bytes = await readArtifactFileBytes(handle, range.offset, range.size, fileSize, signal);
				const table = parseVendorRamdiskTable(bytes, {
					entryCount: header.vendorRamdiskTableEntryCount,
					entrySize: header.vendorRamdiskTableEntrySize,
					sectionOffset: section.offset,
					sectionSize: section.size
				});
				if (!table.ok) throw parseFailure$2(table.error);
				return table.value;
			}
			async #footer(handle, fileSize, header, plans, signal) {
				const offset = avbFooterOffset(fileSize, header.dataEnd);
				this.assertOpen(signal);
				const tail = offset !== null ? await readArtifactFileBytes(handle, offset, 64, fileSize, signal) : null;
				const footer = inspectAvbFooter({
					fileSize,
					dataEnd: header.dataEnd,
					imageEnd: header.imageEnd,
					headerOccupied: header.headerOccupied,
					components: [
						...plans,
						...header.tableRange === null ? [] : [header.tableRange],
						...header.vendorRamdiskSection !== null && header.vendorRamdiskSection.size > 0 ? [header.vendorRamdiskSection] : []
					],
					tail
				});
				if (!footer.ok) throw parseFailure$2(footer.error);
				return footer.value;
			}
			async #compression(handle, fileSize, plans, signal) {
				const observed = new Map();
				for (const plan of plans) {
					this.assertOpen(signal);
					const prefix = await readArtifactFileBytes(handle, plan.offset, Math.min(4, plan.size), fileSize, signal);
					observed.set(plan.path, compressionFromPrefix(prefix));
				}
				return observed;
			}
		};
		formatFailure$5 = (detail, options) => new ArtifactReaderFailure("malformed", `Android boot image is malformed: ${detail}`, options);
		parseFailure$2 = (failure) => {
			const facts = failure.failure;
			if (facts.kind === "limit") {
				const ceiling = ANDROID_BOOT_FIXED_LIMITS.get(facts.limit.name);
				if (ceiling !== undefined) return artifactFixedLimitFailure({
					name: ceiling.name,
					kind: "parser",
					limit: facts.limit.maximum,
					unit: ceiling.unit
				}, failure.message, "capacity", { cause: failure });
			}
			return artifactParseFailure(failure, undefined, () => "capacity");
		};
		entryFor$2 = (plan, compression) => ({
			path: plan.path,
			kind: "file",
			declaredSize: plan.size,
			compressedSize: null,
			executable: false,
			encrypted: false,
			byteOffset: plan.offset,
			declaredIntegrity: null,
			unpacked: false,
			limitations: compression === null ? [] : [COMPRESSION_LIMITATION],
			adapterKey: `android-boot-image:${plan.path}`,
			formatMetadata: {
				kind: "android-boot-image-entry",
				role: plan.role,
				index: plan.index,
				compression,
				ramdisk_type: plan.ramdiskType,
				ramdisk_type_name: plan.ramdiskTypeName,
				load_address: plan.loadAddress,
				name_bytes_hex: plan.nameBytesHex,
				board_id_hex: plan.boardIdHex
			},
			sourcePath: plan.path
		});
		toMetadata$2 = (header, avb, componentCount) => ({
			kind: "android-boot-image",
			image_kind: header.imageKind,
			magic: header.magic,
			header_version: header.headerVersion,
			page_size: header.pageSize,
			header_size: header.headerSize,
			os_version_raw: header.osVersionRaw,
			os_version: header.osVersion,
			security_patch_level: header.securityPatchLevel,
			name: header.name,
			name_bytes_hex: header.nameBytesHex,
			cmdline: header.cmdline,
			cmdline_bytes_hex: header.cmdlineBytesHex,
			extra_cmdline: header.extraCmdline,
			extra_cmdline_bytes_hex: header.extraCmdlineBytesHex,
			command_line: header.commandLine,
			header_digest_hex: header.headerDigestHex,
			kernel_addr: header.kernelAddr,
			ramdisk_addr: header.ramdiskAddr,
			second_addr: header.secondAddr,
			tags_addr: header.tagsAddr,
			dtb_addr: header.dtbAddr,
			kernel_size: header.kernelSize,
			ramdisk_size: header.ramdiskSize,
			second_size: header.secondSize,
			recovery_dtbo_size: header.recoveryDtboSize,
			recovery_dtbo_offset: header.recoveryDtboOffset,
			dtb_size: header.dtbSize,
			signature_size: header.signatureSize,
			vendor_ramdisk_size: header.vendorRamdiskSize,
			vendor_ramdisk_table_entry_count: header.vendorRamdiskTableEntryCount,
			vendor_ramdisk_table_entry_size: header.vendorRamdiskTableEntrySize,
			bootconfig_size: header.bootconfigSize,
			avb_footer_present: avb.present,
			avb_footer_size: avb.footerSize,
			avb_version_major: avb.versionMajor,
			avb_version_minor: avb.versionMinor,
			avb_original_image_size: avb.originalImageSize,
			avb_vbmeta_offset: avb.vbmetaOffset,
			avb_vbmeta_size: avb.vbmetaSize,
			component_count: componentCount
		});
	})))();
}

//#endregion
//#region dist/artifacts/AsarFailure.js
var asarCancellationFailure, assertAsarReadActive, asarFailure, isFilesystemFailure;
function init_AsarFailure() {
	return (init_AsarFailure = __esmMin((() => {
		init_resources();
		asarCancellationFailure = (reason) => new ArtifactReaderFailure("cancelled", "ASAR operation cancelled", { cause: reason });
		assertAsarReadActive = (signal) => {
			if (signal?.aborted === true) throw asarCancellationFailure(signal.reason);
		};
		asarFailure = (path, operation, cause) => {
			if (cause instanceof ArtifactReaderFailure) return cause;
			if (isFilesystemFailure(cause)) return new ArtifactReaderFailure("io", `Could not ${operation} ASAR at ${path}: ${cause.message}`, { cause });
			return new ArtifactReaderFailure("format", `Malformed ASAR during ${operation}: ${path}`, { cause });
		};
		isFilesystemFailure = (cause) => cause instanceof Error && "errno" in cause && typeof cause.errno === "number" && "syscall" in cause && typeof cause.syscall === "string";
	})))();
}

//#endregion
//#region dist/artifacts/AsarEntryStream.js
var closeAsarHandle, readValidatedAsarEntry;
function init_AsarEntryStream() {
	return (init_AsarEntryStream = __esmMin((() => {
		init_resources();
		init_AsarFailure();
		closeAsarHandle = async (close, signal) => {
			await close();
			assertAsarReadActive(signal);
		};
		readValidatedAsarEntry = (source, expectedBytes, entryPath, archivePath, signal) => {
			const expectedExtent = expectedBytes === undefined ? undefined : BigInt(expectedBytes);
			const completionFailure = () => {
				const coverage = source.readCoverage();
				if (coverage.kind !== "complete") return new ArtifactReaderFailure("integrity", `ASAR entry read coverage is incomplete: ${entryPath}`, { integrityCheck: "read-coverage" });
				if (expectedExtent !== undefined && coverage.bytes !== expectedExtent) return new ArtifactReaderFailure("integrity", `ASAR entry size disagrees with its header: ${entryPath}`, { integrityCheck: "declared-size" });
				if (signal?.aborted) return asarCancellationFailure(signal.reason);
				return undefined;
			};
			const output = Readable.from((async function* () {
				const iterator = source[Symbol.asyncIterator]();
				try {
					while (true) {
						const next = await iterator.next();
						if (next.done) break;
						const chunk = next.value;
						if (!Buffer.isBuffer(chunk) && !(chunk instanceof Uint8Array)) throw new ArtifactReaderFailure("format", `ASAR entry did not return bytes: ${entryPath}`);
						const coverage = source.readCoverage();
						if (expectedExtent !== undefined && coverage.bytes > expectedExtent) throw new ArtifactReaderFailure("integrity", `ASAR entry exceeded its declared size: ${entryPath}`, { integrityCheck: "declared-size" });
						if (coverage.kind === "complete" && signal?.aborted) {
							const failure = completionFailure();
							if (failure !== undefined) throw failure;
						}
						yield chunk;
					}
					const failure = completionFailure();
					if (failure !== undefined) throw failure;
				} catch (cause) {
					throw asarFailure(archivePath, `read ${entryPath}`, cause);
				} finally {
					try {
						await iterator.return?.();
					} catch {}
					if (!source.destroyed) source.destroy();
				}
			})());
			output.on("error", () => undefined);
			const onSourceError = (cause) => {
				const completedCancellation = cause instanceof ArtifactReaderFailure && cause.reason === "cancelled" && source.readCoverage().kind === "complete" ? completionFailure() : undefined;
				output.destroy(completedCancellation ?? asarFailure(archivePath, `read ${entryPath}`, cause));
			};
			source.on("error", onSourceError);
			source.once("close", () => source.removeListener("error", onSourceError));
			const onAbort = () => {
				if (source.readCoverage().kind === "complete" && !output.destroyed && (source.errored === null || source.errored instanceof ArtifactReaderFailure && source.errored.reason === "cancelled")) {
					const failure = completionFailure();
					if (failure !== undefined) output.destroy(failure);
				}
			};
			signal?.addEventListener("abort", onAbort, { once: true });
			output.once("close", () => {
				signal?.removeEventListener("abort", onAbort);
				if (!source.destroyed) source.destroy();
			});
			if (signal?.aborted) onAbort();
			return output;
		};
	})))();
}

//#endregion
//#region dist/artifacts/AsarListing.js
function* ownChildren(files) {
	for (const name in files) if (Object.hasOwn(files, name)) yield [name, files[name]];
}
var BLOCK_INTEGRITY_LIMITATION, MAX_QUOTED_SOURCE_UNITS, quoteSource, asarListingNodeSchema, malformedMetadata, readDeclaredSize, parseArchiveOffset, readAsarListing;
function init_AsarListing() {
	return (init_AsarListing = __esmMin((() => {
		init_HostPlatform();
		init_asarNode();
		init_resources();
		init_AsarFailure();
		init_unicodeCodePointOrder();
		init_excerpt();
		init_asarListingAdmission();
		BLOCK_INTEGRITY_LIMITATION = "ASAR block integrity declarations were not validated. Whole-file digest comparison does not establish block integrity or Electron runtime acceptance.";
		MAX_QUOTED_SOURCE_UNITS = 256;
		quoteSource = (value) => quotedExcerpt(value, MAX_QUOTED_SOURCE_UNITS);
		asarListingNodeSchema = asarNodeSchema.extend({ size: z.unknown().optional() });
		malformedMetadata = (subject, error) => {
			const fields = [...new Set(error.issues.map((issue) => issue.path.length === 0 ? "entry" : issue.path.join(".")))].join(", ");
			return new ArtifactReaderFailure("format", `${subject} metadata is malformed (${fields})`, { cause: error });
		};
		readDeclaredSize = (value) => {
			if (value === undefined) return { size: null };
			if (value instanceof RoundedAsarSize) return {
				size: null,
				limitation: `ASAR entry declares numeric size ${value.excerpt}, which does not exactly represent a non-negative safe integer.`
			};
			const parsed = asarDeclaredSizeSchema.safeParse(value);
			if (parsed.success) return { size: parsed.data };
			if (typeof value === "number" && !(Number.isFinite(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER)) return {
				size: null,
				limitation: "ASAR entry declares a numeric size outside the safe-integer range; its exact source value was not retained."
			};
			const declared = typeof value === "number" ? `size ${String(value)}` : typeof value === "string" ? `size ${quoteSource(value)}` : value === null ? "a null size" : Array.isArray(value) ? "an array size" : typeof value === "object" ? "an object size" : `a ${typeof value} size`;
			return {
				size: null,
				limitation: `ASAR entry declares ${declared}, which is not a non-negative safe integer.`
			};
		};
		parseArchiveOffset = (value) => {
			if (value === undefined || !/^(?:0|[1-9][0-9]*)$/u.test(value)) return undefined;
			const offset = Number(value);
			return Number.isSafeInteger(offset) ? offset : undefined;
		};
		readAsarListing = async (header, signal, admission = DEFAULT_ASAR_LISTING_ADMISSION) => {
			const parsedRoot = asarListingNodeSchema.safeParse(header);
			if (!parsedRoot.success) throw malformedMetadata("ASAR root", parsedRoot.error);
			const root = parsedRoot.data;
			if (root.files === undefined) throw new ArtifactReaderFailure("format", "ASAR root has no files table");
			const entries = [];
			const pending = [{
				parent: "",
				children: ownChildren(root.files)
			}];
			let retainedBytes = 0;
			const admitRetainedBytes = (bytes) => {
				retainedBytes += bytes;
				if (retainedBytes > admission.maximumBytes) throw new ArtifactReaderFailure("limit", `ASAR expanded listing exceeds its ${String(admission.maximumBytes)} byte representation budget (source ${admission.source}). On MCP, set asar.max_listing_bytes with update_analysis_settings, then retry the same archive; the change applies to the next operation without restarting REA. For CLI, set REA_ASAR_MAX_LISTING_BYTES in the invocation environment. The budget must be a positive safe integer in bytes. Header admission and worker heaps do not raise this independent retention budget.`, { admission: {
					kind: "asar-listing",
					...admission,
					requiredBytes: retainedBytes
				} });
			};
			let examined = 0;
			while (pending.length > 0) {
				if (examined++ % 128 === 0) {
					await setImmediate();
					assertAsarReadActive(signal);
				}
				const frame = pending.at(-1);
				if (frame === undefined) break;
				const next = frame.children.next();
				if (next.done) {
					pending.pop();
					continue;
				}
				const [name, raw] = next.value;
				if (name.length === 0 || name === "." || name === ".." || name.includes("/") || name.includes("\0") || HOST_PLATFORM.platform === "win32" && name.includes("\\")) throw new ArtifactReaderFailure("path", `ASAR header has an unsafe path component under ${frame.parent.length === 0 ? "the archive root" : quoteSource(frame.parent)}: ${quoteSource(name)}`);
				const units = frame.parent.length + name.length + (frame.parent.length === 0 ? 0 : 1);
				admitRetainedBytes(units * 2 + 256);
				const path = frame.parent.length === 0 ? name : `${frame.parent}/${name}`;
				const parsed = asarListingNodeSchema.safeParse(raw);
				if (!parsed.success) throw malformedMetadata(`ASAR entry ${quoteSource(path)}`, parsed.error);
				const metadata = parsed.data;
				if (metadata.files === undefined && metadata.link === undefined && metadata.size === undefined) throw new ArtifactReaderFailure("format", `ASAR entry ${quoteSource(path)} has no directory, link or file metadata`);
				const declaration = metadata.integrity;
				const supportedIntegrity = declaration?.algorithm === "SHA256" && /^[a-f0-9]{64}$/u.test(declaration.hash);
				const limitations = [];
				const { size, limitation: sizeLimitation } = readDeclaredSize(metadata.size);
				if (sizeLimitation !== undefined) {
					admitRetainedBytes(sizeLimitation.length * 2 + 64);
					limitations.push(sizeLimitation);
				}
				if (declaration !== undefined && (Object.hasOwn(declaration, "blockSize") || Object.hasOwn(declaration, "blocks"))) {
					admitRetainedBytes(BLOCK_INTEGRITY_LIMITATION.length * 2 + 64);
					limitations.push(BLOCK_INTEGRITY_LIMITATION);
				}
				if (declaration !== undefined && !supportedIntegrity) {
					admitRetainedBytes((declaration.algorithm.length + declaration.hash.length) * 12 + 512);
					const reason = declaration.algorithm === "SHA256" ? "has an invalid digest representation" : "uses an unsupported algorithm";
					limitations.push(`ASAR integrity declaration ${reason}; no declaration comparison was performed: ${JSON.stringify({
						algorithm: declaration.algorithm,
						hash: declaration.hash
					})}.`);
				}
				const facts = {
					path,
					executable: metadata.executable === true,
					unpacked: metadata.unpacked === true,
					declaredIntegrity: supportedIntegrity ? {
						algorithm: "sha256",
						digest: declaration.hash
					} : null,
					limitations
				};
				if (metadata.files !== undefined || metadata.link !== undefined) entries.push({
					...facts,
					kind: metadata.files !== undefined ? "directory" : "symlink",
					size
				});
				else if (metadata.size !== undefined) entries.push({
					...facts,
					kind: "file",
					size,
					packedOffset: parseArchiveOffset(metadata.offset)
				});
				if (metadata.files !== undefined) pending.push({
					parent: path,
					children: ownChildren(metadata.files)
				});
			}
			return entries.sort((left, right) => compareUnicodeCodePoints(left.path, right.path));
		};
	})))();
}

//#endregion
//#region dist/artifacts/AsarArtifactReader.js
var AsarArtifactReader, defaultRemoveSnapshot, asarUnpackedEntryFailure, waitForOperation, isMissingFile;
function init_AsarArtifactReader() {
	return (init_AsarArtifactReader = __esmMin((() => {
		init_callerPath();
		init_localPath();
		init_artifactIntegrity();
		init_resources();
		init_AsarEntryStream();
		init_OwnedFileHandle();
		init_AsarFailure();
		init_AsarListing();
		AsarArtifactReader = class {
			path;
			options;
			format = "asar";
			#extents;
			#selectedCanonicalSource;
			#entries = new Map();
			#ownedHandles = new Map();
			#snapshot;
			#snapshotRoot;
			#snapshotOperation = Promise.resolve();
			#snapshotGeneration = 0;
			constructor(path, options = {}) {
				this.path = path;
				this.options = options;
			}
			async *entries(signal, options) {
				const generation = this.#snapshotGeneration;
				let paths;
				try {
					await this.prepareContainer(undefined, signal);
					paths = await this.#withSnapshotOperation(async () => {
						const snapshotPath = this.#snapshotPath();
						this.#resetArchiveState();
						this.#entries.clear();
						const admitted = await this.#admitHeader(snapshotPath, signal);
						this.#extents = {
							archiveBytes: admitted.archiveBytes,
							headerBytes: admitted.headerBytes,
							jsonBytes: admitted.jsonBytes
						};
						assertAsarReadActive(signal);
						try {
							return await readAsarListing(admitted.header, signal, this.options.headerAdmission?.listing);
						} catch (cause) {
							if (cause instanceof ArtifactReaderFailure && (cause.reason === "format" || cause.reason === "path")) throw new ArtifactReaderFailure(cause.reason, `${cause.message} in ${this.path}`, { cause });
							throw cause;
						}
					}, signal);
				} catch (cause) {
					throw asarFailure(this.path, "inventory", cause);
				}
				for (const facts of paths) {
					this.#assertInventoryActive(generation, signal);
					const { path, kind } = facts;
					const providerPath = path.split("/").join(sep);
					const entry = {
						path,
						kind,
						declaredSize: facts.size,
						compressedSize: null,
						executable: facts.executable,
						encrypted: false,
						byteOffset: null,
						declaredIntegrity: facts.declaredIntegrity,
						unpacked: facts.unpacked,
						limitations: [...facts.limitations, ...kind === "symlink" ? ["ASAR symlink target was not followed or disclosed."] : []],
						adapterKey: providerPath
					};
					if (facts.kind === "file") this.#entries.set(providerPath, {
						facts,
						entry: copyArtifactEntry(entry)
					});
					yield entry;
				}
				this.#assertInventoryActive(generation, signal);
				options?.onCoverage?.({
					status: "complete",
					limitations: []
				});
			}
			#assertInventoryActive(generation, signal) {
				assertAsarReadActive(signal);
				if (generation !== this.#snapshotGeneration) throw new ArtifactReaderFailure("unavailable", "ASAR inventory snapshot was closed");
			}
			async #admitHeader(snapshotPath, signal) {
				const headerHandle = await this.#openOwned(snapshotPath, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
				let admission;
				try {
					const extents = await admitAsarHeader(headerHandle, signal, this.options.headerAdmission);
					admission = {
						ok: true,
						value: {
							...extents,
							header: await readAsarHeader(headerHandle, extents, signal)
						}
					};
				} catch (cause) {
					admission = {
						ok: false,
						cause
					};
				}
				try {
					await this.#closeOwnedHandle(headerHandle);
				} catch (cleanupCause) {
					if (!admission.ok) throw ArtifactReaderFailure.withCleanup(admission.cause, ArtifactReaderFailure.cleanupObservation(cleanupCause, snapshotPath));
					throw cleanupCause;
				}
				if (!admission.ok) throw admission.cause;
				return admission.value;
			}
			async open(entry, signal) {
				return this.#withSnapshotOperation(() => this.#openEntry(entry, signal), signal);
			}
			async #openEntry(entry, signal) {
				assertAsarReadActive(signal);
				const state = this.#entries.get(entry.adapterKey);
				if (state === undefined && entry.kind !== "file") throw new ArtifactReaderFailure("format", "ASAR entry is not a regular file");
				if (state === undefined) throw new ArtifactReaderFailure("integrity", `ASAR entry was not produced by this reader: ${entry.path}`, { integrityCheck: "foreign-entry" });
				if (!sameArtifactEntry(entry, state.entry)) throw new ArtifactReaderFailure("integrity", `ASAR entry metadata changed since inventory: ${state.entry.path}`, { integrityCheck: "entry-metadata" });
				if (state.entry.unpacked) return this.#openUnpackedStream(state.entry, signal);
				return this.#openPackedStream(state, signal);
			}
			async #openPackedStream(state, signal) {
				const { facts, entry: producedEntry } = state;
				const archiveSize = this.#extents?.archiveBytes;
				const headerSize = this.#extents?.headerBytes;
				const offset = facts.packedOffset;
				const start = offset === undefined || headerSize === undefined ? undefined : 8 + headerSize + offset;
				if (facts.size === null) throw new ArtifactEntryContentUnavailable(`ASAR entry declares no readable size: ${producedEntry.path}`, "ASAR packed entry bytes were not read because its declared size cannot bound them; no content hash or child artifact was produced.", undefined, artifactIntegrityDetails(producedEntry.path, producedEntry.declaredIntegrity, null, false));
				if (archiveSize === undefined || start === undefined || !Number.isSafeInteger(start) || start > archiveSize || facts.size > archiveSize - start) throw new ArtifactReaderFailure("format", `ASAR entry range is outside its container: ${producedEntry.path}`);
				const snapshotPath = this.#snapshotPath();
				let handle;
				try {
					const openedHandle = await this.#openOwned(snapshotPath, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
					handle = openedHandle;
					const observed = await openedHandle.stat();
					assertAsarReadActive(signal);
					if (!observed.isFile() || observed.size !== archiveSize) throw new ArtifactReaderFailure("integrity", `ASAR container changed before read: ${producedEntry.path}`, { integrityCheck: "container-identity" });
					if (facts.size === 0) {
						handle = undefined;
						await closeAsarHandle(() => this.#closeOwnedHandle(openedHandle), signal);
						return Readable.from([]);
					}
					const source = this.#ownedReadStream(openedHandle, {
						start,
						end: start + facts.size - 1,
						signal
					});
					handle = undefined;
					const output = readValidatedAsarEntry(source, facts.size, producedEntry.path, this.path, signal);
					this.#setOwnedOutput(openedHandle, output);
					return output;
				} catch (cause) {
					const failure = asarFailure(this.path, `read ${producedEntry.path}`, cause);
					if (handle !== undefined) {
						try {
							await this.#closeOwnedHandle(handle);
						} catch (cleanupCause) {
							throw ArtifactReaderFailure.withCleanup(failure, ArtifactReaderFailure.cleanupObservation(cleanupCause, snapshotPath));
						}
					}
					throw failure;
				}
			}
			/** Capture once per reader lifetime; bind all interpretation to these exact bytes. */
			async prepareContainer(expectedSha256, signal) {
				await this.#withSnapshotOperation(async () => {
					assertAsarReadActive(signal);
					await this.#validateSelectedArchive();
					if (this.#snapshot === undefined && this.#snapshotRoot !== undefined) await this.#closeSnapshot();
					if (this.#snapshot === undefined) await this.#captureSnapshot(signal);
					if (expectedSha256 !== undefined && this.#snapshot?.sha256 !== expectedSha256) throw new ArtifactReaderFailure("integrity", `ASAR container changed before interpretation: ${this.path}`, { integrityCheck: "container-identity" });
				}, signal);
			}
			/** Read the same captured container that supplies headers and packed members. */
			async openContainer(signal) {
				await this.prepareContainer(undefined, signal);
				return this.#withSnapshotOperation(async () => {
					assertAsarReadActive(signal);
					const snapshotPath = this.#snapshotPath();
					const handle = await this.#openOwned(snapshotPath, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
					return this.#ownedReadStream(handle, { signal });
				}, signal);
			}
			async close() {
				this.#snapshotGeneration += 1;
				await this.#withSnapshotOperation(() => this.#closeSnapshot());
			}
			async #captureSnapshot(signal) {
				let inputHandle;
				try {
					this.#snapshotRoot = await mkdtemp(join(tmpdir(), "rea-asar-snapshot-"));
					const snapshotPath = join(this.#snapshotRoot, "container.asar");
					const hash = createHash("sha256");
					inputHandle = await this.#openOwned(this.path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
					const source = this.#ownedReadStream(inputHandle, {
						signal,
						releaseOnClose: false
					});
					const digesting = new Transform({ transform(chunk, _encoding, callback) {
						hash.update(chunk);
						callback(null, chunk);
					} });
					await pipeline$1(source, digesting, createWriteStream(snapshotPath, {
						flags: "wx",
						mode: 384
					}));
					const completedInput = inputHandle;
					inputHandle = undefined;
					await this.#closeOwnedHandle(completedInput);
					assertAsarReadActive(signal);
					this.#snapshot = {
						path: snapshotPath,
						sha256: hash.digest("hex")
					};
				} catch (cause) {
					let failure = asarFailure(this.path, "snapshot", cause);
					if (inputHandle !== undefined) {
						const failedInput = inputHandle;
						inputHandle = undefined;
						try {
							await this.#closeOwnedHandle(failedInput);
						} catch (cleanupCause) {
							failure = ArtifactReaderFailure.withCleanup(failure, ArtifactReaderFailure.cleanupObservation(cleanupCause, this.path));
						}
					}
					try {
						if (this.#ownedHandles.size === 0) await this.#closeSnapshot();
					} catch (cleanupCause) {
						throw ArtifactReaderFailure.withCleanup(failure, ArtifactReaderFailure.cleanupObservation(cleanupCause, this.#snapshotRoot ?? this.path));
					}
					throw failure;
				}
			}
			async #closeSnapshot() {
				await this.#closeOwnedHandles();
				const root = this.#snapshotRoot;
				if (root !== undefined) {
					try {
						await (this.options.removeSnapshot ?? defaultRemoveSnapshot)(root);
						if (this.#snapshotRoot === root) this.#snapshotRoot = undefined;
					} catch (cause) {
						throw ArtifactReaderFailure.withCleanup(cause, {
							reason: `Could not remove ASAR snapshot: ${root}`,
							resources: [root]
						});
					}
				}
				if (root === undefined || this.#snapshotRoot === undefined) {
					this.#snapshot = undefined;
					this.#resetArchiveState();
					this.#entries.clear();
				}
			}
			async #withSnapshotOperation(operation, signal) {
				const previous = this.#snapshotOperation;
				let release;
				this.#snapshotOperation = new Promise((resolve) => {
					release = resolve;
				});
				try {
					await waitForOperation(previous, signal);
				} catch (cause) {
					void previous.then(release, release);
					throw cause;
				}
				try {
					assertAsarReadActive(signal);
					return await operation();
				} finally {
					release();
				}
			}
			#snapshotPath() {
				if (this.#snapshot === undefined) throw new ArtifactReaderFailure("unavailable", "ASAR snapshot was closed");
				return this.#snapshot.path;
			}
			provenance() {
				return [];
			}
			/** A selected companion cannot silently migrate to another packed target. */
			async #validateSelectedArchive() {
				const selected = this.options.selectedPath;
				if (selected === undefined) return;
				this.#selectedCanonicalSource ??= await realpath(this.path);
				await assertArtifactSelectedSource(this.#selectedCanonicalSource, selected);
			}
			async #openUnpackedStream(entry, signal) {
				if (!localPathStringSchema.safeParse(entry.adapterKey).success) throw new ArtifactEntryContentUnavailable(`ASAR unpacked member path cannot be represented without replacement: ${JSON.stringify(entry.path)}`, "ASAR unpacked member path cannot be represented without replacement on the local filesystem; companion bytes were not read and no content hash or child artifact was produced.");
				const unpackedRoot = `${this.options.selectedPath ?? this.path}.unpacked`;
				let handle;
				try {
					await this.#validateSelectedArchive();
					const rootMetadata = await lstat(unpackedRoot);
					if (!rootMetadata.isDirectory() || rootMetadata.isSymbolicLink()) throw new ArtifactReaderFailure("path", "ASAR unpacked companion is not a regular directory");
					const canonicalRoot = await realpath(unpackedRoot);
					const candidate = appendCallerPath(unpackedRoot, entry.adapterKey);
					const canonical = await realpath(candidate);
					const relativePath = relative(canonicalRoot, canonical);
					if (relativePath === ".." || relativePath.startsWith(`..${sep}`) || isAbsolute(relativePath)) throw new ArtifactReaderFailure("path", `ASAR unpacked entry escaped its companion directory: ${entry.path}`);
					const pathMetadata = await lstat(candidate);
					if (!pathMetadata.isFile() || pathMetadata.isSymbolicLink()) throw new ArtifactReaderFailure("path", `ASAR unpacked entry is not a regular file: ${entry.path}`);
					handle = await (this.options.openUnpackedFile ?? open)(canonical, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
					const openedHandle = handle;
					this.#adoptHandle(openedHandle, canonical);
					const openedMetadata = await openedHandle.stat();
					if (!openedMetadata.isFile() || openedMetadata.dev !== pathMetadata.dev || openedMetadata.ino !== pathMetadata.ino) {
						throw new ArtifactReaderFailure("integrity", `ASAR unpacked entry changed before read: ${entry.path}`, { integrityCheck: "unpacked-entry-identity" }, artifactIntegrityDetails(entry.path, entry.declaredIntegrity, null, true));
					}
					assertAsarReadActive(signal);
					const source = this.#ownedReadStream(openedHandle, {
						start: 0,
						signal
					});
					handle = undefined;
					const output = readValidatedAsarEntry(source, undefined, entry.path, this.path, signal);
					this.#setOwnedOutput(openedHandle, output);
					return output;
				} catch (cause) {
					let failure = asarUnpackedEntryFailure(this.path, entry, cause);
					if (handle !== undefined && this.#ownedHandles.has(handle)) {
						try {
							await this.#closeOwnedHandle(handle);
						} catch (cleanupCause) {
							failure = ArtifactReaderFailure.withCleanup(failure, ArtifactReaderFailure.cleanupObservation(cleanupCause, this.#ownedHandles.get(handle)?.path ?? entry.path));
						}
					}
					throw failure;
				}
			}
			async #closeOwnedHandle(handle) {
				const owned = this.#ownedHandles.get(handle);
				if (owned === undefined) return;
				owned.output?.destroy();
				owned.source?.destroy();
				try {
					await owned.owner.close();
				} catch (cause) {
					throw ArtifactReaderFailure.withCleanup(cause, ArtifactReaderFailure.cleanupObservation(cause, owned.path));
				}
				this.#ownedHandles.delete(handle);
			}
			async #closeOwnedHandles() {
				let failure;
				for (const [handle, owned] of this.#ownedHandles) {
					try {
						await this.#closeOwnedHandle(handle);
					} catch (cause) {
						failure = ArtifactReaderFailure.withCleanup(failure ?? cause, ArtifactReaderFailure.cleanupObservation(cause, owned.path));
					}
				}
				if (failure !== undefined) throw failure;
			}
			async #openOwned(path, flags) {
				const handle = await (this.options.openFile ?? open)(path, flags);
				this.#adoptHandle(handle, path);
				return handle;
			}
			#adoptHandle(handle, path) {
				this.#ownedHandles.set(handle, {
					path,
					owner: new OwnedFileHandle(handle)
				});
			}
			#ownedReadStream(handle, options) {
				const { releaseOnClose, ...readOptions } = options;
				const source = readArtifactFileChunks(handle, readOptions);
				const owned = this.#ownedHandles.get(handle);
				if (owned === undefined) throw new ArtifactReaderFailure("integrity", "ASAR handle has no owner", { integrityCheck: "reader-ownership" });
				owned.source = source;
				owned.output = source;
				if (releaseOnClose !== false) source.once("close", () => {
					void this.#closeOwnedHandle(handle).catch(() => undefined);
				});
				return source;
			}
			#setOwnedOutput(handle, output) {
				const owned = this.#ownedHandles.get(handle);
				if (owned !== undefined) owned.output = output;
			}
			#resetArchiveState() {
				this.#extents = undefined;
			}
		};
		defaultRemoveSnapshot = (path) => rm(path, {
			recursive: true,
			force: true
		});
		asarUnpackedEntryFailure = (archivePath, entry, cause) => {
			if (cause instanceof ArtifactReaderFailure) return cause;
			if (entry.unpacked && isMissingFile(cause)) return new ArtifactEntryContentUnavailable(`ASAR unpacked entry bytes are unavailable: ${entry.path}`, "ASAR unpacked companion bytes were unavailable; no content hash or child artifact was produced.", { cause }, artifactIntegrityDetails(entry.path, entry.declaredIntegrity, null, true));
			return asarFailure(archivePath, `read ${entry.path}`, cause);
		};
		waitForOperation = async (operation, signal) => {
			if (signal === undefined) return operation;
			assertAsarReadActive(signal);
			await new Promise((resolve, reject) => {
				const removeAbortListener = () => signal.removeEventListener("abort", onAbort);
				const onAbort = () => {
					removeAbortListener();
					reject(asarCancellationFailure(signal.reason));
				};
				signal.addEventListener("abort", onAbort, { once: true });
				operation.then(() => {
					removeAbortListener();
					resolve();
				}, (cause) => {
					removeAbortListener();
					reject(cause);
				});
			});
		};
		isMissingFile = (cause) => typeof cause === "object" && cause !== null && "code" in cause && cause.code === "ENOENT";
	})))();
}

//#endregion
//#region dist/artifacts/bun/BunModuleGraphMembers.js
var LOADERS, MODULE_FORMATS, SIDES, decodeBunModuleGraph, recordSizes, readRecord, assessLayout, recordPointerFailure, decodeRecord, optionalRange, named, textFact, readNul, pointerFits, pointerFailure, unsupported;
function init_BunModuleGraphMembers() {
	return (init_BunModuleGraphMembers = __esmMin((() => {
		init_artifactReaderLimits();
		init_strictUtf8();
		init_binaryContainer();
		init_resources();
		init_BunModuleGraphLayout();
		LOADERS = [
			"jsx",
			"js",
			"ts",
			"tsx",
			"css",
			"file",
			"json",
			"jsonc",
			"toml",
			"wasm",
			"napi",
			"base64",
			"dataurl",
			"text",
			"bunsh",
			"sqlite",
			"sqlite-embedded",
			"html",
			"yaml",
			"json5",
			"md",
			"xml"
		];
		MODULE_FORMATS = [
			"none",
			"esm",
			"cjs"
		];
		SIDES = ["server", "client"];
		decodeBunModuleGraph = async (graph, limits = DEFAULT_BUN_READER_LIMITS) => {
			const { data } = graph;
			const table = graph.modules;
			if (!pointerFits(data, table)) throw bunFormatFailure("modules pointer exceeds the Bun module graph");
			if (table.length === 0) throw unsupported("the module table is empty");
			const candidates = recordSizes(table.length);
			if (candidates.length === 0) throw unsupported(`record table length ${String(table.length)} matches no known revision`);
			if (candidates.every((size) => table.length / size > limits.module_count)) throw bunModuleCountLimit(table.length / Math.max(...candidates), limits);
			const records = await data.read(table.offset, table.length);
			let recordBytes = candidates[0];
			if (candidates.length > 1) {
				const assessments = [];
				for (const recordBytes of candidates) assessments.push({
					recordBytes,
					failure: await assessLayout(graph, records, recordBytes, limits)
				});
				const valid = assessments.filter((item) => item.failure === null);
				if (valid.length > 1) throw unsupported(`record table length ${String(table.length)} matches more than one known revision`);
				const selected = valid[0] ?? assessments[0];
				if (selected === undefined || selected.failure !== null) throw selected?.failure ?? unsupported(`record table length ${String(table.length)} matches no known revision`);
				recordBytes = selected.recordBytes;
			}
			const count = table.length / recordBytes;
			if (graph.entryPointId >= count) throw bunFormatFailure(`entry_point_id ${String(graph.entryPointId)} is outside the module table`);
			const revision = recordBytes === 52 ? "bun-1.3.9" : "bun-1.3.3";
			if (!pointerFits(data, graph.compileExecArgv)) throw bunFormatFailure("compile_exec_argv pointer exceeds the Bun module graph");
			const modules = [];
			let retained = graph.compileExecArgv.length * 6;
			if (retained > limits.representation_bytes) throw bunMetadataBytesLimit(retained, limits);
			for (let index = 0; index < count; index += 1) {
				const record = readRecord(records, index, recordBytes);
				retained += 512 + readPointer(record, 0).length * 6;
				if (recordBytes === 52) retained += readPointer(record, 40).length * 6;
				if (retained > limits.representation_bytes) throw bunMetadataBytesLimit(retained, limits);
				if (index % 256 === 0) await setImmediate();
				if (candidates.length === 1) {
					const failure = await recordPointerFailure(data, record, recordBytes, false);
					if (failure !== null) throw failure;
				}
				modules.push(await decodeRecord(data, record, index, revision));
			}
			return {
				revision,
				entryPointId: graph.entryPointId,
				flags: graph.flags,
				compileExecArgv: textFact(await readNul(data, graph.compileExecArgv, "compile_exec_argv"), true),
				modules
			};
		};
		recordSizes = (length) => {
			const sizes = [];
			if (length % 36 === 0) sizes.push(36);
			if (length % 52 === 0) sizes.push(52);
			return sizes;
		};
		readRecord = (records, index, width) => new BinaryReader(records.subarray(index * width, (index + 1) * width), true, "bun-standalone");
		assessLayout = async (graph, records, recordBytes, limits) => {
			const { data, entryPointId } = graph;
			const count = records.length / recordBytes;
			if (count > limits.module_count) return bunModuleCountLimit(count, limits);
			for (let index = 0; index < count; index += 1) {
				const record = readRecord(records, index, recordBytes);
				if (index % 256 === 0) await setImmediate();
				const failure = await recordPointerFailure(data, record, recordBytes);
				if (failure !== null) return failure;
			}
			if (entryPointId >= count) return bunFormatFailure(`entry_point_id ${String(entryPointId)} is outside the module table`);
			return null;
		};
		recordPointerFailure = async (data, record, recordBytes, verifyTextNuls = true) => {
			const fields = recordBytes === 52 ? [
				[
					0,
					true,
					"name"
				],
				[
					8,
					true,
					"contents"
				],
				[
					16,
					false,
					"sourcemap"
				],
				[
					24,
					false,
					"bytecode"
				],
				[
					32,
					false,
					"module_info"
				],
				[
					40,
					true,
					"bytecode_origin"
				]
			] : [
				[
					0,
					true,
					"name"
				],
				[
					8,
					true,
					"contents"
				],
				[
					16,
					false,
					"sourcemap"
				],
				[
					24,
					false,
					"bytecode"
				]
			];
			for (const [offset, nul, label] of fields) {
				const failure = await pointerFailure(data, readPointer(record, offset), nul && (verifyTextNuls || offset === 8), label);
				if (failure !== null) return failure;
			}
			return null;
		};
		decodeRecord = async (data, record, index, revision) => {
			const wide = revision === "bun-1.3.9";
			const metadataAt = wide ? 48 : 32;
			const bytes = record.bytes;
			const encoding = bytes[metadataAt] ?? 0;
			const loader = bytes[metadataAt + 1] ?? 0;
			const moduleFormat = bytes[metadataAt + 2] ?? 0;
			const side = bytes[metadataAt + 3] ?? 0;
			const name = await readNul(data, readPointer(record, 0), "name");
			const contents = readPointer(record, 8);
			const sourcemap = optionalRange(readPointer(record, 16));
			const bytecode = optionalRange(readPointer(record, 24));
			const moduleInfo = wide ? optionalRange(readPointer(record, 32)) : null;
			const origin = wide ? textFact(await readNul(data, readPointer(record, 40), "bytecode_origin"), false) : null;
			const encodingName = encoding === 2 ? wide ? null : "utf8" : named(["binary", "latin1"], encoding);
			return {
				index,
				nameText: textFact(name, true),
				contents: {
					offset: contents.offset,
					length: contents.length
				},
				sourcemap,
				bytecode,
				moduleInfo,
				bytecodeOrigin: origin === null || origin.text === null && origin.hex === null ? null : origin,
				encoding,
				encodingName,
				loader,
				loaderName: named(LOADERS, loader),
				moduleFormat,
				moduleFormatName: named(MODULE_FORMATS, moduleFormat),
				side,
				sideName: named(SIDES, side)
			};
		};
		optionalRange = (pointer) => pointer.length === 0 ? null : {
			offset: pointer.offset,
			length: pointer.length
		};
		named = (table, value) => table[value] ?? null;
		textFact = (bytes, emptyIsText) => {
			if (bytes.length === 0) return emptyIsText ? {
				text: "",
				hex: null
			} : {
				text: null,
				hex: null
			};
			if (isStrictUtf8(bytes)) return {
				text: bytes.toString("utf8"),
				hex: null
			};
			return {
				text: null,
				hex: bytes.toString("hex")
			};
		};
		readNul = async (data, pointer, label) => {
			const end = pointer.offset + pointer.length;
			if (!pointerFits(data, pointer) || pointer.length > 0 && end >= data.length) throw bunFormatFailure(`${label} pointer exceeds the Bun module graph`);
			const bytes = await data.read(pointer.offset, pointer.length + (pointer.length > 0 ? 1 : 0));
			if (pointer.length > 0 && bytes[pointer.length] !== 0) throw bunFormatFailure(`${label} is missing its terminating NUL`);
			return bytes.subarray(0, pointer.length);
		};
		pointerFits = (data, pointer) => pointer.offset <= data.length && pointer.offset + pointer.length <= data.length;
		pointerFailure = async (data, pointer, nul, label) => {
			const end = pointer.offset + pointer.length;
			if (pointer.offset > data.length || end > data.length) return bunFormatFailure(`${label} pointer exceeds the Bun module graph`);
			if (!nul || pointer.length === 0) return null;
			if (end >= data.length) return bunFormatFailure(`${label} pointer exceeds the Bun module graph`);
			if ((await data.read(end, 1))[0] !== 0) return bunFormatFailure(`${label} is missing its terminating NUL`);
			return null;
		};
		unsupported = (detail) => new ArtifactReaderFailure("unavailable", `Bun standalone module graph layout is unsupported: ${detail}`);
	})))();
}

//#endregion
//#region dist/artifacts/BunStandaloneArtifactReader.js
var REGIONS, BunStandaloneArtifactReader, regionRange, moduleEntry, logicalModulePath, entryMetadataJson;
function init_BunStandaloneArtifactReader() {
	return (init_BunStandaloneArtifactReader = __esmMin((() => {
		init_ArtifactPreparation();
		init_artifactReaderLimits();
		init_artifactExpansionBudget();
		init_jsonValueByteLength();
		init_readFileHandleChunks();
		init_resources();
		init_OwnedArtifactStream();
		init_BunModuleGraphLayout();
		init_BunModuleGraphMembers();
		REGIONS = [
			"contents",
			"sourcemap",
			"bytecode",
			"module-info"
		];
		BunStandaloneArtifactReader = class {
			limits;
			expandedBytes;
			format = "bun-standalone";
			#scope = new ArtifactResourceScope();
			#entries = new Map();
			#lifecycle = new ArtifactStreamLifecycle("Bun standalone");
			#source;
			#admission;
			#preparation = new ArtifactPreparation();
			#header;
			constructor(path, admitted, limits = DEFAULT_BUN_READER_LIMITS, expandedBytes) {
				this.limits = limits;
				this.expandedBytes = expandedBytes;
				if (admitted !== undefined && "kind" in admitted) {
					this.#admission = admitted;
					this.#source = new ArtifactFileSource(path, "Bun standalone", admitted.source);
				} else this.#source = new ArtifactFileSource(path, "Bun standalone", admitted);
			}
			formatMetadata() {
				return this.#header === undefined ? undefined : { ...this.#header };
			}
			async prepareContainer(expectedSha256, signal) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#source.bindSelectedPathSha256(expectedSha256, signal);
				});
			}
			async *entries(signal, options) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#preparation.run(signal, () => this.#prepare(signal), () => this.#assertOpen(signal));
					await this.#source.readSelectedPath(signal);
				});
				this.#assertOpen(signal);
				let index = 0;
				for (const entry of this.#entries.values()) {
					if (index++ % 256 === 0) await setImmediate();
					this.#assertOpen(signal);
					yield copyArtifactEntry(entry);
				}
				this.#assertOpen(signal);
				options?.onCoverage?.({
					status: "complete",
					limitations: []
				});
			}
			async open(entry, signal) {
				return this.#scope.run(async () => {
					this.#assertOpen(signal);
					const stored = this.#entries.get(entry.adapterKey);
					assertProducedEntry(entry, stored, "Bun standalone entry does not match its owning inventory");
					const { handle } = await this.#source.readSelectedPath(signal);
					this.#assertOpen(signal);
					if (stored.byteOffset === null || stored.declaredSize === null) throw bunFormatFailure("member has no physical byte range");
					const lifecycle = this.#lifecycle.member(signal);
					const { signal: streamSignal, cancellationFailure } = lifecycle;
					const source = stored.declaredSize === 0 ? Readable.from([]) : readFileHandleChunks(handle, {
						start: stored.byteOffset,
						end: stored.byteOffset + stored.declaredSize - 1,
						signal: streamSignal,
						cancellationFailure
					});
					const output = checkedArtifactMemberStream(stored, "Bun standalone", bunFormatFailure, () => lifecycle.verify((signal) => this.#source.readSelectedPath(signal)));
					ownArtifactStream(source, output, {
						scope: this.#scope,
						signal: streamSignal,
						cancellationFailure,
						label: "Bun standalone"
					});
					return output;
				});
			}
			async close() {
				this.#lifecycle.close();
				await this.#scope.close();
				await this.#source.close();
				this.#entries.clear();
				this.#header = undefined;
				this.#admission = undefined;
				this.#preparation.clear();
			}
			provenance() {
				return [];
			}
			#assertOpen(signal) {
				assertArtifactReadActive(signal);
				if (this.#lifecycle.closed) throw new ArtifactReaderFailure("unavailable", "Bun standalone reader is closed");
			}
			async #prepare(signal) {
				const source = await this.#source.readSelectedPath(signal);
				const probe = this.#admission?.probe ?? await probeBunStandaloneGraph(source.handle, source.initial.size, signal, this.limits);
				if (probe.status === "absent") throw bunFormatFailure("no Bun section or trailer");
				if (probe.failure !== undefined) throw probe.failure;
				if (probe.claim === undefined) throw bunFormatFailure("graph claim was not admitted");
				const located = await loadBunStandaloneGraph(source.handle, probe.claim, signal, this.limits);
				if (located.status === "absent") throw bunFormatFailure("no Bun section or trailer");
				if (located.failure !== undefined) throw located.failure;
				if (located.graph === undefined) throw bunFormatFailure("graph data was not admitted");
				const decoded = await decodeBunModuleGraph(located.graph, this.limits);
				const entryModule = decoded.modules[decoded.entryPointId];
				const entryDestination = entryModule === undefined ? null : logicalModulePath(entryModule, this.limits.path_parts);
				const header = {
					kind: "bun-standalone",
					layout_revision: decoded.revision,
					carrier: located.graph.carrier,
					payload_offset: located.graph.payloadOffset,
					payload_length: located.graph.payloadLength,
					module_count: decoded.modules.length,
					entry_point_id: decoded.entryPointId,
					entry_point_source_name: entryModule?.nameText.text ?? null,
					entry_point_logical_path: entryDestination?.path ?? null,
					compile_exec_argv: decoded.compileExecArgv.text,
					compile_exec_argv_hex: decoded.compileExecArgv.hex,
					flags: decoded.flags
				};
				let retainedBytes = jsonValueByteLength(header, this.limits.representation_bytes);
				if (retainedBytes > this.limits.representation_bytes) throw bunMetadataBytesLimit(retainedBytes, this.limits);
				const entries = new Map();
				let declaredPlaintext = 0n;
				const expansionBudget = BigInt(this.expandedBytes ?? artifactExpansionBudgetBytes(located.graph.payloadLength));
				const paths = new ArtifactPathRegistry({
					maxParts: this.limits.path_parts,
					maxNodes: this.limits.path_nodes,
					limitFailure: (field, maximum, required) => artifactReaderLimitFailure(`artifact_limits.bun.${field}`, maximum, "count", required)
				});
				for (const module of decoded.modules) {
					assertArtifactReadActive(signal);
					const destination = module.index === decoded.entryPointId && entryDestination !== null ? entryDestination : logicalModulePath(module, this.limits.path_parts);
					for (const region of REGIONS) {
						const range = regionRange(module, region);
						if (range === null) continue;
						declaredPlaintext += BigInt(range.length);
						if (declaredPlaintext > expansionBudget) throw artifactReaderLimitFailure("artifact_limits.expanded_bytes", Number(expansionBudget), "bytes", declaredPlaintext);
						const entry = moduleEntry(located.graph, module, region, range, destination);
						paths.reservePath(entry.path);
						retainedBytes += jsonValueByteLength(entryMetadataJson(entry), Math.max(0, this.limits.representation_bytes - retainedBytes));
						if (retainedBytes > this.limits.representation_bytes) throw bunMetadataBytesLimit(retainedBytes, this.limits);
						entries.set(entry.adapterKey, entry);
					}
				}
				await this.#source.readSelectedPath(signal);
				this.#assertOpen(signal);
				this.#entries = entries;
				this.#header = header;
				this.#admission = undefined;
			}
		};
		regionRange = (module, region) => {
			if (region === "contents") return module.contents;
			if (region === "sourcemap") return module.sourcemap;
			if (region === "bytecode") return module.bytecode;
			return module.moduleInfo;
		};
		moduleEntry = (graph, module, region, range, located) => {
			const suffix = region === "contents" ? "" : region === "sourcemap" ? ".bunmap" : region === "bytecode" ? ".bytecode" : ".module-info";
			const metadata = {
				kind: "bun-standalone-entry",
				index: module.index,
				region,
				source_name: module.nameText.text,
				source_name_hex: module.nameText.hex,
				encoding: module.encoding,
				encoding_name: module.encodingName,
				loader: module.loader,
				loader_name: module.loaderName,
				module_format: module.moduleFormat,
				module_format_name: module.moduleFormatName,
				side: module.side,
				side_name: module.sideName,
				entry_point: module.index === graph.entryPointId,
				sourcemap_bytes: module.sourcemap?.length ?? 0,
				bytecode_bytes: module.bytecode?.length ?? 0,
				module_info_bytes: module.moduleInfo?.length ?? 0,
				bytecode_origin: module.bytecodeOrigin?.text ?? null,
				bytecode_origin_hex: module.bytecodeOrigin?.hex ?? null
			};
			return {
				path: `${located.path}${suffix}`,
				...located.sourcePath === undefined ? {} : { sourcePath: located.sourcePath },
				kind: "file",
				declaredSize: range.length,
				compressedSize: null,
				executable: false,
				encrypted: false,
				byteOffset: graph.payloadOffset + range.offset,
				declaredIntegrity: null,
				unpacked: false,
				limitations: [...located.limitations ?? []],
				adapterKey: `bun:${String(module.index)}:${region}`,
				formatMetadata: metadata
			};
		};
		logicalModulePath = (module, maximumParts) => {
			const fallback = maximumParts === 1 ? `bun-module-${String(module.index)}` : `bun-modules/${String(module.index)}`;
			const text = module.nameText.text;
			if (text === null || text.length === 0) return { path: fallback };
			const candidate = text.startsWith("/") ? text.slice(1) : text;
			let parts = 1;
			for (let index = 0; index < candidate.length; index++) if (candidate.charCodeAt(index) === 47 && ++parts > maximumParts) return {
				path: fallback,
				sourcePath: text,
				limitations: [`The virtual name exceeds artifact_limits.bun.path_parts (${String(maximumParts)} parts); an indexed path is used and the original name is retained.`]
			};
			try {
				return {
					path: normalizeArtifactPath(candidate),
					sourcePath: text
				};
			} catch (cause) {
				if (!(cause instanceof ArtifactReaderFailure) || cause.reason !== "path") throw cause;
				return {
					path: fallback,
					sourcePath: text
				};
			}
		};
		entryMetadataJson = (entry) => entry.formatMetadata === undefined ? null : { ...entry.formatMetadata };
	})))();
}

//#endregion
//#region dist/artifacts/DenoStandaloneArtifactReader.js
var MAX_DENO_LOGICAL_PATH_NODES, UNLISTED_VFS_LIMITATION, NON_PORTABLE_PATH_CHARACTERS, percentEscape, MAX_DENO_RETAINED_BYTES, DenoStandaloneArtifactReader, sectionHeader, vfsEntry, remoteEntries, storedEntry, isEntryPoint, remoteUrlSuffix, remoteDestination, SHARED_REMOTE_PATH_LIMITATION, remoteConcretePaths, assignRemoteDestinations, denoRetainedLimit;
function init_DenoStandaloneArtifactReader() {
	return (init_DenoStandaloneArtifactReader = __esmMin((() => {
		init_ArtifactPreparation();
		init_readFileHandleChunks();
		init_artifactExpansionBudget();
		init_jsonValueByteLength();
		init_resources();
		init_OwnedArtifactStream();
		init_DenoSectionLayout();
		init_ArtifactEmbeddedFormatProbes();
		init_DenoVirtualFs();
		MAX_DENO_LOGICAL_PATH_NODES = 25e4;
		UNLISTED_VFS_LIMITATION = "The Deno compile virtual filesystem could not be listed, so its files are not inventoried.";
		NON_PORTABLE_PATH_CHARACTERS = /[:\\*?"<>|\u0001-\u001f]/gu;
		percentEscape = (character) => `%${character.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")}`;
		MAX_DENO_RETAINED_BYTES = 256 * 1024 * 1024;
		DenoStandaloneArtifactReader = class {
			path;
			format = "deno-standalone";
			#scope = new ArtifactResourceScope();
			#entries = new Map();
			#lifecycle = new ArtifactStreamLifecycle("Deno compile");
			#source;
			#admission;
			#preparation = new ArtifactPreparation();
			#header;
			constructor(path, admitted) {
				this.path = path;
				if (admitted !== undefined && "kind" in admitted) {
					this.#admission = admitted;
					this.#source = new ArtifactFileSource(path, "Deno compile", admitted.source);
				} else this.#source = new ArtifactFileSource(path, "Deno compile", admitted);
			}
			formatMetadata() {
				return this.#header === undefined ? undefined : { ...this.#header };
			}
			async prepareContainer(expectedSha256, signal) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#source.bindSelectedPathSha256(expectedSha256, signal);
				});
			}
			async *entries(signal, options) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#preparation.run(signal, () => this.#prepare(signal), () => this.#assertOpen(signal));
					await this.#source.readSelectedPath(signal);
				});
				options?.onCoverage?.(this.#header?.vfs_listing === "unsupported" ? {
					status: "unknown",
					limitations: [UNLISTED_VFS_LIMITATION]
				} : {
					status: "complete",
					limitations: []
				});
				let index = 0;
				for (const entry of this.#entries.values()) {
					if (index++ % 256 === 0) await setImmediate();
					this.#assertOpen(signal);
					yield copyArtifactEntry(entry);
				}
				this.#assertOpen(signal);
			}
			async open(entry, signal) {
				return this.#scope.run(async () => {
					this.#assertOpen(signal);
					const stored = this.#entries.get(entry.adapterKey);
					assertProducedEntry(entry, stored, "Deno compile entry does not match its owning inventory");
					const { handle } = await this.#source.readSelectedPath(signal);
					this.#assertOpen(signal);
					if (stored.byteOffset === null || stored.declaredSize === null) throw denoFormatFailure("member has no physical byte range");
					const lifecycle = this.#lifecycle.member(signal);
					const { signal: streamSignal, cancellationFailure } = lifecycle;
					const source = stored.declaredSize === 0 ? Readable.from([]) : readFileHandleChunks(handle, {
						start: stored.byteOffset,
						end: stored.byteOffset + stored.declaredSize - 1,
						signal: streamSignal,
						cancellationFailure
					});
					const output = checkedArtifactMemberStream(stored, "Deno compile", denoFormatFailure, () => lifecycle.verify((signal) => this.#source.readSelectedPath(signal)));
					ownArtifactStream(source, output, {
						scope: this.#scope,
						signal: streamSignal,
						cancellationFailure,
						label: "Deno compile"
					});
					return output;
				});
			}
			async close() {
				this.#lifecycle.close();
				await this.#scope.close();
				await this.#source.close();
				this.#entries.clear();
				this.#header = undefined;
				this.#admission = undefined;
				this.#preparation.clear();
			}
			provenance() {
				return [];
			}
			#assertOpen(signal) {
				assertArtifactReadActive(signal);
				if (this.#lifecycle.closed) throw new ArtifactReaderFailure("unavailable", "Deno compile reader is closed");
			}
			async #prepare(signal) {
				const source = await this.#source.readSelectedPath(signal);
				const probe = this.#admission?.probe ?? await new ArtifactEmbeddedFormatProbes(this.path, source, signal).denoStandalone();
				if (probe.status === "absent") throw denoFormatFailure("no Deno compile section");
				if ("failure" in probe) throw probe.failure;
				const location = probe.location;
				const section = await parseDenoSection(location.length, async (offset, length) => {
					const bytes = Buffer.alloc(length);
					let filled = 0;
					while (filled < length) {
						assertArtifactReadActive(signal);
						const read = await source.handle.read(bytes, filled, length - filled, location.offset + offset + filled);
						assertArtifactReadActive(signal);
						if (read.bytesRead === 0) throw denoFormatFailure("section read was short");
						filled += read.bytesRead;
					}
					return bytes;
				}, signal);
				const header = sectionHeader(location, section);
				let retainedBytes = jsonValueByteLength(header, MAX_DENO_RETAINED_BYTES);
				if (retainedBytes > 268435456) throw denoRetainedLimit(retainedBytes);
				let declaredPlaintext = 0n;
				const expansionBudget = BigInt(artifactExpansionBudgetBytes(location.length));
				const paths = new ArtifactPathRegistry({
					maxParts: 256,
					maxNodes: MAX_DENO_LOGICAL_PATH_NODES
				});
				const entries = new Map();
				const admit = (entry) => {
					if (entry.declaredSize !== null) {
						declaredPlaintext += BigInt(entry.declaredSize);
						if (declaredPlaintext > expansionBudget) throw new ArtifactReaderFailure("limit", `Deno compile readable entries declare ${String(declaredPlaintext)} plaintext bytes, exceeding this section's ${String(expansionBudget)}-byte expansion budget. This release has no runtime override. Host memory and NODE_OPTIONS do not raise it.`, { boundary: "capacity" });
					}
					paths.reservePath(entry.path);
					retainedBytes += jsonValueByteLength(entry.formatMetadata ?? null, Math.max(0, MAX_DENO_RETAINED_BYTES - retainedBytes));
					if (retainedBytes > 268435456) throw denoRetainedLimit(retainedBytes);
					entries.set(entry.adapterKey, entry);
				};
				if (section.vfs.listing === "listed") {
					for (const member of section.vfs.members) {
						assertArtifactReadActive(signal);
						admit(vfsEntry(location.offset, section, member));
					}
				}
				const remotePlans = assignRemoteDestinations(section, paths);
				for (const module of section.remoteModules.modules) {
					assertArtifactReadActive(signal);
					const destination = remotePlans.get(module.index);
					if (destination === undefined) continue;
					for (const entry of remoteEntries(location.offset, section, module, destination)) admit(entry);
				}
				await this.#source.readSelectedPath(signal);
				this.#assertOpen(signal);
				this.#entries = entries;
				this.#header = header;
				this.#admission = undefined;
			}
		};
		sectionHeader = (location, section) => ({
			kind: "deno-standalone",
			carrier: location.carrier,
			embedding: location.embedding,
			section_offset: location.offset,
			section_length: location.length,
			entrypoint_key: section.metadata.entrypointKey,
			argv: section.metadata.argv === null ? null : [...section.metadata.argv],
			v8_flags: section.metadata.v8Flags === null ? null : [...section.metadata.v8Flags],
			permissions: section.metadata.permissions,
			unstable_config: section.metadata.unstableConfig,
			app_name: section.metadata.appName,
			self_extracting: section.metadata.selfExtracting,
			npm_snapshot_byte_length: section.npmSnapshotByteLength,
			env_var_count: section.metadata.envVarCount,
			env_vars: section.metadata.envVars === null ? null : section.metadata.envVars.map((item) => ({
				name: item.name,
				value: item.value,
				value_byte_length: item.valueByteLength
			})),
			ca_data: section.metadata.caData === null ? null : [...section.metadata.caData],
			ca_data_byte_length: section.metadata.caDataByteLength,
			specifier_count: section.specifiers.count,
			specifier_byte_length: section.specifiers.byteLength,
			specifier_listing: section.specifiers.listing,
			redirect_count: section.redirects.count,
			redirect_byte_length: section.redirects.byteLength,
			redirect_listing: section.redirects.listing,
			remote_module_count: section.remoteModules.count,
			remote_module_byte_length: section.remoteModules.byteLength,
			remote_module_listing: section.remoteModules.listing,
			vfs_header_byte_length: section.vfsHeaderByteLength,
			vfs_file_data_byte_length: section.vfsFileData.length,
			vfs_listing: section.vfs.listing,
			vfs_case_sensitivity: section.metadata.vfsCaseSensitivity
		});
		vfsEntry = (sectionOffset, section, member) => {
			const metadata = {
				kind: "deno-standalone-entry",
				role: member.role,
				index: member.index,
				source_path: member.sourcePath,
				entry_point: isEntryPoint(member.role, member.sourcePath, section.metadata.entrypointKey),
				executable: member.executable,
				is_valid_utf8: member.isValidUtf8,
				symlink_dest_parts: member.symlinkDestParts === null ? null : [...member.symlinkDestParts],
				media_type: null,
				media_type_name: null
			};
			const physical = member.offset === null || member.length === null ? null : {
				offset: sectionOffset + section.vfsFileData.sectionOffset + member.offset,
				length: member.length
			};
			return storedEntry(member.path, member.sourcePath, member.limitations, physical, metadata);
		};
		remoteEntries = (sectionOffset, section, module, destination) => {
			const regions = [
				{
					role: "remote-module",
					range: module.data
				},
				...module.transpiled === null ? [] : [{
					role: "remote-transpiled",
					range: module.transpiled
				}],
				...module.sourceMap === null ? [] : [{
					role: "remote-source-map",
					range: module.sourceMap
				}],
				...module.cjsExportAnalysis === null ? [] : [{
					role: "remote-cjs-export-analysis",
					range: module.cjsExportAnalysis
				}]
			];
			return regions.map(({ role, range }) => {
				const suffix = role === "remote-module" ? "" : role === "remote-transpiled" ? DENO_CHILD_SUFFIXES.transpiled : role === "remote-source-map" ? DENO_CHILD_SUFFIXES.sourceMap : DENO_CHILD_SUFFIXES.cjsExportAnalysis;
				const path = `${destination.path}${suffix}`;
				const metadata = {
					kind: "deno-standalone-entry",
					role,
					index: module.index,
					source_path: destination.sourcePath,
					entry_point: isEntryPoint(role, destination.sourcePath, section.metadata.entrypointKey),
					executable: false,
					is_valid_utf8: module.isValidUtf8,
					symlink_dest_parts: null,
					media_type: module.mediaType,
					media_type_name: denoMediaTypeName(module.mediaType)
				};
				return storedEntry(path, destination.sourcePath, destination.limitations, {
					offset: sectionOffset + range.sectionOffset,
					length: range.length
				}, metadata);
			});
		};
		storedEntry = (path, sourcePath, limitations, physical, metadata) => ({
			path,
			...sourcePath === null ? {} : { sourcePath },
			kind: metadata.role === "vfs-symlink" ? "symlink" : "file",
			declaredSize: physical?.length ?? null,
			compressedSize: null,
			executable: metadata.executable,
			encrypted: false,
			byteOffset: physical?.offset ?? null,
			declaredIntegrity: null,
			unpacked: false,
			limitations: [...limitations],
			adapterKey: `deno:${String(metadata.index)}:${metadata.role}`,
			formatMetadata: metadata
		});
		isEntryPoint = (role, sourcePath, entrypointKey) => (role === "vfs-file" || role === "remote-module" || role === "vfs-symlink") && sourcePath === entrypointKey;
		remoteUrlSuffix = (url) => {
			const identity = `${url.search}${url.hash}`;
			return identity.length === 0 ? "" : encodeURIComponent(identity);
		};
		remoteDestination = (section, module) => {
			const fallback = `deno-remote/${String(module.index)}`;
			const text = section.specifierText.get(module.specifierId) ?? null;
			if (text === null) return {
				path: fallback,
				sourcePath: null,
				limitations: ["The remote specifier is not available as a logical path; an indexed path is used."]
			};
			let candidate = text;
			try {
				const url = new URL(text);
				const suffix = remoteUrlSuffix(url);
				if (url.protocol === "file:") {
					let pathname = decodeURIComponent(url.pathname);
					if (/^\/[A-Za-z]:/u.test(pathname)) pathname = pathname.slice(1);
					candidate = `${pathname.replace(/^\/+/u, "")}${suffix}`;
				} else if (url.protocol === "http:" || url.protocol === "https:") {
					const path = url.pathname.replace(/^\/+/u, "");
					candidate = `deno-remote/${url.host}${path.length === 0 ? "" : `/${path}`}${suffix}`;
				}
			} catch {
				candidate = text.replace(/^\/+/u, "");
			}
			let parts = 1;
			for (let index = 0; index < candidate.length; index += 1) if (candidate.charCodeAt(index) === 47 && ++parts > 256) return {
				path: fallback,
				sourcePath: text,
				limitations: [DENO_PATH_PARTS_LIMITATION]
			};
			let normalized;
			try {
				normalized = normalizeArtifactPath(candidate);
			} catch (cause) {
				if (!(cause instanceof ArtifactReaderFailure) || cause.reason !== "path") throw cause;
				return {
					path: fallback,
					sourcePath: text,
					limitations: [DENO_UNSAFE_PATH_LIMITATION]
				};
			}
			const portable = normalized.replace(NON_PORTABLE_PATH_CHARACTERS, percentEscape).replace(/%[0-9a-f]{2}/giu, (escape) => escape.toUpperCase());
			if (!remoteConcretePaths(portable, module).every((path) => denoLogicalPathFits(path))) return {
				path: fallback,
				sourcePath: text,
				limitations: [DENO_PATH_LENGTH_LIMITATION]
			};
			return {
				path: portable,
				sourcePath: text,
				limitations: []
			};
		};
		SHARED_REMOTE_PATH_LIMITATION = "The remote specifier shares a logical path prefix with another embedded path; an indexed path is used and the original specifier is retained.";
		remoteConcretePaths = (path, module) => [
			path,
			...module.transpiled === null ? [] : [`${path}${DENO_CHILD_SUFFIXES.transpiled}`],
			...module.sourceMap === null ? [] : [`${path}${DENO_CHILD_SUFFIXES.sourceMap}`],
			...module.cjsExportAnalysis === null ? [] : [`${path}${DENO_CHILD_SUFFIXES.cjsExportAnalysis}`]
		];
		assignRemoteDestinations = (section, paths) => {
			const modules = section.remoteModules.modules;
			const assigned = new Map();
			let salt = 0;
			const fits = (module, path) => remoteConcretePaths(path, module).every((concrete) => !paths.conflicts(concrete));
			const take = (module, path) => {
				for (const concrete of remoteConcretePaths(path, module)) paths.reservePath(concrete);
			};
			for (const module of modules) {
				const natural = remoteDestination(section, module);
				if (fits(module, natural.path)) {
					assigned.set(module.index, natural);
					take(module, natural.path);
					continue;
				}
				const fallback = () => `${salt === 0 ? "deno-remote" : `deno-remote-${String(salt)}`}/${String(module.index)}`;
				let selected = fallback();
				while (!fits(module, selected)) {
					salt += 1;
					selected = fallback();
				}
				assigned.set(module.index, {
					path: selected,
					sourcePath: natural.sourcePath,
					limitations: natural.limitations.includes(SHARED_REMOTE_PATH_LIMITATION) ? natural.limitations : [...natural.limitations, SHARED_REMOTE_PATH_LIMITATION]
				});
				take(module, selected);
			}
			return assigned;
		};
		denoRetainedLimit = (claimed) => artifactFixedLimitFailure({
			name: "The Deno compile retained metadata allowance",
			kind: "parser",
			limit: MAX_DENO_RETAINED_BYTES,
			unit: "bytes"
		}, `The retained metadata claims ${String(claimed)} bytes, above ${String(MAX_DENO_RETAINED_BYTES)} bytes.`, "memory");
	})))();
}

//#endregion
//#region dist/artifacts/DecodedRegionArtifactReader.js
var addressText, regionFileName, DecodedRegionArtifactReader;
function init_DecodedRegionArtifactReader() {
	return (init_DecodedRegionArtifactReader = __esmMin((() => {
		init_ArtifactPreparation();
		init_resources();
		init_readFileHandleChunks();
		addressText = (address) => `0x${address.toString(16).padStart(8, "0")}`;
		regionFileName = (start, end) => `${addressText(start)}-${addressText(end)}.bin`;
		DecodedRegionArtifactReader = class {
			format;
			#scope = new ArtifactResourceScope();
			#regions = new Map();
			#streams = new Set();
			#source;
			#decoding;
			#preparation = new ArtifactPreparation();
			/** Whole-file facts only; the region map is the sole owner of region bytes. */
			#described;
			#closing = false;
			constructor(path, format, decoding, admitted) {
				this.format = format;
				this.#decoding = decoding;
				this.#source = new ArtifactFileSource(path, decoding.label, admitted);
			}
			formatMetadata() {
				const metadata = this.#described?.metadata;
				return metadata === undefined ? undefined : { ...metadata };
			}
			containerIntegrity() {
				const integrity = this.#described?.containerIntegrity;
				return integrity === undefined ? undefined : { ...integrity };
			}
			async prepareContainer(expectedSha256, signal) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#source.bindSha256(expectedSha256, signal);
				});
			}
			async *entries(signal, options) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#preparation.run(signal, () => this.#prepare(signal), () => this.#assertOpen(signal));
					await this.#source.read(signal);
				});
				this.#assertOpen(signal);
				const coverage = this.#described?.coverage;
				if (coverage !== undefined) options?.onCoverage?.({
					...coverage,
					limitations: [...coverage.limitations]
				});
				let index = 0;
				for (const { entry } of this.#regions.values()) {
					if (index % 256 === 0) await setImmediate();
					index += 1;
					this.#assertOpen(signal);
					yield copyArtifactEntry(entry);
				}
				this.#assertOpen(signal);
			}
			async open(entry, signal) {
				return this.#scope.run(async () => {
					this.#assertOpen(signal);
					const region = this.#regions.get(entry.adapterKey);
					assertProducedEntry(entry, region?.entry, `${this.#decoding.label} entry does not match its owning inventory`);
					await this.#source.read(signal);
					this.#assertOpen(signal);
					const output = Readable.from(this.#regionChunks(region.bytes, signal), { objectMode: false });
					const onAbort = () => {
						output.destroy(new ArtifactReaderFailure("cancelled", `${this.#decoding.label} region read cancelled`, { cause: signal?.reason }));
					};
					signal?.addEventListener("abort", onAbort, { once: true });
					output.once("close", () => signal?.removeEventListener("abort", onAbort));
					output.on("error", () => undefined);
					this.#streams.add(output);
					output.once("close", () => this.#streams.delete(output));
					void this.#scope.run(() => new Promise((resolve) => {
						output.once("close", () => resolve());
					})).catch((cause) => output.destroy(cause instanceof Error ? cause : new ArtifactReaderFailure("unavailable", `${this.#decoding.label} stream ownership failed`, { cause })));
					return output;
				});
			}
			async *#regionChunks(bytes, signal) {
				for (let offset = 0; offset < bytes.length; offset += 64 * 1024) {
					await setImmediate();
					this.#assertOpen(signal);
					yield Buffer.from(bytes.subarray(offset, offset + 64 * 1024));
				}
			}
			async close() {
				this.#closing = true;
				for (const stream of this.#streams) stream.destroy(new ArtifactReaderFailure("unavailable", `${this.#decoding.label} reader closed`));
				await this.#scope.close();
				await this.#source.close();
				this.#regions.clear();
			}
			provenance() {
				return [];
			}
			#assertOpen(signal) {
				assertArtifactReadActive(signal);
				if (this.#closing) throw new ArtifactReaderFailure("unavailable", `${this.#decoding.label} reader is closed`);
			}
			async #prepare(signal) {
				const described = this.#decoding.describe(await this.#decode(signal));
				const regions = new Map();
				let index = 0;
				for (const region of described.regions) {
					if (index % 256 === 0) await setImmediate();
					this.#assertOpen(signal);
					const entry = {
						path: region.path,
						kind: "file",
						declaredSize: region.bytes.length,
						compressedSize: null,
						executable: false,
						encrypted: false,
						byteOffset: region.byteOffset,
						declaredIntegrity: null,
						unpacked: false,
						limitations: [],
						adapterKey: `${this.#decoding.keyPrefix}:${String(index)}`,
						formatMetadata: region.formatMetadata
					};
					regions.set(entry.adapterKey, {
						entry,
						bytes: region.bytes
					});
					index += 1;
				}
				const { regions: _regions, ...facts } = described;
				await this.#source.read(signal);
				this.#assertOpen(signal);
				this.#regions = regions;
				this.#described = facts;
			}
			async #decode(signal) {
				const { handle, initial } = await this.#source.read(signal);
				const decoder = this.#decoding.createDecoder(initial.size);
				if (!decoder.ok) throw this.#failure(decoder.error);
				if (initial.size > 0) for await (const chunk of readFileHandleChunks(handle, {
					end: initial.size - 1,
					signal,
					cancellationFailure: (reason) => new ArtifactReaderFailure("cancelled", `${this.#decoding.label} read cancelled`, { cause: reason })
				})) {
					this.#assertOpen(signal);
					const written = decoder.value.write(chunk);
					if (!written.ok) throw this.#failure(written.error);
				}
				const image = decoder.value.finish();
				if (!image.ok) throw this.#failure(image.error);
				return image.value;
			}
			#failure(failure) {
				return failure.kind === "format" ? new ArtifactReaderFailure("format", `${this.#decoding.label} is malformed: ${failure.message}`) : new ArtifactReaderFailure("limit", `${this.#decoding.label} exceeds a fixed limit: ${failure.message}`, failure.boundary === undefined ? {} : { boundary: failure.boundary });
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/DfuSeArtifactReader.js
var crcText, dfuSeRegions, DfuSeArtifactReader;
function init_DfuSeArtifactReader() {
	return (init_DfuSeArtifactReader = __esmMin((() => {
		init_dfuse();
		init_DecodedRegionArtifactReader();
		crcText = (value) => value.toString(16).padStart(8, "0");
		dfuSeRegions = {
			label: "DfuSe",
			keyPrefix: "dfuse",
			createDecoder: createDfuSeDecoder,
			describe: (image) => ({
				metadata: image.metadata,
				regions: image.elements.map((element) => {
					const end = element.address + element.bytes.length - 1;
					return {
						path: `target-${String(element.targetIndex)}/element-${String(element.elementIndex)}-${regionFileName(element.address, end)}`,
						byteOffset: element.dataOffset,
						formatMetadata: {
							kind: "dfuse-element",
							target_index: element.targetIndex,
							alternate_setting: element.alternateSetting,
							target_name: element.targetName,
							element_index: element.elementIndex,
							start_address: element.address,
							end_address: end,
							length: element.bytes.length
						},
						bytes: element.bytes
					};
				}),
				coverage: {
					status: "complete",
					limitations: image.limitations
				},
				containerIntegrity: {
					algorithm: "dfu-crc32",
					declared_crc32: crcText(image.metadata.suffix_crc),
					observed_crc32: crcText(image.metadata.computed_crc)
				}
			})
		};
		DfuSeArtifactReader = class extends DecodedRegionArtifactReader {
			constructor(path, admitted) {
				super(path, "dfuse", dfuSeRegions, admitted);
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/DotnetBundleArtifactReader.js
var DotnetBundleArtifactReader;
function init_DotnetBundleArtifactReader() {
	return (init_DotnetBundleArtifactReader = __esmMin((() => {
		init_artifactReaderLimits();
		init_resources();
		init_DotnetBundle();
		DotnetBundleArtifactReader = class {
			limits;
			format = "dotnet-bundle";
			#source;
			#scope = new ArtifactResourceScope();
			#admission;
			#bundle;
			#closed = false;
			#entries = new Map();
			#streams = new Set();
			constructor(path, admitted, limits = DEFAULT_DOTNET_BUNDLE_READER_LIMITS) {
				this.limits = limits;
				if (admitted !== undefined && "kind" in admitted) {
					this.#admission = admitted;
					this.#source = new ArtifactFileSource(path, ".NET bundle", admitted.source);
				} else this.#source = new ArtifactFileSource(path, ".NET bundle", admitted);
			}
			/** Bind extraction to the whole host that produced its inventory snapshot. */
			async prepareContainer(expectedSha256, signal) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#source.bindSelectedPathSha256(expectedSha256, signal);
				});
			}
			async *entries(signal, options) {
				const bundle = await this.#scope.run(async () => {
					this.#assertOpen(signal);
					const source = await this.#source.readSelectedPath(signal);
					if (this.#bundle === undefined) {
						const header = this.#admission?.headerOffset ?? await findDotnetBundleHeader(source.handle, source.initial.size, signal);
						if (header === undefined) throw new ArtifactReaderFailure("format", "Selected file has no .NET bundle header");
						this.#bundle = await readDotnetBundle(source.handle, source.initial.size, header, signal, this.limits);
						this.#admission = undefined;
					}
					await this.#source.readSelectedPath(signal);
					return this.#bundle;
				});
				this.#entries.clear();
				for (const [index, file] of bundle.files.entries()) {
					this.#assertOpen(signal);
					const entry = {
						path: file.path,
						kind: "file",
						declaredSize: file.size,
						compressedSize: file.compressedSize || null,
						byteOffset: file.offset,
						byteLength: file.storedSize,
						executable: false,
						encrypted: false,
						declaredIntegrity: null,
						unpacked: false,
						adapterKey: String(index),
						formatMetadata: {
							kind: "dotnet-bundle-entry",
							major_version: bundle.majorVersion,
							minor_version: bundle.minorVersion,
							file_type: file.fileType
						},
						limitations: [".NET bundle file types are declarations, not proof of assembly validity or executable authority.", ...file.fileType > 5 ? [`Unknown .NET bundle file type ${file.fileType}; bytes are retained without interpreting the type.`] : []]
					};
					this.#entries.set(entry.adapterKey, {
						entry: copyArtifactEntry(entry),
						file
					});
					yield entry;
				}
				await this.#source.readSelectedPath(signal);
				options?.onCoverage?.({
					status: "complete",
					limitations: []
				});
			}
			async open(entry, signal) {
				return this.#scope.run(async () => {
					this.#assertOpen(signal);
					const source = await this.#source.readSelectedPath(signal);
					this.#assertOpen(signal);
					const selected = this.#entries.get(entry.adapterKey);
					assertProducedEntry(entry, selected?.entry, "Selected .NET bundle entry differs from its observed manifest");
					let inputStream;
					let decodedStream;
					let finalizing = false;
					const onFailure = (cause) => {
						stream.destroy(this.#memberFailure(selected.file, decodedStream?.errored ?? cause));
					};
					const observeSource = (input, decoded) => {
						inputStream = input;
						decodedStream = decoded;
						input.on("error", onFailure);
						if (decoded !== input) decoded.on("error", onFailure);
						signal?.removeEventListener("abort", onAbort);
						signal?.addEventListener("abort", onAbort, { once: true });
						if (signal?.aborted) onAbort();
					};
					const stream = Readable.from(this.#readMember(source, selected.file, {
						source: observeSource,
						failure: onFailure,
						finalizing: () => {
							finalizing = true;
						}
					}, signal), { objectMode: false });
					const onAbort = () => {
						if (stream.destroyed || finalizing) return;
						if (inputStream !== undefined && !inputStream.destroyed) return;
						onFailure(inputStream?.errored ?? new ArtifactReaderFailure("cancelled", ".NET bundle read cancelled", { cause: signal?.reason }));
					};
					stream.on("error", () => undefined);
					this.#streams.add(stream);
					stream.once("close", () => {
						this.#streams.delete(stream);
						signal?.removeEventListener("abort", onAbort);
						inputStream?.removeListener("error", onFailure);
						if (decodedStream !== inputStream) decodedStream?.removeListener("error", onFailure);
					});
					signal?.addEventListener("abort", onAbort, { once: true });
					if (signal?.aborted) onAbort();
					return stream;
				});
			}
			provenance() {
				return [];
			}
			async close() {
				this.#closed = true;
				for (const stream of this.#streams) stream.destroy();
				await this.#scope.close();
				await Promise.all([...this.#streams].map((stream) => finished$1(stream).catch(() => undefined)));
				await this.#source.close();
				this.#entries.clear();
				this.#admission = undefined;
				this.#bundle = undefined;
			}
			#assertOpen(signal) {
				abortIfNeeded(signal);
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", ".NET bundle reader is closed");
			}
			async *#readMember(source, file, lifecycle, signal) {
				const storedBytes = file.storedSize;
				const input = storedBytes === 0 ? Readable.from([]) : readArtifactFileChunks(source.handle, {
					start: file.offset,
					end: file.offset + storedBytes - 1,
					signal
				});
				const inflater = file.compressedSize === 0 ? undefined : createInflateRaw();
				const decoded = inflater ?? input;
				lifecycle.source(input, decoded);
				const pumping = inflater === undefined ? undefined : pipeline$1(input, inflater);
				void pumping?.catch(() => undefined);
				let bytes = 0;
				try {
					for await (const raw of decoded) {
						try {
							abortIfNeeded(signal);
							const chunk = raw;
							bytes += chunk.length;
							if (bytes > file.size) throw new ArtifactReaderFailure("limit", `.NET bundle entry expands beyond its declared size: ${file.path}`);
							yield chunk;
						} catch (cause) {
							lifecycle.failure(cause);
							throw cause;
						}
					}
					lifecycle.finalizing();
					await pumping;
					if (bytes !== file.size || inflater !== undefined && inflater.bytesWritten !== storedBytes) throw new ArtifactReaderFailure("format", `.NET bundle member length or compressed extent does not match its declaration: ${file.path}`);
					await this.#source.readSelectedPath(signal);
					abortIfNeeded(signal);
				} catch (cause) {
					const failure = this.#memberFailure(file, cause);
					lifecycle.failure(failure);
					throw failure;
				} finally {
					input.destroy();
					decoded.destroy();
					await pumping?.catch(() => undefined);
				}
			}
			#memberFailure(file, cause) {
				if (cause instanceof ArtifactReaderFailure) return cause;
				const malformedCompression = file.compressedSize !== 0 && cause instanceof Error && "code" in cause && ["Z_DATA_ERROR", "Z_BUF_ERROR"].includes(String(cause.code));
				return new ArtifactReaderFailure(malformedCompression ? "format" : "io", `Could not read .NET bundle member: ${file.path}`, { cause });
			}
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/espOtaData.js
var ESP_OTA_DATA_SECTOR_BYTES, ESP_OTA_DATA_MIN_BYTES, ESP_OTA_SELECT_ENTRY_BYTES, UNSET, STATE_NAMES, decodeEspOtaRecord, RECORDS_ASSUMPTION, BOOT_ASSUMPTIONS, unusable, selectEspBootPartition;
function init_espOtaData() {
	return (init_espOtaData = __esmMin((() => {
		init_espImageStructures();
		ESP_OTA_DATA_SECTOR_BYTES = 4096;
		ESP_OTA_DATA_MIN_BYTES = 2 * ESP_OTA_DATA_SECTOR_BYTES;
		ESP_OTA_SELECT_ENTRY_BYTES = 32;
		UNSET = 4294967295;
		STATE_NAMES = {
			0: "new",
			1: "pending-verify",
			2: "valid",
			3: "invalid",
			4: "aborted",
			[UNSET]: "undefined"
		};
		decodeEspOtaRecord = (bytes, index) => {
			const sequence = bytes.subarray(0, 4);
			const otaSeq = u32$1(bytes, 0);
			const state = u32$1(bytes, 24);
			const crc = u32$1(bytes, 28);
			const crcMatches = crc32(sequence, UNSET) >>> 0 === crc;
			return {
				index,
				ota_seq: otaSeq,
				seq_label: hex$1(bytes.subarray(4, 24)),
				ota_state: state,
				state_name: STATE_NAMES[state] ?? null,
				crc,
				crc_matches: crcMatches,
				valid: otaSeq !== UNSET && state !== 3 && state !== 4 && crcMatches
			};
		};
		RECORDS_ASSUMPTION = "Records are used as written: the bootloader may first mark a pending-verify record aborted when app rollback is enabled.";
		BOOT_ASSUMPTIONS = [
			"Anti-rollback, which compares the app's secure_version with eFuse, is not applied.",
			"The selected app is not checked for a loadable image; the bootloader falls back to other partitions when it fails to load or is not declared.",
			"Factory-reset and test-app GPIO holds and a wake from deep sleep, which can override the selection, are not applied."
		];
		unusable = ({ ota_seq, ota_state }) => ota_seq === UNSET || ota_state === 3 || ota_state === 4;
		selectEspBootPartition = (boot, otadata, tableRejected = false) => {
			const selection = (basis, fields = {}) => ({
				basis,
				active_record: null,
				slot: null,
				partition_index: null,
				...fields,
				assumptions: basis === "none" || basis === "unknown" ? [] : basis === "no-otadata" ? [...BOOT_ASSUMPTIONS] : [RECORDS_ASSUMPTION, ...BOOT_ASSUMPTIONS],
				running_partition: "unknown"
			});
			const factoryIndex = { partition_index: boot.factory?.index ?? null };
			if (tableRejected) return selection("none");
			if (otadata === undefined || otadata.offset === 0) return selection("no-otadata", factoryIndex);
			const { records, size } = otadata;
			if (size < 8192) return selection("none");
			const factory = selection("factory-fallback", factoryIndex);
			const fallback = boot.factory !== undefined ? factory : selection("ota_0-fallback", {
				slot: 0,
				partition_index: boot.otaSlots.get(0)?.index ?? null
			});
			if (boot.otaAppCount === 0) return fallback;
			if (records.length < 2) return selection("unknown");
			if (records.every(unusable)) return fallback;
			const valid = records.filter(({ valid }) => valid);
			const [first, second] = valid;
			const active = first !== undefined && second !== undefined && second.ota_seq > first.ota_seq ? second : first;
			if (active === undefined) return factory;
			const slot = (active.ota_seq - 1 >>> 0) % boot.otaAppCount;
			return selection("otadata", {
				active_record: active.index,
				slot,
				partition_index: boot.otaSlots.get(slot)?.index ?? null
			});
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/espFlashLayout.js
var SAFE_LABEL, WINDOWS_DEVICE_NAME, partitionPaths, region, rangeText, partitionName, otadataPlan, planEspFlashLayout, regionEnd, declaresRegion, overlaps, gapsBetween, finishEspFlashLayout, otaFacts, espFlashPartitionFacts, espErasedSlotLimitation;
function init_espFlashLayout() {
	return (init_espFlashLayout = __esmMin((() => {
		init_espImageStructures();
		init_espPartitionTable();
		init_espOtaData();
		SAFE_LABEL = /^(?=.*[A-Za-z_])[A-Za-z0-9_][A-Za-z0-9._-]{0,15}$/u;
		WINDOWS_DEVICE_NAME = /^(?:con|prn|aux|nul|com[0-9¹²³]|lpt[0-9¹²³])(?:\.|$)/iu;
		partitionPaths = (partitions) => {
			const counts = new Map();
			for (const { label } of partitions) if (label !== null) {
				const folded = label.toLowerCase();
				counts.set(folded, (counts.get(folded) ?? 0) + 1);
			}
			return new Map(partitions.map((part) => {
				const label = part.label;
				const named = label !== null && SAFE_LABEL.test(label) && !WINDOWS_DEVICE_NAME.test(label) && counts.get(label.toLowerCase()) === 1;
				return [part.index, `partitions/${named ? label : String(part.index)}.bin`];
			}));
		};
		region = (input, fields) => {
			const fileOffset = fields.flashAddress - input.origin.value;
			const start = Math.max(0, fileOffset);
			const end = Math.min(input.fileSize, fileOffset + fields.length);
			const available = Math.max(0, end - start);
			const availability = fields.length === 0 ? "empty" : available === 0 ? "missing" : available < fields.length ? "truncated" : "complete";
			return {
				...fields,
				fileOffset,
				available,
				availability
			};
		};
		rangeText = (address, length) => `${offsetText(address)}-${offsetText(address + length)}`;
		partitionName = (part) => part.label ?? `#${String(part.index)}`;
		otadataPlan = (input, partition, limitations) => {
			const name = partitionName(partition);
			const small = partition.size < ESP_OTA_DATA_MIN_BYTES;
			if (small) limitations.push(`The otadata partition ${name} is ${offsetText(partition.size)} bytes, smaller than the two 4 KiB sectors ESP-IDF's bootloader reads; the bootloader resets without selecting an app.`);
			const records = [];
			for (const index of [0, 1]) {
				const within = index * ESP_OTA_DATA_SECTOR_BYTES;
				if (within + 32 > partition.size) continue;
				const fileOffset = partition.offset + within - input.origin.value;
				const available = fileOffset >= 0 && fileOffset + 32 <= input.fileSize;
				if (!available) limitations.push(`otadata record ${String(index)} of partition ${name} at flash ${offsetText(partition.offset + within)} is outside the dump${small ? "." : "; the OTA selection is unknown."}`);
				records.push({
					index,
					fileOffset,
					available
				});
			}
			return {
				partition,
				records
			};
		};
		planEspFlashLayout = (input) => {
			const limitations = [...input.table.limitations];
			const regions = [];
			const tableEnd = input.tableAddress + ESP_PARTITION_TABLE_SECTOR_BYTES;
			const { bootloader } = input;
			if (bootloader !== undefined) {
				if (bootloader.flashAddress < input.tableAddress) regions.push(region(input, {
					path: "bootloader.bin",
					role: "bootloader",
					flashAddress: bootloader.flashAddress,
					length: input.tableAddress - bootloader.flashAddress,
					partition: undefined
				}));
				else limitations.push(`The partition table at ${offsetText(input.tableAddress)} does not follow the bootloader at ${offsetText(bootloader.flashAddress)}; the bootloader region is not described.`);
			}
			regions.push(region(input, {
				path: "partition-table.bin",
				role: "partition-table",
				flashAddress: input.tableAddress,
				length: ESP_PARTITION_TABLE_SECTOR_BYTES,
				partition: undefined
			}));
			const paths = partitionPaths(input.table.partitions);
			for (const part of input.table.partitions) {
				const placed = region(input, {
					path: paths.get(part.index) ?? `partitions/${String(part.index)}.bin`,
					role: "partition",
					flashAddress: part.offset,
					length: part.size,
					partition: part
				});
				const name = partitionName(part);
				if (part.offset < tableEnd && espPrimaryLayoutRole(part) === undefined) limitations.push(`Partition ${name} at ${offsetText(part.offset)} starts before the end of the partition table at ${offsetText(tableEnd)}; gen_esp32part.py rejects such a table.`);
				if (placed.availability === "empty") limitations.push(`Partition ${name} at ${offsetText(part.offset)} declares zero bytes.`);
				else if (placed.fileOffset < 0) limitations.push(`Partition ${name} at ${offsetText(part.offset)} begins before the dump's first byte at flash ${offsetText(input.origin.value)}; it is not read.`);
				else if (placed.availability === "missing") limitations.push(`Partition ${name} at ${rangeText(part.offset, part.size)} lies outside the dump, which ends at flash ${offsetText(input.origin.value + input.fileSize)}.`);
				else if (placed.availability === "truncated") limitations.push(`Partition ${name} at ${rangeText(part.offset, part.size)} is truncated: the dump holds ${String(placed.available)} of its ${String(part.size)} bytes.`);
				if (placed.availability === "empty" || placed.fileOffset >= 0) regions.push(placed);
			}
			limitations.push(...overlaps(regions));
			const boot = espBootPartitions(input.table.partitions);
			limitations.push(...boot.limitations);
			return {
				input,
				regions,
				gaps: gapsBetween(regions, input.fileSize),
				boot,
				otadata: boot.otadata === undefined ? undefined : otadataPlan(input, boot.otadata, limitations),
				limitations
			};
		};
		regionEnd = ({ flashAddress, length }) => flashAddress + length;
		declaresRegion = (first, second) => {
			const [region, entry] = first.partition === undefined ? [first, second] : [second, first];
			return region.partition === undefined && entry.partition !== undefined && espPrimaryLayoutRole(entry.partition) === region.role && region.flashAddress === entry.flashAddress && region.length === entry.length;
		};
		overlaps = (regions) => {
			const ordered = [...regions].sort((left, right) => left.flashAddress - right.flashAddress);
			const found = [];
			let furthest;
			for (const current of ordered) {
				if (current.availability === "empty") continue;
				if (furthest !== undefined && current.flashAddress < regionEnd(furthest) && !declaresRegion(furthest, current)) found.push(`${current.path} at ${offsetText(current.flashAddress)} overlaps ${furthest.path}, which ends at ${offsetText(regionEnd(furthest))}.`);
				if (furthest === undefined || regionEnd(current) > regionEnd(furthest)) furthest = current;
			}
			return found;
		};
		gapsBetween = (regions, fileSize) => {
			const covered = regions.map(({ fileOffset, available }) => ({
				start: Math.max(0, fileOffset),
				end: Math.max(0, fileOffset) + available
			})).filter(({ end, start }) => end > start).sort((left, right) => left.start - right.start);
			const gaps = [];
			let cursor = 0;
			for (const { start, end } of covered) {
				if (start > cursor) gaps.push({
					offset: cursor,
					length: start - cursor
				});
				cursor = Math.max(cursor, end);
			}
			if (fileSize > cursor) gaps.push({
				offset: cursor,
				length: fileSize - cursor
			});
			return gaps;
		};
		finishEspFlashLayout = (plan, reads) => {
			const limitations = [...plan.limitations];
			const undescribed = [];
			plan.gaps.forEach((gap, index) => {
				const first = reads.gapFirstUnerased[index];
				if (first !== undefined) undescribed.push({
					offset: first,
					length: gap.offset + gap.length - first
				});
			});
			const total = undescribed.reduce((sum, { length }) => sum + length, 0);
			if (undescribed.length > 0) limitations.push(`${String(undescribed.length)} range(s) of the dump, ${String(total)} bytes in all, lie outside the bootloader region, the partition table and every partition and are not described; each runs from a byte that is not erased flash to the end of its gap.`);
			const otadata = plan.otadata === undefined ? null : otaFacts(plan.otadata, reads.otadataRecords);
			const unplaced = plan.input.table.partitions.some((part) => !plan.regions.some(({ partition }) => partition === part));
			return {
				otadata,
				boot_selection: selectEspBootPartition(plan.boot, plan.otadata === undefined || otadata === null ? undefined : {
					offset: plan.otadata.partition.offset,
					size: plan.otadata.partition.size,
					records: otadata.records
				}, plan.input.table.md5.status === "invalid"),
				undescribed,
				coverage: undescribed.length > 0 || plan.input.bootloader === undefined || unplaced ? "unknown" : "complete",
				limitations
			};
		};
		otaFacts = (otadata, bytes) => ({
			partition_index: otadata.partition.index,
			records: otadata.records.flatMap(({ index, available }, position) => {
				const read = bytes[position];
				return available && read !== undefined && read.length >= 32 ? [decodeEspOtaRecord(read, index)] : [];
			})
		});
		espFlashPartitionFacts = (part, written) => ({
			kind: "esp-flash-partition",
			index: part.index,
			label: part.label,
			label_hex: part.labelHex,
			type: part.type,
			subtype: part.subtype,
			type_name: espPartitionTypeName(part.type),
			subtype_name: espPartitionSubtypeName(part.type, part.subtype),
			flash_address: part.offset,
			size: part.size,
			encrypted: part.encrypted,
			readonly: part.readonly,
			unknown_flags: part.unknownFlags,
			written_offset: written?.offset ?? null,
			written_end: written?.end ?? null,
			written_bytes: written?.bytes ?? null
		});
		espErasedSlotLimitation = (path, written) => written.offset === null || written.end === null ? undefined : `${path} begins with erased flash, so ESP-IDF's bootloader finds no app in it, but ${String(written.bytes)} of its bytes from offset ${offsetText(written.offset)} to ${offsetText(written.end)} are not erased flash; they are not read as an image.`;
	})))();
}

//#endregion
//#region dist/artifacts/EspFlashRegionReads.js
var LABEL$3, HEADER_BYTES, PROBE_BYTES, chunks, readEspFlashRange, firstUnerasedInRange, coveredSegments, tally, readSegments, regionExtent, writtenExtents, noImage, decodeEspFlashImage;
function init_EspFlashRegionReads() {
	return (init_EspFlashRegionReads = __esmMin((() => {
		init_espImage();
		init_espImageStructures();
		init_readFileHandleChunks();
		init_resources();
		LABEL$3 = "ESP flash image";
		HEADER_BYTES = 24;
		PROBE_BYTES = 32;
		chunks = ({ handle, signal }, start, length) => readFileHandleChunks(handle, {
			start,
			end: start + length - 1,
			signal,
			cancellationFailure: (reason) => new ArtifactReaderFailure("cancelled", `${LABEL$3} read cancelled`, { cause: reason })
		});
		readEspFlashRange = async (context, position, length) => {
			const available = Math.min(length, context.fileSize - position);
			if (position < 0 || available <= 0) return Buffer.alloc(0);
			const parts = [];
			for await (const chunk of chunks(context, position, available)) parts.push(chunk);
			return Buffer.concat(parts);
		};
		firstUnerasedInRange = async (context, range, assertOpen) => {
			if (range.length <= 0) return undefined;
			let position = range.start;
			for await (const chunk of chunks(context, range.start, range.length)) {
				assertOpen();
				const found = firstUnerased(chunk, position);
				if (found !== undefined) return found;
				position += chunk.length;
			}
			return undefined;
		};
		coveredSegments = (ranges) => {
			const cuts = [...new Set(ranges.flatMap(({ start, length }) => [start, start + length]))].sort((left, right) => left - right);
			return cuts.slice(1).flatMap((end, index) => {
				const start = cuts[index];
				const covered = ranges.some((range) => range.start <= start && end <= range.start + range.length);
				return covered ? [{
					start,
					end,
					first: -1,
					last: -1,
					bytes: 0
				}] : [];
			});
		};
		tally = (segment, bytes, position) => {
			for (let index = 0; index < bytes.length; index += 1) if (bytes[index] !== 255) {
				segment.bytes += 1;
				segment.last = position + index;
				if (segment.first < 0) segment.first = segment.last;
			}
		};
		readSegments = async (context, segments, assertOpen) => {
			const start = segments[0].start;
			let position = start;
			let current = 0;
			for await (const chunk of chunks(context, start, segments.at(-1).end - start)) {
				assertOpen();
				let offset = 0;
				while (offset < chunk.length) {
					const segment = segments[current];
					const taken = Math.min(chunk.length - offset, segment.end - position);
					tally(segment, chunk.subarray(offset, offset + taken), position);
					offset += taken;
					position += taken;
					if (position === segment.end) current += 1;
				}
			}
		};
		regionExtent = ({ start, length }, segments) => {
			let first = -1;
			let last = -1;
			let bytes = 0;
			for (const segment of segments) {
				if (segment.start < start || segment.end > start + length) continue;
				bytes += segment.bytes;
				if (first < 0) first = segment.first;
				last = Math.max(last, segment.last);
			}
			return first < 0 ? {
				offset: null,
				end: null,
				bytes: 0
			} : {
				offset: first - start,
				end: last + 1 - start,
				bytes
			};
		};
		writtenExtents = async (context, regions, assertOpen) => {
			const segments = coveredSegments(regions.filter(({ length }) => length > 0));
			let run = 0;
			for (let index = 1; index <= segments.length; index += 1) if (index === segments.length || segments[index].start !== segments[index - 1].end) {
				await readSegments(context, segments.slice(run, index), assertOpen);
				run = index;
			}
			return regions.map((region) => regionExtent(region, segments));
		};
		noImage = (status, limitations) => ({
			status,
			image: null,
			segments: [],
			signature_blocks: [],
			coverage: null,
			limitations: [...limitations]
		});
		decodeEspFlashImage = async (context, region, assertOpen) => {
			const prefix = await readEspFlashRange({
				...context,
				fileSize: region.start + region.length
			}, region.start, PROBE_BYTES);
			if (prefix.length > 0 && prefix.subarray(0, HEADER_BYTES).every((byte) => byte === 255)) return noImage("erased", []);
			const recognized = recognizeEspImage(prefix, region.length);
			if (recognized === "esp8266") return noImage("unrecognized", [ESP8266_REFUSAL]);
			if (recognized !== "esp-image") return noImage("unrecognized", ["The region does not begin with a recognized ESP image header; it may be encrypted or hold other data."]);
			const decoder = createEspImageDecoder(region.length);
			for await (const chunk of chunks(context, region.start, region.length)) {
				assertOpen();
				decoder.write(chunk);
				if (decoder.satisfied) break;
			}
			const image = decoder.finish();
			if (!image.ok) return noImage("unrecognized", [image.error.message]);
			return {
				status: "esp-image",
				image: image.value.metadata,
				segments: image.value.segments.map(({ metadata }) => ({ ...metadata })),
				signature_blocks: image.value.signatureBlocks.map(({ metadata }) => ({ ...metadata })),
				coverage: image.value.coverage,
				limitations: [...image.value.limitations]
			};
		};
	})))();
}

//#endregion
//#region dist/artifacts/EspFlashImageArtifactReader.js
var LABEL$2, EspFlashImageArtifactReader, erasedSlotLimitations, regionEntry, layoutMetadata;
function init_EspFlashImageArtifactReader() {
	return (init_EspFlashImageArtifactReader = __esmMin((() => {
		init_espChips();
		init_espFlashLayout();
		init_espFlashLocation();
		init_espImageStructures();
		init_espOtaData();
		init_espPartitionTable();
		init_resources();
		init_EspFlashRegionReads();
		init_PositionalArtifactReader();
		LABEL$2 = "ESP flash image";
		EspFlashImageArtifactReader = class extends PositionalArtifactReader {
			format = "esp-flash-image";
			#located;
			#selection;
			#metadata;
			constructor(path, admitted, selection = {}) {
				const admission = admitted !== undefined && "kind" in admitted ? admitted : undefined;
				super(path, LABEL$2, admission?.source ?? admitted);
				this.#located = admission?.location;
				this.#selection = selection;
			}
			formatMetadata() {
				return this.#metadata === undefined ? undefined : structuredClone(this.#metadata);
			}
			async prepareEntries(signal) {
				const { handle, initial } = await this.verifyCarrier(signal);
				const fileSize = initial.size;
				const location = this.#located ?? await this.#locate(handle, fileSize, signal);
				const plan = planEspFlashLayout({
					fileSize,
					origin: location.origin,
					bootloader: location.bootloader,
					tableAddress: location.tableAddress,
					tableMethod: location.tableMethod,
					table: location.table
				});
				const context = {
					handle,
					fileSize,
					signal
				};
				const facts = await this.#readFacts(context, plan);
				const images = await this.#decodeImages(context, plan);
				const written = await this.#readWritten(context, plan);
				await this.verifyCarrier(signal);
				this.#metadata = layoutMetadata(location, plan, facts, images);
				const limitations = [
					...location.limitations,
					...location.tableMethod === "scan" ? [`The partition table at ${offsetText(location.tableAddress)} was found by scanning 0x1000-aligned flash sectors for a table whose MD5 verifies; the dump does not record the bootloader's configured table offset.`] : [],
					...facts.limitations,
					...erasedSlotLimitations(images, written)
				];
				return {
					entries: plan.regions.map((region) => regionEntry(region, written.get(region), fileSize)),
					coverage: {
						status: facts.coverage,
						limitations
					}
				};
			}
			async #locate(handle, fileSize, signal) {
				const located = await locateEspFlashLayout(fileSize, (position, length) => readEspFlashRange({
					handle,
					fileSize,
					signal
				}, position, length), this.#selection, {
					explicit: true,
					...signal === undefined ? {} : { signal }
				});
				if (!located.ok) throw new ArtifactReaderFailure("unavailable", `${LABEL$2} layout is not recognized: ${located.error}`);
				return located.value;
			}
			async #readFacts(context, plan) {
				const otadataRecords = [];
				for (const { fileOffset, available } of plan.otadata?.records ?? []) otadataRecords.push(available ? await readEspFlashRange(context, fileOffset, 32) : undefined);
				const gapFirstUnerased = [];
				for (const gap of plan.gaps) {
					this.assertOpen(context.signal);
					gapFirstUnerased.push(await firstUnerasedInRange(context, {
						start: gap.offset,
						length: gap.length
					}, () => this.assertOpen(context.signal)));
				}
				return finishEspFlashLayout(plan, {
					otadataRecords,
					gapFirstUnerased
				});
			}
			/**
			* Where each partition the dump holds is not erased flash, from one read
			* of the bytes the partitions cover, however many overlap.
			*/
			async #readWritten(context, plan) {
				const held = plan.regions.filter(({ partition, available }) => partition !== undefined && available > 0);
				this.assertOpen(context.signal);
				const extents = await writtenExtents(context, held.map(({ fileOffset, available }) => ({
					start: fileOffset,
					length: available
				})), () => this.assertOpen(context.signal));
				return new Map(held.map((region, index) => [region, extents[index]]));
			}
			/**
			* ESP image facts for the bootloader region and each app partition.
			* Regions over the same bytes share one decode, however many the table
			* declares.
			*/
			async #decodeImages(context, plan) {
				const images = new Map();
				const decoded = new Map();
				for (const region of plan.regions) {
					const image = region.role === "bootloader" || region.partition !== undefined && isEspAppPartition(region.partition);
					if (!image || region.available === 0) continue;
					this.assertOpen(context.signal);
					const range = `${String(region.fileOffset)}+${String(region.available)}`;
					let facts = decoded.get(range);
					if (facts === undefined) {
						facts = await decodeEspFlashImage(context, {
							start: region.fileOffset,
							length: region.available
						}, () => this.assertOpen(context.signal));
						decoded.set(range, facts);
					}
					images.set(region, structuredClone(facts));
				}
				return images;
			}
		};
		erasedSlotLimitations = (images, written) => [...images].flatMap(([region, image]) => {
			const extent = written.get(region);
			const limitation = region.partition === undefined || image.status !== "erased" || extent === undefined ? undefined : espErasedSlotLimitation(region.path, extent);
			return limitation === undefined ? [] : [limitation];
		});
		regionEntry = (region, written, fileSize) => ({
			path: region.path,
			...region.partition?.label === null || region.partition === undefined ? {} : { sourcePath: region.partition.label },
			kind: "file",
			declaredSize: region.available,
			compressedSize: null,
			executable: false,
			encrypted: false,
			byteOffset: Math.min(Math.max(region.fileOffset, 0), fileSize),
			declaredIntegrity: null,
			unpacked: false,
			limitations: region.availability === "empty" ? [`${region.path} declares zero bytes.`] : region.availability === "missing" ? [`${region.path} lies outside the dump: the file holds none of its ${String(region.length)} bytes.`] : region.availability === "truncated" ? [`${region.path} is truncated: the dump holds ${String(region.available)} of its ${String(region.length)} bytes.`] : [],
			adapterKey: `esp-flash-image:${region.path}`,
			...region.partition === undefined ? {} : { formatMetadata: espFlashPartitionFacts(region.partition, written) }
		});
		layoutMetadata = (location, plan, facts, images) => {
			const bootloaderRegion = plan.regions.find(({ role }) => role === "bootloader");
			const bootloaderFacts = bootloaderRegion === undefined ? undefined : images.get(bootloaderRegion);
			const placed = new Set(plan.regions.flatMap(({ partition }) => partition === undefined ? [] : [partition.index]));
			const { bootloader, table } = location;
			return {
				kind: "esp-flash-image",
				flash_offset: location.origin,
				chip: bootloader === undefined ? null : {
					target: bootloader.chip.target,
					isa: bootloader.chip.isa,
					source: ESP_CHIP_TABLE_SOURCE
				},
				bootloader: bootloaderRegion === undefined || bootloaderFacts === undefined ? null : {
					path: bootloaderRegion.path,
					flash_address: bootloaderRegion.flashAddress,
					region_size: bootloaderRegion.length,
					facts: bootloaderFacts
				},
				partition_table: {
					flash_address: location.tableAddress,
					method: location.tableMethod,
					partition_count: table.partitions.length,
					md5: {
						status: table.md5.status,
						stored: table.md5.stored,
						computed: table.md5.computed,
						entries_after_checksum: table.md5.entriesAfterChecksum
					}
				},
				partitions_outside_dump: table.partitions.filter(({ index }) => !placed.has(index)).map((part) => espFlashPartitionFacts(part)),
				apps: [...images].flatMap(([region, image]) => region.partition === undefined ? [] : [{
					path: region.path,
					partition_index: region.partition.index,
					facts: image
				}]),
				otadata: facts.otadata === null ? null : {
					partition_index: facts.otadata.partition_index,
					records: facts.otadata.records.map((record) => ({ ...record }))
				},
				boot_selection: {
					...facts.boot_selection,
					assumptions: [...facts.boot_selection.assumptions]
				},
				undescribed: [...facts.undescribed]
			};
		};
	})))();
}

//#endregion
//#region dist/artifacts/EspImageArtifactReader.js
var LABEL$1, EspImageArtifactReader, flashDumpLimitation, decodeFailure;
function init_EspImageArtifactReader() {
	return (init_EspImageArtifactReader = __esmMin((() => {
		init_espChips();
		init_espFlashLocation();
		init_espImage();
		init_espImageFacts();
		init_espImageStructures();
		init_resources();
		init_EspFlashRegionReads();
		init_PositionalArtifactReader();
		init_readFileHandleChunks();
		LABEL$1 = "ESP image";
		EspImageArtifactReader = class extends PositionalArtifactReader {
			format = "esp-image";
			#metadata;
			constructor(path, admitted) {
				super(path, LABEL$1, admitted);
			}
			formatMetadata() {
				return this.#metadata === undefined ? undefined : structuredClone(this.#metadata);
			}
			async prepareEntries(signal) {
				const image = await this.#decode(signal);
				const entries = [];
				for (const segment of image.segments) {
					const { index, data_len } = segment.metadata;
					const entry = {
						path: `segment-${String(index).padStart(2, "0")}.bin`,
						kind: "file",
						declaredSize: segment.availableLength,
						compressedSize: null,
						executable: false,
						encrypted: false,
						byteOffset: segment.dataOffset,
						declaredIntegrity: null,
						unpacked: false,
						limitations: segment.availableLength < data_len ? [ESP_IMAGE_LIMITATIONS.segmentEntryTruncated(index, data_len, segment.availableLength)] : [],
						adapterKey: `esp-image:segment:${String(index)}`,
						formatMetadata: { ...segment.metadata }
					};
					entries.push(entry);
				}
				for (const block of image.signatureBlocks) {
					const entry = {
						path: `signature-block-${String(block.metadata.index)}.bin`,
						kind: "file",
						declaredSize: ESP_SIGNATURE_BLOCK_BYTES,
						compressedSize: null,
						executable: false,
						encrypted: false,
						byteOffset: block.offset,
						declaredIntegrity: null,
						unpacked: false,
						limitations: [],
						adapterKey: `esp-image:signature-block:${String(block.metadata.index)}`,
						formatMetadata: { ...block.metadata }
					};
					entries.push(entry);
				}
				const dump = await this.#flashDump(image, signal);
				this.#metadata = {
					...image.metadata,
					flash_dump: dump === undefined ? null : {
						flash_offset: dump.flashOffset,
						table_file_offset: dump.tableFileOffset
					}
				};
				const limitations = [...image.limitations, ...dump === undefined ? [] : [flashDumpLimitation(image, dump)]];
				return {
					entries,
					coverage: {
						status: image.coverage,
						limitations
					}
				};
			}
			/**
			* Whether this image is the bootloader at the start of a flash dump read
			* from a later flash address. An app carries `esp_app_desc_t` and is not.
			*/
			async #flashDump(image, signal) {
				const chip = espChipForId(image.metadata.header.chip_id);
				if (chip === undefined || chip.romBootloaderOffset === 0 || image.metadata.descriptor?.kind === "app") return undefined;
				this.assertOpen(signal);
				const { handle, initial } = await this.verifyCarrier(signal);
				const context = {
					handle,
					fileSize: initial.size,
					signal
				};
				return espFlashDumpOrigin((position, length) => readEspFlashRange(context, position, length), initial.size, {
					chip,
					fileOffset: 0,
					end: image.metadata.image_end ?? initial.size
				});
			}
			/** Stream the carrier once, stopping when later bytes cannot matter. */
			async #decode(signal) {
				const { handle, initial } = await this.verifyCarrier(signal);
				const decoder = createEspImageDecoder(initial.size);
				if (initial.size > 0) for await (const chunk of readFileHandleChunks(handle, {
					end: initial.size - 1,
					signal,
					cancellationFailure: (reason) => new ArtifactReaderFailure("cancelled", `${LABEL$1} read cancelled`, { cause: reason })
				})) {
					this.assertOpen(signal);
					decoder.write(chunk);
					if (decoder.satisfied) break;
				}
				await this.verifyCarrier(signal);
				const image = decoder.finish();
				if (!image.ok) throw decodeFailure(image.error);
				return image.value;
			}
		};
		flashDumpLimitation = (image, dump) => `This file looks like a flash dump read from flash ${offsetText(dump.flashOffset)}, not one ESP image: its ${image.metadata.chip?.target ?? "ESP"} image at file offset 0 is where the ROM loads the bootloader from ${offsetText(dump.flashOffset)}, and a partition table sits at file offset ${offsetText(dump.tableFileOffset)}, which is flash 0x8000 from that origin. Reopen it with format esp-flash-image and flash_offset ${offsetText(dump.flashOffset)}.`;
		decodeFailure = (failure) => failure.kind === "unsupported" ? new ArtifactReaderFailure("unavailable", failure.message) : new ArtifactReaderFailure("format", `${LABEL$1} is malformed: ${failure.message}`);
	})))();
}

//#endregion
//#region dist/artifacts/fit/FitStructure.js
var FIT_MAX_IMAGES, FIT_MAX_HASH_NODES_PER_IMAGE, FIT_MAX_CONFIGURATIONS, FIT_MAX_CONFIGURATION_REFERENCES, DIGEST_BYTES, DATA_SOURCES, CONFIGURATION_REFERENCES, align4, formatFailure$4, capacityFailure, nodeName, propertiesByNode, keyedProperties, propertyOf, valueOf, utf8, nulCount, nulStrings, createFitDigest, fitString, fitStrings, fitU32, fitAddress, strictCell, imageRange, imageHashes, signatureAlgorithms, imageDeclaration, assertImageDataLinks, assertDisjoint, fitConfiguration, fitConfigurations, parseFit, readFitStructure;
function init_FitStructure() {
	return (init_FitStructure = __esmMin((() => {
		init_keyedCollection();
		init_artifactExpansionBudget();
		init_devicetree();
		init_devicetreeParser();
		init_binaryContainer();
		init_parseFailureAnalysisError();
		init_resources();
		init_strictUtf8();
		FIT_MAX_IMAGES = 1024;
		FIT_MAX_HASH_NODES_PER_IMAGE = 8;
		FIT_MAX_CONFIGURATIONS = 1024;
		FIT_MAX_CONFIGURATION_REFERENCES = 16384;
		DIGEST_BYTES = new Map([
			["crc32", 4],
			["md5", 16],
			["sha1", 20],
			["sha256", 32],
			["sha384", 48],
			["sha512", 64]
		]);
		DATA_SOURCES = [
			"data",
			"data-offset",
			"data-position"
		];
		CONFIGURATION_REFERENCES = [
			"kernel",
			"firmware",
			"fdt",
			"ramdisk",
			"loadables"
		];
		align4 = (value) => Math.ceil(value / 4) * 4;
		formatFailure$4 = (detail) => new ArtifactReaderFailure("format", `FIT is malformed: ${detail}`);
		capacityFailure = (message) => new ArtifactReaderFailure("limit", message, { boundary: "capacity" });
		nodeName = (node) => node.path.slice(node.path.lastIndexOf("/") + 1);
		propertiesByNode = new WeakMap();
		keyedProperties = (node) => {
			let keyed = propertiesByNode.get(node);
			if (keyed === undefined) {
				keyed = keyedBy(node.properties, (candidate) => candidate.name);
				propertiesByNode.set(node, keyed);
			}
			return keyed;
		};
		propertyOf = (node, name) => {
			const property = uniqueKeyed(keyedProperties(node), name);
			if (!property.ok) throw formatFailure$4(`${node.path} declares property ${name} more than once`);
			return property.value;
		};
		valueOf = (fdt, property) => fdt.subarray(property.offset, property.offset + property.bytes);
		utf8 = strictUtf8Decoder("preserve");
		nulCount = (raw) => {
			let count = 0;
			for (const byte of raw) if (byte === 0) count += 1;
			return count;
		};
		nulStrings = (fdt, property, maxStrings = 1) => {
			if (property === undefined) return undefined;
			const raw = valueOf(fdt, property);
			if (raw.at(-1) !== 0 || nulCount(raw) > maxStrings) return undefined;
			try {
				return utf8.decode(raw.subarray(0, -1)).split("\0");
			} catch {
				return undefined;
			}
		};
		createFitDigest = (algo) => {
			if (!DIGEST_BYTES.has(algo)) return undefined;
			if (algo !== "crc32") {
				const hash = createHash(algo);
				return {
					update: (chunk) => {
						hash.update(chunk);
					},
					digest: () => hash.digest()
				};
			}
			let value = 0;
			return {
				update: (chunk) => {
					value = crc32(chunk, value);
				},
				digest: () => Buffer.from(value.toString(16).padStart(8, "0"), "hex")
			};
		};
		fitString = (facts, node, name) => {
			const property = propertyOf(node, name);
			if (property === undefined) return null;
			const strings = nulStrings(facts.fdt, property);
			if (strings?.length === 1) return strings[0] ?? null;
			facts.limitations.push(`${node.path}: ${name} is not a NUL-terminated UTF-8 string`);
			return null;
		};
		fitStrings = (facts, node, name) => {
			const property = propertyOf(node, name);
			if (property === undefined) return [];
			const strings = nulStrings(facts.fdt, property, FIT_MAX_CONFIGURATION_REFERENCES);
			if (strings !== undefined) return strings;
			facts.limitations.push(`${node.path}: ${name} is not a NUL-terminated UTF-8 string list`);
			return [];
		};
		fitU32 = (facts, node, name) => {
			const property = propertyOf(node, name);
			if (property === undefined) return null;
			if (property.bytes === 4) return new BinaryReader(facts.fdt, false, "fit").u32(property.offset);
			facts.limitations.push(`${node.path}: ${name} is not a single 32-bit cell`);
			return null;
		};
		fitAddress = (facts, node, name) => {
			const property = propertyOf(node, name);
			if (property === undefined) return null;
			if (property.bytes !== 4 && property.bytes !== 8) {
				facts.limitations.push(`${node.path}: ${name} is not a 1- or 2-cell address`);
				return null;
			}
			const reader = new BinaryReader(facts.fdt, false, "fit");
			let value = 0n;
			for (let offset = 0; offset < property.bytes; offset += 4) value = value << 32n | BigInt(reader.u32(property.offset + offset));
			return `0x${value.toString(16)}`;
		};
		strictCell = (fdt, node, property) => {
			if (property.bytes !== 4) throw formatFailure$4(`${node.path}: ${property.name} is not a single 32-bit cell`);
			return new BinaryReader(fdt, false, "fit").u32(property.offset);
		};
		imageRange = (layout, node) => {
			const declared = DATA_SOURCES.flatMap((name) => {
				const property = propertyOf(node, name);
				return property === undefined ? [] : [{
					name,
					property
				}];
			});
			const [source] = declared;
			if (source === undefined) throw formatFailure$4(`${node.path} has no data, data-offset or data-position`);
			if (declared.length > 1) throw formatFailure$4(`${node.path} declares more than one data source`);
			if (source.name === "data") return {
				start: source.property.offset,
				size: source.property.bytes,
				data_source: "embedded",
				declared_offset: null
			};
			const declaredOffset = strictCell(layout.fdt, node, source.property);
			const sizeProperty = propertyOf(node, "data-size");
			if (sizeProperty === undefined) throw formatFailure$4(`${node.path}: ${source.name} requires data-size`);
			const size = strictCell(layout.fdt, node, sizeProperty);
			const start = source.name === "data-offset" ? align4(layout.totalsize) + declaredOffset : declaredOffset;
			if (start + size > layout.fileSize) throw formatFailure$4(`${node.path}: data at [${String(start)}, ${String(start + size)}) lies outside the ${String(layout.fileSize)}-byte file`);
			return {
				start,
				size,
				data_source: source.name,
				declared_offset: declaredOffset
			};
		};
		imageHashes = (facts, image, children) => {
			const nodes = children.filter((child) => nodeName(child).startsWith("hash"));
			if (nodes.length > FIT_MAX_HASH_NODES_PER_IMAGE) throw capacityFailure(`FIT image ${nodeName(image)} declares ${String(nodes.length)} hash nodes, above the fixed ${String(FIT_MAX_HASH_NODES_PER_IMAGE)}-node allowance`);
			const hashes = [];
			const algorithms = [];
			let unverified = 0;
			for (const node of nodes) {
				const name = nodeName(node);
				const algos = nulStrings(facts.fdt, propertyOf(node, "algo"));
				const algo = algos?.length === 1 ? algos[0] : undefined;
				const value = propertyOf(node, "value");
				const expected = algo === undefined ? undefined : DIGEST_BYTES.get(algo);
				if (algo !== undefined) algorithms.push(algo);
				if (algo === undefined || expected === undefined || value === undefined) {
					unverified += 1;
					facts.limitations.push(algo === undefined ? `${name} has no NUL-terminated UTF-8 algo; it is not verified` : expected === undefined ? `${name} algorithm "${algo}" is not verified` : `${name} has no value; it is not verified`);
					continue;
				}
				if (value.bytes !== expected) throw new ArtifactReaderFailure("integrity", `FIT image ${nodeName(image)} ${name} ${algo} value is ${String(value.bytes)} bytes; ${algo} values are ${String(expected)} bytes`, { integrityCheck: "declared-digest" });
				hashes.push({
					node: name,
					algo,
					value: Buffer.from(valueOf(facts.fdt, value))
				});
			}
			return {
				hashes,
				algorithms,
				unverified
			};
		};
		signatureAlgorithms = (facts, children) => {
			const algorithms = [];
			let count = 0;
			let unreadable = 0;
			for (const child of children) {
				if (!nodeName(child).startsWith("signature")) continue;
				count += 1;
				const algo = fitString(facts, child, "algo");
				if (algo !== null) algorithms.push(algo);
				else {
					unreadable += 1;
					if (propertyOf(child, "algo") === undefined) facts.limitations.push(`${child.path}: signature algo is missing`);
				}
			}
			return {
				algorithms,
				count,
				unreadable
			};
		};
		imageDeclaration = (layout, node, index) => {
			const facts = {
				fdt: layout.fdt,
				limitations: []
			};
			const name = nodeName(node);
			const children = layout.children.get(node.path) ?? [];
			const range = imageRange(layout, node);
			const imageDataProperty = propertyOf(node, "image-data");
			const imageData = nulStrings(layout.fdt, imageDataProperty);
			if (imageDataProperty !== undefined && imageData?.length !== 1) throw formatFailure$4(`${node.path}: image-data is not one string`);
			const cipher = children.find((child) => nodeName(child) === "cipher");
			const unreadable = new Set();
			const field = (key, reader, source = node, property = key) => {
				const value = reader(facts, source, property);
				if (value === null && propertyOf(source, property) !== undefined) unreadable.add(key);
				return value;
			};
			const metadata = {
				kind: "fit-image",
				index,
				name,
				description: field("description", fitString),
				type: field("type", fitString),
				arch: field("arch", fitString),
				os: field("os", fitString),
				compression: field("compression", fitString),
				load: field("load", fitAddress),
				entry: field("entry", fitAddress),
				data_source: range.data_source,
				declared_offset: range.declared_offset,
				image_data: imageData?.[0] ?? null,
				cipher_present: cipher !== undefined,
				cipher_algo: cipher === undefined ? null : field("cipher_algo", fitString, cipher, "algo")
			};
			const { hashes, algorithms, unverified } = imageHashes(facts, node, children);
			const signatures = signatureAlgorithms(facts, children);
			return {
				index,
				name,
				start: range.start,
				size: range.size,
				limitations: facts.limitations,
				hashes,
				metadata: {
					...metadata,
					unreadable_fields: [...unreadable].sort(),
					hash_algorithms: algorithms,
					hashes_verified: hashes.length,
					hashes_unverified: unverified,
					signature_count: signatures.count,
					signatures_unreadable: signatures.unreadable,
					signature_algorithms: signatures.algorithms
				}
			};
		};
		assertImageDataLinks = (images, fdt) => {
			const byName = new Map(images.map((image) => [image.name, image]));
			for (const image of images) {
				const name = image.metadata.image_data;
				if (name === null) continue;
				const target = byName.get(name);
				const path = `/images/${image.name}`;
				if (target === undefined) throw formatFailure$4(`${path}: image-data names no image: ${name}`);
				if (target.metadata.image_data !== null) throw formatFailure$4(`${path}: image-data target /images/${name} has its own image-data`);
				if (target.metadata.data_source === "embedded" !== (image.metadata.data_source === "embedded") || target.size !== image.size || (image.metadata.data_source === "embedded" ? !fdt.subarray(image.start, image.start + image.size).equals(fdt.subarray(target.start, target.start + target.size)) : target.start !== image.start)) throw formatFailure$4(`${path}: data does not match its image-data target /images/${name}`);
			}
		};
		assertDisjoint = (images, totalsize) => {
			const owner = (image) => image.metadata.image_data ?? image.name;
			const ranges = images.filter((image) => image.metadata.data_source !== "embedded" && image.size > 0).sort((a, b) => a.start - b.start || a.index - b.index);
			let previous;
			let end = totalsize;
			for (const image of ranges) {
				if (image.start < end) {
					if (previous !== undefined && previous.start === image.start && previous.size === image.size && owner(previous) === owner(image)) continue;
					throw formatFailure$4(`image data overlaps: /images/${image.name} and ${previous === undefined ? "the FIT devicetree" : `/images/${previous.name}`}`);
				}
				previous = image;
				end = image.start + image.size;
			}
		};
		fitConfiguration = (layout, facts, node, images) => {
			const references = {
				kernel: fitStrings(facts, node, "kernel"),
				firmware: fitStrings(facts, node, "firmware"),
				fdt: fitStrings(facts, node, "fdt"),
				ramdisk: fitStrings(facts, node, "ramdisk"),
				loadables: fitStrings(facts, node, "loadables")
			};
			let unresolved = 0;
			for (const values of Object.values(references)) for (const reference of values) if (!images.has(reference)) unresolved += 1;
			if (unresolved > 0) facts.limitations.push(`${node.path}: ${String(unresolved)} image references do not name an /images node`);
			const signatures = signatureAlgorithms(facts, layout.children.get(node.path) ?? []);
			return {
				name: nodeName(node),
				description: fitString(facts, node, "description"),
				...references,
				unresolved_reference_count: unresolved,
				signature_count: signatures.count,
				signatures_unreadable: signatures.unreadable,
				signature_algorithms: signatures.algorithms
			};
		};
		fitConfigurations = (layout, facts, node, images) => {
			if (node === undefined) return {
				default_configuration: null,
				configurations: []
			};
			const children = layout.children.get(node.path) ?? [];
			if (children.length > FIT_MAX_CONFIGURATIONS) throw capacityFailure(`FIT declares ${String(children.length)} configurations, above the fixed ${String(FIT_MAX_CONFIGURATIONS)}-configuration allowance`);
			let references = 0;
			for (const child of children) for (const name of CONFIGURATION_REFERENCES) {
				const property = propertyOf(child, name);
				if (property !== undefined) references += nulCount(valueOf(layout.fdt, property));
			}
			if (references > FIT_MAX_CONFIGURATION_REFERENCES) throw capacityFailure(`FIT configurations declare ${String(references)} image references, above the fixed ${String(FIT_MAX_CONFIGURATION_REFERENCES)}-reference allowance`);
			const configurations = children.map((child) => fitConfiguration(layout, facts, child, images));
			const defaultConfiguration = fitString(facts, node, "default");
			if (defaultConfiguration !== null && !configurations.some((entry) => entry.name === defaultConfiguration)) facts.limitations.push(`${node.path}: default ${defaultConfiguration} names no configuration`);
			return {
				default_configuration: defaultConfiguration,
				configurations
			};
		};
		parseFit = (fdt, path) => {
			try {
				return parseDevicetree(fdt, {
					path,
					sha256: "",
					bytes: fdt.length
				}, {
					path,
					max_file_bytes: MAX_DEVICETREE_FILE_BYTES,
					max_nodes: 8192,
					max_properties: 32768,
					max_depth: 64
				});
			} catch (cause) {
				if (cause instanceof BinaryFormatFailure) throw formatFailure$4(cause.message);
				if (isParseLimit(cause, "devicetree")) {
					const { limit: parserLimit } = cause.failure;
					throw new ArtifactReaderFailure("limit", `FIT devicetree exceeds the fixed ${parserLimit.name} allowance`, {
						boundary: parserLimit.name === "decoded_bytes" ? "memory" : "capacity",
						cause,
						parserLimit
					});
				}
				throw cause;
			}
		};
		readFitStructure = (fdt, path, fileSize) => {
			const { report: tree, structureLimitations } = parseFit(fdt, path);
			const byPath = new Map(tree.nodes.map((node) => [node.path, node]));
			const children = new Map();
			for (const node of tree.nodes) {
				if (node.parent === null) continue;
				const siblings = children.get(node.parent);
				if (siblings === undefined) children.set(node.parent, [node]);
				else siblings.push(node);
			}
			const root = byPath.get("/");
			if (root === undefined || !byPath.has("/images")) throw formatFailure$4("/images node is missing");
			const { totalsize } = tree.header;
			const layout = {
				fdt,
				children,
				totalsize,
				fileSize
			};
			const imageNodes = children.get("/images") ?? [];
			if (imageNodes.length > FIT_MAX_IMAGES) throw capacityFailure(`FIT declares ${String(imageNodes.length)} images, above the fixed ${String(FIT_MAX_IMAGES)}-image allowance`);
			const images = imageNodes.map((node, index) => imageDeclaration(layout, node, index));
			assertImageDataLinks(images, fdt);
			assertDisjoint(images, totalsize);
			const declared = images.reduce((sum, image) => sum + image.size, 0);
			const budget = artifactExpansionBudgetBytes(fileSize);
			if (declared > budget) throw new ArtifactReaderFailure("limit", `FIT images declare ${String(declared)} bytes, exceeding this file's ${String(budget)}-byte expansion budget`, { boundary: "memory" });
			const facts = {
				fdt,
				limitations: [...structureLimitations]
			};
			return {
				images,
				limitations: facts.limitations,
				metadata: {
					kind: "fit",
					fdt_version: tree.header.version,
					fdt_totalsize: totalsize,
					external_data_base: align4(totalsize),
					description: fitString(facts, root, "description"),
					timestamp: fitU32(facts, root, "timestamp"),
					address_cells: fitU32(facts, root, "#address-cells"),
					...fitConfigurations(layout, facts, byPath.get("/configurations"), new Set(images.map((image) => image.name)))
				}
			};
		};
	})))();
}

//#endregion
//#region dist/artifacts/FitArtifactReader.js
var FitArtifactReader, hashReadCancelled;
function init_FitArtifactReader() {
	return (init_FitArtifactReader = __esmMin((() => {
		init_ArtifactPreparation();
		init_binaryContainer();
		init_devicetreeHeader();
		init_devicetree();
		init_resources();
		init_OwnedArtifactStream();
		init_FitStructure();
		init_readFileHandleChunks();
		init_readFileHandleRange();
		FitArtifactReader = class {
			format = "fit";
			#scope = new ArtifactResourceScope();
			#entries = new Map();
			#lifecycle = new ArtifactStreamLifecycle("FIT");
			#path;
			#source;
			#preparation = new ArtifactPreparation();
			#metadata;
			#coverage;
			constructor(path, admitted) {
				this.#path = path;
				this.#source = new ArtifactFileSource(path, "FIT", admitted);
			}
			formatMetadata() {
				return this.#metadata === undefined ? undefined : structuredClone(this.#metadata);
			}
			async prepareContainer(expectedSha256, signal) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#source.bindSha256(expectedSha256, signal);
				});
			}
			async *entries(signal, options) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#preparation.run(signal, () => this.#prepare(signal), () => this.#assertOpen(signal));
					await this.#source.read(signal);
				});
				if (this.#coverage !== undefined) options?.onCoverage?.({
					...this.#coverage,
					limitations: [...this.#coverage.limitations]
				});
				let index = 0;
				for (const entry of this.#entries.values()) {
					if (index % 256 === 0) await setImmediate();
					index += 1;
					this.#assertOpen(signal);
					yield copyArtifactEntry(entry);
				}
				this.#assertOpen(signal);
			}
			async open(entry, signal) {
				return this.#scope.run(async () => {
					this.#assertOpen(signal);
					const stored = this.#entries.get(entry.adapterKey);
					assertProducedEntry(entry, stored, "FIT entry does not match its owning inventory");
					const { handle } = await this.#source.read(signal);
					this.#assertOpen(signal);
					if (stored.byteOffset === null || stored.declaredSize === null) throw new ArtifactReaderFailure("format", `FIT image has no byte range: ${stored.path}`);
					const lifecycle = this.#lifecycle.member(signal);
					const { signal: streamSignal, cancellationFailure } = lifecycle;
					const source = stored.declaredSize === 0 ? Readable.from([]) : readFileHandleChunks(handle, {
						start: stored.byteOffset,
						end: stored.byteOffset + stored.declaredSize - 1,
						signal: streamSignal,
						cancellationFailure
					});
					const output = checkedArtifactMemberStream(stored, "FIT", () => new ArtifactReaderFailure("format", `FIT image ended early: ${stored.path}`), () => lifecycle.verify((signal) => this.#source.read(signal)));
					ownArtifactStream(source, output, {
						scope: this.#scope,
						signal: streamSignal,
						cancellationFailure,
						label: "FIT"
					});
					return output;
				});
			}
			async close() {
				this.#lifecycle.close();
				await this.#scope.close();
				await this.#source.close();
				this.#entries.clear();
			}
			provenance() {
				return [];
			}
			#assertOpen(signal) {
				assertArtifactReadActive(signal);
				if (this.#lifecycle.closed) throw new ArtifactReaderFailure("unavailable", "FIT reader is closed");
			}
			async #prepare(signal) {
				const { handle, initial } = await this.#source.read(signal);
				const assertActive = () => this.#assertOpen(signal);
				const prefix = await readFileHandleRange(handle, 0, 40, assertActive);
				let totalsize;
				try {
					({totalsize} = readDevicetreeHeader(prefix).header);
				} catch (cause) {
					if (cause instanceof BinaryFormatFailure) throw new ArtifactReaderFailure("format", `FIT devicetree header: ${cause.message}`);
					throw cause;
				}
				if (totalsize > initial.size) throw new ArtifactReaderFailure("format", `FIT devicetree is truncated: totalsize ${String(totalsize)} exceeds the ${String(initial.size)}-byte file`);
				if (totalsize > 16777216) throw new ArtifactReaderFailure("limit", `FIT devicetree is ${String(totalsize)} bytes, above the fixed 16 MiB devicetree allowance; embedded image data this large is not supported (mkimage -E stores data externally). No runtime override.`, { boundary: "memory" });
				const structure = readFitStructure(await readFileHandleRange(handle, 0, totalsize, assertActive), this.#path, initial.size);
				const entries = new Map();
				let index = 0;
				for (const image of structure.images) {
					if (index % 256 === 0) await setImmediate();
					index += 1;
					this.#assertOpen(signal);
					await this.#verifyHashes(image, signal);
					const entry = {
						path: `images/${image.name}.bin`,
						sourcePath: `/images/${image.name}`,
						kind: "file",
						declaredSize: image.size,
						compressedSize: null,
						executable: false,
						encrypted: false,
						byteOffset: image.start,
						declaredIntegrity: null,
						unpacked: false,
						limitations: image.limitations,
						adapterKey: `fit:${String(image.index)}`,
						formatMetadata: image.metadata
					};
					entries.set(entry.adapterKey, entry);
				}
				await this.#source.read(signal);
				this.#assertOpen(signal);
				this.#entries = entries;
				this.#metadata = structure.metadata;
				this.#coverage = {
					status: "complete",
					limitations: structure.limitations
				};
			}
			/** One streamed pass per image feeds every supported digest. */
			async #verifyHashes(image, signal) {
				const digests = image.hashes.flatMap((hash) => {
					const digest = createFitDigest(hash.algo);
					return digest === undefined ? [] : [{
						hash,
						digest
					}];
				});
				if (digests.length === 0) return;
				const { handle } = await this.#source.read(signal);
				if (image.size > 0) for await (const chunk of readFileHandleChunks(handle, {
					start: image.start,
					end: image.start + image.size - 1,
					signal,
					cancellationFailure: hashReadCancelled
				})) {
					this.#assertOpen(signal);
					for (const { digest } of digests) digest.update(chunk);
				}
				for (const { hash, digest } of digests) {
					const computed = digest.digest();
					if (!computed.equals(hash.value)) throw new ArtifactReaderFailure("integrity", `FIT image ${image.name} ${hash.node} ${hash.algo} does not match: declared ${hash.value.toString("hex")}, computed ${computed.toString("hex")}`, { integrityCheck: "declared-digest" });
				}
			}
		};
		hashReadCancelled = (reason) => new ArtifactReaderFailure("cancelled", "FIT read cancelled", { cause: reason });
	})))();
}

//#endregion
//#region dist/artifacts/GodotPckArtifactReader.js
var PACK_DIR_ENCRYPTED, PACK_REL_FILEBASE, PACK_SPARSE_BUNDLE, PACK_FILE_ENCRYPTED, DIRECTORY_CHUNK_BYTES, UTF8$2, GodotPckArtifactReader, readGodotPckHeader, pckMemberPath, PckCursor, toSafeOffset, formatFailure$3, metadataLimit;
function init_GodotPckArtifactReader() {
	return (init_GodotPckArtifactReader = __esmMin((() => {
		init_ArtifactFileRange();
		init_binaryContainer();
		init_artifactReaderLimits();
		init_godotPckFormat();
		init_artifactExpansionBudget();
		init_resources();
		init_GodotPckLocation();
		init_jsonValueByteLength();
		init_PositionalArtifactReader();
		init_strictUtf8();
		PACK_DIR_ENCRYPTED = 1;
		PACK_REL_FILEBASE = 2;
		PACK_SPARSE_BUNDLE = 4;
		PACK_FILE_ENCRYPTED = 1;
		DIRECTORY_CHUNK_BYTES = 64 * 1024;
		UTF8$2 = strictUtf8Decoder("preserve");
		GodotPckArtifactReader = class extends PositionalArtifactReader {
			limits;
			expandedBytes;
			format = "godot-pck";
			#location;
			#header;
			constructor(path, admitted, limits = DEFAULT_GODOT_READER_LIMITS, expandedBytes) {
				const admission = admitted !== undefined && "kind" in admitted ? admitted : undefined;
				super(path, "Godot PCK", admitted !== undefined && "kind" in admitted ? admitted.source : admitted);
				this.limits = limits;
				this.expandedBytes = expandedBytes;
				this.#location = admission?.location;
			}
			formatMetadata() {
				return this.#header === undefined ? undefined : { ...this.#header };
			}
			async prepareEntries(signal) {
				const { handle, initial } = await this.verifyCarrier(signal);
				const header = await readGodotPckHeader(handle, initial.size, signal, this.#location);
				this.#header = header;
				if (header.directory_status !== "available") return {
					entries: [],
					coverage: {
						status: "unknown",
						limitations: [header.directory_status === "encrypted" ? "Godot PCK directory is encrypted; member identities and contents remain unknown." : "Godot PCK sparse-bundle member bytes are external and were not traversed."]
					}
				};
				const cursor = new PckCursor(handle, header.directory_start + 4, header.pack_end, {
					signal,
					limits: this.limits
				});
				const entries = [];
				let retainedBytes = 0;
				let declaredPlaintextBytes = 0n;
				const expansionBudget = BigInt(this.expandedBytes ?? artifactExpansionBudgetBytes(header.pack_end - header.pack_start));
				for (let index = 0; index < header.declared_file_count; index++) {
					if (index % 256 === 0) await setImmediate();
					assertArtifactReadActive(signal);
					const metadata = await this.#readEntry(cursor, header, index, retainedBytes);
					if (!metadata.encrypted) {
						declaredPlaintextBytes += BigInt(metadata.declaredSize);
						if (declaredPlaintextBytes > expansionBudget) throw artifactReaderLimitFailure("artifact_limits.expanded_bytes", Number(expansionBudget), "bytes", declaredPlaintextBytes, "memory");
					}
					retainedBytes += jsonValueByteLength(metadata, this.limits.directory_bytes - retainedBytes);
					if (retainedBytes > this.limits.directory_bytes) throw metadataLimit(this.limits, retainedBytes);
					entries.push(metadata);
				}
				const directoryEnd = cursor.offset;
				for (const entry of entries) {
					if (entry.declaredSize > 0 && entry.byteOffset < directoryEnd && entry.byteOffset + entry.declaredSize > header.directory_start) throw formatFailure$3(`member overlaps the directory: ${entry.sourcePath}`);
				}
				await this.verifyCarrier(signal);
				return {
					entries,
					coverage: {
						status: "complete",
						limitations: []
					}
				};
			}
			async #readEntry(cursor, header, index, retainedBytes) {
				const pathBytes = await cursor.uint32();
				cursor.requireBytes(pathBytes + (header.format_version === 1 ? 32 : 36));
				if (pathBytes * 18 > this.limits.directory_bytes - retainedBytes) throw metadataLimit(this.limits, retainedBytes + pathBytes * 18);
				const rawPath = await cursor.bytes(pathBytes);
				const offset = await cursor.uint64();
				const size = await cursor.uint64();
				const md5 = (await cursor.bytes(16)).toString("hex");
				const flags = header.format_version === 1 ? 0 : await cursor.uint32();
				if ((flags & ~PACK_FILE_ENCRYPTED) !== 0) throw new ArtifactReaderFailure("unavailable", `Godot patch or unknown member flags are unsupported: 0x${flags.toString(16)}`);
				const sourcePath = pckMemberPath(rawPath);
				if (header.format_version === 1 && offset === 0n) throw new ArtifactReaderFailure("unavailable", `Godot PCK patch removal entry is unsupported: ${sourcePath}`);
				const start = toSafeOffset(offset, header.file_base, header.pack_end, sourcePath);
				if (start < header.pack_start) throw formatFailure$3(`member starts before the pack: ${sourcePath}`);
				if (size > 0n && !godotPckDataStartsAfterHeader(header.pack_start, header.format_version, start)) throw formatFailure$3(`member overlaps the pack header: ${sourcePath}`);
				if (size > BigInt(header.pack_end - start)) throw formatFailure$3(`member exceeds the pack: ${sourcePath}`);
				return {
					path: sourcePath.startsWith("res://") ? sourcePath.slice(6) : sourcePath,
					sourcePath,
					kind: "file",
					declaredSize: Number(size),
					compressedSize: null,
					executable: false,
					encrypted: (flags & PACK_FILE_ENCRYPTED) !== 0,
					byteOffset: start,
					declaredIntegrity: /^0{32}$/u.test(md5) ? null : {
						algorithm: "md5",
						digest: md5
					},
					unpacked: false,
					limitations: /^0{32}$/u.test(md5) ? ["Godot PCK declares an all-zero MD5; source integrity is unknown."] : [],
					adapterKey: `godot-pck-entry:${String(index)}`,
					formatMetadata: {
						kind: "godot-pck-entry",
						index,
						source_path: sourcePath,
						declared_offset: Number(offset),
						flags,
						md5_status: /^0{32}$/u.test(md5) ? "all-zero" : "declared"
					}
				};
			}
		};
		readGodotPckHeader = async (handle, size, signal, admittedLocation) => {
			const location = admittedLocation ?? await locateGodotPck(handle, size, signal);
			if (location === undefined) throw formatFailure$3("no standalone header or executable trailer");
			const { start, end, embedded } = location;
			const fixed = await readArtifactFileBytes(handle, start, 40, end, signal);
			const fixedReader = new BinaryReader(fixed, true, "godot-pck");
			const header = readGodotPckHeaderFacts(fixed);
			const version = header.formatVersion;
			if (![
				1,
				2,
				3,
				4
			].includes(version)) throw new ArtifactReaderFailure("unavailable", `Godot PCK format ${String(version)} is unsupported; plain formats 1, 2, 3 and 4 are supported`);
			const flags = version === 1 ? 0 : fixedReader.u32(20);
			if ((flags & ~(PACK_DIR_ENCRYPTED | PACK_REL_FILEBASE | PACK_SPARSE_BUNDLE)) !== 0) throw new ArtifactReaderFailure("unavailable", `Godot PCK declares unknown pack flags 0x${flags.toString(16)}`);
			const fileBase = version === 1 ? 0 : toSafeOffset(fixedReader.word(24, 64), version >= 3 || (flags & PACK_REL_FILEBASE) !== 0 ? start : 0, end, "file base");
			const directory = version >= 3 ? toSafeOffset(fixedReader.word(32, 64), start, end, "directory") : godotPckHeaderEnd(start, version);
			if (!godotPckDataStartsAfterHeader(start, version, directory)) throw formatFailure$3("directory overlaps the pack header");
			const count = new BinaryReader(await readArtifactFileBytes(handle, directory, 4, end, signal), true, "godot-pck").u32(0);
			const status = (flags & PACK_DIR_ENCRYPTED) !== 0 ? "encrypted" : (flags & PACK_SPARSE_BUNDLE) !== 0 ? "sparse-bundle" : "available";
			if (status === "available" && count * (version === 1 ? 36 : 40) > end - directory - 4) throw formatFailure$3("declared member count cannot fit in the directory");
			return {
				kind: "godot-pck",
				format_version: version,
				engine_major: header.engineMajor,
				engine_minor: header.engineMinor,
				engine_patch: header.enginePatch,
				pack_start: start,
				pack_end: end,
				embedded,
				pack_flags: flags,
				file_base: fileBase,
				directory_start: directory,
				declared_file_count: count,
				directory_status: status
			};
		};
		pckMemberPath = (raw) => {
			let end = raw.length;
			while (end > 0 && raw[end - 1] === 0) end--;
			let path;
			try {
				path = UTF8$2.decode(raw.subarray(0, end));
			} catch (cause) {
				throw new ArtifactReaderFailure("format", "Godot PCK path is not valid UTF-8", { cause });
			}
			if (path.length === 0 || path === "res://" || path.includes("\0")) throw formatFailure$3("empty or NUL-containing member path");
			return path;
		};
		PckCursor = class {
			handle;
			position;
			end;
			options;
			#buffer = Buffer.alloc(0);
			#bufferStart = 0;
			constructor(handle, position, end, options) {
				this.handle = handle;
				this.position = position;
				this.end = end;
				this.options = options;
			}
			get offset() {
				return this.position;
			}
			requireBytes(length) {
				if (length > this.end - this.position) throw formatFailure$3("directory entry exceeds the pack");
			}
			async bytes(length) {
				this.requireBytes(length);
				if (length > this.options.limits.directory_bytes / 18) throw metadataLimit(this.options.limits, length * 18);
				if (length > DIRECTORY_CHUNK_BYTES) {
					const value = await readArtifactFileBytes(this.handle, this.position, length, this.end, this.options.signal);
					this.position += length;
					return value;
				}
				const offset = this.position - this.#bufferStart;
				if (offset < 0 || offset + length > this.#buffer.length) {
					this.#buffer = await readArtifactFileBytes(this.handle, this.position, Math.min(DIRECTORY_CHUNK_BYTES, this.end - this.position), this.end, this.options.signal);
					this.#bufferStart = this.position;
				}
				const start = this.position - this.#bufferStart;
				this.position += length;
				return this.#buffer.subarray(start, start + length);
			}
			async uint32() {
				return new BinaryReader(await this.bytes(4), true, "godot-pck").u32(0);
			}
			async uint64() {
				return new BinaryReader(await this.bytes(8), true, "godot-pck").word(0, 64);
			}
		};
		toSafeOffset = (offset, base, end, subject) => {
			if (base > end || offset > BigInt(end - base)) throw formatFailure$3(`${subject} offset exceeds the pack`);
			return base + Number(offset);
		};
		formatFailure$3 = (detail) => new ArtifactReaderFailure("format", `Godot PCK is malformed: ${detail}`);
		metadataLimit = (limits, required) => artifactReaderLimitFailure("artifact_limits.godot.directory_bytes", limits.directory_bytes, "bytes", required, "memory");
	})))();
}

//#endregion
//#region dist/filesystem/readFileHandlePrefix.js
var readFileHandlePrefix;
function init_readFileHandlePrefix() {
	return (init_readFileHandlePrefix = __esmMin((() => {
		readFileHandlePrefix = async (handle, length, checkCancellation) => {
			const prefix = Buffer.alloc(length);
			let offset = 0;
			while (offset < length) {
				checkCancellation();
				const { bytesRead } = await handle.read(prefix, offset, length - offset, offset);
				checkCancellation();
				if (bytesRead === 0) break;
				offset += bytesRead;
			}
			return prefix.subarray(0, offset);
		};
	})))();
}

//#endregion
//#region dist/artifacts/InesArtifactReader.js
var CLASSIC_INES_LIMITATION, NES_2_LIMITATION, inesInventoryLimitation, regionReadFailure, InesArtifactReader;
function init_InesArtifactReader() {
	return (init_InesArtifactReader = __esmMin((() => {
		init_parseFailure();
		init_resources();
		init_readFileHandlePrefix();
		init_inesContainer();
		init_RegularFile();
		init_readFileHandleChunks();
		CLASSIC_INES_LIMITATION = "Classic iNES file regions are observed; mapper execution, CPU bank mappings, CHR-RAM contents, 6502 analysis and emulator behavior are not observed. Trailing bytes are retained without interpretation. NES 2.0 and UNIF are unsupported.";
		NES_2_LIMITATION = "NES 2.0 file regions are observed; header mapper, nametable layout flags, RAM/NVRAM, timing, console and expansion-device values are declarations. Effective nametable wiring, mapper execution, CPU bank mappings, CHR-RAM contents, miscellaneous ROM boundaries, 6502 analysis and emulator behavior are not observed. Trailing bytes are retained without interpretation. UNIF is unsupported.";
		inesInventoryLimitation = (header) => header.format === "ines" ? CLASSIC_INES_LIMITATION : NES_2_LIMITATION;
		regionReadFailure = (cause) => cause instanceof ArtifactReaderFailure ? cause : new ArtifactReaderFailure("io", "Could not read iNES region", { cause });
		InesArtifactReader = class {
			path;
			source;
			ownedSource;
			format = "ines";
			#entries = new Map();
			#scope = new ArtifactResourceScope();
			#lifecycle = new AbortController();
			#closedFailure = new ArtifactReaderFailure("unavailable", "iNES reader is closed");
			#layout;
			#closed = false;
			constructor(path, source, ownedSource) {
				this.path = path;
				this.source = source;
				this.ownedSource = ownedSource;
			}
			async *entries(signal, options) {
				const layout = await this.#scope.run(async () => {
					await this.#verifySource(signal);
					const prefix = await readFileHandlePrefix(this.source.handle, 16, () => abortIfNeeded(signal));
					abortIfNeeded(signal);
					await this.#verifySource(signal);
					const parsed = parseInesLayout(prefix, this.source.initial.size);
					if (!parsed.ok) throw new ArtifactReaderFailure("format", parsed.error.detail, { cause: new ParseFailureError(parsed.error) });
					this.#layout = parsed.value;
					this.#entries.clear();
					return parsed.value;
				});
				for (const region of layout.regions) {
					this.#assertOpen(signal);
					const entry = {
						path: region.path,
						kind: "file",
						declaredSize: region.length,
						compressedSize: null,
						executable: false,
						encrypted: false,
						byteOffset: region.offset,
						declaredIntegrity: null,
						unpacked: false,
						limitations: [],
						adapterKey: region.path
					};
					this.#entries.set(entry.adapterKey, copyArtifactEntry(entry));
					yield entry;
				}
				this.#assertOpen(signal);
				options?.onCoverage?.({
					status: "complete",
					limitations: []
				});
			}
			async open(entry, signal) {
				return this.#scope.run(() => this.#openRegion(entry, signal));
			}
			async #openRegion(entry, signal) {
				this.#assertOpen(signal);
				const produced = this.#entries.get(entry.adapterKey);
				assertProducedEntry(entry, produced, "iNES region does not match this reader's inventory");
				await this.#verifySource(signal);
				this.#assertOpen(signal);
				const offset = produced.byteOffset;
				const size = produced.declaredSize;
				if (offset === null || size === null || size <= 0) throw new ArtifactReaderFailure("integrity", "Invalid iNES region range", { integrityCheck: "layout-consistency" });
				const active = AbortSignal.any([this.#lifecycle.signal, ...signal === undefined ? [] : [signal]]);
				const failure = () => this.#lifecycle.signal.aborted && active.reason === this.#closedFailure ? this.#closedFailure : new ArtifactReaderFailure("cancelled", "iNES region read cancelled", { cause: active.reason });
				const source = readFileHandleChunks(this.source.handle, {
					start: offset,
					end: offset + size - 1,
					signal: active,
					cancellationFailure: failure
				});
				const verify = () => this.#scope.run(() => this.#verifySource(active, failure));
				const assertActive = () => this.#assertOpen(active, failure);
				let bytes = 0;
				const output = new Transform({
					destroy(cause, callback) {
						callback(cause === null ? null : regionReadFailure(cause));
					},
					transform(raw, _encoding, callback) {
						try {
							assertActive();
							const chunk = streamChunkToBuffer(raw);
							bytes += chunk.length;
							callback(null, chunk);
						} catch (cause) {
							callback(regionReadFailure(cause));
						}
					},
					final(callback) {
						void (async () => {
							if (bytes !== size) throw new ArtifactReaderFailure("integrity", "Truncated iNES region", { integrityCheck: "read-coverage" });
							await verify();
						})().then(() => callback(), (cause) => callback(regionReadFailure(cause)));
					}
				});
				output.on("error", () => undefined);
				let producerComplete = false;
				const onAbort = () => {
					if (producerComplete && !output.destroyed) output.destroy(failure());
				};
				const retired = new Promise((resolve) => {
					output.once("close", () => {
						active.removeEventListener("abort", onAbort);
						resolve();
					});
				});
				active.addEventListener("abort", onAbort, { once: true });
				void this.#scope.run(async () => {
					await Promise.all([new Promise((resolve) => {
						pipeline(source, output, () => {
							producerComplete = true;
							if (active.aborted) onAbort();
							resolve();
						});
					}), retired]);
				}).catch((cause) => output.destroy(regionReadFailure(cause)));
				return output;
			}
			/** Validate the completed region scan without rereading its payload. */
			async verifyReconstruction(expectedSha256, observed, signal) {
				return this.#scope.run(() => this.#verifyReconstruction(expectedSha256, observed, signal));
			}
			async #verifyReconstruction(expectedSha256, observed, signal) {
				this.#assertOpen(signal);
				const layout = this.#layout;
				if (layout === undefined || this.#entries.size !== layout.regions.length) throw new ArtifactReaderFailure("integrity", "Incomplete iNES inventory", { integrityCheck: "reconstruction" });
				await this.#verifySource(signal);
				if (observed.region_order.length !== layout.regions.length || layout.regions.some((region, index) => observed.region_order[index] !== region.path) || observed.bytes !== this.source.initial.size || observed.sha256 !== expectedSha256) throw new ArtifactReaderFailure("integrity", "iNES reconstruction differs from the source", { integrityCheck: "reconstruction" });
				return {
					header: layout.header,
					reconstruction: {
						...observed,
						verified: true
					}
				};
			}
			provenance() {
				return [];
			}
			async close() {
				this.#closed = true;
				this.#lifecycle.abort(this.#closedFailure);
				await this.#scope.close();
				await this.ownedSource?.close();
			}
			async #verifySource(signal, interruption) {
				this.#assertOpen(signal, interruption);
				try {
					await assertStableRegularFileIdentity(this.source.handle, this.path, this.source.initial, {
						symlinks: "reject",
						...signal === undefined ? {} : { signal }
					});
				} catch (cause) {
					if (interruption !== undefined && cause instanceof RegularFileOperationCancelled) throw interruption();
					if (cause instanceof RegularFileChangedError) throw new ArtifactReaderFailure("integrity", "iNES source changed during reading", {
						cause: cause.cause ?? cause,
						integrityCheck: "container-identity"
					});
					throw artifactOperationCause(cause);
				}
				this.#assertOpen(signal, interruption);
			}
			#assertOpen(signal, interruption) {
				if (signal?.aborted === true && interruption !== undefined) throw interruption();
				abortIfNeeded(signal);
				if (this.#closed) throw this.#closedFailure;
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/HexRecordArtifactReader.js
var hexRecordRegions, HexRecordArtifactReader;
function init_HexRecordArtifactReader() {
	return (init_HexRecordArtifactReader = __esmMin((() => {
		init_hexRecords();
		init_DecodedRegionArtifactReader();
		hexRecordRegions = (format) => ({
			label: HEX_RECORD_ENCODING_LABELS[format],
			keyPrefix: "hex-records",
			createDecoder: (fileBytes) => createHexRecordDecoder(format, fileBytes),
			describe: (image) => ({
				metadata: image.metadata,
				regions: image.regions.map((region) => ({
					path: regionFileName(region.start, region.end),
					byteOffset: null,
					formatMetadata: {
						kind: "hex-record-region",
						start_address: region.start,
						end_address: region.end,
						length: region.bytes.length,
						record_count: region.recordCount,
						first_line: region.firstLine,
						last_line: region.lastLine
					},
					bytes: region.bytes
				})),
				coverage: {
					status: image.terminated ? "complete" : "unknown",
					limitations: image.limitations
				}
			})
		});
		HexRecordArtifactReader = class extends DecodedRegionArtifactReader {
			constructor(path, format, admitted) {
				super(path, format, hexRecordRegions(format), admitted);
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/MachOSliceArtifactReader.js
var MachOSliceArtifactReader, lipoCpuSourceLimitations, lipoRowEvidence, structuralSliceName, uniqueSliceName, readStructuralSlices, lipoMatchesSlice, lipoNameMatches;
function init_MachOSliceArtifactReader() {
	return (init_MachOSliceArtifactReader = __esmMin((() => {
		init_resources();
		init_NativeCommandRunner();
		init_machoCpuIdentity();
		init_machoLoadCommandReader();
		init_readFileHandleRange();
		init_lipo();
		MachOSliceArtifactReader = class {
			path;
			runner;
			integrity;
			format = "file";
			#command;
			#source;
			#entries = new Map();
			#enumerations = new Set();
			#pendingOpens = new Set();
			#streams = new Map();
			#closed = false;
			#closePromise;
			/** Coverage of the latest enumeration, reported when its iterator ends. */
			#coverage = {
				status: "complete",
				limitations: []
			};
			constructor(path, environment, runner = new XcrunCommandRunner(environment), source, integrity = "fail") {
				this.path = path;
				this.runner = runner;
				this.integrity = integrity;
				this.#source = new ArtifactFileSource(path, "Universal Mach-O", source);
			}
			async *entries(signal, options) {
				const enumeration = this.#readEntries(signal);
				this.#enumerations.add(enumeration);
				try {
					yield* enumeration;
					this.#assertOpen(signal);
					options?.onCoverage?.({
						status: this.#coverage.status,
						limitations: [...this.#coverage.limitations]
					});
				} finally {
					this.#enumerations.delete(enumeration);
				}
			}
			async *#readEntries(signal) {
				this.#assertOpen(signal);
				this.#entries.clear();
				this.#coverage = {
					status: "complete",
					limitations: []
				};
				const source = await this.#ensureSource();
				await this.#source.readSelectedPath();
				this.#assertOpen(signal);
				const command = this.runner.run("lipo", ["-detailed_info", this.path], signal === undefined ? {} : { signal });
				const captured = await command;
				if (!captured.ok) throw new ArtifactReaderFailure(captured.error.reason === "cancelled" ? "cancelled" : "unavailable", captured.error.detail === null ? "lipo could not enumerate universal Mach-O slices" : `lipo could not enumerate universal Mach-O slices: ${captured.error.detail}`, {
					cause: captured.error,
					...captured.error.cleanupFailure === null && captured.error.cleanupResources.length === 0 ? {} : { cleanup: {
						reason: captured.error.cleanupFailure ?? "Native command cleanup remains unverified",
						resources: [...captured.error.cleanupResources]
					} }
				});
				this.#assertOpen(signal);
				this.#command = {
					tool: captured.value.tool,
					arguments: ["-detailed_info", "$ARTIFACT"],
					tool_version: captured.value.toolVersion,
					executable_sha256: captured.value.executableSha256,
					exit_code: captured.value.exitCode,
					effects: ["read"]
				};
				await this.#source.readSelectedPath();
				const fileSize = source.initial.size;
				const parsed = parseLipoOutputResult(captured.value.stdout, this.path);
				if (!parsed.ok) throw new ArtifactReaderFailure(parsed.error instanceof LipoFieldRetentionError ? "limit" : "format", `lipo did not produce readable architecture records: ${parsed.error.message}`, {
					cause: parsed.error,
					...parsed.error instanceof LipoFieldRetentionError ? { boundary: "memory" } : {}
				});
				const lipo = parsed.value;
				const { architectures } = lipo;
				const structural = await readStructuralSlices(source.handle, fileSize, signal);
				await this.#source.readSelectedPath();
				this.#assertOpen(signal);
				if (structural.status === "malformed") throw new ArtifactReaderFailure("integrity", `Mach-O structural slice index is malformed: ${structural.reason}`, { integrityCheck: "layout-consistency" });
				if (structural.status === "unsupported" && architectures.some(({ file_offset, size }) => file_offset === null || size === null)) throw new ArtifactReaderFailure("unavailable", `Mach-O structural slice index is unsupported: ${structural.reason}`);
				const disagreements = [];
				const disagree = (message) => {
					if (this.integrity === "fail") throw new ArtifactReaderFailure("integrity", message, { integrityCheck: "layout-consistency" });
					disagreements.push(message);
				};
				const hiddenArchitectures = architectures.filter(({ hidden }) => hidden);
				const visibleArchitectures = architectures.filter(({ hidden }) => !hidden);
				if (lipo.hiddenArchitectureCount !== null && lipo.hiddenArchitectureCount !== hiddenArchitectures.length) disagree("lipo hidden architecture count disagrees with its architecture rows");
				if (lipo.declaredArchitectureCount !== null && lipo.declaredArchitectureCount !== visibleArchitectures.length) disagree("lipo declared architecture count disagrees with its visible rows");
				if ((hiddenArchitectures.length > 0 || (lipo.hiddenArchitectureCount ?? 0) > 0) && structural.status !== "parsed") throw new ArtifactReaderFailure("unavailable", "Apple hidden ARM64 slice could not be verified against the FAT table");
				const slices = structural.status === "parsed" ? structural.slices : null;
				const hiddenSlices = structural.status === "parsed" ? structural.hiddenSlices ?? [] : [];
				const matchingSlices = new Map();
				const unmatchedRowLimitations = [];
				if (slices !== null) {
					if (slices.length !== visibleArchitectures.length || hiddenSlices.length !== hiddenArchitectures.length || hiddenArchitectures.length > 0 && (lipo.declaredArchitectureCount === null || lipo.hiddenArchitectureCount === null) || lipo.declaredArchitectureCount !== null && lipo.declaredArchitectureCount !== slices.length || lipo.hiddenArchitectureCount !== null && lipo.hiddenArchitectureCount !== hiddenSlices.length) disagree("lipo declared and hidden architecture counts disagree with the Mach-O FAT table");
					for (const [reportedRows, observedRows] of [[visibleArchitectures, slices], [hiddenArchitectures, hiddenSlices]]) {
						const unmatched = [...observedRows];
						for (const reported of reportedRows) {
							const match = unmatched.findIndex((observed) => lipoMatchesSlice(reported, observed, observedRows.length === 1));
							if (match < 0) {
								disagree(`lipo slice metadata disagrees with the Mach-O FAT table: ${reported.name} (cputype=${reported.cpu_type ?? "unknown"}, cpusubtype=${reported.cpu_subtype ?? "unknown"}, offset=${reported.file_offset ?? "unknown"}, size=${reported.size ?? "unknown"}, alignment=${reported.alignment ?? "unknown"})`);
								unmatchedRowLimitations.push(...lipoRowEvidence(reported));
								continue;
							}
							const [observed] = unmatched.splice(match, 1);
							if (observed !== undefined) matchingSlices.set(reported, observed);
						}
					}
				}
				if (disagreements.length > 0 && slices !== null) {
					this.#coverage = {
						status: "complete",
						limitations: [`Integrity limitation: lipo slice metadata disagrees with the Mach-O FAT table (${disagreements.join("; ")}). Slices were enumerated from REA's FAT table parse; lipo's ranges were not used.`, ...unmatchedRowLimitations]
					};
					const matchedRows = new Map(Array.from(matchingSlices, ([reported, observed]) => [observed, reported]));
					const names = new Set();
					for (const slice of [...slices, ...hiddenSlices]) {
						this.#assertOpen(signal);
						const reported = matchedRows.get(slice);
						yield this.#sliceEntry(uniqueSliceName(reported?.name ?? structuralSliceName(slice), slice.slice_offset, names), slice.slice_offset, slice.slice_size, fileSize, reported === undefined ? [] : lipoRowEvidence(reported));
					}
					return;
				}
				if (disagreements.length > 0) this.#coverage = {
					status: "unknown",
					limitations: [`Integrity limitation: lipo's architecture counts disagree with its own records (${disagreements.join("; ")}). No structural FAT parse was available, so slice ranges are based on lipo's records and the slice list may be incomplete.`]
				};
				for (const architecture of architectures) {
					this.#assertOpen(signal);
					const structuralSlice = matchingSlices.get(architecture);
					const offset = architecture.file_offset ?? structuralSlice?.slice_offset;
					const sliceSize = architecture.size ?? structuralSlice?.slice_size;
					if (offset === undefined || sliceSize === undefined) throw new ArtifactReaderFailure("integrity", "lipo omitted a universal slice byte range", { integrityCheck: "layout-consistency" });
					yield this.#sliceEntry(architecture.name, offset, sliceSize, fileSize, [
						...architecture.limitations,
						...structural.status === "not-mach-o" ? ["Structural Mach-O facts were unavailable; slice range is based on lipo output."] : structural.status === "unsupported" ? [`Structural Mach-O facts were unsupported (${structural.reason}); slice range is based on lipo output.`] : [],
						...architecture.file_offset === null || architecture.size === null ? [architecture.fields.offset.kind === "uninterpretable" || architecture.fields.size.kind === "uninterpretable" ? "Slice range was derived from structural Mach-O facts because lipo's range declarations could not all be interpreted." : "Slice range was derived from structural Mach-O facts because lipo omitted it."] : [],
						...lipoCpuSourceLimitations(architecture)
					]);
				}
			}
			/** Inventory one slice range after checking it lies within the artifact. */
			#sliceEntry(name, offset, sliceSize, fileSize, limitations) {
				if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(sliceSize) || offset < 0 || sliceSize <= 0 || !Number.isSafeInteger(offset + sliceSize) || offset + sliceSize > fileSize) throw new ArtifactReaderFailure("integrity", `Mach-O slice range is outside the artifact: ${name}`, { integrityCheck: "layout-consistency" });
				const entry = {
					path: `slices/${name}`,
					kind: "slice",
					declaredSize: sliceSize,
					compressedSize: null,
					executable: true,
					encrypted: false,
					byteOffset: offset,
					declaredIntegrity: null,
					unpacked: false,
					limitations: [...limitations],
					adapterKey: `${String(offset)}:${String(sliceSize)}`
				};
				this.#entries.set(entry.adapterKey, copyArtifactEntry(entry));
				return entry;
			}
			open(entry, signal) {
				const operation = this.#open(entry, signal);
				this.#pendingOpens.add(operation);
				const release = () => this.#pendingOpens.delete(operation);
				void operation.then(release, release);
				return operation;
			}
			async #open(entry, signal) {
				if (signal?.aborted === true) return Promise.reject(new ArtifactReaderFailure("cancelled", "Mach-O slice read cancelled", { cause: signal.reason }));
				const produced = this.#entries.get(entry.adapterKey);
				assertProducedEntry(entry, produced, "Mach-O slice entry metadata does not match this reader's inventory");
				const offset = produced.byteOffset;
				const size = produced.declaredSize;
				if (offset === null || size === null || !Number.isSafeInteger(offset) || !Number.isSafeInteger(size) || offset < 0 || size <= 0) throw new ArtifactReaderFailure("integrity", "Invalid Mach-O slice byte range", { integrityCheck: "layout-consistency" });
				const source = await this.#ensureSource();
				await this.#source.readSelectedPath();
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "Universal Mach-O reader is closed");
				if (!Number.isSafeInteger(offset + size) || offset + size > source.initial.size) throw new ArtifactReaderFailure("integrity", `Mach-O slice range is outside the artifact: ${entry.path}`, { integrityCheck: "layout-consistency" });
				const sourceStream = readArtifactFileChunks(source.handle, {
					start: offset,
					end: offset + size - 1,
					...signal === undefined ? {} : { signal }
				});
				const verifySource = () => this.#source.readSelectedPath();
				let validatingSource = false;
				const completionFailure = () => {
					const coverage = sourceStream.readCoverage();
					if (coverage.kind !== "complete") return new ArtifactReaderFailure("integrity", `Mach-O slice read coverage is incomplete: ${entry.path}`, { integrityCheck: "read-coverage" });
					if (coverage.bytes !== BigInt(size)) return new ArtifactReaderFailure("integrity", `Mach-O slice size disagrees with lipo metadata: ${entry.path}`, { integrityCheck: "declared-size" });
					if (signal?.aborted) return new ArtifactReaderFailure("cancelled", "Mach-O slice read cancelled", { cause: signal.reason });
					return undefined;
				};
				const output = Readable.from((async function* () {
					try {
						for await (const raw of sourceStream) {
							const chunk = streamChunkToBuffer(raw);
							if (sourceStream.readCoverage().kind === "complete" && signal?.aborted) {
								const failure = completionFailure();
								if (failure !== undefined) throw failure;
							}
							yield chunk;
						}
					} catch (cause) {
						if (cause instanceof ArtifactReaderFailure) throw cause;
						throw new ArtifactReaderFailure("integrity", `Could not read Mach-O slice range: ${entry.path}`, {
							cause,
							integrityCheck: "read-coverage"
						});
					}
					validatingSource = true;
					const failure = completionFailure();
					if (failure !== undefined) throw failure;
					try {
						await verifySource();
						assertArtifactReadActive(signal);
					} finally {
						validatingSource = false;
					}
				})());
				output.on("error", () => undefined);
				const completion = Promise.all([sourceStream, output].map((stream) => new Promise((resolve) => stream.once("close", resolve))));
				this.#streams.set(output, {
					source: sourceStream,
					completion
				});
				void completion.then(() => this.#streams.delete(output));
				const onSourceError = (cause) => {
					const completedCancellation = cause instanceof ArtifactReaderFailure && cause.reason === "cancelled" && sourceStream.readCoverage().kind === "complete" && !validatingSource ? completionFailure() : undefined;
					output.destroy(completedCancellation ?? (cause instanceof ArtifactReaderFailure ? cause : new ArtifactReaderFailure("integrity", `Could not read Mach-O slice range: ${entry.path}`, {
						cause,
						integrityCheck: "read-coverage"
					})));
				};
				sourceStream.on("error", onSourceError);
				sourceStream.once("close", () => sourceStream.removeListener("error", onSourceError));
				const onAbort = () => {
					if (sourceStream.readCoverage().kind === "complete" && (sourceStream.errored === null || sourceStream.errored instanceof ArtifactReaderFailure && sourceStream.errored.reason === "cancelled") && !validatingSource && !output.destroyed) {
						const failure = completionFailure();
						if (failure !== undefined) output.destroy(failure);
					}
				};
				signal?.addEventListener("abort", onAbort, { once: true });
				output.once("close", () => {
					signal?.removeEventListener("abort", onAbort);
					if (!sourceStream.destroyed) sourceStream.destroy();
				});
				if (signal?.aborted) onAbort();
				return output;
			}
			provenance() {
				return this.#command === undefined ? [] : [structuredClone(this.#command)];
			}
			async close() {
				this.#closed = true;
				this.#closePromise ??= this.#releaseResources().catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			async #releaseResources() {
				for (const [output, { source }] of this.#streams) {
					output.destroy(new ArtifactReaderFailure("unavailable", "Universal Mach-O reader closed"));
					source.destroy();
				}
				const outcomes = await Promise.allSettled([
					Promise.allSettled(this.#pendingOpens),
					...Array.from(this.#enumerations, (enumeration) => enumeration.return()),
					...Array.from(this.#streams.values(), ({ completion }) => completion)
				]);
				this.#enumerations.clear();
				const failures = outcomes.flatMap((outcome) => outcome.status === "rejected" ? [outcome.reason] : []);
				let cleanup;
				try {
					const failures = await this.runner.retryCleanup?.() ?? [];
					if (failures.length > 0) cleanup = {
						reason: failures.map(({ reason, resources }) => `${resources.join(", ")}: ${reason}`).join("; "),
						resources: [...new Set(failures.flatMap(({ resources }) => resources))]
					};
				} catch (cause) {
					cleanup = ArtifactReaderFailure.cleanupObservation(cause, "native-command-process-cleanup");
				}
				for (const cause of failures) cleanup = {
					reason: [cleanup?.reason, ArtifactReaderFailure.cleanupObservation(cause, this.path).reason].filter((reason) => reason !== undefined).join("; "),
					resources: [...new Set([...cleanup?.resources ?? [], this.path])]
				};
				try {
					await this.#source.close();
				} catch (cause) {
					if (cleanup === undefined) throw cause;
					throw ArtifactReaderFailure.withCleanup(cause, cleanup);
				}
				if (cleanup !== undefined) throw new ArtifactReaderFailure("unavailable", "Universal Mach-O reader cleanup remains incomplete", { cleanup });
			}
			#assertOpen(signal) {
				assertArtifactReadActive(signal);
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "Universal Mach-O reader is closed");
			}
			async #ensureSource() {
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "Universal Mach-O reader is closed");
				const source = await this.#source.read();
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "Universal Mach-O reader closed during source acquisition");
				return source;
			}
		};
		lipoCpuSourceLimitations = (architecture) => [...architecture.cpu_type !== null && architecture.cpu_type_code === null ? [`lipo CPU type is retained as unnormalized source text: ${architecture.cpu_type}`] : [], ...architecture.cpu_subtype !== null && architecture.cpu_subtype_code === null ? [`lipo CPU subtype is retained as unnormalized source text: ${architecture.cpu_subtype}${architecture.capabilities === null ? "" : `; capabilities ${architecture.capabilities}`}`] : []];
		lipoRowEvidence = (architecture) => [...architecture.limitations, ...lipoCpuSourceLimitations(architecture)];
		structuralSliceName = (slice) => ((slice.fat_cpu_type ?? slice.cpu_type) === 12 ? machoKnownArm32Subtype(slice.fat_cpu_subtype ?? slice.cpu_subtype) : undefined) ?? slice.architecture;
		uniqueSliceName = (name, offset, used) => {
			const unique = used.has(name) ? `${name}@${String(offset)}` : name;
			used.add(unique);
			return unique;
		};
		readStructuralSlices = async (file, size, signal) => {
			const readAt = (offset, length) => readFileHandleRange(file, offset, length, () => assertArtifactReadActive(signal));
			return readMachoImage(readAt, size);
		};
		lipoMatchesSlice = (reported, observed, structurallyUnique) => {
			const observedCpuType = observed.fat_cpu_type ?? observed.cpu_type;
			const observedCpuSubtype = observed.fat_cpu_subtype ?? observed.cpu_subtype;
			const hasPhysicalIdentity = reported.file_offset !== null || reported.size !== null || reported.cpu_type_code !== null || reported.cpu_subtype_code !== null;
			return (hasPhysicalIdentity || structurallyUnique) && (reported.numericName !== undefined || lipoNameMatches(reported.name, observed)) && (reported.file_offset === null || reported.file_offset === observed.slice_offset) && (reported.size === null || reported.size === observed.slice_size) && lipoDescribesCpu(reported, observedCpuType, observedCpuSubtype) && (reported.alignment === null || observed.fat_alignment_exponent === null || reported.alignment === 2 ** observed.fat_alignment_exponent);
		};
		lipoNameMatches = (reported, observed) => {
			if (reported === observed.architecture) return true;
			if (observed.cpu_type === 12 && observed.architecture === "arm") {
				const subtype = machoKnownArm32Subtype(observed.fat_cpu_subtype ?? observed.cpu_subtype);
				return (reported === "armv5" ? "armv5tej" : reported) === subtype;
			}
			if (reported === machoArchitectureFamily(observed.architecture)) return true;
			return machoArchitectureFamily(observed.architecture) === "arm64e" && /^arm64e\.[A-Za-z0-9_]+$/u.test(reported);
		};
	})))();
}

//#endregion
//#region dist/artifacts/NativeDmgOwnership.js
var systemEntitySchema, attachOutputSchema, infoOutputSchema, parseNativeDmgInfo, parseNativeDmgAttachOutput, resolveNativeDmgOwnership, ownershipFromAttachOutput, topLevelDevices, isBelowRoot;
function init_NativeDmgOwnership() {
	return (init_NativeDmgOwnership = __esmMin((() => {
		systemEntitySchema = z.object({
			"dev-entry": z.string().startsWith("/dev/"),
			"mount-point": z.string().optional()
		});
		attachOutputSchema = z.object({ "system-entities": z.array(systemEntitySchema) });
		infoOutputSchema = z.object({ images: z.array(z.object({
			"image-path": z.string().optional(),
			"system-entities": z.array(systemEntitySchema)
		})) });
		parseNativeDmgInfo = (stdout) => infoOutputSchema.parse(parse(stdout));
		parseNativeDmgAttachOutput = (stdout) => attachOutputSchema.parse(parse(stdout));
		resolveNativeDmgOwnership = (input) => {
			const rootedImages = input.info.images.filter((image) => image["system-entities"].some(({ "mount-point": mountPoint }) => mountPoint !== undefined && isBelowRoot(input.mountRoot, mountPoint)));
			if (rootedImages.length > 1) return {
				status: "unknown",
				reason: "multiple hdiutil image groups report mounts beneath the owned root"
			};
			const rootedImage = rootedImages[0];
			if (rootedImage !== undefined) {
				const hasOutsideMount = rootedImage["system-entities"].some(({ "mount-point": mountPoint }) => mountPoint !== undefined && !isBelowRoot(input.mountRoot, mountPoint));
				const groupDevices = rootedImage["system-entities"].map(({ "dev-entry": device }) => device);
				const devices = topLevelDevices(groupDevices);
				const overlapsBaseline = groupDevices.some((device) => input.baselineDevices.has(device));
				if (hasOutsideMount || overlapsBaseline || devices.length === 0) return {
					status: "unknown",
					reason: hasOutsideMount ? "the image group contains a mount outside the owned root" : overlapsBaseline ? "the image group includes a device present before attachment" : "the owned mount group contains no detachable device"
				};
				return {
					status: "owned",
					devices,
					source: "info"
				};
			}
			if (input.attachOutputReturned) {
				const attachOwnership = ownershipFromAttachOutput(input.attachOutput, input.mountRoot, input.baselineDevices);
				if (attachOwnership.status === "owned") {
					return attachOwnership;
				}
				if (attachOwnership.status === "unknown") return attachOwnership;
			}
			const newlyListedDevice = input.info.images.some((image) => image["system-entities"].some(({ "dev-entry": device }) => !input.baselineDevices.has(device)));
			if (newlyListedDevice) return {
				status: "unknown",
				reason: "hdiutil lists devices absent from the pre-attach baseline, but none is tied uniquely to the owned root; ownership is unknown"
			};
			return { status: "none" };
		};
		ownershipFromAttachOutput = (output, mountRoot, baselineDevices) => {
			if (output === undefined) return {
				status: "unknown",
				reason: "hdiutil attach succeeded but its ownership facts were malformed"
			};
			const entities = output["system-entities"];
			const hasRootMount = entities.some(({ "mount-point": mountPoint }) => mountPoint !== undefined && isBelowRoot(mountRoot, mountPoint));
			const hasOutsideMount = entities.some(({ "mount-point": mountPoint }) => mountPoint !== undefined && !isBelowRoot(mountRoot, mountPoint));
			const devices = entities.map(({ "dev-entry": device }) => device);
			const uniqueDevices = topLevelDevices(devices);
			const overlapsBaseline = devices.some((device) => baselineDevices.has(device));
			if (hasRootMount) {
				if (hasOutsideMount || overlapsBaseline || uniqueDevices.length === 0) return {
					status: "unknown",
					reason: hasOutsideMount ? "the attach result includes a mount outside the owned root" : overlapsBaseline ? "the attach result includes a device present before attachment" : "the attach result's owned mount has no detachable device"
				};
				return {
					status: "owned",
					devices: uniqueDevices,
					source: "attach"
				};
			}
			if (devices.length === 0) return {
				status: "unknown",
				reason: "hdiutil attach succeeded without reporting device ownership facts"
			};
			if (devices.some((device) => !baselineDevices.has(device))) return {
				status: "unknown",
				reason: "the attach result reports new devices without a mount beneath the owned root"
			};
			return { status: "none" };
		};
		topLevelDevices = (devices) => {
			const unique = [...new Set(devices)];
			return unique.filter((device) => !unique.some((parent) => /^\/dev\/disk\d+$/u.test(parent) && device.startsWith(`${parent}s`) && /^\d+$/u.test(device.slice(parent.length + 1))));
		};
		isBelowRoot = (root, path) => {
			const child = relative(root, resolve(path));
			return child !== "" && child !== "." && child !== ".." && !child.startsWith(`..${sep}`);
		};
	})))();
}

//#endregion
//#region dist/artifacts/NativeDmgArtifactReader.js
var HDIUTIL, HDIUTIL_COMMAND_TIMEOUT_MS, HDIUTIL_TERMINATION, HDIUTIL_OUTPUT_BYTES, DMG_EXISTING_ATTACHMENT_RECOVERY, DMG_CHECKSUM_ABSENT_LIMITATION, VERIFY_TRANSIENT_DELAY_MS, VERIFY_UNKNOWN_SETTLE_DELAYS_MS, DETACH_SETTLE_DELAYS_MS, delay, NativeDmgCommandFailure, createSystemHost, NativeDmgArtifactReader, existingImagePathListed, commandFailureFacts, runChecked, describeCommandFailure, processExitCode, processOutput, classifyCommandFailure, classifyVerifyFailure, verifyFailureReason, verifyFailureDiagnostic, INVALID_CHECKSUM_LINE, NO_CHECKSUM_LINE, UNRECOGNIZED_IMAGE_LINE, untranslatedVerifyFailure, outputLines, command;
function init_NativeDmgArtifactReader() {
	return (init_NativeDmgArtifactReader = __esmMin((() => {
		init_HostPlatform();
		init_OwnedRegularFile();
		init_resources();
		init_ArtifactTraversalObservation();
		init_RegularFile();
		init_OwnedFileHandle();
		init_OwnedCommand();
		init_launchFailure();
		init_capturedProviderOutput();
		init_OwnedCommandCleanup();
		init_NativeDmgOwnership();
		init_internalInvariant();
		init_errorMessage();
		HDIUTIL = "/usr/bin/hdiutil";
		HDIUTIL_COMMAND_TIMEOUT_MS = 12e4;
		HDIUTIL_TERMINATION = {
			signal: "SIGTERM",
			graceMs: 5e3
		};
		HDIUTIL_OUTPUT_BYTES = 16 * 1024 * 1024;
		DMG_EXISTING_ATTACHMENT_RECOVERY = "hdiutil refused a private read-only DMG attachment after listing an existing attachment of this image path. If it is still attached, ask its owner to release it when safe, then retry. REA does not borrow or detach existing attachments.";
		DMG_CHECKSUM_ABSENT_LIMITATION = "hdiutil verify found no stored checksum in this disk image, so its integrity was not verified; the root SHA-256 identifies the inventoried bytes.";
		VERIFY_TRANSIENT_DELAY_MS = 250;
		VERIFY_UNKNOWN_SETTLE_DELAYS_MS = [250, 500];
		DETACH_SETTLE_DELAYS_MS = [
			250,
			500,
			1e3
		];
		delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
		NativeDmgCommandFailure = class extends ArtifactReaderFailure {
			stdout;
			processNotStarted;
			verifyDiagnostic;
			unrecognizedImage;
			checksumAbsent;
			exitCode;
			constructor(failure, message, stdout, options) {
				super(failure.reason, message, {
					...options?.cause === undefined ? {} : { cause: options.cause },
					...options?.cancellation === undefined ? {} : { cancellation: options.cancellation },
					integrityCheck: failure.reason === "integrity" ? "image-checksum" : undefined
				});
				this.stdout = stdout;
				this.processNotStarted = options?.processNotStarted ?? false;
				this.verifyDiagnostic = failure.verifyDiagnostic;
				this.unrecognizedImage = failure.unrecognizedImage ?? false;
				this.checksumAbsent = failure.checksumAbsent ?? false;
				this.exitCode = options?.exitCode ?? null;
			}
		};
		createSystemHost = (environment) => {
			const processes = new ArtifactResourceScope();
			const retained = {
				retain: (owner, resource) => {
					processes.retain({
						kind: "lease",
						resource,
						lease: { release: () => owner.close() }
					});
				},
				run: (work) => work()
			};
			const runOwned = async (arguments_, signal, options) => {
				try {
					await prepareOwnedCommand(signal);
					const snapshot = await runOwnedCommand({
						command: HDIUTIL,
						arguments: [...arguments_],
						runId: `rea-hdiutil-${randomUUID()}`,
						hostEnvironment: environment
					}, {
						timeoutMs: options?.timeoutMs ?? null,
						diagnosticBytes: {
							stdout: HDIUTIL_OUTPUT_BYTES,
							stderr: HDIUTIL_OUTPUT_BYTES
						},
						acceptNonZeroExit: true,
						termination: HDIUTIL_TERMINATION
					}, { signal });
					if (typeof snapshot.exitCode !== "number") throw invariantViolation("hdiutil completed without an exit status");
					const { stdout, stderr } = capturedProviderOutput(snapshot);
					return {
						stdout,
						stderr,
						exitCode: snapshot.exitCode
					};
				} catch (cause) {
					retainOwnedCommandCleanup(cause, retained, "artifact", `hdiutil ${arguments_[0] ?? "operation"}`);
					throw cause;
				}
			};
			return {
				delay,
				run: (arguments_, signal, options) => processes.run(() => runOwned(arguments_, signal, options)),
				close: () => processes.retryCleanup()
			};
		};
		NativeDmgArtifactReader = class {
			path;
			format = "file";
			host;
			#provenance = [];
			#initialization;
			#directory;
			#devices = [];
			#inventoryConfirmedDevices = new Set();
			#mountRoot;
			#baselineDevices = new Set();
			#attachOutput;
			#attachOutputReturned = false;
			#attachMayHaveMounted = false;
			#ownershipUncertainty;
			#closed = false;
			#closePromise;
			#activeDirectoryOperations = new Set();
			#verificationProbeHandle;
			#checksumAbsent = false;
			constructor(path, environment, host) {
				this.path = path;
				if (HOST_PLATFORM.platform !== "darwin" && host === undefined) throw new ArtifactReaderFailure("unavailable", "Native DMG traversal is available only on macOS");
				this.host = host ?? createSystemHost(environment);
			}
			async *entries(signal, options) {
				await this.#ensureAttached(signal);
				const directory = this.#directory;
				if (directory === undefined) throw new ArtifactReaderFailure("unavailable", "DMG is not attached");
				if (this.#checksumAbsent) options?.onCoverage?.({
					status: "complete",
					limitations: [DMG_CHECKSUM_ABSENT_LIMITATION]
				});
				const prefix = basename(this.path);
				const entries = declaredArtifactEntries(directory, signal, {
					onCoverage: (coverage) => options?.onCoverage?.(coverage),
					onOmission: (omission) => options?.onOmission?.({
						...omission,
						path: `${prefix}/${omission.path}`
					})
				})[Symbol.asyncIterator]();
				try {
					for (;;) {
						if (this.#closed) throw new ArtifactReaderFailure("unavailable", "DMG reader is closed");
						const next = await this.#trackDirectoryOperation(() => entries.next());
						if (this.#closed) throw new ArtifactReaderFailure("unavailable", "DMG reader is closed");
						if (next.done) return;
						yield {
							...next.value,
							path: `${prefix}/${next.value.path}`
						};
					}
				} finally {
					await entries.return?.();
				}
			}
			async open(entry, signal) {
				await this.#ensureAttached(signal);
				const directory = this.#directory;
				if (directory === undefined) throw new ArtifactReaderFailure("unavailable", "DMG is not attached");
				return this.#trackDirectoryOperation(() => directory.open(entry, signal));
			}
			provenance() {
				return structuredClone(this.#provenance);
			}
			close() {
				this.#closed = true;
				this.#closePromise ??= this.#closeOwnedResources().catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			async #closeOwnedResources() {
				await this.#initialization?.catch(() => undefined);
				await Promise.allSettled(this.#activeDirectoryOperations);
				await this.#closeVerificationProbeHandle();
				await this.#closeMountedDirectory();
				const retained = await this.#releaseRetainedCommands();
				if (retained !== undefined) throw ArtifactReaderFailure.withCleanup(retained.cause, retained.cleanup);
				let detachFailure = await this.#detachOwnedDevices();
				if (this.#devices.length === 0 && this.#mountRoot !== undefined && !this.#attachMayHaveMounted) await rm(this.#mountRoot, {
					recursive: true,
					force: true
				}).then(() => {
					this.#mountRoot = undefined;
					this.#directory = undefined;
				}, (cause) => {
					detachFailure ??= cause;
				});
				if (this.#attachMayHaveMounted) {
					detachFailure ??= new Error(this.#ownershipUncertainty ?? "hdiutil attachment ownership remains unknown");
				}
				const retainedDuringClose = await this.#releaseRetainedCommands();
				if (detachFailure === undefined && retainedDuringClose !== undefined) throw ArtifactReaderFailure.withCleanup(retainedDuringClose.cause, retainedDuringClose.cleanup);
				if (detachFailure !== undefined) throw new ArtifactReaderFailure("unavailable", `DMG detach or mount-root cleanup failed for ${JSON.stringify(this.path)}: ${errorMessage(detachFailure)}`, {
					cause: detachFailure,
					cleanup: {
						reason: errorMessage(detachFailure),
						resources: [
							...this.#devices.map((device) => `DMG device ${device}`),
							...this.#attachMayHaveMounted ? [`DMG attachment ownership unknown at mount root ${this.#mountRoot ?? this.path}`] : [],
							...this.#mountRoot === undefined ? [] : [`DMG mount root ${this.#mountRoot}`],
							...retainedDuringClose?.cleanup.resources ?? []
						]
					}
				});
			}
			/** Retry hdiutil processes whose cleanup failed; report any that remain. */
			async #releaseRetainedCommands() {
				try {
					await this.host.close?.();
					return undefined;
				} catch (cause) {
					return {
						cause,
						cleanup: ArtifactReaderFailure.cleanupObservation(cause, "hdiutil process")
					};
				}
			}
			async #closeVerificationProbeHandle() {
				const owner = this.#verificationProbeHandle;
				if (owner === undefined) return;
				try {
					await owner.close();
					this.#verificationProbeHandle = undefined;
				} catch (cause) {
					throw ArtifactReaderFailure.withCleanup(cause, ArtifactReaderFailure.cleanupObservation(cause, `DMG verification target descriptor ${this.path}`));
				}
			}
			async #detachOwnedDevices() {
				let detachFailure = await this.#reconcileAttachState();
				let remainingDevices = [];
				for (const device of [...this.#devices].reverse()) {
					const failure = await this.#detach(device);
					if (failure !== undefined) {
						remainingDevices.push(device);
						detachFailure ??= failure;
					}
				}
				for (const delayMs of DETACH_SETTLE_DELAYS_MS) {
					if (remainingDevices.length === 0) break;
					await (this.host.delay ?? delay)(delayMs);
					const stillAttached = [];
					for (const device of remainingDevices) {
						if (!await this.#isAttached(device)) continue;
						const failure = await this.#detach(device);
						if (failure !== undefined) {
							stillAttached.push(device);
							detachFailure = failure;
						}
					}
					remainingDevices = stillAttached;
				}
				if (remainingDevices.length === 0) detachFailure = undefined;
				this.#devices = remainingDevices.reverse();
				return detachFailure;
			}
			async #closeMountedDirectory() {
				if (this.#directory !== undefined) {
					try {
						await this.#directory.close();
						this.#directory = undefined;
					} catch (cause) {
						const mountRoot = this.#mountRoot ?? this.path;
						throw ArtifactReaderFailure.withCleanup(cause, {
							reason: `DMG mounted directory remains owned: ${errorMessage(cause)}`,
							resources: [
								`DMG mounted directory at ${mountRoot}`,
								`DMG mount root ${mountRoot}`,
								...this.#devices.map((device) => `DMG device ${device}`)
							]
						});
					}
				}
			}
			/** Detach one device; return the failure only while it remains attached. */
			async #detach(device) {
				try {
					await runChecked(this.host, ["detach", device], undefined, { timeoutMs: HDIUTIL_COMMAND_TIMEOUT_MS });
					this.#provenance.push(command(["detach", device], ["mount"]));
					return undefined;
				} catch (cause) {
					return await this.#isAttached(device) ? cause : undefined;
				}
			}
			async #reconcileAttachState() {
				if (!this.#attachMayHaveMounted) return undefined;
				try {
					await this.#resolveAttachOwnership();
					return undefined;
				} catch (cause) {
					this.#ownershipUncertainty = errorMessage(cause);
					return cause;
				}
			}
			/** Treat unknown hdiutil state as attached during cleanup. */
			async #isAttached(device) {
				try {
					const parsed = await this.#readInfo();
					const isListed = parsed.images.some((image) => image["system-entities"].some((entity) => entity["dev-entry"] === device));
					if (isListed) {
						this.#inventoryConfirmedDevices.add(device);
						return true;
					}
					return !this.#inventoryConfirmedDevices.has(device);
				} catch {
					return true;
				}
			}
			async #ensureAttached(signal) {
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "DMG reader is closed");
				this.#initialization ??= this.#attach(signal);
				await this.#initialization;
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "DMG reader is closed");
			}
			async #trackDirectoryOperation(operation) {
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "DMG reader is closed");
				const running = Promise.resolve().then(operation);
				this.#activeDirectoryOperations.add(running);
				try {
					return await running;
				} finally {
					this.#activeDirectoryOperations.delete(running);
				}
			}
			async #attach(signal) {
				await this.#verify(signal);
				const baseline = await this.#readInfo();
				this.#baselineDevices = new Set(baseline.images.flatMap((image) => image["system-entities"].map(({ "dev-entry": device }) => device)));
				const mountRoot = await realpath(await mkdtemp(join(tmpdir(), "rea-dmg-")));
				this.#mountRoot = mountRoot;
				const arguments_ = [
					"attach",
					"-readonly",
					"-nobrowse",
					"-plist",
					"-mountroot",
					mountRoot,
					this.path
				];
				try {
					this.#attachMayHaveMounted = true;
					const attached = await runChecked(this.host, arguments_, signal, { timeoutMs: HDIUTIL_COMMAND_TIMEOUT_MS });
					this.#provenance.push(command(arguments_, ["read", "mount"]));
					this.#attachOutputReturned = true;
					let parsed;
					try {
						parsed = parseNativeDmgAttachOutput(attached.stdout);
					} catch (cause) {
						throw new ArtifactReaderFailure("format", "hdiutil returned a malformed attachment plist", { cause });
					}
					if (parsed["system-entities"].length === 0) throw new ArtifactReaderFailure("format", "hdiutil returned no attached devices");
					this.#attachOutput = parsed;
					const ownership = await this.#resolveAttachOwnership();
					if (ownership !== "owned") throw new ArtifactReaderFailure(ownership === "unknown" ? "unavailable" : "path", ownership === "unknown" ? `DMG attachment ownership is uncertain: ${this.#ownershipUncertainty ?? "no unique mount under the owned root"}` : "hdiutil did not mount a new image beneath the owned root");
					this.#directory = new DirectoryArtifactReader(mountRoot);
				} catch (cause) {
					if (cause instanceof NativeDmgCommandFailure) this.#provenance.push(command(arguments_, ["read", "mount"], cause.exitCode));
					if (cause instanceof NativeDmgCommandFailure && cause.stdout !== "") {
						try {
							this.#attachOutput = parseNativeDmgAttachOutput(cause.stdout);
							this.#attachOutputReturned = true;
						} catch {}
					}
					if (cause instanceof NativeDmgCommandFailure && cause.processNotStarted) {
						this.#attachMayHaveMounted = false;
						this.#ownershipUncertainty = undefined;
					}
					if (cause instanceof NativeDmgCommandFailure && cause.reason === "unavailable" && cause.exitCode !== null && await existingImagePathListed(this.path, baseline)) throw new ArtifactReaderFailure("unavailable", cause.message, {
						cause,
						userMessage: DMG_EXISTING_ATTACHMENT_RECOVERY
					});
					throw cause;
				}
			}
			async #verify(signal) {
				const arguments_ = ["verify", this.path];
				const deadline = performance.now() + HDIUTIL_COMMAND_TIMEOUT_MS;
				for (let attempt = 0;; attempt += 1) {
					this.#throwIfVerificationCancelled(signal);
					try {
						await runChecked(this.host, arguments_, signal, { timeoutMs: Math.max(1, Math.ceil(deadline - performance.now())) });
						this.#provenance.push(command(arguments_, ["read"]));
						return;
					} catch (cause) {
						if (!(cause instanceof NativeDmgCommandFailure)) throw cause;
						this.#provenance.push(command(arguments_, ["read"], cause.exitCode));
						if (cause.checksumAbsent) {
							this.#checksumAbsent = true;
							return;
						}
						if (cause.unrecognizedImage) {
							const unreadable = await this.#isUnreadableTarget(signal, cause);
							this.#throwIfVerificationCancelled(signal);
							if (unreadable) throw new NativeDmgCommandFailure({ reason: "io" }, cause.message, cause.stdout, {
								cause: cause.cause,
								...cause.exitCode === null ? {} : { exitCode: cause.exitCode }
							});
						}
						const delayMs = cause.verifyDiagnostic === "Resource temporarily unavailable" ? VERIFY_TRANSIENT_DELAY_MS : VERIFY_UNKNOWN_SETTLE_DELAYS_MS[attempt];
						if (cause.verifyDiagnostic !== "Resource temporarily unavailable" && !cause.unrecognizedImage || delayMs === undefined || deadline - performance.now() <= delayMs) throw cause;
						await (this.host.delay ?? delay)(delayMs);
						if (performance.now() >= deadline) throw cause;
					}
				}
			}
			async #readInfo() {
				const info = await runChecked(this.host, ["info", "-plist"], undefined, { timeoutMs: HDIUTIL_COMMAND_TIMEOUT_MS });
				try {
					return parseNativeDmgInfo(info.stdout);
				} catch (cause) {
					throw new ArtifactReaderFailure("format", "hdiutil info -plist returned malformed image inventory", { cause });
				}
			}
			async #resolveAttachOwnership() {
				const mountRoot = this.#mountRoot;
				if (mountRoot === undefined) throw invariantViolation("DMG mount root is unavailable for ownership discovery");
				const ownership = resolveNativeDmgOwnership({
					info: await this.#readInfo(),
					...this.#attachOutput === undefined ? {} : { attachOutput: this.#attachOutput },
					attachOutputReturned: this.#attachOutputReturned,
					mountRoot,
					baselineDevices: this.#baselineDevices
				});
				if (ownership.status === "owned") {
					this.#devices = [...ownership.devices];
					if (ownership.source === "info") for (const device of ownership.devices) this.#inventoryConfirmedDevices.add(device);
					this.#attachMayHaveMounted = false;
					this.#ownershipUncertainty = undefined;
					return "owned";
				}
				if (ownership.status === "unknown") {
					this.#ownershipUncertainty = ownership.reason;
					return "unknown";
				}
				this.#attachMayHaveMounted = false;
				this.#ownershipUncertainty = undefined;
				this.#devices = [];
				return "none";
			}
			#cancelledVerification(cause) {
				return new NativeDmgCommandFailure({ reason: "cancelled" }, "DMG operation cancelled", "", { cause });
			}
			#throwIfVerificationCancelled(signal) {
				if (signal?.aborted === true) throw this.#cancelledVerification(signal.reason);
			}
			async #isUnreadableTarget(signal, primaryFailure) {
				let handle;
				try {
					({handle} = await openRegularFile(this.path, {
						symlinks: "follow",
						...signal === undefined ? {} : { signal }
					}));
				} catch (cause) {
					if (cause instanceof RegularFileAdmissionFailure) {
						this.#verificationProbeHandle = cause.owner;
						const cancellation = regularFileCancellation(cause.cause);
						const failure = cancellation === undefined ? primaryFailure : this.#cancelledVerification(cancellation.reason);
						throw ArtifactReaderFailure.withCleanup(failure, ArtifactReaderFailure.cleanupObservation(cause.cleanupCause, `DMG verification target descriptor ${this.path}`));
					}
					const cancellation = regularFileCancellation(cause);
					if (cancellation !== undefined) throw this.#cancelledVerification(cancellation.reason);
					if (cause instanceof NonRegularFileReadError) return false;
					return classifyCommandFailure(cause, undefined).reason === "io";
				}
				const owner = new OwnedFileHandle(handle);
				this.#verificationProbeHandle = owner;
				try {
					await owner.close();
					this.#verificationProbeHandle = undefined;
				} catch (cause) {
					throw ArtifactReaderFailure.withCleanup(signal?.aborted === true ? this.#cancelledVerification(signal.reason) : primaryFailure, ArtifactReaderFailure.cleanupObservation(cause, `DMG verification target descriptor ${this.path}`));
				}
				if (signal?.aborted === true) throw this.#cancelledVerification(signal.reason);
				return false;
			}
		};
		existingImagePathListed = async (path, info) => {
			let target;
			try {
				target = await realpath(path);
			} catch {
				return false;
			}
			for (const image of info.images) {
				if (image["image-path"] === undefined || image["system-entities"].length === 0) continue;
				try {
					if (await realpath(image["image-path"]) === target) return true;
				} catch {}
			}
			return false;
		};
		commandFailureFacts = (cause) => {
			if (!(cause instanceof OwnedCommandFailure)) return cause;
			const output = cause.snapshot === null ? undefined : capturedProviderOutput(cause.snapshot);
			const exitCode = cause.reason === "process" && output !== undefined && !output.truncated && typeof output.exit_code === "number" ? output.exit_code : undefined;
			return {
				...exitCode === undefined ? {} : { exitCode },
				code: cause.reason === "timeout" ? "ETIMEDOUT" : cause.reason === "output-limit" ? "ENOBUFS" : undefined,
				...output?.signal == null ? {} : { signal: output.signal },
				...output === undefined ? {} : {
					stdout: output.stdout,
					stderr: output.stderr
				},
				message: cause.message
			};
		};
		runChecked = async (host, arguments_, signal, options) => {
			let result;
			try {
				result = await host.run(arguments_, signal, options);
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure) throw cause;
				const stdout = cause instanceof OwnedCommandFailure && cause.snapshot !== null ? capturedProviderOutput(cause.snapshot).stdout : "";
				if (cause instanceof OwnedCommandFailure && cause.reason === "cancelled" && cause.cancellation !== undefined) throw new NativeDmgCommandFailure({ reason: "cancelled" }, "DMG operation cancelled", stdout, {
					cause,
					cancellation: cause.cancellation
				});
				const facts = commandFailureFacts(cause);
				const exitCode = processExitCode(facts);
				throw new NativeDmgCommandFailure(classifyCommandFailure(facts, arguments_[0]), `hdiutil ${arguments_[0] ?? "operation"} failed: ${describeCommandFailure(facts, arguments_)}`, stdout, {
					cause,
					processNotStarted: launcherFailureOf(cause) !== undefined,
					...exitCode === undefined ? {} : { exitCode }
				});
			}
			if (result.exitCode !== 0) {
				const failure = {
					command: "/usr/bin/hdiutil",
					exitCode: result.exitCode,
					...result.cause === undefined ? {} : { code: processExitCode(result.cause) },
					stdout: result.stdout,
					...result.stderr === undefined ? {} : { stderr: result.stderr }
				};
				const classification = classifyCommandFailure(failure, arguments_[0]);
				const details = describeCommandFailure(failure, arguments_);
				const unknownVerifyFailure = arguments_[0] === "verify" && classification.reason === "unavailable";
				throw new NativeDmgCommandFailure(classification, unknownVerifyFailure ? `hdiutil verify failed; captured diagnostics do not establish the failure cause: ${details}` : `hdiutil ${arguments_[0] ?? "operation"} failed: ${details}`, result.stdout, {
					cause: result.cause ?? failure,
					exitCode: result.exitCode
				});
			}
			return {
				stdout: result.stdout,
				exitCode: 0
			};
		};
		describeCommandFailure = (cause, arguments_) => {
			const fields = {
				command: "/usr/bin/hdiutil",
				arguments: [...arguments_]
			};
			if (typeof cause === "object" && cause !== null) {
				for (const key of [
					"code",
					"exitCode",
					"errno",
					"syscall",
					"signal",
					"stdout",
					"stderr"
				]) {
					const value = Reflect.get(cause, key);
					if (typeof value === "string" || typeof value === "number") fields[key] = value;
				}
				const code = Reflect.get(cause, "code");
				if (typeof code === "number") fields.exitCode = code;
			}
			if (cause instanceof Error) fields.message = cause.message;
			else if (typeof cause === "object" && cause !== null) {
				const message = Reflect.get(cause, "message");
				if (typeof message === "string") fields.message = message;
			}
			return JSON.stringify(fields);
		};
		processExitCode = (cause) => {
			if (typeof cause !== "object" || cause === null) return undefined;
			const exitCode = Reflect.get(cause, "exitCode");
			if (typeof exitCode === "number") return exitCode;
			const code = Reflect.get(cause, "code");
			return typeof code === "number" ? code : undefined;
		};
		processOutput = (cause, field) => {
			if (typeof cause !== "object" || cause === null) return "";
			const value = Reflect.get(cause, field);
			return typeof value === "string" ? value : "";
		};
		classifyCommandFailure = (cause, operation) => {
			if (typeof cause !== "object" || cause === null) return { reason: "unavailable" };
			const code = Reflect.get(cause, "code");
			const exitCode = Reflect.get(cause, "exitCode");
			if (typeof code === "number" || typeof exitCode === "number") {
				if (operation !== "verify") return { reason: "unavailable" };
				return classifyVerifyFailure(processOutput(cause, "stdout"), processOutput(cause, "stderr"));
			}
			if (code === "ENOENT") {
				const syscall = Reflect.get(cause, "syscall");
				return { reason: typeof syscall === "string" && syscall.startsWith("spawn") ? "unavailable" : "io" };
			}
			if (code === "EACCES" || code === "EPERM" || code === "EIO" || code === "ENOTDIR" || code === "EISDIR" || code === "ENODEV" || code === "EROFS" || code === "EMFILE" || code === "ENFILE") return { reason: "io" };
			return { reason: "unavailable" };
		};
		classifyVerifyFailure = (stdout, stderr) => {
			const diagnostic = verifyFailureDiagnostic(stdout, stderr);
			const reason = verifyFailureReason(diagnostic);
			const untranslated = reason === undefined ? untranslatedVerifyFailure(stdout, stderr) : undefined;
			return {
				...untranslated,
				reason: reason ?? untranslated?.reason ?? "unavailable",
				...diagnostic === undefined ? {} : { verifyDiagnostic: diagnostic }
			};
		};
		verifyFailureReason = (diagnostic) => {
			switch (diagnostic) {
				case "image not recognized":
				case "image not recognised": return "format";
				case "invalid checksum":
				case "image data corrupted": return "integrity";
				case "No such file or directory":
				case "Permission denied":
				case "Input/output error": return "io";
				case "Resource temporarily unavailable": return "unavailable";
				default: return undefined;
			}
		};
		verifyFailureDiagnostic = (stdout, stderr) => {
			const prefix = "hdiutil: verify failed - ";
			return outputLines(stdout, stderr).find((line) => line.startsWith(prefix))?.slice(prefix.length);
		};
		INVALID_CHECKSUM_LINE = /^hdiutil: verify: checksum of ".*" is INVALID$/u;
		NO_CHECKSUM_LINE = /^hdiutil: verify: ".*" has no checksum\.$/u;
		UNRECOGNIZED_IMAGE_LINE = /^hdiutil: verify: unable to recognize ".*" as a disk image\./u;
		untranslatedVerifyFailure = (stdout, stderr) => {
			const lines = outputLines(stdout, stderr);
			if (lines.some((line) => INVALID_CHECKSUM_LINE.test(line))) return { reason: "integrity" };
			if (lines.some((line) => NO_CHECKSUM_LINE.test(line))) return {
				reason: "unavailable",
				checksumAbsent: true
			};
			if (lines.some((line) => UNRECOGNIZED_IMAGE_LINE.test(line))) return {
				reason: "unavailable",
				unrecognizedImage: true
			};
			return undefined;
		};
		outputLines = (stdout, stderr) => `${stdout}\n${stderr}`.split(/\r?\n/u).map((line) => line.trim());
		command = (arguments_, effects, exitCode = 0) => ({
			tool: "/usr/bin/hdiutil",
			arguments: [...arguments_],
			tool_version: null,
			executable_sha256: null,
			exit_code: exitCode,
			effects
		});
	})))();
}

//#endregion
//#region dist/artifacts/NodeSeaArtifactReader.js
function* seaMembers(decoded) {
	const registry = new ArtifactPathRegistry();
	const claimed = new Set();
	const reserve = (path) => {
		if (claimed.has(path)) throw new ArtifactReaderFailure("path", `Node SEA entry path collides: ${path}`);
		registry.add(path, "file");
		claimed.add(path);
		return path;
	};
	const mappedPath = (raw, fallback) => {
		try {
			const normalized = normalizeArtifactPath(raw);
			if (normalized !== "__node_sea__" && !normalized.startsWith("__node_sea__/")) return reserve(normalized);
		} catch (cause) {
			if (!(cause instanceof ArtifactReaderFailure) || cause.reason !== "path") throw cause;
		}
		return reserve(fallback);
	};
	if (decoded.mainScript !== null) yield {
		path: mappedPath(decoded.codePath, decoded.mainCodeFormat === "module" ? "__node_sea__/main.mjs" : "__node_sea__/main.cjs"),
		sourcePath: decoded.codePath,
		role: "main-script",
		range: decoded.mainScript
	};
	if (decoded.snapshot !== null) yield {
		path: reserve(SNAPSHOT_PATH),
		sourcePath: SNAPSHOT_PATH,
		role: "snapshot",
		range: decoded.snapshot
	};
	if (decoded.codeCache !== null) yield {
		path: reserve(CODE_CACHE_PATH),
		sourcePath: CODE_CACHE_PATH,
		role: "code-cache",
		range: decoded.codeCache
	};
	for (const [ordinal, asset] of decoded.assets.entries()) yield {
		path: mappedPath(asset.name, `${ASSET_FALLBACK_PREFIX}${String(ordinal)}`),
		sourcePath: asset.name,
		role: "asset",
		range: asset.range
	};
}
var SNAPSHOT_PATH, CODE_CACHE_PATH, ASSET_FALLBACK_PREFIX, NodeSeaArtifactReader, formatFailure$2;
function init_NodeSeaArtifactReader() {
	return (init_NodeSeaArtifactReader = __esmMin((() => {
		init_artifactReaderLimits();
		init_artifactExpansionBudget();
		init_resources();
		init_NodeSeaBlob();
		init_NodeSeaLocation();
		init_PositionalArtifactReader();
		SNAPSHOT_PATH = "__node_sea__/snapshot";
		CODE_CACHE_PATH = "__node_sea__/code-cache";
		ASSET_FALLBACK_PREFIX = "__node_sea__/assets/";
		NodeSeaArtifactReader = class extends PositionalArtifactReader {
			limits;
			expandedBytes;
			format = "node-sea";
			#header;
			#admission;
			constructor(path, admitted, limits = DEFAULT_NODE_SEA_READER_LIMITS, expandedBytes) {
				const admission = admitted !== undefined && "kind" in admitted ? admitted : undefined;
				super(path, "Node SEA", admitted !== undefined && "kind" in admitted ? admitted.source : admitted);
				this.limits = limits;
				this.expandedBytes = expandedBytes;
				this.#admission = admission;
			}
			formatMetadata() {
				if (this.#header === undefined) return undefined;
				return {
					...this.#header,
					exec_argv: [...this.#header.exec_argv]
				};
			}
			/** Also drop the admitted decode, which only a completed preparation releases. */
			async close() {
				await super.close();
				this.#admission = undefined;
			}
			/** Reuse only the decode admitted under this accepted policy. */
			async #readBlob(source, signal) {
				const admittedLimits = this.#admission?.limits;
				if (this.#admission !== undefined && admittedLimits !== undefined && Object.entries(this.limits).every(([field, value]) => Reflect.get(admittedLimits, field) === value)) return this.#admission;
				const location = await locateNodeSea(source.handle, source.initial.size, signal, this.limits);
				if (location === undefined) throw formatFailure$2("blob was not found");
				const decoded = await decodeNodeSeaBlob(await readNodeSeaBlob(source, location, signal, this.limits), signal, this.limits);
				return {
					location,
					decoded
				};
			}
			async prepareEntries(signal) {
				const { handle, initial } = await this.verifyCarrier(signal);
				const { location, decoded } = await this.#readBlob({
					handle,
					initial
				}, signal);
				const fuse = await scanNodeSeaFuse(handle, initial.size, signal);
				const entries = [];
				let declaredBytes = 0n;
				const expansionBudget = BigInt(this.expandedBytes ?? artifactExpansionBudgetBytes(location.blobLength));
				let index = 0;
				for (const member of seaMembers(decoded)) {
					if (index % 256 === 0) await setImmediate();
					this.assertOpen(signal);
					declaredBytes += BigInt(member.range.length);
					if (declaredBytes > expansionBudget) throw artifactReaderLimitFailure("artifact_limits.expanded_bytes", Number(expansionBudget), "bytes", declaredBytes, "memory");
					const start = location.blobOffset + member.range.offset;
					if (start > initial.size || member.range.length > initial.size - start) throw formatFailure$2(`member exceeds the carrier: ${member.path}`);
					const entry = {
						path: member.path,
						kind: "file",
						declaredSize: member.range.length,
						compressedSize: null,
						executable: false,
						encrypted: false,
						byteOffset: start,
						declaredIntegrity: null,
						unpacked: false,
						limitations: [],
						adapterKey: `node-sea:${String(index)}`,
						formatMetadata: {
							kind: "node-sea-entry",
							role: member.role,
							source_path: member.sourcePath,
							index
						},
						sourcePath: member.sourcePath
					};
					entries.push(entry);
					index += 1;
				}
				this.#header = {
					kind: "node-sea",
					magic: decoded.magic,
					flags: decoded.flags,
					disable_experimental_sea_warning: decoded.disableExperimentalSeaWarning,
					use_snapshot: decoded.useSnapshot,
					use_code_cache: decoded.useCodeCache,
					include_assets: decoded.includeAssets,
					include_exec_argv: decoded.includeExecArgv,
					exec_argv_extension: decoded.execArgvExtension,
					exec_argv: [...decoded.execArgv],
					...decoded.mainCodeFormat === undefined ? {} : { main_code_format: decoded.mainCodeFormat },
					code_path: decoded.codePath,
					carrier: location.carrier,
					blob_offset: location.blobOffset,
					blob_length: location.blobLength,
					fuse_state: fuse.fuseState,
					fuse_sentinel: fuse.fuseSentinel,
					fuse_contradiction: fuse.fuseContradiction
				};
				await this.verifyCarrier(signal);
				this.#admission = undefined;
				return {
					entries,
					coverage: {
						status: "complete",
						limitations: fuse.fuseContradiction === null ? [] : [fuse.fuseContradiction]
					}
				};
			}
		};
		formatFailure$2 = (detail) => new ArtifactReaderFailure("format", `Node SEA blob is malformed: ${detail}`);
	})))();
}

//#endregion
//#region dist/artifacts/pyinstaller/PyInstallerMetadata.js
var cookiePythonVersion, cookieMetadata, scriptPythonMagic, entryMetadata, cArchiveEntryMetadata, dependencyMetadata, pyzEntryEncrypted, pyzEntryMetadata;
function init_PyInstallerMetadata() {
	return (init_PyInstallerMetadata = __esmMin((() => {
		init_CArchiveLayout();
		cookiePythonVersion = (value) => value >= 100 ? {
			major: Math.floor(value / 100),
			minor: value % 100
		} : value >= 20 ? {
			major: Math.floor(value / 10),
			minor: value % 10
		} : undefined;
		cookieMetadata = (cookie, entries, encryptionMarker) => {
			const version = cookiePythonVersion(cookie.pythonVersion);
			return {
				kind: "pyinstaller",
				layout_version: cookie.layout,
				archive_start: cookie.archiveStart,
				archive_size: cookie.packageLength,
				cookie_offset: cookie.cookieOffset,
				toc_offset: cookie.tocOffset,
				toc_size: cookie.tocLength,
				entry_count: entries.length,
				runtime_option_count: entries.filter((entry) => entry.role === "runtime-option").length,
				external_dependency_count: entries.filter((entry) => entry.role === "dependency").length,
				python_version_raw: cookie.pythonVersion,
				python_major: version?.major ?? null,
				python_minor: version?.minor ?? null,
				python_library: cookie.pythonLibrary,
				encryption_marker_present: encryptionMarker
			};
		};
		scriptPythonMagic = (cookie, archives) => {
			const version = cookiePythonVersion(cookie.pythonVersion);
			if (version === undefined) return undefined;
			let selected;
			for (const archive of archives) {
				const magic = archive.pythonMagic;
				if (archive.pythonVersion !== `${String(version.major)}.${String(version.minor)}` || selected !== undefined && !selected.equals(magic)) return undefined;
				selected = magic;
			}
			return selected;
		};
		entryMetadata = (source, bytecode, header) => ({
			kind: "pyinstaller-entry",
			...source,
			bytecode_header: bytecode ? header === undefined ? "unknown" : "derived" : "not-bytecode",
			bytecode_magic: header?.subarray(0, 4).toString("hex") ?? null,
			pyz_status: "not-pyz",
			directory_record_offset: null,
			directory_record_size: null,
			pyz_sha256: null,
			pyz_python_magic: null,
			pyz_python_version: null,
			pyz_entry_count: null,
			encryption_source: null
		});
		cArchiveEntryMetadata = (entry, header, archive, encryptionMarker = false) => ({
			...entryMetadata({
				container: "carchive",
				container_name: null,
				index: entry.index,
				source_name: entry.name,
				type_code: entry.typeCode,
				relative_offset: entry.offset,
				compression_flag: entry.compressionFlag
			}, entry.role === "script" || isCArchivePythonModule(entry), header),
			...entry.role === "dependency" ? dependencyMetadata(entry.name) : {},
			pyz_status: archive?.kind === "entries" ? "decoded" : archive === undefined ? "not-pyz" : "opaque",
			directory_record_offset: entry.tocRecordOffset,
			directory_record_size: entry.tocRecordLength,
			pyz_sha256: archive?.sha256 ?? null,
			pyz_python_magic: archive?.pythonMagic.toString("hex") ?? null,
			pyz_python_version: archive?.pythonVersion ?? null,
			pyz_entry_count: archive?.kind === "entries" ? archive.entries.length : null,
			encryption_source: archive !== undefined && encryptionMarker ? "carchive-marker" : null
		});
		dependencyMetadata = (source) => {
			const colon = source.indexOf(":");
			const valid = colon > 0 && colon < source.length - 1;
			return {
				dependency_status: valid ? "unresolved" : "invalid-reference",
				dependency_archive: valid ? source.slice(0, colon) : null,
				dependency_member: valid ? source.slice(colon + 1) : null
			};
		};
		pyzEntryEncrypted = (entry, encryptionMarker) => encryptionMarker && entry.length > 0;
		pyzEntryMetadata = (container, entry, header, encryptionMarker) => ({
			...entryMetadata({
				container: "pyz",
				container_name: container.name,
				index: entry.index,
				source_name: entry.name,
				type_code: entry.typeCode,
				relative_offset: entry.offset,
				compression_flag: entry.compressionFlag
			}, entry.role === "module" || entry.role === "package", header),
			encryption_source: pyzEntryEncrypted(entry, encryptionMarker) ? "carchive-marker" : null
		});
	})))();
}

//#endregion
//#region dist/artifacts/ArtifactClassificationProbe.js
var ARTIFACT_CLASSIFICATION_PREFIX_BYTES, ARTIFACT_CLASSIFICATION_SUFFIX_BYTES, observeFatSliceHeaders, finishClassificationEvidence, createArtifactClassificationProbe;
function init_ArtifactClassificationProbe() {
	return (init_ArtifactClassificationProbe = __esmMin((() => {
		init_appleArchiveFormat();
		init_machoContainer();
		init_dosMz();
		init_binaryTarget();
		init_dfuse();
		init_resources();
		ARTIFACT_CLASSIFICATION_PREFIX_BYTES = 8192;
		ARTIFACT_CLASSIFICATION_SUFFIX_BYTES = 16;
		observeFatSliceHeaders = (input) => {
			const { table, observedHeaders, partialHeaders, streamOffset, bytes } = input;
			if (table?.state !== "parsed") return;
			for (const slice of table.slices) {
				if (observedHeaders.has(slice.offset) && !partialHeaders.has(slice.offset)) continue;
				const headerLength = Math.min(12, slice.size);
				const headerEnd = slice.offset + headerLength;
				if (!Number.isSafeInteger(headerEnd)) continue;
				const start = Math.max(slice.offset, streamOffset);
				const end = Math.min(headerEnd, streamOffset + bytes.length);
				if (start >= end) continue;
				let pending = partialHeaders.get(slice.offset);
				if (pending === undefined) {
					pending = {
						bytes: Buffer.alloc(12),
						count: 0
					};
					partialHeaders.set(slice.offset, pending);
				}
				Buffer.from(bytes.subarray(start - streamOffset, end - streamOffset)).copy(pending.bytes, start - slice.offset);
				pending.count += end - start;
				observedHeaders.set(slice.offset, readMachoHeaderPrefixFacts(pending.bytes.subarray(0, Math.min(pending.count, headerLength))));
				if (pending.count === headerLength) {
					partialHeaders.delete(slice.offset);
				}
			}
		};
		finishClassificationEvidence = (prefix, suffix, archiveBytes, finishAsar, sliceHeadersByOffset, mzWindowsHeaderSignature, mzWindowsHeaderRecord) => {
			const finalHeader = readFatContainerHeader(prefix, archiveBytes);
			if (finalHeader.state === "parsed") {
				for (let index = 0; index < finalHeader.slices.length; index += 1) {
					const slice = finalHeader.slices[index];
					if (slice === undefined || sliceHeadersByOffset.has(slice.offset)) continue;
					const available = Math.max(0, Math.min(slice.size, prefix.length - slice.offset));
					if (available === 0) continue;
					sliceHeadersByOffset.set(slice.offset, readMachoHeaderPrefixFacts(prefix.subarray(slice.offset, slice.offset + available)));
				}
			}
			const fatSliceHeaders = finalHeader.state === "parsed" ? {
				header: finalHeader,
				sliceHeadersByOffset
			} : undefined;
			return {
				prefix,
				...suffix === undefined ? {} : { suffix },
				asarHeader: finishAsar(archiveBytes),
				...fatSliceHeaders === undefined ? {} : { fatSliceHeaders },
				...mzWindowsHeaderSignature === undefined ? {} : { mzWindowsHeaderSignature },
				...mzWindowsHeaderRecord === undefined ? {} : { mzWindowsHeaderRecord }
			};
		};
		createArtifactClassificationProbe = (asarHeaderAdmission) => {
			const xml = createXmlPlistSignatureProbe();
			const asar = createAsarHeaderSignatureProbe(asarHeaderAdmission);
			const blocks = [];
			let retainedBytes = 0;
			let observedBytes = 0;
			let fatTable;
			const fatSliceHeadersByOffset = new Map();
			const partialFatHeaders = new Map();
			let mzWindowsHeaderSignature;
			let mzWindowsHeaderRecord;
			let mzWindowsHeaderOffset;
			let mzHeaderChecked = false;
			let suffix = Buffer.alloc(0);
			const observeSuffix = (bytes) => {
				const joined = bytes.length >= ARTIFACT_CLASSIFICATION_SUFFIX_BYTES ? bytes : Buffer.concat([suffix, bytes]);
				suffix = Buffer.from(joined.subarray(Math.max(0, joined.length - ARTIFACT_CLASSIFICATION_SUFFIX_BYTES)));
			};
			const observeSignatureWindow = (offset, sourceOffset, sourceBytes) => {
				if (!Number.isSafeInteger(offset) || offset < 0) return;
				const start = Math.max(offset, sourceOffset);
				const end = Math.min(offset + 4, sourceOffset + sourceBytes.length);
				if (start >= end) return;
				const window = Buffer.alloc(4);
				const previous = mzWindowsHeaderSignature?.offset === offset ? mzWindowsHeaderSignature.bytes : undefined;
				previous?.copy(window);
				let observedLength = previous?.length ?? 0;
				if (start < end && start <= offset + observedLength) {
					Buffer.from(sourceBytes.subarray(start - sourceOffset, end - sourceOffset)).copy(window, start - offset);
					observedLength = Math.max(observedLength, end - offset);
				}
				if (observedLength === 0) return;
				mzWindowsHeaderSignature = {
					offset,
					bytes: window.subarray(0, observedLength)
				};
			};
			const observeRecordWindow = (offset, sourceOffset, sourceBytes) => {
				if (!Number.isSafeInteger(offset) || offset < 0) return;
				const maximum = 24 + MAX_PE_OPTIONAL_HEADER_BYTES;
				const start = Math.max(offset, sourceOffset);
				const end = Math.min(offset + maximum, sourceOffset + sourceBytes.length);
				if (start >= end) return;
				const window = Buffer.alloc(maximum);
				const previous = mzWindowsHeaderRecord?.offset === offset ? mzWindowsHeaderRecord.bytes : undefined;
				previous?.copy(window);
				let observedLength = previous?.length ?? 0;
				if (start <= offset + observedLength) {
					Buffer.from(sourceBytes.subarray(start - sourceOffset, end - sourceOffset)).copy(window, start - offset);
					observedLength = Math.max(observedLength, end - offset);
				}
				if (observedLength === 0) return;
				mzWindowsHeaderRecord = {
					offset,
					bytes: window.subarray(0, observedLength)
				};
			};
			const retain = (bytes) => {
				let offset = 0;
				while (offset < bytes.length) {
					const blockOffset = retainedBytes % ARTIFACT_CLASSIFICATION_PREFIX_BYTES;
					if (blockOffset === 0) blocks.push(Buffer.allocUnsafe(ARTIFACT_CLASSIFICATION_PREFIX_BYTES));
					const count = Math.min(ARTIFACT_CLASSIFICATION_PREFIX_BYTES - blockOffset, bytes.length - offset);
					blocks[blocks.length - 1].set(bytes.subarray(offset, offset + count), blockOffset);
					retainedBytes += count;
					offset += count;
				}
			};
			const retainedPrefix = () => {
				const prefix = Buffer.allocUnsafe(retainedBytes);
				let copied = 0;
				for (const block of blocks) {
					const count = Math.min(block.length, retainedBytes - copied);
					prefix.set(block.subarray(0, count), copied);
					copied += count;
				}
				return prefix;
			};
			return {
				get length() {
					return observedBytes;
				},
				get limit() {
					if (observedBytes < 8192) return ARTIFACT_CLASSIFICATION_PREFIX_BYTES;
					return Math.max(ARTIFACT_CLASSIFICATION_PREFIX_BYTES, xml.state === "pending" ? MAX_XML_PLIST_PROBE_BYTES : 0, asar.observation.state === "pending" ? asar.limit : 0);
				},
				write(bytes) {
					const streamOffset = observedBytes;
					asar.write(bytes);
					let offset = 0;
					while (offset < bytes.length) {
						const limit = retainedBytes < 8192 ? ARTIFACT_CLASSIFICATION_PREFIX_BYTES : xml.state === "pending" ? MAX_XML_PLIST_PROBE_BYTES : retainedBytes;
						if (retainedBytes >= limit) break;
						const selected = bytes.subarray(offset, offset + Math.min(limit - retainedBytes, bytes.length - offset));
						retain(selected);
						xml.write(selected);
						offset += selected.length;
					}
					if ((fatTable === undefined || fatTable.state === "needs-data") && retainedBytes >= 8) fatTable = readFatContainerTable(retainedPrefix());
					observeFatSliceHeaders({
						table: fatTable,
						observedHeaders: fatSliceHeadersByOffset,
						partialHeaders: partialFatHeaders,
						streamOffset,
						bytes
					});
					if (!mzHeaderChecked && retainedBytes >= 64) {
						mzHeaderChecked = true;
						const prefix = retainedPrefix();
						if (prefix[0] === 77 && prefix[1] === 90) {
							const windowsHeader = observeMzWindowsHeader(prefix, Number.MAX_SAFE_INTEGER);
							if (windowsHeader.state === "signature-needed" || windowsHeader.state === "declared" && windowsHeader.signature === "PE") {
								mzWindowsHeaderOffset = windowsHeader.offset;
								if (windowsHeader.offset < prefix.length) {
									const inline = prefix.subarray(windowsHeader.offset, Math.min(windowsHeader.offset + 4, prefix.length));
									mzWindowsHeaderSignature = {
										offset: windowsHeader.offset,
										bytes: inline
									};
								}
							}
						}
					}
					if (mzWindowsHeaderOffset !== undefined) {
						observeSignatureWindow(mzWindowsHeaderOffset, streamOffset, bytes);
						observeRecordWindow(mzWindowsHeaderOffset, streamOffset, bytes);
					}
					observeSuffix(bytes);
					observedBytes += bytes.length;
				},
				finish(archiveBytes) {
					return finishClassificationEvidence(retainedPrefix(), observedBytes === archiveBytes ? suffix : undefined, archiveBytes, (bytes) => asar.finish(bytes), fatSliceHeadersByOffset, mzWindowsHeaderSignature, mzWindowsHeaderRecord);
				}
			};
		};
	})))();
}

//#endregion
//#region dist/artifacts/pyinstaller/PyInstallerMemberStream.js
var readPyInstallerMemberPrefix, pyInstallerMemberStream, asError;
function init_PyInstallerMemberStream() {
	return (init_PyInstallerMemberStream = __esmMin((() => {
		init_resources();
		readPyInstallerMemberPrefix = async (openSource, options, length) => {
			const stopped = new AbortController();
			const prefixComplete = new Error("PyInstaller member prefix observed");
			const signal = AbortSignal.any([options.signal, stopped.signal]);
			const source = await openSource(signal);
			const stream = pyInstallerMemberStream(source, {
				...options,
				header: undefined,
				signal
			});
			const prefix = Buffer.alloc(length);
			let copied = 0;
			stream.output.on("data", (chunk) => {
				copied += chunk.copy(prefix, copied, 0, length - copied);
				if (copied === length) stopped.abort(prefixComplete);
			});
			try {
				await stream.completion;
			} catch (cause) {
				if (!(cause instanceof ArtifactReaderFailure) || cause.reason !== "cancelled" || cause.cause !== prefixComplete) throw cause;
			}
			abortIfNeeded(options.signal);
			return prefix.subarray(0, copied);
		};
		pyInstallerMemberStream = (source, options) => {
			let bytes = 0;
			let headerSent = false;
			let completing = false;
			let failure;
			const prependHeader = () => {
				if (!headerSent && options.header !== undefined) output.push(options.header);
				headerSent = true;
			};
			const output = new Transform({
				transform(chunk, _encoding, callback) {
					try {
						abortIfNeeded(options.signal);
						bytes += chunk.length;
						if (bytes > options.maxBytes) throw new ArtifactReaderFailure("limit", "PyInstaller member exceeds its plaintext budget");
						options.charge?.(chunk.length);
						prependHeader();
						callback(null, chunk);
					} catch (cause) {
						callback(asError(cause));
					}
				},
				flush(callback) {
					completing = true;
					void (async () => {
						abortIfNeeded(options.signal);
						if (inflate !== undefined && inflate.bytesWritten !== options.sourceBytes) throw new ArtifactReaderFailure("integrity", "Compressed PyInstaller member did not consume its complete declared source span", { integrityCheck: "read-coverage" });
						if (options.expectedBytes !== undefined && bytes !== options.expectedBytes) throw new ArtifactReaderFailure("integrity", "PyInstaller member size disagrees with its declaration or previous observation", { integrityCheck: "declared-size" });
						await options.complete?.(bytes);
						abortIfNeeded(options.signal);
						prependHeader();
					})().then(() => {
						completing = false;
						try {
							abortIfNeeded(options.signal);
						} catch (cause) {
							callback(asError(cause));
							return;
						}
						callback();
					}, (cause) => {
						completing = false;
						callback(asError(cause));
					});
				}
			});
			output.on("error", () => undefined);
			const onAbort = () => {
				if (completing || output.destroyed) return;
				if (source.errored !== null || inflate !== undefined && inflate.errored !== null) return;
				if (!source.readableEnded && !source.destroyed) return;
				output.destroy(new ArtifactReaderFailure("cancelled", "PyInstaller member read cancelled", { cause: options.signal.reason }));
			};
			options.signal.addEventListener("abort", onAbort, { once: true });
			const retired = new Promise((resolve) => {
				output.once("close", () => {
					options.signal.removeEventListener("abort", onAbort);
					resolve();
				});
			});
			const onSourceFailure = (cause) => {
				failure ??= cause instanceof ArtifactReaderFailure ? cause : new ArtifactReaderFailure("io", "PyInstaller member source could not be read", { cause });
				output.destroy(failure);
			};
			source.on("error", onSourceFailure);
			const inflate = options.compressed ? createInflate() : undefined;
			inflate?.on("error", (cause) => {
				failure ??= cause instanceof ArtifactReaderFailure ? cause : new ArtifactReaderFailure("format", "Compressed PyInstaller member is not a complete zlib stream", { cause });
				output.destroy(failure);
			});
			const production = (inflate === undefined ? pipeline$1(source, output) : pipeline$1(source, inflate, output)).catch((cause) => {
				throw failure ?? cause;
			}).finally(() => {
				source.removeListener("error", onSourceFailure);
			});
			const completion = Promise.allSettled([production, retired]).then(([produced]) => {
				if (produced.status === "rejected") throw produced.reason;
				if (output.errored !== null) throw output.errored;
			});
			void completion.catch(() => undefined);
			if (options.signal.aborted) onAbort();
			return {
				output,
				completion
			};
		};
		asError = (cause) => cause instanceof Error ? cause : new ArtifactReaderFailure("format", "PyInstaller member read failed", { cause });
	})))();
}

//#endregion
//#region dist/artifacts/pyinstaller/PythonBytecode.js
var RECONSTRUCTABLE_PYTHON_MAGICS, RECONSTRUCTED_PYTHON_HEADER_LIMITATION, pythonVersionForMagic, reconstructedPycHeader, isHeaderlessPythonCode;
function init_PythonBytecode() {
	return (init_PythonBytecode = __esmMin((() => {
		init_pythonBytecodeIdentity();
		RECONSTRUCTABLE_PYTHON_MAGICS = new Set([
			3394,
			3413,
			3425,
			3439,
			3495,
			3531,
			3571,
			3627
		]);
		RECONSTRUCTED_PYTHON_HEADER_LIMITATION = "Python bytecode header was reconstructed from the archive Python magic; this digest covers the derived file.";
		pythonVersionForMagic = (magic) => {
			if (magic.length !== 4) return undefined;
			const observed = observePythonBytecodePrefix(magic);
			return observed.state === "framed" && RECONSTRUCTABLE_PYTHON_MAGICS.has(observed.magic) ? observed.identity?.pythonVersion : undefined;
		};
		reconstructedPycHeader = (magic) => {
			const header = Buffer.alloc(16);
			magic.copy(header, 0, 0, 4);
			return header;
		};
		isHeaderlessPythonCode = (prefix) => prefix.length === 4 && observePythonBytecodePrefix(prefix).state !== "framed" && (prefix[0] === 99 || prefix[0] === 227);
	})))();
}

//#endregion
//#region dist/artifacts/pyinstaller/PyInstallerPyzStore.js
var MAX_PRIVATE_PYZ_IMAGES, PyInstallerPyzStore;
function init_PyInstallerPyzStore() {
	return (init_PyInstallerPyzStore = __esmMin((() => {
		init_OwnedFileHandle();
		init_RegularFile();
		init_resources();
		init_PyInstallerMemberStream();
		init_CArchiveLayout();
		init_PythonBytecode();
		MAX_PRIVATE_PYZ_IMAGES = 128;
		PyInstallerPyzStore = class {
			#root;
			#serial = 0;
			#owners = new Map();
			#cleanup = new ArtifactResourceScope();
			#images = new Map();
			reserveImages(count) {
				if (count > MAX_PRIVATE_PYZ_IMAGES) throw new ArtifactReaderFailure("limit", "PyInstaller compressed PYZ images exceed the 128-file private storage budget", { boundary: "capacity" });
			}
			async bytecodeHeader(handle, archiveStart, entry, magic, signal) {
				const unchanged = {
					header: undefined,
					limitation: undefined
				};
				if (magic === undefined) return unchanged;
				if (entry.role === "script") return {
					header: reconstructedPycHeader(magic),
					limitation: undefined
				};
				if (!isCArchivePythonModule(entry)) return unchanged;
				const prefix = await readPyInstallerMemberPrefix(async (active) => (await this.memberSource({
					kind: "carchive",
					archiveStart,
					source: entry,
					header: undefined
				}, handle, active)).source, {
					sourceBytes: entry.compressedSize,
					compressed: entry.compressionFlag === 1,
					expectedBytes: entry.uncompressedSize,
					maxBytes: entry.uncompressedSize,
					signal: signal ?? new AbortController().signal
				}, 4);
				return isHeaderlessPythonCode(prefix) ? {
					header: reconstructedPycHeader(magic),
					limitation: undefined
				} : {
					header: undefined,
					limitation: "CArchive module is not identified as headerless marshal code; its original bytes are preserved without reconstructing a Python bytecode header."
				};
			}
			async spool(handle, archiveStart, entry, signal) {
				abortIfNeeded(signal);
				if (entry.compressedSize === 0) throw new ArtifactReaderFailure("format", "Compressed PYZ image has no zlib bytes");
				this.#root ??= await mkdtemp(join(tmpdir(), "rea-pyz-"));
				const path = join(this.#root, String(this.#serial++));
				const writer = await open(path, "wx", 384);
				this.#retain(path, new OwnedFileHandle(writer));
				abortIfNeeded(signal);
				const source = readArtifactFileChunks(handle, {
					start: archiveStart + entry.offset,
					end: archiveStart + entry.offset + entry.compressedSize - 1,
					signal
				});
				const stream = pyInstallerMemberStream(source, {
					sourceBytes: entry.compressedSize,
					compressed: true,
					header: undefined,
					expectedBytes: entry.uncompressedSize,
					maxBytes: entry.uncompressedSize,
					signal: signal ?? new AbortController().signal
				});
				const copied = this.#writeImage(writer, stream.output, signal);
				const outcomes = await Promise.allSettled([stream.completion, copied]);
				const copy = outcomes[1];
				if (copy?.status === "rejected") throw copy.reason;
				const decoded = outcomes[0];
				if (decoded?.status === "rejected") throw decoded.reason;
				await this.release(writer);
				abortIfNeeded(signal);
				const { handle: opened, initial } = await this.#admit(path, signal);
				this.#images.set(opened, {
					path,
					initial
				});
				return {
					handle: opened,
					start: 0
				};
			}
			async release(handle) {
				const owner = this.#owners.get(handle);
				if (owner === undefined) return;
				const outcome = await this.#cleanup.release(owner);
				if (outcome.kind === "failed") throw outcome.cause;
				this.#owners.delete(handle);
			}
			async memberSource(read, root, signal) {
				let handle = read.kind === "carchive" ? root : read.handle;
				if (handle === undefined) throw new ArtifactReaderFailure("unavailable", "PyInstaller archive is closed");
				const image = read.kind === "pyz" ? this.#images.get(handle) : undefined;
				let verify;
				let close;
				if (image !== undefined) {
					({handle} = await this.#admit(image.path, signal));
					const opened = handle;
					verify = () => this.#verifyImage(opened, image);
					close = async (primary) => {
						try {
							await this.release(opened);
						} catch (cause) {
							throw ArtifactReaderFailure.withCleanup(primary ?? cause, ArtifactReaderFailure.cleanupObservation(cause, image.path));
						}
					};
					await verify();
				}
				abortIfNeeded(signal);
				const start = read.kind === "carchive" ? read.archiveStart + read.source.offset : read.offset;
				const length = read.kind === "carchive" ? read.source.compressedSize : read.length;
				const source = length === 0 ? Readable.from([]) : readArtifactFileChunks(handle, {
					start,
					end: start + length - 1,
					signal
				});
				source.on("error", () => undefined);
				return {
					source,
					...verify === undefined ? {} : { verify },
					...close === undefined ? {} : { close }
				};
			}
			async close() {
				await this.#cleanup.close();
				this.#owners.clear();
				if (this.#root !== undefined) {
					try {
						await rm(this.#root, {
							recursive: true,
							force: true
						});
					} catch (cause) {
						throw ArtifactReaderFailure.withCleanup(cause, ArtifactReaderFailure.cleanupObservation(cause, this.#root));
					}
					this.#root = undefined;
				}
				this.#images.clear();
			}
			async #admit(path, signal) {
				try {
					const source = await openRegularFile(path, {
						symlinks: "reject",
						signal,
						changeTime: "as-written"
					});
					this.#retain(path, new OwnedFileHandle(source.handle));
					return source;
				} catch (cause) {
					if (cause instanceof RegularFileAdmissionFailure) this.#retain(path, cause.owner);
					throw artifactFileAdmissionFailure(path, "PyInstaller", cause);
				}
			}
			#retain(path, handle) {
				const owner = {
					kind: "file-handle",
					resource: path,
					handle
				};
				this.#owners.set(handle.handle, owner);
				this.#cleanup.retain(owner);
			}
			async #writeImage(handle, source, signal) {
				let position = 0;
				for await (const chunk of source) {
					if (signal?.aborted) continue;
					let offset = 0;
					try {
						while (offset < chunk.length) {
							const { bytesWritten } = await handle.write(chunk, offset, chunk.length - offset, position);
							if (bytesWritten === 0) throw new ArtifactReaderFailure("io", "Private PYZ write made no progress");
							offset += bytesWritten;
							position += bytesWritten;
							if (signal?.aborted) break;
						}
					} catch (cause) {
						const failure = cause instanceof ArtifactReaderFailure ? cause : new ArtifactReaderFailure("io", "Private PYZ image could not be written", { cause });
						source.destroy(failure);
						throw failure;
					}
				}
				abortIfNeeded(signal);
			}
			async #verifyImage(handle, image) {
				const states = await Promise.all([handle.stat(), lstat(image.path)]);
				if (states.some((state) => !sameRegularFileState(image.initial, state))) throw new ArtifactReaderFailure("integrity", "Private PYZ image changed after parsing", { integrityCheck: "container-identity" });
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/pyinstaller/CArchiveMembers.js
var CRYPTO_KEY_NAME, hasEncryptionMarker, projectStoredMember, projectPyzContainer, projectPyzMember, canonicalMemberPath, sourceByteOffset, pyzMemberPath, projectEntry, sealMember;
function init_CArchiveMembers() {
	return (init_CArchiveMembers = __esmMin((() => {
		init_resources();
		init_CArchiveLayout();
		init_PythonBytecode();
		init_PyInstallerMetadata();
		CRYPTO_KEY_NAME = "pyimod00_crypto_key";
		hasEncryptionMarker = (entries) => entries.some((entry) => entry.name === CRYPTO_KEY_NAME && isCArchivePythonModule(entry) && entry.uncompressedSize > 0);
		projectStoredMember = (entry, archiveStart, bytecode, pathDialect) => {
			if (isCArchiveDeclaration(entry)) return {
				entry: projectEntry({
					path: `__pyinstaller__/${entry.role === "runtime-option" ? "runtime-options" : "dependencies"}/${String(entry.index)}`,
					kind: "metadata",
					declaredSize: entry.uncompressedSize,
					compressedSize: entry.compressedSize,
					byteOffset: null,
					limitations: entry.role === "dependency" ? ["Multipackage dependency bytes belong to another executable and remain unresolved."] : [],
					adapterKey: `carchive:${String(entry.index)}:${entry.name}`,
					formatMetadata: cArchiveEntryMetadata(entry)
				}),
				read: undefined
			};
			const { header } = bytecode;
			const path = canonicalMemberPath(entry.name, pathDialect);
			const symlink = entry.role === "symlink";
			const limitations = [];
			if (symlink) limitations.push("PyInstaller symlink target was not read.");
			if (header !== undefined) limitations.push(RECONSTRUCTED_PYTHON_HEADER_LIMITATION);
			if (bytecode.limitation !== undefined) limitations.push(bytecode.limitation);
			const declaredSize = entry.uncompressedSize;
			return {
				entry: projectEntry({
					path,
					kind: symlink ? "symlink" : "file",
					declaredSize,
					compressedSize: entry.compressedSize,
					executable: pathDialect === "posix" && entry.role === "binary",
					byteOffset: sourceByteOffset(entry, archiveStart),
					limitations,
					adapterKey: `carchive:${String(entry.index)}:${entry.name}`,
					formatMetadata: cArchiveEntryMetadata(entry, header)
				}),
				read: {
					kind: "carchive",
					archiveStart,
					source: entry,
					header
				}
			};
		};
		projectPyzContainer = (entry, archiveStart, image, encrypted, pathDialect) => {
			const { archive } = image;
			const path = canonicalMemberPath(entry.name, pathDialect);
			const byteOffset = sourceByteOffset(entry, archiveStart);
			const limitations = [];
			if (archive.kind === "opaque") return {
				entry: projectEntry({
					path,
					declaredSize: entry.uncompressedSize,
					compressedSize: entry.compressedSize,
					byteOffset,
					encrypted: false,
					limitations: [
						...limitations,
						archive.limitation,
						...encrypted ? ["PYZ entries are encrypted and were not decoded."] : []
					],
					adapterKey: `carchive:${String(entry.index)}:${entry.name}`,
					formatMetadata: cArchiveEntryMetadata(entry, undefined, archive, encrypted)
				}),
				read: entry.compressionFlag === 1 ? {
					kind: "pyz",
					handle: image.handle,
					offset: image.start,
					length: entry.uncompressedSize,
					compressed: false,
					uncompressedSize: entry.uncompressedSize,
					header: undefined
				} : {
					kind: "carchive",
					archiveStart,
					source: entry,
					header: undefined
				}
			};
			return {
				entry: projectEntry({
					path,
					kind: "directory",
					declaredSize: entry.uncompressedSize,
					compressedSize: entry.compressedSize,
					byteOffset,
					limitations: [
						...limitations,
						`PyInstaller PYZ sha256 ${archive.sha256}.`,
						...encrypted ? ["PYZ entries are encrypted and were not decoded."] : []
					],
					adapterKey: `carchive:${String(entry.index)}:${entry.name}`,
					formatMetadata: cArchiveEntryMetadata(entry, undefined, archive, encrypted)
				}),
				read: undefined
			};
		};
		projectPyzMember = (container, item, encryptionMarker, pythonMagic, pathDialect, range) => {
			const path = pyzMemberPath(canonicalMemberPath(container.name, pathDialect), item, pathDialect);
			const encrypted = pyzEntryEncrypted(item, encryptionMarker);
			if (item.role === "namespace") return {
				entry: projectEntry({
					path,
					kind: "metadata",
					declaredSize: 0,
					compressedSize: item.length,
					encrypted,
					byteOffset: null,
					limitations: ["Namespace package has no importable bytecode; its declared payload is not materialized.", ...encrypted ? ["PYZ namespace payload is declared encrypted and is not materialized."] : []],
					adapterKey: `pyz:${String(container.index)}:${String(item.index)}:${path}`,
					formatMetadata: pyzEntryMetadata(container, item, undefined, encryptionMarker)
				}),
				read: undefined
			};
			const header = !encrypted && pythonMagic !== undefined && (item.role === "module" || item.role === "package") ? reconstructedPycHeader(pythonMagic) : undefined;
			const limitations = [];
			if (encrypted) limitations.push("PYZ entry is encrypted and was not decoded.");
			if (header !== undefined) limitations.push(RECONSTRUCTED_PYTHON_HEADER_LIMITATION);
			limitations.push("PYZ tables declare compressed lengths; the uncompressed size is unknown until decoding.");
			return {
				entry: projectEntry({
					path,
					declaredSize: null,
					compressedSize: item.length,
					byteOffset: null,
					encrypted,
					limitations,
					adapterKey: `pyz:${String(container.index)}:${String(item.index)}:${path}`,
					formatMetadata: pyzEntryMetadata(container, item, header, encryptionMarker)
				}),
				read: range === undefined ? undefined : {
					kind: "pyz",
					...range,
					compressed: true,
					uncompressedSize: undefined,
					header
				}
			};
		};
		canonicalMemberPath = (storedName, pathDialect) => pathDialect === "windows" ? storedName.replaceAll("\\", "/") : storedName;
		sourceByteOffset = (entry, archiveStart) => entry.compressionFlag === 0 ? archiveStart + entry.offset : null;
		pyzMemberPath = (container, item, pathDialect) => {
			if (item.role === "data") return `${container}/${canonicalMemberPath(item.name, pathDialect)}`;
			const dotted = item.name.replaceAll(".", "/");
			if (item.role === "namespace") return `${container}/${dotted}`;
			if (item.role === "package") return `${container}/${dotted}/__init__.pyc`;
			return `${container}/${dotted}.pyc`;
		};
		projectEntry = (input) => ({
			path: input.path,
			sourcePath: input.formatMetadata.source_name,
			kind: input.kind ?? "file",
			declaredSize: input.declaredSize,
			compressedSize: input.compressedSize,
			executable: input.executable === true,
			encrypted: input.encrypted === true,
			byteOffset: input.byteOffset,
			declaredIntegrity: null,
			unpacked: false,
			limitations: input.limitations,
			adapterKey: input.adapterKey,
			formatMetadata: input.formatMetadata
		});
		sealMember = (member) => ({
			...member,
			entry: copyArtifactEntry(member.entry)
		});
	})))();
}

//#endregion
//#region dist/artifacts/ArtifactHash.js
var hashReadable, hashReadableToCompletion, classifyStableRootArtifactHandle;
function init_ArtifactHash() {
	return (init_ArtifactHash = __esmMin((() => {
		init_resources();
		init_ArtifactClassificationProbe();
		hashReadable = async (stream, signal, integrityAlgorithm, asarHeaderAdmission, observeChunk) => {
			const completed = await hashReadableToCompletion(stream, signal, integrityAlgorithm, asarHeaderAdmission, observeChunk);
			abortIfNeeded(signal);
			return completed;
		};
		hashReadableToCompletion = async (stream, signal, integrityAlgorithm, asarHeaderAdmission, observeChunk) => {
			const probe = createArtifactClassificationProbe(asarHeaderAdmission);
			const digest = await digestReadableToCompletion(stream, signal, integrityAlgorithm, (chunk) => {
				observeChunk?.(chunk);
				probe.write(chunk);
			});
			return {
				...digest,
				...probe.finish(digest.bytes)
			};
		};
		classifyStableRootArtifactHandle = async (path, handle, initial, signal) => {
			const probe = createArtifactClassificationProbe(undefined);
			const digest = await hashStableRootArtifactHandle(path, handle, initial, signal, (chunk) => probe.write(chunk));
			return {
				...digest,
				...probe.finish(digest.bytes)
			};
		};
	})))();
}

//#endregion
//#region dist/artifacts/pyinstaller/MarshalSubset.js
var MAX_DEPTH, MAX_NODES, MAX_SEQUENCE, MAX_STRING_BYTES, MAX_LONG_DIGITS, FORMAT_MESSAGES, LIMIT_MESSAGES, PyzMarshalLimit, PyzMarshalReader, MAX_SAFE, readMarshalSubset, project;
function init_MarshalSubset() {
	return (init_MarshalSubset = __esmMin((() => {
		init_result();
		init_marshalReader();
		init_PyInstallerFailure();
		MAX_DEPTH = 16;
		MAX_NODES = 1e5;
		MAX_SEQUENCE = 1e5;
		MAX_STRING_BYTES = 65536;
		MAX_LONG_DIGITS = 8;
		FORMAT_MESSAGES = {
			truncated: "PYZ marshal value is truncated",
			"negative-string-length": "PYZ marshal string has a negative length",
			"negative-sequence-length": "PYZ marshal sequence has a negative count",
			"negative-field": "PYZ marshal value has a negative count",
			"invalid-utf8": "PYZ marshal string is not valid UTF-8",
			"long-digit-range": "PYZ marshal long digit is out of range",
			"long-not-normalized": "PYZ marshal long is not normalized",
			"unresolved-reference": "PYZ marshal reference does not point at a completed value",
			"unsupported-type": "PYZ marshal value uses a type outside the supported subset"
		};
		LIMIT_MESSAGES = {
			objects: "PYZ marshal value exceeds the depth or object bound",
			depth: "PYZ marshal value exceeds the depth or object bound",
			sequence: "PYZ marshal sequence exceeds the supported count",
			"string-bytes": "PYZ marshal string exceeds the supported length",
			"long-bytes": "PYZ marshal integer exceeds the safe range",
			"long-digits": "PYZ marshal integer exceeds the safe range"
		};
		PyzMarshalLimit = class {
			message;
			constructor(message) {
				this.message = message;
			}
		};
		PyzMarshalReader = class extends MarshalReader {
			constructor(bytes) {
				super(bytes, {
					format: "pyinstaller-pyz-toc",
					limits: {
						maxObjects: MAX_NODES,
						maxDepth: MAX_DEPTH,
						maxStringBytes: MAX_STRING_BYTES,
						maxSequence: MAX_SEQUENCE,
						maxLongDigits: MAX_LONG_DIGITS
					},
					publishContainers: "after-items"
				});
			}
			wrap(value) {
				return value;
			}
			limitExceeded(exceeded) {
				throw new PyzMarshalLimit(LIMIT_MESSAGES[exceeded.limit]);
			}
			/** A TOC integer must be a safe JavaScript number, checked in stream order. */
			readTyped(type, depth, slot) {
				const value = super.readTyped(type, depth, slot);
				if (value.kind === "int" && (value.value > MAX_SAFE || value.value < -MAX_SAFE)) throw new PyzMarshalLimit(LIMIT_MESSAGES["long-digits"]);
				return value;
			}
		};
		MAX_SAFE = BigInt(Number.MAX_SAFE_INTEGER);
		readMarshalSubset = (bytes) => {
			const reader = new PyzMarshalReader(bytes);
			let value;
			try {
				value = project(reader.readObject(0), new WeakMap());
			} catch (cause) {
				if (cause instanceof PyzMarshalLimit) return err(pyInstallerFailure("limit", cause.message));
				if (cause instanceof MarshalDefectError) return err(pyInstallerFailure("format", FORMAT_MESSAGES[cause.defect]));
				throw cause;
			}
			if (reader.offset !== bytes.length) return err(pyInstallerFailure("format", "PYZ marshal value did not consume its table of contents"));
			return ok(value);
		};
		project = (value, projected) => {
			switch (value.kind) {
				case "int": return Number(value.value);
				case "str":
				case "bytes": return value.value;
				case "tuple":
				case "list": {
					const known = projected.get(value);
					if (known !== undefined) return known;
					const items = value.items.map((item) => project(item, projected));
					projected.set(value, items);
					return items;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/pyinstaller/PyzArchive.js
var PYZ_MAGIC, PYZ_HEADER_BYTES, PYZ_ENTRY_ROLES, MAX_PYZ_TABLE_BYTES, readPyzHeaderFacts, readPyzArchive, parsePyzParts, pyzEntries, onePyzEntry;
function init_PyzArchive() {
	return (init_PyzArchive = __esmMin((() => {
		init_ArtifactHash();
		init_resources();
		init_PyInstallerBytes();
		init_binaryContainer();
		init_result();
		init_MarshalSubset();
		init_PyInstallerFailure();
		init_PythonBytecode();
		PYZ_MAGIC = Buffer.from("PYZ\0");
		PYZ_HEADER_BYTES = 12;
		PYZ_ENTRY_ROLES = [
			"module",
			"package",
			"data",
			"namespace"
		];
		MAX_PYZ_TABLE_BYTES = 16 * 1024 * 1024;
		readPyzHeaderFacts = (header, size) => {
			if (!header.subarray(0, 4).equals(PYZ_MAGIC)) return err(pyInstallerFailure("format", "PYZ archive magic does not match"));
			const pythonMagic = Buffer.from(header.subarray(4, 8));
			const tocOffset = new BinaryReader(header, false, "pyz").u32(8);
			return ok({
				pythonMagic,
				pythonVersion: pythonVersionForMagic(pythonMagic),
				tocOffset,
				tableBytes: tocOffset >= PYZ_HEADER_BYTES && tocOffset <= size ? size - tocOffset : null
			});
		};
		readPyzArchive = async (handle, start, size, signal) => {
			if (size < PYZ_HEADER_BYTES) return err(pyInstallerFailure("format", "PYZ archive magic does not match"));
			const headerRead = await readPyInstallerBytes(handle, {
				position: start,
				length: PYZ_HEADER_BYTES,
				label: "PYZ header",
				signal
			});
			if (!headerRead.ok) return headerRead;
			const admitted = readPyzHeaderFacts(headerRead.value, size);
			if (!admitted.ok) return admitted;
			const header = admitted.value;
			const tableSize = header.pythonVersion === undefined ? 0 : header.tableBytes ?? 0;
			if (tableSize > MAX_PYZ_TABLE_BYTES) return err(pyInstallerFailure("limit", "PYZ table exceeds the 16 MiB in-memory table budget"));
			const read = await readPyInstallerBytes(handle, {
				position: start + header.tocOffset,
				length: tableSize,
				label: "PYZ table",
				signal
			});
			if (!read.ok) return read;
			const table = read.value;
			const digest = await hashReadable(readArtifactFileChunks(handle, {
				start,
				end: start + size - 1,
				...signal === undefined ? {} : { signal }
			}), signal);
			if (digest.bytes !== size) return err(pyInstallerFailure("format", "PYZ image extends outside the file"));
			return parsePyzParts(header, table, digest.sha256);
		};
		parsePyzParts = (header, table, sha256) => {
			const { pythonMagic, pythonVersion, tocOffset } = header;
			if (pythonVersion === undefined) return ok({
				kind: "opaque",
				pythonMagic,
				pythonVersion,
				sha256,
				limitation: `PYZ Python magic ${pythonMagic.toString("hex")} is not in the supported set; the member was left opaque.`
			});
			if (header.tableBytes === null) return err(pyInstallerFailure("format", "PYZ table of contents is outside the archive"));
			const marshalled = readMarshalSubset(table);
			if (!marshalled.ok) {
				if (marshalled.error.reason !== "format") return marshalled;
				return ok({
					kind: "opaque",
					pythonMagic,
					pythonVersion,
					sha256,
					limitation: `PYZ table of contents could not be parsed (${marshalled.error.message}); the member was left opaque.`
				});
			}
			const entries = pyzEntries(marshalled.value, tocOffset, table.length);
			if (!entries.ok) return entries.error.reason === "format" ? ok({
				kind: "opaque",
				pythonMagic,
				pythonVersion,
				sha256,
				limitation: `${entries.error.message}; the member was left opaque.`
			}) : entries;
			return ok({
				kind: "entries",
				pythonMagic,
				pythonVersion,
				sha256,
				entries: entries.value
			});
		};
		pyzEntries = (value, payloadEnd, tableBytes) => {
			if (!Array.isArray(value)) return err(pyInstallerFailure("format", "PYZ table of contents is not a list"));
			const entries = [];
			const nameByteBudget = tableBytes * 2;
			let nameBytes = 0;
			for (const item of value) {
				const entry = onePyzEntry(item, payloadEnd, entries.length);
				if (!entry.ok) return entry;
				nameBytes += Buffer.byteLength(entry.value.name, "utf8");
				if (nameBytes > nameByteBudget) return err(pyInstallerFailure("limit", `PYZ table entry names expand past the ${String(nameByteBudget)}-byte decoded-name budget`));
				entries.push(entry.value);
			}
			return ok(entries);
		};
		onePyzEntry = (item, payloadEnd, index) => {
			if (!Array.isArray(item) || item.length !== 2) return err(pyInstallerFailure("format", "PYZ table entry is not a name and position pair"));
			const [name, position] = item;
			if (typeof name !== "string" || !Array.isArray(position) || position.length !== 3) return err(pyInstallerFailure("format", "PYZ table entry is not a name, type, offset, and length"));
			const [typeCode, offset, length] = position;
			if (!Number.isSafeInteger(typeCode) || !Number.isSafeInteger(offset) || !Number.isSafeInteger(length)) return err(pyInstallerFailure("format", "PYZ table entry positions are not integers"));
			const role = PYZ_ENTRY_ROLES[typeCode];
			if (role === undefined) return err(pyInstallerFailure("format", `PYZ table entry type ${String(typeCode)} is not a known module, package, data, or namespace code`));
			if (role !== "namespace" && length === 0) return err(pyInstallerFailure("format", `PYZ entry at table index ${String(index)} has no compressed bytes`));
			if (length < 0 || offset < 0 || offset > payloadEnd || length > payloadEnd - offset || length > 0 && offset < PYZ_HEADER_BYTES) return err(pyInstallerLayoutFailure(`PYZ entry at table index ${String(index)} extends outside the archive payload region`));
			return ok({
				index,
				name,
				typeCode,
				offset,
				length,
				compressionFlag: length === 0 ? 0 : 1,
				role
			});
		};
	})))();
}

//#endregion
//#region dist/artifacts/PyInstallerArtifactReader.js
var MAX_PARSED_FACT_BYTES, MAX_RETAINED_ENTRY_BYTES, RECORD_OWNERSHIP_RESERVATION, PATH_COMPONENT_RESERVATION, carrierPathDialect, PyInstallerArtifactReader;
function init_PyInstallerArtifactReader() {
	return (init_PyInstallerArtifactReader = __esmMin((() => {
		init_jsonValueByteLength();
		init_resources();
		init_PyInstallerMetadata();
		init_artifactExpansionBudget();
		init_dosMz();
		init_machoContainer();
		init_ArtifactClassificationProbe();
		init_PyInstallerPyzStore();
		init_PyInstallerMemberStream();
		init_CArchiveLayout();
		init_CArchiveMembers();
		init_PyzArchive();
		init_PyInstallerFailure();
		init_PyInstallerBytes();
		MAX_PARSED_FACT_BYTES = 32 * 1024 * 1024;
		MAX_RETAINED_ENTRY_BYTES = 64 * 1024 * 1024;
		RECORD_OWNERSHIP_RESERVATION = 256;
		PATH_COMPONENT_RESERVATION = 1024;
		carrierPathDialect = async (handle, fileSize, signal) => {
			const prefixRead = await readPyInstallerBytes(handle, {
				position: 0,
				length: Math.min(fileSize, ARTIFACT_CLASSIFICATION_PREFIX_BYTES),
				label: "carrier header",
				signal
			});
			if (!prefixRead.ok) return "unknown";
			const prefix = prefixRead.value;
			let windowsHeader = observeMzWindowsHeader(prefix, fileSize);
			if (windowsHeader.state === "signature-needed") {
				const signatureRead = await readPyInstallerBytes(handle, {
					position: windowsHeader.offset,
					length: 4,
					label: "PE signature",
					signal
				});
				if (!signatureRead.ok) return "unknown";
				windowsHeader = observeMzWindowsHeader(prefix, fileSize, {
					offset: windowsHeader.offset,
					bytes: signatureRead.value
				});
			}
			if (windowsHeader.state === "declared") return windowsHeader.signature === "PE" ? "windows" : "unknown";
			if (prefix.subarray(0, 4).equals(Buffer.from([
				127,
				69,
				76,
				70
			]))) return "posix";
			const thinMachO = readMachoHeaderPrefixFacts(prefix);
			if (thinMachO.identity !== null) return "posix";
			if (readFatContainerHeader(prefix, fileSize).state === "parsed") return "posix";
			return "unknown";
		};
		PyInstallerArtifactReader = class {
			format = "pyinstaller";
			#source;
			#admission;
			#closed = false;
			#scope = new ArtifactResourceScope();
			#cleanup = new ArtifactResourceScope();
			#lifecycle = new AbortController();
			#loaded;
			#metadata;
			#members = new Map();
			#openedPyzSizes = new Map();
			constructor(path, source) {
				if (source !== undefined && "kind" in source) {
					this.#admission = source;
					this.#source = new ArtifactFileSource(path, "PyInstaller", source.source);
				} else {
					this.#source = new ArtifactFileSource(path, "PyInstaller", source);
				}
				this.#cleanup.retain({
					kind: "lease",
					resource: path,
					lease: { release: () => this.#source.close() }
				});
			}
			formatMetadata() {
				return this.#metadata === undefined ? undefined : { ...this.#metadata };
			}
			async prepareContainer(expectedSha256, signal) {
				const active = this.#signal(signal);
				await this.#scope.run(async () => {
					await this.#openHandle(active);
					await this.#source.bindSelectedPathSha256(expectedSha256, active);
				});
			}
			async *entries(signal, options) {
				const active = this.#signal(signal);
				const loaded = await this.#scope.run(async () => {
					const value = await this.#load(active);
					await this.#source.readSelectedPath();
					this.#members.clear();
					return value;
				});
				this.#signal(signal);
				options?.onCoverage?.(loaded.traversal);
				for (const member of loaded.members) {
					abortIfNeeded(active);
					const sealed = sealMember(member);
					this.#members.set(sealed.entry.adapterKey, sealed);
					yield sealed.entry;
				}
				this.#signal(signal);
			}
			async open(entry, signal) {
				const active = this.#signal(signal);
				return this.#scope.run(async () => {
					const stored = this.#members.get(entry.adapterKey);
					assertProducedEntry(entry, stored?.entry, `PyInstaller entry was not produced by this reader: ${entry.path}`);
					if (entry.kind !== "file") throw new ArtifactReaderFailure("format", `PyInstaller entry is not a regular file: ${entry.path}`);
					if (entry.encrypted) throw new ArtifactReaderFailure("unavailable", `PYZ entry is encrypted and was not decoded: ${entry.path}`);
					const { state } = await this.#load(active);
					const read = stored.read;
					if (read === undefined) throw new ArtifactReaderFailure("format", `PyInstaller entry has no readable bytes: ${entry.path}`);
					const { handle } = await this.#source.readSelectedPath();
					const knownSize = read.kind === "pyz" ? read.uncompressedSize ?? this.#openedPyzSizes.get(entry.adapterKey) : undefined;
					if (read.kind === "pyz" && knownSize === undefined) this.#charge(state, read.header?.length ?? 0);
					const parts = await state.pyzStore.memberSource(read, handle, active);
					if (active.aborted) {
						parts.source.destroy();
						await finished$1(parts.source, { cleanup: true }).catch(() => undefined);
						abortIfNeeded(active);
					}
					let closeAttempt;
					const closeSource = (primary) => closeAttempt ??= parts.close?.(primary);
					const stream = pyInstallerMemberStream(parts.source, {
						sourceBytes: read.kind === "carchive" ? read.source.compressedSize : read.length,
						compressed: read.kind === "pyz" ? read.compressed : read.source.compressionFlag === 1,
						header: read.header,
						expectedBytes: read.kind === "carchive" ? read.source.uncompressedSize : knownSize,
						maxBytes: read.kind === "carchive" ? read.source.uncompressedSize : knownSize ?? state.budget - state.charged,
						signal: active,
						...read.kind === "pyz" && knownSize === undefined ? { charge: (bytes) => this.#charge(state, bytes) } : {},
						complete: async (bytes) => {
							try {
								await parts.verify?.();
								await this.#source.readSelectedPath();
								abortIfNeeded(active);
							} catch (cause) {
								await closeSource(cause);
								throw cause;
							}
							await closeSource();
							abortIfNeeded(active);
							if (read.kind === "pyz" && knownSize === undefined) this.#openedPyzSizes.set(entry.adapterKey, bytes);
						}
					});
					void this.#scope.run(async () => {
						let primary;
						try {
							await stream.completion;
						} catch (cause) {
							primary = cause;
						}
						await closeSource(primary);
						if (primary !== undefined) throw primary;
					}).catch((cause) => stream.output.destroy(cause instanceof Error ? cause : new Error("PyInstaller stream failed", { cause })));
					return stream.output;
				});
			}
			provenance() {
				return [];
			}
			async close() {
				this.#closed = true;
				const closing = new ArtifactReaderFailure("unavailable", "PyInstaller reader closed");
				this.#lifecycle.abort(closing);
				await this.#scope.close();
				await this.#cleanup.close();
				this.#closed = true;
				this.#loaded = undefined;
				this.#admission = undefined;
				this.#members.clear();
				this.#openedPyzSizes.clear();
			}
			#signal(signal) {
				abortIfNeeded(signal);
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "PyInstaller archive is closed");
				return signal === undefined ? this.#lifecycle.signal : AbortSignal.any([signal, this.#lifecycle.signal]);
			}
			async #load(signal) {
				for (;;) {
					abortIfNeeded(signal);
					const pending = this.#loaded ??= {
						signal,
						promise: this.#parseAttempt(signal)
					};
					let loaded;
					try {
						loaded = await pending.promise;
					} catch (cause) {
						if (artifactReadCancelledBy(cause, pending.signal)) {
							if (this.#loaded === pending) this.#loaded = undefined;
							if (pending.signal !== signal && signal?.aborted !== true) continue;
						}
						throw cause;
					}
					abortIfNeeded(signal);
					return loaded;
				}
			}
			async #parseAttempt(signal) {
				const state = {
					signal,
					pyzStore: new PyInstallerPyzStore(),
					budget: 0,
					charged: 0,
					parsedFactBytes: 0,
					retainedEntryBytes: 0
				};
				const owner = {
					kind: "lease",
					resource: "PyInstaller private PYZ images",
					lease: { release: () => state.pyzStore.close() }
				};
				this.#cleanup.retain(owner);
				try {
					return await this.#parse(state);
				} catch (cause) {
					if (artifactReadCancelledBy(cause, signal)) {
						const cleanup = await this.#cleanup.release(owner);
						if (cleanup.kind === "failed") throw this.#cleanup.cleanupFailure({
							kind: "failed",
							cause
						}, [cleanup]);
					}
					throw cause;
				}
			}
			async #parse(state) {
				const { signal } = state;
				await this.#openHandle(signal);
				const { handle, initial } = await this.#source.readSelectedPath();
				const size = initial.size;
				const pathDialect = this.#admission?.carrierPathDialect ?? await carrierPathDialect(handle, size, signal);
				const cookie = this.#admission?.cookie ?? await this.#cookie(handle, size, signal);
				state.budget = artifactExpansionBudgetBytes(cookie.packageLength);
				const toc = await this.#toc(handle, cookie, signal);
				for (const entry of toc) {
					this.#charge(state, entry.uncompressedSize);
					this.#reserveMetadata(state, { ...entry }, false);
				}
				const images = await this.#pyzImages(state, handle, cookie, toc);
				const magic = scriptPythonMagic(cookie, [...images.values()].map((image) => image.archive));
				const encrypted = hasEncryptionMarker(toc);
				const members = await this.#project(state, toc, cookie, images, magic, encrypted, pathDialect);
				for (const member of members) if (member.read?.kind === "carchive") this.#charge(state, member.read.header?.length ?? 0);
				await this.#source.readSelectedPath();
				abortIfNeeded(signal);
				this.#admission = undefined;
				this.#metadata = cookieMetadata(cookie, toc, encrypted);
				let opaqueImages = 0;
				for (const image of images.values()) if (image.archive.kind === "opaque") opaqueImages++;
				return {
					state,
					members,
					traversal: {
						status: opaqueImages === 0 ? "complete" : "unknown",
						limitations: opaqueImages === 0 ? [] : [`${String(opaqueImages)} PYZ archives remain opaque; module traversal is unknown. See opaque PYZ occurrences for source magic and per-archive limitations.`]
					}
				};
			}
			async #openHandle(signal) {
				abortIfNeeded(signal);
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "PyInstaller archive is closed");
				let handle;
				try {
					({handle} = await this.#source.read(this.#lifecycle.signal));
				} catch (cause) {
					if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled" && signal?.aborted) throw new ArtifactReaderFailure("cancelled", cause.message, {
						cause: signal.reason,
						cleanup: cause.cleanup,
						cleanupLeases: cause.cleanupLeases
					});
					throw cause;
				}
				abortIfNeeded(signal);
				return handle;
			}
			async #cookie(handle, size, signal) {
				const found = await observePyInstallerCookie(handle, size, signal);
				if (!found.ok) throw pyInstallerReaderFailure(found.error);
				const observed = found.value;
				if (observed.state === "absent") throw new ArtifactReaderFailure("format", "PyInstaller CArchive cookie was not found");
				if (observed.state === "rejected-candidates") throw pyInstallerReaderFailure(observed.failure);
				return observed.cookie;
			}
			async #toc(handle, cookie, signal) {
				const toc = await readCArchiveToc(handle, cookie, signal);
				if (!toc.ok) throw pyInstallerReaderFailure(toc.error);
				return toc.value;
			}
			async #pyzImages(state, handle, cookie, toc) {
				const { signal } = state;
				const images = new Map();
				state.pyzStore.reserveImages(toc.reduce((count, entry) => count + (entry.role === "pyz" && entry.compressionFlag === 1 ? 1 : 0), 0));
				for (const entry of toc) {
					if (entry.role !== "pyz") continue;
					abortIfNeeded(signal);
					const spooled = entry.compressionFlag === 0 ? undefined : await state.pyzStore.spool(handle, cookie.archiveStart, entry, signal);
					const source = spooled ?? {
						handle,
						start: cookie.archiveStart + entry.offset
					};
					const parsed = await readPyzArchive(source.handle, source.start, entry.uncompressedSize, signal);
					if (!parsed.ok) throw pyInstallerReaderFailure(parsed.error);
					if (parsed.value.kind === "entries") for (const item of parsed.value.entries) this.#reserveMetadata(state, {
						...item,
						container: entry.name
					}, false);
					if (spooled !== undefined) await state.pyzStore.release(spooled.handle);
					images.set(entry, {
						archive: parsed.value,
						handle: source.handle,
						start: source.start
					});
				}
				return images;
			}
			async #project(state, toc, cookie, images, magic, encrypted, pathDialect) {
				const { signal } = state;
				const handle = await this.#openHandle(signal);
				const members = [];
				const append = (member) => {
					this.#reservePathComponents(state, member.entry.path);
					const entry = {
						...member.entry,
						path: normalizeArtifactPath(member.entry.path)
					};
					this.#reserveMetadata(state, {
						path: entry.path,
						source_path: entry.sourcePath ?? null,
						adapter_key: entry.adapterKey,
						format_metadata: entry.formatMetadata ?? null,
						limitations: [...entry.limitations]
					}, true);
					members.push({
						...member,
						entry
					});
				};
				for (const entry of toc) {
					if (members.length % 256 === 0) await setImmediate();
					abortIfNeeded(signal);
					const image = entry.role === "pyz" ? images.get(entry) : undefined;
					if (image === undefined) {
						const bytecode = await state.pyzStore.bytecodeHeader(handle, cookie.archiveStart, entry, magic, signal);
						append(projectStoredMember(entry, cookie.archiveStart, bytecode, pathDialect));
						continue;
					}
					append(projectPyzContainer(entry, cookie.archiveStart, image, encrypted, pathDialect));
					if (image.archive.kind !== "entries") continue;
					for (const item of image.archive.entries) {
						if (members.length % 256 === 0) await setImmediate();
						abortIfNeeded(signal);
						append(projectPyzMember(entry, item, encrypted, image.archive.pythonMagic, pathDialect, item.role === "namespace" || encrypted ? undefined : {
							handle: image.handle,
							offset: image.start + item.offset,
							length: item.length
						}));
					}
				}
				return members;
			}
			#reservePathComponents(state, path) {
				const remaining = MAX_RETAINED_ENTRY_BYTES - state.retainedEntryBytes;
				const componentCost = PATH_COMPONENT_RESERVATION + 6 * jsonValueByteLength(path);
				let reservation = componentCost;
				for (let index = 0; index < path.length && reservation <= remaining; index++) if (path.charCodeAt(index) === 47) reservation += componentCost;
				if (reservation > remaining) throw new ArtifactReaderFailure("limit", "PyInstaller paths exceed their retained namespace budget", { boundary: "memory" });
				state.retainedEntryBytes += reservation;
			}
			#reserveMetadata(state, value, projected) {
				const used = projected ? state.retainedEntryBytes : state.parsedFactBytes;
				const limit = projected ? MAX_RETAINED_ENTRY_BYTES : MAX_PARSED_FACT_BYTES;
				const remaining = limit - used - RECORD_OWNERSHIP_RESERVATION;
				const bytes = remaining < 0 ? 0 : jsonValueByteLength(value, remaining);
				if (remaining < 0 || bytes > remaining) throw new ArtifactReaderFailure("limit", "PyInstaller directory facts exceed their retained metadata budget", { boundary: "memory" });
				if (projected) state.retainedEntryBytes += bytes + RECORD_OWNERSHIP_RESERVATION;
				else state.parsedFactBytes += bytes + RECORD_OWNERSHIP_RESERVATION;
			}
			#charge(state, bytes) {
				if (!Number.isSafeInteger(bytes) || bytes < 0 || state.charged + bytes > state.budget) throw new ArtifactReaderFailure("limit", `PyInstaller members declare ${String(state.charged + Math.max(0, bytes))} uncompressed bytes, exceeding the decompression budget`);
				state.charged += bytes;
			}
		};
	})))();
}

//#endregion
//#region dist/uefi/UefiArtifactReader.js
var hex, volumePath, IMAGE_TRUNCATION_LIMITATION, volumeLimitation, UefiArtifactReader;
function init_UefiArtifactReader() {
	return (init_UefiArtifactReader = __esmMin((() => {
		init_budget();
		init_OwnedFileHandle();
		init_RegularFile();
		init_uefiLimits();
		init_FfsFile();
		init_FirmwareVolume();
		init_UefiBytes();
		init_resources();
		hex = (value) => `0x${value.toString(16)}`;
		volumePath = (offset) => `firmware-volume-${hex(offset)}`;
		IMAGE_TRUNCATION_LIMITATION = `The image exceeds the ${UEFI_FIRMWARE_LIMITS.inputBytes}-byte admission budget; ` + "only the leading admission window is mapped.";
		volumeLimitation = (header) => header.fileSystem === "unsupported" ? unsupportedVolumeBodyReason(header) : `Firmware volume at ${hex(header.absoluteBase)} declares PI firmware file system ${header.fileSystem === "ffs2" ? "2 (FFS2)" : "3 (FFS3)"}; inspect_uefi_firmware maps its sections and compression.`;
		UefiArtifactReader = class {
			path;
			format = "uefi";
			#source;
			#ownedSource;
			#pendingSource;
			#entries = new Map();
			#ownsSource;
			#closed = false;
			#closePromise;
			constructor(path, source) {
				this.path = path;
				this.#source = source;
				this.#ownsSource = source === undefined;
			}
			async *entries(signal, options) {
				const source = await this.#ensureSource();
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "UEFI flash image reader is closed");
				await this.#verifySource(source);
				if (signal?.aborted === true) throw new ArtifactReaderFailure("cancelled", "UEFI entry scan cancelled", { cause: signal.reason });
				this.#entries.clear();
				const image = await this.#readImage(source, signal);
				const limitations = new Set();
				const omit = (path, limitation) => {
					options?.onOmission?.({
						path,
						kind: "unsupported"
					});
					limitations.add(limitation);
				};
				const imageTruncated = source.initial.size > image.length;
				if (imageTruncated) omit("image-truncated", IMAGE_TRUNCATION_LIMITATION);
				const region = imageRegion(image, 0, image.length);
				const records = new Budget(UEFI_FIRMWARE_LIMITS.scanRecords);
				const checkpoint = () => assertArtifactReadActive(signal);
				const reserve = () => {
					checkpoint();
					return records.tryCharge(1);
				};
				const scan = scanFirmwareVolumes(region, UEFI_FIRMWARE_LIMITS.maxVolumes, { reserve });
				if (scan.limit !== null) {
					omit("volume-scan-limit", scan.limit === "structural-records" ? `UEFI volume search reached the structural record limit of ${UEFI_FIRMWARE_LIMITS.scanRecords}.` : "UEFI volume search reached its candidate limit.");
				}
				for (const { absoluteBase, truncation } of scan.rejected) {
					if (truncation === undefined) continue;
					omit(volumePath(absoluteBase), `Firmware volume at ${hex(absoluteBase)} is truncated: declared ${truncation.declaredLength} bytes, observed ${truncation.observedLength}.`);
				}
				let filesMapped = 0;
				let fileBudgetExhausted = false;
				for (const hit of scan.volumes) {
					const header = hit.header;
					const name = volumePath(header.absoluteBase);
					const entry = {
						path: name,
						kind: "directory",
						declaredSize: header.declaredLength,
						compressedSize: null,
						executable: false,
						encrypted: false,
						byteOffset: header.absoluteBase,
						declaredIntegrity: null,
						unpacked: true,
						limitations: [volumeLimitation(header), ...imageTruncated && hit === scan.volumes[0] ? [IMAGE_TRUNCATION_LIMITATION] : []],
						adapterKey: name
					};
					this.#entries.set(entry.adapterKey, entry);
					yield entry;
					let observedFileEnd;
					if (header.fileSystem === "unsupported") {
						omit(name, "Volumes with unsupported file-system GUIDs were retained without FFS entries.");
					} else {
						for await (const file of this.#volumeFiles(header, image, name, {
							omit,
							reserve,
							checkpoint
						})) {
							if (filesMapped >= UEFI_FIRMWARE_LIMITS.maxFiles) {
								fileBudgetExhausted = true;
								break;
							}
							this.#entries.set(file.adapterKey, file);
							filesMapped += 1;
							if (file.byteOffset !== null && file.declaredSize !== null) observedFileEnd = file.byteOffset + file.declaredSize;
							yield file;
						}
					}
					for (const issue of inspectFirmwareVolumeExtension(region, header, reserve, checkpoint, observedFileEnd)) {
						omit(`${name}/fv-extension-${hex(issue.offset)}`, issue.detail);
					}
					if (fileBudgetExhausted) {
						omit(name, "UEFI inventory reached its FFS file limit.");
						break;
					}
				}
				options?.onCoverage?.({
					status: limitations.size === 0 ? "complete" : "unknown",
					limitations: [...limitations]
				});
			}
			/** One FFS file occurrence per parseable header; erased tails end the walk. */
			async *#volumeFiles(header, image, volumeName, { omit, reserve, checkpoint }) {
				const region = imageRegion(image, header.absoluteBase, Math.min(header.absoluteBase + header.declaredLength, image.length));
				const omitPadding = ({ offset, length }) => omit(`${volumeName}/ffs-padding-${hex(offset)}`, `Unexpected FFS alignment bytes at ${hex(offset)}: ${length} bytes.`);
				for (const padding of header.filePrefixPadding) omitPadding(padding);
				let local = header.firstFileLocal;
				while (local < region.end) {
					checkpoint();
					const read = readFfsHeader(region, local, header, reserve);
					if (read.kind === "limited") {
						omit(`${volumeName}/ffs-scan-limit-${hex(local)}`, `UEFI inventory reached the structural record limit of ${UEFI_FIRMWARE_LIMITS.scanRecords} before the FFS header at ${hex(local)}.`);
						break;
					}
					if (read.kind === "unusable-header") {
						omit(`${volumeName}/ffs-header-${hex(read.offset)}`, read.detail);
						local = read.nextLocal;
						continue;
					}
					if (read.kind === "unparsed") {
						omit(`${volumeName}/ffs-suffix-${hex(read.offset)}`, read.detail ?? `Unparsed FFS suffix at ${hex(read.offset)}: ${read.length} bytes.`);
					}
					if (read.kind !== "file") break;
					const fileHeader = read.header;
					const name = fileHeader.nameGuid === null ? `${volumeName}/ffs-file-${hex(fileHeader.absoluteBase)}.bin` : `${volumeName}/ffs-file-${fileHeader.nameGuid}.bin`;
					const entry = {
						path: name,
						kind: "file",
						declaredSize: fileHeader.observedLength,
						compressedSize: null,
						executable: false,
						encrypted: false,
						byteOffset: fileHeader.absoluteBase,
						declaredIntegrity: null,
						unpacked: true,
						limitations: ["FFS file sections and nested compression are not expanded by the session inventory reader; inspect_uefi_firmware maps them.", ...fileHeader.implausibilities.length > 0 ? [`FFS header implausibility at ${hex(fileHeader.absoluteBase)}: ${fileHeader.implausibilities.join(", ")}.`] : []],
						adapterKey: `uefi-ffs:${hex(fileHeader.absoluteBase)}`
					};
					if (fileHeader.extentIssue !== null) omit(name, `Incomplete FFS extent at ${hex(fileHeader.absoluteBase)}: declared ${fileHeader.declaredLength} bytes, observed ${fileHeader.observedLength} (${fileHeader.extentIssue}).`);
					if (fileHeader.bodyIssue !== null && fileHeader.body !== null && fileHeader.body.start < fileHeader.body.end) omit(name, `FFS file at ${hex(fileHeader.absoluteBase)} has a valid header but its data is not marked valid.`);
					yield entry;
					if (read.padding !== null) omitPadding(read.padding);
					local = read.nextLocal;
				}
			}
			async open(entry, signal) {
				if (signal?.aborted === true) return Promise.reject(new ArtifactReaderFailure("cancelled", "UEFI flash image read cancelled", { cause: signal.reason }));
				const produced = this.#entries.get(entry.adapterKey);
				if (produced === undefined || !sameArtifactEntry(entry, produced)) throw new ArtifactReaderFailure("integrity", "UEFI flash image entry metadata does not match this reader's inventory", { integrityCheck: "foreign-entry" });
				const offset = produced.byteOffset;
				const size = produced.declaredSize;
				if (offset === null || size === null || !Number.isSafeInteger(offset) || !Number.isSafeInteger(size) || offset < 0 || size <= 0) throw new ArtifactReaderFailure("integrity", `Invalid UEFI FFS byte range: ${entry.path}`, { integrityCheck: "entry-metadata" });
				const source = await this.#ensureSource();
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "UEFI flash image reader is closed");
				await this.#verifySource(source);
				if (!Number.isSafeInteger(offset + size) || offset + size > source.initial.size) throw new ArtifactReaderFailure("integrity", `UEFI FFS range is outside the artifact: ${entry.path}`, { integrityCheck: "entry-metadata" });
				const sourceStream = readArtifactFileChunks(source.handle, {
					start: offset,
					end: offset + size - 1,
					...signal === undefined ? {} : { signal }
				});
				const verifySource = () => this.#verifySource(source);
				const completionFailure = () => {
					const coverage = sourceStream.readCoverage();
					if (coverage.kind !== "complete") return new ArtifactReaderFailure("integrity", `UEFI FFS read coverage is incomplete: ${entry.path}`, { integrityCheck: "declared-size" });
					if (coverage.bytes !== BigInt(size)) return new ArtifactReaderFailure("integrity", `UEFI FFS size disagrees with the mapped header: ${entry.path}`, { integrityCheck: "declared-size" });
					if (signal?.aborted) return new ArtifactReaderFailure("cancelled", "UEFI flash image read cancelled", { cause: signal.reason });
					return undefined;
				};
				const output = Readable.from((async function* () {
					for await (const raw of sourceStream) {
						yield streamChunkToBuffer(raw);
					}
					const failure = completionFailure();
					if (failure !== undefined) throw failure;
					await verifySource();
					assertArtifactReadActive(signal);
				})());
				const onSourceError = (cause) => {
					output.destroy(cause instanceof ArtifactReaderFailure ? cause : new ArtifactReaderFailure("integrity", `Could not read UEFI FFS range: ${entry.path}`, {
						cause,
						integrityCheck: "container-identity"
					}));
				};
				sourceStream.on("error", onSourceError);
				sourceStream.once("close", () => sourceStream.removeListener("error", onSourceError));
				output.once("close", () => {
					if (!sourceStream.destroyed) sourceStream.destroy();
				});
				return output;
			}
			provenance() {
				return [];
			}
			async close() {
				this.#closed = true;
				this.#closePromise ??= this.#closeSource().catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			async #closeSource() {
				await this.#pendingSource?.catch(() => undefined);
				if (!this.#ownsSource || this.#ownedSource === undefined) return;
				try {
					await this.#ownedSource.close();
					this.#ownedSource = undefined;
					this.#source = undefined;
				} catch (cause) {
					throw ArtifactReaderFailure.withCleanup(cause, ArtifactReaderFailure.cleanupObservation(cause, this.path));
				}
			}
			async #ensureSource() {
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "UEFI flash image reader is closed");
				if (this.#source !== undefined) return this.#source;
				this.#pendingSource ??= this.#acquireSource();
				const source = await this.#pendingSource;
				if (this.#closed) throw new ArtifactReaderFailure("unavailable", "UEFI flash image reader closed during source acquisition");
				return source;
			}
			async #acquireSource() {
				let source;
				try {
					source = await openRegularFile(this.path, { symlinks: "reject" });
				} catch (cause) {
					if (!(cause instanceof RegularFileAdmissionFailure)) throw cause;
					this.#ownedSource = cause.owner;
					const primary = cause.cause instanceof NonRegularFileReadError ? new ArtifactReaderFailure("format", `UEFI flash image source is not a regular file: ${this.path}`, { cause: cause.cause }) : cause.cause;
					throw ArtifactReaderFailure.withCleanup(primary, ArtifactReaderFailure.cleanupObservation(cause.cleanupCause, this.path));
				}
				this.#ownedSource = new OwnedFileHandle(source.handle);
				this.#source = source;
				return source;
			}
			async #verifySource(source) {
				const [opened, currentPath] = await Promise.all([source.handle.stat(), lstat(this.path)]);
				if (!sameRegularFileState(source.initial, opened) || !sameRegularFileState(source.initial, currentPath)) throw new ArtifactReaderFailure("integrity", `UEFI flash image source changed during inventory: ${this.path}`, { integrityCheck: "container-identity" });
			}
			/** Whole-image read bounded by the admission limit; the parsers need bytes. */
			async #readImage(source, signal) {
				const buffer = Buffer.allocUnsafe(Math.min(UEFI_FIRMWARE_LIMITS.inputBytes, source.initial.size));
				let bytesRead = 0;
				while (bytesRead < buffer.length) {
					if (signal?.aborted === true) throw new ArtifactReaderFailure("cancelled", "UEFI flash image read cancelled", { cause: signal.reason });
					const read = await source.handle.read(buffer, bytesRead, buffer.length - bytesRead, bytesRead);
					if (read.bytesRead === 0) throw new ArtifactReaderFailure("io", `UEFI flash image truncated during read: ${this.path}`);
					bytesRead += read.bytesRead;
				}
				return buffer;
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/Uf2ArtifactReader.js
var familyDirectory, uf2Regions, Uf2ArtifactReader;
function init_Uf2ArtifactReader() {
	return (init_Uf2ArtifactReader = __esmMin((() => {
		init_uf2();
		init_DecodedRegionArtifactReader();
		familyDirectory = (familyId) => familyId === null ? "no-family" : `family-0x${familyId.toString(16).padStart(8, "0")}`;
		uf2Regions = {
			label: "UF2",
			keyPrefix: "uf2",
			createDecoder: createUf2Decoder,
			describe: (image) => ({
				metadata: image.metadata,
				regions: image.regions.map((region) => ({
					path: `${familyDirectory(region.familyId)}/${regionFileName(region.start, region.end)}`,
					byteOffset: null,
					formatMetadata: {
						kind: "uf2-region",
						family_id: region.familyId,
						family_name: region.familyName,
						start_address: region.start,
						end_address: region.end,
						length: region.bytes.length,
						block_count: region.blockCount,
						first_file_block: region.firstFileBlock,
						last_file_block: region.lastFileBlock
					},
					bytes: region.bytes
				})),
				coverage: {
					status: image.complete ? "complete" : "unknown",
					limitations: image.limitations
				}
			})
		};
		Uf2ArtifactReader = class extends DecodedRegionArtifactReader {
			constructor(path, admitted) {
				super(path, "uf2", uf2Regions, admitted);
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/NtfsMftArtifactReader.js
var NtfsMftArtifactReader, coverageOf;
function init_NtfsMftArtifactReader() {
	return (init_NtfsMftArtifactReader = __esmMin((() => {
		init_ArtifactPreparation();
		init_artifactFormatMetadata();
		init_ntfsMft();
		init_resources();
		init_readFileHandleChunks();
		NtfsMftArtifactReader = class {
			format = "ntfs-mft";
			#scope = new ArtifactResourceScope();
			#source;
			#preparation = new ArtifactPreparation();
			#metadata;
			#limitations = [];
			#closing = false;
			constructor(path, admitted) {
				this.#source = new ArtifactFileSource(path, "$MFT stream", admitted);
			}
			formatMetadata() {
				return this.#metadata === undefined ? undefined : structuredClone(this.#metadata);
			}
			async prepareContainer(expectedSha256, signal) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#source.bindSha256(expectedSha256, signal);
				});
			}
			async *entries(signal, options) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#preparation.run(signal, () => this.#prepare(signal), () => this.#assertOpen(signal));
					this.#assertOpen(signal);
					await this.#source.read(signal);
				});
				options?.onCoverage?.(coverageOf(this.#limitations));
				this.#assertOpen(signal);
			}
			async open(entry, _signal) {
				return this.#scope.run(async () => {
					throw new ArtifactReaderFailure("unavailable", `$MFT stream declares no member to open for ${entry.path}`);
				});
			}
			async close() {
				this.#closing = true;
				await this.#scope.close();
				await this.#source.close();
				this.#metadata = undefined;
			}
			provenance() {
				return [];
			}
			#assertOpen(signal) {
				assertArtifactReadActive(signal);
				if (this.#closing) throw new ArtifactReaderFailure("unavailable", "$MFT stream reader is closed");
			}
			async #prepare(signal) {
				const image = await this.#decode(signal);
				await this.#source.read(signal);
				this.#metadata = ntfsMftMetadataSchema.parse(image.metadata);
				this.#limitations = image.limitations;
			}
			async #decode(signal) {
				const { handle, initial } = await this.#source.read(signal);
				const decoder = createMftDecoder(initial.size);
				if (!decoder.ok) throw this.#failure(decoder.error);
				if (initial.size > 0) for await (const chunk of readFileHandleChunks(handle, {
					end: initial.size - 1,
					signal,
					cancellationFailure: (reason) => new ArtifactReaderFailure("cancelled", "$MFT stream read cancelled", { cause: reason })
				})) {
					this.#assertOpen(signal);
					const written = decoder.value.write(chunk);
					if (!written.ok) throw this.#failure(written.error);
				}
				const image = decoder.value.finish();
				if (!image.ok) throw this.#failure(image.error);
				return image.value;
			}
			#failure(failure) {
				return failure.kind === "format" ? new ArtifactReaderFailure("format", `$MFT stream is malformed: ${failure.message}`) : new ArtifactReaderFailure("limit", `$MFT stream exceeds a fixed limit: ${failure.message}`, failure.boundary === undefined ? {} : { boundary: failure.boundary });
			}
		};
		coverageOf = (limitations) => limitations.length === 0 ? {
			status: "complete",
			limitations: []
		} : {
			status: "unknown",
			limitations
		};
	})))();
}

//#endregion
//#region dist/artifacts/AndroidOtaPayloadArtifactReader.js
var LABEL, AndroidOtaPayloadArtifactReader, formatFailure$1, parseFailure$1, refusedContent, reconstructFailure, partitionInfo, entryFor$1, toMetadata$1;
function init_AndroidOtaPayloadArtifactReader() {
	return (init_AndroidOtaPayloadArtifactReader = __esmMin((() => {
		init_ArtifactPreparation();
		init_ArtifactFileRange();
		init_resources();
		init_OwnedArtifactStream();
		init_zstandardFrameAllowance();
		init_configurationErrors();
		init_androidOtaPayload();
		LABEL = "Android OTA payload";
		AndroidOtaPayloadArtifactReader = class {
			format = "android-ota-payload";
			#scope = new ArtifactResourceScope();
			#entries = new Map();
			#streams = new Set();
			#source;
			#preparation = new ArtifactPreparation();
			#payload;
			#closing = false;
			constructor(path, admitted) {
				this.#source = new ArtifactFileSource(path, LABEL, admitted);
			}
			formatMetadata() {
				return this.#payload === undefined ? undefined : toMetadata$1(this.#payload);
			}
			async prepareContainer(expectedSha256, signal) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#source.bindSha256(expectedSha256, signal);
				});
			}
			async *entries(signal, options) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#preparation.run(signal, () => this.#prepare(signal), () => this.#assertOpen(signal));
					await this.#source.read(signal);
				});
				this.#assertOpen(signal);
				options?.onCoverage?.({
					status: "complete",
					limitations: this.#payload?.limitations ?? []
				});
				let index = 0;
				for (const entry of this.#entries.values()) {
					if (index % 256 === 0) await setImmediate();
					index += 1;
					this.#assertOpen(signal);
					yield copyArtifactEntry(entry);
				}
				this.#assertOpen(signal);
			}
			async open(entry, signal) {
				return this.#scope.run(async () => {
					this.#assertOpen(signal);
					const stored = this.#entries.get(entry.adapterKey);
					assertProducedEntry(entry, stored, "Android OTA partition does not match its owning inventory");
					const { handle, initial } = await this.#source.read(signal);
					this.#assertOpen(signal);
					const refused = androidOtaExtractRefusalError(stored.partition);
					if (refused !== null && stored.partition.extractRefusal !== null) throw refusedContent(stored.partition.extractRefusal, refused);
					const payload = this.#payload;
					if (payload === undefined) throw new ArtifactReaderFailure("unavailable", "Android OTA payload reader has no prepared inventory");
					const operationData = androidOtaDistinctOperationDataBytes(stored.partition.operations);
					if (!operationData.ok) throw reconstructFailure(operationData.error);
					const blob = new Map();
					for (const operation of stored.partition.operations) {
						if (operation.dataLength === 0) continue;
						const key = `${String(operation.dataOffset)}:${String(operation.dataLength)}`;
						if (blob.has(key)) continue;
						blob.set(key, await readArtifactFileBytes(handle, payload.header.blobOffset + operation.dataOffset, operation.dataLength, initial.size, signal));
						this.#assertOpen(signal);
					}
					await this.#source.read(signal);
					this.#assertOpen(signal);
					const reconstructed = await reconstructAndroidOtaPartitionCooperative(stored.partition, payload.blockSize, (offset, length) => blob.get(`${String(offset)}:${String(length)}`) ?? new Uint8Array(), () => yieldArtifactRead(signal), { verifyDeclaredHash: stored.declaredIntegrity === null });
					if (!reconstructed.ok) throw reconstructFailure(reconstructed.error);
					const cancellationFailure = (reason) => new ArtifactReaderFailure("cancelled", `${LABEL} read cancelled`, { cause: reason });
					const image = Buffer.from(reconstructed.value);
					const source = image.length === 0 ? Readable.from([]) : Readable.from([image]);
					const output = this.#memberStream(stored, image.length, signal);
					ownArtifactStream(source, output, {
						scope: this.#scope,
						streams: this.#streams,
						signal,
						cancellationFailure,
						label: LABEL
					});
					return output;
				});
			}
			async close() {
				this.#closing = true;
				for (const stream of this.#streams) stream.destroy(new ArtifactReaderFailure("unavailable", `${LABEL} reader closed`));
				await this.#scope.close();
				await this.#source.close();
				this.#entries.clear();
				this.#payload = undefined;
			}
			provenance() {
				return [];
			}
			#assertOpen(signal) {
				assertArtifactReadActive(signal);
				if (this.#closing) throw new ArtifactReaderFailure("unavailable", `${LABEL} reader closed`);
			}
			async #prepare(signal) {
				const { handle, initial } = await this.#source.read(signal);
				const headerBytes = await readArtifactFileBytes(handle, 0, Math.min(initial.size, 24), initial.size, signal);
				const header = parseAndroidOtaHeader(headerBytes, initial.size);
				if (!header.ok) throw parseFailure$1(header.error);
				const { manifestOffset, metadataPrefixEnd } = header.value;
				const metadata = await readArtifactFileBytes(handle, manifestOffset, metadataPrefixEnd - manifestOffset, initial.size, signal);
				const payload = parseAndroidOtaPayload(header.value, metadata, initial.size);
				if (!payload.ok) throw parseFailure$1(payload.error);
				const signatureRange = payload.value.payloadSignatureRange;
				const payloadSignature = signatureRange === null ? undefined : await readArtifactFileBytes(handle, signatureRange.offset, signatureRange.bytes, initial.size, signal);
				await this.#source.read(signal);
				this.#assertOpen(signal);
				const parsed = payloadSignature === undefined ? payload : withAndroidOtaPayloadSignature(payload.value, payloadSignature);
				if (!parsed.ok) throw parseFailure$1(parsed.error);
				this.#payload = parsed.value;
				this.#entries.clear();
				for (const partition of parsed.value.partitions) {
					const entry = entryFor$1(partition);
					this.#entries.set(entry.adapterKey, entry);
				}
			}
			#memberStream(entry, expectedSize, signal) {
				let bytes = 0;
				const check = async () => {
					if (bytes !== expectedSize) throw formatFailure$1(`member ended early: ${entry.path}`);
					await this.#source.read(signal);
				};
				return new Transform({
					transform(chunk, _encoding, callback) {
						bytes += chunk.length;
						callback(null, chunk);
					},
					flush(callback) {
						void check().then(() => callback(), (cause) => callback(cause instanceof Error ? cause : new Error("Android OTA payload read failed", { cause })));
					}
				});
			}
		};
		formatFailure$1 = (detail, options) => new ArtifactReaderFailure("format", `${LABEL} is malformed: ${detail}`, options);
		parseFailure$1 = (failure) => {
			switch (failure.kind) {
				case "limit": return new ArtifactReaderFailure("limit", failure.message, {
					boundary: "capacity",
					cause: failure
				});
				case "unsupported": return new ArtifactReaderFailure("unavailable", failure.message, { cause: failure });
				case "truncated": return new ArtifactReaderFailure("format", failure.message, { cause: failure });
				case "malformed": return formatFailure$1(failure.message, { cause: failure });
			}
		};
		refusedContent = (refusal, failure) => {
			const limitation = androidOtaExtractRefusalLimitation(refusal);
			return new ArtifactEntryContentUnavailable(failure.message, limitation, {
				traversal: {
					status: "unknown",
					limitations: [limitation]
				},
				cause: failure
			});
		};
		reconstructFailure = (failure) => {
			if (failure._tag === "AndroidOtaPayloadUnsupportedOperation" || failure._tag === "AndroidOtaPayloadBlobTruncated") {
				const limitation = androidOtaExtractRefusalLimitation(failure._tag === "AndroidOtaPayloadBlobTruncated" ? "blob_truncated" : "unsupported_operations");
				return new ArtifactEntryContentUnavailable(failure.message, limitation, {
					traversal: {
						status: "unknown",
						limitations: [limitation]
					},
					cause: failure
				});
			}
			if (failure._tag === "AndroidOtaPayloadIntegrityFailure") return new ArtifactReaderFailure("integrity", failure.message, {
				cause: failure,
				integrityCheck: "declared-digest"
			});
			if (failure instanceof ConfigurationError) throw failure;
			if (failure._tag === "ZstandardFrameWorkRefusal") throw new ZstandardFrameAllowanceError({
				maxFrames: failure.value,
				source: failure.source
			}, failure.offset);
			return parseFailure$1(failure);
		};
		partitionInfo = (info) => ({
			size: info.size,
			hash_hex: info.hashHex
		});
		entryFor$1 = (partition) => {
			const hash = partition.newPartitionInfo.hashHex;
			const sha256 = hash !== null && /^[0-9a-f]{64}$/u.test(hash) ? {
				algorithm: "sha256",
				digest: hash
			} : null;
			return {
				path: partition.path,
				kind: "file",
				declaredSize: partition.newPartitionInfo.size,
				compressedSize: partition.totalDataLength,
				executable: false,
				encrypted: false,
				byteOffset: null,
				declaredIntegrity: partition.extractable ? sha256 : null,
				unpacked: false,
				limitations: partition.extractRefusal === null ? [] : [androidOtaExtractRefusalLimitation(partition.extractRefusal)],
				adapterKey: `android-ota-payload:partition:${String(partition.index)}`,
				formatMetadata: {
					kind: "android-ota-partition",
					index: partition.index,
					name: partition.name,
					extractable: partition.extractable,
					new_partition_info: partitionInfo(partition.newPartitionInfo),
					old_partition_info: partition.oldPartitionInfo === null ? null : partitionInfo(partition.oldPartitionInfo),
					version: partition.version,
					run_postinstall: partition.runPostinstall,
					postinstall_path: partition.postinstallPath,
					filesystem_type: partition.filesystemType,
					operation_counts: [...partition.operationCounts],
					total_data_length: partition.totalDataLength,
					merge_operation_count: partition.mergeOperationCount,
					estimate_cow_size: partition.estimateCowSize
				},
				sourcePath: partition.path,
				partition
			};
		};
		toMetadata$1 = (payload) => ({
			kind: "android-ota-payload",
			magic: payload.header.magic,
			major_version: payload.header.majorVersion,
			manifest_size: payload.header.manifestSize,
			metadata_signature_size: payload.header.metadataSignatureSize,
			manifest_offset: payload.header.manifestOffset,
			blob_offset: payload.header.blobOffset,
			block_size: payload.blockSize,
			minor_version: payload.minorVersion,
			payload_kind: payload.payloadKind,
			max_timestamp: payload.maxTimestamp,
			partial_update: payload.partialUpdate,
			security_patch_level: payload.securityPatchLevel,
			signatures_offset: payload.signaturesOffset,
			signatures_size: payload.signaturesSize,
			metadata_signature_blob_size: payload.metadataSignatureBlobSize,
			metadata_signature_count: payload.metadataSignatureCount,
			payload_signature_blob_size: payload.payloadSignatureBlobSize,
			payload_signature_count: payload.payloadSignatureCount,
			signatures_verified: false,
			snapshot_enabled: payload.snapshotEnabled,
			vabc_enabled: payload.vabcEnabled,
			vabc_compression_param: payload.vabcCompressionParam,
			blob_truncated: payload.blobTruncated,
			partitions: payload.partitions.map((partition) => ({
				index: partition.index,
				name: partition.name,
				path: partition.path,
				new_partition_info: partitionInfo(partition.newPartitionInfo),
				old_partition_info: partition.oldPartitionInfo === null ? null : partitionInfo(partition.oldPartitionInfo),
				version: partition.version,
				run_postinstall: partition.runPostinstall,
				postinstall_path: partition.postinstallPath,
				filesystem_type: partition.filesystemType,
				operation_counts: [...partition.operationCounts],
				total_data_length: partition.totalDataLength,
				merge_operation_count: partition.mergeOperationCount,
				estimate_cow_size: partition.estimateCowSize,
				extractable: partition.extractable
			})),
			dynamic_partition_groups: payload.dynamicPartitionGroups.map((group) => ({
				name: group.name,
				size: group.size,
				partition_names: [...group.partitionNames]
			})),
			apex_info: payload.apexInfo.map((apex) => ({
				package_name: apex.packageName,
				version: apex.version,
				is_compressed: apex.isCompressed,
				decompressed_size: apex.decompressedSize
			}))
		});
	})))();
}

//#endregion
//#region dist/artifacts/UImageArtifactReader.js
var PAYLOAD_PATH, READ_CHUNK_BYTES, UImageArtifactReader, formatFailure, parseFailure, entryFor, toMetadata;
function init_UImageArtifactReader() {
	return (init_UImageArtifactReader = __esmMin((() => {
		init_ArtifactPreparation();
		init_ArtifactFileRange();
		init_resources();
		init_OwnedArtifactStream();
		init_readFileHandleChunks();
		init_uimageFormat();
		PAYLOAD_PATH = "payload.bin";
		READ_CHUNK_BYTES = 64 * 1024;
		UImageArtifactReader = class {
			format = "uimage";
			#scope = new ArtifactResourceScope();
			#entries = new Map();
			#lifecycle = new ArtifactStreamLifecycle("uImage");
			#source;
			#preparation = new ArtifactPreparation();
			#header;
			constructor(path, admitted) {
				this.#source = new ArtifactFileSource(path, "U-Boot uImage", admitted);
			}
			formatMetadata() {
				return this.#header === undefined ? undefined : { ...this.#header };
			}
			async prepareContainer(expectedSha256, signal) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#source.bindSha256(expectedSha256, signal);
				});
			}
			async *entries(signal, options) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#preparation.run(signal, () => this.#prepare(signal), () => this.#assertOpen(signal));
					await this.#source.read(signal);
				});
				this.#assertOpen(signal);
				options?.onCoverage?.({
					status: "complete",
					limitations: this.#header !== undefined && hasUImageSizeTable(this.#header.type) ? ["Multi-image sub-images are split from the stored size table; the payload entry retains the full stored bytes."] : []
				});
				let index = 0;
				for (const entry of this.#entries.values()) {
					if (index % 256 === 0) await setImmediate();
					index += 1;
					this.#assertOpen(signal);
					yield copyArtifactEntry(entry);
				}
				this.#assertOpen(signal);
			}
			async open(entry, signal) {
				return this.#scope.run(async () => {
					this.#assertOpen(signal);
					const stored = this.#entries.get(entry.adapterKey);
					assertProducedEntry(entry, stored, "uImage entry does not match its owning inventory");
					const { handle } = await this.#source.read(signal);
					this.#assertOpen(signal);
					const lifecycle = this.#lifecycle.member(signal);
					const { signal: streamSignal, cancellationFailure } = lifecycle;
					const source = stored.declaredSize === 0 ? Readable.from([]) : readFileHandleChunks(handle, {
						start: stored.byteOffset,
						end: stored.byteOffset + stored.declaredSize - 1,
						signal: streamSignal,
						cancellationFailure
					});
					const output = this.#memberStream(stored, lifecycle);
					ownArtifactStream(source, output, {
						scope: this.#scope,
						signal: streamSignal,
						cancellationFailure,
						label: "uImage"
					});
					return output;
				});
			}
			async close() {
				this.#lifecycle.close();
				await this.#scope.close();
				await this.#source.close();
				this.#entries.clear();
			}
			provenance() {
				return [];
			}
			#assertOpen(signal) {
				assertArtifactReadActive(signal);
				if (this.#lifecycle.closed) throw new ArtifactReaderFailure("unavailable", "uImage reader closed");
			}
			async #prepare(signal) {
				const { handle, initial } = await this.#source.read(signal);
				const headerBytes = await readArtifactFileBytes(handle, 0, Math.min(initial.size, 64), initial.size, signal);
				const fields = parseUImageHeaderFields(headerBytes);
				if (!fields.ok) throw parseFailure(fields.error);
				const header = fields.value;
				if (initial.size < 64 + header.payloadSize) throw formatFailure(`uImage payload is truncated: header declares ${header.payloadSize} payload bytes but only ${initial.size - 64} follow the header`);
				let dataCrc32 = 0;
				let read = 0;
				let subImages = [];
				if (hasUImageSizeTable(header.type)) {
					const tablePrefix = await readArtifactFileBytes(handle, 64, Math.min(header.payloadSize, UIMAGE_MULTI_TABLE_WINDOW), initial.size, signal);
					const parsed = parseMultiImageTable(tablePrefix, header.payloadSize);
					if (!parsed.ok) throw parseFailure(parsed.error);
					subImages = parsed.value;
					dataCrc32 = crc32(tablePrefix);
					read = tablePrefix.length;
				}
				while (read < header.payloadSize) {
					this.#assertOpen(signal);
					const chunk = await readArtifactFileBytes(handle, 64 + read, Math.min(READ_CHUNK_BYTES, header.payloadSize - read), initial.size, signal);
					dataCrc32 = crc32(chunk, dataCrc32);
					read += chunk.length;
				}
				if (dataCrc32 !== header.dataCrc32) throw formatFailure(`uImage data CRC32 mismatch: declared 0x${header.dataCrc32.toString(16)}, computed 0x${dataCrc32.toString(16)}`);
				this.#header = toMetadata(header, subImages.length);
				const payload = entryFor("payload", 0, {
					byteOffset: 64,
					declaredSize: header.payloadSize
				});
				this.#entries.set(payload.adapterKey, payload);
				for (const sub of subImages) {
					const entry = entryFor("sub-image", sub.index, sub);
					this.#entries.set(entry.adapterKey, entry);
				}
			}
			#memberStream(entry, lifecycle) {
				let bytes = 0;
				const check = async () => {
					if (bytes !== entry.declaredSize) throw formatFailure(`member ended early: ${entry.path}`);
					await lifecycle.verify((signal) => this.#source.read(signal));
				};
				return new Transform({
					transform(chunk, _encoding, callback) {
						bytes += chunk.length;
						callback(null, chunk);
					},
					flush(callback) {
						void check().then(() => callback(), (cause) => callback(cause instanceof Error ? cause : new Error("uImage read failed", { cause })));
					}
				});
			}
		};
		formatFailure = (detail, options) => new ArtifactReaderFailure("format", `uImage is malformed: ${detail}`, options);
		parseFailure = (failure) => failure._tag === "UImageCapacityFailure" ? new ArtifactReaderFailure("limit", failure.message, {
			boundary: "capacity",
			cause: failure
		}) : formatFailure(failure.message, { cause: failure });
		entryFor = (role, index, range) => {
			const payload = role === "payload";
			const path = payload ? PAYLOAD_PATH : `image-${String(index)}.bin`;
			const adapterKey = payload ? "uimage:payload" : `uimage:image-${String(index)}`;
			return {
				path,
				kind: "file",
				declaredSize: range.declaredSize,
				compressedSize: null,
				executable: false,
				encrypted: false,
				byteOffset: range.byteOffset,
				declaredIntegrity: null,
				unpacked: false,
				limitations: [],
				adapterKey,
				formatMetadata: {
					kind: "uimage-entry",
					role,
					index
				},
				sourcePath: path
			};
		};
		toMetadata = (facts, subImageCount) => ({
			kind: "uimage",
			magic: facts.magic,
			timestamp: facts.timestamp,
			timestamp_iso: facts.timestampIso,
			payload_size: facts.payloadSize,
			load_address: facts.loadAddress,
			entry_point: facts.entryPoint,
			header_crc32: facts.headerCrc32,
			data_crc32: facts.dataCrc32,
			crc_verified: true,
			os: facts.os,
			os_name: facts.osName,
			arch: facts.arch,
			arch_name: facts.archName,
			type: facts.type,
			type_name: facts.typeName,
			compression: facts.compression,
			compression_name: facts.compressionName,
			name: facts.name,
			name_bytes_hex: facts.nameBytesHex,
			sub_image_count: subImageCount
		});
	})))();
}

//#endregion
//#region dist/artifacts/OwnedAsyncArtifactStream.js
var ownAsyncArtifactStream;
function init_OwnedAsyncArtifactStream() {
	return (init_OwnedAsyncArtifactStream = __esmMin((() => {
		init_resources();
		ownAsyncArtifactStream = (chunks, controller, { scope, streams, signal, label, highWaterMark }) => {
			let pending = false;
			const cancelled = () => new ArtifactReaderFailure("cancelled", `${label} member read cancelled`, { cause: signal?.reason });
			const tracked = async function* () {
				const iterator = chunks[Symbol.asyncIterator]();
				try {
					while (true) {
						pending = true;
						let next;
						try {
							next = await iterator.next();
						} catch (cause) {
							if (artifactReadCancelledBy(cause, signal)) throw cancelled();
							throw cause;
						} finally {
							pending = false;
						}
						if (signal?.aborted) throw cancelled();
						if (next.done) return;
						yield next.value;
					}
				} finally {
					await iterator.return?.();
				}
			};
			const output = Readable.from(tracked(), {
				objectMode: false,
				highWaterMark
			});
			const onAbort = () => {
				controller.abort(signal?.reason);
				if (!pending) output.destroy(cancelled());
			};
			output.on("error", () => undefined);
			streams.set(output, controller);
			const completion = new Promise((resolve) => {
				output.once("close", () => {
					signal?.removeEventListener("abort", onAbort);
					streams.delete(output);
					resolve();
				});
			});
			void scope.run(() => completion).catch((cause) => {
				controller.abort(cause);
				output.destroy(cause instanceof Error ? cause : new Error(`${label} stream ownership failed`, { cause }));
			});
			signal?.addEventListener("abort", onAbort, { once: true });
			if (signal?.aborted === true) onAbort();
			return output;
		};
	})))();
}

//#endregion
//#region dist/artifacts/UnityFsStructures.js
var MAX_BLOCK_UNCOMPRESSED_BYTES, MAX_BLOCK_ENCODED_BYTES, MAX_TABLE_BYTES$1, DIRECTORY_BUDGET_BYTES$1, directoryLimit$1, UTF8$1, unityFsFormatFailure, align16, readUnityFsHeader, decodeBlocksInfoTable, decodeUnityFsLz4, parseBlocks, parseNodes, readUnityFsBlocksInfo;
function init_UnityFsStructures() {
	return (init_UnityFsStructures = __esmMin((() => {
		init_budget();
		init_resources();
		init_ArtifactFileRange();
		init_Lz4Block();
		init_binaryContainer();
		init_unityfsFormat();
		init_strictUtf8();
		MAX_BLOCK_UNCOMPRESSED_BYTES = 64 * 1024 * 1024;
		MAX_BLOCK_ENCODED_BYTES = MAX_BLOCK_UNCOMPRESSED_BYTES + Math.floor(MAX_BLOCK_UNCOMPRESSED_BYTES / 255) + 16;
		MAX_TABLE_BYTES$1 = 16 * 1024 * 1024;
		DIRECTORY_BUDGET_BYTES$1 = 64 * 1024 * 1024;
		directoryLimit$1 = () => new ArtifactReaderFailure("limit", "UnityFS directory exceeds its 16 MiB buffer or 64 MiB representation budget", { boundary: "memory" });
		UTF8$1 = strictUtf8Decoder("preserve");
		unityFsFormatFailure = (detail) => new ArtifactReaderFailure("format", `UnityFS is malformed: ${detail}`);
		align16 = (value) => value + 15 & ~15;
		readUnityFsHeader = async (handle, size, signal) => {
			const prefix = await readArtifactFileBytes(handle, 0, Math.min(size, UNITYFS_HEADER_PREFIX_BYTES), size, signal);
			if (prefix.length < 20 || !hasUnityFsHeader(prefix)) return undefined;
			const facts = readUnityFsHeaderFacts(prefix);
			if (facts === undefined) throw unityFsFormatFailure("header is truncated or exceeds its bounds");
			if (facts.formatVersion < 6 || facts.formatVersion > 8) throw new ArtifactReaderFailure("unavailable", `UnityFS format ${String(facts.formatVersion)} is unsupported; ${String(6)}-${String(8)} are supported`);
			if (facts.declaredSize > BigInt(size)) throw unityFsFormatFailure("declared size exceeds the file");
			if (facts.declaredSize < BigInt(facts.afterFixed)) throw unityFsFormatFailure("declared size excludes the header");
			const declaredSize = Number(facts.declaredSize);
			if (facts.compressedBlocksInfoSize > declaredSize - facts.afterFixed) throw unityFsFormatFailure("declared blocks-info exceeds the bundle extent");
			const blocksInfoAtEnd = (facts.flags & 128) !== 0;
			const compression = facts.flags & 63;
			const common = {
				formatVersion: facts.formatVersion,
				playerVersion: facts.playerVersion,
				engineVersion: facts.engineVersion,
				declaredSize,
				flags: facts.flags,
				compressedBlocksInfoSize: facts.compressedBlocksInfoSize,
				uncompressedBlocksInfoSize: facts.uncompressedBlocksInfoSize,
				blocksInfoAtEnd,
				compression
			};
			const layout = unityFsLayoutFlags(facts.formatVersion, facts.engineVersion, facts.flags);
			if (layout.encrypted === true) return {
				...common,
				layout: { status: "encrypted" }
			};
			if (layout.encrypted === undefined || layout.headerAligned === undefined || layout.dataPadding === undefined) return {
				...common,
				layout: { status: "unsupported-layout" }
			};
			if (compression !== 0 && compression !== 2 && compression !== 3) return {
				...common,
				layout: { status: "unsupported-compression" }
			};
			const position = layout.headerAligned ? align16(facts.afterFixed) : facts.afterFixed;
			if (position > declaredSize) throw unityFsFormatFailure("declared size excludes the padded header");
			const blocksInfoOffset = blocksInfoAtEnd ? declaredSize - facts.compressedBlocksInfoSize : position;
			if (blocksInfoOffset < position || facts.compressedBlocksInfoSize > declaredSize - blocksInfoOffset) throw unityFsFormatFailure("declared blocks-info exceeds the bundle extent");
			return {
				...common,
				layout: {
					status: "available",
					afterHeader: position,
					blocksInfoOffset,
					dataPadding: layout.dataPadding
				}
			};
		};
		decodeBlocksInfoTable = async (header, compressed, signal) => {
			const compression = header.compression;
			if (compression === 0) {
				if (compressed.length !== header.uncompressedBlocksInfoSize) throw unityFsFormatFailure("plain directory size disagrees with its declaration");
				return compressed;
			}
			if (compression === 2 || compression === 3) return decodeUnityFsLz4(compressed, header.uncompressedBlocksInfoSize, signal);
			throw new ArtifactReaderFailure("unavailable", `UnityFS blocks-info compression ${String(compression)} is unsupported`);
		};
		decodeUnityFsLz4 = async (encoded, expected, signal) => {
			try {
				return await decodeLz4Block(encoded, expected, MAX_BLOCK_UNCOMPRESSED_BYTES, signal);
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure) throw cause;
				if (cause instanceof BinaryResourceFailure) throw new ArtifactReaderFailure("limit", "UnityFS LZ4 exceeds the decoder memory budget", {
					cause,
					boundary: "memory"
				});
				if (cause instanceof BinaryFormatFailure) throw new ArtifactReaderFailure("format", "UnityFS is malformed: LZ4 block does not decode to its declared size", { cause });
				throw cause;
			}
		};
		parseBlocks = async (table, dataBytes, budget, signal) => {
			if (table.bytes.length < 24) throw unityFsFormatFailure("blocks-info table is truncated");
			const blockCount = table.u32(16);
			if (20 + blockCount * 10 + 4 > table.bytes.length) throw unityFsFormatFailure("declared block count exceeds the table");
			budget.charge(blockCount * 256, directoryLimit$1);
			const blocks = [];
			let cursor = 20;
			let compressedStart = 0;
			let streamStart = 0;
			let unavailableCount = 0;
			for (let index = 0; index < blockCount; index++) {
				if (index % 256 === 0) await setImmediate();
				assertArtifactReadActive(signal);
				const uncompressedSize = table.u32(cursor);
				const compressedSize = table.u32(cursor + 4);
				const flags = table.u16(cursor + 8);
				if (compressedSize > dataBytes - compressedStart) throw unityFsFormatFailure("declared data area exceeds the bundle extent");
				const compression = flags & 63;
				cursor += 10;
				const lz4 = compression === 2 || compression === 3;
				if (lz4 && (uncompressedSize > MAX_BLOCK_UNCOMPRESSED_BYTES || compressedSize > MAX_BLOCK_ENCODED_BYTES)) throw new ArtifactReaderFailure("limit", "UnityFS LZ4 block exceeds its 64 MiB decoded or bounded encoded buffer budget", { boundary: "memory" });
				if (compression === 0 && compressedSize !== uncompressedSize) throw unityFsFormatFailure("plain block size disagrees with its declaration");
				if (uncompressedSize > 0 && compression !== 0 && !lz4) unavailableCount++;
				if (compression !== 0 && compressedSize === 0) throw unityFsFormatFailure("compressed block declares no bytes");
				blocks.push({
					uncompressedSize,
					compressedSize,
					flags,
					compression,
					unavailableCount,
					compressedStart,
					streamStart
				});
				compressedStart += compressedSize;
				streamStart += uncompressedSize;
			}
			return blocks;
		};
		parseNodes = async (table, blocks, budget, signal) => {
			let cursor = 20 + blocks.length * 10;
			if (cursor + 4 > table.bytes.length) throw unityFsFormatFailure("node count is missing from the table");
			const nodeCount = table.u32(cursor);
			cursor += 4;
			if (cursor + nodeCount * 21 > table.bytes.length) throw unityFsFormatFailure("declared node count exceeds the table");
			budget.charge(nodeCount * 512, directoryLimit$1);
			const streamSize = blocks.length === 0 ? 0 : (blocks[blocks.length - 1]?.streamStart ?? 0) + (blocks[blocks.length - 1]?.uncompressedSize ?? 0);
			const nodes = [];
			for (let index = 0; index < nodeCount; index++) {
				if (index % 256 === 0) await setImmediate();
				assertArtifactReadActive(signal);
				if (cursor + 20 > table.bytes.length) throw unityFsFormatFailure("node fixed fields are truncated");
				const offsetBig = table.word(cursor, 64);
				const sizeBig = table.word(cursor + 8, 64);
				const flags = table.u32(cursor + 16);
				cursor += 20;
				const nameEnd = table.bytes.indexOf(0, cursor);
				if (nameEnd === -1) throw unityFsFormatFailure("node path is unterminated");
				budget.charge((nameEnd - cursor) * 24, directoryLimit$1);
				const name = table.range(cursor, nameEnd - cursor, "UnityFS node path");
				let path;
				try {
					path = UTF8$1.decode(name);
				} catch (cause) {
					throw new ArtifactReaderFailure("format", "UnityFS node path is not valid UTF-8", { cause });
				}
				cursor = nameEnd + 1;
				if (path.length === 0) throw unityFsFormatFailure("empty member path");
				if (offsetBig > BigInt(streamSize) || sizeBig > BigInt(streamSize) - offsetBig) throw unityFsFormatFailure(`member exceeds the stream: ${path}`);
				nodes.push({
					offset: Number(offsetBig),
					size: Number(sizeBig),
					flags,
					path
				});
			}
			return nodes;
		};
		readUnityFsBlocksInfo = async (handle, header, signal) => {
			const layout = header.layout;
			if (layout.status !== "available") throw new ArtifactReaderFailure("unavailable", "UnityFS directory layout is unavailable");
			if (header.compressedBlocksInfoSize > MAX_TABLE_BYTES$1 || header.uncompressedBlocksInfoSize > MAX_TABLE_BYTES$1) throw directoryLimit$1();
			const unalignedDataStart = header.blocksInfoAtEnd ? layout.afterHeader : layout.blocksInfoOffset + header.compressedBlocksInfoSize;
			const dataStart = layout.dataPadding ? align16(unalignedDataStart) : unalignedDataStart;
			const dataEnd = header.blocksInfoAtEnd ? layout.blocksInfoOffset : header.declaredSize;
			if (dataStart < 0 || dataStart > dataEnd) throw unityFsFormatFailure("declared data area exceeds the bundle extent");
			const budget = new Budget(DIRECTORY_BUDGET_BYTES$1);
			budget.charge(header.compressedBlocksInfoSize, directoryLimit$1);
			if (header.compression !== 0) budget.charge(header.uncompressedBlocksInfoSize, directoryLimit$1);
			const compressed = await readArtifactFileBytes(handle, layout.blocksInfoOffset, header.compressedBlocksInfoSize, header.declaredSize, signal);
			const table = new BinaryReader(await decodeBlocksInfoTable(header, compressed, signal), false, "unityfs");
			const blocks = await parseBlocks(table, dataEnd - dataStart, budget, signal);
			const nodes = await parseNodes(table, blocks, budget, signal);
			return {
				dataHash: table.range(0, 16, "UnityFS data hash").toString("hex"),
				blocks,
				nodes,
				dataStart
			};
		};
	})))();
}

//#endregion
//#region dist/artifacts/UnityFsArtifactReader.js
var CHUNK_BYTES$1, MAX_MEMBER_STREAMS$1, UnityFsArtifactReader, expansionLimit, blockEndingAfter, firstUnavailableBlock;
function init_UnityFsArtifactReader() {
	return (init_UnityFsArtifactReader = __esmMin((() => {
		init_ArtifactPreparation();
		init_budget();
		init_artifactExpansionBudget();
		init_resources();
		init_OwnedAsyncArtifactStream();
		init_ArtifactFileRange();
		init_unityfsFormat();
		init_UnityFsStructures();
		CHUNK_BYTES$1 = 64 * 1024;
		MAX_MEMBER_STREAMS$1 = 4;
		UnityFsArtifactReader = class {
			format = "unityfs";
			#scope = new ArtifactResourceScope();
			#entries = new Map();
			#streams = new Map();
			#source;
			#preparation = new ArtifactPreparation();
			#header;
			#blocks = [];
			#dataStart = 0;
			#decodeBytes = new Budget(0);
			#remainingReadOperations = 0;
			#cachedBlock;
			#closing = false;
			constructor(path, admitted) {
				this.#source = new ArtifactFileSource(path, "UnityFS bundle", admitted);
			}
			formatMetadata() {
				return this.#header === undefined ? undefined : { ...this.#header };
			}
			async prepareContainer(expectedSha256, signal) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#source.bindSha256(expectedSha256, signal);
				});
			}
			async *entries(signal, options) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#preparation.run(signal, () => this.#prepare(signal), () => this.#assertOpen(signal));
					await this.#source.read(signal);
				});
				this.#assertOpen(signal);
				if (this.#header?.directory_status !== "available") {
					options?.onCoverage?.({
						status: "unknown",
						limitations: [this.#header?.directory_status === "encrypted" ? "UnityFS bundle declares asset-bundle encryption; member identities and contents remain unknown." : this.#header?.directory_status === "unsupported-layout" ? "UnityFS producer revision does not establish alignment or flag semantics; member identities remain unknown." : "UnityFS blocks-and-directory table uses an unsupported compression; member identities remain unknown."]
					});
					this.#assertOpen(signal);
					return;
				}
				let index = 0;
				for (const { entry } of this.#entries.values()) {
					if (index++ % 256 === 0) await setImmediate();
					this.#assertOpen(signal);
					yield copyArtifactEntry(entry);
				}
				this.#assertOpen(signal);
				options?.onCoverage?.({
					status: "complete",
					limitations: []
				});
			}
			async open(entry, signal) {
				return this.#scope.run(async () => {
					this.#assertOpen(signal);
					const state = this.#entries.get(entry.adapterKey);
					assertProducedEntry(entry, state?.entry, "UnityFS entry does not match its owning inventory");
					const { handle } = await this.#source.read(signal);
					this.#assertOpen(signal);
					if (state.entry.kind !== "file") throw new ArtifactReaderFailure("unavailable", "UnityFS directory entries have no file contents");
					if (state.unavailableCompression !== undefined) {
						const compression = String(state.unavailableCompression);
						const limitation = `UnityFS member compression ${compression} is unsupported; no content hash or child artifact was produced.`;
						throw new ArtifactEntryContentUnavailable(`UnityFS directory entry ${String(state.entry.formatMetadata.index)} requires unsupported compression ${compression}`, limitation, { traversal: {
							status: "unknown",
							limitations: [limitation]
						} });
					}
					if (this.#streams.size >= MAX_MEMBER_STREAMS$1) throw new ArtifactReaderFailure("limit", "UnityFS reader already owns four active member streams", { boundary: "capacity" });
					const controller = new AbortController();
					const output = ownAsyncArtifactStream(this.#memberChunks(handle, state, controller.signal), controller, {
						scope: this.#scope,
						streams: this.#streams,
						signal,
						label: "UnityFS",
						highWaterMark: CHUNK_BYTES$1
					});
					return output;
				});
			}
			async close() {
				this.#closing = true;
				for (const [stream, controller] of this.#streams) {
					const cause = new ArtifactReaderFailure("unavailable", "UnityFS reader closed");
					controller.abort(cause);
					stream.destroy(cause);
				}
				await this.#scope.close();
				await this.#source.close();
				this.#entries.clear();
				this.#blocks = [];
				this.#cachedBlock = undefined;
			}
			provenance() {
				return [];
			}
			#assertOpen(signal) {
				assertArtifactReadActive(signal);
				if (this.#closing) throw new ArtifactReaderFailure("unavailable", "UnityFS reader is closed");
			}
			async #prepare(signal) {
				const { handle, initial } = await this.#source.read(signal);
				const header = await readUnityFsHeader(handle, initial.size, signal);
				if (header === undefined) throw unityFsFormatFailure("no complete UnityFS header");
				const status = header.layout.status;
				const metadata = {
					kind: "unityfs",
					signature: "UnityFS",
					format_version: header.formatVersion,
					player_version: header.playerVersion,
					engine_version: header.engineVersion,
					declared_size: header.declaredSize,
					flags: header.flags,
					blocks_info_compressed_size: header.compressedBlocksInfoSize,
					blocks_info_uncompressed_size: header.uncompressedBlocksInfoSize,
					blocks_info_at_end: header.blocksInfoAtEnd,
					data_start: null,
					block_count: null,
					data_hash: null,
					directory_status: status
				};
				if (status !== "available") {
					await this.#source.read(signal);
					this.#assertOpen(signal);
					this.#header = metadata;
					return;
				}
				const { dataHash, blocks, nodes, dataStart } = await readUnityFsBlocksInfo(handle, header, signal);
				const budget = artifactExpansionBudgetBytes(header.declaredSize);
				let streamBytes = 0n;
				for (const block of blocks) {
					streamBytes += BigInt(block.uncompressedSize);
					if (streamBytes > BigInt(budget)) throw expansionLimit("declared virtual stream", streamBytes, budget);
				}
				const preparedMetadata = {
					...metadata,
					data_hash: dataHash,
					block_count: blocks.length,
					data_start: dataStart
				};
				const readableBlocks = blocks.filter((block) => block.uncompressedSize > 0);
				const registered = await this.#registerNodes(nodes, readableBlocks, budget, signal);
				await this.#source.read(signal);
				this.#assertOpen(signal);
				this.#header = preparedMetadata;
				this.#dataStart = dataStart;
				this.#blocks = readableBlocks;
				this.#decodeBytes = new Budget(budget);
				this.#entries = registered.entries;
				this.#remainingReadOperations = registered.remainingReadOperations;
			}
			async #registerNodes(nodes, blocks, budget, signal) {
				const entries = new Map();
				let readableBytes = 0n;
				for (let index = 0; index < nodes.length; index++) {
					if (index % 256 === 0) await setImmediate();
					this.#assertOpen(signal);
					const node = nodes[index];
					const firstBlock = node.size === 0 ? -1 : blockEndingAfter(blocks, node.offset);
					const lastBlock = node.size === 0 ? -1 : blockEndingAfter(blocks, node.offset + node.size - 1);
					if (node.size !== 0 && (firstBlock < 0 || lastBlock < firstBlock)) throw unityFsFormatFailure("member has no block range");
					const unavailable = firstUnavailableBlock(blocks, firstBlock, lastBlock);
					const kind = (node.flags & 1) !== 0 ? "directory" : "file";
					if (kind === "file" && unavailable === undefined) {
						readableBytes += BigInt(node.size);
						if (readableBytes > BigInt(budget)) throw expansionLimit("readable members including aliases", readableBytes, budget);
					}
					const adapterKey = `unityfs-entry:${String(index)}`;
					const entry = {
						path: node.path,
						sourcePath: node.path,
						kind,
						declaredSize: node.size,
						compressedSize: null,
						executable: false,
						encrypted: false,
						byteOffset: null,
						declaredIntegrity: null,
						unpacked: false,
						limitations: [],
						adapterKey,
						formatMetadata: {
							kind: "unityfs-entry",
							index,
							source_path: node.path,
							declared_offset: node.offset,
							flags: node.flags
						}
					};
					entries.set(adapterKey, {
						entry,
						firstBlock,
						lastBlock,
						unavailableCompression: unavailable?.compression
					});
				}
				const remainingReadOperations = 4 * Math.max(1024, blocks.length + nodes.length + Math.ceil(Number(readableBytes) / CHUNK_BYTES$1));
				return {
					entries,
					remainingReadOperations
				};
			}
			async *#memberChunks(handle, state, signal) {
				const start = state.entry.formatMetadata.declared_offset;
				const end = start + state.entry.declaredSize;
				let delivered = 0, chunks = 0;
				for (let index = state.firstBlock; state.entry.declaredSize > 0 && index <= state.lastBlock; index++) {
					this.#assertOpen(signal);
					const block = this.#blocks[index];
					const first = Math.max(start - block.streamStart, 0);
					const last = Math.min(end - block.streamStart, block.uncompressedSize);
					if (last <= first) continue;
					const plain = block.compression === 0 ? undefined : await this.#decodedBlock(handle, index, signal);
					for (let offset = first; offset < last; offset += CHUNK_BYTES$1) {
						if (chunks++ % 64 === 0) await setImmediate();
						this.#assertOpen(signal);
						const size = Math.min(CHUNK_BYTES$1, last - offset);
						if (plain === undefined) this.#reserveMemberRead();
						const chunk = plain === undefined ? await readArtifactFileBytes(handle, this.#dataStart + block.compressedStart + offset, size, this.#dataStart + block.compressedStart + block.compressedSize, signal) : Buffer.from(plain.subarray(offset, offset + size));
						delivered += chunk.length;
						yield chunk;
					}
				}
				if (delivered !== state.entry.declaredSize) throw unityFsFormatFailure("member ended before its declared size");
				await this.#source.read(signal);
			}
			async #decodedBlock(handle, index, signal) {
				if (this.#cachedBlock?.index === index) return this.#cachedBlock.bytes;
				const block = this.#blocks[index];
				const exhausted = () => expansionLimit("cumulative block decoding", BigInt(block.uncompressedSize), this.#decodeBytes.remaining);
				if (block.uncompressedSize > this.#decodeBytes.remaining) throw exhausted();
				this.#reserveMemberRead();
				this.#decodeBytes.charge(block.uncompressedSize, exhausted);
				const encoded = await readArtifactFileBytes(handle, this.#dataStart + block.compressedStart, block.compressedSize, this.#dataStart + block.compressedStart + block.compressedSize, signal);
				const bytes = await decodeUnityFsLz4(encoded, block.uncompressedSize, signal);
				this.#assertOpen(signal);
				this.#cachedBlock = {
					index,
					bytes
				};
				return bytes;
			}
			#reserveMemberRead() {
				if (this.#remainingReadOperations <= 0) throw new ArtifactReaderFailure("limit", "UnityFS exceeds its directory-and-chunk I/O work budget", { boundary: "capacity" });
				this.#remainingReadOperations--;
			}
		};
		expansionLimit = (stage, bytes, budget) => new ArtifactReaderFailure("limit", `UnityFS ${stage} requires ${String(bytes)} bytes, exceeding the ${String(budget)}-byte plaintext-work budget`);
		blockEndingAfter = (blocks, offset) => {
			let low = 0, high = blocks.length;
			while (low < high) {
				const middle = low + Math.floor((high - low) / 2), block = blocks[middle];
				if (block.streamStart + block.uncompressedSize <= offset) low = middle + 1;
				else high = middle;
			}
			return low < blocks.length ? low : -1;
		};
		firstUnavailableBlock = (blocks, first, last) => {
			if (first < 0) return undefined;
			const before = first === 0 ? 0 : blocks[first - 1].unavailableCount;
			if (blocks[last].unavailableCount === before) return undefined;
			let low = first, high = last;
			while (low < high) {
				const middle = low + Math.floor((high - low) / 2);
				if (blocks[middle].unavailableCount > before) high = middle;
				else low = middle + 1;
			}
			return blocks[low];
		};
	})))();
}

//#endregion
//#region dist/artifacts/WxapkgStructures.js
var MAX_TABLE_BYTES, DIRECTORY_BUDGET_BYTES, MAX_MEMBER_NAME_BYTES, HEADER_PREFIX_BYTES, UTF8, wxapkgFormatFailure, directoryLimit, readWxapkgHeader, wxapkgIndexLayoutFailure, readWxapkgFileTable;
function init_WxapkgStructures() {
	return (init_WxapkgStructures = __esmMin((() => {
		init_binaryContainer();
		init_budget();
		init_resources();
		init_ArtifactFileRange();
		init_wxapkgFormat();
		init_strictUtf8();
		MAX_TABLE_BYTES = 16 * 1024 * 1024;
		DIRECTORY_BUDGET_BYTES = 64 * 1024 * 1024;
		MAX_MEMBER_NAME_BYTES = 64 * 1024;
		HEADER_PREFIX_BYTES = 64;
		UTF8 = strictUtf8Decoder("preserve");
		wxapkgFormatFailure = (detail) => new ArtifactReaderFailure("format", `wxapkg is malformed: ${detail}`);
		directoryLimit = () => artifactFixedLimitFailure({
			name: "The wxapkg directory representation allowance",
			kind: "parser",
			limit: DIRECTORY_BUDGET_BYTES,
			unit: "bytes"
		}, `The wxapkg directory needs more than ${String(DIRECTORY_BUDGET_BYTES)} bytes to represent.`);
		readWxapkgHeader = async (handle, size, signal) => {
			const prefix = await readArtifactFileBytes(handle, 0, Math.min(size, HEADER_PREFIX_BYTES), size, signal);
			if (hasWxapkgEncryptedMagic(prefix)) return {
				info: 0,
				indexLength: 0,
				dataLength: 0,
				fileCount: 0,
				layout: { status: "encrypted" }
			};
			const facts = readWxapkgHeaderFacts(prefix);
			if (facts === undefined) return undefined;
			const indexes = resolveWxapkgIndexLayouts(facts, size);
			if (!indexes.ok) throw wxapkgIndexLayoutFailure(indexes.error);
			return {
				...facts,
				layout: {
					status: "available",
					indexLayouts: indexes.value
				}
			};
		};
		wxapkgIndexLayoutFailure = (failure) => wxapkgFormatFailure(failure._tag === "DataRegionExceedsFile" ? "declared data region exceeds the file" : "declared member table exceeds the file");
		readWxapkgFileTable = async (handle, header, size, signal) => {
			const layout = header.layout;
			if (layout.status !== "available") throw new ArtifactReaderFailure("unavailable", "wxapkg directory is encrypted");
			const indexLayouts = layout.indexLayouts;
			let readBytes = 0;
			let tableStart;
			for (const indexLayout of indexLayouts) {
				if (tableStart === undefined) tableStart = indexLayout.tableStart;
				if (indexLayout.tableBytes > readBytes) readBytes = indexLayout.tableBytes;
			}
			if (tableStart === undefined) throw wxapkgFormatFailure("declared member table exceeds the file");
			if (readBytes > MAX_TABLE_BYTES) throw artifactFixedLimitFailure({
				name: "The wxapkg member table allowance",
				kind: "parser",
				limit: MAX_TABLE_BYTES,
				unit: "bytes"
			}, `The wxapkg member table declares ${String(readBytes)} bytes, above ${String(MAX_TABLE_BYTES)} bytes.`);
			const budget = new Budget(DIRECTORY_BUDGET_BYTES);
			budget.charge(readBytes, directoryLimit);
			const table = await readArtifactFileBytes(handle, tableStart, readBytes, size, signal);
			if (table.length < header.fileCount * 12) throw wxapkgFormatFailure("member table is truncated");
			const reader = new BinaryReader(table, false, "wxapkg");
			const members = [];
			let cursor = 0;
			for (let index = 0; index < header.fileCount; index++) {
				if (index % 256 === 0) await setImmediate();
				assertArtifactReadActive(signal);
				if (cursor + 4 > table.length) throw wxapkgFormatFailure("member row is truncated");
				const nameLength = reader.u32(cursor);
				cursor += 4;
				if (nameLength === 0 || nameLength > MAX_MEMBER_NAME_BYTES || cursor + nameLength + 8 > table.length) throw wxapkgFormatFailure("member row exceeds the table");
				budget.charge(512 + nameLength * 24, directoryLimit);
				let declaredPath;
				try {
					declaredPath = UTF8.decode(table.subarray(cursor, cursor + nameLength));
				} catch (cause) {
					throw new ArtifactReaderFailure("format", "wxapkg member path is not valid UTF-8", { cause });
				}
				cursor += nameLength;
				const offset = reader.u32(cursor);
				const sizeMember = reader.u32(cursor + 4);
				cursor += 8;
				const path = declaredPath.startsWith("/") ? declaredPath.slice(1) : declaredPath;
				if (path.length === 0) throw wxapkgFormatFailure("member name has no package-relative path");
				members.push({
					offset,
					size: sizeMember,
					path,
					declaredPath
				});
			}
			const admitted = admitWxapkgMemberExtents(indexLayouts, cursor, members);
			if (!admitted.ok) {
				switch (admitted.error._tag) {
					case "TruncatedRows": throw wxapkgFormatFailure("member table is truncated");
					case "MemberOutsideDataRegion": throw wxapkgFormatFailure(`member exceeds the data region: ${admitted.error.member.path}`);
					case "ConflictingMemberExtents": throw wxapkgFormatFailure("no single declared data region contains all member extents");
				}
			}
			return { members };
		};
	})))();
}

//#endregion
//#region dist/artifacts/WxapkgArtifactReader.js
var CHUNK_BYTES, MAX_MEMBER_STREAMS, WxapkgArtifactReader;
function init_WxapkgArtifactReader() {
	return (init_WxapkgArtifactReader = __esmMin((() => {
		init_ArtifactPreparation();
		init_artifactExpansionBudget();
		init_resources();
		init_OwnedAsyncArtifactStream();
		init_ArtifactFileRange();
		init_WxapkgStructures();
		CHUNK_BYTES = 64 * 1024;
		MAX_MEMBER_STREAMS = 4;
		WxapkgArtifactReader = class {
			format = "wxapkg";
			#scope = new ArtifactResourceScope();
			#entries = new Map();
			#streams = new Map();
			#source;
			#preparation = new ArtifactPreparation();
			#header;
			#remainingReadOperations = 0;
			#admittedReadOperations = 0;
			#closing = false;
			constructor(path, admitted) {
				this.#source = new ArtifactFileSource(path, "wxapkg package", admitted);
			}
			formatMetadata() {
				return this.#header === undefined ? undefined : { ...this.#header };
			}
			async prepareContainer(expectedSha256, signal) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#source.bindSha256(expectedSha256, signal);
				});
			}
			async *entries(signal, options) {
				await this.#scope.run(async () => {
					this.#assertOpen(signal);
					await this.#preparation.run(signal, () => this.#prepare(signal), () => this.#assertOpen(signal));
					await this.#source.read(signal);
				});
				this.#assertOpen(signal);
				if (this.#header?.directory_status === "encrypted") {
					options?.onCoverage?.({
						status: "unknown",
						limitations: ["wxapkg package is V1MMWX-encrypted; member identities and contents remain unknown."]
					});
					this.#assertOpen(signal);
					return;
				}
				let index = 0;
				for (const { entry } of this.#entries.values()) {
					if (index++ % 256 === 0) await setImmediate();
					this.#assertOpen(signal);
					yield copyArtifactEntry(entry);
				}
				this.#assertOpen(signal);
				options?.onCoverage?.({
					status: "complete",
					limitations: []
				});
			}
			async open(entry, signal) {
				return this.#scope.run(async () => {
					this.#assertOpen(signal);
					const state = this.#entries.get(entry.adapterKey);
					assertProducedEntry(entry, state?.entry, "wxapkg entry does not match its owning inventory");
					this.#reserveMemberRead();
					const { handle } = await this.#source.read(signal);
					this.#assertOpen(signal);
					if (this.#streams.size >= MAX_MEMBER_STREAMS) throw new ArtifactReaderFailure("limit", "wxapkg reader already owns four active member streams", { boundary: "capacity" });
					const controller = new AbortController();
					const output = ownAsyncArtifactStream(this.#memberChunks(handle, state, controller.signal), controller, {
						scope: this.#scope,
						streams: this.#streams,
						signal,
						label: "wxapkg",
						highWaterMark: CHUNK_BYTES
					});
					return output;
				});
			}
			async close() {
				this.#closing = true;
				for (const [stream, controller] of this.#streams) {
					const cause = new ArtifactReaderFailure("unavailable", "wxapkg reader closed");
					controller.abort(cause);
					stream.destroy(cause);
				}
				await this.#scope.close();
				await this.#source.close();
				this.#entries.clear();
			}
			provenance() {
				return [];
			}
			#assertOpen(signal) {
				assertArtifactReadActive(signal);
				if (this.#closing) throw new ArtifactReaderFailure("unavailable", "wxapkg reader is closed");
			}
			async #prepare(signal) {
				const { handle, initial } = await this.#source.read(signal);
				const header = await readWxapkgHeader(handle, initial.size, signal);
				if (header === undefined) throw wxapkgFormatFailure("no complete wxapkg header");
				const metadata = {
					kind: "wxapkg",
					info: header.layout.status === "available" ? header.info : null,
					index_length: header.layout.status === "available" ? header.indexLength : null,
					data_length: header.layout.status === "available" ? header.dataLength : null,
					file_count: header.layout.status === "available" ? header.fileCount : null,
					directory_status: header.layout.status
				};
				if (header.layout.status !== "available") {
					await this.#source.read(signal);
					this.#assertOpen(signal);
					this.#header = metadata;
					return;
				}
				const { members } = await readWxapkgFileTable(handle, header, initial.size, signal);
				const budget = artifactExpansionBudgetBytes(initial.size);
				const entries = new Map();
				let declaredBytes = 0n;
				for (let index = 0; index < members.length; index++) {
					if (index % 256 === 0) await setImmediate();
					this.#assertOpen(signal);
					const member = members[index];
					declaredBytes += BigInt(member.size);
					if (declaredBytes > BigInt(budget)) throw new ArtifactReaderFailure("limit", `wxapkg members declare ${String(declaredBytes)} bytes, exceeding the ${String(budget)}-byte plaintext-work budget`, { boundary: "memory" });
					const adapterKey = `wxapkg-entry:${String(index)}`;
					entries.set(adapterKey, {
						entry: {
							path: member.path,
							sourcePath: member.declaredPath,
							kind: "file",
							declaredSize: member.size,
							compressedSize: null,
							executable: false,
							encrypted: false,
							byteOffset: member.offset,
							declaredIntegrity: null,
							unpacked: false,
							limitations: [],
							adapterKey,
							formatMetadata: {
								kind: "wxapkg-entry",
								index,
								source_path: member.declaredPath,
								declared_offset: member.offset
							}
						},
						member
					});
				}
				const admittedReadOperations = 4 * Math.max(1024, members.length + Math.ceil(Number(declaredBytes) / CHUNK_BYTES));
				await this.#source.read(signal);
				this.#assertOpen(signal);
				this.#header = metadata;
				this.#entries = entries;
				this.#admittedReadOperations = admittedReadOperations;
				this.#remainingReadOperations = admittedReadOperations;
			}
			async *#memberChunks(handle, state, signal) {
				const { offset, size } = state.member;
				let delivered = 0, chunks = 0;
				for (let position = offset; position < offset + size;) {
					if (chunks++ % 64 === 0) await setImmediate();
					this.#assertOpen(signal);
					this.#reserveMemberRead();
					const length = Math.min(CHUNK_BYTES, offset + size - position);
					const chunk = await readArtifactFileBytes(handle, position, length, offset + size, signal);
					position += chunk.length;
					delivered += chunk.length;
					yield chunk;
				}
				if (delivered !== size) throw wxapkgFormatFailure("member ended before its declared size");
				await this.#source.read(signal);
			}
			#reserveMemberRead() {
				if (this.#remainingReadOperations <= 0) throw artifactFixedLimitFailure({
					name: "The wxapkg directory-and-chunk I/O work allowance",
					kind: "parser",
					limit: this.#admittedReadOperations,
					unit: "operations"
				}, `The wxapkg members need more than ${String(this.#admittedReadOperations)} directory-and-chunk read operations.`);
				this.#remainingReadOperations--;
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/artifactFormats.js
function admittedAs(kind, options) {
	const admission = options.admission;
	return admission !== undefined && "kind" in admission && admission.kind === kind ? admission : sourceOf(options);
}
function described(id, descriptor) {
	const { createReader, ...capabilities } = descriptor;
	return createReader === undefined ? withoutReader(id, capabilities) : withReader(id, capabilities, createReader);
}
function container(id, descriptor = {}) {
	const { createReader, ...rest } = descriptor;
	const capabilities = {
		...plain,
		occurrenceContainer: true,
		...rest
	};
	return createReader === undefined ? withoutReader(id, capabilities) : withReader(id, capabilities, createReader);
}
var sourceOf, ZIP_FAMILY_CAPABILITIES, withReader, withoutReader, zipDescriptor, plain, NON_ZIP_FORMATS, ZIP_FORMATS, ARTIFACT_FORMAT_REGISTRY, ARTIFACT_FORMATS, listedFormatIds, artifactFormatDescriptor;
function init_artifactFormats() {
	return (init_artifactFormats = __esmMin((() => {
		init_artifactGraph();
		init_androidOtaPayload();
		init_espImageFacts();
		init_zipPackageFormat();
		init_resources();
		init_AndroidBootImageArtifactReader();
		init_AsarArtifactReader();
		init_BunStandaloneArtifactReader();
		init_DenoStandaloneArtifactReader();
		init_DfuSeArtifactReader();
		init_DotnetBundleArtifactReader();
		init_EspFlashImageArtifactReader();
		init_EspImageArtifactReader();
		init_FitArtifactReader();
		init_GodotPckArtifactReader();
		init_InesArtifactReader();
		init_HexRecordArtifactReader();
		init_MachOSliceArtifactReader();
		init_NativeDmgArtifactReader();
		init_NodeSeaArtifactReader();
		init_PyInstallerArtifactReader();
		init_UefiArtifactReader();
		init_Uf2ArtifactReader();
		init_NtfsMftArtifactReader();
		init_AndroidOtaPayloadArtifactReader();
		init_UImageArtifactReader();
		init_UnityFsArtifactReader();
		init_WxapkgArtifactReader();
		sourceOf = (options) => {
			const admission = options.admission;
			return admission !== undefined && "kind" in admission ? admission.source : admission;
		};
		ZIP_FAMILY_CAPABILITIES = {
			zipFamily: true,
			occurrenceContainer: true,
			roleContainer: false,
			retainClassifiedSource: true,
			extractable: true,
			requiresDarwin: false,
			absentInventory: "unavailable"
		};
		withReader = (id, capabilities, createReader) => ({
			id,
			...capabilities,
			createReader
		});
		withoutReader = (id, capabilities) => ({
			id,
			...capabilities
		});
		zipDescriptor = (id) => withReader(id, ZIP_FAMILY_CAPABILITIES, (path, options) => new ZipArtifactReader(path, id, undefined, sourceOf(options), options.readerLimits?.expanded_bytes));
		plain = {
			zipFamily: false,
			occurrenceContainer: false,
			roleContainer: false,
			retainClassifiedSource: false,
			extractable: false,
			requiresDarwin: false,
			absentInventory: "root"
		};
		NON_ZIP_FORMATS = {
			"dotnet-bundle": container("dotnet-bundle", {
				retainClassifiedSource: true,
				absentInventory: "root",
				createReader: (path, options) => new DotnetBundleArtifactReader(path, admittedAs("dotnet-bundle", options), options.readerLimits?.dotnet_bundle)
			}),
			"bun-standalone": container("bun-standalone", {
				retainClassifiedSource: true,
				absentInventory: "unavailable",
				createReader: (path, options) => new BunStandaloneArtifactReader(path, admittedAs("bun-standalone", options), options.readerLimits?.bun, options.readerLimits?.expanded_bytes)
			}),
			"deno-standalone": container("deno-standalone", {
				retainClassifiedSource: true,
				absentInventory: "unavailable",
				readerLimitation: "Deno compile inventory reports the embedded virtual filesystem, remote modules, and recorded options. Environment-file values and CA certificate bytes are retained in local Evidence with their counts and byte lengths. The npm snapshot is not decoded, and the executable is not run.",
				createReader: (path, options) => new DenoStandaloneArtifactReader(path, admittedAs("deno-standalone", options))
			}),
			dmg: container("dmg", {
				requiresDarwin: true,
				absentInventory: "platform",
				createReader: (path, options) => new NativeDmgArtifactReader(path, options.environment)
			}),
			pkg: container("pkg", { absentInventory: "platform" }),
			asar: container("asar", {
				extractable: true,
				absentInventory: "unavailable",
				createReader: (path, options) => new AsarArtifactReader(path, {
					...options.asarHeaderAdmission === undefined ? {} : { headerAdmission: options.asarHeaderAdmission },
					...options.selectedPath === undefined ? {} : { selectedPath: options.selectedPath }
				})
			}),
			ines: container("ines", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				createReader: (path, options) => {
					const source = sourceOf(options);
					if (source === undefined) throw new ArtifactReaderFailure("integrity", "iNES inventory requires its admitted source descriptor", { integrityCheck: "inventory-node" });
					return new InesArtifactReader(path, source);
				}
			}),
			"godot-pck": container("godot-pck", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: "PCK inventory establishes packaged bytes and metadata; scenes, binary resources, GDScript bytecode and runtime signal behavior were not decoded.",
				createReader: (path, options) => new GodotPckArtifactReader(path, admittedAs("godot-pck", options), options.readerLimits?.godot, options.readerLimits?.expanded_bytes)
			}),
			unityfs: container("unityfs", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: "UnityFS inventory establishes packaged bytes and metadata; serialized objects, textures, meshes and runtime asset behavior were not decoded. LZMA-compressed members are unsupported.",
				createReader: (path, options) => new UnityFsArtifactReader(path, sourceOf(options))
			}),
			wxapkg: container("wxapkg", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: "wxapkg inventory establishes packaged member names and stored bytes; wxml/wxss sources, compiled bundles and runtime behavior are not reconstructed. V1MMWX-encrypted packages are unsupported.",
				createReader: (path, options) => new WxapkgArtifactReader(path, sourceOf(options))
			}),
			uimage: container("uimage", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: "uImage inventory establishes the 64-byte legacy header facts and stored payload bytes. Compressed payloads are not decompressed, and the image is not executed.",
				createReader: (path, options) => new UImageArtifactReader(path, sourceOf(options))
			}),
			"android-boot-image": container("android-boot-image", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: "Android boot image inventory establishes header facts and stored component bytes. Payloads are not decompressed, the v4 signature and AVB footer are not verified, and the image is not executed.",
				createReader: (path, options) => new AndroidBootImageArtifactReader(path, sourceOf(options))
			}),
			"android-ota-payload": container("android-ota-payload", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: ANDROID_OTA_PAYLOAD_LIMITATIONS.inventoryScope,
				createReader: (path, options) => new AndroidOtaPayloadArtifactReader(path, sourceOf(options))
			}),
			"javascript-bundle": described("javascript-bundle", plain),
			"source-map": described("source-map", plain),
			"mach-o-universal": described("mach-o-universal", {
				...plain,
				retainClassifiedSource: true,
				extractable: true,
				requiresDarwin: true,
				absentInventory: "universal",
				createReader: (path, options) => new MachOSliceArtifactReader(path, options.environment, undefined, sourceOf(options), options.integrity)
			}),
			"mach-o": described("mach-o", plain),
			elf: described("elf", plain),
			pe: described("pe", plain),
			"dos-mz": described("dos-mz", plain),
			"dos-com": described("dos-com", plain),
			"raw-binary": described("raw-binary", plain),
			"gamecube-dol": described("gamecube-dol", plain),
			hopper: described("hopper", plain),
			"analysis-database": described("analysis-database", plain),
			uefi: described("uefi", {
				...plain,
				retainClassifiedSource: true,
				absentInventory: "unavailable",
				createReader: (path, options) => new UefiArtifactReader(path, sourceOf(options))
			}),
			plist: described("plist", plain),
			entitlements: described("entitlements", plain),
			directory: container("directory", {
				absentInventory: "unavailable",
				createReader: (path, options) => new DirectoryArtifactReader(path, options.unreadableDirectories)
			}),
			file: described("file", plain),
			pyinstaller: container("pyinstaller", {
				retainClassifiedSource: true,
				createReader: (path, options) => new PyInstallerArtifactReader(path, admittedAs("pyinstaller", options))
			}),
			"node-sea": container("node-sea", {
				retainClassifiedSource: true,
				absentInventory: "unavailable",
				readerLimitation: "Node SEA inventory establishes the injected blob, flags, fuse sentinel, main script, optional code cache, snapshot, and assets. V8 snapshots and code cache are not deserialized, and the application is not executed.",
				createReader: (path, options) => new NodeSeaArtifactReader(path, admittedAs("node-sea", options), options.readerLimits?.node_sea, options.readerLimits?.expanded_bytes)
			}),
			"intel-hex": container("intel-hex", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: "Intel HEX/S-record inventory decodes data records into address-contiguous regions. It does not establish CPU, byte order, memory map, or that a declared start address is executable; gaps are unwritten, not zero.",
				createReader: (path, options) => new HexRecordArtifactReader(path, "intel-hex", sourceOf(options))
			}),
			srec: container("srec", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: "Intel HEX/S-record inventory decodes data records into address-contiguous regions. It does not establish CPU, byte order, memory map, or that a declared start address is executable; gaps are unwritten, not zero.",
				createReader: (path, options) => new HexRecordArtifactReader(path, "srec", sourceOf(options))
			}),
			"esp-image": container("esp-image", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: ESP_IMAGE_LIMITATIONS.inventoryScope,
				createReader: (path, options) => new EspImageArtifactReader(path, sourceOf(options))
			}),
			uf2: container("uf2", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: "UF2 inventory decodes main-flash block payloads into address-contiguous regions per familyID. It does not establish CPU, byte order, memory map, or an entry point; a familyID names a target family, and gaps are unwritten, not zero.",
				createReader: (path, options) => new Uf2ArtifactReader(path, sourceOf(options))
			}),
			dfuse: container("dfuse", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: "DfuSe inventory lists each target element as one region at its declared address. It does not establish CPU, byte order, memory map, or an entry point; an alternate setting selects a device memory, not an address space REA can interpret.",
				createReader: (path, options) => new DfuSeArtifactReader(path, sourceOf(options))
			}),
			"esp-flash-image": container("esp-flash-image", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: "ESP flash layout inventory reads a dump's bootloader region, partition table and partitions and decodes the bootloader and app partitions as ESP images. The OTA selection is derived without app rollback or anti-rollback, and the running partition is unknown. Partitions, nvs_keys included, are extracted as ordinary data; nothing is decrypted.",
				createReader: (path, options) => new EspFlashImageArtifactReader(path, admittedAs("esp-flash-image", options), options.espFlashSelection)
			}),
			fit: container("fit", {
				roleContainer: true,
				retainClassifiedSource: true,
				extractable: true,
				absentInventory: "unavailable",
				readerLimitation: "FIT inventory reports each /images node's stored bytes and its declared type, architecture, OS, compression, load and entry. Image data is not decompressed or decrypted, signatures are not verified, nothing is executed, and load and entry addresses are declarations.",
				createReader: (path, options) => new FitArtifactReader(path, sourceOf(options))
			}),
			"ntfs-mft": described("ntfs-mft", {
				...plain,
				retainClassifiedSource: true,
				readerLimitation: "MFT inventory reports whole-stream counts and up to 32 physical FILE record details, including fixup coverage, supported names, timestamps, declared sizes and attributes. Bounded attribute-list links expose verified metadata from acquired extension records, with explicit reference outcomes and omissions. Nonresident list values and file contents are not recovered; full paths and complete change history are not established. Use inspect_ntfs_journal for caller-paired journal events.",
				createReader: (path, options) => new NtfsMftArtifactReader(path, sourceOf(options))
			}),
			unknown: described("unknown", plain)
		};
		ZIP_FORMATS = Object.fromEntries(ZIP_PACKAGE_FORMATS.map((id) => [id, zipDescriptor(id)]));
		ARTIFACT_FORMAT_REGISTRY = {
			...NON_ZIP_FORMATS,
			...ZIP_FORMATS
		};
		ARTIFACT_FORMATS = ARTIFACT_FORMAT_REGISTRY;
		listedFormatIds = ARTIFACT_FORMAT_IDS;
		artifactFormatDescriptor = (format) => listedFormatIds.some((id) => id === format) ? ARTIFACT_FORMATS[format] : undefined;
	})))();
}

//#endregion
//#region dist/artifacts/inventory/ArtifactGraphConstruction.js
var indexDestinationOccurrencesByPath, createOccurrence, noteUnreadContainerSuffix, containerSuffixFamily, materializeDirectoryNodes, createRootNode, createArtifactNode, rootOccurrenceFor, rekeyOccurrences, createArtifactEdges, resolveOccurrenceParents, classifyArtifactPath, classifyArtifactContent, artifactRoleForFormat, classifyArtifactBytes, classifyFatArtifact, relationFor, depth;
function init_ArtifactGraphConstruction() {
	return (init_ArtifactGraphConstruction = __esmMin((() => {
		init_artifactFormats();
		init_artifactFormatRecognition();
		init_resources();
		init_unicodeCodePointOrder();
		init_javascriptArtifactFiles();
		init_canonicalDigest();
		init_appleArchiveFormat();
		init_artifactIdentity();
		init_zipPackageFormat();
		init_dosMz();
		init_machoContainer();
		init_binaryTarget();
		indexDestinationOccurrencesByPath = (occurrences) => {
			const byPath = new Map();
			for (const occurrence of occurrences) {
				if (!hasDestinationPath(occurrence.entry_kind)) continue;
				const matches = byPath.get(occurrence.logical_path);
				if (matches === undefined) byPath.set(occurrence.logical_path, [occurrence]);
				else matches.push(occurrence);
			}
			return byPath;
		};
		createOccurrence = (entry, path, parent, options = {}) => {
			const duplicateOrdinal = options.duplicateOrdinal ?? 0;
			const role = entry.kind === "metadata" ? {
				kind: "package-metadata",
				format: "unknown"
			} : entry.kind === "directory" ? {
				kind: path.toLowerCase().endsWith(".framework") ? "framework" : "container",
				format: "directory"
			} : containerSuffixFamily(path) === undefined ? classifyArtifactPath(path) : {
				kind: "unknown",
				format: "unknown"
			};
			return {
				occurrence_id: `occ_${digestCanonicalValue(duplicateOrdinal === 0 ? {
					path,
					kind: entry.kind
				} : {
					path,
					kind: entry.kind,
					duplicate_ordinal: duplicateOrdinal
				}, "Artifact")}`,
				artifact_id: null,
				parent_occurrence_id: parent,
				logical_path: path,
				...entry.sourcePath !== undefined || entry.path !== logicalPathNfc(entry.path) ? { source_path: entry.sourcePath ?? entry.path } : {},
				entry_kind: entry.kind,
				artifact_kind: role.kind,
				artifact_format: role.format,
				declared_size: entry.declaredSize,
				compressed_size: entry.compressedSize,
				executable: entry.executable,
				encrypted: entry.encrypted,
				...entry.unpacked || options.sourceFormat === "asar" && entry.kind === "file" ? { unpacked: entry.unpacked } : {},
				hash_status: entry.encrypted ? "unavailable" : "not-hashed",
				source_location: entry.encrypted || entry.byteOffset === null || entry.declaredSize === null ? null : {
					offset: entry.byteOffset,
					length: entry.byteLength ?? entry.declaredSize
				},
				limitations: [...entry.limitations],
				...entry.declaredIntegrity === null ? {} : { declared_integrity: { ...entry.declaredIntegrity } },
				...entry.formatMetadata === undefined ? {} : { format_metadata: { ...entry.formatMetadata } }
			};
		};
		noteUnreadContainerSuffix = (occurrence) => {
			if (occurrence.entry_kind === "directory") return;
			const family = containerSuffixFamily(occurrence.logical_path);
			if (family === undefined) return;
			occurrence.limitations.push(`The path suffix suggests ${family.toUpperCase()}, but these bytes were not read, so the container family is unknown.`);
		};
		containerSuffixFamily = (path) => {
			const lower = path.toLowerCase();
			return lower.endsWith(".asar") ? "asar" : zipPackageFormatForPath(lower);
		};
		materializeDirectoryNodes = (occurrences, nodes) => {
			const directories = occurrences.filter(({ entry_kind: kind, hash_status }) => kind === "directory" && hash_status !== "unavailable").sort((left, right) => depth(right.logical_path) - depth(left.logical_path));
			const childrenByParent = new Map();
			for (const occurrence of occurrences) {
				if (occurrence.parent_occurrence_id === null) continue;
				const children = childrenByParent.get(occurrence.parent_occurrence_id);
				if (children === undefined) childrenByParent.set(occurrence.parent_occurrence_id, [occurrence]);
				else children.push(occurrence);
			}
			for (const directory of directories) {
				const children = (childrenByParent.get(directory.occurrence_id) ?? []).map(({ logical_path, artifact_id, entry_kind }) => ({
					name: logical_path.slice(directory.logical_path.length + 1),
					artifact_id,
					entry_kind
				})).sort((left, right) => compareUnicodeCodePoints(left.name, right.name));
				const node = createArtifactNode({
					sha256: digestCanonicalValue({
						kind: "directory",
						children
					}, "Artifact"),
					size: 0,
					format: "directory",
					contentState: "virtual"
				});
				nodes.set(node.artifact_id, node);
				directory.artifact_id = node.artifact_id;
				directory.hash_status = "verified";
			}
		};
		createRootNode = (input) => createArtifactNode({
			sha256: input.digest?.sha256 ?? digestCanonicalValue({
				kind: "directory-root",
				children: input.occurrences.map(({ logical_path, artifact_id }) => ({
					logical_path,
					artifact_id
				})).sort((left, right) => compareUnicodeCodePoints(left.logical_path, right.logical_path))
			}, "Artifact"),
			size: input.digest?.bytes ?? 0,
			format: input.digest === null ? "directory" : classifyArtifactBytes(input.digest, input.digest.bytes),
			contentState: "materialized"
		});
		createArtifactNode = (input) => ({
			artifact_id: artifactIdForNode({
				sha256: input.sha256,
				content_state: input.contentState
			}),
			format: input.format,
			sha256: input.sha256,
			size: input.size,
			media_type: null,
			architecture: null,
			content_state: input.contentState,
			limitations: []
		});
		rootOccurrenceFor = (node, metadata) => ({
			occurrence_id: occurrenceIdForLocation({
				rootArtifactId: node.artifact_id,
				logicalPath: ".",
				entryKind: metadata.format === "directory" ? "directory" : "file"
			}),
			artifact_id: node.artifact_id,
			parent_occurrence_id: null,
			logical_path: ".",
			entry_kind: metadata.format === "directory" ? "directory" : "file",
			artifact_kind: artifactFormatDescriptor(metadata.format)?.occurrenceContainer === true ? "container" : artifactRoleForFormat(metadata.path, metadata.format).kind,
			artifact_format: metadata.format,
			declared_size: metadata.size,
			compressed_size: null,
			executable: metadata.executable,
			encrypted: (metadata.formatMetadata?.kind === "godot-pck" || metadata.formatMetadata?.kind === "unityfs" || metadata.formatMetadata?.kind === "wxapkg") && metadata.formatMetadata.directory_status === "encrypted",
			hash_status: "verified",
			source_location: null,
			...metadata.formatMetadata === undefined ? {} : { format_metadata: metadata.formatMetadata },
			limitations: []
		});
		rekeyOccurrences = (rootArtifactId, occurrences) => {
			const replacements = new Map();
			const ordinalByPath = new Map();
			for (const occurrence of occurrences) {
				const ordinal = ordinalByPath.get(occurrence.logical_path) ?? 0;
				ordinalByPath.set(occurrence.logical_path, ordinal + 1);
				replacements.set(occurrence.occurrence_id, occurrenceIdForLocation({
					rootArtifactId,
					logicalPath: occurrence.logical_path,
					entryKind: occurrence.entry_kind,
					...ordinal === 0 ? {} : { duplicateOrdinal: ordinal }
				}));
			}
			for (const occurrence of occurrences) {
				occurrence.occurrence_id = replacements.get(occurrence.occurrence_id) ?? occurrence.occurrence_id;
				if (occurrence.parent_occurrence_id !== null) occurrence.parent_occurrence_id = replacements.get(occurrence.parent_occurrence_id) ?? occurrence.parent_occurrence_id;
			}
		};
		createArtifactEdges = (rootArtifactId, occurrences, traversalStatus, producer) => {
			const byId = new Map(occurrences.map((item) => [item.occurrence_id, item]));
			const byPath = indexDestinationOccurrencesByPath(occurrences);
			const edges = [];
			const limitations = [];
			for (const occurrence of occurrences) {
				let relationshipComplete = occurrence.logical_path === "." || occurrence.parent_occurrence_id !== null && occurrence.artifact_id !== null;
				const isSourceMap = occurrence.artifact_kind === "source-map";
				const sourcePath = isSourceMap && occurrence.logical_path !== "." ? occurrence.logical_path.slice(0, -".map".length) : undefined;
				const sourceCandidates = sourcePath === undefined ? [] : byPath.get(sourcePath) ?? [];
				const mappedSource = sourceCandidates.length === 1 && sourceCandidates[0]?.entry_kind === "file" && sourceCandidates[0].artifact_id !== null ? sourceCandidates[0] : undefined;
				if (sourcePath !== undefined) {
					const unknownMapping = sourceCandidates.length > 1 ? {
						occurrence: `Source-map target is unknown because multiple occurrences share ${JSON.stringify(sourcePath)}.`,
						coverage: `Source-map relationships are unknown because multiple occurrences share ${JSON.stringify(sourcePath)}.`
					} : sourceCandidates.length === 1 && sourceCandidates[0]?.entry_kind === "file" && mappedSource === undefined ? {
						occurrence: `Source-map target identity is unknown because the matching occurrence at ${JSON.stringify(sourcePath)} has no content identity.`,
						coverage: `Source-map relationships are unknown because the matching occurrence at ${JSON.stringify(sourcePath)} has no content identity.`
					} : undefined;
					if (unknownMapping !== undefined) {
						relationshipComplete = false;
						occurrence.limitations.push(unknownMapping.occurrence);
						limitations.push(unknownMapping.coverage);
					}
					if (traversalStatus === "unknown") relationshipComplete = false;
				}
				occurrence.relationship_coverage = relationshipComplete ? "complete" : "unknown";
				if (occurrence.parent_occurrence_id === null || occurrence.artifact_id === null) continue;
				const parentArtifactId = mappedSource?.artifact_id ?? byId.get(occurrence.parent_occurrence_id)?.artifact_id ?? rootArtifactId;
				const semantic = {
					parent_artifact_id: parentArtifactId,
					relation: occurrence.entry_kind === "slice" ? "slice-of" : occurrence.format_metadata?.kind === "pyinstaller-entry" && occurrence.format_metadata.bytecode_header === "derived" ? "derived-from" : isSourceMap ? mappedSource === undefined ? "contains" : "maps-source" : relationFor(occurrence.logical_path),
					occurrence_id: occurrence.occurrence_id
				};
				edges.push({
					edge_id: artifactEdgeId(semantic, occurrence),
					...semantic,
					producer: occurrence.entry_kind === "slice" ? producer ?? null : null,
					ordinal: edges.length
				});
			}
			return {
				edges,
				limitations
			};
		};
		resolveOccurrenceParents = (occurrences, byPath, expandedContainerIds) => {
			const root = { children: new Map() };
			for (const matches of byPath.values()) {
				const parents = matches.filter((occurrence) => occurrence.entry_kind === "directory" || expandedContainerIds.has(occurrence.occurrence_id));
				if (parents.length === 0) continue;
				if (parents.length > 1) {
					for (const parent of parents) if (parent.entry_kind === "directory") {
						parent.artifact_id = null;
						parent.hash_status = "unavailable";
						parent.limitations.push("This directory occurrence cannot be materialized because multiple directory entries share its logical path.");
					}
				}
				const path = matches[0]?.logical_path;
				if (path === undefined) continue;
				let branch = root;
				for (const segment of path.split("/")) {
					let child = branch.children.get(segment);
					if (child === undefined) {
						child = { children: new Map() };
						branch.children.set(segment, child);
					}
					branch = child;
				}
				branch.occurrences = parents;
			}
			const limitations = new Set();
			const unknownParentOccurrences = new Set();
			for (const occurrence of occurrences) {
				if (occurrence.entry_kind === "metadata") continue;
				const path = occurrence.logical_path;
				let branch = root;
				let parent;
				let ambiguousParentPath;
				let prefix = "";
				for (let start = 0;;) {
					const slash = path.indexOf("/", start);
					if (slash < 0) break;
					const segment = path.slice(start, slash);
					const child = branch.children.get(segment);
					if (child === undefined) break;
					branch = child;
					prefix = prefix.length === 0 ? segment : `${prefix}/${segment}`;
					const candidates = branch.occurrences ?? [];
					if (candidates.length === 1) {
						parent = candidates[0];
						ambiguousParentPath = undefined;
					} else if (candidates.length > 1) {
						parent = undefined;
						ambiguousParentPath = prefix;
					}
					start = slash + 1;
				}
				occurrence.parent_occurrence_id = parent?.occurrence_id ?? null;
				if (ambiguousParentPath !== undefined) {
					const limitation = `The parent occurrence for ${JSON.stringify(path)} is unknown because multiple observed directory or container occurrences share ${JSON.stringify(ambiguousParentPath)}.`;
					occurrence.limitations.push(limitation);
					limitations.add(limitation);
					unknownParentOccurrences.add(occurrence);
				}
			}
			return {
				limitations: [...limitations].sort(compareUnicodeCodePoints),
				unknownParentOccurrences
			};
		};
		classifyArtifactPath = (path) => {
			const lower = path.toLowerCase();
			if (lower.endsWith(".map")) return {
				kind: "source-map",
				format: "source-map"
			};
			if (isJavaScriptSourcePath(path)) return {
				kind: "javascript",
				format: "javascript-bundle"
			};
			if (/\.framework(?:\/|$)/u.test(lower)) return {
				kind: "framework",
				format: "file"
			};
			if (/\.(?:node|dylib|so)$/u.test(lower)) return {
				kind: lower.endsWith(".node") ? "native-addon" : "dynamic-library",
				format: "file"
			};
			if (lower.endsWith(".plist")) return {
				kind: "plist",
				format: "plist"
			};
			if (lower.endsWith(".entitlements")) return {
				kind: "entitlements",
				format: "entitlements"
			};
			return {
				kind: "resource",
				format: "file"
			};
		};
		classifyArtifactContent = (path, evidence, fileSize) => {
			const { prefix, asarHeader } = evidence;
			const contentFormat = classifyArtifactBytes(evidence, fileSize);
			const byPath = classifyArtifactPath(path);
			let role;
			if (contentFormat === "plist" && !hasBinaryPlistSignature(prefix) && ([
				"javascript",
				"source-map",
				"entitlements"
			].includes(byPath.kind) || path.toLowerCase().endsWith(".asar"))) role = byPath;
			else if (contentFormat === "file" && path.toLowerCase().endsWith(".asar") && asarHeader.state !== "rejected") {
				if (asarHeader.state === "limit") throw asarHeaderAdmissionFailure(asarHeader.admission, asarHeader.extents?.headerBytes);
				if (asarHeader.state === "matched") role = {
					kind: "container",
					format: "asar"
				};
				else role = artifactRoleForFormat(path, contentFormat);
			} else role = artifactRoleForFormat(path, contentFormat);
			return {
				...role,
				contentFormat
			};
		};
		artifactRoleForFormat = (path, format) => {
			const byPath = classifyArtifactPath(path);
			if (format === "file" || format === byPath.format) return byPath;
			if (format === "unknown") return {
				kind: "unknown",
				format
			};
			if (format === "zip") return {
				kind: "container",
				format: zipPackageFormatForPath(path) ?? format
			};
			if (format === "uefi") return {
				kind: "resource",
				format
			};
			if (format === "plist") return {
				kind: "plist",
				format
			};
			if (artifactFormatDescriptor(format)?.roleContainer === true) return {
				kind: "container",
				format
			};
			return {
				kind: ["native-addon", "dynamic-library"].includes(byPath.kind) ? byPath.kind : "executable",
				format
			};
		};
		classifyArtifactBytes = (evidence, fileSize) => {
			const { prefix, suffix, mzWindowsHeaderSignature, mzWindowsHeaderRecord } = evidence;
			const input = {
				prefix,
				fileSize,
				suffix
			};
			for (let recognition = recognizeArtifactFormat(input); recognition !== undefined; recognition = recognizeArtifactFormat(input, recognition.index + 1)) if (recognition.state === "recognized" && recognition.format !== "esp-flash-image") return recognition.format;
			if (hasXmlPlistSignature(prefix)) return "plist";
			const fatFormat = classifyFatArtifact(evidence, fileSize);
			if (fatFormat !== null) return fatFormat;
			const native = readNativeHeaderFormat(prefix, fileSize);
			if (!native.ok) return "unknown";
			if (native.value !== null) return native.value;
			if (prefix.length >= 2 && prefix[0] === 77 && prefix[1] === 90) {
				if (!Number.isSafeInteger(fileSize) || fileSize < prefix.length || prefix.length < Math.min(fileSize, 64)) return "unknown";
				const mzEvidence = parseMzHeaderEvidence(prefix, fileSize, mzWindowsHeaderSignature);
				const { windowsHeader } = mzEvidence;
				if (windowsHeader.state === "signature-needed") return "unknown";
				if (windowsHeader.state === "candidate") return "unknown";
				if (windowsHeader.state === "declared") {
					const windowsOffset = windowsHeader.offset;
					if (windowsHeader.signature === "PE" && windowsOffset >= 64) {
						const inline = windowsOffset < prefix.length ? prefix.subarray(windowsOffset) : undefined;
						const observed = mzWindowsHeaderRecord?.offset === windowsOffset ? mzWindowsHeaderRecord.bytes : undefined;
						const record = (observed?.length ?? 0) > (inline?.length ?? 0) ? observed : inline;
						if (record !== undefined && parsePeRecordStructure(record).ok) return "pe";
					}
					return "unknown";
				}
				if (mzEvidence.dos.ok) return "dos-mz";
				return "unknown";
			}
			return "file";
		};
		classifyFatArtifact = (evidence, fileSize) => {
			const { prefix, fatSliceHeaders } = evidence;
			const fatHeader = fatSliceHeaders?.header ?? readFatContainerHeader(prefix, fileSize);
			if (fatHeader.state === "needs-data" || fatHeader.state === "malformed") return "unknown";
			if (fatHeader.state === "not-fat") return null;
			const identity = classifyFatContainerEvidence(fatHeader, prefix, fatSliceHeaders?.sliceHeadersByOffset);
			return identity.state === "mach-o" ? "mach-o-universal" : "unknown";
		};
		relationFor = (path) => path.toLowerCase().includes(".framework/") ? "embeds" : "contains";
		depth = (path) => path.split("/").length;
	})))();
}

//#endregion
//#region dist/artifacts/inventory/classify.js
var classifyAndHashRootForInventory, classifyEmbeddedExecutablePackage, classifyRootFormat, readRootFatSliceHeaders, readRootMzWindowsHeaderRecord, assertAdmittedRootDigest;
function init_classify() {
	return (init_classify = __esmMin((() => {
		init_UefiFormatProbe();
		init_parseFailure();
		init_resources();
		init_inesContainer();
		init_artifactReaderLimits();
		init_espFlashLocation();
		init_artifactNameSelection();
		init_ArtifactEmbeddedFormatProbes();
		init_RegularFile();
		init_NodeSeaBlob();
		init_NodeSeaLocation();
		init_ArtifactGraphConstruction();
		init_binaryTarget();
		init_ArtifactClassificationProbe();
		init_zipPackageFormat();
		init_artifactFormats();
		init_binaryContainer();
		init_ArtifactHash();
		init_machoContainer();
		init_diskImageFormat();
		init_dfuse();
		init_dosMz();
		classifyAndHashRootForInventory = async (path, directory, expectedMetadata, options, probeFacts) => {
			if (directory && probeFacts !== undefined) {
				abortIfNeeded(options.signal);
				throw new ArtifactReaderFailure("integrity", `Root artifact changed before inventory: ${path}`, { integrityCheck: "container-identity" });
			}
			if (directory && options.expectedRootSha256 !== undefined) throw new ArtifactReaderFailure("integrity", `Artifact root changed after target admission: expected an admitted file at ${path}, observed a directory`, {
				integrityCheck: "container-identity",
				userMessage: "The opened file was replaced by a directory. Select the intended artifact and reopen it before retrying."
			});
			if (directory) return {
				format: "directory",
				digest: null,
				rootSource: undefined,
				readerAdmission: undefined
			};
			if (options.expectedRootSha256 !== undefined) await assertArtifactSelectedSource(path, options.selectedPath);
			const source = await openRootArtifact(path, options.resourceScope, options.signal);
			const { handle, initial } = source;
			let outcome;
			try {
				if (!sameRegularFileState(expectedMetadata, initial)) throw new ArtifactReaderFailure("integrity", `Root artifact changed before inventory: ${path}`, { integrityCheck: "container-identity" });
				const probes = new ArtifactEmbeddedFormatProbes(path, source, options.signal, probeFacts, options.readerLimits);
				const admittedDigest = options.expectedRootSha256 === undefined ? undefined : await classifyStableRootArtifactHandle(path, handle, initial, options.signal);
				if (admittedDigest !== undefined) assertAdmittedRootDigest(path, options.expectedRootSha256, admittedDigest.sha256);
				const classified = await classifyRootFormat(path, source, probes, options.signal, options.asarHeaderAdmission, options.selectedPath, options.espFlashSelection, options.readerLimits);
				const format = typeof classified === "string" ? classified : classified.kind;
				const digest = admittedDigest ?? await classifyStableRootArtifactHandle(path, handle, initial, options.signal);
				const retainSource = artifactFormatDescriptor(format)?.retainClassifiedSource === true;
				const bunRecognition = probes.completedFacts().bunStandalone;
				const seaRecognition = probes.completedFacts().nodeSeaRecognitionFailure;
				const recognitionLimitations = [...bunRecognition?.status === "limited" ? [`Bun graph recognition remains unknown: ${bunRecognition.failure.message}`] : [], ...seaRecognition === undefined ? [] : [`Node SEA recognition remains unknown: ${seaRecognition.message}`]];
				outcome = {
					kind: "completed",
					value: {
						format,
						digest,
						...recognitionLimitations.length === 0 ? {} : { recognitionLimitations },
						rootSource: retainSource ? source : undefined,
						readerAdmission: typeof classified !== "string" ? classified : retainSource ? source : undefined
					}
				};
			} catch (cause) {
				outcome = {
					kind: "failed",
					cause
				};
			}
			if (outcome.kind === "failed" || outcome.value.rootSource === undefined) {
				await releaseRootArtifact(path, source.owner, options.resourceScope, outcome.kind === "completed" ? {
					kind: "completed",
					digest: outcome.value.digest
				} : outcome, options.signal);
			}
			if (outcome.kind === "failed") throw outcome.cause;
			return outcome.value;
		};
		classifyEmbeddedExecutablePackage = async (probes, nativeFormat, signal) => {
			const sea = await probes.nodeSea();
			abortIfNeeded(signal);
			if (sea !== undefined) return {
				format: "node-sea",
				location: sea
			};
			const bun = await probes.bunStandalone();
			if (bun.status === "present") return {
				format: "bun-standalone",
				probe: bun
			};
			const deno = await probes.denoStandalone();
			if (deno.status === "present") return {
				format: "deno-standalone",
				probe: deno
			};
			const packaged = await probes.pyInstaller();
			abortIfNeeded(signal);
			if (nativeFormat !== "mach-o-universal") {
				const headerOffset = await probes.dotnetBundle();
				if (headerOffset !== undefined) return {
					format: "dotnet-bundle",
					headerOffset
				};
			}
			if (packaged !== undefined) return {
				format: "pyinstaller",
				cookie: packaged
			};
			return undefined;
		};
		classifyRootFormat = async (path, source, embeddedProbes, signal, asarHeaderAdmission, selectedPath, espFlashSelection, readerLimits = resolveArtifactReaderLimits()) => {
			const { handle } = source;
			const probe = createArtifactClassificationProbe(asarHeaderAdmission);
			const chunk = Buffer.alloc(64 * 1024);
			while (probe.length < probe.limit) {
				abortIfNeeded(signal);
				const read = await handle.read(chunk, 0, Math.min(chunk.length, probe.limit - probe.length), probe.length);
				abortIfNeeded(signal);
				if (read.bytesRead === 0) break;
				probe.write(chunk.subarray(0, read.bytesRead));
			}
			const archiveBytes = (await handle.stat()).size;
			const evidence = probe.finish(archiveBytes);
			abortIfNeeded(signal);
			try {
				await assertStableRegularFileIdentity(handle, path, source.initial, {
					symlinks: "reject",
					...signal === undefined ? {} : { signal }
				});
			} catch (cause) {
				if (cause instanceof RegularFileChangedError) throw new ArtifactReaderFailure("integrity", `Root artifact changed during classification: ${path}`, {
					cause: cause.cause ?? cause,
					integrityCheck: "container-identity"
				});
				throw artifactOperationCause(cause);
			}
			const read = async (position, length) => {
				const bytes = Buffer.alloc(length);
				let filled = 0;
				while (filled < length) {
					abortIfNeeded(signal);
					const observed = await handle.read(bytes, filled, length - filled, position + filled);
					abortIfNeeded(signal);
					if (observed.bytesRead === 0) break;
					filled += observed.bytesRead;
				}
				return bytes.subarray(0, filled);
			};
			const locateFlash = (selection, explicit) => locateEspFlashLayout(archiveBytes, read, selection, {
				explicit,
				...signal === undefined ? {} : { signal }
			});
			if (espFlashSelection !== undefined) {
				const selected = await locateFlash(espFlashSelection, true);
				if (!selected.ok) throw new ArtifactReaderFailure("unavailable", `ESP flash image layout is not recognized: ${selected.error}`);
				return {
					kind: "esp-flash-image",
					source,
					location: selected.value
				};
			}
			if (nesContainerFormat(evidence.prefix) !== undefined) {
				const parsed = parseInesLayout(evidence.prefix, archiveBytes);
				if (!parsed.ok) throw new ArtifactReaderFailure("format", parsed.error.detail, { cause: new ParseFailureError(parsed.error) });
				return "ines";
			}
			const classificationPath = artifactNameForClassification(selectedPath ?? path, path);
			const lower = classificationPath.toLowerCase();
			if (hasZipSignature(evidence.prefix)) return zipRootPackageFormat(lower);
			if (lower.endsWith(".pkg") && evidence.prefix.subarray(0, 4).equals(Buffer.from("xar!"))) return "pkg";
			if (lower.endsWith(".dmg") && await hasDiskImageSignature(archiveBytes, read)) return "dmg";
			if (await probeUefiFlashImage(handle, signal)) return "uefi";
			const pck = await embeddedProbes.godotPck(evidence.prefix);
			if (pck !== undefined) return {
				kind: "godot-pck",
				source,
				location: pck
			};
			const flash = await locateFlash({}, false);
			if (flash.ok) return {
				kind: "esp-flash-image",
				source,
				location: flash.value
			};
			const fatEvidence = await readRootFatSliceHeaders(handle, evidence, signal);
			const mzWindowsHeaderRecord = await readRootMzWindowsHeaderRecord(handle, fatEvidence, archiveBytes, signal);
			const mzWindowsHeaderSignature = mzWindowsHeaderRecord === undefined ? fatEvidence.mzWindowsHeaderSignature : {
				offset: mzWindowsHeaderRecord.offset,
				bytes: mzWindowsHeaderRecord.bytes.subarray(0, 4)
			};
			const suffix = fatEvidence.suffix === undefined && archiveBytes >= 16 && hasDfuSePrefix(evidence.prefix) ? await read(archiveBytes - 16, 16) : fatEvidence.suffix;
			const classificationEvidence = {
				...fatEvidence,
				...suffix === undefined ? {} : { suffix },
				...mzWindowsHeaderSignature === undefined ? {} : { mzWindowsHeaderSignature },
				...mzWindowsHeaderRecord === undefined ? {} : { mzWindowsHeaderRecord }
			};
			const format = classifyArtifactContent(classificationPath, classificationEvidence, archiveBytes).format;
			if ((format === "file" || format === "unknown") && !claimsExecutableHeader(evidence.prefix, archiveBytes) && await hasTrailingZipArchive(archiveBytes, read)) return zipRootPackageFormat(lower);
			if ([
				"elf",
				"pe",
				"mach-o",
				"mach-o-universal"
			].includes(format)) {
				const embedded = await classifyEmbeddedExecutablePackage(embeddedProbes, format, signal);
				if (embedded?.format === "node-sea") {
					const decoded = await decodeNodeSeaBlob(await readNodeSeaBlob(source, embedded.location, signal, readerLimits.node_sea), signal, readerLimits.node_sea);
					return {
						kind: "node-sea",
						source,
						location: embedded.location,
						decoded,
						limits: readerLimits.node_sea
					};
				}
				if (embedded?.format === "bun-standalone") return {
					kind: "bun-standalone",
					source,
					probe: embedded.probe
				};
				if (embedded?.format === "deno-standalone") return {
					kind: "deno-standalone",
					source,
					probe: embedded.probe
				};
				if (embedded?.format === "dotnet-bundle") return {
					kind: "dotnet-bundle",
					source,
					headerOffset: embedded.headerOffset
				};
				if (embedded?.format === "pyinstaller") return {
					kind: "pyinstaller",
					source,
					cookie: embedded.cookie,
					carrierPathDialect: format === "pe" ? "windows" : "posix"
				};
			}
			return format;
		};
		readRootFatSliceHeaders = async (handle, evidence, signal) => {
			const existing = evidence.fatSliceHeaders;
			if (existing === undefined) return evidence;
			const { header } = existing;
			const sliceHeadersByOffset = new Map(existing.sliceHeadersByOffset);
			for (let index = 0; index < header.slices.length; index += 1) {
				const slice = header.slices[index];
				const observed = slice === undefined ? undefined : sliceHeadersByOffset.get(slice.offset);
				if (slice === undefined || header.rangeIssues[index] !== null || slice.size < 4 || observed !== undefined && observed.magic !== null) continue;
				const headerLength = Math.min(12, slice.size);
				const thinHeader = Buffer.alloc(headerLength);
				let bytesRead = 0;
				while (bytesRead < thinHeader.length) {
					abortIfNeeded(signal);
					const read = await handle.read(thinHeader, bytesRead, thinHeader.length - bytesRead, slice.offset + bytesRead);
					abortIfNeeded(signal);
					if (read.bytesRead === 0) break;
					bytesRead += read.bytesRead;
				}
				sliceHeadersByOffset.set(slice.offset, readMachoHeaderPrefixFacts(thinHeader.subarray(0, bytesRead)));
			}
			return {
				...evidence,
				fatSliceHeaders: {
					header,
					sliceHeadersByOffset
				}
			};
		};
		readRootMzWindowsHeaderRecord = async (handle, evidence, fileSize, signal) => {
			const observation = observeMzWindowsHeader(evidence.prefix, fileSize);
			if (observation.state !== "signature-needed" && !(observation.state === "declared" && observation.signature === "PE")) return evidence.mzWindowsHeaderRecord;
			const { offset } = observation;
			if (!Number.isSafeInteger(offset) || offset < 0 || offset >= fileSize) return evidence.mzWindowsHeaderRecord;
			const window = Buffer.alloc(24 + MAX_PE_OPTIONAL_HEADER_BYTES);
			const existing = evidence.mzWindowsHeaderRecord?.offset === offset ? evidence.mzWindowsHeaderRecord.bytes : undefined;
			const inline = offset < evidence.prefix.length ? evidence.prefix.subarray(offset, Math.min(offset + 24 + MAX_PE_OPTIONAL_HEADER_BYTES, evidence.prefix.length)) : undefined;
			const known = existing !== undefined && (inline === undefined || existing.length > inline.length) ? existing : inline;
			known?.copy(window);
			let available = known?.length ?? 0;
			const requiredLength = () => {
				if (available < 2 || window[0] !== 80 || window[1] !== 69) return 2;
				if (available < 4 || window[2] !== 0 || window[3] !== 0) return 4;
				if (available < 24) return 24;
				const optionalHeaderSize = new BinaryReader(window, true, "pe").u16(20);
				return Math.min(24 + optionalHeaderSize, 24 + MAX_PE_OPTIONAL_HEADER_BYTES);
			};
			while (available < requiredLength() && offset + available < fileSize) {
				abortIfNeeded(signal);
				const length = Math.min(requiredLength() - available, fileSize - offset - available);
				const chunk = Buffer.alloc(length);
				const read = await handle.read(chunk, 0, length, offset + available);
				abortIfNeeded(signal);
				if (read.bytesRead === 0) break;
				chunk.copy(window, available, 0, read.bytesRead);
				available += read.bytesRead;
			}
			if (available === 0) return undefined;
			return {
				offset,
				bytes: window.subarray(0, available)
			};
		};
		assertAdmittedRootDigest = (path, expected, observed) => {
			if (expected !== undefined && observed !== expected) throw new ArtifactReaderFailure("integrity", `Artifact root changed after target admission at ${path}: expected ${expected}, observed ${observed}`, {
				integrityCheck: "container-identity",
				userMessage: "The artifact changed after it was opened. Reopen the selected artifact, then retry."
			});
		};
	})))();
}

//#endregion
//#region dist/artifacts/createArtifactReader.js
/** Construct a reader without acquiring or transferring its source ownership. */
function createArtifactReader(path, format, options) {
	const descriptor = ARTIFACT_FORMATS[format];
	return "createReader" in descriptor ? descriptor.createReader(path, options) : undefined;
}
function init_createArtifactReader() {
	return (init_createArtifactReader = __esmMin((() => {
		init_artifactFormats();
	})))();
}

//#endregion
//#region dist/artifacts/inventory/reader.js
var createReader, inventoryCoverage;
function init_reader() {
	return (init_reader = __esmMin((() => {
		init_HostPlatform();
		init_artifactFormats();
		init_createArtifactReader();
		init_zipPackageFormat();
		createReader = (path, format, environment, readerAdmission, asarHeaderAdmission, selectedPath, readerLimits, integrity) => {
			if (artifactFormatDescriptor(format)?.requiresDarwin === true && HOST_PLATFORM.platform !== "darwin") return undefined;
			return createArtifactReader(path, format, {
				environment,
				unreadableDirectories: "omit",
				admission: readerAdmission,
				asarHeaderAdmission,
				selectedPath,
				readerLimits,
				integrity
			});
		};
		inventoryCoverage = (format, reader, traversal) => {
			if (reader !== undefined) return {
				coverage: {
					scope: "container-entries",
					status: traversal.status
				},
				limitations: [
					...isZipPackageFormat(reader.format) ? [ZIP_NON_ENTRY_LIMITATION] : [],
					...artifactFormatDescriptor(reader.format)?.readerLimitation === undefined ? [] : [artifactFormatDescriptor(reader.format).readerLimitation],
					...traversal.limitations
				]
			};
			const absent = artifactFormatDescriptor(format)?.absentInventory ?? "root";
			if (absent === "platform") return {
				coverage: {
					scope: "container-entries",
					status: "unknown"
				},
				limitations: [`${format.toUpperCase()} root hash is observed; child inventory requires a native macOS adapter.`]
			};
			if (absent === "universal") return {
				coverage: {
					scope: "container-entries",
					status: "unknown"
				},
				limitations: ["Universal Mach-O slices require the native macOS lipo adapter."]
			};
			if (absent === "unavailable") return {
				coverage: {
					scope: "container-entries",
					status: "unknown"
				},
				limitations: [`${format} child inventory reader is unavailable.`]
			};
			return {
				coverage: {
					scope: "root",
					status: "complete"
				},
				limitations: ["Inventory covers root bytes only; child container entries were not examined."]
			};
		};
	})))();
}

//#endregion
//#region dist/artifacts/inventory/scanReader.js
var emptyScan, scanReader, containerContradiction, InventoryAcquisitionLimit, inventoryEntries, visitArtifactEntries, digestArtifactEntry, isExpandableAsar;
function init_scanReader() {
	return (init_scanReader = __esmMin((() => {
		init_artifactIntegrity();
		init_resources();
		init_ArtifactTraversalObservation();
		init_AsarArtifactReader();
		init_InesArtifactReader();
		init_ArtifactGraphConstruction();
		init_ArtifactHash();
		emptyScan = () => ({
			nodes: new Map(),
			occurrences: [],
			pendingContradictions: []
		});
		scanReader = async (reader, ownedReaders, signal, integrity = "fail", asarHeaderAdmission, acquisitionLimits) => {
			const { nodes, occurrences, pendingContradictions } = emptyScan();
			if (reader === undefined) return {
				nodes,
				occurrences,
				pendingContradictions,
				caseCollisionLimitation: undefined,
				inesRegionScan: undefined,
				parentResolution: {
					unknownParentOccurrences: new Set(),
					limitations: []
				},
				traversal: {
					status: "complete",
					limitations: []
				},
				rootContradiction: undefined
			};
			const context = {
				acquisitionLimits,
				entriesExamined: 0,
				bytesRead: 0,
				reader,
				signal,
				integrity,
				asarHeaderAdmission,
				nodes,
				occurrences,
				pendingContradictions,
				occurrenceCountByPath: new Map(),
				registry: new ArtifactPathRegistry(),
				expandedContainerIds: new Set(),
				ownedReaders,
				reconstruction: reader instanceof InesArtifactReader ? {
					hash: createHash("sha256"),
					regionOrder: [],
					bytes: 0
				} : undefined,
				traversal: new ArtifactTraversalObservation()
			};
			await visitArtifactEntries(context, reader, "");
			const rootContradiction = containerContradiction(reader, integrity);
			const byPath = indexDestinationOccurrencesByPath(occurrences);
			const parentResolution = resolveOccurrenceParents(occurrences, byPath, context.expandedContainerIds);
			return {
				nodes,
				occurrences,
				pendingContradictions,
				caseCollisionLimitation: annotateEnglishUnicodeCaseCollisions(occurrences),
				inesRegionScan: context.reconstruction === undefined ? undefined : {
					region_order: context.reconstruction.regionOrder,
					bytes: context.reconstruction.bytes,
					sha256: context.reconstruction.hash.digest("hex")
				},
				parentResolution,
				traversal: context.traversal.snapshot(),
				rootContradiction
			};
		};
		containerContradiction = (reader, integrity) => {
			const pair = reader.containerIntegrity?.();
			if (pair === undefined || pair.declared_crc32 === pair.observed_crc32) return undefined;
			if (integrity === "fail") throw new ArtifactReaderFailure("integrity", "Artifact integrity metadata disagrees with content: .", { integrityCheck: "declared-digest" }, artifactContainerIntegrityDetails(".", pair));
			return pair;
		};
		InventoryAcquisitionLimit = class extends ArtifactReaderFailure {
			constructor() {
				super("limit", "Artifact inventory acquisition allowance exhausted; member coverage is incomplete.");
			}
		};
		inventoryEntries = (context, reader, prefix) => declaredArtifactEntries(reader, context.signal, {
			onCoverage: context.traversal.record,
			...reader instanceof DirectoryArtifactReader && context.acquisitionLimits !== undefined ? { maximumEntries: context.acquisitionLimits.maximumEntries - context.entriesExamined } : {},
			onOmission: (omission) => context.traversal.omit({
				...omission,
				path: prefix.length === 0 ? omission.path : `${prefix}/${omission.path}`
			})
		})[Symbol.asyncIterator]();
		visitArtifactEntries = async (context, currentReader, prefix) => {
			const stack = [{
				reader: currentReader,
				prefix,
				containerId: null,
				iterator: inventoryEntries(context, currentReader, prefix)
			}];
			let failure;
			try {
				while (stack.length > 0) {
					const frame = stack.at(-1);
					if (frame === undefined) break;
					const next = await frame.iterator.next();
					if (next.done) {
						stack.pop();
						continue;
					}
					const entry = next.value;
					if (context.acquisitionLimits !== undefined && context.entriesExamined >= context.acquisitionLimits.maximumEntries) throw new InventoryAcquisitionLimit();
					context.entriesExamined += 1;
					const logicalPath = normalizeArtifactPath(frame.prefix.length === 0 ? entry.path : `${frame.prefix}/${entry.path}`);
					const expandableAsar = isExpandableAsar(entry, logicalPath);
					if (frame.reader.format !== "pyinstaller" && frame.reader.format !== "bun-standalone" && frame.reader.format !== "deno-standalone") context.registry.add(logicalPath, expandableAsar ? "directory" : entry.kind);
					const duplicateOrdinal = context.occurrenceCountByPath.get(logicalPath) ?? 0;
					context.occurrenceCountByPath.set(logicalPath, duplicateOrdinal + 1);
					const occurrence = createOccurrence(entry, logicalPath, entry.kind === "metadata" ? frame.containerId : null, {
						duplicateOrdinal,
						sourceFormat: frame.reader.format
					});
					let digested;
					try {
						digested = await digestArtifactEntry(context, frame.reader, entry, logicalPath, occurrence);
					} catch (cause) {
						if (!(cause instanceof DirectoryArtifactEntryAccessDenied) && !(cause instanceof ArtifactEntryContentUnavailable)) throw cause;
						abortIfNeeded(context.signal);
						const limitation = cause instanceof ArtifactEntryContentUnavailable ? cause.limitation : cause.message;
						const traversal = cause instanceof ArtifactEntryContentUnavailable ? cause.traversal : {
							status: "unknown",
							limitations: [limitation]
						};
						if (traversal !== undefined) context.traversal.record(traversal);
						occurrence.hash_status = "unavailable";
						occurrence.limitations.push(limitation);
					}
					if (digested === undefined) noteUnreadContainerSuffix(occurrence);
					else {
						context.nodes.set(digested.node.artifact_id, digested.node);
						occurrence.artifact_id = digested.node.artifact_id;
						const seaMainScript = entry.formatMetadata?.kind === "node-sea-entry" && entry.formatMetadata.role === "main-script";
						occurrence.artifact_kind = seaMainScript ? "javascript" : digested.classification.kind;
						occurrence.artifact_format = seaMainScript ? "javascript-bundle" : digested.classification.format;
						occurrence.hash_status = digested.mismatched ? "mismatched" : "verified";
						if (digested.mismatched) occurrence.limitations.push("Declared integrity metadata contradicts observed bytes.");
					}
					context.occurrences.push(occurrence);
					if (expandableAsar && digested !== undefined && digested.classification.format === "asar" && !digested.mismatched) {
						const nested = new AsarArtifactReader(entry.adapterKey, context.asarHeaderAdmission === undefined ? {} : { headerAdmission: context.asarHeaderAdmission });
						context.ownedReaders.push(nested);
						await nested.prepareContainer(digested.node.sha256, context.signal);
						context.expandedContainerIds.add(occurrence.occurrence_id);
						stack.push({
							reader: nested,
							prefix: logicalPath,
							containerId: occurrence.occurrence_id,
							iterator: inventoryEntries(context, nested, logicalPath)
						});
					}
				}
			} catch (cause) {
				if (cause instanceof InventoryAcquisitionLimit || cause instanceof DirectoryArtifactTraversalLimit) context.traversal.record({
					status: "unknown",
					limitations: [cause.message]
				});
				else failure = { cause };
			} finally {
				for (const { iterator, prefix, reader } of stack.reverse()) {
					try {
						await iterator.return?.();
					} catch (cause) {
						failure = { cause: ArtifactReaderFailure.withCleanup(failure === undefined ? cause : failure.cause, ArtifactReaderFailure.cleanupObservation(cause, `artifact traversal for ${prefix || reader.format}`)) };
					}
				}
			}
			if (failure !== undefined) throw failure.cause;
		};
		digestArtifactEntry = async (context, currentReader, entry, logicalPath, occurrence) => {
			if (entry.kind !== "file" && entry.kind !== "slice" || entry.encrypted) return undefined;
			if (context.acquisitionLimits !== undefined && entry.declaredSize !== null && entry.declaredSize > context.acquisitionLimits.maximumBytes - context.bytesRead) throw new InventoryAcquisitionLimit();
			const reconstruction = currentReader === context.reader ? context.reconstruction : undefined;
			if (reconstruction !== undefined && entry.byteOffset !== reconstruction.bytes) throw new ArtifactReaderFailure("integrity", "Noncontiguous iNES regions", { integrityCheck: "reconstruction" });
			const digest = await hashReadable(await currentReader.open(entry, context.signal), context.signal, entry.declaredIntegrity?.algorithm, context.asarHeaderAdmission, (chunk) => {
				if (context.acquisitionLimits !== undefined && chunk.length > context.acquisitionLimits.maximumBytes - context.bytesRead) throw new InventoryAcquisitionLimit();
				context.bytesRead += chunk.length;
				if (reconstruction !== undefined) {
					reconstruction.hash.update(chunk);
					reconstruction.bytes += chunk.length;
				}
			});
			reconstruction?.regionOrder.push(entry.path);
			const claim = entry.declaredIntegrity;
			const observed = claim?.algorithm === "md5" ? digest.md5 : digest.sha256;
			if (claim !== null && observed === undefined) throw new ArtifactReaderFailure("integrity", "The selected integrity digest was not computed", { integrityCheck: "declared-digest" });
			const mismatched = claim !== null && claim.digest !== observed;
			if (mismatched && claim !== null && observed !== undefined) {
				if (context.integrity === "fail") throw new ArtifactReaderFailure("integrity", `Artifact integrity metadata disagrees with content: ${logicalPath}`, { integrityCheck: "declared-digest" }, artifactIntegrityDetails(logicalPath, claim, observed, entry.unpacked));
				context.pendingContradictions.push({
					occurrence,
					integrity: artifactIntegrityPair(claim, observed),
					entryKind: entry.kind,
					unpacked: entry.unpacked
				});
			}
			const classified = entry.kind === "slice" ? {
				kind: "universal-slice",
				format: "mach-o",
				contentFormat: classifyArtifactBytes(digest, digest.bytes)
			} : classifyArtifactContent(logicalPath, digest, digest.bytes);
			return {
				node: createArtifactNode({
					sha256: digest.sha256,
					size: digest.bytes,
					format: classified.contentFormat,
					contentState: "embedded"
				}),
				mismatched,
				classification: classified
			};
		};
		isExpandableAsar = (entry, logicalPath) => entry.kind === "file" && logicalPath.toLowerCase().endsWith(".asar") && isAbsolute(entry.adapterKey);
	})))();
}

//#endregion
//#region dist/artifacts/inventory/scanCanonical.js
var scanCanonicalArtifactInventoryInScope, scanCanonicalArtifactInventoryForExtractionInScope, scanCanonical, cleanupInventoryOwners, buildInventorySnapshot, buildIntegrityContradictions, verifyRootDigest, sortNodes, sortOccurrences, sortEdges, buildManifest, buildLimitations;
function init_scanCanonical() {
	return (init_scanCanonical = __esmMin((() => {
		init_unicodeCodePointOrder();
		init_AsarArtifactReader();
		init_InesArtifactReader();
		init_ChangeTimeBaseline();
		init_zipPackageFormat();
		init_resources();
		init_artifactGraph();
		init_ArtifactGraphConstruction();
		init_artifactIdentity();
		init_classify();
		init_reader();
		init_scanReader();
		init_errorMessage();
		scanCanonicalArtifactInventoryInScope = async (path, options, readerFactory = createReader, selectedPath = path) => (await scanCanonical(path, options, readerFactory, "release", undefined, selectedPath)).snapshot;
		scanCanonicalArtifactInventoryForExtractionInScope = async (path, options, probeFacts, selectedPath = path) => scanCanonical(path, options, createReader, "transfer-source", probeFacts, selectedPath);
		scanCanonical = async (path, options, readerFactory, rootDisposition, probeFacts, selectedPath = path) => {
			const metadata = await settleChangeTimeBaseline(() => lstat(path), {
				environment: options.environment,
				signal: options.signal,
				cancellationError: (reason) => new ArtifactReaderFailure("cancelled", "Artifact inventory cancelled", { cause: reason })
			});
			const { format: rootFormat, digest: rootDigest, rootSource, readerAdmission, recognitionLimitations } = await classifyAndHashRootForInventory(path, metadata.isDirectory(), metadata, {
				...options,
				selectedPath
			}, probeFacts);
			let reader;
			let readerCreationFailure;
			try {
				reader = readerFactory(path, rootFormat, options.environment ?? {}, readerAdmission, options.asarHeaderAdmission, selectedPath, options.readerLimits, options.integrity);
			} catch (cause) {
				readerCreationFailure = { cause };
			}
			const ownedReaders = reader === undefined ? [] : [reader];
			let outcome;
			try {
				if (readerCreationFailure !== undefined) throw readerCreationFailure.cause;
				if (reader instanceof AsarArtifactReader) await reader.prepareContainer(rootDigest?.sha256, options.signal);
				const { nodes, occurrences, pendingContradictions, caseCollisionLimitation, inesRegionScan, parentResolution, traversal, rootContradiction } = await scanReader(reader, ownedReaders, options.signal, options.integrity, options.asarHeaderAdmission, options.acquisitionLimits);
				outcome = {
					kind: "completed",
					snapshot: await buildInventorySnapshot({
						path,
						metadata,
						rootFormat,
						rootDigest,
						rootSource,
						resourceScope: options.resourceScope,
						reader,
						signal: options.signal,
						nodes,
						occurrences,
						pendingContradictions,
						caseCollisionLimitation,
						inesRegionScan,
						parentResolution,
						traversal,
						rootContradiction,
						recognitionLimitations
					})
				};
			} catch (cause) {
				outcome = {
					kind: "failed",
					cause
				};
				if (rootFormat === "dmg" && cause instanceof ArtifactReaderFailure && cause.reason === "unavailable" && cause.partialObservation === undefined && options.signal?.aborted !== true) {
					let retained;
					let rootFailure;
					try {
						retained = await buildInventorySnapshot({
							path,
							metadata,
							rootFormat,
							rootDigest,
							rootSource,
							resourceScope: options.resourceScope,
							reader,
							signal: options.signal,
							nodes: new Map(),
							occurrences: [],
							pendingContradictions: [],
							caseCollisionLimitation: undefined,
							inesRegionScan: undefined,
							parentResolution: {
								unknownParentOccurrences: new Set(),
								limitations: []
							},
							rootContradiction: undefined,
							traversal: {
								status: "unknown",
								limitations: [`DMG child traversal was unavailable: ${cause.message}`]
							}
						});
					} catch (failure) {
						rootFailure = failure;
					}
					outcome = {
						kind: "failed",
						cause: new ArtifactReaderFailure(cause.reason, rootFailure === undefined ? cause.message : `${cause.message}; root observations could not be revalidated: ${errorMessage(rootFailure)}`, {
							cause: rootFailure === undefined ? cause : new AggregateError([cause, rootFailure], "DMG traversal and root revalidation failed", { cause }),
							cleanup: cause.cleanup,
							cleanupLeases: cause.cleanupLeases,
							...cause.primaryFacts(),
							...retained === undefined ? {} : { partialObservation: {
								kind: "artifact-inventory",
								inventory: retained
							} }
						}, cause.details)
					};
				}
			}
			const cleanup = await cleanupInventoryOwners({
				path,
				options,
				rootSource,
				ownedReaders,
				readerAdmission,
				outcome,
				rootDisposition: rootDisposition === "transfer-source" && outcome.kind === "completed" && rootSource !== undefined && (isZipPackageFormat(rootFormat) || rootFormat === "ines" || readerAdmission !== undefined && "kind" in readerAdmission) ? "transfer" : "release"
			});
			if (cleanup.failure !== undefined) throw cleanup.failure;
			if (cleanup.outcome.kind === "failed") throw cleanup.outcome.cause;
			return {
				snapshot: cleanup.outcome.snapshot,
				transferredSource: cleanup.transferred
			};
		};
		cleanupInventoryOwners = async ({ path, options, rootSource, ownedReaders, readerAdmission, outcome, rootDisposition }) => {
			let finalOutcome = outcome;
			let cleanupFailure;
			const observeCancellation = () => {
				if (finalOutcome.kind === "completed" && cleanupFailure === undefined && options.signal?.aborted === true) finalOutcome = {
					kind: "failed",
					cause: new ArtifactReaderFailure("cancelled", "Artifact inventory cancelled during finalization", {
						cause: options.signal.reason,
						partialObservation: {
							kind: "artifact-inventory",
							inventory: finalOutcome.snapshot
						}
					})
				};
			};
			observeCancellation();
			const readerOwners = [...ownedReaders].reverse().map((reader) => ({
				kind: "reader",
				reader,
				resource: `artifact reader for ${path}`
			}));
			const rootOwner = rootSource === undefined ? undefined : {
				kind: "file-handle",
				handle: rootSource.owner,
				resource: `root artifact descriptor for ${path}`
			};
			for (const owner of readerOwners) {
				const attempt = await options.resourceScope.release(owner);
				observeCancellation();
				if (attempt.kind === "released") continue;
				cleanupFailure = options.resourceScope.cleanupFailure(cleanupFailure === undefined ? finalOutcome : {
					kind: "failed",
					cause: cleanupFailure
				}, [attempt], outcome.kind === "completed" ? {
					kind: "artifact-inventory",
					inventory: outcome.snapshot
				} : undefined);
			}
			if (rootDisposition === "transfer" && finalOutcome.kind === "completed" && cleanupFailure === undefined && rootSource !== undefined && rootOwner !== undefined && readerAdmission !== undefined) return {
				failure: undefined,
				transferred: {
					owner: rootOwner,
					admission: readerAdmission
				},
				outcome: finalOutcome
			};
			if (rootOwner !== undefined) {
				const attempt = await options.resourceScope.release(rootOwner);
				observeCancellation();
				if (attempt.kind === "failed") cleanupFailure = options.resourceScope.cleanupFailure(cleanupFailure === undefined ? finalOutcome : {
					kind: "failed",
					cause: cleanupFailure
				}, [attempt], outcome.kind === "completed" ? {
					kind: "artifact-inventory",
					inventory: outcome.snapshot
				} : undefined);
			}
			return {
				failure: cleanupFailure,
				transferred: undefined,
				outcome: finalOutcome
			};
		};
		buildInventorySnapshot = async (input) => {
			const { path, metadata, rootFormat, rootDigest, rootSource, reader, signal } = input;
			materializeDirectoryNodes(input.occurrences, input.nodes);
			const rootNode = createRootNode({
				digest: rootDigest,
				occurrences: input.occurrences
			});
			input.nodes.set(rootNode.artifact_id, rootNode);
			rekeyOccurrences(rootNode.artifact_id, input.occurrences);
			const rootOccurrence = rootOccurrenceFor(rootNode, {
				size: metadata.size,
				executable: hostExecutableMarking(path, metadata),
				format: rootFormat,
				path,
				formatMetadata: reader?.formatMetadata?.()
			});
			rootOccurrence.limitations.push(...input.recognitionLimitations ?? []);
			for (const occurrence of input.occurrences) if (occurrence.parent_occurrence_id === null && !input.parentResolution.unknownParentOccurrences.has(occurrence)) occurrence.parent_occurrence_id = rootOccurrence.occurrence_id;
			input.occurrences.unshift(rootOccurrence);
			if (input.rootContradiction !== undefined) {
				rootOccurrence.hash_status = "mismatched";
				rootOccurrence.limitations.push("Declared integrity metadata contradicts observed bytes.");
				input.pendingContradictions.push({
					occurrence: rootOccurrence,
					integrity: input.rootContradiction,
					entryKind: "file",
					unpacked: false
				});
			}
			const occurrenceById = new Map(input.occurrences.map((occurrence) => [occurrence.occurrence_id, occurrence]));
			const integrityContradictions = buildIntegrityContradictions(input.pendingContradictions, occurrenceById, rootNode);
			const edgeResult = createArtifactEdges(rootNode.artifact_id, input.occurrences, input.traversal.status, reader?.provenance()[0]);
			const { edges } = edgeResult;
			const orderedNodes = sortNodes([...input.nodes.values()]);
			const orderedOccurrences = sortOccurrences(input.occurrences);
			const orderedEdges = sortEdges(edges).map((edge, ordinal) => ({
				...edge,
				ordinal
			}));
			await verifyRootDigest(path, rootDigest, rootSource, input.resourceScope, signal);
			const graphSha256 = artifactGraphDigest({
				nodes: orderedNodes,
				occurrences: orderedOccurrences,
				edges: orderedEdges,
				contradictions: integrityContradictions
			});
			const manifest = buildManifest({
				rootNode,
				rootFormat,
				graphSha256,
				orderedNodes,
				orderedOccurrences,
				orderedEdges
			});
			let ines;
			if (reader instanceof InesArtifactReader) {
				if (rootDigest === null || input.inesRegionScan === undefined) throw new ArtifactReaderFailure("integrity", "Missing iNES reconstruction scan", { integrityCheck: "inventory-node" });
				ines = await reader.verifyReconstruction(rootDigest.sha256, input.inesRegionScan, signal);
			}
			const traversal = inventoryCoverage(rootFormat, reader, input.traversal);
			const relationshipLimitations = [...input.parentResolution.limitations, ...edgeResult.limitations];
			const coverage = relationshipLimitations.length === 0 ? traversal.coverage : {
				...traversal.coverage,
				status: "unknown"
			};
			return {
				manifest,
				...ines === undefined ? {} : { ines },
				nodes: orderedNodes,
				occurrences: orderedOccurrences,
				edges: orderedEdges,
				provenance: reader?.provenance() ?? [],
				integrity_contradictions: integrityContradictions,
				coverage,
				limitations: buildLimitations([
					...ines === undefined ? [] : [inesInventoryLimitation(ines.header)],
					...traversal.limitations,
					...relationshipLimitations,
					...input.recognitionLimitations ?? []
				], integrityContradictions, input.caseCollisionLimitation)
			};
		};
		buildIntegrityContradictions = (pending, occurrenceById, rootNode) => pending.map((contradiction) => {
			const occurrence = contradiction.occurrence;
			const parent = occurrence.parent_occurrence_id === null ? undefined : occurrenceById.get(occurrence.parent_occurrence_id);
			const parentArtifactId = parent?.artifact_id ?? rootNode.artifact_id;
			return {
				contradiction_id: artifactContradictionId({
					rootArtifactId: rootNode.artifact_id,
					logicalPath: occurrence.logical_path,
					integrity: contradiction.integrity
				}),
				occurrence_id: occurrence.occurrence_id,
				parent_artifact_id: parentArtifactId,
				logical_path: occurrence.logical_path,
				...contradiction.integrity,
				entry_kind: contradiction.entryKind,
				unpacked: contradiction.unpacked,
				trust: "observed-untrusted",
				provenance: "container-integrity-metadata-versus-observed-bytes",
				limitations: ["Observed bytes contradict declared integrity metadata and cannot support equivalence."]
			};
		});
		verifyRootDigest = async (path, rootDigest, rootSource, resourceScope, signal) => {
			if (rootDigest === null) return;
			const verified = rootSource === undefined ? await hashStableRootArtifact(path, resourceScope, signal) : await hashStableRootArtifactHandle(path, rootSource.handle, rootSource.initial, signal);
			if (verified.sha256 !== rootDigest.sha256 || verified.bytes !== rootDigest.bytes) throw new ArtifactReaderFailure("integrity", "Root artifact changed during inventory", { integrityCheck: "container-identity" });
		};
		sortNodes = (nodes) => nodes.sort((left, right) => compareUnicodeCodePoints(left.artifact_id, right.artifact_id));
		sortOccurrences = (occurrences) => occurrences.sort((left, right) => compareUnicodeCodePoints(left.logical_path, right.logical_path));
		sortEdges = (edges) => edges.sort((left, right) => compareUnicodeCodePoints(left.edge_id, right.edge_id));
		buildManifest = ({ rootNode, rootFormat, graphSha256, orderedNodes, orderedOccurrences, orderedEdges }) => artifactInventoryResultSchema.shape.manifest.parse({
			manifest_id: artifactManifestId(rootNode.artifact_id, graphSha256),
			root_artifact_id: rootNode.artifact_id,
			root_sha256: rootNode.sha256,
			root_format: rootFormat,
			graph_sha256: graphSha256,
			node_count: orderedNodes.length,
			occurrence_count: orderedOccurrences.length,
			edge_count: orderedEdges.length
		});
		buildLimitations = (scopeLimitations, integrityContradictions, caseCollisionLimitation) => [
			...scopeLimitations,
			...caseCollisionLimitation === undefined ? [] : [caseCollisionLimitation],
			...integrityContradictions.length === 0 ? [] : [`${String(integrityContradictions.length)} integrity contradiction(s) were recorded; mismatched content is observed-untrusted.`]
		];
	})))();
}

//#endregion
export { ArtifactEmbeddedFormatProbes, AsarArtifactReader, InesArtifactReader, artifactFormatDescriptor, assertAdmittedRootDigest, classifyEmbeddedExecutablePackage, createArtifactReader, hashReadableToCompletion, init_ArtifactEmbeddedFormatProbes, init_ArtifactHash, init_AsarArtifactReader, init_InesArtifactReader, init_artifactFormats, init_classify, init_createArtifactReader, init_scanCanonical, scanCanonicalArtifactInventoryForExtractionInScope, scanCanonicalArtifactInventoryInScope };