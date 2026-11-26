import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, decodeLimit, init_jsonSerialization, init_parseFailure, jsonParts, malformedInput } from "./jsonSerialization-DAF9DVXC.js";
import { BinaryFormatFailure, BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { PE_COFF_FRAME_BYTES, init_dosMz, init_peCoffHeader, init_peOptionalHeader, observePeCoffFrame, parseMzHeaderEvidence, readPeOptionalHeaderStructure } from "./peOptionalHeader-DrZ2zQO-.js";
import { init_peSectionHeader, observePeHeaderExtent, readPeSectionHeader } from "./peSectionHeader-CdESy7pO.js";
import { init_devicetreeHeader, readDevicetreeHeader } from "./devicetreeHeader-qDz5cYn9.js";
import { createHash } from "node:crypto";
import { setImmediate } from "node:timers/promises";

//#region dist/domain/pe/peResourceTreeFacts.js
var PE_RESOURCE_DIRECTORY_BYTES, PE_RESOURCE_ENTRY_BYTES, PE_RESOURCE_DATA_ENTRY_BYTES, PE_RESOURCE_NAME_PREFIX_BYTES, PE_RESOURCE_ENTRY_LIMIT, peResourceRangeFits, readPeResourceDirectoryFacts, readPeResourceEntryFacts, readPeResourceNameFacts, readPeResourceDataEntryFacts;
function init_peResourceTreeFacts() {
	return (init_peResourceTreeFacts = __esmMin((() => {
		init_binaryContainer();
		PE_RESOURCE_DIRECTORY_BYTES = 16;
		PE_RESOURCE_ENTRY_BYTES = 8;
		PE_RESOURCE_DATA_ENTRY_BYTES = 16;
		PE_RESOURCE_NAME_PREFIX_BYTES = 2;
		PE_RESOURCE_ENTRY_LIMIT = "max_entries";
		peResourceRangeFits = (offset, bytes, intervalBytes) => offset >= 0 && offset <= intervalBytes - bytes;
		readPeResourceDirectoryFacts = (bytes) => {
			const reader = new BinaryReader(bytes, true, "pe");
			const namedEntries = reader.u16(12);
			const idEntries = reader.u16(14);
			return {
				characteristics: reader.u32(0),
				timestamp: reader.u32(4),
				majorVersion: reader.u16(8),
				minorVersion: reader.u16(10),
				namedEntries,
				idEntries,
				entryCount: namedEntries + idEntries
			};
		};
		readPeResourceEntryFacts = (bytes) => {
			const reader = new BinaryReader(bytes, true, "pe");
			const encodedIdentity = reader.u32(0);
			const encodedTarget = reader.u32(4);
			const identity = (encodedIdentity & 2147483648) === 0 ? {
				kind: "id",
				id: encodedIdentity
			} : {
				kind: "name",
				offset: encodedIdentity & 2147483647
			};
			return {
				identity,
				target: {
					kind: (encodedTarget & 2147483648) === 0 ? "data" : "directory",
					offset: encodedTarget & 2147483647
				}
			};
		};
		readPeResourceNameFacts = (bytes) => {
			const utf16Units = new BinaryReader(bytes, true, "pe").u16(0);
			return {
				utf16Units,
				payloadBytes: utf16Units * 2
			};
		};
		readPeResourceDataEntryFacts = (bytes) => {
			const record = new BinaryReader(bytes, true, "pe");
			return {
				rva: record.u32(0),
				size: record.u32(4),
				codePage: record.u32(8),
				reserved: record.u32(12)
			};
		};
	})))();
}

//#endregion
//#region dist/domain/pe/peImageHeaders.js
/** Admit the PE header directory using its declared spans in either source. */
function* peImageHeaderReads(prefix, fileSize) {
	requirePeRange(prefix, 0, 64);
	if (prefix[0] !== 77 || prefix[1] !== 90) peFailure("Expected an MZ PE image.");
	const evidence = parseMzHeaderEvidence(prefix, fileSize);
	const frame = yield* observePeCoffFrame(prefix, fileSize, evidence);
	const observed = frame.observation;
	if (observed.state === "absent" && evidence.dos.ok) throw new BinaryFormatFailure("unsupported", "DOS MZ images do not contain PE resource or certificate tables");
	if (observed.state === "declared" && observed.signature !== "PE") throw new BinaryFormatFailure("unsupported", `${observed.signature} images do not contain PE resource or certificate tables`);
	if (frame.kind !== "pe") return peFailure("MZ header does not declare a PE image in the inspected bytes.");
	const pe = frame.observation.offset;
	requirePeExtent(fileSize, pe, PE_COFF_FRAME_BYTES);
	const { coff } = frame;
	if (!coff.ok) return peFailure(coff.error.message);
	const { sectionCount, optionalHeaderSize, machine } = coff.value;
	const optionalHeaderOffset = pe + PE_COFF_FRAME_BYTES;
	const optional = yield headerRead(fileSize, optionalHeaderOffset, optionalHeaderSize);
	if (optionalHeaderSize < 64) peFailure("Truncated PE optional header.");
	const parsed = readPeOptionalHeaderStructure(optional);
	if (!parsed.ok) return peFailure(OPTIONAL_HEADER_FAILURES[parsed.error.reason]);
	const { sizeOfHeaders: headerSize, format, directoryOffset, dataDirectories } = parsed.value;
	const { sectionTableOffset, sectionTableBytes, sizeOfHeadersState } = observePeHeaderExtent({
		optionalHeaderOffset,
		optionalHeaderSize,
		sectionCount,
		sizeOfHeaders: headerSize,
		fileSize
	});
	const sectionRead = headerRead(fileSize, sectionTableOffset, sectionTableBytes);
	if (sizeOfHeadersState !== "valid") peFailure("Invalid PE SizeOfHeaders.");
	const sectionTable = yield sectionRead;
	return {
		machine,
		format,
		sectionCount,
		optionalHeaderOffset,
		directoryOffset,
		dataDirectories,
		headerSize,
		sectionTable
	};
}
var OPTIONAL_HEADER_FAILURES, peFailure, requirePeRange, requirePeExtent, headerRead, readPeImageHeaders, readPeImageHeadersAt;
function init_peImageHeaders() {
	return (init_peImageHeaders = __esmMin((() => {
		init_dosMz();
		init_binaryContainer();
		init_parseFailure();
		init_peCoffHeader();
		init_peSectionHeader();
		init_peOptionalHeader();
		OPTIONAL_HEADER_FAILURES = {
			"truncated-magic": "Truncated PE optional header.",
			"unsupported-magic": "Unsupported PE optional header magic.",
			"truncated-fixed-fields": "Truncated PE data directory count.",
			"truncated-directory-table": "PE directory count exceeds its optional header."
		};
		peFailure = (message) => {
			throw malformedInput("pe", message);
		};
		requirePeRange = (bytes, offset, length) => requirePeExtent(bytes.length, offset, length);
		requirePeExtent = (fileSize, offset, length) => {
			if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || offset < 0 || length < 0 || offset > fileSize - length) peFailure(`PE range ${String(offset)} + ${String(length)} leaves the artifact.`);
		};
		headerRead = (fileSize, offset, bytes) => {
			requirePeExtent(fileSize, offset, bytes);
			return {
				offset,
				size: bytes
			};
		};
		readPeImageHeaders = (bytes) => {
			const steps = peImageHeaderReads(bytes, bytes.length);
			let next = steps.next();
			while (!next.done) {
				const { offset, size } = next.value;
				next = steps.next(bytes.subarray(offset, offset + size));
			}
			return next.value;
		};
		readPeImageHeadersAt = async (prefix, fileSize, read) => {
			const steps = peImageHeaderReads(prefix, fileSize);
			let next = steps.next();
			while (!next.done) {
				const { offset, size: bytes } = next.value;
				const record = bytes === 0 || offset + bytes <= prefix.length ? prefix.subarray(offset, offset + bytes) : await read(offset, bytes);
				if (record === undefined || record.length !== bytes) return peFailure(`Truncated PE header range at ${String(offset)}.`);
				next = steps.next(record);
			}
			return next.value;
		};
	})))();
}

