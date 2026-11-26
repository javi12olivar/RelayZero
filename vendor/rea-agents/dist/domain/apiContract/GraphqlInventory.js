import { digestCanonicalValue } from "../canonicalDigest.js";
import { AnalysisResourceConstraintError } from "../analysisErrorCore.js";
import { API_CONTRACT_FACT_BYTES, API_CONTRACT_OPERATION, } from "./apiContract.js";
import { GRAPHQL_CONTRACT_PROFILE, } from "./graphqlContract.js";
export const graphqlIdentity = (prefix, value) => prefix + "_" + digestCanonicalValue(value);
/** Positions come from the parser's tokens; do not rescan the source per fact. */
export const graphqlSource = (artifact, role, node) => {
    const location = node.loc;
    if (location === undefined)
        throw new Error("The GraphQL parser omitted a required source location.");
    return {
        role,
        sha256: artifact.sha256,
        start_utf16: location.start,
        end_utf16: location.end,
        line: location.startToken.line,
        column: location.startToken.column,
    };
};
/** One read owns compact declarations, bindings, indices and their resource charge. */
export class GraphqlInventory {
    artifact;
    operationArtifact;
    interpreterVersion;
    types = [];
    fields = [];
    definitions = [];
    references = [];
    spreads = [];
    diagnostics = [];
    fieldIdsByStart = new Map();
    schemaDeclarations = "unavailable";
    schemaModel = "unavailable";
    operations;
    roots = {
        query: null,
        mutation: null,
        subscription: null,
    };
    #bytes = 0;
    constructor(artifact, operationArtifact, interpreterVersion, requestedOperations = operationArtifact !== null) {
        this.artifact = artifact;
        this.operationArtifact = operationArtifact;
        this.interpreterVersion = interpreterVersion;
        this.operations = requestedOperations ? "unavailable" : "not-supplied";
    }
    retain(value) {
        this.#bytes += 512 + Buffer.byteLength(JSON.stringify(value)) * 4;
        if (this.#bytes > API_CONTRACT_FACT_BYTES)
            throw new AnalysisResourceConstraintError(API_CONTRACT_OPERATION, "memory", "GraphQL facts exceed the 32 MiB retained representation allowance.", { retained_fact_allowance: API_CONTRACT_FACT_BYTES }, {
                remediationAction: "Select smaller complete schema/operation documents; reply paging does not raise parser allowances.",
            });
    }
    diagnostic(code, message, role, source = null) {
        const row = {
            diagnostic_id: graphqlIdentity("graphql_diagnostic", [
                this.artifact.sha256,
                this.operationArtifact?.sha256 ?? null,
                source,
                role,
                code,
                this.diagnostics.length,
            ]),
            code,
            message,
            source_role: role,
            source,
        };
        this.retain(row);
        this.diagnostics.push(row);
    }
    finish(incomplete = false) {
        let unknownReferences = 0, modelOnly = 0, unresolvedSpreads = 0;
        for (const row of this.references) {
            if (row.state === "unknown")
                unknownReferences++;
            if (row.state === "model-only")
                modelOnly++;
        }
        for (const row of this.spreads)
            if (row.state !== "resolved")
                unresolvedSpreads++;
        const partial = incomplete ||
            this.schemaDeclarations !== "complete" ||
            this.schemaModel !== "constructed" ||
            (this.operations !== "complete" && this.operations !== "not-supplied") ||
            unknownReferences > 0 ||
            unresolvedSpreads > 0 ||
            this.diagnostics.length > 0;
        return {
            kind: "graphql-contract",
            format: "graphql-sdl",
            contract_id: graphqlIdentity("graphql_contract", [
                this.artifact.sha256,
                this.operationArtifact?.sha256 ?? null,
                GRAPHQL_CONTRACT_PROFILE,
            ]),
            decoder_profile: GRAPHQL_CONTRACT_PROFILE,
            interpreter: { id: "graphql-js", version: this.interpreterVersion },
            artifact: this.artifact,
            operations_artifact: this.operationArtifact,
            offset_units: "utf16-code-units",
            model_roots: this.roots,
            types: this.types,
            fields: this.fields,
            definitions: this.definitions,
            references: this.references,
            fragment_spreads: this.spreads,
            diagnostics: this.diagnostics,
            summary: {
                types: this.types.length,
                fields: this.fields.length,
                definitions: this.definitions.length,
                references: this.references.length,
                unknown_references: unknownReferences,
                model_only_references: modelOnly,
                fragment_spreads: this.spreads.length,
                unresolved_spreads: unresolvedSpreads,
                diagnostics: this.diagnostics.length,
            },
            source_coverage: {
                status: partial ? "partial" : "complete-within-scope",
                schema_declarations: this.schemaDeclarations,
                schema_model: this.schemaModel,
                operations: incomplete && this.operations === "complete"
                    ? "partial"
                    : this.operations,
                operation_validation: "field-resolution-only",
                endpoint_behavior: "unknown",
            },
            limitations: [
                ...(incomplete
                    ? [
                        "Import stopped before the requested interpretation completed; retained rows are partial observations.",
                    ]
                    : []),
                "Facts describe supplied SDL and operation text. Schema field bindings are derivations from that SDL and the identified GraphQL library model; reachability, execution and authorization remain unknown.",
                "Only type/field declarations, operation/fragment owners, field bindings and explicit fragment-spread edges are interpreted. Arguments, defaults, descriptions, directive behavior, enum values, full operation validation, introspection JSON and version comparison are outside this profile.",
                "Fragment definitions are visited once in their declared type scope; spreads are retained as edges without expansion. Resolved field bindings do not establish that a whole operation is valid or that a fragment can execute in every spread context.",
                "Model-only bindings have no matching declaration in the supplied SDL. Missing or ambiguous declarations and unavailable models remain explicit.",
                "Each supplied file is an independently verified byte snapshot; the pair is not an atomic filesystem observation. UTF-16 offsets and parser token line/column values address decoded UTF-8 text, including an optional BOM.",
                "Original document bytes are identified by SHA-256 rather than embedded. Complete interpreted Evidence remains available separately from selected replies.",
            ],
        };
    }
}
