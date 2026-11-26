import { HOST_PLATFORM } from "../../platform/HostPlatform.js";
import { parseFailureAnalysisError, parseLimitConstraint, } from "../../domain/parseFailureAnalysisError.js";
import { lstat, open } from "node:fs/promises";
import { projectSelectedArtifactFileFailure, projectOwnedArtifactIdentityFailure, projectStableArtifactFailure, projectArtifactCloseFailure, ArtifactReaderFailure, readStableArtifact, artifactFilePrimaryFacts, assertArtifactReadActive, ArtifactResourceScope, } from "../../resources/index.js";
import { fileSnapshotPartialObservationSchema } from "../../domain/fileSnapshotObservation.js";
import { AnalysisError } from "../../domain/analysisErrorBase.js";
import { AnalysisInputError, AnalysisResourceConstraintError, } from "../../domain/analysisErrorCore.js";
import { MAX_INSPECT_WINDOWS_SHORTCUT_EXTRA_DATA_BLOCKS, MAX_INSPECT_WINDOWS_SHORTCUT_FILE_BYTES, MAX_INSPECT_WINDOWS_SHORTCUT_ID_LIST_ITEMS, MAX_INSPECT_WINDOWS_SHORTCUT_STRING_BYTES, } from "../../domain/native/windowsShortcut.js";
import { ProviderAdapterError } from "../../domain/providerAdapterError.js";
import { err, ok } from "../../domain/result.js";
import { WINDOWS_SHORTCUT_PROVIDER } from "../../domain/investigationProviders.js";
import { WindowsShortcutResourceFailure, } from "./WindowsShortcut.errors.js";
import { parseWindowsShortcut } from "./WindowsShortcutParser.js";
import { errorMessage } from "../../kernel/errorMessage.js";
const OPERATION = "inspect_windows_shortcut";
/** A path that starts with two separators: UNC, extended UNC, or another device path. */
const HOST_PREFIXED_PATH = /^[\\/]{2}/u;
/** An extended or device form of a drive path, such as `\\?\C:\x`, which stays on this host. */
const LOCAL_DRIVE_DEVICE_PATH = /^[\\/]{2}[?.][\\/][A-Za-z]:(?:[\\/]|$)/u;
/**
 * A path Windows could open through a remote host. Even `lstat` on such a path
 * can reach an SMB server and offer the caller's credentials, so this is decided
 * from the text alone. A mapped network drive looks like a local drive here.
 * POSIX hosts read repeated leading slashes as one local root.
 */
const namesNetworkShare = (path, platform) => platform === "win32" &&
    HOST_PREFIXED_PATH.test(path) &&
    !LOCAL_DRIVE_DEVICE_PATH.test(path);
/**
 * `lstat` and `open` only. Without `realpath`, a rejected symlink's destination
 * is never resolved, so a link pointing at a UNC path cannot reach an SMB host.
 */
const LINK_BLIND_FILE_SYSTEM = {
    lstat: (path) => lstat(path, { bigint: true }),
    open,
};
/** Where a Windows path's ancestors begin: past a drive root or device prefix. */
const WINDOWS_PATH_ROOT = /^(?:[\\/]{2}[?.][\\/])?(?:[A-Za-z]:)?[\\/]*/u;
/** A `\\?\` path, which Windows opens as spelled, without removing `.` or `..`. */
const LITERAL_DEVICE_PATH = /^[\\/]{2}\?[\\/]/u;
/** One path component and the separators the caller wrote after it. */
const WINDOWS_PATH_COMPONENT = /([^\\/]+)([\\/]*)/gu;
/**
 * The ancestor directories Windows reaches when it opens `path`, spelled as
 * the caller wrote them. Win32 removes `.` and `..` components before opening
 * a path, so `C:\alias\..\real\a.lnk` reaches only `C:\real`, and `..`
 * cannot climb above an absolute root. A `\\?\` path skips that
 * normalization, so its components are walked as written. A relative path
 * keeps a leading `..` that has nothing to remove.
 *
 * Only the normalized components are retained, which is linear in the path.
 * Each ancestor is built from the running prefix as the walk reaches it, so a
 * deep path never holds every parent spelling at once.
 */
