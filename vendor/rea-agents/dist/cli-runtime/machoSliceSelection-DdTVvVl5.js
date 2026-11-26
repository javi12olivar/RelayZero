import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, init_analysisErrorCore, init_sha256Hex, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { MACHO_CPU_TYPES, init_machoTargetSelection, machoSliceFamily, machoSliceSubtypeSelector } from "./nativeValueTrace-B4vmCxtN.js";
import { ARM64_32_HOST_SUBTYPE_PREFERENCE, ARM64_HOST_SUBTYPE_PREFERENCE, X86_64_HOST_SUBTYPE_PREFERENCE, X86_HOST_SUBTYPE_PREFERENCE, init_machoCpuIdentity, machoCpuSubtypeBase } from "./machoCpuIdentity-B0Mlm3Ly.js";
import { classifyFatContainerEvidence, fatSliceOverlapReason, findOverlappingFatSlices, init_machoContainer, readFatContainerHeader, readMachoHeaderPrefixFacts, validateFatSlice } from "./machoLoadCommands-DCQgk7s-.js";
import { init_keyedCollection, keyedBy, uniqueKeyed } from "./keyedCollection-BoRfT2aE.js";

//#region dist/domain/apple/machoImageSelection.js
var readUniversalMachoImage, readUniversalMachoSlice;
function init_machoImageSelection() {
	return (init_machoImageSelection = __esmMin((() => {
		init_result();
		init_machoContainer();
		readUniversalMachoImage = (bytes) => {
			const fat = readFatContainerHeader(bytes, bytes.byteLength);
			if (fat.state === "not-fat") return ok(null);
			if (fat.state !== "parsed") return err({
				kind: "malformed",
				message: fat.state === "malformed" ? fat.reason : "Universal Mach-O header is truncated"
			});
			const identity = classifyFatContainerEvidence(fat, bytes);
			if (identity.state === "malformed") return err({
				kind: "malformed",
				message: identity.reason
			});
			if (identity.state !== "mach-o") return ok(null);
			const overlap = findOverlappingFatSlices(fat.slices);
			return overlap === null ? ok(fat) : err({
				kind: "malformed",
				message: fatSliceOverlapReason(overlap)
			});
		};
		readUniversalMachoSlice = (bytes, header, slice) => {
			const image = bytes.subarray(slice.offset, slice.offset + slice.size);
			const identity = readMachoHeaderPrefixFacts(image).identity;
			const message = identity === null ? `FAT architecture ${slice.index} has a truncated Mach-O identity` : validateFatSlice(slice, bytes.length, header.tableEnd, identity);
			return message === null ? ok(image) : err({
				kind: "malformed",
				message
			});
		};
	})))();
}