//#endregion
//#region dist/domain/pe/peResourceLayout.js
/**
* Targets of the `name` entries under each `typeId` type directory. A type
* branch that is not a directory, whose names directory cannot be read, or a
* name entry whose string cannot be read is recorded in `walk` rather than
* treated as absent.
*/
async function* namedResourceTargets(tree, typeId, name, walk) {
	const root = await tree.directory(0);
	if (!root.ok) return;
	const types = root.value;
	const expected = Buffer.from(name, "utf16le");
	for (let at = 0; at < types.length; at += 8) {
		const type = readPeResourceEntryFacts(types.subarray(at, at + 8));
		if (type.identity.kind !== "id" || type.identity.id !== typeId) continue;
		const directory = type.target.kind === "directory" ? await tree.directory(type.target.offset) : err("unreadable");
		if (!directory.ok) {
			if (directory.error === "unreadable" || walk.unresolved === undefined) walk.unresolved = directory.error;
			continue;
		}
		const names = directory.value;
		for (let entry = 0; entry < names.length; entry += 8) {
			const { identity, target } = readPeResourceEntryFacts(names.subarray(entry, entry + 8));
			if (identity.kind !== "name") continue;
			const nameAt = identity.offset;
			const length = await tree.relative(nameAt, 2);
			if (length === undefined) {
				walk.unresolved = "unreadable";
				continue;
			}
			const { utf16Units, payloadBytes } = readPeResourceNameFacts(length);
			const payloadAt = nameAt + 2;
			if (!tree.contains(payloadAt, payloadBytes)) {
				walk.unresolved = "unreadable";
				continue;
			}
			if (utf16Units !== name.length) continue;
			const candidate = await tree.relative(payloadAt, payloadBytes);
			if (candidate === undefined) walk.unresolved = "unreadable";
			else if (candidate.equals(expected)) yield target;
		}
	}
}
var virtualExtent, intersectsResource, readPeResourceLayout, mapPeResourceLayout, PeResourceTree, openPeResourceTree, hasPeResourceName, locatePeResourcePayloads;
function init_peResourceLayout() {
	return (init_peResourceLayout = __esmMin((() => {
		init_peResourceTreeFacts();
		init_result();
		init_binaryContainer();
		init_parseFailure();
		init_peSectionHeader();
		init_peImageHeaders();
		virtualExtent = (section) => section.virtualSize === 0 ? section.size : section.virtualSize;
		intersectsResource = (section, rva, size) => {
			const extent = virtualExtent(section);
			return extent > 0 && section.rva < rva + Math.max(size, 1) && rva < section.rva + extent;
		};
		readPeResourceLayout = (bytes) => mapPeResourceLayout(readPeImageHeaders(bytes), bytes.length);
		mapPeResourceLayout = (headers, fileSize) => {
			const { machine, format, sectionCount, optionalHeaderOffset, directoryOffset, dataDirectories, headerSize, sectionTable } = headers;
			const sections = [];
			for (let index = 0; index < sectionCount; index++) {
				const at = index * 40;
				const parsed = readPeSectionHeader(sectionTable.subarray(at, at + 40));
				if (!parsed.ok) return peFailure(parsed.error.message);
				const row = parsed.value;
				const section = {
					rva: row.virtual_address,
					virtualSize: row.virtual_size,
					offset: row.offset,
					size: row.raw_size
				};
				if (section.rva + virtualExtent(section) > 4294967296) peFailure("PE section RVA range overflows.");
				if (section.size > 0) {
					requirePeExtent(fileSize, section.offset, section.size);
					if (section.offset < headerSize) peFailure("PE section raw bytes overlap headers.");
				}
				sections.push(section);
			}
			const backed = sections.filter(({ size }) => size > 0).sort((left, right) => left.offset - right.offset);
			for (let index = 1; index < backed.length; index++) {
				const previous = backed[index - 1];
				const current = backed[index];
				if (previous !== undefined && current !== undefined && current.offset < previous.offset + previous.size) peFailure("PE sections have overlapping raw file ranges.");
			}
			const map = (rva, size) => {
				if (rva + size > 4294967296) peFailure("Resource RVA range overflows.");
				const containing = sections.filter((section) => rva >= section.rva && rva - section.rva < virtualExtent(section));
				const candidates = size === 0 && containing.length === 0 ? sections.filter((section) => virtualExtent(section) > 0 && rva - section.rva === virtualExtent(section)) : containing;
				if (rva < headerSize) {
					if (sections.some((section) => intersectsResource(section, rva, size)) || size > headerSize - rva) peFailure("Ambiguous resource header RVA mapping.");
					requirePeExtent(fileSize, rva, size);
					return rva;
				}
				if (candidates.length !== 1) peFailure("Resource RVA has missing or overlapping section mappings.");
				const section = candidates[0];
				if (section === undefined) return peFailure("Missing resource section.");
				const within = rva - section.rva;
				if (size > virtualExtent(section) - within) peFailure("Resource range leaves its section's virtual size.");
				if (within > section.size || size > section.size - within) peFailure("Resource range is not entirely file-backed in one section.");
				if (sections.some((other) => other !== section && intersectsResource(other, rva, size))) peFailure("Resource interval intersects overlapping virtual sections.");
				const offset = section.offset + within;
				requirePeExtent(fileSize, offset, size);
				return offset;
			};
			const resource = dataDirectories[2];
			const directoryAt = optionalHeaderOffset + (resource?.offset ?? directoryOffset + 2 * 8);
			const rva = resource?.address ?? 0;
			const size = resource?.size ?? 0;
			if (rva === 0 !== (size === 0)) peFailure("Inconsistent PE resource directory RVA/size.");
			return {
				format,
				machine,
				directoryAt,
				rva,
				size,
				map
			};
		};
		PeResourceTree = class {
			layout;
			root;
			read;
			maxEntries;
			#examined = 0;
			constructor(layout, root, read, maxEntries) {
				this.layout = layout;
				this.root = root;
				this.read = read;
				this.maxEntries = maxEntries;
			}
			contains(at, length) {
				return peResourceRangeFits(at, length, this.layout.size);
			}
			relative(at, length) {
				return this.contains(at, length) ? this.read(this.root + at, length) : Promise.resolve(undefined);
			}
			async directory(at) {
				const header = await this.relative(at, 16);
				if (header === undefined) return err("unreadable");
				const { entryCount } = readPeResourceDirectoryFacts(header);
				const rowsAt = at + 16;
				const rowsBytes = entryCount * 8;
				if (!this.contains(rowsAt, rowsBytes)) return err("unreadable");
				const required = this.#examined + entryCount;
				if (required > this.maxEntries) return err(decodeLimit("pe", `PE resource directory needs at least ${required} entries; the inspection allowance is ${this.maxEntries}.`, {
					name: PE_RESOURCE_ENTRY_LIMIT,
					maximum: this.maxEntries,
					required
				}));
				this.#examined = required;
				const rows = await this.relative(rowsAt, rowsBytes);
				return rows === undefined ? err("unreadable") : ok(rows);
			}
		};
		openPeResourceTree = async (prefix, fileSize, read, maxEntries) => {
			try {
				const headers = await readPeImageHeadersAt(prefix, fileSize, read);
				const layout = mapPeResourceLayout(headers, fileSize);
				if (layout.size < 16) return undefined;
				return new PeResourceTree(layout, layout.map(layout.rva, layout.size), read, maxEntries);
			} catch (cause) {
				if (cause instanceof ParseFailureError && cause.kind === "malformed" || cause instanceof BinaryFormatFailure && cause.kind === "unsupported") return undefined;
				throw cause;
			}
		};
		hasPeResourceName = async (prefix, fileSize, read, typeId, name, maxEntries) => {
			const tree = await openPeResourceTree(prefix, fileSize, read, maxEntries);
			if (tree === undefined) return false;
			const first = await namedResourceTargets(tree, typeId, name, {}).next();
			return first.done !== true;
		};
		locatePeResourcePayloads = async (prefix, fileSize, read, typeId, name, maxEntries) => {
			const tree = await openPeResourceTree(prefix, fileSize, read, maxEntries);
			if (tree === undefined) return [];
			const found = [];
			const walk = {};
			for await (const target of namedResourceTargets(tree, typeId, name, walk)) {
				if (target.kind !== "directory") return peFailure(`PE ${name} resource directory is unreadable.`);
				const directory = await tree.directory(target.offset);
				if (!directory.ok) {
					if (directory.error === "unreadable") return peFailure(`PE ${name} resource directory is unreadable.`);
					throw directory.error;
				}
				const languages = directory.value;
				const before = found.length;
				for (let at = 0; at < languages.length; at += 8) {
					const language = readPeResourceEntryFacts(languages.subarray(at, at + 8));
					if (language.target.kind !== "data") return peFailure(`PE ${name} resource language entry is a directory.`);
					const data = await tree.relative(language.target.offset, 16);
					if (data === undefined) return peFailure(`PE ${name} resource data entry is truncated.`);
					const { rva, size } = readPeResourceDataEntryFacts(data);
					found.push({
						offset: tree.layout.map(rva, size),
						bytes: size
					});
				}
				if (found.length === before) return peFailure(`PE ${name} resource has no data entry.`);
			}
			if (walk.unresolved !== undefined && found.length > 0) {
				if (walk.unresolved === "unreadable") return peFailure(`PE ${name} resource sits beside a resource type branch that cannot be read.`);
				throw walk.unresolved;
			}
			return found;
		};
	})))();
}

