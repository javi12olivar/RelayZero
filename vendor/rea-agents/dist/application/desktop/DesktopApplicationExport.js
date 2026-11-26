import { unknownTarget } from "../../domain/targetIdentity.js";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { DESKTOP_EXPORT_FRAMEWORK_VERSION, appModuleFile, className, exportedStateFiles, renderAppClass, renderEnvToml, renderReadme, renderSkill, renderSmokeTask, } from "../../domain/desktop/appExport.js";
import { trashedFiles, runtimeSeeds, unownedChangedFolders, unreadDconfLimitation, } from "../../domain/desktop/appExportUnowned.js";
import { installLimitations } from "../../domain/desktop/appExportInstallLimitations.js";
import { desktopApplicationStateSchema, versionAt, } from "../../domain/desktop/desktopState.js";
import { isWithinAny } from "../../domain/desktop/desktopStateDiff.js";
import { scrubDconf } from "../../domain/desktop/seedScrub.js";
import { createEvidence } from "../../domain/evidence.js";
import { AnalysisCancelledError } from "../../domain/analysisErrorCore.js";
import { analysisErrorWithCancellation } from "../../domain/analysisErrorCancellation.js";
import { ProviderAdapterError } from "../../domain/providerAdapterError.js";
import { inspectDesktopApplicationState, readDesktopCapture, } from "./DesktopApplicationState.js";
import { DESKTOP_PROVIDER, desktopOperationFailure, } from "./DesktopCaptureRefusals.js";
import { admitApplication, exportEnvironmentName, installFiles, readDownloadInstall, } from "./DesktopExportInstall.js";
import { writeOutputTree, desktopOutputFailure, } from "./DesktopOutputTree.js";
import { retainedCopies, writeFiles, } from "./DesktopExportFiles.js";
import { planWithheld, refuseSignInDconf, withheldCopy, } from "./DesktopExportWithheld.js";
import { exportLimitations } from "./DesktopExportLimitations.js";
import { withRetainedContent } from "./DesktopRetainedContent.js";
import { planLaunch, seedModes, seedVersions } from "./DesktopExportLaunch.js";
import { selectStateEnds } from "./DesktopStateVersions.js";
import { admitDesktopTasks, } from "./DesktopTaskExport.js";
import { taskReads } from "./DesktopExportReaders.js";
import { isRecord } from "../../kernel/isRecord.js";
const OPERATION = "export_desktop_application";
/** Largest seed file the export copies; the state view reads only 64 MiB. */
const SEED_MAX_BYTES = 1024 * 1024 * 1024;
/** The application's dconf groups at the seed, as a dconf key file with the identity scrubbed from its strings. */
const seedDconf = (state, seed, identity) => {
    const database = state.paths.find((path) => path.format === "dconf" && path.role === "application_state");
    const version = database === undefined ? undefined : versionAt(database, seed);
    const view = version?.view;
    if (version?.present !== true || !isRecord(view) || !isRecord(view.groups))
        return { text: "", groups: 0, holdsIdentity: false };
    const groups = Object.keys(view.groups).length;
    return { ...scrubDconf(view.groups, identity), groups };
};
/** Files under the owned paths that existed at the seed without retained bytes, in the state view or omitted. */
const unseededFiles = (capture, homePath, files, { paths, seed }) => {
    const listed = [...files]
        .filter(([home, path]) => {
        const version = versionAt(path, seed);
        return (isWithinAny(home, paths) &&
            version?.present === true &&
            version.sha256 === null);
    })
        .map(([home]) => home);
    const omitted = capture.state.omitted_content
        .map(({ path }) => homePath(path))
        .filter((home) => home !== null && isWithinAny(home, paths) && !files.has(home));
    return [...new Set([...listed, ...omitted])].sort();
};
/** Decide the bundle from the capture and its state view at the seed, with each seed's digest and what it withholds. */
const planExport = async (request, capture, state, context) => {
    const { application, host } = capture;
    const source = exportEnvironmentName(capture, request.name);
    const { install, windowClass } = admitApplication(capture, source, {
        ...request,
        download: context.download,
    });
    const electron = application.executable.electron_markers.length > 0;
    const stateFiles = exportedStateFiles(capture, state);
    const { homePath, stateAliases, files, collisions, paths, isLeftOut } = stateFiles;
    const { text: dconf, ...dconfScrub } = seedDconf(state, context.seed, context.identity);
    const versions = seedVersions(files, paths, context.seed, isLeftOut);
    const app = { app: source, homePath, paths, ...versions };
    const { seeds, textSeeds, ...held } = await planWithheld(request, capture, app);
    refuseSignInDconf(request, state, context.seed);
    const { locks } = versions;
    const unseeded = unseededFiles(capture, homePath, files, {
        paths,
        seed: context.seed,
    });
    const launch = planLaunch(capture, electron, seeds, {
        ...stateFiles,
        restoredFiles: versions.seeds.keys(),
    });
    const plan = {
        viewPolicy: request.viewPolicy,
        name: source,
        className: className(source),
        title: application.desktop_entry?.name ?? source,
        aptPackage: install.aptPackage,
        aptRelease: install.release,
        packageVersion: application.package.version,
        libraryPackages: install.libraryPackages,
        aptSources: install.sources,
        architectures: install.architectures,
        packageFile: install.packageFile,
        ...(install.download === undefined ? {} : { download: install.download }),
        ...(install.executablePackage === undefined
            ? {}
            : { executablePackage: install.executablePackage }),
        ...(install.extraPackages === undefined
            ? {}
            : { extraPackages: install.extraPackages }),
        electron,
        command: launch.command,
        opens: launch.opens,
        windowClass,
        paths,
        capturedHome: host.home,
        seedCheckpoint: state.capture.checkpoints[context.seed] ?? "baseline",
        syntheticSeed: request.syntheticSeed === true,
        seedFiles: [...seeds.keys()].sort(),
        textSeeds,
        seedModes: seedModes(capture, seeds, files, context.seed),
        stateAliases,
        unseededFiles: unseeded.filter((file) => !isLeftOut(file)),
        leftOutLocks: [
            ...new Set([...locks, ...unseeded.filter(isLeftOut)]),
        ].sort(),
        unownedFolders: unownedChangedFolders(files, paths, isLeftOut),
        runtimeSeeds: runtimeSeeds([...seeds.keys()]),
        dconf,
        captureEvidenceId: context.evidenceId,
        withheld: held.withheld,
        consentedFiles: held.consented,
    };
    const unreadDconf = unreadDconfLimitation(stateFiles.dconf, context.seed);
    const limitations = [
        ...installLimitations(install, application.package, electron),
        ...(unreadDconf === undefined ? [] : [unreadDconf]),
    ];
    return {
        plan,
        seeds,
        held: { captured: versions.seeds, consent: held.consent },
        limitations,
        collisions,
        files,
        trashed: trashedFiles(files, context.seed),
        dconf: dconfScrub,
    };
};
/** The bundle's generated files, the class module flagged when its dconf keys hold the identity, and its README, made once the seeds' scrub is known. */
const bundleText = (plan, admitted, dconfHoldsIdentity, consent) => {
    const environment = `envs/${plan.name}`;
    const text = (path, content, holdsIdentity = false) => ({
        path,
        bytes: Buffer.from(content),
        holdsIdentity,
    });
    return {
        readme: (scrub) => text("README.md", renderReadme(plan, admitted?.readme, scrub)),
        generated: [
            text(`${environment}/env.toml`, renderEnvToml(plan)),
            text(`${environment}/${appModuleFile(plan.name)}`, renderAppClass({
                ...plan,
                relaunchOnReset: admitted?.screenJudged === true,
            }), dconfHoldsIdentity),
            text(`${environment}/SKILL.md`, renderSkill(plan)),
            ...installFiles(plan).map(({ path, content }) => text(`${environment}/${path}`, content)),
            text("tasks/smoke.json", renderSmokeTask(plan)),
            ...(consent === undefined ? [] : [text("consent.json", consent)]),
            ...(admitted?.files ?? []).map((file) => text(file.path, file.content)),
        ],
    };
};
/** What the scrub reports before it runs. */
const NO_SCRUB = {
    scrubbed: [],
    recompressed: [],
    unscrubbed: [],
};
const runExport = async (request, readers, signal) => {
    const { evidence, capture } = await readDesktopCapture(request.capture, signal);
    const stateEvidence = await inspectDesktopApplicationState(request.capture, readers, signal, { viewPolicy: request.viewPolicy });
    if (stateEvidence instanceof AnalysisError)
        throw stateEvidence;
    const state = desktopApplicationStateSchema.parse(stateEvidence.normalized_result);
    const { checkpoints } = state.capture;
    const ends = selectStateEnds(checkpoints, { seed: request.seedCheckpoint, end: request.endCheckpoint }, OPERATION);
    const { home, hostname, user } = capture.host;
    const identity = { home, hostname: hostname ?? null, user: user ?? null };
    const { plan, seeds, held, collisions, files, trashed, dconf, ...install } = await planExport(request, capture, state, {
        evidenceId: evidence.evidence_id,
        seed: ends.seed,
        identity,
        download: await readDownloadInstall(request.downloadInstall, signal),
    });
    const copies = retainedCopies(plan, seeds);
    const reads = await taskReads(request, SEED_MAX_BYTES, {
        copies,
        files,
        ends,
        identity,
        checkpoints,
        taskReader: readers.taskReader,
        signal,
    });
    const admitted = await admitDesktopTasks({ paths: request.tasks, ends: request.taskEnds ?? [] }, {
        ...plan,
        files,
        identity,
        ends,
        checkpoints,
        ...reads,
        seeded: new Set(seeds.keys()),
    }, signal);
    const copy = await withheldCopy(request, plan, held.captured, signal);
    const text = bundleText(plan, admitted, dconf.holdsIdentity, held.consent);
    const { generated, readme } = text;
    let scrub = NO_SCRUB;
    const completion = await writeOutputTree(copy.bundle, (tree) => withRetainedContent(request.capture, async (content) => {
        const bundle = { generated, copies, identity, readme };
        scrub = await writeFiles(tree, content, bundle, signal);
    }, SEED_MAX_BYTES), { operation: OPERATION, field: "directory" }, signal);
    const limitations = exportLimitations(capture, plan, {
        install: install.limitations,
        collisions,
        identity,
        trashed,
        recovered: scrub.recovered ?? [],
        task: admitted?.limitations ?? [],
        files,
    });
    const result = {
        directory: request.directory,
        environment: plan.name,
        framework_version: DESKTOP_EXPORT_FRAMEWORK_VERSION,
        checkpoints: {
            seed: checkpoints[ends.seed] ?? "baseline",
            end: checkpoints[ends.end] ?? "baseline",
        },
        paths: plan.paths,
        seed_files: plan.seedFiles,
        unseeded_files: plan.unseededFiles,
        scrubbed_files: [...scrub.scrubbed].sort(),
        recompressed_files: [...scrub.recompressed].sort(),
        unscrubbed_files: [...scrub.unscrubbed].sort(),
        dconf_groups: dconf.groups,
        files: [
            "README.md",
            ...generated.map((file) => file.path),
            ...copies.map((copy) => copy.path),
        ],
        limitations,
        tasks: admitted?.summaries ?? [],
        withheld_files: plan.withheld ?? [],
        consented_files: plan.consentedFiles ?? [],
    };
    let copyCompletion = undefined;
    let copyFailure;
    try {
        copyCompletion = await copy.write();
    }
    catch (cause) {
        copyFailure = { cause };
    }
    return {
        result,
        captureEvidenceId: evidence.evidence_id,
        completion,
        copyCompletion,
        copyFailure,
    };
};
/** Compose the already-published outputs after their complete Evidence exists. */
const publishedExportFailure = (request, evidence, { completion, copyCompletion, copyFailure, }, signal) => {
    const bundleFailure = desktopOutputFailure({ provider: DESKTOP_PROVIDER.id, operation: OPERATION, what: "bundle" }, request.directory, completion, evidence);
    const copyOutputFailure = copyCompletion === undefined
        ? undefined
        : desktopOutputFailure({
            provider: DESKTOP_PROVIDER.id,
            operation: OPERATION,
            what: "withheld copy",
        }, request.withheldCopy ?? "", copyCompletion, evidence);
    if (copyFailure !== undefined) {
        const failure = desktopOperationFailure(copyFailure.cause, signal, OPERATION, "Desktop export");
        if (completion.cancellation !== undefined)
            analysisErrorWithCancellation(failure, completion.cancellation);
        failure.retainPartialObservation(evidence);
        if (bundleFailure?.cleanupIncomplete !== true)
            return failure;
        if (copyFailure.cause instanceof AnalysisCancelledError)
            return analysisErrorWithCancellation(bundleFailure, copyFailure.cause);
        const cleanup = bundleFailure;
        const combined = new ProviderAdapterError(DESKTOP_PROVIDER.id, OPERATION, {
            cause: failure,
            cleanupPrimary: failure,
            partialObservation: evidence,
            userMessage: `The bundle was written to ${request.directory}, but the withheld copy failed and bundle handles could not be closed.`,
            cleanup: {
                reason: "Bundle output handles could not be closed.",
                resources: [request.directory],
            },
        });
        combined.retainSecondaryFailure(cleanup);
        combined.bindCleanupDependencies([cleanup, failure]);
        return combined;
    }
    const failures = [bundleFailure, copyOutputFailure].filter((failure) => failure !== undefined);
    if (failures.length === 0)
        return undefined;
    const cleanupFailures = failures.filter((failure) => !(failure instanceof AnalysisCancelledError));
    if (cleanupFailures.length === 0)
        return failures[0];
    for (const failure of failures)
        if (failure instanceof AnalysisCancelledError)
            analysisErrorWithCancellation(cleanupFailures[0], failure);
    if (cleanupFailures.length === 1)
        return cleanupFailures[0];
    const combined = new ProviderAdapterError(DESKTOP_PROVIDER.id, OPERATION, {
        userMessage: "The bundle and withheld copy were written, but their output handles could not be closed.",
        partialObservation: evidence,
        cleanup: {
            reason: "Output handles could not be closed.",
            resources: cleanupFailures.flatMap((failure) => failure.cleanupResources ?? []),
        },
    });
    for (const failure of cleanupFailures)
        combined.retainSecondaryFailure(failure);
    combined.bindCleanupDependencies(cleanupFailures);
    for (const cancellation of [
        completion.cancellation,
        copyCompletion?.cancellation,
    ])
        if (cancellation !== undefined)
            analysisErrorWithCancellation(combined, cancellation);
    return combined;
};
/** Export one capture folder as an agentenv computer app bundle, reported as Evidence. */
export const exportDesktopApplication = async (request, readers, signal) => {
    try {
        const { result, captureEvidenceId, completion, copyCompletion, copyFailure, } = await runExport(request, readers, signal);
        const evidence = createEvidence(unknownTarget("not-observed"), DESKTOP_PROVIDER, {
            predicateType: "rea.desktop-application-export",
            operation: OPERATION,
            parameters: {
                capture_evidence_id: captureEvidenceId,
                named: request.name !== undefined,
                tasks: request.tasks.length,
                task_ends: [...(request.taskEnds ?? [])],
                package_url: request.packageUrl !== undefined,
                download_install: request.downloadInstall !== undefined,
                extra_packages: [...(request.extraPackages ?? [])],
                seed_checkpoint: request.seedCheckpoint ?? null,
                end_checkpoint: request.endCheckpoint ?? null,
                synthetic_seed: request.syntheticSeed === true,
                withhold_from: request.withhold?.from ?? null,
                withhold_to: request.withhold?.to ?? null,
                withhold_paths: [...(request.withhold?.paths ?? [])],
                seed_withheld: request.seedWithheld === true,
                ...(request.viewPolicy === undefined
                    ? {}
                    : { view_policy: { ...request.viewPolicy } }),
            },
            result: {
                ...result,
                checkpoints: { ...result.checkpoints },
                paths: [...result.paths],
                seed_files: [...result.seed_files],
                unseeded_files: [...result.unseeded_files],
                scrubbed_files: [...result.scrubbed_files],
                recompressed_files: [...result.recompressed_files],
                unscrubbed_files: [...result.unscrubbed_files],
                files: [...result.files],
                limitations: [...result.limitations],
                withheld_files: result.withheld_files.map((file) => ({ ...file })),
                consented_files: [...result.consented_files],
            },
            confidence: "derived",
            authority: "analyst-inference",
            limitations: [...result.limitations],
        });
        return (publishedExportFailure(request, evidence, { completion, copyCompletion, copyFailure }, signal) ?? evidence);
    }
    catch (cause) {
        return desktopOperationFailure(cause, signal, OPERATION, "Desktop export");
    }
};
