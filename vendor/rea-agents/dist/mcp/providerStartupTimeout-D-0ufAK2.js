import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { $t as init_analysisResourceLimits, en as timerDurationMsSchema, qt as MAX_GHIDRA_DECOMPILE_TIMEOUT_SECONDS } from "./jsonValue-BIEmjG1z.js";
import { z } from "zod";

//#region dist/process/snapshotEnvironment.js
var mergeEnvironmentOverrides, snapshotEnvironment;
function init_snapshotEnvironment() {
	return (init_snapshotEnvironment = __esmMin((() => {
		mergeEnvironmentOverrides = (existing, overrides, platform) => {
			const selected = new Map();
			for (const layer of [existing, overrides]) for (const [key, value] of Object.entries(layer)) selected.set(platform === "win32" ? key.toUpperCase() : key, [key, value]);
			return Object.freeze(Object.fromEntries(selected.values()));
		};
		snapshotEnvironment = (environment, platform) => {
			const selected = mergeEnvironmentOverrides({}, environment, platform);
			if (platform !== "win32") return selected;
			return Object.freeze(Object.fromEntries(Object.entries(selected).map(([key, value]) => [key.toUpperCase(), value]).sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)));
		};
	})))();
}

//#endregion
//#region dist/config/providerStartupTimeout.js
var DEFAULT_SWIFTC_COMPILE_TIMEOUT_MS, ghidraDecompileTimeoutSchema, providerStartupTimeoutSchema;
function init_providerStartupTimeout() {
	return (init_providerStartupTimeout = __esmMin((() => {
		init_analysisResourceLimits();
		DEFAULT_SWIFTC_COMPILE_TIMEOUT_MS = 12e4;
		ghidraDecompileTimeoutSchema = z.string().regex(/^[1-9]\d*$/u, "must be a positive decimal integer").transform(Number).pipe(z.number().int().min(1).max(MAX_GHIDRA_DECOMPILE_TIMEOUT_SECONDS));
		providerStartupTimeoutSchema = z.string().regex(/^[1-9]\d*$/u, "must be a positive decimal integer").transform(Number).pipe(timerDurationMsSchema);
	})))();
}

//#endregion
export { init_snapshotEnvironment as a, providerStartupTimeoutSchema as i, ghidraDecompileTimeoutSchema as n, mergeEnvironmentOverrides as o, init_providerStartupTimeout as r, snapshotEnvironment as s, DEFAULT_SWIFTC_COMPILE_TIMEOUT_MS as t };