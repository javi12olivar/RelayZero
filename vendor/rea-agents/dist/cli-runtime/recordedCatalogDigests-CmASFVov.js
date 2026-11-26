import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/contracts/catalog/recordedCatalogDigests.js
var RECORDED_CATALOG_DIGEST_PROFILES, RECORDED_DEFAULT_CATALOG_IDENTITY;
function init_recordedCatalogDigests() {
	return (init_recordedCatalogDigests = __esmMin((() => {
		RECORDED_CATALOG_DIGEST_PROFILES = Object.freeze({
			"off": Object.freeze({
				"tools_sha256": "ce195f28c7f286af9ee1a4174e5a9d54eda490e95a913c48592316740bd34bf1",
				"prompts_sha256": "60078bd8ef8bd152b51440e7579fba2059beec18fec5148dd0ec10ef013213fe",
				"combined_sha256": "62c90a6f14e5bca55fd374cf47de20008f65d740f3d3c631fb0821905fc46744"
			}),
			"compact": Object.freeze({
				"tools_sha256": "05882072f58e069bb23a875215193f8c2bad1c2ff124a84fa4047151539f1760",
				"prompts_sha256": "60078bd8ef8bd152b51440e7579fba2059beec18fec5148dd0ec10ef013213fe",
				"combined_sha256": "5a534c99cf62e59b0fb72592f42019acd89dfd6e7368ff573a346d65a5a28a3c"
			})
		});
		RECORDED_DEFAULT_CATALOG_IDENTITY = Object.freeze({
			counts: Object.freeze({
				"cli_commands": 204,
				"mcp_tools": 263,
				"mcp_prompts": 6
			}),
			digests: Object.freeze({
				"tools_sha256": "ce195f28c7f286af9ee1a4174e5a9d54eda490e95a913c48592316740bd34bf1",
				"prompts_sha256": "60078bd8ef8bd152b51440e7579fba2059beec18fec5148dd0ec10ef013213fe",
				"combined_sha256": "62c90a6f14e5bca55fd374cf47de20008f65d740f3d3c631fb0821905fc46744"
			})
		});
	})))();
}

//#endregion
export { RECORDED_CATALOG_DIGEST_PROFILES, RECORDED_DEFAULT_CATALOG_IDENTITY, init_recordedCatalogDigests };