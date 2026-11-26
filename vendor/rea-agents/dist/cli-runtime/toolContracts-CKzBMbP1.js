import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, analysisSettingIdSchema, analysisSettingIds, analysisSettingValueSchema, excludedValues, explicitTextSpellings, explicitUtf16Spellings, init_analysisSettingDefinitions, init_explicitSensitiveValues, init_jsonValue, init_localPath, init_schemaConstraints, init_sha256Hex, jsonObjectSchema, jsonValueSchema, lowercasePercentEscapes, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { analysisErrorProjectionSchema, init_analysisErrorProjectionSchema } from "./analysisErrorProjectionSchema-BLLVQLxu.js";
import { fixedTupleSchema, init_fixedTupleSchema } from "./relationshipCoverage-2rn3-vch.js";
import { init_evidenceReference, retainedEvidenceReferenceSchema } from "./nativeValueFlow-13oOEkkJ.js";
import { init_digests, prefixedDigestSchema } from "./targetIdentity-rKLLVwEj.js";
import { TEMPLATE_RULES, commandEvidenceDetailSchema, environmentCoverageSchema, gdbCommandResultSchema, gdbCommandSummaryViewResultSchema, init_analysisViewResult, init_commandObservation, init_environmentCoverageView, init_environmentManifestRules } from "./analysisViewResult-vDCF9Pxo.js";
import { SESSION_TOOL_CONTRACTS, analysisDetailOutputSchemaOf, evidenceResultOf, init_analysisDetail, init_sessionToolContracts, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { ENHANCED_TOOL_CONTRACTS, OFFICIAL_TOOL_CONTRACTS, init_enhancedToolContracts, init_officialToolContracts } from "./officialToolContracts-7Ov7fJ7b.js";
import { ELECTRON_TOOL_CONTRACTS, init_electronToolContracts } from "./electronToolContracts-BJB7T-ib.js";
import { DEBUGGER_SESSION_STOP_CODES, REVERSE_ENGINEERING_TOOL_CONTRACTS, init_debuggerSessionErrors, init_reverseEngineeringToolContracts } from "./debuggerSessionErrors-DVbME-2z.js";
import { CUTTER_TOOL_CONTRACTS, init_cutterToolContracts } from "./cutterToolContracts-5J5KAqZM.js";
import { NATIVE_TOOL_CONTRACTS, init_nativeToolContracts } from "./nativeToolContracts-CqgzCixq.js";
import { BINARY_DIAGNOSTICS_TOOL_CONTRACTS, init_binaryDiagnosticsToolContracts } from "./binaryDiagnosticsToolContracts-BCu-o_Ek.js";
import { WASM_TOOL_CONTRACTS, init_wasmToolContracts } from "./wasmToolContracts-BdlCpRGM.js";
import { APK_SIGNATURE_TOOL_CONTRACTS, init_apkSignatureToolContracts } from "./apkSignatureToolContracts-Dj4-VNg1.js";
import { CAPTURE_TOOL_CONTRACTS, init_captureToolContracts } from "./captureToolContracts-sg1Etrtd.js";
import { SIGNAL_TOOL_CONTRACTS, init_signalToolContracts } from "./signalToolContracts-O7asDp-K.js";
import { EVM_TOOL_CONTRACTS, init_evmToolContracts } from "./evmToolContracts-Ckx5mJFb.js";
import { DESKTOP_APPLICATION_TOOL_CONTRACTS, init_desktopApplicationToolContracts } from "./desktopApplicationToolContracts-DNyd7u1e.js";
import { RELEASE_EXPOSURE_TOOL_CONTRACTS, init_releaseExposureToolContracts } from "./releaseExposureToolContracts-CNE2AmJ-.js";
import { GO_TOOL_CONTRACTS, init_goToolContracts } from "./goToolContracts-D8ZBiXW7.js";
import { IL2CPP_TOOL_CONTRACTS, init_il2cppToolContracts } from "./il2cppToolContracts-BAlwyFY0.js";
import { MODEL_TOOL_CONTRACTS, init_modelToolContracts } from "./modelToolContracts-BW0RcXpl.js";
import { GPU_TOOL_CONTRACTS, init_gpuToolContracts } from "./gpuToolContracts-B3SmOPZd.js";
import { RUST_TOOL_CONTRACTS, init_rustToolContracts } from "./rustToolContracts-BelkoKV1.js";
import { PYTHON_PYC_TOOL_CONTRACTS, init_pythonPycToolContracts } from "./pythonPycToolContracts-D5lpyL_R.js";
import { NUGET_NUPKG_TOOL_CONTRACTS, init_nupkgToolContracts } from "./nupkgToolContracts-BZjZoR7l.js";
import { ERLANG_BEAM_TOOL_CONTRACTS, init_beamToolContracts } from "./beamToolContracts-CuwVbLlX.js";
import { V8_CODE_CACHE_TOOL_CONTRACTS, init_v8CodeCacheToolContracts } from "./v8CodeCacheToolContracts-nIOfP95w.js";
import { MAVEN_GRADLE_METADATA_TOOL_CONTRACTS, init_mavenGradleMetadataToolContracts } from "./mavenGradleMetadataToolContracts-JP_1Nbrs.js";
import { SQLITE_TOOL_CONTRACTS, init_sqliteToolContracts } from "./sqliteToolContracts-BxIT0LzG.js";
import { ARTIFACT_TOOL_CONTRACTS, init_artifactToolContracts } from "./artifactToolContracts-CuhZwra_.js";
import { MANAGED_TOOL_CONTRACTS, MANAGED_WORKFLOW_TOOL_CONTRACTS, init_managedToolContracts, init_managedWorkflowToolContracts } from "./managedToolContracts-DCzEqSx6.js";
import { FIRMWARE_TOOL_CONTRACTS, init_firmwareToolContracts } from "./firmwareToolContracts-Dmpu0DWo.js";
import { UEFI_TOOL_CONTRACTS, init_uefiToolContracts } from "./uefiToolContracts-j-5aPkGK.js";
import { ANDROID_TOOL_CONTRACTS, init_androidToolContracts } from "./androidToolContracts-LEcMJlru.js";
import { PCAP_TOOL_CONTRACTS, init_pcapToolContracts } from "./pcapToolContracts-eul0Sq_H.js";
import { FLUTTER_TOOL_CONTRACTS, init_flutterToolContracts } from "./flutterToolContracts-DTNxBYQa.js";
import { FRIDA_TOOL_CONTRACTS, init_fridaToolContracts } from "./fridaToolContracts-COjdPrAV.js";
import { APKTOOL_TOOL_CONTRACTS, init_apktoolToolContracts } from "./apktoolToolContracts-DcTEGIda.js";
import { JEB_TOOL_CONTRACTS, init_jebToolContracts } from "./jebToolContracts-BwzdffZj.js";
import { ADB_TOOL_CONTRACTS, init_adbToolContracts } from "./adbToolContracts-Cu1lFp9U.js";
import { BROWSER_TOOL_CONTRACTS, init_browserToolContracts } from "./browserToolContracts-DbPtPXBh.js";
import { WEB_RUNTIME_TOOL_CONTRACTS, init_webRuntimeToolContracts } from "./webRuntimeToolContracts-C663caIT.js";
import { WEB_NETWORK_CAPTURE_TOOL_CONTRACTS, init_webNetworkCaptureToolContracts } from "./webNetworkCaptureToolContracts-B9gT7NsJ.js";
import { BROWSER_SCENARIO_TOOL_CONTRACTS, init_browserScenarioToolContracts } from "./browserScenarioToolContracts-BUcxF_38.js";
import { JAVASCRIPT_RUNTIME_OBSERVATION_TOOL_CONTRACTS, init_javascriptRuntimeObservationToolContracts } from "./javascriptRuntimeObservationToolContracts-DijKZHpO.js";
import { APPLICATION_TOOL_CONTRACTS, init_applicationToolContracts } from "./applicationToolContracts-BF58W5cg.js";
import { ANALYSIS_VIEW_TOOL_CONTRACTS, init_analysisViewToolContracts } from "./analysisViewToolContracts-CBSSJIK5.js";
import { DEBIAN_PACKAGE_NAME, INSTALL_SCRIPT, SEED_CHECKPOINT, buildCheckpointNameSchema, buildStatePathSchema, decodeStateText, desktopCheckpointSchema, init_appExportInstall, init_aptRepositories, init_buildCapture, init_debianPackageFile, init_desktopCapture, init_stateFormats, isArmoredKey, jsonStringChunks } from "./x11Windows-Cx5-JOUb.js";
import { JAVASCRIPT_RECOVERY_TOOL_CONTRACTS, init_javascriptRecoveryToolContracts } from "./javascriptRecoveryToolContracts-TpJIfDoP.js";
import { WEB_SCRIPT_TOOL_CONTRACTS, init_webScriptToolContracts } from "./webScriptToolContracts-BcU3Uy4d.js";
import { BUILD_COMPUTER_SETTINGS, BUNDLE_SETTING_VARIABLE, init_buildComputerSettings } from "./buildComputerSettings-CBkm3nxB.js";
import { desktopTaskSchema, gunzip, init_appTask, init_gzipDocument, isGzip } from "./stateChanges-DKaIbxqq.js";
import { COMPUTER_ARCHITECTURES, DOWNLOAD_INSTALL_SCRIPT, appModuleFile, aptSources, className, downloadFields, downloadInstallFiles, downloadUrlSchema, downloadedFile, environmentName, init_appDownloadInstall, init_appExport, init_shellQuote, py, pyList, renderEnvToml, renderInstallScript, renderSmokeTask, sha256Schema, shellQuote, tarballFields } from "./appExport-CjCA74-5.js";
import { PYTHON_BUILD_ARCHIVE, init_appBuildArchive } from "./appBuildArchive-C5zrHQMh.js";
import { SETTLE_TIMING, init_appSettle } from "./appSettle-CupYK5Tz.js";
import { init_portableBundleName, portableBundleNameSchema } from "./portableBundleName-DrrdjNIx.js";
import { draftNoteSchema, draftValueSchema, init_appTaskDraftNotes, init_appTaskDraftValues } from "./appTaskDraftNotes-B1V58heG.js";
import { MAX_WITHHELD_BYTES, SIGN_IN_END, SIGN_IN_START, init_appWithheld } from "./appWithheld-WlVw2GpU.js";
import { z } from "zod";

//#region dist/contracts/analysisSettingsContracts.js
var inspectAnalysisSettingsInputSchema, updateAnalysisSettingsInputSchema, descriptor, analysisSettingsResultSchema, updateAnalysisSettingsResultSchema, ANALYSIS_SETTINGS_TOOL_CONTRACTS;
function init_analysisSettingsContracts() {
	return (init_analysisSettingsContracts = __esmMin((() => {
		init_analysisErrorProjectionSchema();
		init_analysisSettingDefinitions();
		init_toolEffects();
		inspectAnalysisSettingsInputSchema = z.strictObject({
			settings: z.array(analysisSettingIdSchema).max(analysisSettingIds.length).optional(),
			operation: z.string().min(1).optional(),
			provider: z.string().min(1).optional()
		});
		updateAnalysisSettingsInputSchema = z.strictObject({
			changes: z.array(z.union([...analysisSettingIds.map((setting) => z.strictObject({
				setting: z.literal(setting),
				action: z.literal("set"),
				value: analysisSettingValueSchema(setting)
			})), z.strictObject({
				setting: analysisSettingIdSchema,
				action: z.literal("reset")
			})])).min(1).max(analysisSettingIds.length),
			expected_revision: z.number().int().nonnegative().optional()
		});
		descriptor = z.strictObject({
			setting: analysisSettingIdSchema,
			value: z.number().nullable().optional(),
			launch_value: z.number().nullable().optional(),
			default_value: z.number().nullable(),
			source: z.enum([
				"default",
				"setting",
				"runtime",
				"invalid"
			]),
			configuration_error: analysisErrorProjectionSchema.optional(),
			unit: z.enum([
				"bytes",
				"ms",
				"seconds",
				"MiB",
				"count"
			]),
			minimum: z.number(),
			maximum: z.number(),
			applies_at: z.enum([
				"next_operation",
				"next_worker",
				"next_startup"
			]),
			update_mode: z.enum(["runtime", "restart"]),
			pending_restart: z.boolean().optional().describe("Whether an accepted configuration is waiting for restart. Omitted when the launch value is invalid and there is no accepted runtime override."),
			provider: z.string(),
			operations: z.array(z.string()),
			environment: z.string().optional(),
			parameter: z.string().optional(),
			agent_editable: z.literal(true)
		});
		analysisSettingsResultSchema = z.strictObject({
			revision: z.number().int().nonnegative(),
			scope: z.literal("rea-runtime"),
			active_values: z.strictObject({ status: z.literal("not_observed") }),
			settings: z.array(descriptor),
			constraints: z.array(z.strictObject({
				control: z.string(),
				authority: z.enum([
					"operator",
					"external",
					"fixed"
				]),
				value: z.number().nullable(),
				unit: z.string(),
				observation: z.enum(["known", "unknown"]),
				recovery: z.string()
			})).optional()
		});
		updateAnalysisSettingsResultSchema = analysisSettingsResultSchema.extend({
			changed: z.boolean(),
			changes: z.array(z.strictObject({
				setting: analysisSettingIdSchema,
				old_value: z.number().nullable().optional(),
				new_value: z.number().nullable().optional()
			})),
			active_work_changed: z.literal(false),
			pending_restart: z.literal(false)
		});
		ANALYSIS_SETTINGS_TOOL_CONTRACTS = [{
			name: "inspect_analysis_settings",
			...toolContractMetadata("inspect_analysis_settings", toolEffects()),
			kind: "application",
			description: "Inspect REA's editable runtime admission sizes, deadlines and worker heaps, their bounds, launch values and application points. No active target is required. Filters intersect. If an error already names a setting and its bounds, update_analysis_settings can be called directly. Explicit per-call arguments override runtime defaults. Active worker values are not observed by this configuration view.",
			inputSchema: inspectAnalysisSettingsInputSchema,
			outputSchema: analysisSettingsResultSchema,
			examples: [{
				title: "Inspect archive header admission",
				input: { settings: ["asar.max_header_bytes"] }
			}]
		}, {
			name: "update_analysis_settings",
			...toolContractMetadata("update_analysis_settings", toolEffects({ mutatesSession: true })),
			kind: "application",
			description: "Atomically set or reset editable runtime defaults for new work. Changes survive target close/open but disappear on REA restart; reset restores launch configuration. Follow an error's named setting/bounds directly, then retry after work and cleanup settle; no inspection is needed when they are supplied. Does not change active work, edit files, restart providers, raise client limits or override explicit per-call arguments.",
			inputSchema: updateAnalysisSettingsInputSchema,
			outputSchema: updateAnalysisSettingsResultSchema,
			examples: [{
				title: "Raise ASAR header admission for a retry",
				input: { changes: [{
					setting: "asar.max_header_bytes",
					action: "set",
					value: 33554432
				}] }
			}]
		}];
	})))();
}

//#endregion
//#region dist/domain/desktop/buildSecrets.js
var buildSecretHandleSchema, MIN_SECRET_CHARACTERS, MAX_SECRET_CHARACTERS, MAX_SETTING_CHARACTERS, MAX_GUNZIPPED_BYTES, secretPlaceholder, isScannableSecret, secretValueRefusal, jsonEscaped, xmlEscaped, textSpellings, byteSpellings, holds, jsonEscapedSecrets, gzipInside, secretsIn, isUncheckedGzip, redactSecrets, redactSecretsInJson;
function init_buildSecrets() {
	return (init_buildSecrets = __esmMin((() => {
		init_gzipDocument();
		init_stateFormats();
		init_explicitSensitiveValues();
		buildSecretHandleSchema = z.string().regex(/^[a-z0-9][a-z0-9._\-]{0,62}$/u).describe("The handle of a secret: the name of a file the person wrote in REA's build-secrets folder. Lowercase letters, digits, dot, dash and underscore.");
		MIN_SECRET_CHARACTERS = 8;
		MAX_SECRET_CHARACTERS = 1024;
		MAX_SETTING_CHARACTERS = 64 * 1024;
		MAX_GUNZIPPED_BYTES = 64 * 1024 * 1024;
		secretPlaceholder = (handle) => `<secret:${handle}>`;
		isScannableSecret = (value) => [...value].length >= MIN_SECRET_CHARACTERS;
		secretValueRefusal = (value, maxCharacters = MAX_SECRET_CHARACTERS, minCharacters = MIN_SECRET_CHARACTERS) => {
			const characters = [...value].length;
			if (characters < minCharacters) return `it holds fewer than ${String(minCharacters)} characters, too few for REA to tell it from ordinary text when it checks the bundle`;
			if (characters > maxCharacters) return `it holds more than ${String(maxCharacters)} characters`;
			if (/\p{Cc}/u.test(value)) return "it holds a control character, such as a line break inside it, which a keyboard does not type";
			return undefined;
		};
		jsonEscaped = (text) => explicitTextSpellings(text, ["json-escaped"])[0] ?? text;
		xmlEscaped = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
		textSpellings = (value) => {
			const escapedXml = xmlEscaped(value);
			const xml = [value, ...[escapedXml, escapedXml.replaceAll(">", "&gt;")].flatMap((text) => [text, text.replaceAll("\"", "&quot;")])];
			const percent = explicitTextSpellings(value, [
				"uri-component",
				"uri-plus-space",
				"form"
			]);
			return [...new Set([
				...xml,
				...xml.map(jsonEscaped),
				...xml.map((text) => jsonEscaped(jsonEscaped(text))),
				...explicitTextSpellings(value, ["hex", "base64"]),
				...percent,
				...percent.map(lowercasePercentEscapes)
			])];
		};
		byteSpellings = (value) => [...textSpellings(value).map((text) => Buffer.from(text, "utf8")), ...explicitUtf16Spellings(value)];
		holds = (bytes, spellings) => {
			const haystack = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.length);
			return spellings.some((spelling) => haystack.includes(spelling));
		};
		jsonEscapedSecrets = (bytes, secrets) => {
			const found = new Set();
			const buffer = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.length);
			let text;
			if (buffer.includes(Buffer.from("\\u"))) text = decodeStateText(bytes);
			if (text === undefined) {
				const hasAligned = (marker) => {
					for (let at = buffer.indexOf(marker); at !== -1; at = buffer.indexOf(marker, at + 1)) if (at % 2 === 0) return true;
					return false;
				};
				const encoding = hasAligned(Buffer.from([
					92,
					0,
					117,
					0
				])) ? "utf-16le" : hasAligned(Buffer.from([
					0,
					92,
					0,
					117
				])) ? "utf-16be" : undefined;
				if (encoding !== undefined) {
					try {
						text = new TextDecoder(encoding, { fatal: true }).decode(bytes);
					} catch {
						return found;
					}
				}
			}
			if (text === undefined) return found;
			const longest = secrets.reduce((max, { value }) => Math.max(max, value.length), 0);
			let window = "";
			let nestedWindow = "";
			let pending = "";
			const scan = (chunk, nested) => {
				const joined = (nested ? nestedWindow : window) + chunk;
				for (const { handle, value } of secrets) if (!found.has(handle) && joined.includes(value)) found.add(handle);
				const tail = joined.slice(-Math.max(longest - 1, 0));
				if (nested) nestedWindow = tail;
				else window = tail;
			};
			const nested = (chunk, end) => {
				const source = pending + chunk;
				let at = 0;
				let decoded = "";
				while (at < source.length) {
					if (!end && source[at] === "\\" && source.length - at < 6) break;
					if (source[at] === "\\" && source[at + 1] === "u" && /^[0-9a-fA-F]{4}$/u.test(source.slice(at + 2, at + 6))) {
						decoded += String.fromCharCode(Number.parseInt(source.slice(at + 2, at + 6), 16));
						at += 6;
					} else decoded += source[at++] ?? "";
				}
				pending = source.slice(at);
				scan(decoded, true);
			};
			for (const chunk of jsonStringChunks(text, Math.max(8192, longest))) {
				if (chunk.first) {
					nested("", true);
					window = "";
					nestedWindow = "";
					pending = "";
				}
				scan(chunk.text, false);
				nested(chunk.text, false);
			}
			nested("", true);
			return found;
		};
		gzipInside = (bytes) => isGzip(bytes) ? gunzip(bytes, MAX_GUNZIPPED_BYTES) : undefined;
		secretsIn = (bytes, secrets, inner) => {
			const scanned = secrets.filter(({ value }) => isScannableSecret(value));
			if (scanned.length === 0) return [];
			const inside = inner ?? gzipInside(bytes);
			const json = jsonEscapedSecrets(bytes, scanned);
			if (inside?.ok === true) for (const handle of jsonEscapedSecrets(inside.value, scanned)) json.add(handle);
			return scanned.flatMap(({ handle, value }) => {
				const spellings = byteSpellings(value);
				return json.has(handle) || holds(bytes, spellings) || inside?.ok === true && holds(inside.value, spellings) ? [handle] : [];
			});
		};
		isUncheckedGzip = (bytes, inner = gzipInside(bytes)) => inner?.ok === false && inner.error === "too_large";
		redactSecrets = (text, secrets) => {
			const spellings = secrets.filter(({ value }) => isScannableSecret(value)).flatMap(({ handle, value }) => textSpellings(value).map((spelling) => ({
				handle,
				spelling
			}))).sort((left, right) => right.spelling.length - left.spelling.length);
			return spellings.reduce((redacted, { handle, spelling }) => redacted.replaceAll(spelling, secretPlaceholder(handle)), text);
		};
		redactSecretsInJson = (value, secrets) => {
			if (!secrets.some(({ value: secret }) => isScannableSecret(secret))) return value;
			if (typeof value === "string") return redactSecrets(value, secrets);
			if (Array.isArray(value)) return value.map((item) => redactSecretsInJson(item, secrets));
			if (value === null || typeof value !== "object") return value;
			return Object.fromEntries(Object.entries(value).map(([name, item]) => [redactSecrets(name, secrets), redactSecretsInJson(item, secrets)]));
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appBuild.js
var BUILD_NODE_VERSION, NODE_TARBALLS, LAUNCHER_PACKAGE, DCONF_PACKAGE, REA_INSTALL_SCRIPT, BUILD_PACKAGE_FILE, ELECTRON_LAUNCH_SCRIPT, REA_PAYLOAD, aptPackageSchema, MAX_EXTRA_PACKAGES, extraPackagesSchema, buildInstallSchema, buildSourceSchema, extraPackagesOf, downloadInstallOf, downloadDeclaration, renderReaInstallScript, buildInstall, renderElectronLaunchScript, renderBuildModule, renderBuildBundle;
function init_appBuild() {
	return (init_appBuild = __esmMin((() => {
		init_buildComputerSettings();
		init_buildSecrets();
		init_localPath();
		init_schemaConstraints();
		init_appExport();
		init_shellQuote();
		init_appDownloadInstall();
		init_appExportInstall();
		init_aptRepositories();
		init_debianPackageFile();
		init_sha256Hex();
		init_appBuildArchive();
		BUILD_NODE_VERSION = "24.22.1";
		NODE_TARBALLS = [{
			arch: "amd64",
			platform: "linux-x64",
			sha256: "6c172a9ab6718f7b801fb5a7bd486af2ee5e32758086a04b84fcce2aa77095e6"
		}, {
			arch: "arm64",
			platform: "linux-arm64",
			sha256: "dbabf7a1cbf947e6059ffad2c27b80041db97dea1e553b62afdee7f13fca336e"
		}];
		LAUNCHER_PACKAGE = "libgtk-3-bin";
		DCONF_PACKAGE = "dconf-cli";
		REA_INSTALL_SCRIPT = "install-rea.sh";
		BUILD_PACKAGE_FILE = "/opt/rea/package.deb";
		ELECTRON_LAUNCH_SCRIPT = "prepare-electron-launch.sh";
		REA_PAYLOAD = "rea-payload.tar";
		aptPackageSchema = z.string().regex(DEBIAN_PACKAGE_NAME).describe("A Debian package name.");
		MAX_EXTRA_PACKAGES = 16;
		extraPackagesSchema = z.array(aptPackageSchema).max(MAX_EXTRA_PACKAGES).default([]).describe("Archive packages installed beside the app, and by its export, such as a runtime piece it needs that its package does not install.");
		buildInstallSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("archive"),
				package: aptPackageSchema,
				extra_packages: extraPackagesSchema
			}),
			z.strictObject({
				kind: z.literal("apt_repository"),
				package: aptPackageSchema,
				uri: downloadUrlSchema,
				suite: z.string().regex(/^[A-Za-z0-9][A-Za-z0-9._\x2f\x2d]*$/u),
				components: z.array(z.string().regex(/^[A-Za-z0-9._\x2d]+$/u)).default([]),
				key_file: absoluteLocalPathStringSchema.describe("The repository's signing key on this host, armored or binary.")
			}),
			z.strictObject({
				kind: z.literal("package_file"),
				url: downloadUrlSchema,
				sha256: sha256Schema,
				architecture: z.enum(COMPUTER_ARCHITECTURES),
				dependencies: z.array(aptPackageSchema).default([]).describe("Packages apt installs first; dpkg installs the file offline, so its dependencies must be listed.")
			}),
			z.strictObject({
				kind: z.literal("appimage"),
				...downloadFields,
				extra_packages: extraPackagesSchema
			}),
			z.strictObject({
				kind: z.literal("tarball"),
				...tarballFields,
				extra_packages: extraPackagesSchema
			})
		]);
		buildSourceSchema = z.discriminatedUnion("kind", [z.strictObject({
			kind: z.literal("request"),
			desktop_entry: z.string().regex(/^[A-Za-z0-9][A-Za-z0-9._\x2d]*$/u).max(255).describe("The desktop entry id the package installs, such as org.xfce.mousepad; the menu opens it with gtk-launch."),
			electron: z.boolean().optional().describe("True when the app is Electron. The install rewrites its desktop entry's command with the same launch policy an export uses, adding --no-sandbox right after the program unless the command already has it. The computer's container does not grant the user namespaces Chromium needs, and Electron exits without that flag."),
			window_class: z.string().min(1).max(255).optional().describe("The app window's WM_CLASS class, when known."),
			install: buildInstallSchema
		}), z.strictObject({
			kind: z.literal("bundle"),
			path: absoluteLocalPathStringSchema.describe("An agentenv bundle folder whose tasks/smoke.json deploys one computer, such as an exported one."),
			settings: z.record(excludedValues(z.string().regex(BUNDLE_SETTING_VARIABLE), BUILD_COMPUTER_SETTINGS, "Build host control names are reserved."), buildSecretHandleSchema).optional().describe("Each environment variable a withheld file's setting reads, as the export's withheld_files names it, mapped to the handle of the secret holding its value; REA supplies the value to the deploy and no result shows it. Build host control names are reserved.")
		})]);
		extraPackagesOf = (source) => {
			if (source.kind === "bundle") return [];
			const { install } = source;
			if (install.kind === "package_file") return install.dependencies;
			return install.kind === "apt_repository" ? [] : install.extra_packages;
		};
		downloadInstallOf = (request) => {
			const { install } = request;
			if (install.kind !== "appimage" && install.kind !== "tarball") return undefined;
			const { extra_packages: _extra, ...download } = install;
			return {
				...download,
				desktop_entry: request.desktop_entry.replace(/\.desktop$/u, "")
			};
		};
		downloadDeclaration = (url, sha256, to, arch) => `Download(url=${py(url)}, sha256=${py(sha256)}, to=${py(to)}${arch === undefined ? "" : `, arch=${py(arch)}`})`;
		renderReaInstallScript = (packageFile) => `#!/bin/sh
# Build-only layer, run as root with the network off: unpack Node.js and REA into /opt/rea and put both on PATH.
set -eu
mkdir -p /opt/rea/payload${packageFile === undefined ? "" : `
cp ${packageFile} ${BUILD_PACKAGE_FILE}`}
launcher=$(python3 - <<'PY'
import glob
from pathlib import Path
import tarfile

${PYTHON_BUILD_ARCHIVE}
payload = Path("/opt/rea/payload")
with tarfile.open("${REA_PAYLOAD}") as archive:
    archive.extractall(payload, filter="tar")
    entry, _, problem = inspect_rea_archive(archive)
    if problem is not None:
        raise SystemExit(problem)
launcher = payload / entry
if not launcher.is_file() or not launcher.resolve().is_relative_to(payload.resolve()):
    raise SystemExit("The selected scripts/rea.mjs did not extract as a regular file.")

for name in glob.glob("node-*.tar.xz"):
    with tarfile.open(name) as archive:
        archive.extractall("/opt/rea", filter="tar")
print(launcher)
PY
)
ln -sf /opt/rea/node-v${BUILD_NODE_VERSION}-linux-*/bin/node /usr/local/bin/node
# The archive's top folder is caller-chosen and may contain spaces. The launcher
# runs a fixed path so the shell does not split that folder before Node opens it.
ln -sfn "$launcher" /opt/rea/rea.mjs
printf '#!/bin/sh\\nexec /usr/local/bin/node /opt/rea/rea.mjs "$@"\\n' > /usr/local/bin/rea
chmod 755 /usr/local/bin/rea
rm -f node-*.tar.xz ${REA_PAYLOAD}
`;
		buildInstall = (request, name, payload, aptKey) => {
			const { install } = request;
			const download = downloadInstallOf(request);
			const architectures = install.kind === "archive" || install.kind === "apt_repository" ? [...COMPUTER_ARCHITECTURES] : [install.architecture];
			if (install.kind === "apt_repository" && aptKey === undefined) throw new TypeError("An apt repository needs its key file's bytes.");
			const key = install.kind === "apt_repository" && aptKey !== undefined ? {
				bytes: aptKey,
				source: {
					uri: install.uri,
					suite: install.suite,
					components: install.components,
					keyFile: `apt-keys/${name}.${isArmoredKey(aptKey) ? "asc" : "gpg"}`,
					keySha256: sha256Hex(aptKey)
				}
			} : undefined;
			const packageFile = install.kind === "package_file" ? {
				url: install.url,
				sha256: install.sha256,
				path: "vendor/package.deb",
				architecture: install.architecture,
				dependencies: install.dependencies,
				unreadDependencies: []
			} : null;
			const downloads = [
				...NODE_TARBALLS.filter(({ arch }) => architectures.includes(arch)).map(({ arch, platform, sha256 }) => downloadDeclaration(`https://nodejs.org/dist/v${BUILD_NODE_VERSION}/node-v${BUILD_NODE_VERSION}-${platform}.tar.xz`, sha256, `node-${arch}.tar.xz`, arch)),
				...packageFile === null ? [] : [downloadDeclaration(packageFile.url, packageFile.sha256, packageFile.path, packageFile.architecture)],
				...download === undefined ? [] : [downloadDeclaration(download.url, download.sha256, downloadedFile(download), download.architecture)],
				...payload.kind === "download" ? [downloadDeclaration(payload.url, payload.sha256, REA_PAYLOAD)] : []
			];
			return {
				architectures,
				packages: [...new Set([
					...install.kind === "archive" || install.kind === "apt_repository" ? [install.package] : [],
					...extraPackagesOf(request),
					LAUNCHER_PACKAGE,
					DCONF_PACKAGE
				])],
				key,
				packageFile,
				download,
				downloads,
				scripts: [
					REA_INSTALL_SCRIPT,
					...packageFile === null ? [] : [INSTALL_SCRIPT],
					...download === undefined ? [] : [DOWNLOAD_INSTALL_SCRIPT],
					...request.electron === true ? [ELECTRON_LAUNCH_SCRIPT] : []
				]
			};
		};
		renderElectronLaunchScript = (entry) => `#!/bin/sh
# Applications menu -> gtk-launch of this entry. Chromium's sandbox needs user
# namespaces the container does not grant, so adjust the installed command first.
set -eu
entry='${entry}'
desktop=
ifs=$IFS
IFS=:
for dir in \${XDG_DATA_DIRS:-/usr/local/share:/usr/share}; do
  if [ -n "$dir" ] && [ -f "$dir/applications/$entry.desktop" ]; then
    desktop="$dir/applications/$entry.desktop"
    break
  fi
done
IFS=$ifs
if [ -z "$desktop" ]; then
  echo "No installed desktop entry $entry.desktop was found, so its command cannot be adjusted for Electron." >&2
  exit 1
fi
launcher=$(readlink /opt/rea/rea.mjs)
policy="\${launcher%/scripts/rea.mjs}/dist/domain/desktop/appExportInstall.js"
if [ ! -f "$policy" ]; then
  echo "The REA archive must include dist/domain/desktop/appExportInstall.js so an Electron app can use REA's launch policy." >&2
  exit 1
fi
/usr/local/bin/node --input-type=module - "$policy" "$desktop" <<'JS'
import { isUtf8 } from "node:buffer";
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const policy = await import(pathToFileURL(process.argv[2]).href);
if (typeof policy.adjustInstalledDesktopText !== "function") {
  console.error("REA's desktop launch policy did not load from the archive.");
  process.exit(1);
}
const desktop = process.argv[3];
const bytes = readFileSync(desktop);
if (!isUtf8(bytes)) {
  console.error(\`The desktop entry \${desktop} is not valid UTF-8 and could not be adjusted for Electron.\`);
  process.exit(1);
}
const adjusted = policy.adjustInstalledDesktopText(bytes.toString("utf8"), true);
if (!adjusted.ok) {
  console.error(\`The desktop entry \${desktop} could not be adjusted for Electron: \${adjusted.error}.\`);
  process.exit(1);
}
writeFileSync(desktop, adjusted.value);
JS
`;
		renderBuildModule = (request, entry, plan, install) => {
			const window = request.window_class === undefined ? "" : `, window={"class": ${py(request.window_class)}}, ready=Ready(window=True)`;
			const sources = aptSources({ aptSources: install.key === undefined ? [] : [install.key.source] });
			return `"""${entry} as an agentenv computer app for building an environment with REA.

Rendered by REA's start_build_computer: the app installed from the request, opened on demand, and REA with Node.js
${BUILD_NODE_VERSION} in /opt/rea. It is for building only; keep it local and never publish it.
"""

from agentenv_protocol.computer import AptSource, ComputerAppEnvironment, Download, Launch, Packages, Ready, RunScript, computer_app, linux


@computer_app(supports=[{"os": {"type": "linux", "display": ["x11"]}, "arch": ${pyList(install.architectures)}}])
@linux(
    packages=Packages(apt=${pyList(install.packages)}),${sources}
    downloads=[${install.downloads.join(", ")}],
    run=[${install.scripts.map((script) => `RunScript(script=${py(script)})`).join(", ")}],
    launch=Launch(at="demand", command=${pyList([
				"sh",
				"-c",
				`cd "$HOME" 2>/dev/null; exec gtk-launch ${shellQuote(entry)}`
			])}${window}),
)
class ${plan.className}(ComputerAppEnvironment):
    """${entry}, opened on demand for building: it keeps no seed and serves no data operations."""
`;
		};
		renderBuildBundle = (request, payload, aptKey) => {
			const entry = request.desktop_entry.replace(/\.desktop$/u, "");
			const name = environmentName(entry, (candidate) => candidate !== "app");
			const plan = {
				name,
				className: className(name)
			};
			const install = buildInstall(request, name, payload, aptKey);
			const env = `envs/${name}`;
			const file = (path, content) => ({
				path: `${env}/${path}`,
				content
			});
			return {
				name,
				files: [
					file("env.toml", renderEnvToml(plan)),
					file(appModuleFile(name), renderBuildModule(request, entry, plan, install)),
					file(REA_INSTALL_SCRIPT, renderReaInstallScript(install.packageFile?.path ?? undefined)),
					...request.electron === true ? [file(ELECTRON_LAUNCH_SCRIPT, renderElectronLaunchScript(entry))] : [],
					...install.packageFile === null ? [] : [file(INSTALL_SCRIPT, renderInstallScript(install.packageFile))],
					...install.download === undefined ? [] : downloadInstallFiles(install.download).map(({ path, content }) => file(path, content)),
					...install.key === undefined ? [] : [file(install.key.source.keyFile, install.key.bytes)],
					...payload.kind === "file" ? [file(REA_PAYLOAD, { copyFrom: payload.path })] : [],
					{
						path: "tasks/smoke.json",
						content: renderSmokeTask(plan)
					}
				]
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/buildWitness.js
var WITNESS_STAGES, EXPECTATIONS, INPUT, stageExpectation, seedResults, unrestoredChecks, unreadResetChecks, stageVerdict, notAnEdit, admitWitnessStage;
function init_buildWitness() {
	return (init_buildWitness = __esmMin((() => {
		init_result();
		WITNESS_STAGES = [
			"seed",
			"after_edit",
			"near_miss",
			"after_reset"
		];
		EXPECTATIONS = {
			seed: "some_fail",
			after_edit: "all_pass",
			near_miss: "some_fail",
			after_reset: "some_fail"
		};
		INPUT = [
			"click",
			"drag",
			"scroll",
			"type",
			"type_secret",
			"key"
		];
		stageExpectation = (stage) => EXPECTATIONS[stage];
		seedResults = (stages) => new Map(stages.find((filed) => filed.stage === "seed")?.results.map((result) => [result.id, result]));
		unrestoredChecks = (stages, results) => {
			const seed = seedResults(stages);
			return results.filter((result) => {
				const filed = seed.get(result.id);
				if (filed === undefined) return true;
				if (filed.undecided === true) return false;
				return filed.passed !== result.passed;
			});
		};
		unreadResetChecks = (stages, results) => {
			const seed = seedResults(stages);
			return results.filter((result) => {
				const filed = seed.get(result.id);
				if (filed === undefined) return false;
				return filed.undecided === true || result.undecided === true;
			});
		};
		stageVerdict = (stage, results, stages = []) => {
			if (stage === "after_reset") {
				const unrestored = unrestoredChecks(stages, results);
				if (unrestored.some((result) => result.undecided !== true)) return "not_held";
				if (unrestored.length > 0 || unreadResetChecks(stages, results).length > 0) return "undecided";
			}
			const failed = results.filter((result) => !result.passed);
			const shown = failed.some((result) => result.undecided !== true);
			if (EXPECTATIONS[stage] === "some_fail") return shown ? "held" : failed.length > 0 ? "undecided" : "not_held";
			if (shown || results.length === 0) return "not_held";
			return failed.length > 0 ? "undecided" : "held";
		};
		notAnEdit = (stage, since, latest) => {
			if (latest.input < latest.from) return `Before checking ${stage}, act on the app with act_on_build_computer: no click, drag, scroll, type, type_secret or key was applied since ${since}, and a reset does not count.`;
			if (latest.unsettledReset > latest.reset && latest.unsettledReset > latest.input) return `A reset since ${since} lost its reply, so whether it restored the seed is unknown. Reset again, or act after a reset whose reply you have, before checking ${stage}.`;
			if (latest.reset > latest.input) return `A reset since ${since} put the seed back; act on the app after it before checking ${stage}.`;
			return undefined;
		};
		admitWitnessStage = (stages, stage, log) => {
			const expected = WITNESS_STAGES[stages.length];
			if (expected === undefined) return err("This witness has ended; start a fresh computer from the bundle to witness again.");
			if (stage !== expected) return err(`The witness checks ${WITNESS_STAGES.join(", ")} in that order; the next stage is ${expected}.`);
			const latest = {
				from: stages.at(-1)?.actions_before ?? 0,
				input: Math.max(-1, ...INPUT.map((kind) => log.lastApplied[kind] ?? -1)),
				reset: log.lastApplied.reset ?? -1,
				unsettledReset: log.lastUnsettled?.reset ?? -1
			};
			const edit = stage === "after_edit" || stage === "near_miss" ? notAnEdit(stage, stages.at(-1)?.stage ?? "the start", latest) : undefined;
			if (edit !== undefined) return err(edit);
			if (stage === "after_reset" && latest.unsettledReset > latest.reset && latest.unsettledReset >= latest.from) return err("The last reset's reply was lost, so whether it restored the seed is unknown. Reset again, then check after_reset once that reset is applied.");
			if (stage === "after_reset" && (latest.reset < latest.from || latest.reset < latest.input)) return err("Before checking after_reset, reset the app with act_on_build_computer action reset, and change nothing after it.");
			return ok(log.total);
		};
	})))();
}

//#endregion
//#region dist/contracts/desktopBuildMeasureContract.js
var strings$3, band, solve, MEASURE_BUILD_TASK_CONTRACT;
function init_desktopBuildMeasureContract() {
	return (init_desktopBuildMeasureContract = __esmMin((() => {
		init_portableBundleName();
		init_localPath();
		init_toolEffects();
		strings$3 = z.array(z.string());
		band = z.enum([
			"in_band",
			"too_easy",
			"too_hard",
			"undecided"
		]).describe("in_band: it passed 1 to 3 of 5; too_easy: 3 of 3 or 4 of 5; too_hard: 0 of 3; undecided: the measure stopped before deciding.");
		solve = z.strictObject({
			outcome: z.enum([
				"passed",
				"scored below 1",
				"unscored",
				"failed",
				"cancelled"
			]),
			turns: z.int().nonnegative().nullable(),
			usd: z.number().nonnegative().nullable(),
			seconds: z.number().nonnegative(),
			failed_checks: strings$3,
			instance_id: z.string().nullable(),
			error: z.string().nullable().describe("The error agentenv reported for the run, such as why it failed to deploy, solve or verify; null when it reported none.")
		});
		MEASURE_BUILD_TASK_CONTRACT = {
			name: "measure_build_task",
			...toolContractMetadata("measure_build_task", toolEffects({
				writesFilesystem: true,
				launchesProcess: true,
				accessesNetwork: true,
				changesUiState: true,
				executesForeignCode: true,
				idempotent: false
			})),
			kind: "application",
			description: "Measure how hard an exported bundle's task is for a model: run it in fresh agentenv computers on this host, each solve the bundle's own steps with the agent deployed as the solver on the model, 3 times, then 2 more unless they passed none or all, and keep it in the band when it passes 1 to 3 of 5. A solve that did not finish is run again, at most twice, and not counted. Before each solve REA stops if the largest cost so far would take the total past budget_usd; a solve's cost is known only when it ends, so the first always runs, and a solve that reports no cost stops the measure. The solver calls the model endpoint agentenv reads where REA starts: LITELLM_BASE_URL and LITELLM_API_KEY, or [model] in .agentenv/config.toml; REA holds no model client and never reads the key. It writes difficulty.json at the bundle's root, each measured task's record by name, and a Measured difficulty section in its README, and returns the record: the band, passes, finished solves (k), turns, cost, failures per check and each solve. Solves run one at a time and take minutes each; REA reports progress meanwhile.",
			inputSchema: z.strictObject({
				bundle: absoluteLocalPathStringSchema.describe("The exported bundle's folder on this host."),
				task: portableBundleNameSchema.describe("The task's name, as its tasks/<name>.json names it."),
				model: z.string().min(1).describe("The model the solver runs on, such as anthropic/claude-sonnet-5-5."),
				agent: z.string().min(1).default("claude-code").describe("The agent the solver runs as; claude-code reports each solve's turns and cost."),
				budget_usd: z.number().positive().max(1e3).describe("The most the measure may spend on solves, in US dollars.")
			}),
			outputSchema: z.strictObject({
				bundle: z.string(),
				task: z.string(),
				model: z.string(),
				agent: z.string(),
				measured_at: z.string(),
				band,
				stopped: z.enum([
					"decided",
					"budget",
					"unfinished",
					"cost_unknown"
				]).describe("decided: the band is known; budget: the next solve could pass budget_usd; unfinished: 3 solves did not finish; cost_unknown: a solve reported no cost."),
				k: z.int().nonnegative().describe("The solves that finished."),
				passes: z.int().nonnegative(),
				unfinished: z.int().nonnegative(),
				usd: z.number().nonnegative().nullable().describe("Total cost of the solves; null when a solve reported no cost."),
				budget_usd: z.number().positive(),
				turns: z.array(z.int().nonnegative().nullable()),
				failures_per_check: z.record(z.string(), z.int().positive()).describe("How many finished solves failed each check."),
				solves: z.array(solve),
				task_sha256: z.string().describe("The SHA-256 of the task's steps file followed by its verifier, so a changed task shows the record is stale."),
				difficulty_file: z.string()
			}),
			examples: [{
				title: "Measure a task with Sonnet within $8",
				input: {
					bundle: "/tmp/mousepad-bundle",
					task: "add-eggs",
					model: "anthropic/claude-sonnet-5-5",
					budget_usd: 8
				}
			}]
		};
	})))();
}

//#endregion
//#region dist/contracts/desktopBuildSecretsContract.js
var EXAMPLE_ID$1, strings$2, computerId$1, BUILD_SECRETS_FOLDER, WITHHELD_EXPORT_DESCRIPTION, draftWithheldField, TYPE_SECRET_EXAMPLE, withholdInputFields, withheldOutputFields, RECORD_BUILD_CONSENT_CONTRACT;
function init_desktopBuildSecretsContract() {
	return (init_desktopBuildSecretsContract = __esmMin((() => {
		init_buildCapture();
		init_appWithheld();
		init_toolEffects();
		EXAMPLE_ID$1 = "00000000-0000-4000-8000-000000000001";
		strings$2 = z.array(z.string());
		computerId$1 = z.uuid().describe("The id start_build_computer returned.");
		BUILD_SECRETS_FOLDER = "$XDG_CONFIG_HOME/rea/build-secrets/<handle>, or ~/.config/rea/build-secrets/<handle>";
		WITHHELD_EXPORT_DESCRIPTION = `Files under the owned paths that changed between the ${SIGN_IN_START} and ${SIGN_IN_END} checkpoints, and those named in withhold, are withheld from the seed as sign-in or licence state: each becomes a secret setting the deploy takes from an environment variable as the file's bytes in base64, the README says how to fill it, a check may not name it, and REA keeps its bytes as the secret withheld_files names by handle, for start_build_computer's settings when witnessing; a file larger than ${String(MAX_WITHHELD_BYTES / 1024)} KiB cannot be withheld. With seed_sign_in, they are seeded instead, which needs a seed_sign_in consent from record_build_consent; every recorded consent ships as consent.json.`;
		draftWithheldField = strings$2.describe(`Files that changed between ${SIGN_IN_START} and ${SIGN_IN_END}, which the draft leaves out and the export withholds from the seed.`);
		TYPE_SECRET_EXAMPLE = {
			title: "Type a password the person put in a secret's file",
			input: {
				computer_id: EXAMPLE_ID$1,
				action: "type_secret",
				secret: "keepassxc-master"
			}
		};
		withholdInputFields = {
			withhold: z.array(buildStatePathSchema).max(16).optional().describe("Files under the owned paths to withhold from the seed as sign-in or licence state beside those the sign-in checkpoints find, such as a trial's licence file the app writes at first launch; relative to the home."),
			seed_sign_in: z.boolean().optional().describe("Seed the withheld files after all; needs a seed_sign_in consent from record_build_consent on this computer.")
		};
		withheldOutputFields = {
			withheld_files: z.array(z.strictObject({
				file: z.string(),
				variable: z.string().describe("The environment variable a deploy reads the file's bytes from, in base64."),
				handle: z.string().describe("The secret REA keeps the file's bytes in, for start_build_computer's settings.")
			})).describe("Files withheld from the seed as sign-in or licence state."),
			consented_files: strings$2.describe("Withheld files seeded all the same, with the person's consent.")
		};
		RECORD_BUILD_CONSENT_CONTRACT = {
			name: "record_build_consent",
			...toolContractMetadata("record_build_consent", toolEffects({
				mutatesSession: true,
				idempotent: false
			})),
			kind: "application",
			description: "Record a consent the person gave, in their own words, after you asked them: kind licence when they accepted a licence the app or its installer shows, which you then accept on their behalf, or seed_sign_in when they allowed the bundle to hold their sign-in or licence state. Never record one they did not give. The consent is kept with the computer; the export writes every one into the bundle's consent.json, and seeds withheld state only with a seed_sign_in consent.",
			inputSchema: z.strictObject({
				computer_id: computerId$1,
				kind: z.enum(["licence", "seed_sign_in"]),
				subject: z.string().min(1).max(500).describe("What the person consented to: the licence's name, or the signed-in state the bundle holds."),
				url: z.url({ protocol: /^https?$/u }).optional().describe("Where the licence can be read."),
				words: z.string().min(1).max(2e3).describe("The person's reply, word for word.")
			}),
			outputSchema: z.strictObject({
				computer_id: z.uuid(),
				consent: z.strictObject({
					kind: z.enum(["licence", "seed_sign_in"]),
					subject: z.string(),
					url: z.string().optional(),
					words: z.string(),
					recorded_at: z.string(),
					source: z.literal("relayed").describe("The agent relayed the person's words.")
				}),
				consents: z.int().nonnegative().describe("How many consents this computer holds.")
			}),
			examples: [{
				title: "Record that the person accepted a licence",
				input: {
					computer_id: EXAMPLE_ID$1,
					kind: "licence",
					subject: "VariCAD 30-day trial licence",
					url: "https://www.varicad.com/",
					words: "I accept the VariCAD trial licence."
				}
			}]
		};
	})))();
}

//#endregion
//#region dist/contracts/desktopBuildTaskSchemas.js
var strings$1, EXAMPLE_TASK, EXAMPLE_LATER_TASK, MAX_BUILD_TASKS, draftSchema, exportedTaskSchema;
function init_desktopBuildTaskSchemas() {
	return (init_desktopBuildTaskSchemas = __esmMin((() => {
		init_appTaskDraftNotes();
		init_appTaskDraftValues();
		init_jsonValue();
		init_desktopBuildSecretsContract();
		strings$1 = z.array(z.string());
		EXAMPLE_TASK = {
			name: "add-eggs",
			prompt: "In Mousepad, add eggs to the shopping list in Documents/todo.txt and save it.",
			checks: [{
				kind: "lines_present",
				file: "Documents/todo.txt",
				lines: ["eggs"]
			}]
		};
		EXAMPLE_LATER_TASK = {
			task: {
				name: "add-bread",
				prompt: "In Mousepad, add bread to the shopping list in Documents/todo.txt and save it.",
				checks: [{
					kind: "lines_present",
					file: "Documents/todo.txt",
					lines: ["bread"]
				}]
			},
			end_checkpoint: "end-add-bread"
		};
		MAX_BUILD_TASKS = 8;
		draftSchema = z.strictObject({
			seed_checkpoint: z.string(),
			end_checkpoint: z.string(),
			files: z.array(z.strictObject({
				file: z.string(),
				role: z.string(),
				change: jsonValueSchema,
				values: z.array(draftValueSchema).describe("The values the change added, changed and removed, ready to copy into a check: what a check can name first, then what only position reaches, then noise; at most 20 entries and 8 KB a file and 24 KB a draft. Only XML files, archives, JSON and key files have values: a text file's or SQLite database's change already lists its lines and rows."),
				values_cut: z.boolean().describe("Whether a limit left values out.")
			})),
			task: z.strictObject({
				name: z.string(),
				prompt: z.string(),
				checks: z.array(jsonObjectSchema)
			}),
			guards: z.array(jsonObjectSchema).describe("Optional checks that the rest keeps its seed value, which the end holds too: a field on like siblings, one that varies among them before a default they all share; the text an addition kept; a text file's lines beside its new one. Add those worth keeping to the task's checks."),
			notes: z.array(draftNoteSchema).describe("Why the draft has no files, or why a file's suggested checks are thin; empty when neither."),
			withheld_files: draftWithheldField
		});
		exportedTaskSchema = z.strictObject({
			name: z.string(),
			checks: z.int().positive(),
			end_checkpoint: z.string(),
			failing_on_seed: strings$1,
			near_checkpoint: z.string().nullable().describe("The task's near miss, near-<name>, when the capture took one; null when it did not."),
			failing_on_near: strings$1
		});
	})))();
}

//#endregion
//#region dist/domain/desktop/computerActions.js
var COMPUTER_ACTIONS, POINTER, ACTION_FIELDS, coordinate, SCREENSHOT_FIELDS, screenshotOptionsSchema, computerActionInputSchema, KEY_NAMES, ONE_CHARACTER, w3cKey, w3cKeys, driverCall;
function init_computerActions() {
	return (init_computerActions = __esmMin((() => {
		init_fixedTupleSchema();
		init_result();
		init_buildSecrets();
		COMPUTER_ACTIONS = [
			"screenshot",
			"click",
			"drag",
			"scroll",
			"type",
			"type_secret",
			"key",
			"wait",
			"reset"
		];
		POINTER = [
			"frame_id",
			"space",
			"norm_scale"
		];
		ACTION_FIELDS = {
			screenshot: [
				"region",
				"format",
				"quality",
				...POINTER
			],
			click: [
				"x",
				"y",
				"button",
				"count",
				"modifiers",
				"screenshot",
				...POINTER
			],
			drag: [
				"path",
				"button",
				"duration_ms",
				"modifiers",
				"screenshot",
				...POINTER
			],
			scroll: [
				"direction",
				"x",
				"y",
				"amount",
				"modifiers",
				"screenshot",
				...POINTER
			],
			type: ["text", "screenshot"],
			type_secret: ["secret"],
			key: [
				"keys",
				"repeat",
				"screenshot"
			],
			wait: ["ms", "screenshot"],
			reset: ["screenshot"]
		};
		coordinate = z.number().describe("Frame pixels, or 0..norm_scale with space norm.");
		SCREENSHOT_FIELDS = {
			region: fixedTupleSchema([
				z.number(),
				z.number(),
				z.number(),
				z.number()
			]).optional().describe("screenshot: [x0, y0, x1, y1] to crop to. It does not capture the screen again; it crops the latest frame, so take a full screenshot, or a wait with screenshot true, first."),
			format: z.enum(["png", "jpeg"]).optional(),
			quality: z.int().min(1).max(100).optional().describe("jpeg quality.")
		};
		screenshotOptionsSchema = z.strictObject(SCREENSHOT_FIELDS);
		computerActionInputSchema = z.strictObject({
			computer_id: z.uuid().describe("The id start_build_computer returned."),
			action: z.enum(COMPUTER_ACTIONS).describe("The driver's computer_<action> tool to call, or reset to restore the app's data to its seed."),
			x: coordinate.optional(),
			y: coordinate.optional(),
			frame_id: z.string().min(1).optional().describe("The frame the point is on; the latest by default."),
			space: z.enum(["frame", "norm"]).optional().describe("frame: the frame's pixels, the default; norm: a 0..norm_scale grid over it."),
			norm_scale: z.number().positive().optional(),
			button: z.string().min(1).optional().describe("left, the default, right or middle."),
			count: z.int().positive().optional().describe("click: 2 double-clicks."),
			modifiers: z.array(z.string().min(1)).optional().describe("Keys held during a click, drag or scroll."),
			path: z.array(fixedTupleSchema([z.number(), z.number()])).min(2).optional().describe("drag: 2 to 50 [x, y] points from press to release; the driver refuses more."),
			duration_ms: z.int().nonnegative().optional(),
			direction: z.enum([
				"up",
				"down",
				"left",
				"right"
			]).optional(),
			amount: z.int().positive().optional().describe("scroll: notches."),
			text: z.string().optional().describe("type: \\n presses Enter, \\t Tab."),
			secret: buildSecretHandleSchema.optional().describe("type_secret: the handle of a secret, the name of a file the person wrote in REA's build-secrets folder on this host; REA types its value, which no result shows."),
			keys: z.array(z.string().min(1)).min(1).optional().describe("key: one chord pressed in order, as [\"Control\", \"s\"] or [\"ctrl+s\"]."),
			repeat: z.int().positive().optional(),
			ms: z.int().nonnegative().optional().describe("wait: milliseconds."),
			...SCREENSHOT_FIELDS,
			screenshot: z.boolean().optional().describe("Return a screenshot taken after the action.")
		});
		KEY_NAMES = new Map([
			["ctrl", "Control"],
			["control", "Control"],
			["alt", "Alt"],
			["option", "Alt"],
			["shift", "Shift"],
			["cmd", "Meta"],
			["command", "Meta"],
			["meta", "Meta"],
			["super", "Meta"],
			["win", "Meta"],
			["enter", "Enter"],
			["return", "Enter"],
			["esc", "Escape"],
			["escape", "Escape"],
			["tab", "Tab"],
			["space", " "],
			["backspace", "Backspace"],
			["delete", "Delete"],
			["del", "Delete"],
			["insert", "Insert"],
			["home", "Home"],
			["end", "End"],
			["pageup", "PageUp"],
			["page_up", "PageUp"],
			["pgup", "PageUp"],
			["pagedown", "PageDown"],
			["page_down", "PageDown"],
			["pgdn", "PageDown"],
			["up", "ArrowUp"],
			["down", "ArrowDown"],
			["left", "ArrowLeft"],
			["right", "ArrowRight"]
		]);
		ONE_CHARACTER = /^.$/su;
		w3cKey = (spelling) => {
			if (ONE_CHARACTER.test(spelling)) return spelling;
			const lower = spelling.toLowerCase();
			return KEY_NAMES.get(lower) ?? (/^f(?:[1-9]|1\d|2[0-4])$/u.test(lower) ? lower.toUpperCase() : spelling);
		};
		w3cKeys = (keys) => keys.flatMap((key) => ONE_CHARACTER.test(key) ? [key] : key.split(/\+(?!$)/u).map(w3cKey));
		driverCall = (action, fields) => {
			const accepted = ACTION_FIELDS[action];
			const given = Object.entries(fields).flatMap(([name, value]) => value === undefined ? [] : [[name, value]]);
			const refused = given.find(([name]) => !accepted.includes(name))?.[0];
			if (refused !== undefined) return err({
				field: refused,
				accepted
			});
			if (action === "type_secret" && fields.secret === undefined) return err({
				field: "secret",
				accepted,
				missing: true
			});
			const translated = Object.fromEntries(given.map(([name, value]) => [name, (name === "keys" || name === "modifiers") && Array.isArray(value) ? w3cKeys(value.filter((key) => typeof key === "string")) : value]));
			return ok({
				tool: action === "reset" ? "data/reset" : action === "type_secret" ? "computer_type" : `computer_${action}`,
				arguments: translated
			});
		};
	})))();
}

//#endregion
//#region dist/contracts/desktopBuildToolContracts.js
var computerId, driverResult, EXAMPLE_ID, checkResult, settledField, readCutField, strings, stageRecord, loggedAction, witnessRecord, DESKTOP_BUILD_TOOL_CONTRACTS;
function init_desktopBuildToolContracts() {
	return (init_desktopBuildToolContracts = __esmMin((() => {
		init_appBuild();
		init_appSettle();
		init_appTask();
		init_buildCapture();
		init_buildWitness();
		init_desktopBuildMeasureContract();
		init_desktopBuildTaskSchemas();
		init_computerActions();
		init_desktopCapture();
		init_jsonValue();
		init_localPath();
		init_desktopBuildSecretsContract();
		init_toolEffects();
		computerId = z.uuid().describe("The id start_build_computer returned.");
		driverResult = jsonObjectSchema.nullable().describe("The driver's structured result, such as frame_id, width and height; null when it returned none.");
		EXAMPLE_ID = "00000000-0000-4000-8000-000000000001";
		checkResult = z.strictObject({
			id: z.string(),
			passed: z.boolean(),
			description: z.string(),
			undecided: z.literal(true).optional().describe("Present on a failure for want of a readable or whole view, such as a file the app could not read just then or a view cut short; it shows nothing about the task, so a witness stage counts no such failure.")
		});
		settledField = z.boolean().describe(`Whether the app's files had held for ${String(SETTLE_TIMING.windowMs / 1e3)} s, counted from the read that returned them, when they were graded; false when they were still changing ${String(SETTLE_TIMING.boundMs / 1e3)} s after the first read began, and the last completed read was graded.`);
		readCutField = z.boolean().describe(`Whether a read still in flight ${String(SETTLE_TIMING.boundMs / 1e3)} s after the first read began was cut there, so the last completed read was graded.`);
		strings = z.array(z.string());
		stageRecord = z.strictObject({
			stage: z.enum(WITNESS_STAGES),
			actions_before: z.int().nonnegative().describe("How many logged actions came before this stage's check."),
			checked_at: z.string(),
			expectation: z.enum(["some_fail", "all_pass"]),
			held: z.boolean(),
			settled: settledField,
			read_cut: readCutField,
			results: z.array(checkResult),
			remediation: z.string().optional().describe("Why the stage did not hold when its results alone do not say, such as a reset that did not restore the seed, and what to do.")
		});
		loggedAction = z.strictObject({
			index: z.int().nonnegative(),
			action: z.enum(COMPUTER_ACTIONS),
			tool: z.string(),
			arguments: jsonObjectSchema,
			truncated_arguments: z.array(z.string()).optional().describe("Arguments this entry cuts, each string to 1 KiB and each list to 64 items; the computer received them whole."),
			started_at: z.string(),
			ended_at: z.string().nullable(),
			outcome: z.enum([
				"pending",
				"applied",
				"refused",
				"failed"
			])
		});
		witnessRecord = z.strictObject({
			path: z.string().describe("witness.json, the record as REA Evidence."),
			evidence_id: z.string(),
			verdict: z.enum(["held", "failed"]),
			failed_stage: z.enum(WITNESS_STAGES).nullable(),
			task: z.strictObject({
				name: z.string(),
				sha256: z.string()
			}),
			stages: z.array(stageRecord),
			actions: z.array(loggedAction).describe("The latest actions logged on the computer, up to 256 within 256 KiB, oldest first."),
			actions_dropped: z.int().nonnegative().describe("How many of the earliest logged actions the log no longer keeps; the stages' rules counted them."),
			recording: z.union([z.strictObject({
				recording_id: z.string(),
				segments: z.array(z.strictObject({
					path: z.string().describe("Relative to the witness folder."),
					bytes: z.int().nonnegative(),
					sha256: z.string()
				}))
			}), z.strictObject({ error: z.string() })])
		});
		DESKTOP_BUILD_TOOL_CONTRACTS = [
			{
				name: "start_build_computer",
				...toolContractMetadata("start_build_computer", toolEffects({
					mutatesSession: true,
					writesFilesystem: true,
					launchesProcess: true,
					accessesNetwork: true,
					executesForeignCode: true,
					idempotent: false
				})),
				kind: "application",
				description: "Start a local agentenv computer, installing/downloading app packages as needed; returns computer_id and a first screenshot. Requires Docker and REA_AGENT_ENV_COMMAND. Request sources install from Ubuntu, apt repositories or a .deb URL and add REA from REA_BUILD_COMPUTER_REA_ARCHIVE in a build-only layer. The app starts later: use start_build_capture, or its Applications > Other menu entry when no capture is active. Set source.electron to apply the export launch policy, adding --no-sandbox unless present because the container lacks Chromium user namespaces. Bundle-folder sources run their existing smoke task unchanged. Initial image builds and concurrent agentenv state updates can take minutes. screenshot selects initial region/format/quality. The computer stays reachable until close_build_computer or server shutdown; if failed-start teardown is unconfirmed, use the error's computer_id to retry close_build_computer.",
				inputSchema: z.strictObject({
					source: buildSourceSchema,
					screenshot: screenshotOptionsSchema.optional()
				}),
				outputSchema: z.strictObject({
					computer_id: z.uuid(),
					sandbox_id: z.string().describe("agentenv's sandbox id."),
					environment: z.string().describe("The rendered environment's name, or the bundle folder."),
					extra_packages: z.array(z.string()).describe("The packages the request named beside the app, which the export installs beside it too: an archive install's extra_packages or a package file's dependencies; empty otherwise."),
					screenshot: driverResult
				}),
				examples: [{
					title: "Build Mousepad from the Ubuntu archive",
					input: { source: {
						kind: "request",
						desktop_entry: "org.xfce.mousepad",
						install: {
							kind: "archive",
							package: "mousepad"
						}
					} }
				}, {
					title: "Start an exported bundle",
					input: { source: {
						kind: "bundle",
						path: "/tmp/mousepad-bundle"
					} }
				}]
			},
			{
				name: "act_on_build_computer",
				...toolContractMetadata("act_on_build_computer", toolEffects({
					mutatesSession: true,
					accessesNetwork: true,
					changesUiState: true,
					executesForeignCode: true,
					idempotent: false
				})),
				kind: "application",
				description: `Act on a running build computer with ${COMPUTER_ACTIONS.join(", ")}; actions can change app state. Returns driver content/images and structured results, with each action logged. Points use the latest frame's pixels (take a screenshot first), or space norm on 0..norm_scale; count 2 double-clicks, drag path has 2..50 points, and keys names one W3C chord (ctrl+s is translated). Region screenshots crop the latest frame rather than recapture; use a full screenshot or wait with screenshot true first. After opening a menu/window, wait for its screenshot instead of taking the action's immediate one. type_secret reads the user-created handle file at ${BUILD_SECRETS_FOLDER} into a focused masked field: only the handle is recorded and no screenshot is taken, but later screenshots can expose unmasked fields. reset restores seed data through data/reset and relaunches; screenshot_error after reset does not undo it. Other actions forward the driver's arguments unchanged; refusals such as stale frames retain its message. Actions, capture steps and checks run sequentially per computer; different computers run independently.`,
				inputSchema: computerActionInputSchema,
				outputSchema: z.strictObject({
					computer_id: z.uuid(),
					action: z.enum(COMPUTER_ACTIONS),
					action_index: z.int().nonnegative().describe("The action's place in the computer's action log."),
					result: driverResult
				}),
				examples: [
					{
						title: "Look at the screen",
						input: {
							computer_id: EXAMPLE_ID,
							action: "screenshot"
						}
					},
					{
						title: "Double-click a point of the latest frame",
						input: {
							computer_id: EXAMPLE_ID,
							action: "click",
							x: 640,
							y: 400,
							count: 2
						}
					},
					{
						title: "Save",
						input: {
							computer_id: EXAMPLE_ID,
							action: "key",
							keys: ["Control", "s"]
						}
					},
					TYPE_SECRET_EXAMPLE
				]
			},
			{
				name: "start_build_capture",
				...toolContractMetadata("start_build_capture", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true,
					changesUiState: true,
					executesForeignCode: true,
					idempotent: false
				})),
				kind: "application",
				description: `Launch the app under capture on a request-built computer and return its open-window screenshot. Downloads package lists as the computer user to identify sources; do not open the app from its menu first. Early exit reports code, stderr tail and capture details. Documents are recognized from file names/~/ paths in window titles; supply state_paths when titles name something else. Save the seed through the app, mark_build_checkpoint ${SEED_CHECKPOINT}, make and save the requested change, mark ${"end"}, then stop_build_capture.`,
				inputSchema: z.strictObject({
					computer_id: computerId,
					arguments: z.array(z.string().max(4096)).max(32).optional().describe("Arguments appended to the app's launch command, such as a file to open."),
					state_paths: z.array(buildStatePathSchema).max(16).optional().describe("Files or folders in the computer's home that hold the app's state, relative to the home (Documents/Scores/song.mscz), after ~/ or absolute under it; they need not exist yet. The capture retains them from its start and counts their files as the app's: a document, which the bundle owns, seeds and opens at launch when it is the seed's only one, or the app's own state under a hidden folder such as .config/MuseScore. An absolute path outside the home is refused.")
				}),
				outputSchema: z.strictObject({
					computer_id: z.uuid(),
					desktop_entry: z.string(),
					package_lists: z.int().nonnegative().describe("apt package lists found for the capture to read sources from."),
					package_lists_error: z.string().nullable().describe("Why downloading the package lists failed, if it did."),
					screenshot: driverResult
				}),
				examples: [{
					title: "Capture the requested app",
					input: { computer_id: EXAMPLE_ID }
				}, {
					title: "Capture an app whose title shows a score's title, not its file",
					input: {
						computer_id: EXAMPLE_ID,
						state_paths: ["Documents/MuseScore3/Scores/Morning_Song.mscz"]
					}
				}]
			},
			{
				name: "mark_build_checkpoint",
				...toolContractMetadata("mark_build_checkpoint", toolEffects({
					mutatesSession: true,
					accessesNetwork: true,
					idempotent: false
				})),
				kind: "application",
				description: `Checkpoint the running capture under a unique name; returns acknowledged counts and up to ${String(10)} changed files. Files named by window titles rank first, then state_paths/open files, with caches last. Mark ${SEED_CHECKPOINT} after saving the seed and ${"end"} after saving the first change. For later tasks, build on the preceding change and mark ${"end"}-<task name>; mark near-<task name> after saving a near miss that must fail one task check. Duplicate names are refused.`,
				inputSchema: z.strictObject({
					computer_id: computerId,
					name: buildCheckpointNameSchema
				}),
				outputSchema: z.strictObject({
					computer_id: z.uuid(),
					checkpoint: z.strictObject({
						name: z.string(),
						trigger: desktopCheckpointSchema.shape.trigger,
						at_ms: z.int().nonnegative(),
						entries: z.int().nonnegative(),
						changes: z.int().nonnegative(),
						retained_files: z.int().nonnegative(),
						retained_bytes: z.int().nonnegative(),
						changed_files: z.array(z.string()).max(10).nullable().describe("Files, not folders, changed since the checkpoint before, relative to the home: those an app window's title has named, those named themselves in state_paths, those the app held open, under a selected folder or in its state directories, the rest, then caches and browser-engine storage, each by path. null when the REA in the computer is older and does not report them, so which files changed is unknown; the checkpoint was still taken."),
						more_changed_files: z.int().nonnegative().nullable().describe("How many more files changed than changed_files names; null when changed_files is.")
					})
				}),
				examples: [{
					title: "Mark the saved seed",
					input: {
						computer_id: EXAMPLE_ID,
						name: SEED_CHECKPOINT
					}
				}]
			},
			{
				name: "stop_build_capture",
				...toolContractMetadata("stop_build_capture", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true,
					changesUiState: true,
					idempotent: false
				})),
				kind: "application",
				description: `Close the captured app and finish its capture. Returns checkpoints, package/sources, limitations and a draft between ${SEED_CHECKPOINT} and ${"end"} when both exist and no declared secret was used. later_drafts contains one draft per later ${"end"}-<task name>, relative to the preceding end checkpoint. Drafts list owned-path changes, supported before/after structured values, suggested checks and optional unchanged-state guards. Notes explain missing/thin drafts and recovery: add unrecognized documents to state_paths, or make a change saved in a readable file rather than only dconf. After secret use, automatic drafting is withheld; write the tasks manually. Otherwise write each task from its draft in the user's words and pass the tasks to export_build_environment.`,
				inputSchema: z.strictObject({ computer_id: computerId }),
				outputSchema: z.strictObject({
					computer_id: z.uuid(),
					end_reason: z.string(),
					checkpoints: z.array(z.strictObject({
						name: z.string(),
						trigger: z.string(),
						changes: z.int().nonnegative(),
						retained_files: z.int().nonnegative()
					})),
					package: z.strictObject({
						kind: z.string(),
						name: z.string().nullable(),
						version: z.string().nullable(),
						sources: strings
					}),
					limitations: strings,
					draft: draftSchema.nullable(),
					draft_refusal: z.string().optional(),
					later_drafts: z.array(z.strictObject({
						end_checkpoint: z.string(),
						draft: draftSchema.nullable(),
						draft_refusal: z.string().optional()
					})).describe(`One draft per later task's ${"end"}-<task name> checkpoint taken after ${"end"}, from the end checkpoint before it, so it shows only that task's change; empty for one task.`)
				}),
				examples: [{
					title: "Stop and draft the task",
					input: { computer_id: EXAMPLE_ID }
				}]
			},
			{
				name: "export_build_environment",
				...toolContractMetadata("export_build_environment", toolEffects({
					mutatesSession: true,
					writesFilesystem: true,
					launchesProcess: true,
					accessesNetwork: true,
					executesForeignCode: true,
					idempotent: false
				})),
				kind: "application",
				description: `Export the stopped capture and given tasks as an agentenv app bundle, seeded at ${SEED_CHECKPOINT}. Each task uses its selected end checkpoint (${"end"} by default) and its captured near-<task name> when present. The bundle's eval lists every task; verified files are copied to a new/empty host directory. Refuses publication if names or contents contain declared secrets, including UTF-16/hex/base64/URL/gzip forms; errors identify handles and files. ${WITHHELD_EXPORT_DESCRIPTION} A check already passing on the seed or a near miss passing every check refuses the whole export, naming the task and reason. Witness each task on a fresh computer with start_build_computer and check_build_task.`,
				inputSchema: z.strictObject({
					computer_id: computerId,
					tasks: z.array(z.strictObject({
						task: desktopTaskSchema,
						end_checkpoint: buildCheckpointNameSchema.optional().describe(`The checkpoint marked once this task's change was saved: ${"end"} by default, ${"end"}-<task name> for a later task.`)
					})).min(1).max(8).describe("The tasks, each with its own name; the first is usually the one checked at end."),
					directory: absoluteLocalPathStringSchema.describe("A new or empty folder on this host for the bundle."),
					name: z.string().min(1).optional().describe("The environment's name; derived from the app by default."),
					...withholdInputFields
				}),
				outputSchema: z.strictObject({
					computer_id: z.uuid(),
					directory: z.string(),
					environment: z.string(),
					files: z.int().nonnegative(),
					bytes: z.int().nonnegative(),
					tasks: z.array(exportedTaskSchema).describe("Each task the export kept: its checks, its end checkpoint, those failing on the seed and those failing at its near miss."),
					seed_files: strings,
					scrubbed_files: strings,
					recompressed_files: strings,
					unscrubbed_files: strings,
					limitations: strings,
					...withheldOutputFields
				}),
				examples: [{
					title: "Export the bundle with the task",
					input: {
						computer_id: EXAMPLE_ID,
						tasks: [{ task: EXAMPLE_TASK }],
						directory: "/tmp/mousepad-bundle"
					}
				}, {
					title: "Export two tasks, the second checked at its own end",
					input: {
						computer_id: EXAMPLE_ID,
						tasks: [{ task: EXAMPLE_TASK }, EXAMPLE_LATER_TASK],
						directory: "/tmp/mousepad-bundle"
					}
				}]
			},
			{
				name: "check_build_task",
				...toolContractMetadata("check_build_task", toolEffects({
					mutatesSession: true,
					writesFilesystem: true,
					launchesProcess: true,
					accessesNetwork: true,
					executesForeignCode: true,
					idempotent: false
				})),
				kind: "application",
				description: `Evaluate saved-state task checks or run a screen_judge through its configured model endpoint on a running exported app. Returns per-check results, settling status and optional witness state. Reads data/get after files settle using exported verifier semantics; screen_judge captures the screen and uses the agentenv runner with three votes per question. Reads every ${String(SETTLE_TIMING.intervalMs / 1e3)} s, waits for ${String(SETTLE_TIMING.windowMs / 1e3)} s of stable bytes, and bounds observation at ${String(SETTLE_TIMING.boundMs / 1e3)} s; unsettled results use the last completed read, with read_cut for interrupted reads. Witness stages run in order: seed (supply directory to begin recording) must fail a check, after_edit must pass all, near_miss must fail one, and after_reset must restore every seed result. Use the task prompt alone for the edit. Seed rejects exported task/verifier mismatches. Unreadable or truncated views are undecided, not witnessed failures; an undecidable stage is refused for retry. A failed stage or after_reset ends recording and writes witness.json plus recording segments to directory.`,
				inputSchema: z.strictObject({
					computer_id: computerId,
					task: desktopTaskSchema,
					stage: z.enum(WITNESS_STAGES).optional().describe("The witness stage this check files; none for a plain check."),
					directory: absoluteLocalPathStringSchema.optional().describe("seed only: a new or empty folder on this host for the record and recording.")
				}),
				outputSchema: z.strictObject({
					computer_id: z.uuid(),
					task: z.string(),
					passed: z.int().nonnegative(),
					failed: z.int().nonnegative(),
					results: z.array(checkResult),
					settled: settledField,
					read_cut: readCutField,
					witness: z.strictObject({
						stage: z.enum(WITNESS_STAGES),
						expectation: z.enum(["some_fail", "all_pass"]),
						held: z.boolean(),
						status: z.enum([
							"open",
							"held",
							"failed"
						]),
						next_stage: z.enum(WITNESS_STAGES).nullable(),
						record: witnessRecord.nullable()
					}).nullable()
				}),
				examples: [{
					title: "Check the seed and begin the witness",
					input: {
						computer_id: EXAMPLE_ID,
						task: EXAMPLE_TASK,
						stage: "seed",
						directory: "/tmp/mousepad-witness"
					}
				}]
			},
			RECORD_BUILD_CONSENT_CONTRACT,
			{
				name: "close_build_computer",
				...toolContractMetadata("close_build_computer", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true,
					mayDiscardData: true,
					idempotent: false
				})),
				kind: "application",
				description: "Tear down a build computer and discard its state, cancelling its active call and refusing queued calls. Tries agentenv first, then REA_DOCKER_COMMAND on only that sandbox's named/labelled containers. Unconfirmed teardown reports remaining resources and retains the computer for another close attempt.",
				inputSchema: z.strictObject({ computer_id: computerId }),
				outputSchema: z.strictObject({
					computer_id: z.uuid(),
					teardown: z.enum(["agentenv", "container_label"]).describe("What confirmed the computer is gone.")
				}),
				examples: [{
					title: "Close a build computer",
					input: { computer_id: EXAMPLE_ID }
				}]
			},
			MEASURE_BUILD_TASK_CONTRACT
		];
	})))();
}

//#endregion
//#region dist/contracts/browserProviderToolContracts.js
var BROWSER_PROVIDER_TOOL_CONTRACTS;
function init_browserProviderToolContracts() {
	return (init_browserProviderToolContracts = __esmMin((() => {
		init_browserScenarioToolContracts();
		init_browserToolContracts();
		BROWSER_PROVIDER_TOOL_CONTRACTS = [...BROWSER_TOOL_CONTRACTS, ...BROWSER_SCENARIO_TOOL_CONTRACTS];
	})))();
}

//#endregion
//#region dist/contracts/gdbToolContracts.js
var sessionId$1, GDB_TOOL_CONTRACTS;
function init_gdbToolContracts() {
	return (init_gdbToolContracts = __esmMin((() => {
		init_debuggerSessionErrors();
		init_localPath();
		init_commandObservation();
		init_analysisViewResult();
		init_analysisDetail();
		init_toolEffects();
		sessionId$1 = z.string().uuid();
		GDB_TOOL_CONTRACTS = [
			{
				name: "start_gdb_session",
				availability: { host: "persistentDebugger" },
				...toolContractMetadata("start_gdb_session", toolEffects({
					launchesProcess: true,
					mutatesSession: true,
					idempotent: false
				})),
				kind: "native-provider",
				description: "Start a persistent caller-supplied GDB session and return its session ID. Linux only; detaching a live inferior during close requires a verified durable output TTY. Startup suppresses init files and auto-loading, preferring MI3. Optional executable hashes and loads an initial file without running it; command Evidence names this initial selection, and later console loads do not rebind it. Omission leaves the session target unknown. Optional inferior_tty selects a verified terminal for later inferior runs; keep it available after GDB exits so close can detach a live inferior safely. The session belongs to this REA server process.",
				inputSchema: z.strictObject({
					executable: absoluteLocalPathStringSchema.optional().describe("Initial file to hash and load, without running it. Later command Evidence retains this initial target identity; it does not establish the current inferior."),
					inferior_tty: absoluteLocalPathStringSchema.optional().describe("Caller-selected terminal path for future inferior runs. GDB must report the exact configured path before the session is ready.")
				}),
				outputSchema: z.strictObject({
					session_id: sessionId$1,
					mi_version: z.enum(["mi3", "mi2"])
				}),
				examples: [{
					title: "Start GDB",
					input: {}
				}]
			},
			{
				name: "gdb_console",
				...toolContractMetadata("gdb_console", toolEffects({
					mutatesTarget: true,
					mutatesSession: true,
					writesFilesystem: true,
					launchesProcess: true,
					accessesNetwork: true,
					executesForeignCode: true,
					idempotent: false
				})),
				kind: "native-provider",
				description: "Run one unrestricted command in a persistent GDB session; commands can run shell, change target state, access files and network. Returns ordered MI/console/target/log Evidence. A timeout retains collected records with completion_status unknown and stops the owned debugger; closing does not imply target termination. Default complete preserves full Evidence; summary retains it and omits duplicate stream/raw mirrors for inspect_analysis_view summary queries. In a shared server this command retires active binary analysis: close Ghidra explicitly first, then reopen the binary after command effects settle.",
				inputSchema: z.strictObject({
					session_id: sessionId$1,
					command: z.string().min(1),
					detail: commandEvidenceDetailSchema
				}),
				outputSchema: analysisDetailOutputSchemaOf(gdbCommandResultSchema, gdbCommandSummaryViewResultSchema),
				examples: [{
					title: "Inspect loaded symbols",
					input: {
						session_id: "00000000-0000-4000-8000-000000000001",
						command: "info functions"
					}
				}]
			},
			{
				name: "gdb_session_status",
				...toolContractMetadata("gdb_session_status", toolEffects()),
				kind: "native-provider",
				description: "Return the observed lifecycle state and bounded recent MI records and process diagnostics for one persistent REA GDB session; closed_reason says why a closed session stopped, and truncation and invalid-UTF-8 fields report discarded or lossy data.",
				inputSchema: z.strictObject({ session_id: sessionId$1 }),
				outputSchema: z.strictObject({
					session_id: sessionId$1,
					mi_version: z.enum(["mi3", "mi2"]),
					state: z.enum(["ready", "closed"]),
					recent_mi_records: z.array(z.string()),
					recent_mi_records_truncated: z.boolean(),
					mi_invalid_utf8: z.boolean(),
					stderr: z.string(),
					stderr_observed_bytes: z.int().nonnegative(),
					stderr_truncated: z.boolean(),
					stderr_invalid_utf8: z.boolean(),
					diagnostics_truncated: z.boolean(),
					inferior_tty: z.string().nullable(),
					inferior_tty_verified: z.boolean(),
					closed_reason: z.string().exactOptional().describe("Present when state is closed: why the session stopped accepting commands. Close it and start a new session to continue."),
					closed_reason_code: z.enum(DEBUGGER_SESSION_STOP_CODES).exactOptional().describe("Present with closed_reason: input-stream-failure, output-correlation-failure, command-deadline, command-cancelled, server-shutdown, close-requested, process-exited, or stopped.")
				}),
				examples: [{
					title: "Check GDB session",
					input: { session_id: "00000000-0000-4000-8000-000000000001" }
				}]
			},
			{
				name: "close_gdb_session",
				...toolContractMetadata("close_gdb_session", toolEffects({
					launchesProcess: true,
					mutatesSession: true,
					accessesNetwork: true,
					mutatesTarget: true,
					executesForeignCode: true,
					idempotent: false
				})),
				kind: "native-provider",
				description: "Close the owned GDB process after verifying the inferior state. When one live thread group has a verified durable output TTY, REA automatically detaches it, which may resume target execution; otherwise close reports that a disposition is required. REA never kills attached or remote targets as part of debugger cleanup. In a shared MCP server, this admitted close retires any active binary-analysis session; after target effects have settled, call open_binary before further analysis. Close an active Ghidra session explicitly first.",
				inputSchema: z.strictObject({ session_id: sessionId$1 }),
				outputSchema: z.strictObject({ target_state: z.enum(["none_observed", "unknown"]) }),
				examples: [{
					title: "Close GDB session",
					input: { session_id: "00000000-0000-4000-8000-000000000001" }
				}]
			}
		];
	})))();
}

//#endregion
//#region dist/contracts/rizinDebugToolContracts.js
var sessionId, commandResult, RIZIN_DEBUG_TOOL_CONTRACTS;
function init_rizinDebugToolContracts() {
	return (init_rizinDebugToolContracts = __esmMin((() => {
		init_debuggerSessionErrors();
		init_localPath();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		sessionId = z.string().uuid();
		commandResult = z.strictObject({
			command: z.string(),
			output: z.string(),
			output_scope: z.literal("command_and_interleaved_session_output"),
			output_truncated: z.boolean(),
			output_invalid_utf8: z.literal(true).optional(),
			completion_status: z.enum(["complete", "unknown"]),
			backend: z.string().nullable()
		});
		RIZIN_DEBUG_TOOL_CONTRACTS = [
			{
				name: "start_rizin_debug_session",
				availability: { host: "persistentDebugger" },
				...toolContractMetadata("start_rizin_debug_session", toolEffects({
					mutatesTarget: true,
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true,
					executesForeignCode: true,
					idempotent: false
				})),
				kind: "native-provider",
				description: "Start a persistent Rizin debugger for one selected target/backend. Linux and a caller-selected TTY for inferior stdin/stdout/stderr are required; the target may use that terminal after detach. Startup suppresses user settings/scripts while retaining plugins. Detach requires verified output sinks, no target access to the debugger command stream, and dbg.exitkills=false. Capabilities depend on the installed backend. This shared-server operation retires binary analysis: close Ghidra explicitly first, then reopen the binary after effects settle.",
				inputSchema: z.strictObject({
					path: absoluteLocalPathStringSchema,
					inferior_tty: absoluteLocalPathStringSchema,
					backend: z.string().min(1).optional()
				}),
				outputSchema: z.strictObject({
					session_id: sessionId,
					backend: z.string().nullable()
				}),
				examples: [{
					title: "Start Rizin debugger",
					input: {
						path: "/tmp/program",
						inferior_tty: "/dev/pts/7"
					}
				}]
			},
			{
				name: "rizin_debug_command",
				...toolContractMetadata("rizin_debug_command", toolEffects({
					mutatesTarget: true,
					mutatesSession: true,
					executesForeignCode: true,
					writesFilesystem: true,
					launchesProcess: true,
					accessesNetwork: true,
					changesUiState: true,
					mayDiscardData: true,
					idempotent: false
				})),
				kind: "native-provider",
				description: "Run one unrestricted command in a persistent Rizin debugger; it can access target state, plugins, shell, files and network. Returns raw/interleaved session output as Evidence. Output/frame limits stop the owned debugger and retain partial output with output_truncated and unknown completion. Prequeued unsolicited frames refuse the call because correlation is ambiguous. This shared-server operation retires binary analysis: close Ghidra explicitly first, then reopen the binary after effects settle.",
				inputSchema: z.strictObject({
					session_id: sessionId,
					command: z.string().min(1).refine((value) => !/[\r\n]/u.test(value), "A single command line is required")
				}),
				outputSchema: evidenceResultOf(commandResult),
				examples: [{
					title: "Inspect debugger state",
					input: {
						session_id: "00000000-0000-4000-8000-000000000001",
						command: "dr"
					}
				}]
			},
			{
				name: "rizin_debug_session_status",
				...toolContractMetadata("rizin_debug_session_status", toolEffects({ mutatesSession: true })),
				kind: "native-provider",
				description: "Return observed lifecycle state and bounded recent NUL-framed output and process diagnostics for one Rizin debugger session; closed_reason says why a closed session stopped, truncation fields report discarded data, and output_invalid_utf8 reports whether invalid UTF-8 has been observed in session frame bytes; recent output may contain replacement characters.",
				inputSchema: z.strictObject({ session_id: sessionId }),
				outputSchema: z.strictObject({
					session_id: sessionId,
					state: z.enum(["ready", "closed"]),
					inferior_tty: z.string(),
					recent_output: z.array(z.string()),
					recent_output_truncated: z.boolean(),
					diagnostics_truncated: z.boolean(),
					output_invalid_utf8: z.boolean(),
					closed_reason: z.string().exactOptional().describe("Present when state is closed: why the session stopped accepting commands. Close it and start a new session to continue."),
					closed_reason_code: z.enum(DEBUGGER_SESSION_STOP_CODES).exactOptional().describe("Present with closed_reason: input-stream-failure, output-correlation-failure, command-deadline, command-cancelled, server-shutdown, close-requested, process-exited, or stopped.")
				}),
				examples: [{
					title: "Check Rizin session",
					input: { session_id: "00000000-0000-4000-8000-000000000001" }
				}]
			},
			{
				name: "close_rizin_debug_session",
				...toolContractMetadata("close_rizin_debug_session", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true,
					mutatesTarget: true,
					executesForeignCode: true
				})),
				kind: "native-provider",
				description: "Close the REA-owned Rizin debugger only after verifying no inferior remains or detaching one with a verified caller-selected TTY output sink. A detached target may continue running, read from and write to that TTY; target state is otherwise reported as unknown. REA never signals an inferior based on PID or path. In a shared MCP server, this admitted close retires any active binary-analysis session; after target effects have settled, call open_binary before further analysis. Close an active Ghidra session explicitly first.",
				inputSchema: z.strictObject({ session_id: sessionId }),
				outputSchema: z.strictObject({ target_state: z.literal("unknown") }),
				examples: [{
					title: "Close Rizin debugger",
					input: { session_id: "00000000-0000-4000-8000-000000000001" }
				}]
			}
		];
	})))();
}

