import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { a as readPeOptionalHeaderStructure, t as init_peOptionalHeader } from "./peOptionalHeader-CeaiI83J.js";

//#region dist/domain/peMachine.js
var architectureForMachine, peOptionalHeaderMagic, NATIVE_OS_OVERRIDES, decodePeMachine, peSubjectArchitecture, readPeOptionalHeader;
function init_peMachine() {
	return (init_peMachine = __esmMin((() => {
		init_peOptionalHeader();
		init_result();
		architectureForMachine = (machine) => {
			switch (machine) {
				case 332: return "x86";
				case 34404: return "x86_64";
				case 448:
				case 450:
				case 452: return "arm";
				case 43620: return "arm64";
			}
			return undefined;
		};
		peOptionalHeaderMagic = (architecture) => architecture === "x86_64" || architecture === "arm64" ? 523 : 267;
		NATIVE_OS_OVERRIDES = [
			17988,
			44484,
			44485,
			31609,
			6547,
			6546
		];
		decodePeMachine = (machine) => {
			const direct = architectureForMachine(machine);
			if (direct !== undefined) return {
				architecture: direct,
				nativeOsOverride: false
			};
			for (const override of NATIVE_OS_OVERRIDES) {
				const architecture = architectureForMachine(machine ^ override);
				if (architecture !== undefined) return {
					architecture,
					nativeOsOverride: true
				};
			}
			return undefined;
		};
		peSubjectArchitecture = (machineType, format) => {
			const machine = decodePeMachine(machineType);
			if (machine === undefined || machine.nativeOsOverride) return undefined;
			const magic = format === "pe32-plus" ? 523 : 267;
			return magic === peOptionalHeaderMagic(machine.architecture) ? machine.architecture : undefined;
		};
		readPeOptionalHeader = (optionalHeader, machineType) => {
			const parsed = readPeOptionalHeaderStructure(optionalHeader);
			if (!parsed.ok) return err({
				kind: parsed.error.kind,
				message: parsed.error.message
			});
			const facts = parsed.value;
			const cli = facts.dataDirectories[14];
			const managed = cli !== undefined && (cli.address !== 0 || cli.size !== 0);
			const decoded = decodePeMachine(machineType);
			const machine = decoded?.nativeOsOverride && !managed ? null : decoded ?? null;
			if (machine !== null && facts.magic !== peOptionalHeaderMagic(machine.architecture)) return err({
				kind: "malformed",
				message: "PE optional-header magic does not match its architecture"
			});
			return ok({
				...facts,
				machine,
				managed
			});
		};
	})))();
}

//#endregion
export { readPeOptionalHeader as i, init_peMachine as n, peSubjectArchitecture as r, decodePeMachine as t };