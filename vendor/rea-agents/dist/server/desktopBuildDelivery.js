/**
 * Report progress every `intervalMs` while a long build step works, so a
 * client's request timeout can reset; the step reports on the same
 * reporter, whose notifications keep one order.
 */
export const withHeartbeat = async (progress, phase, intervalMs, run) => {
    const startedAt = Date.now();
    const timer = setInterval(() => {
        void progress
            .report({
            phase,
            completed: 0,
            total: null,
            message: `working (${String(Math.round((Date.now() - startedAt) / 1000))} s)`,
        })
            .catch(() => undefined);
    }, intervalMs);
    try {
        return await run(progress);
    }
    finally {
        clearInterval(timer);
    }
};
/**
 * A result with each typed secret's value replaced by its handle, in its
 * text and structured content; images pass as they are.
 */
export const redactedResult = (result, redact) => ({
    ...result,
    content: result.content.map((block) => block.type === "text"
        ? { ...block, text: redact.redact(block.text) }
        : block),
    ...(result.structuredContent === undefined
        ? {}
        : {
            structuredContent: redact.redactJson(result.structuredContent),
        }),
});
