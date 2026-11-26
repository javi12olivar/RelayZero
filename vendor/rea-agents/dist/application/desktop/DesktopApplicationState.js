import { unknownTarget } from "../../domain/targetIdentity.js";
import { desktopViewPolicy, desktopViewPolicyInputSchema, } from "../../domain/desktop/desktopViewPolicy.js";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ArtifactResourceScope, artifactPrimaryCleanupLeases, } from "../../resources/index.js";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { AnalysisInputError, cancelledBy, carriedReason, isAborted, } from "../../domain/analysisErrorCore.js";
import { analysisErrorWithCancellation } from "../../domain/analysisErrorCancellation.js";
import { analysisErrorWithCleanupDependencies } from "../../domain/analysisErrorCleanup.js";
import { analysisInputErrorFromIssues } from "../../domain/inputIssueProjection.js";
import { desktopApplicationCaptureSchema, } from "../../domain/desktop/desktopCapture.js";
import { openStateDocument } from "../../domain/desktop/gzipDocument.js";
import { diffStateViews } from "../../domain/desktop/stateChanges.js";
import { keyfileView, plainRecord, SQLITE_SIDECARS, textualView, } from "../../domain/desktop/stateFormats.js";
import { applicationNames, isApplicationDconfGroup, roleFacts, selectedHomePath, stateReasons, stateRole, } from "../../domain/desktop/stateRoles.js";
import { createEvidence } from "../../domain/evidence.js";
import { safeParseEvidence, unsupportedEvidenceFormatError, } from "../../domain/evidenceValidation.js";
import { isUnsupportedEvidenceFormat } from "../../domain/evidenceFormat.js";
import { err, ok } from "../../domain/result.js";
import { describeValidationFailure } from "../../domain/validationFailure.js";
import { PrivateRuntimeRoot } from "../../process/PrivateRuntimeRoot.js";
import { readJsonFile } from "../JsonFiles.js";
import { readZipView } from "./DesktopZipView.js";
import { withRetainedContent, } from "./DesktopRetainedContent.js";
import { indexState, observedFileAt, pathVersions, statePaths, } from "./DesktopStateVersions.js";
import { DESKTOP_OPERATION, DESKTOP_PROVIDER, desktopOperationFailure, } from "./DesktopCaptureRefusals.js";
import { isRecord } from "../../kernel/isRecord.js";
const OPERATION = "inspect_desktop_application_state";
const inputError = (userMessage, remediationAction) => new AnalysisInputError(OPERATION, { userMessage, remediationAction }, [
    { path: ["capture"], reason: "invalid_value", message: userMessage },
]);
/** Admit `capture.json` only as complete desktop capture Evidence. */
export const readDesktopCapture = async (folder, signal) => {
    const resources = new ArtifactResourceScope();
    const outcome = await resources
        .run(async () => {
        const loaded = await readJsonFile(join(folder, "capture.json"), signal, resources, OPERATION);
        if (!loaded.ok) {
            if (loaded.error instanceof AnalysisError)
                throw loaded.error;
            throw inputError(`${join(folder, "capture.json")} could not be read as JSON.`, "Pass a folder written by capture-desktop-application.");
        }
        const evidence = safeParseEvidence(loaded.value);
        // A capture from another format revision is refused with the recreate
        // guidance, not reported as some other kind of file.
        if (!evidence.ok && isUnsupportedEvidenceFormat(evidence.error))
            throw unsupportedEvidenceFormatError(evidence.error);
        if (!evidence.ok ||
            evidence.value.operation !== DESKTOP_OPERATION ||
            evidence.value.predicate_type !== "rea.desktop-application-capture" ||
            evidence.value.provider.id !== DESKTOP_PROVIDER.id ||
            evidence.value.provider.version !== DESKTOP_PROVIDER.version)
            throw inputError("capture.json is not desktop application capture Evidence.", "Pass a folder written by capture-desktop-application.");
        const capture = desktopApplicationCaptureSchema.safeParse(evidence.value.normalized_result);
        if (!capture.success)
            throw inputError(`The capture result is malformed (${describeValidationFailure(capture.error)}).`, "Capture the application again.");
        return { evidence: evidence.value, capture: capture.data };
    })
        .then(ok, (cause) => err(cause));
    try {
        await resources.close();
    }
    catch (cause) {
        const cleanup = desktopOperationFailure(cause, signal, OPERATION, "Desktop capture input");
        if (outcome.ok && !isAborted(signal))
            throw cleanup.retainPartialObservation(outcome.value.evidence);
        const primary = outcome.ok
            ? cancelledBy(OPERATION, 
            // A completed outcome reaches here only after the caller aborted.
            carriedReason(signal?.reason)).retainPartialObservation(outcome.value.evidence)
            : desktopOperationFailure(outcome.error, undefined, OPERATION, "Desktop capture input");
        if (!outcome.ok && signal?.aborted)
            analysisErrorWithCancellation(primary, cancelledBy(OPERATION, signal));
        throw analysisErrorWithCleanupDependencies(primary, cleanup, OPERATION);
    }
    if (!outcome.ok) {
        if (!signal?.aborted)
            throw outcome.error;
        throw analysisErrorWithCancellation(desktopOperationFailure(outcome.error, undefined, OPERATION, "Desktop capture input"), cancelledBy(OPERATION, signal));
    }
    if (signal?.aborted)
        throw cancelledBy(OPERATION, signal).retainPartialObservation(outcome.value.evidence);
    return outcome.value;
};
const dconfGroups = (text, names) => {
    const groups = keyfileView(text);
    const application = plainRecord();
    const others = [];
    for (const [group, keys] of Object.entries(groups))
        if (isApplicationDconfGroup(group, names))
            application[group] = keys;
        else
            others.push(group);
    return { groups: application, other_groups: others };
};
/**
 * Run a reader on verified bytes written to a private directory. A failed
 * removal keeps the directory's owner and is reported with the read's outcome.
 */
