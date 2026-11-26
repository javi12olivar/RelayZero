import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { i as projectAnalysisError, n as init_analysisErrorProjection } from "./analysisErrorProjection-B0_t_nHz.js";
import { i as init_analysisErrorBase, t as AnalysisError } from "./analysisErrorBase-C0hMa0_b.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { M as isPathWithinRoot, j as init_localPath, o as jsonValueSchema, r as init_jsonValue } from "./jsonValue-BIEmjG1z.js";
import { R as digestSchema, it as sha256Hex, rt as init_sha256Hex, z as init_digests } from "./canonicalDigest-DUQN3Yyz.js";
import { _ as init_analysisErrorCore, a as AnalysisCapabilityUnavailableError, i as AnalysisCancelledError, l as AnalysisResourceConstraintError, m as cancelledBy, o as AnalysisInputError, s as AnalysisOutputError, u as AnalysisTimeoutError, v as isAborted } from "./analysisErrorCore-CrdY4k0A.js";
import { n as init_strictUtf8, t as decodeStrictUtf8 } from "./strictUtf8-Cx_KgW8Z.js";
import { ht as init_relationshipCoverage, ot as init_binaryTargetTypes, pt as combineRelationshipDiscovery, st as isMachOFormat } from "./evidence-z4eWkAQk.js";
import { r as init_inputIssueProjection, t as analysisInputErrorFromIssues } from "./inputIssueProjection-BUIigDH2.js";
import { i as init_jsonSerialization, o as jsonParts } from "./jsonSerialization-DvIEYSSO.js";
import { E as nativeCallTargetsSchema, F as listProceduresFact, Ft as init_machoTargetSelection, Gt as profileMachoTargetSelection, Ht as machoTargetSelectionMatchesFormat, I as listStringsFact, Jt as classifySwiftSymbol, Kt as sameMachoTargetSelection, L as searchProceduresFact, M as projectBinaryOverview, N as init_nativeOperationFacts, P as listNamesFact, R as searchStringsFact, Sn as init_boundedList, T as init_nativeInstruction, Tt as init_objcSwiftMetadata, Vt as machoTargetSelectionMatchesArchitecture, Yt as init_swiftSymbolClassification, Zt as isSwiftSymbolName, an as init_nativeObservation, at as nativeValueTraceTruncationReasonSchema, bn as boundedList, ct as DECOMPILE_DIRECTORY_INLINE_FAILURE_BYTES, en as init_objcClassSymbol, ft as decompileDirectoryManifestSchema, gt as isDecompileFunctionRelativePath, hn as init_inventoryCoverage, ht as init_decompileDirectory, it as nativeValueTraceSchema, j as parseSegments, k as init_nativeSegments, kt as nativeDispatchMetadataResultSchema, ln as parseContainingProcedureResolution, lt as DECOMPILE_DIRECTORY_JOURNAL_NAME, mt as decompileJournalLineSchema, nn as objcSymbolLeaf, nt as init_nativeValueTrace, ot as DECOMPILE_DIRECTORY_FUNCTIONS_DIRECTORY, pt as decompileJournalHeaderSchema, rt as nativeValueTraceInputSchema, st as DECOMPILE_DIRECTORY_INDEX_NAME, tn as objcClassSymbol, ut as decompileDirectoryIndexSchema, vn as withOverviewInventoryCoverage, wt as MAX_DISPATCH_METADATA_RECORDS } from "./interfaceBuilderGraph-BpsIKsqX.js";
import { _o as init_CallRelationshipTraversal, ao as traceNativeUiAction, bo as init_CapabilityFallback, co as resolveProcedureAddress, do as init_NativeDispatchMetadataInspection, eo as init_XrefsAddressResolution, fo as inspectNativeDispatch, go as cleanupStoppedTraversal, ho as CALL_RELATIONSHIP_TRAVERSALS, io as init_NativeUiActionTrace, lo as init_SourceLimitations, mo as init_AnalysisOperationFacts, no as init_AnalysisDocument, oo as init_ProcedureAddressResolution, po as executeFact, ro as resolveAnalysisDocument, so as parseProcedureAddress, to as resolveXrefsName, uo as renderSourceLimitations, vo as readCallRelationships, xo as permitsCapabilityFallback, yo as stopsTraversal } from "./createServer-Brv7NMx6.js";
import { H as init_nativeAddress, N as procedureInfoSchema, U as nativeAddressCoordinateInputSchema, V as init_addressCoordinate, a as parseFunctionDossier, c as nativeApiInspectionResultSchema, i as init_functionDossier, j as init_procedureInfo, s as init_nativeApiBoundary, t as functionDossierSchema, z as addressCoordinate } from "./functionDossier-CPGojIMs.js";
import { r as init_unicodeCodePointOrder, t as compareUnicodeCodePoints } from "./unicodeCodePointOrder-BezCbTpg.js";
import { n as enhancedInputSchemas, r as init_enhancedInputs } from "./enhancedInputs-1HsyV5-L.js";
import { n as createAnalysisExecutionEvidence, r as init_analysisObservation } from "./analysisObservation-BbpG4mdL.js";
import { Br as analysisErrorWithCleanupDependencies, En as ArtifactFileCleanupFailure, Fn as bindArtifactFileCleanup, Gn as ArtifactReaderFailure, In as init_ArtifactFileOperation, Un as init_AnalysisCleanupLease, Vn as AnalysisCleanupLease, Wr as init_analysisErrorCleanup, Xn as init_ArtifactReader, _r as OwnedFileHandle, at as init_OwnedStagedOutput, dn as ArtifactResourceScope, fn as init_ArtifactResourceScope, it as OwnedStagedOutput, nr as init_OwnedRegularFile, t as init_resources, tr as RegularFileCleanupFailure, vr as init_OwnedFileHandle } from "./resources-C5FMDwcC.js";
import { i as init_StableFileHash, n as hashStableFile, o as stableFileHashCause } from "./StableFileHash-D7fL21vZ.js";
import { n as jsonValueByteLength, t as init_jsonValueByteLength } from "./jsonValueByteLength-BNI69N2O.js";
import { n as acquireOwnedLease, r as init_OwnedLease, t as OwnedLeaseCleanupFailure } from "./OwnedLease-CCJHanNV.js";
import { constants } from "node:fs";
import { basename, dirname, join } from "node:path";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { chmod, link, lstat, mkdir, mkdtemp, open, realpath, rename, rmdir, unlink } from "node:fs/promises";

//#region dist/domain/symbolAnalysis.js
var LEGACY_OBJC_CLASS_PREFIX, OBJC_PROTOCOL_SYMBOL, selectObjcClassCandidates, projectObjcClassCandidates, discoverObjcProtocols, categorizeSwiftTypes, swiftAliasesByAddress, uniqueByName, uniqueByAddressAndName, coalesceBoundClassAliases, classNameFromImport, classNameFromDisplayName, toObjcClassEntry, toJsonEntry;
function init_symbolAnalysis() {
	return (init_symbolAnalysis = __esmMin((() => {
		init_objcClassSymbol();
		init_swiftSymbolClassification();
		LEGACY_OBJC_CLASS_PREFIX = "l_OBJC_CLASS_";
		OBJC_PROTOCOL_SYMBOL = /^_{0,2}OBJC_PROTOCOL_\$_[^\s]+$/u;
		selectObjcClassCandidates = (names, pattern) => uniqueByAddressAndName(names.filter(({ name, objc_class_label }) => objcClassSymbol(name)?.metaclass === false || objc_class_label === "hopper_legacy_class_object" || name.startsWith(LEGACY_OBJC_CLASS_PREFIX) && name.length > LEGACY_OBJC_CLASS_PREFIX.length && !/^l_OBJC_CLASS_NAME_(?:\.\d+)?$/u.test(name)).filter(({ name }) => pattern.length === 0 || name.includes(pattern)));
		projectObjcClassCandidates = (candidates, bindingScan) => {
			const classes = coalesceBoundClassAliases(candidates, bindingScan.bindings);
			return {
				count: classes.length,
				classes: classes.map(toObjcClassEntry),
				identity_coverage: {
					status: bindingScan.coverage.status,
					reason: bindingScan.coverage.reason
				}
			};
		};
		discoverObjcProtocols = (names) => {
			const protocols = uniqueByName(names.filter(({ name }) => OBJC_PROTOCOL_SYMBOL.test(objcSymbolLeaf(name)) || classifySwiftSymbol(name)?.protocolIdentity === true));
			return {
				count: protocols.length,
				protocols: protocols.map(toJsonEntry)
			};
		};
		categorizeSwiftTypes = (procedures, filter = {}, symbols = []) => {
			const groups = Object.fromEntries([
				"classes",
				"structs",
				"enums",
				"protocols",
				"extensions",
				"other"
			].map((category) => [category, []]));
			const aliases = swiftAliasesByAddress(symbols);
			const pattern = filter.pattern;
			const seen = new Set();
			const unclassifiedNames = new Set();
			const unclassified = [];
			for (const entry of procedures) {
				if (seen.has(entry.name)) continue;
				const mangledNames = [...new Set([...isSwiftSymbolName(entry.name) ? [entry.name] : [], ...aliases.get(entry.address) ?? []])];
				if (mangledNames.length === 0) continue;
				if (pattern !== undefined && ![entry.name, ...mangledNames].some((name) => name.includes(pattern))) continue;
				const kinds = new Set();
				for (const name of mangledNames) {
					const decoded = classifySwiftSymbol(name)?.category;
					if (decoded !== undefined && decoded !== null) kinds.add(decoded);
				}
				const category = kinds.size === 1 ? [...kinds][0] ?? null : null;
				const item = {
					address: entry.address,
					name: entry.name,
					mangled_names: mangledNames
				};
				if (category === null && !unclassifiedNames.has(entry.name)) {
					unclassifiedNames.add(entry.name);
					unclassified.push({
						...item,
						reason: kinds.size > 1 ? "conflicting_categories" : "category_not_decoded"
					});
				}
				const bucket = category ?? "other";
				if (filter.category === undefined || filter.category === bucket) {
					seen.add(entry.name);
					groups[bucket]?.push(item);
				}
			}
			const categories = Object.fromEntries(Object.entries(groups).map(([category, items]) => [category, {
				count: items.length,
				items
			}]));
			return {
				total: Object.values(groups).reduce((sum, items) => sum + items.length, 0),
				categories,
				unclassified,
				limitations: ["Identification uses Swift mangled procedure names or same-address symbol aliases. Demangled names without retained Swift manglings cannot be identified. Counts deduplicate procedure names, not source declarations.", ...unclassified.length === 0 ? [] : ["Some Swift categories could not be established from the retained manglings. Unclassified observations remain inline regardless of the category filter."]]
			};
		};
		swiftAliasesByAddress = (symbols) => {
			const aliases = new Map();
			for (const { address, name } of symbols) {
				if (!isSwiftSymbolName(name)) continue;
				const existing = aliases.get(address);
				if (existing === undefined) aliases.set(address, [name]);
				else existing.push(name);
			}
			return aliases;
		};
		uniqueByName = (entries) => {
			const seen = new Set();
			return entries.filter(({ name }) => {
				if (seen.has(name)) return false;
				seen.add(name);
				return true;
			});
		};
		uniqueByAddressAndName = (entries) => {
			const seen = new Set();
			return entries.filter(({ address, name }) => {
				const key = JSON.stringify([address, name]);
				if (seen.has(key)) return false;
				seen.add(key);
				return true;
			});
		};
		coalesceBoundClassAliases = (candidates, bindings) => {
			const bindingsByAddress = new Map(bindings.map((binding) => [binding.requested_address, binding]));
			const bindingKey = (binding) => JSON.stringify([
				binding.symbol,
				binding.binding_source,
				binding.library_ordinal,
				binding.library,
				binding.weak,
				binding.addend
			]);
			const groupedBindings = new Map();
			for (const binding of bindings) {
				const key = bindingKey(binding);
				const existing = groupedBindings.get(key);
				if (existing === undefined) groupedBindings.set(key, [binding]);
				else existing.push(binding);
			}
			const groupedCandidates = new Map();
			const ordered = [];
			for (const candidate of candidates) {
				const binding = bindingsByAddress.get(candidate.address);
				if (binding === undefined) {
					ordered.push(candidate);
					continue;
				}
				const key = bindingKey(binding);
				let group = groupedCandidates.get(key);
				if (group === undefined) {
					group = [];
					groupedCandidates.set(key, group);
					ordered.push({ group: key });
				}
				group.push(candidate);
			}
			const output = [];
			for (const entry of ordered) {
				if ("group" in entry) {
					const key = entry.group;
					const facts = groupedBindings.get(key) ?? [];
					const group = groupedCandidates.get(key) ?? [];
					const identity = facts[0];
					const canonicalName = identity === undefined ? undefined : classNameFromImport(identity.symbol);
					const representative = (canonicalName === undefined ? undefined : group.find(({ name }) => classNameFromDisplayName(name) === canonicalName)) ?? group[0];
					if (representative === undefined || identity === undefined) continue;
					output.push({
						...representative,
						binding_identity: {
							symbol: identity.symbol,
							binding_source: identity.binding_source,
							library_ordinal: identity.library_ordinal,
							library: identity.library,
							weak: identity.weak,
							addend: identity.addend,
							slot_addresses: [...new Set(facts.map(({ requested_address }) => requested_address))]
						}
					});
				} else {
					const candidate = entry;
					output.push(candidate);
				}
			}
			return output;
		};
		classNameFromImport = (symbol) => {
			const facts = objcClassSymbol(symbol);
			return facts?.metaclass === false ? facts.symbol : undefined;
		};
		classNameFromDisplayName = classNameFromImport;
		toObjcClassEntry = (entry) => ({
			address: entry.address,
			name: entry.name,
			...entry.binding_identity === undefined ? {} : { binding_identity: {
				symbol: entry.binding_identity.symbol,
				binding_source: entry.binding_identity.binding_source,
				library_ordinal: entry.binding_identity.library_ordinal,
				library: entry.binding_identity.library,
				weak: entry.binding_identity.weak,
				addend: entry.binding_identity.addend,
				slot_addresses: [...entry.binding_identity.slot_addresses]
			} }
		});
		toJsonEntry = ({ address, name }) => ({
			address,
			name
		});
	})))();
}

//#endregion
//#region dist/application/EnhancedToolTypes.js
var failedWithPartialResult, invalidEnhancedInput;
function init_EnhancedToolTypes() {
	return (init_EnhancedToolTypes = __esmMin((() => {
		init_inputIssueProjection();
		init_result();
		init_enhancedInputs();
		failedWithPartialResult = (error, partialResult) => ({
			ok: false,
			error,
			partialResult
		});
		invalidEnhancedInput = (name, cause, input) => Promise.resolve(err(analysisInputErrorFromIssues(name, cause.issues, input, { cause })));
	})))();
}

