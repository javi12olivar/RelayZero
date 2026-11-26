import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ANALYSIS_RESOURCE_KINDS, AnalysisCancelledError, AnalysisError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisTimeoutError, JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS, JAVASCRIPT_ANALYSIS_TRANSFER_RECORD_BYTES, JAVASCRIPT_PARENT_CHECKPOINT_HEAP_REMEDIATION, JAVASCRIPT_PARENT_HEAP_NODE_OPTIONS, JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION, JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM, JAVASCRIPT_STATIC_FACT_BYTES, JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM, MAX_NODE_TIMER_DELAY_MS, analysisSettingLimit, cancelledBy, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_analysisSettingDefinitions, init_coverage, init_errorMessage, init_javascriptAnalysisResourceControls, init_javascriptSemanticPrecision, init_jsonValue, init_runtimeVersion, init_sha256Hex, javaScriptRuntime, javaScriptSemanticPrecisionSchema, javaScriptWorkerHeapExhaustionRecovery, javaScriptWorkerHeapRemediation, jsonValueSchema, knownCoverageStatusSchema, resolveJavaScriptSemanticPrecision, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform, init_safeJson, safeParseUtf8Json } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactReaderFailure, ArtifactResourceScope, OwnedFileHandle, bindArtifactFileCleanup, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_OwnedFileHandle, init_OwnedRegularFile, init_resources, withOwnedFileHandle } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { RuntimeControlUnavailableError, init_runtimeControlUnavailableError, runtimeControlCapabilityError } from "./WindowsNativeLoader-CCqowxwW.js";
import { init_WindowsPrivateRuntime, windowsPrivateRuntime } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE, init_javascriptSemanticWorkAllowance, javaScriptMemberMutationAllowanceField, javaScriptMemberMutationAllowanceSchema, javaScriptMemberMutationRefusal, reportsJavaScriptMemberMutationRefusal } from "./urlComponents-DJm-wtqY.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { init_javascriptRouteFacts, init_javascriptSemanticGraphSchemas, javaScriptRouteSourceFactsSchema, javaScriptSemanticEvidenceContextSchema, javaScriptSemanticFingerprintSchema, javaScriptSemanticNodeSchema, javaScriptSemanticRelationSchema, javaScriptSemanticUnknownOmissionsSchema, javaScriptSemanticUnknownSchema } from "./javascriptSemanticGraphSchemas-Cmwji5L9.js";
import { init_javascriptSemanticValueTypes, init_javascriptStaticCoverage, javaScriptSemanticResourceLimitSchema, javaScriptStaticCoverageSchema } from "./javascriptStaticCoverage-D0-4cGrW.js";
import { init_ProcessOwnershipObservation, prepareProcessOwnershipInspection } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { init_ProviderProcess, init_RuntimeExhaustion, runtimeExhaustionReport, spawnOwnedProviderProcess } from "./ProviderProcess-OkgijDXB.js";
import { ProviderStartupDeadline, init_ProviderDeadline, waitForAbortableDelay } from "./ProviderDeadline-BXAnhNBa.js";
import { init_OwnedCommandCleanup, processInspectionCancellationError, retainProcessInspectionCleanup } from "./OwnedCommandCleanup-CmeE0187.js";
import { JAVASCRIPT_AST_FINGERPRINT_ALGORITHM, init_javascriptStaticAnalysisTypes } from "./javascriptStaticAnalysisTypes-DH1LfgEI.js";
import { Utf8NdjsonLineBuffer, Utf8NdjsonOversizeError, init_Utf8NdjsonLineBuffer } from "./Utf8NdjsonLineBuffer-BoHCe-8R.js";
import { WorkerFrameSignal, init_WorkerFrameSignal } from "./WorkerFrameSignal-DShdE5I1.js";
import { OwnedWorkerRuntime, OwnedWorkerRuntimeCleanupError, WorkerCleanupRegistry, init_OwnedWorkerRuntime, processWorkerCleanup } from "./OwnedWorkerRuntime-_ZkKBS_4.js";
import { init_JavaScriptWorkerMemoryLimit, javaScriptWorkerMemoryLimitBytes } from "./JavaScriptWorkerMemoryLimit-DlffZ_vK.js";
import { createReadStream } from "node:fs";
import { join, win32 } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { createHash, randomUUID } from "node:crypto";
import { open, readFile, rm, stat, writeFile } from "node:fs/promises";
import { getHeapStatistics } from "node:v8";

