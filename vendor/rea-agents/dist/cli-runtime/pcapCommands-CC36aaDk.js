import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisArtifactChangedError, AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisProtocolError, AnalysisResourceConstraintError, AnalysisUnsupportedTargetError, cancelledBy, carriedReason, errorMessage, fixedAllowanceOptions, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_fixedAllowanceRemediation, init_isRecord, init_jsonValue, isRecord, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, compareUnicodeCodePoints, init_binaryContainer, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisOperationInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { AnalysisCleanupLease, ArtifactReaderFailure, OwnedFileHandle, RegularFileAdmissionFailure, artifactFileCancellationCause, assertRegularFileActive, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_OwnedFileHandle, init_OwnedRegularFile, init_RegularFile, init_readStableArtifact, init_resources, openRegularFile, readStableArtifact, regularFileCancellation, sameRegularFileState } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, analysisErrorWithCleanupFailure, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { RuntimeControlUnavailableError, init_runtimeControlUnavailableError, runtimeControlCapabilityError } from "./WindowsNativeLoader-CCqowxwW.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { BOUNDED_PRODUCER_LIMITS, init_producerResourceLimits } from "./urlComponents-DJm-wtqY.js";
import { describeLaunchFailure, init_launchFailure } from "./ExecFileOutput-YDVPmL3I.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { analyzeWithService, contractNamed, init_contractCliDescription, init_contractCommand, inspectWithService, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_recordedTransportUrl, parseRecordedTransportUrl } from "./browserObservation-BVcDYwHI.js";
import { PCAP_CAPTURE_HOST_REMEDIATION, PCAP_CAPTURE_UNSUPPORTED_HOST_REASON, init_pcapAnalysis, pcapCaptureHostSupported, pcapRequestSchema, pcapResultSchemas } from "./analysisViewResult-vDCF9Pxo.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { OwnedCommandFailure, init_OwnedCommand, ownedCommandResources, prepareOwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { UnclassifiedProviderFailure, classifyProviderOutcome, init_classifyProviderOutcome, init_unclassifiedProviderFailure } from "./classifyProviderOutcome-BMRoGrMs.js";
import { init_ProviderOutcome, providerOutcomeOf } from "./ProviderOutcome-iJMiaLYK.js";
import { classifyProviderFailure, init_classifyProviderFailure } from "./classifyProviderFailure-BA0K6bTF.js";
import { byteToHex, init_byteToHex } from "./byteToHex-N4MIskWf.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { assertArtifactCommandPath, init_ArtifactCommandPath, selectArtifactCommandPath } from "./ArtifactCommandPath-B5Zuhaxu.js";
import { init_LinuxResourceLimits, prlimitCeilingArguments, readLinuxResourceLimits } from "./LinuxResourceLimits-vLyr_vuV.js";
import { PCAP_TOOL_REMEDIATION, PcapConfigurationFailure, assertWiresharkExecutableIdentity, init_PcapConfiguration, init_tsharkJsonPackets, inspectPcapClient, pcapConfigurationAvailability, pcapToolUnavailable, readTsharkJsonPackets, resolvePcapTools, wiresharkExecutableIdentity } from "./PcapConfiguration-C68Uls6W.js";
import { createArtifactAnalysisResources, init_ArtifactAnalysisResources, init_artifactResourceFailure } from "./artifactResourceFailure-B1kDUAIH.js";
import { init_privateWorkspaceFailure, privateWorkspaceFailure } from "./privateWorkspaceFailure-CaX68g9s.js";
import { init_jsonStringSourceSpans, jsonStringSourceSpans } from "./jsonStringSourceSpans-CeCnVp41.js";
import { WindowsBatchCommandError, init_WindowsBatchCommand, isWindowsBatchFile, windowsBatchCommand } from "./WindowsBatchCommand-UPai11E3.js";
import { PCAP_TOOL_CONTRACTS, init_pcapToolContracts } from "./pcapToolContracts-eul0Sq_H.js";
import { constants } from "node:fs";
import { basename, isAbsolute, join } from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { access, chmod, mkdir, open, stat } from "node:fs/promises";
import { setImmediate } from "node:timers/promises";
import { visit } from "jsonc-parser";
import { isIPv4, isIPv6 } from "node:net";

//#region dist/domain/pcap/pcapEvidence.js
var createPcapEvidence;
function init_pcapEvidence() {
	return (init_pcapEvidence = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		createPcapEvidence = (request, observation) => createEvidence(observation.subject ?? unknownTarget("not-observed"), observation.provider, {
			operation: request.operation,
			parameters: request.input,
			result: observation.result,
			rawResult: observation.rawResult,
			limitations: observation.limitations,
			locations: observation.locations,
			confidence: request.operation === "inspect_pcap_capture" ? "derived" : "observed",
			...request.operation === "inspect_pcap_capture" ? { authority: "historical-reference" } : {}
		});
	})))();
}

//#endregion
//#region dist/application/pcap/PcapAnalysisService.js
var PcapAnalysisService;
function init_PcapAnalysisService() {
	return (init_PcapAnalysisService = __esmMin((() => {
		init_inputIssueProjection();
		init_pcapAnalysis();
		init_analysisErrorCore();
		init_pcapEvidence();
		init_result();
		init_ProviderOperationExecution();
		PcapAnalysisService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			/** Run one caller-selected pcap request and retain capture identity inline. */
			async execute(operation, input, options) {
				if (options?.signal?.aborted === true) return err(cancelledBy(operation, options.signal));
				const request = pcapRequestSchema.safeParse({
					operation,
					input
				});
				if (!request.success) return err(analysisOperationInputErrorFromIssues(operation, request.error.issues, input, request.error));
				const executed = await this.provider.execute(request.data, options);
				if (!executed.ok) return executed;
				return completeProviderEvidence(createPcapEvidence(request.data, executed.value), options?.signal);
			}
		};
	})))();
}

//#endregion
//#region dist/pcap/PcapProviderIdentity.js
var PCAP_PROVIDER_IDENTITY;
function init_PcapProviderIdentity() {
	return (init_PcapProviderIdentity = __esmMin((() => {
		PCAP_PROVIDER_IDENTITY = {
			id: "pcap",
			name: "Packet capture analysis",
			version: null
		};
	})))();
}

//#endregion
//#region dist/pcap/PcapHttpUri.js
var PCAP_HTTP_URI_FIELDS, parsePcapHttpUri;
function init_PcapHttpUri() {
	return (init_PcapHttpUri = __esmMin((() => {
		init_recordedTransportUrl();
		PCAP_HTTP_URI_FIELDS = {
			"http.request.full_uri": "full-uri",
			"http.request.uri": "request-target",
			"http2.request.full_uri": "full-uri"
		};
		parsePcapHttpUri = (value, role) => role === "request-target" && value.startsWith("/") ? {
			origin: null,
			path: null,
			credentials: null
		} : parseRecordedTransportUrl(value);
	})))();
}

