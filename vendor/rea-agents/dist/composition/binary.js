import { runtimeAnalysisConfig } from "../config/runtimeAnalysisSettings.js";
import { isAppleDispatchMetadataTarget } from "../domain/native/objcSwiftMetadata.js";
import { snapshotEnvironment } from "../process/snapshotEnvironment.js";
import { HopperProvider } from "../hopper/HopperProvider.js";
import { GhidraProvider } from "../ghidra/GhidraProvider.js";
import { createIdaMcpConnection } from "../ida/IdaMcpConnection.js";
import { IdaProvider } from "../ida/IdaProvider.js";
import { KunaProvider } from "../kuna/KunaProvider.js";
import { auxiliaryAnalysisProviderDeclarations, managedStaticProviderDeclaration, } from "./auxiliaryAnalysisProviders.js";
import { AnalysisProviderRegistry } from "../application/binary/AnalysisProviderRegistry.js";
import { composeBinarySession } from "../application/binary/BinarySessionComposition.js";
import { LINUX_HOPPER_LAUNCHER_VERIFICATION } from "../application/LinuxHopper.js";
import { LazyAnalysisProvider } from "../application/binary/LazyAnalysisProvider.js";
import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { combineBundleResourceClients } from "../application/binary/BundleResourceSession.js";
import { BUNDLE_ARTIFACT_RESOURCE_OPERATIONS, BUNDLE_NATIVE_RESOURCE_OPERATIONS, } from "../ports/BundleResourceOperations.js";
/**
 * Compose the target-switching runtime shared directly by CLI and MCP adapters.
 * This is the sole production wiring point, so both adapters share identical
 * provider selection, profile, lifecycle, and Evidence semantics.
 */
export const createBinarySession = (config, logger, selectedEnvironment, settings) => composeDeepBinarySession(runtimeAnalysisConfig(config, settings), logger, selectedEnvironment, undefined, settings);
/** Prefer byte-backed dispatch inspection while retaining deep symbol fallback. */
export const createNativeDispatchBinarySession = (config, logger, selectedEnvironment) => composeDeepBinarySession(runtimeAnalysisConfig(config), logger, selectedEnvironment, "inspect_native_dispatch_metadata");
const composeDeepBinarySession = (config, logger, selectedEnvironment, inspection, settings) => {
    const platform = HOST_PLATFORM.platform;
    const environment = snapshotEnvironment(selectedEnvironment, platform);
    const hopper = new HopperProvider(config, logger, environment, platform, LINUX_HOPPER_LAUNCHER_VERIFICATION);
    const ghidra = new GhidraProvider(config, logger, environment);
    const ida = new IdaProvider(config, environment, (registration, selected) => createIdaMcpConnection(registration, selected, { platform }));
    const kuna = new KunaProvider(environment, {
        regexMatchingDeadline: config.regexMatchingDeadline,
        regexWorkerHeapRequest: config.regexWorkerHeapRequest,
    });
    const auxiliaryDeclarations = auxiliaryAnalysisProviderDeclarations(environment, platform, settings);
    const nativeInspectionAvailable = inspection !== undefined &&
        auxiliaryDeclarations.some(({ capabilities }) => capabilities.some(({ operation, available }) => operation === inspection && available));
    return composeBinarySession(new AnalysisProviderRegistry([hopper, ghidra, ida, kuna], config.analysisProvider, nativeInspectionAvailable ? isAppleDispatchMetadataTarget : undefined), auxiliaryDeclarations.map((declaration) => new LazyAnalysisProvider(declaration)), createBundleResourceFactory(environment, platform, settings));
};
const createBundleResourceFactory = (environment, platform, settings) => {
    return {
        createClient: async (root) => {
            const [{ ArtifactProvider }, { NativeMacOSProvider }] = await Promise.all([
                import("../artifacts/ArtifactProvider.js"),
                import("../native/NativeMacOSProvider.js"),
            ]);
            const artifact = new ArtifactProvider(environment, platform, settings);
            const native = new NativeMacOSProvider(environment, undefined, platform);
            const capabilities = [
                ...artifact
                    .capabilities()
                    .filter(({ operation }) => BUNDLE_ARTIFACT_RESOURCE_OPERATIONS.has(operation)),
                ...native
                    .capabilities()
                    .filter(({ operation }) => BUNDLE_NATIVE_RESOURCE_OPERATIONS.has(operation)),
            ];
            return {
                client: combineBundleResourceClients(artifact.createBundleResourceClient(root), native.createBundleResourceClient(root)),
                capabilities,
            };
        },
    };
};
/** Compose an execution-free managed session without native provider selection. */
export const createManagedBinarySession = () => composeBinarySession(new AnalysisProviderRegistry([]), [
    new LazyAnalysisProvider(managedStaticProviderDeclaration()),
]);
/** Compose the artifact operations without candidates for deep analysis engines. */
export const createArtifactBinarySession = (selectedEnvironment, platform = HOST_PLATFORM.platform) => import("../artifacts/ArtifactProvider.js").then(({ ArtifactProvider }) => composeBinarySession(new AnalysisProviderRegistry([]), [
    new ArtifactProvider(snapshotEnvironment(selectedEnvironment, platform), platform),
], createBundleResourceFactory(snapshotEnvironment(selectedEnvironment, platform), platform)));
/** Compose native inspection utilities without candidates for deep analysis. */
export const createNativeBinarySession = (selectedEnvironment, platform = HOST_PLATFORM.platform) => import("../native/NativeMacOSProvider.js").then(({ NativeMacOSProvider }) => composeBinarySession(new AnalysisProviderRegistry([]), [
    new NativeMacOSProvider(snapshotEnvironment(selectedEnvironment, platform), undefined, platform),
], createBundleResourceFactory(snapshotEnvironment(selectedEnvironment, platform), platform)));
