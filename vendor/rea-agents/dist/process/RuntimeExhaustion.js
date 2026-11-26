/**
 * The literal each runtime writes when it runs out of memory. HotSpot writes
 * `java.lang.OutOfMemoryError: <area>`; V8 ends each fatal heap message with
 * `JavaScript heap out of memory`.
 */
export const RUNTIME_EXHAUSTION_TOKENS = {
    jvm: "java.lang.OutOfMemoryError",
    v8: "JavaScript heap out of memory",
};
/** The runtime memory areas a reported line can name. */
export const RUNTIME_EXHAUSTION_AREAS = [
    "heap",
    "gc-overhead",
    "metaspace",
    "array-size",
    "native-thread",
];
/** HotSpot's out-of-memory detail strings, in reporting precedence. */
export const JVM_EXHAUSTION_DETAILS = [
    ["Java heap space", "heap"],
    ["GC overhead limit exceeded", "gc-overhead"],
    ["Metaspace", "metaspace"],
    ["Requested array size exceeds VM limit", "array-size"],
    ["unable to create native thread", "native-thread"],
];
const capitalized = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const lowered = (text) => text.charAt(0).toLowerCase() + text.slice(1);
/**
 * Recovery for a reported JVM memory area, naming the option that governs
 * that area: the heap (-Xmx) for heap and GC overhead, -XX:MaxMetaspaceSize
 * for metaspace, nothing for an oversized array, and host thread capacity
 * for native threads.
 */
export const externalJvmExhaustionRecovery = (area, jvm) => {
    const heap = jvm.raise("maximum heap (-Xmx)");
    switch (area) {
        case "heap":
            return `REA does not set ${jvm.program} Java heap. ${heap}, or ${jvm.smaller}.`;
        case "gc-overhead":
            return `REA does not set ${jvm.program} Java heap. The ${jvm.role} JVM spent nearly all its time collecting garbage; ${lowered(heap)}, or ${jvm.smaller}.`;
        case "metaspace":
            return `REA does not set ${jvm.program} class metadata limit. ${jvm.raise("-XX:MaxMetaspaceSize")}; a larger heap (-Xmx) does not raise it.`;
        case "array-size":
            return `The ${jvm.role} requested an array larger than the JVM allows; a larger heap (-Xmx) does not lift this limit. ${capitalized(jvm.smaller)}.`;
        case "native-thread":
            return `The ${jvm.role} JVM could not create a native thread. ${jvm.threads}; a larger heap (-Xmx) does not help.`;
        case undefined:
            return `REA does not set the memory limits of ${jvm.program} JVM. Review the reported out-of-memory line and ${jvm.settings}, or ${jvm.smaller}.`;
    }
};
/** Name the memory area a JVM out-of-memory line reports, if it names one. */
export const jvmExhaustionArea = (line) => JVM_EXHAUSTION_DETAILS.find(([detail]) => line.includes(detail))?.[1];
/** Interpret one observed runtime token as that runtime's exhaustion report. */
export const runtimeExhaustion = (runtime, stream, token) => ({
    runtime,
    // Every V8 report of this token is heap exhaustion.
    area: runtime === "jvm" ? jvmExhaustionArea(token.line) : "heap",
    stream,
    line: token.line,
    lineComplete: token.trailingContextIncomplete !== true,
    truncated: token.truncated,
    invalidUtf8: token.invalidUtf8 === true,
});
/**
 * The diagnostics projection of an exhaustion report. The report may lie
 * beyond the retained output, so every error that claims exhaustion carries
 * its source line, with the same omission flags as Ghidra's observed-marker
 * projection.
 */
export const runtimeExhaustionReport = ({ runtime, area, stream, line, lineComplete, truncated, invalidUtf8, }) => ({
    runtime,
    area: area ?? null,
    stream,
    line,
    line_complete: lineComplete,
    ...(truncated ? { truncated: true } : {}),
    ...(invalidUtf8 ? { invalid_utf8: true } : {}),
});
