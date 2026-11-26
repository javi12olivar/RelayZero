import { z } from "zod";
import { END_CHECKPOINT, SEED_CHECKPOINT, } from "../../domain/desktop/buildCapture.js";
import { installsFromPackageFile } from "../../domain/desktop/appExportInstall.js";
import { SIGN_IN_END, SIGN_IN_START, } from "../../domain/desktop/appWithheld.js";
import { draftNoteSchema } from "../../domain/desktop/appTaskDraftNotes.js";
import { draftValueSchema } from "../../domain/desktop/appTaskDraftValues.js";
import { desktopApplicationCaptureSchema } from "../../domain/desktop/desktopCapture.js";
import { jsonObjectSchema, jsonValueSchema, } from "../../domain/jsonValue.js";
import { err, ok } from "../../domain/result.js";
import { readOutput, reportedFailure, runRea } from "./DesktopBuildCommands.js";
const STOP = "stop_build_capture";
const draftResultSchema = z.looseObject({
    files: z.array(z.looseObject({
        file: z.string(),
        role: z.string(),
        change: jsonValueSchema,
        values: z.array(draftValueSchema).default([]),
        values_cut: z.boolean().default(false),
    })),
    task: z.looseObject({
        name: z.string(),
        prompt: z.string(),
        checks: z.array(jsonObjectSchema),
    }),
    guards: z.array(jsonObjectSchema).default([]),
    notes: z.array(draftNoteSchema).default([]),
    // A draft from before withheld files were left out lists none.
    withheld_files: z.array(z.string()).default([]),
});
/** A value without the optional fields the draft left out. */
const draftValue = ({ pointer, kind, before, after, note, refers_to, alternatives, }) => ({
    pointer,
    kind,
    before,
    after,
    ...(note === undefined ? {} : { note }),
    ...(refers_to === undefined
        ? {}
        : {
            refers_to: refers_to.map(({ attribute, value, element }) => ({
                ...(attribute === undefined ? {} : { attribute }),
                value,
                element,
            })),
        }),
    ...(alternatives === undefined ? {} : { alternatives }),
});
/** A note without the optional fields the draft left out. */
const draftNote = ({ code, message, file, files, more, elements, pointers, error, }) => ({
    code,
    message,
    ...(file === undefined ? {} : { file }),
    ...(files === undefined
        ? {}
        : { files: files.map(({ file: home, role }) => ({ file: home, role })) }),
    ...(more === undefined ? {} : { more }),
    ...(elements === undefined ? {} : { elements }),
    ...(pointers === undefined ? {} : { pointers }),
    ...(error === undefined ? {} : { error }),
});
/** One draft withheld because this server has used a declared secret. */
const withheldDraft = {
    draft: null,
    draft_refusal: "Automatic task drafting is unavailable after this server used a declared secret. The capture remains available; write the task manually and export it.",
};
/** A draft cannot safely be handed off after this server has used a secret: neither the first task's nor a later one's. */
export const secretDraftRefusal = { ...withheldDraft, later_drafts: [] };
/** The task draft between two checkpoints, or why there is none; none once this server has used a declared secret. */
const draftBetween = async (computer, folder, ends, hasDeclaredSecret, signal) => {
    if (hasDeclaredSecret())
        return withheldDraft;
    const stdout = `${folder}/${ends.file}`;
    const withheld = Symbol("secret draft withheld");
    let bytes;
    try {
        const result = await runRea({
            exec: (argv, timeout, requestSignal) => {
                if (hasDeclaredSecret())
                    return Promise.reject(withheld);
                return computer.exec(argv, timeout, requestSignal);
            },
            homeFiles: computer.homeFiles.bind(computer),
            redacted: computer.redacted.bind(computer),
        }, [
            "describe-desktop-application-task",
            `${folder}/capture`,
            "--seed-checkpoint",
            ends.from,
            "--end-checkpoint",
            ends.to,
            ...(ends.signIn
                ? ["--withhold-from", SIGN_IN_START, "--withhold-to", SIGN_IN_END]
                : []),
            "--json",
        ], { stdout, signal });
        bytes = result.stdoutBytes;
    }
    catch (cause) {
        if (cause === withheld)
            return withheldDraft;
        if (hasDeclaredSecret() && !signal.aborted)
            return withheldDraft;
        throw cause;
    }
    if (hasDeclaredSecret())
        return withheldDraft;
    const output = await readOutput(computer, stdout, bytes, signal);
    if (hasDeclaredSecret())
        return withheldDraft;
    if (output.kind === "failure")
        return { draft: null, draft_refusal: output.failure.message };
    const draft = draftResultSchema.parse(output.result);
    return {
        draft: {
            seed_checkpoint: ends.from,
            end_checkpoint: ends.to,
            files: draft.files.map(({ file, role, change, values, values_cut }) => ({
                file,
                role,
                change,
                values: values.map(draftValue),
                values_cut,
            })),
            task: {
                name: draft.task.name,
                prompt: draft.task.prompt,
                checks: draft.task.checks,
            },
            guards: draft.guards,
            notes: draft.notes.map(draftNote),
            withheld_files: draft.withheld_files,
        },
    };
};
/** Whether a checkpoint ends a later task: `end-<name>`. */
const endsLaterTask = (name) => name.startsWith(`${END_CHECKPOINT}-`);
/**
 * The draft between `seed` and `end`, or why there is none, and one draft
 * per later task's end checkpoint taken after `end`, each from the end
 * checkpoint before it, so it shows only that task's change; none once this
 * server has used a declared secret.
 */