//#region dist/javascript/analysis/JavaScriptAnalysisSourceTransfer.js
var writeJavaScriptAnalysisSourceTransfer;
function init_JavaScriptAnalysisSourceTransfer() {
	return (init_JavaScriptAnalysisSourceTransfer = __esmMin((() => {
		init_HostPlatform();
		init_WindowsPrivateRuntime();
		writeJavaScriptAnalysisSourceTransfer = async (path, source, options = {}) => {
			const platform = options.platform ?? HOST_PLATFORM.platform;
			options.signal?.throwIfAborted();
			if (platform === "win32") {
				await new Promise((resolve) => {
					setTimeout(resolve, 0);
				});
				options.signal?.throwIfAborted();
				windowsPrivateRuntime(win32.dirname(path)).writeTransientFile(win32.basename(path), source);
				options.signal?.throwIfAborted();
				return;
			}
			await writeFile(path, source, {
				flag: "wx",
				mode: 384,
				signal: options.signal
			});
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptApplicationProjectionResources.js
var estimateJavaScriptStaticApplicationProjection;
function init_javascriptApplicationProjectionResources() {
	return (init_javascriptApplicationProjectionResources = __esmMin((() => {
		estimateJavaScriptStaticApplicationProjection = (facts, checkpointBytes, sourcePath) => {
			const findings = (facts.electron.app_path_changes?.length ?? 0) + facts.references.length + facts.endpoints.length + facts.storage.length + facts.role_paths.length + facts.source_map_urls.length + facts.electron.browser_windows.length + facts.electron.context_bridge_apis.length + facts.electron.ipc.length + facts.electron.sender_validations.length + facts.electron.utility_processes.length + facts.electron.native_addon_bindings.length + facts.electron.protocols.length + (facts.electron.dynamic_code ?? []).length;
			let records = findings * 8;
			let repeatedBytes = 0;
			for (const registration of facts.bundler_registrations) {
				records += 3 + registration.modules.length * 3 + registration.entry_module_keys.length * 3 + registration.async_chunk_keys.length * 3;
				repeatedBytes += Buffer.byteLength(JSON.stringify(registration.chunk_keys)) * registration.modules.length * 2;
			}
			for (const binding of facts.electron.native_addon_bindings) records += binding.members.length * 3;
			for (const path of facts.electron.call_paths ?? []) {
				records += path.steps.length * 4 + 8;
				repeatedBytes += Buffer.byteLength(JSON.stringify(path.conditions)) * path.steps.length * 2;
			}
			const metadataBytes = 2048 + Buffer.byteLength(sourcePath) * 4;
			return (checkpointBytes * 4 + repeatedBytes) * 8 + records * metadataBytes;
		};
	})))();
}

//#endregion
//#region dist/javascript/analysis/JavaScriptAnalysisWorkerSchemas.js
var range, count, strings, pathContext, findingContext, electronFindingContext, withRuntime, staticValue, nullHandler, missingHandler, locatedHandler, ipcReceiver, ipcChannel, ipc, windowShape, bridgeShape, utilityShape, electron, referenceShape, javaScriptWorkerStaticAnalysisSchema, primitive, property, semanticValue, origin, provenOrigin, provenance, coverage, moduleLink, definitionKind, scope, binding, callable, javaScriptWorkerGraphRecordSchema, javaScriptWorkerProjectionHeaderSchema, javaScriptWorkerModuleRecordSchema, javaScriptWorkerModuleHeaderSchema;
function init_JavaScriptAnalysisWorkerSchemas() {
	return (init_JavaScriptAnalysisWorkerSchemas = __esmMin((() => {
		init_javascriptSemanticPrecision();
		init_javascriptSemanticGraphSchemas();
		init_coverage();
		init_digests();
		init_javascriptRouteFacts();
		init_javascriptStaticCoverage();
		init_javascriptStaticAnalysisTypes();
		init_javascriptSemanticValueTypes();
		range = javaScriptSemanticNodeSchema.shape.identity.shape.source_range.unwrap();
		count = z.int().nonnegative();
		strings = z.array(z.string());
		pathContext = z.enum(["module-specifier", "filesystem-expression"]);
		findingContext = {
			module_key: z.string().nullable(),
			module_runtime: z.string().optional(),
			location: range
		};
		electronFindingContext = {
			...findingContext,
			loader_authority: z.literal("candidate").exactOptional()
		};
		withRuntime = (value) => {
			const { module_runtime, resolution_basis, ...rest } = value;
			return {
				...rest,
				...module_runtime === undefined ? {} : { module_runtime },
				...resolution_basis === undefined ? {} : { resolution_basis }
			};
		};
		staticValue = z.discriminatedUnion("status", [z.strictObject({
			status: z.literal("literal"),
			value: z.union([
				z.string(),
				z.number(),
				z.boolean(),
				z.null()
			]),
			expression: z.null()
		}), z.strictObject({
			status: z.literal("dynamic"),
			value: z.null(),
			expression: z.string()
		})]);
		nullHandler = {
			handler_kind: z.null(),
			handler_location: z.null()
		};
		missingHandler = {
			handler_kind: z.literal("missing"),
			handler_location: z.null()
		};
		locatedHandler = {
			handler_kind: z.enum([
				"inline-function",
				"identifier",
				"member-expression",
				"dynamic-expression"
			]),
			handler_location: range
		};
		ipcReceiver = z.strictObject({
			kind: z.enum(["web-contents", "main-frame"]),
			owner_location: range
		}).exactOptional();
		ipcChannel = (shape) => z.union([z.strictObject({
			...electronFindingContext,
			receiver: ipcReceiver,
			invocation_location: range.optional(),
			resolution_basis: z.literal("wrapper-substitution").optional(),
			...shape,
			channel: z.string(),
			channel_expression: z.null()
		}), z.strictObject({
			...electronFindingContext,
			receiver: ipcReceiver,
			invocation_location: range.optional(),
			resolution_basis: z.literal("wrapper-substitution").optional(),
			invocation_channels: z.literal("literal").exactOptional(),
			guarded_invocation_channels: strings.exactOptional(),
			...shape,
			channel: z.null(),
			channel_expression: z.string()
		})]);
		ipc = z.union([
			ipcChannel({
				side: z.literal("renderer"),
				operation: z.enum([
					"send",
					"send-sync",
					"post-message",
					"send-to-host"
				]),
				mode: z.literal("send"),
				...nullHandler
			}),
			ipcChannel({
				side: z.literal("renderer"),
				operation: z.literal("invoke"),
				mode: z.literal("invoke"),
				...nullHandler
			}),
			ipcChannel({
				side: z.enum(["renderer", "main"]),
				operation: z.enum(["on", "once"]),
				mode: z.literal("listen"),
				...missingHandler
			}),
			ipcChannel({
				side: z.enum(["renderer", "main"]),
				operation: z.enum(["on", "once"]),
				mode: z.literal("listen"),
				...locatedHandler
			}),
			ipcChannel({
				side: z.literal("main"),
				operation: z.enum(["handle", "handle-once"]),
				mode: z.literal("handle"),
				...missingHandler
			}),
			ipcChannel({
				side: z.literal("main"),
				operation: z.enum(["handle", "handle-once"]),
				mode: z.literal("handle"),
				...locatedHandler
			})
		]).transform((value) => {
			const { module_runtime, resolution_basis, invocation_location, ...rest } = value;
			return {
				...rest,
				...module_runtime === undefined ? {} : { module_runtime },
				...resolution_basis === undefined ? {} : { resolution_basis },
				...invocation_location === undefined ? {} : { invocation_location }
			};
		});
		windowShape = {
			...electronFindingContext,
			window_constructor: z.enum([
				"BaseWindow",
				"BrowserView",
				"WebContentsView"
			]).exactOptional(),
			options_status: z.enum([
				"object-literal",
				"dynamic",
				"missing"
			]),
			web_preferences_status: z.enum([
				"object-literal",
				"dynamic",
				"missing"
			]),
			web_preferences: z.array(z.strictObject({
				name: z.string(),
				value: staticValue
			})),
			resolution_sources: z.array(range).exactOptional()
		};
		bridgeShape = {
			resolution_basis: z.literal("wrapper-substitution").optional(),
			...electronFindingContext,
			world: z.enum(["main", "isolated"]),
			world_id: staticValue.nullable(),
			api_status: z.enum([
				"object-literal",
				"dynamic",
				"missing"
			]),
			members: strings,
			unknown_members: count
		};
		utilityShape = {
			...electronFindingContext,
			service_name: z.string().nullable()
		};
		electron = z.strictObject({
			app_path_changes: z.array(z.strictObject(electronFindingContext).transform(withRuntime)).optional(),
			call_paths: z.array(z.strictObject({
				loader_authority: z.literal("candidate").exactOptional(),
				entry_kind: z.enum(["bridge-member", "ipc-handler"]),
				entry: z.string(),
				entry_path: strings.exactOptional(),
				channel: z.string().nullable(),
				terminal: z.string(),
				resolution: z.literal("candidate"),
				steps: z.array(z.strictObject({
					kind: z.enum([
						"exposure",
						"factory",
						"function",
						"call",
						"ipc",
						"terminal"
					]),
					label: z.string(),
					location: range,
					module_key: z.string().nullable(),
					module_runtime: z.string().nullable()
				})),
				conditions: z.array(z.strictObject({
					expression: z.string(),
					location: range
				}))
			})).optional(),
			browser_windows: z.array(z.union([z.strictObject({
				...windowShape,
				preload_path: z.string(),
				preload_resolution_context: pathContext
			}).transform(withRuntime), z.strictObject({
				...windowShape,
				preload_path: z.null(),
				preload_resolution_context: z.null()
			}).transform(withRuntime)])),
			context_bridge_apis: z.array(z.union([
				z.strictObject({
					...bridgeShape,
					api_key: z.string(),
					api_key_expression: z.null()
				}).transform(withRuntime),
				z.strictObject({
					...bridgeShape,
					api_key: z.null(),
					api_key_expression: z.string()
				}).transform(withRuntime),
				z.strictObject({
					...bridgeShape,
					api_key: z.null(),
					api_key_expression: z.null()
				}).transform(withRuntime)
			])),
			ipc: z.array(ipc),
			sender_validations: z.array(z.strictObject({
				...electronFindingContext,
				subject: z.enum([
					"sender-url",
					"sender-origin",
					"sender-frame",
					"sender-id",
					"frame-id",
					"process-id"
				]),
				mechanism: z.string(),
				expected: staticValue,
				enforcement: z.literal("unknown")
			})),
			utility_processes: z.array(z.union([z.strictObject({
				...utilityShape,
				module_path: z.string(),
				module_resolution_context: pathContext,
				module_expression: z.null()
			}).transform(withRuntime), z.strictObject({
				...utilityShape,
				module_path: z.null(),
				module_resolution_context: z.null(),
				module_expression: z.string()
			}).transform(withRuntime)])),
			native_addon_bindings: z.array(z.strictObject({
				...electronFindingContext,
				specifier: z.string(),
				binding_kind: z.enum([
					"import",
					"require",
					"re-export"
				]),
				module_kind: z.enum(["import", "require"]),
				members: strings,
				namespace_access: z.boolean().optional(),
				dynamic_member_access: z.boolean().optional()
			})),
			dynamic_code: z.array(z.strictObject({
				...findingContext,
				api: z.enum(["vm.Script", "vm.compileFunction"]),
				cached_data_status: z.enum([
					"declared",
					"absent",
					"unknown"
				]),
				cached_data: z.union([z.strictObject({
					source_path: z.string(),
					source_path_base: z.enum(["source-directory", "literal-path"]).optional(),
					source_resolution_context: z.enum(["filesystem-expression", "module-specifier"]),
					source_expression: z.null()
				}), z.strictObject({
					source_path: z.null(),
					source_resolution_context: z.null(),
					source_expression: z.string()
				})]),
				source_text: staticValue
			}).transform(withRuntime)).optional(),
			protocols: z.array(z.strictObject({
				...electronFindingContext,
				api: z.string(),
				role: z.enum([
					"os-default-client",
					"privileged-scheme",
					"handler",
					"interceptor"
				]),
				scheme: staticValue,
				session: z.enum(["default-protocol", "default-session"]),
				enabled_privileges: strings.nullable()
			}).transform(withRuntime))
		}).transform(({ call_paths, app_path_changes, dynamic_code, ...rest }) => ({
			...rest,
			...app_path_changes === undefined ? {} : { app_path_changes },
			...call_paths === undefined ? {} : { call_paths },
			...dynamic_code === undefined ? {} : { dynamic_code }
		}));
		referenceShape = {
			...findingContext,
			operation: z.enum(["load", "resolve"]),
			resolution_base_path: z.string().exactOptional(),
			loader_authority: z.literal("candidate").exactOptional(),
			loader: z.enum([
				"commonjs-loader",
				"factory-loader",
				"create-require"
			]).exactOptional(),
			kind: z.enum([
				"static-import",
				"dynamic-import",
				"require",
				"worker",
				"service-worker"
			])
		};
		javaScriptWorkerStaticAnalysisSchema = z.strictObject({
			parse_status: z.enum([...knownCoverageStatusSchema.options, "failed"]),
			analysis_coverage: javaScriptStaticCoverageSchema,
			routes: javaScriptRouteSourceFactsSchema.exactOptional(),
			parse_error_count: count,
			visited_ast_nodes: count,
			references: z.array(z.union([z.strictObject({
				...referenceShape,
				specifier: z.string(),
				expression: z.null()
			}).transform(withRuntime), z.strictObject({
				...referenceShape,
				specifier: z.null(),
				expression: z.string()
			}).transform(withRuntime)])),
			endpoints: z.array(z.strictObject({
				...findingContext,
				kind: z.enum(["route", "network"]),
				value: z.string(),
				mechanism: z.string(),
				interpretation: z.literal("candidate").exactOptional(),
				resolution: z.literal("partial").exactOptional()
			})),
			storage: z.array(z.strictObject({
				...findingContext,
				kind: z.enum([
					"local-storage",
					"session-storage",
					"indexed-db",
					"cache-storage",
					"sqlite"
				]),
				interpretation: z.literal("candidate").exactOptional(),
				name: z.string().nullable(),
				mechanism: z.string()
			})),
			bundler_registrations: z.array(z.strictObject({
				bundler: z.enum([
					"webpack",
					"rspack",
					"esbuild"
				]),
				runtime: z.string(),
				chunk_keys: strings,
				unknown_chunk_keys: count,
				runtime_require_name: z.string().nullable(),
				runtime_module_cache_status: z.enum(["observed", "not-observed"]),
				entry_module_keys: strings,
				unknown_entry_module_keys: count,
				async_chunk_keys: strings,
				unknown_async_chunk_keys: count,
				modules: z.array(z.strictObject({
					module_key: z.string(),
					factory_require_name: z.string().nullable(),
					source_sha256: digestSchema,
					exports: strings,
					location: range,
					structural_fingerprint_sha256: digestSchema,
					structural_fingerprint_algorithm: z.literal(JAVASCRIPT_AST_FINGERPRINT_ALGORITHM)
				})),
				location: range
			})),
			role_paths: z.array(z.strictObject({
				...findingContext,
				role: z.enum(["preload", "renderer"]),
				loader_authority: z.literal("candidate").exactOptional(),
				path: z.string(),
				path_base: z.literal("source-directory").exactOptional(),
				resolution_context: pathContext,
				mechanism: z.string()
			})),
			source_map_urls: z.array(z.strictObject({
				declared_url: z.string(),
				location: range
			})),
			vendors: strings,
			electron,
			loaderCondition: z.string().min(1).exactOptional(),
			limitations: strings
		}).transform((analysis) => ({
			...analysis,
			endpoints: analysis.endpoints.map(withRuntime),
			storage: analysis.storage.map(withRuntime),
			role_paths: analysis.role_paths.map(withRuntime),
			electron: {
				...analysis.electron,
				sender_validations: analysis.electron.sender_validations.map(withRuntime),
				native_addon_bindings: analysis.electron.native_addon_bindings.map((value) => {
					const { namespace_access, dynamic_member_access, ...rest } = withRuntime(value);
					return {
						...rest,
						...namespace_access === undefined ? {} : { namespace_access },
						...dynamic_member_access === undefined ? {} : { dynamic_member_access }
					};
				})
			}
		}));
		primitive = z.union([
			z.string(),
			z.number(),
			z.boolean(),
			z.null()
		]);
		property = z.lazy(() => z.strictObject({
			name: z.string(),
			value: semanticValue,
			presence: z.enum([
				"present",
				"absent",
				"unknown-coverage"
			])
		}));
		semanticValue = z.lazy(() => z.discriminatedUnion("status", [
			z.strictObject({
				status: z.literal("literal"),
				value: primitive
			}),
			z.strictObject({
				status: z.literal("union"),
				values: z.array(primitive)
			}),
			z.discriminatedUnion("unknownProperties", [z.strictObject({
				status: z.literal("object"),
				properties: z.array(property),
				unknownProperties: z.literal(false),
				omittedProperties: z.literal(0)
			}), z.strictObject({
				status: z.literal("object"),
				properties: z.array(property),
				unknownProperties: z.literal(true),
				omittedProperties: count.nullable()
			})]),
			z.discriminatedUnion("unknownItems", [z.strictObject({
				status: z.literal("array"),
				items: z.array(property),
				unknownItems: z.literal(false),
				omittedItems: z.literal(0)
			}), z.strictObject({
				status: z.literal("array"),
				items: z.array(property),
				unknownItems: z.literal(true),
				omittedItems: count.nullable()
			})]),
			z.strictObject({
				status: z.enum([
					"unknown",
					"ambiguous",
					"cycle"
				]),
				reason: z.string(),
				resourceLimit: javaScriptSemanticResourceLimitSchema.optional()
			})
		]).transform((value) => {
			if (value.status === "literal" || value.status === "union" || value.status === "object" || value.status === "array") return value;
			const { resourceLimit: limit, ...rest } = value;
			return {
				...rest,
				...limit === undefined ? {} : { resourceLimit: limit }
			};
		}));
		origin = z.strictObject({
			loaderAuthority: z.literal("candidate").optional(),
			specifier: z.string(),
			importedPath: strings,
			resolutionMode: z.enum([
				"import",
				"require",
				"compiler-dependent"
			]).optional()
		}).transform(({ resolutionMode, loaderAuthority, ...rest }) => ({
			...rest,
			...resolutionMode === undefined ? {} : { resolutionMode },
			...loaderAuthority === undefined ? {} : { loaderAuthority }
		}));
		provenOrigin = origin.refine((value) => value.loaderAuthority !== "candidate", "Candidate loader authority cannot establish exact module provenance.");
		provenance = z.discriminatedUnion("status", [
			z.strictObject({
				status: z.literal("module"),
				origins: z.tuple([provenOrigin]),
				reason: z.null()
			}),
			z.strictObject({
				status: z.literal("local"),
				origins: z.tuple([]),
				reason: z.null()
			}),
			z.strictObject({
				status: z.literal("ambiguous"),
				origins: z.array(origin),
				reason: z.string()
			}),
			z.strictObject({
				status: z.enum(["unknown", "cycle"]),
				origins: z.tuple([]),
				reason: z.string()
			})
		]);
		coverage = z.discriminatedUnion("status", [
			z.strictObject({
				status: z.literal("complete"),
				omittedCount: z.literal(0),
				resourceLimits: z.array(javaScriptSemanticResourceLimitSchema).optional(),
				precision: javaScriptSemanticPrecisionSchema.transform((value) => resolveJavaScriptSemanticPrecision(value)).exactOptional(),
				widenedReturnedReferences: z.array(range).optional()
			}),
			z.strictObject({
				status: z.literal("partial"),
				omittedCount: z.union([z.literal(0), z.null()]),
				resourceLimits: z.array(javaScriptSemanticResourceLimitSchema).optional(),
				precision: javaScriptSemanticPrecisionSchema.transform((value) => resolveJavaScriptSemanticPrecision(value)).exactOptional(),
				widenedReturnedReferences: z.array(range).optional()
			}),
			z.strictObject({
				status: z.literal("failed"),
				omittedCount: z.null(),
				resourceLimits: z.array(javaScriptSemanticResourceLimitSchema).optional(),
				precision: javaScriptSemanticPrecisionSchema.transform((value) => resolveJavaScriptSemanticPrecision(value)).exactOptional(),
				widenedReturnedReferences: z.array(range).optional()
			})
		]).transform((value) => {
			const { resourceLimits, widenedReturnedReferences, ...rest } = value;
			return {
				...rest,
				...resourceLimits === undefined ? {} : { resourceLimits },
				...widenedReturnedReferences === undefined ? {} : { widenedReturnedReferences }
			};
		});
		moduleLink = z.strictObject({
			loaderAuthority: z.literal("candidate").optional(),
			resolutionMode: z.enum([
				"import",
				"require",
				"compiler-dependent"
			]).optional(),
			kind: z.enum([
				"import",
				"type-import",
				"require",
				"export",
				"re-export",
				"commonjs-export"
			]),
			specifier: z.string().nullable(),
			importedName: z.string().nullable(),
			localName: z.string().nullable(),
			exportedName: z.string().nullable(),
			callableId: z.string().nullable(),
			location: range
		}).transform(({ resolutionMode, loaderAuthority, ...rest }) => ({
			...rest,
			...resolutionMode === undefined ? {} : { resolutionMode },
			...loaderAuthority === undefined ? {} : { loaderAuthority }
		}));
		definitionKind = z.enum([
			"import",
			"variable",
			"parameter",
			"function",
			"class",
			"catch",
			"assignment"
		]);
		scope = z.strictObject({
			scopeId: z.string(),
			parentScopeId: z.string().nullable(),
			kind: z.enum([
				"program",
				"function",
				"block",
				"static-block",
				"class",
				"catch"
			]),
			location: range,
			bindingsComplete: z.boolean(),
			bindingIds: strings
		});
		binding = z.strictObject({
			bindingId: z.string(),
			scopeId: z.string(),
			name: z.string(),
			kind: definitionKind,
			mutable: z.boolean(),
			definitions: z.array(z.strictObject({
				kind: definitionKind,
				location: range
			})),
			value: semanticValue,
			initializerValue: semanticValue.optional(),
			provenance
		}).transform(({ initializerValue, ...rest }) => ({
			...rest,
			...initializerValue === undefined ? {} : { initializerValue }
		}));
		callable = z.strictObject({
			callableId: z.string(),
			kind: z.enum([
				"function",
				"class",
				"method"
			]),
			name: z.string().nullable(),
			containerScopeId: z.string(),
			bodyScopeId: z.string().nullable(),
			location: range,
			computedKeyLocation: range.nullable(),
			returnSites: z.array(z.strictObject({
				returnSiteId: z.string(),
				location: range,
				identityReferenceLocation: range.nullable(),
				valueExpressionLocation: range.nullable(),
				value: semanticValue
			})),
			returnCoverage: z.strictObject({
				retainedCount: count,
				status: knownCoverageStatusSchema,
				omittedCount: z.union([z.literal(0), z.null()])
			})
		});
		javaScriptWorkerGraphRecordSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("evidence-context"),
				value: javaScriptSemanticEvidenceContextSchema
			}),
			z.strictObject({
				kind: z.literal("node"),
				value: javaScriptSemanticNodeSchema
			}),
			z.strictObject({
				kind: z.literal("relation"),
				value: javaScriptSemanticRelationSchema
			}),
			z.strictObject({
				kind: z.literal("unknown"),
				value: javaScriptSemanticUnknownSchema
			}),
			z.strictObject({
				kind: z.literal("fingerprint"),
				value: javaScriptSemanticFingerprintSchema
			})
		]);
		javaScriptWorkerProjectionHeaderSchema = z.strictObject({
			omittedUnknownOccurrences: javaScriptSemanticUnknownOmissionsSchema.exactOptional(),
			roots: z.array(javaScriptSemanticNodeSchema.shape.node_id),
			nodesTruncated: z.boolean()
		});
		javaScriptWorkerModuleRecordSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("scope"),
				value: scope
			}),
			z.strictObject({
				kind: z.literal("binding"),
				value: binding
			}),
			z.strictObject({
				kind: z.literal("callable"),
				value: callable
			}),
			z.strictObject({
				kind: z.literal("module-link"),
				value: moduleLink
			})
		]);
		javaScriptWorkerModuleHeaderSchema = z.strictObject({
			coverage,
			limitations: strings
		});
	})))();
}

