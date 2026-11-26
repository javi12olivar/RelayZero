import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisInputError, AnalysisOutputError, AnalysisTimeoutError, cancelledBy, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_jsonValue, jsonObjectSchema, primaryAnalysisError } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { BrowserObservationError, ProviderAdapterError, init_browserObservationError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactResourceScope, init_AnalysisCleanupLease, init_ArtifactResourceScope, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { init_webScriptArtifacts, selectedWebScriptArtifactsSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { ProviderStartupDeadline, init_ProviderDeadline } from "./ProviderDeadline-BXAnhNBa.js";
import { TYPE_ONLY_MODULE_SIDE_EFFECT_LIMITATION, hasUncertainTypeOnlyModuleSideEffect, init_javascriptAstValues, init_javascriptModuleDeclaration, init_javascriptSemanticTraversal, init_javascriptSourceParser, javaScriptSourceLoaderCondition, parseJavaScriptSource, readExactJavaScriptLiteral, semanticStaticModuleSource, traverseJavaScriptAst } from "./javascriptSourceParser-DNZsD0XO.js";
import { WEB_SCRIPT_TOOL_CONTRACTS, init_webModuleTrace, init_webScriptToolContracts, webModuleFileSchema, webModuleResolutionBatchSchema, webModuleResolutionObservationSchema, webModuleResolutionSchema, webModuleTraceInputSchema, webModuleTraceResultSchema } from "./webScriptToolContracts-BcU3Uy4d.js";
import { LocalWebScriptArtifacts, WEB_MODULE_TRACE_PROVIDER, WebArtifactAcquisition, WebArtifactCleanup, capturedWebManifestIdentity, closeOwnedWebResources, init_LocalWebScriptArtifacts, init_ValidateSelectedWebScript, init_WebArtifactCleanup, init_WebArtifactReads, init_closeOwnedWebResources, init_webTraceProviders, validateSelectedWebScript, webArtifactReadError } from "./WebArtifactCleanup-BlFUijiq.js";
import { chromiumLaunchRemediation, chromiumSandboxEnabled, init_ChromiumSandbox } from "./ChromiumSandbox-C31ogEgo.js";
import { isAbsolute } from "node:path";
import { z } from "zod";
import { isDeepStrictEqual } from "node:util";

//#region dist/domain/webModuleImports.js
var collectWebModuleImports, matchCapturedModules;
function init_webModuleImports() {
	return (init_webModuleImports = __esmMin((() => {
		init_javascriptAstValues();
		init_javascriptSemanticTraversal();
		init_javascriptSourceParser();
		init_javascriptModuleDeclaration();
		collectWebModuleImports = (source, sourcePath) => {
			const ast = parseJavaScriptSource(source, sourcePath);
			if (ast === null) return {
				imports: [],
				state: "unparseable",
				diagnostics: ["Source could not be parsed; imports are unknown."]
			};
			const imports = [];
			const add = (kind, expression) => {
				if (expression.start === null || expression.start === undefined || expression.end === null || expression.end === undefined || expression.loc === null || expression.loc === undefined) return;
				const literal = readExactJavaScriptLiteral(expression);
				const specifier = literal.found && typeof literal.value === "string" ? literal.value : null;
				imports.push({
					kind,
					specifier,
					expression: source.slice(expression.start, expression.end),
					start: {
						offset: expression.start,
						line: expression.loc.start.line,
						column: expression.loc.start.column
					},
					end: {
						offset: expression.end,
						line: expression.loc.end.line,
						column: expression.loc.end.column
					}
				});
			};
			traverseJavaScriptAst(ast, { enter: (node) => {
				const moduleSource = semanticStaticModuleSource(node);
				if (moduleSource !== null) {
					add(node.type === "ImportDeclaration" ? "static-import" : "re-export", moduleSource);
				} else if (node.type === "ImportExpression") add("dynamic-import", node.source);
			} });
			imports.sort((a, b) => a.start.offset - b.start.offset);
			const loaderCondition = javaScriptSourceLoaderCondition(ast.program);
			return {
				imports,
				state: "parsed",
				diagnostics: [
					...loaderCondition === undefined ? [] : [loaderCondition],
					...ast.errors?.map((error) => error.message) ?? [],
					...hasUncertainTypeOnlyModuleSideEffect(ast.program) ? [TYPE_ONLY_MODULE_SIDE_EFFECT_LIMITATION] : []
				]
			};
		};
		matchCapturedModules = (url, scripts) => {
			const transport = URL.parse(url);
			if (transport !== null) transport.hash = "";
			const candidates = [];
			scripts.forEach((script, script_index) => {
				if (script.url === url) candidates.push({
					script_index,
					match: "exact-reported-url",
					script
				});
				else if (script.source.kind === "scenario-response" && transport?.href === script.url) candidates.push({
					script_index,
					match: "response-url-without-fragment",
					script
				});
			});
			return candidates;
		};
	})))();
}

//#endregion
//#region dist/application/WebModuleTraceService.js
var OPERATION$1, artifactsSchema, LIMITATIONS, WebModuleTraceService, admitContext, invalid;
function init_WebModuleTraceService() {
	return (init_WebModuleTraceService = __esmMin((() => {
		init_webTraceProviders();
		init_closeOwnedWebResources();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_evidence();
		init_jsonValue();
		init_result();
		init_webModuleImports();
		init_webModuleTrace();
		init_webScriptArtifacts();
		init_ValidateSelectedWebScript();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		OPERATION$1 = "trace_web_module_imports";
		artifactsSchema = selectedWebScriptArtifactsSchema.extend({ importMap: z.strictObject({
			file: webModuleFileSchema,
			baseUrl: z.string().min(1),
			value: jsonObjectSchema
		}).nullable() });
		LIMITATIONS = [
			"Resolution is derived under the selected importer URL and optional import map; it does not establish that the map was installed in the captured page.",
			"Reported source URLs do not establish an inline script's document base. Select importer_url explicitly when that context differs or is unknown.",
			"Captured candidates retain reported capture metadata; their bytes are not reverified by this trace unless selected as the source.",
			"A resolved URL or captured source does not prove loading, execution, UI causality, or module namespace identity. Execution remains unknown.",
			"Only native ES module syntax is resolved. Bundler module IDs, computed imports, workers and non-HTTP(S) importer contexts are outside this trace.",
			"Source-map declarations do not establish retained map bytes or executed original-source coverage.",
			"Selected application code is parsed as data and never executed. The owned resolver executes only REA's trusted stub; its page requests are locally fulfilled or blocked.",
			"Manifest, source and import-map limits are 32 MiB, 16 MiB and 4 MiB. Native resolution has a 20-second deadline; cleanup may extend it. One renderer is requested; no aggregate host memory limit is claimed."
		];
		WebModuleTraceService = class {
			artifacts;
			resolver;
			constructor(artifacts, resolver) {
				this.artifacts = artifacts;
				this.resolver = resolver;
			}
			close() {
				return closeOwnedWebResources([this.artifacts.close?.bind(this.artifacts), this.resolver.close?.bind(this.resolver)], "Web module trace cleanup failed");
			}
			async trace(rawInput, options) {
				const parsed = parseAnalysisInput(OPERATION$1, rawInput, webModuleTraceInputSchema, options?.signal);
				if (!parsed.ok) return parsed;
				const input = parsed.value;
				for (const [path, value] of [["importer_url", input.importer_url], ["import_map.base_url", input.import_map?.base_url]]) if (value !== undefined) {
					const admission = admitContext(value, path.split("."));
					if (!admission.ok) return admission;
				}
				const loaded = await this.artifacts.load(input, options);
				if (!loaded.ok) return loaded;
				const verified = artifactsSchema.safeParse(loaded.value);
				if (!verified.success) return err(new AnalysisOutputError(OPERATION$1, "Artifact port returned a malformed source/manifest report."));
				const data = verified.data;
				if ((input.import_map?.path ?? null) !== (data.importMap?.file.path ?? null) || (input.import_map?.base_url ?? null) !== (data.importMap?.baseUrl ?? null)) return err(new AnalysisOutputError(OPERATION$1, "Artifact port changed the selected import-map identity/context."));
				const bound = validateSelectedWebScript(input, data, OPERATION$1);
				if (!bound.ok) return bound;
				const selected = bound.value;
				const incomplete = (error) => {
					const resolverObservation = webModuleResolutionObservationSchema.safeParse(error.partialObservation);
					error.partialObservation = {
						...resolverObservation.success ? { resolver_observation: resolverObservation.data } : {},
						kind: "web-trace-observation",
						analysis: "incomplete",
						manifest: data.manifestFile,
						source: data.sourceFile,
						...data.importMap === null ? {} : { import_map: data.importMap.file }
					};
					primaryAnalysisError(error).partialObservation = error.partialObservation;
					return err(error);
				};
				const importerUrl = input.importer_url ?? selected.url;
				if (input.importer_url === undefined) {
					const importerAdmission = admitContext(importerUrl);
					if (!importerAdmission.ok) return incomplete(importerAdmission.error);
				}
				const syntax = collectWebModuleImports(data.source, data.sourceFile.path);
				const literals = syntax.imports.filter((reference) => reference.specifier !== null).map((reference) => reference.specifier ?? "");
				let resolution = null;
				let resolutionFailure;
				if (literals.length > 0) {
					if (options?.signal?.aborted) return incomplete(cancelledBy(OPERATION$1, options.signal));
					const request = {
						importerUrl,
						importMap: data.importMap === null ? null : {
							baseUrl: data.importMap.baseUrl,
							value: data.importMap.value
						},
						specifiers: literals
					};
					const execution = await this.resolver.resolve(request, options);
					if (execution.ok) {
						const report = webModuleResolutionBatchSchema.safeParse(execution.value);
						if (!report.success) return incomplete(new AnalysisOutputError(OPERATION$1, "Resolver returned malformed or incomplete native evidence."));
						resolution = report.data;
					} else {
						const observation = webModuleResolutionObservationSchema.safeParse(execution.error.partialObservation);
						if (!observation.success || !isDeepStrictEqual(observation.data.request, request) || observation.data.batch.resolutions.length !== literals.length) return incomplete(execution.error);
						resolution = observation.data.batch;
						resolutionFailure = execution.error;
					}
					if (resolution.resolutions.length !== literals.length) return incomplete(new AnalysisOutputError(OPERATION$1, "Resolver did not return every selected literal specifier."));
				}
				let literalIndex = 0;
				const imports = [];
				for (const reference of syntax.imports) {
					let resolved;
					if (reference.specifier === null) resolved = {
						state: "unknown",
						reason: "computed-specifier"
					};
					else {
						const reported = resolution?.resolutions[literalIndex++];
						if (reported === undefined) return incomplete(new AnalysisOutputError(OPERATION$1, "Resolver omitted a selected literal specifier."));
						resolved = reported;
					}
					imports.push({
						...reference,
						resolution: resolved,
						captured_candidates: resolved.state === "resolved" ? matchCapturedModules(resolved.url, data.manifest.scripts) : [],
						execution: "unknown"
					});
				}
				const normalized = webModuleTraceResultSchema.safeParse({
					manifest: capturedWebManifestIdentity(data),
					source: {
						...data.sourceFile,
						script_index: input.script_index,
						script: selected
					},
					importer: {
						url: importerUrl,
						basis: input.importer_url === undefined ? "reported-source-url" : "caller-selected"
					},
					import_map: data.importMap === null ? null : {
						...data.importMap.file,
						base_url: data.importMap.baseUrl
					},
					parser: {
						state: syntax.state,
						diagnostics: syntax.diagnostics,
						location_units: "UTF-16 offsets and columns; one-based lines"
					},
					engine: resolution?.engine ?? null,
					imports,
					diagnostics: resolution?.diagnostics ?? [],
					limitations: LIMITATIONS
				});
				if (!normalized.success) return incomplete(new AnalysisOutputError(OPERATION$1, normalized.error.message));
				const evidence = createEvidence({
					path: data.sourceFile.path,
					sha256: data.sourceFile.sha256,
					format: "file"
				}, WEB_MODULE_TRACE_PROVIDER, {
					operation: OPERATION$1,
					parameters: input,
					result: normalized.data,
					rawResult: resolution?.rawResult ?? null,
					confidence: "derived",
					authority: "historical-reference",
					limitations: LIMITATIONS,
					locations: [{
						kind: "artifact-path",
						path: data.sourceFile.path
					}, {
						kind: "artifact-path",
						path: input.manifest_path
					}],
					evidenceLinks: data.manifest.source_evidence_id === null ? [] : [data.manifest.source_evidence_id]
				});
				if (resolutionFailure !== undefined) {
					resolutionFailure.partialObservation = evidence;
					return err(resolutionFailure);
				}
				return completeProviderEvidence(evidence, options?.signal);
			}
		};
		admitContext = (value, path) => {
			const reportedUnavailable = () => err(new AnalysisCapabilityUnavailableError("web-module-resolution", OPERATION$1, "reported_source_context_unavailable", { userMessage: "The manifest's reported source URL is not a usable HTTP(S) module context. Select importer_url explicitly for this script." }));
			let url;
			try {
				url = new URL(value);
			} catch (cause) {
				void cause;
				if (path === undefined) return reportedUnavailable();
				return invalid(path, "Expected an absolute context URL. Select importer_url explicitly when the reported source URL is unknown.");
			}
			if (url.username !== "" || url.password !== "") {
				if (path === undefined) return reportedUnavailable();
				return invalid(path, "Module context URLs must not contain username/password userinfo.");
			}
			if (url.protocol !== "http:" && url.protocol !== "https:") {
				return err(new AnalysisCapabilityUnavailableError("web-module-resolution", OPERATION$1, "unsupported_context_scheme", { userMessage: `${path?.join(".") ?? "The reported source URL"} ${value} uses unsupported ${url.protocol} context. This trace currently supports HTTP(S) importer/map contexts; select a supported context explicitly when appropriate.` }));
			}
			return ok(null);
		};
		invalid = (path, message) => err(new AnalysisInputError(OPERATION$1, undefined, [{
			path,
			reason: "invalid_format",
			message
		}]));
	})))();
}

//#endregion
//#region dist/browser/modules/WebModuleArtifacts.js
var LocalWebModuleArtifacts;
function init_WebModuleArtifacts() {
	return (init_WebModuleArtifacts = __esmMin((() => {
		init_resources();
		init_jsonValue();
		init_result();
		init_WebArtifactCleanup();
		init_LocalWebScriptArtifacts();
		init_WebArtifactReads();
		LocalWebModuleArtifacts = class {
			scripts;
			#resources;
			#cleanup;
			constructor(scripts, resources = scripts instanceof LocalWebScriptArtifacts ? scripts.resources : new ArtifactResourceScope()) {
				this.#resources = resources;
				this.scripts = scripts ?? new LocalWebScriptArtifacts("trace_web_module_imports", resources);
				this.#cleanup = new WebArtifactCleanup("web-module-artifacts", resources, this.scripts);
			}
			async close() {
				return this.#cleanup.close();
			}
			/** Read selected source and optional map without website requests. */
			async load(input, options) {
				const acquisition = new WebArtifactAcquisition();
				try {
					return await this.#resources.run(() => this.#load(input, acquisition, options));
				} catch (cause) {
					return err(acquisition.retain(webArtifactReadError(cause, {
						operation: "trace_web_module_imports",
						field: input.import_map === undefined ? ["manifest_path"] : ["import_map", "path"],
						targetPath: input.import_map?.path ?? input.manifest_path,
						callerSelected: input.import_map !== undefined
					}, options?.signal)));
				}
			}
			async #load(input, acquisition, options) {
				const loaded = await this.scripts.load(input, options);
				if (!loaded.ok) return loaded;
				acquisition.record("manifest", loaded.value.manifestFile, "manifest-validated");
				acquisition.record("source", loaded.value.sourceFile, "source-verified");
				if (input.import_map === undefined) return ok({
					...loaded.value,
					importMap: null
				});
				const selected = input.import_map;
				const data = await acquisition.readJson("import-map", selected.path, 4 * 1024 * 1024, options?.signal, this.#resources);
				const importMap = {
					file: {
						path: selected.path,
						sha256: data.sha256,
						bytes: data.bytes.length
					},
					baseUrl: selected.base_url,
					value: jsonObjectSchema.parse(data.value)
				};
				return ok({
					...loaded.value,
					importMap
				});
			}
		};
	})))();
}

//#endregion
//#region dist/browser/modules/importMapForTrustedResolver.js
var importMapForTrustedResolver, importerModuleIdentity, integrityKeyMatchesImporter;
function init_importMapForTrustedResolver() {
	return (init_importMapForTrustedResolver = __esmMin((() => {
		importMapForTrustedResolver = (map, importerUrl, baseUrl) => {
			const integrity = map.integrity;
			if (integrity === null || typeof integrity !== "object" || Array.isArray(integrity)) return map;
			const importer = importerModuleIdentity(importerUrl, baseUrl);
			const nextIntegrity = Object.create(null);
			let removed = false;
			for (const [key, value] of Object.entries(integrity)) {
				if (integrityKeyMatchesImporter(key, baseUrl, importer)) {
					removed = true;
					continue;
				}
				nextIntegrity[key] = value;
			}
			if (!removed) return map;
			if (Object.keys(nextIntegrity).length === 0) {
				const { integrity: _omit, ...rest } = map;
				return rest;
			}
			return {
				...map,
				integrity: nextIntegrity
			};
		};
		importerModuleIdentity = (importerUrl, baseUrl) => {
			const absolute = new URL(importerUrl, baseUrl);
			const withoutHash = new URL(absolute.href);
			withoutHash.hash = "";
			return {
				hrefs: new Set([absolute.href, withoutHash.href]),
				moduleKey: `${absolute.origin}${absolute.pathname}`
			};
		};
		integrityKeyMatchesImporter = (key, baseUrl, importer) => {
			try {
				const resolved = new URL(key, baseUrl);
				const withoutHash = new URL(resolved.href);
				withoutHash.hash = "";
				return importer.hrefs.has(resolved.href) || importer.hrefs.has(withoutHash.href) || `${resolved.origin}${resolved.pathname}` === importer.moduleKey;
			} catch {
				return false;
			}
		};
	})))();
}

//#endregion
//#region dist/browser/modules/NativeModuleResolver.js
var OPERATION, TIMEOUT_MS, reportSchema, launch, moduleResolverFailure, NativeModuleResolver, resolveInBrowser, completedObservation, cleanupFailure, scriptJson, htmlAttribute;
function init_NativeModuleResolver() {
	return (init_NativeModuleResolver = __esmMin((() => {
		init_snapshotEnvironment();
		init_HostPlatform();
		init_ChromiumSandbox();
		init_analysisErrorCleanup();
		init_analysisErrorCancellation();
		init_analysisErrorCore();
		init_browserObservationError();
		init_jsonValue();
		init_providerAdapterError();
		init_providerCleanupError();
		init_result();
		init_resources();
		init_webModuleTrace();
		init_ProviderDeadline();
		init_importMapForTrustedResolver();
		init_errorMessage();
		OPERATION = "trace_web_module_imports";
		TIMEOUT_MS = 2e4;
		reportSchema = z.strictObject({
			importer_url: z.string(),
			entries: z.array(z.strictObject({
				specifier: z.string(),
				resolution: webModuleResolutionSchema
			}))
		});
		launch = async (options) => (await import("playwright-core")).chromium.launch(options);
		moduleResolverFailure = (cause, executable, remediationAction) => new ProviderAdapterError("native-module-resolver", OPERATION, {
			cause,
			...remediationAction === undefined ? {} : { remediationAction },
			diagnostics: {
				executable,
				error_message: errorMessage(cause)
			}
		});
		NativeModuleResolver = class {
			launcher;
			platform;
			#tail = Promise.resolve();
			#closing = false;
			#closePromise;
			#pendingCleanup;
			environment;
			constructor(environment, launcher = launch, platform = HOST_PLATFORM.platform) {
				this.launcher = launcher;
				this.platform = platform;
				this.environment = snapshotEnvironment(environment, platform);
			}
			resolve(input, options) {
				if (this.#closing) return Promise.resolve(err(this.#closedError()));
				const operation = this.#tail.then(() => this.#closing ? err(this.#closedError()) : this.#resolve(input, options));
				this.#tail = operation.then(() => undefined, () => undefined);
				return operation;
			}
			async #resolve(input, options) {
				if (options?.signal?.aborted === true) return err(cancelledBy(OPERATION, options.signal));
				const pending = await this.#retryCleanup();
				if (pending !== undefined) return err(pending);
				const executable = this.environment.REA_BROWSER_EXECUTABLE;
				if (executable === undefined || !isAbsolute(executable)) return err(new AnalysisCapabilityUnavailableError("native-module-resolver", OPERATION, executable === undefined ? "missing_browser_executable" : "invalid_browser_executable", {
					userMessage: "Provide an absolute REA_BROWSER_EXECUTABLE for a caller-supplied Chromium browser supporting import.meta.resolve. REA installs no browser.",
					...executable === undefined ? {} : { diagnostics: { executable } }
				}));
				const chromiumSandbox = chromiumSandboxEnabled(this.environment, this.platform);
				const deadline = new ProviderStartupDeadline(TIMEOUT_MS, options?.signal);
				let activeCall;
				let interruption;
				const interrupted = () => deadline.interruption === "cancelled" ? cancelledBy(OPERATION, deadline.signal) : new AnalysisTimeoutError(OPERATION, TIMEOUT_MS);
				const assertActive = () => {
					if (!deadline.signal.aborted) return;
					interruption = interrupted();
					throw interruption;
				};
				const observe = (call) => {
					assertActive();
					const observed = { settled: false };
					activeCall = observed;
					return call().then((value) => {
						observed.settled = true;
						return value;
					}, (cause) => {
						observed.settled = true;
						throw observed.interruption === undefined ? cause : observed.interruption;
					});
				};
				let lease;
				let launched = false;
				let cleanup;
				const close = () => {
					if (cleanup === undefined && lease !== undefined) {
						const owned = lease;
						cleanup = Promise.resolve().then(async () => {
							await owned.release();
							this.#pendingCleanup = undefined;
						});
					}
					return cleanup ?? Promise.resolve();
				};
				const onAbort = () => {
					if (lease !== undefined) {
						const pending = close();
						void pending.catch(() => undefined);
					}
				};
				deadline.signal.addEventListener("abort", onAbort, { once: true });
				let result;
				try {
					assertActive();
					const browser = await observe(() => this.launcher({
						executablePath: executable,
						env: this.environment,
						headless: true,
						timeout: Math.max(1, deadline.remainingMs()),
						handleSIGINT: false,
						handleSIGTERM: false,
						handleSIGHUP: false,
						chromiumSandbox,
						args: [
							"--disable-dev-shm-usage",
							"--disable-background-networking",
							"--renderer-process-limit=1",
							"--js-flags=--max-old-space-size=128"
						]
					}));
					launched = true;
					lease = new AnalysisCleanupLease(async () => {
						if (deadline.signal.aborted && activeCall !== undefined && !activeCall.settled) {
							interruption = interrupted();
							activeCall.interruption = interruption;
						}
						await browser.close();
					}, ["chromium-browser"]);
					this.#pendingCleanup = lease;
					assertActive();
					result = ok(await resolveInBrowser(browser, input, deadline, executable, assertActive, observe));
				} catch (cause) {
					result = err(cause === interruption && interruption !== undefined ? interruption : cause instanceof AnalysisOutputError || cause instanceof AnalysisCapabilityUnavailableError || cause instanceof BrowserObservationError ? cause : moduleResolverFailure(cause, executable, launched || !chromiumSandbox ? undefined : chromiumLaunchRemediation(true)));
				} finally {
					deadline.signal.removeEventListener("abort", onAbort);
					deadline.dispose();
				}
				let cleanupError;
				try {
					await close();
				} catch (cause) {
					cleanupError = cleanupFailure(cause, result.ok ? completedObservation(input, result.value) : undefined);
					if (lease !== undefined) new AnalysisCleanupLeaseGroup(cleanupError, [lease]);
				}
				if (options?.signal?.aborted) result = err(analysisErrorWithCancellation(result.ok ? undefined : result.error, cancelledBy(OPERATION, options.signal, result.ok ? { partialObservation: completedObservation(input, result.value) } : {})));
				if (cleanupError !== undefined) return err(result.ok ? cleanupError : analysisErrorWithCleanupDependencies(result.error, cleanupError, OPERATION));
				return result;
			}
			async close() {
				this.#closing = true;
				this.#closePromise ??= this.#tail.then(async () => {
					const failure = await this.#retryCleanup();
					if (failure !== undefined) throw failure;
				}).catch((cause) => {
					this.#closePromise = undefined;
					throw cause;
				});
				return this.#closePromise;
			}
			#closedError() {
				return new AnalysisCapabilityUnavailableError("native-module-resolver", OPERATION, "Native module resolver is closing.");
			}
			async #retryCleanup() {
				const lease = this.#pendingCleanup;
				if (lease === undefined) return undefined;
				try {
					await lease.release();
					this.#pendingCleanup = undefined;
					return undefined;
				} catch (cause) {
					const failure = cleanupFailure(cause);
					new AnalysisCleanupLeaseGroup(failure, [lease]);
					return failure;
				}
			}
		};
		resolveInBrowser = async (browser, input, deadline, executable, assertActive, observe) => {
			const context = await observe(() => browser.newContext({
				serviceWorkers: "block",
				acceptDownloads: false
			}));
			const page = await observe(() => context.newPage());
			const diagnostics = [];
			let diagnosticBytes = 0;
			page.on("console", (message) => {
				const text = message.text();
				diagnosticBytes += Buffer.byteLength(text);
				if (diagnosticBytes <= 1024 * 1024) diagnostics.push(`${message.type()}: ${text}`);
			});
			const requests = [];
			const importerUrl = new URL(input.importerUrl).href;
			const documentUrl = new URL("/.rea-module-resolver/document", importerUrl).href;
			const transportUrl = new URL(importerUrl);
			transportUrl.hash = "";
			let stubSent = false;
			await observe(() => context.route("**/*", async (route) => {
				const request = route.request();
				if (request.resourceType() === "document" && request.url() === documentUrl.split("#")[0]) {
					requests.push({
						url: request.url(),
						resource_type: "document",
						effect: "fulfilled"
					});
					await route.fulfill({
						status: 200,
						contentType: "text/html",
						body: `<!doctype html>${input.importMap === null ? "" : `<base href="${htmlAttribute(new URL(input.importMap.baseUrl).href)}"><script type="importmap">${scriptJson(importMapForTrustedResolver(input.importMap.value, importerUrl, input.importMap.baseUrl))}<\/script>`}`
					});
				} else if (!stubSent && request.resourceType() === "script" && request.url() === transportUrl.href) {
					stubSent = true;
					requests.push({
						url: request.url(),
						resource_type: "script",
						effect: "fulfilled"
					});
					await route.fulfill({
						status: 200,
						contentType: "text/javascript",
						headers: { "Access-Control-Allow-Origin": "*" },
						body: `if (typeof import.meta.resolve !== "function") {globalThis.__reaModuleUnsupported = true;} else {globalThis.__reaModuleResult = {importer_url: import.meta.url, entries: ${scriptJson(input.specifiers)}.map(specifier => {try {return {specifier, resolution: {state: "resolved", url: import.meta.resolve(specifier)}}} catch (error) {return {specifier, resolution: {state: "rejected", message: String(error)}}}})};}`
					});
				} else {
					requests.push({
						url: request.url(),
						resource_type: request.resourceType(),
						effect: "blocked"
					});
					await route.abort("failed");
				}
			}));
			await observe(() => page.goto(documentUrl, { timeout: Math.max(1, deadline.remainingMs()) }));
			await observe(() => page.evaluate(`{const script = document.createElement("script"); script.type = "module"; script.src = ${scriptJson(importerUrl)}; script.onerror = () => {globalThis.__reaModuleFailure = "Trusted resolver stub could not be loaded in the selected context.";}; document.head.append(script);}`));
			await observe(() => page.waitForFunction(() => Reflect.has(globalThis, "__reaModuleResult") || Reflect.has(globalThis, "__reaModuleUnsupported") || Reflect.has(globalThis, "__reaModuleFailure"), undefined, { timeout: Math.max(1, deadline.remainingMs()) }));
			const unsupported = await observe(() => page.evaluate(() => Reflect.get(globalThis, "__reaModuleUnsupported")));
			if (unsupported === true) throw new AnalysisCapabilityUnavailableError("native-module-resolver", OPERATION, "native_resolution_unsupported", { userMessage: `Configured Chromium ${browser.version()} does not supply import.meta.resolve; use a browser supporting native module resolution.` });
			const raw = await observe(() => page.evaluate(() => Reflect.get(globalThis, "__reaModuleResult")));
			const failure = await observe(() => page.evaluate(() => Reflect.get(globalThis, "__reaModuleFailure")));
			if (typeof failure === "string") throw new AnalysisOutputError(OPERATION, `${failure} Native diagnostics: ${diagnostics.join("\n")}`);
			const parsed = reportSchema.safeParse(raw);
			if (!parsed.success || parsed.data.importer_url !== importerUrl || parsed.data.entries.length !== input.specifiers.length || parsed.data.entries.some((entry, index) => entry.specifier !== input.specifiers[index])) throw new AnalysisOutputError(OPERATION, "Native resolver report has invalid shape or does not match the selected importer/specifiers.");
			if (diagnosticBytes > 1024 * 1024) throw new BrowserObservationError(OPERATION, "payload_limit");
			assertActive();
			const engine = {
				id: "chromium-native-module-resolver",
				version: browser.version()
			};
			return {
				engine,
				resolutions: parsed.data.entries.map((entry) => entry.resolution),
				diagnostics,
				rawResult: jsonObjectSchema.parse({
					native_report: parsed.data,
					requests,
					diagnostics,
					engine,
					executable_path: executable
				})
			};
		};
		completedObservation = (input, batch) => ({
			kind: "web-module-resolution",
			request: input,
			batch
		});
		cleanupFailure = (cause, observation) => new ProviderCleanupError("native-module-resolver", ["chromium-browser"], { reason: errorMessage(cause) }, {
			cause,
			operation: OPERATION,
			...observation === undefined ? {} : { partialObservation: observation }
		});
		scriptJson = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");
		htmlAttribute = (value) => value.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
	})))();
}

