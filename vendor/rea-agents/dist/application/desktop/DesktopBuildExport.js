import { Readable } from "node:stream";
import { z } from "zod";
import { READER_RUNNER_SLACK_S, readerTimeout, } from "../../domain/desktop/appTaskReaders.js";
import { BuildComputerLongRuns } from "../../desktop/BuildComputerLongRuns.js";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { cancelledBy, carriedReason } from "../../domain/analysisErrorCore.js";
import { counted } from "../../domain/desktop/appExportUnowned.js";
import { END_CHECKPOINT } from "../../domain/desktop/buildCapture.js";
import { SIGN_IN_END, SIGN_IN_START, } from "../../domain/desktop/appWithheld.js";
import { gzipInside, isUncheckedGzip, MAX_GUNZIPPED_BYTES, redactSecrets, redactSecretsInJson, secretsIn, } from "../../domain/desktop/buildSecrets.js";
import { jsonValueSchema } from "../../domain/jsonValue.js";
import { err, ok } from "../../domain/result.js";
import { AGENTENV_PROVIDER } from "../../desktop/AgentEnvProviderIdentity.js";
import { BUILD_REA_TIMEOUT_S, fetchHomeFolder, } from "../../desktop/BuildComputerController.js";
import { adapterError, ENDS, readOutput, refused, reportedFailure, runRea, WORK, } from "./DesktopBuildCommands.js";
import { planOutputTree, writeOutputTree, desktopOutputFailure, } from "./DesktopOutputTree.js";
import { errorMessage } from "../../kernel/errorMessage.js";
const EXPORT = "export_build_environment";
const exportResultSchema = z.looseObject({
    environment: z.string(),
    seed_files: z.array(z.string()),
    scrubbed_files: z.array(z.string()),
    // An export from before gzip seeds were listed apart has none.
    recompressed_files: z.array(z.string()).default([]),
    unscrubbed_files: z.array(z.string()),
    limitations: z.array(z.string()),
    tasks: z.array(jsonValueSchema),
    // An export from before withheld files were listed has none.
    withheld_files: z
        .array(z.looseObject({
        file: z.string(),
        variable: z.string(),
        handle: z.string(),
    }))
        .default([]),
    consented_files: z.array(z.string()).default([]),
});
/** Why a fetched file is held back: known secrets or an unchecked gzip. */
const heldBack = (file, guard) => {
    // A gzip file is decompressed once for the secret checks.
    const inner = guard.secrets.length === 0 ? undefined : gzipInside(file.bytes);
    return {
        handles: [
            ...new Set([
                ...secretsIn(Buffer.from(file.path), guard.secrets),
                ...secretsIn(file.bytes, guard.secrets, inner),
            ]),
        ],
        unchecked: guard.secrets.length > 0 && isUncheckedGzip(file.bytes, inner),
    };
};
/** The refusal of gzip files too large for REA to check for known secrets. */
const uncheckedRefusal = (holding, directory) => refused(EXPORT, `REA could not check inside ${counted(holding.map(({ path }) => path))}: each is a gzip file that expands past ${String(MAX_GUNZIPPED_BYTES / 1024 / 1024)} MiB, the most REA decompresses to look for known secrets, so REA wrote none of the bundle to ${directory}.`, "Keep each such file out of the seed: delete it in the app before marking seed, or capture again on a new build computer without it, then export again.");
/** The refusal of a bundle whose files hold secrets: each secret's handle and the files, the values in their names redacted. */
const secretsRefusal = (holding, secrets, directory) => {
    const handles = [...new Set(holding.flatMap(({ handles: found }) => found))];
    const found = secrets.filter(({ handle }) => handles.includes(handle));
    return refused(EXPORT, `The bundle holds the secret ${handles.join(", ")} in ${counted(holding.map(({ path }) => redactSecrets(path, found)))}, so REA wrote none of it to ${directory}: no bundle may hold a secret.`, "Keep the secret out of the seed: delete the file that holds it in the app before marking seed, or capture again on a new build computer without it, then export again.");
};
/**
 * Bring the bundle back straight into the caller's new or empty folder, each
 * checked answer written before the next is fetched; a failure leaves no
 * partial folder.
 */
