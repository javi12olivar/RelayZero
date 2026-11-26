import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/uefi/uefiLimits.js
var UEFI_FIRMWARE_LIMITS;
function init_uefiLimits() {
	return (init_uefiLimits = __esmMin((() => {
		UEFI_FIRMWARE_LIMITS = {
			/** Largest accepted firmware image; Gigabyte AMI images are 16 MiB. */
			inputBytes: 128 * 1024 * 1024,
			/** Prefix bytes inspected for signature-based format admission. */
			scanProbeBytes: 1024 * 1024,
			/** Maximum firmware volumes mapped before coverage turns partial. */
			maxVolumes: 1024,
			defaultMaxVolumes: 512,
			/** Maximum FFS files mapped before coverage turns partial. */
			maxFiles: 1e5,
			defaultMaxFiles: 2e4,
			/** Maximum nested section and sub-volume depth, clamped by caller input. */
			maxDepth: 5,
			defaultMaxDepth: 3,
			/** Maximum total bytes of staged extraction files. */
			maxOutputBytes: 256 * 1024 * 1024,
			defaultMaxOutputBytes: 256 * 1024 * 1024,
			maxOutputFiles: 1e4,
			defaultMaxOutputFiles: 1e4,
			/** Whole-operation deadline for parser and worker runs. */
			timeoutMs: 6e4,
			/** Per-stream decompressed output ceiling for both decoders. */
			lzmaOutputBytes: 64 * 1024 * 1024,
			/** Shared structural record ceiling per inspection or extraction. */
			scanRecords: 1e5,
			/** Limit retained and traversed decoded data across all streams in an operation. */
			decodedBytes: 128 * 1024 * 1024,
			/** Diagnostic text retained inline before truncation. */
			diagnosticBytes: 8 * 1024 * 1024
		};
	})))();
}

//#endregion
export { UEFI_FIRMWARE_LIMITS, init_uefiLimits };