import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisCancelledError, AnalysisError, AnalysisInputError, AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, ArtifactOperationError, cancelledBy, carriedReason, init_analysisErrorBase, init_analysisErrorCore, init_artifactOperationError, init_isRecord, init_jsonValue, isRecord, jsonValueValidationSteps } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ArtifactReaderFailure, artifactFileCancellationCause, artifactFilePrimaryFacts, init_ArtifactFileOperation, init_ArtifactReader, init_RegularFile, init_StableArtifactFailure, init_readStableArtifact, init_resources, isSelectedRegularFileError, projectStableArtifactFailure, readStableArtifact, readerIntegrityFailure, stableArtifactInputRecovery } from "./resources-B3P64jvH.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { Budget, escapeJsonPointerToken, init_budget, init_jsonPointer } from "./jsonPointer-aolC6MvJ.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { init_JsonInputFile, init_Utf8JsonInput, nativeJsonParseRequiredBytes, parseUtf8Json } from "./JsonInputFile-DOw6KI2x.js";
import { init_recordedTransportUrl, parseRecordedTransportUrl } from "./browserObservation-BVcDYwHI.js";
import { API_CONTRACT_FACT_BYTES, API_CONTRACT_OPERATION, API_CONTRACT_PROVIDER, apiContractSchema, init_apiContract } from "./graphqlContract-CtyDSGFM.js";
import { init_apiContractQuery, inspectApiContractInputSchema } from "./apiContractQuery-BiMZBchi.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { setImmediate } from "node:timers/promises";
import { getHeapStatistics } from "node:v8";

