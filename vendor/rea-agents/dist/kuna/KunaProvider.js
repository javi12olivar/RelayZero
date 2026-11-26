import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { KUNA_STRING_MIN_LENGTH } from "./KunaLimits.js";
import { cancelledBy } from "../domain/analysisErrorCore.js";
import { createAnalysisProfile, } from "../domain/analysisProfile.js";
import { classifyProviderFailure } from "../providers/classifyProviderFailure.js";
import { err, ok } from "../domain/result.js";
import { resolveRegexMatchingDeadline, } from "../config/regexMatchingDeadline.js";
import { resolveRegexWorkerHeapRequest, } from "../config/regexWorkerHeapRequest.js";
import { snapshotEnvironment } from "../process/snapshotEnvironment.js";
import { kunaInstallationDialect, } from "./KunaCommand.js";
import { readKunaConfiguration, } from "./KunaConfiguration.js";
import { createKunaResourceScope, inspectKunaInstallation, } from "./KunaInstallation.js";
import { admitKunaCommand } from "./KunaAdmission.js";
import { KunaProjectCache } from "./KunaProjectCache.js";
import { kunaCapabilities } from "./KunaProviderCapabilities.js";
import { KUNA_PROVIDER_IDENTITY } from "./KunaProviderMetadata.js";
import { KUNA_RELEASE_VERIFICATION_EXPLANATION, KUNA_UNVERIFIED_VERSION_REMEDIATION, KUNA_VERIFIED_VERSION, } from "./KunaRelease.js";
import { KunaRunSlots } from "./KunaRunSlots.js";
import { KunaSessionClient } from "./KunaSessionClient.js";
import { kunaUnavailable } from "./KunaUnavailable.js";
const KUNA_ARCHITECTURE_LABELS = {
    x86: null,
    x86_64: "x86-64",
    arm64: "AArch64",
    arm: "ARM",
    arm64_32: null,
    mips: null,
    "6502": null,
    riscv: null,
    powerpc: null,
    m68k: null,
    hexagon: null,
    xtensa: null,
};
const kunaArchitectureLabels = new Intl.ListFormat("en-GB").format(Object.values(KUNA_ARCHITECTURE_LABELS).filter((label) => label !== null));
/**
 * Bring-your-own Kuna candidate. Discovery reads configuration and the
 * executable's metadata only; the version probe runs when a target is opened.
 */