//#endregion
//#region dist/composition/webModules.js
var createWebModuleTraceService;
function init_webModules() {
	return (init_webModules = __esmMin((() => {
		init_WebModuleTraceService();
		init_WebModuleArtifacts();
		init_NativeModuleResolver();
		createWebModuleTraceService = (environment = process.env) => new WebModuleTraceService(new LocalWebModuleArtifacts(), new NativeModuleResolver(environment));
	})))();
}

//#endregion
//#region dist/cli/webModuleCommands.js
var webModuleCommands_exports = /* @__PURE__ */ __exportAll({ registerWebModuleCommands: () => registerWebModuleCommands });
var registerWebModuleCommands;
function init_webModuleCommands() {
	return (init_webModuleCommands = __esmMin((() => {
		init_webModules();
		init_webScriptToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_finishAnalysisCommand();
		init_projectCliAnalysisResult();
		registerWebModuleCommands = (cli, logger, environment) => {
			const service = createWebModuleTraceService(environment);
			registerContractCommand(cli, logger, contractNamed(WEB_SCRIPT_TOOL_CONTRACTS, "trace_web_module_imports"), {
				description: "Trace one captured script's native imports to URLs and captured source candidates",
				positionals: ["manifest_path", "script_index"],
				callerPaths: ["manifest_path"],
				fields: {
					manifest_path: { description: "export_web_scripts manifest path; a relative path resolves against the current directory" },
					script_index: { description: "Zero-based manifest script index" }
				},
				flatten: { import_map: {
					path: {
						name: "importMapPath",
						description: "Absolute local import-map JSON path; requires --import-map-base-url"
					},
					base_url: {
						name: "importMapBaseUrl",
						description: "HTTP(S) import-map base URL; requires --import-map-path"
					}
				} }
			}, (input, { operation, signal }) => finishAnalysisCommand(() => service.trace(input, { signal }), service, "web-module-trace", operation, signal).then(projectCliAnalysisResult));
		};
	})))();
}

//#endregion
export { init_webModuleCommands, webModuleCommands_exports };