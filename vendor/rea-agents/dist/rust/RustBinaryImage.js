import { malformedInput, unsupportedInput } from "../domain/parseFailure.js";
import { keyedBy, uniqueKeyed } from "../domain/keyedCollection.js";
import { readBinaryContainer, readBinaryContainerCooperative, } from "../domain/native/readBinaryContainer.js";
import { DEFAULT_RUSTC_HASH_LIMIT, rustcPartialCoverage, rustDependencySectionName, } from "../domain/rust/rustBinary.js";
import { RUST_PRODUCER_DEFAULTS } from "../domain/rust/rustResourceLimits.js";
import { readAuditableSection, RUST_AUDITABLE_FORMAT, } from "./RustAuditableReader.js";
import { hasWasmPreamble, readRustWasmSections } from "./RustWasmImage.js";
const RUSTC_PREFIX = Buffer.from("/rustc/");
const HASH_BYTES = 40;
/** Read dependency metadata from container sections without executing the image. */
export const readRustBinaryImage = (bytes, maxRustcHashes = DEFAULT_RUSTC_HASH_LIMIT, maxOutputBytes = RUST_PRODUCER_DEFAULTS.output_bytes) => finishRustBinaryImage(bytes, maxRustcHashes, maxOutputBytes, hasWasmPreamble(bytes) ? wasmLayout(bytes) : nativeLayout(bytes));
/** Same image as {@link readRustBinaryImage}. ELF section names yield through `pause`. */
export const readRustBinaryImageCooperative = async (bytes, maxRustcHashes, maxOutputBytes, pause) => finishRustBinaryImage(bytes, maxRustcHashes ?? DEFAULT_RUSTC_HASH_LIMIT, maxOutputBytes ?? RUST_PRODUCER_DEFAULTS.output_bytes, hasWasmPreamble(bytes)
    ? wasmLayout(bytes)
    : nativeLayout(bytes, await readBinaryContainerCooperative(bytes, "inspect_rust_binary", pause)));
