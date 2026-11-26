import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { cString, cStringBytes, hex, init_espImageStructures, offsetText, u16, u32 } from "./espImageStructures-Dt191T9V.js";
import { z } from "zod";
import { createHash } from "node:crypto";

//#region dist/domain/windows/ntfsMftAttributes.js
var decodeMftFileReference, offset, decimal, ntfsFileReferenceSchema, ntfsFileNameSchema, standardInformationSchema, listEntrySchema, ntfsAttributeIssueSchema, ntfsAttributeSchema, MFT_INLINE_ATTRIBUTE_REFERENCE_LIMIT, ntfsAttributeListResolutionSchema, attributeReader, readTimes, readStandardInformation, readFileName, readList, readRuns, readAttribute, readMftAttributes;
function init_ntfsMftAttributes() {
	return (init_ntfsMftAttributes = __esmMin((() => {
		init_binaryContainer();
		init_result();
		decodeMftFileReference = (reference) => ({
			recordNumber: Number(reference & 281474976710655n),
			sequenceNumber: Number(reference >> 48n)
		});
		offset = z.int().nonnegative();
		decimal = z.string().regex(/^(?:0|[1-9][0-9]*)$/u);
		ntfsFileReferenceSchema = z.strictObject({
			recordNumber: offset,
			sequenceNumber: offset
		});
		ntfsFileNameSchema = z.strictObject({
			fileOffset: offset,
			parent: ntfsFileReferenceSchema,
			namespace: offset,
			name: z.string(),
			createdFileTime: decimal,
			modifiedFileTime: decimal,
			mftChangedFileTime: decimal,
			accessedFileTime: decimal,
			allocatedBytes: decimal,
			dataBytes: decimal,
			fileAttributes: offset,
			reparseOrEa: offset
		});
		standardInformationSchema = z.strictObject({
			createdFileTime: decimal,
			modifiedFileTime: decimal,
			mftChangedFileTime: decimal,
			accessedFileTime: decimal,
			fileAttributes: offset,
			maximumVersions: offset,
			version: offset,
			classId: offset,
			ownerId: offset.nullable(),
			securityId: offset.nullable(),
			quotaCharged: decimal.nullable(),
			usn: z.string().regex(/^(?:0|-?[1-9][0-9]*)$/u).nullable()
		});
		listEntrySchema = z.strictObject({
			fileOffset: offset,
			recordBytes: offset,
			type: offset,
			name: z.string(),
			lowestVcn: decimal,
			reference: ntfsFileReferenceSchema,
			attributeId: offset
		});
		ntfsAttributeIssueSchema = z.strictObject({
			kind: z.literal("malformed"),
			fileOffset: offset,
			message: z.string()
		});
		ntfsAttributeSchema = z.strictObject({
			fileOffset: offset,
			recordBytes: offset,
			type: offset,
			id: offset,
			name: z.string(),
			flags: offset,
			storage: z.discriminatedUnion("kind", [z.strictObject({
				kind: z.literal("resident"),
				valueFileOffset: offset,
				valueBytes: offset,
				standardInformation: standardInformationSchema.nullable(),
				listEntries: z.array(listEntrySchema).nullable(),
				listIssue: ntfsAttributeIssueSchema.nullable()
			}), z.strictObject({
				kind: z.literal("nonresident"),
				lowestVcn: decimal,
				highestVcn: decimal,
				compressionUnit: offset,
				allocatedBytes: decimal,
				dataBytes: decimal,
				initializedBytes: decimal,
				physicalBytes: decimal.nullable(),
				mappingPairsFileOffset: offset,
				mappingPairsHex: z.string(),
				runCount: offset,
				sparseRunCount: offset
			})])
		});
		MFT_INLINE_ATTRIBUTE_REFERENCE_LIMIT = 32;
		ntfsAttributeListResolutionSchema = z.strictObject({
			coverage: z.enum(["complete", "incomplete"]),
			knownEntryCount: offset,
			omittedKnownEntries: offset,
			unreadListAttributeOffsets: z.array(offset),
			incompleteRecordIndices: z.array(offset),
			references: z.array(z.strictObject({
				listEntryFileOffset: offset,
				result: z.discriminatedUnion("kind", [
					z.strictObject({
						kind: z.literal("resolved"),
						attributeFileOffset: offset
					}),
					z.strictObject({
						kind: z.literal("ambiguous"),
						candidateCount: offset.min(2)
					}),
					z.strictObject({
						kind: z.literal("unresolved"),
						reason: z.enum([
							"unverified-base",
							"record-unavailable",
							"unverified-record",
							"sequence-mismatch",
							"base-reference-mismatch",
							"attribute-unavailable",
							"capacity"
						])
					})
				])
			})).max(32),
			/** Additional facts only; local physical-record attributes remain unchanged. */
			linkedAttributes: z.array(ntfsAttributeSchema).max(32),
			linkedFileNames: z.array(ntfsFileNameSchema).max(32)
		});
		attributeReader = (bytes) => new BinaryReader(bytes, true, "ntfs-mft");
		readTimes = (value, offset) => ({
			createdFileTime: value.word(offset, 64).toString(),
			modifiedFileTime: value.word(offset + 8, 64).toString(),
			mftChangedFileTime: value.word(offset + 16, 64).toString(),
			accessedFileTime: value.word(offset + 24, 64).toString()
		});
		readStandardInformation = (value) => {
			const size = value.bytes.length;
			const extended = size >= 72;
			if (size !== 48 && !extended) return undefined;
			return {
				...readTimes(value, 0),
				fileAttributes: value.u32(32),
				maximumVersions: value.u32(36),
				version: value.u32(40),
				classId: value.u32(44),
				ownerId: extended ? value.u32(48) : null,
				securityId: extended ? value.u32(52) : null,
				quotaCharged: extended ? value.word(56, 64).toString() : null,
				usn: extended ? BigInt.asIntN(64, value.word(64, 64)).toString() : null
			};
		};
		readFileName = (value, fileOffset) => {
			const { bytes } = value;
			if (bytes.length < 66) return err("Truncated FILE_NAME value");
			const nameBytes = bytes[64] * 2;
			if (66 + nameBytes > bytes.length) return err("FILE_NAME string exceeds its value");
			const namespace = bytes[65];
			if (namespace > 3) return err("FILE_NAME namespace is outside the NTFS range");
			return ok({
				fileOffset,
				parent: decodeMftFileReference(value.word(0, 64)),
				...readTimes(value, 8),
				namespace,
				name: bytes.toString("utf16le", 66, 66 + nameBytes),
				allocatedBytes: value.word(40, 64).toString(),
				dataBytes: value.word(48, 64).toString(),
				fileAttributes: value.u32(56),
				reparseOrEa: value.u32(60)
			});
		};
		readList = (value, fileOffset) => {
			const entries = [];
			const malformed = (cursor, message) => err({
				kind: "malformed",
				fileOffset: fileOffset + cursor,
				message,
				partialEntries: entries
			});
			const { bytes } = value;
			for (let cursor = 0; cursor < bytes.length;) {
				if (bytes.length - cursor < 26) return malformed(cursor, "Truncated attribute-list entry");
				const length = value.u16(cursor + 4);
				const nameBytes = bytes[cursor + 6] * 2;
				const nameOffset = bytes[cursor + 7];
				if (length < 26 || length % 8 !== 0 || length > bytes.length - cursor || nameBytes > 0 && (nameOffset < 26 || nameOffset % 2 !== 0 || nameOffset + nameBytes > length)) return malformed(cursor, "Invalid attribute-list entry length or name");
				entries.push({
					fileOffset: fileOffset + cursor,
					recordBytes: length,
					type: value.u32(cursor),
					name: nameBytes === 0 ? "" : bytes.toString("utf16le", cursor + nameOffset, cursor + nameOffset + nameBytes),
					lowestVcn: value.word(cursor + 8, 64).toString(),
					reference: decodeMftFileReference(value.word(cursor + 16, 64)),
					attributeId: value.u16(cursor + 24)
				});
				cursor += length;
			}
			return ok(entries);
		};
		readRuns = (bytes, expectedClusters) => {
			let cursor = 0, runCount = 0, sparseRunCount = 0;
			let clusters = 0n, lcn = 0n;
			while (cursor < bytes.length) {
				const header = bytes[cursor++];
				if (header === 0) return clusters === expectedClusters ? {
					runCount,
					sparseRunCount,
					bytes: cursor
				} : undefined;
				const lengthBytes = header & 15, deltaBytes = header >> 4;
				if (lengthBytes === 0 || lengthBytes > 8 || deltaBytes > 8 || lengthBytes + deltaBytes > bytes.length - cursor) return undefined;
				let count = 0n, delta = 0n;
				for (let i = 0; i < lengthBytes; i++) count |= BigInt(bytes[cursor + i]) << BigInt(i * 8);
				cursor += lengthBytes;
				for (let i = 0; i < deltaBytes; i++) delta |= BigInt(bytes[cursor + i]) << BigInt(i * 8);
				if (deltaBytes > 0 && (bytes[cursor + deltaBytes - 1] & 128) !== 0) delta -= 1n << BigInt(deltaBytes * 8);
				cursor += deltaBytes;
				if (count === 0n) return undefined;
				if (deltaBytes === 0) sparseRunCount++;
				else lcn += delta;
				clusters += count;
				if (lcn < 0n || lcn > 18446744073709551615n || deltaBytes > 0 && lcn + count > 18446744073709551616n || clusters > expectedClusters) return undefined;
				runCount++;
			}
			return undefined;
		};
		readAttribute = (reader, type, fileOffset) => {
			const malformed = (message) => err({
				kind: "malformed",
				fileOffset,
				message
			});
			const attribute = reader.bytes;
			const form = attribute[8];
			const headerBytes = form === 0 ? 24 : 64;
			if (form === undefined || form > 1 || attribute.length < headerBytes) return malformed("Invalid attribute form or header extent");
			const nameBytes = attribute[9] * 2;
			const nameOffset = reader.u16(10);
			if (nameBytes > 0 && (nameOffset < headerBytes || nameOffset % 2 !== 0 || nameOffset + nameBytes > attribute.length)) return malformed("Attribute name is outside its declared extent");
			const nameEnd = nameBytes === 0 ? headerBytes : nameOffset + nameBytes;
			const common = {
				fileOffset,
				recordBytes: attribute.length,
				type,
				id: reader.u16(14),
				flags: reader.u16(12),
				name: nameBytes === 0 ? "" : attribute.toString("utf16le", nameOffset, nameEnd)
			};
			if (form === 1 && (common.type === 16 || common.type === 48)) return malformed("Standard information and FILE_NAME must be resident");
			if (form === 0) {
				const valueBytes = reader.u32(16), valueOffset = reader.u16(20);
				if (valueOffset < nameEnd || valueBytes > attribute.length - valueOffset) return malformed("Resident value overlaps its header/name or exceeds the attribute");
				const value = reader.range(valueOffset, valueBytes, "resident attribute value");
				const valueFileOffset = fileOffset + valueOffset;
				const standardInformation = type === 16 ? readStandardInformation(attributeReader(value)) : null;
				if (standardInformation === undefined) return malformed("Invalid standard-information value");
				const fileName = type === 48 ? readFileName(attributeReader(value), valueFileOffset) : null;
				if (fileName !== null && !fileName.ok) return malformed(fileName.error);
				const list = type === 32 ? readList(attributeReader(value), valueFileOffset) : null;
				const listEntries = list === null ? null : list.ok ? list.value : list.error.partialEntries;
				const listIssue = list !== null && !list.ok ? {
					kind: list.error.kind,
					fileOffset: list.error.fileOffset,
					message: list.error.message
				} : null;
				return ok({
					attribute: {
						...common,
						storage: {
							kind: "resident",
							valueFileOffset,
							valueBytes,
							standardInformation,
							listEntries,
							listIssue
						}
					},
					fileName: fileName?.value ?? null
				});
			}
			const lowestVcn = reader.word(16, 64), highestVcn = reader.word(24, 64);
			const extended = (common.flags & 32769) !== 0 && lowestVcn === 0n;
			const runsOffset = reader.u16(32);
			if (runsOffset < Math.max(nameEnd, extended ? 72 : 64) || runsOffset >= attribute.length || extended && nameBytes > 0 && nameOffset < 72) return malformed("Nonresident mapping pairs or name overlap the header");
			const empty = lowestVcn === 0n && highestVcn === 18446744073709551615n;
			if (highestVcn < lowestVcn && !empty) return malformed("Nonresident VCN range is reversed");
			const runs = readRuns(attribute.subarray(runsOffset), empty ? 0n : highestVcn - lowestVcn + 1n);
			if (runs === undefined) return malformed("Invalid mapping pairs or incomplete VCN coverage");
			const dataBytes = reader.word(48, 64), initializedBytes = reader.word(56, 64);
			if (lowestVcn === 0n && initializedBytes > dataBytes) return malformed("Initialized size exceeds the declared data size");
			return ok({
				attribute: {
					...common,
					storage: {
						kind: "nonresident",
						lowestVcn: lowestVcn.toString(),
						highestVcn: highestVcn.toString(),
						compressionUnit: reader.u16(34),
						allocatedBytes: reader.word(40, 64).toString(),
						dataBytes: dataBytes.toString(),
						initializedBytes: initializedBytes.toString(),
						physicalBytes: extended ? reader.word(64, 64).toString() : null,
						mappingPairsFileOffset: fileOffset + runsOffset,
						mappingPairsHex: attribute.toString("hex", runsOffset, runsOffset + runs.bytes),
						runCount: runs.runCount,
						sparseRunCount: runs.sparseRunCount
					}
				},
				fileName: null
			});
		};
		readMftAttributes = (record, first, usedBytes, fileOffset) => {
			const fileNames = [], attributes = [];
			const reader = attributeReader(record.subarray(0, usedBytes));
			let complete = false, hasList = false;
			let attributeIssue = null;
			const malformed = (cursor, message) => {
				attributeIssue ??= {
					kind: "malformed",
					fileOffset: fileOffset + cursor,
					message
				};
			};
			for (let cursor = first; cursor + 4 <= usedBytes;) {
				const type = reader.u32(cursor);
				if (type === 4294967295) {
					complete = true;
					break;
				}
				if (cursor + 24 > usedBytes) {
					malformed(cursor, "Truncated attribute header");
					break;
				}
				const length = reader.u32(cursor + 4);
				if (length < 24 || length % 8 !== 0 || length > usedBytes - cursor) {
					malformed(cursor, "Invalid attribute length");
					break;
				}
				const decoded = readAttribute(attributeReader(reader.range(cursor, length, "attribute record")), type, fileOffset + cursor);
				if (!decoded.ok) {
					attributeIssue ??= decoded.error;
					break;
				}
				const { attribute, fileName } = decoded.value;
				if (attribute.storage.kind === "resident" && attribute.storage.listIssue !== null) attributeIssue ??= attribute.storage.listIssue;
				if (fileName !== null) fileNames.push(fileName);
				hasList ||= attribute.type === 32;
				attributes.push(attribute);
				cursor += length;
			}
			if (!complete && attributeIssue === null) malformed(usedBytes, "Missing attribute end marker");
			return {
				fileNames,
				attributes,
				attributeIssue,
				fileNameCoverage: complete && attributeIssue === null && !hasList ? "complete" : "incomplete",
				attributeCoverage: complete && attributeIssue === null ? "complete" : "incomplete"
			};
		};
	})))();
}