//#endregion
//#region dist/javascript/analysis/JavaScriptAnalysisTransfer.js
function* moduleTransferRecords(module) {
	yield {
		kind: "module-header",
		value: {
			coverage: module.coverage,
			limitations: module.limitations
		}
	};
	for (const value of module.scopes) yield {
		kind: "scope",
		value
	};
	for (const value of module.bindings) yield {
		kind: "binding",
		value
	};
	for (const value of module.callables) yield {
		kind: "callable",
		value
	};
	for (const value of module.moduleLinks) yield {
		kind: "module-link",
		value
	};
}
async function readJavaScriptAnalysisTransfer(path, descriptor, source, signal, capacity = {
	nodes: JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM,
	unknowns: JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM
}) {
	if (capacity !== null && [capacity.nodes, capacity.unknowns].some((value) => !Number.isSafeInteger(value) || value < 0 || value > 1e6)) throw new RangeError("JavaScript transfer requires valid retained capacities");
	const expected = javaScriptAnalysisTransferDescriptorSchema.parse(descriptor);
	if ((await stat(path)).size !== expected.bytes) throw new TypeError("JavaScript analysis transfer byte count does not match");
	const scopes = [];
	const bindings = [];
	const callables = [];
	const moduleLinks = [];
	const evidenceContexts = [];
	const nodes = [];
	const relations = [];
	const unknowns = [];
	const fingerprints = [];
	let projectionHeader;
	let moduleHeader;
	const identities = new Map();
	const retainIdentity = (kind, identifier) => {
		let seen = identities.get(kind);
		if (seen === undefined) {
			seen = new Set();
			identities.set(kind, seen);
		}
		if (seen.has(identifier)) throw new TypeError(`Duplicate JavaScript transfer ${kind} identity: ${identifier}`);
		seen.add(identifier);
	};
	let records = 0;
	let moduleBytes = 0;
	let moduleRecords = 0;
	let graphBytes = 0;
	let graphRecords = 0;
	const digest = createHash("sha256");
	const stream = createReadStream(path, {
		highWaterMark: 64 * 1024,
		...signal === undefined ? {} : { signal }
	});
	let bytes = 0;
	let pending = [];
	let pendingBytes = 0;
	try {
		for await (const chunk of stream) {
			signal?.throwIfAborted();
			if (!Buffer.isBuffer(chunk)) throw new TypeError("JavaScript transfer stream is not bytes");
			bytes += chunk.length;
			if (bytes > expected.bytes) throw new RangeError("JavaScript transfer grew while being read");
			digest.update(chunk);
			let start = 0;
			let newline;
			while ((newline = chunk.indexOf(10, start)) >= 0) {
				const fragment = chunk.subarray(start, newline);
				const lineBytes = pendingBytes + fragment.length;
				if (lineBytes + 1 > FRAME_BYTES) throw new RangeError("JavaScript transfer record exceeds its byte budget");
				const line = pending.length === 0 ? fragment : Buffer.concat([...pending, fragment], lineBytes);
				pending = [];
				pendingBytes = 0;
				start = newline + 1;
				const decoded = safeParseUtf8Json(line);
				if (!decoded.ok) throw decoded.cause;
				const record = recordSchema.parse(decoded.value);
				if ([
					"module-header",
					"scope",
					"binding",
					"callable",
					"module-link"
				].includes(record.kind)) {
					moduleBytes += lineBytes + 1;
					moduleRecords += 1;
				} else {
					graphBytes += lineBytes + 1;
					graphRecords += 1;
				}
				if (record.kind === "projection-header") {
					if (records !== 0 || projectionHeader !== undefined) throw new TypeError("Duplicate or late JavaScript projection header");
					projectionHeader = record.value;
				} else if (record.kind === "module-header") {
					if (records !== 1 || moduleHeader !== undefined) throw new TypeError("Duplicate or late JavaScript module header");
					moduleHeader = record.value;
				} else {
					if (projectionHeader === undefined || moduleHeader === undefined) throw new TypeError("JavaScript transfer facts precede their headers");
					if (capacity === null && [
						"evidence-context",
						"node",
						"relation",
						"unknown",
						"fingerprint"
					].includes(record.kind)) {
						if (record.kind === "node" && (record.value.identity.artifact_sha256 !== source.sha256 || record.value.identity.module_path !== source.path)) throw new TypeError("JavaScript transfer node belongs to a different artifact source");
						records += 1;
						continue;
					}
					switch (record.kind) {
						case "scope":
							retainIdentity(record.kind, record.value.scopeId);
							scopes.push(record.value);
							break;
						case "binding":
							retainIdentity(record.kind, record.value.bindingId);
							bindings.push(record.value);
							break;
						case "callable":
							retainIdentity(record.kind, record.value.callableId);
							callables.push(record.value);
							break;
						case "module-link":
							moduleLinks.push(record.value);
							break;
						case "evidence-context":
							retainIdentity(record.kind, record.value.context_id);
							evidenceContexts.push(record.value);
							break;
						case "node": {
							retainIdentity(record.kind, record.value.node_id);
							if (record.value.identity.artifact_sha256 !== source.sha256 || record.value.identity.module_path !== source.path) throw new TypeError("JavaScript transfer node belongs to a different artifact source");
							if (capacity !== null && nodes.length >= capacity.nodes) throw new TypeError("JavaScript transfer nodes exceed the offered capacity");
							nodes.push(record.value);
							break;
						}
						case "relation":
							retainIdentity(record.kind, record.value.relation_id);
							relations.push(record.value);
							break;
						case "unknown":
							retainIdentity(record.kind, record.value.unknown_id);
							if (capacity !== null && unknowns.length >= capacity.unknowns) throw new TypeError("JavaScript transfer unknowns exceed the offered capacity");
							unknowns.push(record.value);
							break;
						case "fingerprint":
							retainIdentity(record.kind, record.value.fingerprint_id);
							fingerprints.push(record.value);
							break;
					}
				}
				records += 1;
			}
			const tail = chunk.subarray(start);
			pendingBytes += tail.length;
			if (pendingBytes + 1 > FRAME_BYTES) throw new RangeError("Unterminated JavaScript transfer record exceeds its byte budget");
			if (tail.length > 0) pending.push(tail);
		}
	} finally {
		stream.destroy();
	}
	if (pendingBytes !== 0 || records !== expected.records || bytes !== expected.bytes || moduleBytes !== expected.module_bytes || moduleRecords !== expected.module_records || graphBytes !== expected.graph_bytes || graphRecords !== expected.graph_records || digest.digest("hex") !== expected.sha256) throw new TypeError("JavaScript analysis transfer is incomplete or its digest does not match");
	if (projectionHeader === undefined || moduleHeader === undefined) throw new TypeError("JavaScript analysis transfer is missing its headers");
	return {
		module: {
			...moduleHeader,
			scopes,
			bindings,
			callables,
			moduleLinks
		},
		projection: capacity !== null ? {
			...projectionHeader,
			evidenceContexts,
			nodes,
			relations,
			unknowns,
			fingerprints
		} : null
	};
}
var FRAME_BYTES, TRANSFER_BYTES, MAX_TRANSFER_BYTES, BATCH_BYTES, recordSchema, javaScriptAnalysisTransferDescriptorSchema, javaScriptTransferRetentionBytes, javaScriptTransferByteBudget, javaScriptTransferCeilingRemediation, javaScriptForwardedTransferRemediation, javaScriptTransferCeilingReason, assertTransferByteBudget, encodeTransferRecord, measureJavaScriptModuleTransfer, writeJavaScriptAnalysisTransfer;
function init_JavaScriptAnalysisTransfer() {
	return (init_JavaScriptAnalysisTransfer = __esmMin((() => {
		init_analysisErrorCore();
		init_safeJson();
		init_javascriptAnalysisResourceControls();
		init_digests();
		init_JavaScriptAnalysisWorkerSchemas();
		init_OwnedFileHandle();
		init_OwnedRegularFile();
		FRAME_BYTES = JAVASCRIPT_ANALYSIS_TRANSFER_RECORD_BYTES;
		TRANSFER_BYTES = 512 * 1024 * 1024;
		MAX_TRANSFER_BYTES = 2 * 1024 * 1024 * 1024;
		BATCH_BYTES = 1024 * 1024;
		recordSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("projection-header"),
				value: javaScriptWorkerProjectionHeaderSchema
			}),
			z.strictObject({
				kind: z.literal("module-header"),
				value: javaScriptWorkerModuleHeaderSchema
			}),
			...javaScriptWorkerGraphRecordSchema.options,
			...javaScriptWorkerModuleRecordSchema.options
		]);
		javaScriptAnalysisTransferDescriptorSchema = z.strictObject({
			bytes: z.int().nonnegative().max(MAX_TRANSFER_BYTES),
			sha256: digestSchema,
			records: z.int().nonnegative(),
			module_bytes: z.int().nonnegative(),
			module_records: z.int().nonnegative(),
			graph_bytes: z.int().nonnegative(),
			graph_records: z.int().nonnegative()
		});
		javaScriptTransferRetentionBytes = (bytes, records) => bytes * 8 + records * 64;
		javaScriptTransferByteBudget = (resultBudgetBytes) => Math.min(MAX_TRANSFER_BYTES, Math.max(TRANSFER_BYTES, Math.floor(resultBudgetBytes / 8)));
		javaScriptTransferCeilingRemediation = (transferFileBytes) => {
			const recordBytes = String(JAVASCRIPT_ANALYSIS_TRANSFER_RECORD_BYTES);
			const maximumBytes = String(MAX_TRANSFER_BYTES);
			const fixed = `The ${recordBytes}-byte transfer record ceiling and the ${maximumBytes}-byte transfer file maximum have no runtime override. Raising max_heap_mb does not raise either fixed ceiling. A request that exceeds the record ceiling or that maximum fails the same way when repeated unchanged.`;
			const adjustable = `${JAVASCRIPT_PARENT_HEAP_NODE_OPTIONS} to raise the effective file ceiling up to ${maximumBytes} bytes. Selecting fewer source_paths can also raise this effective file allowance, because earlier retained results and the reserve for remaining sources reduce the offered budget. Neither change raises the record ceiling or the maximum.`;
			if (transferFileBytes !== undefined && transferFileBytes >= MAX_TRANSFER_BYTES) return `${fixed} The effective transfer file ceiling is the ${maximumBytes}-byte maximum. Selecting fewer source_paths does not raise the record ceiling or that maximum.`;
			const effective = transferFileBytes === undefined ? "The effective transfer file ceiling follows the parent offered result budget, which follows the CLI/MCP process heap, and can be lower than the maximum." : `The effective transfer file ceiling is ${String(transferFileBytes)} bytes. It follows the parent offered result budget, which follows the CLI/MCP process heap.`;
			return `${fixed} ${effective} ${adjustable}`;
		};
		javaScriptForwardedTransferRemediation = (limits) => {
			const transferFileBytes = limits?.transfer_file_bytes;
			if (typeof limits?.transfer_record_bytes !== "number" && typeof transferFileBytes !== "number") return undefined;
			return javaScriptTransferCeilingRemediation(typeof transferFileBytes === "number" ? transferFileBytes : undefined);
		};
		javaScriptTransferCeilingReason = (recordBytes, transferFileBytes) => recordBytes > FRAME_BYTES ? `A complete JavaScript fact exceeds the ${String(FRAME_BYTES)}-byte transfer record ceiling. This release has no runtime override.` : transferFileBytes >= MAX_TRANSFER_BYTES ? `Complete JavaScript file facts exceed the ${String(MAX_TRANSFER_BYTES)}-byte transfer file maximum. This release has no runtime override.` : `Complete JavaScript file facts exceed the effective transfer file ceiling of ${String(transferFileBytes)} bytes (maximum ${String(MAX_TRANSFER_BYTES)} bytes). That effective ceiling follows the parent offered result budget and can rise until the maximum. The record ceiling and that maximum have no runtime override.`;
		assertTransferByteBudget = (transferBytes) => {
			if (!Number.isSafeInteger(transferBytes) || transferBytes < 1 || transferBytes > MAX_TRANSFER_BYTES) throw new RangeError("JavaScript transfer requires a valid complete-file byte budget");
		};
		encodeTransferRecord = (input, previousBytes, transferBytes) => {
			const record = recordSchema.parse(input);
			const line = `${JSON.stringify(record)}\n`;
			const size = Buffer.byteLength(line);
			if (size > FRAME_BYTES || previousBytes + size > transferBytes) throw new AnalysisResourceConstraintError("analyze_javascript_application", "transport", javaScriptTransferCeilingReason(size, transferBytes), {
				transfer_record_bytes: FRAME_BYTES,
				transfer_file_bytes: transferBytes,
				record_bytes: size,
				transfer_bytes_at_least: previousBytes + size
			}, { remediationAction: javaScriptTransferCeilingRemediation(transferBytes) });
			return {
				line,
				size,
				kind: record.kind
			};
		};
		measureJavaScriptModuleTransfer = (module, transferBytes = TRANSFER_BYTES) => {
			assertTransferByteBudget(transferBytes);
			let bytes = 0;
			let records = 0;
			for (const record of moduleTransferRecords(module)) {
				bytes += encodeTransferRecord(record, bytes, transferBytes).size;
				records += 1;
			}
			return {
				bytes,
				records,
				retentionBytes: javaScriptTransferRetentionBytes(bytes, records)
			};
		};
		writeJavaScriptAnalysisTransfer = async (path, module, projection, transferBytes = TRANSFER_BYTES) => {
			assertTransferByteBudget(transferBytes);
			const owner = new OwnedFileHandle(await open(path, "wx", 384));
			const output = owner.handle;
			const digest = createHash("sha256");
			let bytes = 0;
			let records = 0;
			let moduleBytes = 0;
			let moduleRecords = 0;
			let graphBytes = 0;
			let graphRecords = 0;
			let batch = [];
			let batchBytes = 0;
			const flush = async () => {
				if (batch.length === 0) return;
				const buffer = Buffer.from(batch.join(""));
				await output.writeFile(buffer);
				digest.update(buffer);
				batch = [];
				batchBytes = 0;
			};
			const append = async (input) => {
				const { line, size, kind } = encodeTransferRecord(input, bytes, transferBytes);
				bytes += size;
				records += 1;
				if ([
					"module-header",
					"scope",
					"binding",
					"callable",
					"module-link"
				].includes(kind)) {
					moduleBytes += size;
					moduleRecords += 1;
				} else {
					graphBytes += size;
					graphRecords += 1;
				}
				batch.push(line);
				batchBytes += size;
				if (batchBytes >= BATCH_BYTES) await flush();
			};
			return withOwnedFileHandle(path, owner, {}, async () => {
				await append({
					kind: "projection-header",
					value: {
						roots: projection.roots,
						nodesTruncated: projection.nodesTruncated,
						...projection.omittedUnknownOccurrences === undefined ? {} : { omittedUnknownOccurrences: projection.omittedUnknownOccurrences }
					}
				});
				for (const record of moduleTransferRecords(module)) await append(record);
				for (const value of projection.evidenceContexts) await append({
					kind: "evidence-context",
					value
				});
				for (const value of projection.nodes) await append({
					kind: "node",
					value
				});
				for (const value of projection.relations) await append({
					kind: "relation",
					value
				});
				for (const value of projection.unknowns) await append({
					kind: "unknown",
					value
				});
				for (const value of projection.fingerprints) await append({
					kind: "fingerprint",
					value
				});
				await flush();
				return {
					bytes,
					sha256: digest.digest("hex"),
					records,
					module_bytes: moduleBytes,
					module_records: moduleRecords,
					graph_bytes: graphBytes,
					graph_records: graphRecords
				};
			});
		};
	})))();
}