const finishRustBinaryImage = (bytes, maxRustcHashes, maxOutputBytes, layout) => {
    const { section_name, dependency, compiler_strings, ...identity } = layout;
    return {
        ...identity,
        auditable_metadata: dependency === null
            ? null
            : readAuditableSection(section_name, dependency.offset, bytes.subarray(dependency.offset, dependency.offset + dependency.size), { maxOutputBytes, peFileAlignment: dependency.peFileAlignment }),
        rustc_commit: rustcCommit(bytes, compiler_strings, maxRustcHashes, maxOutputBytes),
    };
};
const nativeLayout = (bytes, container = readBinaryContainer(bytes, "inspect_rust_binary")) => {
    const section_name = rustDependencySectionName(container.format);
    const dependency = dependencySection(section_name, container.sections);
    return {
        format: container.format,
        architecture: container.architecture,
        bits: container.bits,
        byte_order: container.byte_order,
        ...(container.section_names_limitation === undefined
            ? {}
            : { section_names_limitation: container.section_names_limitation }),
        section_name,
        dependency: dependency === null
            ? null
            : {
                offset: dependency.offset,
                size: dependency.size,
                peFileAlignment: dependency.format === "pe" &&
                    dependency.virtual_size === 0 &&
                    dependency.file_alignment > 0 &&
                    dependency.raw_size % dependency.file_alignment === 0
                    ? dependency.file_alignment
                    : undefined,
            },
        compiler_strings: [
            ...container.sections.filter((section) => section.read_only),
            ...(container.format === "elf"
                ? (container.load_regions ?? [])
                    .filter((region) => region.read && !region.write && !region.execute)
                    .map(({ mapping }) => mapping)
                : []),
        ],
    };
};
/** WebAssembly fixes little-endian encoding but declares no container word size. */
const wasmLayout = (bytes) => {
    const { dependency_sections, data_section } = readRustWasmSections(bytes);
    if (dependency_sections.length > 1)
        throw duplicateDependencySection();
    return {
        format: "wasm",
        architecture: "wasm",
        bits: null,
        byte_order: "little",
        section_name: rustDependencySectionName("wasm"),
        dependency: dependency_sections[0] ?? null,
        compiler_strings: data_section === null ? [] : [data_section],
    };
};
/** cargo-auditable writes one dependency section; a second leaves the list ambiguous. */
const duplicateDependencySection = () => malformedInput(RUST_AUDITABLE_FORMAT, "Image contains more than one dependency section");
const dependencySection = (expected, sections) => {
    const selected = uniqueKeyed(keyedBy(sections, ({ name }) => name), expected);
    if (!selected.ok)
        throw duplicateDependencySection();
    const section = selected.value;
    if (section === undefined)
        return null;
    if (section.compressed)
        throw unsupportedInput(RUST_AUDITABLE_FORMAT, "Compressed dependency sections are unsupported", { undecodedContent: true });
    if (!section.file_backed)
        throw malformedInput(RUST_AUDITABLE_FORMAT, "Dependency section is not file-backed");
    return section;
};
const rustcCommit = (bytes, spans, maxHashes, maxOutputBytes) => {
    const retention = {
        hashes: [],
        seen: new Set(),
        maxHashes,
        maxBytes: maxOutputBytes,
        bytes: 2,
        reason: undefined,
    };
    // Overlapping section and ELF load ranges are scanned once, so total work
    // stays bounded by the file size however many mappings reference a range.
    for (const range of mergedFileRanges(spans)) {
        collectHashes(bytes, range, retention);
        if (retention.reason !== undefined)
            break;
    }
    return retention.hashes.length === 0
        ? null
        : {
            evidence_kind: "inferred",
            hashes: retention.hashes,
            ...(retention.reason !== undefined
                ? {
                    coverage: rustcPartialCoverage(retention.reason, retention.reason === "report_bytes"
                        ? maxOutputBytes
                        : maxHashes),
                }
                : {}),
        };
};
const mergedFileRanges = (ranges) => {
    const sorted = ranges
        .filter(({ size }) => size > 0)
        .map(({ offset, size }) => ({ offset, end: offset + size }))
        .sort((left, right) => left.offset - right.offset);
    const merged = [];
    for (const range of sorted) {
        const last = merged.at(-1);
        if (last !== undefined && range.offset <= last.end)
            last.end = Math.max(last.end, range.end);
        else
            merged.push({ ...range });
    }
    return merged;
};
const collectHashes = (bytes, range, retention) => {
    const region = bytes.subarray(range.offset, range.end);
    let cursor = 0;
    while (cursor < region.length) {
        const at = region.indexOf(RUSTC_PREFIX, cursor);
        if (at < 0)
            return;
        const start = at + RUSTC_PREFIX.length;
        const hash = hashAt(region, start);
        if (hash !== null && !retention.seen.has(hash)) {
            if (retention.seen.size >= retention.maxHashes) {
                retention.reason = "max_rustc_hashes";
                return;
            }
            const entry = { hash, file_offset: range.offset + at };
            const entryBytes = Buffer.byteLength(JSON.stringify(entry)) + 1;
            if (entryBytes > retention.maxBytes - retention.bytes) {
                retention.reason = "report_bytes";
                return;
            }
            retention.bytes += entryBytes;
            retention.seen.add(hash);
            retention.hashes.push(entry);
        }
        cursor = at + 1;
    }
};
const hashAt = (region, start) => {
    const end = start + HASH_BYTES;
    // Windows builds join the remapped `/rustc/<hash>` prefix with `\`.
    if (end >= region.length || (region[end] !== 0x2f && region[end] !== 0x5c))
        return null;
    for (let index = start; index < end; index += 1) {
        const byte = region[index] ?? 0;
        const hex = (byte >= 0x30 && byte <= 0x39) || (byte >= 0x61 && byte <= 0x66);
        if (!hex)
            return null;
    }
    return region.toString("latin1", start, end);
};
