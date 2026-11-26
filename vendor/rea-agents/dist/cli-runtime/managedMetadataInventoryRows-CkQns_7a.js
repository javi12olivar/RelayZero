import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { decodeStrictUtf8, init_internalInvariant, init_strictUtf8, invariantViolation } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { init_jsonStringByteLength, jsonStringByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { ManagedHeapAmbiguityFailure, ManagedReaderFailure, init_managedReaderFailure, managedFailure, readManagedValue } from "./managedInspectionEvidence-Cw9u32rc.js";
import { DEFAULT_MANAGED_REPRESENTATION_BYTES, init_managedInspectionLimits, managedRepresentationLimit } from "./managedInspectionLimits-BiqjZJWO.js";
import { isUtf8 } from "node:buffer";
import { createHash } from "node:crypto";

//#region dist/domain/managed/managedDecodeBudget.js
var ManagedRepresentationFailure, ManagedDecodeBudget, budgets, attachManagedDecodeBudget, managedDecodeBudget, jsonBytes, admitManagedProjection;
function init_managedDecodeBudget() {
	return (init_managedDecodeBudget = __esmMin((() => {
		init_budget();
		init_internalInvariant();
		init_jsonStringByteLength();
		init_managedReaderFailure();
		init_managedInspectionLimits();
		ManagedRepresentationFailure = class extends ManagedReaderFailure {
			constructor(offset, maximumBytes) {
				super({
					code: "resource-limit",
					scope: "metadata.representation",
					detail: `Managed metadata exceeds max_metadata_representation_bytes=${String(maximumBytes)} bytes. Increase max_metadata_representation_bytes on the next inspection (the issue's limit records the control), or select fewer type_names for member inspection. No REA restart is required; snapshot, transport and host memory limits are independent.`,
					offset,
					limit: managedRepresentationLimit(maximumBytes)
				});
			}
		};
		ManagedDecodeBudget = class {
			maximumBytes;
			#bytes;
			/** Part of the charge that `releaseTransient` refunds. */
			#transient = 0;
			#rows = new Map();
			#strings = new Map();
			#digests = new WeakMap();
			#prepaid = new WeakSet();
			constructor(maximumBytes = DEFAULT_MANAGED_REPRESENTATION_BYTES) {
				this.maximumBytes = maximumBytes;
				if (!Number.isSafeInteger(maximumBytes) || maximumBytes < 1) throw invariantViolation("max_metadata_representation_bytes must be a positive safe integer");
				this.#bytes = new Budget(maximumBytes);
			}
			reserve(bytes, offset) {
				this.#bytes.charge(bytes, () => new ManagedRepresentationFailure(offset, this.maximumBytes));
			}
			/** Retain one bookkeeping reservation per physical row, independently of lookup replay. */
			reserveRow(table, row, offset) {
				let rows = this.#rows.get(table);
				if (rows?.has(row) === true) return;
				this.reserve(256, offset);
				if (rows === undefined) {
					rows = new Set();
					this.#rows.set(table, rows);
				}
				rows.add(row);
			}
			/** Bound a decoding allocation that stays live until `releaseTransient`; only retained output is reserved. */
			admitTransient(bytes, offset) {
				this.reserve(bytes, offset);
				this.#transient += bytes;
			}
			/** End the current item's decoding; its bookkeeping is unreachable and only reserved output remains. */
			releaseTransient() {
				this.#bytes.refund(this.#transient);
				this.#transient = 0;
			}
			/** UTF-8 cannot decode to more UTF-16 units than bytes; JSON uses at most six bytes per unit. */
			reserveString(encodedBytes, offset) {
				this.reserve(encodedBytes * 6 + 2, offset);
			}
			/** Snapshot buffers are immutable within a layout; cache exact backing-buffer ranges. */
			digest(bytes, algorithm) {
				let ranges = this.#digests.get(bytes.buffer);
				if (ranges === undefined) {
					ranges = new Map();
					this.#digests.set(bytes.buffer, ranges);
				}
				const key = `${algorithm}:${String(bytes.byteOffset)}:${String(bytes.byteLength)}`;
				const cached = ranges.get(key);
				if (cached !== undefined) return cached;
				this.reserve(256, null);
				const digest = createHash(algorithm).update(bytes).digest("hex");
				ranges.set(key, digest);
				return digest;
			}
			/** Record an admitted projection; its next serialized occurrence is already charged. */
			prepay(value) {
				this.#prepaid.add(value);
			}
			/** Spend an admitted projection's charge once; repeated occurrences pay again. */
			consumePrepaid(value) {
				return this.#prepaid.delete(value);
			}
			cachedString(index) {
				return this.#strings.get(index);
			}
			cacheString(index, value) {
				this.#strings.set(index, value);
			}
		};
		budgets = new WeakMap();
		attachManagedDecodeBudget = (layout, budget) => {
			budgets.set(layout, budget);
		};
		managedDecodeBudget = (layout) => {
			let budget = budgets.get(layout);
			if (budget === undefined) {
				budget = new ManagedDecodeBudget();
				budgets.set(layout, budget);
			}
			return budget;
		};
		jsonBytes = (item) => typeof item === "string" ? jsonStringByteLength(item) : Buffer.byteLength(JSON.stringify(item) ?? "null");
		admitManagedProjection = (value, budget = new ManagedDecodeBudget()) => {
			const visit = (item) => {
				if (item !== null && typeof item === "object" && budget.consumePrepaid(item)) return;
				if (Array.isArray(item)) {
					budget.reserve(item.length + 2, null);
					for (const child of item) visit(child);
				} else if (item !== null && typeof item === "object") {
					budget.reserve(2, null);
					for (const key of Object.keys(item)) {
						budget.reserve(jsonBytes(key) + 2, null);
						visit(Reflect.get(item, key));
					}
				} else {
					budget.reserve(jsonBytes(item), null);
				}
			};
			visit(value);
			if (value !== null && typeof value === "object") budget.prepay(value);
			return value;
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedMetadataRowSizes.js
var ROW_SIZE_FACTORIES, computeRowSize;
function init_managedMetadataRowSizes() {
	return (init_managedMetadataRowSizes = __esmMin((() => {
		init_managedReaderFailure();
		ROW_SIZE_FACTORIES = [
			({ stringSize: s, guidSize: g }) => 2 + s + g * 3,
			({ codedSize: c, stringSize: s }) => c("ResolutionScope") + s * 2,
			({ tableSize: t, codedSize: c, stringSize: s }) => 4 + s * 2 + c("TypeDefOrRef") + Math.max(t(3), t(4)) + Math.max(t(5), t(6)),
			({ tableSize: t }) => t(4),
			({ stringSize: s, blobSize: b }) => 2 + s + b,
			({ tableSize: t }) => t(6),
			({ tableSize: t, stringSize: s, blobSize: b }) => 8 + s + b + Math.max(t(7), t(8)),
			({ tableSize: t }) => t(8),
			({ stringSize: s }) => 4 + s,
			({ tableSize: t, codedSize: c }) => t(2) + c("TypeDefOrRef"),
			({ codedSize: c, stringSize: s, blobSize: b }) => c("MemberRefParent") + s + b,
			({ codedSize: c, blobSize: b }) => 2 + c("HasConstant") + b,
			({ codedSize: c, blobSize: b }) => c("HasCustomAttribute") + c("CustomAttributeType") + b,
			({ codedSize: c, blobSize: b }) => c("HasFieldMarshal") + b,
			({ codedSize: c, blobSize: b }) => 2 + c("HasDeclSecurity") + b,
			({ tableSize: t }) => 6 + t(2),
			({ tableSize: t }) => 4 + t(4),
			({ blobSize: b }) => b,
			({ tableSize: t }) => t(2) + Math.max(t(19), t(20)),
			({ tableSize: t }) => t(20),
			({ stringSize: s, codedSize: c }) => 2 + s + c("TypeDefOrRef"),
			({ tableSize: t }) => t(2) + Math.max(t(22), t(23)),
			({ tableSize: t }) => t(23),
			({ stringSize: s, blobSize: b }) => 2 + s + b,
			({ tableSize: t, codedSize: c }) => 2 + t(6) + c("HasSemantics"),
			({ tableSize: t, codedSize: c }) => t(2) + c("MethodDefOrRef") * 2,
			({ stringSize: s }) => s,
			({ blobSize: b }) => b,
			({ tableSize: t, codedSize: c, stringSize: s }) => 2 + c("MemberForwarded") + s + t(26),
			({ tableSize: t }) => 4 + t(4),
			() => 8,
			() => 4,
			({ blobSize: b, stringSize: s }) => 16 + b + s * 2,
			() => 4,
			() => 12,
			({ blobSize: b, stringSize: s }) => 12 + b * 2 + s * 2,
			({ tableSize: t }) => 4 + t(35),
			({ tableSize: t }) => 12 + t(35),
			({ stringSize: s, blobSize: b }) => 4 + s + b,
			({ stringSize: s, codedSize: c }) => 8 + s * 2 + c("Implementation"),
			({ stringSize: s, codedSize: c }) => 8 + s + c("Implementation"),
			({ tableSize: t }) => t(2) * 2,
			({ stringSize: s, codedSize: c }) => 4 + c("TypeOrMethodDef") + s,
			({ codedSize: c, blobSize: b }) => c("MethodDefOrRef") + b,
			({ tableSize: t, codedSize: c }) => t(42) + c("TypeDefOrRef")
		];
		computeRowSize = (table, context) => {
			const factory = ROW_SIZE_FACTORIES[table];
			if (factory === undefined) throw managedFailure("invalid-tables", "metadata.tables", `Metadata table ${String(table)} is unsupported`);
			return factory(context);
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedMetadataLayout.js
var METADATA_TABLE_NAMES, MANAGED_CODED_INDEXES, SUPPORTED_TABLE_MASK, requireRange, align4, readStreamName, codedSize, tableSize, readMetadataStreams, describeStreamCoordinates, resolveHeap, selectTableStream, readTablesHeader, readRowCounts, buildRowSizeContext, buildMetadataTables, readManagedMetadataLayout, metadataRowOffset;
function init_managedMetadataLayout() {
	return (init_managedMetadataLayout = __esmMin((() => {
		init_binaryContainer();
		init_managedDecodeBudget();
		init_managedReaderFailure();
		init_managedMetadataRowSizes();
		METADATA_TABLE_NAMES = [
			"Module",
			"TypeRef",
			"TypeDef",
			"FieldPtr",
			"Field",
			"MethodPtr",
			"MethodDef",
			"ParamPtr",
			"Param",
			"InterfaceImpl",
			"MemberRef",
			"Constant",
			"CustomAttribute",
			"FieldMarshal",
			"DeclSecurity",
			"ClassLayout",
			"FieldLayout",
			"StandAloneSig",
			"EventMap",
			"EventPtr",
			"Event",
			"PropertyMap",
			"PropertyPtr",
			"Property",
			"MethodSemantics",
			"MethodImpl",
			"ModuleRef",
			"TypeSpec",
			"ImplMap",
			"FieldRVA",
			"ENCLog",
			"ENCMap",
			"Assembly",
			"AssemblyProcessor",
			"AssemblyOS",
			"AssemblyRef",
			"AssemblyRefProcessor",
			"AssemblyRefOS",
			"File",
			"ExportedType",
			"ManifestResource",
			"NestedClass",
			"GenericParam",
			"MethodSpec",
			"GenericParamConstraint"
		];
		MANAGED_CODED_INDEXES = {
			TypeDefOrRef: {
				bits: 2,
				tables: [
					2,
					1,
					27
				]
			},
			HasConstant: {
				bits: 2,
				tables: [
					4,
					8,
					23
				]
			},
			HasCustomAttribute: {
				bits: 5,
				tables: [
					6,
					4,
					1,
					2,
					8,
					9,
					10,
					0,
					14,
					23,
					20,
					17,
					26,
					27,
					32,
					35,
					38,
					39,
					40,
					42,
					44,
					43
				]
			},
			HasFieldMarshal: {
				bits: 1,
				tables: [4, 8]
			},
			HasDeclSecurity: {
				bits: 2,
				tables: [
					2,
					6,
					32
				]
			},
			MemberRefParent: {
				bits: 3,
				tables: [
					2,
					1,
					26,
					6,
					27
				]
			},
			HasSemantics: {
				bits: 1,
				tables: [20, 23]
			},
			MethodDefOrRef: {
				bits: 1,
				tables: [6, 10]
			},
			MemberForwarded: {
				bits: 1,
				tables: [4, 6]
			},
			Implementation: {
				bits: 2,
				tables: [
					38,
					35,
					39
				]
			},
			CustomAttributeType: {
				bits: 3,
				tables: [
					undefined,
					undefined,
					6,
					10
				]
			},
			ResolutionScope: {
				bits: 2,
				tables: [
					0,
					26,
					35,
					1
				]
			},
			TypeOrMethodDef: {
				bits: 1,
				tables: [2, 6]
			}
		};
		SUPPORTED_TABLE_MASK = (1n << BigInt(METADATA_TABLE_NAMES.length)) - 1n;
		requireRange = (bytes, base, offset, length, scope) => {
			if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || offset < 0 || length < 0 || offset > bytes.length - length) throw managedFailure("invalid-metadata-root", scope, `${scope} leaves the metadata byte range`, Number.isSafeInteger(base + offset) && offset >= 0 ? base + offset : null);
		};
		align4 = (value) => Math.ceil(value / 4) * 4;
		readStreamName = (bytes, rootOffset, offset) => {
			const endLimit = Math.min(bytes.length, offset + 32);
			let end = offset;
			while (end < endLimit && bytes[end] !== 0) end += 1;
			if (end === endLimit) throw managedFailure("invalid-stream", "metadata.stream-name", "Metadata stream name is missing a bounded terminator", rootOffset + offset);
			const nameBytes = bytes.subarray(offset, end);
			if (nameBytes.some((byte) => byte < 32 || byte > 126)) throw managedFailure("invalid-stream", "metadata.stream-name", "Metadata stream name is not printable ASCII", rootOffset + offset);
			return {
				name: nameBytes.toString("ascii"),
				next: align4(end + 1)
			};
		};
		codedSize = (name, rowCounts) => {
			const descriptor = MANAGED_CODED_INDEXES[name];
			let maximum = 0;
			for (const table of descriptor.tables) {
				if (table === undefined) continue;
				maximum = Math.max(maximum, rowCounts[table] ?? 0);
			}
			return maximum < 2 ** (16 - descriptor.bits) ? 2 : 4;
		};
		tableSize = (index, rows) => (rows[index] ?? 0) < 65536 ? 2 : 4;
		readMetadataStreams = (bytes, rootOffset, budget) => {
			const reader = new BinaryReader(bytes, true, "managed");
			if (reader.u32(0) !== 1112167234) throw managedFailure("invalid-metadata-root", "metadata.signature", "CLI metadata signature is not BSJB", rootOffset);
			const versionLength = reader.u32(12);
			requireRange(bytes, rootOffset, 16, versionLength, "metadata.version");
			const versionBytes = bytes.subarray(16, 16 + versionLength);
			const zero = versionBytes.indexOf(0);
			const decodedVersionLength = zero < 0 ? versionBytes.length : zero;
			budget.reserveString(decodedVersionLength, rootOffset + 16);
			const versionText = versionBytes.subarray(0, decodedVersionLength);
			if (!isUtf8(versionText)) throw managedFailure("invalid-metadata-root", "metadata.version", "Metadata version is not valid UTF-8", rootOffset + 16);
			const version = versionText.toString("utf8");
			let cursor = align4(16 + versionLength);
			requireRange(bytes, rootOffset, cursor, 4, "metadata.stream-count");
			const streamCount = reader.u16(cursor + 2);
			if (streamCount === 0 || streamCount > 64) throw managedFailure("invalid-stream", "metadata.stream-count", "Metadata stream count is outside the admitted range", rootOffset + cursor + 2);
			cursor += 4;
			const streams = new Map();
			const streamNames = new Set();
			const heapDeclarations = {
				"#GUID": [],
				"#US": [],
				"#Blob": [],
				"#Strings": []
			};
			for (let index = 0; index < streamCount; index += 1) {
				requireRange(bytes, rootOffset, cursor, 8, "metadata.stream-header");
				const headerOffset = rootOffset + cursor;
				const relativeOffset = reader.u32(cursor);
				const streamSize = reader.u32(cursor + 4);
				const named = readStreamName(bytes, rootOffset, cursor + 8);
				const trackedHeap = named.name === "#GUID" || named.name === "#US" || named.name === "#Blob" || named.name === "#Strings" ? named.name : null;
				if (trackedHeap === null && streamNames.has(named.name)) throw managedFailure("invalid-stream", "metadata.stream-header", `Duplicate metadata stream ${named.name}`, headerOffset);
				requireRange(bytes, rootOffset, relativeOffset, streamSize, `metadata.${named.name}`);
				const stream = {
					name: named.name,
					offset: rootOffset + relativeOffset,
					size: streamSize,
					headerOffset
				};
				streamNames.add(named.name);
				if (trackedHeap !== null) {
					heapDeclarations[trackedHeap].push(stream);
				} else {
					streams.set(named.name, stream);
				}
				cursor = named.next;
			}
			return {
				streams,
				streamNames: [...streamNames],
				heapDeclarations,
				version
			};
		};
		describeStreamCoordinates = ({ headerOffset, offset, size }) => `header ${headerOffset} (offset ${offset}, size ${size})`;
		resolveHeap = (name, declarations) => {
			const [first, second] = declarations;
			if (first === undefined) return null;
			if (second === undefined) return {
				kind: "available",
				stream: first,
				issue: null
			};
			const sameRange = declarations.every(({ offset, size }) => offset === first.offset && size === first.size);
			const coordinates = declarations.map(describeStreamCoordinates).join(", ");
			const conflict = {
				"#GUID": "Nonzero GUID indices are unresolved.",
				"#US": "User-string literals are unresolved.",
				"#Blob": "Nonzero blob indices are unresolved.",
				"#Strings": "Nonzero string indices are unresolved."
			}[name];
			const issue = {
				code: "invalid-stream",
				scope: `metadata.${name}`,
				offset: second.headerOffset,
				detail: sameRange ? `Duplicate ${name} declarations describe the same byte range (${coordinates}).` : `Duplicate ${name} declarations describe distinct byte ranges (${coordinates}). ${conflict}`
			};
			return sameRange ? {
				kind: "available",
				stream: first,
				issue
			} : {
				kind: "ambiguous",
				issue
			};
		};
		selectTableStream = ({ streams, streamNames, version }) => {
			const compressed = streams.get("#~");
			const uncompressed = streams.get("#-");
			if (compressed !== undefined && uncompressed !== undefined) throw new ManagedReaderFailure({
				code: "unsupported-metadata",
				scope: "metadata.tables",
				detail: `Conflicting table stream declarations: #~ at ${describeStreamCoordinates(compressed)} and #- at ${describeStreamCoordinates(uncompressed)}. Metadata row layout is unknown.`,
				offset: Math.max(compressed.headerOffset, uncompressed.headerOffset)
			}, { metadataHeader: {
				version,
				streamNames
			} });
			const stream = compressed ?? uncompressed;
			if (stream === undefined) throw managedFailure("missing-stream", "metadata.tables", "Required metadata table stream #~ or #- is absent");
			return stream;
		};
		readTablesHeader = (bytes, tablesStream) => {
			const tableBytes = bytes.subarray(tablesStream.offset, tablesStream.offset + tablesStream.size);
			requireRange(tableBytes, tablesStream.offset, 0, 24, "metadata.tables-header");
			const heapSizes = tableBytes[6] ?? 0;
			const heaps = {
				string: (heapSizes & 1) === 0 ? 2 : 4,
				guid: (heapSizes & 2) === 0 ? 2 : 4,
				blob: (heapSizes & 4) === 0 ? 2 : 4
			};
			const valid = new BinaryReader(tableBytes, true, "managed").word(8, 64);
			if ((valid & ~SUPPORTED_TABLE_MASK) !== 0n) throw managedFailure("invalid-tables", "metadata.valid-mask", "Metadata valid mask names unsupported tables outside the admitted ECMA-335 range", tablesStream.offset + 8);
			return {
				tableBytes,
				tablesOffset: tablesStream.offset,
				heaps,
				valid
			};
		};
		readRowCounts = (tableBytes, tablesOffset, valid) => {
			const reader = new BinaryReader(tableBytes, true, "managed");
			const rowCounts = Array(METADATA_TABLE_NAMES.length).fill(0);
			let tableCursor = 24;
			for (let index = 0; index < METADATA_TABLE_NAMES.length; index += 1) {
				if ((valid & 1n << BigInt(index)) === 0n) continue;
				requireRange(tableBytes, tablesOffset, tableCursor, 4, "metadata.table-row-count");
				const count = reader.u32(tableCursor);
				rowCounts[index] = count;
				tableCursor += 4;
			}
			return rowCounts;
		};
		buildRowSizeContext = (rowCounts, heaps) => ({
			tableSize: (index) => tableSize(index, rowCounts),
			codedSize: (name) => codedSize(name, rowCounts),
			stringSize: heaps.string,
			guidSize: heaps.guid,
			blobSize: heaps.blob
		});
		buildMetadataTables = ({ tableBytes, rowCounts, heaps, valid, tablesOffset }) => {
			const tables = new Map();
			const context = buildRowSizeContext(rowCounts, heaps);
			let tableCursor = 24;
			for (let index = 0; index < METADATA_TABLE_NAMES.length; index += 1) {
				if ((valid & 1n << BigInt(index)) === 0n) continue;
				tableCursor += 4;
			}
			if (((tableBytes[6] ?? 0) & 64) !== 0) {
				if (tableCursor > tableBytes.length - 4) throw managedFailure("invalid-metadata-root", "metadata.tables-extra-data", "Metadata tables extra-data word is truncated", tablesOffset + tableCursor);
				tableCursor += 4;
			}
			for (let index = 0; index < METADATA_TABLE_NAMES.length; index += 1) {
				const count = rowCounts[index] ?? 0;
				if ((valid & 1n << BigInt(index)) === 0n) continue;
				const sizeOfRow = computeRowSize(index, context);
				const byteLength = count * sizeOfRow;
				if (!Number.isSafeInteger(byteLength)) throw managedFailure("invalid-tables", "metadata.tables", "Metadata table byte size overflowed", tablesOffset + tableCursor);
				requireRange(tableBytes, tablesOffset, tableCursor, byteLength, "metadata.table-data");
				tables.set(index, {
					index,
					name: METADATA_TABLE_NAMES[index] ?? `Table${String(index)}`,
					rowCount: count,
					rowSize: sizeOfRow,
					offset: tablesOffset + tableCursor
				});
				tableCursor += byteLength;
			}
			return tables;
		};
		readManagedMetadataLayout = (artifact, rootOffset, size, maxRepresentationBytes) => {
			if (size < 20 || rootOffset < 0 || rootOffset > artifact.length - size) throw managedFailure("invalid-metadata-root", "metadata.root", "CLI metadata directory leaves the artifact byte range", rootOffset);
			const bytes = artifact.subarray(rootOffset, rootOffset + size);
			const budget = new ManagedDecodeBudget(maxRepresentationBytes);
			const parsed = readMetadataStreams(bytes, rootOffset, budget);
			const { streams, streamNames, heapDeclarations, version } = parsed;
			const minimalDelta = streams.get("#JTD");
			if (minimalDelta !== undefined) throw new ManagedReaderFailure({
				code: "unsupported-metadata",
				scope: "metadata.#JTD",
				detail: "Minimal Edit-and-Continue metadata (#JTD) requires its baseline and prior generations; standalone metadata identities and inventories are unknown.",
				offset: minimalDelta.headerOffset
			}, { metadataHeader: {
				version,
				streamNames
			} });
			const { tableBytes, tablesOffset, heaps, valid } = readTablesHeader(artifact, selectTableStream(parsed));
			const rowCounts = readRowCounts(tableBytes, tablesOffset, valid);
			const tables = buildMetadataTables({
				tableBytes,
				rowCounts,
				heaps,
				valid,
				tablesOffset
			});
			const strings = resolveHeap("#Strings", heapDeclarations["#Strings"]);
			if (strings === null) throw managedFailure("missing-stream", "metadata.#Strings", "Required metadata stream #Strings is absent");
			const guid = resolveHeap("#GUID", heapDeclarations["#GUID"]);
			if (guid === null) throw managedFailure("missing-stream", "metadata.#GUID", "Required metadata stream #GUID is absent");
			const layout = {
				rootOffset,
				size,
				version,
				streamNames: [...streamNames].sort(),
				strings,
				guid,
				blob: resolveHeap("#Blob", heapDeclarations["#Blob"]),
				userStrings: resolveHeap("#US", heapDeclarations["#US"]),
				tables,
				rowCounts,
				stringIndexSize: heaps.string,
				guidIndexSize: heaps.guid,
				blobIndexSize: heaps.blob,
				table: (index) => tables.get(index),
				tableIndexSize: (index) => tableSize(index, rowCounts),
				codedIndexSize: (name) => codedSize(name, rowCounts)
			};
			attachManagedDecodeBudget(layout, budget);
			return layout;
		};
		metadataRowOffset = (layout, table, row) => {
			const descriptor = layout.table(table);
			if (descriptor === undefined || row < 1 || row > descriptor.rowCount) throw managedFailure("invalid-row", `metadata.${METADATA_TABLE_NAMES[table] ?? String(table)}`, `Metadata row ${String(row)} is outside its table`);
			return descriptor.offset + (row - 1) * descriptor.rowSize;
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedCliHeaderPrefix.js
var readManagedCliHeaderPrefix;
function init_managedCliHeaderPrefix() {
	return (init_managedCliHeaderPrefix = __esmMin((() => {
		init_binaryContainer();
		init_result();
		readManagedCliHeaderPrefix = (bytes) => {
			if (bytes.length < 16) return err({
				kind: "malformed",
				message: "CLI runtime header prefix is truncated"
			});
			const reader = new BinaryReader(bytes, true, "managed-pe");
			return ok({
				headerSize: reader.u32(0),
				runtimeMajor: reader.u16(4),
				runtimeMinor: reader.u16(6),
				metadata: {
					rva: reader.u32(8),
					size: reader.u32(12)
				}
			});
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedMetadataHeaps.js
var MetadataRowCursor, readManagedCompressedUnsigned, PREFIXED_ITEMS, compressedLength, readMetadataString, readRequiredMetadataName, metadataBlobOffset, readMetadataBlob, readMetadataUserString, readMetadataGuid, metadataToken, metadataTokenFact, metadataRowCursor, metadataCodedIndexCoordinate, decodeMetadataCodedIndex;
function init_managedMetadataHeaps() {
	return (init_managedMetadataHeaps = __esmMin((() => {
		init_binaryContainer();
		init_strictUtf8();
		init_result();
		init_managedDecodeBudget();
		init_managedMetadataLayout();
		init_managedReaderFailure();
		MetadataRowCursor = class {
			start;
			scope;
			#offset;
			#reader;
			#end;
			constructor(bytes, start, end, scope) {
				this.start = start;
				this.scope = scope;
				this.#reader = new BinaryReader(bytes, true, "managed");
				this.#offset = start;
				this.#end = Math.min(end, bytes.length);
			}
			get offset() {
				return this.#offset;
			}
			u16() {
				this.require(2);
				const value = this.#reader.u16(this.#offset);
				this.#offset += 2;
				return value;
			}
			u32() {
				this.require(4);
				const value = this.#reader.u32(this.#offset);
				this.#offset += 4;
				return value;
			}
			readIndex(size) {
				return size === 2 ? this.u16() : this.u32();
			}
			require(length) {
				const offset = this.#offset;
				if (!Number.isSafeInteger(offset) || offset < 0 || offset > this.#end - length) throw managedFailure("invalid-row", this.scope, `${this.scope} row ended before all declared columns`, offset);
			}
		};
		readManagedCompressedUnsigned = (bytes, offset) => {
			const first = bytes[offset];
			if (first === undefined) return err({
				kind: "truncated",
				width: 1
			});
			if ((first & 128) === 0) return ok({
				value: first,
				width: 1,
				minimal: true
			});
			const width = (first & 192) === 128 ? 2 : (first & 224) === 192 ? 4 : null;
			if (width === null) return err({ kind: "reserved" });
			if (offset > bytes.length - width) return err({
				kind: "truncated",
				width
			});
			const value = width === 2 ? (first & 63) << 8 | (bytes[offset + 1] ?? 0) : (first & 31) * 16777216 + (bytes[offset + 1] ?? 0) * 65536 + (bytes[offset + 2] ?? 0) * 256 + (bytes[offset + 3] ?? 0);
			return ok({
				value,
				width,
				minimal: value >= (width === 2 ? 128 : 16384)
			});
		};
		PREFIXED_ITEMS = {
			blob: {
				code: "invalid-blob",
				label: "Metadata blob",
				range: "the #Blob byte range"
			},
			userString: {
				code: "invalid-string",
				label: "User string",
				range: "the artifact byte range"
			}
		};
		compressedLength = (bytes, offset, scope, item) => {
			const { code, label, range } = PREFIXED_ITEMS[item];
			const decoded = readManagedCompressedUnsigned(bytes, offset);
			if (!decoded.ok) throw managedFailure(code, scope, decoded.error.kind === "truncated" ? `${label} length prefix leaves ${range}` : `${label} uses a reserved compressed-length prefix`, offset >= 0 ? offset : null);
			return {
				length: decoded.value.value,
				prefix: decoded.value.width,
				minimal: decoded.value.minimal
			};
		};
		readMetadataString = (bytes, layout, index) => {
			if (index === 0) return "";
			const declaration = layout.strings;
			if (declaration.kind === "ambiguous") throw new ManagedHeapAmbiguityFailure(declaration.issue);
			const heap = declaration.stream;
			if (index < 0 || index >= heap.size) throw managedFailure("invalid-heap-index", "metadata.#Strings", "String heap index is outside #Strings", heap.offset + Math.max(index, 0));
			const start = heap.offset + index;
			const cached = managedDecodeBudget(layout).cachedString(index);
			if (cached !== undefined) return cached;
			const maximum = heap.offset + heap.size;
			let end = start;
			while (end < maximum && bytes[end] !== 0) end += 1;
			if (end === maximum) throw managedFailure("invalid-string", "metadata.#Strings", "String heap item has no terminator within #Strings", start);
			managedDecodeBudget(layout).reserveString(end - start, start);
			try {
				const value = decodeStrictUtf8(bytes.subarray(start, end), "preserve");
				managedDecodeBudget(layout).cacheString(index, value);
				return value;
			} catch (cause) {
				void cause;
				throw managedFailure("invalid-string", "metadata.#Strings", "String heap item is not valid UTF-8", start);
			}
		};
		readRequiredMetadataName = (bytes, layout, table, token, { nameIndex, nameOffset }) => {
			const name = readMetadataString(bytes, layout, nameIndex);
			if (name.length === 0) throw managedFailure("invalid-row", `metadata.${table}:${token}`, `${table} Name index ${String(nameIndex)} must reference a nonempty string`, nameOffset);
			return name;
		};
		metadataBlobOffset = (layout) => layout.blob?.kind === "available" ? layout.blob.stream.offset : layout.rootOffset;
		readMetadataBlob = (bytes, layout, index) => {
			if (index === 0) return Buffer.alloc(0);
			if (index < 0) throw managedFailure("invalid-heap-index", "metadata.#Blob", "Blob heap index is negative", null);
			const declaration = layout.blob;
			if (declaration === null) throw managedFailure("missing-stream", "metadata.#Blob", `Blob index ${String(index)} references an absent #Blob stream`, null);
			if (declaration.kind === "ambiguous") throw new ManagedHeapAmbiguityFailure(declaration.issue);
			const heap = declaration.stream;
			if (index >= heap.size) throw managedFailure("invalid-heap-index", "metadata.#Blob", "Blob heap index is outside #Blob", heap.offset + Math.max(index, 0));
			const start = heap.offset + index;
			const heapEnd = heap.offset + heap.size;
			const decoded = compressedLength(bytes.subarray(0, heapEnd), start, "metadata.#Blob", "blob");
			const content = start + decoded.prefix;
			if (content > heapEnd - decoded.length) throw managedFailure("invalid-blob", "metadata.#Blob", "Blob heap item leaves #Blob", start);
			return bytes.subarray(content, content + decoded.length);
		};
		readMetadataUserString = (bytes, layout, reference) => {
			const { token, row: index } = reference;
			const declaration = layout.userStrings;
			const scope = `metadata.#US:${token}`;
			if (declaration === null) throw managedFailure("missing-stream", scope, "ldstr references #US, but the metadata has no #US stream");
			if (declaration.kind === "ambiguous") throw new ManagedReaderFailure(declaration.issue);
			const heap = declaration.stream;
			if (index >= heap.size) throw managedFailure("invalid-heap-index", scope, "ldstr operand does not name an item inside #US", heap.offset + index);
			const start = heap.offset + index;
			const decoded = compressedLength(bytes, start, scope, "userString");
			const content = start + decoded.prefix;
			if (content > heap.offset + heap.size - decoded.length) throw managedFailure("invalid-string", scope, "User string leaves #US", start);
			const budget = managedDecodeBudget(layout);
			const conformance = () => {
				if (decoded.minimal) return [];
				budget.reserve(512, start);
				return [{
					code: "invalid-string",
					scope,
					offset: start,
					detail: `User string length ${String(decoded.length)} uses a ${String(decoded.prefix)}-byte prefix wider than ECMA-335 II.23.2 assigns; readable UTF-16 is preserved and runtime acceptance is not assessed`
				}];
			};
			if (index === 0) {
				if (decoded.length === 0) return {
					offset: start,
					value: "",
					issues: conformance()
				};
				throw managedFailure("invalid-string", scope, `#US offset 0 is the reserved empty entry, but it encodes ${String(decoded.length)} byte(s)`, start);
			}
			if (decoded.length % 2 !== 1) throw managedFailure("invalid-string", scope, "User string length is not UTF-16 code units plus one terminal flag byte", start);
			const units = (decoded.length - 1) / 2;
			budget.reserveString(units, start);
			const reader = new BinaryReader(bytes, true, "managed");
			let expectedFlag = 0;
			for (let unitIndex = 0; unitIndex < units; unitIndex++) {
				const unit = reader.u16(content + unitIndex * 2);
				if (unit > 255 || unit >= 1 && unit <= 8 || unit >= 14 && unit <= 31 || unit === 39 || unit === 45 || unit === 127) {
					expectedFlag = 1;
					break;
				}
			}
			const flagOffset = content + units * 2;
			const actualFlag = bytes[flagOffset];
			const issues = conformance();
			if (actualFlag !== expectedFlag) {
				budget.reserve(512, flagOffset);
				issues.push({
					code: "invalid-string",
					scope,
					offset: flagOffset,
					detail: `User string terminal flag ${String(actualFlag)} differs from ECMA-335 II.24.2.4 value ${String(expectedFlag)}; readable UTF-16 is preserved and runtime acceptance is not assessed`
				});
			}
			return {
				offset: start,
				value: bytes.subarray(content, flagOffset).toString("utf16le"),
				issues
			};
		};
		readMetadataGuid = (bytes, layout, index) => {
			if (index === 0) return null;
			if (layout.guid.kind === "ambiguous") return undefined;
			const { offset: heapOffset, size } = layout.guid.stream;
			const relative = (index - 1) * 16;
			if (relative < 0 || relative > size - 16) throw managedFailure("invalid-guid", "metadata.#GUID", "GUID heap index is outside #GUID", heapOffset + Math.max(relative, 0));
			const offset = heapOffset + relative;
			const reader = new BinaryReader(bytes, true, "managed");
			const part1 = reader.u32(offset).toString(16).padStart(8, "0");
			const part2 = reader.u16(offset + 4).toString(16).padStart(4, "0");
			const part3 = reader.u16(offset + 6).toString(16).padStart(4, "0");
			const part4 = bytes.subarray(offset + 8, offset + 10).toString("hex");
			const part5 = bytes.subarray(offset + 10, offset + 16).toString("hex");
			return `${part1}-${part2}-${part3}-${part4}-${part5}`;
		};
		metadataToken = (table, row) => `0x${(table * 16777216 + row).toString(16).padStart(8, "0")}`;
		metadataTokenFact = (raw) => {
			const table = raw >>> 24;
			const row = raw & 16777215;
			return {
				raw,
				table,
				row,
				token: metadataToken(table, row)
			};
		};
		metadataRowCursor = (bytes, layout, table, row) => {
			const descriptor = layout.table(table);
			const start = metadataRowOffset(layout, table, row);
			if (descriptor === undefined) throw managedFailure("invalid-row", `metadata.${String(table)}`, "Metadata table is absent", start);
			managedDecodeBudget(layout).reserveRow(table, row, start);
			return new MetadataRowCursor(bytes, start, start + descriptor.rowSize, `metadata.${descriptor.name}`);
		};
		metadataCodedIndexCoordinate = (raw, bits, tables) => {
			const tag = raw & 2 ** bits - 1;
			return {
				tag,
				table: tables[tag],
				row: Math.floor(raw / 2 ** bits)
			};
		};
		decodeMetadataCodedIndex = (raw, bits, tables, rowCounts) => {
			if (raw === 0) return { kind: "null" };
			const { tag, table, row } = metadataCodedIndexCoordinate(raw, bits, tables);
			if (table === undefined) return {
				kind: "invalid",
				reason: `coded index tag ${tag} is not defined`,
				table,
				row
			};
			if (row === 0) return {
				kind: "invalid",
				reason: `coded index selects row zero in table ${table}`,
				table,
				row
			};
			const count = rowCounts[table] ?? 0;
			if (row > count) return {
				kind: "invalid",
				reason: `coded index selects row ${row} in table ${table}, which has ${count} rows`,
				table,
				row
			};
			return {
				kind: "valid",
				token: metadataToken(table, row),
				table,
				row
			};
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedMemberReferenceRows.js
var readMemberReferenceRowFacts;
function init_managedMemberReferenceRows() {
	return (init_managedMemberReferenceRows = __esmMin((() => {
		init_managedMetadataLayout();
		init_managedMetadataHeaps();
		readMemberReferenceRowFacts = (bytes, layout, row) => {
			const cursor = metadataRowCursor(bytes, layout, 10, row);
			const parentRaw = cursor.readIndex(layout.codedIndexSize("MemberRefParent"));
			return {
				token: metadataToken(10, row),
				rowOffset: cursor.start,
				parentRaw,
				parent: decodeMetadataCodedIndex(parentRaw, MANAGED_CODED_INDEXES.MemberRefParent.bits, MANAGED_CODED_INDEXES.MemberRefParent.tables, layout.rowCounts),
				nameIndex: cursor.readIndex(layout.stringIndexSize),
				signatureIndex: cursor.readIndex(layout.blobIndexSize)
			};
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedMemberPointers.js
var lookups$1, memberListTable, memberListIndexSize, validatedMemberListStart, memberListRowLookup;
function init_managedMemberPointers() {
	return (init_managedMemberPointers = __esmMin((() => {
		init_binaryContainer();
		init_managedDecodeBudget();
		init_managedReaderFailure();
		lookups$1 = new WeakMap();
		memberListTable = (layout, table) => {
			const pointers = layout.table(table - 1);
			return pointers !== undefined && pointers.rowCount > 0 ? pointers : layout.table(table);
		};
		memberListIndexSize = (layout, table) => layout.tableIndexSize(table - 1) === 4 || layout.tableIndexSize(table) === 4 ? 4 : 2;
		validatedMemberListStart = (start, table) => {
			const total = table?.rowCount ?? 0;
			return Number.isSafeInteger(start) && start >= 1 && start <= total + 1 ? start : null;
		};
		memberListRowLookup = (bytes, layout, table) => {
			const pointers = layout.table(table - 1);
			if (pointers === undefined || pointers.rowCount === 0) return (row) => row;
			let byTable = lookups$1.get(layout);
			const cached = byTable?.get(table);
			if (cached instanceof ManagedReaderFailure) throw cached;
			if (cached !== undefined) return cached;
			const definitionCount = layout.table(table)?.rowCount ?? 0;
			managedDecodeBudget(layout).reserve((definitionCount + 1) * Uint32Array.BYTES_PER_ELEMENT + 256, pointers.offset);
			if (byTable === undefined) {
				byTable = new Map();
				lookups$1.set(layout, byTable);
			}
			const positions = new Uint32Array(definitionCount + 1);
			try {
				const width = layout.tableIndexSize(table);
				const reader = new BinaryReader(bytes, true, "managed-metadata-pointers");
				for (let row = 1; row <= pointers.rowCount; row += 1) {
					const offset = pointers.offset + (row - 1) * pointers.rowSize;
					const definition = width === 2 ? reader.u16(offset) : reader.u32(offset);
					if (definition === 0 || definition > definitionCount) throw managedFailure("invalid-row", `metadata.${pointers.name}`, `Pointer row ${String(row)} names an out-of-range definition row ${String(definition)}`, offset);
					if (positions[definition] !== 0) throw managedFailure("invalid-row", `metadata.${pointers.name}`, `Definition row ${String(definition)} has more than one pointer row; its declaring type is ambiguous`, offset);
					positions[definition] = row;
				}
				const lookup = (definition) => {
					const position = positions[definition] ?? 0;
					if (position === 0) throw managedFailure("invalid-row", `metadata.${pointers.name}`, `Definition row ${String(definition)} has no pointer row identifying its declaring type`, pointers.offset);
					return position;
				};
				byTable.set(table, lookup);
				return lookup;
			} catch (cause) {
				if (cause instanceof ManagedReaderFailure) byTable.set(table, cause);
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedTypeDefinitionRows.js
var readTypeDefinitionRowFacts;
function init_managedTypeDefinitionRows() {
	return (init_managedTypeDefinitionRows = __esmMin((() => {
		init_managedMetadataHeaps();
		init_managedMemberPointers();
		readTypeDefinitionRowFacts = (bytes, layout, row) => {
			const cursor = metadataRowCursor(bytes, layout, 2, row);
			const flags = cursor.u32();
			const nameOffset = cursor.offset;
			const nameIndex = cursor.readIndex(layout.stringIndexSize);
			const namespaceOffset = cursor.offset;
			const namespaceIndex = cursor.readIndex(layout.stringIndexSize);
			const extendsOffset = cursor.offset;
			const extendsRaw = cursor.readIndex(layout.codedIndexSize("TypeDefOrRef"));
			const fieldListOffset = cursor.offset;
			const fieldListRaw = cursor.readIndex(memberListIndexSize(layout, 4));
			const methodListOffset = cursor.offset;
			const methodListRaw = cursor.readIndex(memberListIndexSize(layout, 6));
			return {
				rowOffset: cursor.start,
				flags,
				nameIndex,
				nameOffset,
				namespaceIndex,
				namespaceOffset,
				extendsRaw,
				extendsOffset,
				fieldListRaw,
				fieldListOffset,
				methodListRaw,
				methodListOffset
			};
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedTypeReferences.js
var managedTypeReferences;
function init_managedTypeReferences() {
	return (init_managedTypeReferences = __esmMin((() => {
		init_managedDecodeBudget();
		init_managedMetadataHeaps();
		init_managedReaderFailure();
		init_managedMetadataLayout();
		managedTypeReferences = (bytes, layout, issues) => {
			const rows = new Map();
			const names = new Map();
			const checked = new Map();
			const read = (row) => {
				const cached = rows.get(row);
				if (cached !== undefined) return cached;
				managedDecodeBudget(layout).reserve(384, null);
				const value = readManagedValue(() => {
					const cursor = metadataRowCursor(bytes, layout, 1, row);
					const raw = cursor.readIndex(layout.codedIndexSize("ResolutionScope"));
					const scope = decodeMetadataCodedIndex(raw, MANAGED_CODED_INDEXES.ResolutionScope.bits, MANAGED_CODED_INDEXES.ResolutionScope.tables, layout.rowCounts);
					if (scope.kind === "invalid") issues.push({
						code: "invalid-row",
						scope: `metadata.TypeRef:${metadataToken(1, row)}`,
						offset: cursor.start,
						detail: `TypeRef ResolutionScope coded index 0x${raw.toString(16)} is invalid: ${scope.reason}`
					});
					return {
						nameIndex: cursor.readIndex(layout.stringIndexSize),
						namespaceIndex: cursor.readIndex(layout.stringIndexSize),
						enclosingRow: scope.kind !== "null" && scope.table === 1 ? scope.row : null,
						scopeValid: scope.kind !== "invalid"
					};
				}, issues) ?? null;
				rows.set(row, value);
				return value;
			};
			const validate = (row) => {
				const prior = checked.get(row);
				if (prior !== undefined) return prior;
				const path = [];
				const seen = new Set();
				let current = row;
				let valid = true;
				while (current !== null) {
					const known = checked.get(current);
					if (known !== undefined) {
						valid = known;
						break;
					}
					if (seen.has(current)) {
						issues.push({
							code: "invalid-row",
							scope: `metadata.TypeRef:${metadataToken(1, current)}`,
							offset: metadataRowOffset(layout, 1, current),
							detail: "TypeRef ResolutionScope chain contains a cycle"
						});
						valid = false;
						break;
					}
					seen.add(current);
					path.push(current);
					const value = read(current);
					if (value === null || !value.scopeValid) {
						valid = false;
						break;
					}
					current = value.enclosingRow;
				}
				for (const visited of path) checked.set(visited, valid);
				return valid;
			};
			return (row) => {
				const cached = names.get(row);
				if (cached !== undefined) return cached;
				const value = read(row);
				if (value === null) return null;
				const scopeValid = validate(row);
				managedDecodeBudget(layout).reserve(128, null);
				const named = readManagedValue(() => ({
					namespace: readMetadataString(bytes, layout, value.namespaceIndex),
					name: readMetadataString(bytes, layout, value.nameIndex),
					enclosingRow: value.enclosingRow,
					scopeValid
				}), issues) ?? null;
				names.set(row, named);
				return named;
			};
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedSignatureTypeNames.js
var TYPE_REF, TYPE_DEF, MAX_TYPE_NESTING_DEPTH, TOP_LEVEL, NESTED, NAME_SEPARATOR, nestedTypeNames, managedSignatureTypeNames;
function init_managedSignatureTypeNames() {
	return (init_managedSignatureTypeNames = __esmMin((() => {
		init_managedDecodeBudget();
		init_managedReaderFailure();
		TYPE_REF = 1;
		TYPE_DEF = 2;
		MAX_TYPE_NESTING_DEPTH = 64;
		TOP_LEVEL = Buffer.from([0]);
		NESTED = Buffer.from([1]);
		NAME_SEPARATOR = Buffer.from([0]);
		nestedTypeNames = (link, retain) => {
			const named = new Map();
			const remember = (row, value) => {
				retain();
				named.set(row, value);
			};
			const links = new Map();
			const readLink = (row) => {
				const known = links.get(row);
				if (known !== undefined) return known;
				const read = link(row);
				retain();
				links.set(row, read);
				return read;
			};
			return (row) => {
				const path = [];
				const seen = new Set();
				let outer = null;
				for (let current = row; current !== null;) {
					const known = named.get(current);
					if (known !== undefined) {
						if (known === null) {
							for (const step of path) remember(step.row, null);
							return null;
						}
						outer = known;
						break;
					}
					if (seen.has(current)) {
						for (const step of path) remember(step.row, null);
						return null;
					}
					if (path.length === 64) {
						remember(row, null);
						return null;
					}
					const step = readLink(current);
					if (step === null) {
						remember(current, null);
						for (const visited of path) remember(visited.row, null);
						return null;
					}
					seen.add(current);
					path.push({
						row: current,
						link: step
					});
					current = step.enclosingRow;
				}
				let inner = outer;
				let exceeded = false;
				for (const step of path.reverse()) {
					const depth = (inner?.depth ?? 0) + 1;
					exceeded ||= depth > 64;
					if (exceeded) {
						remember(step.row, null);
						continue;
					}
					const hash = createHash("sha256");
					if (inner === null) hash.update(TOP_LEVEL);
					else hash.update(NESTED).update(inner.digest);
					hash.update(step.link.namespace).update(NAME_SEPARATOR).update(step.link.name);
					const ownLength = step.link.namespace.length + step.link.name.length + Number(step.link.namespace.length > 0);
					retain(((inner?.name.length ?? -1) + 1 + ownLength) * 6 + 2);
					const ownName = step.link.namespace.length === 0 ? step.link.name : `${step.link.namespace}.${step.link.name}`;
					const name = inner === null ? ownName : `${inner.name}/${ownName}`;
					inner = {
						digest: hash.digest(),
						name,
						depth
					};
					remember(step.row, inner);
				}
				return exceeded ? null : inner;
			};
		};
		managedSignatureTypeNames = (layout, issues, parsedTypes, reference) => {
			const retain = (bytes = 128) => managedDecodeBudget(layout).reserve(bytes, null);
			managedDecodeBudget(layout).reserve(parsedTypes.types.length * 128, null);
			const types = new Map();
			for (const { row, type } of parsedTypes.types) types.set(row, type);
			const definitions = nestedTypeNames((row) => {
				if (!parsedTypes.nesting.complete) return null;
				const type = types.get(row);
				if (type === undefined && (row < 1 || row > (layout.table(TYPE_DEF)?.rowCount ?? 0))) {
					readManagedValue(() => {
						throw managedFailure("invalid-row", `metadata.signature.type:${TYPE_DEF}:${row}`, `Signature references an unavailable TypeDef row ${row}`);
					}, issues);
					return null;
				}
				if (type === undefined) return null;
				const enclosingRow = parsedTypes.nesting.enclosing.get(row) ?? null;
				const nested = (type.flags & 7) >= 2;
				if (nested !== (enclosingRow !== null)) {
					managedDecodeBudget(layout).reserve(512, type.row_offset);
					readManagedValue(() => {
						throw managedFailure("invalid-row", `metadata.TypeDef:${type.token}`, nested ? `Nested TypeDef ${type.token} has no NestedClass enclosing entry` : `Top-level TypeDef ${type.token} has a NestedClass enclosing entry`, type.row_offset);
					}, issues);
					return null;
				}
				return {
					namespace: type.namespace,
					name: type.name,
					enclosingRow
				};
			}, retain);
			const references = nestedTypeNames((row) => {
				const value = reference(row);
				return value?.scopeValid === true ? value : null;
			}, retain);
			const names = new Map();
			const nameFor = (key, table, row) => {
				let named = names.get(key);
				if (named === undefined) {
					managedDecodeBudget(layout).reserve(256, null);
					named = table === TYPE_DEF ? definitions(row) : table === TYPE_REF ? references(row) : null;
					names.set(key, named);
				}
				return named;
			};
			return {
				operand: ({ value, coordinate }) => nameFor(value, coordinate.table, coordinate.row)?.digest ?? null,
				declaration: (table, row) => nameFor(row * 4 + Number(table === TYPE_REF), table, row)?.digest ?? null,
				displayName: ({ value, coordinate }) => nameFor(value, coordinate.table, coordinate.row)?.name ?? null
			};
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedTypeNesting.js
var readManagedTypeNesting;
function init_managedTypeNesting() {
	return (init_managedTypeNesting = __esmMin((() => {
		init_managedDecodeBudget();
		init_managedMetadataHeaps();
		init_managedReaderFailure();
		readManagedTypeNesting = (bytes, layout, issues) => {
			const initialIssues = issues.length;
			const typeCount = layout.table(2)?.rowCount ?? 0;
			const enclosing = new Map();
			for (let row = 1; row <= (layout.table(41)?.rowCount ?? 0); row += 1) {
				readManagedValue(() => {
					const cursor = metadataRowCursor(bytes, layout, 41, row);
					const nested = cursor.readIndex(layout.tableIndexSize(2));
					const outer = cursor.readIndex(layout.tableIndexSize(2));
					if (nested < 1 || outer < 1 || nested > typeCount || outer > typeCount || nested === outer || enclosing.has(nested)) throw managedFailure("invalid-row", `metadata.NestedClass:${metadataToken(41, row)}`, `NestedClass requires a unique nested type and distinct existing enclosing type; observed ${nested} -> ${outer}`, cursor.start);
					managedDecodeBudget(layout).reserve(128, cursor.start);
					enclosing.set(nested, outer);
				}, issues);
			}
			return {
				enclosing,
				complete: issues.length === initialIssues
			};
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedMemberOwnership.js
var lookups, memberDeclaringTypeRowLookup;
function init_managedMemberOwnership() {
	return (init_managedMemberOwnership = __esmMin((() => {
		init_managedDecodeBudget();
		init_managedMemberPointers();
		init_managedReaderFailure();
		lookups = new WeakMap();
		memberDeclaringTypeRowLookup = (bytes, layout, table, facts) => {
			let byTable = lookups.get(facts);
			const cached = byTable?.get(table);
			if (cached instanceof ManagedReaderFailure) throw cached;
			if (cached !== undefined) return cached;
			if (byTable === undefined) {
				byTable = new Map();
				lookups.set(facts, byTable);
			}
			try {
				const positionOf = memberListRowLookup(bytes, layout, table);
				const positions = memberListTable(layout, table)?.rowCount ?? 0;
				const types = layout.table(2)?.rowCount ?? 0;
				managedDecodeBudget(layout).reserve((2 * positions + 3) * Uint32Array.BYTES_PER_ELEMENT + 256, layout.table(2)?.offset ?? null);
				const owners = new Uint32Array(positions + 1);
				const next = Uint32Array.from({ length: positions + 2 }, (_, p) => p);
				const unowned = (position) => {
					let root = position;
					while (next[root] !== root) root = next[root] ?? root;
					for (let p = position; p !== root;) {
						const following = next[p] ?? root;
						next[p] = root;
						p = following;
					}
					return root;
				};
				for (let row = 1; row <= types; row += 1) {
					const memberStart = table === 4 ? facts.entries[row - 1]?.field : facts.entries[row - 1]?.method;
					const start = memberStart?.start.value ?? null;
					const end = memberStart?.end ?? null;
					if (start !== null && end !== null) {
						const limit = Math.min(end, positions + 1);
						for (let p = unowned(Math.min(start, positions + 1)); p < limit; p = unowned(p + 1)) {
							owners[p] = row;
							next[p] = p + 1;
						}
					}
				}
				const definitions = layout.table(table)?.rowCount ?? 0;
				const lookup = (definition) => definition < 1 || definition > definitions ? 0 : owners[positionOf(definition)] ?? 0;
				byTable.set(table, lookup);
				return lookup;
			} catch (cause) {
				if (cause instanceof ManagedReaderFailure) byTable.set(table, cause);
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedMetadataInventoryRows.js
var publicKeyIdentity, readModule, readAssembly, assemblyReferenceHeader, readAssemblyReferenceName, readAssemblyReference, managedMetadataTypeNames, declaringTypeForMethod, attributeTypeName, decodeFixedString, readCustomAttribute, readResource;
function init_managedMetadataInventoryRows() {
	return (init_managedMetadataInventoryRows = __esmMin((() => {
		init_strictUtf8();
		init_managedMemberReferenceRows();
		init_managedTypeDefinitionRows();
		init_managedDecodeBudget();
		init_managedTypeReferences();
		init_managedSignatureTypeNames();
		init_managedTypeNesting();
		init_managedMemberOwnership();
		init_managedMetadataLayout();
		init_managedMetadataHeaps();
		init_managedReaderFailure();
		publicKeyIdentity = (bytes, kind, layout) => ({
			kind: bytes.length === 0 ? "none" : kind,
			byte_length: bytes.length,
			sha256: bytes.length === 0 ? null : managedDecodeBudget(layout).digest(bytes, "sha256"),
			token: bytes.length === 0 ? null : kind === "public-key" ? Buffer.from(managedDecodeBudget(layout).digest(bytes, "sha1"), "hex").subarray(-8).reverse().toString("hex") : bytes.length === 8 ? bytes.toString("hex") : null
		});
		readModule = (bytes, layout, issues) => {
			const table = layout.table(0);
			if (table === undefined || table.rowCount === 0) return null;
			const ambiguousNames = layout.strings.kind === "ambiguous";
			if (ambiguousNames && table.rowCount !== 1) return null;
			const cursor = metadataRowCursor(bytes, layout, 0, 1);
			const generation = cursor.u16();
			const nameIndex = cursor.readIndex(layout.stringIndexSize);
			const mvidIndex = cursor.readIndex(layout.guidIndexSize);
			const encIndex = cursor.readIndex(layout.guidIndexSize);
			const encBaseIndex = cursor.readIndex(layout.guidIndexSize);
			const readName = () => readMetadataString(bytes, layout, nameIndex);
			const name = table.rowCount === 1 ? readManagedValue(readName, issues) : readName();
			const readGuid = (index) => {
				const read = () => readMetadataGuid(bytes, layout, index);
				return (name === undefined ? readManagedValue(read, issues) : read()) ?? null;
			};
			const facts = {
				generation,
				mvid: readGuid(mvidIndex),
				enc_id: readGuid(encIndex),
				enc_base_id: readGuid(encBaseIndex),
				token: "0x00000001",
				row_offset: table.offset
			};
			return name === undefined ? {
				...facts,
				name: null,
				name_index: nameIndex
			} : {
				...facts,
				name
			};
		};
		readAssembly = (bytes, layout) => {
			const table = layout.table(32);
			if (table === undefined || table.rowCount === 0) return null;
			const cursor = metadataRowCursor(bytes, layout, 32, 1);
			const hashAlgorithm = cursor.u32();
			const version = [
				cursor.u16(),
				cursor.u16(),
				cursor.u16(),
				cursor.u16()
			].join(".");
			const flags = cursor.u32();
			const key = readMetadataBlob(bytes, layout, cursor.readIndex(layout.blobIndexSize));
			const name = readMetadataString(bytes, layout, cursor.readIndex(layout.stringIndexSize));
			const culture = readMetadataString(bytes, layout, cursor.readIndex(layout.stringIndexSize));
			return {
				name,
				version,
				culture: culture.length === 0 ? null : culture,
				flags,
				hash_algorithm: hashAlgorithm,
				public_key: publicKeyIdentity(key, (flags & 1) === 0 ? "public-key-token" : "public-key", layout),
				token: metadataToken(32, 1),
				row_offset: table.offset
			};
		};
		assemblyReferenceHeader = (bytes, layout, row) => {
			const cursor = metadataRowCursor(bytes, layout, 35, row);
			const version = [
				cursor.u16(),
				cursor.u16(),
				cursor.u16(),
				cursor.u16()
			].join(".");
			return {
				cursor,
				version,
				flags: cursor.u32(),
				keyIndex: cursor.readIndex(layout.blobIndexSize),
				nameIndex: cursor.readIndex(layout.stringIndexSize)
			};
		};
		readAssemblyReferenceName = (bytes, layout, row) => {
			const { nameIndex } = assemblyReferenceHeader(bytes, layout, row);
			return {
				name: readMetadataString(bytes, layout, nameIndex),
				token: metadataToken(35, row),
				row_offset: metadataRowOffset(layout, 35, row)
			};
		};
		readAssemblyReference = (bytes, layout, row) => {
			const { cursor, version, flags, keyIndex, nameIndex } = assemblyReferenceHeader(bytes, layout, row);
			const name = readMetadataString(bytes, layout, nameIndex);
			try {
				const keyOrToken = readMetadataBlob(bytes, layout, keyIndex);
				const culture = readMetadataString(bytes, layout, cursor.readIndex(layout.stringIndexSize));
				const hashValue = readMetadataBlob(bytes, layout, cursor.readIndex(layout.blobIndexSize));
				const reference = {
					name,
					version,
					culture: culture.length === 0 ? null : culture,
					flags,
					public_key_or_token: publicKeyIdentity(keyOrToken, (flags & 1) === 0 ? "public-key-token" : "public-key", layout),
					hash_value_sha256: hashValue.length === 0 ? null : managedDecodeBudget(layout).digest(hashValue, "sha256"),
					hash_value_length: hashValue.length,
					token: metadataToken(35, row),
					row_offset: metadataRowOffset(layout, 35, row)
				};
				return {
					name,
					reference
				};
			} catch (cause) {
				if (cause instanceof ManagedHeapAmbiguityFailure) return {
					name,
					reference: null
				};
				throw cause;
			}
		};
		managedMetadataTypeNames = (bytes, layout, issues, parsedTypes, parsedReferences) => {
			const nesting = parsedTypes?.nesting ?? readManagedTypeNesting(bytes, layout, issues);
			const references = parsedReferences ?? managedTypeReferences(bytes, layout, issues);
			const definitions = new Map();
			if (parsedTypes !== undefined) {
				managedDecodeBudget(layout).reserve(parsedTypes.types.length * 128, null);
				for (const { row, type } of parsedTypes.types) definitions.set(row, type);
			}
			const cache = new Map();
			const depthLimit = Symbol("type-name-depth-limit");
			const resolve = (table, row, active = new Set()) => {
				const key = `${String(table)}:${String(row)}`;
				if (cache.has(key)) return cache.get(key) ?? null;
				const descriptor = layout.table(table);
				if (descriptor === undefined || row < 1 || row > descriptor.rowCount) return null;
				if (active.has(key)) {
					cache.set(key, null);
					return null;
				}
				if (active.size >= 64) return depthLimit;
				managedDecodeBudget(layout).reserve(128, null);
				let name;
				let namespace;
				let parentRow;
				if (table === 1) {
					const reference = references(row);
					if (reference === null || !reference.scopeValid) {
						cache.set(key, null);
						return null;
					}
					({name, namespace, enclosingRow: parentRow} = reference);
				} else {
					if (!nesting.complete) {
						cache.set(key, null);
						return null;
					}
					const parsed = definitions.get(row);
					if (parsedTypes !== undefined && parsed === undefined) {
						cache.set(key, null);
						return null;
					}
					let flags;
					if (parsed !== undefined) {
						name = parsed.name;
						namespace = parsed.namespace;
						flags = parsed.flags;
					} else {
						const source = readTypeDefinitionRowFacts(bytes, layout, row);
						flags = source.flags;
						name = readRequiredMetadataName(bytes, layout, "TypeDef", metadataToken(2, row), source);
						namespace = readMetadataString(bytes, layout, source.namespaceIndex);
					}
					parentRow = nesting.enclosing.get(row) ?? null;
					const isNested = (flags & 7) >= 2;
					if (isNested !== (parentRow !== null)) {
						cache.set(key, null);
						return null;
					}
				}
				let fullName;
				let depth = 1;
				let utf8Bytes = 0;
				const nameBytes = Buffer.byteLength(name, "utf8");
				if (parentRow === null) {
					if (namespace.length === 0) {
						fullName = name;
						utf8Bytes = nameBytes;
					} else {
						utf8Bytes = Buffer.byteLength(namespace, "utf8") + 1 + nameBytes;
						managedDecodeBudget(layout).reserveString(utf8Bytes, metadataRowOffset(layout, table, row));
						fullName = `${namespace}.${name}`;
					}
				} else {
					const parents = new Set(active);
					parents.add(key);
					const parent = resolve(table, parentRow, parents);
					if (parent === depthLimit) return depthLimit;
					if (parent === null) fullName = null;
					else {
						depth = parent.depth + 1;
						utf8Bytes = parent.utf8Bytes + 1 + nameBytes;
						managedDecodeBudget(layout).reserveString(utf8Bytes, metadataRowOffset(layout, table, row));
						fullName = `${parent.fullName}+${name}`;
					}
				}
				if (depth > 64) fullName = null;
				const named = fullName === null ? null : {
					fullName,
					depth,
					utf8Bytes
				};
				cache.set(key, named);
				return named;
			};
			return (table, row) => {
				const named = resolve(table, row);
				return named === null || named === depthLimit ? null : named.fullName;
			};
		};
		declaringTypeForMethod = (bytes, layout, methodRow, memberLists, typeName) => {
			const owner = memberDeclaringTypeRowLookup(bytes, layout, 6, memberLists)(methodRow);
			if (owner === 0) return null;
			return typeName(2, owner);
		};
		attributeTypeName = (bytes, layout, constructor, memberLists, typeName) => {
			const { table, row } = constructor;
			if (table === 6) return declaringTypeForMethod(bytes, layout, row, memberLists, typeName);
			const { parent } = readMemberReferenceRowFacts(bytes, layout, row);
			if (parent.kind === "null") return null;
			if (parent.table === 2 || parent.table === 1) return typeName(parent.table, parent.row);
			if (parent.table === 6) return declaringTypeForMethod(bytes, layout, parent.row, memberLists, typeName);
			return null;
		};
		decodeFixedString = (blob, layout) => {
			if (blob.length < 3 || blob.readUInt16LE(0) !== 1 || blob[2] === 255) return null;
			const decoded = readManagedCompressedUnsigned(blob, 2);
			if (!decoded.ok) return null;
			const { value: length, width } = decoded.value;
			const start = 2 + width;
			if (start > blob.length - length) return null;
			managedDecodeBudget(layout).reserveString(length, metadataBlobOffset(layout));
			try {
				return decodeStrictUtf8(blob.subarray(start, start + length), "preserve");
			} catch (cause) {
				void cause;
				return null;
			}
		};
		readCustomAttribute = (bytes, layout, row, issues, memberLists, typeNames) => {
			const cursor = metadataRowCursor(bytes, layout, 12, row);
			const parentRaw = cursor.readIndex(layout.codedIndexSize("HasCustomAttribute"));
			const typeOffset = cursor.offset;
			const typeRaw = cursor.readIndex(layout.codedIndexSize("CustomAttributeType"));
			const value = readMetadataBlob(bytes, layout, cursor.readIndex(layout.blobIndexSize));
			const parent = decodeMetadataCodedIndex(parentRaw, MANAGED_CODED_INDEXES.HasCustomAttribute.bits, MANAGED_CODED_INDEXES.HasCustomAttribute.tables, layout.rowCounts);
			if (parent.kind !== "valid") {
				throw managedFailure("invalid-row", `metadata.CustomAttribute:${metadataToken(12, row)}`, `CustomAttribute parent coded index 0x${parentRaw.toString(16)} is invalid${parent.kind === "null" ? " because the required parent is null" : `: ${parent.reason}`}`, cursor.start);
			}
			const constructor = decodeMetadataCodedIndex(typeRaw, MANAGED_CODED_INDEXES.CustomAttributeType.bits, MANAGED_CODED_INDEXES.CustomAttributeType.tables, layout.rowCounts);
			if (constructor.kind !== "valid") {
				issues.push({
					code: "invalid-row",
					scope: `metadata.CustomAttribute:${metadataToken(12, row)}`,
					offset: typeOffset,
					detail: constructor.kind === "null" ? "CustomAttribute constructor coded index 0x0 is null, but Type must reference a MethodDef or MemberRef row" : `CustomAttribute constructor coded index 0x${typeRaw.toString(16)} is invalid: ${constructor.reason}`
				});
			}
			let typeName = null;
			if (constructor.kind === "valid") typeName = readManagedValue(() => attributeTypeName(bytes, layout, constructor, memberLists, typeNames), issues) ?? null;
			return {
				parent_token: parent.token,
				constructor_token: constructor.kind === "valid" ? constructor.token : null,
				type_name: typeName,
				value_length: value.length,
				value_sha256: managedDecodeBudget(layout).digest(value, "sha256"),
				decoded_fixed_string: typeName === "System.Runtime.Versioning.TargetFrameworkAttribute" ? decodeFixedString(value, layout) : null,
				token: metadataToken(12, row),
				row_offset: cursor.start
			};
		};
		readResource = ({ bytes, layout, row, directory, issues }) => {
			const cursor = metadataRowCursor(bytes, layout, 40, row);
			const declaredOffset = cursor.u32();
			const flags = cursor.u32();
			const name = readMetadataString(bytes, layout, cursor.readIndex(layout.stringIndexSize));
			const implementationOffset = cursor.offset;
			const implementationRaw = cursor.readIndex(layout.codedIndexSize("Implementation"));
			const implementation = decodeMetadataCodedIndex(implementationRaw, MANAGED_CODED_INDEXES.Implementation.bits, MANAGED_CODED_INDEXES.Implementation.tables, layout.rowCounts);
			if (implementation.kind === "invalid") issues.push({
				code: "invalid-row",
				scope: `metadata.ManifestResource:${metadataToken(40, row)}`,
				offset: implementationOffset,
				detail: `ManifestResource implementation coded index 0x${implementationRaw.toString(16)} is invalid: ${implementation.reason}`
			});
			let dataLength = null;
			let dataSha256 = null;
			if (implementation.kind === "null") {
				if (directory === null || declaredOffset > directory.size - 4) {
					issues.push({
						code: "invalid-resource",
						scope: `metadata.ManifestResource:${metadataToken(40, row)}`,
						offset: directory?.offset ?? null,
						detail: "Embedded resource offset leaves the CLI resources directory"
					});
				} else {
					const start = directory.offset + declaredOffset;
					dataLength = bytes.readUInt32LE(start);
					if (dataLength > directory.size - declaredOffset - 4) {
						issues.push({
							code: "invalid-resource",
							scope: `metadata.ManifestResource:${metadataToken(40, row)}`,
							offset: start,
							detail: "Embedded resource length leaves the CLI resources directory"
						});
					} else {
						dataSha256 = managedDecodeBudget(layout).digest(bytes.subarray(start + 4, start + 4 + dataLength), "sha256");
					}
				}
			}
			return {
				name,
				flags,
				visibility: (flags & 7) === 1 ? "public" : (flags & 7) === 2 ? "private" : "unknown",
				implementation_token: implementation.kind === "valid" ? implementation.token : null,
				embedded: implementation.kind === "null",
				declared_offset: declaredOffset,
				data_length: dataLength,
				data_sha256: dataSha256,
				token: metadataToken(40, row),
				row_offset: cursor.start
			};
		};
	})))();
}

//#endregion
export { MANAGED_CODED_INDEXES, METADATA_TABLE_NAMES, ManagedRepresentationFailure, admitManagedProjection, decodeMetadataCodedIndex, init_managedCliHeaderPrefix, init_managedDecodeBudget, init_managedMemberOwnership, init_managedMemberPointers, init_managedMemberReferenceRows, init_managedMetadataHeaps, init_managedMetadataInventoryRows, init_managedMetadataLayout, init_managedSignatureTypeNames, init_managedTypeDefinitionRows, init_managedTypeNesting, init_managedTypeReferences, managedDecodeBudget, managedMetadataTypeNames, managedSignatureTypeNames, managedTypeReferences, memberDeclaringTypeRowLookup, memberListTable, metadataBlobOffset, metadataCodedIndexCoordinate, metadataRowCursor, metadataRowOffset, metadataToken, metadataTokenFact, readAssembly, readAssemblyReference, readAssemblyReferenceName, readCustomAttribute, readManagedCliHeaderPrefix, readManagedCompressedUnsigned, readManagedMetadataLayout, readManagedTypeNesting, readMemberReferenceRowFacts, readMetadataBlob, readMetadataString, readMetadataUserString, readModule, readRequiredMetadataName, readResource, readTypeDefinitionRowFacts, validatedMemberListStart };