import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { B as artifactIntegrityDetails, Ct as parseAsarListingAdmission, Dt as init_asarHeaderAdmission, Ft as analysisSettingLimit, G as init_artifactIntegrity, H as artifactIntegrityPairOf, K as init_safeJson, Lt as init_analysisSettingDefinitions, M as init_artifactOperationError, Ot as parseAsarHeaderAdmission, Q as projectZstandardFrameAllowance, Sn as init_callerPath, St as init_asarListingAdmission, Tn as init_HostPlatform, Tt as DEFAULT_ASAR_HEADER_ADMISSION, Y as ZstandardFrameAllowanceError, Z as init_zstandardFrameAllowance, bn as absoluteCallerPath, dt as init_windowsChangeTimeSettle, ft as resolveWindowsChangeTimeSettle, h as init_analysisErrorPresentation, j as ArtifactOperationError, m as composedCallerGuidance, n as init_analysisErrorProjection, p as analysisErrorUserMessage, q as safeParseJson, t as childFailureDiagnostics, ut as applyWindowsChangeTimeSnapshot, wn as HOST_PLATFORM, wt as ASAR_HEADER_ADMISSION_SETTING } from "./analysisErrorProjection-B0_t_nHz.js";
import { i as init_analysisErrorBase, t as AnalysisError } from "./analysisErrorBase-C0hMa0_b.js";
import { i as init_configurationErrors, t as BinaryTargetError } from "./configurationErrors-DgUy2JKH.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { $t as init_analysisResourceLimits, At as MAXIMUM_ASAR_MAX_HEADER_BYTES, C as init_parseFailure, b as ParseFailureError, ct as DEFAULT_ASAR_MAX_HEADER_BYTES, o as jsonValueSchema, r as init_jsonValue, x as decodeLimit } from "./jsonValue-BIEmjG1z.js";
import { A as init_binaryContainer, G as EvidenceFileError, S as BinaryReader, Y as init_evidenceErrors, a as ZIP64_LOCATOR, d as readZip64DirectoryRecord, f as readZip64Locator, g as zipEndUsesSingleVolume, h as zipEndOfCentralDirectoryCandidates, i as ZIP64_END, m as zip64LocatorUsesSingleVolume, n as digestCanonicalValue, o as ZIP_CLASSIC_DIRECTORY_LIMITS, p as zip64EndUsesSingleVolume, r as init_canonicalDigest, u as init_zipEndOfCentralDirectory, v as init_zipLocalHeader, y as zipLocalDataOffset } from "./canonicalDigest-DUQN3Yyz.js";
import { _ as init_analysisErrorCore, d as AnalysisUnsupportedTargetError, h as carriedReason, i as AnalysisCancelledError, m as cancelledBy, n as AnalysisAccessDeniedError, o as AnalysisInputError, p as OwnerCancellation, r as AnalysisArtifactChangedError } from "./analysisErrorCore-CrdY4k0A.js";
import { a as invariantViolation, i as init_internalInvariant, n as init_errorMessage, r as InternalInvariantError, t as errorMessage } from "./errorMessage-rfGn5D1_.js";
import { i as strictUtf8Decoder, n as init_strictUtf8, r as isStrictUtf8 } from "./strictUtf8-Cx_KgW8Z.js";
import { r as init_providerAdapterError, t as ProviderAdapterError } from "./providerAdapterError-CdFzW4Ag.js";
import { r as init_unicodeCodePointOrder, t as compareUnicodeCodePoints } from "./unicodeCodePointOrder-BezCbTpg.js";
import { a as init_providerCleanupError, i as ProviderCleanupError } from "./SignalAbort-CPFWtyzs.js";
import { constants } from "node:fs";
import { basename, dirname, extname, isAbsolute, join, posix, relative, resolve, sep } from "node:path";
import { z } from "zod";
import { constants as constants$1 } from "node:buffer";
import { createHash } from "node:crypto";
import { access, chmod, link, lstat, mkdir, mkdtemp, open, opendir, readdir, realpath, rename, rmdir, stat, unlink } from "node:fs/promises";
import { isSafeNumber } from "lossless-json";
import { scheduler } from "node:timers/promises";
import { constants as constants$2 } from "node:os";
import { Duplex, PassThrough, Readable, compose } from "node:stream";
import { once } from "node:events";
import { constants as constants$3, createZstdDecompress } from "node:zlib";
import { ERR_AMBIGUOUS_ARCHIVE, ERR_BAD_FORMAT, ERR_CENTRAL_DIRECTORY_NOT_FOUND, ERR_ENCRYPTED_CENTRAL_DIRECTORY, ERR_ENTRY_DATA_OUT_OF_BOUNDS, ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND, ERR_EOCDR_NOT_FOUND, ERR_EXTRAFIELD_ZIP64_NOT_FOUND, ERR_INVALID_COMPRESSED_DATA, ERR_INVALID_CRC32, ERR_INVALID_UNCOMPRESSED_SIZE, ERR_LOCAL_FILE_HEADER_NOT_FOUND, ERR_OVERLAPPING_ENTRY, ERR_SPLIT_ZIP_FILE, ERR_UNSUPPORTED_COMPRESSION, ERR_UNSUPPORTED_ENCRYPTION, ERR_UNSUPPORTED_UINT64, Reader, ZipReader, registerCodec } from "@zip.js/zip.js";

//#region dist/domain/analysisErrorCleanup.js
var analysisErrorWithCleanupFailure, analysisErrorWithCleanupDependencies, analysisErrorWithCloseRejection, analysisErrorWithCloseRejections, providerCleanupErrorFromFailures, providerCleanupErrorFromCloseRejections, withInheritedCleanupOwnership;
function init_analysisErrorCleanup() {
	return (init_analysisErrorCleanup = __esmMin((() => {
		init_providerAdapterError();
		init_providerCleanupError();
		init_analysisErrorProjection();
		init_analysisErrorPresentation();
		analysisErrorWithCleanupFailure = (primary, cleanup, operation = "close_binary") => new ProviderAdapterError(cleanup instanceof ProviderAdapterError ? cleanup.providerId : "rea", operation, {
			cleanupPrimary: primary,
			cause: new AggregateError([primary, cleanup], "Analysis failed and cleanup remains incomplete.", { cause: primary }),
			...composedCallerGuidance({
				message: primary,
				remediation: cleanup
			}),
			...primary.capturedOutput === undefined ? {} : { capturedOutput: primary.capturedOutput },
			...primary.partialObservation === undefined ? {} : { partialObservation: primary.partialObservation },
			cleanup: {
				reason: cleanup.cleanup?.reason ?? analysisErrorUserMessage(cleanup, "invocation"),
				resources: [...new Set([...primary.cleanupIncomplete ? primary.cleanupResources : [], ...cleanup.cleanupResources])]
			},
			...childFailureDiagnostics({
				primary_error: {
					error: primary,
					omitRecovery: true,
					...primary.capturedOutput === undefined ? {} : { capturedOutput: "omit" }
				},
				cleanup_error: { error: cleanup }
			})
		});
		analysisErrorWithCleanupDependencies = (primary, cleanup, operation = "close_binary") => analysisErrorWithCleanupFailure(primary, cleanup, operation).bindCleanupDependencies([primary, cleanup]);
		analysisErrorWithCloseRejection = (primary, rejection, operation = "close_binary") => rejection.cleanupIncomplete ? analysisErrorWithCleanupDependencies(primary, rejection, operation) : analysisErrorWithCleanupFailure(primary, rejection, operation);
		analysisErrorWithCloseRejections = (first, second, operation = "close_binary") => first.cleanupIncomplete ? analysisErrorWithCloseRejection(first, second, operation) : analysisErrorWithCleanupFailure(first, second, operation);
		providerCleanupErrorFromFailures = (providerId, failures, diagnostics, options) => new ProviderCleanupError(providerId, failures.flatMap((failure) => failure.cleanupResources), typeof diagnostics === "string" ? { reason: diagnostics } : diagnostics, {
			operation: options.operation,
			cause: new AggregateError(options.causes ?? failures, options.message)
		}).bindCleanupDependencies(failures);
		providerCleanupErrorFromCloseRejections = (providerId, rejections, diagnostics, options) => {
			const owners = rejections.flatMap(({ cleanupOwner }) => cleanupOwner === undefined ? [] : [cleanupOwner]);
			const resources = () => [...new Set(rejections.flatMap(({ cleanupOwner, unconfirmedResources }) => {
				if (cleanupOwner === undefined) return unconfirmedResources ?? [];
				return cleanupOwner.cleanupIncomplete ? cleanupOwner.cleanupResources : [];
			}))];
			const aggregate = new ProviderCleanupError(providerId, resources(), diagnostics, {
				operation: options.operation,
				cause: new AggregateError(rejections.map(({ cause }) => cause), options.message),
				...options.remediationAction === undefined ? {} : { remediationAction: options.remediationAction }
			});
			if (owners.length === rejections.length) return aggregate.bindCleanupDependencies(owners);
			if (owners.length > 0) aggregate.bindCleanupResourceOwner({ get cleanupResources() {
				return resources();
			} });
			return aggregate;
		};
		withInheritedCleanupOwnership = (failure, owner) => owner.cleanupIncomplete ? failure.bindCleanupDependencies([owner]) : failure;
	})))();
}

//#endregion
//#region dist/domain/jsonDuplicateMember.js
function parseJsonWithDuplicatePolicy(text, policy, read) {
	const reviver = typeof read === "function" ? read : undefined;
	const observation = typeof read === "object" ? read : undefined;
	let value;
	try {
		value = JSON.parse(text, reviver);
	} catch (cause) {
		return {
			ok: false,
			cause
		};
	}
	if (policy === "last-wins") return {
		ok: true,
		value
	};
	const members = observeJsonMembers(text, observation === undefined ? undefined : {
		...observation,
		root: value
	});
	if (members.duplicate !== undefined) return {
		ok: false,
		duplicate: members.duplicate
	};
	return members.firstObjectMember === undefined ? {
		ok: true,
		value
	} : {
		ok: true,
		value,
		firstObjectMember: members.firstObjectMember
	};
}
var QUOTE, BACKSLASH, parseJsonStringLiteral, parseLastWinsJson, objectRecord, decimalMemberPrefix, mayHaveDecimalMember, decimalMemberValue, JsonNumberSourceCursor, findDuplicateJsonMember, observeJsonMembers;
function init_jsonDuplicateMember() {
	return (init_jsonDuplicateMember = __esmMin((() => {
		QUOTE = 34;
		BACKSLASH = 92;
		parseJsonStringLiteral = (raw) => JSON.parse(raw);
		parseLastWinsJson = (text, reviver) => JSON.parse(text, reviver);
		objectRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value) ? value : undefined;
		decimalMemberPrefix = String.raw`:[\t\r\n ]*-?\d+[.Ee]`;
		mayHaveDecimalMember = new RegExp(decimalMemberPrefix, "u");
		decimalMemberValue = /[\t\r\n ]*:[\t\r\n ]*(-?\d+(?:\.\d+(?:[Ee][+-]?\d+)?|[Ee][+-]?\d+))/y;
		JsonNumberSourceCursor = class {
			observation;
			#objects = [];
			#next;
			constructor(observation) {
				this.observation = observation;
				this.#next = objectRecord(observation.root);
			}
			enter(object) {
				this.#objects.push(object ? this.#next : undefined);
				this.#next = undefined;
			}
			leave() {
				this.#objects.pop();
			}
			member(name, source, end) {
				const owner = this.#objects.at(-1);
				if (owner === undefined) return;
				const value = owner[name];
				this.#next = objectRecord(value);
				if (name !== this.observation.name || typeof value !== "number") return;
				decimalMemberValue.lastIndex = end;
				const raw = decimalMemberValue.exec(source)?.[1];
				if (raw !== undefined) this.observation.read(owner, value, raw);
			}
		};
		findDuplicateJsonMember = (text) => observeJsonMembers(text).duplicate;
		observeJsonMembers = (text, observation) => {
			const cursor = observation !== undefined && mayHaveDecimalMember.test(text) ? new JsonNumberSourceCursor(observation) : undefined;
			const open = [];
			let expectName = false;
			let firstObjectMember;
			for (let index = 0; index < text.length; index++) {
				const code = text.charCodeAt(index);
				if (code === QUOTE) {
					const start = index;
					const shortEnd = start + 32;
					for (index++; index < shortEnd && text.charCodeAt(index) !== QUOTE; index++) if (text.charCodeAt(index) === BACKSLASH) index++;
					if (index >= shortEnd) {
						let quote = text.indexOf("\"", index);
						while (quote >= 0) {
							let escapeStart = quote;
							while (escapeStart > index && text.charCodeAt(escapeStart - 1) === BACKSLASH) escapeStart--;
							if ((quote - escapeStart) % 2 === 0) break;
							index = quote + 1;
							quote = text.indexOf("\"", index);
						}
						index = quote < 0 ? text.length : quote;
					}
					if (!expectName) continue;
					expectName = false;
					const names = open.at(-1);
					if (names === null || names === undefined) continue;
					const raw = text.slice(start, index + 1);
					const name = raw.includes("\\") ? JSON.parse(raw) : raw.slice(1, -1);
					if (open.length === 1) firstObjectMember ??= name;
					if (names.has(name)) return {
						firstObjectMember,
						duplicate: {
							name,
							offset: start
						}
					};
					names.add(name);
					cursor?.member(name, text, index + 1);
					continue;
				}
				switch (text[index]) {
					case "{":
						cursor?.enter(true);
						open.push(new Set());
						expectName = true;
						break;
					case "[":
						cursor?.enter(false);
						open.push(null);
						break;
					case "}":
					case "]":
						cursor?.leave();
						open.pop();
						expectName = false;
						break;
					case ",":
						expectName = open.at(-1) instanceof Set;
						break;
					default: break;
				}
			}
			return {
				firstObjectMember,
				duplicate: undefined
			};
		};
	})))();
}

//#endregion
//#region dist/filesystem/readFileHandleRange.js
var readFileHandleRange;
function init_readFileHandleRange() {
	return (init_readFileHandleRange = __esmMin((() => {
		readFileHandleRange = async (handle, position, length, assertActive = () => {}) => {
			if (!Number.isSafeInteger(position) || position < 0 || !Number.isSafeInteger(length) || length < 0 || !Number.isSafeInteger(position + length)) throw new RangeError("Invalid file read range");
			assertActive(0);
			const bytes = Buffer.alloc(length);
			let filled = 0;
			while (filled < length) {
				assertActive(filled);
				const { bytesRead } = await handle.read(bytes, filled, length - filled, position + filled);
				if (bytesRead === 0) break;
				filled += bytesRead;
				assertActive(filled);
			}
			return bytes.subarray(0, filled);
		};
	})))();
}

