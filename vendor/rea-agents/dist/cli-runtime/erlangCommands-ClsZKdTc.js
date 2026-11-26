import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, ArtifactOperationError, decodeLimit, init_analysisErrorCore, init_artifactOperationError, init_parseFailure, init_sha256Hex, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { init_parseFailureAnalysisError, isParseLimit, parseLimitConstraint } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ArtifactReaderFailure, ArtifactResourceScope, artifactFilePrimaryFacts, artifactSelectedPathErrno, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_readStableArtifact, init_resources, projectArtifactCloseFailure, projectOwnedArtifactIdentityFailure, projectStableArtifactFailure, readStableArtifact, stableArtifactInputFailure } from "./resources-B3P64jvH.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { contractNamed, deliverWithService, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { MAX_INSPECT_ERLANG_BEAM_ATOMS, MAX_INSPECT_ERLANG_BEAM_FILE_BYTES, MAX_INSPECT_ERLANG_BEAM_TABLE_ROWS, erlangBeamSchema, init_beam, inspectErlangBeamInputSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { ERLANG_BEAM_TOOL_CONTRACTS, init_beamToolContracts } from "./beamToolContracts-CuwVbLlX.js";
import { isUtf8 } from "node:buffer";

//#region dist/application/erlang/BeamService.js
var OPERATION$1, BeamService, validReport;
function init_BeamService() {
	return (init_BeamService = __esmMin((() => {
		init_analysisErrorCore();
		init_evidence();
		init_beam();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		OPERATION$1 = "inspect_erlang_beam";
		BeamService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close();
			}
			async inspect(rawInput, options) {
				const input = parseAnalysisInput(OPERATION$1, rawInput, inspectErlangBeamInputSchema, options?.signal);
				if (!input.ok) return input;
				const result = await this.provider.inspect(input.value, options);
				if (!result.ok) return result;
				const report = erlangBeamSchema.safeParse(result.value);
				if (!report.success || report.data.artifact.path !== input.value.path || !validReport(report.data, input.value.max_chunks, input.value.max_atoms, input.value.max_file_bytes)) return err(new AnalysisOutputError(OPERATION$1, "BEAM provider returned malformed output or changed artifact identity."));
				const value = report.data;
				return completeProviderEvidence(createEvidence({
					path: value.artifact.path,
					format: "file",
					sha256: value.artifact.sha256
				}, this.provider.identity, {
					operation: OPERATION$1,
					parameters: input.value,
					result: value,
					confidence: "observed",
					limitations: value.limitations,
					locations: [{
						kind: "artifact-path",
						path: value.artifact.path
					}, {
						kind: "file-offset-range",
						start: value.form.location.offset,
						end: value.form.location.offset + value.form.location.bytes
					}]
				}), options?.signal);
			}
		};
		validReport = (report, maxChunks, maxAtoms, maxBytes) => {
			const inside = ({ offset, bytes }) => offset <= report.artifact.bytes - bytes;
			if (report.artifact.bytes > maxBytes || report.coverage.examined_chunks > maxChunks || report.chunks.length > maxChunks || report.coverage.atoms > maxAtoms || report.atoms !== null && report.atoms.length > maxAtoms) return false;
			if (!inside(report.form.location)) return false;
			if (report.code !== null && !inside(report.code.instructions)) return false;
			return report.chunks.every((chunk) => inside(chunk.location) && inside(chunk.payload.location));
		};
	})))();
}

//#endregion
//#region dist/erlang/ErlangBeamProviderIdentity.js
var ERLANG_BEAM_PROVIDER_IDENTITY;
function init_ErlangBeamProviderIdentity() {
	return (init_ErlangBeamProviderIdentity = __esmMin((() => {
		ERLANG_BEAM_PROVIDER_IDENTITY = {
			id: "rea-erlang-beam",
			name: "REA Erlang BEAM reader",
			version: "1"
		};
	})))();
}

