import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, TRANSPORT_CREDENTIAL_HEADERS, explicitUtf8Spellings, explicitValuesOccurIn, init_explicitSensitiveValues, init_isRecord, init_parseFailure, isRecord, isTransportCredentialHeader } from "./jsonSerialization-DAF9DVXC.js";
import { escapeJsonPointerToken, init_jsonPointer } from "./jsonPointer-aolC6MvJ.js";
import { init_recordedTransportUrl, parseRecordedTransportUrl } from "./browserObservation-BVcDYwHI.js";
import { init_webNetworkCapture, selectedWebNetworkCaptureBudgets } from "./webNetworkCapture-DzOKad85.js";
import { AsyncLocalStorage } from "node:async_hooks";
import { isSafeNumber } from "lossless-json";

//#region dist/browser/history/CaptureBudgets.js
var accepted, defaults, withCaptureBudgets, captureBudgets;
function init_CaptureBudgets() {
	return (init_CaptureBudgets = __esmMin((() => {
		init_webNetworkCapture();
		accepted = new AsyncLocalStorage();
		defaults = Object.freeze(selectedWebNetworkCaptureBudgets({}));
		withCaptureBudgets = (budgets, run) => accepted.run(Object.freeze({ ...budgets }), run);
		captureBudgets = () => accepted.getStore() ?? defaults;
	})))();
}

//#endregion
//#region dist/browser/history/CaptureFormatError.js
var CAPTURE_FORMAT, CAPTURE_LIMITS, CAPTURE_REPLY_LIMITS, captureLimitForReply, CaptureFormatError;
function init_CaptureFormatError() {
	return (init_CaptureFormatError = __esmMin((() => {
		init_parseFailure();
		CAPTURE_FORMAT = "web-network-capture";
		CAPTURE_LIMITS = {
			"nesting-depth": {
				parameter: "max_nesting_depth",
				unit: "nesting levels",
				reply: "input-limit",
				expected: "maximum_capture_nesting"
			},
			"parser-nodes": {
				parameter: null,
				unit: "parser nodes",
				reply: null,
				expected: "maximum_parser_nodes"
			},
			"expanded-input": {
				parameter: "max_input_bytes",
				unit: "bytes",
				reply: "expanded-limit",
				expected: "maximum_expanded_capture_bytes"
			},
			"protobuf-body": {
				parameter: "max_input_bytes",
				unit: "bytes",
				reply: null,
				expected: "maximum_protobuf_body_bytes"
			},
			"protobuf-decoding": {
				parameter: "max_reply_bytes",
				unit: "bytes",
				reply: null,
				expected: "maximum_encoded_capture_bytes"
			}
		};
		CAPTURE_REPLY_LIMITS = Object.keys(CAPTURE_LIMITS).filter((name) => CAPTURE_LIMITS[name].reply !== null);
		captureLimitForReply = (reason) => CAPTURE_REPLY_LIMITS.find((name) => CAPTURE_LIMITS[name].reply === reason);
		CaptureFormatError = class extends ParseFailureError {
			constructor(kind, message, pointer = "", cause) {
				const field = pointer === "" ? {} : { field: pointer };
				super(kind === "malformed" ? {
					kind,
					format: CAPTURE_FORMAT,
					detail: message,
					...field
				} : kind === "unsupported" ? {
					kind,
					format: CAPTURE_FORMAT,
					detail: message,
					undecodedContent: false,
					...field
				} : {
					kind: "limit",
					format: CAPTURE_FORMAT,
					detail: message,
					limit: "fixedAllowance" in kind ? {
						name: kind.fixedAllowance.name,
						maximum: kind.fixedAllowance.limit
					} : {
						name: kind.name,
						maximum: kind.maximum
					},
					...field
				}, cause === undefined ? undefined : { cause });
				this.name = "CaptureFormatError";
				this.ceiling = typeof kind === "object" && "fixedAllowance" in kind ? kind : undefined;
			}
			/** The reader-named fixed ceiling, for a limit that is not a capture budget. */
			ceiling;
			/** JSON pointer of the failing capture value; empty for the whole input. */
			get pointer() {
				return this.failure.field ?? "";
			}
			/** The exhausted capture budget, for a `limit` failure that is not a fixed ceiling. */
			get limit() {
				return this.failure.kind === "limit" && this.ceiling === undefined ? {
					name: this.failure.limit.name,
					maximum: this.failure.limit.maximum
				} : undefined;
			}
			/** The reason a decoder child reports for this failure on the reply wire. */
			get replyReason() {
				if (this.ceiling !== undefined) return "fixed-limit";
				const { limit } = this;
				if (limit === undefined) return this.failure.kind === "unsupported" ? "unsupported" : "format";
				return CAPTURE_LIMITS[limit.name].reply ?? "decoder";
			}
		};
	})))();
}

