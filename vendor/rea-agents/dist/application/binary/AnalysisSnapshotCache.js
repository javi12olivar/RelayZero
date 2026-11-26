import { HOST_PLATFORM } from "../../platform/HostPlatform.js";
import { EvidenceIntegrityError, AnalysisSnapshotMismatchError, } from "../../domain/evidenceErrors.js";
import { NoBinaryOpenError } from "../../domain/configurationErrors.js";
import { evidenceSubject, evidenceSubjectDisplay, evidenceSubjectTarget, rebindEvidenceSubjectTargetPath, } from "../../domain/evidence.js";
import { sameTargetIdentity, unknownTarget, } from "../../domain/targetIdentity.js";
import { err, ok } from "../../domain/result.js";
import { analysisQueryId, evidenceMatchesEntry, evidenceMatchesWorkflowEntry, createAnalysisSnapshotEntry, createAnalysisSnapshotWorkflowEntry, snapshotBinding, snapshotBindingMismatch, snapshotMatchesProfile, snapshotTarget, parseAnalysisSnapshot, immutableAnalysisSnapshot, } from "../../domain/analysisSnapshot.js";
import { OFFICIAL_TOOL_CONTRACTS } from "../../contracts/officialToolContracts.js";
import { compareUnicodeCodePoints } from "../../domain/unicodeCodePointOrder.js";
import { snapshotReplayBinding, } from "./AnalysisSnapshotReplayBinding.js";
import { createInvestigationEvidenceClosureChecker } from "../investigation/InvestigationEvidence.js";
const RELATIONSHIP_OPERATIONS = new Set([
    "procedure_callers",
    "procedure_callees",
]);
// These reports depend on selected bundle resources or loader context beyond
// the immutable executable identity carried by a binary analysis snapshot.
const RESOURCE_SCOPED_OPERATIONS = new Set([
    "decode_interface_builder",
    "inspect_asset_catalog",
    "inspect_keyed_archive",
    "trace_dylib_resolution",
]);
const STATEFUL_OPERATIONS = new Set([
    "health",
    "current_address",
    "current_procedure",
    "current_document",
    "goto_address",
    "list_documents",
]);
const CURSOR_DEFAULT_OPERATIONS = new Set([
    "address_name",
    "comment",
    "inline_comment",
    "next_address",
    "prev_address",
    "xrefs",
]);
const DOCUMENT_SCOPED_OPERATIONS = new Set(OFFICIAL_TOOL_CONTRACTS.map(({ name }) => name).filter((name) => name !== "current_document" && name !== "list_documents"));
/** Maximum duplicated result bindings retained across direct and workflow queries. */
const SNAPSHOT_CACHE_ENTRY_CEILING = 10_000;
/** A file target without its recorded display name, which follows the replayed path. */
const withoutDisplayName = ({ name: _name, ...target }) => target;
const replayDocumentSelected = (operation, parameters) => !DOCUMENT_SCOPED_OPERATIONS.has(operation) ||
    typeof parameters.document === "string";
/** Ghidra's private Program belongs to this one-shot target; GUI defaults do not. */
const isOneShotPseudocode = (operation, descriptor, context) => context === "one-shot-target" &&
    operation === "procedure_pseudo_code" &&
    descriptor?.provider.id === "ghidra";
/**
 * Caller and callee walks omit `document`. Their observations are still
 * Evidence. Other document-scoped reads, including `procedure_pseudo_code`
 * from `decompile_all`, already keep each body in the file-backed export.
 * Copying those bodies into the in-memory ledger would retain the export.
 */
const DOCUMENTLESS_SOURCE_EVIDENCE_OPERATIONS = new Set(["procedure_callers", "procedure_callees"]);
/**
 * Whether a source observation is safe to retain as Evidence.
 * A missing document selector blocks snapshot replay. A producer can require
 * its observation as Evidence independently of whether it can be replayed.
 */
