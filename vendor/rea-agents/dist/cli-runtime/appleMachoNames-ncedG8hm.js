import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { decodeStrictUtf8, init_strictUtf8 } from "./zstandardFrameAllowance-Bw-ySSsA.js";

//#region dist/domain/apple/appleMachoNames.js
var decodeMachoName, decodeMachoFixedName;
function init_appleMachoNames() {
	return (init_appleMachoNames = __esmMin((() => {
		init_strictUtf8();
		decodeMachoName = (bytes) => {
			try {
				return decodeStrictUtf8(bytes, "preserve");
			} catch {
				return { bytes_base64: bytes.toString("base64") };
			}
		};
		decodeMachoFixedName = (bytes) => {
			const nul = bytes.indexOf(0);
			return bytes.subarray(0, nul < 0 ? bytes.length : nul).toString("latin1");
		};
	})))();
}

//#endregion
export { decodeMachoFixedName, decodeMachoName, init_appleMachoNames };