import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { isUtf8 } from "node:buffer";

//#region dist/domain/strictUtf8.js
var strictUtf8Decoder, preserving, stripping, decodeStrictUtf8, isStrictUtf8;
function init_strictUtf8() {
	return (init_strictUtf8 = __esmMin((() => {
		strictUtf8Decoder = (bom) => new TextDecoder("utf-8", {
			fatal: true,
			ignoreBOM: bom === "preserve"
		});
		preserving = strictUtf8Decoder("preserve");
		stripping = strictUtf8Decoder("strip-signature");
		decodeStrictUtf8 = (bytes, bom) => (bom === "preserve" ? preserving : stripping).decode(bytes);
		isStrictUtf8 = (bytes) => isUtf8(bytes);
	})))();
}

//#endregion
export { strictUtf8Decoder as i, init_strictUtf8 as n, isStrictUtf8 as r, decodeStrictUtf8 as t };