//#region dist/domain/apiContract/parseApiContract.js
function* additionalOperations(value, context) {
	const { inventory, path, pointer, hasReference } = context;
	const operations = record(value);
	if (operations === undefined) return inventory.diagnostic("invalid-additional-operations", pointer, "additionalOperations must be an object mapping HTTP method tokens to Operation Objects.");
	let examined = 0;
	for (const method in operations) {
		if (!Object.hasOwn(operations, method)) continue;
		if (examined++ % 128 === 0) yield;
		const admitted = inventory.reserve(512 + method.length * 24);
		if (!admitted.ok) return admitted;
		const source = `${pointer}/${escapeJsonPointerToken(method)}`;
		const reserved = reservedAdditionalMethods.has(method);
		const added = !httpToken.test(method) || reserved ? inventory.diagnostic("invalid-additional-method", source, "The additional HTTP method is not a token or duplicates a fixed method; it is not treated as a valid operation.") : inventory.operation(operations[method], {
			path,
			method,
			pointer: source,
			hasReference
		});
		if (!added.ok) return added;
	}
	return ok(undefined);
}
function* pathItem(value, context) {
	const { inventory, path, pointer, modern } = context;
	const item = record(value);
	if (item === undefined) return inventory.diagnostic("invalid-path-item", pointer, "Path Item must be an object; its operations are unknown.");
	const hasReference = Object.hasOwn(item, "$ref");
	if (hasReference) {
		const added = inventory.reference(path, `${pointer}/$ref`, item.$ref);
		if (!added.ok) return added;
	}
	const fixedMethods = modern ? modernMethods : methods;
	let examined = 0;
	for (const key in item) {
		if (!Object.hasOwn(item, key)) continue;
		if (examined++ % 128 === 0) yield;
		if (fixedMethods.includes(key)) {
			const added = inventory.operation(item[key], {
				path,
				method: key.toUpperCase(),
				pointer: `${pointer}/${key}`,
				hasReference
			});
			if (!added.ok) return added;
		} else if (key === "additionalOperations" && modern) {
			const added = yield* additionalOperations(item[key], {
				inventory,
				path,
				pointer: `${pointer}/${key}`,
				hasReference
			});
			if (!added.ok) return added;
		} else if (!pathMetadata.has(key) && !key.startsWith("x-")) {
			const admitted = inventory.reserve(512 + key.length * 24);
			if (!admitted.ok) return admitted;
			const diagnosed = inventory.diagnostic("unknown-path-item-field", `${pointer}/${escapeJsonPointerToken(key)}`, "This field is not an operation or a recognized Path Item field in the selected OpenAPI minor version.");
			if (!diagnosed.ok) return diagnosed;
		}
	}
	return ok(undefined);
}
function* collectPaths(sourcePaths, inventory, context, modern) {
	for (const path in sourcePaths) {
		if (!Object.hasOwn(sourcePaths, path) || path.startsWith("x-")) continue;
		yield;
		const admitted = inventory.reserve(512 + path.length * 16);
		if (!admitted.ok) return admitted;
		const pointer = `/paths/${escapeJsonPointerToken(path)}`;
		const read = path.startsWith("/") ? yield* pathItem(sourcePaths[path], {
			inventory,
			path,
			pointer,
			modern
		}) : inventory.diagnostic("invalid-path-key", pointer, "A Paths entry must start with /; it was not interpreted as an endpoint.");
		if (!read.ok) return read;
		context.examined++;
	}
	return ok(undefined);
}
/** Enumerate declarations only; never resolve references, servers, callbacks or runtime expressions. */
function* parseApiContractSteps(value, artifact) {
	const root = record(value);
	if (root === undefined || typeof root.openapi !== "string") return err(new AnalysisInputError(API_CONTRACT_OPERATION, undefined, [{
		path: ["path"],
		reason: "invalid_format",
		message: "Expected an OpenAPI JSON object with an openapi version string."
	}]));
	const version = /^3\.([012])\.(?:0|[1-9][0-9]*)$/u.exec(root.openapi);
	if (version === null) return err(new AnalysisUnsupportedTargetError(API_CONTRACT_OPERATION, artifact.path, "Only OpenAPI 3.0, 3.1 and 3.2 JSON documents are supported."));
	const inventory = new ContractInventory(artifact);
	const versionAdmitted = inventory.reserve(root.openapi.length * 12);
	if (!versionAdmitted.ok) return versionAdmitted;
	const info = infoFacts(root, inventory);
	if (!info.ok) return info;
	const paths = record(root.paths);
	const pathsState = paths !== undefined ? "object" : Object.hasOwn(root, "paths") ? "malformed" : "absent";
	const context = {
		openapi: root.openapi,
		info: info.value,
		pathsState,
		examined: 0
	};
	const interrupted = (error) => {
		const retainedRows = inventory.operations.length + inventory.references.length + inventory.diagnostics.length;
		if (retainedRows > 0) error.retainPartialObservation(contractReport(inventory, context, true));
		return err(error);
	};
	if (pathsState === "malformed" || pathsState === "absent" && version[1] === "0") {
		const diagnosed = inventory.diagnostic("invalid-paths", "/paths", "paths must be an object and is required for OpenAPI 3.0; a missing or malformed inventory is not proof of zero operations.");
		if (!diagnosed.ok) return interrupted(diagnosed.error);
	}
	try {
		const read = yield* collectPaths(paths ?? {}, inventory, context, version[1] === "2");
		if (!read.ok) return interrupted(read.error);
	} catch (cause) {
		if (cause instanceof AnalysisCancelledError) return interrupted(cause);
		throw cause;
	}
	return ok(contractReport(inventory, context));
}
var methods, modernMethods, reservedAdditionalMethods, pathMetadata, httpToken, record, identity, ContractInventory, infoFacts, contractReport;
function init_parseApiContract() {
	return (init_parseApiContract = __esmMin((() => {
		init_budget();
		init_jsonPointer();
		init_analysisErrorCore();
		init_canonicalDigest();
		init_result();
		init_recordedTransportUrl();
		init_apiContract();
		methods = [
			"get",
			"put",
			"post",
			"delete",
			"options",
			"head",
			"patch",
			"trace"
		];
		modernMethods = [...methods, "query"];
		reservedAdditionalMethods = new Set(modernMethods.map((method) => method.toUpperCase()));
		pathMetadata = new Set([
			"$ref",
			"summary",
			"description",
			"servers",
			"parameters"
		]);
		httpToken = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/u;
		record = (value) => isRecord(value) ? value : undefined;
		identity = (prefix, facts) => `${prefix}_${digestCanonicalValue(facts)}`;
		ContractInventory = class {
			artifact;
			operations = [];
			references = [];
			diagnostics = [];
			#retainedBytes = new Budget(API_CONTRACT_FACT_BYTES);
			constructor(artifact) {
				this.artifact = artifact;
			}
			reserve(bytes) {
				return this.#retainedBytes.tryCharge(bytes) ? ok(undefined) : err(new AnalysisResourceConstraintError(API_CONTRACT_OPERATION, "memory", "API contract declarations exceed the retained-facts representation allowance.", { representation_bytes: API_CONTRACT_FACT_BYTES }, {
					retryable: false,
					remediationAction: "Select a smaller complete API document; paging the reply does not increase the parser's retained-facts allowance."
				}));
			}
			diagnostic(code, pointer, message) {
				const admitted = this.reserve(1024 + pointer.length * 12);
				if (!admitted.ok) return admitted;
				this.diagnostics.push({
					diagnostic_id: identity("api_contract_diagnostic", [
						this.artifact.sha256,
						pointer,
						code
					]),
					source_pointer: pointer,
					code,
					message
				});
				return ok(undefined);
			}
			reference(path, pointer, value) {
				const admitted = this.reserve(1024 + path.length * 12 + (typeof value === "string" ? value.length * 12 : 0));
				if (!admitted.ok) return admitted;
				const credentials = typeof value === "string" ? parseRecordedTransportUrl(value).credentials : null;
				const reference = typeof value !== "string" || credentials === "ambiguous" ? null : credentials === null ? value : value.slice(0, credentials.start) + value.slice(credentials.end);
				this.references.push({
					reference_id: identity("api_path_reference", [this.artifact.sha256, pointer]),
					path,
					source_pointer: pointer,
					reference,
					credential_redacted: credentials !== null,
					state: typeof value === "string" ? "unresolved" : "malformed"
				});
				return typeof value === "string" ? ok(undefined) : this.diagnostic("invalid-path-reference", pointer, "Path Item $ref must be a string; reference resolution was not attempted.");
			}
			operation(value, slot) {
				const object = record(value);
				const declaredId = typeof object?.operationId === "string" ? object.operationId : null;
				const admitted = this.reserve(1536 + slot.path.length * 32 + slot.method.length * 24 + (declaredId?.length ?? 0) * 12);
				if (!admitted.ok) return admitted;
				const reason = object === undefined ? "malformed-operation" : slot.hasReference ? "unresolved-path-item-reference" : null;
				this.operations.push({
					operation_id: identity("api_operation", [this.artifact.sha256, slot.pointer]),
					operation_key: identity("api_operation_key", [slot.path, slot.method]),
					method: slot.method,
					path: slot.path,
					declared_id: declaredId,
					source_pointer: slot.pointer,
					state: reason === null ? "declared" : "unknown",
					reason
				});
				if (object === undefined) return this.diagnostic("invalid-operation", slot.pointer, "The method's value is not an Operation Object.");
				if (Object.hasOwn(object, "operationId") && declaredId === null) return this.diagnostic("invalid-operation-id", `${slot.pointer}/operationId`, "operationId is present but is not a string; its identity remains unavailable.");
				return ok(undefined);
			}
		};
		infoFacts = (root, inventory) => {
			const info = record(root.info);
			const title = typeof info?.title === "string" ? info.title : null;
			const version = typeof info?.version === "string" ? info.version : null;
			const admitted = inventory.reserve(4096 + inventory.artifact.path.length * 12 + (title?.length ?? 0) * 12 + (version?.length ?? 0) * 12);
			if (!admitted.ok) return admitted;
			if (info === undefined || title === null || version === null) {
				const diagnosed = inventory.diagnostic("invalid-info", "/info", "Info title/version are not both present strings; usable metadata and operation slots are retained without claiming a valid OpenAPI document.");
				if (!diagnosed.ok) return diagnosed;
			}
			return ok({
				title,
				version
			});
		};
		contractReport = (inventory, context, incomplete = false) => {
			const artifact = inventory.artifact;
			let declared = 0;
			for (const operation of inventory.operations) if (operation.state === "declared") declared++;
			return {
				contract_id: `api_contract_${artifact.sha256}`,
				format: "openapi-json",
				openapi: context.openapi,
				artifact,
				info: context.info,
				operations: inventory.operations,
				path_item_references: inventory.references,
				diagnostics: inventory.diagnostics,
				summary: {
					operation_slots: inventory.operations.length,
					declared,
					unknown: inventory.operations.length - declared,
					unresolved_path_items: inventory.references.length,
					diagnostics: inventory.diagnostics.length
				},
				source_coverage: {
					scope: "inline-path-operations",
					status: incomplete || inventory.references.length > 0 || inventory.diagnostics.length > 0 ? "partial" : "complete-within-scope",
					paths_state: context.pathsState,
					path_entries_examined: context.examined,
					reference_resolution: "not-attempted",
					schema_validation: "not-performed",
					duplicate_json_members: "last-value-wins"
				},
				limitations: [
					...incomplete ? ["Traversal stopped before the inventory was complete. Row counts describe retained facts; path_entries_examined counts fully traversed entries, excluding an interrupted entry whose rows may be retained."] : [],
					"Operations are document declarations, not evidence of runtime implementation, reachability or authorization.",
					"Only inline operations under paths are inventoried; callbacks, webhooks, components, servers, parameters, schemas, request/response contracts and security are not analyzed.",
					"No reference is resolved, including local fragments. A Path Item reference makes its effective operations unknown; adjacent inline slots are preserved without merging referenced definitions.",
					"Transport userinfo credentials are excluded from reference URIs. credential_redacted marks the exclusion; an ambiguous credential span leaves the displayed reference unknown. Other reference text is preserved.",
					"This is a structural inventory, not full OpenAPI schema validation. operationId values are preserved without assuming uniqueness; operation_key matches exact method/path spelling, not semantic equivalence across APIs.",
					"Source JSON members use last-value-wins parsing. Original bytes remain in the caller-selected artifact, identified by SHA-256; this Evidence does not embed the complete source document."
				]
			};
		};
	})))();
}

