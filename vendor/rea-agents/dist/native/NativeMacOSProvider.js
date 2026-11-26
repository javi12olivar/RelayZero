import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { readerIntegrityFailure, bindArtifactFileCleanup, artifactFileCompletion, artifactFilePrimaryFacts, artifactFileCancellationCause, ArtifactFileCleanupFailure, AnalysisCleanupLeaseGroup, ArtifactResourceScope, ArtifactReaderFailure, withArtifactTargetIdentity, } from "../resources/index.js";
import { MAX_NODE_TIMER_DELAY_MS } from "../domain/analysisResourceLimits.js";
import { invariantViolation, InternalInvariantError, } from "../domain/internalInvariant.js";
import { translateNativeCommandFailure } from "./NativeCommandAnalysisError.js";
import { plistSourceFormat, readNativePlistBytes, nativePlistFailure, resolveNativePlistSelection, unreadablePlist, resolveBundleResourcePlistSelection, } from "./NativePlistSource.js";
import { readMachoEncryption } from "../domain/apple/machoEncryptionReader.js";
import { snapshotEnvironment } from "../process/snapshotEnvironment.js";
import { APPLE_DISPATCH_METADATA_ANALYSIS_PROFILE, nativeMacOSCapabilities, } from "./NativeMacOSProviderMetadata.js";
import { NATIVE_MACOS_PROVIDER_IDENTITY as IDENTITY } from "./NativeMacosProviderIdentity.js";
import { appleDispatchMetadataFailure, inspectAppleDispatchMetadata, } from "./AppleDispatchMetadata.js";
import { observeNativeUi, finishNativeUiObservation, } from "./NativeUiObservation.js";
import { NativeUiCleanupError } from "./NativeUiCleanupError.js";
import { LldbCallTracer } from "./LldbCallTracer.js";
import { observeNativeCalls } from "./NativeCallObservation.js";
import { realpath, symlink, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { PrivateRuntimeRoot } from "../process/PrivateRuntimeRoot.js";
import { createAnalysisExecutionEvidence } from "../domain/analysisObservation.js";
import { z } from "zod";
import { createAnalysisExecution, } from "../ports/AnalysisProvider.js";
import { NATIVE_TOOL_CONTRACTS, } from "../contracts/native/nativeToolContracts.js";
import { isMachOFormat, } from "../domain/binaryTargetTypes.js";
import { isAppleDispatchMetadataTarget, nativeDispatchMetadataInputSchema, } from "../domain/native/objcSwiftMetadata.js";
import { analysisInputErrorFromIssues } from "../domain/inputIssueProjection.js";
import { AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisInputError, AnalysisOutputError, AnalysisUnsupportedTargetError, cancelledBy, carriedReason, } from "../domain/analysisErrorCore.js";
import { DEFAULT_NATIVE_COMMAND_TIMEOUT_MS, DEFAULT_NATIVE_UI_DEADLINE_MS, readNativeDeadline, } from "../domain/native/nativeDeadlines.js";
import { ProviderAdapterError } from "../domain/providerAdapterError.js";
import { ProviderCleanupError } from "../domain/providerCleanupError.js";
import { AnalysisError, resolvedAnalysisError, } from "../domain/analysisErrorBase.js";
import { jsonValueSchema } from "../domain/jsonValue.js";
import { projectPlistValue, nonFiniteRealLimitation, negativeZeroRealLimitation, unknownDateLimitation, unknownScalarLimitation, } from "../domain/apple/plistValue.js";
import { createPlistNumberProjection } from "../domain/apple/plistNumbers.js";
import { parseXmlPropertyList } from "../domain/propertyListKeys.js";
import { plistDuplicateKeyLimitations } from "../domain/apple/plistDuplicateKeys.js";
import { machoKnownCodeSignSelector } from "../domain/apple/machoArchitectureSelection.js";
import { demangleSwiftSchema, inspectPlistSchema, inspectMachoSchema, inspectSignatureSchema, listArchitecturesSchema, } from "../domain/native/nativeInspection.js";
import { err, ok } from "../domain/result.js";
import { NativeCommandFailure, XcrunCommandRunner, failureCapture, } from "../providers/NativeCommandRunner.js";
import { withSignatureTarget, verifySignatureTarget, } from "./SignatureTargetBinding.js";
import { parseCodeSignature } from "./parsers/codesign.js";
import { parseDemangledSymbols } from "./parsers/demangle.js";
import { parseLipoCapture } from "./parsers/lipo.js";
import { readPlistJson, readPlistJsonSource, parsePlistBinary, parsePlistXml, parsePlistXmlSource, } from "./parsers/plist.js";
import { XmlPlistTextDecodeError } from "../domain/propertyListXmlText.js";
import { ParseFailureError } from "../domain/parseFailure.js";
import { architectureLocations, inspectNativeMacho, } from "./NativeMachoInspection.js";
import { analysisErrorWithCleanupDependencies, analysisErrorWithCleanupFailure, } from "../domain/analysisErrorCleanup.js";
import { analysisErrorWithCancellation } from "../domain/analysisErrorCancellation.js";
import { projectAnalysisError } from "../domain/analysisErrorProjection.js";
import { withNativeMachoSource, NativeMachoSourceVerificationFailure, } from "./NativeMachoSource.js";
import { isParseLimit, parseFailureAnalysisError, parseLimitConstraint, } from "../domain/parseFailureAnalysisError.js";
import { readMachoCommandNames } from "../domain/apple/machoCommandNames.js";
import { assertSelectedMachoSlice, resolveSelectedMachoSlice, } from "./NativeMachoSelectedSlice.js";
import { createNativeUiHelperRuntime, } from "./NativeUiHelperRuntime.js";
import { NativeUiInterruptionControl } from "./NativeUiInterruptionControl.js";
import { UnsupportedBinaryPlistUidError } from "../domain/apple/plistScalars.js";
import { NATIVE_COMMAND_OUTPUT_BUDGET_BYTES } from "../domain/native/nativeCommandOutput.js";
import { errorMessage } from "../kernel/errorMessage.js";
import { sha256Hex } from "../kernel/sha256Hex.js";
/** Read-only semantic provider composed from Xcode command-line utilities. */
export class NativeMacOSProvider {
    runner;
    #capabilities;
    #environment;
    #tracerFactory;
    #privateRuntimeRootFactory;
    constructor(environment, runner = new XcrunCommandRunner(environment), platform = HOST_PLATFORM.platform, tracerFactory, privateRuntimeRootFactory) {
        this.runner = runner;
        this.#environment = snapshotEnvironment(environment, platform);
        this.#tracerFactory =
            tracerFactory ?? (() => new LldbCallTracer(this.#environment));
        this.#privateRuntimeRootFactory = privateRuntimeRootFactory;
        this.#capabilities = nativeMacOSCapabilities(platform);
    }
    identity() {
        return IDENTITY;
    }
    capabilities() {
        return this.#capabilities;
    }
    createClient(target) {
        return new NativeMacOSClient(target, this.runner, this.#tracerFactory(), this.#environment, this.#privateRuntimeRootFactory);
    }
    createBundleResourceClient(root) {
        const plistAvailable = this.#capabilities.some(({ operation, available }) => operation === "inspect_plist" && available);
        return new NativeMacOSClient(undefined, this.runner, this.#tracerFactory(), this.#environment, this.#privateRuntimeRootFactory, root, plistAvailable);
    }
}
// Encryption range mapping in every slice shares a sixteenth of the output
// budget at the 256 projected bytes reserved per Mach-O command record.
const MACHO_ENCRYPTION_MAPPING_RECORDS = Math.floor(NATIVE_COMMAND_OUTPUT_BUDGET_BYTES / 16 / 256);
class NativeMacOSClient {
    activeTarget;
    runner;
    tracer;
    environment;
    privateRuntimeRootFactory;
    bundleResourceRoot;
    bundlePlistAvailable;
    #pendingNativeUiRuntimes = new Set();
    #pendingCommandOperations = new Set();
    #signatureResources = new ArtifactResourceScope();
    #plistResources = new ArtifactResourceScope();
    #callResources = new ArtifactResourceScope();
    #dispatchResources = new ArtifactResourceScope();
    #nativeOperandResources = new ArtifactResourceScope();
    #machoResources = new ArtifactResourceScope();
    #nativeUiTail = Promise.resolve();
    #closed = false;
    constructor(activeTarget, runner, tracer, environment, privateRuntimeRootFactory, bundleResourceRoot, bundlePlistAvailable = true) {
        this.activeTarget = activeTarget;
        this.runner = runner;
        this.tracer = tracer;
        this.environment = environment;
        this.privateRuntimeRootFactory = privateRuntimeRootFactory;
        this.bundleResourceRoot = bundleResourceRoot;
        this.bundlePlistAvailable = bundlePlistAvailable;
    }
    get target() {
        if (this.activeTarget === undefined)
            throw invariantViolation("This provider client has no executable target");
        return this.activeTarget;
    }
    async execute(operation, parameters, options) {
        if (this.#closed)
            return err(new AnalysisCapabilityUnavailableError(IDENTITY.id, operation, "Native provider client is closed"));
        if (options?.signal?.aborted === true)
            return err(cancelledBy(operation, options.signal));
        if (operation === "health")
            return ok(createAnalysisExecution(null, IDENTITY));
        if (this.activeTarget === undefined && operation !== "inspect_plist")
            return err(new AnalysisCapabilityUnavailableError(IDENTITY.id, operation, "This client is bound to app resource access only."));
        if (this.bundleResourceRoot !== undefined && !this.bundlePlistAvailable)
            return err(new AnalysisCapabilityUnavailableError(IDENTITY.id, "inspect_plist", "Property list inspection requires a macOS host."));
        if (operation === "inspect_native_dispatch_metadata") {
            const input = nativeDispatchMetadataInputSchema.safeParse(parameters);
            if (!input.success)
                return err(analysisInputErrorFromIssues(operation, input.error.issues, parameters, {
                    cause: input.error,
                }));
            if (!isAppleDispatchMetadataTarget(this.target))
                return err(new AnalysisCapabilityUnavailableError(IDENTITY.id, operation, "Binary Apple metadata requires Mach-O; other providers can report symbol-only metadata"));
            try {
                const result = await this.#dispatchResources.run(() => inspectAppleDispatchMetadata(this.target, input.data.max_records, this.#dispatchResources, {
                    signal: options?.signal,
                    objcClassImportAddresses: input.data.objc_class_import_addresses,
                    objcClassImportAddressesComplete: input.data.objc_class_import_addresses_complete,
                    maxInputBytes: input.data.max_input_bytes,
                }));
                return ok(createAnalysisExecution(result, result.provider, {
                    analysisProfile: APPLE_DISPATCH_METADATA_ANALYSIS_PROFILE,
                    locations: [{ kind: "artifact-path", path: this.target.path }],
                    limitations: result.result.coverage.flatMap(({ reason }) => reason === null ? [] : [reason]),
                }));
            }
            catch (cause) {
                return err(appleDispatchMetadataFailure(cause, this.target.path));
            }
        }
        if (!isNativeOperation(operation))
            return err(new AnalysisCapabilityUnavailableError(IDENTITY.id, operation, "Operation is not implemented by native macOS tools."));
        if (operation === "observe_native_calls") {
            const result = await observeNativeCalls(this.target, parameters, this.tracer, this.#callResources, options?.signal);
            return result.ok
                ? ok(createAnalysisExecution(result.value, IDENTITY, {
                    limitations: result.value.limitations,
                    locations: [{ kind: "artifact-path", path: this.target.path }],
                }))
                : result;
        }
        if (operation === "observe_native_ui" ||
            operation === "capture_native_ui_scenario") {
            return this.#observeNativeUi(operation, parameters, options?.signal);
        }
        const pending = Promise.resolve().then(() => this.#dispatchCommand(operation, parameters, options?.signal));
        this.#pendingCommandOperations.add(pending);
        try {
            const observation = await pending;
            return observation.ok
                ? ok(createAnalysisExecution(observation.value.result, IDENTITY, {
                    limitations: observation.value.limitations,
                    locations: observation.value.locations,
                }))
                : err(resolvedAnalysisError(observation.error));
        }
        catch (cause) {
            return err(nativeOutputFailure(operation, cause));
        }
        finally {
            this.#pendingCommandOperations.delete(pending);
        }
    }
    async close() {
        this.#closed = true;
        await Promise.allSettled(this.#pendingCommandOperations);
        const uiCleanupFailures = await this.#serializeNativeUi(() => this.#retryNativeUiCleanup());
        const signatureCleanup = await closeNativeFileScope(this.#signatureResources, "signature-snapshot");
        const plistCleanup = await closeNativeFileScope(this.#plistResources, "plist-file");
        const callCleanup = await closeNativeFileScope(this.#callResources, "native-call-target");
        const dispatchCleanup = await closeNativeFileScope(this.#dispatchResources, "native-dispatch-metadata-target");
        const machoCleanup = await closeNativeFileScope(this.#machoResources, "native-macho-target");
        const commandCleanup = await this.#retryNativeCommandCleanup();
        const nativeOperandCleanup = await closeNativeFileScope(this.#nativeOperandResources, "native-command-operand");
        let result = await this.tracer.close();
        const cleanupErrors = [
            ...(uiCleanupFailures.length === 0
                ? []
                : [this.#nativeUiCleanupFailure(uiCleanupFailures, "close_binary")]),
            ...(commandCleanup === undefined ? [] : [commandCleanup]),
            ...(signatureCleanup === undefined ? [] : [signatureCleanup]),
            ...(plistCleanup === undefined ? [] : [plistCleanup]),
            ...(callCleanup === undefined ? [] : [callCleanup]),
            ...(dispatchCleanup === undefined ? [] : [dispatchCleanup]),
            ...(nativeOperandCleanup === undefined ? [] : [nativeOperandCleanup]),
            ...(machoCleanup === undefined ? [] : [machoCleanup]),
        ];
        for (const cleanupError of cleanupErrors)
            result = result.ok
                ? err(cleanupError)
                : err(analysisErrorWithCleanupDependencies(result.error, cleanupError));
        return result;
    }
    #observeNativeUi(operation, parameters, signal) {
        return this.#serializeNativeUi(async () => {
            if (this.#closed)
                return err(new AnalysisCapabilityUnavailableError(IDENTITY.id, operation, "Native provider client is closed"));
            const earlierCleanupFailures = await this.#retryNativeUiCleanup();
            if (earlierCleanupFailures.length > 0)
                return err(this.#nativeUiCleanupFailure(earlierCleanupFailures, operation));
            const deadline = readNativeDeadline(parameters.native_ui_deadline_ms, DEFAULT_NATIVE_UI_DEADLINE_MS);
            if (!deadline.ok)
                return err(new AnalysisInputError(operation, { userMessage: deadline.message }, [
                    {
                        path: ["native_ui_deadline_ms"],
                        reason: deadline.reason,
                        message: deadline.message,
                        minimum: 1,
                        maximum: MAX_NODE_TIMER_DELAY_MS,
                    },
                ]));
            const runtime = createNativeUiHelperRuntime(this.environment, deadline.timeoutMs);
            const interruption = new NativeUiInterruptionControl(signal, runtime.signal, deadline.timeoutMs);
            try {
                this.#pendingNativeUiRuntimes.add(runtime);
                let result;
                try {
                    result = await observeNativeUi(this.target, operation, parameters, {
                        environment: this.environment,
                        runtime,
                        interruption,
                    });
                }
                catch (cause) {
                    result = err(cause instanceof AnalysisError
                        ? cause
                        : new ProviderAdapterError(IDENTITY.id, operation, { cause }));
                }
                try {
                    await runtime.close();
                    this.#pendingNativeUiRuntimes.delete(runtime);
                }
                catch (cause) {
                    result = finishNativeUiObservation(result, operation, interruption);
                    const cleanup = this.#nativeUiCleanupFailure([{ runtime, cause }], operation, result.ok ? result.value : undefined);
                    return err(result.ok
                        ? cleanup
                        : analysisErrorWithCleanupDependencies(result.error, cleanup, operation));
                }
                result = finishNativeUiObservation(result, operation, interruption);
                return result.ok
                    ? ok(createAnalysisExecution(result.value, IDENTITY, {
                        limitations: result.value.limitations,
                    }))
                    : result;
            }
            finally {
                interruption.dispose();
            }
        });
    }
    #serializeNativeUi(operation) {
        const call = this.#nativeUiTail.then(operation, operation);
        this.#nativeUiTail = call.then(() => undefined, () => undefined);
        return call;
    }
    async #retryNativeUiCleanup() {
        const failures = [];
        for (const runtime of this.#pendingNativeUiRuntimes) {
            try {
                await runtime.close();
                this.#pendingNativeUiRuntimes.delete(runtime);
            }
            catch (cause) {
                failures.push({ runtime, cause });
            }
        }
        return failures;
    }
    async #retryNativeCommandCleanup() {
        if (this.runner.retryCleanup === undefined)
            return undefined;
        try {
            const failures = await this.runner.retryCleanup();
            return failures.length === 0
                ? undefined
                : nativeCommandCleanupFailure(failures);
        }
        catch (cause) {
            return new ProviderCleanupError(IDENTITY.id, ["native-command-process-cleanup"], {
                reason: cause instanceof Error
                    ? cause.message || cause.name
                    : String(cause) || "native command cleanup failed unexpectedly",
            }, { cause });
        }
    }
    #nativeUiCleanupFailure(failures, operation, partialObservation) {
        return new NativeUiCleanupError(failures, operation, partialObservation);
    }
    #dispatchCommand(operation, parameters, signal) {
        const timeout = readNativeDeadline(parameters.native_command_timeout_ms, DEFAULT_NATIVE_COMMAND_TIMEOUT_MS);
        if (!timeout.ok)
            return Promise.resolve(err(new AnalysisInputError(operation, { userMessage: timeout.message }, [
                {
                    path: ["native_command_timeout_ms"],
                    reason: timeout.reason,
                    message: timeout.message,
                    minimum: 1,
                    maximum: MAX_NODE_TIMER_DELAY_MS,
                },
            ])));
        const timeoutMs = timeout.timeoutMs;
        switch (operation) {
            case "inspect_macho":
                return this.#inspectMacho(parameters, signal, timeoutMs);
            case "inspect_signature":
                return this.#inspectSignature(signal, timeoutMs);
            case "inspect_plist":
                return this.#inspectPlist(parameters, signal, timeoutMs);
            case "list_architectures":
                return this.#listArchitectures(parameters, signal, timeoutMs);
            case "demangle_swift":
                return this.#demangle(parameters, signal, timeoutMs);
        }
    }
    async #listArchitectures(parameters, signal, timeoutMs) {
        // lipo reads only Mach-O; its refusal of a PE, ELF, or plist target is not
        // a tool failure that a retry or `rea doctor` could repair.
        if (!isMachOFormat(this.target.format))
            return err(new AnalysisCapabilityUnavailableError(IDENTITY.id, "list_architectures", "Active artifact is not Mach-O."));
        try {
            return await this.#machoResources.run(() => withNativeMachoSource(this.target, this.#machoResources, signal, async () => {
                const capture = await this.#run("list_architectures", "lipo", ["-detailed_info", this.target.path], { signal, timeoutMs });
                if (!capture.ok)
                    return capture;
                const provenance = [invocation(capture.value, this.target.path)];
                const parsed = parseLipoCapture(capture.value, "list_architectures", this.target.path);
                if (!parsed.ok)
                    return parsed;
                const { architectures } = parsed.value;
                const limitations = architectures.flatMap((architecture) => architecture.limitations);
                const result = listArchitecturesSchema.parse({
                    architectures: {
                        items: architectures,
                        total: architectures.length,
                        exhaustive: true,
                        limitations: [],
                    },
                    provenance,
                    limitations,
                });
                return ok({
                    result: jsonValueSchema.parse(result),
                    limitations,
                    locations: architectureLocations(result.architectures.items),
                });
            }));
        }
        catch (cause) {
            return err(nativeMachoSourceFailure(cause, this.target, parameters, "list_architectures"));
        }
    }
    async #demangle(parameters, signal, timeoutMs) {
        const symbols = z.array(z.string()).safeParse(parameters.symbols);
        if (!symbols.success)
            return err(new AnalysisOutputError("demangle_swift", "symbols were not parsed strings"));
        const capture = await this.#run("demangle_swift", "swift-demangle", 
        // `--` keeps symbols that begin with `-` from selecting demangler options.
        ["--compact", "--", ...symbols.data], { signal, timeoutMs });
        if (!capture.ok)
            return capture;
        const provenance = [invocation(capture.value, this.target.path)];
        const result = demangleSwiftSchema.parse({
            symbols: parseDemangledSymbols(symbols.data, capture.value.stdout),
            provenance,
            limitations: [],
        });
        return ok({
            result: jsonValueSchema.parse(result),
            limitations: [],
            locations: [],
        });
    }
    async #inspectSignature(signal, timeoutMs) {
        // This provider's signature inspection covers Mach-O code signatures
        // only. On another container, codesign's "not signed" verdict cannot
        // see a format-level signature such as a xar pkg signature, so
        // reporting it would claim unsigned for a layer that was never
        // evaluated.
        if (this.target.kind !== "executable" || !isMachOFormat(this.target.format))
            return err(new AnalysisCapabilityUnavailableError(IDENTITY.id, "inspect_signature", "Active artifact is not Mach-O; its container-level signature layer is not evaluated by codesign."));
        const inspected = await withSignatureTarget(this.target, this.#signatureResources, (binding) => this.#inspectBoundSignature(binding, signal, timeoutMs), signal, this.privateRuntimeRootFactory);
        return inspected.ok
            ? ok({
                result: inspected.value,
                limitations: inspected.value.limitations,
                locations: [],
            })
            : inspected;
    }
    async #inspectBoundSignature(binding, signal, timeoutMs) {
        const architecture = this.target.kind === "executable" ? this.target.architecture : undefined;
        if (architecture === undefined)
            return err(new AnalysisCapabilityUnavailableError(IDENTITY.id, "inspect_signature", "No executable architecture is selected."));
        const target = this.target;
        const slices = target.format === "mach-o-universal" ? target.universalSlices : undefined;
        const selectedIndex = target.format === "mach-o-universal"
            ? (slices?.findIndex((slice) => slice.offset === target.universalSlice.offset) ?? -1)
            : -1;
        if (target.format === "mach-o-universal" && selectedIndex < 0)
            return err(new AnalysisCapabilityUnavailableError(IDENTITY.id, "inspect_signature", "The selected Mach-O slice identity is unavailable for codesign."));
        const selectedArchitecture = slices === undefined || selectedIndex < 0
            ? architecture === "x86"
                ? "i386"
                : architecture
            : machoKnownCodeSignSelector(slices, selectedIndex);
        if (selectedArchitecture === undefined)
            return err(new AnalysisCapabilityUnavailableError(IDENTITY.id, "inspect_signature", "The selected Mach-O slice has no known codesign architecture selector."));
        // A thin Mach-O already identifies its only slice. Its admitted architecture
        // is a CPU family, which is not necessarily a codesign subtype selector
        // (for example arm64e). Only universal containers need a selector.
        const selector = this.target.format === "mach-o-universal"
            ? ["-a", selectedArchitecture]
            : [];
        const executablePaths = [
            binding.snapshotPath,
            ...(await canonicalPath(binding.snapshotPath)),
        ];
        const display = await this.#captureSignature(binding, ["-d", ...selector, "--verbose=4"], signal, timeoutMs);
        if (!display.ok)
            return display;
        const unsigned = isNonzeroUnsignedObservation(display.value, binding.snapshotPath, executablePaths);
        const displayFailure = codeSignCaptureFailure(this.#signatureResources, display.value, binding.snapshotPath, executablePaths);
        if (displayFailure !== null)
            return err(displayFailure);
        const requirements = await this.#captureSignature(binding, ["-d", ...selector, "-r-"], signal, timeoutMs);
        if (!requirements.ok)
            return requirements;
        const requirementsFailure = codeSignCaptureFailure(this.#signatureResources, requirements.value, binding.snapshotPath, executablePaths);
        if (requirementsFailure !== null)
            return err(requirementsFailure);
        const entitlements = await this.#captureSignature(binding, ["-d", ...selector, "--entitlements", ":-"], signal, timeoutMs);
        if (!entitlements.ok)
            return entitlements;
        const entitlementsFailure = codeSignCaptureFailure(this.#signatureResources, entitlements.value, binding.snapshotPath, executablePaths);
        if (entitlementsFailure !== null)
            return err(entitlementsFailure);
        // codesign echoes the resolved executable path in its diagnostics.
        const parsed = parseCodeSignature(display.value.stderr, unsigned, executablePaths);
        // The requirement is printed to stdout; stderr echoes the path.
        const requirementText = /designated\s*=>\s*(.+)$/mu.exec(requirements.value.stdout)?.[1] ?? null;
        // Entitlements XML is printed to stdout; stderr echoes the path.
        const entitlementValue = parseEntitlements(entitlements.value.stdout);
        const captures = [display.value, requirements.value, entitlements.value];
        const limitations = [
            ...parsed.limitations,
            ...entitlementValue.limitations.map((note) => `Entitlements: ${note}`),
            "Inspected a digest-verified Mach-O byte snapshot; filesystem-bound signing context and trust validation are not examined.",
        ];
        const { architectures, unknownSlices } = codeSignArchitectures(parsed.format, this.target);
        if (architectures.length > 1 || unknownSlices)
            limitations.push(`Partial signature coverage: signature identity, hashes, designated requirement, entitlements and runtime state describe the requested ${selectedArchitecture} architecture; other slices' metadata is not returned.`);
        if (unknownSlices)
            limitations.push("Some Mach-O slice identities cannot be mapped to a known codesign selector; their signature states are unknown.");
        if (!unsigned &&
            isNonzeroUnsignedObservation(requirements.value, binding.snapshotPath, executablePaths))
            limitations.push("The designated requirement for the requested architecture is unavailable because codesign reported it unsigned.");
        if (!unsigned &&
            isNonzeroUnsignedObservation(entitlements.value, binding.snapshotPath, executablePaths))
            limitations.push("The entitlements for the requested architecture are unavailable because codesign reported it unsigned.");
        const states = { checked: [], unsigned: [] };
        // A thin file's admitted architecture is a CPU family (arm64 for arm64e);
        // codesign's display names the slice it described.
        const described = this.target.format === "mach-o-universal"
            ? selectedArchitecture
            : (/^Mach-O thin \(([^)\r\n]+)\)$/u.exec(parsed.format ?? "")?.[1] ??
                null);
        const observation = () => inspectSignatureSchema.parse({
            ...parsed,
            designated_requirement: requirementText,
            entitlements: entitlementValue.value,
            slices: {
                described,
                architectures,
                unmapped: unknownSlices,
                checked: [...states.checked],
                unsigned: [...states.unsigned],
            },
            provenance: captures.map((capture) => invocation(capture, binding.snapshotPath)),
            limitations,
        });
        if (architectures.length > 1) {
            const slices = await this.#inspectSignatureSliceStates(binding, architectures, executablePaths, { captures, limitations, states }, signal, timeoutMs);
            if (!slices.ok) {
                limitations.push("Architecture-specific signature inspection did not complete; remaining slice signing states are unknown.");
                return err(slices.error.retainPartialObservation(observation()));
            }
        }
        const version = await verifySignatureTarget(this.target, binding, signal);
        if (!version.ok)
            return err(version.error.retainPartialObservation(observation()));
        return ok(observation());
    }
    async #inspectSignatureSliceStates(binding, architectures, executablePaths, observation, signal, timeoutMs) {
        const { captures, limitations, states } = observation;
        let unsignedNote;
        for (const architecture of architectures) {
            const slice = await this.#captureSignature(binding, ["-d", "-a", architecture, "--verbose=4"], signal, timeoutMs);
            if (!slice.ok)
                return slice;
            captures.push(slice.value);
            if (slice.value.exitCode === 0) {
                states.checked.push(architecture);
                continue;
            }
            const failure = codeSignCaptureFailure(this.#signatureResources, slice.value, binding.snapshotPath, executablePaths);
            if (failure !== null)
                return err(failure);
            states.checked.push(architecture);
            states.unsigned.push(architecture);
            if (unsignedNote === undefined) {
                unsignedNote = limitations.length;
                limitations.push("");
            }
            limitations[unsignedNote] =
                `Unsigned Mach-O slices: ${states.unsigned.join(", ")}.`;
        }
        return ok(undefined);
    }
    async #captureSignature(binding, args, signal, timeoutMs) {
        const before = await verifySignatureTarget(this.target, binding, signal);
        if (!before.ok)
            return before;
        let capture;
        try {
            capture = await this.#run("inspect_signature", "codesign", [...args, binding.snapshotPath], {
                signal,
                acceptNonZero: true,
                timeoutMs,
            });
        }
        catch (cause) {
            capture = err(new ProviderAdapterError(IDENTITY.id, "inspect_signature", {
                cause,
                diagnostics: {
                    phase: "codesign-capture",
                    path: this.target.path,
                    reason: errorMessage(cause),
                },
            }));
        }
        // Verify failed captures too: a disappearing target is not a codesign
        // execution failure, and later captures must never use another version.
        const after = await verifySignatureTarget(this.target, binding, signal);
        if (!capture.ok && !after.ok) {
            const primary = after.error instanceof AnalysisCancelledError
                ? analysisErrorWithCancellation(capture.error, after.error)
                : after.error;
            return err(nativeFailureWithCommandCleanup(primary, capture.error, "inspect_signature"));
        }
        return after.ok ? capture : after;
    }
    async #inspectPlist(parameters, signal, timeoutMs) {
        const requested = parameters.path;
        if (requested !== undefined && typeof requested !== "string")
            return err(new AnalysisOutputError("inspect_plist", "path was not a string"));
        try {
            return await this.#plistResources.run(async () => {
                if (this.activeTarget === undefined ||
                    this.activeTarget.kind !== "executable" ||
                    this.activeTarget.bundleInfoPlist === undefined)
                    return this.#readPlist(requested, signal, timeoutMs);
                try {
                    const observation = await withArtifactTargetIdentity(this.activeTarget, this.#plistResources, async () => {
                        const result = await this.#readPlist(requested, signal, timeoutMs);
                        if (!result.ok)
                            throw result.error;
                        return result.value;
                    }, signal);
                    return ok(observation);
                }
                catch (cause) {
                    if (cause instanceof AnalysisError)
                        return err(cause);
                    return err(nativePlistFailure(cause, {
                        path: this.activeTarget.path,
                        origin: "selected",
                    }));
                }
            });
        }
        catch (cause) {
            return err(nativePlistFailure(cause, undefined));
        }
    }
    async #readPlist(requested, signal, timeoutMs) {
        try {
            const plist = this.bundleResourceRoot === undefined
                ? await resolveNativePlistSelection(this.target, requested)
                : resolveBundleResourcePlistSelection(this.bundleResourceRoot, requested);
            if (!plist.ok)
                return plist;
            const fileInput = {
                selection: plist.value,
                resources: this.#plistResources,
                signal,
                timeoutMs,
            };
            const source = await readNativePlistBytes(fileInput);
            if (!source.ok)
                return source;
            const bytes = source.value;
            const sha256 = sha256Hex(bytes);
            return await this.#withPrivateNativeOperand({
                operation: "inspect_plist",
                label: "private plist snapshot",
                prefix: "rea-plist-source-",
                sourcePath: plist.value.path,
            }, signal, async (root) => {
                const operand = join(root, "source.plist");
                await writeFile(operand, bytes, { flag: "wx", mode: 0o400 });
                return operand;
            }, async (operand) => {
                try {
                    return await this.#inspectPlistSnapshot({
                        ...fileInput,
                        bytes,
                        sha256,
                        operand,
                    });
                }
                catch (cause) {
                    return err(nativeOutputFailure("inspect_plist", cause));
                }
            });
        }
        catch (cause) {
            // Producer failures stay opaque; only scope admission failures reach the file mapper.
            return err(nativeOutputFailure("inspect_plist", cause));
        }
    }
    async #inspectPlistSnapshot(source) {
        const { signal, timeoutMs, operand } = source;
        const classified = await this.#run("inspect_plist", "file", ["-b", operand], {
            signal,
            timeoutMs,
        });
        if (!classified.ok)
            return classified;
        const format = plistSourceFormat(classified.value.stdout, source.bytes);
        if (format === "binary")
            return this.#inspectBinaryPlist(source, classified.value);
        const direct = await this.#inspectTextPlist(source, classified.value, format);
        return (direct ??
            (await this.#inspectConvertedPlist(source, classified.value, format)));
    }
    #inspectBinaryPlist(fileInput, classified) {
        const parsed = parsePlistBinary(fileInput.bytes);
        if (!parsed.ok) {
            if (parsed.error instanceof UnsupportedBinaryPlistUidError)
                return err(new AnalysisUnsupportedTargetError("inspect_plist", fileInput.selection.path, parsed.error.message, { cause: parsed.error }));
            return parsed.error instanceof AnalysisOutputError
                ? err(unreadablePlist(fileInput.selection, "binary property list could not be decoded", { cause: parsed.error }))
                : err(parsed.error);
        }
        return ok(nativePlistObservation({
            parsed: parsed.value,
            format: "binary",
            path: fileInput.selection.path,
            sourceSha256: fileInput.sha256,
            resourceRoot: this.bundleResourceRoot,
            provenance: [invocation(classified, fileInput.operand, "$PLIST")],
        }));
    }
    async #inspectTextPlist(fileInput, classified, format) {
        let parsed;
        const provenance = [invocation(classified, fileInput.operand, "$PLIST")];
        if (format === "xml") {
            parsed = parsePlistXmlSource(fileInput.bytes);
            if (parsed.ok) {
                const validated = await this.#run("inspect_plist", "plutil", ["-lint", "--", fileInput.operand], {
                    signal: fileInput.signal,
                    acceptNonZero: true,
                    timeoutMs: fileInput.timeoutMs,
                });
                if (!validated.ok)
                    return validated;
                if (validated.value.exitCode !== 0)
                    return err(nativePlistDecodeFailure(fileInput.selection, validated.value, fileInput.operand));
                provenance.push(invocation(validated.value, fileInput.operand, "$PLIST"));
            }
            if (!parsed.ok &&
                parsed.error instanceof XmlPlistTextDecodeError &&
                parsed.error.reason === "unsupported-encoding")
                return undefined;
            const refusal = parsed.ok ? undefined : xmlSyntaxRefusal(parsed.error);
            if (refusal !== undefined)
                return await this.#inspectConvertedPlist(fileInput, classified, format, refusal);
        }
        else {
            const json = readPlistJsonSource(fileInput.bytes);
            if (json === undefined ||
                json.rootKind === "invalid" ||
                (json.rootKind !== "container" && format !== "json") ||
                json.needsNumberTypes ||
                json.nonFiniteNumberObserved)
                return undefined;
            parsed = json.project();
        }
        if (!parsed.ok)
            return parsed.error instanceof AnalysisOutputError ||
                parsed.error instanceof XmlPlistTextDecodeError
                ? err(unreadablePlist(fileInput.selection, parsed.error.message, {
                    cause: parsed.error,
                }))
                : err(parsed.error);
        return ok(nativePlistObservation({
            parsed: parsed.value,
            format,
            path: fileInput.selection.path,
            sourceSha256: fileInput.sha256,
            resourceRoot: this.bundleResourceRoot,
            provenance,
        }));
    }
    async #inspectConvertedPlist(fileInput, classified, format, sourceRefusal) {
        const { path } = fileInput.selection;
        const { signal, timeoutMs, operand } = fileInput;
        const json = await this.#run("inspect_plist", "plutil", ["-convert", "json", "-o", "-", "--", operand], { signal, acceptNonZero: true, timeoutMs });
        if (!json.ok)
            return json;
        // JSON cannot express data, dates, or non-finite reals; plutil rejects
        // such plists, so decode its XML conversion instead. JSON also prints an
        // integral <real> like an <integer>, so XML identifies unsafe number types.
        const jsonDecoded = json.value.exitCode === 0;
        const jsonAttempt = jsonDecoded
            ? readPlistJson(json.value.stdout)
            : undefined;
        let xml;
        let parsed;
        if (jsonAttempt === undefined || jsonAttempt.needsNumberTypes) {
            const converted = await this.#run("inspect_plist", "plutil", ["-convert", "xml1", "-o", "-", "--", operand], { signal, acceptNonZero: !jsonDecoded, timeoutMs });
            if (!converted.ok)
                return converted;
            xml = converted.value;
            if (xml.exitCode !== 0) {
                return err(nativePlistDecodeFailure(fileInput.selection, xml, operand));
            }
            parsed =
                jsonAttempt === undefined
                    ? parsePlistXml(xml.stdout)
                    : jsonAttempt.project(xml.stdout);
        }
        else {
            parsed = jsonAttempt.project();
        }
        if (!parsed.ok)
            return parsed;
        const provenance = [
            classified,
            json.value,
            ...(xml === undefined ? [] : [xml]),
        ].map((item) => invocation(item, operand, "$PLIST"));
        return ok(nativePlistObservation({
            parsed: sourceRefusal === undefined
                ? parsed.value
                : {
                    ...parsed.value,
                    limitations: [
                        `REA's XML reader refused the source (${sourceRefusal}), but plutil read it, so the value comes from plutil's conversion rather than the original text.`,
                        ...parsed.value.limitations,
                    ],
                },
            format,
            path,
            sourceSha256: fileInput.sha256,
            resourceRoot: this.bundleResourceRoot,
            provenance,
        }));
    }
    async #inspectMacho(parameters, signal, timeoutMs) {
        if (!isMachOFormat(this.target.format))
            return err(new AnalysisCapabilityUnavailableError(IDENTITY.id, "inspect_macho", "Active artifact is not Mach-O."));
        const needsPrivateOtoolOperand = /\([^/]*\)$/u.test(basename(this.target.path));
        const inspect = (privateOperand) => withNativeMachoSource(this.target, this.#machoResources, signal, (source) => inspectNativeMacho({
            target: this.target,
            ...(signal === undefined ? {} : { signal }),
            run: (tool, arguments_, commandSignal, acceptNonZeroIf) => this.#run("inspect_macho", tool, privateOperand !== undefined
                ? arguments_.map((argument) => argument === this.target.path ? privateOperand : argument)
                : arguments_, {
                signal: commandSignal,
                timeoutMs,
                ...(acceptNonZeroIf === undefined ? {} : { acceptNonZeroIf }),
            }),
            invocation: (capture) => invocation(capture, this.target.path),
            // Encryption facts come from the same identity-bound descriptor.
            readEncryption: () => readMachoEncryption((at, length) => source.readSlice(0, source.bytes, Math.min(at, source.bytes), Math.max(0, Math.min(length, source.bytes - at))), source.bytes, MACHO_ENCRYPTION_MAPPING_RECORDS),
            resolveSlice: (selected) => resolveSelectedMachoSlice(source, selected, Math.floor(NATIVE_COMMAND_OUTPUT_BUDGET_BYTES / 256)),
            readSliceRange: (offset, size, at, length) => source.readSlice(offset, size ?? source.bytes - offset, at, length),
            readCommandNames: async (offset, size, selected) => {
                const length = size ?? source.bytes - offset;
                // Binary strings can expand to hex and escaped JSON, and each
                // record becomes several objects. Reserve room for those forms.
                const maximum = Math.floor(NATIVE_COMMAND_OUTPUT_BUDGET_BYTES / 12);
                const maximumRecords = Math.floor(NATIVE_COMMAND_OUTPUT_BUDGET_BYTES / 256);
                const binary = await readMachoCommandNames((at, bytes) => source.readSlice(offset, length, at, bytes), length, maximum, maximumRecords, NATIVE_COMMAND_OUTPUT_BUDGET_BYTES);
                if (size !== null) {
                    if (selected === undefined)
                        throw invariantViolation("Selected Mach-O slice is unavailable");
                    assertSelectedMachoSlice(source, selected, binary);
                }
                return binary;
            },
        }));
        try {
            return await this.#machoResources.run(() => needsPrivateOtoolOperand
                ? this.#withPrivateNativeOperand({
                    operation: "inspect_macho",
                    label: "private otool operand",
                    prefix: "rea-macho-operand-",
                    sourcePath: this.target.path,
                }, signal, async (root) => {
                    const operand = join(root, "artifact.macho");
                    await symlink(this.target.path, operand);
                    return operand;
                }, async (operand) => {
                    try {
                        return await inspect(operand);
                    }
                    catch (cause) {
                        return err(nativeMachoSourceFailure(cause, this.target, parameters, "inspect_macho"));
                    }
                })
                : inspect());
        }
        catch (cause) {
            return err(nativeMachoSourceFailure(cause, this.target, parameters, "inspect_macho"));
        }
    }
    async #withPrivateNativeOperand({ operation, label, prefix, sourcePath }, signal, prepare, inspect) {
        try {
            return await this.#nativeOperandResources.run(async () => {
                if (signal?.aborted)
                    return err(cancelledBy(operation, signal));
                let root;
                try {
                    root = await (this.privateRuntimeRootFactory?.() ??
                        PrivateRuntimeRoot.create({ prefix }));
                }
                catch (cause) {
                    return err(new ProviderAdapterError(IDENTITY.id, operation, {
                        cause,
                        diagnostics: {
                            reason: `Unable to create a ${label}`,
                            path: sourcePath,
                        },
                    }));
                }
                const owner = {
                    kind: "lease",
                    resource: root.path,
                    lease: {
                        release: async () => {
                            const commandFailure = await this.#retryNativeCommandCleanup();
                            if (commandFailure !== undefined)
                                throw commandFailure;
                            await root.close();
                        },
                    },
                };
                let result;
                try {
                    const operand = await prepare(root.path);
                    result = signal?.aborted
                        ? err(cancelledBy(operation, signal))
                        : await inspect(operand);
                }
                catch (cause) {
                    result = err(new ProviderAdapterError(IDENTITY.id, operation, {
                        cause,
                        diagnostics: {
                            reason: `Unable to prepare the ${label}`,
                            path: sourcePath,
                        },
                    }));
                }
                const released = await this.#nativeOperandResources.release(owner);
                const partial = result.ok && (released.kind === "failed" || signal?.aborted)
                    ? (operation === "inspect_macho"
                        ? inspectMachoSchema
                        : inspectPlistSchema).parse(result.value.result)
                    : undefined;
                if (released.kind === "failed") {
                    const cleanup = new ProviderCleanupError(IDENTITY.id, [root.path], {
                        reason: `The ${label} could not be released`,
                    }, { operation, cause: released.cause });
                    if (partial !== undefined)
                        cleanup.retainPartialObservation(partial);
                    new AnalysisCleanupLeaseGroup(cleanup, [released.lease]);
                    const primary = result.ok
                        ? signal?.aborted
                            ? cancelledBy(operation, signal, {
                                partialObservation: partial,
                            })
                            : undefined
                        : result.error;
                    return err(primary === undefined
                        ? cleanup
                        : analysisErrorWithCleanupDependencies(primary, cleanup, operation));
                }
                if (signal?.aborted && result.ok)
                    return err(cancelledBy(operation, signal, {
                        partialObservation: partial,
                    }));
                return result;
            });
        }
        catch (cause) {
            const failure = new ProviderCleanupError(IDENTITY.id, this.#nativeOperandResources.cleanupResources, {
                reason: "A previous private native command operand remains owned",
            }, { operation, cause });
            bindArtifactFileCleanup(cause, failure);
            return err(failure);
        }
    }
    async #run(operation, tool, arguments_, options) {
        // Commands borrow their enclosing operation's admission through finalization.
        const captured = await this.runner.run(tool, arguments_, {
            ...(options.signal === undefined ? {} : { signal: options.signal }),
            timeoutMs: options.timeoutMs,
            acceptNonZero: options.acceptNonZero ?? options.acceptNonZeroIf !== undefined,
        });
        if (captured.ok) {
            const hasFailedExit = captured.value.exitCode !== 0 || captured.value.signal !== null;
            if (hasFailedExit &&
                options.acceptNonZeroIf !== undefined &&
                !options.acceptNonZeroIf(captured.value))
                return err(translateNativeCommandFailure(operation, new NativeCommandFailure(tool, captured.value.signal !== null ||
                    (captured.value.exitCode !== null &&
                        captured.value.exitCode !== 0)
                    ? "nonzero-exit"
                    : "io", captured.value.exitCode, undefined, {
                    stdout: captured.value.stdout,
                    stderr: captured.value.stderr,
                    stdoutBytes: captured.value.stdoutBytes,
                    stderrBytes: captured.value.stderrBytes,
                    exitCode: captured.value.exitCode,
                    signal: captured.value.signal,
                    truncated: false,
                }), this.#nativeOperandResources));
            return captured;
        }
        return err(translateNativeCommandFailure(operation, captured.error, this.#nativeOperandResources, options.timeoutMs));
    }
}
const nativeCommandCleanupFailure = (failures) => {
    const failure = new ProviderCleanupError(IDENTITY.id, [...new Set(failures.flatMap(({ resources }) => resources))], {
        reason: "Native command process cleanup remains incomplete",
        failures: failures.map(({ reason, resources }) => ({
            reason,
            resources: [...resources],
        })),
    });
    if (failures.length === 0 ||
        failures.some(({ marker }) => marker === undefined))
        return failure;
    const markers = failures.flatMap(({ marker }) => marker === undefined ? [] : [marker]);
    return markers.length === 0
        ? failure
        : failure.bindCleanupDependencies(markers);
};
/** Each file workflow retains its own exact resource set through client close. */
const closeNativeFileScope = async (scope, resource) => {
    try {
        await scope.close();
        return undefined;
    }
    catch (cause) {
        const observation = ArtifactReaderFailure.cleanupObservation(cause, resource);
        const failure = new ProviderCleanupError(IDENTITY.id, observation.resources, { reason: observation.reason }, { operation: "close_binary", cause });
        bindArtifactFileCleanup(cause, failure);
        return failure;
    }
};
/**
 * Project a producer failure. A broken internal assumption is a REA defect, not
 * native output, so it is rethrown rather than reported as output parsing.
 */
const nativeOutputFailure = (operation, cause) => {
    if (cause instanceof InternalInvariantError)
        throw cause;
    return new AnalysisOutputError(operation, "Native output parsing failed", {
        cause,
    });
};
const nativeMachoCompletedFailure = (value) => value !== null &&
    typeof value === "object" &&
    "ok" in value &&
    value.ok === false &&
    "error" in value &&
    value.error instanceof AnalysisError
    ? value.error
    : undefined;
const nativeMachoSourcePrimary = ({ cause }, path, operation) => {
    if (cause instanceof AnalysisError)
        return cause;
    if (isParseLimit(cause, "macho"))
        return parseLimitConstraint(operation, "memory", cause, {
            retryable: false,
        });
    const formatFailure = parseFailureAnalysisError(operation, path, cause);
    if (formatFailure !== undefined)
        return formatFailure;
    const completed = cause instanceof NativeMachoSourceVerificationFailure
        ? cause.completed
        : undefined;
    const failed = cause instanceof NativeMachoSourceVerificationFailure &&
        cause.outcome.kind === "failed"
        ? nativeMachoSourcePrimary(artifactFilePrimaryFacts(cause.outcome.cause), path, operation)
        : undefined;
    const completedFailure = nativeMachoCompletedFailure(completed);
    const previous = failed ?? completedFailure;
    const optionsWithoutCause = previous === undefined
        ? {}
        : {
            diagnostics: {
                previous_error: jsonValueSchema.parse(projectAnalysisError(previous)),
            },
        };
    const options = { cause, ...optionsWithoutCause };
    if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") {
        // A returned failure is already the producer's physical outcome. A later
        // cancelled identity check must not replace its output or cleanup owner.
        if (completedFailure !== undefined)
            return analysisErrorWithCancellation(completedFailure, cancelledBy(operation, carriedReason(artifactFileCancellationCause(cause))));
        return cancelledBy(operation, carriedReason(artifactFileCancellationCause(cause)), optionsWithoutCause);
    }
    if (cause instanceof ArtifactReaderFailure && cause.reason === "format")
        return new AnalysisOutputError(operation, cause.message, options);
    if (cause instanceof ArtifactReaderFailure && cause.reason === "integrity")
        return readerIntegrityFailure(operation, path, cause, options);
    return new ProviderAdapterError(IDENTITY.id, operation, {
        ...options,
        userMessage: "The selected Mach-O source could not be read safely.",
        remediationAction: "Inspect the selected path and its read access, then retry.",
    });
};
const nativeMachoCompletion = (cause, target, parameters, operation) => {
    const completion = artifactFileCompletion(cause);
    // The file operation only completes after the producer result has passed
    // the final identity check. Both Mach-O command workflows own their callbacks.
    const outcome = completion?.value;
    const observation = outcome?.ok === true
        ? createAnalysisExecutionEvidence(operation, parameters, {
            ...createAnalysisExecution(outcome.value.result, IDENTITY, {
                limitations: outcome.value.limitations,
                locations: outcome.value.locations,
            }),
            subject: target,
        }, "observed", { immutable: true })
        : undefined;
    const completedFailure = nativeMachoCompletedFailure(completion?.value);
    const completionCancellation = completion?.cancellation === undefined
        ? undefined
        : cancelledBy(operation, carriedReason(completion.cancellation.reason), completedFailure === undefined ||
            completedFailure.cleanupIncomplete ||
            (cause instanceof ArtifactReaderFailure &&
                cause.cleanup !== undefined)
            ? {}
            : {
                diagnostics: {
                    previous_error: jsonValueSchema.parse(projectAnalysisError(completedFailure)),
                },
            });
    return { observation, completedFailure, completionCancellation };
};
/** Every native reclassification retains the command and independent file owners. */
const nativeFailureWithCommandCleanup = (primary, producer, operation, descriptorCleanup) => {
    if (!producer.cleanupIncomplete)
        return primary;
    const cleanup = descriptorCleanup ?? producer;
    return cleanup === primary
        ? primary
        : analysisErrorWithCleanupFailure(primary, cleanup, operation).bindCleanupDependencies([
            primary,
            producer,
            ...(descriptorCleanup === undefined ? [] : [descriptorCleanup]),
        ]);
};
/** The exact callback error remains an owner even if verification reclassifies it. */
const nativeMachoProducerFailure = (cause) => {
    if (cause instanceof AnalysisError)
        return cause;
    if (!(cause instanceof NativeMachoSourceVerificationFailure))
        return undefined;
    return cause.outcome.kind === "failed"
        ? nativeMachoProducerFailure(cause.outcome.cause)
        : nativeMachoCompletedFailure(cause.outcome.value);
};
const nativeMachoSourceFailure = (cause, target, parameters, operation) => {
    const { observation, completedFailure, completionCancellation } = nativeMachoCompletion(cause, target, parameters, operation);
    const source = artifactFilePrimaryFacts(cause);
    const producerFailure = completedFailure ?? nativeMachoProducerFailure(source.cause);
    // Classification and ownership are independent: neither a changed source nor
    // a released descriptor settles the command's retained cleanup capability.
    const retainOwnedCleanup = (selected, descriptorCleanup) => {
        if (!producerFailure?.cleanupIncomplete)
            return selected;
        const primary = selected === descriptorCleanup
            ? (descriptorCleanup.cleanupPrimary ?? producerFailure)
            : selected === completionCancellation
                ? producerFailure
                : selected;
        if (completionCancellation !== undefined)
            analysisErrorWithCancellation(primary, completionCancellation);
        return nativeFailureWithCommandCleanup(primary, producerFailure, operation, descriptorCleanup);
    };
    if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) {
        const physical = cause instanceof ArtifactFileCleanupFailure
            ? cause.fileCleanupFailure
            : undefined;
        const previous = physical?.outcome.kind === "failed"
            ? nativeMachoSourcePrimary(artifactFilePrimaryFacts(cause), target.path, operation)
            : physical?.outcome.kind === "completed"
                ? (completedFailure ?? completionCancellation)
                : completionCancellation;
        const failure = new ProviderCleanupError(IDENTITY.id, cause.cleanup.resources, {
            reason: cause.cleanup.reason,
            previous_error: previous === undefined
                ? null
                : jsonValueSchema.parse(projectAnalysisError(previous)),
            ...(completionCancellation !== undefined &&
                previous !== completionCancellation
                ? {
                    completion_cancellation: jsonValueSchema.parse(projectAnalysisError(completionCancellation)),
                }
                : {}),
        }, {
            operation,
            cause,
            cleanupPrimary: previous,
            partialObservation: observation,
            ...(completionCancellation === undefined && observation !== undefined
                ? { completedObservation: observation }
                : {}),
        });
        // Do not embed the potentially large observation in the projected
        // cancellation diagnostics as well as the cleanup error's observation.
        if (observation !== undefined)
            completionCancellation?.retainPartialObservation(observation);
        bindArtifactFileCleanup(cause, failure);
        return retainOwnedCleanup(failure, failure);
    }
    if (completionCancellation !== undefined) {
        if (observation !== undefined)
            completionCancellation.retainPartialObservation(observation);
        return retainOwnedCleanup(completionCancellation);
    }
    return retainOwnedCleanup(nativeMachoSourcePrimary(source, target.path, operation));
};
const isNativeOperation = (operation) => NATIVE_TOOL_CONTRACTS.some(({ name }) => name === operation);
const translateCodeSignExitFailure = (capture, resources) => translateNativeCommandFailure("inspect_signature", new NativeCommandFailure("codesign", "nonzero-exit", capture.exitCode, undefined, 
// Accepted output stays complete until the provider decides it failed.
failureCapture(capture, false)), resources);
/**
 * Accept only codesign's exact unsigned diagnostic for the bound snapshot,
 * optionally preceded by its verified Executable path echo.
 * The operand is framed byte-for-byte so caller-controlled path text cannot
 * supply the phrase that determines signature state.
 */