const writeBundle = async (computer, bundle, { directory, guard, }, signal) => {
    let fetched = { files: 0, bytes: 0 };
    const holding = [];
    const completion = await writeOutputTree(await planOutputTree(directory, { operation: EXPORT, field: "directory" }), async (tree) => {
        fetched = await fetchHomeFolder(computer, bundle, {
            file: async (file) => {
                // Keep back known secrets and files REA could not check.
                const held = heldBack(file, guard);
                if (held.handles.length > 0 || held.unchecked) {
                    holding.push({ path: file.path, ...held });
                    return;
                }
                await tree.write(file.path, Readable.from([file.bytes]), { bytes: file.bytes.length, sha256: file.sha256 }, signal);
            },
        }, signal);
        const secret = holding.filter(({ handles }) => handles.length > 0);
        if (secret.length > 0)
            throw secretsRefusal(secret, guard.secrets, directory);
        const unchecked = holding.filter((held) => held.unchecked);
        if (unchecked.length > 0)
            throw uncheckedRefusal(unchecked, directory);
    }, { operation: EXPORT, field: "directory" }, signal);
    return { ...fetched, completion };
};
/** The export's arguments past the capture and the bundle: the tasks and each one's end, the ends, the install, and withheld state with its consents. */
const exportArguments = (capture, request, files) => [
    ...files.tasks.flatMap((path) => ["--task", path]),
    ...request.tasks.flatMap(({ task, end_checkpoint: end }) => [
        "--task-end",
        `${task.name}=${end ?? END_CHECKPOINT}`,
    ]),
    ...ENDS,
    // The building agent made the seed in this computer for the task.
    "--synthetic-seed",
    "--screens",
    `${capture.folder}/screens`,
    ...(request.name === undefined ? [] : ["--name", request.name]),
    ...(capture.packageUrl === undefined
        ? []
        : ["--package-url", capture.packageUrl]),
    ...(capture.downloadInstall === undefined
        ? []
        : ["--download-install", files.download]),
    ...capture.extraPackages.flatMap((name) => ["--extra-package", name]),
    ...(capture.signIn
        ? ["--withhold-from", SIGN_IN_START, "--withhold-to", SIGN_IN_END]
        : []),
    ...(request.withhold ?? []).flatMap((path) => ["--withhold-path", path]),
    ...(capture.consents.length === 0 ? [] : ["--consent", files.consent]),
    ...(request.seed_sign_in === true ? ["--seed-withheld"] : []),
    "--withheld-copy",
    files.withheld,
    "--json",
];
/** The consent records as `consent.json` holds them. */
const consentFile = (consents) => `${JSON.stringify({ consents }, null, 2)}\n`;
/** Keep each withheld file's bytes as a secret, fetched from beside the bundle, reported by the handle that keeps it; none leaves REA otherwise. */
const keepWithheld = async (computer, folder, files, { keep, signal, completed, }) => {
    if (files.length === 0)
        return [];
    const handles = new Map(files.map((entry) => [entry.file, entry]));
    const kept = new Map();
    await fetchHomeFolder(computer, folder, {
        file: async ({ path, bytes }) => {
            const report = handles.get(path);
            if (report !== undefined) {
                const actual = await keep(report.handle, bytes);
                kept.set(path, actual);
                completed.push({ ...report, handle: actual });
            }
        },
    }, signal);
    if (kept.size !== handles.size)
        throw new Error("The exported bundle did not supply every withheld file.");
    return files.map(({ file, variable, handle }) => ({
        file,
        variable,
        handle: kept.get(file) ?? handle,
    }));
};
/**
 * Export a stopped capture in the computer with the agent's tasks, seeded at
 * `seed` and each checked at its own end, `end` by default, into a new
 * folder of the work folder, then bring the bundle back and write it into
 * the caller's folder. A task the export refuses is refused with the
 * export's own reason.
 */
