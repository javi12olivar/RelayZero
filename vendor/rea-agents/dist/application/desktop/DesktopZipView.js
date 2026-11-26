import { DESKTOP_VIEW_DEFAULTS, } from "../../domain/desktop/desktopViewPolicy.js";
import { Reader, Uint8ArrayWriter, ZipReader, } from "@zip.js/zip.js";
import { assertArtifactReadActive, decodeZipEntryText, ZIP_READER_OPTIONS, zipEntryPath, } from "../../resources/index.js";
import { DAMAGED_ZIP_ENTRY, UNREADABLE_ZIP, unreadZipEntry, zipEntry, zipEntryRefusal, zipView, } from "../../domain/desktop/zipView.js";
import { boundedDirectoryTail, scanZipDirectory, } from "../../domain/desktop/zipDirectory.js";
import { err, ok } from "../../domain/result.js";
/**
 * An archive as zip.js reads it: its entries in place, then a directory of the
 * kept records alone, so zip.js parses no more records than the view lists.
 * Reads are copies, as zip.js's own byte array reader returns.
 */
class BoundedArchiveReader extends Reader {
    #entries;
    #tail;
    constructor(entries, tail) {
        super(entries);
        this.#entries = entries;
        this.#tail = tail;
        this.size = entries.length + tail.length;
    }
    readUint8Array(index, length) {
        const end = Math.min(index + length, this.size);
        const split = this.#entries.length;
        const read = new Uint8Array(Math.max(0, end - index));
        if (index < split)
            read.set(this.#entries.subarray(index, Math.min(end, split)));
        if (end > split)
            read.set(this.#tail.subarray(Math.max(0, index - split), end - split), Math.max(0, split - index));
        return Promise.resolve(read);
    }
}
/** An entry's view, its bytes checked against its CRC-32 and declared size, which bounds them. */
const readEntry = async (entry, header, signal, policy) => {
    let bytes;
    try {
        bytes = await entry.getData(new Uint8ArrayWriter(), {
            checkSignature: true,
            ...(signal === undefined ? {} : { signal }),
        });
    }
    catch {
        assertArtifactReadActive(signal);
        return unreadZipEntry(header, DAMAGED_ZIP_ENTRY);
    }
    return zipEntry(header, bytes, policy);
};
/**
 * A zip archive's view, read from the digest-checked bytes in memory rather
 * than reopened from disk: file entries in archive order up to the listing
 * limit, each read by the state view's own readers within the entry and
 * archive budgets. Nothing is extracted and no archive inside is opened.
 */
export const readZipView = async (bytes, signal, policy = DESKTOP_VIEW_DEFAULTS) => {
    // The directory is scanned first, so zip.js sees only the records the view lists.
    const directory = scanZipDirectory(bytes, policy.zip_entries);
    if (directory === undefined)
        return err(UNREADABLE_ZIP);
    const reader = new ZipReader(new BoundedArchiveReader(bytes.subarray(0, directory.start), boundedDirectoryTail(directory)), ZIP_READER_OPTIONS);
    const entries = [];
    let spent = 0;
    try {
        for await (const entry of reader.getEntriesGenerator({
            decodeText: decodeZipEntryText,
        })) {
            assertArtifactReadActive(signal);
            if (entry.directory)
                continue;
            const name = zipEntryPath(entry);
            const header = {
                name,
                size: entry.uncompressedSize,
                compressedSize: entry.compressedSize,
                method: entry.compressionMethod,
                encrypted: entry.encrypted,
            };
            const refusal = zipEntryRefusal(header, spent, policy);
            if (refusal === undefined)
                spent += header.size;
            entries.push(refusal === undefined
                ? await readEntry(entry, header, signal, policy)
                : unreadZipEntry(header, refusal));
        }
    }
    catch {
        assertArtifactReadActive(signal);
        return err(UNREADABLE_ZIP);
    }
    finally {
        await reader.close();
    }
    return ok(zipView(entries, directory.count));
};