export class KunaProvider {
    #environment;
    #deadline;
    #heapRequest;
    #platform;
    #launcher;
    #singleFunctionRuns;
    #cache;
    #runSlots;
    constructor(environment, options = {}) {
        this.#platform = options.platform ?? HOST_PLATFORM.platform;
        this.#environment = snapshotEnvironment(environment, this.#platform);
        this.#deadline =
            options.regexMatchingDeadline ??
                resolveRegexMatchingDeadline(this.#environment);
        this.#heapRequest =
            options.regexWorkerHeapRequest ??
                resolveRegexWorkerHeapRequest(this.#environment);
        this.#launcher = options.launcher;
        this.#singleFunctionRuns = options.singleFunctionRuns;
    }
    identity() {
        return KUNA_PROVIDER_IDENTITY;
    }
    capabilities() {
        return kunaCapabilities(this.inspectAvailability(), this.#deadline, this.#heapRequest);
    }
    inspectAvailability() {
        const admission = admitKunaCommand(this.#environment, this.#platform);
        if (!admission.ok)
            return {
                status: "unavailable",
                code: admission.error.code,
                reason: admission.error.reason,
                remediation: admission.error.remediation,
                diagnostics: { ...admission.error.diagnostics, version_probed: false },
            };
        return {
            status: "available",
            code: null,
            reason: null,
            diagnostics: {
                configured: true,
                command: admission.value.command,
                cache_root: admission.value.cacheRoot,
                jobs: admission.value.jobs,
                version_probed: false,
            },
        };
    }
    inspectTargetSupport(target) {
        const diagnostics = {
            target_kind: target.kind,
            target_format: target.format,
        };
        if (target.kind !== "executable")
            return {
                status: "unsupported",
                code: "target_kind_unsupported",
                reason: "Kuna decompiles executable images, not databases or archives.",
                diagnostics,
            };
        if (target.format !== "elf" && target.format !== "mach-o")
            return {
                status: "unsupported",
                code: "target_format_unsupported",
                reason: target.format === "mach-o-universal"
                    ? "REA's Kuna provider has no verified universal Mach-O slice selection yet; open a thin slice or use another provider."
                    : `REA verified the Kuna provider on ELF and thin Mach-O images; ${target.format} is not admitted yet.`,
                diagnostics,
            };
        if (KUNA_ARCHITECTURE_LABELS[target.architecture] === null)
            return {
                status: "unsupported",
                code: "architecture_unsupported",
                reason: `REA verified the Kuna provider on ${kunaArchitectureLabels}; ${target.architecture} is not admitted yet.`,
                diagnostics: { ...diagnostics, architecture: target.architecture },
            };
        return { status: "supported", code: null, reason: null, diagnostics };
    }
    async resolveAnalysisProfile(_target, options) {
        if (options?.signal?.aborted === true)
            return err(cancelledBy("kuna:profile", options.signal));
        let installation;
        const resourceScope = options?.resourceScope;
        if (resourceScope === undefined)
            return err(kunaUnavailable("kuna:profile", "Kuna profile inspection requires a durable resource scope"));
        const kunaResources = createKunaResourceScope(resourceScope);
        try {
            installation = await inspectKunaInstallation(this.#environment, {
                platform: this.#platform,
                ...(options?.signal === undefined ? {} : { signal: options.signal }),
                resourceScope: kunaResources.owner,
                ...(this.#launcher === undefined
                    ? {}
                    : { processLauncher: this.#launcher }),
            });
        }
        catch (cause) {
            return err(classifyProviderFailure(cause, kunaInstallationDialect("kuna:profile", kunaResources, (unrecognised) => {
                // The inspection reports expected failures in its Result; any
                // other rejection is not a Kuna outcome and stays the caller's.
                throw unrecognised;
            })));
        }
        if (!installation.ok) {
            const error = kunaUnavailable("open_binary", installation.error.reason, {
                diagnostics: installation.error.diagnostics,
                ...(!kunaResources.hasPending
                    ? {}
                    : {
                        cleanup: {
                            reason: "Kuna version-probe process cleanup is unconfirmed.",
                            resources: kunaResources.cleanupResources ?? [],
                        },
                    }),
            });
            kunaResources.bindRetainedFailure(error);
            return err(error);
        }
        const { value } = installation;
        return ok({
            releaseVerification: {
                status: value.verified
                    ? "verified"
                    : "unverified",
                basis: "reported_version",
                reported_version: value.version,
                verified_version: KUNA_VERIFIED_VERSION,
                explanation: KUNA_RELEASE_VERIFICATION_EXPLANATION,
                remediation: value.verified
                    ? null
                    : KUNA_UNVERIFIED_VERSION_REMEDIATION,
            },
            profile: createAnalysisProfile({ ...KUNA_PROVIDER_IDENTITY, version: value.version }, {
                kuna_version: value.version,
                kuna_sha256: value.sha256,
                kuna_command: value.configuration.command,
                kuna_executable: value.executable,
                jobs: value.configuration.jobs,
                export: "decompile-project",
                reference_graph: {
                    command: "decompile-graph",
                    schema_version: 4,
                    bodies: false,
                    edge_kind: "call",
                    discovery: "body-classification-v1",
                },
                xrefs: {
                    command: "xrefs",
                    direction: "to",
                    exact_address: true,
                    stored_pointers: true,
                },
                strings: {
                    command: "strings",
                    encoding: "all",
                    min_length: KUNA_STRING_MIN_LENGTH,
                    termination: "any",
                    xrefs: false,
                },
                value_flow: "explicitly-unavailable-v1",
                cache_policy: "live",
            }),
        });
    }
    /** Shared cache cleanup belongs to the candidate, not a retired client. */
    closeOwnedResources() {
        return this.#cache?.close() ?? Promise.resolve(ok(null));
    }
    hasPendingOwnedResources() {
        return this.#cache?.hasPendingCleanup === true;
    }
    createClient(target, profile) {
        const configuration = readKunaConfiguration(this.#environment, this.#platform);
        if (!configuration.ok)
            return {
                execute: async (operation) => err(kunaUnavailable(operation, configuration.error.reason)),
                close: async () => ok(null),
            };
        return new KunaSessionClient(target, profile, {
            cache: this.#projectCache(configuration.value),
            runSlots: this.#foregroundSlots(configuration.value),
            environment: this.#environment,
            platform: this.#platform,
            deadline: this.#deadline,
            heapRequest: this.#heapRequest,
            ...(this.#launcher === undefined ? {} : { launcher: this.#launcher }),
        });
    }
    /** One cache per provider, so sessions of one server share exports in flight. */
    #projectCache(configuration) {
        this.#cache ??= new KunaProjectCache(configuration.cacheRoot, {
            maxBytes: configuration.cacheMaxBytes,
            ...(this.#launcher === undefined ? {} : { launcher: this.#launcher }),
        });
        return this.#cache;
    }
    /** One admission pool per provider, so concurrent sessions share the host's cores. */
    #foregroundSlots(configuration) {
        this.#runSlots ??=
            this.#singleFunctionRuns === undefined
                ? KunaRunSlots.forHost(configuration.jobs)
                : new KunaRunSlots(this.#singleFunctionRuns);
        return this.#runSlots;
    }
}