//#endregion
//#region dist/domain/environmentBundleExport.js
var environmentCaptureSourceSchema, exportEnvironmentBundleInputSchema, environmentBuildReportSchema;
function init_environmentBundleExport() {
	return (init_environmentBundleExport = __esmMin((() => {
		init_environmentCoverageView();
		init_environmentManifestRules();
		init_digests();
		init_evidenceReference();
		init_localPath();
		init_portableBundleName();
		environmentCaptureSourceSchema = z.discriminatedUnion("kind", [retainedEvidenceReferenceSchema.describe("Capture Evidence this session retained, such as a capture_browser_scenario or inspect_web_network_capture result."), z.strictObject({
			kind: z.literal("evidence-file"),
			path: absoluteLocalPathStringSchema.describe("Absolute path of one capture Evidence JSON file, copied byte for byte into the bundle.")
		})]);
		exportEnvironmentBundleInputSchema = z.strictObject({
			source: environmentCaptureSourceSchema.describe("The capture the environment is built from: capture_browser_scenario Evidence, or HAR inspect_web_network_capture Evidence."),
			output_directory: absoluteLocalPathStringSchema.describe("Absolute, absent output directory for the bundle folder; parent must exist."),
			name: portableBundleNameSchema.optional().describe("Env folder and env id (kebab-case). Default: the manifest's name; required when the capture's origin is a loopback or IP address."),
			template_rules: z.array(z.enum(TEMPLATE_RULES)).optional().describe("Opt-in template rules, each at most once; [] applies only the format rules. Default: after-uid-literal, opaque-token, sibling-variance and prefix-variance."),
			package_tarball: absoluteLocalPathStringSchema.optional().describe("Absolute path of a packed rea-agents tarball the bundle installs instead of the registry package of this version."),
			dry_run: z.boolean().default(false).describe("Report what the bundle would hold without writing anything.")
		});
		environmentBuildReportSchema = z.strictObject({
			status: z.enum(["built", "planned"]),
			directory: z.string().nullable(),
			name: z.string(),
			capture: z.strictObject({
				evidence_id: prefixedDigestSchema("ev"),
				operation: z.string(),
				records: z.int().nonnegative(),
				input: z.enum(["har", "evidence"])
			}),
			manifest: z.strictObject({
				evidence_id: prefixedDigestSchema("ev"),
				tools: z.int().nonnegative(),
				excluded_groups: z.int().nonnegative(),
				template_rules: z.array(z.enum(TEMPLATE_RULES))
			}),
			state: z.union([z.strictObject({
				served: z.literal(true),
				evidence_id: z.string()
			}), z.strictObject({
				served: z.literal(false),
				reason: z.literal("unavailable"),
				code: z.string(),
				message: z.string()
			})]).describe("Whether the bundle serves from the derived state, or replays and why."),
			coverage: environmentCoverageSchema.nullable().describe("Read tools answered from the state or replayed, and write tools served or withheld; null when the bundle serves replay."),
			tool_count: z.int().nonnegative(),
			package_source: z.union([z.strictObject({
				kind: z.literal("registry"),
				specifier: z.string()
			}), z.strictObject({
				kind: z.literal("tarball"),
				path: z.string()
			})]),
			files: z.array(z.strictObject({
				path: z.string(),
				bytes: z.int().nonnegative()
			})),
			warnings: z.array(z.strictObject({
				code: z.enum([
					"name-from-file",
					"credential-named-members",
					"credential-scan-incomplete",
					"credential-named-saved-values"
				]),
				message: z.string(),
				pointers: z.array(z.string()).describe("Where the warning applies, such as record pointers; never values.")
			})),
			next: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/contracts/environmentToolContracts.js
var ENVIRONMENT_TOOL_CONTRACTS;
function init_environmentToolContracts() {
	return (init_environmentToolContracts = __esmMin((() => {
		init_environmentBundleExport();
		init_toolEffects();
		ENVIRONMENT_TOOL_CONTRACTS = [{
			name: "export_environment_bundle",
			...toolContractMetadata("export_environment_bundle", toolEffects({
				writesFilesystem: true,
				idempotent: false
			})),
			description: "Write an agent environment bundle from capture_browser_scenario Evidence or HAR inspect_web_network_capture Evidence to an absent absolute output_directory whose parent exists. Copies complete capture Evidence, including recorded bodies, and derives replay/state read tools and served/withheld writes with coverage and next-recording hints. Preview the same coverage with inspect_analysis_view kind environment-coverage. dry_run reports without writing but still validates the destination. Uses default template rules, reads only selected Evidence and optional package_tarball, and writes only that directory; no network access. The bundle README explains agentenv use. Destination refusals name this tool; other failures name their export stage.",
			kind: "application",
			inputSchema: exportEnvironmentBundleInputSchema,
			outputSchema: environmentBuildReportSchema,
			examples: [{
				title: "Write the bundle for a retained browser scenario capture",
				input: {
					source: {
						kind: "retained-evidence",
						evidence_id: "ev_0000000000000000000000000000000000000000000000000000000000000001"
					},
					output_directory: "/tmp/grafana-env",
					name: "grafana"
				}
			}, {
				title: "Check what a capture file's bundle would serve",
				input: {
					source: {
						kind: "evidence-file",
						path: "/tmp/grafana.capture.json"
					},
					output_directory: "/tmp/grafana-env",
					dry_run: true
				}
			}]
		}];
	})))();
}

//#endregion
//#region dist/contracts/toolContracts.js
var CATALOG_CONTRACT_GROUPS, TOOL_CONTRACT_GROUPS, TOOL_CONTRACTS, toolContract;
function init_toolContracts() {
	return (init_toolContracts = __esmMin((() => {
		init_uefiToolContracts();
		init_analysisSettingsContracts();
		init_gpuToolContracts();
		init_captureToolContracts();
		init_signalToolContracts();
		init_wasmToolContracts();
		init_apkSignatureToolContracts();
		init_evmToolContracts();
		init_desktopApplicationToolContracts();
		init_desktopBuildToolContracts();
		init_goToolContracts();
		init_modelToolContracts();
		init_il2cppToolContracts();
		init_rustToolContracts();
		init_pythonPycToolContracts();
		init_nupkgToolContracts();
		init_beamToolContracts();
		init_v8CodeCacheToolContracts();
		init_mavenGradleMetadataToolContracts();
		init_sqliteToolContracts();
		init_analysisViewToolContracts();
		init_binaryDiagnosticsToolContracts();
		init_nativeToolContracts();
		init_artifactToolContracts();
		init_releaseExposureToolContracts();
		init_managedToolContracts();
		init_firmwareToolContracts();
		init_androidToolContracts();
		init_apktoolToolContracts();
		init_pcapToolContracts();
		init_flutterToolContracts();
		init_jebToolContracts();
		init_adbToolContracts();
		init_managedWorkflowToolContracts();
		init_browserProviderToolContracts();
		init_electronToolContracts();
		init_javascriptRuntimeObservationToolContracts();
		init_applicationToolContracts();
		init_webScriptToolContracts();
		init_webRuntimeToolContracts();
		init_webNetworkCaptureToolContracts();
		init_javascriptRecoveryToolContracts();
		init_officialToolContracts();
		init_enhancedToolContracts();
		init_sessionToolContracts();
		init_cutterToolContracts();
		init_reverseEngineeringToolContracts();
		init_gdbToolContracts();
		init_rizinDebugToolContracts();
		init_fridaToolContracts();
		init_environmentToolContracts();
		init_browserToolContracts();
		init_browserScenarioToolContracts();
		CATALOG_CONTRACT_GROUPS = {
			ANALYSIS_SETTINGS_TOOL_CONTRACTS,
			OFFICIAL_TOOL_CONTRACTS,
			ENHANCED_TOOL_CONTRACTS,
			NATIVE_TOOL_CONTRACTS,
			BINARY_DIAGNOSTICS_TOOL_CONTRACTS,
			ANALYSIS_VIEW_TOOL_CONTRACTS,
			ARTIFACT_TOOL_CONTRACTS,
			RELEASE_EXPOSURE_TOOL_CONTRACTS,
			DESKTOP_APPLICATION_TOOL_CONTRACTS,
			EVM_TOOL_CONTRACTS,
			GO_TOOL_CONTRACTS,
			IL2CPP_TOOL_CONTRACTS,
			MODEL_TOOL_CONTRACTS,
			GPU_TOOL_CONTRACTS,
			RUST_TOOL_CONTRACTS,
			PYTHON_PYC_TOOL_CONTRACTS,
			NUGET_NUPKG_TOOL_CONTRACTS,
			ERLANG_BEAM_TOOL_CONTRACTS,
			V8_CODE_CACHE_TOOL_CONTRACTS,
			MAVEN_GRADLE_METADATA_TOOL_CONTRACTS,
			WASM_TOOL_CONTRACTS,
			APK_SIGNATURE_TOOL_CONTRACTS,
			SQLITE_TOOL_CONTRACTS,
			CAPTURE_TOOL_CONTRACTS,
			SIGNAL_TOOL_CONTRACTS,
			MANAGED_TOOL_CONTRACTS,
			ANDROID_TOOL_CONTRACTS,
			APKTOOL_TOOL_CONTRACTS,
			PCAP_TOOL_CONTRACTS,
			FLUTTER_TOOL_CONTRACTS,
			JEB_TOOL_CONTRACTS,
			ADB_TOOL_CONTRACTS,
			FIRMWARE_TOOL_CONTRACTS,
			UEFI_TOOL_CONTRACTS,
			MANAGED_WORKFLOW_TOOL_CONTRACTS,
			BROWSER_PROVIDER_TOOL_CONTRACTS,
			ELECTRON_TOOL_CONTRACTS,
			JAVASCRIPT_RUNTIME_OBSERVATION_TOOL_CONTRACTS,
			APPLICATION_TOOL_CONTRACTS,
			WEB_SCRIPT_TOOL_CONTRACTS,
			WEB_RUNTIME_TOOL_CONTRACTS,
			WEB_NETWORK_CAPTURE_TOOL_CONTRACTS,
			ENVIRONMENT_TOOL_CONTRACTS,
			DESKTOP_BUILD_TOOL_CONTRACTS,
			JAVASCRIPT_RECOVERY_TOOL_CONTRACTS,
			SESSION_TOOL_CONTRACTS,
			CUTTER_TOOL_CONTRACTS,
			REVERSE_ENGINEERING_TOOL_CONTRACTS,
			GDB_TOOL_CONTRACTS,
			RIZIN_DEBUG_TOOL_CONTRACTS,
			FRIDA_TOOL_CONTRACTS
		};
		TOOL_CONTRACT_GROUPS = {
			...CATALOG_CONTRACT_GROUPS,
			BROWSER_TOOL_CONTRACTS,
			BROWSER_SCENARIO_TOOL_CONTRACTS
		};
		TOOL_CONTRACTS = Object.values(CATALOG_CONTRACT_GROUPS).flat();
		toolContract = (name) => {
			const contract = TOOL_CONTRACTS.find((candidate) => candidate.name === name);
			if (contract === undefined) throw new Error(`Missing tool contract: ${name}`);
			return contract;
		};
	})))();
}

//#endregion
export { TOOL_CONTRACTS, TOOL_CONTRACT_GROUPS, init_toolContracts, toolContract };