//#endregion
//#region dist/domain/apple/machoArchitectureSelection.js
var preferredSubtypes, MACHO_ARCHITECTURE_POLICIES, SUBTYPES_BY_NAME, subtypeNamed, machoSubtypeRank, codeSignArchitectureName, machoKnownCodeSignSelector, selectPreferredArchitecture, machoToolArchitectureName, architectureBaseName, selectLipoArchitecture;
function init_machoArchitectureSelection() {
	return (init_machoArchitectureSelection = __esmMin((() => {
		init_machoCpuIdentity();
		init_keyedCollection();
		init_result();
		preferredSubtypes = (order, names) => order.map((subtype) => ({
			subtype,
			name: names[subtype]
		}));
		MACHO_ARCHITECTURE_POLICIES = {
			x86: {
				cpuType: 7,
				subtypes: preferredSubtypes(X86_HOST_SUBTYPE_PREFERENCE, { 3: "i386" })
			},
			x86_64: {
				cpuType: 16777223,
				subtypes: preferredSubtypes(X86_64_HOST_SUBTYPE_PREFERENCE, { 3: "x86_64" })
			},
			arm: {
				cpuType: 12,
				subtypes: [],
				variantName: /^arm$/u
			},
			arm64: {
				cpuType: 16777228,
				subtypes: preferredSubtypes(ARM64_HOST_SUBTYPE_PREFERENCE, {
					0: "arm64",
					2: "arm64e",
					1: "arm64v8"
				}),
				variantName: /^arm64e\.[A-Za-z0-9_]+$/u
			},
			arm64_32: {
				cpuType: 33554444,
				subtypes: preferredSubtypes(ARM64_32_HOST_SUBTYPE_PREFERENCE, { 1: "arm64_32" })
			}
		};
		SUBTYPES_BY_NAME = new Map(Object.values(MACHO_ARCHITECTURE_POLICIES).map((policy) => [policy, new Map(policy.subtypes.map((subtype) => [subtype.name, subtype]))]));
		subtypeNamed = (policy, name) => SUBTYPES_BY_NAME.get(policy)?.get(name);
		machoSubtypeRank = (policy, subtype) => {
			const rank = policy.subtypes.findIndex((candidate) => candidate.subtype === machoCpuSubtypeBase(subtype));
			return rank < 0 ? policy.subtypes.length : rank;
		};
		codeSignArchitectureName = (cpuType, cpuSubtype) => {
			const capabilities = cpuSubtype >>> 24 & 255;
			const base = machoCpuSubtypeBase(cpuSubtype);
			if (capabilities !== 0 && !(cpuType === 16777228 && base === 2 && (capabilities & 240) === 128) && !(cpuType === 16777223 && base === 3 && capabilities === 128)) return undefined;
			return Object.values(MACHO_ARCHITECTURE_POLICIES).find((policy) => policy.cpuType === cpuType)?.subtypes.find(({ subtype }) => subtype === base)?.name;
		};
		machoKnownCodeSignSelector = (slices, index) => {
			const slice = slices[index];
			if (slice === undefined) return undefined;
			const base = machoCpuSubtypeBase(slice.cpuSubtype);
			return slices.findIndex((other) => other.cpuType === slice.cpuType && machoCpuSubtypeBase(other.cpuSubtype) === base) === index ? codeSignArchitectureName(slice.cpuType, slice.cpuSubtype) : undefined;
		};
		selectPreferredArchitecture = (policy, available) => {
			let selected;
			let bestRank = Number.POSITIVE_INFINITY;
			for (const architecture of available) {
				if (architecture.cpu_type_code !== null && architecture.cpu_type_code !== policy.cpuType) continue;
				const namedSubtype = subtypeNamed(policy, architecture.name);
				const recognizedName = namedSubtype !== undefined || policy.variantName?.test(architecture.name);
				if (!recognizedName && (architecture.cpu_type_code === null || architecture.cpu_subtype_base === null)) continue;
				const subtype = architecture.cpu_subtype_base ?? namedSubtype?.subtype;
				const rank = subtype === undefined ? policy.subtypes.length : machoSubtypeRank(policy, subtype);
				if (rank >= bestRank) continue;
				selected = architecture;
				bestRank = rank;
			}
			return selected;
		};
		machoToolArchitectureName = (policy, architecture) => {
			const named = subtypeNamed(policy, architecture.name);
			const actual = policy.subtypes.find(({ subtype }) => subtype === architecture.cpu_subtype_base);
			return named !== undefined && actual !== undefined && named !== actual ? actual.name : architecture.name;
		};
		architectureBaseName = (architecture) => architecture.replace(/\.v\d+$/u, "");
		selectLipoArchitecture = (request, available) => {
			const policy = MACHO_ARCHITECTURE_POLICIES[request.architecture];
			const toolName = (record) => policy === undefined ? record.name : machoToolArchitectureName(policy, record);
			const spelled = request.architecture === "x86" ? "i386" : request.architecture;
			const absent = (kind) => err({
				kind,
				message: `lipo did not list ${spelled}; refusing to read another slice`
			});
			const ambiguous = (selector) => err({
				kind: "ambiguous_architecture",
				message: `lipo listed multiple slices addressable as ${selector}; refusing to associate a slice offset with an ambiguous tool selection`
			});
			if (request.mode === "admitted") {
				const { slice } = request;
				const matches = available.filter((candidate) => candidate.file_offset === slice.offset && (candidate.size === null || candidate.size === slice.size));
				const [admitted] = matches;
				if (admitted === undefined) return absent("admitted_slice_mismatch");
				if (matches.length > 1) return ambiguous(spelled);
				return ok({
					architecture: admitted,
					toolName: toolName(admitted)
				});
			}
			let selected;
			if (policy === undefined) {
				const named = uniqueKeyed(keyedBy(available, ({ name }) => name), spelled);
				if (!named.ok) return ambiguous(spelled);
				selected = named.value;
			} else selected = selectPreferredArchitecture(policy, available);
			if (selected === undefined) return absent("architecture_not_present");
			const name = toolName(selected);
			const selector = architectureBaseName(name);
			return available.some((candidate) => candidate !== selected && architectureBaseName(toolName(candidate)) === selector) ? ambiguous(selector) : ok({
				architecture: selected,
				toolName: name
			});
		};
	})))();
}

