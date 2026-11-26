import { uefiRequestSchema, } from "../../domain/uefi/uefiFirmwareAnalysis.js";
import { executeProviderOperation } from "../ProviderOperationExecution.js";
/** Shared CLI/MCP admission, execution, and Evidence composition for UEFI. */
export class UefiAnalysisService {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    close() {
        return this.provider.close?.() ?? Promise.resolve();
    }
    /** Run one caller-selected UEFI request and retain image identity inline. */
    execute(operation, input, options) {
        return executeProviderOperation(operation, input, options, uefiRequestSchema, this.provider, "observed");
    }
}