//#endregion
//#region dist/erlang/BeamParser.js
var fail, LIMITATIONS, requireRange, atomAt, atomLength, compactUnsigned, readCompactUnsignedBytes, parseAtoms, frameRows, parseRows, parseCode, parseErlangBeam;
function init_BeamParser() {
	return (init_BeamParser = __esmMin((() => {
		init_resources();
		init_binaryContainer();
		init_parseFailure();
		init_beam();
		init_sha256Hex();
		fail = (message) => {
			throw new ArtifactReaderFailure("format", message);
		};
		LIMITATIONS = ["This workflow does not execute BEAM bytecode, inflate LitT literals, or decode Attr/CInf external-term payloads.", "Atom names are structural table entries; they do not authenticate the originating compiler or module checksum."];
		requireRange = (bytes, offset, length) => {
			if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || offset < 0 || length < 0 || offset > bytes.length - length) fail(`BEAM range ${String(offset)} + ${String(length)} leaves the artifact.`);
		};
		atomAt = (atoms, index) => {
			if (atoms === null || index < 1) return null;
			return atoms[index - 1]?.name ?? null;
		};
		atomLength = (payload, at, compact) => {
			if (at >= payload.length) fail("BEAM atom table is truncated.");
			const first = payload[at];
			if (!compact) return [first, at + 1];
			const decoded = compactUnsigned(payload, at);
			if (decoded.value > BigInt(payload.length - decoded.next)) fail("BEAM atom table is truncated.");
			return [Number(decoded.value), decoded.next];
		};
		compactUnsigned = (payload, at) => {
			let cursor = at;
			let value;
			for (;;) {
				if (cursor >= payload.length) fail("BEAM atom table is truncated.");
				const first = payload[cursor];
				if ((first & 7) !== 0) fail("BEAM atom length is not a u tag.");
				if ((first & 8) === 0) {
					value = BigInt(first >> 4);
					cursor += 1;
					break;
				}
				if ((first & 16) === 0) {
					if (cursor + 1 >= payload.length) fail("BEAM atom table is truncated.");
					value = BigInt(first >> 5 << 8 | payload[cursor + 1]);
					cursor += 2;
					break;
				}
				const byteCountCode = first >> 5;
				cursor += 1;
				if (byteCountCode === 7) fail("BEAM atom length encoding overflows.");
				value = readCompactUnsignedBytes(payload, cursor, byteCountCode + 2);
				cursor += byteCountCode + 2;
				break;
			}
			return {
				value,
				next: cursor
			};
		};
		readCompactUnsignedBytes = (payload, at, byteCount) => {
			if (byteCount > payload.length - at) fail("BEAM atom table is truncated.");
			const maxValue = 9223372036854775807n;
			let value = 0n;
			for (let index = 0; index < byteCount; index += 1) {
				const byte = BigInt(payload[at + index]);
				if (value > maxValue - byte >> 8n) fail("BEAM atom length encoding overflows.");
				value = value << 8n | byte;
			}
			return value;
		};
		parseAtoms = (payload, maxAtoms, format) => {
			if (payload.length < 4) fail("BEAM atom table is truncated.");
			const encoding = format === "AtU8" ? "utf8" : "latin1";
			const rawCount = new BinaryReader(payload, false, "beam").u32(0);
			const declared = format === "AtU8" ? rawCount | 0 : rawCount;
			const compact = format === "AtU8" && declared < 0;
			const count = compact ? -declared : declared;
			if (count > payload.length - 4) fail("BEAM atom table is truncated.");
			const overBudget = count > maxAtoms;
			const atoms = [];
			const examined = Math.min(count, maxAtoms);
			let at = 4;
			for (let index = 1; index <= examined; index += 1) {
				const [length, next] = atomLength(payload, at, compact);
				if (length > payload.length - next - (count - index)) fail("BEAM atom table is truncated.");
				at = next + length;
				if (overBudget) continue;
				const nameBytes = payload.subarray(next, at);
				if (encoding === "utf8" && !isUtf8(nameBytes)) fail("BEAM atom name is not valid UTF-8.");
				atoms.push({
					index,
					name: nameBytes.toString(encoding)
				});
			}
			if (overBudget) throw decodeLimit("beam", `BEAM atom table exceeds the ${String(maxAtoms)}-atom budget.`, {
				name: "max_atoms",
				maximum: maxAtoms,
				required: count
			});
			return {
				atoms,
				trailingBytes: payload.length - at
			};
		};
		frameRows = (payload, width, label) => {
			if (payload.length < 4) fail(`BEAM ${label} table is truncated.`);
			const reader = new BinaryReader(payload, false, "beam");
			const count = reader.u32(0);
			const rowBytes = width * 4;
			const bytesRead = 4 + count * rowBytes;
			if (bytesRead > payload.length) fail(`BEAM ${label} table is truncated.`);
			return {
				reader,
				count,
				rowBytes,
				trailingBytes: payload.length - bytesRead
			};
		};
		parseRows = ({ reader, count, rowBytes }) => {
			const rows = [];
			for (let index = 0; index < count; index += 1) {
				const row = [];
				const start = 4 + index * rowBytes;
				for (let fieldOffset = 0; fieldOffset < rowBytes; fieldOffset += 4) row.push(reader.u32(start + fieldOffset));
				rows.push(row);
			}
			return rows;
		};
		parseCode = (payload, chunkOffset) => {
			if (payload.length < 20) fail("BEAM Code chunk is truncated.");
			const reader = new BinaryReader(payload, false, "beam");
			const infoSize = reader.u32(0);
			if (infoSize < 16 || infoSize > payload.length - 4) fail("BEAM Code header size is invalid.");
			const instructionsOffset = 4 + infoSize;
			return {
				instruction_set: reader.u32(4),
				opcode_max: reader.u32(8),
				labels: reader.u32(12),
				functions: reader.u32(16),
				extra_header_bytes: infoSize - 16,
				instructions: {
					offset: chunkOffset + 8 + instructionsOffset,
					bytes: payload.length - instructionsOffset
				}
			};
		};
		parseErlangBeam = (bytes, artifact, input) => {
			requireRange(bytes, 0, 12);
			if (bytes.subarray(0, 4).toString("latin1") !== "FOR1") fail("Expected a FOR1 IFF container.");
			const carrier = new BinaryReader(bytes, false, "beam");
			const formSize = carrier.u32(4);
			if (formSize < 4) fail("BEAM form size is shorter than the BEAM tag.");
			requireRange(bytes, 8, formSize);
			if (bytes.subarray(8, 12).toString("latin1") !== "BEAM") fail("Expected a BEAM form type.");
			const formEnd = 8 + formSize;
			const form = new BinaryReader(carrier.range(0, formEnd, "BEAM form"), false, "beam");
			const chunks = [];
			const payloads = new Map();
			let at = 12;
			while (at < formEnd) {
				if (formEnd - at < 8) fail("BEAM chunk header is truncated.");
				const size = form.u32(at + 4);
				const payloadOffset = at + 8;
				if (size > formEnd - payloadOffset) fail("BEAM chunk payload exceeds the form.");
				const padded = payloadOffset + size + (4 - size % 4) % 4;
				if (padded > formEnd) fail("BEAM chunk padding exceeds the form.");
				if (chunks.length >= input.max_chunks) throw decodeLimit("beam", `BEAM form exceeds the ${String(input.max_chunks)}-chunk budget.`, {
					name: "max_chunks",
					maximum: input.max_chunks
				});
				const name = form.range(at, 4, "BEAM chunk name").toString("latin1");
				const payload = form.range(payloadOffset, size, "BEAM chunk payload");
				chunks.push({
					index: chunks.length,
					name,
					location: {
						offset: at,
						bytes: padded - at
					},
					payload: {
						location: {
							offset: payloadOffset,
							bytes: size
						},
						bytes: size,
						sha256: sha256Hex(payload)
					}
				});
				payloads.set(name, {
					payload,
					offset: at
				});
				at = padded;
			}
			const utf8AtomChunk = payloads.get("AtU8");
			const legacyAtomChunk = payloads.get("Atom");
			const useUtf8Atoms = utf8AtomChunk !== undefined && (utf8AtomChunk.payload.length > 0 || legacyAtomChunk === undefined);
			const atomChunk = useUtf8Atoms ? utf8AtomChunk : legacyAtomChunk;
			const atomFormat = atomChunk === undefined ? null : useUtf8Atoms ? "AtU8" : "Atom";
			const atomEncoding = atomFormat === null ? null : atomFormat === "AtU8" ? "utf8" : "latin1";
			const atomTable = atomChunk === undefined || atomFormat === null ? null : parseAtoms(atomChunk.payload, input.max_atoms, atomFormat);
			const atoms = atomTable?.atoms ?? null;
			const exportChunk = payloads.get("ExpT");
			const importChunk = payloads.get("ImpT");
			const lambdaChunk = payloads.get("FunT");
			const exportTable = exportChunk === undefined ? null : frameRows(exportChunk.payload, 3, "export");
			const importTable = importChunk === undefined ? null : frameRows(importChunk.payload, 3, "import");
			const lambdaTable = lambdaChunk === undefined || lambdaChunk.payload.length === 0 ? null : frameRows(lambdaChunk.payload, 6, "lambda");
			const tableRows = (exportTable?.count ?? 0) + (importTable?.count ?? 0) + (lambdaTable?.count ?? 0);
			if (tableRows > 65536) throw decodeLimit("beam", `BEAM tables exceed the ${String(MAX_INSPECT_ERLANG_BEAM_TABLE_ROWS)}-row budget.`, {
				name: "max_table_rows",
				maximum: MAX_INSPECT_ERLANG_BEAM_TABLE_ROWS,
				required: tableRows
			});
			const exports = exportTable === null ? null : parseRows(exportTable).map((row) => ({
				function_index: row[0],
				function: atomAt(atoms, row[0]),
				arity: row[1],
				label: row[2]
			}));
			const imports = importTable === null ? null : parseRows(importTable).map((row) => ({
				module_index: row[0],
				module: atomAt(atoms, row[0]),
				function_index: row[1],
				function: atomAt(atoms, row[1]),
				arity: row[2]
			}));
			const lambdas = lambdaTable === null ? null : parseRows(lambdaTable).map((row) => ({
				function_index: row[0],
				function: atomAt(atoms, row[0]),
				arity: row[1],
				label: row[2],
				index: row[3],
				free_vars: row[4],
				old_unique: row[5]
			}));
			const codeChunk = payloads.get("Code");
			const code = codeChunk === undefined ? null : parseCode(codeChunk.payload, codeChunk.offset);
			const trailingBytes = bytes.length - formEnd;
			const unexamined = [];
			if (trailingBytes > 0) unexamined.push(`The declared FOR1 form ends at offset ${String(formEnd)}; ${String(trailingBytes)} trailing ${trailingBytes === 1 ? "byte was" : "bytes were"} not examined.`);
			const tableTails = [
				[atomFormat, atomTable?.trailingBytes ?? 0],
				["ExpT", exportTable?.trailingBytes ?? 0],
				["ImpT", importTable?.trailingBytes ?? 0],
				["FunT", lambdaTable?.trailingBytes ?? 0]
			];
			for (const [name, extra] of tableTails) {
				if (extra > 0) unexamined.push(`The selected ${name} table has ${String(extra)} trailing ${extra === 1 ? "byte that was" : "bytes that were"} not examined.`);
			}
			return {
				artifact,
				form: {
					location: {
						offset: 0,
						bytes: formEnd
					},
					size: formSize
				},
				chunks,
				atoms,
				atom_encoding: atomEncoding,
				exports,
				imports,
				lambdas,
				code,
				module: atoms?.[0]?.name ?? null,
				coverage: {
					status: unexamined.length > 0 ? "partial" : "complete",
					examined_chunks: chunks.length,
					atoms: atoms?.length ?? 0,
					trailing_bytes: trailingBytes
				},
				limitations: [...LIMITATIONS, ...unexamined]
			};
		};
	})))();
}

