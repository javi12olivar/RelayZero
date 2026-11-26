import { inspectApkSignatureInputSchema } from "../../domain/apkSignature/apkSignatureQuery.js";
import { requireAnalysisViewRetention, projectRetainedAnalysis, } from "../analysisView/AnalysisViewService.js";
import { AnalysisOutputError } from "../../domain/analysisErrorCore.js";
import { apkSignatureMatchesSubject, apkSignatureResultSchema, } from "../../domain/apkSignature/apkSignatureReport.js";
import { createAnalysisExecutionEvidence } from "../../domain/analysisObservation.js";
import { err } from "../../domain/result.js";
import { completeProviderEvidence } from "../ProviderOperationExecution.js";
import { parseAnalysisInput } from "../AnalysisInput.js";
const OPERATION = "inspect_apk_signature";
/** Shared artifact validation and typed inline Evidence for CLI/MCP. */
export class ApkSignatureService {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    close() {
        return this.provider.close();
    }
    /** Preserve exact selected artifact identity and the decoded signing facts. */
    async inspect(rawInput, options, retention = {
        evidenceById: undefined,
        recordEvidence: undefined,
    }) {
        const input = parseAnalysisInput(OPERATION, rawInput, inspectApkSignatureInputSchema, options?.signal);
        if (!input.ok)
            return input;
        const { detail, view, ...parameters } = input.value;
        if (detail === "summary") {
            const ready = requireAnalysisViewRetention(OPERATION, retention);
            if (!ready.ok)
                return ready;
        }
        const inspected = await this.provider.inspect(parameters, options);
        if (!inspected.ok)
            return inspected;
        const execution = inspected.value;
        const report = apkSignatureResultSchema.safeParse(execution.result);
        if (!report.success ||
            report.data.artifact.path !== input.value.path ||
            execution.subject.path !== input.value.path ||
            !apkSignatureMatchesSubject(report.data.artifact, execution.subject))
            return err(new AnalysisOutputError(OPERATION, "APK signature reader returned malformed data or changed the selected artifact identity."));
        const completed = completeProviderEvidence(createAnalysisExecutionEvidence(OPERATION, { path: input.value.path }, { ...execution, result: report.data }, "observed"), options?.signal);
        if (!completed.ok)
            return completed;
        return detail === "summary"
            ? projectRetainedAnalysis(completed.value, retention, view === undefined
                ? { kind: "summary" }
                : { kind: "apk-signature", ...view })
            : completed;
    }
}
