import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, ConfigurationError, DEFAULT_BRIDGE_MAX_REQUEST_BYTES, cancelledBy, carriedReason, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_configurationErrors, init_errorMessage, init_jsonValue, init_sha256Hex, jsonValueSchema, reattributedResourceConstraint, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, currentAnalysisOperationSnapshot, init_HostPlatform, init_analysisOperationSnapshot } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { appendCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { ArtifactFileCleanupFailure, ArtifactReaderFailure, ArtifactResourceScope, artifactFileCancellationCause, artifactFileCompletion, assertArtifactReadActive, bindArtifactFileCleanup, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_resources, withArtifactRegularFile } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError, providerCleanupErrorFromFailures } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_WindowsNativeLoader, requireWindowsNativeAuthority } from "./WindowsNativeLoader-CCqowxwW.js";
import { init_BoundedFileBytes, readBoundedFileBytes } from "./RegularFileRead-CRu2Ia6l.js";
import { BRIDGE_MAX_REQUEST_BYTES_SETTING, bridgeRequestLimitMismatchError, bridgeRequestOversizeError, bridgeResponseOversizeError, init_bridgeMaxRequestBytes, parseBridgeMaxRequestBytes } from "./bridgeMaxRequestBytes-Y_e4yDJ8.js";
import { homeDirectoryFromEnvironment, init_homeDirectory } from "./homeDirectory-DC_DeJIg.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_jsonValueByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { analyzeWithService, contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { AnalysisCleanupRelease, init_analysisCleanupRelease } from "./analysisCleanupRelease-ME3hxZPc.js";
import { CUTTER_TOOL_CONTRACTS, cutterCommandInputSchema, cutterDiscoveryLimitations, cutterSessionSchema, init_cutterDiscovery, init_cutterToolContracts } from "./cutterToolContracts-5J5KAqZM.js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { isUtf8 } from "node:buffer";
import { createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { lstat, opendir } from "node:fs/promises";
import { isInteger } from "lossless-json";
import { visit } from "jsonc-parser";
import { createConnection } from "node:net";

//#region dist/cutter/cutterBridgeMac.js
var cutterBridgeMac;
function init_cutterBridgeMac() {
	return (init_cutterBridgeMac = __esmMin((() => {
		cutterBridgeMac = (token, parts) => {
			const mac = createHmac("sha256", token);
			for (const part of parts) mac.update(part);
			return mac.digest();
		};
	})))();
}

//#endregion
//#region dist/cutter/CutterBridgeSource.js
var PACKAGED_PLUGIN, cutterBridgeSourceRecovery, packagedDigest, packagedCutterPluginDigest, cutterBridgeSource;
function init_CutterBridgeSource() {
	return (init_CutterBridgeSource = __esmMin((() => {
		init_analysisErrorCore();
		init_sha256Hex();
		PACKAGED_PLUGIN = fileURLToPath(new URL("../../bridge/cutter/rea_bridge.py", new URL("../cutter/CutterBridgeSource.js", import.meta.url).href));
		cutterBridgeSourceRecovery = (source) => {
			if (source === "packaged") return undefined;
			const recopy = `Copy ${PACKAGED_PLUGIN} into Cutter's plugins/python directory, restart Cutter, and list sessions again.`;
			return source === "unknown" ? `The running plugin publishes no SHA-256, so its source is unknown. ${recopy}` : recopy;
		};
		;
		packagedCutterPluginDigest = (operation) => {
			if (packagedDigest !== undefined) return packagedDigest;
			let bytes;
			try {
				bytes = readFileSync(PACKAGED_PLUGIN);
			} catch (cause) {
				const remediation = `Reinstall REA so ${PACKAGED_PLUGIN} is present and readable, then retry. REA could not compare the running Cutter plugin with it, and no command was sent.`;
				throw new AnalysisCapabilityUnavailableError("cutter", operation, "REA's packaged Cutter plugin could not be read, so the running plugin's source cannot be identified.", {
					cause,
					remediationAction: remediation,
					userMessage: remediation
				});
			}
			packagedDigest = sha256Hex(bytes);
			return packagedDigest;
		};
		cutterBridgeSource = (advertisedSha256, operation) => {
			if (advertisedSha256 === undefined || advertisedSha256 === null) return "unknown";
			return advertisedSha256 === packagedCutterPluginDigest(operation) ? "packaged" : "modified";
		};
	})))();
}

//#endregion
//#region dist/cutter/cutterAuthenticatedResponse.js
var PREFIX, PROOF_MARK, CLOSE, PROOF_HEX_LENGTH, CHALLENGE_FRAME_BYTES, INITIAL_RESPONSE_BYTES, HEX, SIMPLE_ESCAPE, invalid, CutterAuthenticatedResponseDecoder, CutterBridgeResponseFrames;
function init_cutterAuthenticatedResponse() {
	return (init_cutterAuthenticatedResponse = __esmMin((() => {
		init_bridgeMaxRequestBytes();
		PREFIX = Buffer.from("{\"response\":\"");
		PROOF_MARK = Buffer.from(",\"proof\":\"");
		CLOSE = Buffer.from("\"}");
		PROOF_HEX_LENGTH = 64;
		CHALLENGE_FRAME_BYTES = 2048;
		INITIAL_RESPONSE_BYTES = 256;
		HEX = new Int8Array(256).fill(-1);
		for (let digit = 0; digit < 10; digit += 1) HEX[48 + digit] = digit;
		for (let digit = 0; digit < 6; digit += 1) {
			HEX[65 + digit] = 10 + digit;
			HEX[97 + digit] = 10 + digit;
		}
		SIMPLE_ESCAPE = new Int16Array(256).fill(-1);
		SIMPLE_ESCAPE[34] = 34;
		SIMPLE_ESCAPE[92] = 92;
		SIMPLE_ESCAPE[47] = 47;
		SIMPLE_ESCAPE[98] = 8;
		SIMPLE_ESCAPE[102] = 12;
		SIMPLE_ESCAPE[110] = 10;
		SIMPLE_ESCAPE[114] = 13;
		SIMPLE_ESCAPE[116] = 9;
		invalid = () => new Error("invalid authenticated response");
		CutterAuthenticatedResponseDecoder = class {
			#limit;
			#wire = 0;
			#stage = "prefix";
			#literal = 0;
			#escape = "none";
			#hex = 0;
			#hexCount = 0;
			#high = 0;
			#proof = "";
			#out = Buffer.allocUnsafe(INITIAL_RESPONSE_BYTES);
			#outLength = 0;
			constructor(limit) {
				this.#limit = limit;
			}
			push(chunk) {
				if (chunk.length === 0) return;
				if (this.#stage === "done") throw invalid();
				const next = this.#wire + chunk.length;
				if (next > this.#limit.maximumBytes) throw bridgeResponseOversizeError(this.#limit);
				this.#wire = next;
				let offset = 0;
				while (offset < chunk.length) offset = this.#take(chunk, offset);
			}
			/** Release the decode buffer and return the one response string. */
			finish() {
				if (this.#stage !== "done") throw invalid();
				if (!isUtf8(this.#out.subarray(0, this.#outLength))) throw invalid();
				const response = this.#out.toString("utf8", 0, this.#outLength);
				this.#out = Buffer.alloc(0);
				this.#outLength = 0;
				return {
					response,
					proof: this.#proof
				};
			}
			#take(chunk, offset) {
				switch (this.#stage) {
					case "prefix": return this.#match(chunk, offset, PREFIX, "body");
					case "mark": return this.#match(chunk, offset, PROOF_MARK, "proof");
					case "close": return this.#match(chunk, offset, CLOSE, "done");
					case "proof": return this.#takeProof(chunk, offset);
					case "body": return this.#takeBody(chunk, offset);
					case "done": throw invalid();
				}
			}
			#match(chunk, offset, literal, next) {
				const available = Math.min(literal.length - this.#literal, chunk.length - offset);
				const actual = chunk.subarray(offset, offset + available);
				const expected = literal.subarray(this.#literal, this.#literal + available);
				if (!actual.equals(expected)) throw invalid();
				this.#literal += available;
				if (this.#literal === literal.length) {
					this.#stage = next;
					this.#literal = 0;
				}
				return offset + available;
			}
			#takeProof(chunk, offset) {
				const end = Math.min(chunk.length, offset + (PROOF_HEX_LENGTH - this.#proof.length));
				for (let index = offset; index < end; index += 1) {
					const byte = chunk[index];
					const digit = byte >= 48 && byte <= 57 ? byte - 48 : byte >= 97 && byte <= 102 ? byte - 87 : -1;
					if (digit < 0) throw invalid();
					this.#proof += String.fromCharCode(byte);
				}
				if (this.#proof.length === PROOF_HEX_LENGTH) this.#stage = "close";
				return end;
			}
			#takeBody(chunk, offset) {
				if (this.#escape !== "none") return this.#takeEscape(chunk, offset);
				const slash = chunk.indexOf(92, offset);
				let quote = -1;
				if (slash < 0) quote = chunk.indexOf(34, offset);
				else {
					const relative = chunk.subarray(offset, slash).indexOf(34);
					if (relative >= 0) quote = offset + relative;
				}
				let end = chunk.length;
				if (quote >= 0 && quote < end) end = quote;
				if (slash >= 0 && slash < end) end = slash;
				if (end > offset) this.#append(chunk.subarray(offset, end));
				if (end === chunk.length) return chunk.length;
				if (chunk[end] === 34) {
					this.#stage = "mark";
					this.#literal = 0;
					return end + 1;
				}
				this.#escape = "slash";
				return end + 1;
			}
			#takeEscape(chunk, offset) {
				const byte = chunk[offset];
				if (this.#escape === "slash") this.#escaped(byte);
				else if (this.#escape === "hex") this.#hexDigit(byte, false);
				else if (this.#escape === "low-slash") {
					if (byte !== 92) throw invalid();
					this.#escape = "low-u";
				} else if (this.#escape === "low-u") {
					if (byte !== 117) throw invalid();
					this.#escape = "low-hex";
					this.#hex = 0;
					this.#hexCount = 0;
				} else this.#hexDigit(byte, true);
				return offset + 1;
			}
			#escaped(byte) {
				if (byte === 117) {
					this.#escape = "hex";
					this.#hex = 0;
					this.#hexCount = 0;
					return;
				}
				const mapped = SIMPLE_ESCAPE[byte] ?? -1;
				if (mapped < 0) throw invalid();
				this.#appendByte(mapped);
				this.#escape = "none";
			}
			#hexDigit(byte, low) {
				const digit = HEX[byte] ?? -1;
				if (digit < 0) throw invalid();
				this.#hex = this.#hex << 4 | digit;
				this.#hexCount += 1;
				if (this.#hexCount < 4) return;
				const code = this.#hex;
				this.#hex = 0;
				this.#hexCount = 0;
				this.#escape = "none";
				if (low) {
					if (code < 56320 || code > 57343) throw invalid();
					this.#appendCodePoint(65536 + (this.#high - 55296 << 10) + (code - 56320));
					return;
				}
				if (code >= 55296 && code <= 56319) {
					this.#high = code;
					this.#escape = "low-slash";
					return;
				}
				if (code >= 56320 && code <= 57343) throw invalid();
				this.#appendCodePoint(code);
			}
			#appendCodePoint(code) {
				if (code < 128) {
					this.#appendByte(code);
					return;
				}
				if (code < 2048) {
					this.#appendByte(192 | code >> 6);
					this.#appendByte(128 | code & 63);
					return;
				}
				if (code < 65536) {
					this.#appendByte(224 | code >> 12);
					this.#appendByte(128 | code >> 6 & 63);
					this.#appendByte(128 | code & 63);
					return;
				}
				this.#appendByte(240 | code >> 18);
				this.#appendByte(128 | code >> 12 & 63);
				this.#appendByte(128 | code >> 6 & 63);
				this.#appendByte(128 | code & 63);
			}
			#appendByte(value) {
				this.#ensure(1);
				this.#out[this.#outLength] = value;
				this.#outLength += 1;
			}
			#append(bytes) {
				this.#ensure(bytes.length);
				bytes.copy(this.#out, this.#outLength);
				this.#outLength += bytes.length;
			}
			#ensure(extra) {
				if (this.#outLength + extra <= this.#out.length) return;
				let next = this.#out.length;
				while (this.#outLength + extra > next) next *= 2;
				if (next > this.#limit.maximumBytes) next = this.#limit.maximumBytes;
				if (this.#outLength + extra > next) throw invalid();
				const grown = Buffer.allocUnsafe(next);
				this.#out.copy(grown, 0, 0, this.#outLength);
				this.#out = grown;
			}
		};
		CutterBridgeResponseFrames = class {
			#limit;
			#challenge;
			#challengeLength = 0;
			#decoder;
			#frames = 0;
			constructor(limit) {
				this.#limit = limit;
			}
			push(chunk, onFrame) {
				let offset = 0;
				while (offset < chunk.length) {
					if (this.#frames >= 2) throw new Error("Cutter bridge sent more than two protocol frames");
					const step = this.#frames === 0 ? this.#pushChallenge(chunk, offset, onFrame) : this.#pushResponse(chunk, offset, onFrame);
					if (step < 0) return;
					offset = step;
				}
			}
			#pushChallenge(chunk, offset, onFrame) {
				const delimiter = chunk.indexOf(10, offset);
				const end = delimiter < 0 ? chunk.length : delimiter;
				const length = end - offset;
				if (this.#challengeLength + length > CHALLENGE_FRAME_BYTES) throw new Error("invalid authentication challenge");
				this.#challenge ??= Buffer.allocUnsafe(CHALLENGE_FRAME_BYTES);
				chunk.copy(this.#challenge, this.#challengeLength, offset, end);
				this.#challengeLength += length;
				if (delimiter < 0) return chunk.length;
				let value;
				try {
					if (!isUtf8(this.#challenge.subarray(0, this.#challengeLength))) throw new Error("invalid authentication challenge");
					value = JSON.parse(this.#challenge.toString("utf8", 0, this.#challengeLength));
				} catch {
					throw new Error("invalid authentication challenge");
				}
				this.#challenge = undefined;
				this.#challengeLength = 0;
				this.#frames = 1;
				return onFrame({
					kind: "challenge",
					value
				}) ? delimiter + 1 : -1;
			}
			#pushResponse(chunk, offset, onFrame) {
				const delimiter = chunk.indexOf(10, offset);
				const end = delimiter < 0 ? chunk.length : delimiter;
				this.#decoder ??= new CutterAuthenticatedResponseDecoder(this.#limit);
				this.#decoder.push(chunk.subarray(offset, end));
				if (delimiter < 0) return chunk.length;
				const decoded = this.#decoder.finish();
				this.#decoder = undefined;
				this.#frames = 2;
				return onFrame({
					kind: "response",
					...decoded
				}) ? delimiter + 1 : -1;
			}
		};
	})))();
}

//#endregion
//#region dist/cutter/cutterCommandResponse.js
var parseCutterCommandResponse;
function init_cutterCommandResponse() {
	return (init_cutterCommandResponse = __esmMin((() => {
		parseCutterCommandResponse = (text) => {
			if (!/\d{16}/u.test(text)) return JSON.parse(text);
			const parents = [];
			let result;
			let key = "";
			const inCommandOutput = () => parents.at(-1)?.commandOutput === true || parents.length === 1 && key === "output";
			const append = (value) => {
				const parent = parents.at(-1)?.value;
				if (parent === undefined) result = value;
				else if (Array.isArray(parent)) parent.push(value);
				else if (key === "__proto__") Object.defineProperty(parent, key, {
					value,
					writable: true,
					enumerable: true,
					configurable: true
				});
				else parent[key] = value;
			};
			const begin = (value) => {
				const commandOutput = inCommandOutput();
				append(value);
				parents.push({
					value,
					commandOutput
				});
			};
			visit(text, {
				onObjectBegin: () => begin({}),
				onObjectProperty: (name) => {
					key = name;
				},
				onObjectEnd: () => {
					parents.pop();
				},
				onArrayBegin: () => begin([]),
				onArrayEnd: () => {
					parents.pop();
				},
				onLiteralValue: (value, offset, length) => {
					if (typeof value === "number" && !Number.isSafeInteger(value) && inCommandOutput()) {
						const source = text.slice(offset, offset + length);
						if (isInteger(source)) {
							append(source);
							return;
						}
					}
					append(value);
				},
				onError: () => {
					throw new SyntaxError("Invalid Cutter command response JSON");
				}
			}, { disallowComments: true });
			return result;
		};
	})))();
}

//#endregion
//#region dist/cutter/CutterBridgeClient.js
var descriptorSchema, responseSchema, modifiedPluginRefusal, acknowledgementSchema, MAX_DESCRIPTOR_BYTES, REQUEST_TIMEOUT_MS, DISCOVERY_CANDIDATE_BUDGET_BYTES, MAX_DESCRIPTOR_CANDIDATES, DISCOVERY_CONCURRENCY, serializeRequest, serverChallengeSchema, authenticatedServerNonce, assertBridgeActive, mapDiscovery, CutterBridgeRequestFailure, CutterBridgeClient, resolveBridgeDirectory, CutterDiscoveryFailure, discoveryFailure;
function init_CutterBridgeClient() {
	return (init_CutterBridgeClient = __esmMin((() => {
		init_HostPlatform();
		init_analysisErrorCleanup();
		init_providerAdapterError();
		init_resources();
		init_providerCleanupError();
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_jsonValueByteLength();
		init_cutterDiscovery();
		init_result();
		init_cutterBridgeMac();
		init_CutterBridgeSource();
		init_cutterAuthenticatedResponse();
		init_cutterCommandResponse();
		init_WindowsNativeLoader();
		init_BoundedFileBytes();
		init_homeDirectory();
		init_callerPath();
		init_bridgeMaxRequestBytes();
		init_analysisResourceLimits();
		init_configurationErrors();
		init_analysisOperationSnapshot();
		descriptorSchema = z.object({
			...cutterSessionSchema.omit({ bridge_source: true }).shape,
			bridge_source_sha256: z.string().regex(/^[0-9a-f]{64}$/).nullable().optional(),
			host: z.literal("127.0.0.1"),
			port: z.int().min(1).max(65535),
			token: z.string().min(20),
			max_request_bytes: z.int().positive().optional()
		});
		responseSchema = z.object({
			ok: z.boolean(),
			session_id: z.string().uuid().optional(),
			output: z.unknown().optional(),
			current_file: z.string().nullable().optional(),
			cutter_version: z.string().nullable().optional(),
			document_generation: z.int().nonnegative().optional(),
			identity_status: z.literal("partial").optional(),
			error: z.string().optional(),
			message: z.string().optional(),
			execution_state: z.enum([
				"not_started",
				"running",
				"complete",
				"failed",
				"unknown"
			]).optional(),
			output_truncated: z.boolean().optional(),
			completed_commands: z.array(z.object({
				request_id: z.string().uuid(),
				execution_state: z.enum([
					"not_started",
					"complete",
					"failed"
				])
			})).max(64).optional(),
			completed_connection: z.string().regex(/^[0-9a-f]{16}$/).optional()
		});
		modifiedPluginRefusal = () => {
			const remediation = `${cutterBridgeSourceRecovery("modified")} No command was sent.`;
			return new AnalysisCapabilityUnavailableError("cutter", "cutter_command", "The Cutter session runs a REA plugin whose source differs from the packaged plugin, so its protocol cannot be trusted to match this REA release.", {
				remediationAction: remediation,
				userMessage: remediation
			});
		};
		acknowledgementSchema = z.object({
			ok: z.literal(true),
			acknowledged: z.boolean()
		});
		MAX_DESCRIPTOR_BYTES = 64 * 1024;
		REQUEST_TIMEOUT_MS = 25e3;
		DISCOVERY_CANDIDATE_BUDGET_BYTES = 16 * 1024 * 1024;
		MAX_DESCRIPTOR_CANDIDATES = DISCOVERY_CANDIDATE_BUDGET_BYTES / MAX_DESCRIPTOR_BYTES;
		DISCOVERY_CONCURRENCY = 8;
		serializeRequest = (limit, descriptor, request) => {
			const requestValue = {
				...request,
				session_id: descriptor.session_id
			};
			const measured = jsonValueByteLength(requestValue, limit.maximumBytes);
			if (measured > limit.maximumBytes) throw bridgeRequestOversizeError("cutter_command", limit, measured, "Cutter");
			const requestBytes = JSON.stringify(requestValue);
			let frameBytes = Buffer.byteLength(JSON.stringify({
				request: "",
				proof: "0".repeat(64)
			})) + Buffer.byteLength(requestBytes);
			for (const character of requestBytes) if (character === "\"" || character === "\\") frameBytes += 1;
			if (frameBytes > limit.maximumBytes) throw bridgeRequestOversizeError("cutter_command", limit, frameBytes, "Cutter");
			return requestBytes;
		};
		serverChallengeSchema = z.object({
			session_id: z.string().uuid(),
			nonce: z.string().regex(/^[0-9a-f]{64}$/),
			proof: z.string().regex(/^[0-9a-f]{64}$/)
		});
		authenticatedServerNonce = (descriptor, clientNonce, value) => {
			const challenge = serverChallengeSchema.parse(value);
			if (challenge.session_id !== descriptor.session_id) throw new Error("unexpected peer session");
			const expected = createHmac("sha256", descriptor.token).update(`rea-cutter-server-v2:${descriptor.session_id}:${clientNonce}:${challenge.nonce}`).digest();
			const presented = Buffer.from(challenge.proof, "hex");
			if (expected.length !== presented.length || !timingSafeEqual(expected, presented)) throw new Error("peer proof failed");
			return challenge.nonce;
		};
		assertBridgeActive = (signal, operation) => {
			if (signal?.aborted) throw cancelledBy(operation, signal);
		};
		mapDiscovery = async (inputs, operation, assertActive) => {
			assertActive();
			const results = new Array(inputs.length);
			let next = 0;
			let stopped = false;
			const workers = await Promise.allSettled(Array.from({ length: Math.min(inputs.length, DISCOVERY_CONCURRENCY) }, async () => {
				try {
					while (!stopped && next < inputs.length) {
						assertActive();
						const index = next++;
						results[index] = await operation(inputs[index]);
					}
				} catch (cause) {
					stopped = true;
					throw cause;
				}
			}));
			const failures = workers.flatMap((result) => result.status === "rejected" ? [result.reason] : []);
			if (failures.length > 1) throw new CutterDiscoveryFailure(failures);
			if (failures.length === 1) throw failures[0];
			assertActive();
			return results;
		};
		CutterBridgeRequestFailure = class extends Error {
			requestSent;
			cancellation;
			limit;
			constructor(message, requestSent, cancellation, limit) {
				super(message);
				this.requestSent = requestSent;
				this.cancellation = cancellation;
				this.limit = limit;
			}
		};
		CutterBridgeClient = class {
			#launchRequestBytes;
			#launchRequestError;
			#read;
			#directory;
			#descriptorResources = new ArtifactResourceScope();
			#platform;
			#windowsPrivateReader;
			#pendingAcknowledgements = new Map();
			constructor(environment = process.env, options = {}) {
				const launchRequest = parseBridgeMaxRequestBytes(environment[BRIDGE_MAX_REQUEST_BYTES_SETTING]);
				this.#launchRequestBytes = launchRequest.ok ? launchRequest.value : undefined;
				this.#launchRequestError = launchRequest.ok ? undefined : launchRequest.error;
				this.#read = options.read;
				const configured = environment.REA_CUTTER_BRIDGE_DIR;
				const localAppData = environment.LOCALAPPDATA;
				this.#platform = options.platform ?? HOST_PLATFORM.platform;
				this.#windowsPrivateReader = options.windowsPrivateReader ?? (this.#platform === "win32" ? {
					verifyDirectory: (directory) => z.object({ privateDacl: z.literal(true) }).safeParse(requireWindowsNativeAuthority().call("cutter_bridge_verify_directory", [directory])).success,
					readDescriptor: (directory, name, maxBytes) => z.instanceof(Buffer).parse(requireWindowsNativeAuthority().call("cutter_bridge_read_descriptor", [
						directory,
						name,
						maxBytes
					]))
				} : undefined);
				this.#directory = resolveBridgeDirectory(configured, this.#platform, localAppData, homeDirectoryFromEnvironment(environment, this.#platform));
			}
			/** Ceiling for this call. A bound operation keeps the value it accepted. */
			#requestLimit() {
				const snapshot = currentAnalysisOperationSnapshot();
				const override = snapshot === undefined ? this.#read?.().overrides["bridge.max_request_bytes"] : snapshot.overrides["bridge.max_request_bytes"];
				if (override !== undefined) return {
					maximumBytes: override,
					source: "runtime"
				};
				if (this.#launchRequestBytes === undefined) throw this.#launchRequestError ?? new ConfigurationError("Invalid REA environment configuration");
				return this.#launchRequestBytes;
			}
			async retryDescriptorCleanup() {
				try {
					await this.#descriptorResources.retryCleanup();
				} catch (cause) {
					throw discoveryFailure(cause, "close_cutter_descriptors");
				}
			}
			async close() {
				try {
					await this.#descriptorResources.close();
				} catch (cause) {
					throw discoveryFailure(cause, "close_cutter_descriptors");
				}
			}
			async listSessions({ signal } = {}) {
				assertBridgeActive(signal, "list_cutter_sessions");
				this.#requestLimit();
				const mismatches = [];
				const loaded = await this.#readDescriptors("list_cutter_sessions", signal);
				if (loaded.error !== undefined) return {
					sessions: [],
					bridge_directory: this.#directory,
					discovery_status: loaded.error,
					bridge_directory_security: loaded.security,
					limitations: cutterDiscoveryLimitations(loaded.error)
				};
				const descriptors = await mapDiscovery(loaded.descriptors, async (descriptor) => {
					assertBridgeActive(signal, "list_cutter_sessions");
					const advertised = descriptor.max_request_bytes ?? 16777216;
					if (advertised !== this.#requestLimit().maximumBytes) {
						if (await this.#liveAuthenticatedBridge(descriptor, signal)) mismatches.push(advertised);
						return undefined;
					}
					const bridgeSource = cutterBridgeSource(descriptor.bridge_source_sha256, "list_cutter_sessions");
					const bridgeSourceRecovery = cutterBridgeSourceRecovery(bridgeSource);
					try {
						const status = responseSchema.safeParse(await this.#request(descriptor, serializeRequest(this.#requestLimit(), descriptor, {
							kind: "status",
							session_id: descriptor.session_id
						}), signal));
						if (!status.success || !status.data.ok || status.data.session_id !== descriptor.session_id) return undefined;
						return {
							session_id: descriptor.session_id,
							pid: descriptor.pid,
							document_generation: status.data.document_generation ?? descriptor.document_generation,
							current_file: status.data.current_file === undefined ? descriptor.current_file : status.data.current_file,
							cutter_version: status.data.cutter_version ?? descriptor.cutter_version,
							identity_status: "partial",
							bridge_source: bridgeSource,
							...bridgeSourceRecovery === undefined ? {} : { bridge_source_recovery: bridgeSourceRecovery }
						};
					} catch (cause) {
						if (cause instanceof AnalysisResourceConstraintError) throw cause;
						if (cause instanceof CutterBridgeRequestFailure) {
							if (cause.cancellation !== undefined) throw cancelledBy("list_cutter_sessions", carriedReason(cause.cancellation.reason));
							if (cause.limit !== undefined) throw reattributedResourceConstraint("list_cutter_sessions", cause.limit);
						}
						return undefined;
					}
				}, () => assertBridgeActive(signal, "list_cutter_sessions")).catch((cause) => {
					throw discoveryFailure(cause, "list_cutter_sessions");
				});
				const sessions = descriptors.filter((value) => value !== undefined);
				if (mismatches.length > 0) throw bridgeRequestLimitMismatchError("list_cutter_sessions", this.#requestLimit(), mismatches[0] ?? 16777216, "Cutter", "No status request was sent to the mismatched session.");
				const discoveryStatus = sessions.length > 0 ? "sessions_found" : "no_live_bridge_found";
				return {
					sessions,
					bridge_directory: this.#directory,
					discovery_status: discoveryStatus,
					bridge_directory_security: loaded.security,
					limitations: cutterDiscoveryLimitations(discoveryStatus, {
						unreadable: loaded.unreadable,
						unanswered: descriptors.length - sessions.length
					})
				};
			}
			async execute(input) {
				try {
					assertBridgeActive(input.signal, "cutter_command");
					this.#requestLimit();
					const descriptor = await this.#find(input.sessionId, input.signal);
					assertBridgeActive(input.signal, "cutter_command");
					if (cutterBridgeSource(descriptor.bridge_source_sha256, "cutter_command") === "modified") throw modifiedPluginRefusal();
					const advertised = descriptor.max_request_bytes ?? 16777216;
					if (advertised !== this.#requestLimit().maximumBytes) throw bridgeRequestLimitMismatchError("cutter_command", this.#requestLimit(), advertised, "Cutter");
					const requestId = randomUUID();
					const commandRequest = serializeRequest(this.#requestLimit(), descriptor, {
						kind: "command",
						request_id: requestId,
						expected_generation: input.expectedGeneration,
						command: input.command,
						json: input.json
					});
					await this.#recoverCompletedCommands(descriptor, input.signal);
					await this.#retryPendingAcknowledgements(descriptor);
					assertBridgeActive(input.signal, "cutter_command");
					let completionToken;
					let rawResponse;
					try {
						rawResponse = await this.#request(descriptor, commandRequest, input.signal, {
							json: input.json,
							onAuthenticated: (ordinal) => {
								completionToken = ordinal;
							}
						});
					} catch (cause) {
						if (!(cause instanceof CutterBridgeRequestFailure) || !cause.requestSent) throw cause;
						return {
							requestId,
							output: null,
							currentFile: descriptor.current_file,
							documentGeneration: null,
							identityStatus: "partial",
							cutterVersion: descriptor.cutter_version,
							executionState: "unknown",
							error: "transport-response-missing",
							message: `${cause.message}; the command may have completed; do not retry automatically`,
							outputTruncated: cause.limit === undefined ? null : true,
							...cause.limit?.limit === undefined ? {} : { outputLimit: cause.limit.limit },
							...completionToken === undefined ? {} : { completionToken }
						};
					}
					const parsed = responseSchema.safeParse(rawResponse);
					if (!parsed.success) return {
						requestId,
						output: null,
						currentFile: descriptor.current_file,
						documentGeneration: null,
						identityStatus: "partial",
						cutterVersion: descriptor.cutter_version,
						executionState: "unknown",
						error: "malformed-bridge-response",
						message: "Cutter may have completed the command, but its response was invalid; do not retry automatically",
						outputTruncated: null,
						...completionToken === undefined ? {} : { completionToken }
					};
					const response = parsed.data;
					const executionState = response.ok ? response.execution_state === "complete" ? "complete" : response.execution_state === "not_started" ? "not_started" : "unknown" : response.execution_state === "failed" ? "failed" : response.execution_state === "not_started" ? "not_started" : "unknown";
					if (executionState !== "unknown") await this.#acknowledgeCompletion(descriptor, requestId);
					if (executionState === "not_started" && response.error === "active-document-generation-changed") throw new AnalysisInputError("cutter_command", { diagnostics: {
						session_id: input.sessionId,
						expected_generation: input.expectedGeneration,
						...response.document_generation === undefined ? {} : { observed_generation: response.document_generation },
						execution_state: executionState
					} }, [{
						path: ["expected_generation"],
						reason: "invalid_value",
						message: "Cutter's active document generation changed. List sessions again and select the current generation."
					}]);
					return {
						requestId,
						output: response.output ?? null,
						currentFile: response.current_file === undefined ? descriptor.current_file : response.current_file,
						documentGeneration: response.document_generation ?? null,
						identityStatus: "partial",
						cutterVersion: response.cutter_version ?? descriptor.cutter_version,
						executionState,
						error: response.ok ? null : response.error ?? "cutter-command-failed",
						message: response.message ?? null,
						outputTruncated: response.output_truncated ?? (executionState === "not_started" ? false : null),
						...completionToken === undefined ? {} : { completionToken }
					};
				} catch (cause) {
					if (!(cause instanceof CutterBridgeRequestFailure)) throw cause;
					if (cause.cancellation !== undefined) throw cancelledBy("cutter_command", carriedReason(cause.cancellation.reason));
					throw new AnalysisCapabilityUnavailableError("cutter", "cutter_command", cause.message, { cause });
				}
			}
			/** Confirm completion by exact receipt or authenticated connection watermark. */
			async confirmCommandCompletion(sessionId, requestId, completionToken) {
				let descriptor;
				try {
					descriptor = await this.#find(sessionId);
				} catch (cause) {
					if (cause instanceof AnalysisError) return err(cause);
					return err(new AnalysisCapabilityUnavailableError("cutter", "cutter_command", cause instanceof Error ? cause.message : "Cutter session unavailable", { cause }));
				}
				try {
					const status = await this.#readCommandStatus(descriptor);
					const completed = (status.completed_commands ?? []).some((receipt) => receipt.request_id === requestId);
					if (completed) await this.#acknowledgeCompletion(descriptor, requestId);
					return ok(completed || completionToken !== undefined && status.completed_connection !== undefined && status.completed_connection >= completionToken);
				} catch (cause) {
					if (cause instanceof AnalysisError) return err(cause);
					return err(new AnalysisCapabilityUnavailableError("cutter", "cutter_command", cause instanceof Error ? cause.message : "Cutter status failed", {
						cause,
						diagnostics: { auxiliary_operation: "status" }
					}));
				}
			}
			async #readCommandStatus(descriptor, signal) {
				const raw = await this.#request(descriptor, serializeRequest(this.#requestLimit(), descriptor, {
					kind: "status",
					session_id: descriptor.session_id
				}), signal);
				const status = responseSchema.safeParse(raw);
				if (!status.success || !status.data.ok || status.data.session_id !== descriptor.session_id) throw new AnalysisOutputError("cutter_command", "The bridge status response did not contain a valid session identity.", {
					cause: status.success ? undefined : status.error,
					diagnostics: { auxiliary_operation: "status" }
				});
				return status.data;
			}
			async #recoverCompletedCommands(descriptor, signal) {
				const status = await this.#readCommandStatus(descriptor, signal);
				if (status.completed_connection === undefined) throw new AnalysisOutputError("cutter_command", "The bridge did not provide authenticated proof that earlier connections reached a terminal state.", { diagnostics: { auxiliary_operation: "status" } });
				const pending = this.#pendingAcknowledgements.get(descriptor.session_id) ?? new Set();
				for (const receipt of status.completed_commands ?? []) pending.add(receipt.request_id);
				if (pending.size > 0) this.#pendingAcknowledgements.set(descriptor.session_id, pending);
			}
			async #acknowledgeCompletion(descriptor, requestId) {
				try {
					const raw = await this.#request(descriptor, serializeRequest(this.#requestLimit(), descriptor, {
						kind: "ack",
						request_id: requestId
					}));
					const acknowledged = acknowledgementSchema.safeParse(raw);
					if (!acknowledged.success) throw new Error("Cutter did not confirm the completion receipt acknowledgement.");
					const pending = this.#pendingAcknowledgements.get(descriptor.session_id);
					pending?.delete(requestId);
					if (pending?.size === 0) this.#pendingAcknowledgements.delete(descriptor.session_id);
					return true;
				} catch {
					const pending = this.#pendingAcknowledgements.get(descriptor.session_id) ?? new Set();
					pending.add(requestId);
					this.#pendingAcknowledgements.set(descriptor.session_id, pending);
					return false;
				}
			}
			async #retryPendingAcknowledgements(descriptor) {
				const pending = this.#pendingAcknowledgements.get(descriptor.session_id);
				if (pending === undefined) return;
				for (const requestId of pending) {
					if (!await this.#acknowledgeCompletion(descriptor, requestId)) throw new AnalysisCapabilityUnavailableError("cutter", "cutter_command", "A retained Cutter completion receipt could not be acknowledged; no new command was sent.");
				}
			}
			async #find(sessionId, signal) {
				const loaded = await this.#readDescriptors("cutter_command", signal);
				if (loaded.error === "bridge_directory_capacity_exceeded") throw new AnalysisResourceConstraintError("cutter_command", "transport", `Cutter descriptor discovery exceeded its candidate budget of ${String(MAX_DESCRIPTOR_CANDIDATES)} descriptors; no command was sent. This release has no runtime override.`, {
					max_descriptor_candidates: MAX_DESCRIPTOR_CANDIDATES,
					bridge_directory: this.#directory
				}, {
					requestSent: false,
					remediationAction: `Reduce the number of Cutter bridge descriptors in the bridge directory. This budget of ${String(MAX_DESCRIPTOR_CANDIDATES)} descriptors has no runtime override. Descriptor files above ${String(MAX_DESCRIPTOR_BYTES)} bytes are skipped, and at most ${String(DISCOVERY_CONCURRENCY)} descriptors are probed at once; those caps also have no runtime override.`
				});
				if (loaded.error !== undefined) throw new AnalysisCapabilityUnavailableError("cutter", "cutter_command", `Cutter descriptor discovery failed: ${loaded.error}`);
				const descriptor = loaded.descriptors.find((candidate) => candidate.session_id === sessionId);
				if (descriptor === undefined) throw new AnalysisInputError("cutter_command", undefined, [{
					path: ["session_id"],
					reason: "invalid_value",
					message: "Cutter bridge session is unavailable or stale; list sessions again and select an available session."
				}]);
				return descriptor;
			}
			async #readDescriptors(operation, signal) {
				try {
					return await this.#descriptorResources.run(() => this.#loadDescriptors(signal));
				} catch (cause) {
					throw discoveryFailure(cause, operation);
				}
			}
			async #loadDescriptors(signal) {
				assertArtifactReadActive(signal);
				let directoryInfo;
				try {
					directoryInfo = await lstat(this.#directory);
				} catch (cause) {
					const code = cause.code;
					if (code === "ENOENT") return {
						descriptors: [],
						security: "not_checked",
						unreadable: 0
					};
					return {
						descriptors: [],
						security: "not_checked",
						error: "bridge_directory_unavailable"
					};
				}
				if (!directoryInfo.isDirectory() || directoryInfo.isSymbolicLink()) return {
					descriptors: [],
					security: "not_private",
					error: "bridge_directory_insecure"
				};
				const currentUid = this.#platform !== "win32" ? process.getuid?.() : undefined;
				const posix = currentUid !== undefined;
				if (posix && (directoryInfo.uid !== currentUid || (directoryInfo.mode & 63) !== 0)) return {
					descriptors: [],
					security: "not_private",
					error: "bridge_directory_insecure"
				};
				let security = posix ? "private_verified" : "unverified_platform_acl";
				const windowsPrivateReader = this.#windowsPrivateReader;
				if (!posix) {
					if (this.#platform !== "win32" || windowsPrivateReader === undefined) return {
						descriptors: [],
						security,
						error: "bridge_directory_insecure"
					};
					try {
						if (!windowsPrivateReader.verifyDirectory(this.#directory)) return {
							descriptors: [],
							security: "not_private",
							error: "bridge_directory_insecure"
						};
						security = "private_verified";
					} catch {
						return {
							descriptors: [],
							security,
							error: "bridge_directory_insecure"
						};
					}
				}
				const entries = [];
				try {
					const directory = await opendir(this.#directory);
					for await (const entry of directory) {
						assertArtifactReadActive(signal);
						if (!/^cutter-\d+-[0-9a-f-]{36}\.json$/iu.test(entry.name)) continue;
						if (entries.length === MAX_DESCRIPTOR_CANDIDATES) return {
							descriptors: [],
							security,
							error: "bridge_directory_capacity_exceeded"
						};
						entries.push(entry.name);
					}
				} catch (cause) {
					if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") throw cause;
					return {
						descriptors: [],
						security: "not_checked",
						error: "bridge_directory_unavailable"
					};
				}
				const loaded = await mapDiscovery(entries, async (entry) => {
					assertArtifactReadActive(signal);
					try {
						let bytes;
						if (this.#platform === "win32") {
							bytes = windowsPrivateReader.readDescriptor(this.#directory, entry, MAX_DESCRIPTOR_BYTES);
						} else {
							const boundedBytes = await withArtifactRegularFile(appendCallerPath(this.#directory, entry, this.#platform), this.#descriptorResources, signal, async ({ handle: file, initial: info }) => {
								if (info.size > MAX_DESCRIPTOR_BYTES || info.uid !== currentUid || (info.mode & 63) !== 0) return undefined;
								assertArtifactReadActive(signal);
								const bytes = await readBoundedFileBytes(file, MAX_DESCRIPTOR_BYTES);
								assertArtifactReadActive(signal);
								return bytes;
							});
							if (boundedBytes === undefined) return undefined;
							bytes = boundedBytes;
						}
						assertArtifactReadActive(signal);
						if (bytes.byteLength > MAX_DESCRIPTOR_BYTES || !isUtf8(bytes)) return undefined;
						const parsed = descriptorSchema.safeParse(JSON.parse(bytes.toString("utf8")));
						if (!parsed.success || entry !== `cutter-${parsed.data.pid}-${parsed.data.session_id}.json`) return undefined;
						return parsed.data;
					} catch (cause) {
						if (cause instanceof ArtifactReaderFailure && (cause.cleanup !== undefined || cause.reason === "cancelled")) throw cause;
						return undefined;
					}
				}, () => assertArtifactReadActive(signal));
				assertArtifactReadActive(signal);
				const descriptors = loaded.filter((value) => value !== undefined);
				return {
					descriptors,
					security,
					unreadable: entries.length - descriptors.length
				};
			}
			/**
			* Hello only. A matching server proof means this descriptor is a live
			* authenticated bridge. The socket closes before any status or command.
			*/
			#liveAuthenticatedBridge(descriptor, signal) {
				assertBridgeActive(signal, "list_cutter_sessions");
				return new Promise((resolve, reject) => {
					const connection = createConnection({
						host: descriptor.host,
						port: descriptor.port
					});
					const frames = new CutterBridgeResponseFrames(this.#requestLimit());
					let settled = false;
					const settle = (outcome) => {
						if (settled) return;
						settled = true;
						clearTimeout(timer);
						signal?.removeEventListener("abort", onAbort);
						connection.destroy();
						if (outcome.ok) resolve(outcome.live);
						else reject(outcome.cause);
					};
					const timer = setTimeout(() => settle({
						ok: true,
						live: false
					}), REQUEST_TIMEOUT_MS);
					const onAbort = () => {
						settle({
							ok: false,
							cause: cancelledBy("list_cutter_sessions", carriedReason(signal?.reason))
						});
					};
					signal?.addEventListener("abort", onAbort, { once: true });
					if (signal?.aborted) {
						onAbort();
						return;
					}
					const clientNonce = randomBytes(32).toString("hex");
					connection.once("connect", () => {
						if (settled) return;
						connection.write(`${JSON.stringify({
							kind: "rea-auth-v2",
							nonce: clientNonce
						})}\n`);
					});
					connection.on("data", (chunk) => {
						if (settled) return;
						try {
							frames.push(chunk, (frame) => {
								if (frame.kind !== "challenge") {
									settle({
										ok: true,
										live: false
									});
									return false;
								}
								try {
									authenticatedServerNonce(descriptor, clientNonce, frame.value);
									settle({
										ok: true,
										live: true
									});
								} catch {
									settle({
										ok: true,
										live: false
									});
								}
								return false;
							});
						} catch {
							settle({
								ok: true,
								live: false
							});
						}
					});
					connection.once("error", () => settle({
						ok: true,
						live: false
					}));
					connection.once("close", () => settle({
						ok: true,
						live: false
					}));
				});
			}
			#request(descriptor, requestBytes, signal, command) {
				return new Promise((resolve, reject) => {
					const connection = createConnection({
						host: descriptor.host,
						port: descriptor.port
					});
					const frames = new CutterBridgeResponseFrames(this.#requestLimit());
					let completion;
					let requestSent = false;
					let authenticated = false;
					const clientNonce = randomBytes(32).toString("hex");
					let serverNonce = "";
					let connectionOrdinal;
					const finish = (complete) => {
						if (completion !== undefined) return;
						completion = complete;
						clearTimeout(timer);
						signal?.removeEventListener("abort", onAbort);
						connection.destroy();
					};
					const rejectRequest = (message, cancellation, limit) => finish(() => reject(new CutterBridgeRequestFailure(message, requestSent, cancellation, limit)));
					const timer = setTimeout(() => {
						rejectRequest(`Cutter bridge request timed out after ${String(REQUEST_TIMEOUT_MS)} ms (deadlineExpired). This release has no runtime override`);
					}, REQUEST_TIMEOUT_MS);
					const onAbort = () => {
						rejectRequest("Cutter bridge request was cancelled", { reason: signal?.reason });
					};
					signal?.addEventListener("abort", onAbort, { once: true });
					if (signal?.aborted) onAbort();
					connection.once("connect", () => {
						if (completion !== undefined) return;
						connection.write(`${JSON.stringify({
							kind: "rea-auth-v2",
							nonce: clientNonce
						})}\n`);
					});
					connection.on("data", (chunk) => {
						if (completion !== undefined) return;
						try {
							frames.push(chunk, (frame) => {
								if (frame.kind === "challenge") {
									if (authenticated) throw new Error("unexpected challenge");
									serverNonce = authenticatedServerNonce(descriptor, clientNonce, frame.value);
									connectionOrdinal = serverNonce.slice(0, 16);
									command?.onAuthenticated(connectionOrdinal);
									const proof = cutterBridgeMac(descriptor.token, [`rea-cutter-client-v2:${descriptor.session_id}:${clientNonce}:${serverNonce}:`, requestBytes]).toString("hex");
									authenticated = true;
									requestSent = true;
									connection.write(`${JSON.stringify({
										request: requestBytes,
										proof
									})}\n`);
									return true;
								}
								const expected = cutterBridgeMac(descriptor.token, [`rea-cutter-response-v2:${descriptor.session_id}:${clientNonce}:${serverNonce}:`, frame.response]);
								if (!timingSafeEqual(expected, Buffer.from(frame.proof, "hex"))) throw new Error("response proof failed");
								const response = command?.json ? parseCutterCommandResponse(frame.response) : JSON.parse(frame.response);
								finish(() => resolve(response));
								return false;
							});
						} catch (cause) {
							if (cause instanceof AnalysisResourceConstraintError) {
								if (requestSent) rejectRequest(cause.reason, undefined, cause);
								else finish(() => reject(cause));
								return;
							}
							rejectRequest("Cutter bridge peer authentication or response failed");
						}
					});
					connection.once("error", (cause) => rejectRequest(`Cutter bridge is unavailable: ${cause.message}`));
					connection.once("close", () => {
						rejectRequest("Cutter bridge closed before returning a complete response");
						completion?.();
					});
				});
			}
		};
		resolveBridgeDirectory = (configured, platform, localAppData, homeDirectory) => {
			if (configured !== undefined && configured !== "") {
				if (configured === "~") return homeDirectory;
				if (configured.startsWith("~/")) return platform === "win32" ? join(homeDirectory, configured.slice(2)) : appendCallerPath(homeDirectory, configured.slice(2), platform);
				if (platform === "win32" && configured.startsWith("~\\")) return join(homeDirectory, configured.slice(2));
				return configured;
			}
			return platform === "win32" && localAppData ? join(localAppData, "REA", "CutterBridge") : platform === "win32" ? join(homeDirectory, ".cache", "rea", "cutter-bridge") : appendCallerPath(homeDirectory, ".cache/rea/cutter-bridge", platform);
		};
		CutterDiscoveryFailure = class extends Error {
			failures;
			constructor(failures) {
				super("Cutter discovery workers failed");
				this.failures = failures;
			}
		};
		discoveryFailure = (cause, operation) => {
			if (cause instanceof CutterDiscoveryFailure) {
				const failures = cause.failures.map((failure) => {
					const parsed = discoveryFailure(failure, operation);
					return parsed instanceof AnalysisError ? parsed : new ProviderAdapterError("cutter", operation, { cause: parsed });
				});
				const cleanup = failures.filter((failure) => failure.cleanupIncomplete);
				if (cleanup.length === 0) return failures[0];
				return providerCleanupErrorFromFailures("cutter", cleanup, "Cutter descriptor discovery failed with unconfirmed closes", {
					operation,
					causes: failures,
					message: cause.message
				});
			}
			if (!(cause instanceof ArtifactReaderFailure)) return cause;
			if (cause.cleanup !== undefined) {
				const cleanup = new ProviderCleanupError("cutter", cause.cleanup.resources, { reason: cause.cleanup.reason }, {
					operation,
					cause
				});
				bindArtifactFileCleanup(cause, cleanup);
				const outcome = cause instanceof ArtifactFileCleanupFailure ? cause.fileCleanupFailure.outcome : undefined;
				const cancellation = artifactFileCompletion(cause)?.cancellation;
				const primary = outcome?.kind === "failed" ? discoveryFailure(outcome.cause, operation) : cancellation !== undefined ? cancelledBy(operation, carriedReason(cancellation.reason)) : undefined;
				if (primary === undefined && outcome?.kind !== "failed") return cleanup;
				const original = primary instanceof AnalysisError ? primary : new ProviderAdapterError("cutter", operation, { cause: primary });
				return analysisErrorWithCleanupDependencies(original, cleanup, operation);
			}
			if (cause.reason === "cancelled") return cancelledBy(operation, carriedReason(artifactFileCancellationCause(cause)));
			return cause;
		};
	})))();
}

