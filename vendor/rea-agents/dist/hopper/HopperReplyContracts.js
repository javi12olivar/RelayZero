import { z } from "zod";
import { AnalysisOutputError } from "../domain/analysisErrorCore.js";
import { DEFAULT_BRIDGE_MAX_REQUEST_BYTES } from "../domain/analysisResourceLimits.js";
import { HopperProtocolError } from "./HopperErrors.js";
import { analysisBookmarkSchema, nativeInventoryRowsSchemas, } from "../domain/native/nativeInventory.js";
import { nativeObservationSourceSchemas } from "../domain/native/nativeObservation.js";
import { nativeByteReadSchema } from "../domain/native/nativeByteRead.js";
import { nativeCallClassificationSchema } from "../domain/native/nativeCallReference.js";
import { functionDossierSchema, functionInstructionWindowSchema, } from "../domain/native/functionDossier.js";
import { referenceEdgeSchema, unresolvedCallSchema, } from "../domain/native/nativeReference.js";
import { outputContractDiagnostics } from "../domain/native/nativeProviderOutput.js";
import { nativeSegmentListSchema } from "../domain/native/nativeSegments.js";
import { procedureIdentitySchema, procedureInfoSchema, } from "../domain/native/procedureInfo.js";
import { err, ok } from "../domain/result.js";
import { HOPPER_OPERATIONS } from "./HopperProviderMetadata.js";
const hopperOperations = new Set([
    ...HOPPER_OPERATIONS,
    "health",
]);
/** Whether Hopper serves this operation. */
export const isHopperOperation = (operation) => hopperOperations.has(operation);
/** The bridge method that serves an analyst operation. */
export const hopperBridgeMethod = (operation) => operation === "procedure_callers" ? "rea_caller_base" : operation;
const nullableText = z.string().nullable();
/** The native file mapping before REA binds it to the admitted source bytes. */
const fileOffsetObservationSchema = z.strictObject({
    address: z.string().regex(/^0x[0-9a-f]+$/u),
    provider_file_offset: z.int().nonnegative().max(Number.MAX_SAFE_INTEGER),
    provider_source_path: z.string().nullable(),
    provider_image_header_hex: z
        .string()
        .regex(/^[a-f0-9]{24}$/u)
        .nullable(),
});
const compactEdgeSchema = z.strictObject({
    source_address: z.string(),
    target_address: z.string(),
    source_procedure: z.union([
        z.literal("caller"),
        procedureIdentitySchema,
        z.null(),
    ]),
    target_procedure: z.string(),
    call: nativeCallClassificationSchema,
});
/**
 * The bridge's shutdown reply (bridge/hopper_bridge.py `_dispatch`): analysis
 * and document state, plus whether the document was deliberately retained or
 * the owned process group must be cleaned up by REA.
 */
const shutdownReplySchema = z.object({
    shutdown: z.literal(true),
    analysis_stopped: z.boolean(),
    document_closed: z.boolean(),
    document_retained: z.literal(true).exactOptional(),
    cleanup_required: z.literal(true).exactOptional(),
});
/**
 * The bridge's health reply (bridge/hopper_bridge.py `_dispatch`): its fixed
 * name, the per-launch run identifier, its process and its request ceiling.
 * An omitted ceiling means the 16 MiB default.
 */
const healthReplySchema = z.object({
    name: z.literal("REA Hopper bridge"),
    version: z.string(),
    run_id: z.string(),
    process_id: z.int().positive(),
    max_request_bytes: z.int().positive().exactOptional(),
});
const callerScanTargetSchema = z.strictObject({
    target: procedureIdentitySchema,
    instructions: z.array(z.string()),
    instructions_complete: z.boolean(),
});
/**
 * Bridge reply contracts, keyed by method and built from the shared native
 * domain schemas. A reply is validated once here, before any consumer reads it.
 */