export const isSourceEvidenceRetainable = (operation, descriptor, parameters, options = {}) => !STATEFUL_OPERATIONS.has(operation) &&
    !RESOURCE_SCOPED_OPERATIONS.has(operation) &&
    (!DOCUMENT_SCOPED_OPERATIONS.has(operation) ||
        typeof parameters.document === "string" ||
        DOCUMENTLESS_SOURCE_EVIDENCE_OPERATIONS.has(operation) ||
        options.requiresSourceEvidence === true ||
        isOneShotPseudocode(operation, descriptor, options.snapshotContext)) &&
    (!CURSOR_DEFAULT_OPERATIONS.has(operation) ||
        typeof parameters.address === "string") &&
    descriptor?.effects.mutatesArtifact === false &&
    (options.requiresSourceEvidence === true ||
        descriptor.cachePolicy === "snapshot" ||
        descriptor.effects.mayWriteFilesystem === false) &&
    descriptor.effects.changesPermissions === false;
/** Explicit standalone decompiles must run even if a snapshot has a matching entry. */
export const requestsStandaloneDecompile = (operation, parameters) => operation === "procedure_pseudo_code" &&
    (parameters.analysis === "independent_fresh" ||
        parameters.analysis === "call_destination");
/** Whether an observation can additionally be replayed as a snapshot. */
export const isSnapshotCacheable = (operation, descriptor, parameters, context) => !requestsStandaloneDecompile(operation, parameters) &&
    isSourceEvidenceRetainable(operation, descriptor, parameters, {
        snapshotContext: context,
    }) &&
    (replayDocumentSelected(operation, parameters) ||
        isOneShotPseudocode(operation, descriptor, context)) &&
    descriptor.cachePolicy !== "live";