//#endregion
//#region dist/domain/pe/peResourceInventory.js
var METADATA_BYTES, METADATA_LIMIT, limit, peResourceLimitBoundary, jsonBytes, identityKey, parsePeResources, rejectOverlappingRanges, readIconGroups;
function init_peResourceInventory() {
	return (init_peResourceInventory = __esmMin((() => {
		init_peResourceTreeFacts();
		init_binaryContainer();
		init_jsonSerialization();
		init_parseFailure();
		init_peImageHeaders();
		init_peResourceLayout();
		METADATA_BYTES = 8 * 1024 * 1024;
		METADATA_LIMIT = "pe_resource_metadata_bytes";
		limit = (message, name, maximum) => {
			throw decodeLimit("pe", message, {
				name,
				maximum
			});
		};
		peResourceLimitBoundary = (limit) => limit.name === METADATA_LIMIT ? "memory" : limit.name === "max_entries" ? "capacity" : undefined;
		jsonBytes = (value, maximum) => {
			let size = 0;
			for (const part of jsonParts(value)) {
				size += Buffer.byteLength(part, "utf8");
				if (size > maximum) return size;
			}
			return size;
		};
		identityKey = (id) => id.kind === "id" ? `id:${String(id.id)}` : `name:${id.utf16le_hex}`;
		parsePeResources = async (bytes, artifact, input, signal, admittedLayout) => {
			signal?.throwIfAborted();
			const layout = admittedLayout ?? readPeResourceLayout(bytes);
			const directories = [];
			const resources = [];
			const occupied = [];
			const names = new Map();
			let examined = 0;
			let metadataBytes = 0;
			const ensureCapacity = (projectedBytes) => {
				if (metadataBytes + projectedBytes > METADATA_BYTES) limit("PE resource metadata exceeds the 8 MiB complete-result allocation budget.", METADATA_LIMIT, METADATA_BYTES);
			};
			const accountBytes = (projectedBytes) => {
				ensureCapacity(projectedBytes);
				metadataBytes += projectedBytes;
			};
			const account = (value) => {
				accountBytes(jsonBytes(value, METADATA_BYTES - metadataBytes - 1) + 1);
			};
			const reserveDecodedName = (utf16Units) => {
				const projectedBytes = 10 * utf16Units + 256;
				ensureCapacity(projectedBytes);
			};
			const root = layout.size === 0 ? 0 : layout.map(layout.rva, layout.size);
			const relative = (at, length) => {
				if (!peResourceRangeFits(at, length, layout.size)) peFailure("Resource directory offset leaves the declared resource interval.");
				requirePeRange(bytes, root + at, length);
				return root + at;
			};
			const recordRange = (offset, size, kind) => {
				const range = {
					offset,
					bytes: size
				};
				if (size > 0) occupied.push({
					...range,
					kind
				});
				return range;
			};
			const readIdentity = (declaration) => {
				if (declaration.kind === "id") return {
					kind: "id",
					id: declaration.id
				};
				const at = declaration.offset;
				const previous = names.get(at);
				if (previous !== undefined) return previous;
				if (at % 2 !== 0) peFailure("Unaligned PE resource name.");
				const start = relative(at, 2);
				const { utf16Units, payloadBytes: length } = readPeResourceNameFacts(bytes.subarray(start, start + 2));
				relative(at, 2 + length);
				reserveDecodedName(utf16Units);
				const raw = bytes.subarray(start + 2, start + 2 + length);
				const value = {
					kind: "name",
					name: raw.toString("utf16le"),
					utf16le_hex: raw.toString("hex"),
					location: recordRange(start, 2 + length, "name")
				};
				names.set(at, value);
				return value;
			};
			const visit = async (at, path, entryLocations, ancestors) => {
				if (ancestors.has(at)) peFailure("Cyclic PE resource directory.");
				const header = relative(at, 16);
				const facts = readPeResourceDirectoryFacts(bytes.subarray(header, header + 16));
				const { namedEntries: named, idEntries: ids, entryCount: count } = facts;
				relative(at, 16 + 8 * count);
				if (count > input.max_entries - examined) limit("PE resource directory entry budget exceeded; no partial inventory was returned.", PE_RESOURCE_ENTRY_LIMIT, input.max_entries);
				examined += count;
				const directory = {
					path,
					entry_locations: entryLocations,
					location: recordRange(header, 16 + 8 * count, "directory"),
					characteristics: facts.characteristics,
					timestamp: facts.timestamp,
					major_version: facts.majorVersion,
					minor_version: facts.minorVersion,
					named_entries: named,
					id_entries: ids
				};
				account(directory);
				directories.push(directory);
				const keys = new Set();
				let previousId = -1;
				const nested = new Set([...ancestors, at]);
				for (let index = 0; index < count; index++) {
					if (index % 128 === 0) {
						await setImmediate();
						signal?.throwIfAborted();
					}
					const entry = header + 16 + index * 8;
					const record = readPeResourceEntryFacts(bytes.subarray(entry, entry + 8));
					if (record.identity.kind === "name" !== index < named) peFailure("Resource name/ID entry counts disagree with encoded identities.");
					const identity = readIdentity(record.identity);
					const key = identityKey(identity);
					if (keys.has(key)) peFailure("Duplicate identity within a resource directory.");
					keys.add(key);
					if (identity.kind === "id") {
						if (identity.id < previousId) peFailure("PE resource directory numeric IDs are out of order.");
						previousId = identity.id;
					}
					const next = [...path, identity];
					const locations = [...entryLocations, {
						offset: entry,
						bytes: 8
					}];
					const { offset } = record.target;
					if (record.target.kind === "directory") {
						if (next.length >= 3) peFailure("Unsupported resource tree deeper than type/name/language.");
						await visit(offset, next, locations, nested);
					} else {
						if (next.length !== 3) peFailure("Unsupported resource leaf outside the type/name/language profile.");
						const data = relative(offset, 16);
						const { rva, size, codePage, reserved } = readPeResourceDataEntryFacts(bytes.subarray(data, data + 16));
						const payloadOffset = layout.map(rva, size);
						const [type, name, language] = next;
						if (type === undefined || name === undefined || language === undefined) return peFailure("Incomplete resource identity.");
						const resource = {
							index: resources.length,
							type,
							name,
							language,
							entry_locations: locations,
							data_entry_location: recordRange(data, 16, "data-entry"),
							code_page: codePage,
							reserved,
							payload: {
								rva,
								location: recordRange(payloadOffset, size, "payload"),
								sha256: "0".repeat(64)
							}
						};
						account(resource);
						resources.push(resource);
					}
				}
			};
			if (layout.size > 0) await visit(0, [], [], new Set());
			rejectOverlappingRanges(occupied);
			const hashes = new Map();
			for (const resource of resources) {
				const range = resource.payload.location;
				const key = `${String(range.offset)}:${String(range.bytes)}`;
				let digest = hashes.get(key);
				if (digest === undefined) {
					const hash = createHash("sha256");
					for (let offset = 0; offset < range.bytes; offset += 1048576) {
						await setImmediate();
						signal?.throwIfAborted();
						hash.update(bytes.subarray(range.offset + offset, range.offset + Math.min(range.bytes, offset + 1048576)));
					}
					digest = hash.digest("hex");
					hashes.set(key, digest);
				}
				resource.payload.sha256 = digest;
			}
			const iconGroups = readIconGroups(bytes, resources, account, ensureCapacity);
			const report = {
				artifact,
				format: layout.format,
				machine: layout.machine,
				directory: layout.size === 0 ? null : {
					rva: layout.rva,
					location: {
						offset: root,
						bytes: layout.size
					},
					data_directory_location: {
						offset: layout.directoryAt,
						bytes: 8
					}
				},
				directories,
				resources,
				icon_groups: iconGroups,
				coverage: {
					status: "complete",
					examined_entries: examined,
					resources: resources.length
				},
				limitations: [
					"Static PE32/PE32+ type/name/language resource inventory; payloads other than RT_GROUP_ICON remain opaque.",
					"Icon candidates are resource-table relationships. Language fallback, image decoding and actual shell/window loading are not observed.",
					"Exact shared byte ranges are retained; non-identical overlapping resource structures or payloads are rejected."
				]
			};
			signal?.throwIfAborted();
			if (jsonBytes(report, METADATA_BYTES) > METADATA_BYTES) limit("PE resource result exceeds the 8 MiB allocation budget.", METADATA_LIMIT, METADATA_BYTES);
			return report;
		};
		rejectOverlappingRanges = (ranges) => {
			ranges.sort((left, right) => left.offset - right.offset || right.bytes - left.bytes);
			let previous;
			for (const current of ranges) {
				if (previous !== undefined && current.offset < previous.offset + previous.bytes && (current.offset !== previous.offset || current.bytes !== previous.bytes || current.kind !== previous.kind)) peFailure("Non-identical resource byte ranges overlap.");
				previous = current;
			}
		};
		readIconGroups = (bytes, resources, account, ensureCapacity) => {
			const imagesById = new Map();
			for (const resource of resources) {
				if (resource.type.kind !== "id" || resource.type.id !== 3 || resource.name.kind !== "id") continue;
				const candidates = imagesById.get(resource.name.id) ?? [];
				candidates.push(resource);
				imagesById.set(resource.name.id, candidates);
			}
			return resources.filter((resource) => resource.type.kind === "id" && resource.type.id === 14).map((group) => {
				const { offset, bytes: size } = group.payload.location;
				const reader = new BinaryReader(bytes.subarray(offset, offset + size), true, "pe");
				if (size < 6 || reader.u16(0) !== 0 || reader.u16(2) !== 1) peFailure("Malformed RT_GROUP_ICON header.");
				const count = reader.u16(4);
				if (size !== 6 + count * 14) peFailure("RT_GROUP_ICON length does not match its image count.");
				const images = [];
				for (let index = 0; index < count; index++) {
					const at = 6 + index * 14;
					const id = reader.u16(at + 12);
					const candidates = imagesById.get(id) ?? [];
					const exact = candidates.find((resource) => identityKey(resource.language) === identityKey(group.language));
					ensureCapacity(302 + candidates.length * 11);
					const declaredBytes = reader.u32(at + 8);
					const image = {
						location: {
							offset: offset + at,
							bytes: 14
						},
						width: reader.u8(at),
						height: reader.u8(at + 1),
						color_count: reader.u8(at + 2),
						reserved: reader.u8(at + 3),
						planes: reader.u16(at + 4),
						bit_count: reader.u16(at + 6),
						declared_bytes: declaredBytes,
						resource_id: id,
						candidate_resource_indices: candidates.map(({ index }) => index),
						same_language_resource_index: exact?.index ?? null,
						size_matches: exact === undefined ? null : exact.payload.location.bytes === declaredBytes
					};
					account(image);
					images.push(image);
				}
				account({
					resource_index: group.index,
					images: []
				});
				return {
					resource_index: group.index,
					images
				};
			});
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/devicetreeParser.js
var DEVICETREE_FORMAT, DEVICETREE_DECODED_BYTES, devicetreeLimitFailure, malformed, align, hex, parseDevicetree;
function init_devicetreeParser() {
	return (init_devicetreeParser = __esmMin((() => {
		init_binaryContainer();
		init_devicetreeHeader();
		init_parseFailure();
		DEVICETREE_FORMAT = "devicetree";
		DEVICETREE_DECODED_BYTES = 33554432;
		devicetreeLimitFailure = (limit, maximum) => decodeLimit(DEVICETREE_FORMAT, limit === "decoded_bytes" ? "Devicetree exceeds its fixed 32 MiB decoded representation allowance; select a smaller blob. This allowance has no runtime override." : `Devicetree exceeds ${limit}; raise that caller-selected limit within its schema ceiling or select a smaller blob.`, {
			name: limit,
			maximum
		});
		malformed = (message) => {
			throw new BinaryFormatFailure("malformed", message);
		};
		align = (n) => Math.ceil(n / 4) * 4;
		hex = (n) => `0x${n.toString(16)}`;
		parseDevicetree = (bytes, artifact, input) => {
			if (bytes.length > input.max_file_bytes) throw devicetreeLimitFailure("max_file_bytes", input.max_file_bytes);
			const { header, reservationEnd, structureEnd: structEnd } = readDevicetreeHeader(bytes);
			const end = header.totalsize;
			if (end > bytes.length) malformed("Invalid FDT header size or compatibility version");
			const reader = new BinaryReader(bytes, false, DEVICETREE_FORMAT);
			const u32 = (offset) => reader.u32(offset);
			let decodedBytes = 0;
			const admit = (size) => {
				decodedBytes += size;
				if (decodedBytes > 33554432) throw devicetreeLimitFailure("decoded_bytes", DEVICETREE_DECODED_BYTES);
			};
			const reservations = [];
			let cursor = header.off_mem_rsvmap;
			for (;;) {
				if (cursor > reservationEnd - 16) malformed("Unterminated or overlapping FDT reservation block");
				const address = reader.word(cursor, 64), size = reader.word(cursor + 8, 64);
				cursor += 16;
				if (address === 0n && size === 0n) break;
				if (reservations.length >= input.max_properties) throw devicetreeLimitFailure("max_properties", input.max_properties);
				admit(128);
				reservations.push({
					offset: cursor - 16,
					address: hex(address),
					size: hex(size)
				});
			}
			const text = (start, stop) => {
				const nul = bytes.indexOf(0, start);
				if (nul < start || nul >= stop) return malformed("Unterminated FDT name");
				const raw = bytes.subarray(start, nul);
				if (raw.some((c) => c < 32 || c > 126)) malformed("Non-ASCII FDT name");
				admit(raw.length * 2);
				return {
					value: raw.toString("ascii"),
					next: nul + 1
				};
			};
			const names = new Map();
			const propertiesByPath = new Map();
			const nodes = [];
			const stack = [];
			const paths = new Set();
			let properties = 0, finished = false;
			cursor = header.off_dt_struct;
			const need = (n) => {
				if (cursor > structEnd - n) malformed("Truncated FDT structure token or property");
			};
			let nonzeroPaddingBytes = 0;
			let firstNonzeroPadding;
			const observePadding = (start, end) => {
				for (let offset = start; offset < end; offset++) {
					if (bytes[offset] === 0) continue;
					nonzeroPaddingBytes += 1;
					firstNonzeroPadding ??= offset;
				}
			};
			while (cursor < structEnd) {
				need(4);
				const offset = cursor, token = u32(cursor);
				cursor += 4;
				if (token === 1) {
					if (stack.length >= input.max_depth) throw devicetreeLimitFailure("max_depth", input.max_depth);
					if (nodes.length >= input.max_nodes) throw devicetreeLimitFailure("max_nodes", input.max_nodes);
					const name = text(cursor, structEnd);
					const next = align(name.next);
					need(next - cursor);
					observePadding(name.next, next);
					cursor = next;
					const parent = stack.at(-1);
					if (name.value.includes("/") || !parent && (nodes.length > 0 || name.value !== "") || parent && !name.value) malformed("Invalid FDT node name or multiple roots");
					admit((parent?.node.path.length ?? 0) * 4 + name.value.length * 2 + 128);
					const path = parent ? `${parent.node.path === "/" ? "" : parent.node.path}/${name.value}` : "/";
					if (paths.has(path)) malformed("Duplicate FDT node path");
					paths.add(path);
					const node = {
						path,
						parent: parent?.node.path ?? null,
						offset,
						properties: []
					};
					if (parent) parent.children = true;
					propertiesByPath.set(path, new Map());
					nodes.push(node);
					stack.push({
						node,
						children: false
					});
				} else if (token === 2) {
					if (!stack.pop()) malformed("Unbalanced FDT_END_NODE");
				} else if (token === 3) {
					const owner = stack.at(-1);
					if (!owner || owner.children) return malformed("FDT property outside node or after children");
					need(8);
					const length = u32(cursor), nameoff = u32(cursor + 4);
					cursor += 8;
					const end = cursor + length;
					const next = align(end);
					need(next - cursor + (stack.length + 1) * 4);
					observePadding(end, next);
					if (++properties > input.max_properties) throw devicetreeLimitFailure("max_properties", input.max_properties);
					if (nameoff >= header.size_dt_strings) malformed("FDT property string offset out of range");
					let name = names.get(nameoff);
					if (name === undefined) {
						name = text(header.off_dt_strings + nameoff, header.off_dt_strings + header.size_dt_strings).value;
						names.set(nameoff, name);
					}
					const propertyMap = propertiesByPath.get(owner.node.path);
					if (!name || propertyMap?.has(name)) malformed("Empty or duplicate FDT property name");
					admit(name.length * 2 + Math.min(length, 256) * 2 + 256);
					const raw = bytes.subarray(cursor, cursor + length);
					const stringProperty = [
						"compatible",
						"model",
						"status",
						"bootargs",
						"stdout-path"
					].includes(name) || owner.node.path === "/aliases";
					if (stringProperty) admit(raw.length * 4);
					let strings = null;
					if (stringProperty && raw.length > 0 && raw.at(-1) === 0 && raw.subarray(0, -1).every((c) => c === 0 || c >= 32 && c <= 126)) {
						let entries = 0;
						for (const byte of raw) if (byte === 0) entries++;
						admit(entries * 32);
						const repeatedInSummary = owner.node.path === "/" && name === "compatible" || entries === 1 && (owner.node.path === "/" && name === "model" || owner.node.path === "/chosen" && ["bootargs", "stdout-path"].includes(name) || owner.node.path === "/aliases");
						if (repeatedInSummary) admit(raw.length * 2 + entries * 3 + 2);
						strings = raw.subarray(0, -1).toString("ascii").split("\0");
					}
					const cells = [
						"phandle",
						"linux,phandle",
						"#address-cells",
						"#size-cells",
						"interrupt-parent",
						"remote-endpoint",
						"msi-parent"
					].includes(name) && length === 4 ? [u32(cursor)] : null;
					const property = {
						name,
						offset: cursor,
						bytes: length,
						hex: raw.subarray(0, 256).toString("hex"),
						truncated: length > 256,
						derived: {
							confidence: "derived",
							strings,
							cells,
							reg: null
						}
					};
					owner.node.properties.push(property);
					propertyMap?.set(name, property);
					cursor = next;
				} else if (token === 9) {
					if (stack.length || nodes.length === 0) malformed("Premature FDT_END");
					if (header.size_dt_struct !== null && cursor !== structEnd) malformed("FDT_END does not terminate the declared structure block");
					finished = true;
					break;
				} else if (token !== 4) malformed(`Unknown FDT token ${token}`);
			}
			if (!finished) malformed("Missing FDT_END");
			const byPath = new Map(nodes.map((n) => [n.path, n]));
			const prop = (path, name) => propertiesByPath.get(path)?.get(name);
			const singleString = (path, name) => {
				const s = prop(path, name)?.derived.strings;
				return s?.length === 1 ? s[0] ?? null : null;
			};
			const handles = new Map();
			const structureLimitations = firstNonzeroPadding === undefined ? [] : [`FDT structure padding contains ${String(nonzeroPaddingBytes)} nonzero ${nonzeroPaddingBytes === 1 ? "byte" : "bytes"}. The first is at file offset ${String(firstNonzeroPadding)}.`];
			const limitations = [
				...structureLimitations,
				"Raw property previews are limited to 256 bytes; offsets and lengths identify complete values in the hashed artifact.",
				"Phandle references cover only single-cell interrupt-parent, remote-endpoint and msi-parent; binding-specific arrays and overlays are not resolved."
			];
			for (const node of nodes) {
				const canonical = prop(node.path, "phandle");
				const legacy = prop(node.path, "linux,phandle");
				const malformedCanonical = canonical !== undefined && canonical.derived.cells === null;
				const declared = [canonical, legacy].flatMap((property) => {
					const handle = property?.derived.cells?.[0];
					return handle === undefined ? [] : [handle];
				});
				if (malformedCanonical) {
					admit(node.path.length * 2 + 256);
					limitations.push(`phandle at ${node.path} is not a single cell; this node's reference identity remains unresolved.`);
				}
				const conflict = declared.length === 2 && declared[0] !== declared[1];
				if (conflict) {
					admit(node.path.length * 2 + 256);
					limitations.push(`phandle at ${node.path} conflicts with linux,phandle (0x${declared[0]?.toString(16)} vs 0x${declared[1]?.toString(16)}); references to either value are unresolved.`);
				}
				const unambiguous = !malformedCanonical && !conflict;
				for (const handle of declared) if (handle !== 0 && handle !== 4294967295) {
					const existing = handles.get(handle);
					handles.set(handle, unambiguous && (existing === undefined || existing === node.path) ? node.path : null);
				}
				const reg = prop(node.path, "reg");
				if (!reg || node.parent === null) continue;
				const count = (name, fallback) => {
					const p = prop(node.parent ?? "", name);
					return p === undefined ? fallback : p.derived.cells?.[0];
				};
				const addresses = count("#address-cells", 2), sizes = count("#size-cells", 1);
				if (addresses === undefined || sizes === undefined || addresses > 4 || sizes > 4 || addresses + sizes === 0 || reg.bytes % ((addresses + sizes) * 4)) {
					admit(node.path.length * 2 + 256);
					limitations.push(`reg at ${node.path} was not decoded: unsupported or malformed parent cell sizes or tuple length.`);
					continue;
				}
				const readCells = (start, n) => {
					if (n === 0) return null;
					let value = 0n;
					for (let i = 0; i < n; i++) value = value << 32n | BigInt(u32(start + i * 4));
					return hex(value);
				};
				admit(reg.bytes / ((addresses + sizes) * 4) * 160);
				reg.derived.reg = [];
				for (let p = reg.offset; p < reg.offset + reg.bytes; p += (addresses + sizes) * 4) reg.derived.reg.push({
					address: readCells(p, addresses),
					size: readCells(p + addresses * 4, sizes)
				});
			}
			const references = [];
			for (const node of nodes) for (const property of node.properties) {
				const phandle = property.derived.cells?.[0];
				if ([
					"interrupt-parent",
					"remote-endpoint",
					"msi-parent"
				].includes(property.name) && phandle !== undefined) {
					const target = handles.get(phandle) ?? null;
					admit(256 + (node.path.length + property.name.length + (target?.length ?? 0)) * 2);
					references.push({
						source: node.path,
						property: property.name,
						phandle,
						target,
						confidence: "derived"
					});
				}
			}
			const report = {
				artifact,
				header,
				reservations,
				nodes,
				references,
				summary: {
					confidence: "derived",
					compatible: prop("/", "compatible")?.derived.strings ?? null,
					model: singleString("/", "model"),
					bootargs: singleString("/chosen", "bootargs"),
					stdout_path: singleString("/chosen", "stdout-path"),
					aliases: (byPath.get("/aliases")?.properties ?? []).map((p) => ({
						name: p.name,
						path: singleString("/aliases", p.name)
					}))
				},
				coverage: {
					status: "complete",
					examined_nodes: nodes.length,
					examined_properties: properties
				},
				limitations
			};
			return {
				report,
				structureLimitations
			};
		};
	})))();
}

//#endregion
export { DEVICETREE_FORMAT, hasPeResourceName, init_devicetreeParser, init_peImageHeaders, init_peResourceInventory, init_peResourceLayout, locatePeResourcePayloads, parseDevicetree, parsePeResources, peResourceLimitBoundary, readPeImageHeaders, readPeResourceLayout };