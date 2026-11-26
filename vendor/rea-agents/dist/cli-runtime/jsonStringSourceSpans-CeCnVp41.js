import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/jsonStringSourceSpans.js
/** Map parsed string facts back to their original, validated JSON spelling.
* `encoded` excludes the quotes; callers own JSON decoding and span validity.
*/
function* jsonStringSourceSpans(encoded, offset, spans) {
	let sourceCursor = 0;
	let decodedCursor = 0;
	const sourceOffset = (boundary) => {
		while (decodedCursor < boundary) {
			sourceCursor += encoded[sourceCursor] === "\\" ? encoded[sourceCursor + 1] === "u" ? 6 : 2 : 1;
			decodedCursor++;
		}
		return offset + sourceCursor;
	};
	for (const span of spans) yield {
		start: sourceOffset(span.start),
		end: sourceOffset(span.end)
	};
}
function init_jsonStringSourceSpans() {
	return (init_jsonStringSourceSpans = __esmMin((() => {})))();
}

//#endregion
export { init_jsonStringSourceSpans, jsonStringSourceSpans };