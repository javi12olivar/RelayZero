import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/desktop/buildComputerSettings.js
var BUILD_COMPUTER_SETTINGS, BUNDLE_SETTING_VARIABLE;
function init_buildComputerSettings() {
	return (init_buildComputerSettings = __esmMin((() => {
		BUILD_COMPUTER_SETTINGS = [
			"REA_AGENT_ENV_COMMAND",
			"REA_DOCKER_COMMAND",
			"REA_BUILD_COMPUTER_REA_ARCHIVE"
		];
		BUNDLE_SETTING_VARIABLE = /^REA_[A-Z0-9_]{1,60}$/u;
	})))();
}

//#endregion
export { BUILD_COMPUTER_SETTINGS, BUNDLE_SETTING_VARIABLE, init_buildComputerSettings };