import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { PRODUCT_IDENTITY } from "../identity.js";
const RELEASE_PRODUCER = Object.freeze({
    rea_version: PRODUCT_IDENTITY.packageVersion,
});
/** The REA release, as the producer of results computed in REA's own code. */
export const releaseProducerIdentity = () => RELEASE_PRODUCER;
/**
 * SHA-256 over the named packaged sources in `directory`, in name order, each
 * framed by its name and byte length. A missing source throws: a producer
 * whose scripts are not packaged cannot run, so it has no identity either.
 */
export const packagedSourcesDigest = (directory, names) => {
    const hash = createHash("sha256");
    for (const name of [...names].sort()) {
        const bytes = readFileSync(new URL(name, directory));
        hash.update(JSON.stringify([name, bytes.byteLength])).update(bytes);
    }
    return hash.digest("hex");
};
/**
 * One identity per packaged producer, computed on first use. Packaged sources
 * do not change while REA runs, so the digest is read once per process.
 */
export const packagedProducerIdentity = (directory, names) => {
    let identity;
    return () => (identity ??= Object.freeze({
        ...RELEASE_PRODUCER,
        sources_sha256: packagedSourcesDigest(directory, names),
    }));
};
