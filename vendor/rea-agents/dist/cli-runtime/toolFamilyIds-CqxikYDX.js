import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/contracts/toolFamilyIds.js
var TOOL_FAMILY_IDS, isToolFamilyId, isToolFamilyAdvertised, registerToolFamilies;
function init_toolFamilyIds() {
	return (init_toolFamilyIds = __esmMin((() => {
		TOOL_FAMILY_IDS = [
			"direct",
			"enhanced",
			"native",
			"artifact",
			"managed",
			"firmware",
			"uefi",
			"android",
			"pcap",
			"flutter",
			"frida",
			"apktool",
			"jeb",
			"adb",
			"browser",
			"electron",
			"javascript-runtime",
			"application",
			"session"
		];
		isToolFamilyId = (value) => TOOL_FAMILY_IDS.includes(value);
		isToolFamilyAdvertised = (selection, family) => selection === undefined || family !== undefined && selection.has(family);
		registerToolFamilies = (registrars) => {
			for (const id of TOOL_FAMILY_IDS) registrars[id]();
		};
	})))();
}

//#endregion
export { TOOL_FAMILY_IDS, init_toolFamilyIds, isToolFamilyAdvertised, isToolFamilyId };