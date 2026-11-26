import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { init_parseConfig, parseConfig } from "./parseConfig-Bllp42MT.js";

//#region dist/composition/directAnalysis.js
var directAnalysis_exports = /* @__PURE__ */ __exportAll({
	bindDirectAnalysis: () => bindDirectAnalysis,
	createDirectAnalysis: () => createDirectAnalysis,
	runManagedProviderExecution: () => runManagedProviderExecution
});
var createDirectAnalysis, bindDirectAnalysis, runManagedProviderExecution;
function init_directAnalysis() {
	return (init_directAnalysis = __esmMin((() => {
		init_snapshotEnvironment();
		init_HostPlatform();
		init_parseConfig();
		createDirectAnalysis = (selectedEnvironment) => {
			const environment = snapshotEnvironment(selectedEnvironment, HOST_PLATFORM.platform);
			const dependencies = {
				readConfiguration: () => parseConfig(environment),
				createBinarySession: async (config, logger) => {
					const { createBinarySession } = await import("./binary-Ldu-KATf.js").then((n) => (n.init_binary(), n.binary_exports));
					return createBinarySession(config, logger, environment);
				},
				createManagedBinarySession: async () => {
					const { createManagedBinarySession } = await import("./binary-Ldu-KATf.js").then((n) => (n.init_binary(), n.binary_exports));
					return createManagedBinarySession();
				},
				createNativeDispatchBinarySession: async (config, logger) => {
					const { createNativeDispatchBinarySession } = await import("./binary-Ldu-KATf.js").then((n) => (n.init_binary(), n.binary_exports));
					return createNativeDispatchBinarySession(config, logger, environment);
				},
				createNativeBinarySession: async () => {
					const { createNativeBinarySession } = await import("./binary-Ldu-KATf.js").then((n) => (n.init_binary(), n.binary_exports));
					return createNativeBinarySession(environment);
				},
				createArtifactBinarySession: async () => {
					const { createArtifactBinarySession } = await import("./binary-Ldu-KATf.js").then((n) => (n.init_binary(), n.binary_exports));
					return createArtifactBinarySession(environment);
				}
			};
			return bindDirectAnalysis(dependencies);
		};
		bindDirectAnalysis = (dependencies) => {
			const runDirectAnalysis = async (...args) => {
				const { runDirectAnalysis } = await import("./DirectAnalysis-EOJiJICz.js").then((n) => (n.init_DirectAnalysis(), n.DirectAnalysis_exports));
				return runDirectAnalysis(dependencies, ...args);
			};
			const runProviderAnalysis = async (...args) => {
				const { runProviderAnalysis } = await import("./DirectAnalysis-EOJiJICz.js").then((n) => (n.init_DirectAnalysis(), n.DirectAnalysis_exports));
				return runProviderAnalysis(dependencies, ...args);
			};
			const runManagedProviderEvidence = async (...args) => {
				const { runManagedProviderEvidence } = await import("./DirectAnalysis-EOJiJICz.js").then((n) => (n.init_DirectAnalysis(), n.DirectAnalysis_exports));
				return runManagedProviderEvidence(dependencies, ...args);
			};
			const runSessionStatus = async (...args) => {
				const { runSessionStatus } = await import("./application__DirectAnalysisStatus-C7kH7nr6.js");
				return runSessionStatus(dependencies, ...args);
			};
			return {
				runDirectAnalysis,
				runProviderAnalysis,
				runManagedProviderEvidence,
				runSessionStatus
			};
		};
		runManagedProviderExecution = async (...args) => {
			const { runManagedProviderExecution } = await import("./DirectAnalysis-EOJiJICz.js").then((n) => (n.init_DirectAnalysis(), n.DirectAnalysis_exports));
			return runManagedProviderExecution({ createManagedBinarySession: async () => {
				const { createManagedBinarySession } = await import("./binary-Ldu-KATf.js").then((n) => (n.init_binary(), n.binary_exports));
				return createManagedBinarySession();
			} }, ...args);
		};
	})))();
}

//#endregion
export { createDirectAnalysis, directAnalysis_exports, init_directAnalysis };