export const exportBuild = async (computer, capture, request, signal, longRuns = new BuildComputerLongRuns(computer)) => {
    const { folder } = capture;
    const attempt = String(capture.attempt);
    const bundle = `${folder}/bundle-${attempt}`;
    const taskFiles = Object.fromEntries(request.tasks.map(({ task }, index) => [
        `${folder}/task-${attempt}-${String(index + 1)}.json`,
        `${JSON.stringify(task, null, 2)}\n`,
    ]));
    const consent = `${folder}/consent-${attempt}.json`;
    const withheld = `${bundle}-withheld`;
    const stdout = `${folder}/export-${attempt}.json`;
    const downloadPath = `${folder}/download-install-${attempt}.json`;
    const download = capture.downloadInstall;
    const completed = [];
    let published;
    try {
        // Admit the host folder by the rule the bundle is written under before
        // running anything in the computer, so an unusable folder is refused
        // before the in-computer export runs rather than when its bundle returns.
        await planOutputTree(request.directory, {
            operation: EXPORT,
            field: "directory",
        });
        const argv = [
            "export-desktop-application",
            `${folder}/capture`,
            bundle,
            ...exportArguments(capture, request, {
                tasks: Object.keys(taskFiles),
                consent,
                withheld,
                download: downloadPath,
            }),
        ];
        // Each task's readers run at its end and the seed, and at its near miss when the capture took one.
        const timeoutS = BUILD_REA_TIMEOUT_S +
            request.tasks.reduce((total, { task }) => total +
                (capture.checkpoints?.has(`near-${task.name}`) === true ? 3 : 2) *
                    (task.readers ?? []).reduce((sum, reader) => sum + readerTimeout(reader) + READER_RUNNER_SLACK_S, 0), 0);
        const options = {
            stdout,
            files: {
                ...taskFiles,
                ...(download === undefined
                    ? {}
                    : { [downloadPath]: `${JSON.stringify(download, null, 2)}\n` }),
                ...(capture.consents.length === 0
                    ? {}
                    : { [consent]: consentFile(capture.consents) }),
            },
            timeoutS,
            signal,
        };
        const { stdoutBytes: bytes } = timeoutS + 60 <= 3600
            ? await runRea(computer, argv, options)
            : await longRuns.run(argv, { ...options, work: WORK });
        const output = await readOutput(computer, stdout, bytes, signal);
        if (output.kind === "failure")
            return err(output.failure.code === "invalid_request"
                ? refused(EXPORT, output.failure.message, output.failure.remediation?.action ??
                    "Rewrite the task and export again.")
                : reportedFailure(EXPORT, output));
        const result = exportResultSchema.parse(output.result);
        const written = await writeBundle(computer, bundle, {
            directory: request.directory,
            guard: {
                secrets: capture.secrets,
            },
        }, signal);
        published = {
            directory: request.directory,
            environment: result.environment,
            files: written.files,
            bytes: written.bytes,
        };
        const outputFailure = desktopOutputFailure({ provider: AGENTENV_PROVIDER, operation: EXPORT, what: "bundle" }, request.directory, written.completion);
        if (outputFailure !== undefined)
            throw outputFailure;
        const kept = await keepWithheld(computer, withheld, result.withheld_files, {
            keep: capture.keep,
            signal,
            completed,
        });
        return ok({
            directory: request.directory,
            environment: result.environment,
            files: written.files,
            bytes: written.bytes,
            tasks: result.tasks,
            seed_files: result.seed_files,
            scrubbed_files: result.scrubbed_files,
            recompressed_files: result.recompressed_files,
            unscrubbed_files: result.unscrubbed_files,
            limitations: result.limitations,
            withheld_files: kept,
            consented_files: result.consented_files,
        });
    }
    catch (cause) {
        const failure = cause instanceof AnalysisError
            ? cause
            : signal.aborted && cause === signal.reason
                ? cancelledBy(EXPORT, carriedReason(cause))
                : adapterError(EXPORT, redactSecrets(errorMessage(cause), capture.secrets), cause);
        if (published !== undefined)
            failure.retainDiagnostics({
                published_bundle: redactSecretsInJson({ ...published, withheld_files: completed }, capture.secrets),
            });
        return err(failure);
    }
};
