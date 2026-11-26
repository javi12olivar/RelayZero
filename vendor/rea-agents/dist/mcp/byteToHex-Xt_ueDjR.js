import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";

//#region dist/kernel/byteToHex.js
var byteToHex;
function init_byteToHex() {
	return (init_byteToHex = __esmMin((() => {
		byteToHex = (byte) => byte.toString(16).padStart(2, "0");
	})))();
}

//#endregion
export { init_byteToHex as n, byteToHex as t };