//#endregion
//#region dist/domain/windows/ntfsMft.js
var MFT_FILE_RECORD_MAGIC, MFT_FILE_RECORD_MAGIC_BYTES, NTFS_MFT_MIN_RECORD_BYTES, hasMftFileRecordSignature, MFT_DEFAULT_RECORD_BYTES, MFT_MIN_RECORD_BYTES, MFT_MAX_RECORD_BYTES, USA_MIN_ENTRIES, FIXUP_SECTOR_BYTES, MFT_MAX_FILE_BYTES, MFT_INLINE_HEADER_LIMIT, RECORD_HEADER, RECORD_HEADER_WITH_NUMBER_BYTES, FILE_RECORD_IN_USE, FILE_RECORD_IS_DIRECTORY, FILE_RECORD_NAMES, hasVerifiedMftRecordIdentity, text, failure, limit, parseRecordFlags, isRecordSize, updateSequenceArrayFits, mftReader, readRecordDeclarations, hasMftFileRecordHeader, parseMftIndex, selectMftMetadata, scanMft, resolveMftAttributeLists, readRecord, verifyFixups, StreamingMftDecoder, createMftDecoder;
function init_ntfsMft() {
	return (init_ntfsMft = __esmMin((() => {
		init_ntfsMftAttributes();
		init_binaryContainer();
		init_result();
		MFT_FILE_RECORD_MAGIC = "FILE";
		MFT_FILE_RECORD_MAGIC_BYTES = 4;
		NTFS_MFT_MIN_RECORD_BYTES = 42;
		hasMftFileRecordSignature = (prefix) => prefix.length >= MFT_FILE_RECORD_MAGIC_BYTES && text(prefix.subarray(0, MFT_FILE_RECORD_MAGIC_BYTES)) === MFT_FILE_RECORD_MAGIC;
		MFT_DEFAULT_RECORD_BYTES = 1024;
		MFT_MIN_RECORD_BYTES = 512;
		MFT_MAX_RECORD_BYTES = 65536;
		USA_MIN_ENTRIES = 2;
		FIXUP_SECTOR_BYTES = 512;
		MFT_MAX_FILE_BYTES = 512 * 1024 * 1024;
		MFT_INLINE_HEADER_LIMIT = 32;
		RECORD_HEADER = {
			updateSequenceOffset: 4,
			updateSequenceCount: 6,
			logFileSequenceNumber: 8,
			sequenceNumber: 16,
			hardLinkCount: 18,
			firstAttributeOffset: 20,
			flags: 22,
			usedBytes: 24,
			totalBytes: 28,
			baseRecordReference: 32,
			nextAttributeId: 40,
			recordNumber: 44
		};
		RECORD_HEADER_WITH_NUMBER_BYTES = 48;
		FILE_RECORD_IN_USE = 1;
		FILE_RECORD_IS_DIRECTORY = 2;
		FILE_RECORD_NAMES = new Map([
			[FILE_RECORD_IN_USE, "in-use"],
			[FILE_RECORD_IS_DIRECTORY, "directory"],
			[4, "system"],
			[8, "view-index"]
		]);
		hasVerifiedMftRecordIdentity = (record) => record.sequenceNumber !== 0 && record.extentValid && record.recordNumberMatchesSlot !== false && record.fixups.verifiedSectors * 512 === record.totalBytes;
		text = (ascii) => Buffer.from(ascii).toString("latin1");
		failure = (message, boundary) => ({
			kind: "format",
			message,
			...boundary === undefined ? {} : { boundary }
		});
		limit = (message, boundary) => ({
			kind: "limit",
			message,
			...boundary === undefined ? {} : { boundary }
		});
		parseRecordFlags = (raw) => {
			const names = [];
			let unknownMask = raw;
			for (const [bit, name] of FILE_RECORD_NAMES) {
				if ((raw & bit) !== 0) names.push(name);
				unknownMask &= ~bit;
			}
			return {
				raw,
				names,
				unknownMask
			};
		};
		isRecordSize = (bytes) => bytes >= MFT_MIN_RECORD_BYTES && bytes <= MFT_MAX_RECORD_BYTES && (bytes & bytes - 1) === 0;
		updateSequenceArrayFits = (offset, entries, sectors) => entries >= USA_MIN_ENTRIES && entries <= sectors + 1 && offset >= NTFS_MFT_MIN_RECORD_BYTES && offset % 2 === 0 && offset + entries * 2 <= 512 - 2;
		mftReader = (bytes) => new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), true, "ntfs-mft");
		readRecordDeclarations = (reader) => ({
			totalBytes: reader.u32(RECORD_HEADER.totalBytes),
			updateSequence: {
				offset: reader.u16(RECORD_HEADER.updateSequenceOffset),
				entries: reader.u16(RECORD_HEADER.updateSequenceCount)
			}
		});
		hasMftFileRecordHeader = (prefix) => {
			if (prefix.length < NTFS_MFT_MIN_RECORD_BYTES || !hasMftFileRecordSignature(prefix)) return false;
			const { totalBytes, updateSequence } = readRecordDeclarations(mftReader(prefix));
			return isRecordSize(totalBytes) || updateSequenceArrayFits(updateSequence.offset, updateSequence.entries, MFT_DEFAULT_RECORD_BYTES / 512);
		};
		parseMftIndex = (bytes, startRecord = 0, recordLimit = 32) => {
			const records = [];
			const inventory = scanMft(bytes, ({ fileNames: _names, fileNameCoverage: _nameCoverage, attributes: _attributes, attributeCoverage: _coverage, attributeIssue: _issue, attributeListResolution: _resolution, ...header }) => records.push(header), {
				startRecord,
				recordLimit
			});
			return inventory.ok ? ok({
				...inventory.value,
				records
			}) : inventory;
		};
		selectMftMetadata = (bytes, index, startRecord, recordLimit) => {
			let low = 0;
			let high = index.records.length;
			while (low < high) {
				const middle = low + Math.floor((high - low) / 2);
				if (index.records[middle].index < startRecord) low = middle + 1;
				else high = middle;
			}
			const end = Math.min(index.records.length, low + Math.min(recordLimit, 32));
			const recordHeaders = [];
			if (end > low) {
				const restored = Buffer.allocUnsafe(index.recordBytes);
				for (let position = low; position < end; position += 1) recordHeaders.push(readRecord(bytes, index.records[position].fileOffset, restored));
			}
			return {
				...index.metadata,
				record_headers: resolveMftAttributeLists(recordHeaders, bytes, index.recordBytes),
				omitted_record_headers: index.metadata.record_count - recordHeaders.length,
				record_header_start_index: startRecord,
				next_record_header_index: index.records[end]?.index ?? null
			};
		};
		scanMft = (bytes, retainRecord, window = {
			startRecord: 0,
			recordLimit: 32
		}) => {
			if (bytes.length < NTFS_MFT_MIN_RECORD_BYTES) return err(failure(`file is ${String(bytes.length)} bytes, shorter than one ${String(NTFS_MFT_MIN_RECORD_BYTES)}-byte record header`));
			if (!hasMftFileRecordSignature(bytes)) return err(failure("record 0 does not begin with the FILE signature"));
			const limitations = [];
			const { totalBytes: declaredRecordBytes } = readRecordDeclarations(mftReader(bytes));
			const hasDeclaredRecordSize = isRecordSize(declaredRecordBytes);
			const recordBytes = hasDeclaredRecordSize ? declaredRecordBytes : MFT_DEFAULT_RECORD_BYTES;
			if (!hasDeclaredRecordSize) limitations.push(`record 0 declares a record size of ${String(declaredRecordBytes)} bytes, which is not a supported power of two from ${String(MFT_MIN_RECORD_BYTES)} to ${String(MFT_MAX_RECORD_BYTES)}; records were read at the ${String(MFT_DEFAULT_RECORD_BYTES)}-byte default`);
			const recordHeaders = [];
			let nextRecordHeaderIndex = null;
			let recordCount = 0;
			let inUseCount = 0;
			let directoryCount = 0;
			let extensionCount = 0;
			let mismatchCount = 0;
			let unverifiedCount = 0;
			const restored = Buffer.allocUnsafe(recordBytes);
			let incompleteNames = 0;
			let incompleteAttributes = 0;
			let fileNameCount = 0;
			let invalidSlots = 0;
			let invalidExtents = 0;
			let inconsistentRecordNumbers = 0;
			let firstInvalidExtentOffset;
			let firstInvalidOffset;
			for (let offset = 0; offset + recordBytes <= bytes.length; offset += recordBytes) {
				if (!hasMftFileRecordSignature(bytes.subarray(offset, offset + MFT_FILE_RECORD_MAGIC_BYTES))) {
					invalidSlots += 1;
					firstInvalidOffset ??= offset;
					if (!hasDeclaredRecordSize) break;
					continue;
				}
				const record = readRecord(bytes, offset, restored);
				retainRecord?.(record);
				fileNameCount += record.fileNames.length;
				if (record.attributeCoverage === "incomplete") incompleteAttributes += 1;
				if (record.index >= window.startRecord) {
					if (recordHeaders.length < window.recordLimit) recordHeaders.push(record);
					else nextRecordHeaderIndex ??= record.index;
				}
				recordCount += 1;
				if (record.inUse) inUseCount += 1;
				if (record.directory) directoryCount += 1;
				if (record.baseRecordReference !== null) extensionCount += 1;
				if (record.fixups.mismatchSector !== null) mismatchCount += 1;
				if (record.fixups.malformed || record.fixups.coveredSectors < recordBytes / 512) unverifiedCount += 1;
				if (record.recordNumberMatchesSlot === false) inconsistentRecordNumbers += 1;
				if (record.fileNameCoverage === "incomplete") incompleteNames += 1;
				if (!record.extentValid) {
					invalidExtents += 1;
					firstInvalidExtentOffset ??= offset;
				}
			}
			if (firstInvalidOffset !== undefined) limitations.push(`record at ${String(firstInvalidOffset)} does not begin with the FILE signature; ${String(invalidSlots)} slot(s) without a FILE signature were found`);
			if (firstInvalidExtentOffset !== undefined) limitations.push(`${String(invalidExtents)} FILE record(s) declare inconsistent record extents, beginning at offset ${String(firstInvalidExtentOffset)}`);
			if (inconsistentRecordNumbers !== 0) limitations.push(`${String(inconsistentRecordNumbers)} FILE record(s) declare a record number that disagrees with their stream slot`);
			const truncatedTailBytes = bytes.length % recordBytes;
			if (truncatedTailBytes !== 0) limitations.push(`${String(truncatedTailBytes)} trailing byte(s) do not fill a ${String(recordBytes)}-byte record and were not parsed`);
			if (mismatchCount !== 0) limitations.push(`${String(mismatchCount)} record(s) hold a sector trailer that is not the update sequence number; their attributes were not read and no later step should trust them`);
			if (unverifiedCount !== 0) limitations.push(`${String(unverifiedCount)} record(s) carry an invalid or incomplete update sequence array; their sector trailers were not fully verified`);
			if (incompleteNames > 0) limitations.push(`Local FILE_NAME coverage is incomplete for ${String(incompleteNames)} record(s)`);
			const metadata = {
				kind: "ntfs-mft",
				record_bytes: recordBytes,
				record_count: recordCount,
				in_use_record_count: inUseCount,
				directory_record_count: directoryCount,
				extension_record_count: extensionCount,
				fixup_mismatch_count: mismatchCount,
				fixup_unverified_record_count: unverifiedCount,
				truncated_tail_bytes: truncatedTailBytes,
				record_headers: resolveMftAttributeLists(recordHeaders, bytes, recordBytes),
				omitted_record_headers: recordCount - recordHeaders.length,
				record_header_start_index: window.startRecord,
				next_record_header_index: nextRecordHeaderIndex,
				file_name_count: fileNameCount,
				file_name_incomplete_record_count: incompleteNames,
				attribute_incomplete_record_count: incompleteAttributes
			};
			return ok({
				metadata,
				recordBytes,
				limitations
			});
		};
		resolveMftAttributeLists = (records, bytes, recordBytes) => {
			const decoded = new Map(records.map((record) => [record.index, record]));
			let additionalRecords = 0;
			let scratch;
			const unresolved = (reason) => ({
				kind: "unresolved",
				reason
			});
			const selectRecord = (index) => {
				const retained = decoded.get(index);
				if (retained !== undefined) return ok(retained);
				if (index >= Math.floor(bytes.length / recordBytes)) return err(unresolved("record-unavailable"));
				const offset = index * recordBytes;
				if (!hasMftFileRecordSignature(bytes.subarray(offset, offset + MFT_FILE_RECORD_MAGIC_BYTES))) return err(unresolved("record-unavailable"));
				if (additionalRecords >= 32) return err(unresolved("capacity"));
				scratch ??= Buffer.allocUnsafe(recordBytes);
				const record = readRecord(bytes, offset, scratch);
				additionalRecords += 1;
				decoded.set(index, record);
				return ok(record);
			};
			return records.map((base) => {
				if (base.baseRecordReference !== null || !base.attributes.some((attribute) => attribute.type === 32)) return base;
				const references = [];
				const linkedAttributes = [];
				const linkedFileNames = [];
				const unreadLists = new Set(), incompleteRecords = new Set();
				const seenLists = new Set(), seenEntries = new Set(), seenAttributes = new Set();
				const queue = [];
				const baseVerified = hasVerifiedMftRecordIdentity(base);
				let complete = baseVerified && base.attributeCoverage === "complete";
				if (!complete) incompleteRecords.add(base.index);
				const enqueueList = (attribute) => {
					if (attribute.type !== 32 || seenLists.has(attribute.fileOffset)) return;
					seenLists.add(attribute.fileOffset);
					if (attribute.storage.kind !== "resident" || attribute.storage.listEntries === null) {
						unreadLists.add(attribute.fileOffset);
						complete = false;
						return;
					}
					if (attribute.storage.listIssue !== null) complete = false;
					for (const entry of attribute.storage.listEntries) {
						if (seenEntries.has(entry.fileOffset)) continue;
						seenEntries.add(entry.fileOffset);
						queue.push(entry);
					}
				};
				for (const attribute of base.attributes) enqueueList(attribute);
				const resolveEntry = (entry) => {
					if (!baseVerified) return unresolved("unverified-base");
					const selected = selectRecord(entry.reference.recordNumber);
					if (!selected.ok) return selected.error;
					const target = selected.value;
					if (!hasVerifiedMftRecordIdentity(target)) return unresolved("unverified-record");
					if (target.sequenceNumber !== entry.reference.sequenceNumber) return unresolved("sequence-mismatch");
					if (target.index !== base.index && (target.baseRecordReference?.recordNumber !== base.index || target.baseRecordReference.sequenceNumber !== base.sequenceNumber)) return unresolved("base-reference-mismatch");
					if (target.attributeCoverage !== "complete") {
						incompleteRecords.add(target.index);
						complete = false;
					}
					const candidates = target.attributes.filter((attribute) => attribute.type === entry.type && attribute.id === entry.attributeId && attribute.name === entry.name && (attribute.storage.kind === "resident" ? entry.lowestVcn === "0" : attribute.storage.lowestVcn === entry.lowestVcn));
					if (candidates.length === 0) return unresolved("attribute-unavailable");
					if (candidates.length !== 1) return {
						kind: "ambiguous",
						candidateCount: candidates.length
					};
					const attribute = candidates[0];
					if (target.index !== base.index && !seenAttributes.has(attribute.fileOffset)) {
						seenAttributes.add(attribute.fileOffset);
						linkedAttributes.push(attribute);
						if (attribute.type === 48 && attribute.storage.kind === "resident") {
							const valueOffset = attribute.storage.valueFileOffset;
							linkedFileNames.push(...target.fileNames.filter((name) => name.fileOffset === valueOffset));
						}
					}
					enqueueList(attribute);
					return {
						kind: "resolved",
						attributeFileOffset: attribute.fileOffset
					};
				};
				for (let cursor = 0; cursor < queue.length && references.length < 32; cursor += 1) {
					const entry = queue[cursor];
					const result = resolveEntry(entry);
					if (result.kind !== "resolved") complete = false;
					references.push({
						listEntryFileOffset: entry.fileOffset,
						result
					});
				}
				const omittedKnownEntries = queue.length - references.length;
				return {
					...base,
					attributeListResolution: {
						coverage: complete && omittedKnownEntries === 0 ? "complete" : "incomplete",
						knownEntryCount: queue.length,
						omittedKnownEntries,
						unreadListAttributeOffsets: [...unreadLists],
						incompleteRecordIndices: [...incompleteRecords],
						references,
						linkedAttributes,
						linkedFileNames
					}
				};
			});
		};
		readRecord = (bytes, fileOffset, restored) => {
			const recordBytes = restored.length;
			const index = fileOffset / recordBytes;
			const record = bytes.subarray(fileOffset, fileOffset + recordBytes);
			const reader = mftReader(record);
			const { totalBytes, updateSequence } = readRecordDeclarations(reader);
			const { offset: usaOffset, entries: usaEntries } = updateSequence;
			const flags = reader.u16(RECORD_HEADER.flags);
			const baseRecordReference = reader.word(RECORD_HEADER.baseRecordReference, 64);
			const usedBytes = reader.u32(RECORD_HEADER.usedBytes);
			const firstAttributeOffset = reader.u16(RECORD_HEADER.firstAttributeOffset);
			const usaLayoutValid = updateSequenceArrayFits(usaOffset, usaEntries, Math.floor(record.length / 512));
			const fixups = usaLayoutValid ? verifyFixups(reader, updateSequence) : {
				sequenceNumber: 0,
				entries: usaEntries,
				verifiedSectors: 0,
				coveredSectors: 0,
				mismatchSector: null,
				malformed: true
			};
			const extentValid = totalBytes === recordBytes && usedBytes >= NTFS_MFT_MIN_RECORD_BYTES && usedBytes % 8 === 0 && usedBytes <= totalBytes && firstAttributeOffset % 8 === 0 && firstAttributeOffset >= NTFS_MFT_MIN_RECORD_BYTES && firstAttributeOffset + 4 <= usedBytes && (!usaLayoutValid || firstAttributeOffset >= usaOffset + usaEntries * 2);
			let attributes = {
				attributeIssue: null,
				fileNames: [],
				attributes: [],
				fileNameCoverage: "incomplete",
				attributeCoverage: "incomplete"
			};
			if (fixups.verifiedSectors === recordBytes / 512 && extentValid) {
				restored.set(record);
				for (let sector = 1; sector <= fixups.verifiedSectors; sector += 1) restored.writeUInt16LE(reader.u16(usaOffset + sector * 2), sector * 512 - 2);
				attributes = readMftAttributes(restored, firstAttributeOffset, usedBytes, fileOffset);
			}
			const declaredRecordNumber = usaLayoutValid && usaOffset >= RECORD_HEADER_WITH_NUMBER_BYTES ? reader.u32(RECORD_HEADER.recordNumber) : null;
			return {
				index,
				fileOffset,
				sequenceNumber: reader.u16(RECORD_HEADER.sequenceNumber),
				hardLinkCount: reader.u16(RECORD_HEADER.hardLinkCount),
				flags: parseRecordFlags(flags),
				inUse: (flags & FILE_RECORD_IN_USE) !== 0,
				directory: (flags & FILE_RECORD_IS_DIRECTORY) !== 0,
				usedBytes,
				totalBytes,
				extentValid,
				baseRecordReference: baseRecordReference === 0n ? null : decodeMftFileReference(baseRecordReference),
				declaredRecordNumber,
				recordNumberMatchesSlot: declaredRecordNumber === null ? null : declaredRecordNumber === index,
				logFileSequenceNumber: reader.word(RECORD_HEADER.logFileSequenceNumber, 64).toString(),
				firstAttributeOffset,
				nextAttributeId: reader.u16(RECORD_HEADER.nextAttributeId),
				fixups,
				...attributes
			};
		};
		verifyFixups = (reader, { offset: usaOffset, entries: usaCount }) => {
			const coveredSectors = usaCount - 1;
			const sequenceNumber = reader.u16(usaOffset);
			if (sequenceNumber === 0 || sequenceNumber === 65535) return {
				sequenceNumber,
				entries: usaCount,
				verifiedSectors: 0,
				coveredSectors,
				mismatchSector: null,
				malformed: true
			};
			for (let sector = 0; sector < coveredSectors; sector += 1) {
				const trailerOffset = sector * 512 + 512 - 2;
				if (reader.u16(trailerOffset) !== sequenceNumber) return {
					sequenceNumber,
					entries: usaCount,
					verifiedSectors: sector,
					coveredSectors,
					mismatchSector: sector,
					malformed: false
				};
			}
			return {
				sequenceNumber,
				entries: usaCount,
				verifiedSectors: coveredSectors,
				coveredSectors,
				mismatchSector: null,
				malformed: false
			};
		};
		StreamingMftDecoder = class {
			#bytes;
			#written = 0;
			constructor(fileBytes) {
				this.#bytes = new Uint8Array(fileBytes);
			}
			write(chunk) {
				if (chunk.length > this.#bytes.length - this.#written) return err(failure("received more bytes than the admitted file length"));
				this.#bytes.set(chunk, this.#written);
				this.#written += chunk.length;
				return ok(undefined);
			}
			finish() {
				if (this.#written !== this.#bytes.length) return err(failure("stream ended before the admitted file length"));
				return scanMft(this.#bytes);
			}
		};
		createMftDecoder = (fileBytes) => Number.isSafeInteger(fileBytes) && fileBytes >= 0 && fileBytes <= MFT_MAX_FILE_BYTES ? ok(new StreamingMftDecoder(fileBytes)) : err(limit(`file is ${String(fileBytes)} bytes, exceeding the fixed ${String(MFT_MAX_FILE_BYTES)}-byte (512 MiB) ceiling`, "file-size"));
	})))();
}

//#endregion
//#region dist/domain/inesContainer.js
var malformed, truncated, unsupported, readNesContainerFormat, nesContainerFormat, headerHexSchema, byteSchema, nibbleSchema, mirroringSchema, NES_2_CONSOLE_TYPES, NES_2_TIMINGS, NES_2_BYTE_13_RESERVED, twoBits, declaredRamBytesSchema, classicInesHeaderSchema, nes2HeaderSchema, inesInventorySchema, classicMirroring, classicDeclaration, nes2RomArea, declaredRamBytes, nes2Declaration, parseInesLayout;
function init_inesContainer() {
	return (init_inesContainer = __esmMin((() => {
		init_binaryContainer();
		init_result();
		malformed = (detail, at = {}) => ({
			kind: "malformed",
			format: "ines",
			detail,
			...at
		});
		truncated = (detail, at = {}) => ({
			kind: "truncated",
			format: "ines",
			detail,
			...at
		});
		unsupported = (detail, at = {}) => ({
			kind: "unsupported",
			format: "ines",
			detail,
			undecodedContent: true,
			...at
		});
		readNesContainerFormat = (reader) => {
			const prefix = reader.bytes;
			if (prefix.subarray(0, 4).equals(Buffer.from("UNIF"))) return "unif";
			if (!prefix.subarray(0, 4).equals(Buffer.from([
				78,
				69,
				83,
				26
			]))) return undefined;
			return prefix.length >= 8 && (reader.u8(7) & 12) === 8 ? "nes-2.0" : "ines";
		};
		nesContainerFormat = (prefix) => readNesContainerFormat(new BinaryReader(prefix, true, "ines"));
		headerHexSchema = z.string().regex(/^[a-f0-9]{32}$/u);
		byteSchema = z.number().int().min(0).max(255);
		nibbleSchema = z.number().int().min(0).max(15);
		mirroringSchema = z.enum([
			"horizontal",
			"vertical",
			"four-screen"
		]);
		NES_2_CONSOLE_TYPES = [
			"nes-famicom",
			"vs-system",
			"playchoice-10",
			"extended"
		];
		NES_2_TIMINGS = [
			"ntsc",
			"pal",
			"multiple-region",
			"dendy"
		];
		NES_2_BYTE_13_RESERVED = [
			255,
			0,
			255,
			240
		];
		twoBits = (value) => value & 3;
		declaredRamBytesSchema = z.number().int().min(0).max(64 << 15);
		classicInesHeaderSchema = z.strictObject({
			format: z.literal("ines"),
			header_hex: headerHexSchema,
			prg_rom_units_16k: z.number().int().min(1).max(255),
			chr_rom_units_8k: z.number().int().min(0).max(255),
			mapper: byteSchema,
			flags_6: byteSchema,
			flags_7: byteSchema,
			trainer_present: z.boolean(),
			battery_flag: z.boolean(),
			mirroring: mirroringSchema
		});
		nes2HeaderSchema = z.strictObject({
			format: z.literal("nes-2.0"),
			header_hex: headerHexSchema,
			prg_rom_units_16k: z.number().int().min(1).max(3839).exactOptional(),
			chr_rom_units_8k: z.number().int().min(0).max(3839).exactOptional(),
			prg_rom_bytes: z.number().int().min(1).max(Number.MAX_SAFE_INTEGER),
			chr_rom_bytes: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER),
			mapper: z.number().int().min(0).max(4095),
			submapper: nibbleSchema,
			flags_6: byteSchema,
			flags_7: byteSchema,
			trainer_present: z.boolean(),
			battery_flag: z.boolean(),
			nametable_layout_flags: z.strictObject({
				arrangement_bit: z.boolean(),
				alternative_layout_bit: z.boolean()
			}),
			console_type: z.enum(NES_2_CONSOLE_TYPES),
			vs_ppu_type: nibbleSchema.exactOptional(),
			vs_hardware_type: nibbleSchema.exactOptional(),
			extended_console_type: nibbleSchema.exactOptional(),
			cpu_ppu_timing: z.enum(NES_2_TIMINGS),
			prg_ram_bytes: declaredRamBytesSchema,
			prg_nvram_bytes: declaredRamBytesSchema,
			chr_ram_bytes: declaredRamBytesSchema,
			chr_nvram_bytes: declaredRamBytesSchema,
			misc_rom_count: z.number().int().min(0).max(3),
			default_expansion_device: z.number().int().min(0).max(127)
		});
		inesInventorySchema = z.strictObject({
			header: z.discriminatedUnion("format", [classicInesHeaderSchema, nes2HeaderSchema]),
			reconstruction: z.strictObject({
				region_order: z.array(z.string().min(1)).min(2),
				bytes: z.number().int().min(16).max(Number.MAX_SAFE_INTEGER),
				sha256: z.string().regex(/^[a-f0-9]{64}$/u),
				verified: z.literal(true)
			})
		});
		classicMirroring = (flags6) => (flags6 & 8) !== 0 ? "four-screen" : (flags6 & 1) !== 0 ? "vertical" : "horizontal";
		classicDeclaration = (reader) => {
			const prgUnits = reader.u8(4);
			const chrUnits = reader.u8(5);
			const flags6 = reader.u8(6);
			const flags7 = reader.u8(7);
			if ((flags7 & 12) !== 0) return err(unsupported("unsupported iNES header variant", {
				offset: 7,
				field: "flags 7"
			}));
			if (reader.range(12, 4, "reserved header bytes").some((byte) => byte !== 0)) return err(malformed("ambiguous iNES mapper: reserved header bytes 12..15 are nonzero", {
				offset: 12,
				field: "bytes 12..15"
			}));
			if (prgUnits === 0) return err(malformed("iNES requires at least one PRG-ROM unit", {
				offset: 4,
				field: "PRG-ROM size"
			}));
			return ok({
				prg: {
					bytes: prgUnits * 16384,
					unitBytes: 16384
				},
				chr: {
					bytes: chrUnits * 8192,
					unitBytes: 8192
				},
				header: {
					format: "ines",
					header_hex: reader.range(0, 16, "header").toString("hex"),
					prg_rom_units_16k: prgUnits,
					chr_rom_units_8k: chrUnits,
					mapper: flags6 >>> 4 | flags7 & 240,
					flags_6: flags6,
					flags_7: flags7,
					trainer_present: (flags6 & 4) !== 0,
					battery_flag: (flags6 & 2) !== 0,
					mirroring: classicMirroring(flags6)
				}
			});
		};
		nes2RomArea = (lsb, msb, unitBytes) => msb === 15 ? { bytes: 2 ** (lsb >>> 2) * ((lsb & 3) * 2 + 1) } : {
			bytes: (msb << 8 | lsb) * unitBytes,
			unitBytes
		};
		declaredRamBytes = (shift) => shift === 0 ? 0 : 64 << shift;
		nes2Declaration = (reader) => {
			const byte = (index) => reader.u8(index);
			const flags6 = byte(6);
			const flags7 = byte(7);
			const consoleType = twoBits(flags7);
			for (const [index, reserved] of [
				[12, 252],
				[13, NES_2_BYTE_13_RESERVED[consoleType]],
				[14, 252],
				[15, 128]
			]) if ((byte(index) & reserved) !== 0) return err(malformed(`reserved NES 2.0 header bits are nonzero in byte ${index}`, {
				offset: index,
				field: `byte ${index}`
			}));
			const prg = nes2RomArea(byte(4), byte(9) & 15, 16384);
			const chr = nes2RomArea(byte(5), byte(9) >>> 4, 8192);
			if (prg.bytes === 0) return err(malformed("NES 2.0 requires at least one PRG-ROM unit", {
				offset: 4,
				field: "PRG-ROM size"
			}));
			return ok({
				prg,
				chr,
				header: {
					format: "nes-2.0",
					header_hex: reader.range(0, 16, "header").toString("hex"),
					...prg.unitBytes === undefined ? {} : { prg_rom_units_16k: prg.bytes / prg.unitBytes },
					...chr.unitBytes === undefined ? {} : { chr_rom_units_8k: chr.bytes / chr.unitBytes },
					prg_rom_bytes: prg.bytes,
					chr_rom_bytes: chr.bytes,
					mapper: (byte(8) & 15) << 8 | flags7 & 240 | flags6 >>> 4,
					submapper: byte(8) >>> 4,
					flags_6: flags6,
					flags_7: flags7,
					trainer_present: (flags6 & 4) !== 0,
					battery_flag: (flags6 & 2) !== 0,
					nametable_layout_flags: {
						arrangement_bit: (flags6 & 1) !== 0,
						alternative_layout_bit: (flags6 & 8) !== 0
					},
					console_type: NES_2_CONSOLE_TYPES[consoleType],
					...consoleType === 1 ? {
						vs_ppu_type: byte(13) & 15,
						vs_hardware_type: byte(13) >>> 4
					} : {},
					...consoleType === 3 ? { extended_console_type: byte(13) & 15 } : {},
					cpu_ppu_timing: NES_2_TIMINGS[twoBits(byte(12))],
					prg_ram_bytes: declaredRamBytes(byte(10) & 15),
					prg_nvram_bytes: declaredRamBytes(byte(10) >>> 4),
					chr_ram_bytes: declaredRamBytes(byte(11) & 15),
					chr_nvram_bytes: declaredRamBytes(byte(11) >>> 4),
					misc_rom_count: byte(14) & 3,
					default_expansion_device: byte(15) & 127
				}
			});
		};
		parseInesLayout = (prefix, fileSize) => {
			const reader = new BinaryReader(prefix, true, "ines");
			const format = readNesContainerFormat(reader);
			if (format === undefined) return err(malformed("missing iNES byte signature", {
				offset: 0,
				field: "signature"
			}));
			if (format === "unif") return err(unsupported("unif containers are not supported by the iNES lane", {
				offset: 0,
				field: "signature"
			}));
			if (!Number.isSafeInteger(fileSize) || fileSize < 0) return err(malformed("invalid iNES file extent: expected a nonnegative safe integer", { field: "file extent" }));
			if (fileSize < 16 || prefix.length < 16) return err(truncated("truncated iNES header: expected 16 bytes", {
				offset: 0,
				field: "header"
			}));
			const declared = format === "ines" ? classicDeclaration(reader) : nes2Declaration(reader);
			if (!declared.ok) return declared;
			const { header, prg, chr } = declared.value;
			const label = header.format === "ines" ? "iNES" : "NES 2.0";
			const trainer = header.trainer_present;
			const miscRomCount = header.format === "ines" ? 0 : header.misc_rom_count;
			const declaredEnd = BigInt(16 + (trainer ? 512 : 0)) + BigInt(prg.bytes) + BigInt(chr.bytes);
			if (declaredEnd > BigInt(fileSize)) return err(truncated(`truncated ${label} payload: header declares ${declaredEnd} bytes; file has ${fileSize}`, { field: "payload" }));
			const regions = [{
				path: "header.bin",
				offset: 0,
				length: 16
			}];
			let offset = 16;
			if (trainer) {
				regions.push({
					path: "trainer.bin",
					offset,
					length: 512
				});
				offset += 512;
			}
			for (const [kind, area] of [["prg", prg], ["chr", chr]]) {
				if (area.unitBytes === undefined) {
					regions.push({
						path: `${kind}.bin`,
						offset,
						length: area.bytes
					});
					offset += area.bytes;
					continue;
				}
				for (let index = 0; index < area.bytes / area.unitBytes; index += 1) {
					regions.push({
						path: `${kind}/${String(index).padStart(3, "0")}.bin`,
						offset,
						length: area.unitBytes
					});
					offset += area.unitBytes;
				}
			}
			if (miscRomCount > 0) {
				if (offset === fileSize) return err(truncated(`${label} declares ${miscRomCount} miscellaneous ROM${miscRomCount === 1 ? "" : "s"} but no bytes follow CHR-ROM`, {
					offset,
					field: "miscellaneous ROM"
				}));
				regions.push({
					path: "misc-rom.bin",
					offset,
					length: fileSize - offset
				});
			} else if (offset < fileSize) regions.push({
				path: "trailing.bin",
				offset,
				length: fileSize - offset
			});
			return ok({
				header,
				regions
			});
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/espPartitionTable.js
var ESP_PARTITION_TABLE_DEFAULT_OFFSET, ESP_PARTITION_TABLE_SECTOR_BYTES, ESP_PARTITION_TABLE_MAX_BYTES, ENTRY_BYTES, MAX_ENTRIES, PARTITION_MAGIC, MD5_MAGIC, END_MAGIC, END_TYPE, MD5_DIGEST_OFFSET, KNOWN_FLAGS, partition, decodeEspPartitionTable, TYPE_NAMES, SUBTYPE_NAMES, espPartitionTypeName, espPartitionSubtypeName, APP_TYPE, OTA_DATA_SUBTYPE, DATA_TYPE, BOOTLOADER_TYPE, PARTITION_TABLE_TYPE, PRIMARY_SUBTYPE, OTA_APP_SUBTYPE_FLAG, OTA_APP_SUBTYPE_MASK, espOtaAppSlot, isEspFactoryApp, isEspOtaData, isEspAppPartition, espPrimaryLayoutRole, espBootPartitions;
function init_espPartitionTable() {
	return (init_espPartitionTable = __esmMin((() => {
		init_result();
		init_espImageStructures();
		ESP_PARTITION_TABLE_DEFAULT_OFFSET = 32768;
		ESP_PARTITION_TABLE_SECTOR_BYTES = 4096;
		ESP_PARTITION_TABLE_MAX_BYTES = 3072;
		ENTRY_BYTES = 32;
		MAX_ENTRIES = ESP_PARTITION_TABLE_MAX_BYTES / ENTRY_BYTES;
		PARTITION_MAGIC = 20650;
		MD5_MAGIC = 60395;
		END_MAGIC = 65535;
		END_TYPE = 255;
		MD5_DIGEST_OFFSET = 16;
		KNOWN_FLAGS = 3;
		partition = (entry, index, entryOffset) => {
			const flags = u32(entry, 28);
			const labelBytes = entry.subarray(12, 28);
			const label = cString(labelBytes);
			return {
				index,
				entryOffset,
				type: entry[2] ?? 0,
				subtype: entry[3] ?? 0,
				offset: u32(entry, 4),
				size: u32(entry, 8),
				label,
				labelHex: label === null ? hex(cStringBytes(labelBytes)) : null,
				encrypted: (flags & 1) !== 0,
				readonly: (flags & 2) !== 0,
				unknownFlags: (flags & ~KNOWN_FLAGS) >>> 0
			};
		};
		decodeEspPartitionTable = (bytes) => {
			const partitions = [];
			const limitations = [];
			let md5 = {
				status: "absent",
				entryOffset: null,
				entriesAfterChecksum: 0,
				stored: null,
				computed: null
			};
			let partitionsAfterMd5 = 0;
			for (let slot = 0; slot < MAX_ENTRIES; slot += 1) {
				const at = slot * ENTRY_BYTES;
				const entry = bytes.subarray(at, at + ENTRY_BYTES);
				if (entry.length < ENTRY_BYTES) return err(`the bytes end at ${offsetText(at + entry.length)}, inside entry ${String(slot)}`);
				const magic = u16(entry, 0);
				if (magic === PARTITION_MAGIC) {
					if (md5.entryOffset !== null) partitionsAfterMd5 += 1;
					partitions.push(partition(entry, partitions.length, at));
					continue;
				}
				if (magic === MD5_MAGIC) {
					const computed = createHash("md5").update(bytes.subarray(0, at)).digest("hex");
					const stored = hex(entry.subarray(MD5_DIGEST_OFFSET, ENTRY_BYTES));
					if (md5.status !== "absent") {
						limitations.push(`The partition table has a second MD5 entry at ${offsetText(at)}; ESP-IDF allows one and rejects the table.`);
						md5 = {
							...md5,
							status: "invalid"
						};
						continue;
					}
					md5 = {
						status: stored === computed ? "valid" : "invalid",
						entryOffset: at,
						entriesAfterChecksum: 0,
						stored,
						computed
					};
					if (stored !== computed) limitations.push(`The partition table MD5 at ${offsetText(at)} does not match the entries before it; ESP-IDF's bootloader rejects the table.`);
					continue;
				}
				const terminator = magic === END_MAGIC && entry[2] === END_TYPE && entry[3] === END_TYPE;
				if (terminator && partitions.length > 0) {
					const reported = {
						...md5,
						entriesAfterChecksum: partitionsAfterMd5
					};
					if (reported.entryOffset !== null && reported.entriesAfterChecksum > 0) limitations.push(`${String(reported.entriesAfterChecksum)} partition entries after the MD5 record at table-relative offset ${offsetText(reported.entryOffset)} are outside its checksum coverage.`);
					return ok({
						partitions,
						md5: reported,
						length: at + ENTRY_BYTES,
						limitations
					});
				}
				return err(slot === 0 && magic === END_MAGIC ? "the first entry is empty" : terminator ? `entry ${String(slot)} at ${offsetText(at)} ends the table before any partition entry` : `entry ${String(slot)} at ${offsetText(at)} has magic ${offsetText(magic)}, not a partition, MD5 or terminating entry`);
			}
			return err(`no terminating entry within ${String(MAX_ENTRIES)} entries (${offsetText(ESP_PARTITION_TABLE_MAX_BYTES)} bytes)`);
		};
		TYPE_NAMES = {
			0: "app",
			1: "data",
			2: "bootloader",
			3: "partition_table"
		};
		SUBTYPE_NAMES = {
			0: {
				0: "factory",
				32: "test",
				...Object.fromEntries(Array.from({ length: 16 }, (_, slot) => [16 + slot, `ota_${String(slot)}`])),
				48: "tee_0",
				49: "tee_1"
			},
			1: {
				0: "ota",
				1: "phy",
				2: "nvs",
				3: "coredump",
				4: "nvs_keys",
				5: "efuse",
				6: "undefined",
				128: "esphttpd",
				129: "fat",
				130: "spiffs",
				131: "littlefs",
				144: "tee_ota"
			},
			2: {
				0: "primary",
				1: "ota",
				2: "recovery"
			},
			3: {
				0: "primary",
				1: "ota"
			}
		};
		espPartitionTypeName = (type) => TYPE_NAMES[type] ?? null;
		espPartitionSubtypeName = (type, subtype) => SUBTYPE_NAMES[type]?.[subtype] ?? null;
		APP_TYPE = 0;
		OTA_DATA_SUBTYPE = 0;
		DATA_TYPE = 1;
		BOOTLOADER_TYPE = 2;
		PARTITION_TABLE_TYPE = 3;
		PRIMARY_SUBTYPE = 0;
		OTA_APP_SUBTYPE_FLAG = 16;
		OTA_APP_SUBTYPE_MASK = 15;
		espOtaAppSlot = (part) => part.type === APP_TYPE && (part.subtype & ~OTA_APP_SUBTYPE_MASK) === OTA_APP_SUBTYPE_FLAG ? part.subtype & OTA_APP_SUBTYPE_MASK : null;
		isEspFactoryApp = (part) => part.type === APP_TYPE && part.subtype === 0;
		isEspOtaData = (part) => part.type === DATA_TYPE && part.subtype === OTA_DATA_SUBTYPE;
		isEspAppPartition = (part) => part.type === APP_TYPE;
		espPrimaryLayoutRole = (part) => {
			if (part.subtype !== PRIMARY_SUBTYPE) return undefined;
			if (part.type === BOOTLOADER_TYPE) return "bootloader";
			return part.type === PARTITION_TABLE_TYPE ? "partition-table" : undefined;
		};
		espBootPartitions = (partitions) => {
			let factory;
			let otadata;
			let otaAppCount = 0;
			const otaSlots = new Map();
			const roles = new Map();
			for (const part of partitions) {
				const slot = espOtaAppSlot(part);
				const role = isEspFactoryApp(part) ? "factory" : isEspOtaData(part) ? "otadata" : slot === null ? undefined : `ota_${String(slot)}`;
				if (role === undefined) continue;
				roles.set(role, [...roles.get(role) ?? [], part]);
				if (role === "factory") factory = part;
				else if (role === "otadata") otadata = part;
				else if (slot !== null) {
					otaSlots.set(slot, part);
					otaAppCount += 1;
				}
			}
			const limitations = [...roles].flatMap(([role, parts]) => parts.length < 2 ? [] : [`The table declares ${role} ${String(parts.length)} times (partitions ${parts.map(({ index }) => `#${String(index)}`).join(", ")}); ESP-IDF's bootloader uses the last.`]);
			return {
				factory,
				otadata,
				otaSlots,
				otaAppCount,
				limitations
			};
		};
	})))();
}

//#endregion
//#region dist/domain/firmware/espFlashSelection.js
var espFlashAddressSchema, parseEspFlashAddress, espFlashSelectionError;
function init_espFlashSelection() {
	return (init_espFlashSelection = __esmMin((() => {
		init_espPartitionTable();
		espFlashAddressSchema = z.string().regex(/^0x[0-9a-fA-F]{1,8}$/u, { message: "must be a hexadecimal flash address of the form 0x…" });
		parseEspFlashAddress = (text) => Number.parseInt(text.slice(2), 16);
		espFlashSelectionError = (input) => {
			if ((input.flashOffset !== undefined || input.partitionTableOffset !== undefined) && input.format !== "esp-flash-image") return "flash_offset and partition_table_offset apply only with format=esp-flash-image";
			if (input.partitionTableOffset !== undefined && input.partitionTableOffset % 4096 !== 0) return "partition_table_offset must be a multiple of 0x1000, as ESP-IDF requires";
			return undefined;
		};
	})))();
}

//#endregion
export { ESP_PARTITION_TABLE_DEFAULT_OFFSET, ESP_PARTITION_TABLE_MAX_BYTES, ESP_PARTITION_TABLE_SECTOR_BYTES, createMftDecoder, decodeEspPartitionTable, espBootPartitions, espFlashAddressSchema, espFlashSelectionError, espPartitionSubtypeName, espPartitionTypeName, espPrimaryLayoutRole, hasMftFileRecordHeader, hasVerifiedMftRecordIdentity, inesInventorySchema, init_espFlashSelection, init_espPartitionTable, init_inesContainer, init_ntfsMft, init_ntfsMftAttributes, isEspAppPartition, nesContainerFormat, ntfsAttributeIssueSchema, ntfsAttributeListResolutionSchema, ntfsAttributeSchema, ntfsFileNameSchema, ntfsFileReferenceSchema, parseEspFlashAddress, parseInesLayout, parseMftIndex, selectMftMetadata };