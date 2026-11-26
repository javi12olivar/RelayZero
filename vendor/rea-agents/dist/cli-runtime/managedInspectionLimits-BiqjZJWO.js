import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { z } from "zod";

//#region dist/domain/managed/managedInspectionLimits.js
var DEFAULT_MANAGED_SNAPSHOT_BYTES, DEFAULT_MANAGED_REPRESENTATION_BYTES, managedRepresentationLimit, managedInspectionBudgetShape;
function init_managedInspectionLimits() {
	return (init_managedInspectionLimits = __esmMin((() => {
		DEFAULT_MANAGED_SNAPSHOT_BYTES = 128 * 1024 * 1024;
		DEFAULT_MANAGED_REPRESENTATION_BYTES = 64 * 1024 * 1024;
		managedRepresentationLimit = (maximumBytes) => ({
			control_kind: "parameter",
			parameter: "max_metadata_representation_bytes",
			effective_value: maximumBytes,
			unit: "bytes",
			minimum: 1,
			maximum: Number.MAX_SAFE_INTEGER,
			default_value: DEFAULT_MANAGED_REPRESENTATION_BYTES,
			applies_at: "next_call"
		});
		managedInspectionBudgetShape = {
			max_snapshot_bytes: z.int().positive().optional().describe(`Maximum eagerly retained PE snapshot bytes; omitted means ${String(DEFAULT_MANAGED_SNAPSHOT_BYTES)}. Raise for the next call to admit the same larger complete file; no restart. This does not raise metadata representation or host memory.`),
			max_metadata_representation_bytes: z.int().positive().optional().describe(`Maximum accounted metadata, CIL and projected JSON bytes; omitted means ${String(DEFAULT_MANAGED_REPRESENTATION_BYTES)}. Raise for the next call after resource-limit coverage, or select fewer type_names for member inspection. No restart; snapshot, transport and host memory limits remain independent.`)
		};
	})))();
}

//#endregion
export { DEFAULT_MANAGED_REPRESENTATION_BYTES, DEFAULT_MANAGED_SNAPSHOT_BYTES, init_managedInspectionLimits, managedInspectionBudgetShape, managedRepresentationLimit };