//#endregion
//#region dist/domain/apple/machoSliceSelection.js
var cpuName, SHARED_SLICE_SELECTION_INPUT, namesSubtype, familyValues, addressedSlices, selectMachoSlice, selectAdmittedSlice, selectedFatImage, selectArchitectureSlice, requireSelectedNativeImage;
function init_machoSliceSelection() {
	return (init_machoSliceSelection = __esmMin((() => {
		init_machoImageSelection();
		init_machoContainer();
		init_machoTargetSelection();
		init_analysisErrorCore();
		init_result();
		init_machoArchitectureSelection();
		init_sha256Hex();
		cpuName = (cpuType, cpuSubtype) => {
			const name = Object.entries(MACHO_CPU_TYPES).find(([, type]) => type === cpuType)?.[0];
			const subtype = `0x${cpuSubtype.toString(16)}`;
			return name === undefined ? `cpu type 0x${cpuType.toString(16)} subtype ${subtype}` : `${name} (subtype ${subtype})`;
		};
		SHARED_SLICE_SELECTION_INPUT = {
			pathField: "path",
			architectureField: "architecture",
			spelling: {
				x86: "x86",
				x86_64: "x86_64",
				arm: "arm",
				arm64: "arm64",
				arm64e: "arm64e"
			}
		};
		namesSubtype = (architecture) => architecture === "arm64" || architecture === "arm64e" || architecture === "x86_64";
		familyValues = (architecture) => architecture === "arm64" || architecture === "arm64e" ? ["arm64", "arm64e"] : [architecture];
		addressedSlices = (family, architecture) => architecture !== "arm64e" && family.length === 1 ? family : family.filter((slice) => machoSliceSubtypeSelector(slice.cpuType, slice.cpuSubtype) === architecture);
		selectMachoSlice = (bytes, request) => {
			const container = readUniversalMachoImage(bytes);
			if (!container.ok) return container;
			return request.mode === "admitted" ? selectAdmittedSlice(bytes, container.value, request) : selectArchitectureSlice(bytes, container.value, request.architecture, request.input ?? SHARED_SLICE_SELECTION_INPUT);
		};
		selectAdmittedSlice = (bytes, fat, { architecture, slice: admitted }) => {
			const cpuType = MACHO_ARCHITECTURE_POLICIES[architecture]?.cpuType;
			if (fat === null && admitted !== undefined) return err({
				kind: "admitted_slice_mismatch",
				message: "Admission bound a universal slice, but the file is not a universal Mach-O"
			});
			if (fat === null) {
				const { identity, format } = readMachoHeaderPrefixFacts(bytes);
				if (identity !== null && format !== null && bytes.length >= format.headerSize && !(format.wide && !format.littleEndian) && identity.cpuType !== cpuType) return err({
					kind: "architecture_not_present",
					message: `Mach-O CPU type does not match requested architecture ${architecture}`
				});
				return ok({
					bytes,
					fileOffset: 0,
					selection: null,
					limitations: []
				});
			}
			if (cpuType === undefined) return err({
				kind: "architecture_not_present",
				message: `Universal Mach-O metadata does not read architecture ${architecture}`
			});
			if (admitted === undefined) return err({
				kind: "admitted_slice_mismatch",
				message: "Universal Mach-O metadata needs the admitted slice"
			});
			const declared = fat.slices.find(({ offset, size }) => offset === admitted.offset && size === admitted.size);
			if (declared === undefined) return err({
				kind: "admitted_slice_mismatch",
				message: "Admitted FAT slice is not declared"
			});
			if (declared.cpuType !== cpuType) return err({
				kind: "admitted_slice_mismatch",
				message: "Admitted FAT slice does not match the requested architecture"
			});
			return selectedFatImage(bytes, fat, declared, []);
		};
		selectedFatImage = (bytes, fat, slice, limitations) => {
			const selected = readUniversalMachoSlice(bytes, fat, slice);
			if (!selected.ok) return selected;
			return ok({
				bytes: selected.value,
				fileOffset: slice.offset,
				selection: {
					kind: "macho-selected-image-v1",
					container: "fat",
					offset: slice.offset,
					byte_length: slice.size,
					cpu_type: slice.cpuType,
					cpu_subtype: slice.cpuSubtype,
					container_table_sha256: sha256Hex(bytes.subarray(0, fat.tableEnd))
				},
				limitations
			});
		};
		selectArchitectureSlice = (bytes, fat, architecture, input) => {
			const field = input.architectureField;
			const spelled = (value) => input.spelling[value] ?? value;
			if (fat === null) return architecture === undefined ? ok({
				bytes,
				fileOffset: 0,
				selection: null,
				limitations: []
			}) : err({
				kind: "architecture_not_present",
				message: `${field} ${spelled(architecture)} was selected, but the file is not a universal Mach-O; omit ${field}.`
			});
			const available = fat.slices.map(({ cpuType, cpuSubtype }) => cpuName(cpuType, cpuSubtype)).join(", ");
			if (architecture === undefined) return err({
				kind: "ambiguous_architecture",
				message: `Universal Mach-O holds ${available}; select one architecture.`
			});
			const sameFamily = fat.slices.filter(({ cpuType }) => cpuType === MACHO_CPU_TYPES[machoSliceFamily(architecture)]);
			const identityIssues = new Map(sameFamily.map((declared) => {
				const read = readUniversalMachoSlice(bytes, fat, declared);
				return [declared, read.ok ? undefined : read.error.message];
			}));
			const verifiedSliceFor = (value) => {
				const addressed = addressedSlices(sameFamily, value);
				return addressed.length === 1 && addressed[0] !== undefined && identityIssues.get(addressed[0]) === undefined ? addressed[0] : undefined;
			};
			const matches = addressedSlices(sameFamily, architecture);
			const [slice] = matches;
			if (slice === undefined || matches.length > 1) {
				const choices = familyValues(architecture).filter((value) => value !== architecture && input.spelling[value] !== undefined && verifiedSliceFor(value) !== undefined);
				const select = choices.length === 0 ? "" : ` Select ${field} ${choices.map(spelled).join(" or ")}.`;
				return err({
					kind: matches.length > 1 ? "ambiguous_architecture" : "architecture_not_present",
					message: sameFamily.length === 0 ? `Universal Mach-O holds ${available}, not ${spelled(architecture)}.${select}` : matches.length === 0 && namesSubtype(architecture) ? `Universal Mach-O holds ${available}; no slice has the ${spelled(architecture)} subtype.${select}` : `Universal Mach-O holds several ${spelled(architecture)} slices (${available}); no slice was selected.${select}`
				});
			}
			const unread = sameFamily.filter((other) => other !== slice).map((other) => {
				const place = `${cpuName(other.cpuType, other.cpuSubtype)} at file offset ${String(other.offset)}`;
				const issue = identityIssues.get(other);
				if (issue !== undefined) return `${place} (unverified: ${issue}; no ${field} value reads it)`;
				const selector = familyValues(architecture).find((value) => input.spelling[value] !== undefined && verifiedSliceFor(value) === other);
				return `${place} (${selector === undefined ? `no ${field} value selects it` : `${field} ${spelled(selector)} selects it`})`;
			});
			return selectedFatImage(bytes, fat, slice, unread.length === 0 ? [] : [`Only the selected ${spelled(architecture)} slice (${cpuName(slice.cpuType, slice.cpuSubtype)} at file offset ${String(slice.offset)}) was read; this universal Mach-O also holds ${unread.join(", ")}.`]);
		};
		requireSelectedNativeImage = (operation, path, bytes, architecture, input = SHARED_SLICE_SELECTION_INPUT) => {
			const selected = selectMachoSlice(bytes, {
				mode: "architecture",
				architecture,
				input
			});
			if (selected.ok) return selected.value;
			const { kind, message } = selected.error;
			throw new AnalysisInputError(operation, undefined, [kind !== "malformed" ? {
				path: [input.architectureField],
				reason: "invalid_value",
				message
			} : {
				path: [input.pathField],
				reason: "invalid_format",
				message: `Selected artifact ${path}: ${message}`
			}]);
		};
	})))();
}

//#endregion
export { architectureBaseName, init_machoArchitectureSelection, init_machoImageSelection, init_machoSliceSelection, machoKnownCodeSignSelector, readUniversalMachoSlice, requireSelectedNativeImage, selectLipoArchitecture, selectMachoSlice };