//#endregion
//#region dist/browser/history/CaptureRedaction.js
var isCaptureCredentialHeaderBytes, CaptureRedaction, capturePointer, captureObject;
function init_CaptureRedaction() {
	return (init_CaptureRedaction = __esmMin((() => {
		init_jsonPointer();
		init_recordedTransportUrl();
		init_explicitSensitiveValues();
		isCaptureCredentialHeaderBytes = (bytes, start, end) => {
			for (const name of TRANSPORT_CREDENTIAL_HEADERS) {
				if (end - start !== name.length) continue;
				let matches = true;
				for (let index = 0; index < name.length; index++) {
					const byte = bytes[start + index];
					const lower = byte >= 65 && byte <= 90 ? byte + 32 : byte;
					if (lower !== name.charCodeAt(index)) {
						matches = false;
						break;
					}
				}
				if (matches) return true;
			}
			return false;
		};
		CaptureRedaction = class {
			sensitiveValues;
			redactions = [];
			#sensitiveByteValues;
			#requestUrl;
			constructor(sensitiveValues, source) {
				this.sensitiveValues = sensitiveValues;
				const request = captureObject(source) && captureObject(source.request) ? source.request : undefined;
				this.#requestUrl = typeof request?.url === "string" ? request.url : undefined;
				this.#sensitiveByteValues = explicitUtf8Spellings(sensitiveValues);
			}
			/** Preserve exact text unless explicitly sensitive or known transport URL userinfo. */
			text(value, pointer, transportUrl) {
				let result = value;
				if (transportUrl !== undefined) {
					const { credentials } = parseRecordedTransportUrl(value, transportUrl);
					if (credentials === "ambiguous") return this.credential(pointer);
					if (credentials !== null) {
						result = `${value.slice(0, credentials.start)}${value.slice(credentials.end)}`;
						this.redactions.push({
							pointer,
							reason: "transport-credential"
						});
					}
				}
				if (explicitValuesOccurIn(value, this.sensitiveValues) || explicitValuesOccurIn(result, this.sensitiveValues)) {
					this.redactions.push({
						pointer,
						reason: "explicit-sensitive-value"
					});
					return null;
				}
				return result;
			}
			/** Remove a credential field's value without retaining its digest or encoded form. */
			credential(pointer) {
				this.redactions.push({
					pointer,
					reason: "transport-credential"
				});
				return null;
			}
			/** Check both retained spellings before projecting a producer JSON number. */
			number(value, pointer, redact = true) {
				const reported = isSafeNumber(value.value) ? Number(value.value) : null;
				if (redact && (this.text(value.value, pointer) === null || reported !== null && this.text(String(reported), pointer) === null)) return null;
				return {
					reported,
					literal: value.value
				};
			}
			/** Known HAR credential surfaces; unknown extensions are ordinary caller-selected evidence. */
			harCredential(pointer, parent) {
				return /^\/(request|response)\/headers\/\d+\/value$/.test(pointer) && typeof parent.name === "string" && isTransportCredentialHeader(parent.name) || /^\/(request|response)\/cookies\/\d+\/value$/.test(pointer);
			}
			/** Only actual request/redirect fields and known transport header URLs declare URL semantics. */
			harTransportUrl(pointer, parent) {
				const header = /^\/(request|response)\/headers\/\d+\/value$/.test(pointer) ? typeof parent?.name === "string" ? parent.name.toLowerCase() : undefined : undefined;
				if (pointer === "/response/redirectURL" || header === "location") return this.#requestUrl === undefined ? {} : { credentialBaseUrl: this.#requestUrl };
				return pointer === "/request/url" || header === "referer" || header === "origin" ? {} : undefined;
			}
			/** Preserve bytes unless an explicitly declared UTF-8 literal occurs in them. */
			sensitiveBytes(bytes) {
				return this.#sensitiveByteValues.some((value) => bytes.includes(value));
			}
		};
		capturePointer = (parent, key) => `${parent}/${escapeJsonPointerToken(key)}`;
		captureObject = isRecord;
	})))();
}

//#endregion
//#region dist/browser/history/CaptureProviderIdentities.js
var HAR_CAPTURE_PROVIDER_IDENTITY, SAZ_CAPTURE_PROVIDER_IDENTITY, MITMPROXY_CAPTURE_PROVIDER_IDENTITY, QLOG_CAPTURE_PROVIDER_IDENTITY;
function init_CaptureProviderIdentities() {
	return (init_CaptureProviderIdentities = __esmMin((() => {
		HAR_CAPTURE_PROVIDER_IDENTITY = {
			id: "har-schema/lossless-json",
			name: "REA HAR capture adapter",
			version: "har-schema@2.0.0;har-schema-corrections@1;jsonc-parser@3.3.1;lossless-json@4.3.1"
		};
		SAZ_CAPTURE_PROVIDER_IDENTITY = {
			id: "fiddler-saz",
			name: "REA Fiddler SAZ capture adapter",
			version: "1;zip.js@2.15.0;xmldom@0.9.12"
		};
		MITMPROXY_CAPTURE_PROVIDER_IDENTITY = {
			id: "mitmproxy-native-tnetstring",
			name: "REA offline native mitmproxy adapter",
			version: "12.2.3"
		};
		QLOG_CAPTURE_PROVIDER_IDENTITY = {
			id: "aioquic-qlog-json",
			name: "REA aioquic qlog capture adapter",
			version: "aioquic-profile@1.5.0;qlog@0.3;jsonc-parser@3.3.1;lossless-json@4.3.1"
		};
	})))();
}

//#endregion
export { CAPTURE_FORMAT, CAPTURE_LIMITS, CaptureFormatError, CaptureRedaction, HAR_CAPTURE_PROVIDER_IDENTITY, MITMPROXY_CAPTURE_PROVIDER_IDENTITY, QLOG_CAPTURE_PROVIDER_IDENTITY, SAZ_CAPTURE_PROVIDER_IDENTITY, captureBudgets, captureLimitForReply, captureObject, capturePointer, init_CaptureBudgets, init_CaptureFormatError, init_CaptureProviderIdentities, init_CaptureRedaction, isCaptureCredentialHeaderBytes, withCaptureBudgets };