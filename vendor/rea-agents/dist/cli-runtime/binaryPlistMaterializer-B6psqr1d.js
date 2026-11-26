import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, decodeLimit, init_parseFailure, malformedInput, truncatedInput, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { init_internalInvariant, init_strictUtf8, invariantViolation, isStrictUtf8 } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_excerpt, quotedExcerpt } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { PlistNestingLimitError, createPlistNumberCollector, init_plistNumbers, init_plistUid, init_plistValue, markPlistDictionary } from "./plistValue-B9ZFeVoz.js";
import { byteOrderMarkEncoding, decodeXmlPlistText, init_propertyListXmlText, init_textByteOrderMark } from "./propertyListXmlText-8rMzCv3L.js";
import { hasBinaryPlistSignature, init_appleArchiveFormat } from "./appleArchiveFormat-B-JoSBSY.js";
import { parseBinary } from "plist";

//#region dist/domain/apple/binaryPlistLayout.js
var readBinaryPlistUnsigned64, readBinaryPlistLayout;
function init_binaryPlistLayout() {
	return (init_binaryPlistLayout = __esmMin((() => {
		init_result();
		readBinaryPlistUnsigned64 = (bytes, offset, width) => {
			let value = 0n;
			for (let index = 0; index < width; index += 1) value = BigInt.asUintN(64, value << 8n | BigInt(bytes[offset + index] ?? 0));
			return value;
		};
		readBinaryPlistLayout = (bytes) => {
			if (bytes.byteLength < 32) return err({
				_tag: "InvalidBinaryPlistLayout",
				reason: "truncated"
			});
			const trailerOffset = bytes.byteLength - 32;
			const offsetWidth = bytes[trailerOffset + 6];
			const referenceWidth = bytes[trailerOffset + 7];
			const objectCount = readBinaryPlistUnsigned64(bytes, trailerOffset + 8, 8);
			const offsetTable = readBinaryPlistUnsigned64(bytes, trailerOffset + 24, 8);
			const objectOffset = (object) => readBinaryPlistUnsigned64(bytes, Number(offsetTable) + object * offsetWidth, offsetWidth);
			return ok({
				trailerOffset,
				offsetWidth,
				referenceWidth,
				objectCount,
				topObject: readBinaryPlistUnsigned64(bytes, trailerOffset + 16, 8),
				offsetTable,
				objectOffset,
				*objectOffsets() {
					for (let object = 0; object < Number(objectCount); object += 1) yield objectOffset(object);
				}
			});
		};
	})))();
}

