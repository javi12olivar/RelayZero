import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, cancelledBy, carriedReason, decodeLimit, errorMessage, fixedAllowanceOptions, hostRangeErrorKind, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_fixedAllowanceRemediation, init_parseFailure, init_sha256Hex, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { init_parseFailureAnalysisError, parseLimitConstraint } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { cliCommandFor, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { APK_BLOCK_ID, ArtifactReaderFailure, ArtifactResourceScope, artifactFileCancellationCause, artifactFilePrimaryFacts, assertArtifactReadActive, bindArtifactFileCleanup, completedStableArtifactObservation, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_StableArtifactObservation, init_apkSigningBlock, init_readStableArtifact, init_resources, locateApkSigningBlock, parseZipTail, readStableArtifact, readerIntegrityFailure, stableArtifactInputFailure } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, ZIP_LOCAL_HEADER_SIGNATURE, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError, init_zipLocalHeader } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { ZIP_CENTRAL_HEADER, init_zipCentralHeader, init_zipPackageFormat, readZipCentralExtent, zipPackageFormatForPath } from "./canonicalOrdering-C7Yzy62j.js";
import { deliverWithService, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { boundedList, init_boundedList } from "./boundedList-D6JdQAuV.js";
import { APK_SIGNATURE_LIMITATIONS, apkSignatureMatchesSubject, apkSignatureResultSchema, apkSignatureUninterpretedBytes, deriveApkPosture, init_apkSignatureQuery, init_apkSignatureReport, inspectApkSignatureInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { init_AnalysisViewService, projectRetainedAnalysis, requireAnalysisViewRetention } from "./AnalysisViewService-D_M3W3PD.js";
import { createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { init_keyedCollection, keyedBy, uniqueKeyed } from "./keyedCollection-BoRfT2aE.js";
import { Asn1BerFailure, Asn1BerReader, decodeAsn1Oid, init_asn1Ber, init_asn1Oid } from "./asn1Ber-D2KDeg7K.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { APK_V1_MANIFEST_PATH, APK_V1_META_INF_PREFIX, init_apkV1MetadataName, isV1SignatureBlockName, isV1SignatureFileName, isV1SignatureMetadataName, startsWithV1MetaInfPrefix, v1SignatureFileNameForBlock } from "./apkV1MetadataName-BZeAKYtg.js";
import { INSPECT_APK_SIGNATURE_CONTRACT, init_apkSignatureToolContracts } from "./apkSignatureToolContracts-Dj4-VNg1.js";
import { X509Certificate, createHash } from "node:crypto";
import { inflateRawSync } from "node:zlib";

//#region dist/apkSignature/ApkSignatureRelease.js
var APK_SIGNATURE_PROVIDER_IDENTITY, APK_SIGNATURE_LIMITS;
function init_ApkSignatureRelease() {
	return (init_ApkSignatureRelease = __esmMin((() => {
		APK_SIGNATURE_PROVIDER_IDENTITY = {
			id: "apk-signature",
			name: "REA APK signature reader",
			version: null
		};
		APK_SIGNATURE_LIMITS = {
			/** Pending requests retain no APK bytes; process-wide scans are serialized. */
			waitingScans: 8,
			/**
			* Whole-APK bounded read; the content digest needs the whole file. Above
			* Play's 200 MB APK ceiling with headroom for sideloaded/system APKs.
			*/
			inputBytes: 512 * 1024 * 1024,
			/**
			* One v1 signature block (PKCS#7) after inflation. Real blocks hold a
			* certificate or a short chain (a few KiB); this bounds each inflation.
			*/
			v1BlockBytes: 1024 * 1024,
			/** Inline result ceiling, projected before materialising and re-checked exactly; refused, not truncated. */
			outputBytes: 8 * 1024 * 1024
		};
	})))();
}

//#endregion
//#region dist/application/apkSignature/ApkSignatureService.js
var OPERATION$3, ApkSignatureService;
function init_ApkSignatureService() {
	return (init_ApkSignatureService = __esmMin((() => {
		init_apkSignatureQuery();
		init_AnalysisViewService();
		init_analysisErrorCore();
		init_apkSignatureReport();
		init_analysisObservation();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		OPERATION$3 = "inspect_apk_signature";
		ApkSignatureService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close();
			}
			/** Preserve exact selected artifact identity and the decoded signing facts. */
			async inspect(rawInput, options, retention = {
				evidenceById: undefined,
				recordEvidence: undefined
			}) {
				const input = parseAnalysisInput(OPERATION$3, rawInput, inspectApkSignatureInputSchema, options?.signal);
				if (!input.ok) return input;
				const { detail, view, ...parameters } = input.value;
				if (detail === "summary") {
					const ready = requireAnalysisViewRetention(OPERATION$3, retention);
					if (!ready.ok) return ready;
				}
				const inspected = await this.provider.inspect(parameters, options);
				if (!inspected.ok) return inspected;
				const execution = inspected.value;
				const report = apkSignatureResultSchema.safeParse(execution.result);
				if (!report.success || report.data.artifact.path !== input.value.path || execution.subject.path !== input.value.path || !apkSignatureMatchesSubject(report.data.artifact, execution.subject)) return err(new AnalysisOutputError(OPERATION$3, "APK signature reader returned malformed data or changed the selected artifact identity."));
				const completed = completeProviderEvidence(createAnalysisExecutionEvidence(OPERATION$3, { path: input.value.path }, {
					...execution,
					result: report.data
				}, "observed"), options?.signal);
				if (!completed.ok) return completed;
				return detail === "summary" ? projectRetainedAnalysis(completed.value, retention, view === undefined ? { kind: "summary" } : {
					kind: "apk-signature",
					...view
				}) : completed;
			}
		};
	})))();
}

//#endregion
//#region dist/apkSignature/ApkSignatureAdmission.js
var OPERATION$2, ApkSignatureAdmission, apkSignatureAdmission;
function init_ApkSignatureAdmission() {
	return (init_ApkSignatureAdmission = __esmMin((() => {
		init_analysisErrorCore();
		init_ApkSignatureRelease();
		OPERATION$2 = "inspect_apk_signature";
		ApkSignatureAdmission = class {
			#active = false;
			#waiting = [];
			acquire(signal) {
				if (signal?.aborted) return Promise.reject(cancelledBy(OPERATION$2, signal));
				if (!this.#active) {
					this.#active = true;
					return Promise.resolve(this.#release());
				}
				if (this.#waiting.length >= APK_SIGNATURE_LIMITS.waitingScans) return Promise.reject(new AnalysisResourceConstraintError(OPERATION$2, "capacity", "The process-wide APK inspection queue is full; retry after an active scan finishes.", {
					max_active_scans: 1,
					max_waiting_scans: APK_SIGNATURE_LIMITS.waitingScans
				}, { measuredExhaustion: true }));
				return new Promise((resolve, reject) => {
					const grant = () => {
						signal?.removeEventListener("abort", onAbort);
						resolve(this.#release());
					};
					const onAbort = () => {
						const index = this.#waiting.indexOf(grant);
						if (index !== -1) this.#waiting.splice(index, 1);
						reject(cancelledBy(OPERATION$2, carriedReason(signal?.reason)));
					};
					signal?.addEventListener("abort", onAbort, { once: true });
					this.#waiting.push(grant);
				});
			}
			#release() {
				let released = false;
				return () => {
					if (released) return;
					released = true;
					const grant = this.#waiting.shift();
					if (grant === undefined) this.#active = false;
					else grant();
				};
			}
		};
		apkSignatureAdmission = new ApkSignatureAdmission();
	})))();
}

