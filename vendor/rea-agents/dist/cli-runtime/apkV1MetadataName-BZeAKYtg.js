import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/apkSignature/apkV1MetadataName.js
var APK_V1_META_INF_PREFIX, APK_V1_MANIFEST_PATH, META_INF_PREFIX_BYTES, BLOCK_SUFFIXES, isV1SignatureFileName, isV1SignatureBlockName, v1SignatureFileNameForBlock, isV1SignatureMetadataName, startsWithV1MetaInfPrefix;
function init_apkV1MetadataName() {
	return (init_apkV1MetadataName = __esmMin((() => {
		APK_V1_META_INF_PREFIX = "META-INF/";
		APK_V1_MANIFEST_PATH = `${APK_V1_META_INF_PREFIX}MANIFEST.MF`;
		META_INF_PREFIX_BYTES = Uint8Array.from([...APK_V1_META_INF_PREFIX].map((character) => character.charCodeAt(0)));
		BLOCK_SUFFIXES = [
			".RSA",
			".DSA",
			".EC"
		];
		isV1SignatureFileName = (name) => name.endsWith(".SF");
		isV1SignatureBlockName = (name) => BLOCK_SUFFIXES.some((suffix) => name.endsWith(suffix));
		v1SignatureFileNameForBlock = (block) => `${block.slice(0, block.lastIndexOf("."))}.SF`;
		isV1SignatureMetadataName = (name) => name.startsWith("META-INF/") && (name === APK_V1_MANIFEST_PATH || isV1SignatureFileName(name) || isV1SignatureBlockName(name));
		startsWithV1MetaInfPrefix = (bytes, start, length) => {
			if (length < META_INF_PREFIX_BYTES.length) return false;
			for (let index = 0; index < META_INF_PREFIX_BYTES.length; index += 1) if (bytes[start + index] !== META_INF_PREFIX_BYTES[index]) return false;
			return true;
		};
	})))();
}

//#endregion
export { APK_V1_MANIFEST_PATH, APK_V1_META_INF_PREFIX, init_apkV1MetadataName, isV1SignatureBlockName, isV1SignatureFileName, isV1SignatureMetadataName, startsWithV1MetaInfPrefix, v1SignatureFileNameForBlock };