//#endregion
//#region dist/domain/apple/plistScalars.js
var containsSortedOffset, UnsupportedBinaryPlistUidError, readBinaryPlistUidValue, normalizedUidWidth, binaryPlistUidNormalizationWidth, binaryPlistUidRecord, binaryPlistContainerRecord, binaryPlistCloneOffsetWidth, APPLE_EPOCH_MILLISECONDS, binaryDateRequiresExactSeconds, binaryPlistObjectEnd, scanBinaryPlistScalars, decodeBinaryPlistScalars, cloneBinaryPlistObjects;
function init_plistScalars() {
	return (init_plistScalars = __esmMin((() => {
		init_binaryContainer();
		init_parseFailure();
		init_internalInvariant();
		init_binaryPlistLayout();
		init_plistNumbers();
		init_appleArchiveFormat();
		containsSortedOffset = (offsets, target) => {
			let low = 0;
			let high = offsets.length;
			while (low < high) {
				const middle = low + Math.floor((high - low) / 2);
				const value = offsets[middle];
				if (value === target) return true;
				if (value === undefined || value < target) low = middle + 1;
				else high = middle;
			}
			return false;
		};
		UnsupportedBinaryPlistUidError = class extends ParseFailureError {
			decimalValue;
			sourceWidth;
			constructor(decimalValue, sourceWidth) {
				super({
					kind: "unsupported",
					format: "binary-plist",
					detail: `binary plist UID value ${decimalValue} in ${sourceWidth}-byte encoding exceeds the exact supported range`,
					field: "uid",
					undecodedContent: true
				});
				this.decimalValue = decimalValue;
				this.sourceWidth = sourceWidth;
				this.name = "UnsupportedBinaryPlistUidError";
			}
		};
		readBinaryPlistUidValue = (bytes, offset, width) => {
			let value = 0n;
			for (let index = 0; index < width; index += 1) value = value << 8n | BigInt(bytes[offset + 1 + index] ?? 0);
			if (value > BigInt(Number.MAX_SAFE_INTEGER)) throw new UnsupportedBinaryPlistUidError(value.toString(), width);
			return value;
		};
		normalizedUidWidth = (value) => value <= 255n ? 1 : value <= 65535n ? 2 : value <= 4294967295n ? 4 : 8;
		binaryPlistUidNormalizationWidth = (bytes, offset) => {
			const marker = bytes[offset];
			if (marker === undefined || marker >> 4 !== 8) return undefined;
			const sourceWidth = (marker & 15) + 1;
			const value = readBinaryPlistUidValue(bytes, offset, sourceWidth);
			if ([
				1,
				2,
				4,
				8
			].includes(sourceWidth)) return undefined;
			const targetWidth = normalizedUidWidth(value);
			return targetWidth === sourceWidth ? undefined : targetWidth;
		};
		binaryPlistUidRecord = (bytes, offset, targetWidth) => {
			const sourceWidth = (bytes[offset] & 15) + 1;
			let value = readBinaryPlistUidValue(bytes, offset, sourceWidth);
			const width = targetWidth ?? normalizedUidWidth(value);
			const record = Buffer.alloc(width + 1);
			record[0] = 128 | width - 1;
			for (let byte = width - 1; byte >= 0; byte -= 1) {
				record[byte + 1] = Number(value & 255n);
				value >>= 8n;
			}
			return record;
		};
		binaryPlistContainerRecord = (bytes, container, targetWidth) => {
			const record = Buffer.alloc(container.headerLength + container.references.length * targetWidth);
			bytes.copy(record, 0, container.offset, container.offset + container.headerLength);
			for (let index = 0; index < container.references.length; index += 1) {
				let value = BigInt(container.references[index] ?? 0);
				for (let byte = targetWidth - 1; byte >= 0; byte -= 1) {
					record[container.headerLength + index * targetWidth + byte] = Number(value & 255n);
					value >>= 8n;
				}
			}
			return record;
		};
		binaryPlistCloneOffsetWidth = (currentWidth, firstCloneOffset, cloneRecordLengths) => {
			const tableOffset = firstCloneOffset + cloneRecordLengths.reduce((sum, length) => sum + length, 0);
			const widths = [
				1,
				2,
				4,
				8
			];
			if (widths.includes(currentWidth) && (currentWidth === 8 || tableOffset < 2 ** (currentWidth * 8))) return currentWidth;
			return widths.find((width) => width === 8 ? tableOffset <= Number.MAX_SAFE_INTEGER : tableOffset < 2 ** (width * 8));
		};
		APPLE_EPOCH_MILLISECONDS = 9783072e5;
		binaryDateRequiresExactSeconds = (secondsSince2001) => {
			if (!Number.isFinite(secondsSince2001)) return false;
			const date = new Date(secondsSince2001 * 1e3 + APPLE_EPOCH_MILLISECONDS);
			return Number.isFinite(date.getTime()) && (date.getTime() - APPLE_EPOCH_MILLISECONDS) / 1e3 !== secondsSince2001;
		};
		binaryPlistObjectEnd = (bytes, offset, objectEnd, referenceWidth) => {
			const marker = bytes[offset];
			if (marker === undefined) return undefined;
			const type = marker >> 4;
			let length = marker & 15;
			let cursor = offset + 1;
			if (length === 15 && type !== 0 && type !== 8) {
				const extendedMarker = bytes[cursor];
				if (extendedMarker === undefined || extendedMarker >> 4 !== 1) return undefined;
				const width = 1 << (extendedMarker & 15);
				if (width > 8 || cursor + 1 + width > objectEnd) return undefined;
				cursor += 1;
				const extendedLength = readBinaryPlistUnsigned64(bytes, cursor, width);
				if (extendedLength > BigInt(Number.MAX_SAFE_INTEGER)) return undefined;
				length = Number(extendedLength);
				cursor += width;
			}
			let payloadLength;
			if (type === 0) payloadLength = 0;
			else if (type === 1 || type === 2) {
				if ((marker & 15) > 4) return undefined;
				payloadLength = 1 << (marker & 15);
			} else if (type === 3) {
				if (marker !== 51) return undefined;
				payloadLength = 8;
			} else if (type === 4 || type === 5 || type === 7) {
				payloadLength = length;
			} else if (type === 6) {
				payloadLength = length * 2;
			} else if (type === 8) {
				payloadLength = (marker & 15) + 1;
			} else if (type === 10 || type === 11 || type === 12) {
				payloadLength = length * referenceWidth;
			} else if (type === 13) {
				payloadLength = length * 2 * referenceWidth;
			} else return undefined;
			const end = cursor + payloadLength;
			return Number.isSafeInteger(end) && end <= objectEnd ? end : undefined;
		};
		scanBinaryPlistScalars = (bytes, scalarPlan) => {
			const output = createPlistNumberCollector();
			const wideIntegers = [];
			const dates = [];
			const result = (incomplete) => ({
				literals: output.result(incomplete),
				wideIntegers,
				dates
			});
			if (bytes.length < 40 || !hasBinaryPlistSignature(bytes)) return result(true);
			const sourceLayoutResult = readBinaryPlistLayout(bytes);
			if (!sourceLayoutResult.ok) return result(true);
			const sourceLayout = sourceLayoutResult.value;
			const { trailerOffset: trailer, offsetWidth, referenceWidth, objectCount: countRaw, offsetTable: tableRaw } = sourceLayout;
			if (offsetWidth < 1) return result(true);
			const safeMaximum = BigInt(Number.MAX_SAFE_INTEGER);
			if (countRaw === 0n || countRaw > safeMaximum || tableRaw > safeMaximum) return result(true);
			if (tableRaw < 8n || tableRaw >= BigInt(trailer)) return result(true);
			const offsetTable = Number(tableRaw);
			const capacity = Math.floor((trailer - offsetTable) / offsetWidth);
			if (countRaw > BigInt(capacity)) return result(true);
			const count = Number(countRaw);
			const tableEnd = offsetTable + count * offsetWidth;
			if (referenceWidth < 1) return result(true);
			const reader = new BinaryReader(bytes.subarray(0, offsetTable), false, "binary-plist");
			const objectOffsets = [];
			let incomplete = false;
			for (let index = 0; index < count; index += 1) {
				const rawOffset = sourceLayout.objectOffset(index);
				const offset = rawOffset > safeMaximum ? undefined : Number(rawOffset);
				if (offset === undefined || offset < 8 || offset >= offsetTable && offset < tableEnd || offset >= trailer) {
					incomplete = true;
					continue;
				}
				objectOffsets.push(offset);
			}
			const sortedOffsets = [...new Set(objectOffsets)].sort((a, b) => a - b);
			const validOffsets = new Set();
			for (const offset of sortedOffsets) {
				const encodedEnd = binaryPlistObjectEnd(bytes, offset, trailer, referenceWidth);
				if (encodedEnd === undefined) {
					incomplete = true;
					continue;
				}
				validOffsets.add(offset);
			}
			const visitedOffsets = new Set();
			for (const offset of objectOffsets) {
				if (!visitedOffsets.has(offset)) {
					const marker = bytes[offset] ?? 0;
					if (marker === 51 && offset + 9 <= offsetTable && (scalarPlan === undefined || containsSortedOffset(scalarPlan.reachableDateOffsets, offset))) {
						const payloadOffset = offset + 1;
						dates.push({
							offset,
							payloadOffset,
							secondsSince2001: reader.f64(payloadOffset)
						});
					}
				}
				if (!validOffsets.has(offset)) {
					incomplete = true;
					continue;
				}
				if (visitedOffsets.has(offset)) continue;
				visitedOffsets.add(offset);
				const marker = bytes[offset] ?? 0;
				const type = marker >> 4;
				if (type === 3 && marker === 51) {
					if (offset + 9 > offsetTable) incomplete = true;
					continue;
				}
				if (type !== 1 && type !== 2) continue;
				const width = 2 ** (marker & 15);
				if (offset + 1 + width > offsetTable) {
					incomplete = true;
					continue;
				}
				const isReachable = scalarPlan === undefined || containsSortedOffset(scalarPlan.reachableNumericOffsets, offset);
				if (type === 1 && width === 8) {
					const value = reader.i64(offset + 1);
					if (isReachable) output.integer(value);
				} else if (type === 1 && width === 16) {
					const value = BigInt.asIntN(128, reader.word(offset + 1, 64) << 64n | reader.word(offset + 9, 64));
					if (isReachable) {
						output.integer(value);
						if (scalarPlan === undefined || containsSortedOffset(scalarPlan.reachableWideIntegerOffsets, offset)) wideIntegers.push({
							offset,
							value
						});
					}
				} else if (type === 1 && width > 4) {
					incomplete = true;
				} else if (type === 2 && width === 4) {
					const value = reader.f32(offset + 1);
					if (isReachable) output.real(value);
				} else if (type === 2 && width === 8) {
					const value = reader.f64(offset + 1);
					if (isReachable) output.real(value);
				} else if (type === 2) {
					incomplete = true;
				}
			}
			return result(incomplete);
		};
		decodeBinaryPlistScalars = (bytes, metadata, scalarPlan) => {
			const reachableDateOffsets = new Set(scalarPlan.reachableDateOffsets);
			const overlappingDateOffsets = new Set(scalarPlan.overlappingDateOffsets);
			const reachableWideIntegerOffsets = new Set(scalarPlan.reachableWideIntegerOffsets);
			const overlappingWideIntegerOffsets = new Set(scalarPlan.overlappingWideIntegerOffsets);
			const unrepresentableDates = metadata.dates.filter(({ offset, secondsSince2001 }) => reachableDateOffsets.has(offset) && binaryDateRequiresExactSeconds(secondsSince2001));
			const reachableWideIntegers = metadata.wideIntegers.filter(({ offset }) => reachableWideIntegerOffsets.has(offset));
			const replacements = new Map();
			for (const { offset, width } of scalarPlan.uidOffsetsToNormalize) replacements.set(offset, binaryPlistUidRecord(bytes, offset, width));
			for (const { offset } of unrepresentableDates) if (overlappingDateOffsets.has(offset)) {
				const replacement = Buffer.from(bytes.subarray(offset, offset + 9));
				replacement.writeDoubleBE(Number.NaN, 1);
				replacements.set(offset, replacement);
			}
			for (const { offset, value } of reachableWideIntegers) if (overlappingWideIntegerOffsets.has(offset)) {
				const replacement = Buffer.alloc(9);
				replacement[0] = 35;
				replacement.writeDoubleBE(Number(value), 1);
				replacements.set(offset, replacement);
			}
			const sourceLayoutResult = readBinaryPlistLayout(bytes);
			if (!sourceLayoutResult.ok) throw invariantViolation("binary plist trailer was not validated by its preflight");
			const sourceLayout = sourceLayoutResult.value;
			const sourceReferenceSize = sourceLayout.referenceWidth;
			const normalizedReferenceSize = scalarPlan.normalizedReferenceSize ?? sourceReferenceSize;
			for (const container of scalarPlan.containersToNormalize ?? []) replacements.set(container.offset, binaryPlistContainerRecord(bytes, container, normalizedReferenceSize));
			const needsTableNormalization = (scalarPlan.normalizedOffsetSize ?? sourceLayout.offsetWidth) !== sourceLayout.offsetWidth || normalizedReferenceSize !== sourceReferenceSize;
			if (reachableWideIntegers.length === 0 && unrepresentableDates.length === 0 && replacements.size === 0 && !needsTableNormalization) return bytes;
			const compatible = replacements.size === 0 && !needsTableNormalization ? Buffer.from(bytes) : cloneBinaryPlistObjects(bytes, sourceLayout, replacements, scalarPlan.normalizedOffsetSize ?? sourceLayout.offsetWidth, normalizedReferenceSize);
			for (const { offset, value } of reachableWideIntegers) {
				if (overlappingWideIntegerOffsets.has(offset)) continue;
				compatible[offset] = 35;
				compatible.writeDoubleBE(Number(value), offset + 1);
			}
			for (const { offset, payloadOffset } of unrepresentableDates) {
				if (!overlappingDateOffsets.has(offset)) compatible.writeDoubleBE(Number.NaN, payloadOffset);
			}
			return compatible;
		};
		cloneBinaryPlistObjects = (bytes, sourceLayout, replacements, normalizedOffsetSize, normalizedReferenceSize) => {
			const trailerOffset = sourceLayout.trailerOffset;
			const offsetSize = sourceLayout.offsetWidth;
			const objectCount = Number(sourceLayout.objectCount);
			const offsets = [...sourceLayout.objectOffsets()];
			const cloneEntries = [...replacements.entries()];
			const replacementLengths = cloneEntries.map(([, record]) => record.length);
			const newOffsetSize = normalizedOffsetSize ?? binaryPlistCloneOffsetWidth(offsetSize, trailerOffset, replacementLengths);
			if (newOffsetSize === undefined) throw unsupportedInput("plist", "binary plist cloned scalar offset exceeds supported width");
			const cloneStart = trailerOffset;
			const cloneBytes = replacementLengths.reduce((sum, length) => sum + length, 0);
			const newTableOffset = cloneStart + cloneBytes;
			const newLength = bytes.length + cloneBytes + objectCount * newOffsetSize;
			if (!Number.isSafeInteger(newLength)) throw unsupportedInput("plist", "binary plist cloned scalar representation is too large");
			const compatible = Buffer.alloc(newLength);
			bytes.copy(compatible, 0, 0, trailerOffset);
			const cloneOffsetBySource = new Map();
			let cloneCursor = cloneStart;
			cloneEntries.forEach(([sourceOffset, replacement]) => {
				const cloneOffset = cloneCursor;
				cloneOffsetBySource.set(sourceOffset, BigInt(cloneOffset));
				replacement.copy(compatible, cloneOffset);
				cloneCursor += replacement.length;
			});
			const tableStart = newTableOffset;
			const tableEnd = tableStart + objectCount * newOffsetSize;
			offsets.forEach((sourceOffset, index) => {
				const sourceNumber = sourceOffset <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(sourceOffset) : undefined;
				let value = sourceNumber === undefined ? sourceOffset : cloneOffsetBySource.get(sourceNumber) ?? sourceOffset;
				for (let byte = newOffsetSize - 1; byte >= 0; byte -= 1) {
					compatible[tableStart + index * newOffsetSize + byte] = Number(value & 255n);
					value >>= 8n;
				}
			});
			const trailer = Buffer.from(bytes.subarray(trailerOffset));
			trailer[6] = newOffsetSize;
			if (normalizedReferenceSize !== undefined) trailer[7] = normalizedReferenceSize;
			trailer.writeBigUInt64BE(BigInt(newTableOffset), 24);
			trailer.copy(compatible, tableEnd);
			return compatible;
		};
	})))();
}

