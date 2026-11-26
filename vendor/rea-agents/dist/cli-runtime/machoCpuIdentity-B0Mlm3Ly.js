import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/apple/machoCpuIdentity.js
var CPU_SUBTYPE_CAPABILITY_MASK, ARM64_HOST_SUBTYPE_PREFERENCE, X86_64_HOST_SUBTYPE_PREFERENCE, X86_HOST_SUBTYPE_PREFERENCE, ARM64_32_HOST_SUBTYPE_PREFERENCE, MACHO_HOST_SUBTYPE_PREFERENCE, machoHostSubtypeRank, machoCpuSubtypeBase, ARM32_SUBTYPES, machoKnownArm32Subtype, machoKnownArm64Subtype, machoKnownX86_64Subtype, machoArchitectureName, machoArchitectureFamily;
function init_machoCpuIdentity() {
	return (init_machoCpuIdentity = __esmMin((() => {
		CPU_SUBTYPE_CAPABILITY_MASK = 4278190080;
		ARM64_HOST_SUBTYPE_PREFERENCE = [
			0,
			2,
			1
		];
		X86_64_HOST_SUBTYPE_PREFERENCE = [3];
		X86_HOST_SUBTYPE_PREFERENCE = [3];
		ARM64_32_HOST_SUBTYPE_PREFERENCE = [1];
		MACHO_HOST_SUBTYPE_PREFERENCE = {
			7: X86_HOST_SUBTYPE_PREFERENCE,
			16777223: X86_64_HOST_SUBTYPE_PREFERENCE,
			16777228: ARM64_HOST_SUBTYPE_PREFERENCE,
			33554444: ARM64_32_HOST_SUBTYPE_PREFERENCE
		};
		machoHostSubtypeRank = (cpuType, cpuSubtype) => {
			const preference = MACHO_HOST_SUBTYPE_PREFERENCE[cpuType] ?? [];
			const rank = preference.indexOf(machoCpuSubtypeBase(cpuSubtype));
			return rank < 0 ? preference.length : rank;
		};
		machoCpuSubtypeBase = (cpuSubtype) => cpuSubtype & ~CPU_SUBTYPE_CAPABILITY_MASK;
		ARM32_SUBTYPES = new Map([
			[0, "arm"],
			[5, "armv4t"],
			[6, "armv6"],
			[7, "armv5tej"],
			[8, "xscale"],
			[9, "armv7"],
			[10, "armv7f"],
			[11, "armv7s"],
			[12, "armv7k"],
			[13, "armv8"],
			[14, "armv6m"],
			[15, "armv7m"],
			[16, "armv7em"],
			[17, "armv8m.main"],
			[18, "armv8m.base"],
			[19, "armv8.1m.main"]
		]);
		machoKnownArm32Subtype = (cpuSubtype) => ARM32_SUBTYPES.get(machoCpuSubtypeBase(cpuSubtype));
		machoKnownArm64Subtype = (cpuSubtype) => {
			switch (machoCpuSubtypeBase(cpuSubtype)) {
				case 0: return "arm64";
				case 1: return "arm64v8";
				case 2: return "arm64e";
				case 12: return "arm64e.x1";
				default: return undefined;
			}
		};
		machoKnownX86_64Subtype = (cpuSubtype) => {
			switch (machoCpuSubtypeBase(cpuSubtype)) {
				case 3: return "x86_64";
				case 8: return "x86_64h";
				default: return undefined;
			}
		};
		machoArchitectureName = (cpuType, cpuSubtype) => {
			if (cpuType === 16777228) {
				return machoKnownArm64Subtype(cpuSubtype) ?? "arm64";
			}
			if (cpuType === 33554444) return "arm64_32";
			if (cpuType === 16777223) return machoKnownX86_64Subtype(cpuSubtype) ?? "x86_64";
			if (cpuType === 7) return "i386";
			if (cpuType === 12) return "arm";
			return `cpu-${cpuType.toString(16)}`;
		};
		machoArchitectureFamily = (architecture) => {
			if (architecture === "arm64e.x1") return "arm64e";
			if (architecture === "arm64v8") return "arm64";
			return architecture;
		};
	})))();
}

//#endregion
export { ARM64_32_HOST_SUBTYPE_PREFERENCE, ARM64_HOST_SUBTYPE_PREFERENCE, X86_64_HOST_SUBTYPE_PREFERENCE, X86_HOST_SUBTYPE_PREFERENCE, init_machoCpuIdentity, machoArchitectureFamily, machoArchitectureName, machoCpuSubtypeBase, machoHostSubtypeRank, machoKnownArm32Subtype, machoKnownArm64Subtype, machoKnownX86_64Subtype };