//#endregion
//#region dist/application/apiContract/ApiContractRead.js
var inputFailure$1, readFailure, readApiContract;
function init_ApiContractRead() {
	return (init_ApiContractRead = __esmMin((() => {
		init_resources();
		init_analysisErrorCore();
		init_artifactOperationError();
		init_apiContract();
		init_RegularFile();
		init_result();
		inputFailure$1 = (path, cause, message, parameter = "path") => new AnalysisInputError(API_CONTRACT_OPERATION, {
			cause,
			...cause instanceof ArtifactReaderFailure ? stableArtifactInputRecovery(cause) : {}
		}, [{
			path: [parameter],
			reason: "invalid_format",
			message: `${message} (${path})`
		}]);
		readFailure = (failure, input) => {
			const { cause, origin } = artifactFilePrimaryFacts(failure);
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure) {
				if (cause.reason === "cancelled") return cancelledBy(API_CONTRACT_OPERATION, carriedReason(artifactFileCancellationCause(cause)));
				if (cause.reason === "integrity") return readerIntegrityFailure(API_CONTRACT_OPERATION, input.path, cause);
				if (cause.reason === "limit") return new AnalysisResourceConstraintError(API_CONTRACT_OPERATION, cause.boundary ?? "file-size", cause.message, { max_file_bytes: input.max_file_bytes }, {
					cause,
					retryable: false,
					remediationAction: "Select a complete document within max_file_bytes; increasing reply limits or paging does not change this file admission."
				});
				if (cause.reason === "path" || cause.reason === "format") return inputFailure$1(input.path, cause, cause.message, input.parameter);
			}
			if (cause instanceof Error && "code" in cause) {
				if (cause.code === "EACCES" || cause.code === "EPERM") return new AnalysisAccessDeniedError(API_CONTRACT_OPERATION, input.path, cause.code, { cause });
				if (isSelectedRegularFileError(cause)) return inputFailure$1(input.path, cause, "Selected API document could not be read", input.parameter);
			}
			return new ArtifactOperationError(API_CONTRACT_OPERATION, "io", undefined, "API document read failed.", { cause });
		};
		readApiContract = async (input, resources, signal) => {
			try {
				return ok(await resources.run(() => readStableArtifact(input.path, input.max_file_bytes, signal, undefined, resources)));
			} catch (cause) {
				return err(projectStableArtifactFailure(cause, readFailure(cause, input), input.path, API_CONTRACT_PROVIDER.id, API_CONTRACT_OPERATION));
			}
		};
	})))();
}

