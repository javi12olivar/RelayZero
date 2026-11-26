import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { excerptText, init_excerpt } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";

//#region dist/domain/utf8HeadExcerpt.js
var utf8HeadExcerpt;
function init_utf8HeadExcerpt() {
	return (init_utf8HeadExcerpt = __esmMin((() => {
		init_excerpt();
		utf8HeadExcerpt = (text, maximumBytes) => {
			if (maximumBytes <= 0) return {
				text: excerptText(""),
				bytes: 0,
				truncated: text.length > 0
			};
			if (text.length * 3 <= maximumBytes) return {
				text: excerptText(text),
				bytes: Buffer.byteLength(text, "utf8"),
				truncated: false
			};
			const { read, written } = new TextEncoder().encodeInto(text, new Uint8Array(maximumBytes));
			return {
				text: excerptText(text.slice(0, read)),
				bytes: written,
				truncated: read < text.length
			};
		};
	})))();
}

//#endregion
export { init_utf8HeadExcerpt, utf8HeadExcerpt };