//#endregion
//#region dist/javascript/analysis/JavaScriptAnalysisWorkerProtocol.js
var JAVASCRIPT_ANALYSIS_WORKER_DEFAULTS, javaScriptCheckpointCeilingRemediation, javaScriptWorkerRequestSchema, javaScriptWorkerAdmissionSchema, identity, javaScriptWorkerMessageSchema;
function init_JavaScriptAnalysisWorkerProtocol() {
	return (init_JavaScriptAnalysisWorkerProtocol = __esmMin((() => {
		init_javascriptSemanticWorkAllowance();
		init_javascriptSemanticPrecision();
		init_analysisErrorCore();
		init_jsonValue();
		init_digests();
		init_javascriptAnalysisResourceControls();
		init_JavaScriptAnalysisTransfer();
		JAVASCRIPT_ANALYSIS_WORKER_DEFAULTS = {
			...JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS,
			checkpointBytes: JAVASCRIPT_STATIC_FACT_BYTES,
			protocolBytes: 64 * 1024
		};
		javaScriptCheckpointCeilingRemediation = (checkpointBytes) => `The JavaScript static checkpoint ceiling is ${String(checkpointBytes)} bytes. This release has no runtime override. Raising max_heap_mb does not raise it. Paging or exporting session Evidence does not admit the omitted checkpoint.`;
		javaScriptWorkerRequestSchema = z.strictObject({
			id: z.uuid(),
			semantic_precision: javaScriptSemanticPrecisionSchema.optional(),
			member_mutation_allowance: javaScriptMemberMutationAllowanceSchema,
			unknown_budget: z.int().min(0).max(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM),
			node_budget: z.int().min(0).max(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM),
			text_sha256: digestSchema,
			file: z.strictObject({
				path: z.string(),
				sha256: digestSchema,
				container_sha256: digestSchema,
				bytes: z.int().nonnegative(),
				inventory_artifact_id: z.string(),
				kind: z.literal("javascript"),
				unpacked: z.boolean()
			}),
			/** Type of the source's inventoried package scope, observed by the parent. */
			package_type: z.enum([
				"module",
				"commonjs",
				"unspecified",
				"unknown"
			]),
			purpose: z.enum(["analysis", "preload-discovery"])
		});
		javaScriptWorkerAdmissionSchema = z.strictObject({
			id: z.uuid(),
			semantic_result_budget_bytes: z.int().nonnegative()
		});
		identity = { id: z.uuid() };
		javaScriptWorkerMessageSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("ready"),
				heap_limit_bytes: z.int().positive().nullable()
			}),
			z.strictObject({
				kind: z.literal("phase"),
				...identity,
				phase: z.enum([
					"parse",
					"static",
					"semantic",
					"projection",
					"transfer"
				])
			}),
			z.strictObject({
				kind: z.literal("static"),
				...identity,
				bytes: z.int().nonnegative(),
				sha256: digestSchema
			}),
			z.strictObject({
				kind: z.literal("complete"),
				...identity,
				descriptor: javaScriptAnalysisTransferDescriptorSchema.nullable()
			}),
			z.strictObject({
				kind: z.literal("failure"),
				...identity,
				reason: z.enum([
					"resource",
					"output",
					"io"
				]),
				resource: z.enum(ANALYSIS_RESOURCE_KINDS).nullable(),
				limits: z.record(z.string(), jsonValueSchema).nullable(),
				message: z.string()
			})
		]);
	})))();
}