//#endregion
//#region dist/domain/apkSignature/apkSignatureSchemes.js
var PROOF_OF_ROTATION_ATTR_ID, MAX_ELEMENTS, MAX_SIGNERS, MAX_LINEAGE_NODES, LINEAGE_VERSION, LeReader, malformed$1, schemeLimit, elements, decodeAlgorithmRecords, decodeAttributes, decodeSignedData, decodeSigner, decodeSigners, decodeRotationLineage, decodeSourceStampCertificate, contentDigestAlgorithm;
function init_apkSignatureSchemes() {
	return (init_apkSignatureSchemes = __esmMin((() => {
		init_binaryContainer();
		init_parseFailure();
		init_result();
		PROOF_OF_ROTATION_ATTR_ID = 1000370060;
		MAX_ELEMENTS = 4096;
		MAX_SIGNERS = 32;
		MAX_LINEAGE_NODES = 32;
		LINEAGE_VERSION = 1;
		LeReader = class {
			bytes;
			offset = 0;
			reader;
			constructor(bytes) {
				this.bytes = bytes;
				this.reader = new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), true, "apk");
			}
			get remaining() {
				return this.bytes.length - this.offset;
			}
			u32() {
				if (this.remaining < 4) return null;
				const v = this.reader.u32(this.offset);
				this.offset += 4;
				return v;
			}
			/** A uint32-length-prefixed chunk; returns a view over its bytes, or null if oob. */
			lenChunk() {
				const length = this.u32();
				if (length === null || length > this.remaining) return null;
				const start = this.offset;
				this.offset += length;
				return this.bytes.subarray(start, start + length);
			}
		};
		malformed$1 = (detail) => err({
			kind: "malformed-signer",
			detail
		});
		schemeLimit = (version, name, maximum) => err(decodeLimit("apk-signature-scheme", `APK Signature Scheme ${version} holds more ${name} than the ${String(maximum)} limit.`, {
			name,
			maximum
		}));
		elements = (seq, what, version, limit = MAX_ELEMENTS) => {
			if (seq === null) return malformed$1(`${what} sequence missing or truncated`);
			const reader = new LeReader(seq);
			const out = [];
			while (reader.remaining > 0) {
				const el = reader.lenChunk();
				if (el === null) return malformed$1(`${what} element truncated`);
				if (out.length >= limit) return schemeLimit(version, what, limit);
				out.push(el);
			}
			return ok(out);
		};
		decodeAlgorithmRecords = (seq, what, version, record) => {
			const items = elements(seq, what, version);
			if (!items.ok) return items;
			const records = [];
			for (const item of items.value) {
				const reader = new LeReader(item);
				const algorithmId = reader.u32();
				const bytes = reader.lenChunk();
				if (algorithmId === null || bytes === null) return malformed$1(`${what} entry truncated`);
				records.push(record(algorithmId, bytes, reader.remaining));
			}
			return ok(records);
		};
		decodeAttributes = (seq, version) => {
			const items = elements(seq, "attributes", version);
			if (!items.ok) return items;
			const attributes = [];
			for (const item of items.value) {
				const id = new LeReader(item).u32();
				if (id === null) return malformed$1("attribute id truncated");
				attributes.push({
					id,
					value: item.subarray(4)
				});
			}
			return ok(attributes);
		};
		decodeSignedData = (signedData, version) => {
			const reader = new LeReader(signedData);
			const digests = decodeAlgorithmRecords(reader.lenChunk(), "digests", version, (algorithmId, digest, uninterpretedBytes) => ({
				algorithmId,
				digest,
				uninterpretedBytes
			}));
			if (!digests.ok) return digests;
			const certificates = elements(reader.lenChunk(), "certificates", version);
			if (!certificates.ok) return certificates;
			let minSdk = null;
			let maxSdk = null;
			if (version !== "v2") {
				minSdk = reader.u32();
				maxSdk = reader.u32();
				if (minSdk === null || maxSdk === null) return malformed$1("min/max SDK truncated");
			}
			const attributes = decodeAttributes(reader.lenChunk(), version);
			if (!attributes.ok) return attributes;
			return ok({
				certificates: certificates.value,
				digests: digests.value,
				minSdk,
				maxSdk,
				attributes: attributes.value,
				uninterpretedSignedDataBytes: reader.remaining
			});
		};
		decodeSigner = (chunk, version) => {
			const reader = new LeReader(chunk);
			const signedData = reader.lenChunk();
			if (signedData === null) return malformed$1("signed data missing or truncated");
			const decoded = decodeSignedData(signedData, version);
			if (!decoded.ok) return decoded;
			if (version !== "v2") {
				const min = reader.u32(), max = reader.u32();
				if (min === null || max === null) return malformed$1("outer min/max SDK truncated");
				if (min !== decoded.value.minSdk || max !== decoded.value.maxSdk) return malformed$1("outer SDK range disagrees with the signed SDK range");
			}
			const signatures = decodeAlgorithmRecords(reader.lenChunk(), "signatures", version, (algorithmId, signature, uninterpretedBytes) => ({
				algorithmId,
				signature,
				uninterpretedBytes
			}));
			if (!signatures.ok) return signatures;
			const publicKey = reader.lenChunk();
			if (publicKey === null) return malformed$1("public key truncated");
			return ok({
				...decoded.value,
				signatures: signatures.value,
				publicKey,
				uninterpretedSignerBytes: reader.remaining
			});
		};
		decodeSigners = (value, version) => {
			const reader = new LeReader(value);
			const chunks = elements(reader.lenChunk(), "signers", version, MAX_SIGNERS);
			if (!chunks.ok) return chunks;
			const signers = [];
			for (const [index, chunk] of chunks.value.entries()) {
				const signer = decodeSigner(chunk, version);
				if (!signer.ok) return signer.error.kind === "malformed-signer" ? malformed$1(`signer ${String(index)}: ${signer.error.detail}`) : signer;
				signers.push(signer.value);
			}
			return ok({
				signers,
				uninterpretedBytes: reader.remaining
			});
		};
		decodeRotationLineage = (value, version) => {
			const reader = new LeReader(value);
			const lineageVersion = reader.u32();
			if (lineageVersion === null) return malformed$1("lineage version missing");
			if (lineageVersion !== LINEAGE_VERSION) return malformed$1(`unsupported lineage version ${String(lineageVersion)}`);
			const nodes = [];
			while (reader.remaining > 0) {
				const node = reader.lenChunk();
				if (node === null) return malformed$1("lineage node truncated");
				if (nodes.length >= MAX_LINEAGE_NODES) return schemeLimit(version, "lineage-nodes", MAX_LINEAGE_NODES);
				const nodeReader = new LeReader(node);
				const signedData = nodeReader.lenChunk();
				const flags = nodeReader.u32();
				if (signedData === null || flags === null) return malformed$1("lineage node malformed");
				const signedReader = new LeReader(signedData);
				const certificate = signedReader.lenChunk();
				if (certificate === null) return malformed$1("lineage certificate missing");
				if (signedReader.u32() === null) return malformed$1("lineage signed algorithm missing or truncated");
				if (nodeReader.u32() === null || nodeReader.lenChunk() === null) return malformed$1("lineage algorithm or signature missing or truncated");
				nodes.push({
					certificate,
					flags
				});
			}
			return ok(nodes);
		};
		decodeSourceStampCertificate = (value) => {
			const stampData = new LeReader(value).lenChunk();
			if (stampData === null) return malformed$1("source stamp data truncated");
			const certificate = new LeReader(stampData).lenChunk();
			if (certificate === null || certificate.length === 0) return malformed$1("source stamp certificate missing");
			return ok(certificate);
		};
		contentDigestAlgorithm = (algorithmId) => {
			switch (algorithmId) {
				case 257:
				case 259:
				case 513:
				case 769: return "sha256";
				case 258:
				case 260:
				case 514: return "sha512";
				case 1057:
				case 1059:
				case 1061: return "verity-sha256";
				default: return null;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/apkSignature/apkContentDigest.js
var CHUNK_SIZE, EOCD_CD_OFFSET_FIELD, u32le, computeApkContentDigest;
function init_apkContentDigest() {
	return (init_apkContentDigest = __esmMin((() => {
		CHUNK_SIZE = 1024 * 1024;
		EOCD_CD_OFFSET_FIELD = 16;
		u32le = (value) => {
			const out = new Uint8Array(4);
			new DataView(out.buffer).setUint32(0, value, true);
			return out;
		};
		computeApkContentDigest = (bytes, layout, createHash) => {
			const { tail, blockStart, algorithm } = layout;
			const { centralDirectoryOffset, centralDirectorySize, eocdOffset } = tail;
			if (blockStart < 0 || blockStart > centralDirectoryOffset || centralDirectoryOffset + centralDirectorySize !== eocdOffset || eocdOffset + 22 > bytes.length) return null;
			const eocd = Uint8Array.from(bytes.subarray(eocdOffset));
			new DataView(eocd.buffer, eocd.byteOffset, eocd.byteLength).setUint32(EOCD_CD_OFFSET_FIELD, blockStart, true);
			const sections = [
				bytes.subarray(0, blockStart),
				bytes.subarray(centralDirectoryOffset, eocdOffset),
				eocd
			];
			const chunkDigests = [];
			for (const section of sections) for (let offset = 0; offset < section.length; offset += CHUNK_SIZE) {
				const chunk = section.subarray(offset, Math.min(offset + CHUNK_SIZE, section.length));
				const hash = createHash(algorithm);
				hash.update(Uint8Array.of(165));
				hash.update(u32le(chunk.length));
				hash.update(chunk);
				chunkDigests.push(hash.digest());
			}
			const top = createHash(algorithm);
			top.update(Uint8Array.of(90));
			top.update(u32le(chunkDigests.length));
			for (const digest of chunkDigests) top.update(digest);
			return top.digest();
		};
	})))();
}

//#endregion
//#region dist/domain/apkSignature/zipEntryName.js
var NAME_DECODER, REPLACEMENT, isContinuation, isLoneInvalid, nextUnit, isCanonicalZipName, FNV_OFFSET, FNV_PRIME, canonicalNameHash, unitByte, compareCanonicalNames, decodeZipName, whole, sameZipName;
function init_zipEntryName() {
	return (init_zipEntryName = __esmMin((() => {
		NAME_DECODER = new TextDecoder("utf-8", {
			fatal: false,
			ignoreBOM: true
		});
		REPLACEMENT = [
			239,
			191,
			189
		];
		isContinuation = (b) => (b & 192) === 128;
		isLoneInvalid = (b) => b >= 128 && (b < 194 || b > 244);
		nextUnit = (bytes, i, stop) => {
			const b1 = bytes[i] ?? 0;
			if (b1 < 128) return 1;
			if (isLoneInvalid(b1)) return -1;
			const remaining = stop - i;
			const b2 = remaining > 1 ? bytes[i + 1] ?? 0 : 0;
			const b3 = remaining > 2 ? bytes[i + 2] ?? 0 : 0;
			if (b1 >= 194 && b1 <= 223) return remaining > 1 && isContinuation(b2) ? 2 : -1;
			if ((b1 & 240) === 224) {
				const badSecond = b1 === 224 && (b2 & 224) === 128 || !isContinuation(b2);
				if (remaining > 2) {
					if (badSecond) return -1;
					if (!isContinuation(b3)) return -2;
					return b1 === 237 && b2 >= 160 ? -3 : 3;
				}
				return remaining === 2 && badSecond ? -1 : -remaining;
			}
			if (b1 >= 240 && b1 <= 247) {
				if (remaining === 1) return -1;
				const badSecond = b1 > 244 || b1 === 240 && (b2 < 144 || b2 > 191) || b1 === 244 && (b2 & 240) !== 128 || !isContinuation(b2);
				if (badSecond) return -1;
				if (remaining > 3) {
					if (!isContinuation(b3)) return -2;
					return isContinuation(bytes[i + 3] ?? 0) ? 4 : -3;
				}
				return remaining === 3 && !isContinuation(b3) ? -2 : -remaining;
			}
			return -1;
		};
		isCanonicalZipName = (bytes, start, stop) => {
			for (let i = start; i < stop;) {
				const unit = nextUnit(bytes, i, stop);
				if (unit < 0) return false;
				i += unit;
			}
			return true;
		};
		FNV_OFFSET = 2166136261;
		FNV_PRIME = 16777619;
		canonicalNameHash = (bytes, start, stop, canonical) => {
			let hash = FNV_OFFSET;
			if (canonical) {
				for (let k = start; k < stop; k += 1) hash = Math.imul(hash ^ (bytes[k] ?? 0), FNV_PRIME);
				return hash;
			}
			for (let i = start; i < stop;) {
				const unit = nextUnit(bytes, i, stop);
				if (unit > 0) for (let k = i; k < i + unit; k += 1) hash = Math.imul(hash ^ (bytes[k] ?? 0), FNV_PRIME);
				else {
					hash = Math.imul(hash ^ 239, FNV_PRIME);
					hash = Math.imul(hash ^ 191, FNV_PRIME);
					hash = Math.imul(hash ^ 189, FNV_PRIME);
				}
				i += Math.abs(unit);
			}
			return hash;
		};
		unitByte = (bytes, i, unit, k) => {
			if (unit < 0) return REPLACEMENT[k] ?? -1;
			return k < unit ? bytes[i + k] ?? 0 : -1;
		};
		compareCanonicalNames = (a, b) => {
			let i = a.start;
			let j = b.start;
			while (i < a.stop && j < b.stop) {
				const x = a.bytes[i] ?? 0;
				const y = b.bytes[j] ?? 0;
				if (x === y && x < 128 || isLoneInvalid(x) && isLoneInvalid(y)) {
					i += 1;
					j += 1;
					continue;
				}
				const u = nextUnit(a.bytes, i, a.stop);
				const v = nextUnit(b.bytes, j, b.stop);
				if (u > 0 || v > 0) for (let k = 0; k < 4; k += 1) {
					const p = unitByte(a.bytes, i, u, k);
					const q = unitByte(b.bytes, j, v, k);
					if (p !== q) return p - q;
					if (p < 0) break;
				}
				i += Math.abs(u);
				j += Math.abs(v);
			}
			return (i < a.stop ? 1 : 0) - (j < b.stop ? 1 : 0);
		};
		decodeZipName = (raw) => {
			if (isCanonicalZipName(raw, 0, raw.length)) return NAME_DECODER.decode(raw);
			let length = 0;
			for (let i = 0; i < raw.length;) {
				const unit = nextUnit(raw, i, raw.length);
				length += unit > 0 ? unit : REPLACEMENT.length;
				i += Math.abs(unit);
			}
			const canonical = new Uint8Array(length);
			let at = 0;
			for (let i = 0; i < raw.length;) {
				const unit = nextUnit(raw, i, raw.length);
				if (unit > 0) canonical.set(raw.subarray(i, i + unit), at);
				else canonical.set(REPLACEMENT, at);
				at += unit > 0 ? unit : REPLACEMENT.length;
				i += Math.abs(unit);
			}
			return NAME_DECODER.decode(canonical);
		};
		whole = (bytes) => ({
			bytes,
			start: 0,
			stop: bytes.length
		});
		sameZipName = (a, b) => compareCanonicalNames(whole(a), whole(b)) === 0;
	})))();
}

//#endregion
//#region dist/domain/apkSignature/apkV1Signature.js
var MAX_V1_SIGNATURE_ENTRIES, MAX_V1_SIGNERS, MAX_DUPLICATE_NAME_SAMPLE, compareStoredNames, INDEX_BITS, duplicateNames, centralDirectoryV1SignatureEntries, detectV1Signature, ZIP64_SENTINEL, FLAG_ENCRYPTED, FLAG_DATA_DESCRIPTOR, centralDeclaresEncryption, localEntryData;
function init_apkV1Signature() {
	return (init_apkV1Signature = __esmMin((() => {
		init_boundedList();
		init_binaryContainer();
		init_parseFailure();
		init_result();
		init_zipCentralHeader();
		init_zipLocalHeader();
		init_zipEntryName();
		init_apkV1MetadataName();
		MAX_V1_SIGNATURE_ENTRIES = 4096;
		MAX_V1_SIGNERS = 32;
		MAX_DUPLICATE_NAME_SAMPLE = 5;
		compareStoredNames = (bytes, starts, lengths, a, b) => {
			const as = starts[a] ?? 0;
			const bs = starts[b] ?? 0;
			const al = lengths[a] ?? 0;
			const bl = lengths[b] ?? 0;
			for (let k = 0; k < Math.min(al, bl); k += 1) {
				const d = (bytes[as + k] ?? 0) - (bytes[bs + k] ?? 0);
				if (d !== 0) return d;
			}
			return al - bl;
		};
		INDEX_BITS = 2 ** 24;
		duplicateNames = (bytes, starts, lengths, count, apksigRecords) => {
			const wellFormed = new Uint8Array(count);
			const keys = new Float64Array(count);
			for (let i = 0; i < count; i += 1) {
				const start = starts[i] ?? 0;
				const stop = start + (lengths[i] ?? 0);
				const canonical = isCanonicalZipName(bytes, start, stop);
				wellFormed[i] = canonical ? 1 : 0;
				const hash = canonicalNameHash(bytes, start, stop, canonical);
				keys[i] = (hash >>> 3) * INDEX_BITS + i;
			}
			keys.sort();
			const stored = (i) => {
				const start = starts[i] ?? 0;
				return {
					bytes,
					start,
					stop: start + (lengths[i] ?? 0)
				};
			};
			const compare = (a, b) => wellFormed[a] === 1 && wellFormed[b] === 1 ? compareStoredNames(bytes, starts, lengths, a, b) : compareCanonicalNames(stored(a), stored(b));
			const seen = [];
			const unread = [];
			for (let run = 0; run < count;) {
				const hash = Math.floor((keys[run] ?? 0) / INDEX_BITS);
				let stop = run + 1;
				while (stop < count && Math.floor((keys[stop] ?? 0) / INDEX_BITS) === hash) stop += 1;
				if (stop - run > 1) {
					const group = Array.from(keys.subarray(run, stop), (key) => key % INDEX_BITS).sort((a, b) => compare(a, b) || a - b);
					let previousSame = false;
					for (let k = 1; k < group.length; k += 1) {
						const first = group[k - 1] ?? 0;
						const second = group[k] ?? 0;
						const same = compare(first, second) === 0;
						if (same && !previousSame) (second < apksigRecords ? seen : unread).push(first);
						previousSame = same;
					}
				}
				run = stop;
			}
			const sampled = (firsts) => {
				firsts.sort((a, b) => a - b);
				const { items, omitted } = boundedList(firsts, MAX_DUPLICATE_NAME_SAMPLE);
				return {
					count: items.length + omitted,
					sample: items.map((i) => {
						const start = starts[i] ?? 0;
						const storedBytes = lengths[i] ?? 0;
						return {
							name: decodeZipName(bytes.subarray(start, start + storedBytes)),
							storedBytes
						};
					})
				};
			};
			return {
				...sampled(seen),
				records: count,
				apksigRecords: Math.min(apksigRecords, count),
				unread: sampled(unread)
			};
		};
		centralDirectoryV1SignatureEntries = (bytes, centralDirectoryOffset, centralDirectorySize, totalEntries, apksigRecords = totalEntries) => {
			const end = centralDirectoryOffset + centralDirectorySize;
			if (!Number.isSafeInteger(end) || centralDirectoryOffset < 0 || centralDirectorySize < 0 || end > bytes.length) return err({
				kind: "malformed-central-directory",
				offset: centralDirectoryOffset,
				detail: "declared central-directory extent is outside the file"
			});
			const reader = new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), true, "zip");
			const capacity = Math.min(totalEntries, Math.max(0, Math.floor((end - centralDirectoryOffset) / ZIP_CENTRAL_HEADER.bytes)));
			const starts = new Uint32Array(capacity);
			const lengths = new Uint16Array(capacity);
			const entries = [];
			let at = centralDirectoryOffset;
			for (let i = 0; i < totalEntries; i += 1) {
				const extent = readZipCentralExtent(reader, at, end);
				if (!extent.ok) {
					const { kind, offset } = extent.error;
					const detail = {
						"fixed-fields": `central directory ends after ${String(i)} of ${String(totalEntries)} records`,
						signature: "central-directory record signature mismatch",
						name: "central-directory file name runs past the directory",
						"extra-or-comment": "central-directory extra field or comment runs past the directory"
					}[kind];
					return err({
						kind: "malformed-central-directory",
						offset,
						detail
					});
				}
				const { name: nameStart, extra, next } = extent.value;
				const nameLength = extra - nameStart;
				starts[i] = nameStart;
				lengths[i] = nameLength;
				if (startsWithV1MetaInfPrefix(bytes, nameStart, nameLength)) {
					const rawName = bytes.subarray(nameStart, nameStart + nameLength);
					const name = decodeZipName(rawName);
					if (isV1SignatureMetadataName(name)) {
						if (entries.length >= MAX_V1_SIGNATURE_ENTRIES) return err(decodeLimit("apk-v1-central-directory", `The central directory holds more than ${String(MAX_V1_SIGNATURE_ENTRIES)} META-INF v1 signing entries.`, {
							name: "max_v1_signature_entries",
							maximum: MAX_V1_SIGNATURE_ENTRIES
						}, { offset: at }));
						entries.push({
							name,
							rawName,
							flags: reader.u16(at + 8),
							method: reader.u16(at + 10),
							crc32: reader.u32(at + 16),
							compressedSize: reader.u32(at + 20),
							uncompressedSize: reader.u32(at + 24),
							localHeaderOffset: reader.u32(at + ZIP_CENTRAL_HEADER.localHeaderOffset)
						});
					}
				}
				at = next;
			}
			if (at !== end) return err({
				kind: "malformed-central-directory",
				offset: at,
				detail: `${String(end - at)} bytes of the declared central directory remain after ${String(totalEntries)} records`
			});
			return ok({
				entries,
				duplicates: duplicateNames(bytes, starts, lengths, capacity, apksigRecords)
			});
		};
		detectV1Signature = (entries) => {
			const selected = entries.filter((entry) => entry.name.startsWith(APK_V1_META_INF_PREFIX));
			const seen = new Set();
			const duplicates = new Set();
			for (const { name } of selected) if (seen.has(name)) duplicates.add(name);
			else seen.add(name);
			const signatureFiles = selected.map((entry) => entry.name).filter(isV1SignatureFileName);
			const blocks = selected.filter((entry) => isV1SignatureBlockName(entry.name));
			const sfNames = new Set(signatureFiles);
			const paired = new Set();
			const signers = blocks.flatMap((block) => {
				const signatureFile = v1SignatureFileNameForBlock(block.name);
				if (!sfNames.has(signatureFile) || paired.has(block.name)) return [];
				paired.add(block.name);
				const duplicate = [
					block.name,
					signatureFile,
					APK_V1_MANIFEST_PATH
				].find((name) => duplicates.has(name)) ?? null;
				return [{
					signatureFile,
					block,
					duplicate
				}];
			});
			return {
				present: signers.length > 0,
				hasManifest: selected.some((entry) => entry.name === APK_V1_MANIFEST_PATH),
				signatureFiles,
				blockFiles: blocks.map((block) => block.name),
				signers
			};
		};
		ZIP64_SENTINEL = 4294967295;
		FLAG_ENCRYPTED = 1;
		FLAG_DATA_DESCRIPTOR = 8;
		centralDeclaresEncryption = (entry) => (entry.flags & FLAG_ENCRYPTED) !== 0;
		localEntryData = (bytes, entry, entriesEnd) => {
			if (entry.compressedSize === ZIP64_SENTINEL || entry.uncompressedSize === ZIP64_SENTINEL || entry.localHeaderOffset === ZIP64_SENTINEL) return err({ detail: "Zip64 entry sizes are not read" });
			const at = entry.localHeaderOffset;
			const limit = Math.min(entriesEnd, bytes.length);
			if (at + 30 > limit) return err({ detail: `local header at byte ${String(at)} is out of range` });
			const reader = new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), true, "zip");
			if (reader.u32(at) !== 67324752) return err({ detail: `local header signature mismatch at byte ${String(at)}` });
			const flags = reader.u16(at + 6);
			const descriptor = (flags & FLAG_DATA_DESCRIPTOR) !== 0;
			if (descriptor !== ((entry.flags & FLAG_DATA_DESCRIPTOR) !== 0)) return err({ detail: "local header and central directory disagree on the data-descriptor flag" });
			if (!descriptor) for (const [field, offset, expected] of [
				[
					"CRC-32",
					14,
					entry.crc32
				],
				[
					"compressed size",
					18,
					entry.compressedSize
				],
				[
					"uncompressed size",
					22,
					entry.uncompressedSize
				]
			]) {
				const local = reader.u32(at + offset);
				if (local !== expected) return err({ detail: `local header ${field} ${String(local)} differs from the central directory's ${String(expected)}` });
			}
			const nameLength = reader.u16(at + 26);
			const nameStart = at + 30;
			if (nameStart + nameLength > limit || nameLength > entry.rawName.length || !sameZipName(bytes.subarray(nameStart, nameStart + nameLength), entry.rawName)) return err({ detail: "local header name differs from the central directory's" });
			const start = nameStart + nameLength + reader.u16(at + 28);
			const end = start + entry.compressedSize;
			if (end > limit) return err({ detail: `entry data at byte ${String(start)} runs past the entries` });
			return ok({
				data: bytes.subarray(start, end),
				declaresEncryption: ((entry.flags | flags) & FLAG_ENCRYPTED) !== 0
			});
		};
	})))();
}

//#endregion
//#region dist/apkSignature/apkSignatureFailures.js
var OPERATION$1, inputError, mapApkBlockError, mapApkSchemeError, mapCentralDirectoryError, v1SignerCapacityError, apkOutputBudgetError, apkSignatureFailure, primaryFailure, artifactReaderFailure, adapterFailure;
function init_apkSignatureFailures() {
	return (init_apkSignatureFailures = __esmMin((() => {
		init_fixedAllowanceRemediation();
		init_resources();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_parseFailureAnalysisError();
		init_providerAdapterError();
		init_ApkSignatureRelease();
		init_errorMessage();
		OPERATION$1 = "inspect_apk_signature";
		inputError = (message) => new AnalysisInputError(OPERATION$1, undefined, [{
			path: ["path"],
			reason: "invalid_value",
			message
		}]);
		mapApkBlockError = (error, path) => {
			switch (error.kind) {
				case "not-a-zip": return new AnalysisUnsupportedTargetError(OPERATION$1, path, `The selected file is not a ZIP/APK (${error.detail}).`, { remediationAction: "Select a local .apk/.zip/.aab archive." });
				case "zip64-unsupported": return new AnalysisUnsupportedTargetError(OPERATION$1, path, `This archive uses a Zip64 structure this reader does not decode (${error.detail}).`);
				case "multi-disk-unsupported": return new AnalysisUnsupportedTargetError(OPERATION$1, path, `The selected archive declares an unsupported multi-disk ZIP layout (${error.detail}).`, { remediationAction: "Select a complete single-disk APK/ZIP archive." });
				case "malformed-zip": return inputError(`Damaged ZIP/APK at byte ${String(error.offset)}: ${error.detail}.`);
				case "malformed-block": return inputError(`Malformed APK Signing Block at byte ${String(error.offset)}: ${error.detail}.`);
				case "limit": {
					const { name, maximum } = error.failure.limit;
					return parseLimitConstraint(OPERATION$1, "capacity", error, {
						legacyMaximumKey: name,
						...fixedAllowanceOptions(`The APK Signing Block allowance of ${String(maximum)} pairs (this release has no runtime override)`, "count")
					});
				}
			}
		};
		mapApkSchemeError = (error, scheme) => {
			if (error.kind === "malformed-signer") return inputError(`Malformed APK Signature Scheme ${scheme} block: ${error.detail}.`);
			const { name, maximum } = error.failure.limit;
			return parseLimitConstraint(OPERATION$1, "capacity", error, {
				legacyMaximumKey: `max_${name.replace(/-/g, "_")}`,
				...fixedAllowanceOptions(`The APK Signature Scheme ${scheme} allowance of ${String(maximum)} ${name} (this release has no runtime override)`, "count")
			});
		};
		mapCentralDirectoryError = (error) => {
			if (error.kind !== "limit") return inputError(`Malformed ZIP central directory at byte ${String(error.offset)}: ${error.detail}.`);
			const { name, maximum } = error.failure.limit;
			return parseLimitConstraint(OPERATION$1, "capacity", error, {
				legacyMaximumKey: name,
				...fixedAllowanceOptions(`The APK v1 allowance of ${String(maximum)} META-INF signing entries (this release has no runtime override)`, "count")
			});
		};
		v1SignerCapacityError = (limit) => new AnalysisResourceConstraintError(OPERATION$1, "capacity", `The archive pairs more than ${String(limit)} v1 signature blocks with .SF files.`, { max_v1_signers: limit }, fixedAllowanceOptions(`The APK v1 allowance of ${String(limit)} signers (this release has no runtime override)`, "count"));
		apkOutputBudgetError = (projectedBytes) => new AnalysisResourceConstraintError(OPERATION$1, "capacity", `The decoded signing report (${String(projectedBytes)} bytes) exceeds the ${String(APK_SIGNATURE_LIMITS.outputBytes)}-byte output budget.`, { max_output_bytes: APK_SIGNATURE_LIMITS.outputBytes }, fixedAllowanceOptions("The decoded APK signing report allowance", "report", {
			limit: APK_SIGNATURE_LIMITS.outputBytes,
			unit: "bytes"
		}));
		apkSignatureFailure = (cause, path) => {
			const primary = primaryFailure(artifactFilePrimaryFacts(cause), path);
			const observation = completedStableArtifactObservation(cause, path);
			if (observation !== undefined) primary.retainPartialObservation(observation);
			if (!(cause instanceof ArtifactReaderFailure) || cause.cleanup === undefined) return primary;
			const cleanup = new ProviderCleanupError(APK_SIGNATURE_PROVIDER_IDENTITY.id, cause.cleanup.resources, { reason: cause.cleanup.reason }, {
				cause,
				operation: OPERATION$1
			});
			const error = analysisErrorWithCleanupFailure(primary, cleanup, OPERATION$1);
			bindArtifactFileCleanup(cause, error);
			return error;
		};
		primaryFailure = (facts, path) => {
			const { cause, origin } = facts;
			if (origin === "owned-or-classified" && cause instanceof AnalysisError) return cause;
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure) return artifactReaderFailure(cause, path);
			if (cause instanceof Error && "code" in cause) {
				if (cause.code === "EACCES" || cause.code === "EPERM") return new AnalysisAccessDeniedError(OPERATION$1, path, cause.code, { cause });
				if ([
					"ENOENT",
					"ENOTDIR",
					"ELOOP",
					"ENAMETOOLONG"
				].includes(String(cause.code))) return new AnalysisInputError(OPERATION$1, { cause }, [{
					path: ["path"],
					reason: "invalid_value",
					message: `No regular file can be read at the selected path (${String(cause.code)}): ${path}.`
				}]);
			}
			return adapterFailure(cause, path);
		};
		artifactReaderFailure = (cause, path) => {
			switch (cause.reason) {
				case "integrity": return readerIntegrityFailure(OPERATION$1, path, cause);
				case "cancelled": return cancelledBy(OPERATION$1, carriedReason(artifactFileCancellationCause(cause)));
				case "limit": return new AnalysisResourceConstraintError(OPERATION$1, "file-size", cause.message, { max_input_bytes: APK_SIGNATURE_LIMITS.inputBytes }, {
					cause,
					remediationAction: "The size budget is fixed; select a smaller archive."
				});
				case "path": return stableArtifactInputFailure(cause, OPERATION$1);
				default: return adapterFailure(cause, path);
			}
		};
		adapterFailure = (cause, path) => new ProviderAdapterError(APK_SIGNATURE_PROVIDER_IDENTITY.id, OPERATION$1, {
			cause,
			diagnostics: {
				path,
				reason: errorMessage(cause)
			}
		});
	})))();
}

