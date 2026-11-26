import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { PeLoadConfigService } from "../application/binaryDiagnostics/PeLoadConfigService.js";
import { PeLoadConfigProvider } from "../native/pe/PeLoadConfigProvider.js";
import { BinaryHardeningService } from "../application/binaryDiagnostics/BinaryHardeningService.js";
import { BinaryHardeningProvider } from "../native/hardening/BinaryHardeningProvider.js";
import { ByteEntropyService } from "../application/binaryDiagnostics/ByteEntropyService.js";
import { RecordedCrashService } from "../application/binaryDiagnostics/RecordedCrashService.js";
import { PwntoolsRecordedCrashProvider } from "../native/pwntools/PwntoolsRecordedCrashProvider.js";
import { BinaryLayoutService } from "../application/binaryDiagnostics/BinaryLayoutService.js";
import { PwntoolsLayoutProvider } from "../native/pwntools/PwntoolsLayoutProvider.js";
import { PeResourcesService } from "../application/binaryDiagnostics/PeResourcesService.js";
import { PeResourcesProvider } from "../native/pe/PeResourcesProvider.js";
import { PeCertificatesService } from "../application/binaryDiagnostics/PeCertificatesService.js";
import { PeCertificatesProvider } from "../native/pe/PeCertificatesProvider.js";
import { PeImportsService } from "../application/binaryDiagnostics/PeImportsService.js";
import { PeImportsProvider } from "../native/pe/PeImportsProvider.js";
import { WindowsShortcutService } from "../application/binaryDiagnostics/WindowsShortcutService.js";
import { WindowsShortcutProvider } from "../native/windows/WindowsShortcutProvider.js";
import { ElfNotesService } from "../application/binaryDiagnostics/ElfNotesService.js";
import { ElfNotesProvider } from "../native/elf/ElfNotesProvider.js";
import { DwarfUnitsService } from "../application/binaryDiagnostics/DwarfUnitsService.js";
import { DwarfUnitsProvider } from "../native/dwarf/DwarfUnitsProvider.js";
import { ElfDebugLinkService } from "../application/binaryDiagnostics/ElfDebugLinkService.js";
import { ElfDebugLinkProvider } from "../native/elf/ElfDebugLinkProvider.js";
import { NativeInitializersService } from "../application/binaryDiagnostics/NativeInitializersService.js";
import { NativeInitializersProvider } from "../native/initializers/NativeInitializersProvider.js";
import { ElfUnwindRangesService } from "../application/binaryDiagnostics/ElfUnwindRangesService.js";
import { ElfUnwindRangesProvider } from "../native/elf/ElfUnwindRangesProvider.js";
import { AppleIpsService } from "../application/binaryDiagnostics/AppleIpsService.js";
import { AppleIpsProvider } from "../native/apple/AppleIpsProvider.js";
import { KernelModuleService } from "../application/binaryDiagnostics/KernelModuleService.js";
import { KernelModuleProvider } from "../native/elf/KernelModuleProvider.js";
import { ElfDependenciesService } from "../application/binaryDiagnostics/ElfDependenciesService.js";
import { ElfDependenciesProvider } from "../native/elf/ElfDependenciesProvider.js";
import { KernelBuildConfigService } from "../application/binaryDiagnostics/KernelBuildConfigService.js";
import { KernelBuildConfigProvider } from "../native/elf/KernelBuildConfigProvider.js";
import { NativeExportsService } from "../application/binaryDiagnostics/NativeExportsService.js";
import { NativeExportsProvider } from "../native/exports/NativeExportsProvider.js";
import { DevicetreeService } from "../application/binaryDiagnostics/DevicetreeService.js";
import { DevicetreeProvider } from "../firmware/devicetree/DevicetreeProvider.js";
export const createDevicetreeService = () => new DevicetreeService(new DevicetreeProvider());
/** Portable PE inspection with no engine, installation or target acquisition. */
export const createPeResourcesService = () => new PeResourcesService(new PeResourcesProvider());
/** Portable Authenticode table inspection with no engine or catalog verification. */
export const createPeCertificatesService = () => new PeCertificatesService(new PeCertificatesProvider());
/** Portable PE import-table inspection with no engine or catalog verification. */
export const createPeImportsService = () => new PeImportsService(new PeImportsProvider());
/** Portable Shell Link inspection with no COM, engine or target resolution. */
export const createWindowsShortcutService = () => new WindowsShortcutService(new WindowsShortcutProvider());
/** Portable PE/ELF export tables with no engine, toolchain or target acquisition. */
export const createNativeExportsService = () => new NativeExportsService(new NativeExportsProvider());
/** Portable ELF note-table inspection with no engine or package catalog. */
export const createElfNotesService = () => new ElfNotesService(new ElfNotesProvider());
/** Portable DWARF compile-unit inspection with no engine or debug package. */
export const createDwarfUnitsService = () => new DwarfUnitsService(new DwarfUnitsProvider());
/** Portable ELF separate-debug linkage inspection with no engine or network lookup. */
export const createElfDebugLinkService = () => new ElfDebugLinkService(new ElfDebugLinkProvider());
/** Portable ELF and Mach-O initializer and finalizer listing with no engine. */
export const createNativeInitializersService = () => new NativeInitializersService(new NativeInitializersProvider());
/** Portable ELF unwind-range inspection with no engine or disassembler. */
export const createElfUnwindRangesService = () => new ElfUnwindRangesService(new ElfUnwindRangesProvider());
/** Portable Apple .ips inspection with no engine, Xcode or target acquisition. */
export const createAppleIpsService = () => new AppleIpsService(new AppleIpsProvider());
/** Portable Linux kernel-module metadata inspection with no engine or host `modinfo`. */
export const createKernelModuleService = () => new KernelModuleService(new KernelModuleProvider());
/** Portable Linux kernel banner and embedded build-config inspection with no engine or host tools. */
export const createKernelBuildConfigService = () => new KernelBuildConfigService(new KernelBuildConfigProvider());
/** Portable ELF dynamic-dependency inspection with no loader or host `ldd`. */
export const createElfDependenciesService = () => new ElfDependenciesService(new ElfDependenciesProvider());
/** Compose the offline adapter without import-time I/O or dependency acquisition. */
export const createBinaryLayoutService = (environment = process.env, host = HOST_PLATFORM) => new BinaryLayoutService(new PwntoolsLayoutProvider(environment, undefined, undefined, host));
/** Compose recorded-core inspection without acquiring a debugger or toolchain. */
export const createRecordedCrashService = (environment = process.env, host = HOST_PLATFORM) => new RecordedCrashService(new PwntoolsRecordedCrashProvider(environment, undefined, undefined, host));
/** Provider-free local byte analysis. */
export const createByteEntropyService = (resources) => new ByteEntropyService(undefined, resources);
export const createPeLoadConfigService = () => new PeLoadConfigService(new PeLoadConfigProvider());
/** Portable ELF, PE, and Mach-O hardening inspection with no engine or toolchain. */
export const createBinaryHardeningService = () => new BinaryHardeningService(new BinaryHardeningProvider());
