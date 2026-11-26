import { HOST_PLATFORM } from "../../platform/HostPlatform.js";
import { randomUUID } from "node:crypto";
import { extraPackagesOf, } from "../../domain/desktop/appBuild.js";
import { counted } from "../../domain/desktop/appExportUnowned.js";
import { SETTLE_TIMING } from "../../domain/desktop/appSettle.js";
import { driverCall, } from "../../domain/desktop/computerActions.js";
import { AnalysisError, } from "../../domain/analysisErrorBase.js";
import { AnalysisInputError, cancelledBy, } from "../../domain/analysisErrorCore.js";
import { ProviderAdapterError } from "../../domain/providerAdapterError.js";
import { ProviderCleanupError } from "../../domain/providerCleanupError.js";
import { AnalysisCleanupRelease } from "../../domain/analysisCleanupRelease.js";
import { err, ok } from "../../domain/result.js";
import { AgentEnvComputer, COMPUTER_START_TIMING, AppDataRefusal, ComputerStartFailure, computerFailedOnReadiness, } from "../../desktop/AgentEnvComputer.js";
import { ComputerHelper } from "../../desktop/AgentEnvComputerHelper.js";
import { AGENTENV_PROVIDER } from "../../desktop/AgentEnvProviderIdentity.js";
import { resolveBuildComputerEnvironment, } from "../../desktop/BuildComputerEnvironment.js";
import { buildSecretsDirectory } from "../../desktop/BuildSecretFiles.js";
import { BuildComputerActionLog, } from "./DesktopBuildActionLog.js";
import { seededLockFiles, writeRequestBundle } from "./DesktopBuildBundle.js";
import { DesktopBuildCapture } from "./DesktopBuildCapture.js";
import { DesktopBuildOwnedWork } from "./DesktopBuildOwnedWork.js";
import { measureInFreshComputers, } from "./DesktopBuildSolves.js";
import { DesktopBuildSecrets, settingsEnvironment, typeSecret, } from "./DesktopBuildSecrets.js";
import { DesktopBuildTurns } from "./DesktopBuildTurns.js";
import { DesktopBuildWitness } from "./DesktopBuildWitness.js";
import { ScreenJudgeProcess } from "../../desktop/ScreenJudgeProcess.js";
import { errorMessage } from "../../kernel/errorMessage.js";
const START = "start_build_computer";
const ACT = "act_on_build_computer";
const CLOSE = "close_build_computer";
const MEASURE = "measure_build_task";
/** Bind every returned teardown failure to the computer retained for retry. */
const bindCleanupFailure = (held, error) => {
    error.bindCleanupResourceOwner({
        get cleanupResources() {
            return held.cleanup.resources;
        },
    });
    held.cleanup.release.bind(error);
};
const unknownComputer = (operation) => new AnalysisInputError(operation, {
    userMessage: "No build computer has this id in this REA server; start one with start_build_computer.",
    conformsToInputContract: true,
});
const failure = (operation, cause, signal) => {
    if (cause instanceof AnalysisError)
        return cause;
    if (signal.aborted)
        return cancelledBy(operation, signal);
    return new ProviderAdapterError(AGENTENV_PROVIDER, operation, {
        userMessage: errorMessage(cause),
        cause,
    });
};
/** The text of a driver's answer, such as a refusal's message. */
const driverMessage = (content) => content
    .flatMap((block) => (typeof block.text === "string" ? [block.text] : []))
    .join(" ");
/**
 * Restore the app's data to its seed with `data/reset`, which relaunches the
 * app, and wait until the computer reports ready again; a screenshot after,
 * when asked.
 */