//#endregion
//#region dist/cutter/CutterProviderIdentity.js
var CUTTER_PROVIDER_IDENTITY;
function init_CutterProviderIdentity() {
	return (init_CutterProviderIdentity = __esmMin((() => {
		CUTTER_PROVIDER_IDENTITY = {
			id: "cutter.python-plugin",
			name: "Cutter Python plugin",
			version: null
		};
	})))();
}

//#endregion
//#region dist/cutter/CutterBridgeService.js
var CutterBridgeService;
function init_CutterBridgeService() {
	return (init_CutterBridgeService = __esmMin((() => {
		init_targetIdentity();
		init_analysisErrorCleanup();
		init_analysisCleanupRelease();
		init_providerCleanupError();
		init_jsonValue();
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_evidence();
		init_result();
		init_cutterToolContracts();
		init_CutterBridgeClient();
		init_CutterProviderIdentity();
		init_errorMessage();
		CutterBridgeService = class {
			client;
			#cleanupAttempt;
			#pendingCleanup = new Map();
			constructor(client = new CutterBridgeClient()) {
				this.client = client;
			}
			/** Release timed-out work only after producer-owned terminal proof. */
			retryCleanup() {
				if (this.#cleanupAttempt !== undefined) return this.#cleanupAttempt;
				const attempt = this.#retryPendingCleanup().finally(() => {
					if (this.#cleanupAttempt === attempt) this.#cleanupAttempt = undefined;
				});
				this.#cleanupAttempt = attempt;
				return attempt;
			}
			async #retryPendingCleanup() {
				for (const [requestId, pending] of this.#pendingCleanup) {
					const confirmCommandCompletion = this.client.confirmCommandCompletion;
					if (confirmCommandCompletion === undefined) return err(pending.failure);
					const receipt = await confirmCommandCompletion.call(this.client, pending.sessionId, requestId, pending.completionToken);
					if (!receipt.ok) return err(analysisErrorWithCleanupDependencies(pending.failure, receipt.error, "cutter_command"));
					if (!receipt.value) return err(pending.failure);
					pending.release.confirm();
					this.#pendingCleanup.delete(requestId);
				}
				return ok(null);
			}
			async listSessions(options = {}) {
				const { signal } = options;
				if (signal?.aborted) return err(cancelledBy("list_cutter_sessions", signal));
				try {
					const discovery = await this.client.listSessions(options);
					if (signal?.aborted) return err(cancelledBy("list_cutter_sessions", signal));
					return ok(discovery);
				} catch (cause) {
					if (cause instanceof AnalysisError) return err(cause);
					return err(new AnalysisCapabilityUnavailableError("cutter", "list_cutter_sessions", cause instanceof Error ? cause.message : "Cutter discovery failed", { cause }));
				}
			}
			async close() {
				const pending = await this.retryCleanup();
				try {
					if (pending.ok) await this.client.close?.();
					else await this.client.retryDescriptorCleanup?.();
				} catch (cause) {
					const failure = cause instanceof AnalysisError ? cause : new ProviderCleanupError("cutter", [], { reason: errorMessage(cause) }, { cause });
					throw pending.ok ? failure : analysisErrorWithCleanupDependencies(pending.error, failure, "close_cutter");
				}
				if (!pending.ok) throw pending.error;
			}
			async execute(rawInput, options = {}) {
				const parsed = cutterCommandInputSchema.safeParse(rawInput);
				if (!parsed.success) return err(new AnalysisInputError("cutter_command"));
				if (options.signal?.aborted) return err(cancelledBy("cutter_command", options.signal));
				const input = parsed.data;
				const cleanup = await this.retryCleanup();
				if (!cleanup.ok) return cleanup;
				try {
					const output = await this.client.execute({
						sessionId: input.session_id,
						expectedGeneration: input.expected_generation,
						command: input.command,
						json: input.json,
						...options.signal === undefined ? {} : { signal: options.signal }
					});
					const normalizedOutput = jsonValueSchema.parse(output.output);
					const evidence = createEvidence(unknownTarget("not-observed"), {
						...CUTTER_PROVIDER_IDENTITY,
						version: output.cutterVersion
					}, {
						predicateType: "rea.cutter.command-observation",
						operation: "cutter_command",
						parameters: {
							session_id: input.session_id,
							expected_generation: input.expected_generation,
							command: input.command,
							json: input.json
						},
						result: {
							command: input.command,
							output: normalizedOutput,
							execution_state: output.executionState,
							error: output.error,
							message: output.message,
							output_truncated: output.outputTruncated,
							cutter_version: output.cutterVersion,
							current_file: output.currentFile,
							document_generation: output.documentGeneration,
							identity_status: output.identityStatus
						},
						rawResult: normalizedOutput,
						authority: "external-service",
						limitations: [
							"Cutter exposes no verified stable identity for the active unsaved document or tab.",
							"Document identity is partial: the bridge uses a plugin instance UUID and observed generation; a same-path tab switch or reload may not be distinguishable.",
							"Cutter command effects depend on the Rizin command and active plugins.",
							"The local IPC protocol is implemented by REA and is not an upstream Cutter API.",
							...input.json ? ["JSON integer literals outside JavaScript's safe integer range are retained as decimal strings."] : [],
							...output.executionState === "unknown" ? ["Command completion or its output could not be confirmed; do not retry automatically because the command may have produced partial or persistent effects."] : [],
							...output.outputTruncated === true ? ["The command completed or may have completed, but output exceeded the bridge transport limit and was omitted."] : output.outputTruncated === null ? ["The bridge did not declare whether output was omitted, so the output may be incomplete."] : [],
							...output.documentGeneration === null ? ["The bridge did not report the document generation after this command; list Cutter sessions again before selecting an expected_generation."] : []
						]
					});
					if (output.executionState === "unknown") {
						const failure = new AnalysisOutputError("cutter_command", "Cutter command completion is unknown; the bound binary remains unavailable until the UI dispatcher confirms this request reached a terminal state.", {
							cleanup: {
								reason: "The exact UI dispatcher completion receipt has not arrived; the dispatched command may still be running.",
								resources: [`cutter-session:${input.session_id}`]
							},
							partialObservation: evidence,
							...output.outputLimit === undefined ? {} : { limit: output.outputLimit }
						});
						const release = new AnalysisCleanupRelease();
						this.#pendingCleanup.set(output.requestId, {
							sessionId: input.session_id,
							...output.completionToken === undefined ? {} : { completionToken: output.completionToken },
							failure: release.bind(failure),
							release
						});
						return err(failure);
					}
					if (options.signal?.aborted) return err(cancelledBy("cutter_command", options.signal, { partialObservation: evidence }));
					return ok(evidence);
				} catch (cause) {
					if (cause instanceof AnalysisError) return err(cause);
					return err(new AnalysisCapabilityUnavailableError("cutter", "cutter_command", cause instanceof Error ? cause.message : "Unknown Cutter bridge failure", { cause }));
				}
			}
		};
	})))();
}

