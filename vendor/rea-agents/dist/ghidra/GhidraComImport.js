import { sha256Hex } from "../kernel/sha256Hex.js";
import { AnalysisArtifactChangedError } from "../domain/analysisErrorCore.js";
import { err, ok } from "../domain/result.js";
import { classifyProviderFailure } from "../providers/classifyProviderFailure.js";
import { ghidraFileDialect, readGhidraProfileArtifact, } from "./GhidraFileArtifacts.js";
import { ghidraSnapshotFileName } from "./GhidraTargetSnapshot.js";
/**
 * Ghidra 12.2 ComLoader acceptance, used to commit the import selection. The
 * prepare script still requires the program Ghidra actually created.
 *
 * ComLoader (`ghidra.app.util.opinion.ComLoader` in 12.2) returns no load spec
 * unless the provider name ends in `.com`, the bytes are not an MZ image, and
 * its recognition score reaches 12. The score counts DOS `INT` opcodes and
 * `$`-terminated strings the same way that class does, including the extra
 * points it adds after an `INT 21h` or `INT 20h` that already matched.
 */
const COM_SCORE_THRESHOLD = 12;
export const GHIDRA_COM_EXECUTABLE_FORMAT = "Old-style DOS Executable (COM)";
export const GHIDRA_COM_LOADER = "ComLoader";
export const GHIDRA_COM_BINARY_LOADER = "BinaryLoader";
export const GHIDRA_COM_LOAD_ADDRESS = "0000:0100";
export const GHIDRA_COM_LINEAR_ADDRESS = "0x100";
export const GHIDRA_COM_LOAD_SEGMENT = "0x0";
export const GHIDRA_COM_SEGMENT_REGISTER = "0x0";
export const GHIDRA_COM_BINARY_LOAD_ADDRESS = "1000:0100";
export const GHIDRA_COM_BINARY_LINEAR_ADDRESS = "0x10100";
export const GHIDRA_COM_BINARY_LOAD_SEGMENT = "0x1000";
export const GHIDRA_COM_BINARY_SEGMENT_REGISTER = "0x1000";
export const GHIDRA_COM_LOADER_REJECTIONS = [
    "filename_extension",
    "mz_signature",
    "recognition_score",
];
const binaryFallback = (reason) => ({
    loader: GHIDRA_COM_BINARY_LOADER,
    loadAddress: GHIDRA_COM_BINARY_LOAD_ADDRESS,
    loadSegment: GHIDRA_COM_BINARY_LOAD_SEGMENT,
    linearAddress: GHIDRA_COM_BINARY_LINEAR_ADDRESS,
    segmentRegister: GHIDRA_COM_BINARY_SEGMENT_REGISTER,
    executableFormat: "Raw Binary",
    fallback: { loader: GHIDRA_COM_LOADER, reason },
});
const comLoaderSelection = () => ({
    loader: GHIDRA_COM_LOADER,
    loadAddress: GHIDRA_COM_LOAD_ADDRESS,
    loadSegment: GHIDRA_COM_LOAD_SEGMENT,
    linearAddress: GHIDRA_COM_LINEAR_ADDRESS,
    segmentRegister: GHIDRA_COM_SEGMENT_REGISTER,
    executableFormat: GHIDRA_COM_EXECUTABLE_FORMAT,
});
const isPrintable = (value) => value >= 0x20 && value <= 0x7e;
/**
 * Count `$`-terminated printable runs the way ComLoader.countDollarStrings does.
 *
 * That loop restarts inside a printable run that has no `$`, so a 64 KiB image
 * of printable bytes is quadratic and blocks profile resolution. Inside one
 * printable run an earlier start sees every `$` a later start could use, so a
 * miss skips the rest of the run. A hit resumes at the byte after that `$`,
 * the same index ComLoader's `for` increment reaches after `i += len`.
 */
