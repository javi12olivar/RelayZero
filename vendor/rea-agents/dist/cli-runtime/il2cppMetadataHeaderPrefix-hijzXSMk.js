import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { IL2CPP_METADATA_MAGIC, init_il2cppMetadata } from "./analysisViewResult-vDCF9Pxo.js";

//#region dist/domain/il2cpp/il2cppMetadataHeaderPrefix.js
var IL2CPP_METADATA_PREFIX_BYTES, observeIl2cppMetadataHeaderPrefix;
function init_il2cppMetadataHeaderPrefix() {
	return (init_il2cppMetadataHeaderPrefix = __esmMin((() => {
		init_binaryContainer();
		init_il2cppMetadata();
		IL2CPP_METADATA_PREFIX_BYTES = 8;
		observeIl2cppMetadataHeaderPrefix = (bytes) => {
			if (bytes.byteLength < 4) return {
				kind: "unavailable-magic",
				magic: null,
				rawVersion: null,
				version: null
			};
			const reader = new BinaryReader(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), true, "il2cpp-metadata");
			const magic = reader.u32(0);
			if (magic !== 4205910959) return {
				kind: "other-magic",
				magic,
				rawVersion: null,
				version: null
			};
			if (bytes.byteLength < 8) return {
				kind: "il2cpp",
				magic: IL2CPP_METADATA_MAGIC,
				rawVersion: null,
				version: null
			};
			const rawVersion = reader.u32(4);
			return {
				kind: "il2cpp",
				magic: IL2CPP_METADATA_MAGIC,
				rawVersion,
				version: rawVersion | 0
			};
		};
	})))();
}

//#endregion
export { init_il2cppMetadataHeaderPrefix, observeIl2cppMetadataHeaderPrefix };