const draftTasks = async (computer, folder, checkpoints, hasDeclaredSecret, signal) => {
    if (hasDeclaredSecret())
        return secretDraftRefusal;
    const signIn = checkpoints.includes(SIGN_IN_START) && checkpoints.includes(SIGN_IN_END);
    const missing = [SEED_CHECKPOINT, END_CHECKPOINT].filter((name) => !checkpoints.includes(name));
    if (missing.length > 0)
        return {
            draft: null,
            draft_refusal: `No draft: the capture has no ${missing.join(" or ")} checkpoint; capture again and mark ${SEED_CHECKPOINT} once the seed is saved and ${END_CHECKPOINT} once the edit is.`,
            later_drafts: [],
        };
    const first = await draftBetween(computer, folder, { from: SEED_CHECKPOINT, to: END_CHECKPOINT, file: "draft.json", signIn }, hasDeclaredSecret, signal);
    const later = [];
    let from = END_CHECKPOINT;
    for (const name of checkpoints.slice(checkpoints.indexOf(END_CHECKPOINT))) {
        if (!endsLaterTask(name))
            continue;
        later.push({
            end_checkpoint: name,
            ...(await draftBetween(computer, folder, {
                from,
                to: name,
                file: `draft-${String(later.length + 2)}.json`,
                signIn,
            }, hasDeclaredSecret, signal)),
        });
        from = name;
    }
    return { ...first, later_drafts: later };
};
/**
 * What a capture that has exited recorded, read from its own Evidence: the
 * checkpoints it holds, which the draft and the export trust over the
 * acknowledgements REA happened to receive, whether the export installs the
 * app from its package file, and the stop's summary with the draft between
 * `seed` and `end`. A capture that reported a failure is one.
 */
export const summarizeCapture = async (computer, capture, hasDeclaredSecret, signal) => {
    const output = await readOutput(computer, `${capture.folder}/capture.out`, capture.outputBytes, signal);
    if (output.kind === "failure")
        return err(reportedFailure(STOP, output, "The capture failed: "));
    const recorded = desktopApplicationCaptureSchema.parse(output.result);
    const checkpoints = new Set(recorded.state.checkpoints.map((checkpoint) => checkpoint.name));
    const { package: installed } = recorded.application;
    return ok({
        checkpoints,
        packageFile: installsFromPackageFile(installed, recorded.host.architecture),
        stopped: {
            end_reason: recorded.session.end_reason,
            checkpoints: recorded.state.checkpoints.map((checkpoint) => ({
                name: checkpoint.name,
                trigger: checkpoint.trigger,
                changes: checkpoint.changes.length,
                retained_files: checkpoint.retained.length,
            })),
            package: {
                kind: installed.kind,
                name: installed.name,
                version: installed.version,
                sources: [...installed.sources],
            },
            limitations: [...recorded.limitations],
            ...(await draftTasks(computer, capture.folder, recorded.state.checkpoints.map((checkpoint) => checkpoint.name), hasDeclaredSecret, signal)),
        },
    });
};