const countDollarStrings = (data) => {
    let count = 0;
    const minLength = 4;
    const limit = data.length - minLength;
    let index = 0;
    while (index < limit && count < 3) {
        if (!isPrintable(data[index])) {
            index += 1;
            continue;
        }
        let end = index + 1;
        while (end < data.length && isPrintable(data[end]))
            end += 1;
        let start = index;
        while (start < limit && start < end && count < 3) {
            let dollar = start + minLength;
            while (dollar < end && data[dollar] !== 0x24)
                dollar += 1;
            if (dollar >= end)
                break;
            count += 1;
            start = dollar + 1;
        }
        index = end;
    }
    return count;
};
/** ComLoader.calculateScore for one image that already passed the length gate. */
export const ghidraComRecognitionScore = (data) => {
    let score = 0;
    for (let index = 0; index < data.length - 2 && score < COM_SCORE_THRESHOLD; index++) {
        if (data[index] !== 0xcd)
            continue;
        if (data[index + 1] === 0x21) {
            score += 2;
            if (index >= 2 && (data[index - 2] === 0xb4 || data[index - 2] === 0xb0))
                score += 3;
            if (index >= 3 && data[index - 3] === 0xb8)
                score += 2;
            if (score >= COM_SCORE_THRESHOLD)
                return score;
        }
        else if (data[index + 1] === 0x20) {
            score += 2;
            if (score >= COM_SCORE_THRESHOLD)
                return score;
        }
        if (index > 1 && (data[index - 2] === 0xb4 || data[index - 2] === 0xb0))
            score += 2;
        if (index > 2 && data[index - 3] === 0xb8)
            score += 2;
        if (score >= COM_SCORE_THRESHOLD)
            return score;
    }
    const dollarStrings = countDollarStrings(data);
    if (dollarStrings > 0)
        score += 3;
    if (dollarStrings > 2)
        score += 2;
    return score;
};
/**
 * Choose ComLoader, or the explicit BinaryLoader fallback, for one admitted
 * DOS COM image. `filename` is the provider name Ghidra will see.
 */
export const selectGhidraComImport = (filename, bytes) => {
    if (!filename.toLowerCase().endsWith(".com"))
        return binaryFallback("filename_extension");
    if (bytes.length > 1 && bytes[0] === 0x4d && bytes[1] === 0x5a)
        return binaryFallback("mz_signature");
    if (ghidraComRecognitionScore(bytes) < COM_SCORE_THRESHOLD)
        return binaryFallback("recognition_score");
    return comLoaderSelection();
};
/** Read the admitted COM image once and select its Ghidra loader. */
export const resolveGhidraComImport = async (target, resources, signal) => {
    let bytes;
    try {
        bytes = await readGhidraProfileArtifact(target.path, 0xff00, resources, signal, (value) => value);
    }
    catch (cause) {
        return err(classifyProviderFailure(cause, ghidraFileDialect("resolve_analysis_profile", { path: target.path })));
    }
    if (sha256Hex(bytes) !== target.sha256)
        return err(new AnalysisArtifactChangedError("resolve_analysis_profile", target.path, "DOS COM bytes changed before import selection"));
    // ComLoader's name gate reads the imported snapshot, not the caller's path.
    return ok(selectGhidraComImport(ghidraSnapshotFileName(target.path, target.sha256), bytes));
};
/** Read the selected import once for launch and independent attestation. */
export const ghidraProfileComImport = (parameters) => {
    const loader = parameters.loader;
    if (loader === GHIDRA_COM_LOADER && parameters.loader_fallback === undefined)
        return ok(comLoaderSelection());
    if (loader === GHIDRA_COM_BINARY_LOADER) {
        const fallback = parameters.loader_fallback;
        if (typeof fallback === "object" &&
            fallback !== null &&
            "loader" in fallback &&
            fallback.loader === GHIDRA_COM_LOADER &&
            "reason" in fallback) {
            const reason = GHIDRA_COM_LOADER_REJECTIONS.find((candidate) => candidate === fallback.reason);
            if (reason !== undefined)
                return ok(binaryFallback(reason));
        }
    }
    return err("The DOS COM analysis profile has no valid loader selection.");
};
