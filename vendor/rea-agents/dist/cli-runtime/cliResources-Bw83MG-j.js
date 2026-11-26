import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/cli/cliResources.js
var cliResources_exports = /* @__PURE__ */ __exportAll({
	closeCliResources: () => closeCliResources,
	ownCliProcessResource: () => ownCliProcessResource
});
var closers, ownCliProcessResource, closeCliResources;
function init_cliResources() {
	return (init_cliResources = __esmMin((() => {
		closers = new Map();
		ownCliProcessResource = (name, close) => {
			if (!closers.has(name)) closers.set(name, close);
		};
		closeCliResources = async () => {
			const results = await Promise.allSettled([...closers.values()].map((close) => close()));
			const failures = results.flatMap((result) => result.status === "rejected" ? [result.reason] : []);
			if (failures.length === 1) throw failures[0];
			if (failures.length > 1) throw new AggregateError(failures, "CLI resource cleanup failed");
		};
	})))();
}

//#endregion
export { cliResources_exports, closeCliResources, init_cliResources, ownCliProcessResource };