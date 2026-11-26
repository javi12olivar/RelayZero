import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/kernel/byteToHex.js
var byteToHex;
function init_byteToHex() {
	return (init_byteToHex = __esmMin((() => {
		byteToHex = (byte) => byte.toString(16).padStart(2, "0");
	})))();
}

//#endregion
export { byteToHex, init_byteToHex };