export const hopperReplySchemas = {
    address_name: nullableText,
    comment: nullableText,
    inline_comment: nullableText,
    current_address: z.string(),
    current_document: z.string(),
    current_procedure: z.string(),
    goto_address: z.string(),
    next_address: z.string(),
    prev_address: z.string(),
    list_bookmarks: z.array(analysisBookmarkSchema),
    list_documents: z.array(z.string()),
    procedure_address: nativeObservationSourceSchemas.procedure_address,
    procedure_assembly: z.string(),
    procedure_callees: nativeObservationSourceSchemas.procedure_callees,
    procedure_pseudo_code: nullableText,
    xrefs: nativeObservationSourceSchemas.xrefs,
    set_address_name: z.boolean(),
    set_addresses_names: z.record(z.string(), z.boolean()),
    set_bookmark: z.boolean(),
    set_comment: z.boolean(),
    set_inline_comment: z.boolean(),
    unset_bookmark: z.boolean(),
    list_names: nativeInventoryRowsSchemas.names,
    list_procedures: nativeInventoryRowsSchemas.names,
    search_procedures: nativeInventoryRowsSchemas.names,
    list_strings: nativeInventoryRowsSchemas.strings,
    search_strings: nativeInventoryRowsSchemas.strings,
    list_segments: nativeSegmentListSchema,
    procedure_info: procedureInfoSchema,
    read_bytes: nativeByteReadSchema,
    read_function_instructions: functionInstructionWindowSchema,
    resolve_containing_procedure: nativeObservationSourceSchemas.resolve_containing_procedure,
    address_to_file_offset: fileOffsetObservationSchema,
    analyze_function: functionDossierSchema,
    procedure_references: z.strictObject({
        procedure: procedureIdentitySchema,
        direction: z.enum(["incoming", "outgoing"]),
        reference_kinds_available: z.boolean(),
        unresolved_calls: z.array(unresolvedCallSchema),
        references: z.array(referenceEdgeSchema),
    }),
    // REA-private lifecycle methods.
    health: healthReplySchema,
    shutdown: shutdownReplySchema,
    shutdown_document: shutdownReplySchema,
    // REA-private bridge methods behind procedure_callers reconciliation.
    rea_caller_base: callerScanTargetSchema.extend({
        callers: z.array(z.string()),
        callers_complete: z.boolean(),
    }),
    rea_caller_scan_target: callerScanTargetSchema,
    rea_caller_scan_page: z.strictObject({
        start: z.int().nonnegative(),
        next: z.int().nonnegative(),
        total: z.int().nonnegative(),
        oversized: z.boolean(),
        items: z.array(z.strictObject({
            caller: procedureIdentitySchema,
            callees: z.array(z.string()),
            references: z.array(compactEdgeSchema),
        })),
    }),
};
/**
 * A validated reply as JSON. `parseHopperReply` returns the bridge's decoded
 * JSON value unchanged, so every reply is a `JsonValue`; zod's output types
 * only spell optional members in a way `JsonValue` does not.
 */
export const hopperReplyJson = (reply) => reply;
/** The production table, checked to keep every reply value unchanged. */
hopperReplySchemas;
/**
 * A bridge reply outside its method's contract. `reply` is the reply exactly
 * as the bridge sent it, kept as partial evidence for callers that retain it.
 */
export class HopperReplyContractError extends AnalysisOutputError {
    method;
    reply;
    constructor(operation, method, reply, cause) {
        super(operation, `Hopper bridge output did not match the ${method} contract`, {
            cause,
            diagnostics: outputContractDiagnostics(cause, reply),
        });
        this.method = method;
        this.reply = reply;
    }
}
/**
 * Validate one bridge reply against its method's contract. The source value is
 * returned unchanged, so Evidence keeps every reported field; a reply outside
 * the contract is an output failure, never passed through. Only the client
 * and this module's lifecycle readers call this; every other consumer receives
 * the typed reply.
 */
export const parseHopperReply = (contracts, method, value, operation) => {
    const parsed = contracts[method].safeParse(value);
    return parsed.success
        ? // The schemas carry no transforms, so the validated source is the
            // parsed value without the object copy that drops unlisted fields.
            ok(value)
        : err(new HopperReplyContractError(operation, method, value, parsed.error));
};
/**
 * What a shutdown reply establishes: the bridge detached with its document
 * closed and analysis stopped, or with the document deliberately retained
 * (`confirmed`); the owned process group still needs REA's cleanup
 * (`cleanup_required`); or nothing (`unconfirmed`). A reply outside the
 * contract is refused with its field diagnostics.
 */
export const parseHopperShutdownReply = (method, value) => {
    const reply = parseHopperReply(hopperReplySchemas, method, value, method);
    if (!reply.ok)
        return reply;
    const { analysis_stopped, document_closed, document_retained } = reply.value;
    if (reply.value.cleanup_required === true)
        return ok("cleanup_required");
    return ok((analysis_stopped && document_closed) ||
        (!document_closed && document_retained === true)
        ? "confirmed"
        : "unconfirmed");
};
/**
 * Read a health reply through its contract and require this launch's run
 * identifier; otherwise the peer is not the bridge REA started.
 */
export const parseHopperServerInfo = (value, expectedRunId) => {
    const reply = parseHopperReply(hopperReplySchemas, "health", value, "health");
    if (!reply.ok || reply.value.run_id !== expectedRunId)
        return err(new HopperProtocolError("Hopper bridge health result is invalid", reply.ok ? {} : { cause: reply.error }));
    return ok({
        name: reply.value.name,
        version: reply.value.version,
        processId: reply.value.process_id,
        maxRequestBytes: reply.value.max_request_bytes ?? DEFAULT_BRIDGE_MAX_REQUEST_BYTES,
    });
};