//#endregion
//#region dist/domain/exactJsonNumber.js
var isExactJsonNumber, parseExactJson;
function init_exactJsonNumber() {
	return (init_exactJsonNumber = __esmMin((() => {
		init_jsonValue();
		init_safeJson();
		isExactJsonNumber = (value, source) => source !== undefined && isSafeNumber(source) && isSafeNumber(String(value)) && !Object.is(value, -0);
		parseExactJson = (text) => {
			const parsed = safeParseJson(text, (_key, value, context) => {
				if (typeof value === "number" && !isExactJsonNumber(value, context?.source)) throw new RangeError("JSON numeric conversion would lose recorded data");
				return value;
			});
			if (!parsed.ok) return undefined;
			const value = jsonValueSchema.safeParse(parsed.value);
			return value.success ? value.data : undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/excerpt.js
var excerptText, ellipsisExcerpt, formattedEllipsisExcerpt, quotedExcerpt, excerptEnd;
function init_excerpt() {
	return (init_excerpt = __esmMin((() => {
		excerptText = (text) => text;
		ellipsisExcerpt = (text, maximum) => text.length <= maximum ? excerptText(text) : excerptText(`${text.slice(0, excerptEnd(text, maximum))}…`);
		formattedEllipsisExcerpt = (text, maximum, format = (prefix) => prefix) => text.length <= maximum ? excerptText(format(text)) : excerptText(`${format(text.slice(0, excerptEnd(text, maximum)))}…`);
		quotedExcerpt = (text, maximum) => text.length <= maximum ? excerptText(JSON.stringify(text)) : excerptText(`${JSON.stringify(text.slice(0, excerptEnd(text, maximum)))}… (${String(text.length)} UTF-16 code units)`);
		excerptEnd = (text, maximum) => maximum > 0 && /[\uD800-\uDBFF]/u.test(text.charAt(maximum - 1)) ? maximum - 1 : Math.max(0, maximum);
	})))();
}

//#endregion
//#region dist/domain/asarNode.js
var asarDeclaredSizeSchema, RoundedAsarSize, retainRoundedAsarSize, asarNodeSchema;
function init_asarNode() {
	return (init_asarNode = __esmMin((() => {
		init_exactJsonNumber();
		init_excerpt();
		asarDeclaredSizeSchema = z.number().nonnegative().safe();
		RoundedAsarSize = class {
			excerpt;
			constructor(source) {
				this.excerpt = quotedExcerpt(source, 256);
			}
		};
		retainRoundedAsarSize = (owner, value, source) => {
			if (Number.isSafeInteger(value) && value >= 0 && !isExactJsonNumber(value === 0 ? 0 : value, source)) owner.size = new RoundedAsarSize(source);
		};
		asarNodeSchema = z.looseObject({
			files: z.custom((value) => value !== null && typeof value === "object" && !Array.isArray(value)).optional(),
			link: z.string().optional(),
			size: asarDeclaredSizeSchema.optional(),
			offset: z.string().optional(),
			unpacked: z.boolean().optional(),
			executable: z.boolean().optional(),
			integrity: z.looseObject({
				algorithm: z.string(),
				hash: z.string()
			}).optional()
		});
	})))();
}

//#endregion
//#region dist/filesystem/ChangeTimeBaseline.js
var limitsFrom, throwIfAborted, defaultSleep, changeTimeMs, changeTimeMayStillDrift, settleChangeTimeBaseline;
function init_ChangeTimeBaseline() {
	return (init_ChangeTimeBaseline = __esmMin((() => {
		init_windowsChangeTimeSettle();
		init_HostPlatform();
		limitsFrom = (seams) => {
			if (seams.limits !== undefined) return seams.limits;
			const resolved = resolveWindowsChangeTimeSettle(seams.environment ?? process.env);
			if (!resolved.ok) throw resolved.error;
			return applyWindowsChangeTimeSnapshot(resolved.value);
		};
		throwIfAborted = (seams) => {
			if (seams.signal?.aborted !== true) return;
			const reason = seams.signal.reason;
			throw seams.cancellationError ? seams.cancellationError(reason) : reason;
		};
		defaultSleep = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs));
		changeTimeMs = (stats) => typeof stats.ctimeMs === "number" ? stats.ctimeMs : Number.NaN;
		changeTimeMayStillDrift = (stats, seams = {}) => {
			const platform = seams.platform ?? HOST_PLATFORM.platform;
			if (platform !== "win32") return false;
			const changeTime = changeTimeMs(stats);
			if (!Number.isFinite(changeTime)) return true;
			const now = seams.now?.() ?? Date.now();
			return now - changeTime < limitsFrom(seams).driftMs;
		};
		settleChangeTimeBaseline = async (read, seams = {}) => {
			throwIfAborted(seams);
			if ((seams.platform ?? HOST_PLATFORM.platform) !== "win32") {
				const observed = await read();
				throwIfAborted(seams);
				return observed;
			}
			const limits = limitsFrom(seams);
			const settled = {
				...seams,
				limits
			};
			const sleep = seams.sleep ?? defaultSleep;
			let observed = await read();
			for (let poll = 0; poll < limits.maxPolls; poll += 1) {
				throwIfAborted(seams);
				if (!changeTimeMayStillDrift(observed, settled)) return observed;
				await sleep(limits.pollMs);
				throwIfAborted(seams);
				observed = await read();
			}
			throwIfAborted(seams);
			return observed;
		};
	})))();
}

//#endregion
//#region dist/filesystem/OwnedFileHandle.js
var OwnedFileHandleError, OwnedFileHandle;
function init_OwnedFileHandle() {
	return (init_OwnedFileHandle = __esmMin((() => {
		OwnedFileHandleError = class extends Error {
			code;
			_tag = "OwnedFileHandleError";
			constructor(code) {
				super(code);
				this.code = code;
				this.name = "OwnedFileHandleError";
			}
		};
		OwnedFileHandle = class {
			handle;
			#state = { kind: "open" };
			constructor(handle) {
				this.handle = handle;
			}
			/** Close the owned handle, retaining an unconfirmed close as a sticky failure. */
			close() {
				if (this.#state.kind === "closed") return Promise.resolve();
				if (this.#state.kind === "closing") return this.#state.attempt;
				if (this.#state.kind === "failed") return Promise.reject(this.#state.cause);
				if (this.handle.fd < 0) {
					const cause = new OwnedFileHandleError("handle_invalidated");
					this.#state = {
						kind: "failed",
						cause
					};
					return Promise.reject(cause);
				}
				const attempt = Promise.resolve().then(() => this.#attemptClose());
				this.#state = {
					kind: "closing",
					attempt
				};
				return attempt;
			}
			async #attemptClose() {
				try {
					await this.handle.close();
					this.#state = { kind: "closed" };
				} catch (cause) {
					this.#state = this.handle.fd < 0 ? {
						kind: "failed",
						cause
					} : { kind: "open" };
					throw cause;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/filesystem/RegularFile.js
var RegularFileOperationCancelled, assertRegularFileActive, NonRegularFileReadError, RejectedRegularFileSymlink, resolvedRegularFile, RegularFileAdmissionFailure, RegularFileChangedError, UNRESOLVED_PATH_ERROR_CODES, SELECTED_REGULAR_FILE_ERROR_CODES, isSelectedRegularFileError, openRegularFile, nonRegularOpenFailure, errnos, UNOPENABLE_FILE_TYPE_ERRNOS, isUnopenableFileTypeError, regularFileState, sameRegularFileState, assertStableRegularFileIdentity;
function init_RegularFile() {
	return (init_RegularFile = __esmMin((() => {
		init_ChangeTimeBaseline();
		init_OwnedFileHandle();
		RegularFileOperationCancelled = class extends Error {
			reason;
			_tag = "RegularFileOperationCancelled";
			constructor(reason) {
				super("Regular file operation cancelled", { cause: reason });
				this.reason = reason;
				this.name = this._tag;
			}
		};
		assertRegularFileActive = (signal) => {
			if (signal?.aborted === true) throw new RegularFileOperationCancelled(signal.reason);
		};
		NonRegularFileReadError = class extends Error {
			path;
			code;
			constructor(path, directory) {
				super(`Selected input must be a regular file: ${path}`);
				this.path = path;
				this.name = "NonRegularFileReadError";
				this.code = directory ? "EISDIR" : "ENOTFILE";
			}
		};
		RejectedRegularFileSymlink = class extends Error {
			path;
			resolvedPath;
			code = "ELOOP";
			constructor(path, resolvedPath, cause) {
				super(`Selected path is a symbolic link and is not admitted: ${path}`, { cause });
				this.path = path;
				this.resolvedPath = resolvedPath;
				this.name = "RejectedRegularFileSymlink";
			}
		};
		resolvedRegularFile = async (path, fileSystem = {
			realpath,
			lstat
		}) => {
			try {
				const resolved = await fileSystem.realpath?.(path);
				if (resolved === undefined) return undefined;
				const target = await fileSystem.lstat(resolved);
				return target.isFile() && !target.isSymbolicLink() ? resolved : undefined;
			} catch {
				return undefined;
			}
		};
		RegularFileAdmissionFailure = class extends Error {
			path;
			cleanupCause;
			owner;
			cause;
			constructor(path, admissionCause, cleanupCause, owner) {
				super(`Selected input failed admission and its descriptor close failed: ${path}`);
				this.path = path;
				this.cleanupCause = cleanupCause;
				this.owner = owner;
				this.name = "RegularFileAdmissionFailure";
				this.cause = admissionCause;
			}
		};
		RegularFileChangedError = class extends Error {
			path;
			code = "ESTALE";
			constructor(path, options) {
				super(`Selected input changed while being read: ${path}`, options);
				this.path = path;
				this.name = "RegularFileChangedError";
			}
		};
		UNRESOLVED_PATH_ERROR_CODES = new Set([
			"ENOENT",
			"ENOTDIR",
			"ELOOP",
			"ENAMETOOLONG"
		]);
		SELECTED_REGULAR_FILE_ERROR_CODES = new Set([
			...UNRESOLVED_PATH_ERROR_CODES,
			"EISDIR",
			"ENOTFILE",
			"ESTALE"
		]);
		isSelectedRegularFileError = (cause) => {
			if (!(cause instanceof Error)) return false;
			const code = Reflect.get(cause, "code");
			return typeof code === "string" && SELECTED_REGULAR_FILE_ERROR_CODES.has(code);
		};
		openRegularFile = async (path, options) => {
			assertRegularFileActive(options.signal);
			const handle = await open(path, constants.O_RDONLY | (constants.O_NONBLOCK ?? 0) | (constants.O_NOCTTY ?? 0) | (options.symlinks === "reject" ? constants.O_NOFOLLOW ?? 0 : 0)).catch(async (cause) => {
				if (options.symlinks === "reject" && cause instanceof Error && "code" in cause && cause.code === "ELOOP") {
					const named = await lstat(path).catch(() => undefined);
					if (named?.isSymbolicLink()) throw new RejectedRegularFileSymlink(path, await resolvedRegularFile(path), cause);
				}
				const nonRegular = await nonRegularOpenFailure(path, options.symlinks, cause);
				if (nonRegular === undefined) throw cause;
				throw nonRegular;
			});
			const owner = new OwnedFileHandle(handle);
			try {
				assertRegularFileActive(options.signal);
				const readMetadata = async () => {
					assertRegularFileActive(options.signal);
					const observed = await handle.stat();
					if (!observed.isFile()) throw new NonRegularFileReadError(path, observed.isDirectory());
					return observed;
				};
				const metadata = options.changeTime === "as-written" ? await readMetadata() : await settleChangeTimeBaseline(readMetadata, {
					signal: options.signal,
					cancellationError: (reason) => new RegularFileOperationCancelled(reason)
				});
				assertRegularFileActive(options.signal);
				if (options.symlinks === "reject" && (constants.O_NOFOLLOW ?? 0) === 0) {
					const named = await lstat(path);
					if (named.isSymbolicLink()) throw new NonRegularFileReadError(path, false);
					if (!sameRegularFileState(metadata, named)) throw new RegularFileChangedError(path);
					assertRegularFileActive(options.signal);
				}
				return {
					handle,
					initial: metadata
				};
			} catch (cause) {
				try {
					await owner.close();
				} catch (cleanupCause) {
					throw new RegularFileAdmissionFailure(path, cause, cleanupCause, owner);
				}
				throw cause;
			}
		};
		nonRegularOpenFailure = async (path, symlinks, cause) => {
			if (!isUnopenableFileTypeError(cause)) return undefined;
			const metadata = await (symlinks === "reject" ? lstat : stat)(path).catch(() => undefined);
			if (metadata === undefined || metadata.isFile()) return undefined;
			return new NonRegularFileReadError(path, metadata.isDirectory());
		};
		errnos = constants$2.errno;
		UNOPENABLE_FILE_TYPE_ERRNOS = new Set([
			errnos.ENXIO,
			errnos.EOPNOTSUPP,
			errnos.ENOTSUP
		].flatMap((errno) => errno === undefined ? [] : [-errno]));
		isUnopenableFileTypeError = (cause) => cause instanceof Error && "errno" in cause && typeof cause.errno === "number" && UNOPENABLE_FILE_TYPE_ERRNOS.has(cause.errno);
		regularFileState = (stats) => ({
			dev: stats.dev,
			ino: stats.ino,
			size: stats.size,
			mode: stats.mode,
			mtimeMs: stats.mtimeMs,
			ctimeMs: stats.ctimeMs
		});
		sameRegularFileState = (expected, observed) => observed.isFile() && expected.dev === observed.dev && expected.ino === observed.ino && expected.size === observed.size && expected.mode === observed.mode && ("mtimeNs" in expected && "mtimeNs" in observed ? expected.mtimeNs === observed.mtimeNs && expected.ctimeNs === observed.ctimeNs : expected.mtimeMs === observed.mtimeMs && expected.ctimeMs === observed.ctimeMs);
		assertStableRegularFileIdentity = async (file, path, before, options) => {
			assertRegularFileActive(options.signal);
			const bigint = typeof before.dev === "bigint";
			const named = async () => {
				try {
					const lookup = options.symlinks === "follow" ? stat : lstat;
					return bigint ? await lookup(path, { bigint: true }) : await lookup(path);
				} catch (cause) {
					if (isSelectedRegularFileError(cause)) throw new RegularFileChangedError(path, { cause });
					throw cause;
				}
			};
			const selected = await named();
			assertRegularFileActive(options.signal);
			const opened = await file.stat({ bigint });
			assertRegularFileActive(options.signal);
			if (!sameRegularFileState(before, opened) || !sameRegularFileState(before, selected)) throw new RegularFileChangedError(path);
		};
	})))();
}

//#endregion
//#region dist/filesystem/OwnedRegularFile.js
var OwnedRegularFileOperationFailure, RegularFileCancelled, RegularFileCleanupFailure, regularFileCancellation, withOwnedRegularFile, withOwnedFileHandle, retainOwner;
function init_OwnedRegularFile() {
	return (init_OwnedRegularFile = __esmMin((() => {
		init_OwnedFileHandle();
		init_RegularFile();
		OwnedRegularFileOperationFailure = class extends Error {
			operationCause;
			_tag = "OwnedRegularFileOperationFailure";
			constructor(operationCause) {
				super("Owned regular-file operation failed", { cause: operationCause });
				this.operationCause = operationCause;
				this.name = this._tag;
			}
		};
		RegularFileCancelled = class extends Error {
			path;
			owner;
			_tag = "RegularFileCancelled";
			outcome;
			reason;
			constructor(path, owner, completion) {
				super(`Regular file operation cancelled after closing ${path}`, { cause: completion.reason });
				this.path = path;
				this.owner = owner;
				this.name = this._tag;
				this.outcome = completion.outcome;
				this.reason = completion.reason;
			}
		};
		RegularFileCleanupFailure = class extends Error {
			path;
			owner;
			outcome;
			cleanupCause;
			retention;
			completionCancellation;
			operationFailure;
			constructor(facts) {
				const { path, owner, outcome, cleanupCause, retention = { kind: "not_requested" }, completionCancellation, operationFailure } = facts;
				super(`Regular file cleanup failed for ${path}`, { cause: new AggregateError([
					...outcome.kind === "failed" ? [outcome.cause] : [],
					cleanupCause,
					...retention.kind === "callback_threw" ? [retention.cause] : []
				], "File operation and cleanup failures") });
				this.name = "RegularFileCleanupFailure";
				this.path = path;
				this.owner = owner;
				this.outcome = outcome;
				this.cleanupCause = cleanupCause;
				this.retention = retention;
				this.completionCancellation = completionCancellation;
				this.operationFailure = operationFailure;
			}
		};
		regularFileCancellation = (cause) => {
			if (cause instanceof RegularFileCleanupFailure && cause.operationFailure !== undefined) return cause.outcome.kind === "completed" ? cause.completionCancellation : undefined;
			const primary = cause instanceof RegularFileCleanupFailure && cause.outcome.kind === "failed" ? cause.outcome.cause : cause;
			if (primary instanceof RegularFileOperationCancelled || primary instanceof RegularFileCancelled) return { reason: primary.reason };
			return cause instanceof RegularFileCleanupFailure && cause.outcome.kind === "completed" ? cause.completionCancellation : undefined;
		};
		withOwnedRegularFile = async (path, options, operation) => {
			const source = await openRegularFile(path, {
				symlinks: options.symlinks ?? "follow",
				signal: options.signal
			}).catch((cause) => {
				if (!(cause instanceof RegularFileAdmissionFailure)) throw cause;
				const retention = retainOwner(options.retainFailedClose, cause.owner);
				throw new RegularFileCleanupFailure({
					path,
					owner: cause.owner,
					outcome: {
						kind: "failed",
						cause: cause.cause
					},
					cleanupCause: cause.cleanupCause,
					retention
				});
			});
			return withOwnedFileHandle(path, new OwnedFileHandle(source.handle), options, () => operation(source));
		};
		withOwnedFileHandle = async (path, owner, options, operation) => {
			const handle = owner.handle;
			let outcome;
			try {
				assertRegularFileActive(options.signal);
				outcome = {
					kind: "completed",
					value: await operation(handle)
				};
			} catch (cause) {
				outcome = {
					kind: "failed",
					cause
				};
			}
			try {
				await owner.close();
			} catch (cleanupCause) {
				const operationFailure = outcome.kind === "failed" && outcome.cause instanceof OwnedRegularFileOperationFailure ? outcome.cause : undefined;
				const retainedOutcome = operationFailure === undefined ? outcome : {
					kind: "failed",
					cause: operationFailure.operationCause
				};
				const completionCancellation = outcome.kind === "completed" && options.signal?.aborted === true ? { reason: options.signal.reason } : undefined;
				throw new RegularFileCleanupFailure({
					path,
					owner,
					outcome: retainedOutcome,
					cleanupCause,
					retention: retainOwner(options.retainFailedClose, owner),
					completionCancellation,
					operationFailure
				});
			}
			if (outcome.kind === "failed") throw outcome.cause;
			if (options.signal?.aborted === true) throw new RegularFileCancelled(path, owner, {
				outcome,
				reason: options.signal.reason
			});
			return outcome.value;
		};
		retainOwner = (retain, owner) => {
			if (retain === undefined) return { kind: "not_requested" };
			try {
				retain(owner);
				return { kind: "callback_returned" };
			} catch (cause) {
				return {
					kind: "callback_threw",
					cause
				};
			}
		};
	})))();
}

//#endregion
//#region dist/resources/ArtifactReader.js
/**
* Require that an opened entry is one this reader produced, unchanged. Throws
* the `integrity` failure naming `foreign-entry` when the reader has no such
* entry, or `entry-metadata` when the supplied facts differ from it.
*/
function assertProducedEntry(entry, produced, message) {
	if (produced !== undefined && sameArtifactEntry(entry, produced)) return;
	throw new ArtifactReaderFailure("integrity", message, { integrityCheck: produced === undefined ? "foreign-entry" : "entry-metadata" });
}
var sameArtifactSourceIdentity, copyArtifactEntry, sameArtifactEntry, sameDeclaredIntegrity, sameFormatMetadata, ArtifactReaderFailure, artifactFixedLimitFailure, combineCleanup, artifactPrimaryCleanupLeases, ArtifactEntryContentUnavailable;
function init_ArtifactReader() {
	return (init_ArtifactReader = __esmMin((() => {
		init_analysisErrorBase();
		init_errorMessage();
		sameArtifactSourceIdentity = (expected, observed) => expected !== undefined && observed.dev === expected.device && observed.ino === expected.inode && observed.size === expected.size && observed.mode === expected.mode && observed.mtimeNs === expected.mtimeNs && observed.ctimeNs === expected.ctimeNs;
		copyArtifactEntry = (entry) => ({
			...entry,
			limitations: [...entry.limitations],
			declaredIntegrity: entry.declaredIntegrity === null ? null : { ...entry.declaredIntegrity },
			...entry.formatMetadata === undefined ? {} : { formatMetadata: structuredClone(entry.formatMetadata) },
			...entry.sourceIdentity === undefined ? {} : { sourceIdentity: { ...entry.sourceIdentity } }
		});
		sameArtifactEntry = (entry, produced) => entry.path === produced.path && entry.sourcePath === produced.sourcePath && entry.kind === produced.kind && entry.declaredSize === produced.declaredSize && entry.compressedSize === produced.compressedSize && entry.executable === produced.executable && entry.encrypted === produced.encrypted && entry.byteOffset === produced.byteOffset && entry.byteLength === produced.byteLength && sameDeclaredIntegrity(entry.declaredIntegrity, produced.declaredIntegrity) && sameFormatMetadata(entry.formatMetadata, produced.formatMetadata) && entry.unpacked === produced.unpacked && entry.adapterKey === produced.adapterKey && entry.limitations.length === produced.limitations.length && entry.limitations.every((limitation, index) => limitation === produced.limitations[index]) && entry.sourceIdentity?.device === produced.sourceIdentity?.device && entry.sourceIdentity?.inode === produced.sourceIdentity?.inode && entry.sourceIdentity?.size === produced.sourceIdentity?.size && entry.sourceIdentity?.mode === produced.sourceIdentity?.mode && entry.sourceIdentity?.mtimeNs === produced.sourceIdentity?.mtimeNs && entry.sourceIdentity?.ctimeNs === produced.sourceIdentity?.ctimeNs;
		sameDeclaredIntegrity = (left, right) => left === right || left !== null && left !== undefined && right !== null && right !== undefined && left.algorithm === right.algorithm && left.digest === right.digest;
		sameFormatMetadata = (left, right) => {
			if (left === right) return true;
			if (Array.isArray(left) || Array.isArray(right)) return Array.isArray(left) && Array.isArray(right) && left.length === right.length && left.every((value, index) => sameFormatMetadata(value, right[index]));
			if (left === null || right === null || typeof left !== "object" || typeof right !== "object") return false;
			return Object.keys(left).length === Object.keys(right).length && Object.entries(left).every(([key, value]) => Object.hasOwn(right, key) && sameFormatMetadata(value, Reflect.get(right, key)));
		};
		ArtifactReaderFailure = class ArtifactReaderFailure extends Error {
			reason;
			details;
			userMessage;
			resolvedPath;
			cancellation;
			cleanup;
			cleanupLeases;
			partialObservation;
			/** The constrained bound for a `limit` reason, when the reader knows it. */
			boundary;
			/** Named admission for a limit whose public recovery is owned by the producer. */
			admission;
			readerLimit;
			parserLimit;
			fixedAllowance;
			integrityCheck;
			constructor(reason, message, options, details) {
				super(message, options);
				this.reason = reason;
				this.details = details;
				this.name = "ArtifactReaderFailure";
				this.userMessage = options?.userMessage;
				this.resolvedPath = options?.resolvedPath;
				this.cancellation = reason === "cancelled" ? options?.cancellation ?? { reason: options?.cause } : undefined;
				this.cleanup = options?.cleanup;
				this.cleanupLeases = options?.cleanupLeases ?? (this.cleanup === undefined ? [] : undefined);
				this.partialObservation = options?.partialObservation;
				this.boundary = options?.boundary;
				this.admission = options?.admission;
				this.readerLimit = options?.readerLimit;
				this.parserLimit = options?.parserLimit;
				this.fixedAllowance = options?.fixedAllowance;
				this.integrityCheck = options?.integrityCheck;
			}
			/**
			* Reader-owned facts a rebuilt failure must keep. Each rebuild chooses its
			* own cause, cleanup, cancellation and partial observation.
			*/
			primaryFacts() {
				return {
					...this.userMessage === undefined ? {} : { userMessage: this.userMessage },
					...this.resolvedPath === undefined ? {} : { resolvedPath: this.resolvedPath },
					...this.boundary === undefined ? {} : { boundary: this.boundary },
					...this.admission === undefined ? {} : { admission: this.admission },
					...this.readerLimit === undefined ? {} : { readerLimit: this.readerLimit },
					...this.parserLimit === undefined ? {} : { parserLimit: this.parserLimit },
					...this.fixedAllowance === undefined ? {} : { fixedAllowance: this.fixedAllowance },
					integrityCheck: this.integrityCheck
				};
			}
			/** Retain completed facts when a later artifact step fails. */
			retainPartialObservation(observation) {
				this.partialObservation ??= observation;
				return this;
			}
			/** Preserve the primary failure and observation. Supplied leases must cover all merged cleanup. */
			static withCleanup(cause, cleanup, partialObservation, cleanupLeases) {
				const primary = cause instanceof ArtifactReaderFailure ? cause : new ArtifactReaderFailure("io", errorMessage(cause), {
					cause,
					...cause instanceof AnalysisError ? {
						partialObservation: cause.partialObservation,
						...cause.cleanupIncomplete ? { cleanup: ArtifactReaderFailure.cleanupObservation(cause, []) } : {}
					} : {}
				});
				const mergedObservation = partialObservation ?? primary.partialObservation;
				return new ArtifactReaderFailure(primary.reason, primary.message, {
					cause: primary,
					...primary.primaryFacts(),
					cancellation: primary.cancellation,
					cleanup: combineCleanup(primary.cleanup, cleanup),
					cleanupLeases: cleanupLeases ?? (cleanup === primary.cleanup ? primary.cleanupLeases : undefined),
					...mergedObservation === undefined ? {} : { partialObservation: mergedObservation }
				}, primary.details);
			}
			/** Give otherwise opaque cleanup failures a concrete owned resource. */
			static cleanupObservation(cause, resource) {
				if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) return cause.cleanup;
				if (cause instanceof AnalysisError && cause.cleanupIncomplete) return {
					reason: cause.cleanup?.reason ?? cause.message,
					resources: [...cause.cleanupResources]
				};
				return {
					reason: errorMessage(cause),
					resources: typeof resource === "string" ? [resource] : [...resource]
				};
			}
		};
		artifactFixedLimitFailure = (allowance, outcome, boundary = "capacity", options) => new ArtifactReaderFailure("limit", outcome, {
			...options,
			boundary,
			userMessage: outcome,
			fixedAllowance: allowance
		});
		combineCleanup = (primary, cleanup) => primary === undefined || primary === cleanup ? cleanup : {
			reason: `${primary.reason}; ${cleanup.reason}`,
			resources: [...new Set([...primary.resources, ...cleanup.resources])]
		};
		artifactPrimaryCleanupLeases = (cause) => cause instanceof ArtifactReaderFailure ? cause.cleanupLeases : cause instanceof AnalysisError && cause.cleanupIncomplete ? undefined : [];
		ArtifactEntryContentUnavailable = class extends ArtifactReaderFailure {
			limitation;
			traversal;
			constructor(message, limitation, options, details) {
				super("unavailable", message, options, details);
				this.limitation = limitation;
				this.traversal = options?.traversal;
			}
		};
	})))();
}

//#endregion
//#region dist/resources/AnalysisCleanupLease.js
var AnalysisCleanupLease, AnalysisCleanupLeaseGroup;
function init_AnalysisCleanupLease() {
	return (init_AnalysisCleanupLease = __esmMin((() => {
		AnalysisCleanupLease = class AnalysisCleanupLease {
			cleanup;
			#released = false;
			#releasePromise;
			#groups = new Set();
			/** Whether this exact owner has confirmed release. */
			get released() {
				return this.#released;
			}
			#resourceOwner;
			#resources;
			get cleanupResources() {
				if (this.#released) return [];
				return this.#resourceOwner === undefined ? this.#resources : this.#resourceOwner.cleanupResources;
			}
			/** Adopt exact close authority while retaining its live labels across retries. */
			static forCloseOwner(owner, resource) {
				return new AnalysisCleanupLease(() => owner.close(), !("cleanupResources" in owner) ? [resource] : { get cleanupResources() {
					return owner.cleanupResources;
				} });
			}
			constructor(cleanup, resources) {
				this.cleanup = cleanup;
				if (resources !== undefined && "cleanupResources" in resources) {
					this.#resourceOwner = resources;
					this.#resources = undefined;
				} else {
					this.#resourceOwner = undefined;
					this.#resources = resources === undefined ? undefined : [...resources];
				}
			}
			release() {
				if (this.#released) return Promise.resolve();
				if (this.#releasePromise !== undefined) return this.#releasePromise;
				const attempt = Promise.resolve().then(async () => {
					await this.cleanup();
					this.#released = true;
					for (const group of this.#groups) group.ownerReleased(this);
					this.#groups.clear();
				}).finally(() => {
					if (this.#releasePromise === attempt) this.#releasePromise = undefined;
				});
				this.#releasePromise = attempt;
				return attempt;
			}
			/** Binding can follow a concurrent retry that already confirmed release. */
			bindCleanupError(error) {
				new AnalysisCleanupLeaseGroup(error, [this], { preserveResourceAttribution: true });
			}
			/** Bind one aggregate error to every exact lease in a failed retry set. */
			bindCleanupGroup(group) {
				if (this.#released) {
					group.ownerReleased(this);
					return;
				}
				for (const retained of this.#groups) if (!retained.hasLiveError) this.#groups.delete(retained);
				this.#groups.add(group);
			}
		};
		AnalysisCleanupLeaseGroup = class {
			#error;
			#pending;
			constructor(error, owners, options = {}) {
				this.#error = new WeakRef(error);
				this.#pending = new Set(owners);
				if (this.#pending.size === 0) return;
				error.bindCleanupReleaseClaim(this);
				if (options.preserveResourceAttribution === true) error.bindCleanupCompletionOwner(this);
				else error.bindCleanupResourceOwner(this);
				for (const owner of this.#pending) owner.bindCleanupGroup(this);
			}
			/** Unlabelled owners keep attribution unknown; never match resources by text. */
			get cleanupResources() {
				if ([...this.#pending].some((owner) => owner.cleanupResources === undefined)) return undefined;
				return [...new Set([...this.#pending].flatMap((owner) => owner.cleanupResources ?? []))];
			}
			get hasLiveError() {
				return this.#error.deref() !== undefined;
			}
			/** Every owner in the set confirmed release. */
			get cleanupReleased() {
				return this.#pending.size === 0;
			}
			ownerReleased(owner) {
				this.#pending.delete(owner);
			}
		};
	})))();
}

//#endregion
//#region dist/resources/ArtifactFileOperation.js
var ArtifactFileCleanupFailure, artifactSelectedPathErrno, mapArtifactFileFailure, artifactFilePrimaryFacts, ArtifactFileCancelled, artifactFileCompletion, bindArtifactFileCleanup, artifactFileCancellationCause, assertArtifactReadActive, yieldArtifactRead, artifactParseFailure, artifactReadCancelledBy, withArtifactRegularFile, withArtifactFileHandle, artifactOperationCause;
function init_ArtifactFileOperation() {
	return (init_ArtifactFileOperation = __esmMin((() => {
		init_RegularFile();
		init_OwnedFileHandle();
		init_OwnedRegularFile();
		init_ArtifactReader();
		init_AnalysisCleanupLease();
		init_parseFailure();
		init_errorMessage();
		ArtifactFileCleanupFailure = class extends ArtifactReaderFailure {
			cleanupLease;
			cleanupLeases;
			fileCleanupFailure;
			constructor(fileCleanupFailure, cleanupLease) {
				const outcome = fileCleanupFailure.outcome;
				if (fileCleanupFailure.operationFailure === undefined && outcome.kind === "failed" && outcome.cause instanceof RegularFileOperationCancelled) fileCleanupFailure = new RegularFileCleanupFailure({
					...fileCleanupFailure,
					outcome: {
						kind: "failed",
						cause: artifactOperationCause(outcome.cause)
					}
				});
				const completionCancellation = fileCleanupFailure.completionCancellation;
				const primary = fileCleanupFailure.outcome.kind === "failed" ? fileCleanupFailure.outcome.cause : completionCancellation === undefined ? fileCleanupFailure.cleanupCause : new ArtifactReaderFailure("cancelled", "Artifact read cancelled during close", { cause: completionCancellation.reason });
				const projected = ArtifactReaderFailure.withCleanup(fileCleanupFailure.operationFailure !== undefined && fileCleanupFailure.outcome.kind === "failed" && Object.is(primary, fileCleanupFailure.operationFailure.operationCause) ? new ArtifactReaderFailure("io", errorMessage(primary), { cause: primary }) : primary, ArtifactReaderFailure.cleanupObservation(fileCleanupFailure.cleanupCause, fileCleanupFailure.path));
				super(projected.reason, projected.message, {
					cause: fileCleanupFailure,
					cleanup: projected.cleanup,
					partialObservation: projected.partialObservation,
					cancellation: projected.cancellation,
					...projected.primaryFacts()
				}, projected.details);
				this.cleanupLease = cleanupLease;
				this.fileCleanupFailure = fileCleanupFailure;
				const inherited = fileCleanupFailure.operationFailure === undefined && fileCleanupFailure.outcome.kind === "failed" ? artifactPrimaryCleanupLeases(fileCleanupFailure.outcome.cause) : [];
				this.cleanupLeases = inherited === undefined ? undefined : [...new Set([cleanupLease, ...inherited])];
			}
		};
		artifactSelectedPathErrno = (cause) => {
			if (!(cause instanceof Error) || !("code" in cause)) return undefined;
			switch (String(cause.code)) {
				case "ENOENT": return "ENOENT";
				case "ENOTDIR": return "ENOTDIR";
				case "ELOOP": return "ELOOP";
				case "ENAMETOOLONG": return "ENAMETOOLONG";
				default: return undefined;
			}
		};
		mapArtifactFileFailure = (cause, classify) => {
			if (!(cause instanceof ArtifactFileCleanupFailure)) return classify(cause);
			const physical = cause.fileCleanupFailure;
			if (physical.outcome.kind !== "failed") return cause;
			const primary = physical.operationFailure === undefined && physical.outcome.cause instanceof ArtifactFileCleanupFailure ? mapArtifactFileFailure(physical.outcome.cause, classify) : classify(physical.outcome.cause);
			if (Object.is(primary, physical.outcome.cause)) return cause;
			return new ArtifactFileCleanupFailure(new RegularFileCleanupFailure({
				...physical,
				outcome: {
					kind: "failed",
					cause: primary
				}
			}), cause.cleanupLease);
		};
		artifactFilePrimaryFacts = (cause) => {
			while (cause instanceof ArtifactFileCleanupFailure) {
				const physical = cause.fileCleanupFailure;
				if (physical.outcome.kind !== "failed") break;
				cause = physical.outcome.cause;
				if (physical.operationFailure !== undefined) return {
					cause,
					origin: Object.is(cause, physical.operationFailure.operationCause) ? "opaque-operation" : "owned-or-classified"
				};
			}
			return {
				cause,
				origin: "owned-or-classified"
			};
		};
		ArtifactFileCancelled = class extends ArtifactReaderFailure {
			fileCancellation;
			constructor(fileCancellation) {
				super("cancelled", "Artifact read cancelled", { cause: fileCancellation.reason });
				this.fileCancellation = fileCancellation;
			}
		};
		artifactFileCompletion = (cause) => {
			if (cause instanceof ArtifactFileCancelled) return {
				...cause.fileCancellation.outcome,
				cancellation: { reason: cause.fileCancellation.reason }
			};
			if (cause instanceof ArtifactFileCleanupFailure && cause.fileCleanupFailure.outcome.kind === "completed") return {
				...cause.fileCleanupFailure.outcome,
				cancellation: cause.fileCleanupFailure.completionCancellation
			};
			return undefined;
		};
		bindArtifactFileCleanup = (cause, error) => {
			const leases = cause instanceof ArtifactReaderFailure ? cause.cleanupLeases : undefined;
			if (leases !== undefined) new AnalysisCleanupLeaseGroup(error, leases);
		};
		artifactFileCancellationCause = (cause) => {
			return cause.cancellation === undefined ? cause.cause : cause.cancellation.reason;
		};
		assertArtifactReadActive = (signal) => {
			if (signal?.aborted) throw new ArtifactReaderFailure("cancelled", "Artifact read cancelled", { cause: signal.reason });
		};
		yieldArtifactRead = async (signal) => {
			await scheduler.yield();
			assertArtifactReadActive(signal);
		};
		artifactParseFailure = (cause, signal, limitBoundary) => {
			if (signal?.aborted === true && Object.is(cause, signal.reason)) return new ArtifactReaderFailure("cancelled", "Artifact read cancelled", { cause });
			if (!(cause instanceof ParseFailureError)) return cause;
			const { failure } = cause;
			if (failure.kind === "limit") {
				const boundary = limitBoundary?.(failure.limit);
				return new ArtifactReaderFailure("limit", cause.message, {
					cause,
					parserLimit: failure.limit,
					...boundary === undefined ? {} : { boundary }
				});
			}
			return new ArtifactReaderFailure(failure.kind, cause.message, { cause });
		};
		artifactReadCancelledBy = (cause, signal) => signal?.aborted === true && cause instanceof ArtifactReaderFailure && cause.reason === "cancelled" && cause.cleanup === undefined && Object.is(cause.cancellation?.reason, signal.reason);
		withArtifactRegularFile = async (path, resources, signal, operation, symlinks = "reject") => {
			let cleanupLease;
			assertArtifactReadActive(signal);
			try {
				const value = await withOwnedRegularFile(path, {
					symlinks,
					...signal === undefined ? {} : { signal },
					retainFailedClose: (owner) => {
						cleanupLease = new AnalysisCleanupLease(() => owner.close(), [path]);
						resources.retain({
							kind: "lease",
							resource: path,
							lease: cleanupLease
						});
					}
				}, async (source) => {
					assertArtifactReadActive(signal);
					return await operation(source);
				});
				return value;
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure && cleanupLease !== undefined) throw new ArtifactFileCleanupFailure(cause, cleanupLease);
				if (cause instanceof RegularFileCancelled) throw new ArtifactFileCancelled(cause);
				throw artifactOperationCause(cause);
			}
		};
		withArtifactFileHandle = async (path, file, resources, signal, operation) => {
			const owner = file instanceof OwnedFileHandle ? file : new OwnedFileHandle(file);
			const cleanupLease = AnalysisCleanupLease.forCloseOwner(owner, path);
			try {
				return await withOwnedFileHandle(path, owner, {
					...signal === undefined ? {} : { signal },
					retainFailedClose: () => resources?.retain({
						kind: "lease",
						resource: path,
						lease: cleanupLease
					})
				}, operation);
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure) throw new ArtifactFileCleanupFailure(cause, cleanupLease);
				if (cause instanceof RegularFileCancelled) throw new ArtifactFileCancelled(cause);
				throw artifactOperationCause(cause);
			}
		};
		artifactOperationCause = (cause) => cause instanceof RegularFileOperationCancelled ? new ArtifactReaderFailure("cancelled", "Artifact file operation cancelled", { cause: cause.reason }) : cause;
	})))();
}

//#endregion
//#region dist/resources/AsarHeader.js
var resolveAsarHeaderAdmission, MEBIBYTE, byteAllowance, asarHeaderAdmissionRecovery, asarHeaderAdmissionFailure, asarHeaderProbeBytes, parseAsarHeaderExtents, AsarHeaderSignatureProbeImpl, isJsonWhitespace, admitAsarHeader, createAsarHeaderSignatureProbe, readAsarHeader;
function init_AsarHeader() {
	return (init_AsarHeader = __esmMin((() => {
		init_readFileHandleRange();
		init_jsonDuplicateMember();
		init_asarNode();
		init_ArtifactFileOperation();
		init_ArtifactReader();
		init_result();
		init_asarHeaderAdmission();
		init_analysisResourceLimits();
		init_asarListingAdmission();
		init_strictUtf8();
		init_binaryContainer();
		resolveAsarHeaderAdmission = (environment) => {
			const parsed = parseAsarHeaderAdmission(environment[ASAR_HEADER_ADMISSION_SETTING]);
			if (!parsed.ok) throw parsed.error;
			const listing = parseAsarListingAdmission(environment.REA_ASAR_MAX_LISTING_BYTES);
			if (!listing.ok) throw listing.error;
			return {
				...parsed.value,
				listing: listing.value
			};
		};
		MEBIBYTE = 1024 * 1024;
		byteAllowance = (bytes) => {
			const mebibytes = bytes / MEBIBYTE;
			return Number.isInteger(mebibytes) ? `${String(mebibytes)} MiB / ${String(bytes)} bytes` : `${String(bytes)} bytes`;
		};
		asarHeaderAdmissionRecovery = (admission) => [
			`ASAR header/index admission is limited to ${byteAllowance(admission.maximumBytes)}${admission.source === "setting" ? ` by ${ASAR_HEADER_ADMISSION_SETTING}` : ""}.`,
			`On MCP, call update_analysis_settings with setting asar.max_header_bytes, action set, and a value in bytes up to ${byteAllowance(MAXIMUM_ASAR_MAX_HEADER_BYTES)} (default ${byteAllowance(DEFAULT_ASAR_MAX_HEADER_BYTES)}), then retry the original request. It applies to the next operation without restarting REA. For CLI or future REA processes, set ${ASAR_HEADER_ADMISSION_SETTING} in the launch environment.`,
			"Selecting fewer sources or narrowing an internal path does not bypass header admission, because the archive index is read before any member can be selected.",
			"Raising max_heap_mb or available host memory does not raise it.",
			"Alternatively, analyze an extracted application directory, which does not admit an ASAR header.",
			"Repeating the unchanged request fails the same way."
		].join(" ");
		asarHeaderAdmissionFailure = (admission, requiredBytes) => new ArtifactReaderFailure("limit", asarHeaderAdmissionRecovery(admission), { admission: {
			kind: "asar-header",
			...admission,
			...requiredBytes === undefined ? {} : { requiredBytes }
		} });
		asarHeaderProbeBytes = (admission) => admission.maximumBytes + 8;
		parseAsarHeaderExtents = (prefix, archiveBytes) => {
			if (prefix.byteLength < 16) return err(new ArtifactReaderFailure("format", "Truncated ASAR Pickle extent prefix"));
			const reader = new BinaryReader(Buffer.from(prefix.buffer, prefix.byteOffset, 16), true, "asar");
			const headerBytes = reader.u32(4);
			const payloadBytes = reader.u32(8);
			const jsonBytes = reader.u32(12);
			if (reader.u32(0) !== 4 || headerBytes < 8 || payloadBytes !== headerBytes - 4 || jsonBytes > payloadBytes - 4) return err(new ArtifactReaderFailure("format", "ASAR header has invalid Pickle extents"));
			if (archiveBytes !== undefined && (!Number.isSafeInteger(archiveBytes) || archiveBytes < 8 || headerBytes > archiveBytes - 8)) return err(new ArtifactReaderFailure("format", "ASAR header leaves its observed container"));
			return ok({
				headerBytes,
				jsonBytes
			});
		};
		AsarHeaderSignatureProbeImpl = class {
			admission;
			limit;
			#fixed = Buffer.alloc(16);
			#fixedBytes = 0;
			#scannedJsonBytes = 0;
			#extents;
			#stop = { state: "pending" };
			constructor(admission) {
				this.admission = admission;
				this.limit = asarHeaderProbeBytes(admission);
			}
			get observation() {
				return this.#observation();
			}
			/** Consume sequential archive bytes without retaining JSON or member data. */
			write(input) {
				if (this.#stop.state === "finalized") return this.#stop.observation;
				const bytes = Buffer.from(input.buffer, input.byteOffset, input.byteLength);
				let offset = 0;
				while (offset < bytes.length && !this.#isTerminal()) {
					if (this.#fixedBytes < this.#fixed.length) {
						const count = Math.min(this.#fixed.length - this.#fixedBytes, bytes.length - offset);
						bytes.copy(this.#fixed, this.#fixedBytes, offset, offset + count);
						this.#fixedBytes += count;
						offset += count;
						if (this.#fixedBytes === this.#fixed.length) this.#parseFixed();
						continue;
					}
					const extents = this.#extents;
					if (extents === undefined || this.#stop.state === "matched") break;
					const jsonRemaining = extents.jsonBytes - this.#scannedJsonBytes;
					if (jsonRemaining <= 0) {
						this.#stop = {
							state: "rejected",
							reason: "json-not-object"
						};
						break;
					}
					const archiveBytesScanned = 16 + this.#scannedJsonBytes;
					if (archiveBytesScanned >= this.limit) {
						this.#stop = { state: "limit" };
						break;
					}
					const count = Math.min(bytes.length - offset, jsonRemaining, this.limit - archiveBytesScanned);
					for (let index = 0; index < count; index += 1) {
						const value = bytes[offset + index];
						if (!isJsonWhitespace(value)) {
							if (value === 123) this.#stop = {
								state: "matched",
								signatureOffset: 16 + this.#scannedJsonBytes,
								extents
							};
							else this.#stop = {
								state: "rejected",
								reason: "json-not-object"
							};
							break;
						}
						this.#scannedJsonBytes += 1;
					}
					offset += count;
					if (this.#stop.state !== "pending") break;
					if (this.#scannedJsonBytes >= extents.jsonBytes) {
						this.#stop = {
							state: "rejected",
							reason: "json-not-object"
						};
						break;
					}
					if (16 + this.#scannedJsonBytes >= this.limit) this.#stop = { state: "limit" };
				}
				return this.#observation();
			}
			/** Finalize against the actual byte count; a signature alone is not validity. */
			finish(archiveBytes) {
				if (this.#stop.state === "finalized") return this.#stop.observation;
				if (this.#fixedBytes < this.#fixed.length) {
					this.#stop = {
						state: "rejected",
						reason: "invalid-pickle-extents"
					};
				} else if (this.#extents !== undefined) {
					if (!Number.isSafeInteger(archiveBytes) || archiveBytes < 8 || this.#extents.headerBytes > archiveBytes - 8) {
						this.#stop = {
							state: "rejected",
							reason: "archive-too-short"
						};
					} else if (this.#extents.headerBytes > this.admission.maximumBytes && this.#stop.state === "matched") {
						this.#stop = { state: "limit" };
					}
				}
				const observation = this.#observation(archiveBytes);
				this.#stop = {
					state: "finalized",
					observation
				};
				return observation;
			}
			#parseFixed() {
				const result = parseAsarHeaderExtents(this.#fixed);
				if (!result.ok) {
					this.#stop = {
						state: "rejected",
						reason: "invalid-pickle-extents"
					};
					return;
				}
				this.#extents = result.value;
				if (this.#extents.jsonBytes === 0) this.#stop = {
					state: "rejected",
					reason: "json-not-object"
				};
			}
			#isTerminal() {
				return this.#stop.state !== "pending";
			}
			#observation(archiveBytes) {
				if (this.#stop.state === "finalized") return this.#stop.observation;
				const extents = this.#extents === undefined ? undefined : archiveBytes === undefined ? this.#extents : {
					archiveBytes,
					...this.#extents
				};
				switch (this.#stop.state) {
					case "rejected": return {
						state: "rejected",
						reason: this.#stop.reason,
						...extents === undefined ? {} : { extents },
						scannedJsonBytes: this.#scannedJsonBytes
					};
					case "limit": return {
						state: "limit",
						...extents === undefined ? {} : { extents },
						scannedJsonBytes: this.#scannedJsonBytes,
						limitBytes: this.limit,
						admission: this.admission
					};
					case "matched": return {
						state: "matched",
						extents: archiveBytes === undefined ? this.#stop.extents : {
							archiveBytes,
							...this.#stop.extents
						},
						signatureOffset: this.#stop.signatureOffset,
						scannedJsonBytes: this.#scannedJsonBytes
					};
					case "pending":
						if (archiveBytes !== undefined && this.#extents !== undefined) {
							const finalizedExtents = {
								archiveBytes,
								...this.#extents
							};
							if (this.#scannedJsonBytes >= this.#extents.jsonBytes) return {
								state: "rejected",
								reason: "json-not-object",
								extents: finalizedExtents,
								scannedJsonBytes: this.#scannedJsonBytes
							};
							return {
								state: "limit",
								extents: finalizedExtents,
								scannedJsonBytes: this.#scannedJsonBytes,
								limitBytes: this.limit,
								admission: this.admission
							};
						}
						return {
							state: "pending",
							...extents === undefined ? {} : { extents },
							scannedJsonBytes: this.#scannedJsonBytes
						};
				}
			}
		};
		isJsonWhitespace = (value) => value === 32 || value === 9 || value === 10 || value === 13;
		admitAsarHeader = async (handle, signal, admission = DEFAULT_ASAR_HEADER_ADMISSION) => {
			assertArtifactReadActive(signal);
			const observed = await handle.stat();
			assertArtifactReadActive(signal);
			if (!observed.isFile()) throw new ArtifactReaderFailure("format", "ASAR container is not a regular file");
			const prefix = await readFileHandleRange(handle, 0, 16, () => assertArtifactReadActive(signal));
			assertArtifactReadActive(signal);
			if (prefix.length !== 16) throw new ArtifactReaderFailure("format", "Truncated ASAR size pickle");
			const parsed = parseAsarHeaderExtents(prefix, observed.size);
			if (!parsed.ok) throw parsed.error;
			if (parsed.value.headerBytes > admission.maximumBytes) throw asarHeaderAdmissionFailure(admission, parsed.value.headerBytes);
			return {
				archiveBytes: observed.size,
				...parsed.value
			};
		};
		createAsarHeaderSignatureProbe = (admission = DEFAULT_ASAR_HEADER_ADMISSION) => new AsarHeaderSignatureProbeImpl(admission);
		readAsarHeader = async (handle, extents, signal) => {
			const bytes = await readFileHandleRange(handle, 16, extents.jsonBytes, () => assertArtifactReadActive(signal));
			assertArtifactReadActive(signal);
			if (bytes.length !== extents.jsonBytes) throw new ArtifactReaderFailure("format", "Truncated ASAR JSON header");
			let json;
			try {
				json = strictUtf8Decoder("preserve").decode(bytes);
			} catch (cause) {
				throw new ArtifactReaderFailure("format", "ASAR JSON header is not valid UTF-8", { cause });
			}
			const parsed = parseJsonWithDuplicatePolicy(json, "reject", {
				name: "size",
				read: retainRoundedAsarSize
			});
			if (!parsed.ok) {
				if (parsed.duplicate !== undefined) throw new ArtifactReaderFailure("format", `ASAR JSON header declares member ${JSON.stringify(parsed.duplicate.name)} more than once in one object (offset ${String(parsed.duplicate.offset)})`);
				throw parsed.cause;
			}
			return parsed.value;
		};
	})))();
}

//#endregion
//#region dist/resources/ArtifactFileAdmission.js
var artifactFileAdmissionFailure;
function init_ArtifactFileAdmission() {
	return (init_ArtifactFileAdmission = __esmMin((() => {
		init_RegularFile();
		init_ArtifactReader();
		artifactFileAdmissionFailure = (path, diagnosticLabel, cause) => {
			if (cause instanceof ArtifactReaderFailure) return cause;
			if (cause instanceof RegularFileOperationCancelled) return new ArtifactReaderFailure("cancelled", `${diagnosticLabel} admission cancelled`, { cause: cause.reason });
			if (cause instanceof RegularFileAdmissionFailure) return ArtifactReaderFailure.withCleanup(artifactFileAdmissionFailure(path, diagnosticLabel, cause.cause), ArtifactReaderFailure.cleanupObservation(cause.cleanupCause, path));
			if (cause instanceof RegularFileChangedError) return new ArtifactReaderFailure("integrity", `${diagnosticLabel} source changed during admission: ${path}`, {
				cause,
				integrityCheck: "container-identity"
			});
			if (cause instanceof NonRegularFileReadError) return new ArtifactReaderFailure("format", `${diagnosticLabel} source is not a regular file: ${path}`, { cause });
			return new ArtifactReaderFailure("io", cause instanceof Error ? cause.message : `Cannot admit ${diagnosticLabel} source: ${path}`, { cause });
		};
	})))();
}

//#endregion
//#region dist/filesystem/readFileHandleChunks.js
var FileReadCancelled, readFileHandleChunks, fileOffset;
function init_readFileHandleChunks() {
	return (init_readFileHandleChunks = __esmMin((() => {
		FileReadCancelled = class extends Error {
			reason;
			constructor(reason) {
				super("File read cancelled", { cause: reason });
				this.reason = reason;
				this.name = "FileReadCancelled";
			}
		};
		readFileHandleChunks = (handle, options = {}) => {
			const start = fileOffset(options.start ?? 0);
			const unlimited = options.end === undefined || options.end === Infinity;
			const end = unlimited ? undefined : fileOffset(options.end);
			if (start === undefined || !unlimited && end === undefined || end !== undefined && end < start) throw new RangeError("Invalid file read range");
			let readState = "idle";
			let totalBytes = 0n;
			let coverage;
			const cancellationFailure = () => options.cancellationFailure?.(options.signal?.reason) ?? new FileReadCancelled(options.signal?.reason);
			const assertActive = () => {
				if (options.signal?.aborted) throw cancellationFailure();
			};
			const source = Readable.from((async function* () {
				let position = start;
				while (end === undefined || position <= end) {
					assertActive();
					const remaining = end === undefined ? undefined : end - position + 1n;
					const chunk = Buffer.allocUnsafe(remaining === undefined || remaining > 64n * 1024n ? 64 * 1024 : Number(remaining));
					readState = "pending";
					let bytesRead;
					try {
						({bytesRead} = await handle.read(chunk, 0, chunk.length, position));
						readState = "idle";
					} catch (cause) {
						readState = "failed";
						throw cause;
					}
					totalBytes += BigInt(bytesRead);
					if (bytesRead === 0) coverage = Object.freeze({
						kind: "complete",
						bytes: totalBytes,
						boundary: "eof"
					});
					else if (end !== undefined && position + BigInt(bytesRead) > end) coverage = Object.freeze({
						kind: "complete",
						bytes: totalBytes,
						boundary: "range"
					});
					assertActive();
					if (bytesRead === 0) return;
					position += BigInt(bytesRead);
					yield chunk.subarray(0, bytesRead);
				}
			})(), { objectMode: false });
			const onAbort = () => {
				if (readState === "idle" && !source.destroyed) source.destroy(cancellationFailure());
			};
			options.signal?.addEventListener("abort", onAbort, { once: true });
			source.once("close", () => options.signal?.removeEventListener("abort", onAbort));
			if (options.signal?.aborted) onAbort();
			return Object.assign(source, { readCoverage: () => coverage ?? Object.freeze({
				kind: "incomplete",
				bytes: totalBytes
			}) });
		};
		fileOffset = (value) => {
			if (typeof value === "bigint") return value >= 0n ? value : undefined;
			return Number.isSafeInteger(value) && value >= 0 ? BigInt(value) : undefined;
		};
	})))();
}

//#endregion
//#region dist/resources/ArtifactResourceScope.js
var ArtifactResourceRetryFailure, ArtifactResourceScope, cleanup;
function init_ArtifactResourceScope() {
	return (init_ArtifactResourceScope = __esmMin((() => {
		init_result();
		init_ArtifactReader();
		init_AnalysisCleanupLease();
		init_errorMessage();
		ArtifactResourceRetryFailure = class extends ArtifactReaderFailure {
			failedOwners;
			cleanupLeases;
			constructor(failures, message, options) {
				super("unavailable", message, options);
				this.failedOwners = failures.map(({ owner }) => owner);
				this.cleanupLeases = [...new Set(failures.map(({ lease }) => lease))];
			}
		};
		ArtifactResourceScope = class {
			#pending = new Set();
			#leases = new WeakMap();
			#active = new Set();
			#draining;
			#closeInFlight;
			#closeHooks = [];
			#closed = false;
			get hasPending() {
				return this.#pending.size > 0;
			}
			/** Labels come from the exact retained owners, never from diagnostic text. */
			get cleanupResources() {
				return [...new Set([...this.#pending].flatMap((owner) => {
					const lease = this.#lease(owner);
					return lease.released ? [] : lease.cleanupResources ?? [owner.resource];
				}))];
			}
			/** Admit a resource operation while the scope remains open. */
			async run(operation) {
				while (true) {
					if (this.#closed) throw new ArtifactReaderFailure("unavailable", "Artifact resource scope is closed");
					if (this.#draining !== undefined) await this.#draining;
					if (this.#closed) throw new ArtifactReaderFailure("unavailable", "Artifact resource scope is closed");
					if (this.#pending.size > 0) {
						await this.retryCleanup();
						continue;
					}
					return this.#track(operation);
				}
			}
			/**
			* Run optional work, such as diagnostic sampling, that may retain owners but
			* must not wait for or fail on earlier pending cleanup. Cleanup drains still
			* join it, so an owner it retains is not left behind by a finished drain.
			*/
			track(operation) {
				if (this.#closed) return Promise.reject(new ArtifactReaderFailure("unavailable", "Artifact resource scope is closed"));
				return this.#track(operation);
			}
			async #track(operation) {
				const running = Promise.resolve().then(operation);
				this.#active.add(running);
				try {
					return await running;
				} finally {
					this.#active.delete(running);
				}
			}
			/** Attempt cleanup now and retain the same owner if it fails. */
			async release(owner) {
				try {
					await this.#lease(owner).release();
					this.#pending.delete(owner);
					return { kind: "released" };
				} catch (cause) {
					this.#pending.add(owner);
					this.#observeCleanupFailure(owner, cause);
					return {
						kind: "failed",
						cause,
						owner,
						lease: this.#lease(owner)
					};
				}
			}
			/** Compose initial cleanup authority without confusing it with an independent primary. */
			cleanupFailure(outcome, failures, partialObservation) {
				const observations = failures.map(({ cause, owner }) => ArtifactReaderFailure.cleanupObservation(cause, owner.resource));
				const primary = outcome.kind === "failed" ? outcome.cause : failures[0].cause;
				const inherited = outcome.kind === "failed" ? artifactPrimaryCleanupLeases(primary) : [];
				return ArtifactReaderFailure.withCleanup(primary, {
					reason: observations.map(({ reason }) => reason).join("; "),
					resources: [...new Set(observations.flatMap(({ resources }) => resources))]
				}, partialObservation, inherited === undefined ? undefined : [...new Set([...inherited, ...failures.map(({ lease }) => lease)])]);
			}
			/** Adopt an owner after another boundary's cleanup attempt failed. */
			retain(owner) {
				this.#pending.add(owner);
			}
			/** Retry retained owners without closing resource admission. */
			retryCleanup() {
				if (this.#draining !== undefined) return this.#draining;
				this.#draining = this.#drainAndRetry().finally(() => {
					this.#draining = undefined;
				});
				return this.#draining;
			}
			/**
			* Run after retained owners are released. Hooks stay registered so a later
			* close retries them, and a failing hook does not skip the ones after it.
			* Concurrent closes share one in-flight attempt.
			*/
			addCloseHook(hook) {
				this.#closeHooks.push(hook);
			}
			/** Stop admission, wait for active operations, and retry every retained owner. */
			close() {
				this.#closed = true;
				if (this.#closeInFlight !== undefined) return this.#closeInFlight;
				const attempt = this.#finishClose();
				let published;
				published = attempt.finally(() => {
					if (this.#closeInFlight === published) this.#closeInFlight = undefined;
				});
				this.#closeInFlight = published;
				return published;
			}
			/** Every registered hook runs. One failure is returned unchanged; several are aggregated. */
			async #runCloseHooks() {
				const failures = [];
				for (const hook of this.#closeHooks) {
					try {
						await hook();
					} catch (cause) {
						failures.push(cause);
					}
				}
				if (failures.length === 0) return ok(undefined);
				if (failures.length === 1) return err(failures[0]);
				return err(new AggregateError(failures, failures.map((cause) => errorMessage(cause)).join("; ")));
			}
			async #finishClose() {
				const cleanup = await this.retryCleanup().then(() => ok(undefined), (cause) => err(cause));
				const hooks = await this.#runCloseHooks();
				if (!cleanup.ok && !hooks.ok) throw this.#composeCloseFailures(cleanup.error, hooks.error);
				if (!hooks.ok) throw hooks.error;
				if (!cleanup.ok) throw cleanup.error;
			}
			/**
			* Report both outstanding owners. The pending set and the close hook stay
			* registered, so the next close retries each failed path.
			*/
			#composeCloseFailures(cleanup, hookFailure) {
				const retained = ArtifactReaderFailure.cleanupObservation(cleanup, "retained artifact cleanup");
				const hook = ArtifactReaderFailure.cleanupObservation(hookFailure, "close hook");
				const resources = [...new Set([...retained.resources, ...hook.resources])];
				const options = {
					cause: new AggregateError([cleanup, hookFailure], "Retained cleanup and a close hook both failed"),
					cleanup: {
						reason: `${retained.reason}; ${hook.reason}`,
						resources
					}
				};
				const message = `Artifact cleanup remains incomplete: ${resources.join(", ")}`;
				if (cleanup instanceof ArtifactResourceRetryFailure) return new ArtifactResourceRetryFailure(cleanup.failedOwners.map((owner) => ({
					owner,
					lease: this.#lease(owner)
				})), message, options);
				return new ArtifactReaderFailure("unavailable", message, options);
			}
			async #drainAndRetry() {
				const failed = new Map();
				while (true) {
					while (this.#active.size > 0) await Promise.allSettled(this.#active);
					for (const owner of this.#pending) {
						if (failed.has(owner)) continue;
						try {
							await this.#lease(owner).release();
							this.#pending.delete(owner);
						} catch (cause) {
							this.#observeCleanupFailure(owner, cause);
							failed.set(owner, cause);
						}
					}
					if (this.#active.size === 0 && [...this.#pending].every((owner) => failed.has(owner))) break;
				}
				const failures = [...failed].map(([owner, cause]) => ({
					owner,
					cause
				}));
				if (failures.length === 0) return;
				const observations = failures.map(({ owner, cause }) => ArtifactReaderFailure.cleanupObservation(cause, owner.kind === "lease" && owner.lease instanceof AnalysisCleanupLease ? owner.lease.cleanupResources ?? owner.resource : owner.resource));
				const resources = [...new Set(observations.flatMap(({ resources }) => resources))];
				throw new ArtifactResourceRetryFailure(failures.map(({ owner }) => ({
					owner,
					lease: this.#lease(owner)
				})), `Artifact cleanup remains incomplete: ${resources.join(", ")}`, {
					cause: new AggregateError(failures.map(({ cause }) => cause), "One or more artifact resources remain owned"),
					cleanup: {
						reason: observations.map(({ reason }) => reason).join("; "),
						resources
					}
				});
			}
			/** This boundary owns the latest parsed child cleanup facts for a composite owner. */
			#observeCleanupFailure(owner, cause) {
				const retained = this.#leases.get(owner);
				if (retained !== undefined) retained.resources = [...ArtifactReaderFailure.cleanupObservation(cause, owner.resource).resources];
			}
			#lease(owner) {
				if (owner.kind === "lease" && owner.lease instanceof AnalysisCleanupLease) return owner.lease;
				const previous = this.#leases.get(owner);
				if (previous !== undefined) return previous.lease;
				const retained = {
					resources: [owner.resource],
					lease: new AnalysisCleanupLease(() => cleanup(owner), { get cleanupResources() {
						return retained.resources;
					} })
				};
				this.#leases.set(owner, retained);
				return retained.lease;
			}
		};
		cleanup = async (owner) => {
			switch (owner.kind) {
				case "lease":
					await owner.lease.release();
					return;
				case "javascript-source-analysis":
					await owner.analysis.close();
					return;
				case "reader":
					await owner.reader.close();
					return;
				case "file-handle":
				case "directory-handle":
					await owner.handle.close();
					return;
				case "output-tree":
					await owner.tree.rollback();
					return;
				case "staged-output":
					await owner.output.close();
					return;
				case "private-runtime-root": await owner.root.close();
			}
		};
	})))();
}

//#endregion
//#region dist/resources/StreamBytes.js
var streamChunkToBuffer;
function init_StreamBytes() {
	return (init_StreamBytes = __esmMin((() => {
		init_internalInvariant();
		streamChunkToBuffer = (value) => {
			if (Buffer.isBuffer(value)) return value;
			if (value instanceof Uint8Array) return Buffer.from(value);
			if (typeof value === "string") return Buffer.from(value);
			throw invariantViolation("Readable stream emitted a non-byte chunk");
		};
	})))();
}

//#endregion
//#region dist/resources/StreamDigest.js
var abortIfNeeded$2, digestReadableToCompletion;
function init_StreamDigest() {
	return (init_StreamDigest = __esmMin((() => {
		init_ArtifactReader();
		init_StreamBytes();
		abortIfNeeded$2 = (signal) => {
			if (signal?.aborted === true) throw new ArtifactReaderFailure("cancelled", "Artifact inventory cancelled", { cause: signal.reason });
		};
		digestReadableToCompletion = async (stream, signal, integrityAlgorithm, observe) => {
			const hash = createHash("sha256");
			const md5 = integrityAlgorithm === "md5" ? createHash("md5") : undefined;
			let bytes = 0;
			for await (const raw of stream) {
				abortIfNeeded$2(signal);
				const chunk = streamChunkToBuffer(raw);
				bytes += chunk.length;
				hash.update(chunk);
				md5?.update(chunk);
				observe?.(chunk);
			}
			return {
				sha256: hash.digest("hex"),
				...md5 === undefined ? {} : { md5: md5.digest("hex") },
				bytes
			};
		};
	})))();
}

//#endregion
//#region dist/resources/ArtifactFileSource.js
var assertArtifactFileSelectedSource, ArtifactFileSource;
function init_ArtifactFileSource() {
	return (init_ArtifactFileSource = __esmMin((() => {
		init_artifactIntegrity();
		init_OwnedFileHandle();
		init_readFileHandleChunks();
		init_RegularFile();
		init_ArtifactFileOperation();
		init_ArtifactReader();
		init_ArtifactResourceScope();
		init_StreamDigest();
		init_ArtifactFileAdmission();
		assertArtifactFileSelectedSource = async (path, source, diagnosticLabel) => {
			const [observed, selected] = await Promise.all([source.handle.stat(), lstat(path).catch((cause) => {
				if (artifactSelectedPathErrno(cause) !== undefined) throw new ArtifactReaderFailure("integrity", `${diagnosticLabel} source identity changed: ${path}`, {
					cause,
					integrityCheck: "container-identity"
				});
				throw cause;
			})]);
			if (!sameRegularFileState(source.initial, observed) || !sameRegularFileState(source.initial, selected)) throw new ArtifactReaderFailure("integrity", `${diagnosticLabel} source identity changed: ${path}`, { integrityCheck: "container-identity" });
		};
		ArtifactFileSource = class {
			path;
			diagnosticLabel;
			admitted;
			#scope = new ArtifactResourceScope();
			#owner;
			#opening;
			#boundSha256;
			constructor(path, diagnosticLabel, admitted) {
				this.path = path;
				this.diagnosticLabel = diagnosticLabel;
				this.admitted = admitted;
				this.#scope.addCloseHook(async () => {
					if (this.#owner !== undefined) {
						await this.#owner.close();
						this.#owner = undefined;
					}
					this.#opening = undefined;
					this.#boundSha256 = undefined;
				});
			}
			/** Verify the admitted descriptor; the selected pathname is not reinterpreted. */
			read(signal) {
				return this.#scope.run(() => this.#verify(signal));
			}
			/** Verify both the descriptor and the file currently at the caller-selected path. */
			readSelectedPath(signal) {
				return this.#scope.run(() => this.#verifySelectedPath(signal));
			}
			/** Bind verified bytes to the inventory's expected whole-carrier identity. */
			bindSha256(expectedSha256, signal) {
				return this.#scope.run(() => this.#bind(expectedSha256, signal, () => this.#verify(signal), () => this.#verify()));
			}
			/** Bind carrier bytes while the selected pathname continues to name the same source. */
			bindSelectedPathSha256(expectedSha256, signal) {
				return this.#scope.run(() => this.#bind(expectedSha256, signal, () => this.#verifySelectedPath(signal), () => this.#verifySelectedPath()));
			}
			/** Join admitted operations before closing; failed descriptor ownership stays retained. */
			close() {
				return this.#scope.close();
			}
			/**
			* Digest the bound descriptor's bytes; only the SHA-256 identity is used.
			* A fully delivered digest is returned even when cancellation arrives
			* after its last chunk, so the caller validates the source first.
			*/
			async #sha256(handle, signal) {
				const { sha256 } = await digestReadableToCompletion(readFileHandleChunks(handle, {
					signal,
					cancellationFailure: (reason) => new ArtifactReaderFailure("cancelled", `${this.diagnosticLabel} verification cancelled`, { cause: reason })
				}), signal);
				return sha256;
			}
			async #bind(expectedSha256, signal, verify, verifyCompletion) {
				const { handle } = await verify();
				const observed = this.#boundSha256 ?? await this.#sha256(handle, signal);
				await verifyCompletion();
				if (observed !== expectedSha256) throw new ArtifactReaderFailure("integrity", `${this.diagnosticLabel} carrier changed after inventory`, { integrityCheck: "container-identity" }, artifactIntegrityDetails(".", {
					algorithm: "sha256",
					digest: expectedSha256
				}, observed, false));
				assertArtifactReadActive(signal);
				this.#boundSha256 = observed;
			}
			async #verify(signal) {
				assertArtifactReadActive(signal);
				const source = await this.#open(signal);
				const observed = await source.handle.stat();
				if (!sameRegularFileState(source.initial, observed)) throw new ArtifactReaderFailure("integrity", `${this.diagnosticLabel} source identity changed: ${this.path}`, { integrityCheck: "container-identity" });
				assertArtifactReadActive(signal);
				return source;
			}
			async #verifySelectedPath(signal) {
				assertArtifactReadActive(signal);
				const source = await this.#open(signal);
				await assertArtifactFileSelectedSource(this.path, source, this.diagnosticLabel);
				assertArtifactReadActive(signal);
				return source;
			}
			async #open(signal) {
				for (;;) {
					assertArtifactReadActive(signal);
					const pending = this.#opening ??= {
						signal,
						promise: this.#admit(signal)
					};
					try {
						return await pending.promise;
					} catch (cause) {
						if (this.#owner === undefined && this.#opening === pending) this.#opening = undefined;
						if (this.#owner === undefined && pending.signal !== signal && signal?.aborted !== true && artifactReadCancelledBy(cause, pending.signal)) continue;
						throw cause;
					}
				}
			}
			async #admit(signal) {
				try {
					if (this.admitted !== undefined) return {
						handle: this.admitted.handle,
						initial: this.admitted.initial
					};
					const source = await openRegularFile(this.path, {
						symlinks: "reject",
						signal
					});
					this.#owner = new OwnedFileHandle(source.handle);
					return source;
				} catch (cause) {
					if (cause instanceof RegularFileAdmissionFailure) this.#owner = cause.owner;
					throw artifactFileAdmissionFailure(this.path, this.diagnosticLabel, cause);
				}
			}
		};
	})))();
}

//#endregion
//#region dist/resources/ArtifactOperationFailure.js
var translateArtifactFailure;
function init_ArtifactOperationFailure() {
	return (init_ArtifactOperationFailure = __esmMin((() => {
		init_analysisSettingDefinitions();
		init_zstandardFrameAllowance();
		init_analysisErrorBase();
		init_artifactOperationError();
		init_internalInvariant();
		init_ArtifactReader();
		init_ArtifactFileOperation();
		translateArtifactFailure = (operation, cause) => {
			if (cause instanceof InternalInvariantError) throw cause;
			if (cause instanceof ZstandardFrameAllowanceError) return projectZstandardFrameAllowance(operation, cause);
			if (cause instanceof ArtifactReaderFailure) {
				const error = new ArtifactOperationError(operation, cause.reason, cause.details, cause.message, {
					...cause.userMessage === undefined ? {} : { userMessage: cause.userMessage },
					cause: cause.reason === "cancelled" ? artifactFileCancellationCause(cause) : cause,
					...cause.cleanup === undefined ? {} : { cleanup: cause.cleanup },
					...cause.partialObservation === undefined ? {} : { partialObservation: cause.partialObservation },
					...cause.admission === undefined ? {} : { admission: cause.admission },
					...cause.boundary === undefined ? {} : { boundary: cause.boundary },
					...cause.readerLimit === undefined ? {} : { readerLimit: cause.readerLimit },
					...cause.parserLimit === undefined ? {} : { parserLimit: cause.parserLimit },
					...cause.fixedAllowance === undefined ? {} : { fixedAllowance: cause.fixedAllowance },
					...cause.integrityCheck === undefined ? {} : { integrityCheck: cause.integrityCheck }
				});
				if (cause.admission !== undefined) error.bindLimit({
					...analysisSettingLimit(cause.admission.kind === "asar-header" ? "asar.max_header_bytes" : "asar.max_listing_bytes", cause.admission.maximumBytes, cause.admission.source),
					...cause.admission.requiredBytes === undefined ? {} : { required_value: cause.admission.requiredBytes }
				});
				bindArtifactFileCleanup(cause, error);
				return error;
			}
			if (cause instanceof AnalysisError) return cause;
			return new ArtifactOperationError(operation, "io", undefined, undefined, { cause });
		};
	})))();
}

//#endregion
//#region dist/domain/artifactReaderLimits.js
var bytes, count, representedBytes, DEFAULT_BUN_READER_LIMITS, bunReaderLimitsSchema, DEFAULT_DOTNET_BUNDLE_READER_LIMITS, dotnetBundleReaderLimitsSchema, DEFAULT_NODE_SEA_READER_LIMITS, nodeSeaReaderLimitsSchema, DEFAULT_GODOT_READER_LIMITS, godotReaderLimitsSchema, artifactReaderLimitsInputSchema, artifactReaderLimitsSchema, resolveArtifactReaderLimits, artifactReaderLimitMaximum;
function init_artifactReaderLimits() {
	return (init_artifactReaderLimits = __esmMin((() => {
		bytes = z.int().min(1).max(Number.MAX_SAFE_INTEGER);
		count = z.int().min(1).max(2147483647);
		representedBytes = bytes.max(constants$1.MAX_STRING_LENGTH);
		DEFAULT_BUN_READER_LIMITS = {
			payload_bytes: 256 * 1024 * 1024,
			module_count: 1e5,
			representation_bytes: 256 * 1024 * 1024,
			metadata_read_bytes: 256 * 1024 * 1024,
			recognition_table_bytes: 1024 * 1024,
			recognition_load_command_bytes: 16 * 1024 * 1024,
			path_parts: 256,
			path_nodes: 25e4
		};
		bunReaderLimitsSchema = z.strictObject({
			payload_bytes: bytes,
			module_count: count,
			representation_bytes: representedBytes,
			metadata_read_bytes: bytes,
			recognition_table_bytes: bytes,
			recognition_load_command_bytes: bytes,
			path_parts: count,
			path_nodes: count
		});
		DEFAULT_DOTNET_BUNDLE_READER_LIMITS = {
			metadata_bytes: 16 * 1024 * 1024,
			entry_count: 1e5,
			string_bytes: 64 * 1024,
			path_parts: 256,
			path_nodes: 25e4,
			member_bytes: 512 * 1024 * 1024,
			expanded_bytes: 2 * 1024 * 1024 * 1024
		};
		dotnetBundleReaderLimitsSchema = z.strictObject({
			metadata_bytes: bytes,
			entry_count: count,
			string_bytes: representedBytes,
			path_parts: count,
			path_nodes: count,
			member_bytes: bytes,
			expanded_bytes: bytes
		});
		DEFAULT_NODE_SEA_READER_LIMITS = {
			blob_bytes: 256 * 1024 * 1024,
			asset_count: 1e5,
			asset_name_bytes: 8 * 1024 * 1024,
			argument_count: 4096,
			argument_bytes: 1024 * 1024,
			recognition_header_count: 4096,
			recognition_load_command_bytes: 8 * 1024 * 1024
		};
		nodeSeaReaderLimitsSchema = z.strictObject({
			blob_bytes: bytes,
			asset_count: count,
			asset_name_bytes: bytes,
			argument_count: count,
			argument_bytes: bytes,
			recognition_header_count: count,
			recognition_load_command_bytes: bytes
		});
		DEFAULT_GODOT_READER_LIMITS = { directory_bytes: 64 * 1024 * 1024 };
		godotReaderLimitsSchema = z.strictObject({ directory_bytes: representedBytes });
		artifactReaderLimitsInputSchema = z.strictObject({
			bun: z.strictObject({
				payload_bytes: bunReaderLimitsSchema.shape.payload_bytes.exactOptional(),
				module_count: bunReaderLimitsSchema.shape.module_count.exactOptional(),
				representation_bytes: bunReaderLimitsSchema.shape.representation_bytes.exactOptional(),
				metadata_read_bytes: bunReaderLimitsSchema.shape.metadata_read_bytes.exactOptional(),
				recognition_table_bytes: bunReaderLimitsSchema.shape.recognition_table_bytes.exactOptional(),
				recognition_load_command_bytes: bunReaderLimitsSchema.shape.recognition_load_command_bytes.exactOptional(),
				path_parts: bunReaderLimitsSchema.shape.path_parts.exactOptional(),
				path_nodes: bunReaderLimitsSchema.shape.path_nodes.exactOptional()
			}).exactOptional().describe(`Bun admission; omitted fields use ${JSON.stringify(DEFAULT_BUN_READER_LIMITS)}. Recognition limits precede graph decoding; payload, retained representation and physical metadata-read work are independent.`),
			dotnet_bundle: z.strictObject({
				metadata_bytes: dotnetBundleReaderLimitsSchema.shape.metadata_bytes.exactOptional(),
				entry_count: dotnetBundleReaderLimitsSchema.shape.entry_count.exactOptional(),
				string_bytes: dotnetBundleReaderLimitsSchema.shape.string_bytes.exactOptional(),
				path_parts: dotnetBundleReaderLimitsSchema.shape.path_parts.exactOptional(),
				path_nodes: dotnetBundleReaderLimitsSchema.shape.path_nodes.exactOptional(),
				member_bytes: dotnetBundleReaderLimitsSchema.shape.member_bytes.exactOptional(),
				expanded_bytes: dotnetBundleReaderLimitsSchema.shape.expanded_bytes.exactOptional()
			}).exactOptional().describe(`.NET bundle admission; omitted fields use ${JSON.stringify(DEFAULT_DOTNET_BUNDLE_READER_LIMITS)}. String bytes apply to paths and bundle IDs; member bytes bound stored and expanded members; expanded bytes bound aggregate work.`),
			node_sea: z.strictObject({
				blob_bytes: nodeSeaReaderLimitsSchema.shape.blob_bytes.exactOptional(),
				asset_count: nodeSeaReaderLimitsSchema.shape.asset_count.exactOptional(),
				asset_name_bytes: nodeSeaReaderLimitsSchema.shape.asset_name_bytes.exactOptional(),
				argument_count: nodeSeaReaderLimitsSchema.shape.argument_count.exactOptional(),
				argument_bytes: nodeSeaReaderLimitsSchema.shape.argument_bytes.exactOptional(),
				recognition_header_count: nodeSeaReaderLimitsSchema.shape.recognition_header_count.exactOptional(),
				recognition_load_command_bytes: nodeSeaReaderLimitsSchema.shape.recognition_load_command_bytes.exactOptional()
			}).exactOptional().describe(`Node SEA admission; omitted fields use ${JSON.stringify(DEFAULT_NODE_SEA_READER_LIMITS)}. Asset-name and argument bytes are aggregate decoded text budgets. Recognition limits apply before blob decoding.`),
			godot: z.strictObject({ directory_bytes: godotReaderLimitsSchema.shape.directory_bytes.exactOptional() }).exactOptional().describe(`Godot directory representation admission; omitted fields use ${JSON.stringify(DEFAULT_GODOT_READER_LIMITS)}. Applies before path allocation and again to retained metadata.`),
			expanded_bytes: bytes.exactOptional().describe("Aggregate plaintext work for archive-backed readers; omitted retains the encoded-size-derived allowance. Includes repeated readable logical occurrences.")
		});
		artifactReaderLimitsSchema = z.strictObject({
			bun: bunReaderLimitsSchema,
			dotnet_bundle: dotnetBundleReaderLimitsSchema,
			node_sea: nodeSeaReaderLimitsSchema,
			godot: godotReaderLimitsSchema,
			expanded_bytes: bytes.exactOptional()
		});
		resolveArtifactReaderLimits = (selected) => ({
			bun: {
				...DEFAULT_BUN_READER_LIMITS,
				...selected?.bun
			},
			dotnet_bundle: {
				...DEFAULT_DOTNET_BUNDLE_READER_LIMITS,
				...selected?.dotnet_bundle
			},
			node_sea: {
				...DEFAULT_NODE_SEA_READER_LIMITS,
				...selected?.node_sea
			},
			godot: {
				...DEFAULT_GODOT_READER_LIMITS,
				...selected?.godot
			},
			...selected?.expanded_bytes === undefined ? {} : { expanded_bytes: selected.expanded_bytes }
		});
		artifactReaderLimitMaximum = (parameter, unit) => unit === "count" ? 2147483647 : [
			"artifact_limits.bun.representation_bytes",
			"artifact_limits.dotnet_bundle.string_bytes",
			"artifact_limits.godot.directory_bytes"
		].includes(parameter) ? constants$1.MAX_STRING_LENGTH : Number.MAX_SAFE_INTEGER;
	})))();
}

//#endregion
//#region dist/resources/ArtifactReaderLimits.js
var artifactReaderLimitFailure;
function init_ArtifactReaderLimits() {
	return (init_ArtifactReaderLimits = __esmMin((() => {
		init_ArtifactReader();
		init_artifactReaderLimits();
		artifactReaderLimitFailure = (parameter, effectiveValue, unit, requiredValue, boundary = "capacity") => {
			const required = typeof requiredValue === "bigint" ? requiredValue <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(requiredValue) : requiredValue.toString() : requiredValue;
			const maximum = artifactReaderLimitMaximum(parameter, unit);
			const canIncrease = effectiveValue < maximum && (requiredValue === undefined || (typeof requiredValue === "bigint" ? requiredValue <= BigInt(maximum) : requiredValue <= maximum));
			const recovery = canIncrease ? `Select a larger ${parameter} (1..${String(maximum)} ${unit}) and retry the same complete artifact. Changes apply on the next call without restarting REA.` : `No supported increase to ${parameter} can admit this observation; the maximum is ${String(maximum)} ${unit}. Keep the complete input and inspect its declared dimensions and validity. If those declarations are valid, use an explicitly selected format-specific reader that supports the required representation.`;
			const detail = `Artifact admission reached ${parameter} (${String(effectiveValue)} ${unit})${required === undefined ? "." : `; requires ${String(required)} ${unit}.`} ${recovery} Delivery paging does not raise this producer admission.`;
			return new ArtifactReaderFailure("limit", detail, {
				boundary,
				userMessage: detail,
				readerLimit: {
					parameter,
					effective_value: effectiveValue,
					unit,
					minimum: 1,
					maximum,
					...required === undefined ? {} : { required_value: required },
					applies_at: "next_operation",
					agent_editable: true,
					can_increase: canIncrease,
					update_mode: "parameter",
					pending_restart: false
				}
			});
		};
	})))();
}

//#endregion
//#region dist/resources/ArtifactSelectedSource.js
var resolveArtifactSourcePath, assertArtifactSelectedSource;
function init_ArtifactSelectedSource() {
	return (init_ArtifactSelectedSource = __esmMin((() => {
		init_ArtifactReader();
		init_ArtifactFileOperation();
		resolveArtifactSourcePath = async (path) => {
			await stat(path);
			return realpath(path);
		};
		assertArtifactSelectedSource = async (canonicalPath, selectedPath) => {
			if (selectedPath === undefined) return;
			const changed = (cause) => new ArtifactReaderFailure("integrity", `Selected artifact no longer resolves to its admitted source: ${selectedPath}`, {
				userMessage: "The selected artifact path no longer names the opened file. Reopen the selected artifact, then retry.",
				integrityCheck: "container-identity",
				...cause === undefined ? {} : { cause }
			});
			let current;
			try {
				current = await resolveArtifactSourcePath(selectedPath);
			} catch (cause) {
				if (artifactSelectedPathErrno(cause) !== undefined) throw changed(cause);
				throw cause;
			}
			if (current !== canonicalPath) throw changed();
		};
	})))();
}

//#endregion
//#region dist/resources/readArtifactFileChunks.js
var readArtifactFileChunks;
function init_readArtifactFileChunks() {
	return (init_readArtifactFileChunks = __esmMin((() => {
		init_readFileHandleChunks();
		init_ArtifactReader();
		readArtifactFileChunks = (handle, options = {}) => readFileHandleChunks(handle, {
			...options,
			cancellationFailure: (reason) => new ArtifactReaderFailure("cancelled", "Artifact file read cancelled", { cause: reason })
		});
	})))();
}

//#endregion
//#region dist/filesystem/OwnedDirectoryHandle.js
var OwnedDirectoryHandle;
function init_OwnedDirectoryHandle() {
	return (init_OwnedDirectoryHandle = __esmMin((() => {
		OwnedDirectoryHandle = class {
			handle;
			#state = { kind: "open" };
			constructor(handle) {
				this.handle = handle;
			}
			close() {
				if (this.#state.kind === "closed") return Promise.resolve();
				if (this.#state.kind === "closing") return this.#state.attempt;
				if (this.#state.kind === "failed") return Promise.reject(this.#state.cause);
				const attempt = Promise.resolve().then(async () => {
					try {
						await this.handle.close();
						this.#state = { kind: "closed" };
					} catch (cause) {
						this.#state = {
							kind: "failed",
							cause
						};
						throw cause;
					}
				});
				this.#state = {
					kind: "closing",
					attempt
				};
				return attempt;
			}
		};
	})))();
}

//#endregion
//#region dist/filesystem/decodeDirectoryEntryName.js
var decodeDirectoryEntryName;
function init_decodeDirectoryEntryName() {
	return (init_decodeDirectoryEntryName = __esmMin((() => {
		init_strictUtf8();
		decodeDirectoryEntryName = (raw) => {
			if (typeof raw === "string") return {
				kind: "decoded",
				name: raw
			};
			return isStrictUtf8(raw) ? {
				kind: "decoded",
				name: raw.toString("utf8")
			} : {
				kind: "unrepresentable",
				rawHex: raw.toString("hex")
			};
		};
	})))();
}

//#endregion
//#region dist/resources/hostExecutableMarking.js
var windowsLaunchableExtensions, hostExecutableMarking;
function init_hostExecutableMarking() {
	return (init_hostExecutableMarking = __esmMin((() => {
		init_HostPlatform();
		windowsLaunchableExtensions = new Set([
			".bat",
			".cmd",
			".com",
			".exe"
		]);
		hostExecutableMarking = (path, metadata, platform = HOST_PLATFORM.platform) => metadata.isSymbolicLink() ? false : platform === "win32" ? metadata.isFile() && windowsLaunchableExtensions.has(extname(path).toLowerCase()) : typeof metadata.mode === "bigint" ? (metadata.mode & 73n) !== 0n : (metadata.mode & 73) !== 0;
	})))();
}

//#endregion
//#region dist/resources/DirectoryArtifactReader.js
var DirectoryArtifactTraversalLimit, DirectoryArtifactRootFailure, DirectoryArtifactEntryAccessDenied, DirectoryArtifactReader, unsupportedEntryKind, artifactEntry, safeArtifactSize, directoryIoFailure, hostErrorCode, entryOpenFailure, mapStableFileRead, withDirectoryIoContext, abortIfNeeded$1, assertContainedDirectory;
function init_DirectoryArtifactReader() {
	return (init_DirectoryArtifactReader = __esmMin((() => {
		init_ArtifactReader();
		init_ArtifactFileOperation();
		init_AnalysisCleanupLease();
		init_readArtifactFileChunks();
		init_OwnedDirectoryHandle();
		init_OwnedFileHandle();
		init_OwnedRegularFile();
		init_RegularFile();
		init_decodeDirectoryEntryName();
		init_internalInvariant();
		init_hostExecutableMarking();
		init_ArtifactSelectedSource();
		init_errorMessage();
		DirectoryArtifactTraversalLimit = class extends ArtifactReaderFailure {
			examinedEntries;
			maximumEntries;
			constructor(examinedEntries, maximumEntries) {
				super("limit", "Directory traversal reached its examined-entry budget", { boundary: "capacity" });
				this.examinedEntries = examinedEntries;
				this.maximumEntries = maximumEntries;
			}
		};
		DirectoryArtifactRootFailure = class extends ArtifactReaderFailure {};
		DirectoryArtifactEntryAccessDenied = class extends ArtifactReaderFailure {
			systemCode;
			entryPath;
			constructor(systemCode, entryPath, message, options) {
				super("io", message, options);
				this.systemCode = systemCode;
				this.entryPath = entryPath;
			}
		};
		DirectoryArtifactReader = class {
			unreadableDirectories;
			format = "directory";
			#rootPromise;
			#rootPath;
			#directories = new Set();
			#files = new Map();
			#fileCleanup = new WeakMap();
			constructor(root, unreadableDirectories = "fail") {
				this.unreadableDirectories = unreadableDirectories;
				this.#rootPath = root;
			}
			/** Enumerate entries, optionally restricting descent while retaining directories. */
			async *entries(signal, selection) {
				const admittedRoot = await this.#resolveRoot();
				const root = admittedRoot.canonicalPath;
				const options = typeof selection === "function" ? { descendInto: selection } : selection;
				const maximum = options?.maximumEntries;
				if (maximum !== undefined && (!Number.isSafeInteger(maximum) || maximum < 0)) throw invariantViolation("Directory traversal maximumEntries must be a nonnegative safe integer");
				let examined = 0;
				const examine = () => {
					if (maximum !== undefined && examined >= maximum) throw new DirectoryArtifactTraversalLimit(examined, maximum);
					examined += 1;
				};
				const pending = [root];
				let unrepresentableNameCount = 0;
				let firstUnrepresentableNameHex;
				while (pending.length > 0) {
					abortIfNeeded$1(signal);
					const directory = pending.pop();
					if (directory === undefined) break;
					await withDirectoryIoContext("inspect directory", directory, () => assertContainedDirectory(root, directory, admittedRoot.identity));
					try {
						for await (const entry of this.#readDirectory(directory, pending, signal, options, examine, (rawHex) => {
							unrepresentableNameCount += 1;
							firstUnrepresentableNameHex ??= rawHex;
						})) yield entry;
					} catch (cause) {
						if (this.unreadableDirectories !== "omit" || !(cause instanceof DirectoryArtifactEntryAccessDenied)) throw cause;
						abortIfNeeded$1(signal);
						options?.onOmission?.({
							path: cause.entryPath,
							kind: "directory-descendants"
						});
						options?.onCoverage?.({
							status: "unknown",
							limitations: [cause.message]
						});
						continue;
					}
					await withDirectoryIoContext("inspect directory", directory, () => assertContainedDirectory(root, directory, admittedRoot.identity));
				}
				abortIfNeeded$1(signal);
				options?.onCoverage?.(unrepresentableNameCount > 0 ? {
					status: "unknown",
					examinedEntries: examined,
					limitations: [`Directory contains ${String(unrepresentableNameCount)} entry name(s) that are not valid UTF-8; no filesystem operations were performed for them. First raw basename bytes: ${firstUnrepresentableNameHex ?? "unknown"}.`]
				} : {
					status: "complete",
					limitations: []
				});
			}
			/** Admission facts, shared with traversal; the selected root may be a symlink. */
			rootObservation() {
				return this.#resolveRoot();
			}
			async #resolveRoot() {
				return this.#rootPromise ??= (async () => {
					const root = await resolveArtifactSourcePath(this.#rootPath);
					const metadata = await lstat(root, { bigint: true });
					if (metadata.isSymbolicLink()) throw new ArtifactReaderFailure("path", "Artifact root changed during traversal");
					if (!metadata.isDirectory()) throw new DirectoryArtifactRootFailure("path", "Artifact root must be a directory");
					return Object.freeze({
						canonicalPath: root,
						identity: Object.freeze({
							dev: metadata.dev,
							ino: metadata.ino
						})
					});
				})().catch((cause) => {
					if (cause instanceof ArtifactReaderFailure) throw cause;
					throw directoryIoFailure("resolve artifact root", this.#rootPath, cause, DirectoryArtifactRootFailure);
				});
			}
			async *#readDirectory(directory, pending, signal, options, examine, noteUnrepresentableName) {
				const admittedRoot = await this.#resolveRoot();
				const root = admittedRoot.canonicalPath;
				const handle = new OwnedDirectoryHandle(await opendir(directory, { encoding: "buffer" }).catch((cause) => {
					const code = hostErrorCode(cause);
					if (directory !== root && (code === "EACCES" || code === "EPERM")) throw new DirectoryArtifactEntryAccessDenied(code, relative(root, directory).split(sep).join("/"), directoryIoFailure("open directory", directory, cause).message, { cause });
					throw directoryIoFailure("open directory", directory, cause, directory === root ? DirectoryArtifactRootFailure : ArtifactReaderFailure);
				}));
				this.#directories.add(handle);
				const childDirectories = [];
				let traversal = { kind: "complete" };
				try {
					for (;;) {
						abortIfNeeded$1(signal);
						const child = await handle.handle.read();
						if (child === null) break;
						await withDirectoryIoContext("inspect directory", directory, () => assertContainedDirectory(root, directory, admittedRoot.identity));
						examine();
						abortIfNeeded$1(signal);
						const decoded = decodeDirectoryEntryName(child.name);
						if (decoded.kind === "unrepresentable") {
							noteUnrepresentableName(decoded.rawHex);
							continue;
						}
						const absolute = join(directory, decoded.name);
						const metadata = await lstat(absolute, { bigint: true }).catch((cause) => {
							throw directoryIoFailure("inspect entry", absolute, cause);
						});
						const path = relative(root, absolute).split(sep).join("/");
						const entry = artifactEntry(path, absolute, metadata);
						if (entry === undefined) {
							options?.onOmission?.({
								path,
								kind: unsupportedEntryKind(metadata)
							});
							continue;
						}
						yield entry;
						if (entry.kind === "directory") {
							if (options?.descendInto?.(path) ?? true) childDirectories.push(absolute);
							else options?.onOmission?.({
								path,
								kind: "directory-descendants"
							});
						}
					}
				} catch (cause) {
					traversal = {
						kind: "failed",
						cause: cause instanceof ArtifactReaderFailure ? cause : directoryIoFailure("read directory", directory, cause)
					};
				} finally {
					await this.#finishDirectory(handle, directory, traversal);
				}
				if (traversal.kind === "failed") throw traversal.cause;
				for (const child of childDirectories.reverse()) pending.push(child);
			}
			async #finishDirectory(handle, path, traversal) {
				try {
					await handle.close();
					this.#directories.delete(handle);
				} catch (cause) {
					const closeFailure = directoryIoFailure("close directory", path, cause);
					if (traversal.kind === "failed") throw ArtifactReaderFailure.withCleanup(traversal.cause, ArtifactReaderFailure.cleanupObservation(closeFailure, path));
					throw closeFailure;
				}
			}
			/** Open an entry only against the file state captured when it was enumerated. */
			async #openFile(entry, signal) {
				abortIfNeeded$1(signal);
				await this.#validateRoot();
				if (entry.kind !== "file") throw new ArtifactReaderFailure("format", "Only regular files can be opened");
				const identity = entry.sourceIdentity;
				if (identity === undefined) throw new ArtifactReaderFailure("integrity", `Directory entry has no captured file state: ${entry.path}`, { integrityCheck: "entry-metadata" });
				const fileHandle = await open(entry.adapterKey, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK).catch((cause) => {
					throw entryOpenFailure(entry, cause);
				});
				const owner = new OwnedFileHandle(fileHandle);
				this.#files.set(owner, entry.adapterKey);
				try {
					const observed = await owner.handle.stat({ bigint: true }).catch((cause) => {
						throw directoryIoFailure("inspect opened entry", entry.adapterKey, cause);
					});
					if (!observed.isFile() || !sameArtifactSourceIdentity(identity, observed)) {
						throw new ArtifactReaderFailure("integrity", `Directory entry changed before open: ${entry.path}`, { integrityCheck: "member-identity" });
					}
					abortIfNeeded$1(signal);
					return {
						owner,
						identity
					};
				} catch (cause) {
					try {
						await this.#closeFile(owner);
					} catch (closeCause) {
						throw ArtifactReaderFailure.withCleanup(cause, ArtifactReaderFailure.cleanupObservation(directoryIoFailure("close opened entry", entry.adapterKey, closeCause), entry.adapterKey));
					}
					throw cause;
				}
			}
			async #validateRoot() {
				const root = await this.#resolveRoot();
				await withDirectoryIoContext("inspect artifact root", root.canonicalPath, () => assertContainedDirectory(root.canonicalPath, root.canonicalPath, root.identity, "integrity"));
			}
			/** Borrow an admitted entry for bounded random reads; retain failed cleanup. */
			async inspectFile(entry, inspect, signal) {
				const { owner, identity } = await this.#openFile(entry, signal);
				try {
					const value = await withOwnedFileHandle(entry.adapterKey, owner, signal === undefined ? {} : { signal }, async (file) => {
						let outcome;
						try {
							outcome = {
								kind: "completed",
								value: await inspect(file)
							};
						} catch (cause) {
							outcome = {
								kind: "failed",
								cause
							};
						}
						const [opened, named] = await Promise.all([
							file.stat({ bigint: true }),
							lstat(entry.adapterKey, { bigint: true }),
							this.#validateRoot()
						]).catch((validationCause) => {
							if (outcome.kind !== "failed") throw validationCause;
							throw new ArtifactReaderFailure("io", `Directory inspection failed: ${errorMessage(outcome.cause)}; final source identity could not be validated: ${errorMessage(validationCause)}`, { cause: new AggregateError([outcome.cause, validationCause], "Directory inspection and final source validation failed") });
						});
						if (!opened.isFile() || !named.isFile() || !sameArtifactSourceIdentity(identity, opened) || !sameArtifactSourceIdentity(identity, named)) throw new ArtifactReaderFailure("integrity", `Directory entry changed during inspection: ${entry.path}${outcome.kind === "failed" ? `; inspection failed: ${errorMessage(outcome.cause)}` : ""}`, {
							integrityCheck: "member-identity",
							...outcome.kind === "failed" ? { cause: outcome.cause } : {}
						});
						if (outcome.kind === "failed") throw outcome.cause;
						abortIfNeeded$1(signal);
						return outcome.value;
					});
					this.#files.delete(owner);
					return value;
				} catch (cause) {
					if (cause instanceof RegularFileCleanupFailure) {
						const lease = new AnalysisCleanupLease(() => this.#closeFile(owner), [entry.adapterKey]);
						this.#fileCleanup.set(owner, lease);
						throw new ArtifactFileCleanupFailure(cause, lease);
					}
					this.#files.delete(owner);
					if (cause instanceof RegularFileCancelled) throw new ArtifactFileCancelled(cause);
					if (cause instanceof RegularFileOperationCancelled) throw new ArtifactReaderFailure("cancelled", "Directory inspection cancelled", { cause: cause.reason });
					throw directoryIoFailure("inspect entry", entry.adapterKey, cause);
				}
			}
			async open(entry, signal) {
				const { owner, identity } = await this.#openFile(entry, signal);
				const source = Readable.from(mapStableFileRead(owner.handle, entry, identity, () => this.#validateRoot(), signal), { objectMode: false });
				source.once("close", () => {
					void this.#closeFile(owner).catch(() => undefined);
				});
				return source;
			}
			async close() {
				const failures = [];
				for (const [owner, path] of this.#files) {
					try {
						const lease = this.#fileCleanup.get(owner);
						if (lease === undefined) await this.#closeFile(owner);
						else await lease.release();
					} catch (cause) {
						failures.push(directoryIoFailure("close opened entry", path, cause));
					}
				}
				for (const owner of this.#directories) {
					try {
						await owner.close();
						this.#directories.delete(owner);
					} catch (cause) {
						failures.push(directoryIoFailure("close directory", owner.handle.path, cause));
					}
				}
				if (failures.length > 0) {
					const reason = failures.map(errorMessage).join("; ");
					throw new ArtifactReaderFailure("io", `Directory artifact cleanup failed: ${reason}`, {
						cause: new AggregateError(failures),
						cleanup: {
							reason,
							resources: [...this.#files.values(), ...[...this.#directories].map((owner) => owner.handle.path)]
						}
					});
				}
			}
			async #closeFile(owner) {
				await owner.close();
				this.#files.delete(owner);
				this.#fileCleanup.delete(owner);
			}
			provenance() {
				return [];
			}
		};
		unsupportedEntryKind = (metadata) => metadata.isFIFO() ? "fifo" : metadata.isSocket() ? "socket" : metadata.isBlockDevice() ? "block-device" : metadata.isCharacterDevice() ? "character-device" : "unsupported";
		artifactEntry = (path, absolute, metadata) => {
			const kind = metadata.isSymbolicLink() ? "symlink" : metadata.isDirectory() ? "directory" : metadata.isFile() ? "file" : undefined;
			if (kind === undefined) return undefined;
			return {
				path,
				kind,
				declaredSize: kind === "file" ? safeArtifactSize(metadata.size) : null,
				compressedSize: null,
				executable: hostExecutableMarking(absolute, metadata),
				encrypted: false,
				byteOffset: null,
				declaredIntegrity: null,
				unpacked: false,
				limitations: kind === "symlink" ? ["Symlink target was not followed or disclosed."] : [],
				adapterKey: absolute,
				...kind === "file" ? { sourceIdentity: {
					device: metadata.dev,
					inode: metadata.ino,
					size: metadata.size,
					mode: metadata.mode,
					mtimeNs: metadata.mtimeNs,
					ctimeNs: metadata.ctimeNs
				} } : {}
			};
		};
		safeArtifactSize = (size) => {
			if (size < 0n || size > BigInt(Number.MAX_SAFE_INTEGER)) return null;
			return Number(size);
		};
		directoryIoFailure = (operation, path, cause, Failure = ArtifactReaderFailure) => {
			if (cause instanceof ArtifactReaderFailure) return cause;
			const code = hostErrorCode(cause);
			const suffix = code === undefined ? "" : ` (${code})`;
			const detail = errorMessage(cause);
			return new Failure("io", `Could not ${operation} at ${path}${suffix}: ${detail}`, { cause });
		};
		hostErrorCode = (cause) => typeof cause === "object" && cause !== null && "code" in cause && typeof cause.code === "string" ? cause.code : undefined;
		entryOpenFailure = (entry, cause) => {
			const failure = directoryIoFailure("open entry", entry.adapterKey, cause);
			const code = hostErrorCode(cause);
			return code === "EACCES" || code === "EPERM" ? new DirectoryArtifactEntryAccessDenied(code, entry.path, failure.message, { cause }) : failure;
		};
		mapStableFileRead = async function* (handle, entry, identity, validateRoot, signal) {
			let bytes = 0n;
			const expectedBytes = identity.size;
			try {
				for await (const chunk of readArtifactFileChunks(handle, {
					end: expectedBytes,
					signal
				})) {
					abortIfNeeded$1(signal);
					bytes += BigInt(chunk.length);
					yield chunk;
				}
				abortIfNeeded$1(signal);
				const [opened, current] = await Promise.all([
					handle.stat({ bigint: true }),
					lstat(entry.adapterKey, { bigint: true }),
					validateRoot()
				]);
				abortIfNeeded$1(signal);
				if (!opened.isFile() || !current.isFile() || !sameArtifactSourceIdentity(identity, opened) || !sameArtifactSourceIdentity(identity, current) || bytes !== expectedBytes) throw new ArtifactReaderFailure("integrity", `Directory entry changed during read: ${entry.path}`, { integrityCheck: "member-identity" });
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && [
					"ENOENT",
					"ENOTDIR",
					"ELOOP"
				].includes(String(cause.code))) throw new ArtifactReaderFailure("integrity", `Directory entry changed during read: ${entry.path}`, {
					cause,
					integrityCheck: "member-identity"
				});
				if (!(cause instanceof ArtifactReaderFailure)) throw directoryIoFailure("validate read entry", entry.adapterKey, cause);
				throw cause;
			}
		};
		withDirectoryIoContext = async (operation, path, action) => {
			try {
				return await action();
			} catch (cause) {
				throw directoryIoFailure(operation, path, cause);
			}
		};
		abortIfNeeded$1 = (signal) => {
			if (signal?.aborted === true) throw new ArtifactReaderFailure("cancelled", "Artifact traversal cancelled", { cause: signal.reason });
		};
		assertContainedDirectory = async (root, directory, rootIdentity, failureReason = "path") => {
			const [canonicalResult, metadataResult, currentRootResult] = directory === root ? await Promise.allSettled([realpath(root), lstat(root, { bigint: true })]) : await Promise.allSettled([
				realpath(directory),
				lstat(directory, { bigint: true }),
				lstat(root, { bigint: true })
			]);
			if (canonicalResult.status === "rejected") throw canonicalResult.reason;
			if (metadataResult.status === "rejected") throw metadataResult.reason;
			if (currentRootResult !== undefined && currentRootResult.status === "rejected") throw currentRootResult.reason;
			const canonical = canonicalResult.value;
			const fromRoot = relative(root, canonical);
			const metadata = metadataResult.value;
			const currentRoot = currentRootResult === undefined ? metadata : currentRootResult.value;
			if (rootIdentity === undefined || currentRoot.dev !== rootIdentity.dev || currentRoot.ino !== rootIdentity.ino || metadata.isSymbolicLink() || !metadata.isDirectory() || fromRoot === ".." || fromRoot.startsWith(`..${sep}`) || isAbsolute(fromRoot)) throw new ArtifactReaderFailure(failureReason, "Directory traversal escaped or changed its artifact root", { integrityCheck: failureReason === "integrity" ? "container-identity" : undefined });
		};
	})))();
}

//#endregion
//#region dist/domain/fileSnapshotObservation.js
var byteCount, sha256, fileSnapshotPartialObservationSchema;
function init_fileSnapshotObservation() {
	return (init_fileSnapshotObservation = __esmMin((() => {
		byteCount = z.number().int().nonnegative().safe();
		sha256 = z.string().regex(/^[a-f0-9]{64}$/u);
		fileSnapshotPartialObservationSchema = z.discriminatedUnion("kind", [z.strictObject({
			kind: z.literal("file-snapshot-hash"),
			path: z.string().min(1).nullable(),
			sha256: sha256.nullable(),
			bytes: byteCount
		}), z.strictObject({
			kind: z.literal("file-snapshot-read"),
			path: z.string().min(1).nullable(),
			admitted_sha256: sha256.nullable(),
			capture: z.discriminatedUnion("status", [z.strictObject({
				status: z.literal("captured"),
				bytes: byteCount
			}), z.strictObject({
				status: z.literal("over-capacity"),
				source_bytes_at_least: byteCount,
				maximum_bytes: byteCount
			})])
		})]);
	})))();
}

//#endregion
//#region dist/resources/readStableArtifact.js
var completedStableArtifact, completedStableArtifactStream, completedStableArtifactIdentity, FILE_SYSTEM, afterValidation, readStableArtifact, streamStableArtifact, readStableArtifactChunks, assertStableArtifactState;
function init_readStableArtifact() {
	return (init_readStableArtifact = __esmMin((() => {
		init_RegularFile();
		init_ArtifactReader();
		init_ArtifactFileOperation();
		completedStableArtifact = (cause) => {
			const value = artifactFileCompletion(cause)?.value;
			if (value === null || typeof value !== "object" || !("bytes" in value) || !Buffer.isBuffer(value.bytes) || !("sha256" in value) || typeof value.sha256 !== "string") return undefined;
			return {
				bytes: value.bytes,
				sha256: value.sha256
			};
		};
		completedStableArtifactStream = (cause) => {
			const value = artifactFileCompletion(cause)?.value;
			if (value === null || typeof value !== "object" || !("sha256" in value) || typeof value.sha256 !== "string" || !("size" in value) || typeof value.size !== "number" || !Number.isSafeInteger(value.size) || value.size < 0 || !("prefix" in value) || !Buffer.isBuffer(value.prefix)) return undefined;
			return {
				sha256: value.sha256,
				size: value.size,
				prefix: value.prefix
			};
		};
		completedStableArtifactIdentity = (cause) => {
			const snapshot = completedStableArtifact(cause);
			if (snapshot !== undefined) return {
				sha256: snapshot.sha256,
				bytes: snapshot.bytes.length
			};
			const stream = completedStableArtifactStream(cause);
			return stream === undefined ? undefined : {
				sha256: stream.sha256,
				bytes: stream.size
			};
		};
		FILE_SYSTEM = {
			lstat: (path) => lstat(path, { bigint: true }),
			open,
			realpath
		};
		afterValidation = async (path, stage, read) => {
			try {
				return await read();
			} catch (cause) {
				if (artifactSelectedPathErrno(cause) !== undefined) throw new ArtifactReaderFailure("integrity", `Artifact changed ${stage}: ${path}`, {
					cause,
					integrityCheck: "container-identity"
				});
				throw cause;
			}
		};
		readStableArtifact = (path, maximumBytes, signal, fileSystem = FILE_SYSTEM, resourceScope, onValidatedState) => readStableArtifactChunks(path, maximumBytes, signal, fileSystem, resourceScope, (size) => size, undefined, (bytes, sha256, _size, state) => {
			onValidatedState?.(state);
			return {
				bytes,
				sha256
			};
		});
		streamStableArtifact = (path, maximumBytes, options) => readStableArtifactChunks(path, maximumBytes, options.signal, options.fileSystem ?? FILE_SYSTEM, options.resourceScope, options.retainBytes, options.onChunk, (prefix, sha256, size) => ({
			sha256,
			size,
			prefix
		}));
		readStableArtifactChunks = async (path, maximumBytes, signal, fileSystem, resourceScope, retainBytes, onChunk, complete) => {
			assertArtifactReadActive(signal);
			const before = await fileSystem.lstat(path);
			if (!before.isFile() || before.isSymbolicLink()) throw new ArtifactReaderFailure("path", `Expected a regular file without a symlink: ${path}`, before.isSymbolicLink() ? { resolvedPath: await resolvedRegularFile(path, fileSystem) } : {});
			const maximumSize = BigInt(maximumBytes);
			if (before.size > maximumSize) throw new ArtifactReaderFailure("limit", `Selected artifact exceeds ${String(maximumBytes)} bytes: ${path}`, { boundary: "file-size" });
			const file = await afterValidation(path, "before open", () => fileSystem.open(path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK));
			return withArtifactFileHandle(path, file, resourceScope, signal, async (file) => {
				const initial = await file.stat({ bigint: true });
				if (!initial.isFile() || initial.dev !== before.dev || initial.ino !== before.ino) throw new ArtifactReaderFailure("integrity", `Artifact changed before open: ${path}`, { integrityCheck: "container-identity" });
				assertArtifactReadActive(signal);
				const admitted = Number(initial.size > maximumSize ? maximumSize : initial.size);
				const bytes = Buffer.allocUnsafe(Math.max(0, Math.min(admitted, retainBytes(admitted))));
				const overflow = Buffer.allocUnsafe(65536);
				const hash = createHash("sha256");
				let count = 0;
				for (;;) {
					assertArtifactReadActive(signal);
					const inside = count < bytes.length;
					const target = inside ? bytes : overflow;
					const offset = inside ? count : 0;
					const wanted = Math.min(65536, target.length - offset);
					const { bytesRead } = await file.read(target, offset, wanted, count);
					if (bytesRead === 0) break;
					assertArtifactReadActive(signal);
					if (!Number.isSafeInteger(bytesRead) || bytesRead < 0 || bytesRead > wanted) throw new ArtifactReaderFailure("format", `Artifact descriptor returned an invalid byte count: ${path}`);
					count += bytesRead;
					if (count > maximumBytes) throw new ArtifactReaderFailure("limit", `Selected artifact grew beyond its byte limit: ${path}`, { boundary: "file-size" });
					const chunk = target.subarray(offset, offset + bytesRead);
					hash.update(chunk);
					onChunk?.(chunk);
				}
				const after = await file.stat({ bigint: true });
				const current = await afterValidation(path, "during read", () => fileSystem.lstat(path));
				if ([after, current].some((stat) => !sameRegularFileState(initial, stat)) || BigInt(count) !== initial.size) throw new ArtifactReaderFailure("integrity", `Artifact changed during read: ${path}`, { integrityCheck: "container-identity" });
				assertArtifactReadActive(signal);
				return complete(bytes, hash.digest("hex"), count, initial);
			});
		};
		assertStableArtifactState = async (path, expected, signal) => {
			assertArtifactReadActive(signal);
			const current = await afterValidation(path, "before cached inspection", () => lstat(path, { bigint: true }));
			if (!sameRegularFileState(expected, current)) throw new ArtifactReaderFailure("integrity", `Artifact changed since acquisition: ${path}`, { integrityCheck: "container-identity" });
			assertArtifactReadActive(signal);
		};
	})))();
}

//#endregion
//#region dist/resources/StableArtifactObservation.js
var completedStableArtifactObservation;
function init_StableArtifactObservation() {
	return (init_StableArtifactObservation = __esmMin((() => {
		init_fileSnapshotObservation();
		init_readStableArtifact();
		completedStableArtifactObservation = (cause, path, completedSnapshot) => {
			const identity = completedSnapshot === undefined ? completedStableArtifactIdentity(cause) : {
				sha256: completedSnapshot.sha256,
				bytes: completedSnapshot.bytes.length
			};
			return identity === undefined ? undefined : fileSnapshotPartialObservationSchema.parse({
				kind: "file-snapshot-hash",
				path,
				sha256: identity.sha256,
				bytes: identity.bytes
			});
		};
	})))();
}

//#endregion
//#region dist/resources/StableArtifactFailure.js
var readerIntegrityFailure, projectOwnedArtifactIdentityFailure, projectOwnedArtifactInputFailure, requestFieldPath, projectSelectedArtifactFileFailure, imageFileSizeRemediation, regularFileSymlinkRecovery, stableArtifactInputRecovery, stableArtifactInputFailure, artifactCleanupFailure, projectArtifactCloseFailure, projectStableArtifactFailure;
function init_StableArtifactFailure() {
	return (init_StableArtifactFailure = __esmMin((() => {
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_ArtifactReader();
		init_ArtifactFileOperation();
		init_StableArtifactObservation();
		init_RegularFile();
		init_analysisErrorCore();
		readerIntegrityFailure = (operation, path, failure, options = {}) => new AnalysisArtifactChangedError(operation, path, failure.message, {
			cause: failure,
			...options,
			integrityCheck: failure.integrityCheck
		});
		projectOwnedArtifactIdentityFailure = (facts, operation, path) => {
			const { cause, origin } = facts;
			if (origin !== "owned-or-classified" || !(cause instanceof ArtifactReaderFailure)) return undefined;
			if (cause.reason === "integrity") return readerIntegrityFailure(operation, path, cause);
			if (cause.reason === "cancelled") return cancelledBy(operation, carriedReason(artifactFileCancellationCause(cause)));
			return undefined;
		};
		projectOwnedArtifactInputFailure = ({ cause, origin }, operation, path, field = "path") => {
			if (origin !== "owned-or-classified" || !(cause instanceof ArtifactReaderFailure)) return undefined;
			if (cause.reason === "unsupported") return new AnalysisUnsupportedTargetError(operation, path, cause.message, { cause });
			if (cause.reason === "malformed" || cause.reason === "truncated" || cause.reason === "format" || cause.reason === "path") return stableArtifactInputFailure(cause, operation, field);
			return undefined;
		};
		requestFieldPath = (field) => typeof field === "string" ? [field] : [...field];
		projectSelectedArtifactFileFailure = (cause, operation, path, description, field = "path", options = {}) => {
			if (!(cause instanceof Error) || !("code" in cause)) return undefined;
			if (cause.code === "EACCES" || cause.code === "EPERM") return new AnalysisAccessDeniedError(operation, path, cause.code, {
				...options,
				cause
			});
			if (isSelectedRegularFileError(cause)) return new AnalysisInputError(operation, {
				...options,
				cause
			}, [{
				path: requestFieldPath(field),
				reason: "invalid_value",
				message: `Selected ${description} could not be read (${String(cause.code)}): ${path}.`
			}]);
			return undefined;
		};
		imageFileSizeRemediation = (selectedBytes, maximumBytes) => selectedBytes >= maximumBytes ? `The image exceeds the ${String(maximumBytes)}-byte input ceiling this operation accepts. This release has no runtime override. Select a smaller artifact.` : `Raise max_file_bytes above ${String(selectedBytes)} bytes or select a smaller artifact; the limit is the caller-selected input read budget.`;
		regularFileSymlinkRecovery = (resolvedPath) => `Retry with the resolved regular file path ${resolvedPath}. The selected symlink is not admitted; the retry will validate the target again.`;
		stableArtifactInputRecovery = (cause) => cause.reason === "path" && cause.resolvedPath !== undefined ? {
			remediationAction: regularFileSymlinkRecovery(cause.resolvedPath),
			conformsToInputContract: true
		} : {};
		stableArtifactInputFailure = (cause, operation, field = "path", options = {}) => new AnalysisInputError(operation, {
			...options,
			cause,
			...stableArtifactInputRecovery(cause)
		}, [{
			path: requestFieldPath(field),
			reason: "invalid_format",
			message: cause.message
		}]);
		artifactCleanupFailure = (cause, providerId, operation) => {
			if (!(cause instanceof ArtifactReaderFailure) || cause.cleanup === undefined) return undefined;
			return new ProviderCleanupError(providerId, cause.cleanup.resources, { reason: cause.cleanup.reason }, {
				cause,
				operation
			});
		};
		projectArtifactCloseFailure = (cause, providerId, operation) => {
			const error = artifactCleanupFailure(cause, providerId, operation);
			if (error === undefined) return cause;
			bindArtifactFileCleanup(cause, error);
			return error;
		};
		projectStableArtifactFailure = (cause, primary, path, providerId, operation, snapshot) => {
			const observation = completedStableArtifactObservation(cause, path, snapshot);
			if (observation !== undefined) primary.retainPartialObservation(observation);
			const cleanup = artifactCleanupFailure(cause, providerId, operation);
			if (cleanup === undefined) return primary;
			const error = analysisErrorWithCleanupFailure(primary, cleanup, operation);
			bindArtifactFileCleanup(cause, error);
			return error;
		};
	})))();
}

//#endregion
//#region dist/resources/RegularFileErrorProjection.js
var selectedFileTargetError;
function init_RegularFileErrorProjection() {
	return (init_RegularFileErrorProjection = __esmMin((() => {
		init_configurationErrors();
		init_RegularFile();
		init_StableArtifactFailure();
		selectedFileTargetError = (path, primary, cause) => new BinaryTargetError(path, primary.message, {
			cause,
			...primary instanceof RejectedRegularFileSymlink && primary.resolvedPath !== undefined ? { remediationAction: regularFileSymlinkRecovery(primary.resolvedPath) } : {}
		});
	})))();
}

//#endregion
//#region dist/filesystem/StagedOutputError.js
var STAGED_OUTPUT_CODES, StagedOutputError;
function init_StagedOutputError() {
	return (init_StagedOutputError = __esmMin((() => {
		STAGED_OUTPUT_CODES = [
			"handle_already_owned",
			"identity_unverified",
			"identity_changed",
			"file_disappeared",
			"unexpected_entries",
			"directory_unverified",
			"directory_identity_changed"
		];
		StagedOutputError = class extends Error {
			code;
			detail;
			_tag = "StagedOutputError";
			constructor(code, detail, options) {
				super(code, options);
				this.code = code;
				this.detail = detail;
				this.name = "StagedOutputError";
			}
		};
	})))();
}

//#endregion
//#region dist/filesystem/OwnedStagedOutput.js
var identityOf, sameIdentity, OwnedStagedOutput, errorCode;
function init_OwnedStagedOutput() {
	return (init_OwnedStagedOutput = __esmMin((() => {
		init_StagedOutputError();
		init_OwnedFileHandle();
		identityOf = (stats) => ({
			dev: stats.dev,
			ino: stats.ino
		});
		sameIdentity = (stats, identity) => stats.dev === identity.dev && stats.ino === identity.ino;
		OwnedStagedOutput = class OwnedStagedOutput {
			directory;
			directoryIdentity;
			#file;
			#fileIdentity;
			#fileClosed = false;
			#fileRemovedByOwner = false;
			#publishedRename = false;
			#closeAttempt;
			#closed = false;
			#identityFailure;
			constructor(directory, directoryIdentity) {
				this.directory = directory;
				this.directoryIdentity = directoryIdentity;
			}
			static async create(directory) {
				try {
					const stats = await lstat(directory);
					if (!stats.isDirectory() || stats.isSymbolicLink()) return new OwnedStagedOutput(directory, undefined);
					return new OwnedStagedOutput(directory, identityOf(stats));
				} catch (cause) {
					const owner = new OwnedStagedOutput(directory, undefined);
					owner.#identityFailure = cause;
					return owner;
				}
			}
			setFile(file) {
				if (this.#file !== undefined) throw new StagedOutputError("handle_already_owned");
				this.#file = file;
			}
			/** Verify the staged name against its descriptor after the last write. */
			async assertReadyForPublication(content) {
				await this.#verifiedDirectory();
				if (this.#file !== undefined && !this.#fileClosed) await this.#observeFileIdentity();
				if (this.#fileIdentity === undefined) throw new StagedOutputError("identity_unverified", undefined, { cause: this.#identityFailure });
				const stagedFile = await lstat(content);
				if (!stagedFile.isFile() || stagedFile.isSymbolicLink() || !sameIdentity(stagedFile, this.#fileIdentity)) throw new StagedOutputError("identity_changed", { path: content });
			}
			/** Observe the descriptor's identity after its last write, then close it. */
			async closeFile() {
				const file = this.#file;
				if (file === undefined || this.#fileClosed) return;
				await this.#observeFileIdentity();
				await file.close();
				this.#fileClosed = true;
			}
			async #observeFileIdentity() {
				const file = this.#file;
				if (file === undefined) return;
				try {
					this.#fileIdentity = identityOf(await file.handle.stat());
				} catch (cause) {
					this.#fileIdentity = undefined;
					this.#identityFailure = cause;
				}
			}
			/** Record that the staged file moved to the published destination by rename. */
			recordPublishedRename() {
				this.#publishedRename = true;
			}
			/** Close the owned descriptor and remove only the exact staged entries. */
			close() {
				if (this.#closed) return Promise.resolve();
				if (this.#closeAttempt !== undefined) return this.#closeAttempt;
				const attempt = Promise.resolve().then(() => this.#cleanup());
				this.#closeAttempt = attempt;
				void attempt.then(() => {
					this.#closed = true;
					this.#closeAttempt = undefined;
				}, () => {
					this.#closeAttempt = undefined;
				});
				return attempt;
			}
			async #cleanup() {
				await this.closeFile();
				await this.#verifiedDirectory();
				if (this.#file !== undefined) {
					const content = `${this.directory}/content`;
					let stagedFile;
					try {
						stagedFile = await lstat(content);
					} catch (cause) {
						if (errorCode(cause) === "ENOENT" && (this.#fileRemovedByOwner || this.#publishedRename)) {
							stagedFile = undefined;
						} else if (errorCode(cause) === "ENOENT") {
							throw new StagedOutputError("file_disappeared", { path: content }, { cause });
						} else {
							throw cause;
						}
					}
					if (stagedFile !== undefined) {
						if (!stagedFile.isFile() || stagedFile.isSymbolicLink() || this.#fileIdentity === undefined || !sameIdentity(stagedFile, this.#fileIdentity)) throw new StagedOutputError("identity_changed", { path: content });
						await unlink(content);
						this.#fileRemovedByOwner = true;
					}
				}
				const remaining = await readdir(this.directory);
				if (remaining.length > 0) throw new StagedOutputError("unexpected_entries", {
					count: remaining.length,
					entries: remaining.join(",")
				});
				await this.#verifiedDirectory();
				await rmdir(this.directory);
			}
			async #verifiedDirectory() {
				if (this.directoryIdentity === undefined) throw new StagedOutputError("directory_unverified", { directory: this.directory }, { cause: this.#identityFailure });
				const directory = await lstat(this.directory);
				if (!directory.isDirectory() || directory.isSymbolicLink() || !sameIdentity(directory, this.directoryIdentity)) throw new StagedOutputError("directory_identity_changed", { directory: this.directory });
			}
		};
		errorCode = (cause) => typeof cause === "object" && cause !== null && "code" in cause ? cause.code : undefined;
	})))();
}

//#endregion
//#region dist/resources/TextFileWrite.js
function writeTextParts(parts, path, overwrite, resources, cancellation) {
	return resources.run(() => writeTextPartsOwned(parts, path, overwrite, resources, cancellation)).catch((cause) => {
		const cleanup = cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined ? cause.cleanup : undefined;
		const error = new EvidenceFileError("write", "io", {
			cause,
			path: absoluteCallerPath(path),
			...cleanup === undefined ? {} : { cleanup }
		});
		bindArtifactFileCleanup(cause, error);
		return err(error);
	});
}
var writeTextFile, writeTextPartsOwned, classifyWriteFailure, stagedCleanupFailure, fileAccessFailureReason, publishFile, acquireStagedFile, StagedOutputCleanupFailure, stagedOutputDiagnostics, failureMessage, writeStagedParts, assertWriteActive, fileErrorCode;
function init_TextFileWrite() {
	return (init_TextFileWrite = __esmMin((() => {
		init_HostPlatform();
		init_evidenceErrors();
		init_analysisErrorCore();
		init_result();
		init_ArtifactReader();
		init_ArtifactFileOperation();
		init_AnalysisCleanupLease();
		init_OwnedFileHandle();
		init_OwnedStagedOutput();
		init_StagedOutputError();
		init_callerPath();
		writeTextFile = async (encoded, path, overwrite, resources) => writeTextParts([encoded], path, overwrite, resources);
		writeTextPartsOwned = async (parts, path, overwrite, resources, cancellation) => {
			const requestedPath = absoluteCallerPath(path);
			try {
				assertWriteActive(cancellation);
				if (HOST_PLATFORM.platform !== "win32" && requestedPath.endsWith("/")) return err(new EvidenceFileError("write", "not-file", { path: requestedPath }));
				const selectedParent = dirname(requestedPath);
				if (!(await stat(selectedParent)).isDirectory()) return err(new EvidenceFileError("write", "missing", { path: requestedPath }));
				const canonicalParent = await realpath(selectedParent);
				const destination = resolve(canonicalParent, basename(requestedPath));
				const existing = await lstat(destination).catch((cause) => {
					if (fileErrorCode(cause) === "ENOENT") return undefined;
					throw cause;
				});
				if (existing !== undefined) {
					if (!existing.isFile() || existing.isSymbolicLink()) return err(new EvidenceFileError("write", "not-file", { path: requestedPath }));
					if (!overwrite) return err(new EvidenceFileError("write", "exists", { path: requestedPath }));
				}
				assertWriteActive(cancellation);
				const bytes = await publishFile(destination, parts, overwrite, resources, cancellation);
				return ok({
					path: requestedPath,
					bytes
				});
			} catch (cause) {
				if (cause instanceof StagedOutputCleanupFailure) {
					const cleanup = {
						reason: failureMessage(cause.cleanupCause),
						resources: [cause.owner.directory]
					};
					if (cause.outcome.ok) return stagedCleanupFailure(new EvidenceFileError("write", "io", {
						cause,
						path: requestedPath,
						cleanup,
						published: {
							...cause.outcome.value,
							path: requestedPath
						},
						...stagedOutputDiagnostics(cause.cleanupCause)
					}), cause.lease);
					if (cause.outcome.error instanceof AnalysisCancelledError) return stagedCleanupFailure(cancelledBy(cause.outcome.error.operation, carriedReason(cause.outcome.error.cause), {
						cleanupPrimary: cause.outcome.error,
						cleanup
					}), cause.lease);
					const failure = classifyWriteFailure(cause.outcome.error);
					return stagedCleanupFailure(new EvidenceFileError("write", failure.reason, {
						cause,
						path: requestedPath,
						cleanup,
						...failure.systemCode === undefined ? {} : { systemCode: failure.systemCode },
						...stagedOutputDiagnostics(!cause.outcome.ok && cause.outcome.error instanceof StagedOutputError ? cause.outcome.error : cause.cleanupCause)
					}), cause.lease);
				}
				if (cancellation?.signal.aborted === true && cause instanceof AnalysisCancelledError && cause.operation === cancellation.operation) return err(cause);
				if (!overwrite && fileErrorCode(cause) === "EEXIST") return err(new EvidenceFileError("write", "exists", {
					cause,
					path: requestedPath
				}));
				const failure = classifyWriteFailure(cause);
				return err(new EvidenceFileError("write", failure.reason, {
					cause,
					path: requestedPath,
					...failure.systemCode === undefined ? {} : { systemCode: failure.systemCode },
					...stagedOutputDiagnostics(cause)
				}));
			}
		};
		classifyWriteFailure = (cause) => {
			const code = fileErrorCode(cause);
			return code === "EFBIG" || code === "ENOSPC" || code === "EDQUOT" ? {
				reason: "storage-limit",
				systemCode: code
			} : { reason: fileAccessFailureReason(cause) };
		};
		stagedCleanupFailure = (error, lease) => {
			new AnalysisCleanupLeaseGroup(error, [lease]);
			return err(error);
		};
		fileAccessFailureReason = (cause) => {
			const code = fileErrorCode(cause);
			if (code === "ENAMETOOLONG") return "path-limit";
			if (code === "ELOOP") return "symlink-traversal";
			return code === "ENOENT" || code === "ENOTDIR" ? "missing" : "io";
		};
		publishFile = async (destination, parts, overwrite, resources, cancellation) => {
			const { owner, staged, file } = await acquireStagedFile(dirname(destination), resources, cancellation);
			let outcome;
			try {
				let written;
				try {
					const bytes = await writeStagedParts(file, parts, cancellation);
					assertWriteActive(cancellation);
					await file.sync();
					written = ok(bytes);
				} catch (cause) {
					written = err(cause);
				}
				try {
					await owner.closeFile();
				} catch (cause) {
					if (written.ok) written = err(cause);
				}
				if (!written.ok) throw written.error;
				assertWriteActive(cancellation);
				await owner.assertReadyForPublication(staged);
				assertWriteActive(cancellation);
				if (overwrite) {
					await rename(staged, destination);
					owner.recordPublishedRename();
				} else await link(staged, destination);
				outcome = ok({
					path: destination,
					bytes: written.value
				});
			} catch (cause) {
				outcome = err(cause);
			}
			const released = await resources.release({
				kind: "staged-output",
				resource: owner.directory,
				output: owner
			});
			if (released.kind === "failed") throw new StagedOutputCleanupFailure(outcome, released.cause, owner, released.lease);
			if (!outcome.ok) throw outcome.error;
			return outcome.value.bytes;
		};
		acquireStagedFile = async (destinationParent, resources, cancellation) => {
			const destinationDevice = (await lstat(destinationParent)).dev;
			let parent = destinationParent;
			for (;;) {
				assertWriteActive(cancellation);
				let failure;
				let directory;
				try {
					directory = await mkdtemp(resolve(parent, ".rea-write-"));
				} catch (cause) {
					if (fileErrorCode(cause) !== "ENAMETOOLONG") throw cause;
					failure = cause;
				}
				if (directory !== undefined) {
					const owner = await OwnedStagedOutput.create(directory);
					const staged = resolve(directory, "content");
					try {
						const file = await open(staged, "wx", 384);
						owner.setFile(new OwnedFileHandle(file));
						return {
							owner,
							staged,
							file
						};
					} catch (cause) {
						const released = await resources.release({
							kind: "staged-output",
							resource: owner.directory,
							output: owner
						});
						if (released.kind === "failed") throw new StagedOutputCleanupFailure(err(cause), released.cause, owner, released.lease);
						if (fileErrorCode(cause) !== "ENAMETOOLONG") throw cause;
						failure = cause;
					}
				}
				const ancestor = dirname(parent);
				if (ancestor === parent) throw failure;
				const metadata = await lstat(ancestor);
				if (metadata.dev !== destinationDevice) throw failure;
				parent = ancestor;
			}
		};
		StagedOutputCleanupFailure = class extends Error {
			outcome;
			cleanupCause;
			owner;
			lease;
			constructor(outcome, cleanupCause, owner, lease) {
				super("Staged output cleanup failed", { cause: outcome.ok ? cleanupCause : outcome.error });
				this.outcome = outcome;
				this.cleanupCause = cleanupCause;
				this.owner = owner;
				this.lease = lease;
			}
		};
		stagedOutputDiagnostics = (cause) => {
			if (!(cause instanceof StagedOutputError)) return {};
			return { diagnostics: {
				code: cause.code,
				...cause.detail
			} };
		};
		failureMessage = (cause) => cause instanceof Error ? cause.message || cause.name : String(cause);
		writeStagedParts = async (file, parts, cancellation) => {
			assertWriteActive(cancellation);
			const iterator = parts[Symbol.iterator]();
			let exhausted = false;
			let bytes = 0;
			try {
				for (;;) {
					assertWriteActive(cancellation);
					const part = iterator.next();
					if (part.done) exhausted = true;
					assertWriteActive(cancellation);
					if (part.done) return bytes;
					await file.writeFile(part.value, { encoding: "utf8" });
					bytes += Buffer.byteLength(part.value, "utf8");
				}
			} finally {
				if (!exhausted) iterator.return?.();
			}
		};
		assertWriteActive = (cancellation) => {
			if (cancellation?.signal.aborted === true) throw cancelledBy(cancellation.operation, cancellation.signal);
		};
		fileErrorCode = (cause) => typeof cause === "object" && cause !== null && "code" in cause ? cause.code : undefined;
	})))();
}

//#endregion
//#region dist/domain/artifactIdentity.js
var logicalPathNfc, normalizeJoinedLogicalPath, logicalPathEscapesRoot, artifactIdForContent, artifactIdForNode, occurrenceIdForLocation, artifactGraphDigest, artifactManifestId, artifactContradictionId, artifactEdgeId;
function init_artifactIdentity() {
	return (init_artifactIdentity = __esmMin((() => {
		init_artifactIntegrity();
		init_canonicalDigest();
		logicalPathNfc = (value) => value.normalize("NFC");
		normalizeJoinedLogicalPath = (value) => {
			if (value.includes("\0")) return value;
			return logicalPathNfc(posix.normalize(value).replace(/^\.\//u, ""));
		};
		logicalPathEscapesRoot = (path) => path.includes("\0") || path === ".." || path.startsWith("../") || path.startsWith("/");
		artifactIdForContent = (sha256) => `art_${digestCanonicalValue({ sha256 }, "Artifact")}`;
		artifactIdForNode = (node) => node.content_state === "virtual" ? `art_${digestCanonicalValue({
			sha256: node.sha256,
			content_state: "virtual"
		}, "Artifact")}` : artifactIdForContent(node.sha256);
		occurrenceIdForLocation = (input) => input.logicalPath === "." ? `occ_${digestCanonicalValue({ root: input.rootArtifactId }, "Artifact")}` : `occ_${digestCanonicalValue({
			root_artifact_id: input.rootArtifactId,
			logical_path: input.logicalPath,
			entry_kind: input.entryKind,
			...input.duplicateOrdinal === undefined ? {} : { duplicate_ordinal: input.duplicateOrdinal }
		}, "Artifact")}`;
		artifactGraphDigest = (input) => digestCanonicalValue({
			nodes: input.nodes,
			occurrences: input.occurrences,
			edges: input.edges,
			integrity_contradictions: input.contradictions
		}, "Artifact");
		artifactManifestId = (rootArtifactId, graphSha256) => `agm_${digestCanonicalValue({
			root_artifact_id: rootArtifactId,
			graph_sha256: graphSha256
		}, "Artifact")}`;
		artifactContradictionId = (input) => `ic_${digestCanonicalValue({
			root_artifact_id: input.rootArtifactId,
			logical_path: input.logicalPath,
			...artifactIntegrityPairOf(input.integrity)
		}, "Artifact")}`;
		artifactEdgeId = (edge, occurrence) => `edge_${digestCanonicalValue({
			parent_artifact_id: edge.parent_artifact_id,
			child_artifact_id: occurrence.artifact_id,
			relation: edge.relation,
			occurrence_id: edge.occurrence_id,
			logical_path: occurrence.logical_path
		}, "Artifact")}`;
	})))();
}

//#endregion
//#region dist/resources/ArtifactPaths.js
var ABSOLUTE_DRIVE_PATH, PATH_DIAGNOSTIC_CODE_UNITS, pathDiagnostic, hasDestinationPath, ENGLISH_UNICODE_CASE_NOTE, ENGLISH_UNICODE_CASE_INVENTORY_LIMITATION, DestinationCaseCollisionFailure, DestinationPathUnrepresentableFailure, normalizeArtifactPath, ArtifactPathRegistry, emptyCaseNode, englishCaseFold, annotateEnglishUnicodeCaseCollisions, caseCollisionLimitation, destinationCaseCollision, englishUnicodeCaseCollisions, collisionsAlong;
function init_ArtifactPaths() {
	return (init_ArtifactPaths = __esmMin((() => {
		init_artifactIdentity();
		init_excerpt();
		init_unicodeCodePointOrder();
		init_ArtifactReader();
		ABSOLUTE_DRIVE_PATH = /^[A-Za-z]:[\\/]/u;
		PATH_DIAGNOSTIC_CODE_UNITS = 128;
		pathDiagnostic = (path) => quotedExcerpt(path, PATH_DIAGNOSTIC_CODE_UNITS);
		hasDestinationPath = (kind) => kind !== "metadata";
		ENGLISH_UNICODE_CASE_NOTE = "This comparison is not a filesystem observation.";
		ENGLISH_UNICODE_CASE_INVENTORY_LIMITATION = `Logical archive names collide under English (en-US) Unicode case folding; a case-insensitive destination cannot store both spellings. ${ENGLISH_UNICODE_CASE_NOTE}`;
		DestinationCaseCollisionFailure = class extends ArtifactReaderFailure {
			requestedPath;
			existingPath;
			constructor(requestedPath, existingPath, options) {
				super("path", `Destination filesystem cannot store both ${requestedPath} and ${existingPath}; inventory retains both logical names.`, options);
				this.requestedPath = requestedPath;
				this.existingPath = existingPath;
				this.name = "DestinationCaseCollisionFailure";
			}
		};
		DestinationPathUnrepresentableFailure = class extends ArtifactReaderFailure {
			requestedPath;
			constructor(requestedPath, options) {
				super("path", `Destination filesystem cannot represent ${pathDiagnostic(requestedPath)}.`, options);
				this.requestedPath = requestedPath;
				this.name = "DestinationPathUnrepresentableFailure";
			}
		};
		normalizeArtifactPath = (input) => {
			if (input.includes("\0") || input.startsWith("/") || ABSOLUTE_DRIVE_PATH.test(input)) throw new ArtifactReaderFailure("path", `Artifact path is absolute or unsafe: ${pathDiagnostic(input)}`);
			const normalized = logicalPathNfc(input).replace(/\/+$/u, "");
			const parts = normalized.split("/");
			if (normalized.length === 0 || parts.some((part) => part === "" || part === "." || part === "..") || posix.normalize(normalized) !== normalized) throw new ArtifactReaderFailure("path", `Artifact path is not normalized: ${pathDiagnostic(input)}`);
			return normalized;
		};
		ArtifactPathRegistry = class {
			budget;
			#root = {
				kind: undefined,
				occupied: false,
				children: new Map()
			};
			#nodeCount = 0;
			constructor(budget) {
				this.budget = budget;
			}
			add(path, kind) {
				if (!hasDestinationPath(kind)) return;
				this.#visit(path, kind);
			}
			/** Account for distinct prefixes without claiming file/directory validity. */
			reservePath(path) {
				this.#visit(path);
			}
			/**
			* Whether `path` equals an occupied file, sits under one, or is a prefix of
			* one. This does not insert nodes or consume the path budget.
			*/
			conflicts(path) {
				const parts = path.split("/");
				let node = this.#root;
				for (const part of parts) {
					if (node.occupied && node.kind !== "directory") return true;
					const child = node.children.get(part);
					if (child === undefined) return false;
					node = child;
				}
				return node.occupied || node.kind !== undefined || node.children.size > 0;
			}
			#visit(path, kind) {
				const parts = path.split("/");
				if (this.budget !== undefined && parts.length > this.budget.maxParts) throw this.budget.limitFailure?.("path_parts", this.budget.maxParts, parts.length) ?? artifactFixedLimitFailure({
					name: "The artifact path depth allowance",
					kind: "parser",
					limit: this.budget.maxParts,
					unit: "path parts"
				}, `An artifact path has ${String(parts.length)} parts, above ${String(this.budget.maxParts)}.`);
				if (this.budget !== undefined) {
					let observed = this.#root;
					for (const [index, part] of parts.entries()) {
						const existing = observed.children.get(part);
						if (existing === undefined) {
							if (parts.length - index > this.budget.maxNodes - this.#nodeCount) throw this.budget.limitFailure?.("path_nodes", this.budget.maxNodes, this.#nodeCount + parts.length - index) ?? artifactFixedLimitFailure({
								name: "The artifact path tree allowance",
								kind: "parser",
								limit: this.budget.maxNodes,
								unit: "path nodes"
							}, `The artifact paths need ${String(this.#nodeCount + parts.length - index)} path nodes, above ${String(this.budget.maxNodes)}.`);
							break;
						}
						observed = existing;
					}
				}
				let node = this.#root;
				for (const [index, part] of parts.entries()) {
					if (kind !== undefined && node.kind !== undefined && node.kind !== "directory") throw new ArtifactReaderFailure("path", `Artifact prefix conflict: ${pathDiagnostic(path)}`);
					let child = node.children.get(part);
					if (child === undefined) {
						child = {
							kind: undefined,
							occupied: false,
							children: new Map()
						};
						node.children.set(part, child);
						if (this.budget !== undefined) this.#nodeCount++;
					}
					node = child;
					if (kind !== undefined && index === parts.length - 1) {
						if (node.kind !== undefined && node.kind !== kind) throw new ArtifactReaderFailure("path", `Artifact path collision: ${pathDiagnostic(path)}`);
						if (kind !== "directory" && node.children.size > 0) throw new ArtifactReaderFailure("path", `Artifact prefix conflict: ${pathDiagnostic(path)}`);
					}
				}
				if (kind === "directory") node.occupied = false;
				else node.occupied = true;
				if (kind !== undefined) node.kind = kind;
			}
		};
		emptyCaseNode = () => ({
			bySpelling: new Map(),
			spellingsByFold: new Map(),
			terminals: []
		});
		englishCaseFold = (part) => part.toLocaleLowerCase("en-US");
		annotateEnglishUnicodeCaseCollisions = (occurrences) => {
			const destinations = occurrences.filter(({ entry_kind }) => hasDestinationPath(entry_kind));
			const collisions = englishUnicodeCaseCollisions(destinations.map(({ logical_path }) => logical_path));
			if (collisions.size === 0) return undefined;
			for (const occurrence of destinations) for (const collision of collisions.get(occurrence.logical_path) ?? []) occurrence.limitations.push(caseCollisionLimitation(occurrence.logical_path, collision));
			return ENGLISH_UNICODE_CASE_INVENTORY_LIMITATION;
		};
		caseCollisionLimitation = (path, { prefix, other, additional }) => {
			const others = additional === 0 ? other : `${other} and ${String(additional)} other spelling${additional === 1 ? "" : "s"}`;
			const subject = prefix === path ? `Logical path ${path} collides` : `Logical path ${path} is under ${prefix}, which collides`;
			return `${subject} under English (en-US) Unicode case folding with ${others}; a case-insensitive destination cannot store both. ${ENGLISH_UNICODE_CASE_NOTE}`;
		};
		destinationCaseCollision = (requestedPath, existingNames, options) => {
			const slash = requestedPath.lastIndexOf("/");
			const segment = slash < 0 ? requestedPath : requestedPath.slice(slash + 1);
			if (existingNames.includes(segment)) return undefined;
			const folded = englishCaseFold(segment);
			const existing = existingNames.filter((name) => englishCaseFold(name) === folded).sort(compareUnicodeCodePoints)[0];
			if (existing === undefined) return undefined;
			const parent = slash < 0 ? "" : requestedPath.slice(0, slash + 1);
			return new DestinationCaseCollisionFailure(requestedPath, `${parent}${existing}`, options);
		};
		englishUnicodeCaseCollisions = (paths) => {
			const root = emptyCaseNode();
			for (const path of paths) {
				if (path.length === 0 || path === ".") continue;
				let node = root;
				for (const part of path.split("/")) {
					let child = node.bySpelling.get(part);
					if (child === undefined) {
						const folded = englishCaseFold(part);
						const spellings = node.spellingsByFold.get(folded);
						if (spellings === undefined) node.spellingsByFold.set(folded, [part]);
						else spellings.push(part);
						child = emptyCaseNode();
						node.bySpelling.set(part, child);
					}
					node = child;
				}
				node.terminals.push(path);
			}
			const collisions = new Map();
			const pending = [{
				node: root,
				prefix: undefined,
				chain: undefined
			}];
			for (let item = pending.pop(); item !== undefined; item = pending.pop()) {
				const { node, prefix, chain } = item;
				if (chain !== undefined) for (const path of node.terminals) collisions.set(path, collisionsAlong(chain));
				for (const spellings of node.spellingsByFold.values()) spellings.sort(compareUnicodeCodePoints);
				for (const [spelling, child] of node.bySpelling) {
					const childPrefix = prefix === undefined ? spelling : `${prefix}/${spelling}`;
					const spellings = node.spellingsByFold.get(englishCaseFold(spelling)) ?? [];
					const other = spellings[0] === spelling ? spellings[1] : spellings[0];
					pending.push({
						node: child,
						prefix: childPrefix,
						chain: other === undefined ? chain : {
							collision: {
								prefix: childPrefix,
								other: prefix === undefined ? other : `${prefix}/${other}`,
								additional: spellings.length - 2
							},
							parent: chain
						}
					});
				}
			}
			return collisions;
		};
		collisionsAlong = (chain) => {
			const collisions = [];
			let link = chain;
			while (link !== undefined) {
				collisions.push(link.collision);
				link = link.parent;
			}
			return collisions.reverse();
		};
	})))();
}

//#endregion
//#region dist/resources/SafeOutputTreeAdmission.js
var SafeOutputTreeDestinationRefusal, outputDirectoryAdmissionRefusal;
function init_SafeOutputTreeAdmission() {
	return (init_SafeOutputTreeAdmission = __esmMin((() => {
		init_analysisErrorCore();
		init_ArtifactReader();
		SafeOutputTreeDestinationRefusal = class extends ArtifactReaderFailure {
			constructor(message, options) {
				super("path", message, options);
				this.name = "SafeOutputTreeDestinationRefusal";
			}
		};
		outputDirectoryAdmissionRefusal = (operation, field, cause) => {
			if (!(cause instanceof ArtifactReaderFailure) || cause.cleanup !== undefined) return cause;
			const refusal = cause instanceof SafeOutputTreeDestinationRefusal ? cause : cause.cause instanceof SafeOutputTreeDestinationRefusal ? cause.cause : undefined;
			return refusal === undefined ? cause : new AnalysisInputError(operation, {
				cause,
				userMessage: refusal.message
			}, [{
				path: [field],
				reason: "invalid_value",
				message: refusal.message
			}]);
		};
	})))();
}

//#endregion
//#region dist/resources/SafeOutputTreeCreationFailure.js
var SafeOutputTreeCreationFailure;
function init_SafeOutputTreeCreationFailure() {
	return (init_SafeOutputTreeCreationFailure = __esmMin((() => {
		init_ArtifactReader();
		init_errorMessage();
		SafeOutputTreeCreationFailure = class extends ArtifactReaderFailure {
			tree;
			constructor(cause, tree) {
				const primary = cause instanceof ArtifactReaderFailure ? cause : new ArtifactReaderFailure("io", errorMessage(cause), { cause });
				super(primary.reason, primary.message, {
					cause: primary,
					...primary.primaryFacts(),
					cancellation: primary.cancellation,
					...primary.cleanup === undefined ? {} : { cleanup: primary.cleanup },
					...primary.partialObservation === undefined ? {} : { partialObservation: primary.partialObservation }
				}, primary.details);
				this.name = "SafeOutputTreeCreationFailure";
				this.tree = tree;
			}
		};
	})))();
}

//#endregion
//#region dist/resources/SafeOutputTreeIdentity.js
var assertExactTreeEntries, readDirectoryIdentity, assertPathIdentity, assertHandleIdentity, readFileIdentity, assertFilePathIdentity, isAbsent, replacedDirectory, isNotFound;
function init_SafeOutputTreeIdentity() {
	return (init_SafeOutputTreeIdentity = __esmMin((() => {
		init_ArtifactReader();
		assertExactTreeEntries = async (root, directories, files) => {
			const expected = new Map();
			expected.set(root, new Set());
			for (const directory of directories.keys()) expected.set(directory, new Set());
			for (const path of directories.keys()) expected.get(dirname(path))?.add(basename(path));
			for (const path of files.keys()) expected.get(dirname(path))?.add(basename(path));
			for (const [directory, names] of expected) {
				const entries = await readdir(directory);
				const remaining = new Map();
				for (const name of names) {
					const key = name.normalize("NFC");
					remaining.set(key, (remaining.get(key) ?? 0) + 1);
				}
				let unexpected = entries.length !== names.size;
				for (const entry of entries) {
					const key = entry.normalize("NFC");
					const count = remaining.get(key) ?? 0;
					if (count === 0) unexpected = true;
					else remaining.set(key, count - 1);
				}
				if (unexpected) throw new ArtifactReaderFailure("path", `Unowned or missing output entries: ${directory}`);
			}
			for (const [path, identity] of files) await assertFilePathIdentity(path, identity);
		};
		readDirectoryIdentity = async (path) => {
			const metadata = await lstat(path, { bigint: true });
			if (!metadata.isDirectory()) throw new ArtifactReaderFailure("path", `Output destination must be a directory: ${path}`);
			return {
				dev: metadata.dev,
				ino: metadata.ino
			};
		};
		assertPathIdentity = async (path, expected) => {
			const metadata = await lstat(path, { bigint: true });
			if (!metadata.isDirectory() || metadata.dev !== expected.dev || metadata.ino !== expected.ino) throw replacedDirectory(path);
		};
		assertHandleIdentity = async (handle, expected, path) => {
			const metadata = await handle.stat({ bigint: true });
			if (!metadata.isDirectory() || metadata.dev !== expected.dev || metadata.ino !== expected.ino) throw replacedDirectory(path);
		};
		readFileIdentity = async (handle, path) => {
			const metadata = await handle.stat({ bigint: true });
			if (!metadata.isFile()) throw new ArtifactReaderFailure("path", `Extraction file identity changed: ${path}`);
			return {
				dev: metadata.dev,
				ino: metadata.ino
			};
		};
		assertFilePathIdentity = async (path, expected) => {
			const metadata = await lstat(path, { bigint: true });
			if (!metadata.isFile() || metadata.dev !== expected.dev || metadata.ino !== expected.ino) throw new ArtifactReaderFailure("path", `Extraction file identity changed: ${path}`);
		};
		isAbsent = async (path) => lstat(path).then(() => false, (cause) => {
			if (isNotFound(cause)) return true;
			throw cause;
		});
		replacedDirectory = (path) => new ArtifactReaderFailure("path", `Extraction directory identity changed: ${path}`);
		isNotFound = (cause) => cause instanceof Error && "code" in cause && cause.code === "ENOENT";
	})))();
}

//#endregion
//#region dist/resources/SafeOutputTreeReadback.js
var hashOutputFile;
function init_SafeOutputTreeReadback() {
	return (init_SafeOutputTreeReadback = __esmMin((() => {
		init_readArtifactFileChunks();
		init_ArtifactFileOperation();
		init_ArtifactReader();
		init_StreamBytes();
		init_SafeOutputTreeIdentity();
		hashOutputFile = async (owner, path, identity, options) => {
			assertArtifactReadActive(options.signal);
			const admittedIdentity = await readFileIdentity(owner.handle, path);
			await assertFilePathIdentity(path, identity);
			if (admittedIdentity.dev !== identity.dev || admittedIdentity.ino !== identity.ino) throw new ArtifactReaderFailure("path", `Extraction file identity changed: ${path}`);
			const hash = createHash("sha256");
			let bytes = 0;
			for await (const raw of readArtifactFileChunks(owner.handle, options)) {
				const chunk = streamChunkToBuffer(raw);
				bytes += chunk.length;
				if (bytes > options.maximum) throw new ArtifactReaderFailure("integrity", "Readback exceeded the bytes written", { integrityCheck: "output-readback" });
				hash.update(chunk);
			}
			await assertFilePathIdentity(path, identity);
			assertArtifactReadActive(options.signal);
			return {
				sha256: hash.digest("hex"),
				bytes
			};
		};
	})))();
}

//#endregion
//#region dist/resources/SafeOutputTreeCleanup.js
var removeOwnedTree, removeFiles, requireEmpty;
function init_SafeOutputTreeCleanup() {
	return (init_SafeOutputTreeCleanup = __esmMin((() => {
		init_ArtifactReader();
		init_SafeOutputTreeIdentity();
		removeOwnedTree = async (input) => {
			const { outputRoot, rootIdentity, directories, files } = input;
			const filesByDirectory = new Map();
			for (const entry of files) {
				const directory = dirname(entry[0]);
				const group = filesByDirectory.get(directory) ?? [];
				group.push(entry);
				filesByDirectory.set(directory, group);
			}
			const postorder = [...directories].sort(([left], [right]) => right.slice(outputRoot.length).split(sep).length - left.slice(outputRoot.length).split(sep).length);
			for (const [path, identity] of postorder) {
				await removeFiles(path, identity, filesByDirectory.get(path) ?? [], files);
				const parentPath = dirname(path);
				const parentIdentity = parentPath === outputRoot ? rootIdentity : directories.get(parentPath);
				if (parentIdentity === undefined) throw replacedDirectory(parentPath);
				await assertPathIdentity(parentPath, parentIdentity);
				await assertPathIdentity(path, identity);
				await requireEmpty(path);
				await rmdir(path);
				directories.delete(path);
			}
			await removeFiles(outputRoot, rootIdentity, filesByDirectory.get(outputRoot) ?? [], files);
			await assertPathIdentity(outputRoot, rootIdentity);
			await requireEmpty(outputRoot);
			if (!input.preserveRoot) await rmdir(outputRoot);
		};
		removeFiles = async (directory, identity, filesInDirectory, retainedFiles) => {
			for (const [path, fileIdentity] of filesInDirectory) {
				await assertPathIdentity(directory, identity);
				await assertFilePathIdentity(path, fileIdentity);
				await unlink(path);
				retainedFiles.delete(path);
			}
		};
		requireEmpty = async (directory) => {
			if ((await readdir(directory)).length > 0) throw new ArtifactReaderFailure("path", `Unowned entries remain in extraction directory: ${directory}`);
		};
	})))();
}

//#endregion
//#region dist/resources/SafeOutputTree.js
var admitOutputRootSyntax, createOutputParents, SafeOutputTree, isRejected, writeAll, normalizeDestinationPath, abortIfNeeded, isCancellationFailure, isAlreadyExists, throwIfDestinationCaseCollision, hasUnrepresentableName;
function init_SafeOutputTree() {
	return (init_SafeOutputTree = __esmMin((() => {
		init_HostPlatform();
		init_OwnedFileHandle();
		init_StreamBytes();
		init_ArtifactPaths();
		init_callerPath();
		init_ArtifactReader();
		init_SafeOutputTreeAdmission();
		init_SafeOutputTreeCreationFailure();
		init_SafeOutputTreeReadback();
		init_SafeOutputTreeCleanup();
		init_SafeOutputTreeIdentity();
		init_errorMessage();
		admitOutputRootSyntax = (outputRoot) => {
			if (!isAbsolute(outputRoot)) throw new SafeOutputTreeDestinationRefusal("Output root must be absolute");
			const requested = absoluteCallerPath(outputRoot);
			const name = basename(requested);
			if (name === "." || name === "..") throw new SafeOutputTreeDestinationRefusal("Invalid output directory");
			return requested;
		};
		createOutputParents = async (outputRoot) => {
			const requested = admitOutputRootSyntax(outputRoot);
			await mkdir(dirname(requested), {
				recursive: true,
				mode: 448
			}).catch((cause) => {
				const code = cause instanceof Error && "code" in cause ? String(cause.code) : "";
				if (code === "EEXIST" || code === "ENOTDIR") throw new SafeOutputTreeDestinationRefusal("Output parent must be a directory", { cause });
				if (code === "EACCES" || code === "EPERM") throw new SafeOutputTreeDestinationRefusal("Output parent is unavailable", { cause });
				throw cause;
			});
		};
		SafeOutputTree = class SafeOutputTree {
			platform;
			selectedRoot;
			#registry = new ArtifactPathRegistry();
			#outputRoot;
			#rootIdentity;
			#nestedDirectories = new Map();
			#unknownDirectories = new Set();
			#ownedFiles = new Map();
			/** Exclusive files awaiting identity admission; admitted identity and handles have separate owners. */
			#pendingFiles = new Map();
			#openHandles = new Set();
			#published = false;
			#createdRoot = true;
			#cleanup = { status: "not-required" };
			constructor(outputRoot, platform, selectedRoot) {
				this.platform = platform;
				this.selectedRoot = selectedRoot;
				this.#outputRoot = outputRoot;
			}
			/**
			* Exclusively create the destination, or explicitly admit a caller-owned empty
			* directory. Admission never grants authority to remove that existing root.
			*
			* Windows inherits ACLs: mode bits do not establish owner-only access there.
			* Directory `fchmod`/`fsync` are skipped on Windows because those operations
			* have no equivalent on the directory descriptor.
			*/
			static async create(outputRoot, platform = HOST_PLATFORM.platform, options = {}) {
				if (options.createParents === true) await createOutputParents(outputRoot);
				const { requested, canonicalOutput } = await this.resolveDestination(outputRoot);
				let created = true;
				await mkdir(canonicalOutput, { mode: 448 }).catch((cause) => {
					if (!isAlreadyExists(cause)) throw cause;
					if (options.acceptExistingEmpty) {
						created = false;
						return;
					}
					throw new SafeOutputTreeDestinationRefusal("Output root already exists", { cause });
				});
				const tree = new SafeOutputTree(canonicalOutput, platform, requested);
				tree.#createdRoot = created;
				try {
					const rootIdentity = await readDirectoryIdentity(canonicalOutput).catch((cause) => {
						if (!created && cause instanceof ArtifactReaderFailure && cause.reason === "path") throw new SafeOutputTreeDestinationRefusal(cause.message, { cause });
						throw cause;
					});
					tree.#rootIdentity = rootIdentity;
					if (!created && (await readdir(canonicalOutput)).length > 0) throw new SafeOutputTreeDestinationRefusal("Output directory is not empty");
					if (created) await tree.#secureCreatedDirectory(canonicalOutput, rootIdentity);
					await assertPathIdentity(canonicalOutput, rootIdentity);
					return tree;
				} catch (cause) {
					throw new SafeOutputTreeCreationFailure(cause, tree);
				}
			}
			/** Read-only early admission; create() still rechecks and acquires exclusively. */
			static async checkDestination(outputRoot) {
				const { canonicalOutput } = await this.resolveDestination(outputRoot);
				const existing = await lstat(canonicalOutput).catch((cause) => {
					if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return undefined;
					if (cause instanceof Error && "code" in cause && [
						"ENOTDIR",
						"EACCES",
						"EPERM"
					].includes(String(cause.code))) throw new SafeOutputTreeDestinationRefusal("Output path is unavailable", { cause });
					throw cause;
				});
				if (existing !== undefined) throw new SafeOutputTreeDestinationRefusal("Output root already exists");
				await access(dirname(canonicalOutput), constants.W_OK | constants.X_OK).catch((cause) => {
					if (cause instanceof Error && "code" in cause && [
						"EACCES",
						"EPERM",
						"ENOENT",
						"ENOTDIR"
					].includes(String(cause.code))) throw new SafeOutputTreeDestinationRefusal("Output parent is not writable", { cause });
					throw cause;
				});
			}
			/** Resolve an admissible parent without acquiring output; create rechecks it. */
			static async resolveDestination(outputRoot) {
				const requested = admitOutputRootSyntax(outputRoot);
				const name = basename(requested);
				let parent;
				try {
					const selectedParent = dirname(requested);
					if (!(await stat(selectedParent)).isDirectory()) throw new SafeOutputTreeDestinationRefusal("Output parent must be a directory");
					parent = await realpath(selectedParent);
				} catch (cause) {
					if (cause instanceof SafeOutputTreeDestinationRefusal) throw cause;
					if (cause instanceof Error && "code" in cause && [
						"ENOENT",
						"ENOTDIR",
						"EACCES",
						"EPERM"
					].includes(String(cause.code))) throw new SafeOutputTreeDestinationRefusal("Output parent is unavailable", { cause });
					throw new ArtifactReaderFailure("unavailable", "Output parent is unavailable", { cause });
				}
				const canonicalOutput = join(parent, name);
				return {
					requested,
					canonicalOutput
				};
			}
			get outputRoot() {
				return this.#outputRoot;
			}
			/** The output was durably committed, even if descriptor cleanup later failed. */
			get published() {
				return this.#published;
			}
			get cleanup() {
				return structuredClone(this.#cleanup);
			}
			/** Stream one regular file with exact byte and digest verification. */
			async write(relativePath, source, expected, signal) {
				try {
					this.#assertWritable();
					if (!Number.isSafeInteger(expected.bytes) || expected.bytes < 0) throw new ArtifactReaderFailure("format", `Invalid expected extraction size for ${relativePath}`);
					const path = normalizeDestinationPath(relativePath, this.platform);
					this.#registry.add(path, "file");
					const lineage = await this.#prepareParent(path);
					const parent = lineage.at(-1);
					if (parent === undefined) throw replacedDirectory(this.#outputRoot);
					const fileName = path.slice(path.lastIndexOf("/") + 1);
					const destination = join(parent.path, fileName);
					const handle = await open(destination, constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY | constants.O_NOFOLLOW, 384).catch(async (cause) => {
						if (hasUnrepresentableName(cause)) throw new DestinationPathUnrepresentableFailure(path, { cause });
						if (isAlreadyExists(cause)) await throwIfDestinationCaseCollision(parent.path, path, cause);
						throw new ArtifactReaderFailure("path", `Could not exclusively create extraction path: ${path}`, { cause });
					});
					const ownedHandle = this.#trackHandle(handle);
					this.#pendingFiles.set(destination, ownedHandle);
					const fileIdentity = await readFileIdentity(ownedHandle.handle, destination);
					await assertFilePathIdentity(destination, fileIdentity);
					this.#ownedFiles.set(destination, fileIdentity);
					this.#pendingFiles.delete(destination);
					if (this.platform !== "win32") {
						await ownedHandle.handle.chmod(384);
						if (((await ownedHandle.handle.stat()).mode & 511) !== 384) throw new ArtifactReaderFailure("path", "Could not establish private output file permissions");
					}
					const hash = createHash("sha256");
					let bytes = 0;
					await this.#assertLineage(lineage);
					for await (const raw of source) {
						abortIfNeeded(signal);
						const chunk = streamChunkToBuffer(raw);
						if (chunk.length > expected.bytes - bytes) throw new ArtifactReaderFailure("integrity", `Extracted content exceeds the inventoried size: ${path}`, { integrityCheck: "declared-size" });
						bytes += chunk.length;
						hash.update(chunk);
						await writeAll(ownedHandle.handle, chunk);
					}
					if (bytes !== expected.bytes) throw new ArtifactReaderFailure("integrity", `Extracted content size disagrees with inventory: ${path}`, { integrityCheck: "declared-size" });
					const sha256 = hash.digest("hex");
					if (sha256 !== expected.sha256) throw new ArtifactReaderFailure("integrity", `Extracted content disagrees with inventory: ${path}`, { integrityCheck: "member-identity" });
					await this.#assertLineage(lineage);
					await assertFilePathIdentity(destination, fileIdentity);
					await ownedHandle.handle.sync();
					await this.#closeHandle(ownedHandle);
					const readbackHandle = this.#trackHandle(await open(destination, constants.O_RDONLY | constants.O_NOFOLLOW));
					const readback = await hashOutputFile(readbackHandle, destination, fileIdentity, {
						maximum: bytes,
						signal
					});
					await this.#closeHandle(readbackHandle);
					await this.#assertLineage(lineage);
					await assertFilePathIdentity(destination, fileIdentity);
					if (readback.sha256 !== sha256 || readback.bytes !== bytes) throw new ArtifactReaderFailure("integrity", `Durable readback verification failed: ${path}`, { integrityCheck: "output-readback" });
					return {
						relativePath: path,
						sha256,
						bytesWritten: bytes
					};
				} catch (cause) {
					try {
						source.destroy();
					} catch {}
					throw cause;
				}
			}
			/** Sync files' containing directories from children to root, then publish the root in its parent. */
			async commit(signal) {
				this.#assertWritable();
				abortIfNeeded(signal);
				await this.#assertOwnedDirectories();
				await this.#assertExactEntries();
				abortIfNeeded(signal);
				if (this.platform === "win32") {
					this.#published = true;
					return;
				}
				const parent = this.#trackHandle(await open(dirname(this.#outputRoot), constants.O_RDONLY | constants.O_DIRECTORY));
				const handles = [parent];
				let sync = { kind: "synced" };
				try {
					const directories = [...this.#nestedDirectories].reverse();
					directories.push([this.#outputRoot, this.#requireRootIdentity()]);
					for (const [path, identity] of directories) {
						abortIfNeeded(signal);
						const directory = this.#trackHandle(await open(path, constants.O_RDONLY | constants.O_DIRECTORY));
						handles.push(directory);
						await assertHandleIdentity(directory.handle, identity, path);
						await directory.handle.sync();
						abortIfNeeded(signal);
						await this.#closeHandle(directory);
						handles.pop();
					}
					await parent.handle.sync();
					abortIfNeeded(signal);
					await this.#assertExactEntries();
					abortIfNeeded(signal);
					this.#published = true;
				} catch (cause) {
					sync = {
						kind: "failed",
						cause
					};
				}
				const closeResults = await Promise.allSettled(handles.map((handle) => this.#closeHandle(handle)));
				const closeFailures = closeResults.filter(isRejected).map(({ reason }) => reason);
				if (closeFailures.length > 0) {
					const closeFailure = new AggregateError(closeFailures, "Output directory handles could not be closed");
					const cleanup = ArtifactReaderFailure.cleanupObservation(closeFailure, this.#outputRoot);
					if (sync.kind === "failed") {
						const primary = isCancellationFailure(sync.cause) ? sync.cause : new ArtifactReaderFailure("path", "Could not durably sync extraction output", { cause: sync.cause });
						throw ArtifactReaderFailure.withCleanup(primary, cleanup);
					}
					throw ArtifactReaderFailure.withCleanup(closeFailure, cleanup);
				}
				if (sync.kind === "failed") {
					if (isCancellationFailure(sync.cause)) throw sync.cause;
					throw new ArtifactReaderFailure("path", "Could not durably sync extraction output", { cause: sync.cause });
				}
			}
			/** Remove only this operation's unsealed tree and verify absence. */
			async rollback() {
				if (this.#published) {
					await this.closeHandles();
					return structuredClone(this.#cleanup);
				}
				if (this.#cleanup.status === "complete") return structuredClone(this.#cleanup);
				this.#cleanup = {
					status: "incomplete",
					residualPaths: [basename(this.#outputRoot)]
				};
				let removalFailure;
				try {
					await this.#admitPendingFiles();
					await this.closeHandles();
					await this.#assertOwnedDirectories();
					await removeOwnedTree({
						outputRoot: this.#outputRoot,
						rootIdentity: this.#requireRootIdentity(),
						directories: this.#nestedDirectories,
						files: this.#ownedFiles,
						preserveRoot: !this.#createdRoot
					});
					if (!this.#createdRoot) await assertPathIdentity(this.#outputRoot, this.#requireRootIdentity());
				} catch (cause) {
					removalFailure = cause;
				}
				const complete = removalFailure === undefined && (!this.#createdRoot || await isAbsent(this.#outputRoot));
				this.#cleanup = complete ? {
					status: "complete",
					residualPaths: []
				} : {
					status: "incomplete",
					residualPaths: [basename(this.#outputRoot)]
				};
				if (!complete) throw new ArtifactReaderFailure("integrity", `Output cleanup could not be verified${removalFailure === undefined ? "" : `: ${errorMessage(removalFailure)}`}`, {
					integrityCheck: "output-lifecycle",
					cause: removalFailure,
					cleanup: {
						reason: removalFailure instanceof Error ? removalFailure.message : "Output root remains after rollback",
						resources: [this.#outputRoot]
					}
				});
				return structuredClone(this.#cleanup);
			}
			async #secureCreatedDirectory(path, identity) {
				if (this.platform === "win32") return;
				const stagingHandle = this.#trackHandle(await open(path, constants.O_RDONLY | constants.O_DIRECTORY).catch(async (cause) => {
					if (!(cause instanceof Error) || !("code" in cause) || cause.code !== "EACCES") throw cause;
					await assertPathIdentity(path, identity);
					await chmod(path, 448);
					await assertPathIdentity(path, identity);
					return open(path, constants.O_RDONLY | constants.O_DIRECTORY);
				}));
				let setup = { kind: "ready" };
				try {
					await assertHandleIdentity(stagingHandle.handle, identity, path);
					await stagingHandle.handle.chmod(448);
					if (((await stagingHandle.handle.stat()).mode & 511) !== 448) throw new ArtifactReaderFailure("path", "Could not establish owner access to output directory");
				} catch (cause) {
					setup = {
						kind: "failed",
						cause
					};
				}
				try {
					await this.#closeHandle(stagingHandle);
				} catch (closeCause) {
					if (setup.kind === "failed") throw ArtifactReaderFailure.withCleanup(setup.cause, ArtifactReaderFailure.cleanupObservation(closeCause, path));
					throw closeCause;
				}
				if (setup.kind === "failed") throw setup.cause;
			}
			async #prepareParent(relativePath) {
				const parts = relativePath.split("/");
				if (parts.pop() === undefined) throw new ArtifactReaderFailure("path", "Invalid output path");
				let current = this.#outputRoot;
				let logicalParent = "";
				const lineage = [{
					path: this.#outputRoot,
					identity: this.#requireRootIdentity()
				}];
				if (parts.length === 0) await assertPathIdentity(this.#outputRoot, this.#requireRootIdentity());
				for (const part of parts) {
					const parent = lineage.at(-1);
					if (parent === undefined) throw replacedDirectory(this.#outputRoot);
					const logicalPath = logicalParent.length === 0 ? part : `${logicalParent}/${part}`;
					current = join(current, part);
					await assertPathIdentity(parent.path, parent.identity);
					const creation = await mkdir(current, { mode: 448 }).then(() => ({ kind: "created" }), (cause) => {
						if (hasUnrepresentableName(cause)) throw new DestinationPathUnrepresentableFailure(logicalPath, { cause });
						if (!isAlreadyExists(cause)) throw cause;
						return {
							kind: "existing",
							cause
						};
					});
					if (creation.kind === "existing") {
						await throwIfDestinationCaseCollision(parent.path, logicalPath, creation.cause);
						const identity = this.#nestedDirectories.get(current);
						if (identity === undefined) throw replacedDirectory(current);
						await assertPathIdentity(current, identity);
					} else {
						const identity = await readDirectoryIdentity(current).catch((cause) => {
							this.#unknownDirectories.add(current);
							throw cause;
						});
						this.#nestedDirectories.set(current, identity);
						await this.#secureCreatedDirectory(current, identity);
					}
					await assertPathIdentity(parent.path, parent.identity);
					const identity = this.#nestedDirectories.get(current);
					if (identity === undefined) throw replacedDirectory(current);
					await assertPathIdentity(current, identity);
					lineage.push({
						path: current,
						identity
					});
					logicalParent = logicalPath;
				}
				return lineage;
			}
			async #assertLineage(lineage) {
				for (const { path, identity } of lineage) await assertPathIdentity(path, identity);
			}
			async #assertOwnedDirectories() {
				const rootIdentity = this.#requireRootIdentity();
				await assertPathIdentity(this.#outputRoot, rootIdentity);
				await assertPathIdentity(this.selectedRoot, rootIdentity);
				for (const [path, identity] of this.#nestedDirectories) await assertPathIdentity(path, identity);
				if (this.#unknownDirectories.size > 0) throw new ArtifactReaderFailure("path", `Extraction directory ownership is unknown: ${[...this.#unknownDirectories].join(", ")}`);
			}
			async #assertExactEntries() {
				await assertExactTreeEntries(this.#outputRoot, this.#nestedDirectories, this.#ownedFiles);
				await this.#assertOwnedDirectories();
			}
			#requireRootIdentity() {
				if (this.#rootIdentity === undefined) throw new ArtifactReaderFailure("path", `Output root identity is unknown: ${this.#outputRoot}`);
				return this.#rootIdentity;
			}
			#assertWritable() {
				if (this.#published) throw new ArtifactReaderFailure("integrity", "Extraction tree is already committed", { integrityCheck: "output-lifecycle" });
				if (this.#cleanup.status !== "not-required") throw new ArtifactReaderFailure("integrity", "Extraction tree cleanup has already started", { integrityCheck: "output-lifecycle" });
			}
			#trackHandle(handle) {
				const owner = new OwnedFileHandle(handle);
				this.#openHandles.add(owner);
				return owner;
			}
			async #closeHandle(owner) {
				await owner.close();
				this.#openHandles.delete(owner);
			}
			/** Release descriptors without deleting an inspectable partial output tree. */
			async closeHandles() {
				const failures = [];
				for (const owner of this.#openHandles) {
					try {
						await this.#closeHandle(owner);
					} catch (cause) {
						failures.push(cause);
					}
				}
				if (failures.length > 0) throw new AggregateError(failures, "Output tree handles remain open");
			}
			async #admitPendingFiles() {
				for (const [path, owner] of this.#pendingFiles) {
					let identity = this.#ownedFiles.get(path);
					if (identity === undefined) {
						identity = await readFileIdentity(owner.handle, path);
						await assertFilePathIdentity(path, identity);
						this.#ownedFiles.set(path, identity);
					}
					this.#pendingFiles.delete(path);
				}
			}
		};
		isRejected = (result) => result.status === "rejected";
		writeAll = async (handle, chunk) => {
			let offset = 0;
			while (offset < chunk.length) {
				const { bytesWritten } = await handle.write(chunk, offset, chunk.length - offset);
				if (bytesWritten === 0) throw new ArtifactReaderFailure("unavailable", "Output stopped accepting bytes");
				offset += bytesWritten;
			}
		};
		normalizeDestinationPath = (relativePath, platform) => {
			const path = normalizeArtifactPath(relativePath);
			if (platform === "win32" && path.includes("\\")) throw new ArtifactReaderFailure("path", `Windows destination cannot materialize artifact path: ${JSON.stringify(path)}; backslashes denote path separators.`);
			if (platform === "win32" && path.includes(":")) throw new ArtifactReaderFailure("path", `Windows destination cannot materialize artifact path as a regular file: ${path}; ':' denotes alternate data stream syntax.`);
			if (platform === "win32" && /[\u0001-\u001f]/u.test(path)) throw new ArtifactReaderFailure("path", `Windows destination cannot materialize artifact path: ${JSON.stringify(path)}; Windows names cannot contain U+0001-U+001F.`);
			return path;
		};
		abortIfNeeded = (signal) => {
			if (signal?.aborted === true) throw new ArtifactReaderFailure("cancelled", "Artifact extraction cancelled", { cause: signal.reason });
		};
		isCancellationFailure = (cause) => cause instanceof ArtifactReaderFailure && cause.reason === "cancelled";
		isAlreadyExists = (cause) => cause instanceof Error && "code" in cause && cause.code === "EEXIST";
		throwIfDestinationCaseCollision = async (parentDirectory, logicalPath, cause) => {
			const names = await readdir(parentDirectory).catch(() => undefined);
			if (names === undefined) return;
			const failure = destinationCaseCollision(logicalPath, names, cause === undefined ? undefined : { cause });
			if (failure !== undefined) throw failure;
		};
		hasUnrepresentableName = (cause) => cause instanceof Error && "code" in cause && cause.code === "ENAMETOOLONG";
	})))();
}

//#endregion
//#region dist/resources/StableRootArtifact.js
var releaseRootArtifact, openRootArtifact, hashStableRootArtifact, hashStableRootArtifactHandle;
function init_StableRootArtifact() {
	return (init_StableRootArtifact = __esmMin((() => {
		init_ArtifactFileOperation();
		init_ArtifactReader();
		init_OwnedRegularFile();
		init_readArtifactFileChunks();
		init_OwnedFileHandle();
		init_RegularFile();
		init_StreamDigest();
		init_fileSnapshotObservation();
		releaseRootArtifact = async (path, owner, resourceScope, outcome, signal) => {
			const cleanup = await resourceScope.release({
				kind: "file-handle",
				resource: `root artifact descriptor for ${path}`,
				handle: owner
			});
			const observation = outcome.kind === "completed" && outcome.digest !== null ? fileSnapshotPartialObservationSchema.parse({
				kind: "file-snapshot-hash",
				path,
				sha256: outcome.digest.sha256,
				bytes: outcome.digest.bytes
			}) : undefined;
			const finalOutcome = outcome.kind === "completed" && signal?.aborted ? {
				kind: "failed",
				cause: new ArtifactReaderFailure("cancelled", "Root artifact inventory cancelled during descriptor finalization", {
					cause: signal.reason,
					partialObservation: observation
				})
			} : outcome;
			if (cleanup.kind === "failed") throw resourceScope.cleanupFailure(finalOutcome, [cleanup], observation);
			if (finalOutcome.kind === "failed") throw finalOutcome.cause;
		};
		openRootArtifact = async (path, resourceScope, signal) => {
			try {
				const source = await openRegularFile(path, {
					symlinks: "reject",
					signal
				});
				return {
					...source,
					owner: new OwnedFileHandle(source.handle)
				};
			} catch (cause) {
				const primary = cause instanceof RegularFileAdmissionFailure ? cause.cause : cause;
				const cancellation = regularFileCancellation(primary);
				const failure = cancellation !== undefined ? new ArtifactReaderFailure("cancelled", "Artifact admission cancelled", { cause: cancellation.reason }) : primary instanceof NonRegularFileReadError ? new ArtifactReaderFailure("format", `Artifact root is not a regular file: ${path}`, { cause: primary }) : primary;
				if (cause instanceof RegularFileAdmissionFailure) {
					const resource = `root artifact descriptor for ${path}`;
					const cleanup = await resourceScope.release({
						kind: "file-handle",
						resource,
						handle: cause.owner
					});
					if (cleanup.kind === "failed") throw resourceScope.cleanupFailure({
						kind: "failed",
						cause: failure
					}, [cleanup]);
				}
				throw failure;
			}
		};
		hashStableRootArtifact = async (path, resourceScope, signal) => {
			const { handle, initial, owner } = await openRootArtifact(path, resourceScope, signal);
			let outcome;
			try {
				outcome = {
					kind: "completed",
					value: await hashStableRootArtifactHandle(path, handle, initial, signal)
				};
			} catch (cause) {
				outcome = {
					kind: "failed",
					cause
				};
			}
			await releaseRootArtifact(path, owner, resourceScope, outcome.kind === "completed" ? {
				kind: "completed",
				digest: outcome.value
			} : outcome, signal);
			if (outcome.kind === "failed") throw outcome.cause;
			return outcome.value;
		};
		hashStableRootArtifactHandle = async (path, handle, initial, signal, observe) => {
			const digest = await digestReadableToCompletion(readArtifactFileChunks(handle, {
				start: 0,
				end: initial.size,
				signal
			}), signal, undefined, observe);
			abortIfNeeded$2(signal);
			try {
				await assertStableRegularFileIdentity(handle, path, initial, {
					symlinks: "reject",
					...signal === undefined ? {} : { signal }
				});
			} catch (cause) {
				if (cause instanceof RegularFileChangedError) throw new ArtifactReaderFailure("integrity", `Root artifact changed during inventory: ${path}`, {
					cause: cause.cause ?? cause,
					integrityCheck: "container-identity"
				});
				throw artifactOperationCause(cause);
			}
			if (digest.bytes !== initial.size) throw new ArtifactReaderFailure("integrity", `Root artifact changed during inventory: ${path}`, { integrityCheck: "container-identity" });
			abortIfNeeded$2(signal);
			return digest;
		};
	})))();
}

//#endregion
//#region dist/resources/withArtifactTargetIdentity.js
var targetDigestChangedFailure, withArtifactTargetIdentity;
function init_withArtifactTargetIdentity() {
	return (init_withArtifactTargetIdentity = __esmMin((() => {
		init_ArtifactReader();
		init_StableRootArtifact();
		targetDigestChangedFailure = (subject, expected, observed) => new ArtifactReaderFailure("integrity", `Active ${subject} digest changed: expected ${expected}, observed ${observed}`, { integrityCheck: "container-identity" });
		withArtifactTargetIdentity = async (target, resources, read, signal) => {
			const verify = async () => {
				const digest = await hashStableRootArtifact(target.path, resources, signal);
				if (digest.sha256 !== target.sha256) throw targetDigestChangedFailure("target", target.sha256, digest.sha256);
			};
			await verify();
			const result = await read();
			await verify();
			return result;
		};
	})))();
}

//#endregion
//#region dist/domain/apkSignature/apkSigningBlock.js
var BLOCK_MAGIC, APK_SIGNING_BLOCK_MAX_PAIRS, apkSigningPairEnd, APK_BLOCK_ID, u64, hasLocalFileHeader, classicDirectory, centralDirectoryOffset, parseZipTail, hasBlockMagic, locateApkSigningBlock;
function init_apkSigningBlock() {
	return (init_apkSigningBlock = __esmMin((() => {
		init_binaryContainer();
		init_zipEndOfCentralDirectory();
		init_parseFailure();
		init_result();
		BLOCK_MAGIC = "APK Sig Block 42";
		APK_SIGNING_BLOCK_MAX_PAIRS = 4096;
		apkSigningPairEnd = (length, offset, end) => {
			if (length < 4n || length > BigInt(end - offset - 8)) return undefined;
			return offset + 8 + Number(length);
		};
		APK_BLOCK_ID = {
			signatureV2: 1896449818,
			signatureV3: 4031998144,
			signatureV31: 462663009,
			sourceStampV1: 722016414,
			sourceStampV2: 1845461005
		};
		u64 = (reader, at) => {
			if (at < 0 || at + 8 > reader.bytes.length) return null;
			const value = reader.word(at, 64);
			return value <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(value) : null;
		};
		hasLocalFileHeader = (bytes) => bytes.length >= 4 && bytes[0] === 80 && bytes[1] === 75 && bytes[2] === 3 && bytes[3] === 4;
		classicDirectory = (eocd) => {
			if (!zipEndUsesSingleVolume(eocd)) return err({
				kind: "multi-disk-unsupported",
				detail: `classic EOCD names disk ${String(eocd.disk)} and central-directory disk ${String(eocd.directoryDisk)}`
			});
			if (eocd.entriesOnDisk !== eocd.totalEntries) return err({
				kind: "malformed-zip",
				offset: eocd.offset + 8,
				detail: "single-disk ZIP entry counts disagree"
			});
			return ok({
				offset: eocd.directoryOffset,
				size: eocd.directorySize,
				entries: eocd.totalEntries,
				end: eocd.offset
			});
		};
		centralDirectoryOffset = (bytes, eocd) => {
			const { offset: eocdOffset, totalEntries: entries, directorySize: size, directoryOffset: offset } = eocd;
			const saturated = offset === ZIP_CLASSIC_DIRECTORY_LIMITS.offset || size === ZIP_CLASSIC_DIRECTORY_LIMITS.size || entries === ZIP_CLASSIC_DIRECTORY_LIMITS.count;
			if (!saturated) return classicDirectory(eocd);
			const reader = new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), true, "zip");
			const locatorOffset = eocdOffset - ZIP64_LOCATOR.bytes;
			const locator = readZip64Locator(reader, locatorOffset);
			if (locator === undefined) {
				if (offset !== ZIP_CLASSIC_DIRECTORY_LIMITS.offset && size !== ZIP_CLASSIC_DIRECTORY_LIMITS.size) return classicDirectory(eocd);
				return err({
					kind: "malformed-zip",
					offset: eocdOffset,
					detail: "missing Zip64 EOCD locator"
				});
			}
			const { disk: recordDisk, totalDisks, recordOffset: offsetOnDisk } = locator;
			if (totalDisks === 0) return err({
				kind: "malformed-zip",
				offset: locatorOffset + ZIP64_LOCATOR.totalDisksOffset,
				detail: "Zip64 locator declares zero disks"
			});
			if (recordDisk >= totalDisks) return err({
				kind: "malformed-zip",
				offset: locatorOffset + ZIP64_LOCATOR.diskOffset,
				detail: "Zip64 EOCD disk is outside the declared disk count"
			});
			if (!zip64LocatorUsesSingleVolume(locator)) return err({
				kind: "zip64-unsupported",
				detail: "multi-disk Zip64 archives are not supported"
			});
			const maximumExact = BigInt(Number.MAX_SAFE_INTEGER);
			if (offsetOnDisk > maximumExact) return err({
				kind: "zip64-unsupported",
				detail: "Zip64 EOCD offset exceeds safe range"
			});
			const recordOffset = Number(offsetOnDisk);
			const record = readZip64DirectoryRecord(reader, recordOffset, locatorOffset);
			if (!record.ok) {
				switch (record.error) {
					case "fixed-fields": return err({
						kind: "malformed-zip",
						offset: locatorOffset + ZIP64_LOCATOR.recordOffset,
						detail: "Zip64 EOCD record extends beyond its locator"
					});
					case "signature": return err({
						kind: "malformed-zip",
						offset: recordOffset,
						detail: "invalid Zip64 EOCD signature"
					});
					case "size": return err({
						kind: "malformed-zip",
						offset: recordOffset + ZIP64_END.sizeOffset,
						detail: "invalid Zip64 EOCD record size"
					});
				}
			}
			if (!zipEndUsesSingleVolume(eocd, "zip64Classic") || !zip64EndUsesSingleVolume(record.value)) return err({
				kind: "zip64-unsupported",
				detail: "Zip64 end records do not describe the selected single disk"
			});
			const { directoryOffset, directorySize, entriesOnDisk, totalEntries } = record.value;
			if (entriesOnDisk !== totalEntries) return err({
				kind: "malformed-zip",
				offset: recordOffset + ZIP64_END.entriesOnDiskOffset,
				detail: "single-disk Zip64 entry counts disagree"
			});
			if (directoryOffset > maximumExact || directorySize > maximumExact || totalEntries > maximumExact) return err({
				kind: "zip64-unsupported",
				detail: "Zip64 sizes exceed safe range"
			});
			return ok({
				offset: Number(directoryOffset),
				size: Number(directorySize),
				entries: Number(totalEntries),
				end: recordOffset
			});
		};
		parseZipTail = (bytes) => {
			if (bytes.length < 22) return err({
				kind: "not-a-zip",
				detail: "shorter than a ZIP EOCD record"
			});
			const candidates = [...zipEndOfCentralDirectoryCandidates(bytes)];
			if (candidates.length > 1) return err({
				kind: "malformed-zip",
				offset: candidates[0].offset,
				detail: `${String(candidates.length)} end-of-central-directory records each end the archive (one inside another's comment); the central directory is ambiguous`
			});
			const eocd = candidates[0];
			if (eocd === undefined) return hasLocalFileHeader(bytes) ? err({
				kind: "malformed-zip",
				offset: bytes.length,
				detail: "ZIP local headers present but no end-of-central-directory (truncated or damaged archive)"
			}) : err({
				kind: "not-a-zip",
				detail: "no end-of-central-directory record"
			});
			const eocdOffset = eocd.offset;
			const cd = centralDirectoryOffset(bytes, eocd);
			if (!cd.ok) return cd;
			if (cd.value.offset > cd.value.end || cd.value.size > cd.value.end - cd.value.offset) return err({
				kind: "malformed-zip",
				offset: eocdOffset,
				detail: "central-directory extent overlaps or extends past the ZIP end records"
			});
			if ((cd.value.entries === 0 || cd.value.size === 0) && hasLocalFileHeader(bytes)) return err({
				kind: "malformed-zip",
				offset: eocdOffset,
				detail: "end-of-central-directory declares no entries, but the archive holds local file entries"
			});
			return ok({
				eocdOffset,
				centralDirectoryOffset: cd.value.offset,
				centralDirectorySize: cd.value.size,
				totalEntries: cd.value.entries,
				classicEntryCount: eocd.totalEntries
			});
		};
		hasBlockMagic = (bytes, cdOffset) => {
			if (cdOffset < 16) return false;
			let magic = "";
			for (let i = 0; i < 16; i += 1) magic += String.fromCharCode(bytes[cdOffset - 16 + i]);
			return magic === BLOCK_MAGIC;
		};
		locateApkSigningBlock = (bytes, tail) => {
			const cdOffset = tail.centralDirectoryOffset;
			if (!hasBlockMagic(bytes, cdOffset)) return ok(null);
			const reader = new BinaryReader(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), true, "zip");
			const trailingSize = u64(reader, cdOffset - 24);
			if (trailingSize === null || trailingSize < 24) return err({
				kind: "malformed-block",
				offset: cdOffset - 24,
				detail: "bad trailing size"
			});
			const blockStart = cdOffset - trailingSize - 8;
			if (blockStart < 0) return err({
				kind: "malformed-block",
				offset: cdOffset,
				detail: "block extends before file start"
			});
			const leadingSize = u64(reader, blockStart);
			if (leadingSize === null || leadingSize !== trailingSize) return err({
				kind: "malformed-block",
				offset: blockStart,
				detail: "leading/trailing size mismatch"
			});
			const pairs = [];
			let cursor = blockStart + 8;
			const pairsEnd = cdOffset - 24;
			while (cursor < pairsEnd) {
				const length = u64(reader, cursor);
				const next = length === null ? undefined : apkSigningPairEnd(BigInt(length), cursor, pairsEnd);
				if (length === null || next === undefined) return err({
					kind: "malformed-block",
					offset: cursor,
					detail: "pair length out of range"
				});
				if (pairs.length >= 4096) return err(decodeLimit("apk-signing-block", `APK Signing Block holds more signing-block-pairs than the ${String(APK_SIGNING_BLOCK_MAX_PAIRS)} limit.`, {
					name: "max_signing_block_pairs",
					maximum: APK_SIGNING_BLOCK_MAX_PAIRS
				}, { offset: cursor }));
				const id = reader.u32(cursor + 8);
				const valueStart = cursor + 12;
				pairs.push({
					id,
					value: bytes.subarray(valueStart, valueStart + (length - 4))
				});
				cursor = next;
			}
			return ok({
				blockStart,
				pairs
			});
		};
	})))();
}

//#endregion
//#region dist/domain/zip/zipMemberRegion.js
var DATA_DESCRIPTOR_SIGNATURE, DATA_DESCRIPTOR_FLAG, ZIP64_EXTRA, ZIP64_SIZE_SENTINEL, APK_SIGNING_BLOCK_MAGIC, APK_SIGNING_BLOCK_FOOTER_BYTES, READ_WINDOW_BYTES, accountZipMemberRegion, localCompressedSize, dataDescriptorBytes, apkSigningBlockStart;
function init_zipMemberRegion() {
	return (init_zipMemberRegion = __esmMin((() => {
		init_binaryContainer();
		init_zipLocalHeader();
		init_apkSigningBlock();
		DATA_DESCRIPTOR_SIGNATURE = 134695760;
		DATA_DESCRIPTOR_FLAG = 8;
		ZIP64_EXTRA = 1;
		ZIP64_SIZE_SENTINEL = 4294967295;
		APK_SIGNING_BLOCK_MAGIC = "APK Sig Block 42";
		APK_SIGNING_BLOCK_FOOTER_BYTES = 24;
		READ_WINDOW_BYTES = 64 * 1024;
		accountZipMemberRegion = async (records, directoryOffset, read) => {
			let window;
			const view = async (offset, length) => {
				if (window === undefined || offset < window.start || offset + length > window.start + window.bytes.length) window = {
					start: offset,
					bytes: await read(offset, Math.max(length, Math.min(READ_WINDOW_BYTES, directoryOffset - offset)))
				};
				const at = offset - window.start;
				return new BinaryReader(Buffer.from(window.bytes.buffer, window.bytes.byteOffset + at, length), true, "zip");
			};
			let unaccountedBytes = 0;
			let unaccountedRanges = 0;
			let firstUnaccountedOffset;
			let unlocatedHeaders = 0;
			let unverifiedExtents = 0;
			let localSizeOffset;
			let localSize;
			let localExtraBytesRemaining = directoryOffset;
			const localExtra = async (offset, length) => {
				if (length > localExtraBytesRemaining) return undefined;
				localExtraBytesRemaining -= length;
				return view(offset, length);
			};
			const descriptorView = async (offset, length) => new BinaryReader(Buffer.from(await read(offset, length)), true, "zip");
			let cursor = 0;
			let descriptor;
			const gap = async (end) => {
				if (end < cursor) return;
				if (descriptor !== undefined) {
					const bytes = await dataDescriptorBytes(descriptor, cursor, end, view);
					if (bytes === 0) unverifiedExtents += 1;
					cursor += bytes;
				}
				descriptor = undefined;
				const size = end - cursor;
				if (size <= 0) return;
				unaccountedBytes += size;
				unaccountedRanges += 1;
				firstUnaccountedOffset ??= cursor;
			};
			for (const record of [...records].sort((a, b) => a.offset - b.offset)) {
				if (record.offset + 30 > directoryOffset) {
					unlocatedHeaders += 1;
					continue;
				}
				const header = await view(record.offset, 30);
				const dataOffset = zipLocalDataOffset(header, record.offset);
				if (dataOffset === undefined) {
					unlocatedHeaders += 1;
					continue;
				}
				const end = dataOffset + record.compressedSize;
				const deferred = (header.u16(6) & DATA_DESCRIPTOR_FLAG) !== 0;
				if (end > directoryOffset || deferred !== record.dataDescriptor) {
					unverifiedExtents += 1;
					continue;
				}
				if (!deferred) {
					if (localSizeOffset !== record.offset) {
						localSize = await localCompressedSize(header, dataOffset, localExtra);
						localSizeOffset = record.offset;
					}
					if (localSize !== BigInt(record.compressedSize)) {
						unverifiedExtents += 1;
						continue;
					}
				}
				await gap(record.offset);
				if (end > cursor) {
					if (descriptor !== undefined) unverifiedExtents += 1;
					cursor = end;
					descriptor = record.dataDescriptor ? record : undefined;
				} else if (deferred && await dataDescriptorBytes(record, end, directoryOffset, descriptorView) === 0) unverifiedExtents += 1;
			}
			await gap(await apkSigningBlockStart(cursor, directoryOffset, view));
			return {
				unaccountedBytes,
				unaccountedRanges,
				firstUnaccountedOffset,
				unlocatedHeaders,
				unverifiedExtents
			};
		};
		localCompressedSize = async (header, dataOffset, view) => {
			const size = header.u32(18);
			if (size !== ZIP64_SIZE_SENTINEL) return BigInt(size);
			const length = header.u16(28);
			if (length === 0) return undefined;
			const extra = await view(dataOffset - length, length);
			if (extra === undefined) return undefined;
			let size64;
			for (let at = 0; at + 4 <= length;) {
				const bytes = extra.u16(at + 2);
				const next = at + 4 + bytes;
				if (extra.u16(at) === ZIP64_EXTRA) {
					const compressedAt = at + 4 + (header.u32(22) === ZIP64_SIZE_SENTINEL ? 8 : 0);
					size64 = next <= length && compressedAt + 8 <= next ? extra.word(compressedAt, 64) : undefined;
				}
				at = next;
			}
			return size64;
		};
		dataDescriptorBytes = async (record, at, end, view) => {
			const signed = end - at >= 16 && (await view(at, 4)).u32(0) === DATA_DESCRIPTOR_SIGNATURE;
			let first = 0;
			for (const wide of record.zip64 ? [true, false] : [false, true]) {
				const body = wide ? 20 : 12;
				for (const prefix of signed ? [4, 0] : [0]) {
					if (end - at < prefix + body) continue;
					const data = await view(at + prefix, body);
					const compressed = wide ? data.word(4, 64) : BigInt(data.u32(4));
					const uncompressed = wide ? data.word(12, 64) : BigInt(data.u32(8));
					if ((record.crc32 === undefined || data.u32(0) === record.crc32) && compressed === BigInt(record.compressedSize) && uncompressed === BigInt(record.uncompressedSize)) {
						if (at + prefix + body === end) return prefix + body;
						if (first === 0) first = prefix + body;
					}
				}
			}
			return first;
		};
		apkSigningBlockStart = async (cursor, directoryOffset, view) => {
			if (directoryOffset - cursor < APK_SIGNING_BLOCK_FOOTER_BYTES + 8) return directoryOffset;
			const footer = await view(directoryOffset - APK_SIGNING_BLOCK_FOOTER_BYTES, APK_SIGNING_BLOCK_FOOTER_BYTES);
			const magic = new TextDecoder("latin1").decode(footer.range(8, 16, "APK signing block magic"));
			if (magic !== APK_SIGNING_BLOCK_MAGIC) return directoryOffset;
			const size = footer.word(0, 64);
			if (size < 24n) return directoryOffset;
			const start = BigInt(directoryOffset) - size - 8n;
			if (start < BigInt(cursor)) return directoryOffset;
			const header = await view(Number(start), 8);
			if (header.word(0, 64) !== size) return directoryOffset;
			let offset = Number(start) + 8;
			const pairsEnd = directoryOffset - APK_SIGNING_BLOCK_FOOTER_BYTES;
			let count = 0;
			while (offset < pairsEnd) {
				if (pairsEnd - offset < 8 || count++ >= 4096) return directoryOffset;
				const length = (await view(offset, 8)).word(0, 64);
				const next = apkSigningPairEnd(length, offset, pairsEnd);
				if (next === undefined) return directoryOffset;
				offset = next;
			}
			return Number(start);
		};
	})))();
}

//#endregion
//#region dist/domain/artifactExpansionBudget.js
var ARTIFACT_EXPANSION_RATIO, MINIMUM_ARTIFACT_EXPANDED_BYTES, artifactExpansionBudgetBytes;
function init_artifactExpansionBudget() {
	return (init_artifactExpansionBudget = __esmMin((() => {
		ARTIFACT_EXPANSION_RATIO = 500;
		MINIMUM_ARTIFACT_EXPANDED_BYTES = 256 * 1024 * 1024;
		artifactExpansionBudgetBytes = (archiveBytes) => Math.max(MINIMUM_ARTIFACT_EXPANDED_BYTES, Math.min(Number.MAX_SAFE_INTEGER, Math.floor(archiveBytes) * ARTIFACT_EXPANSION_RATIO));
	})))();
}

//#endregion
//#region dist/domain/zip/zipEntryText.js
var CP437_HIGH_HALF, decodeZipCp437;
function init_zipEntryText() {
	return (init_zipEntryText = __esmMin((() => {
		CP437_HIGH_HALF = "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\xA0";
		decodeZipCp437 = (bytes) => Array.from(bytes, (byte) => byte < 128 ? String.fromCharCode(byte) : CP437_HIGH_HALF.charAt(byte - 128)).join("");
	})))();
}

//#endregion
//#region dist/domain/compression/zstandardFrameWire.js
/**
* RFC 8878 §3.1 frame extent after its magic. The caller supplies inspected
* fields and skips opaque bytes, which remain the native decoder's concern.
*/
function* zstandardFrameReads(kind, offset) {
	let cursor = offset + 4;
	const header = (length, inspect) => ({
		length,
		inspect,
		eof: "truncated_frame_header",
		failureOffset: offset
	});
	if (kind === "skippable") {
		const userSize = yield header(4, true);
		yield {
			length: u32(userSize, 0),
			inspect: false,
			eof: "truncated_block",
			failureOffset: cursor + 4
		};
		return undefined;
	}
	const descriptor = (yield header(1, true))[0] ?? 0;
	if (descriptor & 8) return {
		code: "reserved_frame_descriptor",
		offset
	};
	const singleSegment = (descriptor & 32) !== 0;
	const dictionaryFlag = descriptor & 3;
	const dictionaryBytes = dictionaryFlag === 3 ? 4 : dictionaryFlag;
	const contentSizeFlag = descriptor >>> 6;
	const contentSizeBytes = contentSizeFlag === 0 ? Number(singleSegment) : 2 ** contentSizeFlag;
	const headerRest = Number(!singleSegment) + dictionaryBytes + contentSizeBytes;
	yield header(headerRest, false);
	cursor += 1 + headerRest;
	for (;;) {
		const block = u24(yield {
			length: 3,
			inspect: true,
			eof: "truncated_block",
			failureOffset: cursor
		}, 0);
		const type = block >>> 1 & 3;
		if (type === 3) return {
			code: "reserved_block",
			offset: cursor
		};
		cursor += 3;
		const length = type === 1 ? 1 : block >>> 3;
		yield {
			length,
			inspect: false,
			eof: "truncated_block",
			failureOffset: cursor
		};
		cursor += length;
		if (block & 1) break;
	}
	if (descriptor & 4) yield {
		length: 4,
		inspect: false,
		eof: "truncated_checksum",
		failureOffset: cursor
	};
	return undefined;
}
var ZSTD_MAGIC, SKIPPABLE_MAGIC_MIN, SKIPPABLE_MAGIC_MAX, ZSTANDARD_MAGIC_BYTES, u24, u32, zstandardFrameKind;
function init_zstandardFrameWire() {
	return (init_zstandardFrameWire = __esmMin((() => {
		ZSTD_MAGIC = 4247762216;
		SKIPPABLE_MAGIC_MIN = 407710288;
		SKIPPABLE_MAGIC_MAX = 407710303;
		ZSTANDARD_MAGIC_BYTES = 4;
		u24 = (bytes, offset) => (bytes[offset] ?? 0) | (bytes[offset + 1] ?? 0) << 8 | (bytes[offset + 2] ?? 0) << 16;
		u32 = (bytes, offset) => (u24(bytes, offset) | (bytes[offset + 3] ?? 0) << 24) >>> 0;
		zstandardFrameKind = (bytes, offset) => {
			if (bytes.length - offset < 4) return undefined;
			const magic = u32(bytes, offset);
			if (magic === ZSTD_MAGIC) return "zstd";
			if (magic >= SKIPPABLE_MAGIC_MIN && magic <= SKIPPABLE_MAGIC_MAX) return "skippable";
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/compression/zstandardFrameChunks.js
/**
* Yield compressed slices whose boundaries never cross two frames. Node 22
* stops a decode call at its first frame end, but its stream can accept later
* frames in separate writes. Chunk boundaries may also split a frame.
*/
async function* zstandardFrameChunks(input) {
	const header = new Uint8Array(4);
	const unread = new Uint8Array(0);
	let offset = 0;
	let frameOffset = 0;
	let read = magicRead(frameOffset);
	let supplied = 0;
	let reads;
	for await (const bytes of input) {
		let start = 0;
		let cursor = 0;
		while (cursor < bytes.length) {
			const count = Math.min(read.length - supplied, bytes.length - cursor);
			const end = cursor + count;
			const complete = supplied + count === read.length;
			let field = unread;
			if (read.inspect) {
				if (supplied === 0 && complete) {
					field = bytes.subarray(cursor, end);
				} else {
					header.set(bytes.subarray(cursor, end), supplied);
					field = header;
				}
			}
			cursor = end;
			offset += count;
			if (!complete) {
				supplied += count;
				break;
			}
			supplied = 0;
			if (reads === undefined) {
				const kind = zstandardFrameKind(field, 0);
				if (kind === undefined) throw new ZstandardFramingError("magic", frameOffset);
				reads = zstandardFrameReads(kind, frameOffset);
			}
			let step = reads.next(field);
			while (!step.done && step.value.length === 0) step = reads.next(unread);
			if (!step.done) {
				read = step.value;
				continue;
			}
			if (step.value !== undefined) throw new ZstandardFramingError(step.value.code, step.value.offset);
			yield bytes.subarray(start, cursor);
			start = cursor;
			frameOffset = offset;
			reads = undefined;
			read = magicRead(frameOffset);
		}
		if (start < bytes.length) yield bytes.subarray(start);
	}
	if (reads !== undefined || supplied !== 0 || frameOffset === 0) throw new ZstandardFramingError(read.eof, read.failureOffset);
}
var ZstandardFramingError, magicRead;
function init_zstandardFrameChunks() {
	return (init_zstandardFrameChunks = __esmMin((() => {
		init_zstandardFrameWire();
		ZstandardFramingError = class extends Error {
			code;
			offset;
			constructor(code, offset) {
				super(`Zstandard framing failed at byte ${offset}: ${code}`);
				this.code = code;
				this.offset = offset;
			}
		};
		magicRead = (offset) => ({
			length: 4,
			inspect: true,
			eof: "truncated_frame_header",
			failureOffset: offset
		});
	})))();
}

//#endregion
//#region dist/resources/ZipArtifactReader.js
async function* typedZipFailures(source) {
	try {
		yield* source;
	} catch (cause) {
		throw typedZipFailure(cause);
	}
}
var ZIP_UTF8_DECODER, ZIP_ZSTANDARD_WINDOW_LOG_MAX, ZIP_ZSTANDARD_WINDOW_ALLOWANCE, ZIP_ZSTANDARD_WINDOW_LIMIT, ZIP_ZSTANDARD_WINDOW_CEILING, ZipZstandardDecompressionStream, ZIP_READER_OPTIONS, NodeFileReader, ZipArtifactReader, zipListingCoverage, projectZipEntry, zipEntryNameLimitations, decodeZipEntryText, zipEntryPath, decodeStrictZipUtf8, extractStream, ZIP_FAILURE_REASONS, typedZipFailure, toError;
function init_ZipArtifactReader() {
	return (init_ZipArtifactReader = __esmMin((() => {
		init_analysisErrorCore();
		init_ArtifactFileOperation();
		init_ArtifactReader();
		init_ArtifactFileSource();
		init_ArtifactReaderLimits();
		init_zipMemberRegion();
		init_artifactExpansionBudget();
		init_readFileHandleRange();
		init_strictUtf8();
		init_zipEntryText();
		init_internalInvariant();
		init_zstandardFrameChunks();
		ZIP_UTF8_DECODER = strictUtf8Decoder("preserve");
		ZIP_ZSTANDARD_WINDOW_LOG_MAX = 27;
		ZIP_ZSTANDARD_WINDOW_ALLOWANCE = `${String(2 ** (ZIP_ZSTANDARD_WINDOW_LOG_MAX - 20))} MiB`;
		ZIP_ZSTANDARD_WINDOW_LIMIT = `ZIP Zstandard member requires a decoder window above REA's fixed ${ZIP_ZSTANDARD_WINDOW_ALLOWANCE} allowance; the archive is not necessarily corrupt.`;
		ZIP_ZSTANDARD_WINDOW_CEILING = {
			name: "The ZIP Zstandard decoder window allowance",
			kind: "parser",
			limit: 2 ** ZIP_ZSTANDARD_WINDOW_LOG_MAX,
			unit: "bytes",
			narrowing: `Recompress the member with a window of at most ${ZIP_ZSTANDARD_WINDOW_ALLOWANCE}, or decompress it with a tool that admits larger windows, then retry.`
		};
		ZipZstandardDecompressionStream = class {
			readable;
			writable;
			constructor(_format, options) {
				const stream = Duplex.toWeb(compose(new PassThrough(), zstandardFrameChunks, createZstdDecompress({
					chunkSize: options?.chunkSize,
					params: { [constants$3.ZSTD_d_windowLogMax]: ZIP_ZSTANDARD_WINDOW_LOG_MAX }
				})));
				this.readable = stream.readable;
				this.writable = stream.writable;
			}
		};
		registerCodec({
			compressionMethod: 93,
			format: "rea-zip-zstd",
			DecompressionStream: ZipZstandardDecompressionStream
		});
		ZIP_READER_OPTIONS = {
			checkSignature: true,
			checkOverlappingEntry: true,
			filenameEncoding: "cp437",
			filenameValidation: "tolerant"
		};
		NodeFileReader = class extends Reader {
			path;
			maximumReadBytes;
			#handle;
			#source;
			#initPromise;
			constructor(path, maximumReadBytes, admitted) {
				super(path);
				this.path = path;
				this.maximumReadBytes = maximumReadBytes;
				this.#source = new ArtifactFileSource(path, "ZIP", admitted);
			}
			init() {
				this.#initPromise ??= this.#initialize();
				return this.#initPromise;
			}
			async #initialize() {
				const source = await this.#source.read();
				this.#handle = source.handle;
				this.size = source.initial.size;
			}
			async verify() {
				await this.#source.read();
			}
			async readUint8Array(index, length) {
				await this.verify();
				const handle = this.#handle;
				if (handle === undefined) throw invariantViolation("ZIP reader is not initialized");
				const readBytes = Math.min(length, this.size - index);
				if (readBytes < 0) throw new ArtifactReaderFailure("format", `ZIP archive is malformed: read at ${index} extends beyond the ${this.size}-byte archive`);
				if (this.maximumReadBytes !== undefined && readBytes > this.maximumReadBytes) throw new ArtifactReaderFailure("limit", `ZIP metadata read requires ${readBytes} bytes, exceeding the ${this.maximumReadBytes}-byte read budget`);
				const bytes = await readFileHandleRange(handle, index, readBytes);
				if (bytes.length !== readBytes) throw new ArtifactReaderFailure("integrity", `ZIP source ended before its admitted extent: ${this.path}`, { integrityCheck: "read-coverage" });
				await this.verify();
				return bytes;
			}
			async closeHandle() {
				await this.#initPromise?.catch(() => undefined);
				await this.#source.close();
				this.#handle = undefined;
			}
		};
		ZipArtifactReader = class {
			expandedBytes;
			format;
			#source;
			#reader;
			#streams = new Map();
			#enumerations = new Set();
			/** Running traversal steps, including the final accounting pass, that close joins. */
			#traversalSteps = new Set();
			#closing = false;
			#closePromise;
			#entries = new Map();
			/** Optionally bound each metadata read before allocating its backing buffer. */
			constructor(path, format, maximumMetadataReadBytes, admitted, expandedBytes) {
				this.expandedBytes = expandedBytes;
				this.format = format;
				this.#source = new NodeFileReader(path, maximumMetadataReadBytes, admitted);
				this.#reader = new ZipReader(this.#source, ZIP_READER_OPTIONS);
			}
			entries(signal, options) {
				const traversal = this.#enumerate(signal, options);
				const steps = this.#traversalSteps;
				const step = (running) => {
					steps.add(running);
					const settled = () => {
						steps.delete(running);
					};
					running.then(settled, settled);
					return running;
				};
				const iterator = {
					next: () => step(traversal.next()),
					return: (value) => step(traversal.return(value)),
					throw: (cause) => step(traversal.throw(cause))
				};
				return { [Symbol.asyncIterator]: () => iterator };
			}
			async *#enumerate(signal, options) {
				this.#assertOpen(signal);
				let index = 0;
				let declaredFileBytes = 0n;
				const records = [];
				const enumeration = typedZipFailures(this.#reader.getEntriesGenerator({ decodeText: decodeZipEntryText }));
				this.#enumerations.add(enumeration);
				try {
					for await (const entry of enumeration) {
						await this.#source.verify();
						this.#assertOpen(signal);
						records.push({
							offset: entry.offset,
							compressedSize: entry.compressedSize,
							uncompressedSize: entry.uncompressedSize,
							crc32: entry.crc32,
							zip64: entry.zip64,
							dataDescriptor: entry.bitFlag?.dataDescriptor ?? false
						});
						const metadata = projectZipEntry(entry, index++);
						if (metadata === undefined) continue;
						if (metadata.kind === "file" && !metadata.encrypted && metadata.declaredSize !== null && Number.isSafeInteger(metadata.declaredSize) && metadata.declaredSize >= 0) {
							declaredFileBytes += BigInt(metadata.declaredSize);
							const budget = this.expandedBytes ?? artifactExpansionBudgetBytes(this.#source.size);
							if (declaredFileBytes > BigInt(budget)) throw artifactReaderLimitFailure("artifact_limits.expanded_bytes", budget, "bytes", declaredFileBytes);
						}
						const stored = this.#entries.get(metadata.adapterKey);
						if (stored !== undefined && !sameArtifactEntry(metadata, stored.metadata)) throw new ArtifactReaderFailure("integrity", `ZIP member identity changed during enumeration: ${entry.filename}`, { integrityCheck: "entry-metadata" });
						if (stored === undefined) this.#entries.set(metadata.adapterKey, {
							source: entry,
							metadata: copyArtifactEntry(metadata)
						});
						yield metadata;
					}
					this.#assertOpen(signal);
					const directoryOffset = this.#reader.directoryOffset;
					const account = directoryOffset === undefined ? undefined : await accountZipMemberRegion(records, directoryOffset, (at, length) => this.#source.readUint8Array(at, length));
					this.#assertOpen(signal);
					await this.#source.verify();
					this.#assertOpen(signal);
					options?.onCoverage?.(zipListingCoverage(account));
				} finally {
					this.#enumerations.delete(enumeration);
					await enumeration.return();
				}
			}
			open(entry, signal) {
				this.#assertOpen(signal);
				const stored = this.#entries.get(entry.adapterKey);
				if (stored === undefined || !sameArtifactEntry(entry, stored.metadata)) return Promise.reject(new ArtifactReaderFailure("integrity", "ZIP entry metadata does not match this reader's inventory", { integrityCheck: stored === undefined ? "foreign-entry" : "entry-metadata" }));
				const source = stored.source;
				if (source.directory || source.symlink) return Promise.reject(new ArtifactReaderFailure("format", "ZIP entry is not a regular file"));
				if (source.encrypted) return Promise.reject(new ArtifactReaderFailure("unavailable", "Encrypted ZIP entry is unsupported"));
				const { output, completion } = extractStream(source, () => this.#source.verify(), signal);
				this.#streams.set(output, completion);
				output.once("close", () => {
					void completion.then(() => this.#streams.delete(output));
				});
				return Promise.resolve(output);
			}
			close() {
				this.#closing = true;
				this.#closePromise ??= this.#close().finally(() => {
					this.#closePromise = undefined;
				});
				return this.#closePromise;
			}
			async #close() {
				for (const output of this.#streams.keys()) output.destroy(new ArtifactReaderFailure("unavailable", "ZIP reader closed"));
				const [outcomes] = await Promise.all([Promise.allSettled([...this.#streams.values(), ...Array.from(this.#enumerations, (enumeration) => enumeration.return())]), Promise.allSettled(this.#traversalSteps)]);
				this.#enumerations.clear();
				await this.#reader.close().catch(() => undefined);
				const failures = outcomes.flatMap((outcome) => outcome.status === "rejected" ? [outcome.reason] : []);
				try {
					await this.#source.closeHandle();
					this.#entries.clear();
				} catch (cause) {
					failures.push(cause);
				}
				if (failures.length === 1) throw failures[0];
				if (failures.length > 1) throw new AggregateError(failures, "ZIP reader cleanup failed");
			}
			#assertOpen(signal) {
				assertArtifactReadActive(signal);
				if (this.#closing) throw new ArtifactReaderFailure("unavailable", "ZIP reader is closed");
			}
			provenance() {
				return [];
			}
		};
		zipListingCoverage = (account) => {
			if (account === undefined) return {
				status: "unknown",
				limitations: ["ZIP central directory offset was not established; bytes outside the listed members were not accounted for."]
			};
			const limitations = [
				...account.unaccountedRanges === 0 ? [] : [`ZIP central directory does not account for ${String(account.unaccountedBytes)} byte(s) in ${String(account.unaccountedRanges)} range(s) before it, first at offset ${String(account.firstUnaccountedOffset)}; local entries it does not list may exist there.`],
				...account.unlocatedHeaders === 0 ? [] : [`${String(account.unlocatedHeaders)} ZIP central directory record(s) point at no local file header; the bytes they claim were not accounted for.`],
				...account.unverifiedExtents === 0 ? [] : [`${String(account.unverifiedExtents)} ZIP central directory record(s) have payload extents that conflict with or cannot be established from their local headers or required data descriptors; those claims were not used to establish complete coverage.`]
			];
			return {
				status: limitations.length === 0 ? "complete" : "unknown",
				limitations
			};
		};
		projectZipEntry = (entry, index) => {
			const kind = entry.symlink ? "symlink" : entry.directory ? "directory" : "file";
			const sourcePath = zipEntryPath(entry);
			const path = sourcePath.replace(/^(?:\.\/)+/u, "");
			if (kind === "directory" && (path === "" || path === ".")) return undefined;
			return {
				path,
				...path === sourcePath ? {} : { sourcePath },
				kind,
				declaredSize: kind === "directory" ? null : entry.uncompressedSize,
				compressedSize: kind === "directory" ? null : entry.compressedSize,
				executable: entry.executable,
				encrypted: entry.encrypted,
				byteOffset: null,
				declaredIntegrity: null,
				unpacked: false,
				limitations: [
					...kind === "symlink" ? ["Archive symlink target was not read."] : [],
					...path === sourcePath ? [] : [`ZIP member name ${JSON.stringify(sourcePath)} has a leading current-directory prefix omitted from its logical path.`],
					...zipEntryNameLimitations(entry)
				],
				adapterKey: `zip-entry:${index}`
			};
		};
		zipEntryNameLimitations = (entry) => {
			if (entry.filenameUTF8 || entry.extraFieldUnicodePath?.valid === true) return [];
			const bytes = entry.rawFilename;
			if (!bytes.some((byte) => byte >= 128)) return [];
			const hex = Buffer.from(bytes).toString("hex");
			return [`ZIP name uses CP437 fallback; source encoding unverified; raw hex: ${hex}.`];
		};
		decodeZipEntryText = (bytes, encoding, type) => {
			if (type !== "filename") return undefined;
			if (encoding === "utf-8") return decodeStrictZipUtf8(bytes, "ZIP filename is not valid UTF-8");
			return encoding === "cp437" ? decodeZipCp437(bytes) : undefined;
		};
		zipEntryPath = (entry) => {
			const field = entry.extraFieldUnicodePath;
			if (field?.valid !== true) return entry.filename;
			return decodeStrictZipUtf8(field.data.subarray(5), "ZIP Unicode Path extra field is not valid UTF-8");
		};
		decodeStrictZipUtf8 = (bytes, message) => {
			try {
				return ZIP_UTF8_DECODER.decode(bytes);
			} catch (cause) {
				throw new ArtifactReaderFailure("format", message, { cause });
			}
		};
		extractStream = (entry, verifySource, signal) => {
			const output = new PassThrough();
			output.on("error", () => undefined);
			const controller = new AbortController();
			const onAbort = () => {
				controller.abort(signal?.reason);
				output.destroy(new ArtifactReaderFailure("cancelled", "ZIP operation cancelled", { cause: signal?.reason }));
			};
			signal?.addEventListener("abort", onAbort, { once: true });
			output.once("close", () => {
				signal?.removeEventListener("abort", onAbort);
				controller.abort(OwnerCancellation.noLongerNeeded);
			});
			const writable = new WritableStream({
				write: async (chunk) => {
					assertArtifactReadActive(signal);
					if (!output.write(Buffer.from(chunk))) await once(output, "drain", { signal: controller.signal });
				},
				abort: (reason) => {
					output.destroy(toError(typedZipFailure(reason, entry.compressionMethod)));
				}
			});
			const completion = verifySource().then(() => entry.getData(writable, {
				signal: controller.signal,
				checkSignature: true,
				checkOverlappingEntry: true,
				onprogress: () => assertArtifactReadActive(signal)
			})).then(async () => {
				await verifySource();
				assertArtifactReadActive(signal);
				output.end();
			}).catch((cause) => {
				output.destroy(toError(typedZipFailure(cause, entry.compressionMethod)));
			});
			return {
				output,
				completion
			};
		};
		ZIP_FAILURE_REASONS = new Map([...[
			ERR_AMBIGUOUS_ARCHIVE,
			ERR_BAD_FORMAT,
			ERR_CENTRAL_DIRECTORY_NOT_FOUND,
			ERR_ENTRY_DATA_OUT_OF_BOUNDS,
			ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND,
			ERR_EOCDR_NOT_FOUND,
			ERR_EXTRAFIELD_ZIP64_NOT_FOUND,
			ERR_INVALID_COMPRESSED_DATA,
			ERR_INVALID_CRC32,
			ERR_INVALID_UNCOMPRESSED_SIZE,
			ERR_LOCAL_FILE_HEADER_NOT_FOUND,
			ERR_OVERLAPPING_ENTRY,
			ERR_UNSUPPORTED_UINT64
		].map((message) => [message, "format"]), ...[
			ERR_ENCRYPTED_CENTRAL_DIRECTORY,
			ERR_SPLIT_ZIP_FILE,
			ERR_UNSUPPORTED_COMPRESSION,
			ERR_UNSUPPORTED_ENCRYPTION
		].map((message) => [message, "unavailable"])]);
		typedZipFailure = (cause, compressionMethod) => {
			if (!(cause instanceof Error) || cause instanceof ArtifactReaderFailure) return cause;
			const code = "code" in cause ? cause.code : undefined;
			if (compressionMethod === 93 && code === "ZSTD_error_dictionary_wrong") return new ArtifactReaderFailure("unavailable", "ZIP archive uses an unsupported Zstandard dictionary", { cause });
			if (compressionMethod === 93 && code === "ZSTD_error_frameParameter_windowTooLarge") return new ArtifactReaderFailure("limit", ZIP_ZSTANDARD_WINDOW_LIMIT, {
				cause,
				boundary: "memory",
				fixedAllowance: ZIP_ZSTANDARD_WINDOW_CEILING
			});
			const invalidZstandard = compressionMethod === 93 && (cause instanceof ZstandardFramingError || code === "ZSTD_error_prefix_unknown" || code === "ZSTD_error_checksum_wrong" || code === "ZSTD_error_corruption_detected" || code === "ZSTD_error_dictionary_corrupted" || code === "ZSTD_error_frameParameter_unsupported" || code === "Z_BUF_ERROR");
			const reason = ZIP_FAILURE_REASONS.get(cause.message) ?? (invalidZstandard ? "format" : undefined);
			if (reason === undefined) return cause;
			return new ArtifactReaderFailure(reason, reason === "format" ? `ZIP archive is malformed: ${invalidZstandard ? ERR_INVALID_COMPRESSED_DATA : cause.message}` : `ZIP archive uses an unsupported feature: ${cause.message}`, { cause });
		};
		toError = (cause) => cause instanceof Error ? cause : new Error("ZIP extraction failed");
	})))();
}

//#endregion
//#region dist/resources/index.js
function init_resources() {
	return (init_resources = __esmMin((() => {
		init_AsarHeader();
		init_AnalysisCleanupLease();
		init_ArtifactFileAdmission();
		init_ArtifactFileSource();
		init_ArtifactOperationFailure();
		init_ArtifactFileOperation();
		init_ArtifactReader();
		init_ArtifactReaderLimits();
		init_ArtifactSelectedSource();
		init_DirectoryArtifactReader();
		init_hostExecutableMarking();
		init_ArtifactResourceScope();
		init_StableArtifactFailure();
		init_RegularFileErrorProjection();
		init_StableArtifactObservation();
		init_TextFileWrite();
		init_readStableArtifact();
		init_ArtifactPaths();
		init_SafeOutputTree();
		init_SafeOutputTreeAdmission();
		init_SafeOutputTreeCreationFailure();
		init_StreamBytes();
		init_readArtifactFileChunks();
		init_StreamDigest();
		init_StableRootArtifact();
		init_withArtifactTargetIdentity();
		init_ZipArtifactReader();
	})))();
}

//#endregion
export { occurrenceIdForLocation as $, OwnedRegularFileOperationFailure as $n, resolveArtifactReaderLimits as $t, init_SafeOutputTree as A, artifactOperationCause as An, init_exactJsonNumber as Ar, DirectoryArtifactRootFailure as At, hasDestinationPath as B, yieldArtifactRead as Bn, analysisErrorWithCleanupDependencies as Br, readArtifactFileChunks as Bt, withArtifactTargetIdentity as C, readAsarHeader as Cn, asarNodeSchema as Cr, init_readStableArtifact as Ct, openRootArtifact as D, artifactFileCancellationCause as Dn, formattedEllipsisExcerpt as Dr, init_fileSnapshotObservation as Dt, init_StableRootArtifact as E, ArtifactFileCleanupFailure as En, excerptText as Er, fileSnapshotPartialObservationSchema as Et, outputDirectoryAdmissionRefusal as F, bindArtifactFileCleanup as Fn, findDuplicateJsonMember as Fr, decodeDirectoryEntryName as Ft, artifactGraphDigest as G, ArtifactReaderFailure as Gn, providerCleanupErrorFromCloseRejections as Gr, init_ArtifactReaderLimits as Gt, normalizeArtifactPath as H, AnalysisCleanupLeaseGroup as Hn, analysisErrorWithCloseRejection as Hr, init_ArtifactSelectedSource as Ht, ArtifactPathRegistry as I, init_ArtifactFileOperation as In, init_jsonDuplicateMember as Ir, init_decodeDirectoryEntryName as It, artifactManifestId as J, assertProducedEntry as Jn, DEFAULT_GODOT_READER_LIMITS as Jt, artifactIdForContent as K, artifactFixedLimitFailure as Kn, providerCleanupErrorFromFailures as Kr, DEFAULT_BUN_READER_LIMITS as Kt, DestinationCaseCollisionFailure as L, mapArtifactFileFailure as Ln, parseJsonStringLiteral as Lr, OwnedDirectoryHandle as Lt, init_SafeOutputTreeCreationFailure as M, artifactReadCancelledBy as Mn, parseExactJson as Mr, init_DirectoryArtifactReader as Mt, SafeOutputTreeDestinationRefusal as N, artifactSelectedPathErrno as Nn, init_readFileHandleRange as Nr, hostExecutableMarking as Nt, releaseRootArtifact as O, artifactFileCompletion as On, init_excerpt as Or, DirectoryArtifactEntryAccessDenied as Ot, init_SafeOutputTreeAdmission as P, assertArtifactReadActive as Pn, readFileHandleRange as Pr, init_hostExecutableMarking as Pt, normalizeJoinedLogicalPath as Q, sameArtifactSourceIdentity as Qn, init_artifactReaderLimits as Qt, DestinationPathUnrepresentableFailure as R, withArtifactFileHandle as Rn, parseJsonWithDuplicatePolicy as Rr, init_OwnedDirectoryHandle as Rt, targetDigestChangedFailure as S, init_AsarHeader as Sn, asarDeclaredSizeSchema as Sr, completedStableArtifactStream as St, hashStableRootArtifactHandle as T, ArtifactFileCancelled as Tn, ellipsisExcerpt as Tr, streamStableArtifact as Tt, artifactContradictionId as U, init_AnalysisCleanupLease as Un, analysisErrorWithCloseRejections as Ur, resolveArtifactSourcePath as Ut, init_ArtifactPaths as V, AnalysisCleanupLease as Vn, analysisErrorWithCleanupFailure as Vr, assertArtifactSelectedSource as Vt, artifactEdgeId as W, ArtifactEntryContentUnavailable as Wn, init_analysisErrorCleanup as Wr, artifactReaderLimitFailure as Wt, logicalPathEscapesRoot as X, init_ArtifactReader as Xn, artifactReaderLimitsInputSchema as Xt, init_artifactIdentity as Y, copyArtifactEntry as Yn, DEFAULT_NODE_SEA_READER_LIMITS as Yt, logicalPathNfc as Z, sameArtifactEntry as Zn, artifactReaderLimitsSchema as Zt, APK_BLOCK_ID as _, init_ArtifactFileAdmission as _n, OwnedFileHandle as _r, stableArtifactInputRecovery as _t, init_ZipArtifactReader as a, abortIfNeeded$2 as an, withOwnedRegularFile as ar, init_OwnedStagedOutput as at, parseZipTail as b, asarHeaderAdmissionRecovery as bn, settleChangeTimeBaseline as br, assertStableArtifactState as bt, zipEntryPath as c, init_StreamBytes as cn, RegularFileChangedError as cr, imageFileSizeRemediation as ct, zstandardFrameKind as d, ArtifactResourceScope as dn, assertStableRegularFileIdentity as dr, projectOwnedArtifactIdentityFailure as dt, init_ArtifactOperationFailure as en, RegularFileCancelled as er, fileAccessFailureReason as et, zstandardFrameReads as f, init_ArtifactResourceScope as fn, init_RegularFile as fr, projectOwnedArtifactInputFailure as ft, init_zipMemberRegion as g, artifactFileAdmissionFailure as gn, sameRegularFileState as gr, stableArtifactInputFailure as gt, accountZipMemberRegion as h, readFileHandleChunks as hn, regularFileState as hr, readerIntegrityFailure as ht, decodeZipEntryText as i, init_ArtifactFileSource as in, withOwnedFileHandle as ir, OwnedStagedOutput as it, SafeOutputTreeCreationFailure as j, artifactParseFailure as jn, isExactJsonNumber as jr, DirectoryArtifactTraversalLimit as jt, SafeOutputTree as k, artifactFilePrimaryFacts as kn, quotedExcerpt as kr, DirectoryArtifactReader as kt, zipListingCoverage as l, streamChunkToBuffer as ln, RegularFileOperationCancelled as lr, init_StableArtifactFailure as lt, init_artifactExpansionBudget as m, init_readFileHandleChunks as mn, openRegularFile as mr, projectStableArtifactFailure as mt, ZIP_READER_OPTIONS as n, ArtifactFileSource as nn, init_OwnedRegularFile as nr, writeTextFile as nt, typedZipFailure as o, digestReadableToCompletion as on, NonRegularFileReadError as or, init_RegularFileErrorProjection as ot, artifactExpansionBudgetBytes as p, FileReadCancelled as pn, isSelectedRegularFileError as pr, projectSelectedArtifactFileFailure as pt, artifactIdForNode as q, artifactPrimaryCleanupLeases as qn, withInheritedCleanupOwnership as qr, DEFAULT_DOTNET_BUNDLE_READER_LIMITS as qt, ZipArtifactReader as r, assertArtifactFileSelectedSource as rn, regularFileCancellation as rr, writeTextParts as rt, zipEntryNameLimitations as s, init_StreamDigest as sn, RegularFileAdmissionFailure as sr, selectedFileTargetError as st, init_resources as t, translateArtifactFailure as tn, RegularFileCleanupFailure as tr, init_TextFileWrite as tt, init_zstandardFrameWire as u, ArtifactResourceRetryFailure as un, assertRegularFileActive as ur, projectArtifactCloseFailure as ut, init_apkSigningBlock as v, admitAsarHeader as vn, init_OwnedFileHandle as vr, completedStableArtifactObservation as vt, hashStableRootArtifact as w, resolveAsarHeaderAdmission as wn, init_asarNode as wr, readStableArtifact as wt, init_withArtifactTargetIdentity as x, createAsarHeaderSignatureProbe as xn, RoundedAsarSize as xr, completedStableArtifact as xt, locateApkSigningBlock as y, asarHeaderAdmissionFailure as yn, init_ChangeTimeBaseline as yr, init_StableArtifactObservation as yt, annotateEnglishUnicodeCaseCollisions as z, withArtifactRegularFile as zn, parseLastWinsJson as zr, init_readArtifactFileChunks as zt };