//#endregion
//#region dist/erlang/BeamProvider.js
var OPERATION, BeamProvider, fileBudgetRemediation, parserBudgetRemediation, beamFailurePrimary, beamFailure;
function init_BeamProvider() {
	return (init_BeamProvider = __esmMin((() => {
		init_ErlangBeamProviderIdentity();
		init_resources();
		init_artifactOperationError();
		init_analysisErrorCore();
		init_beam();
		init_result();
		init_parseFailureAnalysisError();
		init_BeamParser();
		OPERATION = "inspect_erlang_beam";
		BeamProvider = class {
			identity = ERLANG_BEAM_PROVIDER_IDENTITY;
			#resources = new ArtifactResourceScope();
			async close() {
				try {
					await this.#resources.close();
				} catch (cause) {
					throw projectArtifactCloseFailure(cause, ERLANG_BEAM_PROVIDER_IDENTITY.id, OPERATION);
				}
			}
			async inspect(input, options) {
				let snapshot;
				try {
					return await this.#resources.run(async () => {
						snapshot = await readStableArtifact(input.path, input.max_file_bytes, options?.signal, undefined, this.#resources);
						return ok(parseErlangBeam(snapshot.bytes, {
							path: input.path,
							sha256: snapshot.sha256,
							bytes: snapshot.bytes.length
						}, input));
					});
				} catch (cause) {
					return err(beamFailure(cause, input, snapshot));
				}
			}
		};
		fileBudgetRemediation = (maximum) => maximum >= 536870912 ? `The file exceeds the ${String(MAX_INSPECT_ERLANG_BEAM_FILE_BYTES)}-byte input ceiling this operation accepts; select a smaller artifact.` : `Raise max_file_bytes above ${String(maximum)} bytes or select a smaller artifact; the limit is the caller-selected input read budget.`;
		parserBudgetRemediation = ({ name, maximum }) => {
			switch (name) {
				case "max_atoms": return maximum >= 65536 ? `The file exceeds the ${String(MAX_INSPECT_ERLANG_BEAM_ATOMS)}-atom ceiling this operation accepts; select a smaller artifact.` : `Raise max_atoms above ${String(maximum)} or select a smaller artifact; the limit is the caller-selected atom budget.`;
				case "max_table_rows": return `The file exceeds the ${String(maximum)}-row ceiling this operation accepts; select a smaller artifact.`;
				case "max_chunks": return maximum >= 256 ? `The file exceeds the ${String(256)}-chunk ceiling this operation accepts; select a smaller artifact.` : `Raise max_chunks above ${String(maximum)} or select a smaller artifact; the limit is the caller-selected chunk budget.`;
			}
			return undefined;
		};
		beamFailurePrimary = (facts, input) => {
			const { cause, origin } = facts;
			const identityFailure = projectOwnedArtifactIdentityFailure(facts, OPERATION, input.path);
			if (identityFailure !== undefined) return identityFailure;
			const reportedLimits = {
				max_file_bytes: input.max_file_bytes,
				max_chunks: input.max_chunks,
				max_atoms: input.max_atoms
			};
			if (origin === "owned-or-classified" && isParseLimit(cause, "beam")) {
				const { limit } = cause.failure;
				const remediationAction = parserBudgetRemediation(limit);
				return parseLimitConstraint(OPERATION, "capacity", cause, {
					reportedLimitContext: reportedLimits,
					legacyMaximumKey: limit.name,
					...remediationAction === undefined ? {} : { remediationAction },
					retryable: false
				});
			}
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure) {
				if (cause.reason === "limit") {
					return new AnalysisResourceConstraintError(OPERATION, cause.boundary ?? "memory", cause.message, reportedLimits, {
						cause,
						...cause.boundary === "file-size" ? {
							retryable: false,
							remediationAction: fileBudgetRemediation(input.max_file_bytes)
						} : {}
					});
				}
				if (cause.reason === "path" || cause.reason === "format") return stableArtifactInputFailure(cause, OPERATION);
			}
			if (cause instanceof Error && "code" in cause) {
				if (cause.code === "EACCES" || cause.code === "EPERM") return new AnalysisAccessDeniedError(OPERATION, input.path, cause.code, { cause });
				const pathErrno = artifactSelectedPathErrno(cause);
				if (pathErrno !== undefined) return new AnalysisInputError(OPERATION, { cause }, [{
					path: ["path"],
					reason: "invalid_value",
					message: `Selected BEAM file could not be read (${pathErrno}): ${input.path}.`
				}]);
			}
			return new ArtifactOperationError(OPERATION, origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure ? cause.reason : "io", undefined, cause instanceof Error ? cause.message : "BEAM inspection failed.", { cause });
		};
		beamFailure = (cause, input, snapshot) => {
			const primary = beamFailurePrimary(artifactFilePrimaryFacts(cause), input);
			return projectStableArtifactFailure(cause, primary, input.path, ERLANG_BEAM_PROVIDER_IDENTITY.id, OPERATION, snapshot);
		};
	})))();
}

