import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/kernel/nodeCodecResult.js
var nodeCodecResult;
function init_nodeCodecResult() {
	return (init_nodeCodecResult = __esmMin((() => {
		nodeCodecResult = (value) => {
			if (typeof value !== "object" || value === null || !("buffer" in value) || !Buffer.isBuffer(value.buffer) || !("engine" in value) || typeof value.engine !== "object" || value.engine === null || !("bytesWritten" in value.engine) || typeof value.engine.bytesWritten !== "number") throw new Error("Built-in decoder omitted its buffer or consumed-input accounting");
			return {
				buffer: value.buffer,
				consumedBytes: value.engine.bytesWritten
			};
		};
	})))();
}

//#endregion
export { init_nodeCodecResult, nodeCodecResult };