//#endregion
//#region dist/pcap/PcapDnsWire.js
var invalidWire, fields, decodeName, canonicalAddress, decodeMessage, addressInventory, decodeRecords, eligibleQuestion, attributeAddresses, parseDnsMessageRaw;
function init_PcapDnsWire() {
	return (init_PcapDnsWire = __esmMin((() => {
		init_binaryContainer();
		init_result();
		init_byteToHex();
		invalidWire = (reason) => err({
			kind: "invalid_dns_wire",
			reason
		});
		fields = (source) => {
			const result = new Map();
			const pending = [source];
			while (pending.length > 0) {
				const value = pending.pop();
				if (Array.isArray(value)) {
					for (let index = value.length - 1; index >= 0; index -= 1) pending.push(value[index]);
				} else if (isRecord(value)) {
					const entries = Object.entries(value);
					for (const [key, field] of entries) {
						if (![
							"dns.qry.name",
							"dns.a",
							"dns.aaaa",
							"dns.id_raw"
						].includes(key)) continue;
						const values = result.get(key) ?? [];
						if (key === "dns.id_raw") values.push(field);
						else if (Array.isArray(field)) values.push(...field);
						else values.push(field);
						result.set(key, values);
					}
					for (let index = entries.length - 1; index >= 0; index -= 1) {
						const [key, child] = entries[index];
						if (!key.endsWith("_raw")) pending.push(child);
					}
				}
			}
			return result;
		};
		decodeName = (message, start, boundary = message.length) => {
			const labels = [];
			const folded = [];
			const visited = new Set();
			let at = start, end = null, expanded = 1;
			for (;;) {
				if (at >= message.length || visited.has(at)) return invalidWire("DNS name is truncated or cyclic");
				visited.add(at);
				const length = message[at];
				if ((length & 192) === 192) {
					if (at + 2 > (end === null ? boundary : message.length)) return invalidWire("DNS name encoding or compression pointer is invalid");
					const pointer = (length & 63) << 8 | message[at + 1];
					if (pointer >= at) return invalidWire("DNS name encoding or compression pointer is invalid");
					end ??= at + 2;
					at = pointer;
				} else {
					if ((length & 192) !== 0) return invalidWire("DNS name encoding or compression pointer is invalid");
					if (at + 1 + length > (end === null ? boundary : message.length)) return invalidWire("DNS name encoding or compression pointer is invalid");
					at += 1;
					if (length === 0) return ok({
						labels,
						key: folded.join("."),
						end: end ?? at
					});
					expanded += length + 1;
					if (expanded > 255) return invalidWire("DNS name encoding or compression pointer is invalid");
					const label = message.subarray(at, at + length);
					labels.push(label.toString("hex"));
					folded.push([...label].map((byte) => byteToHex(byte >= 65 && byte <= 90 ? byte + 32 : byte)).join(""));
					at += length;
				}
			}
		};
		canonicalAddress = (value, type) => {
			if (type === 1) return isIPv4(value) ? value : null;
			return isIPv6(value) && !value.includes("%") ? new URL(`http://[${value}]/`).hostname : null;
		};
		decodeMessage = (raw, ids) => {
			if (!Array.isArray(raw) || raw.length !== 5 || typeof raw[0] !== "string" || !/^(?:[0-9a-f]{2})*$/iu.test(raw[0]) || !Number.isSafeInteger(raw[1]) || !Number.isSafeInteger(raw[2]) || raw[2] !== raw[0].length / 2 || ids.length !== 1 || !Array.isArray(ids[0]) || !Number.isSafeInteger(ids[0][1])) return invalidWire("DNS raw bytes, message framing or header coordinates are unavailable or invalid");
			const header = ids[0][1] - raw[1];
			if (header !== 0 && header !== 2) return invalidWire("DNS raw bytes, message framing or header coordinates are unavailable or invalid");
			const bytes = Buffer.from(raw[0], "hex");
			if (bytes.length < header + 12) return invalidWire("DNS raw bytes, message framing or header coordinates are unavailable or invalid");
			const wire = new BinaryReader(bytes, false, "dns");
			if (header === 2 && wire.u16(0) !== bytes.length - 2) return invalidWire("DNS raw bytes, message framing or header coordinates are unavailable or invalid");
			const reader = header === 0 ? wire : new BinaryReader(bytes.subarray(header), false, "dns");
			return ok({
				reader,
				flags: reader.u16(2)
			});
		};
		addressInventory = (observed) => {
			const addressesByIdentity = new Map();
			for (const entry of observed) {
				if (entry.canonical === null) continue;
				const key = `${entry.type}:${entry.canonical}`;
				const queue = addressesByIdentity.get(key) ?? {
					next: 0,
					entries: []
				};
				queue.entries.push(entry);
				addressesByIdentity.set(key, queue);
			}
			return addressesByIdentity;
		};
		decodeRecords = (reader, start, classValue, observed) => {
			const message = reader.bytes;
			const counts = [
				reader.u16(6),
				reader.u16(8),
				reader.u16(10)
			];
			let at = start;
			const addressesByIdentity = addressInventory(observed);
			const records = [];
			let extendedRcode = 0;
			let optRecords = 0;
			for (let section = 0; section < counts.length; section += 1) {
				for (let index = 0; index < counts[section]; index += 1) {
					const ownerResult = decodeName(message, at);
					if (!ownerResult.ok) return ownerResult;
					const owner = ownerResult.value;
					if (owner.end + 10 > message.length) return invalidWire("DNS record header is truncated");
					const type = reader.u16(owner.end);
					const dnsClass = classValue(reader.u16(owner.end + 2));
					const size = reader.u16(owner.end + 8);
					at = owner.end + 10;
					const end = at + size;
					if (end > message.length) return invalidWire("DNS record data is truncated");
					if (section === 2 && type === 41) {
						optRecords += 1;
						if (optRecords > 1) return invalidWire("DNS message carries more than one OPT record");
						extendedRcode = reader.u32(owner.end + 4) >>> 24;
					}
					let target = null;
					let address = null;
					if (type === 5 && dnsClass === 1) {
						const decoded = decodeName(message, at, end);
						if (!decoded.ok) return decoded;
						if (decoded.value.end !== end) return invalidWire("CNAME data length disagrees with its name");
						target = decoded.value.key;
					} else if ((type === 1 || type === 28) && dnsClass === 1) {
						if (size !== (type === 1 ? 4 : 16)) return invalidWire("Internet address record has an invalid data length");
						const wireAddress = type === 1 ? [...message.subarray(at, end)].join(".") : Array.from({ length: 8 }, (_, index) => reader.u16(at + index * 2).toString(16)).join(":");
						const canonical = canonicalAddress(wireAddress, type);
						const queue = addressesByIdentity.get(`${type}:${canonical}`);
						const observation = queue?.entries[queue.next++];
						if (observation === undefined) return invalidWire("Wire address has no equivalent producer address observation");
						observation.used = true;
						address = observation.value;
					}
					records.push({
						owner: owner.key,
						type,
						dnsClass,
						answer: section === 0,
						target,
						address
					});
					at = end;
				}
			}
			if (at !== message.length) return invalidWire("DNS message contains unexamined trailing bytes");
			return ok({
				records,
				extendedRcode
			});
		};
		eligibleQuestion = (decodedQuestions, flags, rcode = flags & 15) => {
			const question = decodedQuestions[0];
			if ((flags & 32768) === 0) return {
				question: null,
				reason: "DNS response flag (QR) is not set"
			};
			if (rcode !== 0) return {
				question: null,
				reason: `DNS response RCODE is nonzero (${rcode}); error response such as NXDOMAIN`
			};
			if ((flags & 30720) !== 0) return {
				question: null,
				reason: `DNS OPCODE is not QUERY (${(flags & 30720) >> 11})`
			};
			if (decodedQuestions.length !== 1 || question === undefined) return {
				question: null,
				reason: "Question count does not establish Internet address ownership"
			};
			if (![1, 255].includes(question.dnsClass)) return {
				question: null,
				reason: "Question class does not establish Internet address ownership"
			};
			if (![
				1,
				28,
				255
			].includes(question.type)) return {
				question: null,
				reason: "Question type does not establish Internet address ownership"
			};
			return {
				question,
				reason: null
			};
		};
		attributeAddresses = (questions, eligibility, records, observed) => {
			const unknown = (reason) => ({
				questions,
				assigned: [],
				unattributed: observed.map((entry) => entry.value),
				incomplete: true,
				incomplete_reasons: [reason]
			});
			if (observed.length === 0) return {
				questions,
				assigned: [],
				unattributed: [],
				incomplete: false
			};
			const { question } = eligibility;
			if (question === null) return unknown(eligibility.reason ?? "Question count, response flag, type or class does not establish Internet address ownership");
			const links = new Map();
			for (const record of records) {
				if (record.answer && record.type === 5 && record.dnsClass === 1) {
					const targets = links.get(record.owner) ?? new Set();
					targets.add(record.target);
					links.set(record.owner, targets);
				}
			}
			const reachable = new Set([question.name.key]);
			let current = question.name.key;
			while (links.has(current)) {
				const targets = links.get(current);
				if (targets.size !== 1) return unknown("Conflicting CNAME targets do not establish address ownership");
				const next = targets.values().next().value;
				if (reachable.has(next)) return unknown("CNAME cycle does not establish address ownership");
				reachable.add(next);
				current = next;
			}
			const assigned = [];
			const unattributed = observed.filter((entry) => !entry.used).map((entry) => entry.value);
			for (const record of records) {
				if (record.address === null) continue;
				if (record.answer && record.dnsClass === 1 && reachable.has(record.owner) && (question.type === 255 || question.type === record.type) && !links.has(record.owner)) assigned.push([0, record.address]);
				else unattributed.push(record.address);
			}
			return {
				questions,
				assigned,
				unattributed,
				incomplete: unattributed.length > 0,
				incomplete_reasons: unattributed.length > 0 ? ["Some producer addresses lack proven ownership by the question's Internet answer chain"] : []
			};
		};
		parseDnsMessageRaw = (raw, source, family = "dns") => {
			const producer = fields(source);
			const strings = (name) => (producer.get(name) ?? []).filter((value) => typeof value === "string" && value !== "");
			const queries = strings("dns.qry.name");
			const ipv4 = strings("dns.a");
			const ipv6 = strings("dns.aaaa");
			let questions = queries.map((query) => ({
				query,
				labels_hex: null
			}));
			const messageResult = decodeMessage(raw, producer.get("dns.id_raw") ?? []);
			const wireLimitations = messageResult.ok && family !== "mdns" && (messageResult.value.flags & 512) !== 0 ? ["DNS message declares truncation (TC); captured records are incomplete"] : [];
			const unknown = (reason) => ({
				questions,
				assigned: [],
				unattributed: [...ipv4, ...ipv6],
				incomplete: true,
				incomplete_reasons: [reason, ...wireLimitations]
			});
			const classValue = (value) => family === "mdns" ? value & 32767 : value;
			if (!messageResult.ok) return unknown(messageResult.error.reason);
			const { reader, flags } = messageResult.value;
			const message = reader.bytes;
			const qd = reader.u16(4);
			let at = 12;
			const decodedQuestions = [];
			for (let index = 0; index < qd; index += 1) {
				const nameResult = decodeName(message, at);
				if (!nameResult.ok) return unknown(nameResult.error.reason);
				const decoded = nameResult.value;
				if (decoded.end + 4 > message.length) return unknown("DNS question fields are truncated");
				decodedQuestions.push({
					name: decoded,
					type: reader.u16(decoded.end),
					dnsClass: classValue(reader.u16(decoded.end + 2))
				});
				at = decoded.end + 4;
			}
			if (decodedQuestions.length !== queries.length) return unknown("Wire questions do not correspond to producer display observations");
			questions = queries.map((query, index) => ({
				query,
				labels_hex: decodedQuestions[index].name.labels
			}));
			const observed = [...ipv4.map((value) => ({
				value,
				type: 1
			})), ...ipv6.map((value) => ({
				value,
				type: 28
			}))].map((entry) => ({
				...entry,
				canonical: canonicalAddress(entry.value, entry.type),
				used: false
			}));
			const records = decodeRecords(reader, at, classValue, observed);
			if (!records.ok) return unknown(records.error.reason);
			const extendedRcode = records.value.extendedRcode;
			const fullRcode = extendedRcode << 4 | flags & 15;
			const eligibility = eligibleQuestion(decodedQuestions, flags, fullRcode);
			const facts = attributeAddresses(questions, eligibility, records.value.records, observed);
			if (wireLimitations.length === 0) return facts;
			return {
				...facts,
				incomplete: true,
				incomplete_reasons: [...facts.incomplete_reasons ?? [], ...wireLimitations]
			};
		};
	})))();
}