//#endregion
//#region dist/composition/erlang.js
var createBeamService;
function init_erlang() {
	return (init_erlang = __esmMin((() => {
		init_BeamService();
		init_BeamProvider();
		createBeamService = () => new BeamService(new BeamProvider());
	})))();
}

//#endregion
//#region dist/cli/erlangCommands.js
var erlangCommands_exports = /* @__PURE__ */ __exportAll({ registerErlangCommands: () => registerErlangCommands });
var registerErlangCommands;
function init_erlangCommands() {
	return (init_erlangCommands = __esmMin((() => {
		init_erlang();
		init_beamToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		registerErlangCommands = (cli, logger) => {
			registerContractCommand(cli, logger, contractNamed(ERLANG_BEAM_TOOL_CONTRACTS, "inspect_erlang_beam"), {
				description: "Inspect Erlang BEAM atoms, exports, imports and Code header without executing bytecode",
				positionals: ["path"],
				callerPaths: ["path"],
				evidenceDelivery: true,
				viewDelivery: { invalidJson: "view must be valid JSON" },
				fields: {
					path: { description: "Local BEAM file" },
					view: { description: "JSON beam view; requires --detail summary and --evidence_output" }
				}
			}, deliverWithService(createBeamService, "rea-erlang-beam"));
		};
	})))();
}

//#endregion
export { erlangCommands_exports, init_erlangCommands };