import { unknownTarget } from "../../domain/targetIdentity.js";
import { join } from "node:path";
import { Readable } from "node:stream";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { isScreenTask } from "../../domain/desktop/appTaskScreen.js";
import { createEvidence } from "../../domain/evidence.js";
import { ProviderAdapterError } from "../../domain/providerAdapterError.js";
import { AGENTENV_PROVIDER } from "../../desktop/AgentEnvProviderIdentity.js";
import { LOGGED_ACTIONS, LOGGED_BYTES, LOGGED_LIST_ITEMS, LOGGED_TEXT_BYTES, } from "./DesktopBuildActionLog.js";
import { DESKTOP_PROVIDER } from "./DesktopCaptureRefusals.js";
import { planOutputTree, writeOutputTree, desktopOutputFailure, } from "./DesktopOutputTree.js";
import { errorMessage } from "../../kernel/errorMessage.js";
import { sha256Hex } from "../../kernel/sha256Hex.js";
const CHECK = "check_build_task";
const RECORD = "witness.json";
/**
 * End the recording and bring its segments back. A failure before the
 * manifest leaves nothing to resume; a failure after it keeps the manifest
 * so the next try only fetches the segments.
 */
const fetchRecording = async (computer, recordingId, pending, signal) => {
    let manifest = pending;
    try {
        manifest ??= await computer.endRecording(recordingId, signal);
    }
    catch (cause) {
        return { ok: false, error: errorMessage(cause) };
    }
    try {
        const segments = await computer.recordingSegments(manifest, signal);
        return {
            ok: true,
            segments,
            recording: {
                recording_id: manifest.recording_id,
                segments: segments.map((segment) => ({
                    path: join("recording", segment.path.split("/").at(-1) ?? segment.path),
                    bytes: segment.bytes.length,
                    sha256: sha256Hex(segment.bytes),
                })),
            },
        };
    }
    catch (cause) {
        return { ok: false, error: errorMessage(cause), manifest };
    }
};
/** Write the recording's segments and the record's Evidence into the witness folder. */
const writeRecordFolder = async (directory, files, evidence, signal) => {
    try {
        const completion = await writeOutputTree(await planOutputTree(directory, { operation: CHECK, field: "directory" }), async (tree) => {
            for (const file of files)
                await tree.write(file.path, Readable.from([file.bytes]), { bytes: file.bytes.length, sha256: sha256Hex(file.bytes) }, signal);
        }, { operation: CHECK, field: "directory" }, signal);
        const error = desktopOutputFailure({ provider: AGENTENV_PROVIDER, operation: CHECK, what: "witness record" }, directory, completion, evidence);
        const release = completion.release;
        return error === undefined
            ? undefined
            : {
                published: true,
                error,
                release: release === undefined ? undefined : () => release.lease.release(),
            };
    }
    catch (cause) {
        return {
            published: false,
            error: cause instanceof AnalysisError
                ? cause
                : new ProviderAdapterError(AGENTENV_PROVIDER, CHECK, {
                    userMessage: `The witness record could not be written: ${errorMessage(cause)}`,
                    cause,
                    partialObservation: evidence,
                }),
        };
    }
};
/** What the record's action log leaves out: its earliest actions, and parts of long arguments. */
const logLimitations = (actions, dropped) => [
    ...(dropped === 0
        ? []
        : [
            `The action log keeps the latest ${String(LOGGED_ACTIONS)} actions within ${String(LOGGED_BYTES / 1024)} KiB, so the ${String(dropped)} earliest are not in the record; the stages' rules counted them.`,
        ]),
    ...(actions.some((action) => action.truncated_arguments !== undefined)
        ? [
            `Arguments named in an action's truncated_arguments are cut in the record, each string to ${String(LOGGED_TEXT_BYTES)} bytes and each list to ${String(LOGGED_LIST_ITEMS)} items; the computer received them whole.`,
        ]
        : []),
];
/** Which stages graded files that had not settled by the bound, and which of them had a read cut there. */
const unsettledLimitation = (stages) => {
    const named = (cut) => stages.flatMap(({ stage, settled, read_cut }) => settled || (cut && !read_cut) ? [] : [stage]);
    const [unsettled, cut] = [named(false), named(true)];
    return [
        ...(unsettled.length === 0
            ? []
            : [
                `The app's files had not held for the settle window by its bound when these stages were checked, so each graded its last completed read, with settled false: ${unsettled.join(", ")}.`,
            ]),
        ...(cut.length === 0
            ? []
            : [
                `A read still running at the settle bound was cut, with read_cut true, in: ${cut.join(", ")}.`,
            ]),
    ];
};
/** How the witness reached its check results, by the kind of task. */
const howChecked = (task) => {
    if (isScreenTask(task))
        return "Checks took a screenshot of the computer and ran the bundle's own verifier as its judge, with the agentenv runner's Python and model endpoint, three votes a question; the judge sent each screenshot and the build's two examples to that model.";
    return task.readers === undefined
        ? "Checks read the app's data/get views with REA's evaluator, as the exported verifier does; the verifier itself did not run."
        : "Checks read the app's data/get views and the task's readers' views, the readers run in the computer through computer-exec/v1, with REA's evaluator, as the exported verifier does; the verifier itself did not run.";
};
/**
 * End the witness's recording, fetch it, and write the segments and
 * `witness.json`, the record as Evidence, into the witness folder. A
 * recording that has not been fetched is not written, so the next try can
 * resume it. A published folder whose handles fail to close is returned with
 * the record and the cleanup to retry.
 */
