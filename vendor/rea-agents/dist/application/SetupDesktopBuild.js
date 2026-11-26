import { DESKTOP_EXPORT_FRAMEWORK_VERSION } from "../domain/desktop/appExport.js";
import { AGENTENV_INSTALL_COMMAND } from "./DesktopBuildDoctor.js";
import { DESKTOP_BUILD_PROVIDER_ID } from "../domain/doctorProviderIds.js";
import { assertSetupActive } from "../domain/setupCancellation.js";
const inert = (blocker) => ({
    selected: blocker !== undefined,
    ...(blocker === undefined ? {} : { blocker }),
    actions: [],
    clientEnvironments: {},
    apply: () => Promise.resolve(undefined),
    readinessRemediation: () => undefined,
});
/** Plan packing, the optional agentenv install and the settings each registration lacks. */
export const planDesktopBuild = async (host, options, clientIds) => {
    if (options.desktopBuild !== true)
        return inert();
    if (host === undefined)
        return inert("This setup host cannot set up desktop builds.");
    const facts = await host.facts(clientIds);
    const pinned = facts.agentEnvVersion === DESKTOP_EXPORT_FRAMEWORK_VERSION;
    const install = options.installAgentenv === true && !pinned;
    const uv = install ? facts.uv : undefined;
    const actions = [];
    if (uv !== undefined)
        actions.push(installAction(uv.agentEnv));
    // An archive the caller selected is recorded instead of packing REA's own.
    if (!facts.archivePacked &&
        !facts.selected.includes("REA_BUILD_COMPUTER_REA_ARCHIVE")) {
        if (facts.packBlocker !== undefined)
            return inert(facts.packBlocker);
        actions.push(packAction(facts.archive));
    }
    const settings = {
        ...facts.settings,
        ...(uv !== undefined && !facts.selected.includes("REA_AGENT_ENV_COMMAND")
            ? { REA_AGENT_ENV_COMMAND: uv.agentEnv }
            : {}),
    };
    const remediation = agentenvRemediation(pinned, install, uv);
    const failed = new Set();
    return {
        selected: true,
        actions,
        get clientEnvironments() {
            return Object.fromEntries(clientIds.map((client) => [
                client,
                Object.fromEntries(Object.entries(settings).filter(([name]) => !failed.has(name) &&
                    (facts.selected.includes(name) ||
                        !(facts.recorded[client] ?? []).includes(name)))),
            ]));
        },
        ...(remediation === undefined ? {} : { remediation }),
        apply: (appliedActions, onProgress, signal) => applyActions(host, actions, uv?.path, {
            appliedActions,
            onProgress,
            signal,
            failed: (kind) => {
                if (kind === "pack_build_runtime")
                    failed.add("REA_BUILD_COMPUTER_REA_ARCHIVE");
                else if (!facts.selected.includes("REA_AGENT_ENV_COMMAND"))
                    failed.add("REA_AGENT_ENV_COMMAND");
            },
        }),
        readinessRemediation: (healthy) => healthy
            ? undefined
            : `Run rea doctor --provider ${DESKTOP_BUILD_PROVIDER_ID} and apply each reported fix.`,
    };
};
const agentenvRemediation = (pinned, install, uv) => pinned || uv !== undefined
    ? undefined
    : install
        ? `uv is not on PATH. Install agentenv with ${AGENTENV_INSTALL_COMMAND}, then rerun setup.`
        : `Desktop builds need agentenv-framework ${DESKTOP_EXPORT_FRAMEWORK_VERSION}: ${AGENTENV_INSTALL_COMMAND}, or rerun setup with --install-agentenv.`;
const applyActions = async (host, actions, uv, progress) => {
    const failures = [];
    for (const { id, kind, label, target } of actions) {
        assertSetupActive(progress.signal);
        progress.onProgress?.({ actionId: id, label, state: "started" });
        const failure = kind === "install_agentenv"
            ? await host.installAgentenv(uv ?? "uv", progress.signal)
            : await host.packRuntime(target, progress.signal);
        progress.onProgress?.({
            actionId: id,
            label,
            state: failure === undefined ? "completed" : "failed",
            ...(failure === undefined ? {} : { detail: failure }),
        });
        if (failure === undefined)
            progress.appliedActions.push(id);
        assertSetupActive(progress.signal, failure);
        if (failure === undefined)
            continue;
        progress.failed(kind);
        failures.push(kind === "install_agentenv"
            ? `Installing agentenv failed: ${failure} Run ${AGENTENV_INSTALL_COMMAND} yourself, then rerun setup.`
            : `Packing REA's build-computer runtime failed: ${failure} Fix the reported problem, then rerun setup with --desktop-build.`);
    }
    return failures.length === 0 ? undefined : failures.join(" ");
};
const installAction = (agentEnv) => ({
    id: "install_agentenv",
    kind: "install_agentenv",
    label: `agentenv-framework ${DESKTOP_EXPORT_FRAMEWORK_VERSION}`,
    target: agentEnv,
    detail: "Install the agentenv-framework release that desktop bundles target as a uv tool; REA runs its agent-env program for build computers.",
    external: true,
    operation: "install",
    networkOrigins: ["https://pypi.org", "https://files.pythonhosted.org"],
    commands: [AGENTENV_INSTALL_COMMAND],
});
const packAction = (archive) => ({
    id: "pack_build_runtime",
    kind: "pack_build_runtime",
    label: "REA build-computer runtime",
    target: archive,
    detail: "Pack this REA checkout as the runtime a build computer installs: npm pack, its production dependencies from npm ci --omit=dev --omit=optional, then a .tar.xz named by this REA version, packed again when the version changes.",
    external: true,
    operation: "create",
    networkOrigins: ["https://registry.npmjs.org"],
    commands: [`npm run pack:build-computer-runtime -- ${archive}`],
});
