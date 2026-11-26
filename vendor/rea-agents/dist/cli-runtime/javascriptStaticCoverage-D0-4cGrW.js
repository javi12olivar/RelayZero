import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { analysisParameterLimitSchema, init_analysisSettingDefinitions, init_javascriptSemanticPrecision, javaScriptSemanticPrecisionSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_javascriptSemanticWorkAllowance, javaScriptRefusedPhaseSchema } from "./urlComponents-DJm-wtqY.js";
import { z } from "zod";

//#region dist/domain/javascript/javascriptSemanticValueTypes.js
var javaScriptSemanticResourceLimitSchema;
function init_javascriptSemanticValueTypes() {
	return (init_javascriptSemanticValueTypes = __esmMin((() => {
		javaScriptSemanticResourceLimitSchema = z.enum([
			"primitive-candidates",
			"primitive-bytes",
			"expression-depth",
			"getter-expansion",
			"alias-selections"
		]);
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptStaticCoverage.js
var javaScriptStaticCoverageSchema, javaScriptStaticParseStatus, unexaminedJavaScriptStaticCoverage;
function init_javascriptStaticCoverage() {
	return (init_javascriptStaticCoverage = __esmMin((() => {
		init_javascriptSemanticPrecision();
		init_analysisSettingDefinitions();
		init_javascriptSemanticValueTypes();
		init_javascriptSemanticWorkAllowance();
		javaScriptStaticCoverageSchema = z.strictObject({
			syntax: z.discriminatedUnion("status", [
				z.strictObject({
					status: z.literal("complete"),
					error_count: z.literal(0)
				}),
				z.strictObject({
					status: z.literal("recovered"),
					error_count: z.int().positive()
				}),
				z.strictObject({
					status: z.literal("failed"),
					error_count: z.null()
				}),
				z.strictObject({
					status: z.literal("not-examined"),
					error_count: z.null()
				})
			]),
			semantics: z.strictObject({
				unknown_findings: z.int().nonnegative().nullable(),
				uncertainty: z.array(z.enum([
					"dynamic-findings",
					"returned-reference-widening",
					"type-only-module-side-effect",
					"conditional-loader",
					"commonjs-wrapper-redeclaration"
				]))
			}),
			examination: z.strictObject({
				status: z.enum([
					"complete",
					"limited",
					"not-examined"
				]),
				semantic_resource_limits: z.array(javaScriptSemanticResourceLimitSchema),
				semantic_precision: javaScriptSemanticPrecisionSchema.optional(),
				electron_call_paths_limited: z.boolean(),
				/** The `semantic_precision` budgets that limited this source. */
				controls: z.array(analysisParameterLimitSchema).min(1).exactOptional(),
				/** The analysis phase whose work allowance refused this source. */
				refused_phase: javaScriptRefusedPhaseSchema.exactOptional()
			}),
			applicability: z.strictObject({ electron: z.enum(["observed", "unknown"]) }),
			unexamined_reason: z.string().min(1).exactOptional()
		});
		javaScriptStaticParseStatus = (coverage) => coverage.syntax.status === "failed" || coverage.syntax.status === "not-examined" ? "failed" : coverage.syntax.status === "recovered" || coverage.examination.status === "not-examined" || coverage.semantics.unknown_findings !== 0 || coverage.semantics.uncertainty.includes("conditional-loader") || coverage.examination.semantic_resource_limits.includes("alias-selections") ? "partial" : "complete";
		unexaminedJavaScriptStaticCoverage = (reason) => ({
			syntax: {
				status: "not-examined",
				error_count: null
			},
			semantics: {
				unknown_findings: null,
				uncertainty: []
			},
			examination: {
				status: "not-examined",
				semantic_resource_limits: [],
				electron_call_paths_limited: false
			},
			applicability: { electron: "unknown" },
			unexamined_reason: reason
		});
	})))();
}

//#endregion
export { init_javascriptSemanticValueTypes, init_javascriptStaticCoverage, javaScriptSemanticResourceLimitSchema, javaScriptStaticCoverageSchema, unexaminedJavaScriptStaticCoverage };