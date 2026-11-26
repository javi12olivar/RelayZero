import { sourceNodeFor, } from "./JavaScriptArtifactGraphContext.js";
import { astObservationEvidence, staticInferenceEvidence, } from "./JavaScriptArtifactGraphEvidence.js";
import { sha256Hex } from "../../kernel/sha256Hex.js";
/** Candidate syntax does not establish that the receiver is Electron. */
export const ELECTRON_CANDIDATE_LIMITATION = "The Electron module loader is unknown, so this relationship is only a candidate.";
/** Preserve syntax with uncertainty when its Electron receiver is unproven. */
export const electronFindingEvidence = (input, loaderAuthority) => loaderAuthority === "candidate"
    ? staticInferenceEvidence({
        ...input,
        confidence: "low",
        limitations: [
            ...(input.limitations ?? []),
            ELECTRON_CANDIDATE_LIMITATION,
        ],
    })
    : astObservationEvidence(input);
/** Resolve the file or recovered bundle module that owns one finding. */
export const electronFindingSourceNode = (context, file, moduleKey, runtime) => moduleKey === null
    ? (context.assetNodes.get(file.path) ?? context.fileNodes.get(file.path))
    : sourceNodeFor(context, file.path, moduleKey, runtime);
/** Observation-scoped identity shared safely across different artifact files. */
export const electronObservationIdentity = (context, scope, key) => ({
    strategy: "observation-fingerprint",
    stability: "observation-only",
    observation_sha256: sha256Hex(`${context.snapshot.manifest.root_sha256}\0${scope}\0${key}`),
    scope,
});
/** Add a direct AST syntax relationship. */
export const addElectronAstEdge = (context, input) => {
    context.accumulator.addEdge({
        source_node_id: input.source.node_id,
        target_node_id: input.target.node_id,
        relation: input.relation,
        properties: {
            ...input.properties,
            ...(input.loaderAuthority === "candidate"
                ? { loader_authority: "candidate" }
                : {}),
        },
        evidence: electronFindingEvidence({
            sha256: input.file.sha256,
            path: input.file.path,
            range: input.range,
            operation: input.operation,
            coverage: input.coverage,
            ...(input.limitations === undefined
                ? {}
                : { limitations: input.limitations }),
        }, input.loaderAuthority),
    });
};
/** Add an Electron relationship that static syntax suggests but cannot prove. */
export const addElectronInferenceEdge = (context, input) => {
    context.accumulator.addEdge({
        source_node_id: input.source.node_id,
        target_node_id: input.target.node_id,
        relation: input.relation,
        properties: {
            ...input.properties,
            ...(input.loaderAuthority === "candidate"
                ? { loader_authority: "candidate" }
                : {}),
        },
        evidence: staticInferenceEvidence({
            sha256: input.file.sha256,
            path: input.file.path,
            range: input.range,
            operation: input.operation,
            coverage: input.coverage,
            ...(input.loaderAuthority === "candidate"
                ? { confidence: "low" }
                : input.confidence === undefined
                    ? {}
                    : { confidence: input.confidence }),
            ...(input.loaderAuthority === "candidate"
                ? {
                    limitations: [
                        ...(input.limitations ?? []),
                        ELECTRON_CANDIDATE_LIMITATION,
                    ],
                }
                : input.limitations === undefined
                    ? {}
                    : { limitations: input.limitations }),
        }),
    });
};