const reset = async (computer, fields, signal) => {
    const startedAt = Date.now();
    try {
        await computer.appData("data/reset", signal);
    }
    catch (cause) {
        return { kind: "unfinished", cause };
    }
    try {
        await computer.waitUntilReady(signal);
        const ready = { reset: true, ready_ms: Date.now() - startedAt };
        if (fields.screenshot !== true)
            return {
                kind: "done",
                result: { isError: false, content: [], structured: ready },
            };
        // The reset has happened: a screenshot that fails after it is reported beside it, and only an abort propagates.
        const shot = await computer
            .callTool("computer_screenshot", {}, signal)
            .catch((cause) => {
            if (signal.aborted)
                throw cause;
            return errorMessage(cause);
        });
        if (typeof shot === "string" || shot.isError)
            return {
                kind: "done",
                result: {
                    isError: false,
                    content: [],
                    structured: {
                        ...ready,
                        screenshot_error: typeof shot === "string" ? shot : driverMessage(shot.content),
                    },
                },
            };
        return {
            kind: "done",
            result: {
                isError: false,
                content: shot.content,
                structured: { ...ready, frame: shot.structured },
            },
        };
    }
    catch (cause) {
        return { kind: "interrupted", cause };
    }
};
/** A live computer as REA holds it: its action log, its capture and witness, and the turns all its calls take. */
const liveComputer = (computer, workspace, source, { settle, secrets, readHostFile }, judge) => {
    const actions = new BuildComputerActionLog(secrets.redact);
    const turns = new DesktopBuildTurns();
    const capture = new DesktopBuildCapture(computer, source.kind === "request" ? source : undefined, {
        all: (signal) => secrets.all(signal),
        keep: (handle, bytes) => secrets.keep(handle, bytes),
        redact: secrets.redact,
        get hasDeclaredSecret() {
            return secrets.hasDeclaredSecret;
        },
    });
    const witness = new DesktopBuildWitness(computer, actions, settle, {
        bundle: source.kind === "bundle"
            ? { path: source.path, judge: judge.judge }
            : undefined,
        redact: secrets.redactJson,
        readHostFile,
    });
    let closedComputer;
    const attempt = async (release) => {
        try {
            return await release();
        }
        catch (cause) {
            return {
                verified: false,
                reason: errorMessage(cause),
                resources: [],
            };
        }
    };
    return {
        computer,
        release: async () => {
            const [commands, readers, judgeResult] = await Promise.all([
                attempt(() => capture.longRuns.release()),
                attempt(() => witness.readers.release()),
                attempt(() => judge.close()),
            ]);
            // Reader cleanup can be retried against the live computer. An unsettled
            // long run cannot: its stop already ended, and the computer teardown is
            // what removes a descendant the supervisor does not own.
            if (!readers.verified) {
                const failed = [commands, readers, judgeResult].filter((result) => !result.verified);
                return {
                    verified: false,
                    reason: failed.map((result) => result.reason).join("; "),
                    resources: [...new Set(failed.flatMap((result) => result.resources))],
                };
            }
            const computerResult = closedComputer === undefined
                ? await attempt(() => computer.close())
                : closedComputer;
            if (computerResult.verified) {
                closedComputer = computerResult;
                if (!commands.verified)
                    capture.longRuns.resolveAfterVerifiedComputerTeardown();
            }
            const failed = [
                judgeResult,
                computerResult,
                ...(!computerResult.verified && !commands.verified ? [commands] : []),
            ].filter((result) => !result.verified);
            if (failed.length === 0 && computerResult.verified)
                return computerResult;
            return {
                verified: false,
                reason: failed.map((result) => result.reason).join("; "),
                resources: [...new Set(failed.flatMap((result) => result.resources))],
            };
        },
        workspace,
        actions,
        steps: {
            computer,
            capture,
            witness,
            turns,
        },
        turns,
        cleanup: { resources: [], release: new AnalysisCleanupRelease() },
        closing: false,
    };
};
/**
 * A bundle's start that failed on readiness, naming the lock files its seed
 * holds, which an app that finds its profile or document in use may never
 * start past; any other failure as it is. Readiness is `reason`, not the
 * message.
 */