//#endregion
//#region dist/composition/cutter.js
var createCutterBridgeService;
function init_cutter() {
	return (init_cutter = __esmMin((() => {
		init_CutterBridgeClient();
		init_CutterBridgeService();
		createCutterBridgeService = (environment = process.env, options = {}) => new CutterBridgeService(new CutterBridgeClient(environment, options));
	})))();
}

//#endregion
//#region dist/cli/cutterCommands.js
var cutterCommands_exports = /* @__PURE__ */ __exportAll({ registerCutterCommands: () => registerCutterCommands });
var registerCutterCommands;
function init_cutterCommands() {
	return (init_cutterCommands = __esmMin((() => {
		init_cutter();
		init_cutterToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_finishAnalysisCommand();
		init_projectCliAnalysisResult();
		registerCutterCommands = (cli, logger, environment) => {
			const createCutter = () => createCutterBridgeService(environment);
			registerContractCommand(cli, logger, contractNamed(CUTTER_TOOL_CONTRACTS, "list_cutter_sessions"), { description: "List live Cutter instances connected through the REA Python plugin bridge" }, (_input, { operation, signal }) => {
				const cutter = createCutter();
				return finishAnalysisCommand(() => cutter.listSessions({ signal }), cutter, "cutter", operation, signal).then(projectCliAnalysisResult);
			});
			registerContractCommand(cli, logger, contractNamed(CUTTER_TOOL_CONTRACTS, "cutter_command"), {
				description: "Execute one Rizin command in a selected live Cutter instance",
				positionals: [
					"session_id",
					"expected_generation",
					"command"
				],
				fields: {
					session_id: { description: "Session ID copied from list-cutter-sessions." },
					expected_generation: { description: "Session generation returned by list-cutter-sessions." },
					command: { description: "One unrestricted Rizin command to run in Cutter." },
					json: {
						name: "jsonOutput",
						description: "Return command-specific JSON output when available (independent of CLI output formatting)."
					}
				}
			}, analyzeWithService(() => {
				const cutter = createCutter();
				return {
					inspect: (input, options) => cutter.execute(input, options),
					close: () => cutter.close()
				};
			}, "cutter"));
		};
	})))();
}

//#endregion
export { cutterCommands_exports, init_cutterCommands };