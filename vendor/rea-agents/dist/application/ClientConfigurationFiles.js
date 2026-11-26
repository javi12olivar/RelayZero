import { err, ok } from "../domain/result.js";
import { RegularFileCleanupFailure } from "../filesystem/OwnedRegularFile.js";
import { readRegularFileText } from "../process/RegularFileRead.js";
import { effectiveClientServer, parseClientConfiguration, clientConfigurationValuesEqual, } from "./ClientConfigurationDocument.js";
import { clientRegistrationEnvironment } from "./ClientRegistrationEnvironment.js";
import { mergeEnvironmentOverrides } from "../process/snapshotEnvironment.js";
import { PRODUCT_IDENTITY } from "../identity.js";
import { isRecord } from "../kernel/isRecord.js";
import { errorMessage } from "../kernel/errorMessage.js";
const invalidEnvironment = (path, error, overrides, platform) => {
    const constraints = error.settings
        .map(({ setting, constraint }) => `${setting}: ${constraint}`)
        .join("; ");
    const overrideNames = new Set(Object.keys(overrides ?? {}).map((name) => platform === "win32" ? name.toUpperCase() : name));
    const overrideSettings = error.settings
        .map(({ setting }) => setting)
        .filter((setting) => overrideNames.has(platform === "win32" ? setting.toUpperCase() : setting));
    const location = overrideSettings.length > 0
        ? `The proposed registration environment includes launch overrides (${overrideSettings.join(", ")}) that do not satisfy the effective REA configuration constraints`
        : overrideNames.size > 0
            ? `The effective REA server environment for ${path} is invalid; check the client configuration and proposed launch overrides`
            : `Configuration ${path} has an invalid REA server environment`;
    return {
        kind: "malformed",
        path,
        detail: `${location}: ${constraints}${constraints.endsWith(".") ? "" : "."} ${overrideNames.size === 0 ? "Repair it" : "Check the launch environment and any existing registration settings"} before retrying.`,
    };
};
const configurationEnvironmentFailure = (client, platform, { path, document, validation, overrides, }) => {
    const environment = clientRegistrationEnvironment(document, client, platform, overrides, validation);
    return environment.ok
        ? undefined
        : invalidEnvironment(path, environment.error, overrides, platform);
};
/** Preserve named read failures and distinguish a missing source from an empty file. */
export const readConfigurationText = async (path, resources) => {
    try {
        return ok(await readRegularFileText(path, resources === undefined ? {} : { resources }));
    }
    catch (cause) {
        if (cause instanceof Error && "code" in cause && cause.code === "ENOENT")
            return ok(undefined);
        return err({
            kind: "unreadable",
            path,
            detail: `Configuration ${path} could not be read: ${errorMessage(cause)}`,
            ...(cause instanceof RegularFileCleanupFailure
                ? { cleanupFailure: cause }
                : {}),
        });
    }
};
/** Read and parse one configuration at its source boundary. */
export const readConfigurationFile = async (path, format, resources) => {
    const source = await readConfigurationText(path, resources);
    if (!source.ok)
        return source;
    const content = source.value;
    if (content === undefined)
        return ok(undefined);
    try {
        return ok(parseClientConfiguration(content, format));
    }
    catch (cause) {
        return err({
            kind: "malformed",
            path,
            detail: `Configuration ${path} is malformed: ${errorMessage(cause)}`,
        });
    }
};
/** Read each layer; setup may validate its writable layer with proposed overrides. */
export const readClientConfigurationFiles = async (client, resources, platform, { writeOverrides, targetDocument } = {}) => {
    // An unresolved location is evidence only: its path may be relative to
    // REA's own folder, so reading it would inspect a file the client never
    // loads.
    if (client.configPathError !== undefined)
        return err({
            kind: "unreadable",
            path: client.configPath,
            detail: client.configPathError,
        });
    const paths = client.configPaths ?? [client.configPath];
    if (targetDocument !== undefined && !paths.includes(client.configPath))
        return err({
            kind: "unreadable",
            path: client.configPath,
            detail: "The selected configuration is missing from the native load order.",
        });
    const documents = [];
    for (const path of paths) {
        const isTarget = path === client.configPath;
        const document = isTarget && targetDocument !== undefined
            ? ok(targetDocument)
            : await readConfigurationFile(path, client.format, resources);
        if (!document.ok)
            return document;
        if (document.value === undefined)
            continue;
        // A read-only lower layer's environment can be replaced as a whole map
        // by a later layer (Goose), so only the effective view is validated.
        if (isTarget || client.readOnlyLowerLayers !== true) {
            const failure = configurationEnvironmentFailure(client, platform, {
                path,
                document: document.value,
                validation: "fragment",
                overrides: isTarget ? writeOverrides : undefined,
            });
            if (failure !== undefined)
                return err(failure);
        }
        documents.push({ ...document.value, sourcePath: path });
    }
    // The inline layer is read-only and may replace a lower environment map,
    // so like a read-only lower layer only the effective view is validated.
    if (client.inlineConfiguration !== undefined)
        documents.push({
            ...client.inlineConfiguration.parsed,
            inlineOrigin: client.inlineConfiguration.origin,
        });
    const failure = configurationEnvironmentFailure(client, platform, {
        path: client.configPath,
        document: mergeClientConfigurationDocuments(documents, platform),
        validation: "effective",
        overrides: writeOverrides,
    });
    return failure === undefined ? ok(documents) : err(failure);
};
/** Reuse admitted peers and substitute the candidate at every occurrence of the write target. */
export const admitClientConfigurationCandidate = (client, sources, candidate, platform) => {
    const path = client.configPath;
    const fragment = configurationEnvironmentFailure(client, platform, {
        path,
        document: candidate,
        validation: "fragment",
    });
    if (fragment !== undefined)
        return err(fragment);
    const effective = mergeClientConfigurationDocuments(sources.map((source) => (source.sourcePath === path ? candidate : source)), platform);
    const failure = configurationEnvironmentFailure(client, platform, {
        path,
        document: effective,
        validation: "effective",
    });
    return failure === undefined ? ok(effective) : err(failure);
};
/** OpenCode merges server objects in file order, replacing arrays and scalar values. */
const mergeConfigurationValue = (previous, next) => {
    if (!isRecord(previous) || !isRecord(next))
        return next;
    return Object.fromEntries([...new Set([...Object.keys(previous), ...Object.keys(next)])].map((key) => [
        key,
        Object.hasOwn(next, key)
            ? mergeConfigurationValue(previous[key], next[key])
            : previous[key],
    ]));
};
/** Native OpenCode dialect applies across all selected configuration layers. */
export const clientWriteDialect = (dialect, sources) => dialect === "opencode" &&
    sources.some(({ dialect }) => dialect === "opencode_v2")
    ? "opencode_v2"
    : dialect;
