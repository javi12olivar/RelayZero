import { cancelledBy } from "../../domain/analysisErrorCore.js";
import { DESKTOP_VIEW_DEFAULTS, desktopViewFileLimitMessage, } from "../../domain/desktop/desktopViewPolicy.js";
import { Readable } from "node:stream";
import { compressionOf, openStateDocument, } from "../../domain/desktop/gzipDocument.js";
import { identityLeftIn, } from "../../domain/desktop/hostIdentity.js";
import { withoutRecoveryList } from "../../domain/desktop/seedRecoveryList.js";
import { scrubSeed } from "../../domain/desktop/seedScrub.js";
import { isTextualFormat, textualView, } from "../../domain/desktop/stateFormats.js";
import { err } from "../../domain/result.js";
import { refuse } from "./DesktopExportInstall.js";
import { readZipView } from "./DesktopZipView.js";
import { sha256Hex } from "../../kernel/sha256Hex.js";
/** Each seed by its home path, then each distinct apt key in the environment folder. */
export const retainedCopies = (plan, seeds) => [
    ...[...seeds].map(([seed, { sha256, format }]) => ({
        path: `envs/${plan.name}/seed/${seed}`,
        digest: sha256,
        name: `~/${seed}`,
        seed: { home: seed, format },
    })),
    ...[
        ...new Map(plan.aptSources.map((source) => [source.keyFile, source.keySha256])),
    ].map(([keyFile, digest]) => ({
        path: `envs/${plan.name}/${keyFile}`,
        digest,
        name: `the apt key ${keyFile}`,
    })),
];
/** A retained file's bytes, refused when they cannot be read. */
const retainedBytes = async (content, copy, signal) => {
    if (signal?.aborted === true)
        throw cancelledBy("export_desktop_application", signal);
    const bytes = await content.read(copy.digest, signal);
    if (!bytes.ok)
        throw refuse(`The retained content of ${copy.name} ${bytes.error}.`, "capture", "Capture the application again, leaving a seed file out of its state paths if it cannot be retained.");
    return bytes.value;
};
/**
 * A seed as it ships: LibreOffice's recovery list left out, then the
 * identity scrubbed, a gzip seed's inside its document. LibreOffice writes
 * its registry uncompressed, so a gzip seed holds no recovery list to drop.
 */
const shippedSeed = (bytes, seed, identity) => {
    const recovered = withoutRecoveryList(seed.home, bytes);
    const scrub = scrubSeed(recovered ?? bytes, seed, identity);
    return {
        bytes: scrub.bytes ?? recovered,
        holdsIdentity: scrub.holdsIdentity,
        scrubbed: scrub.bytes !== undefined && scrub.recompressed !== true,
        recompressed: scrub.recompressed === true,
        recovered: recovered !== undefined,
    };
};
/** A seed's bytes as the bundle ships them, for a task's reader to read at the seed. */
export const shippedSeedBytes = async (content, copy, identity, signal) => {
    const bytes = await retainedBytes(content, copy, signal);
    return copy.seed === undefined
        ? bytes
        : (shippedSeed(bytes, copy.seed, identity).bytes ?? bytes);
};
/**
 * The view of each rewritten seed, including a formerly unreadable gzip
 * seed, as the bundle ships it: the computer starts from these bytes.
 */
export const shippedSeedViews = async (content, copies, identity, signal, policy = DESKTOP_VIEW_DEFAULTS) => {
    const views = new Map();
    for (const copy of copies) {
        const seed = copy.seed;
        if (seed === undefined ||
            (seed.format !== null && !isTextualFormat(seed.format)))
            continue;
        const bytes = await retainedBytes(content, copy, signal);
        const shipped = shippedSeed(bytes, seed, identity).bytes;
        if (shipped === undefined)
            continue;
        if (shipped.length > policy.file_bytes) {
            views.set(seed.home, {
                format: null,
                view: null,
                error: desktopViewFileLimitMessage(policy),
            });
            continue;
        }
        const document = openStateDocument(seed.home, shipped, policy);
        const { format } = document;
        const view = "error" in document
            ? err(document.error)
            : format === "zip"
                ? await readZipView(document.bytes, signal, policy)
                : isTextualFormat(format)
                    ? textualView(format, document.bytes, policy)
                    : undefined;
        views.set(seed.home, {
            format,
            ...compressionOf(document),
            ...(view === undefined || view.ok
                ? { view: view?.value ?? null }
                : { view: null, error: view.error }),
        });
    }
    return views;
};
/**
 * Write the generated files, then each retained file as it is read, so one at
 * a time is in memory: a seed whose text names the capture host, or that
 * holds LibreOffice's recovery list, becomes a generated file with its own
 * digest, and a gzip seed whose document did not change is listed apart as
 * recompressed. The README follows, listing them. Every file is listed as
 * unscrubbed whose path or content still holds the identity.
 */
export const writeFiles = async (tree, content, bundle, signal) => {
    const scrubbed = [];
    const recompressed = [];
    const unscrubbed = [];
    const recovered = [];
    const write = async (path, bytes, shipped) => {
        await tree.write(path, Readable.from([bytes]), {
            bytes: bytes.length,
            sha256: shipped.sha256 ?? sha256Hex(bytes),
        }, signal);
        if (shipped.holdsIdentity ||
            identityLeftIn(path, bundle.identity) !== undefined)
            unscrubbed.push(path);
    };
    const generated = (file) => write(file.path, file.bytes, {
        holdsIdentity: file.holdsIdentity === true ||
            identityLeftIn(file.bytes.toString("utf8"), bundle.identity) !==
                undefined,
    });
    for (const file of bundle.generated)
        await generated(file);
    for (const copy of bundle.copies) {
        const bytes = await retainedBytes(content, copy, signal);
        const shipped = copy.seed === undefined
            ? undefined
            : shippedSeed(bytes, copy.seed, bundle.identity);
        const holdsIdentity = shipped?.holdsIdentity === true;
        if (shipped?.recovered === true)
            recovered.push(copy.name);
        if (shipped?.bytes === undefined)
            await write(copy.path, bytes, { sha256: copy.digest, holdsIdentity });
        else {
            if (shipped.scrubbed)
                scrubbed.push(copy.path);
            else if (shipped.recompressed)
                recompressed.push(copy.path);
            await write(copy.path, shipped.bytes, { holdsIdentity });
        }
    }
    await generated(bundle.readme({
        scrubbed,
        recompressed,
        unscrubbed: [...unscrubbed],
        recovered,
    }));
    return { scrubbed, recompressed, unscrubbed, recovered };
};
