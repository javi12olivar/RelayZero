import { GraphQLError, Source, parse, visit } from "graphql";
import { AnalysisResourceConstraintError } from "../analysisErrorCore.js";
import { fixedAllowanceOptions } from "../fixedAllowanceRemediation.js";
import { isHostLimitFailure } from "../parseFailure.js";
import { API_CONTRACT_OPERATION, API_CONTRACT_MAX_FILE_BYTES, } from "./apiContract.js";
import { GRAPHQL_CONTRACT_LIMITS, } from "./graphqlContract.js";
/** The library does not distinguish syntax and parser-policy errors with a stable code. */
export class GraphqlDocumentRefusal extends Error {
    source;
    constructor(cause, document, role) {
        super("The GraphQL parser refused this document.", { cause });
        const offset = cause.positions?.[0], location = cause.locations?.[0];
        this.source =
            offset === undefined || location === undefined
                ? null
                : {
                    role,
                    sha256: document.artifact.sha256,
                    start_utf16: offset,
                    end_utf16: offset,
                    line: location.line,
                    column: location.column,
                };
    }
}
/** Public parser allowances bound allocation; iterative AST admission bounds subsequent traversal. */
export const parseGraphqlDocument = (document, role) => {
    try {
        const parsed = parse(new Source(document.text, document.artifact.path), {
            maxLexicalTokens: GRAPHQL_CONTRACT_LIMITS.lexicalTokens,
            maxComments: GRAPHQL_CONTRACT_LIMITS.comments,
            maxSourceLength: API_CONTRACT_MAX_FILE_BYTES,
        });
        let depth = 0;
        visit(parsed, {
            enter() {
                depth++;
                if (depth > GRAPHQL_CONTRACT_LIMITS.astDepth)
                    throw new AnalysisResourceConstraintError(API_CONTRACT_OPERATION, "memory", "GraphQL AST nesting exceeds the 128-level traversal allowance.", { max_ast_depth: GRAPHQL_CONTRACT_LIMITS.astDepth }, fixedAllowanceOptions(`The GraphQL AST nesting allowance of ${String(GRAPHQL_CONTRACT_LIMITS.astDepth)} levels`, "parser", { limit: GRAPHQL_CONTRACT_LIMITS.astDepth, unit: "levels" }));
            },
            leave() {
                depth--;
            },
        });
        return parsed;
    }
    catch (cause) {
        if (cause instanceof GraphQLError)
            throw new GraphqlDocumentRefusal(cause, document, role);
        if (isHostLimitFailure(cause))
            throw new AnalysisResourceConstraintError(API_CONTRACT_OPERATION, "memory", "GraphQL parsing exceeded a runtime representation allowance.", { parser: "graphql-js" }, {
                cause,
                remediationAction: "Use a smaller, less deeply nested complete document.",
            });
        throw cause;
    }
};
