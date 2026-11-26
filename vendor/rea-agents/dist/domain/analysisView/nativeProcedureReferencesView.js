import { z } from "zod";
import { canonicalJson } from "../comparisonSemantics.js";
import { jsonValueSchema } from "../jsonValue.js";
import { procedureIdentitySchema } from "../native/procedureInfo.js";
import { referenceEdgeSchema, unresolvedCallSchema, } from "../native/nativeReference.js";
import { procedureReferencesSchema } from "../native/procedureReferences.js";
import { err, ok } from "../result.js";
import { createAnalysisViewResultReader, } from "./analysisViewParent.js";
import { assertOwnedView, } from "./analysisViewShape.js";
import { analysisViewInputError } from "./analysisViewErrors.js";
import { AnalysisResourceConstraintError } from "../analysisErrorCore.js";
import { jsonValueByteLength } from "../jsonValueByteLength.js";
import { boundedViewMessages, completeWithinViewCoverage, pageViewCoverage, } from "./analysisViewCoverage.js";
const page = {
    kind: z.literal("native-procedure-references"),
    offset: z.int().nonnegative().default(0),
    limit: z.int().positive().default(64),
};
export const procedureReferenceViewRequests = {
    references: z.strictObject({
        ...page,
        collection: z.literal("references"),
        source_address: z
            .string()
            .min(1)
            .optional()
            .describe("Match an exact retained source address."),
        target_address: z
            .string()
            .min(1)
            .optional()
            .describe("Match an exact retained target address."),
    }),
    unresolved_calls: z.strictObject({
        ...page,
        collection: z.literal("unresolved_calls"),
    }),
};
export const nativeProcedureReferencesViewRequestSchema = z.discriminatedUnion("collection", [
    procedureReferenceViewRequests.references,
    procedureReferenceViewRequests.unresolved_calls,
]);
const endpointSchema = z.discriminatedUnion("kind", [
    z.strictObject({ kind: z.literal("null") }),
    z.strictObject({ kind: z.literal("selected-procedure") }),
    z.strictObject({
        kind: z.literal("shared"),
        index: z.int().nonnegative(),
    }),
]);
const rowSchema = referenceEdgeSchema.extend({
    source_procedure: endpointSchema,
    target_procedure: endpointSchema,
    source_index: z.int().nonnegative(),
});
export const procedureReferenceViewItems = {
    references: z.strictObject({
        collection: z.literal("references"),
        endpoints: z.array(procedureIdentitySchema),
        rows: z.array(rowSchema),
    }),
    unresolved_calls: z.strictObject({
        collection: z.literal("unresolved_calls"),
        rows: z.array(z.strictObject({
            source_index: z.int().nonnegative(),
            value: unresolvedCallSchema,
        })),
    }),
};
export const procedureReferenceSummarySchema = z.strictObject({
    procedure: procedureIdentitySchema,
    direction: z.enum(["incoming", "outgoing"]),
    reference_kinds_available: z.boolean(),
    reference_count: z.int().nonnegative(),
    unresolved_call_count: z.int().nonnegative(),
});
const readSource = createAnalysisViewResultReader(procedureReferencesSchema);
// The analysis-view projection allowance leaves room for Evidence and MCP
// encoding expansion. Count JSON without serializing the full page.
const PAGE_BYTES = 1024 * 1024;
const DIGEST_BYTES = jsonValueByteLength({ view_digest: "0".repeat(64) }) - 1;
/** Page the retained result without re-querying the provider or changing source coverage. */
export const projectNativeProcedureReferencesView = (parent, view) => {
    if (view.kind !== "summary" && view.kind !== "native-procedure-references")
        return err(analysisViewInputError([
            {
                path: ["view"],
                reason: "invalid_value",
                message: "Procedure-reference Evidence supports summary and native-procedure-references views.",
            },
        ]));
    assertOwnedView(view, "summary", "native-procedure-references");
    const parsed = readSource(parent);
    if (!parsed.ok)
        return parsed;
    const source = parsed.value;
    const summary = {
        procedure: source.procedure,
        direction: source.direction,
        reference_kinds_available: source.reference_kinds_available,
        reference_count: source.references.length,
        unresolved_call_count: source.unresolved_calls.length,
    };
    const shared = {
        parent_evidence_id: parent.evidenceId,
        parent_operation: "procedure_references",
        parent_digest: parent.evidenceId.slice(3),
        artifact: parent.artifact ?? null,
        source_provider: parent.provider ?? null,
        source_analysis_profile_digest: parent.analysisProfile?.digest ?? null,
        source_parameters: jsonValueSchema.parse(parent.parameters ?? null),
        limitations: boundedViewMessages(parent.limitations, parent.evidenceId, "limitations"),
        unknowns: [
            "Page coverage describes retained references, not provider discovery completeness or runtime execution.",
        ],
    };
    const tooLarge = () => err(new AnalysisResourceConstraintError("inspect_analysis_view", "transport", "The selected procedure-reference view cannot fit the analysis-view byte budget.", { parent_evidence_id: parent.evidenceId, limit_bytes: PAGE_BYTES }, {
        retryable: false,
        remediationAction: "An individual row or the page context exceeds the fixed 1,048,576-byte projection allowance. Use the complete input Evidence or its local bundle, or retrieve or export the retained parent by the reported ID. If a CLI failure includes a partial observation, that observation is the completed parent.",
    }));
    if (view.kind === "summary") {
        const result = {
            ...shared,
            kind: "summary",
            view,
            summary,
            coverage: completeWithinViewCoverage(1),
        };
        return jsonValueByteLength(result, PAGE_BYTES - DIGEST_BYTES) >
            PAGE_BYTES - DIGEST_BYTES
            ? tooLarge()
            : ok(result);
    }
    const common = {
        ...shared,
        kind: "native-procedure-references",
        view,
        summary,
    };
    const header = {
        ...common,
        items: view.collection === "references"
            ? { collection: view.collection, endpoints: [], rows: [] }
            : { collection: view.collection, rows: [] },
        byte_limited: false,
        coverage: {
            status: "complete-within-view",
            examined: Number.MAX_SAFE_INTEGER,
            total: Number.MAX_SAFE_INTEGER,
            next_offset: Number.MAX_SAFE_INTEGER,
            exhausted: false,
        },
    };
    let bytes = DIGEST_BYTES +
        jsonValueByteLength(header, PAGE_BYTES - DIGEST_BYTES);
    if (bytes > PAGE_BYTES)
        return tooLarge();
    const referenceRows = [];
    const unresolvedRows = [];
    let byteLimited = false;
    const offer = (row, accepted, extra = 0) => {
        const size = jsonValueByteLength(row, PAGE_BYTES - bytes) +
            (accepted > 0 ? 1 : 0) +
            extra;
        if (bytes + size > PAGE_BYTES) {
            byteLimited = true;
            return false;
        }
        bytes += size;
        return true;
    };
    if (view.collection === "unresolved_calls") {
        const calls = source.unresolved_calls;
        const end = Math.min(calls.length, view.offset + view.limit);
        for (let index = view.offset; index < end; index += 1) {
            const value = calls[index];
            if (value === undefined)
                break;
            const row = { source_index: index, value };
            if (!offer(row, unresolvedRows.length))
                break;
            unresolvedRows.push(row);
        }
        if (byteLimited && unresolvedRows.length === 0)
            return tooLarge();
        return ok({
            ...common,
            view,
            items: { collection: "unresolved_calls", rows: unresolvedRows },
            byte_limited: byteLimited,
            coverage: pageViewCoverage(view.offset, unresolvedRows.length, calls.length),
        });
    }
    const selected = canonicalJson(source.procedure);
    const endpoints = [];
    const endpointIndexes = new Map();
    let longestIdentityBytes = Buffer.byteLength(selected);
    const planEndpoints = (sourceProcedure, targetProcedure) => {
        const pending = [];
        const pendingKeys = [];
        let extra = 0;
        let overflow = false;
        const resolve = (value) => {
            if (value === null)
                return { kind: "null" };
            const comma = endpoints.length + pending.length > 0 ? 1 : 0;
            const measured = jsonValueByteLength(value, Math.max(0, PAGE_BYTES - bytes - extra));
            const size = measured + comma;
            // `measured` is a UTF-8 lower bound. It can skip canonicalization only
            // when it already exceeds every stored identity's UTF-8 length.
            if (bytes + extra + size > PAGE_BYTES &&
                measured > longestIdentityBytes) {
                overflow = true;
                return undefined;
            }
            const key = canonicalJson(value);
            if (key === selected)
                return { kind: "selected-procedure" };
            const existing = endpointIndexes.get(key);
            if (existing !== undefined)
                return { kind: "shared", index: existing };
            const pendingIndex = pendingKeys.indexOf(key);
            if (pendingIndex !== -1)
                return {
                    kind: "shared",
                    index: endpoints.length + pendingIndex,
                };
            if (bytes + extra + size > PAGE_BYTES) {
                overflow = true;
                return undefined;
            }
            extra += size;
            pending.push(value);
            pendingKeys.push(key);
            const keyBytes = Buffer.byteLength(key);
            if (keyBytes > longestIdentityBytes)
                longestIdentityBytes = keyBytes;
            return {
                kind: "shared",
                index: endpoints.length + pending.length - 1,
            };
        };
        const resolvedSource = resolve(sourceProcedure);
        const resolvedTarget = resolve(targetProcedure);
        if (overflow ||
            resolvedSource === undefined ||
            resolvedTarget === undefined)
            return { overflow: true };
        return {
            overflow: false,
            resolvedSource,
            resolvedTarget,
            pending,
            pendingKeys,
            extra,
        };
    };
    const filtered = view.source_address !== undefined || view.target_address !== undefined;
    const references = source.references;
    const visit = function* () {
        if (!filtered) {
            const end = Math.min(references.length, view.offset + view.limit);
            for (let index = view.offset; index < end; index += 1) {
                const reference = references[index];
                if (reference !== undefined)
                    yield [index, reference];
            }
            return;
        }
        let seen = 0;
        for (const [index, reference] of references.entries()) {
            if ((view.source_address !== undefined &&
                reference.source_address !== view.source_address) ||
                (view.target_address !== undefined &&
                    reference.target_address !== view.target_address))
                continue;
            if (seen >= view.offset && seen < view.offset + view.limit)
                yield [index, reference];
            seen += 1;
        }
    };
    let filteredTotal = 0;
    if (filtered) {
        for (const reference of references) {
            if ((view.source_address === undefined ||
                reference.source_address === view.source_address) &&
                (view.target_address === undefined ||
                    reference.target_address === view.target_address))
                filteredTotal += 1;
        }
    }
    for (const [index, reference] of visit()) {
        const planned = planEndpoints(reference.source_procedure, reference.target_procedure);
        if (planned.overflow) {
            byteLimited = true;
            break;
        }
        const row = {
            ...reference,
            source_index: index,
            source_procedure: planned.resolvedSource,
            target_procedure: planned.resolvedTarget,
        };
        if (!offer(row, referenceRows.length, planned.extra))
            break;
        for (const [offset, value] of planned.pending.entries()) {
            endpointIndexes.set(planned.pendingKeys[offset], endpoints.length);
            endpoints.push(value);
        }
        referenceRows.push(row);
    }
    if (byteLimited && referenceRows.length === 0)
        return tooLarge();
    return ok({
        ...common,
        view,
        items: {
            collection: "references",
            endpoints,
            rows: referenceRows,
        },
        byte_limited: byteLimited,
        coverage: pageViewCoverage(view.offset, referenceRows.length, filtered ? filteredTotal : references.length),
    });
};