const withStaged = async (files, read, resources = new ArtifactResourceScope()) => {
    const root = await PrivateRuntimeRoot.create({
        prefix: "rea-desktop-state-",
    });
    let outcome;
    try {
        const paths = [];
        for (const file of files) {
            const path = join(root.path, file.name);
            await writeFile(path, file.bytes, { mode: 0o600, flag: "wx" });
            paths.push(path);
        }
        outcome = { kind: "completed", value: await read(paths) };
    }
    catch (cause) {
        outcome = { kind: "failed", cause };
    }
    const leases = outcome.kind === "failed"
        ? artifactPrimaryCleanupLeases(outcome.cause)
        : [];
    const removed = await resources.release({
        kind: "private-runtime-root",
        resource: root.path,
        root: {
            path: root.path,
            close: async () => {
                // Descriptor retirement precedes removal. Keep this dependency with the
                // staged owner so a command close retries both, in the same order.
                for (const lease of leases ?? [])
                    await lease.release();
                await root.close();
            },
        },
    });
    if (removed.kind === "failed")
        throw resources.cleanupFailure(outcome, [removed]);
    if (outcome.kind === "failed")
        throw outcome.cause;
    return outcome.value;
};
const failed = (error) => ({
    view: null,
    error,
    failure: null,
});
const dconfViewFailure = (dump) => ({
    kind: dump.kind,
    code: dump.code,
    exit_code: dump.exitCode,
    command: dump.command,
    stderr: dump.stderr,
});
/**
 * A sidecar's verified bytes to stage beside the database, or why the
 * database cannot be read: reading it without a sidecar it had could hide or
 * misstate committed rows.
 */
