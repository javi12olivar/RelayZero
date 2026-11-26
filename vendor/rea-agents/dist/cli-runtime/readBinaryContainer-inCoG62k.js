import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryFormatFailure, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { classifyFatContainerEvidence, init_machoContainer, readFatContainerHeader, readFatHeaderPrefix, readMachoHeaderPrefixFacts } from "./machoLoadCommands-DCQgk7s-.js";
import { init_elfImage, init_peImage, readElfImage, readElfImageCooperative, readPeImage } from "./elfImage-cCQspBBH.js";
import { init_machoImage, readMachoImage } from "./machoImage-CU96AvFS.js";

//#region dist/domain/native/readBinaryContainer.js
var ELF_MAGIC, hasElfMagic, readBinaryContainer, readBinaryContainerCooperative, readNonElfContainer;
function init_readBinaryContainer() {
	return (init_readBinaryContainer = __esmMin((() => {
		init_binaryContainer();
		init_machoContainer();
		init_elfImage();
		init_peImage();
		init_machoImage();
		ELF_MAGIC = Buffer.from([
			127,
			69,
			76,
			70
		]);
		hasElfMagic = (bytes) => bytes.subarray(0, ELF_MAGIC.length).equals(ELF_MAGIC);
		readBinaryContainer = (bytes, operation) => hasElfMagic(bytes) ? readElfImage(bytes, operation) : readNonElfContainer(bytes);
		readBinaryContainerCooperative = async (bytes, operation, pause) => hasElfMagic(bytes) ? readElfImageCooperative(bytes, operation, pause) : readNonElfContainer(bytes);
		readNonElfContainer = (bytes) => {
			if (bytes.subarray(0, 2).equals(Buffer.from("MZ"))) return readPeImage(bytes);
			if (bytes.length >= 4) {
				const fatPrefix = readFatHeaderPrefix(bytes);
				if (fatPrefix.state === "incomplete" || fatPrefix.state === "parsed") {
					const fatHeader = readFatContainerHeader(bytes, bytes.length);
					if (fatHeader.state === "malformed") throw new BinaryFormatFailure("malformed", fatHeader.reason);
					const identity = fatHeader.state === "parsed" ? classifyFatContainerEvidence(fatHeader, bytes) : undefined;
					const confirmedFatMachO = identity?.state === "mach-o";
					if (confirmedFatMachO) throw new BinaryFormatFailure("unsupported", "Universal/fat Mach-O containers require selecting a thin slice");
				}
				if (readMachoHeaderPrefixFacts(bytes).format !== null) return readMachoImage(bytes);
			}
			throw new BinaryFormatFailure("unsupported", "Only ELF, PE, and thin Mach-O native images are supported");
		};
	})))();
}

//#endregion
export { init_readBinaryContainer, readBinaryContainer, readBinaryContainerCooperative };