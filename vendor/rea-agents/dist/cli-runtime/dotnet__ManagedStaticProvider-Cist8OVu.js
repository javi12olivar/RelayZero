import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisArtifactChangedError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_parseFailure, init_sha256Hex, malformedInput, parseFailureFromCause, sha256Hex, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { init_internalInvariant, invariantViolation } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { ArtifactReaderFailure, ArtifactResourceScope, RegularFileChangedError, RegularFileCleanupFailure, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedRegularFile, init_RegularFile, init_resources, regularFileCancellation } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_dosMz, init_peCoffHeader, init_peOptionalHeader, observeMzWindowsHeader, readPeCoffHeader, readPeOptionalHeaderDirectory, readPeOptionalHeaderFixedFields } from "./peOptionalHeader-DrZ2zQO-.js";
import { bindRegularFileCleanup, init_BoundedFileBytes, init_RegularFileRead, readBoundedFileBytes, withRegularFileCompletion } from "./RegularFileRead-CRu2Ia6l.js";
import { init_jsonStringByteLength, jsonStringByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { MANAGED_STATIC_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { ManagedHeapAmbiguityFailure, ManagedReaderFailure, appendManagedParseIssues, init_managedArtifact, init_managedModuleIdentity, init_managedReaderFailure, init_managedUnresolvedDefinitions, managedArtifactInspectionSchema, managedFailure, managedInspectionInputFailure, managedMemberInspectionSchema, managedMetadataFailureStatus, managedModuleRow, managedNativeBoundaryInspectionSchema, readDefinitionField, readManagedValue, uniqueManagedParseIssues } from "./managedInspectionEvidence-Cw9u32rc.js";
import { init_managedMemberInstructionFacts, isManagedMemberReferenceInstruction } from "./sessionToolContracts-D9XcfL6p.js";
import { decodePeMachine, init_peMachine } from "./machoLoadCommands-DCQgk7s-.js";
import { init_peSectionHeader, observePeHeaderExtent, readPeSectionHeader } from "./peSectionHeader-CdESy7pO.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { DEFAULT_MANAGED_SNAPSHOT_BYTES, init_managedInspectionLimits } from "./managedInspectionLimits-BiqjZJWO.js";
import { MANAGED_CODED_INDEXES, METADATA_TABLE_NAMES, ManagedRepresentationFailure, admitManagedProjection, decodeMetadataCodedIndex, init_managedCliHeaderPrefix, init_managedDecodeBudget, init_managedMemberOwnership, init_managedMemberPointers, init_managedMemberReferenceRows, init_managedMetadataHeaps, init_managedMetadataInventoryRows, init_managedMetadataLayout, init_managedSignatureTypeNames, init_managedTypeDefinitionRows, init_managedTypeNesting, init_managedTypeReferences, managedDecodeBudget, managedMetadataTypeNames, managedSignatureTypeNames, managedTypeReferences, memberDeclaringTypeRowLookup, memberListTable, metadataBlobOffset, metadataCodedIndexCoordinate, metadataRowCursor, metadataRowOffset, metadataToken, metadataTokenFact, readAssembly, readAssemblyReference, readCustomAttribute, readManagedCliHeaderPrefix, readManagedCompressedUnsigned, readManagedMetadataLayout, readManagedTypeNesting, readMemberReferenceRowFacts, readMetadataBlob, readMetadataString, readMetadataUserString, readModule, readRequiredMetadataName, readResource, readTypeDefinitionRowFacts, validatedMemberListStart } from "./managedMetadataInventoryRows-CkQns_7a.js";
import { MANAGED_TOOL_CONTRACTS, init_managedToolContracts, managedMembersInputSchema, managedTargetInputSchema } from "./managedToolContracts-DCzEqSx6.js";
import { classifyBinaryTargetFilesystemFailure, init_binaryTargetFilesystemFailure } from "./binaryTargetFilesystemFailure-Jtx2RF9Z.js";
import { init_ManagedStaticProviderMetadata, managedStaticCapabilities } from "./binary-Ldu-KATf.js";
import { createHash } from "node:crypto";

//#region dist/domain/managed/managedPeReader.js
var managedCli32BitRequirement, managedCliIsMixedClrNative, requireRange, add, architectureFor, resolveRva, mapRva, readDirectory, readCliHeader, readCoffHeader, readOptionalHeader, readSections, readCliDirectory, readManagedPeLayout;
function init_managedPeReader() {
	return (init_managedPeReader = __esmMin((() => {
		init_binaryContainer();
		init_dosMz();
		init_peOptionalHeader();
		init_peSectionHeader();
		init_peCoffHeader();
		init_peMachine();
		init_managedCliHeaderPrefix();
		init_managedReaderFailure();
		managedCli32BitRequirement = (flags) => {
			const pair = flags & 131074;
			if (pair === 2) return "required";
			return pair === 131074 ? "preferred" : "none";
		};
		managedCliIsMixedClrNative = (cli) => (cli.flags & 1) === 0 && !cli.readyToRunSignature;
		requireRange = (bytes, offset, length, scope) => {
			if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || offset < 0 || length < 0 || offset > bytes.length - length) throw managedFailure("invalid-directory", scope, `${scope} leaves the artifact byte range`, Number.isSafeInteger(offset) && offset >= 0 ? offset : null);
		};
		add = (left, right, scope) => {
			const result = left + right;
			if (!Number.isSafeInteger(result) || result < left) throw managedFailure("invalid-directory", scope, `${scope} offset arithmetic overflowed`, left);
			return result;
		};
		architectureFor = (machine, managed) => {
			const decoded = decodePeMachine(machine);
			if (decoded === undefined || decoded.nativeOsOverride && !managed) throw managedFailure("invalid-directory", "pe.machine", `Unsupported PE machine 0x${machine.toString(16).padStart(4, "0")}`);
			return decoded.architecture;
		};
		resolveRva = (mapping) => {
			const { bytes, sections, rva, size, scope } = mapping;
			if (!Number.isSafeInteger(rva) || !Number.isSafeInteger(size) || rva < 0 || size < 0 || rva > 4294967295 || size > 0 && size > 4294967296 - rva) throw managedFailure("invalid-directory", scope, `${scope} has an invalid RVA range`);
			const mapped = sections.filter((section) => {
				if (section.virtualSize === 0) return false;
				const end = section.virtualAddress + section.virtualSize;
				return size === 0 ? rva >= section.virtualAddress && rva < end : rva < end && rva + size > section.virtualAddress;
			});
			const selected = mapped.find((section) => {
				const within = rva - section.virtualAddress;
				return within >= 0 && size <= section.virtualSize - within;
			});
			if (selected === undefined) throw managedFailure("invalid-directory", scope, `${scope} RVA is not covered by one PE section`);
			if (mapped.length > 1) throw managedFailure("invalid-directory", scope, `${scope} RVA range has ambiguous overlapping PE section mappings`);
			const within = rva - selected.virtualAddress;
			if (within > selected.rawSize || size > selected.rawSize - within) throw managedFailure("invalid-directory", scope, `${scope} occupies virtual bytes without file-backed data`);
			const offset = add(selected.rawOffset, within, scope);
			requireRange(bytes, offset, size, scope);
			let available = Math.min(selected.virtualSize - within, selected.rawSize - within, bytes.length - offset, 4294967296 - rva);
			for (const section of sections) if (section !== selected && section.virtualAddress > rva && section.virtualSize > 0) available = Math.min(available, section.virtualAddress - rva);
			return {
				offset,
				available
			};
		};
		mapRva = (mapping) => mapping.rva === 0 && mapping.size === 0 ? 0 : resolveRva(mapping).offset;
		readDirectory = (reader, offset) => {
			requireRange(reader.bytes, offset, 8, "pe.data-directory");
			return {
				rva: reader.u32(offset),
				size: reader.u32(offset + 4)
			};
		};
		readCliHeader = (bytes, sections, directory) => {
			if (directory.size < 72) throw managedFailure("invalid-cli-header", "cli.header", "CLI header is shorter than the required 72 bytes");
			const offset = mapRva({
				bytes,
				sections,
				rva: directory.rva,
				size: 16,
				scope: "cli.header"
			});
			const prefix = readManagedCliHeaderPrefix(bytes.subarray(offset, offset + 16));
			if (!prefix.ok) throw managedFailure("invalid-cli-header", "cli.header", prefix.error.message, offset);
			const { headerSize, runtimeMajor, runtimeMinor, metadata } = prefix.value;
			if (headerSize < 72 || headerSize > directory.size) throw managedFailure("invalid-cli-header", "cli.header", "CLI header size is outside its PE data directory", offset);
			mapRva({
				bytes,
				sections,
				rva: directory.rva,
				size: headerSize,
				scope: "cli.header"
			});
			if (metadata.rva === 0 || metadata.size === 0) throw managedFailure("invalid-cli-header", "cli.metadata", "CLI metadata directory is absent", offset + 8);
			const reader = new BinaryReader(bytes, true, "managed-pe");
			const flags = reader.u32(offset + 16);
			const managedNativeHeader = readDirectory(reader, offset + 64);
			let readyToRunSignature = false;
			if (managedNativeHeader.rva !== 0 && managedNativeHeader.size >= 4) {
				const nativeOffset = mapRva({
					bytes,
					sections,
					rva: managedNativeHeader.rva,
					size: 4,
					scope: "cli.managed-native-header"
				});
				readyToRunSignature = reader.u32(nativeOffset) === 5395538;
			}
			return {
				headerOffset: offset,
				headerSize,
				runtimeMajor,
				runtimeMinor,
				metadata,
				flags,
				entryPoint: reader.u32(offset + 20),
				resources: readDirectory(reader, offset + 24),
				strongName: readDirectory(reader, offset + 32),
				managedNativeHeader,
				readyToRunSignature
			};
		};
		readCoffHeader = (bytes) => {
			const observed = observeMzWindowsHeader(bytes);
			if (observed.state === "candidate" || observed.state === "signature-needed") requireRange(bytes, observed.offset, 24, "pe.coff-header");
			if (observed.state !== "declared" || observed.signature !== "PE") throw managedFailure("invalid-directory", "pe.signature", "MZ header does not declare a PE image", 60);
			const peOffset = observed.offset;
			requireRange(bytes, peOffset, 24, "pe.coff-header");
			const coff = peOffset + 4;
			const parsed = readPeCoffHeader(bytes.subarray(coff, coff + 20));
			if (!parsed.ok) throw managedFailure("invalid-directory", "pe.coff-header", parsed.error.message, peOffset);
			const { machine, sectionCount, optionalHeaderSize: optionalSize, characteristics } = parsed.value;
			if (sectionCount === 0) throw managedFailure("invalid-directory", "pe.sections", "PE section count must be positive", coff + 2);
			return {
				coff,
				machine,
				sectionCount,
				optionalSize,
				characteristics
			};
		};
		readOptionalHeader = (bytes, coff) => {
			const optionalOffset = coff.coff + 20;
			requireRange(bytes, optionalOffset, coff.optionalSize, "pe.optional-header");
			if (coff.optionalSize < 96) throw managedFailure("invalid-directory", "pe.optional-header", "PE optional header is too short", optionalOffset);
			const parsed = readPeOptionalHeaderFixedFields(bytes.subarray(optionalOffset, optionalOffset + coff.optionalSize));
			if (!parsed.ok) throw managedFailure("invalid-directory", "pe.optional-header", "PE optional header magic is unsupported", optionalOffset);
			return {
				optionalOffset,
				optionalHeader: parsed.value.format,
				fixed: parsed.value
			};
		};
		readSections = (bytes, sectionTableOffset, sectionCount) => {
			const sections = [];
			for (let index = 0; index < sectionCount; index += 1) {
				const offset = sectionTableOffset + index * 40;
				const parsed = readPeSectionHeader(bytes.subarray(offset, offset + 40));
				if (!parsed.ok) throw managedFailure("invalid-directory", "pe.sections", parsed.error.message, offset);
				const section = {
					virtualSize: parsed.value.virtual_size,
					virtualAddress: parsed.value.virtual_address,
					rawSize: parsed.value.raw_size,
					rawOffset: parsed.value.offset
				};
				if (section.rawSize > 0) requireRange(bytes, section.rawOffset, section.rawSize, "pe.section-data");
				sections.push(section);
			}
			return sections;
		};
		readCliDirectory = (bytes, coff, optional) => {
			const observed = readPeOptionalHeaderDirectory(bytes.subarray(optional.optionalOffset, optional.optionalOffset + coff.optionalSize), optional.fixed, 14);
			const countOffset = optional.optionalOffset + optional.fixed.directoryCountOffset;
			if (observed.state === "count-unavailable") return {
				kind: "unreadable",
				issue: {
					code: "invalid-directory",
					scope: "pe.optional-header",
					detail: "PE optional header does not contain its directory count",
					offset: countOffset
				}
			};
			if (observed.state === "absent") return { kind: "absent" };
			if (observed.state === "truncated") return {
				kind: "unreadable",
				issue: {
					code: "invalid-directory",
					scope: "pe.data-directories",
					detail: "PE data-directory count exceeds the optional-header extent",
					offset: countOffset
				}
			};
			const directory = {
				rva: observed.directory.address,
				size: observed.directory.size
			};
			return directory.rva !== 0 || directory.size !== 0 ? {
				kind: "present",
				directory
			} : { kind: "absent" };
		};
		readManagedPeLayout = (bytes) => {
			requireRange(bytes, 0, 64, "pe.dos-header");
			if (bytes[0] !== 77 || bytes[1] !== 90) throw managedFailure("invalid-directory", "pe.dos-header", "Artifact does not start with an MZ header", 0);
			const coff = readCoffHeader(bytes);
			const optional = readOptionalHeader(bytes, coff);
			const { sectionTableOffset, sectionTableBytes, sizeOfHeadersState } = observePeHeaderExtent({
				optionalHeaderOffset: optional.optionalOffset,
				optionalHeaderSize: coff.optionalSize,
				sectionCount: coff.sectionCount,
				sizeOfHeaders: optional.fixed.sizeOfHeaders,
				fileSize: bytes.length
			});
			requireRange(bytes, sectionTableOffset, sectionTableBytes, "pe.sections");
			const extentIssue = sizeOfHeadersState === "valid" ? null : {
				code: "invalid-directory",
				scope: "pe.optional-header",
				detail: sizeOfHeadersState === "before-section-table-end" ? "PE SizeOfHeaders ends before the section table ends" : "PE SizeOfHeaders extends past the end of the file",
				offset: optional.optionalOffset + 60
			};
			const sections = extentIssue === null ? readSections(bytes, sectionTableOffset, coff.sectionCount) : [];
			const cliDirectoryRead = readCliDirectory(bytes, coff, optional);
			const cliDirectoryState = extentIssue !== null && cliDirectoryRead.kind === "absent" ? "unreadable" : cliDirectoryRead.kind;
			let cli = null;
			let cliIssue = extentIssue ?? (cliDirectoryRead.kind === "unreadable" ? cliDirectoryRead.issue : null);
			if (cliIssue === null && cliDirectoryRead.kind === "present") {
				try {
					cli = readCliHeader(bytes, sections, cliDirectoryRead.directory);
				} catch (cause) {
					if (!(cause instanceof ManagedReaderFailure)) throw cause;
					cliIssue = cause.issue;
				}
			}
			return {
				machine: coff.machine,
				architecture: architectureFor(coff.machine, cliDirectoryState !== "absent"),
				optionalHeader: optional.optionalHeader,
				sectionCount: coff.sectionCount,
				characteristics: coff.characteristics,
				sections,
				cli,
				cliDirectoryState,
				cliIssue,
				rvaToOffset: (rva, size, scope) => mapRva({
					bytes,
					sections,
					rva,
					size,
					scope
				}),
				rvaFileRange: (rva, scope) => resolveRva({
					bytes,
					sections,
					rva,
					size: 1,
					scope
				})
			};
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedMetadataInventory.js
var readManagedResourceDirectory, readRows, validateIdentityTableCounts, readManagedModuleIdentity, readReferences, readResources, readAttributes, readManagedMetadataInventory, unresolvedModuleMetadata, managedTableRowCounts;
function init_managedMetadataInventory() {
	return (init_managedMetadataInventory = __esmMin((() => {
		init_managedMetadataLayout();
		init_managedMetadataInventoryRows();
		init_managedMetadataHeaps();
		init_managedReaderFailure();
		readManagedResourceDirectory = (pe, issues) => {
			const resources = pe.cli?.resources;
			if (resources === undefined || resources.rva === 0 && resources.size === 0) return null;
			return readManagedValue(() => ({
				offset: pe.rvaToOffset(resources.rva, resources.size, "cli.resources"),
				size: resources.size
			}), issues) ?? null;
		};
		readRows = (descriptor, read) => {
			const total = descriptor?.rowCount ?? 0;
			const items = [];
			for (let index = 0; index < total; index += 1) {
				const item = read(index + 1);
				if (item !== undefined) items.push(item);
			}
			return items;
		};
		validateIdentityTableCounts = (layout, issues) => {
			const moduleRows = layout.table(0)?.rowCount ?? 0;
			if (moduleRows !== 1) issues.push({
				code: "invalid-row",
				scope: "metadata.Module",
				offset: layout.table(0)?.offset ?? null,
				detail: `Module table must contain exactly one row; found ${String(moduleRows)}`
			});
			const assemblyRows = layout.table(32)?.rowCount ?? 0;
			if (assemblyRows > 1) issues.push({
				code: "invalid-row",
				scope: "metadata.Assembly",
				offset: layout.table(32)?.offset ?? null,
				detail: `Assembly table can contain at most one row; found ${String(assemblyRows)}`
			});
		};
		readManagedModuleIdentity = (bytes, layout) => {
			const issues = layout.guid.issue === null ? [] : [layout.guid.issue];
			if (layout.blob?.issue) issues.push(layout.blob.issue);
			if (layout.strings.issue !== null) issues.push(layout.strings.issue);
			validateIdentityTableCounts(layout, issues);
			const row = readManagedValue(() => readModule(bytes, layout, issues), issues);
			return {
				module: row?.name === null ? null : row ?? null,
				unresolvedModuleName: row?.name === null ? row : null,
				issues
			};
		};
		readReferences = (bytes, layout, issues) => {
			const referenceNames = new Set();
			const references = readRows(layout.table(35), (row) => {
				const observed = readManagedValue(() => readAssemblyReference(bytes, layout, row), issues);
				if (observed === undefined) return undefined;
				referenceNames.add(observed.name);
				return observed.reference ?? undefined;
			});
			return {
				references,
				referenceNames: [...referenceNames].sort()
			};
		};
		readResources = ({ bytes, layout, resourceDirectory, issues }) => readRows(layout.table(40), (row) => readManagedValue(() => readResource({
			bytes,
			layout,
			row,
			directory: resourceDirectory,
			issues
		}), issues));
		readAttributes = (bytes, layout, issues, memberLists, typeNames) => {
			const attributes = readRows(layout.table(12), (row) => readManagedValue(() => readCustomAttribute(bytes, layout, row, issues, memberLists, typeNames), issues));
			const targetFrameworks = new Set();
			for (const attribute of attributes) {
				if (attribute.parent_token === metadataToken(32, 1) && attribute.type_name === "System.Runtime.Versioning.TargetFrameworkAttribute" && attribute.decoded_fixed_string !== null) targetFrameworks.add(attribute.decoded_fixed_string);
			}
			return {
				attributes,
				targetFrameworks: [...targetFrameworks].sort()
			};
		};
		readManagedMetadataInventory = (bytes, layout, resourceDirectory, memberLists, identity = readManagedModuleIdentity(bytes, layout), typeNames) => {
			const issues = [...memberLists.issues];
			appendManagedParseIssues(issues, identity.issues);
			const { module, unresolvedModuleName } = identity;
			const assembly = readManagedValue(() => readAssembly(bytes, layout), issues) ?? null;
			const { references, referenceNames } = readReferences(bytes, layout, issues);
			const resources = readResources({
				bytes,
				layout,
				resourceDirectory,
				issues
			});
			const { attributes, targetFrameworks } = readAttributes(bytes, layout, issues, memberLists, typeNames ?? managedMetadataTypeNames(bytes, layout, issues));
			return {
				module,
				unresolvedModuleName,
				assembly,
				targetFrameworks,
				referenceNames,
				references,
				resources,
				attributes,
				issues: uniqueManagedParseIssues(issues)
			};
		};
		unresolvedModuleMetadata = (identity) => identity.unresolvedModuleName === null ? {} : { unresolved_module_name: identity.unresolvedModuleName };
		managedTableRowCounts = (layout) => Object.fromEntries([...layout.tables.values()].map(({ index, rowCount }) => [METADATA_TABLE_NAMES[index] ?? `Table${String(index)}`, rowCount]));
	})))();
}

//#endregion
//#region dist/domain/managed/managedTypeMemberLists.js
var readTypeMemberListFacts;
function init_managedTypeMemberLists() {
	return (init_managedTypeMemberLists = __esmMin((() => {
		init_managedDecodeBudget();
		init_managedMetadataHeaps();
		init_managedMemberPointers();
		init_managedTypeDefinitionRows();
		readTypeMemberListFacts = (bytes, layout) => {
			const fields = memberListTable(layout, 4);
			const methods = memberListTable(layout, 6);
			const rows = [];
			const issues = [];
			const types = layout.table(2);
			const typeCount = types?.rowCount ?? 0;
			managedDecodeBudget(layout).reserve(typeCount * 640 + 256, types?.offset ?? null);
			for (let row = 1; row <= typeCount; row += 1) {
				const source = readTypeDefinitionRowFacts(bytes, layout, row);
				const field = {
					offset: source.fieldListOffset,
					raw: source.fieldListRaw
				};
				const method = {
					offset: source.methodListOffset,
					raw: source.methodListRaw
				};
				const entry = {
					source,
					field: {
						...field,
						value: validatedMemberListStart(field.raw, fields)
					},
					method: {
						...method,
						value: validatedMemberListStart(method.raw, methods)
					}
				};
				rows.push(entry);
				for (const [name, start, table] of [[
					"FieldList",
					entry.field,
					fields
				], [
					"MethodList",
					entry.method,
					methods
				]]) if (start.value === null) {
					managedDecodeBudget(layout).reserve(512, start.offset);
					issues.push({
						code: "invalid-row",
						scope: `metadata.TypeDef:${metadataToken(2, row)}`,
						offset: start.offset,
						detail: `TypeDef ${name} start ${String(start.raw)} is outside the one-based list range 1..${String((table?.rowCount ?? 0) + 1)}`
					});
				}
			}
			const nonmonotonicFields = new Set();
			const nonmonotonicMethods = new Set();
			const previousKnown = {
				field: -1,
				method: -1
			};
			for (const [index, entry] of rows.entries()) {
				for (const [name, member, affected] of [[
					"FieldList",
					"field",
					nonmonotonicFields
				], [
					"MethodList",
					"method",
					nonmonotonicMethods
				]]) {
					const after = entry[member];
					if (after.value === null) continue;
					const preceding = previousKnown[member];
					const before = rows[preceding]?.[member];
					previousKnown[member] = index;
					if (before !== undefined && before.value !== null && after.value < before.value) {
						managedDecodeBudget(layout).reserve(512, after.offset);
						affected.add(preceding);
						affected.add(index);
						issues.push({
							code: "invalid-row",
							scope: `metadata.TypeDef:${metadataToken(2, index + 1)}`,
							offset: after.offset,
							detail: `TypeDef ${name} start ${String(after.raw)} decreases from preceding start ${String(before.raw)}; affected member ranges are unknown`
						});
					}
				}
			}
			const entries = rows.map((entry, index) => {
				const next = rows[index + 1];
				return {
					source: entry.source,
					field: {
						start: {
							...entry.field,
							value: nonmonotonicFields.has(index) ? null : entry.field.value
						},
						end: next === undefined ? (fields?.rowCount ?? 0) + 1 : nonmonotonicFields.has(index) || nonmonotonicFields.has(index + 1) ? null : next.field.value
					},
					method: {
						start: {
							...entry.method,
							value: nonmonotonicMethods.has(index) ? null : entry.method.value
						},
						end: next === undefined ? (methods?.rowCount ?? 0) + 1 : nonmonotonicMethods.has(index) || nonmonotonicMethods.has(index + 1) ? null : next.method.value
					}
				};
			});
			return {
				entries,
				issues
			};
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedArtifactInspector.js
var flagNames, cliProjection, peProjection, base, unavailableResult, runtimeFamilyFromCliHeader, runtimeFamilyFor, implementationFor, managedArchitectureFor, runtimeClassification, partialMetadataResult, inspectManagedArtifactBytes;
function init_ManagedArtifactInspector() {
	return (init_ManagedArtifactInspector = __esmMin((() => {
		init_managedDecodeBudget();
		init_managedArtifact();
		init_managedPeReader();
		init_managedMetadataInventory();
		init_managedMetadataLayout();
		init_managedTypeMemberLists();
		init_managedReaderFailure();
		flagNames = (flags) => {
			const names = [];
			for (const [mask, name] of [
				[1, "il-only"],
				[2, "32-bit-required"],
				[4, "il-library"],
				[8, "strong-name-signed"],
				[16, "native-entry-point"],
				[65536, "track-debug-data"],
				[131072, "32-bit-preferred"]
			]) if ((flags & mask) !== 0) names.push(name);
			return names;
		};
		cliProjection = (cli) => ({
			header_offset: cli.headerOffset,
			header_size: cli.headerSize,
			runtime_version: `${String(cli.runtimeMajor)}.${String(cli.runtimeMinor)}`,
			flags: cli.flags,
			flag_names: flagNames(cli.flags),
			entry_point: cli.entryPoint === 0 ? {
				kind: "none",
				value: null
			} : (cli.flags & 16) !== 0 ? {
				kind: "native-rva",
				value: `0x${cli.entryPoint.toString(16)}`
			} : {
				kind: "metadata-token",
				value: `0x${cli.entryPoint.toString(16).padStart(8, "0")}`
			},
			metadata_rva: cli.metadata.rva,
			metadata_size: cli.metadata.size,
			resources_rva: cli.resources.rva,
			resources_size: cli.resources.size,
			strong_name_rva: cli.strongName.rva,
			strong_name_size: cli.strongName.size,
			managed_native_header_rva: cli.managedNativeHeader.rva,
			managed_native_header_size: cli.managedNativeHeader.size,
			ready_to_run_signature: cli.readyToRunSignature
		});
		peProjection = (layout) => ({
			machine: layout.machine,
			machine_hex: `0x${layout.machine.toString(16).padStart(4, "0")}`,
			architecture: layout.architecture,
			optional_header: layout.optionalHeader,
			section_count: layout.sectionCount,
			characteristics: layout.characteristics,
			cli: layout.cli === null ? null : cliProjection(layout.cli)
		});
		base = (target, bytes, layout) => ({
			artifact: {
				path: target.path,
				sha256: target.sha256,
				byte_length: bytes.length,
				format: "pe"
			},
			pe: peProjection(layout)
		});
		unavailableResult = (target, bytes, layout) => {
			const malformed = layout.cliDirectoryState !== "absent";
			const issues = layout.cliIssue === null ? [] : [layout.cliIssue];
			const limitation = layout.cliDirectoryState === "unreadable" ? layout.cliIssue?.detail ?? "The PE CLI directory could not be read." : malformed ? "The PE declares a CLI directory, but its CLI header could not be admitted." : "The PE has no CLI data directory; managed metadata and CIL are unavailable.";
			return managedArtifactInspectionSchema.parse(admitManagedProjection({
				...base(target, bytes, layout),
				classification: {
					status: malformed ? "malformed" : "not-managed",
					container: "pe",
					runtime_family: "unknown",
					implementation: malformed ? "unknown" : "not-managed",
					managed_architecture: "unknown",
					evidence: [{
						code: malformed ? "cli-directory-malformed" : "cli-directory-absent",
						detail: limitation,
						file_offset: layout.cliIssue?.offset ?? null
					}]
				},
				metadata: {
					status: malformed ? "malformed" : "absent",
					version: null,
					stream_names: [],
					table_row_counts: {}
				},
				module: null,
				assembly: null,
				target_frameworks: [],
				references: [],
				resources: [],
				attributes: [],
				coverage: {
					state: malformed ? "partial" : "unavailable",
					issues
				},
				limitations: [limitation]
			}));
		};
		runtimeFamilyFromCliHeader = (cli) => cli?.readyToRunSignature === true ? "modern-dotnet" : cli !== null && managedCliIsMixedClrNative(cli) ? "mixed-clr-native" : "unknown";
		runtimeFamilyFor = (cli, inventory, metadata, layout) => {
			const evidence = [{
				code: "cli-header-observed",
				detail: "A file-backed PE CLI header and metadata root were admitted.",
				file_offset: cli.headerOffset
			}];
			const frameworks = inventory.targetFrameworks;
			const hasUnity = inventory.referenceNames.some((name) => name === "UnityEngine" || name.startsWith("UnityEngine."));
			const hasFrameworkTarget = frameworks.some((value) => value.startsWith(".NETFramework,"));
			const hasModernTarget = frameworks.some((value) => value.startsWith(".NETCoreApp,"));
			const hasStandardTarget = frameworks.some((value) => value.startsWith(".NETStandard,"));
			if (cli.readyToRunSignature) evidence.push({
				code: "ready-to-run-signature-observed",
				detail: "The managed native header has the ReadyToRun signature.",
				file_offset: layout.rvaToOffset(cli.managedNativeHeader.rva, 4, "cli.managed-native-header")
			});
			if (hasUnity) evidence.push({
				code: "unity-reference-observed",
				detail: "The admitted AssemblyRef table contains a UnityEngine reference.",
				file_offset: metadata.table(35)?.offset ?? null
			});
			if (hasFrameworkTarget) evidence.push({
				code: "target-framework-observed",
				detail: "An assembly-level TargetFrameworkAttribute names .NET Framework.",
				file_offset: metadata.table(12)?.offset ?? null
			});
			if (hasModernTarget) evidence.push({
				code: "target-framework-observed",
				detail: "An assembly-level TargetFrameworkAttribute names modern .NET.",
				file_offset: metadata.table(12)?.offset ?? null
			});
			if (hasStandardTarget) evidence.push({
				code: "target-framework-observed",
				detail: "An assembly-level TargetFrameworkAttribute names .NET Standard, an API specification that does not identify a runtime family.",
				file_offset: metadata.table(12)?.offset ?? null
			});
			let runtimeFamily = "unknown";
			if (cli.readyToRunSignature) {
				runtimeFamily = "modern-dotnet";
			} else if (runtimeFamilyFromCliHeader(cli) === "mixed-clr-native") {
				runtimeFamily = "mixed-clr-native";
				evidence.push({
					code: "cli-il-only-clear",
					detail: "COMIMAGE_FLAGS_ILONLY is clear, so managed and native analysis must remain composed.",
					file_offset: cli.headerOffset + 16
				});
			} else if (hasUnity) {
				runtimeFamily = "unity-mono";
			} else if (hasFrameworkTarget) {
				runtimeFamily = "dotnet-framework";
			} else if (hasModernTarget) {
				runtimeFamily = "modern-dotnet";
			}
			return {
				runtime_family: runtimeFamily,
				evidence
			};
		};
		implementationFor = (cli, metadata) => {
			if (cli.readyToRunSignature) return "cil-and-ready-to-run";
			if ((cli.flags & 1) === 0) return "cpp-cli-mixed";
			return (metadata.rowCounts[6] ?? 0) === 0 ? "metadata-only" : "cil";
		};
		managedArchitectureFor = (layout, cli) => {
			if (layout.architecture !== "x86" || (cli.flags & 1) === 0) return layout.architecture;
			const requirement = managedCli32BitRequirement(cli.flags);
			if (requirement === "required") return "x86";
			return requirement === "preferred" ? "anycpu-prefer-32" : "anycpu";
		};
		runtimeClassification = ({ layout, cli, metadata, inventory }) => {
			const { runtime_family: runtimeFamily, evidence } = runtimeFamilyFor(cli, inventory, metadata, layout);
			const implementation = implementationFor(cli, metadata);
			const managedArchitecture = managedArchitectureFor(layout, cli);
			evidence.push({
				code: "managed-architecture-derived",
				detail: `Managed architecture ${managedArchitecture} is derived from PE machine and CLI flags.`,
				file_offset: cli.headerOffset + 16
			});
			return {
				runtime_family: runtimeFamily,
				implementation,
				managed_architecture: managedArchitecture,
				evidence
			};
		};
		partialMetadataResult = ({ target, bytes, layout, issue, metadataHeader }) => ({
			...base(target, bytes, layout),
			classification: {
				status: managedMetadataFailureStatus(issue) === "partial" ? "managed" : "malformed",
				container: "pe",
				runtime_family: runtimeFamilyFromCliHeader(layout.cli),
				implementation: "unknown",
				managed_architecture: "unknown",
				evidence: [{
					code: "metadata-not-admitted",
					detail: issue.detail,
					file_offset: issue.offset
				}]
			},
			metadata: {
				status: managedMetadataFailureStatus(issue),
				version: metadataHeader?.version ?? null,
				stream_names: [...metadataHeader?.streamNames ?? []],
				table_row_counts: {}
			},
			module: null,
			assembly: null,
			target_frameworks: [],
			references: [],
			resources: [],
			attributes: [],
			coverage: {
				state: "partial",
				issues: [issue]
			},
			limitations: [issue.code === "unsupported-metadata" ? issue.detail : issue.code === "resource-limit" ? "CLI metadata inspection stopped at its representation budget; omitted facts are unknown." : "CLI metadata could not be read because the PE/CLI structure is malformed or unsupported."]
		});
		inspectManagedArtifactBytes = (bytes, target, maxRepresentationBytes) => {
			const layout = readManagedPeLayout(bytes);
			if (layout.cli === null) return unavailableResult(target, bytes, layout);
			const cli = layout.cli;
			let metadata;
			try {
				const metadataOffset = layout.rvaToOffset(cli.metadata.rva, cli.metadata.size, "cli.metadata");
				metadata = readManagedMetadataLayout(bytes, metadataOffset, cli.metadata.size, maxRepresentationBytes);
			} catch (cause) {
				if (!(cause instanceof ManagedReaderFailure)) throw cause;
				return managedArtifactInspectionSchema.parse(admitManagedProjection(partialMetadataResult({
					target,
					bytes,
					layout,
					issue: cause.issue,
					metadataHeader: cause.metadataHeader
				})));
			}
			const resourceIssues = [];
			const resourceDirectory = readManagedResourceDirectory(layout, resourceIssues);
			try {
				const memberLists = readTypeMemberListFacts(bytes, metadata);
				const inventory = readManagedMetadataInventory(bytes, metadata, resourceDirectory, memberLists);
				const issues = [...resourceIssues, ...inventory.issues];
				const limitations = [...issues.length === 0 ? [] : ["At least one metadata or resource item could not be read; coverage is partial."], "Static inspection did not load the assembly, resolve dependencies through a CLR, decompile C#, or execute target code."];
				return managedArtifactInspectionSchema.parse(admitManagedProjection({
					...base(target, bytes, layout),
					classification: {
						status: "managed",
						container: "pe",
						...runtimeClassification({
							layout,
							cli,
							metadata,
							inventory
						})
					},
					metadata: {
						status: issues.length === 0 ? "complete" : "partial",
						version: metadata.version,
						stream_names: metadata.streamNames,
						table_row_counts: managedTableRowCounts(metadata),
						...unresolvedModuleMetadata(inventory)
					},
					module: inventory.module,
					assembly: inventory.assembly,
					target_frameworks: inventory.targetFrameworks,
					references: inventory.references,
					resources: inventory.resources,
					attributes: inventory.attributes,
					coverage: {
						state: issues.length === 0 ? "complete" : "partial",
						issues
					},
					limitations
				}, managedDecodeBudget(metadata)));
			} catch (cause) {
				if (!(cause instanceof ManagedReaderFailure)) throw cause;
				return managedArtifactInspectionSchema.parse(admitManagedProjection(partialMetadataResult({
					target,
					bytes,
					layout,
					issue: cause.issue,
					metadataHeader: cause.metadataHeader
				})));
			}
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedPeInspectionEnvelope.js
var managedPeInspectionEnvelope;
function init_ManagedPeInspectionEnvelope() {
	return (init_ManagedPeInspectionEnvelope = __esmMin((() => {
		init_managedMetadataInventory();
		init_managedModuleIdentity();
		managedPeInspectionEnvelope = (target, byteLength, layout, identity, issues) => {
			const { module } = identity;
			const metadata = {
				status: issues.length === 0 ? "complete" : "partial",
				version: layout.version,
				table_row_counts: managedTableRowCounts(layout),
				...unresolvedModuleMetadata(identity)
			};
			return {
				artifact: {
					path: target.path,
					sha256: target.sha256,
					byte_length: byteLength,
					format: "pe"
				},
				module,
				metadata,
				identity_scope: {
					token_identity: "build-local",
					requires_artifact_sha256: target.sha256,
					requires_mvid: managedModuleRow({
						module,
						metadata
					})?.mvid ?? null
				}
			};
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedMemberInspectorCore.js
var memberTargetIdentity, isParsedTokenInstruction, rowRange, fullName, readTypeDefinition, readTypeDefinitions, parseTypes, readCompressed, ELEMENT_TYPES, readSignedCompressed, malformedSignature, MEMBER_METHOD_HEADERS, FUNCTION_POINTER_CONVENTIONS, readMethodSignatureHeader, MAX_ARRAY_RANK, arrayShape, currentPosition, POSITION_ELEMENTS, GENERIC_TYPE_DEFINITION_TABLES, readTypeOperand, readTypeSignature, artifactSignatureIssue, readLocalSignatureFacts, CALLING_CONVENTION_NAMES, callingConvention, specSignatureFacts, decodeSignature, methodGenericArity, signatureGenericArity, OPERAND_MARKER, resolvedSha256, projectSignature, metadataSignature;
function init_managedMemberInspectorCore() {
	return (init_managedMemberInspectorCore = __esmMin((() => {
		init_result();
		init_managedReaderFailure();
		init_managedDecodeBudget();
		init_managedTypeNesting();
		init_managedMetadataLayout();
		init_managedMetadataHeaps();
		init_managedMemberPointers();
		init_managedUnresolvedDefinitions();
		init_sha256Hex();
		memberTargetIdentity = (name, declaringType, signature, typeName) => {
			if (declaringType === null || signature.resolved_sha256 === null || signature.parse_status !== "decoded") return null;
			const { table, row } = declaringType;
			if (table !== 1 && table !== 2) return null;
			const owner = typeName(table, row);
			return owner === null ? null : createHash("sha256").update("managed-member-nominal-v1\0").update(owner).update(Buffer.from(signature.resolved_sha256, "hex")).update(name).digest("hex");
		};
		isParsedTokenInstruction = (instruction) => instruction.reference !== null;
		rowRange = (table, start, end) => {
			const total = table?.rowCount ?? 0;
			if (start === null || end === null) return {
				first: null,
				last: null,
				count: 0
			};
			const lastExclusive = Math.min(end, total + 1);
			if (start >= lastExclusive) return {
				first: null,
				last: null,
				count: 0
			};
			return {
				first: start,
				last: lastExclusive - 1,
				count: lastExclusive - start
			};
		};
		fullName = (namespace, name) => namespace.length === 0 ? name : `${namespace}.${name}`;
		readTypeDefinition = (bytes, layout, row, issues, current) => {
			const { source } = current;
			const token = metadataToken(2, row);
			const namespaceField = readDefinitionField(() => readMetadataString(bytes, layout, source.namespaceIndex), issues, "Namespace", source.namespaceOffset, source.namespaceIndex);
			const nameField = readDefinitionField(() => readRequiredMetadataName(bytes, layout, "TypeDef", token, source), issues, "Name", source.nameOffset, source.nameIndex);
			const name = typeof nameField === "string" ? nameField : undefined;
			const namespace = typeof namespaceField === "string" ? namespaceField : undefined;
			const unresolved = name === undefined || namespace === undefined ? admitManagedProjection({
				kind: "TypeDef",
				token,
				row_offset: source.rowOffset,
				failed_fields: [nameField, namespaceField].filter((field) => typeof field !== "string")
			}, managedDecodeBudget(layout)) : null;
			return {
				source,
				row,
				name,
				namespace,
				unresolved,
				token,
				fullName: namespace === undefined || name === undefined ? null : fullName(namespace, name),
				fieldStart: current.field.start.value,
				fieldEnd: current.field.end,
				methodStart: current.method.start.value,
				methodEnd: current.method.end
			};
		};
		readTypeDefinitions = (bytes, layout, issues, memberLists) => {
			appendManagedParseIssues(issues, memberLists.issues);
			const definitions = [];
			for (const [index, entry] of memberLists.entries.entries()) definitions.push(readTypeDefinition(bytes, layout, index + 1, issues, entry));
			return definitions;
		};
		parseTypes = (bytes, layout, definitions) => {
			const fields = memberListTable(layout, 4);
			const methods = memberListTable(layout, 6);
			const items = [];
			const issues = [];
			const unresolvedDefinitions = [];
			const nesting = readManagedTypeNesting(bytes, layout, issues);
			for (const definition of definitions) {
				const { row, name, namespace, token } = definition;
				if (name === undefined || namespace === undefined || definition.fullName === null) {
					if (definition.unresolved !== null) unresolvedDefinitions.push(definition.unresolved);
					continue;
				}
				const { flags, extendsRaw, extendsOffset, rowOffset } = definition.source;
				const fieldRange = rowRange(fields, definition.fieldStart, definition.fieldEnd);
				const methodRange = rowRange(methods, definition.methodStart, definition.methodEnd);
				const extendsIndex = decodeMetadataCodedIndex(extendsRaw, MANAGED_CODED_INDEXES.TypeDefOrRef.bits, MANAGED_CODED_INDEXES.TypeDefOrRef.tables, layout.rowCounts);
				if (extendsIndex.kind === "invalid") issues.push({
					code: "invalid-row",
					scope: `metadata.TypeDef:${token}`,
					offset: extendsOffset,
					detail: `TypeDef Extends coded index 0x${extendsRaw.toString(16)} is invalid: ${extendsIndex.reason}`
				});
				const enclosingRow = nesting.enclosing.get(row);
				managedDecodeBudget(layout).reserve(128, rowOffset);
				items.push({
					row,
					type: {
						token,
						row_offset: rowOffset,
						namespace,
						name,
						full_name: definition.fullName,
						flags,
						extends_token: extendsIndex.kind === "valid" ? extendsIndex.token : null,
						enclosing_type_token: enclosingRow === undefined ? null : metadataToken(2, enclosingRow),
						name_sha256: null,
						field_list: {
							first_row: fieldRange.first,
							last_row: fieldRange.last,
							count: fieldRange.count
						},
						method_list: {
							first_row: methodRange.first,
							last_row: methodRange.last,
							count: methodRange.count
						}
					}
				});
			}
			return {
				types: items,
				issues,
				nesting,
				unresolvedDefinitions
			};
		};
		readCompressed = (bytes, offset) => {
			const decoded = readManagedCompressedUnsigned(bytes, offset);
			if (!decoded.ok) throw managedFailure("invalid-blob", "signature", decoded.error.kind === "truncated" ? "truncated compressed integer" : "reserved compressed integer", offset);
			return {
				value: decoded.value.value,
				next: offset + decoded.value.width
			};
		};
		ELEMENT_TYPES = new Map([
			[1, "void"],
			[2, "bool"],
			[3, "char"],
			[4, "i1"],
			[5, "u1"],
			[6, "i2"],
			[7, "u2"],
			[8, "i4"],
			[9, "u4"],
			[10, "i8"],
			[11, "u8"],
			[12, "r4"],
			[13, "r8"],
			[14, "string"],
			[24, "native-int"],
			[25, "native-uint"],
			[28, "object"]
		]);
		readSignedCompressed = (bytes, offset) => {
			const encoded = readCompressed(bytes, offset);
			const width = encoded.next - offset === 1 ? 7 : encoded.next - offset === 2 ? 14 : 29;
			const magnitude = Math.floor(encoded.value / 2);
			return {
				value: encoded.value % 2 === 0 ? magnitude : magnitude - 2 ** (width - 1),
				next: encoded.next
			};
		};
		malformedSignature = (detail, offset) => {
			throw managedFailure("invalid-blob", "signature", detail, offset);
		};
		MEMBER_METHOD_HEADERS = new Set([
			0,
			5,
			16
		]);
		FUNCTION_POINTER_CONVENTIONS = new Set([
			0,
			1,
			2,
			3,
			4,
			5,
			9
		]);
		readMethodSignatureHeader = (blob, offset, context) => {
			const first = blob[offset];
			if (first === undefined) return malformedSignature("truncated method signature", offset);
			const allowed = context === "member" ? MEMBER_METHOD_HEADERS.has(first & 159) : (first & 128) === 0 && FUNCTION_POINTER_CONVENTIONS.has(first & 15);
			if (!allowed || (first & 64) !== 0 && (first & 32) === 0) return malformedSignature(`calling convention 0x${first.toString(16)} does not head a ${context} method signature`, offset);
			let next = offset + 1;
			let genericParameterCount = null;
			if ((first & 16) !== 0) {
				const generic = readCompressed(blob, next);
				genericParameterCount = generic.value;
				next = generic.next;
			}
			const parameterCount = readCompressed(blob, next);
			return {
				first,
				genericParameterCount,
				parameterCount: parameterCount.value,
				next: parameterCount.next
			};
		};
		MAX_ARRAY_RANK = 32;
		arrayShape = (blob, offset) => {
			const rank = readCompressed(blob, offset);
			if (rank.value === 0) return malformedSignature("array rank is zero", offset);
			if (rank.value > MAX_ARRAY_RANK) throw managedFailure("unsupported-signature", "signature", `array rank ${String(rank.value)} exceeds the ${String(MAX_ARRAY_RANK)} dimensions the CLR supports`, offset);
			const sizeCount = readCompressed(blob, rank.next);
			if (sizeCount.value > rank.value) return malformedSignature("array has more sizes than dimensions", offset);
			const sizes = [];
			let next = sizeCount.next;
			for (let index = 0; index < sizeCount.value; index += 1) {
				const size = readCompressed(blob, next);
				sizes.push(size.value);
				next = size.next;
			}
			const boundCount = readCompressed(blob, next);
			if (boundCount.value > rank.value) return malformedSignature("array has more lower bounds than dimensions", offset);
			const lowerBounds = [];
			next = boundCount.next;
			for (let index = 0; index < boundCount.value; index += 1) {
				const bound = readSignedCompressed(blob, next);
				lowerBounds.push(bound.value);
				next = bound.next;
			}
			const dimensions = Array.from({ length: rank.value }, (_, index) => {
				const size = sizes[index];
				const lower = lowerBounds[index];
				if (lower !== undefined) return size === undefined ? `${String(lower)}...` : `${String(lower)}...${String(lower + size - 1)}`;
				if (size !== undefined) return String(size);
				return rank.value === 1 ? "..." : "";
			});
			return {
				value: `[${dimensions.join(",")}]`,
				next
			};
		};
		currentPosition = (stack, base) => {
			const frame = stack.findLast(({ kind }) => kind !== "modifiers");
			if (frame === undefined) return base;
			if (frame.kind === "suffix") return frame.suffix === "*" ? "pointee" : "type";
			if (frame.kind === "list" && frame.signatureItems) return frame.items.length === 0 ? "return" : "parameter";
			return "type";
		};
		POSITION_ELEMENTS = new Map([
			[1, ["return", "pointee"]],
			[22, [
				"return",
				"parameter",
				"local"
			]],
			[16, [
				"return",
				"parameter",
				"local",
				"field"
			]]
		]);
		GENERIC_TYPE_DEFINITION_TABLES = MANAGED_CODED_INDEXES.TypeDefOrRef.tables.slice(0, 2);
		readTypeOperand = (blob, offset, layout, tables = MANAGED_CODED_INDEXES.TypeDefOrRef.tables) => {
			const token = readCompressed(blob, offset);
			if (layout !== undefined) {
				const decoded = decodeMetadataCodedIndex(token.value, MANAGED_CODED_INDEXES.TypeDefOrRef.bits, tables, layout.rowCounts);
				if (decoded.kind !== "valid") throw managedFailure("invalid-row", "signature", `TypeDefOrRefOrSpec operand 0x${token.value.toString(16)} is invalid: ${decoded.kind === "null" ? "type operand is null" : decoded.reason}`, offset);
				return {
					...token,
					coordinate: {
						table: decoded.table,
						row: decoded.row
					}
				};
			}
			const { table, row } = metadataCodedIndexCoordinate(token.value, MANAGED_CODED_INDEXES.TypeDefOrRef.bits, tables);
			return {
				...token,
				coordinate: {
					table,
					row
				}
			};
		};
		readTypeSignature = (blob, offset, base, { layout, operands, onElement, displayTypeName } = {}) => {
			const stack = [];
			const namedOperand = (kind, operand) => {
				const name = displayTypeName?.(operand, (stack.length + 1) * 2);
				const raw = `${kind}:${String(operand.value)}`;
				return name === undefined || name === null ? raw : `${raw} (${name})`;
			};
			let cursor = offset;
			let nominalGenericType = null;
			let pinned = false;
			for (;;) {
				let value;
				const kind = blob[cursor];
				if (kind === undefined) return malformedSignature("truncated type signature", cursor);
				onElement?.(kind);
				if (kind === 65) {
					const signature = stack.at(-1);
					if (signature?.kind !== "list" || !signature.signatureItems) throw managedFailure("unsupported-signature", "signature", "unsupported element type 0x41", cursor);
					if (!signature.vararg) throw managedFailure("unsupported-signature", "signature", "unsupported element type 0x41", cursor);
					if (signature.sentinelSeen || signature.remaining === 0) return malformedSignature("VARARG function pointer has an invalid sentinel position", cursor);
					signature.sentinelSeen = true;
					cursor += 1;
					if (blob[cursor] === undefined || blob[cursor] === 65) return malformedSignature("VARARG function pointer has adjacent sentinels", cursor);
					continue;
				}
				const positions = POSITION_ELEMENTS.get(kind);
				if (positions !== undefined && !positions.includes(currentPosition(stack, base))) return malformedSignature(`element type 0x${kind.toString(16)} is not valid in a ${currentPosition(stack, base)} position`, cursor);
				if (kind === 69) {
					if (base !== "local") throw managedFailure("unsupported-signature", "signature", "unsupported element type 0x45", cursor);
					if (pinned || stack.some(({ kind: frameKind }) => frameKind !== "modifiers")) return malformedSignature("PINNED is not valid in this type position", cursor);
					pinned = true;
					cursor += 1;
					continue;
				}
				const named = ELEMENT_TYPES.get(kind);
				if (named !== undefined) {
					value = named;
					cursor += 1;
				} else if (kind === 15 || kind === 16 || kind === 29) {
					const suffix = kind === 15 ? "*" : kind === 16 ? "&" : "[]";
					stack.push({
						kind: "suffix",
						suffix
					});
					cursor += 1;
				} else if (kind === 31 || kind === 32) {
					if (pinned && currentPosition(stack, base) === "local") return malformedSignature("custom modifier follows the LocalVarSig PINNED constraint", cursor);
					const token = readTypeOperand(blob, cursor + 1, layout);
					operands?.push({
						offset: cursor + 1,
						...token
					});
					const modifier = namedOperand(kind === 31 ? "modreq" : "modopt", token);
					const top = stack.at(-1);
					if (top?.kind === "modifiers") top.modifiers.push(modifier);
					else stack.push({
						kind: "modifiers",
						modifiers: [modifier]
					});
					cursor = token.next;
				} else if (kind === 17 || kind === 18) {
					const token = readTypeOperand(blob, cursor + 1, layout);
					operands?.push({
						offset: cursor + 1,
						...token
					});
					value = namedOperand(kind === 17 ? "valuetype" : "class", token);
					cursor = token.next;
				} else if (kind === 30 || kind === 19) {
					const variable = readCompressed(blob, cursor + 1);
					value = `${kind === 30 ? "mvar" : "var"}:${String(variable.value)}`;
					cursor = variable.next;
				} else if (kind === 22) {
					if (pinned && currentPosition(stack, base) === "local") return malformedSignature("TYPEDBYREF cannot have a LocalVarSig PINNED constraint", cursor);
					value = "typedbyref";
					cursor += 1;
				} else if (kind === 20) {
					stack.push({ kind: "array" });
					cursor += 1;
				} else if (kind === 21) {
					const generic = blob[cursor + 1];
					if (generic !== 17 && generic !== 18) return malformedSignature("generic instantiation does not name a class or value type", cursor + 1);
					const token = readTypeOperand(blob, cursor + 2, layout, GENERIC_TYPE_DEFINITION_TABLES);
					if (cursor === offset && (token.coordinate.table === 1 || token.coordinate.table === 2)) nominalGenericType = {
						table: token.coordinate.table,
						row: token.coordinate.row
					};
					operands?.push({
						offset: cursor + 2,
						...token
					});
					const argumentCount = readCompressed(blob, token.next);
					if (argumentCount.value === 0) return malformedSignature("generic instantiation has no type arguments", token.next);
					const head = namedOperand(generic === 17 ? "valuetype" : "class", token);
					stack.push({
						kind: "list",
						remaining: argumentCount.value,
						items: [],
						signatureItems: false,
						render: (items) => `${head}<${items.join(",")}>`
					});
					cursor = argumentCount.next;
				} else if (kind === 27) {
					const header = readMethodSignatureHeader(blob, cursor + 1, "function-pointer");
					const convention = callingConvention(header.first);
					const head = header.genericParameterCount === null ? convention : `${convention};${String(header.genericParameterCount)}`;
					stack.push({
						kind: "list",
						remaining: header.parameterCount + 1,
						items: [],
						signatureItems: true,
						vararg: (header.first & 15) === 5,
						sentinelSeen: false,
						render: ([returnType, ...parameters]) => `fnptr[${head}](${parameters.join(",")})->${returnType ?? ""}`
					});
					cursor = header.next;
				} else {
					throw managedFailure("unsupported-signature", "signature", `unsupported element type 0x${kind.toString(16)}`, cursor);
				}
				while (value !== undefined) {
					const top = stack.pop();
					if (top === undefined) return {
						value,
						next: cursor,
						nominalGenericType
					};
					if (top.kind === "suffix") value += top.suffix;
					else if (top.kind === "modifiers") value = `${value} ${top.modifiers.join(" ")}`;
					else if (top.kind === "array") {
						const shape = arrayShape(blob, cursor);
						value += shape.value;
						cursor = shape.next;
					} else {
						top.items.push(value);
						top.remaining -= 1;
						if (top.remaining === 0) value = top.render(top.items);
						else {
							value = undefined;
							stack.push(top);
						}
					}
				}
			}
		};
		artifactSignatureIssue = (issue, scope, blobOffset) => ({
			...issue,
			scope,
			offset: issue.offset === null ? blobOffset : blobOffset + issue.offset
		});
		readLocalSignatureFacts = (layout, blob, { scope, blobOffset }, budget) => {
			budget.admitTransient(blob.length * 256, blobOffset);
			try {
				if (blob[0] !== 7) malformedSignature("StandAloneSig row does not contain a LocalVarSig", 0);
				const count = readCompressed(blob, 1);
				if (count.value === 0 || count.value > 65534) malformedSignature(`LocalVarSig local count ${String(count.value)} is outside the ECMA-335 range`, 1);
				let cursor = count.next;
				let contextDependent = false;
				for (let index = 0; index < count.value; index += 1) {
					const local = readTypeSignature(blob, cursor, "local", {
						layout,
						onElement: (kind) => {
							if ([
								17,
								18,
								19,
								21,
								30,
								31,
								32
							].includes(kind)) contextDependent = true;
						}
					});
					cursor = local.next;
				}
				if (cursor !== blob.length) malformedSignature("Trailing LocalVarSig data", cursor);
				return ok({
					raw_sha256: sha256Hex(blob),
					has_context_dependent_types: contextDependent
				});
			} catch (cause) {
				if (!(cause instanceof ManagedReaderFailure) || cause.issue.code !== "invalid-blob" && cause.issue.code !== "invalid-row" && cause.issue.code !== "unsupported-signature") throw cause;
				return err(artifactSignatureIssue(cause.issue, scope, blobOffset));
			}
		};
		CALLING_CONVENTION_NAMES = new Map([
			[0, "default"],
			[1, "c"],
			[2, "stdcall"],
			[3, "thiscall"],
			[4, "fastcall"],
			[5, "vararg"],
			[6, "field"],
			[9, "unmanaged"]
		]);
		callingConvention = (value) => {
			const base = value & 15;
			const flags = [
				(value & 32) === 0 ? null : "has-this",
				(value & 64) === 0 ? null : "explicit-this",
				(value & 16) === 0 ? null : "generic"
			].filter((flag) => flag !== null);
			const name = CALLING_CONVENTION_NAMES.get(base) ?? `unknown:${String(base)}`;
			return flags.length === 0 ? name : `${name} ${flags.join(" ")}`;
		};
		specSignatureFacts = (layout, blob, owner, typeName) => {
			const budget = managedDecodeBudget(layout);
			budget.admitTransient(blob.length * 256, owner.offset);
			try {
				let cursor = 0;
				let count = 1;
				if (owner.form === "instantiation") {
					if (blob[0] !== 10) malformedSignature("MethodSpec instantiation is not GENERICINST", 0);
					const header = readCompressed(blob, 1);
					if (header.value === 0) malformedSignature("MethodSpec instantiation has no type arguments", 1);
					count = header.value;
					cursor = header.next;
				}
				const types = [];
				const operands = [];
				let nominalGenericType = null;
				for (let index = 0; index < count; index += 1) {
					const type = readTypeSignature(blob, cursor, "type", {
						layout,
						operands
					});
					types.push(type.value);
					if (owner.form === "type") nominalGenericType = type.nominalGenericType;
					cursor = type.next;
				}
				if (cursor !== blob.length) malformedSignature("Trailing signature data", cursor);
				return {
					types,
					resolvedSha256: typeName === undefined ? null : resolvedSha256(blob, operands, typeName),
					nominalGenericType
				};
			} catch (cause) {
				if (!(cause instanceof ManagedReaderFailure) || cause.issue.code !== "invalid-blob" && cause.issue.code !== "invalid-row" && cause.issue.code !== "unsupported-signature") throw cause;
				throw managedFailure(cause.issue.code, owner.scope, cause.issue.detail, owner.offset);
			} finally {
				budget.releaseTransient();
			}
		};
		decodeSignature = (blob, layout, operands = [], issueSink, scope = "signature", displayTypeName) => {
			let kind = "unknown";
			try {
				if (blob.length === 0) throw managedFailure("invalid-blob", "signature", "empty signature", 0);
				const first = blob[0] ?? 0;
				if (first === 6) {
					kind = "field";
					const fieldType = readTypeSignature(blob, 1, "field", {
						operands,
						displayTypeName,
						...layout === undefined ? {} : { layout }
					});
					return {
						kind: "field",
						parse_status: fieldType.next === blob.length ? "decoded" : "partial",
						calling_convention: callingConvention(first),
						generic_parameter_count: null,
						parameter_count: null,
						return_type: null,
						parameter_types: [],
						field_type: fieldType.value,
						issue: fieldType.next === blob.length ? null : "Trailing signature data"
					};
				}
				const header = readMethodSignatureHeader(blob, 0, "member");
				kind = "method";
				const returnType = readTypeSignature(blob, header.next, "return", {
					operands,
					displayTypeName,
					...layout === undefined ? {} : { layout }
				});
				let offset = returnType.next;
				const parameters = [];
				let sentinelSeen = false;
				for (let index = 0; index < header.parameterCount; index += 1) {
					if (blob[offset] === 65 && (first & 15) === 5) {
						if (sentinelSeen) malformedSignature("VARARG signature has an invalid sentinel position", offset);
						sentinelSeen = true;
						offset += 1;
						if (blob[offset] === undefined || blob[offset] === 65) malformedSignature("VARARG signature has adjacent sentinels", offset);
					}
					const parameter = readTypeSignature(blob, offset, "parameter", {
						operands,
						displayTypeName,
						...layout === undefined ? {} : { layout }
					});
					parameters.push(parameter.value);
					offset = parameter.next;
				}
				return {
					kind: "method",
					parse_status: offset === blob.length ? "decoded" : "partial",
					calling_convention: callingConvention(first),
					generic_parameter_count: header.genericParameterCount,
					parameter_count: header.parameterCount,
					return_type: returnType.value,
					parameter_types: parameters,
					field_type: null,
					issue: offset === blob.length ? null : "Trailing signature data"
				};
			} catch (cause) {
				if (!(cause instanceof ManagedReaderFailure)) throw cause;
				if (cause.issue.code !== "invalid-blob" && cause.issue.code !== "invalid-row" && cause.issue.code !== "unsupported-signature") throw cause;
				if (cause.issue.code === "invalid-row") issueSink?.({
					...cause.issue,
					scope
				});
				return {
					kind: cause.issue.code === "invalid-row" ? kind : "unknown",
					parse_status: cause.issue.code === "unsupported-signature" ? "unsupported" : "malformed",
					calling_convention: null,
					generic_parameter_count: null,
					parameter_count: null,
					return_type: null,
					parameter_types: [],
					field_type: null,
					issue: cause.issue.detail
				};
			}
		};
		methodGenericArity = (layout, blob) => {
			const budget = managedDecodeBudget(layout);
			budget.admitTransient(blob.length * 256, metadataBlobOffset(layout));
			try {
				return signatureGenericArity(decodeSignature(blob));
			} finally {
				budget.releaseTransient();
			}
		};
		signatureGenericArity = (decoded) => decoded.kind === "method" && decoded.parse_status === "decoded" ? decoded.generic_parameter_count ?? 0 : null;
		OPERAND_MARKER = Buffer.from([255]);
		resolvedSha256 = (blob, operands, typeName) => {
			const hash = createHash("sha256");
			let copied = 0;
			for (const operand of operands) {
				const name = typeName(operand);
				if (name === null) return null;
				hash.update(blob.subarray(copied, operand.offset));
				hash.update(OPERAND_MARKER);
				hash.update(name);
				copied = operand.next;
			}
			hash.update(blob.subarray(copied));
			return hash.digest("hex");
		};
		projectSignature = (blob, rawSha256, typeName, decoded, operands) => {
			return {
				raw_length: blob.length,
				raw_sha256: rawSha256 ?? sha256Hex(blob),
				resolved_sha256: decoded.kind === "unknown" || decoded.parse_status === "malformed" ? null : resolvedSha256(blob, operands, typeName),
				...decoded
			};
		};
		metadataSignature = (blob, { rawSha256, typeName, layout, issues, scope, blobOffset, expectedKind, displayTypeName }) => {
			const operands = [];
			let decoded = decodeSignature(blob, layout, operands, (issue) => issues.push(artifactSignatureIssue(issue, scope, blobOffset)), scope, displayTypeName);
			if (expectedKind !== undefined && decoded.kind !== "unknown" && decoded.kind !== expectedKind) {
				const detail = `Expected ${expectedKind} signature; decoded ${decoded.kind}${decoded.issue === null ? "" : `: ${decoded.issue}`}`;
				issues.push({
					code: "invalid-blob",
					scope,
					offset: null,
					detail
				});
				decoded = {
					...decoded,
					parse_status: "malformed",
					issue: detail
				};
			}
			return projectSignature(blob, rawSha256, typeName, decoded, operands);
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedMethodDefinitionRows.js
var METHOD_CODE_TYPES, readMethodDefinitionRow, readMethodDefinitionName;
function init_ManagedMethodDefinitionRows() {
	return (init_ManagedMethodDefinitionRows = __esmMin((() => {
		init_managedMetadataHeaps();
		METHOD_CODE_TYPES = [
			"il",
			"native",
			"optil",
			"runtime"
		];
		readMethodDefinitionRow = (bytes, layout, row) => {
			const cursor = metadataRowCursor(bytes, layout, 6, row);
			const rva = cursor.u32();
			const implFlags = cursor.u16();
			const flags = cursor.u16();
			return {
				token: metadataToken(6, row),
				rowOffset: cursor.start,
				rva,
				implFlags,
				flags,
				nameOffset: cursor.offset,
				nameIndex: cursor.readIndex(layout.stringIndexSize),
				signatureIndex: cursor.readIndex(layout.blobIndexSize),
				implementation: {
					codeType: METHOD_CODE_TYPES[implFlags & 3],
					managedKind: (implFlags & 4) === 0 ? "managed" : "unmanaged",
					pinvokeFlag: (flags & 8192) !== 0,
					internalCall: (implFlags & 4096) !== 0
				}
			};
		};
		readMethodDefinitionName = (bytes, layout, definition) => readRequiredMetadataName(bytes, layout, "MethodDef", definition.token, definition);
	})))();
}

//#endregion
//#region dist/dotnet/ManagedMethodSpecs.js
var methodSpecMethod, edgeTargets, readMethodSpec, methodSignatureBlob;
function init_ManagedMethodSpecs() {
	return (init_ManagedMethodSpecs = __esmMin((() => {
		init_managedMemberReferenceRows();
		init_ManagedMethodDefinitionRows();
		init_managedMemberInspectorCore();
		init_managedMetadataLayout();
		init_managedMetadataHeaps();
		init_managedReaderFailure();
		methodSpecMethod = (bytes, layout, row) => {
			const cursor = metadataRowCursor(bytes, layout, 43, row);
			const methodRaw = cursor.readIndex(layout.codedIndexSize("MethodDefOrRef"));
			const instantiation = cursor.readIndex(layout.blobIndexSize);
			return {
				method: decodeMetadataCodedIndex(methodRaw, MANAGED_CODED_INDEXES.MethodDefOrRef.bits, MANAGED_CODED_INDEXES.MethodDefOrRef.tables, layout.rowCounts),
				methodRaw,
				instantiation,
				offset: cursor.start
			};
		};
		edgeTargets = (bytes, layout, methods, cores, signatureTypeName) => {
			const members = new Map(cores.flatMap((core) => [...core]));
			const issues = [];
			const seen = new Set();
			const arities = new Map();
			for (const { tokenInstructions } of methods) for (const { reference } of tokenInstructions) {
				if (reference.table !== 43 || seen.has(reference.token)) continue;
				seen.add(reference.token);
				readManagedValue(() => readMethodSpec({
					bytes,
					layout,
					members,
					issues,
					arities,
					signatureTypeName
				}, reference), issues);
			}
			return {
				members,
				issues
			};
		};
		readMethodSpec = ({ bytes, layout, members, issues, arities, signatureTypeName }, reference) => {
			const { token, row } = reference;
			const scope = `metadata.MethodSpec:${token}`;
			const { method, methodRaw, instantiation, offset } = methodSpecMethod(bytes, layout, row);
			if (method.kind !== "valid") issues.push({
				code: "invalid-row",
				scope,
				offset,
				detail: method.kind === "null" ? "MethodSpec method coded index 0x0 is null, but the Method column must reference a row" : `MethodSpec method coded index 0x${methodRaw.toString(16)} is invalid: ${method.reason}`
			});
			const methodReference = method.kind === "valid" ? method : null;
			const target = methodReference === null ? undefined : members.get(methodReference.token);
			if (target !== undefined && target.kind !== "field") members.set(token, {
				...target,
				token,
				rowResolved: false,
				identitySha256: null
			});
			const instantiationFacts = specSignatureFacts(layout, readMetadataBlob(bytes, layout, instantiation), {
				form: "instantiation",
				scope,
				offset
			}, signatureTypeName);
			const { types } = instantiationFacts;
			if (methodReference === null) return;
			const generic = methodReference.token;
			if (target?.genericArity === undefined && !arities.has(generic)) arities.set(generic, methodGenericArity(layout, methodSignatureBlob(bytes, layout, methodReference)));
			const arity = target?.genericArity === undefined ? arities.get(generic) ?? null : target.genericArity;
			if (arity !== types.length) throw managedFailure("invalid-row", scope, arity === null ? "MethodSpec method does not have a decodable method signature" : `MethodSpec supplies ${String(types.length)} type argument(s), but its method declares ${String(arity)} generic parameter(s)`, offset);
			if (target !== undefined && target.kind === "method" && (target.identitySha256 != null || target.rowResolved === true) && instantiationFacts.resolvedSha256 !== null) members.set(token, {
				...target,
				token,
				rowResolved: true,
				identitySha256: target.identitySha256 == null ? null : createHash("sha256").update("managed-method-instantiation-v1\0").update(Buffer.from(target.identitySha256, "hex")).update(Buffer.from(instantiationFacts.resolvedSha256, "hex")).digest("hex")
			});
		};
		methodSignatureBlob = (bytes, layout, { table, row }) => {
			let signatureIndex;
			if (table === 6) {
				signatureIndex = readMethodDefinitionRow(bytes, layout, row).signatureIndex;
			} else {
				signatureIndex = readMemberReferenceRowFacts(bytes, layout, row).signatureIndex;
			}
			return readMetadataBlob(bytes, layout, signatureIndex);
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedTypeNames.js
var typeNameLookup;
function init_ManagedTypeNames() {
	return (init_ManagedTypeNames = __esmMin((() => {
		init_managedMemberInspectorCore();
		init_managedMetadataLayout();
		init_managedMetadataHeaps();
		init_managedReaderFailure();
		typeNameLookup = (bytes, layout, ranges, issues, references, signatureTypeName) => {
			const unknown = {
				name: null,
				resolvedSpec: false
			};
			const names = new Map();
			const definitionName = (table, row) => {
				if (table === 2) {
					metadataRowOffset(layout, 2, row);
					return ranges[row - 1]?.fullName ?? null;
				}
				const reference = references(row);
				return reference === null ? null : fullName(reference.namespace, reference.name);
			};
			const specName = (row) => {
				const cursor = metadataRowCursor(bytes, layout, 27, row);
				const spec = readMetadataBlob(bytes, layout, cursor.readIndex(layout.blobIndexSize));
				const owner = {
					form: "type",
					scope: `metadata.TypeSpec:${metadataToken(27, row)}`,
					offset: cursor.start
				};
				const { nominalGenericType, resolvedSha256 } = specSignatureFacts(layout, spec, owner, signatureTypeName);
				return {
					name: nominalGenericType === null ? null : definitionName(nominalGenericType.table, nominalGenericType.row),
					resolvedSpec: resolvedSha256 !== null
				};
			};
			const read = (reference) => {
				if (reference === null) return unknown;
				const { token, table, row } = reference;
				if (names.has(token)) return names.get(token) ?? unknown;
				const name = readManagedValue(() => table === 27 ? specName(row) : table === 1 || table === 2 ? {
					name: definitionName(table, row),
					resolvedSpec: false
				} : unknown, issues) ?? unknown;
				names.set(token, name);
				return name;
			};
			return {
				name: (reference) => read(reference).name,
				isResolvedTypeSpec: (reference) => read(reference).resolvedSpec
			};
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedUserStrings.js
var inventory, USER_STRING_TOKEN_BYTES, parseUserStrings;
function init_ManagedUserStrings() {
	return (init_ManagedUserStrings = __esmMin((() => {
		init_managedDecodeBudget();
		init_managedMetadataHeaps();
		init_managedReaderFailure();
		inventory = (literals, issues, scanned) => ({
			state: issues.length === 0 && scanned ? "complete" : "partial",
			literals,
			issues
		});
		USER_STRING_TOKEN_BYTES = 128;
		parseUserStrings = (bytes, layout, parsed) => {
			const { methods } = parsed;
			const budget = managedDecodeBudget(layout);
			const scanned = parsed.unscannedMethods === 0 && (parsed.unreadableSelectedTypes ?? 0) === 0;
			const userStrings = [];
			const issues = [];
			const declaration = layout.userStrings;
			if (declaration?.issue) issues.push(admitManagedProjection(declaration.issue, budget));
			const tokens = new Map();
			try {
				for (const { tokenInstructions } of methods) for (const { opcode, reference } of tokenInstructions) if (opcode === "ldstr" && !tokens.has(reference.raw)) {
					budget.admitTransient(USER_STRING_TOKEN_BYTES, null);
					tokens.set(reference.raw, reference);
				}
				const references = [];
				for (const reference of [...tokens.values()].sort((left, right) => left.raw - right.raw)) {
					if (reference.table === 112) references.push(reference);
					else issues.push(admitManagedProjection({
						code: "invalid-heap-index",
						scope: `metadata.#US:${reference.token}`,
						offset: null,
						detail: "ldstr operand does not name an item inside #US"
					}, budget));
				}
				if (references.length > 0 && declaration === null) {
					issues.push(admitManagedProjection({
						code: "missing-stream",
						scope: "metadata.#US",
						offset: null,
						detail: `${String(references.length)} distinct ldstr operand(s) reference #US, but the metadata has no #US stream`
					}, budget));
					return inventory(userStrings, issues, scanned);
				}
				if (declaration?.kind === "ambiguous") return inventory(userStrings, issues, scanned);
				for (const reference of references) {
					const failures = [];
					readManagedValue(() => {
						const { offset, value, issues: observed } = readMetadataUserString(bytes, layout, reference);
						for (const issue of observed) failures.push(issue);
						userStrings.push(admitManagedProjection({
							token: reference.token,
							offset,
							value
						}, budget));
					}, failures);
					for (const failure of failures) issues.push(admitManagedProjection(failure, budget));
				}
				return inventory(userStrings, issues, scanned);
			} finally {
				budget.releaseTransient();
			}
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedMemberRecovery.js
var prepareManagedMemberRecovery;
function init_ManagedMemberRecovery() {
	return (init_ManagedMemberRecovery = __esmMin((() => {
		init_managedDecodeBudget();
		init_managedArtifact();
		prepareManagedMemberRecovery = (inventory, issues, budget) => {
			const { unresolved_definitions, ...retained } = inventory;
			const capacityIssue = new ManagedRepresentationFailure(Number.MAX_SAFE_INTEGER, budget.maximumBytes).issue;
			const report = {
				...retained,
				...unresolved_definitions === undefined ? {} : { unresolved_definitions: {
					rows: unresolved_definitions.rows.filter(({ kind }) => kind === "TypeDef"),
					method_names_examined: false
				} },
				metadata: {
					...inventory.metadata,
					status: "partial"
				},
				signature_resolution: null,
				assembly: null,
				exported_types: null,
				fields: [],
				methods: [],
				member_refs: [],
				call_edges: [],
				field_accesses: [],
				user_strings: null,
				coverage: {
					state: "partial",
					issues: [...issues, capacityIssue]
				},
				limitations: [
					...inventory.limitations,
					"Member decoding exceeded capacity after the type inventory was admitted; fields, methods, member references, call edges, field accesses, exported types and user strings are not examined to completion. Empty member collections do not establish absence.",
					inventory.selection !== null && inventory.types.length === 1 ? "This single-type selection already reached the member-decoding capacity. Member references and exported types are assembly-wide and still count toward the shared budget." : "Use the returned TypeDef full_name values with type_names to inspect a smaller selection; a single selected type can still exceed capacity.",
					"Metadata tokens are build-local coordinates and require the reported artifact SHA-256 and MVID. Type names and list ranges retain their original metadata and nesting uncertainty."
				]
			};
			admitManagedProjection(report, budget);
			for (const value of Object.values(retained)) {
				if (value !== null && typeof value === "object") budget.prepay(value);
			}
			for (const row of report.unresolved_definitions?.rows ?? []) budget.prepay(row);
			return (offset) => managedMemberInspectionSchema.parse({
				...report,
				coverage: {
					state: "partial",
					issues: [...issues, {
						...capacityIssue,
						offset
					}]
				}
			});
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedFieldDefinitionRows.js
var readFieldDefinitionRow, readFieldDefinitionName;
function init_ManagedFieldDefinitionRows() {
	return (init_ManagedFieldDefinitionRows = __esmMin((() => {
		init_managedMetadataHeaps();
		readFieldDefinitionRow = (bytes, layout, row) => {
			const cursor = metadataRowCursor(bytes, layout, 4, row);
			return {
				token: metadataToken(4, row),
				rowOffset: cursor.start,
				flags: cursor.u16(),
				nameOffset: cursor.offset,
				nameIndex: cursor.readIndex(layout.stringIndexSize),
				signatureIndex: cursor.readIndex(layout.blobIndexSize)
			};
		};
		readFieldDefinitionName = (bytes, layout, definition) => readRequiredMetadataName(bytes, layout, "Field", definition.token, definition);
	})))();
}

//#endregion
//#region dist/dotnet/ManagedConstantValue.js
var booleanValue, nullReference, jsonFloat, CONSTANT_TYPES, managedConstantType, decodeManagedConstantValue;
function init_ManagedConstantValue() {
	return (init_ManagedConstantValue = __esmMin((() => {
		init_binaryContainer();
		init_managedReaderFailure();
		booleanValue = (reader, scope, offset) => {
			const value = reader.u8(0);
			if (value !== 0 && value !== 1) throw managedFailure("invalid-blob", scope, "Boolean Constant must encode zero or one.", offset);
			return value === 1;
		};
		nullReference = (reader, scope, offset) => {
			if (reader.u32(0) !== 0) throw managedFailure("invalid-blob", scope, "Class Constant must encode a four-byte null reference.", offset);
			return null;
		};
		jsonFloat = (value) => Object.is(value, -0) ? "-0" : Number.isFinite(value) ? value : String(value);
		CONSTANT_TYPES = {
			2: {
				name: "boolean",
				bytes: 1,
				read: booleanValue
			},
			3: {
				name: "char",
				bytes: 2,
				read: (b) => String.fromCharCode(b.u16(0))
			},
			4: {
				name: "i1",
				bytes: 1,
				read: (b) => b.i8(0)
			},
			5: {
				name: "u1",
				bytes: 1,
				read: (b) => b.u8(0)
			},
			6: {
				name: "i2",
				bytes: 2,
				read: (b) => b.i16(0)
			},
			7: {
				name: "u2",
				bytes: 2,
				read: (b) => b.u16(0)
			},
			8: {
				name: "i4",
				bytes: 4,
				read: (b) => b.i32(0)
			},
			9: {
				name: "u4",
				bytes: 4,
				read: (b) => b.u32(0)
			},
			10: {
				name: "i8",
				bytes: 8,
				read: (b) => b.i64(0).toString()
			},
			11: {
				name: "u8",
				bytes: 8,
				read: (b) => b.word(0, 64).toString()
			},
			12: {
				name: "r4",
				bytes: 4,
				read: (b) => jsonFloat(b.f32(0))
			},
			13: {
				name: "r8",
				bytes: 8,
				read: (b) => jsonFloat(b.f64(0))
			},
			14: {
				name: "string",
				bytes: null,
				read: (b) => b.bytes.toString("utf16le")
			},
			18: {
				name: "class",
				bytes: 4,
				read: nullReference
			}
		};
		managedConstantType = (code) => CONSTANT_TYPES[code]?.name ?? null;
		decodeManagedConstantValue = (code, bytes, scope, offset) => {
			const encoding = CONSTANT_TYPES[code];
			if (encoding === undefined) throw managedFailure("unsupported-metadata", scope, `Unsupported Constant element type 0x${code.toString(16)}.`, offset);
			if (encoding.bytes === null ? bytes.length % 2 !== 0 : bytes.length !== encoding.bytes) throw managedFailure("invalid-blob", scope, `Constant ${encoding.name} has an invalid encoded byte length.`, offset);
			return encoding.read(new BinaryReader(bytes, true, "cli-metadata"), scope, offset);
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedFieldConstants.js
var fieldConstantDeclarations, createManagedFieldConstantReader;
function init_ManagedFieldConstants() {
	return (init_ManagedFieldConstants = __esmMin((() => {
		init_managedDecodeBudget();
		init_managedMetadataLayout();
		init_managedMetadataHeaps();
		init_managedReaderFailure();
		init_ManagedConstantValue();
		fieldConstantDeclarations = (bytes, layout, issues) => {
			const result = new Map();
			const budget = managedDecodeBudget(layout);
			for (let row = 1; row <= (layout.table(11)?.rowCount ?? 0); row++) {
				const cursor = metadataRowCursor(bytes, layout, 11, row);
				const typeAndPadding = cursor.u16();
				const parentRaw = cursor.readIndex(layout.codedIndexSize("HasConstant"));
				const blobIndex = cursor.readIndex(layout.blobIndexSize);
				const definition = MANAGED_CODED_INDEXES.HasConstant;
				const parent = decodeMetadataCodedIndex(parentRaw, definition.bits, definition.tables, layout.rowCounts);
				budget.reserveRow(11, row, cursor.start);
				if (parent.kind !== "valid") {
					budget.reserve(512, cursor.start);
					issues.push({
						code: "invalid-row",
						scope: "metadata.Constant",
						offset: cursor.start,
						detail: parent.kind === "invalid" ? parent.reason : "Constant parent is null."
					});
					continue;
				}
				if (parent.table !== 4) continue;
				const declaration = {
					row_offset: cursor.start,
					type_code: typeAndPadding & 255,
					padding: typeAndPadding >>> 8,
					blob_index: blobIndex
				};
				const previous = result.get(parent.row);
				if (previous === undefined) result.set(parent.row, [declaration]);
				else previous.push(declaration);
			}
			return result;
		};
		createManagedFieldConstantReader = (bytes, layout, issues) => {
			let declarations;
			return (row, flags) => {
				declarations ??= fieldConstantDeclarations(bytes, layout, issues);
				const rows = declarations.get(row) ?? [];
				const hasDefault = (flags & 32768) !== 0;
				if (rows.length === 0 && !hasDefault) return null;
				const budget = managedDecodeBudget(layout);
				const result = {
					state: "unavailable",
					declarations: rows,
					element_type: null,
					raw_hex: null,
					value: null,
					limitation: null
				};
				const scope = `metadata.Constant:${metadataToken(4, row)}`;
				const first = rows[0];
				const offset = first?.row_offset ?? metadataRowCursor(bytes, layout, 4, row).start;
				try {
					if (!hasDefault || rows.length !== 1 || first === undefined) throw managedFailure("invalid-row", scope, "A field default requires HasDefault and exactly one Constant row.", offset);
					if (first.padding !== 0) throw managedFailure("invalid-row", scope, "Constant row padding must be zero.", offset);
					const value = readMetadataBlob(bytes, layout, first.blob_index);
					budget.admitTransient(value.length * 8 + 1024, offset);
					result.raw_hex = value.toString("hex");
					result.element_type = managedConstantType(first.type_code);
					result.value = decodeManagedConstantValue(first.type_code, value, scope, offset);
					result.state = "decoded";
				} catch (cause) {
					if (!(cause instanceof ManagedReaderFailure) || cause.issue.code === "resource-limit") throw cause;
					if (!(cause instanceof ManagedHeapAmbiguityFailure)) issues.push(cause.issue);
					result.limitation = cause.issue.detail;
				} finally {
					budget.releaseTransient();
				}
				return admitManagedProjection(result, budget);
			};
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedMemberInstructionDecoder.js
var PREFIX_OPCODES, OPCODES, tokenKind, floatingPointOperand, fixed, FIXED_OPERAND_READERS, TOKEN_OPERAND_KINDS, TOKEN_OPERAND_WIDTH, SWITCH_WORD_BYTES, readOperand, decodeInstructions, parseExceptionRegions, malformedExceptionRegions, readExceptionClauses;
function init_ManagedMemberInstructionDecoder() {
	return (init_ManagedMemberInstructionDecoder = __esmMin((() => {
		init_binaryContainer();
		init_managedMetadataHeaps();
		init_managedReaderFailure();
		PREFIX_OPCODES = new Set([
			"unaligned.",
			"volatile.",
			"tail.",
			"constrained.",
			"readonly.",
			"no."
		]);
		OPCODES = new Map([
			[0, {
				name: "nop",
				operand: "none"
			}],
			[1, {
				name: "break",
				operand: "none"
			}],
			[2, {
				name: "ldarg.0",
				operand: "none"
			}],
			[3, {
				name: "ldarg.1",
				operand: "none"
			}],
			[4, {
				name: "ldarg.2",
				operand: "none"
			}],
			[5, {
				name: "ldarg.3",
				operand: "none"
			}],
			[6, {
				name: "ldloc.0",
				operand: "none"
			}],
			[7, {
				name: "ldloc.1",
				operand: "none"
			}],
			[8, {
				name: "ldloc.2",
				operand: "none"
			}],
			[9, {
				name: "ldloc.3",
				operand: "none"
			}],
			[10, {
				name: "stloc.0",
				operand: "none"
			}],
			[11, {
				name: "stloc.1",
				operand: "none"
			}],
			[12, {
				name: "stloc.2",
				operand: "none"
			}],
			[13, {
				name: "stloc.3",
				operand: "none"
			}],
			[14, {
				name: "ldarg.s",
				operand: "short-var"
			}],
			[15, {
				name: "ldarga.s",
				operand: "short-var"
			}],
			[16, {
				name: "starg.s",
				operand: "short-var"
			}],
			[17, {
				name: "ldloc.s",
				operand: "short-var"
			}],
			[18, {
				name: "ldloca.s",
				operand: "short-var"
			}],
			[19, {
				name: "stloc.s",
				operand: "short-var"
			}],
			[20, {
				name: "ldnull",
				operand: "none"
			}],
			[21, {
				name: "ldc.i4.m1",
				operand: "none"
			}],
			[22, {
				name: "ldc.i4.0",
				operand: "none"
			}],
			[23, {
				name: "ldc.i4.1",
				operand: "none"
			}],
			[24, {
				name: "ldc.i4.2",
				operand: "none"
			}],
			[25, {
				name: "ldc.i4.3",
				operand: "none"
			}],
			[26, {
				name: "ldc.i4.4",
				operand: "none"
			}],
			[27, {
				name: "ldc.i4.5",
				operand: "none"
			}],
			[28, {
				name: "ldc.i4.6",
				operand: "none"
			}],
			[29, {
				name: "ldc.i4.7",
				operand: "none"
			}],
			[30, {
				name: "ldc.i4.8",
				operand: "none"
			}],
			[31, {
				name: "ldc.i4.s",
				operand: "short-i"
			}],
			[32, {
				name: "ldc.i4",
				operand: "i"
			}],
			[33, {
				name: "ldc.i8",
				operand: "i8"
			}],
			[34, {
				name: "ldc.r4",
				operand: "r4"
			}],
			[35, {
				name: "ldc.r8",
				operand: "r8"
			}],
			[37, {
				name: "dup",
				operand: "none"
			}],
			[38, {
				name: "pop",
				operand: "none"
			}],
			[39, {
				name: "jmp",
				operand: "method"
			}],
			[40, {
				name: "call",
				operand: "method"
			}],
			[41, {
				name: "calli",
				operand: "signature"
			}],
			[42, {
				name: "ret",
				operand: "none"
			}],
			[43, {
				name: "br.s",
				operand: "short-branch"
			}],
			[44, {
				name: "brfalse.s",
				operand: "short-branch"
			}],
			[45, {
				name: "brtrue.s",
				operand: "short-branch"
			}],
			[46, {
				name: "beq.s",
				operand: "short-branch"
			}],
			[47, {
				name: "bge.s",
				operand: "short-branch"
			}],
			[48, {
				name: "bgt.s",
				operand: "short-branch"
			}],
			[49, {
				name: "ble.s",
				operand: "short-branch"
			}],
			[50, {
				name: "blt.s",
				operand: "short-branch"
			}],
			[51, {
				name: "bne.un.s",
				operand: "short-branch"
			}],
			[52, {
				name: "bge.un.s",
				operand: "short-branch"
			}],
			[53, {
				name: "bgt.un.s",
				operand: "short-branch"
			}],
			[54, {
				name: "ble.un.s",
				operand: "short-branch"
			}],
			[55, {
				name: "blt.un.s",
				operand: "short-branch"
			}],
			[56, {
				name: "br",
				operand: "branch"
			}],
			[57, {
				name: "brfalse",
				operand: "branch"
			}],
			[58, {
				name: "brtrue",
				operand: "branch"
			}],
			[59, {
				name: "beq",
				operand: "branch"
			}],
			[60, {
				name: "bge",
				operand: "branch"
			}],
			[61, {
				name: "bgt",
				operand: "branch"
			}],
			[62, {
				name: "ble",
				operand: "branch"
			}],
			[63, {
				name: "blt",
				operand: "branch"
			}],
			[64, {
				name: "bne.un",
				operand: "branch"
			}],
			[65, {
				name: "bge.un",
				operand: "branch"
			}],
			[66, {
				name: "bgt.un",
				operand: "branch"
			}],
			[67, {
				name: "ble.un",
				operand: "branch"
			}],
			[68, {
				name: "blt.un",
				operand: "branch"
			}],
			[69, {
				name: "switch",
				operand: "switch"
			}],
			[70, {
				name: "ldind.i1",
				operand: "none"
			}],
			[71, {
				name: "ldind.u1",
				operand: "none"
			}],
			[72, {
				name: "ldind.i2",
				operand: "none"
			}],
			[73, {
				name: "ldind.u2",
				operand: "none"
			}],
			[74, {
				name: "ldind.i4",
				operand: "none"
			}],
			[75, {
				name: "ldind.u4",
				operand: "none"
			}],
			[76, {
				name: "ldind.i8",
				operand: "none"
			}],
			[77, {
				name: "ldind.i",
				operand: "none"
			}],
			[78, {
				name: "ldind.r4",
				operand: "none"
			}],
			[79, {
				name: "ldind.r8",
				operand: "none"
			}],
			[80, {
				name: "ldind.ref",
				operand: "none"
			}],
			[81, {
				name: "stind.ref",
				operand: "none"
			}],
			[82, {
				name: "stind.i1",
				operand: "none"
			}],
			[83, {
				name: "stind.i2",
				operand: "none"
			}],
			[84, {
				name: "stind.i4",
				operand: "none"
			}],
			[85, {
				name: "stind.i8",
				operand: "none"
			}],
			[86, {
				name: "stind.r4",
				operand: "none"
			}],
			[87, {
				name: "stind.r8",
				operand: "none"
			}],
			[88, {
				name: "add",
				operand: "none"
			}],
			[89, {
				name: "sub",
				operand: "none"
			}],
			[90, {
				name: "mul",
				operand: "none"
			}],
			[91, {
				name: "div",
				operand: "none"
			}],
			[92, {
				name: "div.un",
				operand: "none"
			}],
			[93, {
				name: "rem",
				operand: "none"
			}],
			[94, {
				name: "rem.un",
				operand: "none"
			}],
			[95, {
				name: "and",
				operand: "none"
			}],
			[96, {
				name: "or",
				operand: "none"
			}],
			[97, {
				name: "xor",
				operand: "none"
			}],
			[98, {
				name: "shl",
				operand: "none"
			}],
			[99, {
				name: "shr",
				operand: "none"
			}],
			[100, {
				name: "shr.un",
				operand: "none"
			}],
			[101, {
				name: "neg",
				operand: "none"
			}],
			[102, {
				name: "not",
				operand: "none"
			}],
			[103, {
				name: "conv.i1",
				operand: "none"
			}],
			[104, {
				name: "conv.i2",
				operand: "none"
			}],
			[105, {
				name: "conv.i4",
				operand: "none"
			}],
			[106, {
				name: "conv.i8",
				operand: "none"
			}],
			[107, {
				name: "conv.r4",
				operand: "none"
			}],
			[108, {
				name: "conv.r8",
				operand: "none"
			}],
			[109, {
				name: "conv.u4",
				operand: "none"
			}],
			[110, {
				name: "conv.u8",
				operand: "none"
			}],
			[111, {
				name: "callvirt",
				operand: "method"
			}],
			[112, {
				name: "cpobj",
				operand: "type"
			}],
			[113, {
				name: "ldobj",
				operand: "type"
			}],
			[114, {
				name: "ldstr",
				operand: "string"
			}],
			[115, {
				name: "newobj",
				operand: "method"
			}],
			[116, {
				name: "castclass",
				operand: "type"
			}],
			[117, {
				name: "isinst",
				operand: "type"
			}],
			[118, {
				name: "conv.r.un",
				operand: "none"
			}],
			[121, {
				name: "unbox",
				operand: "type"
			}],
			[122, {
				name: "throw",
				operand: "none"
			}],
			[123, {
				name: "ldfld",
				operand: "field"
			}],
			[124, {
				name: "ldflda",
				operand: "field"
			}],
			[125, {
				name: "stfld",
				operand: "field"
			}],
			[126, {
				name: "ldsfld",
				operand: "field"
			}],
			[127, {
				name: "ldsflda",
				operand: "field"
			}],
			[128, {
				name: "stsfld",
				operand: "field"
			}],
			[129, {
				name: "stobj",
				operand: "type"
			}],
			[130, {
				name: "conv.ovf.i1.un",
				operand: "none"
			}],
			[131, {
				name: "conv.ovf.i2.un",
				operand: "none"
			}],
			[132, {
				name: "conv.ovf.i4.un",
				operand: "none"
			}],
			[133, {
				name: "conv.ovf.i8.un",
				operand: "none"
			}],
			[134, {
				name: "conv.ovf.u1.un",
				operand: "none"
			}],
			[135, {
				name: "conv.ovf.u2.un",
				operand: "none"
			}],
			[136, {
				name: "conv.ovf.u4.un",
				operand: "none"
			}],
			[137, {
				name: "conv.ovf.u8.un",
				operand: "none"
			}],
			[138, {
				name: "conv.ovf.i.un",
				operand: "none"
			}],
			[139, {
				name: "conv.ovf.u.un",
				operand: "none"
			}],
			[140, {
				name: "box",
				operand: "type"
			}],
			[141, {
				name: "newarr",
				operand: "type"
			}],
			[142, {
				name: "ldlen",
				operand: "none"
			}],
			[143, {
				name: "ldelema",
				operand: "type"
			}],
			[144, {
				name: "ldelem.i1",
				operand: "none"
			}],
			[145, {
				name: "ldelem.u1",
				operand: "none"
			}],
			[146, {
				name: "ldelem.i2",
				operand: "none"
			}],
			[147, {
				name: "ldelem.u2",
				operand: "none"
			}],
			[148, {
				name: "ldelem.i4",
				operand: "none"
			}],
			[149, {
				name: "ldelem.u4",
				operand: "none"
			}],
			[150, {
				name: "ldelem.i8",
				operand: "none"
			}],
			[151, {
				name: "ldelem.i",
				operand: "none"
			}],
			[152, {
				name: "ldelem.r4",
				operand: "none"
			}],
			[153, {
				name: "ldelem.r8",
				operand: "none"
			}],
			[154, {
				name: "ldelem.ref",
				operand: "none"
			}],
			[155, {
				name: "stelem.i",
				operand: "none"
			}],
			[156, {
				name: "stelem.i1",
				operand: "none"
			}],
			[157, {
				name: "stelem.i2",
				operand: "none"
			}],
			[158, {
				name: "stelem.i4",
				operand: "none"
			}],
			[159, {
				name: "stelem.i8",
				operand: "none"
			}],
			[160, {
				name: "stelem.r4",
				operand: "none"
			}],
			[161, {
				name: "stelem.r8",
				operand: "none"
			}],
			[162, {
				name: "stelem.ref",
				operand: "none"
			}],
			[163, {
				name: "ldelem",
				operand: "type"
			}],
			[164, {
				name: "stelem",
				operand: "type"
			}],
			[165, {
				name: "unbox.any",
				operand: "type"
			}],
			[179, {
				name: "conv.ovf.i1",
				operand: "none"
			}],
			[180, {
				name: "conv.ovf.u1",
				operand: "none"
			}],
			[181, {
				name: "conv.ovf.i2",
				operand: "none"
			}],
			[182, {
				name: "conv.ovf.u2",
				operand: "none"
			}],
			[183, {
				name: "conv.ovf.i4",
				operand: "none"
			}],
			[184, {
				name: "conv.ovf.u4",
				operand: "none"
			}],
			[185, {
				name: "conv.ovf.i8",
				operand: "none"
			}],
			[186, {
				name: "conv.ovf.u8",
				operand: "none"
			}],
			[194, {
				name: "refanyval",
				operand: "type"
			}],
			[195, {
				name: "ckfinite",
				operand: "none"
			}],
			[198, {
				name: "mkrefany",
				operand: "type"
			}],
			[208, {
				name: "ldtoken",
				operand: "token"
			}],
			[209, {
				name: "conv.u2",
				operand: "none"
			}],
			[210, {
				name: "conv.u1",
				operand: "none"
			}],
			[211, {
				name: "conv.i",
				operand: "none"
			}],
			[212, {
				name: "conv.ovf.i",
				operand: "none"
			}],
			[213, {
				name: "conv.ovf.u",
				operand: "none"
			}],
			[214, {
				name: "add.ovf",
				operand: "none"
			}],
			[215, {
				name: "add.ovf.un",
				operand: "none"
			}],
			[216, {
				name: "mul.ovf",
				operand: "none"
			}],
			[217, {
				name: "mul.ovf.un",
				operand: "none"
			}],
			[218, {
				name: "sub.ovf",
				operand: "none"
			}],
			[219, {
				name: "sub.ovf.un",
				operand: "none"
			}],
			[220, {
				name: "endfinally",
				operand: "none"
			}],
			[221, {
				name: "leave",
				operand: "branch"
			}],
			[222, {
				name: "leave.s",
				operand: "short-branch"
			}],
			[223, {
				name: "stind.i",
				operand: "none"
			}],
			[224, {
				name: "conv.u",
				operand: "none"
			}],
			[65024, {
				name: "arglist",
				operand: "none"
			}],
			[65025, {
				name: "ceq",
				operand: "none"
			}],
			[65026, {
				name: "cgt",
				operand: "none"
			}],
			[65027, {
				name: "cgt.un",
				operand: "none"
			}],
			[65028, {
				name: "clt",
				operand: "none"
			}],
			[65029, {
				name: "clt.un",
				operand: "none"
			}],
			[65030, {
				name: "ldftn",
				operand: "method"
			}],
			[65031, {
				name: "ldvirtftn",
				operand: "method"
			}],
			[65033, {
				name: "ldarg",
				operand: "var"
			}],
			[65034, {
				name: "ldarga",
				operand: "var"
			}],
			[65035, {
				name: "starg",
				operand: "var"
			}],
			[65036, {
				name: "ldloc",
				operand: "var"
			}],
			[65037, {
				name: "ldloca",
				operand: "var"
			}],
			[65038, {
				name: "stloc",
				operand: "var"
			}],
			[65039, {
				name: "localloc",
				operand: "none"
			}],
			[65041, {
				name: "endfilter",
				operand: "none"
			}],
			[65042, {
				name: "unaligned.",
				operand: "short-i"
			}],
			[65043, {
				name: "volatile.",
				operand: "none"
			}],
			[65044, {
				name: "tail.",
				operand: "none"
			}],
			[65045, {
				name: "initobj",
				operand: "type"
			}],
			[65046, {
				name: "constrained.",
				operand: "type"
			}],
			[65047, {
				name: "cpblk",
				operand: "none"
			}],
			[65048, {
				name: "initblk",
				operand: "none"
			}],
			[65049, {
				name: "no.",
				operand: "short-i"
			}],
			[65050, {
				name: "rethrow",
				operand: "none"
			}],
			[65052, {
				name: "sizeof",
				operand: "type"
			}],
			[65053, {
				name: "refanytype",
				operand: "none"
			}],
			[65054, {
				name: "readonly.",
				operand: "none"
			}]
		]);
		tokenKind = (table) => {
			if (table === 6 || table === 43) return "method";
			if (table === 4) return "field";
			if (table === 112) return "string";
			if (table === 17) return "signature";
			if (table === 10) return "token";
			if (table === 1 || table === 2 || table === 27) return "type";
			return "token";
		};
		floatingPointOperand = (value) => Object.is(value, -0) ? "-0" : String(value);
		fixed = (width, read) => ({
			width,
			read
		});
		FIXED_OPERAND_READERS = new Map([
			["none", fixed(0, () => ({
				anchorKind: "none",
				value: null
			}))],
			["short-var", fixed(1, (reader, offset) => ({
				anchorKind: "variable",
				value: String(reader.u8(offset))
			}))],
			["var", fixed(2, (reader, offset) => ({
				anchorKind: "variable",
				value: String(reader.u16(offset))
			}))],
			["short-i", fixed(1, (reader, offset) => ({
				anchorKind: "constant",
				value: String(reader.i8(offset))
			}))],
			["i", fixed(4, (reader, offset) => ({
				anchorKind: "constant",
				value: String(reader.i32(offset))
			}))],
			["i8", fixed(8, (reader, offset) => ({
				anchorKind: "constant",
				value: reader.i64(offset).toString()
			}))],
			["r4", fixed(4, (reader, offset) => ({
				anchorKind: "constant",
				value: floatingPointOperand(reader.f32(offset))
			}))],
			["r8", fixed(8, (reader, offset) => ({
				anchorKind: "constant",
				value: floatingPointOperand(reader.f64(offset))
			}))],
			["short-branch", fixed(1, (reader, offset) => ({
				anchorKind: "branch",
				value: String(offset + 1 + reader.i8(offset))
			}))],
			["branch", fixed(4, (reader, offset) => ({
				anchorKind: "branch",
				value: String(offset + 4 + reader.i32(offset))
			}))]
		]);
		TOKEN_OPERAND_KINDS = new Map([
			["method", "method"],
			["field", "field"],
			["type", "type"],
			["string", "string"],
			["signature", "signature"]
		]);
		TOKEN_OPERAND_WIDTH = 4;
		SWITCH_WORD_BYTES = 4;
		readOperand = (reader, offset, kind, fixedOperand, hasReference, switchCount, memberRefKind) => {
			if (fixedOperand !== undefined) return fixedOperand.read(reader, offset);
			if (switchCount !== undefined) return {
				anchorKind: "switch",
				value: String(switchCount)
			};
			if (!hasReference) return {
				anchorKind: "unknown",
				value: null
			};
			const reference = metadataTokenFact(reader.u32(offset));
			const { token } = reference;
			return {
				anchorKind: TOKEN_OPERAND_KINDS.get(kind) ?? (kind === "token" ? memberRefKind?.(token) : undefined) ?? tokenKind(reference.table),
				value: token,
				reference
			};
		};
		decodeInstructions = (il, admitInstruction, memberRefKind) => {
			const reader = new BinaryReader(il, true, "cil");
			const parsed = [];
			const instructionStarts = [];
			let offset = 0;
			let prefixStart = null;
			let issue = null;
			try {
				while (offset < il.length) {
					const start = offset;
					const first = reader.u8(offset);
					offset += 1;
					if (first === 254 && offset >= il.length) {
						issue = `Two-byte CIL opcode at IL offset ${String(start)} leaves method body`;
						break;
					}
					const code = first === 254 ? 65024 + reader.u8(offset++) : first;
					const descriptor = OPCODES.get(code);
					if (descriptor === undefined) {
						issue = `Unsupported CIL opcode 0x${code.toString(16)} at IL offset ${String(start)}`;
						break;
					}
					const { operand: kind } = descriptor;
					const fixedOperand = FIXED_OPERAND_READERS.get(kind);
					const hasReference = TOKEN_OPERAND_KINDS.has(kind) || kind === "token";
					const switchCount = kind === "switch" && offset <= il.length - SWITCH_WORD_BYTES ? reader.u32(offset) : undefined;
					const extent = kind === "switch" ? switchCount === undefined ? undefined : SWITCH_WORD_BYTES * (1 + switchCount) : fixedOperand?.width ?? (hasReference ? TOKEN_OPERAND_WIDTH : 0);
					if (extent === undefined || extent > il.length - offset) {
						issue = `Instruction ${descriptor.name} at IL offset ${String(start)} leaves method body`;
						break;
					}
					admitInstruction?.(start, hasReference);
					const operand = readOperand(reader, offset, kind, fixedOperand, hasReference, switchCount, memberRefKind);
					offset += extent;
					if (PREFIX_OPCODES.has(descriptor.name)) {
						prefixStart ??= start;
					} else {
						instructionStarts.push(prefixStart ?? start);
						prefixStart = null;
					}
					parsed.push({
						offset: start,
						opcode: descriptor.name,
						operandKind: operand.anchorKind,
						operand: operand.value,
						reference: operand.reference ?? null
					});
				}
			} catch (cause) {
				if (cause instanceof ManagedReaderFailure) throw cause;
				issue = cause instanceof Error ? cause.message : "Instruction decode failed";
			}
			if (issue === null && prefixStart !== null) issue = `CIL prefix chain at IL offset ${String(prefixStart)} has no following instruction`;
			const truncated = offset < il.length && issue === null ? 1 : 0;
			return {
				parsed,
				instructionStarts,
				count: parsed.length,
				truncated,
				issue
			};
		};
		parseExceptionRegions = (bytes, offset, methodEnd, budget) => {
			const reader = new BinaryReader(bytes, true, "cil");
			const regions = [];
			const catchTokens = new Map();
			let sectionOffset = offset;
			let hasMoreSections = true;
			while (hasMoreSections) {
				if (!Number.isSafeInteger(sectionOffset) || sectionOffset < 0 || sectionOffset > methodEnd - 4 || sectionOffset > bytes.length - 4) return malformedExceptionRegions("Exception section header leaves artifact", regions, catchTokens);
				const header = reader.u32(sectionOffset);
				const kind = header & 255;
				if ((kind & 63) !== 1) return malformedExceptionRegions(`Unsupported method data section kind ${String(kind & 63)}`, regions, catchTokens);
				const fat = (kind & 64) !== 0;
				const size = fat ? header >>> 8 : header >>> 8 & 255;
				const clauseSize = fat ? 24 : 12;
				if (size < 4 || sectionOffset > methodEnd - size || sectionOffset > bytes.length - size) return malformedExceptionRegions("Exception section size leaves artifact", regions, catchTokens);
				let count;
				let sectionSize = size;
				if (fat) {
					if ((size - 4) % clauseSize !== 0) return malformedExceptionRegions("Exception section size does not contain whole clauses", regions, catchTokens);
					count = (size - 4) / clauseSize;
				} else if ((size - 4) % clauseSize === 0) {
					count = (size - 4) / clauseSize;
				} else if (size >= clauseSize && size % clauseSize === 0) {
					count = size / clauseSize;
					sectionSize = 4 + count * clauseSize;
				} else {
					return malformedExceptionRegions("Exception section size does not contain whole clauses", regions, catchTokens);
				}
				if (sectionOffset > methodEnd - sectionSize || sectionOffset > bytes.length - sectionSize) return malformedExceptionRegions("Exception section size leaves artifact", regions, catchTokens);
				if (!fat && header >>> 16 !== 0) return malformedExceptionRegions("Small exception section reserved bytes are nonzero", regions, catchTokens);
				budget?.admitTransient(count * 256, sectionOffset);
				for (const region of readExceptionClauses(reader, {
					start: sectionOffset + 4,
					count,
					fat,
					budget
				}, catchTokens, regions.length)) regions.push(region);
				hasMoreSections = (kind & 128) !== 0;
				sectionOffset += sectionSize;
			}
			return {
				status: "complete",
				regions,
				catchTokens
			};
		};
		malformedExceptionRegions = (issue, regions, catchTokens) => ({
			status: "malformed",
			regions,
			catchTokens,
			issue
		});
		readExceptionClauses = (reader, { start, count, fat, budget }, catchTokens, firstOrdinal) => {
			const regions = [];
			const clauseSize = fat ? 24 : 12;
			for (let index = 0; index < count; index += 1) {
				const clause = start + index * clauseSize;
				const flags = fat ? reader.u32(clause) : reader.u16(clause);
				const extra = reader.u32(clause + (fat ? 20 : 8));
				if (flags === 0) budget?.admitTransient(256, clause);
				const reference = flags === 0 ? metadataTokenFact(extra) : null;
				if (reference !== null) catchTokens.set(firstOrdinal + index, reference);
				regions.push({
					flags,
					try_offset: fat ? reader.u32(clause + 4) : reader.u16(clause + 2),
					try_length: fat ? reader.u32(clause + 8) : reader.u8(clause + 4),
					handler_offset: fat ? reader.u32(clause + 12) : reader.u16(clause + 5),
					handler_length: fat ? reader.u32(clause + 16) : reader.u8(clause + 7),
					class_token: reference?.token ?? null,
					class_type: null,
					class_type_name_sha256: null,
					class_type_identity_resolved: null,
					filter_offset: flags === 1 ? extra : null
				});
			}
			return regions;
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedExceptionRegionValidation.js
var clauseFlagsIssue, methodExtentIssue, instructionBoundaryIssue, filterOrderingIssue, clauseIssue, validateExceptionRegionRanges;
function init_ManagedExceptionRegionValidation() {
	return (init_ManagedExceptionRegionValidation = __esmMin((() => {
		clauseFlagsIssue = (region) => [
			0,
			1,
			2,
			4
		].includes(region.flags) ? null : `Exception clause has unsupported flags 0x${region.flags.toString(16)}`;
		methodExtentIssue = (start, length, ilSize, name) => start <= ilSize && length <= ilSize - start ? null : `Exception clause ${name} range leaves the method IL body`;
		instructionBoundaryIssue = (start, length, boundaries, name) => {
			const end = start + length;
			return boundaries.has(start) && boundaries.has(end) ? null : `Exception clause ${name} range does not align with CIL instruction boundaries`;
		};
		filterOrderingIssue = (region, ilSize) => {
			if (region.flags !== 1) return null;
			const offset = region.filter_offset;
			return offset !== null && offset < ilSize && offset < region.handler_offset ? null : "Exception clause filter must start before its handler within the method IL body";
		};
		clauseIssue = (region, ilSize, boundaries) => clauseFlagsIssue(region) ?? methodExtentIssue(region.try_offset, region.try_length, ilSize, "try") ?? instructionBoundaryIssue(region.try_offset, region.try_length, boundaries, "try") ?? methodExtentIssue(region.handler_offset, region.handler_length, ilSize, "handler") ?? instructionBoundaryIssue(region.handler_offset, region.handler_length, boundaries, "handler") ?? (region.flags === 1 && region.filter_offset !== null ? instructionBoundaryIssue(region.filter_offset, 0, boundaries, "filter") : null) ?? filterOrderingIssue(region, ilSize);
		validateExceptionRegionRanges = (parsed, ilSize, instructionOffsets) => {
			if (parsed.status === "malformed") return parsed;
			const boundaries = new Set([...instructionOffsets, ilSize]);
			for (const region of parsed.regions) {
				const issue = clauseIssue(region, ilSize, boundaries);
				if (issue !== null) return {
					...parsed,
					status: "malformed",
					issue
				};
			}
			return parsed;
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedMethodBodyReader.js
var EMPTY_CATCH_TOKENS, bodyStatus, requireMethodBodyBytes, readMethodBodyHeader, methodBody, emptyMethodBody;
function init_ManagedMethodBodyReader() {
	return (init_ManagedMethodBodyReader = __esmMin((() => {
		init_parseFailure();
		init_binaryContainer();
		init_managedDecodeBudget();
		init_ManagedMemberInstructionDecoder();
		init_ManagedExceptionRegionValidation();
		init_managedMetadataHeaps();
		init_managedMemberInspectorCore();
		init_managedReaderFailure();
		init_sha256Hex();
		EMPTY_CATCH_TOKENS = new Map();
		bodyStatus = (decodedIssue, truncatedInstructions, exceptionRegions, localSigFailure) => {
			if (decodedIssue !== null || exceptionRegions?.status === "malformed" || localSigFailure === "malformed") return "malformed";
			if (truncatedInstructions > 0 || localSigFailure === "partial") return "partial";
			return "present";
		};
		requireMethodBodyBytes = (available, required) => {
			if (required > available) throw malformedInput("cil-method-body", "Method body leaves file-backed PE section data");
		};
		readMethodBodyHeader = (reader) => {
			const first = reader.u8(0);
			if ((first & 3) === 2) return {
				format: "tiny",
				size: 1,
				flags: 0,
				maxStack: 8,
				ilSize: first >> 2,
				localSig: 0
			};
			if ((first & 3) !== 3) throw unsupportedInput("cil-method-body", "Unsupported method body header");
			requireMethodBodyBytes(reader.bytes.length, 12);
			const flagsAndSize = reader.u16(0);
			const headerDwords = flagsAndSize >>> 12;
			if (headerDwords < 3) throw malformedInput("cil-method-body", "Fat method body header is smaller than 12 bytes");
			return {
				format: "fat",
				size: headerDwords * 4,
				flags: flagsAndSize & 4095,
				maxStack: reader.u16(2),
				ilSize: reader.u32(4),
				localSig: reader.u32(8)
			};
		};
		methodBody = (bytes, pe, rva, context) => {
			const issues = [];
			if (rva === 0) return {
				body: emptyMethodBody(rva, "absent", null),
				tokenInstructions: [],
				catchTokens: EMPTY_CATCH_TOKENS,
				scanned: true,
				issues
			};
			const native = context.implementation.codeType !== "il" || context.implementation.managedKind !== "managed" || context.implementation.pinvokeFlag || context.implementation.internalCall;
			if (native) {
				const issue = "CIL decoding is unavailable for native, runtime, InternalCall, unmanaged, or P/Invoke implementations";
				return {
					body: emptyMethodBody(rva, "partial", issue),
					tokenInstructions: [],
					catchTokens: EMPTY_CATCH_TOKENS,
					scanned: true,
					issues
				};
			}
			try {
				const { offset, available: methodExtent } = pe.rvaFileRange(rva, "method.body");
				const methodBytes = bytes.subarray(offset, offset + methodExtent);
				const reader = new BinaryReader(methodBytes, true, "cil-method-body");
				const header = readMethodBodyHeader(reader);
				const bodySize = header.size + header.ilSize;
				requireMethodBodyBytes(methodExtent, bodySize);
				const ilOffset = offset + header.size;
				const il = methodBytes.subarray(header.size, bodySize);
				const decoded = decodeInstructions(il, (start, hasReference) => {
					context.budget.admitTransient(256, ilOffset + start);
					if (hasReference) context.budget.admitTransient(256, ilOffset + start);
				}, (token) => context.memberRefKinds.get(token));
				const opcodeCounts = {};
				for (const instruction of decoded.parsed) opcodeCounts[instruction.opcode] = (opcodeCounts[instruction.opcode] ?? 0) + 1;
				const anchors = decoded.parsed.map((instruction) => ({
					il_offset: instruction.offset,
					opcode: instruction.opcode,
					operand_kind: instruction.operandKind,
					operand: instruction.operand
				}));
				const normalized = Buffer.from(JSON.stringify(decoded.parsed.map(({ opcode, operandKind, operand }) => [
					opcode,
					operandKind,
					operand
				])), "utf8");
				const methodEnd = ilOffset + header.ilSize;
				const sectionOffset = Math.ceil(methodEnd / 4) * 4;
				const exceptionRegions = header.format === "fat" && (header.flags & 8) !== 0 ? validateExceptionRegionRanges(parseExceptionRegions(bytes, sectionOffset, offset + methodExtent, context.budget), header.ilSize, decoded.instructionStarts) : null;
				let localVarSignature = null;
				let localSigIssue = null;
				let localSigFailure = null;
				const localSignature = header.localSig === 0 ? null : metadataTokenFact(header.localSig);
				if (localSignature !== null) {
					const { table, row, token } = localSignature;
					const rows = context.metadataLayout.table(17)?.rowCount ?? 0;
					if (table !== 17 || row === 0 || row > rows) {
						localSigIssue = `LocalVarSigTok ${token} does not name an existing StandAloneSig row`;
						localSigFailure = "malformed";
						issues.push({
							code: "invalid-row",
							scope: `MethodDef:${context.methodToken}.body.local_var_sig_token`,
							offset: offset + 8,
							detail: localSigIssue
						});
					} else {
						const signatureScope = `metadata.StandAloneSig:${token}.signature`;
						try {
							const cursor = metadataRowCursor(bytes, context.metadataLayout, 17, row);
							const blob = readMetadataBlob(bytes, context.metadataLayout, cursor.readIndex(context.metadataLayout.blobIndexSize));
							const signatureFacts = readLocalSignatureFacts(context.metadataLayout, blob, {
								scope: signatureScope,
								blobOffset: blob.byteOffset - bytes.byteOffset
							}, context.budget);
							if (signatureFacts.ok) localVarSignature = signatureFacts.value;
							else {
								const signatureIssue = signatureFacts.error;
								localSigIssue = signatureIssue.detail;
								localSigFailure = signatureIssue.code === "unsupported-signature" ? "partial" : "malformed";
								issues.push(signatureIssue);
							}
						} catch (cause) {
							if (cause instanceof ManagedReaderFailure && cause.issue.code === "resource-limit") throw cause;
							if (!(cause instanceof ManagedReaderFailure)) throw cause;
							localSigIssue = cause.issue.detail;
							if (cause instanceof ManagedHeapAmbiguityFailure) localSigFailure = "partial";
							else {
								localSigFailure = "malformed";
								issues.push({
									...cause.issue,
									scope: signatureScope
								});
							}
						}
					}
				}
				const status = bodyStatus(decoded.issue, decoded.truncated, exceptionRegions, localSigFailure);
				const bodyIssues = [
					decoded.issue,
					exceptionRegions?.status === "malformed" ? exceptionRegions.issue : null,
					localSigIssue,
					decoded.truncated > 0 ? "Instruction decoding stopped before the end of the method body" : null
				].filter((issue) => issue !== null);
				const body = {
					status,
					header_format: header.format,
					rva,
					file_offset: offset,
					max_stack: header.maxStack,
					init_locals: (header.flags & 16) !== 0,
					local_var_sig_token: localSignature?.token ?? null,
					local_var_signature: localVarSignature,
					il_size: header.ilSize,
					il_sha256: sha256Hex(il),
					normalized_il_sha256: status === "present" ? sha256Hex(normalized) : null,
					instruction_count: decoded.count,
					decoded_instruction_count: decoded.parsed.length,
					truncated_instructions: decoded.truncated,
					opcode_counts: opcodeCounts,
					anchors,
					exception_regions: exceptionRegions?.regions ?? [],
					issue: bodyIssues.length > 0 ? bodyIssues.join("; ") : null
				};
				const admittedBody = admitManagedProjection(body, context.budget);
				const tokenInstructions = [];
				for (const instruction of decoded.parsed) {
					if (!isParsedTokenInstruction(instruction)) continue;
					context.budget.reserve(256 + (tokenInstructions.length === 0 ? 64 : 0), ilOffset + instruction.offset);
					tokenInstructions.push(instruction);
				}
				const catchTokens = exceptionRegions?.catchTokens.size ? exceptionRegions.catchTokens : EMPTY_CATCH_TOKENS;
				if (catchTokens.size > 0) context.budget.reserve(64 + catchTokens.size * 256, sectionOffset);
				return {
					body: admittedBody,
					tokenInstructions,
					catchTokens,
					scanned: decoded.issue === null && decoded.truncated === 0,
					issues
				};
			} catch (cause) {
				if (cause instanceof ManagedReaderFailure && cause.issue.code === "resource-limit") throw cause;
				if (!(cause instanceof ManagedReaderFailure) && parseFailureFromCause(cause) === undefined) throw cause;
				return {
					body: emptyMethodBody(rva, "malformed", cause instanceof Error ? cause.message : "Method body parse failed"),
					tokenInstructions: [],
					catchTokens: EMPTY_CATCH_TOKENS,
					scanned: false,
					issues
				};
			} finally {
				context.budget.releaseTransient();
			}
		};
		emptyMethodBody = (rva, status, issue) => ({
			status,
			header_format: status === "absent" ? "none" : "unknown",
			rva,
			file_offset: null,
			max_stack: null,
			init_locals: null,
			local_var_sig_token: null,
			local_var_signature: null,
			il_size: 0,
			il_sha256: null,
			normalized_il_sha256: null,
			instruction_count: 0,
			decoded_instruction_count: 0,
			truncated_instructions: 0,
			opcode_counts: {},
			anchors: [],
			exception_regions: [],
			issue
		});
	})))();
}

//#endregion
//#region dist/dotnet/ManagedMemberRows.js
var isSelected, parseFields$1, TYPE_FORWARDER_FLAG, parseExportedTypes, parseMemberRefs, parseMethods$1, readReferencedMemberCores, NAMEABLE_KINDS, targetKind, namedTarget, edges, callerName, callerNameBytes, budgetedSignature;
function init_ManagedMemberRows() {
	return (init_ManagedMemberRows = __esmMin((() => {
		init_ManagedFieldDefinitionRows();
		init_ManagedFieldConstants();
		init_managedMemberReferenceRows();
		init_ManagedMethodDefinitionRows();
		init_jsonStringByteLength();
		init_managedMemberInstructionFacts();
		init_managedDecodeBudget();
		init_managedMetadataLayout();
		init_managedMemberInspectorCore();
		init_managedMetadataHeaps();
		init_managedReaderFailure();
		init_ManagedMethodBodyReader();
		init_managedMemberOwnership();
		init_managedUnresolvedDefinitions();
		isSelected = (selected, declared) => selected === null || declared !== undefined && selected.has(declared.token);
		parseFields$1 = (bytes, layout, ranges, memberLists, { signatureTypeName, displayTypeName, declarationTypeName, selected = null }) => {
			const fields = [];
			const core = new Map();
			const issues = [];
			const constant = createManagedFieldConstantReader(bytes, layout, issues);
			const table = layout.table(4);
			const ownerRow = readManagedValue(() => memberDeclaringTypeRowLookup(bytes, layout, 4, memberLists), issues);
			for (let row = 1; row <= (table?.rowCount ?? 0); row += 1) {
				const owner = ownerRow === undefined ? undefined : readManagedValue(() => ownerRow(row), issues);
				const declared = owner === undefined ? undefined : ranges[owner - 1];
				if (owner !== undefined && selected !== null && !isSelected(selected, declared)) continue;
				readManagedValue(() => {
					const definition = readFieldDefinitionRow(bytes, layout, row);
					const { token, rowOffset, flags, signatureIndex } = definition;
					const name = readFieldDefinitionName(bytes, layout, definition);
					const owned = owner ?? 0;
					core.set(token, {
						token,
						name,
						declaringType: declared?.fullName ?? null,
						kind: "field"
					});
					if (!isSelected(selected, declared)) return;
					const sig = readMetadataBlob(bytes, layout, signatureIndex);
					const decoded = budgetedSignature(sig, layout, signatureTypeName, displayTypeName, issues, {
						scope: `Field:${token}.signature`,
						kind: "field",
						artifact: bytes
					});
					core.set(token, {
						token,
						name,
						declaringType: declared?.fullName ?? null,
						kind: "field",
						identitySha256: memberTargetIdentity(name, declared === undefined ? null : {
							table: 2,
							row: owned
						}, decoded, declarationTypeName)
					});
					fields.push({
						token,
						row_offset: rowOffset,
						declaring_type_token: declared?.token ?? null,
						declaring_type: declared?.fullName ?? null,
						name,
						flags,
						signature: decoded,
						constant: constant(row, flags)
					});
				}, issues);
			}
			return {
				fields,
				core,
				issues
			};
		};
		TYPE_FORWARDER_FLAG = 2097152;
		parseExportedTypes = (bytes, layout) => {
			const exportedTypes = [];
			const issues = [];
			const table = layout.table(39);
			for (let row = 1; row <= (table?.rowCount ?? 0); row += 1) {
				readManagedValue(() => {
					const cursor = metadataRowCursor(bytes, layout, 39, row);
					const flags = cursor.u32();
					const typeDefId = cursor.u32();
					const name = readMetadataString(bytes, layout, cursor.readIndex(layout.stringIndexSize));
					const namespace = readMetadataString(bytes, layout, cursor.readIndex(layout.stringIndexSize));
					const implementationOffset = cursor.offset;
					const implementationRaw = cursor.readIndex(layout.codedIndexSize("Implementation"));
					const token = metadataToken(39, row);
					const implementation = decodeMetadataCodedIndex(implementationRaw, MANAGED_CODED_INDEXES.Implementation.bits, MANAGED_CODED_INDEXES.Implementation.tables, layout.rowCounts);
					if (implementation.kind !== "valid") issues.push({
						code: "invalid-row",
						scope: `metadata.ExportedType:${token}`,
						offset: implementationOffset,
						detail: implementation.kind === "null" ? "ExportedType implementation coded index 0x0 is null, but the Implementation column must reference a row" : `ExportedType implementation coded index 0x${implementationRaw.toString(16)} is invalid: ${implementation.reason}`
					});
					exportedTypes.push({
						token,
						row_offset: cursor.start,
						namespace,
						name,
						flags,
						forwarder: (flags & TYPE_FORWARDER_FLAG) !== 0,
						type_def_id: typeDefId,
						implementation_token: implementation.kind === "valid" ? implementation.token : null
					});
				}, issues);
			}
			return {
				exportedTypes,
				issues
			};
		};
		parseMemberRefs = (bytes, layout, { typeName, isResolvedTypeSpec, signatureTypeName, displayTypeName, declarationTypeName }) => {
			const refs = [];
			const core = new Map();
			const issues = [];
			const table = layout.table(10);
			for (let row = 1; row <= (table?.rowCount ?? 0); row += 1) {
				readManagedValue(() => {
					const { token, rowOffset, parentRaw, parent, nameIndex, signatureIndex } = readMemberReferenceRowFacts(bytes, layout, row);
					const name = readMetadataString(bytes, layout, nameIndex);
					const sig = readMetadataBlob(bytes, layout, signatureIndex);
					if (parent.kind !== "valid") issues.push({
						code: "invalid-row",
						scope: `metadata.MemberRef:${token}`,
						offset: rowOffset,
						detail: parent.kind === "null" ? "MemberRef parent coded index 0x0 is null, but the Class column must reference a row" : `MemberRef parent coded index 0x${parentRaw.toString(16)} is invalid: ${parent.reason}`
					});
					const parentToken = parent.kind === "valid" ? parent.token : null;
					const parentName = typeName(parent.kind === "valid" ? parent : null);
					const decoded = budgetedSignature(sig, layout, signatureTypeName, displayTypeName, issues, {
						scope: `MemberRef:${token}.signature`,
						artifact: bytes
					});
					refs.push({
						token,
						row_offset: rowOffset,
						parent_token: parentToken,
						parent_name: parentName,
						name,
						signature: decoded
					});
					core.set(token, {
						token,
						name,
						declaringType: parentName,
						kind: decoded.kind,
						genericArity: signatureGenericArity(decoded),
						rowResolved: parent.kind === "valid" && parent.table === 27 && isResolvedTypeSpec(parent) && decoded.parse_status === "decoded" && decoded.resolved_sha256 !== null,
						identitySha256: memberTargetIdentity(name, parent.kind === "valid" ? parent : null, decoded, declarationTypeName)
					});
				}, issues);
			}
			return {
				refs,
				core,
				issues
			};
		};
		parseMethods$1 = ({ bytes, layout, pe, ranges, signatureTypeName, displayTypeName, declarationTypeName, memberRefKinds, memberLists, selected = null, methodOffset = 0, methodLimit = Number.MAX_SAFE_INTEGER }) => {
			const methods = [];
			const unresolvedDefinitions = [];
			const core = new Map();
			const issues = [];
			let unscannedMethods = 0;
			const table = layout.table(6);
			const ownerRow = readManagedValue(() => memberDeclaringTypeRowLookup(bytes, layout, 6, memberLists), issues);
			for (let row = 1; row <= (table?.rowCount ?? 0); row += 1) {
				const owner = ownerRow === undefined ? undefined : readManagedValue(() => ownerRow(row), issues);
				const declared = owner === undefined ? undefined : ranges[owner - 1];
				const inPage = row > methodOffset && row - methodOffset <= methodLimit;
				const selectedForEvidence = inPage && isSelected(selected, declared);
				const mayBeSelected = inPage && (selected === null || owner === undefined || owner === 0 || isSelected(selected, declared) || declared?.fullName === null);
				if (owner !== undefined && selected !== null && !isSelected(selected, declared)) {
					if (mayBeSelected) unscannedMethods += 1;
					continue;
				}
				const produced = methods.length;
				readManagedValue(() => {
					const definition = readMethodDefinitionRow(bytes, layout, row);
					const { token, rowOffset, rva, implFlags, flags, signatureIndex, implementation } = definition;
					const name = readDefinitionField(() => readMethodDefinitionName(bytes, layout, definition), issues, "Name", definition.nameOffset, definition.nameIndex);
					if (typeof name !== "string") {
						if (selectedForEvidence) unresolvedDefinitions.push(admitManagedProjection({
							kind: "MethodDef",
							token,
							row_offset: rowOffset,
							declaring_type_token: declared?.token ?? null,
							rva,
							failed_fields: [name]
						}, managedDecodeBudget(layout)));
						return;
					}
					const member = {
						token,
						name,
						declaringType: declared?.fullName ?? null,
						kind: "method"
					};
					core.set(token, member);
					if (!selectedForEvidence) return;
					const sig = readMetadataBlob(bytes, layout, signatureIndex);
					const decoded = budgetedSignature(sig, layout, signatureTypeName, displayTypeName, issues, {
						scope: `MethodDef:${token}.signature`,
						kind: "method",
						artifact: bytes
					});
					core.set(token, {
						...member,
						genericArity: signatureGenericArity(decoded),
						identitySha256: memberTargetIdentity(name, declared === undefined || owner === undefined ? null : {
							table: 2,
							row: owner
						}, decoded, declarationTypeName)
					});
					const read = methodBody(bytes, pe, rva, {
						implementation,
						budget: managedDecodeBudget(layout),
						metadataLayout: layout,
						methodToken: token,
						memberRefKinds
					});
					appendManagedParseIssues(issues, read.issues);
					if (!read.scanned) unscannedMethods += 1;
					managedDecodeBudget(layout).reserve(128, rowOffset);
					methods.push({
						tokenInstructions: read.tokenInstructions,
						catchTokens: read.catchTokens,
						method: {
							token,
							row_offset: rowOffset,
							declaring_type_token: declared?.token ?? null,
							declaring_type: declared?.fullName ?? null,
							name,
							rva,
							impl_flags: implFlags,
							flags,
							signature: decoded,
							body: read.body
						}
					});
				}, issues);
				if (mayBeSelected && methods.length === produced) unscannedMethods += 1;
			}
			return {
				methods,
				core,
				issues,
				unscannedMethods,
				unresolvedDefinitions
			};
		};
		readReferencedMemberCores = (bytes, layout, ranges, memberLists, references) => {
			const core = new Map();
			const issues = [];
			const ownerRows = new Map();
			const ownerOf = (table, row) => {
				if (!ownerRows.has(table)) ownerRows.set(table, readManagedValue(() => memberDeclaringTypeRowLookup(bytes, layout, table, memberLists), issues));
				return ownerRows.get(table)?.(row) ?? 0;
			};
			for (const { table, row, token } of references) {
				if (table !== 4 && table !== 6) continue;
				if (core.has(token)) continue;
				if (row < 1 || row > (layout.table(table)?.rowCount ?? 0)) continue;
				readManagedValue(() => {
					const declared = ranges[ownerOf(table, row) - 1];
					const name = table === 4 ? readFieldDefinitionName(bytes, layout, readFieldDefinitionRow(bytes, layout, row)) : readMethodDefinitionName(bytes, layout, readMethodDefinitionRow(bytes, layout, row));
					core.set(token, {
						token,
						name,
						declaringType: declared?.fullName ?? null,
						kind: table === 4 ? "field" : "method"
					});
				}, issues);
			}
			return {
				core,
				issues
			};
		};
		NAMEABLE_KINDS = new Map([["method", new Set(["method", "unknown"])], ["field", new Set(["field"])]]);
		targetKind = (table) => table === 6 ? "method-def" : table === 10 ? "member-ref" : table === 43 ? "method-spec" : "unknown";
		namedTarget = (members, operandKind, operand) => {
			const member = members.get(operand);
			return member !== undefined && NAMEABLE_KINDS.get(operandKind)?.has(member.kind) === true ? member : undefined;
		};
		edges = (methods, members, budget) => {
			const callEdges = [];
			const fieldAccesses = [];
			for (const { method, tokenInstructions } of methods) {
				const derives = tokenInstructions.some((instruction) => isManagedMemberReferenceInstruction({
					opcode: instruction.opcode,
					operand_kind: instruction.operandKind,
					operand: instruction.operand
				}));
				if (derives) budget.admitTransient(callerNameBytes(method), null);
				const caller = derives ? callerName(method) : method.name;
				for (const instruction of tokenInstructions) {
					const anchor = {
						opcode: instruction.opcode,
						operand_kind: instruction.operandKind,
						operand: instruction.operand
					};
					if (!isManagedMemberReferenceInstruction(anchor)) continue;
					const { operand } = anchor;
					const target = namedTarget(members, anchor.operand_kind, operand);
					const targetRowResolved = target !== undefined && (target.identitySha256 != null || target.rowResolved === true);
					if (anchor.operand_kind === "method") {
						callEdges.push(admitManagedProjection({
							caller_token: method.token,
							il_offset: instruction.offset,
							target_identity_sha256: target?.identitySha256 ?? null,
							target_row_resolved: targetRowResolved,
							caller,
							opcode: anchor.opcode,
							target_token: operand,
							target_kind: targetKind(instruction.reference.table),
							target_name: target?.name ?? null,
							target_declaring_type: target?.declaringType ?? null
						}, budget));
					}
					if (anchor.operand_kind === "field") {
						fieldAccesses.push(admitManagedProjection({
							method_token: method.token,
							il_offset: instruction.offset,
							target_identity_sha256: target?.identitySha256 ?? null,
							target_row_resolved: targetRowResolved,
							method: caller,
							opcode: anchor.opcode,
							field_token: operand,
							field_name: target?.name ?? null,
							field_declaring_type: target?.declaringType ?? null
						}, budget));
					}
				}
				if (derives) budget.releaseTransient();
			}
			return {
				callEdges,
				fieldAccesses
			};
		};
		callerName = (method) => method.declaring_type === null ? method.name : `${method.declaring_type}.${method.name}`;
		callerNameBytes = (method) => method.declaring_type === null ? jsonStringByteLength(method.name) : jsonStringByteLength(method.declaring_type) + jsonStringByteLength(method.name) - 1;
		budgetedSignature = (bytes, layout, signatureTypeName, displayTypeName, issues, owner) => {
			const budget = managedDecodeBudget(layout);
			budget.admitTransient(bytes.length * 256, metadataBlobOffset(layout));
			try {
				return admitManagedProjection(metadataSignature(bytes, {
					rawSha256: budget.digest(bytes, "sha256"),
					typeName: signatureTypeName,
					displayTypeName: (operand, copies) => {
						const name = displayTypeName(operand, copies);
						if (name !== null) budget.admitTransient((name.length * 6 + 2) * copies, metadataBlobOffset(layout));
						return name;
					},
					layout,
					issues,
					scope: owner.scope,
					blobOffset: bytes.byteOffset - owner.artifact.byteOffset,
					...owner.kind === undefined ? {} : { expectedKind: owner.kind }
				}), budget);
			} finally {
				budget.releaseTransient();
			}
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedMemberInspector.js
var unavailable, readMemberLayout, selectTypes, withoutUserStrings, inspectManagedMembersBytes;
function init_ManagedMemberInspector() {
	return (init_ManagedMemberInspector = __esmMin((() => {
		init_managedDecodeBudget();
		init_managedArtifact();
		init_managedPeReader();
		init_internalInvariant();
		init_managedMetadataInventory();
		init_managedMetadataInventoryRows();
		init_ManagedPeInspectionEnvelope();
		init_managedMetadataLayout();
		init_managedReaderFailure();
		init_managedMemberInspectorCore();
		init_ManagedMethodSpecs();
		init_managedSignatureTypeNames();
		init_ManagedTypeNames();
		init_managedTypeReferences();
		init_ManagedUserStrings();
		init_managedTypeMemberLists();
		init_ManagedMemberRecovery();
		init_ManagedMemberRows();
		unavailable = (target, bytes, typeNames, { issue, metadataHeader }) => managedMemberInspectionSchema.parse(admitManagedProjection({
			artifact: {
				path: target.path,
				sha256: target.sha256,
				byte_length: bytes.length,
				format: "pe"
			},
			module: null,
			metadata: {
				status: issue === null ? "absent" : managedMetadataFailureStatus(issue),
				version: metadataHeader?.version ?? null,
				table_row_counts: {}
			},
			identity_scope: {
				token_identity: "build-local",
				requires_artifact_sha256: target.sha256,
				requires_mvid: null
			},
			types: [],
			signature_resolution: "type-names-v2",
			assembly: null,
			nesting_read: false,
			exported_types: null,
			user_strings: null,
			fields: [],
			methods: [],
			member_refs: [],
			call_edges: [],
			field_accesses: [],
			selection: typeNames === undefined ? null : {
				type_names: [...typeNames],
				unmatched_type_names: []
			},
			method_rows: null,
			coverage: {
				state: "unavailable",
				issues: issue === null ? [] : [issue]
			},
			limitations: [issue === null ? "The PE has no admitted CLI metadata; managed member inspection is unavailable." : "The CLI metadata could not be admitted; managed member inspection is unavailable."]
		}));
		readMemberLayout = (bytes, pe, cli, maxRepresentationBytes) => {
			const rootOffset = pe.rvaToOffset(cli.metadata.rva, cli.metadata.size, "cli.metadata");
			const layout = readManagedMetadataLayout(bytes, rootOffset, cli.metadata.size, maxRepresentationBytes);
			const memberLists = readTypeMemberListFacts(bytes, layout);
			return {
				layout,
				memberLists
			};
		};
		selectTypes = (types, typeNames) => {
			if (typeNames === undefined) return {
				tokens: null,
				selection: null
			};
			const requested = new Set(typeNames);
			const tokens = new Set();
			const matched = new Set();
			for (const { type } of types) {
				const nested = (type.flags & 7) >= 2;
				const spellings = nested ? [type.full_name, type.name] : [type.full_name];
				for (const name of spellings) {
					if (!requested.has(name)) continue;
					tokens.add(type.token);
					matched.add(name);
				}
			}
			return {
				tokens,
				selection: {
					type_names: [...typeNames],
					unmatched_type_names: typeNames.filter((name) => !matched.has(name))
				}
			};
		};
		withoutUserStrings = (inspection, failure) => inspection.coverage.issues.some(({ code, scope }) => code === failure.issue.code && scope === failure.issue.scope) ? inspection : managedMemberInspectionSchema.parse({
			...inspection,
			user_strings: {
				state: "partial",
				literals: [],
				issues: [{
					...failure.issue,
					scope: "metadata.#US"
				}]
			},
			limitations: [...inspection.limitations, "User string decoding exceeded max_metadata_representation_bytes after the member facts were decoded; the members are kept and the #US literals are not examined. Select fewer type_names or raise max_metadata_representation_bytes to read them."]
		});
		inspectManagedMembersBytes = (bytes, target, { typeNames, methodOffset = 0, methodLimit = Number.MAX_SAFE_INTEGER, userStrings: readUserStrings = true, maxRepresentationBytes } = {}) => {
			if (!Number.isSafeInteger(methodOffset) || methodOffset < 0 || !Number.isSafeInteger(methodLimit) || methodLimit < 0) throw invariantViolation("methodOffset and methodLimit must be non-negative safe integers");
			const pe = readManagedPeLayout(bytes);
			if (pe.cli === null) return unavailable(target, bytes, typeNames, { issue: pe.cliIssue });
			const issues = [];
			let recover;
			let decodingUserStrings = false;
			try {
				const { layout, memberLists } = readMemberLayout(bytes, pe, pe.cli, maxRepresentationBytes);
				const methodTotal = layout.table(6)?.rowCount ?? 0;
				const methodRows = {
					offset: Math.min(methodOffset, methodTotal),
					count: Math.min(methodLimit, Math.max(0, methodTotal - methodOffset)),
					total: methodTotal
				};
				const identity = readManagedModuleIdentity(bytes, layout);
				appendManagedParseIssues(issues, identity.issues);
				const ranges = readTypeDefinitions(bytes, layout, issues, memberLists);
				const parsedTypes = parseTypes(bytes, layout, ranges);
				const { tokens: selected, selection } = selectTypes(parsedTypes.types, typeNames);
				const unreadableNames = typeNames === undefined ? 0 : ranges.length - parsedTypes.types.length;
				appendManagedParseIssues(issues, parsedTypes.issues);
				const typeReferences = managedTypeReferences(bytes, layout, issues);
				const { operand: signatureTypeName, declaration: declarationTypeName, displayName: displayTypeName } = managedSignatureTypeNames(layout, issues, parsedTypes, typeReferences);
				const types = parsedTypes.types.filter(({ type }) => selected === null || selected.has(type.token)).map(({ row, type }) => {
					managedDecodeBudget(layout).reserve(512, type.row_offset);
					return {
						...type,
						name_sha256: declarationTypeName(2, row)?.toString("hex") ?? null
					};
				});
				const envelope = managedPeInspectionEnvelope(target, bytes.length, layout, identity, issues);
				const unnamedTypes = types.reduce((count, type) => count + Number(type.name_sha256 === null), 0);
				const typeIdentityLimitations = unnamedTypes === 0 ? [] : [`${String(unnamedTypes)} returned TypeDef name identity(s) remain unresolved; incomplete, missing, contradictory, cyclic or over-deep enclosing facts cannot be repaired by bare display names.`];
				const selectionLimitations = [...selection === null ? [] : ["Types, fields, methods, call edges, field accesses, and user strings cover only the selected declaring types; coverage describes that selection. Edge targets outside it keep their names but are not described."], ...unreadableNames === 0 ? [] : [`${String(unreadableNames)} TypeDef name(s) could not be read; a name in selection.unmatched_type_names may belong to one of them, so its absence is not observed.`]];
				recover = prepareManagedMemberRecovery({
					...envelope,
					types,
					nesting_read: parsedTypes.nesting.complete,
					selection,
					method_rows: methodRows,
					unresolved_definitions: {
						rows: parsedTypes.unresolvedDefinitions,
						method_names_examined: false
					},
					limitations: [...typeIdentityLimitations, ...selectionLimitations]
				}, uniqueManagedParseIssues(issues), managedDecodeBudget(layout));
				const inventory = readManagedMetadataInventory(bytes, layout, readManagedResourceDirectory(pe, issues), memberLists, identity, managedMetadataTypeNames(bytes, layout, issues, parsedTypes, typeReferences));
				appendManagedParseIssues(issues, inventory.issues);
				const exportedTypes = parseExportedTypes(bytes, layout);
				appendManagedParseIssues(issues, exportedTypes.issues);
				const fields = parseFields$1(bytes, layout, ranges, memberLists, {
					signatureTypeName,
					displayTypeName,
					declarationTypeName,
					selected
				});
				const { name: resolveTypeName, isResolvedTypeSpec } = typeNameLookup(bytes, layout, ranges, issues, typeReferences, signatureTypeName);
				const memberRefs = parseMemberRefs(bytes, layout, {
					typeName: resolveTypeName,
					isResolvedTypeSpec,
					signatureTypeName,
					displayTypeName,
					declarationTypeName
				});
				appendManagedParseIssues(issues, memberRefs.issues);
				const methods = parseMethods$1({
					bytes,
					layout,
					pe,
					ranges,
					signatureTypeName,
					displayTypeName,
					declarationTypeName,
					memberRefKinds: new Map(memberRefs.refs.flatMap((memberRef) => memberRef.signature.kind === "field" || memberRef.signature.kind === "method" ? [[memberRef.token, memberRef.signature.kind]] : [])),
					memberLists,
					selected,
					methodOffset,
					methodLimit
				});
				appendManagedParseIssues(issues, fields.issues, methods.issues);
				const referenced = new Map();
				const needsCore = (reference) => reference.table === 4 ? !fields.core.has(reference.token) : reference.table === 6 && !methods.core.has(reference.token);
				if (selected !== null) for (const { tokenInstructions } of methods.methods) for (const { reference } of tokenInstructions) {
					if (needsCore(reference)) referenced.set(reference.token, reference);
					else if (reference.table === 43 && reference.row >= 1 && reference.row <= (layout.table(43)?.rowCount ?? 0)) {
						const spec = readManagedValue(() => methodSpecMethod(bytes, layout, reference.row), issues);
						const generic = spec?.method;
						if (generic !== undefined && generic.kind === "valid" && needsCore(generic)) referenced.set(generic.token, generic);
					}
				}
				const referencedCores = readReferencedMemberCores(bytes, layout, ranges, memberLists, referenced.values());
				appendManagedParseIssues(issues, referencedCores.issues);
				const resolvedMethods = methods.methods.map(({ method, catchTokens }) => ({
					...method,
					body: {
						...method.body,
						exception_regions: method.body.exception_regions.map((region, ordinal) => {
							const reference = catchTokens.get(ordinal) ?? null;
							const classType = resolveTypeName(reference);
							const identityResolved = reference === null ? null : classType !== null && reference.table === 2 ? declarationTypeName(2, reference.row) !== null : false;
							return {
								...region,
								class_type: classType,
								class_type_name_sha256: reference !== null && (reference.table === 1 || reference.table === 2) ? declarationTypeName(reference.table, reference.row)?.toString("hex") ?? null : null,
								class_type_identity_resolved: identityResolved
							};
						})
					}
				}));
				decodingUserStrings = readUserStrings;
				const userStrings = readUserStrings ? parseUserStrings(bytes, layout, {
					...methods,
					unreadableSelectedTypes: unreadableNames
				}) : null;
				const targets = edgeTargets(bytes, layout, methods.methods, [
					referencedCores.core,
					fields.core,
					memberRefs.core,
					methods.core
				], signatureTypeName);
				appendManagedParseIssues(issues, targets.issues);
				const incompleteMembers = [...fields.fields, ...memberRefs.refs].some((member) => member.signature.parse_status !== "decoded") || resolvedMethods.some((method) => method.signature.parse_status !== "decoded") || resolvedMethods.some((method) => method.body.status === "partial" || method.body.status === "malformed");
				const related = edges(methods.methods, targets.members, managedDecodeBudget(layout));
				const coverageIssues = uniqueManagedParseIssues(issues);
				return managedMemberInspectionSchema.parse(admitManagedProjection({
					...envelope,
					metadata: {
						...envelope.metadata,
						status: issues.length === 0 ? "complete" : "partial"
					},
					assembly: inventory.assembly,
					types,
					signature_resolution: "type-names-v2",
					nesting_read: parsedTypes.nesting.complete,
					exported_types: exportedTypes.exportedTypes,
					fields: fields.fields,
					methods: resolvedMethods,
					member_refs: memberRefs.refs,
					call_edges: related.callEdges,
					field_accesses: related.fieldAccesses,
					user_strings: userStrings,
					selection,
					method_rows: methodRows,
					unresolved_definitions: {
						rows: parsedTypes.unresolvedDefinitions.concat(methods.unresolvedDefinitions),
						method_names_examined: true
					},
					coverage: {
						state: issues.length === 0 && !incompleteMembers ? "complete" : "partial",
						issues: coverageIssues
					},
					limitations: [
						...typeIdentityLimitations,
						"Metadata tokens are build-local coordinates and are only meaningful with the reported artifact SHA-256 and MVID.",
						"CIL instruction anchors are decoded from file-backed method bodies only; no target assembly is loaded or executed.",
						"Field constants are file-backed Constant-table declarations, not runtime field values. Parameter and property defaults and enum-name mappings are not decoded.",
						"Exported types are reported from ExportedType rows as declared; forwarded types are not resolved in their implementing assemblies.",
						"User strings are the #US literals loaded by ldstr in the inspected method bodies, with their own coverage; instruction anchors and normalized CIL digests keep their build-local tokens.",
						"Member signatures decode ECMA-335 primitive, class, valuetype, generic instantiation, generic variable, pointer, byref, single-dimension and general array, function pointer including VARARG sentinels, custom modifier, and typed reference forms; type operands keep their encoded TypeDefOrRefOrSpec values and append readable TypeDef/TypeRef names when resolved.",
						...selectionLimitations
					]
				}, managedDecodeBudget(layout)));
			} catch (cause) {
				if (cause instanceof ManagedReaderFailure) {
					if (decodingUserStrings && cause instanceof ManagedRepresentationFailure) return withoutUserStrings(inspectManagedMembersBytes(bytes, target, {
						...typeNames === undefined ? {} : { typeNames },
						methodOffset,
						methodLimit,
						userStrings: false,
						...maxRepresentationBytes === undefined ? {} : { maxRepresentationBytes }
					}), cause);
					if (recover !== undefined && cause instanceof ManagedRepresentationFailure) return recover(cause.issue.offset);
					return unavailable(target, bytes, typeNames, cause);
				}
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedNativeBoundaryHelpers.js
var flagsHex, parseModuleRefs, parseFields, parseMethods, parseImplMaps, charSet, callConvention, bestFit, throwOnUnmappable, nativeImplementations, boundaryKind, cliNative, nativeBoundarySummary, buildNativeBoundaryInspection;
function init_ManagedNativeBoundaryHelpers() {
	return (init_ManagedNativeBoundaryHelpers = __esmMin((() => {
		init_ManagedFieldDefinitionRows();
		init_ManagedMethodDefinitionRows();
		init_managedDecodeBudget();
		init_managedArtifact();
		init_managedMetadataLayout();
		init_managedMetadataHeaps();
		init_ManagedPeInspectionEnvelope();
		init_managedPeReader();
		init_managedReaderFailure();
		flagsHex = (value) => `0x${value.toString(16).padStart(4, "0")}`;
		parseModuleRefs = (bytes, layout, issues) => {
			const refs = [];
			const table = layout.table(26);
			for (let row = 1; row <= (table?.rowCount ?? 0); row += 1) {
				readManagedValue(() => {
					const cursor = metadataRowCursor(bytes, layout, 26, row);
					refs.push({
						token: metadataToken(26, row),
						row_offset: cursor.start,
						name: readMetadataString(bytes, layout, cursor.readIndex(layout.stringIndexSize))
					});
				}, issues);
			}
			return refs;
		};
		parseFields = (bytes, layout, issues) => {
			const fields = new Map();
			const table = layout.table(4);
			for (let row = 1; row <= (table?.rowCount ?? 0); row += 1) {
				readManagedValue(() => {
					const definition = readFieldDefinitionRow(bytes, layout, row);
					const { token, rowOffset, flags } = definition;
					const name = readFieldDefinitionName(bytes, layout, definition);
					fields.set(token, {
						token,
						rowOffset,
						kind: "field",
						name,
						flags,
						implFlags: null,
						rva: null
					});
				}, issues);
			}
			return fields;
		};
		parseMethods = (bytes, layout, issues) => {
			const methods = new Map();
			const table = layout.table(6);
			for (let row = 1; row <= (table?.rowCount ?? 0); row += 1) {
				readManagedValue(() => {
					const definition = readMethodDefinitionRow(bytes, layout, row);
					const { token, rowOffset, rva, implFlags, flags, implementation } = definition;
					const name = readMethodDefinitionName(bytes, layout, definition);
					methods.set(token, {
						token,
						rowOffset,
						kind: "method",
						name,
						flags,
						implFlags,
						rva,
						implementation
					});
				}, issues);
			}
			return methods;
		};
		parseImplMaps = ({ bytes, layout, modules, members, issues }) => {
			const moduleNames = new Map(modules.map((module) => [module.token, module]));
			const imports = [];
			const table = layout.table(28);
			for (let row = 1; row <= (table?.rowCount ?? 0); row += 1) {
				readManagedValue(() => {
					const cursor = metadataRowCursor(bytes, layout, 28, row);
					const mappingFlags = cursor.u16();
					const memberForwardedOffset = cursor.offset;
					const memberForwardedRaw = cursor.readIndex(layout.codedIndexSize("MemberForwarded"));
					const memberForwarded = decodeMetadataCodedIndex(memberForwardedRaw, MANAGED_CODED_INDEXES.MemberForwarded.bits, MANAGED_CODED_INDEXES.MemberForwarded.tables, layout.rowCounts);
					if (memberForwarded.kind !== "valid") issues.push({
						code: "invalid-row",
						scope: `metadata.ImplMap:${metadataToken(28, row)}`,
						offset: memberForwardedOffset,
						detail: memberForwarded.kind === "null" ? "ImplMap MemberForwarded coded index 0x0 is null, but the column must reference a Field or MethodDef row" : `ImplMap MemberForwarded coded index 0x${memberForwardedRaw.toString(16)} is invalid: ${memberForwarded.reason}`
					});
					const memberToken = memberForwarded.kind === "valid" ? memberForwarded.token : null;
					const importName = readMetadataString(bytes, layout, cursor.readIndex(layout.stringIndexSize));
					const importScopeOffset = cursor.offset;
					const importScopeRow = cursor.readIndex(layout.tableIndexSize(26));
					const moduleCount = layout.table(26)?.rowCount ?? 0;
					const validImportScope = importScopeRow > 0 && importScopeRow <= moduleCount;
					if (!validImportScope) issues.push({
						code: "invalid-row",
						scope: `metadata.ImplMap:${metadataToken(28, row)}`,
						offset: importScopeOffset,
						detail: `ImplMap ImportScope row ${String(importScopeRow)} must reference a ModuleRef row between 1 and ${String(moduleCount)}`
					});
					const importScopeToken = validImportScope ? metadataToken(26, importScopeRow) : null;
					const member = memberToken === null ? undefined : members.get(memberToken);
					imports.push({
						token: metadataToken(28, row),
						row_offset: cursor.start,
						mapping_flags: mappingFlags,
						mapping_flags_hex: flagsHex(mappingFlags),
						member_token: memberToken,
						member_kind: memberForwarded.kind !== "valid" ? "unknown" : memberForwarded.table === 4 ? "field" : "method",
						member_name: member?.name ?? null,
						import_name: importName,
						import_scope_token: importScopeToken,
						import_scope_name: importScopeToken === null ? null : moduleNames.get(importScopeToken)?.name ?? null,
						no_mangle: (mappingFlags & 1) !== 0,
						char_set: charSet(mappingFlags),
						call_convention: callConvention(mappingFlags),
						supports_last_error: (mappingFlags & 64) !== 0,
						best_fit: bestFit(mappingFlags),
						throw_on_unmappable_char: throwOnUnmappable(mappingFlags),
						verification: "managed-declaration-only"
					});
				}, issues);
			}
			return imports;
		};
		charSet = (flags) => {
			switch (flags & 6) {
				case 0: return "not-specified";
				case 2: return "ansi";
				case 4: return "unicode";
				case 6: return "auto";
				default: return "unknown";
			}
		};
		callConvention = (flags) => {
			switch (flags & 1792) {
				case 0: return "not-specified";
				case 256: return "winapi";
				case 512: return "cdecl";
				case 768: return "stdcall";
				case 1024: return "thiscall";
				case 1280: return "fastcall";
				default: return "unknown";
			}
		};
		bestFit = (flags) => {
			switch (flags & 48) {
				case 0: return "assembly-default";
				case 16: return "enabled";
				case 32: return "disabled";
				default: return "unknown";
			}
		};
		throwOnUnmappable = (flags) => {
			switch (flags & 12288) {
				case 0: return "assembly-default";
				case 4096: return "enabled";
				case 8192: return "disabled";
				default: return "unknown";
			}
		};
		nativeImplementations = (methods, pinvokeTokens) => {
			const implementations = [];
			for (const method of methods) {
				if (method.kind !== "method") continue;
				const { codeType, managedKind, pinvokeFlag, internalCall } = method.implementation;
				const pinvokeDeclared = pinvokeTokens.has(method.token) || pinvokeFlag;
				if (!pinvokeDeclared && !internalCall && codeType === "il" && managedKind === "managed") continue;
				implementations.push({
					token: method.token,
					row_offset: method.rowOffset,
					name: method.name,
					rva: method.rva,
					flags: method.flags,
					impl_flags: method.implFlags,
					code_type: codeType,
					managed_kind: managedKind,
					pinvoke_declared: pinvokeDeclared,
					boundary_kind: boundaryKind(pinvokeDeclared, codeType, managedKind, internalCall),
					body_interpretation: method.rva === 0 ? "not-file-backed" : "native-or-runtime"
				});
			}
			return implementations;
		};
		boundaryKind = (pinvokeDeclared, codeType, managedKind, internalCall) => {
			if (pinvokeDeclared) return "pinvoke";
			if (codeType === "native") return "native-body";
			if (codeType === "runtime" || internalCall) return "runtime-provided";
			if (managedKind === "unmanaged") return "unmanaged-method";
			return "mixed-or-unknown";
		};
		cliNative = (cli) => {
			if (cli === null) return null;
			return {
				il_only: (cli.flags & 1) !== 0,
				requires_32bit: managedCli32BitRequirement(cli.flags) === "required",
				strong_name_signed: (cli.flags & 8) !== 0,
				native_entry_point: (cli.flags & 16) !== 0,
				ready_to_run_signature: cli.readyToRunSignature,
				managed_native_header_rva: cli.managedNativeHeader.rva,
				managed_native_header_size: cli.managedNativeHeader.size
			};
		};
		nativeBoundarySummary = (cli, counts) => ({
			...counts,
			ready_to_run: cli?.readyToRunSignature ?? null,
			mixed_mode_or_native_header: cli === null ? null : managedCliIsMixedClrNative(cli) || cli.managedNativeHeader.rva !== 0 || cli.managedNativeHeader.size !== 0 || (cli.flags & 16) !== 0
		});
		buildNativeBoundaryInspection = ({ target, bytes, pe, layout, inventory, moduleRefs, imports, implementations, issues }) => managedNativeBoundaryInspectionSchema.parse(admitManagedProjection({
			...managedPeInspectionEnvelope(target, bytes.length, layout, inventory, issues),
			cli_native: cliNative(pe.cli),
			module_refs: moduleRefs,
			pinvoke_imports: imports,
			native_implementations: implementations,
			summary: nativeBoundarySummary(pe.cli, {
				module_ref_count: moduleRefs.length,
				pinvoke_import_count: imports.length,
				native_implementation_count: implementations.length
			}),
			coverage: {
				state: issues.length === 0 ? "complete" : "partial",
				issues
			},
			limitations: [
				"P/Invoke rows prove managed import declarations only; this inspection does not verify that a native library, export, thunk, or provider-qualified function exists.",
				"Managed metadata tokens are build-local coordinates and are only meaningful with the reported artifact SHA-256 and MVID.",
				"ReadyToRun, NativeAOT, C++/CLI, and IL2CPP native semantics require separately selected native-provider evidence; this tool does not translate managed tokens into native addresses."
			]
		}, managedDecodeBudget(layout)));
	})))();
}

//#endregion
//#region dist/dotnet/ManagedNativeBoundaryInspector.js
var emptyInspection, readBoundaryInventory, inspectManagedNativeBoundariesBytes;
function init_ManagedNativeBoundaryInspector() {
	return (init_ManagedNativeBoundaryInspector = __esmMin((() => {
		init_managedDecodeBudget();
		init_managedArtifact();
		init_managedMetadataInventory();
		init_managedMetadataLayout();
		init_managedTypeMemberLists();
		init_managedPeReader();
		init_managedReaderFailure();
		init_ManagedNativeBoundaryHelpers();
		emptyInspection = (target, bytes, classification, { cli = null, issues = [], metadataHeader = null } = {}) => {
			return managedNativeBoundaryInspectionSchema.parse(admitManagedProjection({
				artifact: {
					path: target.path,
					sha256: target.sha256,
					byte_length: bytes.length,
					format: "pe"
				},
				module: null,
				metadata: {
					status: issues.some((issue) => managedMetadataFailureStatus(issue) === "partial") ? "partial" : classification === "malformed" ? "malformed" : "absent",
					version: metadataHeader?.version ?? null,
					table_row_counts: {}
				},
				identity_scope: {
					token_identity: "build-local",
					requires_artifact_sha256: target.sha256,
					requires_mvid: null
				},
				cli_native: cliNative(cli),
				module_refs: [],
				pinvoke_imports: [],
				native_implementations: [],
				summary: nativeBoundarySummary(cli, {
					module_ref_count: 0,
					pinvoke_import_count: 0,
					native_implementation_count: 0
				}),
				coverage: {
					state: "unavailable",
					issues
				},
				limitations: ["No CLI metadata was admitted; native boundary declarations are unavailable.", "Static inspection does not load or execute target code, so native export resolution is not performed."]
			}));
		};
		readBoundaryInventory = (bytes, pe, cli, issues, maxRepresentationBytes) => {
			const metadataOffset = pe.rvaToOffset(cli.metadata.rva, cli.metadata.size, "cli.metadata");
			const layout = readManagedMetadataLayout(bytes, metadataOffset, cli.metadata.size, maxRepresentationBytes);
			const memberLists = readTypeMemberListFacts(bytes, layout);
			const inventory = readManagedMetadataInventory(bytes, layout, readManagedResourceDirectory(pe, issues), memberLists);
			return {
				layout,
				inventory
			};
		};
		inspectManagedNativeBoundariesBytes = (bytes, target, maxRepresentationBytes) => {
			const pe = readManagedPeLayout(bytes);
			if (pe.cli === null) return emptyInspection(target, bytes, pe.cliDirectoryState !== "absent" ? "malformed" : "not-managed", { issues: pe.cliIssue === null ? [] : [pe.cliIssue] });
			const issues = [];
			let layout;
			let inventory;
			try {
				({layout, inventory} = readBoundaryInventory(bytes, pe, pe.cli, issues, maxRepresentationBytes));
			} catch (cause) {
				if (!(cause instanceof ManagedReaderFailure)) throw cause;
				return emptyInspection(target, bytes, "malformed", {
					cli: pe.cli,
					issues: [cause.issue],
					metadataHeader: cause.metadataHeader
				});
			}
			try {
				appendManagedParseIssues(issues, inventory.issues);
				const moduleRefs = parseModuleRefs(bytes, layout, issues);
				const members = new Map([...parseFields(bytes, layout, issues), ...parseMethods(bytes, layout, issues)]);
				const imports = parseImplMaps({
					bytes,
					layout,
					modules: moduleRefs,
					members,
					issues
				});
				const pinvokeTokens = new Set(imports.map(({ member_token }) => member_token).filter((token) => token !== null));
				const implementations = nativeImplementations(members.values(), pinvokeTokens);
				return buildNativeBoundaryInspection({
					target,
					bytes,
					pe,
					layout,
					inventory,
					moduleRefs,
					imports,
					implementations,
					issues
				});
			} catch (cause) {
				if (!(cause instanceof ManagedReaderFailure)) throw cause;
				return emptyInspection(target, bytes, "malformed", {
					cli: pe.cli,
					issues: [...issues, cause.issue],
					metadataHeader: cause.metadataHeader
				});
			}
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedSnapshot.js
var verifyManagedSourceIdentity, managedSnapshotCapacityError, readManagedSnapshot, hashManagedSource, snapshotBudget, readManagedFile, normalizeManagedReadFailure, managedCleanupError, normalizeReadFailure;
function init_ManagedSnapshot() {
	return (init_ManagedSnapshot = __esmMin((() => {
		init_internalInvariant();
		init_investigationProviders();
		init_OwnedRegularFile();
		init_RegularFileRead();
		init_resources();
		init_analysisErrorCleanup();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_result();
		init_managedInspectionLimits();
		init_providerCleanupError();
		init_RegularFile();
		init_BoundedFileBytes();
		init_binaryTargetFilesystemFailure();
		init_sha256Hex();
		verifyManagedSourceIdentity = (target, observed, operation) => observed.sha256 === target.sha256 ? ok(null) : err(new AnalysisArtifactChangedError(operation, target.path, `Managed artifact digest changed after open: expected ${target.sha256}, observed ${observed.sha256} at ${target.path}`, { diagnostics: {
			expected_sha256: target.sha256,
			observed_sha256: observed.sha256,
			observed_bytes: observed.byteLength
		} }));
		managedSnapshotCapacityError = (operation, maxBytes) => new AnalysisResourceConstraintError(operation, "memory", "Managed static inspection requires an eagerly retained PE snapshot within its input byte budget.", { max_snapshot_bytes: maxBytes }, {
			retryable: false,
			remediationAction: `Increase max_snapshot_bytes above ${String(maxBytes)} bytes on the next inspection to admit the complete selected file. No REA restart is required. Metadata representation, transport and host memory limits remain independent; repeating the unchanged request cannot raise this budget.`,
			limit: {
				control_kind: "parameter",
				parameter: "max_snapshot_bytes",
				effective_value: maxBytes,
				unit: "bytes",
				minimum: 1,
				maximum: Number.MAX_SAFE_INTEGER,
				default_value: DEFAULT_MANAGED_SNAPSHOT_BYTES,
				applies_at: "next_call"
			}
		});
		readManagedSnapshot = async (path, operation, options = {}) => {
			const maxBytes = snapshotBudget(options);
			return readManagedFile(path, operation, async (handle, metadata) => {
				const signal = options.signal;
				if (metadata.size > maxBytes) throw managedSnapshotCapacityError(operation, maxBytes);
				const bytes = await readBoundedFileBytes(handle, maxBytes, { signal });
				if (bytes === undefined) throw managedSnapshotCapacityError(operation, maxBytes);
				signal?.throwIfAborted();
				return {
					byteLength: bytes.length,
					sha256: sha256Hex(bytes),
					bytes
				};
			}, options);
		};
		hashManagedSource = async (path, operation, options = {}) => {
			const maxBytes = snapshotBudget(options);
			return readManagedFile(path, operation, async (handle, metadata) => {
				const signal = options.signal;
				if (metadata.size > maxBytes) throw managedSnapshotCapacityError(operation, maxBytes);
				const digest = createHash("sha256");
				let byteLength = 0;
				const chunk = Buffer.allocUnsafe(64 * 1024);
				for (;;) {
					signal?.throwIfAborted();
					const { bytesRead } = await handle.read(chunk, 0, Math.min(chunk.length, maxBytes - byteLength + 1), null);
					signal?.throwIfAborted();
					if (bytesRead === 0) break;
					if (bytesRead > maxBytes - byteLength) throw managedSnapshotCapacityError(operation, maxBytes);
					byteLength += bytesRead;
					digest.update(chunk.subarray(0, bytesRead));
				}
				return {
					byteLength,
					sha256: digest.digest("hex")
				};
			}, options);
		};
		snapshotBudget = (options) => {
			const maxBytes = options.maxBytes ?? 134217728;
			if (!Number.isSafeInteger(maxBytes) || maxBytes < 1) throw invariantViolation("max_snapshot_bytes must be a positive safe integer");
			return maxBytes;
		};
		readManagedFile = (path, operation, read, options) => withRegularFileCompletion(path, read, options).then(({ value, cancellation }) => {
			if (cancellation !== undefined) {
				const identity = options.expectedSha256 === undefined ? undefined : verifyManagedSourceIdentity({
					path,
					sha256: options.expectedSha256
				}, value, operation);
				const failure = identity !== undefined && !identity.ok ? identity.error : cancelledBy(operation, carriedReason(cancellation.reason));
				throw failure.retainPartialObservation({
					kind: "file-snapshot-hash",
					path,
					bytes: value.byteLength,
					sha256: value.sha256
				});
			}
			return value;
		}).catch((cause) => {
			throw normalizeManagedReadFailure(cause, path, operation, options.signal, options.expectedSha256);
		});
		normalizeManagedReadFailure = (cause, fallbackPath, operation, signal, expectedSha256) => {
			if (signal?.aborted === true && cause === signal.reason) return normalizeReadFailure(cause, fallbackPath, operation, signal);
			const cleanupError = managedCleanupError(cause, fallbackPath, operation, signal, expectedSha256);
			if (cleanupError !== undefined) return cleanupError;
			return normalizeReadFailure(cause, fallbackPath, operation, signal);
		};
		managedCleanupError = (cause, fallbackPath, operation, signal, expectedSha256) => {
			if (cause instanceof RegularFileCleanupFailure) {
				const cancellation = regularFileCancellation(cause);
				const cleanup = new ProviderCleanupError(MANAGED_STATIC_PROVIDER.id, [cause.path], { reason: "A managed input file handle could not be closed" }, {
					cause,
					operation
				});
				bindRegularFileCleanup(cause, cleanup);
				const identity = cause.outcome.kind === "completed" && expectedSha256 !== undefined ? verifyManagedSourceIdentity({
					path: cause.path,
					sha256: expectedSha256
				}, cause.outcome.value, operation) : undefined;
				const failure = cause.outcome.kind === "failed" ? normalizeReadFailure(cause.outcome.cause, cause.path, operation, signal) : identity !== undefined && !identity.ok ? identity.error : cancellation === undefined ? undefined : cancelledBy(operation, carriedReason(cancellation.reason));
				if (cause.outcome.kind === "completed") {
					const observed = cause.outcome.value;
					const observation = {
						kind: "file-snapshot-hash",
						path: cause.path,
						bytes: observed.byteLength,
						sha256: observed.sha256
					};
					cleanup.retainPartialObservation(observation);
					if (failure instanceof AnalysisError) failure.retainPartialObservation(observation);
				}
				return failure instanceof AnalysisError ? analysisErrorWithCleanupDependencies(failure, cleanup, operation) : cleanup;
			}
			if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) {
				const error = new ProviderCleanupError(MANAGED_STATIC_PROVIDER.id, cause.cleanup.resources.length > 0 ? cause.cleanup.resources : [fallbackPath], { reason: cause.cleanup.reason }, {
					cause,
					operation,
					partialObservation: cause.partialObservation
				});
				bindRegularFileCleanup(cause, error);
				if (cause.reason === "cancelled") {
					const cancelled = cancelledBy(operation, carriedReason(cause.cancellation === undefined ? cause.cause : cause.cancellation.reason), { partialObservation: cause.partialObservation });
					return analysisErrorWithCleanupDependencies(cancelled, error, operation);
				}
				return error;
			}
			return undefined;
		};
		normalizeReadFailure = (cause, path, operation, signal) => {
			if (signal?.aborted === true && cause === signal.reason) return cancelledBy(operation, carriedReason(cause));
			if (cause instanceof RegularFileChangedError) return new AnalysisArtifactChangedError(operation, path, cause.message, { cause });
			if (cause instanceof AnalysisError) return cause;
			return classifyBinaryTargetFilesystemFailure(path, cause) ?? (signal?.aborted === true ? cancelledBy(operation, carriedReason(cause)) : cause);
		};
	})))();
}

//#endregion
//#region dist/dotnet/ManagedStaticProvider.js
var ManagedStaticProvider, ManagedStaticClient, isCleanupFailure, isManagedOperation, inspectManagedOperation, managedLocations;
function init_ManagedStaticProvider() {
	return (init_ManagedStaticProvider = __esmMin((() => {
		init_AnalysisProvider();
		init_internalInvariant();
		init_resources();
		init_ManagedStaticProviderMetadata();
		init_investigationProviders();
		init_managedToolContracts();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_providerCleanupError();
		init_result();
		init_ManagedArtifactInspector();
		init_ManagedMemberInspector();
		init_ManagedNativeBoundaryInspector();
		init_OwnedRegularFile();
		init_managedReaderFailure();
		init_inputIssueProjection();
		init_ManagedSnapshot();
		init_errorMessage();
		ManagedStaticProvider = class {
			#capabilities = managedStaticCapabilities();
			identity() {
				return MANAGED_STATIC_PROVIDER;
			}
			capabilities() {
				return this.#capabilities;
			}
			createClient(target) {
				return new ManagedStaticClient(target);
			}
		};
		ManagedStaticClient = class {
			target;
			#snapshotBytes;
			#resources = new ArtifactResourceScope();
			constructor(target) {
				this.target = target;
			}
			async execute(operation, parameters, options) {
				if (operation === "health") return ok(createAnalysisExecution(null, MANAGED_STATIC_PROVIDER));
				if (!isManagedOperation(operation)) return err(new AnalysisCapabilityUnavailableError(MANAGED_STATIC_PROVIDER.id, operation, "Operation is not implemented by the managed static provider."));
				if (this.target.format !== "pe") return err(new AnalysisUnsupportedTargetError(operation, this.target.path, `Managed static triage requires a PE target; observed ${this.target.format}.`));
				try {
					const input = operation === "inspect_managed_members" ? managedMembersInputSchema.safeParse(parameters) : managedTargetInputSchema.safeParse(parameters);
					if (!input.success) return err(analysisInputErrorFromIssues(operation, input.error.issues, parameters));
					const snapshotOptions = {
						expectedSha256: this.target.sha256,
						signal: options?.signal,
						resources: this.#resources,
						...input.data.max_snapshot_bytes === undefined ? {} : { maxBytes: input.data.max_snapshot_bytes }
					};
					if (options?.signal?.aborted === true) return err(cancelledBy(operation, options.signal));
					const snapshot = this.#snapshotBytes;
					const observed = snapshot === undefined ? await readManagedSnapshot(this.target.path, operation, snapshotOptions) : await hashManagedSource(this.target.path, operation, snapshotOptions);
					const admitted = verifyManagedSourceIdentity(this.target, observed, operation);
					if (!admitted.ok) return admitted;
					const bytes = snapshot ?? observed.bytes;
					if (bytes === undefined) throw invariantViolation("Managed snapshot bytes are unavailable");
					this.#snapshotBytes = bytes;
					const result = inspectManagedOperation(operation, input.data, bytes, this.target);
					return ok(createAnalysisExecution(result, MANAGED_STATIC_PROVIDER, {
						rawResult: null,
						limitations: result.limitations,
						subject: this.target,
						locations: managedLocations(result)
					}));
				} catch (cause) {
					if (isCleanupFailure(cause)) return err(this.#cleanupError(operation, cause));
					if (cause instanceof AnalysisError) return err(cause);
					if (options?.signal?.aborted === true) return err(cancelledBy(operation, options.signal));
					const inputFailure = managedInspectionInputFailure(operation, this.target.path, cause);
					if (inputFailure !== undefined) return err(inputFailure);
					return err(new ProviderAdapterError(MANAGED_STATIC_PROVIDER.id, operation, { cause }));
				}
			}
			async close() {
				this.#snapshotBytes = undefined;
				try {
					await this.#resources.close();
					return ok(null);
				} catch (cause) {
					return err(this.#cleanupError("close", cause));
				}
			}
			#cleanupError(operation, cause) {
				const failure = managedCleanupError(cause, this.target.path, operation);
				if (failure instanceof ProviderCleanupError) return failure;
				const cleanup = cause instanceof ArtifactReaderFailure ? cause.cleanup : undefined;
				return new ProviderCleanupError(MANAGED_STATIC_PROVIDER.id, cleanup?.resources ?? [this.target.path], { reason: cleanup?.reason ?? errorMessage(cause) }, {
					cause,
					operation
				});
			}
		};
		isCleanupFailure = (cause) => cause instanceof RegularFileCleanupFailure || cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined;
		isManagedOperation = (operation) => MANAGED_TOOL_CONTRACTS.some(({ name }) => name === operation);
		inspectManagedOperation = (operation, parameters, bytes, target) => {
			if (operation === "inspect_managed_members") {
				const { type_names: typeNames } = parameters;
				return inspectManagedMembersBytes(bytes, target, {
					...typeNames === undefined ? {} : { typeNames },
					...parameters.max_metadata_representation_bytes === undefined ? {} : { maxRepresentationBytes: parameters.max_metadata_representation_bytes }
				});
			}
			if (operation === "inspect_managed_artifact") {
				return inspectManagedArtifactBytes(bytes, target, parameters.max_metadata_representation_bytes);
			}
			return inspectManagedNativeBoundariesBytes(bytes, target, parameters.max_metadata_representation_bytes);
		};
		managedLocations = (result) => {
			if ("pe" in result) {
				if (result.pe.cli === null) return [{
					kind: "file-offset",
					offset: 0
				}];
				return [{
					kind: "file-offset-range",
					start: result.pe.cli.header_offset,
					end: result.pe.cli.header_offset + result.pe.cli.header_size
				}, ...[result.module, result.assembly].filter((value) => value !== null).map((value) => ({
					kind: "file-offset",
					offset: value.row_offset
				}))];
			}
			if ("methods" in result) return [...result.module === null ? [{
				kind: "file-offset",
				offset: 0
			}] : [{
				kind: "file-offset",
				offset: result.module.row_offset
			}], ...result.methods.filter((method) => method.body.file_offset !== null).map((method) => ({
				kind: "file-offset",
				offset: method.body.file_offset ?? 0
			}))];
			return [...result.module === null ? [{
				kind: "file-offset",
				offset: 0
			}] : [{
				kind: "file-offset",
				offset: result.module.row_offset
			}], ...result.pinvoke_imports.map((mapping) => ({
				kind: "file-offset",
				offset: mapping.row_offset
			}))];
		};
	})))();
}

//#endregion
init_ManagedStaticProvider();
export { ManagedStaticProvider };