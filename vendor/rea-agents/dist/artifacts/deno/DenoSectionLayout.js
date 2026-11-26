import { BinaryReader } from "../../domain/binaryContainer.js";
import { jsonValueSchema } from "../../domain/jsonValue.js";
import { ArtifactReaderFailure, abortIfNeeded, artifactFixedLimitFailure, } from "../../resources/index.js";
import { walkDenoVirtualFs } from "./DenoVirtualFs.js";
import { parseJsonWithDuplicatePolicy } from "../../domain/jsonDuplicateMember.js";
import { strictUtf8Decoder } from "../../domain/strictUtf8.js";
/** Opening and closing marker of a Deno compile data section. */
export const DENO_SECTION_MAGIC = Buffer.from("d3n0l4nd", "latin1");
const MAX_DENO_METADATA_JSON_BYTES = 8 * 1024 * 1024;
export const MAX_DENO_VFS_HEADER_JSON_BYTES = 32 * 1024 * 1024;
const MAX_DENO_TABLE_COUNT = 100_000;
export const MAX_DENO_SPECIFIER_TEXT_BYTES = 8 * 1024 * 1024;
export const MAX_DENO_REMOTE_BODY_BYTES = 256 * 1024 * 1024;
const KNOWN_REMOTE_FLAGS = 0x0f;
const FLAG_TRANSPILED = 1 << 0;
const FLAG_SOURCE_MAP = 1 << 1;
const FLAG_CJS = 1 << 2;
const FLAG_UTF8 = 1 << 3;
const specifierDecoder = strictUtf8Decoder("preserve");
const jsonDecoder = strictUtf8Decoder("strip-signature");
const MEDIA_TYPE_NAMES = [
    "JavaScript",
    "Jsx",
    "Mjs",
    "Cjs",
    "TypeScript",
    "Mts",
    "Cts",
    "Dts",
    "Dmts",
    "Dcts",
    "Tsx",
    "Json",
    "Jsonc",
    "Json5",
    "Markdown",
    "Wasm",
    "Css",
    "Html",
    "SourceMap",
    "Sql",
    "Unknown",
];
export const denoMediaTypeName = (value) => MEDIA_TYPE_NAMES[value] ?? null;
/**
 * Parse one `d3n0l4nd` section. Lengths are checked with BigInt before a
 * read. File bodies and the npm snapshot are skipped; callers keep offsets.
 * An opening marker that is absent is unsupported. A length that overruns
 * the section, or a closing marker that does not match, is malformed.
 */