//#endregion
//#region dist/application/apiContract/ApiContractTraversal.js
var cancelSteps, completeApiContractSteps;
function init_ApiContractTraversal() {
	return (init_ApiContractTraversal = __esmMin((() => {
		init_analysisErrorCore();
		init_result();
		init_apiContract();
		cancelSteps = (steps, reason) => {
			const cancellation = cancelledBy(API_CONTRACT_OPERATION, carriedReason(reason));
			try {
				const stopped = steps.throw(cancellation);
				if (stopped.done && !stopped.value.ok) return stopped.value;
			} catch (cause) {
				if (cause !== cancellation) throw cause;
			}
			return err(cancellation);
		};
		completeApiContractSteps = async (steps, signal) => {
			let completed = false;
			try {
				for (;;) {
					if (signal?.aborted) return cancelSteps(steps, signal.reason);
					const next = steps.next();
					if (next.done) {
						completed = true;
						if (!next.value.ok) return next.value;
						await setImmediate();
						return next.value;
					}
					await setImmediate();
				}
			} finally {
				if (!completed) steps.return(undefined);
			}
		};
	})))();
}

//#endregion
//#region dist/application/apiContract/ApiContractService.js
var ApiContractService_exports = /* @__PURE__ */ __exportAll({ inspectApiContractEvidence: () => inspectApiContractEvidence });
function* documentSteps(document, artifact) {
	const issue = yield* jsonValueValidationSteps(document);
	if (issue !== undefined) return err(inputFailure(issue));
	return yield* parseApiContractSteps(document, artifact);
}
var inputFailure, decodeDocument, documentEvidence, importDocument, inspectApiContractEvidence;
function init_ApiContractService() {
	return (init_ApiContractService = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_evidence();
		init_jsonValue();
		init_result();
		init_apiContract();
		init_apiContractQuery();
		init_parseApiContract();
		init_AnalysisInput();
		init_JsonInputFile();
		init_Utf8JsonInput();
		init_ApiContractRead();
		init_ApiContractTraversal();
		init_ProviderOperationExecution();
		inputFailure = (message, cause) => new AnalysisInputError(API_CONTRACT_OPERATION, { cause }, [{
			path: ["path"],
			reason: "invalid_format",
			message
		}]);
		decodeDocument = (bytes, path) => {
			const required = nativeJsonParseRequiredBytes(bytes.length);
			const available = getHeapStatistics().total_available_size;
			if (required > available) return err(new AnalysisResourceConstraintError(API_CONTRACT_OPERATION, "memory", "Insufficient parser headroom for the admitted JSON representation expansion.", {
				input_bytes: bytes.length,
				required_bytes: required,
				available_heap_bytes: available
			}, { remediationAction: "Select a smaller complete document or free parser memory; paging a reply does not reduce JSON parsing work." }));
			try {
				const parsed = parseUtf8Json(bytes, API_CONTRACT_OPERATION, path);
				return parsed.ok ? ok(parsed.value) : err(inputFailure(parsed.error, parsed.cause));
			} catch (cause) {
				if (cause instanceof AnalysisError) return err(cause);
				throw cause;
			}
		};
		documentEvidence = (input, result) => createEvidence({
			path: input.path,
			format: "file",
			sha256: result.artifact.sha256
		}, API_CONTRACT_PROVIDER, {
			operation: API_CONTRACT_OPERATION,
			predicateType: "rea.api-contract-inventory",
			parameters: {
				path: input.path,
				format: input.format,
				max_file_bytes: input.max_file_bytes
			},
			result,
			confidence: "observed",
			limitations: result.limitations,
			locations: [{
				kind: "artifact-path",
				path: input.path
			}]
		});
		importDocument = async (input, bytes, sha256, signal) => {
			const document = decodeDocument(bytes, input.path);
			if (!document.ok) return document;
			const parsed = await completeApiContractSteps(documentSteps(document.value, {
				path: input.path,
				sha256,
				bytes: bytes.length
			}), signal);
			if (!parsed.ok) {
				const partial = apiContractSchema.safeParse(parsed.error.partialObservation);
				if (partial.success) parsed.error.partialObservation = documentEvidence(input, partial.data);
				return parsed;
			}
			return completeProviderEvidence(documentEvidence(input, parsed.value), signal);
		};
		inspectApiContractEvidence = async (rawInput, resources, options = {}) => {
			const admitted = parseAnalysisInput(API_CONTRACT_OPERATION, rawInput, inspectApiContractInputSchema, options.signal);
			if (!admitted.ok) return admitted;
			const input = admitted.value;
			if (input.format === "graphql-sdl") {
				const { importGraphqlContract } = await import("./application__apiContract__GraphqlContractImport-BmNGQnpc.js");
				return importGraphqlContract(input, resources, options.signal);
			}
			const source = await readApiContract(input, resources, options.signal);
			if (!source.ok) return source;
			const result = await importDocument(input, source.value.bytes, source.value.sha256, options.signal);
			if (!result.ok) result.error.retainPartialObservation({
				kind: "file-snapshot-hash",
				path: input.path,
				sha256: source.value.sha256,
				bytes: source.value.bytes.length
			});
			return result;
		};
	})))();
}

//#endregion
export { ApiContractService_exports, completeApiContractSteps, init_ApiContractRead, init_ApiContractService, init_ApiContractTraversal, readApiContract };