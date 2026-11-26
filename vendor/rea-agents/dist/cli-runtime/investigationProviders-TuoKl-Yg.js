import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/investigationProviders.js
var REA_WORKFLOW_PROVIDER, ARTIFACT_GRAPH_PROVIDER, MANAGED_STATIC_PROVIDER, PE_RESOURCES_PROVIDER, PE_CERTIFICATES_PROVIDER, PE_IMPORTS_PROVIDER, WINDOWS_SHORTCUT_PROVIDER, DEVICETREE_PROVIDER, ELF_NOTES_PROVIDER, DWARF_UNITS_PROVIDER, ELF_DEBUG_LINK_PROVIDER, ELF_UNWIND_RANGES_PROVIDER, APPLE_IPS_PROVIDER, KERNEL_MODULE_PROVIDER, ELF_DEPENDENCIES_PROVIDER, NATIVE_INITIALIZERS_PROVIDER, KERNEL_BUILD_CONFIG_PROVIDER, BYTE_ENTROPY_PROVIDER, NATIVE_EXPORTS_PROVIDER, MANAGED_WORKFLOW_PROVIDER, APPLE_APPLICATION_PROVIDER, ANDROID_APPLICATION_PROVIDER, HARMONY_APPLICATION_PROVIDER, WEB_SCRIPT_EXPORT_PROVIDER, JAVASCRIPT_APPLICATION_PROVIDER, JAVASCRIPT_RUNTIME_RECONCILIATION_PROVIDER, ANALYSIS_VIEW_PROVIDER, JAVASCRIPT_APPLICATION_WORKFLOW_PROVIDER, BUNDLE_COMPARISON_PROVIDER, CHANGED_BEHAVIOR_PROVIDER, CALL_PATH_PROVIDER, STATIC_RUNTIME_PROVIDER, RECONSTRUCTION_PROVIDER, PE_LOAD_CONFIG_PROVIDER, RELEASE_EXPOSURE_PROVIDER, BINARY_HARDENING_PROVIDER;
function init_investigationProviders() {
	return (init_investigationProviders = __esmMin((() => {
		REA_WORKFLOW_PROVIDER = {
			id: "rea-workflow",
			name: "REA composed investigation workflow",
			version: "1"
		};
		ARTIFACT_GRAPH_PROVIDER = Object.freeze({
			id: "rea-artifact-graph",
			name: "REA safe artifact graph provider",
			version: "1"
		});
		MANAGED_STATIC_PROVIDER = Object.freeze({
			id: "rea-dotnet-static",
			name: "REA managed static analysis provider",
			version: "1"
		});
		PE_RESOURCES_PROVIDER = Object.freeze({
			id: "rea-pe-resources",
			name: "REA PE resource parser",
			version: "1"
		});
		PE_CERTIFICATES_PROVIDER = Object.freeze({
			id: "rea-pe-certificates",
			name: "REA PE certificate parser",
			version: "1"
		});
		PE_IMPORTS_PROVIDER = Object.freeze({
			id: "rea-pe-imports",
			name: "REA PE import parser",
			version: "1"
		});
		WINDOWS_SHORTCUT_PROVIDER = Object.freeze({
			id: "rea-windows-shortcut",
			name: "REA Windows shortcut parser",
			version: "1"
		});
		DEVICETREE_PROVIDER = Object.freeze({
			id: "rea-devicetree",
			name: "REA flattened devicetree parser",
			version: "1"
		});
		ELF_NOTES_PROVIDER = Object.freeze({
			id: "rea-elf-notes",
			name: "REA ELF note parser",
			version: "1"
		});
		DWARF_UNITS_PROVIDER = Object.freeze({
			id: "rea-dwarf-units",
			name: "REA DWARF compile-unit parser",
			version: "1"
		});
		ELF_DEBUG_LINK_PROVIDER = Object.freeze({
			id: "rea-elf-debug-link",
			name: "REA ELF debug-link parser",
			version: "1"
		});
		ELF_UNWIND_RANGES_PROVIDER = Object.freeze({
			id: "rea-elf-unwind-ranges",
			name: "REA ELF unwind range parser",
			version: "1"
		});
		APPLE_IPS_PROVIDER = Object.freeze({
			id: "rea-apple-ips",
			name: "REA Apple IPS parser",
			version: "1"
		});
		KERNEL_MODULE_PROVIDER = Object.freeze({
			id: "rea-kernel-module",
			name: "REA kernel module parser",
			version: "1"
		});
		ELF_DEPENDENCIES_PROVIDER = Object.freeze({
			id: "rea-elf-dependencies",
			name: "REA ELF dependency parser",
			version: "1"
		});
		NATIVE_INITIALIZERS_PROVIDER = Object.freeze({
			id: "rea-native-initializers",
			name: "REA ELF and Mach-O initializer parser",
			version: "1"
		});
		KERNEL_BUILD_CONFIG_PROVIDER = Object.freeze({
			id: "rea-kernel-build-config",
			name: "REA kernel build config parser",
			version: "1"
		});
		BYTE_ENTROPY_PROVIDER = Object.freeze({
			id: "byte-entropy",
			name: "REA byte entropy",
			version: "1"
		});
		NATIVE_EXPORTS_PROVIDER = Object.freeze({
			id: "rea-native-exports",
			name: "REA PE/ELF export table reader",
			version: "1"
		});
		MANAGED_WORKFLOW_PROVIDER = {
			id: "rea-dotnet-workflows",
			name: "REA managed-code workflows",
			version: "1"
		};
		APPLE_APPLICATION_PROVIDER = {
			id: "rea-apple-application",
			name: "REA Apple application workflows",
			version: "1"
		};
		ANDROID_APPLICATION_PROVIDER = {
			id: "rea-android-application",
			name: "REA Android application workflows",
			version: "1"
		};
		HARMONY_APPLICATION_PROVIDER = {
			id: "rea-harmony-application",
			name: "REA HarmonyOS application workflows",
			version: "1"
		};
		WEB_SCRIPT_EXPORT_PROVIDER = {
			id: "rea-web-script-export",
			name: "REA captured script export",
			version: "1"
		};
		JAVASCRIPT_APPLICATION_PROVIDER = {
			id: "rea-javascript-application",
			name: "REA JavaScript application analyzer",
			version: "1"
		};
		JAVASCRIPT_RUNTIME_RECONCILIATION_PROVIDER = {
			id: "rea-javascript-runtime-reconciliation",
			name: "REA JavaScript runtime reconciliation",
			version: "1"
		};
		ANALYSIS_VIEW_PROVIDER = {
			id: "rea-analysis-view",
			name: "REA analysis view projection",
			version: "1"
		};
		JAVASCRIPT_APPLICATION_WORKFLOW_PROVIDER = {
			id: "rea-javascript-application-workflows",
			name: "REA JavaScript application workflows",
			version: "1"
		};
		BUNDLE_COMPARISON_PROVIDER = {
			id: "rea-bundle-comparison",
			name: "REA Evidence bundle comparison",
			version: "1"
		};
		CHANGED_BEHAVIOR_PROVIDER = {
			id: "rea-changed-behavior",
			name: "REA changed behavior investigation",
			version: "1"
		};
		CALL_PATH_PROVIDER = {
			id: "rea-call-path",
			name: "REA call path reconstruction",
			version: "1"
		};
		STATIC_RUNTIME_PROVIDER = {
			id: "rea-static-runtime-correlation",
			name: "REA static/runtime correlation",
			version: "1"
		};
		RECONSTRUCTION_PROVIDER = {
			id: "rea-reconstruction-verifier",
			name: "REA reconstruction verifier",
			version: "1"
		};
		PE_LOAD_CONFIG_PROVIDER = Object.freeze({
			id: "rea-pe-load-config",
			name: "REA PE TLS/load-config parser",
			version: "1"
		});
		RELEASE_EXPOSURE_PROVIDER = Object.freeze({
			id: "rea-release-exposure",
			name: "REA release exposure audit",
			version: "1"
		});
		BINARY_HARDENING_PROVIDER = Object.freeze({
			id: "rea-binary-hardening",
			name: "REA binary hardening parser",
			version: "1"
		});
	})))();
}