/** Windows Ghidra must admit the selected source through its native snapshot owner. */
export const requiresNativeSourceAdmissionBeforeReplay = (providerId) => HOST_PLATFORM.platform === "win32" && providerId === "ghidra";
/** Limitation that marks every observation replayed from a snapshot. */
const SNAPSHOT_REPLAY_LIMITATION = "Loaded from a local REA analysis snapshot; this call did not re-run the provider.";
/** Bounded in-memory cache for one immutable binary identity. */
export class AnalysisSnapshotCache {
    #entries = new Map();
    // Null is ambiguous provenance; a pending ID is an exact parent whose source
    // closure was missing and can be checked again against the owning ledger.
    #replayBindings = new Map();
    #workflowEntries = new Map();
    #target;
    #binding;
    /** Whether staged entries belong to the supplied target and profile. */
    matches(target, profile) {
        return this.mismatch(target, profile) === undefined;
    }
    /** Explain staged mismatch without treating missing binding facts as absent. */
    mismatch(target, profile) {
        if (this.#target === undefined && this.#binding === undefined)
            return undefined;
        if (this.#target === undefined || this.#binding === undefined)
            return { staged_binding: "incomplete" };
        return snapshotBindingMismatch({ target: this.#target, binding: this.#binding }, target, profile);
    }
    /** Replace cache state when the target or selected profile changes. */
    select(target, profile) {
        if (!this.matches(target, profile))
            this.#clearEntries();
        this.#target = snapshotTarget(target);
        this.#binding = snapshotBinding(profile);
    }
    /** Merge already-validated entries and return the new-entry count. */
    stage(snapshot) {
        snapshot = immutableAnalysisSnapshot(snapshot);
        if ((this.#target !== undefined &&
            !sameTargetIdentity(this.#target.identity, snapshot.target.identity)) ||
            (this.#binding !== undefined &&
                !snapshotMatchesProfile(this.#binding, snapshot.binding.analysis_profile)))
            this.#clearEntries();
        this.#target = structuredClone(snapshot.target);
        this.#binding = structuredClone(snapshot.binding);
        let imported = 0;
        const stagedQueryIds = new Set();
        for (const entry of snapshot.entries) {
            if (!this.#entries.has(entry.query_id) && !this.#hasCapacity())
                continue;
            if (!this.#entries.has(entry.query_id))
                imported += 1;
            this.#entries.set(entry.query_id, entry);
            stagedQueryIds.add(entry.query_id);
            this.#replayBindings.delete(entry.query_id);
        }
        // Snapshot validation authenticated these records. Recover the original
        // identity before lookup adds replay caveats; do not mint a new record.
        const evidenceByQuery = new Map();
        const records = new Map(snapshot.evidence_bundle.records.map((record) => [
            record.evidence_id,
            record,
        ]));
        const lookup = (id) => records.get(id);
        const checkClosure = createInvestigationEvidenceClosureChecker({
            evidenceForAnalysis: lookup,
        });
        const ambiguous = new Set();
        for (const evidence of snapshot.evidence_bundle.records) {
            const queryId = analysisQueryId(snapshot.target, snapshot.binding, evidence.operation, evidence.parameters);
            if (!stagedQueryIds.has(queryId))
                continue;
            const entry = this.#entries.get(queryId);
            if (entry === undefined ||
                !evidenceMatchesEntry(evidence, entry, snapshot))
                continue;
            const previous = evidenceByQuery.get(queryId);
            if (previous !== undefined &&
                previous.evidence_id !== evidence.evidence_id)
                ambiguous.add(queryId);
            else
                evidenceByQuery.set(queryId, evidence);
        }
        for (const [queryId, evidence] of evidenceByQuery) {
            if (ambiguous.has(queryId)) {
                this.#replayBindings.set(queryId, null);
                continue;
            }
            this.#replayBindings.set(queryId, snapshotReplayBinding(evidence, lookup, checkClosure) ?? {
                pendingEvidenceId: evidence.evidence_id,
            });
        }
        for (const entry of snapshot.workflow_entries) {
            if (!this.#workflowEntries.has(entry.query_id) && !this.#hasCapacity())
                continue;
            if (!this.#workflowEntries.has(entry.query_id))
                imported += 1;
            this.#workflowEntries.set(entry.query_id, entry);
        }
        return imported;
    }
    /** Refresh subject bindings backed by replaced authenticated metadata. */
    refreshEvidenceMetadata(replacements) {
        if (replacements.length === 0 ||
            this.#target === undefined ||
            this.#binding === undefined)
            return;
        const currentRecords = new Map(replacements.map(({ current }) => [current.evidence_id, current]));
        for (const [queryId, binding] of this.#replayBindings) {
            if (binding === null ||
                "pendingEvidenceId" in binding ||
                binding.sourceEvidence === undefined)
                continue;
            const sources = binding.sourceEvidence;
            if (!sources.some((source) => currentRecords.has(source.evidence_id)))
                continue;
            this.#replayBindings.set(queryId, {
                evidenceId: binding.evidenceId,
                sourceEvidence: Object.freeze(sources.map((source) => currentRecords.get(source.evidence_id) ?? source)),
            });
        }
        const header = { target: this.#target, binding: this.#binding };
        for (const { previous, current } of replacements) {
            const display = evidenceSubjectDisplay(current);
            if (display === undefined ||
                evidenceSubjectDisplay(previous)?.local_path === display.local_path)
                continue;
            const queryId = analysisQueryId(header.target, header.binding, previous.operation, previous.parameters);
            const entry = this.#entries.get(queryId);
            const entryIdentity = entry?.execution.subject.identity;
            if (entry !== undefined &&
                entryIdentity?.kind === "file" &&
                evidenceMatchesEntry(previous, entry, header))
                this.#entries.set(queryId, {
                    ...entry,
                    execution: {
                        ...entry.execution,
                        subject: { identity: entryIdentity, ...display },
                    },
                });
            const workflow = this.#workflowEntries.get(queryId);
            const workflowIdentity = workflow?.execution.subject.identity;
            if (workflow !== undefined &&
                workflowIdentity?.kind === "file" &&
                evidenceMatchesWorkflowEntry(previous, workflow, header))
                this.#workflowEntries.set(queryId, {
                    ...workflow,
                    execution: {
                        ...workflow.execution,
                        subject: { identity: workflowIdentity, ...display },
                    },
                });
        }
    }
    /** Build a complete snapshot for an active target. */
    export(target, profile, evidenceBundle) {
        if (target === undefined || profile === undefined)
            return err(new NoBinaryOpenError());
        try {
            const persistedTarget = snapshotTarget(target);
            const namesTarget = (subject) => subject.identity.kind === "file" &&
                subject.identity.sha256 === target.sha256;
            const binding = snapshotBinding(profile);
            // In-memory replay can preserve unbound and child-artifact observations.
            // A persisted target snapshot can authenticate only rows whose Evidence
            // has that target subject; the record owner applies the same scope to its bundle.
            const entries = [...this.#entries.values()]
                .filter((entry) => namesTarget(entry.execution.subject))
                .sort((left, right) => compareUnicodeCodePoints(left.query_id, right.query_id));
            const workflows = [...this.#workflowEntries.values()]
                .filter((entry) => namesTarget(entry.execution.subject))
                .sort((left, right) => compareUnicodeCodePoints(left.query_id, right.query_id));
            // Parsing owns the returned JSON and metadata; pre-cloning the same
            // payloads here only adds another full materialization.
            return ok(parseAnalysisSnapshot({
                target: persistedTarget,
                binding,
                entries,
                workflow_entries: workflows,
                evidence_bundle: evidenceBundle,
            }));
        }
        catch (cause) {
            return err(new EvidenceIntegrityError("Analysis snapshot validation failed", {
                cause,
            }));
        }
    }
    /** Validate target identity, merge evidence atomically, then stage entries. */
    import(snapshot, active, mergeEvidence) {
        let validated;
        try {
            validated = immutableAnalysisSnapshot(snapshot);
        }
        catch (cause) {
            return err(new EvidenceIntegrityError("Analysis snapshot validation failed", {
                cause,
            }));
        }
        if (active !== undefined) {
            const mismatch = snapshotBindingMismatch(validated, active.target, active.profile);
            if (mismatch !== undefined)
                return err(new AnalysisSnapshotMismatchError("Analysis snapshot target, provider, or analysis profile does not match the active binary", mismatch));
        }
        const importedEvidence = mergeEvidence(validated.evidence_bundle);
        return importedEvidence.ok ? ok(this.stage(validated)) : importedEvidence;
    }
    /** Return canonical entries for persistence. */
    entries() {
        return [...this.#entries.values()]
            .sort((left, right) => compareUnicodeCodePoints(left.query_id, right.query_id))
            .map((entry) => structuredClone(entry));
    }
    /** Return canonical composed-workflow entries for persistence. */
    workflowEntries() {
        return [...this.#workflowEntries.values()]
            .sort((left, right) => compareUnicodeCodePoints(left.query_id, right.query_id))
            .map((entry) => structuredClone(entry));
    }
    /** Record one exact derived workflow result unless the shared cache is full. */
    recordWorkflow(input) {
        this.select(input.target, input.profile);
        const queryId = analysisQueryId(snapshotTarget(input.target), snapshotBinding(input.profile), input.operation, input.parameters);
        if (!this.#workflowEntries.has(queryId) && !this.#hasCapacity())
            return;
        const entry = createAnalysisSnapshotWorkflowEntry({
            target: snapshotTarget(input.target),
            binding: snapshotBinding(input.profile),
            operation: input.operation,
            parameters: input.parameters,
            execution: input.execution,
        });
        this.#workflowEntries.set(entry.query_id, entry);
    }
    /** Replay an exact provider-specific query, marking its cached provenance. */
    lookup(target, profile, operation, parameters, lookup) {
        const queryId = analysisQueryId(snapshotTarget(target), snapshotBinding(profile), operation, parameters);
        const cached = this.#entries.get(queryId);
        if (cached === undefined)
            return undefined;
        let binding = this.#replayBindings.get(queryId);
        // Do not turn a refused provenance selection into a fresh, unlinked record.
        // The provider must produce a new observation before this query can replay.
        if (binding === null)
            return undefined;
        if (binding !== undefined && "pendingEvidenceId" in binding) {
            const parent = lookup?.(binding.pendingEvidenceId);
            if (parent === undefined || lookup === undefined)
                return undefined;
            const restored = snapshotReplayBinding(parent, lookup);
            if (restored === null)
                return undefined;
            this.#replayBindings.set(queryId, restored);
            binding = restored;
        }
        // Replay names the file at the current path; its display name follows
        // that path, as the live observation's would.
        const cachedTarget = evidenceSubjectTarget(cached.execution.subject);
        const subject = cachedTarget === undefined
            ? null
            : rebindEvidenceSubjectTargetPath(withoutDisplayName(cachedTarget), target);
        const execution = structuredClone({
            ...(binding === undefined ? {} : { evidenceId: binding.evidenceId }),
            result: cached.execution.result,
            rawResult: cached.execution.raw_result,
            provider: cached.execution.provider,
            analysisProfile: structuredClone(profile),
            limitations: [
                ...cached.execution.limitations,
                SNAPSHOT_REPLAY_LIMITATION,
            ],
            ...(cached.execution.relationship_coverage === null &&
                RELATIONSHIP_OPERATIONS.has(operation)
                ? {
                    relationshipCoverage: {
                        status: "unknown",
                        reason: "Snapshot entry does not report relationship coverage.",
                    },
                }
                : cached.execution.relationship_coverage === null
                    ? {}
                    : {
                        relationshipCoverage: cached.execution.relationship_coverage,
                    }),
            locations: cached.execution.locations,
            subject: subject ?? null,
        });
        return binding?.sourceEvidence === undefined
            ? execution
            : { ...execution, sourceEvidence: binding.sourceEvidence };
    }
    /** Record one successful immutable call unless the cache is full. */
    record(input, lookup) {
        const { target, profile, operation, parameters, execution } = input;
        this.select(target, profile);
        // The snapshot format does not carry reference truncation or stored-pointer
        // classifications. Replaying either would present a capped or untyped read
        // as the live observation.
        if (execution.referencesTruncated === true ||
            execution.referenceClassifications !== undefined ||
            execution.referenceCoverageGaps !== undefined)
            return;
        let sourceBinding;
        if ((execution.sourceEvidence?.length ?? 0) > 0) {
            if (execution.evidenceId === undefined || lookup === undefined)
                return;
            const parent = lookup(execution.evidenceId);
            if (parent === undefined)
                return;
            const closed = snapshotReplayBinding(parent, lookup);
            if (closed === null)
                return;
            sourceBinding = closed;
        }
        const queryId = analysisQueryId(snapshotTarget(target), snapshotBinding(profile), operation, parameters);
        if (!this.#entries.has(queryId) && !this.#hasCapacity())
            return;
        const entry = createAnalysisSnapshotEntry({
            target: snapshotTarget(target),
            binding: snapshotBinding(profile),
            operation,
            parameters,
            execution: {
                ...execution,
                subject: evidenceSubject(execution.subject === undefined
                    ? target
                    : (execution.subject ?? unknownTarget("not-observed"))),
            },
        });
        this.#entries.set(entry.query_id, entry);
        if (execution.evidenceId === undefined)
            this.#replayBindings.delete(entry.query_id);
        else
            this.#replayBindings.set(entry.query_id, sourceBinding ?? {
                evidenceId: execution.evidenceId,
                ...(input.evidence === undefined
                    ? {}
                    : { sourceEvidence: Object.freeze([input.evidence]) }),
            });
    }
    /** Forget all target-bound entries. */
    clear() {
        this.#clearEntries();
        this.#target = undefined;
        this.#binding = undefined;
    }
    #clearEntries() {
        this.#entries.clear();
        this.#replayBindings.clear();
        this.#workflowEntries.clear();
    }
    #hasCapacity() {
        return (this.#entries.size + this.#workflowEntries.size <
            SNAPSHOT_CACHE_ENTRY_CEILING);
    }
}
