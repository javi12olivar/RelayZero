import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { TOOL_FAMILY_IDS, init_toolFamilyIds } from "./toolFamilyIds-CqxikYDX.js";

//#region dist/cli/cliCommandRegistration.js
var plain, withAnalysis;
function init_cliCommandRegistration() {
	return (init_cliCommandRegistration = __esmMin((() => {
		plain = (load, register) => ({
			analysis: false,
			load,
			register
		});
		withAnalysis = (load, register) => ({
			analysis: true,
			load,
			register
		});
	})))();
}

//#endregion
//#region dist/cli/cliCommandRegistrations.js
var CLI_COMMAND_REGISTRATIONS, CLI_FAMILY_REGISTRATIONS, CLI_REGISTRATION_ORDER;
function init_cliCommandRegistrations() {
	return (init_cliCommandRegistrations = __esmMin((() => {
		init_toolFamilyIds();
		init_cliCommandRegistration();
		CLI_COMMAND_REGISTRATIONS = {
			setup: plain(() => import("./setupCommands-BMDFdyhl.js").then((n) => (n.init_setupCommands(), n.setupCommands_exports)), (module, context) => module.registerSetupCommands(context.cli, context.logger, context.environment)),
			coreAnalysis: withAnalysis(() => import("./coreAnalysisCommands-adhirBv0.js").then((n) => (n.init_coreAnalysisCommands(), n.coreAnalysisCommands_exports)), (module, context) => module.registerCoreAnalysisCommands(context.cli, context.logger, context.analysis.runDirectAnalysis, context.environment)),
			reverseEngineering: plain(() => import("./reverseEngineeringCommands-eo4qk6le.js").then((n) => (n.init_reverseEngineeringCommands(), n.reverseEngineeringCommands_exports)), (module, context) => module.registerReverseEngineeringCommands(context.cli, context.logger, context.environment)),
			cutter: plain(() => import("./cutterCommands-CM0tQBlK.js").then((n) => (n.init_cutterCommands(), n.cutterCommands_exports)), (module, context) => module.registerCutterCommands(context.cli, context.logger, context.environment)),
			utility: withAnalysis(() => import("./utilityCommands-C9bq6Ehm.js").then((n) => (n.init_utilityCommands(), n.utilityCommands_exports)), (module, context) => module.registerUtilityCommands(context.cli, context.logger, context.environment, context.analysis)),
			binaryDiagnostics: plain(() => import("./binaryDiagnosticsCommands-DhAqHvSX.js").then((n) => (n.init_binaryDiagnosticsCommands(), n.binaryDiagnosticsCommands_exports)), (module, context) => module.registerBinaryDiagnosticsCommands(context.cli, context.logger, context.environment)),
			wasm: plain(() => import("./wasmCommands-Dw5LyItR.js").then((n) => (n.init_wasmCommands(), n.wasmCommands_exports)), (module, context) => module.registerWasmCommands(context.cli, context.logger, context.environment)),
			apkSignature: plain(() => import("./apkSignatureCommands-DzzgLWyG.js").then((n) => (n.init_apkSignatureCommands(), n.apkSignatureCommands_exports)), (module, context) => module.registerApkSignatureCommands(context.cli, context.logger, context.environment)),
			capture: plain(() => import("./captureCommands-Bp3uFm3X.js").then((n) => (n.init_captureCommands(), n.captureCommands_exports)), (module, context) => module.registerCaptureCommands(context.cli, context.logger, context.environment)),
			signal: plain(() => import("./signalCommands-BkqWgqcf.js").then((n) => (n.init_signalCommands(), n.signalCommands_exports)), (module, context) => module.registerSignalCommands(context.cli, context.logger, context.environment)),
			evm: plain(() => import("./evmCommands-D9k4CGZ-.js").then((n) => (n.init_evmCommands(), n.evmCommands_exports)), (module, context) => module.registerEvmCommands(context.cli, context.logger, context.environment)),
			desktopApplication: plain(() => import("./desktopApplicationCommands-BZ21v2RF.js").then((n) => (n.init_desktopApplicationCommands(), n.desktopApplicationCommands_exports)), (module, context) => module.registerDesktopApplicationCommands(context.cli, context.logger)),
			releaseExposure: plain(() => import("./releaseExposureCommands-CEJLTspg.js").then((n) => (n.init_releaseExposureCommands(), n.releaseExposureCommands_exports)), (module, context) => module.registerReleaseExposureCommands(context.cli, context.logger, context.environment)),
			go: plain(() => import("./goCommands-MyVugLoa.js").then((n) => (n.init_goCommands(), n.goCommands_exports)), (module, context) => module.registerGoCommands(context.cli, context.logger)),
			il2cpp: plain(() => import("./il2cppCommands-C8IkU0IX.js").then((n) => (n.init_il2cppCommands(), n.il2cppCommands_exports)), (module, context) => module.registerIl2cppCommands(context.cli, context.logger)),
			model: plain(() => import("./modelCommands-mEtIjG8H.js").then((n) => (n.init_modelCommands(), n.modelCommands_exports)), (module, context) => module.registerModelCommands(context.cli, context.logger)),
			gpu: plain(() => import("./gpuCommands-4-L4Nsow.js").then((n) => (n.init_gpuCommands(), n.gpuCommands_exports)), (module, context) => module.registerGpuCommands(context.cli, context.logger)),
			rust: plain(() => import("./rustCommands-DGZ0xDK-.js").then((n) => (n.init_rustCommands(), n.rustCommands_exports)), (module, context) => module.registerRustCommands(context.cli, context.logger)),
			pythonPyc: plain(() => import("./pythonPycCommands-CHLf_RKp.js").then((n) => (n.init_pythonPycCommands(), n.pythonPycCommands_exports)), (module, context) => module.registerPythonPycCommands(context.cli, context.logger)),
			nugetNupkg: plain(() => import("./nugetNupkgCommands-C9S6SCKk.js").then((n) => (n.init_nugetNupkgCommands(), n.nugetNupkgCommands_exports)), (module, context) => module.registerNugetNupkgCommands(context.cli, context.logger)),
			erlang: plain(() => import("./erlangCommands-ClsZKdTc.js").then((n) => (n.init_erlangCommands(), n.erlangCommands_exports)), (module, context) => module.registerErlangCommands(context.cli, context.logger)),
			v8CodeCache: plain(() => import("./v8CodeCacheCommands-D6U6UWi_.js").then((n) => (n.init_v8CodeCacheCommands(), n.v8CodeCacheCommands_exports)), (module, context) => module.registerV8CodeCacheCommands(context.cli, context.logger)),
			mavenGradleMetadata: plain(() => import("./mavenGradleMetadataCommands-h9uw776k.js").then((n) => (n.init_mavenGradleMetadataCommands(), n.mavenGradleMetadataCommands_exports)), (module, context) => module.registerMavenGradleMetadataCommands(context.cli, context.logger)),
			sqlite: plain(() => import("./sqliteCommands-C-V1zIgI.js").then((n) => (n.init_sqliteCommands(), n.sqliteCommands_exports)), (module, context) => module.registerSqliteCommands(context.cli, context.logger, context.environment)),
			artifact: withAnalysis(() => import("./artifactCommands-DqCxdsWf.js").then((n) => (n.init_artifactCommands(), n.artifactCommands_exports)), (module, context) => module.registerArtifactCommands(context.cli, context.logger, context.analysis.runProviderAnalysis)),
			managed: withAnalysis(() => import("./managedCommands-C7MV_QJN.js").then((n) => (n.init_managedCommands(), n.managedCommands_exports)), (module, context) => module.registerManagedCommands(context.cli, context.logger, context.analysis)),
			firmware: plain(() => import("./firmwareCommands-Db2gfPU5.js").then((n) => (n.init_firmwareCommands(), n.firmwareCommands_exports)), (module, context) => module.registerFirmwareCommands(context.cli, context.logger, context.environment)),
			uefi: plain(() => import("./uefiCommands-BirRh2sM.js").then((n) => (n.init_uefiCommands(), n.uefiCommands_exports)), (module, context) => module.registerUefiCommands(context.cli, context.logger)),
			android: plain(() => import("./androidCommands-CZ5gWYYc.js").then((n) => (n.init_androidCommands(), n.androidCommands_exports)), (module, context) => module.registerAndroidCommands(context.cli, context.logger, context.environment)),
			pcap: plain(() => import("./pcapCommands-CC36aaDk.js").then((n) => (n.init_pcapCommands(), n.pcapCommands_exports)), (module, context) => module.registerPcapCommands(context.cli, context.logger, context.environment)),
			flutter: plain(() => import("./flutterCommands-UVS98ig6.js").then((n) => (n.init_flutterCommands(), n.flutterCommands_exports)), (module, context) => module.registerFlutterCommands(context.cli, context.logger)),
			frida: plain(() => import("./fridaCommands-jw21igKO.js").then((n) => (n.init_fridaCommands(), n.fridaCommands_exports)), (module, context) => module.registerFridaCommands(context.cli, context.logger, context.fridaInstrumentation)),
			apktool: plain(() => import("./apktoolCommands-DM5k1mKD.js").then((n) => (n.init_apktoolCommands(), n.apktoolCommands_exports)), (module, context) => module.registerApktoolCommands(context.cli, context.logger, context.environment)),
			jeb: plain(() => import("./jebCommands-DEFbWrYt.js").then((n) => (n.init_jebCommands(), n.jebCommands_exports)), (module, context) => module.registerJebCommands(context.cli, context.logger, context.environment)),
			adb: plain(() => import("./adbCommands-BQuBT_k8.js").then((n) => (n.init_adbCommands(), n.adbCommands_exports)), (module, context) => module.registerAdbCommands(context.cli, context.logger, context.environment)),
			browser: plain(() => import("./browserCommands-C-SLAEJC.js").then((n) => (n.init_browserCommands(), n.browserCommands_exports)), (module, context) => module.registerBrowserCommands(context.cli, context.logger, context.environment)),
			webRuntime: plain(() => import("./webRuntimeCommands-Crz1GUlN.js").then((n) => (n.init_webRuntimeCommands(), n.webRuntimeCommands_exports)), (module, context) => module.registerWebRuntimeCommands(context.cli, context.logger)),
			webNetworkCapture: plain(() => import("./webNetworkCaptureCommands-BlA39KDu.js").then((n) => (n.init_webNetworkCaptureCommands(), n.webNetworkCaptureCommands_exports)), (module, context) => module.registerWebNetworkCaptureCommands(context.cli, context.logger, context.environment)),
			advancedBrowser: plain(() => import("./browserAdvancedCommands-vwTORKdE.js").then((n) => (n.init_browserAdvancedCommands(), n.browserAdvancedCommands_exports)), (module, context) => module.registerAdvancedBrowserCommands(context.cli, context.logger)),
			browserScenario: plain(() => import("./cliBrowserScenarioCommands-DZQWXSvi.js").then((n) => (n.init_cliBrowserScenarioCommands(), n.cliBrowserScenarioCommands_exports)), (module, context) => module.registerBrowserScenarioCommands(context.cli, context.logger, context.environment)),
			electron: plain(() => import("./electronCommands-nik57sqz.js").then((n) => (n.init_electronCommands(), n.electronCommands_exports)), (module, context) => module.registerElectronCommands(context.cli, context.logger, context.environment)),
			javaScriptRuntimeObservation: plain(() => import("./javascriptRuntimeCommands-DdhH6Yna.js").then((n) => (n.init_javascriptRuntimeCommands(), n.javascriptRuntimeCommands_exports)), (module, context) => module.registerJavaScriptRuntimeObservationCommands(context.cli, context.logger, context.environment)),
			guidance: plain(() => import("./guidanceCommands-BKUWTBK6.js").then((n) => (n.init_guidanceCommands(), n.guidanceCommands_exports)), (module, context) => module.registerGuidanceCommands(context.cli, context.logger)),
			guidedWorkflow: plain(() => import("./guidedWorkflowCommands-DWLTPzGY.js").then((n) => (n.init_guidedWorkflowCommands(), n.guidedWorkflowCommands_exports)), (module, context) => module.registerGuidedWorkflowCommands(context.cli, context.logger)),
			analysisView: plain(() => import("./analysisViewCommands-C5_tEvvB.js").then((n) => (n.init_analysisViewCommands(), n.analysisViewCommands_exports)), (module, context) => module.registerAnalysisViewCommands(context.cli, context.logger)),
			evidence: plain(() => import("./cliEvidenceCommands-Dbp2atSY.js").then((n) => (n.init_cliEvidenceCommands(), n.cliEvidenceCommands_exports)), (module, context) => module.registerEvidenceCommands(context.cli, context.logger)),
			environment: plain(() => import("./environmentCommands-lFejApUU.js").then((n) => (n.init_environmentCommands(), n.environmentCommands_exports)), (module, context) => module.registerEnvironmentCommands(context.cli, context.logger, context.environment)),
			process: plain(() => import("./processCommands-DkFGesyA.js").then((n) => (n.init_processCommands(), n.processCommands_exports)), (module, context) => module.registerProcessCommands(context.cli, context.logger, context.environment)),
			desktopCapture: plain(() => import("./desktopCaptureCommands-MBIrn49f.js").then((n) => (n.init_desktopCaptureCommands(), n.desktopCaptureCommands_exports)), (module, context) => module.registerDesktopCaptureCommands(context.cli, context.logger, context.environment)),
			javaScriptRecovery: plain(() => import("./javascriptRecoveryCommands-BVMVSZb4.js").then((n) => (n.init_javascriptRecoveryCommands(), n.javascriptRecoveryCommands_exports)), (module, context) => module.registerJavaScriptRecoveryCommands(context.cli, context.logger, context.environment)),
			webScript: plain(() => import("./webScriptCommands-Fxubu07c.js").then((n) => (n.init_webScriptCommands(), n.webScriptCommands_exports)), (module, context) => module.registerWebScriptCommands(context.cli, context.logger)),
			webModule: plain(() => import("./webModuleCommands-BvEEugiW.js").then((n) => (n.init_webModuleCommands(), n.webModuleCommands_exports)), (module, context) => module.registerWebModuleCommands(context.cli, context.logger, context.environment)),
			webSourceLocation: plain(() => import("./webSourceLocationCommands-CVyg26T1.js").then((n) => (n.init_webSourceLocationCommands(), n.webSourceLocationCommands_exports)), (module, context) => module.registerWebSourceLocationCommands(context.cli, context.logger, context.environment)),
			application: plain(() => import("./applicationCommands-BaMbNQmE.js").then((n) => (n.init_applicationCommands(), n.applicationCommands_exports)), (module, context) => module.registerApplicationCommands(context.cli, context.logger)),
			nativeFunctionMatching: plain(() => import("./nativeFunctionMatchingCommands-CQlBVjRj.js").then((n) => (n.init_nativeFunctionMatchingCommands(), n.nativeFunctionMatchingCommands_exports)), (module, context) => module.registerNativeFunctionMatchingCommands(context.cli, context.logger, context.environment))
		};
		CLI_FAMILY_REGISTRATIONS = {
			setup: ["setup"],
			direct: ["coreAnalysis"],
			enhanced: [],
			native: [
				"reverseEngineering",
				"cutter",
				"utility",
				"binaryDiagnostics"
			],
			artifact: [
				"wasm",
				"apkSignature",
				"capture",
				"signal",
				"evm",
				"desktopApplication",
				"releaseExposure",
				"go",
				"il2cpp",
				"model",
				"gpu",
				"rust",
				"pythonPyc",
				"nugetNupkg",
				"erlang",
				"v8CodeCache",
				"mavenGradleMetadata",
				"sqlite",
				"artifact"
			],
			managed: ["managed"],
			firmware: ["firmware"],
			uefi: ["uefi"],
			android: ["android"],
			pcap: ["pcap"],
			flutter: ["flutter"],
			frida: ["frida"],
			apktool: ["apktool"],
			jeb: ["jeb"],
			adb: ["adb"],
			browser: [
				"browser",
				"webRuntime",
				"webNetworkCapture",
				"advancedBrowser",
				"browserScenario"
			],
			electron: ["electron"],
			"javascript-runtime": ["javaScriptRuntimeObservation"],
			application: [
				"guidance",
				"guidedWorkflow",
				"analysisView",
				"evidence",
				"environment",
				"process",
				"desktopCapture",
				"javaScriptRecovery",
				"webScript",
				"webModule",
				"webSourceLocation",
				"application"
			],
			session: ["nativeFunctionMatching"]
		};
		CLI_REGISTRATION_ORDER = ["setup", ...TOOL_FAMILY_IDS].flatMap((family) => CLI_FAMILY_REGISTRATIONS[family]);
	})))();
}

//#endregion
export { CLI_COMMAND_REGISTRATIONS, CLI_REGISTRATION_ORDER, init_cliCommandRegistrations };