//#endregion
export { ANALYSIS_VIEW_PROVIDER, ANDROID_APPLICATION_PROVIDER, APPLE_APPLICATION_PROVIDER, APPLE_IPS_PROVIDER, ARTIFACT_GRAPH_PROVIDER, BINARY_HARDENING_PROVIDER, BYTE_ENTROPY_PROVIDER, DEVICETREE_PROVIDER, DWARF_UNITS_PROVIDER, ELF_DEBUG_LINK_PROVIDER, ELF_DEPENDENCIES_PROVIDER, ELF_NOTES_PROVIDER, ELF_UNWIND_RANGES_PROVIDER, HARMONY_APPLICATION_PROVIDER, JAVASCRIPT_APPLICATION_PROVIDER, JAVASCRIPT_APPLICATION_WORKFLOW_PROVIDER, JAVASCRIPT_RUNTIME_RECONCILIATION_PROVIDER, KERNEL_BUILD_CONFIG_PROVIDER, KERNEL_MODULE_PROVIDER, MANAGED_STATIC_PROVIDER, MANAGED_WORKFLOW_PROVIDER, NATIVE_EXPORTS_PROVIDER, NATIVE_INITIALIZERS_PROVIDER, PE_CERTIFICATES_PROVIDER, PE_IMPORTS_PROVIDER, PE_LOAD_CONFIG_PROVIDER, PE_RESOURCES_PROVIDER, REA_WORKFLOW_PROVIDER, RELEASE_EXPOSURE_PROVIDER, WEB_SCRIPT_EXPORT_PROVIDER, WINDOWS_SHORTCUT_PROVIDER, init_investigationProviders };