//#endregion
//#region dist/domain/apple/propertyListDecodeBudget.js
/**
* Consume each XML span once; malformed tokens cannot restart suffix scans.
* Each token reports the DOM node it creates (none for an end tag), whether
* character data, which becomes a text node, precedes it, and the references
* the parser expands in that text and in the tag's attribute values. Opaque
* comment, CDATA, PI and declaration content holds no references.
*/
function* xmlPreflightTokens(xml) {
	const textReferences = (from, to) => {
		let count = 0;
		for (let index = from; index < to; index += 1) if (xml.charCodeAt(index) === 38) count += 1;
		return count;
	};
	let cursor = 0;
	while (cursor < xml.length) {
		const start = xml.indexOf("<", cursor);
		if (start < 0) {
			yield {
				kind: "none",
				text: true,
				attributes: 0,
				references: textReferences(cursor, xml.length),
				internalSubset: false
			};
			return;
		}
		const text = start > cursor;
		const references = textReferences(cursor, start);
		const opaqueEnd = xml.startsWith("<!--", start) ? "-->" : xml.startsWith("<![CDATA[", start) ? "]]>" : xml.startsWith("<?", start) ? "?>" : undefined;
		if (opaqueEnd !== undefined) {
			const end = xml.indexOf(opaqueEnd, start + 2);
			if (end < 0) return;
			cursor = end + opaqueEnd.length;
			yield {
				kind: "node",
				text,
				attributes: 0,
				references,
				internalSubset: false
			};
			continue;
		}
		const doctype = /^<!DOCTYPE\b/iu.test(xml.slice(start, start + 10));
		const declaration = xml[start + 1] === "!";
		const endTag = xml[start + 1] === "/";
		const element = !declaration && !endTag;
		let quote;
		let internalSubset = false;
		let attributes = 0;
		let attributeReferences = 0;
		let end = start + 1;
		for (; end < xml.length; end += 1) {
			const character = xml[end];
			if (quote !== undefined) {
				if (character === quote) quote = undefined;
				else if (element && character === "&") attributeReferences += 1;
			} else if (character === "\"" || character === "'") quote = character;
			else if (character === ">") break;
			else if (character === "=") attributes += 1;
			else if (doctype && character === "[") {
				const emptySubsetEnd = emptyInternalSubsetEnd(xml, end);
				if (emptySubsetEnd === undefined) internalSubset = true;
				else end = emptySubsetEnd;
			}
		}
		if (end === xml.length) return;
		cursor = end + 1;
		yield {
			kind: element ? "element" : declaration ? "node" : "none",
			text,
			attributes,
			references: references + attributeReferences,
			internalSubset
		};
	}
}
var DEFAULT_PLIST_DECODE_BUDGET, preflightPropertyListDecode, preflightXmlPropertyListDecode, XML_ELEMENT_BYTES, XML_NUMBER_PROJECTION_ELEMENT_BYTES, XML_NODE_BYTES, XML_REFERENCE_BYTES, estimateXmlPlistExpansion, emptyInternalSubsetEnd, MAX_BINARY_PLIST_NESTING_DEPTH, PLIST_DECODE_BYTES_LIMIT, decodeBudgetExceeded, isPlistDecodeBudgetFailure, findOverlappingScalarOffsets, estimateBinaryPlistExpansion;
function init_propertyListDecodeBudget() {
	return (init_propertyListDecodeBudget = __esmMin((() => {
		init_binaryContainer();
		init_binaryPlistLayout();
		init_propertyListXmlText();
		init_appleArchiveFormat();
		init_plistValue();
		init_parseFailure();
		init_plistScalars();
		DEFAULT_PLIST_DECODE_BUDGET = "the property list decode budget";
		preflightPropertyListDecode = (bytes, maxBytes, xmlText, options = {}) => {
			const { numberProjection = false, uidProjection = false, budget = DEFAULT_PLIST_DECODE_BUDGET } = options;
			if (hasBinaryPlistSignature(bytes)) return estimateBinaryPlistExpansion(bytes, maxBytes, {
				numberProjection,
				uidProjection,
				budget
			});
			return {
				estimatedBytes: preflightXmlPropertyListDecode(xmlText ?? decodeXmlPlistText(bytes), maxBytes, {
					numberProjection,
					budget
				}),
				datePrecisionOverlapCount: 0,
				reachableDateOffsets: [],
				overlappingDateOffsets: [],
				reachableWideIntegerOffsets: [],
				overlappingWideIntegerOffsets: [],
				reachableNumericOffsets: [],
				uidOffsetsToNormalize: [],
				containersToNormalize: [],
				normalizedOffsetSize: 1,
				normalizedReferenceSize: 1
			};
		};
		preflightXmlPropertyListDecode = (xml, maxBytes, { numberProjection = false, budget = DEFAULT_PLIST_DECODE_BUDGET } = {}) => {
			const estimatedBytes = estimateXmlPlistExpansion(xml, maxBytes, numberProjection, budget);
			if (estimatedBytes > maxBytes) throw decodeBudgetExceeded(`plist representation exceeds ${budget}`, maxBytes);
			return estimatedBytes;
		};
		XML_ELEMENT_BYTES = 1280;
		XML_NUMBER_PROJECTION_ELEMENT_BYTES = 256;
		XML_NODE_BYTES = 384;
		XML_REFERENCE_BYTES = 64;
		estimateXmlPlistExpansion = (xml, maxBytes, numberProjection, budget) => {
			let estimate = xml.length * 4;
			const elementBytes = XML_ELEMENT_BYTES + (numberProjection ? XML_NUMBER_PROJECTION_ELEMENT_BYTES : 0);
			for (const token of xmlPreflightTokens(xml)) {
				if (token.internalSubset) throw decodeBudgetExceeded(`XML plist internal entity expansion exceeds ${budget}`, maxBytes);
				if (token.text) estimate += XML_NODE_BYTES;
				estimate += token.references * XML_REFERENCE_BYTES;
				if (token.kind === "element") estimate += elementBytes + token.attributes * XML_NODE_BYTES;
				else if (token.kind === "node") estimate += XML_NODE_BYTES;
				if (estimate > maxBytes) return maxBytes + 1;
			}
			return estimate;
		};
		emptyInternalSubsetEnd = (xml, open) => {
			let close = open + 1;
			while (close < xml.length && " 	\r\n".includes(xml[close] ?? "x")) close += 1;
			return xml[close] === "]" ? close : undefined;
		};
		MAX_BINARY_PLIST_NESTING_DEPTH = 128;
		PLIST_DECODE_BYTES_LIMIT = "plist-decode-bytes";
		decodeBudgetExceeded = (detail, maximum) => decodeLimit("plist", detail, {
			name: PLIST_DECODE_BYTES_LIMIT,
			maximum
		});
		isPlistDecodeBudgetFailure = (cause) => cause instanceof ParseFailureError && cause.failure.kind === "limit" && cause.failure.limit.name === "plist-decode-bytes";
		findOverlappingScalarOffsets = (spans, scalarOffsets) => {
			let maxPriorEnd = -1;
			const overlappingOffsets = new Set();
			const activeScalars = new Map();
			for (const span of spans) {
				for (const [offset, end] of activeScalars) if (end <= span.offset) activeScalars.delete(offset);
				if (scalarOffsets.has(span.offset)) {
					if (maxPriorEnd > span.offset) {
						overlappingOffsets.add(span.offset);
						for (const activeOffset of activeScalars.keys()) overlappingOffsets.add(activeOffset);
						activeScalars.clear();
					} else activeScalars.set(span.offset, span.end);
				} else {
					for (const activeOffset of activeScalars.keys()) overlappingOffsets.add(activeOffset);
					activeScalars.clear();
				}
				maxPriorEnd = Math.max(maxPriorEnd, span.end);
			}
			return overlappingOffsets;
		};
		estimateBinaryPlistExpansion = (bytes, maxBytes, { budget = DEFAULT_PLIST_DECODE_BUDGET, bounds = "strict", numberProjection = false, uidProjection = false, maximumDepth = 128 } = {}) => {
			if (bytes.length < 40) throw truncatedInput("plist", "binary plist trailer is truncated");
			const sourceLayoutResult = readBinaryPlistLayout(bytes);
			if (!sourceLayoutResult.ok) throw truncatedInput("plist", "binary plist trailer is truncated");
			const sourceLayout = sourceLayoutResult.value;
			const { trailerOffset: trailer, offsetWidth: offsetSize, referenceWidth: referenceSize } = sourceLayout;
			if (offsetSize < 1 || referenceSize < 1) throw malformedInput("plist", "binary plist trailer integer sizes are invalid");
			const safeDeclaration = (value) => value <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(value) : -1;
			const readInteger = (offset, size) => {
				if (offset < 0 || size < 1 || offset + size > bytes.length) return -1;
				return safeDeclaration(readBinaryPlistUnsigned64(bytes, offset, size));
			};
			const objectCount = safeDeclaration(sourceLayout.objectCount);
			const topObject = safeDeclaration(sourceLayout.topObject);
			const offsetTable = safeDeclaration(sourceLayout.offsetTable);
			const tableEnd = bounds === "strict" ? trailer : bytes.length;
			const objectsEnd = bounds === "strict" ? offsetTable : bytes.length;
			if (objectCount < 1 || topObject < 0 || topObject >= objectCount || offsetTable < 8 || !Number.isSafeInteger(objectCount * offsetSize) || !Number.isSafeInteger(offsetTable + objectCount * offsetSize) || offsetTable + objectCount * offsetSize > tableEnd) throw malformedInput("plist", "binary plist trailer or object table is invalid");
			if (offsetSize < 8 && offsetTable >= 2 ** (offsetSize * 8) || referenceSize < 8 && objectCount >= 2 ** (referenceSize * 8)) throw malformedInput("plist", "binary plist table width cannot address its contents");
			const normalizedReferenceSize = [
				1,
				2,
				4,
				8
			].includes(referenceSize) && (referenceSize === 8 || objectCount < 2 ** (referenceSize * 8)) ? referenceSize : [
				1,
				2,
				4,
				8
			].find((width) => width === 8 || objectCount < 2 ** (width * 8));
			if (normalizedReferenceSize === undefined) throw malformedInput("plist", "binary plist object reference count is invalid");
			const objectBytes = numberProjection || uidProjection ? 512 : 256;
			const expandedNodeBytes = numberProjection || uidProjection ? 224 : 96;
			let estimate = bytes.length * (numberProjection ? 4 : 3) + objectCount * objectBytes;
			if (estimate > maxBytes) throw decodeBudgetExceeded(`binary plist object table exceeds ${budget}`, maxBytes);
			const active = new Set();
			const pending = [{
				object: topObject,
				depth: 0,
				exit: false,
				dictionaryKey: false
			}];
			const scalarObjects = new Map();
			const sourceContainers = new Map();
			const reader = new BinaryReader(bytes.subarray(0, objectsEnd), false, "binary-plist");
			const dictionaryKeys = new Map();
			const readDictionaryKey = (object) => {
				const prior = dictionaryKeys.get(object);
				if (prior !== undefined) return prior;
				const offset = safeDeclaration(sourceLayout.objectOffset(object));
				if (offset < 8 || offset >= objectsEnd) throw malformedInput("plist", "binary plist object offset is invalid");
				const marker = bytes[offset] ?? 0;
				const type = marker >> 4;
				if (type !== 5 && type !== 6) throw malformedInput("plist", "binary plist dictionary key is not a string");
				let size = marker & 15;
				let cursor = offset + 1;
				if (size === 15) {
					const extended = bytes[cursor] ?? 0;
					if (extended >> 4 !== 1 || (extended & 15) > 3) throw malformedInput("plist", "binary plist extended object size is invalid");
					const width = 1 << (extended & 15);
					size = readInteger(cursor + 1, width);
					cursor += 1 + width;
					if (cursor > objectsEnd) throw truncatedInput("plist", "binary plist extended object size is truncated");
					if (size < 0) throw malformedInput("plist", "binary plist extended object size is invalid");
				}
				if (cursor + size * (type === 6 ? 2 : 1) > objectsEnd) throw truncatedInput("plist", "binary plist scalar object is truncated");
				let key = "";
				for (let index = 0; index < size; index += 1) key += String.fromCharCode(type === 5 ? bytes[cursor + index] : reader.u16(cursor + index * 2));
				dictionaryKeys.set(object, key);
				return key;
			};
			let pendingObjectCount = 1;
			const reachableObjectOffsets = new Set();
			const reachableDateOffsets = new Set();
			const reachableWideIntegerOffsets = new Set();
			const reachableNumericOffsets = new Set();
			const uidWidthsToNormalize = new Map();
			const containersToNormalize = new Map();
			const reachableDateOccurrences = [];
			while (pending.length > 0) {
				const entry = pending.pop();
				if (entry === undefined) break;
				if (entry.exit) {
					active.delete(entry.object);
					continue;
				}
				pendingObjectCount -= 1;
				if (entry.depth > maximumDepth) throw new PlistNestingLimitError(maximumDepth);
				if (active.has(entry.object)) throw malformedInput("plist", "binary plist object references form a cycle, which a property list cannot represent");
				estimate += expandedNodeBytes;
				if (estimate > maxBytes) throw decodeBudgetExceeded(`binary plist reference expansion exceeds ${budget}`, maxBytes);
				const offset = safeDeclaration(sourceLayout.objectOffset(entry.object));
				if (offset < 8 || offset >= objectsEnd) throw malformedInput("plist", "binary plist object offset is invalid");
				if (numberProjection) reachableObjectOffsets.add(offset);
				const marker = bytes[offset] ?? 0;
				const type = marker >> 4;
				if (type !== 10 && type !== 13) scalarObjects.set(entry.object, {
					object: entry.object,
					uid: type === 8
				});
				if (entry.dictionaryKey && type !== 5 && type !== 6) throw malformedInput("plist", "binary plist dictionary key is not a string");
				if (type === 3) {
					if (marker !== 51) throw malformedInput("plist", `binary plist date marker 0x${marker.toString(16)} is invalid`);
					if (offset + 9 > offsetTable) throw truncatedInput("plist", "binary plist date object is truncated");
					if (numberProjection) {
						reachableDateOffsets.add(offset);
						reachableDateOccurrences.push(offset);
					}
					continue;
				}
				if (type === 8) {
					const uidWidth = (marker & 15) + 1;
					if (offset + 1 + uidWidth > objectsEnd) throw truncatedInput("plist", "binary plist UID object is truncated");
					const normalizedWidth = binaryPlistUidNormalizationWidth(bytes, offset);
					if (normalizedWidth !== undefined) uidWidthsToNormalize.set(offset, normalizedWidth);
					continue;
				}
				if (type === 1 || type === 2) {
					const info = marker & 15;
					if (type === 1 && info > 4) throw malformedInput("plist", "binary plist integer width is invalid");
					if (type === 2 && info !== 2 && info !== 3) throw malformedInput("plist", "binary plist real width is invalid");
					const width = 1 << info;
					if (offset + 1 + width > offsetTable) throw truncatedInput("plist", "binary plist numeric scalar is truncated");
					if (numberProjection) {
						reachableNumericOffsets.add(offset);
						if (type === 1 && width === 16) reachableWideIntegerOffsets.add(offset);
					}
					continue;
				}
				let size = marker & 15;
				let cursor = offset + 1;
				if (size === 15 && type !== 0 && type !== 8) {
					const extMarker = bytes[cursor] ?? 0;
					if (extMarker >> 4 !== 1 || (extMarker & 15) > 3) throw malformedInput("plist", "binary plist extended object size is invalid");
					cursor += 1;
					const integerSize = 1 << (extMarker & 15);
					size = readInteger(cursor, integerSize);
					cursor += integerSize;
					if (cursor > objectsEnd) throw truncatedInput("plist", "binary plist extended object size is truncated");
					if (size < 0) throw malformedInput("plist", "binary plist extended object size is invalid");
				}
				if (type === 4 || type === 5 || type === 6) {
					const byteLength = type === 6 ? size * 2 : size;
					if (cursor + byteLength > objectsEnd) throw truncatedInput("plist", "binary plist scalar object is truncated");
					estimate += type === 4 ? size + 4 * Math.ceil(size / 3) : byteLength * 2;
					if (estimate > maxBytes) throw decodeBudgetExceeded(`binary plist scalar expansion exceeds ${budget}`, maxBytes);
					continue;
				}
				if (type !== 10 && type !== 13) continue;
				const childCount = type === 13 ? size * 2 : size;
				const refsEnd = cursor + childCount * referenceSize;
				if (!Number.isSafeInteger(refsEnd) || refsEnd > objectsEnd) throw truncatedInput("plist", "binary plist reference table is truncated");
				const availableNodes = Math.floor((maxBytes - estimate) / expandedNodeBytes);
				if (childCount > availableNodes - pendingObjectCount) throw decodeBudgetExceeded(`binary plist reference expansion exceeds ${budget}`, maxBytes);
				const references = Array.from({ length: childCount }, (_, index) => {
					const reference = readInteger(cursor + index * referenceSize, referenceSize);
					if (reference < 0 || reference >= objectCount) throw malformedInput("plist", "binary plist reference is invalid");
					return reference;
				});
				if (!sourceContainers.has(entry.object)) sourceContainers.set(entry.object, {
					object: entry.object,
					kind: type === 13 ? "dictionary" : "array",
					references: type === 13 ? references.slice(size) : references,
					...type === 13 ? { keys: references.slice(0, size).map(readDictionaryKey) } : {}
				});
				active.add(entry.object);
				pending.push({
					object: entry.object,
					depth: entry.depth,
					exit: true,
					dictionaryKey: false
				});
				for (let index = childCount - 1; index >= 0; index -= 1) {
					const reference = references[index];
					pending.push({
						object: reference,
						depth: entry.depth + 1,
						exit: false,
						dictionaryKey: type === 13 && index < size
					});
				}
				if (referenceSize !== normalizedReferenceSize && !containersToNormalize.has(offset)) containersToNormalize.set(offset, {
					offset,
					headerLength: cursor - offset,
					references
				});
				pendingObjectCount += childCount;
			}
			const uidOffsetsToNormalize = [...uidWidthsToNormalize].map(([offset, width]) => ({
				offset,
				width
			})).sort((left, right) => left.offset - right.offset);
			const normalizedContainers = [...containersToNormalize.values()].sort((left, right) => left.offset - right.offset);
			const containerCloneLengths = normalizedContainers.map(({ headerLength, references }) => {
				const cloneLength = headerLength + references.length * normalizedReferenceSize;
				if (!Number.isSafeInteger(cloneLength)) throw unsupportedInput("plist", "binary plist reference table is too large");
				return cloneLength;
			});
			const normalizeOffsetWidth = (cloneLengths) => {
				if (cloneLengths.length === 0 && [
					1,
					2,
					4,
					8
				].includes(offsetSize)) return offsetSize;
				const width = binaryPlistCloneOffsetWidth(offsetSize, trailer, cloneLengths);
				if (width === undefined) throw unsupportedInput("plist", "binary plist object offset exceeds supported width");
				return width;
			};
			if (!numberProjection) {
				const cloneLengths = [...uidOffsetsToNormalize.map(({ width }) => width + 1), ...containerCloneLengths];
				const normalizedOffsetSize = normalizeOffsetWidth(cloneLengths);
				if (cloneLengths.length > 0 || normalizedOffsetSize !== offsetSize || normalizedReferenceSize !== referenceSize) {
					const cloneBytes = cloneLengths.reduce((sum, length) => sum + length, 0);
					estimate += 2 * (cloneBytes + objectCount * normalizedOffsetSize);
					if (estimate > maxBytes) throw decodeBudgetExceeded(`binary plist UID-copy expansion exceeds ${budget}`, maxBytes);
				}
				return {
					estimatedBytes: estimate,
					binaryValuePlan: {
						topObject,
						scalars: [...scalarObjects.values()],
						containers: [...sourceContainers.values()],
						uidIdentity: uidProjection
					},
					datePrecisionOverlapCount: 0,
					reachableDateOffsets: [],
					overlappingDateOffsets: [],
					reachableWideIntegerOffsets: [],
					overlappingWideIntegerOffsets: [],
					reachableNumericOffsets: [],
					uidOffsetsToNormalize,
					containersToNormalize: normalizedContainers,
					normalizedOffsetSize,
					normalizedReferenceSize
				};
			}
			const reachableSpans = [...reachableObjectOffsets].map((offset) => ({
				offset,
				end: binaryPlistObjectEnd(bytes, offset, objectsEnd, referenceSize)
			})).filter((span) => span.end !== undefined).sort((left, right) => left.offset - right.offset);
			const overlappingDateOffsets = findOverlappingScalarOffsets(reachableSpans, reachableDateOffsets);
			const overlappingWideIntegerOffsets = findOverlappingScalarOffsets(reachableSpans, reachableWideIntegerOffsets);
			const precisionUnknownDateOffsets = [...overlappingDateOffsets].filter((offset) => {
				const seconds = reader.f64(offset + 1);
				return binaryDateRequiresExactSeconds(seconds);
			}).sort((left, right) => left - right);
			const cloneOffsets = new Set([...precisionUnknownDateOffsets, ...overlappingWideIntegerOffsets]);
			const cloneLengths = [
				...uidOffsetsToNormalize.map(({ width }) => width + 1),
				...containerCloneLengths,
				...Array.from(cloneOffsets, () => 9)
			];
			const normalizedOffsetSize = normalizeOffsetWidth(cloneLengths);
			if (cloneLengths.length > 0 || normalizedOffsetSize !== offsetSize || normalizedReferenceSize !== referenceSize) {
				const cloneBytes = cloneLengths.reduce((sum, length) => sum + length, 0);
				estimate += 2 * (cloneBytes + objectCount * normalizedOffsetSize);
				if (estimate > maxBytes) throw decodeBudgetExceeded(`binary plist scalar-copy expansion exceeds ${budget}`, maxBytes);
			}
			const precisionUnknownOffsets = new Set(precisionUnknownDateOffsets);
			const datePrecisionOverlapCount = reachableDateOccurrences.filter((offset) => precisionUnknownOffsets.has(offset)).length;
			return {
				estimatedBytes: estimate,
				binaryValuePlan: {
					topObject,
					scalars: [...scalarObjects.values()],
					containers: [...sourceContainers.values()],
					uidIdentity: uidProjection
				},
				datePrecisionOverlapCount,
				reachableDateOffsets: [...reachableDateOffsets].sort((left, right) => left - right),
				overlappingDateOffsets: precisionUnknownDateOffsets,
				reachableWideIntegerOffsets: [...reachableWideIntegerOffsets].sort((left, right) => left - right),
				overlappingWideIntegerOffsets: [...overlappingWideIntegerOffsets].sort((left, right) => left - right),
				reachableNumericOffsets: [...reachableNumericOffsets].sort((left, right) => left - right),
				uidOffsetsToNormalize,
				containersToNormalize: normalizedContainers,
				normalizedOffsetSize,
				normalizedReferenceSize
			};
		};
	})))();
}