//#endregion
//#region dist/javascript/analysis/JavaScriptAnalysisWorker.js
var OPERATION, PROVIDER, MIB, STATIC_CHECKPOINT_RETENTION_EXPANSION, STATIC_CAPACITY_SHARE, WORKER_HEAP_FLAGS_ENFORCED, JavaScriptAnalysisWorker;
function init_JavaScriptAnalysisWorker() {
	return (init_JavaScriptAnalysisWorker = __esmMin((() => {
		init_RuntimeExhaustion();
		init_javascriptSemanticWorkAllowance();
		init_analysisResourceLimits();
		init_resources();
		init_analysisErrorCleanup();
		init_OwnedCommandCleanup();
		init_analysisErrorCancellation();
		init_safeJson();
		init_budget();
		init_analysisSettingDefinitions();
		init_WorkerFrameSignal();
		init_Utf8NdjsonLineBuffer();
		init_JavaScriptAnalysisSourceTransfer();
		init_javascriptApplicationProjectionResources();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_providerCleanupError();
		init_result();
		init_runtimeVersion();
		init_runtimeControlUnavailableError();
		init_JavaScriptWorkerMemoryLimit();
		init_ProviderProcess();
		init_OwnedWorkerRuntime();
		init_ProcessOwnershipObservation();
		init_ProviderDeadline();
		init_JavaScriptAnalysisTransfer();
		init_javascriptAnalysisResourceControls();
		init_JavaScriptAnalysisWorkerSchemas();
		init_JavaScriptAnalysisWorkerProtocol();
		init_errorMessage();
		init_sha256Hex();
		OPERATION = "analyze_javascript_application";
		PROVIDER = "javascript-static-analysis";
		MIB = 1024 * 1024;
		STATIC_CHECKPOINT_RETENTION_EXPANSION = 6;
		STATIC_CAPACITY_SHARE = .75;
		WORKER_HEAP_FLAGS_ENFORCED = javaScriptRuntime(process.versions).id === "node";
		JavaScriptAnalysisWorker = class {
			limits;
			launcher;
			#runId = `rea-javascript-analysis-${randomUUID()}`;
			#runtime;
			#inspectionResources = new ArtifactResourceScope();
			#ready = false;
			#heapLimitBytes = 0;
			#frames = [];
			#frameSignal = new WorkerFrameSignal();
			#lines = new Utf8NdjsonLineBuffer(() => JAVASCRIPT_ANALYSIS_WORKER_DEFAULTS.protocolBytes);
			#primaryFailure;
			#activeJobId;
			#activeJobPhase = "startup";
			#staticResponseId;
			#terminalResponseId;
			#phase = "startup";
			#lastFailure;
			#staticProjectionReservations = [];
			#revokedStaticProjections = [];
			#nextSourceIndex = 0;
			#applicationProjectionFailure;
			#parentCapacityExhaustion;
			#sourcesRemaining;
			#deadline;
			/**
			* Estimated retained result bytes against the result budget. Static
			* checkpoints may over-commit it up to the static capacity; the worker
			* reports that exhaustion itself rather than refusing the checkpoint.
			*/
			#retained = new Budget(0);
			#staticCapacityBytes = 0;
			/** Null when the runtime enforces the V8 heap flags instead. */
			#processMemoryLimitBytes;
			#onStdout = (chunk) => {
				if (this.#deadline?.interruption !== undefined) return;
				this.#observeMemoryLimit();
				try {
					for (const line of this.#lines.pushRaw(typeof chunk === "string" ? Buffer.from(chunk) : chunk)) {
						if (!line.ok) throw line.error;
						if (this.#frames.length >= 16) {
							this.#latchOutputFailure("JavaScript worker exceeded its control-frame budget");
							return;
						}
						const raw = JSON.parse(line.value);
						const frame = javaScriptWorkerMessageSchema.parse(raw);
						this.#frames.push(frame);
						this.#observeJobFrame(frame);
						this.#frameSignal.wake("frame");
					}
				} catch (cause) {
					this.#latchOutputFailure(cause instanceof Utf8NdjsonOversizeError ? cause.boundary === "tail" ? "JavaScript worker control frame is unterminated or oversized" : "JavaScript worker exceeded its control-frame budget" : errorMessage(cause));
				}
			};
			#workerCleanup;
			constructor(limits = JAVASCRIPT_ANALYSIS_WORKER_DEFAULTS, launcher = spawnOwnedProviderProcess, sourceCount, workerCleanup = processWorkerCleanup) {
				this.limits = limits;
				this.launcher = launcher;
				this.#workerCleanup = workerCleanup;
				this.#runtime = new OwnedWorkerRuntime({
					rootPrefix: "rea-javascript-analysis-",
					launcher: (options) => this.#inspectionResources.run(async () => {
						try {
							return await launcher(options);
						} catch (cause) {
							throw this.#inspectionFailure(cause, this.#deadline);
						}
					}),
					cleanupRegistry: workerCleanup,
					supervisorOptions: {
						captureStdout: false,
						maxDiagnosticBytes: 256 * 1024,
						runtime: "v8",
						onDiagnostic: (event) => this.#observeProcessDiagnostic(event)
					},
					onInputFailure: (cause) => this.#latchInputFailure(cause)
				});
				if (!Number.isSafeInteger(limits.heapMb) || limits.heapMb < 128 || limits.heapMb > 16384 || !Number.isSafeInteger(limits.timeoutMs) || limits.timeoutMs <= 0 || limits.timeoutMs > 2147483647) throw new RangeError("JavaScript worker requires valid heap and execution limits");
				if (sourceCount !== undefined && (!Number.isSafeInteger(sourceCount) || sourceCount < 0)) throw new RangeError("JavaScript worker source count must be a nonnegative safe integer");
				this.#sourcesRemaining = sourceCount;
				this.#processMemoryLimitBytes = javaScriptWorkerMemoryLimitBytes(limits.heapMb);
				this.#refreshResultBudget();
			}
			/**
			* Whether this idle process can analyze another application. A failed,
			* cancelled, or still-open job must not be reused.
			*/
			canReuse() {
				return this.#ready && this.#activeJobId === undefined && this.#primaryFailure === undefined && this.#lastFailure === undefined && this.#frames.length === 0 && this.#lines.pendingBytes === 0 && this.#runtime.inputFailure === undefined && !this.#runtime.hasPendingCleanup && !this.#inspectionResources.hasPending && this.#runtime.supervisor !== undefined;
			}
			/**
			* Reset per-analysis admission for one idle process. The worker heap limit
			* stays the one selected at launch; callers must not reuse across limits.
			*/
			prepareForAnotherAnalysis(sourceCount) {
				if (!this.canReuse()) return false;
				if (!Number.isSafeInteger(sourceCount) || sourceCount < 0) throw new RangeError("JavaScript worker source count must be a nonnegative safe integer");
				this.#sourcesRemaining = sourceCount;
				this.#staticProjectionReservations = [];
				this.#revokedStaticProjections = [];
				this.#nextSourceIndex = 0;
				this.#parentCapacityExhaustion = undefined;
				this.#applicationProjectionFailure = undefined;
				this.#refreshResultBudget();
				return true;
			}
			/** Keep the limit and usage in one V8 observation for every admission path. */
			#remainingParentHeapBytes() {
				const { heap_size_limit, used_heap_size } = getHeapStatistics();
				return heap_size_limit - used_heap_size;
			}
			/**
			* Reserve host-side control, schema/Evidence work, and a maximum record's
			* transient copies. Everything retained is charged against what is left.
			*
			* Semantic and application results stop at half of it. Static checkpoints
			* may go on to a larger share while the live heap has room for them, so a
			* charge for earlier results cannot cost a later source its static facts.
			*/
			#refreshResultBudget() {
				const capacity = Math.max(0, this.#remainingParentHeapBytes() - 24 * JAVASCRIPT_ANALYSIS_TRANSFER_RECORD_BYTES);
				this.#retained = new Budget(Math.floor(capacity / 2));
				this.#staticCapacityBytes = Math.floor(capacity * STATIC_CAPACITY_SHARE);
			}
			/** Analyze inert source; hard worker failure does not terminate this process. */
			async analyze(file, capacity, signal, onPhase, packageType = "unknown", purpose = "analysis") {
				let javascript = null;
				let module = null;
				let projection = null;
				const id = randomUUID();
				const sourceIndex = this.#nextSourceIndex++;
				this.#applicationProjectionFailure = undefined;
				this.#parentCapacityExhaustion = undefined;
				this.#revokedStaticProjections = [];
				if (this.#sourcesRemaining !== undefined) this.#sourcesRemaining = Math.max(0, this.#sourcesRemaining - 1);
				let deadline;
				let result;
				try {
					if (signal?.aborted === true) throw cancelledBy(OPERATION, signal);
					if (!file.text.included || file.kind !== "javascript") throw new TypeError("JavaScript analysis worker requires included JavaScript text");
					await this.#inspectionResources.run(async () => {
						try {
							await prepareProcessOwnershipInspection(signal);
						} catch (cause) {
							throw this.#inspectionFailure(cause);
						}
					});
					await this.#workerCleanup.retry();
					deadline = new ProviderStartupDeadline(this.limits.timeoutMs, signal);
					this.#deadline = deadline;
					await this.#start(deadline);
					const rootPath = this.#runtime.rootPath;
					const supervisor = this.#runtime.supervisor;
					if (rootPath === undefined || supervisor === undefined) throw new TypeError("JavaScript worker resources were not acquired");
					if (this.#frames.length !== 0 || this.#lines.pendingBytes !== 0) throw new AnalysisOutputError(OPERATION, "JavaScript worker has unsolicited or incomplete control frames");
					supervisor.resetOutput();
					this.#phase = "source-transfer";
					await writeJavaScriptAnalysisSourceTransfer(join(rootPath, `${id}.source`), file.text.value, { signal: deadline.signal });
					const { text: _text, ...metadata } = file;
					let offeredResultBudget = 0;
					const request = javaScriptWorkerRequestSchema.parse({
						id,
						node_budget: capacity.nodes,
						unknown_budget: capacity.unknowns,
						...this.limits.semanticPrecision === undefined ? {} : { semantic_precision: this.limits.semanticPrecision },
						member_mutation_allowance: javaScriptMemberMutationAllowanceField(this.limits.memberMutationAllowance ?? DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE),
						text_sha256: sha256Hex(file.text.value),
						file: metadata,
						package_type: packageType,
						purpose
					});
					const frame = `${JSON.stringify(request)}\n`;
					if (Buffer.byteLength(frame) > JAVASCRIPT_ANALYSIS_WORKER_DEFAULTS.protocolBytes) throw new AnalysisResourceConstraintError(OPERATION, "transport", `Source identity for ${file.path} exceeds the ${String(JAVASCRIPT_ANALYSIS_WORKER_DEFAULTS.protocolBytes)}-byte worker request ceiling. This release has no runtime override.`, { worker_request_bytes: JAVASCRIPT_ANALYSIS_WORKER_DEFAULTS.protocolBytes }, { remediationAction: `This release has no runtime override for the ${String(JAVASCRIPT_ANALYSIS_WORKER_DEFAULTS.protocolBytes)}-byte JavaScript worker request ceiling. Raising max_heap_mb does not raise it. Repeating the unchanged request fails the same way.` });
					const stdin = supervisor.launch.process.stdin;
					if (stdin === undefined || stdin === null) throw new TypeError("JavaScript worker has no writable request stream");
					this.#activeJobId = id;
					this.#activeJobPhase = this.#phase;
					this.#staticResponseId = undefined;
					this.#terminalResponseId = undefined;
					await new Promise((resolve, reject) => stdin.write(frame, (error) => error === null || error === undefined ? resolve() : reject(error)));
					for (;;) {
						const response = await this.#next(deadline, file.path);
						if (response.kind === "ready") throw new AnalysisOutputError(OPERATION, "JavaScript worker response names a different source job");
						if (response.id !== id) continue;
						if (response.kind === "phase") {
							this.#phase = response.phase;
							await onPhase?.(response.phase);
							continue;
						}
						if (response.kind === "static") {
							if (javascript !== null) throw new AnalysisOutputError(OPERATION, "JavaScript worker emitted a duplicate static checkpoint");
							const previousPhase = this.#phase;
							this.#phase = "checkpoint-read";
							javascript = await this.#readCheckpoint(id, file.path, sourceIndex, response);
							this.#phase = previousPhase;
							const exhausted = this.#parentCapacityFailure(file.path);
							if (exhausted !== undefined) throw exhausted;
							offeredResultBudget = this.#applicationProjectionFailure !== undefined && this.#sourcesRemaining !== undefined && this.#sourcesRemaining > 0 ? 0 : this.#remainingResultBudget();
							const admission = javaScriptWorkerAdmissionSchema.parse({
								id,
								semantic_result_budget_bytes: offeredResultBudget
							});
							await new Promise((resolve, reject) => stdin.write(`${JSON.stringify(admission)}\n`, (error) => error === null || error === undefined ? resolve() : reject(error)));
							continue;
						}
						if (response.kind === "failure") {
							if (this.#primaryFailure?.kind === "protocol" && this.#primaryFailure.id === response.id) this.#primaryFailure = undefined;
							if (response.reason === "resource") {
								result = err({
									javascript,
									module,
									projection,
									error: this.#protocolFailure(file.path, response, this.#phase)
								});
								break;
							}
							throw this.#protocolFailure(file.path, response, this.#phase);
						}
						if (javascript === null) throw new AnalysisOutputError(OPERATION, "JavaScript worker completed before a static checkpoint");
						if (response.descriptor === null) {
							result = ok({
								javascript,
								module: null,
								projection: null
							});
							break;
						}
						const descriptor = response.descriptor;
						const moduleEstimate = javaScriptTransferRetentionBytes(descriptor.module_bytes, descriptor.module_records);
						const graphEstimate = javaScriptTransferRetentionBytes(descriptor.graph_bytes, descriptor.graph_records);
						const remaining = Math.min(offeredResultBudget, this.#remainingResultBudget());
						if (moduleEstimate > remaining) {
							result = err({
								javascript,
								module: null,
								projection: null,
								error: new AnalysisResourceConstraintError(OPERATION, "memory", `Completed module facts for ${file.path} exceed the parent's remaining result budget; static facts were retained`, {
									...this.#limits(),
									parent_result_budget_bytes: this.#retained.maximum,
									parent_available_result_budget_bytes: remaining,
									module_transfer_bytes: descriptor.module_bytes,
									module_retention_estimate_bytes: moduleEstimate
								}, { remediationAction: `Use the retained static facts or analyze fewer source files. ${JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION}` })
							});
							break;
						}
						const retainGraph = moduleEstimate + graphEstimate <= remaining;
						this.#phase = "result-admission";
						const decoded = await readJavaScriptAnalysisTransfer(join(rootPath, `${id}.records`), descriptor, file, deadline.signal, retainGraph ? capacity : null);
						module = decoded.module;
						projection = decoded.projection;
						this.#retained.chargeOverCommitting(moduleEstimate + (retainGraph ? graphEstimate : 0));
						result = retainGraph ? ok({
							javascript,
							module,
							projection: decoded.projection
						}) : err({
							javascript,
							module,
							projection,
							error: new AnalysisResourceConstraintError(OPERATION, "memory", `Semantic graph for ${file.path} exceeds the parent's remaining result budget; static and module facts were retained`, {
								...this.#limits(),
								parent_result_budget_bytes: this.#retained.maximum,
								parent_available_result_budget_bytes: remaining,
								module_retention_estimate_bytes: moduleEstimate,
								graph_retention_estimate_bytes: graphEstimate,
								graph_transfer_bytes: descriptor.graph_bytes,
								graph_records: descriptor.graph_records
							}, { remediationAction: `Use the retained static and module facts or analyze fewer source files. ${JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION}` })
						});
						break;
					}
					this.#observeMemoryLimit();
					if (this.#primaryFailure?.kind === "memory") throw this.#projectPrimaryFailure(file.path);
				} catch (cause) {
					const error = this.#failure(cause, file.path, deadline);
					if (deadline?.interruption === "cancelled") analysisErrorWithCancellation(error, cancelledBy(OPERATION, deadline.signal, { capturedOutput: this.#captured() }));
					else if (deadline?.interruption === "timeout" && !(error instanceof AnalysisTimeoutError)) error.retainSecondaryFailure(this.#timeoutError(deadline.signal.reason, false));
					this.#lastFailure = error;
					const cleanup = await this.#stop(error);
					if (cleanup === undefined && javascript === null && this.#runtime.rootPath !== undefined) {
						try {
							javascript = await this.#readCheckpoint(id, file.path, sourceIndex);
						} catch (checkpointCause) {
							void checkpointCause;
						}
					}
					result = err({
						error: cleanup ?? error,
						javascript,
						module,
						projection
					});
				} finally {
					deadline?.dispose();
					if (this.#deadline === deadline) this.#deadline = undefined;
					if (this.#activeJobId === id) this.#activeJobId = undefined;
				}
				if (result.ok) this.#lastFailure = undefined;
				else if (!(result.error.error instanceof ProviderCleanupError)) this.#lastFailure = result.error.error;
				const rootPath = this.#runtime.rootPath;
				if (rootPath !== undefined && !this.#runtime.hasPendingCleanup) {
					try {
						for (const suffix of [
							"source",
							"static.json",
							"records"
						]) await rm(join(rootPath, `${id}.${suffix}`), { force: true });
					} catch (cause) {
						this.#runtime.retainForCleanup();
						const previous = result.ok ? undefined : result.error.error;
						const primary = signal?.aborted ? analysisErrorWithCancellation(previous, cancelledBy(OPERATION, signal, { capturedOutput: this.#captured() })) : previous;
						const error = this.#cleanupError(errorMessage(cause), primary);
						this.#runtime.bindCleanupFailure(error);
						result = err({
							javascript,
							module,
							projection,
							error
						});
					}
				}
				if (signal?.aborted === true) {
					const error = analysisErrorWithCancellation(result.ok ? undefined : result.error.error, cancelledBy(OPERATION, signal, { capturedOutput: this.#captured() }));
					if (result.ok) this.#lastFailure = error;
					result = err({
						error,
						javascript,
						module,
						projection
					});
				}
				if (this.#applicationProjectionFailure !== undefined || this.#revokedStaticProjections.length > 0) return result.ok ? ok({
					...result.value,
					...this.#applicationProjectionFailure === undefined ? {} : { applicationProjectionFailure: this.#applicationProjectionFailure },
					...this.#revokedStaticProjections.length === 0 ? {} : { revokedStaticProjections: this.#revokedStaticProjections }
				}) : err({
					...result.error,
					...this.#applicationProjectionFailure === undefined ? {} : { applicationProjectionFailure: this.#applicationProjectionFailure },
					...this.#revokedStaticProjections.length === 0 ? {} : { revokedStaticProjections: this.#revokedStaticProjections }
				});
				return result;
			}
			/** Verify process cleanup, then release the private runtime; failed close is retryable. */
			async close() {
				const [inspection, runtime] = await Promise.allSettled([this.#inspectionResources.close(), this.#closeRuntime()]);
				const inspectionError = inspection.status === "rejected" ? this.#failure(inspection.reason, "process ownership inspection", undefined) : undefined;
				if (runtime.status === "rejected") {
					const runtimeError = runtime.reason instanceof AnalysisError ? runtime.reason : this.#failure(runtime.reason, "worker close", undefined);
					if (inspectionError !== undefined) throw analysisErrorWithCleanupDependencies(runtimeError, inspectionError, OPERATION);
					throw runtimeError;
				}
				if (inspectionError !== undefined) throw inspectionError;
			}
			async #closeRuntime() {
				try {
					await this.#runtime.close();
					this.#ready = false;
					this.#resetState();
				} catch (cause) {
					if (cause instanceof OwnedWorkerRuntimeCleanupError) {
						const error = this.#cleanupError(cause.message, this.#lastFailure, cause.cleanupResources, cause.processId);
						cause.bindCleanupFailure(error);
						throw error;
					}
					throw cause;
				}
			}
			async #start(deadline) {
				if (this.#runtime.supervisor !== undefined && this.#ready) return;
				this.#phase = "startup";
				this.#heapLimitBytes = 0;
				const environment = {
					...process.env,
					UV_THREADPOOL_SIZE: "1"
				};
				delete environment.NODE_OPTIONS;
				await this.#runtime.start({
					command: process.execPath,
					arguments: [
						`--max-old-space-size=${String(this.limits.heapMb)}`,
						"--max-semi-space-size=8",
						"--v8-pool-size=1",
						"--expose-gc",
						"--stack_size=2048",
						fileURLToPath(import.meta.resolve("#javascript-analysis-worker"))
					],
					runId: `${this.#runId}-${randomUUID()}`,
					hostEnvironment: environment,
					stdin: "pipe",
					...this.#processMemoryLimitBytes === null ? {} : { memoryLimitBytes: this.#processMemoryLimitBytes },
					signal: deadline.signal
				}, async () => {
					this.#runtime.onStdout(this.#onStdout);
					const ready = await this.#next(deadline, "worker startup");
					if (ready.kind !== "ready") throw new AnalysisOutputError(OPERATION, "JavaScript worker emitted facts before its startup handshake");
					if (ready.heap_limit_bytes === null === WORKER_HEAP_FLAGS_ENFORCED) throw new AnalysisOutputError(OPERATION, "JavaScript worker heap limit does not match the runtime that launched it");
					this.#heapLimitBytes = ready.heap_limit_bytes ?? 0;
					this.#ready = true;
				});
			}
			async #next(deadline, path) {
				for (;;) {
					if (deadline.interruption !== undefined) {
						const failure = this.#interruptionFailure(path, deadline);
						throw failure;
					}
					this.#observeMemoryLimit();
					const inputFailure = this.#runtime.inputFailure;
					if (inputFailure !== undefined) this.#latchInputFailure(inputFailure);
					if (this.#primaryFailure !== undefined && this.#primaryFailure.kind !== "exit" && this.#primaryFailure.kind !== "protocol") throw this.#projectPrimaryFailure(path);
					const frame = this.#frames.shift();
					if (frame !== undefined) return frame;
					const supervisor = this.#runtime.supervisor;
					const snapshot = supervisor?.snapshot();
					if (supervisor !== undefined && snapshot !== undefined && (snapshot.exitCode !== undefined || snapshot.signal !== undefined)) {
						const outcome = await this.#waitForFrameOrOutputClose(supervisor, deadline);
						if (outcome === "interrupted") {
							const completedFrame = this.#frames.shift();
							if (completedFrame !== undefined) return completedFrame;
							throw this.#interruptionFailure(path, deadline);
						}
						if (outcome === "failure") {
							const bufferedFrame = this.#frames.shift();
							if (bufferedFrame !== undefined) return bufferedFrame;
							throw this.#selectedWorkerFailure(path);
						}
						const finalFrame = this.#frames.shift();
						if (finalFrame !== undefined) return finalFrame;
						if (outcome === "frame") continue;
						throw this.#selectedWorkerFailure(path);
					}
					await waitForAbortableDelay(10, deadline.signal);
				}
			}
			async #readCheckpoint(id, sourcePath, sourceIndex, expected) {
				const rootPath = this.#runtime.rootPath;
				if (rootPath === undefined) throw new TypeError("JavaScript checkpoint has no owned runtime");
				const path = join(rootPath, `${id}.static.json`);
				const bytes = (await stat(path)).size;
				if (bytes > JAVASCRIPT_ANALYSIS_WORKER_DEFAULTS.checkpointBytes || expected !== undefined && expected.bytes !== bytes) throw new AnalysisOutputError(OPERATION, "JavaScript static checkpoint byte count exceeds or differs from its declared budget");
				if (bytes * 16 + 4 * MIB > this.#remainingParentHeapBytes() - 64 * MIB) throw new AnalysisResourceConstraintError(OPERATION, "memory", "The parent's remaining heap cannot safely decode the completed JavaScript static checkpoint", {
					...this.#limits(),
					checkpoint_bytes: bytes
				}, { remediationAction: JAVASCRIPT_PARENT_CHECKPOINT_HEAP_REMEDIATION });
				const checkpoint = await readFile(path);
				if (expected !== undefined && sha256Hex(checkpoint) !== expected.sha256) throw new AnalysisOutputError(OPERATION, "JavaScript static checkpoint digest does not match");
				const decoded = safeParseUtf8Json(checkpoint);
				if (!decoded.ok) throw decoded.cause;
				const facts = javaScriptWorkerStaticAnalysisSchema.parse(decoded.value);
				const retainedBytes = bytes * STATIC_CHECKPOINT_RETENTION_EXPANSION;
				const { heap_size_limit, used_heap_size } = getHeapStatistics();
				const liveAvailable = heap_size_limit - used_heap_size - 24 * JAVASCRIPT_ANALYSIS_TRANSFER_RECORD_BYTES;
				const staticCeiling = retainedBytes + used_heap_size <= liveAvailable ? this.#staticCapacityBytes : this.#retained.maximum;
				const needed = retainedBytes - (staticCeiling - this.#retained.used);
				if (needed > 0 && retainedBytes <= liveAvailable) {
					let start = this.#staticProjectionReservations.length;
					let reclaimable = 0;
					while (start > 0 && reclaimable < needed) {
						start--;
						reclaimable += this.#staticProjectionReservations[start].bytes;
					}
					if (reclaimable >= needed) {
						const revoked = this.#staticProjectionReservations.splice(start);
						for (const reservation of revoked) {
							this.#retained.refund(reservation.bytes);
							this.#revokedStaticProjections.push({
								sourceIndex: reservation.sourceIndex,
								error: new AnalysisResourceConstraintError(OPERATION, "memory", `Expanded application relationships for ${reservation.path} were omitted to retain static facts for later sources`, { parent_result_budget_bytes: this.#retained.maximum }, { remediationAction: `Read the retained static facts or analyze fewer source files. ${JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION}` })
							});
						}
					}
				}
				const remaining = Math.max(0, Math.min(staticCeiling - this.#retained.used, liveAvailable));
				this.#parentCapacityExhaustion = retainedBytes > remaining ? {
					parent_static_capacity_bytes: staticCeiling,
					parent_available_static_capacity_bytes: remaining,
					parent_used_heap_bytes: used_heap_size,
					static_retention_estimate_bytes: retainedBytes
				} : undefined;
				this.#retained.chargeOverCommitting(retainedBytes);
				const expandedBytes = estimateJavaScriptStaticApplicationProjection(facts, bytes, sourcePath);
				const availableResultBudget = this.#remainingResultBudget();
				if (expandedBytes <= availableResultBudget) {
					this.#retained.chargeOverCommitting(expandedBytes);
					this.#staticProjectionReservations.push({
						sourceIndex,
						path: sourcePath,
						bytes: expandedBytes
					});
				} else this.#applicationProjectionFailure = new AnalysisResourceConstraintError(OPERATION, "memory", `Expanded application relationships for ${sourcePath} exceed the parent's result budget; complete static facts were retained on the file node`, {
					parent_result_budget_bytes: this.#retained.maximum,
					parent_available_result_budget_bytes: availableResultBudget,
					application_projection_required_bytes: expandedBytes
				}, { remediationAction: `Read the complete static facts on the file node or analyze fewer source files. Expanded application relationships exceed the parent result budget. ${JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION}` });
				return facts;
			}
			#parentCapacityFailure(path) {
				if (this.#parentCapacityExhaustion === undefined) return undefined;
				return new AnalysisResourceConstraintError(OPERATION, "memory", `The parent's result capacity was exhausted after retaining static facts for ${path}; remaining sources were not analyzed`, {
					...this.#limits(),
					parent_result_budget_bytes: this.#retained.maximum,
					...this.#parentCapacityExhaustion,
					parent_result_budget_exhausted: true
				}, { remediationAction: JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION });
			}
			#limits() {
				return {
					...WORKER_HEAP_FLAGS_ENFORCED ? {
						worker_old_space_mb: this.limits.heapMb,
						...this.#heapLimitBytes === 0 ? {} : { worker_heap_limit_bytes: this.#heapLimitBytes }
					} : { worker_heap_limit_bytes: null },
					...this.#processMemoryLimitBytes === null ? {} : { worker_process_memory_limit_bytes: this.#processMemoryLimitBytes },
					worker_timeout_ms: this.limits.timeoutMs
				};
			}
			#memoryLimitReached() {
				return this.#runtime.supervisor?.launch.process.memoryLimitReached === true;
			}
			#memoryFailure(path) {
				return new AnalysisResourceConstraintError(OPERATION, "memory", `Owned JavaScript worker reached its ${this.#processMemoryLimitBytes === null ? "" : `${String(this.#processMemoryLimitBytes)}-byte `}process memory limit while analyzing ${path} during ${this.#phase}. That limit is max_heap_mb ${String(this.limits.heapMb)} MiB plus a 512 MiB Bun runtime reserve`, this.#limits(), {
					capturedOutput: this.#captured(),
					limit: analysisSettingLimit("javascript.max_heap_mb", this.limits.heapMb, this.limits.heapSource),
					remediationAction: javaScriptWorkerHeapRemediation(this.limits.heapMb)
				});
			}
			#remainingResultBudget() {
				const checkpointReserve = JAVASCRIPT_ANALYSIS_WORKER_DEFAULTS.checkpointBytes * STATIC_CHECKPOINT_RETENTION_EXPANSION;
				const staticReserve = this.#sourcesRemaining !== undefined && this.#sourcesRemaining > 0 ? checkpointReserve : 0;
				return Math.max(0, this.#remainingTotalResultBudget() - staticReserve);
			}
			#remainingTotalResultBudget() {
				return Math.max(0, Math.min(this.#retained.remaining, this.#remainingParentHeapBytes() - 24 * JAVASCRIPT_ANALYSIS_TRANSFER_RECORD_BYTES));
			}
			#captured() {
				const snapshot = this.#runtime.supervisor?.snapshot();
				const supervisor = this.#runtime.supervisor;
				return {
					stdout: "",
					stderr: snapshot?.stderr.text ?? "",
					truncated: snapshot?.diagnosticTruncated === true || snapshot?.outputIncomplete === true || supervisor !== undefined && !supervisor.observedOutputClose(),
					stderr_bytes: snapshot?.stderr.observedBytes ?? 0,
					exit_code: snapshot?.exitCode ?? null,
					signal: snapshot?.signal ?? null
				};
			}
			#observeProcessDiagnostic(event) {
				if (this.#deadline?.interruption !== undefined) return;
				this.#observeMemoryLimit();
				if (event.type === "output-close") {
					if (this.#deadline !== undefined && (this.#activeJobId === undefined || this.#terminalResponseId !== this.#activeJobId)) this.#latchOutputFailure("JavaScript worker closed output before the operation received its terminal response");
					return;
				}
				const reported = event.type === "output" ? this.#runtime.supervisor?.snapshot().runtimeExhaustion : undefined;
				if (reported !== undefined && this.#primaryFailure?.kind === "exit") {
					this.#primaryFailure = {
						...this.#primaryFailure,
						heapExhaustion: true,
						exhaustion: reported
					};
					this.#frameSignal.wake("failure");
				}
				if (event.type === "exit" && (event.code !== 0 || event.signal !== null)) {
					if (this.#primaryFailure === undefined) this.#primaryFailure = {
						kind: "exit",
						code: event.code,
						signal: event.signal,
						heapExhaustion: event.snapshot.runtimeExhaustion !== undefined,
						...event.snapshot.runtimeExhaustion === undefined ? {} : { exhaustion: event.snapshot.runtimeExhaustion }
					};
					else if (this.#primaryFailure.kind === "exit" && event.snapshot.runtimeExhaustion !== undefined) {
						this.#primaryFailure = {
							...this.#primaryFailure,
							heapExhaustion: true,
							exhaustion: event.snapshot.runtimeExhaustion
						};
						this.#frameSignal.wake("failure");
					}
				}
			}
			#observeMemoryLimit() {
				if (this.#deadline?.interruption === undefined && this.#memoryLimitReached()) {
					if (this.#primaryFailure === undefined) this.#primaryFailure = { kind: "memory" };
					else if (this.#primaryFailure.kind === "exit") this.#primaryFailure = {
						...this.#primaryFailure,
						heapExhaustion: true
					};
					if (this.#primaryFailure?.kind === "memory" || this.#primaryFailure?.kind === "exit") this.#frameSignal.wake("failure");
				}
			}
			#observeJobFrame(frame) {
				if (this.#deadline?.interruption !== undefined || this.#activeJobId === undefined || frame.kind === "ready") return;
				if (frame.id !== this.#activeJobId) return;
				if (frame.kind === "phase") {
					this.#activeJobPhase = frame.phase;
					return;
				}
				if (frame.kind === "static") {
					this.#staticResponseId = frame.id;
					return;
				}
				if (frame.kind === "complete") {
					if (this.#staticResponseId !== frame.id) {
						if (this.#primaryFailure === undefined) this.#primaryFailure = {
							kind: "output",
							reason: "JavaScript worker completed before a static checkpoint"
						};
						this.#frameSignal.wake("failure");
						return;
					}
					this.#terminalResponseId = frame.id;
					return;
				}
				if (frame.kind === "failure") this.#terminalResponseId = frame.id;
				if (frame.kind === "failure" && this.#primaryFailure === undefined) this.#primaryFailure = {
					kind: "protocol",
					id: frame.id,
					phase: this.#activeJobPhase,
					response: frame
				};
			}
			#latchOutputFailure(reason) {
				if (this.#deadline?.interruption !== undefined) return;
				if (this.#primaryFailure === undefined) this.#primaryFailure = {
					kind: "output",
					reason
				};
				this.#frameSignal.wake("failure");
			}
			#latchInputFailure(cause) {
				if (this.#deadline?.interruption !== undefined) return;
				if (this.#primaryFailure === undefined) this.#primaryFailure = {
					kind: "input",
					cause
				};
				this.#frameSignal.wake("failure");
			}
			async #waitForFrameOrOutputClose(supervisor, deadline) {
				if (this.#frames.length !== 0) return "frame";
				return this.#frameSignal.waitForOutputClose(supervisor, deadline.signal);
			}
			#selectedWorkerFailure(path) {
				if (this.#primaryFailure !== undefined) return this.#projectPrimaryFailure(path);
				const snapshot = this.#runtime.supervisor?.snapshot();
				if (snapshot?.exitCode !== undefined || snapshot?.signal !== undefined) return this.#workerExitFailure(path, {
					kind: "exit",
					code: snapshot.exitCode ?? null,
					signal: snapshot.signal ?? null,
					heapExhaustion: false
				});
				return new ProviderAdapterError(PROVIDER, OPERATION, {
					capturedOutput: this.#captured(),
					diagnostics: {
						source_path: path,
						phase: this.#phase
					}
				});
			}
			#interruptionFailure(path, deadline, inspectionFailure) {
				if (this.#primaryFailure !== undefined) return this.#projectPrimaryFailure(path);
				return deadline.interruption === "timeout" ? this.#timeoutError(inspectionFailure) : cancelledBy(OPERATION, deadline.signal, { capturedOutput: this.#captured() });
			}
			/**
			* The per-source deadline failure, with the setting that raises it and its
			* effective value. Every path that reports this deadline uses it.
			*/
			#timeoutError(cause, withCapturedOutput = true) {
				return new AnalysisTimeoutError(OPERATION, this.limits.timeoutMs, {
					...cause === undefined ? {} : { cause },
					limit: analysisSettingLimit("javascript.analysis_timeout_ms", this.limits.timeoutMs, this.limits.timeoutSource),
					related: { parameters: ["source_paths"] },
					...withCapturedOutput ? { capturedOutput: this.#captured() } : {},
					userMessage: `JavaScript source analysis reached its ${String(this.limits.timeoutMs)}ms per-source server/provider deadline (analysis_timeout_ms), not the MCP client deadline.`,
					remediationAction: "Reuse accessible partial_observation Evidence to avoid recomputation; reading it is not a prerequisite for a corrected retry. Increase analysis_timeout_ms on the next call. Alternatively, reduce semantic limits or select exact inventoried source_paths. Omit source_paths to analyze all sources; an empty array is invalid. detail: summary reduces response size, not analysis work. Allow execution, cleanup and delivery headroom in the MCP client tool deadline; increasing that client deadline alone does not change this server budget. Resolve any reported incomplete cleanup before retrying."
				});
			}
			#workerExitFailure(path, failure) {
				if (failure.heapExhaustion) {
					const recovery = javaScriptWorkerHeapExhaustionRecovery({
						heapFlagsEnforced: WORKER_HEAP_FLAGS_ENFORCED,
						heapMb: this.limits.heapMb,
						path,
						phase: this.#phase
					});
					return new AnalysisResourceConstraintError(OPERATION, "memory", recovery.reason, this.#limits(), {
						capturedOutput: this.#captured(),
						...failure.exhaustion === undefined ? {} : { diagnostics: { runtime_exhaustion_report: runtimeExhaustionReport(failure.exhaustion) } },
						...WORKER_HEAP_FLAGS_ENFORCED ? { limit: analysisSettingLimit("javascript.max_heap_mb", this.limits.heapMb, this.limits.heapSource) } : {},
						remediationAction: recovery.remediationAction
					});
				}
				return new ProviderAdapterError(PROVIDER, OPERATION, {
					capturedOutput: this.#captured(),
					diagnostics: {
						source_path: path,
						phase: this.#phase,
						exit_code: failure.code,
						signal: failure.signal
					}
				});
			}
			#projectPrimaryFailure(path) {
				const failure = this.#primaryFailure;
				if (failure === undefined) return this.#selectedWorkerFailure(path);
				if (failure.kind === "memory") return this.#memoryFailure(path);
				if (failure.kind === "exit") return this.#workerExitFailure(path, failure);
				if (failure.kind === "input") return new AnalysisOutputError(OPERATION, `Owned JavaScript worker request stream failed during ${path}`, {
					cause: failure.cause,
					capturedOutput: this.#captured()
				});
				if (failure.kind === "protocol") {
					return this.#protocolFailure(path, failure.response, failure.phase);
				}
				return new AnalysisOutputError(OPERATION, failure.reason, { capturedOutput: this.#captured() });
			}
			#protocolFailure(path, response, phase) {
				if (response.reason === "io") return new ProviderAdapterError(PROVIDER, OPERATION, {
					capturedOutput: this.#captured(),
					userMessage: `Owned JavaScript worker storage failed for ${path} during ${phase}. Retained observations and cleanup status are reported separately.`,
					remediationAction: "Check the availability and permissions of REA's private temporary storage, correct the reported I/O failure, and retry. Changing the selected source is not required by this storage failure.",
					diagnostics: {
						source_path: path,
						phase,
						worker_failure_reason: response.reason,
						message: response.message
					}
				});
				if (response.reason === "resource") {
					const reported = response.limits;
					const limits = {
						...this.#limits(),
						...reported
					};
					const transferRemediation = javaScriptForwardedTransferRemediation(reported);
					const checkpointBytes = reported?.checkpoint_limit_bytes;
					const checkpointRemediation = typeof checkpointBytes === "number" ? javaScriptCheckpointCeilingRemediation(checkpointBytes) : undefined;
					const parentBudget = reported?.semantic_result_budget_bytes !== undefined || reported?.parent_result_budget_bytes !== undefined;
					const remediationAction = transferRemediation ?? checkpointRemediation ?? (parentBudget ? JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION : undefined);
					if (reportsJavaScriptMemberMutationRefusal(reported)) return javaScriptMemberMutationRefusal(OPERATION, this.limits.memberMutationAllowance ?? DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE, limits);
					return new AnalysisResourceConstraintError(OPERATION, response.resource ?? "memory", response.message, limits, remediationAction === undefined ? undefined : { remediationAction });
				}
				return new AnalysisOutputError(OPERATION, `${path} during ${phase}: ${response.message}`, { capturedOutput: this.#captured() });
			}
			#inspectionFailure(cause, deadline) {
				const failure = this.#failure(cause, "process ownership inspection", undefined);
				const primary = failure instanceof AnalysisCancelledError && deadline?.interruption === "timeout" ? this.#interruptionFailure("process ownership inspection", deadline, cause) : failure;
				return retainProcessInspectionCleanup(cause, primary, this.#inspectionResources, OPERATION);
			}
			#failure(cause, path, deadline) {
				if (cause instanceof OwnedWorkerRuntimeCleanupError) {
					const error = this.#cleanupError(cause.message, this.#lastFailure, cause.cleanupResources, cause.processId);
					cause.bindCleanupFailure(error);
					return error;
				}
				const cancellation = processInspectionCancellationError(cause, OPERATION);
				if (cancellation !== undefined) return deadline?.interruption === "timeout" ? this.#timeoutError(cause) : cancellation.capturedOutput === undefined ? cancellation.retainCapturedOutput(this.#captured()) : cancellation;
				if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) {
					const error = new ProviderCleanupError(PROVIDER, cause.cleanup.resources, { reason: cause.cleanup.reason }, {
						operation: OPERATION,
						cause
					});
					bindArtifactFileCleanup(cause, error);
					return error;
				}
				if (cause instanceof AnalysisError && (deadline === undefined || this.#phase === "startup")) return cause;
				if (this.#phase !== "checkpoint-read" && deadline?.interruption !== undefined) return this.#interruptionFailure(path, deadline);
				const inputFailure = this.#runtime.inputFailure;
				if (inputFailure !== undefined) return new AnalysisOutputError(OPERATION, `Owned JavaScript worker request stream failed during ${this.#phase}`, {
					cause: inputFailure,
					capturedOutput: this.#captured()
				});
				if (this.#memoryLimitReached() && !(cause instanceof AnalysisResourceConstraintError)) return this.#memoryFailure(path);
				if (cause instanceof AnalysisError) return cause;
				if (cause instanceof z.ZodError || cause instanceof TypeError || cause instanceof SyntaxError) return new AnalysisOutputError(OPERATION, `${path} during ${this.#phase}: ${errorMessage(cause)}`, {
					cause,
					capturedOutput: this.#captured()
				});
				return cause instanceof RuntimeControlUnavailableError ? runtimeControlCapabilityError(PROVIDER, OPERATION, cause) : new ProviderAdapterError(PROVIDER, OPERATION, {
					cause,
					capturedOutput: this.#captured(),
					diagnostics: {
						source_path: path,
						phase: this.#phase,
						message: errorMessage(cause)
					}
				});
			}
			#cleanupError(reason, original = this.#lastFailure, cleanupResources = [this.#runId, ...this.#runtime.rootPath === undefined ? [] : [this.#runtime.rootPath]], processId = this.#runtime.supervisor?.launch.process.pid ?? null) {
				return new ProviderCleanupError(PROVIDER, cleanupResources, {
					reason,
					worker_pid: processId,
					...original === undefined ? {} : { execution_failure: {
						tag: original._tag,
						message: original.message,
						captured_output: {
							stdout: original.capturedOutput?.stdout ?? "",
							stderr: original.capturedOutput?.stderr ?? "",
							truncated: original.capturedOutput?.truncated ?? false
						}
					} }
				}, {
					operation: OPERATION,
					...original === undefined ? {} : { cleanupPrimary: original },
					cause: new Error(reason, original === undefined ? undefined : { cause: original })
				});
			}
			async #stop(original = this.#lastFailure) {
				const stopped = await this.#runtime.stop();
				if (stopped.status === "incomplete") {
					this.#resetState();
					const error = this.#cleanupError(stopped.reason, original);
					this.#runtime.bindCleanupFailure(error);
					return error;
				}
				this.#ready = false;
				this.#resetState();
				return undefined;
			}
			#resetState() {
				this.#ready = false;
				this.#frames = [];
				this.#frameSignal.clear();
				this.#lines.reset();
				this.#primaryFailure = undefined;
				this.#activeJobId = undefined;
				this.#staticResponseId = undefined;
				this.#terminalResponseId = undefined;
			}
		};
	})))();
}

