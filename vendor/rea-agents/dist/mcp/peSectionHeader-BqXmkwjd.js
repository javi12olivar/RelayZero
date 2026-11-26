import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { A as init_binaryContainer, S as BinaryReader } from "./canonicalDigest-DUQN3Yyz.js";

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
//#region dist/domain/peSectionHeader.js
var PE_SECTION_HEADER_BYTES, peSectionVirtualExtent, peSectionTableExtent, observePeHeaderExtent, readPeSectionHeader;
function init_peSectionHeader() {
	return (init_peSectionHeader = __esmMin((() => {
		init_binaryContainer();
		init_result();
		PE_SECTION_HEADER_BYTES = 40;
		peSectionVirtualExtent = (virtualSize, rawSize) => virtualSize === 0 ? rawSize : virtualSize;
		peSectionTableExtent = (optionalHeaderOffset, optionalHeaderSize, sectionCount) => ({
			sectionTableOffset: optionalHeaderOffset + optionalHeaderSize,
			sectionTableBytes: sectionCount * 40
		});
		observePeHeaderExtent = ({ optionalHeaderOffset, optionalHeaderSize, sectionCount, sizeOfHeaders, fileSize }) => {
			const { sectionTableOffset, sectionTableBytes } = peSectionTableExtent(optionalHeaderOffset, optionalHeaderSize, sectionCount);
			const sizeOfHeadersState = sizeOfHeaders < sectionTableOffset + sectionTableBytes ? "before-section-table-end" : sizeOfHeaders > fileSize ? "past-file-end" : "valid";
			return {
				sectionTableOffset,
				sectionTableBytes,
				sizeOfHeadersState
			};
		};
		readPeSectionHeader = (bytes) => {
			if (bytes.length < 40) return err({
				kind: "malformed",
				message: "PE section header is truncated"
			});
			const reader = new BinaryReader(bytes, true, "pe");
			const name = bytes.subarray(0, 8);
			const nul = name.indexOf(0);
			const virtual_size = reader.u32(8);
			const raw_size = reader.u32(16);
			return ok({
				name: name.toString("latin1", 0, nul < 0 ? name.length : nul),
				virtual_size,
				virtual_address: reader.u32(12),
				raw_size,
				offset: reader.u32(20),
				characteristics: reader.u32(36),
				size: Math.min(peSectionVirtualExtent(virtual_size, raw_size), raw_size)
			});
		};
	})))();
}

//#endregion
export { NATIVE_EXPORTS_PROVIDER as A, WEB_SCRIPT_EXPORT_PROVIDER as B, JAVASCRIPT_APPLICATION_PROVIDER as C, KERNEL_MODULE_PROVIDER as D, KERNEL_BUILD_CONFIG_PROVIDER as E, PE_RESOURCES_PROVIDER as F, init_investigationProviders as H, REA_WORKFLOW_PROVIDER as I, RECONSTRUCTION_PROVIDER as L, PE_CERTIFICATES_PROVIDER as M, PE_IMPORTS_PROVIDER as N, MANAGED_STATIC_PROVIDER as O, PE_LOAD_CONFIG_PROVIDER as P, RELEASE_EXPOSURE_PROVIDER as R, HARMONY_APPLICATION_PROVIDER as S, JAVASCRIPT_RUNTIME_RECONCILIATION_PROVIDER as T, WINDOWS_SHORTCUT_PROVIDER as V, DWARF_UNITS_PROVIDER as _, readPeSectionHeader as a, ELF_NOTES_PROVIDER as b, APPLE_APPLICATION_PROVIDER as c, BINARY_HARDENING_PROVIDER as d, BUNDLE_COMPARISON_PROVIDER as f, DEVICETREE_PROVIDER as g, CHANGED_BEHAVIOR_PROVIDER as h, peSectionVirtualExtent as i, NATIVE_INITIALIZERS_PROVIDER as j, MANAGED_WORKFLOW_PROVIDER as k, APPLE_IPS_PROVIDER as l, CALL_PATH_PROVIDER as m, observePeHeaderExtent as n, ANALYSIS_VIEW_PROVIDER as o, BYTE_ENTROPY_PROVIDER as p, peSectionTableExtent as r, ANDROID_APPLICATION_PROVIDER as s, init_peSectionHeader as t, ARTIFACT_GRAPH_PROVIDER as u, ELF_DEBUG_LINK_PROVIDER as v, JAVASCRIPT_APPLICATION_WORKFLOW_PROVIDER as w, ELF_UNWIND_RANGES_PROVIDER as x, ELF_DEPENDENCIES_PROVIDER as y, STATIC_RUNTIME_PROVIDER as z };