export const writeWitnessRecord = async (computer, witness, log, { signal, redact = (value) => value, pendingManifest, }) => {
    const actions = log.entries.map(({ truncated_arguments: cut, ...entry }) => cut === undefined ? entry : { ...entry, truncated_arguments: [...cut] });
    const dropped = log.dropped;
    const fetched = await fetchRecording(computer, witness.recordingId, pendingManifest, signal);
    if (!fetched.ok)
        return {
            kind: "retry",
            ...(fetched.manifest === undefined ? {} : { manifest: fetched.manifest }),
            error: new ProviderAdapterError(AGENTENV_PROVIDER, CHECK, {
                userMessage: `The witness recording could not be saved: ${fetched.error}. Check this stage again to retry it.`,
                cause: new Error(fetched.error),
            }),
        };
    const { recording, segments } = fetched;
    const failed = witness.stages.find((stage) => !stage.held);
    const recorded = {
        verdict: failed === undefined ? "held" : "failed",
        failed_stage: failed?.stage ?? null,
        task: { name: witness.task.name, sha256: witness.digest },
        stages: witness.stages,
        actions,
        actions_dropped: dropped,
        recording,
    };
    // Redacting keeps every string a string, so the record keeps its shape.
    const result = redact(recorded);
    const evidence = createEvidence(unknownTarget("not-observed"), DESKTOP_PROVIDER, {
        predicateType: "rea.desktop-build-witness",
        operation: CHECK,
        parameters: { task: result.task.name, stages: witness.stages.length },
        result: result,
        confidence: "observed",
        authority: "controlled-replay",
        limitations: [
            howChecked(witness.task),
            ...("error" in recording
                ? [`The recording is missing: ${recording.error}`]
                : []),
            ...logLimitations(actions, dropped),
            ...unsettledLimitation(result.stages),
        ],
    });
    const files = [
        ...("segments" in recording
            ? recording.segments.flatMap((target, index) => {
                const bytes = segments[index]?.bytes;
                return bytes === undefined ? [] : [{ path: target.path, bytes }];
            })
            : []),
        {
            path: RECORD,
            bytes: Buffer.from(`${JSON.stringify(evidence, null, 2)}\n`),
        },
    ];
    const unwritten = await writeRecordFolder(witness.directory, files, evidence, signal);
    const record = {
        path: join(witness.directory, RECORD),
        evidence_id: evidence.evidence_id,
        ...result,
    };
    if (unwritten === undefined)
        return { kind: "saved", record };
    if (unwritten.published)
        return {
            kind: "published",
            record,
            error: unwritten.error,
            release: unwritten.release,
        };
    return { kind: "retry", error: unwritten.error };
};