/** Interpret the write fragment using the effective client dialect, preserving peers. */
export const clientConfigurationForWrite = (parsed, sources) => {
    if (parsed.dialect !== "opencode" ||
        clientWriteDialect(parsed.dialect, sources) !== "opencode_v2")
        return parsed;
    if (Object.hasOwn(parsed.servers, "servers"))
        throw new TypeError("A legacy OpenCode server named servers conflicts with the effective native server table; repair this ambiguity before setup");
    return {
        ...parsed,
        dialect: "opencode_v2",
        serversPath: ["mcp", "servers"],
        servers: {},
        legacyServers: parsed.servers,
    };
};
/** Project a client's effective user registration without modifying its source files. */
export const effectiveClientConfiguration = (sources, target, platform) => {
    const documents = target === undefined
        ? sources
        : [
            ...(target.client.configPaths ?? [target.client.configPath]).flatMap((path) => {
                const document = path === target.client.configPath
                    ? target.document
                    : sources.find(({ sourcePath }) => sourcePath === path);
                return document === undefined ? [] : [document];
            }),
            ...sources.filter(({ inlineOrigin }) => inlineOrigin !== undefined),
        ];
    return mergeClientConfigurationDocuments(documents, platform);
};
/** The client's read-only inline layers that set REA's entry. */
export const inlineRegistrationOrigins = (client) => {
    const inline = client.inlineConfiguration;
    const name = PRODUCT_IDENTITY.mcpServerKey;
    return inline !== undefined &&
        (Object.hasOwn(inline.parsed.servers, name) ||
            Object.hasOwn(inline.parsed.legacyServers, name))
        ? [inline.origin]
        : [];
};
/**
 * The inline layer that would change the REA registration setup writes as
 * `desired` into the write target, which setup cannot edit around.
 */
export const inlineRegistrationOverride = (client, sources, desired, platform) => {
    const name = PRODUCT_IDENTITY.mcpServerKey;
    const inline = sources.filter(({ inlineOrigin }) => inlineOrigin !== undefined);
    const declaring = inline.find((layer) => Object.hasOwn(layer.servers, name) ||
        Object.hasOwn(layer.legacyServers, name));
    if (declaring?.inlineOrigin === undefined)
        return undefined;
    const files = sources.filter(({ sourcePath }) => sourcePath !== undefined);
    const written = effectiveClientConfiguration(files, {
        client,
        document: {
            ...declaring,
            servers: { [name]: desired },
            legacyServers: {},
        },
    }, platform);
    const effective = mergeClientConfigurationDocuments([...(written === undefined ? [] : [written]), ...inline], platform);
    const launched = (entry) => launchedRegistrationEntry(entry, declaring.environmentKey, platform);
    return clientConfigurationValuesEqual(launched(written?.servers[name]), launched(effective?.servers[name]))
        ? undefined
        : declaring.inlineOrigin;
};
/**
 * The string settings the inline layer declares in REA's entry environment,
 * or an empty record when no inline layer sets REA's entry.
 */