/** The start failure's notice that the bundle seed still holds lock files. */
const seededLockStartNotice = (locks) => `The bundle's seed holds lock files, which can keep the app from starting when it finds its profile or document in use: ${counted(locks)}. Delete them from the bundle, or export it again, which leaves them out, and start again.`;
const withSeededLocks = async (source, cause) => {
    if (source.kind !== "bundle" || !computerFailedOnReadiness(cause))
        return cause;
    const { locks, unreadable } = await seededLockFiles(source.path);
    const notices = [
        ...(locks.length === 0 ? [] : [seededLockStartNotice(locks)]),
        ...(unreadable.length === 0
            ? []
            : [
                `REA could not check these seed folders for lock files: ${unreadable.map(({ path, reason }) => `${path}: ${reason}`).join("; ")}. Other lock files remain unknown.`,
            ]),
    ];
    return notices.length === 0
        ? cause
        : new ComputerStartFailure(`${cause.message} ${notices.join(" ")}`, cause.remediation, { cause, reason: cause.reason });
};
/**
 * Why a start failed, with the helper's output, and, when its teardown is
 * unconfirmed, the id REA keeps that teardown under for close to retry.
 */
const startFailure = (cause, signal, output, kept) => {
    if (cause instanceof AnalysisError && kept.release.verified)
        return cause;
    const options = {
        ...(output === undefined ? {} : { capturedOutput: output }),
        ...(kept.release.verified
            ? {}
            : {
                cleanup: {
                    reason: kept.release.reason,
                    resources: kept.release.resources,
                },
                diagnostics: { computer_id: kept.id },
                remediationAction: `REA keeps this computer's teardown as ${kept.id}; once the reported problem is fixed, call close_build_computer with that computer_id.`,
            }),
    };
    if (signal.aborted)
        return cancelledBy(START, signal, options);
    return new ProviderAdapterError(AGENTENV_PROVIDER, START, {
        ...(cause instanceof ComputerStartFailure &&
            cause.remediation !== undefined &&
            kept.release.verified
            ? { remediationAction: cause.remediation }
            : {}),
        userMessage: errorMessage(cause),
        ...options,
        cause,
    });
};
/**
 * Owns the build computers one REA server keeps up: starts each from a
 * request or a bundle, forwards actions to its driver with an action log,
 * and brings each down on close or when the server closes. A start in
 * progress is owned from its helper's spawn; one that fails without a
 * confirmed teardown stays held so close and shutdown can retry it.
 */
