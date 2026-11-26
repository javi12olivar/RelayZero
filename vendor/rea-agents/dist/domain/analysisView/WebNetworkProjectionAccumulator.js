import { z } from "zod";
import { Budget } from "../budget.js";
import { fixedAllowanceOptions } from "../fixedAllowanceRemediation.js";
import { AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, } from "../analysisErrorCore.js";
import { compareUnicodeCodePoints as compare } from "../unicodeCodePointOrder.js";
import { err, ok } from "../result.js";
import { safeParseOwnedWebNetworkCapture, } from "../webNetworkCapture.js";
import { admitAnalysisViewData } from "./analysisViewDataAdmission.js";
import { analysisViewInputError } from "./analysisViewErrors.js";
import { analysisInputErrorFromIssues } from "../inputIssueProjection.js";
import { ENTRY_BYTES, textBytes, } from "./webNetworkRouteTemplates.js";
import { evidenceFileTarget } from "../evidence.js";
/** Shared retained/temporary byte accounting for views that group retained HAR records. */
export class WebNetworkProjectionAccumulator {
    maximumBytes;
    budgetSubject;
    operation;
    #limitations = new Set();
    /** Retained state and temporary work share one allowance. */
    #bytes;
    /** The retained and temporary shares of `#bytes`, for their checkpoints. */
    #retained;
    #temporary;
    /** Per-record scratch reservation handed to the shared record readers. */
    scratch = (bytes) => this.temporary(bytes);
    constructor(maximumBytes, budgetSubject, operation = "inspect_analysis_view") {
        this.maximumBytes = maximumBytes;
        this.budgetSubject = budgetSubject;
        this.operation = operation;
        this.#bytes = new Budget(maximumBytes);
        this.#retained = new Budget(maximumBytes);
        this.#temporary = new Budget(maximumBytes);
    }
    #charge(share, bytes) {
        if (!this.#bytes.tryCharge(bytes))
            return false;
        // A share never exceeds the whole, so it always fits.
        return share.tryCharge(bytes);
    }
    #restore(share, mark) {
        this.#bytes.refund(share.restore(mark));
    }
    retain(bytes) {
        return this.#charge(this.#retained, bytes);
    }
    temporary(bytes) {
        return this.#charge(this.#temporary, bytes);
    }
    /**
     * Release the scratch charged by a nested body lease. Leases end in LIFO
     * order and `releaseTemporary` never runs inside one, so the enclosing
     * parse's scratch is still charged when this runs.
     */
    temporaryCheckpoint() {
        const mark = this.#temporary.used;
        return () => {
            this.#restore(this.#temporary, mark);
        };
    }
    /** Mark the retained bytes; the returned call releases what was retained since, once none of it is held. */
    retainedCheckpoint() {
        const mark = this.#retained.used;
        return () => {
            this.#restore(this.#retained, mark);
        };
    }
    /** Per-record strings and descriptors never become cumulative scratch. */
    releaseTemporary() {
        this.#restore(this.#temporary, 0);
    }
    overBudget() {
        return err(new AnalysisResourceConstraintError(this.operation, "memory", `${this.budgetSubject} retained state and temporary work exceed the projection representation budget.`, { output_bytes: this.maximumBytes }, fixedAllowanceOptions("The analysis-view projection allowance", "parser", { limit: this.maximumBytes, unit: "bytes" })));
    }
    /** Reserve schema output and validation scratch while the borrowed parent stays live. */
    admitCaptureClone(value) {
        return admitAnalysisViewData(value, false, (bytes) => this.retain(bytes) ? ok(undefined) : this.overBudget());
    }
    /** Reserve bytes a view derives from the borrowed parent before it allocates them. */
    admitDerivedBytes(bytes) {
        return this.retain(bytes) ? ok(undefined) : this.overBudget();
    }
    /** Admit the complete portable envelope before cloning or authenticating it. */
    admitInlineEvidence(value) {
        return admitAnalysisViewData(value, true, (bytes) => this.retain(bytes) ? ok(undefined) : this.overBudget());
    }
    addLimitations(limitations) {
        const prepared = this.prepareLimitations(limitations);
        if (!prepared.ok)
            return prepared;
        prepared.value();
        return ok(undefined);
    }
    /** Admit record qualifications without publishing them before the record commits. */
    prepareLimitations(limitations) {
        const rollbackAdmission = this.retainedCheckpoint();
        const pending = new Set();
        for (const limitation of limitations) {
            if (this.#limitations.has(limitation) || pending.has(limitation))
                continue;
            if (!this.retain(ENTRY_BYTES + textBytes(limitation.length))) {
                rollbackAdmission();
                return this.overBudget();
            }
            pending.add(limitation);
        }
        return ok(() => {
            for (const limitation of pending)
                this.#limitations.add(limitation);
        });
    }
    /** Derive budgeted qualifications for this snapshot without retaining old snapshots. */
    snapshotLimitations(derived) {
        const release = this.temporaryCheckpoint();
        if (!this.scratch(derived.reduce((bytes, limitation) => bytes + ENTRY_BYTES + textBytes(limitation.length), 0)))
            return this.overBudget();
        try {
            return ok([...new Set([...this.#limitations, ...derived])].sort(compare));
        }
        finally {
            release();
        }
    }
    sortedLimitations() {
        return [...this.#limitations].sort(compare);
    }
}
/** Authenticate and gate a retained HAR parent before a grouping view reads any record. */
export const admitHarCaptureParent = (parent, viewKind, accumulator, context = {}) => {
    const operation = context.operation ?? "inspect_analysis_view";
    const sourceField = context.sourceField ?? "source";
    const unsupported = (reason, remediationAction) => err(new AnalysisUnsupportedTargetError(operation, parent.evidenceId, reason, remediationAction === undefined ? undefined : { remediationAction }));
    if (parent.operation !== "inspect_web_network_capture")
        return unsupported(`View ${viewKind} is unsupported for parent operation ${parent.operation}; ${viewKind} requires ${viewKind === "api-surface" ? "inspect_web_network_capture" : "inspect_web_network_capture or capture_browser_scenario"}.`);
    const admitted = accumulator.admitCaptureClone(parent.normalizedResult);
    if (!admitted.ok)
        return admitted;
    const parsed = safeParseOwnedWebNetworkCapture(parent.normalizedResult);
    if (!parsed.success)
        return err(analysisInputErrorFromIssues(operation, parsed.error.issues.map((issue) => ({
            ...issue,
            path: [sourceField, "normalized_result", ...issue.path],
        })), { [sourceField]: { normalized_result: parent.normalizedResult } }, { cause: parsed.error }));
    if (parsed.data.format !== "har")
        return unsupported(`${viewKind} does not support capture format ${parsed.data.format}.`);
    // Environment views preserve the recorded report path and authenticate its digest;
    // the api-surface view keeps the admission its existing callers rely on.
    const { artifact } = parsed.data;
    const subject = evidenceFileTarget(parent);
    if (viewKind !== "api-surface" &&
        artifact.sha256 !== null &&
        (subject == null || subject.sha256 !== artifact.sha256))
        return err(analysisViewInputError([
            {
                path: ["source", "subject"],
                reason: "invalid_value",
                message: "Capture parent subject must identify the report's SHA-256.",
            },
        ]));
    // The view would write path templates it cannot check against declarations
    // the parent does not retain, so the refusal does not repeat declaration text.
    const declarations = z
        .object({ sensitive_value_count: z.number().int().nonnegative() })
        .safeParse(parent.parameters);
    if (!declarations.success || declarations.data.sensitive_value_count > 0)
        return unsupported("sensitive_values_unretained", "This view cannot safely project this capture because sensitivity declarations are not retained. Use a compatible capture or summary view to inspect retained observations. Do not remove sensitivity declarations to bypass this restriction.");
    return ok(parsed.data);
};