export const parseDenoSection = async (sectionLength, read, signal) => {
    abortIfNeeded(signal);
    if (!Number.isSafeInteger(sectionLength) ||
        sectionLength < DENO_SECTION_MAGIC.length)
        throw denoUnsupported("opening marker d3n0l4nd is absent");
    const size = BigInt(sectionLength);
    const readExact = async (offset, length) => {
        abortIfNeeded(signal);
        if (!Number.isSafeInteger(offset) ||
            !Number.isSafeInteger(length) ||
            offset < 0 ||
            length < 0 ||
            offset > sectionLength ||
            length > sectionLength - offset)
            throw denoFormatFailure("section read exceeds the declared section");
        if (length === 0)
            return Buffer.alloc(0);
        const bytes = await read(offset, length);
        if (bytes.length !== length)
            throw denoFormatFailure("section read was short");
        return bytes;
    };
    const opening = await readExact(0, DENO_SECTION_MAGIC.length);
    if (!opening.equals(DENO_SECTION_MAGIC))
        throw denoUnsupported("opening marker d3n0l4nd is absent");
    let cursor = BigInt(DENO_SECTION_MAGIC.length);
    const takeRange = (claimed, scope) => {
        if (cursor > size || claimed > size - cursor)
            throw denoFormatFailure(scope === undefined
                ? "length overruns the section"
                : `${scope} length overruns the section`);
        const range = { sectionOffset: Number(cursor), length: Number(claimed) };
        cursor += claimed;
        return range;
    };
    const pull = async (bytes) => {
        const range = takeRange(BigInt(bytes));
        return readExact(range.sectionOffset, range.length);
    };
    const u8 = async () => (await pull(1))[0] ?? 0;
    const u32 = async () => new BinaryReader(await pull(4), true, "deno").u32(0);
    const u64 = async () => new BinaryReader(await pull(8), true, "deno").word(0, 64);
    const readBounded = async (claimed, max, scope) => {
        const range = takeRange(claimed, scope);
        if (claimed > BigInt(max))
            throw denoByteLimit(scope, claimed, max);
        return readExact(range.sectionOffset, range.length);
    };
    const metadataBytes = await readBounded(await u64(), MAX_DENO_METADATA_JSON_BYTES, "metadata JSON");
    const metadata = observeMetadata(decodeJson(metadataBytes, "metadata JSON"));
    const npmSnapshotByteLength = takeRange(await u64(), "npm snapshot").length;
    const specifierStart = cursor;
    const specifierCount = await u32();
    assertTableCount(specifierCount, "specifier");
    const specifierText = new Map();
    let textBytes = 0;
    let invalidUtf8 = false;
    for (let index = 0; index < specifierCount; index += 1) {
        abortIfNeeded(signal);
        const length = await u32();
        const range = takeRange(BigInt(length), "specifier text");
        textBytes += length;
        if (textBytes > MAX_DENO_SPECIFIER_TEXT_BYTES)
            throw denoByteLimit("specifier text", textBytes, MAX_DENO_SPECIFIER_TEXT_BYTES);
        const bytes = await readExact(range.sectionOffset, range.length);
        const id = await u32();
        if (specifierText.has(id))
            throw denoFormatFailure(`duplicate specifier id ${String(id)}`);
        const decoded = decodeStrict(bytes, specifierDecoder);
        if (decoded === undefined)
            invalidUtf8 = true;
        specifierText.set(id, decoded ?? null);
    }
    const specifiers = {
        count: specifierCount,
        byteLength: Number(cursor - specifierStart),
        listing: invalidUtf8 ? "unsupported" : "listed",
    };
    const hasSpecifierText = (id) => typeof specifierText.get(id) === "string";
    const redirectStart = cursor;
    const redirectCount = await u32();
    assertTableCount(redirectCount, "redirect");
    const redirectIds = new Set();
    let redirectListing = "listed";
    for (let index = 0; index < redirectCount; index += 1) {
        abortIfNeeded(signal);
        const from = await u32();
        const to = await u32();
        if (redirectIds.has(from))
            throw denoFormatFailure(`duplicate redirect specifier id ${String(from)}`);
        redirectIds.add(from);
        if (!hasSpecifierText(from) || !hasSpecifierText(to))
            redirectListing = "unsupported";
    }
    const redirects = {
        count: redirectCount,
        byteLength: Number(cursor - redirectStart),
        listing: redirectListing,
    };
    const remoteStart = cursor;
    const remoteCount = await u32();
    assertTableCount(remoteCount, "remote module");
    const remoteIds = new Set();
    const modules = [];
    let remoteBodies = 0n;
    const takeRemoteBody = (length, scope) => {
        const range = takeRange(BigInt(length), scope);
        remoteBodies = addRemoteBody(remoteBodies, length);
        return range;
    };
    let unresolvedRemote = false;
    for (let index = 0; index < remoteCount; index += 1) {
        abortIfNeeded(signal);
        const specifierId = await u32();
        if (remoteIds.has(specifierId))
            throw denoFormatFailure(`duplicate remote specifier id ${String(specifierId)}`);
        remoteIds.add(specifierId);
        if (!hasSpecifierText(specifierId))
            unresolvedRemote = true;
        const mediaType = await u8();
        const data = takeRemoteBody(await u32(), "remote module");
        const flags = await u8();
        if ((flags & ~KNOWN_REMOTE_FLAGS) !== 0)
            throw denoUnsupported(`remote module flags 0x${flags.toString(16)} are not a recognized layout, so later regions are not framed`);
        const optionalRegion = async (flag, scope) => {
            if ((flags & flag) === 0)
                return null;
            return takeRemoteBody(await u32(), scope);
        };
        const transpiled = await optionalRegion(FLAG_TRANSPILED, "remote transpiled");
        const sourceMap = await optionalRegion(FLAG_SOURCE_MAP, "remote source map");
        const cjsExportAnalysis = await optionalRegion(FLAG_CJS, "remote cjs export analysis");
        modules.push({
            index,
            specifierId,
            mediaType,
            data,
            transpiled,
            sourceMap,
            cjsExportAnalysis,
            isValidUtf8: (flags & FLAG_UTF8) !== 0,
        });
    }
    const remoteModules = {
        count: remoteCount,
        byteLength: Number(cursor - remoteStart),
        listing: unresolvedRemote ? "unsupported" : "listed",
        modules,
    };
    const vfsHeader = await readBounded(await u64(), MAX_DENO_VFS_HEADER_JSON_BYTES, "vfs header JSON");
    const vfsJson = decodeJson(vfsHeader, "vfs header JSON");
    const vfsFileData = takeRange(await u64(), "vfs file data");
    if (size - cursor !== BigInt(DENO_SECTION_MAGIC.length))
        throw denoFormatFailure("closing marker is missing or trailing bytes follow it");
    const closing = await pull(DENO_SECTION_MAGIC.length);
    if (!closing.equals(DENO_SECTION_MAGIC))
        throw denoFormatFailure("closing marker does not match d3n0l4nd");
    return {
        metadata,
        npmSnapshotByteLength,
        specifiers,
        redirects,
        remoteModules,
        vfsHeaderByteLength: vfsHeader.length,
        vfsFileData,
        vfs: walkDenoVirtualFs(vfsJson, vfsFileData.length, signal),
        specifierText,
    };
};
const addRemoteBody = (total, length) => {
    const next = total + BigInt(length);
    if (next > BigInt(MAX_DENO_REMOTE_BODY_BYTES))
        throw denoByteLimit("remote module bodies", next, MAX_DENO_REMOTE_BODY_BYTES);
    return next;
};
const assertTableCount = (count, scope) => {
    if (count > MAX_DENO_TABLE_COUNT)
        throw artifactFixedLimitFailure({
            name: `The Deno compile ${scope} record allowance`,
            kind: "count",
            limit: MAX_DENO_TABLE_COUNT,
            unit: "records",
        }, `Deno compile ${scope} table claims ${String(count)} records, exceeding MAX_DENO_TABLE_COUNT (${String(MAX_DENO_TABLE_COUNT)} records).`);
};
const decodeStrict = (bytes, decoder) => {
    try {
        return decoder.decode(bytes);
    }
    catch {
        return undefined;
    }
};
const decodeJson = (bytes, scope) => {
    const text = decodeStrict(bytes, jsonDecoder);
    if (text === undefined)
        throw denoFormatFailure(`${scope} is invalid`);
    const parsed = parseJsonWithDuplicatePolicy(text, "reject");
    if (!parsed.ok) {
        if (parsed.duplicate !== undefined)
            throw denoFormatFailure(`${scope} declares member ${JSON.stringify(parsed.duplicate.name)} more than once`);
        throw denoFormatFailure(`${scope} is invalid`);
    }
    return parsed.value;
};
const observeMetadata = (value) => {
    const record = asRecord(value);
    if (record === undefined)
        throw denoUnsupported("metadata JSON is not an object");
    if (typeof record.entrypoint_key !== "string")
        throw denoUnsupported("entrypoint_key is missing or not a string");
    const caData = parseCaData(record.ca_data);
    return {
        entrypointKey: record.entrypoint_key,
        argv: stringArray(record.argv, "argv"),
        v8Flags: stringArray(record.v8_flags, "v8_flags"),
        permissions: jsonObject(record.permissions, "permissions"),
        unstableConfig: jsonObject(record.unstable_config, "unstable_config"),
        appName: optionalString(record.app_name, "app_name"),
        selfExtracting: optionalString(record.self_extracting, "self_extracting"),
        ...envVars(record.env_vars_from_env_file),
        caData,
        caDataByteLength: caData?.length ?? null,
        vfsCaseSensitivity: caseSensitivity(record.vfs_case_sensitivity),
    };
};
const stringArray = (value, label) => {
    if (value === undefined)
        return null;
    if (!Array.isArray(value) || value.some((item) => typeof item !== "string"))
        throw denoUnsupported(`${label} is not an array of strings`);
    return value;
};
const jsonObject = (value, label) => {
    if (value === undefined)
        return null;
    const parsed = jsonValueSchema.safeParse(value);
    if (!parsed.success ||
        parsed.data === null ||
        typeof parsed.data !== "object" ||
        Array.isArray(parsed.data))
        throw denoUnsupported(`${label} is not a JSON object`);
    return parsed.data;
};
const optionalString = (value, label) => {
    if (value === undefined || value === null)
        return null;
    if (typeof value !== "string")
        throw denoUnsupported(`${label} is not a string`);
    return value;
};
const envVars = (value) => {
    if (value === undefined)
        return { envVarCount: null, envVars: null };
    const record = asRecord(value);
    if (record === undefined)
        throw denoUnsupported("env_vars_from_env_file is not an object");
    const vars = Object.entries(record).map(([name, stored]) => {
        if (typeof stored !== "string")
            throw denoUnsupported("env_vars_from_env_file values are not strings");
        return {
            name,
            value: stored,
            valueByteLength: Buffer.byteLength(stored, "utf8"),
        };
    });
    return { envVarCount: vars.length, envVars: vars };
};
const parseCaData = (value) => {
    if (value === undefined || value === null)
        return null;
    if (!Array.isArray(value) ||
        value.some((item) => typeof item !== "number" ||
            !Number.isInteger(item) ||
            item < 0 ||
            item > 255))
        throw denoUnsupported("ca_data is not a byte array");
    return value;
};
const caseSensitivity = (value) => {
    if (value === undefined)
        return null;
    if (value === "s")
        return "sensitive";
    if (value === "i")
        return "insensitive";
    throw denoUnsupported("vfs_case_sensitivity is not s or i");
};
const asRecord = (value) => {
    if (typeof value !== "object" || value === null || Array.isArray(value))
        return undefined;
    return Object.fromEntries(Object.entries(value));
};
export const denoFormatFailure = (detail) => new ArtifactReaderFailure("format", `Deno compile section is malformed: ${detail}`);
export const denoUnsupported = (detail) => new ArtifactReaderFailure("unavailable", `Deno compile section layout is unsupported: ${detail}`);
export const denoByteLimit = (scope, claimed, allowance) => artifactFixedLimitFailure({
    name: `The Deno compile ${scope} allowance`,
    kind: "parser",
    limit: allowance,
    unit: "bytes",
}, `The ${scope} claims ${String(claimed)} bytes, above ${String(allowance)} bytes.`, "memory");
