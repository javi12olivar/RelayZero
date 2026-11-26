import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, MAX_JSON_DEPTH, fixedAllowanceOptions, init_analysisErrorCore, init_fixedAllowanceRemediation, init_jsonValue } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { analysisViewInputError, evidenceFileTarget, init_analysisViewErrors, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { ROUTE_RULES, init_webNetworkRouteTemplates, textBytes as textBytes$1 } from "./featureTraceView-CDxdbO2M.js";
import { init_webNetworkCapture, safeParseOwnedWebNetworkCapture } from "./webNetworkCapture-DzOKad85.js";
import { z } from "zod";
import { isProxy } from "node:util/types";

//#region dist/domain/analysisView/apiSurfaceSchema.js
var apiSurfaceViewSchema, ruleSchema, groupSchema, apiSurfaceFields;
function init_apiSurfaceSchema() {
	return (init_apiSurfaceSchema = __esmMin((() => {
		init_webNetworkRouteTemplates();
		apiSurfaceViewSchema = z.strictObject({
			kind: z.literal("api-surface"),
			offset: z.int().nonnegative().default(0),
			limit: z.int().positive().default(50),
			include_query_parameter_names: z.boolean().optional().describe("Include distinct observed query parameter names and their original record ordinals; names do not establish required parameters or a complete API schema.")
		});
		ruleSchema = z.enum(ROUTE_RULES);
		groupSchema = z.strictObject({
			method: z.string(),
			origin: z.string(),
			path_template: z.string(),
			templated_segments: z.array(z.strictObject({
				segment_index: z.int().nonnegative(),
				rule: ruleSchema,
				basis: z.literal("inferred"),
				observed_values: z.array(z.string())
			})),
			record_ordinals: z.array(z.int().nonnegative()),
			statuses: z.array(z.number()),
			content_types: z.array(z.string()),
			query_parameter_names: z.array(z.strictObject({
				name: z.string(),
				record_ordinals: z.array(z.int().nonnegative())
			})).optional(),
			flags: z.array(z.enum([
				"single-sample",
				"mixed-statuses",
				"mixed-content-types"
			]))
		});
		apiSurfaceFields = {
			records: z.strictObject({
				examined: z.int().nonnegative(),
				total: z.int().nonnegative(),
				excluded: z.int().nonnegative()
			}),
			templated_groups: z.int().nonnegative().describe("Groups across every page that carry at least one templated segment."),
			groups: z.array(groupSchema),
			excluded_records: z.array(z.strictObject({
				ordinal: z.int().nonnegative(),
				reason: z.enum([
					"url-redacted",
					"url-unparseable",
					"request-unavailable",
					"method-unavailable"
				])
			}))
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/analysisViewDataAdmission.js
var MEMBER_BYTES, CONTAINER_BYTES, textBytes, admitAnalysisViewData;
function init_analysisViewDataAdmission() {
	return (init_analysisViewDataAdmission = __esmMin((() => {
		init_analysisErrorCore();
		init_jsonValue();
		init_result();
		MEMBER_BYTES = 256;
		CONTAINER_BYTES = 512;
		textBytes = (length) => 32 + length * 14;
		admitAnalysisViewData = (value, inline, reserve) => {
			const ancestors = new Set();
			const path = inline ? ["source", "evidence"] : ["source"];
			const invalid = () => err(new AnalysisInputError("inspect_analysis_view", undefined, [{
				path: [...path],
				reason: "invalid_value",
				message: "Parent data must contain bounded ordinary JSON data without cycles or accessors."
			}]));
			const visit = (item, depth) => {
				if (isProxy(item) || typeof item === "function") return invalid();
				if (depth > 1e3 + (inline ? 4 : 3) || typeof item === "object" && item !== null && ancestors.has(item)) return invalid();
				const member = reserve?.(MEMBER_BYTES + (inline && typeof item === "string" ? textBytes(item.length) : 0) + (typeof item === "object" && item !== null ? CONTAINER_BYTES : 0));
				if (member !== undefined && !member.ok) return member;
				if (typeof item !== "object" || item === null) return ok(undefined);
				ancestors.add(item);
				const child = (key) => {
					path.push(key);
					const descriptor = Object.getOwnPropertyDescriptor(item, key);
					const admitted = descriptor === undefined || !Object.hasOwn(descriptor, "value") ? invalid() : visit(descriptor.value, depth + 1);
					path.pop();
					return admitted;
				};
				if (Array.isArray(item)) {
					if (Object.getPrototypeOf(item) !== Array.prototype || Object.hasOwn(item, Symbol.iterator) || Object.hasOwn(item, "map") || Object.hasOwn(item, "constructor")) return invalid();
					for (let index = 0; index < item.length; index += 1) {
						const admitted = child(index);
						if (!admitted.ok) return admitted;
					}
				} else {
					const prototype = Object.getPrototypeOf(item);
					if (prototype !== Object.prototype && prototype !== null) return invalid();
					for (const key of Object.getOwnPropertyNames(item)) {
						const keyAdmission = inline ? reserve?.(textBytes(key.length)) : undefined;
						if (keyAdmission !== undefined && !keyAdmission.ok) return keyAdmission;
						const admitted = child(key);
						if (!admitted.ok) return admitted;
					}
				}
				ancestors.delete(item);
				return ok(undefined);
			};
			return visit(value, 0);
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/WebNetworkProjectionAccumulator.js
var WebNetworkProjectionAccumulator, admitHarCaptureParent;
function init_WebNetworkProjectionAccumulator() {
	return (init_WebNetworkProjectionAccumulator = __esmMin((() => {
		init_budget();
		init_fixedAllowanceRemediation();
		init_analysisErrorCore();
		init_unicodeCodePointOrder();
		init_result();
		init_webNetworkCapture();
		init_analysisViewDataAdmission();
		init_analysisViewErrors();
		init_inputIssueProjection();
		init_webNetworkRouteTemplates();
		init_evidence();
		WebNetworkProjectionAccumulator = class {
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
				if (!this.#bytes.tryCharge(bytes)) return false;
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
				return err(new AnalysisResourceConstraintError(this.operation, "memory", `${this.budgetSubject} retained state and temporary work exceed the projection representation budget.`, { output_bytes: this.maximumBytes }, fixedAllowanceOptions("The analysis-view projection allowance", "parser", {
					limit: this.maximumBytes,
					unit: "bytes"
				})));
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
				if (!prepared.ok) return prepared;
				prepared.value();
				return ok(undefined);
			}
			/** Admit record qualifications without publishing them before the record commits. */
			prepareLimitations(limitations) {
				const rollbackAdmission = this.retainedCheckpoint();
				const pending = new Set();
				for (const limitation of limitations) {
					if (this.#limitations.has(limitation) || pending.has(limitation)) continue;
					if (!this.retain(128 + textBytes$1(limitation.length))) {
						rollbackAdmission();
						return this.overBudget();
					}
					pending.add(limitation);
				}
				return ok(() => {
					for (const limitation of pending) this.#limitations.add(limitation);
				});
			}
			/** Derive budgeted qualifications for this snapshot without retaining old snapshots. */
			snapshotLimitations(derived) {
				const release = this.temporaryCheckpoint();
				if (!this.scratch(derived.reduce((bytes, limitation) => bytes + 128 + textBytes$1(limitation.length), 0))) return this.overBudget();
				try {
					return ok([...new Set([...this.#limitations, ...derived])].sort(compareUnicodeCodePoints));
				} finally {
					release();
				}
			}
			sortedLimitations() {
				return [...this.#limitations].sort(compareUnicodeCodePoints);
			}
		};
		admitHarCaptureParent = (parent, viewKind, accumulator, context = {}) => {
			const operation = context.operation ?? "inspect_analysis_view";
			const sourceField = context.sourceField ?? "source";
			const unsupported = (reason, remediationAction) => err(new AnalysisUnsupportedTargetError(operation, parent.evidenceId, reason, remediationAction === undefined ? undefined : { remediationAction }));
			if (parent.operation !== "inspect_web_network_capture") return unsupported(`View ${viewKind} is unsupported for parent operation ${parent.operation}; ${viewKind} requires ${viewKind === "api-surface" ? "inspect_web_network_capture" : "inspect_web_network_capture or capture_browser_scenario"}.`);
			const admitted = accumulator.admitCaptureClone(parent.normalizedResult);
			if (!admitted.ok) return admitted;
			const parsed = safeParseOwnedWebNetworkCapture(parent.normalizedResult);
			if (!parsed.success) return err(analysisInputErrorFromIssues(operation, parsed.error.issues.map((issue) => ({
				...issue,
				path: [
					sourceField,
					"normalized_result",
					...issue.path
				]
			})), { [sourceField]: { normalized_result: parent.normalizedResult } }, { cause: parsed.error }));
			if (parsed.data.format !== "har") return unsupported(`${viewKind} does not support capture format ${parsed.data.format}.`);
			const { artifact } = parsed.data;
			const subject = evidenceFileTarget(parent);
			if (viewKind !== "api-surface" && artifact.sha256 !== null && (subject == null || subject.sha256 !== artifact.sha256)) return err(analysisViewInputError([{
				path: ["source", "subject"],
				reason: "invalid_value",
				message: "Capture parent subject must identify the report's SHA-256."
			}]));
			const declarations = z.object({ sensitive_value_count: z.number().int().nonnegative() }).safeParse(parent.parameters);
			if (!declarations.success || declarations.data.sensitive_value_count > 0) return unsupported("sensitive_values_unretained", "This view cannot safely project this capture because sensitivity declarations are not retained. Use a compatible capture or summary view to inspect retained observations. Do not remove sensitivity declarations to bypass this restriction.");
			return ok(parsed.data);
		};
	})))();
}

//#endregion
export { WebNetworkProjectionAccumulator, admitAnalysisViewData, admitHarCaptureParent, apiSurfaceFields, apiSurfaceViewSchema, init_WebNetworkProjectionAccumulator, init_analysisViewDataAdmission, init_apiSurfaceSchema };