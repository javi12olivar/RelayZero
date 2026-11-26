import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { coverageStatusSchema, init_coverage } from "./jsonSerialization-DAF9DVXC.js";
import { z } from "zod";

//#region dist/domain/fixedTupleSchema.js
var fixedTupleSchema;
function init_fixedTupleSchema() {
	return (init_fixedTupleSchema = __esmMin((() => {
		fixedTupleSchema = (items) => z.tuple(items, z.union(items)).check(z.minLength(items.length), z.maxLength(items.length));
	})))();
}

//#endregion
//#region dist/domain/relationshipCoverage.js
var diagnostics, relationshipDiscoveryDirectionSchema, relationshipDiscoverySchema, discovery, completeRelationshipCoverageSchema, limitedDirections, partialRelationshipCoverageSchema, unknownRelationshipCoverageSchema, relationshipCoverageSchema, combineRelationshipDiscovery, relationshipCoverageLimitations;
function init_relationshipCoverage() {
	return (init_relationshipCoverage = __esmMin((() => {
		init_coverage();
		init_fixedTupleSchema();
		diagnostics = z.array(z.string().min(1)).min(1).exactOptional();
		relationshipDiscoveryDirectionSchema = z.strictObject({
			status: coverageStatusSchema,
			reason: z.string().min(1).exactOptional()
		});
		relationshipDiscoverySchema = z.strictObject({
			callers: relationshipDiscoveryDirectionSchema.exactOptional(),
			callees: relationshipDiscoveryDirectionSchema.exactOptional()
		});
		discovery = relationshipDiscoverySchema.exactOptional();
		completeRelationshipCoverageSchema = z.strictObject({
			status: z.literal("complete"),
			diagnostics,
			discovery
		});
		limitedDirections = z.union([
			fixedTupleSchema([z.literal("callers")]),
			fixedTupleSchema([z.literal("callees")]),
			fixedTupleSchema([z.literal("callers"), z.literal("callees")])
		]);
		partialRelationshipCoverageSchema = z.strictObject({
			status: z.literal("partial"),
			limitations: z.array(z.string().min(1)).min(1),
			limited_directions: limitedDirections.exactOptional(),
			diagnostics,
			discovery
		});
		unknownRelationshipCoverageSchema = z.strictObject({
			status: z.literal("unknown"),
			reason: z.string().min(1),
			limited_directions: limitedDirections.exactOptional(),
			diagnostics,
			discovery
		});
		relationshipCoverageSchema = z.discriminatedUnion("status", [
			completeRelationshipCoverageSchema,
			partialRelationshipCoverageSchema,
			unknownRelationshipCoverageSchema
		]);
		combineRelationshipDiscovery = (current, coverage, direction) => {
			const next = coverage?.discovery?.[direction]?.status ?? "unknown";
			if (current === "partial" || next === "partial") return "partial";
			if (current === "unknown" || next === "unknown") return "unknown";
			return "complete";
		};
		relationshipCoverageLimitations = (coverage) => {
			switch (coverage?.status) {
				case undefined: return ["Provider did not report relationship coverage."];
				case "complete": return [];
				case "partial": return coverage.limitations;
				case "unknown": return [coverage.reason];
			}
		};
	})))();
}

//#endregion
export { combineRelationshipDiscovery, completeRelationshipCoverageSchema, fixedTupleSchema, init_fixedTupleSchema, init_relationshipCoverage, partialRelationshipCoverageSchema, relationshipCoverageLimitations, relationshipCoverageSchema, unknownRelationshipCoverageSchema };