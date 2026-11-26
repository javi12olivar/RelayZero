import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { i as mediaTypeEssence, t as init_recordedMediaType } from "./recordedMediaType-CDteDKWr.js";

//#region dist/domain/browserNetworkMediaType.js
function* retainedDeclarations(items) {
	for (const item of items) if (item.name.toLowerCase() === "content-type") yield item.redacted ? null : item.value;
}
var CONTENT_TYPE_HEADER, isSingleMediaType, browserContentType, retainedNetworkMediaType;
function init_browserNetworkMediaType() {
	return (init_browserNetworkMediaType = __esmMin((() => {
		init_recordedMediaType();
		CONTENT_TYPE_HEADER = "content-type";
		isSingleMediaType = (value) => {
			if (/[\r\n]/u.test(value) || mediaTypeEssence(value) === null) return false;
			let quoted = false;
			for (let index = 0; index < value.length; index += 1) {
				const character = value[index];
				if (character === "\"") quoted = !quoted;
				else if (quoted && character === "\\") index += 1;
				else if (!quoted && character === ",") return false;
			}
			return !quoted;
		};
		browserContentType = (declarations) => {
			let value;
			for (const declaration of declarations) {
				if (declaration === null || (value === undefined ? !isSingleMediaType(declaration) : value !== declaration)) return { state: "uncertain" };
				value = declaration;
			}
			return value === undefined ? { state: "absent" } : {
				state: "known",
				value
			};
		};
		retainedNetworkMediaType = (body, headers) => {
			const captured = body?.state === "captured" ? body : undefined;
			if (captured?.media_type_source !== undefined) return captured.media_type ?? undefined;
			if (headers?.state === "captured") {
				const type = browserContentType(retainedDeclarations(headers.items));
				if (type.state === "known") return type.value;
				if (type.state === "uncertain") return undefined;
			}
			const legacy = captured?.media_type;
			return legacy != null && isSingleMediaType(legacy) ? legacy : undefined;
		};
	})))();
}

//#endregion
export { retainedNetworkMediaType as i, browserContentType as n, init_browserNetworkMediaType as r, CONTENT_TYPE_HEADER as t };