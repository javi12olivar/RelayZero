import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, AnalysisOutputError, explicitValuesOccurIn, init_analysisErrorCore, init_explicitSensitiveValues, init_isRecord, init_localPath, init_schemaAnnotations, init_schemaConstraints, isRecord, jsonDocumentText, localPathStringSchema, schemaAnnotations } from "./jsonSerialization-DAF9DVXC.js";
import { init_internalInvariant, init_safeJson, invariantViolation, safeParseJson } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { init_optionFields, optionFlagName } from "./optionFields-BX4HP9xw.js";
import { cliCommandFor, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { contractDescriptionOperations, distinctOperations, init_commandRegistry, registerCliCommand } from "./commandRegistry-DHcPW-cJ.js";
import { init_cliEvidencePublication, recordCliEvidencePublication } from "./cliEvidencePublication-B9BG22X_.js";
import { init_cliLogging, logCliCommand } from "./cliLogging-DAqnc-c2.js";
import { cliResultControlsIn, failurePartialObservation, init_projectCliAnalysisResult, isObject, projectCliAnalysisResult, projectCliInputFields } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { cliDeliveredEvidence, init_cliResultControls, recordCliDeliveredEvidence, recordCliResultControls } from "./cliResultControls-DJQjaQRr.js";
import { init_commandCancellation, withCommandCancellation } from "./commandCancellation-Ctspf8PE.js";
import { getEvidenceInputContract, init_evidence, init_evidenceInputContract, init_evidenceValidation, init_nativeAddress, isImmutableEvidence, nativeAddressInputSchema, parseEvidence, recognizeEvidence, withEvidenceCallerInputPath } from "./nativeValueFlow-13oOEkkJ.js";
import { init_artifactInspection, readArtifactInspectionSources } from "./artifactInventoryEvidence-Cn2dkXxx.js";
import { init_jsonValueByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { init_explicitSensitiveFailure, redactExplicitFailure } from "./explicitSensitiveFailure-C747xsnc.js";
import { createEvidenceBundle, createImmutableEvidenceBundle, init_evidenceBundle } from "./evidenceBundle-CWOVHJ6o.js";
import { dispatchQueuedInterrupts, init_queuedInterrupts } from "./queuedInterrupts-gxezF6I5.js";
import { evidenceDeliveryCommitted, init_EvidenceBundleCommands, publishEvidenceDelivery } from "./EvidenceBundleCommands-HNZ8Jc46.js";
import { finalizedResult, init_runOwned, runOwned } from "./runOwned-BkKv5e_3.js";
import { init_AnalysisViewService, inspectAnalysisViewValidated } from "./AnalysisViewService-D_M3W3PD.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { bindCliEvidenceCallerPath, finishCliEvidenceCommand, init_cliEvidenceCallerPath } from "./cliEvidenceCallerPath-BMrJ1VvW.js";
import { cliJsonCallerPathSchema, init_cliJsonInput, parseCliJsonInput, resolveCliJsonPaths } from "./cliJsonInput-DxRb6ijM.js";
import { cliDecimalField, cliDecimalShape, init_options } from "./options-BYpy7iiK.js";
import { init_sessionLifecycleInputs, openBinaryTargetSelection } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/application/AnalysisEvidenceSources.js
var analysisEvidenceSources, SOURCE_CLOSURE_INLINE_BYTES, SOURCE_CLOSURE_LISTED_OMISSIONS, SOURCE_CLOSURE_RECOVERY, collectSourceClosure, undeliveredSourceClosure;
function init_AnalysisEvidenceSources() {
	return (init_AnalysisEvidenceSources = __esmMin((() => {
		init_artifactInspection();
		init_evidenceValidation();
		init_jsonValueByteLength();
		init_result();
		analysisEvidenceSources = (complete) => {
			const embedded = complete.operation === "inspect_artifact" ? readArtifactInspectionSources(complete.normalized_result) : ok([]);
			if (!embedded.ok) return err(embedded.error.retainPartialObservation(complete));
			return ok([...embedded.value, complete]);
		};
		SOURCE_CLOSURE_INLINE_BYTES = 64 * 1024;
		SOURCE_CLOSURE_LISTED_OMISSIONS = 64;
		SOURCE_CLOSURE_RECOVERY = "No bundle was written and this invocation retains nothing after exit. Keep any records shown here, or run the operation again after following remediation; that is a new observation and may differ.";
		collectSourceClosure = (observation, captured, options) => {
			const inspection = analysisEvidenceSources(observation);
			const embedded = new Map((inspection.ok ? inspection.value : []).map((record) => [record.evidence_id, record]));
			const held = new Map(captured.map((record) => [record.evidence_id, record]));
			const closure = new Set([observation.evidence_id]);
			for (const evidenceId of observation.evidence_links) closure.add(evidenceId);
			for (const evidenceId of held.keys()) closure.add(evidenceId);
			const records = [];
			const omitted = [];
			let omittedCount = 0;
			let inlineBytes = options.inlineRecords ? SOURCE_CLOSURE_INLINE_BYTES : 0;
			const omit = (evidenceId, reason) => {
				omittedCount += 1;
				if (omitted.length < SOURCE_CLOSURE_LISTED_OMISSIONS) omitted.push({
					evidence_id: evidenceId,
					reason
				});
			};
			for (const evidenceId of closure) {
				if (evidenceId === observation.evidence_id) continue;
				const inObservation = embedded.get(evidenceId);
				const record = inObservation ?? held.get(evidenceId);
				if (record === undefined) {
					omit(evidenceId, "not_captured");
					continue;
				}
				for (const link of record.evidence_links) closure.add(link);
				if (inObservation !== undefined) continue;
				const bytes = jsonValueByteLength(record, inlineBytes);
				if (bytes > inlineBytes) {
					omit(evidenceId, "not_inlined");
					continue;
				}
				records.push(record);
				inlineBytes -= bytes;
			}
			if (closure.size === 1 && inspection.ok) return undefined;
			return {
				publication: "not_published",
				complete: inspection.ok && omittedCount === 0,
				...inspection.ok ? {} : { collection_failure: inspection.error.name },
				records,
				omitted_count: omittedCount,
				omitted,
				recovery: SOURCE_CLOSURE_RECOVERY
			};
		};
		undeliveredSourceClosure = (partialObservation, captured, options) => {
			try {
				const observation = recognizeEvidence(partialObservation);
				return !observation.ok || observation.value === undefined ? undefined : collectSourceClosure(observation.value, captured, options);
			} catch (cause) {
				return {
					publication: "not_published",
					complete: false,
					collection_failure: cause instanceof Error ? cause.name : "unknown",
					recovery: SOURCE_CLOSURE_RECOVERY
				};
			}
		};
	})))();
}

//#endregion
//#region dist/cli/analysisEvidenceDelivery.js
var analysisEvidenceDeliveryOptions, cliEvidenceDeliveryInputError, deliverCliAnalysisEvidence, withUndeliveredSourceClosure, publishCliAnalysisEvidence, publishDeliveredEvidence, revealsSensitiveValue, safeCallerInputPaths, bundleReceipt, publishFailurePartialEvidence, refusedPartialPublication, committedReceipt, publicationCleanupDetails;
function init_analysisEvidenceDelivery() {
	return (init_analysisEvidenceDelivery = __esmMin((() => {
		init_explicitSensitiveValues();
		init_cliEvidencePublication();
		init_cliResultControls();
		init_AnalysisEvidenceSources();
		init_evidence();
		init_analysisErrorProjection();
		init_explicitSensitiveFailure();
		init_result();
		init_analysisErrorCore();
		init_evidenceBundle();
		init_EvidenceBundleCommands();
		init_AnalysisViewService();
		init_localPath();
		init_callerPath();
		init_finishAnalysisCommand();
		init_projectCliAnalysisResult();
		init_cliEvidenceCallerPath();
		analysisEvidenceDeliveryOptions = {
			detail: z.enum(["complete", "summary"]).default("complete").describe("Deliver complete Evidence, or a summary with --evidence_output"),
			evidence_output: localPathStringSchema.optional().describe("Save complete Evidence as a bundle; required for summary delivery. Never overwrites.")
		};
		cliEvidenceDeliveryInputError = (input) => {
			if (input.view !== undefined && input.detail !== "summary") return new AnalysisInputError(input.operation, undefined, [{
				path: ["view"],
				reason: "invalid_value",
				message: "A selected page requires --detail summary and --evidence_output."
			}]);
			return input.detail === "summary" && input.evidenceOutput === undefined ? new AnalysisInputError(input.operation, undefined, [{
				path: ["evidence_output"],
				reason: "invalid_value",
				message: "Summary delivery requires --evidence_output so complete source Evidence remains available."
			}]) : undefined;
		};
		deliverCliAnalysisEvidence = async (input) => {
			const { run, service, providerId, operation, signal, detail, evidenceOutput } = input;
			const redactFailure = (error) => redactExplicitFailure(error, input.sensitiveValues ?? []);
			const inputError = cliEvidenceDeliveryInputError(input);
			if (inputError !== undefined) return finishAnalysisCommand(async () => ({
				ok: false,
				error: inputError
			}), service, providerId, operation, signal, undefined, { redactFailure }).then(projectCliAnalysisResult);
			const callerInputPath = input.callerInputPath === undefined || revealsSensitiveValue(input.callerInputPath, input) ? undefined : input.callerInputPath;
			const callerInputPaths = safeCallerInputPaths(input);
			const complete = await finishAnalysisCommand(callerInputPath === undefined && callerInputPaths === undefined ? run : bindCliEvidenceCallerPath(callerInputPath, run, callerInputPaths), service, providerId, operation, signal, undefined, { redactFailure });
			return publishCliAnalysisEvidence(complete, {
				operation,
				signal,
				detail,
				evidenceOutput,
				...input.sensitiveValues === undefined ? {} : { sensitiveValues: input.sensitiveValues },
				...input.view === undefined ? {} : { view: input.view },
				...input.sourceEvidence === undefined ? {} : { sourceEvidence: input.sourceEvidence }
			});
		};
		withUndeliveredSourceClosure = (failure, input) => {
			if (input.evidenceOutput === undefined || !isObject(failure)) return failure;
			const { details } = failure;
			if (!isObject(details)) return failure;
			const closure = undeliveredSourceClosure(details.partial_observation, input.sourceEvidence ?? [], { inlineRecords: (input.sensitiveValues?.length ?? 0) === 0 });
			return closure === undefined ? failure : {
				...failure,
				details: {
					...details,
					source_closure: closure
				}
			};
		};
		publishCliAnalysisEvidence = async (result, input) => {
			const { detail, evidenceOutput } = input;
			const capturedSources = [...input.sourceEvidence ?? [], ...result.sourceEvidence ?? []];
			const closureInput = capturedSources.length === 0 ? input : {
				...input,
				sourceEvidence: capturedSources
			};
			const projectFailure = (error) => projectAnalysisError(redactExplicitFailure(error, input.sensitiveValues ?? []));
			if (!result.ok) return evidenceOutput === undefined ? result.error : publishFailurePartialEvidence(result.error, evidenceOutput, closureInput);
			const complete = parseEvidence(result.value);
			recordCliDeliveredEvidence(complete);
			const inputError = cliEvidenceDeliveryInputError(input);
			if (inputError !== undefined) {
				inputError.retainPartialObservation(complete);
				return projectFailure(inputError);
			}
			if (evidenceOutput === undefined) return complete;
			const published = await publishDeliveredEvidence(complete, evidenceOutput, closureInput);
			if (!published.ok) {
				const failure = projectFailure(published.error.error);
				return evidenceDeliveryCommitted(published.error.error) ? failure : withUndeliveredSourceClosure(failure, closureInput);
			}
			return detail === "summary" ? {
				summary: published.value.delivered,
				evidence_bundle: published.value.receipt
			} : published.value.delivered;
		};
		publishDeliveredEvidence = async (complete, evidenceOutput, input) => {
			const delivered = input.detail === "summary" ? inspectAnalysisViewValidated({
				source: {
					kind: "inline",
					evidence: complete
				},
				view: input.view ?? { kind: "summary" }
			}) : ok(complete);
			if (!delivered.ok) return err({ error: delivered.error.retainPartialObservation(complete) });
			const selected = input.detail === "summary" && (complete.caller_input_path !== undefined || complete.caller_input_paths !== undefined) ? withEvidenceCallerInputPath(delivered.value, complete.caller_input_path, complete.caller_input_paths) : delivered.value;
			const inspectionSources = analysisEvidenceSources(complete);
			if (!inspectionSources.ok) return err({
				error: inspectionSources.error,
				delivered: selected
			});
			const records = [...new Map([...input.sourceEvidence ?? [], ...inspectionSources.value].map((record) => [record.evidence_id, record])).values()];
			const bundle = records.every(isImmutableEvidence) ? createImmutableEvidenceBundle(records) : createEvidenceBundle(records);
			const published = await publishEvidenceDelivery({
				bundle,
				complete,
				delivered: selected,
				outputPath: absoluteCallerPath(evidenceOutput),
				operation: input.operation,
				signal: input.signal
			});
			if (!published.ok) return err({
				error: published.error,
				delivered: selected
			});
			const { path, bytes } = published.value.evidenceBundle;
			const receipt = bundleReceipt(path, bytes, input);
			recordCliEvidencePublication(receipt);
			return ok({
				delivered: published.value.delivered,
				receipt
			});
		};
		revealsSensitiveValue = (path, input) => explicitValuesOccurIn(path, input.sensitiveValues ?? []);
		safeCallerInputPaths = (input) => {
			if (input.callerInputPaths === undefined) return undefined;
			const kept = Object.entries(input.callerInputPaths).filter(([, value]) => (typeof value === "string" ? [value] : value).every((path) => !revealsSensitiveValue(path, input)));
			return kept.length === 0 ? undefined : Object.fromEntries(kept);
		};
		bundleReceipt = (path, bytes, input) => ({
			...path === undefined || revealsSensitiveValue(path, input) ? {} : { path },
			bytes
		});
		publishFailurePartialEvidence = async (failure, evidenceOutput, input) => {
			if (input.signal.aborted || !isObject(failure) || failure.code === "cancelled" || !isObject(failure.details) || failure.details.partial_observation === undefined) return withUndeliveredSourceClosure(failure, input);
			const details = failure.details;
			const diagnostics = isObject(details.diagnostics) ? details.diagnostics : {};
			let partial;
			try {
				partial = parseEvidence(details.partial_observation);
			} catch {
				return withUndeliveredSourceClosure(failure, input);
			}
			if (partial.operation === input.operation) recordCliDeliveredEvidence(partial);
			const published = await publishDeliveredEvidence(partial, evidenceOutput, input);
			if (!published.ok) {
				const refusal = refusedPartialPublication(failure, details, published.error, input);
				return evidenceDeliveryCommitted(published.error.error) ? refusal : withUndeliveredSourceClosure(refusal, input);
			}
			return {
				...failure,
				details: {
					...details,
					partial_observation: published.value.delivered,
					diagnostics: {
						...diagnostics,
						evidence_bundle: published.value.receipt
					}
				}
			};
		};
		refusedPartialPublication = (failure, details, refused, input) => {
			const diagnostics = isObject(details.diagnostics) ? details.diagnostics : {};
			const refusal = projectAnalysisError(redactExplicitFailure(refused.error, input.sensitiveValues ?? []));
			const refusalDetails = isObject(refusal.details) ? refusal.details : {};
			const receipt = committedReceipt(refusalDetails, input);
			const cleanupIncomplete = refusalDetails.cleanup === "incomplete";
			return {
				...failure,
				...cleanupIncomplete ? {
					code: "cleanup_incomplete",
					retryable: false,
					remediation: refusal.remediation
				} : {},
				details: {
					...details,
					...cleanupIncomplete ? {
						...publicationCleanupDetails(details, refusalDetails),
						execution_failure: details.execution_failure ?? failure.code
					} : {},
					...receipt === undefined || refused.delivered === undefined ? {} : { partial_observation: refused.delivered },
					diagnostics: {
						...diagnostics,
						...receipt === undefined ? {} : { evidence_bundle: receipt },
						evidence_bundle_error: {
							code: refusal.code,
							message: refusal.message,
							limitation: receipt === undefined ? "The partial Evidence was not published to --evidence_output; it remains complete in details.partial_observation." : cleanupIncomplete ? "The partial Evidence was published to --evidence_output, but its staging cleanup remains incomplete; details.resources lists what remains." : "The partial Evidence was published to --evidence_output before delivery stopped."
						}
					}
				}
			};
		};
		committedReceipt = (refusalDetails, input) => {
			if (refusalDetails.published === true && refusalDetails.bytes !== undefined) return bundleReceipt(typeof refusalDetails.published_path === "string" ? refusalDetails.published_path : undefined, refusalDetails.bytes, input);
			const later = isObject(refusalDetails.diagnostics) ? refusalDetails.diagnostics.evidence_bundle : undefined;
			return isObject(later) ? bundleReceipt(typeof later.path === "string" ? later.path : undefined, later.bytes ?? null, input) : undefined;
		};
		publicationCleanupDetails = (details, refusalDetails) => {
			const keep = (key) => refusalDetails[key] === undefined || details[key] !== undefined ? {} : { [key]: refusalDetails[key] };
			const resources = [...Array.isArray(details.resources) ? details.resources : [], ...Array.isArray(refusalDetails.resources) ? refusalDetails.resources : []];
			return {
				...keep("published"),
				...keep("published_path"),
				...keep("bytes"),
				...keep("cleanup_reason"),
				...keep("cleanup_report"),
				cleanup: "incomplete",
				resources
			};
		};
	})))();
}

//#endregion
//#region dist/cli/cliJsonOption.js
var parseCliJsonOption;
function init_cliJsonOption() {
	return (init_cliJsonOption = __esmMin((() => {
		init_analysisErrorCore();
		init_result();
		init_safeJson();
		parseCliJsonOption = (operation, name, text, message) => {
			if (text === undefined) return ok(undefined);
			const parsed = safeParseJson(text);
			return parsed.ok ? parsed : err(new AnalysisInputError(operation, { cause: parsed.cause }, [{
				path: [name],
				reason: "invalid_format",
				expected: "JSON",
				message
			}]));
		};
	})))();
}

//#endregion
//#region dist/cli/analysisSelector.js
var requiredSelectorGuidance, addressOrProcedureGuidance, equalSelectorGuidance, dataTypeSelectorGuidance, selectCliAnalysisSelector;
function init_analysisSelector() {
	return (init_analysisSelector = __esmMin((() => {
		init_nativeAddress();
		init_analysisErrorCore();
		init_result();
		requiredSelectorGuidance = (alternatives) => `Supply at least one of ${alternatives}.`;
		addressOrProcedureGuidance = requiredSelectorGuidance("the positional address or --procedure");
		equalSelectorGuidance = "Equal values are accepted; conflicts fail.";
		dataTypeSelectorGuidance = "Supply exactly one of --type or --address.";
		selectCliAnalysisSelector = (positional, named, selector) => {
			const { option, operation, kind, required } = selector;
			const equivalent = () => {
				if (positional === named) return true;
				if (kind !== "native") return false;
				const left = nativeAddressInputSchema.safeParse(positional);
				const right = nativeAddressInputSchema.safeParse(named);
				return left.success && right.success && left.data === right.data;
			};
			if (positional !== undefined && named !== undefined && !equivalent()) return err(new AnalysisInputError(operation, undefined, [{
				path: [option],
				reason: "invalid_value",
				message: `The positional selector and --${option} select different objects; supply one selector.`
			}]));
			const selected = named ?? positional;
			if (selected === undefined && required) return err(new AnalysisInputError(operation, undefined, [{
				path: [option],
				reason: "missing_argument",
				message: `Supply a positional selector or --${option}=<value>. Use the named option for values beginning with a dash.`,
				expected: "string"
			}]));
			return ok(selected);
		};
	})))();
}

//#endregion
//#region dist/cli/contractCliDescription.js
var projectedCommand, SESSION_TARGET_KEY, viewOptionHelp, contractNamed, camelCase, admitsOmission, isWrapper, core, describedThroughWrappers, jsonTextField, assertArgvField, inboundView, argvDecimal, argvOptional, OBJECT_CONSTRAINTS, ROOT_ANNOTATIONS, renameConstraint, projectObjectConstraints, branchSelectingFlag, textValues, branchSelectingChoice, branchOnlyField, withoutDefault, selectInputBranches, inputFields, admitDocumentCallerPath, DOCUMENT_KEY, describeTargetOpening, describeSessionTarget, describeEvidenceTargets, admitDocumentDelivery, describeContractDocumentCommand, describeContractCommand, decodeInlineJson, admitGroupMembers, selectSpelledSelector, admitInvocation, describeOperationChoices;
function init_contractCliDescription() {
	return (init_contractCliDescription = __esmMin((() => {
		init_cliCommandNames();
		init_analysisErrorCore();
		init_inputIssueProjection();
		init_localPath();
		init_schemaAnnotations();
		init_result();
		init_callerPath();
		init_analysisEvidenceDelivery();
		init_cliJsonOption();
		init_evidenceInputContract();
		init_cliJsonInput();
		init_safeJson();
		init_options();
		init_analysisSelector();
		init_optionFields();
		projectedCommand = (contract, command) => {
			if (command !== undefined) return command;
			if (contract.cli !== true) throw new Error(`${contract.name} does not declare its CLI command`);
			return cliCommandFor(contract.name);
		};
		SESSION_TARGET_KEY = "path";
		viewOptionHelp = (viewDelivery) => viewDelivery.viewSelectsSummary === true ? "JSON page selection; selects summary delivery, which requires --evidence_output" : "JSON page selection; requires --detail summary and --evidence_output";
		contractNamed = (contracts, name) => {
			const contract = contracts.find((candidate) => candidate.name === name);
			if (contract === undefined) throw new Error(`Missing tool contract: ${name}`);
			return contract;
		};
		camelCase = (field) => field.replaceAll(/_([a-z0-9])/gu, (_, letter) => letter.toUpperCase());
		admitsOmission = (field) => z.object({ value: field }).safeParse({}).success;
		isWrapper = (value) => value instanceof z.ZodOptional || value instanceof z.ZodExactOptional || value instanceof z.ZodDefault || value instanceof z.ZodPrefault || value instanceof z.ZodNullable || value instanceof z.ZodReadonly;
		core = (value) => {
			let current = value;
			while (isWrapper(current)) current = current.unwrap();
			return current;
		};
		describedThroughWrappers = (value) => {
			let current = value;
			while (current.description === undefined && isWrapper(current)) current = current.unwrap();
			return current.description;
		};
		jsonTextField = (declared, flag) => {
			const value = declared instanceof z.ZodOptional || declared instanceof z.ZodExactOptional ? declared.unwrap() : declared;
			const expected = core(value) instanceof z.ZodObject ? "a JSON object" : "valid JSON";
			const decoded = z.string().transform((text, context) => {
				const parsed = safeParseJson(text);
				if (parsed.ok) return parsed.value;
				context.addIssue({
					code: "custom",
					message: `${flag} must be ${expected}`
				});
				return z.NEVER;
			}).pipe(value);
			const admitted = admitsOmission(declared) ? decoded.optional() : decoded;
			return declared.description === undefined ? admitted : admitted.describe(declared.description);
		};
		assertArgvField = (contract, field, schema) => {
			const current = core(schema);
			const text = (member) => member instanceof z.ZodString || member instanceof z.ZodEnum || member instanceof z.ZodLiteral && [...member.values].every((value) => typeof value === "string");
			const scalar = current instanceof z.ZodString || current instanceof z.ZodNumber || current instanceof z.ZodBoolean || current instanceof z.ZodEnum || current instanceof z.ZodUnion && current.options.every(text);
			const element = current instanceof z.ZodArray ? core(current.element) : null;
			if (!scalar && !(element instanceof z.ZodString || element instanceof z.ZodEnum || element instanceof z.ZodNumber)) throw new Error(`${contract}.${field} has no argv projection; declare one before exposing it on the CLI`);
		};
		inboundView = (field) => {
			const inbound = (schema) => {
				if (schema instanceof z.ZodPipe && schema.out instanceof z.ZodTransform) return inbound(schema.in) ?? schema.in;
				if (schema instanceof z.ZodArray) {
					const element = inbound(schema.element);
					return element === undefined ? undefined : schema.clone({
						...schema.def,
						element
					});
				}
				return undefined;
			};
			const view = inbound(core(field));
			if (view === undefined) return undefined;
			const optional = admitsOmission(field) ? view.optional() : view;
			const description = field.description ?? view.description;
			return description === undefined ? optional : optional.describe(description);
		};
		argvDecimal = (field) => {
			const array = core(field);
			if (!(array instanceof z.ZodArray) || !(core(array.element) instanceof z.ZodNumber)) return cliDecimalShape({ field }).field;
			if (field instanceof z.ZodDefault) throw new Error("A defaulted number array has no argv projection");
			const decimal = new z.ZodArray({
				...array._zod.def,
				element: cliDecimalField(array.element)
			});
			const admitted = admitsOmission(field) ? decimal.optional() : decimal;
			return field.description === undefined ? admitted : admitted.describe(field.description);
		};
		argvOptional = (field) => {
			if (!(field instanceof z.ZodExactOptional)) return field;
			const optional = field.unwrap().optional();
			return field.description === undefined ? optional : optional.describe(field.description);
		};
		OBJECT_CONSTRAINTS = [
			"dependentRequired",
			"if",
			"then",
			"else"
		];
		ROOT_ANNOTATIONS = new Set([
			"description",
			"title",
			"examples"
		]);
		renameConstraint = (contract, value, rename) => {
			if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error(`${contract} has an unsupported object constraint`);
			return Object.fromEntries(Object.entries(value).map(([keyword, inner]) => {
				if (keyword === "required" && Array.isArray(inner)) return [keyword, inner.map((field) => rename(field))];
				if (keyword === "properties" && typeof inner === "object" && inner) return [keyword, Object.fromEntries(Object.entries(inner).map(([field, schema]) => [rename(field), schema]))];
				throw new Error(`${contract} object constraint keyword ${keyword} has no CLI projection`);
			}));
		};
		projectObjectConstraints = (contract, rename, discriminatorFields, cliOptionDependencies, nullFlagLimits) => {
			const metadata = contract.inputSchema.meta() ?? {};
			for (const keyword of Object.keys(metadata)) if (!ROOT_ANNOTATIONS.has(keyword) && !OBJECT_CONSTRAINTS.includes(keyword)) throw new Error(`${contract.name} input keyword ${keyword} has no CLI projection`);
			const { rootDiscriminator } = schemaAnnotations(contract.inputSchema) ?? {};
			if (rootDiscriminator !== undefined && !discriminatorFields.has(rootDiscriminator)) throw new Error(`${contract.name} root discriminator ${rootDiscriminator} has no CLI projection`);
			const projected = {};
			for (const keyword of OBJECT_CONSTRAINTS) {
				const value = metadata[keyword];
				if (value === undefined) continue;
				projected[keyword] = keyword === "dependentRequired" ? Object.fromEntries(Object.entries(value).map(([field, required]) => [rename(field), required.map(rename)])) : renameConstraint(contract.name, value, rename);
			}
			if (Object.keys(cliOptionDependencies).length > 0) projected.dependentRequired = {
				...projected.dependentRequired,
				...cliOptionDependencies
			};
			if (nullFlagLimits.length > 1) throw new Error(`${contract.name} has more than one null flag`);
			for (const [flag, limit] of nullFlagLimits) projected.not = {
				required: [flag, limit],
				properties: { [flag]: { const: true } }
			};
			return Object.keys(projected).length === 0 ? undefined : projected;
		};
		branchSelectingFlag = (branches) => {
			const values = branches.map((branch) => {
				const value = branch === undefined ? undefined : core(branch);
				return value instanceof z.ZodLiteral && value.values.size === 1 ? [...value.values][0] : undefined;
			});
			if (values.some((value) => typeof value !== "boolean") || new Set(values).size !== 2) return undefined;
			const omissions = branches.filter((branch) => admitsOmission(branch));
			if (omissions.length > 1) return undefined;
			const flag = z.boolean();
			return omissions.length === 0 ? flag : flag.default(omissions[0].parse(undefined));
		};
		textValues = (field) => {
			const value = field === undefined ? undefined : core(field);
			const values = value instanceof z.ZodLiteral ? [...value.values] : value instanceof z.ZodEnum ? value.options : undefined;
			return values?.every((entry) => typeof entry === "string") ? values : undefined;
		};
		branchSelectingChoice = (branches) => {
			const valueSets = branches.map(textValues);
			if (valueSets.some((values) => values === undefined)) return undefined;
			const values = valueSets.flatMap((values) => values);
			const omissions = branches.filter((branch) => admitsOmission(branch));
			if (new Set(values).size !== values.length || omissions.length > 1) return undefined;
			const choice = z.enum(values);
			const omitted = omissions[0]?.parse(undefined);
			const chosen = omissions.length === 0 ? choice : omitted === undefined ? choice.optional() : choice.default(omitted);
			const described = branches.find((branch) => branch.description);
			return described === undefined ? chosen : chosen.describe(described.description);
		};
		branchOnlyField = (branches) => {
			const declared = branches.filter((branch) => branch !== undefined);
			const [first] = declared;
			if (first === undefined || declared.length === branches.length || declared.some((branch) => branch !== first)) return undefined;
			if (admitsOmission(first)) return withoutDefault(first);
			const optional = first.optional();
			return first.description === undefined ? optional : optional.describe(first.description);
		};
		withoutDefault = (schema) => {
			if (!(schema instanceof z.ZodDefault)) return schema;
			const value = schema.parse(undefined);
			const omittable = schema.removeDefault().optional();
			return omittable.meta({
				...schema.meta(),
				default: value
			});
		};
		selectInputBranches = (contract, selection) => {
			const schema = contract.inputSchema;
			if (selection === undefined) return {
				inputSchema: schema,
				fixed: undefined
			};
			const { field, values } = selection;
			if (schema instanceof z.ZodObject) throw new Error(`${contract.name} has one input branch`);
			const covered = new Set();
			const selected = schema.options.filter((branch) => {
				const admitted = textValues(branch.shape[field]);
				if (admitted === undefined) throw new Error(`${contract.name}.${field} does not tell branches apart`);
				const chosen = admitted.filter((value) => values.includes(value));
				if (chosen.length > 0 && chosen.length !== admitted.length) throw new Error(`${contract.name}.${field} would narrow an input branch`);
				for (const value of chosen) covered.add(value);
				return chosen.length > 0;
			});
			if (covered.size !== new Set(values).size) throw new Error(`${contract.name}.${field} selects no branch for a value`);
			return {
				inputSchema: selected.length === 1 ? selected[0] : z.union(selected),
				fixed: values.length === 1 ? [field, values[0]] : undefined
			};
		};
		inputFields = (contract, unprojectedFields) => {
			const schema = contract.inputSchema;
			if (schema instanceof z.ZodObject) return {
				shape: schema.shape,
				selectors: new Set()
			};
			const shapes = schema.options.map((option) => option.shape);
			const names = new Set(shapes.flatMap((shape) => Object.keys(shape)));
			const selectors = new Set();
			const shape = Object.fromEntries([...names].map((field) => {
				const branches = shapes.map((shape) => shape[field]);
				const [first] = branches;
				if (branches.every((branch) => branch === first)) return [field, first];
				const selector = branchSelectingFlag(branches) ?? branchSelectingChoice(branches);
				if (selector !== undefined) {
					selectors.add(field);
					return [field, selector];
				}
				const branchOnly = branchOnlyField(branches);
				if (branchOnly !== undefined) return [field, branchOnly];
				if (!unprojectedFields.has(field) || branches.some((branch) => branch === undefined)) throw new Error(`${contract.name}.${field} differs between input branches and has no argv projection`);
				return [field, z.union(branches)];
			}));
			return {
				shape,
				selectors
			};
		};
		admitDocumentCallerPath = (schema, path) => {
			const [head, ...tail] = path;
			if (head === undefined) {
				const admitted = core(schema) instanceof z.ZodArray ? z.array(cliJsonCallerPathSchema) : cliJsonCallerPathSchema;
				const field = admitsOmission(schema) ? admitted.optional() : admitted;
				return schema.description === undefined ? field : field.describe(schema.description);
			}
			if (schema instanceof z.ZodOptional || schema instanceof z.ZodExactOptional || schema instanceof z.ZodDefault || schema instanceof z.ZodPrefault || schema instanceof z.ZodNullable || schema instanceof z.ZodReadonly) return z.clone(schema, {
				...schema.def,
				innerType: admitDocumentCallerPath(schema.unwrap(), path)
			}, { parent: true });
			if (schema instanceof z.ZodUnion) return z.clone(schema, {
				...schema.def,
				options: schema.options.map((option) => admitDocumentCallerPath(option, path))
			}, { parent: true });
			if (schema instanceof z.ZodObject && Object.hasOwn(schema.shape, head)) return z.clone(schema, {
				...schema.def,
				shape: {
					...schema.shape,
					[head]: admitDocumentCallerPath(schema.shape[head], tail)
				}
			}, { parent: true });
			return schema;
		};
		DOCUMENT_KEY = "inputJson";
		describeTargetOpening = (opening) => {
			const opener = opening?.contract.name ?? "";
			const shape = opening?.contract.inputSchema.shape ?? {};
			const options = Object.entries(opening?.fields ?? {}).map(([field, projected]) => {
				const declared = shape[field];
				if (declared === undefined || field === SESSION_TARGET_KEY) throw new Error(`${opener} has no option field ${field}`);
				if (!admitsOmission(declared)) throw new Error(`${opener}.${field} is required`);
				let schema;
				if (projected.callerPath === true) {
					if (!(core(declared) instanceof z.ZodString)) throw new Error(`${opener}.${field} is not a path`);
					schema = localPathStringSchema.optional();
				} else if (projected.values === undefined) {
					assertArgvField(opener, field, declared);
					schema = argvDecimal(argvOptional(declared));
				} else {
					for (const value of projected.values) if (!declared.safeParse(value).success) throw new Error(`${opener}.${field} does not admit ${value}`);
					schema = z.enum(projected.values).optional();
				}
				const description = projected.description ?? describedThroughWrappers(declared);
				if (description !== undefined) schema = schema.describe(description);
				return {
					field,
					key: projected.name ?? camelCase(field),
					description,
					schema,
					callerPath: projected.callerPath === true
				};
			});
			const keyOf = new Map(options.map(({ field, key }) => [field, key]));
			const callerPaths = new Set(options.flatMap(({ field, callerPath }) => callerPath ? [field] : []));
			return {
				options,
				admit: (operation, values, target) => {
					if (opening === undefined) return ok({});
					const selected = Object.fromEntries(options.flatMap(({ field, key }) => values[key] === undefined ? [] : [[field, values[key]]]));
					if (Object.keys(selected).length === 0) return ok({});
					const candidate = {
						...Object.fromEntries(Object.entries(selected).map(([field, value]) => [field, callerPaths.has(field) ? absoluteCallerPath(value) : value])),
						[SESSION_TARGET_KEY]: absoluteCallerPath(target)
					};
					const admitted = opening.contract.inputSchema.safeParse(candidate);
					if (!admitted.success) return err(analysisInputErrorFromIssues(operation, admitted.error.issues.map((issue) => {
						const [field, ...rest] = issue.path;
						const key = typeof field === "string" ? keyOf.get(field) : undefined;
						return key === undefined ? issue : {
							...issue,
							path: [key, ...rest]
						};
					}), selected));
					const data = admitted.data;
					return ok(Object.fromEntries(Object.keys(selected).map((field) => [field, callerPaths.has(field) ? selected[field] : data[field]])));
				}
			};
		};
		describeSessionTarget = (target) => {
			if (target === undefined) return undefined;
			const { options, admit } = describeTargetOpening(target.open);
			return {
				key: SESSION_TARGET_KEY,
				schema: localPathStringSchema.describe(target.description),
				opening: target.open?.contract.name,
				options,
				admitOpening: (operation, values) => admit(operation, values, values[SESSION_TARGET_KEY])
			};
		};
		describeEvidenceTargets = (contract, shape, targets) => {
			if (targets === undefined) return undefined;
			const { options, admit } = describeTargetOpening(targets.source);
			const described = Object.entries(targets.fields).flatMap(([field, projected]) => {
				if (projected === undefined) return [];
				const declared = shape[field];
				if (declared === undefined) throw new Error(`${contract.name} has no input field ${field}`);
				if (admitsOmission(declared)) throw new Error(`${contract.name}.${field} is not a required field`);
				return [{
					field,
					key: projected.name ?? camelCase(field),
					schema: localPathStringSchema.describe(projected.description)
				}];
			});
			if (described.length === 0) throw new Error(`${contract.name} declares no Evidence target`);
			return {
				source: targets.source.contract.name,
				targets: described,
				options,
				sourceFlags: Object.fromEntries(options.map(({ field, key }) => [field, `--${optionFlagName(key)}`])),
				admitSource: (operation, values) => {
					let admitted = ok({});
					for (const { key } of described) {
						admitted = admit(operation, values, values[key]);
						if (!admitted.ok) return admitted;
					}
					return admitted;
				}
			};
		};
		admitDocumentDelivery = (operation, viewDelivery, values) => {
			let view;
			if (viewDelivery !== undefined) {
				const decoded = parseCliJsonOption(operation, "view", values.view, viewDelivery.invalidJson);
				if (!decoded.ok) return decoded;
				if (decoded.value !== undefined) {
					const candidate = { view: decoded.value };
					const parsed = z.object({ view: viewDelivery.schema }).safeParse(candidate);
					if (!parsed.success) return err(analysisInputErrorFromIssues(operation, parsed.error.issues, candidate));
					const selected = parsed.data.view;
					view = viewDelivery.kind === undefined ? selected : {
						kind: viewDelivery.kind,
						...selected
					};
				}
			}
			const detail = values.detail ?? (view === undefined ? "complete" : "summary");
			const delivery = {
				detail,
				evidenceOutput: values.evidence_output,
				...view === undefined ? {} : { view }
			};
			const refused = cliEvidenceDeliveryInputError({
				...delivery,
				operation
			});
			return refused === undefined ? ok(delivery) : err(refused);
		};
		describeContractDocumentCommand = (contract, projection) => {
			const omitted = Object.fromEntries(Object.entries(projection.omit ?? {}).filter((entry) => typeof entry[1] === "string"));
			const evidenceDelivery = projection.evidenceDelivery === true;
			const { viewDelivery } = projection;
			if (viewDelivery !== undefined && !evidenceDelivery) throw new Error(`${contract.name} view delivery requires evidenceDelivery`);
			const flagged = Object.fromEntries((evidenceDelivery ? viewDelivery === undefined ? ["detail"] : ["detail", "view"] : []).map((field) => [field, field]));
			for (const field of Object.keys(flagged)) if (Object.hasOwn(omitted, field)) throw new Error(`${contract.name}.${field} is both omitted and an option`);
			const removed = [...Object.keys(omitted), ...Object.keys(flagged)];
			let admitted = contract.inputSchema;
			let viewSchema = z.never();
			if (removed.length > 0) {
				const schema = contract.inputSchema;
				if (!(schema instanceof z.ZodObject)) throw new Error(`${contract.name} omits fields from a union input`);
				const shape = schema.shape;
				for (const field of removed) if (!Object.hasOwn(shape, field) || !admitsOmission(shape[field])) throw new Error(`${contract.name}.${field} is not an optional field`);
				if (viewDelivery !== undefined) viewSchema = shape.view;
				admitted = schema.omit(Object.fromEntries(removed.map((field) => [field, true])));
			}
			const callerPaths = projection.callerPaths ?? [];
			for (const path of callerPaths) admitted = admitDocumentCallerPath(admitted, path);
			const cliOptions = projection.cliOptions ?? {};
			const deliveryOptions = Object.entries({
				...evidenceDelivery ? {
					detail: viewDelivery?.viewSelectsSummary === true ? analysisEvidenceDeliveryOptions.detail.unwrap().optional() : analysisEvidenceDeliveryOptions.detail,
					evidence_output: analysisEvidenceDeliveryOptions.evidence_output
				} : {},
				...viewDelivery === undefined ? {} : { view: z.string().optional().describe(viewOptionHelp(viewDelivery)) }
			}).map(([key, schema]) => ({
				key,
				description: schema.description,
				schema
			}));
			const sessionTarget = describeSessionTarget(projection.sessionTarget);
			const keys = [
				DOCUMENT_KEY,
				...sessionTarget === undefined ? [] : [sessionTarget.key, ...sessionTarget.options.map(({ key }) => key)],
				...Object.keys(cliOptions),
				...deliveryOptions.map(({ key }) => key)
			];
			if (new Set(keys).size !== keys.length) throw new Error(`${contract.name} projects two fields to one CLI key`);
			const documentRefusals = {
				...Object.fromEntries(Object.entries(omitted).map(([field, reason]) => [field, `${field} is not accepted by this command: ${reason}`])),
				...Object.fromEntries(Object.entries(flagged).map(([field, key]) => [field, `${field} is not accepted in the document: pass --${key} beside it`]))
			};
			return {
				command: projectedCommand(contract, projection.command),
				description: projection.description,
				contract,
				key: DOCUMENT_KEY,
				documentDescription: projection.document,
				content: getEvidenceInputContract(admitted).frameSchema,
				callerPaths,
				omitted,
				flagged,
				documentRefusals,
				deliveryOptions,
				admitDelivery: (values) => evidenceDelivery ? admitDocumentDelivery(contract.name, viewDelivery === undefined ? undefined : {
					...viewDelivery,
					schema: viewSchema
				}, values) : ok(undefined),
				sessionTarget,
				cliOnlyOptions: Object.entries(cliOptions).map(([key, schema]) => ({
					key,
					description: schema.description,
					schema
				})),
				cliOptionValues: (values) => Object.fromEntries(Object.keys(cliOptions).flatMap((key) => values[key] === undefined ? [] : [[key, values[key]]]))
			};
		};
		describeContractCommand = (contract, projection) => {
			const evidenceDelivery = projection.evidenceDelivery === true;
			const { viewDelivery } = projection;
			if (viewDelivery !== undefined && !evidenceDelivery) throw new Error(`${contract.name} view delivery requires evidenceDelivery`);
			const deliveryFields = new Set(evidenceDelivery ? viewDelivery === undefined ? ["detail"] : ["detail", "view"] : []);
			if (projection.sessionTarget !== undefined && projection.evidenceTargets !== undefined) throw new Error(`${contract.name} takes both a session target and Evidence targets`);
			const targetFields = new Set(Object.keys(projection.evidenceTargets?.fields ?? {}));
			const handlerFields = projection.handlerFields ?? [];
			const branches = selectInputBranches(contract, projection.inputBranches);
			const fixedFields = new Map(branches.fixed === undefined ? [] : [branches.fixed]);
			const unprojectedFields = new Set([
				...deliveryFields,
				...Object.keys(projection.omit ?? {}),
				...targetFields,
				...handlerFields,
				...fixedFields.keys()
			]);
			const { shape, selectors } = inputFields({
				name: contract.name,
				inputSchema: branches.inputSchema
			}, unprojectedFields);
			if (viewDelivery !== undefined && !admitsOmission(shape.view ?? z.never())) throw new Error(`${contract.name} has no optional input field view`);
			const positionals = projection.positionals ?? [];
			const selectorOptions = projection.selectorOptions ?? {};
			for (const field of Object.keys(selectorOptions)) if (!positionals.includes(field)) throw new Error(`${contract.name}.${field} is not a positional selector`);
			const callerPaths = new Set(projection.callerPaths ?? []);
			const fieldProjections = projection.fields ?? {};
			const jsonTextFields = new Set(projection.jsonText ?? []);
			const jsonInputFields = projection.jsonInputs ?? {};
			for (const field of Object.keys(jsonInputFields)) if (Object.hasOwn(projection.runtimeJson ?? {}, field)) throw new Error(`${contract.name}.${field} is JSON text and JSON input`);
			const jsonInputChecks = projection.jsonInputChecks ?? {};
			for (const field of Object.keys(jsonInputChecks)) if (!Object.hasOwn(jsonInputFields, field)) throw new Error(`${contract.name}.${field} is checked but not a JSON input`);
			const runtimeJsonFields = {
				...projection.runtimeJson,
				...jsonInputFields
			};
			const nullFlags = projection.nullFlags ?? {};
			const omitted = Object.fromEntries(Object.entries(projection.omit ?? {}).filter((entry) => typeof entry[1] === "string"));
			for (const field of [
				...positionals,
				...callerPaths,
				...jsonTextFields,
				...Object.keys(runtimeJsonFields),
				...Object.keys(nullFlags),
				...Object.keys(projection.flatten ?? {}),
				...Object.keys(fieldProjections),
				...Object.keys(omitted)
			]) {
				if (!Object.hasOwn(shape, field)) throw new Error(`${contract.name} has no input field ${field}`);
				if (targetFields.has(field)) throw new Error(`${contract.name}.${field} is an Evidence target`);
				if (handlerFields.includes(field)) throw new Error(`${contract.name}.${field} is filled by the handler`);
				if (fixedFields.has(field)) throw new Error(`${contract.name}.${field} is fixed by its input branch`);
			}
			const fieldGroups = projection.fieldGroups ?? {};
			const groupedFields = new Set();
			const projectedFields = new Set([
				...positionals,
				...callerPaths,
				...jsonTextFields,
				...Object.keys(runtimeJsonFields),
				...Object.keys(nullFlags),
				...Object.keys(projection.flatten ?? {}),
				...Object.keys(fieldProjections),
				...Object.keys(omitted),
				...unprojectedFields
			]);
			for (const group of Object.values(fieldGroups)) for (const field of group?.fields ?? []) {
				if (!Object.hasOwn(shape, field)) throw new Error(`${contract.name} has no input field ${field}`);
				if (projectedFields.has(field) || groupedFields.has(field)) throw new Error(`${contract.name}.${field} is projected twice`);
				if (!admitsOmission(shape[field])) throw new Error(`${contract.name}.${field} is a required group member`);
				groupedFields.add(field);
			}
			for (const field of handlerFields) {
				if (!Object.hasOwn(shape, field)) throw new Error(`${contract.name} has no input field ${field}`);
				if (targetFields.has(field)) throw new Error(`${contract.name}.${field} is an Evidence target`);
			}
			for (const field of Object.keys(omitted)) if (!admitsOmission(shape[field])) throw new Error(`${contract.name}.${field} is required on the CLI`);
			const parameter = (field) => {
				const inbound = inboundView(shape[field]);
				const declared = inbound ?? shape[field];
				const projected = fieldProjections[field];
				const callerPath = callerPaths.has(field);
				const delivery = deliveryFields.has(field);
				const viewSelection = delivery && field === "view";
				const jsonText = jsonTextFields.has(field);
				const runtimeJson = viewSelection ? viewDelivery?.invalidJson : runtimeJsonFields[field];
				const jsonInput = !viewSelection && Object.hasOwn(jsonInputFields, field);
				const nullFlag = nullFlags[field]?.key;
				const key = projected?.name ?? camelCase(field);
				let schema;
				if (runtimeJson !== undefined) {
					const text = jsonInput ? z.string().min(1) : z.string();
					schema = declared instanceof z.ZodDefault ? text.default(JSON.stringify(declared.parse(undefined))) : admitsOmission(declared) ? text.optional() : text;
					if (viewSelection && viewDelivery !== undefined) schema = schema.describe(viewOptionHelp(viewDelivery));
				} else if (nullFlag !== undefined) {
					if (!declared.safeParse(null).success) throw new Error(`${contract.name}.${field} does not admit null`);
					assertArgvField(contract.name, field, declared);
					schema = argvDecimal(core(declared).optional());
				} else if (delivery) schema = viewDelivery?.viewSelectsSummary === true ? analysisEvidenceDeliveryOptions.detail.unwrap().optional() : analysisEvidenceDeliveryOptions.detail;
				else if (jsonText) schema = jsonTextField(declared, optionFlagName(key));
				else if (callerPath) {
					const admitted = core(declared) instanceof z.ZodArray ? z.array(localPathStringSchema) : localPathStringSchema;
					schema = admitsOmission(declared) ? admitted.optional() : admitted;
				} else {
					assertArgvField(contract.name, field, declared);
					schema = argvDecimal(argvOptional(declared));
				}
				if (projected?.default !== undefined) {
					if (admitsOmission(declared) || !declared.safeParse(projected.default).success) throw new Error(`${contract.name}.${field} cannot take the CLI default ${String(projected.default)}`);
					const described = schema.description;
					schema = schema.default(projected.default);
					if (described !== undefined) schema = schema.describe(described);
				}
				const described = projected?.description ?? schema.description ?? describedThroughWrappers(declared);
				if (described !== undefined && described !== schema.description) schema = schema.describe(described);
				if (!delivery && projected?.default === undefined) schema = withoutDefault(schema);
				const description = schema.description ?? described;
				const value = core(declared);
				const selector = selectorOptions[field];
				let selectorOption;
				if (selector !== undefined) {
					if (!(value instanceof z.ZodString)) throw new Error(`${contract.name}.${field} is not a text selector`);
					if (value.safeParse("").success) throw new Error(`${contract.name}.${field} admits an empty selector`);
					schema = schema.optional();
					if (description !== undefined) schema = schema.describe(description);
					selectorOption = {
						key: selector.name,
						valueKey: `--${selector.name}`,
						description: selector.description,
						schema: schema.describe(selector.description),
						kind: selector.kind ?? "text",
						required: selector.required === true || !admitsOmission(declared),
						alternative: selector.alternative === undefined ? undefined : {
							key: selector.alternative.name,
							valueKey: `--${selector.alternative.name}`,
							schema: selector.alternative.schema.optional().describe(selector.alternative.description),
							selects: selector.alternative.selects
						}
					};
				}
				return {
					field,
					key,
					positional: positionals.includes(field),
					alias: projected?.alias,
					description,
					schema,
					inbound: inbound !== undefined,
					booleanFlag: value instanceof z.ZodBoolean,
					cliDefault: projected?.default,
					repeatable: value instanceof z.ZodArray,
					decimal: value instanceof z.ZodNumber,
					callerPath,
					delivery,
					jsonText,
					viewSelection,
					runtimeJson,
					jsonInput,
					checkJsonInput: jsonInputChecks[field],
					nullFlag,
					member: undefined,
					selectorOption,
					group: undefined
				};
			};
			const flattened = projection.flatten ?? {};
			const memberParameters = (field, path, declared, members, enclosingRequired) => {
				const object = core(declared);
				const name = [field, ...path].join(".");
				if (!(object instanceof z.ZodObject)) throw new Error(`${contract.name}.${name} is not an object`);
				const required = enclosingRequired && !admitsOmission(declared);
				const positional = path.length === 0 && positionals.includes(field);
				if (positional && !required) throw new Error(`${contract.name}.${name} is an optional positional object`);
				const memberShape = object.shape;
				if (Object.keys(members).toSorted().join() !== Object.keys(memberShape).toSorted().join()) throw new Error(`${contract.name}.${name} flattens other members`);
				const memberParameterList = Object.entries(memberShape).flatMap(([member, memberDeclared]) => {
					const projected = members[member];
					const memberPath = [...path, member];
					const memberName = [field, ...memberPath].join(".");
					if ("flatten" in projected) {
						if (positional) throw new Error(`${contract.name}.${memberName} is a positional object`);
						return memberParameters(field, memberPath, memberDeclared, projected.flatten, required);
					}
					const memberRequired = required && !admitsOmission(memberDeclared);
					if (positional && !memberRequired) throw new Error(`${contract.name}.${memberName} is an optional positional`);
					const omittable = (schema) => memberRequired ? schema : schema.optional();
					const callerPath = projected.callerPath === true;
					let schema;
					if (callerPath) {
						if (!(core(memberDeclared) instanceof z.ZodString)) throw new Error(`${contract.name}.${memberName} is not a path`);
						schema = omittable(localPathStringSchema);
					} else {
						assertArgvField(contract.name, memberName, memberDeclared);
						schema = argvDecimal(omittable(withoutDefault(memberDeclared)));
					}
					const description = projected.description ?? describedThroughWrappers(memberDeclared);
					if (description !== undefined) schema = schema.describe(description);
					const value = core(memberDeclared);
					return [{
						field,
						key: projected.name ?? camelCase(member),
						positional,
						alias: projected.alias,
						description,
						schema,
						inbound: false,
						booleanFlag: value instanceof z.ZodBoolean,
						cliDefault: undefined,
						repeatable: value instanceof z.ZodArray,
						decimal: value instanceof z.ZodNumber,
						callerPath,
						delivery: false,
						jsonText: false,
						viewSelection: false,
						runtimeJson: undefined,
						jsonInput: false,
						checkJsonInput: undefined,
						nullFlag: undefined,
						member: memberPath,
						selectorOption: undefined,
						group: undefined
					}];
				});
				if (required && memberParameterList.every(({ schema }) => schema.safeParse(undefined).success)) throw new Error(`${contract.name}.${name} has no required member`);
				return memberParameterList;
			};
			const parameters = [...positionals, ...Object.keys(shape).filter((field) => !positionals.includes(field) && !Object.hasOwn(omitted, field) && !targetFields.has(field) && !handlerFields.includes(field) && !fixedFields.has(field) && !groupedFields.has(field))].flatMap((field) => flattened[field] === undefined ? [parameter(field)] : memberParameters(field, [], shape[field], flattened[field], true));
			for (const [key, group] of Object.entries(fieldGroups)) if (group !== undefined) parameters.push({
				field: key,
				key,
				positional: false,
				alias: undefined,
				description: group.description,
				schema: z.string().optional().describe(group.description),
				inbound: false,
				booleanFlag: false,
				cliDefault: undefined,
				repeatable: false,
				decimal: false,
				callerPath: false,
				delivery: false,
				jsonText: false,
				viewSelection: false,
				runtimeJson: group.invalidJson,
				jsonInput: false,
				checkJsonInput: undefined,
				nullFlag: undefined,
				member: undefined,
				selectorOption: undefined,
				group: group.fields
			});
			const cliOptions = projection.cliOptions ?? {};
			const cliPositionalKeys = projection.cliPositionals ?? [];
			for (const key of cliPositionalKeys) if (!Object.hasOwn(cliOptions, key)) throw new Error(`${contract.name} has no CLI option ${key}`);
			const cliPositionals = cliPositionalKeys.map((key) => ({
				key,
				description: cliOptions[key].description,
				schema: cliOptions[key]
			}));
			const cliOnlyOptions = [
				...Object.values(nullFlags).flatMap((flag) => flag === undefined ? [] : [[flag.key, z.boolean().default(false).describe(flag.description)]]),
				...Object.entries(evidenceDelivery ? Object.hasOwn(shape, "detail") ? { evidence_output: analysisEvidenceDeliveryOptions.evidence_output } : analysisEvidenceDeliveryOptions : {}),
				...Object.entries(cliOptions).filter(([key]) => !cliPositionalKeys.includes(key))
			].map(([key, schema]) => ({
				key,
				description: schema.description,
				schema
			}));
			const sessionTarget = describeSessionTarget(projection.sessionTarget);
			const evidenceTargets = describeEvidenceTargets(contract, shape, projection.evidenceTargets);
			const sessionTargetKeys = [...sessionTarget === undefined ? [] : [sessionTarget.key, ...sessionTarget.options.map(({ key }) => key)], ...evidenceTargets === undefined ? [] : [...evidenceTargets.targets.map(({ key }) => key), ...evidenceTargets.options.map(({ key }) => key)]];
			const selectorKeys = parameters.flatMap(({ selectorOption }) => selectorOption === undefined ? [] : [selectorOption.key, ...selectorOption.alternative === undefined ? [] : [selectorOption.alternative.key]]);
			const keys = new Set([
				...sessionTargetKeys,
				...parameters.map(({ key }) => key),
				...cliOnlyOptions.map(({ key }) => key),
				...cliPositionalKeys
			]);
			const optionKeys = new Set([
				...sessionTargetKeys,
				...parameters.flatMap(({ key, positional }) => positional ? [] : [key]),
				...cliOnlyOptions.map(({ key }) => key),
				...selectorKeys
			]);
			if (keys.size !== sessionTargetKeys.length + parameters.length + cliOnlyOptions.length + cliPositionalKeys.length || optionKeys.size !== sessionTargetKeys.length + parameters.filter(({ positional }) => !positional).length + cliOnlyOptions.length + selectorKeys.length) throw new Error(`${contract.name} projects two fields to one CLI key`);
			const cliOptionDependencies = Object.fromEntries(Object.entries(projection.cliOptionDependencies ?? {}).filter((entry) => entry[1] !== undefined));
			for (const [key, required] of Object.entries(cliOptionDependencies)) for (const dependency of [key, ...required]) if (!keys.has(dependency)) throw new Error(`${contract.name} has no CLI option ${dependency}`);
			const keyOf = new Map(parameters.flatMap(({ field, key, member }) => member === undefined ? [[field, key]] : []));
			const rename = (field) => keyOf.get(field) ?? field;
			const toContractInput = (values) => {
				const input = Object.fromEntries(fixedFields);
				for (const { field, key, callerPath, delivery, member, selectorOption, group } of parameters) {
					const value = (selectorOption === undefined ? undefined : values[selectorOption.valueKey]) ?? values[key];
					if (value === undefined || delivery || member !== undefined) continue;
					if (group !== undefined) {
						if (isRecord(value)) {
							for (const grouped of group) if (Object.hasOwn(value, grouped)) input[grouped] = value[grouped];
						}
						continue;
					}
					input[field] = !callerPath ? value : Array.isArray(value) ? value.map((path) => absoluteCallerPath(path)) : absoluteCallerPath(value);
				}
				for (const { field, key, member, callerPath } of parameters) {
					const value = values[key];
					if (member === undefined || value === undefined) continue;
					let object = input[field] ??= {};
					for (const enclosing of member.slice(0, -1)) object = object[enclosing] ??= {};
					object[member.at(-1)] = callerPath ? absoluteCallerPath(value) : value;
				}
				for (const { field, nullFlag } of parameters) if (nullFlag !== undefined && values[nullFlag] === true) input[field] = null;
				return input;
			};
			const nullFlagLimits = parameters.flatMap(({ key, nullFlag }) => nullFlag === undefined ? [] : [[nullFlag, key]]);
			const checks = projection.crossFieldRules === "argv" ? contract.inputSchema._zod.def.checks ?? [] : [];
			if (checks.length > 0 && parameters.some(({ runtimeJson }) => runtimeJson !== undefined)) throw new Error(`${contract.name} decodes JSON when it runs, after argv cross-field rules`);
			const contractChecks = z.object({}).loose().check(...checks);
			const checkOptions = checks.length === 0 && nullFlagLimits.length === 0 ? undefined : (options) => {
				const conflicts = nullFlagLimits.flatMap(([flag, limit]) => {
					if (options[flag] !== true || options[limit] === undefined) return [];
					const message = `${flag} and ${limit} are mutually exclusive`;
					const issue = {
						code: "custom",
						path: [flag],
						message,
						input: undefined
					};
					return [{
						path: [flag],
						message,
						issue
					}];
				});
				const checkInput = toContractInput(options);
				if (checks.length > 0) for (const [field, declared] of Object.entries(shape)) {
					if (Object.hasOwn(checkInput, field)) continue;
					const omitted = declared.safeParse(undefined);
					if (omitted.success && omitted.data !== undefined) checkInput[field] = omitted.data;
				}
				const result = contractChecks.safeParse(checkInput);
				return result.success ? conflicts : [...conflicts, ...result.error.issues.map((issue) => {
					const [field, ...rest] = issue.path;
					return {
						path: typeof field === "string" ? [rename(field), ...rest] : issue.path,
						message: issue.message,
						issue
					};
				})];
			};
			return {
				command: projectedCommand(contract, projection.command),
				description: projection.description,
				contract,
				parameters,
				cliOnlyOptions,
				cliPositionals,
				omitted,
				handlerFields,
				fixedFields: Object.fromEntries(fixedFields),
				fields: shape,
				optionConstraints: projectObjectConstraints(contract, (field) => {
					if (groupedFields.has(field)) throw new Error(`${contract.name}.${field} is grouped but named by an input rule`);
					return rename(field);
				}, new Set([...unprojectedFields, ...selectors]), cliOptionDependencies, nullFlagLimits),
				checkOptions,
				toContractInput,
				callerInputs: (values) => Object.fromEntries(parameters.flatMap(({ field, key, callerPath, member }) => {
					const value = values[key];
					return callerPath && value !== undefined ? [[[field, ...member ?? []].join("."), value]] : [];
				})),
				cliOptionValues: (values) => Object.fromEntries(Object.keys(cliOptions).flatMap((key) => values[key] === undefined ? [] : [[key, values[key]]])),
				sessionTarget,
				evidenceTargets,
				inputBinding: {
					operation: contract.name,
					fields: Object.fromEntries([...parameters.flatMap(({ field, key, member, selectorOption }) => member === undefined ? [{
						field,
						key: selectorOption?.key ?? key
					}] : []), ...evidenceTargets?.targets ?? []].flatMap(({ field, key }) => key === field ? [] : [[field, key]])),
					flags: Object.fromEntries(parameters.flatMap(({ field, key, member, positional, delivery, group, selectorOption }) => {
						if (delivery) return [];
						if (positional) return selectorOption === undefined ? [] : [[field, `--${optionFlagName(selectorOption.key)}`]];
						const flag = `--${optionFlagName(key)}`;
						if (group !== undefined) return group.map((grouped) => [grouped, flag]);
						return [[member === undefined ? field : [field, ...member].join("."), flag]];
					}))
				},
				evidenceDelivery,
				admit: (values) => {
					const selectedValues = { ...values };
					for (const { key, selectorOption } of parameters) {
						if (selectorOption === undefined) continue;
						const selected = selectSpelledSelector(contract.name, selectorOption, values[key], values);
						if (!selected.ok) return selected;
						selectedValues[selectorOption.valueKey] = selected.value;
					}
					return admitInvocation(contract, {
						evidenceDelivery,
						viewDelivery,
						parameters,
						shape,
						wholeInput: sessionTarget === undefined && evidenceTargets === undefined && handlerFields.length === 0,
						checkedFields: Object.keys(jsonInputChecks)
					}, selectedValues, toContractInput, rename);
				},
				admitDeliveryOptions: (values) => {
					const decoded = decodeInlineJson(contract.name, parameters, values);
					if (!decoded.ok) return decoded;
					if (!evidenceDelivery) return decoded;
					const view = viewDelivery === undefined ? undefined : decoded.value[rename("view")];
					if (view !== undefined) {
						const checked = shape.view.safeParse(view);
						if (!checked.success) return err(analysisInputErrorFromIssues(contract.name, checked.error.issues.map((issue) => ({
							...issue,
							path: ["view", ...issue.path]
						})), { view }));
					}
					const detail = decoded.value[rename("detail")];
					const refused = cliEvidenceDeliveryInputError({
						operation: contract.name,
						detail: detail ?? (view === undefined ? "complete" : "summary"),
						evidenceOutput: decoded.value.evidence_output,
						view
					});
					return refused === undefined ? decoded : err(refused);
				}
			};
		};
		decodeInlineJson = (operation, parameters, values) => {
			const decoded = { ...values };
			for (const { key, runtimeJson, jsonInput, group } of parameters) {
				if (runtimeJson === undefined || jsonInput) continue;
				const parsed = parseCliJsonOption(operation, key, values[key], runtimeJson);
				if (!parsed.ok) return parsed;
				if (group !== undefined && parsed.value !== undefined) {
					const members = admitGroupMembers(operation, key, group, runtimeJson, parsed.value);
					if (!members.ok) return members;
				}
				decoded[key] = parsed.value;
			}
			return ok(decoded);
		};
		admitGroupMembers = (operation, key, group, invalidJson, value) => {
			if (!isRecord(value)) return err(new AnalysisInputError(operation, undefined, [{
				path: [key],
				reason: "invalid_format",
				expected: "JSON",
				message: invalidJson
			}]));
			const members = z.strictObject(Object.fromEntries(group.map((field) => [field, z.unknown().optional()])));
			const admitted = members.safeParse(value);
			return admitted.success ? ok(undefined) : err(analysisInputErrorFromIssues(operation, admitted.error.issues.map((issue) => ({
				...issue,
				path: [key, ...issue.path]
			})), { [key]: value }));
		};
		selectSpelledSelector = (operation, selector, positional, values) => {
			const { alternative } = selector;
			let named = values[selector.valueKey];
			let option = selector.key;
			const otherSpelling = alternative === undefined ? undefined : values[alternative.valueKey];
			if (alternative !== undefined && otherSpelling !== undefined) {
				const merged = selectCliAnalysisSelector(named, alternative.selects(otherSpelling), {
					option: alternative.key,
					operation,
					kind: "text",
					required: false
				});
				if (!merged.ok) return merged;
				named = merged.value;
				option = alternative.key;
			}
			const selected = selectCliAnalysisSelector(positional, named, {
				option,
				operation,
				kind: selector.kind,
				required: selector.required
			});
			return selected.ok ? ok(named ?? positional) : selected;
		};
		admitInvocation = (contract, command, values, toContractInput, rename) => {
			const { evidenceDelivery, viewDelivery, parameters, shape, wholeInput, checkedFields } = command;
			const decoded = values;
			const input = toContractInput(decoded);
			const detail = evidenceDelivery ? decoded[rename("detail")] : undefined;
			let view;
			let parsed;
			let parseWholeInput;
			const runtimeJson = parameters.some(({ runtimeJson }) => runtimeJson !== undefined);
			const selected = viewDelivery === undefined ? undefined : decoded[rename("view")];
			const candidate = {
				...input,
				...detail === undefined || !Object.hasOwn(shape, "detail") ? {} : { detail },
				...selected === undefined ? {} : { view: selected }
			};
			const schema = contract.inputSchema;
			const unchecked = checkedFields.length > 0 && schema instanceof z.ZodObject ? schema.omit(Object.fromEntries(checkedFields.map((field) => [field, true]))) : undefined;
			const parseCandidate = () => {
				if (unchecked !== undefined) {
					const rest = { ...candidate };
					const documents = {};
					for (const field of checkedFields) if (Object.hasOwn(rest, field)) {
						documents[field] = rest[field];
						delete rest[field];
					}
					const admitted = unchecked.safeParse(rest);
					return admitted.success ? ok({
						...admitted.data,
						...documents
					}) : err(analysisInputErrorFromIssues(contract.name, admitted.error.issues, candidate));
				}
				const admitted = schema.safeParse(candidate);
				return admitted.success ? ok(admitted.data) : err(analysisInputErrorFromIssues(contract.name, admitted.error.issues, candidate));
			};
			if (runtimeJson || wholeInput && viewDelivery !== undefined) {
				const admitted = parseCandidate();
				if (admitted.ok) {
					parsed = admitted.value;
					if (viewDelivery !== undefined) ({view} = admitted.value);
				} else if (runtimeJson) return admitted;
				else parseWholeInput = () => admitted;
			} else if (wholeInput) {
				let memo;
				parseWholeInput = () => memo ??= parseCandidate();
			}
			if (!evidenceDelivery) return ok({
				input,
				parsed,
				parseWholeInput,
				delivery: undefined
			});
			const delivery = {
				detail: detail ?? (view === undefined ? "complete" : "summary"),
				evidenceOutput: decoded.evidence_output,
				...view === undefined ? {} : { view: viewDelivery?.kind === undefined ? view : {
					kind: viewDelivery.kind,
					...view
				} }
			};
			const refused = cliEvidenceDeliveryInputError({
				...delivery,
				operation: contract.name
			});
			return refused === undefined ? ok({
				input,
				parsed,
				parseWholeInput,
				delivery
			}) : err(refused);
		};
		describeOperationChoices = (description, projection) => {
			const choices = new Map();
			const signature = (described) => JSON.stringify([described.parameters.map(({ key, positional, schema }) => [
				key,
				positional,
				z.toJSONSchema(schema, { unrepresentable: "any" })
			]), described.optionConstraints ?? null]);
			const expected = signature(description);
			for (const [value, contract] of Object.entries(projection.operationBy?.contracts ?? {})) {
				const described = describeContractCommand(contract, projection);
				if (signature(described) !== expected) throw new Error(`${contract.name} does not project to ${description.command}'s options`);
				choices.set(value, described);
			}
			return choices;
		};
	})))();
}

//#endregion
//#region dist/cli/jsonInputArgument.js
var JSON_SCHEMA_DIALECT, wrapperTypes, innerSchema, documentType, jsonInputContentSchema, jsonInputArgument;
function init_jsonInputArgument() {
	return (init_jsonInputArgument = __esmMin((() => {
		init_schemaConstraints();
		JSON_SCHEMA_DIALECT = "$schema";
		wrapperTypes = new Set([
			"optional",
			"nonoptional",
			"nullable",
			"default",
			"prefault",
			"readonly",
			"catch"
		]);
		innerSchema = (schema) => {
			if (!("unwrap" in schema) || typeof schema.unwrap !== "function") return undefined;
			const inner = schema.unwrap();
			return inner instanceof z.ZodType ? inner : undefined;
		};
		documentType = (schema) => {
			let current = schema;
			for (;;) {
				const type = current._zod.def.type;
				if (!wrapperTypes.has(type)) return type;
				const inner = innerSchema(current);
				if (inner === undefined) return type;
				current = inner;
			}
		};
		jsonInputContentSchema = (schema) => {
			let converted;
			try {
				converted = z.toJSONSchema(schema, {
					io: "input",
					unrepresentable: "any"
				});
			} catch {
				return undefined;
			}
			const content = { ...converted };
			delete content[JSON_SCHEMA_DIALECT];
			if (Object.keys(content).length > 0) return content;
			const type = documentType(schema);
			return type === "unknown" || type === "any" ? {} : undefined;
		};
		jsonInputArgument = (description, schema) => {
			return jsonDocumentText(z.string().describe(description), jsonInputContentSchema(schema));
		};
	})))();
}

//#endregion
//#region dist/cli/contractCommand.js
var admittedContractInput, callerTargetPath, callerSpellings, inspectWithService, runOnSessionTarget, directAnalysisOpening, runDirectOnTarget, projectCliResult, runOnEvidenceTargets, analyzeWithService, deliverWithService, admitOpening, commandPositionals, commandOptions, registerContractCommand, commandRoute, contractInputBranch, commandShape, schemaSignature, registerRoutedCommand, withCliOnlyDefaults, refusedDocumentFieldError, jsonInputKeys, sharedJsonInputs, ownJsonInputs, readJsonInputs, keepsOwnFailure, registerContractDocumentCommand;
function init_contractCommand() {
	return (init_contractCommand = __esmMin((() => {
		init_internalInvariant();
		init_cliLogging();
		init_analysisErrorCore();
		init_analysisErrorProjection();
		init_inputIssueProjection();
		init_result();
		init_sessionLifecycleInputs();
		init_analysisEvidenceDelivery();
		init_cliEvidenceCallerPath();
		init_finishAnalysisCommand();
		init_commandCancellation();
		init_queuedInterrupts();
		init_runOwned();
		init_cliJsonInput();
		init_jsonInputArgument();
		init_contractCliDescription();
		init_cliResultControls();
		init_projectCliAnalysisResult();
		init_commandRegistry();
		init_optionFields();
		admittedContractInput = (context) => {
			if (context.parsed !== undefined) return ok(context.parsed);
			if (context.parseWholeInput === undefined) throw invariantViolation(`${context.operation} does not admit its whole contract input on the CLI`);
			return context.parseWholeInput();
		};
		callerTargetPath = ({ operation, callerInputs }) => {
			const { path } = callerInputs;
			if (typeof path !== "string") throw new Error(`${operation} has no caller path field named path`);
			return path;
		};
		callerSpellings = (context, primary = "path") => {
			const { [primary]: path, ...others } = context.callerInputs;
			if (typeof path !== "string") throw new Error(`${context.operation} has no caller path field named ${primary}`);
			return {
				path,
				others: Object.keys(others).length === 0 ? undefined : others
			};
		};
		inspectWithService = (service, providerId, primary = "path") => (input, context) => {
			const spellings = callerSpellings(context, primary);
			const owned = service();
			return finishCliEvidenceCommand(spellings.path, () => owned.inspect(input, { signal: context.signal }), owned, providerId, context.operation, context.signal, spellings.others).then(projectCliAnalysisResult);
		};
		runOnSessionTarget = (runProviderAnalysis, logger) => async (input, context) => {
			const { sessionTarget, operation, signal, delivery, opening } = context;
			if (sessionTarget === undefined) throw new Error(`${operation} declares no session target`);
			const values = input;
			const result = await (Object.keys(opening).length === 0 ? runProviderAnalysis(sessionTarget, operation, values, logger, signal) : runProviderAnalysis(sessionTarget, operation, values, logger, signal, openBinaryTargetSelection(opening)));
			if (delivery === undefined) return projectCliAnalysisResult(result);
			return publishCliAnalysisEvidence(result, {
				operation,
				signal,
				detail: delivery.detail,
				evidenceOutput: delivery.evidenceOutput,
				...delivery.view === undefined ? {} : { view: delivery.view }
			});
		};
		directAnalysisOpening = ({ provider_id: providerId, snapshot_path: snapshotPath, ...selection }) => ({
			...openBinaryTargetSelection(selection),
			...providerId === undefined ? {} : { providerId },
			...snapshotPath === undefined ? {} : { snapshotPath }
		});
		runDirectOnTarget = (runDirectAnalysis, logger, options = {}) => async (input, context) => {
			const { sessionTarget, operation, signal, delivery, opening } = context;
			if (sessionTarget === undefined) throw new Error(`${operation} declares no session target`);
			const evidenceOutput = delivery?.evidenceOutput;
			const result = await runDirectAnalysis(sessionTarget, operation, input, {
				logger,
				signal,
				...directAnalysisOpening(opening),
				...evidenceOutput === undefined ? {} : { includeEvidenceSources: true }
			});
			if (delivery === undefined) return projectCliAnalysisResult(result);
			if (options.requireSourceEvidence === true && result.ok && evidenceOutput !== undefined && result.sourceEvidence === undefined) return projectAnalysisError(new AnalysisOutputError(operation, "The CLI session did not return its source Evidence.").retainPartialObservation(result.value));
			return publishCliAnalysisEvidence(result, {
				operation,
				signal,
				detail: delivery.detail,
				evidenceOutput
			});
		};
		projectCliResult = (output, outputSchema, binding) => {
			if (outputSchema !== undefined && Object.keys(binding.flags).length > 0) recordCliResultControls(() => cliResultControlsIn(cliDeliveredEvidence() ?? failurePartialObservation(output, binding.operation) ?? output, outputSchema, binding));
			return projectCliInputFields(output, binding);
		};
		runOnEvidenceTargets = (runSource, compose) => async (input, context) => {
			const { evidenceTargets, operation, signal } = context;
			if (evidenceTargets === undefined) throw new Error(`${operation} declares no Evidence targets`);
			const parameters = context.opening;
			const sources = {};
			const retainSources = (failure) => {
				for (const [field, evidence] of Object.entries(sources)) failure.retainArgumentObservation(field, evidence);
				return failure;
			};
			for (const { field, key, target } of evidenceTargets.targets) {
				const source = await runSource(target, parameters, signal);
				if (!source.ok) return projectCliInputFields({
					error: "Analysis failed",
					...projectAnalysisError(retainSources(source.error), "invocation")
				}, {
					operation: evidenceTargets.source,
					fields: { path: key },
					flags: evidenceTargets.sourceFlags
				});
				sources[field] = source.value;
			}
			const result = finalizedResult(await runOwned(async () => {
				try {
					return await compose({
						...input,
						...sources
					}, {
						...context,
						evidenceTargets
					});
				} catch (cause) {
					return {
						ok: false,
						error: new AnalysisOutputError(operation, `${operation} produced invalid output`, { cause })
					};
				}
			}, {
				providerId: evidenceTargets.source,
				operation,
				signal,
				close: dispatchQueuedInterrupts,
				partial: (value) => value
			}));
			if (result.ok) return result.value;
			return {
				error: "Analysis failed",
				...projectAnalysisError(retainSources(result.error), "invocation")
			};
		};
		analyzeWithService = (service, providerId) => (input, context) => {
			if (Object.keys(context.callerInputs).length > 0) throw new Error(`${context.operation} selects a caller path`);
			const owned = service();
			return finishAnalysisCommand(() => owned.inspect(input, { signal: context.signal }), owned, providerId, context.operation, context.signal).then(projectCliAnalysisResult);
		};
		deliverWithService = (service, providerId) => (input, context) => {
			const spellings = callerSpellings(context);
			const { delivery } = context;
			if (delivery === undefined) throw new Error(`${context.operation} does not declare evidenceDelivery`);
			const owned = service();
			return deliverCliAnalysisEvidence({
				callerInputPath: spellings.path,
				...spellings.others === undefined ? {} : { callerInputPaths: spellings.others },
				run: () => owned.inspect(input, { signal: context.signal }),
				service: owned,
				providerId,
				operation: context.operation,
				signal: context.signal,
				detail: delivery.detail,
				evidenceOutput: delivery.evidenceOutput,
				...delivery.view === undefined ? {} : { view: delivery.view }
			});
		};
		admitOpening = (description, values) => description.sessionTarget !== undefined ? description.sessionTarget.admitOpening(description.contract.name, values) : description.evidenceTargets !== undefined ? description.evidenceTargets.admitSource(description.contract.name, values) : {
			ok: true,
			value: {}
		};
		commandPositionals = (description) => [
			...description.sessionTarget === undefined ? [] : [description.sessionTarget],
			...description.evidenceTargets?.targets ?? [],
			...description.parameters.filter(({ positional }) => positional),
			...description.cliPositionals
		];
		commandOptions = (description) => {
			const object = z.object(Object.fromEntries([
				...description.parameters.filter(({ positional }) => !positional).map(({ key, schema }) => [key, schema]),
				...[...description.sessionTarget?.options ?? [], ...description.evidenceTargets?.options ?? []].map(({ key, schema }) => [key, schema]),
				...description.cliOnlyOptions.map(({ key, schema }) => [key, schema]),
				...description.parameters.flatMap(({ selectorOption }) => [selectorOption, selectorOption?.alternative].flatMap((option) => option === undefined ? [] : [[option.key, option.schema]]))
			]));
			const constrained = description.optionConstraints === undefined ? object : object.meta(description.optionConstraints);
			const { checkOptions } = description;
			return checkOptions === undefined ? constrained : constrained.superRefine((parsed, context) => {
				for (const { path, issue } of checkOptions(parsed)) context.addIssue({
					...issue,
					path: [...path]
				});
			});
		};
		registerContractCommand = (cli, logger, contract, projection, run) => {
			const description = describeContractCommand(contract, projection);
			const chosen = describeOperationChoices(description, projection);
			const positionals = commandPositionals(description);
			const alias = Object.fromEntries(description.parameters.flatMap(({ key, alias: short, positional }) => short === undefined || positional ? [] : [[key, short]]));
			registerCliCommand(cli, description.command, {
				description: description.description,
				...positionals.length === 0 ? {} : { args: z.object(Object.fromEntries(positionals.map(({ key, schema }) => [key, schema]))) },
				options: commandOptions(description),
				...Object.keys(alias).length === 0 ? {} : { alias },
				run: ({ args, options }) => {
					const values = {
						...options,
						...args
					};
					for (const { key, selectorOption } of description.parameters) if (selectorOption !== undefined) {
						values[key] = args?.[key];
						for (const option of [selectorOption, selectorOption.alternative]) if (option !== undefined) values[option.valueKey] = options[option.key];
					}
					const selected = projection.operationBy === undefined ? description : chosen.get(values[projection.operationBy.option]) ?? description;
					return withCommandCancellation((signal) => logCliCommand(logger, description.command, async () => {
						const options = selected.admitDeliveryOptions(values);
						if (!options.ok) return projectAnalysisError(options.error);
						const read = await readJsonInputs(selected, options.value, signal);
						if (!read.ok) return read.error;
						const admitted = selected.admit(read.value);
						if (!admitted.ok) return projectCliInputFields(projectAnalysisError(admitted.error), selected.inputBinding);
						const opening = admitOpening(selected, values);
						if (!opening.ok) return projectAnalysisError(opening.error);
						const operations = contractDescriptionOperations(selected);
						const resultBinding = description.evidenceTargets === undefined ? {
							...selected.inputBinding,
							operations
						} : {
							...selected.inputBinding,
							operations,
							flags: {
								...description.evidenceTargets.sourceFlags,
								...selected.inputBinding.flags
							}
						};
						return projectCliResult(await run(admitted.value.input, {
							signal,
							operation: selected.contract.name,
							callerInputs: selected.callerInputs(values),
							sessionTarget: description.sessionTarget === undefined ? undefined : values[description.sessionTarget.key],
							evidenceTargets: description.evidenceTargets === undefined ? undefined : {
								source: description.evidenceTargets.source,
								sourceFlags: description.evidenceTargets.sourceFlags,
								targets: description.evidenceTargets.targets.map(({ field, key }) => ({
									field,
									key,
									target: values[key]
								}))
							},
							opening: opening.value,
							delivery: admitted.value.delivery,
							parsed: admitted.value.parsed,
							parseWholeInput: admitted.value.parseWholeInput,
							checked: read.checked,
							cliOptions: selected.cliOptionValues(values)
						}), selected.contract.outputSchema, resultBinding);
					}));
				}
			}, {
				operations: distinctOperations([...contractDescriptionOperations(description), ...[...chosen.entries()].flatMap(([value, choice]) => contractDescriptionOperations(choice, { selector: `--${optionFlagName(projection.operationBy.option)} ${String(value)}` }))]),
				source: {
					kind: "contract",
					description
				}
			});
		};
		commandRoute = (contract, projection, run, route) => {
			if (projection.operationBy !== undefined) throw new Error(`${contract.name} routes by target and by an option`);
			return {
				description: describeContractCommand(contract, projection),
				takes: route.takes,
				requirement: route.requirement,
				run
			};
		};
		contractInputBranch = (contract, field) => {
			const branches = contract.inputSchema.options.filter((branch) => Object.hasOwn(branch.shape, field));
			if (branches.length !== 1) throw new Error(`${contract.name} has no single input shape with ${field}`);
			return {
				name: contract.name,
				...contract.cli === undefined ? {} : { cli: contract.cli },
				inputSchema: branches[0]
			};
		};
		commandShape = (description) => ({
			args: commandPositionals(description).map(({ key, schema }) => [key, schema]),
			options: Object.fromEntries(Object.entries(commandOptions(description).shape).map(([key, schema]) => [key, withoutDefault(schema)]))
		});
		schemaSignature = (schema) => JSON.stringify(z.toJSONSchema(schema, { unrepresentable: "any" }));
		registerRoutedCommand = (cli, logger, command, routes) => {
			const name = routes[0].description.command;
			const shapes = routes.map(({ description }) => {
				if (description.command !== name || description.optionConstraints !== undefined || description.checkOptions !== undefined || description.evidenceTargets !== undefined || description.parameters.some(({ selectorOption }) => selectorOption !== undefined)) throw new Error(`${description.contract.name} cannot be routed by ${name}`);
				return commandShape(description);
			});
			const args = shapes[0].args;
			const options = new Map();
			const owners = new Map();
			for (const [index, shape] of shapes.entries()) {
				if (shape.args.length !== args.length || shape.args.some(([key, schema], position) => key !== args[position][0] || schemaSignature(schema) !== schemaSignature(args[position][1]))) throw new Error(`${name} routes take different arguments`);
				for (const [key, schema] of Object.entries(shape.options)) {
					const shared = options.get(key);
					if (shared !== undefined && schemaSignature(shared) !== schemaSignature(schema)) throw new Error(`${name} routes disagree on --${key}`);
					options.set(key, schema);
					owners.set(key, routes[index]);
				}
			}
			const owns = (route, key) => args.some(([argument]) => argument === key) || Object.hasOwn(shapes[routes.indexOf(route)].options, key);
			const sharedJson = sharedJsonInputs(name, routes);
			registerCliCommand(cli, name, {
				description: command.description,
				args: z.object(Object.fromEntries(args)),
				options: z.object(Object.fromEntries(options)),
				run: ({ args: given, options: chosen }) => {
					const values = {
						...chosen,
						...given
					};
					const supplied = Object.keys(values).filter((key) => values[key] !== undefined);
					return withCommandCancellation((signal) => logCliCommand(logger, name, async () => {
						const shared = await readJsonInputs(routes[0].description, values, signal, sharedJson);
						if (!shared.ok) return shared.error;
						let route = routes.at(-1);
						for (const candidate of routes) if (candidate.takes !== undefined && supplied.every((key) => owns(candidate, key)) && await candidate.takes(shared.value)) {
							route = candidate;
							break;
						}
						const { description } = route;
						const refused = supplied.filter((key) => !owns(route, key));
						if (refused.length > 0) return projectAnalysisError(new AnalysisInputError(description.contract.name, undefined, refused.map((key) => ({
							path: [key],
							reason: "invalid_value",
							message: `--${optionFlagName(key)} requires ${owners.get(key).requirement}; the given input selects ${route.requirement}, which does not take it.`
						}))));
						const options = description.admitDeliveryOptions(shared.value);
						if (!options.ok) return projectAnalysisError(options.error);
						const read = await readJsonInputs(description, options.value, signal, ownJsonInputs(description, sharedJson));
						if (!read.ok) return read.error;
						const admitted = description.admit(read.value);
						if (!admitted.ok) return projectCliInputFields(projectAnalysisError(admitted.error), description.inputBinding);
						const opening = admitOpening(description, values);
						if (!opening.ok) return projectAnalysisError(opening.error);
						return projectCliResult(await route.run(admitted.value.input, {
							signal,
							operation: description.contract.name,
							callerInputs: description.callerInputs(values),
							sessionTarget: description.sessionTarget === undefined ? undefined : values[description.sessionTarget.key],
							evidenceTargets: undefined,
							opening: opening.value,
							delivery: admitted.value.delivery,
							parsed: admitted.value.parsed,
							parseWholeInput: admitted.value.parseWholeInput,
							checked: {
								...shared.checked,
								...read.checked
							},
							cliOptions: description.cliOptionValues(withCliOnlyDefaults(description, values))
						}), description.contract.outputSchema, {
							...description.inputBinding,
							operations: contractDescriptionOperations(description)
						});
					}));
				}
			}, {
				operations: distinctOperations(routes.flatMap(({ description }) => contractDescriptionOperations(description))),
				source: {
					kind: "routed",
					descriptions: routes.map(({ description }) => description)
				}
			});
		};
		withCliOnlyDefaults = (description, values) => ({
			...values,
			...Object.fromEntries(description.cliOnlyOptions.flatMap(({ key, schema }) => values[key] === undefined ? [[key, schema.parse(undefined)]] : []))
		});
		refusedDocumentFieldError = (operation, refusals, document) => {
			const issues = Object.entries(refusals).filter(([field]) => Object.hasOwn(document, field)).map(([field, message]) => ({
				code: "custom",
				path: [field],
				message,
				input: document[field]
			}));
			return issues.length === 0 ? undefined : analysisInputErrorFromIssues(operation, issues, document);
		};
		jsonInputKeys = (description) => new Set(description.parameters.filter(({ jsonInput }) => jsonInput).map(({ key }) => key));
		sharedJsonInputs = (command, routes) => {
			const keys = routes.map(({ description }) => jsonInputKeys(description));
			const shared = new Set([...keys[0]].filter((key) => keys.every((own) => own.has(key))));
			for (const key of shared) {
				const parameters = routes.map(({ description }) => description.parameters.find((parameter) => parameter.key === key));
				if (new Set(parameters.map(({ runtimeJson }) => runtimeJson)).size !== 1) throw new Error(`${command} routes refuse --${key} differently`);
				if (new Set(parameters.map(({ checkJsonInput }) => checkJsonInput)).size !== 1) throw new Error(`${command} routes check --${key} differently`);
			}
			return shared;
		};
		ownJsonInputs = (description, decoded) => new Set([...jsonInputKeys(description)].filter((key) => !decoded.has(key)));
		readJsonInputs = async (description, values, signal, keys = jsonInputKeys(description)) => {
			const decoded = { ...values };
			const checked = {};
			for (const { field, key, runtimeJson, checkJsonInput } of description.parameters) {
				const text = values[key];
				if (!keys.has(key) || typeof text !== "string") continue;
				const parsed = await parseCliJsonInput(text, description.contract.name, signal);
				if (!parsed.ok) return {
					ok: false,
					error: keepsOwnFailure(parsed.error) ? parsed.error : projectAnalysisError(new AnalysisInputError(description.contract.name, undefined, [{
						path: [key],
						reason: "invalid_format",
						expected: "JSON",
						...runtimeJson === undefined ? {} : { message: runtimeJson }
					}]))
				};
				decoded[key] = parsed.value;
				if (checkJsonInput === undefined) continue;
				const admitted = checkJsonInput(parsed.value);
				if (!admitted.ok) return {
					ok: false,
					error: projectCliInputFields(projectAnalysisError(admitted.error), description.inputBinding)
				};
				checked[field] = admitted.value;
			}
			return {
				ok: true,
				value: decoded,
				checked
			};
		};
		keepsOwnFailure = (error) => isRecord(error) && ("input_path" in error || error.code === "cancelled");
		registerContractDocumentCommand = (cli, logger, contract, projection, run) => {
			const description = describeContractDocumentCommand(contract, projection);
			const options = Object.fromEntries([
				...description.sessionTarget?.options ?? [],
				...description.deliveryOptions,
				...description.cliOnlyOptions
			].map(({ key, schema }) => [key, schema]));
			registerCliCommand(cli, description.command, {
				description: description.description,
				args: z.object({
					...description.sessionTarget === undefined ? {} : { [description.sessionTarget.key]: description.sessionTarget.schema },
					[description.key]: jsonInputArgument(description.documentDescription, description.content)
				}),
				...Object.keys(options).length === 0 ? {} : { options: z.object(options) },
				run: ({ args, options: values }) => withCommandCancellation((signal) => logCliCommand(logger, description.command, async () => {
					const delivery = description.admitDelivery(values);
					if (!delivery.ok) return projectAnalysisError(delivery.error);
					const opening = admitOpening(description, {
						...values,
						...args
					});
					if (!opening.ok) return projectAnalysisError(opening.error);
					const decoded = await parseCliJsonInput(args[description.key], contract.name, signal);
					if (!decoded.ok) return decoded.error;
					const refused = typeof decoded.value === "object" && decoded.value !== null ? refusedDocumentFieldError(contract.name, description.documentRefusals, decoded.value) : undefined;
					if (refused !== undefined) return projectAnalysisError(refused);
					const document = resolveCliJsonPaths(decoded.value, description.callerPaths);
					let admitted;
					const parseWholeInput = () => admitted ??= (() => {
						const parsed = contract.inputSchema.safeParse(document);
						return parsed.success ? ok(parsed.data) : err(analysisInputErrorFromIssues(contract.name, parsed.error.issues, decoded.value));
					})();
					return run(document, {
						signal,
						operation: contract.name,
						spelled: decoded.value,
						parsed: undefined,
						parseWholeInput,
						frame: description.content,
						delivery: delivery.value,
						opening: opening.value,
						sessionTarget: description.sessionTarget === undefined ? undefined : args[description.sessionTarget.key],
						cliOptions: description.cliOptionValues(values)
					});
				}))
			}, {
				operations: contractDescriptionOperations({
					contract: description.contract,
					sessionTarget: description.sessionTarget
				}),
				source: {
					kind: "document",
					description
				}
			});
		};
	})))();
}

//#endregion
export { addressOrProcedureGuidance, admittedContractInput, analysisEvidenceDeliveryOptions, analyzeWithService, callerTargetPath, cliEvidenceDeliveryInputError, commandRoute, contractInputBranch, contractNamed, dataTypeSelectorGuidance, deliverCliAnalysisEvidence, deliverWithService, equalSelectorGuidance, init_analysisEvidenceDelivery, init_analysisSelector, init_contractCliDescription, init_contractCommand, init_jsonInputArgument, inspectWithService, jsonInputArgument, publishCliAnalysisEvidence, registerContractCommand, registerContractDocumentCommand, registerRoutedCommand, requiredSelectorGuidance, runDirectOnTarget, runOnEvidenceTargets, runOnSessionTarget };