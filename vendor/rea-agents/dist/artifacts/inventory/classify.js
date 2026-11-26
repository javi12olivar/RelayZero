import { probeUefiFlashImage } from "../../uefi/UefiFormatProbe.js";
import { ParseFailureError } from "../../domain/parseFailure.js";
import { artifactOperationCause, ArtifactReaderFailure, openRootArtifact, releaseRootArtifact, abortIfNeeded, assertArtifactSelectedSource, } from "../../resources/index.js";
import { nesContainerFormat, parseInesLayout, } from "../../domain/inesContainer.js";
import { resolveArtifactReaderLimits, } from "../../domain/artifactReaderLimits.js";
import { locateEspFlashLayout, } from "../../domain/firmware/espFlashLocation.js";
import { artifactNameForClassification } from "../../domain/artifactNameSelection.js";
import { ArtifactEmbeddedFormatProbes, } from "../ArtifactEmbeddedFormatProbes.js";
import { assertStableRegularFileIdentity, RegularFileChangedError, sameRegularFileState, } from "../../filesystem/RegularFile.js";
import { decodeNodeSeaBlob } from "../nodeSea/NodeSeaBlob.js";
import { readNodeSeaBlob } from "../nodeSea/NodeSeaLocation.js";
import { classifyArtifactContent } from "./ArtifactGraphConstruction.js";
import { MAX_PE_OPTIONAL_HEADER_BYTES, PE_RECORD_HEADER_BYTES, claimsExecutableHeader, } from "../../domain/binaryTarget.js";
import { createArtifactClassificationProbe } from "../ArtifactClassificationProbe.js";
import { hasZipSignature, hasTrailingZipArchive, zipRootPackageFormat, } from "../../domain/zipPackageFormat.js";
import { artifactFormatDescriptor } from "../artifactFormats.js";
import { BinaryReader } from "../../domain/binaryContainer.js";
import { classifyStableRootArtifactHandle, } from "../ArtifactHash.js";
import { readMachoHeaderPrefixFacts } from "../../domain/apple/machoContainer.js";
import { hasDiskImageSignature } from "../../domain/apple/diskImageFormat.js";
import { DFUSE_SUFFIX_BYTES, hasDfuSePrefix, } from "../../domain/firmware/dfuse.js";
import { observeMzWindowsHeader, } from "../../domain/dosMz.js";
/** Classify a root and retain its admitted source and format facts for child inventory. */
export const classifyAndHashRootForInventory = async (path, directory, expectedMetadata, options, probeFacts) => {
    if (directory && probeFacts !== undefined) {
        abortIfNeeded(options.signal);
        throw new ArtifactReaderFailure("integrity", `Root artifact changed before inventory: ${path}`, { integrityCheck: "container-identity" });
    }
    if (directory && options.expectedRootSha256 !== undefined)
        throw new ArtifactReaderFailure("integrity", `Artifact root changed after target admission: expected an admitted file at ${path}, observed a directory`, {
            integrityCheck: "container-identity",
            userMessage: "The opened file was replaced by a directory. Select the intended artifact and reopen it before retrying.",
        });
    if (directory)
        return {
            format: "directory",
            digest: null,
            rootSource: undefined,
            readerAdmission: undefined,
        };
    if (options.expectedRootSha256 !== undefined)
        await assertArtifactSelectedSource(path, options.selectedPath);
    const source = await openRootArtifact(path, options.resourceScope, options.signal);
    const { handle, initial } = source;
    let outcome;
    try {
        if (!sameRegularFileState(expectedMetadata, initial))
            throw new ArtifactReaderFailure("integrity", `Root artifact changed before inventory: ${path}`, { integrityCheck: "container-identity" });
        // Prior probe state can prove replacement without interpreting any bytes.
        const probes = new ArtifactEmbeddedFormatProbes(path, source, options.signal, probeFacts, options.readerLimits);
        const admittedDigest = options.expectedRootSha256 === undefined
            ? undefined
            : await classifyStableRootArtifactHandle(path, handle, initial, options.signal);
        if (admittedDigest !== undefined)
            assertAdmittedRootDigest(path, options.expectedRootSha256, admittedDigest.sha256);
        const classified = await classifyRootFormat(path, source, probes, options.signal, options.asarHeaderAdmission, options.selectedPath, options.espFlashSelection, options.readerLimits);
        const format = typeof classified === "string" ? classified : classified.kind;
        const digest = admittedDigest ??
            (await classifyStableRootArtifactHandle(path, handle, initial, options.signal));
        const retainSource = artifactFormatDescriptor(format)?.retainClassifiedSource === true;
        const bunRecognition = probes.completedFacts().bunStandalone;
        const seaRecognition = probes.completedFacts().nodeSeaRecognitionFailure;
        const recognitionLimitations = [
            ...(bunRecognition?.status === "limited"
                ? [
                    `Bun graph recognition remains unknown: ${bunRecognition.failure.message}`,
                ]
                : []),
            ...(seaRecognition === undefined
                ? []
                : [`Node SEA recognition remains unknown: ${seaRecognition.message}`]),
        ];
        outcome = {
            kind: "completed",
            value: {
                format,
                digest,
                ...(recognitionLimitations.length === 0
                    ? {}
                    : { recognitionLimitations }),
                rootSource: retainSource ? source : undefined,
                readerAdmission: typeof classified !== "string"
                    ? classified
                    : retainSource
                        ? source
                        : undefined,
            },
        };
    }
    catch (cause) {
        outcome = { kind: "failed", cause };
    }
    if (outcome.kind === "failed" || outcome.value.rootSource === undefined) {
        await releaseRootArtifact(path, source.owner, options.resourceScope, outcome.kind === "completed"
            ? { kind: "completed", digest: outcome.value.digest }
            : outcome, options.signal);
    }
    if (outcome.kind === "failed")
        throw outcome.cause;
    return outcome.value;
};
/**
 * Executable-branch package order for a native image.
 * Root classification and release-exposure probing both use this decision.
 */