export class DesktopBuildComputers {
    environment;
    readHostFile;
    defaults;
    startTiming;
    #computers = new Map();
    #work = new DesktopBuildOwnedWork();
    #secrets;
    #shared;
    constructor(environment, readHostFile, settle = SETTLE_TIMING, defaults = {}, startTiming = COMPUTER_START_TIMING) {
        this.environment = environment;
        this.readHostFile = readHostFile;
        this.defaults = defaults;
        this.startTiming = startTiming;
        this.#secrets = new DesktopBuildSecrets(buildSecretsDirectory(environment, HOST_PLATFORM.platform));
        this.#shared = { settle, secrets: this.#secrets, readHostFile };
    }
    /** How often a computer's start, and a tool call waiting on one, reports progress. */
    get progressMs() {
        return this.startTiming.progressMs;
    }
    /** How results show the secrets typed on this server's computers. */
    get redaction() {
        return this.#secrets;
    }
    async start(input, signal, progress) {
        return this.#work.run(START, signal, (stopping) => this.#start(input, stopping, progress));
    }
    /** Measure a bundle's task in fresh computers of its own; closing REA stops it, tearing the solve's computer down. */
    measure(input, signal, progress) {
        return this.#work.run(MEASURE, signal, (stopping) => measureInFreshComputers(input, {
            environment: this.environment,
            defaults: this.defaults,
            retainCleanup: (owner) => this.#work.retain(owner),
            resources: this.#work.resources,
            readHostFile: this.readHostFile,
        }, stopping, progress));
    }
    async #start(input, signal, progress) {
        const { source } = input;
        const resolved = await this.#environment(source);
        if (!resolved.ok)
            return resolved;
        const environment = resolved.value;
        let target;
        try {
            target =
                source.kind === "bundle"
                    ? { bundle: source.path, name: source.path }
                    : await writeRequestBundle(source, environment, this.#work.resources);
        }
        catch (cause) {
            return err(failure(START, cause, signal));
        }
        const id = randomUUID();
        let helper;
        let computer;
        try {
            helper = await ComputerHelper.spawn({
                bundle: target.bundle,
                environment,
                signal,
                operation: START,
            });
            const connected = await AgentEnvComputer.connect(helper, signal, progress === undefined
                ? undefined
                : (message) => {
                    void progress
                        .report({ phase: START, completed: 0, total: null, message })
                        .catch(() => undefined);
                }, this.startTiming);
            computer = connected.computer;
            const shot = driverCall("screenshot", input.screenshot ?? {});
            if (!shot.ok)
                throw new TypeError("screenshot options are its own");
            // The caller's region, format or quality apply to the drawn frame.
            const taken = Object.keys(shot.value.arguments).length === 0
                ? connected.frame
                : await computer.callTool(shot.value.tool, shot.value.arguments, signal);
            this.#computers.set(id, liveComputer(computer, target.workspace, source, this.#shared, new ScreenJudgeProcess(environment)));
            return ok({
                value: {
                    computer_id: id,
                    sandbox_id: computer.sandboxId,
                    environment: target.name,
                    extra_packages: [...extraPackagesOf(source)],
                    screenshot: taken.isError ? null : taken.structured,
                },
                content: taken.content,
            });
        }
        catch (cause) {
            const owner = helper;
            const connected = computer;
            this.#computers.set(id, {
                computer: undefined,
                release: connected !== undefined
                    ? () => connected.close()
                    : owner === undefined
                        ? undefined
                        : () => owner.release(),
                workspace: target.workspace,
                actions: new BuildComputerActionLog(this.#secrets.redact),
                steps: undefined,
                turns: new DesktopBuildTurns(),
                cleanup: { resources: [], release: new AnalysisCleanupRelease() },
                closing: true,
            });
            const release = await this.#retire(id);
            const failed = signal.aborted
                ? cause
                : await withSeededLocks(source, cause);
            const error = startFailure(failed, signal, owner?.output(), {
                id,
                release,
            });
            const retained = this.#computers.get(id);
            if (!release.verified && retained !== undefined) {
                retained.cleanup.resources = release.resources;
                bindCleanupFailure(retained, error);
            }
            return err(error);
        }
    }
    /** Forward one action to the computer's driver and log it; a driver refusal is an error carrying its message. */
    async act(input, signal) {
        const { computer_id: id, action, ...fields } = input;
        const held = this.#computers.get(id);
        const computer = held?.computer;
        if (held === undefined || computer === undefined || held.closing)
            return err(unknownComputer(ACT));
        const call = driverCall(action, fields);
        if (!call.ok)
            return err(new AnalysisInputError(ACT, {
                userMessage: call.error.missing === true
                    ? `${action} needs ${call.error.field}.`
                    : `${action} does not take ${call.error.field}; it takes ${call.error.accepted.join(", ")}.`,
            }, [
                {
                    path: [call.error.field],
                    reason: call.error.missing === true
                        ? "missing_argument"
                        : "unknown_argument",
                    expected: [...call.error.accepted],
                },
            ]));
        return held.turns.run(ACT, signal, (turn) => this.#forward(held, computer, { id, action, ...call.value }, turn));
    }
    /** Log and send one action on its turn, so the log holds no action still pending while another call runs. */
    async #forward(held, computer, call, signal) {
        const { id, action } = call;
        // A secret is logged by its handle; only the computer receives its value.
        const logged = held.actions.begin(action, call.tool, call.arguments);
        if (action === "type_secret") {
            const handle = String(call.arguments.secret);
            const typed = await typeSecret(this.#secrets, computer, handle, signal);
            logged.settle(typed.outcome);
            return typed.answer(id, logged.index);
        }
        let result;
        try {
            if (action === "reset") {
                const outcome = await reset(computer, call.arguments, signal);
                if (outcome.kind === "unfinished") {
                    // A tagged app refusal is a failed reset. Any other lost reply,
                    // including a dropped connection after the seed was restored, stays
                    // unknown and blocks a near miss that would treat it as absent.
                    logged.settle("failed", {
                        unsettled: !(outcome.cause instanceof AppDataRefusal),
                    });
                    return err(failure(ACT, outcome.cause, signal));
                }
                // The seed restore is already observed. A later cancel or readiness
                // failure must not make the witness treat that restore as absent.
                logged.settle("applied");
                if (outcome.kind === "interrupted")
                    return err(failure(ACT, outcome.cause, signal));
                result = outcome.result;
            }
            else {
                result = await computer.callTool(call.tool, call.arguments, signal);
            }
        }
        catch (cause) {
            logged.settle("failed");
            return err(failure(ACT, cause, signal));
        }
        logged.settle(result.isError ? "refused" : "applied");
        if (result.isError)
            return err(new AnalysisInputError(ACT, {
                userMessage: `The computer refused the ${action}: ${driverMessage(result.content)}`,
                remediationAction: "Follow the computer's message; actions on frame coordinates need a screenshot first.",
                conformsToInputContract: true,
            }));
        return ok({
            value: {
                computer_id: id,
                action,
                action_index: logged.index,
                result: result.structured,
            },
            content: result.content,
        });
    }
    /** The helper's environment: the build settings, then each variable a bundle's withheld settings read, from its secret. */
    async #environment(source) {
        const settings = await settingsEnvironment(this.#secrets, source);
        if (!settings.ok)
            return settings;
        const environment = await resolveBuildComputerEnvironment(this.environment, HOST_PLATFORM.platform, this.defaults);
        return ok({ ...environment, ...settings.value });
    }
    /** Bring a computer down; one whose teardown is not confirmed stays held so close can be retried. */
    async close(id) {
        const held = this.#computers.get(id);
        if (held === undefined)
            return err(unknownComputer(CLOSE));
        held.closing = true;
        // Tear down only once the call it cancels has ended; the calls waiting are refused.
        const release = await held.turns.close(() => this.#retire(id));
        held.cleanup.resources = release.verified ? [] : release.resources;
        if (release.verified) {
            held.cleanup.release.confirm();
            return ok({ computer_id: id, teardown: release.teardown });
        }
        const failure = new ProviderCleanupError(AGENTENV_PROVIDER, release.resources, { reason: release.reason }, { operation: CLOSE, remediationAction: release.reason });
        bindCleanupFailure(held, failure);
        return err(failure);
    }
    /** Release a held computer and its bundle folder; it stays held while either is unconfirmed. */
    async #retire(id) {
        const held = this.#computers.get(id);
        if (held === undefined)
            return { verified: true, teardown: "agentenv" };
        held.closing = true;
        const release = (await held.release?.()) ?? {
            verified: true,
            teardown: "agentenv",
        };
        if (!release.verified)
            return release;
        try {
            await held.workspace?.close();
        }
        catch (cause) {
            return {
                verified: false,
                reason: `the build bundle folder could not be removed: ${errorMessage(cause)}`,
                resources: [held.workspace?.path ?? id],
            };
        }
        this.#computers.delete(id);
        return release;
    }
    /** Cancel and join the starts in progress, then bring every held computer down, as the server closes. */
    async closeAll() {
        const failures = await this.#work.close();
        for (const result of await Promise.all([...this.#computers.keys()].map((id) => this.close(id))))
            if (!result.ok)
                failures.push(result.error);
        try {
            await this.#secrets.close();
        }
        catch (cause) {
            failures.push(cause instanceof AnalysisError
                ? cause
                : new ProviderAdapterError(AGENTENV_PROVIDER, "close_build_secrets", {
                    cause,
                    userMessage: "Could not close build secret files.",
                }));
        }
        if (failures.length > 0)
            throw new AggregateError(failures, "Build computer teardown is incomplete");
    }
    /** A live computer's capture and witness, for the build step tools; undefined for an unknown or closing id. */
    steps(id) {
        const held = this.#computers.get(id);
        return held === undefined || held.closing ? undefined : held.steps;
    }
    /** A live computer's action log and recording hooks, for the witness. */
    session(id) {
        const held = this.#computers.get(id);
        const computer = held?.computer;
        if (held === undefined || computer === undefined)
            return undefined;
        return {
            sandboxId: computer.sandboxId,
            actions: held.actions,
            startRecording: (...request) => computer.startRecording(...request),
            endRecording: (...request) => computer.endRecording(...request),
            recordingSegments: (...request) => computer.recordingSegments(...request),
        };
    }
}
