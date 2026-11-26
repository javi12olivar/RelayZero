import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_jsonValue, init_runtimeVersion, javaScriptRuntime, jsonObjectSchema } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { CURRENT_ENTRYPOINT_PATH, init_CurrentEntrypointPath, normalizeEntrypointPath } from "./CurrentEntrypointPath-CMyQTNb_.js";
import { init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { PRODUCT_IDENTITY, SDK_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { init_logger, silentLogger } from "./logger-CYsWF45U.js";
import { COMPACT_INPUT_SCHEMA_PRESENTATION, init_mcpSchemaPresentation, resolveMcpOutputSchemaProfile } from "./mcpToolFamilies-Cjva4yr_.js";
import { init_toolOutputSchemaPrimitives, providerCapabilitySet } from "./sessionToolContracts-D9XcfL6p.js";
import { SQLITE_PROVIDER_IDENTITY, init_SqliteProviderIdentity } from "./SqliteProviderIdentity-CWHXLRw8.js";
import { init_catalogDiscovery, progressiveCatalogIdentity } from "./catalogDiscovery-DRfzYms0.js";
import { init_toolContracts, toolContract } from "./toolContracts-CKzBMbP1.js";
import { directAnalysisCleanupFailure, init_DirectAnalysisCleanup, projectInvocationFailure, withSessionCleanup } from "./DirectAnalysisCleanup-DgQNP-nA.js";
import { init_BinarySessionStatus, providerCapabilitySets } from "./BinarySessionStatus-DK-Lada3.js";
import { catalogIdentityForToolFamilies, init_catalogIdentity } from "./catalogIdentity-MngsEs90.js";
import { statSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { satisfies } from "semver";

//#region dist/process/ServerIdentity.js
var packageRoot, compareServerPaths, createServerIdentity;
function init_ServerIdentity() {
	return (init_ServerIdentity = __esmMin((() => {
		init_HostPlatform();
		init_runtimeVersion();
		init_CurrentEntrypointPath();
		init_identity();
		packageRoot = () => {
			const sourceRoot = dirname(dirname(fileURLToPath(new URL("../process/ServerIdentity.js", import.meta.url).href)));
			return basename(sourceRoot) === "src" && basename(dirname(sourceRoot)) === "dist" ? resolve(sourceRoot, "../..") : resolve(sourceRoot, "..");
		};
		compareServerPaths = (expected, observed, runtime) => {
			const script = normalizeEntrypointPath(expected, runtime) ?? expected;
			if (script === observed) return "aligned";
			if (HOST_PLATFORM.platform === "win32") return "mismatch";
			try {
				const selected = statSync(script, { bigint: true });
				const running = statSync(observed, { bigint: true });
				return selected.dev === running.dev && selected.ino === running.ino ? "aligned" : "mismatch";
			} catch {
				return "unknown";
			}
		};
		createServerIdentity = (input) => {
			const catalog = input.catalog;
			const serverPath = input.commandPath || undefined;
			const pathComparison = input.expected?.server_path === undefined || serverPath === undefined ? "unknown" : compareServerPaths(input.expected.server_path, serverPath, input.runtime ?? javaScriptRuntime(process.versions).id);
			const reasons = [];
			if (input.expected?.package_version !== undefined && input.expected.package_version !== PRODUCT_IDENTITY.packageVersion) reasons.push("package_version_mismatch");
			if (input.expected?.catalog_digest !== undefined && input.expected.catalog_digest !== catalog.digests.combined_sha256) reasons.push("catalog_digest_mismatch");
			if (pathComparison === "mismatch") reasons.push("registration_path_mismatch");
			const observedExpectation = input.expected !== undefined && Object.values(input.expected).some((value) => value !== undefined);
			const pathComparable = input.expected?.server_path === undefined || pathComparison !== "unknown";
			return {
				package: {
					name: PRODUCT_IDENTITY.packageName,
					version: PRODUCT_IDENTITY.packageVersion,
					root_path: packageRoot(),
					build_commit: process.env.REA_BUILD_COMMIT ?? null
				},
				server: {
					name: PRODUCT_IDENTITY.mcpServerKey,
					version: PRODUCT_IDENTITY.packageVersion,
					started_at: input.startedAt,
					command_path: serverPath ?? null
				},
				sdk: SDK_IDENTITY,
				negotiated_protocol_version: input.protocolVersion ?? null,
				client: input.client === undefined ? null : {
					name: input.client.name,
					version: input.client.version
				},
				skill: {
					name: PRODUCT_IDENTITY.skillName,
					expected_version: PRODUCT_IDENTITY.skillVersion
				},
				catalog: {
					counts: catalog.counts,
					digests: catalog.digests
				},
				protocol_features: {
					progress: true,
					cancellation: true,
					elicitation: false
				},
				alignment: {
					state: reasons.length > 0 ? "mcp_server_restart_required" : observedExpectation && pathComparable ? "aligned" : "unknown",
					reasons,
					remediation: reasons.length > 0 ? "Restart the registered MCP server/client, then compare identity again." : observedExpectation && pathComparable ? null : input.expected?.server_path !== undefined && serverPath === undefined ? "The server entrypoint path is unavailable, so registration identity cannot be compared." : input.expected?.server_path !== undefined && pathComparison === "unknown" ? "The expected or running server entrypoint could not be inspected, so registration identity cannot be compared." : "Supply expected package, catalog, or registration identity to compare the live server."
				}
			};
		};
	})))();
}

//#endregion
//#region dist/application/sqlite/SqliteDatabaseCapability.js
var SQLITE_RUNTIME_REQUIREMENT, sqliteDatabaseCapability;
function init_SqliteDatabaseCapability() {
	return (init_SqliteDatabaseCapability = __esmMin((() => {
		init_toolContracts();
		init_SqliteProviderIdentity();
		SQLITE_RUNTIME_REQUIREMENT = "SQLite inspection requires Node.js 24.x >=24.15 or 26+ with the native DatabaseSync.limits API. Other REA features retain their published runtime requirements. The inspection worker verifies the API before querying the snapshot.";
		sqliteDatabaseCapability = (nodeVersion) => {
			const contract = toolContract("inspect_sqlite_database");
			const facts = {
				operation: contract.name,
				provider: SQLITE_PROVIDER_IDENTITY,
				effects: {
					mutatesArtifact: contract.effects.mutatesTarget,
					launchesProcess: contract.effects.launchesProcess,
					mayShowUi: contract.effects.changesUiState,
					mayAccessNetwork: contract.effects.accessesNetwork,
					mayWriteFilesystem: contract.effects.writesFilesystem,
					changesPermissions: false,
					requiresRoot: false
				},
				limitations: [SQLITE_RUNTIME_REQUIREMENT]
			};
			return satisfies(nodeVersion, "^24.15.0 || >=26.0.0") ? {
				...facts,
				available: true,
				reason: null
			} : {
				...facts,
				available: false,
				reason: SQLITE_RUNTIME_REQUIREMENT,
				availabilityCode: "unsupported_version"
			};
		};
	})))();
}

//#endregion
//#region dist/application/DirectAnalysisStatus.js
var runSessionStatus;
function init_DirectAnalysisStatus() {
	return (init_DirectAnalysisStatus = __esmMin((() => {
		init_jsonValue();
		init_ServerIdentity();
		init_logger();
		init_toolOutputSchemaPrimitives();
		init_BinarySessionStatus();
		init_SqliteDatabaseCapability();
		init_CurrentEntrypointPath();
		init_catalogIdentity();
		init_catalogDiscovery();
		init_DirectAnalysisCleanup();
		init_result();
		init_mcpSchemaPresentation();
		runSessionStatus = async (dependencies, logger = silentLogger) => {
			const config = dependencies.readConfiguration();
			if (!config.ok) return { error: projectInvocationFailure(config.error) };
			const session = await dependencies.createBinarySession(config.value, logger);
			return withSessionCleanup(session, async () => {
				const status = jsonObjectSchema.parse(await session.status());
				const catalog = catalogIdentityForToolFamilies(COMPACT_INPUT_SCHEMA_PRESENTATION, resolveMcpOutputSchemaProfile(config.value.mcpOutputSchemaProfile), config.value.mcpToolFamilies === undefined ? undefined : new Set(config.value.mcpToolFamilies));
				return {
					...status,
					capabilities: [...providerCapabilitySet.array().parse(status.capabilities), ...providerCapabilitySets([sqliteDatabaseCapability(process.versions.node)])],
					server_identity: createServerIdentity({
						startedAt: new Date().toISOString(),
						commandPath: CURRENT_ENTRYPOINT_PATH,
						catalog: config.value.mcpToolCatalogProfile === "hot-cold" ? progressiveCatalogIdentity(catalog) : catalog
					})
				};
			}, (status, cleanup) => directAnalysisCleanupFailure(ok(status), cleanup));
		};
	})))();
}

//#endregion
init_DirectAnalysisStatus();
export { runSessionStatus };