//#endregion
//#region dist/domain/apple/plistDuplicateKeys.js
var NAMED_DUPLICATE_KEYS, SHOWN_KEY_LENGTH, createPlistDuplicateKeyCollector, shownKey, plistDuplicateKeyLimitations;
function init_plistDuplicateKeys() {
	return (init_plistDuplicateKeys = __esmMin((() => {
		init_excerpt();
		NAMED_DUPLICATE_KEYS = 8;
		SHOWN_KEY_LENGTH = 64;
		createPlistDuplicateKeyCollector = () => {
			let dictionaries = 0;
			let replaced = 0;
			const names = new Set();
			let namesOmitted = false;
			return {
				/** Record one dictionary's keys in source order. */
				dictionary(keys) {
					const seen = new Set();
					let repeated = false;
					for (const key of keys) {
						if (!seen.has(key)) {
							seen.add(key);
							continue;
						}
						repeated = true;
						replaced += 1;
						if (names.size < NAMED_DUPLICATE_KEYS) names.add(key);
						else if (!names.has(key)) namesOmitted = true;
					}
					if (repeated) dictionaries += 1;
				},
				result() {
					return {
						dictionaries,
						replaced,
						names: [...names],
						namesOmitted
					};
				}
			};
		};
		shownKey = (name) => quotedExcerpt(name, SHOWN_KEY_LENGTH);
		plistDuplicateKeyLimitations = (duplicates) => duplicates.replaced === 0 ? [] : [`${String(duplicates.dictionaries)} dictionary(ies) declare a key more than once (${duplicates.names.map(shownKey).join(", ")}${duplicates.namesOmitted ? ", ..." : ""}). REA kept the last value for each key; ${String(duplicates.replaced)} earlier value(s) are not reported, and other plist readers may keep a different one.`];
	})))();
}

