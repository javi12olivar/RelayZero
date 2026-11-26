import { AnalysisInputError } from "../../domain/analysisErrorCore.js";
import { err, ok } from "../../domain/result.js";
/** The remote connection a contract `remote` member selects. */
export const fridaRemoteConnection = (input) => input === undefined
    ? undefined
    : {
        address: input.address,
        ...(input.token === undefined ? {} : { token: input.token }),
        ...(input.certificate === undefined
            ? {}
            : { certificate: input.certificate }),
        ...(input.origin === undefined ? {} : { origin: input.origin }),
        ...(input.keepalive_interval === undefined
            ? {}
            : { keepaliveInterval: input.keepalive_interval }),
    };
/** The device a contract input selects; the provider defaults to `local`. */
export const fridaDeviceSelection = (input) => {
    const remote = fridaRemoteConnection(input.remote);
    return {
        ...(input.device_id === undefined ? {} : { deviceId: input.device_id }),
        ...(remote === undefined ? {} : { remote }),
    };
};
/**
 * The session a contract input starts, or undefined when its target fields
 * do not match its mode. The contract's own rules refuse that combination.
 */
export const fridaSessionStart = (input) => {
    const selected = {
        ...(input.capture_limits === undefined
            ? {}
            : { captureLimits: input.capture_limits }),
        ...fridaDeviceSelection(input),
    };
    if (input.mode === "attach")
        return input.pid === undefined
            ? undefined
            : { ...selected, mode: "attach", pid: input.pid };
    return input.program === undefined
        ? undefined
        : {
            ...selected,
            mode: "spawn",
            program: input.program,
            ...(input.argv === undefined ? {} : { argv: input.argv }),
        };
};
/** The script a contract input loads, or undefined when its fields disagree. */
export const fridaScriptSource = (input) => input.source_kind === "inline"
    ? input.source === undefined
        ? undefined
        : { sourceKind: "inline", source: input.source }
    : input.path === undefined
        ? undefined
        : { sourceKind: "file", path: input.path };
/**
 * Run one instrument_with_frida request through the service. A target or
 * script that does not match its mode or source kind is refused before any
 * device is selected.
 */
export const instrumentWithFrida = (service, input, signal) => {
    const session = fridaSessionStart(input);
    const source = fridaScriptSource(input);
    return session === undefined || source === undefined
        ? Promise.resolve(err(new AnalysisInputError("instrument_with_frida")))
        : service.instrument({ ...session, source, durationMs: input.duration_ms }, signal);
};
/**
 * Run one start_frida_session request and report the session it started. A
 * target that does not match its mode is refused before any device is
 * selected.
 */
export const startFridaSession = async (service, input, signal) => {
    const request = fridaSessionStart(input);
    if (request === undefined)
        return err(new AnalysisInputError("start_frida_session"));
    const started = await service.startSession(request, signal);
    if (!started.ok)
        return started;
    const session = started.value;
    return ok({
        session_id: session.sessionId,
        ...(session.captureLimits === undefined
            ? {}
            : { capture_limits: session.captureLimits }),
        device_id: session.deviceId,
        target: session.target,
        pid: session.pid,
        mode: session.mode,
        state: session.state,
    });
};
/** Run one load_frida_script request against its session. */
export const loadFridaScript = (service, input, signal) => {
    const source = fridaScriptSource(input);
    return source === undefined
        ? Promise.resolve(err(new AnalysisInputError("load_frida_script")))
        : service.loadScript(input.session_id, source, signal);
};
