import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/native/machoSymbolName.js
var machoRuntimeSymbolName;
function init_machoSymbolName() {
	return (init_machoSymbolName = __esmMin((() => {
		machoRuntimeSymbolName = (symbolTableName) => {
			if (symbolTableName === null) return null;
			const runtimeName = symbolTableName.startsWith("_") ? symbolTableName.slice(1) : symbolTableName;
			return runtimeName.length === 0 ? null : runtimeName;
		};
	})))();
}

//#endregion
export { init_machoSymbolName, machoRuntimeSymbolName };