//#endregion
//#region dist/apkSignature/apkCertificateFacts.js
/**
* The one owner of certificate facts for every APK signing scheme (v1, v2,
* v3/v3.1, lineage nodes and source stamps): identity is SHA-256 over the raw
* embedded DER, and the readable X.509 facts come from the platform parser.
*/
var attempt, certificateFacts, DN_EXPANSION, certificateBytes, certificateSummaryBytes, jsonStringBytes;
function init_apkCertificateFacts() {
	return (init_apkCertificateFacts = __esmMin((() => {
		init_sha256Hex();
		attempt = (read) => {
			try {
				return read();
			} catch {
				return null;
			}
		};
		certificateFacts = (der) => {
			const cert = attempt(() => {
				const pem = `-----BEGIN CERTIFICATE-----\n${Buffer.from(der).toString("base64")}\n-----END CERTIFICATE-----\n`;
				const parsed = new X509Certificate(pem);
				return parsed.raw.equals(Buffer.from(der)) ? parsed : null;
			});
			return {
				sha256_fingerprint: sha256Hex(der),
				subject: cert?.subject ?? null,
				issuer: cert?.issuer ?? null,
				serial_number: cert?.serialNumber ?? null,
				not_before: cert ? attempt(() => cert.validFromDate.toISOString()) : null,
				not_after: cert ? attempt(() => cert.validToDate.toISOString()) : null,
				public_key_algorithm: cert ? attempt(() => cert.publicKey.asymmetricKeyType ?? null) : null
			};
		};
		DN_EXPANSION = 4;
		certificateBytes = (der) => 256 + DN_EXPANSION * (der?.length ?? 0);
		certificateSummaryBytes = (der) => 128 + DN_EXPANSION * der.length;
		jsonStringBytes = (text) => 2 + 6 * text.length;
	})))();
}