export const classifyEmbeddedExecutablePackage = async (probes, nativeFormat, signal) => {
    const sea = await probes.nodeSea();
    abortIfNeeded(signal);
    if (sea !== undefined)
        return { format: "node-sea", location: sea };
    const bun = await probes.bunStandalone();
    if (bun.status === "present")
        return { format: "bun-standalone", probe: bun };
    const deno = await probes.denoStandalone();
    if (deno.status === "present")
        return { format: "deno-standalone", probe: deno };
    const packaged = await probes.pyInstaller();
    abortIfNeeded(signal);
    if (nativeFormat !== "mach-o-universal") {
        const headerOffset = await probes.dotnetBundle();
        if (headerOffset !== undefined)
            return { format: "dotnet-bundle", headerOffset };
    }
    if (packaged !== undefined)
        return { format: "pyinstaller", cookie: packaged };
    return undefined;
};
const classifyRootFormat = async (path, source, embeddedProbes, signal, asarHeaderAdmission, selectedPath, espFlashSelection, readerLimits = resolveArtifactReaderLimits()) => {
    const { handle } = source;
    const probe = createArtifactClassificationProbe(asarHeaderAdmission);
    const chunk = Buffer.alloc(64 * 1024);
    while (probe.length < probe.limit) {
        abortIfNeeded(signal);
        const read = await handle.read(chunk, 0, Math.min(chunk.length, probe.limit - probe.length), probe.length);
        abortIfNeeded(signal);
        if (read.bytesRead === 0)
            break;
        probe.write(chunk.subarray(0, read.bytesRead));
    }
    const archiveBytes = (await handle.stat()).size;
    const evidence = probe.finish(archiveBytes);
    abortIfNeeded(signal);
    try {
        await assertStableRegularFileIdentity(handle, path, source.initial, {
            symlinks: "reject",
            ...(signal === undefined ? {} : { signal }),
        });
    }
    catch (cause) {
        if (cause instanceof RegularFileChangedError)
            throw new ArtifactReaderFailure("integrity", `Root artifact changed during classification: ${path}`, { cause: cause.cause ?? cause, integrityCheck: "container-identity" });
        throw artifactOperationCause(cause);
    }
    // Fill each range: a short result is end of file, not a partial host read.
    const read = async (position, length) => {
        const bytes = Buffer.alloc(length);
        let filled = 0;
        while (filled < length) {
            abortIfNeeded(signal);
            const observed = await handle.read(bytes, filled, length - filled, position + filled);
            abortIfNeeded(signal);
            if (observed.bytesRead === 0)
                break;
            filled += observed.bytesRead;
        }
        return bytes.subarray(0, filled);
    };
    const locateFlash = (selection, explicit) => locateEspFlashLayout(archiveBytes, read, selection, {
        explicit,
        ...(signal === undefined ? {} : { signal }),
    });
    // The caller's format selection decides before any other signature.
    if (espFlashSelection !== undefined) {
        const selected = await locateFlash(espFlashSelection, true);
        if (!selected.ok)
            throw new ArtifactReaderFailure("unavailable", `ESP flash image layout is not recognized: ${selected.error}`);
        return { kind: "esp-flash-image", source, location: selected.value };
    }
    if (nesContainerFormat(evidence.prefix) !== undefined) {
        const parsed = parseInesLayout(evidence.prefix, archiveBytes);
        if (!parsed.ok)
            throw new ArtifactReaderFailure("format", parsed.error.detail, {
                cause: new ParseFailureError(parsed.error),
            });
        return "ines";
    }
    const classificationPath = artifactNameForClassification(selectedPath ?? path, path);
    const lower = classificationPath.toLowerCase();
    if (hasZipSignature(evidence.prefix))
        return zipRootPackageFormat(lower);
    if (lower.endsWith(".pkg") &&
        evidence.prefix.subarray(0, 4).equals(Buffer.from("xar!")))
        return "pkg";
    if (lower.endsWith(".dmg") &&
        (await hasDiskImageSignature(archiveBytes, read)))
        return "dmg";
    if (await probeUefiFlashImage(handle, signal))
        return "uefi";
    const pck = await embeddedProbes.godotPck(evidence.prefix);
    if (pck !== undefined)
        return { kind: "godot-pck", source, location: pck };
    // A C3 or S3 dump begins with its bootloader, so the layout is located
    // before the bytes are read as one ESP image.
    const flash = await locateFlash({}, false);
    if (flash.ok)
        return { kind: "esp-flash-image", source, location: flash.value };
    const fatEvidence = await readRootFatSliceHeaders(handle, evidence, signal);
    const mzWindowsHeaderRecord = await readRootMzWindowsHeaderRecord(handle, fatEvidence, archiveBytes, signal);
    const mzWindowsHeaderSignature = mzWindowsHeaderRecord === undefined
        ? fatEvidence.mzWindowsHeaderSignature
        : {
            offset: mzWindowsHeaderRecord.offset,
            bytes: mzWindowsHeaderRecord.bytes.subarray(0, 4),
        };
    // The probe stops at its bounded prefix, so a DfuSe trailer is read from
    // the file's own end unless the probe already observed every byte.
    const suffix = fatEvidence.suffix === undefined &&
        archiveBytes >= DFUSE_SUFFIX_BYTES &&
        hasDfuSePrefix(evidence.prefix)
        ? await read(archiveBytes - DFUSE_SUFFIX_BYTES, DFUSE_SUFFIX_BYTES)
        : fatEvidence.suffix;
    const classificationEvidence = {
        ...fatEvidence,
        ...(suffix === undefined ? {} : { suffix }),
        ...(mzWindowsHeaderSignature === undefined
            ? {}
            : { mzWindowsHeaderSignature }),
        ...(mzWindowsHeaderRecord === undefined ? {} : { mzWindowsHeaderRecord }),
    };
    const format = classifyArtifactContent(classificationPath, classificationEvidence, archiveBytes).format;
    // Only bytes no other format claims may lead a located ZIP, so an
    // executable with an appended archive keeps its executable classification.
    if ((format === "file" || format === "unknown") &&
        !claimsExecutableHeader(evidence.prefix, archiveBytes) &&
        (await hasTrailingZipArchive(archiveBytes, read)))
        return zipRootPackageFormat(lower);
    if (["elf", "pe", "mach-o", "mach-o-universal"].includes(format)) {
        const embedded = await classifyEmbeddedExecutablePackage(embeddedProbes, format, signal);
        if (embedded?.format === "node-sea") {
            const decoded = await decodeNodeSeaBlob(await readNodeSeaBlob(source, embedded.location, signal, readerLimits.node_sea), signal, readerLimits.node_sea);
            return {
                kind: "node-sea",
                source,
                location: embedded.location,
                decoded,
                limits: readerLimits.node_sea,
            };
        }
        if (embedded?.format === "bun-standalone")
            return { kind: "bun-standalone", source, probe: embedded.probe };
        if (embedded?.format === "deno-standalone")
            return { kind: "deno-standalone", source, probe: embedded.probe };
        if (embedded?.format === "dotnet-bundle")
            return {
                kind: "dotnet-bundle",
                source,
                headerOffset: embedded.headerOffset,
            };
        // A valid cookie also proves enough bytes for a thin Mach-O identity;
        // PE and universal Mach-O classification already require stronger proof.
        if (embedded?.format === "pyinstaller")
            return {
                kind: "pyinstaller",
                source,
                cookie: embedded.cookie,
                carrierPathDialect: format === "pe" ? "windows" : "posix",
            };
    }
    return format;
};
/** Read exact FAT header windows missed by the bounded prefix probe. */
const readRootFatSliceHeaders = async (handle, evidence, signal) => {
    const existing = evidence.fatSliceHeaders;
    if (existing === undefined)
        return evidence;
    const { header } = existing;
    const sliceHeadersByOffset = new Map(existing.sliceHeadersByOffset);
    for (let index = 0; index < header.slices.length; index += 1) {
        const slice = header.slices[index];
        const observed = slice === undefined ? undefined : sliceHeadersByOffset.get(slice.offset);
        if (slice === undefined ||
            header.rangeIssues[index] !== null ||
            slice.size < 4 ||
            (observed !== undefined && observed.magic !== null))
            continue;
        const headerLength = Math.min(12, slice.size);
        const thinHeader = Buffer.alloc(headerLength);
        let bytesRead = 0;
        while (bytesRead < thinHeader.length) {
            abortIfNeeded(signal);
            const read = await handle.read(thinHeader, bytesRead, thinHeader.length - bytesRead, slice.offset + bytesRead);
            abortIfNeeded(signal);
            if (read.bytesRead === 0)
                break;
            bytesRead += read.bytesRead;
        }
        sliceHeadersByOffset.set(slice.offset, readMachoHeaderPrefixFacts(thinHeader.subarray(0, bytesRead)));
    }
    return { ...evidence, fatSliceHeaders: { header, sliceHeadersByOffset } };
};
/** Read the missing PE record bytes requested by bounded MZ classification. */
const readRootMzWindowsHeaderRecord = async (handle, evidence, fileSize, signal) => {
    const observation = observeMzWindowsHeader(evidence.prefix, fileSize);
    if (observation.state !== "signature-needed" &&
        !(observation.state === "declared" && observation.signature === "PE"))
        return evidence.mzWindowsHeaderRecord;
    const { offset } = observation;
    if (!Number.isSafeInteger(offset) || offset < 0 || offset >= fileSize)
        return evidence.mzWindowsHeaderRecord;
    const window = Buffer.alloc(PE_RECORD_HEADER_BYTES + MAX_PE_OPTIONAL_HEADER_BYTES);
    const existing = evidence.mzWindowsHeaderRecord?.offset === offset
        ? evidence.mzWindowsHeaderRecord.bytes
        : undefined;
    const inline = offset < evidence.prefix.length
        ? evidence.prefix.subarray(offset, Math.min(offset + PE_RECORD_HEADER_BYTES + MAX_PE_OPTIONAL_HEADER_BYTES, evidence.prefix.length))
        : undefined;
    const known = existing !== undefined &&
        (inline === undefined || existing.length > inline.length)
        ? existing
        : inline;
    known?.copy(window);
    let available = known?.length ?? 0;
    const requiredLength = () => {
        if (available < 2 || window[0] !== 0x50 || window[1] !== 0x45)
            return 2;
        if (available < 4 || window[2] !== 0 || window[3] !== 0)
            return 4;
        if (available < PE_RECORD_HEADER_BYTES)
            return PE_RECORD_HEADER_BYTES;
        const optionalHeaderSize = new BinaryReader(window, true, "pe").u16(20);
        return Math.min(PE_RECORD_HEADER_BYTES + optionalHeaderSize, PE_RECORD_HEADER_BYTES + MAX_PE_OPTIONAL_HEADER_BYTES);
    };
    while (available < requiredLength() && offset + available < fileSize) {
        abortIfNeeded(signal);
        const length = Math.min(requiredLength() - available, fileSize - offset - available);
        const chunk = Buffer.alloc(length);
        const read = await handle.read(chunk, 0, length, offset + available);
        abortIfNeeded(signal);
        if (read.bytesRead === 0)
            break;
        chunk.copy(window, available, 0, read.bytesRead);
        available += read.bytesRead;
    }
    if (available === 0)
        return undefined;
    return { offset, bytes: window.subarray(0, available) };
};
/** Compare physically completed bytes before interpreting an admitted file root. */
export const assertAdmittedRootDigest = (path, expected, observed) => {
    if (expected !== undefined && observed !== expected)
        throw new ArtifactReaderFailure("integrity", `Artifact root changed after target admission at ${path}: expected ${expected}, observed ${observed}`, {
            integrityCheck: "container-identity",
            userMessage: "The artifact changed after it was opened. Reopen the selected artifact, then retry.",
        });
};
