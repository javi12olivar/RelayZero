import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { analysisParameterLimitSchema, coverageStatusSchema, init_analysisSettingDefinitions, init_coverage, init_jsonValue, jsonValueSchema, knownCoverageStatusSchema } from "./jsonSerialization-DAF9DVXC.js";
import { digestSchema, init_digests, prefixedDigestSchema } from "./targetIdentity-rKLLVwEj.js";
import { init_textSchemas, nonEmptyTextSchema } from "./textSchemas-UeTwLioW.js";
import { z } from "zod";

//#region dist/domain/javascript/javascriptSourceCoordinates.js
var compareJavaScriptSourcePoints, javascriptSourceRangeContains, javascriptSourceRangeKey, sourcePointSchema, javascriptSourceRangeSchema;
function init_javascriptSourceCoordinates() {
	return (init_javascriptSourceCoordinates = __esmMin((() => {
		compareJavaScriptSourcePoints = (left, right) => left.line - right.line || left.column - right.column;
		javascriptSourceRangeContains = (outer, inner) => compareJavaScriptSourcePoints(outer.start, inner.start) <= 0 && compareJavaScriptSourcePoints(outer.end, inner.end) >= 0;
		javascriptSourceRangeKey = (range) => `${range.start.line}:${range.start.column}-${range.end.line}:${range.end.column}`;
		sourcePointSchema = z.strictObject({
			line: z.number().int().min(1),
			column: z.number().int().min(0)
		});
		javascriptSourceRangeSchema = z.strictObject({
			start: sourcePointSchema,
			end: sourcePointSchema
		}).superRefine((range, context) => {
			if (compareJavaScriptSourcePoints(range.end, range.start) < 0) context.addIssue({
				code: "custom",
				path: ["end"],
				message: "Source range end must not precede its start"
			});
		}).describe("One-based lines, zero-based UTF-16 columns; start inclusive, end exclusive.");
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptRouteFacts.js
var javaScriptRouteMechanismSchema, javaScriptRouteSegmentSchema, javaScriptRouteCandidateSchema, javaScriptRouteWorkCapacitySchema, javaScriptRouteSourceFactsSchema;
function init_javascriptRouteFacts() {
	return (init_javascriptRouteFacts = __esmMin((() => {
		init_javascriptSourceCoordinates();
		javaScriptRouteMechanismSchema = z.enum([
			"router-call",
			"nested-route-object",
			"typed-route-tree",
			"next-app-chunk",
			"navigation-target",
			"route-string-constant"
		]);
		javaScriptRouteSegmentSchema = z.strictObject({
			value: z.string(),
			location: javascriptSourceRangeSchema,
			origin: z.enum([
				"literal",
				"property-name",
				"next-app-path"
			])
		});
		javaScriptRouteCandidateSchema = z.strictObject({
			path: z.string().regex(/^\//u),
			mechanism: javaScriptRouteMechanismSchema,
			confidence: z.enum([
				"low",
				"medium",
				"high"
			]),
			derivation: z.enum([
				"literal",
				"joined",
				"inferred"
			]),
			location: javascriptSourceRangeSchema,
			segments: z.array(javaScriptRouteSegmentSchema)
		});
		javaScriptRouteWorkCapacitySchema = z.strictObject({
			kind: z.literal("route-work-or-facts"),
			limit_bytes: z.int().nonnegative(),
			accounted_fact_bytes: z.int().nonnegative(),
			accounted_work_bytes: z.int().nonnegative()
		});
		javaScriptRouteSourceFactsSchema = z.strictObject({
			candidates: z.array(javaScriptRouteCandidateSchema),
			unresolved: z.array(z.strictObject({
				mechanism: javaScriptRouteMechanismSchema,
				location: javascriptSourceRangeSchema,
				reason: z.string()
			})),
			capacity: z.discriminatedUnion("kind", [javaScriptRouteWorkCapacitySchema, z.strictObject({
				kind: z.literal("result-bytes"),
				limit_bytes: z.int().nonnegative(),
				preceding_work_capacity: javaScriptRouteWorkCapacitySchema.nullable()
			})]).nullable()
		});
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptApplicationEvidenceSchemas.js
var unsafePathSegments, isSafeRelativePath, relativePathSchema$1, applicationEvidenceAuthoritySchema, applicationFactStateSchema, applicationConfidenceSchema, applicationUnavailableReasonSchema, unavailableFactSchema, availableArtifactSchema, applicationArtifactReferenceSchema, sourceRangeSchema, fileOffsetRangeSchema, applicationLocationSchema, applicationGraphEvidenceLocationSchema, applicationExtractorSchema, applicationLimitSchema, coverageLimitsSchema, omittedCountSchema, applicationCoverageSchema, applicationCoverageStatusSchema, applicationCoverageKnowledge, completeApplicationCoverage, partialApplicationCoverage, truncatedApplicationCoverage, applicationGraphEvidenceBaseSchema, applicationGraphEvidenceContextSchema, checkAuthorityState, checkStateConfidence, checkContextTraceability, isCompatibleApplicationGraphEvidenceLocation, checkTraceability, checkArtifactBacking, isValidApplicationGraphEvidenceContext, applicationGraphEvidenceSchema, applicationNodeIdentitySchema, qualifyJavaScriptLoaderEvidence;
function init_javascriptApplicationEvidenceSchemas() {
	return (init_javascriptApplicationEvidenceSchemas = __esmMin((() => {
		init_coverage();
		init_javascriptSourceCoordinates();
		init_digests();
		init_textSchemas();
		unsafePathSegments = new Set([
			"",
			".",
			".."
		]);
		isSafeRelativePath = (path) => {
			if (path.startsWith("/")) return false;
			return path.split("/").every((part) => !unsafePathSegments.has(part));
		};
		relativePathSchema$1 = z.string().min(1).refine(isSafeRelativePath, "Expected a normalized relative POSIX path without traversal");
		applicationEvidenceAuthoritySchema = z.enum([
			"artifact-bytes",
			"ast-static-analysis",
			"static-relationship-inference",
			"passive-cdp-runtime",
			"cross-layer-reconciliation",
			"cross-version-comparison",
			"controlled-replay",
			"native-analysis-provider",
			"managed-static-analysis",
			"historical-reference",
			"user-assertion",
			"unknown"
		]);
		applicationFactStateSchema = z.enum([
			"observed",
			"inferred",
			"unknown",
			"unavailable"
		]);
		applicationConfidenceSchema = z.enum([
			"exact",
			"high",
			"medium",
			"low",
			"unknown"
		]);
		applicationUnavailableReasonSchema = z.enum([
			"not-applicable",
			"not-observed",
			"truncated",
			"provider-unavailable",
			"unresolved",
			"unknown"
		]);
		unavailableFactSchema = z.strictObject({
			available: z.literal(false),
			reason: applicationUnavailableReasonSchema,
			detail: nonEmptyTextSchema
		});
		availableArtifactSchema = z.strictObject({
			available: z.literal(true),
			artifact_id: prefixedDigestSchema("art"),
			sha256: digestSchema
		}).superRefine((artifact, context) => {
			if (artifact.artifact_id !== `art_${artifact.sha256}`) context.addIssue({
				code: "custom",
				path: ["artifact_id"],
				message: "Artifact identifier must commit the same SHA-256 digest"
			});
		});
		applicationArtifactReferenceSchema = z.discriminatedUnion("available", [availableArtifactSchema, unavailableFactSchema]);
		sourceRangeSchema = javascriptSourceRangeSchema.safeExtend({
			kind: z.literal("source-range"),
			source: nonEmptyTextSchema
		});
		fileOffsetRangeSchema = z.strictObject({
			kind: z.literal("file-offset-range"),
			start: z.int().min(0).max(Number.MAX_SAFE_INTEGER),
			end: z.int().min(0).max(Number.MAX_SAFE_INTEGER)
		}).superRefine((location, context) => {
			if (location.end < location.start) context.addIssue({
				code: "custom",
				path: ["end"],
				message: "File offset range end must not precede its start"
			});
		});
		applicationLocationSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("artifact-path"),
				path: relativePathSchema$1
			}),
			sourceRangeSchema,
			fileOffsetRangeSchema,
			z.strictObject({
				kind: z.literal("url"),
				url: z.string().min(1)
			}),
			z.strictObject({
				kind: z.literal("runtime"),
				capture_sha256: digestSchema,
				target_key: nonEmptyTextSchema,
				frame_key: nonEmptyTextSchema.nullable(),
				script_key: nonEmptyTextSchema.nullable()
			}),
			z.strictObject({
				kind: z.literal("native-address"),
				address: nonEmptyTextSchema,
				symbol: nonEmptyTextSchema.nullable()
			}),
			z.strictObject({
				kind: z.literal("package-export"),
				package_name: nonEmptyTextSchema,
				export_path: nonEmptyTextSchema
			})
		]);
		applicationGraphEvidenceLocationSchema = z.discriminatedUnion("available", [z.strictObject({
			available: z.literal(true),
			value: applicationLocationSchema
		}), unavailableFactSchema]);
		applicationExtractorSchema = z.strictObject({
			name: z.string().min(1),
			version: z.string().min(1),
			operation: z.string().min(1),
			executable_sha256: digestSchema.nullable()
		});
		applicationLimitSchema = z.strictObject({
			name: z.string().min(1),
			value: z.int().min(0).max(Number.MAX_SAFE_INTEGER),
			unit: z.enum([
				"items",
				"bytes",
				"milliseconds",
				"depth",
				"characters",
				"instructions",
				"other"
			])
		});
		coverageLimitsSchema = z.array(applicationLimitSchema);
		omittedCountSchema = z.int().min(0).max(Number.MAX_SAFE_INTEGER);
		applicationCoverageSchema = z.union([
			z.strictObject({
				status: z.literal("complete"),
				truncated: z.literal(false),
				omitted_count: z.literal(0),
				limits: coverageLimitsSchema
			}),
			z.strictObject({
				status: z.literal("partial"),
				truncated: z.literal(false),
				omitted_count: omittedCountSchema.nullable(),
				limits: coverageLimitsSchema
			}),
			z.strictObject({
				status: z.literal("partial"),
				truncated: z.literal(true),
				omitted_count: z.union([omittedCountSchema.positive(), z.null()]),
				limits: z.array(applicationLimitSchema).min(1)
			}),
			z.strictObject({
				status: z.enum(["unknown", "unavailable"]),
				truncated: z.literal(false),
				omitted_count: z.null(),
				limits: coverageLimitsSchema
			})
		]);
		applicationCoverageStatusSchema = z.enum([...coverageStatusSchema.options, "unavailable"]);
		applicationCoverageKnowledge = (status) => status === "unavailable" ? "unknown" : status;
		completeApplicationCoverage = (limits = []) => applicationCoverageSchema.parse({
			status: "complete",
			truncated: false,
			omitted_count: 0,
			limits
		});
		partialApplicationCoverage = (limits, omittedCount) => applicationCoverageSchema.parse({
			status: "partial",
			truncated: false,
			omitted_count: omittedCount,
			limits
		});
		truncatedApplicationCoverage = (limits, omittedCount) => applicationCoverageSchema.parse({
			status: "partial",
			truncated: true,
			omitted_count: omittedCount,
			limits
		});
		applicationGraphEvidenceBaseSchema = z.strictObject({
			authority: applicationEvidenceAuthoritySchema,
			state: applicationFactStateSchema,
			confidence: applicationConfidenceSchema,
			artifact: applicationArtifactReferenceSchema,
			location: applicationGraphEvidenceLocationSchema,
			extractor: applicationExtractorSchema,
			coverage: applicationCoverageSchema,
			limitations: z.array(nonEmptyTextSchema),
			evidence_ids: z.array(prefixedDigestSchema("ev"))
		});
		applicationGraphEvidenceContextSchema = applicationGraphEvidenceBaseSchema.omit({ location: true });
		checkAuthorityState = (evidence, context) => {
			if (evidence.authority === "static-relationship-inference" && evidence.state !== "inferred") context.addIssue({
				code: "custom",
				path: ["state"],
				message: "Static relationship authority must remain inferred"
			});
			if (evidence.authority === "cross-layer-reconciliation" && evidence.state !== "inferred") context.addIssue({
				code: "custom",
				path: ["state"],
				message: "Cross-layer reconciliation authority must remain inferred"
			});
			if (evidence.authority === "cross-version-comparison" && evidence.state !== "inferred") context.addIssue({
				code: "custom",
				path: ["state"],
				message: "Cross-version comparison authority must remain inferred"
			});
			if (evidence.authority === "unknown" && !["unknown", "unavailable"].includes(evidence.state)) context.addIssue({
				code: "custom",
				path: ["state"],
				message: "Unknown authority cannot claim an observed fact"
			});
		};
		checkStateConfidence = (evidence, context) => {
			if (["unknown", "unavailable"].includes(evidence.state) && (evidence.confidence !== "unknown" || evidence.limitations.length === 0)) context.addIssue({
				code: "custom",
				message: "Unknown and unavailable facts require unknown confidence and an explicit limitation"
			});
			if (evidence.state === "observed" && evidence.confidence === "unknown") context.addIssue({
				code: "custom",
				path: ["confidence"],
				message: "Observed facts require a bounded non-unknown confidence"
			});
			if (evidence.state === "inferred" && ![
				"high",
				"medium",
				"low"
			].includes(evidence.confidence)) context.addIssue({
				code: "custom",
				path: ["confidence"],
				message: "Inferred facts require high, medium, or low confidence"
			});
			if (evidence.confidence === "exact" && evidence.state !== "observed") context.addIssue({
				code: "custom",
				path: ["confidence"],
				message: "Exact confidence is reserved for observed facts"
			});
		};
		checkContextTraceability = (evidence, context) => {
			if (evidence.state === "inferred" && evidence.limitations.length === 0) context.addIssue({
				code: "custom",
				path: ["limitations"],
				message: "Inferred facts require an explicit limitation"
			});
			if (evidence.coverage.status !== "complete" && evidence.limitations.length === 0) context.addIssue({
				code: "custom",
				path: ["limitations"],
				message: "Non-complete coverage requires an explicit limitation"
			});
		};
		isCompatibleApplicationGraphEvidenceLocation = (evidence, location) => evidence.state !== "observed" || location.available;
		checkTraceability = (evidence, context) => {
			if (!isCompatibleApplicationGraphEvidenceLocation(evidence, evidence.location)) context.addIssue({
				code: "custom",
				path: ["location"],
				message: "Observed facts require an actionable location"
			});
			checkContextTraceability(evidence, context);
		};
		checkArtifactBacking = (evidence, context) => {
			const artifactBacked = [
				"artifact-bytes",
				"ast-static-analysis",
				"controlled-replay",
				"native-analysis-provider",
				"managed-static-analysis"
			].includes(evidence.authority);
			if (artifactBacked && evidence.state !== "unavailable" && !evidence.artifact.available) context.addIssue({
				code: "custom",
				path: ["artifact"],
				message: "Artifact-backed facts require a content digest"
			});
		};
		isValidApplicationGraphEvidenceContext = (evidence) => {
			let valid = true;
			const sink = { addIssue: () => {
				valid = false;
			} };
			checkAuthorityState(evidence, sink);
			checkStateConfidence(evidence, sink);
			checkContextTraceability(evidence, sink);
			checkArtifactBacking(evidence, sink);
			return valid;
		};
		applicationGraphEvidenceSchema = applicationGraphEvidenceBaseSchema.superRefine((evidence, context) => {
			checkAuthorityState(evidence, context);
			checkStateConfidence(evidence, context);
			checkTraceability(evidence, context);
			checkArtifactBacking(evidence, context);
		});
		applicationNodeIdentitySchema = z.discriminatedUnion("strategy", [
			z.strictObject({
				strategy: z.literal("content-digest"),
				stability: z.literal("global-exact"),
				sha256: digestSchema
			}),
			z.strictObject({
				strategy: z.literal("source-map-original"),
				stability: z.literal("source-map-exact"),
				source_map_sha256: digestSchema,
				original_source: z.string(),
				source_root: z.string().nullable(),
				source_sha256: digestSchema.nullable()
			}),
			z.strictObject({
				strategy: z.literal("canonical-path"),
				stability: z.literal("artifact-version"),
				artifact_sha256: digestSchema,
				path: relativePathSchema$1
			}),
			z.strictObject({
				strategy: z.literal("structural-fingerprint"),
				stability: z.literal("cross-version-inference"),
				algorithm: z.string().min(1),
				fingerprint_sha256: digestSchema,
				basis: z.array(z.enum([
					"syntax-tree",
					"control-flow",
					"imports",
					"exports",
					"literals",
					"api-usage"
				])).min(1)
			}),
			z.strictObject({
				strategy: z.literal("artifact-local-key"),
				stability: z.literal("artifact-version"),
				artifact_sha256: digestSchema,
				namespace: nonEmptyTextSchema,
				key: z.string()
			}),
			z.strictObject({
				strategy: z.literal("runtime-instance"),
				stability: z.literal("capture-only"),
				capture_evidence_id: prefixedDigestSchema("ev"),
				capture_sha256: digestSchema,
				runtime_key: nonEmptyTextSchema
			}),
			z.strictObject({
				strategy: z.literal("observation-fingerprint"),
				stability: z.literal("observation-only"),
				observation_sha256: digestSchema,
				scope: nonEmptyTextSchema
			})
		]);
		qualifyJavaScriptLoaderEvidence = (evidence, condition) => ({
			...evidence,
			confidence: evidence.confidence === "exact" || evidence.confidence === "high" ? "medium" : evidence.confidence,
			coverage: evidence.coverage.status === "complete" ? {
				...evidence.coverage,
				status: "partial"
			} : evidence.coverage,
			limitations: [...evidence.limitations, condition]
		});
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticGraphSchemas.js
var semanticNodeIdSchema, semanticRelationIdSchema, semanticUnknownIdSchema, semanticEvidenceContextIdSchema, javaScriptSemanticEvidenceContextSchema, javaScriptSemanticEvidenceReferenceSchema, JAVASCRIPT_SEMANTIC_NODE_KINDS, JAVASCRIPT_SEMANTIC_RELATION_FAMILIES, JAVASCRIPT_SEMANTIC_RELATIONS, JAVASCRIPT_SEMANTIC_RELATION_FAMILY, relativePathSchema, semanticPropertiesSchema, semanticNodeIdentitySchema, javaScriptSemanticNodeInputSchema, javaScriptSemanticNodeSchema, javaScriptSemanticRelationInputSchema, javaScriptSemanticRelationSchema, JAVASCRIPT_SEMANTIC_UNKNOWN_REASONS, javaScriptSemanticUnknownOmissionSchema, javaScriptSemanticUnknownOmissionsSchema, javaScriptSemanticUnknownInputSchema, javaScriptSemanticUnknownSchema, fingerprintComponentsSchema, javaScriptSemanticFingerprintInputSchema, javaScriptSemanticFingerprintSchema, familyCoverageSchema, graphCoverageSchema, javaScriptSemanticGraphInputSchema, javaScriptSemanticGraphRecordSchema;
function init_javascriptSemanticGraphSchemas() {
	return (init_javascriptSemanticGraphSchemas = __esmMin((() => {
		init_coverage();
		init_javascriptSourceCoordinates();
		init_javascriptApplicationEvidenceSchemas();
		init_jsonValue();
		init_digests();
		init_textSchemas();
		init_analysisSettingDefinitions();
		semanticNodeIdSchema = prefixedDigestSchema("jsrg_node");
		semanticRelationIdSchema = z.string().regex(/^jsrg_relation_[a-f0-9]{64}$/u);
		semanticUnknownIdSchema = z.string().regex(/^jsrg_unknown_[a-f0-9]{64}$/u);
		semanticEvidenceContextIdSchema = z.string().regex(/^jsrg_evidence_[a-f0-9]{64}$/u);
		javaScriptSemanticEvidenceContextSchema = applicationGraphEvidenceContextSchema.extend({ context_id: semanticEvidenceContextIdSchema });
		javaScriptSemanticEvidenceReferenceSchema = z.strictObject({
			context_id: semanticEvidenceContextIdSchema,
			location: applicationGraphEvidenceLocationSchema
		});
		JAVASCRIPT_SEMANTIC_NODE_KINDS = [
			"module",
			"function",
			"parameter",
			"binding",
			"expression",
			"literal",
			"property-slot",
			"call-site",
			"return-site",
			"closure-capture",
			"promise",
			"task",
			"event",
			"listener",
			"timer",
			"child-process",
			"stdio",
			"signal",
			"config-source",
			"request",
			"response",
			"boundary",
			"resource",
			"unknown-frontier"
		];
		JAVASCRIPT_SEMANTIC_RELATION_FAMILIES = [
			"boundary",
			"call-flow",
			"child-process",
			"closure",
			"configuration",
			"data-flow",
			"event",
			"object-flow",
			"promise-ownership",
			"request",
			"resource-lifecycle",
			"timer"
		];
		JAVASCRIPT_SEMANTIC_RELATIONS = [
			"acquires",
			"aggregates",
			"aliases",
			"argument-to-parameter",
			"awaits",
			"calls",
			"cancels-timer",
			"captures",
			"chains",
			"coerces",
			"connects-stdio",
			"consumed-by",
			"constructs-request",
			"creates-promise",
			"defaults",
			"defines",
			"destructures",
			"detaches-task",
			"dispatches-candidate",
			"forwards-signal",
			"influences",
			"listens-error",
			"listens-exit",
			"owns",
			"overrides",
			"parses",
			"reads",
			"reads-argv",
			"reads-config",
			"reads-environment",
			"reads-property",
			"registers-listener",
			"releases",
			"removes-listener",
			"returns-task",
			"returns-to-call",
			"schedules-timer",
			"spawns",
			"spreads",
			"supplies-argv",
			"supplies-env",
			"supplies-request-field",
			"validates",
			"writes",
			"writes-property"
		];
		JAVASCRIPT_SEMANTIC_RELATION_FAMILY = {
			acquires: "resource-lifecycle",
			aggregates: "promise-ownership",
			aliases: "data-flow",
			"argument-to-parameter": "call-flow",
			awaits: "promise-ownership",
			calls: "call-flow",
			"cancels-timer": "timer",
			captures: "closure",
			chains: "promise-ownership",
			coerces: "boundary",
			"connects-stdio": "child-process",
			"consumed-by": "request",
			"constructs-request": "request",
			"creates-promise": "promise-ownership",
			defaults: "configuration",
			defines: "data-flow",
			destructures: "object-flow",
			"detaches-task": "promise-ownership",
			"dispatches-candidate": "event",
			"forwards-signal": "child-process",
			influences: "data-flow",
			"listens-error": "child-process",
			"listens-exit": "child-process",
			owns: "promise-ownership",
			overrides: "configuration",
			parses: "boundary",
			reads: "data-flow",
			"reads-argv": "configuration",
			"reads-config": "configuration",
			"reads-environment": "configuration",
			"reads-property": "object-flow",
			"registers-listener": "event",
			releases: "resource-lifecycle",
			"removes-listener": "event",
			"returns-task": "promise-ownership",
			"returns-to-call": "call-flow",
			"schedules-timer": "timer",
			spawns: "child-process",
			spreads: "object-flow",
			"supplies-argv": "child-process",
			"supplies-env": "child-process",
			"supplies-request-field": "request",
			validates: "boundary",
			writes: "data-flow",
			"writes-property": "object-flow"
		};
		relativePathSchema = z.string().min(1).refine((path) => !path.startsWith("/") && path.split("/").every((part) => ![
			"",
			".",
			".."
		].includes(part)), "Expected a normalized relative POSIX path without traversal");
		semanticPropertiesSchema = z.record(z.string().min(1), jsonValueSchema);
		semanticNodeIdentitySchema = z.strictObject({
			artifact_sha256: digestSchema,
			module_path: relativePathSchema,
			source_range: javascriptSourceRangeSchema.nullable(),
			role_key: z.string().min(1)
		});
		javaScriptSemanticNodeInputSchema = z.strictObject({
			kind: z.enum(JAVASCRIPT_SEMANTIC_NODE_KINDS),
			identity: semanticNodeIdentitySchema,
			function_node_id: semanticNodeIdSchema.nullable(),
			application_node_ids: z.array(prefixedDigestSchema("jag_node")),
			label: z.string().min(1).nullable(),
			properties: semanticPropertiesSchema,
			evidence: applicationGraphEvidenceSchema
		});
		javaScriptSemanticNodeSchema = javaScriptSemanticNodeInputSchema.extend({
			evidence: javaScriptSemanticEvidenceReferenceSchema,
			node_id: semanticNodeIdSchema.describe("SHA-256 of the node kind and identity; stable for one artifact version.")
		});
		javaScriptSemanticRelationInputSchema = z.strictObject({
			source_node_id: semanticNodeIdSchema,
			target_node_id: semanticNodeIdSchema,
			relation: z.enum(JAVASCRIPT_SEMANTIC_RELATIONS),
			resolution: z.enum(["resolved", "candidate"]),
			properties: semanticPropertiesSchema,
			evidence: applicationGraphEvidenceSchema
		});
		javaScriptSemanticRelationSchema = javaScriptSemanticRelationInputSchema.extend({
			evidence: javaScriptSemanticEvidenceReferenceSchema,
			relation_id: semanticRelationIdSchema.describe("SHA-256 of the exact relation content, including its evidence reference.")
		});
		JAVASCRIPT_SEMANTIC_UNKNOWN_REASONS = [
			"ambiguous-target",
			"bound-reached",
			"dynamic-call",
			"dynamic-property",
			"dynamic-scope",
			"eval-or-generated-code",
			"incomplete-module",
			"missing-source",
			"resource-limit",
			"unknown-value",
			"unsupported-syntax"
		];
		javaScriptSemanticUnknownOmissionSchema = z.strictObject({
			family: z.enum(JAVASCRIPT_SEMANTIC_RELATION_FAMILIES),
			reason: z.enum(JAVASCRIPT_SEMANTIC_UNKNOWN_REASONS),
			occurrences: z.int().positive()
		});
		javaScriptSemanticUnknownOmissionsSchema = z.array(javaScriptSemanticUnknownOmissionSchema).min(1).max(JAVASCRIPT_SEMANTIC_RELATION_FAMILIES.length * JAVASCRIPT_SEMANTIC_UNKNOWN_REASONS.length);
		javaScriptSemanticUnknownInputSchema = z.strictObject({
			node_id: semanticNodeIdSchema.nullable(),
			family: z.enum(JAVASCRIPT_SEMANTIC_RELATION_FAMILIES),
			relation_kinds: z.array(z.enum(JAVASCRIPT_SEMANTIC_RELATIONS)).min(1),
			reason: z.enum(JAVASCRIPT_SEMANTIC_UNKNOWN_REASONS),
			detail: nonEmptyTextSchema,
			candidate_node_ids: z.array(semanticNodeIdSchema),
			evidence: applicationGraphEvidenceSchema
		});
		javaScriptSemanticUnknownSchema = javaScriptSemanticUnknownInputSchema.extend({
			evidence: javaScriptSemanticEvidenceReferenceSchema,
			unknown_id: semanticUnknownIdSchema
		});
		fingerprintComponentsSchema = z.strictObject({
			parameter_arity: z.int().min(0),
			normalized_ast_sha256: digestSchema,
			control_flow_sha256: digestSchema,
			relation_shape_sha256: digestSchema,
			literal_set_sha256: digestSchema,
			effects: z.array(z.enum([
				"async",
				"child-process",
				"event",
				"network",
				"promise",
				"resource",
				"timer"
			]))
		});
		javaScriptSemanticFingerprintInputSchema = z.strictObject({
			function_node_id: semanticNodeIdSchema,
			algorithm: z.literal("rea.javascript-semantic-function"),
			status: z.enum([...knownCoverageStatusSchema.options, "unavailable"]),
			components: fingerprintComponentsSchema,
			limitations: z.array(nonEmptyTextSchema),
			evidence: applicationGraphEvidenceSchema
		});
		javaScriptSemanticFingerprintSchema = javaScriptSemanticFingerprintInputSchema.extend({
			evidence: javaScriptSemanticEvidenceReferenceSchema,
			fingerprint_id: prefixedDigestSchema("jsrg_fingerprint"),
			fingerprint_sha256: digestSchema
		});
		familyCoverageSchema = z.strictObject({
			family: z.enum(JAVASCRIPT_SEMANTIC_RELATION_FAMILIES),
			status: z.enum([...coverageStatusSchema.options, "unsupported"]),
			retained_relations: z.int().min(0),
			omitted_relations: z.int().min(0).nullable(),
			unknown_ids: z.array(semanticUnknownIdSchema)
		});
		graphCoverageSchema = z.strictObject({
			status: z.enum([...coverageStatusSchema.options, "unavailable"]),
			truncated: z.boolean(),
			omitted_unknown_occurrences: javaScriptSemanticUnknownOmissionsSchema.exactOptional(),
			omitted_nodes: z.int().min(0).nullable(),
			omitted_relations: z.int().min(0).nullable(),
			limits: z.array(z.strictObject({
				name: z.string().min(1),
				value: z.int().min(0),
				unit: z.enum([
					"items",
					"bytes",
					"milliseconds",
					"depth",
					"other"
				])
			})),
			/**
			* The request parameters that limited this graph: retention ceilings that
			* stopped it and `semantic_precision` budgets that limited its sources.
			*/
			controls: z.array(analysisParameterLimitSchema).min(1).exactOptional(),
			families: z.array(familyCoverageSchema).length(12)
		});
		javaScriptSemanticGraphInputSchema = z.strictObject({
			schema: z.literal("JavaScriptSemanticRelationGraph"),
			root_artifact_sha256: digestSchema,
			application_graph_id: prefixedDigestSchema("jag"),
			root_node_ids: z.array(semanticNodeIdSchema).min(1),
			evidence_contexts: z.array(javaScriptSemanticEvidenceContextSchema),
			nodes: z.array(javaScriptSemanticNodeSchema).min(1),
			relations: z.array(javaScriptSemanticRelationSchema),
			fingerprints: z.array(javaScriptSemanticFingerprintSchema),
			unknowns: z.array(javaScriptSemanticUnknownSchema),
			coverage: graphCoverageSchema,
			limitations: z.array(nonEmptyTextSchema)
		});
		javaScriptSemanticGraphRecordSchema = javaScriptSemanticGraphInputSchema.extend({ graph_id: prefixedDigestSchema("jsrg") });
	})))();
}

//#endregion
export { JAVASCRIPT_SEMANTIC_NODE_KINDS, JAVASCRIPT_SEMANTIC_RELATIONS, JAVASCRIPT_SEMANTIC_RELATION_FAMILIES, JAVASCRIPT_SEMANTIC_RELATION_FAMILY, applicationCoverageKnowledge, applicationCoverageSchema, applicationCoverageStatusSchema, applicationGraphEvidenceLocationSchema, applicationGraphEvidenceSchema, applicationNodeIdentitySchema, compareJavaScriptSourcePoints, completeApplicationCoverage, init_javascriptApplicationEvidenceSchemas, init_javascriptRouteFacts, init_javascriptSemanticGraphSchemas, init_javascriptSourceCoordinates, isCompatibleApplicationGraphEvidenceLocation, isValidApplicationGraphEvidenceContext, javaScriptRouteCandidateSchema, javaScriptRouteMechanismSchema, javaScriptRouteSegmentSchema, javaScriptRouteSourceFactsSchema, javaScriptSemanticEvidenceContextSchema, javaScriptSemanticFingerprintInputSchema, javaScriptSemanticFingerprintSchema, javaScriptSemanticGraphInputSchema, javaScriptSemanticGraphRecordSchema, javaScriptSemanticNodeInputSchema, javaScriptSemanticNodeSchema, javaScriptSemanticRelationInputSchema, javaScriptSemanticRelationSchema, javaScriptSemanticUnknownInputSchema, javaScriptSemanticUnknownOmissionsSchema, javaScriptSemanticUnknownSchema, javascriptSourceRangeContains, javascriptSourceRangeKey, javascriptSourceRangeSchema, partialApplicationCoverage, qualifyJavaScriptLoaderEvidence, truncatedApplicationCoverage };