function* windowsAncestors(path) {
    const root = WINDOWS_PATH_ROOT.exec(path)?.[0] ?? "";
    const literal = LITERAL_DEVICE_PATH.test(root);
    const absolute = /[\\/]$/u.test(root);
    const kept = [];
    for (const [spelled, name = ""] of path
        .slice(root.length)
        .matchAll(WINDOWS_PATH_COMPONENT)) {
        if (!literal && name === ".")
            continue;
        if (!literal && name === "..") {
            const last = kept.at(-1);
            if (last !== undefined && last.name !== "..") {
                kept.pop();
                continue;
            }
            if (absolute)
                continue;
        }
        kept.push({ name, spelled });
    }
    // The final component is the shortcut itself, not an ancestor.
    let prefix = root;
    for (const { name, spelled } of kept.slice(0, -1)) {
        yield prefix + name;
        prefix += spelled;
    }
}
/**
 * The first ancestor directory of a Windows path that is a symbolic link or
 * junction, walked from the root down. Each `lstat` reaches only directories
 * already checked, so a link to a UNC path is found before anything follows it.
 * An ancestor that cannot be read ends the walk and leaves the error to the reader.
 * The caller's signal is checked before each read.
 */
const linkedWindowsAncestor = async (path, signal) => {
    for (const ancestor of windowsAncestors(path)) {
        assertArtifactReadActive(signal);
        try {
            if ((await LINK_BLIND_FILE_SYSTEM.lstat(ancestor)).isSymbolicLink())
                return ancestor;
        }
        catch {
            return undefined;
        }
    }
    return undefined;
};
/** Portable Shell Link reader over one bounded, identity-checked regular file. */
export class WindowsShortcutProvider {
    platform;
    identity = WINDOWS_SHORTCUT_PROVIDER;
    #resources = new ArtifactResourceScope();
    constructor(platform = HOST_PLATFORM.platform) {
        this.platform = platform;
    }
    async close() {
        try {
            await this.#resources.close();
        }
        catch (cause) {
            throw projectArtifactCloseFailure(cause, WINDOWS_SHORTCUT_PROVIDER.id, OPERATION);
        }
    }
    async inspect(input, options) {
        if (namesNetworkShare(input.path, this.platform))
            return err(new AnalysisInputError(OPERATION, {}, [
                {
                    path: ["path"],
                    reason: "invalid_value",
                    message: `Selected shortcut is on a network share, which this offline operation does not open: ${input.path}. Copy it to a local path first.`,
                },
            ]));
        let completed;
        try {
            return await this.#resources.run(async () => {
                // Inside the admission, so close() waits for the walk's reads too.
                const linkedAncestor = this.platform === "win32"
                    ? await linkedWindowsAncestor(input.path, options?.signal)
                    : undefined;
                if (linkedAncestor !== undefined)
                    return err(new AnalysisInputError(OPERATION, {}, [
                        {
                            path: ["path"],
                            reason: "invalid_value",
                            message: `Selected shortcut path passes through a directory link or junction, which this offline operation does not follow: ${linkedAncestor}. Select the shortcut by a path without links.`,
                            observed: { linked_ancestor: linkedAncestor },
                        },
                    ]));
                const snapshot = await readStableArtifact(input.path, input.max_file_bytes, options?.signal, LINK_BLIND_FILE_SYSTEM, this.#resources);
                completed = snapshot;
                assertArtifactReadActive(options?.signal);
                const report = await parseWindowsShortcut(snapshot.bytes, {
                    path: input.path,
                    sha256: snapshot.sha256,
                    bytes: snapshot.bytes.length,
                }, input, options?.signal);
                assertArtifactReadActive(options?.signal);
                return ok(report);
            });
        }
        catch (cause) {
            const failure = windowsShortcutFailure(cause, input);
            if (completed !== undefined)
                failure.retainPartialObservation(fileSnapshotPartialObservationSchema.parse({
                    kind: "file-snapshot-hash",
                    path: input.path,
                    sha256: completed.sha256,
                    bytes: completed.bytes.length,
                }));
            return err(failure);
        }
    }
}
const fileSizeRemediation = (input) => input.max_file_bytes >= MAX_INSPECT_WINDOWS_SHORTCUT_FILE_BYTES
    ? `The shortcut exceeds the ${String(MAX_INSPECT_WINDOWS_SHORTCUT_FILE_BYTES)}-byte input ceiling this operation accepts. This release has no runtime override. Select a smaller artifact.`
    : `Raise max_file_bytes above ${String(input.max_file_bytes)} bytes or select a smaller artifact; the limit is the caller-selected input read budget.`;
