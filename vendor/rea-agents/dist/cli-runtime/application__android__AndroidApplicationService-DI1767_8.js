import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ANDROID_APPLICATION_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { init_androidApplication, projectAndroidInventory } from "./applicationToolContracts-BF58W5cg.js";
import { init_InventoryProjectionEvidence, projectInventoryEvidence } from "./InventoryProjectionEvidence-CLL171MC.js";

//#region dist/application/android/AndroidApplicationService.js
var OPERATION, projectAndroidApplicationEvidence;
function init_AndroidApplicationService() {
	return (init_AndroidApplicationService = __esmMin((() => {
		init_androidApplication();
		init_investigationProviders();
		init_InventoryProjectionEvidence();
		OPERATION = "project_android_application_graph";
		projectAndroidApplicationEvidence = (rawInput, lookup, execution) => {
			return projectInventoryEvidence({
				rawInput,
				...lookup === undefined ? {} : { lookup },
				...execution === undefined ? {} : { execution },
				project: projectAndroidInventory,
				operation: OPERATION,
				predicateType: "rea.android-application-graph",
				provider: ANDROID_APPLICATION_PROVIDER
			});
		};
	})))();
}

//#endregion
init_AndroidApplicationService();
export { projectAndroidApplicationEvidence };