//#endregion
//#region dist/javascript/analysis/JavaScriptSourceAnalysis.js
var retained, closeHookRegistered, workerCleanups, workerCleanupFor, createJavaScriptSourceAnalysis, checkoutJavaScriptSourceAnalysis, registerJavaScriptSourceAnalysisClose, sameLimits, ScopeJavaScriptSourceAnalysis;
function init_JavaScriptSourceAnalysis() {
	return (init_JavaScriptSourceAnalysis = __esmMin((() => {
		init_javascriptSemanticWorkAllowance();
		init_javascriptSemanticPrecision();
		init_JavaScriptAnalysisWorker();
		init_OwnedWorkerRuntime();
		init_resources();
		retained = new WeakMap();
		closeHookRegistered = new WeakSet();
		workerCleanups = new WeakMap();
		workerCleanupFor = (scope) => {
			let cleanup = workerCleanups.get(scope);
			if (cleanup === undefined) {
				cleanup = new WorkerCleanupRegistry();
				workerCleanups.set(scope, cleanup);
			}
			return cleanup;
		};
		createJavaScriptSourceAnalysis = (limits, sourceCount, acquisition = {}) => {
			if (acquisition.scope === undefined) return Promise.resolve(new JavaScriptAnalysisWorker(limits, acquisition.launcher, sourceCount));
			return checkoutJavaScriptSourceAnalysis(acquisition.scope, limits, sourceCount, acquisition.launcher);
		};
		checkoutJavaScriptSourceAnalysis = async (scope, limits, sourceCount, launcher) => {
			registerJavaScriptSourceAnalysisClose(scope);
			const current = retained.get(scope);
			if (current !== undefined && !current.busy) {
				if (sameLimits(current.limits, limits) && current.worker.prepareForAnotherAnalysis(sourceCount)) {
					current.busy = true;
					return new ScopeJavaScriptSourceAnalysis(scope, current.worker);
				}
				retained.delete(scope);
				try {
					await current.worker.close();
				} catch (cause) {
					if (retained.get(scope) === undefined) {
						retained.set(scope, {
							worker: current.worker,
							limits: current.limits,
							busy: false
						});
					} else {
						scope.retain({
							kind: "lease",
							resource: "replaced JavaScript source analyzer",
							lease: { release: () => current.worker.close() }
						});
					}
					throw cause;
				}
			}
			const worker = new JavaScriptAnalysisWorker(limits, launcher, sourceCount, workerCleanupFor(scope));
			if (retained.get(scope) === undefined) retained.set(scope, {
				worker,
				limits,
				busy: true
			});
			return new ScopeJavaScriptSourceAnalysis(scope, worker);
		};
		registerJavaScriptSourceAnalysisClose = (scope) => {
			if (closeHookRegistered.has(scope)) return;
			closeHookRegistered.add(scope);
			scope.addCloseHook(async () => {
				const current = retained.get(scope);
				if (current === undefined) return;
				await current.worker.close();
				if (retained.get(scope) === current) retained.delete(scope);
			});
		};
		sameLimits = (left, right) => {
			const leftAllowance = left.memberMutationAllowance ?? DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE;
			const rightAllowance = right.memberMutationAllowance ?? DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALLOWANCE;
			if (leftAllowance.aliasStates !== rightAllowance.aliasStates || leftAllowance.source !== rightAllowance.source || left.heapMb !== right.heapMb || left.timeoutMs !== right.timeoutMs || left.heapSource !== right.heapSource || left.timeoutSource !== right.timeoutSource) return false;
			const leftPrecision = resolveJavaScriptSemanticPrecision(left.semanticPrecision);
			const rightPrecision = resolveJavaScriptSemanticPrecision(right.semanticPrecision);
			return Object.entries(leftPrecision).every(([key, value]) => rightPrecision[key] === value);
		};
		ScopeJavaScriptSourceAnalysis = class {
			scope;
			worker;
			#failed = false;
			#closed = false;
			constructor(scope, worker) {
				this.scope = scope;
				this.worker = worker;
			}
			analyze(...args) {
				return this.worker.analyze(...args).then((result) => {
					if (!result.ok) this.#failed = true;
					return result;
				});
			}
			async close() {
				if (this.#closed) return;
				this.#closed = true;
				try {
					const current = retained.get(this.scope);
					if (current?.worker === this.worker && !this.#failed && this.worker.canReuse()) {
						current.busy = false;
						return;
					}
					if (current?.worker === this.worker) retained.delete(this.scope);
					await this.worker.close();
				} catch (cause) {
					this.#closed = false;
					throw cause;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/composition/javascriptSourceAnalysis.js
var javascriptSourceAnalysis;
function init_javascriptSourceAnalysis() {
	return (init_javascriptSourceAnalysis = __esmMin((() => {
		init_JavaScriptSourceAnalysis();
		javascriptSourceAnalysis = createJavaScriptSourceAnalysis;
	})))();
}

//#endregion
init_javascriptSourceAnalysis();
export { javascriptSourceAnalysis };