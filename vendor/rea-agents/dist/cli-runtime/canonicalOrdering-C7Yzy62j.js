import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, compareUnicodeCodePoints, init_binaryContainer, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ZIP_MAX_COMMENT_BYTES, init_zipEndOfCentralDirectory, init_zipLocalHeader, zipEndOfCentralDirectoryCandidates, zipEndUsesSingleVolume, zipLocalDataOffset } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";

//#region dist/domain/zip/zipCentralHeader.js
var ZIP_CENTRAL_HEADER, readZipCentralExtent;
function init_zipCentralHeader() {
	return (init_zipCentralHeader = __esmMin((() => {
		init_result();
		ZIP_CENTRAL_HEADER = {
			signature: 33639248,
			bytes: 46,
			nameBytesOffset: 28,
			extraBytesOffset: 30,
			commentBytesOffset: 32,
			localHeaderOffset: 42
		};
		readZipCentralExtent = (reader, at, end) => {
			const layout = ZIP_CENTRAL_HEADER;
			const name = at + layout.bytes;
			if (at < 0 || name > end || name > reader.bytes.length) return err({
				kind: "fixed-fields",
				offset: at
			});
			if (reader.u32(at) !== layout.signature) return err({
				kind: "signature",
				offset: at
			});
			const extra = name + reader.u16(at + layout.nameBytesOffset);
			if (extra > end) return err({
				kind: "name",
				offset: name
			});
			const comment = extra + reader.u16(at + layout.extraBytesOffset);
			const next = comment + reader.u16(at + layout.commentBytesOffset);
			if (next > end) return err({
				kind: "extra-or-comment",
				offset: extra
			});
			return ok({
				name,
				extra,
				comment,
				next
			});
		};
	})))();
}

//#endregion
//#region dist/domain/zipPackageFormat.js
var ZIP_APPLICATION_PACKAGE_FORMATS, ZIP_PACKAGE_FORMATS, isZipPackageFormat, ZIP_SIGNATURES, hasZipLocalHeader, hasZipSignature, hasTrailingZipArchive, zipPackageFormatForPath, zipRootPackageFormat, ZIP_NON_ENTRY_LIMITATION;
function init_zipPackageFormat() {
	return (init_zipPackageFormat = __esmMin((() => {
		init_binaryContainer();
		init_zipCentralHeader();
		init_zipLocalHeader();
		init_zipEndOfCentralDirectory();
		ZIP_APPLICATION_PACKAGE_FORMATS = [
			"ipa",
			"apk",
			"msix",
			"appx",
			"hap",
			"hsp",
			"app-pack"
		];
		ZIP_PACKAGE_FORMATS = ["zip", ...ZIP_APPLICATION_PACKAGE_FORMATS];
		isZipPackageFormat = (format) => ZIP_PACKAGE_FORMATS.some((candidate) => candidate === format);
		ZIP_SIGNATURES = [
			[
				80,
				75,
				3,
				4
			],
			[
				80,
				75,
				5,
				6
			],
			[
				80,
				75,
				6,
				6
			],
			[
				80,
				75,
				7,
				8
			]
		];
		hasZipLocalHeader = (bytes) => ZIP_SIGNATURES[0].every((byte, index) => bytes[index] === byte);
		hasZipSignature = (bytes) => bytes.length >= 4 && ZIP_SIGNATURES.some((signature) => signature.every((byte, index) => bytes[index] === byte));
		hasTrailingZipArchive = async (size, read) => {
			if (!Number.isSafeInteger(size) || size < 22) return false;
			const tailStart = Math.max(0, size - 22 - ZIP_MAX_COMMENT_BYTES);
			const tail = Buffer.from(await read(tailStart, size - tailStart));
			if (tail.length !== size - tailStart) return false;
			for (const candidate of zipEndOfCentralDirectoryCandidates(tail)) {
				const { offset: record, entriesOnDisk, directorySize: directoryBytes, directoryOffset: declaredDirectory } = candidate;
				if (!zipEndUsesSingleVolume(candidate) || entriesOnDisk === 0 || entriesOnDisk === 65535 || entriesOnDisk !== candidate.totalEntries || directoryBytes < ZIP_CENTRAL_HEADER.bytes || directoryBytes === 4294967295 || declaredDirectory === 4294967295) continue;
				const directory = tailStart + record - directoryBytes;
				const shift = directory - declaredDirectory;
				if (directory < 0 || shift < 0) continue;
				const header = Buffer.from(await read(directory, ZIP_CENTRAL_HEADER.bytes));
				const headerReader = new BinaryReader(header, true, "zip");
				if (!readZipCentralExtent(headerReader, 0, directoryBytes).ok) continue;
				const localOffset = headerReader.u32(ZIP_CENTRAL_HEADER.localHeaderOffset) + shift;
				if (localOffset === 0 || localOffset > directory - 30) continue;
				const local = Buffer.from(await read(localOffset, 30));
				const dataOffset = zipLocalDataOffset(new BinaryReader(local, true, "zip"), localOffset);
				if (dataOffset !== undefined && dataOffset <= directory) return true;
			}
			return false;
		};
		zipPackageFormatForPath = (path) => {
			const lower = path.toLowerCase();
			if (lower.endsWith(".zip")) return "zip";
			if (lower.endsWith(".ipa")) return "ipa";
			if (lower.endsWith(".apk")) return "apk";
			if (lower.endsWith(".msix") || lower.endsWith(".msixbundle")) return "msix";
			if (lower.endsWith(".appx") || lower.endsWith(".appxbundle")) return "appx";
			if (lower.endsWith(".hap")) return "hap";
			if (lower.endsWith(".hsp")) return "hsp";
			return undefined;
		};
		zipRootPackageFormat = (path) => {
			const lower = path.toLowerCase();
			return lower.endsWith(".app") ? "app-pack" : zipPackageFormatForPath(lower) ?? "zip";
		};
		ZIP_NON_ENTRY_LIMITATION = "ZIP inventory lists central-directory entries only. Non-entry bytes, including leading bytes before the first entry such as a self-extractor stub, an APK Signing Block before the central directory or a ZIP comment after it, are not occurrences.";
	})))();
}

//#endregion
//#region dist/domain/canonicalOrdering.js
var uniqueSorted, uniqueSortedBy, compareAsciiStrings, isSortedUniqueAscii;
function init_canonicalOrdering() {
	return (init_canonicalOrdering = __esmMin((() => {
		init_unicodeCodePointOrder();
		uniqueSorted = (values) => [...new Set(values)].sort(compareUnicodeCodePoints);
		uniqueSortedBy = (values, key) => {
			const byKey = new Map();
			for (const value of values) byKey.set(key(value), value);
			return [...byKey].sort(([left], [right]) => compareUnicodeCodePoints(left, right)).map(([, value]) => value);
		};
		compareAsciiStrings = (left, right) => left < right ? -1 : left > right ? 1 : 0;
		isSortedUniqueAscii = (values) => values.every((value, index) => index === 0 || compareAsciiStrings(values[index - 1] ?? "", value) < 0);
	})))();
}

//#endregion
export { ZIP_APPLICATION_PACKAGE_FORMATS, ZIP_CENTRAL_HEADER, ZIP_NON_ENTRY_LIMITATION, ZIP_PACKAGE_FORMATS, ZIP_SIGNATURES, compareAsciiStrings, hasTrailingZipArchive, hasZipLocalHeader, hasZipSignature, init_canonicalOrdering, init_zipCentralHeader, init_zipPackageFormat, isZipPackageFormat, readZipCentralExtent, uniqueSorted, uniqueSortedBy, zipPackageFormatForPath, zipRootPackageFormat };