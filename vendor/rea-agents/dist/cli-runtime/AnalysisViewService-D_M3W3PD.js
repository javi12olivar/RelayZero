import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisInputError, AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, MAX_JSON_DEPTH, cancelledBy, immutableJsonSnapshotMember, init_analysisErrorCore, init_immutableJson, init_jsonValue, isImmutableJsonSnapshot, jsonObjectSchema, jsonValueSchema, jsonValueValidationIssue } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_analysisErrorProjection, projectAnalysisErrorWithoutCapturedOutput } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { analysisErrorWithCleanupDependencies, digestCanonicalValue, init_analysisErrorCleanup, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { ANALYSIS_EVIDENCE_PREDICATE, INSPECT_ANALYSIS_VIEW_OPERATION, analysisViewInputError, createEvidence, evidenceFileTarget, evidenceSubjectDisplay, evidenceSubjectInput, evidenceSubjectTarget, evidenceTargetIdentity, init_analysisViewErrors, init_evidence, init_evidenceFormat, init_evidenceValidation, isUnsupportedEvidenceFormat, rebindEvidenceToTargetPath, safeParseEvidence, unsupportedEvidenceFormatError } from "./nativeValueFlow-13oOEkkJ.js";
import { compareAsciiStrings, init_canonicalOrdering, uniqueSorted } from "./canonicalOrdering-C7Yzy62j.js";
import { init_digests, init_targetIdentity, prefixedDigestSchema, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_jsonValueByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { init_EvidenceBundleFiles, init_EvidenceInputResolver, init_evidenceFileSource, readEvidenceFileSource, readImmutableEvidenceBundle, resolveEvidenceInput } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { dispatchQueuedInterrupts, init_queuedInterrupts } from "./queuedInterrupts-gxezF6I5.js";
import { NATIVE_INVENTORY_OPERATIONS, NATIVE_OBSERVATION_OPERATIONS, init_nativeInventory, init_nativeObservation, isNativeInventoryOperation, isNativeObservationOperation, nativeAddressListSchema, nativeObservationSourceSchemas } from "./nativeValueTrace-B4vmCxtN.js";
import { functionDossierSchema, init_functionDossier } from "./functionDossier-Cff5XWxr.js";
import { ANALYSIS_VIEW_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { GROUP_BYTES, SEGMENT_BYTES, analysisViewResultInputError, assertOwnedView, boundedViewMessages, completeWithinViewCoverage, createAnalysisViewResultReader, init_analysisViewCoverage, init_analysisViewParent, init_analysisViewShape, init_endpointComparisonView, init_featureTraceView, init_javascriptModuleReferences, init_sourceToBundleView, init_webNetworkRouteTemplates, javascriptFactBasis, ownedView, pageViewCoverage, parentArtifactPath, parseAnalysisViewResult, projectEndpointComparisonView, projectFeatureTraceView, projectSourceToBundleView, readQueryParameterNames, readRecordedRequestLine, scanRouteTemplate, textBytes, unavailableViewCoverage, validateAnalysisViewSubject } from "./featureTraceView-CDxdbO2M.js";
import { init_browserScenarioCapture, retainedBrowserScenarioCaptureSchema } from "./browserNetworkMediaType-CbMlNDyh.js";
import { ARTIFACT_SECTIONS, NATIVE_FUNCTION_MATCHING_PREDICATE, analysisTextPage, analysisViewResultSchema, browserScenarioTransactionGroups, byteEntropySchema, createEnvironmentManifestAccumulator, createEnvironmentStateAccumulator, init_analysisViewRequest, init_analysisViewResult, init_analysisViewText, init_androidJniView, init_androidPackageView, init_androidSymbolView, init_apiContractView, init_apkSignatureView, init_artifactInventoryView, init_batchDecompileView, init_binaryLayout, init_browserScenarioNetworkView, init_browserScenarioViewSchemas, init_byteEntropy, init_byteEntropyView, init_commandObservationView, init_cyclonedxView, init_dartAotView, init_desktopApplicationView, init_devicetreeView, init_elfDependenciesView, init_environmentCoverageView, init_environmentManifestView, init_environmentStateView, init_erlangBeamView, init_evmInterfaceView, init_fridaSessionStatusView, init_functionMatching, init_goBinaryView, init_gpuCodeObjectsView, init_il2cppMetadataView, init_interfaceBuilderView, init_javascriptApplicationCoverage, init_javascriptFactsView, init_javascriptRoutesView, init_machoView, init_managedArtifactView, init_managedMemberViewSchemas, init_modelArtifactView, init_nativeExportsView, init_nativeFeatureTraceView, init_nativeFunctionMatchingView, init_nativeInstructionReferencesView, init_nativeInventoryView, init_nativeLoadImageView, init_nativeObservationSchemas, init_nativeProcedureReferencesView, init_nativeValueTraceView, init_nugetNupkgView, init_pcapCaptureView, init_playwrightTraceView, init_procedurePseudocodeSchemas, init_pythonPycView, init_rustBinaryView, init_wasmArtifactView, init_webBundleView, init_webNetworkCaptureView, init_webSourceLocationView, inspectAnalysisViewInputSchema, javascriptApplicationSourceCoverage, javascriptStaticSourceCoverageSummary, managedViewIdentityUnknowns, nativeSourceContextSchema, procedurePseudocodeSelectionSchema, projectAndroidJniView, projectAndroidPackageView, projectAndroidSymbolSummary, projectApiContractView, projectApkSignatureView, projectArtifactInventoryView, projectBatchDecompileView, projectByteEntropyView, projectCommandObservationView, projectCycloneDxView, projectDartAotView, projectDesktopApplicationView, projectDevicetreeView, projectElfDependenciesView, projectEnvironmentCoverageView, projectEnvironmentManifestView, projectEnvironmentStateView, projectErlangBeamView, projectEvmInterfaceView, projectFridaSessionStatusView, projectGoBinaryView, projectGpuCodeObjectsView, projectIl2cppMetadataView, projectInterfaceBuilderView, projectJavaScriptFacts, projectJavaScriptRoutesView, projectMachoView, projectManagedArtifactView, projectModelArtifactView, projectNativeExportsView, projectNativeFeatureTraceView, projectNativeFunctionMatchingView, projectNativeInstructionReferencesView, projectNativeInventoryView, projectNativeLoadImageView, projectNativeProcedureReferencesView, projectNativeValueTraceView, projectNugetNupkgView, projectPcapCaptureView, projectPlaywrightTraceView, projectPythonPycView, projectRustBinaryView, projectWasmArtifactView, projectWebBundleView, projectWebNetworkCaptureView, projectWebSourceLocationView, safeParseOwnedBinaryLayout, summarizeBrowserScenarioNetwork } from "./analysisViewResult-vDCF9Pxo.js";
import { WEB_NETWORK_CAPTURE_LIMITS, init_webNetworkCapture } from "./webNetworkCapture-DzOKad85.js";
import { WebNetworkProjectionAccumulator, admitAnalysisViewData, admitHarCaptureParent, init_WebNetworkProjectionAccumulator, init_analysisViewDataAdmission, init_apiSurfaceSchema } from "./WebNetworkProjectionAccumulator-DHsoO8rl.js";
import { init_managedArtifact, init_managedInspectionEvidence, managedMemberInspectionSchema, validateManagedTokenScope } from "./managedInspectionEvidence-Cw9u32rc.js";
import { init_recordedMediaType, mediaTypeEssence } from "./recordedMediaType-ClPIrW1i.js";
import { init_javascriptApplicationAnalysis, init_javascriptModuleUnits, isJavaScriptModuleUnit, parseOwnedJavaScriptApplicationAnalysisSteps } from "./javascriptModuleUnits-YkbK0IJF.js";
import { z } from "zod";

//#region dist/domain/analysisView/nativeGraphView.js
var canonicalDepth, compareGraphLevels, referenceCoverage, projectNativeGraphRows;
function init_nativeGraphView() {
	return (init_nativeGraphView = __esmMin((() => {
		init_unicodeCodePointOrder();
		init_nativeObservationSchemas();
		canonicalDepth = /^(?:0|[1-9][0-9]*)$/;
		compareGraphLevels = (left, right) => {
			const leftNumeric = canonicalDepth.test(left);
			const rightNumeric = canonicalDepth.test(right);
			if (leftNumeric && rightNumeric) {
				if (left.length !== right.length) return left.length - right.length;
				return compareUnicodeCodePoints(left, right);
			}
			if (leftNumeric !== rightNumeric) return leftNumeric ? -1 : 1;
			return compareUnicodeCodePoints(left, right);
		};
		referenceCoverage = (source, intern) => {
			const diagnostic = source.diagnostics === undefined ? {} : { diagnostic_ids: source.diagnostics.map(intern) };
			const discovery = source.discovery === undefined ? {} : { discovery: source.discovery };
			if (source.status === "complete") return {
				status: "complete",
				...diagnostic,
				...discovery
			};
			const directions = source.limited_directions === undefined ? {} : { limited_directions: source.limited_directions };
			return source.status === "partial" ? {
				status: "partial",
				limitation_ids: source.limitations.map(intern),
				...directions,
				...diagnostic,
				...discovery
			} : {
				status: "unknown",
				reason_id: intern(source.reason),
				...directions,
				...diagnostic,
				...discovery
			};
		};
		projectNativeGraphRows = (source, view) => {
			const messages = [];
			const known = new Map();
			const intern = (message) => {
				const prior = known.get(message);
				if (prior !== undefined) return prior;
				const id = messages.length;
				messages.push(message);
				known.set(message, id);
				return id;
			};
			const rows = [];
			let total = 0;
			for (const level of Object.keys(source.graph).sort(compareGraphLevels)) {
				const nodes = source.graph[level];
				if (nodes.length === 0) {
					if (total >= view.offset && rows.length < view.limit) rows.push({
						level,
						source_index: null,
						status: "empty-level"
					});
					total++;
					continue;
				}
				const begin = Math.max(0, view.offset - total);
				const end = Math.min(nodes.length, begin + Math.max(0, view.limit - rows.length));
				for (let index = begin; index < end; index++) {
					const node = nodes[index];
					rows.push(node.status === "error" ? {
						level,
						source_index: index,
						...node
					} : {
						level,
						source_index: index,
						address: node.address,
						status: node.status,
						calls: node.calls,
						relationship_coverage: referenceCoverage(node.relationship_coverage, intern),
						...node.limitations === undefined ? {} : { limitation_ids: node.limitations.map(intern) }
					});
				}
				total += nodes.length;
			}
			return {
				items: {
					type: "graph-nodes",
					messages,
					rows
				},
				total
			};
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/nativeObservationView.js
var XREFS_ADDRESS_PAGE_LIMITATION, readAddresses, readAddress, readResolution, readGraph, readSource, readContext, selectedRows, observationRows, contextRows, projectNativeObservationView;
function init_nativeObservationView() {
	return (init_nativeObservationView = __esmMin((() => {
		init_evidence();
		init_canonicalDigest();
		init_jsonValue();
		init_inputIssueProjection();
		init_result();
		init_nativeObservation();
		init_analysisViewShape();
		init_analysisViewParent();
		init_analysisViewErrors();
		init_analysisViewCoverage();
		init_nativeObservationSchemas();
		init_nativeGraphView();
		XREFS_ADDRESS_PAGE_LIMITATION = "This page contains source addresses only, not reference kinds or provenance. Retrieve or export the complete parent Evidence for any additional provider details it recorded.";
		readAddresses = createAnalysisViewResultReader(nativeAddressListSchema);
		readAddress = createAnalysisViewResultReader(nativeObservationSourceSchemas.procedure_address);
		readResolution = createAnalysisViewResultReader(nativeObservationSourceSchemas.resolve_containing_procedure);
		readGraph = createAnalysisViewResultReader(nativeObservationSourceSchemas.get_call_graph);
		readSource = (parent) => {
			switch (parent.operation) {
				case "procedure_callees":
				case "procedure_callers":
				case "xrefs": {
					const read = readAddresses(parent);
					return read.ok ? ok({
						operation: parent.operation,
						result: read.value
					}) : read;
				}
				case "procedure_address": {
					const read = readAddress(parent);
					return read.ok ? ok({
						operation: parent.operation,
						result: read.value
					}) : read;
				}
				case "resolve_containing_procedure": {
					const read = readResolution(parent);
					return read.ok ? ok({
						operation: parent.operation,
						result: read.value
					}) : read;
				}
				case "get_call_graph": {
					const read = readGraph(parent);
					return read.ok ? ok({
						operation: parent.operation,
						result: read.value
					}) : read;
				}
				default: return err(analysisViewInputError([{
					path: ["source"],
					reason: "invalid_value",
					message: "This parent does not record a supported native observation."
				}]));
			}
		};
		readContext = (parent, source) => {
			const values = {
				subject: parent.subject,
				provider: parent.provider,
				analysis_profile: parent.analysisProfile,
				authority: parent.authority,
				environment: parent.environment,
				limitations: parent.limitations,
				result_limitations: source.operation === "get_call_graph" ? source.result.limitations : null
			};
			const parsed = nativeSourceContextSchema.safeParse(values);
			return parsed.success ? ok(parsed.data) : err(analysisInputErrorFromIssues("inspect_analysis_view", parsed.error.issues.map((issue) => ({
				...issue,
				path: ["source", ...issue.path]
			})), { source: values }, { cause: parsed.error }));
		};
		selectedRows = (values, selection) => values.slice(selection.offset, selection.offset + selection.limit).map((value, index) => ({
			source_index: selection.offset + index,
			value
		}));
		observationRows = (source, view) => {
			switch (source.operation) {
				case "procedure_address": return {
					parent_operation: source.operation,
					total: 1,
					items: {
						type: "addresses",
						rows: selectedRows([source.result], view).map((row) => ({
							source_index: row.source_index,
							address: row.value
						}))
					}
				};
				case "procedure_callees":
				case "procedure_callers":
				case "xrefs": return {
					parent_operation: source.operation,
					total: source.result.length,
					items: {
						type: "addresses",
						rows: selectedRows(source.result, view).map((row) => ({
							source_index: row.source_index,
							address: row.value
						}))
					}
				};
				case "resolve_containing_procedure": return {
					parent_operation: source.operation,
					total: 1,
					items: {
						type: "resolutions",
						rows: selectedRows([source.result], view).map((row) => ({
							source_index: row.source_index,
							record: row.value
						}))
					}
				};
				case "get_call_graph": return {
					parent_operation: source.operation,
					...projectNativeGraphRows(source.result, view)
				};
			}
		};
		contextRows = (source, view) => {
			switch (view.facet) {
				case "overview": {
					const { analysis_profile, limitations: _limitations, result_limitations: _result, ...overview } = source;
					return {
						facet: view.facet,
						view: {
							...view,
							facet: view.facet
						},
						total: 1,
						items: {
							type: "overview",
							rows: selectedRows([{
								...overview,
								analysis_profile_digest: analysis_profile?.digest ?? null
							}], view).map((row) => ({
								source_index: row.source_index,
								record: row.value
							}))
						}
					};
				}
				case "analysis-profile": return {
					facet: view.facet,
					view: {
						...view,
						facet: view.facet
					},
					total: 1,
					items: {
						type: "analysis-profile",
						rows: selectedRows([source.analysis_profile], view).map((row) => ({
							source_index: row.source_index,
							record: row.value
						}))
					}
				};
				case "limitations": return {
					facet: view.facet,
					view: {
						...view,
						facet: view.facet
					},
					total: source.limitations.length,
					items: {
						type: "limitations",
						rows: selectedRows(source.limitations, view).map((row) => ({
							source_index: row.source_index,
							text: row.value
						}))
					}
				};
				case "result-limitations": return {
					facet: view.facet,
					view: {
						...view,
						facet: view.facet
					},
					total: source.result_limitations?.length ?? null,
					items: {
						type: "result-limitations",
						rows: source.result_limitations === null ? null : selectedRows(source.result_limitations, view).map((row) => ({
							source_index: row.source_index,
							text: row.value
						}))
					}
				};
			}
		};
		projectNativeObservationView = (parent, view) => {
			if (view.kind !== "summary" && view.kind !== "native-observation" && view.kind !== "native-context") return err(analysisViewInputError([{
				path: ["view"],
				reason: "invalid_value",
				message: "Use summary, native-observation or native-context with this source."
			}]));
			assertOwnedView(view, "summary", "native-observation", "native-context");
			const source = readSource(parent);
			if (!source.ok) return source;
			const context = readContext(parent, source.value);
			if (!context.ok) return context;
			const sourceContext = {
				materialization: "reference",
				digest: digestCanonicalValue({
					...context.value,
					subject: evidenceTargetIdentity(context.value)
				}, "Native source context"),
				evidence_limitation_count: context.value.limitations.length,
				result_limitation_count: context.value.result_limitations?.length ?? null
			};
			const common = {
				parent_evidence_id: parent.evidenceId,
				parent_digest: parent.evidenceId.slice(3),
				artifact: parent.artifact ?? null,
				source_provider: context.value.provider,
				source_analysis_profile_digest: context.value.analysis_profile?.digest ?? null,
				source_parameters: jsonValueSchema.parse(parent.parameters ?? {}),
				source_context: sourceContext,
				limitations: ["Source caveats require native-context."],
				unknowns: ["Interpretation beyond recorded rows is unknown until source caveats are read."]
			};
			if (view.kind === "native-context") {
				const selected = contextRows(context.value, view);
				const shared = {
					...common,
					kind: "native-context",
					parent_operation: source.value.operation
				};
				if (selected.facet === "result-limitations") {
					const { total, ...page } = selected;
					return ok({
						...shared,
						...page,
						coverage: total === null ? unavailableViewCoverage() : pageViewCoverage(view.offset, page.items.rows?.length ?? 0, total),
						unknowns: total === null ? ["Result limitations are not applicable to this primitive observation; null does not report an examined empty list."] : common.unknowns
					});
				}
				const { total, ...page } = selected;
				return ok({
					...shared,
					...page,
					coverage: pageViewCoverage(view.offset, page.items.rows?.length ?? 0, total)
				});
			}
			const selection = view.kind === "summary" ? {
				offset: 0,
				limit: 64
			} : view;
			const page = observationRows(source.value, selection);
			const { total, ...payload } = page;
			const observation = {
				...common,
				...source.value.operation === "xrefs" ? { unknowns: [...common.unknowns, XREFS_ADDRESS_PAGE_LIMITATION] } : {},
				...payload,
				summary: { observations: total },
				coverage: pageViewCoverage(selection.offset, page.items.rows.length, total)
			};
			return view.kind === "summary" ? ok({
				...observation,
				kind: "summary",
				view
			}) : ok({
				...observation,
				kind: "native-observation",
				view
			});
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/recordedArrayView.js
var PAGE_BYTES, exceedsEvidenceResultDepth, exceedsRecordedRowDepth, recordedArrayDepthRefusal, projectRecordedArrayView;
function init_recordedArrayView() {
	return (init_recordedArrayView = __esmMin((() => {
		init_jsonValue();
		init_jsonValueByteLength();
		init_analysisErrorCore();
		init_result();
		init_analysisViewCoverage();
		init_analysisViewErrors();
		PAGE_BYTES = 1024 * 1024;
		exceedsEvidenceResultDepth = (result) => jsonValueValidationIssue({ normalized_result: result }) !== undefined;
		exceedsRecordedRowDepth = (row) => jsonValueValidationIssue({ normalized_result: { rows: [row] } }) !== undefined;
		recordedArrayDepthRefusal = () => err(new AnalysisResourceConstraintError("inspect_analysis_view", "memory", `Recorded array view exceeds the maximum JSON nesting depth of ${MAX_JSON_DEPTH}.`, { maximum_json_depth: MAX_JSON_DEPTH }, {
			retryable: false,
			remediationAction: "A recorded value cannot be nested inside an Evidence page without exceeding the JSON depth limit. Retrieve or export the complete parent Evidence, or read it from the caller-supplied Evidence file or bundle."
		}));
		projectRecordedArrayView = (parent, view) => {
			let value = parent.rawResult;
			for (const key of view.path) {
				if (typeof value !== "object" || value === null || Array.isArray(value) || !Object.hasOwn(value, key)) return err(analysisViewInputError([{
					path: ["view", "path"],
					reason: "invalid_value",
					message: "The selected path does not identify an object member in recorded raw data."
				}]));
				value = value[key];
			}
			if (!Array.isArray(value)) return err(analysisViewInputError([{
				path: ["view", "path"],
				reason: "invalid_value",
				message: "The selected recorded raw value is not an array."
			}]));
			const rows = [];
			let result = {
				parent_evidence_id: parent.evidenceId,
				parent_operation: parent.operation,
				parent_digest: parent.evidenceId.slice(3),
				source_provider: parent.provider ?? null,
				source_analysis_profile_digest: parent.analysisProfile?.digest ?? null,
				source_parameters: parent.parameters ?? {},
				artifact: parent.artifact ?? null,
				kind: "recorded-array",
				view,
				rows,
				coverage: pageViewCoverage(view.offset, 0, value.length),
				limitations: ["These are raw provider-recorded values; interpretation and provider coverage require the parent Evidence.", "Raw rows may include values excluded from the parent operation's normalized result; use source parameters and parent caveats to interpret their scope."],
				unknowns: []
			};
			const estimateBase = () => jsonValueByteLength({
				...result,
				view_digest: "0".repeat(64),
				coverage: {
					status: "complete-within-view",
					examined: Number.MAX_SAFE_INTEGER,
					total: Number.MAX_SAFE_INTEGER,
					next_offset: Number.MAX_SAFE_INTEGER,
					exhausted: false
				}
			}, PAGE_BYTES);
			const omitParameters = (reason) => {
				result = {
					...result,
					source_parameters: null,
					limitations: [...result.limitations, reason === "depth" ? "Source parameters were omitted because nesting them under this Evidence page exceeds the maximum JSON depth; retrieve the parent Evidence for their complete values." : "Source parameters were omitted to fit the page allowance; retrieve the parent Evidence for their complete values."]
				};
			};
			if (result.source_parameters !== null && exceedsEvidenceResultDepth(result)) omitParameters("depth");
			let bytes = estimateBase();
			if (bytes > PAGE_BYTES) {
				omitParameters("bytes");
				bytes = estimateBase();
			}
			const tooLarge = () => err(new AnalysisResourceConstraintError("inspect_analysis_view", "memory", "Recorded array view exceeds the 1 MiB page allowance.", { maximum_page_bytes: PAGE_BYTES }, {
				retryable: false,
				remediationAction: "The selected path or one recorded value exceeds the 1,048,576-byte analysis-view page allowance. Retrieve or export the complete parent Evidence, or read it from the caller-supplied Evidence file or bundle."
			}));
			if (bytes > PAGE_BYTES) return tooLarge();
			const end = Math.min(value.length, view.offset + view.limit);
			for (let i = view.offset; i < end; i++) {
				const row = value[i];
				const comma = rows.length === 0 ? 0 : 1;
				let size = jsonValueByteLength(row, PAGE_BYTES - bytes - comma);
				if (bytes + comma + size > PAGE_BYTES && rows.length === 0 && result.source_parameters !== null) {
					omitParameters("bytes");
					bytes = estimateBase();
					if (bytes > PAGE_BYTES) return tooLarge();
					size = jsonValueByteLength(row, PAGE_BYTES - bytes);
				}
				if (bytes + comma + size > PAGE_BYTES) {
					if (rows.length === 0) return tooLarge();
					break;
				}
				if (exceedsRecordedRowDepth(row)) {
					if (rows.length === 0) return recordedArrayDepthRefusal();
					break;
				}
				bytes += comma + size;
				rows.push(row);
			}
			if (exceedsEvidenceResultDepth(result)) return recordedArrayDepthRefusal();
			return ok({
				...result,
				coverage: pageViewCoverage(view.offset, rows.length, value.length)
			});
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/browserScenarioView.js
var OPERATION$2, readCapture, unsupportedView, sameUrl, stepSections, summaryStep, focusAccessibility, sortedCounts, increment, eventCounts, selected, stepRow, selectedPage, textPage, pageRecords, projectBrowserScenarioView;
function init_browserScenarioView() {
	return (init_browserScenarioView = __esmMin((() => {
		init_browserScenarioCapture();
		init_canonicalOrdering();
		init_result();
		init_analysisViewErrors();
		init_analysisViewCoverage();
		init_analysisViewParent();
		init_analysisViewText();
		init_analysisViewShape();
		init_browserScenarioViewSchemas();
		init_browserScenarioNetworkView();
		OPERATION$2 = "capture_browser_scenario";
		readCapture = createAnalysisViewResultReader(retainedBrowserScenarioCaptureSchema);
		unsupportedView = () => analysisViewInputError([{
			path: ["view"],
			reason: "invalid_value",
			message: "Parent Evidence operation \"capture_browser_scenario\" supports summary and browser-scenario views, plus compatible environment views."
		}]);
		sameUrl = (left, right) => left !== undefined && left.url === right.url && left.redacted === right.redacted;
		stepSections = (step) => {
			const sections = {
				captured: [],
				missing: [],
				truncated: []
			};
			for (const section of ARTIFACT_SECTIONS) {
				const { state } = step.artifacts[section];
				if (state !== "not_requested") sections[state].push(section);
			}
			return sections;
		};
		summaryStep = (step, previous) => ({
			step_index: step.step_index,
			step_id: step.step_id,
			action: step.action,
			status: step.status,
			error: step.error,
			elapsed_ms: step.elapsed_ms,
			...sameUrl(previous?.after_url, step.before_url) ? {} : { before_url: step.before_url },
			after_url: step.after_url,
			events: {
				sequence_start: step.event_sequence_start,
				sequence_end: step.event_sequence_end
			},
			sections: stepSections(step),
			completeness: step.completeness.status
		});
		focusAccessibility = (steps) => {
			const unsuccessful = steps.findIndex(({ status }) => status !== "completed");
			const focusIndex = unsuccessful === -1 ? steps.length - 1 : unsuccessful;
			const focus = steps[focusIndex];
			if (focus === undefined) throw new Error("Capture has no steps");
			const kind = unsuccessful === -1 ? "last-step" : "first-unsuccessful-step";
			for (let index = focusIndex; index >= 0; index -= 1) {
				const accessibility = steps[index]?.artifacts.accessibility;
				if (accessibility?.state === "captured") return {
					focus_step_index: focusIndex,
					focus: kind,
					step_index: index,
					accessibility
				};
			}
			return {
				focus_step_index: focusIndex,
				focus: kind,
				step_index: null,
				accessibility: focus.artifacts.accessibility
			};
		};
		sortedCounts = (counts) => [...counts].sort(([left], [right]) => left === right ? 0 : left === null ? -1 : right === null ? 1 : compareAsciiStrings(left, right));
		increment = (counts, key) => {
			counts.set(key, (counts.get(key) ?? 0) + 1);
		};
		eventCounts = (capture) => {
			const kinds = new Map();
			for (const event of capture.events.items) increment(kinds, event.kind);
			const { omissions } = capture.events;
			return {
				retained: capture.events.retained,
				dropped: capture.events.dropped,
				by_kind: sortedCounts(kinds).map(([kind, count]) => ({
					kind,
					count
				})),
				omissions: {
					by_kind: omissions.by_kind,
					network_transactions: omissions.network_transactions.length,
					network_transaction_range: omissions.network_transaction_range
				}
			};
		};
		selected = (filter) => {
			if (filter === undefined) return () => true;
			const values = new Set(filter);
			return (value) => values.has(value);
		};
		stepRow = ({ artifacts: recorded, ...step }, selection) => {
			const artifacts = {};
			const omitted = [];
			for (const section of ARTIFACT_SECTIONS) {
				const artifact = recorded[section];
				if (selection.has(section)) Object.assign(artifacts, { [section]: artifact });
				else if (artifact.state !== "not_requested") omitted.push({
					section,
					state: artifact.state
				});
			}
			return {
				...step,
				artifacts,
				omitted_artifacts: omitted
			};
		};
		selectedPage = (source, view, matches, project) => {
			const rows = [];
			let total = 0;
			for (const [index, item] of source.entries()) {
				if (!matches(item, index)) continue;
				if (total >= view.offset && rows.length < view.limit) rows.push(project(item, index));
				total += 1;
			}
			return {
				rows,
				coverage: pageViewCoverage(view.offset, rows.length, total)
			};
		};
		textPage = (capture, view) => {
			const artifact = capture.steps[view.step_index].artifacts[view.artifact];
			const value = artifact.state === "captured" ? artifact.value : null;
			const page = value === null ? ok({
				item: { text: null },
				coverage: unavailableViewCoverage()
			}) : analysisTextPage(value.text, view.offset, view.limit, "Scenario artifact text");
			if (!page.ok) return page;
			return ok({
				items: {
					collection: "text",
					step_index: view.step_index,
					artifact: view.artifact,
					state: artifact.state,
					reason: "reason" in artifact ? artifact.reason : null,
					sha256: value?.sha256 ?? null,
					bytes: value?.bytes ?? null,
					observed: artifact.state === "truncated" ? artifact.observed : null,
					retained: artifact.state === "truncated" ? artifact.retained : null,
					text: page.value.item.text
				},
				coverage: page.value.coverage
			});
		};
		pageRecords = (capture, view) => {
			const stepSelected = selected(view.step_indices);
			if (view.collection === "steps") {
				const artifacts = new Set(view.artifacts);
				const page = selectedPage(capture.steps, view, ({ step_index }) => stepSelected(step_index), (step) => stepRow(step, artifacts));
				return {
					items: {
						collection: "steps",
						rows: page.rows
					},
					coverage: page.coverage
				};
			}
			const kindSelected = selected(view.event_kinds);
			const transactionSelected = selected(view.transaction_ids);
			if (view.collection === "transactions") {
				const page = selectedPage(browserScenarioTransactionGroups(capture), view, (group) => transactionSelected(group.transaction_id) && (view.step_indices === undefined || group.source_item_indices.some((index) => stepSelected(capture.events.items[index].step_index))), (group) => {
					const events = [];
					const omitted = [];
					for (const item_index of group.source_item_indices) {
						const event = capture.events.items[item_index];
						if (kindSelected(event.kind)) events.push({
							item_index,
							event
						});
						else omitted.push({
							item_index,
							kind: event.kind
						});
					}
					return {
						transaction_id: group.transaction_id,
						source_item_indices: [...group.source_item_indices],
						events,
						omitted_events: omitted
					};
				});
				return {
					items: {
						collection: "transactions",
						rows: page.rows
					},
					coverage: page.coverage
				};
			}
			const page = selectedPage(capture.events.items, view, (event) => stepSelected(event.step_index) && kindSelected(event.kind) && (view.transaction_ids === undefined || "transaction_id" in event && transactionSelected(event.transaction_id)), (event, item_index) => ({
				item_index,
				event
			}));
			return {
				items: {
					collection: "events",
					rows: page.rows
				},
				coverage: page.coverage
			};
		};
		projectBrowserScenarioView = (parent, view) => {
			if (view.kind !== "summary" && view.kind !== "browser-scenario") return err(unsupportedView());
			assertOwnedView(view, "summary", "browser-scenario");
			const parsed = readCapture(parent);
			if (!parsed.ok) return parsed;
			const capture = parsed.value;
			const shared = {
				parent_evidence_id: parent.evidenceId,
				parent_operation: OPERATION$2,
				parent_digest: parent.evidenceId.slice(3),
				artifact: null,
				limitations: [...parent.limitations],
				unknowns: [
					"Step states record one controlled replay; they do not establish the application's current state.",
					"Event step references record receipt attribution; they do not prove an action caused a transaction.",
					...capture.events.dropped > 0 ? [`${String(capture.events.dropped)} events were dropped by capture budgets; counts and pages cover retained events only.`] : []
				]
			};
			if (view.kind === "summary") return ok({
				kind: "summary",
				view,
				...shared,
				summary: {
					browser: capture.browser,
					scenario: capture.scenario,
					duration_ms: capture.duration_ms,
					completeness: capture.completeness,
					steps: capture.steps.map((step, index) => summaryStep(step, capture.steps[index - 1])),
					final_accessibility: focusAccessibility(capture.steps),
					events: eventCounts(capture),
					network: summarizeBrowserScenarioNetwork(capture),
					limitation_count: shared.limitations.length
				},
				coverage: completeWithinViewCoverage(1)
			});
			if (view.collection === "text" && capture.steps[view.step_index] === undefined) return err(analysisViewInputError([{
				path: ["view", "step_index"],
				reason: "invalid_value",
				message: "The selected step is not present in the retained capture."
			}]));
			const page = view.collection === "text" ? textPage(capture, view) : ok(pageRecords(capture, view));
			if (!page.ok) return page;
			return ok({
				kind: "browser-scenario",
				view,
				...shared,
				source_completeness: capture.completeness,
				source_events: {
					retained: capture.events.retained,
					dropped: capture.events.dropped
				},
				source_network_omissions: {
					transactions: capture.events.omissions.network_transactions.length,
					transaction_range: capture.events.omissions.network_transaction_range
				},
				...page.value
			});
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/binaryLayoutView.js
var OPERATION$1, inputError$1, layoutUnknowns, namedMatches, selectNamed, selectIndexed, pageRows, layoutIncompatible, parentFields$2, layoutSummary, projectBinaryLayoutView, selectLayoutItem;
function init_binaryLayoutView() {
	return (init_binaryLayoutView = __esmMin((() => {
		init_analysisErrorCore();
		init_result();
		init_analysisViewShape();
		init_analysisViewCoverage();
		OPERATION$1 = "inspect_analysis_view";
		inputError$1 = (issues) => new AnalysisInputError(OPERATION$1, undefined, issues);
		layoutUnknowns = (layout) => {
			const unknowns = [
				"runtime_load_base is unknown",
				"entry_point.execution_status is unknown",
				"relocation_inventory_completeness is unknown",
				"linkage.convenience_maps_completeness is unknown",
				"linkage.runtime_library_paths are unknown"
			];
			if (layout.mitigations.nx_indicator === null) unknowns.push("mitigations.nx_indicator is unknown");
			if (layout.mitigations.relro === null) unknowns.push("mitigations.relro is unknown");
			return unknowns;
		};
		namedMatches = (rows, name) => {
			const bytes = Buffer.from(name, "utf8");
			if (bytes.toString("utf8") !== name) return [];
			const encoded = bytes.toString("base64");
			return rows.flatMap((row, index) => row.name.unknown_reason === null && row.name.bytes_base64 === encoded ? [{
				index,
				row
			}] : []);
		};
		selectNamed = (collection, rows, name) => {
			const matches = namedMatches(rows, name);
			if (matches.length === 1) {
				const selected = matches[0];
				if (selected !== undefined) return ok(selected.row);
			}
			if (matches.length === 0) return err(inputError$1([{
				path: [
					"view",
					"selector",
					"name"
				],
				reason: "invalid_value",
				message: `No ${collection} named ${JSON.stringify(name)}. Collection has ${String(rows.length)} entries; page it to inspect exact indexes and names.`
			}]));
			return err(inputError$1([{
				path: [
					"view",
					"selector",
					"name"
				],
				reason: "invalid_value",
				message: `Multiple ${collection} named ${JSON.stringify(name)}; select one by index.`,
				expected: matches.map(({ index }) => ({ index }))
			}]));
		};
		selectIndexed = (collection, rows, index) => {
			const row = rows[index];
			if (row !== undefined) return ok(row);
			if (rows.length === 0) return err(inputError$1([{
				path: [
					"view",
					"selector",
					"index"
				],
				reason: "invalid_value",
				message: `No retained ${collection} entries can be selected by index.`
			}]));
			return err(inputError$1([{
				path: [
					"view",
					"selector",
					"index"
				],
				reason: "out_of_range",
				message: `${collection} index ${String(index)} is outside 0..${String(rows.length - 1)} (${String(rows.length)} entries).`,
				minimum: 0,
				maximum: rows.length - 1
			}]));
		};
		pageRows = (rows, offset, limit) => rows.slice(offset, offset + limit);
		layoutIncompatible = (detail) => inputError$1([{
			path: ["view"],
			reason: "invalid_value",
			message: detail
		}]);
		parentFields$2 = (parent, layout) => ({
			parent_evidence_id: parent.evidenceId,
			parent_operation: "inspect_binary_layout",
			parent_digest: parent.evidenceId.slice(3),
			artifact: {
				path: layout.artifact.path,
				sha256: layout.artifact.sha256
			},
			limitations: boundedViewMessages([...parent.limitations, ...layout.limitations], parent.evidenceId, "limitations"),
			unknowns: boundedViewMessages(layoutUnknowns(layout), parent.evidenceId, "unknowns")
		});
		layoutSummary = (layout) => ({
			bytes: layout.artifact.bytes,
			format: layout.format,
			architecture: layout.architecture,
			image_type: layout.image_type,
			entry: layout.entry_point,
			counts: {
				sections: layout.sections.length,
				segments: layout.segments.length,
				symbols: layout.symbols.length,
				relocations: layout.relocations.length
			},
			limitation_count: layout.limitations.length
		});
		projectBinaryLayoutView = (parent, layout, view) => {
			const shared = parentFields$2(parent, layout);
			if (view.kind === "native") return err(layoutIncompatible("Native views require analyze_function Evidence."));
			if (view.kind === "inventory") return err(layoutIncompatible("Inventory views require artifact Evidence."));
			if (view.kind === "wasm") return err(layoutIncompatible("WASM views require inspect_wasm_artifact Evidence."));
			if (view.kind === "evm") return err(layoutIncompatible("EVM views require inspect_evm_interface Evidence."));
			if (view.kind === "summary") {
				assertOwnedView(view, "summary");
				return ok({
					kind: "summary",
					view,
					summary: layoutSummary(layout),
					coverage: completeWithinViewCoverage(layout.sections.length + layout.segments.length + layout.symbols.length + layout.relocations.length),
					...shared
				});
			}
			if (view.kind === "facet") {
				assertOwnedView(view, "facet");
				return ok({
					kind: "facet",
					view,
					facet: view.facet === "mitigations" ? layout.mitigations : layout.linkage,
					coverage: completeWithinViewCoverage(1),
					...shared
				});
			}
			if (view.kind === "item") {
				assertOwnedView(view, "item");
				if (view.collection === "modules") return err(layoutIncompatible("modules collection applies to analyze_javascript_application Evidence."));
				const selected = view.collection === "sections" ? selectLayoutItem(view.collection, layout.sections, view.selector) : selectLayoutItem(view.collection, layout.symbols, view.selector);
				if (!selected.ok) return selected;
				return ok({
					kind: "item",
					view,
					item: selected.value,
					coverage: completeWithinViewCoverage(1),
					...shared
				});
			}
			if (view.kind !== "page") return err(layoutIncompatible("Layout views require summary, facet, item or page selections."));
			assertOwnedView(view, "page");
			if (view.collection === "modules") return err(layoutIncompatible("modules collection applies to analyze_javascript_application Evidence."));
			const rows = view.collection === "sections" ? layout.sections : layout.symbols;
			const items = view.collection === "sections" ? pageRows(layout.sections, view.offset, view.limit) : pageRows(layout.symbols, view.offset, view.limit);
			return ok({
				kind: "page",
				view,
				items: [...items],
				coverage: pageViewCoverage(view.offset, items.length, rows.length),
				...shared
			});
		};
		selectLayoutItem = (collection, rows, selector) => {
			if ("index" in selector) return selectIndexed(collection, rows, selector.index);
			if ("name" in selector) return selectNamed(collection, rows, selector.name);
			return err(layoutIncompatible("Section and symbol items are selected by index or exact name."));
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/javascriptApplicationView.js
/** One owner for the module kinds and path semantics of every module view. */
function* moduleEntries(nodes) {
	for (const node of nodes) {
		if (isJavaScriptModuleUnit(node)) {
			const paths = javascriptModulePaths(node);
			yield {
				node,
				path: paths[0] ?? null,
				paths
			};
		}
	}
}
var OPERATION, inputError, jsIncompatible, javascriptModulePaths, modulePage, exportNames, nodeHashes, sourceRanges, moduleItem, moduleReference, javascriptCoverageUnknowns, parentFields$1, selectModule, projectJavaScriptApplicationView;
function init_javascriptApplicationView() {
	return (init_javascriptApplicationView = __esmMin((() => {
		init_javascriptModuleUnits();
		init_analysisErrorCore();
		init_canonicalOrdering();
		init_jsonValue();
		init_result();
		init_javascriptModuleReferences();
		init_javascriptApplicationCoverage();
		init_javascriptFactsView();
		init_analysisViewCoverage();
		init_analysisViewShape();
		OPERATION = "inspect_analysis_view";
		inputError = (issues) => new AnalysisInputError(OPERATION, undefined, issues);
		jsIncompatible = (detail) => inputError([{
			path: ["view"],
			reason: "invalid_value",
			message: detail
		}]);
		javascriptModulePaths = (node) => {
			if (node.identity.strategy === "canonical-path") return [node.identity.path];
			if (node.identity.strategy === "source-map-original") return [node.identity.original_source];
			const paths = new Set();
			for (const observation of node.observations) {
				const path = observation.properties.path;
				if (typeof path === "string") {
					paths.add(path);
					continue;
				}
				const location = observation.evidence.location;
				if (location.available && location.value.kind === "artifact-path") paths.add(location.value.path);
				if (location.available && location.value.kind === "source-range") paths.add(location.value.source);
			}
			return [...paths];
		};
		modulePage = (nodes, view) => {
			const entries = [];
			let total = 0;
			for (const entry of moduleEntries(nodes)) {
				if (view.where?.kind !== undefined && entry.node.kind !== view.where.kind) continue;
				const selectedPath = view.where?.path;
				if (selectedPath !== undefined && (selectedPath === null ? entry.path !== null : !entry.paths.includes(selectedPath))) continue;
				const selectedEntry = selectedPath !== undefined && selectedPath !== null ? {
					...entry,
					path: selectedPath
				} : entry;
				if (total >= view.offset && entries.length < view.limit) entries.push(selectedEntry);
				total += 1;
			}
			return {
				entries,
				total
			};
		};
		exportNames = (node) => {
			const names = new Set();
			for (const observation of node.observations) {
				const value = observation.properties.export_names ?? observation.properties.exports;
				if (!Array.isArray(value)) continue;
				for (const entry of value) if (typeof entry === "string") names.add(entry);
			}
			return [...names];
		};
		nodeHashes = (node) => {
			const hashes = new Set();
			const { identity } = node;
			if (identity.strategy === "content-digest") hashes.add(identity.sha256);
			if (identity.strategy === "canonical-path") hashes.add(identity.artifact_sha256);
			if (identity.strategy === "source-map-original") {
				hashes.add(identity.source_map_sha256);
				if (identity.source_sha256 !== null) hashes.add(identity.source_sha256);
			}
			for (const observation of node.observations) {
				for (const key of [
					"sha256",
					"container_sha256",
					"entry_sha256",
					"source_sha256"
				]) {
					const value = observation.properties[key];
					if (typeof value === "string" && /^[a-f0-9]{64}$/u.test(value)) hashes.add(value);
				}
			}
			return [...hashes];
		};
		sourceRanges = (node) => node.observations.flatMap((observation) => {
			const location = observation.evidence.location;
			return location.available && location.value.kind === "source-range" ? [location.value] : [];
		});
		moduleItem = (node, path) => ({
			node_id: node.node_id,
			kind: node.kind,
			path,
			identity: node.identity,
			hashes: [...nodeHashes(node)],
			exports: [...exportNames(node)],
			source_ranges: [...sourceRanges(node)],
			observations: node.observations
		});
		moduleReference = ({ node, path }) => {
			let ranges = 0;
			for (const { evidence } of node.observations) if (evidence.location.available && evidence.location.value.kind === "source-range") ranges += 1;
			return {
				node_id: node.node_id,
				kind: node.kind,
				path,
				identity: node.identity,
				retained_source_range_count: ranges,
				basis: javascriptFactBasis(node.observations.map(({ evidence }) => evidence))
			};
		};
		javascriptCoverageUnknowns = (coverage) => {
			const unknowns = [];
			if (coverage.application.status !== "complete") unknowns.push(`graph.coverage.status is ${coverage.application.status}`);
			if (coverage.semantic.status !== "complete") unknowns.push(`semantic_graph.coverage.status is ${coverage.semantic.status}`);
			const applicationUnknowns = coverage.application_unknown_count;
			if (applicationUnknowns > 0) unknowns.push(`${String(applicationUnknowns)} application graph unknowns remain in the parent Evidence.`);
			if (coverage.semantic_unknown_count > 0) unknowns.push(`${String(coverage.semantic_unknown_count)} semantic graph unknowns remain in the parent Evidence.`);
			return unknowns;
		};
		parentFields$1 = (parent, analysis, sourceCoverage) => {
			const limitations = [
				...analysis.limitations,
				...analysis.graph.limitations,
				...analysis.semantic_graph.limitations
			];
			const mergedLimitations = uniqueSorted([...parent.limitations, ...limitations]);
			return {
				limitationCount: mergedLimitations.length,
				fields: {
					parent_evidence_id: parent.evidenceId,
					parent_operation: "analyze_javascript_application",
					parent_digest: parent.evidenceId.slice(3),
					artifact: {
						path: analysis.input_path,
						sha256: analysis.root_artifact_sha256
					},
					limitations: boundedViewMessages(mergedLimitations, parent.evidenceId, "limitations"),
					unknowns: boundedViewMessages(limitations, parent.evidenceId, "unknowns", javascriptCoverageUnknowns(sourceCoverage))
				}
			};
		};
		selectModule = (modules, selector) => {
			if ("node_id" in selector) {
				const matches = modules.filter(({ node }) => node.node_id === selector.node_id);
				if (matches.length === 1) {
					const selected = matches[0];
					if (selected !== undefined) return ok(selected);
				}
				return err(inputError([{
					path: [
						"view",
						"selector",
						"node_id"
					],
					reason: "invalid_value",
					message: `No module has node_id ${JSON.stringify(selector.node_id)}. Page the modules collection to inspect available identities.`
				}]));
			}
			if ("path" in selector) {
				const matches = modules.filter((entry) => selector.path === null ? entry.path === null : entry.paths.includes(selector.path));
				if (matches.length === 1) {
					const selected = matches[0];
					if (selected !== undefined) return ok({
						...selected,
						path: selector.path
					});
				}
				if (matches.length === 0) return err(inputError([{
					path: [
						"view",
						"selector",
						"path"
					],
					reason: "invalid_value",
					message: `No module has path ${JSON.stringify(selector.path)}. Page the modules collection to inspect exact paths and node_id values.`
				}]));
				return err(inputError([{
					path: [
						"view",
						"selector",
						"path"
					],
					reason: "invalid_value",
					message: `Multiple modules have path ${JSON.stringify(selector.path)}; select one by node_id.`,
					expected: matches.map((entry) => ({ node_id: entry.node.node_id }))
				}]));
			}
			return err(jsIncompatible("Module items are selected by exact path or node_id."));
		};
		projectJavaScriptApplicationView = (parent, analysis, view) => {
			if (view.kind !== "summary" && view.kind !== "item" && view.kind !== "page" && view.kind !== "javascript" && view.kind !== "javascript-facts") return err(jsIncompatible("JavaScript application Evidence supports summary, module item/page, typed module references or selected JavaScript facts."));
			assertOwnedView(view, "summary", "item", "page", "javascript", "javascript-facts");
			const sourceCoverage = javascriptApplicationSourceCoverage(analysis);
			const { fields: shared, limitationCount } = parentFields$1(parent, analysis, sourceCoverage);
			if (view.kind === "javascript-facts") {
				const { rows, total } = projectJavaScriptFacts(analysis.graph.nodes, view);
				return ok({
					...shared,
					kind: "javascript-facts",
					view,
					rows,
					source_coverage: sourceCoverage,
					coverage: pageViewCoverage(view.offset, rows.length, total)
				});
			}
			if (view.kind === "javascript") {
				const { entries, total } = modulePage(analysis.graph.nodes, view);
				const rows = entries.map(moduleReference);
				return ok({
					...shared,
					kind: "javascript",
					view,
					rows,
					source_coverage: sourceCoverage,
					coverage: pageViewCoverage(view.offset, rows.length, total)
				});
			}
			if (view.kind === "summary") {
				const moduleCount = analysis.graph.nodes.reduce((count, node) => count + Number(isJavaScriptModuleUnit(node)), 0);
				return ok({
					kind: "summary",
					view,
					summary: {
						input_path: analysis.input_path,
						format: analysis.format,
						root_artifact_sha256: analysis.root_artifact_sha256,
						...analysis.source_selection === undefined ? {} : { source_selection: analysis.source_selection },
						statistics: jsonObjectSchema.parse(analysis.statistics),
						electron: jsonObjectSchema.parse(analysis.summary),
						coverage: jsonObjectSchema.parse({
							static_sources: javascriptStaticSourceCoverageSummary(analysis),
							application: analysis.graph.coverage,
							semantic: {
								...analysis.semantic_graph.coverage,
								families: analysis.semantic_graph.coverage.families.map(({ unknown_ids, ...family }) => ({
									...family,
									unknown_count: unknown_ids.length
								}))
							},
							application_unknowns: sourceCoverage.application_unknown_count,
							semantic_unknowns: sourceCoverage.semantic_unknown_count
						}),
						limitation_count: limitationCount
					},
					coverage: completeWithinViewCoverage(moduleCount),
					...shared
				});
			}
			if (view.kind === "item") {
				if (view.collection !== "modules") return err(jsIncompatible("Section and symbol collections apply to inspect_binary_layout Evidence."));
				const modules = [...moduleEntries(analysis.graph.nodes)];
				const selected = selectModule(modules, view.selector);
				if (!selected.ok) return selected;
				return ok({
					kind: "item",
					view,
					item: moduleItem(selected.value.node, selected.value.path),
					coverage: completeWithinViewCoverage(1),
					...shared
				});
			}
			if (view.kind !== "page" || view.collection !== "modules") return err(jsIncompatible("Section and symbol collections apply to inspect_binary_layout Evidence."));
			const { entries, total } = modulePage(analysis.graph.nodes, view);
			const items = entries.map(({ node, path }) => ({
				node_id: node.node_id,
				kind: node.kind,
				path
			}));
			return ok({
				kind: "page",
				view,
				items,
				coverage: pageViewCoverage(view.offset, items.length, total),
				...shared
			});
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/WebNetworkApiSurfaceAccumulator.js
var WebNetworkApiSurfaceAccumulator;
function init_WebNetworkApiSurfaceAccumulator() {
	return (init_WebNetworkApiSurfaceAccumulator = __esmMin((() => {
		init_recordedMediaType();
		init_unicodeCodePointOrder();
		init_result();
		init_webNetworkCapture();
		init_analysisViewCoverage();
		init_apiSurfaceSchema();
		init_WebNetworkProjectionAccumulator();
		init_webNetworkRouteTemplates();
		WebNetworkApiSurfaceAccumulator = class extends WebNetworkProjectionAccumulator {
			includeQueryParameterNames;
			comparison;
			#buckets = new Map();
			#groups = [];
			#excluded = [];
			#unavailableResponse = false;
			constructor(maximumBytes = WEB_NETWORK_CAPTURE_LIMITS.outputBytes, includeQueryParameterNames = false, comparison) {
				super(maximumBytes, "API-surface", comparison?.operation);
				this.includeQueryParameterNames = includeQueryParameterNames;
				this.comparison = comparison;
			}
			#exclude(ordinal, reason) {
				if (!this.retain(128 + 512)) return this.overBudget();
				this.#excluded.push({
					ordinal,
					reason
				});
				return ok(undefined);
			}
			add(record) {
				const rollbackAdmission = this.retainedCheckpoint();
				const limitations = this.prepareLimitations(record.limitations);
				if (!limitations.ok) return limitations;
				let committed = false;
				try {
					const line = readRecordedRequestLine(record.reported, this.includeQueryParameterNames, this.scratch);
					if (line === null) return this.overBudget();
					let appended;
					if (line.kind === "excluded") appended = this.#exclude(record.ordinal, line.reason);
					else {
						const route = scanRouteTemplate(line.path, this.scratch);
						if (route === null) return this.overBudget();
						const queryNames = readQueryParameterNames(line.query, this.scratch);
						if (queryNames === null) return this.overBudget();
						appended = this.#append(record.ordinal, line, route, queryNames);
					}
					if (appended.ok) {
						limitations.value();
						committed = true;
					}
					return appended;
				} finally {
					if (!committed) rollbackAdmission();
					this.releaseTemporary();
				}
			}
			#append(ordinal, line, route, queryNames) {
				const { method, origin, path, status } = line;
				const mime = mediaTypeEssence(line.rawMime);
				let group = this.#buckets.get(method)?.get(origin)?.get(route.template)?.get(route.rules);
				let bytes = 128;
				if (this.comparison !== undefined && !group?.paths?.has(path)) bytes += 128 + textBytes(path.length);
				if (group === undefined) {
					bytes += GROUP_BYTES + textBytes(method.length) + textBytes(origin.length) + textBytes(route.template.length) + textBytes(route.rules.length);
					for (const segment of route.segments) bytes += SEGMENT_BYTES + 128 + textBytes(segment.value.length);
				} else {
					for (const [index, segment] of route.segments.entries()) {
						if (!group.segments[index].values.has(segment.value)) bytes += 128 + textBytes(segment.value.length);
					}
				}
				if (status !== null && !group?.statuses.has(status)) bytes += 128;
				if (mime !== null && !group?.contentTypes.has(mime)) bytes += 128 + textBytes(mime.length);
				if (queryNames !== undefined) {
					if (group === undefined) bytes += 512;
					for (const name of queryNames) {
						bytes += 128;
						if (!group?.queryNames?.has(name)) bytes += 128 + textBytes(name.length);
					}
				}
				if (!this.retain(bytes)) return this.overBudget();
				if (group === undefined) {
					group = {
						method,
						origin,
						path_template: route.template,
						rules: route.rules,
						...this.comparison === undefined ? {} : { paths: new Map() },
						segments: route.segments.map((segment) => ({
							segment_index: segment.segment_index,
							rule: segment.rule,
							values: new Set([segment.value])
						})),
						ordinals: [],
						statuses: new Set(),
						contentTypes: new Set(),
						...queryNames === undefined ? {} : { queryNames: new Map() }
					};
					const byOrigin = this.#buckets.get(method) ?? new Map();
					this.#buckets.set(method, byOrigin);
					const byTemplate = byOrigin.get(origin) ?? new Map();
					byOrigin.set(origin, byTemplate);
					const byRule = byTemplate.get(route.template) ?? new Map();
					byTemplate.set(route.template, byRule);
					byRule.set(route.rules, group);
					this.#groups.push(group);
				} else {
					for (const [index, segment] of route.segments.entries()) group.segments[index].values.add(segment.value);
				}
				group.ordinals.push(ordinal);
				if (group.paths !== undefined && !group.paths.has(path)) group.paths.set(path, ordinal);
				if (status === null || mime === null) this.#unavailableResponse = true;
				if (status !== null) group.statuses.add(status);
				if (mime !== null) group.contentTypes.add(mime);
				if (queryNames !== undefined && group.queryNames !== undefined) {
					for (const name of queryNames) {
						const ordinals = group.queryNames.get(name);
						if (ordinals === undefined) group.queryNames.set(name, [ordinal]);
						else ordinals.push(ordinal);
					}
				}
				return ok(undefined);
			}
			/** Comparison-only inventory, borrowing admitted ordinals without page serialization. */
			*comparisonGroups() {
				if (this.comparison === undefined) throw new Error("Exact paths must be retained when admitting comparison records");
				for (const group of this.#groups) yield {
					method: group.method,
					origin: group.origin,
					path_template: group.path_template,
					rules: group.rules,
					templated_segments: group.segments.map(({ segment_index, rule }) => ({
						segment_index,
						rule
					})),
					record_ordinals: group.ordinals,
					exactPathOrdinal: (path) => group.paths.get(path)
				};
			}
			/** Counts do not allocate the existing view's complete page or exclusion list. */
			comparisonCoverage() {
				return {
					groups: this.#groups.length,
					excluded_records: this.#excluded.length
				};
			}
			page(offset, limit) {
				this.#groups.sort((a, b) => compareUnicodeCodePoints(a.origin, b.origin) || compareUnicodeCodePoints(a.path_template, b.path_template) || compareUnicodeCodePoints(a.method, b.method));
				const groups = this.#groups.slice(offset, offset + limit).map((group) => ({
					method: group.method,
					origin: group.origin,
					path_template: group.path_template,
					templated_segments: group.segments.map((segment) => ({
						segment_index: segment.segment_index,
						rule: segment.rule,
						basis: "inferred",
						observed_values: [...segment.values].sort(compareUnicodeCodePoints)
					})),
					record_ordinals: [...group.ordinals],
					statuses: [...group.statuses].sort((a, b) => a - b),
					content_types: [...group.contentTypes].sort(compareUnicodeCodePoints),
					...group.queryNames === undefined ? {} : { query_parameter_names: [...group.queryNames].sort(([a], [b]) => compareUnicodeCodePoints(a, b)).map(([name, record_ordinals]) => ({
						name,
						record_ordinals: [...record_ordinals]
					})) },
					flags: [
						...group.ordinals.length === 1 ? ["single-sample"] : [],
						...group.statuses.size > 1 ? ["mixed-statuses"] : [],
						...group.contentTypes.size > 1 ? ["mixed-content-types"] : []
					]
				}));
				return {
					coverage: pageViewCoverage(offset, groups.length, this.#groups.length),
					groups,
					templated_groups: this.#groups.reduce((count, group) => count + (group.segments.length > 0 ? 1 : 0), 0),
					excluded_records: [...this.#excluded],
					limitations: this.sortedLimitations(),
					unknowns: this.#unavailableResponse ? ["Some retained records have unavailable status or content type values."] : []
				};
			}
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/webNetworkApiSurfaceView.js
var createApiSurfaceAccumulator, projectWebNetworkApiSurfaceView;
function init_webNetworkApiSurfaceView() {
	return (init_webNetworkApiSurfaceView = __esmMin((() => {
		init_analysisErrorCore();
		init_result();
		init_analysisViewShape();
		init_WebNetworkApiSurfaceAccumulator();
		init_WebNetworkProjectionAccumulator();
		init_apiSurfaceSchema();
		createApiSurfaceAccumulator = (view) => {
			const selected = ownedView(view, "api-surface");
			return new WebNetworkApiSurfaceAccumulator(undefined, selected?.include_query_parameter_names === true);
		};
		projectWebNetworkApiSurfaceView = (parent, view, accumulator = createApiSurfaceAccumulator(view)) => {
			if (view.kind !== "api-surface") return err(new AnalysisUnsupportedTargetError("inspect_analysis_view", parent.evidenceId, `View ${view.kind} is unsupported for parent operation ${parent.operation}; api-surface requires inspect_web_network_capture.`));
			assertOwnedView(view, "api-surface");
			const admitted = admitHarCaptureParent(parent, "api-surface", accumulator);
			if (!admitted.ok) return admitted;
			const capture = admitted.value;
			const limitations = accumulator.addLimitations([
				...parent.limitations,
				...capture.limitations,
				"Grouping does not establish handler identity, URL-space schemas or causality.",
				...view.include_query_parameter_names === true ? ["Observed query parameter names do not establish required parameters, value types or a complete API schema."] : [],
				...capture.records.length < capture.total_records ? ["Parent contains an ordinal subset; the surface covers only retained records."] : []
			]);
			if (!limitations.ok) return limitations;
			for (const record of capture.records) {
				const added = accumulator.add(record);
				if (!added.ok) return added;
			}
			const page = accumulator.page(view.offset, view.limit);
			return ok({
				kind: "api-surface",
				view,
				parent_evidence_id: parent.evidenceId,
				parent_operation: "inspect_web_network_capture",
				parent_digest: parent.evidenceId.slice(3),
				artifact: {
					path: capture.artifact.path,
					sha256: capture.artifact.sha256
				},
				records: {
					examined: capture.records.length,
					total: capture.total_records,
					excluded: page.excluded_records.length
				},
				...page
			});
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/procedurePseudocodeView.js
var unavailable, projectProcedurePseudocodeView;
function init_procedurePseudocodeView() {
	return (init_procedurePseudocodeView = __esmMin((() => {
		init_inputIssueProjection();
		init_result();
		init_analysisViewParent();
		init_analysisViewShape();
		init_analysisViewErrors();
		init_analysisViewCoverage();
		init_analysisViewText();
		init_procedurePseudocodeSchemas();
		unavailable = {
			available: false,
			reason: "Provider returned null"
		};
		projectProcedurePseudocodeView = (parent, request) => {
			const view = ownedView(request, "summary", "native");
			if (view === undefined || view.kind === "native" && view.facet !== "pseudocode") return err(analysisViewInputError([{
				path: ["view"],
				reason: "invalid_value",
				message: "procedure_pseudo_code Evidence supports summary or native pseudocode views."
			}]));
			if (parent.artifact == null) return err(analysisViewInputError([{
				path: ["source", "subject"],
				reason: "invalid_value",
				message: "Pseudocode Evidence requires an artifact-bound subject."
			}]));
			const parsed = parseAnalysisViewResult(z.string().nullable(), parent);
			if (!parsed.ok) return parsed;
			const selection = procedurePseudocodeSelectionSchema.safeParse(parent.parameters);
			if (!selection.success) return err(analysisInputErrorFromIssues("inspect_analysis_view", selection.error.issues.map((issue) => ({
				...issue,
				path: [
					"source",
					"parameters",
					...issue.path
				]
			})), { source: { parameters: parent.parameters } }, { cause: selection.error }));
			const text = parsed.value;
			const common = {
				parent_evidence_id: parent.evidenceId,
				parent_operation: "procedure_pseudo_code",
				parent_digest: parent.evidenceId.slice(3),
				artifact: parent.artifact,
				limitations: [...parent.limitations],
				unknowns: text === null ? ["Provider returned null; this does not establish absence of a function."] : []
			};
			if (view.kind === "summary") return ok({
				kind: "summary",
				view,
				...common,
				summary: {
					selection: selection.data,
					pseudocode: text === null ? unavailable : {
						available: true,
						code_units: text.length,
						unit: "utf16-code-units"
					}
				},
				coverage: completeWithinViewCoverage(1)
			});
			if (text === null) return ok({
				kind: "native",
				view,
				...common,
				procedure_address: null,
				item: unavailable,
				coverage: completeWithinViewCoverage(1)
			});
			const page = analysisTextPage(text, view.offset, view.limit);
			return page.ok ? ok({
				kind: "native",
				view,
				...common,
				procedure_address: null,
				...page.value
			}) : page;
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/nativeFunctionView.js
var viewError, parentFields, nativeRows, facetAvailabilityKeys, facetAvailability, unavailableFacetUnknowns, optionalFacets, unrecordedFacetUnknowns, summarizeDossier, summaryView, projectNativeFunctionView;
function init_nativeFunctionView() {
	return (init_nativeFunctionView = __esmMin((() => {
		init_analysisViewErrors();
		init_analysisViewText();
		init_canonicalOrdering();
		init_jsonValue();
		init_result();
		init_analysisViewShape();
		init_analysisViewCoverage();
		viewError = (message) => analysisViewInputError([{
			path: ["view"],
			reason: "invalid_value",
			message
		}]);
		parentFields = (parent, dossier, artifact) => {
			const flow = dossier.native_value_flow;
			const api = dossier.native_api;
			const unknowns = [];
			if (flow === null) unknowns.push("native_value_flow was not recorded");
			else if (!flow.available) unknowns.push("native_value_flow unavailable: " + flow.reason);
			else if (flow.truncated) unknowns.push("native_value_flow is truncated; omitted observations remain unknown");
			if (api === null) unknowns.push("native_api was not recorded");
			else if (!api.available) unknowns.push("native_api unavailable: " + api.reason, ...api.residual_unknowns);
			return {
				parent_evidence_id: parent.evidenceId,
				parent_operation: "analyze_function",
				parent_digest: parent.evidenceId.slice(3),
				procedure_address: dossier.procedure.address,
				artifact,
				limitations: uniqueSorted([
					...parent.limitations,
					...dossier.limitations,
					...flow?.limitations ?? [],
					...api?.available ? api.limitations : []
				]),
				unknowns: uniqueSorted(unknowns)
			};
		};
		nativeRows = (dossier, facet) => {
			const sourceFlow = dossier.native_value_flow;
			const flow = sourceFlow?.available ? sourceFlow : undefined;
			return {
				assembly: dossier.assembly,
				basic_blocks: dossier.basic_blocks,
				comments: dossier.comments,
				callers: dossier.callers,
				callees: dossier.callees,
				incoming_references: dossier.incoming_references,
				outgoing_references: dossier.outgoing_references,
				unresolved_calls: dossier.unresolved_calls,
				referenced_strings: dossier.referenced_strings,
				referenced_names: dossier.referenced_names,
				swift_string_literals: dossier.swift_string_literals,
				swift_string_literal_omissions: dossier.swift_string_literal_omissions,
				value_flow_operations: flow?.operations,
				value_flow_def_use: flow?.def_use,
				value_flow_effects: flow?.effects,
				value_flow_parameters: flow?.parameters,
				value_flow_parameter_uses: flow?.parameter_uses
			}[facet];
		};
		facetAvailabilityKeys = {
			incoming_references: "references",
			outgoing_references: "references",
			referenced_strings: "strings_names",
			referenced_names: "strings_names",
			basic_blocks: "cfg"
		};
		facetAvailability = (dossier, facet) => dossier.facet_availability?.[facetAvailabilityKeys[facet] ?? facet];
		unavailableFacetUnknowns = (dossier) => {
			const availability = dossier.facet_availability;
			if (availability === undefined) return [];
			return Object.entries(availability).flatMap(([facet, status]) => status.available ? [] : [`${facet} unavailable: ${status.reason}`]);
		};
		optionalFacets = [
			"unresolved_calls",
			"swift_string_literals",
			"swift_string_literal_omissions"
		];
		unrecordedFacetUnknowns = (dossier) => optionalFacets.flatMap((facet) => dossier[facet] === undefined ? [`${facet} not recorded`] : []);
		summarizeDossier = (dossier) => {
			const sourceFlow = dossier.native_value_flow;
			const flow = sourceFlow?.available ? sourceFlow : undefined;
			const count = (facet, rows) => facetAvailability(dossier, facet)?.available === false ? null : rows.length;
			const recorded = (rows) => rows === undefined ? null : rows.length;
			return {
				procedure: {
					name: dossier.procedure.name,
					address: dossier.procedure.address
				},
				pseudocode: {
					available: dossier.facet_availability?.pseudocode?.available ?? dossier.pseudocode.length > 0,
					code_units: dossier.pseudocode.length
				},
				value_flow: {
					available: flow !== undefined,
					truncated: flow === undefined ? null : flow.truncated
				},
				facet_availability: dossier.facet_availability ?? null,
				counts: {
					assembly: count("assembly", dossier.assembly),
					basic_blocks: count("basic_blocks", dossier.basic_blocks),
					comments: count("comments", dossier.comments),
					callers: count("callers", dossier.callers),
					callees: count("callees", dossier.callees),
					incoming_references: count("incoming_references", dossier.incoming_references),
					outgoing_references: count("outgoing_references", dossier.outgoing_references),
					unresolved_calls: recorded(dossier.unresolved_calls),
					referenced_strings: count("referenced_strings", dossier.referenced_strings),
					referenced_names: count("referenced_names", dossier.referenced_names),
					swift_string_literals: recorded(dossier.swift_string_literals),
					swift_string_literal_omissions: recorded(dossier.swift_string_literal_omissions),
					prototype_conflicts: recorded(dossier.native_api?.available ? dossier.native_api.prototype_conflicts : undefined),
					value_flow_operations: flow?.operations.length ?? null,
					value_flow_def_use: flow?.def_use.length ?? null,
					value_flow_effects: flow?.effects.length ?? null,
					value_flow_parameters: flow?.parameters.length ?? null,
					value_flow_parameter_uses: flow?.parameter_uses.length ?? null
				},
				limitation_count: dossier.limitations.length
			};
		};
		summaryView = (view, dossier, common) => ({
			kind: "summary",
			view,
			summary: summarizeDossier(dossier),
			coverage: completeWithinViewCoverage(1),
			...common,
			unknowns: uniqueSorted([
				...common.unknowns,
				...unavailableFacetUnknowns(dossier),
				...unrecordedFacetUnknowns(dossier)
			])
		});
		projectNativeFunctionView = (parent, dossier, view) => {
			if (view.kind !== "native" && view.kind !== "summary") return err(viewError("analyze_function Evidence requires a native or summary view."));
			assertOwnedView(view, "summary", "native");
			const artifact = parent.artifact;
			if (!artifact) return err(analysisViewInputError([{
				path: ["source", "subject"],
				reason: "invalid_value",
				message: "Native function Evidence requires an artifact-bound subject."
			}]));
			const common = parentFields(parent, dossier, artifact);
			if (view.kind === "summary") return ok(summaryView(view, dossier, common));
			const availability = facetAvailability(dossier, view.facet);
			if (availability?.available === false) common.unknowns = uniqueSorted([...common.unknowns, availability.reason]);
			const singleton = (item) => ({
				kind: "native",
				view,
				item: jsonValueSchema.parse(item),
				coverage: completeWithinViewCoverage(1),
				...common
			});
			if (availability?.available === false) return ok(singleton(availability));
			const flow = dossier.native_value_flow;
			if (view.facet === "procedure" || view.facet === "native_api" || view.facet === "value_flow_summary") {
				if (view.offset !== 0) return err(viewError("Singleton native facets require offset 0."));
				if (view.facet === "procedure") return ok(singleton(dossier.procedure));
				if (view.facet === "native_api") return ok(singleton(dossier.native_api ?? {
					available: false,
					reason: "not recorded"
				}));
				const status = flow === null ? {
					available: false,
					reason: "not recorded"
				} : !flow.available ? {
					available: false,
					reason: flow.reason
				} : {
					available: true,
					provenance: flow.provenance,
					truncated: flow.truncated,
					omitted_operations_lower_bound: flow.omitted_operations_lower_bound,
					known_omitted_inputs: flow.known_omitted_inputs,
					known_omitted_edges: flow.known_omitted_edges,
					operations: flow.operations.length,
					def_use: flow.def_use.length,
					effects: flow.effects.length,
					parameters: flow.parameters.length,
					parameter_uses: flow.parameter_uses.length
				};
				return ok(singleton(status));
			}
			if (view.facet === "pseudocode") {
				const page = analysisTextPage(dossier.pseudocode, view.offset, view.limit);
				return page.ok ? ok({
					kind: "native",
					view,
					...page.value,
					...common
				}) : page;
			}
			const rows = nativeRows(dossier, view.facet);
			if (rows === undefined) return ok(singleton({
				available: false,
				reason: view.facet.startsWith("value_flow_") && flow?.available === false ? flow.reason : "not recorded"
			}));
			const items = rows.slice(view.offset, view.offset + view.limit);
			return ok({
				kind: "native",
				view,
				item: jsonValueSchema.parse(items),
				coverage: pageViewCoverage(view.offset, items.length, rows.length),
				...common
			});
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/managedMemberView.js
var MANAGED_MEMBER_SCOPE_GUIDANCE, collectionPage, sliceMemberRows, selectRows, projectRow, matchRow, matches, parseMemberReport, summarizeMembers, projectManagedMemberView;
function init_managedMemberView() {
	return (init_managedMemberView = __esmMin((() => {
		init_analysisViewErrors();
		init_canonicalOrdering();
		init_managedArtifact();
		init_result();
		init_analysisViewShape();
		init_analysisViewCoverage();
		init_managedMemberViewSchemas();
		init_managedArtifactView();
		init_analysisViewParent();
		init_managedInspectionEvidence();
		MANAGED_MEMBER_SCOPE_GUIDANCE = {
			selectedNominalRows: "Exported types and member references cover the whole assembly. Named type rows, fields, methods, call edges, field accesses and user strings follow the declaring-type selection.",
			unresolvedTypeRows: "Unresolved TypeDef coordinates cover the assembly-wide name scan.",
			unresolvedMethodRows: "Unresolved MethodDef coordinates follow the recorded source method interval and any declaring-type selection.",
			unexaminedMethodRows: "MethodDef name coordinates are unavailable in this capacity recovery."
		};
		collectionPage = (report, view) => {
			const { collection } = view;
			switch (collection) {
				case "types": return selectRows({
					collection,
					rows: report.types,
					identity: ["token", "row_offset"],
					name: "name"
				}, view);
				case "exported_types": return selectRows({
					collection,
					rows: report.exported_types,
					identity: ["token", "row_offset"],
					name: "name"
				}, view);
				case "fields": return selectRows({
					collection,
					rows: report.fields,
					identity: [
						"token",
						"row_offset",
						"declaring_type_token"
					],
					name: "name",
					declaringType: "declaring_type"
				}, view);
				case "methods": return selectRows({
					collection,
					rows: report.methods,
					identity: [
						"token",
						"row_offset",
						"declaring_type_token"
					],
					name: "name",
					declaringType: "declaring_type"
				}, view);
				case "member_refs": return selectRows({
					collection,
					rows: report.member_refs,
					identity: [
						"token",
						"row_offset",
						"parent_token"
					],
					name: "name",
					declaringType: "parent_name"
				}, view);
				case "call_edges": return selectRows({
					collection,
					rows: report.call_edges,
					identity: [
						"caller_token",
						"il_offset",
						"target_token",
						"opcode"
					],
					name: "target_name",
					declaringType: "target_declaring_type"
				}, view);
				case "field_accesses": return selectRows({
					collection,
					rows: report.field_accesses,
					identity: [
						"method_token",
						"il_offset",
						"field_token",
						"opcode"
					],
					name: "field_name",
					declaringType: "field_declaring_type"
				}, view);
				case "user_strings": return selectRows({
					collection,
					rows: report.user_strings?.literals,
					identity: ["token", "offset"]
				}, view);
				case "unresolved_definitions": return sliceMemberRows(collection, report.unresolved_definitions?.rows, view);
			}
		};
		sliceMemberRows = (collection, rows, view) => rows === undefined ? null : {
			page: {
				collection,
				rows: rows.slice(view.offset, view.offset + view.limit)
			},
			total: rows.length
		};
		selectRows = (source, view) => {
			if (source.rows == null) return null;
			const names = "names" in view && view.names !== undefined ? new Set(view.names) : undefined;
			const declaringTypes = "declaring_types" in view && view.declaring_types !== undefined ? new Set(view.declaring_types) : undefined;
			const fields = "fields" in view && view.fields !== undefined ? new Set(view.fields) : undefined;
			const filtering = names !== undefined || declaringTypes !== undefined;
			if (!filtering && fields === undefined) return sliceMemberRows(source.collection, source.rows, view);
			const selected = [];
			const start = filtering ? 0 : Math.min(view.offset, source.rows.length);
			const end = filtering ? source.rows.length : Math.min(view.offset + view.limit, source.rows.length);
			let total = filtering ? 0 : source.rows.length;
			let unresolved = 0;
			for (let index = start; index < end; index++) {
				const row = source.rows[index];
				if (row === undefined) continue;
				const matched = matchRow(row, source, {
					names,
					declaringTypes
				});
				if (matched === false) continue;
				if (matched === null) {
					unresolved++;
					continue;
				}
				const ordinal = filtering ? total++ : index;
				if (ordinal < view.offset || selected.length >= view.limit) continue;
				selected.push(projectRow(row, index, fields, source.identity));
			}
			return {
				page: {
					collection: source.collection,
					rows: selected,
					source_count: source.rows.length,
					unresolved_filter_rows: unresolved
				},
				total
			};
		};
		projectRow = (row, index, fields, identity) => {
			const projected = {
				...row,
				source_index: index
			};
			if (fields !== undefined) {
				for (const key of Object.keys(row)) if (!fields.has(key) && !identity.includes(key)) delete projected[key];
			}
			return projected;
		};
		matchRow = (row, source, filters) => {
			const name = matches(filters.names, source.name === undefined ? undefined : row[source.name]);
			const declaringType = matches(filters.declaringTypes, source.declaringType === undefined ? undefined : row[source.declaringType]);
			if (name === false || declaringType === false) return false;
			return name === null || declaringType === null ? null : true;
		};
		matches = (selection, value) => {
			if (selection === undefined) return true;
			if (selection.size === 0) return false;
			return typeof value === "string" ? selection.has(value) : null;
		};
		parseMemberReport = createAnalysisViewResultReader(managedMemberInspectionSchema);
		summarizeMembers = (report) => {
			const { types, exported_types, fields, methods, member_refs, call_edges, field_accesses, user_strings, unresolved_definitions, ...identity } = report;
			return {
				...identity,
				...unresolved_definitions === undefined ? {} : { unresolved_method_names_examined: unresolved_definitions.method_names_examined },
				user_strings: user_strings === null ? null : {
					state: user_strings.state,
					issues: user_strings.issues
				},
				reported_counts: {
					types: types.length,
					exported_types: exported_types?.length ?? null,
					fields: fields.length,
					methods: methods.length,
					member_refs: member_refs.length,
					call_edges: call_edges.length,
					field_accesses: field_accesses.length,
					user_strings: user_strings?.literals.length ?? null,
					...unresolved_definitions === undefined ? {} : { unresolved_definitions: unresolved_definitions.rows.length }
				}
			};
		};
		projectManagedMemberView = (parent, view) => {
			if (view.kind !== "summary" && view.kind !== "managed-members") return err(analysisViewInputError([{
				path: ["view"],
				reason: "invalid_value",
				message: "Managed member inspection supports summary and managed-members views."
			}]));
			assertOwnedView(view, "summary", "managed-members");
			const parsed = parseMemberReport(parent);
			if (!parsed.ok) return parsed;
			const report = parsed.value;
			const identity = validateAnalysisViewSubject(parent.subject, report.artifact.sha256);
			if (!identity.ok) return identity;
			const scope = validateManagedTokenScope(report, parent.operation, parent.evidenceId);
			if (!scope.ok) return scope;
			const coordinates = report.unresolved_definitions;
			const shared = {
				parent_evidence_id: parent.evidenceId,
				parent_operation: "inspect_managed_members",
				parent_digest: parent.evidenceId.slice(3),
				artifact: {
					path: report.artifact.path,
					sha256: report.artifact.sha256
				},
				limitations: uniqueSorted([...parent.limitations, ...report.limitations]),
				unknowns: [
					"Collection counts and pages cover producer-returned rows; member completeness remains the original coverage, not an absence claim about unreturned rows.",
					...report.selection === null ? [] : [MANAGED_MEMBER_SCOPE_GUIDANCE.selectedNominalRows],
					...coordinates === undefined ? [] : [MANAGED_MEMBER_SCOPE_GUIDANCE.unresolvedTypeRows, coordinates.method_names_examined ? MANAGED_MEMBER_SCOPE_GUIDANCE.unresolvedMethodRows : MANAGED_MEMBER_SCOPE_GUIDANCE.unexaminedMethodRows],
					...managedViewIdentityUnknowns(parent, report.identity_scope.requires_mvid)
				]
			};
			if (view.kind === "summary") {
				const summary = summarizeMembers(report);
				const total = Object.values(summary.reported_counts).reduce((sum, count) => sum + (count ?? 0), 0);
				return ok({
					kind: "summary",
					view,
					...shared,
					summary,
					coverage: completeWithinViewCoverage(total)
				});
			}
			const selected = collectionPage(report, view);
			if (selected === null) return err(analysisViewInputError([{
				path: ["view", "collection"],
				reason: "invalid_value",
				message: view.collection === "unresolved_definitions" ? "The parent Evidence did not record unresolved_definitions. Repeat inspect_managed_members to obtain checked coordinates." : `The parent Evidence did not examine ${view.collection}; repeat inspect_managed_members with the current runtime to record it.`
			}]));
			const { page, total } = selected;
			if ("unresolved_filter_rows" in page && page.unresolved_filter_rows !== undefined && page.unresolved_filter_rows > 0) shared.unknowns.push(`${page.unresolved_filter_rows} source rows have unknown requested names or declaring types and may match the filters; the matched total excludes them.`);
			return ok({
				kind: "managed-members",
				view,
				page,
				...shared,
				module: report.module,
				signature_resolution: report.signature_resolution,
				nesting_read: report.nesting_read,
				identity_scope: report.identity_scope,
				selection: report.selection,
				method_rows: report.method_rows,
				...view.collection === "unresolved_definitions" && coordinates !== undefined ? { unresolved_method_names_examined: coordinates.method_names_examined } : {},
				source_metadata_status: report.metadata.status,
				...report.metadata.unresolved_module_name === undefined ? {} : { unresolved_module_name: report.metadata.unresolved_module_name },
				source_coverage: view.collection === "user_strings" && report.user_strings !== null ? {
					state: report.user_strings.state,
					issues: report.user_strings.issues
				} : report.coverage,
				coverage: pageViewCoverage(view.offset, page.rows.length, total)
			});
		};
	})))();
}

//#endregion
//#region dist/domain/analysisView/analysisView.js
var sealAnalysisView, parentEvidenceIdSchema, parseJavaScriptParent, unsupportedParent, sealProjected, retain, retainedViewProjectors, prepareAnalysisViewProjection, isGroupingView, projectGroupingView, projectAnalysisView;
function init_analysisView() {
	return (init_analysisView = __esmMin((() => {
		init_webSourceLocationView();
		init_nativeProcedureReferencesView();
		init_playwrightTraceView();
		init_apiContractView();
		init_nativeObservation();
		init_nativeObservationView();
		init_recordedArrayView();
		init_nativeInstructionReferencesView();
		init_nativeValueTraceView();
		init_devicetreeView();
		init_apkSignatureView();
		init_byteEntropy();
		init_erlangBeamView();
		init_pythonPycView();
		init_nugetNupkgView();
		init_nativeExportsView();
		init_elfDependenciesView();
		init_byteEntropyView();
		init_analysisViewParent();
		init_javascriptRoutesView();
		init_webBundleView();
		init_sourceToBundleView();
		init_endpointComparisonView();
		init_featureTraceView();
		init_nativeFeatureTraceView();
		init_batchDecompileView();
		init_gpuCodeObjectsView();
		init_modelArtifactView();
		init_commandObservationView();
		init_fridaSessionStatusView();
		init_goBinaryView();
		init_rustBinaryView();
		init_cyclonedxView();
		init_nativeFunctionMatchingView();
		init_nativeInventoryView();
		init_nativeInventory();
		init_evidence();
		init_functionMatching();
		init_browserScenarioView();
		init_nativeLoadImageView();
		init_desktopApplicationView();
		init_analysisErrorCore();
		init_analysisViewErrors();
		init_canonicalDigest();
		init_digests();
		init_result();
		init_binaryLayout();
		init_functionDossier();
		init_javascriptApplicationAnalysis();
		init_binaryLayoutView();
		init_javascriptApplicationView();
		init_webNetworkApiSurfaceView();
		init_procedurePseudocodeView();
		init_nativeFunctionView();
		init_evmInterfaceView();
		init_artifactInventoryView();
		init_managedArtifactView();
		init_managedMemberView();
		init_wasmArtifactView();
		init_machoView();
		init_interfaceBuilderView();
		init_webNetworkCaptureView();
		init_analysisViewDataAdmission();
		init_environmentManifestView();
		init_environmentStateView();
		init_environmentCoverageView();
		init_pcapCaptureView();
		init_androidPackageView();
		init_androidSymbolView();
		init_androidJniView();
		init_dartAotView();
		init_il2cppMetadataView();
		init_analysisViewResult();
		sealAnalysisView = (projection) => analysisViewResultSchema.parse({
			...projection,
			view_digest: digestCanonicalValue(projection, "Analysis view")
		});
		parentEvidenceIdSchema = prefixedDigestSchema("ev");
		parseJavaScriptParent = (input) => {
			try {
				const steps = parseOwnedJavaScriptApplicationAnalysisSteps(input);
				let step = steps.next();
				while (!step.done) step = steps.next();
				return ok(step.value);
			} catch (cause) {
				if (!(cause instanceof z.ZodError)) throw cause;
				return err(analysisViewResultInputError(input, cause));
			}
		};
		unsupportedParent = (parent) => new AnalysisUnsupportedTargetError(INSPECT_ANALYSIS_VIEW_OPERATION, parentArtifactPath(parent), `Parent Evidence operation ${JSON.stringify(parent.operation)} does not support analysis views.`, { remediationAction: "For an analysis view, select completed Evidence from a supported parent operation and a compatible view. For a summary receipt, use normalized_result.parent_evidence_id. To read this record, use the original complete Evidence directly; for session-retained records, request get_evidence_bundle with detail complete or use export_evidence_bundle. Complete bundle delivery may exceed the MCP response budget." });
		sealProjected = (projected) => projected.ok ? ok(sealAnalysisView(projected.value)) : projected;
		retain = (operation, project) => [operation, project];
		retainedViewProjectors = new Map([
			retain("procedure_pseudo_code", projectProcedurePseudocodeView),
			retain("inspect_native_instruction", projectNativeInstructionReferencesView),
			retain("trace_feature", projectNativeFeatureTraceView),
			...NATIVE_OBSERVATION_OPERATIONS.map((operation) => retain(operation, projectNativeObservationView)),
			retain("procedure_references", projectNativeProcedureReferencesView),
			retain("trace_native_values", projectNativeValueTraceView),
			retain("inspect_erlang_beam", projectErlangBeamView),
			retain("inspect_devicetree", projectDevicetreeView),
			retain("inspect_native_exports", projectNativeExportsView),
			retain("inspect_elf_dependencies", projectElfDependenciesView),
			retain("inspect_native_load_image", projectNativeLoadImageView),
			retain("inspect_python_pyc", projectPythonPycView),
			retain("inspect_nuget_nupkg", projectNugetNupkgView),
			retain("frida_session_status", projectFridaSessionStatusView),
			retain("gdb_console", projectCommandObservationView),
			retain("inspect_with_objdump", projectCommandObservationView),
			retain("inspect_go_binary", projectGoBinaryView),
			retain("inspect_rust_binary", projectRustBinaryView),
			...NATIVE_INVENTORY_OPERATIONS.map((operation) => retain(operation, projectNativeInventoryView)),
			retain("inspect_desktop_application", projectDesktopApplicationView),
			retain("inspect_wasm_artifact", projectWasmArtifactView),
			retain("inspect_macho", projectMachoView),
			retain("decode_interface_builder", projectInterfaceBuilderView),
			retain("inspect_evm_interface", projectEvmInterfaceView),
			retain("inspect_managed_artifact", projectManagedArtifactView),
			retain("inspect_managed_members", projectManagedMemberView),
			retain("inspect_android_package", projectAndroidPackageView),
			retain("inspect_android_class", projectAndroidSymbolSummary),
			retain("inspect_android_method", projectAndroidSymbolSummary),
			retain("inspect_android_jni_bindings", projectAndroidJniView),
			retain("capture_browser_scenario", projectBrowserScenarioView),
			retain("inspect_dart_aot", projectDartAotView),
			retain("inspect_il2cpp_metadata", projectIl2cppMetadataView),
			retain("inspect_apk_signature", projectApkSignatureView),
			retain("inspect_model_artifact", projectModelArtifactView),
			retain("inspect_gpu_code_objects", projectGpuCodeObjectsView),
			retain("match_native_functions", projectNativeFunctionMatchingView),
			retain("compare_source_to_bundle", projectSourceToBundleView),
			retain("inspect_api_contract", projectApiContractView),
			retain("inspect_playwright_trace", projectPlaywrightTraceView),
			retain("compare_static_and_observed_endpoints", projectEndpointComparisonView),
			retain("trace_application_feature", projectFeatureTraceView),
			retain("batch_decompile", projectBatchDecompileView),
			retain("inspect_artifact", projectArtifactInventoryView),
			retain("inventory_artifact", projectArtifactInventoryView),
			retain("analyze_web_bundle", projectWebBundleView),
			retain("trace_web_source_location", projectWebSourceLocationView)
		]);
		prepareAnalysisViewProjection = (view) => {
			const accumulators = {
				apiSurface: view.kind === "api-surface" ? createApiSurfaceAccumulator(view) : undefined,
				manifest: view.kind === "environment-manifest" ? createEnvironmentManifestAccumulator(view) : undefined,
				state: view.kind === "environment-state" || view.kind === "environment-coverage" ? createEnvironmentStateAccumulator(view) : undefined
			};
			const accumulator = accumulators.apiSurface ?? accumulators.manifest ?? accumulators.state;
			return {
				admitInlineEvidence: (value) => accumulator === undefined ? admitAnalysisViewData(value, true) : accumulator.admitInlineEvidence(value),
				project: (parent) => projectAnalysisView(parent, view, accumulators)
			};
		};
		isGroupingView = (view) => view.kind === "api-surface" || view.kind === "environment-manifest" || view.kind === "environment-state" || view.kind === "environment-coverage";
		projectGroupingView = (parent, view, accumulators) => {
			if (view.kind === "api-surface") return projectWebNetworkApiSurfaceView(parent, view, accumulators.apiSurface);
			if (view.kind === "environment-manifest") return projectEnvironmentManifestView(parent, view, accumulators.manifest);
			if (view.kind === "environment-coverage") return projectEnvironmentCoverageView(parent, view, accumulators.state);
			return projectEnvironmentStateView(parent, view, accumulators.state);
		};
		projectAnalysisView = (parent, view, accumulators = {}) => {
			if (!parentEvidenceIdSchema.safeParse(parent.evidenceId).success) return err(analysisViewInputError([{
				path: ["source"],
				reason: "invalid_format",
				message: "Parent Evidence ID is not a digest-backed identifier."
			}]));
			const expectedPredicate = parent.operation === "match_native_functions" ? NATIVE_FUNCTION_MATCHING_PREDICATE : parent.operation === "analyze_function" || parent.operation === "procedure_references" || parent.operation === "procedure_pseudo_code" || parent.operation === "inspect_native_instruction" || parent.operation === "trace_feature" || parent.operation === "batch_decompile" || isNativeObservationOperation(parent.operation) || isNativeInventoryOperation(parent.operation) ? ANALYSIS_EVIDENCE_PREDICATE : undefined;
			if (expectedPredicate !== undefined && parent.predicateType !== expectedPredicate) return err(analysisViewInputError([{
				path: ["source", "predicate_type"],
				reason: "invalid_value",
				expected: expectedPredicate,
				message: `${parent.operation} requires ${expectedPredicate} Evidence; received ${parent.predicateType}.`
			}]));
			if (view.kind === "cyclonedx") return sealProjected(projectCycloneDxView(parent, view));
			if (view.kind === "recorded-array") {
				return sealProjected(projectRecordedArrayView(parent, view));
			}
			if (view.kind === "javascript-routes") {
				const projected = projectJavaScriptRoutesView(parent, view);
				return sealProjected(projected);
			}
			if (view.kind === "web-bundle") {
				const projected = projectWebBundleView(parent, view);
				return sealProjected(projected);
			}
			if (isGroupingView(view)) {
				const grouped = projectGroupingView(parent, view, accumulators);
				return sealProjected(grouped);
			}
			if (parent.operation === "inspect_web_network_capture") {
				const projected = projectWebNetworkCaptureView(parent, view);
				return sealProjected(projected);
			}
			if (parent.operation === "inspect_pcap_capture") {
				const projected = projectPcapCaptureView(parent, view);
				return sealProjected(projected);
			}
			if (parent.operation === "inspect_byte_entropy") {
				const report = parseAnalysisViewResult(byteEntropySchema, parent);
				if (!report.ok) return report;
				const projected = projectByteEntropyView(parent, report.value, view);
				return sealProjected(projected);
			}
			if (parent.operation === "inspect_binary_layout") {
				const layout = parseAnalysisViewResult({ safeParse: safeParseOwnedBinaryLayout }, parent);
				if (!layout.ok) return layout;
				const projected = projectBinaryLayoutView(parent, layout.value, view);
				return sealProjected(projected);
			}
			if (parent.operation === "analyze_javascript_application") {
				const analysis = parseJavaScriptParent(parent.normalizedResult);
				if (!analysis.ok) return analysis;
				const projected = projectJavaScriptApplicationView(parent, analysis.value, view);
				return sealProjected(projected);
			}
			if (parent.operation === "analyze_function") {
				const native = parseAnalysisViewResult(functionDossierSchema, parent);
				if (!native.ok) return native;
				const projected = projectNativeFunctionView(parent, native.value, view);
				return sealProjected(projected);
			}
			const project = retainedViewProjectors.get(parent.operation);
			if (project !== undefined) {
				const projected = project(parent, view);
				return sealProjected(projected);
			}
			return err(unsupportedParent(parent));
		};
	})))();
}

//#endregion
//#region dist/application/analysisView/AnalysisViewService.js
var inspectAnalysisView, inspectFileView, inspectBundleView, cancelledFileViewResult, inspectAnalysisViewValidated, projectResolvedAnalysisView, requireAnalysisViewRetention, summarizeRetainedAnalysis, projectRetainedAnalysis, resolveAnalysisViewSource, authenticateEvidence, createAnalysisViewEvidence, viewArtifact;
function init_AnalysisViewService() {
	return (init_AnalysisViewService = __esmMin((() => {
		init_targetIdentity();
		init_analysisErrorProjection();
		init_analysisErrorCleanup();
		init_AnalysisInput();
		init_nativeObservation();
		init_queuedInterrupts();
		init_EvidenceBundleFiles();
		init_analysisViewErrors();
		init_investigationProviders();
		init_EvidenceInputResolver();
		init_analysisErrorCore();
		init_inputIssueProjection();
		init_analysisViewParent();
		init_evidenceValidation();
		init_evidenceFormat();
		init_evidence();
		init_analysisViewRequest();
		init_analysisView();
		init_immutableJson();
		init_result();
		init_evidenceFileSource();
		inspectAnalysisView = async (rawInput, lookup, options = {}) => {
			const parsed = parseAnalysisInput(INSPECT_ANALYSIS_VIEW_OPERATION, rawInput, inspectAnalysisViewInputSchema, options.signal);
			if (!parsed.ok) return parsed;
			if (options.evidenceBundlePath !== undefined) return inspectBundleView(parsed.value, options.evidenceBundlePath, options);
			const source = parsed.value.source;
			if (source.kind === "evidence-file") return inspectFileView({
				...parsed.value,
				source
			}, lookup, options);
			return inspectAnalysisViewValidated({
				...parsed.value,
				source
			}, lookup);
		};
		inspectFileView = async (input, lookup, options = {}) => {
			const loaded = await readEvidenceFileSource(input.source.path, options, input.source.evidence_id);
			await dispatchQueuedInterrupts();
			const admitted = cancelledFileViewResult(loaded, options.signal, loaded.ok ? loaded.value : undefined);
			if (!admitted.ok) return admitted;
			const id = admitted.value.evidence_id;
			const projected = inspectAnalysisViewValidated({
				...input,
				source: {
					kind: "retained-evidence",
					evidence_id: id
				}
			}, (evidenceId) => evidenceId === id ? admitted.value : lookup?.(evidenceId));
			await dispatchQueuedInterrupts();
			if (!projected.ok) return projected;
			return cancelledFileViewResult(projected, options.signal, projected.value);
		};
		inspectBundleView = async (input, bundlePath, { resources, signal }) => {
			if (input.source.kind !== "retained-evidence") return err(new AnalysisInputError("inspect_analysis_view", undefined, [{
				path: ["source", "kind"],
				reason: "invalid_value",
				message: "An Evidence bundle needs a retained-evidence source with the exact parent evidence_id; inline Evidence already supplies its source"
			}]));
			const loaded = await readImmutableEvidenceBundle(bundlePath, signal, resources, "inspect_analysis_view");
			await dispatchQueuedInterrupts();
			if (!loaded.ok) return loaded;
			const parentId = input.source.evidence_id;
			const admitted = cancelledFileViewResult(loaded, signal, signal?.aborted ? loaded.value.records.find((record) => record.evidence_id === parentId) : undefined);
			if (!admitted.ok) return admitted;
			const projected = inspectAnalysisViewValidated({
				source: input.source,
				view: input.view
			}, (id) => admitted.value.records.find((record) => record.evidence_id === id));
			await dispatchQueuedInterrupts();
			if (!projected.ok) return projected;
			return cancelledFileViewResult(projected, signal, projected.value);
		};
		cancelledFileViewResult = (result, signal, completedEvidence) => {
			if (!signal?.aborted) return result;
			const cancellation = cancelledBy(INSPECT_ANALYSIS_VIEW_OPERATION, signal, completedEvidence !== undefined ? { partialObservation: completedEvidence } : {});
			if (!result.ok) cancellation.retainSecondaryFailure(result.error, { source_error: projectAnalysisErrorWithoutCapturedOutput(result.error) });
			return err(!result.ok && result.error.cleanupIncomplete ? analysisErrorWithCleanupDependencies(cancellation, result.error, INSPECT_ANALYSIS_VIEW_OPERATION) : cancellation);
		};
		inspectAnalysisViewValidated = (input, lookup) => {
			const projection = prepareAnalysisViewProjection(input.view);
			if (input.source.kind === "inline") {
				const admitted = projection.admitInlineEvidence(input.source.evidence);
				if (!admitted.ok) return admitted;
			}
			const resolved = resolveAnalysisViewSource(input.source, lookup);
			if (!resolved.ok) return resolved;
			return projectResolvedAnalysisView(input, projection, resolved.value);
		};
		projectResolvedAnalysisView = (input, projection, parent, selectedTarget) => {
			const presentation = selectedTarget === undefined ? parent : rebindEvidenceToTargetPath(parent, selectedTarget);
			const projected = projection.project({
				evidenceId: parent.evidence_id,
				operation: parent.operation,
				predicateType: parent.predicate_type,
				provider: parent.provider,
				analysisProfile: parent.analysis_profile,
				authority: parent.authority,
				environment: parent.environment,
				rawResult: parent.raw_result,
				normalizedResult: immutableJsonSnapshotMember(parent, "normalized_result") ?? parent.normalized_result,
				sealedResult: isImmutableJsonSnapshot(parent),
				subject: presentation.subject,
				limitations: parent.limitations,
				parameters: parent.parameters,
				artifact: viewArtifact(presentation)
			});
			if (!projected.ok) return projected;
			const identity = validateAnalysisViewSubject(parent.subject, projected.value.artifact?.sha256);
			if (!identity.ok) return identity;
			return ok(createAnalysisViewEvidence(input, presentation, projected.value));
		};
		requireAnalysisViewRetention = (operation, retention) => {
			if (retention.recordEvidence === undefined || retention.evidenceById === undefined) return err(new AnalysisCapabilityUnavailableError(ANALYSIS_VIEW_PROVIDER.id, operation, "summary detail requires a server session that retains Evidence for later views", { userMessage: "This server does not retain Evidence. Select detail complete to receive the complete analysis inline." }));
			return ok({
				evidenceById: retention.evidenceById,
				recordEvidence: retention.recordEvidence
			});
		};
		summarizeRetainedAnalysis = (evidence, retention) => projectRetainedAnalysis(evidence, retention, { kind: "summary" });
		projectRetainedAnalysis = (evidence, retention, view) => {
			const ready = requireAnalysisViewRetention(evidence.operation, retention);
			if (!ready.ok) return ready;
			const recorded = ready.value.recordEvidence(evidence);
			if (!recorded.ok) return recorded;
			const source = {
				kind: "retained-evidence",
				evidence_id: evidence.evidence_id
			};
			const retained = resolveEvidenceInput(source, ready.value.evidenceById);
			if (!retained.ok) return retained;
			const projected = projectResolvedAnalysisView({
				source,
				view
			}, prepareAnalysisViewProjection(view), retained.value, evidenceSubjectTarget(evidence.subject));
			if (!projected.ok) projected.error.retainPartialObservation(source);
			return projected;
		};
		resolveAnalysisViewSource = (source, lookup) => {
			if (source.kind === "retained-evidence") return resolveEvidenceInput(source, lookup);
			return authenticateEvidence(source.evidence, ["source", "evidence"], { source });
		};
		authenticateEvidence = (value, path, input) => {
			const parsed = safeParseEvidence(value);
			if (parsed.ok) return parsed;
			const cause = parsed.error;
			if (isUnsupportedEvidenceFormat(cause)) return err(unsupportedEvidenceFormatError(cause));
			return err(analysisInputErrorFromIssues(INSPECT_ANALYSIS_VIEW_OPERATION, cause.issues.map((issue) => ({
				...issue,
				path: [...path, ...issue.path]
			})), input, { cause }));
		};
		createAnalysisViewEvidence = (input, parent, result) => {
			const subject = parent.subject.identity.kind === "unknown" ? unknownTarget("derived-from-linked-evidence") : evidenceSubjectInput(parent.subject);
			const nativeFunctionView = result.kind === "native" || result.kind === "summary" && result.parent_operation === "analyze_function" ? result : undefined;
			const nativeObservationView = result.kind === "native-observation" || result.kind === "native-context" || result.kind === "native-instruction-references" || result.kind === "summary" && isNativeObservationOperation(result.parent_operation);
			return createEvidence(subject, ANALYSIS_VIEW_PROVIDER, {
				predicateType: "rea.analysis-view",
				operation: INSPECT_ANALYSIS_VIEW_OPERATION,
				parameters: {
					parent_evidence_id: parent.evidence_id,
					view: input.view
				},
				result,
				rawResult: null,
				confidence: parent.confidence === "inferred" || result.kind === "environment-state" || result.kind === "environment-coverage" || (result.kind === "api-surface" || result.kind === "environment-manifest") && result.templated_groups > 0 ? "inferred" : "derived",
				authority: parent.authority,
				environment: parent.environment,
				limitations: result.limitations,
				...(nativeFunctionView !== undefined || nativeObservationView) && parent.relationship_coverage !== null ? { relationshipCoverage: parent.relationship_coverage } : {},
				locations: [
					...result.artifact != null && result.artifact.path.length > 0 ? [{
						kind: "artifact-path",
						path: result.artifact.path
					}] : [],
					...parent.operation === "procedure_pseudo_code" ? parent.locations.filter((location) => location.kind !== "artifact-path" || location.path !== result.artifact?.path) : [],
					...nativeFunctionView !== undefined && nativeFunctionView.procedure_address !== null && nativeFunctionView.procedure_address.length > 0 ? [{
						kind: "address",
						address: nativeFunctionView.procedure_address
					}] : []
				],
				evidenceLinks: [parent.evidence_id]
			}, { immutable: true });
		};
		viewArtifact = (evidence) => {
			const target = evidenceFileTarget(evidence);
			const display = evidenceSubjectDisplay(evidence);
			return target === undefined || display === undefined ? null : {
				path: display.local_path,
				sha256: target.sha256
			};
		};
	})))();
}

//#endregion
export { WebNetworkApiSurfaceAccumulator, init_AnalysisViewService, init_WebNetworkApiSurfaceAccumulator, inspectAnalysisView, inspectAnalysisViewValidated, projectRetainedAnalysis, requireAnalysisViewRetention, summarizeRetainedAnalysis };