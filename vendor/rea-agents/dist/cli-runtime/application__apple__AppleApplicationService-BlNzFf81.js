import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { APPLE_APPLICATION_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { init_appleApplication, projectAppleInventory } from "./applicationToolContracts-BF58W5cg.js";
import { init_InventoryProjectionEvidence, projectInventoryEvidence } from "./InventoryProjectionEvidence-CLL171MC.js";

//#region dist/application/apple/AppleApplicationService.js
var OPERATION, projectAppleApplicationEvidence;
function init_AppleApplicationService() {
	return (init_AppleApplicationService = __esmMin((() => {
		init_appleApplication();
		init_investigationProviders();
		init_InventoryProjectionEvidence();
		OPERATION = "project_apple_application_graph";
		projectAppleApplicationEvidence = (rawInput, lookup, execution) => {
			return projectInventoryEvidence({
				rawInput,
				...lookup === undefined ? {} : { lookup },
				...execution === undefined ? {} : { execution },
				project: projectAppleInventory,
				operation: OPERATION,
				predicateType: "rea.apple-application-graph",
				provider: APPLE_APPLICATION_PROVIDER
			});
		};
	})))();
}

//#endregion
init_AppleApplicationService();
export { projectAppleApplicationEvidence };