export const inlineRegistrationEnvironment = (sources) => {
    const name = PRODUCT_IDENTITY.mcpServerKey;
    const declaring = sources.find((layer) => layer.inlineOrigin !== undefined &&
        (Object.hasOwn(layer.servers, name) ||
            Object.hasOwn(layer.legacyServers, name)));
    if (declaring === undefined)
        return {};
    const entry = Object.hasOwn(declaring.servers, name)
        ? declaring.servers[name]
        : declaring.legacyServers[name];
    const environment = isRecord(entry)
        ? entry[declaring.environmentKey]
        : undefined;
    return isRecord(environment)
        ? Object.fromEntries(Object.entries(environment).filter((setting) => typeof setting[1] === "string"))
        : {};
};
/**
 * An entry as the client launches it: Windows environment names are one name
 * whatever their case, so `PATH` and an equal `Path` start the same server.
 */
export const launchedRegistrationEntry = (entry, environmentKey, platform) => {
    if (platform !== "win32" || !isRecord(entry))
        return entry;
    const environment = entry[environmentKey];
    if (!isRecord(environment))
        return entry;
    return {
        ...entry,
        [environmentKey]: Object.fromEntries(Object.entries(mergeEnvironmentOverrides({}, environment, platform)).map(([key, value]) => [key.toUpperCase(), value])),
    };
};
/** Merge admitted layers without re-reading or changing their source documents. */
export const mergeClientConfigurationDocuments = (documents, platform) => {
    const last = documents.at(-1);
    if (last === undefined)
        return undefined;
    if (documents.length === 1)
        return last;
    const servers = Object.create(null);
    for (const document of documents) {
        const names = new Set([
            ...Object.keys(document.legacyServers),
            ...Object.keys(document.servers),
        ]);
        for (const name of names) {
            const previous = servers[name];
            const next = effectiveClientServer(document, name);
            // Goose overlays each extension one field deep (`merge_nested_entries`),
            // replacing nested values such as `envs` whole.
            const goose = document.dialect === "goose";
            const merged = goose
                ? isRecord(previous) && isRecord(next)
                    ? { ...previous, ...next }
                    : next
                : mergeConfigurationValue(previous, next);
            const key = document.environmentKey;
            if (!goose &&
                name === PRODUCT_IDENTITY.mcpServerKey &&
                isRecord(merged) &&
                isRecord(merged[key])) {
                const before = isRecord(previous) && isRecord(previous[key]) ? previous[key] : {};
                const after = isRecord(next) && isRecord(next[key]) ? next[key] : {};
                servers[name] = {
                    ...merged,
                    [key]: mergeEnvironmentOverrides(before, after, platform),
                };
            }
            else
                servers[name] = merged;
        }
    }
    return {
        ...last,
        dialect: clientWriteDialect(last.dialect, documents),
        servers,
        legacyServers: {},
    };
};
/** Read the configuration ZCode will load, preserving its same-scope fallback rule. */
export const readEffectiveClientRegistrationConfiguration = async (client, resources, platform) => {
    const nativeSources = await readClientConfigurationFiles(client, resources, platform);
    if (!nativeSources.ok)
        return nativeSources;
    const nativeDocument = effectiveClientConfiguration(nativeSources.value, undefined, platform);
    const fallbackPath = client.format === "zcode" ? client.zcodeFallbackPath : undefined;
    if (fallbackPath === undefined ||
        (nativeDocument !== undefined &&
            Object.keys(nativeDocument.servers).length > 0))
        return ok({ document: nativeDocument, configPath: client.configPath });
    const fallbackClient = {
        ...client,
        configPath: fallbackPath,
        configPaths: [fallbackPath],
        format: "zcode_fallback",
    };
    const fallbackSources = await readClientConfigurationFiles(fallbackClient, resources, platform);
    if (!fallbackSources.ok)
        return fallbackSources;
    const fallbackDocument = effectiveClientConfiguration(fallbackSources.value, undefined, platform);
    return ok(fallbackDocument === undefined
        ? { document: nativeDocument, configPath: client.configPath }
        : { document: fallbackDocument, configPath: fallbackPath });
};
