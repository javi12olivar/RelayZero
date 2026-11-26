import { satisfies, valid } from "semver";
import { WABT_VERSION } from "../domain/wasm/wasmArtifact.js";
/**
 * Releases admitted for caller-configured tools. WABT changes `wasm-validate`,
 * `wasm-objdump` and `wasm2wat` output only by addition within a minor version;
 * 1.0.42 is the release this adapter verified. Managed downloads stay pinned.
 * The upper bound is exclusive of 1.1.0 so admission matches the `1.0.x`
 * banners `wasmArtifactSchema` accepts; letting 1.1.0 through would admit a
 * tool profile whose report the schema then rejects after inspection ran.
 */
export const WABT_ACCEPTED_RANGE = `>=${WABT_VERSION} <1.1.0`;
export const WABT_PROVIDER_IDENTITY = {
    id: "wabt-artifact",
    name: "REA WABT artifact adapter",
    version: `wabt@${WABT_VERSION}`,
};
/** Caller-facing accepted releases, naming the verified build. */
export const wabtReleaseLine = () => `WABT ${WABT_ACCEPTED_RANGE} (verified with ${WABT_VERSION})`;
/**
 * Release warning for inspections that did not reach a report. Successful
 * reports carry the same text through the admission limitation, so a failure
 * never drops the compatible-release disclaimer that a success would state.
 */
export const wabtReleaseLimitation = (version) => `This inspection uses caller-supplied WABT ${version}. REA verified the tool arguments and output parsing against ${WABT_VERSION}; other releases in ${WABT_ACCEPTED_RANGE} are admitted and the observed banner is reported.`;
/** Classify one `--version` banner against the accepted release range. */
export const admitWabtVersion = (banner) => {
    const token = banner.trim();
    if (valid(token) !== token || !satisfies(token, WABT_ACCEPTED_RANGE))
        return {
            status: "unsupported",
            message: `Unsupported WABT version ${token.length === 0 ? "banner" : token}; accepted releases are ${wabtReleaseLine()}`,
        };
    if (token === WABT_VERSION)
        return { status: "verified", version: token };
    return {
        status: "compatible",
        version: token,
        limitation: wabtReleaseLimitation(token),
    };
};
