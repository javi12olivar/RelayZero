import { abortIfNeeded, digestReadableToCompletion, hashStableRootArtifactHandle, } from "../resources/index.js";
import { createArtifactClassificationProbe, } from "./ArtifactClassificationProbe.js";
/** Hash every stream byte, optionally feeding the same bytes to a scan aggregate. */
export const hashReadable = async (stream, signal, integrityAlgorithm, asarHeaderAdmission, observeChunk) => {
    const completed = await hashReadableToCompletion(stream, signal, integrityAlgorithm, asarHeaderAdmission, observeChunk);
    abortIfNeeded(signal);
    return completed;
};
/** Keep a fully delivered digest so its owner can validate before late cancellation.
 * Source stability remains the stream or caller's responsibility.
 */
export const hashReadableToCompletion = async (stream, signal, integrityAlgorithm, asarHeaderAdmission, observeChunk) => {
    const probe = createArtifactClassificationProbe(asarHeaderAdmission);
    const digest = await digestReadableToCompletion(stream, signal, integrityAlgorithm, (chunk) => {
        observeChunk?.(chunk);
        probe.write(chunk);
    });
    return { ...digest, ...probe.finish(digest.bytes) };
};
/** Hash and revalidate an open root descriptor, with the root's classification evidence. */
export const classifyStableRootArtifactHandle = async (path, handle, initial, signal) => {
    const probe = createArtifactClassificationProbe(undefined);
    const digest = await hashStableRootArtifactHandle(path, handle, initial, signal, (chunk) => probe.write(chunk));
    return { ...digest, ...probe.finish(digest.bytes) };
};