//#endregion
//#region dist/pcap/PcapOutput.js
var OPERATION$1, TSHARK_JSON_MAX_BYTES, MAX_RETAINED_BYTES, MAX_DECODED_BYTES, assertOutputReadActive, protocolFailure, captureInstant, parseCapinfosOutput, decodeTsharkPackets, parseTsharkJsonOutput;
function init_PcapOutput() {
	return (init_PcapOutput = __esmMin((() => {
		init_tsharkJsonPackets();
		init_analysisErrorCore();
		init_PcapHttpUri();
		init_fixedAllowanceRemediation();
		init_PcapDnsWire();
		init_unicodeCodePointOrder();
		OPERATION$1 = "inspect_pcap_capture";
		TSHARK_JSON_MAX_BYTES = 8 * 1024 * 1024;
		MAX_RETAINED_BYTES = 16 * 1024 * 1024;
		MAX_DECODED_BYTES = 128 * 1024 * 1024;
		assertOutputReadActive = (signal) => {
			if (signal?.aborted) throw cancelledBy(OPERATION$1, signal);
		};
		protocolFailure = (reason) => {
			throw new AnalysisProtocolError(`Invalid packet-capture output: ${reason}`);
		};
		captureInstant = (value) => {
			const match = /^(-?)(\d{1,20})(?:\.(\d{1,9}))?$/u.exec(value ?? "");
			if (match?.[2] === undefined) return null;
			const negative = match[1] === "-";
			let seconds = BigInt(match[2]);
			let fraction = match[3] ?? "";
			if (negative) {
				const digits = fraction.length;
				const borrowed = digits > 0 && BigInt(fraction) > 0n;
				seconds = -seconds - (borrowed ? 1n : 0n);
				if (borrowed) fraction = (10n ** BigInt(digits) - BigInt(fraction)).toString().padStart(digits, "0");
			}
			if (seconds < -62167219200n || seconds > 253402300799n) return null;
			const date = new Date(Number(seconds) * 1e3);
			const year = date.getUTCFullYear();
			if (Number.isNaN(year) || year < 0 || year > 9999) return null;
			return `${date.toISOString().slice(0, 19)}${fraction === "" ? "" : `.${fraction}`}Z`;
		};
		parseCapinfosOutput = (stdout) => {
			const lines = new Map();
			for (const line of stdout.split(/\r?\n/u)) {
				const at = line.indexOf(":");
				if (at >= 0 && !/^\s/u.test(line)) {
					const key = line.slice(0, at);
					const value = line.slice(at + 1).trim();
					if (key === "Packet size limit" && !value.startsWith("file hdr:")) continue;
					lines.set(key, value);
				}
			}
			const fileType = lines.get("File type");
			const encapsulation = lines.get("File encapsulation");
			const countText = lines.get("Number of packets");
			if (!fileType || !encapsulation || countText === undefined || !/^\d+$/u.test(countText)) return protocolFailure("capinfos did not provide machine-readable type, encapsulation and packet count");
			const packetCount = Number(countText);
			if (!Number.isSafeInteger(packetCount)) return protocolFailure("packet count is not representable");
			const durationText = lines.get("Capture duration");
			const duration = durationText === undefined ? null : /^(\d+(?:\.\d+)?)(?:\s+seconds?)?$/u.exec(durationText);
			const durationSeconds = duration === null ? null : Number(duration[1]);
			const snapshot = /^file hdr:\s*(\d+) bytes$/u.exec(lines.get("Packet size limit") ?? "");
			const snapshotLength = snapshot === null ? null : Number(snapshot[1]);
			const sha256 = lines.get("SHA256") ?? null;
			if (sha256 !== null && !/^[0-9a-f]{64}$/u.test(sha256)) return protocolFailure("capinfos SHA256 is malformed");
			return {
				fileType,
				encapsulation,
				packetCount,
				captureStart: captureInstant(lines.get("Earliest packet time") ?? lines.get("First packet time")),
				captureEnd: captureInstant(lines.get("Latest packet time") ?? lines.get("Last packet time")),
				captureDurationSeconds: durationSeconds !== null && Number.isFinite(durationSeconds) ? durationSeconds : null,
				snapshotLength: snapshotLength !== null && Number.isSafeInteger(snapshotLength) && snapshotLength > 0 ? snapshotLength : null,
				sha256
			};
		};
		decodeTsharkPackets = async (stdout, budget, signal, acquisition) => {
			const read = await readTsharkJsonPackets(stdout, budget, signal);
			if (read.ok) return read.value;
			const failure = read.error;
			switch (failure.kind) {
				case "cancelled": throw cancelledBy(OPERATION$1, carriedReason(failure.cause));
				case "json-bytes": throw new AnalysisResourceConstraintError(OPERATION$1, "memory", "tshark JSON exceeds the bounded decoding budget", { max_json_bytes: failure.maxBytes }, fixedAllowanceOptions("The tshark JSON decoding allowance", "capture", {
					limit: failure.maxBytes,
					unit: "bytes"
				}));
				case "json-expansion": throw new AnalysisResourceConstraintError(OPERATION$1, "memory", "tshark JSON expansion exceeds the decoding budget", { max_decoded_bytes: failure.maxDecodedBytes }, fixedAllowanceOptions("The tshark JSON expansion allowance", "capture", {
					limit: failure.maxDecodedBytes,
					unit: "bytes"
				}));
				case "malformed-json": throw new AnalysisProtocolError("tshark emitted malformed JSON", { cause: failure.cause });
				case "malformed-packet": return protocolFailure(`${acquisition}${failure.reason}`);
			}
		};
		parseTsharkJsonOutput = async (stdout, signal, dnsStdout) => {
			const budget = {
				maxBytes: TSHARK_JSON_MAX_BYTES,
				maxDecodedBytes: MAX_DECODED_BYTES,
				decodedBytes: 0
			};
			const packets = await decodeTsharkPackets(stdout, budget, signal, "");
			for (const layers of packets) {
				if ("frame.number" in layers) {
					for (const [key, value] of Object.entries(layers)) {
						if ([
							"dns",
							"dns_raw",
							"mdns",
							"mdns_raw",
							"llmnr",
							"llmnr_raw"
						].includes(key)) continue;
						if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) return protocolFailure(`selected field ${key} must be an array of strings`);
					}
				}
			}
			if (dnsStdout !== undefined) {
				const seen = new Set();
				for (const layers of await decodeTsharkPackets(dnsStdout, budget, signal, "DNS ")) {
					const frame = isRecord(layers.frame) ? layers.frame["frame.number"] : undefined;
					if (typeof frame !== "string" || !/^[1-9][0-9]*$/u.test(frame)) return protocolFailure("DNS packet lacks a unique frame number");
					const number = Number(frame);
					const base = packets[number - 1];
					if (!Number.isSafeInteger(number) || seen.has(number) || base === undefined) return protocolFailure("DNS frame is duplicated or outside the capture inventory");
					seen.add(number);
					for (const family of [
						"dns",
						"mdns",
						"llmnr"
					]) {
						base[family] = layers[family];
						base[`${family}_raw`] = layers[`${family}_raw`];
					}
				}
			}
			const endpoints = new Map();
			const dns = new Map();
			const sni = new Set();
			const protocols = new Map();
			const uris = new Set();
			const observedUris = new Set();
			let uriRedactions = 0;
			let unresolvedHttpUriTarget = false;
			const unattributed = new Set();
			let unattributedPackets = 0;
			let unresolvedDnsOwnership = false;
			const dnsLimitations = new Set();
			let retainedBytes = 0;
			const charge = (value) => {
				retainedBytes += 192 + 2 * Buffer.byteLength(value);
				if (retainedBytes > MAX_RETAINED_BYTES) throw new AnalysisResourceConstraintError(OPERATION$1, "memory", "Packet inventory exceeds the retained-fact budget", { max_retained_bytes: MAX_RETAINED_BYTES }, fixedAllowanceOptions("The packet-inventory retained-fact allowance", "capture", {
					limit: MAX_RETAINED_BYTES,
					unit: "bytes"
				}));
			};
			const add = (set, value) => {
				if (!set.has(value)) {
					charge(value);
					set.add(value);
				}
			};
			for (const [index, layers] of packets.entries()) {
				if (index % 256 === 0) {
					await setImmediate();
					assertOutputReadActive(signal);
				}
				const values = new Map();
				const pending = [layers];
				while (pending.length > 0) {
					const value = pending.pop();
					if (Array.isArray(value)) {
						for (let item = value.length - 1; item >= 0; item -= 1) pending.push(value[item]);
						continue;
					}
					if (!isRecord(value)) continue;
					const entries = Object.entries(value);
					for (const [key, child] of entries) {
						if (key.endsWith("_raw")) continue;
						if (typeof child === "string") {
							const list = values.get(key) ?? [];
							list.push(child);
							values.set(key, list);
						} else if (Array.isArray(child) && child.every((item) => typeof item === "string")) {
							const list = values.get(key) ?? [];
							for (const item of child) list.push(item);
							values.set(key, list);
						}
					}
					for (let entry = entries.length - 1; entry >= 0; entry -= 1) {
						const [key, child] = entries[entry];
						if (!key.endsWith("_raw") && (isRecord(child) || Array.isArray(child) && child.some((item) => typeof item !== "string"))) pending.push(child);
					}
				}
				const field = (name) => values.get(name) ?? [];
				const frame = field("frame.number");
				if (frame.length !== 1 || !/^\d+$/u.test(frame[0]) || Number(frame[0]) !== index + 1) return protocolFailure("frame inventory is missing, duplicated or out of order");
				const protocolStack = field("frame.protocols");
				if (protocolStack.length !== 1) return protocolFailure("packet protocol inventory is missing or ambiguous");
				const protocol = protocolStack[0];
				for (const address of new Set([
					...field("ip.src"),
					...field("ip.dst"),
					...field("ipv6.src"),
					...field("ipv6.dst")
				])) {
					if (address === "") continue;
					if (!endpoints.has(address)) charge(address);
					endpoints.set(address, (endpoints.get(address) ?? 0) + 1);
				}
				const messages = [];
				for (const family of [
					"dns",
					"mdns",
					"llmnr"
				]) {
					const source = layers[family];
					const sources = Array.isArray(source) ? source : source === undefined ? [] : [source];
					const raw = layers[`${family}_raw`];
					const raws = Array.isArray(raw) && typeof raw[0] !== "string" ? raw : raw === undefined ? [] : [raw];
					for (const [pdu, source] of sources.entries()) messages.push({
						family,
						source,
						raw: raws.length === sources.length ? raws[pdu] : undefined
					});
				}
				let packetUnattributed = false;
				const treeQueries = new Map();
				const treeAddresses = new Map();
				const count = (counts, value) => {
					counts.set(value, (counts.get(value) ?? 0) + 1);
				};
				for (const [pdu, message] of messages.entries()) {
					const facts = parseDnsMessageRaw(message.raw, message.source, message.family);
					for (const question of facts.questions) count(treeQueries, question.query);
					for (const [, address] of facts.assigned) count(treeAddresses, address);
					for (const address of facts.unattributed) count(treeAddresses, address);
					const keys = facts.questions.map((question, occurrence) => {
						const key = question.labels_hex === null ? `unknown:${String(index)}:${String(pdu)}:${String(occurrence)}` : JSON.stringify([question.query, question.labels_hex]);
						if (!dns.has(key)) {
							charge(question.query);
							for (const label of question.labels_hex ?? []) charge(label);
							dns.set(key, {
								query: question.query,
								labels: question.labels_hex,
								addresses: new Set()
							});
						}
						return key;
					});
					unresolvedDnsOwnership ||= facts.incomplete;
					for (const reason of facts.incomplete_reasons ?? []) add(dnsLimitations, reason);
					for (const [question, address] of facts.assigned) add(dns.get(keys[question]).addresses, address);
					if (facts.unattributed.length > 0) {
						packetUnattributed = true;
						for (const address of facts.unattributed) add(unattributed, address);
					}
				}
				if (dnsStdout !== undefined || [
					"dns.qry.name",
					"dns.a",
					"dns.aaaa"
				].some((key) => key in layers)) {
					const selected = (name) => layers[name] ?? [];
					const consume = (counts, value) => {
						const remaining = counts.get(value) ?? 0;
						if (remaining === 0) return false;
						if (remaining === 1) counts.delete(value);
						else counts.set(value, remaining - 1);
						return true;
					};
					let mismatch = false;
					for (const [occurrence, query] of selected("dns.qry.name").entries()) {
						if (consume(treeQueries, query)) continue;
						mismatch = true;
						if (query === "") continue;
						charge(query);
						dns.set(`selected:${String(index)}:${String(occurrence)}`, {
							query,
							labels: null,
							addresses: new Set()
						});
					}
					for (const address of [...selected("dns.a"), ...selected("dns.aaaa")]) {
						if (consume(treeAddresses, address)) continue;
						mismatch = true;
						if (address === "") continue;
						packetUnattributed = true;
						add(unattributed, address);
					}
					if (mismatch || treeQueries.size > 0 || treeAddresses.size > 0) {
						unresolvedDnsOwnership = true;
						add(dnsLimitations, "Selected DNS observations and per-message trees differ in query or address occurrences; unmatched selected facts are retained without wire identity or ownership");
					}
				}
				if (packetUnattributed) unattributedPackets += 1;
				for (const value of field("tls.handshake.extensions_server_name")) if (value !== "") add(sni, value);
				if (protocol !== "") {
					if (!protocols.has(protocol)) charge(protocol);
					protocols.set(protocol, (protocols.get(protocol) ?? 0) + 1);
				}
				const fullUris = field("http.request.full_uri");
				const fullUriCandidates = fullUris.map((value) => ({
					value,
					parsed: parsePcapHttpUri(value, "full-uri")
				}));
				const requestUriCandidates = field("http.request.uri").map((value) => ({
					value,
					parsed: parsePcapHttpUri(value, "request-target")
				}));
				const absoluteRequests = new Map();
				let relativeRequestCount = 0;
				for (const candidate of requestUriCandidates) {
					if (candidate.value === "") continue;
					if (candidate.parsed.origin !== null) absoluteRequests.set(candidate.value, (absoluteRequests.get(candidate.value) ?? 0) + 1);
					else relativeRequestCount += 1;
				}
				let unmatchedFullUriCount = 0;
				for (const candidate of fullUriCandidates) {
					const absoluteCount = absoluteRequests.get(candidate.value) ?? 0;
					if (absoluteCount > 0) absoluteRequests.set(candidate.value, absoluteCount - 1);
					else if (candidate.value !== "") unmatchedFullUriCount += 1;
				}
				if (relativeRequestCount > unmatchedFullUriCount) unresolvedHttpUriTarget = true;
				const http2Uris = field("http2.request.full_uri").filter((value) => value !== "");
				if (field("http2.headers.path").filter((value) => value !== "").length > http2Uris.length) unresolvedHttpUriTarget = true;
				for (const candidate of [
					...fullUriCandidates,
					...http2Uris.map((value) => ({
						value,
						parsed: parsePcapHttpUri(value, "full-uri")
					})),
					...requestUriCandidates.filter(({ parsed }) => parsed.origin !== null)
				]) {
					const { value, parsed } = candidate;
					if (value === "" || observedUris.has(value)) continue;
					add(observedUris, value);
					const { credentials } = parsed;
					if (credentials !== null) uriRedactions += 1;
					if (credentials === "ambiguous") continue;
					add(uris, credentials === null ? value : value.slice(0, credentials.start) + value.slice(credentials.end));
				}
			}
			assertOutputReadActive(signal);
			return {
				endpoints: [...endpoints].sort((a, b) => b[1] - a[1] || compareUnicodeCodePoints(a[0], b[0])).map(([address, packet_count]) => ({
					address,
					port: null,
					packet_count
				})),
				endpointCount: endpoints.size,
				dnsQueries: [...dns.values()].map(({ query, labels, addresses }) => ({
					query,
					query_labels_hex: labels === null ? null : [...labels],
					response_addresses: [...addresses],
					response_address_count: addresses.size
				})),
				dnsQueryCount: dns.size,
				dnsLimitations: [...dnsLimitations],
				tlsSniValues: [...sni],
				tlsSniCount: sni.size,
				protocolDistribution: [...protocols].sort((a, b) => b[1] - a[1] || compareUnicodeCodePoints(a[0], b[0])).map(([protocol, packet_count]) => ({
					protocol,
					packet_count
				})),
				protocolCount: protocols.size,
				httpRequestUris: [...uris],
				httpRequestUriCount: observedUris.size,
				httpUriRedactionCount: uriRedactions,
				unattributedDnsAddresses: [...unattributed],
				unattributedDnsAddressCount: unattributed.size,
				unattributedDnsPackets: unattributedPackets,
				packetCount: packets.length,
				partial: observedUris.size > uris.size || unresolvedDnsOwnership || unresolvedHttpUriTarget
			};
		};
	})))();
}