//#endregion
//#region dist/application/native/NativeValueTraceBindings.js
var bindNativeValueTraceCalls;
function init_NativeValueTraceBindings() {
	return (init_NativeValueTraceBindings = __esmMin((() => {
		bindNativeValueTraceCalls = ({ budget, calls, procedureAddresses, completeParameterProcedures, unknowns }) => {
			const parametersByProcedure = new Map();
			const returnsByProcedure = new Map();
			for (const node of budget.nodes) {
				if (node.kind === "parameter") {
					const parameters = parametersByProcedure.get(node.procedure) ?? [];
					parameters.push(node);
					parametersByProcedure.set(node.procedure, parameters);
				} else if (node.operation?.opcode === "RETURN" && node.operation.inputs.length > 1) {
					const returns = returnsByProcedure.get(node.procedure) ?? [];
					returns.push(node);
					returnsByProcedure.set(node.procedure, returns);
				}
			}
			for (const binding of calls) {
				const callee = procedureAddresses.get(binding.callee);
				const parameters = callee === undefined ? [] : parametersByProcedure.get(callee) ?? [];
				const complete = callee !== undefined && completeParameterProcedures.has(callee);
				if (parameters.length === 0 && !complete) unknowns.push({
					procedure: binding.caller,
					address: null,
					reason: `Parameter bindings for ${binding.callee} are unavailable or omitted`
				});
				const boundInputs = new Set();
				for (const node of parameters) {
					const ordinal = node.parameter?.ordinal;
					if (ordinal === undefined || ordinal >= binding.argument_count) {
						unknowns.push({
							procedure: binding.caller,
							address: null,
							reason: `Argument ${ordinal ?? "unknown"} for ${binding.callee} was not recovered`
						});
						continue;
					}
					if (!budget.retainEdge({
						source: binding.call,
						target: node.id,
						input_index: ordinal + 1,
						kind: "argument-binding",
						status: "derived",
						evidence_id: binding.evidence_id
					}, binding.caller)) break;
					boundInputs.add(ordinal + 1);
				}
				if (complete && !budget.edgesExhausted()) {
					const inputIndices = [];
					for (let index = 1; index <= binding.argument_count; index++) if (!boundInputs.has(index)) inputIndices.push(index);
					if (inputIndices.length > 0) unknowns.push({
						procedure: binding.caller,
						address: binding.address,
						reason: "Recovered call inputs have no recovered parameter binding; formal and variadic signature details remain unknown.",
						call_inputs: {
							call_node_id: binding.call,
							destination: binding.callee,
							evidence_id: binding.evidence_id,
							input_indices: inputIndices
						}
					});
				}
				if (binding.output) for (const node of callee === undefined ? [] : returnsByProcedure.get(callee) ?? []) {
					if (!budget.retainEdge({
						source: node.id,
						target: binding.call,
						input_index: 1,
						kind: "return-binding",
						status: "derived",
						evidence_id: node.evidence_id
					}, binding.caller)) break;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/application/native/NativeValueTraceBudget.js
var NODE_PAYLOAD_BYTES, rowBudgetReasons, createValueTraceBudget;
function init_NativeValueTraceBudget() {
	return (init_NativeValueTraceBudget = __esmMin((() => {
		init_jsonSerialization();
		init_nativeValueTrace();
		NODE_PAYLOAD_BYTES = 8 * 1024 * 1024;
		rowBudgetReasons = {
			max_nodes: "Node budget reached",
			node_payload_bytes: "Node payload budget reached",
			max_edges: "Edge budget reached"
		};
		createValueTraceBudget = (limits, unknowns) => {
			const nodes = [];
			const edges = [];
			const causes = new Set();
			let bytes = 0;
			let nodesExhausted = false;
			let edgesExhausted = false;
			const narrow = (reason, unknown) => {
				causes.add(reason);
				unknowns.push(unknown);
				return false;
			};
			const reject = (procedure, reason) => narrow(reason, {
				procedure,
				address: null,
				reason: rowBudgetReasons[reason]
			});
			return {
				nodes,
				edges,
				narrow,
				retainNode(value) {
					if (nodesExhausted) return false;
					if (nodes.length >= limits.max_nodes) {
						nodesExhausted = true;
						return reject(value.procedure, "max_nodes");
					}
					let size = 0;
					for (const part of jsonParts(value)) {
						size += Buffer.byteLength(part);
						if (size > NODE_PAYLOAD_BYTES - bytes) {
							nodesExhausted = true;
							return reject(value.procedure, "node_payload_bytes");
						}
					}
					bytes += size;
					nodes.push(value);
					return true;
				},
				retainEdge(value, procedure) {
					if (edgesExhausted) return false;
					if (edges.length >= limits.max_edges) {
						edgesExhausted = true;
						return reject(procedure, "max_edges");
					}
					edges.push(value);
					return true;
				},
				/** A rejected edge means no later call edge or expansion can be retained. */
				edgesExhausted: () => edgesExhausted,
				/** Traversal stops after the procedure in which a row budget rejected work. */
				exhausted: () => nodesExhausted || edgesExhausted,
				traversal: () => {
					const reasons = nativeValueTraceTruncationReasonSchema.options.filter((reason) => causes.has(reason));
					return reasons.length === 0 ? { status: "complete" } : {
						status: "truncated",
						reasons
					};
				}
			};
		};
	})))();
}

//#endregion
//#region dist/application/native/NativeValueTrace.js
var CLEANUP_STOPPED_VALUE_TRACE, unexaminedThunkTarget, thunkTargetUnknown, UNRECORDED_NATIVE_VALUE_FLOW, traceNativeValues;
function init_NativeValueTrace() {
	return (init_NativeValueTrace = __esmMin((() => {
		init_functionDossier();
		init_nativeInstruction();
		init_nativeValueTrace();
		init_analysisObservation();
		init_analysisErrorCore();
		init_result();
		init_CallRelationshipTraversal();
		init_EnhancedToolTypes();
		init_SourceLimitations();
		init_NativeValueTraceBindings();
		init_NativeValueTraceBudget();
		CLEANUP_STOPPED_VALUE_TRACE = "Trace stopped because the provider did not confirm cleanup of resources it owns";
		unexaminedThunkTarget = (dossier, represented) => {
			const classification = dossier.procedure.classification;
			if (classification === null || !classification.thunk || classification.thunk_target === null || represented(classification.thunk_target)) return null;
			return classification.thunk_target;
		};
		thunkTargetUnknown = (procedure, target) => ({
			procedure,
			address: null,
			related_procedure: target,
			reason: `Thunk target ${target} is not represented in this thunk's value-flow model and was not traced`
		});
		UNRECORDED_NATIVE_VALUE_FLOW = "Native def-use was not recorded for this procedure.";
		traceNativeValues = async (analysis, parameters, signal) => {
			const input = nativeValueTraceInputSchema.parse(parameters);
			const procedures = [];
			const unknowns = [];
			const sourceLimitations = [];
			const callBindings = [];
			const procedureAddresses = new Map();
			const completeParameterProcedures = new Set();
			const pending = [{
				procedure: input.procedure,
				depth: 0
			}];
			const attempted = new Set();
			const visited = new Set();
			const thunkTargets = [];
			const unexpanded = [];
			const budget = createValueTraceBudget(input, unknowns);
			const { nodes, edges } = budget;
			let targetSha256;
			let decompilations = 0;
			let callSites = 0;
			let stopped;
			/** Record a failed read after the validated seed; true when it ends the trace. */
			const endsTrace = (error, procedure, address) => {
				if (!stopsTraversal(error)) {
					unknowns.push({
						procedure,
						address,
						reason: error.message
					});
					return false;
				}
				if (error.cleanupIncomplete) budget.narrow("cleanup_incomplete", {
					procedure,
					address,
					reason: CLEANUP_STOPPED_VALUE_TRACE
				});
				return true;
			};
			while (pending.length > 0) {
				if (signal?.aborted) return err(cancelledBy("trace_native_values", signal));
				const next = pending.shift();
				if (next === undefined || attempted.has(next.procedure) || visited.has(next.procedure)) continue;
				if (decompilations >= input.max_functions) {
					budget.narrow("max_functions", {
						procedure: next.procedure,
						address: null,
						reason: "decompilation budget reached"
					});
					pending.unshift(next);
					break;
				}
				attempted.add(next.procedure);
				const execution = await analysis.execute("analyze_function", { procedure: next.procedure }, {
					...signal === undefined ? {} : { signal },
					...next.depth > 0 ? { selectorOrigin: "provider" } : {},
					retainEvidence: true
				});
				decompilations++;
				if (!execution.ok) {
					if (next.depth === 0) return err(execution.error);
					if (endsTrace(execution.error, next.procedure, null)) {
						stopped = execution.error;
						break;
					}
					continue;
				}
				const partialEvidence = () => createAnalysisExecutionEvidence("analyze_function", { procedure: next.procedure }, execution.value, "observed");
				const parsed = functionDossierSchema.safeParse(execution.value.result);
				if (!parsed.success || execution.value.subject == null) return err(new AnalysisOutputError("trace_native_values", "Function dossier lacks validated facts or artifact identity", parsed.success ? undefined : { cause: parsed.error }).retainPartialObservation(partialEvidence()));
				const dossier = parsed.data;
				const address = dossier.procedure.address;
				targetSha256 ??= execution.value.subject.sha256;
				if (execution.value.subject.sha256 !== targetSha256) return err(new AnalysisOutputError("trace_native_values", "Cross-function target digest mismatch").retainPartialObservation(partialEvidence()));
				const evidenceId = execution.value.evidenceId;
				if (evidenceId === undefined) return err(new AnalysisCapabilityUnavailableError("rea", "trace_native_values", "The function observation has no Evidence retention owner.").retainPartialObservation(partialEvidence()));
				procedureAddresses.set(next.procedure, address);
				procedureAddresses.set(address, address);
				if (visited.has(address)) continue;
				visited.add(next.procedure);
				visited.add(address);
				procedures.push({
					address,
					depth: next.depth,
					evidence_id: evidenceId,
					provider: execution.value.provider.id,
					analysis_profile_digest: execution.value.analysisProfile?.digest ?? null
				});
				const flow = dossier.native_value_flow;
				if (flow !== null) sourceLimitations.push(...flow.limitations.map((limitation) => ({
					provider: execution.value.provider,
					operation: "analyze_function",
					limitation
				})));
				if (flow === null || !flow.available) {
					unknowns.push({
						procedure: address,
						address: null,
						reason: flow?.reason ?? UNRECORDED_NATIVE_VALUE_FLOW
					});
					const thunkTarget = unexaminedThunkTarget(dossier, () => false);
					if (thunkTarget !== null) thunkTargets.push({
						procedure: address,
						target: thunkTarget
					});
					continue;
				}
				if (flow.truncated) budget.narrow("provider_pcode_truncated", {
					procedure: address,
					address: null,
					reason: "Provider p-code was truncated"
				});
				const ids = new Set();
				const retainedCalls = new Set();
				const operationIds = new Set(flow.operations.map(({ id }) => id));
				const parameterIds = new Map();
				const qualified = (id) => `${address}/${id}`;
				for (const operation of flow.operations) {
					if (operation.block_membership === "detached" || operation.block_membership === "unavailable" && operation.is_dead) continue;
					const node = {
						id: qualified(operation.id),
						procedure: address,
						evidence_id: evidenceId,
						operation,
						kind: "operation",
						parameter: null
					};
					if (!budget.retainNode(node)) break;
					ids.add(operation.id);
				}
				for (const parameter of flow.parameters) {
					const parameterId = `parameter:${parameter.ordinal}`;
					let localId = parameterId;
					for (let suffix = 1; operationIds.has(localId); suffix++) localId = `${parameterId}#${suffix}`;
					const id = qualified(localId);
					if (!budget.retainNode({
						id,
						procedure: address,
						evidence_id: evidenceId,
						kind: "parameter",
						operation: null,
						parameter
					})) break;
					parameterIds.set(parameter.ordinal, id);
				}
				if (!flow.truncated && parameterIds.size === flow.parameters.length && !budget.exhausted()) completeParameterProcedures.add(address);
				for (const use of flow.parameter_uses) {
					const source = parameterIds.get(use.ordinal);
					if (!ids.has(use.use) || source === undefined) continue;
					if (!budget.retainEdge({
						source,
						target: qualified(use.use),
						input_index: use.input_index,
						kind: "parameter-use",
						status: "derived",
						evidence_id: evidenceId
					}, address)) break;
				}
				for (const edge of flow.def_use) {
					if (!ids.has(edge.definition) || !ids.has(edge.use)) continue;
					if (!budget.retainEdge({
						source: qualified(edge.definition),
						target: qualified(edge.use),
						input_index: edge.input_index,
						kind: "def-use",
						status: "derived",
						evidence_id: evidenceId
					}, address)) break;
				}
				for (const operation of flow.operations) {
					if (!ids.has(operation.id) || !["CALL", "CALLIND"].includes(operation.opcode)) continue;
					if (budget.edgesExhausted()) break;
					if (callSites >= input.max_call_sites) {
						budget.narrow("max_call_sites", {
							procedure: address,
							address: operation.address,
							reason: "Call-site resolution budget reached"
						});
						break;
					}
					callSites++;
					const resolved = await analysis.execute("resolve_native_call_targets", { address: operation.address }, signal === undefined ? {} : { signal });
					if (!resolved.ok) {
						if (endsTrace(resolved.error, address, operation.address)) {
							stopped = resolved.error;
							break;
						}
						continue;
					}
					const targets = nativeCallTargetsSchema.safeParse(resolved.value.result);
					if (!targets.success) return err(new AnalysisOutputError("resolve_native_call_targets", "Invalid static call resolution", { cause: targets.error }).retainPartialObservation(createAnalysisExecutionEvidence("resolve_native_call_targets", { address: operation.address }, resolved.value, "observed")));
					sourceLimitations.push(...targets.data.limitations.map((limitation) => ({
						provider: resolved.value.provider,
						operation: "resolve_native_call_targets",
						limitation
					})));
					if (targets.data.targets.length === 0) unknowns.push({
						procedure: address,
						address: operation.address,
						reason: `Call target ${targets.data.status}`
					});
					const bindingDestinations = new Set();
					for (const target of targets.data.targets) {
						const destination = target.procedure ?? target.address;
						if (!budget.retainEdge({
							source: qualified(operation.id),
							target: destination,
							input_index: null,
							kind: "call",
							status: target.status,
							evidence_id: evidenceId
						}, address)) break;
						retainedCalls.add(destination);
						if (target.status !== "candidate" && !bindingDestinations.has(destination)) {
							bindingDestinations.add(destination);
							callBindings.push({
								caller: address,
								callee: destination,
								call: qualified(operation.id),
								address: operation.address,
								argument_count: Math.max(0, operation.inputs.length - 1),
								output: operation.output !== null,
								evidence_id: evidenceId
							});
						}
						if (next.depth < input.max_depth && target.status !== "candidate") pending.push({
							procedure: destination,
							depth: next.depth + 1
						});
						else unexpanded.push({
							caller: address,
							address: operation.address,
							destination,
							reason: target.status === "candidate" ? "ambiguous_call_candidates" : "max_depth"
						});
					}
				}
				const thunkTarget = unexaminedThunkTarget(dossier, (target) => retainedCalls.has(target) || flow.operations.some((operation) => ids.has(operation.id) && operation.address === target));
				if (thunkTarget !== null) thunkTargets.push({
					procedure: address,
					target: thunkTarget
				});
				if (stopped !== undefined || budget.exhausted()) break;
			}
			if (stopped !== undefined && !stopped.cleanupIncomplete) return err(stopped);
			if (targetSha256 === undefined) return err(new AnalysisOutputError("trace_native_values", "No seed function could be analyzed"));
			const queued = new Set(pending.map(({ procedure }) => procedure));
			for (const skipped of unexpanded) {
				const { destination } = skipped;
				if (visited.has(destination) || attempted.has(destination) || queued.has(destination)) continue;
				budget.narrow(skipped.reason, {
					procedure: skipped.caller,
					address: skipped.address,
					reason: skipped.reason === "ambiguous_call_candidates" ? "Ambiguous call candidates were not traversed" : "Call depth budget reached"
				});
			}
			for (const { procedure, target } of thunkTargets) {
				if (visited.has(target) || attempted.has(target) || queued.has(target)) continue;
				unknowns.push(thunkTargetUnknown(procedure, target));
			}
			bindNativeValueTraceCalls({
				budget,
				calls: callBindings,
				procedureAddresses,
				completeParameterProcedures,
				unknowns
			});
			const page = nodes.slice(input.offset, input.offset + input.limit);
			const pageIds = new Set(page.map(({ id }) => id));
			const pageTruncated = page.length !== nodes.length;
			const traversal = budget.traversal();
			const result = nativeValueTraceSchema.parse({
				seed: input.procedure,
				target_sha256: targetSha256,
				nodes: page,
				edges: edges.filter(({ source }) => pageIds.has(source)),
				procedures,
				unknowns,
				total_nodes: nodes.length,
				total_edges: edges.length,
				decompilations,
				next_offset: input.offset + page.length < nodes.length ? input.offset + page.length : null,
				page_truncated: pageTruncated,
				traversal,
				truncated: pageTruncated || traversal.status === "truncated",
				limitations: [
					"Static decompiler def-use graphs cover recovered block members; when membership is unavailable they exclude operations marked dead. Logical CALL argument positions bind to recovered HighParam ordinals and RETURN values bind to recovered CALL outputs; these are decompiler-derived dependencies, not original source or runtime observations. Missing parameters, variadic arguments and alias dependencies remain unknown.",
					"LOAD and STORE are memory operations; object fields, persistent state and RNG semantics are not inferred from names or pseudocode.",
					"A procedure the provider classifies as a thunk keeps the provider's model for that stub, and the classification alone does not traverse its target: a target reached through a retained call edge is traversed like any other destination, while a target the model neither contains nor calls, and no other path reaches, is reported in unknowns with its identity in related_procedure. Thunk targets are not loaded or executed by this trace.",
					"Traversal caps depth, decompilations, call-site resolutions, nodes, edges and node payloads (8388608 bytes, 8 MiB); traversal.reasons names each cap or policy this trace reached. This release has no runtime override for the 8388608-byte node-payload allowance. Complete serialized output is bounded to 33554432 bytes (32 MiB) and that output allowance has no runtime override. Pagination reruns analysis and returns edges whose source is on the node page; endpoints outside the page retain stable identities.",
					...renderSourceLimitations(sourceLimitations)
				]
			});
			const oversized = Buffer.byteLength(JSON.stringify(result)) > 32 * 1024 * 1024;
			if (stopped !== undefined) return oversized ? err(stopped) : failedWithPartialResult(stopped, result);
			if (oversized) return err(new AnalysisOutputError("trace_native_values", "Graph output exceeds 33554432 bytes (32 MiB). This release has no runtime override. Lower max_nodes, max_edges, or the page limit."));
			if (signal?.aborted) return err(cancelledBy("trace_native_values", signal));
			return ok(result);
		};
	})))();
}

//#endregion
//#region dist/application/decompileDirectory/exportResources.js
var ExportPublishedCleanupFailure, ExportResources, sameIdentity, isMissing;
function init_exportResources() {
	return (init_exportResources = __esmMin((() => {
		init_resources();
		init_OwnedRegularFile();
		init_decompileDirectory();
		init_analysisErrorCore();
		init_analysisErrorCleanup();
		init_result();
		init_OwnedFileHandle();
		init_OwnedStagedOutput();
		init_StableFileHash();
		ExportPublishedCleanupFailure = class extends ArtifactReaderFailure {
			publishedPath;
			constructor(publishedPath, failure) {
				super(failure.reason, failure.message, {
					cause: failure,
					...failure.primaryFacts(),
					cancellation: failure.cancellation,
					cleanup: failure.cleanup,
					cleanupLeases: failure.cleanupLeases,
					partialObservation: failure.partialObservation
				}, failure.details);
				this.publishedPath = publishedPath;
			}
		};
		ExportResources = class {
			root;
			identity;
			lease;
			scope;
			#files = new ArtifactResourceScope();
			#cleanup;
			#removeRoot = false;
			#journalIdentity;
			#rootRemoved = false;
			#retained = false;
			#functionsRemoved = false;
			#journalRemoved = false;
			#leaseReleased = false;
			#functionsIdentity;
			constructor(root, identity, lease, scope) {
				this.root = root;
				this.identity = identity;
				this.lease = lease;
				this.scope = scope;
				const resources = this;
				this.#cleanup = AnalysisCleanupLease.forCloseOwner({
					close: async () => {
						await this.#files.retryCleanup();
						if (this.#removeRoot && !this.#rootRemoved) await this.#removeCreatedRoot();
						await this.lease.release();
						this.#leaseReleased = true;
					},
					get cleanupResources() {
						return resources.cleanupResources;
					}
				}, root);
			}
			get cleanupResources() {
				return [
					...this.#files.cleanupResources,
					...this.#removeRoot && !this.#rootRemoved ? [this.root] : [],
					...this.#leaseReleased ? [] : [this.lease.socketPath ?? this.root]
				];
			}
			ownFunctionsDirectory(identity) {
				this.#functionsIdentity = identity;
			}
			ownFile(handle, path, journal = false) {
				const file = new OwnedFileHandle(handle);
				const owner = {
					kind: "lease",
					resource: path,
					lease: { release: async () => {
						if (journal && handle.fd >= 0) this.#journalIdentity = await handle.stat({ bigint: true }).catch(() => undefined);
						await file.close();
					} }
				};
				this.#files.retain(owner);
				return async () => (await this.#files.release(owner)).kind === "released";
			}
			/** Check existing output with bounded memory and the shared file identity owner. */
			async hashFile(path, signal) {
				let cleanupLease;
				try {
					const hash = await hashStableFile(path, {
						...signal === undefined ? {} : { signal },
						retainFailedClose: (handle) => {
							cleanupLease = new AnalysisCleanupLease(() => handle.close(), [path]);
							this.#files.retain({
								kind: "lease",
								resource: path,
								lease: cleanupLease
							});
						}
					});
					return hash.sha256;
				} catch (cause) {
					if (cause instanceof RegularFileCleanupFailure && cleanupLease !== undefined) throw new ArtifactFileCleanupFailure(cause, cleanupLease);
					throw stableFileHashCause(cause);
				}
			}
			/** Publish only a verified staged file; failed close or removal stays owned. */
			async publish(bytes, destination, mode) {
				const directory = await mkdtemp(join(this.root, ".decompile-stage-"));
				const staging = await OwnedStagedOutput.create(directory);
				const owner = {
					kind: "staged-output",
					resource: directory,
					output: staging
				};
				this.#files.retain(owner);
				let outcome = { kind: "completed" };
				try {
					const path = join(directory, "content");
					const handle = await open(path, "wx", 384);
					staging.setFile(new OwnedFileHandle(handle));
					await handle.writeFile(bytes);
					await handle.sync();
					await staging.closeFile();
					await staging.assertReadyForPublication(path);
					if (mode === "link") await link(path, destination);
					else {
						await rename(path, destination);
						staging.recordPublishedRename();
					}
				} catch (cause) {
					outcome = {
						kind: "failed",
						cause
					};
				}
				const released = await this.#files.release(owner);
				if (released.kind === "failed") {
					const failure = this.#files.cleanupFailure(outcome, [released]);
					throw outcome.kind === "completed" ? new ExportPublishedCleanupFailure(destination, failure) : failure;
				}
				if (outcome.kind === "failed") throw outcome.cause;
			}
			/** Keep the lease through all initialization cleanup, including any retry. */
			async failedInitialization(error) {
				this.#removeRoot = true;
				const closed = await this.close();
				return closed.ok ? err(error) : err(analysisErrorWithCleanupDependencies(error, closed.error, "decompile_all"));
			}
			async close() {
				try {
					await this.#cleanup.release();
					return ok(undefined);
				} catch (cause) {
					const error = new AnalysisOutputError("decompile_all", "decompile export cleanup failed", {
						cause,
						cleanup: {
							reason: "Owned export resources could not be released.",
							resources: [this.root]
						}
					});
					error.bindCleanupResourceOwner(this.#cleanup);
					this.#cleanup.bindCleanupError(error);
					if (!this.#retained && this.scope !== undefined) {
						this.#retained = true;
						const cleanup = this.#cleanup;
						this.scope.retain({
							close: () => cleanup.release(),
							get cleanupResources() {
								return cleanup.cleanupResources;
							}
						}, this.root);
					}
					return err(error);
				}
			}
			async #removeCreatedRoot() {
				const root = await lstat(this.root, { bigint: true });
				if (!sameIdentity(root, this.identity) || !root.isDirectory() || root.isSymbolicLink()) throw new Error("Export directory identity changed during cleanup");
				if (!this.#journalRemoved) {
					const journal = join(this.root, DECOMPILE_DIRECTORY_JOURNAL_NAME);
					const stat = await lstat(journal, { bigint: true }).catch((cause) => {
						if (isMissing(cause)) return undefined;
						throw cause;
					});
					if (stat !== undefined) {
						if (this.#journalIdentity === undefined || !sameIdentity(stat, this.#journalIdentity)) throw new Error("Cannot establish ownership of the journal during cleanup");
						await unlink(journal);
					}
					this.#journalRemoved = true;
				}
				if (!this.#functionsRemoved) {
					const path = join(this.root, "functions");
					const stat = await lstat(path, { bigint: true }).catch((cause) => {
						if (isMissing(cause) && this.#functionsIdentity === undefined) return undefined;
						throw cause;
					});
					if (stat !== undefined) {
						if (this.#functionsIdentity === undefined || !sameIdentity(stat, this.#functionsIdentity)) throw new Error("Functions directory identity changed during cleanup");
						await rmdir(path);
					}
					this.#functionsRemoved = true;
				}
				await rmdir(this.root);
				this.#rootRemoved = true;
			}
		};
		sameIdentity = (left, right) => left.dev === right.dev && left.ino === right.ino;
		isMissing = (cause) => cause instanceof Error && "code" in cause && cause.code === "ENOENT";
	})))();
}

//#endregion
//#region dist/application/decompileDirectory/inputError.js
var decompileInputError;
function init_inputError() {
	return (init_inputError = __esmMin((() => {
		init_analysisErrorCore();
		decompileInputError = (path, message) => new AnalysisInputError("decompile_all", { userMessage: message }, [{
			path: [path],
			reason: "invalid_value",
			message
		}]);
	})))();
}

//#endregion
//#region dist/application/decompileDirectory/selection.js
var validateDecompileBounds, selectProcedures, parseBound, matches, matchesName, matchesNamespace, matchesAddress, compareProcedures, compareProcedureAddresses;
function init_selection() {
	return (init_selection = __esmMin((() => {
		init_addressCoordinate();
		init_nativeAddress();
		init_result();
		init_unicodeCodePointOrder();
		init_inputError();
		validateDecompileBounds = (input) => {
			const start = parseBound(input.address_start, "address_start");
			if (!start.ok) return start;
			const end = parseBound(input.address_end, "address_end");
			if (!end.ok) return end;
			if (start.value !== null && end.value !== null && start.value.space !== end.value.space) return err(decompileInputError("address_end", "Address bounds must use the same address space."));
			if (start.value !== null && end.value !== null && end.value.offset < start.value.offset) return err(decompileInputError("address_end", "Address end is before address start."));
			return ok({
				start: start.value,
				end: end.value
			});
		};
		selectProcedures = (rows, input, bounds) => {
			const seen = new Set();
			const selected = new Map();
			let collapsedDuplicates = false;
			for (const row of rows) {
				if (seen.has(row.address)) collapsedDuplicates = true;
				seen.add(row.address);
				if (!selected.has(row.address) && matches(row, input, bounds)) selected.set(row.address, row);
			}
			const procedures = [...selected.values()].sort(compareProcedures);
			return {
				procedures,
				excluded: seen.size - procedures.length,
				collapsedDuplicates
			};
		};
		parseBound = (value, path) => {
			if (value === undefined) return ok(null);
			const coordinate = nativeAddressCoordinateInputSchema.safeParse(value);
			return !coordinate.success ? err(decompileInputError(path, "Address bounds must be 0xoffset or space:0xoffset.")) : ok(coordinate.data);
		};
		matches = (procedure, input, bounds) => matchesName(procedure.name, input.name) && matchesNamespace(procedure.name, input.namespace) && matchesAddress(procedure.address, bounds);
		matchesName = (name, filter) => filter === undefined || name !== null && name.includes(filter);
		matchesNamespace = (name, filter) => filter === undefined || name !== null && name.startsWith(filter);
		matchesAddress = (address, bounds) => {
			if (bounds.start === null && bounds.end === null) return true;
			const coordinate = addressCoordinate(address);
			if (coordinate === null) return false;
			if (bounds.start !== null && (coordinate.space !== bounds.start.space || coordinate.offset < bounds.start.offset)) return false;
			return bounds.end === null || coordinate.space === bounds.end.space && coordinate.offset <= bounds.end.offset;
		};
		compareProcedures = (left, right) => {
			const byAddress = compareProcedureAddresses(left.address, right.address);
			if (byAddress !== 0) return byAddress;
			const byName = compareUnicodeCodePoints(left.name ?? "", right.name ?? "");
			return byName === 0 ? compareUnicodeCodePoints(left.address, right.address) : byName;
		};
		compareProcedureAddresses = (left, right) => {
			const a = addressCoordinate(left);
			const b = addressCoordinate(right);
			if (a === null || b === null) {
				if (a === null && b === null) return compareUnicodeCodePoints(left, right);
				return a === null ? 1 : -1;
			}
			const space = compareUnicodeCodePoints(a.space ?? "", b.space ?? "");
			if (space !== 0) return space;
			if (a.offset < b.offset) return -1;
			if (a.offset > b.offset) return 1;
			return 0;
		};
	})))();
}

//#endregion
//#region dist/application/decompileDirectory/exportTree.js
var classifyOutputPath, DecompileExport, openResumedJournal, truncateJournal, commitFunctionFile, missingOrRejected, createPrivateDirectory, prepareFunctionsDirectory, seedJournal, NO_FOLLOW, JOURNAL_FLAGS, openJournal, readJournalBytes, readJournal, parseJournal, unknownIdentity, identityMismatches, journalIdentityMismatch, incompatibleJournal, parseJson, portablePathKey, reservePath, allocateFunctionPath, sanitizeAddress, DECOMPILE_EXPORT_LEASE_DIRECTORY, acquireExportLease, exportLeaseFailure, exportLeaseMessage, hasFileIdentity, writeOwnedIndex, exportOutputFailure, isFileHandle, isDirectoryStat, isSymlinkStat, isStat, nodeCode;
function init_exportTree() {
	return (init_exportTree = __esmMin((() => {
		init_strictUtf8();
		init_resources();
		init_decompileDirectory();
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_localPath();
		init_result();
		init_OwnedLease();
		init_exportResources();
		init_inputError();
		init_selection();
		init_sha256Hex();
		classifyOutputPath = async (requested, resume) => {
			const stripped = requested.replace(/\/+$/u, "");
			const name = basename(stripped);
			if (stripped.length === 0 || name === "" || name === "." || name === "..") return err(decompileInputError("output_directory", "The output directory name is invalid."));
			const listed = await lstat(stripped).then((stat) => stat, (cause) => cause);
			if (!isDirectoryStat(listed)) {
				if (resume && nodeCode(listed) === "ENOENT") return err(decompileInputError("output_directory", "Resume requires an existing export directory. Omit resume to start a new export."));
				return missingOrRejected(stripped, listed);
			}
			if (!resume) return err(decompileInputError("output_directory", "Output directory already exists. Pass resume to continue an export that matches this target and analysis profile."));
			const root = await realpath(stripped).catch((cause) => cause);
			return typeof root === "string" ? ok({
				mode: "resume",
				root
			}) : err(decompileInputError("output_directory", "The output directory could not be resolved."));
		};
		DecompileExport = class DecompileExport {
			root;
			journal;
			records;
			written;
			paths;
			identity;
			resources;
			constructor(root, journal, records, written, paths, identity, resources) {
				this.root = root;
				this.journal = journal;
				this.records = records;
				this.written = written;
				this.paths = paths;
				this.identity = identity;
				this.resources = resources;
			}
			static open(input) {
				return input.placement.mode === "create" ? DecompileExport.#create(input.placement.root, input.identity, input.resourceScope) : DecompileExport.#resume(input.placement.root, input.identity, input.resourceScope);
			}
			/** The latest journal outcome for an address. */
			record(address) {
				return this.records.get(address);
			}
			/**
			* The last successful write for an address. A later failure, such as a
			* transient read error, does not erase the checksum that verifies the file.
			*/
			lastWritten(address) {
				return this.written.get(address);
			}
			/**
			* Retained non-external records whose body ranges are unknown, with their
			* reason when every such record shares one. The index lists every retained
			* record, so its summary must come from these records rather than from the
			* functions the latest call attempted. External records have no file for a
			* body caveat to qualify.
			*/
			unknownBodies() {
				let count = 0;
				let sharedReason;
				for (const record of this.records.values()) {
					if (record.status === "external" || record.body.available) continue;
					sharedReason = count === 0 || sharedReason === record.body.reason ? record.body.reason : undefined;
					count += 1;
				}
				return {
					count,
					sharedReason
				};
			}
			/**
			* Stable relative path for an address. The first path the journal gave this
			* address wins, even when a later failure record names no path.
			*/
			pathFor(address) {
				const owned = this.paths.byAddress.get(address);
				if (owned !== undefined) return owned;
				const relativePath = allocateFunctionPath(address, this.paths.byPortablePath);
				reservePath(this.paths, relativePath, address);
				return relativePath;
			}
			async append(record) {
				const line = decompileJournalLineSchema.safeParse({
					kind: "function",
					...record
				});
				if (!line.success || line.data.kind !== "function") return err(new AnalysisOutputError("decompile_all", "decompile journal record is invalid"));
				const written = await this.journal.writeFile(`${JSON.stringify(line.data)}\n`).then(() => this.journal.sync()).then(() => true, () => false);
				if (!written) return err(new AnalysisOutputError("decompile_all", "decompile journal could not be updated"));
				const { kind: _kind, ...committed } = line.data;
				this.records.set(committed.address, committed);
				if (committed.status === "written") this.written.set(committed.address, committed);
				if (committed.relative_path !== undefined) reservePath(this.paths, committed.relative_path, committed.address);
				return ok(undefined);
			}
			async writeIndex(input) {
				const index = decompileDirectoryIndexSchema.safeParse({
					version: 1,
					target_sha256: this.identity.targetSha256,
					provider: this.identity.provider,
					analysis_profile_digest: this.identity.analysisProfileDigest,
					layout: this.identity.layout,
					layout_status: input.layoutStatus,
					latest_run: {
						resume: input.latestRun.resume,
						selected: input.latestRun.selected,
						excluded: input.latestRun.excluded,
						selection: input.latestRun.selection,
						inventory_limitations: [...input.latestRun.inventoryLimitations]
					},
					limitations: [...input.limitations],
					functions: [...this.records.values()].sort((left, right) => compareProcedureAddresses(left.address, right.address))
				});
				if (!index.success) return err(new AnalysisOutputError("decompile_all", "decompile index could not be built"));
				return writeOwnedIndex(this.root, `${JSON.stringify(index.data, null, 2)}\n`, this.resources);
			}
			commitFunctionFile(relativePath, bytes) {
				return commitFunctionFile(this.root, relativePath, bytes, this.resources);
			}
			hashFile(relativePath, signal) {
				return this.resources.hashFile(join(this.root, relativePath), signal);
			}
			/** Failed cleanup retains the same files and lease for a later session retry. */
			close() {
				return this.resources.close();
			}
			static async #create(root, identity, scope) {
				const created = await createPrivateDirectory(root);
				if (!created.ok) return created;
				const lease = await acquireExportLease(root, scope);
				if (!lease.ok) {
					lease.error.retainDiagnostics({ created_output_directory: root });
					return lease;
				}
				const resources = new ExportResources(root, lease.value.identity, lease.value.lease, scope);
				const functions = await prepareFunctionsDirectory(root, resources);
				if (!functions.ok) return resources.failedInitialization(functions.error);
				const opened = await seedJournal(root, identity, resources);
				if (!opened.ok) return resources.failedInitialization(opened.error);
				return ok(new DecompileExport(root, opened.value, new Map(), new Map(), {
					byPortablePath: new Map(),
					byAddress: new Map()
				}, identity, resources));
			}
			static async #resume(root, identity, scope) {
				const lease = await acquireExportLease(root, scope);
				if (!lease.ok) return lease;
				const resources = new ExportResources(root, lease.value.identity, lease.value.lease, scope);
				const opened = await openResumedJournal(root, identity, resources);
				if (!opened.ok) {
					const closed = await resources.close();
					return closed.ok ? opened : err(analysisErrorWithCleanupDependencies(opened.error, closed.error, "decompile_all"));
				}
				return ok(new DecompileExport(root, opened.value.handle, opened.value.journal.records, opened.value.journal.written, opened.value.journal.paths, identity, resources));
			}
		};
		openResumedJournal = async (root, identity, resources) => {
			const opened = await readJournal(root, identity, resources);
			if (!opened.ok) return opened;
			const functions = await prepareFunctionsDirectory(root, resources);
			if (!functions.ok) return functions;
			const repaired = opened.value.committedBytes === opened.value.journalBytes || await truncateJournal(root, opened.value.committedBytes, resources);
			if (!repaired) {
				return err(decompileInputError("output_directory", "The decompile journal could not be repaired after an interrupted write."));
			}
			const handle = await openJournal(root, "a");
			if (!handle.ok) return handle;
			resources.ownFile(handle.value, join(root, DECOMPILE_DIRECTORY_JOURNAL_NAME), true);
			return ok({
				handle: handle.value,
				journal: opened.value
			});
		};
		truncateJournal = async (root, bytes, resources) => {
			const path = join(root, DECOMPILE_DIRECTORY_JOURNAL_NAME);
			const handle = await open(path, constants.O_WRONLY | NO_FOLLOW).catch((cause) => cause);
			if (!isFileHandle(handle)) return false;
			const close = resources.ownFile(handle, path);
			const truncated = await handle.truncate(bytes).then(() => true, () => false);
			return await close() && truncated;
		};
		commitFunctionFile = async (root, relativePath, bytes, resources) => {
			if (!isDecompileFunctionRelativePath(relativePath)) return { status: "io" };
			const finalPath = join(root, relativePath);
			if (!isPathWithinRoot(root, finalPath)) return { status: "io" };
			const digest = sha256Hex(bytes);
			const linked = await resources.publish(bytes, finalPath, "link").then(() => true, (cause) => cause);
			if (linked === true) return {
				status: "written",
				sha256: digest
			};
			if (linked instanceof ArtifactReaderFailure && linked.cleanup !== undefined) return {
				status: "error",
				error: exportOutputFailure("decompile function publication cleanup failed", linked)
			};
			if (nodeCode(linked) !== "EEXIST") return { status: "io" };
			const existing = await resources.hashFile(finalPath).catch((cause) => cause);
			if (existing instanceof ArtifactReaderFailure && existing.cleanup !== undefined) return {
				status: "error",
				error: exportOutputFailure("decompile file verification cleanup failed", existing)
			};
			if (typeof existing !== "string") return { status: "io" };
			return existing === digest ? {
				status: "matched",
				sha256: digest
			} : { status: "conflict" };
		};
		missingOrRejected = async (stripped, listed) => {
			if (isSymlinkStat(listed)) return err(decompileInputError("output_directory", "The output directory must be a real directory, not a symlink."));
			if (isStat(listed)) return err(decompileInputError("output_directory", "The output path exists and is not a directory."));
			if (nodeCode(listed) !== "ENOENT") return err(decompileInputError("output_directory", "The output directory could not be inspected."));
			const parent = await realpath(dirname(stripped)).catch((cause) => cause);
			if (typeof parent !== "string") return err(decompileInputError("output_directory", "The output directory's parent does not exist."));
			return ok({
				mode: "create",
				root: join(parent, basename(stripped))
			});
		};
		createPrivateDirectory = async (root) => {
			const created = await mkdir(root, { mode: 448 }).catch((cause) => cause);
			if (created !== undefined) return err(nodeCode(created) === "EEXIST" ? decompileInputError("output_directory", "Output directory already exists. Pass resume to continue an export that matches this target and analysis profile.") : decompileInputError("output_directory", "The output directory could not be created."));
			const secured = await chmod(root, 448).catch((cause) => cause);
			if (secured === undefined) return ok(undefined);
			const removed = await rmdir(root).then(() => true, () => false);
			return err(decompileInputError("output_directory", removed ? "The output directory could not be secured." : "The output directory could not be secured, and the directory this call created could not be removed. Remove it before retrying."));
		};
		prepareFunctionsDirectory = async (root, resources) => {
			const directory = join(root, DECOMPILE_DIRECTORY_FUNCTIONS_DIRECTORY);
			const created = await mkdir(directory, { mode: 448 }).catch((cause) => cause);
			if (created !== undefined && nodeCode(created) !== "EEXIST") return err(decompileInputError("output_directory", "The functions directory could not be created."));
			const stat = await lstat(directory, { bigint: true }).catch((cause) => cause);
			if (!isDirectoryStat(stat) || !hasFileIdentity(stat)) return err(decompileInputError("output_directory", "The functions directory is not a real directory."));
			resources.ownFunctionsDirectory(stat);
			const secured = await chmod(directory, 448).catch((cause) => cause);
			return secured === undefined ? ok(undefined) : err(decompileInputError("output_directory", "The functions directory could not be secured."));
		};
		seedJournal = async (root, identity, resources) => {
			const header = decompileJournalHeaderSchema.safeParse({
				kind: "header",
				version: 1,
				target_sha256: identity.targetSha256,
				provider: identity.provider,
				analysis_profile_digest: identity.analysisProfileDigest,
				layout: identity.layout
			});
			if (!header.success) return err(new AnalysisOutputError("decompile_all", "decompile journal header is invalid"));
			const opened = await openJournal(root, "wx");
			if (!opened.ok) return opened;
			resources.ownFile(opened.value, join(root, DECOMPILE_DIRECTORY_JOURNAL_NAME), true);
			const seeded = await opened.value.writeFile(`${JSON.stringify(header.data)}\n`).then(() => opened.value.sync()).then(() => chmod(join(root, DECOMPILE_DIRECTORY_JOURNAL_NAME), 384)).then(() => true, () => false);
			if (seeded) return opened;
			return err(decompileInputError("output_directory", "The decompile journal could not be created."));
		};
		NO_FOLLOW = constants.O_NOFOLLOW ?? 0;
		JOURNAL_FLAGS = {
			wx: constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | NO_FOLLOW,
			a: constants.O_WRONLY | constants.O_APPEND | NO_FOLLOW
		};
		openJournal = async (root, flag) => {
			const handle = await open(join(root, DECOMPILE_DIRECTORY_JOURNAL_NAME), JOURNAL_FLAGS[flag], 384).catch((cause) => cause);
			return isFileHandle(handle) ? ok(handle) : err(decompileInputError("output_directory", "The decompile journal could not be opened."));
		};
		readJournalBytes = async (root, resources) => {
			const path = join(root, DECOMPILE_DIRECTORY_JOURNAL_NAME);
			const stat = await lstat(path).catch((cause) => cause);
			if (!isStat(stat)) return stat;
			if (!stat.isFile()) return new Error("journal is not a regular file");
			const handle = await open(path, constants.O_RDONLY | NO_FOLLOW).catch((cause) => cause);
			if (!isFileHandle(handle)) return handle;
			const close = resources.ownFile(handle, path);
			const bytes = await handle.readFile().catch((cause) => cause);
			return await close() ? bytes : new Error("decompile journal read handle could not be closed");
		};
		readJournal = async (root, identity, resources) => {
			const bytes = await readJournalBytes(root, resources);
			if (!(bytes instanceof Buffer)) return err(nodeCode(bytes) === "ENOENT" ? decompileInputError("output_directory", "Resume requires decompile-journal.jsonl in the output directory. An export stopped before its journal was written has no functions to keep; choose a new output directory, or remove this one if it is yours.") : decompileInputError("output_directory", "The decompile journal could not be read."));
			const parsed = parseJournal(bytes);
			if (!parsed.ok) return parsed;
			const unknown = unknownIdentity(parsed.value.header, identity);
			if (unknown !== undefined) return err(unknown);
			const mismatches = identityMismatches(parsed.value.header, identity);
			if (mismatches.length > 0) return err(journalIdentityMismatch(parsed.value.header, identity, mismatches));
			return ok({
				records: parsed.value.records,
				written: parsed.value.written,
				paths: parsed.value.paths,
				committedBytes: parsed.value.committedBytes,
				journalBytes: parsed.value.journalBytes
			});
		};
		parseJournal = (bytes) => {
			const committedBytes = bytes.lastIndexOf(10) + 1;
			let committed;
			try {
				committed = decodeStrictUtf8(bytes.subarray(0, committedBytes), "preserve");
			} catch {
				return err(incompatibleJournal());
			}
			const lines = committed.split("\n");
			lines.pop();
			const header = decompileJournalHeaderSchema.safeParse(parseJson(lines[0]));
			if (!header.success) return err(incompatibleJournal());
			const records = new Map();
			const written = new Map();
			const paths = {
				byPortablePath: new Map(),
				byAddress: new Map()
			};
			for (const line of lines.slice(1)) {
				const parsed = decompileJournalLineSchema.safeParse(parseJson(line));
				if (!parsed.success || parsed.data.kind !== "function") return err(incompatibleJournal());
				const { kind: _kind, ...record } = parsed.data;
				const path = record.relative_path;
				if (path !== undefined) {
					const owner = paths.byPortablePath.get(portablePathKey(path));
					if (owner !== undefined && owner !== record.address) return err(incompatibleJournal());
					reservePath(paths, path, record.address);
				}
				records.set(record.address, record);
				if (record.status === "written") written.set(record.address, record);
			}
			return ok({
				header: header.data,
				records,
				written,
				paths,
				committedBytes,
				journalBytes: bytes.length
			});
		};
		unknownIdentity = (header, identity) => {
			if (header.target_sha256 === null || identity.targetSha256 === null) return decompileInputError("output_directory", "Resume requires an observed target SHA-256 for both the journal and this target.");
			if (header.analysis_profile_digest === null || identity.analysisProfileDigest === null) return decompileInputError("output_directory", "Resume requires an analysis profile digest for both the journal and this provider.");
			return undefined;
		};
		identityMismatches = (header, identity) => [
			...header.target_sha256 === identity.targetSha256 ? [] : ["target SHA-256"],
			...header.analysis_profile_digest === identity.analysisProfileDigest ? [] : ["analysis profile digest"],
			...header.layout === identity.layout ? [] : ["layout"],
			...header.provider.id === identity.provider.id ? [] : ["provider id"],
			...header.provider.name === identity.provider.name ? [] : ["provider name"],
			...header.provider.version === identity.provider.version ? [] : ["provider version"]
		];
		journalIdentityMismatch = (header, identity, mismatches) => {
			const message = `The decompile journal does not match the current ${mismatches.join(", ")}.`;
			return new AnalysisInputError("decompile_all", {
				userMessage: message,
				conformsToInputContract: true,
				remediationAction: "Resume with the target, provider, analysis profile, and layout that created this directory, or choose a new output directory. The journal and existing files were left unchanged."
			}, [{
				path: ["output_directory"],
				reason: "invalid_value",
				message,
				expected: {
					target_sha256: header.target_sha256,
					analysis_profile_digest: header.analysis_profile_digest,
					layout: header.layout,
					provider: header.provider
				},
				observed: {
					target_sha256: identity.targetSha256,
					analysis_profile_digest: identity.analysisProfileDigest,
					layout: identity.layout,
					provider: identity.provider
				}
			}]);
		};
		incompatibleJournal = () => {
			const message = "The decompile journal is not a compatible export.";
			return new AnalysisInputError("decompile_all", {
				userMessage: message,
				conformsToInputContract: true,
				remediationAction: "Inspect the journal and use the REA version that created it, or choose a new output directory. The journal may be damaged or from an unsupported version; existing files were left unchanged."
			}, [{
				path: ["output_directory"],
				reason: "invalid_value",
				message
			}]);
		};
		parseJson = (line) => {
			if (line === undefined) return undefined;
			try {
				return JSON.parse(line);
			} catch {
				return undefined;
			}
		};
		portablePathKey = (path) => path.toLowerCase();
		reservePath = (paths, path, address) => {
			const key = portablePathKey(path);
			if (!paths.byPortablePath.has(key)) paths.byPortablePath.set(key, address);
			if (!paths.byAddress.has(address)) paths.byAddress.set(address, path);
		};
		allocateFunctionPath = (address, used) => {
			const base = sanitizeAddress(address);
			const directory = DECOMPILE_DIRECTORY_FUNCTIONS_DIRECTORY;
			const plain = `${directory}/${base}.c`;
			if (!used.has(portablePathKey(plain))) return plain;
			const suffix = sha256Hex(address).slice(0, 8);
			let candidate = `${directory}/${base}-${suffix}.c`;
			let discriminator = 0;
			while (used.has(portablePathKey(candidate))) {
				discriminator += 1;
				candidate = `${directory}/${base}-${suffix}-${discriminator.toString(16)}.c`;
			}
			return candidate;
		};
		sanitizeAddress = (address) => {
			const cleaned = address.replace(/[^A-Za-z0-9._-]+/gu, "_").replace(/^\.+/u, "").slice(0, 120);
			return cleaned.length === 0 ? "function" : cleaned;
		};
		DECOMPILE_EXPORT_LEASE_DIRECTORY = join("/tmp", `rea-decompile-${(process.getuid?.() ?? 0).toString()}`);
		acquireExportLease = async (root, scope) => {
			const stat = await lstat(root, { bigint: true }).catch((cause) => cause);
			if (!isDirectoryStat(stat) || !hasFileIdentity(stat)) return err(decompileInputError("output_directory", "The output directory could not be inspected."));
			const leaseResources = new ArtifactResourceScope();
			try {
				const acquisition = await acquireOwnedLease({
					identity: {
						operation: "decompile_all",
						device: stat.dev.toString(),
						inode: stat.ino.toString()
					},
					runId: randomUUID(),
					directory: DECOMPILE_EXPORT_LEASE_DIRECTORY,
					failure: exportLeaseFailure,
					resources: leaseResources
				});
				return acquisition.acquired ? ok({
					lease: acquisition.lease,
					identity: stat
				}) : err(new AnalysisResourceConstraintError("decompile_all", "capacity", `another decompile_all run (process ${acquisition.owner.processId.toString()}) is using this output directory`, { holder_process_id: acquisition.owner.processId }, {
					retryable: true,
					remediationAction: "Wait for the other decompile_all run on this output directory to finish, then retry with resume."
				}));
			} catch (cause) {
				if (leaseResources.hasPending) scope?.retain({
					close: () => leaseResources.close(),
					get cleanupResources() {
						return leaseResources.cleanupResources;
					}
				}, "decompile lease directory");
				return err(cause instanceof AnalysisError ? cause : new AnalysisOutputError("decompile_all", "output directory lease could not be acquired", { cause }));
			}
		};
		exportLeaseFailure = (failure, cause) => {
			const primary = cause instanceof OwnedLeaseCleanupFailure ? cause.primary : cause instanceof ArtifactFileCleanupFailure && cause.fileCleanupFailure.outcome.kind === "failed" ? cause.fileCleanupFailure.outcome.cause : undefined;
			const error = new AnalysisOutputError("decompile_all", "output directory lease could not be acquired", {
				...cause === undefined ? {} : { cause },
				...primary instanceof AnalysisError ? { cleanupPrimary: primary } : {},
				...cause instanceof ArtifactFileCleanupFailure || cause instanceof OwnedLeaseCleanupFailure ? { cleanup: cause.cleanup } : {},
				userMessage: primary instanceof AnalysisError ? primary.userMessage ?? exportLeaseMessage(failure) : exportLeaseMessage(failure)
			});
			bindArtifactFileCleanup(cause, error);
			return error;
		};
		exportLeaseMessage = (failure) => {
			switch (failure.kind) {
				case "owner_unverified": return `Another process holds this output directory's lease but did not identify itself (${failure.reason}). Retry after it finishes.`;
				case "recovery_busy": return `Another run is recovering this output directory's lease at ${JSON.stringify(failure.path)}. Retry shortly. If no REA process is running, remove that directory.`;
				case "recovery_remove": return `REA could not remove its lease recovery directory at ${JSON.stringify(failure.path)}. Check its write access before retrying.`;
				case "unrecoverable": return "REA could not take this output directory's lease. Retry after other decompile_all runs finish.";
				case "socket_permissions": return "REA could not secure its lease socket permissions.";
				case "directory_close": return "REA could not confirm closure of its output lease directory handle.";
				case "directory_access_denied": return `REA could not access its lease directory at ${JSON.stringify(failure.directory)}. Restore owner-only permissions (0700) on a directory you own, then retry.`;
				case "directory_create":
				case "directory_not_private":
				case "directory_permissions":
				case "directory_inspect":
				case "recovery_create": return `REA could not use its private lease directory ${JSON.stringify(DECOMPILE_EXPORT_LEASE_DIRECTORY)}. Check that it is a directory owned by this user with permissions 0700.`;
			}
		};
		hasFileIdentity = (value) => typeof value === "object" && value !== null && "dev" in value && "ino" in value && typeof value.dev === "bigint" && typeof value.ino === "bigint";
		writeOwnedIndex = async (root, text, resources) => {
			try {
				await resources.publish(text, join(root, DECOMPILE_DIRECTORY_INDEX_NAME), "rename");
				return ok(undefined);
			} catch (cause) {
				return err(exportOutputFailure(cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined ? "decompile index publication cleanup failed" : "decompile index could not be written", cause));
			}
		};
		exportOutputFailure = (message, cause) => {
			const error = new AnalysisOutputError("decompile_all", message, {
				cause,
				...cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined ? { cleanup: cause.cleanup } : {}
			});
			bindArtifactFileCleanup(cause, error);
			return error;
		};
		isFileHandle = (value) => typeof value === "object" && value !== null && "write" in value && "sync" in value && "close" in value;
		isDirectoryStat = (value) => isStat(value) && value.isDirectory() && !value.isSymbolicLink();
		isSymlinkStat = (value) => isStat(value) && value.isSymbolicLink();
		isStat = (value) => typeof value === "object" && value !== null && "isDirectory" in value && "isFile" in value && "isSymbolicLink" in value && typeof value.isDirectory === "function" && typeof value.isSymbolicLink === "function";
		nodeCode = (cause) => typeof cause === "object" && cause !== null && "code" in cause && typeof cause.code === "string" ? cause.code : undefined;
	})))();
}

//#endregion
//#region dist/application/decompileDirectory/functionFile.js
var functionFileText, bodyRecord, bodyLines, limitationLines, providerLine, headerValue;
function init_functionFile() {
	return (init_functionFile = __esmMin((() => {
		functionFileText = (input) => {
			const lines = [
				"// rea decompile_all",
				`// name: ${headerValue(input.procedure.name ?? "")}`,
				`// address: ${headerValue(input.procedure.address)}`,
				...bodyLines(input.body),
				`// provider: ${headerValue(providerLine(input.identity))}`,
				`// analysis_profile: ${input.identity.analysisProfileDigest ?? "unavailable"}`,
				...limitationLines(input.limitations),
				"// pseudocode: provider-specific; not original source"
			];
			return `${lines.join("\n")}\n\n${input.pseudocode}`;
		};
		bodyRecord = (body) => body.available ? {
			available: true,
			ranges: body.ranges.map((range) => ({
				start: range.start,
				end: range.end
			})),
			non_contiguous: body.non_contiguous
		} : {
			available: false,
			reason: body.reason
		};
		bodyLines = (body) => body.available ? [
			"// body: available",
			...body.ranges.map((range) => `// range: ${headerValue(range.start)}-${headerValue(range.end)} inclusive`),
			`// non_contiguous: ${body.non_contiguous ? "true" : "false"}`
		] : ["// body: unavailable", `// body_reason: ${headerValue(body.reason)}`];
		limitationLines = (limitations) => {
			const joined = limitations.map((limitation) => headerValue(limitation)).filter((limitation) => limitation.length > 0).join("; ");
			if (joined.length <= 4e3) return [`// limitations: ${joined.length === 0 ? "none" : joined}`];
			return [`// limitations: ${joined.slice(0, 4e3)}`, "// limitations_truncated: true; decompile-index.json keeps the complete list"];
		};
		providerLine = (identity) => `${identity.provider.name} ${identity.provider.version ?? "unknown"} (${identity.provider.id})`;
		headerValue = (value) => value.replace(/[\u0000-\u001f\u007f]/gu, " ").slice(0, 2e3);
	})))();
}

//#endregion
//#region dist/application/decompileDirectory/decompileAll.js
var DWARF_LAYOUT_UNAVAILABLE, BODY_UNAVAILABLE, TARGET_DIGEST_UNAVAILABLE, PROFILE_UNAVAILABLE, DUPLICATE_ADDRESSES, OUTPUT_IO_STREAK_LIMIT, unaddressedRows, unknownBodyRecords, decompileAll, attemptOrder, loadProcedures, identityFrom, publishSelected, attemptOne, publishOne, readBody, existingFile, PROFILE_CHANGED, TARGET_CHANGED, observationMismatch, sameAddress, failureReason, outputStoppedAccepting, recordFailure, fitInlineFailure, failureRecord, pseudocodeFailure, externalRecord, unavailableBody, retainedObservation, exportLimitations, layoutStatus, manifestOf, executionOptions, nodeAbsent;
function init_decompileAll() {
	return (init_decompileAll = __esmMin((() => {
		init_exportResources();
		init_resources();
		init_decompileDirectory();
		init_jsonValueByteLength();
		init_digests();
		init_analysisErrorCore();
		init_analysisErrorCleanup();
		init_analysisErrorProjection();
		init_procedureInfo();
		init_nativeOperationFacts();
		init_AnalysisOperationFacts();
		init_addressCoordinate();
		init_result();
		init_exportTree();
		init_functionFile();
		init_selection();
		DWARF_LAYOUT_UNAVAILABLE = "Debug compilation-unit layout is unavailable. Files are named by canonical address.";
		BODY_UNAVAILABLE = "procedure_info is unavailable, so function body ranges are unknown.";
		TARGET_DIGEST_UNAVAILABLE = "Target SHA-256 was not observed, so this export cannot be resumed.";
		PROFILE_UNAVAILABLE = "The provider did not commit an analysis profile, so this export cannot be resumed.";
		DUPLICATE_ADDRESSES = "Duplicate procedure addresses were coalesced to the first matching inventory row.";
		OUTPUT_IO_STREAK_LIMIT = 5;
		unaddressedRows = (count) => `${count.toString()} inventory row(s) had no address and were not exported.`;
		unknownBodyRecords = (unknown) => `${unknown.count.toString()} exported function record(s) report an unavailable body${unknown.sharedReason === undefined ? ` for differing reasons; see each record's body.reason in ${DECOMPILE_DIRECTORY_INDEX_NAME}.` : `: ${unknown.sharedReason}`}`;
		decompileAll = async (analysis, input, signal) => {
			const bounds = validateDecompileBounds(input);
			if (!bounds.ok) return bounds;
			const placement = await classifyOutputPath(input.output_directory, input.resume);
			if (!placement.ok) return placement;
			if (isAborted(signal)) return err(cancelledBy("decompile_all", signal));
			const loaded = await loadProcedures(analysis, input.layout, signal);
			if (!loaded.ok) return loaded;
			if (isAborted(signal)) return err(cancelledBy("decompile_all", signal));
			const selection = selectProcedures(loaded.value.procedures, input, bounds.value);
			const inventoryLimitations = loaded.value.limitations;
			const opened = await DecompileExport.open({
				placement: placement.value,
				identity: loaded.value.identity,
				resourceScope: analysis.resourceScope
			});
			if (!opened.ok) return opened;
			const session = opened.value;
			const state = {
				attempted: 0,
				written: 0,
				failed: 0,
				external: 0,
				skipped: 0,
				failures: [],
				inlineFailureBytes: 2,
				recentFailures: [],
				lastFailureCode: undefined,
				outputIoStreak: 0
			};
			let published;
			let indexed;
			let limitations = [];
			let closed;
			try {
				published = await publishSelected({
					analysis,
					session,
					procedures: attemptOrder(session, selection.procedures),
					identity: loaded.value.identity,
					signal,
					limit: input.limit,
					retryFailed: input.retry_failed,
					state
				});
				limitations = exportLimitations(input.layout, loaded.value.identity, selection.collapsedDuplicates, session.unknownBodies(), loaded.value.unaddressed);
				indexed = await session.writeIndex({
					layoutStatus: layoutStatus(input.layout),
					limitations,
					latestRun: {
						resume: input.resume,
						selected: selection.procedures.length,
						excluded: selection.excluded,
						selection: {
							name: input.name ?? null,
							namespace: input.namespace ?? null,
							address_start: input.address_start ?? null,
							address_end: input.address_end ?? null,
							limit: input.limit ?? null
						},
						inventoryLimitations
					}
				});
			} finally {
				closed = await session.close();
			}
			const callerStoppedPublish = !published.ok && published.error instanceof AnalysisCancelledError && !published.error.cleanupIncomplete && isAborted(signal);
			const failures = [
				...!published.ok && !callerStoppedPublish ? [published.error] : [],
				...indexed.ok ? [] : [indexed.error],
				...closed.ok ? [] : [closed.error]
			];
			const primary = failures[0];
			const publishedIndex = indexed.ok ? join(session.root, DECOMPILE_DIRECTORY_INDEX_NAME) : indexed.error.cause instanceof ExportPublishedCleanupFailure ? indexed.error.cause.publishedPath : undefined;
			const publishedOutput = publishedIndex === undefined ? undefined : {
				output_directory: session.root,
				index_path: publishedIndex
			};
			if (primary !== undefined) {
				let failure = primary;
				if (isAborted(signal) && !(primary instanceof AnalysisCancelledError && primary.cause === signal?.reason)) primary.retainSecondaryFailure(cancelledBy("decompile_all", signal));
				for (const failure of failures.slice(1)) primary.retainSecondaryFailure(failure);
				if (!closed.ok && primary !== closed.error && closed.error.cleanupIncomplete) {
					failure = analysisErrorWithCleanupDependencies(primary, closed.error, "decompile_all");
				}
				if (publishedOutput !== undefined) failure.retainPrimaryDiagnostics({ published_output: publishedOutput });
				return err(failure);
			}
			if (isAborted(signal)) {
				const failure = cancelledBy("decompile_all", signal);
				if (publishedOutput !== undefined) failure.retainPrimaryDiagnostics({ published_output: publishedOutput });
				return err(failure);
			}
			const manifest = decompileDirectoryManifestSchema.safeParse(manifestOf({
				root: session.root,
				input,
				identity: loaded.value.identity,
				selected: selection.procedures.length,
				excluded: selection.excluded,
				state,
				limitations,
				inventoryLimitations
			}));
			return manifest.success ? ok(manifest.data) : err(new AnalysisOutputError("decompile_all", "decompile manifest could not be built"));
		};
		attemptOrder = (session, procedures) => {
			const failedBefore = (procedure) => session.record(procedure.address)?.status === "failed";
			return [...procedures.filter((procedure) => !failedBefore(procedure)), ...procedures.filter(failedBefore)];
		};
		loadProcedures = async (analysis, layout, signal) => {
			const inventory = await executeFact(analysis, listProceduresFact, {}, executionOptions(signal));
			if (!inventory.ok) return inventory;
			const identity = identityFrom(inventory.value.execution, layout);
			if (!identity.ok) return identity;
			const addressed = inventory.value.fact.filter((row) => row.address.length > 0);
			return ok({
				procedures: addressed.map((row) => ({
					address: row.address,
					name: row.value.length === 0 ? null : row.value
				})),
				identity: identity.value,
				unaddressed: inventory.value.fact.length - addressed.length,
				limitations: inventory.value.execution.limitations
			});
		};
		identityFrom = (execution, layout) => {
			const sha = execution.subject?.sha256 ?? null;
			if (sha !== null && !digestSchema.safeParse(sha).success) return err(new AnalysisOutputError("list_procedures", "provider returned a target digest that is not a SHA-256"));
			const profile = execution.analysisProfile?.digest ?? null;
			if (profile !== null && !digestSchema.safeParse(profile).success) return err(new AnalysisOutputError("list_procedures", "provider returned an analysis profile digest that is not a SHA-256"));
			const provider = execution.provider;
			if (provider.id.length === 0 || provider.name.length === 0) return err(new AnalysisOutputError("list_procedures", "provider identity is incomplete"));
			if (provider.version !== null && provider.version.length === 0) return err(new AnalysisOutputError("list_procedures", "provider identity is incomplete"));
			return ok({
				targetSha256: sha,
				provider: {
					id: provider.id,
					name: provider.name,
					version: provider.version
				},
				analysisProfileDigest: profile,
				layout
			});
		};
		publishSelected = async (input) => {
			let bodySupport = "unknown";
			for (const procedure of input.procedures) {
				if (isAborted(input.signal)) return err(cancelledBy("decompile_all", input.signal));
				const existing = await existingFile(input.session, procedure.address, input.signal);
				if (typeof existing === "object") return err(existing.error);
				if (isAborted(input.signal)) return err(cancelledBy("decompile_all", input.signal));
				if (existing === "skip") {
					input.state.skipped += 1;
					input.state.outputIoStreak = 0;
					const written = input.session.lastWritten(procedure.address);
					if (written !== undefined && input.session.record(procedure.address) !== written) {
						const appended = await input.session.append(written);
						if (!appended.ok) return appended;
					}
					continue;
				}
				if (existing === "write" && input.session.record(procedure.address)?.status === "external") {
					input.state.skipped += 1;
					continue;
				}
				if (input.limit !== undefined && input.state.attempted >= input.limit) continue;
				input.state.attempted += 1;
				input.state.lastFailureCode = undefined;
				const externalBefore = input.state.external;
				const outcome = await attemptOne(input, procedure, existing, bodySupport);
				bodySupport = outcome.bodySupport;
				if (!outcome.result.ok) return outcome.result;
				if (input.state.external === externalBefore) input.state.outputIoStreak = input.state.lastFailureCode === "output_io" ? input.state.outputIoStreak + 1 : 0;
				if (input.state.outputIoStreak >= 5) return err(outputStoppedAccepting(input.state));
			}
			return ok(undefined);
		};
		attemptOne = async (input, procedure, existing, bodySupport) => {
			if (existing === "conflict") {
				const reason = {
					code: "output_exists",
					message: "The function file already exists and does not match this export."
				};
				recordFailure(input.state, procedure, reason);
				const retained = retainedObservation(input.session, procedure.address);
				const appended = await input.session.append(failureRecord(procedure, retained.body, reason, {
					relativePath: input.session.pathFor(procedure.address),
					...retained.options
				}));
				return {
					result: appended,
					bodySupport
				};
			}
			if (existing === "io") {
				const reason = {
					code: "output_io",
					message: "The existing function file could not be read."
				};
				recordFailure(input.state, procedure, reason);
				const retained = retainedObservation(input.session, procedure.address);
				const appended = await input.session.append(failureRecord(procedure, retained.body, reason, {
					relativePath: input.session.pathFor(procedure.address),
					...retained.options
				}));
				return {
					result: appended,
					bodySupport
				};
			}
			return publishOne({
				...input,
				procedure,
				bodySupport
			});
		};
		publishOne = async (input) => {
			const body = await readBody(input.analysis, input.procedure.address, input.identity, input.signal, input.bodySupport);
			if (body.kind === "error") return {
				result: err(body.error),
				bodySupport: input.bodySupport
			};
			const infoCaveats = body.kind === "body" ? body.limitations ?? [] : [];
			if (body.kind === "body" && body.external === true) {
				input.state.external += 1;
				return {
					result: await input.session.append(externalRecord(input.procedure, body.fact, infoCaveats)),
					bodySupport: body.support
				};
			}
			let attemptedIndependent = false;
			let decompiled = await input.analysis.execute("procedure_pseudo_code", { procedure: input.procedure.address }, executionOptions(input.signal));
			if (!decompiled.ok && decompiled.error.cleanupIncomplete) return {
				result: decompiled,
				bodySupport: body.support
			};
			if (!isAborted(input.signal) && decompiled.ok && input.retryFailed === "independent_fresh" && decompiled.value.result === null && decompiled.value.pseudocodeAbsence?.kind === "provider-failure" && observationMismatch(input.identity, decompiled.value) === undefined) {
				const original = decompiled.value;
				const originalSource = original.sourceDescriptor === undefined ? {
					status: "unknown",
					reason: "source_not_available"
				} : {
					status: "reported",
					source: original.sourceDescriptor
				};
				const recorded = await input.session.append(failureRecord(input.procedure, body.fact, pseudocodeFailure(null), {
					limitations: [...new Set([...infoCaveats, ...original.limitations])],
					providerSource: originalSource,
					pseudocodeAbsence: original.pseudocodeAbsence
				}));
				if (!recorded.ok) return {
					result: recorded,
					bodySupport: body.support
				};
				if (isAborted(input.signal)) return {
					result: err(cancelledBy("decompile_all", input.signal)),
					bodySupport: body.support
				};
				attemptedIndependent = true;
				decompiled = await input.analysis.execute("procedure_pseudo_code", {
					procedure: input.procedure.address,
					analysis: "independent_fresh"
				}, executionOptions(input.signal));
				if (!decompiled.ok && decompiled.error.cleanupIncomplete) return {
					result: decompiled,
					bodySupport: body.support
				};
			}
			if (!decompiled.ok) {
				if (decompiled.error instanceof AnalysisCancelledError) return {
					result: decompiled,
					bodySupport: body.support
				};
				const reason = failureReason(decompiled.error);
				recordFailure(input.state, input.procedure, reason);
				return {
					result: await input.session.append(failureRecord(input.procedure, body.fact, reason, { limitations: infoCaveats })),
					bodySupport: body.support
				};
			}
			const mismatch = observationMismatch(input.identity, decompiled.value);
			if (mismatch !== undefined) {
				const reason = mismatch;
				recordFailure(input.state, input.procedure, reason);
				return {
					result: await input.session.append(failureRecord(input.procedure, body.fact, reason, { limitations: infoCaveats })),
					bodySupport: body.support
				};
			}
			const caveats = [...new Set([
				...infoCaveats,
				...decompiled.value.limitations,
				...input.retryFailed === "independent_fresh" && !attemptedIndependent && decompiled.value.result === null && decompiled.value.pseudocodeAbsence?.kind !== "provider-failure" ? ["Independent retry was not attempted because the provider did not report a function failure for this observation."] : []
			])];
			const observationSource = decompiled.value.sourceDescriptor === undefined ? {
				status: "unknown",
				reason: "source_not_available"
			} : {
				status: "reported",
				source: decompiled.value.sourceDescriptor
			};
			const pseudocode = decompiled.value.result;
			if (typeof pseudocode !== "string" || pseudocode.length === 0) {
				const reason = input.retryFailed === undefined && pseudocode === null && decompiled.value.pseudocodeAbsence?.kind === "provider-failure" ? {
					code: "no_pseudocode",
					message: "The provider reported a function decompilation failure. If it supports independent decompilation, resume this export with retry_failed: independent_fresh. The retry may use different analysis context."
				} : pseudocodeFailure(pseudocode);
				recordFailure(input.state, input.procedure, reason, decompiled.value.pseudocodeAbsence);
				return {
					result: await input.session.append(failureRecord(input.procedure, body.fact, reason, {
						limitations: caveats,
						providerSource: observationSource,
						...decompiled.value.pseudocodeAbsence === undefined ? {} : { pseudocodeAbsence: decompiled.value.pseudocodeAbsence }
					})),
					bodySupport: body.support
				};
			}
			if (isAborted(input.signal)) return {
				result: err(cancelledBy("decompile_all", input.signal)),
				bodySupport: body.support
			};
			const relativePath = input.session.pathFor(input.procedure.address);
			const bytes = Buffer.from(functionFileText({
				procedure: input.procedure,
				body: body.fact,
				identity: input.identity,
				limitations: caveats,
				pseudocode
			}), "utf8");
			const committed = await input.session.commitFunctionFile(relativePath, bytes);
			if (committed.status === "error") return {
				result: err(committed.error),
				bodySupport: body.support
			};
			if (committed.status === "conflict" || committed.status === "io") {
				const reason = committed.status === "conflict" ? {
					code: "output_exists",
					message: "The function file already exists and does not match this export."
				} : {
					code: "output_io",
					message: "The function file could not be written."
				};
				recordFailure(input.state, input.procedure, reason);
				return {
					result: await input.session.append(failureRecord(input.procedure, body.fact, reason, {
						relativePath,
						limitations: caveats,
						providerSource: observationSource
					})),
					bodySupport: body.support
				};
			}
			const appended = await input.session.append({
				address: input.procedure.address,
				name: input.procedure.name,
				status: "written",
				relative_path: relativePath,
				sha256: committed.sha256,
				provider_source: committed.status === "matched" ? {
					status: "unknown",
					reason: "existing_file_origin_unknown"
				} : observationSource,
				body: bodyRecord(body.fact),
				...caveats.length === 0 ? {} : { limitations: caveats }
			});
			if (!appended.ok) return {
				result: appended,
				bodySupport: body.support
			};
			input.state.written += committed.status === "written" ? 1 : 0;
			input.state.skipped += committed.status === "matched" ? 1 : 0;
			return {
				result: ok(undefined),
				bodySupport: body.support
			};
		};
		readBody = async (analysis, address, identity, signal, support) => {
			if (support === "unavailable") return {
				kind: "unavailable",
				fact: unavailableBody(BODY_UNAVAILABLE),
				support
			};
			const observed = await analysis.execute("procedure_info", { procedure: address }, executionOptions(signal));
			if (!observed.ok) {
				if (observed.error.cleanupIncomplete || observed.error instanceof AnalysisCancelledError) return {
					kind: "error",
					error: observed.error
				};
				if (observed.error instanceof AnalysisCapabilityUnavailableError) return {
					kind: "unavailable",
					fact: unavailableBody(BODY_UNAVAILABLE),
					support: "unavailable"
				};
				return {
					kind: "body",
					fact: unavailableBody(failureReason(observed.error).message),
					support
				};
			}
			const mismatch = observationMismatch(identity, observed.value);
			if (mismatch !== undefined) return {
				kind: "body",
				fact: unavailableBody(`procedure_info: ${mismatch.message}`),
				support
			};
			const parsed = procedureInfoSchema.safeParse(observed.value.result);
			if (!parsed.success) return {
				kind: "body",
				fact: unavailableBody("procedure_info returned an invalid body."),
				support,
				limitations: observed.value.limitations
			};
			if (!sameAddress(parsed.data.entrypoint, address)) return {
				kind: "body",
				fact: unavailableBody("procedure_info described a different entry point than this function."),
				support,
				limitations: observed.value.limitations
			};
			const external = parsed.data.classification?.external === true ? { external: true } : {};
			if (!parsed.data.body.available) return {
				kind: "body",
				fact: unavailableBody(parsed.data.body.reason),
				support,
				limitations: observed.value.limitations,
				...external
			};
			return {
				kind: "body",
				fact: {
					available: true,
					ranges: parsed.data.body.ranges,
					non_contiguous: parsed.data.body.non_contiguous
				},
				support,
				limitations: observed.value.limitations,
				...external
			};
		};
		existingFile = async (session, address, signal) => {
			const record = session.lastWritten(address);
			if (record === undefined || record.sha256 === undefined || record.relative_path === undefined) return "write";
			const digest = await session.hashFile(record.relative_path, signal).catch((cause) => cause);
			if (digest instanceof ArtifactReaderFailure && digest.cleanup !== undefined) return { error: exportOutputFailure("decompile file verification cleanup failed", digest) };
			if (typeof digest === "string") return digest === record.sha256 ? "skip" : "conflict";
			return nodeAbsent(digest) ? "write" : "io";
		};
		PROFILE_CHANGED = {
			code: "profile_changed",
			message: "The decompiler observation does not match this export's provider or analysis profile."
		};
		TARGET_CHANGED = {
			code: "target_changed",
			message: "The decompiler observation names a different target than this export."
		};
		observationMismatch = (identity, execution) => {
			const provider = execution.provider;
			if (provider.id !== identity.provider.id || provider.name !== identity.provider.name || provider.version !== identity.provider.version) return PROFILE_CHANGED;
			if ((execution.analysisProfile?.digest ?? null) !== identity.analysisProfileDigest) return PROFILE_CHANGED;
			const target = execution.subject?.sha256;
			return target === undefined || target === identity.targetSha256 ? undefined : TARGET_CHANGED;
		};
		sameAddress = (left, right) => {
			const a = addressCoordinate(left);
			const b = addressCoordinate(right);
			return a === null || b === null ? left === right : a.space === b.space && a.offset === b.offset;
		};
		failureReason = (error) => {
			if (error instanceof AnalysisTimeoutError) return {
				code: "deadline",
				message: "The decompiler deadline elapsed."
			};
			const projected = projectAnalysisError(error);
			const message = projected.message.replace(/\s+/gu, " ").trim().slice(0, 300);
			return {
				code: projected.code.slice(0, 80),
				message: message.length === 0 ? projected.code : message
			};
		};
		outputStoppedAccepting = (state) => new AnalysisOutputError("decompile_all", "output directory stopped accepting function files", {
			userMessage: `Stopped after ${5 .toString()} function files in a row could not be written or read, for example because the disk is full or permissions changed. Files already written are kept and recorded in ${DECOMPILE_DIRECTORY_INDEX_NAME}. Fix the output directory, then resume.`,
			remediationAction: "Free space or restore write access in the output directory, then rerun with resume.",
			diagnostics: {
				attempted: state.attempted,
				written: state.written,
				failed: state.failed,
				external: state.external,
				skipped: state.skipped,
				consecutive_output_io: state.outputIoStreak,
				last_failures: state.recentFailures.map((failure) => ({ ...failure })),
				last_failures_omitted: Math.min(state.failed, 5) - state.recentFailures.length
			}
		});
		recordFailure = (state, procedure, reason, pseudocodeAbsence) => {
			state.failed += 1;
			state.lastFailureCode = reason.code;
			const failure = {
				address: procedure.address,
				name: procedure.name,
				code: reason.code,
				message: reason.message,
				...pseudocodeAbsence === undefined ? {} : { pseudocode_absence: pseudocodeAbsence }
			};
			if (state.failures.length < 32) {
				const comma = state.failures.length === 0 ? 0 : 1;
				const fitted = fitInlineFailure(failure, DECOMPILE_DIRECTORY_INLINE_FAILURE_BYTES - state.inlineFailureBytes - comma);
				if (fitted !== undefined) {
					state.failures.push(fitted.row);
					state.inlineFailureBytes += comma + fitted.bytes;
				}
			}
			const recent = fitInlineFailure(failure, DECOMPILE_DIRECTORY_INLINE_FAILURE_BYTES - 2);
			if (recent === undefined) state.recentFailures.length = 0;
			else state.recentFailures.push(recent.row);
			while (state.recentFailures.length > 5 || jsonValueByteLength(state.recentFailures, 2048) > 2048) state.recentFailures.shift();
		};
		fitInlineFailure = (failure, budget) => {
			const bytes = jsonValueByteLength(failure, budget);
			if (bytes <= budget) return {
				row: failure,
				bytes
			};
			const { name: _name, ...withoutName } = failure;
			const compactBytes = jsonValueByteLength(withoutName, budget);
			if (compactBytes <= budget) return {
				row: withoutName,
				bytes: compactBytes
			};
			const { pseudocode_absence: _absence, ...minimal } = withoutName;
			const minimalBytes = jsonValueByteLength(minimal, budget);
			return minimalBytes <= budget ? {
				row: minimal,
				bytes: minimalBytes
			} : undefined;
		};
		failureRecord = (procedure, body, reason, options = {}) => ({
			address: procedure.address,
			name: procedure.name,
			status: "failed",
			body: bodyRecord(body),
			failure: reason,
			...options.providerSource === undefined ? {} : { provider_source: options.providerSource },
			...options.pseudocodeAbsence === undefined ? {} : { pseudocode_absence: options.pseudocodeAbsence },
			...options.relativePath === undefined ? {} : { relative_path: options.relativePath },
			...options.limitations === undefined || options.limitations.length === 0 ? {} : { limitations: [...options.limitations] }
		});
		pseudocodeFailure = (pseudocode) => {
			if (pseudocode === null) return {
				code: "no_pseudocode",
				message: "The provider returned null pseudocode for this function."
			};
			return typeof pseudocode === "string" ? {
				code: "empty_pseudocode",
				message: "The provider returned no pseudocode."
			} : {
				code: "invalid_pseudocode",
				message: "The provider returned pseudocode that is not text."
			};
		};
		externalRecord = (procedure, body, limitations) => ({
			address: procedure.address,
			name: procedure.name,
			status: "external",
			body: bodyRecord(body),
			...limitations.length === 0 ? {} : { limitations: [...limitations] }
		});
		unavailableBody = (reason) => ({
			available: false,
			reason: reason.length === 0 ? "unavailable" : reason
		});
		retainedObservation = (session, address) => {
			const record = session.record(address);
			return {
				body: record?.body ?? unavailableBody("not rewritten"),
				options: record?.limitations === undefined ? {} : { limitations: record.limitations }
			};
		};
		exportLimitations = (layout, identity, collapsedDuplicates, unknownBodies, unaddressed) => [
			...layout === "dwarf" ? [DWARF_LAYOUT_UNAVAILABLE] : [],
			...identity.targetSha256 === null ? [TARGET_DIGEST_UNAVAILABLE] : [],
			...identity.analysisProfileDigest === null ? [PROFILE_UNAVAILABLE] : [],
			...collapsedDuplicates ? [DUPLICATE_ADDRESSES] : [],
			...unaddressed > 0 ? [unaddressedRows(unaddressed)] : [],
			...unknownBodies.count > 0 ? [unknownBodyRecords(unknownBodies)] : []
		];
		layoutStatus = (layout) => layout === "dwarf" ? "debug_layout_unavailable" : "address";
		manifestOf = (input) => {
			const requested = input.state.written + input.state.failed + input.state.external;
			const shown = input.state.failures.slice(0, 32);
			return {
				output_directory: input.root,
				index_path: join(input.root, DECOMPILE_DIRECTORY_INDEX_NAME),
				layout: input.input.layout,
				layout_status: layoutStatus(input.input.layout),
				counts: {
					selected: input.selected,
					excluded: input.excluded,
					requested,
					written: input.state.written,
					failed: input.state.failed,
					external: input.state.external,
					skipped: input.state.skipped,
					remaining: input.selected - input.state.skipped - requested
				},
				failures: shown,
				failures_omitted: input.state.failed - shown.length,
				provider: input.identity.provider,
				analysis_profile_digest: input.identity.analysisProfileDigest,
				target_sha256: input.identity.targetSha256,
				inventory_limitations: [...input.inventoryLimitations],
				limitations: [...input.limitations],
				resume: input.input.resume
			};
		};
		executionOptions = (signal) => ({
			...signal === undefined ? {} : { signal },
			selectorOrigin: "provider"
		});
		nodeAbsent = (cause) => typeof cause === "object" && cause !== null && "code" in cause && cause.code === "ENOENT";
	})))();
}

//#endregion
//#region dist/application/CallPathTracing.js
var traceCallPath, createTraceState, expandAddress, reconstructPath, recordEdge, projectTrace, compareAddress, sortedUniqueAddresses;
function init_CallPathTracing() {
	return (init_CallPathTracing = __esmMin((() => {
		init_CallRelationshipTraversal();
		init_analysisErrorProjection();
		init_analysisErrorCore();
		init_result();
		init_EnhancedToolTypes();
		init_ProcedureAddressResolution();
		init_relationshipCoverage();
		traceCallPath = async (call, callRelationship, input, signal) => {
			const start = await resolveProcedureAddress(call, input.start, signal);
			if (!start.ok) return start;
			let goal;
			if (input.goal !== undefined) {
				const resolved = await resolveProcedureAddress(call, input.goal, signal);
				if (!resolved.ok) return resolved;
				goal = resolved.value;
			}
			const resolvedInput = {
				start: start.value,
				...goal === undefined ? {} : { goal },
				direction: input.direction
			};
			if (isAborted(signal)) return err(cancelledBy("trace_call_path", signal));
			const state = createTraceState(resolvedInput);
			while (state.queueIndex < state.queue.length && state.traversalPath.length === 0) {
				if (isAborted(signal)) return err(cancelledBy("trace_call_path", signal));
				const address = state.queue[state.queueIndex++];
				if (address === undefined) break;
				const current = state.visited.get(address);
				if (current === undefined) continue;
				const expanded = await expandAddress(callRelationship, {
					input: resolvedInput,
					state,
					address,
					current,
					...signal === undefined ? {} : { signal }
				});
				if (!expanded.ok) {
					if (!expanded.error.cleanupIncomplete) return expanded;
					state.residual.add(cleanupStoppedTraversal(address, state.queue.length - state.queueIndex));
					return failedWithPartialResult(expanded.error, projectTrace(resolvedInput, state));
				}
				if (expanded.value) break;
			}
			if (isAborted(signal)) return err(cancelledBy("trace_call_path", signal));
			return ok(projectTrace(resolvedInput, state));
		};
		createTraceState = (input) => ({
			visited: new Map([[input.start, {
				address: input.start,
				depth: 0,
				parent: undefined
			}]]),
			queue: [input.start],
			edges: new Map(),
			failures: [],
			residual: new Set(),
			limitations: new Set(),
			relationshipCoverage: new Map(),
			discovery: "complete",
			queueIndex: 0,
			traversalPath: input.goal === input.start ? [input.start] : []
		});
		expandAddress = async (call, expansion) => {
			const { input, state, address, current, signal } = expansion;
			const { relation } = CALL_RELATIONSHIP_TRAVERSALS[input.direction];
			const read = await readCallRelationships(call, input.direction, address, signal);
			if (read.status !== "observed") {
				state.discovery = combineRelationshipDiscovery(state.discovery, null, relation);
			}
			if (read.status === "stopped" || read.status === "unavailable" && isAborted(signal)) return err(read.error);
			if (isAborted(signal)) return err(cancelledBy("trace_call_path", signal));
			if (read.status !== "observed") {
				state.failures.push({
					address,
					error: projectAnalysisError(read.error)
				});
				state.residual.add(`Call relationships were ${read.status} for ${address}.`);
				return ok(false);
			}
			const { execution, related } = read;
			for (const limitation of execution.limitations) state.limitations.add(limitation);
			const coverage = execution.relationshipCoverage ?? {
				status: "unknown",
				reason: "Provider did not report relationship coverage."
			};
			state.relationshipCoverage.set(address, coverage);
			state.discovery = combineRelationshipDiscovery(state.discovery, coverage, relation);
			for (const diagnostic of "diagnostics" in coverage && Array.isArray(coverage.diagnostics) ? coverage.diagnostics : []) state.limitations.add(diagnostic);
			if (coverage.status === "partial") for (const limitation of coverage.limitations) state.residual.add(`Call relationships for ${address} are limited: ${limitation}`);
			else if (coverage.status === "unknown") state.residual.add(`Call relationship coverage is unknown for ${address}: ${coverage.reason}`);
			for (const relatedAddress of sortedUniqueAddresses(related)) {
				recordEdge(input, state, {
					address,
					relatedAddress,
					discoveryDepth: current.depth + 1
				});
				if (state.visited.has(relatedAddress)) continue;
				const discovered = {
					address: relatedAddress,
					depth: current.depth + 1,
					parent: current
				};
				state.visited.set(relatedAddress, discovered);
				if (relatedAddress === input.goal) {
					state.traversalPath = reconstructPath(discovered);
					return ok(true);
				}
				state.queue.push(relatedAddress);
			}
			return ok(false);
		};
		reconstructPath = (goal) => {
			const path = [];
			for (let node = goal; node; node = node.parent) path.push(node.address);
			return path.reverse();
		};
		recordEdge = (input, state, edge) => {
			const sourceAddress = input.direction === "forward" ? edge.address : edge.relatedAddress;
			const targetAddress = input.direction === "forward" ? edge.relatedAddress : edge.address;
			const edgeKey = `${sourceAddress}\u0000${targetAddress}`;
			if (state.edges.has(edgeKey)) return;
			state.edges.set(edgeKey, {
				source_address: sourceAddress,
				target_address: targetAddress,
				discovery_depth: edge.discoveryDepth
			});
		};
		projectTrace = (input, state) => {
			const observedGoalStatus = input.goal === undefined ? "not_requested" : state.traversalPath.length > 0 ? "reached" : state.residual.size > 0 ? "unknown" : "not_reached";
			return {
				start: input.start,
				goal: input.goal ?? null,
				direction: input.direction,
				goal_status: observedGoalStatus === "not_reached" && state.discovery !== "complete" ? "unknown" : observedGoalStatus,
				search_scope: {
					graph: "provider_observed_graph",
					discovery: state.discovery,
					observed_goal_status: observedGoalStatus
				},
				nodes: [...state.visited.entries()].map(([address, { depth }]) => ({
					address,
					depth
				})).sort((left, right) => left.depth - right.depth || compareAddress(left.address, right.address)),
				edges: [...state.edges.values()].sort((left, right) => left.discovery_depth - right.discovery_depth || compareAddress(left.source_address, right.source_address) || compareAddress(left.target_address, right.target_address)),
				traversal_path: state.traversalPath,
				failures: state.failures,
				traversal: { nodes_visited: state.visited.size },
				relationship_coverage: Object.fromEntries([...state.relationshipCoverage.entries()].sort(([left], [right]) => compareAddress(left, right))),
				truncated: state.residual.size > 0,
				residual_unknowns: [...state.residual],
				limitations: ["Direct provider call relationships may omit unresolved indirect calls.", ...state.limitations]
			};
		};
		compareAddress = (left, right) => left < right ? -1 : left > right ? 1 : 0;
		sortedUniqueAddresses = (addresses) => [...new Set(addresses)].sort(compareAddress);
	})))();
}

//#endregion
//#region dist/application/EnhancedLiteralTracing.js
var traceLiteralFeature, literalMatches, traceReferences;
function init_EnhancedLiteralTracing() {
	return (init_EnhancedLiteralTracing = __esmMin((() => {
		init_nativeOperationFacts();
		init_AnalysisOperationFacts();
		init_analysisErrorCore();
		init_nativeObservation();
		init_result();
		traceLiteralFeature = async (analysis, input, signal) => {
			const observe = (name, arguments_, operationSignal) => analysis.execute(name, arguments_, operationSignal === undefined ? {} : { signal: operationSignal });
			const call = async (name, arguments_, operationSignal) => {
				const observed = await observe(name, arguments_, operationSignal);
				return observed.ok ? ok(observed.value.result) : observed;
			};
			const searched = await literalMatches(analysis, input, signal);
			if (!searched.ok) return searched;
			const traced = await traceReferences(call, observe, {
				matches: searched.value.matches,
				...signal === undefined ? {} : { signal }
			});
			if (!traced.ok) return traced;
			return ok({
				query: input.query,
				search_mode: "literal",
				matches: searched.value.matches,
				references: traced.value.references,
				truncated: traced.value.truncated,
				residual_unknowns: traced.value.residual
			});
		};
		literalMatches = async (analysis, input, signal) => {
			const parameters = {
				pattern: input.query,
				mode: "literal",
				case_sensitive: input.case_sensitive
			};
			const options = signal === undefined ? {} : { signal };
			const strings = await executeFact(analysis, searchStringsFact, parameters, options);
			if (!strings.ok) return strings;
			const procedures = await executeFact(analysis, searchProceduresFact, parameters, options);
			if (!procedures.ok) return procedures;
			return ok({ matches: [...strings.value.fact.map((item) => ({
				...item,
				type: "string"
			})), ...procedures.value.fact.map((item) => ({
				...item,
				type: "procedure"
			}))] });
		};
		traceReferences = async (call, observe, request) => {
			const references = [];
			const residual = [];
			let truncated = false;
			const tracedTargets = new Set();
			const containing = new Map();
			const imageCoverageGaps = new Set();
			for (const match of request.matches) {
				if (tracedTargets.has(match.address)) continue;
				tracedTargets.add(match.address);
				const observed = await observe("xrefs", { address: match.address }, request.signal);
				if (!observed.ok) return observed;
				if (observed.value.referencesTruncated === true) {
					truncated = true;
					residual.push(`References to ${match.address} were truncated by the provider; additional references may exist.`);
				}
				for (const gap of observed.value.referenceCoverageGaps ?? []) {
					if (gap.scope === "observation") {
						residual.push(`References to ${match.address}: ${gap.description}`);
					} else {
						const key = JSON.stringify([observed.value.provider.id, gap.code]);
						if (!imageCoverageGaps.has(key)) {
							imageCoverageGaps.add(key);
							residual.push(gap.description);
						}
					}
				}
				const sources = observed.value.result;
				if (!Array.isArray(sources)) return err(new AnalysisOutputError("xrefs", "provider returned a non-array result"));
				const classifications = new Map();
				for (const fact of observed.value.referenceClassifications ?? []) {
					if (fact.targetAddress !== match.address) continue;
					const values = classifications.get(fact.sourceAddress) ?? [];
					values.push({
						kind: fact.kind,
						provenance: fact.provenance,
						width: fact.width
					});
					classifications.set(fact.sourceAddress, values);
				}
				for (const source of sources) {
					if (typeof source !== "string") return err(new AnalysisOutputError("xrefs", "provider returned a non-address value"));
					let containingProcedure = containing.get(source);
					if (containingProcedure === undefined) {
						const resolved = await call("resolve_containing_procedure", { address: source }, request.signal);
						if (!resolved.ok) {
							if (!(resolved.error instanceof AnalysisCapabilityUnavailableError) || resolved.error.operation !== "resolve_containing_procedure" || resolved.error.cleanupIncomplete || resolved.error.retryable) return resolved;
							if (request.signal?.aborted === true) return err(cancelledBy("trace_feature", request.signal));
							containingProcedure = {
								query_address: source,
								status: "unavailable",
								provider_id: resolved.error.providerId,
								reason: resolved.error.reason
							};
							residual.push(`Containing procedure for ${source} is unavailable: ${resolved.error.reason}`);
						} else {
							const parsed = parseContainingProcedureResolution(resolved.value);
							if (!parsed.ok) return parsed;
							containingProcedure = parsed.value;
						}
						containing.set(source, containingProcedure);
					}
					references.push({
						target_address: match.address,
						source_address: source,
						containing_procedure: containingProcedure,
						...classifications.has(source) ? { source_classifications: classifications.get(source) } : {}
					});
				}
			}
			return ok({
				references,
				residual,
				truncated
			});
		};
	})))();
}

//#endregion
//#region dist/application/native/NativeApiInspection.js
var unavailableBoundary, projectNativeApiInspection, availableResidualUnknowns;
function init_NativeApiInspection() {
	return (init_NativeApiInspection = __esmMin((() => {
		init_nativeApiBoundary();
		unavailableBoundary = () => ({
			available: false,
			reason: "The selected provider did not expose a structured native API boundary model.",
			residual_unknowns: ["What are the function's return and parameter boundary types?", "Does this function dispatch through a jump table with recoverable data addresses?"]
		});
		projectNativeApiInspection = (dossier) => {
			const boundary = dossier.native_api ?? unavailableBoundary();
			const unsupportedBranches = boundary.available ? [] : ["structured-boundary-types", "jump-table-data-mapping"];
			const residualUnknowns = boundary.available ? availableResidualUnknowns(boundary) : boundary.residual_unknowns;
			return nativeApiInspectionResultSchema.parse({
				procedure: {
					address: dossier.procedure.address,
					name: dossier.procedure.name
				},
				boundary,
				substeps: [
					{
						operation: "analyze_function",
						status: "completed",
						observations: [
							"provider function dossier",
							"provider pseudocode classification",
							"provider control-flow observations"
						]
					},
					{
						operation: "project_native_api_boundary",
						status: boundary.available ? "completed" : "unsupported",
						observations: boundary.available ? [
							"return and parameter boundary types",
							"confidence and inference evidence",
							"jump-table dispatch, data, and target addresses"
						] : [boundary.reason]
					},
					{
						operation: "preserve_residual_unknowns",
						status: "completed",
						observations: residualUnknowns.length === 0 ? ["no additional structured-boundary unknowns"] : residualUnknowns
					}
				],
				unsupported_branches: unsupportedBranches,
				residual_unknowns: residualUnknowns
			});
		};
		availableResidualUnknowns = (boundary) => {
			const unknowns = [];
			for (const table of boundary.jump_tables) {
				if (table.default_targets.length === 0) unknowns.push(`Which default or out-of-range path, if any, belongs to the dispatch at ${table.dispatch_address}?`);
				if (table.mappings.length === 0) unknowns.push(`Which case values and targets belong to the dispatch at ${table.dispatch_address}?`);
				if (table.data_sources.length === 0) unknowns.push(`What backing data address produced the jump table dispatched at ${table.dispatch_address}?`);
				if (table.data_sources.some(({ entry_count: count, entry_size_bytes: size }) => count === null || size === null)) unknowns.push(`What are the exact entry size and count for candidate jump-table data dispatched at ${table.dispatch_address}?`);
				if (table.mappings.some(({ case_value: value }) => value === null)) unknowns.push(`Which source-level case values correspond to every target dispatched at ${table.dispatch_address}?`);
			}
			for (const value of [boundary.return_type, ...boundary.parameters]) {
				if (value.confidence === "low") unknowns.push(`Can the inferred ${value.role} type ${value.data_type} be confirmed with imported metadata or an ABI probe?`);
			}
			return [...new Set(unknowns)];
		};
	})))();
}

//#endregion
//#region dist/application/EnhancedTools.js
var missingPseudocodeError, batchDecompileResult, EnhancedTools, addressedNames;
function init_EnhancedTools() {
	return (init_EnhancedTools = __esmMin((() => {
		init_boundedList();
		init_CapabilityFallback();
		init_inventoryCoverage();
		init_CallRelationshipTraversal();
		init_enhancedInputs();
		init_analysisErrorCore();
		init_analysisErrorProjection();
		init_functionDossier();
		init_nativeOperationFacts();
		init_AnalysisOperationFacts();
		init_nativeSegments();
		init_result();
		init_symbolAnalysis();
		init_NativeDispatchMetadataInspection();
		init_NativeValueTrace();
		init_NativeUiActionTrace();
		init_decompileAll();
		init_jsonValue();
		init_objcSwiftMetadata();
		init_binaryTargetTypes();
		init_unicodeCodePointOrder();
		init_machoTargetSelection();
		init_EnhancedToolTypes();
		init_AnalysisDocument();
		init_CallPathTracing();
		init_XrefsAddressResolution();
		init_ProcedureAddressResolution();
		init_EnhancedLiteralTracing();
		init_NativeApiInspection();
		missingPseudocodeError = (pseudocode) => new AnalysisOutputError("procedure_pseudo_code", typeof pseudocode === "string" ? "provider returned empty pseudocode" : "provider returned non-text pseudocode");
		batchDecompileResult = (items) => {
			const succeeded = items.filter(({ status }) => status === "ok").length;
			return {
				items,
				total: items.length,
				succeeded,
				failed: items.length - succeeded
			};
		};
		EnhancedTools = class {
			analysis;
			constructor(analysis) {
				this.analysis = analysis;
			}
			/** Parse direct workflow input and dispatch it with schema defaults. */
			execute(name, input, signal) {
				switch (name) {
					case "binary_overview": {
						const parsed = enhancedInputSchemas.binary_overview.safeParse(input);
						return parsed.success ? this.executeValidated({
							name,
							input: parsed.data
						}, signal) : invalidEnhancedInput(name, parsed.error, input);
					}
					case "inspect_native_api": {
						const parsed = enhancedInputSchemas.inspect_native_api.safeParse(input);
						return parsed.success ? this.executeValidated({
							name,
							input: parsed.data
						}, signal) : invalidEnhancedInput(name, parsed.error, input);
					}
					case "inspect_native_dispatch_metadata": {
						const parsed = enhancedInputSchemas.inspect_native_dispatch_metadata.safeParse(input);
						return parsed.success ? this.executeValidated({
							name,
							input: parsed.data
						}, signal) : invalidEnhancedInput(name, parsed.error, input);
					}
					case "trace_feature": {
						const parsed = enhancedInputSchemas.trace_feature.safeParse(input);
						return parsed.success ? this.executeValidated({
							name,
							input: parsed.data
						}, signal) : invalidEnhancedInput(name, parsed.error, input);
					}
					case "trace_native_values": {
						const parsed = enhancedInputSchemas.trace_native_values.safeParse(input);
						return parsed.success ? this.executeValidated({
							name,
							input: parsed.data
						}, signal) : invalidEnhancedInput(name, parsed.error, input);
					}
					case "trace_native_ui_action": {
						const parsed = enhancedInputSchemas.trace_native_ui_action.safeParse(input);
						return parsed.success ? this.executeValidated({
							name,
							input: parsed.data
						}, signal) : invalidEnhancedInput(name, parsed.error, input);
					}
					case "decompile_all": {
						const parsed = enhancedInputSchemas.decompile_all.safeParse(input);
						return parsed.success ? this.executeValidated({
							name,
							input: parsed.data
						}, signal) : invalidEnhancedInput(name, parsed.error, input);
					}
				}
			}
			/** Dispatch input already parsed by a trusted adapter boundary. */
			executeValidated(call, signal) {
				switch (call.name) {
					case "inspect_native_dispatch_metadata": return inspectNativeDispatch(this.analysis, call.input.max_records, {
						signal,
						objcClassImportAddresses: call.input.objc_class_import_addresses,
						objcClassImportAddressesComplete: call.input.objc_class_import_addresses_complete,
						maxInputBytes: call.input.max_input_bytes
					});
					case "get_objc_classes": return this.#objcClasses(call.input.pattern, signal);
					case "get_objc_protocols": return this.#objcProtocols(signal);
					case "batch_decompile": return this.#batchDecompile(call.input.addresses, signal);
					case "decompile_all": return decompileAll(this.analysis, call.input, signal);
					case "get_call_graph": return this.#callGraph(call.input, signal);
					case "analyze_swift_types": return this.#analyzeSwiftTypes(call.input, signal);
					case "find_xrefs_to_name": return this.#findXrefs(call.input.name, signal);
					case "binary_overview": return this.#binaryOverview(signal);
					case "analyze_function": return this.#analyzeFunction(call.input, signal);
					case "inspect_native_api": return this.#inspectNativeApi(call.input, signal);
					case "trace_feature": return traceLiteralFeature(this.#observed, call.input, signal);
					case "trace_call_path": return traceCallPath((name, arguments_, operationSignal, selectorOrigin) => this.#call(name, arguments_, operationSignal, selectorOrigin), (name, arguments_, operationSignal, selectorOrigin) => this.#observe(name, arguments_, operationSignal, selectorOrigin), call.input, signal);
					case "trace_native_values": return traceNativeValues(this.analysis, call.input, signal);
					case "trace_native_ui_action": {
						return traceNativeUiAction(this.analysis, call.input, signal);
					}
				}
			}
			async #analyzeFunction(input, signal) {
				const result = await this.#call("analyze_function", input, signal);
				return result.ok ? parseFunctionDossier(result.value) : result;
			}
			async #inspectNativeApi(input, signal) {
				const result = await this.#call("analyze_function", input, signal);
				if (!result.ok) return result;
				const parsed = parseFunctionDossier(result.value);
				if (!parsed.ok) return parsed;
				return ok(jsonValueSchema.parse(projectNativeApiInspection(parsed.value)));
			}
			async #objcClasses(pattern, signal) {
				const inventory = await executeFact(this.#observed, listNamesFact, {}, signal === undefined ? {} : { signal });
				if (!inventory.ok) return inventory;
				const namesExecution = inventory.value.execution;
				const candidates = selectObjcClassCandidates(addressedNames(inventory.value.fact), pattern);
				if (candidates.length === 0) return ok(projectObjcClassCandidates(candidates, {
					bindings: [],
					coverage: {
						status: "not_applicable",
						reason: null
					}
				}));
				const addresses = [...new Set(candidates.map(({ address }) => address))];
				const scanned = boundedList(addresses, MAX_DISPATCH_METADATA_RECORDS);
				const bindingsExecution = await this.#observe("inspect_native_dispatch_metadata", {
					max_records: MAX_DISPATCH_METADATA_RECORDS,
					objc_class_import_addresses: [...scanned.items],
					objc_class_import_addresses_complete: scanned.omitted === 0
				}, signal);
				if (!bindingsExecution.ok) {
					if (!permitsCapabilityFallback(bindingsExecution.error)) return bindingsExecution;
					return ok(projectObjcClassCandidates(candidates, {
						bindings: [],
						coverage: {
							status: "unknown",
							reason: bindingsExecution.error.reason
						}
					}));
				}
				const native = nativeDispatchMetadataResultSchema.safeParse(bindingsExecution.value.result);
				const nameSubject = namesExecution.subject;
				const bindingSubject = bindingsExecution.value.subject;
				const namesSelection = profileMachoTargetSelection(namesExecution.analysisProfile);
				const nativeSelection = native.success ? native.data.result.target_selection : undefined;
				if (!native.success || nameSubject === null || nameSubject === undefined || bindingSubject === null || bindingSubject === undefined || nameSubject.sha256 !== bindingSubject.sha256 || nameSubject.architecture === undefined || bindingSubject.architecture === undefined || nameSubject.architecture !== bindingSubject.architecture || !isMachOFormat(nameSubject.format) || nameSubject.format !== bindingSubject.format || native.data.target_sha256 !== nameSubject.sha256 || native.data.target_architecture !== nameSubject.architecture || native.data.provider.id !== bindingsExecution.value.provider.id || namesExecution.analysisProfile?.provider.id !== namesExecution.provider.id || nativeSelection === undefined || !machoTargetSelectionMatchesArchitecture(nativeSelection, nameSubject.architecture) || !machoTargetSelectionMatchesFormat(nativeSelection, nameSubject.format) || !sameMachoTargetSelection(namesSelection, nativeSelection) || native.data.result.objc_class_import_bindings === undefined || native.data.result.objc_class_import_binding_coverage === undefined) return ok(projectObjcClassCandidates(candidates, {
					bindings: [],
					coverage: {
						status: "unknown",
						reason: "Native class-import facts did not prove matching artifact, architecture, and complete producer identity."
					}
				}));
				const coverage = native.data.result.objc_class_import_binding_coverage;
				const inventoryLimitations = namesExecution.limitations;
				const inventoryIncomplete = inventoryLimitations.length > 0;
				const coverageReason = [coverage.reason, ...inventoryLimitations.map((limitation) => `list_names: ${limitation}`)].filter((reason) => reason !== null).join("; ");
				return ok(projectObjcClassCandidates(candidates, {
					bindings: native.data.result.objc_class_import_bindings,
					coverage: {
						status: coverage.status === "not_requested" ? "unknown" : coverage.status === "complete" && inventoryIncomplete ? "partial" : coverage.status,
						reason: coverageReason.length === 0 ? null : coverageReason
					}
				}));
			}
			async #objcProtocols(signal) {
				const names = await this.#allAddressed("list_names", signal);
				return names.ok ? ok(discoverObjcProtocols(names.value)) : names;
			}
			async #batchDecompile(addresses, signal) {
				const resolutions = [];
				for (const address of addresses) {
					const result = await resolveProcedureAddress(this.#call.bind(this), address, signal);
					if (!result.ok && stopsTraversal(result.error)) return result;
					resolutions.push({
						address,
						result
					});
				}
				const identities = await this.#batchIdentities(resolutions, signal);
				if (!identities.ok) return identities;
				return this.#batchPseudocode(identities.value, signal);
			}
			async #batchIdentities(resolutions, signal) {
				const ready = [];
				for (const { address, result } of resolutions) {
					if (!result.ok) {
						ready.push({
							address,
							providerProcedure: address,
							procedure: {
								status: "unknown",
								error: projectAnalysisError(result.error)
							}
						});
						continue;
					}
					const identity = await this.#batchProcedureIdentity(result.value, signal);
					if (!identity.ok) return identity;
					ready.push({
						address,
						providerProcedure: result.value,
						procedure: identity.value
					});
				}
				return ok(ready);
			}
			async #batchPseudocode(ready, signal) {
				const items = [];
				for (const { address, procedure, providerProcedure } of ready) {
					const observed = await this.#observe("procedure_pseudo_code", { procedure: providerProcedure }, signal, procedure.status === "resolved" ? "provider" : undefined);
					if (!observed.ok) {
						if (stopsTraversal(observed.error)) return items.length > 0 || observed.error.cleanupIncomplete ? failedWithPartialResult(observed.error, batchDecompileResult(items)) : err(observed.error);
						items.push({
							address,
							procedure,
							status: "error",
							error: projectAnalysisError(observed.error)
						});
						continue;
					}
					const { result: pseudocode, pseudocodeAbsence } = observed.value;
					const limitations = [...new Set(observed.value.limitations)];
					const itemLimitations = limitations.length === 0 ? {} : { limitations };
					if (typeof pseudocode === "string" && pseudocode.length > 0) {
						items.push({
							address,
							procedure,
							status: "ok",
							pseudocode,
							...itemLimitations
						});
						continue;
					}
					if (pseudocode === null) {
						items.push({
							address,
							procedure,
							status: "unavailable",
							reason: "no_pseudocode",
							...pseudocodeAbsence === undefined ? {} : { pseudocode_absence: pseudocodeAbsence },
							...itemLimitations
						});
						continue;
					}
					items.push({
						address,
						procedure,
						status: "error",
						error: projectAnalysisError(missingPseudocodeError(pseudocode)),
						...itemLimitations
					});
				}
				return ok(batchDecompileResult(items));
			}
			async #batchProcedureIdentity(address, signal) {
				const observed = await this.#call("address_name", { address }, signal);
				if (!observed.ok && stopsTraversal(observed.error)) return err(observed.error);
				const named = observed.ok && (typeof observed.value === "string" || observed.value === null);
				return ok({
					status: "resolved",
					address,
					name: named ? observed.value : null,
					...named ? {} : { name_error: projectAnalysisError(observed.ok ? new AnalysisOutputError("address_name", "provider returned an invalid entry label") : observed.error) }
				});
			}
			async #callGraph(input, signal) {
				const limitations = new Set();
				const resolved = await this.#observe("procedure_address", { procedure: input.address }, signal);
				if (!resolved.ok) return resolved;
				for (const limitation of resolved.value.limitations) limitations.add(limitation);
				const parsedAddress = parseProcedureAddress(resolved.value.result);
				if (!parsedAddress.ok) return parsedAddress;
				const startAddress = parsedAddress.value;
				const discovered = new Set([startAddress]);
				const queue = [{
					address: startAddress,
					depth: 0
				}];
				let queueIndex = 0;
				const graph = {};
				const sortedLimitations = () => [...limitations].sort(compareUnicodeCodePoints);
				while (queueIndex < queue.length) {
					const current = queue[queueIndex++];
					if (current === undefined) continue;
					const read = await readCallRelationships(this.#observe.bind(this), input.direction, current.address, signal);
					if (read.status === "stopped") {
						if (!read.error.cleanupIncomplete) return err(read.error);
						limitations.add(cleanupStoppedTraversal(current.address, queue.length - queueIndex));
						return failedWithPartialResult(read.error, {
							graph,
							limitations: sortedLimitations()
						});
					}
					const nodes = graph[String(current.depth)] ??= [];
					if (read.status !== "observed") {
						nodes.push({
							address: current.address,
							status: "error",
							error: projectAnalysisError(read.error)
						});
						continue;
					}
					const { execution, related } = read;
					for (const limitation of execution.limitations) limitations.add(limitation);
					const reportedCoverage = execution.relationshipCoverage;
					const coverage = reportedCoverage ?? {
						status: "unknown",
						reason: "Provider did not report relationship coverage."
					};
					const relationshipLimitations = reportedCoverage === undefined ? [...execution.limitations, "Provider did not report relationship coverage."] : [...reportedCoverage.status === "partial" ? reportedCoverage.limitations : reportedCoverage.status === "unknown" ? [reportedCoverage.reason] : [], ..."diagnostics" in reportedCoverage ? reportedCoverage.diagnostics : []];
					const nodeLimitations = [...new Set(relationshipLimitations)].sort(compareUnicodeCodePoints);
					nodes.push({
						address: current.address,
						status: "ok",
						calls: [...related],
						relationship_coverage: coverage,
						...nodeLimitations.length === 0 ? {} : { limitations: nodeLimitations }
					});
					for (const address of related) {
						if (!discovered.has(address)) {
							discovered.add(address);
							queue.push({
								address,
								depth: current.depth + 1
							});
						}
					}
				}
				return ok({
					graph,
					limitations: sortedLimitations()
				});
			}
			async #analyzeSwiftTypes(input, signal) {
				const procedures = await this.#allAddressed("list_procedures", signal);
				if (!procedures.ok) return procedures;
				const symbols = await this.#allAddressed("list_names", signal);
				if (!symbols.ok && !permitsCapabilityFallback(symbols.error)) return symbols;
				const result = categorizeSwiftTypes(procedures.value, input, symbols.ok ? symbols.value : []);
				return ok(symbols.ok ? result : {
					...result,
					symbol_inventory_error: projectAnalysisError(symbols.error),
					limitations: [...result.limitations, "The provider's symbol inventory is unavailable; demangled procedures could not be joined to their Swift aliases."]
				});
			}
			async #findXrefs(name, signal) {
				const resolved = await resolveXrefsName(this.analysis, name, signal, "find_xrefs_to_name");
				if (!resolved.ok) return resolved;
				if (resolved.value === null) return ok({
					status: "unresolved",
					name,
					reason: "name_not_found"
				});
				const xrefs = await this.#call("xrefs", { address: resolved.value }, signal);
				if (!xrefs.ok) return xrefs;
				if (!Array.isArray(xrefs.value) || xrefs.value.some((xref) => typeof xref !== "string")) return err(new AnalysisOutputError("xrefs", "provider returned an invalid address list"));
				return ok({
					status: "resolved",
					name,
					address: resolved.value,
					xrefs: xrefs.value
				});
			}
			async #binaryOverview(signal) {
				const direct = await this.#call("read_binary_inventory_summary", {}, signal);
				if (direct.ok) return ok(withOverviewInventoryCoverage(direct.value));
				if (!permitsCapabilityFallback(direct.error)) return direct;
				const document = await resolveAnalysisDocument(this.analysis, undefined, signal);
				if (!document.ok) return document;
				const options = signal === undefined ? {} : { signal };
				const [segmentsResult, proceduresResult, stringsResult] = await Promise.all([
					this.#call("list_segments", {}, signal),
					executeFact(this.#observed, listProceduresFact, {}, options),
					executeFact(this.#observed, listStringsFact, {}, options)
				]);
				if (!segmentsResult.ok && !permitsCapabilityFallback(segmentsResult.error)) return segmentsResult;
				if (!proceduresResult.ok) return proceduresResult;
				if (!stringsResult.ok) return stringsResult;
				const segments = segmentsResult.ok ? parseSegments(segmentsResult.value) : undefined;
				if (segments !== undefined && !segments.ok) return segments;
				return ok(withOverviewInventoryCoverage(projectBinaryOverview({
					document: document.value,
					...segments?.ok ? { segments: segments.value } : {},
					procedure_count: proceduresResult.value.fact.length,
					string_count: stringsResult.value.fact.length
				})));
			}
			async #allAddressed(tool, signal) {
				const inventory = await executeFact(this.#observed, tool === "list_names" ? listNamesFact : listProceduresFact, {}, signal === undefined ? {} : { signal });
				return inventory.ok ? ok(addressedNames(inventory.value.fact)) : inventory;
			}
			/** This tool's port: every call goes through `#observe`'s cancellation checks. */
			#observed = { execute: (name, arguments_, options) => this.#observe(name, arguments_, options?.signal, options?.selectorOrigin) };
			async #call(name, arguments_, signal, selectorOrigin) {
				const execution = await this.#observe(name, arguments_, signal, selectorOrigin);
				return execution.ok ? ok(execution.value.result) : execution;
			}
			async #observe(name, arguments_, signal, selectorOrigin) {
				if (isAborted(signal)) return err(cancelledBy(name, signal));
				const execution = await this.analysis.execute(name, arguments_, {
					...signal === undefined ? {} : { signal },
					...selectorOrigin === undefined ? {} : { selectorOrigin }
				});
				if (!execution.ok) return execution;
				if (isAborted(signal)) return err(cancelledBy(name, signal));
				return execution;
			}
		};
		addressedNames = (rows) => rows.map(({ address, value: name, objc_class_label }) => ({
			address,
			name,
			...objc_class_label === undefined ? {} : { objc_class_label }
		}));
	})))();
}

//#endregion
init_EnhancedTools();
export { EnhancedTools };