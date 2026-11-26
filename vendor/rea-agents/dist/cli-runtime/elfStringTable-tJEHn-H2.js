import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/elfStringTable.js
function elfStringTableText(observed) {
	return observed.bytes?.toString("latin1") ?? null;
}
var observeElfStringTableEntry;
function init_elfStringTable() {
	return (init_elfStringTable = __esmMin((() => {
		observeElfStringTableEntry = (table, offset, maximumBytes) => {
			if (offset < 0 || offset >= table.length) return {
				state: "outside",
				bytes: null,
				examinedBytes: 0,
				contentBytes: 0
			};
			const window = table.subarray(offset, offset + maximumBytes);
			const end = window.indexOf(0);
			if (end < 0) return {
				state: "truncated",
				bytes: null,
				scanLimited: window.length < table.length - offset,
				examinedBytes: window.length,
				contentBytes: window.length
			};
			return {
				state: "terminated",
				bytes: window.subarray(0, end),
				examinedBytes: end + 1,
				contentBytes: end
			};
		};
	})))();
}

//#endregion
export { elfStringTableText, init_elfStringTable, observeElfStringTableEntry };