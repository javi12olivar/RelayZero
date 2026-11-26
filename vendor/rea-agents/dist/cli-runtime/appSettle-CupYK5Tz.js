import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_sha256Hex, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";

//#region dist/domain/desktop/appSettle.js
var SETTLE_TIMING, DATA_OBJECTS, textField, appFileDigests;
function init_appSettle() {
	return (init_appSettle = __esmMin((() => {
		init_sha256Hex();
		SETTLE_TIMING = {
			intervalMs: 500,
			windowMs: 3e3,
			boundMs: 15e3
		};
		DATA_OBJECTS = "urn:agentenv:data-objects/v1";
		textField = (value, key) => {
			const field = typeof value === "object" && value !== null ? value[key] : undefined;
			return typeof field === "string" ? field : undefined;
		};
		appFileDigests = (parts) => JSON.stringify(parts.flatMap((part, index) => {
			if (textField(part, "kind") !== "file") return [];
			const { file, metadata } = part;
			const content = textField(file, "bytes") ?? textField(file, "uri");
			return [[textField(metadata?.[DATA_OBJECTS], "path") ?? `#${String(index)}`, sha256Hex(content ?? "")]];
		}).sort(([left = ""], [right = ""]) => left < right ? -1 : left > right ? 1 : 0));
	})))();
}

//#endregion
export { SETTLE_TIMING, init_appSettle };