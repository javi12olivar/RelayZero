import { ProviderAdapterError, } from "./providerAdapterError.js";
/**
 * An owned provider command's outcome that its dialect examined and did not
 * recognise. It reports as the generic provider adapter failure and always
 * carries the examined outcome, so the fallback states what was checked.
 * Only `classifyProviderOutcome` constructs it, from the outcome it examined.
 */
export class UnclassifiedProviderFailure extends ProviderAdapterError {
    examined;
    constructor(providerId, operation, examined, 
    /** `diagnostics` are provider facts reported beside the examined outcome. */
    options = {}) {
        super(providerId, operation, {
            ...options,
            diagnostics: { ...options.diagnostics, ...examined },
        });
        this.examined = examined;
    }
}
