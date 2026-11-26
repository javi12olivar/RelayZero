import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { analysisErrorRecoverySchema, init_analysisErrorRecovery, init_jsonValue, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { z } from "zod";

//#region dist/domain/analysisErrorProjectionSchema.js
var categorySchema, remediationSchema, common, genericDetails, generic, analysisInputErrorProjectionSchema, analysisResourceErrorProjectionSchema, evidenceIntegrityErrorProjectionSchema, analysisErrorProjectionSchema;
function init_analysisErrorProjectionSchema() {
	return (init_analysisErrorProjectionSchema = __esmMin((() => {
		init_analysisErrorRecovery();
		init_jsonValue();
		categorySchema = z.enum([
			"invalid_input",
			"unsupported_provider",
			"unsupported_target",
			"integrity_mismatch",
			"truncated",
			"cancelled",
			"timeout",
			"resource_constraint",
			"unavailable",
			"execution_failure"
		]);
		remediationSchema = z.object({ action: z.string().min(1) }).strict();
		common = {
			category: categorySchema,
			message: z.string().min(1),
			retryable: z.boolean(),
			remediation: remediationSchema,
			recovery: analysisErrorRecoverySchema.optional()
		};
		genericDetails = z.record(z.string(), jsonValueSchema).optional();
		generic = (code) => z.object({
			code: z.literal(code),
			...common,
			details: genericDetails
		}).strict();
		analysisInputErrorProjectionSchema = generic("invalid_request");
		analysisResourceErrorProjectionSchema = generic("resource_constraint");
		evidenceIntegrityErrorProjectionSchema = generic("evidence_integrity_mismatch");
		analysisErrorProjectionSchema = z.discriminatedUnion("code", [
			analysisInputErrorProjectionSchema,
			generic("access_denied"),
			generic("artifact_changed"),
			generic("unreadable_output"),
			generic("capability_unavailable"),
			generic("unsupported_target"),
			generic("provider_unavailable"),
			generic("provider_timeout"),
			analysisResourceErrorProjectionSchema,
			generic("cancelled"),
			z.object({
				code: z.literal("artifact_integrity_mismatch"),
				...common,
				details: z.union([
					z.object({
						logical_path: z.string(),
						declared_sha256: z.string().nullable(),
						calculated_sha256: z.string().nullable(),
						unpacked: z.boolean()
					}).catchall(jsonValueSchema),
					z.object({
						logical_path: z.string(),
						algorithm: z.literal("md5"),
						declared_md5: z.string().regex(/^[a-f0-9]{32}$/u),
						calculated_md5: z.string().regex(/^[a-f0-9]{32}$/u).nullable(),
						unpacked: z.boolean()
					}).catchall(jsonValueSchema),
					z.object({
						logical_path: z.string(),
						algorithm: z.literal("dfu-crc32"),
						declared_crc32: z.string().regex(/^[a-f0-9]{8}$/u),
						calculated_crc32: z.string().regex(/^[a-f0-9]{8}$/u).nullable(),
						unpacked: z.boolean()
					}).catchall(jsonValueSchema)
				])
			}).strict(),
			generic("artifact_operation_failed"),
			evidenceIntegrityErrorProjectionSchema,
			generic("truncated"),
			generic("process_capture_failed"),
			generic("cleanup_incomplete"),
			generic("revision_conflict"),
			generic("configuration_invalid"),
			generic("target_unavailable"),
			generic("execution_failure")
		]);
	})))();
}

//#endregion
export { analysisErrorProjectionSchema, analysisInputErrorProjectionSchema, analysisResourceErrorProjectionSchema, evidenceIntegrityErrorProjectionSchema, init_analysisErrorProjectionSchema };