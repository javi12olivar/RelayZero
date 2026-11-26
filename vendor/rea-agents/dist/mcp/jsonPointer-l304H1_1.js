import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";

//#region dist/domain/jsonPointer.js
var escapeJsonPointerToken, unescapeJsonPointerToken, jsonPointerTokens;
function init_jsonPointer() {
	return (init_jsonPointer = __esmMin((() => {
		escapeJsonPointerToken = (token) => token.replaceAll("~", "~0").replaceAll("/", "~1");
		unescapeJsonPointerToken = (token) => token.replaceAll("~1", "/").replaceAll("~0", "~");
		jsonPointerTokens = (pointer) => pointer === "" ? [] : pointer.slice(1).split("/").map(unescapeJsonPointerToken);
	})))();
}

//#endregion
export { unescapeJsonPointerToken as i, init_jsonPointer as n, jsonPointerTokens as r, escapeJsonPointerToken as t };