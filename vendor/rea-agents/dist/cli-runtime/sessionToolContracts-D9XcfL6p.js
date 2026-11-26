import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, AnalysisOutputError, EvidenceIntegrityError, IDENTIFIER_PATTERN, ParseFailureError, absoluteLocalPathStringSchema, analysisCleanupRetrySchema, cancelledBy, coverageStatusSchema, decodeLimit, init_analysisErrorCore, init_analysisErrorRecovery, init_coverage, init_evidenceErrors, init_isRecord, init_jsonValue, init_localPath, init_parseFailure, init_sha256Hex, init_stringPatterns, isRecord, joinCoverageStatus, jsonObjectSchema, jsonValueSchema, knownCoverageStatusSchema, localPathStringSchema, malformedInput, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { BinaryReader, compareUnicodeCodePoints, compositeKey, init_binaryContainer, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { analysisErrorProjectionSchema, analysisInputErrorProjectionSchema, analysisResourceErrorProjectionSchema, evidenceIntegrityErrorProjectionSchema, init_analysisErrorProjectionSchema } from "./analysisErrorProjectionSchema-BLLVQLxu.js";
import { artifactGraphDigest, artifactIdForContent, artifactManifestId, digestCanonicalValue, init_artifactIdentity, init_canonicalDigest, occurrenceIdForLocation } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { NATIVE_UI_WAIT_STEP_MAX_MS, PROVIDER_REJECTION_CODES, analysisProviderSelectorSchema, init_nativeDeadlines, init_providerSelection, nativeUiDeadlineField } from "./urlComponents-DJm-wtqY.js";
import { init_jsonRecord, jsonRecordSchema } from "./jsonRecord-Cuy_NNu4.js";
import { init_relationshipCoverage, relationshipCoverageLimitations, relationshipCoverageSchema } from "./relationshipCoverage-2rn3-vch.js";
import { ANALYSIS_EVIDENCE_PREDICATE, analysisProfileSchema, borrowEvidenceArray, borrowEvidenceInput, canonicalJson, committedProvidersEqual, createAnalysisProfile, createEvidence, digestProcessCommitment, evidenceFileTarget, evidenceInputSchema, evidenceSchema, evidenceSourceInputSchema, getEvidenceInputContract, init_analysisProfile, init_comparisonSemantics, init_evidence, init_evidenceInputContract, init_evidenceReference, init_evidenceValidation, init_nativeAddress, init_offsetDateTime, init_processCapture, init_processCaptureCoverage, init_processCaptureParsing, init_processScenario, nativeAddressCoordinateInputSchema, nativeAddressInputSchema, nativeAddressSchema, parseProcessCapture, processCaptureSchema, processScenarioPlanSchema, processScenarioSchema, processSourceTruncated, readEvidence, readEvidencePayload, utcDateTimeSchema, validateAnalysisProfileProvider } from "./nativeValueFlow-13oOEkkJ.js";
import { BINARY_ARCHITECTURES, HEADER_ARCHITECTURE_EXCLUSIONS, RAW_ONLY_ARCHITECTURES, init_binaryTargetTypes } from "./binaryTargetTypes-CrE-Muhh.js";
import { init_canonicalOrdering, uniqueSorted } from "./canonicalOrdering-C7Yzy62j.js";
import { TARGET_FORMAT_HINTS, init_targetFormats, targetFormatsOfKind } from "./targetFormats-BjyLMHym.js";
import { binaryArchitectureSchema, digestSchema, init_digests, init_rawBinary, init_targetIdentity, prefixedDigestSchema, rawBinaryEntryPointSchema, rawBinarySelectionError, sameTargetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { espFlashAddressSchema, espFlashSelectionError, init_espFlashSelection, parseEspFlashAddress } from "./espFlashSelection-DrhknbQ_.js";
import { formatMetadataDeclaration, init_artifactFormatMetadata } from "./artifactFormatMetadata-CgSGovld.js";
import { artifactExtractionResultSchema, artifactInventoryCoverageSchema, artifactOccurrenceRelationshipCoverage, init_artifactGraph } from "./artifactGraph-D-c8dgaG.js";
import { init_textSchemas, nonEmptyTextSchema } from "./textSchemas-UeTwLioW.js";
import { ArtifactInventoryCarrierError, artifactInspectionResultSchema, hasCompleteInventoryCoverage, init_artifactInspection, init_artifactInventoryEvidence, parseArtifactInventoryEvidence } from "./artifactInventoryEvidence-Cn2dkXxx.js";
import { dimensionResult, evidenceBundleSchema, functionComparisonDimensionNameSchema, functionComparisonInputSchema, functionComparisonResultSchema, init_evidenceBundle, init_functionComparisonResults, init_functionComparisonSchemas, init_residualUnknown, overallStatus, recordUnknownInputSchema, residualUnknownSchema, summarize as summarize$1, unresolvedDimension, updateUnknownInputSchema } from "./evidenceBundle-CWOVHJ6o.js";
import { bundleComparisonInputSchema, bundleComparisonResultSchema, evidenceBundleSummarySchema, evidenceLinkInspectionSchema, evidenceLinkStatusFilterSchema, evidenceLinkTraversalSchema, evidenceRecordFiltersSchema, evidenceRecordSelectionSchema, init_bundleComparison, init_evidenceRecordSummary } from "./evidenceRecordSummary-B3n4elFj.js";
import { analysisBookmarkSchema, bundleResourceBoundResultSchema, bundleResourceRootSchema, init_bundleResourceRoot, init_interfaceBuilderGraph, init_inventoryCoverage, init_machoTargetSelection, init_nativeInstruction, init_nativeInventory, init_nativeInvestigationGraph, init_nativeObservation, init_nativeValueTrace, init_objcSwiftMetadata, interfaceBuilderAnalysisSchema, machoTargetSelectionSchema, nativeAddressListSchema, nativeCallTargetsSchema, nativeDispatchMetadataInputSchema, nativeDispatchMetadataResultSchema, nativeInstructionSchema, nativeInventoryRowsSchemas, nativeInvestigationTraceLimitsSchema, nativeInvestigationTraceSchema, nativeObservationSourceSchemas, nativeValueTraceInputSchema, nativeValueTraceSchema, objcClassDiscoveryCoverageSchema, objcClassImportIdentitySchema, overviewInventoryCoverageSchema, sameMachoTargetSelection } from "./nativeValueTrace-B4vmCxtN.js";
import { addressCoordinate, functionDossierSchema, functionInstructionWindowSchema, hasStableNativeSymbol, init_addressCoordinate, init_functionDossier, init_nativeApiBoundary, init_nativeSymbol, init_procedureInfo, nativeApiInspectionResultSchema, nativeSymbolOrigin, procedureInfoSchema } from "./functionDossier-Cff5XWxr.js";
import { emptyArraySchema, init_emptyArraySchema } from "./emptyArraySchema-CqZKVQhm.js";
import { decodeCanonicalBase64, init_webScreenshot, webScreenshotDiffSchema } from "./browserNetworkMediaType-CbMlNDyh.js";
import { artifactInventorySummaryViewResultSchema, batchDecompileResultSchema, batchDecompileSummaryViewResultSchema, byteEntropySchema, byteEntropySummaryViewResultSchema, demangleSwiftSchema, init_analysisViewResult, init_batchDecompile, init_byteEntropy, init_functionMatching, init_literalFeatureTrace, init_nativeInspection, init_nativeLoadImage, init_nativeMetadataRecovery, init_procedureReferences, inspectMachoSchema, inspectPlistSchema, inspectSignatureSchema, interfaceBuilderSummaryViewResultSchema, listArchitecturesSchema, literalFeatureTraceSchema, machoSummaryViewResultSchema, managedArtifactSummaryViewResultSchema, managedMemberSummaryViewResultSchema, nativeFeatureTraceSummaryViewResultSchema, nativeFunctionMatchingSchema, nativeFunctionMatchingSummaryViewResultSchema, nativeFunctionSummaryViewResultSchema, nativeInventorySummaryViewResultSchema, nativeLoadImageSchema, nativeLoadImageSummaryViewResultSchema, nativeMetadataRecoverySchema, nativeObservationSummaryViewResultSchemas, nativeProcedureReferencesSummaryViewResultSchema, procedurePseudocodeSummaryViewResultSchema, procedureReferencesSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { createJavaScriptApplicationEdge, createJavaScriptApplicationGraph, createJavaScriptApplicationNode, init_javascriptApplicationGraph, javascriptApplicationGraphSchema } from "./javascriptSourceSelection-CZ4gLy-b.js";
import { init_machoCpuIdentity, machoArchitectureFamily, machoCpuSubtypeBase } from "./machoCpuIdentity-B0Mlm3Ly.js";
import { cliMetadataGuidSchema, init_managedArtifact, init_managedInspectionEvidence, init_managedModuleIdentity, managedArtifactInspectionSchema, managedInspectionCoverage, managedInspectionStateSchema, managedMemberInspectionSchema, managedMetadataStatusSchema, managedMetadataTokenSchema, managedModuleRow, managedNativeBoundaryInspectionSchema, managedNativeImportSchema, managedTokenScopesMatch, readManagedInspectionEvidence } from "./managedInspectionEvidence-Cw9u32rc.js";
import { init_plistUid, init_plistValue, plistUidValue, projectPlistValue } from "./plistValue-B9ZFeVoz.js";
import { appendAll, init_appendAll } from "./appendAll-DYoV9cyW.js";
import { decompileDirectoryInputSchema, decompileDirectoryManifestSchema, init_decompileDirectory, init_nativeSegments, nativeSegmentListSchema } from "./decompileDirectory-DWIhSCx5.js";
import { init_nativeProcedureInput, nativeProcedureInputSchema } from "./nativeProcedureInput-BT0vD6Og.js";
import { basename } from "node:path";
import { z } from "zod";
import { constants } from "node:buffer";
import { crc32 } from "node:zlib";
import canonicalize from "canonicalize";
import { diffLines } from "diff";

//#region dist/domain/providerReleaseVerification.js
var providerReleaseVerificationSchema;
function init_providerReleaseVerification() {
	return (init_providerReleaseVerification = __esmMin((() => {
		providerReleaseVerificationSchema = z.strictObject({
			status: z.enum(["verified", "unverified"]),
			basis: z.literal("reported_version"),
			reported_version: z.string().min(1),
			verified_version: z.string().min(1),
			explanation: z.string().min(1),
			remediation: z.string().min(1).nullable()
		}).describe("Provider-reported release version comparison at binding, not a fresh executable check; this does not authenticate bytes or prove target correctness. Omission means verification was not reported.");
	})))();
}

//#endregion
//#region dist/domain/investigationLifecycle.js
var evidenceBundleExportReceiptSchema, investigationStatisticsSchema, resetInvestigationReceiptSchema;
function init_investigationLifecycle() {
	return (init_investigationLifecycle = __esmMin((() => {
		evidenceBundleExportReceiptSchema = z.object({
			path: z.string(),
			bytes: z.int().min(0),
			records: z.int().min(0),
			unknowns: z.int().min(0)
		});
		investigationStatisticsSchema = z.object({
			evidence_records: z.int().min(0),
			unknown_revisions: z.int().min(0),
			unknown_heads: z.int().min(0),
			retained_representation_bytes: z.int().min(0),
			maximum_representation_bytes: z.int().min(0),
			persistence: z.literal("memory")
		});
		resetInvestigationReceiptSchema = z.object({
			cleared_evidence_records: z.int().min(0),
			cleared_unknown_revisions: z.int().min(0),
			cleared_unknown_heads: z.int().min(0),
			retained_target: z.boolean(),
			saved_bundle: evidenceBundleExportReceiptSchema.optional()
		});
	})))();
}

//#endregion
//#region dist/domain/providerOperationHealth.js
var PROVIDER_OPERATION_STATES, PROVIDER_RETRY_ACTIONS, PROVIDER_FAILURE_STAGES, providerRetryAction, sharedProviderFailureStage;
function init_providerOperationHealth() {
	return (init_providerOperationHealth = __esmMin((() => {
		PROVIDER_OPERATION_STATES = [
			"idle",
			"busy",
			"exited",
			"unreachable",
			"not_started",
			"unknown"
		];
		PROVIDER_RETRY_ACTIONS = [
			"retry",
			"wait",
			"restart_provider",
			"unknown"
		];
		PROVIDER_FAILURE_STAGES = [
			"launch",
			"connection",
			"analysis",
			"decompilation",
			"unknown"
		];
		providerRetryAction = (state, startupFailure = false) => {
			if (state === "idle") return null;
			if (startupFailure && state === "exited") return "retry";
			switch (state) {
				case "busy": return "wait";
				case "exited":
				case "unreachable": return "restart_provider";
				case "not_started": return "retry";
				case "unknown": return "unknown";
			}
		};
		sharedProviderFailureStage = (requests) => {
			const first = requests[0]?.stage;
			if (first === undefined) return null;
			return requests.every((request) => request.stage === first) ? first : "unknown";
		};
	})))();
}

//#endregion
//#region dist/contracts/sessionStatusContract.js
var BINARY_SESSION_DETAILS, BINARY_SESSION_SUMMARY_OMITTED_FIELDS, binarySessionInputSchema;
function init_sessionStatusContract() {
	return (init_sessionStatusContract = __esmMin((() => {
		init_localPath();
		BINARY_SESSION_DETAILS = ["summary", "complete"];
		BINARY_SESSION_SUMMARY_OMITTED_FIELDS = [
			"analysis_provider_candidates.availability.remediation",
			"analysis_provider_candidates.availability.diagnostics",
			"analysis_provider_candidates.target_support.diagnostics",
			"analysis_provider_candidates.rejections.remediation",
			"analysis_provider_candidates.rejections.diagnostics",
			"analysis_provider_candidates.capabilities",
			"tool_availability.groups.surface",
			"tool_availability.groups.effects",
			"tool_availability.groups.annotations"
		];
		binarySessionInputSchema = z.strictObject({
			detail: z.enum(BINARY_SESSION_DETAILS).default("summary").describe("Start with summary (default): it keeps open state, the binding, current-route capabilities (including selected Ghidra checkpoint mode), each provider candidate's selection source, availability and target-support status, code and reason with its rejection codes, and every tool's availability, reason and remediation; omitted_fields lists what it leaves out. Request complete only when you need unavailable-candidate remediation, provider or rejection diagnostics, candidate capabilities or static tool surface, effect and annotation flags."),
			refresh_candidates: z.boolean().default(false).describe("Inspect current provider candidates for the active target without replacing or restarting the selected provider. Later transitions and analysis calls wait for inspection finalization. Omitted or false reports the retained selection observations."),
			expected_package_version: z.string().min(1).optional(),
			expected_catalog_digest: z.string().regex(/^[a-f0-9]{64}$/u).optional(),
			expected_server_path: absoluteLocalPathStringSchema.describe("Absolute local filesystem path expected for the running server; relative paths are rejected.").optional()
		});
	})))();
}

//#endregion
//#region dist/contracts/toolOutputSchemaPrimitives.js
function expandToolAvailability(inventory) {
	if (!isCompleteToolAvailabilityInventory(inventory)) return inventory.groups.flatMap(({ names, ...group }) => names.map((name) => ({
		...group,
		name,
		client_requirements: group.client_requirements ?? inventory.client_requirements
	})));
	return inventory.groups.flatMap((group) => group.names.map((name) => toolAvailability.parse({
		...group,
		name,
		client_requirements: group.client_requirements ?? inventory.client_requirements,
		effects: Object.fromEntries(TOOL_EFFECT_NAMES.map((effect) => [effect, group.effects.includes(effect)])),
		annotations: Object.fromEntries(TOOL_ANNOTATION_NAMES.map((annotation) => [annotation, group.annotations.includes(annotation)]))
	})));
}
var evidenceResultOf, lifecycleResultOf, requireOutputSchema, providerRemediation, nativeValueFlowDeclaration, nativeValueFlowSupport, providerCapabilityFacts, providerCapability, PROVIDER_EFFECT_NAMES, providerIdentity, providerCapabilityGroupFacts, providerCapabilityGroup, providerCapabilitySet, expandProviderCapabilities, processCoordinates, processLineageObservation, analysisRun, analysisActivity, providerOperationRequest, providerOperationHealth, providerRejectionCode, providerAvailabilityStates, providerAvailability, providerTargetSupportStates, providerTargetSupport, analysisProviderSelectionSource, providerSelectionRejection, analysisProviderCandidate, analysisProviderCandidateSummary, clientFeatureNameSchema, clientFeatureAvailabilitySchema, toolAvailabilityMode, toolAvailabilityFacts, toolAvailabilityAlternatives, toolUnavailabilityReason, toolAvailability, TOOL_EFFECT_NAMES, TOOL_ANNOTATION_NAMES, toolAvailabilityStatusGroupFacts, toolAvailabilityGroupFacts, toolAvailabilityGroupOf, toolAvailabilityInventory, toolAvailabilitySummaryInventory, isCompleteToolAvailabilityInventory, sessionProviderFacts, sessionStatusDetailShapes, nullableText, addressedEntry, segmentOutput, procedureInfoOutput, symbolDiscoveryOutput, objcClassDiscoveryOutput;
function init_toolOutputSchemaPrimitives() {
	return (init_toolOutputSchemaPrimitives = __esmMin((() => {
		init_nativeSegments();
		init_procedureInfo();
		init_providerReleaseVerification();
		init_investigationLifecycle();
		init_offsetDateTime();
		init_analysisErrorRecovery();
		init_analysisProfile();
		init_evidence();
		init_jsonValue();
		init_providerSelection();
		init_providerOperationHealth();
		init_objcSwiftMetadata();
		init_sessionStatusContract();
		evidenceResultOf = (schema) => z.strictObject({
			...evidenceSchema.shape,
			normalized_result: schema
		}).superRefine(validateAnalysisProfileProvider);
		lifecycleResultOf = (schema) => z.object({ result: schema });
		requireOutputSchema = (schemas, name) => {
			const schema = schemas[name];
			if (schema === undefined) throw new Error(`Missing output schema for ${name}`);
			return schema;
		};
		providerRemediation = z.string().min(1);
		nativeValueFlowDeclaration = z.discriminatedUnion("status", [z.strictObject({ status: z.literal("supported") }), z.strictObject({
			status: z.literal("unavailable"),
			reason: z.string().min(1)
		})]);
		nativeValueFlowSupport = z.discriminatedUnion("status", [
			z.strictObject({
				status: z.literal("supported"),
				provider_id: z.string().min(1)
			}),
			z.strictObject({
				status: z.literal("unavailable"),
				provider_id: z.string().min(1),
				reason: z.string().min(1)
			}),
			z.strictObject({
				status: z.literal("unknown"),
				provider_id: z.string().min(1).nullable()
			})
		]);
		providerCapabilityFacts = {
			operation: z.string(),
			effects: z.object({
				mutates_artifact: z.boolean(),
				launches_process: z.boolean(),
				may_show_ui: z.boolean(),
				may_access_network: z.boolean(),
				may_write_filesystem: z.boolean(),
				changes_permissions: z.boolean(),
				requires_root: z.boolean()
			}),
			limitations: z.array(z.string()),
			native_value_flow: nativeValueFlowDeclaration.exactOptional(),
			independent_decompile: z.literal(true).exactOptional(),
			call_destination_decompile: z.literal(true).exactOptional()
		};
		providerCapability = z.discriminatedUnion("available", [z.object({
			...providerCapabilityFacts,
			available: z.literal(true),
			reason: z.null(),
			availability_code: z.null()
		}), z.object({
			...providerCapabilityFacts,
			available: z.literal(false),
			reason: z.string().nullable(),
			availability_code: z.enum(PROVIDER_REJECTION_CODES).nullable(),
			remediation: providerRemediation.exactOptional(),
			runtime_unavailable: z.literal(true).exactOptional()
		})]);
		PROVIDER_EFFECT_NAMES = Object.keys(providerCapabilityFacts.effects.shape);
		providerIdentity = z.object({
			id: z.string(),
			name: z.string(),
			version: z.string().nullable()
		});
		providerCapabilityGroupFacts = {
			operations: z.array(z.string().min(1)).min(1),
			effects: z.array(providerCapabilityFacts.effects.keyof()),
			limitations: z.array(z.string()),
			native_value_flow: nativeValueFlowDeclaration.exactOptional(),
			independent_decompile: providerCapabilityFacts.independent_decompile,
			call_destination_decompile: providerCapabilityFacts.call_destination_decompile
		};
		providerCapabilityGroup = z.discriminatedUnion("available", [z.strictObject({
			...providerCapabilityGroupFacts,
			available: z.literal(true),
			reason: z.null(),
			availability_code: z.null()
		}), z.strictObject({
			...providerCapabilityGroupFacts,
			available: z.literal(false),
			reason: z.string().nullable(),
			availability_code: z.enum(PROVIDER_REJECTION_CODES).nullable(),
			remediation: providerRemediation.exactOptional(),
			runtime_unavailable: z.literal(true).exactOptional()
		})]);
		providerCapabilitySet = z.strictObject({
			provider: providerIdentity,
			shared_limitations: z.array(z.string()),
			groups: z.array(providerCapabilityGroup)
		});
		expandProviderCapabilities = (sets) => sets.flatMap((set) => set.groups.flatMap((group) => group.operations.map((operation) => ({
			...providerCapability.parse({
				operation,
				...group.native_value_flow === undefined ? {} : { native_value_flow: group.native_value_flow },
				...group.independent_decompile === undefined ? {} : { independent_decompile: group.independent_decompile },
				...group.call_destination_decompile === undefined ? {} : { call_destination_decompile: group.call_destination_decompile },
				available: group.available,
				reason: group.reason,
				availability_code: group.availability_code,
				..."remediation" in group && group.remediation !== undefined ? { remediation: group.remediation } : {},
				..."runtime_unavailable" in group && group.runtime_unavailable === true ? { runtime_unavailable: true } : {},
				effects: Object.fromEntries(PROVIDER_EFFECT_NAMES.map((name) => [name, group.effects.includes(name)])),
				limitations: [...set.shared_limitations, ...group.limitations]
			}),
			provider: set.provider
		}))));
		processCoordinates = {
			launcher_pid: z.int().min(1),
			process_group_id: z.int().min(1)
		};
		processLineageObservation = z.discriminatedUnion("status", [z.object({
			status: z.literal("unavailable"),
			observed_at: utcDateTimeSchema,
			...processCoordinates,
			reason: z.string().min(1)
		}), z.object({
			status: z.literal("verified"),
			observed_at: utcDateTimeSchema,
			...processCoordinates,
			launcher_parent_pid: z.int().min(0),
			descendants: z.array(z.object({
				pid: z.int().min(1),
				parent_pid: z.int().min(0),
				process_group_id: z.int().min(1)
			}))
		})]);
		analysisRun = z.object({
			run_id: z.string().uuid(),
			process_lineage: z.discriminatedUnion("status", [z.object({ status: z.literal("not_observed") }), z.object({
				status: z.literal("snapshots"),
				snapshots: z.array(z.object({
					provider: providerIdentity,
					observation: processLineageObservation
				}))
			})])
		}).nullable();
		analysisActivity = z.object({
			status: z.enum([
				"not_observed",
				"idle",
				"busy"
			]),
			providers: z.array(z.object({
				provider: providerIdentity,
				active: z.object({
					request_id: z.int().min(1),
					operation: z.string().min(1),
					elapsed_ms: z.int().min(0),
					caller_state: z.enum(["waiting", "cancelled"])
				}).nullable(),
				queued_requests: z.int().min(0)
			}))
		});
		providerOperationRequest = z.object({
			request_id: z.int().min(1),
			operation: z.string().min(1),
			stage: z.enum(PROVIDER_FAILURE_STAGES)
		});
		providerOperationHealth = z.object({
			state: z.enum(PROVIDER_OPERATION_STATES),
			stage: z.enum(PROVIDER_FAILURE_STAGES).nullable(),
			retry_action: z.enum(PROVIDER_RETRY_ACTIONS).nullable(),
			exit_code: z.int().nullable(),
			requests: z.array(providerOperationRequest)
		}).nullable();
		providerRejectionCode = z.enum(PROVIDER_REJECTION_CODES);
		providerAvailabilityStates = {
			unknown: z.object({
				status: z.literal("unknown"),
				code: z.null(),
				reason: z.string().min(1)
			}),
			available: z.object({
				status: z.literal("available"),
				code: z.null(),
				reason: z.null()
			}),
			unavailable: z.object({
				status: z.literal("unavailable"),
				code: providerRejectionCode,
				reason: z.string().min(1)
			})
		};
		providerAvailability = z.discriminatedUnion("status", [
			providerAvailabilityStates.unknown.extend({ diagnostics: jsonObjectSchema }),
			providerAvailabilityStates.available.extend({ diagnostics: jsonObjectSchema }),
			providerAvailabilityStates.unavailable.extend({
				remediation: providerRemediation,
				diagnostics: jsonObjectSchema
			})
		]);
		providerTargetSupportStates = {
			unknown: z.object({
				status: z.literal("unknown"),
				code: z.null(),
				reason: z.string().min(1)
			}),
			supported: z.object({
				status: z.literal("supported"),
				code: z.null(),
				reason: z.null()
			}),
			unsupported: z.object({
				status: z.literal("unsupported"),
				code: z.enum([
					"target_kind_unsupported",
					"target_format_unsupported",
					"architecture_unsupported",
					"target_role_unsupported",
					"managed_target_unsupported"
				]),
				reason: z.string().min(1)
			})
		};
		providerTargetSupport = z.discriminatedUnion("status", [
			providerTargetSupportStates.unknown.extend({ diagnostics: jsonObjectSchema }),
			providerTargetSupportStates.supported.extend({ diagnostics: jsonObjectSchema }),
			providerTargetSupportStates.unsupported.extend({ diagnostics: jsonObjectSchema })
		]);
		analysisProviderSelectionSource = z.enum([
			"request",
			"environment",
			"auto-single-candidate"
		]);
		providerSelectionRejection = z.object({
			provider_id: z.string(),
			origin: z.enum(["availability", "target"]),
			code: z.string().min(1),
			reason: z.string().min(1),
			remediation: providerRemediation.exactOptional(),
			diagnostics: jsonObjectSchema
		});
		analysisProviderCandidate = z.object({
			provider: providerIdentity,
			availability: providerAvailability,
			target_support: providerTargetSupport,
			selected: z.boolean(),
			selection_source: analysisProviderSelectionSource.nullable(),
			rejections: z.array(providerSelectionRejection),
			capabilities: z.array(providerCapabilitySet)
		});
		analysisProviderCandidateSummary = z.strictObject({
			provider: providerIdentity,
			availability: z.discriminatedUnion("status", [
				providerAvailabilityStates.unknown.strict(),
				providerAvailabilityStates.available.strict(),
				providerAvailabilityStates.unavailable.strict()
			]),
			target_support: z.discriminatedUnion("status", [
				providerTargetSupportStates.unknown.strict(),
				providerTargetSupportStates.supported.strict(),
				providerTargetSupportStates.unsupported.strict()
			]),
			selected: z.boolean(),
			selection_source: analysisProviderSelectionSource.nullable(),
			rejections: z.array(z.strictObject({
				provider_id: z.string(),
				origin: z.enum(["availability", "target"]),
				code: z.string().min(1),
				reason: z.string().min(1)
			}))
		});
		clientFeatureNameSchema = z.enum([
			"elicitation_form",
			"elicitation_url",
			"roots",
			"sampling"
		]);
		clientFeatureAvailabilitySchema = z.object({
			elicitation_form: z.boolean(),
			elicitation_url: z.boolean(),
			roots: z.boolean(),
			sampling: z.boolean()
		});
		toolAvailabilityMode = z.discriminatedUnion("available", [z.object({
			name: z.string(),
			available: z.literal(true),
			missing_operations: z.array(z.string()).length(0),
			remediation: z.null()
		}), z.object({
			name: z.string(),
			available: z.literal(false),
			missing_operations: z.array(z.string()).min(1),
			remediation: z.string().nullable()
		})]);
		toolAvailabilityFacts = {
			name: z.string(),
			surface: z.string(),
			default_mode_available: z.boolean().optional(),
			modes: z.array(toolAvailabilityMode).optional(),
			value_flow_support: nativeValueFlowSupport.describe("The named provider's declared ability to supply value flow for some functions, separate from runtime readiness. Supported does not guarantee a model for a particular function; unknown means no declaration.").exactOptional(),
			client_requirements: z.object({
				required: z.array(clientFeatureNameSchema),
				optional: z.array(clientFeatureNameSchema),
				missing_required: z.array(clientFeatureNameSchema),
				missing_optional: z.array(clientFeatureNameSchema)
			}),
			effects: z.strictObject({
				mutatesTarget: z.boolean(),
				mutatesSession: z.boolean(),
				writesFilesystem: z.boolean(),
				launchesProcess: z.boolean(),
				accessesNetwork: z.boolean(),
				changesUiState: z.boolean(),
				mayDiscardData: z.boolean(),
				executesForeignCode: z.boolean(),
				mutatesDevice: z.boolean(),
				idempotent: z.boolean()
			}),
			annotations: z.object({
				read_only: z.boolean(),
				destructive: z.boolean(),
				idempotent: z.boolean(),
				open_world: z.boolean()
			})
		};
		toolAvailabilityAlternatives = z.array(z.string().min(1)).min(1);
		toolUnavailabilityReason = z.enum([
			"client_capability_missing",
			"target_required",
			"provider_missing",
			"provider_unavailable",
			"target_unsupported",
			"unsupported_host"
		]);
		toolAvailability = z.discriminatedUnion("available", [z.object({
			...toolAvailabilityFacts,
			available: z.literal(true),
			reason: z.literal("available"),
			remediation: z.null()
		}), z.object({
			...toolAvailabilityFacts,
			available: z.literal(false),
			reason: toolUnavailabilityReason,
			remediation: z.string().nullable(),
			alternatives: toolAvailabilityAlternatives.optional()
		})]);
		TOOL_EFFECT_NAMES = Object.keys(toolAvailabilityFacts.effects.shape);
		TOOL_ANNOTATION_NAMES = Object.keys(toolAvailabilityFacts.annotations.shape);
		toolAvailabilityStatusGroupFacts = {
			names: z.array(z.string().min(1)).min(1),
			default_mode_available: toolAvailabilityFacts.default_mode_available,
			modes: toolAvailabilityFacts.modes,
			value_flow_support: toolAvailabilityFacts.value_flow_support,
			client_requirements: toolAvailabilityFacts.client_requirements.optional()
		};
		toolAvailabilityGroupFacts = {
			names: toolAvailabilityStatusGroupFacts.names,
			surface: toolAvailabilityFacts.surface,
			default_mode_available: toolAvailabilityStatusGroupFacts.default_mode_available,
			modes: toolAvailabilityStatusGroupFacts.modes,
			value_flow_support: toolAvailabilityStatusGroupFacts.value_flow_support,
			client_requirements: toolAvailabilityStatusGroupFacts.client_requirements,
			effects: z.array(toolAvailabilityFacts.effects.keyof()),
			annotations: z.array(toolAvailabilityFacts.annotations.keyof())
		};
		toolAvailabilityGroupOf = (facts) => z.discriminatedUnion("available", [z.strictObject({
			...facts,
			available: z.literal(true),
			reason: z.literal("available"),
			remediation: z.null()
		}), z.strictObject({
			...facts,
			available: z.literal(false),
			reason: toolUnavailabilityReason,
			remediation: z.string().nullable(),
			alternatives: toolAvailabilityAlternatives.optional()
		})]);
		toolAvailabilityInventory = z.strictObject({
			client_requirements: toolAvailabilityFacts.client_requirements,
			groups: z.array(toolAvailabilityGroupOf(toolAvailabilityGroupFacts))
		});
		toolAvailabilitySummaryInventory = z.strictObject({
			client_requirements: toolAvailabilityFacts.client_requirements,
			groups: z.array(toolAvailabilityGroupOf(toolAvailabilityStatusGroupFacts))
		});
		isCompleteToolAvailabilityInventory = (inventory) => inventory.groups.every((group) => "surface" in group);
		sessionProviderFacts = z.object({
			investigation: investigationStatisticsSchema,
			cleanup_pending: z.boolean(),
			cleanup_retry: analysisCleanupRetrySchema.optional(),
			capabilities: z.array(providerCapabilitySet),
			analysis_run: analysisRun,
			analysis_activity: analysisActivity,
			provider_operation_health: providerOperationHealth,
			analysis_provider_candidates_observed: z.enum([
				"status_request",
				"target_selection",
				"not_applicable"
			]).describe("When provider candidate observations were collected: this status request, the retained target selection, or not applicable to a resource-only session."),
			analysis_provider_binding: z.object({
				provider: providerIdentity,
				selection_source: z.enum([
					"request",
					"environment",
					"auto-single-candidate"
				]),
				analysis_profile: analysisProfileSchema,
				release_verification: providerReleaseVerificationSchema.optional()
			}).nullable(),
			client_features: z.object({
				elicitation_form: z.boolean(),
				elicitation_url: z.boolean(),
				roots: z.boolean(),
				sampling: z.boolean()
			}),
			server_identity: z.object({
				package: z.object({
					name: z.string(),
					version: z.string(),
					root_path: z.string(),
					build_commit: z.string().nullable()
				}),
				server: z.object({
					name: z.string(),
					version: z.string(),
					started_at: z.string(),
					command_path: z.string().nullable()
				}),
				sdk: z.object({
					server: z.string(),
					client_test: z.string(),
					core: z.string()
				}),
				negotiated_protocol_version: z.string().nullable(),
				client: z.object({
					name: z.string(),
					version: z.string()
				}).nullable(),
				skill: z.object({
					name: z.string(),
					expected_version: z.string()
				}),
				catalog: z.strictObject({
					counts: z.strictObject({
						cli_commands: z.int().min(0),
						mcp_tools: z.int().min(0),
						mcp_prompts: z.int().min(0)
					}),
					digests: z.strictObject({
						tools_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
						prompts_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
						combined_sha256: z.string().regex(/^[a-f0-9]{64}$/u)
					})
				}),
				protocol_features: z.object({
					progress: z.boolean(),
					cancellation: z.boolean(),
					elicitation: z.boolean()
				}),
				alignment: z.object({
					state: z.enum([
						"aligned",
						"mcp_server_restart_required",
						"unknown"
					]),
					reasons: z.array(z.string()),
					remediation: z.string().nullable()
				})
			})
		}).passthrough();
		sessionStatusDetailShapes = [{
			detail: z.literal("summary"),
			omitted_fields: z.array(z.enum(BINARY_SESSION_SUMMARY_OMITTED_FIELDS)).min(1),
			analysis_provider_candidates: z.array(analysisProviderCandidateSummary),
			tool_availability: toolAvailabilitySummaryInventory
		}, {
			detail: z.literal("complete"),
			omitted_fields: z.never().optional(),
			analysis_provider_candidates: z.array(analysisProviderCandidate),
			tool_availability: toolAvailabilityInventory
		}];
		nullableText = z.string().nullable();
		addressedEntry = z.object({
			address: z.string(),
			name: z.string()
		});
		segmentOutput = evidenceResultOf(nativeSegmentListSchema);
		procedureInfoOutput = evidenceResultOf(procedureInfoSchema);
		symbolDiscoveryOutput = (property) => evidenceResultOf(z.object({
			count: z.int().min(0),
			[property]: z.array(addressedEntry)
		}));
		objcClassDiscoveryOutput = evidenceResultOf(z.object({
			count: z.int().min(0),
			classes: z.array(addressedEntry.extend({ binding_identity: objcClassImportIdentitySchema.extend({ slot_addresses: z.array(z.string().min(1)).min(1) }).optional() })),
			identity_coverage: objcClassDiscoveryCoverageSchema
		}));
	})))();
}

//#endregion
//#region dist/contracts/native/functionMatchingContracts.js
var input, observations, matchNativeFunctionsInputSchema;
function init_functionMatchingContracts() {
	return (init_functionMatchingContracts = __esmMin((() => {
		init_evidenceReference();
		input = borrowEvidenceInput();
		observations = borrowEvidenceArray();
		matchNativeFunctionsInputSchema = z.strictObject({
			left: input.describe("Left list_procedures Evidence or exact retained reference"),
			right: input.describe("Right list_procedures Evidence or exact retained reference"),
			left_observations: observations.default([]).describe("Optional same-context list_names, procedure_info, read_bytes or analyze_function Evidence"),
			right_observations: observations.default([]).describe("Optional same-context list_names, procedure_info, read_bytes or analyze_function Evidence"),
			detail: z.enum(["summary", "complete"]).default("summary")
		});
	})))();
}

//#endregion
//#region dist/domain/callPathSchemas.js
var evidenceIdSchema$9, callPathInputSchema, citedNodeSchema, citedEdgeSchema, pathSchema, resultContextShape, searchScope, callPathResultSchema;
function init_callPathSchemas() {
	return (init_callPathSchemas = __esmMin((() => {
		init_coverage();
		init_emptyArraySchema();
		init_evidence();
		init_digests();
		init_nativeAddress();
		evidenceIdSchema$9 = prefixedDigestSchema("ev");
		callPathInputSchema = z.strictObject({
			functions: z.array(evidenceSchema).min(1),
			start: z.object({ address: nativeAddressInputSchema }).strict(),
			goal: z.object({ address: nativeAddressInputSchema }).strict()
		});
		citedNodeSchema = z.object({
			address: nativeAddressSchema,
			name: z.string().nullable(),
			evidence_links: z.array(evidenceIdSchema$9).min(1)
		});
		citedEdgeSchema = z.object({
			source: nativeAddressSchema,
			target: nativeAddressSchema,
			evidence_links: z.array(evidenceIdSchema$9).min(1)
		});
		pathSchema = z.object({
			hops: z.int().min(0),
			nodes: z.array(citedNodeSchema).min(1),
			edges: z.array(citedEdgeSchema),
			evidence_links: z.array(evidenceIdSchema$9).min(1)
		}).superRefine((path, context) => {
			const edgesConnectNodes = path.edges.every((edge, index) => edge.source === path.nodes[index]?.address && edge.target === path.nodes[index + 1]?.address);
			if (path.hops !== path.edges.length || path.nodes.length !== path.edges.length + 1 || !edgesConnectNodes) context.addIssue({
				code: "custom",
				message: "Path hops and edges must connect the ordered nodes"
			});
		});
		resultContextShape = {
			start: nativeAddressSchema,
			goal: nativeAddressSchema,
			explored: z.object({
				nodes: z.int().min(0),
				edges: z.int().min(0),
				depth_reached: z.int().min(0)
			}),
			evidence_links: z.array(evidenceIdSchema$9).min(1),
			limitations: z.array(z.string())
		};
		searchScope = {
			graph: z.literal("supplied_evidence"),
			discovery: coverageStatusSchema,
			observed_status: z.enum([
				"found",
				"not_found",
				"unknown"
			])
		};
		callPathResultSchema = z.union([
			z.object({
				...resultContextShape,
				status: z.literal("found"),
				shortest_hops: z.int().min(0),
				search_scope: z.object({
					...searchScope,
					exhaustive: z.boolean(),
					observed_status: z.literal("found")
				}),
				paths: z.array(pathSchema).min(1)
			}),
			z.object({
				...resultContextShape,
				status: z.literal("not_found"),
				shortest_hops: z.null(),
				search_scope: z.object({
					...searchScope,
					exhaustive: z.literal(true),
					discovery: z.literal("complete"),
					observed_status: z.literal("not_found")
				}),
				paths: emptyArraySchema
			}),
			z.object({
				...resultContextShape,
				status: z.literal("unknown"),
				shortest_hops: z.null(),
				search_scope: z.union([z.object({
					...searchScope,
					exhaustive: z.literal(false),
					observed_status: z.literal("unknown")
				}), z.object({
					...searchScope,
					exhaustive: z.literal(true),
					discovery: z.enum(["partial", "unknown"]),
					observed_status: z.literal("not_found")
				})]),
				paths: emptyArraySchema
			})
		]);
	})))();
}

//#endregion
//#region dist/domain/comparisonSourceEvidence.js
var evidenceIdSchema$8, sideParametersSchema, comparisonSourceEvidenceSides, comparisonSourceEvidenceIds;
function init_comparisonSourceEvidence() {
	return (init_comparisonSourceEvidence = __esmMin((() => {
		init_canonicalOrdering();
		init_digests();
		init_evidenceErrors();
		init_evidenceValidation();
		evidenceIdSchema$8 = prefixedDigestSchema("ev");
		sideParametersSchema = z.object({
			left_evidence_id: evidenceIdSchema$8.optional(),
			right_evidence_id: evidenceIdSchema$8.optional(),
			left_evidence_ids: z.array(evidenceIdSchema$8).min(1).optional(),
			right_evidence_ids: z.array(evidenceIdSchema$8).min(1).optional()
		});
		comparisonSourceEvidenceSides = (evidence) => {
			const parsed = readEvidencePayload(sideParametersSchema, evidence.parameters, { within: ["parameters"] });
			if (!parsed.ok) throw parsed.error;
			const parameters = parsed.value;
			if (parameters.left_evidence_id === undefined !== (parameters.right_evidence_id === undefined) || parameters.left_evidence_ids === undefined !== (parameters.right_evidence_ids === undefined)) throw new EvidenceIntegrityError("Comparison Evidence source representation omitted one side");
			const side = (single, multiple) => {
				if (single !== undefined && multiple !== undefined && (multiple.length !== 1 || multiple[0] !== single)) throw new EvidenceIntegrityError("Comparison Evidence source representations disagree");
				const selected = single === undefined ? multiple ?? [] : [single];
				if (selected.length === 0) throw new EvidenceIntegrityError("Comparison Evidence omitted its source parameters");
				if (new Set(selected).size !== selected.length) throw new EvidenceIntegrityError("Comparison Evidence repeats a source within one side");
				return selected;
			};
			return {
				left: side(parameters.left_evidence_id, parameters.left_evidence_ids),
				right: side(parameters.right_evidence_id, parameters.right_evidence_ids)
			};
		};
		comparisonSourceEvidenceIds = (evidence) => {
			const sides = comparisonSourceEvidenceSides(evidence);
			return uniqueSorted([...sides.left, ...sides.right]);
		};
	})))();
}

//#endregion
//#region dist/domain/artifactComparison.js
var evidenceIdSchema$7, comparisonStatusSchema$1, changeKindSchema, comparisonDimensionSchema, artifactChangeSchema, artifactComparisonResultSchema, FORMAT_DECLARATION_UNKNOWN_LIMITATION, comparisonInventory, compareArtifacts, compareOccurrences, occurrencesByPath, buildArtifactChangeBase, classifyPresence, classifyIntegrity, classifyAvailability, classifyPath, declarationChanged, declaredFactChanged, declarationUnknown, differsWithUnknown, differsWithMissing, occurrenceDifferences, compareAsarPacking, compareFormatDeclarations, occurrenceMetadata, classifyDeclarationRecord, declaredDigestsDiffer, changedDimensions, metadataChanged, nodeFor, relationsForOccurrence, compareRelations, summarize, applyRootHashChange;
function init_artifactComparison() {
	return (init_artifactComparison = __esmMin((() => {
		init_unicodeCodePointOrder();
		init_artifactGraph();
		init_analysisErrorCore();
		init_artifactInventoryEvidence();
		init_artifactFormatMetadata();
		init_digests();
		init_comparisonSemantics();
		evidenceIdSchema$7 = prefixedDigestSchema("ev");
		comparisonStatusSchema$1 = z.enum([
			"unchanged",
			"added",
			"removed",
			"changed",
			"truncated",
			"unknown",
			"contradiction"
		]);
		changeKindSchema = z.enum([
			"added",
			"removed",
			"changed",
			"unknown",
			"contradiction"
		]);
		comparisonDimensionSchema = z.enum([
			"content",
			"kind",
			"format",
			"size",
			"executable",
			"relations",
			"metadata",
			"availability",
			"integrity"
		]);
		artifactChangeSchema = z.object({
			classification: changeKindSchema,
			logical_path: z.string().min(1),
			dimensions: z.array(comparisonDimensionSchema).min(1),
			left_occurrence_id: z.string().regex(/^occ_[a-f0-9]{64}$/u).nullable(),
			right_occurrence_id: z.string().regex(/^occ_[a-f0-9]{64}$/u).nullable(),
			left_artifact_id: z.string().regex(/^art_[a-f0-9]{64}$/u).nullable(),
			right_artifact_id: z.string().regex(/^art_[a-f0-9]{64}$/u).nullable(),
			evidence_links: z.array(evidenceIdSchema$7).min(2)
		});
		artifactComparisonResultSchema = z.object({
			status: comparisonStatusSchema$1,
			left_manifest_id: prefixedDigestSchema("agm"),
			right_manifest_id: prefixedDigestSchema("agm"),
			summary: z.object({
				unchanged: z.int().min(0),
				added: z.int().min(0),
				removed: z.int().min(0),
				changed: z.int().min(0),
				unknown: z.int().min(0),
				contradiction: z.int().min(0).default(0)
			}),
			changes: z.array(artifactChangeSchema),
			integrity_mismatch_evidence_ids: z.array(evidenceIdSchema$7).optional(),
			limitations: z.array(z.string())
		}).superRefine((result, context) => {
			if (result.status === "unchanged" && (result.changes.length > 0 || result.summary.added > 0 || result.summary.removed > 0 || result.summary.changed > 0 || result.summary.unknown > 0 || result.summary.contradiction > 0 || (result.integrity_mismatch_evidence_ids?.length ?? 0) > 0)) context.addIssue({
				code: "custom",
				path: ["status"],
				message: "An unchanged artifact comparison cannot retain changes, non-zero change counts, or integrity mismatches.",
				params: { constraint: "unchanged-has-no-changes" }
			});
		});
		FORMAT_DECLARATION_UNKNOWN_LIMITATION = "Format metadata declarations are missing on one side or differ in kind for matching paths; omitted metadata may be a legacy or non-container observation and leaves the complete declaration unavailable.";
		comparisonInventory = (input, side) => {
			try {
				return parseArtifactInventoryEvidence(input);
			} catch (cause) {
				if (!(cause instanceof ArtifactInventoryCarrierError)) throw cause;
				throw new AnalysisInputError("compare_artifacts", {
					cause,
					userMessage: cause.message
				}, [{
					path: [side],
					reason: "invalid_value",
					message: cause.message
				}]);
			}
		};
		compareArtifacts = (leftEvidence, rightEvidence) => {
			const left = comparisonInventory(leftEvidence, "left");
			const right = comparisonInventory(rightEvidence, "right");
			const leftComplete = left.inventory.complete;
			const rightComplete = right.inventory.complete;
			const sameScope = left.inventory.coverage.scope === right.inventory.coverage.scope;
			const rootCoverageComplete = sameScope && left.inventory.complete && right.inventory.complete && left.inventory.coverage.status === "complete" && right.inventory.coverage.status === "complete";
			const entryCoverageComplete = rootCoverageComplete && left.inventory.coverage.scope === "container-entries";
			const leftCovered = sameScope && hasCompleteInventoryCoverage(left.inventory, left.inventory.coverage.scope);
			const rightCovered = sameScope && hasCompleteInventoryCoverage(right.inventory, right.inventory.coverage.scope);
			const fullyCovered = leftCovered && rightCovered && (entryCoverageComplete || rootCoverageComplete && left.inventory.manifest.occurrence_count === 1 && right.inventory.manifest.occurrence_count === 1);
			const leftOccurrencesByPath = occurrencesByPath(left.inventory.occurrences);
			const rightOccurrencesByPath = occurrencesByPath(right.inventory.occurrences);
			const comparison = compareOccurrences(left.inventory, right.inventory, leftOccurrencesByPath, rightOccurrencesByPath, [...left.evidence.map(({ evidence_id: id }) => id), ...right.evidence.map(({ evidence_id: id }) => id)], {
				root: rootCoverageComplete,
				entries: entryCoverageComplete
			});
			const changes = comparison.changes;
			const limitations = [
				...left.inventory.limitations.map((item) => `Left: ${item}`),
				...right.inventory.limitations.map((item) => `Right: ${item}`),
				...leftComplete ? [] : ["Left artifact inventory is incomplete."],
				...rightComplete ? [] : ["Right artifact inventory is incomplete."],
				...sameScope ? [] : ["Artifact inventory scopes differ."],
				...sameScope && left.inventory.coverage.scope === "root" && (left.inventory.manifest.occurrence_count > 1 || right.inventory.manifest.occurrence_count > 1) ? ["Container entry coverage is unavailable for child paths."] : [],
				...left.inventory.coverage.status === "complete" ? [] : ["Left artifact inventory traversal coverage is unknown."],
				...right.inventory.coverage.status === "complete" ? [] : ["Right artifact inventory traversal coverage is unknown."],
				...comparison.hasUnknownAsarPacking ? ["ASAR packing metadata is recorded on only one side for matching paths; omitted metadata may be a legacy observation and does not establish packed or unpacked storage."] : [],
				...comparison.hasUnknownFormatDeclaration ? [FORMAT_DECLARATION_UNKNOWN_LIMITATION] : [],
				...comparison.hasAmbiguousDuplicatePaths ? ["Duplicate logical paths cannot be paired across inventories; comparisons for those paths are unknown."] : []
			];
			applyRootHashChange(left.inventory, right.inventory, changes, [...left.evidence.map(({ evidence_id: id }) => id), ...right.evidence.map(({ evidence_id: id }) => id)]);
			const summary = summarize(left.inventory, right.inventory, changes, fullyCovered);
			return artifactComparisonResultSchema.parse({
				status: !leftComplete || !rightComplete ? "truncated" : changes.some(({ classification }) => classification === "contradiction") ? "contradiction" : !fullyCovered ? "unknown" : changes.some(({ classification }) => classification === "unknown") ? "unknown" : changes.length === 0 ? "unchanged" : "changed",
				left_manifest_id: left.inventory.manifest.manifest_id,
				right_manifest_id: right.inventory.manifest.manifest_id,
				summary,
				changes,
				integrity_mismatch_evidence_ids: [...new Set([left, right].flatMap((source) => source.inventory.occurrences.some((occurrence) => occurrence.hash_status === "mismatched") ? source.evidence.map((record) => record.evidence_id) : []))].sort(compareUnicodeCodePoints),
				limitations: [...new Set(limitations)].sort(compareUnicodeCodePoints)
			});
		};
		compareOccurrences = (left, right, leftByPath, rightByPath, evidenceLinks, coverage) => {
			const leftNodes = new Map(left.nodes.map((item) => [item.artifact_id, item]));
			const rightNodes = new Map(right.nodes.map((item) => [item.artifact_id, item]));
			const leftRelationsFor = relationsForOccurrence(left);
			const rightRelationsFor = relationsForOccurrence(right);
			const paths = [...new Set([...leftByPath.keys(), ...rightByPath.keys()])].sort(compareUnicodeCodePoints);
			const output = [];
			let hasAmbiguousDuplicatePaths = false;
			let hasUnknownAsarPacking = false;
			let hasUnknownFormatDeclaration = false;
			for (const path of paths) {
				const leftMatches = leftByPath.get(path) ?? [];
				const rightMatches = rightByPath.get(path) ?? [];
				if (leftMatches.length > 1 || rightMatches.length > 1) {
					hasAmbiguousDuplicatePaths = true;
					const integrityMismatch = [...leftMatches, ...rightMatches].some(({ hash_status: status }) => status === "mismatched");
					output.push({
						logical_path: path,
						classification: integrityMismatch ? "contradiction" : "unknown",
						dimensions: integrityMismatch ? ["availability", "integrity"] : ["availability"],
						left_occurrence_id: null,
						right_occurrence_id: null,
						left_artifact_id: null,
						right_artifact_id: null,
						evidence_links: [...evidenceLinks]
					});
					continue;
				}
				const leftOccurrence = leftMatches[0];
				const rightOccurrence = rightMatches[0];
				const metadata = occurrenceMetadata({
					leftOccurrence,
					rightOccurrence
				});
				if (leftOccurrence !== undefined && rightOccurrence !== undefined) {
					if (metadata.asarPacking === "unknown") hasUnknownAsarPacking = true;
					if (metadata.formatDeclaration === "unknown") hasUnknownFormatDeclaration = true;
				}
				const change = classifyPath({
					metadata,
					path,
					leftOccurrence,
					rightOccurrence,
					leftNode: nodeFor(leftOccurrence, leftNodes),
					rightNode: nodeFor(rightOccurrence, rightNodes),
					relations: compareRelations(leftRelationsFor(leftOccurrence), rightRelationsFor(rightOccurrence)),
					rootCovered: coverage.root,
					entriesCovered: coverage.entries,
					evidenceLinks
				});
				if (change !== null) output.push(change);
			}
			return {
				changes: output,
				hasAmbiguousDuplicatePaths,
				hasUnknownAsarPacking,
				hasUnknownFormatDeclaration
			};
		};
		occurrencesByPath = (occurrences) => {
			const output = new Map();
			for (const occurrence of occurrences) {
				const matches = output.get(occurrence.logical_path);
				if (matches === undefined) output.set(occurrence.logical_path, [occurrence]);
				else matches.push(occurrence);
			}
			return output;
		};
		buildArtifactChangeBase = (input) => ({
			logical_path: input.path,
			left_occurrence_id: input.leftOccurrence?.occurrence_id ?? null,
			right_occurrence_id: input.rightOccurrence?.occurrence_id ?? null,
			left_artifact_id: input.leftOccurrence?.artifact_id ?? null,
			right_artifact_id: input.rightOccurrence?.artifact_id ?? null,
			evidence_links: [...input.evidenceLinks]
		});
		classifyPresence = (input, base) => {
			const covered = input.path === "." ? input.rootCovered : input.entriesCovered;
			if (input.leftOccurrence === undefined) return {
				...base,
				classification: covered ? "added" : "unknown",
				dimensions: [covered ? "content" : "availability"]
			};
			if (input.rightOccurrence === undefined) return {
				...base,
				classification: covered ? "removed" : "unknown",
				dimensions: [covered ? "content" : "availability"]
			};
			return null;
		};
		classifyIntegrity = (input, base) => {
			if (input.leftOccurrence?.hash_status === "mismatched" || input.rightOccurrence?.hash_status === "mismatched") return {
				...base,
				classification: "contradiction",
				dimensions: ["integrity"]
			};
			return null;
		};
		classifyAvailability = (input, base) => {
			if (input.leftOccurrence?.hash_status !== "verified" || input.rightOccurrence?.hash_status !== "verified" || input.leftNode === undefined || input.rightNode === undefined) return {
				...base,
				classification: "unknown",
				dimensions: ["availability"]
			};
			return null;
		};
		classifyPath = (input) => {
			const base = buildArtifactChangeBase(input);
			const integrity = classifyIntegrity(input, base);
			if (integrity !== null) return integrity;
			const presence = classifyPresence(input, base);
			if (presence !== null) return presence;
			const declaration = classifyDeclarationRecord(input, base);
			if (declaration.handled) return declaration.change;
			const availability = classifyAvailability(input, base);
			if (availability !== null) {
				const known = occurrenceDifferences(input);
				const dimensions = [];
				if (known.kind) dimensions.push("kind");
				if (known.format) dimensions.push("format");
				if (known.executable) dimensions.push("executable");
				if (input.relations === "changed") dimensions.push("relations");
				if (known.metadata || declaredDigestsDiffer(input)) dimensions.push("metadata");
				dimensions.push("availability");
				return {
					...base,
					classification: declarationChanged(input.metadata) ? "changed" : "unknown",
					dimensions
				};
			}
			const dimensions = changedDimensions(input);
			const occurrence = occurrenceDifferences(input);
			if (declarationUnknown(input.metadata) || occurrence.kindUnknown || occurrence.formatUnknown || input.relations === "unknown" || differsWithUnknown(input.leftNode?.format, input.rightNode?.format) || differsWithMissing(input.leftNode?.media_type, input.rightNode?.media_type) || differsWithMissing(input.leftNode?.architecture, input.rightNode?.architecture)) {
				if (dimensions.length === 0) return {
					...base,
					classification: "unknown",
					dimensions: ["availability"]
				};
				dimensions.push("availability");
			}
			return dimensions.length === 0 ? null : {
				...base,
				classification: "changed",
				dimensions
			};
		};
		declarationChanged = (metadata) => metadata.asarPacking === "changed" || metadata.formatDeclaration === "changed";
		declaredFactChanged = (metadata) => Object.values(metadata).includes("changed");
		declarationUnknown = (metadata) => Object.values(metadata).includes("unknown");
		differsWithUnknown = (left, right) => left !== right && (left == null || right == null || left === "unknown" || right === "unknown");
		differsWithMissing = (left, right) => left !== right && (left == null || right == null);
		occurrenceDifferences = (input) => ({
			kind: input.leftOccurrence?.artifact_kind !== input.rightOccurrence?.artifact_kind && !differsWithUnknown(input.leftOccurrence?.artifact_kind, input.rightOccurrence?.artifact_kind),
			kindUnknown: differsWithUnknown(input.leftOccurrence?.artifact_kind, input.rightOccurrence?.artifact_kind),
			format: input.leftOccurrence?.artifact_format !== input.rightOccurrence?.artifact_format && !differsWithUnknown(input.leftOccurrence?.artifact_format, input.rightOccurrence?.artifact_format),
			formatUnknown: differsWithUnknown(input.leftOccurrence?.artifact_format, input.rightOccurrence?.artifact_format),
			executable: input.leftOccurrence?.executable !== input.rightOccurrence?.executable,
			metadata: declaredFactChanged(input.metadata) || input.leftOccurrence?.entry_kind !== input.rightOccurrence?.entry_kind
		});
		compareAsarPacking = (left, right) => left === right ? "unchanged" : left === undefined || right === undefined ? "unknown" : "changed";
		compareFormatDeclarations = (left, right) => {
			if (left === undefined && right === undefined) return {
				formatDeclaration: "absent",
				formatDeclarationAvailability: "unchanged"
			};
			if (left === undefined || right === undefined || left.kind !== right.kind) return {
				formatDeclaration: "unknown",
				formatDeclarationAvailability: "unchanged"
			};
			const unreadable = new Set([...left.unreadable, ...right.unreadable]);
			const readable = (facts) => Object.fromEntries(Object.entries(facts).filter(([field]) => !unreadable.has(field)));
			return {
				formatDeclaration: canonicalJson(readable(left.facts)) === canonicalJson(readable(right.facts)) ? "unchanged" : "changed",
				formatDeclarationAvailability: Object.keys(left.facts).some((field) => unreadable.has(field)) ? "unknown" : "unchanged"
			};
		};
		occurrenceMetadata = (input) => {
			const left = input.leftOccurrence;
			const right = input.rightOccurrence;
			return {
				asarPacking: compareAsarPacking(left?.unpacked, right?.unpacked),
				encryption: left?.encrypted === right?.encrypted ? "unchanged" : "changed",
				...compareFormatDeclarations(formatMetadataDeclaration(left?.format_metadata), formatMetadataDeclaration(right?.format_metadata))
			};
		};
		classifyDeclarationRecord = (input, base) => {
			if (input.leftOccurrence?.entry_kind !== "metadata" || input.rightOccurrence?.entry_kind !== "metadata" || input.leftOccurrence.artifact_id !== null || input.rightOccurrence.artifact_id !== null || input.metadata.formatDeclaration === "absent") return {
				handled: false,
				change: null
			};
			const dimensions = [];
			if (input.leftOccurrence.executable !== input.rightOccurrence.executable) dimensions.push("executable");
			if (declaredFactChanged(input.metadata)) dimensions.push("metadata");
			const unknown = declarationUnknown(input.metadata);
			if (dimensions.length === 0) return {
				handled: true,
				change: unknown ? {
					...base,
					classification: "unknown",
					dimensions: ["availability"]
				} : null
			};
			if (unknown) dimensions.push("availability");
			return {
				handled: true,
				change: {
					...base,
					classification: "changed",
					dimensions
				}
			};
		};
		declaredDigestsDiffer = (input) => {
			const left = input.leftOccurrence?.declared_integrity;
			const right = input.rightOccurrence?.declared_integrity;
			if (left === undefined || right === undefined) return left !== right;
			return left.algorithm === right.algorithm && left.digest !== right.digest;
		};
		changedDimensions = (input) => {
			const left = input.leftNode;
			const right = input.rightNode;
			if (left === undefined || right === undefined) return ["availability"];
			const occurrence = occurrenceDifferences(input);
			const checks = [
				["content", left.sha256 !== right.sha256],
				["kind", occurrence.kind],
				["format", left.format !== right.format && !differsWithUnknown(left.format, right.format) || occurrence.format],
				["size", left.size !== right.size],
				["executable", occurrence.executable],
				["relations", input.relations === "changed"],
				["metadata", occurrence.metadata || metadataChanged(left, right)]
			];
			return checks.filter(([, changed]) => changed).map(([dimension]) => dimension);
		};
		metadataChanged = (left, right) => left.media_type !== right.media_type && !differsWithMissing(left.media_type, right.media_type) || left.architecture !== right.architecture && !differsWithMissing(left.architecture, right.architecture) || left.content_state !== right.content_state;
		nodeFor = (occurrence, nodes) => occurrence?.artifact_id === null || occurrence?.artifact_id === undefined ? undefined : nodes.get(occurrence.artifact_id);
		relationsForOccurrence = (inventory) => {
			if (inventory.edges.length !== inventory.manifest.edge_count) return () => undefined;
			const output = new Map();
			const unresolvedPaths = new Set();
			const occurrences = new Map(inventory.occurrences.map((item) => [item.occurrence_id, item]));
			for (const edge of inventory.edges) {
				const occurrence = occurrences.get(edge.occurrence_id);
				if (occurrence?.artifact_id === null || occurrence === undefined) continue;
				const path = occurrence.logical_path;
				const parent = occurrence.parent_occurrence_id === null ? null : occurrences.get(occurrence.parent_occurrence_id);
				if (parent === undefined) {
					unresolvedPaths.add(path);
					continue;
				}
				const values = output.get(path);
				const projection = {
					parent_logical_path: parent?.logical_path ?? null,
					mapped_artifact_id: edge.relation === "maps-source" ? edge.parent_artifact_id : null,
					child_artifact_id: occurrence.artifact_id,
					relation: edge.relation,
					logical_path: occurrence.logical_path,
					producer: edge.producer
				};
				if (values === undefined) output.set(path, [projection]);
				else values.push(projection);
			}
			for (const values of output.values()) values.sort((left, right) => compareUnicodeCodePoints(canonicalJson(left), canonicalJson(right)));
			return (occurrence) => {
				if (occurrence?.artifact_id == null) return undefined;
				if (artifactOccurrenceRelationshipCoverage(occurrence) === "unknown") return undefined;
				const path = occurrence.logical_path;
				return unresolvedPaths.has(path) ? undefined : output.get(path) ?? [];
			};
		};
		compareRelations = (left, right) => {
			if (left === undefined || right === undefined) return "unknown";
			return JSON.stringify(left) === JSON.stringify(right) ? "unchanged" : "changed";
		};
		summarize = (left, right, changes, covered) => {
			const counts = {
				added: 0,
				removed: 0,
				changed: 0,
				unknown: 0,
				contradiction: 0
			};
			for (const change of changes) counts[change.classification] += 1;
			const changedPaths = new Set(changes.filter(({ classification }) => classification !== "added").map(({ logical_path: path }) => path));
			return {
				unchanged: covered ? left.occurrences.filter(({ logical_path: path }) => !changedPaths.has(path)).length : 0,
				...counts,
				unknown: covered ? counts.unknown : Math.max(counts.unknown, Math.max(left.manifest.occurrence_count, right.manifest.occurrence_count) - counts.added - counts.removed - counts.changed - counts.contradiction)
			};
		};
		applyRootHashChange = (left, right, changes, evidenceLinks) => {
			if (left.manifest.root_sha256 === right.manifest.root_sha256) return;
			const index = changes.findIndex((change) => change.logical_path === ".");
			const existing = changes[index];
			if (existing !== undefined) {
				if (existing.dimensions.includes("content") || existing.classification !== "unknown" && existing.classification !== "changed") return;
				changes[index] = {
					...existing,
					classification: "changed",
					dimensions: comparisonDimensionSchema.options.filter((dimension) => dimension === "content" || existing.dimensions.includes(dimension)),
					evidence_links: [...new Set([...existing.evidence_links, ...evidenceLinks])]
				};
				return;
			}
			const leftRoot = left.occurrences.find((occurrence) => occurrence.logical_path === ".");
			const rightRoot = right.occurrences.find((occurrence) => occurrence.logical_path === ".");
			changes.push({
				classification: "changed",
				logical_path: ".",
				dimensions: ["content"],
				left_occurrence_id: leftRoot?.occurrence_id ?? null,
				right_occurrence_id: rightRoot?.occurrence_id ?? null,
				left_artifact_id: leftRoot?.artifact_id ?? null,
				right_artifact_id: rightRoot?.artifact_id ?? null,
				evidence_links: [...evidenceLinks]
			});
		};
	})))();
}

//#endregion
//#region dist/domain/process/processObservation.js
var comparableTerminalFrame, processObservationSourceSchema, processObservationLocationSchema, comparableProcessObservationPayload, createProcessObservation, atMilliseconds, isSafeMillisecond, processObservationSubject, projectedRecord, projectProcessObservation;
function init_processObservation() {
	return (init_processObservation = __esmMin((() => {
		init_jsonValue();
		comparableTerminalFrame = (frame) => ({
			sequence: frame.sequence,
			at_ms: frame.at_ms,
			data: frame.data
		});
		processObservationSourceSchema = z.enum([
			"terminal_raw",
			"terminal_rendered",
			"interaction",
			"lifecycle",
			"process",
			"filesystem"
		]);
		processObservationLocationSchema = z.strictObject({
			collection: z.enum([
				"frames",
				"rendered_frames",
				"interaction_events",
				"lifecycle",
				"process_samples",
				"filesystem_checkpoints"
			]),
			index: z.int().nonnegative(),
			capture_order: z.int().nonnegative()
		});
		comparableProcessObservationPayload = (value, ignoredFields = []) => {
			if (ignoredFields.length === 0 || typeof value !== "object" || value === null || Array.isArray(value)) return value;
			return Object.fromEntries(Object.entries(value).filter(([name]) => !ignoredFields.includes(name)));
		};
		createProcessObservation = (input) => ({
			event_id: `obs.${input.location.collection}.${String(input.location.index)}`,
			source: input.source,
			source_sequence: input.source_sequence,
			capture_order: input.location.capture_order,
			captured_at_ms: input.captured_at_ms,
			subject_id: input.subject_id,
			location: input.location,
			payload: jsonValueSchema.parse(input.payload)
		});
		atMilliseconds = (value) => {
			if (typeof value !== "object" || value === null) return null;
			if ("at_ms" in value && isSafeMillisecond(value.at_ms)) return value.at_ms;
			if ("dispatched_at_ms" in value && isSafeMillisecond(value.dispatched_at_ms)) return value.dispatched_at_ms;
			return null;
		};
		isSafeMillisecond = (value) => typeof value === "number" && Number.isSafeInteger(value);
		processObservationSubject = (source, value) => {
			if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
			if (source === "process" && "pid" in value && typeof value.pid === "number") return `process:${String(value.pid)}`;
			if (source === "filesystem" && "name" in value && typeof value.name === "string") return `checkpoint:${value.name}`;
			return null;
		};
		projectedRecord = (capture, location) => {
			const projected = (() => {
				switch (location.collection) {
					case "frames": {
						const frame = capture.frames[location.index];
						return {
							source: "terminal_raw",
							value: frame === undefined ? undefined : comparableTerminalFrame(frame)
						};
					}
					case "rendered_frames": return {
						source: "terminal_rendered",
						value: capture.rendered_frames[location.index]
					};
					case "interaction_events": return {
						source: "interaction",
						value: capture.interaction_events[location.index]
					};
					case "lifecycle": return location.index === 0 ? {
						source: "lifecycle",
						value: {
							event: "exit",
							...capture.exit
						}
					} : location.index === 1 ? {
						source: "lifecycle",
						value: {
							event: "settlement",
							...capture.settlement
						}
					} : null;
					case "process_samples": return {
						source: "process",
						value: capture.process_samples[location.index]
					};
					case "filesystem_checkpoints": return {
						source: "filesystem",
						value: capture.filesystem_checkpoints[location.index]
					};
				}
			})();
			if (projected === null || projected.value === undefined) return null;
			const payload = jsonValueSchema.parse(projected.value);
			return {
				source: projected.source,
				captured_at_ms: atMilliseconds(payload),
				subject_id: processObservationSubject(projected.source, payload),
				payload
			};
		};
		projectProcessObservation = (capture, location) => {
			const projected = projectedRecord(capture, location);
			if (projected === null) return null;
			return createProcessObservation({
				source: projected.source,
				source_sequence: location.index,
				captured_at_ms: projected.captured_at_ms,
				subject_id: projected.subject_id,
				location,
				payload: projected.payload
			});
		};
	})))();
}

//#endregion
//#region dist/domain/process/processTraceSpecification.js
var processTraceIdentifierSchema, cardinalitySchema, eventDeclarationSchema, partialOrderLanguageSchema, finiteTraceTokenSchema, finiteTraceLanguageSchema, specificationShapeSchema, canonicalTraceJson, processTraceCardinalityBounds, addReferenceIssue, pairKey, buildAdjacency, validateNotBefore, classifyGraph, collectReachable, validateUnorderedGroups, validateTotalOrderRelations, addUnorderedConflictIssues, validatePartialOrderRelations, validatePartialOrder, countVariantEvents, finiteTraceKey, validateFiniteTraces, processTraceSpecificationSchema;
function init_processTraceSpecification() {
	return (init_processTraceSpecification = __esmMin((() => {
		init_stringPatterns();
		init_jsonValue();
		init_processObservation();
		processTraceIdentifierSchema = z.string().regex(IDENTIFIER_PATTERN);
		cardinalitySchema = z.discriminatedUnion("kind", [
			z.strictObject({ kind: z.literal("required") }),
			z.strictObject({ kind: z.literal("optional") }),
			z.strictObject({
				kind: z.literal("exact"),
				count: z.int().min(0)
			}),
			z.strictObject({
				kind: z.literal("range"),
				min: z.int().min(0),
				max: z.int().min(0)
			}).refine(({ min, max }) => min <= max, {
				message: "cardinality min must not exceed max",
				path: ["min"]
			})
		]);
		eventDeclarationSchema = z.strictObject({
			id: processTraceIdentifierSchema,
			source: processObservationSourceSchema,
			exact: jsonValueSchema,
			ignore_fields: z.array(z.enum([
				"sequence",
				"at_ms",
				"scheduled_at_ms",
				"dispatched_at_ms",
				"elapsed_ms"
			])).refine((values) => new Set(values).size === values.length, { message: "ignored event fields must be unique" }).optional(),
			cardinality: cardinalitySchema.default({ kind: "required" })
		});
		partialOrderLanguageSchema = z.strictObject({
			kind: z.literal("partial_order"),
			happens_before: z.array(z.strictObject({
				before: processTraceIdentifierSchema,
				after: processTraceIdentifierSchema
			})).default([]),
			not_before: z.array(z.strictObject({
				event: processTraceIdentifierSchema,
				anchor: processTraceIdentifierSchema
			})).default([]),
			unordered_groups: z.array(z.strictObject({ events: z.array(processTraceIdentifierSchema).min(2) })).default([]),
			prefix: z.array(processTraceIdentifierSchema).default([]),
			suffix: z.array(processTraceIdentifierSchema).default([])
		});
		finiteTraceTokenSchema = z.union([processTraceIdentifierSchema, z.strictObject({ unordered: z.array(processTraceIdentifierSchema).min(2) })]);
		finiteTraceLanguageSchema = z.strictObject({
			kind: z.literal("finite_traces"),
			variants: z.array(z.strictObject({
				id: processTraceIdentifierSchema,
				trace: z.array(finiteTraceTokenSchema)
			})).min(1)
		});
		specificationShapeSchema = z.strictObject({
			events: z.array(eventDeclarationSchema).min(1),
			language: z.discriminatedUnion("kind", [partialOrderLanguageSchema, finiteTraceLanguageSchema])
		});
		canonicalTraceJson = (value) => {
			const serialized = canonicalize(value);
			if (serialized === undefined) throw new TypeError("Trace specification contains a non-JSON value");
			return serialized;
		};
		processTraceCardinalityBounds = (cardinality) => {
			switch (cardinality.kind) {
				case "required": return [1, 1];
				case "optional": return [0, 1];
				case "exact": return [cardinality.count, cardinality.count];
				case "range": return [cardinality.min, cardinality.max];
			}
		};
		addReferenceIssue = (context, known, id, path) => {
			if (!known.has(id)) context.addIssue({
				code: "custom",
				message: `unknown event id: ${id}`,
				path
			});
		};
		pairKey = (left, right) => left <= right ? `${left}\0${right}` : `${right}\0${left}`;
		buildAdjacency = (language, context, known) => {
			const adjacency = new Map([...known].map((id) => [id, new Set()]));
			for (const [index, edge] of language.happens_before.entries()) {
				const path = [
					"language",
					"happens_before",
					index
				];
				addReferenceIssue(context, known, edge.before, [...path, "before"]);
				addReferenceIssue(context, known, edge.after, [...path, "after"]);
				if (edge.before === edge.after) context.addIssue({
					code: "custom",
					message: "happens-before edges must reference distinct events",
					path
				});
				adjacency.get(edge.before)?.add(edge.after);
			}
			return adjacency;
		};
		validateNotBefore = (language, context, known) => {
			const pairs = new Set();
			for (const [index, constraint] of language.not_before.entries()) {
				const path = [
					"language",
					"not_before",
					index
				];
				addReferenceIssue(context, known, constraint.event, [...path, "event"]);
				addReferenceIssue(context, known, constraint.anchor, [...path, "anchor"]);
				if (constraint.event === constraint.anchor) context.addIssue({
					code: "custom",
					message: "not-before constraints must reference distinct events",
					path
				});
				const key = pairKey(constraint.event, constraint.anchor);
				if (pairs.has(key)) context.addIssue({
					code: "custom",
					message: "not-before event pairs must be declared once",
					path
				});
				pairs.add(key);
			}
			return pairs;
		};
		classifyGraph = (ids, adjacency) => {
			const incoming = new Map(ids.map((id) => [id, 0]));
			let hasUnknownSuccessor = false;
			for (const successors of adjacency.values()) for (const successor of successors) {
				const count = incoming.get(successor);
				if (count === undefined) hasUnknownSuccessor = true;
				else incoming.set(successor, count + 1);
			}
			const ready = [...incoming].flatMap(([id, count]) => count === 0 ? [id] : []);
			const order = [];
			let unique = true;
			while (ready.length > 0) {
				if (ready.length !== 1) unique = false;
				const current = ready.pop();
				if (current === undefined) continue;
				order.push(current);
				for (const successor of adjacency.get(current) ?? []) {
					const count = incoming.get(successor);
					if (count === undefined) continue;
					incoming.set(successor, count - 1);
					if (count === 1) ready.push(successor);
				}
			}
			if (order.length !== incoming.size) return { kind: "cyclic" };
			if (unique && order.length === ids.length && !hasUnknownSuccessor) {
				return {
					kind: "total-order",
					rank: new Map(order.map((id, index) => [id, index]))
				};
			}
			const reverseAdjacency = new Map([...incoming.keys()].map((id) => [id, new Set()]));
			for (const [before, successors] of adjacency) for (const after of successors) reverseAdjacency.get(after)?.add(before);
			return {
				kind: "partial-order",
				reverseAdjacency
			};
		};
		collectReachable = (origin, adjacency) => {
			const seen = new Set();
			const pending = [...adjacency.get(origin) ?? []];
			while (pending.length > 0) {
				const current = pending.pop();
				if (current === undefined || seen.has(current)) continue;
				seen.add(current);
				for (const successor of adjacency.get(current) ?? []) pending.push(successor);
			}
			return seen;
		};
		validateUnorderedGroups = (language, context, known) => {
			const memberships = new Map();
			const groups = [];
			const repeatedMemberships = new Map();
			for (const [groupIndex, group] of language.unordered_groups.entries()) {
				const path = [
					"language",
					"unordered_groups",
					groupIndex
				];
				const uniqueIds = new Set();
				const repeatedIds = new Set();
				for (const id of group.events) {
					if (uniqueIds.has(id)) repeatedIds.add(id);
					else uniqueIds.add(id);
				}
				groups.push(uniqueIds);
				for (const id of repeatedIds) {
					const groupIndexes = repeatedMemberships.get(id) ?? new Set();
					groupIndexes.add(groupIndex);
					repeatedMemberships.set(id, groupIndexes);
				}
				if (uniqueIds.size !== group.events.length) context.addIssue({
					code: "custom",
					message: "unordered groups must not repeat event ids",
					path: [...path, "events"]
				});
				for (const [eventIndex, id] of group.events.entries()) addReferenceIssue(context, known, id, [
					...path,
					"events",
					eventIndex
				]);
				const overlaps = new Map();
				for (const id of uniqueIds) {
					const priorGroups = memberships.get(id) ?? new Set();
					for (const prior of priorGroups) overlaps.set(prior, (overlaps.get(prior) ?? 0) + 1);
					priorGroups.add(groupIndex);
					memberships.set(id, priorGroups);
				}
				if ([...overlaps.values()].some((count) => count > 1)) context.addIssue({
					code: "custom",
					message: "unordered event pairs must be declared once",
					path
				});
			}
			const markSharedGroups = (left, right, conflicts) => {
				if (left === right) {
					for (const groupIndex of repeatedMemberships.get(left) ?? []) conflicts[groupIndex] = true;
					return;
				}
				const rightGroups = memberships.get(right);
				for (const group of memberships.get(left) ?? []) if (rightGroups?.has(group) === true) conflicts[group] = true;
			};
			return {
				groups,
				hasPair(left, right) {
					if (left === right) return memberships.has(left);
					const rightGroups = memberships.get(right);
					for (const group of memberships.get(left) ?? []) if (rightGroups?.has(group) === true) return true;
					return false;
				},
				markDeclaredPairConflicts(pairs, conflicts) {
					for (const key of pairs) {
						const separator = key.indexOf("\0");
						const left = key.slice(0, separator);
						const right = key.slice(separator + 1);
						markSharedGroups(left, right, conflicts);
					}
				},
				markSharedGroups
			};
		};
		validateTotalOrderRelations = (language, graph, unorderedGroups, notBeforePairs, context) => {
			for (const [index, constraint] of language.not_before.entries()) {
				const before = graph.rank.get(constraint.event);
				const after = graph.rank.get(constraint.anchor);
				if (before !== undefined && after !== undefined && before < after) context.addIssue({
					code: "custom",
					message: "not-before constraint conflicts with happens-before order",
					path: [
						"language",
						"not_before",
						index
					]
				});
			}
			const conflicts = new Array(language.unordered_groups.length).fill(false);
			for (const [groupIndex, group] of unorderedGroups.groups.entries()) {
				let comparableEvents = 0;
				for (const id of group) if (graph.rank.has(id) && ++comparableEvents === 2) {
					conflicts[groupIndex] = true;
					break;
				}
			}
			unorderedGroups.markDeclaredPairConflicts(notBeforePairs, conflicts);
			addUnorderedConflictIssues(conflicts, context);
		};
		addUnorderedConflictIssues = (conflicts, context) => {
			for (const [groupIndex, conflict] of conflicts.entries()) if (conflict) context.addIssue({
				code: "custom",
				message: "ordered events cannot also be declared unordered",
				path: [
					"language",
					"unordered_groups",
					groupIndex
				]
			});
		};
		validatePartialOrderRelations = (ids, language, adjacency, graph, unorderedGroups, notBeforePairs, context) => {
			let missingPairCount = 0;
			let firstMissingPair = "";
			const groupConflicts = new Array(language.unordered_groups.length).fill(false);
			unorderedGroups.markDeclaredPairConflicts(notBeforePairs, groupConflicts);
			const notBeforeConflictFlags = new Uint8Array(language.not_before.length);
			const constraintsBySource = new Map();
			for (const [index, constraint] of language.not_before.entries()) {
				const indexes = constraintsBySource.get(constraint.event) ?? [];
				indexes.push(index);
				constraintsBySource.set(constraint.event, indexes);
			}
			for (const [leftIndex, leftId] of ids.entries()) {
				const forward = collectReachable(leftId, adjacency);
				const backward = collectReachable(leftId, graph.reverseAdjacency);
				for (const constraintIndex of constraintsBySource.get(leftId) ?? []) {
					const constraint = language.not_before[constraintIndex];
					if (constraint !== undefined && forward.has(constraint.anchor)) notBeforeConflictFlags[constraintIndex] = 1;
				}
				for (let rightIndex = leftIndex + 1; rightIndex < ids.length; rightIndex++) {
					const rightId = ids[rightIndex];
					if (rightId === undefined) continue;
					const sameEvent = leftId === rightId;
					const ordered = !sameEvent && (forward.has(rightId) || backward.has(rightId));
					const key = pairKey(leftId, rightId);
					const notBefore = notBeforePairs.has(key);
					const unordered = unorderedGroups.hasPair(leftId, rightId);
					if (ordered || notBefore) {
						if (!sameEvent) unorderedGroups.markSharedGroups(leftId, rightId, groupConflicts);
					}
					if (!ordered && !notBefore && !unordered) {
						if (missingPairCount === 0) firstMissingPair = `${leftId}/${rightId}`;
						missingPairCount++;
					}
				}
			}
			for (const [index, conflict] of notBeforeConflictFlags.entries()) if (conflict === 1) context.addIssue({
				code: "custom",
				message: "not-before constraint conflicts with happens-before order",
				path: [
					"language",
					"not_before",
					index
				]
			});
			addUnorderedConflictIssues(groupConflicts, context);
			if (missingPairCount > 0) context.addIssue({
				code: "custom",
				message: missingPairCount === 1 ? `event pair ${firstMissingPair} must be explicitly ordered or unordered` : `${String(missingPairCount)} event pairs must be explicitly ordered or unordered; first undeclared pair: ${firstMissingPair}`,
				path: ["language"]
			});
		};
		validatePartialOrder = (specification, context) => {
			if (specification.language.kind !== "partial_order") return;
			const ids = specification.events.map(({ id }) => id);
			const known = new Set(ids);
			const adjacency = buildAdjacency(specification.language, context, known);
			const graph = classifyGraph(ids, adjacency);
			if (graph.kind === "cyclic") context.addIssue({
				code: "custom",
				message: "happens-before graph must be acyclic",
				path: ["language"]
			});
			const notBeforePairs = validateNotBefore(specification.language, context, known);
			const unorderedGroups = validateUnorderedGroups(specification.language, context, known);
			if (graph.kind === "total-order") {
				validateTotalOrderRelations(specification.language, graph, unorderedGroups, notBeforePairs, context);
			} else if (graph.kind === "partial-order") {
				validatePartialOrderRelations(ids, specification.language, adjacency, graph, unorderedGroups, notBeforePairs, context);
			}
			for (const [kind, values] of [["prefix", specification.language.prefix], ["suffix", specification.language.suffix]]) for (const [index, id] of values.entries()) addReferenceIssue(context, known, id, [
				"language",
				kind,
				index
			]);
		};
		countVariantEvents = (trace) => {
			const counts = new Map();
			for (const token of trace) for (const id of typeof token === "string" ? [token] : token.unordered) counts.set(id, (counts.get(id) ?? 0) + 1);
			return counts;
		};
		finiteTraceKey = (trace) => canonicalTraceJson(trace.flatMap((token) => {
			if (typeof token === "string") return [token];
			const members = [...token.unordered].sort();
			return members[0] === members.at(-1) ? members : [members];
		}));
		validateFiniteTraces = (specification, context) => {
			if (specification.language.kind !== "finite_traces") return;
			const known = new Set(specification.events.map(({ id }) => id));
			const variantIds = new Set();
			const variantTraces = new Set();
			for (const [variantIndex, variant] of specification.language.variants.entries()) {
				const variantPath = [
					"language",
					"variants",
					variantIndex
				];
				if (variantIds.has(variant.id)) context.addIssue({
					code: "custom",
					message: "finite trace variant ids must be unique",
					path: [...variantPath, "id"]
				});
				variantIds.add(variant.id);
				const traceKey = finiteTraceKey(variant.trace);
				if (variantTraces.has(traceKey)) context.addIssue({
					code: "custom",
					message: "finite trace variants must not duplicate a trace",
					path: [...variantPath, "trace"]
				});
				variantTraces.add(traceKey);
				for (const [tokenIndex, token] of variant.trace.entries()) {
					const values = typeof token === "string" ? [token] : token.unordered;
					for (const [eventIndex, id] of values.entries()) addReferenceIssue(context, known, id, [
						...variantPath,
						"trace",
						tokenIndex,
						...typeof token === "string" ? [] : ["unordered", eventIndex]
					]);
				}
				const counts = countVariantEvents(variant.trace);
				for (const event of specification.events) {
					const [minimum, maximum] = processTraceCardinalityBounds(event.cardinality);
					const count = counts.get(event.id) ?? 0;
					if (count < minimum || count > maximum) context.addIssue({
						code: "custom",
						message: `variant ${variant.id} violates ${event.id} cardinality`,
						path: [...variantPath, "trace"]
					});
				}
			}
		};
		processTraceSpecificationSchema = specificationShapeSchema.superRefine((specification, context) => {
			const ids = new Set();
			const predicates = new Set();
			const ignoredFieldsBySource = new Map();
			for (const [index, event] of specification.events.entries()) {
				if (ids.has(event.id)) context.addIssue({
					code: "custom",
					message: "event ids must be unique",
					path: [
						"events",
						index,
						"id"
					]
				});
				ids.add(event.id);
				const ignoredFields = [...event.ignore_fields ?? []].sort();
				if (ignoredFields.length > 0 && (typeof event.exact !== "object" || event.exact === null || Array.isArray(event.exact))) context.addIssue({
					code: "custom",
					message: "ignored schedule fields require an exact object payload",
					path: [
						"events",
						index,
						"ignore_fields"
					]
				});
				const ignoredKey = canonicalTraceJson(ignoredFields);
				const priorIgnoredKey = ignoredFieldsBySource.get(event.source);
				if (priorIgnoredKey !== undefined && priorIgnoredKey !== ignoredKey) context.addIssue({
					code: "custom",
					message: "events from one source must use the same ignored schedule fields",
					path: [
						"events",
						index,
						"ignore_fields"
					]
				});
				ignoredFieldsBySource.set(event.source, ignoredKey);
				if (ignoredFields.some((field) => isRecord(event.exact) && field in event.exact)) context.addIssue({
					code: "custom",
					message: "exact payload must omit every ignored schedule field",
					path: [
						"events",
						index,
						"exact"
					]
				});
				const predicate = `${event.source}\0${canonicalTraceJson(comparableProcessObservationPayload(event.exact, ignoredFields))}`;
				if (predicates.has(predicate)) context.addIssue({
					code: "custom",
					message: "exact event predicates must not overlap",
					path: ["events", index]
				});
				predicates.add(predicate);
			}
			validatePartialOrder(specification, context);
			validateFiniteTraces(specification, context);
		});
	})))();
}

//#endregion
//#region dist/domain/process/processTraceEvaluation.js
var matchedEventSchema, sideResultShape, sideResultSchema, diagnosticSchema, processTraceComparisonResultSchema, scopesFor, unknownSide, failure, finiteTraceOmissions, evaluateFiniteTrace, collectRecords, matchRecords, cardinalityFailure, evaluateOrderingConstraints, boundaryFailure, evaluatePartialOrder, evaluateMatchedTrace, evaluateProcessTraceSide;
function init_processTraceEvaluation() {
	return (init_processTraceEvaluation = __esmMin((() => {
		init_processCaptureCoverage();
		init_processObservation();
		init_processTraceSpecification();
		matchedEventSchema = z.strictObject({
			event_id: processTraceIdentifierSchema,
			location: processObservationLocationSchema
		});
		sideResultShape = {
			satisfied_constraints: z.array(z.string()),
			raw_trace: z.array(matchedEventSchema)
		};
		sideResultSchema = z.union([z.strictObject({
			...sideResultShape,
			status: z.literal("pass"),
			matched_variant: processTraceIdentifierSchema.nullable()
		}), z.strictObject({
			...sideResultShape,
			status: z.enum(["fail", "unknown"]),
			matched_variant: z.null()
		})]);
		diagnosticSchema = z.strictObject({
			kind: z.enum([
				"journal",
				"predicate",
				"cardinality",
				"edge",
				"prefix",
				"suffix",
				"trace"
			]),
			side: z.enum(["left", "right"]),
			message: z.string(),
			event_ids: z.array(processTraceIdentifierSchema),
			locations: z.array(processObservationLocationSchema)
		});
		processTraceComparisonResultSchema = z.strictObject({
			verdict: z.enum([
				"equivalent",
				"different",
				"nonconforming",
				"unknown"
			]),
			left: sideResultSchema,
			right: sideResultSchema,
			diagnostic: diagnosticSchema.nullable()
		});
		scopesFor = (sources) => new Set([...sources].map((source) => {
			if (source.startsWith("terminal_")) return "terminal";
			if (source === "lifecycle") return "exit";
			if (source === "filesystem") return "filesystem";
			if (source === "process") return "process";
			return "interaction";
		}));
		unknownSide = (rawTrace = []) => ({
			status: "unknown",
			matched_variant: null,
			satisfied_constraints: [],
			raw_trace: rawTrace
		});
		failure = (input) => ({
			result: {
				status: "fail",
				matched_variant: null,
				satisfied_constraints: [],
				raw_trace: input.rawTrace
			},
			diagnostic: {
				kind: input.kind,
				message: input.message,
				event_ids: [...input.eventIds],
				locations: [...input.locations]
			}
		});
		finiteTraceOmissions = (ids, tokens) => {
			let observed = 0;
			const missing = [];
			for (const token of tokens) {
				const remaining = new Map();
				for (const id of typeof token === "string" ? [token] : token.unordered) remaining.set(id, (remaining.get(id) ?? 0) + 1);
				while (observed < ids.length) {
					const id = ids[observed];
					const count = id === undefined ? 0 : remaining.get(id) ?? 0;
					if (id === undefined || count === 0) break;
					if (count === 1) remaining.delete(id);
					else remaining.set(id, count - 1);
					observed++;
				}
				for (const [id, count] of remaining) for (let index = 0; index < count; index++) missing.push(id);
			}
			return observed === ids.length && missing.length > 0 ? missing : undefined;
		};
		evaluateFiniteTrace = (ids, language) => {
			let bestPrefix = -1;
			const bestEventIds = new Set();
			const bestLocationIndexes = new Set();
			const recordMismatch = (offset, missing, unexpected) => {
				if (offset > bestPrefix) {
					bestPrefix = offset;
					bestEventIds.clear();
					bestLocationIndexes.clear();
				}
				if (offset !== bestPrefix) return;
				for (const eventId of missing) bestEventIds.add(eventId);
				for (const { id, index } of unexpected) {
					bestEventIds.add(id);
					bestLocationIndexes.add(index);
				}
			};
			for (const variant of language.variants) {
				let offset = 0;
				let mismatched = false;
				for (const token of variant.trace) {
					const expected = typeof token === "string" ? [token] : token.unordered;
					const actual = ids.slice(offset, offset + expected.length);
					const remaining = new Map();
					for (const eventId of expected) remaining.set(eventId, (remaining.get(eventId) ?? 0) + 1);
					const unexpected = [];
					for (const [index, eventId] of actual.entries()) {
						const count = remaining.get(eventId) ?? 0;
						if (count === 0) unexpected.push({
							id: eventId,
							index: offset + index
						});
						else if (count === 1) remaining.delete(eventId);
						else remaining.set(eventId, count - 1);
					}
					const missing = [...remaining].flatMap(([eventId, count]) => Array.from({ length: count }, () => eventId));
					if (missing.length > 0 || unexpected.length > 0 || actual.length < expected.length) {
						const omitted = finiteTraceOmissions(ids, variant.trace);
						recordMismatch(offset, omitted ?? missing, omitted === undefined ? unexpected : []);
						mismatched = true;
						break;
					}
					offset += expected.length;
				}
				if (mismatched) continue;
				if (offset === ids.length) return {
					status: "pass",
					variant: variant.id
				};
				const unexpected = ids[offset];
				recordMismatch(offset, [], unexpected === undefined ? [] : [{
					id: unexpected,
					index: offset
				}]);
			}
			return {
				status: "fail",
				eventIds: [...bestEventIds],
				locationIndexes: [...bestLocationIndexes]
			};
		};
		collectRecords = (capture, sources) => {
			const records = [];
			for (const location of capture.event_journal) {
				const record = projectProcessObservation(capture, location);
				if (record !== null && sources.has(record.source)) records.push({
					source: record.source,
					payload: record.payload,
					location
				});
			}
			return records;
		};
		matchRecords = (records, specification) => {
			const rawTrace = [];
			const locationsById = new Map();
			const ignoredFieldsBySource = new Map();
			const eventsByKey = new Map();
			for (const event of specification.events) {
				const ignoredFields = event.ignore_fields ?? [];
				ignoredFieldsBySource.set(event.source, ignoredFields);
				eventsByKey.set(`${event.source}\0${canonicalTraceJson(comparableProcessObservationPayload(event.exact, ignoredFields))}`, event);
			}
			for (const record of records) {
				const match = eventsByKey.get(`${record.source}\0${canonicalTraceJson(comparableProcessObservationPayload(record.payload, ignoredFieldsBySource.get(record.source)))}`);
				if (match === undefined) return failure({
					kind: "predicate",
					message: "Observed event does not match any declared exact predicate.",
					eventIds: [],
					locations: [record.location],
					rawTrace
				});
				rawTrace.push({
					event_id: match.id,
					location: record.location
				});
				const locations = locationsById.get(match.id) ?? [];
				locations.push(record.location);
				locationsById.set(match.id, locations);
			}
			return {
				rawTrace,
				locationsById
			};
		};
		cardinalityFailure = (trace, specification) => {
			for (const event of specification.events) {
				const [minimum, maximum] = processTraceCardinalityBounds(event.cardinality);
				const locations = trace.locationsById.get(event.id) ?? [];
				if (locations.length < minimum || locations.length > maximum) return failure({
					kind: "cardinality",
					message: `${event.id} observed ${String(locations.length)} times; expected ${String(minimum)}..${String(maximum)}.`,
					eventIds: [event.id],
					locations,
					rawTrace: trace.rawTrace
				});
			}
			return null;
		};
		evaluateOrderingConstraints = (trace, language) => {
			const satisfied = [];
			const failures = [];
			for (const edge of language.happens_before) {
				const before = trace.locationsById.get(edge.before) ?? [];
				const after = trace.locationsById.get(edge.after) ?? [];
				const lastBefore = before.at(-1);
				const firstAfter = after[0];
				if (lastBefore === undefined && firstAfter !== undefined) failures.push({
					kind: "edge",
					message: `${edge.before} is required when ${edge.after} occurs.`,
					eventIds: [edge.before, edge.after],
					locations: [firstAfter],
					rawTrace: trace.rawTrace
				});
				else if (lastBefore !== undefined && firstAfter !== undefined && lastBefore.capture_order >= firstAfter.capture_order) failures.push({
					kind: "edge",
					message: `${edge.before} must happen before ${edge.after}.`,
					eventIds: [edge.before, edge.after],
					locations: [lastBefore, firstAfter],
					rawTrace: trace.rawTrace
				});
				else satisfied.push(`happens_before:${edge.before}:${edge.after}`);
			}
			for (const constraint of language.not_before) {
				const events = trace.locationsById.get(constraint.event) ?? [];
				const anchors = trace.locationsById.get(constraint.anchor) ?? [];
				const firstEvent = events[0];
				const firstAnchor = anchors[0];
				if (firstEvent !== undefined && firstAnchor === undefined) failures.push({
					kind: "edge",
					message: `${constraint.anchor} is required when ${constraint.event} occurs.`,
					eventIds: [constraint.event, constraint.anchor],
					locations: [firstEvent],
					rawTrace: trace.rawTrace
				});
				else if (firstEvent !== undefined && firstAnchor !== undefined && firstEvent.capture_order < firstAnchor.capture_order) failures.push({
					kind: "edge",
					message: `${constraint.event} must not occur before ${constraint.anchor}.`,
					eventIds: [constraint.event, constraint.anchor],
					locations: [firstEvent, firstAnchor],
					rawTrace: trace.rawTrace
				});
				else satisfied.push(`not_before:${constraint.event}:${constraint.anchor}`);
			}
			if (failures.length === 0) return {
				failure: null,
				satisfied
			};
			const unique = (values, key) => [...new Map(values.map((value) => [key(value), value])).values()];
			return {
				failure: failure({
					kind: "edge",
					message: failures.map(({ message }) => message).join(" "),
					eventIds: unique(failures.flatMap(({ eventIds }) => eventIds), String),
					locations: unique(failures.flatMap(({ locations }) => locations), ({ collection, index }) => `${collection}:${String(index)}`),
					rawTrace: trace.rawTrace
				}),
				satisfied
			};
		};
		boundaryFailure = (trace, kind, expected) => {
			const ids = trace.rawTrace.map(({ event_id }) => event_id);
			const actual = kind === "prefix" ? ids.slice(0, expected.length) : expected.length === 0 ? [] : ids.slice(-expected.length);
			if (canonicalTraceJson(actual) === canonicalTraceJson(expected)) return null;
			const locations = kind === "prefix" ? trace.rawTrace.slice(0, expected.length) : trace.rawTrace.slice(-expected.length);
			return failure({
				kind,
				message: `Observed trace does not satisfy the declared ${kind}.`,
				eventIds: expected,
				locations: locations.map(({ location }) => location),
				rawTrace: trace.rawTrace
			});
		};
		evaluatePartialOrder = (trace, language) => {
			const ordering = evaluateOrderingConstraints(trace, language);
			if (ordering.failure !== null) return ordering.failure;
			const prefixFailure = boundaryFailure(trace, "prefix", language.prefix);
			if (prefixFailure !== null) return prefixFailure;
			const suffixFailure = boundaryFailure(trace, "suffix", language.suffix);
			if (suffixFailure !== null) return suffixFailure;
			const satisfied = ordering.satisfied;
			satisfied.push(...language.unordered_groups.map(({ events }) => `unordered:${events.join(":")}`));
			if (language.prefix.length > 0) satisfied.push(`prefix:${language.prefix.join(":")}`);
			if (language.suffix.length > 0) satisfied.push(`suffix:${language.suffix.join(":")}`);
			return {
				result: {
					status: "pass",
					matched_variant: null,
					satisfied_constraints: satisfied,
					raw_trace: trace.rawTrace
				},
				diagnostic: null
			};
		};
		evaluateMatchedTrace = (trace, specification) => {
			const invalidCardinality = cardinalityFailure(trace, specification);
			if (invalidCardinality !== null) return invalidCardinality;
			if (specification.language.kind === "partial_order") return evaluatePartialOrder(trace, specification.language);
			const ids = trace.rawTrace.map(({ event_id }) => event_id);
			const evaluation = evaluateFiniteTrace(ids, specification.language);
			return evaluation.status === "fail" ? failure({
				kind: "trace",
				message: "Observed events do not match any finite trace variant.",
				eventIds: evaluation.eventIds,
				locations: evaluation.locationIndexes.flatMap((index) => {
					const location = trace.rawTrace[index]?.location;
					return location === undefined ? [] : [location];
				}),
				rawTrace: trace.rawTrace
			}) : {
				result: {
					status: "pass",
					matched_variant: evaluation.variant,
					satisfied_constraints: [`variant:${evaluation.variant}`],
					raw_trace: trace.rawTrace
				},
				diagnostic: null
			};
		};
		evaluateProcessTraceSide = (capture, specification) => {
			const sources = new Set(specification.events.map(({ source }) => source));
			const relevantScopes = scopesFor(sources);
			const incomplete = [...sources].some((source) => processSourceTruncated(capture, source)) || capture.residual_unknowns.some(({ scope }) => relevantScopes.has(scope));
			if (capture.event_journal.length === 0) return {
				result: unknownSide(),
				diagnostic: {
					kind: "journal",
					message: "Capture has no cross-source event journal.",
					event_ids: [],
					locations: []
				}
			};
			const matched = matchRecords(collectRecords(capture, sources), specification);
			if (incomplete) return {
				result: unknownSide("rawTrace" in matched ? matched.rawTrace : matched.result.raw_trace),
				diagnostic: null
			};
			return "rawTrace" in matched ? evaluateMatchedTrace(matched, specification) : matched;
		};
	})))();
}

//#endregion
//#region dist/domain/process/processTraceDimensionProjection.js
var dimensionsForTraceSources, traceCoversObservedDimension;
function init_processTraceDimensionProjection() {
	return (init_processTraceDimensionProjection = __esmMin((() => {
		init_processCaptureCoverage();
		dimensionsForTraceSources = (sources) => {
			const dimensions = new Set();
			for (const source of sources) {
				if (source.startsWith("terminal_")) dimensions.add("terminal");
				else if (source === "interaction") dimensions.add("interaction");
				else if (source === "lifecycle") dimensions.add("exit");
				else if (source === "filesystem") dimensions.add("filesystem");
				else if (source === "process") dimensions.add("process");
			}
			return dimensions;
		};
		traceCoversObservedDimension = (dimension, sources, left, right) => {
			const any = (leftValues, rightValues) => leftValues.length > 0 || rightValues.length > 0;
			switch (dimension) {
				case "terminal": return (!(any(left.frames, right.frames) || processSourceTruncated(left, "terminal_raw") || processSourceTruncated(right, "terminal_raw")) || sources.has("terminal_raw")) && (!(any(left.rendered_frames, right.rendered_frames) || processSourceTruncated(left, "terminal_rendered") || processSourceTruncated(right, "terminal_rendered")) || sources.has("terminal_rendered"));
				case "interaction": return sources.has("interaction");
				case "exit": return sources.has("lifecycle");
				case "filesystem": return sources.has("filesystem");
				case "process": return sources.has("process");
			}
		};
	})))();
}

//#endregion
//#region dist/domain/process/processTraceComparison.js
var evaluateProcessTraceComparison, processTraceOutcomesDiffer;
function init_processTraceComparison() {
	return (init_processTraceComparison = __esmMin((() => {
		init_processTraceEvaluation();
		init_processTraceSpecification();
		evaluateProcessTraceComparison = (left, right, specificationInput) => {
			const specification = processTraceSpecificationSchema.parse(specificationInput);
			const leftEvaluation = evaluateProcessTraceSide(left, specification);
			const rightEvaluation = evaluateProcessTraceSide(right, specification);
			const diagnostic = leftEvaluation.diagnostic === null ? rightEvaluation.diagnostic === null ? null : {
				side: "right",
				...rightEvaluation.diagnostic
			} : {
				side: "left",
				...leftEvaluation.diagnostic
			};
			const outcomesDiffer = processTraceOutcomesDiffer({
				left: leftEvaluation.result,
				right: rightEvaluation.result
			});
			const result = processTraceComparisonResultSchema.parse({
				verdict: leftEvaluation.result.status === "unknown" || rightEvaluation.result.status === "unknown" ? "unknown" : leftEvaluation.result.status === "pass" && rightEvaluation.result.status === "pass" ? "equivalent" : outcomesDiffer ? "different" : "nonconforming",
				left: leftEvaluation.result,
				right: rightEvaluation.result,
				diagnostic
			});
			return {
				result,
				diagnostics: [leftEvaluation.diagnostic, rightEvaluation.diagnostic].filter((value) => value !== null)
			};
		};
		processTraceOutcomesDiffer = (comparison) => comparison.left.status !== comparison.right.status || comparison.left.raw_trace.length !== comparison.right.raw_trace.length || comparison.left.raw_trace.some(({ event_id }, index) => event_id !== comparison.right.raw_trace[index]?.event_id);
	})))();
}

//#endregion
//#region dist/domain/process/processComparison.js
var OPERATION$3, DIFFERING_FIELD_LIMIT, comparisonStatusSchema, PROCESS_COMPARISON_DIMENSIONS, deriveProcessComparisonStatus, processCaptureComparisonSchema, rawTerminalObservations, renderedTerminalObservations, terminalObservations, sameJsonValue, containerEntries, differingFieldPaths, exitComparisonObservation, processDimensionObservations, comparableProcessDimensionObservations, classifyCollection, hasUnknown, hasUnknownFilesystemEffects, checkpointProvesAbsence, hasKnownFilesystemDifference, EVENT_TIME_FIELD, eventTime, firstCollectionDivergence, firstTerminalDivergence, chooseFirstDivergence, CAPTURE_LOCAL_TIMING_FIELDS, includesCaptureLocalTiming, explicitlyTimedSources, timedProcessDimensionObservations, assertComparable, differingContractFields, LOCATION_SOURCES, applyTraceVerdict, compareDimensions$1, compareProcessCaptures;
function init_processComparison() {
	return (init_processComparison = __esmMin((() => {
		init_processCaptureCoverage();
		init_processObservation();
		init_analysisErrorCore();
		init_jsonValue();
		init_processTraceEvaluation();
		init_processTraceDimensionProjection();
		init_processTraceComparison();
		OPERATION$3 = "compare_process_captures";
		DIFFERING_FIELD_LIMIT = 8;
		comparisonStatusSchema = z.enum([
			"unchanged",
			"added",
			"removed",
			"changed",
			"truncated",
			"unknown",
			"contradiction"
		]);
		PROCESS_COMPARISON_DIMENSIONS = [
			"terminal",
			"interaction",
			"exit",
			"filesystem",
			"process"
		];
		deriveProcessComparisonStatus = (dimensions) => {
			if (dimensions.includes("truncated")) return "truncated";
			if (dimensions.includes("contradiction")) return "contradiction";
			if (dimensions.some((status) => [
				"changed",
				"added",
				"removed"
			].includes(status))) return "changed";
			return dimensions.includes("unknown") ? "unknown" : "unchanged";
		};
		processCaptureComparisonSchema = z.object({
			status: comparisonStatusSchema,
			terminal: comparisonStatusSchema,
			interaction: comparisonStatusSchema,
			exit: comparisonStatusSchema,
			filesystem: comparisonStatusSchema,
			process: comparisonStatusSchema,
			first_divergence: z.discriminatedUnion("status", [
				z.object({ status: z.literal("none") }),
				z.object({
					status: z.literal("unknown"),
					reason: z.string()
				}),
				z.object({
					status: z.literal("found"),
					dimension: z.enum(PROCESS_COMPARISON_DIMENSIONS),
					index: z.int().nonnegative(),
					left_at_ms: z.int().nonnegative().nullable(),
					right_at_ms: z.int().nonnegative().nullable(),
					fields: z.array(z.string().min(1)).max(DIFFERING_FIELD_LIMIT).optional().describe("Sorted names of the fields the selected projection compared and that differ, with array positions as bracketed indices and `$` for a whole observation. Bounded to eight names; `left` and `right` retain the complete observations."),
					left: jsonValueSchema.nullable(),
					right: jsonValueSchema.nullable()
				})
			]),
			trace: processTraceComparisonResultSchema.optional(),
			limitations: z.array(z.string())
		}).superRefine((comparison, context) => {
			const expected = deriveProcessComparisonStatus(PROCESS_COMPARISON_DIMENSIONS.map((dimension) => comparison[dimension]));
			if (comparison.status !== expected) context.addIssue({
				code: "custom",
				message: "Process comparison status contradicts its dimensions",
				path: ["status"],
				params: { constraint: "status-matches-dimensions" }
			});
		});
		rawTerminalObservations = (capture) => capture.frames.map((frame) => ({
			kind: "raw",
			...comparableTerminalFrame(frame)
		}));
		renderedTerminalObservations = (capture) => capture.rendered_frames.map((frame) => ({
			kind: "rendered",
			...frame
		}));
		terminalObservations = (capture) => [...rawTerminalObservations(capture), ...renderedTerminalObservations(capture)];
		sameJsonValue = (left, right) => {
			const encodedLeft = canonicalize(left);
			return encodedLeft !== undefined && encodedLeft === canonicalize(right);
		};
		containerEntries = (value) => Array.isArray(value) ? value.map((_entry, index) => String(index)) : value !== null && typeof value === "object" ? Object.keys(value) : null;
		differingFieldPaths = (left, right) => {
			const output = [];
			const walk = (leftValue, rightValue, path) => {
				if (output.length >= DIFFERING_FIELD_LIMIT) return;
				if (sameJsonValue(leftValue, rightValue)) return;
				const leftKeys = containerEntries(leftValue);
				const rightKeys = containerEntries(rightValue);
				if (leftKeys === null || rightKeys === null || Array.isArray(leftValue) !== Array.isArray(rightValue)) {
					output.push(path.length === 0 ? "$" : path);
					return;
				}
				for (const key of [...new Set([...leftKeys, ...rightKeys])].sort()) walk(Reflect.get(leftValue, key), Reflect.get(rightValue, key), Array.isArray(leftValue) ? `${path}[${key}]` : path.length === 0 ? key : `${path}.${key}`);
			};
			walk(left, right, "");
			return output.sort();
		};
		exitComparisonObservation = (capture, ignoredFields) => comparableProcessObservationPayload({
			...capture.exit,
			settlement: comparableProcessObservationPayload(capture.settlement, ignoredFields)
		}, ignoredFields);
		processDimensionObservations = (capture, dimension) => {
			switch (dimension) {
				case "terminal": return terminalObservations(capture);
				case "interaction": return capture.interaction_events;
				case "exit": return [exitComparisonObservation(capture)];
				case "filesystem": return capture.filesystem_checkpoints;
				case "process": return capture.process_samples;
			}
		};
		comparableProcessDimensionObservations = (capture, dimension) => {
			switch (dimension) {
				case "terminal": return [...capture.frames.map(({ sequence, data }) => ({
					kind: "raw",
					sequence,
					data
				})), ...capture.rendered_frames.map(({ at_ms: _atMs, ...frame }) => ({
					kind: "rendered",
					...frame
				}))];
				case "interaction": return capture.interaction_events.map(({ dispatched_at_ms: _dispatchedAtMs, ...event }) => event);
				case "exit": {
					const { finalization, ...exit } = capture.exit;
					const { elapsed_ms: _settlementElapsedMs, ...settlement } = capture.settlement;
					return [{
						...exit,
						...finalization === undefined ? {} : { finalization: {
							requested_ms: finalization.requested_ms,
							exit_code: finalization.exit_code,
							signals: finalization.signals.map(({ sent_at_ms: _sentAtMs, ...signal }) => signal)
						} },
						settlement
					}];
				}
				case "filesystem": return capture.filesystem_checkpoints.map(({ at_ms: _atMs, ...checkpoint }) => checkpoint);
				case "process": return capture.process_samples.map(({ at_ms: _atMs, ...sample }) => sample);
			}
		};
		classifyCollection = (left, right) => {
			if (sameJsonValue(left, right)) return "unchanged";
			if (left.length === 0) return "added";
			if (right.length === 0) return "removed";
			return "changed";
		};
		hasUnknown = (capture, scope) => capture.residual_unknowns.some((item) => item.scope === scope);
		hasUnknownFilesystemEffects = (capture) => capture.filesystem_effects.some(({ status }) => status === "unknown") || capture.filesystem_checkpoints.some(({ effects }) => effects.some(({ status }) => status === "unknown"));
		checkpointProvesAbsence = (capture, checkpoint, path, files) => {
			const colon = path.indexOf(":");
			if (colon < 1) return false;
			const root = `${path.slice(0, colon)}:.`;
			const coverage = checkpoint.name === "before" ? capture.truncation_details.filesystem_before : checkpoint.name === "after_settlement" ? capture.truncation_details.filesystem_after : undefined;
			if (coverage === undefined || coverage.enumeration_truncated || coverage.unobserved_subtrees === undefined || files.get(root)?.type !== "directory") return false;
			return !coverage.unobserved_subtrees.some(({ path: subtree, reason }) => subtree === root ? path !== root : path.startsWith(`${subtree}/`) || path.startsWith(`${subtree}\\`) || reason === "observer_owned" && path === subtree);
		};
		hasKnownFilesystemDifference = (left, right) => left.filesystem_checkpoints.some((checkpoint) => {
			const peer = right.filesystem_checkpoints.find(({ name }) => name === checkpoint.name);
			if (peer === undefined) return false;
			const files = new Map(peer.files.map((file) => [file.path, file]));
			return checkpoint.files.some((file) => {
				const other = files.get(file.path);
				if (other === undefined) return checkpointProvesAbsence(right, peer, file.path, files);
				if (file.type !== other.type || file.mode !== other.mode || file.size !== other.size) return true;
				if (file.type === "file" && other.type === "file") return file.sha256 !== null && other.sha256 !== null && file.sha256 !== other.sha256;
				if (file.type === "symlink" && other.type === "symlink") return file.symlink_target_hex !== other.symlink_target_hex;
				return false;
			});
		}) || right.filesystem_checkpoints.some((checkpoint) => {
			const peer = left.filesystem_checkpoints.find(({ name }) => name === checkpoint.name);
			if (peer === undefined) return false;
			const files = new Map(peer.files.map((file) => [file.path, file]));
			return checkpoint.files.some(({ path }) => !files.has(path) && checkpointProvesAbsence(left, peer, path, files));
		});
		EVENT_TIME_FIELD = {
			terminal: "at_ms",
			interaction: "dispatched_at_ms",
			exit: "at_ms",
			filesystem: "at_ms",
			process: "at_ms"
		};
		eventTime = (dimension, value) => {
			if (typeof value !== "object" || value === null) return null;
			const time = Reflect.get(value, EVENT_TIME_FIELD[dimension]);
			return typeof time === "number" && Number.isSafeInteger(time) && time >= 0 ? time : null;
		};
		firstCollectionDivergence = (dimension, leftComparable, rightComparable, leftObserved, rightObserved) => {
			const length = Math.max(leftComparable.length, rightComparable.length);
			for (let index = 0; index < length; index += 1) {
				const leftComparisonValue = leftComparable[index] ?? null;
				const rightComparisonValue = rightComparable[index] ?? null;
				if (sameJsonValue(leftComparisonValue, rightComparisonValue)) continue;
				const leftValue = leftObserved[index] ?? null;
				const rightValue = rightObserved[index] ?? null;
				return {
					status: "found",
					dimension,
					index,
					left_at_ms: eventTime(dimension, leftValue),
					right_at_ms: eventTime(dimension, rightValue),
					fields: [...differingFieldPaths(leftComparisonValue, rightComparisonValue)],
					left: jsonValueSchema.parse(leftValue),
					right: jsonValueSchema.parse(rightValue)
				};
			}
			return null;
		};
		firstTerminalDivergence = (left, right, timedSources) => {
			const leftRaw = rawTerminalObservations(left);
			const rightRaw = rawTerminalObservations(right);
			const leftRendered = renderedTerminalObservations(left);
			const rightRendered = renderedTerminalObservations(right);
			const semanticRaw = (capture) => capture.frames.map(({ sequence, data }) => ({
				kind: "raw",
				sequence,
				data
			}));
			const semanticRendered = (capture) => capture.rendered_frames.map(({ at_ms: _atMs, ...frame }) => ({
				kind: "rendered",
				...frame
			}));
			const candidate = chooseFirstDivergence([firstCollectionDivergence("terminal", timedSources?.has("terminal_raw") === true ? leftRaw : semanticRaw(left), timedSources?.has("terminal_raw") === true ? rightRaw : semanticRaw(right), leftRaw, rightRaw), firstCollectionDivergence("terminal", timedSources?.has("terminal_rendered") === true ? leftRendered : semanticRendered(left), timedSources?.has("terminal_rendered") === true ? rightRendered : semanticRendered(right), leftRendered, rightRendered)]);
			return candidate.status === "found" ? candidate : null;
		};
		chooseFirstDivergence = (candidates) => {
			const found = candidates.filter((candidate) => candidate !== null);
			return found.sort((left, right) => {
				const leftTime = Math.min(left.left_at_ms ?? Number.MAX_SAFE_INTEGER, left.right_at_ms ?? Number.MAX_SAFE_INTEGER);
				const rightTime = Math.min(right.left_at_ms ?? Number.MAX_SAFE_INTEGER, right.right_at_ms ?? Number.MAX_SAFE_INTEGER);
				return leftTime - rightTime;
			})[0] ?? { status: "none" };
		};
		CAPTURE_LOCAL_TIMING_FIELDS = new Set([
			"at_ms",
			"dispatched_at_ms",
			"elapsed_ms",
			"sent_at_ms"
		]);
		includesCaptureLocalTiming = (value) => {
			if (typeof value !== "object" || value === null) return false;
			if (Array.isArray(value)) return value.some(includesCaptureLocalTiming);
			return Object.entries(value).some(([field, nested]) => CAPTURE_LOCAL_TIMING_FIELDS.has(field) || includesCaptureLocalTiming(nested));
		};
		explicitlyTimedSources = (specification) => new Map(specification?.events.flatMap((event) => {
			const exact = comparableProcessObservationPayload(event.exact, event.ignore_fields);
			return includesCaptureLocalTiming(exact) ? [[event.source, event.ignore_fields]] : [];
		}));
		timedProcessDimensionObservations = (capture, dimension, observed, timedSources) => {
			if (dimension === "exit") return [exitComparisonObservation(capture, timedSources.get("lifecycle"))];
			if (dimension !== "interaction") return observed;
			const ignoredFields = timedSources.get("interaction");
			return ignoredFields === undefined ? observed : observed.map((value) => comparableProcessObservationPayload(value, ignoredFields));
		};
		assertComparable = (left, right, options) => {
			if (left.manifest.comparison_contract_sha256 !== right.manifest.comparison_contract_sha256) {
				const fields = differingContractFields(left.manifest.comparison_contract, right.manifest.comparison_contract);
				throw new AnalysisInputError(OPERATION$3, undefined, [{
					path: ["right"],
					reason: "invalid_value",
					message: `Process captures have incompatible comparison contracts${fields.length === 0 ? "" : `; these scenario fields differ: ${fields.join(", ")}`}. Capture both scenarios with the same values for these fields, then compare them.`,
					expected: fields
				}]);
			}
			if (options.maxCaptureAgeMs === undefined) return;
			const maxCaptureAgeMs = options.maxCaptureAgeMs;
			const now = Date.now();
			const stale = [["left", left], ["right", right]].flatMap(([side, { manifest }]) => {
				const age = now - Date.parse(manifest.completed_at);
				return age > maxCaptureAgeMs ? [`${side} completed at ${manifest.completed_at} (${String(age)} ms ago)`] : [];
			});
			if (stale.length > 0) throw new AnalysisInputError(OPERATION$3, undefined, [{
				path: ["max_capture_age_ms"],
				reason: "out_of_range",
				message: `Process capture exceeds max_capture_age_ms ${String(maxCaptureAgeMs)}: ${stale.join("; ")}. Recapture the stale scenario or raise max_capture_age_ms.`
			}]);
		};
		differingContractFields = (left, right) => [...new Set([...Object.keys(left), ...Object.keys(right)])].filter((field) => !Object.hasOwn(left, field) || !Object.hasOwn(right, field) || canonicalize(left[field]) !== canonicalize(right[field])).sort();
		LOCATION_SOURCES = {
			frames: "terminal_raw",
			rendered_frames: "terminal_rendered",
			interaction_events: "interaction",
			lifecycle: "lifecycle",
			process_samples: "process",
			filesystem_checkpoints: "filesystem"
		};
		applyTraceVerdict = (dimensions, specification, evaluation, captures) => {
			const { result: trace, diagnostics } = evaluation;
			const traceShowsDifference = processTraceOutcomesDiffer(trace);
			const traceStatus = trace.verdict === "unknown" ? "unknown" : trace.verdict === "equivalent" || !traceShowsDifference ? "unchanged" : "changed";
			const sources = new Set(specification.events.map(({ source }) => source));
			const covered = dimensionsForTraceSources(sources);
			const diagnosticSources = new Set(diagnostics.flatMap((diagnostic) => [...specification.events.filter(({ id }) => diagnostic.event_ids.includes(id)).map(({ source }) => source), ...diagnostic.locations.map(({ collection }) => LOCATION_SOURCES[collection])]));
			const attributed = diagnosticSources.size > 0 ? dimensionsForTraceSources(diagnosticSources) : covered;
			const statusFor = (dimension) => {
				const exact = dimensions[dimension];
				if (!covered.has(dimension)) return exact;
				if (trace.verdict === "nonconforming") return exact;
				if (trace.verdict === "different") return traceShowsDifference && attributed.has(dimension) ? "changed" : exact;
				if (dimension === "filesystem" && captures.some(hasUnknownFilesystemEffects)) return exact;
				if (trace.verdict === "unknown" && [
					"changed",
					"added",
					"removed"
				].includes(exact)) return exact;
				return traceCoversObservedDimension(dimension, sources, captures[0], captures[1]) ? traceStatus : exact;
			};
			return {
				terminal: statusFor("terminal"),
				interaction: statusFor("interaction"),
				exit: statusFor("exit"),
				filesystem: statusFor("filesystem"),
				process: statusFor("process")
			};
		};
		compareDimensions$1 = (left, right, sameNormalization) => {
			const classify = (dimension, source) => !sameNormalization || hasUnknown(left, dimension) || hasUnknown(right, dimension) || dimension === "filesystem" && (hasUnknownFilesystemEffects(left) || hasUnknownFilesystemEffects(right)) && !hasKnownFilesystemDifference(left, right) || processSourceTruncated(left, source) || processSourceTruncated(right, source) ? "unknown" : classifyCollection(comparableProcessDimensionObservations(left, dimension), comparableProcessDimensionObservations(right, dimension));
			return {
				terminal: classify("terminal", "terminal_rendered"),
				interaction: classify("interaction", "interaction"),
				exit: hasUnknown(left, "exit") || hasUnknown(right, "exit") ? "unknown" : sameJsonValue(comparableProcessDimensionObservations(left, "exit"), comparableProcessDimensionObservations(right, "exit")) ? "unchanged" : "changed",
				filesystem: classify("filesystem", "filesystem"),
				process: classify("process", "process")
			};
		};
		compareProcessCaptures = (left, right, options = {}) => {
			assertComparable(left, right, options);
			const sameNormalization = sameJsonValue(left.normalization, right.normalization);
			const exactDimensions = compareDimensions$1(left, right, sameNormalization);
			const traceEvaluation = options.traceSpecification === undefined ? undefined : evaluateProcessTraceComparison(left, right, options.traceSpecification);
			const trace = traceEvaluation?.result;
			const dimensions = traceEvaluation === undefined || options.traceSpecification === undefined ? exactDimensions : applyTraceVerdict(exactDimensions, options.traceSpecification, traceEvaluation, [left, right]);
			const timedSources = explicitlyTimedSources(options.traceSpecification);
			const timedDimensions = dimensionsForTraceSources(new Set(timedSources.keys()));
			const ignoredInteractionFields = timedSources.get("interaction");
			const divergenceCandidates = PROCESS_COMPARISON_DIMENSIONS.map((dimension) => {
				if (dimensions[dimension] === "unknown") return null;
				const observedLeft = processDimensionObservations(left, dimension);
				const observedRight = processDimensionObservations(right, dimension);
				const timedCandidate = dimensions[dimension] === "changed" && timedDimensions.has(dimension) ? dimension === "terminal" ? firstTerminalDivergence(left, right, timedSources) : firstCollectionDivergence(dimension, timedProcessDimensionObservations(left, dimension, observedLeft, timedSources), timedProcessDimensionObservations(right, dimension, observedRight, timedSources), observedLeft, observedRight) : null;
				if (dimension === "interaction" && timedCandidate !== null && trace?.verdict === "different" && ignoredInteractionFields !== undefined && ignoredInteractionFields.length > 0) return timedCandidate;
				const semanticCandidate = dimension === "terminal" ? firstTerminalDivergence(left, right, null) : firstCollectionDivergence(dimension, comparableProcessDimensionObservations(left, dimension), comparableProcessDimensionObservations(right, dimension), observedLeft, observedRight);
				const firstCandidate = chooseFirstDivergence([semanticCandidate, timedCandidate]);
				return firstCandidate.status === "found" ? firstCandidate : null;
			});
			const observedFirstDivergence = chooseFirstDivergence(divergenceCandidates.map((candidate) => candidate !== null && trace?.verdict === "equivalent" && dimensions[candidate.dimension] === "unchanged" ? null : candidate));
			const firstDivergence = left.truncated || right.truncated ? {
				status: "unknown",
				reason: "Incomplete observations prevent locating the first divergence; unaffected dimensions retain their comparisons."
			} : hasUnknownFilesystemEffects(left) || hasUnknownFilesystemEffects(right) ? {
				status: "unknown",
				reason: "Unresolved filesystem effects prevent locating the first divergence, even when another change is observed."
			} : trace?.verdict === "equivalent" && deriveProcessComparisonStatus(PROCESS_COMPARISON_DIMENSIONS.map((dimension) => dimensions[dimension])) === "unchanged" ? { status: "none" } : observedFirstDivergence.status === "found" ? observedFirstDivergence : trace?.verdict === "different" || trace?.verdict === "unknown" ? {
				status: "unknown",
				reason: "The declared trace differs or has insufficient journal evidence; per-source observations cannot locate its first cross-source divergence."
			} : !sameNormalization || left.residual_unknowns.length > 0 || right.residual_unknowns.length > 0 ? {
				status: "unknown",
				reason: "Residual unknowns prevent proving that no divergence occurred."
			} : observedFirstDivergence;
			const observedStatus = deriveProcessComparisonStatus(PROCESS_COMPARISON_DIMENSIONS.map((dimension) => dimensions[dimension]));
			return {
				status: observedStatus,
				...dimensions,
				first_divergence: firstDivergence,
				...trace === undefined ? {} : { trace },
				limitations: [
					...left.limitations,
					...right.limitations,
					...left.residual_unknowns.map(({ reason }) => reason),
					...right.residual_unknowns.map(({ reason }) => reason),
					...sameNormalization ? [] : ["Capture normalization rules differ."]
				]
			};
		};
	})))();
}

//#endregion
//#region dist/domain/comparisonEvidenceResult.js
function readComparisonResult(evidence, operation) {
	if (operation === "compare_process_captures") {
		const parsed = readEvidencePayload(processCaptureComparisonSchema, evidence.normalized_result, { within: ["normalized_result"] });
		if (!parsed.ok) return parsed;
		return ok({
			operation,
			evidence,
			result: parsed.value
		});
	}
	if (operation === "compare_functions") {
		const parsed = readEvidencePayload(functionComparisonResultSchema, evidence.normalized_result, { within: ["normalized_result"] });
		if (!parsed.ok) return parsed;
		if (parsed.value.function_match.method === "same-evidence") {
			try {
				const { left, right } = comparisonSourceEvidenceSides(evidence);
				const sourceId = left[0];
				const sameSource = left.length === 1 && right.length === 1 && sourceId === right[0] && sourceId !== undefined && evidence.evidence_links.includes(sourceId) && parsed.value.dimensions.every(({ evidence_links }) => evidence_links.every((id) => id === sourceId));
				const impossibleChange = parsed.value.left_subject_sha256 !== parsed.value.right_subject_sha256 || parsed.value.dimensions.some((dimension) => dimension.status === "changed" || dimension.status === "unchanged" && dimension.left_digest !== dimension.right_digest);
				if (!sameSource || impossibleChange) return err(new EvidenceIntegrityError("Same-Evidence function comparison must cite the same source on both sides"));
			} catch (cause) {
				if (cause instanceof EvidenceIntegrityError) return err(cause);
				throw cause;
			}
		}
		const links = validateFindingLinks(evidence, parsed.value.dimensions.flatMap(({ evidence_links }) => evidence_links));
		if (!links.ok) return links;
		return ok({
			operation,
			evidence,
			result: parsed.value
		});
	}
	if (operation === "compare_web_screenshots") {
		const parsed = readEvidencePayload(webScreenshotDiffSchema, evidence.normalized_result, { within: ["normalized_result"] });
		if (!parsed.ok) return parsed;
		return ok({
			operation,
			evidence,
			result: parsed.value
		});
	}
	const parsed = readEvidencePayload(artifactComparisonResultSchema, evidence.normalized_result, { within: ["normalized_result"] });
	if (!parsed.ok) return parsed;
	const links = validateFindingLinks(evidence, [...parsed.value.changes.flatMap(({ evidence_links }) => evidence_links), ...parsed.value.integrity_mismatch_evidence_ids ?? []]);
	if (!links.ok) return links;
	return ok({
		operation,
		evidence,
		result: parsed.value
	});
}
var validateFindingLinks;
function init_comparisonEvidenceResult() {
	return (init_comparisonEvidenceResult = __esmMin((() => {
		init_artifactComparison();
		init_evidenceErrors();
		init_evidenceValidation();
		init_functionComparisonSchemas();
		init_processComparison();
		init_webScreenshot();
		init_result();
		init_comparisonSourceEvidence();
		validateFindingLinks = (evidence, nestedLinks) => {
			const closure = new Set(evidence.evidence_links);
			return nestedLinks.some((id) => !closure.has(id)) ? err(new EvidenceIntegrityError("Comparison finding cites Evidence outside its top-level closure")) : ok(undefined);
		};
	})))();
}

//#endregion
//#region dist/domain/process/processEvidenceProvider.js
var PROCESS_PROVIDER, isProcessEvidenceProvider;
function init_processEvidenceProvider() {
	return (init_processEvidenceProvider = __esmMin((() => {
		PROCESS_PROVIDER = {
			id: "rea-process",
			name: "REA process capture",
			version: "3"
		};
		isProcessEvidenceProvider = (provider) => provider.id === PROCESS_PROVIDER.id && provider.version === PROCESS_PROVIDER.version && (provider.name === PROCESS_PROVIDER.name || provider.name === "REA deterministic process harness");
	})))();
}

//#endregion
//#region dist/domain/comparisonEvidenceIdentity.js
var ARTIFACT_COMPARISON_PROVIDER, FUNCTION_COMPARISON_PROVIDER, FUNCTION_COMPARISON_PROFILE, COMPARISON_EVIDENCE_IDENTITIES, isComparisonEvidenceOperation, hasComparisonEvidenceIdentity;
function init_comparisonEvidenceIdentity() {
	return (init_comparisonEvidenceIdentity = __esmMin((() => {
		init_targetIdentity();
		init_analysisProfile();
		init_processEvidenceProvider();
		ARTIFACT_COMPARISON_PROVIDER = {
			id: "rea-artifact-comparison",
			name: "REA artifact comparison",
			version: "1"
		};
		FUNCTION_COMPARISON_PROVIDER = {
			id: "rea-function-comparison",
			name: "REA function comparison",
			version: "1"
		};
		FUNCTION_COMPARISON_PROFILE = createAnalysisProfile(FUNCTION_COMPARISON_PROVIDER, { workflow_revision: 2 });
		COMPARISON_EVIDENCE_IDENTITIES = {
			compare_artifacts: {
				predicate: "rea.artifact-comparison",
				provider: ARTIFACT_COMPARISON_PROVIDER
			},
			compare_functions: {
				predicate: "rea.function-comparison",
				provider: FUNCTION_COMPARISON_PROVIDER
			},
			compare_process_captures: {
				predicate: "rea.process-comparison",
				provider: PROCESS_PROVIDER
			},
			compare_web_screenshots: {
				predicate: "rea.web-screenshot-diff",
				provider: {
					id: "rea-cdp-browser",
					name: "REA Chrome DevTools Protocol observation provider",
					version: "2"
				}
			}
		};
		isComparisonEvidenceOperation = (operation) => Object.hasOwn(COMPARISON_EVIDENCE_IDENTITIES, operation);
		hasComparisonEvidenceIdentity = (evidence) => {
			if (!isComparisonEvidenceOperation(evidence.operation)) return false;
			const expected = COMPARISON_EVIDENCE_IDENTITIES[evidence.operation];
			const providerMatches = evidence.operation === "compare_process_captures" ? isProcessEvidenceProvider(evidence.provider) : evidence.provider.id === expected.provider.id && evidence.provider.name === expected.provider.name && evidence.provider.version === expected.provider.version;
			const subjectMatches = evidence.operation === "compare_web_screenshots" ? sameTargetIdentity(evidence.subject.identity, unknownTarget("not-observed")) : sameTargetIdentity(evidence.subject.identity, unknownTarget("derived-from-linked-evidence"));
			return evidence.predicate_type === expected.predicate && providerMatches && evidence.confidence === "derived" && evidence.authority === "analyst-inference" && subjectMatches;
		};
	})))();
}

//#endregion
//#region dist/domain/staticRuntimeCorrelation.js
var evidenceIdSchema$6, runtimeDimensionSchema, expectedPatternSchema, observedPatternSchema, artifactSelectorSchema, functionSelectorSchema, staticSelectorSchema, mappingSchema, staticRuntimeCorrelationInputSchema, staticRuntimeCorrelationEnvelopeSchema, correlationItemSchema, staticRuntimeCorrelationResultSchema, correlateStaticAndRuntime, correlate, selectStatic, parseStatic, parseRuntime, assertComparisonIdentity, observedPattern, required, byId, assertUnique, firstDuplicateIndex$1, OPERATION$2, callerInputError$1, evidenceIntegrityError$1;
function init_staticRuntimeCorrelation() {
	return (init_staticRuntimeCorrelation = __esmMin((() => {
		init_canonicalDigest();
		init_evidenceErrors();
		init_inputIssueProjection();
		init_evidenceValidation();
		init_canonicalOrdering();
		init_unicodeCodePointOrder();
		init_comparisonSourceEvidence();
		init_comparisonEvidenceResult();
		init_evidence();
		init_comparisonEvidenceIdentity();
		init_functionComparisonSchemas();
		init_processComparison();
		init_digests();
		evidenceIdSchema$6 = prefixedDigestSchema("ev");
		runtimeDimensionSchema = z.enum(PROCESS_COMPARISON_DIMENSIONS);
		expectedPatternSchema = z.enum([
			"cochanged",
			"static_only",
			"runtime_only",
			"both_unchanged"
		]);
		observedPatternSchema = z.enum([
			...expectedPatternSchema.options,
			"unknown",
			"truncated"
		]);
		artifactSelectorSchema = z.object({
			kind: z.literal("artifact"),
			logical_path: z.string().min(1)
		}).strict();
		functionSelectorSchema = z.object({
			kind: z.literal("function"),
			dimension: functionComparisonDimensionNameSchema
		}).strict();
		staticSelectorSchema = z.discriminatedUnion("kind", [artifactSelectorSchema, functionSelectorSchema]);
		mappingSchema = z.object({
			static: z.object({
				comparison_evidence_id: evidenceIdSchema$6,
				selector: staticSelectorSchema
			}).strict(),
			runtime: z.object({
				comparison_evidence_id: evidenceIdSchema$6,
				dimension: runtimeDimensionSchema
			}).strict(),
			side_alignment: z.enum(["left_to_left", "left_to_right"]),
			hypothesis: z.object({
				statement: z.string().trim().min(1),
				expected_pattern: expectedPatternSchema
			}).strict()
		}).strict();
		staticRuntimeCorrelationInputSchema = z.object({
			static_comparisons: z.array(evidenceSchema).min(1),
			runtime_comparisons: z.array(evidenceSchema).min(1),
			mappings: z.array(mappingSchema).min(1)
		}).strict();
		staticRuntimeCorrelationEnvelopeSchema = staticRuntimeCorrelationInputSchema.omit({
			static_comparisons: true,
			runtime_comparisons: true
		}).extend({
			static_comparisons: z.array(z.unknown()).min(1),
			runtime_comparisons: z.array(z.unknown()).min(1)
		}).strict();
		correlationItemSchema = z.object({
			correlation_id: prefixedDigestSchema("cor"),
			static: z.object({
				comparison_evidence_id: evidenceIdSchema$6,
				selector: staticSelectorSchema,
				status: comparisonStatusSchema,
				conclusion_kind: z.enum([
					"derived_relationship",
					"contradiction",
					"unresolved_branch"
				])
			}),
			runtime: z.object({
				comparison_evidence_id: evidenceIdSchema$6,
				dimension: runtimeDimensionSchema,
				status: comparisonStatusSchema
			}),
			side_alignment: z.enum(["left_to_left", "left_to_right"]),
			hypothesis: z.object({
				statement: z.string().min(1),
				expected_pattern: expectedPatternSchema
			}),
			observed_pattern: observedPatternSchema,
			classification: z.enum([
				"hypothesis",
				"contradiction",
				"unresolved_branch"
			]),
			evidence_links: z.array(evidenceIdSchema$6).min(2),
			limitations: z.array(z.string())
		});
		staticRuntimeCorrelationResultSchema = z.object({
			status: z.enum([
				"correlated",
				"contradicted",
				"unknown",
				"truncated"
			]),
			summary: z.object({
				hypotheses: z.int().min(0),
				contradictions: z.int().min(0),
				unresolved: z.int().min(0)
			}),
			correlations: z.object({ items: z.array(correlationItemSchema) }),
			evidence_links: z.array(evidenceIdSchema$6).min(2),
			limitations: z.array(z.string())
		});
		correlateStaticAndRuntime = (input) => {
			const parsed = staticRuntimeCorrelationEnvelopeSchema.safeParse(input);
			if (!parsed.success) throw analysisInputErrorFromIssues(OPERATION$2, parsed.error.issues, input, {
				cause: parsed.error,
				userMessage: "Provide valid static and runtime comparison Evidence and mappings."
			});
			const { data } = parsed;
			const staticEvidence = data.static_comparisons.map((item, index) => parseStatic(item, input, index));
			const runtimeEvidence = data.runtime_comparisons.map((item, index) => parseRuntime(item, input, index));
			assertUnique(staticEvidence.map(({ evidence }) => evidence.evidence_id), input, ["static_comparisons"], "Static/runtime correlation rejects duplicate static comparison Evidence");
			assertUnique(runtimeEvidence.map(({ evidence }) => evidence.evidence_id), input, ["runtime_comparisons"], "Static/runtime correlation rejects duplicate runtime comparison Evidence");
			const staticById = byId(staticEvidence);
			const runtimeById = byId(runtimeEvidence);
			const correlations = data.mappings.map((mapping, index) => correlate(mapping, staticById, runtimeById, input, index));
			const duplicateMappingIndex = firstDuplicateIndex$1(correlations.map(({ correlation_id }) => correlation_id));
			if (duplicateMappingIndex !== undefined) throw callerInputError$1(input, ["mappings", duplicateMappingIndex], "Static/runtime correlation rejects duplicate mappings");
			correlations.sort((left, right) => compareUnicodeCodePoints(left.correlation_id, right.correlation_id));
			const links = uniqueSorted(correlations.flatMap(({ evidence_links: evidenceLinks }) => evidenceLinks));
			const unresolved = correlations.filter(({ classification }) => classification === "unresolved_branch");
			const contradictions = correlations.filter(({ classification }) => classification === "contradiction");
			return staticRuntimeCorrelationResultSchema.parse({
				status: correlations.some(({ observed_pattern: pattern }) => pattern === "truncated") ? "truncated" : unresolved.length > 0 ? "unknown" : contradictions.length > 0 ? "contradicted" : "correlated",
				summary: {
					hypotheses: correlations.length - contradictions.length - unresolved.length,
					contradictions: contradictions.length,
					unresolved: unresolved.length
				},
				correlations: { items: correlations },
				evidence_links: links,
				limitations: ["Mappings are caller-declared hypotheses; consistency does not establish causality.", "Only explicit mappings were evaluated; similar unmapped observations were not correlated."]
			});
		};
		correlate = (mapping, staticById, runtimeById, input, mappingIndex) => {
			const staticEvidence = required(staticById, mapping.static.comparison_evidence_id, "static comparison", input, [
				"mappings",
				mappingIndex,
				"static",
				"comparison_evidence_id"
			]);
			const runtimeEvidence = required(runtimeById, mapping.runtime.comparison_evidence_id, "runtime comparison", input, [
				"mappings",
				mappingIndex,
				"runtime",
				"comparison_evidence_id"
			]);
			const { limitations: selectedLimitations, ...selectedStatic } = selectStatic(staticEvidence, mapping.static.selector, input, [
				"mappings",
				mappingIndex,
				"static",
				"selector"
			]);
			const process = runtimeEvidence.result;
			const runtimeStatus = process[mapping.runtime.dimension];
			const pattern = observedPattern(selectedStatic, runtimeStatus);
			const classification = pattern === "unknown" || pattern === "truncated" ? "unresolved_branch" : pattern === mapping.hypothesis.expected_pattern ? "hypothesis" : "contradiction";
			const projection = {
				static: mapping.static,
				runtime: mapping.runtime,
				side_alignment: mapping.side_alignment,
				hypothesis: mapping.hypothesis
			};
			return correlationItemSchema.parse({
				correlation_id: `cor_${digestCanonicalValue(projection, "Static/runtime correlation")}`,
				static: {
					...mapping.static,
					...selectedStatic
				},
				runtime: {
					...mapping.runtime,
					status: runtimeStatus
				},
				side_alignment: mapping.side_alignment,
				hypothesis: mapping.hypothesis,
				observed_pattern: pattern,
				classification,
				evidence_links: uniqueSorted([
					staticEvidence.evidence.evidence_id,
					...staticEvidence.evidence.evidence_links,
					runtimeEvidence.evidence.evidence_id,
					...runtimeEvidence.evidence.evidence_links
				]),
				limitations: uniqueSorted([
					...staticEvidence.evidence.limitations,
					...selectedLimitations,
					...runtimeEvidence.evidence.limitations,
					...process.limitations,
					"This correlation tests an explicit hypothesis and does not establish causality.",
					"Side alignment is caller-declared and was not independently validated against source subjects or environments."
				])
			});
		};
		selectStatic = (comparison, selector, input, path) => {
			if (selector.kind === "function") {
				if (comparison.operation !== "compare_functions") throw callerInputError$1(input, path, "Function selector requires function comparison Evidence");
				const result = comparison.result;
				const match = result.dimensions.find(({ dimension }) => dimension === selector.dimension);
				if (match === undefined) throw evidenceIntegrityError$1("Function comparison dimension missing");
				return {
					status: match.status,
					conclusion_kind: match.conclusion_kind,
					limitations: match.limitations
				};
			}
			if (comparison.operation !== "compare_artifacts") throw callerInputError$1(input, path, "Artifact selector requires artifact comparison Evidence");
			const result = comparison.result;
			const matches = result.changes.filter(({ logical_path: path }) => path === selector.logical_path);
			const match = matches.at(0);
			if (matches.length !== 1 || match === undefined) throw callerInputError$1(input, path, "Artifact selector must resolve exactly one reported delta");
			const status = match.classification;
			return {
				status,
				limitations: [],
				conclusion_kind: status === "contradiction" ? "contradiction" : status === "unknown" ? "unresolved_branch" : "derived_relationship"
			};
		};
		parseStatic = (raw, fullInput, index) => {
			const parsed = readEvidence(raw);
			if (!parsed.ok) throw parsed.error;
			const evidence = parsed.value;
			if (evidence.operation !== "compare_artifacts" && evidence.operation !== "compare_functions") throw callerInputError$1(fullInput, ["static_comparisons", index], "Static/runtime correlation requires artifact or function comparison Evidence");
			assertComparisonIdentity(evidence);
			const result = readComparisonResult(evidence, evidence.operation);
			if (!result.ok) throw result.error;
			return result.value;
		};
		parseRuntime = (raw, fullInput, index) => {
			const parsed = readEvidence(raw);
			if (!parsed.ok) throw parsed.error;
			const evidence = parsed.value;
			if (evidence.operation !== "compare_process_captures") throw callerInputError$1(fullInput, ["runtime_comparisons", index], "Static/runtime correlation requires process comparison Evidence");
			assertComparisonIdentity(evidence);
			const result = readComparisonResult(evidence, evidence.operation);
			if (!result.ok) throw result.error;
			return result.value;
		};
		assertComparisonIdentity = (evidence) => {
			if (!hasComparisonEvidenceIdentity(evidence)) throw evidenceIntegrityError$1("Comparison Evidence operation, predicate, provider, or citations disagree");
			const expectedLinks = comparisonSourceEvidenceIds(evidence);
			const actualLinks = uniqueSorted(evidence.evidence_links);
			if (expectedLinks.length !== actualLinks.length || expectedLinks.some((id, index) => id !== actualLinks[index])) throw evidenceIntegrityError$1("Comparison Evidence closure disagrees with its source parameters");
		};
		observedPattern = (staticFinding, runtimeStatus) => {
			const staticStatus = staticFinding.status;
			if (staticStatus === "truncated" || runtimeStatus === "truncated") return "truncated";
			if (staticStatus === "unknown" || runtimeStatus === "unknown" || staticFinding.conclusion_kind !== "derived_relationship" || runtimeStatus === "contradiction") return "unknown";
			const staticChanged = staticStatus !== "unchanged";
			const runtimeChanged = runtimeStatus !== "unchanged";
			if (staticChanged && runtimeChanged) return "cochanged";
			if (staticChanged) return "static_only";
			if (runtimeChanged) return "runtime_only";
			return "both_unchanged";
		};
		required = (values, id, label, input, path) => {
			const value = values.get(id);
			if (value === undefined) throw callerInputError$1(input, path, `Mapping references absent ${label} Evidence`);
			return value;
		};
		byId = (comparisons) => new Map(comparisons.map((item) => [item.evidence.evidence_id, item]));
		assertUnique = (values, input, path, message) => {
			const duplicateIndex = firstDuplicateIndex$1(values);
			if (duplicateIndex !== undefined) throw callerInputError$1(input, [...path, duplicateIndex], message);
		};
		firstDuplicateIndex$1 = (values) => {
			const seen = new Set();
			const index = values.findIndex((value) => {
				if (seen.has(value)) return true;
				seen.add(value);
				return false;
			});
			return index < 0 ? undefined : index;
		};
		OPERATION$2 = "correlate_static_and_runtime";
		callerInputError$1 = (input, path, message) => analysisInputErrorFromIssues(OPERATION$2, [], input, {
			userMessage: message,
			additionalIssues: [{
				path,
				reason: "invalid_value",
				message
			}]
		});
		evidenceIntegrityError$1 = (message) => new EvidenceIntegrityError(message, { userMessage: message });
	})))();
}

//#endregion
//#region dist/contracts/investigationInputContracts.js
var callPathRequestSchema, staticRuntimeCorrelationRequestSchema;
function init_investigationInputContracts() {
	return (init_investigationInputContracts = __esmMin((() => {
		init_callPathSchemas();
		init_evidenceReference();
		init_staticRuntimeCorrelation();
		callPathRequestSchema = callPathInputSchema.extend({ functions: z.array(evidenceInputSchema).min(1) });
		staticRuntimeCorrelationRequestSchema = staticRuntimeCorrelationInputSchema.extend({
			static_comparisons: z.array(evidenceInputSchema).min(1),
			runtime_comparisons: z.array(evidenceInputSchema).min(1)
		});
	})))();
}

//#endregion
//#region dist/domain/changedBehavior.js
var evidenceIdSchema$5, changedBehaviorInputSchema, comparisonSelectionSchema, readChangedBehaviorSelection, findingSchema$1, changedBehaviorResultSchema, findChangedBehavior, parseComparisonEvidence, findingsFor, processFindings, unprovenEqualityReason, functionFindings, artifactFindings, makeFinding, behaviorStatus, isChange, count$1, compareFindings, firstDuplicateIndex, OPERATION$1, callerInputError, evidenceIntegrityError;
function init_changedBehavior() {
	return (init_changedBehavior = __esmMin((() => {
		init_canonicalOrdering();
		init_unicodeCodePointOrder();
		init_comparisonSourceEvidence();
		init_comparisonEvidenceResult();
		init_evidenceReference();
		init_result();
		init_evidenceErrors();
		init_inputIssueProjection();
		init_evidenceValidation();
		init_comparisonEvidenceIdentity();
		init_processComparison();
		init_digests();
		evidenceIdSchema$5 = prefixedDigestSchema("ev");
		changedBehaviorInputSchema = z.strictObject({ comparisons: z.array(evidenceInputSchema).min(1) });
		comparisonSelectionSchema = z.strictObject({ comparisons: z.array(z.unknown()).min(1) });
		readChangedBehaviorSelection = (input) => {
			const envelope = comparisonSelectionSchema.safeParse(input);
			return envelope.success ? ok(envelope.data.comparisons) : err(analysisInputErrorFromIssues(OPERATION$1, envelope.error.issues, input, {
				cause: envelope.error,
				userMessage: "Provide at least one comparison Evidence item."
			}));
		};
		findingSchema$1 = z.object({
			scope: z.enum([
				"runtime",
				"protocol",
				"resource",
				"static_candidate"
			]),
			dimension: z.string().min(1),
			classification: z.enum([
				"observed_change",
				"derived_relationship",
				"contradiction",
				"unresolved_branch"
			]),
			status: comparisonStatusSchema,
			source_comparison_id: evidenceIdSchema$5,
			evidence_links: z.array(evidenceIdSchema$5).min(2),
			limitations: z.array(z.string())
		});
		changedBehaviorResultSchema = z.object({
			behavior_status: z.enum([
				"observed_changed",
				"observed_unchanged",
				"unknown",
				"truncated"
			]),
			summary: z.object({
				observed_changes: z.int().min(0),
				static_candidates: z.int().min(0),
				contradictions: z.int().min(0),
				unresolved: z.int().min(0)
			}),
			findings: z.object({ items: z.array(findingSchema$1) }),
			evidence_links: z.array(evidenceIdSchema$5).min(2),
			limitations: z.array(z.string())
		}).superRefine((result, context) => {
			const summaryTotal = Object.values(result.summary).reduce((total, count) => total + count, 0);
			if (summaryTotal !== result.findings.items.length) context.addIssue({
				code: "custom",
				message: "Finding classification counts must equal the finding total",
				path: ["summary"]
			});
			if (result.behavior_status === "observed_changed" && result.summary.observed_changes === 0 || result.behavior_status === "observed_unchanged" && result.summary.observed_changes > 0) context.addIssue({
				code: "custom",
				message: "Observed-change status must agree with runtime findings",
				path: ["behavior_status"]
			});
		});
		findChangedBehavior = (input) => {
			const selection = readChangedBehaviorSelection(input);
			if (!selection.ok) throw selection.error;
			const comparisons = selection.value;
			const evidence = comparisons.map((item, index) => parseComparisonEvidence(item, input, index));
			const duplicateIndex = firstDuplicateIndex(evidence.map(({ evidence: { evidence_id: id } }) => id));
			if (duplicateIndex !== undefined) throw callerInputError(input, ["comparisons", duplicateIndex], "Changed-behavior analysis rejects duplicate comparison Evidence");
			const findings = evidence.flatMap(findingsFor).sort(compareFindings);
			const runtimeStatuses = evidence.flatMap((comparison) => comparison.operation === "compare_process_captures" ? [unprovenEqualityReason(comparison.result) === undefined ? comparison.result.status : "unknown"] : []);
			const links = uniqueSorted(evidence.flatMap(({ evidence: item }) => [item.evidence_id, ...item.evidence_links]));
			const result = changedBehaviorResultSchema.parse({
				behavior_status: behaviorStatus(runtimeStatuses),
				summary: {
					observed_changes: count$1(findings, "observed_change"),
					static_candidates: count$1(findings, "derived_relationship"),
					contradictions: count$1(findings, "contradiction"),
					unresolved: count$1(findings, "unresolved_branch")
				},
				findings: { items: findings },
				evidence_links: links,
				limitations: uniqueSorted([
					...evidence.flatMap(({ evidence: item }) => item.limitations),
					...evidence.some(({ operation }) => operation !== "compare_process_captures") ? ["Static differences are behavior candidates, not runtime observations."] : [],
					...runtimeStatuses.length === 0 ? ["No process comparison Evidence was supplied."] : []
				])
			});
			return {
				result,
				comparisonEvidenceIds: evidence.map(({ evidence: { evidence_id } }) => evidence_id)
			};
		};
		parseComparisonEvidence = (input, fullInput, index) => {
			const parsedEvidence = readEvidence(input);
			if (!parsedEvidence.ok) throw parsedEvidence.error;
			const evidence = parsedEvidence.value;
			if (!isComparisonEvidenceOperation(evidence.operation) || evidence.operation === "compare_web_screenshots") throw callerInputError(fullInput, ["comparisons", index], "Changed-behavior analysis requires process, artifact, or function comparison Evidence");
			const operation = evidence.operation;
			if (!hasComparisonEvidenceIdentity(evidence)) throw evidenceIntegrityError("Comparison Evidence operation, predicate, and provider disagree");
			if (!comparisonSourceEvidenceIds(evidence).every((id) => evidence.evidence_links.includes(id))) throw evidenceIntegrityError("Comparison Evidence must cite both selected source observations");
			const result = readComparisonResult(evidence, operation);
			if (!result.ok) throw result.error;
			return result.value;
		};
		findingsFor = (comparison) => {
			if (comparison.operation === "compare_process_captures") return processFindings(comparison);
			if (comparison.operation === "compare_functions") return functionFindings(comparison);
			return artifactFindings(comparison);
		};
		processFindings = (comparison) => {
			const { evidence, result } = comparison;
			const dimensions = [
				[
					"terminal",
					result.terminal,
					"runtime"
				],
				[
					"interaction",
					result.interaction,
					"runtime"
				],
				[
					"exit",
					result.exit,
					"runtime"
				],
				[
					"filesystem",
					result.filesystem,
					"resource"
				],
				[
					"process",
					result.process,
					"runtime"
				]
			];
			const findings = dimensions.flatMap(([dimension, status, scope]) => status === "unchanged" ? [] : [makeFinding({
				evidence,
				dimension,
				scope,
				status,
				classification: isChange(status) ? "observed_change" : status === "contradiction" ? "contradiction" : "unresolved_branch",
				limitations: result.limitations
			})]);
			const reason = unprovenEqualityReason(result);
			return reason === undefined ? findings : [...findings, makeFinding({
				evidence,
				dimension: "first_divergence",
				scope: "runtime",
				status: "unknown",
				classification: "unresolved_branch",
				limitations: [...result.limitations, reason]
			})];
		};
		unprovenEqualityReason = (result) => result.status === "unchanged" && result.first_divergence.status === "unknown" ? result.first_divergence.reason : undefined;
		functionFindings = (comparison) => {
			const { evidence, result } = comparison;
			return result.dimensions.flatMap((dimension) => {
				const finding = (status) => makeFinding({
					evidence,
					dimension: dimension.dimension,
					scope: "static_candidate",
					status,
					classification: status === "unknown" ? "unresolved_branch" : dimension.conclusion_kind,
					limitations: status === "unknown" && dimension.dimension === "calls" && dimension.discovery_status === undefined ? [...dimension.limitations, "Static call discovery coverage was not recorded in the comparison."] : dimension.limitations,
					links: dimension.evidence_links
				});
				const findings = dimension.status === "unchanged" ? [] : [finding(dimension.status)];
				if (dimension.dimension === "calls" && dimension.status !== "unknown" && dimension.discovery_status !== "complete") findings.push(finding("unknown"));
				return findings;
			});
		};
		artifactFindings = (comparison) => {
			const { evidence, result } = comparison;
			const changes = result.changes.map((change) => makeFinding({
				evidence,
				dimension: `artifact:${change.logical_path}`,
				scope: "static_candidate",
				status: change.classification,
				classification: change.classification === "contradiction" ? "contradiction" : change.classification === "unknown" ? "unresolved_branch" : "derived_relationship",
				limitations: result.limitations,
				links: change.evidence_links
			}));
			return (result.status === "unknown" || result.status === "truncated") && !changes.some(({ classification }) => classification === "unresolved_branch") ? [...changes, makeFinding({
				evidence,
				dimension: "artifact:coverage",
				scope: "static_candidate",
				status: result.status,
				classification: "unresolved_branch",
				limitations: result.limitations
			})] : changes;
		};
		makeFinding = (input) => findingSchema$1.parse({
			scope: input.scope,
			dimension: input.dimension,
			classification: input.classification,
			status: input.status,
			source_comparison_id: input.evidence.evidence_id,
			evidence_links: uniqueSorted([input.evidence.evidence_id, ...input.links ?? input.evidence.evidence_links]),
			limitations: uniqueSorted(input.limitations)
		});
		behaviorStatus = (statuses) => {
			if (statuses.length === 0) return "unknown";
			if (statuses.includes("truncated")) return "truncated";
			if (statuses.includes("unknown") || statuses.includes("contradiction")) return "unknown";
			return statuses.some(isChange) ? "observed_changed" : "observed_unchanged";
		};
		isChange = (status) => status === "added" || status === "removed" || status === "changed";
		count$1 = (findings, classification) => findings.filter((finding) => finding.classification === classification).length;
		compareFindings = (left, right) => compareUnicodeCodePoints(compositeKey([
			left.scope,
			left.dimension,
			left.source_comparison_id
		]), compositeKey([
			right.scope,
			right.dimension,
			right.source_comparison_id
		]));
		firstDuplicateIndex = (values) => {
			const seen = new Set();
			const index = values.findIndex((value) => {
				if (seen.has(value)) return true;
				seen.add(value);
				return false;
			});
			return index < 0 ? undefined : index;
		};
		OPERATION$1 = "find_changed_behavior";
		callerInputError = (input, path, message) => analysisInputErrorFromIssues(OPERATION$1, [], input, {
			userMessage: message,
			additionalIssues: [{
				path,
				reason: "invalid_value",
				message
			}]
		});
		evidenceIntegrityError = (message) => new EvidenceIntegrityError(message, { userMessage: message });
	})))();
}

//#endregion
//#region dist/domain/reconstructionVerificationSchemas.js
var evidenceIdSchema$4, unknownIdSchema, claimIdSchema, titleSchema, verificationStatusSchema, commonClaim, behavioralClaimSchema, functionClaimSchema, artifactClaimSchema, visualClaimSchema, reconstructionClaimSchema, reconstructionClaimSelector, reconstructionSpecificationSchema, reconstructionVerificationInputSchema, reconstructionClaimResultSchema, countReconstructionClaimKinds, reconstructionVerificationResultSchema;
function init_reconstructionVerificationSchemas() {
	return (init_reconstructionVerificationSchemas = __esmMin((() => {
		init_unicodeCodePointOrder();
		init_stringPatterns();
		init_digests();
		init_processComparison();
		init_functionComparisonSchemas();
		evidenceIdSchema$4 = prefixedDigestSchema("ev");
		unknownIdSchema = prefixedDigestSchema("unk");
		claimIdSchema = z.string().regex(IDENTIFIER_PATTERN);
		titleSchema = z.string().trim().min(1);
		verificationStatusSchema = z.enum([
			"pass",
			"fail",
			"unknown"
		]);
		commonClaim = {
			claim_id: claimIdSchema,
			title: titleSchema,
			comparison_evidence_id: evidenceIdSchema$4
		};
		behavioralClaimSchema = z.object({
			...commonClaim,
			kind: z.literal("behavioral"),
			dimension: z.enum(["overall", ...PROCESS_COMPARISON_DIMENSIONS])
		});
		functionClaimSchema = z.object({
			...commonClaim,
			kind: z.literal("structural-function"),
			dimension: z.enum(["overall", ...functionComparisonDimensionNameSchema.options])
		});
		artifactClaimSchema = z.object({
			...commonClaim,
			kind: z.literal("structural-artifact"),
			dimension: z.literal("overall")
		});
		visualClaimSchema = z.object({
			...commonClaim,
			kind: z.literal("visual"),
			dimension: z.literal("overall"),
			source_evidence: z.strictObject({
				before_evidence_id: evidenceIdSchema$4,
				after_evidence_id: evidenceIdSchema$4
			}).optional().describe("Select the retained screenshot capture for each side. Supply both IDs when a digest matches multiple captures, including byte-identical before and after captures.")
		});
		reconstructionClaimSchema = z.discriminatedUnion("kind", [
			behavioralClaimSchema,
			functionClaimSchema,
			artifactClaimSchema,
			visualClaimSchema
		]);
		reconstructionClaimSelector = (claim, resolvedPair) => {
			const selected = claim.kind === "visual" ? claim.source_evidence : undefined;
			const pair = resolvedPair ?? (selected === undefined ? [] : [selected.before_evidence_id, selected.after_evidence_id]);
			return compositeKey([
				claim.kind,
				claim.comparison_evidence_id,
				claim.dimension,
				...pair
			]);
		};
		reconstructionSpecificationSchema = z.object({
			name: z.string().trim().min(1),
			claims: z.array(reconstructionClaimSchema).min(1)
		}).superRefine((value, context) => {
			const ids = value.claims.map(({ claim_id: id }) => id);
			if (new Set(ids).size !== ids.length) context.addIssue({
				code: "custom",
				message: "Claim IDs must be unique"
			});
			const selectors = value.claims.map((claim) => reconstructionClaimSelector(claim));
			if (new Set(selectors).size !== selectors.length) context.addIssue({
				code: "custom",
				message: "Claim comparison selectors must be unique"
			});
		});
		reconstructionVerificationInputSchema = z.strictObject({ specification: reconstructionSpecificationSchema });
		reconstructionClaimResultSchema = z.object({
			claim_id: claimIdSchema,
			kind: z.enum([
				"behavioral",
				"structural-function",
				"structural-artifact",
				"visual"
			]),
			dimension: z.string().min(1),
			status: verificationStatusSchema,
			observed_status: z.enum([
				"unchanged",
				"added",
				"removed",
				"changed",
				"truncated",
				"unknown",
				"contradiction"
			]),
			comparison_evidence_id: evidenceIdSchema$4,
			left_evidence_ids: z.array(evidenceIdSchema$4).min(1),
			right_evidence_ids: z.array(evidenceIdSchema$4).min(1),
			evidence_links: z.array(evidenceIdSchema$4).min(2),
			unknown_ids: z.array(unknownIdSchema),
			limitations: z.array(z.string())
		});
		countReconstructionClaimKinds = (claims) => ({
			behavioral: claims.filter(({ kind }) => kind === "behavioral").length,
			structural: claims.filter(({ kind }) => kind === "structural-function" || kind === "structural-artifact").length,
			visual: claims.filter(({ kind }) => kind === "visual").length
		});
		reconstructionVerificationResultSchema = z.object({
			status: verificationStatusSchema,
			specification_sha256: digestSchema,
			summary: z.object({
				total: z.int().min(1),
				passed: z.int().min(0),
				failed: z.int().min(0),
				unknown: z.int().min(0),
				behavioral: z.int().min(0),
				structural: z.int().min(0),
				visual: z.int().min(0).default(0)
			}),
			claims: z.object({ items: z.array(reconstructionClaimResultSchema) }),
			recommended_probes: z.array(z.object({
				operation: z.string().min(1),
				rationale: z.string().min(1),
				claim_ids: z.array(claimIdSchema).min(1),
				unknown_ids: z.array(unknownIdSchema)
			})),
			evidence_links: z.array(evidenceIdSchema$4).min(2),
			limitations: z.array(z.string())
		}).superRefine((result, context) => {
			const { summary } = result;
			const claims = result.claims.items;
			const kinds = countReconstructionClaimKinds(claims);
			const expectedStatus = summary.failed > 0 ? "fail" : summary.unknown > 0 ? "unknown" : "pass";
			const issues = [
				[
					summary.passed !== claims.filter(({ status }) => status === "pass").length || summary.failed !== claims.filter(({ status }) => status === "fail").length || summary.unknown !== claims.filter(({ status }) => status === "unknown").length,
					"Claim status counts must summarize retained claims",
					["summary"]
				],
				[
					summary.behavioral !== kinds.behavioral || summary.structural !== kinds.structural || summary.visual !== kinds.visual,
					"Claim kind counts must summarize retained claims",
					["summary"]
				],
				[
					summary.total !== summary.passed + summary.failed + summary.unknown,
					"Claim status counts must equal the summary total",
					["summary", "total"]
				],
				[
					summary.total !== summary.behavioral + summary.structural + summary.visual,
					"Claim kind counts must equal the summary total",
					["summary", "total"]
				],
				[
					result.claims.items.length !== summary.total,
					"Retained claims must equal the summary total",
					["claims", "items"]
				],
				[
					result.status !== expectedStatus,
					"Verification status must summarize claim statuses",
					["status"]
				]
			];
			for (const [invalid, message, path] of issues) if (invalid) context.addIssue({
				code: "custom",
				message,
				path: [...path]
			});
		});
	})))();
}

//#endregion
//#region dist/domain/native/nativeByteRead.js
var nativeByteReadSchema;
function init_nativeByteRead() {
	return (init_nativeByteRead = __esmMin((() => {
		nativeByteReadSchema = z.object({
			address: z.string(),
			requested_bytes: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
			returned_bytes: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
			bytes_hex: z.string().regex(/^(?:[a-f0-9]{2})*$/u),
			complete: z.boolean()
		}).superRefine((value, context) => {
			if (value.returned_bytes * 2 !== value.bytes_hex.length || value.returned_bytes > value.requested_bytes || value.complete !== (value.returned_bytes === value.requested_bytes)) context.addIssue({
				code: "custom",
				message: "Read-byte length and completeness disagree"
			});
		});
	})))();
}

//#endregion
//#region dist/contracts/analysisDetail.js
var analysisDetailSchema, analysisDetailSummaryDefaultSchema, analysisDetailOutputSchemaOf;
function init_analysisDetail() {
	return (init_analysisDetail = __esmMin((() => {
		init_toolOutputSchemaPrimitives();
		analysisDetailSchema = z.enum(["complete", "summary"]).default("complete").describe("complete returns the complete analysis Evidence inline. summary retains that complete Evidence in this session and returns its inspect_analysis_view summary; inspect pages, items or facets through normalized_result.parent_evidence_id.");
		analysisDetailSummaryDefaultSchema = z.enum(["complete", "summary"]).default("summary").describe("summary (default) returns a compact dossier and retains the complete analyze_function Evidence in this session; page pseudocode, references and value-flow through normalized_result.parent_evidence_id with inspect_analysis_view. complete returns the full dossier inline.");
		analysisDetailOutputSchemaOf = (analysis, summary) => evidenceResultOf(z.union([analysis, summary]));
	})))();
}

//#endregion
//#region dist/domain/native/bytePattern.js
var MAX_BYTE_SEARCH_MATCHES, bytePatternFields, hexDigit, readBytePair, nextPairOffset, countBytePairs, validateBytePatternValue, validateBytePattern, coverageBlock, byteSearchResultSchema;
function init_bytePattern() {
	return (init_bytePattern = __esmMin((() => {
		init_addressCoordinate();
		init_analysisErrorCore();
		init_result();
		MAX_BYTE_SEARCH_MATCHES = 1e3;
		bytePatternFields = {
			pattern: z.string().describe("Hexadecimal byte pairs or ?? whole-byte wildcards, with optional whitespace between complete pairs; no leading or trailing whitespace. At least one bit must be constrained after applying the mask."),
			mask: z.string().optional().describe("Hexadecimal mask byte pairs, with optional whitespace between complete pairs; no leading or trailing whitespace. Must contain the same number of bytes as pattern.")
		};
		hexDigit = (code) => {
			if (code >= 48 && code <= 57) return code - 48;
			if (code >= 65 && code <= 70) return code - 55;
			if (code >= 97 && code <= 102) return code - 87;
			return undefined;
		};
		readBytePair = (value, offset) => {
			if (value[offset] === "?" && value[offset + 1] === "?") return "wildcard";
			const high = hexDigit(value.charCodeAt(offset));
			const low = hexDigit(value.charCodeAt(offset + 1));
			return high === undefined || low === undefined ? undefined : high * 16 + low;
		};
		nextPairOffset = (value, offset) => {
			const end = offset + 2;
			let next = end;
			while (next < value.length && /\s/u.test(value[next])) next += 1;
			return next === value.length && next !== end ? -1 : next;
		};
		countBytePairs = (value, field) => {
			let count = 0;
			for (let offset = 0; offset < value.length;) {
				const byte = readBytePair(value, offset);
				if (byte === undefined || field === "mask" && byte === "wildcard") return undefined;
				count += 1;
				offset = nextPairOffset(value, offset);
				if (offset < 0) return undefined;
			}
			return count === 0 ? undefined : count;
		};
		validateBytePatternValue = (pattern, mask) => {
			const invalid = (field, message) => err(new AnalysisInputError("search_bytes", undefined, [{
				path: [field],
				reason: "invalid_value",
				message
			}]));
			const patternCount = countBytePairs(pattern, "pattern");
			if (patternCount === undefined) return invalid("pattern", "Use hexadecimal byte pairs or ?? wildcards");
			const maskCount = mask === undefined ? undefined : countBytePairs(mask, "mask");
			if (mask !== undefined && maskCount === undefined) return invalid("mask", "Use hexadecimal mask byte pairs");
			if (maskCount !== undefined && maskCount !== patternCount) return invalid("mask", "Mask length must equal pattern length");
			let patternOffset = 0;
			let maskOffset = 0;
			for (let index = 0; index < patternCount; index += 1) {
				const byte = readBytePair(pattern, patternOffset);
				const selected = mask === undefined ? 255 : readBytePair(mask, maskOffset);
				if (typeof byte === "number" && typeof selected === "number" && selected !== 0) return ok(null);
				patternOffset = nextPairOffset(pattern, patternOffset);
				if (mask !== undefined) maskOffset = nextPairOffset(mask, maskOffset);
			}
			return invalid("pattern", "Pattern must constrain at least one bit");
		};
		validateBytePattern = (value, context) => {
			const parsed = validateBytePatternValue(value.pattern, value.mask);
			if (!parsed.ok) for (const issue of parsed.error.issues) context.addIssue({
				code: "custom",
				path: [...issue.path],
				message: issue.message ?? "Invalid byte pattern"
			});
		};
		coverageBlock = z.strictObject({
			segment: z.string(),
			start: z.string(),
			end: z.string(),
			bytes: z.int().nonnegative().max(Number.MAX_SAFE_INTEGER)
		}).superRefine((value, context) => {
			const start = addressCoordinate(value.start);
			const end = addressCoordinate(value.end);
			if (start === null || end === null || start.space !== end.space || start.offset > end.offset || end.offset - start.offset + 1n !== BigInt(value.bytes)) context.addIssue({
				code: "custom",
				message: "Byte coverage must equal its inclusive address range in one space"
			});
		});
		byteSearchResultSchema = z.strictObject({
			matches: z.array(z.strictObject({
				address: z.string(),
				segment: z.string().describe("Memory block containing the match start."),
				file_offset: z.int().nonnegative().max(Number.MAX_SAFE_INTEGER).nullable().describe("Source file offset of the match start, not a guarantee of a contiguous file span."),
				procedure: z.strictObject({
					address: z.string(),
					name: z.string()
				}).nullable()
			})).max(MAX_BYTE_SEARCH_MATCHES),
			searched: z.strictObject({
				blocks: z.array(coverageBlock),
				bytes: z.int().nonnegative().max(Number.MAX_SAFE_INTEGER),
				skipped_uninitialized: z.array(coverageBlock),
				skipped_not_loaded: z.array(coverageBlock).describe("Unloaded blocks skipped by an unbounded search, including unloaded overlays."),
				skipped_overlays: z.array(coverageBlock).describe("Loaded overlay blocks skipped by an unbounded search; select their address space with a bound.")
			}),
			complete: z.boolean().describe("No further matches remain in the eligible selection; skipped blocks were not searched."),
			next_cursor: z.string().min(1).nullable()
		}).superRefine((value, context) => {
			if (value.complete !== (value.next_cursor === null) || value.searched.bytes !== value.searched.blocks.reduce((sum, block) => sum + block.bytes, 0)) context.addIssue({
				code: "custom",
				message: "Byte search coverage and continuation disagree"
			});
			const ranges = value.searched.blocks.map((block) => ({
				segment: block.segment,
				start: addressCoordinate(block.start),
				end: addressCoordinate(block.end)
			}));
			for (const [index, match] of value.matches.entries()) {
				const address = addressCoordinate(match.address);
				if (address === null || !ranges.some((range) => range.segment === match.segment && range.start !== null && range.end !== null && range.start.space === address.space && range.end.space === address.space && range.start.offset <= address.offset && address.offset <= range.end.offset)) context.addIssue({
					code: "custom",
					path: [
						"matches",
						index,
						"address"
					],
					message: "Byte match must lie within reported searched coverage in the same segment and address space"
				});
			}
		});
	})))();
}

//#endregion
//#region dist/domain/liveBinaryTargetSummary.js
var architectureSchema, headerArchitectureSchema, identity, executable, liveBinaryTargetSummaryVariants, liveBinaryTargetSummarySchema;
function init_liveBinaryTargetSummary() {
	return (init_liveBinaryTargetSummary = __esmMin((() => {
		init_binaryTargetTypes();
		init_digests();
		init_localPath();
		init_rawBinary();
		init_targetFormats();
		architectureSchema = z.enum(BINARY_ARCHITECTURES);
		headerArchitectureSchema = architectureSchema.exclude(HEADER_ARCHITECTURE_EXCLUSIONS);
		identity = {
			path: z.string(),
			sha256: digestSchema,
			caller_input_path: localPathStringSchema.exactOptional().describe("Verbatim selected path when it differs from the inspected file path.")
		};
		executable = {
			...identity,
			kind: z.literal("executable")
		};
		liveBinaryTargetSummaryVariants = [
			z.object({
				...executable,
				format: z.literal("elf"),
				architecture: architectureSchema.exclude([...RAW_ONLY_ARCHITECTURES, "arm64_32"])
			}),
			z.object({
				...executable,
				format: z.literal("mach-o"),
				architecture: z.enum([...headerArchitectureSchema.options, "arm64_32"])
			}),
			z.object({
				...executable,
				format: z.enum([
					"mach-o-universal",
					"pe",
					"dos-mz",
					"dos-com"
				]),
				architecture: headerArchitectureSchema
			}),
			z.object({
				...executable,
				format: z.literal("raw-binary"),
				architecture: binaryArchitectureSchema,
				entry_point: rawBinaryEntryPointSchema.describe("Canonical caller-selected address where raw file offset 0 is mapped and execution is seeded.")
			}),
			z.object({
				...executable,
				format: z.literal("gamecube-dol"),
				architecture: z.literal("powerpc"),
				entry_point: rawBinaryEntryPointSchema.describe("Canonical entry address taken from the caller-selected DOL header.")
			}),
			z.object({
				...identity,
				kind: z.literal("database"),
				format: z.literal("analysis-database"),
				architecture: z.null()
			}),
			z.object({
				...identity,
				kind: z.literal("archive"),
				format: z.enum(targetFormatsOfKind("archive").filter((format) => format !== "esp-flash-image")),
				architecture: z.null()
			}),
			z.object({
				...identity,
				kind: z.literal("archive"),
				format: z.literal("esp-flash-image"),
				architecture: z.null(),
				flash_offset: z.number().int().min(0).max(4294967295).nullable().describe("Caller-selected flash address of the dump's first byte; null reads it as flash address 0."),
				partition_table_offset: z.number().int().min(0).max(4294967295).nullable().describe("Caller-selected partition table address; null tries 0x8000, then a scan.")
			}),
			z.object({
				...identity,
				kind: z.literal("artifact"),
				format: z.enum(targetFormatsOfKind("artifact")),
				architecture: z.null()
			})
		];
		liveBinaryTargetSummarySchema = z.discriminatedUnion("format", liveBinaryTargetSummaryVariants);
	})))();
}

//#endregion
//#region dist/domain/native/nativeFunctionAnnotations.js
var nativeFunctionAnnotationsInputSchema, nativeFunctionAnnotationsSchema;
function init_nativeFunctionAnnotations() {
	return (init_nativeFunctionAnnotations = __esmMin((() => {
		init_functionDossier();
		nativeFunctionAnnotationsInputSchema = z.strictObject({
			procedure: z.string().min(1).describe("Function name or address selecting a function; edits apply at its entry."),
			name: z.string().min(1).optional(),
			comment: z.string().optional().describe("Regular entry comment; empty text clears it"),
			inline_comment: z.string().optional().describe("Inline entry comment; empty text clears it")
		}).refine((value) => value.name !== undefined || value.comment !== undefined || value.inline_comment !== undefined, "Supply at least one annotation change");
		nativeFunctionAnnotationsSchema = z.strictObject({
			annotations: z.strictObject({
				address: z.string().min(1),
				name: z.string().min(1),
				comment: z.string().nullable(),
				inline_comment: z.string().nullable()
			}),
			dossier: functionDossierSchema,
			effects: z.strictObject({
				scope: z.literal("session-analysis-database"),
				source_bytes_modified: z.literal(false),
				persists_after_close: z.literal(false)
			})
		}).superRefine((value, context) => {
			if (value.annotations.address !== value.dossier.procedure.address || value.annotations.name !== value.dossier.procedure.name) context.addIssue({
				code: "custom",
				message: "Annotation readback disagrees with refreshed function identity"
			});
		});
	})))();
}

//#endregion
//#region dist/domain/pngHeader.js
var PNG_SIGNATURE, IHDR_DATA_BYTES, PNG_CHUNK_OVERHEAD, hasPngSignature, createPngChunkReader, readPngIhdrFacts, readPngHeaderDimensions;
function init_pngHeader() {
	return (init_pngHeader = __esmMin((() => {
		init_binaryContainer();
		init_result();
		PNG_SIGNATURE = Buffer.from([
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		]);
		IHDR_DATA_BYTES = 13;
		PNG_CHUNK_OVERHEAD = 12;
		hasPngSignature = (bytes) => bytes.subarray(0, 8).equals(PNG_SIGNATURE);
		createPngChunkReader = (bytes) => {
			const reader = new BinaryReader(bytes, false, "png");
			return (offset, maxDataBytes = 2147483647) => {
				const remaining = bytes.length - offset;
				if (remaining < PNG_CHUNK_OVERHEAD) return err("Truncated PNG chunk");
				const length = reader.u32(offset);
				if (length > maxDataBytes) return err("Invalid PNG chunk length");
				if (length > remaining - PNG_CHUNK_OVERHEAD) return err("Truncated PNG data");
				const typeAndData = reader.range(offset + 4, 4 + length, "PNG chunk");
				const checksumOffset = offset + 8 + length;
				if (crc32(typeAndData) !== reader.u32(checksumOffset)) return err("Invalid PNG chunk checksum");
				const type = typeAndData.toString("latin1", 0, 4);
				if (!/^[A-Za-z]{4}$/u.test(type) || type[2] !== type[2]?.toUpperCase()) return err("Invalid PNG chunk type");
				return ok({
					type,
					data: typeAndData.subarray(4),
					nextOffset: checksumOffset + 4
				});
			};
		};
		readPngIhdrFacts = (data) => {
			if (data.length !== IHDR_DATA_BYTES) return err("Invalid PNG header");
			const header = new BinaryReader(data, false, "png");
			const width = header.u32(0);
			const height = header.u32(4);
			if (width === 0 || height === 0 || width > 2147483647 || height > 2147483647) return err("Invalid PNG header");
			const bitDepth = header.u8(8);
			const colorType = header.u8(9);
			const interlaceMethod = header.u8(12);
			const validDepth = colorType === 0 && [
				1,
				2,
				4,
				8,
				16
			].includes(bitDepth) || colorType === 2 && [8, 16].includes(bitDepth) || colorType === 3 && [
				1,
				2,
				4,
				8
			].includes(bitDepth) || colorType === 4 && [8, 16].includes(bitDepth) || colorType === 6 && [8, 16].includes(bitDepth);
			if (!validDepth || header.u8(10) !== 0 || header.u8(11) !== 0 || interlaceMethod !== 0 && interlaceMethod !== 1) return err("Invalid PNG header");
			return ok({
				width,
				height,
				bitDepth,
				colorType,
				interlaceMethod
			});
		};
		readPngHeaderDimensions = (bytes) => {
			if (!hasPngSignature(bytes)) return undefined;
			const chunk = createPngChunkReader(bytes)(8, IHDR_DATA_BYTES);
			if (!chunk.ok || chunk.value.type !== "IHDR") return undefined;
			const facts = readPngIhdrFacts(chunk.value.data);
			return facts.ok ? {
				width: facts.value.width,
				height: facts.value.height
			} : undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/native/nativeUiObservation.js
var scope, nativeUiObservationInputSchema, nativeUiScenarioInputSchema, nativeUiScreenshotSchema, nativeUiSnapshotSchema, nativeUiResultSchema;
function init_nativeUiObservation() {
	return (init_nativeUiObservation = __esmMin((() => {
		init_nativeDeadlines();
		init_webScreenshot();
		init_pngHeader();
		init_sha256Hex();
		scope = {
			pid: z.int().positive(),
			window_id: z.int().positive(),
			screenshot: z.boolean().default(true).describe("Capture the selected window; screenshot or accessibility must be enabled."),
			accessibility: z.boolean().default(true).describe("Read the selected window accessibility tree; screenshot or accessibility must be enabled."),
			max_nodes: z.int().positive().safe().default(500).describe("Maximum accessibility nodes per capture; increase for large windows."),
			native_ui_deadline_ms: nativeUiDeadlineField
		};
		nativeUiObservationInputSchema = z.strictObject(scope);
		nativeUiScenarioInputSchema = z.strictObject({
			...scope,
			steps: z.array(z.discriminatedUnion("kind", [
				z.strictObject({
					kind: z.literal("click"),
					path: z.array(z.int().nonnegative()).max(32)
				}),
				z.strictObject({
					kind: z.literal("scroll"),
					path: z.array(z.int().nonnegative()).max(32),
					direction: z.enum(["increment", "decrement"])
				}),
				z.strictObject({
					kind: z.literal("key-entry"),
					path: z.array(z.int().nonnegative()).max(32),
					text: z.string()
				}),
				z.strictObject({
					kind: z.literal("wait"),
					milliseconds: z.int().min(0).max(NATIVE_UI_WAIT_STEP_MAX_MS).describe("Wait duration in milliseconds. One wait step stays capped at 180000 ms. This release has no runtime override for that step cap. The operation deadline is native_ui_deadline_ms (omitted means 180000).")
				})
			])).min(1)
		});
		nativeUiScreenshotSchema = z.strictObject({
			mime_type: z.literal("image/png"),
			base64: z.string().min(4).describe("Canonical base64 encoding of PNG bytes; the decoded bytes must have a PNG signature and a valid IHDR chunk."),
			sha256: z.string().regex(/^[a-f0-9]{64}$/u).describe("SHA-256 digest of the decoded PNG bytes."),
			width: z.int().positive().describe("Must equal the width encoded in the PNG IHDR chunk."),
			height: z.int().positive().describe("Must equal the height encoded in the PNG IHDR chunk.")
		}).superRefine((screenshot, context) => {
			const bytes = decodeCanonicalBase64(screenshot.base64);
			if (bytes === undefined) {
				context.addIssue({
					code: "custom",
					message: "Invalid canonical PNG base64"
				});
				return;
			}
			if (sha256Hex(bytes) !== screenshot.sha256) context.addIssue({
				code: "custom",
				message: "PNG screenshot digest mismatch"
			});
			const dimensions = readPngHeaderDimensions(bytes);
			if (dimensions === undefined) {
				context.addIssue({
					code: "custom",
					message: "Screenshot bytes are not a PNG image"
				});
				return;
			}
			if (dimensions.width !== screenshot.width || dimensions.height !== screenshot.height) context.addIssue({
				code: "custom",
				message: "PNG screenshot dimensions mismatch"
			});
		});
		nativeUiSnapshotSchema = z.strictObject({
			window: z.strictObject({
				pid: z.int().positive(),
				window_id: z.int().positive(),
				executable: z.string(),
				launch_time: z.number(),
				title: z.string()
			}),
			nodes: z.array(z.strictObject({
				path: z.array(z.int().nonnegative()),
				role: z.string().nullable(),
				title: z.string().nullable(),
				value: z.union([
					z.string(),
					z.number(),
					z.boolean()
				]).nullable(),
				actions: z.array(z.string()),
				children_count: z.int().nonnegative().nullable()
			})),
			truncated: z.boolean(),
			screenshot: nativeUiScreenshotSchema.nullable(),
			gaps: z.array(z.string())
		});
		nativeUiResultSchema = z.strictObject({
			target_sha256: z.string(),
			initial: nativeUiSnapshotSchema,
			steps: z.array(z.strictObject({
				index: z.int().nonnegative(),
				kind: z.string(),
				before: nativeUiSnapshotSchema,
				after: nativeUiSnapshotSchema.nullable(),
				outcome: z.enum([
					"completed",
					"failed",
					"cancelled"
				]),
				reason: z.string().nullable()
			})),
			restore: z.literal("leave-as-is"),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/native/nativeDataType.js
var nativeDataTypeInputSchema, nativeDataTypeSchema;
function init_nativeDataType() {
	return (init_nativeDataType = __esmMin((() => {
		init_nativeMetadataRecovery();
		nativeDataTypeInputSchema = z.strictObject({
			type: z.string().min(1).optional(),
			address: z.string().min(1).optional(),
			document: z.string().optional()
		}).refine((value) => value.type === undefined !== (value.address === undefined), "Supply exactly one of type or address");
		nativeDataTypeSchema = z.strictObject({
			status: z.enum(["available", "unavailable"]),
			reason: z.string().nullable(),
			id: z.string().nullable(),
			name: z.string().nullable(),
			kind: z.enum([
				"struct",
				"union",
				"enum",
				"pointer",
				"array",
				"typedef",
				"scalar",
				"unsupported",
				"unavailable"
			]),
			source: z.literal("analysis-database"),
			source_archive: z.string().nullable(),
			address: z.string().nullable(),
			size_bytes: z.int().nonnegative().nullable(),
			alignment_bytes: z.int().positive().nullable(),
			packing_enabled: z.boolean().nullable(),
			referenced_type: z.string().nullable(),
			array_count: z.int().nonnegative().nullable(),
			array_stride_bytes: z.int().nonnegative().nullable(),
			fields: z.array(z.strictObject({
				ordinal: z.int().nonnegative(),
				name: z.string().nullable(),
				offset_bytes: z.int().nonnegative(),
				size_bytes: z.int().nonnegative().nullable(),
				type_id: z.string(),
				bit_size: z.int().nonnegative().nullable(),
				bit_offset: z.int().nonnegative().nullable(),
				bit_field: z.strictObject({
					base_type_id: z.string(),
					declared_bit_size: z.int().nonnegative(),
					component_type_lookup: z.enum([
						"equivalent",
						"different",
						"not-found"
					]),
					base_type_lookup: z.enum([
						"equivalent",
						"different",
						"not-found"
					])
				}).optional().describe("Observed bit-field base and exact manager lookups. bit_size is the effective width; bit_offset is the least-significant-bit offset within the base type. Omission means bit-field details were not reported."),
				status: z.enum(["observed", "unsupported"]),
				flexible_tail: z.literal("unknown")
			})),
			members: z.array(z.strictObject({
				name: z.string(),
				value: z.string()
			})),
			total_fields: z.int().nonnegative(),
			truncated: z.boolean(),
			limitations: z.array(z.string()),
			metadata_recovery: nativeMetadataRecoverySchema.optional()
		});
	})))();
}

//#endregion
//#region dist/domain/native/nativeCallCaptureLimits.js
var NATIVE_CALL_CAPTURE_DEFAULTS, MAX_NATIVE_CALL_CAPTURE_BYTES, bytes, count, nativeCallCaptureLimitsSchema, nativeCallCaptureLimitsInputSchema, nativeCallCaptureLimits;
function init_nativeCallCaptureLimits() {
	return (init_nativeCallCaptureLimits = __esmMin((() => {
		NATIVE_CALL_CAPTURE_DEFAULTS = {
			trace_bytes: 8 * 1024 * 1024,
			trace_frames: 65536,
			breakpoint_location_bytes: 8 * 1024 * 1024,
			other_stops: 256,
			selector_bytes: 1024,
			output_bytes: 1024 * 1024
		};
		MAX_NATIVE_CALL_CAPTURE_BYTES = Math.min(constants.MAX_LENGTH, constants.MAX_STRING_LENGTH);
		bytes = z.int().min(1).max(MAX_NATIVE_CALL_CAPTURE_BYTES);
		count = z.int().min(1);
		nativeCallCaptureLimitsSchema = z.strictObject({
			trace_bytes: bytes.default(NATIVE_CALL_CAPTURE_DEFAULTS.trace_bytes),
			trace_frames: count.default(NATIVE_CALL_CAPTURE_DEFAULTS.trace_frames),
			breakpoint_location_bytes: bytes.default(NATIVE_CALL_CAPTURE_DEFAULTS.breakpoint_location_bytes),
			other_stops: count.default(NATIVE_CALL_CAPTURE_DEFAULTS.other_stops),
			selector_bytes: bytes.default(NATIVE_CALL_CAPTURE_DEFAULTS.selector_bytes),
			output_bytes: bytes.default(NATIVE_CALL_CAPTURE_DEFAULTS.output_bytes)
		});
		nativeCallCaptureLimitsInputSchema = z.strictObject({
			trace_bytes: nativeCallCaptureLimitsSchema.shape.trace_bytes.removeDefault().optional(),
			trace_frames: nativeCallCaptureLimitsSchema.shape.trace_frames.removeDefault().optional(),
			breakpoint_location_bytes: nativeCallCaptureLimitsSchema.shape.breakpoint_location_bytes.removeDefault().optional(),
			other_stops: nativeCallCaptureLimitsSchema.shape.other_stops.removeDefault().optional(),
			selector_bytes: nativeCallCaptureLimitsSchema.shape.selector_bytes.removeDefault().optional(),
			output_bytes: nativeCallCaptureLimitsSchema.shape.output_bytes.removeDefault().optional()
		});
		nativeCallCaptureLimits = (selected) => nativeCallCaptureLimitsSchema.parse(selected ?? {});
	})))();
}

//#endregion
//#region dist/domain/native/nativeCallObservation.js
var hexSchema, nativeString, objcName, functionBreakpoint, objcMethodBreakpoint, nativeCallProcessOutcomeSchema, nativeCallBreakpointSchema, environmentNameSchema, environmentValueSchema, nativeCallEnvironmentSchema, nativeCallObservationInputSchema, nativeCodeLocationSchema, nativeCallEventSchema, nativeCapturedOutputSchema, nativeCallObservationResultSchema;
function init_nativeCallObservation() {
	return (init_nativeCallObservation = __esmMin((() => {
		init_coverage();
		init_nativeCallCaptureLimits();
		init_jsonRecord();
		init_localPath();
		hexSchema = z.string().regex(/^0x[0-9a-f]+$/u);
		nativeString = z.string().regex(/^[^\x00]*$/u, "Native launch and breakpoint strings cannot contain NUL");
		objcName = nativeString.min(1).regex(/^[^\s\x5b\x5d]+$/u, "Use the bare name without spaces or brackets");
		functionBreakpoint = {
			kind: z.literal("function"),
			name: nativeString.min(1).describe("Exact LLDB runtime symbol name, such as `open`, a C++ or mangled Swift symbol, or `-[NSString length]`. On Darwin, pass an inspect_macho export or import `runtime_name` (`main`), not its symbol-table `name` (`_main`); REA preserves the selected name without translating it.")
		};
		objcMethodBreakpoint = {
			kind: z.literal("objc-method"),
			selector: objcName.describe("Selector such as `dataTaskWithRequest:completionHandler:`.")
		};
		nativeCallProcessOutcomeSchema = z.enum([
			"exited",
			"duration-elapsed",
			"event-limit",
			"stop-limit",
			"resource-limit"
		]);
		nativeCallBreakpointSchema = z.discriminatedUnion("kind", [z.strictObject({
			...functionBreakpoint,
			module: nativeString.min(1).optional().describe("Image file name that defines the symbol, such as `libsystem_kernel.dylib`; omit to match every image.")
		}), z.strictObject({
			...objcMethodBreakpoint,
			class_name: objcName.optional().describe("Implementing class; omit to match every class."),
			method_type: z.enum([
				"instance",
				"class",
				"any"
			]).default("any")
		})]);
		environmentNameSchema = z.string().min(1).regex(/^[^=\x00]+$/u, "Environment names cannot contain '=' or NUL");
		environmentValueSchema = z.string().regex(/^[^\x00]*$/u, "Environment values cannot contain NUL");
		nativeCallEnvironmentSchema = jsonRecordSchema(environmentValueSchema, environmentNameSchema);
		nativeCallObservationInputSchema = z.strictObject({
			capture_limits: nativeCallCaptureLimitsInputSchema.optional().describe("Retention budgets for this observation. Omitted fields keep documented defaults. Select before launch; increasing them cannot recover an earlier observation. Limits do not extend duration_ms or max_events."),
			breakpoints: z.array(nativeCallBreakpointSchema).min(1),
			arguments: z.array(nativeString).default([]),
			environment: nativeCallEnvironmentSchema.default({}).describe("Overrides on top of the environment REA runs with."),
			working_directory: localPathStringSchema.optional(),
			duration_ms: z.int().min(100).max(6e5).default(1e4).describe("Observation window; the process is killed if it is still running."),
			max_events: z.int().min(1).max(1e5).default(1e3).describe("Stop observing and kill the process after this many recorded entries."),
			argument_registers: z.int().min(0).max(8).default(4).describe("Integer argument registers to record per entry (arm64 has 8, x86_64 has 6)."),
			backtrace_frames: z.int().min(0).max(64).default(0).describe("Caller frames to record per entry.")
		});
		nativeCodeLocationSchema = z.strictObject({
			load_address: hexSchema,
			file_address: hexSchema.nullable(),
			module: z.string().nullable(),
			module_path: z.string().nullable(),
			symbol: z.string().nullable(),
			/** LLDB line-table attribution; does not verify source file contents. */
			source_location: z.strictObject({
				file_path: z.string().min(1).nullable(),
				line: z.number().int().positive().nullable(),
				column: z.number().int().positive().nullable()
			}).nullable().optional().describe("Compiler or debugger source attribution only; REA does not read or verify the named source-file bytes.")
		});
		nativeCallEventSchema = z.strictObject({
			sequence: z.int().nonnegative(),
			elapsed_ms: z.number().nonnegative(),
			thread_id: z.int().nonnegative(),
			breakpoint_index: z.int().nonnegative(),
			...nativeCodeLocationSchema.shape,
			/** Dynamic class of an instance-method receiver, read without running code. */
			receiver_class: z.string().nullable(),
			/** Selector string read from the `_cmd` register of an Objective-C method. */
			selector: z.string().nullable(),
			registers: z.array(z.strictObject({
				name: z.string(),
				value: hexSchema
			})),
			backtrace: z.array(nativeCodeLocationSchema)
		});
		nativeCapturedOutputSchema = z.strictObject({
			text: z.string(),
			/** Bytes observed by the bridge, not a total when complete is false. */
			bytes: z.int().nonnegative(),
			truncated: z.boolean(),
			complete: z.boolean()
		});
		nativeCallObservationResultSchema = z.strictObject({
			capture_limits: nativeCallCaptureLimitsSchema.optional(),
			target: z.strictObject({
				path: z.string(),
				sha256: z.string().regex(/^[0-9a-f]{64}$/u),
				architecture: z.string(),
				arguments: z.array(z.string()),
				environment: nativeCallEnvironmentSchema,
				working_directory: z.string().nullable(),
				launch_identity: z.strictObject({
					/** A pathname hash does not verify the bytes mapped into the process. */
					loaded_image_sha256: z.null(),
					file_device: z.string().nullable(),
					file_inode: z.string().nullable(),
					selected_file_sha256: z.string().regex(/^[0-9a-f]{64}$/u).nullable(),
					module_path: z.string().nullable(),
					module_uuid: z.string().nullable(),
					stable: z.boolean()
				})
			}),
			debugger: z.strictObject({
				path: z.string(),
				sha256: z.string().regex(/^[0-9a-f]{64}$/u),
				version: z.string().nullable()
			}),
			process: z.strictObject({
				pid: z.int().positive(),
				outcome: nativeCallProcessOutcomeSchema,
				exit_status: z.int().nullable(),
				exit_description: z.string().nullable(),
				/** REA confirmed the process is gone when observation ended. */
				terminated: z.boolean(),
				elapsed_ms: z.number().nonnegative(),
				stdout: nativeCapturedOutputSchema,
				stderr: nativeCapturedOutputSchema,
				/** Signal and exception stops LLDB reported; the process continued past each. */
				other_stops: z.array(z.string())
			}),
			breakpoints: z.array(z.strictObject({
				index: z.int().nonnegative(),
				request: z.discriminatedUnion("kind", [z.strictObject({
					...functionBreakpoint,
					module: z.string().nullable()
				}), z.strictObject({
					...objcMethodBreakpoint,
					class_name: z.string().nullable(),
					method_type: z.enum([
						"instance",
						"class",
						"any"
					])
				})]),
				location_count: z.int().nonnegative(),
				locations: z.array(nativeCodeLocationSchema)
			})),
			events: z.array(nativeCallEventSchema),
			coverage: z.strictObject({
				status: knownCoverageStatusSchema,
				event_limit_reached: z.boolean(),
				resource_limit_reached: z.boolean(),
				capture_limit: z.enum(["trace_bytes", "trace_frames"]).optional(),
				/** Aggregate breakpoint-location metadata exhausted its retained-byte budget. */
				breakpoint_locations_truncated: z.boolean().optional(),
				/** Other stops that may be unrecorded breakpoint hits; events may be missing. */
				unattributed_breakpoint_stops: z.int().positive().optional(),
				/** Requests that matched no code in any image loaded while observing. */
				unresolved_breakpoints: z.array(z.int().nonnegative())
			}),
			limitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/domain/apple/dyldPaths.js
var MAX_SYMLINK_HOPS, resolveTreePath, segmentsOf, directoryOf, joinPath, expandPrefix, COMPATIBLE_ARCHITECTURES, ARM32_CPU_TYPE, ARM32_SUBTYPE_PREFERENCES, compatibleSlice;
function init_dyldPaths() {
	return (init_dyldPaths = __esmMin((() => {
		init_machoCpuIdentity();
		MAX_SYMLINK_HOPS = 32;
		resolveTreePath = async (view, input) => {
			const pending = segmentsOf(input);
			const resolved = [];
			let last;
			let hops = 0;
			while (pending.length > 0) {
				const segment = pending.shift() ?? "";
				if (segment === ".") continue;
				if (segment === "..") {
					if (resolved.length === 0) return { kind: "escapes" };
					resolved.pop();
					last = { kind: "directory" };
					continue;
				}
				const path = [...resolved, segment].join("/");
				const entry = await view.entry(path);
				if (entry === undefined) return { kind: "absent" };
				if (entry.kind === "symlink") {
					if (entry.target === null) return {
						kind: "undetermined",
						path,
						targetHex: entry.targetHex
					};
					hops += 1;
					if (hops > MAX_SYMLINK_HOPS) return { kind: "absent" };
					if (entry.target.startsWith("/")) return { kind: "escapes" };
					pending.unshift(...segmentsOf(entry.target));
					continue;
				}
				if (entry.kind === "file" && pending.length > 0) return { kind: "absent" };
				resolved.push(segment);
				last = entry;
			}
			return last?.kind === "file" ? {
				kind: "file",
				path: resolved.join("/")
			} : { kind: "not-file" };
		};
		segmentsOf = (path) => {
			const segments = path.split("/").filter((segment) => segment !== "");
			if (path.endsWith("/")) segments.push(".");
			return segments;
		};
		directoryOf = (path) => {
			const index = path.lastIndexOf("/");
			return index < 0 ? "" : path.slice(0, index);
		};
		joinPath = (directory, rest) => directory === "" ? rest : rest === "" ? directory : `${directory}/${rest}`;
		expandPrefix = (raw, context) => {
			const variable = /^@(executable_path|loader_path)(?:\/(.*))?$/su.exec(raw);
			if (variable !== null) {
				const rest = variable[2] ?? "";
				if (variable[1] === "loader_path") return {
					scope: "target",
					path: joinPath(context.ownerDirectory, rest),
					prefix: "loader_path"
				};
				return context.executable === null ? {
					scope: "undetermined",
					path: raw,
					prefix: "executable_path"
				} : {
					scope: "target",
					path: joinPath(directoryOf(context.executable), rest),
					prefix: "executable_path"
				};
			}
			if (raw.startsWith("/")) {
				const lookupPath = context.rootRelativePath(raw);
				return lookupPath === undefined ? {
					scope: "outside",
					path: raw
				} : {
					scope: "target",
					path: raw,
					lookupPath
				};
			}
			return {
				scope: "undetermined",
				path: raw
			};
		};
		COMPATIBLE_ARCHITECTURES = { x86_64h: ["x86_64h", "x86_64"] };
		ARM32_CPU_TYPE = 12;
		ARM32_SUBTYPE_PREFERENCES = {
			0: [0],
			5: [5, 0],
			6: [
				6,
				7,
				5,
				0
			],
			7: [
				7,
				5,
				0
			],
			8: [
				8,
				7,
				5,
				0
			],
			9: [
				9,
				6,
				7,
				5,
				0
			],
			10: [
				10,
				9,
				6,
				7,
				5,
				0
			],
			11: [
				11,
				9,
				10,
				6,
				7,
				5,
				0
			],
			12: [12]
		};
		compatibleSlice = (slices, process) => {
			if (process.cpu_type === ARM32_CPU_TYPE) {
				const subtype = machoCpuSubtypeBase(process.cpu_subtype);
				const preferences = ARM32_SUBTYPE_PREFERENCES[subtype];
				if (preferences === undefined) return slices.some((item) => item.cpu_type === ARM32_CPU_TYPE) ? { kind: "unknown" } : { kind: "missing" };
				for (const preferredSubtype of preferences) {
					const slice = slices.find((item) => item.cpu_type === ARM32_CPU_TYPE && machoCpuSubtypeBase(item.cpu_subtype) === preferredSubtype);
					if (slice !== undefined) return {
						kind: "selected",
						slice
					};
				}
				return { kind: "missing" };
			}
			const processFamily = machoArchitectureFamily(process.architecture);
			for (const architecture of COMPATIBLE_ARCHITECTURES[processFamily] ?? [processFamily]) {
				const slice = slices.find((item) => machoArchitectureFamily(item.architecture) === architecture && (processFamily !== "arm64e" || item.cpu_type === process.cpu_type && machoCpuSubtypeBase(item.cpu_subtype) === machoCpuSubtypeBase(process.cpu_subtype)));
				if (slice !== undefined) return {
					kind: "selected",
					slice
				};
			}
			return { kind: "missing" };
		};
	})))();
}

//#endregion
//#region dist/domain/apple/dyldEnvironment.js
var embeddedDyldOverrides, overrideEffect, isFrameworkInstallName, hasApplicableDyldOverrides;
function init_dyldEnvironment() {
	return (init_dyldEnvironment = __esmMin((() => {
		embeddedDyldOverrides = (environment, platforms) => {
			const overrides = [];
			for (const setting of environment) {
				const delimiter = setting.indexOf("=");
				if (delimiter <= 0) continue;
				const variable = setting.slice(0, delimiter);
				const value = setting.slice(delimiter + 1);
				const effect = overrideEffect(variable, value);
				if (effect === undefined) continue;
				if (variable === "DYLD_ROOT_PATH" && platforms.length > 0 && platforms.every((platform) => platform >= 1 && platform <= 12) && !platforms.some((platform) => [
					7,
					8,
					9,
					12
				].includes(platform))) continue;
				overrides.push({
					variable,
					value,
					...effect
				});
			}
			return overrides;
		};
		overrideEffect = (variable, value) => {
			switch (variable) {
				case "DYLD_LIBRARY_PATH": return {
					phase: "override",
					scope: "library"
				};
				case "DYLD_FRAMEWORK_PATH": return {
					phase: "override",
					scope: "framework"
				};
				case "DYLD_FALLBACK_LIBRARY_PATH": return {
					phase: "fallback",
					scope: "library"
				};
				case "DYLD_FALLBACK_FRAMEWORK_PATH": return {
					phase: "fallback",
					scope: "framework"
				};
				case "DYLD_VERSIONED_LIBRARY_PATH":
				case "DYLD_VERSIONED_FRAMEWORK_PATH":
				case "DYLD_IMAGE_SUFFIX": return /[^:]/u.test(value) ? {
					phase: "override",
					scope: "all"
				} : undefined;
				case "DYLD_INSERT_LIBRARIES": return value === "" ? undefined : {
					phase: "override",
					scope: "all"
				};
				case "DYLD_ROOT_PATH":
				case "DYLD_OVERLAY_PATH": return value === "" ? undefined : {
					phase: "override",
					scope: "prefix"
				};
				default: return undefined;
			}
		};
		isFrameworkInstallName = (name, overrides) => {
			const separator = name.lastIndexOf(".framework/");
			if (separator < 0) return false;
			const framework = name.slice(0, separator).split("/").at(-1);
			const leaf = name.slice(name.lastIndexOf("/") + 1);
			return leaf === framework || overrides.some(({ variable, value }) => variable === "DYLD_IMAGE_SUFFIX" && leaf === `${framework}${value}`);
		};
		hasApplicableDyldOverrides = (overrides, installName, ordinarySearchFoundImage) => {
			const kind = isFrameworkInstallName(installName, overrides) ? "framework" : "library";
			return overrides.some(({ phase, scope }) => (phase === "override" || !ordinarySearchFoundImage) && (scope === "all" || scope === kind || scope === "prefix" && !installName.startsWith("@")));
		};
	})))();
}

//#endregion
//#region dist/domain/apple/dylibResolutionFindings.js
var isLazyLoadCommand, deriveFindings, unresolvedFinding, missingCandidateExplanation, candidateRejection, dependencyPhrase, lazyConsequence, DYLIB_RESOLUTION_LIMITATIONS;
function init_dylibResolutionFindings() {
	return (init_dylibResolutionFindings = __esmMin((() => {
		isLazyLoadCommand = (command) => command === "LC_LAZY_LOAD_DYLIB" || command === "LC_LAZY_LOAD_DYLIB_INFO";
		deriveFindings = (edges, roots) => {
			const findings = [];
			edges.forEach((edge, index) => {
				if (edge.resolution.status === "unresolved") findings.push(unresolvedFinding(edge, index));
				const resolvedAt = edge.candidates.findIndex(({ outcome }) => outcome === "resolved");
				const earlier = edge.candidates.slice(0, Math.max(resolvedAt, 0)).filter(({ source, outcome }) => source === "rpath" && outcome === "absent").map(({ path }) => path);
				if (resolvedAt > 0 && earlier.length > 0) findings.push({
					kind: "earlier-rpath-candidate-absent",
					edge_index: index,
					image: edge.loader,
					basis: "derived",
					explanation: `The modeled dyld search checks ${earlier.join(", ")} before ${edge.resolution.image ?? edge.install_name}. A compatible Mach-O placed at an earlier modeled path could take precedence over that fallback, subject to unmodeled search inputs and code-signing library validation; library validation is not evaluated here (see inspect_signature).${edge.loader_conditional ? " This dependency-expansion chain is conditional; this search applies only if that chain is used." : ""}${edge.resolution.status === "conditional" ? " Unmodeled environment overrides or earlier unknown candidates may take precedence; placing an image at this rpath does not establish which image dyld will load." : ""}`
				});
			});
			for (const { image, slice } of roots) {
				const { architecture } = slice;
				const environment = slice.dyld_environment;
				if (environment.length > 0) findings.push({
					kind: "dyld-environment-present",
					edge_index: null,
					image,
					basis: "derived",
					explanation: slice.file_type === "execute" ? `${image} (${architecture}) sets dyld environment variables through LC_DYLD_ENVIRONMENT (${environment.join(", ")}); any image-selection overrides they request are not modeled. Diagnostic settings alone do not alter resolution.` : `${image} (${architecture}) contains LC_DYLD_ENVIRONMENT (${environment.join(", ")}). Dyld reads these commands only from the main executable; entries in this non-executable root are observations and do not alter resolution.`
				});
			}
			return findings;
		};
		unresolvedFinding = (edge, index) => {
			const base = {
				edge_index: index,
				image: edge.loader,
				basis: "derived"
			};
			const lazy = isLazyLoadCommand(edge.command);
			const missing = missingCandidateExplanation(edge, dependencyPhrase(edge, lazy));
			const when = edge.loader_conditional ? `. The dependency-expansion chain for ${edge.loader} is conditional; if that chain is used, ` : "; ";
			if (lazy) return {
				...base,
				kind: "lazy-load-unresolved",
				explanation: `${missing}${when}${lazyConsequence(edge.weak)}`
			};
			return edge.weak ? {
				...base,
				kind: "weak-load-unresolved",
				explanation: `${missing}${when}dyld continues without it.`
			} : {
				...base,
				kind: "required-load-unresolved",
				explanation: `${missing}${when}dyld would fail to load this required dependency for ${edge.root} (${edge.architecture}) unless the image is supplied elsewhere.`
			};
		};
		missingCandidateExplanation = (edge, dependency) => {
			const present = edge.candidates.flatMap(({ outcome, resolved_path }) => resolved_path === null ? [] : [{
				outcome,
				path: resolved_path
			}]);
			if (present.length === 0) return `No candidate for ${dependency} exists in the analyzed root`;
			const descriptions = present.map(({ outcome, path }) => `${path} (${candidateRejection(outcome)})`);
			return `No usable candidate for ${dependency} exists in the analyzed root; found ${descriptions.join(", ")}`;
		};
		candidateRejection = (outcome) => {
			switch (outcome) {
				case "not-mach-o": return "not a Mach-O image";
				case "malformed": return "malformed";
				case "architecture-missing": return "missing the process architecture";
				case "not-loadable": return "not a loadable dylib";
				case "platform-mismatch": return "incompatible with the process platform";
				case "unsupported": return "unsupported by the parser";
				case "resolved": return "loadable";
				case "absent": return "absent";
				case "outside-target": return "outside the analyzed root";
				case "escapes-target": return "escapes the analyzed root";
				case "undetermined": return "of undetermined loadability";
			}
		};
		dependencyPhrase = (edge, lazy) => {
			if (lazy && edge.weak) return `lazily loaded weak dependency ${edge.install_name}`;
			if (lazy) return `lazily loaded ${edge.install_name}`;
			if (edge.weak) return `weak dependency ${edge.install_name}`;
			return edge.install_name;
		};
		lazyConsequence = (weak) => weak ? "dyld loads it on first use and continues if it is absent." : "dyld loads it on first use, which would fail unless the image is supplied elsewhere.";
		DYLIB_RESOLUTION_LIMITATIONS = [
			"LC_LAZY_LOAD_DYLIB and LC_LAZY_LOAD_DYLIB_INFO dependencies are resolved but not traversed, because dyld loads them only on first use.",
			"Slices are matched by dyld's graded architectures (an x86_64h process also loads x86_64). arm64e processes that disable pointer authentication can also load arm64 slices; that fallback is not modeled.",
			"Absolute install names and rpaths are evaluated only when spelled beneath the analyzed root. Other absolute paths remain outside the analyzed root, including /System and /usr/lib libraries that the dyld shared cache usually provides.",
			"Leaf and relative install names depend on dyld fallback paths, DYLD_* variables, and the working directory; they are undetermined.",
			"Load order follows dyld's dependents-first traversal in load-command order. Images load once per process. Their dependencies expand once using the first traversal's rpath stack, even when a sibling already loaded the image; a later @rpath request whose install name matches an already loaded image reuses it.",
			"@loader_path uses each image's symlink-resolved path within the analyzed root.",
			"Code-signing checks that can reject a found image, such as library validation and the hardened runtime, are not evaluated.",
			"Dylib compatibility versions are not compared. Apple's linker documentation describes a load-time rejection when an image's compatibility version is older than the loader requires, but dyld on macOS 26 was observed to load such an image."
		];
	})))();
}

//#endregion
//#region dist/domain/apple/dylibResolution.js
var ROOT_RELATIVE_PATH, rootRelativePathSchema, dylibResolutionInputSchema, dependencyCommandSchema, IMPLICIT_MACOS_PLATFORM, MACOS_DYLD_IMPLICIT_PLATFORM_CPU_TYPES, dependencySchema, machoSliceSchema, machoImageSlices, candidateSchema, edgeSchema, findingSchema, imageSchema, dylibResolutionResultSchema, expandCandidatePath, appendRpath, candidateTemplates, evaluateCandidate, platformLoadability, imageLoadabilityForPlatform, isKnownPlatform, imageFacts, resolution, resolveDependency, traceProcess, projectTraceResult, traceDylibLoading, withoutDependencies, compare;
function init_dylibResolution() {
	return (init_dylibResolution = __esmMin((() => {
		init_coverage();
		init_machoCpuIdentity();
		init_analysisErrorCore();
		init_dyldPaths();
		init_digests();
		init_dyldEnvironment();
		init_dylibResolutionFindings();
		init_appendAll();
		ROOT_RELATIVE_PATH = /^(?:[^\x2f\\\x00.][^\x2f\\\x00]*|\.[^\x2f\\\x00.][^\x2f\\\x00]*|\.\.[^\x2f\\\x00]+)(?:\x2f(?:[^\x2f\\\x00.][^\x2f\\\x00]*|\.[^\x2f\\\x00.][^\x2f\\\x00]*|\.\.[^\x2f\\\x00]+))*$/u;
		rootRelativePathSchema = z.string().min(1).regex(ROOT_RELATIVE_PATH, "Use a normalized path relative to the analyzed root, without a leading or trailing '/', '//', or '.' and '..' segments");
		dylibResolutionInputSchema = z.strictObject({
			roots: z.array(rootRelativePathSchema).min(1).optional(),
			architecture: z.enum([
				"arm64",
				"arm64e",
				"x86_64"
			]).optional()
		});
		dependencyCommandSchema = z.enum([
			"LC_LOAD_DYLIB",
			"LC_LOAD_WEAK_DYLIB",
			"LC_REEXPORT_DYLIB",
			"LC_LAZY_LOAD_DYLIB",
			"LC_LAZY_LOAD_DYLIB_INFO",
			"LC_LOAD_UPWARD_DYLIB"
		]);
		IMPLICIT_MACOS_PLATFORM = 1;
		MACOS_DYLD_IMPLICIT_PLATFORM_CPU_TYPES = new Set([
			7,
			16777223,
			16777228
		]);
		dependencySchema = z.strictObject({
			command: dependencyCommandSchema,
			encoding: z.enum([
				"dylib_command",
				"dylib_use_command",
				"lazy_load_dylib_info"
			]),
			install_name: z.string(),
			weak: z.boolean(),
			upward: z.boolean(),
			reexport: z.boolean(),
			delayed_init: z.boolean(),
			/**
			* Null for `lazy_load_dylib_info`: that payload has no version fields.
			* Classic dylib commands still carry both versions.
			*/
			current_version: z.string().nullable(),
			compatibility_version: z.string().nullable()
		});
		machoSliceSchema = z.strictObject({
			architecture: z.string().min(1),
			hidden: z.boolean().exactOptional(),
			/** Physical identity observed in the thin header and, for FAT, its table. */
			slice_offset: z.int().nonnegative(),
			slice_size: z.int().positive(),
			cpu_type: z.int().nonnegative(),
			cpu_subtype: z.int().nonnegative(),
			fat_cpu_type: z.int().nonnegative().nullable(),
			fat_cpu_subtype: z.int().nonnegative().nullable(),
			fat_alignment_exponent: z.int().nonnegative().nullable(),
			file_type: z.enum([
				"execute",
				"dylib",
				"bundle",
				"other"
			]),
			file_type_code: z.int().nonnegative(),
			/** Raw LC_BUILD_VERSION platform number; null means no such command was observed. */
			platform: z.int().nonnegative().nullable(),
			/** Every distinct build platform declared by LC_BUILD_VERSION/version-min commands. */
			platforms: z.array(z.int().nonnegative()),
			install_name: z.string().nullable(),
			dependencies: z.array(dependencySchema),
			rpaths: z.array(z.string()),
			dyld_environment: z.array(z.string()),
			code_signature_present: z.boolean()
		});
		machoImageSlices = (facts) => facts.hiddenSlices === undefined ? facts.slices : [...facts.slices, ...facts.hiddenSlices];
		candidateSchema = z.strictObject({
			path: z.string(),
			source: z.enum([
				"literal",
				"executable_path",
				"loader_path",
				"rpath",
				"already-loaded"
			]),
			rpath: z.string().nullable(),
			rpath_owner: z.string().nullable(),
			outcome: z.enum([
				"resolved",
				"absent",
				"not-mach-o",
				"malformed",
				"unsupported",
				"architecture-missing",
				"not-loadable",
				"platform-mismatch",
				"outside-target",
				"escapes-target",
				"undetermined"
			]),
			resolved_path: z.string().nullable(),
			platform_basis: z.enum(["macos-dyld-implicit"]).optional()
		});
		edgeSchema = z.strictObject({
			root: z.string(),
			architecture: z.string(),
			loader: z.string(),
			via: z.array(z.string()),
			...dependencySchema.shape,
			candidates: z.array(candidateSchema),
			resolution: z.strictObject({
				status: z.enum([
					"resolved",
					"conditional",
					"unresolved",
					"undetermined"
				]),
				image: z.string().nullable()
			}),
			install_name_matches: z.boolean().nullable(),
			/**
			* The loader's dependency-expansion chain crosses a conditional edge.
			* This edge applies only if that chain is used, even when another edge
			* independently loads the same image.
			*/
			loader_conditional: z.boolean()
		});
		findingSchema = z.strictObject({
			kind: z.enum([
				"required-load-unresolved",
				"weak-load-unresolved",
				"lazy-load-unresolved",
				"earlier-rpath-candidate-absent",
				"dyld-environment-present"
			]),
			edge_index: z.int().nonnegative().nullable(),
			image: z.string().nullable(),
			basis: z.literal("derived"),
			explanation: z.string().min(1)
		});
		imageSchema = z.strictObject({
			path: z.string(),
			sha256: digestSchema,
			parse_status: z.enum([
				"parsed",
				"malformed",
				"unsupported"
			]),
			reason: z.string().nullable(),
			slices: z.array(machoSliceSchema.omit({ dependencies: true }))
		});
		dylibResolutionResultSchema = z.strictObject({
			root_path: z.string(),
			target_sha256: digestSchema,
			roots: z.array(z.strictObject({
				image: z.string(),
				architecture: z.string()
			})),
			images: z.array(imageSchema),
			edges: z.array(edgeSchema),
			findings: z.array(findingSchema),
			coverage: z.strictObject({
				status: knownCoverageStatusSchema,
				unparsed_images: z.array(z.string()),
				roots_without_architecture: z.array(z.string())
			}),
			limitations: z.array(z.string().min(1))
		});
		expandCandidatePath = (raw, ownerDirectory, context) => expandPrefix(raw, {
			ownerDirectory,
			executable: context.executable,
			rootRelativePath: (absolutePath) => context.view.rootRelativePath(absolutePath)
		});
		appendRpath = (base, rest) => {
			if (base === "") return rest;
			if (base === "/") return `/${rest}`;
			return `${base.replace(/\/+$/u, "")}/${rest}`;
		};
		candidateTemplates = (dependency, loader, context, chain) => {
			const name = dependency.install_name;
			if (!name.startsWith("@rpath/")) {
				const expansion = expandCandidatePath(name, directoryOf(loader), context);
				return [{
					expansion,
					source: expansion.prefix ?? "literal",
					rpath: null,
					rpathOwner: null
				}];
			}
			const rest = name.slice("@rpath/".length);
			const owners = [...chain].reverse();
			return owners.flatMap((owner) => (context.loaded.get(owner)?.slice.rpaths ?? []).map((rpath) => {
				const base = expandCandidatePath(rpath, directoryOf(owner), context);
				const lookupPath = base.scope === "target" ? base.lookupPath : undefined;
				const expansion = {
					scope: base.scope,
					path: base.scope === "outside" || lookupPath !== undefined ? appendRpath(base.path, rest) : `${base.path}${base.path === "" ? "" : "/"}${rest}`,
					...lookupPath === undefined ? {} : { lookupPath: appendRpath(lookupPath, rest) }
				};
				return {
					expansion,
					source: "rpath",
					rpath,
					rpathOwner: owner
				};
			}));
		};
		evaluateCandidate = async (template, context) => {
			const base = {
				path: template.expansion.path,
				source: template.source,
				rpath: template.rpath,
				rpath_owner: template.rpathOwner
			};
			if (template.expansion.scope === "outside") return {
				...base,
				outcome: "outside-target",
				resolved_path: null
			};
			if (template.expansion.scope === "undetermined") return {
				...base,
				outcome: "undetermined",
				resolved_path: null
			};
			const lookup = await resolveTreePath(context.view, template.expansion.lookupPath ?? template.expansion.path);
			if (lookup.kind === "escapes") return {
				...base,
				outcome: "escapes-target",
				resolved_path: null
			};
			if (lookup.kind === "undetermined") {
				context.undecodableSymlinkTargets.set(lookup.path, lookup.targetHex);
				return {
					...base,
					outcome: "undetermined",
					resolved_path: null
				};
			}
			if (lookup.kind !== "file") return {
				...base,
				outcome: "absent",
				resolved_path: null
			};
			const facts = await imageFacts(context, lookup.path);
			let outcome;
			if (facts.status !== "parsed") outcome = facts.status;
			else {
				const selection = compatibleSlice(machoImageSlices(facts), context.processIdentity);
				if (selection.kind === "unknown") {
					outcome = "undetermined";
					context.unknownArchitectureCandidates.add(lookup.path);
				} else if (selection.kind === "missing") outcome = "architecture-missing";
				else if (selection.slice.file_type_code !== 6) outcome = "not-loadable";
				else {
					const { slice } = selection;
					const platformResult = platformLoadability(context, slice);
					outcome = platformResult.outcome === "compatible" ? "resolved" : platformResult.outcome === "incompatible" ? "platform-mismatch" : "undetermined";
					if (outcome === "undetermined") context.unknownPlatformCandidates.add(lookup.path);
					if (platformResult.basis !== undefined) {
						context.implicitMacOSPlatformCandidates.add(lookup.path);
						return {
							...base,
							outcome,
							resolved_path: lookup.path,
							platform_basis: platformResult.basis
						};
					}
				}
			}
			return {
				...base,
				outcome,
				resolved_path: lookup.path
			};
		};
		platformLoadability = (context, image) => {
			const { platforms: processPlatforms } = context;
			const { file_type_code: fileType, platforms: imagePlatforms } = image;
			let effectiveImagePlatforms = imagePlatforms;
			let basis;
			if (imagePlatforms.length === 0) {
				if (context.executable !== null && processPlatforms.length === 1 && processPlatforms[0] === IMPLICIT_MACOS_PLATFORM && MACOS_DYLD_IMPLICIT_PLATFORM_CPU_TYPES.has(image.cpu_type)) {
					effectiveImagePlatforms = [IMPLICIT_MACOS_PLATFORM];
					basis = "macos-dyld-implicit";
				} else return { outcome: "unknown" };
			}
			if (processPlatforms.length === 0) return { outcome: "unknown" };
			const outcomes = processPlatforms.map((processPlatform) => imageLoadabilityForPlatform(processPlatform, effectiveImagePlatforms, fileType, image.architecture));
			if (outcomes.every((outcome) => outcome === "compatible")) return {
				outcome: "compatible",
				...basis === undefined ? {} : { basis }
			};
			if (outcomes.every((outcome) => outcome === "incompatible")) return {
				outcome: "incompatible",
				...basis === undefined ? {} : { basis }
			};
			return {
				outcome: "unknown",
				...basis === undefined ? {} : { basis }
			};
		};
		imageLoadabilityForPlatform = (processPlatform, imagePlatforms, fileType, architecture) => {
			if (imagePlatforms.includes(processPlatform)) return "compatible";
			if (processPlatform === 6 && imagePlatforms.includes(1)) return "compatible";
			if (processPlatform === 2 && imagePlatforms.includes(6)) return "compatible";
			if (processPlatform === 2 && imagePlatforms.includes(11)) return "compatible";
			if (processPlatform === 7 && imagePlatforms.includes(12)) return "compatible";
			if (processPlatform === 1 && fileType === 2 && imagePlatforms.includes(6)) return "compatible";
			if (processPlatform === 2 && imagePlatforms.includes(1) && architecture.startsWith("arm64") || [
				7,
				8,
				9
			].includes(processPlatform) && imagePlatforms.includes(1)) return "unknown";
			if (isKnownPlatform(processPlatform) && imagePlatforms.every(isKnownPlatform)) return "incompatible";
			return "unknown";
		};
		isKnownPlatform = (platform) => platform >= 1 && platform <= 12;
		imageFacts = async (context, path) => {
			const known = context.images.get(path);
			if (known !== undefined) return known;
			const facts = await context.view.image(path);
			context.images.set(path, facts);
			return facts;
		};
		resolution = (candidates) => {
			let external = false;
			for (const candidate of candidates) {
				if (candidate.outcome === "resolved") return {
					status: external ? "conditional" : "resolved",
					image: candidate.resolved_path
				};
				if (candidate.outcome === "outside-target" || candidate.outcome === "escapes-target" || candidate.outcome === "unsupported" || candidate.outcome === "undetermined") external = true;
			}
			return {
				status: external ? "undetermined" : "unresolved",
				image: null
			};
		};
		resolveDependency = async (dependency, expansion, context) => {
			const { image: loader, chain, conditional: loaderConditional } = expansion;
			const loaded = dependency.install_name.startsWith("@rpath/") ? context.byInstallName.get(dependency.install_name) : undefined;
			const candidates = [];
			if (loaded !== undefined) candidates.push({
				path: dependency.install_name,
				source: "already-loaded",
				rpath: null,
				rpath_owner: null,
				outcome: "resolved",
				resolved_path: loaded
			});
			else for (const template of candidateTemplates(dependency, loader, context, chain)) {
				const candidate = await evaluateCandidate(template, context);
				candidates.push(candidate);
				if (candidate.outcome === "resolved") break;
			}
			const modeled = resolution(candidates);
			const searchUnknown = loaded === undefined && hasApplicableDyldOverrides(context.searchOverrides, dependency.install_name, modeled.image !== null);
			if (searchUnknown) context.environmentRoots.add(context.root);
			const searched = searchUnknown ? {
				...modeled,
				status: modeled.image === null ? "undetermined" : "conditional"
			} : modeled;
			const resolved = loaded !== undefined && context.loaded.get(loaded)?.conditional === true && searched.status === "resolved" ? {
				...searched,
				status: "conditional"
			} : searched;
			const image = resolved.image === null ? undefined : context.images.get(resolved.image);
			const selection = image?.status === "parsed" ? compatibleSlice(machoImageSlices(image), context.processIdentity) : undefined;
			const slice = selection?.kind === "selected" ? selection.slice : undefined;
			return {
				root: context.root,
				architecture: context.processIdentity.architecture,
				loader,
				via: [...chain],
				...dependency,
				candidates,
				resolution: resolved,
				install_name_matches: slice === undefined || slice.install_name === null ? null : slice.install_name === dependency.install_name,
				loader_conditional: loaderConditional
			};
		};
		traceProcess = async (context, rootSlice, signal) => {
			const edges = [];
			context.loaded.set(context.root, {
				slice: rootSlice,
				conditional: false
			});
			if (rootSlice.install_name !== null && rootSlice.install_name.startsWith("@rpath/")) context.byInstallName.set(rootSlice.install_name, context.root);
			const expanded = new Set();
			const pending = [{
				image: context.root,
				chain: [context.root],
				conditional: false
			}];
			while (pending.length > 0) {
				if (signal?.aborted) throw cancelledBy("trace_dylib_resolution", signal);
				const next = pending.pop();
				if (next === undefined || expanded.has(next.image)) continue;
				const loader = next.image;
				const loaded = context.loaded.get(loader);
				if (loaded === undefined) continue;
				expanded.add(loader);
				const current = {
					...next,
					conditional: loaded.conditional || next.conditional
				};
				const dependents = [];
				for (const dependency of loaded.slice.dependencies) {
					const edge = await resolveDependency(dependency, current, context);
					edges.push(edge);
					if (isLazyLoadCommand(dependency.command)) continue;
					const image = edge.resolution.image;
					if (image === null || expanded.has(image)) continue;
					const conditional = current.conditional || edge.resolution.status === "conditional";
					dependents.push({
						image,
						chain: [...next.chain, image],
						conditional
					});
					if (context.loaded.has(image)) continue;
					const facts = context.images.get(image);
					const selection = facts?.status === "parsed" ? compatibleSlice(machoImageSlices(facts), context.processIdentity) : undefined;
					if (selection?.kind !== "selected") continue;
					const { slice } = selection;
					context.loaded.set(image, {
						slice,
						conditional
					});
					if (slice.install_name !== null && slice.install_name.startsWith("@rpath/") && !context.byInstallName.has(slice.install_name)) context.byInstallName.set(slice.install_name, image);
				}
				for (const dependent of dependents.reverse()) pending.push(dependent);
			}
			return edges;
		};
		projectTraceResult = (input) => {
			const reported = [...input.images.entries()].filter(([, facts]) => facts.status !== "not-mach-o").sort(([left], [right]) => compare(left, right));
			const unparsed = reported.filter(([, facts]) => facts.status !== "parsed").map(([path]) => path);
			return {
				roots: input.roots,
				images: reported.map(([path, facts]) => ({
					path,
					parse_status: facts.status === "not-mach-o" ? "unsupported" : facts.status,
					reason: facts.status === "parsed" || facts.status === "not-mach-o" ? null : facts.reason,
					slices: facts.status === "parsed" ? machoImageSlices(facts).map(withoutDependencies) : []
				})),
				edges: [...input.edges],
				findings: deriveFindings(input.edges, input.rootSlices),
				coverage: {
					status: unparsed.length === 0 && input.withoutArchitecture.length === 0 && input.environmentRoots.size === 0 && input.unknownArchitectureCandidates.size === 0 && input.unknownPlatformCandidates.size === 0 && input.undecodableSymlinkTargets.size === 0 && input.rootEnumeration?.status !== "unknown" ? "complete" : "partial",
					unparsed_images: unparsed,
					roots_without_architecture: [...input.withoutArchitecture]
				},
				limitations: [
					...DYLIB_RESOLUTION_LIMITATIONS,
					...input.rootEnumeration?.limitations ?? [],
					...input.undecodableSymlinkTargets.size === 0 ? [] : [`Symlink targets cannot be represented as UTF-8; their paths and stored target bytes (hex) are ${JSON.stringify(Object.fromEntries(input.undecodableSymlinkTargets))}. Affected dependency resolution remains undetermined.`],
					...input.environmentRoots.size === 0 ? [] : [`Roots ${[...input.environmentRoots].join(", ")} request applicable image-selection inputs through LC_DYLD_ENVIRONMENT that are not modeled; affected dependencies or inserted images remain uncertain.`],
					...input.unknownArchitectureCandidates.size === 0 ? [] : [`In-root dylib candidates ${[...input.unknownArchitectureCandidates].sort(compare).join(", ")} have unknown architecture compatibility and are not treated as incompatible. Their dependent graphs may be incomplete.`],
					...input.unknownPlatformCandidates.size === 0 ? [] : [`In-root dylib candidates ${[...input.unknownPlatformCandidates].sort(compare).join(", ")} have unknown platform compatibility and are not treated as incompatible. Their dependent graphs may be incomplete.`],
					...input.implicitMacOSPlatformCandidates.size === 0 ? [] : [`In-root dylib candidates ${[...input.implicitMacOSPlatformCandidates].sort(compare).join(", ")} have no observed platform load command; macOS compatibility was derived from dyld's implicit-platform rule for an executable root with explicit macOS platform and a supported CPU type. Reported platform facts remain unchanged.`]
				]
			};
		};
		traceDylibLoading = async (view, request) => {
			const images = new Map();
			for (const path of request.unclassified ?? []) images.set(path, await view.image(path));
			const roots = [];
			const rootSlices = [];
			const edges = [];
			const withoutArchitecture = [];
			const environmentRoots = new Set();
			const unknownArchitectureCandidates = new Set();
			const unknownPlatformCandidates = new Set();
			const undecodableSymlinkTargets = new Map();
			const implicitMacOSPlatformCandidates = new Set();
			for (const root of request.roots) {
				const facts = await view.image(root);
				images.set(root, facts);
				if (facts.status !== "parsed") continue;
				const slices = machoImageSlices(facts).filter(({ architecture }) => request.architecture === undefined || machoArchitectureFamily(architecture) === request.architecture);
				if (slices.length === 0) withoutArchitecture.push(root);
				for (const slice of slices) {
					const executable = slice.file_type === "execute" ? root : null;
					const searchOverrides = executable === null ? [] : embeddedDyldOverrides(slice.dyld_environment, slice.platforms);
					if (searchOverrides.some(({ variable, value }) => variable === "DYLD_INSERT_LIBRARIES" && value !== "")) environmentRoots.add(root);
					roots.push({
						image: root,
						architecture: slice.architecture
					});
					rootSlices.push({
						image: root,
						slice
					});
					appendAll(edges, await traceProcess({
						view,
						root,
						processIdentity: {
							architecture: slice.architecture,
							cpu_type: slice.cpu_type,
							cpu_subtype: slice.cpu_subtype
						},
						searchOverrides,
						environmentRoots,
						unknownArchitectureCandidates,
						unknownPlatformCandidates,
						undecodableSymlinkTargets,
						implicitMacOSPlatformCandidates,
						platforms: slice.platforms,
						executable,
						loaded: new Map(),
						byInstallName: new Map(),
						images
					}, slice, request.signal));
				}
			}
			return projectTraceResult({
				images,
				roots,
				rootSlices,
				edges,
				withoutArchitecture,
				environmentRoots,
				unknownArchitectureCandidates,
				unknownPlatformCandidates,
				undecodableSymlinkTargets,
				implicitMacOSPlatformCandidates,
				rootEnumeration: request.rootEnumeration
			});
		};
		withoutDependencies = (slice) => ({
			architecture: slice.architecture,
			...slice.hidden === undefined ? {} : { hidden: slice.hidden },
			slice_offset: slice.slice_offset,
			slice_size: slice.slice_size,
			cpu_type: slice.cpu_type,
			cpu_subtype: slice.cpu_subtype,
			fat_cpu_type: slice.fat_cpu_type,
			fat_cpu_subtype: slice.fat_cpu_subtype,
			fat_alignment_exponent: slice.fat_alignment_exponent,
			file_type: slice.file_type,
			file_type_code: slice.file_type_code,
			platform: slice.platform,
			platforms: slice.platforms,
			install_name: slice.install_name,
			rpaths: slice.rpaths,
			dyld_environment: slice.dyld_environment,
			code_signature_present: slice.code_signature_present
		});
		compare = (left, right) => left < right ? -1 : left > right ? 1 : 0;
	})))();
}

//#endregion
//#region dist/domain/apple/keyedArchive.js
var KeyedArchiveKindError, keyedArchiveInputSchema, linkSchema, keyedArchiveResultSchema, record, uid, archiverMismatch, KEYED_ARCHIVE_FORMAT, MAX_OBJECT_TABLE_ENTRIES, MAX_VALUES_PER_SCAN, MAX_REFERENCE_EDGES, projectKeyedArchive;
function init_keyedArchive() {
	return (init_keyedArchive = __esmMin((() => {
		init_bundleResourceRoot();
		init_analysisErrorCore();
		init_jsonValue();
		init_localPath();
		init_plistUid();
		init_parseFailure();
		init_plistValue();
		KeyedArchiveKindError = class extends ParseFailureError {
			fileKind;
			name = "KeyedArchiveKindError";
			constructor(message, fileKind) {
				super({
					kind: "unsupported",
					format: "keyed-archive",
					detail: message,
					undecodedContent: false
				});
				this.fileKind = fileKind;
			}
		};
		keyedArchiveInputSchema = z.strictObject({
			path: localPathStringSchema.default("."),
			root: z.string().optional(),
			offset: z.number().int().min(0).default(0),
			limit: z.number().int().min(1).max(2e4).default(2e4)
		});
		linkSchema = z.strictObject({
			source: z.int().nonnegative().nullable(),
			path: z.array(z.union([z.string(), z.int().nonnegative()])),
			target: z.int().nonnegative().nullable(),
			status: z.enum([
				"resolved",
				"nil",
				"unresolved",
				"malformed"
			]),
			raw: jsonValueSchema
		});
		keyedArchiveResultSchema = bundleResourceBoundResultSchema(z.string(), {
			archive_path: z.string(),
			archive_sha256: z.string(),
			archive_format: z.enum(["binary-plist", "xml-plist"]),
			roots: jsonObjectSchema,
			objects: z.array(z.strictObject({
				id: z.int().nonnegative(),
				kind: z.enum([
					"nil",
					"scalar",
					"array",
					"dictionary",
					"class-descriptor",
					"archived-object"
				]),
				class_id: z.int().nonnegative().nullable(),
				class_name: z.string().nullable(),
				status: z.enum([
					"observed",
					"unknown-class",
					"unresolved-class",
					"nil"
				]),
				value: jsonValueSchema
			})),
			references: z.array(linkSchema),
			total_objects: z.int().nonnegative(),
			total_references: z.int().nonnegative(),
			offset: z.int().nonnegative(),
			next_offset: z.int().nonnegative().nullable(),
			truncated: z.boolean(),
			limitations: z.array(z.string())
		});
		record = (value, wrappedScalars) => value !== null && typeof value === "object" && !Array.isArray(value) && !wrappedScalars.has(value) ? value : undefined;
		uid = (value, wrappedScalars) => {
			const object = record(value, wrappedScalars);
			return object === undefined ? undefined : plistUidValue(object);
		};
		archiverMismatch = (archive) => {
			if (archive === undefined) return "its root is not a dictionary";
			if (!Object.hasOwn(archive, "$archiver")) return "it has no $archiver key";
			return typeof archive.$archiver === "string" ? `its $archiver is ${JSON.stringify(archive.$archiver)}` : "its $archiver is not a string";
		};
		KEYED_ARCHIVE_FORMAT = "keyed-archive";
		MAX_OBJECT_TABLE_ENTRIES = 2e5;
		MAX_VALUES_PER_SCAN = 2e5;
		MAX_REFERENCE_EDGES = 2e5;
		projectKeyedArchive = (value, selection) => {
			const wrappedScalars = new WeakSet();
			const projected = projectPlistValue(value, (scalar) => wrappedScalars.add(scalar));
			const archive = record(projected.value, wrappedScalars);
			if (archive?.$archiver !== "NSKeyedArchiver") throw new KeyedArchiveKindError(`Selected property list is not an NSKeyedArchiver archive: ${archiverMismatch(archive)}`, "property-list");
			if (!Array.isArray(archive.$objects)) throw malformedInput(KEYED_ARCHIVE_FORMAT, "Expected NSKeyedArchiver with an $objects array", { field: "$objects" });
			const table = archive.$objects;
			if (table.length > MAX_OBJECT_TABLE_ENTRIES) throw decodeLimit(KEYED_ARCHIVE_FORMAT, `Archive exceeds ${String(MAX_OBJECT_TABLE_ENTRIES)} object-table entries`, {
				name: "keyed-archive-object-table-entries",
				maximum: MAX_OBJECT_TABLE_ENTRIES
			});
			const top = record(archive.$top, wrappedScalars);
			if (top === undefined || Object.keys(top).length === 0) throw malformedInput(KEYED_ARCHIVE_FORMAT, "Keyed archive has no $top roots", { field: "$top" });
			if (selection.root !== undefined && !Object.hasOwn(top, selection.root)) throw new AnalysisInputError("inspect_keyed_archive", undefined, [{
				path: ["root"],
				reason: "invalid_value",
				message: `Archive root does not exist: ${selection.root}. Select one of the archive's $top roots or omit root.`,
				expected: Object.keys(top)
			}]);
			const roots = selection.root === undefined ? top : { [selection.root]: top[selection.root] ?? null };
			const references = [];
			const scan = (source, initial) => {
				const pending = initial;
				let visited = 0;
				while (pending.length > 0) {
					const item = pending.pop();
					if (item === undefined) break;
					if (++visited > MAX_VALUES_PER_SCAN) throw decodeLimit(KEYED_ARCHIVE_FORMAT, `Archive exceeds ${String(MAX_VALUES_PER_SCAN)} values per object`, {
						name: "keyed-archive-values-per-object",
						maximum: MAX_VALUES_PER_SCAN
					});
					const target = uid(item.value, wrappedScalars);
					if (target !== undefined) {
						const index = Number.isSafeInteger(target) && target >= 0 ? target : null;
						references.push({
							source,
							path: item.path,
							target: index,
							raw: item.value,
							status: index === null ? "malformed" : index >= table.length ? "unresolved" : index === 0 && table[0] === "$null" ? "nil" : "resolved"
						});
					} else if (Array.isArray(item.value)) {
						for (let index = item.value.length - 1; index >= 0; index--) {
							const child = item.value[index];
							if (child !== undefined) pending.push({
								value: child,
								path: [...item.path, index]
							});
						}
					} else {
						const fields = record(item.value, wrappedScalars);
						if (fields !== undefined) for (const key of Object.keys(fields).sort().reverse()) {
							const child = fields[key];
							if (child !== undefined) pending.push({
								value: child,
								path: [...item.path, key]
							});
						}
					}
					if (references.length > MAX_REFERENCE_EDGES) throw decodeLimit(KEYED_ARCHIVE_FORMAT, `Archive exceeds ${String(MAX_REFERENCE_EDGES)} reference edges`, {
						name: "keyed-archive-reference-edges",
						maximum: MAX_REFERENCE_EDGES
					});
				}
			};
			scan(null, Object.keys(roots).sort().reverse().flatMap((key) => {
				const value = roots[key];
				return value === undefined ? [] : [{
					value,
					path: [key]
				}];
			}));
			const objects = table.map((value, id) => {
				scan(id, [{
					value,
					path: []
				}]);
				const fields = record(value, wrappedScalars);
				const classUid = uid(fields?.$class, wrappedScalars);
				const classId = classUid !== undefined && Number.isSafeInteger(classUid) && classUid >= 0 ? classUid : null;
				const descriptor = classId === null ? undefined : record(table[classId], wrappedScalars);
				const className = typeof descriptor?.$classname === "string" ? descriptor.$classname : null;
				const isNil = id === 0 && value === "$null";
				return {
					id,
					kind: isNil ? "nil" : Array.isArray(value) ? "array" : fields === undefined ? "scalar" : typeof fields.$classname === "string" ? "class-descriptor" : Object.hasOwn(fields, "$class") ? "archived-object" : "dictionary",
					class_id: classId,
					class_name: className,
					status: isNil ? "nil" : fields !== undefined && Object.hasOwn(fields, "$class") ? className === null ? "unresolved-class" : "unknown-class" : "observed",
					value
				};
			});
			const end = Math.min(objects.length, selection.offset + selection.limit);
			const page = objects.slice(selection.offset, end);
			const ids = new Set(page.map(({ id }) => id));
			return {
				nonFiniteRealCount: projected.nonFiniteRealCount,
				negativeZeroRealCount: projected.negativeZeroRealCount,
				unknownDateCount: projected.unknownDateCount,
				unknownScalarCount: projected.unknownScalarCount,
				roots,
				objects: page,
				references: references.filter(({ source }) => source === null || ids.has(source)),
				total_objects: objects.length,
				total_references: references.length,
				offset: selection.offset,
				next_offset: end < objects.length ? end : null,
				truncated: page.length !== objects.length,
				limitations: [
					"Archive classes are never instantiated. Class names and serialized fields are observed; class-specific semantics are unknown.",
					"Conditional references serialized as UID 0 cannot be distinguished from ordinary nil references. Missing fields remain absent in the raw serialized value.",
					"Root selection selects the named $top entry; object pagination retains original indices and does not recursively expand references."
				]
			};
		};
	})))();
}

//#endregion
//#region dist/domain/apple/appleAssetCatalog.js
var RESOURCE_KEY_FIELDS, appleResourceKeyFields, appleAssetCatalogInputSchema, catalogSchema, recordSchema, resourceKeyMatchSchema, analysisCoverageSchema, appleAssetCatalogResultSchema, parseAppleAssetCatalogRecords, projectAppleAssetCatalogPage;
function init_appleAssetCatalog() {
	return (init_appleAssetCatalog = __esmMin((() => {
		init_coverage();
		init_bundleResourceRoot();
		init_jsonValue();
		init_analysisErrorCore();
		init_artifactGraph();
		RESOURCE_KEY_FIELDS = new Set([
			"image",
			"imageName",
			"image_name",
			"resourceName",
			"resource_name",
			"assetName",
			"asset_name",
			"UIImageName",
			"NSImageName",
			"NSResourceName"
		]);
		appleResourceKeyFields = (attributes) => Object.entries(attributes).filter((entry) => RESOURCE_KEY_FIELDS.has(entry[0]) && typeof entry[1] === "string" && entry[1].length > 0);
		appleAssetCatalogInputSchema = z.strictObject({
			offset: z.int().min(0).default(0),
			limit: z.int().min(1).max(1e4).default(1e3)
		});
		catalogSchema = z.strictObject({
			path: z.string().min(1),
			sha256: z.string().regex(/^[a-f0-9]{64}$/u),
			record_count: z.int().nonnegative()
		});
		recordSchema = z.strictObject({
			catalog_path: z.string().min(1),
			catalog_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
			index: z.int().nonnegative(),
			kind: z.enum(["catalog", "rendition"]),
			asset_name: z.string().nullable(),
			rendition_name: z.string().nullable(),
			metadata: jsonObjectSchema
		});
		resourceKeyMatchSchema = z.strictObject({
			source_node_id: z.string().min(1),
			source_path: z.string().min(1),
			source_archive_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
			field: z.string().min(1),
			key: z.string().min(1),
			status: z.enum([
				"matched",
				"ambiguous",
				"unmatched"
			]),
			renditions: z.array(z.strictObject({
				catalog_path: z.string().min(1),
				catalog_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
				record_index: z.int().nonnegative(),
				rendition_name: z.string().nullable()
			}))
		});
		analysisCoverageSchema = z.strictObject({
			status: coverageStatusSchema,
			reason: z.string().nullable()
		});
		appleAssetCatalogResultSchema = bundleResourceBoundResultSchema(z.string().regex(/^[a-f0-9]{64}$/u), {
			catalogs: z.array(catalogSchema),
			inventory_coverage: artifactInventoryCoverageSchema,
			catalog_coverage: analysisCoverageSchema.default({
				status: "unknown",
				reason: "catalog_coverage_not_reported"
			}),
			resource_key_coverage: analysisCoverageSchema.default({
				status: "unknown",
				reason: "resource_key_coverage_not_reported"
			}),
			total_records: z.int().nonnegative(),
			offset: z.int().nonnegative(),
			limit: z.int().positive(),
			records: z.array(recordSchema),
			resource_key_matches: z.array(resourceKeyMatchSchema),
			next_offset: z.int().nonnegative().nullable(),
			truncated: z.boolean(),
			limitations: z.array(z.string())
		});
		parseAppleAssetCatalogRecords = (value) => {
			if (!Array.isArray(value)) throw new AnalysisOutputError("inspect_asset_catalog", "assetutil output must be a JSON array");
			return value.map((record, index) => {
				const parsed = jsonObjectSchema.safeParse(record);
				if (!parsed.success) throw new AnalysisOutputError("inspect_asset_catalog", `assetutil record ${index} is not a JSON object`, { cause: parsed.error });
				return parsed.data;
			});
		};
		projectAppleAssetCatalogPage = (input) => {
			const all = input.catalogs.flatMap((catalog) => catalog.records.map((metadata, index) => ({
				catalog_path: catalog.path,
				catalog_sha256: catalog.sha256,
				index,
				kind: typeof metadata.RenditionName === "string" || typeof metadata.Name === "string" ? "rendition" : "catalog",
				asset_name: typeof metadata.Name === "string" ? metadata.Name : null,
				rendition_name: typeof metadata.RenditionName === "string" ? metadata.RenditionName : null,
				metadata
			})));
			const records = all.slice(input.offset, input.offset + input.limit);
			const next = input.offset + records.length;
			const recordsByAssetName = new Map();
			for (const record of all) {
				if (record.kind !== "rendition" || record.asset_name === null) continue;
				const matches = recordsByAssetName.get(record.asset_name) ?? [];
				matches.push(record);
				recordsByAssetName.set(record.asset_name, matches);
			}
			const resourceKeyMatches = (input.resourceReferences ?? []).map((source) => {
				const matches = recordsByAssetName.get(source.key) ?? [];
				return {
					source_node_id: source.sourceNodeId,
					source_path: source.sourcePath,
					source_archive_sha256: source.sourceArchiveSha256,
					field: source.field,
					key: source.key,
					status: matches.length === 0 ? "unmatched" : matches.length === 1 ? "matched" : "ambiguous",
					renditions: matches.map((record) => ({
						catalog_path: record.catalog_path,
						catalog_sha256: record.catalog_sha256,
						record_index: record.index,
						rendition_name: record.rendition_name
					}))
				};
			});
			return appleAssetCatalogResultSchema.parse({
				inventory_coverage: input.inventoryCoverage ?? {
					scope: "container-entries",
					status: "unknown"
				},
				catalog_coverage: input.catalogCoverage ?? {
					status: "unknown",
					reason: "catalog_coverage_not_reported"
				},
				resource_key_coverage: input.resourceKeyCoverage ?? {
					status: "unknown",
					reason: "resource_key_coverage_not_reported"
				},
				target_sha256: input.targetSha256,
				...input.resourceRoot === undefined ? {} : { resource_root: input.resourceRoot },
				catalogs: input.catalogs.map(({ path, sha256, records: catalogRecords }) => ({
					path,
					sha256,
					record_count: catalogRecords.length
				})),
				total_records: all.length,
				offset: input.offset,
				limit: input.limit,
				records,
				resource_key_matches: resourceKeyMatches,
				next_offset: next < all.length ? next : null,
				truncated: records.length !== all.length,
				limitations: ["Rendition metadata is reported as emitted by the installed assetutil version; private fields and platform-specific interpretations are not normalized.", "Asset catalog inspection does not decode or extract rendition image bytes."]
			});
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedMemberComparisonCoverage.js
var buildComparisonCoverage, hasCompleteMethodRows, sameMethodRows, unavailableTypeNames, comparisonSideScope, observedBy, compareSelectedTypes, managedComparisonScope, resourceLimits, sideManifest, buildComparisonSummary, buildComparisonMatching, capacityLimitations, comparisonLimitations;
function init_managedMemberComparisonCoverage() {
	return (init_managedMemberComparisonCoverage = __esmMin((() => {
		init_managedModuleIdentity();
		init_coverage();
		init_managedArtifact();
		buildComparisonCoverage = ({ left, right, scope }) => {
			const joined = joinCoverageStatus([
				managedInspectionCoverage(left.coverage.state),
				managedInspectionCoverage(right.coverage.state),
				scope.left.hasEmptyDefinitionName || scope.right.hasEmptyDefinitionName ? "partial" : "complete",
				scope.agreement === "unknown" ? "unknown" : scope.agreement === "different" || !sameMethodRows(left, right) ? "partial" : "complete"
			]);
			return {
				status: joined === "complete" ? "complete-within-inputs" : joined,
				left_status: left.coverage.state,
				right_status: right.coverage.state
			};
		};
		hasCompleteMethodRows = (result) => result.method_rows !== null && result.method_rows.offset === 0 && result.method_rows.count === result.method_rows.total;
		sameMethodRows = (left, right) => hasCompleteMethodRows(left) && hasCompleteMethodRows(right) || left.method_rows !== null && right.method_rows !== null && left.method_rows.offset === right.method_rows.offset && left.method_rows.count === right.method_rows.count && left.method_rows.total === right.method_rows.total;
		unavailableTypeNames = (types) => {
			const unavailable = new Set(types.filter(({ name }) => name === "").map(({ token }) => token));
			if (unavailable.size === 0) return unavailable;
			const children = new Map();
			for (const { token, enclosing_type_token: enclosing } of types) {
				if (enclosing === null) continue;
				const existing = children.get(enclosing);
				if (existing === undefined) children.set(enclosing, [token]);
				else existing.push(token);
			}
			for (const token of unavailable) for (const child of children.get(token) ?? []) unavailable.add(child);
			return unavailable;
		};
		comparisonSideScope = (result) => {
			const unavailable = unavailableTypeNames(result.types);
			const names = new Map(result.types.map((type) => [type.token, unavailable.has(type.token) ? null : type.name_sha256]));
			const hasEmptyTypeName = unavailable.size > 0;
			const emptyMemberNames = new Set();
			for (const definitions of [result.methods, result.fields]) for (const member of definitions) if (member.name === "") emptyMemberNames.add(member);
			const emptyFieldTokens = new Set(result.fields.filter((field) => emptyMemberNames.has(field)).map(({ token }) => token));
			for (const access of result.field_accesses) if (access.field_name === "" && access.field_token.startsWith("0x04")) emptyFieldTokens.add(access.field_token);
			const hasEmptyDefinitionName = hasEmptyTypeName || emptyMemberNames.size > 0 || emptyFieldTokens.size > 0;
			const metadataComplete = result.metadata.status === "complete" && !hasEmptyDefinitionName;
			return {
				names,
				emptyMemberNames,
				emptyFieldTokens,
				hasEmptyDefinitionName,
				metadataComplete,
				selected: result.selection === null ? null : new Set([...names.values()].filter((name) => name !== null)),
				complete: result.coverage.state === "complete" && result.metadata.status === "complete" && !hasEmptyTypeName && result.types.every(({ name_sha256 }) => name_sha256 !== null)
			};
		};
		observedBy = (own, opposite, member) => {
			if (opposite.selected === null) return true;
			const name = own.names.get(member.declaring_type_token ?? "");
			return name != null && opposite.selected.has(name);
		};
		compareSelectedTypes = (left, right) => {
			const leftNames = left.selected;
			const rightNames = right.selected;
			if (leftNames === null || rightNames === null) return leftNames === rightNames ? "same" : "different";
			if (!left.complete || !right.complete) return "unknown";
			return leftNames.size === rightNames.size && [...leftNames].every((name) => rightNames.has(name)) ? "same" : "different";
		};
		managedComparisonScope = (left, right) => {
			const a = comparisonSideScope(left);
			const b = comparisonSideScope(right);
			return {
				left: a,
				right: b,
				inLeft: (member) => observedBy(b, a, member),
				inRight: (member) => observedBy(a, b, member),
				agreement: compareSelectedTypes(a, b)
			};
		};
		resourceLimits = (result) => result.coverage.issues.flatMap(({ code, scope, detail, offset, limit }) => code === "resource-limit" ? [{
			code,
			scope,
			detail,
			offset,
			...limit === undefined ? {} : { limit }
		}] : []);
		sideManifest = (side) => {
			const module = managedModuleRow(side.result);
			return {
				evidence_id: side.evidenceId,
				artifact_sha256: side.result.artifact.sha256,
				mvid: module?.mvid ?? null,
				module_name: module?.name ?? null,
				metadata_status: side.result.metadata.status,
				methods_total: side.result.methods.length,
				fields_total: side.result.fields.length,
				resource_limits: resourceLimits(side.result)
			};
		};
		buildComparisonSummary = (items) => ({
			unchanged: items.filter(({ status }) => status === "unchanged").length,
			changed: items.filter(({ status }) => status === "changed").length,
			added: items.filter(({ status }) => status === "added").length,
			removed: items.filter(({ status }) => status === "removed").length,
			unknown: items.filter(({ status }) => status === "unknown").length
		});
		buildComparisonMatching = (methodItems, fieldItems) => ({
			exact_il_signature: methodItems.filter(({ match }) => match.basis === "exact-il-signature").length,
			exact_signature: [...methodItems, ...fieldItems].filter(({ match }) => match.basis === "exact-signature").length,
			structural_method_shape: methodItems.filter(({ match }) => match.basis === "structural-method-shape").length,
			field_signature: fieldItems.filter(({ match }) => match.basis === "field-signature").length,
			ambiguous: methodItems.filter(({ match }) => match.status === "ambiguous").length + fieldItems.filter(({ match }) => match.status === "ambiguous").length,
			unmatched: [...methodItems, ...fieldItems].filter(({ match }) => match.status === "unmatched").length
		});
		capacityLimitations = (left, right) => {
			const exceeded = new Set(["left", "right"].flatMap((side) => resourceLimits(side === "left" ? left : right).map(({ scope, detail }) => `The ${side} managed member observation exceeded capacity at ${scope}: ${detail}. Its member collections are not examined to completion, so empty or missing members do not establish absence, addition or removal.`)));
			return exceeded.size === 0 ? [] : [...exceeded, "Compare a smaller selection by inspecting both sides with the same type_names, or by passing --type to CLI compare-managed-members; a single selected type can still exceed capacity."];
		};
		comparisonLimitations = (left, right, scope = managedComparisonScope(left, right)) => {
			const limitations = [
				"Metadata tokens are build-local coordinates; matched pairs are remaps, not persistent identities.",
				"Methods pair within one declared type and name by exact CIL/signature, then signature, then structural shape; only then may exact CIL/signature or structural shape alone remap across declared types or names, never taking a member whose own declared type and name remain unpaired on the other side or whose declaring type is unresolved. Names alone are never a matching basis.",
				"Fields pair by declared type, name, and signature, then remap by exact decoded signature alone under the same rule; an undecoded signature is compared only for an exact signature match, and an unmatched member with one stays unknown."
			];
			if ([left, right].some((report) => report.fields.some((field) => field.constant != null))) limitations.push("Field Constant-table defaults are not compared; field matching and change detection cover names, flags and signatures only.");
			const namesTypes = (result) => result.methods.some(({ signature }) => signature.resolved_sha256 !== null && signature.resolved_sha256 !== signature.raw_sha256) || result.fields.some(({ signature }) => signature.resolved_sha256 !== null && signature.resolved_sha256 !== signature.raw_sha256);
			if (namesTypes(left) || namesTypes(right)) limitations.push("Signature type operands compare by namespace, name, and enclosing names only; defining assemblies and CLR type identity are not established by this comparison.");
			if (left.coverage.state !== "complete" || right.coverage.state !== "complete") limitations.push("At least one managed member observation is partial.");
			if (scope.left.hasEmptyDefinitionName || scope.right.hasEmptyDefinitionName) limitations.push("Recorded empty definition names leave nominal identities unresolved. The comparison has partial name coverage even if a source reported complete metadata.");
			for (const limitation of capacityLimitations(left, right)) limitations.push(limitation);
			if (scope.agreement === "different") limitations.push("The observations select different declaring types; a member outside the other side's selection is unknown, not added or removed.");
			else if (scope.agreement === "unknown") limitations.push("Selected declaring-type scope agreement is unknown because at least one observation is incomplete or lacks resolved nominal type identities; matching request names do not establish the same observed scope.");
			else if (left.selection !== null && left.types.length === 0) limitations.push("Both observations select no observed declaring types; requested and unmatched names remain in each source selection.");
			else if (left.selection !== null) limitations.push(`Both observations cover only the selected declaring types (${[...new Set(left.types.map(({ full_name }) => full_name))].join(", ")}); member totals and statuses describe those types, not the whole assembly.`);
			if (!hasCompleteMethodRows(left) || !hasCompleteMethodRows(right)) limitations.push("At least one observation lacks a complete MethodDef row inventory; paged or unrecorded method scope cannot establish cross-build method absence. Row intervals are reported in method_rows and describe build-local selections.");
			if (left.exported_types === null || right.exported_types === null) limitations.push("At least one managed member observation did not examine ExportedType rows; its exported and forwarded types are unknown.");
			if ((left.exported_types?.length ?? 0) > 0 || (right.exported_types?.length ?? 0) > 0) limitations.push("ExportedType rows, including type forwarders, are observed but not compared; an unchanged comparison does not establish an unchanged exported or forwarded type set.");
			limitations.push("ldstr literals are not compared; normalized CIL keeps #US tokens rather than decoded text, so an unchanged method does not establish unchanged string literals.");
			return limitations;
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedMemberSignatureIdentity.js
var signatureIdentity;
function init_managedMemberSignatureIdentity() {
	return (init_managedMemberSignatureIdentity = __esmMin((() => {
		signatureIdentity = ({ raw_sha256, resolved_sha256 }) => resolved_sha256 === null ? `raw:${raw_sha256}` : `resolved:${resolved_sha256}`;
	})))();
}

//#endregion
//#region dist/domain/managed/managedMemberInstructionFacts.js
var isManagedMemberReferenceInstruction;
function init_managedMemberInstructionFacts() {
	return (init_managedMemberInstructionFacts = __esmMin((() => {
		isManagedMemberReferenceInstruction = (instruction) => instruction.opcode !== "ldtoken" && instruction.operand !== null && (instruction.operand_kind === "method" || instruction.operand_kind === "field");
	})))();
}

//#endregion
//#region dist/domain/managed/managedMemberComparisonItems.js
var limitation, inventoryCovers, methodDimensions, exceptionShape, compareExceptionTargets, sameAssemblyIdentity, compareReferenceTargets, compareFieldTargets, compareCallTargets, callShape, fieldShape, methodIdentity, fieldIdentity, unmatchedComparison, methodOnlyItem, absenceLimitations, unresolved, pairedSignatureLimitations, undecodedOneSidedNames, fieldOnlyItem, ambiguityLimitation, compareLocalSignatures, buildMethodItems, buildFieldItems;
function init_managedMemberComparisonItems() {
	return (init_managedMemberComparisonItems = __esmMin((() => {
		init_canonicalDigest();
		init_managedMemberSignatureIdentity();
		init_managedMemberInstructionFacts();
		limitation = (code, message, side) => side === undefined ? {
			code,
			message
		} : {
			code,
			side,
			message
		};
		inventoryCovers = (complete, observes, member) => complete && observes(member);
		methodDimensions = (left, right, leftCallEdgesByCaller, rightCallEdgesByCaller, leftFieldAccessesByCaller, rightFieldAccessesByCaller, leftAssembly, rightAssembly, sameArtifact) => {
			const dimensions = [];
			const headerFields = ["max_stack", "init_locals"];
			const headerChanged = headerFields.some((field) => left.body[field] !== null && right.body[field] !== null && left.body[field] !== right.body[field]);
			const localsPresenceChanged = left.body.status === "present" && right.body.status === "present" && left.body.local_var_sig_token !== null !== (right.body.local_var_sig_token !== null);
			if (left.flags !== right.flags || left.impl_flags !== right.impl_flags || headerChanged || localsPresenceChanged) dimensions.push("metadata");
			if (signatureIdentity(left.signature) !== signatureIdentity(right.signature)) dimensions.push("signature");
			const leftBodyComplete = left.body.status === "present" && left.body.truncated_instructions === 0;
			const rightBodyComplete = right.body.status === "present" && right.body.truncated_instructions === 0;
			const bothAbsent = left.body.status === "absent" && right.body.status === "absent";
			if (left.body.status === "absent" && rightBodyComplete || right.body.status === "absent" && leftBodyComplete) dimensions.push("availability");
			if (bothAbsent) return {
				dimensions,
				bodyUnknown: false,
				callTargetUnknown: false,
				fieldTargetUnknown: false,
				exceptionTargetUnknown: false
			};
			const sameCallShape = callShape(left.body.anchors) === callShape(right.body.anchors);
			const callTargets = sameCallShape ? compareCallTargets(left, right, leftCallEdgesByCaller.get(left.token) ?? [], rightCallEdgesByCaller.get(right.token) ?? [], sameArtifact) : {
				changed: false,
				unknown: false
			};
			const sameFieldShape = fieldShape(left.body.anchors) === fieldShape(right.body.anchors);
			const fieldTargets = sameFieldShape ? compareFieldTargets(left, right, leftFieldAccessesByCaller.get(left.token) ?? [], rightFieldAccessesByCaller.get(right.token) ?? [], sameArtifact) : {
				changed: false,
				unknown: false
			};
			const sameExceptionShape = exceptionShape(left.body.exception_regions) === exceptionShape(right.body.exception_regions);
			const exceptionTargets = sameExceptionShape ? compareExceptionTargets(left.body.exception_regions, right.body.exception_regions, leftAssembly, rightAssembly) : {
				changed: false,
				unknown: false
			};
			if (callTargets.changed) dimensions.push("call-target");
			if (fieldTargets.changed) dimensions.push("field-target");
			if (exceptionTargets.changed) dimensions.push("exception-target");
			if (!leftBodyComplete || !rightBodyComplete) return {
				dimensions,
				bodyUnknown: true,
				callTargetUnknown: callTargets.unknown,
				fieldTargetUnknown: fieldTargets.unknown,
				exceptionTargetUnknown: exceptionTargets.unknown
			};
			if (!sameCallShape) dimensions.push("call-shape");
			if (left.body.il_sha256 !== right.body.il_sha256 || left.body.normalized_il_sha256 !== right.body.normalized_il_sha256) dimensions.push("cil");
			if (canonicalize(left.body.opcode_counts) !== canonicalize(right.body.opcode_counts)) dimensions.push("opcode-shape");
			if (!sameFieldShape) dimensions.push("field-shape");
			if (!sameExceptionShape) dimensions.push("exception-shape");
			return {
				dimensions,
				callTargetUnknown: callTargets.unknown,
				fieldTargetUnknown: fieldTargets.unknown,
				exceptionTargetUnknown: exceptionTargets.unknown,
				bodyUnknown: headerFields.some((field) => left.body[field] === null || right.body[field] === null)
			};
		};
		exceptionShape = (regions) => JSON.stringify(regions.map(({ flags, try_offset, try_length, handler_offset, handler_length, filter_offset }) => [
			flags,
			try_offset,
			try_length,
			handler_offset,
			handler_length,
			filter_offset
		]));
		compareExceptionTargets = (left, right, leftAssembly, rightAssembly) => {
			let changed = false;
			let unknown = false;
			for (let index = 0; index < left.length; index += 1) {
				const leftRegion = left[index];
				const rightRegion = right[index];
				if (leftRegion === undefined || rightRegion === undefined) {
					unknown = true;
					continue;
				}
				if (leftRegion.flags !== 0) continue;
				const leftName = leftRegion.class_type_name_sha256;
				const rightName = rightRegion.class_type_name_sha256;
				if (leftName !== null && rightName !== null && leftName !== rightName) {
					changed = true;
					if (leftRegion.class_type_identity_resolved !== true || rightRegion.class_type_identity_resolved !== true) unknown = true;
					continue;
				}
				if (leftName === null || rightName === null) {
					if (leftRegion.class_type !== null && rightRegion.class_type !== null && leftRegion.class_type !== rightRegion.class_type) changed = true;
					unknown = true;
					continue;
				}
				if (leftRegion.class_type_identity_resolved !== true || rightRegion.class_type_identity_resolved !== true || leftAssembly === null || rightAssembly === null) {
					unknown = true;
					continue;
				}
				if (!sameAssemblyIdentity(leftAssembly, rightAssembly)) changed = true;
			}
			return {
				changed,
				unknown
			};
		};
		sameAssemblyIdentity = (left, right) => left.name.toLowerCase() === right.name.toLowerCase() && left.version === right.version && left.culture?.toLowerCase() === right.culture?.toLowerCase() && (left.flags & 3840) === (right.flags & 3840) && left.public_key.kind === right.public_key.kind && left.public_key.sha256 === right.public_key.sha256 && left.public_key.token === right.public_key.token;
		compareReferenceTargets = (left, right, kind, leftTargets, rightTargets, sameArtifact) => {
			const align = (method, targets) => {
				const anchors = method.body.anchors.filter((anchor) => isManagedMemberReferenceInstruction(anchor) && anchor.operand_kind === kind);
				const byOffset = new Map();
				for (const target of targets) byOffset.set(target.offset, byOffset.has(target.offset) ? null : target);
				let unknown = targets.length !== anchors.length;
				const aligned = anchors.map((anchor) => {
					const target = byOffset.get(anchor.il_offset);
					if (target == null || target.opcode !== anchor.opcode || target.token !== anchor.operand) {
						unknown = true;
						return null;
					}
					return target;
				});
				return {
					aligned,
					unknown
				};
			};
			const a = align(left, leftTargets);
			const b = align(right, rightTargets);
			let changed = false;
			let unknown = a.unknown || b.unknown || a.aligned.length !== b.aligned.length;
			for (let index = 0; index < Math.max(a.aligned.length, b.aligned.length); index += 1) {
				const leftTarget = a.aligned[index];
				const rightTarget = b.aligned[index];
				if (leftTarget == null || rightTarget == null) {
					unknown = true;
					continue;
				}
				if (leftTarget.identity != null && rightTarget.identity != null) {
					if (leftTarget.identity !== rightTarget.identity) changed = true;
					continue;
				}
				if (sameArtifact && leftTarget.rowResolved === true && left.token === right.token && rightTarget.rowResolved === true && left.signature.parse_status === "decoded" && right.signature.parse_status === "decoded" && leftTarget.identity == null && rightTarget.identity == null && leftTarget.token === rightTarget.token) continue;
				unknown = true;
			}
			return {
				changed,
				unknown
			};
		};
		compareFieldTargets = (left, right, leftAccesses, rightAccesses, sameArtifact) => compareReferenceTargets(left, right, "field", leftAccesses.map((edge) => ({
			offset: edge.il_offset,
			opcode: edge.opcode,
			token: edge.field_token,
			rowResolved: edge.target_row_resolved,
			identity: edge.target_identity_sha256
		})), rightAccesses.map((edge) => ({
			offset: edge.il_offset,
			opcode: edge.opcode,
			token: edge.field_token,
			rowResolved: edge.target_row_resolved,
			identity: edge.target_identity_sha256
		})), sameArtifact);
		compareCallTargets = (left, right, leftEdges, rightEdges, sameArtifact) => compareReferenceTargets(left, right, "method", leftEdges.map((edge) => ({
			offset: edge.il_offset,
			opcode: edge.opcode,
			token: edge.target_token,
			rowResolved: edge.target_row_resolved,
			identity: edge.target_identity_sha256
		})), rightEdges.map((edge) => ({
			offset: edge.il_offset,
			opcode: edge.opcode,
			token: edge.target_token,
			rowResolved: edge.target_row_resolved,
			identity: edge.target_identity_sha256
		})), sameArtifact);
		callShape = (anchors) => JSON.stringify(anchors.filter((instruction) => isManagedMemberReferenceInstruction(instruction) && instruction.operand_kind === "method").map(({ opcode, operand_kind }) => [opcode, operand_kind]));
		fieldShape = (anchors) => JSON.stringify(anchors.filter((instruction) => isManagedMemberReferenceInstruction(instruction) && instruction.operand_kind === "field").map(({ opcode, operand_kind }) => [opcode, operand_kind]));
		methodIdentity = (item) => ({
			token: item.token,
			declaring_type: item.declaring_type,
			name: item.name,
			signature_sha256: item.signature.raw_sha256,
			normalized_il_sha256: item.body.normalized_il_sha256
		});
		fieldIdentity = (item) => ({
			token: item.token,
			declaring_type: item.declaring_type,
			name: item.name,
			signature_sha256: item.signature.raw_sha256
		});
		unmatchedComparison = () => ({
			status: "unmatched",
			basis: "none",
			confidence: "unknown",
			candidate_left_tokens: [],
			candidate_right_tokens: []
		});
		methodOnlyItem = (member, identity, identityUnavailable, context, undecoded) => {
			if (member.left !== undefined) {
				const limitations = absenceLimitations(member.left, identity, {
					oppositeComplete: inventoryCovers(context.rightMethodsComplete, context.scope.inRight, member.left),
					unpaired: undecoded,
					ownIdentityUnavailable: identityUnavailable,
					ownNameUnavailable: context.scope.left.emptyMemberNames.has(member.left),
					opposite: "right",
					inventory: "method"
				});
				return {
					item_id: `mmc_method_${digestCanonicalValue({
						token: member.left.token,
						side: "left"
					}, "Managed comparison")}`,
					status: limitations.length === 0 ? "removed" : "unknown",
					left: methodIdentity(member.left),
					right: null,
					match: unmatchedComparison(),
					dimensions: ["availability"],
					evidence_links: [context.leftEvidenceId, context.rightEvidenceId],
					limitations
				};
			}
			const limitations = absenceLimitations(member.right, identity, {
				oppositeComplete: inventoryCovers(context.leftMethodsComplete, context.scope.inLeft, member.right),
				unpaired: undecoded,
				ownIdentityUnavailable: identityUnavailable,
				ownNameUnavailable: context.scope.right.emptyMemberNames.has(member.right),
				opposite: "left",
				inventory: "method"
			});
			return {
				item_id: `mmc_method_${digestCanonicalValue({
					token: member.right.token,
					side: "right"
				}, "Managed comparison")}`,
				status: limitations.length === 0 ? "added" : "unknown",
				left: null,
				right: methodIdentity(member.right),
				match: unmatchedComparison(),
				dimensions: ["availability"],
				evidence_links: [context.leftEvidenceId, context.rightEvidenceId],
				limitations
			};
		};
		absenceLimitations = (member, identity, opposite) => [
			...opposite.ownNameUnavailable ? [limitation("unknown-within-incomplete-metadata", `The recorded ${opposite.inventory === "method" ? "MethodDef" : "Field"} name is empty, so its nominal identity is unavailable.`)] : opposite.ownIdentityUnavailable ? [limitation("declaring-type-name-not-resolved", "Declared type identity could not be resolved; a bare display name cannot establish a counterpart or absence.")] : [],
			...!opposite.ownNameUnavailable && opposite.unpaired.unknownOwners[opposite.opposite].has(member.name) ? [limitation("counterpart-declaring-type-name-not-resolved", `The ${opposite.opposite} ${opposite.inventory} inventory has an unpaired same-named member with unresolved enclosing-name identity, so absence was not established.`, opposite.opposite)] : [],
			...opposite.oppositeComplete ? [] : [limitation("unknown-within-incomplete-metadata", `The ${opposite.opposite} ${opposite.inventory} inventory is incomplete, so absence was not observed.`, opposite.opposite)],
			...member.signature.parse_status === "decoded" ? [] : [limitation("signature-not-decoded", `The member's ${member.signature.parse_status} signature was compared only by exact declared type, name, and signature bytes, so a changed or renamed counterpart could not be sought.`)],
			...member.signature.parse_status === "decoded" && opposite.unpaired.undecoded[opposite.opposite].has(identity) ? [limitation("counterpart-signature-not-decoded", `The ${opposite.opposite} ${opposite.inventory} inventory has an unpaired member with the same declared type and name whose signature was not decoded, so it may be this member with a changed signature.`, opposite.opposite)] : [],
			...unresolved(member) ? [limitation("signature-not-resolved", `The member's signature names a type REA could not name, so it was compared by raw bytes, which name types by build-local metadata row; a counterpart whose referenced type moved rows could not be found.`)] : [],
			...member.signature.parse_status === "decoded" && !unresolved(member) && opposite.unpaired.unresolved[opposite.opposite].has(identity) ? [limitation("counterpart-signature-not-resolved", `The ${opposite.opposite} ${opposite.inventory} inventory has an unpaired member with the same declared type and name whose signature names a type REA could not name, so it may be this member.`, opposite.opposite)] : []
		];
		unresolved = (member) => member.signature.kind !== "unknown" && member.signature.resolved_sha256 === null;
		pairedSignatureLimitations = (left, right) => {
			if (left.signature.parse_status === "malformed" || right.signature.parse_status === "malformed") return [limitation("signature-malformed", "At least one signature is malformed; equal signature bytes do not establish an unchanged member signature.")];
			return unresolved(left) || unresolved(right) ? [limitation("signature-not-resolved", "At least one signature names a type REA could not resolve; equal build-local row bytes do not establish equivalent signature types.")] : [];
		};
		undecodedOneSidedNames = (members) => {
			const sides = {
				left: [...members.leftOnly, ...members.ambiguous.flatMap(({ left }) => left)],
				right: [...members.rightOnly, ...members.ambiguous.flatMap(({ right }) => right)]
			};
			const names = (side, keep) => new Set(side.filter(({ item }) => keep(item)).map(({ identity }) => identity));
			const undecoded = (item) => item.signature.parse_status !== "decoded";
			return {
				unknownOwners: {
					left: new Set(sides.left.filter((x) => x.identityUnavailable).map((x) => x.item.name)),
					right: new Set(sides.right.filter((x) => x.identityUnavailable).map((x) => x.item.name))
				},
				undecoded: {
					left: names(sides.left, undecoded),
					right: names(sides.right, undecoded)
				},
				unresolved: {
					left: names(sides.left, unresolved),
					right: names(sides.right, unresolved)
				}
			};
		};
		fieldOnlyItem = (member, identity, identityUnavailable, context, undecoded) => {
			if (member.left !== undefined) {
				const limitations = absenceLimitations(member.left, identity, {
					oppositeComplete: inventoryCovers(context.rightComplete, context.scope.inRight, member.left),
					unpaired: undecoded,
					ownIdentityUnavailable: identityUnavailable,
					ownNameUnavailable: context.scope.left.emptyMemberNames.has(member.left),
					opposite: "right",
					inventory: "field"
				});
				return {
					item_id: `mmc_field_${digestCanonicalValue({
						token: member.left.token,
						side: "left"
					}, "Managed comparison")}`,
					status: limitations.length === 0 ? "removed" : "unknown",
					left: fieldIdentity(member.left),
					right: null,
					match: unmatchedComparison(),
					evidence_links: [context.leftEvidenceId, context.rightEvidenceId],
					limitations
				};
			}
			const limitations = absenceLimitations(member.right, identity, {
				oppositeComplete: inventoryCovers(context.leftComplete, context.scope.inLeft, member.right),
				unpaired: undecoded,
				ownIdentityUnavailable: identityUnavailable,
				ownNameUnavailable: context.scope.right.emptyMemberNames.has(member.right),
				opposite: "left",
				inventory: "field"
			});
			return {
				item_id: `mmc_field_${digestCanonicalValue({
					token: member.right.token,
					side: "right"
				}, "Managed comparison")}`,
				status: limitations.length === 0 ? "added" : "unknown",
				left: null,
				right: fieldIdentity(member.right),
				match: unmatchedComparison(),
				evidence_links: [context.leftEvidenceId, context.rightEvidenceId],
				limitations
			};
		};
		ambiguityLimitation = (members, basis, identityUnavailable) => identityUnavailable ? limitation("declaring-type-name-not-resolved", "Declared type identity remains unresolved; REA did not guess a counterpart from display names, signatures or CIL.") : basis === "exact-signature" ? limitation("ambiguous-signature", `Multiple managed ${members} share the same signature; REA did not guess declared ownership or a token remap.`) : basis === "exact-il-signature" ? limitation("ambiguous-il-signature", "Multiple managed methods share the same CIL and signature; REA did not guess a token remap.") : members === "methods" ? limitation("ambiguous-method-shape", "Multiple managed methods share the same structural shape; REA did not guess a token remap.") : limitation("ambiguous-signature", "Multiple managed fields share the same signature; REA did not guess a token remap.");
		compareLocalSignatures = (left, right, sameArtifact) => {
			const leftPresent = left.body.local_var_sig_token !== null;
			const rightPresent = right.body.local_var_sig_token !== null;
			if (!leftPresent || !rightPresent) return {
				changed: false,
				unknown: false
			};
			if (sameArtifact && left.token === right.token) return {
				changed: false,
				unknown: false
			};
			const a = left.body.local_var_signature;
			const b = right.body.local_var_signature;
			if (a === null || b === null || a.has_context_dependent_types || b.has_context_dependent_types) return {
				changed: false,
				unknown: true
			};
			return {
				changed: a.raw_sha256 !== b.raw_sha256,
				unknown: false
			};
		};
		buildMethodItems = (matches, context) => {
			const items = [];
			for (const pair of matches.pairs) {
				const signatureLimitations = pairedSignatureLimitations(pair.left.item, pair.right.item);
				const locals = compareLocalSignatures(pair.left.item, pair.right.item, context.sameArtifact);
				const { dimensions: observedDimensions, bodyUnknown, callTargetUnknown, fieldTargetUnknown, exceptionTargetUnknown } = methodDimensions(pair.left.item, pair.right.item, context.leftCallEdgesByCaller, context.rightCallEdgesByCaller, context.leftFieldAccessesByCaller, context.rightFieldAccessesByCaller, context.leftAssembly, context.rightAssembly, context.sameArtifact);
				if (locals.changed && !observedDimensions.includes("metadata")) observedDimensions.push("metadata");
				const dimensions = [
					...observedDimensions,
					...bodyUnknown ? ["body-coverage"] : [],
					...callTargetUnknown || fieldTargetUnknown || exceptionTargetUnknown || locals.unknown ? ["availability"] : []
				];
				const observedChange = observedDimensions.length > 0;
				items.push({
					item_id: `mmc_method_${digestCanonicalValue({
						left: pair.left.item.token,
						right: pair.right.item.token,
						basis: pair.basis
					}, "Managed comparison")}`,
					status: observedChange ? "changed" : bodyUnknown || callTargetUnknown || fieldTargetUnknown || exceptionTargetUnknown || locals.unknown || signatureLimitations.length > 0 ? "unknown" : "unchanged",
					left: methodIdentity(pair.left.item),
					right: methodIdentity(pair.right.item),
					match: {
						status: "matched",
						basis: pair.basis,
						confidence: pair.confidence,
						candidate_left_tokens: [],
						candidate_right_tokens: []
					},
					dimensions,
					evidence_links: [context.leftEvidenceId, context.rightEvidenceId],
					limitations: [
						...signatureLimitations,
						...locals.unknown ? [limitation("local-signature-unknown", "Local variable signature identity is unknown because validated context-free signature facts are unavailable or the signature requires metadata or declaring context; build-local tokens and raw bytes do not establish equivalent local types across artifacts.")] : [],
						...locals.changed ? [limitation("local-signature-bytes-changed", "The validated context-free LocalVarSig bytes changed; this records an encoding difference without asserting a semantic type change.")] : [],
						...bodyUnknown ? [limitation("body-unavailable", "Method body facets are unknown because at least one side has unavailable or partial body data.")] : [],
						...callTargetUnknown ? [limitation("call-target-unavailable", "One or more call targets are unavailable because the observed method edges do not cover aligned call instructions or lack a resolved nominal target identity or instruction site.")] : [],
						...fieldTargetUnknown ? [limitation("field-target-unavailable", "One or more field targets are unavailable because observed field accesses do not cover aligned field instructions or lack a resolved nominal target identity or instruction site.")] : [],
						...exceptionTargetUnknown ? [limitation("catch-type-unavailable", "One or more catch type identities are unavailable because local tokens or TypeRef resolution scopes do not establish cross-build identity.")] : []
					]
				});
			}
			for (const ambiguous of matches.ambiguous) {
				items.push({
					item_id: `mmc_method_${digestCanonicalValue({
						left: ambiguous.left.map(({ item }) => item.token),
						right: ambiguous.right.map(({ item }) => item.token),
						basis: ambiguous.basis
					}, "Managed comparison")}`,
					status: "unknown",
					left: null,
					right: null,
					match: {
						status: "ambiguous",
						basis: ambiguous.basis,
						confidence: "unknown",
						candidate_left_tokens: ambiguous.left.map(({ item }) => item.token),
						candidate_right_tokens: ambiguous.right.map(({ item }) => item.token)
					},
					dimensions: ["availability"],
					evidence_links: [context.leftEvidenceId, context.rightEvidenceId],
					limitations: [ambiguityLimitation("methods", ambiguous.basis, ambiguous.left.some((item) => item.identityUnavailable) || ambiguous.right.some((item) => item.identityUnavailable))]
				});
			}
			const undecoded = undecodedOneSidedNames(matches);
			for (const item of matches.leftOnly) items.push(methodOnlyItem({ left: item.item }, item.identity, item.identityUnavailable, context, undecoded));
			for (const item of matches.rightOnly) items.push(methodOnlyItem({ right: item.item }, item.identity, item.identityUnavailable, context, undecoded));
			return items;
		};
		buildFieldItems = (matches, context) => {
			const items = [];
			for (const pair of matches.pairs) {
				const signatureLimitations = pairedSignatureLimitations(pair.left.item, pair.right.item);
				const changed = signatureIdentity(pair.left.item.signature) !== signatureIdentity(pair.right.item.signature) || pair.left.item.flags !== pair.right.item.flags;
				items.push({
					item_id: `mmc_field_${digestCanonicalValue({
						left: pair.left.item.token,
						right: pair.right.item.token
					}, "Managed comparison")}`,
					status: changed ? "changed" : signatureLimitations.length > 0 ? "unknown" : "unchanged",
					left: fieldIdentity(pair.left.item),
					right: fieldIdentity(pair.right.item),
					match: {
						status: "matched",
						basis: pair.basis,
						confidence: pair.confidence,
						candidate_left_tokens: [],
						candidate_right_tokens: []
					},
					evidence_links: [context.leftEvidenceId, context.rightEvidenceId],
					limitations: signatureLimitations
				});
			}
			for (const ambiguous of matches.ambiguous) items.push({
				item_id: `mmc_field_${digestCanonicalValue({
					left: ambiguous.left.map(({ item }) => item.token),
					right: ambiguous.right.map(({ item }) => item.token)
				}, "Managed comparison")}`,
				status: "unknown",
				left: null,
				right: null,
				match: {
					status: "ambiguous",
					basis: ambiguous.basis,
					confidence: "unknown",
					candidate_left_tokens: ambiguous.left.map(({ item }) => item.token),
					candidate_right_tokens: ambiguous.right.map(({ item }) => item.token)
				},
				evidence_links: [context.leftEvidenceId, context.rightEvidenceId],
				limitations: [ambiguityLimitation("fields", ambiguous.basis, ambiguous.left.some((item) => item.identityUnavailable) || ambiguous.right.some((item) => item.identityUnavailable))]
			});
			const undecoded = undecodedOneSidedNames(matches);
			for (const item of matches.leftOnly) items.push(fieldOnlyItem({ left: item.item }, item.identity, item.identityUnavailable, context, undecoded));
			for (const item of matches.rightOnly) items.push(fieldOnlyItem({ right: item.item }, item.identity, item.identityUnavailable, context, undecoded));
			return items;
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedMemberComparisonMatch.js
var keyIdentity, keyMethod, keyField, matchMethods, matchFields, declaredAs, matchByKeys, unresolvedSignatureAmbiguities, unpairedOf, competitionIdentityKey, ownerlessContested, remappable, declaredCandidates, groupBy, matchObserved, keyMembers, readManagedMemberEvidence;
function init_managedMemberComparisonMatch() {
	return (init_managedMemberComparisonMatch = __esmMin((() => {
		init_managedMemberComparisonCoverage();
		init_canonicalDigest();
		init_managedArtifact();
		init_managedInspectionEvidence();
		init_managedMemberSignatureIdentity();
		keyIdentity = (item, declaringType, kind) => {
			const signatureId = signatureIdentity(item.signature);
			return {
				identity: digestCanonicalValue([declaringType, item.name], "Managed comparison"),
				identityUnavailable: declaringType === null,
				signatureId,
				signatureKey: declaringType === null ? null : digestCanonicalValue([
					`${kind}-signature`,
					declaringType,
					item.name,
					signatureId
				], "Managed comparison")
			};
		};
		keyMethod = (item, declared) => ({
			item,
			...keyIdentity(item, declared, "method"),
			exactKey: item.body.status === "present" && item.body.il_sha256 !== null && item.body.normalized_il_sha256 !== null ? digestCanonicalValue([
				"method-exact",
				signatureIdentity(item.signature),
				item.body.il_sha256,
				item.body.normalized_il_sha256
			], "Managed comparison") : null,
			structuralKey: item.signature.parse_status === "decoded" && item.body.status === "present" ? digestCanonicalValue([
				"method-structural",
				signatureIdentity(item.signature),
				item.body.status,
				item.body.header_format,
				item.body.il_size,
				item.body.max_stack,
				item.body.init_locals,
				item.body.opcode_counts,
				item.body.anchors.map(({ opcode, operand_kind, operand }) => [
					opcode,
					operand_kind,
					operand_kind === "constant" ? operand : null
				]),
				item.body.exception_regions.map((region) => [
					region.flags,
					region.try_length,
					region.handler_length,
					region.class_token === null ? null : "type-token",
					region.filter_offset === null ? null : "filter"
				])
			], "Managed comparison") : null
		});
		keyField = (item, declared) => ({
			item,
			...keyIdentity(item, declared, "field"),
			exactKey: item.signature.parse_status === "decoded" ? digestCanonicalValue(["field-exact", signatureIdentity(item.signature)], "Managed comparison") : null,
			structuralKey: null
		});
		matchMethods = (left, right, allowRemap) => matchByKeys({
			left,
			right,
			rounds: [
				{
					basis: "exact-il-signature",
					key: declaredAs(({ exactKey }) => exactKey)
				},
				{
					basis: "exact-signature",
					key: ({ signatureKey }) => signatureKey,
					competitionKey: ({ signatureId }) => signatureId
				},
				{
					basis: "structural-method-shape",
					key: declaredAs((keyed) => keyed.identityUnavailable ? null : keyed.structuralKey),
					competitionKey: ({ structuralKey }) => structuralKey
				},
				{
					basis: "exact-il-signature",
					key: ({ exactKey }) => allowRemap ? exactKey : null,
					remap: true
				},
				{
					basis: "structural-method-shape",
					key: ({ structuralKey }) => allowRemap ? structuralKey : null,
					competitionKey: ({ structuralKey }) => structuralKey,
					remap: true
				}
			]
		});
		matchFields = (left, right, allowRemap) => matchByKeys({
			left,
			right,
			rounds: [
				{
					basis: "field-signature",
					key: declaredAs(({ exactKey }) => exactKey)
				},
				{
					basis: "exact-signature",
					key: ({ signatureKey }) => signatureKey,
					competitionKey: ({ signatureId }) => signatureId
				},
				{
					basis: "field-signature",
					key: ({ exactKey }) => allowRemap ? exactKey : null,
					remap: true
				}
			]
		});
		declaredAs = (key) => (item) => {
			const value = key(item);
			return value === null || item.identityUnavailable ? null : digestCanonicalValue([item.identity, value], "Managed comparison");
		};
		matchByKeys = ({ left, right, rounds }) => {
			const usedLeft = new Set();
			const usedRight = new Set();
			const pairedLeft = new Set();
			const pairedRight = new Set();
			const pairs = [];
			const ambiguous = [];
			for (const round of rounds) {
				const competitionKey = round.competitionKey ?? ((item) => item.exactKey);
				const unpairedLeft = unpairedOf(left, pairedLeft);
				const unpairedRight = unpairedOf(right, pairedRight);
				const declarable = declaredCandidates(unpairedLeft, unpairedRight, competitionKey);
				const openLeft = left.filter((item) => !usedLeft.has(item));
				const openRight = right.filter((item) => !usedRight.has(item));
				const remapContested = round.remap === true ? ownerlessContested([openLeft, openRight], competitionKey) : new Set();
				const leftGroups = groupBy(round.remap === true ? remappable(openLeft, unpairedRight, competitionKey, remapContested) : openLeft.filter(declarable), round.key);
				const rightGroups = groupBy(round.remap === true ? remappable(openRight, unpairedLeft, competitionKey, remapContested) : openRight.filter(declarable), round.key);
				for (const [key, leftItems] of leftGroups) {
					const rightItems = rightGroups.get(key);
					if (rightItems === undefined) continue;
					const refused = round.remap === true && [...leftItems, ...rightItems].some(({ identityUnavailable }) => identityUnavailable);
					if (!refused && leftItems.length === 1 && rightItems.length === 1) {
						const [leftItem] = leftItems;
						const [rightItem] = rightItems;
						if (leftItem === undefined || rightItem === undefined) continue;
						usedLeft.add(leftItem);
						usedRight.add(rightItem);
						pairedLeft.add(leftItem);
						pairedRight.add(rightItem);
						pairs.push({
							left: leftItem,
							right: rightItem,
							basis: round.basis,
							confidence: round.basis === "exact-il-signature" || round.basis === "exact-signature" || round.basis === "field-signature" ? "exact" : "high"
						});
					} else {
						for (const item of leftItems) usedLeft.add(item);
						for (const item of rightItems) usedRight.add(item);
						ambiguous.push({
							left: leftItems,
							right: rightItems,
							basis: round.basis
						});
					}
				}
			}
			for (const group of unresolvedSignatureAmbiguities(left.filter((item) => !usedLeft.has(item)), right.filter((item) => !usedRight.has(item)), ownerlessContested([unpairedOf(left, pairedLeft), unpairedOf(right, pairedRight)], (member) => member.signatureId))) {
				for (const item of group.left) usedLeft.add(item);
				for (const item of group.right) usedRight.add(item);
				ambiguous.push(group);
			}
			return {
				pairs,
				ambiguous,
				leftOnly: left.filter((item) => !usedLeft.has(item)),
				rightOnly: right.filter((item) => !usedRight.has(item))
			};
		};
		unresolvedSignatureAmbiguities = (left, right, contested) => {
			const key = (member) => competitionIdentityKey(member, member.signatureId) ?? "";
			const leftGroups = groupBy(left, key);
			const rightGroups = groupBy(right, key);
			const groups = [];
			for (const [signature, leftItems] of leftGroups) {
				const rightItems = rightGroups.get(signature);
				if (!contested.has(signature) || rightItems === undefined) continue;
				groups.push({
					left: leftItems,
					right: rightItems,
					basis: "exact-signature"
				});
			}
			return groups;
		};
		unpairedOf = (items, paired) => items.filter((item) => !paired.has(item));
		competitionIdentityKey = (member, evidenceKey) => evidenceKey === null ? null : JSON.stringify([member.item.name, evidenceKey]);
		ownerlessContested = (sides, keyOf) => {
			const contested = new Set();
			for (const side of sides) {
				const seen = new Map();
				const ownerless = new Set();
				for (const member of side) {
					const key = competitionIdentityKey(member, keyOf(member));
					if (key === null) continue;
					seen.set(key, (seen.get(key) ?? 0) + 1);
					if (member.identityUnavailable) ownerless.add(key);
				}
				for (const key of ownerless) if ((seen.get(key) ?? 0) > 1) contested.add(key);
			}
			return contested;
		};
		remappable = (items, others, keyOf, contested) => {
			const kept = new Set(others.map(({ identity }) => identity));
			return items.filter((member) => {
				const key = keyOf(member);
				return key !== null && contested.has(competitionIdentityKey(member, key) ?? "") || member.identityUnavailable || !kept.has(member.identity);
			});
		};
		declaredCandidates = (left, right, keyOf) => {
			const contested = ownerlessContested([left, right], keyOf);
			return (member) => {
				if (member.identityUnavailable) return false;
				const key = competitionIdentityKey(member, keyOf(member));
				return key === null || !contested.has(key);
			};
		};
		groupBy = (items, keyOf) => {
			const grouped = new Map();
			for (const item of items) {
				const key = keyOf(item);
				if (key === null) continue;
				const bucket = grouped.get(key) ?? [];
				bucket.push(item);
				grouped.set(key, bucket);
			}
			return grouped;
		};
		matchObserved = (left, right, sides, match, keyLeft, keyRight) => {
			const matched = match(left.filter(sides.inRight).map(keyLeft), right.filter(sides.inLeft).map(keyRight));
			return {
				...matched,
				leftOnly: [...matched.leftOnly, ...left.filter((item) => !sides.inRight(item)).map(keyLeft)],
				rightOnly: [...matched.rightOnly, ...right.filter((item) => !sides.inLeft(item)).map(keyRight)]
			};
		};
		keyMembers = (left, right, scope) => {
			const declared = (inspection, side) => {
				return (item) => {
					if (!inspection.nesting_read || side.emptyMemberNames.has(item)) return null;
					const digest = side.names.get(item.declaring_type_token ?? "");
					return digest == null ? null : ["nominal-name-sha256", digest];
				};
			};
			const declaredLeft = declared(left.result, scope.left);
			const declaredRight = declared(right.result, scope.right);
			const matchable = {
				inLeft: (item) => !scope.right.emptyMemberNames.has(item) && scope.inLeft(item),
				inRight: (item) => !scope.left.emptyMemberNames.has(item) && scope.inRight(item)
			};
			return {
				methodMatches: matchObserved(left.result.methods, right.result.methods, matchable, (a, b) => matchMethods(a, b, scope.left.metadataComplete && scope.right.metadataComplete && hasCompleteMethodRows(left.result) && hasCompleteMethodRows(right.result)), (item) => keyMethod(item, declaredLeft(item)), (item) => keyMethod(item, declaredRight(item))),
				fieldMatches: matchObserved(left.result.fields, right.result.fields, matchable, (a, b) => matchFields(a, b, scope.left.metadataComplete && scope.right.metadataComplete), (item) => keyField(item, declaredLeft(item)), (item) => keyField(item, declaredRight(item)))
			};
		};
		readManagedMemberEvidence = (evidence, path) => readManagedInspectionEvidence(evidence, "inspect_managed_members", managedMemberInspectionSchema, {
			operation: "compare_managed_members",
			path: [path]
		});
	})))();
}

//#endregion
//#region dist/domain/managed/managedMemberComparison.js
var evidenceIdSchema$3, memberComparisonShape, distinctMemberSources, compareManagedMembersRequestSchema, concreteMatchBasisSchema, candidateTokensSchema, matchedComparisonSchema, unmatchedComparisonSchema, ambiguousComparisonSchema, memberIdentitySchema, comparisonItemSchema, MANAGED_MEMBER_COMPARISON_LIMITATION_CODES, comparisonItemLimitationSchema, comparisonItemContextShape, methodComparisonItemSchema, fieldComparisonItemSchema, comparisonSideSchema, managedMemberComparisonResultSchema, callEdgesByCaller, fieldAccessesByCaller, compareManagedMembers;
function init_managedMemberComparison() {
	return (init_managedMemberComparison = __esmMin((() => {
		init_canonicalDigest();
		init_emptyArraySchema();
		init_evidenceReference();
		init_managedArtifact();
		init_managedMemberComparisonCoverage();
		init_managedMemberComparisonItems();
		init_managedMemberComparisonMatch();
		init_digests();
		init_textSchemas();
		evidenceIdSchema$3 = prefixedDigestSchema("ev");
		memberComparisonShape = (source) => ({
			left: source,
			right: source
		});
		distinctMemberSources = (input, context) => {
			if (typeof input.left?.evidence_id === "string" && input.left.evidence_id === input.right?.evidence_id) context.addIssue({
				code: "custom",
				path: ["right"],
				message: "Managed member Evidence must be distinct"
			});
		};
		compareManagedMembersRequestSchema = z.strictObject(memberComparisonShape(evidenceInputSchema)).superRefine(distinctMemberSources);
		concreteMatchBasisSchema = z.enum([
			"exact-il-signature",
			"exact-signature",
			"structural-method-shape",
			"field-signature"
		]);
		candidateTokensSchema = z.array(managedMetadataTokenSchema).min(1);
		matchedComparisonSchema = z.strictObject({
			status: z.literal("matched"),
			basis: concreteMatchBasisSchema,
			confidence: z.enum(["exact", "high"]),
			candidate_left_tokens: emptyArraySchema,
			candidate_right_tokens: emptyArraySchema
		});
		unmatchedComparisonSchema = z.strictObject({
			status: z.literal("unmatched"),
			basis: z.literal("none"),
			confidence: z.literal("unknown"),
			candidate_left_tokens: emptyArraySchema,
			candidate_right_tokens: emptyArraySchema
		});
		ambiguousComparisonSchema = z.strictObject({
			status: z.literal("ambiguous"),
			basis: concreteMatchBasisSchema,
			confidence: z.literal("unknown"),
			candidate_left_tokens: candidateTokensSchema,
			candidate_right_tokens: candidateTokensSchema
		});
		memberIdentitySchema = z.strictObject({
			token: managedMetadataTokenSchema,
			declaring_type: z.string().nullable(),
			name: z.string(),
			signature_sha256: digestSchema,
			normalized_il_sha256: digestSchema.nullable()
		});
		comparisonItemSchema = (base, identity) => z.union([
			z.strictObject({
				...base,
				status: z.enum([
					"unchanged",
					"changed",
					"unknown"
				]),
				left: identity,
				right: identity,
				match: matchedComparisonSchema
			}),
			z.strictObject({
				...base,
				status: z.enum(["removed", "unknown"]),
				left: identity,
				right: z.null(),
				match: unmatchedComparisonSchema
			}),
			z.strictObject({
				...base,
				status: z.enum(["added", "unknown"]),
				left: z.null(),
				right: identity,
				match: unmatchedComparisonSchema
			}),
			z.strictObject({
				...base,
				status: z.literal("unknown"),
				left: z.null(),
				right: z.null(),
				match: ambiguousComparisonSchema
			})
		]);
		MANAGED_MEMBER_COMPARISON_LIMITATION_CODES = [
			"declaring-type-name-not-resolved",
			"counterpart-declaring-type-name-not-resolved",
			"unknown-within-incomplete-metadata",
			"signature-not-decoded",
			"counterpart-signature-not-decoded",
			"signature-not-resolved",
			"counterpart-signature-not-resolved",
			"signature-malformed",
			"ambiguous-signature",
			"ambiguous-il-signature",
			"ambiguous-method-shape",
			"local-signature-unknown",
			"local-signature-bytes-changed",
			"body-unavailable",
			"call-target-unavailable",
			"field-target-unavailable",
			"catch-type-unavailable"
		];
		comparisonItemLimitationSchema = z.strictObject({
			code: z.enum(MANAGED_MEMBER_COMPARISON_LIMITATION_CODES),
			side: z.enum(["left", "right"]).optional().describe("The inventory this limitation concerns when it is the other side's, such as an incomplete or ambiguous counterpart inventory."),
			message: nonEmptyTextSchema
		});
		comparisonItemContextShape = {
			evidence_links: z.array(evidenceIdSchema$3).length(2),
			limitations: z.array(comparisonItemLimitationSchema)
		};
		methodComparisonItemSchema = comparisonItemSchema({
			...comparisonItemContextShape,
			item_id: prefixedDigestSchema("mmc_method"),
			dimensions: z.array(z.enum([
				"metadata",
				"signature",
				"cil",
				"opcode-shape",
				"call-shape",
				"call-target",
				"field-shape",
				"field-target",
				"exception-shape",
				"exception-target",
				"availability",
				"body-coverage"
			]))
		}, memberIdentitySchema);
		fieldComparisonItemSchema = comparisonItemSchema({
			...comparisonItemContextShape,
			item_id: prefixedDigestSchema("mmc_field")
		}, memberIdentitySchema.omit({ normalized_il_sha256: true }));
		comparisonSideSchema = z.strictObject({
			evidence_id: evidenceIdSchema$3,
			artifact_sha256: digestSchema,
			mvid: cliMetadataGuidSchema.nullable(),
			module_name: z.string().nullable(),
			metadata_status: managedMetadataStatusSchema,
			methods_total: z.int().min(0),
			fields_total: z.int().min(0),
			resource_limits: z.array(managedMemberInspectionSchema.shape.coverage.shape.issues.element.extend({ code: z.literal("resource-limit") })).describe("Resource-limit diagnostics reported by this source; an empty array means none were reported.")
		});
		managedMemberComparisonResultSchema = z.strictObject({
			comparison_id: prefixedDigestSchema("mmc"),
			algorithm: z.strictObject({
				name: z.literal("rea-managed-member-comparison"),
				token_identity: z.literal("build-local"),
				name_matching: z.literal("exact-signature-fallback")
			}),
			left: comparisonSideSchema,
			right: comparisonSideSchema,
			summary: z.strictObject({
				unchanged: z.int().min(0),
				changed: z.int().min(0),
				added: z.int().min(0),
				removed: z.int().min(0),
				unknown: z.int().min(0)
			}),
			matching: z.strictObject({
				exact_il_signature: z.int().min(0),
				exact_signature: z.int().min(0),
				structural_method_shape: z.int().min(0),
				field_signature: z.int().min(0),
				ambiguous: z.int().min(0),
				unmatched: z.int().min(0)
			}),
			methods: z.array(methodComparisonItemSchema),
			fields: z.array(fieldComparisonItemSchema),
			coverage: z.strictObject({
				status: z.enum([
					"complete-within-inputs",
					"partial",
					"unknown"
				]).describe("complete-within-inputs only when both observations are complete over the same selected scope and method rows; unknown when a side is unavailable or the selected scope agreement cannot be established."),
				left_status: managedInspectionStateSchema,
				right_status: managedInspectionStateSchema
			}),
			evidence_links: z.array(evidenceIdSchema$3).length(2),
			limitations: z.array(nonEmptyTextSchema)
		});
		callEdgesByCaller = (result) => {
			const edges = new Map();
			for (const edge of result.call_edges) {
				const callerEdges = edges.get(edge.caller_token);
				if (callerEdges === undefined) edges.set(edge.caller_token, [edge]);
				else callerEdges.push(edge);
			}
			return edges;
		};
		fieldAccessesByCaller = (result, emptyFieldTokens) => {
			const accesses = new Map();
			for (const access of result.field_accesses) {
				const observed = emptyFieldTokens.has(access.field_token) && access.target_identity_sha256 !== null ? {
					...access,
					target_identity_sha256: null
				} : access;
				const callerAccesses = accesses.get(access.method_token);
				if (callerAccesses === undefined) accesses.set(access.method_token, [observed]);
				else callerAccesses.push(observed);
			}
			return accesses;
		};
		compareManagedMembers = (left, right) => {
			const scope = managedComparisonScope(left.result, right.result);
			const { methodMatches, fieldMatches } = keyMembers(left, right, scope);
			const itemContext = {
				leftEvidenceId: left.evidenceId,
				rightEvidenceId: right.evidenceId,
				leftComplete: scope.left.metadataComplete,
				rightComplete: scope.right.metadataComplete,
				leftMethodsComplete: scope.left.metadataComplete && hasCompleteMethodRows(left.result),
				rightMethodsComplete: scope.right.metadataComplete && hasCompleteMethodRows(right.result),
				scope,
				sameArtifact: left.result.artifact.sha256 === right.result.artifact.sha256,
				leftAssembly: left.result.assembly,
				rightAssembly: right.result.assembly,
				leftCallEdgesByCaller: callEdgesByCaller(left.result),
				rightCallEdgesByCaller: callEdgesByCaller(right.result),
				leftFieldAccessesByCaller: fieldAccessesByCaller(left.result, scope.left.emptyFieldTokens),
				rightFieldAccessesByCaller: fieldAccessesByCaller(right.result, scope.right.emptyFieldTokens)
			};
			const methodItems = buildMethodItems(methodMatches, itemContext);
			const fieldItems = buildFieldItems(fieldMatches, itemContext);
			const allItems = [...methodItems, ...fieldItems];
			const summary = buildComparisonSummary(allItems);
			const matching = buildComparisonMatching(methodItems, fieldItems);
			const coverage = buildComparisonCoverage({
				left: left.result,
				right: right.result,
				scope
			});
			const limitations = comparisonLimitations(left.result, right.result, scope);
			const result = {
				comparison_id: `mmc_${digestCanonicalValue({
					left: left.evidenceId,
					right: right.evidenceId,
					methods: [...methodItems],
					fields: [...fieldItems]
				}, "Managed comparison")}`,
				algorithm: {
					name: "rea-managed-member-comparison",
					token_identity: "build-local",
					name_matching: "exact-signature-fallback"
				},
				left: sideManifest(left),
				right: sideManifest(right),
				summary,
				matching,
				methods: methodItems,
				fields: fieldItems,
				coverage,
				evidence_links: [left.evidenceId, right.evidenceId],
				limitations
			};
			return managedMemberComparisonResultSchema.parse(result);
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedNativeVerificationSchemas.js
var evidenceIdSchema$2, nativeSymbolSchema, verifiedManagedDeclarationSchema, pinvokeVerificationContextShape, observedCandidatesSchema, pinvokeVerificationSchema, nativeVerificationShape, distinctNativeSources, managedNativeVerificationRequestSchema, verificationCoverageSchema, managedNativeVerificationResultSchema;
function init_managedNativeVerificationSchemas() {
	return (init_managedNativeVerificationSchemas = __esmMin((() => {
		init_emptyArraySchema();
		init_evidenceReference();
		init_managedArtifact();
		init_digests();
		init_textSchemas();
		evidenceIdSchema$2 = prefixedDigestSchema("ev");
		nativeSymbolSchema = z.strictObject({
			evidence_id: evidenceIdSchema$2,
			operation: z.string().min(1),
			name: z.string().min(1),
			address: z.string().nullable(),
			module_name: z.string().nullable(),
			module_path: z.string().nullable(),
			source: z.enum(["macho-export", "function-dossier"])
		});
		verifiedManagedDeclarationSchema = managedNativeImportSchema.pick({
			token: true,
			member_token: true,
			member_name: true,
			import_name: true,
			import_scope_name: true,
			no_mangle: true,
			char_set: true,
			call_convention: true
		}).extend({ declaration_verification: managedNativeImportSchema.shape.verification }).strict();
		pinvokeVerificationContextShape = {
			item_id: prefixedDigestSchema("mnv_pinvoke"),
			managed: verifiedManagedDeclarationSchema,
			evidence_links: z.array(evidenceIdSchema$2).min(1),
			limitations: z.array(nonEmptyTextSchema)
		};
		observedCandidatesSchema = z.tuple([nativeSymbolSchema], nativeSymbolSchema).check(z.minLength(1));
		pinvokeVerificationSchema = z.union([
			z.strictObject({
				...pinvokeVerificationContextShape,
				status: z.literal("verified"),
				basis: z.enum(["exact-export-name", "exact-function-name"]),
				confidence: z.literal("observed"),
				matched_native: nativeSymbolSchema,
				candidates: observedCandidatesSchema
			}),
			z.strictObject({
				...pinvokeVerificationContextShape,
				status: z.literal("inferred"),
				basis: z.literal("decorated-name-candidate"),
				confidence: z.literal("inferred"),
				matched_native: nativeSymbolSchema,
				candidates: observedCandidatesSchema
			}),
			z.strictObject({
				...pinvokeVerificationContextShape,
				status: z.literal("unresolved"),
				basis: z.enum(["no-native-candidate", "unsupported-native-evidence"]),
				confidence: z.literal("unknown"),
				matched_native: z.null(),
				candidates: emptyArraySchema
			}),
			z.strictObject({
				...pinvokeVerificationContextShape,
				status: z.literal("unresolved"),
				basis: z.literal("module-identity-unknown"),
				confidence: z.literal("unknown"),
				matched_native: nativeSymbolSchema,
				candidates: observedCandidatesSchema
			}),
			z.strictObject({
				...pinvokeVerificationContextShape,
				status: z.literal("contradicted"),
				basis: z.literal("module-mismatch"),
				confidence: z.literal("unknown"),
				matched_native: nativeSymbolSchema,
				candidates: observedCandidatesSchema
			})
		]);
		nativeVerificationShape = (source) => ({
			managed_boundaries: source,
			native_observations: z.array(source).min(1).describe("Native function or export Evidence records")
		});
		distinctNativeSources = (input, context) => {
			if (typeof input.managed_boundaries?.evidence_id !== "string" || input.native_observations.some((evidence) => typeof evidence?.evidence_id !== "string")) return;
			const ids = new Set();
			for (const [index, evidence] of input.native_observations.entries()) {
				if (evidence.evidence_id === input.managed_boundaries.evidence_id) context.addIssue({
					code: "custom",
					path: ["native_observations", index],
					message: "Native observation Evidence must be distinct from managed boundary Evidence"
				});
				if (ids.has(evidence.evidence_id)) context.addIssue({
					code: "custom",
					path: ["native_observations", index],
					message: "Native observation Evidence IDs must be unique"
				});
				ids.add(evidence.evidence_id);
			}
		};
		managedNativeVerificationRequestSchema = z.strictObject(nativeVerificationShape(evidenceInputSchema)).superRefine(distinctNativeSources);
		verificationCoverageSchema = z.strictObject({ status: z.enum([
			"complete-within-inputs",
			"partial",
			"unknown"
		]).describe("unknown when the managed boundary inspection is unavailable; partial for a partial inspection, unsupported native Evidence or non-exhaustive exports.") });
		managedNativeVerificationResultSchema = z.strictObject({
			verification_id: prefixedDigestSchema("mnv"),
			algorithm: z.strictObject({
				name: z.literal("rea-managed-native-verification"),
				token_identity: z.literal("build-local"),
				token_to_address_mapping: z.literal("not-inferred")
			}),
			managed_boundary: z.strictObject({
				evidence_id: evidenceIdSchema$2,
				artifact_sha256: digestSchema,
				artifact_path: z.string().min(1),
				mvid: cliMetadataGuidSchema.nullable(),
				metadata_status: managedMetadataStatusSchema,
				pinvoke_imports_total: z.int().min(0),
				native_implementations_total: z.int().min(0),
				coverage_state: managedInspectionStateSchema
			}),
			native_observations: z.strictObject({
				total: z.int().min(1),
				accepted: z.int().min(0),
				unsupported: z.int().min(0),
				symbols: z.int().min(0)
			}),
			summary: z.strictObject({
				verified: z.int().min(0),
				inferred: z.int().min(0),
				unresolved: z.int().min(0),
				contradicted: z.int().min(0),
				native_body_unresolved: z.int().min(0)
			}),
			pinvoke_imports: z.array(pinvokeVerificationSchema),
			native_implementations: z.strictObject({
				runtime_provided: z.int().nonnegative(),
				unresolved: z.int().min(0),
				reason: nonEmptyTextSchema
			}),
			coverage: verificationCoverageSchema,
			evidence_links: z.array(evidenceIdSchema$2).min(2),
			limitations: z.array(nonEmptyTextSchema)
		}).superRefine((result, context) => {
			const observedNativeCount = result.native_observations.accepted + result.native_observations.unsupported;
			if (observedNativeCount !== result.native_observations.total) context.addIssue({
				code: "custom",
				path: ["native_observations"],
				message: "Native observation counts must account for the total input"
			});
			for (const status of [
				"verified",
				"inferred",
				"unresolved",
				"contradicted"
			]) if (result.summary[status] !== result.pinvoke_imports.filter((item) => item.status === status).length) context.addIssue({
				code: "custom",
				path: ["summary", status],
				message: `P/Invoke ${status} count must match the item results`
			});
			if (result.summary.native_body_unresolved !== result.native_implementations.unresolved) context.addIssue({
				code: "custom",
				path: ["summary", "native_body_unresolved"],
				message: "Native body summary must match unresolved implementations"
			});
		}).describe("Counts must agree across the result: native accepted plus unsupported equals total; each P/Invoke summary count equals the number of items with that status; and native_body_unresolved equals native_implementations.unresolved. REA checks these cross-field invariants after constructing the result.");
	})))();
}

//#endregion
//#region dist/domain/managed/managedReconstruction.js
var evidenceIdSchema$1, decompilerSchema, managedReconstructionMethodInputSchema, managedReconstructionImportRequestShape, reconstructionInput, managedReconstructionImportInputSchema, managedReconstructionImportRequestSchema, importedMethodSchema, managedReconstructionImportResultSchema, countLines, findObservedMethod, buildImportedMethod, buildReconstructionSummary, buildStaticObservation, buildDecompilerRecord, RECONSTRUCTION_LIMITATIONS, buildReconstructionWithoutId, resolveManagedReconstructionImport, executeManagedReconstructionImport;
function init_managedReconstruction() {
	return (init_managedReconstruction = __esmMin((() => {
		init_managedModuleIdentity();
		init_evidence();
		init_evidenceReference();
		init_managedArtifact();
		init_canonicalDigest();
		init_digests();
		init_managedInspectionEvidence();
		init_analysisErrorCore();
		init_evidenceErrors();
		init_result();
		init_textSchemas();
		init_sha256Hex();
		evidenceIdSchema$1 = prefixedDigestSchema("ev");
		decompilerSchema = z.strictObject({
			name: nonEmptyTextSchema,
			version: nonEmptyTextSchema.nullable().default(null),
			family: z.enum([
				"ilspy",
				"dnspy",
				"dnlib",
				"mono-cecil",
				"other"
			]),
			executable_sha256: digestSchema.nullable().default(null),
			options: z.array(z.string()).default([])
		});
		managedReconstructionMethodInputSchema = z.strictObject({
			token: managedMetadataTokenSchema,
			signature_sha256: digestSchema,
			normalized_il_sha256: digestSchema.nullable(),
			reconstruction: z.strictObject({
				kind: z.enum([
					"decompiled-csharp",
					"decompiled-il",
					"semantic-pseudocode"
				]),
				language: z.enum([
					"csharp",
					"il",
					"pseudocode"
				]),
				text: nonEmptyTextSchema,
				text_sha256: digestSchema.optional(),
				source_path: nonEmptyTextSchema.nullable().optional(),
				start_line: z.int().min(1).nullable().optional(),
				end_line: z.int().min(1).nullable().optional()
			})
		});
		managedReconstructionImportRequestShape = {
			decompiler: decompilerSchema,
			methods: z.array(managedReconstructionMethodInputSchema).min(1),
			notes: z.array(nonEmptyTextSchema).default([])
		};
		reconstructionInput = (source) => z.strictObject({
			...managedReconstructionImportRequestShape,
			static_members: source
		});
		managedReconstructionImportInputSchema = reconstructionInput(evidenceSchema);
		managedReconstructionImportRequestSchema = reconstructionInput(evidenceInputSchema);
		importedMethodSchema = z.strictObject({
			token: managedMetadataTokenSchema,
			declaring_type: z.string().nullable(),
			name: z.string(),
			signature_sha256: digestSchema,
			normalized_il_sha256: digestSchema.nullable(),
			body_sha256: digestSchema.nullable(),
			il_size: z.int().min(0),
			reconstruction: z.strictObject({
				kind: z.enum([
					"decompiled-csharp",
					"decompiled-il",
					"semantic-pseudocode"
				]),
				language: z.enum([
					"csharp",
					"il",
					"pseudocode"
				]),
				text: nonEmptyTextSchema,
				text_sha256: digestSchema,
				text_length: z.int().min(1),
				line_count: z.int().min(1),
				source_path: nonEmptyTextSchema.nullable(),
				start_line: z.int().min(1).nullable(),
				end_line: z.int().min(1).nullable()
			}),
			validation: z.strictObject({
				matched_static_member: z.literal(true),
				exact_build_required: z.literal(true),
				canonical_observation: z.literal(false),
				confidence_floor: z.literal("inference")
			})
		});
		managedReconstructionImportResultSchema = z.strictObject({
			reconstruction_id: prefixedDigestSchema("mre"),
			phase: z.literal("reconstruction-import"),
			executed: z.literal(false),
			static_observation: z.strictObject({
				evidence_id: evidenceIdSchema$1,
				artifact_sha256: digestSchema,
				artifact_path: z.string().min(1),
				byte_length: z.int().min(0),
				module_name: z.string().nullable(),
				mvid: cliMetadataGuidSchema.nullable(),
				metadata_status: managedMetadataStatusSchema
			}),
			decompiler: decompilerSchema.extend({ options_sha256: digestSchema }),
			summary: z.strictObject({
				imported_methods: z.int().min(1),
				decompiled_csharp_methods: z.int().min(0),
				decompiled_il_methods: z.int().min(0),
				pseudocode_methods: z.int().min(0),
				total_text_bytes: z.int().min(1)
			}),
			methods: z.array(importedMethodSchema).min(1),
			notes: z.array(nonEmptyTextSchema),
			evidence_links: z.array(evidenceIdSchema$1).length(1),
			limitations: z.array(nonEmptyTextSchema)
		});
		countLines = (text) => text.length === 0 ? 0 : text.split(/\r\n|\r|\n/u).length;
		findObservedMethod = (members, candidate) => members.methods.find((item) => item.token === candidate.token && item.signature.raw_sha256 === candidate.signature_sha256 && item.body.status === "present" && item.body.normalized_il_sha256 !== null && candidate.normalized_il_sha256 !== null && item.body.normalized_il_sha256 === candidate.normalized_il_sha256);
		buildImportedMethod = (observed, candidate, textSha256) => ({
			token: observed.token,
			declaring_type: observed.declaring_type,
			name: observed.name,
			signature_sha256: observed.signature.raw_sha256,
			normalized_il_sha256: observed.body.normalized_il_sha256,
			body_sha256: observed.body.il_sha256,
			il_size: observed.body.il_size,
			reconstruction: {
				kind: candidate.reconstruction.kind,
				language: candidate.reconstruction.language,
				text: candidate.reconstruction.text,
				text_sha256: textSha256,
				text_length: candidate.reconstruction.text.length,
				line_count: countLines(candidate.reconstruction.text),
				source_path: candidate.reconstruction.source_path ?? null,
				start_line: candidate.reconstruction.start_line ?? null,
				end_line: candidate.reconstruction.end_line ?? null
			},
			validation: {
				matched_static_member: true,
				exact_build_required: true,
				canonical_observation: false,
				confidence_floor: "inference"
			}
		});
		buildReconstructionSummary = (methods) => ({
			imported_methods: methods.length,
			decompiled_csharp_methods: methods.filter(({ reconstruction }) => reconstruction.kind === "decompiled-csharp").length,
			decompiled_il_methods: methods.filter(({ reconstruction }) => reconstruction.kind === "decompiled-il").length,
			pseudocode_methods: methods.filter(({ reconstruction }) => reconstruction.kind === "semantic-pseudocode").length,
			total_text_bytes: methods.reduce((total, { reconstruction }) => total + Buffer.byteLength(reconstruction.text, "utf8"), 0)
		});
		buildStaticObservation = (staticEvidence, members) => {
			const module = managedModuleRow(members);
			return {
				evidence_id: staticEvidence.evidence_id,
				artifact_sha256: members.artifact.sha256,
				artifact_path: members.artifact.path,
				byte_length: members.artifact.byte_length,
				module_name: module?.name ?? null,
				mvid: module?.mvid ?? null,
				metadata_status: members.metadata.status
			};
		};
		buildDecompilerRecord = (decompiler) => ({
			...decompiler,
			options_sha256: digestCanonicalValue(decompiler.options, "Managed reconstruction")
		});
		RECONSTRUCTION_LIMITATIONS = [
			"Decompiler output is imported as reconstruction evidence and analyst inference; metadata and IL observations remain canonical.",
			"This operation did not execute, load, reflect over, debug, instrument, patch, or decompile the target artifact.",
			"The imported reconstruction is valid only for the exact artifact SHA-256, MVID, method signature, and normalized IL shape recorded here.",
			"Obfuscated names, decompiler variables, and control-flow restructuring are not treated as proof without separate validation."
		];
		buildReconstructionWithoutId = (input, staticEvidence, members, methods) => ({
			phase: "reconstruction-import",
			executed: false,
			static_observation: buildStaticObservation(staticEvidence, members),
			decompiler: buildDecompilerRecord(input.decompiler),
			summary: buildReconstructionSummary(methods),
			methods: [...methods],
			notes: input.notes,
			evidence_links: [staticEvidence.evidence_id],
			limitations: RECONSTRUCTION_LIMITATIONS
		});
		resolveManagedReconstructionImport = (input) => {
			const source = readManagedInspectionEvidence(input.static_members, "inspect_managed_members", managedMemberInspectionSchema, {
				operation: "import_managed_reconstruction",
				path: ["static_members"]
			});
			if (!source.ok) return source;
			const methods = [];
			for (const [index, candidate] of input.methods.entries()) {
				const observed = findObservedMethod(source.value.result, candidate);
				if (observed === undefined) {
					const message = `Reconstruction method lock ${candidate.token} does not match a static managed member observation`;
					return err(new AnalysisInputError("import_managed_reconstruction", {}, [{
						path: ["methods", index],
						reason: "invalid_value",
						message
					}]));
				}
				const textSha256 = sha256Hex(candidate.reconstruction.text);
				if (candidate.reconstruction.text_sha256 !== undefined && candidate.reconstruction.text_sha256 !== textSha256) {
					const message = `Reconstruction text hash mismatch for ${candidate.token}`;
					return err(new AnalysisInputError("import_managed_reconstruction", {}, [{
						path: [
							"methods",
							index,
							"reconstruction",
							"text_sha256"
						],
						reason: "invalid_value",
						message
					}]));
				}
				methods.push(buildImportedMethod(observed, candidate, textSha256));
			}
			return ok({
				request: input,
				staticEvidence: source.value.evidence,
				members: source.value.result,
				methods
			});
		};
		executeManagedReconstructionImport = (resolved) => {
			const withoutId = buildReconstructionWithoutId(resolved.request, resolved.staticEvidence, resolved.members, resolved.methods);
			return managedReconstructionImportResultSchema.parse({
				...withoutId,
				reconstruction_id: `mre_${digestCanonicalValue(withoutId, "Managed reconstruction")}`
			});
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedApplicationGraphCoverage.js
var omittedRelationSites, inputCoverage, omitsUncounted, omitsAny, completeCoverage, managedSourceCoverage, assessManagedGraphOmissions, managedGraphEvidenceCoverage, managedGraphResultCoverage;
function init_managedApplicationGraphCoverage() {
	return (init_managedApplicationGraphCoverage = __esmMin((() => {
		init_coverage();
		init_managedArtifact();
		init_managedInspectionEvidence();
		omittedRelationSites = (omissions) => omissions === null ? 0 : [...Object.values(omissions.callSites), ...Object.values(omissions.fieldAccessSites)].reduce((total, count) => total + count, 0);
		inputCoverage = (omissions) => joinCoverageStatus(["complete", ...omissions.inputStates.map(managedInspectionCoverage)]);
		omitsUncounted = (omissions) => inputCoverage(omissions) !== "complete" || omissions.unscopedTokenRelationships || omissions.selectedTypes !== null || omissions.methodRows !== undefined;
		omitsAny = (omissions) => omitsUncounted(omissions) || omittedRelationSites(omissions.relations) > 0;
		completeCoverage = () => ({
			status: "complete",
			truncated: false,
			omitted_count: 0,
			limits: []
		});
		managedSourceCoverage = (state) => state === "complete" ? completeCoverage() : {
			status: state,
			truncated: false,
			omitted_count: null,
			limits: []
		};
		assessManagedGraphOmissions = (sources, relations) => ({
			relations,
			unscopedTokenRelationships: sources.members !== null && sources.boundaries !== null && (sources.boundaries.pinvoke_imports.some(({ member_token }) => member_token !== null) || sources.boundaries.native_implementations.length > 0) && !managedTokenScopesMatch(sources.members.identity_scope.requires_mvid, sources.boundaries.identity_scope.requires_mvid),
			inputStates: [
				sources.members,
				sources.boundaries,
				sources.artifact
			].flatMap((source) => source === null ? [] : [source.coverage.state]),
			selectedTypes: sources.members?.selection?.type_names ?? null,
			methodRows: sources.members === null || sources.members.method_rows !== null && sources.members.method_rows.offset === 0 && sources.members.method_rows.count === sources.members.method_rows.total ? undefined : sources.members.method_rows
		});
		managedGraphEvidenceCoverage = (omissions) => inputCoverage(omissions) === "unknown" ? {
			status: "unknown",
			truncated: false,
			omitted_count: null,
			limits: []
		} : omitsAny(omissions) ? {
			status: "partial",
			truncated: false,
			omitted_count: omitsUncounted(omissions) ? null : omittedRelationSites(omissions.relations),
			limits: []
		} : completeCoverage();
		managedGraphResultCoverage = (omissions) => ({ status: inputCoverage(omissions) === "unknown" ? "unknown" : omitsAny(omissions) ? "partial" : "complete-within-inputs" });
	})))();
}

//#endregion
//#region dist/domain/managed/managedApplicationGraphNodes.js
var metadataLabel, addArtifactNode, addArtifactIdentityNodes, selectModuleSource, addMemberNodes, typeNode, methodNode, fieldNode, addBoundaryNodes, pinvokeNode, nativeImplementationNode, addContainsEdge, artifactLocalIdentity, sourceManagedEvidence, projectedManagedEvidence, pinvokeAssociationEvidence, createManagedEvidence, graphArtifactPath;
function init_managedApplicationGraphNodes() {
	return (init_managedApplicationGraphNodes = __esmMin((() => {
		init_javascriptApplicationGraph();
		init_managedApplicationGraphCoverage();
		init_managedInspectionEvidence();
		init_managedModuleIdentity();
		metadataLabel = (name) => name === "" ? null : name;
		addArtifactNode = (state) => {
			const node = createJavaScriptApplicationNode({
				kind: "artifact",
				identity: {
					strategy: "content-digest",
					stability: "global-exact",
					sha256: state.artifactSha256
				},
				observations: [{
					label: basename(state.artifactPath),
					properties: {
						format: "pe",
						source: "managed-application-graph"
					},
					evidence: projectedManagedEvidence(state, "project-managed-artifact")
				}]
			});
			state.nodes.push(node);
			return node;
		};
		addArtifactIdentityNodes = (state, artifactNode, parsed) => {
			const artifactInput = parsed.artifact;
			if (artifactInput !== null && artifactInput.result.assembly !== null) {
				const assemblyFacts = artifactInput.result.assembly;
				const artifactEvidence = sourceManagedEvidence(state, artifactInput.evidence, artifactInput.result.coverage.state);
				const assembly = createJavaScriptApplicationNode({
					kind: "managed-assembly",
					identity: artifactLocalIdentity(state.artifactSha256, "managed-assembly", assemblyFacts.token),
					observations: [{
						label: metadataLabel(assemblyFacts.name),
						properties: {
							name: assemblyFacts.name,
							version: assemblyFacts.version,
							culture: assemblyFacts.culture,
							public_key_kind: assemblyFacts.public_key.kind
						},
						evidence: artifactEvidence
					}]
				});
				state.nodes.push(assembly);
				addContainsEdge(state, artifactNode, assembly, {
					kind: "declares-managed-assembly",
					coverage: artifactEvidence.coverage
				});
			}
			const moduleSource = selectModuleSource(parsed);
			if (moduleSource !== null) {
				const { module } = moduleSource;
				const moduleEvidence = sourceManagedEvidence(state, moduleSource.evidence, moduleSource.coverageState);
				const moduleNode = createJavaScriptApplicationNode({
					kind: "managed-module",
					identity: artifactLocalIdentity(state.artifactSha256, "managed-module", module.mvid?.toLowerCase() ?? module.token),
					observations: [{
						label: metadataLabel(module.name),
						properties: {
							name: module.name,
							mvid: module.mvid,
							generation: module.generation,
							token: module.token
						},
						evidence: moduleEvidence
					}]
				});
				state.nodes.push(moduleNode);
				addContainsEdge(state, artifactNode, moduleNode, {
					kind: "declares-managed-module",
					coverage: moduleEvidence.coverage
				});
			}
		};
		selectModuleSource = (parsed) => {
			const sources = [];
			for (const source of [
				parsed.artifact,
				parsed.members,
				parsed.boundaries
			]) {
				if (source === null) continue;
				const module = managedModuleRow(source.result);
				if (module !== null) sources.push({
					module,
					evidence: source.evidence,
					coverageState: source.result.coverage.state
				});
			}
			return sources.find(({ module }) => module.mvid !== null && module.name !== null) ?? sources.find(({ module }) => module.mvid !== null) ?? sources.find(({ module }) => module.name !== null) ?? sources[0] ?? null;
		};
		addMemberNodes = (state, artifactNode, parsed) => {
			const memberInput = parsed.members;
			if (memberInput === null) return;
			const members = memberInput.result;
			const { types, methods, fields } = members;
			const typeCoverage = managedSourceCoverage(members.coverage.state);
			const methodCoverage = managedSourceCoverage(members.coverage.state);
			const fieldCoverage = managedSourceCoverage(members.coverage.state);
			const sourceEvidence = sourceManagedEvidence(state, memberInput.evidence, members.coverage.state);
			for (const type of types) {
				const node = typeNode(state, type, sourceEvidence);
				state.nodes.push(node);
				state.typeNodes.set(type.token, node);
				addContainsEdge(state, artifactNode, node, {
					kind: "declares-managed-type",
					coverage: typeCoverage
				});
			}
			for (const method of methods) {
				const node = methodNode(state, method, sourceEvidence);
				state.nodes.push(node);
				state.methodNodes.set(method.token, node);
				const owner = method.declaring_type_token === null ? artifactNode : state.typeNodes.get(method.declaring_type_token) ?? artifactNode;
				addContainsEdge(state, owner, node, {
					kind: "declares-managed-method",
					coverage: methodCoverage
				});
			}
			for (const field of fields) {
				const node = fieldNode(state, field, sourceEvidence);
				state.nodes.push(node);
				state.fieldNodes.set(field.token, node);
				const owner = field.declaring_type_token === null ? artifactNode : state.typeNodes.get(field.declaring_type_token) ?? artifactNode;
				addContainsEdge(state, owner, node, {
					kind: "declares-managed-field",
					coverage: fieldCoverage
				});
			}
		};
		typeNode = (state, type, evidence) => createJavaScriptApplicationNode({
			kind: "managed-type",
			identity: artifactLocalIdentity(state.artifactSha256, "managed-type-token", type.token),
			observations: [{
				label: metadataLabel(type.full_name),
				properties: {
					token: type.token,
					namespace: type.namespace,
					name: type.name,
					full_name: type.full_name,
					flags: type.flags,
					extends_token: type.extends_token
				},
				evidence
			}]
		});
		methodNode = (state, method, evidence) => createJavaScriptApplicationNode({
			kind: "managed-method",
			identity: artifactLocalIdentity(state.artifactSha256, "managed-method-token", method.token),
			observations: [{
				label: metadataLabel(method.declaring_type === null ? method.name : `${method.declaring_type}.${method.name}`),
				properties: {
					token: method.token,
					declaring_type_token: method.declaring_type_token,
					declaring_type: method.declaring_type,
					name: method.name,
					rva: method.rva,
					signature_sha256: method.signature.raw_sha256,
					signature_status: method.signature.parse_status,
					body_status: method.body.status,
					normalized_il_sha256: method.body.normalized_il_sha256,
					il_size: method.body.il_size
				},
				evidence
			}]
		});
		fieldNode = (state, field, evidence) => createJavaScriptApplicationNode({
			kind: "managed-field",
			identity: artifactLocalIdentity(state.artifactSha256, "managed-field-token", field.token),
			observations: [{
				label: metadataLabel(field.declaring_type === null ? field.name : `${field.declaring_type}.${field.name}`),
				properties: {
					token: field.token,
					declaring_type_token: field.declaring_type_token,
					declaring_type: field.declaring_type,
					name: field.name,
					flags: field.flags,
					signature_sha256: field.signature.raw_sha256,
					signature_status: field.signature.parse_status
				},
				evidence
			}]
		});
		addBoundaryNodes = (state, artifactNode, parsed) => {
			const boundaryInput = parsed.boundaries;
			if (boundaryInput === null) return;
			const boundaries = boundaryInput.result;
			const { pinvoke_imports: pinvokes, native_implementations: implementations } = boundaries;
			const pinvokeCoverage = managedSourceCoverage(boundaries.coverage.state);
			const implementationCoverage = managedSourceCoverage(boundaries.coverage.state);
			const sourceEvidence = sourceManagedEvidence(state, boundaryInput.evidence, boundaries.coverage.state);
			const canJoinMemberTokens = parsed.members !== null && managedTokenScopesMatch(parsed.members.result.identity_scope.requires_mvid, boundaries.identity_scope.requires_mvid);
			for (const pinvoke of pinvokes) {
				const node = pinvokeNode(state, pinvoke, sourceEvidence);
				state.nodes.push(node);
				const method = pinvoke.member_token === null || !canJoinMemberTokens ? undefined : state.methodNodes.get(pinvoke.member_token);
				const memberEvidence = method === undefined || parsed.members === null ? undefined : parsed.members.evidence;
				const owner = method ?? artifactNode;
				state.edges.push(createJavaScriptApplicationEdge({
					source_node_id: owner.node_id,
					target_node_id: node.node_id,
					relation: "imports",
					properties: {
						kind: "managed-pinvoke",
						import_name: pinvoke.import_name,
						import_scope_name: pinvoke.import_scope_name
					},
					evidence: pinvokeAssociationEvidence(state, boundaryInput.evidence, pinvokeCoverage, memberEvidence)
				}));
			}
			for (const implementation of implementations) {
				const node = nativeImplementationNode(state, implementation, sourceEvidence);
				state.nodes.push(node);
				const owner = (canJoinMemberTokens ? state.methodNodes.get(implementation.token) : undefined) ?? artifactNode;
				addContainsEdge(state, owner, node, {
					kind: "declares-managed-native-implementation",
					coverage: implementationCoverage
				});
			}
		};
		pinvokeNode = (state, pinvoke, evidence) => createJavaScriptApplicationNode({
			kind: "managed-pinvoke-import",
			identity: artifactLocalIdentity(state.artifactSha256, "managed-pinvoke-token", pinvoke.token),
			observations: [{
				label: metadataLabel(pinvoke.import_name),
				properties: {
					token: pinvoke.token,
					member_token: pinvoke.member_token,
					member_name: pinvoke.member_name,
					import_name: pinvoke.import_name,
					import_scope_name: pinvoke.import_scope_name,
					char_set: pinvoke.char_set,
					call_convention: pinvoke.call_convention,
					verification: pinvoke.verification
				},
				evidence
			}]
		});
		nativeImplementationNode = (state, implementation, evidence) => createJavaScriptApplicationNode({
			kind: "managed-native-implementation",
			identity: artifactLocalIdentity(state.artifactSha256, "managed-native-implementation-token", implementation.token),
			observations: [{
				label: metadataLabel(implementation.name),
				properties: {
					token: implementation.token,
					name: implementation.name,
					rva: implementation.rva,
					code_type: implementation.code_type,
					managed_kind: implementation.managed_kind,
					pinvoke_declared: implementation.pinvoke_declared,
					boundary_kind: implementation.boundary_kind,
					body_interpretation: implementation.body_interpretation
				},
				evidence
			}]
		});
		addContainsEdge = (state, source, target, options) => {
			state.edges.push(createJavaScriptApplicationEdge({
				source_node_id: source.node_id,
				target_node_id: target.node_id,
				relation: "contains",
				properties: { kind: options.kind },
				evidence: projectedManagedEvidence(state, "project-managed-contains", options.coverage)
			}));
		};
		artifactLocalIdentity = (artifactSha256, namespace, key) => ({
			strategy: "artifact-local-key",
			stability: "artifact-version",
			artifact_sha256: artifactSha256,
			namespace,
			key
		});
		sourceManagedEvidence = (state, source, coverageState) => createManagedEvidence(state, source.operation, managedSourceCoverage(coverageState), [source.evidence_id]);
		projectedManagedEvidence = (state, operation, coverage = managedSourceCoverage("complete")) => createManagedEvidence(state, operation, coverage, state.evidenceLinks);
		pinvokeAssociationEvidence = (state, boundaryEvidence, coverage, memberEvidence) => createManagedEvidence(state, boundaryEvidence.operation, coverage, [boundaryEvidence.evidence_id, ...memberEvidence === undefined ? [] : [memberEvidence.evidence_id]]);
		createManagedEvidence = (state, operation, coverage, evidenceIds) => ({
			authority: "managed-static-analysis",
			state: "observed",
			confidence: "exact",
			artifact: {
				available: true,
				artifact_id: `art_${state.artifactSha256}`,
				sha256: state.artifactSha256
			},
			location: {
				available: true,
				value: {
					kind: "artifact-path",
					path: graphArtifactPath(state.artifactPath)
				}
			},
			extractor: {
				name: "rea-dotnet-static",
				version: "1",
				operation,
				executable_sha256: null
			},
			coverage,
			limitations: coverage.status === "complete" ? [] : ["The source managed Evidence slice is incomplete; unreturned or unavailable items remain unobserved."],
			evidence_ids: [...evidenceIds]
		});
		graphArtifactPath = (path) => {
			const name = basename(path).replaceAll(/[^A-Za-z0-9._-]/gu, "_");
			return `managed/${name.length === 0 ? "artifact.pe" : name}`;
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedApplicationGraphRelations.js
var CALL_OPCODES, FIELD_ACCESS_KINDS, isMemberReference, aggregate, siteProperties, addMemberRelations, REASON_LABELS, describeOmissions, relationOmissionLimitations;
function init_managedApplicationGraphRelations() {
	return (init_managedApplicationGraphRelations = __esmMin((() => {
		init_javascriptApplicationGraph();
		init_managedApplicationGraphNodes();
		CALL_OPCODES = new Set([
			"call",
			"callvirt",
			"newobj",
			"jmp"
		]);
		FIELD_ACCESS_KINDS = new Map([
			["ldfld", "read"],
			["ldsfld", "read"],
			["stfld", "write"],
			["stsfld", "write"],
			["ldflda", "address"],
			["ldsflda", "address"]
		]);
		isMemberReference = (token) => token.toLowerCase().startsWith("0x0a");
		aggregate = (relations, source, target, opcode) => {
			const key = `${source.node_id}\u0000${target.node_id}`;
			let relation = relations.get(key);
			if (relation === undefined) {
				relation = {
					source,
					target,
					opcodes: new Map()
				};
				relations.set(key, relation);
			}
			relation.opcodes.set(opcode, (relation.opcodes.get(opcode) ?? 0) + 1);
		};
		siteProperties = (opcodes) => {
			const sorted = [...opcodes].sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0);
			return {
				site_count: sorted.reduce((total, [, count]) => total + count, 0),
				opcodes: Object.fromEntries(sorted)
			};
		};
		addMemberRelations = (state, parsed) => {
			const memberInput = parsed.members;
			if (memberInput === null) return null;
			const members = memberInput.result;
			const callSites = {
				"member-ref": 0,
				"method-spec": 0,
				"unknown-target": 0,
				"method-reference": 0,
				"absent-node": 0,
				"self-call": 0
			};
			const fieldAccessSites = {
				"member-ref": 0,
				"absent-node": 0
			};
			const calls = new Map();
			for (const edge of members.call_edges) {
				if (edge.target_kind !== "method-def") {
					callSites[edge.target_kind === "unknown" ? "unknown-target" : edge.target_kind]++;
					continue;
				}
				if (!CALL_OPCODES.has(edge.opcode)) {
					callSites["method-reference"]++;
					continue;
				}
				const caller = state.methodNodes.get(edge.caller_token);
				const target = state.methodNodes.get(edge.target_token);
				if (caller === undefined || target === undefined) {
					callSites["absent-node"]++;
					continue;
				}
				if (caller === target) {
					callSites["self-call"]++;
					continue;
				}
				aggregate(calls, caller, target, edge.opcode);
			}
			const accesses = new Map();
			for (const access of members.field_accesses) {
				const method = state.methodNodes.get(access.method_token);
				const field = state.fieldNodes.get(access.field_token);
				if (method === undefined || field === undefined) {
					fieldAccessSites[isMemberReference(access.field_token) ? "member-ref" : "absent-node"]++;
					continue;
				}
				aggregate(accesses, method, field, access.opcode);
			}
			const evidence = sourceManagedEvidence(state, memberInput.evidence, members.coverage.state);
			for (const { source, target, opcodes } of calls.values()) state.edges.push(createJavaScriptApplicationEdge({
				source_node_id: source.node_id,
				target_node_id: target.node_id,
				relation: "calls",
				properties: {
					kind: "managed-call",
					...siteProperties(opcodes)
				},
				evidence
			}));
			for (const { source, target, opcodes } of accesses.values()) state.edges.push(createJavaScriptApplicationEdge({
				source_node_id: source.node_id,
				target_node_id: target.node_id,
				relation: "accesses",
				properties: {
					kind: "managed-field-access",
					access: [...new Set([...opcodes.keys()].map((opcode) => FIELD_ACCESS_KINDS.get(opcode) ?? "unknown"))].sort(),
					...siteProperties(opcodes)
				},
				evidence
			}));
			return {
				callSites,
				fieldAccessSites
			};
		};
		REASON_LABELS = {
			"member-ref": "member-reference",
			"method-spec": "generic method-instantiation",
			"unknown-target": "unknown-target",
			"method-reference": "function-pointer (ldftn/ldvirtftn)",
			"absent-node": "missing-node",
			"self-call": "recursive self-call"
		};
		describeOmissions = (counts) => Object.entries(counts).filter(([, count]) => count > 0).map(([reason, count]) => `${String(count)} ${REASON_LABELS[reason]}`).join(", ");
		relationOmissionLimitations = (omissions) => {
			if (omissions === null) return [];
			const calls = describeOmissions(omissions.callSites);
			const fields = describeOmissions(omissions.fieldAccessSites);
			return [...calls === "" ? [] : [`Calls edges link only method nodes in the inspected module; these call sites are omitted: ${calls}.`], ...fields === "" ? [] : [`Accesses edges link only method and field nodes in the inspected module; these field-access sites are omitted: ${fields}.`]];
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedApplicationGraph.js
var evidenceIdSchema, managedApplicationGraphReferenceShape, managedApplicationGraphReferenceInputSchema, managedGraphRequestSchema, managedApplicationGraphResultSchema, projectManagedGraph, countNodes, countEdges, readManagedGraphProjection, OPERATION, chooseArtifact, artifactMismatch, moduleIdentityMismatch, projectionLimitations;
function init_managedApplicationGraph() {
	return (init_managedApplicationGraph = __esmMin((() => {
		init_managedModuleIdentity();
		init_evidenceReference();
		init_evidenceInputContract();
		init_javascriptApplicationGraph();
		init_managedArtifact();
		init_canonicalDigest();
		init_managedApplicationGraphCoverage();
		init_managedApplicationGraphNodes();
		init_managedApplicationGraphRelations();
		init_digests();
		init_managedInspectionEvidence();
		init_analysisErrorCore();
		init_inputIssueProjection();
		init_result();
		init_textSchemas();
		evidenceIdSchema = prefixedDigestSchema("ev");
		managedApplicationGraphReferenceShape = z.strictObject({
			managed_artifact: evidenceInputSchema.optional(),
			managed_members: evidenceInputSchema.optional(),
			managed_native_boundaries: evidenceInputSchema.optional()
		});
		managedApplicationGraphReferenceInputSchema = z.union([
			managedApplicationGraphReferenceShape.extend({ managed_artifact: evidenceInputSchema }),
			managedApplicationGraphReferenceShape.extend({ managed_members: evidenceInputSchema }),
			managedApplicationGraphReferenceShape.extend({ managed_native_boundaries: evidenceInputSchema })
		]).superRefine((input, context) => {
			const sources = [
				input.managed_artifact,
				input.managed_members,
				input.managed_native_boundaries
			].filter((source) => source !== undefined);
			if (sources.length === 0) context.addIssue({
				code: "custom",
				message: "Provide at least one managed Evidence source"
			});
			if (sources.some((source) => typeof source?.evidence_id !== "string")) return;
			const ids = sources.map((source) => source.evidence_id);
			if (new Set(ids).size !== ids.length) context.addIssue({
				code: "custom",
				message: "Managed application graph Evidence IDs must be unique"
			});
		});
		managedGraphRequestSchema = getEvidenceInputContract(managedApplicationGraphReferenceInputSchema).frameSchema;
		managedApplicationGraphResultSchema = z.strictObject({
			projection_id: prefixedDigestSchema("magp"),
			root_artifact_sha256: digestSchema,
			source_evidence: z.strictObject({
				managed_artifact_evidence_id: evidenceIdSchema.nullable(),
				managed_members_evidence_id: evidenceIdSchema.nullable(),
				managed_native_boundaries_evidence_id: evidenceIdSchema.nullable()
			}),
			summary: z.strictObject({
				graph_nodes: z.int().min(0),
				graph_edges: z.int().min(0),
				assemblies: z.int().min(0),
				modules: z.int().min(0),
				types: z.int().min(0),
				methods: z.int().min(0),
				fields: z.int().min(0),
				pinvoke_imports: z.int().min(0),
				native_implementations: z.int().min(0),
				calls: z.int().min(0).describe("calls edges"),
				field_accesses: z.int().min(0).describe("accesses edges")
			}),
			graph: javascriptApplicationGraphSchema,
			coverage: z.strictObject({ status: z.enum([
				"complete-within-inputs",
				"partial",
				"unknown"
			]).describe("complete-within-inputs when every supplied managed Evidence record is complete and nothing was omitted; unknown when a supplied record is unavailable.") }),
			evidence_links: z.array(evidenceIdSchema).min(1).max(3),
			limitations: z.array(nonEmptyTextSchema)
		}).superRefine((result, context) => {
			const [rootId] = result.graph.root_node_ids;
			const root = result.graph.nodes.find(({ node_id }) => node_id === rootId);
			if (result.graph.root_node_ids.length !== 1 || root?.kind !== "artifact" || root.identity.strategy !== "content-digest" || root.identity.sha256 !== result.root_artifact_sha256) context.addIssue({
				code: "custom",
				path: ["root_artifact_sha256"],
				message: "Managed graph root must identify the declared root artifact SHA-256."
			});
		});
		projectManagedGraph = (request) => {
			const { sources: parsed, artifact: artifactIdentity } = request;
			const evidenceLinks = [
				parsed.artifact?.evidence.evidence_id,
				parsed.members?.evidence.evidence_id,
				parsed.boundaries?.evidence.evidence_id
			].filter((id) => id !== undefined);
			const state = {
				nodes: [],
				edges: [],
				artifactSha256: artifactIdentity.sha256,
				artifactPath: artifactIdentity.path,
				evidenceLinks,
				typeNodes: new Map(),
				methodNodes: new Map(),
				fieldNodes: new Map()
			};
			const artifactNode = addArtifactNode(state);
			addArtifactIdentityNodes(state, artifactNode, parsed);
			addMemberNodes(state, artifactNode, parsed);
			addBoundaryNodes(state, artifactNode, parsed);
			const relations = addMemberRelations(state, parsed);
			const omissions = assessManagedGraphOmissions({
				artifact: parsed.artifact?.result ?? null,
				members: parsed.members?.result ?? null,
				boundaries: parsed.boundaries?.result ?? null
			}, relations);
			const limitations = projectionLimitations(parsed, omissions);
			const graph = createJavaScriptApplicationGraph({
				schema: "JavaScriptApplicationGraph",
				root_node_ids: [artifactNode.node_id],
				nodes: state.nodes,
				edges: state.edges,
				coverage: managedGraphEvidenceCoverage(omissions),
				limitations
			});
			const withoutId = {
				root_artifact_sha256: state.artifactSha256,
				source_evidence: {
					managed_artifact_evidence_id: parsed.artifact?.evidence.evidence_id ?? null,
					managed_members_evidence_id: parsed.members?.evidence.evidence_id ?? null,
					managed_native_boundaries_evidence_id: parsed.boundaries?.evidence.evidence_id ?? null
				},
				summary: {
					graph_nodes: graph.nodes.length,
					graph_edges: graph.edges.length,
					assemblies: countNodes(graph.nodes, "managed-assembly"),
					modules: countNodes(graph.nodes, "managed-module"),
					types: countNodes(graph.nodes, "managed-type"),
					methods: countNodes(graph.nodes, "managed-method"),
					fields: countNodes(graph.nodes, "managed-field"),
					pinvoke_imports: countNodes(graph.nodes, "managed-pinvoke-import"),
					native_implementations: countNodes(graph.nodes, "managed-native-implementation"),
					calls: countEdges(graph.edges, "calls"),
					field_accesses: countEdges(graph.edges, "accesses")
				},
				graph,
				coverage: managedGraphResultCoverage(omissions),
				evidence_links: evidenceLinks,
				limitations
			};
			return managedApplicationGraphResultSchema.parse({
				...withoutId,
				projection_id: `magp_${digestCanonicalValue(withoutId, "Managed application graph")}`
			});
		};
		countNodes = (nodes, kind) => nodes.filter((node) => node.kind === kind).length;
		countEdges = (edges, relation) => edges.filter((edge) => edge.relation === relation).length;
		readManagedGraphProjection = (input) => {
			const frame = managedGraphRequestSchema.safeParse(input);
			if (!frame.success) return err(analysisInputErrorFromIssues(OPERATION, frame.error.issues, input, { cause: frame.error }));
			const { managed_artifact, managed_members, managed_native_boundaries } = frame.data;
			const artifact = managed_artifact === undefined ? ok(null) : readManagedInspectionEvidence(managed_artifact, "inspect_managed_artifact", managedArtifactInspectionSchema, {
				operation: OPERATION,
				path: ["managed_artifact"]
			});
			if (!artifact.ok) return artifact;
			const members = managed_members === undefined ? ok(null) : readManagedInspectionEvidence(managed_members, "inspect_managed_members", managedMemberInspectionSchema, {
				operation: OPERATION,
				path: ["managed_members"]
			});
			if (!members.ok) return members;
			const boundaries = managed_native_boundaries === undefined ? ok(null) : readManagedInspectionEvidence(managed_native_boundaries, "inspect_managed_native_boundaries", managedNativeBoundaryInspectionSchema, {
				operation: OPERATION,
				path: ["managed_native_boundaries"]
			});
			if (!boundaries.ok) return boundaries;
			const sources = {
				artifact: artifact.value,
				members: members.value,
				boundaries: boundaries.value
			};
			const identity = chooseArtifact(sources);
			if (identity === undefined) {
				const missing = "Provide at least one managed inspection result.";
				return err(new AnalysisInputError(OPERATION, { userMessage: missing }, [{
					path: [],
					reason: "invalid_value",
					message: missing
				}]));
			}
			const mismatch = artifactMismatch(sources, identity.sha256) ?? moduleIdentityMismatch(sources);
			if (mismatch !== null) return err(new AnalysisInputError(OPERATION, { userMessage: mismatch }, [{
				path: [],
				reason: "invalid_value",
				message: mismatch
			}]));
			return ok({
				sources,
				artifact: identity
			});
		};
		OPERATION = "project_managed_application_graph";
		chooseArtifact = (parsed) => {
			const result = parsed.artifact?.result ?? parsed.members?.result ?? parsed.boundaries?.result;
			return result === undefined ? undefined : {
				sha256: result.artifact.sha256,
				path: result.artifact.path
			};
		};
		artifactMismatch = (parsed, sha256Value) => {
			for (const result of [
				parsed.artifact?.result,
				parsed.members?.result,
				parsed.boundaries?.result
			]) if (result !== undefined && result.artifact.sha256 !== sha256Value) return "Managed graph projection inputs must describe the same artifact SHA-256";
			return null;
		};
		moduleIdentityMismatch = (parsed) => {
			const modules = [
				parsed.artifact,
				parsed.members,
				parsed.boundaries
			].flatMap((source) => {
				const row = source === null ? null : managedModuleRow(source.result);
				return row === null ? [] : [row];
			});
			const mvidClaims = [
				...modules.map(({ mvid }) => mvid),
				parsed.members?.result.identity_scope.requires_mvid,
				parsed.boundaries?.result.identity_scope.requires_mvid
			].filter((mvid) => mvid !== undefined && mvid !== null).map((mvid) => mvid.toLowerCase());
			if (new Set(mvidClaims).size > 1) return "Managed graph inputs report conflicting known module MVIDs or token scopes";
			for (const field of [
				"name",
				"generation",
				"token",
				"row_offset"
			]) {
				const values = new Set(modules.map((module) => module[field]).filter((value) => value !== null));
				if (values.size > 1) return `Managed graph inputs report conflicting module ${field} values`;
			}
			for (const field of ["enc_id", "enc_base_id"]) {
				const values = new Set(modules.map((module) => module[field]?.toLowerCase()).filter((value) => value !== undefined));
				if (values.size > 1) return `Managed graph inputs report conflicting module ${field} values`;
			}
			return null;
		};
		projectionLimitations = (parsed, omissions) => [
			"Managed graph projection preserves static metadata observations only; it does not execute managed code, load assemblies, or map managed tokens to native addresses.",
			...parsed.members === null ? ["Managed member Evidence was not supplied; type, method, and field nodes are absent."] : [],
			...parsed.artifact === null ? ["Managed artifact Evidence was not supplied; assembly identity observations are absent."] : [],
			...parsed.boundaries === null ? ["Managed native-boundary Evidence was not supplied; P/Invoke and native-implementation nodes are absent."] : [],
			...omissions.inputStates.includes("partial") ? ["At least one supplied managed Evidence record has partial coverage."] : [],
			...omissions.inputStates.includes("unavailable") ? ["At least one supplied managed Evidence record is unavailable; what the graph omits is unknown."] : [],
			...omissions.selectedTypes === null ? [] : [`Managed member Evidence selected only these declaring types: ${omissions.selectedTypes.join(", ")}; type, method, and field nodes of other types are omitted, not absent.`],
			...omissions.methodRows === undefined ? [] : omissions.methodRows === null ? ["Managed member Evidence did not record its MethodDef row scope; coverage of methods and their relations outside the supplied observations is unknown."] : [`Managed member Evidence examined MethodDef rows at offset ${omissions.methodRows.offset} with count ${omissions.methodRows.count} of ${omissions.methodRows.total} total rows; methods outside that interval and their relations are omitted, not absent.`],
			...omissions.unscopedTokenRelationships ? ["Managed boundary tokens were not linked to member nodes because matching module MVID scope was not established."] : [],
			...relationOmissionLimitations(omissions.relations)
		];
	})))();
}

//#endregion
//#region dist/domain/electron/electronFuses.js
var ELECTRON_FUSE_SENTINEL, ELECTRON_FUSE_STATE_BYTES, ELECTRON_FUSE_V1_NAMES, FUSE_IMPLICATIONS, OTHER_MEANS_LIMITATION, MISSING_SENTINEL_LIMITATION, byteSchema, fuseStateSchema, electronFuseSchema, electronFuseSentinelSchema, electronFuseSliceSchema, implicationLocation, electronFuseImplicationSchema, electronFuseReportSchema, inspectElectronFusesInputSchema, electronFuseState, electronFuseName, describeElectronFuseFindings, embeddedAsarIntegrityApplies, describeSentinel, implicationFor, validateReportBounds, implicationKey, validateSentinel;
function init_electronFuses() {
	return (init_electronFuses = __esmMin((() => {
		init_digests();
		init_localPath();
		ELECTRON_FUSE_SENTINEL = "dL7pKGdnNz796PbbjQWNKmHXBZaB9tsX";
		ELECTRON_FUSE_STATE_BYTES = {
			disabled: 48,
			enabled: 49,
			removed: 114
		};
		ELECTRON_FUSE_V1_NAMES = [
			"RunAsNode",
			"EnableCookieEncryption",
			"EnableNodeOptionsEnvironmentVariable",
			"EnableNodeCliInspectArguments",
			"EnableEmbeddedAsarIntegrityValidation",
			"OnlyLoadAppFromAsar",
			"LoadBrowserProcessSpecificV8Snapshot",
			"GrantFileProtocolExtraPrivileges",
			"WasmTrapHandlers"
		];
		FUSE_IMPLICATIONS = [
			{
				subject: "node_cli_inspect_arguments",
				fuseIndex: 3,
				enabled: "honored",
				inactive: "not_honored"
			},
			{
				subject: "electron_run_as_node",
				fuseIndex: 0,
				enabled: "honored",
				inactive: "not_honored"
			},
			{
				subject: "embedded_asar_integrity_validation",
				fuseIndex: 4,
				enabled: "enforced",
				inactive: "not_enforced"
			},
			{
				subject: "only_load_app_from_asar",
				fuseIndex: 5,
				enabled: "restricted_to_app_asar",
				inactive: "not_restricted_to_app_asar"
			}
		];
		OTHER_MEANS_LIMITATION = "Fuse state does not prove the application enables Inspector through other means, such as app.commandLine or a remote-debugging switch in application code.";
		MISSING_SENTINEL_LIMITATION = "A missing sentinel means fuse state is unknown, not that every fuse is disabled.";
		byteSchema = z.int().min(0).max(255);
		fuseStateSchema = z.enum([
			"enabled",
			"disabled",
			"removed",
			"unknown"
		]);
		electronFuseSchema = z.strictObject({
			index: z.int().nonnegative(),
			name: z.string().min(1).nullable(),
			state: fuseStateSchema,
			raw_byte: byteSchema
		});
		electronFuseSentinelSchema = z.strictObject({
			sentinel_offset: z.int().nonnegative(),
			wire_version: byteSchema.nullable(),
			declared_length: byteSchema.nullable(),
			fuses: z.array(electronFuseSchema),
			complete: z.boolean()
		});
		electronFuseSliceSchema = z.strictObject({
			index: z.int().nonnegative(),
			file_offset: z.int().nonnegative(),
			size: z.int().nonnegative(),
			architecture: z.string().min(1).nullable(),
			hidden: z.boolean().exactOptional(),
			sentinel_count: z.int().nonnegative(),
			sentinels: z.array(electronFuseSentinelSchema)
		});
		implicationLocation = {
			relationship: z.literal("derivation"),
			slice_index: z.int().nonnegative(),
			sentinel_offset: z.int().nonnegative()
		};
		electronFuseImplicationSchema = z.discriminatedUnion("subject", [
			z.strictObject({
				...implicationLocation,
				subject: z.literal("node_cli_inspect_arguments"),
				fuse_index: z.literal(3),
				outcome: z.enum([
					"honored",
					"not_honored",
					"unknown"
				])
			}),
			z.strictObject({
				...implicationLocation,
				subject: z.literal("electron_run_as_node"),
				fuse_index: z.literal(0),
				outcome: z.enum([
					"honored",
					"not_honored",
					"unknown"
				])
			}),
			z.strictObject({
				...implicationLocation,
				subject: z.literal("embedded_asar_integrity_validation"),
				fuse_index: z.literal(4),
				outcome: z.enum([
					"enforced",
					"not_enforced",
					"unknown"
				])
			}),
			z.strictObject({
				...implicationLocation,
				subject: z.literal("only_load_app_from_asar"),
				fuse_index: z.literal(5),
				outcome: z.enum([
					"restricted_to_app_asar",
					"not_restricted_to_app_asar",
					"unknown"
				])
			})
		]);
		electronFuseReportSchema = z.strictObject({
			artifact: z.strictObject({
				selected_path: localPathStringSchema,
				resolved_path: localPathStringSchema,
				sha256: digestSchema,
				bytes: z.int().nonnegative(),
				format: z.enum([
					"mach-o",
					"mach-o-universal",
					"pe",
					"elf"
				])
			}).describe("Caller-selected path, resolved regular file, and the container that was read"),
			slices: z.array(electronFuseSliceSchema).describe("One entry per universal Mach-O slice, or a single entry for a thin Mach-O, PE, or ELF file. Sentinel offsets are file-absolute."),
			runtime_implications: z.array(electronFuseImplicationSchema).describe("Derivations from version-1 fuse bytes. Each entry names the fuse index it came from."),
			limitations: z.array(z.string().min(1))
		}).superRefine((report, context) => {
			validateReportBounds(report, context);
		});
		inspectElectronFusesInputSchema = z.strictObject({ path: absoluteLocalPathStringSchema.describe("Absolute filesystem path to a macOS .app bundle, Electron Framework binary, Windows PE executable, or Linux ELF executable") });
		electronFuseState = (byte) => {
			if (byte === ELECTRON_FUSE_STATE_BYTES.disabled) return "disabled";
			if (byte === ELECTRON_FUSE_STATE_BYTES.enabled) return "enabled";
			if (byte === ELECTRON_FUSE_STATE_BYTES.removed) return "removed";
			return "unknown";
		};
		electronFuseName = (wireVersion, index) => wireVersion === 1 ? ELECTRON_FUSE_V1_NAMES[index] ?? null : null;
		describeElectronFuseFindings = (slices, container) => {
			const runtime_implications = [];
			const limitations = [OTHER_MEANS_LIMITATION, MISSING_SENTINEL_LIMITATION];
			for (const slice of slices) {
				if (slice.sentinel_count === 0) limitations.push(`Slice ${slice.index} at file offset ${slice.file_offset} contains no Electron fuse sentinel; fuse state for that slice is unknown, not disabled.`);
				else if (slice.sentinel_count > 1) limitations.push(`Slice ${slice.index} at file offset ${slice.file_offset} contains ${slice.sentinel_count} Electron fuse sentinels; every sentinel is reported and none is selected.`);
				for (const sentinel of slice.sentinels) describeSentinel(slice.index, sentinel, container, runtime_implications, limitations);
			}
			return {
				runtime_implications,
				limitations
			};
		};
		embeddedAsarIntegrityApplies = (container) => container === "mach-o" || container === "mach-o-universal" || container === "pe";
		describeSentinel = (sliceIndex, sentinel, container, implications, limitations) => {
			if (!sentinel.complete) limitations.push(`Electron fuse wire at file offset ${sentinel.sentinel_offset} is truncated; fuse bytes past the slice stay unknown.`);
			if (sentinel.wire_version === null) return;
			if (sentinel.wire_version !== 1) {
				limitations.push(`Electron fuse wire at file offset ${sentinel.sentinel_offset} uses wire version ${sentinel.wire_version}; version 1 is the only pinned name table, so runtime implications for this wire are unknown.`);
				return;
			}
			for (const spec of FUSE_IMPLICATIONS) {
				const fuse = sentinel.fuses.find((item) => item.index === spec.fuseIndex);
				if (fuse === undefined) {
					limitations.push(`Electron fuse wire at file offset ${sentinel.sentinel_offset} does not include fuse index ${spec.fuseIndex}; that runtime implication is unknown.`);
					continue;
				}
				const applicabilityUnknown = spec.subject === "embedded_asar_integrity_validation" && !embeddedAsarIntegrityApplies(container);
				if (applicabilityUnknown) limitations.push(`Electron compiles embedded ASAR integrity validation only on macOS and Windows; the observed fuse byte at file offset ${sentinel.sentinel_offset} does not establish enforcement.`);
				implications.push(implicationFor(spec, applicabilityUnknown ? "unknown" : fuse.state, {
					slice_index: sliceIndex,
					sentinel_offset: sentinel.sentinel_offset
				}));
			}
		};
		implicationFor = (spec, state, location) => {
			const outcome = state === "enabled" ? spec.enabled : state === "unknown" ? "unknown" : spec.inactive;
			return {
				relationship: "derivation",
				subject: spec.subject,
				fuse_index: spec.fuseIndex,
				outcome,
				...location
			};
		};
		validateReportBounds = (report, context) => {
			const size = report.artifact.bytes;
			for (const [sliceIndex, slice] of report.slices.entries()) {
				if (slice.index !== sliceIndex) context.addIssue({
					code: "custom",
					path: [
						"slices",
						sliceIndex,
						"index"
					],
					message: "Slice index does not match its position in the report."
				});
				if (slice.sentinel_count !== slice.sentinels.length) context.addIssue({
					code: "custom",
					path: [
						"slices",
						sliceIndex,
						"sentinel_count"
					],
					message: "Sentinel count does not match the reported sentinels."
				});
				if (slice.file_offset > size || slice.size > size - slice.file_offset) context.addIssue({
					code: "custom",
					path: ["slices", sliceIndex],
					message: "Slice range extends outside the selected artifact."
				});
				for (const [sentinelIndex, sentinel] of slice.sentinels.entries()) validateSentinel(slice, sentinel, sliceIndex, sentinelIndex, context);
			}
			const expected = new Set(describeElectronFuseFindings(report.slices, report.artifact.format).runtime_implications.map(implicationKey));
			for (const [index, implication] of report.runtime_implications.entries()) {
				if (!expected.has(implicationKey(implication))) context.addIssue({
					code: "custom",
					path: ["runtime_implications", index],
					message: "Runtime implication is not supported by the reported fuse bytes and applicability."
				});
				const slice = report.slices[implication.slice_index];
				if (slice?.sentinels.some((sentinel) => sentinel.sentinel_offset === implication.sentinel_offset) !== true) context.addIssue({
					code: "custom",
					path: ["runtime_implications", index],
					message: "Runtime implication does not reference a reported sentinel."
				});
			}
		};
		implicationKey = (fact) => JSON.stringify([
			fact.slice_index,
			fact.sentinel_offset,
			fact.subject,
			fact.fuse_index,
			fact.outcome
		]);
		validateSentinel = (slice, sentinel, sliceIndex, sentinelIndex, context) => {
			const sentinelEnd = sentinel.sentinel_offset + ELECTRON_FUSE_SENTINEL.length;
			const wireEnd = sentinelEnd + (sentinel.wire_version === null ? 0 : 1) + (sentinel.declared_length === null ? 0 : 1) + sentinel.fuses.length;
			if (wireEnd > slice.file_offset + slice.size) context.addIssue({
				code: "custom",
				path: [
					"slices",
					sliceIndex,
					"sentinels",
					sentinelIndex
				],
				message: "Reported wire header or fuse bytes extend outside the slice."
			});
			if (sentinel.sentinel_offset < slice.file_offset || sentinelEnd > slice.file_offset + slice.size) context.addIssue({
				code: "custom",
				path: [
					"slices",
					sliceIndex,
					"sentinels",
					sentinelIndex,
					"sentinel_offset"
				],
				message: "Sentinel is outside its slice."
			});
			if (sentinel.wire_version === null && sentinel.declared_length !== null) context.addIssue({
				code: "custom",
				path: [
					"slices",
					sliceIndex,
					"sentinels",
					sentinelIndex,
					"declared_length"
				],
				message: "A wire without a version byte cannot declare a fuse count."
			});
			if (sentinel.complete && (sentinel.declared_length === null || sentinel.fuses.length !== sentinel.declared_length)) context.addIssue({
				code: "custom",
				path: [
					"slices",
					sliceIndex,
					"sentinels",
					sentinelIndex,
					"complete"
				],
				message: "A complete wire must contain every declared fuse byte."
			});
			if (!sentinel.complete && sentinel.declared_length !== null && sentinel.fuses.length >= sentinel.declared_length) context.addIssue({
				code: "custom",
				path: [
					"slices",
					sliceIndex,
					"sentinels",
					sentinelIndex,
					"complete"
				],
				message: "An incomplete wire must omit at least one declared fuse byte."
			});
			for (const [fuseIndex, fuse] of sentinel.fuses.entries()) {
				if (fuse.index !== fuseIndex) context.addIssue({
					code: "custom",
					path: [
						"slices",
						sliceIndex,
						"sentinels",
						sentinelIndex,
						"fuses",
						fuseIndex,
						"index"
					],
					message: "Fuse index does not match its wire position."
				});
				if (fuse.state !== electronFuseState(fuse.raw_byte)) context.addIssue({
					code: "custom",
					path: [
						"slices",
						sliceIndex,
						"sentinels",
						sentinelIndex,
						"fuses",
						fuseIndex,
						"state"
					],
					message: "Fuse state does not match its raw byte."
				});
				if (sentinel.wire_version !== null && fuse.name !== electronFuseName(sentinel.wire_version, fuse.index)) context.addIssue({
					code: "custom",
					path: [
						"slices",
						sliceIndex,
						"sentinels",
						sentinelIndex,
						"fuses",
						fuseIndex,
						"name"
					],
					message: "Fuse name does not match the pinned version-1 table."
				});
			}
		};
	})))();
}

//#endregion
//#region dist/contracts/toolOutputSchemaGroups.js
var contextFacetErrorSchema, contextFacetSchema, bookmarkFacetSchema, officialOutputSchemas, literalTraceOutput, callPathTraceOutput, enhancedOutputSchemas, byteEntropyOutputSchema, nativeOutputSchemas, artifactOutputSchemas, managedOutputSchemas, managedWorkflowOutputSchemas, sessionOutputSchemas, electronFuseOutputSchemas;
function init_toolOutputSchemaGroups() {
	return (init_toolOutputSchemaGroups = __esmMin((() => {
		init_coverage();
		init_procedureReferences();
		init_nativeObservation();
		init_inventoryCoverage();
		init_analysisViewResult();
		init_literalFeatureTrace();
		init_byteEntropy();
		init_functionMatching();
		init_nativeByteRead();
		init_analysisDetail();
		init_batchDecompile();
		init_functionDossier();
		init_nativeInventory();
		init_investigationLifecycle();
		init_jsonRecord();
		init_bytePattern();
		init_evidenceRecordSummary();
		init_liveBinaryTargetSummary();
		init_nativeFunctionAnnotations();
		init_nativeLoadImage();
		init_nativeUiObservation();
		init_nativeValueTrace();
		init_bundleResourceRoot();
		init_nativeDataType();
		init_nativeCallObservation();
		init_nativeInstruction();
		init_jsonValue();
		init_residualUnknown();
		init_evidenceBundle();
		init_processComparison();
		init_nativeApiBoundary();
		init_nativeInspection();
		init_artifactGraph();
		init_artifactInspection();
		init_interfaceBuilderGraph();
		init_dylibResolution();
		init_keyedArchive();
		init_appleAssetCatalog();
		init_managedArtifact();
		init_managedMemberComparison();
		init_managedNativeVerificationSchemas();
		init_managedReconstruction();
		init_managedApplicationGraph();
		init_artifactComparison();
		init_functionComparisonSchemas();
		init_bundleComparison();
		init_changedBehavior();
		init_callPathSchemas();
		init_staticRuntimeCorrelation();
		init_reconstructionVerificationSchemas();
		init_decompileDirectory();
		init_analysisErrorProjectionSchema();
		init_relationshipCoverage();
		init_objcSwiftMetadata();
		init_nativeInvestigationGraph();
		init_toolOutputSchemaPrimitives();
		init_processCapture();
		init_processScenario();
		init_electronFuses();
		contextFacetErrorSchema = z.discriminatedUnion("code", [
			analysisInputErrorProjectionSchema,
			analysisResourceErrorProjectionSchema,
			evidenceIntegrityErrorProjectionSchema
		]);
		contextFacetSchema = z.discriminatedUnion("state", [z.object({
			state: z.literal("available"),
			value: jsonValueSchema
		}), z.object({
			state: z.literal("unavailable"),
			reason: z.string(),
			remediation: z.string(),
			error: contextFacetErrorSchema.optional()
		})]);
		bookmarkFacetSchema = z.discriminatedUnion("state", [z.object({
			state: z.literal("available"),
			value: z.array(analysisBookmarkSchema)
		}), z.object({
			state: z.literal("unavailable"),
			reason: z.string(),
			remediation: z.string(),
			error: contextFacetErrorSchema.optional()
		})]);
		officialOutputSchemas = {
			search_bytes: evidenceResultOf(byteSearchResultSchema),
			annotate_native_function: evidenceResultOf(nativeFunctionAnnotationsSchema),
			inspect_native_load_image: analysisDetailOutputSchemaOf(nativeLoadImageSchema, nativeLoadImageSummaryViewResultSchema),
			inspect_native_data_type: evidenceResultOf(nativeDataTypeSchema),
			inspect_native_instruction: evidenceResultOf(nativeInstructionSchema),
			resolve_native_call_targets: evidenceResultOf(nativeCallTargetsSchema),
			address_name: evidenceResultOf(nullableText),
			comment: evidenceResultOf(nullableText),
			current_address: evidenceResultOf(z.string()),
			current_procedure: evidenceResultOf(z.string()),
			current_document: evidenceResultOf(z.string()),
			goto_address: evidenceResultOf(z.string()),
			inline_comment: evidenceResultOf(nullableText),
			list_bookmarks: evidenceResultOf(z.array(analysisBookmarkSchema)),
			list_documents: evidenceResultOf(z.array(z.string())),
			list_names: analysisDetailOutputSchemaOf(nativeInventoryRowsSchemas.names, nativeInventorySummaryViewResultSchema.extend({ parent_operation: z.literal("list_names") })),
			list_procedures: analysisDetailOutputSchemaOf(nativeInventoryRowsSchemas.names, nativeInventorySummaryViewResultSchema.extend({ parent_operation: z.literal("list_procedures") })),
			list_segments: segmentOutput,
			list_strings: analysisDetailOutputSchemaOf(nativeInventoryRowsSchemas.strings, nativeInventorySummaryViewResultSchema.extend({ parent_operation: z.literal("list_strings") })),
			next_address: evidenceResultOf(z.string()),
			prev_address: evidenceResultOf(z.string()),
			procedure_address: analysisDetailOutputSchemaOf(nativeObservationSourceSchemas.procedure_address, nativeObservationSummaryViewResultSchemas.procedure_address),
			procedure_assembly: evidenceResultOf(z.string()),
			procedure_callees: analysisDetailOutputSchemaOf(nativeObservationSourceSchemas.procedure_callees, nativeObservationSummaryViewResultSchemas.procedure_callees),
			procedure_callers: analysisDetailOutputSchemaOf(nativeObservationSourceSchemas.procedure_callers, nativeObservationSummaryViewResultSchemas.procedure_callers),
			procedure_info: procedureInfoOutput,
			read_function_instructions: evidenceResultOf(functionInstructionWindowSchema),
			read_bytes: evidenceResultOf(nativeByteReadSchema),
			address_to_file_offset: evidenceResultOf(z.object({
				address: z.string(),
				file_offset: z.int().min(0).max(Number.MAX_SAFE_INTEGER),
				provider_file_offset: z.int().min(0).max(Number.MAX_SAFE_INTEGER).exactOptional().describe("Original coordinate returned by the provider's mapping API."),
				image_base_file_offset: z.int().min(0).max(Number.MAX_SAFE_INTEGER).exactOptional().describe("File offset of the loaded image within its source container; zero for a thin executable."),
				source_path: z.string().exactOptional().describe("Observed original executable path used to verify the file mapping.")
			})),
			procedure_references: analysisDetailOutputSchemaOf(procedureReferencesSchema, nativeProcedureReferencesSummaryViewResultSchema),
			procedure_pseudo_code: analysisDetailOutputSchemaOf(nullableText, procedurePseudocodeSummaryViewResultSchema),
			resolve_containing_procedure: analysisDetailOutputSchemaOf(nativeObservationSourceSchemas.resolve_containing_procedure, nativeObservationSummaryViewResultSchemas.resolve_containing_procedure),
			search_procedures: analysisDetailOutputSchemaOf(nativeInventoryRowsSchemas.names, nativeInventorySummaryViewResultSchema.extend({ parent_operation: z.literal("search_procedures") })),
			search_strings: analysisDetailOutputSchemaOf(nativeInventoryRowsSchemas.strings, nativeInventorySummaryViewResultSchema.extend({ parent_operation: z.literal("search_strings") })),
			set_address_name: evidenceResultOf(z.boolean()),
			set_addresses_names: evidenceResultOf(jsonRecordSchema(z.boolean())),
			set_bookmark: evidenceResultOf(z.boolean()),
			set_comment: evidenceResultOf(z.boolean()),
			set_inline_comment: evidenceResultOf(z.boolean()),
			unset_bookmark: evidenceResultOf(z.boolean()),
			xrefs: evidenceResultOf(nativeAddressListSchema)
		};
		literalTraceOutput = analysisDetailOutputSchemaOf(literalFeatureTraceSchema, nativeFeatureTraceSummaryViewResultSchema);
		callPathTraceOutput = evidenceResultOf(z.object({
			start: z.string(),
			goal: z.string().nullable(),
			direction: z.enum(["forward", "backward"]),
			goal_status: z.enum([
				"not_requested",
				"reached",
				"not_reached",
				"unknown"
			]),
			search_scope: z.object({
				graph: z.literal("provider_observed_graph"),
				discovery: coverageStatusSchema,
				observed_goal_status: z.enum([
					"not_requested",
					"reached",
					"not_reached",
					"unknown"
				])
			}),
			nodes: z.array(z.object({
				address: z.string(),
				depth: z.int().min(0)
			})),
			edges: z.array(z.object({
				source_address: z.string(),
				target_address: z.string(),
				discovery_depth: z.int().min(1)
			})),
			traversal_path: z.array(z.string()),
			failures: z.array(z.object({
				address: z.string(),
				error: analysisErrorProjectionSchema
			})),
			relationship_coverage: z.record(z.string(), relationshipCoverageSchema),
			traversal: z.object({ nodes_visited: z.int().min(1) }),
			truncated: z.boolean(),
			residual_unknowns: z.array(z.string()),
			limitations: z.array(z.string())
		}));
		enhancedOutputSchemas = {
			inspect_native_dispatch_metadata: evidenceResultOf(nativeDispatchMetadataResultSchema),
			trace_native_values: evidenceResultOf(nativeValueTraceSchema),
			trace_native_ui_action: evidenceResultOf(nativeInvestigationTraceSchema),
			get_objc_classes: objcClassDiscoveryOutput,
			get_objc_protocols: symbolDiscoveryOutput("protocols"),
			decompile_all: evidenceResultOf(decompileDirectoryManifestSchema),
			batch_decompile: analysisDetailOutputSchemaOf(batchDecompileResultSchema, batchDecompileSummaryViewResultSchema),
			get_call_graph: analysisDetailOutputSchemaOf(nativeObservationSourceSchemas.get_call_graph, nativeObservationSummaryViewResultSchemas.get_call_graph),
			analyze_swift_types: evidenceResultOf(z.object({
				total: z.int().min(0),
				categories: z.record(z.string(), z.object({
					count: z.int().min(0),
					items: z.array(addressedEntry.extend({ mangled_names: z.array(z.string()) }))
				})),
				unclassified: z.array(addressedEntry.extend({
					mangled_names: z.array(z.string()),
					reason: z.enum(["category_not_decoded", "conflicting_categories"])
				})),
				limitations: z.array(z.string()),
				symbol_inventory_error: analysisErrorProjectionSchema.exactOptional()
			})),
			find_xrefs_to_name: evidenceResultOf(z.discriminatedUnion("status", [z.object({
				status: z.literal("resolved"),
				name: z.string(),
				address: z.string(),
				xrefs: nativeAddressListSchema
			}), z.object({
				status: z.literal("unresolved"),
				name: z.string(),
				reason: z.literal("name_not_found")
			})])),
			binary_overview: evidenceResultOf(z.object({
				document: z.string(),
				image_base: z.string().min(1).optional(),
				segments: z.array(z.object({
					name: z.string(),
					start: z.string(),
					end: z.string(),
					length: z.number().min(0).nullable(),
					image_base: z.string().exactOptional(),
					address_space: z.string().exactOptional()
				})).optional(),
				segment_count: z.int().min(0).optional(),
				procedure_count: z.int().min(0),
				string_count: z.int().min(0),
				inventory_coverage: overviewInventoryCoverageSchema
			})),
			analyze_function: analysisDetailOutputSchemaOf(functionDossierSchema, nativeFunctionSummaryViewResultSchema),
			inspect_native_api: evidenceResultOf(nativeApiInspectionResultSchema),
			trace_feature: literalTraceOutput,
			trace_call_path: callPathTraceOutput
		};
		byteEntropyOutputSchema = analysisDetailOutputSchemaOf(byteEntropySchema, byteEntropySummaryViewResultSchema);
		nativeOutputSchemas = {
			inspect_byte_entropy: byteEntropyOutputSchema,
			observe_native_ui: evidenceResultOf(nativeUiResultSchema),
			capture_native_ui_scenario: evidenceResultOf(nativeUiResultSchema),
			observe_native_calls: evidenceResultOf(nativeCallObservationResultSchema),
			inspect_macho: evidenceResultOf(z.union([inspectMachoSchema, machoSummaryViewResultSchema])),
			inspect_signature: evidenceResultOf(inspectSignatureSchema),
			inspect_plist: evidenceResultOf(inspectPlistSchema),
			list_architectures: evidenceResultOf(listArchitecturesSchema),
			demangle_swift: evidenceResultOf(demangleSwiftSchema)
		};
		artifactOutputSchemas = {
			inspect_artifact: evidenceResultOf(z.union([artifactInspectionResultSchema, artifactInventorySummaryViewResultSchema])),
			extract_artifact: evidenceResultOf(artifactExtractionResultSchema),
			decode_interface_builder: evidenceResultOf(z.union([interfaceBuilderAnalysisSchema, interfaceBuilderSummaryViewResultSchema])),
			inspect_keyed_archive: evidenceResultOf(keyedArchiveResultSchema),
			inspect_asset_catalog: evidenceResultOf(appleAssetCatalogResultSchema),
			trace_dylib_resolution: evidenceResultOf(dylibResolutionResultSchema)
		};
		managedOutputSchemas = {
			inspect_managed_artifact: evidenceResultOf(z.union([managedArtifactInspectionSchema, managedArtifactSummaryViewResultSchema])),
			inspect_managed_members: evidenceResultOf(z.union([managedMemberInspectionSchema, managedMemberSummaryViewResultSchema])),
			inspect_managed_native_boundaries: evidenceResultOf(managedNativeBoundaryInspectionSchema)
		};
		managedWorkflowOutputSchemas = {
			compare_managed_members: evidenceResultOf(managedMemberComparisonResultSchema),
			verify_managed_native_boundaries: evidenceResultOf(managedNativeVerificationResultSchema),
			import_managed_reconstruction: evidenceResultOf(managedReconstructionImportResultSchema),
			project_managed_application_graph: evidenceResultOf(managedApplicationGraphResultSchema)
		};
		sessionOutputSchemas = {
			reset_investigation: lifecycleResultOf(resetInvestigationReceiptSchema),
			open_binary: lifecycleResultOf(z.discriminatedUnion("format", [...liveBinaryTargetSummaryVariants])),
			open_bundle_resources: lifecycleResultOf(bundleResourceRootSchema),
			close_binary: lifecycleResultOf(z.union([z.null(), z.object({
				path: z.string(),
				bytes: z.int().min(0),
				primitive_entries: z.int().min(0).describe("Retained eligible primitive query bindings."),
				workflow_entries: z.int().min(0).describe("Retained eligible composed workflow bindings."),
				evidence_records: z.int().min(0).describe("All retained Evidence records, including observations without replay bindings.")
			})])),
			binary_session: lifecycleResultOf(z.union(sessionStatusDetailShapes.flatMap((detail) => [
				sessionProviderFacts.extend({
					open: z.literal(false),
					...detail
				}),
				sessionProviderFacts.extend({
					open: z.literal(true),
					session_kind: z.literal("bundle_resources"),
					resource_root: bundleResourceRootSchema,
					...detail
				}),
				...liveBinaryTargetSummaryVariants.map((variant) => sessionProviderFacts.extend({
					open: z.literal(true),
					...variant.shape,
					...detail
				}))
			]))),
			export_evidence_bundle: lifecycleResultOf(evidenceBundleExportReceiptSchema),
			get_evidence_bundle: lifecycleResultOf(z.union([
				evidenceBundleSchema,
				evidenceBundleSummarySchema,
				evidenceRecordSelectionSchema,
				evidenceLinkInspectionSchema
			])),
			get_navigation_context: lifecycleResultOf(z.object({
				document: z.string(),
				address: z.string(),
				procedure: z.union([z.string(), z.null()])
			})),
			inspect_address_context: lifecycleResultOf(z.object({
				address: z.string(),
				document: z.string().nullable(),
				name: contextFacetSchema,
				procedure: contextFacetSchema,
				comment: contextFacetSchema,
				inline_comment: contextFacetSchema,
				bookmarks: bookmarkFacetSchema
			})),
			import_evidence_bundle: lifecycleResultOf(z.object({
				imported: z.int().min(0),
				unknowns_added: z.int().min(0),
				total: z.int().min(0)
			})),
			capture_process_scenario: evidenceResultOf(z.union([processCaptureSchema, processScenarioPlanSchema]).describe(`A capture, or the plan a dry run produced without launching a process. ${processCaptureSchema.description ?? ""}`)),
			compare_process_captures: evidenceResultOf(processCaptureComparisonSchema),
			compare_artifacts: evidenceResultOf(artifactComparisonResultSchema),
			compare_functions: evidenceResultOf(functionComparisonResultSchema),
			match_native_functions: evidenceResultOf(z.union([nativeFunctionMatchingSchema, nativeFunctionMatchingSummaryViewResultSchema])),
			compare_bundles: evidenceResultOf(bundleComparisonResultSchema),
			find_changed_behavior: evidenceResultOf(changedBehaviorResultSchema),
			build_call_path: evidenceResultOf(callPathResultSchema),
			correlate_static_and_runtime: evidenceResultOf(staticRuntimeCorrelationResultSchema),
			verify_reconstruction: evidenceResultOf(reconstructionVerificationResultSchema),
			list_unknowns: lifecycleResultOf(z.object({
				items: z.array(residualUnknownSchema),
				total: z.int().min(0),
				offset: z.int().min(0),
				next_offset: z.int().min(0).nullable()
			})),
			record_unknown: lifecycleResultOf(residualUnknownSchema),
			update_unknown: lifecycleResultOf(residualUnknownSchema),
			verify_unknown_resolution: lifecycleResultOf(z.object({
				valid: z.boolean(),
				truthVerified: z.boolean(),
				unknown: residualUnknownSchema
			}))
		};
		electronFuseOutputSchemas = { inspect_electron_fuses: evidenceResultOf(electronFuseReportSchema) };
	})))();
}

//#endregion
//#region dist/contracts/sessionLifecycleInputs.js
var snapshotPathSchema, binaryTargetPathSchema, targetFormatHintSchema, openBinaryInputSchema, openBundleResourcesInputSchema, closeBinaryInputSchema, resetInvestigationInputSchema, openBinaryTargetSelection;
function init_sessionLifecycleInputs() {
	return (init_sessionLifecycleInputs = __esmMin((() => {
		init_targetFormats();
		init_localPath();
		init_rawBinary();
		init_espFlashSelection();
		init_providerSelection();
		snapshotPathSchema = absoluteLocalPathStringSchema.describe("Absolute local filesystem path for the analysis snapshot; relative paths are rejected.");
		binaryTargetPathSchema = absoluteLocalPathStringSchema.describe("Absolute local filesystem path for the analysis target; relative paths are rejected.");
		targetFormatHintSchema = z.enum(TARGET_FORMAT_HINTS);
		openBinaryInputSchema = z.strictObject({
			path: binaryTargetPathSchema,
			format: targetFormatHintSchema.optional().describe("Explicit interpretation: dos-com or raw-binary (headerless), gamecube-dol (GameCube/Wii DOL, never auto-detected), or esp-flash-image (an ESP flash dump read with flash_offset and partition_table_offset). Omission preserves header-based detection."),
			architecture: binaryArchitectureSchema.optional().describe("Caller-supplied CPU family. Required with format=raw-binary; rejected otherwise. format=gamecube-dol takes powerpc from the header, so it must be omitted."),
			entry_point: rawBinaryEntryPointSchema.optional().describe("Caller-supplied load and entry address (0xhex). File offset 0 is mapped here. Required with format=raw-binary; rejected otherwise. Optional with format=gamecube-dol; must equal the DOL header entry."),
			flash_offset: espFlashAddressSchema.optional().describe("Flash address (0xhex) of the dump's first byte, when it does not start at flash address 0. Only with format=esp-flash-image."),
			partition_table_offset: espFlashAddressSchema.optional().describe("Flash address (0xhex, a multiple of 0x1000) of the partition table, which disables the table scan. Only with format=esp-flash-image."),
			provider_id: analysisProviderSelectorSchema.optional(),
			snapshot_path: snapshotPathSchema.optional()
		}).superRefine((value, context) => {
			const flash = espFlashSelectionError({
				format: value.format,
				flashOffset: value.flash_offset === undefined ? undefined : parseEspFlashAddress(value.flash_offset),
				partitionTableOffset: value.partition_table_offset === undefined ? undefined : parseEspFlashAddress(value.partition_table_offset)
			});
			if (flash !== undefined) context.addIssue({
				code: "custom",
				path: [value.partition_table_offset === undefined ? "flash_offset" : "partition_table_offset"],
				message: flash
			});
			const pairing = rawBinarySelectionError({
				...value.format === undefined ? {} : { format: value.format },
				...value.architecture === undefined ? {} : { architecture: value.architecture },
				...value.entry_point === undefined ? {} : { entryPoint: value.entry_point }
			});
			if (pairing === undefined) return;
			context.addIssue({
				code: "custom",
				path: value.format === "raw-binary" ? value.architecture === undefined ? ["architecture"] : ["entry_point"] : value.architecture === undefined ? ["entry_point"] : ["architecture"],
				message: pairing
			});
		});
		openBundleResourcesInputSchema = z.strictObject({ path: binaryTargetPathSchema });
		closeBinaryInputSchema = z.strictObject({
			snapshot_path: snapshotPathSchema.optional(),
			overwrite: z.boolean().default(false)
		});
		resetInvestigationInputSchema = z.strictObject({
			save_path: absoluteLocalPathStringSchema.describe("Absolute path for a complete Evidence bundle saved before clearing records.").optional(),
			overwrite: z.boolean().default(false)
		});
		openBinaryTargetSelection = (input) => ({
			...input.format === undefined ? {} : { formatHint: input.format },
			...input.architecture === undefined ? {} : { architecture: input.architecture },
			...input.entry_point === undefined ? {} : { entryPoint: input.entry_point },
			...input.flash_offset === undefined && input.partition_table_offset === undefined ? {} : { espFlash: {
				...input.flash_offset === undefined ? {} : { flashOffset: parseEspFlashAddress(input.flash_offset) },
				...input.partition_table_offset === undefined ? {} : { partitionTableOffset: parseEspFlashAddress(input.partition_table_offset) }
			} }
		});
	})))();
}

//#endregion
//#region dist/contracts/processComparisonContracts.js
var processComparisonInputSchema;
function init_processComparisonContracts() {
	return (init_processComparisonContracts = __esmMin((() => {
		init_evidenceReference();
		init_processTraceSpecification();
		processComparisonInputSchema = z.strictObject({
			left: evidenceInputSchema,
			right: evidenceInputSchema,
			trace_spec: processTraceSpecificationSchema.optional(),
			max_capture_age_ms: z.int().nonnegative().optional()
		});
	})))();
}

//#endregion
//#region dist/contracts/artifactComparisonContracts.js
var artifactComparisonInputSchema;
function init_artifactComparisonContracts() {
	return (init_artifactComparisonContracts = __esmMin((() => {
		init_evidenceReference();
		artifactComparisonInputSchema = z.strictObject({
			left: evidenceSourceInputSchema,
			right: evidenceSourceInputSchema
		});
	})))();
}

//#endregion
//#region dist/contracts/sessionToolSchemas.js
var getEvidenceBundleInputSchema, navigationContextInputSchema, addressContextInputSchema, importEvidenceBundleInputSchema, bundleComparisonMcpInputSchema, listUnknownsInputSchema, verifyUnknownResolutionInputSchema;
function init_sessionToolSchemas() {
	return (init_sessionToolSchemas = __esmMin((() => {
		init_localPath();
		init_bundleComparison();
		init_digests();
		init_evidenceRecordSummary();
		init_residualUnknown();
		getEvidenceBundleInputSchema = z.strictObject({
			detail: z.enum([
				"complete",
				"summary",
				"records",
				"links"
			]).default("complete"),
			filters: evidenceRecordFiltersSchema.optional(),
			offset: z.int().nonnegative().optional().describe("records or links: first matching row to return; default 0."),
			limit: z.int().positive().optional().describe(`records: maximum complete records, default ${String(8)}. links: maximum link rows, default ${String(64)}.`),
			traversal: evidenceLinkTraversalSchema.optional().describe("links only: direct (default) reads the selected records' own links; retained-closure also follows retained links."),
			link_status: evidenceLinkStatusFilterSchema.optional().describe("links only: rows to return, default missing. Counts always cover every inspected link.")
		});
		navigationContextInputSchema = z.strictObject({ document: z.string().min(1).optional() });
		addressContextInputSchema = z.strictObject({
			address: z.string().min(1),
			document: z.string().min(1).optional()
		});
		importEvidenceBundleInputSchema = z.strictObject({ path: absoluteLocalPathStringSchema.describe("Absolute local filesystem path for the evidence bundle to import; relative paths are rejected.") });
		bundleComparisonMcpInputSchema = bundleComparisonInputSchema.extend({
			left_bundle_path: absoluteLocalPathStringSchema.describe("Absolute local filesystem path to the left Evidence bundle."),
			right_bundle_path: absoluteLocalPathStringSchema.describe("Absolute local filesystem path to the right Evidence bundle.")
		});
		listUnknownsInputSchema = z.strictObject({
			status: residualUnknownSchema.shape.status.optional(),
			severity: residualUnknownSchema.shape.severity.optional(),
			domain: residualUnknownSchema.shape.domain.optional(),
			offset: z.int().min(0).max(Number.MAX_SAFE_INTEGER).default(0).describe("Zero-based offset in the stable filtered unknown ID order."),
			limit: z.int().positive().max(Number.MAX_SAFE_INTEGER).optional().describe("Optional maximum number of heads to return. Omit to return every matching head from offset.")
		});
		verifyUnknownResolutionInputSchema = z.strictObject({ unknown_id: prefixedDigestSchema("unk") });
	})))();
}

//#endregion
//#region dist/contracts/unknownContractExamples.js
var UNKNOWN_CONTRACT_EXAMPLES;
function init_unknownContractExamples() {
	return (init_unknownContractExamples = __esmMin((() => {
		UNKNOWN_CONTRACT_EXAMPLES = {
			list_unknowns: {
				offset: 0,
				limit: 50
			},
			record_unknown: {
				question: "Does this branch require an unavailable external service?",
				severity: "medium",
				domain: "protocol",
				required_authority: "controlled-replay",
				required_confidence: "observed",
				required_environment: null,
				recommended_probes: [{
					operation: "capture_process_scenario",
					rationale: "Replay branch."
				}],
				relationships: []
			},
			update_unknown: {
				unknown_id: `unk_${"0".repeat(64)}`,
				expected_revision: 1,
				status: "investigating",
				severity: "medium",
				supporting_evidence_ids: [],
				contradicting_evidence_ids: [],
				required_authority: "controlled-replay",
				required_confidence: "observed",
				required_environment: null,
				recommended_probes: [],
				relationships: [],
				resolution: null
			},
			verify_unknown_resolution: { unknown_id: `unk_${"0".repeat(64)}` }
		};
	})))();
}

//#endregion
//#region dist/contracts/artifactComparisonExample.js
var inventory, provider, ARTIFACT_COMPARISON_EXAMPLE;
function init_artifactComparisonExample() {
	return (init_artifactComparisonExample = __esmMin((() => {
		init_artifactIdentity();
		init_evidence();
		init_jsonValue();
		inventory = (digit) => {
			const sha = digit.repeat(64);
			const artifactId = artifactIdForContent(sha);
			const nodes = [{
				artifact_id: artifactId,
				format: "file",
				sha256: sha,
				size: 1,
				media_type: null,
				architecture: null,
				content_state: "materialized",
				limitations: []
			}];
			const occurrences = [{
				occurrence_id: occurrenceIdForLocation({
					rootArtifactId: artifactId,
					logicalPath: ".",
					entryKind: "file"
				}),
				artifact_id: artifactId,
				parent_occurrence_id: null,
				relationship_coverage: "complete",
				logical_path: ".",
				entry_kind: "file",
				artifact_kind: "resource",
				artifact_format: "file",
				declared_size: 1,
				compressed_size: null,
				executable: false,
				encrypted: false,
				hash_status: "verified",
				source_location: null,
				limitations: []
			}];
			const edges = [];
			const integrityContradictions = [];
			const graphSha256 = artifactGraphDigest({
				nodes,
				occurrences,
				edges,
				contradictions: integrityContradictions
			});
			return jsonValueSchema.parse({
				manifest: {
					manifest_id: artifactManifestId(artifactId, graphSha256),
					root_artifact_id: artifactId,
					root_sha256: sha,
					root_format: "file",
					graph_sha256: graphSha256,
					node_count: nodes.length,
					occurrence_count: occurrences.length,
					edge_count: edges.length
				},
				nodes,
				occurrences,
				edges,
				provenance: [],
				integrity_contradictions: integrityContradictions,
				coverage: {
					scope: "root",
					status: "complete"
				},
				limitations: []
			});
		};
		provider = {
			id: "rea-artifact",
			name: "REA artifact graph",
			version: "1"
		};
		ARTIFACT_COMPARISON_EXAMPLE = {
			left: createEvidence({
				path: "fixture-left",
				sha256: "0".repeat(64),
				format: "file"
			}, provider, {
				operation: "inventory_artifact",
				parameters: {},
				result: inventory("0"),
				confidence: "observed",
				authority: "shipped-artifact"
			}),
			right: createEvidence({
				path: "fixture-right",
				sha256: "1".repeat(64),
				format: "file"
			}, provider, {
				operation: "inventory_artifact",
				parameters: {},
				result: inventory("1"),
				confidence: "observed",
				authority: "shipped-artifact"
			})
		};
	})))();
}

//#endregion
//#region dist/contracts/enhancedInputs.js
var traceLiteralInputSchema, DEFAULT_CALL_RELATIONSHIP_DIRECTION, MAX_ENHANCED_RECORDS, callRelationshipDirectionSchema, enhancedInputSchemas;
function init_enhancedInputs() {
	return (init_enhancedInputs = __esmMin((() => {
		init_objcSwiftMetadata();
		init_nativeProcedureInput();
		init_decompileDirectory();
		init_nativeValueTrace();
		init_nativeInvestigationGraph();
		traceLiteralInputSchema = z.strictObject({
			query: z.string().min(1),
			case_sensitive: z.boolean().default(false)
		});
		DEFAULT_CALL_RELATIONSHIP_DIRECTION = "forward";
		MAX_ENHANCED_RECORDS = 2e4;
		callRelationshipDirectionSchema = z.enum(["forward", "backward"]).default(DEFAULT_CALL_RELATIONSHIP_DIRECTION);
		enhancedInputSchemas = {
			trace_native_values: nativeValueTraceInputSchema,
			inspect_native_dispatch_metadata: nativeDispatchMetadataInputSchema,
			get_objc_classes: z.strictObject({ pattern: z.string().default("") }),
			get_objc_protocols: z.strictObject({}),
			batch_decompile: z.strictObject({ addresses: z.array(z.string().describe("A provider-normalized procedure address")).max(MAX_ENHANCED_RECORDS).default([]) }),
			decompile_all: decompileDirectoryInputSchema,
			get_call_graph: z.strictObject({
				address: z.string().describe("A procedure symbol or address to resolve to its canonical entry"),
				direction: callRelationshipDirectionSchema
			}),
			analyze_swift_types: z.strictObject({
				category: z.enum([
					"classes",
					"structs",
					"enums",
					"protocols",
					"extensions",
					"other"
				]).optional().describe("Limit categorized results to one Swift category; unresolved category observations remain in unclassified."),
				pattern: z.string().optional().describe("Case-sensitive literal filter applied to provider procedure names and their supporting Swift manglings.")
			}),
			find_xrefs_to_name: z.strictObject({ name: z.string() }),
			binary_overview: z.strictObject({}),
			analyze_function: nativeProcedureInputSchema,
			inspect_native_api: nativeProcedureInputSchema,
			trace_feature: traceLiteralInputSchema,
			trace_call_path: z.strictObject({
				start: z.string().describe("A starting procedure symbol or address"),
				goal: z.string().describe("An optional destination procedure symbol or address").optional(),
				direction: callRelationshipDirectionSchema
			}),
			trace_native_ui_action: nativeInvestigationTraceLimitsSchema.extend({ action: z.string().min(1).describe("A unique compiled UI action selector, interface object ID, native symbol or exact function address") })
		};
	})))();
}

//#endregion
//#region dist/contracts/functionComparisonExample.js
var dossier, observe, FUNCTION_COMPARISON_EXAMPLE;
function init_functionComparisonExample() {
	return (init_functionComparisonExample = __esmMin((() => {
		init_enhancedInputs();
		init_evidence();
		init_jsonValue();
		dossier = (text) => jsonValueSchema.parse({
			procedure: {
				address: "0x1000",
				name: "main",
				symbol: {
					primary: true,
					dynamic: false,
					external: false,
					type: "function",
					source: "imported"
				},
				classification: null,
				body: {
					available: false,
					reason: "The fixture omits function-body extent observations."
				},
				signature: "int main(void)",
				locals: []
			},
			pseudocode: text,
			assembly: ["ret"],
			comments: [],
			callers: [],
			callees: [],
			incoming_references: [],
			outgoing_references: [],
			referenced_strings: [],
			referenced_names: [],
			basic_blocks: [{
				start: "0x1000",
				end: "0x1001",
				successors: []
			}],
			native_api: null,
			native_value_flow: null,
			facet_availability: {
				pseudocode: { available: true },
				assembly: { available: true },
				comments: { available: true },
				callers: { available: true },
				callees: { available: true },
				references: { available: true },
				strings_names: { available: true },
				cfg: { available: true }
			},
			limitations: ["The fixture omits native API and value-flow observations."]
		});
		observe = (digit, text) => createEvidence({
			path: `/tmp/function-${digit}`,
			sha256: digit.repeat(64),
			format: "mach-o"
		}, {
			id: "rea-workflow",
			name: "REA composed investigation workflow",
			version: "1"
		}, {
			operation: "analyze_function",
			parameters: enhancedInputSchemas.analyze_function.parse({ procedure: "main" }),
			result: dossier(text),
			confidence: "derived",
			authority: "shipped-artifact",
			relationshipCoverage: { status: "complete" }
		});
		FUNCTION_COMPARISON_EXAMPLE = {
			left: observe("0", "return 0;"),
			right: observe("1", "return 1;")
		};
	})))();
}

//#endregion
//#region dist/domain/process/processComparisonEvidence.js
var compareProcessCaptureEvidence;
function init_processComparisonEvidence() {
	return (init_processComparisonEvidence = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		init_processComparison();
		init_processEvidenceProvider();
		compareProcessCaptureEvidence = (left, right, options = {}) => {
			const comparison = compareProcessCaptures(left.capture, right.capture, options);
			const evidence = createEvidence(unknownTarget("derived-from-linked-evidence"), PROCESS_PROVIDER, {
				predicateType: "rea.process-comparison",
				operation: "compare_process_captures",
				parameters: {
					left_evidence_id: left.record.evidence_id,
					right_evidence_id: right.record.evidence_id,
					left_normalization: left.capture.normalization,
					right_normalization: right.capture.normalization,
					...options.maxCaptureAgeMs === undefined ? {} : { max_capture_age_ms: options.maxCaptureAgeMs },
					...options.traceSpecification === undefined ? {} : { trace_spec: options.traceSpecification }
				},
				result: comparison,
				confidence: "derived",
				authority: "analyst-inference",
				limitations: comparison.limitations,
				locations: [...left.record.locations, ...right.record.locations],
				evidenceLinks: [left.record.evidence_id, right.record.evidence_id]
			});
			return {
				comparison,
				evidence
			};
		};
	})))();
}

//#endregion
//#region dist/domain/process/processCaptureExample.js
var normalization, scenario, comparisonContract, EMPTY_PROCESS_CAPTURE_EXAMPLE;
function init_processCaptureExample() {
	return (init_processCaptureExample = __esmMin((() => {
		init_processScenario();
		normalization = {
			paths: true,
			pids: true,
			ports: true,
			time_bucket_ms: 10,
			patterns: []
		};
		scenario = { executable_sha256: "0".repeat(64) };
		comparisonContract = {};
		EMPTY_PROCESS_CAPTURE_EXAMPLE = {
			manifest: {
				rea_version: "1.1.0",
				provider_version: "3",
				platform: "fixture",
				architecture: "fixture",
				pty_backend: "node-pty",
				started_at: "2026-01-01T00:00:00.000Z",
				completed_at: "2026-01-01T00:00:00.001Z",
				scenario,
				comparison_contract: comparisonContract,
				full_scenario_sha256: digestProcessCommitment(scenario),
				comparison_contract_sha256: digestProcessCommitment(comparisonContract),
				selected_executable_sha256: "0".repeat(64),
				executable_sha256: "0".repeat(64),
				executable_identity: {
					state: "path_metadata_unchanged",
					reason: null
				},
				root_process: { state: "withheld-by-caller" },
				normalization_sha256: digestProcessCommitment(normalization)
			},
			normalization,
			frames: [],
			rendered_frames: [],
			interaction_events: [],
			exit: {
				code: 0,
				signal: null,
				reason: "exited"
			},
			settlement: {
				state: "quiesced",
				elapsed_ms: 50,
				cleanup_outcome: "not_required"
			},
			process_samples: [],
			filesystem_checkpoints: [{
				name: "before",
				at_ms: 0,
				files: [],
				effects: [],
				truncated: false
			}, {
				name: "after_settlement",
				at_ms: 50,
				files: [],
				effects: [],
				truncated: false
			}],
			event_journal: [],
			files_before: [],
			files_after: [],
			filesystem_effects: [],
			truncated: false,
			truncation_details: {
				raw_terminal: {
					budget_bytes: 1e6,
					observed_bytes: 0,
					retained_bytes: 0,
					observed_frames: 0,
					retained_frames: 0
				},
				rendered_terminal: {
					budget_bytes: 1e6,
					observed_bytes: 0,
					retained_bytes: 0,
					observed_frames: 0,
					retained_frames: 0
				},
				filesystem_before: {
					files_limit: 1e4,
					depth_limit: 16,
					enumeration_truncated: false,
					enumeration_reasons: [],
					enumeration_omissions: [],
					hash_budget_bytes: 1e7,
					hashed_bytes: 0,
					hash_omissions: []
				},
				filesystem_after: {
					files_limit: 1e4,
					depth_limit: 16,
					enumeration_truncated: false,
					enumeration_reasons: [],
					enumeration_omissions: [],
					hash_budget_bytes: 1e7,
					hashed_bytes: 0,
					hash_omissions: []
				},
				process: {
					sample_limit: 1e3,
					sampling_partial: false,
					retained_samples: 0,
					sample_limit_reached: false,
					sampling_failures: 0,
					first_sampling_failure: null,
					coverage: "sampled"
				}
			},
			limitations: [],
			residual_unknowns: [],
			cleanup: {
				owned_process_group: "verified",
				temporary_root: "removed"
			}
		};
	})))();
}

//#endregion
//#region dist/domain/functionCallCoverage.js
var callerCoveragePrefix, calleeCoveragePrefix, combineFunctionRelationshipCoverage, isCallerOnlyIncompleteCoverage, assessFunctionCallCoverage;
function init_functionCallCoverage() {
	return (init_functionCallCoverage = __esmMin((() => {
		init_relationshipCoverage();
		init_canonicalOrdering();
		callerCoveragePrefix = "Callers: ";
		calleeCoveragePrefix = "Callees: ";
		combineFunctionRelationshipCoverage = (callers, callees) => {
			const reads = [{
				direction: "callers",
				coverage: callers
			}, {
				direction: "callees",
				coverage: callees
			}];
			const diagnostics = uniqueSorted(reads.flatMap(({ coverage }) => coverage?.diagnostics ?? []));
			const discovery = {
				...callers?.discovery?.callers === undefined ? {} : { callers: callers.discovery.callers },
				...callees?.discovery?.callees === undefined ? {} : { callees: callees.discovery.callees }
			};
			const details = {
				...diagnostics.length > 0 ? { diagnostics } : {},
				...Object.keys(discovery).length === 0 ? {} : { discovery }
			};
			const callersLimited = callers?.status !== "complete";
			const calleesLimited = callees?.status !== "complete";
			const limited_directions = callersLimited ? calleesLimited ? ["callers", "callees"] : ["callers"] : ["callees"];
			const reasons = reads.flatMap(({ direction, coverage }) => {
				const label = direction === "callers" ? callerCoveragePrefix : calleeCoveragePrefix;
				return relationshipCoverageLimitations(coverage).map((reason) => `${label}${reason}`);
			});
			if (reads.some(({ coverage }) => coverage === undefined || coverage.status === "unknown")) return {
				status: "unknown",
				reason: uniqueSorted(reasons).join(" "),
				limited_directions,
				...details
			};
			if (reasons.length > 0) return {
				status: "partial",
				limitations: uniqueSorted(reasons),
				limited_directions,
				...details
			};
			return {
				status: "complete",
				...details
			};
		};
		isCallerOnlyIncompleteCoverage = (coverage) => {
			if (coverage.status === "complete") return false;
			if (coverage.limited_directions !== undefined) return !coverage.limited_directions.some((direction) => direction === "callees");
			return coverage.status === "unknown" && coverage.reason.startsWith(callerCoveragePrefix) && !coverage.reason.includes(calleeCoveragePrefix);
		};
		assessFunctionCallCoverage = (coverage, dossier) => {
			const unresolvedCallCaveats = uniqueSorted((dossier.unresolved_calls ?? []).map(({ address, reason }) => `Unresolved call at ${address}: ${reason}`));
			const missingDiscovery = [];
			const discoveryLimitations = [];
			let discoveryStatus = "complete";
			for (const direction of ["callers", "callees"]) {
				const discovery = coverage?.discovery?.[direction];
				if (discovery?.status === "partial") discoveryStatus = "partial";
				else if (discovery?.status !== "complete" && discoveryStatus !== "partial") discoveryStatus = "unknown";
				if (discovery?.status === "complete") continue;
				if (discovery?.reason === undefined) missingDiscovery.push(direction);
				else discoveryLimitations.push(`Static direct-call discovery for ${direction} is ${discovery.status}: ${discovery.reason}`);
			}
			if (missingDiscovery.length > 0) discoveryLimitations.push(`Static direct-call discovery is not established for ${missingDiscovery.join(" and ")}.`);
			return {
				blockers: uniqueSorted([...relationshipCoverageLimitations(coverage), ...unresolvedCallCaveats]),
				unresolvedCallCaveats,
				diagnostics: uniqueSorted(coverage?.diagnostics ?? []),
				discoveryLimitations,
				discoveryStatus
			};
		};
	})))();
}

//#endregion
//#region dist/domain/native/functionCoordinateContext.js
var functionCoordinateContextSchema, createFunctionCoordinateContext, functionCoordinateContextsEqual;
function init_functionCoordinateContext() {
	return (init_functionCoordinateContext = __esmMin((() => {
		init_canonicalDigest();
		init_digests();
		init_analysisProfile();
		init_machoTargetSelection();
		functionCoordinateContextSchema = z.strictObject({
			kind: z.literal("native-function-coordinate-context-v1"),
			selected_image: machoTargetSelectionSchema.nullable(),
			mapping_sha256: digestSchema
		});
		createFunctionCoordinateContext = (mapping, selectedImage = null) => functionCoordinateContextSchema.parse({
			kind: "native-function-coordinate-context-v1",
			selected_image: selectedImage,
			mapping_sha256: digestCanonicalValue(mapping, "Native function coordinate mapping")
		});
		functionCoordinateContextsEqual = (left, right) => {
			if (left === null || right === null || !committedProvidersEqual(left.provider, right.provider)) return false;
			const leftContext = functionCoordinateContextSchema.safeParse(left.parameters.function_coordinate_context);
			const rightContext = functionCoordinateContextSchema.safeParse(right.parameters.function_coordinate_context);
			return leftContext.success && rightContext.success && leftContext.data.mapping_sha256 === rightContext.data.mapping_sha256 && (leftContext.data.selected_image === null ? rightContext.data.selected_image === null : sameMachoTargetSelection(leftContext.data.selected_image, rightContext.data.selected_image ?? undefined));
		};
	})))();
}

//#endregion
//#region dist/domain/functionDossierEvidence.js
var functionSnapshotCoordinateContext, parseFunctionEvidence;
function init_functionDossierEvidence() {
	return (init_functionDossierEvidence = __esmMin((() => {
		init_evidence();
		init_targetIdentity();
		init_analysisErrorCore();
		init_evidenceValidation();
		init_result();
		init_unicodeCodePointOrder();
		init_functionDossier();
		init_functionCallCoverage();
		init_functionCoordinateContext();
		functionSnapshotCoordinateContext = (left, right) => {
			if (left.target.sha256 !== right.target.sha256) return "cross-artifact";
			return left.target.architecture !== null && sameTargetIdentity(left.target, right.target) && functionCoordinateContextsEqual(left.evidence.analysis_profile, right.evidence.analysis_profile) ? "common" : "unknown";
		};
		parseFunctionEvidence = (input, selection) => {
			const [first] = selection.path;
			const side = selection.path.length === 1 && (first === "left" || first === "right") ? { side: first } : {};
			const parsed = readEvidence(input, side);
			if (!parsed.ok) return parsed;
			const evidence = parsed.value;
			const invalidSelection = (message, facts) => err(new AnalysisInputError(selection.operation, { userMessage: message }, [{
				path: selection.path,
				reason: "invalid_value",
				message,
				...facts
			}]));
			if (evidence.operation !== "analyze_function" || evidence.predicate_type !== "rea.analysis") {
				const location = selection.path.map(String).join(".");
				const subject = location === "" ? "supplied Evidence" : selection.path.length === 1 ? `${location} Evidence` : `Evidence at ${location}`;
				return invalidSelection(`Function analysis requires analyze_function Evidence with the rea.analysis predicate; the ${subject} has operation ${evidence.operation} and predicate ${evidence.predicate_type}.`, {
					expected: {
						operation: "analyze_function",
						predicate_type: ANALYSIS_EVIDENCE_PREDICATE
					},
					observed: {
						operation: evidence.operation,
						predicate_type: evidence.predicate_type
					}
				});
			}
			const target = evidenceFileTarget(evidence);
			if (target === undefined) return invalidSelection("Function analysis requires artifact-bound Evidence");
			const dossier = readEvidencePayload(functionDossierSchema, evidence.normalized_result, {
				...side,
				within: ["normalized_result"]
			});
			if (!dossier.ok) return dossier;
			const callCoverage = assessFunctionCallCoverage(evidence.relationship_coverage, dossier.value);
			return ok({
				evidence,
				target,
				dossier: dossier.value,
				limitations: [...new Set([...evidence.limitations, ...dossier.value.limitations])].sort((left, right) => compareUnicodeCodePoints(left, right)),
				callCoverageBlockers: callCoverage.blockers,
				unresolvedCallCaveats: callCoverage.unresolvedCallCaveats,
				callCoverageDiagnostics: callCoverage.diagnostics,
				callDiscoveryLimitations: callCoverage.discoveryLimitations,
				callDiscoveryStatus: callCoverage.discoveryStatus
			});
		};
	})))();
}

//#endregion
//#region dist/domain/functionComparisonNormalization.js
var identityProjection, functionMatch, normalizeCfg, commentProjection, referencedStringProjection, nameAndSwiftProjection, swiftLiteralSitesConflict, swiftLiteralCoverage, swiftLiteralSites, sorted, parseAddress, relativeAddress;
function init_functionComparisonNormalization() {
	return (init_functionComparisonNormalization = __esmMin((() => {
		init_nativeSymbol();
		init_comparisonSemantics();
		init_unicodeCodePointOrder();
		init_nativeAddress();
		identityProjection = (snapshot) => ({
			name: snapshot.dossier.procedure.name,
			signature: snapshot.dossier.procedure.signature,
			locals: snapshot.dossier.procedure.locals.map(({ description }) => description).sort()
		});
		functionMatch = (left, right, coordinateContext) => {
			const leftName = left.dossier.procedure.name;
			const rightName = right.dossier.procedure.name;
			if (coordinateContext === "common") {
				const leftEntry = nativeAddressInputSchema.safeParse(left.dossier.procedure.address);
				const rightEntry = nativeAddressInputSchema.safeParse(right.dossier.procedure.address);
				if (leftEntry.success && rightEntry.success) return leftEntry.data === rightEntry.data ? {
					status: "matched",
					method: "same-entry",
					entry_address: leftEntry.data,
					left_name: leftName,
					right_name: rightName
				} : {
					status: "mismatched",
					method: "explicit",
					left_name: leftName,
					right_name: rightName
				};
			}
			if (left.evidence.evidence_id === right.evidence.evidence_id) return {
				status: "matched",
				method: "same-evidence",
				left_name: leftName,
				right_name: rightName
			};
			if (coordinateContext === "common") return {
				status: "ambiguous",
				method: "explicit",
				left_name: leftName,
				right_name: rightName
			};
			const stableNames = hasStableNativeSymbol(leftName, left.dossier.procedure.symbol) && hasStableNativeSymbol(rightName, right.dossier.procedure.symbol);
			if (stableNames && leftName === rightName) return {
				status: "matched",
				method: "symbol",
				left_name: leftName,
				right_name: rightName
			};
			return {
				status: stableNames && coordinateContext === "cross-artifact" ? "mismatched" : "ambiguous",
				method: "explicit",
				left_name: leftName,
				right_name: rightName
			};
		};
		normalizeCfg = (blocks) => {
			const parsed = [];
			let space;
			for (const block of blocks) {
				const start = parseAddress(block.start);
				const end = parseAddress(block.end);
				if (start === null || end === null || start.space !== end.space || space !== undefined && start.space !== space || end.offset <= start.offset) return null;
				space = start.space;
				parsed.push({
					block,
					start: start.offset,
					end: end.offset
				});
			}
			const ordered = parsed.sort((left, right) => left.start < right.start ? -1 : left.start > right.start ? 1 : 0);
			if (new Set(ordered.map(({ start }) => start)).size !== ordered.length) return null;
			const indices = new Map(ordered.map(({ start }, index) => [start, index]));
			const graph = [];
			for (const { block, start, end } of ordered) {
				const successors = [];
				for (const address of block.successors) {
					const parsedAddress = parseAddress(address);
					if (parsedAddress === null || parsedAddress.space !== space) return null;
					const index = indices.get(parsedAddress.offset);
					if (index === undefined) return null;
					successors.push(index);
				}
				graph.push({
					size: String(end - start),
					successors: successors.sort((left, right) => left - right)
				});
			}
			return graph;
		};
		commentProjection = (snapshot) => {
			const values = snapshot.dossier.comments.map(({ address, kind, text }) => ({
				offset: relativeAddress(address, snapshot.dossier.procedure.address),
				kind,
				text
			}));
			return values.some(({ offset }) => offset === null) ? null : sorted(values);
		};
		referencedStringProjection = (snapshot) => {
			const values = snapshot.dossier.referenced_strings.map(({ source_address: sourceAddress, value, decoding, string }) => ({
				source_offset: relativeAddress(sourceAddress, snapshot.dossier.procedure.address),
				content: decoding === undefined ? value : null,
				decoding_reason: decoding?.reason ?? null,
				metadata: string === undefined ? null : {
					encoding: string.encoding,
					termination: string.termination,
					byte_length: string.byte_length
				}
			}));
			return sorted(values);
		};
		nameAndSwiftProjection = (snapshot, includeSwiftLiterals = true) => {
			const values = [...snapshot.dossier.referenced_names.map(({ source_address: sourceAddress, value }) => ({
				kind: "name",
				source_offset: relativeAddress(sourceAddress, snapshot.dossier.procedure.address),
				value
			})), ...(includeSwiftLiterals ? snapshot.dossier.swift_string_literals ?? [] : []).map(({ source_address: sourceAddress, value, representation, registers }) => ({
				kind: "swift_string",
				source_offset: relativeAddress(sourceAddress, snapshot.dossier.procedure.address),
				value,
				representation,
				registers
			}))];
			return values.some(({ source_offset: offset }) => offset === null) ? null : sorted(values);
		};
		swiftLiteralSitesConflict = (left, right) => {
			const leftSites = swiftLiteralSites(left);
			const rightSites = swiftLiteralSites(right);
			for (const site of new Set([...leftSites.values.keys(), ...rightSites.values.keys()])) {
				const leftValues = leftSites.values.get(site) ?? (leftSites.complete ? [] : undefined);
				const rightValues = rightSites.values.get(site) ?? (rightSites.complete ? [] : undefined);
				if (leftValues === undefined || rightValues === undefined) continue;
				const leftFacts = new Set(leftValues);
				const rightFacts = new Set(rightValues);
				if (rightSites.complete && leftValues.some((value) => !rightFacts.has(value)) || leftSites.complete && rightValues.some((value) => !leftFacts.has(value))) return true;
			}
			return false;
		};
		swiftLiteralCoverage = (snapshot) => (snapshot.dossier.swift_string_literal_omissions ?? []).length > 0 ? "partial" : snapshot.dossier.swift_string_literals === undefined ? "absent" : "complete";
		swiftLiteralSites = (snapshot) => {
			const base = snapshot.dossier.procedure.address;
			const site = (sourceAddress, registers) => {
				const offset = relativeAddress(sourceAddress, base);
				return offset === null ? null : canonicalJson([offset, registers]);
			};
			const values = new Map();
			for (const literal of snapshot.dossier.swift_string_literals ?? []) {
				const key = site(literal.source_address, literal.registers);
				if (key === null) continue;
				values.set(key, [...values.get(key) ?? [], canonicalJson([literal.value, literal.representation])].sort(compareUnicodeCodePoints));
			}
			const complete = swiftLiteralCoverage(snapshot) === "complete";
			return {
				values,
				complete
			};
		};
		sorted = (values) => values.map((value) => ({
			value,
			json: canonicalJson(value, "Function normalization")
		})).sort((left, right) => compareUnicodeCodePoints(left.json, right.json)).map(({ value }) => value);
		parseAddress = (value) => {
			const parsed = nativeAddressCoordinateInputSchema.safeParse(value);
			return parsed.success ? parsed.data : null;
		};
		relativeAddress = (value, base) => {
			const parsed = parseAddress(value);
			const parsedBase = parseAddress(base);
			return parsed === null || parsedBase === null || parsed.space !== parsedBase.space || parsed.offset < parsedBase.offset ? null : String(parsed.offset - parsedBase.offset);
		};
	})))();
}

//#endregion
//#region dist/domain/functionReferenceCompatibility.js
var ReferenceFlowError, ReferenceFlow, groupRows, referenceFactsCompatible;
function init_functionReferenceCompatibility() {
	return (init_functionReferenceCompatibility = __esmMin((() => {
		ReferenceFlowError = class extends Error {
			code;
			_tag = "ReferenceFlowError";
			constructor(code) {
				super(code);
				this.code = code;
				this.name = "ReferenceFlowError";
			}
		};
		ReferenceFlow = class {
			edges = [];
			node() {
				this.edges.push([]);
				return this.edges.length - 1;
			}
			connect(from, to, capacity) {
				const forward = this.edges[from];
				const reverse = this.edges[to];
				if (forward === undefined || reverse === undefined) throw new ReferenceFlowError("endpoint_unallocated");
				forward.push({
					to,
					reverse: reverse.length,
					remaining: capacity
				});
				reverse.push({
					to: from,
					reverse: forward.length - 1,
					remaining: 0
				});
			}
			covers(source, sink, required) {
				let delivered = 0;
				while (delivered < required) {
					const levels = Array(this.edges.length).fill(-1);
					const queue = [source];
					levels[source] = 0;
					for (let index = 0; index < queue.length; index++) {
						const node = queue[index];
						if (node === undefined) break;
						for (const edge of this.edges[node] ?? []) {
							if (edge.remaining <= 0 || levels[edge.to] !== -1) continue;
							levels[edge.to] = (levels[node] ?? -1) + 1;
							queue.push(edge.to);
						}
					}
					if (levels[sink] === -1) return false;
					const next = Array(this.edges.length).fill(0);
					let amount;
					while (delivered < required && (amount = this.augment(source, sink, required - delivered, levels, next)) > 0) delivered += amount;
				}
				return true;
			}
			augment(source, sink, capacity, levels, next) {
				const nodes = [source];
				const path = [];
				const capacities = [capacity];
				while (nodes.length > 0) {
					const node = nodes[nodes.length - 1];
					if (node === undefined) break;
					if (node === sink) {
						const amount = capacities[capacities.length - 1] ?? 0;
						for (const edge of path) {
							edge.remaining -= amount;
							const reverse = this.edges[edge.to]?.[edge.reverse];
							if (reverse === undefined) throw new ReferenceFlowError("reverse_edge_unallocated");
							reverse.remaining += amount;
						}
						return amount;
					}
					const adjacent = this.edges[node] ?? [];
					let edge = adjacent[next[node] ?? 0];
					while (edge !== undefined && (edge.remaining <= 0 || levels[edge.to] !== (levels[node] ?? -1) + 1)) {
						next[node] = (next[node] ?? 0) + 1;
						edge = adjacent[next[node] ?? 0];
					}
					if (edge === undefined) {
						levels[node] = -1;
						nodes.pop();
						path.pop();
						capacities.pop();
						continue;
					}
					path.push(edge);
					nodes.push(edge.to);
					capacities.push(Math.min(capacities[capacities.length - 1] ?? 0, edge.remaining));
				}
				return 0;
			}
		};
		groupRows = (rows) => {
			const groups = new Map();
			for (const row of rows) {
				const key = JSON.stringify([
					row.direction,
					row.source,
					row.target,
					row.kind
				]);
				const previous = groups.get(key);
				if (previous !== undefined) previous.count += 1;
				else groups.set(key, {
					...row,
					mask: (row.source === null ? 0 : 1) | (row.target === null ? 0 : 2) | (row.kind === null ? 0 : 4),
					count: 1
				});
			}
			return groups;
		};
		referenceFactsCompatible = (left, right) => {
			if (left.length !== right.length) return false;
			if (left.length === 0) return true;
			const leftGroups = groupRows(left);
			const rightGroups = groupRows(right);
			if (leftGroups.size === rightGroups.size && [...leftGroups].every(([key, group]) => rightGroups.get(key)?.count === group.count)) return true;
			if ([...leftGroups.values(), ...rightGroups.values()].every(({ mask }) => mask === 7)) return false;
			let required = left.length;
			for (const [key, group] of leftGroups) {
				if (group.mask !== 7) continue;
				const other = rightGroups.get(key);
				if (other === undefined) continue;
				const cancelled = Math.min(group.count, other.count);
				group.count -= cancelled;
				other.count -= cancelled;
				required -= cancelled;
				if (group.count === 0) leftGroups.delete(key);
				if (other.count === 0) rightGroups.delete(key);
			}
			const leftMasks = new Set([...leftGroups.values()].map(({ mask }) => mask));
			const rightMasks = new Set([...rightGroups.values()].map(({ mask }) => mask));
			const flow = new ReferenceFlow();
			const source = flow.node();
			const sink = flow.node();
			const buckets = new Map();
			const bucket = (group, leftMask, rightMask) => {
				const intersection = leftMask & rightMask;
				const key = JSON.stringify([
					group.direction,
					leftMask,
					rightMask,
					intersection & 1 ? group.source : null,
					intersection & 2 ? group.target : null,
					intersection & 4 ? group.kind : null
				]);
				const existing = buckets.get(key);
				if (existing !== undefined) return existing;
				const node = flow.node();
				buckets.set(key, node);
				return node;
			};
			for (const group of leftGroups.values()) {
				const node = flow.node();
				flow.connect(source, node, group.count);
				for (const mask of rightMasks) flow.connect(node, bucket(group, group.mask, mask), group.count);
			}
			for (const group of rightGroups.values()) {
				const node = flow.node();
				flow.connect(node, sink, group.count);
				for (const mask of leftMasks) flow.connect(bucket(group, mask, group.mask), node, group.count);
			}
			return flow.covers(source, sink, required);
		};
	})))();
}

//#endregion
//#region dist/domain/functionRelationshipComparison.js
var ambiguousProcedureNames, endpoint, project, endpointKey, constraints, compareFunctionRelationships, compareRelationshipFacts;
function init_functionRelationshipComparison() {
	return (init_functionRelationshipComparison = __esmMin((() => {
		init_comparisonSemantics();
		init_functionComparisonNormalization();
		init_nativeSymbol();
		init_functionReferenceCompatibility();
		init_nativeAddress();
		ambiguousProcedureNames = (snapshots) => {
			const ambiguous = new Set();
			for (const snapshot of snapshots) {
				const entries = new Map();
				const observe = (procedure) => {
					if (procedure === null) return;
					const address = nativeAddressInputSchema.safeParse(procedure.address);
					if (!address.success) {
						ambiguous.add(procedure.name);
						return;
					}
					const previous = entries.get(procedure.name);
					if (previous !== undefined && previous !== address.data) ambiguous.add(procedure.name);
					entries.set(procedure.name, address.data);
				};
				observe(snapshot.dossier.procedure);
				for (const procedure of [...snapshot.dossier.callers, ...snapshot.dossier.callees]) observe(procedure);
				for (const edge of snapshot.dossier.incoming_references) {
					observe(edge.source_procedure);
					observe(edge.target_procedure);
				}
				for (const edge of snapshot.dossier.outgoing_references) {
					observe(edge.source_procedure);
					observe(edge.target_procedure);
				}
			}
			return ambiguous;
		};
		endpoint = (procedure, address, coordinateContext, ambiguousNames) => {
			if (coordinateContext === "common") {
				const parsed = nativeAddressInputSchema.safeParse(address);
				if (parsed.success) return {
					kind: "address",
					address: parsed.data
				};
				return {
					kind: "unknown",
					reason: "unparsed_address",
					reported_address: address,
					reported_name: procedure?.name ?? null
				};
			}
			if (coordinateContext === "unknown") return {
				kind: "unknown",
				reason: "coordinate_context",
				reported_address: address,
				reported_name: procedure?.name ?? null
			};
			if (procedure === null || !hasStableNativeSymbol(procedure.name, procedure.symbol)) return {
				kind: "unknown",
				reason: procedure === null || procedure.name.length === 0 ? "missing_name" : nativeSymbolOrigin(procedure.symbol) === "generated" ? "generated_name" : "symbol_origin",
				reported_address: address,
				reported_name: procedure?.name ?? null
			};
			return {
				kind: "name",
				name: procedure.name,
				ambiguous: ambiguousNames.has(procedure.name)
			};
		};
		project = (snapshot, coordinateContext, ambiguousNames, dimension) => {
			const facts = [];
			if (dimension === "calls") {
				for (const [direction, procedures] of [["in", snapshot.dossier.callers], ["out", snapshot.dossier.callees]]) for (const procedure of procedures) facts.push({
					direction,
					source: null,
					target: endpoint(procedure, procedure.address, coordinateContext, ambiguousNames),
					kind: null
				});
				return facts;
			}
			const collect = (references, direction) => {
				for (const edge of references) {
					let kind = null;
					if (edge.kind.available) {
						const { available: _available, provenance: _provenance, ...known } = edge.kind;
						kind = known;
					}
					facts.push({
						direction,
						source: endpoint(edge.source_procedure, edge.source_address, coordinateContext, ambiguousNames),
						target: endpoint(edge.target_procedure, edge.target_address, coordinateContext, ambiguousNames),
						kind
					});
				}
			};
			collect(snapshot.dossier.incoming_references, "in");
			collect(snapshot.dossier.outgoing_references, "out");
			return facts;
		};
		endpointKey = (value) => {
			if (value === null || value.kind === "unknown") return null;
			return canonicalJson(value.kind === "address" ? { address: value.address } : { name: value.name });
		};
		constraints = (facts) => facts.map((fact) => ({
			direction: fact.direction,
			source: endpointKey(fact.source),
			target: endpointKey(fact.target),
			kind: fact.kind === null ? null : canonicalJson(fact.kind)
		}));
		compareFunctionRelationships = (left, right, coordinateContext) => {
			const ambiguousNames = ambiguousProcedureNames([left, right]);
			const compare = (dimension) => compareRelationshipFacts(project(left, coordinateContext, ambiguousNames, dimension), project(right, coordinateContext, ambiguousNames, dimension), dimension, coordinateContext);
			return {
				calls: compare("calls"),
				references: compare("references")
			};
		};
		compareRelationshipFacts = (leftFacts, rightFacts, dimension, coordinateContext) => {
			let unknownIdentity = false;
			let ambiguousIdentity = false;
			let unknownKinds = false;
			for (const facts of [leftFacts, rightFacts]) {
				for (const fact of facts) {
					unknownKinds ||= dimension === "references" && fact.kind === null;
					for (const value of [fact.source, fact.target]) {
						unknownIdentity ||= value !== null && value.kind === "unknown";
						ambiguousIdentity ||= value !== null && value.kind === "name" && value.ambiguous;
					}
				}
			}
			const limitations = [];
			if (unknownIdentity && coordinateContext !== "unknown") limitations.push(coordinateContext === "common" ? "Relationship endpoint coordinates could not be parsed, so their identity remains unknown." : "Unnamed relationship endpoints, generated symbols and unknown symbol origins have no stable identity outside a common executable coordinate context.");
			if (coordinateContext === "unknown" && (unknownIdentity || ambiguousIdentity)) limitations.push("A common executable coordinate context is not established: artifact format, known architecture and provider coordinate commitments must agree.");
			if (ambiguousIdentity) limitations.push("A relationship name cannot establish a unique comparable procedure entry, so matching names do not establish equal endpoints.");
			if (unknownKinds) limitations.push("At least one provider did not expose reference kinds, so compatible endpoints do not prove equal edge semantics.");
			const context = {
				leftCount: leftFacts.length,
				rightCount: rightFacts.length,
				limitations
			};
			if (!referenceFactsCompatible(constraints(leftFacts), constraints(rightFacts))) return {
				...context,
				status: "changed",
				left: sorted(leftFacts),
				right: sorted(rightFacts),
				limitations: ["Known relationship facts cannot be paired without contradicting an endpoint or reference kind.", ...limitations]
			};
			if (unknownIdentity || ambiguousIdentity || unknownKinds) return {
				...context,
				status: "unknown"
			};
			return {
				...context,
				status: "unchanged",
				left: sorted(leftFacts),
				right: sorted(rightFacts)
			};
		};
	})))();
}

//#endregion
//#region dist/domain/functionComparisonDimensions.js
var compareDimensions, facetLimitations, compareText, compareComments, compareStringsAndNames, stringsAndNamesResult, compareReferencedStrings, compareRepeatedStringRows, groupStringsByContent, sameMultiset, groupStringsByOffset, compareReferences, compareIdentity, compareCalls, compareCfg, compareValues;
function init_functionComparisonDimensions() {
	return (init_functionComparisonDimensions = __esmMin((() => {
		init_nativeSymbol();
		init_comparisonSemantics();
		init_functionRelationshipComparison();
		init_functionComparisonNormalization();
		init_functionComparisonResults();
		compareDimensions = (left, right, context) => {
			const relationships = compareFunctionRelationships(left, right, context.coordinateContext);
			return [
				compareIdentity(left, right, context),
				compareText("pseudocode", left.dossier.pseudocode, right.dossier.pseudocode, context),
				compareText("assembly", left.dossier.assembly.join("\n"), right.dossier.assembly.join("\n"), context),
				compareComments(left, right, context),
				compareCalls(left, right, relationships.calls, context),
				compareReferences(relationships.references, context),
				compareStringsAndNames(left, right, context),
				compareCfg(left, right, context)
			].map((result) => {
				const limitations = [...facetLimitations(left, result.dimension).map((reason) => `Left: ${reason}`), ...facetLimitations(right, result.dimension).map((reason) => `Right: ${reason}`)];
				return limitations.length === 0 ? result : {
					...unresolvedDimension({
						dimension: result.dimension,
						links: context.links,
						leftCount: null,
						rightCount: null,
						limitations: [...result.limitations, ...limitations]
					}),
					...result.discovery_status === undefined ? {} : { discovery_status: result.discovery_status }
				};
			});
		};
		facetLimitations = (snapshot, dimension) => {
			const { dossier } = snapshot;
			const fields = {
				identity: [],
				pseudocode: [["pseudocode", dossier.pseudocode.length]],
				assembly: [["assembly", dossier.assembly.length]],
				comments: [["comments", dossier.comments.length]],
				calls: [["callers", dossier.callers.length], ["callees", dossier.callees.length]],
				references: [["references", dossier.incoming_references.length + dossier.outgoing_references.length]],
				strings_names: [["strings_names", dossier.referenced_strings.length + dossier.referenced_names.length + (dossier.swift_string_literals?.length ?? 0)]],
				cfg: [["cfg", dossier.basic_blocks.length]]
			};
			return fields[dimension].flatMap(([field, count]) => {
				const availability = dossier.facet_availability?.[field];
				if (availability?.available === false) return [`${field}: ${availability.reason}`];
				return availability === undefined && count === 0 ? [`${field}: Provider did not declare coverage for this empty facet.`] : [];
			});
		};
		compareText = (dimension, left, right, context) => {
			const limitations = ["Exact provider text is compared without address or generated-name normalization; layout-only differences do not establish a behavior change.", ...dimension === "assembly" ? ["Assembly is opaque provider text; relocation normalization is unavailable."] : []];
			if (context.providersDiffer) return unresolvedDimension({
				dimension,
				links: context.links,
				leftCount: [...left].length,
				rightCount: [...right].length,
				limitations: [...limitations, "Exact text comparison requires one provider identity."]
			});
			const changes = diffLines(left, right, {
				timeout: 100,
				maxEditLength: 1e4
			});
			if (changes === undefined) return unresolvedDimension({
				dimension,
				links: context.links,
				leftCount: [...left].length,
				rightCount: [...right].length,
				limitations: [...limitations, "Bounded line diff exceeded its time or edit-distance limit."]
			});
			const delta = changes.reduce((summary, change) => ({
				added_lines: summary.added_lines + (change.added ? change.count : 0),
				removed_lines: summary.removed_lines + (change.removed ? change.count : 0),
				hunks: summary.hunks + (change.added || change.removed ? 1 : 0)
			}), {
				added_lines: 0,
				removed_lines: 0,
				hunks: 0
			});
			return dimensionResult({
				dimension,
				status: delta.hunks === 0 ? "unchanged" : "changed",
				left,
				right,
				...context,
				leftCount: [...left].length,
				rightCount: [...right].length,
				textDelta: delta,
				limitations
			});
		};
		compareComments = (left, right, context) => {
			const leftValues = commentProjection(left);
			const rightValues = commentProjection(right);
			if (leftValues === null || rightValues === null) return unresolvedDimension({
				dimension: "comments",
				links: context.links,
				leftCount: left.dossier.comments.length,
				rightCount: right.dossier.comments.length,
				limitations: ["Comment locations could not be normalized relative to the function."]
			});
			return compareValues("comments", leftValues, rightValues, context);
		};
		compareStringsAndNames = (left, right, context) => {
			const complete = swiftLiteralCoverage(left) === swiftLiteralCoverage(right) && swiftLiteralCoverage(left) !== "partial";
			const leftStrings = referencedStringProjection(left);
			const rightStrings = referencedStringProjection(right);
			const stringFacts = compareReferencedStrings(leftStrings, rightStrings);
			const leftNamesAndLiterals = nameAndSwiftProjection(left, complete);
			const rightNamesAndLiterals = nameAndSwiftProjection(right, complete);
			if (stringFacts.changed) return stringsAndNamesResult({
				leftStrings,
				rightStrings,
				leftNamesAndLiterals,
				rightNamesAndLiterals,
				context,
				status: "changed",
				limitations: [
					...stringFacts.limitations,
					...leftNamesAndLiterals === null || rightNamesAndLiterals === null ? ["Reference source locations could not be normalized to function offsets."] : [],
					...complete ? [] : ["Swift String literal coverage differs or is partial; complete coverage does not establish a differing literal."]
				]
			});
			if (leftNamesAndLiterals === null || rightNamesAndLiterals === null) return unresolvedDimension({
				dimension: "strings_names",
				links: context.links,
				leftCount: null,
				rightCount: null,
				limitations: ["Reference source locations could not be normalized to function offsets."]
			});
			const compared = compareValues("strings_names", leftNamesAndLiterals, rightNamesAndLiterals, context);
			if (compared.status === "changed") return stringsAndNamesResult({
				leftStrings,
				rightStrings,
				leftNamesAndLiterals,
				rightNamesAndLiterals,
				context,
				status: "changed",
				limitations: stringFacts.limitations
			});
			if (swiftLiteralSitesConflict(left, right)) {
				const leftAll = nameAndSwiftProjection(left);
				const rightAll = nameAndSwiftProjection(right);
				if (leftAll !== null && rightAll !== null) {
					const literalComparison = compareValues("strings_names", leftAll, rightAll, context);
					if (literalComparison.status === "changed") return stringsAndNamesResult({
						leftStrings,
						rightStrings,
						leftNamesAndLiterals: leftAll,
						rightNamesAndLiterals: rightAll,
						context,
						status: "changed",
						limitations: stringFacts.limitations
					});
				}
			}
			const limitations = [...stringFacts.limitations, ...complete ? [] : ["Swift String literal coverage differs or is partial; complete coverage does not establish a differing literal."]];
			if (limitations.length === 0) return stringsAndNamesResult({
				leftStrings,
				rightStrings,
				leftNamesAndLiterals,
				rightNamesAndLiterals,
				context,
				status: "unchanged"
			});
			return unresolvedDimension({
				dimension: "strings_names",
				links: context.links,
				leftCount: null,
				rightCount: null,
				limitations
			});
		};
		stringsAndNamesResult = ({ leftStrings, rightStrings, leftNamesAndLiterals, rightNamesAndLiterals, context, status, limitations = [] }) => dimensionResult({
			dimension: "strings_names",
			status,
			left: {
				referenced_strings: leftStrings,
				names_and_literals: leftNamesAndLiterals
			},
			right: {
				referenced_strings: rightStrings,
				names_and_literals: rightNamesAndLiterals
			},
			...context,
			leftCount: leftNamesAndLiterals === null ? null : leftStrings.length + leftNamesAndLiterals.length,
			rightCount: rightNamesAndLiterals === null ? null : rightStrings.length + rightNamesAndLiterals.length,
			textDelta: null,
			limitations
		});
		compareReferencedStrings = (left, right) => {
			const leftGroups = groupStringsByOffset(left);
			const rightGroups = groupStringsByOffset(right);
			const leftUnlocated = leftGroups.get(null) !== undefined;
			const rightUnlocated = rightGroups.get(null) !== undefined;
			const limitations = new Set([...left, ...right].flatMap(({ decoding_reason }) => decoding_reason === null ? [] : [`Referenced string decoding unavailable: ${decoding_reason}`]));
			let changed = false;
			for (const offset of new Set([...leftGroups.keys(), ...rightGroups.keys()])) {
				const leftRows = leftGroups.get(offset);
				const rightRows = rightGroups.get(offset);
				if (offset === null) {
					limitations.add("Referenced string source location could not be normalized.");
					continue;
				}
				if (leftRows === undefined || rightRows === undefined) {
					if (leftUnlocated || rightUnlocated) limitations.add(`Referenced string membership at source offset ${offset} is ambiguous because another source location is unavailable.`);
					else changed = true;
					continue;
				}
				if (leftRows.length !== 1 || rightRows.length !== 1) {
					const repeated = compareRepeatedStringRows(leftRows, rightRows);
					if (repeated !== null) {
						changed ||= repeated.changed;
						for (const limitation of repeated.limitations) limitations.add(limitation);
						continue;
					}
					limitations.add(`Multiple referenced strings at source offset ${offset} cannot be paired without ambiguity.`);
					continue;
				}
				const leftRow = leftRows[0];
				const rightRow = rightRows[0];
				if (leftRow === undefined || rightRow === undefined) continue;
				if (leftRow.content !== null && rightRow.content !== null && leftRow.content !== rightRow.content) changed = true;
				if (leftRow.metadata !== null && rightRow.metadata !== null && (leftRow.metadata.encoding !== rightRow.metadata.encoding || leftRow.metadata.termination !== rightRow.metadata.termination || leftRow.metadata.byte_length !== rightRow.metadata.byte_length)) changed = true;
				if (leftRow.metadata === null !== (rightRow.metadata === null)) limitations.add(`Typed string metadata is unavailable at source offset ${offset}.`);
				if (leftRow.content === null || rightRow.content === null) {
					if (leftRow.content !== null || rightRow.content !== null) limitations.add(`Referenced string content is unavailable on one side at source offset ${offset}.`);
				}
			}
			return {
				changed,
				limitations: [...limitations]
			};
		};
		compareRepeatedStringRows = (left, right) => {
			if (left.some(({ content }) => content === null) || right.some(({ content }) => content === null)) return null;
			const leftByContent = groupStringsByContent(left);
			const rightByContent = groupStringsByContent(right);
			let changed = !sameMultiset(left.flatMap(({ content }) => content === null ? [] : [content]), right.flatMap(({ content }) => content === null ? [] : [content]));
			const limitations = new Set();
			for (const content of new Set([...leftByContent.keys(), ...rightByContent.keys()])) {
				const leftRows = leftByContent.get(content) ?? [];
				const rightRows = rightByContent.get(content) ?? [];
				if (leftRows.length !== rightRows.length) continue;
				const leftMetadata = leftRows.map(({ metadata }) => metadata);
				const rightMetadata = rightRows.map(({ metadata }) => metadata);
				if (leftMetadata.every((metadata) => metadata === null) && rightMetadata.every((metadata) => metadata === null)) continue;
				if (leftMetadata.some((metadata) => metadata === null) || rightMetadata.some((metadata) => metadata === null)) {
					limitations.add("Typed string metadata is unavailable for repeated content at a source offset.");
					continue;
				}
				changed ||= !sameMultiset(leftMetadata.map((metadata) => JSON.stringify(metadata)), rightMetadata.map((metadata) => JSON.stringify(metadata)));
			}
			return {
				changed,
				limitations: [...limitations]
			};
		};
		groupStringsByContent = (strings) => {
			const groups = new Map();
			for (const string of strings) {
				if (string.content === null) continue;
				const rows = groups.get(string.content);
				if (rows === undefined) groups.set(string.content, [string]);
				else rows.push(string);
			}
			return groups;
		};
		sameMultiset = (left, right) => {
			const leftValues = [...left].sort();
			const rightValues = [...right].sort();
			return leftValues.length === rightValues.length && leftValues.every((value, index) => value === rightValues[index]);
		};
		groupStringsByOffset = (strings) => {
			const groups = new Map();
			for (const string of strings) {
				const rows = groups.get(string.source_offset);
				if (rows === undefined) groups.set(string.source_offset, [string]);
				else rows.push(string);
			}
			return groups;
		};
		compareReferences = (compared, context) => {
			if (compared.status === "unknown") return unresolvedDimension({
				dimension: "references",
				links: context.links,
				leftCount: compared.leftCount,
				rightCount: compared.rightCount,
				limitations: compared.limitations
			});
			return dimensionResult({
				dimension: "references",
				...compared,
				...context,
				textDelta: null
			});
		};
		compareIdentity = (left, right, context) => {
			if (!context.sameIdentity && (!hasStableNativeSymbol(left.dossier.procedure.name, left.dossier.procedure.symbol) || !hasStableNativeSymbol(right.dossier.procedure.name, right.dossier.procedure.symbol))) return unresolvedDimension({
				dimension: "identity",
				links: context.links,
				leftCount: null,
				rightCount: null,
				limitations: ["Empty names, generated symbols and unknown symbol origins do not establish cross-version identity."]
			});
			return compareValues("identity", identityProjection(left), identityProjection(right), context);
		};
		compareCalls = (left, right, comparison, context) => {
			const coverageLimitations = [...left.callCoverageBlockers.map((reason) => `Left: ${reason}`), ...right.callCoverageBlockers.map((reason) => `Right: ${reason}`)];
			const coverageDiagnostics = [
				...left.callCoverageDiagnostics.map((reason) => `Left: ${reason}`),
				...right.callCoverageDiagnostics.map((reason) => `Right: ${reason}`),
				...left.callDiscoveryLimitations.map((reason) => `Left: ${reason}`),
				...right.callDiscoveryLimitations.map((reason) => `Right: ${reason}`)
			];
			const discovery_status = left.callDiscoveryStatus === "partial" || right.callDiscoveryStatus === "partial" ? "partial" : left.callDiscoveryStatus === "complete" && right.callDiscoveryStatus === "complete" ? "complete" : "unknown";
			if (coverageLimitations.length > 0) return {
				...unresolvedDimension({
					dimension: "calls",
					links: context.links,
					leftCount: comparison.leftCount,
					rightCount: comparison.rightCount,
					limitations: [...coverageLimitations, ...coverageDiagnostics]
				}),
				discovery_status
			};
			if (comparison.status === "unknown") return {
				...unresolvedDimension({
					dimension: "calls",
					links: context.links,
					leftCount: comparison.leftCount,
					rightCount: comparison.rightCount,
					limitations: [...comparison.limitations, ...coverageDiagnostics]
				}),
				discovery_status
			};
			return {
				...dimensionResult({
					dimension: "calls",
					...comparison,
					...context,
					textDelta: null,
					limitations: [...comparison.limitations, ...coverageDiagnostics]
				}),
				discovery_status
			};
		};
		compareCfg = (left, right, context) => {
			const leftBlocks = left.dossier.basic_blocks;
			const rightBlocks = right.dossier.basic_blocks;
			const leftGraph = normalizeCfg(leftBlocks);
			const rightGraph = normalizeCfg(rightBlocks);
			if (leftGraph === null || rightGraph === null) return unresolvedDimension({
				dimension: "cfg",
				links: context.links,
				leftCount: leftBlocks.length,
				rightCount: rightBlocks.length,
				limitations: ["CFG addresses could not be normalized to local block indices."]
			});
			return compareValues("cfg", leftGraph, rightGraph, context);
		};
		compareValues = (dimension, left, right, context, limitations = []) => {
			const leftJson = canonicalJson(left, "Function comparison");
			const rightJson = canonicalJson(right, "Function comparison");
			return dimensionResult({
				dimension,
				status: leftJson === rightJson ? "unchanged" : "changed",
				left,
				right,
				...context,
				leftCount: Array.isArray(left) ? left.length : null,
				rightCount: Array.isArray(right) ? right.length : null,
				textDelta: null,
				limitations
			});
		};
	})))();
}

//#endregion
//#region dist/domain/functionComparison.js
var compareFunctions;
function init_functionComparison() {
	return (init_functionComparison = __esmMin((() => {
		init_comparisonSemantics();
		init_unicodeCodePointOrder();
		init_functionDossierEvidence();
		init_functionComparisonNormalization();
		init_functionComparisonSchemas();
		init_functionComparisonResults();
		init_functionComparisonDimensions();
		compareFunctions = (left, right) => {
			const links = [left.evidence.evidence_id, right.evidence.evidence_id];
			const providersDiffer = canonicalJson(left.evidence.provider, "Function comparison") !== canonicalJson(right.evidence.provider, "Function comparison");
			const coordinateContext = functionSnapshotCoordinateContext(left, right);
			const match = functionMatch(left, right, coordinateContext);
			const dimensions = compareDimensions(left, right, {
				links,
				providersDiffer,
				sameIdentity: match.method === "same-entry" || match.method === "same-evidence",
				coordinateContext
			});
			const changes = dimensions.filter(({ status }) => status !== "unchanged");
			return functionComparisonResultSchema.parse({
				status: overallStatus(dimensions, match.status),
				function_match: match,
				left_subject_sha256: left.target.sha256,
				right_subject_sha256: right.target.sha256,
				summary: summarize$1(dimensions),
				dimensions,
				changes,
				limitations: [...new Set([
					...left.limitations.map((item) => `Left: ${item}`),
					...right.limitations.map((item) => `Right: ${item}`),
					...providersDiffer ? ["Provider-specific pseudocode and assembly representations were not equated."] : []
				])].sort((a, b) => compareUnicodeCodePoints(a, b))
			});
		};
	})))();
}

//#endregion
//#region dist/contracts/investigationExamples.js
var left, right, comparison, FUNCTION_COMPARISON_EVIDENCE, capture, captureEvidence, PROCESS_CAPTURE_REFERENCE, PROCESS_CAPTURE_RECONSTRUCTION, PROCESS_COMPARISON_EVIDENCE, INVESTIGATION_EXAMPLES;
function init_investigationExamples() {
	return (init_investigationExamples = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		init_comparisonEvidenceIdentity();
		init_processComparisonEvidence();
		init_processEvidenceProvider();
		init_processCaptureParsing();
		init_functionComparisonExample();
		init_processCaptureExample();
		init_functionDossierEvidence();
		init_functionComparison();
		left = parseFunctionEvidence(FUNCTION_COMPARISON_EXAMPLE.left, {
			operation: "compare_functions",
			path: ["left"]
		});
		if (!left.ok) throw left.error;
		right = parseFunctionEvidence(FUNCTION_COMPARISON_EXAMPLE.right, {
			operation: "compare_functions",
			path: ["right"]
		});
		if (!right.ok) throw right.error;
		comparison = compareFunctions(left.value, right.value);
		FUNCTION_COMPARISON_EVIDENCE = createEvidence(unknownTarget("derived-from-linked-evidence"), FUNCTION_COMPARISON_PROVIDER, {
			predicateType: "rea.function-comparison",
			operation: "compare_functions",
			analysisProfile: FUNCTION_COMPARISON_PROFILE,
			parameters: {
				left_evidence_id: left.value.evidence.evidence_id,
				right_evidence_id: right.value.evidence.evidence_id
			},
			result: comparison,
			confidence: "derived",
			authority: "analyst-inference",
			limitations: comparison.limitations,
			evidenceLinks: [left.value.evidence.evidence_id, right.value.evidence.evidence_id]
		});
		capture = parseProcessCapture(EMPTY_PROCESS_CAPTURE_EXAMPLE);
		captureEvidence = (scenario) => createEvidence(unknownTarget("not-observed"), PROCESS_PROVIDER, {
			predicateType: "rea.process-capture",
			operation: "capture_process_scenario",
			parameters: { scenario },
			result: capture,
			confidence: "observed",
			authority: "controlled-replay",
			environment: {
				id: "fixture-linux",
				platform: "linux",
				architecture: "x86_64",
				isolation: "container"
			}
		});
		PROCESS_CAPTURE_REFERENCE = captureEvidence("reference");
		PROCESS_CAPTURE_RECONSTRUCTION = captureEvidence("reconstruction");
		PROCESS_COMPARISON_EVIDENCE = compareProcessCaptureEvidence({
			record: PROCESS_CAPTURE_REFERENCE,
			capture
		}, {
			record: PROCESS_CAPTURE_RECONSTRUCTION,
			capture
		}).evidence;
		INVESTIGATION_EXAMPLES = {
			compare_process_captures: { input: {
				left: PROCESS_CAPTURE_REFERENCE,
				right: PROCESS_CAPTURE_RECONSTRUCTION
			} },
			find_changed_behavior: { comparisons: [{
				kind: "retained-evidence",
				evidence_id: FUNCTION_COMPARISON_EVIDENCE.evidence_id
			}] },
			build_call_path: {
				functions: [FUNCTION_COMPARISON_EXAMPLE.left],
				start: { address: "0x1000" },
				goal: { address: "0x1000" }
			},
			correlate_static_and_runtime: {
				static_comparisons: [FUNCTION_COMPARISON_EVIDENCE],
				runtime_comparisons: [PROCESS_COMPARISON_EVIDENCE],
				mappings: [{
					static: {
						comparison_evidence_id: FUNCTION_COMPARISON_EVIDENCE.evidence_id,
						selector: {
							kind: "function",
							dimension: "pseudocode"
						}
					},
					runtime: {
						comparison_evidence_id: PROCESS_COMPARISON_EVIDENCE.evidence_id,
						dimension: "terminal"
					},
					side_alignment: "left_to_left",
					hypothesis: {
						statement: "Static implementation changed without terminal change.",
						expected_pattern: "static_only"
					}
				}]
			},
			verify_reconstruction: { specification: {
				name: "Terminal compatibility",
				claims: [{
					kind: "behavioral",
					claim_id: "terminal-output",
					title: "Terminal output remains equivalent",
					comparison_evidence_id: PROCESS_COMPARISON_EVIDENCE.evidence_id,
					dimension: "terminal"
				}]
			} }
		};
	})))();
}

//#endregion
//#region dist/contracts/toolContractExamples.js
var TOOL_EXAMPLE_OVERRIDES;
function init_toolContractExamples() {
	return (init_toolContractExamples = __esmMin((() => {
		init_unknownContractExamples();
		init_artifactComparisonExample();
		init_functionComparisonExample();
		init_investigationExamples();
		TOOL_EXAMPLE_OVERRIDES = {
			...UNKNOWN_CONTRACT_EXAMPLES,
			...INVESTIGATION_EXAMPLES,
			inspect_byte_entropy: { path: "/artifacts/firmware.bin" },
			goto_address: { address: "0x1000" },
			procedure_address: { procedure: "main" },
			procedure_assembly: { procedure: "main" },
			procedure_callees: { procedure: "main" },
			procedure_callers: { procedure: "main" },
			procedure_info: { procedure: "main" },
			trace_native_values: { procedure: "0x1000" },
			inspect_native_data_type: { type: "/MyStruct" },
			inspect_native_instruction: { address: "0x1000" },
			resolve_native_call_targets: { address: "0x1000" },
			read_function_instructions: { procedure: "main" },
			read_bytes: {
				address: "0x1000",
				length: 16
			},
			search_bytes: { pattern: "48 8B ?? ?? 89" },
			address_to_file_offset: { address: "0x1000" },
			procedure_references: { procedure: "main" },
			procedure_pseudo_code: { procedure: "main" },
			resolve_containing_procedure: { address: "0x1000" },
			search_procedures: { pattern: "main" },
			search_strings: { pattern: "authorization failed" },
			set_address_name: {
				address: "0x1000",
				name: "entry"
			},
			set_addresses_names: { names: { "0x1000": "entry" } },
			set_bookmark: { address: "0x1000" },
			set_comment: {
				address: "0x1000",
				comment: "validated entry point"
			},
			set_inline_comment: {
				address: "0x1000",
				comment: "calls parser"
			},
			unset_bookmark: { address: "0x1000" },
			get_call_graph: { address: "0x1000" },
			find_xrefs_to_name: { name: "malloc" },
			analyze_function: { procedure: "main" },
			annotate_native_function: {
				procedure: "0x10100",
				name: "entry",
				comment: "Analyst observation"
			},
			analyze_swift_types: {
				category: "classes",
				pattern: "Account"
			},
			inspect_native_api: { procedure: "main" },
			trace_feature: { query: "license" },
			trace_call_path: {
				start: "0x1000",
				goal: "0x1100"
			},
			trace_native_ui_action: { action: "buildTapped:" },
			decompile_all: { output_directory: "/tmp/decompile-out" },
			open_binary: { path: "/tmp/fixture" },
			open_bundle_resources: { path: "/tmp/Fixture.app" },
			export_evidence_bundle: { path: "/tmp/evidence.json" },
			get_evidence_bundle: {
				detail: "summary",
				filters: {
					operation: "analyze_function",
					procedure_address: "0x1000"
				}
			},
			inspect_address_context: { address: "0x1000" },
			import_evidence_bundle: { path: "/tmp/evidence.json" },
			capture_process_scenario: {
				executable: "/usr/bin/true",
				working_directory: "/tmp",
				timeout_ms: 3e4,
				finalization_ms: 1500
			},
			compare_process_captures: {
				left: PROCESS_CAPTURE_REFERENCE,
				right: PROCESS_CAPTURE_RECONSTRUCTION
			},
			compare_artifacts: {
				left: ARTIFACT_COMPARISON_EXAMPLE.left,
				right: ARTIFACT_COMPARISON_EXAMPLE.right
			},
			match_native_functions: {
				left: {
					kind: "retained-evidence",
					evidence_id: `ev_${"1".repeat(64)}`
				},
				right: {
					kind: "retained-evidence",
					evidence_id: `ev_${"2".repeat(64)}`
				}
			},
			compare_functions: {
				left: FUNCTION_COMPARISON_EXAMPLE.left,
				right: FUNCTION_COMPARISON_EXAMPLE.right
			},
			compare_bundles: {
				left_bundle_path: "/tmp/left-evidence.json",
				right_bundle_path: "/tmp/right-evidence.json"
			},
			inspect_with_objdump: {
				path: "/tmp/program",
				operation: "disassemble"
			},
			execute_rizin_command: {
				path: "/tmp/program",
				command: "iI"
			},
			list_frida_devices: {},
			list_frida_processes: { device_id: "local" },
			start_frida_session: {
				mode: "attach",
				device_id: "local",
				pid: 1234
			},
			load_frida_script: {
				session_id: "00000000-0000-4000-8000-000000000001",
				source_kind: "inline",
				source: "send(Process.id);"
			},
			resume_frida_session: { session_id: "00000000-0000-4000-8000-000000000001" },
			unload_frida_script: {
				session_id: "00000000-0000-4000-8000-000000000001",
				script_id: "00000000-0000-4000-8000-000000000002"
			},
			frida_session_status: { session_id: "00000000-0000-4000-8000-000000000001" },
			close_frida_session: { session_id: "00000000-0000-4000-8000-000000000001" },
			instrument_with_frida: {
				mode: "attach",
				device_id: "local",
				pid: 1234,
				source_kind: "inline",
				source: "send(Process.id);",
				duration_ms: 1e3
			}
		};
	})))();
}

//#endregion
//#region dist/contracts/toolContractHelpers.js
var document, address, optionalAddress, procedure, exampleInputSchema, examplesFor;
function init_toolContractHelpers() {
	return (init_toolContractHelpers = __esmMin((() => {
		init_jsonValue();
		init_toolContractExamples();
		document = z.string().optional().describe("The active target's provider document name; use open_binary to switch targets");
		address = z.string().min(1).describe("A provider-normalized address; default memory uses 0x-prefixed hexadecimal");
		optionalAddress = address.optional();
		procedure = z.string().min(1).describe("The procedure name or address");
		exampleInputSchema = z.record(z.string(), jsonValueSchema);
		examplesFor = (name, inputSchema) => {
			const parsed = inputSchema.parse(TOOL_EXAMPLE_OVERRIDES[name] ?? {});
			return [{
				title: `Example ${name.replaceAll("_", " ")} request`,
				input: exampleInputSchema.parse(parsed)
			}];
		};
	})))();
}

//#endregion
//#region dist/contracts/toolEffects.js
var toolEffects, evidenceEffects, nativeEvidenceEffects, browserEvidenceEffects, providerEffects, providerRemoteEffects, providerNetworkEvidenceEffects, providerUiNetworkEvidenceEffects, annotationsFromEffects, TARGET_CONTENT_FREE_TOOLS, toolReturnsTargetContent, toolContractMetadata;
function init_toolEffects() {
	return (init_toolEffects = __esmMin((() => {
		toolEffects = (overrides = {}) => ({
			mutatesTarget: false,
			mutatesSession: false,
			writesFilesystem: false,
			launchesProcess: false,
			accessesNetwork: false,
			changesUiState: false,
			mayDiscardData: false,
			executesForeignCode: false,
			mutatesDevice: false,
			idempotent: true,
			...overrides
		});
		evidenceEffects = toolEffects({ mutatesSession: true });
		nativeEvidenceEffects = toolEffects({
			mutatesSession: true,
			launchesProcess: true
		});
		browserEvidenceEffects = toolEffects({
			mutatesSession: true,
			accessesNetwork: true
		});
		providerEffects = (session, global) => ({
			session,
			global
		});
		providerRemoteEffects = {
			launchesProcess: true,
			writesFilesystem: true,
			accessesNetwork: true
		};
		providerNetworkEvidenceEffects = providerEffects(evidenceEffects, providerRemoteEffects);
		providerUiNetworkEvidenceEffects = providerEffects(evidenceEffects, {
			...providerRemoteEffects,
			changesUiState: true
		});
		annotationsFromEffects = (value) => ({
			readOnlyHint: !(value.mutatesTarget || value.mutatesSession || value.writesFilesystem || value.launchesProcess || value.accessesNetwork || value.changesUiState || value.mayDiscardData || value.executesForeignCode || value.mutatesDevice),
			destructiveHint: value.mayDiscardData || value.executesForeignCode || value.mutatesDevice,
			idempotentHint: value.idempotent,
			openWorldHint: value.launchesProcess || value.accessesNetwork
		});
		TARGET_CONTENT_FREE_TOOLS = new Set([
			"inspect_analysis_settings",
			"update_analysis_settings",
			"export_evidence_bundle",
			"search_guidance",
			"read_guidance_section",
			"guided_workflows",
			"record_unknown"
		]);
		toolReturnsTargetContent = (name) => !TARGET_CONTENT_FREE_TOOLS.has(name);
		toolContractMetadata = (name, audit) => {
			const sessionEffects = "session" in audit ? audit.session : audit;
			const effects = "session" in audit ? toolEffects({
				...audit.session,
				...audit.global
			}) : audit;
			return {
				title: name.split("_").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" "),
				effects,
				sessionEffects,
				annotations: annotationsFromEffects(effects),
				returnsTargetContent: toolReturnsTargetContent(name)
			};
		};
	})))();
}

//#endregion
//#region dist/contracts/sessionToolContracts.js
var SESSION_CLI_CONTRACTS, session, exportEvidenceBundleInputSchema, OPEN_BINARY_TOOL_CONTRACT, SESSION_TOOL_CONTRACTS;
function init_sessionToolContracts() {
	return (init_sessionToolContracts = __esmMin((() => {
		init_toolOutputSchemaPrimitives();
		init_functionMatchingContracts();
		init_localPath();
		init_investigationInputContracts();
		init_changedBehavior();
		init_functionComparisonSchemas();
		init_processScenario();
		init_residualUnknown();
		init_reconstructionVerificationSchemas();
		init_toolOutputSchemaGroups();
		init_sessionLifecycleInputs();
		init_sessionStatusContract();
		init_processComparisonContracts();
		init_artifactComparisonContracts();
		init_sessionToolSchemas();
		init_toolContractHelpers();
		init_toolEffects();
		SESSION_CLI_CONTRACTS = new Set([
			"compare_process_captures",
			"compare_artifacts",
			"match_native_functions"
		]);
		session = (name, audit, description, inputSchema) => ({
			name,
			...toolContractMetadata(name, audit),
			description,
			kind: "session",
			...SESSION_CLI_CONTRACTS.has(name) ? { cli: true } : {},
			inputSchema,
			outputSchema: requireOutputSchema(sessionOutputSchemas, name),
			examples: examplesFor(name, inputSchema)
		});
		exportEvidenceBundleInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute local filesystem path for the exported evidence bundle; relative paths are rejected."),
			overwrite: z.boolean().default(false)
		});
		OPEN_BINARY_TOOL_CONTRACT = session("open_binary", toolEffects({
			mutatesSession: true,
			writesFilesystem: true,
			launchesProcess: true,
			accessesNetwork: true,
			mayDiscardData: true
		}), "Open a validated local artifact or analysis database and bind its analysis provider. Switching target/provider can discard ephemeral Ghidra edits even if the later open fails; retained investigation Evidence does not restore them. Reopening the same target/profile retains the engine and edits. provider_id selects a provider or deterministic auto routing, with no failure fallback. Omitted format uses headers; format dos-com admits 1..65280 headerless bytes, while raw-binary requires architecture and entry_point and maps file offset 0 there. Optional snapshots must match target, provider and analysis profile; close/reopen before importing into a mutated engine. For Ghidra cross-process edits, set a private absolute REA_GHIDRA_CHECKPOINT_DIR at startup (stock ELF/PE/Mach-O on Linux/macOS); normal opens/closes restore/save metadata. Failed opens report selection_at_failure and target/provider at completion; use binary_session for current state. close_binary releases engine resources; reset_investigation clears retained records.", openBinaryInputSchema);
		SESSION_TOOL_CONTRACTS = [
			OPEN_BINARY_TOOL_CONTRACT,
			session("open_bundle_resources", toolEffects({
				mutatesSession: true,
				writesFilesystem: true,
				accessesNetwork: true,
				mayDiscardData: true
			}), "Open a local app bundle for read-only plist, Interface Builder, asset catalog, and keyed archive inspection without resolving or inventing its executable identity. This switches the shared session to a resource-only lane; executable analysis is unavailable until another target is opened.", openBundleResourcesInputSchema),
			session("close_binary", toolEffects({
				mutatesSession: true,
				writesFilesystem: true,
				accessesNetwork: true,
				mayDiscardData: true,
				idempotent: false
			}), "Release the active engine and owned resources while retaining investigation Evidence and complete Unknown history in memory. Drains earlier requests and queues later ones. If cleanup fails, keep this connection and retry close_binary without snapshot_path after the reported condition settles. Optional snapshot_path saves a target-bound snapshot first; resource-only sessions have no snapshot binding, existing files require overwrite, and failed saves keep the engine open. Metadata edits prevent immutable snapshot saves until recreation. Ghidra checkpoint mode saves metadata on normal close and retains the Program for retry if saving fails. Closing does not persist investigation records: export_evidence_bundle to save them, or reset_investigation to clear them.", closeBinaryInputSchema),
			session("reset_investigation", toolEffects({
				mutatesSession: true,
				writesFilesystem: true,
				accessesNetwork: true,
				mayDiscardData: true,
				idempotent: false
			}), "Discard retained Evidence and Unknown revision history, including engine replay/source bindings, while keeping a healthy active engine open. Drains earlier work and queues later requests. Optional save_path atomically syncs and publishes a complete bundle first; import_evidence_bundle restores its IDs/history. Cancellation, failed save or incomplete cleanup preserves records; any already-published checkpoint is reported. Without save_path, records are lost. binary_session reports the representation budget; no automatic persistence or eviction occurs.", resetInvestigationInputSchema),
			session("binary_session", toolEffects({ launchesProcess: true }), "Inspect current target, provider capabilities, analysis and server identity without starting analysis. Default summary reports Ghidra checkpoint/ephemeral mode in capabilities[].shared_limitations; detail complete adds diagnostics, candidate capabilities and tool flags. Set refresh_candidates true to recheck provider readiness without changing the active engine. analysis_provider_candidates_observed distinguishes fresh observations from selection-time facts. open_binary with provider_id can replace the engine and discard ephemeral edits; reopening without it reuses the route. release_verification is optional reported-version evidence, not executable authentication. omitted_fields names facts left out of summary.", binarySessionInputSchema),
			session("export_evidence_bundle", toolEffects({
				writesFilesystem: true,
				mayDiscardData: true
			}), "Atomically write the session's deterministic Evidence bundle to the requested local path. Existing files require overwrite: true; records and manifests use canonical byte-stable ordering.", exportEvidenceBundleInputSchema),
			session("import_evidence_bundle", toolEffects({ mutatesSession: true }), "Read the JSON bundle at the supplied local path, validate every Evidence ID and canonical manifest, then atomically merge it. Imported content is data only and is never executed. Import restores registry entries present in the bundle; questions embedded in Evidence do not automatically become Unknown registry entries.", importEvidenceBundleInputSchema),
			session("capture_process_scenario", toolEffects({
				mutatesSession: true,
				writesFilesystem: true,
				launchesProcess: true,
				accessesNetwork: true,
				executesForeignCode: true,
				idempotent: false
			}), "Run a caller-selected command under a PTY and return process capture Evidence and unknowns. It runs with the user's permissions, can change files or use network, and is not a sandbox. dry_run validates and returns a rea.process-scenario-plan without launching. Command names use inherited PATH; cwd defaults to the caller's and environment overrides augment inheritance. Filesystem observation is opt-in through filesystem_observation_paths. Terminal size must satisfy columns × (rows + scrollback) <= 1,000,000 on every resize; dimensions are never clamped and this limit has no override. Environment keys reject =/NUL and REA_PROCESS_RUN_ID is reserved. With positive finalization_ms, timeout/idle sends identity-checked SIGTERM, observes until the interval ends, then sends SIGKILL once; exit.finalization records attempts and observed exit. Cancellation still ends the run immediately.", processScenarioSchema),
			session("compare_process_captures", evidenceEffects, "Compare compatible process captures, inline or by {kind:\"retained-evidence\",evidence_id}, across terminal, interaction, lifecycle, process, filesystem, command-shim, HTTP and WebSocket observations. Optional trace_spec checks explicit partial-order or finite-trace assertions, including selected timing. Observer timing alone does not establish changed behavior; timestamps or sorting never establish concurrency. Missing, journal-free or truncated observations never establish equivalence.", processComparisonInputSchema),
			session("compare_artifacts", evidenceEffects, "Compare complete artifact inventories by occurrence path, content identity, metadata and graph relations; root . identifies the outer container separately. Accepts complete inline Evidence, {kind:\"retained-evidence\",evidence_id} for inspect_artifact/nested inventory/retained summary, or {kind:\"evidence-file\",path:\"/absolute/bundle.json\"} with optional evidence_id. Summaries resolve to their complete parent in that session/source bundle; summary facts alone are insufficient. Returns every delta inline with both source identities; coverage gaps remain truncated or unknown, never equivalence. Includes FIT and legacy uImage components.", artifactComparisonInputSchema),
			session("match_native_functions", evidenceEffects, "Pair two retained list_procedures inventories by unique exact symbols, then unique identical observed bytes. Optional same-context name/body/byte/dossier Evidence adds static facts; compatible CFG/call/string fingerprints propose unresolved groups only. Duplicate candidates stay unresolved, and only_left/right means unpaired within inputs, not proven addition/removal. Default summary retains the full matching for function-matches pages; complete returns every group. byte-sources identifies selected read_bytes Evidence: intersect IDs with function evidence_links. Dossier pairs supply retained-reference compare_functions inputs.", matchNativeFunctionsInputSchema),
			session("compare_functions", evidenceEffects, "Compare two explicit analyze_function Evidence records or exact retained session references across identity, exact provider text, calls, references, strings, and address-normalized CFG topology. The same authenticated Evidence record or compatible same-artifact entry coordinates establish correspondence independently of symbol origin; metadata and text changes remain separate. Missing or provider-incompatible facets remain truncated or unknown; every conclusion cites both Evidence sets.", functionComparisonInputSchema),
			session("compare_bundles", toolEffects({ mutatesSession: true }), "Compare two canonical Evidence bundles by exact record membership, explicit one-to-one observation pairs, and complete residual-unknown revision histories. Supply absolute local filesystem paths; relative paths are rejected. Missing bundle members describe omission only, never behavioral equivalence; output is digest-anchored and returns every change inline.", bundleComparisonMcpInputSchema),
			session("find_changed_behavior", evidenceEffects, "Aggregate validated process, artifact, and function comparison Evidence, supplied inline or by exact retained-evidence references from this session. Original records and their complete source closure remain authenticated; summaries do not substitute for comparisons. Runtime observations remain distinct from static behavior candidates; missing or incomplete comparisons produce unresolved findings, never causal claims. Returns every finding inline.", changedBehaviorInputSchema),
			session("build_call_path", evidenceEffects, "Build every shortest direct-callee path from complete analyze_function Evidence supplied inline or by exact retained-evidence references. References reuse the complete parent of an analyze_function summary without resending dossiers. Uses exact canonical addresses; missing dossiers and provider mixing remain unknown, and every node and edge cites source Evidence.", callPathRequestSchema),
			session("correlate_static_and_runtime", evidenceEffects, "Evaluate every explicit caller-declared hypothesis between static and runtime comparison Evidence supplied inline or by exact retained-evidence references. Similar names or paths are never auto-matched, consistent cochange never proves causality, and unknown or truncated inputs remain unresolved. Returns all correlations and their complete Evidence closure inline.", staticRuntimeCorrelationRequestSchema),
			session("verify_reconstruction", evidenceEffects, "Verify a finite typed behavioral, structural, and visual specification against a canonical Evidence bundle. Pass means every declared claim has complete comparable authority—not global source equivalence; changed claims fail and missing, limited, or unresolved evidence stays unknown.", reconstructionVerificationInputSchema),
			session("list_unknowns", toolEffects(), "List tracked questions' current revisions in deterministic ID order, with exact status/severity/domain filters. Complete inline by default; offset/limit pages the filtered order, total counts matches and next_offset null means exhausted. Unresolved, contradicted and non-truth dispositions stay distinct. An empty registry does not mean retained Evidence has no residual questions; inspect that Evidence or its analysis view.", listUnknownsInputSchema),
			session("record_unknown", toolEffects({
				mutatesSession: true,
				idempotent: false
			}), "Create one deterministic residual unknown and immutable mutation evidence. Its scope is the active binary analysis target digest, or null without an active target; supporting Evidence does not select the scope. Scope contributes to stable identity. Validates all evidence and relationship references, and rejects duplicate stable identity.", recordUnknownInputSchema),
			session("update_unknown", toolEffects({
				mutatesSession: true,
				idempotent: false
			}), "Append a full-state revision to one tracked question, with immutable mutation Evidence. Requires exact expected_revision; stale writers fail rather than overwrite. The question keeps its original scope, while mutation Evidence uses the active target digest or null and can have a different subject.", updateUnknownInputSchema),
			session("verify_unknown_resolution", toolEffects(), "Check a tracked question's current resolution against bundled Evidence, required authority/confidence/environment and revision integrity. Withdrawn and out-of-scope dispositions do not establish truth.", verifyUnknownResolutionInputSchema),
			session("get_evidence_bundle", toolEffects(), "Read retained Evidence and tracked questions without rerunning providers. Default complete returns an importable canonical bundle. detail summary lists record metadata; records pages complete records with unchanged IDs and missing direct evidence_links, but is not an importable bundle. detail links inspects retained/missing links without payloads; traversal retained-closure follows retained links and defaults to missing rows. Summary/records/links filters accept Evidence ID, operation, target SHA-256, analysis-profile digest or canonical procedure address. Metadata keeps retention distinct from truncated/unavailable source coverage. Use a discovered evidence_id with a compatible inspect_analysis_view to read selected facts.", getEvidenceBundleInputSchema),
			{
				...session("get_navigation_context", toolEffects({ mutatesSession: true }), "Return the selected document, current address, and containing/current procedure in one provider-neutral result. The result reflects sequential provider observations, not an atomic cursor snapshot; a cursor outside any procedure returns procedure: null.", navigationContextInputSchema),
				requiresActiveTarget: true
			},
			{
				...session("inspect_address_context", providerEffects(toolEffects({ mutatesSession: true }), providerRemoteEffects), "Inspect one explicit reproducible address for its analyzed name, containing procedure, regular and inline comments, and matching bookmarks. Each unsupported facet returns a typed unavailable outcome. A facet rejected for invalid input, source Evidence integrity, or a resource constraint retains its canonical error and recovery alongside successful facets. Use xrefs, assembly, or pseudocode for those deeper views.", addressContextInputSchema),
				requiresActiveTarget: true
			}
		];
	})))();
}

//#endregion
export { ARTIFACT_COMPARISON_PROVIDER, ELECTRON_FUSE_SENTINEL, FUNCTION_COMPARISON_PROVIDER, KeyedArchiveKindError, MAX_BYTE_SEARCH_MATCHES, MAX_NATIVE_CALL_CAPTURE_BYTES, NATIVE_CALL_CAPTURE_DEFAULTS, OPEN_BINARY_TOOL_CONTRACT, PROCESS_COMPARISON_DIMENSIONS, PROCESS_PROVIDER, PROVIDER_EFFECT_NAMES, SESSION_TOOL_CONTRACTS, TOOL_EXAMPLE_OVERRIDES, address, analysisDetailOutputSchemaOf, analysisDetailSchema, analysisDetailSummaryDefaultSchema, analysisProviderCandidate, analysisProviderCandidateSummary, appleAssetCatalogInputSchema, appleResourceKeyFields, artifactComparisonInputSchema, artifactOutputSchemas, assessFunctionCallCoverage, browserEvidenceEffects, byteEntropyOutputSchema, bytePatternFields, byteSearchResultSchema, combineFunctionRelationshipCoverage, compareArtifacts, compareManagedMembers, compareManagedMembersRequestSchema, compareProcessCaptureEvidence, createFunctionCoordinateContext, createPngChunkReader, describeElectronFuseFindings, document, dylibResolutionInputSchema, dylibResolutionResultSchema, electronFuseName, electronFuseOutputSchemas, electronFuseReportSchema, electronFuseState, enhancedInputSchemas, enhancedOutputSchemas, evidenceEffects, evidenceResultOf, examplesFor, executeManagedReconstructionImport, getEvidenceBundleInputSchema, hasPngSignature, importEvidenceBundleInputSchema, init_analysisDetail, init_appleAssetCatalog, init_artifactComparison, init_artifactComparisonContracts, init_bytePattern, init_comparisonEvidenceIdentity, init_dyldPaths, init_dylibResolution, init_electronFuses, init_enhancedInputs, init_functionCallCoverage, init_functionComparisonNormalization, init_functionCoordinateContext, init_functionMatchingContracts, init_keyedArchive, init_liveBinaryTargetSummary, init_managedApplicationGraph, init_managedMemberComparison, init_managedMemberComparisonMatch, init_managedMemberInstructionFacts, init_managedNativeVerificationSchemas, init_managedReconstruction, init_nativeByteRead, init_nativeCallCaptureLimits, init_nativeCallObservation, init_nativeDataType, init_nativeFunctionAnnotations, init_nativeUiObservation, init_pngHeader, init_processComparison, init_processComparisonContracts, init_processComparisonEvidence, init_processEvidenceProvider, init_providerOperationHealth, init_providerReleaseVerification, init_sessionLifecycleInputs, init_sessionToolContracts, init_sessionToolSchemas, init_toolContractExamples, init_toolContractHelpers, init_toolEffects, init_toolOutputSchemaGroups, init_toolOutputSchemaPrimitives, inspectElectronFusesInputSchema, isManagedMemberReferenceInstruction, isProcessEvidenceProvider, keyedArchiveInputSchema, keyedArchiveResultSchema, liveBinaryTargetSummarySchema, machoImageSlices, managedApplicationGraphReferenceInputSchema, managedApplicationGraphResultSchema, managedNativeVerificationRequestSchema, managedNativeVerificationResultSchema, managedOutputSchemas, managedReconstructionImportRequestSchema, managedWorkflowOutputSchemas, matchNativeFunctionsInputSchema, nativeByteReadSchema, nativeCallCaptureLimits, nativeCallEventSchema, nativeCallObservationInputSchema, nativeCallObservationResultSchema, nativeCallProcessOutcomeSchema, nativeCapturedOutputSchema, nativeCodeLocationSchema, nativeDataTypeInputSchema, nativeDataTypeSchema, nativeEvidenceEffects, nativeFunctionAnnotationsInputSchema, nativeFunctionAnnotationsSchema, nativeOutputSchemas, nativeUiObservationInputSchema, nativeUiResultSchema, nativeUiScenarioInputSchema, nativeUiSnapshotSchema, normalizeCfg, officialOutputSchemas, openBinaryTargetSelection, optionalAddress, parseAppleAssetCatalogRecords, procedure, processComparisonInputSchema, projectAppleAssetCatalogPage, projectKeyedArchive, projectManagedGraph, providerCapabilitySet, providerEffects, providerNetworkEvidenceEffects, providerReleaseVerificationSchema, providerRemoteEffects, providerRetryAction, providerUiNetworkEvidenceEffects, readManagedGraphProjection, readManagedMemberEvidence, readPngHeaderDimensions, readPngIhdrFacts, requireOutputSchema, resolveManagedReconstructionImport, resolveTreePath, sharedProviderFailureStage, toolContractMetadata, toolEffects, traceDylibLoading, validateBytePattern };