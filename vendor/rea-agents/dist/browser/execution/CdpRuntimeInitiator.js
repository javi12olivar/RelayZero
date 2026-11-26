import { sanitizeBrowserUrl } from "../../domain/browserObservation.js";
import { isRecord } from "../../kernel/isRecord.js";
const isObject = (value) => isRecord(value);
/** Sanitize known transport fields while retaining declarations and every unknown producer field. */
export const sanitizeRuntimeInitiator = (initiator, sources) => {
    if (typeof initiator.url === "string")
        initiator.url = sanitizeBrowserUrl(initiator.url).url;
    let stack = initiator.stack;
    while (isObject(stack)) {
        if (Array.isArray(stack.callFrames))
            for (const frame of stack.callFrames)
                if (isObject(frame) &&
                    typeof frame.url === "string" &&
                    typeof frame.scriptId === "string")
                    frame.url = sources.sourceUrl(frame.scriptId, frame.url);
        stack = stack.parent;
    }
    return initiator;
};