//#endregion
//#region dist/domain/apple/binaryPlistMaterializer.js
var scalarArrayInput, scalarOccurrence, binaryPlistDuplicateKeys, decodeBinaryPropertyList, decodeBinaryPlistValue, storedPlistPayload, storedWideText, storedDataText, storedPlistText, decodeBinaryPlistText;
function init_binaryPlistMaterializer() {
	return (init_binaryPlistMaterializer = __esmMin((() => {
		init_internalInvariant();
		init_binaryPlistLayout();
		init_plistUid();
		init_plistDuplicateKeys();
		init_strictUtf8();
		init_textByteOrderMark();
		init_plistScalars();
		init_propertyListDecodeBudget();
		scalarArrayInput = (bytes, objects) => {
			const compatibleLayoutResult = readBinaryPlistLayout(bytes);
			if (!compatibleLayoutResult.ok) throw invariantViolation("binary plist decoder copy lost its trailer");
			const compatibleLayout = compatibleLayoutResult.value;
			const referenceWidth = compatibleLayout.referenceWidth;
			const objectCount = Number(compatibleLayout.objectCount);
			const rootOffset = bytes.length;
			const rootLength = 10 + objects.length * referenceWidth;
			const tableOffset = rootOffset + rootLength;
			const output = Buffer.alloc(tableOffset + (objectCount + 1) * 8 + 32);
			bytes.copy(output);
			output[rootOffset] = 175;
			output[rootOffset + 1] = 19;
			output.writeBigUInt64BE(BigInt(objects.length), rootOffset + 2);
			for (const [index, object] of objects.entries()) {
				let reference = BigInt(object);
				const offset = rootOffset + 10 + index * referenceWidth;
				for (let byte = referenceWidth - 1; byte >= 0; byte -= 1) {
					output[offset + byte] = Number(reference & 255n);
					reference >>= 8n;
				}
			}
			let object = 0;
			for (const offset of compatibleLayout.objectOffsets()) {
				output.writeBigUInt64BE(offset, tableOffset + object * 8);
				object += 1;
			}
			output.writeBigUInt64BE(BigInt(rootOffset), tableOffset + objectCount * 8);
			const nextTrailer = output.length - 32;
			output[nextTrailer + 6] = 8;
			output[nextTrailer + 7] = referenceWidth;
			output.writeBigUInt64BE(BigInt(objectCount + 1), nextTrailer + 8);
			output.writeBigUInt64BE(BigInt(objectCount), nextTrailer + 16);
			output.writeBigUInt64BE(BigInt(tableOffset), nextTrailer + 24);
			return output;
		};
		scalarOccurrence = (value, uid, identity) => {
			if (value instanceof Date) return new Date(value.getTime());
			if (value instanceof Uint8Array) return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
			if (uid && value !== null && typeof value === "object") {
				const copy = { ...value };
				if (identity) markPlistDictionary(copy, value.UID);
				return copy;
			}
			return value;
		};
		binaryPlistDuplicateKeys = (plan) => {
			const duplicates = createPlistDuplicateKeyCollector();
			for (const container of plan.binaryValuePlan?.containers ?? []) if (container.kind === "dictionary" && container.keys !== undefined) duplicates.dictionary(container.keys);
			return duplicates.result();
		};
		decodeBinaryPropertyList = (bytes, plan, metadata = scanBinaryPlistScalars(bytes, plan)) => ({
			value: decodeBinaryPlistValue(bytes, plan, metadata),
			numberLiterals: metadata.literals,
			duplicateKeys: binaryPlistDuplicateKeys(plan)
		});
		decodeBinaryPlistValue = (bytes, plan, metadata = scanBinaryPlistScalars(bytes, plan)) => {
			const source = plan.binaryValuePlan;
			if (source === undefined) throw invariantViolation("Binary plist source plan is missing");
			const compatible = decodeBinaryPlistScalars(bytes, metadata, plan);
			const scalars = parseBinary(scalarArrayInput(compatible, source.scalars.map(({ object }) => object)));
			const scalarIndex = new Map(source.scalars.map((scalar, index) => [scalar.object, index]));
			const containers = new Map(source.containers.map((container) => [container.object, container]));
			const root = {};
			const pending = [{
				object: source.topObject,
				parent: root,
				key: "value"
			}];
			while (pending.length > 0) {
				const entry = pending.pop();
				const container = containers.get(entry.object);
				let value;
				if (container === undefined) {
					const index = scalarIndex.get(entry.object);
					if (index === undefined) throw invariantViolation("Binary plist scalar source is missing");
					value = scalarOccurrence(scalars[index], source.scalars[index].uid, source.uidIdentity);
				} else {
					value = container.kind === "array" ? [] : {};
					if (container.kind === "dictionary" && source.uidIdentity) markPlistDictionary(value);
					for (let index = container.references.length - 1; index >= 0; index -= 1) pending.push({
						object: container.references[index],
						parent: value,
						key: container.keys?.[index] ?? index
					});
				}
				Object.defineProperty(entry.parent, entry.key, {
					value,
					enumerable: true,
					configurable: true,
					writable: true
				});
			}
			return root.value;
		};
		storedPlistPayload = (bytes, offset, objectEnd, referenceWidth) => {
			if (offset < 8 || offset >= objectEnd) return "unreadable";
			const marker = bytes[offset];
			if (marker === undefined) return "unreadable";
			const type = marker >> 4;
			if (type !== 4 && type !== 5 && type !== 6 && type !== 7) return null;
			const end = binaryPlistObjectEnd(bytes, offset, objectEnd, referenceWidth);
			if (end === undefined) return "unreadable";
			const start = (marker & 15) === 15 ? offset + 2 + (1 << (bytes[offset + 1] & 15)) : offset + 1;
			return {
				type,
				payload: bytes.subarray(start, end)
			};
		};
		storedWideText = (payload, encoding, ignoreBOM) => {
			try {
				const text = new TextDecoder(encoding, {
					fatal: true,
					ignoreBOM
				}).decode(payload);
				return {
					text,
					complete: true
				};
			} catch (cause) {
				if (!(cause instanceof TypeError)) throw cause;
				return {
					text: new TextDecoder(encoding, { ignoreBOM }).decode(payload),
					complete: false
				};
			}
		};
		storedDataText = (payload) => {
			const encoding = byteOrderMarkEncoding(payload);
			if (encoding === "utf-32") return null;
			if (encoding !== null) return storedWideText(payload, encoding, false);
			const text = payload.toString("utf8");
			return {
				text,
				complete: !text.startsWith("﻿") || isStrictUtf8(payload)
			};
		};
		storedPlistText = (type, payload) => {
			switch (type) {
				case 4: return storedDataText(payload);
				case 5: return {
					text: payload.toString("latin1"),
					complete: true
				};
				case 6: return storedWideText(payload, "utf-16be", true);
				default: return {
					text: payload.toString("utf8"),
					complete: isStrictUtf8(payload)
				};
			}
		};
		decodeBinaryPlistText = (bytes, maxBytes) => {
			decodeBinaryPlistValue(bytes, preflightPropertyListDecode(bytes, maxBytes));
			const layout = readBinaryPlistLayout(bytes);
			if (!layout.ok) throw invariantViolation("binary plist trailer was not validated by its preflight");
			const texts = [];
			let decoded = 0;
			let complete = true;
			const objectEnd = Number(layout.value.offsetTable);
			for (const offset of new Set(layout.value.objectOffsets())) {
				const stored = storedPlistPayload(bytes, Number(offset), objectEnd, layout.value.referenceWidth);
				if (stored === null) continue;
				if (stored === "unreadable" || decoded + stored.payload.length > maxBytes) {
					complete = false;
					continue;
				}
				decoded += stored.payload.length;
				const text = storedPlistText(stored.type, stored.payload);
				if (text?.complete !== true) complete = false;
				if (text !== null) texts.push(text.text);
			}
			return {
				text: texts.join("\n"),
				complete
			};
		};
	})))();
}

//#endregion
export { UnsupportedBinaryPlistUidError, createPlistDuplicateKeyCollector, decodeBinaryPlistText, decodeBinaryPropertyList, estimateBinaryPlistExpansion, init_binaryPlistMaterializer, init_plistDuplicateKeys, init_plistScalars, init_propertyListDecodeBudget, isPlistDecodeBudgetFailure, plistDuplicateKeyLimitations, preflightPropertyListDecode, preflightXmlPropertyListDecode, scanBinaryPlistScalars };