const isNonzeroUnsignedObservation = (capture, snapshotPath, executablePaths) => {
    if (capture.exitCode === null ||
        capture.exitCode === 0 ||
        capture.signal !== null ||
        capture.arguments.at(-1) !== snapshotPath ||
        capture.stdout !== "")
        return false;
    const diagnostic = `${snapshotPath}: code object is not signed at all`;
    return [
        "",
        ...executablePaths.flatMap((path) => [
            `Executable=${path}\n`,
            `Executable=${path}\r\n`,
        ]),
    ].some((prefix) => [diagnostic, `${diagnostic}\n`, `${diagnostic}\r\n`].some((body) => capture.stderr === `${prefix}${body}`));
};
const canonicalPath = async (path) => {
    try {
        return [await realpath(path)];
    }
    catch {
        return [];
    }
};
const codeSignCaptureFailure = (resources, capture, snapshotPath, executablePaths) => capture.exitCode === 0 ||
    isNonzeroUnsignedObservation(capture, snapshotPath, executablePaths)
    ? null
    : translateCodeSignExitFailure(capture, resources);
const codeSignArchitectures = (format, target) => {
    // An architecture-selected codesign display describes the selected slice,
    // not the admitted container. The target owns the container's slice list.
    if (target.kind === "executable" && target.format === "mach-o-universal") {
        if (target.universalSlices === undefined)
            return { architectures: [], unknownSlices: true };
        const slices = target.universalSlices;
        // Each known selector names exactly one slice, so known names are unique.
        const names = slices.map((_, index) => machoKnownCodeSignSelector(slices, index));
        const known = names.filter((name) => name !== undefined);
        return {
            architectures: known,
            unknownSlices: known.length !== names.length,
        };
    }
    const universal = /^Mach-O universal \(([^)\r\n]+)\)$/u.exec(format ?? "")?.[1];
    if (universal !== undefined) {
        const architectures = universal
            .split(/\s+/u)
            .filter((architecture) => /^[A-Za-z][A-Za-z0-9_.]*$/u.test(architecture));
        if (architectures.length > 0)
            return {
                architectures: [...new Set(architectures)],
                unknownSlices: false,
            };
    }
    if (format?.startsWith("Mach-O thin ") === true)
        return { architectures: [], unknownSlices: false };
    if (target.kind !== "executable" || !isMachOFormat(target.format))
        return { architectures: [], unknownSlices: false };
    return {
        architectures: target.availableArchitectures.map((architecture) => architecture === "x86" ? "i386" : architecture),
        unknownSlices: false,
    };
};
const invocation = (capture, artifactPath, alias = "$ARTIFACT") => ({
    tool: capture.tool,
    command: [
        capture.executable,
        ...capture.arguments.map((argument) => argument === artifactPath ? alias : argument),
    ],
    tool_version: capture.toolVersion,
    version_reason: capture.versionReason,
    executable_sha256: capture.executableSha256,
    exit: { code: capture.exitCode, signal: capture.signal },
    stdout_bytes: capture.stdoutBytes,
    stderr_bytes: capture.stderrBytes,
});
const nativePlistObservation = (input) => {
    const { parsed, format, path, sourceSha256, resourceRoot, provenance } = input;
    const result = inspectPlistSchema.parse({
        format,
        value: parsed.value,
        bundle: parsed.bundle,
        source_path: path,
        source_sha256: sourceSha256,
        ...(resourceRoot === undefined
            ? {}
            : {
                resource_root: {
                    caller_path: resourceRoot.callerPath,
                    canonical_path: resourceRoot.canonicalPath,
                    info_plist_path: resourceRoot.infoPlistPath,
                    layout: resourceRoot.layout,
                    executable_sha256: resourceRoot.executableSha256,
                },
            }),
        provenance,
        limitations: parsed.limitations,
    });
    return {
        result: jsonValueSchema.parse(result),
        limitations: parsed.limitations,
        locations: [{ kind: "artifact-path", path }],
    };
};
const parseEntitlements = (output) => {
    const start = output.indexOf("<?xml");
    const end = output.lastIndexOf("</plist>");
    if (start < 0 || end < start)
        return { value: null, limitations: [] };
    const decoded = parseXmlPropertyList(output.slice(start, end + "</plist>".length));
    const projected = projectPlistValue(decoded.value);
    const numbers = createPlistNumberProjection(decoded.numberLiterals);
    const value = numbers.project(projected.value);
    return {
        value,
        limitations: [
            ...numbers.limitations(),
            ...plistDuplicateKeyLimitations(decoded.duplicateKeys),
            ...(projected.nonFiniteRealCount === 0
                ? []
                : [nonFiniteRealLimitation(projected.nonFiniteRealCount)]),
            ...(projected.negativeZeroRealCount === 0
                ? []
                : [negativeZeroRealLimitation(projected.negativeZeroRealCount)]),
            ...(projected.unknownDateCount === 0
                ? []
                : [unknownDateLimitation(projected.unknownDateCount)]),
            ...(projected.unknownScalarCount === 0
                ? []
                : [unknownScalarLimitation(projected.unknownScalarCount)]),
        ],
    };
};
/** Native admission failures preserve the selected/default source and physical command output. */
const nativePlistDecodeFailure = (selection, command, operand) => {
    const capture = failureCapture(command, false);
    return unreadablePlist(selection, `plutil could not decode it as a property list (${plutilDiagnostic(capture, operand, selection.path)})`, {
        capturedOutput: {
            stdout: capture.stdout,
            stderr: capture.stderr,
            truncated: capture.truncated,
            stdout_bytes: capture.stdoutBytes,
            stderr_bytes: capture.stderrBytes,
            exit_code: capture.exitCode,
            signal: capture.signal,
        },
    });
};
/**
 * The reason REA's XML reader refused a plist's syntax. CoreFoundation accepts
 * some documents that strict XML rejects (#12234), so plutil decides those.
 * Plist structure errors and refused document types are not syntax refusals.
 */
const xmlSyntaxRefusal = (error) => {
    const cause = error instanceof AnalysisOutputError ? error.cause : undefined;
    return cause instanceof ParseFailureError &&
        cause.failure.format === "xml" &&
        cause.kind === "malformed"
        ? cause.message
        : undefined;
};
const plutilDiagnostic = (capture, operand, sourcePath) => {
    const diagnostics = [capture.stderr, capture.stdout]
        .map((stream) => {
        const text = stream.trim();
        const path = [operand, sourcePath].find((path) => text.startsWith(`${path}: `));
        return path === undefined ? text : text.slice(path.length + 2);
    })
        .filter((text) => text.length > 0);
    return diagnostics.length === 0
        ? "plutil printed no diagnostic"
        : diagnostics.join("\n");
};
