import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { ArtifactReaderFailure, assertArtifactReadActive, init_ArtifactFileOperation, init_ArtifactPaths, init_ArtifactReader, init_resources, normalizeArtifactPath } from "./resources-B3P64jvH.js";
import { hasGodotPckHeader, init_godotPckFormat, readGodotPckTrailerFacts } from "./unityfsFormat-D0CcnmXe.js";

//#region dist/artifacts/ArtifactTraversalObservation.js
var declaredArtifactEntries, ArtifactTraversalObservation;
function init_ArtifactTraversalObservation() {
	return (init_ArtifactTraversalObservation = __esmMin((() => {
		init_unicodeCodePointOrder();
		init_resources();
		declaredArtifactEntries = (reader, signal, options) => {
			let declared = false;
			let end;
			const iterator = reader.entries(signal, {
				...options,
				onCoverage: (coverage) => {
					declared = true;
					options.onCoverage(coverage);
				}
			})[Symbol.asyncIterator]();
			const unknown = (limitation) => options.onCoverage({
				status: "unknown",
				limitations: [limitation]
			});
			return {
				[Symbol.asyncIterator]() {
					return this;
				},
				async next() {
					let next;
					try {
						next = await iterator.next();
					} catch (cause) {
						end ??= "failed";
						throw cause;
					}
					if (next.done !== true) return next;
					if (end === undefined) {
						end = "exhausted";
						if (!declared) unknown(`The ${reader.format} reader ended its traversal without declaring coverage; members it did not list are unknown.`);
					}
					return {
						done: true,
						value: undefined
					};
				},
				async return() {
					if (end === undefined) {
						end = "stopped";
						unknown(`The ${reader.format} traversal stopped before the reader finished; members after the last listed entry are unknown.`);
					}
					await iterator.return?.();
					return {
						done: true,
						value: undefined
					};
				}
			};
		};
		ArtifactTraversalObservation = class {
			#limitations = new Set();
			#unknown = false;
			/** Record coverage a reader declared or a consumer established itself. */
			record = (coverage) => {
				this.#unknown ||= coverage.status === "unknown";
				for (const limitation of coverage.limitations) this.#limitations.add(limitation);
			};
			/** Record an entry or subtree a traversal deliberately excluded. */
			omit = (omission) => {
				const path = normalizeArtifactPath(omission.path);
				this.#unknown = true;
				this.#limitations.add(`Artifact traversal omitted ${omission.kind} at ${JSON.stringify(path)}.`);
			};
			/** Iterate one reader traversal into this observation. */
			entries(reader, signal) {
				return declaredArtifactEntries(reader, signal, {
					onCoverage: this.record,
					onOmission: this.omit
				});
			}
			snapshot() {
				return {
					status: this.#unknown ? "unknown" : "complete",
					limitations: [...this.#limitations].sort(compareUnicodeCodePoints)
				};
			}
		};
	})))();
}

//#endregion
//#region dist/artifacts/ArtifactFileRange.js
var assertArtifactFileRange, readArtifactFileBytes;
function init_ArtifactFileRange() {
	return (init_ArtifactFileRange = __esmMin((() => {
		init_resources();
		assertArtifactFileRange = (position, length, end) => {
			if (!Number.isSafeInteger(end) || end < 0 || !Number.isSafeInteger(position) || !Number.isSafeInteger(length) || length < 0 || position < 0 || length > end - position) throw new ArtifactReaderFailure("format", "Artifact read exceeds its source range");
		};
		readArtifactFileBytes = async (handle, position, length, end, signal) => {
			assertArtifactFileRange(position, length, end);
			const buffer = Buffer.alloc(length);
			let consumed = 0;
			while (consumed < length) {
				assertArtifactReadActive(signal);
				const { bytesRead } = await handle.read(buffer, consumed, length - consumed, position + consumed);
				assertArtifactReadActive(signal);
				if (bytesRead === 0) throw new ArtifactReaderFailure("format", "Artifact source is truncated");
				consumed += bytesRead;
			}
			return buffer;
		};
	})))();
}

//#endregion
//#region dist/artifacts/GodotPckLocation.js
var observeEmbeddedGodotPck, locateGodotPck;
function init_GodotPckLocation() {
	return (init_GodotPckLocation = __esmMin((() => {
		init_godotPckFormat();
		init_ArtifactFileRange();
		init_resources();
		observeEmbeddedGodotPck = async (size, headerBytes, read) => {
			const trailer = await read(size - 12, 12, size);
			const declaration = readGodotPckTrailerFacts(trailer, size);
			if (declaration.state === "absent") return declaration;
			const { start, end, packBytes } = declaration;
			if (start === null || packBytes < BigInt(headerBytes)) return {
				state: "invalid-extent",
				declaration
			};
			const header = await read(start, headerBytes, end);
			if (!hasGodotPckHeader(header)) return {
				state: "header-mismatch",
				declaration
			};
			return {
				state: "located",
				declaration,
				start,
				header
			};
		};
		locateGodotPck = async (handle, size, signal, prefix) => {
			assertArtifactReadActive(signal);
			if (!Number.isSafeInteger(size) || size < 4) return undefined;
			const magic = prefix !== undefined && prefix.length >= 4 ? Buffer.from(prefix.buffer, prefix.byteOffset, 4) : await readArtifactFileBytes(handle, 0, 4, size, signal);
			if (hasGodotPckHeader(magic)) return {
				start: 0,
				end: size,
				embedded: false
			};
			if (size < 12) return undefined;
			const observation = await observeEmbeddedGodotPck(size, 4, (offset, bytes, end) => readArtifactFileBytes(handle, offset, bytes, end, signal));
			if (observation.state !== "located") return undefined;
			return {
				start: observation.start,
				end: observation.declaration.end,
				embedded: true
			};
		};
	})))();
}

//#endregion
export { ArtifactTraversalObservation, declaredArtifactEntries, init_ArtifactFileRange, init_ArtifactTraversalObservation, init_GodotPckLocation, locateGodotPck, observeEmbeddedGodotPck, readArtifactFileBytes };