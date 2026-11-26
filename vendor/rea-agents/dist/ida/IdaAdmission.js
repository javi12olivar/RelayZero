import { constants } from "node:fs";
import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { access, stat } from "node:fs/promises";
import { privateRuntimeRootCapability, } from "../process/PrivateRuntimeRoot.js";
import { resolveIdaWorkspaceParent } from "./IdaWorkspace.js";
import { errorMessage } from "../kernel/errorMessage.js";
/** The repair for a workspaceRoot REA cannot create entries in. */
export const IDA_WORKSPACE_ROOT_REMEDIATION = "Set workspaceRoot to an existing directory REA can create entries in, or omit it to use the system temporary directory; see docs/providers/ida-provider.md.";
export const admitIdaConfiguration = async (configuration) => {
    if (configuration.mode !== "headless")
        return { admitted: true };
    const root = configuration.workspaceRoot;
    const privacy = privateRuntimeRootCapability(HOST_PLATFORM.platform);
    if (!privacy.available)
        return {
            admitted: false,
            workspaceRoot: root,
            refusal: { kind: "private_workspace_unavailable", privacy },
        };
    const unusable = await workspaceParentUnusable(root);
    return unusable === undefined
        ? { admitted: true, workspace: { root, proof: privacy.proof } }
        : {
            admitted: false,
            workspaceRoot: root,
            refusal: { kind: "workspace_unusable", reason: unusable },
        };
};
/** Resolve the workspace parent as allocation will, without creating entries. */
const workspaceParentUnusable = async (root) => {
    try {
        const parent = await resolveIdaWorkspaceParent(root);
        if (!(await stat(parent)).isDirectory())
            return `IDA workspaceRoot ${root ?? "the system temporary directory"} is not a directory.`;
        await access(parent, constants.W_OK | constants.X_OK);
        return undefined;
    }
    catch (cause) {
        return `IDA workspaceRoot ${root ?? "the system temporary directory"} is not a usable directory: ${errorMessage(cause)}`;
    }
};
