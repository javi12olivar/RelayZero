import { z } from "zod";
import { urlDeclaresQueryOrFragment } from "../domain/urlComponents.js";
import { parseCdpEndpointValue, readCdpJson } from "../browser/CdpEndpoint.js";
import { parseCdpDiscoveryTargets } from "../browser/CdpDiscoveryTargets.js";
const versionSchema = z
    .object({
    Browser: z.string().min(1),
    "Protocol-Version": z.string().min(1),
    "V8-Version": z.string().optional(),
})
    .passthrough();
/** Discover Node/Electron Inspector targets from one loopback endpoint. */
export const discoverV8Inspector = async (endpoint, operation, signal) => {
    const controller = new AbortController();
    const discoverySignal = signal === undefined
        ? controller.signal
        : AbortSignal.any([signal, controller.signal]);
    const reads = [
        readCdpJson(new URL("/json/version", endpoint), operation, discoverySignal),
        readCdpJson(new URL("/json/list", endpoint), operation, discoverySignal),
    ];
    let versionInput;
    let targetsInput;
    try {
        [versionInput, targetsInput] = await Promise.all(reads);
    }
    catch (cause) {
        controller.abort(cause);
        await Promise.allSettled(reads);
        throw cause;
    }
    const version = parseCdpEndpointValue(versionSchema, versionInput, operation);
    const { targets, limitations, ambiguousTargetIds } = parseCdpDiscoveryTargets(targetsInput, operation);
    return {
        limitations,
        ambiguousTargetIds,
        runtime: {
            product: version.Browser,
            protocol_version: version["Protocol-Version"],
            v8_version: version["V8-Version"] ?? null,
        },
        targets: targets.map((target) => ({
            id: target.id,
            type: target.type,
            url: target.url,
            attached: target.attached ?? null,
            webSocketUrl: validatedInspectorWebSocket(endpoint, target.id, target.webSocketDebuggerUrl),
        })),
    };
};
const validatedInspectorWebSocket = (endpoint, targetId, reported) => {
    if (typeof reported !== "string" || reported.length === 0)
        return null;
    let socket;
    try {
        socket = new URL(reported);
    }
    catch {
        return null;
    }
    const trusted = new URL(endpoint);
    const allowedPaths = new Set([
        `/${targetId}`,
        `/devtools/node/${targetId}`,
        `/devtools/page/${targetId}`,
    ]);
    if (socket.protocol !== "ws:" ||
        socket.port !== trusted.port ||
        socket.username !== "" ||
        socket.password !== "" ||
        urlDeclaresQueryOrFragment(socket) ||
        !allowedPaths.has(socket.pathname))
        return null;
    socket.hostname = trusted.hostname;
    return socket.href;
};