//#endregion
//#region dist/domain/apkSignature/apkV1SignatureBlock.js
var MAX_V1_BLOCK_CERTIFICATES, MAX_V1_SIGNER_INFOS, MAX_ASN1_DEPTH, MAX_ASN1_ELEMENTS, OID_SIGNED_DATA, OID_SUBJECT_KEY_IDENTIFIER, TAG, BlockFailure, malformed, ApkBerReader, expectTag, expectOctetString, oidText, algorithmOid, equalBytes, integerIdentityContents, unavailableIdentityInterpretation, directoryNameKey, certificateIdentity, matchingCertificate, signerInfo, decode, decodeV1SignatureBlock;
function init_apkV1SignatureBlock() {
	return (init_apkV1SignatureBlock = __esmMin((() => {
		init_result();
		init_keyedCollection();
		init_asn1Oid();
		init_asn1Ber();
		MAX_V1_BLOCK_CERTIFICATES = 32;
		MAX_V1_SIGNER_INFOS = 32;
		MAX_ASN1_DEPTH = 32;
		MAX_ASN1_ELEMENTS = 65536;
		OID_SIGNED_DATA = "1.2.840.113549.1.7.2";
		OID_SUBJECT_KEY_IDENTIFIER = "2.5.29.14";
		TAG = {
			integer: 2,
			octetString: 4,
			oid: 6,
			sequence: 48,
			set: 49,
			context0: 160,
			context1: 161,
			context3: 163,
			/** `[0] IMPLICIT SubjectKeyIdentifier` (primitive). */
			context0Primitive: 128
		};
		BlockFailure = class {
			error;
			constructor(error) {
				this.error = error;
			}
		};
		malformed = (detail) => new BlockFailure({
			kind: "malformed-pkcs7",
			detail
		});
		ApkBerReader = class {
			#reader;
			constructor(bytes) {
				const buffer = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
				this.#reader = new Asn1BerReader(buffer, MAX_ASN1_ELEMENTS, MAX_ASN1_DEPTH);
			}
			/** One TLV starting at `at`, which must end at or before `limit`. */
			read(at, limit, depth) {
				try {
					return this.#reader.read(at, limit, depth);
				} catch (cause) {
					if (!(cause instanceof Asn1BerFailure)) throw cause;
					if (cause.constraint !== null) throw new BlockFailure({
						kind: "budget-exceeded",
						resource: cause.constraint.resource === "nodes" ? "asn1-elements" : "asn1-depth",
						limit: cause.constraint.limit
					});
					throw malformed(cause.message);
				}
			}
			rawEncodedSpan(tlv) {
				return this.#reader.bytes.subarray(tlv.start, tlv.end);
			}
		};
		expectTag = (tlv, tag, what) => {
			if (tlv === undefined) throw malformed(`${what} is missing`);
			if (tlv.tag !== tag) throw malformed(`${what} has tag 0x${tlv.tag.toString(16)}, expected 0x${tag.toString(16)}`);
			return tlv;
		};
		expectOctetString = (tlv, what) => {
			if (tlv === undefined) throw malformed(`${what} is missing`);
			if (tlv.tag === TAG.octetString) return tlv;
			if (tlv.tag !== 36) throw malformed(`${what} has tag 0x${tlv.tag.toString(16)}, expected 0x4 or 0x24`);
			const validateFragments = (node) => {
				for (const child of node.children) {
					if (child.tag === TAG.octetString) continue;
					if (child.tag === 36) validateFragments(child);
					else throw malformed(`${what} has non-OCTET STRING fragment tag 0x${child.tag.toString(16)}`);
				}
			};
			validateFragments(tlv);
			return tlv;
		};
		oidText = (content) => {
			const decoded = decodeAsn1Oid(content, {
				bytes: 64,
				arcBytes: 64
			});
			if (decoded.ok) return decoded.value;
			if (decoded.error.kind === "byte-limit" || decoded.error.kind === "arc-limit") throw new BlockFailure({
				kind: "budget-exceeded",
				resource: decoded.error.kind === "byte-limit" ? "oid-bytes" : "oid-arc-bytes",
				limit: decoded.error.limit
			});
			if (decoded.error.kind === "truncated") throw malformed("object identifier is truncated");
			throw malformed(`object identifier of ${String(content.length)} bytes`);
		};
		algorithmOid = (tlv, what) => oidText(expectTag(expectTag(tlv, TAG.sequence, what).children[0], TAG.oid, `${what} algorithm`).content);
		equalBytes = (a, b) => a.length === b.length && Buffer.compare(a, b) === 0;
		integerIdentityContents = (bytes) => {
			let start = 0;
			while (start < bytes.length - 1) {
				const first = bytes[start];
				const nextHigh = ((bytes[start + 1] ?? 0) & 128) !== 0;
				if (!(first === 0 && !nextHigh || first === 255 && nextHigh)) break;
				start += 1;
			}
			return start === 0 ? bytes : bytes.subarray(start);
		};
		unavailableIdentityInterpretation = (cause) => cause instanceof BlockFailure && (cause.error.kind === "malformed-pkcs7" || cause.error.resource === "oid-bytes" || cause.error.resource === "oid-arc-bytes");
		directoryNameKey = (name) => {
			try {
				const attributes = new Set([
					"2.5.4.3",
					"2.5.4.6",
					"2.5.4.7",
					"2.5.4.8",
					"2.5.4.10",
					"2.5.4.11"
				]);
				const rdns = [];
				for (const rdn of name.children) {
					if (rdn.tag !== TAG.set || rdn.children.length === 0) return null;
					const values = [];
					for (const attribute of rdn.children) {
						if (attribute.tag !== TAG.sequence || attribute.children.length !== 2) return null;
						const [id, value] = attribute.children;
						if (id?.tag !== TAG.oid || value === undefined || ![12, 19].includes(value.tag)) return null;
						const oid = oidText(id.content);
						if (!attributes.has(oid) || value.content.some((byte) => byte < 32 || byte > 126)) return null;
						const text = Buffer.from(value.content).toString("ascii").trim().replace(/ +/gu, " ").toLowerCase();
						if (value.tag === 19 && !/^[a-z0-9 '()+,./:=?-]*$/iu.test(text)) return null;
						values.push(JSON.stringify([oid, text]));
					}
					rdns.push(values.sort());
				}
				return JSON.stringify(rdns);
			} catch (cause) {
				if (unavailableIdentityInterpretation(cause)) return null;
				throw cause;
			}
		};
		certificateIdentity = (reader, certificate) => {
			try {
				const tbs = expectTag(certificate.children[0], TAG.sequence, "tbsCertificate");
				const fields = tbs.children;
				const offset = fields[0]?.tag === TAG.context0 ? 1 : 0;
				const serial = expectTag(fields[offset], TAG.integer, "serialNumber");
				const issuer = expectTag(fields[offset + 2], TAG.sequence, "issuer");
				let subjectKeyIdentifier = null;
				const extensionFields = uniqueKeyed(keyedBy(fields, (field) => String(field.tag)), String(TAG.context3));
				if (!extensionFields.ok) throw malformed("tbsCertificate declares extensions more than once");
				const extensions = extensionFields.value;
				if (extensions !== undefined) {
					const list = expectTag(extensions.children[0], TAG.sequence, "extensions");
					for (const extension of list.children) {
						const parts = extension.children;
						const id = expectTag(parts[0], TAG.oid, "extension id");
						if (oidText(id.content) !== OID_SUBJECT_KEY_IDENTIFIER) continue;
						if (subjectKeyIdentifier !== null) throw malformed("tbsCertificate declares subjectKeyIdentifier more than once");
						const value = expectTag(parts.at(-1), TAG.octetString, "extnValue");
						const inner = reader.read(value.contentStart, value.contentEnd, 0);
						subjectKeyIdentifier = expectTag(inner, TAG.octetString, "keyIdentifier").content;
					}
				}
				return {
					encoded: reader.rawEncodedSpan(certificate),
					issuer: reader.rawEncodedSpan(issuer),
					issuerKey: directoryNameKey(issuer),
					serialIdentity: integerIdentityContents(serial.content),
					subjectKeyIdentifier
				};
			} catch (cause) {
				if (unavailableIdentityInterpretation(cause)) return null;
				throw cause;
			}
		};
		matchingCertificate = (identities, matches) => {
			let selected;
			let certificateIndex = null;
			for (const [index, identity] of identities.entries()) {
				if (identity === null || !matches(identity)) continue;
				if (selected !== undefined && !equalBytes(selected.encoded, identity.encoded)) return {
					certificateIndex: null,
					certificateIssue: "ambiguous-identifier"
				};
				if (selected === undefined) {
					selected = identity;
					certificateIndex = index;
				}
			}
			return { certificateIndex };
		};
		signerInfo = (reader, tlv, identities, index) => {
			const what = `signerInfo ${String(index)}`;
			const fields = expectTag(tlv, TAG.sequence, what).children;
			expectTag(fields[0], TAG.integer, `${what} version`);
			const sid = fields[1];
			let identifiedBy;
			let certificate;
			if (sid?.tag === TAG.sequence) {
				const parts = sid.children;
				const issuerNode = expectTag(parts[0], TAG.sequence, `${what} issuer`);
				const issuer = reader.rawEncodedSpan(issuerNode);
				const issuerKey = directoryNameKey(issuerNode);
				const serialIdentity = integerIdentityContents(expectTag(parts[1], TAG.integer, `${what} serialNumber`).content);
				identifiedBy = "issuer-and-serial";
				certificate = matchingCertificate(identities, (identity) => (equalBytes(identity.issuer, issuer) || issuerKey !== null && identity.issuerKey === issuerKey) && equalBytes(identity.serialIdentity, serialIdentity));
			} else if (sid?.tag === TAG.context0Primitive) {
				const keyId = sid.content;
				identifiedBy = "subject-key-identifier";
				certificate = matchingCertificate(identities, (identity) => identity.subjectKeyIdentifier !== null && equalBytes(identity.subjectKeyIdentifier, keyId));
			} else throw malformed(`${what} has no supported signer identifier`);
			const digestAlgorithmOid = algorithmOid(fields[2], `${what} digestAlgorithm`);
			const next = fields[3]?.tag === TAG.context0 ? 4 : 3;
			const signatureAlgorithmOid = algorithmOid(fields[next], `${what} signatureAlgorithm`);
			expectOctetString(fields[next + 1], `${what} signature`);
			return {
				identifiedBy,
				...certificate,
				digestAlgorithmOid,
				signatureAlgorithmOid
			};
		};
		decode = (bytes) => {
			const reader = new ApkBerReader(bytes);
			const contentInfo = expectTag(reader.read(0, bytes.length, 0), TAG.sequence, "ContentInfo");
			const [contentType, explicit] = contentInfo.children;
			const type = oidText(expectTag(contentType, TAG.oid, "contentType").content);
			if (type !== OID_SIGNED_DATA) throw malformed(`contentType ${type} is not SignedData`);
			const signedData = expectTag(expectTag(explicit, TAG.context0, "content").children[0], TAG.sequence, "SignedData");
			const fields = signedData.children;
			expectTag(fields[0], TAG.integer, "SignedData version");
			expectTag(fields[1], TAG.set, "digestAlgorithms");
			expectTag(fields[2], TAG.sequence, "encapContentInfo");
			let at = 3;
			const certificates = [];
			if (fields[at]?.tag === TAG.context0) {
				for (const choice of fields[at].children) {
					if (choice.tag !== TAG.sequence) throw malformed(`certificate choice with tag 0x${choice.tag.toString(16)} is not an X.509 certificate`);
					if (certificates.length >= MAX_V1_BLOCK_CERTIFICATES) throw new BlockFailure({
						kind: "budget-exceeded",
						resource: "v1-block-certificates",
						limit: MAX_V1_BLOCK_CERTIFICATES
					});
					certificates.push(choice);
				}
				at += 1;
			}
			if (fields[at]?.tag === TAG.context1) at += 1;
			const infos = expectTag(fields[at], TAG.set, "signerInfos").children;
			if (infos.length > MAX_V1_SIGNER_INFOS) throw new BlockFailure({
				kind: "budget-exceeded",
				resource: "v1-signer-infos",
				limit: MAX_V1_SIGNER_INFOS
			});
			const identities = certificates.map((certificate) => certificateIdentity(reader, certificate));
			return {
				certificates: certificates.map((certificate) => reader.rawEncodedSpan(certificate)),
				signerInfos: infos.map((info, index) => signerInfo(reader, info, identities, index)),
				trailingBytes: bytes.length - contentInfo.end
			};
		};
		decodeV1SignatureBlock = (bytes) => {
			try {
				return ok(decode(bytes));
			} catch (cause) {
				if (cause instanceof BlockFailure) return err(cause.error);
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/apkSignature/apkV1Signers.js
/**
* Read each v1 (JAR) signer's PKCS#7 block from the archive and materialise
* its declared facts. The domain owns the ZIP and DER structure; this adapter
* owns inflation (bounded by the inflater itself, not the declared size) and
* hands every certificate to the shared certificate owner.
*/
var SIGNER_INFO_BYTES, projectedV1SignerBytes, decodeV1Signer, v1SignerNotes, v1PostureFingerprint, v1SignerFacts;
function init_apkV1Signers() {
	return (init_apkV1Signers = __esmMin((() => {
		init_parseFailure();
		init_apkV1Signature();
		init_apkV1SignatureBlock();
		init_apkCertificateFacts();
		init_ApkSignatureRelease();
		SIGNER_INFO_BYTES = 768;
		projectedV1SignerBytes = ({ entry, decoded }) => {
			const total = 512 + jsonStringBytes(entry.signatureFile) + jsonStringBytes(entry.block.name);
			if (!decoded.ok) return total + jsonStringBytes(decoded.error);
			const { certificates, signerInfos } = decoded.value;
			let largest = 0;
			let summaries = 0;
			for (const der of certificates) {
				summaries += certificateSummaryBytes(der);
				largest = Math.max(largest, certificateBytes(der));
			}
			return total + summaries + largest + SIGNER_INFO_BYTES * signerInfos.length;
		};
		decodeV1Signer = (bytes, entry, entriesEnd) => {
			const { block } = entry;
			let declaresEncryption = centralDeclaresEncryption(block);
			const fail = (error) => ({
				entry,
				declaresEncryption,
				decoded: {
					ok: false,
					error
				}
			});
			if (entry.duplicate !== null) return fail(`duplicate entry: ${entry.duplicate}`);
			const limit = APK_SIGNATURE_LIMITS.v1BlockBytes;
			const stored = localEntryData(bytes, block, entriesEnd);
			if (!stored.ok) return fail(stored.error.detail);
			({declaresEncryption} = stored.value);
			if (block.uncompressedSize > limit) return fail(`signature block declares ${String(block.uncompressedSize)} bytes, over the ${String(limit)}-byte bound`);
			let data;
			if (block.method === 0) data = stored.value.data;
			else if (block.method === 8) {
				try {
					data = inflateRawSync(stored.value.data, { maxOutputLength: limit });
				} catch (cause) {
					return fail(hostRangeErrorKind(cause) === "host-capacity" ? `signature block inflates past the ${String(limit)}-byte bound` : "signature block deflate stream is damaged");
				}
			} else return fail(`compression method ${String(block.method)} is not supported`);
			if (data.length !== block.uncompressedSize) return fail(`signature block holds ${String(data.length)} bytes, the central directory declares ${String(block.uncompressedSize)}`);
			const signedData = decodeV1SignatureBlock(data);
			if (signedData.ok) return {
				entry,
				declaresEncryption,
				decoded: signedData
			};
			return fail(signedData.error.kind === "malformed-pkcs7" ? `malformed PKCS#7: ${signedData.error.detail}` : `more ${signedData.error.resource} than ${String(signedData.error.limit)}`);
		};
		v1SignerNotes = (signers) => signers.flatMap(({ entry, declaresEncryption, decoded }) => [
			...declaresEncryption ? [`${entry.block.name}: the entry declares encryption (general-purpose flag bit 0); apksig ignores the flag, so its bytes were read as stored and the PKCS#7 decoding decides.`] : [],
			...decoded.ok && decoded.value.signerInfos.some((info) => info.identifiedBy === "subject-key-identifier") ? [`${entry.block.name}: a SignerInfo names its certificate by subjectKeyIdentifier, which apksig does not resolve (it matches issuerAndSerialNumber only), so apksig's v1 verification fails for this block. The certificate it names is reported as declared, and v1_signers_match_block_signers treats this signer as unknown.`] : [],
			...decoded.ok && decoded.value.signerInfos.some((info) => info.certificateIssue === "ambiguous-identifier") ? [`${entry.block.name}: multiple distinct certificates match one SignerInfo identifier; its certificate identity is unknown and all carried certificates are retained.`] : [],
			...decoded.ok && decoded.value.trailingBytes > 0 ? [`${entry.block.name}: ${String(decoded.value.trailingBytes)} bytes follow the PKCS#7 ContentInfo and were ignored, as apksig ignores them.`] : []
		]);
		v1PostureFingerprint = (signer) => signer.signer_infos.some((info) => info.identified_by === "subject-key-identifier") ? null : signer.certificate?.sha256_fingerprint ?? null;
		v1SignerFacts = ({ entry, decoded }) => {
			const base = {
				signature_file: entry.signatureFile,
				block_file: entry.block.name
			};
			if (!decoded.ok) return {
				...base,
				certificate: null,
				certificates: [],
				signer_infos: [],
				decode_error: decoded.error
			};
			const facts = decoded.value.certificates.map(certificateFacts);
			const infos = decoded.value.signerInfos;
			const named = (index) => index === null ? null : facts[index] ?? null;
			return {
				...base,
				certificate: infos.length === 1 ? named(infos[0]?.certificateIndex ?? null) : null,
				certificates: facts.map(({ sha256_fingerprint, subject }) => ({
					sha256_fingerprint,
					subject
				})),
				signer_infos: infos.map((info) => ({
					identified_by: info.identifiedBy,
					certificate_sha256: named(info.certificateIndex)?.sha256_fingerprint ?? null,
					digest_algorithm_oid: info.digestAlgorithmOid,
					signature_algorithm_oid: info.signatureAlgorithmOid
				})),
				decode_error: null
			};
		};
	})))();
}

//#endregion
//#region dist/apkSignature/ApkSignatureProvider.js
var OPERATION, nodeHash, digestMatcher, capabilities, lineageOf, projectedOutputBytes, digestsOf, baseSigner, rotationFacts, v3Signer, selfConsistency, postureSigner, NAME_DISPLAY_BYTES, displayName, listed, plural, duplicateEntriesLimitation, LAYOUT_LIMITATION, ApkSignatureProvider, readV1, sourceStampPair, sourceStampFacts, decodeScheme;
function init_ApkSignatureProvider() {
	return (init_ApkSignatureProvider = __esmMin((() => {
		init_ApkSignatureAdmission();
		init_AnalysisProvider();
		init_resources();
		init_providerCleanupError();
		init_apkSigningBlock();
		init_apkSignatureSchemes();
		init_apkSignatureReport();
		init_apkContentDigest();
		init_apkV1Signature();
		init_result();
		init_zipPackageFormat();
		init_apkSignatureFailures();
		init_ApkSignatureRelease();
		init_apkCertificateFacts();
		init_apkV1Signers();
		OPERATION = "inspect_apk_signature";
		nodeHash = (algorithm) => {
			const hash = createHash(algorithm);
			return {
				update: (data) => {
					hash.update(data);
				},
				digest: () => new Uint8Array(hash.digest())
			};
		};
		digestMatcher = (bytes, tail, blockStart) => {
			const cache = new Map();
			return {
				match: (algorithmId, signed) => {
					const algorithm = contentDigestAlgorithm(algorithmId);
					if (blockStart === null || algorithm !== "sha256" && algorithm !== "sha512") return null;
					if (!cache.has(algorithm)) cache.set(algorithm, computeApkContentDigest(bytes, {
						tail,
						blockStart,
						algorithm
					}, nodeHash));
					const computed = cache.get(algorithm) ?? null;
					return computed === null ? null : Buffer.from(computed).equals(signed);
				},
				layoutPreventedRecompute: () => [...cache.values()].some((value) => value === null)
			};
		};
		capabilities = (flags) => ({
			installed_data: (flags & 1) !== 0,
			shared_uid: (flags & 2) !== 0,
			permission: (flags & 4) !== 0,
			rollback: (flags & 8) !== 0,
			auth: (flags & 16) !== 0
		});
		lineageOf = (signer, version) => {
			const attribute = signer.attributes.find((a) => a.id === PROOF_OF_ROTATION_ATTR_ID);
			if (attribute === undefined) return ok({ present: false });
			const nodes = decodeRotationLineage(attribute.value, version);
			if (nodes.ok) return ok({
				present: true,
				nodes: nodes.value
			});
			return nodes.error.kind === "malformed-signer" ? ok({
				present: true,
				decodeError: nodes.error.detail
			}) : nodes;
		};
		projectedOutputBytes = (schemes, v1, v1Decoded, stamp) => {
			let total = 4096 + certificateBytes(stamp);
			for (const name of [...v1.signatureFiles, ...v1.blockFiles]) total += 1 + jsonStringBytes(name);
			for (const signer of v1Decoded) total += projectedV1SignerBytes(signer);
			for (const scheme of schemes) for (const { signer, rotation } of scheme.signers) {
				total += 512 + certificateBytes(signer.certificates[0]);
				for (const digest of signer.digests) total += 160 + 2 * digest.digest.length;
				total += 160 * signer.signatures.length;
				if (rotation.present && "nodes" in rotation) for (const node of rotation.nodes) total += 192 + certificateBytes(node.certificate);
			}
			return total;
		};
		digestsOf = (signer, matcher) => signer.digests.map((d) => ({
			signature_algorithm_id: d.algorithmId,
			uninterpreted_bytes: d.uninterpretedBytes,
			algorithm: contentDigestAlgorithm(d.algorithmId) ?? "unknown",
			declared_digest_hex: Buffer.from(d.digest.buffer, d.digest.byteOffset, d.digest.byteLength).toString("hex"),
			matches_apk: matcher.match(d.algorithmId, d.digest)
		}));
		baseSigner = (signer, matcher) => ({
			certificate: signer.certificates[0] ? certificateFacts(signer.certificates[0]) : null,
			digests: digestsOf(signer, matcher),
			uninterpreted_signed_data_bytes: signer.uninterpretedSignedDataBytes,
			uninterpreted_signer_bytes: signer.uninterpretedSignerBytes,
			signatures: signer.signatures.map(({ algorithmId, signature, uninterpretedBytes }) => ({
				signature_algorithm_id: algorithmId,
				algorithm: contentDigestAlgorithm(algorithmId) ?? "unknown",
				signature_bytes: signature.length,
				uninterpreted_bytes: uninterpretedBytes
			})),
			public_key_bytes: signer.publicKey.length,
			min_sdk: signer.minSdk,
			max_sdk: signer.maxSdk
		});
		rotationFacts = (rotation) => {
			if (!rotation.present) return {
				present: false,
				lineage: [],
				decode_error: null
			};
			if ("decodeError" in rotation) return {
				present: true,
				lineage: [],
				decode_error: rotation.decodeError
			};
			return {
				present: true,
				lineage: rotation.nodes.map((node) => ({
					certificate: certificateFacts(node.certificate),
					flags: node.flags,
					capabilities: capabilities(node.flags)
				})),
				decode_error: null
			};
		};
		v3Signer = (decoded, matcher) => ({
			...baseSigner(decoded.signer, matcher),
			rotation: rotationFacts(decoded.rotation)
		});
		selfConsistency = (signers) => {
			const results = signers.flatMap((s) => s.digests.map((d) => d.matches_apk)).filter((m) => m !== null);
			if (results.length === 0) return null;
			return results.every(Boolean);
		};
		postureSigner = (signer) => {
			const fingerprint = signer.certificate?.sha256_fingerprint ?? null;
			if (!("rotation" in signer) || !signer.rotation.present) return {
				fingerprint,
				lineage: { kind: "absent" }
			};
			if (signer.rotation.decode_error !== null) return {
				fingerprint,
				lineage: { kind: "undecoded" }
			};
			return {
				fingerprint,
				lineage: {
					kind: "decoded",
					fingerprints: signer.rotation.lineage.map((node) => node.certificate?.sha256_fingerprint ?? null)
				}
			};
		};
		NAME_DISPLAY_BYTES = 256;
		displayName = ({ name, storedBytes }) => {
			const encoded = Buffer.from(name, "utf8");
			if (encoded.length <= NAME_DISPLAY_BYTES) return JSON.stringify(name);
			let cut = NAME_DISPLAY_BYTES;
			while (cut > 0 && ((encoded[cut] ?? 0) & 192) === 128) cut -= 1;
			const prefix = encoded.subarray(0, cut).toString("utf8");
			return `${JSON.stringify(prefix)}… (${String(storedBytes)}-byte name)`;
		};
		listed = ({ count, sample }) => {
			const more = count - sample.length;
			return `${sample.map(displayName).join(", ")}${more > 0 ? ` and ${String(more)} more` : ""}`;
		};
		plural = (count) => `${String(count)} ${count === 1 ? "name" : "names"}`;
		duplicateEntriesLimitation = (duplicates) => {
			const { count, records, apksigRecords, unread } = duplicates;
			if (count === 0 && unread.count === 0) return null;
			const partial = apksigRecords < records;
			const scope = partial ? `apksig reads only the first ${String(apksigRecords)} of the ${String(records)} central-directory records (it takes the count from the classic end-of-central-directory record's 16-bit field and ignores the Zip64 count). ` : "";
			const within = count > 0 ? `${partial ? "Among those, the" : "The"} central directory holds ${plural(count)} more than once (${listed(duplicates)}); apksig rejects the v1 signature of an archive with any duplicate entry ("Duplicate entry"). A v1 signer whose signature block, .SF or META-INF/MANIFEST.MF name is duplicated carries decode_error; other v1 signers are reported as declared.` : "";
			const beyond = unread.count > 0 ? `${count > 0 ? " " : ""}${plural(unread.count)} (${listed(unread)}) ${unread.count === 1 ? "is" : "are"} duplicated only by records past those, which apksig does not read.` : "";
			return `${scope}${within}${beyond}`;
		};
		LAYOUT_LIMITATION = "The content digest was not recomputed because the central directory is not immediately followed by the end-of-central-directory record (declared size mismatch or an intervening Zip64 record); matches_apk is null for those digests.";
		ApkSignatureProvider = class {
			/** Owns the selected file's descriptor, retaining it when closing fails. */
			#resources = new ArtifactResourceScope();
			async close() {
				try {
					await this.#resources.close();
				} catch (cause) {
					if (!(cause instanceof ArtifactReaderFailure) || cause.cleanup === undefined) throw cause;
					const error = new ProviderCleanupError(APK_SIGNATURE_PROVIDER_IDENTITY.id, cause.cleanup.resources, { reason: cause.cleanup.reason }, {
						cause,
						operation: OPERATION
					});
					bindArtifactFileCleanup(cause, error);
					throw error;
				}
			}
			async inspect(input, options) {
				try {
					return await this.#resources.run(async () => {
						const release = await apkSignatureAdmission.acquire(options?.signal);
						try {
							const selected = await readStableArtifact(input.path, APK_SIGNATURE_LIMITS.inputBytes, options?.signal, undefined, this.#resources);
							assertArtifactReadActive(options?.signal);
							const analyzed = this.#analyze(selected.bytes, {
								path: input.path,
								sha256: selected.sha256,
								bytes: selected.bytes.length
							});
							assertArtifactReadActive(options?.signal);
							return analyzed;
						} finally {
							release();
						}
					});
				} catch (cause) {
					return err(apkSignatureFailure(cause, input.path));
				}
			}
			#analyze(bytes, artifact) {
				const tail = parseZipTail(bytes);
				if (!tail.ok) return err(mapApkBlockError(tail.error, artifact.path));
				const block = locateApkSigningBlock(bytes, tail.value);
				if (!block.ok) return err(mapApkBlockError(block.error, artifact.path));
				const v1Read = readV1(bytes, tail.value, block.value);
				if (!v1Read.ok) return v1Read;
				const { v1, decoded: v1Decoded, duplicates } = v1Read.value;
				const v2 = decodeScheme(block.value, APK_BLOCK_ID.signatureV2, "v2");
				if (!v2.ok) return v2;
				const v3 = decodeScheme(block.value, APK_BLOCK_ID.signatureV3, "v3");
				if (!v3.ok) return v3;
				const v31 = decodeScheme(block.value, APK_BLOCK_ID.signatureV31, "v3.1");
				if (!v31.ok) return v31;
				const projected = projectedOutputBytes([
					v2.value,
					v3.value,
					v31.value
				], v1, v1Decoded, sourceStampPair(block.value)?.value);
				if (projected > APK_SIGNATURE_LIMITS.outputBytes) return err(apkOutputBudgetError(projected));
				const matcher = digestMatcher(bytes, tail.value, block.value?.blockStart ?? null);
				const v1signers = v1Decoded.map(v1SignerFacts);
				const v2signers = v2.value.signers.map((s) => baseSigner(s.signer, matcher));
				const v3signers = v3.value.signers.map((s) => v3Signer(s, matcher));
				const v31signers = v31.value.signers.map((s) => v3Signer(s, matcher));
				const sourceStamp = sourceStampFacts(block.value);
				const derived = deriveApkPosture({
					v1Present: v1.present,
					v2Present: v2.value.present,
					v3Present: v3.value.present,
					v31Present: v31.value.present,
					sourceStampPresent: sourceStamp.present,
					blockSchemes: [
						{
							scheme: "v2",
							signers: v2signers.map(postureSigner)
						},
						{
							scheme: "v3",
							signers: v3signers.map(postureSigner)
						},
						{
							scheme: "v3.1",
							signers: v31signers.map(postureSigner)
						}
					],
					v1SignerFingerprints: v1signers.map(v1PostureFingerprint),
					selfConsistent: selfConsistency([
						...v2signers,
						...v3signers,
						...v31signers
					])
				});
				const result = {
					artifact,
					schemes: {
						v1: {
							present: v1.present,
							has_manifest: v1.hasManifest,
							signature_files: [...v1.signatureFiles],
							block_files: [...v1.blockFiles],
							signers: v1signers
						},
						v2: {
							present: v2.value.present,
							signers: v2signers,
							uninterpreted_bytes: v2.value.uninterpretedBytes
						},
						v3: {
							present: v3.value.present,
							signers: v3signers,
							uninterpreted_bytes: v3.value.uninterpretedBytes
						},
						"v3.1": {
							present: v31.value.present,
							signers: v31signers,
							uninterpreted_bytes: v31.value.uninterpretedBytes
						}
					},
					source_stamp: sourceStamp,
					posture: derived.posture,
					runtime_execution: "not-performed"
				};
				const uninterpreted = apkSignatureUninterpretedBytes(result);
				const limitations = [
					...uninterpreted === 0 ? [] : [`${String(uninterpreted)} bytes outside known signing fields were not interpreted; suffixes do not by themselves establish malformed signing.`],
					...APK_SIGNATURE_LIMITATIONS,
					...matcher.layoutPreventedRecompute() ? [LAYOUT_LIMITATION] : [],
					...[duplicateEntriesLimitation(duplicates)].filter((note) => note !== null),
					...v1SignerNotes(v1Decoded),
					...derived.notes
				];
				const serialized = Buffer.byteLength(JSON.stringify({
					result,
					limitations
				}));
				if (serialized > APK_SIGNATURE_LIMITS.outputBytes) return err(apkOutputBudgetError(serialized));
				const format = (zipPackageFormatForPath(artifact.path) ?? "zip") === "apk" ? "apk" : "zip";
				return ok(createAnalysisExecution(result, APK_SIGNATURE_PROVIDER_IDENTITY, {
					subject: {
						path: artifact.path,
						format,
						sha256: artifact.sha256
					},
					locations: [{
						kind: "artifact-path",
						path: artifact.path
					}],
					limitations
				}));
			}
		};
		readV1 = (bytes, tail, block) => {
			const entries = centralDirectoryV1SignatureEntries(bytes, tail.centralDirectoryOffset, tail.centralDirectorySize, tail.totalEntries, tail.classicEntryCount);
			if (!entries.ok) return err(mapCentralDirectoryError(entries.error));
			const v1 = detectV1Signature(entries.value.entries);
			if (v1.signers.length > 32) return err(v1SignerCapacityError(32));
			const entriesEnd = block?.blockStart ?? tail.centralDirectoryOffset;
			return ok({
				v1,
				duplicates: entries.value.duplicates,
				decoded: v1.signers.map((signer) => decodeV1Signer(bytes, signer, entriesEnd))
			});
		};
		sourceStampPair = (block) => block?.pairs.find((p) => p.id === APK_BLOCK_ID.sourceStampV2) ?? block?.pairs.find((p) => p.id === APK_BLOCK_ID.sourceStampV1);
		sourceStampFacts = (block) => {
			const pair = sourceStampPair(block);
			if (pair === undefined) return {
				present: false,
				certificate: null,
				decode_error: null
			};
			const certificate = decodeSourceStampCertificate(pair.value);
			return certificate.ok ? {
				present: true,
				certificate: certificateFacts(certificate.value),
				decode_error: null
			} : {
				present: true,
				certificate: null,
				decode_error: certificate.error.detail
			};
		};
		decodeScheme = (block, id, version) => {
			const pair = block?.pairs.find((p) => p.id === id);
			if (pair === undefined) return ok({
				present: false,
				signers: [],
				uninterpretedBytes: 0
			});
			const signers = decodeSigners(pair.value, version);
			if (!signers.ok) return err(mapApkSchemeError(signers.error, version));
			const decoded = [];
			for (const signer of signers.value.signers) {
				const rotation = version === "v2" ? ok({ present: false }) : lineageOf(signer, version);
				if (!rotation.ok) return err(mapApkSchemeError(rotation.error, version));
				decoded.push({
					signer,
					rotation: rotation.value
				});
			}
			return ok({
				present: true,
				signers: decoded,
				uninterpretedBytes: signers.value.uninterpretedBytes
			});
		};
	})))();
}

//#endregion
//#region dist/composition/apkSignature.js
var createApkSignatureService, apkSignatureModule;
function init_apkSignature() {
	return (init_apkSignature = __esmMin((() => {
		init_ApkSignatureService();
		init_ApkSignatureProvider();
		init_apkSignatureToolContracts();
		init_cliCommandNames();
		createApkSignatureService = () => new ApkSignatureService(new ApkSignatureProvider());
		apkSignatureModule = {
			contract: INSPECT_APK_SIGNATURE_CONTRACT,
			cliCommand: cliCommandFor("inspect_apk_signature"),
			create(_environment, injected) {
				const service = injected ?? createApkSignatureService();
				return {
					inspect: service.inspect.bind(service),
					close: service.close.bind(service)
				};
			}
		};
	})))();
}

//#endregion
//#region dist/cli/apkSignatureCommands.js
var apkSignatureCommands_exports = /* @__PURE__ */ __exportAll({ registerApkSignatureCommands: () => registerApkSignatureCommands });
var registerApkSignatureCommands;
function init_apkSignatureCommands() {
	return (init_apkSignatureCommands = __esmMin((() => {
		init_ApkSignatureRelease();
		init_apkSignature();
		init_contractCommand();
		registerApkSignatureCommands = (cli, logger, environment) => {
			const deliver = deliverWithService(() => apkSignatureModule.create(environment), APK_SIGNATURE_PROVIDER_IDENTITY.id);
			registerContractCommand(cli, logger, apkSignatureModule.contract, {
				command: apkSignatureModule.cliCommand,
				description: "Inspect declared APK signing schemes, signers and content digests",
				positionals: ["path"],
				callerPaths: ["path"],
				evidenceDelivery: true,
				viewDelivery: {
					invalidJson: "view must be a JSON APK signature selection",
					kind: "apk-signature"
				},
				fields: {
					path: { description: "Selected local APK/ZIP/AAB" },
					view: { description: "JSON signer/digest/lineage selection; requires --detail summary and --evidence_output" }
				}
			}, (input, context) => deliver({
				...input,
				detail: "complete"
			}, context));
		};
	})))();
}

//#endregion
export { apkSignatureCommands_exports, init_apkSignatureCommands };