//#endregion
//#region dist/pcap/PcapDiagnosticOutput.js
var HTTP_URI_FIELDS, projectHttpJsonDiagnostic, createPcapDiagnosticProjection;
function init_PcapDiagnosticOutput() {
	return (init_PcapDiagnosticOutput = __esmMin((() => {
		init_PcapHttpUri();
		HTTP_URI_FIELDS = new Map(Object.entries(PCAP_HTTP_URI_FIELDS));
		projectHttpJsonDiagnostic = (text) => {
			if (text.length === 0) return {
				text,
				partial: false
			};
			const invalidJson = {};
			let cutoff = text.length;
			let cursor = 0;
			let partial = false;
			let pending = "";
			const chunks = [];
			const append = (part) => {
				pending += part;
				if (pending.length >= 16 * 1024) {
					chunks.push(pending);
					pending = "";
				}
			};
			const redact = (value, offset, length, path) => {
				if (typeof value !== "string") return;
				let role;
				for (const part of path) if (typeof part === "string") role = HTTP_URI_FIELDS.get(part) ?? role;
				if (role === undefined) return;
				const { credentials } = parsePcapHttpUri(value, role);
				if (credentials === null) return;
				const encoded = text.slice(offset + 1, offset + length - 1);
				const spans = credentials === "ambiguous" ? [{
					start: offset + 1,
					end: offset + length - 1
				}] : jsonStringSourceSpans(encoded, offset + 1, [credentials]);
				for (const span of spans) {
					append(text.slice(cursor, span.start));
					cursor = span.end;
				}
				if (credentials === "ambiguous") partial = true;
			};
			try {
				visit(text, {
					onLiteralValue: (value, offset, length, _line, _column, path) => redact(value, offset, length, path()),
					onObjectProperty: (value, offset, length, _line, _column, path) => redact(value, offset, length, path()),
					onError: (_error, offset) => {
						partial ||= offset < text.length;
						cutoff = offset;
						throw invalidJson;
					}
				}, {
					disallowComments: true,
					allowTrailingComma: false,
					allowEmptyContent: false
				});
			} catch (cause) {
				if (cause !== invalidJson || cutoff < cursor) return {
					text: "",
					partial: true
				};
			}
			append(text.slice(cursor, cutoff));
			if (chunks.length === 0) return {
				text: pending,
				partial
			};
			chunks.push(pending);
			return {
				text: chunks.join(""),
				partial
			};
		};
		createPcapDiagnosticProjection = (httpJson) => {
			let cachedSource;
			let cached;
			return (output) => {
				if (!httpJson) return output;
				if (cached === undefined || cachedSource !== output.stdout) {
					cached = projectHttpJsonDiagnostic(output.stdout);
					cachedSource = output.stdout;
				}
				return {
					...output,
					stdout: cached.text,
					truncated: output.truncated || cached.partial
				};
			};
		};
	})))();
}

//#endregion
//#region dist/pcap/PcapNativeBound.js
var PRLIMIT_COMMAND_ENV, PCAP_LIMITER_REMEDIATION, attributePcapLimitedExit, PCAP_CPU_SECONDS, preparePcapNativeBound;
function init_PcapNativeBound() {
	return (init_PcapNativeBound = __esmMin((() => {
		init_producerResourceLimits();
		init_ArtifactCommandPath();
		init_pcapAnalysis();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_LinuxResourceLimits();
		init_errorMessage();
		PRLIMIT_COMMAND_ENV = "REA_TSHARK_PRLIMIT_COMMAND";
		PCAP_LIMITER_REMEDIATION = `Check that ${PRLIMIT_COMMAND_ENV} (default /usr/bin/prlimit) names an absolute, executable util-linux prlimit.`;
		attributePcapLimitedExit = (limiterInvocationPath, exit) => {
			const prefix = `${basename(limiterInvocationPath)}: `;
			if (exit.signal !== null && exit.signal !== undefined || !exit.stderr.startsWith(prefix)) return { stage: "tool" };
			if ((exit.exitCode === 126 || exit.exitCode === 127) && exit.stderr.startsWith(`${prefix}failed to execute `)) return {
				stage: "tool-launch",
				refusal: exit.exitCode === 127 ? "missing" : "denied"
			};
			return exit.exitCode === 1 ? { stage: "limiter" } : { stage: "tool" };
		};
		PCAP_CPU_SECONDS = 300;
		preparePcapNativeBound = async (platform, environment, resources, probe, signal, operation = "inspect_pcap_capture") => {
			if (platform === "win32") {
				return {
					nativeBound: { memoryLimitBytes: BOUNDED_PRODUCER_LIMITS.address_space_bytes },
					limitations: ["Each owned Windows tool tree has a 1 GiB Job Object committed-memory limit; this is not a machine-wide quota."]
				};
			}
			if (!pcapCaptureHostSupported(platform)) {
				const reason = PCAP_CAPTURE_UNSUPPORTED_HOST_REASON;
				throw new AnalysisCapabilityUnavailableError("pcap", operation, reason, { userMessage: reason });
			}
			const configured = environment[PRLIMIT_COMMAND_ENV] ?? "/usr/bin/prlimit";
			let probeFailure;
			let capturedOutput;
			try {
				if (!isAbsolute(configured)) throw new Error(`${PRLIMIT_COMMAND_ENV} must be absolute.`);
				const selection = await selectArtifactCommandPath(configured, signal);
				if (!(await stat(selection.resolvedPath)).isFile()) throw new Error("The selected limiter is not a regular file.");
				await access(selection.resolvedPath, constants.X_OK);
				const readProbe = async (argument) => {
					try {
						const output = await probe(selection, [argument]);
						capturedOutput = output.capturedOutput;
						return output.stdout;
					} catch (cause) {
						if ((cause instanceof AnalysisCapabilityUnavailableError || cause instanceof AnalysisOutputError) && !cause.cleanupIncomplete) {
							probeFailure = cause;
							throw new Error(cause instanceof AnalysisOutputError ? `The selected limiter produced unreadable ${argument === "--version" ? "version" : "help"} output.` : "The selected limiter could not be run.", { cause });
						}
						throw cause;
					}
				};
				const version = await readProbe("--version");
				const prefix = `${basename(selection.invocationPath)} from util-linux `;
				if (!version.startsWith(prefix) || version.slice(prefix.length).trim() === "") throw new Error("The selected limiter did not report a util-linux prlimit version.");
				const help = await readProbe("--help");
				for (const flag of [
					"--as",
					"--fsize",
					"--cpu",
					"--core"
				]) {
					if (!new RegExp(`(?:^|\\s)${flag}(?:[=\\[\\s,]|$)`, "u").test(help)) throw new Error(`The selected limiter does not advertise ${flag}.`);
				}
				const limits = await resources.readLimits({
					address_space_bytes: BOUNDED_PRODUCER_LIMITS.address_space_bytes,
					file_bytes: BOUNDED_PRODUCER_LIMITS.file_bytes,
					cpu_seconds: PCAP_CPU_SECONDS
				});
				const nativeBound = { limiter: {
					command: selection,
					arguments: prlimitCeilingArguments(limits)
				} };
				const limitations = [`Linux prlimit preserves stricter inherited ceilings: ${limits.address_space_bytes} bytes of per-process address space, ${limits.file_bytes} bytes per file and ${limits.cpu_seconds} CPU seconds; core dumps are disabled. These are not aggregate machine quotas.`];
				return {
					nativeBound,
					limitations
				};
			} catch (cause) {
				if (signal?.aborted === true && !(cause instanceof AnalysisError)) throw cancelledBy(operation, signal);
				if (cause instanceof AnalysisError) throw cause;
				const reason = "Cannot establish the selected Linux resource limiter before processing capture bytes.";
				throw new AnalysisCapabilityUnavailableError("pcap", operation, reason, {
					cause,
					capturedOutput: probeFailure?.capturedOutput ?? capturedOutput,
					diagnostics: {
						...probeFailure?.diagnostics,
						configuration_key: PRLIMIT_COMMAND_ENV,
						configured
					},
					userMessage: `${reason} (${errorMessage(cause)}) ${PCAP_LIMITER_REMEDIATION}`,
					remediationAction: PCAP_LIMITER_REMEDIATION
				});
			}
		};
	})))();
}