const SELECTED_BUDGETS = {
    id_list_items: {
        argument: "max_id_list_items",
        maximum: MAX_INSPECT_WINDOWS_SHORTCUT_ID_LIST_ITEMS,
        unit: "entries",
    },
    extra_data_blocks: {
        argument: "max_extra_data_blocks",
        maximum: MAX_INSPECT_WINDOWS_SHORTCUT_EXTRA_DATA_BLOCKS,
        unit: "entries",
    },
    string_bytes: {
        argument: "max_string_bytes",
        maximum: MAX_INSPECT_WINDOWS_SHORTCUT_STRING_BYTES,
        unit: "bytes",
    },
};
const budgetRemediation = ({ name, maximum: selected, }) => {
    const { argument, maximum, unit } = SELECTED_BUDGETS[name];
    const recovery = selected >= maximum
        ? `This release has no override above the ${String(maximum)} ${unit} ceiling; select a smaller shortcut.`
        : `Raise ${argument} on the next call, up to ${String(maximum)} ${unit}, or select a smaller shortcut; no restart is required.`;
    return `Effective ${argument} is ${String(selected)} ${unit}. ${recovery}`;
};
const windowsShortcutFailurePrimary = (facts, input) => {
    const { cause, origin } = facts;
    if (origin === "owned-or-classified" && cause instanceof AnalysisError)
        return cause;
    const identityFailure = projectOwnedArtifactIdentityFailure(facts, OPERATION, input.path);
    if (identityFailure !== undefined)
        return identityFailure;
    if (cause instanceof WindowsShortcutResourceFailure)
        return parseLimitConstraint(OPERATION, "capacity", cause, {
            path: input.path,
            retryable: false,
            remediationAction: budgetRemediation(cause.failure.limit),
        });
    const formatFailure = parseFailureAnalysisError(OPERATION, input.path, cause);
    if (formatFailure !== undefined)
        return formatFailure;
    if (origin === "owned-or-classified" &&
        cause instanceof ArtifactReaderFailure) {
        if (cause.reason === "limit")
            return new AnalysisResourceConstraintError(OPERATION, "file-size", cause.message, { max_file_bytes: input.max_file_bytes }, {
                cause,
                retryable: false,
                remediationAction: fileSizeRemediation(input),
            });
        if (cause.reason === "path" || cause.reason === "format")
            return new AnalysisInputError(OPERATION, { cause }, [
                { path: ["path"], reason: "invalid_format", message: cause.message },
            ]);
    }
    const fileFailure = projectSelectedArtifactFileFailure(cause, OPERATION, input.path, "shortcut");
    if (fileFailure !== undefined)
        return fileFailure;
    return new ProviderAdapterError(WINDOWS_SHORTCUT_PROVIDER.id, OPERATION, {
        cause,
        diagnostics: {
            path: input.path,
            reason: errorMessage(cause),
        },
    });
};
const windowsShortcutFailure = (cause, input) => {
    const primary = windowsShortcutFailurePrimary(artifactFilePrimaryFacts(cause), input);
    return projectStableArtifactFailure(cause, primary, input.path, WINDOWS_SHORTCUT_PROVIDER.id, OPERATION);
};
