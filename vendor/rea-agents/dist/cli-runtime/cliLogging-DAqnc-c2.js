import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, init_analysisErrorBase, init_isRecord, isRecord } from "./jsonSerialization-DAF9DVXC.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisErrorProjectionSchema, init_analysisErrorProjectionSchema } from "./analysisErrorProjectionSchema-BLLVQLxu.js";
import { z } from "zod";

//#region dist/contracts/errorSchemas.js
var analysisCliErrorEnvelopeSchema, analysisErrorJsonSchema;
function init_errorSchemas() {
	return (init_errorSchemas = __esmMin((() => {
		init_analysisErrorProjectionSchema();
		analysisCliErrorEnvelopeSchema = z.object({
			error: z.string().min(1),
			input_path: z.string().optional(),
			input_reason: z.enum([
				"invalid-json",
				"read-failed",
				"too-large"
			]).optional()
		}).passthrough().superRefine((value, context) => {
			const { error: _label, input_path: _inputPath, input_reason: _inputReason, ...projection } = value;
			const parsed = analysisErrorProjectionSchema.safeParse(projection);
			if (!parsed.success) {
				context.addIssue({
					code: "custom",
					message: "CLI error envelope must contain a canonical analysis error projection"
				});
			}
		});
		analysisErrorJsonSchema = z.toJSONSchema(analysisErrorProjectionSchema);
	})))();
}

//#endregion
//#region dist/cliLogging.js
var loggedFailures, canonicalFailure, projectCliOperationFailure, inferCliOperationFailure, cliOperationFailurePayload, isCliOperationFailure, cliOperationFailureIdentity, rebindLoggedCliFailure, logCliCommand;
function init_cliLogging() {
	return (init_cliLogging = __esmMin((() => {
		init_errorSchemas();
		init_analysisErrorProjectionSchema();
		init_analysisErrorBase();
		init_analysisErrorProjection();
		loggedFailures = new WeakMap();
		canonicalFailure = (projection) => ({
			payload: projection,
			identity: {
				code: projection.code,
				category: projection.category,
				retryable: projection.retryable
			}
		});
		projectCliOperationFailure = (value) => {
			if (!isRecord(value)) return undefined;
			const direct = analysisErrorProjectionSchema.safeParse(value);
			if (direct.success) return value;
			const envelope = analysisCliErrorEnvelopeSchema.safeParse(value);
			if (envelope.success) {
				const { error: _label, input_path: inputPath, input_reason: inputReason, ...projection } = value;
				const parsed = projection;
				if (typeof inputPath !== "string" && typeof inputReason !== "string") return parsed;
				return {
					...parsed,
					details: {
						...parsed.details,
						...typeof inputPath === "string" ? { input_path: inputPath } : {},
						...typeof inputReason === "string" ? { input_reason: inputReason } : {}
					}
				};
			}
			if (isRecord(value.error)) {
				const nested = analysisErrorProjectionSchema.safeParse(value.error);
				if (nested.success) return value.error;
			}
			return undefined;
		};
		inferCliOperationFailure = (value) => {
			const projection = projectCliOperationFailure(value);
			if (projection !== undefined) return canonicalFailure(projection);
			if (isRecord(value) && value.healthy === false) return { payload: value };
			return undefined;
		};
		cliOperationFailurePayload = (value) => {
			if (isRecord(value) && loggedFailures.has(value)) return loggedFailures.get(value)?.payload;
			const failure = inferCliOperationFailure(value);
			if (failure !== undefined && isRecord(value)) loggedFailures.set(value, failure);
			return failure?.payload;
		};
		isCliOperationFailure = (value) => cliOperationFailurePayload(value) !== undefined;
		cliOperationFailureIdentity = (value) => isRecord(value) ? loggedFailures.get(value)?.identity : undefined;
		rebindLoggedCliFailure = (previous, next) => {
			if (previous === next || !isRecord(previous) || !isRecord(next)) return;
			if (!loggedFailures.has(previous)) return;
			loggedFailures.set(next, inferCliOperationFailure(next) ?? loggedFailures.get(previous));
		};
		logCliCommand = async (logger, command, execute, isCommandFailure) => {
			const startedAt = performance.now();
			try {
				const value = await execute();
				const inferredFailure = inferCliOperationFailure(value);
				const failed = isCommandFailure?.(value) ?? inferredFailure !== undefined;
				if (isRecord(value)) loggedFailures.set(value, failed ? inferredFailure ?? { payload: value } : undefined);
				logger[failed ? "error" : "info"]({
					command,
					durationMs: Math.round((performance.now() - startedAt) * 100) / 100,
					status: failed ? "error" : "ok"
				}, failed ? "CLI command failed" : "CLI command completed");
				if (failed) process.exitCode ||= 1;
				return value;
			} catch (cause) {
				process.exitCode ||= 1;
				logger.error({
					command,
					durationMs: Math.round((performance.now() - startedAt) * 100) / 100,
					status: "error"
				}, "CLI command failed");
				if (cause instanceof AnalysisError) {
					const projection = projectAnalysisError(cause);
					loggedFailures.set(projection, canonicalFailure(projection));
					return projection;
				}
				throw cause;
			}
		};
	})))();
}

//#endregion
export { cliOperationFailureIdentity, cliOperationFailurePayload, init_cliLogging, isCliOperationFailure, logCliCommand, rebindLoggedCliFailure };