//#endregion
//#region dist/pcap/PcapCommand.js
var runPcapCommand;
function init_PcapCommand() {
	return (init_PcapCommand = __esmMin((() => {
		init_capturedProviderOutput();
		init_analysisErrorCleanup();
		init_providerCleanupError();
		init_ArtifactCommandPath();
		init_resources();
		init_fixedAllowanceRemediation();
		init_analysisErrorBase();
		init_PcapDiagnosticOutput();
		init_analysisErrorCore();
		init_OwnedCommand();
		init_WindowsBatchCommand();
		init_ProviderOutcome();
		init_classifyProviderOutcome();
		init_launchFailure();
		init_PcapConfiguration();
		init_PcapNativeBound();
		init_errorMessage();
		runPcapCommand = async (options) => {
			const { operation, command, limits, signal } = options;
			const projectDiagnostic = createPcapDiagnosticProjection(options.redactHttpTransportCredentials === true);
			const captureDiagnostic = (snapshot) => projectDiagnostic(capturedProviderOutput(snapshot));
			/**
			* A version probe that fails names the tool; a capture read names the file
			* when the tool says it is not a capture. `unrecognised` reports the rest.
			*/
			const pcapToolFailure = (diagnostic, details, unrecognised) => {
				if (options.inputPath === undefined) return pcapToolUnavailable(operation, `The selected tool ${command} cannot report its version: ${diagnostic}`, details);
				if (/not a capture file|file.*isn't a capture file|file format.*not supported/iu.test(diagnostic)) return new AnalysisUnsupportedTargetError(operation, options.inputPath, diagnostic, details);
				return unrecognised(`Packet capture tool ${command} failed: ${diagnostic}`);
			};
			if (signal?.aborted) throw cancelledBy(operation, signal);
			const hostEnvironment = {
				...options.environment,
				LC_ALL: "C",
				LANG: "C"
			};
			let cleanup;
			let commandAttempted = false;
			try {
				const batch = options.platform === "win32" && isWindowsBatchFile(command);
				const invocation = batch ? windowsBatchCommand({
					environment: hostEnvironment,
					batchPath: command,
					arguments: options.arguments
				}) : {
					command,
					arguments: options.arguments
				};
				const boundedInvocation = options.nativeBound?.limiter === undefined ? invocation : {
					command: options.nativeBound.limiter.command.invocationPath,
					arguments: [
						...options.nativeBound.limiter.arguments,
						invocation.command,
						...invocation.arguments
					]
				};
				await prepareOwnedCommand(signal);
				const selectedLimiter = options.nativeBound?.limiter?.command;
				if (selectedLimiter !== undefined) await assertArtifactCommandPath(selectedLimiter, operation, { signal });
				commandAttempted = true;
				const output = await runOwnedCommand({
					...boundedInvocation,
					runId: randomUUID(),
					hostEnvironment,
					windowsVerbatimArguments: batch,
					expectedCommand: null,
					...options.nativeBound?.memoryLimitBytes === undefined ? {} : { memoryLimitBytes: options.nativeBound.memoryLimitBytes }
				}, {
					timeoutMs: limits.timeoutMs,
					diagnosticBytes: limits.maxOutputBytes
				}, {
					...signal === undefined ? {} : { signal },
					...options.launcher === undefined ? {} : { launcher: options.launcher },
					retainCleanup: (owner, stopped) => {
						const resources = owner.launch.ownership === undefined ? ["owned-process"] : ownedCommandResources(owner.launch.ownership);
						const snapshot = owner.snapshot();
						const capturedOutput = captureDiagnostic(snapshot);
						options.retain(owner, resources, stopped.reason, capturedOutput);
						cleanup = {
							reason: stopped.reason,
							resources,
							capturedOutput
						};
					}
				});
				const unredacted = capturedProviderOutput(output);
				if (selectedLimiter !== undefined) await assertArtifactCommandPath(selectedLimiter, operation, { get capturedOutput() {
					return projectDiagnostic(unredacted);
				} });
				return {
					get capturedOutput() {
						return projectDiagnostic(unredacted);
					},
					stdout: unredacted.stdout,
					stderr: unredacted.stderr,
					invalidUtf8Streams: [...output.stdout.invalidUtf8 === true ? ["stdout"] : [], ...output.stderr.invalidUtf8 === true ? ["stderr"] : []],
					...cleanup === undefined ? {} : { cleanup }
				};
			} catch (cause) {
				if (cause instanceof AnalysisError) {
					if (cleanup !== undefined) {
						const pending = new ProviderCleanupError("pcap", cleanup.resources, { reason: cleanup.reason }, {
							operation,
							capturedOutput: cleanup.capturedOutput,
							cleanup: {
								reason: cleanup.reason,
								resources: cleanup.resources
							}
						});
						throw analysisErrorWithCleanupFailure(cause, pending, operation);
					}
					throw cause;
				}
				if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") throw cancelledBy(operation, carriedReason(artifactFileCancellationCause(cause)));
				if (cause instanceof OwnedCommandFailure && cause.cleanupOwner !== undefined) options.retain(cause.cleanupOwner, cause.resources, cause.cleanupFailure ?? cause.message, cause.snapshot === null ? {
					stdout: "",
					stderr: "",
					truncated: true
				} : captureDiagnostic(cause.snapshot));
				const cleanupDetails = cleanup !== undefined ? { cleanup } : cause instanceof OwnedCommandFailure && cause.cleanupFailure !== null ? { cleanup: {
					reason: cause.cleanupFailure,
					resources: cause.resources
				} } : {};
				if (cause instanceof WindowsBatchCommandError) throw pcapToolUnavailable(operation, `Cannot run selected tool ${command}: ${cause.message}`, {
					cause,
					...cleanupDetails
				});
				const selectedLimiter = options.nativeBound?.limiter?.command.invocationPath;
				const launchedPath = selectedLimiter ?? command;
				const preparationFailure = (diagnostic, details) => new AnalysisProtocolError(`Preparing the owned packet command failed: ${diagnostic}`, details);
				const outcome = providerOutcomeOf(cause);
				if (outcome === undefined) {
					const diagnostic = errorMessage(cause);
					const details = {
						cause,
						...cleanupDetails
					};
					if (!commandAttempted) throw preparationFailure(diagnostic, details);
					if (cause instanceof Error && "code" in cause) throw new AnalysisProtocolError(`The packet command could not start; the failing stage is unknown: ${diagnostic}`, details);
					throw pcapToolFailure(diagnostic, details, (reason) => new AnalysisProtocolError(reason, details));
				}
				throw classifyProviderOutcome(outcome, {
					providerId: "pcap",
					operation,
					capturedOutput: captureDiagnostic,
					details: cleanupDetails,
					timeout: { ms: limits.timeoutMs },
					outputLimit: {
						limits: { max_output_bytes: limits.maxOutputBytes },
						recovery: fixedAllowanceOptions("The packet-tool output capture allowance", "capture", {
							limit: limits.maxOutputBytes,
							unit: "bytes"
						})
					},
					memoryLimitBytes: options.nativeBound?.memoryLimitBytes,
					launchUnavailable: (failure, details) => {
						if (failure.executable !== launchedPath) {
							if (!commandAttempted) return preparationFailure(outcome.message, details);
							return new AnalysisProtocolError(`The packet command could not start; the failing stage is unknown: ${outcome.message}`, details);
						}
						const code = describeLaunchFailure(failure);
						if (selectedLimiter !== undefined) {
							const reason = `Selected capture limiter ${selectedLimiter} could not be launched (${code}).`;
							return new AnalysisCapabilityUnavailableError("pcap", operation, reason, {
								...details,
								userMessage: `${reason} ${PCAP_LIMITER_REMEDIATION}`,
								remediationAction: PCAP_LIMITER_REMEDIATION
							});
						}
						return pcapToolUnavailable(operation, failure.kind === "missing" ? `Selected tool ${command} was not found (${code})` : failure.kind === "not_executable" ? `Selected tool ${command} exists but could not be executed (${code})` : `Selected tool ${command} could not be launched (${code})`, details);
					},
					dialect: (failure, details, unclassified) => {
						const unrecognised = (reason) => unclassified({ diagnostics: { detail: reason } });
						const diagnostic = failure.output?.snapshot.stderr.text.trim() || failure.message;
						if (!commandAttempted) return preparationFailure(diagnostic, details);
						if (selectedLimiter !== undefined) {
							if (failure.kind !== "exited" || failure.output === undefined) return unrecognised(`The bounded packet command failed before its exit was observed; whether the limiter or selected tool failed is unknown: ${diagnostic}`);
							const attributed = attributePcapLimitedExit(selectedLimiter, {
								exitCode: failure.exitCode,
								signal: failure.signal,
								stderr: failure.output.snapshot.stderr.text
							});
							if (attributed.stage === "limiter") {
								const reason = `Selected capture limiter ${selectedLimiter} failed before starting ${command}: ${diagnostic}`;
								return new AnalysisCapabilityUnavailableError("pcap", operation, reason, {
									...details,
									userMessage: `${reason} ${PCAP_LIMITER_REMEDIATION}`,
									remediationAction: PCAP_LIMITER_REMEDIATION
								});
							}
							if (attributed.stage === "tool-launch") return pcapToolUnavailable(operation, attributed.refusal === "missing" ? `Selected tool ${command} was not found: ${diagnostic}` : `Selected tool ${command} exists but could not be executed: ${diagnostic}`, details);
						}
						return pcapToolFailure(diagnostic, details, unrecognised);
					}
				});
			}
		};
	})))();
}

//#endregion
//#region dist/pcap/PcapSnapshot.js
var OPERATION, MAX_CAPTURE_BYTES, PcapSnapshot;
function init_PcapSnapshot() {
	return (init_PcapSnapshot = __esmMin((() => {
		init_OwnedRegularFile();
		init_analysisErrorBase();
		init_resources();
		init_analysisErrorCore();
		init_fixedAllowanceRemediation();
		init_providerCleanupError();
		init_OwnedFileHandle();
		init_RegularFile();
		init_PrivateRuntimeRoot();
		init_runtimeControlUnavailableError();
		init_privateWorkspaceFailure();
		init_errorMessage();
		OPERATION = "inspect_pcap_capture";
		MAX_CAPTURE_BYTES = 2 * 1024 ** 3;
		PcapSnapshot = class PcapSnapshot {
			root;
			handles = new Set();
			/** Descriptors whose failed completion close an error still reports. */
			completionCleanup = new Map();
			path;
			configurationPath;
			constructor(root) {
				this.root = root;
				this.path = join(root.path, "capture.pcap");
				this.configurationPath = join(root.path, "configuration");
			}
			static async create() {
				try {
					return new PcapSnapshot(await PrivateRuntimeRoot.create({ prefix: "rea-pcap-" }));
				} catch (cause) {
					if (cause instanceof RuntimeControlUnavailableError) throw runtimeControlCapabilityError("pcap", OPERATION, cause);
					throw privateWorkspaceFailure("pcap", OPERATION, cause, null);
				}
			}
			own(handle) {
				this.handles.add(handle);
				return handle;
			}
			async release(handle) {
				await handle.close();
				this.handles.delete(handle);
				this.completionCleanup.delete(handle);
			}
			/** Retry through a reported descriptor's lease so its error reads the release. */
			retryRelease(handle) {
				return this.completionCleanup.get(handle)?.release() ?? this.release(handle);
			}
			async releaseCompleted(handle, signal) {
				try {
					await this.release(handle);
				} catch (cleanupCause) {
					const cleanup = new ProviderCleanupError("pcap", [this.path], { reason: "Owned snapshot descriptor close failed" }, {
						operation: OPERATION,
						cause: cleanupCause
					});
					const lease = new AnalysisCleanupLease(() => this.release(handle), [this.path]);
					lease.bindCleanupError(cleanup);
					this.completionCleanup.set(handle, lease);
					if (signal?.aborted !== true) throw cleanup;
					const cancelled = cancelledBy(OPERATION, signal, { cleanup: {
						reason: "Owned snapshot descriptor close could not be confirmed",
						resources: [this.path]
					} });
					cancelled.retainSecondaryFailure(cleanup).bindCleanupDependencies([cleanup]);
					throw cancelled;
				}
			}
			async capture(path, signal) {
				const sourceRead = async (read) => {
					try {
						return await read();
					} catch (cause) {
						const cancellation = regularFileCancellation(cause);
						if (cancellation !== undefined) throw cause;
						if (cause instanceof AnalysisError) throw cause;
						if (cause instanceof Error && "code" in cause && (cause.code === "EACCES" || cause.code === "EPERM")) throw new AnalysisAccessDeniedError(OPERATION, path, cause.code, { cause });
						throw new AnalysisInputError(OPERATION, { cause }, [{
							path: ["path"],
							reason: "invalid_value",
							message: `Cannot read selected capture ${path}: ${errorMessage(cause)}`
						}]);
					}
				};
				try {
					assertRegularFileActive(signal);
					await mkdir(this.configurationPath, { mode: 448 });
					const source = await sourceRead(async () => {
						try {
							const { handle } = await openRegularFile(path, {
								symlinks: "follow",
								signal
							});
							return this.own(new OwnedFileHandle(handle));
						} catch (cause) {
							if (cause instanceof RegularFileAdmissionFailure) {
								this.own(cause.owner);
								throw cause.cause;
							}
							throw cause;
						}
					});
					const before = await sourceRead(() => source.handle.stat({ bigint: true }));
					if (before.size > BigInt(MAX_CAPTURE_BYTES)) throw new AnalysisResourceConstraintError(OPERATION, "file-size", "Capture exceeds the owned-snapshot disk budget", { max_capture_bytes: MAX_CAPTURE_BYTES }, fixedAllowanceOptions("the owned capture snapshot allowance", "input", {
						limit: MAX_CAPTURE_BYTES,
						unit: "bytes"
					}));
					const destination = this.own(new OwnedFileHandle(await open(this.path, "wx", 384)));
					const buffer = Buffer.alloc(64 * 1024);
					const hash = createHash("sha256");
					let copied = 0;
					while (copied <= Number(before.size)) {
						assertRegularFileActive(signal);
						const { bytesRead } = await sourceRead(() => source.handle.read(buffer, 0, Math.min(buffer.length, Number(before.size) - copied + 1), copied));
						assertRegularFileActive(signal);
						if (bytesRead === 0) break;
						copied += bytesRead;
						if (BigInt(copied) > before.size) throw new AnalysisArtifactChangedError(OPERATION, path, "Capture grew during acquisition");
						const chunk = buffer.subarray(0, bytesRead);
						await destination.handle.writeFile(chunk);
						hash.update(chunk);
					}
					const after = await sourceRead(() => source.handle.stat({ bigint: true }));
					const selected = await stat(path, { bigint: true }).catch((cause) => {
						if (cause instanceof Error && "code" in cause && (cause.code === "EACCES" || cause.code === "EPERM")) throw new AnalysisAccessDeniedError(OPERATION, path, cause.code, { cause });
						throw new AnalysisArtifactChangedError(OPERATION, path, "Selected path became unavailable during acquisition", { cause });
					});
					if (BigInt(copied) !== before.size || !sameRegularFileState(before, after) || !sameRegularFileState(before, selected)) throw new AnalysisArtifactChangedError(OPERATION, path, "Capture identity or contents changed during acquisition");
					await this.releaseCompleted(source, signal);
					await this.releaseCompleted(destination, signal);
					await chmod(this.path, 256);
					assertRegularFileActive(signal);
					return {
						bytes: copied,
						sha256: hash.digest("hex")
					};
				} catch (cause) {
					if (cause instanceof RegularFileAdmissionFailure) this.own(cause.owner);
					const primary = cause instanceof RegularFileAdmissionFailure ? cause.cause : cause;
					const cancellation = regularFileCancellation(primary);
					if (cancellation !== undefined) throw cancelledBy(OPERATION, carriedReason(cancellation.reason));
					if (cause instanceof AnalysisError) throw cause;
					throw privateWorkspaceFailure("pcap", OPERATION, primary, this.root.path);
				}
			}
			/** Recheck byte identity after both tools; a read-only mode alone is not proof. */
			async verify(expected, selectedPath, signal) {
				try {
					const { handle } = await openRegularFile(this.path, {
						symlinks: "reject",
						signal
					});
					const file = this.own(new OwnedFileHandle(handle));
					const before = await file.handle.stat({ bigint: true });
					const buffer = Buffer.alloc(64 * 1024);
					const hash = createHash("sha256");
					let bytes = 0;
					while (bytes <= expected.bytes) {
						assertRegularFileActive(signal);
						const read = await file.handle.read(buffer, 0, Math.min(buffer.length, expected.bytes - bytes + 1), bytes);
						if (read.bytesRead === 0) break;
						bytes += read.bytesRead;
						hash.update(buffer.subarray(0, read.bytesRead));
					}
					const after = await file.handle.stat({ bigint: true });
					const selected = await stat(this.path, { bigint: true });
					if (bytes !== expected.bytes || hash.digest("hex") !== expected.sha256 || !sameRegularFileState(before, after) || !sameRegularFileState(before, selected)) throw new AnalysisArtifactChangedError(OPERATION, selectedPath, "Owned packet snapshot changed during tool analysis.");
					await this.releaseCompleted(file, signal);
					assertRegularFileActive(signal);
				} catch (cause) {
					if (cause instanceof RegularFileAdmissionFailure) this.own(cause.owner);
					const primary = cause instanceof RegularFileAdmissionFailure ? cause.cause : cause;
					const cancellation = regularFileCancellation(primary);
					if (cancellation !== undefined) throw cancelledBy(OPERATION, carriedReason(cancellation.reason));
					if (cause instanceof AnalysisError) throw cause;
					throw new AnalysisArtifactChangedError(OPERATION, selectedPath, "Cannot establish the owned packet snapshot's post-analysis identity.", { cause });
				}
			}
			async close() {
				const results = await Promise.allSettled([...this.handles].map((handle) => this.retryRelease(handle)));
				const failures = results.flatMap((result) => result.status === "rejected" ? [result.reason] : []);
				if (failures.length > 0) throw new AggregateError(failures, "Capture descriptor cleanup failed");
				await this.root.close();
			}
		};
	})))();
}

//#endregion
//#region dist/pcap/PcapProvider.js
var FIELDS, pcapPartialEvidence, PcapCommandCleanupError, probeCleanupFailure, pcapCommandCleanupError, assertValidPcapCommandText, dnsFailureReason, RetainedPcapCommand, RetainedSnapshotFailure, PcapProvider;
function init_PcapProvider() {
	return (init_PcapProvider = __esmMin((() => {
		init_classifyProviderFailure();
		init_PcapProviderIdentity();
		init_HostPlatform();
		init_PcapHttpUri();
		init_AnalysisProvider();
		init_pcapAnalysis();
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_analysisErrorProjection();
		init_analysisErrorCleanup();
		init_result();
		init_PcapConfiguration();
		init_PcapOutput();
		init_PcapCommand();
		init_providerCleanupError();
		init_unclassifiedProviderFailure();
		init_jsonValue();
		init_pcapEvidence();
		init_PcapNativeBound();
		init_PcapSnapshot();
		init_resources();
		init_ArtifactAnalysisResources();
		init_artifactResourceFailure();
		init_LinuxResourceLimits();
		init_snapshotEnvironment();
		init_ArtifactCommandPath();
		init_errorMessage();
		FIELDS = [
			"frame.number",
			"frame.protocols",
			"ip.src",
			"ip.dst",
			"ipv6.src",
			"ipv6.dst",
			"dns.flags.response",
			"dns.qry.name",
			"dns.qry.type",
			"dns.qry.class",
			"dns.count.queries",
			"dns.count.answers",
			"dns.count.auth_rr",
			"dns.count.add_rr",
			"dns.resp.name",
			"dns.resp.type",
			"dns.resp.class",
			"dns.cname",
			"dns.a",
			"dns.aaaa",
			"tls.handshake.extensions_server_name",
			...Object.keys(PCAP_HTTP_URI_FIELDS),
			"http2.headers.path"
		];
		pcapPartialEvidence = (request, provider, path, identity, result, limitations) => createPcapEvidence(request, {
			subject: {
				path,
				format: "file",
				sha256: identity.sha256
			},
			provider,
			result: jsonValueSchema.parse(result),
			rawResult: null,
			limitations,
			locations: [{
				kind: "artifact-path",
				path
			}]
		});
		PcapCommandCleanupError = class extends ProviderCleanupError {};
		probeCleanupFailure = (operation, cleanup, output) => new ProviderCleanupError("pcap", cleanup.resources, {
			reason: cleanup.reason,
			previous_error: null,
			captured_output: { ...output }
		}, { operation });
		pcapCommandCleanupError = (operation, snapshotPath, cleanup, capturedOutput, partialObservation) => new PcapCommandCleanupError("pcap", [...new Set([...snapshotPath === undefined ? [] : [snapshotPath], ...cleanup.resources])], {
			reason: cleanup.reason,
			previous_error: null,
			captured_output: { ...capturedOutput }
		}, {
			operation,
			...partialObservation === undefined ? {} : { partialObservation }
		});
		assertValidPcapCommandText = (operation, stage, output) => {
			if (output.invalidUtf8Streams.length === 0) return;
			throw new AnalysisOutputError(operation, `${stage} output is not valid UTF-8; retained text contains replacement characters.`, {
				get capturedOutput() {
					return output.capturedOutput;
				},
				diagnostics: {
					stage,
					invalid_utf8_streams: [...output.invalidUtf8Streams]
				}
			});
		};
		dnsFailureReason = (cause) => {
			if (!(cause instanceof UnclassifiedProviderFailure)) return cause.message;
			const detail = cause.diagnostics?.detail;
			return typeof detail === "string" ? detail : cause.examined.reason;
		};
		RetainedPcapCommand = class {
			snapshot;
			resources;
			reason;
			capturedOutput;
			#failure;
			#released = false;
			constructor(snapshot, resources, reason, capturedOutput) {
				this.snapshot = snapshot;
				this.resources = resources;
				this.reason = reason;
				this.capturedOutput = capturedOutput;
			}
			get cleanupReleased() {
				return this.#released;
			}
			/** The latest error reporting this command's retained cleanup. */
			get failure() {
				return this.#failure;
			}
			retainFailure(failure) {
				this.#failure = failure.bindCleanupReleaseClaim(this);
				return failure;
			}
			confirmReleased() {
				this.#released = true;
			}
		};
		RetainedSnapshotFailure = class {
			returned;
			snapshot;
			#released = false;
			constructor(returned, snapshot) {
				this.returned = returned;
				this.snapshot = snapshot;
				returned.bindCleanupReleaseClaim(this);
				snapshot.bindCleanupReleaseClaim(this);
			}
			get cleanupReleased() {
				return this.#released;
			}
			confirmReleased() {
				this.#released = true;
			}
		};
		PcapProvider = class {
			#resources;
			environment;
			launcher;
			wiresharkIdentities = new Map();
			platform;
			snapshots = new Set();
			snapshotFailures = new Map();
			commands = new Map();
			constructor(options = {}) {
				this.platform = options.platform ?? HOST_PLATFORM.platform;
				this.environment = snapshotEnvironment(options.environment ?? process.env, this.platform);
				this.launcher = options.launcher;
				this.#resources = createArtifactAnalysisResources("pcap", "inspect_pcap_capture", options.artifactReader ?? readStableArtifact, readLinuxResourceLimits, {
					message: "A packet summary is already active; retry after it completes.",
					details: { max_concurrent_inspections: 1 }
				});
			}
			/** Selected-tool reads are configuration admission, independently of capture bytes. */
			async readToolIdentity(operation, path, signal) {
				try {
					return await this.#resources.read(path, 64 * 1024 * 1024, signal);
				} catch (cause) {
					if (cause instanceof ArtifactReaderFailure && cause.reason === "cancelled") throw cause;
					throw classifyProviderFailure(cause, {
						...this.#failureDialect(operation),
						unclassified: (failure) => pcapToolUnavailable(operation, `Cannot read selected Wireshark tool ${path}: ${errorMessage(failure)}`, { cause: failure })
					});
				}
			}
			async run(operation, stage, command, args, limits, signal, snapshot, inputPath) {
				let cleanup;
				let retainedCommand;
				let output;
				let commandReturned = false;
				const selected = this.wiresharkIdentities.get(command);
				try {
					if (selected !== undefined) {
						await assertArtifactCommandPath(selected, operation, { signal });
						const before = await this.readToolIdentity(operation, selected.resolvedPath, signal);
						assertWiresharkExecutableIdentity(operation, selected.resolvedPath, selected.identity, wiresharkExecutableIdentity(before));
					}
					output = await runPcapCommand({
						operation,
						platform: this.platform,
						redactHttpTransportCredentials: stage === "tshark" && operation === "inspect_pcap_capture",
						command: selected?.invocationPath ?? command,
						arguments: args,
						limits,
						signal,
						environment: snapshot === undefined ? this.environment : {
							...this.environment,
							WIRESHARK_CONFIG_DIR: snapshot.configurationPath
						},
						...inputPath === undefined ? {} : { inputPath },
						...inputPath === undefined || this.nativeBound === undefined ? {} : { nativeBound: this.nativeBound },
						...this.launcher === undefined ? {} : { launcher: this.launcher },
						retain: (owner, resources, reason, capturedOutput) => {
							retainedCommand = new RetainedPcapCommand(snapshot, resources, reason, capturedOutput);
							this.commands.set(owner, retainedCommand);
							cleanup = {
								reason,
								resources,
								capturedOutput
							};
						}
					});
					commandReturned = true;
					if (selected !== undefined) {
						await assertArtifactCommandPath(selected, operation, { get capturedOutput() {
							return output.capturedOutput;
						} });
						const after = await this.readToolIdentity(operation, selected.resolvedPath);
						assertWiresharkExecutableIdentity(operation, selected.resolvedPath, selected.identity, wiresharkExecutableIdentity(after), { get capturedOutput() {
							return output.capturedOutput;
						} });
					}
					assertValidPcapCommandText(operation, stage, output);
				} catch (cause) {
					if (!commandReturned && retainedCommand !== undefined && cause instanceof AnalysisError && cause.cleanupIncomplete) {
						throw retainedCommand.retainFailure(cause);
					}
					if (commandReturned && cleanup !== undefined) {
						const pending = inputPath === undefined ? probeCleanupFailure(operation, cleanup, cleanup.capturedOutput) : pcapCommandCleanupError(operation, snapshot?.path, cleanup, cleanup.capturedOutput);
						retainedCommand?.retainFailure(pending);
						const primary = classifyProviderFailure(cause, this.#failureDialect(operation));
						throw analysisErrorWithCleanupDependencies(primary, pending, operation);
					}
					throw cause;
				}
				if (inputPath === undefined && cleanup !== undefined) {
					const failure = probeCleanupFailure(operation, cleanup, output.capturedOutput);
					retainedCommand?.retainFailure(failure);
					throw failure;
				}
				return output;
			}
			nativeBound;
			nativeLimitations = [];
			async prepareCaptureBound(operation, signal) {
				const prepared = await preparePcapNativeBound(this.platform, this.environment, this.#resources, async (selected, arguments_) => {
					await assertArtifactCommandPath(selected, operation, { signal });
					const output = await this.run(operation, "version", selected.invocationPath, arguments_, {
						timeoutMs: 2e4,
						maxOutputBytes: 64 * 1024
					}, signal);
					await assertArtifactCommandPath(selected, operation, { signal });
					return output;
				}, signal, operation);
				this.nativeBound = prepared.nativeBound;
				this.nativeLimitations = prepared.limitations;
			}
			async client(operation, signal) {
				const selection = resolvePcapTools(this.environment, this.platform);
				this.wiresharkIdentities.clear();
				for (const [name, selected] of [["tshark", selection.tshark], ["capinfos", selection.capinfos]]) {
					let commandPath;
					try {
						commandPath = await selectArtifactCommandPath(selected.command, signal);
					} catch (cause) {
						if (cause instanceof Error && "code" in cause && (cause.code === "ENOENT" || cause.code === "ENOTDIR")) throw new PcapConfigurationFailure(`${name}_missing`, `The selected ${name} executable ${selected.command} could not be found at its configured path.`, { command: selected.command }, { cause });
						throw cause;
					}
					const snapshot = await this.readToolIdentity(operation, commandPath.resolvedPath, signal);
					this.wiresharkIdentities.set(selected.command, {
						...commandPath,
						identity: wiresharkExecutableIdentity(snapshot)
					});
				}
				const identity = await inspectPcapClient(selection, async (command) => (await this.run(operation, "version", command, ["--version"], {
					timeoutMs: 2e4,
					maxOutputBytes: 64 * 1024
				}, signal)).stdout);
				for (const [name, version] of [["tshark", identity.tsharkVersion], ["capinfos", identity.capinfosVersion]]) {
					if (version === null) throw new PcapConfigurationFailure(`${name}_version_unresolved`, `The selected ${name} command did not report a version. Set REA_${name.toUpperCase()}_COMMAND to its absolute executable path.`);
				}
				return {
					selection,
					client: {
						tshark_command: selection.tshark.command,
						tshark_source: selection.tshark.source,
						tshark_version: identity.tsharkVersion,
						tshark_resolved_path: this.wiresharkIdentities.get(selection.tshark.command)?.resolvedPath ?? null,
						tshark_sha256: this.wiresharkIdentities.get(selection.tshark.command)?.identity.sha256 ?? null,
						tshark_identity_status: this.wiresharkIdentities.has(selection.tshark.command) ? "verified" : "unresolved",
						capinfos_command: selection.capinfos.command,
						capinfos_source: selection.capinfos.source,
						capinfos_version: identity.capinfosVersion,
						capinfos_resolved_path: this.wiresharkIdentities.get(selection.capinfos.command)?.resolvedPath ?? null,
						capinfos_sha256: this.wiresharkIdentities.get(selection.capinfos.command)?.identity.sha256 ?? null,
						capinfos_identity_status: this.wiresharkIdentities.has(selection.capinfos.command) ? "verified" : "unresolved"
					}
				};
			}
			async inspectAvailability(signal) {
				const result = await this.#resources.run(async () => {
					const cleanup = this.pendingCleanupFailure("inspect_pcap_client");
					if (cleanup !== undefined) throw cleanup;
					return ok(await this.inspectAvailabilityAdmitted(signal));
				}, signal);
				if (!result.ok) throw result.error;
				return result.value;
			}
			async inspectAvailabilityAdmitted(signal) {
				try {
					const { client } = await this.client("inspect_pcap_client", signal);
					if (!pcapCaptureHostSupported(this.platform)) return {
						status: "unavailable",
						code: "unsupported_host",
						reason: "No enforceable native memory boundary is available for capture summaries on this host.",
						remediation: PCAP_CAPTURE_HOST_REMEDIATION,
						diagnostics: client
					};
					await this.prepareCaptureBound("inspect_pcap_client", signal);
					return {
						status: "available",
						code: null,
						reason: null,
						diagnostics: client
					};
				} catch (cause) {
					if (cause instanceof AnalysisError && cause.cleanupIncomplete || cause instanceof AnalysisCancelledError) throw cause;
					if (cause instanceof PcapConfigurationFailure) return pcapConfigurationAvailability(cause);
					return {
						status: "unavailable",
						code: cause instanceof AnalysisCapabilityUnavailableError ? "executable_missing" : "version_unresolved",
						reason: errorMessage(cause),
						remediation: (cause instanceof AnalysisCapabilityUnavailableError ? cause.remediationAction : undefined) ?? PCAP_TOOL_REMEDIATION,
						diagnostics: {}
					};
				}
			}
			async discard(snapshot) {
				try {
					if ([...this.commands.values()].some((command) => command.snapshot === snapshot && !command.cleanupReleased)) throw new Error("An unreleased command still owns the capture snapshot");
					await snapshot.close();
					this.snapshots.delete(snapshot);
					this.snapshotFailures.get(snapshot)?.confirmReleased();
					this.snapshotFailures.delete(snapshot);
					return undefined;
				} catch (cause) {
					return new ProviderCleanupError("pcap", [snapshot.path], { reason: String(cause) }, {
						operation: "inspect_pcap_capture",
						cause
					});
				}
			}
			/** Refuse new work while a prior command or snapshot still has a cleanup owner. */
			pendingCleanupFailure(operation) {
				const retainedCommands = [...this.commands.values()].filter((command) => !command.cleanupReleased);
				if (retainedCommands.length === 0 && this.snapshots.size === 0) return undefined;
				const dependencies = [...retainedCommands.flatMap((command) => command.failure === undefined ? [] : [command.failure]), ...[...this.snapshotFailures.values()].map(({ snapshot }) => snapshot)];
				return new ProviderCleanupError("pcap", [...[...this.snapshots].map((snapshot) => snapshot.path), ...retainedCommands.flatMap((command) => command.resources)], { reason: "Previous packet-capture resources remain owned." }, { operation }).bindCleanupDependencies(dependencies);
			}
			async close() {
				const failures = [];
				let artifactCleanupFailure;
				try {
					await this.#resources.close();
				} catch (cause) {
					failures.push(cause);
					if (cause instanceof AnalysisError && cause.cleanupIncomplete) artifactCleanupFailure = cause;
				}
				for (const [owner, command] of this.commands) {
					if (command.cleanupReleased) continue;
					if (command.failure === undefined) command.retainFailure(new ProviderCleanupError("pcap", command.resources, { reason: command.reason }, { operation: "pcap.close" }));
					try {
						const result = await owner.stop();
						if (result.status === "incomplete") failures.push(result.reason);
						else if (result.status === "not-owned") failures.push("Command ownership remains unresolved");
						else {
							command.confirmReleased();
							if (command.snapshot === undefined) {
								this.commands.delete(owner);
							}
						}
					} catch (cause) {
						failures.push(cause);
					}
				}
				for (const snapshot of this.snapshots) {
					if (this.snapshotFailures.has(snapshot)) continue;
					const failure = new ProviderCleanupError("pcap", [snapshot.path], { reason: "Capture snapshot cleanup remains unresolved." }, { operation: "pcap.close" });
					this.snapshotFailures.set(snapshot, new RetainedSnapshotFailure(failure, failure));
				}
				for (const snapshot of this.snapshots) {
					const failure = await this.discard(snapshot);
					if (failure !== undefined) {
						failures.push(failure);
					} else {
						for (const [owner, command] of this.commands) {
							if (command.snapshot !== snapshot) continue;
							this.commands.delete(owner);
						}
					}
				}
				if (failures.length > 0) {
					const cleanup = new ProviderCleanupError("pcap", [...artifactCleanupFailure?.cleanupResources ?? [], ...[...this.snapshots].map((snapshot) => snapshot.path).concat([...this.commands.values()].filter((command) => !command.cleanupReleased).flatMap((command) => command.resources))], { reason: "Owned process or snapshot cleanup failed" }, {
						operation: "pcap.close",
						cause: new AggregateError(failures)
					});
					const dependencies = [
						...artifactCleanupFailure === undefined ? [] : [artifactCleanupFailure],
						...[...this.commands.values()].filter((command) => !command.cleanupReleased).flatMap((command) => command.failure === undefined ? [] : [command.failure]),
						...[...this.snapshotFailures.values()].map(({ snapshot }) => snapshot)
					];
					if (dependencies.length > 0) cleanup.bindCleanupDependencies([...new Set(dependencies)]);
					throw cleanup;
				}
			}
			async execute(request, options) {
				return this.#resources.run(() => {
					const cleanup = this.pendingCleanupFailure(request.operation);
					return cleanup === undefined ? this.executeAdmitted(request, options) : Promise.resolve(err(cleanup));
				}, options?.signal);
			}
			/** The pcap dialect for the shared provider failure classifier. */
			#failureDialect(operation) {
				return {
					providerId: PCAP_PROVIDER_IDENTITY.id,
					operation,
					recognise: (cause) => cause instanceof PcapConfigurationFailure ? pcapToolUnavailable(operation, cause.message, {
						cause,
						diagnostics: cause.diagnostics
					}) : undefined,
					readCleanup: (read, primary) => this.#resources.readCleanupFailure(read, primary, undefined, operation),
					unclassified: (cause) => new AnalysisProtocolError(`Packet-capture analysis failed: ${errorMessage(cause)}`, { cause })
				};
			}
			async executeAdmitted(request, options) {
				const signal = options?.signal;
				let snapshot;
				let result;
				try {
					if (signal?.aborted) throw cancelledBy(request.operation, signal);
					const { selection, client } = await this.client(request.operation, signal);
					const provider = {
						...PCAP_PROVIDER_IDENTITY,
						version: client.tshark_version
					};
					if (request.operation === "inspect_pcap_client") result = ok(createAnalysisExecution(pcapResultSchemas.inspect_pcap_client.parse({ client }), provider));
					else {
						await this.prepareCaptureBound(request.operation, signal);
						snapshot = await PcapSnapshot.create();
						this.snapshots.add(snapshot);
						const identity = await snapshot.capture(request.input.path, signal);
						const captured = await this.inspectCapture(selection, snapshot, request.input.path, identity, signal, request, provider, client);
						const data = pcapResultSchemas.inspect_pcap_capture.parse({
							client,
							...captured.result
						});
						result = ok(createAnalysisExecution(data, provider, {
							subject: {
								path: request.input.path,
								format: "file",
								sha256: identity.sha256
							},
							limitations: captured.limitations
						}));
					}
				} catch (cause) {
					result = err(classifyProviderFailure(cause, this.#failureDialect(request.operation)));
				}
				if (signal?.aborted && result.ok) result = err(cancelledBy(request.operation, signal, { partialObservation: createPcapEvidence(request, result.value) }));
				const pendingCommand = snapshot === undefined ? undefined : [...this.commands.values()].find((command) => command.snapshot === snapshot);
				if (snapshot !== undefined && pendingCommand === undefined) {
					const cleanup = await this.discard(snapshot);
					if (signal?.aborted && result.ok) result = err(cancelledBy(request.operation, signal, { partialObservation: createPcapEvidence(request, result.value) }));
					if (cleanup !== undefined) {
						if (result.ok) {
							const failure = cleanup.retainPartialObservation(createPcapEvidence(request, result.value));
							result = err(failure);
							this.snapshotFailures.set(snapshot, new RetainedSnapshotFailure(failure, failure));
						} else {
							const returned = analysisErrorWithCleanupDependencies(result.error, cleanup, request.operation);
							result = err(returned);
							this.snapshotFailures.set(snapshot, new RetainedSnapshotFailure(returned, cleanup));
						}
					}
				}
				if (snapshot !== undefined && pendingCommand !== undefined) {
					const partialObservation = result.ok ? createPcapEvidence(request, result.value) : result.error.partialObservation;
					const capturedOutput = result.ok ? undefined : result.error.capturedOutput;
					let commandFailure = pendingCommand.failure;
					if (commandFailure === undefined) {
						commandFailure = new ProviderCleanupError("pcap", pendingCommand.resources, {
							reason: pendingCommand.reason,
							captured_output: { ...pendingCommand.capturedOutput }
						}, { operation: request.operation });
						pendingCommand.retainFailure(commandFailure);
					}
					const snapshotFailure = new ProviderCleanupError("pcap", [snapshot.path], { reason: "Capture snapshot remains owned until command cleanup completes." }, { operation: request.operation });
					const cleanupFailure = new ProviderCleanupError("pcap", [...new Set([snapshot.path, ...pendingCommand.resources])], {
						reason: pendingCommand.reason,
						previous_error: result.ok ? null : projectAnalysisError(result.error),
						...capturedOutput === undefined && pendingCommand.capturedOutput.stdout === "" && pendingCommand.capturedOutput.stderr === "" ? {} : { captured_output: { ...capturedOutput ?? pendingCommand.capturedOutput } }
					}, {
						operation: request.operation,
						...partialObservation === undefined ? {} : { partialObservation }
					});
					const returned = result.ok ? cleanupFailure.retainPartialObservation(partialObservation).bindCleanupDependencies([commandFailure, snapshotFailure]) : result.error instanceof PcapCommandCleanupError ? result.error.bindCleanupDependencies([commandFailure, snapshotFailure]) : analysisErrorWithCleanupFailure(result.error, cleanupFailure, request.operation).bindCleanupDependencies([commandFailure, snapshotFailure]);
					result = err(returned);
					this.snapshotFailures.set(snapshot, new RetainedSnapshotFailure(returned, snapshotFailure));
				}
				if (snapshot !== undefined && this.snapshots.has(snapshot) && !result.ok && result.error.cleanupIncomplete && !this.snapshotFailures.has(snapshot)) this.snapshotFailures.set(snapshot, new RetainedSnapshotFailure(result.error, result.error));
				return result;
			}
			async inspectCapture(selection, snapshot, path, identity, signal, request, provider, client) {
				const withOutputCleanup = (cause, command) => {
					if (command.cleanup === undefined) return cause;
					return analysisErrorWithCleanupFailure(cause instanceof AnalysisError ? cause : new AnalysisProtocolError("Packet capture output parsing failed", { cause }), pcapCommandCleanupError(request.operation, snapshot.path, command.cleanup, command.capturedOutput), request.operation);
				};
				const info = await this.run("inspect_pcap_capture", "capinfos", selection.capinfos.command, [
					"-M",
					"-S",
					"--",
					snapshot.path
				], {
					timeoutMs: 6e4,
					maxOutputBytes: 64 * 1024
				}, signal, snapshot, path);
				let metadata;
				try {
					metadata = parseCapinfosOutput(info.stdout);
					if (metadata.sha256 !== null && metadata.sha256 !== identity.sha256) throw new AnalysisProtocolError("capinfos SHA256 disagrees with the owned capture snapshot", { diagnostics: {
						reason: "capture_sha256_mismatch",
						capinfos_sha256: metadata.sha256,
						snapshot_sha256: identity.sha256
					} });
				} catch (cause) {
					throw withOutputCleanup(cause, info);
				}
				if (info.cleanup !== undefined) throw pcapCommandCleanupError(request.operation, snapshot.path, info.cleanup, info.capturedOutput, pcapPartialEvidence(request, provider, path, identity, {
					client,
					target: {
						path,
						...identity
					},
					stage: "capinfos-complete-tshark-not-run",
					file_type: metadata.fileType,
					encapsulation: metadata.encapsulation,
					packet_count: metadata.packetCount,
					capture_start: metadata.captureStart,
					capture_end: metadata.captureEnd,
					capture_duration_seconds: metadata.captureDurationSeconds,
					snapshot_length: metadata.snapshotLength
				}, ["capinfos output was parsed from a complete bounded stream, but process-tree cleanup remains unconfirmed; tshark was not run"]));
				const dissected = await this.run("inspect_pcap_capture", "tshark", selection.tshark.command, [
					"-n",
					"-r",
					snapshot.path,
					"-T",
					"json",
					"--no-duplicate-keys",
					`--temp-dir=${snapshot.configurationPath}`,
					...FIELDS.flatMap((field) => ["-e", field])
				], {
					timeoutMs: 3e5,
					maxOutputBytes: TSHARK_JSON_MAX_BYTES
				}, signal, snapshot, path);
				const parseOutput = async (command, dnsStdout) => {
					try {
						return await parseTsharkJsonOutput(dissected.stdout, signal, dnsStdout);
					} catch (cause) {
						throw withOutputCleanup(cause, command);
					}
				};
				let fields = await parseOutput(dissected);
				let dnsDissected;
				let dnsLimitation;
				if (dissected.cleanup === undefined) {
					try {
						dnsDissected = await this.run("inspect_pcap_capture", "tshark", selection.tshark.command, [
							"-n",
							"-r",
							snapshot.path,
							"-T",
							"json",
							"--no-duplicate-keys",
							`--temp-dir=${snapshot.configurationPath}`,
							"-Y",
							"dns || mdns || llmnr",
							"-x",
							"-J",
							"frame dns mdns llmnr"
						], {
							timeoutMs: 3e5,
							maxOutputBytes: TSHARK_JSON_MAX_BYTES
						}, signal, snapshot, path);
						fields = await parseOutput(dnsDissected, dnsDissected.stdout);
					} catch (cause) {
						if (cause instanceof AnalysisError && cause.cleanupIncomplete) throw cause;
						if (!(cause instanceof AnalysisResourceConstraintError || cause instanceof AnalysisProtocolError || cause instanceof AnalysisOutputError || cause instanceof UnclassifiedProviderFailure)) throw cause;
						dnsLimitation = `DNS wire identity extraction was unavailable: ${dnsFailureReason(cause)}; producer queries and addresses are retained without inferred ownership`;
					}
				} else {
					dnsLimitation = "DNS wire identity extraction was not run because first-pass process cleanup remains unconfirmed; DNS coverage remains unknown";
				}
				if (dnsLimitation !== undefined) fields = {
					...fields,
					partial: true
				};
				await snapshot.verify(identity, path, signal);
				if (fields.packetCount !== metadata.packetCount) throw new AnalysisProtocolError(`capinfos counted ${String(metadata.packetCount)} packets but tshark returned ${String(fields.packetCount)}`, { diagnostics: {
					reason: "packet_count_mismatch",
					capinfos_packet_count: metadata.packetCount,
					tshark_packet_count: fields.packetCount
				} });
				const captured = {
					result: {
						target: {
							path,
							...identity
						},
						file_type: metadata.fileType,
						encapsulation: metadata.encapsulation,
						packet_count: metadata.packetCount,
						capture_start: metadata.captureStart,
						capture_end: metadata.captureEnd,
						capture_duration_seconds: metadata.captureDurationSeconds,
						diagnostics: {
							capinfos_stderr: info.stderr,
							tshark_stderr: [dissected.stderr, dnsDissected?.stderr ?? ""].filter(Boolean).join("\n")
						},
						snapshot_length: metadata.snapshotLength,
						endpoints: fields.endpoints,
						endpoint_count: fields.endpointCount,
						dns_queries: fields.dnsQueries,
						dns_query_count: fields.dnsQueryCount,
						tls_sni_values: fields.tlsSniValues,
						tls_sni_count: fields.tlsSniCount,
						protocol_distribution: fields.protocolDistribution,
						protocol_count: fields.protocolCount,
						http_request_uris: fields.httpRequestUris,
						http_request_uri_count: fields.httpRequestUriCount,
						http_uri_redaction_count: fields.httpUriRedactionCount,
						unattributed_dns_addresses: fields.unattributedDnsAddresses,
						unattributed_dns_address_count: fields.unattributedDnsAddressCount,
						unattributed_dns_packet_count: fields.unattributedDnsPackets,
						coverage: fields.partial ? "partial" : "complete"
					},
					limitations: [
						...fields.dnsLimitations.map((reason) => `DNS wire parsing: ${reason}`),
						...dnsLimitation === undefined ? [] : [dnsLimitation],
						...this.nativeLimitations,
						"Both tools read one owned snapshot; target identity comes from its admitted source descriptor",
						"DNS address attribution requires one wire-identified question in one decoded DNS message; declared truncation marks coverage partial. Only matching answer owners or unambiguous answer-section CNAME chains are associated. Authority, additional, unrelated and ambiguous addresses are retained separately as unattributed; these packet-local relationships do not prove final resolution",
						"Only bytes present in the saved capture are examined; encryption and capture truncation can hide higher-level fields",
						"HTTP URI inventory examines decoded HTTP/1 and HTTP/2 request fields; HTTP/3 URI semantics are outside this profile",
						...fields.partial ? ["One or more projected categories were capped, credential-bearing URIs were omitted or coalesced, DNS messages declare truncation, or DNS address attribution or HTTP URI targets remain unresolved; counts retain the examined totals"] : [],
						...fields.httpUriRedactionCount > 0 ? ["HTTP transport credentials were excluded; ambiguous credential spans cause the URI to be omitted"] : [],
						...fields.unattributedDnsPackets > 0 ? [`DNS address attribution was unresolved in ${String(fields.unattributedDnsPackets)} packet(s); unattributed addresses are retained separately`] : []
					]
				};
				const cleanupCommand = dissected.cleanup !== undefined ? dissected : dnsDissected;
				if (cleanupCommand?.cleanup !== undefined) {
					const full = pcapResultSchemas.inspect_pcap_capture.parse({
						client,
						...captured.result
					});
					throw pcapCommandCleanupError(request.operation, snapshot.path, cleanupCommand.cleanup, cleanupCommand.capturedOutput, pcapPartialEvidence(request, provider, path, identity, full, captured.limitations));
				}
				return captured;
			}
		};
	})))();
}