const sidecarBytes = async ({ path, version }, sidecar, context) => {
    const { present, sha256 } = observedFileAt(`${path}${sidecar.suffix}`, version.checkpoint_index, context.index);
    if (present === null)
        return err(`the capture did not record whether the database's ${sidecar.label} existed`);
    if (present && sha256 === null)
        return err(`the database's ${sidecar.label} was not retained`);
    if (sha256 === null)
        return ok(undefined);
    const bytes = await context.content.read(sha256, context.signal);
    return bytes.ok
        ? ok(bytes.value)
        : err(`the database's ${sidecar.label} ${bytes.error}`);
};
const sqliteView = async (input, context) => {
    const database = observedFileAt(input.path, input.version.checkpoint_index, context.index);
    if (database.present !== true || database.sha256 !== input.version.sha256)
        return failed("the capture did not confirm the database's retained version at this checkpoint");
    // The SQLite reader accepts an inactive rollback journal and refuses a hot one.
    const staged = [{ name: "state.db", bytes: input.bytes }];
    for (const sidecar of SQLITE_SIDECARS) {
        const bytes = await sidecarBytes(input, sidecar, context);
        if (!bytes.ok)
            return failed(bytes.error);
        if (bytes.value !== undefined)
            staged.push({ name: `state.db${sidecar.suffix}`, bytes: bytes.value });
    }
    return withStaged(staged, async ([database]) => {
        const read = await context.readers.sqlite(database ?? "", context.signal, context.policy);
        return read.ok ? { view: read.view, error: null } : failed(read.error);
    }, context.readers.resources);
};
const dconfView = async ({ bytes }, context) => withStaged([{ name: "user", bytes }], async ([database]) => {
    const dump = await context.readers.dconf(database ?? "", context.signal);
    return dump.ok
        ? { view: dconfGroups(dump.text, context.names), error: null }
        : {
            view: null,
            error: dump.error,
            failure: dconfViewFailure(dump),
        };
}, context.readers.resources);
/** A reader's result as a version's view or view_error. */
const outcomeOf = (read) => read.ok ? { view: read.value, error: null } : failed(read.error);
/** Read one retained version into JSON for its own format. */
const viewOf = async (input, context) => {
    const format = input.version.format ?? "binary";
    switch (format) {
        case "text":
        case "json":
        case "keyfile":
        case "xml":
            return outcomeOf(textualView(format, input.bytes, context.policy));
        case "zip":
            return outcomeOf(await readZipView(input.bytes, context.signal, context.policy));
        case "dconf":
            return dconfView(input, context);
        case "sqlite":
            return sqliteView(input, context);
        case "binary":
            return { view: null, error: null };
    }
};
const EMPTY_CHANGE = {
    added: [],
    removed: [],
    changed: [],
    added_count: 0,
    removed_count: 0,
    changed_count: 0,
    complete: true,
};
const changeBetween = (before, after) => {
    const ends = {
        from_index: before.checkpoint_index,
        to_index: after.checkpoint_index,
        from: before.checkpoint,
        to: after.checkpoint,
    };
    if (!before.present)
        return { ...ends, kind: "created", ...EMPTY_CHANGE };
    if (!after.present)
        return { ...ends, kind: "deleted", ...EMPTY_CHANGE };
    if (before.view_error !== null ||
        after.view_error !== null ||
        before.format === null ||
        after.format === null)
        return { ...ends, kind: "unreadable", ...EMPTY_CHANGE };
    if (before.format !== after.format)
        return { ...ends, kind: "format", ...EMPTY_CHANGE };
    if (before.format === "binary")
        return { ...ends, kind: "content", ...EMPTY_CHANGE };
    const difference = diffStateViews(before.format, before.view, after.view);
    return {
        ...ends,
        ...difference,
        added: [...difference.added],
        removed: [...difference.removed],
        changed: [...difference.changed],
    };
};
const readVersion = async (version, path, context) => {
    if (context.signal?.aborted === true)
        throw cancelledBy(OPERATION, context.signal);
    if (!version.present)
        return;
    if (version.sha256 === null) {
        version.view_error = "content not retained";
        return;
    }
    const bytes = await context.content.read(version.sha256, context.signal);
    if (!bytes.ok) {
        version.view_error = `retained content ${bytes.error}`;
        return;
    }
    const document = openStateDocument(path, bytes.value, context.policy);
    version.format = document.format;
    if (document.compression !== undefined)
        version.compression = document.compression;
    const outcome = "error" in document
        ? failed(document.error)
        : await viewOf({ path, bytes: document.bytes, version }, context);
    version.view = outcome.view;
    version.view_error = outcome.error;
    if (outcome.error !== null && outcome.failure !== null)
        version.view_failure = outcome.failure;
};
const hasDconfGroups = (version) => {
    const view = version.view;
    return (version.format === "dconf" &&
        isRecord(view) &&
        typeof view.groups === "object" &&
        view.groups !== null &&
        Object.keys(view.groups).length > 0);
};
/** Read every version of one path and derive its role and changes. */
const describePath = async (capture, path, facts, context) => {
    const versions = pathVersions(capture, path, context.index);
    for (const version of versions)
        await readVersion(version, path, context);
    const reasons = [
        ...stateReasons(facts, path, (context.index.changes.get(path) ?? []).map((entry) => entry.change), versions.some(hasDconfGroups)),
    ];
    const home = capture.host.home;
    const role = stateRole(reasons, selectedHomePath(facts, path));
    return {
        path,
        home_path: path.startsWith(`${home}/`) ? path.slice(home.length + 1) : null,
        role: facts.sqliteSidecars?.has(path) === true && role === "unrelated"
            ? "application_state"
            : role,
        reasons,
        format: versions.findLast((version) => version.format !== null)?.format ?? null,
        versions,
        changes: versions
            .slice(1)
            .map((version, index) => changeBetween(versions[index] ?? version, version)),
    };
};
const stateLimitations = (policy) => [
    "Roles are inferred from state directories, open files, window titles, selected paths and dconf key names; a path can be misattributed.",
    "Views cover retained content only; a file that existed before the capture but outside the content roots has no starting view.",
    `SQLite views list at most ${String(policy.sqlite_rows)} rows of ${String(policy.sqlite_tables)} ordinary tables, text views ${String(policy.text_lines)} lines and XML views ${String(policy.xml_nodes)} nodes; changes between truncated views, or views with an unread table, are marked incomplete. Increase the corresponding --view-policy budget and retry the same capture; no restart is needed.`,
    `Each projected SQLite table view is bounded at sqlite_view_bytes=${String(policy.sqlite_view_bytes)} UTF-8 JSON bytes. A refused table keeps its error; other tables remain readable. Raise sqlite_view_bytes in --view-policy on the next call for that refusal. The separate SQLite worker reply and value/record limits may refuse earlier and are not raised by view policy.`,
    `JSON and key file views read files of at most ${String(policy.parsed_bytes)} bytes and JSON nested at most ${String(policy.json_depth)} levels; only numbers JavaScript holds exactly are admitted. Increase parsed_bytes or json_depth in --view-policy for a budget refusal; byte budgets do not change numeric exactness or Evidence nesting.`,
    "dconf views keep only groups whose path names the application.",
    `Zip views list at most ${String(policy.zip_entries)} entries and read an entry only when unencrypted, stored or deflated, at most ${String(policy.zip_entry_bytes)} bytes and ${String(policy.zip_ratio)} times its compressed size, up to ${String(policy.zip_bytes)} bytes per archive. Increase the corresponding --view-policy budget for a resource refusal; databases and archives inside an archive are not read.`,
    `A gzip file's view is its document's, read only when it is at most ${String(policy.zip_entry_bytes)} bytes and at most ${String(policy.zip_ratio)} times the file's size; a database inside one is not read, nor a gzip file inside an archive.`,
];
/** Read a capture folder into the application's state view. */
const inspectState = async (folder, readers, signal, options) => {
    const policy = desktopViewPolicy(options.viewPolicy);
    const { evidence, capture } = await readDesktopCapture(folder, signal);
    const names = applicationNames(capture);
    const facts = roleFacts(capture);
    const index = indexState(capture);
    const candidates = statePaths(index);
    for (const selected of options.paths ?? [])
        if (!candidates.includes(selected))
            throw new AnalysisInputError(OPERATION, {
                userMessage: `Captured path ${JSON.stringify(selected)} was not found.`,
                remediationAction: "Use an exact path from this capture's state view; no current filesystem path is substituted.",
            }, [{ path: ["paths"], reason: "invalid_value" }]);
    const paths = await withRetainedContent(folder, async (content) => {
        const context = {
            content,
            readers,
            names,
            signal,
            index,
            policy,
        };
        const described = [];
        for (const path of candidates)
            if (options.paths === undefined || options.paths.includes(path))
                described.push(await describePath(capture, path, facts, context));
        return described;
    }, policy.file_bytes);
    const limitations = [
        ...stateLimitations(policy),
        ...(capture.state.state_directories === undefined
            ? [
                "The capture does not record its state directories as walked, so files in a symlinked state directory may be classed as documents.",
            ]
            : []),
    ];
    const result = {
        effective_view_policy: policy,
        capture: {
            evidence_id: evidence.evidence_id,
            home: capture.host.home,
            checkpoints: capture.state.checkpoints.map((checkpoint) => checkpoint.name),
            limitations: capture.limitations,
            omitted_content: capture.state.omitted_content,
        },
        application_names: [...names],
        paths,
        limitations,
    };
    if (signal?.aborted === true)
        throw cancelledBy(OPERATION, signal);
    return createEvidence(unknownTarget("not-observed"), DESKTOP_PROVIDER, {
        predicateType: "rea.desktop-application-state",
        operation: OPERATION,
        parameters: {
            capture_evidence_id: evidence.evidence_id,
            ...(options.viewPolicy === undefined
                ? {}
                : { view_policy: { ...options.viewPolicy } }),
            ...(options.paths === undefined ? {} : { paths: [...options.paths] }),
        },
        result,
        confidence: "inferred",
        authority: "analyst-inference",
        limitations: [...limitations, ...capture.limitations],
    });
};
/** Inspect one capture folder, returning its state view Evidence or a failure. */
export const inspectDesktopApplicationState = async (folder, readers, signal, options = {}) => {
    try {
        const admitted = desktopViewPolicyInputSchema.safeParse(options.viewPolicy === undefined ? {} : options.viewPolicy);
        if (!admitted.success)
            return analysisInputErrorFromIssues(OPERATION, admitted.error.issues, options.viewPolicy);
        return await inspectState(folder, readers, signal, {
            ...options,
            ...(options.viewPolicy === undefined
                ? {}
                : { viewPolicy: admitted.data }),
        });
    }
    catch (cause) {
        return desktopOperationFailure(cause, signal, OPERATION, "Desktop state view");
    }
};