//#endregion
//#region dist/composition/pcap.js
var createPcapAnalysisProvider;
function init_pcap() {
	return (init_pcap = __esmMin((() => {
		init_PcapProvider();
		init_HostPlatform();
		createPcapAnalysisProvider = (environment = process.env, platform = HOST_PLATFORM.platform) => new PcapProvider({
			environment,
			platform
		});
	})))();
}

//#endregion
//#region dist/cli/pcapCommands.js
var pcapCommands_exports = /* @__PURE__ */ __exportAll({ registerPcapCommands: () => registerPcapCommands });
var registerPcapCommands;
function init_pcapCommands() {
	return (init_pcapCommands = __esmMin((() => {
		init_PcapAnalysisService();
		init_pcap();
		init_pcapToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		registerPcapCommands = (cli, logger, environment, provider = createPcapAnalysisProvider(environment)) => {
			const pcap = new PcapAnalysisService(provider);
			const service = (operation) => () => ({
				inspect: (input, options) => pcap.execute(operation, input, options),
				close: () => provider.close()
			});
			registerContractCommand(cli, logger, contractNamed(PCAP_TOOL_CONTRACTS, "inspect_pcap_client"), { description: "Inspect the caller-selected tshark and capinfos binaries without reading a capture" }, analyzeWithService(service("inspect_pcap_client"), "pcap"));
			registerContractCommand(cli, logger, contractNamed(PCAP_TOOL_CONTRACTS, "inspect_pcap_capture"), {
				description: "Inspect one pcap/pcapng capture: endpoints, DNS, TLS SNI, and protocol distribution",
				positionals: ["path"],
				callerPaths: ["path"],
				fields: { path: { description: "Local pcap or pcapng capture file to inspect" } },
				omit: { detail: "The one-shot command returns complete Evidence; summaries are retained by MCP sessions." }
			}, inspectWithService(service("inspect_pcap_capture"), "pcap"));
		};
	})))();
}

//#endregion
export { init_pcapCommands, pcapCommands_exports };