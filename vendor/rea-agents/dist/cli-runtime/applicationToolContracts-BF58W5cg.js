import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { APPLE_BUNDLE_EXTENSION, AnalysisInputError, STABLE_IDENTIFIER_PATTERN, absoluteLocalPathStringSchema, init_analysisErrorCore, init_appleBundleTypes, init_coverage, init_localPath, init_schemaAnnotations, init_stringPatterns, knownCoverageStatusSchema, presentObjectRoot } from "./jsonSerialization-DAF9DVXC.js";
import { BinaryReader, compareUnicodeCodePoints, compositeKey, init_binaryContainer, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_inputIssueProjection, projectInputIssues } from "./inputIssueProjection-W-zXU1iH.js";
import { artifactGraphDigest, artifactIdForContent, artifactManifestId, digestCanonicalValue, init_artifactIdentity, init_canonicalDigest, occurrenceIdForLocation } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { canonicalJson, compareOffsetDateTimeInstants, createEvidence, evidenceAuthoritySchema, evidenceSubjectDisplay, init_comparisonSemantics, init_evidence, init_evidenceFormat, init_offsetDateTime, offsetDateTimeInstantFromEpochMilliseconds, offsetDateTimeSchema, parseOffsetDateTimeInstant } from "./nativeValueFlow-13oOEkkJ.js";
import { init_canonicalOrdering, uniqueSorted, uniqueSortedBy } from "./canonicalOrdering-C7Yzy62j.js";
import { digestSchema, init_digests, init_targetIdentity, prefixedDigestSchema, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_ntfsMft } from "./espFlashSelection-DrhknbQ_.js";
import { init_artifactFormatMetadata, ntfsMftMetadataSchema } from "./artifactFormatMetadata-CgSGovld.js";
import { artifactInventoryResultSchema, init_artifactGraph } from "./artifactGraph-D-c8dgaG.js";
import { init_textSchemas, nonEmptyTextSchema } from "./textSchemas-UeTwLioW.js";
import { hasCompleteInventoryCoverage, init_artifactInventoryEvidence } from "./artifactInventoryEvidence-Cn2dkXxx.js";
import { evidenceBundleSchema, init_evidenceBundle, readEvidenceBundle } from "./evidenceBundle-CWOVHJ6o.js";
import { applicationFeatureTraceResultSchema, init_javascriptFeatureTraceSchemas, init_sourceToBundleComparisonSchemas, init_staticObservedEndpointSchemas, sourceToBundleComparisonResultSchema, staticObservedEndpointComparisonSchema } from "./featureTraceView-CDxdbO2M.js";
import { createWebTextArtifact, init_webContentArtifact } from "./browserObservationSchemas-D0tzRJhs.js";
import { emptyArraySchema, init_emptyArraySchema } from "./emptyArraySchema-CqZKVQhm.js";
import { apiContractPageViewResultSchema, apiContractSummaryViewResultSchema, endpointComparisonPageViewResultSchema, endpointComparisonSummaryViewResultSchema, featureTraceSummaryViewResultSchema, featureTraceViewResultSchema, graphqlContractPageViewResultSchema, init_analysisViewResult, playwrightTracePageViewResultSchema, playwrightTraceSummaryViewResultSchema, sourceToBundlePageViewResultSchema, sourceToBundleSummaryViewResultSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { apiContractSchema, graphqlContractSchema, init_apiContract, init_graphqlContract } from "./graphqlContract-CtyDSGFM.js";
import { init_apiContractQuery, inspectApiContractInputSchema } from "./apiContractQuery-BiMZBchi.js";
import { init_playwrightTrace, playwrightTraceSchema } from "./playwrightTrace-CY5VynIY.js";
import { init_playwrightTraceQuery, inspectPlaywrightTraceInputSchema } from "./playwrightTraceQuery-CfUtrJbO.js";
import { JAVASCRIPT_SEMANTIC_RELATION_FAMILIES, applicationCoverageStatusSchema, completeApplicationCoverage, init_javascriptApplicationEvidenceSchemas, init_javascriptSemanticGraphSchemas, partialApplicationCoverage } from "./javascriptSemanticGraphSchemas-Cmwji5L9.js";
import { JAVASCRIPT_APPLICATION_NODE_KINDS, createJavaScriptApplicationGraph, createJavaScriptApplicationNode, init_javascriptApplicationGraph, init_javascriptApplicationGraphSchemas, isValidatedImmutableJavaScriptApplicationGraph, javascriptApplicationGraphSchema } from "./javascriptSourceSelection-CZ4gLy-b.js";
import { createHistoricalSourceGraph, init_referenceSourceGraph } from "./referenceSourceGraph-Bt5EfEba.js";
import { JavaScriptSemanticEvidenceContextRegistry, createJavaScriptSemanticGraph, createJavaScriptSemanticGraphNode, init_javascriptApplicationAnalysis, init_javascriptSemanticGraph, javascriptApplicationAnalysisResultSchema } from "./javascriptModuleUnits-YkbK0IJF.js";
import { evidenceEffects, evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { JAVASCRIPT_APPLICATION_EVIDENCE_EXAMPLE, JAVASCRIPT_RUNTIME_RECONCILIATION_EXAMPLE, compareApplicationVersionsRequestSchema, compareJavaScriptExportShapesRequestSchema, compareSourceToBundleRequestSchema, compareStaticObservedEndpointsRequestSchema, init_applicationWorkflowInputContracts, init_javascriptExportShapeComparisonSchemas, init_javascriptRuntimeReconciliationExample, init_javascriptRuntimeReconciliationSchemas, init_javascriptSemanticTraceSchemas, javaScriptExportShapeComparisonResultSchema, javaScriptSemanticTraceResultSchema, reconcileJavaScriptRuntimeInputSchema, traceApplicationFeatureToolRequestSchema, traceJavaScriptSemanticsRequestSchema } from "./javascriptRuntimeReconciliationExample-CfD5_IWS.js";
import { analyzeJavaScriptSemantics, init_javascriptSemanticAnalysis } from "./javascriptSemanticAnalysis--51Xux_e.js";
import { init_apkV1MetadataName, isV1SignatureMetadataName } from "./apkV1MetadataName-BZeAKYtg.js";
import { init_nativeConvention, isSwiftRuntimeLibrary, nativeRuntimeConvention } from "./nativeConvention-C45X9yzb.js";
import { init_guidanceContracts, readGuidanceSectionInputSchema, readGuidanceSectionOutputSchema, searchGuidanceInputSchema, searchGuidanceOutputSchema } from "./guidanceContracts-CzjL8u61.js";
import { applicationInventoryProjectionInputSchema, bridgeCandidateCoverageSchema, init_bridgeCandidateProjection, init_mobileApplicationGraphProjection, projectCartesianCandidates, projectedBridgeCandidateSchema, projectedComponentSchema, projectedFileComponents, projectedInventoryEntries, projectionCoverage, projectionEvidenceIdSchema, projectionPathSchema, unavailableComponentSchema } from "./bridgeCandidateProjection-C2xt4OHc.js";
import { init_javascriptRuntimeReconciliation, readRuntimeReconciliationInput, reconcileJavaScriptRuntime } from "./javascriptRuntimeReconciliation-Qdw5uLTY.js";
import { init_javascriptExportReturnShapeProjection, projectJavaScriptExportReturnShapes } from "./javascriptExportReturnShapeProjection-CmuBFROx.js";
import { z } from "zod";

//#region dist/contracts/playwrightTraceToolContracts.js
var PLAYWRIGHT_TRACE_TOOL_CONTRACTS;
function init_playwrightTraceToolContracts() {
	return (init_playwrightTraceToolContracts = __esmMin((() => {
		init_playwrightTrace();
		init_playwrightTraceQuery();
		init_analysisViewResult();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		PLAYWRIGHT_TRACE_TOOL_CONTRACTS = [{
			name: "inspect_playwright_trace",
			cli: true,
			...toolContractMetadata("inspect_playwright_trace", evidenceEffects),
			kind: "application",
			description: "Inspect a local Playwright v10 trace ZIP offline, without browser replay or requests to recorded URLs. Returns action boundaries, console/network facts, screenshot/body references and archive/member/line provenance; no cross-stream total order or complete-capture claim. Context options, most action arguments/results, DOM and resource bytes are not analyzed; credentials use HAR/URL projection. Default summary retains supported Evidence. Use view {kind:\"playwright-trace\",collection:\"events\",kinds:[\"network\"],limit:10}, or streams/members/diagnostics pages. Text previews cover 256 UTF-16 units; event-text with exact event_id reads further chunks, and fields [\"text\"] selects full text. Paging does not raise parsing allowances; one archive import is admitted per decoder while retained views remain independent.",
			inputSchema: inspectPlaywrightTraceInputSchema,
			outputSchema: evidenceResultOf(z.union([
				playwrightTraceSchema,
				playwrightTraceSummaryViewResultSchema,
				playwrightTracePageViewResultSchema
			])),
			examples: [{
				title: "Read recorded network headlines without contacting endpoints",
				input: {
					path: "/captures/trace.zip",
					view: {
						kind: "playwright-trace",
						collection: "events",
						kinds: ["network"],
						limit: 10
					}
				}
			}]
		}];
	})))();
}

//#endregion
//#region dist/contracts/apiContractToolContracts.js
var API_CONTRACT_TOOL_CONTRACTS;
function init_apiContractToolContracts() {
	return (init_apiContractToolContracts = __esmMin((() => {
		init_graphqlContract();
		init_apiContract();
		init_apiContractQuery();
		init_analysisViewResult();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		API_CONTRACT_TOOL_CONTRACTS = [{
			name: "inspect_api_contract",
			cli: true,
			...toolContractMetadata("inspect_api_contract", evidenceEffects),
			kind: "application",
			description: "Inspect declared APIs in local OpenAPI JSON or GraphQL SDL without a session, network requests or target execution. OpenAPI 3.0/3.1/3.2 returns inline method/path operations with source pointers; references remain unresolved. format:\"graphql-sdl\" returns types/fields and optional operations_path bindings, preserving aliases, fragment/spread owners and unknowns without expanding fragments or claiming full operation validation. Default summary retains Evidence; view overrides detail. For HTTP rows use view {kind:\"api-contract\",collection:\"operations\",methods:[\"GET\"],limit:20}; GraphQL uses view {kind:\"graphql-contract\",collection:\"references\",limit:20}. inspect_analysis_view pages the same retained facts. Source declaration coverage stays separate from page exhaustion; paging does not increase parser allowances. Introspection, runtime behavior and contract comparison are outside scope.",
			inputSchema: inspectApiContractInputSchema,
			outputSchema: evidenceResultOf(z.union([
				apiContractSchema,
				graphqlContractSchema,
				apiContractSummaryViewResultSchema,
				apiContractPageViewResultSchema,
				graphqlContractPageViewResultSchema
			])),
			examples: [{
				title: "Bind local GraphQL selections to supplied SDL fields",
				input: {
					path: "/artifacts/schema.graphql",
					format: "graphql-sdl",
					operations_path: "/artifacts/queries.graphql",
					view: {
						kind: "graphql-contract",
						collection: "references",
						limit: 20
					}
				}
			}, {
				title: "Read selected declared HTTP operations without contacting servers",
				input: {
					path: "/artifacts/openapi.json",
					view: {
						kind: "api-contract",
						collection: "operations",
						methods: ["GET"],
						limit: 20
					}
				}
			}]
		}];
	})))();
}

//#endregion
//#region dist/domain/windows/ntfsUsnJournal.js
/** Walk acquired journal bytes in source order without accumulating records. */
function* readUsnJournal(bytes, startFileOffset = 0) {
	const journal = new BinaryReader(bytes, true, "ntfs-usn");
	let fileOffset = startFileOffset;
	while (fileOffset + COMMON_HEADER_BYTES <= bytes.length) {
		const length = journal.u32(fileOffset);
		if (length === 0 && journal.u32(fileOffset + 4) === 0) {
			const start = fileOffset;
			fileOffset += COMMON_HEADER_BYTES;
			if (fileOffset + COMMON_HEADER_BYTES <= bytes.length && journal.word(fileOffset, 64) === 0n) {
				fileOffset += COMMON_HEADER_BYTES;
				while (ZERO_PADDING_BLOCK.length <= bytes.length - fileOffset && ZERO_PADDING_BLOCK.compare(bytes, fileOffset, fileOffset + ZERO_PADDING_BLOCK.length) === 0) fileOffset += ZERO_PADDING_BLOCK.length;
				while (fileOffset + COMMON_HEADER_BYTES <= bytes.length && journal.word(fileOffset, 64) === 0n) fileOffset += COMMON_HEADER_BYTES;
			}
			yield err({
				kind: "padding",
				fileOffset: start,
				bytes: fileOffset - start
			});
			continue;
		}
		if (length < COMMON_HEADER_BYTES || length % 8 !== 0) {
			yield err({
				kind: "malformed",
				fileOffset
			});
			return;
		}
		if (length > bytes.length - fileOffset) {
			yield err({
				kind: "truncated",
				fileOffset
			});
			return;
		}
		const major = journal.u16(fileOffset + 4);
		const minor = journal.u16(fileOffset + 6);
		if (major !== 2 && major !== 3 && major !== 4 || minor !== 0) {
			yield err({
				kind: "unsupported",
				fileOffset,
				major,
				minor
			});
		} else {
			const record = new BinaryReader(journal.range(fileOffset, length, "USN record"), journal.little, journal.format);
			yield major === 4 ? readExtentRecord(record, fileOffset) : readNamedRecord(record, fileOffset, major);
		}
		fileOffset += length;
	}
	if (fileOffset < bytes.length) yield err({
		kind: "truncated",
		fileOffset
	});
}
var COMMON_HEADER_BYTES, ZERO_PADDING_BLOCK, USN_INLINE_EXTENT_LIMIT, readReference, readNamedRecord, readExtentRecord;
function init_ntfsUsnJournal() {
	return (init_ntfsUsnJournal = __esmMin((() => {
		init_binaryContainer();
		init_result();
		COMMON_HEADER_BYTES = 8;
		ZERO_PADDING_BLOCK = Buffer.alloc(64 * 1024);
		USN_INLINE_EXTENT_LIMIT = 16;
		readReference = (record, offset, width) => record.word(offset, 64) | (width === 16 ? record.word(offset + 8, 64) << 64n : 0n);
		readNamedRecord = (record, fileOffset, majorVersion) => {
			const referenceBytes = majorVersion === 2 ? 8 : 16;
			const body = COMMON_HEADER_BYTES + referenceBytes * 2;
			const headerBytes = body + 36;
			const recordBytes = record.bytes.length;
			if (recordBytes < headerBytes) return err({
				kind: "malformed",
				fileOffset
			});
			const nameBytes = record.u16(body + 32);
			const nameOffset = record.u16(body + 34);
			if (nameOffset < headerBytes || nameOffset % 2 !== 0 || nameBytes % 2 !== 0 || nameOffset + nameBytes > recordBytes) return err({
				kind: "malformed",
				fileOffset
			});
			return ok({
				majorVersion,
				referenceBytes,
				fileOffset,
				recordBytes,
				fileReference: readReference(record, 8, referenceBytes),
				parentReference: readReference(record, 8 + referenceBytes, referenceBytes),
				usn: BigInt.asIntN(64, record.word(body, 64)),
				timestampFileTime: record.word(body + 8, 64),
				reasonFlags: record.u32(body + 16),
				sourceFlags: record.u32(body + 20),
				securityId: record.u32(body + 24),
				fileAttributes: record.u32(body + 28),
				name: record.range(nameOffset, nameBytes, "USN filename").toString("utf16le")
			});
		};
		readExtentRecord = (record, fileOffset) => {
			const recordBytes = record.bytes.length;
			if (recordBytes < 64) return err({
				kind: "malformed",
				fileOffset
			});
			const extentCount = record.u16(60), extentSize = record.u16(62);
			if (extentSize < 16 || extentSize % 8 !== 0 || extentCount > Math.floor((recordBytes - 64) / extentSize)) return err({
				kind: "malformed",
				fileOffset
			});
			const extentSample = [];
			for (let index = 0; index < Math.min(extentCount, 16); index++) {
				const cursor = 64 + index * extentSize;
				extentSample.push({
					fileOffset: fileOffset + cursor,
					offset: BigInt.asIntN(64, record.word(cursor, 64)),
					length: BigInt.asIntN(64, record.word(cursor + 8, 64))
				});
			}
			return ok({
				majorVersion: 4,
				referenceBytes: 16,
				fileOffset,
				recordBytes,
				fileReference: readReference(record, 8, 16),
				parentReference: readReference(record, 24, 16),
				usn: BigInt.asIntN(64, record.word(40, 64)),
				reasonFlags: record.u32(48),
				sourceFlags: record.u32(52),
				timestampFileTime: null,
				securityId: null,
				fileAttributes: null,
				name: null,
				remainingExtents: record.u32(56),
				extentCount,
				extentSize,
				omittedExtents: extentCount - extentSample.length,
				extentSample
			});
		};
	})))();
}

//#endregion
//#region dist/domain/windows/ntfsJournalQuery.js
var NTFS_JOURNAL_OPERATION, NTFS_JOURNAL_PROVIDER, NTFS_JOURNAL_FILE_BYTES, offset, ntfsJournalRowLimitSchema, ntfsJournalInputSchema, sourceSchema, matchSchema, issueSchema, unsignedDecimal, signedDecimal, ntfsJournalResultSchema;
function init_ntfsJournalQuery() {
	return (init_ntfsJournalQuery = __esmMin((() => {
		init_ntfsMft();
		init_artifactFormatMetadata();
		init_ntfsUsnJournal();
		init_digests();
		init_localPath();
		NTFS_JOURNAL_OPERATION = "inspect_ntfs_journal";
		NTFS_JOURNAL_PROVIDER = {
			id: "rea-ntfs-journal",
			name: "REA offline NTFS change journal",
			version: "1"
		};
		NTFS_JOURNAL_FILE_BYTES = 64 * 1024 * 1024;
		offset = z.int().nonnegative();
		ntfsJournalRowLimitSchema = z.int().min(1).max(200).default(50).describe("Maximum journal event or coverage rows in this page (1–200; default 50).");
		ntfsJournalInputSchema = z.strictObject({
			mft_path: absoluteLocalPathStringSchema,
			journal_path: absoluteLocalPathStringSchema,
			start_file_offset: offset.default(0).describe("Begin decoding exactly at this source offset, normally the prior nextFileOffset for unchanged input digests. Earlier bytes are not examined."),
			max_rows: ntfsJournalRowLimitSchema,
			mft_record_limit: z.int().min(0).max(32).default(0).describe("MFT record details to include (0–32). Default 0 returns inventory counts. Detail pages share a 32-additional-record budget for extension metadata, with up to 32 attribute-list reference results per base record and explicit partial coverage."),
			mft_record_start: offset.default(0).describe("First MFT stream slot in the requested detail page; use next_record_header_index with unchanged acquisition digests.")
		});
		sourceSchema = z.strictObject({
			path: absoluteLocalPathStringSchema,
			bytes: offset,
			sha256: digestSchema
		});
		matchSchema = z.discriminatedUnion("kind", [z.strictObject({
			kind: z.literal("matched"),
			record: z.strictObject({
				index: offset,
				sequenceNumber: offset,
				fileOffset: offset
			})
		}), z.strictObject({ kind: z.enum(["unresolved", "ambiguous"]) })]);
		issueSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("padding"),
				fileOffset: offset,
				bytes: offset
			}),
			z.strictObject({
				kind: z.enum(["malformed", "truncated"]),
				fileOffset: offset
			}),
			z.strictObject({
				kind: z.literal("unsupported"),
				fileOffset: offset,
				major: offset,
				minor: offset
			})
		]);
		unsignedDecimal = z.string().regex(/^(?:0|[1-9][0-9]*)$/u);
		signedDecimal = z.string().regex(/^(?:0|-?[1-9][0-9]*)$/u);
		ntfsJournalResultSchema = z.strictObject({
			mft: sourceSchema,
			journal: sourceSchema,
			mftMetadata: ntfsMftMetadataSchema,
			rows: z.array(z.discriminatedUnion("kind", [z.strictObject({
				kind: z.literal("event"),
				event: z.strictObject({
					majorVersion: z.union([
						z.literal(2),
						z.literal(3),
						z.literal(4)
					]),
					referenceBytes: z.union([z.literal(8), z.literal(16)]),
					fileOffset: offset,
					recordBytes: offset,
					fileReference: unsignedDecimal,
					parentReference: unsignedDecimal,
					usn: signedDecimal,
					timestampFileTime: unsignedDecimal.nullable(),
					reasonFlags: offset,
					sourceFlags: offset,
					securityId: offset.nullable(),
					fileAttributes: offset.nullable(),
					name: z.string().nullable(),
					remainingExtents: offset.exactOptional(),
					extentSize: offset.exactOptional(),
					extentCount: offset.exactOptional(),
					omittedExtents: offset.exactOptional(),
					extentSample: z.array(z.strictObject({
						fileOffset: offset,
						offset: signedDecimal,
						length: signedDecimal
					})).max(16).exactOptional(),
					mft: z.strictObject({
						file: matchSchema,
						parent: matchSchema
					})
				})
			}), z.strictObject({
				kind: z.literal("coverage"),
				issue: issueSchema
			})])),
			historyCompleteness: z.literal("unknown").describe("Acquired bytes alone do not establish absent history, journal wrap, or missing captures."),
			nextFileOffset: offset.nullable(),
			mftLimitations: z.array(z.string())
		});
	})))();
}

//#endregion
//#region dist/contracts/ntfsJournalToolContracts.js
var NTFS_JOURNAL_TOOL_CONTRACTS;
function init_ntfsJournalToolContracts() {
	return (init_ntfsJournalToolContracts = __esmMin((() => {
		init_ntfsJournalQuery();
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		NTFS_JOURNAL_TOOL_CONTRACTS = [{
			name: NTFS_JOURNAL_OPERATION,
			cli: true,
			...toolContractMetadata(NTFS_JOURNAL_OPERATION, evidenceEffects),
			kind: "application",
			description: "Inspect USN V2/V3/V4 records from a local acquired NTFS journal with a caller-paired MFT from the same volume. Reads at most 64 MiB per file. Returns source-order events, explicit coverage rows, both SHA-256 identities, and nextFileOffset for another page using the same inputs. V2 MFT references include sequence numbers; opaque V3/V4 IDs remain unresolved. MFT inventory counts are inline by default; select mft_record_limit for up to 32 detailed records, including identity-checked extension attributes and explicit link coverage. V4 returns at most 16 extent samples per event with explicit omissions. History completeness remains unknown. Other journal versions and unverifiable references remain explicit. Reads only the selected acquisition files.",
			inputSchema: ntfsJournalInputSchema,
			outputSchema: evidenceResultOf(ntfsJournalResultSchema),
			examples: [{
				title: "Read a page of a paired NTFS acquisition",
				input: {
					mft_path: "/artifacts/$MFT",
					journal_path: "/artifacts/UsnJrnl-J",
					max_rows: 50
				}
			}]
		}];
	})))();
}

//#endregion
//#region dist/contracts/javascript/staticObservedEndpointExample.js
var STATIC_OBSERVED_ENDPOINT_COMPARISON_EXAMPLE;
function init_staticObservedEndpointExample() {
	return (init_staticObservedEndpointExample = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		init_javascriptRuntimeReconciliationExample();
		STATIC_OBSERVED_ENDPOINT_COMPARISON_EXAMPLE = {
			application: JAVASCRIPT_APPLICATION_EVIDENCE_EXAMPLE,
			capture: createEvidence(unknownTarget("not-observed"), {
				id: "rea-example-har",
				name: "Example HAR",
				version: "1"
			}, {
				operation: "inspect_web_network_capture",
				parameters: { sensitive_value_count: 0 },
				result: {
					artifact: {
						path: "/capture.har",
						sha256: null,
						bytes: 0
					},
					format: "har",
					decoder: {
						id: "rea-example-har",
						name: "Example HAR",
						version: "1"
					},
					container: {
						reported: {},
						numeric_literals: [],
						redactions: [],
						records_pointer: "/log/entries"
					},
					total_records: 0,
					records: [],
					runtime_attribution: "unknown",
					limitations: ["Empty illustrative capture, not a runtime measurement."]
				},
				confidence: "observed"
			}),
			origin: "https://example.test"
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptApplicationVersionComparisonSchemas.js
var evidenceIdSchema$2, nodeIdSchema, validateApplicationVersionIdentities, evidenceIdentitySchema, applicationVersionIdentitiesSchema, candidateNodesSchema, exactMatchSchema, sourceMapMatchSchema, inferredMatchSchema, matchedItemMatchSchema, unmatchedItemMatchSchema, leftAmbiguousMatchSchema, rightAmbiguousMatchSchema, comparisonItemContextShape, comparisonItemSchema, comparisonCoverageSchema, applicationVersionComparisonResultSchema, ownedApplicationVersionComparisonResultSchema;
function init_javascriptApplicationVersionComparisonSchemas() {
	return (init_javascriptApplicationVersionComparisonSchemas = __esmMin((() => {
		init_emptyArraySchema();
		init_javascriptApplicationGraph();
		init_javascriptApplicationGraphSchemas();
		init_digests();
		init_textSchemas();
		init_javascriptApplicationEvidenceSchemas();
		evidenceIdSchema$2 = prefixedDigestSchema("ev");
		nodeIdSchema = prefixedDigestSchema("jag_node");
		validateApplicationVersionIdentities = (input, context) => {
			if (input.left.evidence_id === input.right.evidence_id) context.addIssue({
				code: "custom",
				path: ["right"],
				message: "Application version Evidence must be distinct"
			});
			for (const side of ["left_native_observations", "right_native_observations"]) {
				const ids = input[side].map(({ evidence_id: id }) => id);
				if (new Set(ids).size !== ids.length) context.addIssue({
					code: "custom",
					path: [side],
					message: "Native observations must be unique on each side"
				});
			}
		};
		evidenceIdentitySchema = z.object({ evidence_id: evidenceIdSchema$2 });
		applicationVersionIdentitiesSchema = z.object({
			left: evidenceIdentitySchema,
			right: evidenceIdentitySchema,
			left_native_observations: z.array(evidenceIdentitySchema),
			right_native_observations: z.array(evidenceIdentitySchema)
		}).superRefine(validateApplicationVersionIdentities);
		candidateNodesSchema = z.tuple([nodeIdSchema], nodeIdSchema).check(z.minLength(1));
		exactMatchSchema = z.strictObject({
			status: z.literal("matched"),
			basis: z.enum([
				"exact-node-identity",
				"exact-content-digest",
				"exact-module-source-digest"
			]),
			confidence: z.literal("exact"),
			candidate_left_node_ids: emptyArraySchema,
			candidate_right_node_ids: emptyArraySchema
		});
		sourceMapMatchSchema = z.strictObject({
			status: z.literal("matched"),
			basis: z.literal("source-map-identity"),
			confidence: z.literal("high"),
			candidate_left_node_ids: emptyArraySchema,
			candidate_right_node_ids: emptyArraySchema
		});
		inferredMatchSchema = z.strictObject({
			status: z.literal("matched"),
			basis: z.enum(["structural-fingerprint", "semantic-key"]),
			confidence: z.literal("medium"),
			candidate_left_node_ids: emptyArraySchema,
			candidate_right_node_ids: emptyArraySchema
		});
		matchedItemMatchSchema = z.union([
			exactMatchSchema,
			sourceMapMatchSchema,
			inferredMatchSchema
		]);
		unmatchedItemMatchSchema = z.strictObject({
			status: z.literal("unmatched"),
			basis: z.literal("none"),
			confidence: z.literal("unknown"),
			candidate_left_node_ids: emptyArraySchema,
			candidate_right_node_ids: emptyArraySchema
		});
		leftAmbiguousMatchSchema = z.strictObject({
			status: z.literal("ambiguous"),
			basis: z.literal("none"),
			confidence: z.literal("unknown"),
			candidate_left_node_ids: emptyArraySchema,
			candidate_right_node_ids: candidateNodesSchema
		});
		rightAmbiguousMatchSchema = z.strictObject({
			status: z.literal("ambiguous"),
			basis: z.literal("none"),
			confidence: z.literal("unknown"),
			candidate_left_node_ids: candidateNodesSchema,
			candidate_right_node_ids: emptyArraySchema
		});
		comparisonItemContextShape = {
			item_id: prefixedDigestSchema("javc_item"),
			node_kind: z.enum(JAVASCRIPT_APPLICATION_NODE_KINDS),
			dimensions: z.array(z.enum([
				"content",
				"location",
				"properties",
				"relationships",
				"availability",
				"coverage"
			])),
			evidence_links: z.array(evidenceIdSchema$2).min(2),
			limitations: z.array(nonEmptyTextSchema)
		};
		comparisonItemSchema = z.union([
			z.strictObject({
				...comparisonItemContextShape,
				status: z.enum([
					"unchanged",
					"changed",
					"unknown"
				]),
				left_node_id: nodeIdSchema,
				right_node_id: nodeIdSchema,
				match: matchedItemMatchSchema
			}),
			z.strictObject({
				...comparisonItemContextShape,
				status: z.enum(["removed", "unknown"]),
				left_node_id: nodeIdSchema,
				right_node_id: z.null(),
				match: unmatchedItemMatchSchema
			}),
			z.strictObject({
				...comparisonItemContextShape,
				status: z.enum(["added", "unknown"]),
				left_node_id: z.null(),
				right_node_id: nodeIdSchema,
				match: unmatchedItemMatchSchema
			}),
			z.strictObject({
				...comparisonItemContextShape,
				status: z.literal("unknown"),
				left_node_id: nodeIdSchema,
				right_node_id: z.null(),
				match: leftAmbiguousMatchSchema
			}),
			z.strictObject({
				...comparisonItemContextShape,
				status: z.literal("unknown"),
				left_node_id: z.null(),
				right_node_id: nodeIdSchema,
				match: rightAmbiguousMatchSchema
			})
		]);
		comparisonCoverageSchema = z.strictObject({
			left_graph_status: applicationCoverageStatusSchema,
			right_graph_status: applicationCoverageStatusSchema,
			left_graph_omitted_count: z.int().min(0).nullable(),
			right_graph_omitted_count: z.int().min(0).nullable(),
			/**
			* `unknown` when either source graph's coverage is unknown or unavailable;
			* `truncated` and `partial` are known gaps.
			*/
			status: z.enum([
				"complete-within-inputs",
				"partial",
				"truncated",
				"unknown"
			])
		});
		applicationVersionComparisonResultSchema = z.strictObject({
			comparison_id: prefixedDigestSchema("javc"),
			left: z.strictObject({
				evidence_id: evidenceIdSchema$2,
				graph_id: prefixedDigestSchema("jag"),
				root_artifact_sha256: z.string().regex(/^[a-f0-9]{64}$/u)
			}),
			right: z.strictObject({
				evidence_id: evidenceIdSchema$2,
				graph_id: prefixedDigestSchema("jag"),
				root_artifact_sha256: z.string().regex(/^[a-f0-9]{64}$/u)
			}),
			summary: z.strictObject({
				unchanged: z.int().min(0),
				added: z.int().min(0),
				removed: z.int().min(0),
				changed: z.int().min(0),
				unknown: z.int().min(0)
			}),
			matching: z.strictObject({
				exact_node_identity: z.int().min(0),
				exact_content_digest: z.int().min(0),
				exact_module_source_digest: z.int().min(0),
				source_map_identity: z.int().min(0),
				structural_fingerprint: z.int().min(0),
				semantic_key: z.int().min(0),
				ambiguous: z.int().min(0),
				unmatched: z.int().min(0)
			}),
			items: z.array(comparisonItemSchema),
			graph: javascriptApplicationGraphSchema,
			coverage: comparisonCoverageSchema,
			evidence_links: z.array(evidenceIdSchema$2).min(2),
			limitations: z.array(nonEmptyTextSchema)
		}).superRefine((result, context) => {
			const sourceGraphsComplete = result.coverage.left_graph_status === "complete" && result.coverage.right_graph_status === "complete";
			if (result.coverage.status === "complete-within-inputs" !== sourceGraphsComplete) context.addIssue({
				code: "custom",
				path: ["coverage", "status"],
				message: "Comparison coverage must match source graph completeness"
			});
			const sourceGraphUnknown = [result.coverage.left_graph_status, result.coverage.right_graph_status].some((status) => status === "unknown" || status === "unavailable");
			if (result.coverage.status === "unknown" !== sourceGraphUnknown) context.addIssue({
				code: "custom",
				path: ["coverage", "status"],
				message: "Comparison coverage is unknown exactly when a source graph's coverage is unknown or unavailable"
			});
		});
		ownedApplicationVersionComparisonResultSchema = applicationVersionComparisonResultSchema.safeExtend({ graph: z.custom(isValidatedImmutableJavaScriptApplicationGraph) });
	})))();
}

//#endregion
//#region dist/domain/reconstructionCoverageScope.js
var reconstructionCoverageScope, reachableSurfaces;
function init_reconstructionCoverageScope() {
	return (init_reconstructionCoverageScope = __esmMin((() => {
		reconstructionCoverageScope = (parsed, boundary) => {
			const claimIds = new Set(boundary.required_claim_ids);
			const claimSurfaceIds = new Map();
			for (const claimId of claimIds) {
				const claim = parsed.claims.get(claimId);
				if (claim !== undefined) claimSurfaceIds.set(claimId, reachableSurfaces(claim.surface_ids, parsed.surfaces).surfaceIds);
			}
			return {
				...reachableSurfaces([...boundary.required_surface_ids, ...[...claimSurfaceIds.values()].flatMap((ids) => [...ids])], parsed.surfaces),
				claimIds,
				claimSurfaceIds
			};
		};
		reachableSurfaces = (roots, surfaces) => {
			const surfaceIds = new Set(roots);
			const pending = [...surfaceIds];
			const missingDependencies = new Map();
			for (let index = 0; index < pending.length; index += 1) {
				const surface = surfaces.get(pending[index]);
				if (surface === undefined) continue;
				for (const dependencyId of surface.dependency_surface_ids) {
					if (!surfaces.has(dependencyId)) {
						const dependents = missingDependencies.get(dependencyId) ?? new Set();
						dependents.add(surface.surface_id);
						missingDependencies.set(dependencyId, dependents);
					}
					if (!surfaceIds.has(dependencyId)) {
						surfaceIds.add(dependencyId);
						pending.push(dependencyId);
					}
				}
			}
			return {
				surfaceIds,
				missingDependencies
			};
		};
	})))();
}

//#endregion
//#region dist/domain/reconstructionUnknowns.js
var reconstructionUnknownHeads, reconstructionClaimUnknowns, reconstructionProbes, defaultProbe;
function init_reconstructionUnknowns() {
	return (init_reconstructionUnknowns = __esmMin((() => {
		init_canonicalOrdering();
		init_unicodeCodePointOrder();
		reconstructionUnknownHeads = (revisions) => {
			const heads = new Map();
			for (const item of revisions) {
				const current = heads.get(item.unknown_id);
				if (current === undefined || current.revision < item.revision) heads.set(item.unknown_id, item);
			}
			return heads;
		};
		reconstructionClaimUnknowns = (heads, comparisonId, sourceIds, dimensions) => {
			const appliesToClaim = (item) => {
				const scope = item.comparison_conclusion_scope;
				return scope === undefined || scope.comparison_evidence_id === comparisonId && (dimensions === undefined || dimensions.includes("overall") || scope.dimensions.some((dimension) => dimensions.includes(dimension)));
			};
			const evidenceIds = new Set([comparisonId, ...sourceIds]);
			const relevantIds = new Set([...heads.values()].filter((item) => item.status !== "resolved" && appliesToClaim(item) && [...item.supporting_evidence_ids, ...item.contradicting_evidence_ids].some((id) => evidenceIds.has(id))).map(({ unknown_id: id }) => id));
			const pending = [...relevantIds];
			while (pending.length > 0) {
				const currentId = pending.pop();
				if (currentId === undefined) continue;
				const current = heads.get(currentId);
				if (current === undefined) continue;
				for (const relationship of current.relationships) {
					if (relationship.type === "related-to") continue;
					const dependency = heads.get(relationship.unknown_id);
					if (dependency === undefined || dependency.status === "resolved" || relevantIds.has(dependency.unknown_id)) continue;
					relevantIds.add(dependency.unknown_id);
					pending.push(dependency.unknown_id);
				}
			}
			return [...relevantIds].flatMap((id) => {
				const unknown = heads.get(id);
				return unknown === undefined ? [] : [unknown];
			}).sort((left, right) => compareUnicodeCodePoints(left.unknown_id, right.unknown_id));
		};
		reconstructionProbes = (results, heads) => {
			const output = new Map();
			for (const result of results.filter(({ status }) => status === "unknown")) {
				const unknowns = result.unknown_ids.flatMap((id) => {
					const item = heads.get(id);
					return item === undefined ? [] : [item];
				});
				const probes = unknowns.flatMap(({ recommended_probes: items }) => items);
				const candidates = probes.length > 0 ? probes : [defaultProbe(result.kind)];
				for (const probe of candidates) {
					const key = compositeKey([probe.operation, probe.rationale]);
					const current = output.get(key) ?? {
						...probe,
						claim_ids: [],
						unknown_ids: []
					};
					current.claim_ids = uniqueSorted([...current.claim_ids, result.claim_id]);
					current.unknown_ids = uniqueSorted([...current.unknown_ids, ...result.unknown_ids]);
					output.set(key, current);
				}
			}
			const sorted = [...output.values()].sort((left, right) => compareUnicodeCodePoints(compositeKey([left.operation, left.rationale]), compositeKey([right.operation, right.rationale])));
			return sorted;
		};
		defaultProbe = (kind) => kind === "behavioral" ? {
			operation: "capture_process_scenario",
			rationale: "Repeat both scenarios under one controlled environment."
		} : kind === "structural-function" ? {
			operation: "analyze_function",
			rationale: "Capture complete function dossiers under equal limits."
		} : kind === "visual" ? {
			operation: "capture_web_screenshot",
			rationale: "Capture both visible viewports under the same browser scope."
		} : {
			operation: "inspect_artifact",
			rationale: "Capture complete artifact inventories under equal limits."
		};
	})))();
}

//#endregion
//#region dist/domain/reconstructionCoverageEvidence.js
var evidenceAuthorities, packageAuthorities, verifierHasComparableEvidence, packageProofHasComparableEvidence, hasComparableEvidence;
function init_reconstructionCoverageEvidence() {
	return (init_reconstructionCoverageEvidence = __esmMin((() => {
		evidenceAuthorities = {
			"shipped-artifact": ["shipped-artifact"],
			"controlled-replay": ["controlled-replay"],
			"live-observation": ["controlled-replay", "external-service"],
			external: ["external-service"]
		};
		packageAuthorities = {
			build: ["live-observation"],
			"clean-install": ["live-observation"],
			"package-contents": ["shipped-artifact", "live-observation"],
			"runtime-routing": ["live-observation"],
			"authority-independence": ["shipped-artifact", "live-observation"]
		};
		verifierHasComparableEvidence = (result, contract, records) => hasComparableEvidence(result.evidence_ids, [contract.authority], records);
		packageProofHasComparableEvidence = (proof, records) => hasComparableEvidence(proof.evidence_ids, packageAuthorities[proof.kind], records);
		hasComparableEvidence = (evidenceIds, requirements, records) => evidenceIds.some((id) => {
			const evidence = records.get(id);
			if (evidence === undefined) return false;
			return requirements.some((required) => evidenceAuthorities[required].includes(evidence.authority) && (evidence.confidence === "observed" || required === "shipped-artifact" && evidence.confidence === "derived"));
		});
	})))();
}

//#endregion
//#region dist/domain/reconstructionCoverageVerifierResults.js
var latestVerifierObservationsByVerifier, sameVerifierAssessment, verifierAssessmentIdentity;
function init_reconstructionCoverageVerifierResults() {
	return (init_reconstructionCoverageVerifierResults = __esmMin((() => {
		init_canonicalOrdering();
		init_offsetDateTime();
		latestVerifierObservationsByVerifier = (results) => {
			const latestByVerifier = new Map();
			for (const result of results) {
				const observation = {
					result,
					instant: parseOffsetDateTimeInstant(result.observed_at)
				};
				const latest = latestByVerifier.get(result.verifier_id);
				const latestInstant = latest?.[0]?.instant;
				const comparison = latestInstant === undefined ? 1 : compareOffsetDateTimeInstants(observation.instant, latestInstant);
				if (latest === undefined || comparison > 0) latestByVerifier.set(result.verifier_id, [observation]);
				else if (comparison === 0) latest.push(observation);
			}
			return latestByVerifier;
		};
		sameVerifierAssessment = (left, right) => verifierAssessmentIdentity(left) === verifierAssessmentIdentity(right);
		verifierAssessmentIdentity = (result) => JSON.stringify({
			verifier_id: result.verifier_id,
			contract_sha256: result.contract_sha256,
			status: result.status,
			covered_claim_ids: uniqueSorted(result.covered_claim_ids),
			covered_dimensions: uniqueSorted(result.covered_dimensions),
			artifact_sha256s: uniqueSorted(result.artifact_sha256s),
			owner_sha256s: uniqueSorted(result.owner_sha256s),
			normalization_sha256: result.normalization_sha256,
			repeats: result.repeats
		});
	})))();
}

//#endregion
//#region dist/domain/reconstructionCoverageEvaluation.js
var recommendedReconstructionProbes, probeOperation, evaluateReconstructionSurfaces, evaluateOwner, evaluateReconstructionClaims, createVerifierIndexes, evaluateVerifierResult, verifierResultMatchesContract, evaluateReconstructionCoverageRisks, evaluateReconstructionPackageProofs, addReason, addEvidence;
function init_reconstructionCoverageEvaluation() {
	return (init_reconstructionCoverageEvaluation = __esmMin((() => {
		init_reconstructionUnknowns();
		init_reconstructionCoverageEvidence();
		init_offsetDateTime();
		init_reconstructionCoverageVerifierResults();
		recommendedReconstructionProbes = (reasons) => reasons.map((reason) => ({
			operation: probeOperation(reason.code),
			subject_id: reason.subject_id,
			rationale: reason.detail
		}));
		probeOperation = (code) => {
			if (code.startsWith("owner-") || code.startsWith("authority-routing")) return "reconcile_reconstruction_owner";
			if (code.startsWith("verifier-")) return "run_reconstruction_verifier";
			if (code.startsWith("package-proof")) return "verify_reconstruction_package";
			if (code === "active-contradiction") return "resolve_contradiction";
			if (code === "active-unknown") return "probe_residual_unknown";
			return "update_authoritative_inventory";
		};
		evaluateReconstructionSurfaces = (context) => {
			for (const surfaceId of context.scope.surfaceIds) {
				const surface = context.surfaces.get(surfaceId);
				if (surface === undefined) {
					const dependents = context.scope.missingDependencies.get(surfaceId);
					if (dependents === undefined) addReason(context, "surface-missing", surfaceId, "Required surface is absent from the authoritative inventory.");
					else for (const dependentId of dependents) addReason(context, "dependency-surface-missing", dependentId, `Declared dependency surface is absent: ${surfaceId}`);
					continue;
				}
				addEvidence(context, surface.evidence_ids);
				evaluateOwner(context, surfaceId);
			}
		};
		evaluateOwner = (context, surfaceId) => {
			const owners = context.ownersBySurface.get(surfaceId) ?? [];
			if (owners.length === 0) {
				addReason(context, "owner-missing", surfaceId, "Required surface has no reconstructed owner or explicit disposition.");
				return;
			}
			if (owners.length > 1) {
				addReason(context, "owner-duplicate", surfaceId, "Required surface has conflicting ownership declarations.");
				return;
			}
			const owner = owners[0]?.ownership;
			if (owner === undefined) return;
			if (owner.disposition !== "implemented") {
				if (!context.boundary.allowed_dispositions.includes(owner.disposition)) addReason(context, "disposition-not-allowed", surfaceId, `${owner.disposition} is not allowed by this completion boundary.`);
				return;
			}
			const ownerChecks = [
				[
					owner.path_state === "missing",
					"owner-path-missing",
					"Declared owner path is missing."
				],
				[
					owner.path_state === "unknown",
					"owner-path-unknown",
					"Declared owner path has not been checked."
				],
				[
					owner.package_state === "missing",
					"owner-undistributed",
					"Declared owner is absent from the distributable."
				],
				[
					owner.package_state === "unknown",
					"owner-distribution-unknown",
					"Owner distribution state is unknown."
				],
				[
					owner.authority_route === "detected",
					"authority-routing-detected",
					"Reconstructed owner routes into the authority."
				],
				[
					owner.authority_route === "unknown",
					"authority-routing-unknown",
					"Authority independence has not been established."
				]
			];
			for (const [matches, code, detail] of ownerChecks) if (matches) addReason(context, code, surfaceId, detail);
		};
		evaluateReconstructionClaims = (context) => {
			const indexes = createVerifierIndexes(context);
			for (const claimId of context.scope.claimIds) {
				const claim = context.claims.get(claimId);
				if (claim === undefined) {
					addReason(context, "claim-missing", claimId, "Required finite claim is absent.");
					continue;
				}
				const contracts = indexes.contractsByClaim.get(claimId) ?? [];
				if (contracts.length === 0) {
					addReason(context, "verifier-missing", claimId, "No verifier contract covers this claim.");
					continue;
				}
				if (contracts.length > 1) {
					addReason(context, "verifier-duplicate", claimId, "Multiple verifier contracts claim primary coverage.");
					continue;
				}
				const contract = contracts[0];
				if (contract !== undefined) evaluateVerifierResult(context, claim, contract, indexes);
			}
		};
		createVerifierIndexes = (context) => {
			const { coverage } = context;
			const contractsByClaim = new Map();
			for (const contract of coverage.verifier_contracts) for (const claimId of new Set(contract.claim_ids)) {
				const contracts = contractsByClaim.get(claimId) ?? [];
				contracts.push(contract);
				contractsByClaim.set(claimId, contracts);
			}
			return {
				claimSurfaceIds: context.scope.claimSurfaceIds,
				contractsByClaim,
				latestResultsByVerifier: latestVerifierObservationsByVerifier(coverage.verifier_results),
				artifactDigests: new Set(coverage.artifacts.map(({ artifact_sha256: value }) => value)),
				ownerDigests: new Set(coverage.owners.flatMap(({ ownership }) => ownership.disposition === "implemented" ? [ownership.owner_sha256] : [])),
				surfaces: context.surfaces,
				artifacts: context.artifacts,
				ownersBySurface: context.ownersBySurface
			};
		};
		evaluateVerifierResult = (context, claim, contract, indexes) => {
			const latestResults = indexes.latestResultsByVerifier.get(contract.verifier_id);
			if (latestResults === undefined) {
				addReason(context, "verifier-result-missing", claim.claim_id, "Verifier has no recorded result.");
				return;
			}
			addEvidence(context, latestResults.flatMap(({ result }) => result.evidence_ids));
			const latest = latestResults[0];
			if (latest === undefined) return;
			if (!latestResults.every((candidate) => sameVerifierAssessment(latest.result, candidate.result))) {
				addReason(context, "verifier-result-ambiguous", claim.claim_id, "Latest verifier observations have conflicting assessment content.");
				return;
			}
			const comparable = latestResults.find(({ result }) => verifierHasComparableEvidence(result, contract, context.evidenceById));
			if (comparable === undefined) {
				addReason(context, "verifier-result-incompatible", claim.claim_id, `Latest verifier observation has no cited Evidence with comparable ${contract.authority} authority and confidence.`);
				return;
			}
			const { result } = comparable;
			if (!verifierResultMatchesContract(claim, contract, result, indexes)) {
				addReason(context, "verifier-result-incompatible", claim.claim_id, "Latest verifier result does not match current artifacts, owners, dimensions, authority, normalization, repeats, or contract.");
				return;
			}
			const cutoffEpochMs = context.nowEpochMs - contract.max_age_ms;
			if (compareOffsetDateTimeInstants(comparable.instant, context.nowInstant) > 0 || cutoffEpochMs >= -Number.MAX_SAFE_INTEGER && compareOffsetDateTimeInstants(comparable.instant, offsetDateTimeInstantFromEpochMilliseconds(cutoffEpochMs)) < 0) {
				addReason(context, "verifier-result-stale", claim.claim_id, "Latest compatible verifier result is stale.");
				return;
			}
			if (result.status === "fail") addReason(context, "verifier-failed", claim.claim_id, "Latest compatible verifier result failed.");
			else if (result.status !== "pass") addReason(context, "verifier-unknown", claim.claim_id, `Latest compatible verifier result is ${result.status}.`);
		};
		verifierResultMatchesContract = (claim, contract, result, indexes) => {
			const requiredSurfaceIds = [...indexes.claimSurfaceIds.get(claim.claim_id) ?? []];
			const expectedArtifactDigests = requiredSurfaceIds.flatMap((surfaceId) => {
				const surface = indexes.surfaces.get(surfaceId);
				const artifact = surface === undefined ? undefined : indexes.artifacts.get(surface.artifact_id);
				return artifact === undefined ? [] : [artifact.artifact_sha256];
			});
			const expectedOwnerDigests = requiredSurfaceIds.flatMap((surfaceId) => (indexes.ownersBySurface.get(surfaceId) ?? []).flatMap(({ ownership }) => ownership.disposition === "implemented" ? [ownership.owner_sha256] : []));
			return result.contract_sha256 === contract.contract_sha256 && result.normalization_sha256 === contract.normalization_sha256 && result.covered_claim_ids.includes(claim.claim_id) && result.covered_claim_ids.every((item) => contract.claim_ids.includes(item)) && claim.required_dimensions.every((item) => contract.dimensions.includes(item)) && claim.required_dimensions.every((item) => result.covered_dimensions.includes(item)) && result.covered_dimensions.every((item) => contract.dimensions.includes(item)) && result.artifact_sha256s.every((item) => indexes.artifactDigests.has(item)) && expectedArtifactDigests.every((item) => result.artifact_sha256s.includes(item)) && result.owner_sha256s.every((item) => indexes.ownerDigests.has(item)) && expectedOwnerDigests.every((item) => result.owner_sha256s.includes(item)) && result.repeats >= contract.minimum_repeats && claim.required_authority === contract.authority;
		};
		evaluateReconstructionCoverageRisks = (context) => {
			const unknownHeads = reconstructionUnknownHeads(context.coverage.evidence_bundle.unknowns);
			for (const unknownId of new Set(context.coverage.residual_unknown_ids)) {
				const unknown = unknownHeads.get(unknownId);
				if (unknown?.status === "resolved") continue;
				if (!context.boundary.allowed_unknown_ids.includes(unknownId)) {
					if (unknown !== undefined) addEvidence(context, [
						...unknown.supporting_evidence_ids,
						...unknown.contradicting_evidence_ids,
						...unknown.mutation_evidence_ids
					]);
					addReason(context, "active-unknown", unknownId, "Active residual unknown is not permitted by the completion boundary.");
				}
			}
			for (const contradiction of context.coverage.contradictions) if (contradiction.status === "active" && (contradiction.surface_ids.some((id) => context.scope.surfaceIds.has(id)) || contradiction.claim_ids.some((id) => context.scope.claimIds.has(id)))) {
				addEvidence(context, contradiction.evidence_ids);
				addReason(context, "active-contradiction", contradiction.contradiction_id, "Active contradiction affects the completion boundary.");
			}
		};
		evaluateReconstructionPackageProofs = (context) => {
			const requiredArtifactDigests = [...context.scope.surfaceIds].flatMap((surfaceId) => {
				const surface = context.surfaces.get(surfaceId);
				const artifact = surface === undefined ? undefined : context.artifacts.get(surface.artifact_id);
				return artifact === undefined ? [] : [artifact.artifact_sha256];
			});
			for (const kind of context.boundary.required_package_proof_kinds) {
				const proofs = context.coverage.package_proofs.filter((proof) => proof.kind === kind);
				const applicable = (proof) => requiredArtifactDigests.every((digest) => proof.artifact_sha256s.includes(digest)) && packageProofHasComparableEvidence(proof, context.evidenceById);
				const applicableProofs = proofs.filter(applicable);
				addEvidence(context, applicableProofs.flatMap((proof) => proof.evidence_ids));
				if (applicableProofs.some((proof) => proof.status === "fail")) {
					addReason(context, "package-proof-failed", kind, "Required package or integration proof failed; all applicable outcomes are retained.");
				} else if (applicableProofs.length > 0 && applicableProofs.every((proof) => proof.status === "pass")) {
					continue;
				} else if (proofs.length > 0) {
					if (applicableProofs.length === 0) addEvidence(context, proofs.flatMap((proof) => proof.evidence_ids));
					addReason(context, "package-proof-unknown", kind, "Required package or integration proof has unresolved or unqualified outcomes.");
				} else addReason(context, "package-proof-missing", kind, "Required package or integration proof is missing.");
			}
		};
		addReason = (context, code, subjectId, detail) => {
			context.reasons.push({
				code,
				subject_id: subjectId,
				detail
			});
		};
		addEvidence = (context, evidenceIds) => {
			for (const evidenceId of evidenceIds) context.evidenceIds.add(evidenceId);
		};
	})))();
}

//#endregion
//#region dist/domain/reconstructionCoverage.js
var evidenceIdSchema$1, stableIdSchema$1, reconstructionBoundaryIdSchema, trimmedTextSchema, authoritySchema, artifactSchema, surfaceSchema, implementationOwnerSchema, externalOwnerSchema, ownerSchema, claimSchema, verifierContractSchema, verifierResultSchema, contradictionSchema, packageProofSchema, boundarySchema, reconstructionCoverageDataSchema, coverageEnvelopeSchema, readReconstructionCoverageData, closureReasonSchema, reconstructionClosureResultSchema, evaluateParsedReconstructionClosure, validateCoverageReferences, indexUnique, coverageInputError, closureStatus, reasonOrder;
function init_reconstructionCoverage() {
	return (init_reconstructionCoverage = __esmMin((() => {
		init_reconstructionCoverageScope();
		init_analysisErrorCore();
		init_inputIssueProjection();
		init_result();
		init_unicodeCodePointOrder();
		init_evidenceBundle();
		init_reconstructionCoverageEvaluation();
		init_digests();
		init_canonicalDigest();
		init_offsetDateTime();
		evidenceIdSchema$1 = prefixedDigestSchema("ev");
		stableIdSchema$1 = z.string().regex(/^[A-Za-z][A-Za-z0-9._:\x2f\x2d]{0,199}$/u);
		reconstructionBoundaryIdSchema = stableIdSchema$1.describe("Exact identifier of a boundary declared in the reconstruction coverage.");
		trimmedTextSchema = z.string().trim().min(1);
		authoritySchema = z.enum([
			"observed",
			"derived",
			"inferred",
			"historical",
			"external"
		]);
		artifactSchema = z.strictObject({
			artifact_id: stableIdSchema$1,
			artifact_sha256: digestSchema,
			version: z.string().trim().min(1),
			environment_sha256: digestSchema,
			evidence_ids: z.array(evidenceIdSchema$1).min(1)
		});
		surfaceSchema = z.strictObject({
			surface_id: stableIdSchema$1,
			family: z.string().trim().min(1),
			artifact_id: stableIdSchema$1,
			occurrence_id: z.string().trim().min(1).nullable(),
			location: trimmedTextSchema,
			authority: authoritySchema,
			dependency_surface_ids: z.array(stableIdSchema$1),
			evidence_ids: z.array(evidenceIdSchema$1).min(1)
		});
		implementationOwnerSchema = z.strictObject({
			disposition: z.literal("implemented"),
			owner_path: trimmedTextSchema,
			owner_export: z.string().trim().min(1).nullable(),
			owner_sha256: digestSchema,
			path_state: z.enum([
				"present",
				"missing",
				"unknown"
			]),
			package_state: z.enum([
				"distributed",
				"missing",
				"unknown"
			]),
			authority_route: z.enum([
				"none",
				"detected",
				"unknown"
			])
		});
		externalOwnerSchema = z.strictObject({
			disposition: z.enum(["external", "non-goal"]),
			rationale: trimmedTextSchema
		});
		ownerSchema = z.strictObject({
			surface_id: stableIdSchema$1,
			ownership: z.discriminatedUnion("disposition", [implementationOwnerSchema, externalOwnerSchema])
		});
		claimSchema = z.strictObject({
			claim_id: stableIdSchema$1,
			title: z.string().trim().min(1),
			kind: z.string().trim().min(1),
			surface_ids: z.array(stableIdSchema$1).min(1),
			required_dimensions: z.array(stableIdSchema$1).min(1),
			required_authority: z.enum([
				"shipped-artifact",
				"controlled-replay",
				"live-observation",
				"external"
			])
		});
		verifierContractSchema = z.strictObject({
			verifier_id: stableIdSchema$1,
			claim_ids: z.array(stableIdSchema$1).min(1),
			dimensions: z.array(stableIdSchema$1).min(1),
			authority: z.enum([
				"shipped-artifact",
				"controlled-replay",
				"live-observation",
				"external"
			]),
			max_age_ms: z.int().min(1),
			minimum_repeats: z.int().min(1),
			normalization_sha256: digestSchema,
			normalization_removes_dimensions: z.literal(false),
			contract_sha256: digestSchema
		});
		verifierResultSchema = z.strictObject({
			verifier_id: stableIdSchema$1,
			contract_sha256: digestSchema,
			observed_at: offsetDateTimeSchema,
			status: z.enum([
				"pass",
				"fail",
				"unknown",
				"unsupported",
				"truncated",
				"skipped"
			]),
			covered_claim_ids: z.array(stableIdSchema$1).min(1),
			covered_dimensions: z.array(stableIdSchema$1).min(1),
			artifact_sha256s: z.array(digestSchema).min(1),
			owner_sha256s: z.array(digestSchema),
			normalization_sha256: digestSchema,
			repeats: z.int().min(1),
			evidence_ids: z.array(evidenceIdSchema$1).min(1)
		});
		contradictionSchema = z.strictObject({
			contradiction_id: stableIdSchema$1,
			status: z.enum(["active", "resolved"]),
			surface_ids: z.array(stableIdSchema$1),
			claim_ids: z.array(stableIdSchema$1),
			evidence_ids: z.array(evidenceIdSchema$1).min(2)
		});
		packageProofSchema = z.strictObject({
			proof_id: stableIdSchema$1,
			kind: z.enum([
				"build",
				"clean-install",
				"package-contents",
				"runtime-routing",
				"authority-independence"
			]),
			status: z.enum([
				"pass",
				"fail",
				"unknown",
				"unsupported",
				"skipped"
			]),
			artifact_sha256s: z.array(digestSchema).min(1),
			evidence_ids: z.array(evidenceIdSchema$1).min(1)
		});
		boundarySchema = z.strictObject({
			boundary_id: reconstructionBoundaryIdSchema,
			title: z.string().trim().min(1),
			required_surface_ids: z.array(stableIdSchema$1).min(1),
			required_claim_ids: z.array(stableIdSchema$1).min(1),
			required_package_proof_kinds: z.array(packageProofSchema.shape.kind).min(1),
			allowed_dispositions: z.array(z.enum(["external", "non-goal"])),
			allowed_unknown_ids: z.array(stableIdSchema$1)
		});
		reconstructionCoverageDataSchema = z.strictObject({
			evidence_bundle: evidenceBundleSchema,
			artifacts: z.array(artifactSchema),
			surfaces: z.array(surfaceSchema),
			owners: z.array(ownerSchema),
			claims: z.array(claimSchema),
			verifier_contracts: z.array(verifierContractSchema),
			verifier_results: z.array(verifierResultSchema),
			residual_unknown_ids: z.array(stableIdSchema$1),
			contradictions: z.array(contradictionSchema),
			package_proofs: z.array(packageProofSchema),
			boundaries: z.array(boundarySchema)
		});
		coverageEnvelopeSchema = reconstructionCoverageDataSchema.extend({ evidence_bundle: z.unknown() });
		readReconstructionCoverageData = (input, path = []) => {
			const parsed = coverageEnvelopeSchema.safeParse(input);
			if (!parsed.success) return err(new AnalysisInputError("evaluate_reconstruction_coverage", { cause: parsed.error }, projectInputIssues(parsed.error.issues, input).map((issue) => ({
				...issue,
				path: [...path, ...issue.path]
			}))));
			const bundle = readEvidenceBundle(parsed.data.evidence_bundle, {
				operation: "evaluate_reconstruction_coverage",
				path: [...path, "evidence_bundle"]
			});
			if (!bundle.ok) return bundle;
			const coverage = {
				...parsed.data,
				evidence_bundle: bundle.value
			};
			try {
				return ok({
					coverage,
					...validateCoverageReferences(coverage, path)
				});
			} catch (cause) {
				if (cause instanceof AnalysisInputError) return err(cause);
				throw cause;
			}
		};
		closureReasonSchema = z.strictObject({
			code: z.enum([
				"surface-missing",
				"owner-missing",
				"owner-duplicate",
				"owner-path-missing",
				"owner-path-unknown",
				"owner-undistributed",
				"owner-distribution-unknown",
				"authority-routing-detected",
				"authority-routing-unknown",
				"disposition-not-allowed",
				"dependency-surface-missing",
				"claim-missing",
				"verifier-missing",
				"verifier-duplicate",
				"verifier-result-missing",
				"verifier-result-stale",
				"verifier-result-incompatible",
				"verifier-result-ambiguous",
				"verifier-failed",
				"verifier-unknown",
				"active-unknown",
				"active-contradiction",
				"package-proof-missing",
				"package-proof-failed",
				"package-proof-unknown"
			]),
			subject_id: stableIdSchema$1,
			detail: trimmedTextSchema
		});
		reconstructionClosureResultSchema = z.strictObject({
			boundary_id: reconstructionBoundaryIdSchema,
			status: z.enum([
				"partial",
				"failed",
				"unknown",
				"ready"
			]),
			summary: z.strictObject({
				required_surfaces: z.int().min(0),
				required_claims: z.int().min(0),
				reasons: z.int().min(0)
			}),
			reasons: z.array(closureReasonSchema),
			recommended_probes: z.array(z.strictObject({
				operation: stableIdSchema$1,
				subject_id: stableIdSchema$1,
				rationale: trimmedTextSchema
			})),
			evidence_ids: z.array(evidenceIdSchema$1)
		});
		evaluateParsedReconstructionClosure = (parsed, boundaryId, nowEpochMs) => {
			const boundary = parsed.boundaries.get(boundaryId);
			if (boundary === undefined) return err(coverageInputError(["boundary_id"], `Unknown reconstruction boundary: ${boundaryId}`));
			const nowInstant = offsetDateTimeInstantFromEpochMilliseconds(nowEpochMs);
			const context = {
				...parsed,
				boundary,
				scope: reconstructionCoverageScope(parsed, boundary),
				nowEpochMs,
				nowInstant,
				reasons: [],
				evidenceIds: new Set()
			};
			evaluateReconstructionSurfaces(context);
			evaluateReconstructionClaims(context);
			evaluateReconstructionCoverageRisks(context);
			evaluateReconstructionPackageProofs(context);
			const reasons = [...context.reasons].sort(reasonOrder);
			return ok(reconstructionClosureResultSchema.parse({
				boundary_id: boundary.boundary_id,
				status: closureStatus(reasons),
				summary: {
					required_surfaces: context.scope.surfaceIds.size,
					required_claims: context.scope.claimIds.size,
					reasons: reasons.length
				},
				reasons,
				recommended_probes: recommendedReconstructionProbes(reasons),
				evidence_ids: [...context.evidenceIds].sort()
			}));
		};
		validateCoverageReferences = (workspace, path) => {
			const invalid = (location, message) => coverageInputError([...path, ...location], message);
			const evidenceById = new Map(workspace.evidence_bundle.records.map((record) => [record.evidence_id, record]));
			const unknownIds = new Set(workspace.evidence_bundle.unknowns.map(({ unknown_id: id }) => id));
			const artifacts = indexUnique(workspace.artifacts, "artifact_id", [...path, "artifacts"]);
			const surfaces = indexUnique(workspace.surfaces, "surface_id", [...path, "surfaces"]);
			const claims = indexUnique(workspace.claims, "claim_id", [...path, "claims"]);
			const contracts = indexUnique(workspace.verifier_contracts, "verifier_id", [...path, "verifier_contracts"]);
			indexUnique(workspace.contradictions, "contradiction_id", [...path, "contradictions"]);
			indexUnique(workspace.package_proofs, "proof_id", [...path, "package_proofs"]);
			const boundaries = indexUnique(workspace.boundaries, "boundary_id", [...path, "boundaries"]);
			for (const [index, contract] of workspace.verifier_contracts.entries()) {
				const { contract_sha256: contractSha256, ...base } = contract;
				if (contractSha256 !== digestCanonicalValue(base, "Reconstruction coverage")) throw invalid([
					"verifier_contracts",
					index,
					"contract_sha256"
				], `Verifier contract digest is invalid: ${contract.verifier_id}`);
			}
			for (const [index, surface] of workspace.surfaces.entries()) if (!artifacts.has(surface.artifact_id)) throw invalid([
				"surfaces",
				index,
				"artifact_id"
			], `Surface artifact is missing: ${surface.surface_id}`);
			const ownersBySurface = new Map();
			for (const [index, owner] of workspace.owners.entries()) {
				if (!surfaces.has(owner.surface_id)) throw invalid([
					"owners",
					index,
					"surface_id"
				], `Owner surface is missing: ${owner.surface_id}`);
				const owners = ownersBySurface.get(owner.surface_id);
				if (owners === undefined) ownersBySurface.set(owner.surface_id, [owner]);
				else owners.push(owner);
			}
			for (const [index, claim] of workspace.claims.entries()) {
				const missingSurface = claim.surface_ids.findIndex((id) => !surfaces.has(id));
				if (missingSurface !== -1) throw invalid([
					"claims",
					index,
					"surface_ids",
					missingSurface
				], `Claim surface is missing: ${claim.claim_id}`);
			}
			for (const [index, contract] of workspace.verifier_contracts.entries()) {
				const missingClaim = contract.claim_ids.findIndex((id) => !claims.has(id));
				if (missingClaim !== -1) throw invalid([
					"verifier_contracts",
					index,
					"claim_ids",
					missingClaim
				], `Verifier claim is missing: ${contract.verifier_id}`);
			}
			for (const [index, result] of workspace.verifier_results.entries()) if (!contracts.has(result.verifier_id)) throw invalid([
				"verifier_results",
				index,
				"verifier_id"
			], `Verifier result contract is missing: ${result.verifier_id}`);
			const evidenceSources = [
				["artifacts", workspace.artifacts],
				["surfaces", workspace.surfaces],
				["verifier_results", workspace.verifier_results],
				["contradictions", workspace.contradictions],
				["package_proofs", workspace.package_proofs]
			];
			for (const [collection, items] of evidenceSources) for (const [index, item] of items.entries()) for (const [referenceIndex, id] of item.evidence_ids.entries()) if (!evidenceById.has(id)) throw invalid([
				collection,
				index,
				"evidence_ids",
				referenceIndex
			], `Coverage workspace Evidence is missing: ${id}`);
			for (const [index, id] of workspace.residual_unknown_ids.entries()) if (!unknownIds.has(id)) throw invalid(["residual_unknown_ids", index], `Coverage workspace residual unknown is missing: ${id}`);
			return {
				evidenceById,
				artifacts,
				surfaces,
				claims,
				boundaries,
				ownersBySurface
			};
		};
		indexUnique = (items, key, path) => {
			const values = new Map();
			for (const [index, item] of items.entries()) {
				if (values.has(item[key])) throw coverageInputError([
					...path,
					index,
					String(key)
				], `Duplicate reconstruction coverage ${String(key)}`);
				values.set(item[key], item);
			}
			return values;
		};
		coverageInputError = (path, message) => new AnalysisInputError("evaluate_reconstruction_coverage", { userMessage: message }, [{
			path,
			reason: "invalid_value",
			message
		}]);
		closureStatus = (reasons) => {
			if (reasons.length === 0) return "ready";
			if (reasons.some(({ code }) => [
				"verifier-failed",
				"active-contradiction",
				"authority-routing-detected",
				"owner-path-missing",
				"owner-undistributed",
				"package-proof-failed"
			].includes(code))) return "failed";
			if (reasons.some(({ code }) => [
				"verifier-result-stale",
				"verifier-result-incompatible",
				"verifier-result-ambiguous",
				"verifier-unknown",
				"active-unknown",
				"owner-path-unknown",
				"owner-distribution-unknown",
				"authority-routing-unknown",
				"package-proof-unknown"
			].includes(code))) return "unknown";
			return "partial";
		};
		reasonOrder = (left, right) => compareUnicodeCodePoints(compositeKey([left.code, left.subject_id]), compositeKey([right.code, right.subject_id]));
	})))();
}

//#endregion
//#region dist/domain/reconstructionCoverageInput.js
var reconstructionCoverageEvaluationInputSchema, reconstructionCoverageRequestSchema;
function init_reconstructionCoverageInput() {
	return (init_reconstructionCoverageInput = __esmMin((() => {
		init_reconstructionCoverage();
		reconstructionCoverageEvaluationInputSchema = z.strictObject({
			coverage: reconstructionCoverageDataSchema,
			boundary_id: reconstructionBoundaryIdSchema
		});
		reconstructionCoverageRequestSchema = reconstructionCoverageEvaluationInputSchema.extend({ coverage: z.unknown() });
	})))();
}

//#endregion
//#region dist/domain/reconstructionObligationLedgerIntegrity.js
var summarizeReconstructionObligations, reconstructionObligationLedgerStatus, reconstructionObligationCoverage, reconstructionObligationReports, reconstructionObligationOwnershipGraph, reconstructionObligationDependencyGraph, reconstructionObligationEvidenceIds, obligationEdgeOrder, obligationIdsWith, hasReconstructionObligationDiagnostic, reconstructionObligationLedgerClosureDigest, countBy;
function init_reconstructionObligationLedgerIntegrity() {
	return (init_reconstructionObligationLedgerIntegrity = __esmMin((() => {
		init_canonicalDigest();
		init_comparisonSemantics();
		init_evidence();
		init_unicodeCodePointOrder();
		summarizeReconstructionObligations = (obligations) => ({
			total: obligations.length,
			required: obligations.filter(({ required }) => required).length,
			verified: obligations.filter(({ status }) => status === "verified").length,
			required_open: obligations.filter(({ required, status }) => required && status !== "verified").length,
			by_status: countBy(obligations, [
				"unowned",
				"characterized",
				"implemented",
				"verified",
				"contradicted",
				"blocked",
				"out-of-scope",
				"unknown"
			], ({ status }) => status),
			by_application_layer: countBy(obligations, [
				"cli",
				"protocol",
				"electron",
				"persistence",
				"process",
				"runtime",
				"packaging",
				"native-abi",
				"application",
				"other"
			], ({ application_layer }) => application_layer),
			by_evidence_authority: countBy(obligations, evidenceAuthoritySchema.options, ({ authority_references: references }) => references.map(({ authority }) => authority)),
			by_source_state: countBy(obligations, [
				"candidate",
				"observed",
				"reviewed",
				"unknown"
			], ({ source_state }) => source_state)
		});
		reconstructionObligationLedgerStatus = (obligations, limitations) => {
			if (obligations.length === 0) return "unknown";
			const requiredOpen = obligations.filter(({ required, status }) => required && status !== "verified");
			if (requiredOpen.some(({ status, diagnostics }) => status === "contradicted" || hasReconstructionObligationDiagnostic(diagnostics, "verifier-failed") || hasReconstructionObligationDiagnostic(diagnostics, "fixture-failed"))) return "failed";
			if (limitations.length > 0) return "unknown";
			if (requiredOpen.some(({ status }) => status === "unknown")) return "unknown";
			return requiredOpen.length === 0 ? "ready" : "open";
		};
		reconstructionObligationCoverage = (limitations) => ({ status: limitations.length === 0 ? "complete" : "partial" });
		reconstructionObligationReports = (obligations) => ({
			missing_owner_obligation_ids: obligationIdsWith(obligations, "missing-owner"),
			missing_verifier_obligation_ids: obligationIdsWith(obligations, "missing-verifier"),
			contradicted_obligation_ids: obligationIdsWith(obligations, "contradiction"),
			residual_unknown_ids: [...new Set(obligations.flatMap(({ residual_unknown_ids: ids }) => ids))].sort(compareUnicodeCodePoints)
		});
		reconstructionObligationOwnershipGraph = (obligations) => obligations.flatMap((obligation) => obligation.binding === null ? [] : [{
			obligation_id: obligation.obligation_id,
			module_path: obligation.binding.owner.module_path,
			symbol: obligation.binding.owner.symbol
		}]).sort(obligationEdgeOrder);
		reconstructionObligationDependencyGraph = (obligations) => obligations.flatMap((obligation) => obligation.dependency_obligation_ids.map((dependencyId) => ({
			obligation_id: obligation.obligation_id,
			depends_on_obligation_id: dependencyId
		}))).sort(obligationEdgeOrder);
		reconstructionObligationEvidenceIds = (obligations) => [...new Set(obligations.flatMap((obligation) => [
			...obligation.authority_references.map(({ evidence_id: id }) => id),
			...obligation.observed_cases.map(({ evidence_id: id }) => id),
			...obligation.binding === null ? [] : [
				...obligation.binding.original_cases.map(({ evidence_id: id }) => id),
				...obligation.binding.fixtures.flatMap(({ evidence_ids: ids }) => ids),
				...obligation.binding.verifier === null ? [] : [obligation.binding.verifier.result_evidence_id]
			]
		]))].sort(compareUnicodeCodePoints);
		obligationEdgeOrder = (left, right) => compareUnicodeCodePoints(canonicalJson(left), canonicalJson(right));
		obligationIdsWith = (obligations, code) => obligations.filter(({ diagnostics }) => hasReconstructionObligationDiagnostic(diagnostics, code)).map(({ obligation_id: id }) => id).sort(compareUnicodeCodePoints);
		hasReconstructionObligationDiagnostic = (diagnostics, code) => diagnostics.some((diagnostic) => diagnostic.code === code);
		reconstructionObligationLedgerClosureDigest = (ledger) => digestCanonicalValue({
			schema: "ReconstructionObligationClosure",
			status: ledger.status,
			coverage: ledger.coverage,
			summary: ledger.summary,
			reports: ledger.reports,
			ownership_graph: ledger.ownership_graph,
			dependency_graph: ledger.dependency_graph,
			obligations: ledger.obligations,
			evidence_links: ledger.evidence_links,
			limitations: ledger.limitations
		}, "Reconstruction obligation ledger");
		countBy = (items, values, valuesFor) => {
			const counts = new Map();
			for (const item of items) {
				const itemValues = valuesFor(item);
				for (const value of new Set(typeof itemValues === "string" ? [itemValues] : itemValues)) counts.set(value, (counts.get(value) ?? 0) + 1);
			}
			return values.map((value) => ({
				key: value,
				count: counts.get(value) ?? 0
			}));
		};
	})))();
}

//#endregion
//#region dist/domain/reconstructionObligationLedgerSchemas.js
var evidenceIdSchema, stableIdSchema, textSchema, sameProjection, obligationStatusSchema, obligationLayerSchema, obligationCaseKindSchema, obligationProofAuthoritySchema, obligationOriginalAuthoritySchema, obligationEvidenceStateSchema, obligationTargetSchema, authorityReferenceSchema, observedCaseSchema, ownerBindingSchema, parserTypeBindingSchema, fixtureBindingSchema, nondeterminismSchema, verifierBindingSchema, reconstructionObligationManifestBindingSchema, reconstructionObligationManifestSchema, reviewedReconstructionObligationSchema, diagnosticSchema, reconstructionObligationSchema, countBySchema, countEntriesMatch, obligationSummariesMatch, reconstructionObligationLedgerSchema, reconstructionObligationLedgerInputSchema;
function init_reconstructionObligationLedgerSchemas() {
	return (init_reconstructionObligationLedgerSchemas = __esmMin((() => {
		init_coverage();
		init_stringPatterns();
		init_evidence();
		init_evidenceBundle();
		init_digests();
		init_comparisonSemantics();
		init_reconstructionObligationLedgerIntegrity();
		evidenceIdSchema = prefixedDigestSchema("ev");
		stableIdSchema = z.string().regex(STABLE_IDENTIFIER_PATTERN);
		textSchema = z.string().trim().min(1);
		sameProjection = (actual, expected) => {
			if (actual.length !== expected.length) return false;
			const counts = new Map();
			for (const value of actual) {
				const key = canonicalJson(value, "Reconstruction obligation ledger");
				counts.set(key, (counts.get(key) ?? 0) + 1);
			}
			for (const value of expected) {
				const key = canonicalJson(value, "Reconstruction obligation ledger");
				const count = counts.get(key);
				if (count === undefined) return false;
				if (count === 1) counts.delete(key);
				else counts.set(key, count - 1);
			}
			return counts.size === 0;
		};
		obligationStatusSchema = z.enum([
			"unowned",
			"characterized",
			"implemented",
			"verified",
			"contradicted",
			"blocked",
			"out-of-scope",
			"unknown"
		]);
		obligationLayerSchema = z.enum([
			"cli",
			"protocol",
			"electron",
			"persistence",
			"process",
			"runtime",
			"packaging",
			"native-abi",
			"application",
			"other"
		]);
		obligationCaseKindSchema = z.enum([
			"positive",
			"negative",
			"malformed",
			"cancellation",
			"teardown"
		]);
		obligationProofAuthoritySchema = z.enum([
			"unit",
			"integration",
			"protocol",
			"renderer",
			"packaged-process",
			"native-abi",
			"live-observation",
			"external"
		]);
		obligationOriginalAuthoritySchema = z.enum([
			"static",
			"runtime",
			"process",
			"external"
		]);
		obligationEvidenceStateSchema = z.enum([
			"candidate",
			"observed",
			"reviewed",
			"unknown"
		]);
		obligationTargetSchema = z.strictObject({
			artifact_sha256: digestSchema.nullable(),
			application_node_id: z.string().regex(/^jag_node_[a-f0-9]{64}$/u).nullable(),
			semantic_node_id: z.string().regex(/^jsrg_node_[a-f0-9]{64}$/u).nullable(),
			location: textSchema
		});
		authorityReferenceSchema = z.strictObject({
			evidence_id: evidenceIdSchema,
			authority: evidenceAuthoritySchema,
			state: obligationEvidenceStateSchema,
			location: textSchema
		});
		observedCaseSchema = z.strictObject({
			kind: obligationCaseKindSchema,
			evidence_id: evidenceIdSchema,
			location: textSchema
		});
		ownerBindingSchema = z.strictObject({
			module_path: textSchema,
			symbol: textSchema,
			owner_sha256: digestSchema
		});
		parserTypeBindingSchema = z.strictObject({
			parser: textSchema,
			schema: textSchema,
			domain_type: textSchema
		});
		fixtureBindingSchema = z.strictObject({
			fixture_id: stableIdSchema,
			case_kind: obligationCaseKindSchema,
			authority: obligationProofAuthoritySchema,
			evidence_ids: z.array(evidenceIdSchema).min(1)
		});
		nondeterminismSchema = z.strictObject({
			mode: z.enum([
				"total-order",
				"partial-order",
				"finite-traces"
			]),
			specification: textSchema
		});
		verifierBindingSchema = z.strictObject({
			verifier_id: stableIdSchema,
			claim_id: stableIdSchema,
			command: textSchema,
			authority: obligationProofAuthoritySchema,
			status: z.enum([
				"pass",
				"fail",
				"unknown",
				"unsupported",
				"skipped"
			]),
			result_evidence_id: evidenceIdSchema,
			enumerated_obligation_ids: z.array(stableIdSchema).min(1),
			nondeterminism: nondeterminismSchema
		});
		reconstructionObligationManifestBindingSchema = z.strictObject({
			obligation_id: stableIdSchema,
			owner: ownerBindingSchema,
			parser_type: parserTypeBindingSchema.nullable(),
			original_cases: z.array(observedCaseSchema),
			fixtures: z.array(fixtureBindingSchema),
			verifier: verifierBindingSchema.nullable()
		});
		reconstructionObligationManifestSchema = z.strictObject({
			bindings: z.array(reconstructionObligationManifestBindingSchema),
			contradictions: z.array(z.strictObject({
				obligation_id: stableIdSchema,
				evidence_ids: z.array(evidenceIdSchema).min(2)
			}))
		});
		reviewedReconstructionObligationSchema = z.strictObject({
			obligation_id: stableIdSchema,
			obligation_version: z.int().min(1),
			title: textSchema,
			application_layer: obligationLayerSchema,
			family: textSchema,
			target: obligationTargetSchema,
			required: z.boolean(),
			required_case_kinds: z.array(obligationCaseKindSchema).min(1),
			required_original_authority: obligationOriginalAuthoritySchema,
			required_fixture_authority: obligationProofAuthoritySchema,
			required_verifier_authority: obligationProofAuthoritySchema,
			requires_parser_type: z.boolean(),
			dependency_obligation_ids: z.array(stableIdSchema),
			residual_unknown_ids: z.array(stableIdSchema),
			unavailable_authority: z.array(textSchema),
			required_next_evidence: z.array(textSchema),
			disposition: z.enum([
				"active",
				"blocked",
				"out-of-scope"
			]),
			review_evidence_ids: z.array(evidenceIdSchema).min(1)
		});
		diagnosticSchema = z.strictObject({
			code: z.enum([
				"duplicate-definition",
				"missing-owner",
				"ambiguous-owner",
				"missing-parser-type",
				"missing-original-case",
				"weak-original-case-authority",
				"missing-case",
				"weak-fixture-authority",
				"inapplicable-fixture-proof",
				"fixture-failed",
				"missing-verifier",
				"verifier-does-not-enumerate",
				"missing-verifier-result",
				"weak-verifier-authority",
				"verifier-failed",
				"verifier-unavailable",
				"inapplicable-verifier-proof",
				"static-only",
				"contradiction",
				"contradiction-evidence-missing",
				"residual-unknown",
				"dependency-missing",
				"dependency-open",
				"unavailable-authority",
				"blocked",
				"out-of-scope"
			]),
			detail: textSchema
		});
		reconstructionObligationSchema = z.strictObject({
			obligation_id: stableIdSchema,
			obligation_version: z.int().min(1),
			title: textSchema,
			origin: z.enum(["generated", "reviewed"]),
			application_layer: obligationLayerSchema,
			family: textSchema,
			target: obligationTargetSchema,
			authority_references: z.array(authorityReferenceSchema).min(1),
			source_state: obligationEvidenceStateSchema,
			observed_cases: z.array(observedCaseSchema),
			required: z.boolean(),
			required_case_kinds: z.array(obligationCaseKindSchema).min(1),
			required_original_authority: obligationOriginalAuthoritySchema,
			required_fixture_authority: obligationProofAuthoritySchema,
			required_verifier_authority: obligationProofAuthoritySchema,
			requires_parser_type: z.boolean(),
			dependency_obligation_ids: z.array(stableIdSchema),
			residual_unknown_ids: z.array(stableIdSchema),
			unavailable_authority: z.array(textSchema),
			required_next_evidence: z.array(textSchema),
			binding: reconstructionObligationManifestBindingSchema.nullable(),
			status: obligationStatusSchema,
			diagnostics: z.array(diagnosticSchema)
		});
		countBySchema = (key) => z.array(z.strictObject({
			key,
			count: z.int().min(0)
		}));
		countEntriesMatch = (actual, expected) => {
			const actualCounts = new Map(actual.map(({ key, count }) => [key, count]));
			return actualCounts.size === actual.length && actual.length === expected.length && expected.every(({ key, count }) => actualCounts.get(key) === count);
		};
		obligationSummariesMatch = (actual, expected) => actual.total === expected.total && actual.required === expected.required && actual.verified === expected.verified && actual.required_open === expected.required_open && countEntriesMatch(actual.by_status, expected.by_status) && countEntriesMatch(actual.by_application_layer, expected.by_application_layer) && countEntriesMatch(actual.by_evidence_authority, expected.by_evidence_authority) && countEntriesMatch(actual.by_source_state, expected.by_source_state);
		reconstructionObligationLedgerSchema = z.strictObject({
			schema: z.literal("ReconstructionObligationLedger"),
			ledger_id: prefixedDigestSchema("rol"),
			closure_digest: digestSchema,
			status: z.enum([
				"ready",
				"open",
				"failed",
				"unknown"
			]),
			coverage: z.strictObject({ status: knownCoverageStatusSchema }),
			summary: z.strictObject({
				total: z.int().min(0),
				required: z.int().min(0),
				verified: z.int().min(0),
				required_open: z.int().min(0),
				by_status: countBySchema(obligationStatusSchema),
				by_application_layer: countBySchema(obligationLayerSchema),
				by_evidence_authority: countBySchema(evidenceAuthoritySchema).describe("Obligations per Evidence authority. An obligation counts once under each distinct authority among its authority_references, so counts can sum above total."),
				by_source_state: countBySchema(obligationEvidenceStateSchema).describe("Obligations per source_state; each obligation counts once.")
			}),
			reports: z.strictObject({
				missing_owner_obligation_ids: z.array(stableIdSchema),
				missing_verifier_obligation_ids: z.array(stableIdSchema),
				contradicted_obligation_ids: z.array(stableIdSchema),
				residual_unknown_ids: z.array(stableIdSchema)
			}),
			ownership_graph: z.array(z.strictObject({
				obligation_id: stableIdSchema,
				module_path: textSchema,
				symbol: textSchema
			})),
			dependency_graph: z.array(z.strictObject({
				obligation_id: stableIdSchema,
				depends_on_obligation_id: stableIdSchema
			})),
			obligations: z.array(reconstructionObligationSchema),
			evidence_links: z.array(evidenceIdSchema),
			limitations: z.array(textSchema)
		}).superRefine((ledger, context) => {
			if (ledger.status !== reconstructionObligationLedgerStatus(ledger.obligations, ledger.limitations)) context.addIssue({
				code: "custom",
				path: ["status"],
				message: "Ledger status does not match its obligations"
			});
			if (!obligationSummariesMatch(ledger.summary, summarizeReconstructionObligations(ledger.obligations))) context.addIssue({
				code: "custom",
				path: ["summary"],
				message: "Ledger summary does not match its obligations"
			});
			if (ledger.closure_digest !== reconstructionObligationLedgerClosureDigest(ledger)) context.addIssue({
				code: "custom",
				path: ["closure_digest"],
				message: "Ledger closure digest does not match its contents"
			});
			if (ledger.coverage.status !== reconstructionObligationCoverage(ledger.limitations).status) context.addIssue({
				code: "custom",
				path: ["coverage"],
				message: "Ledger coverage does not match its limitations"
			});
			const expectedReports = reconstructionObligationReports(ledger.obligations);
			for (const key of [
				"missing_owner_obligation_ids",
				"missing_verifier_obligation_ids",
				"contradicted_obligation_ids",
				"residual_unknown_ids"
			]) if (!sameProjection(ledger.reports[key], expectedReports[key])) context.addIssue({
				code: "custom",
				path: ["reports", key],
				message: "Ledger report does not match its obligations"
			});
			if (!sameProjection(ledger.ownership_graph, reconstructionObligationOwnershipGraph(ledger.obligations))) context.addIssue({
				code: "custom",
				path: ["ownership_graph"],
				message: "Ownership graph does not match its obligations"
			});
			if (!sameProjection(ledger.dependency_graph, reconstructionObligationDependencyGraph(ledger.obligations))) context.addIssue({
				code: "custom",
				path: ["dependency_graph"],
				message: "Dependency graph does not match its obligations"
			});
			const ledgerEvidenceIds = new Set(ledger.evidence_links);
			if (ledgerEvidenceIds.size !== ledger.evidence_links.length) context.addIssue({
				code: "custom",
				path: ["evidence_links"],
				message: "Evidence links must be unique"
			});
			if (reconstructionObligationEvidenceIds(ledger.obligations).some((evidenceId) => !ledgerEvidenceIds.has(evidenceId))) context.addIssue({
				code: "custom",
				path: ["evidence_links"],
				message: "Evidence links omit Evidence referenced by an obligation"
			});
		});
		reconstructionObligationLedgerInputSchema = z.strictObject({
			evidence_bundle: evidenceBundleSchema,
			reviewed_obligations: z.array(reviewedReconstructionObligationSchema),
			manifest: reconstructionObligationManifestSchema
		});
	})))();
}

//#endregion
//#region dist/domain/android/androidApplication.js
var androidApplicationProjectionResultSchema, projectAndroidInventory, classify$1, runtimeFamilies$1, bridgeCandidates$1, bridgeBasis$1;
function init_androidApplication() {
	return (init_androidApplication = __esmMin((() => {
		init_bridgeCandidateProjection();
		init_analysisErrorCore();
		init_artifactInventoryEvidence();
		init_digests();
		init_canonicalDigest();
		init_nativeConvention();
		init_mobileApplicationGraphProjection();
		init_unicodeCodePointOrder();
		init_result();
		init_apkV1MetadataName();
		androidApplicationProjectionResultSchema = z.strictObject({
			projection_id: prefixedDigestSchema("adp"),
			root_sha256: digestSchema,
			root_format: z.literal("apk"),
			source_evidence_ids: z.array(projectionEvidenceIdSchema).min(1),
			components: z.strictObject({
				manifests: z.array(projectedComponentSchema),
				resources: z.array(projectedComponentSchema),
				dex: z.array(projectedComponentSchema),
				jvm_classes: z.array(projectedComponentSchema),
				native_libraries: z.array(projectedComponentSchema),
				javascript: z.array(projectedComponentSchema),
				signing: z.array(projectedComponentSchema)
			}),
			unavailable_components: z.array(unavailableComponentSchema),
			runtime_families: z.array(z.enum([
				"dalvik-art",
				"java-kotlin",
				"native",
				"javascript",
				"react-native",
				"flutter",
				"unity"
			])),
			bridge_candidates: z.array(projectedBridgeCandidateSchema([
				"managed-and-native-content",
				"jni-library-convention",
				"react-native-convention",
				"flutter-convention",
				"unity-convention"
			])),
			bridge_candidate_coverage: bridgeCandidateCoverageSchema,
			coverage: z.strictObject({
				status: z.enum(["complete-within-inventory", "partial"]),
				inventory_complete: z.boolean()
			}),
			limitations: z.array(z.string())
		});
		projectAndroidInventory = (source) => {
			const { evidence, inventory } = source;
			if (inventory.manifest.root_format !== "apk") return err(new AnalysisInputError("project_android_application_graph", {}, [{
				path: [
					"inventory_evidence",
					0,
					"normalized_result",
					"manifest",
					"root_format"
				],
				reason: "invalid_value",
				message: `Android application projection requires APK inventory Evidence; the inventory root format is ${inventory.manifest.root_format}. APK is chosen for a ZIP archive whose name ends in .apk.`
			}]));
			const { entries, limitations: unresolved } = projectedInventoryEntries(inventory);
			const all = projectedFileComponents(entries);
			const unavailable = entries.flatMap(({ unavailable }) => unavailable === undefined ? [] : [unavailable]);
			const classified = classify$1(all);
			const bridgeProjection = bridgeCandidates$1([...classified.dex, ...classified.jvm_classes], classified.native_libraries);
			const components = classified;
			const limitations = [
				...unresolved,
				...inventory.limitations,
				...!hasCompleteInventoryCoverage(inventory, "container-entries") ? ["Source inventory coverage is partial; absence is unknown."] : [],
				"Manifest, resource, signing, and bytecode semantics require a dedicated Android provider; this projection reports exact inventory paths and hashes only.",
				"Runtime families are inferred from inventory formats and paths; filename suffixes do not establish valid DEX or JVM class bytes.",
				"Bridge candidates are path-based hypotheses, not decoded JNI declarations or observed runtime calls.",
				"A bridge basis is inferred from the native path and is repeated for every managed component.",
				"ZIP inventory cannot see the APK Signing Block, so an empty signing array does not mean the APK is unsigned.",
				...entries.some(({ path, kind }) => path === "AndroidManifest.xml" && (kind === "file" || kind === "slice")) ? [] : ["No root AndroidManifest.xml occurrence was observed. The APK family comes from the .apk suffix of a ZIP archive, so these bytes may not be an APK."],
				...bridgeProjection.coverage.status === "partial" ? [`Bridge candidate pairs exceeded the projection safety budget; ${bridgeProjection.coverage.omitted_candidates} hypotheses are omitted. Component arrays still include every component from the supplied inventory pages.`] : [],
				...unavailable.length > 0 ? ["Some inventoried occurrences have no authenticated content identity. Their paths and limitations are retained in unavailable_components; component absence is unknown."] : []
			];
			const withoutId = {
				root_sha256: inventory.manifest.root_sha256,
				root_format: "apk",
				source_evidence_ids: evidence.map(({ evidence_id: id }) => id).sort(compareUnicodeCodePoints),
				components,
				unavailable_components: unavailable,
				runtime_families: runtimeFamilies$1(all, classified),
				bridge_candidates: bridgeProjection.candidates,
				bridge_candidate_coverage: bridgeProjection.coverage,
				coverage: projectionCoverage(inventory, bridgeProjection.coverage.status === "complete" && unavailable.length === 0),
				limitations
			};
			return ok(androidApplicationProjectionResultSchema.parse({
				...withoutId,
				projection_id: `adp_${digestCanonicalValue(withoutId, "Android application projection")}`
			}));
		};
		classify$1 = (all) => ({
			manifests: all.filter(({ path }) => /(?:^|\/)AndroidManifest\.xml$/u.test(path)),
			resources: all.filter(({ path }) => /(?:^|\/)resources\.arsc$/u.test(path)),
			dex: all.filter(({ path }) => /(?:^|\/)[^/]+\.dex$/iu.test(path)),
			jvm_classes: all.filter(({ path }) => /(?:^|\/)[^/]+\.class$/iu.test(path)),
			native_libraries: all.filter(({ path, format }) => format === "elf" || /(?:^|\/)lib\/[^/]+\/[^/]+\.so$/iu.test(path)),
			javascript: all.filter(({ format }) => format === "javascript-bundle"),
			signing: all.filter(({ path }) => isV1SignatureMetadataName(path))
		});
		runtimeFamilies$1 = (all, components) => {
			const families = new Set();
			if (components.dex.length > 0) families.add("dalvik-art");
			if (components.jvm_classes.length > 0) families.add("java-kotlin");
			if (all.some(({ format }) => format === "elf")) families.add("native");
			if (all.some(({ format }) => format === "javascript-bundle")) families.add("javascript");
			for (const { path } of components.native_libraries) {
				const convention = nativeRuntimeConvention(path);
				if (convention !== null) families.add(convention);
			}
			return [...families].sort(compareUnicodeCodePoints);
		};
		bridgeCandidates$1 = (managed, native) => {
			return projectCartesianCandidates({
				groups: [{
					left: managed,
					right: native
				}],
				createCandidate: (managed_path, target) => ({
					managed_path,
					native_path: target.path,
					basis: bridgeBasis$1(target.path)
				})
			});
		};
		bridgeBasis$1 = (path) => {
			const convention = nativeRuntimeConvention(path);
			if (convention === "react-native") return "react-native-convention";
			if (convention === "flutter") return "flutter-convention";
			if (convention === "unity") return "unity-convention";
			if (/(?:^|\/)lib\/[^/]+\/lib[^/]+\.so$/iu.test(path)) return "jni-library-convention";
			return "managed-and-native-content";
		};
	})))();
}

//#endregion
//#region dist/domain/apple/appleBundleAnatomy.js
function* directoryPaths(tree) {
	for (const [parent, names] of tree.directories) for (const name of names) yield joinPath(parent, name);
}
var pathSchema, MACH_O_FORMATS, appleBundleSchema, isMachOFormat, isSidecar, isWithin, anatomyNameIs, anatomyChild, anatomyTailMatches, projectAppleBundleAnatomy, applicationRoots, detectBundles, indexTree, joinPath, directoryOf, parentDirectory, enclosingBundle, bundleLayout, bundleRole, directFiles, contentDirectories, namedDirectory, namedFile, infoPlistPath, executableCandidates, signingPaths, platformsOf;
function init_appleBundleAnatomy() {
	return (init_appleBundleAnatomy = __esmMin((() => {
		init_unicodeCodePointOrder();
		init_appleBundleTypes();
		pathSchema = z.string().min(1);
		MACH_O_FORMATS = ["mach-o", "mach-o-universal"];
		appleBundleSchema = z.strictObject({
			path: pathSchema,
			parent_path: pathSchema.nullable(),
			layout: z.enum([
				"shallow",
				"macos-deep",
				"versioned-framework"
			]),
			role: z.enum([
				"application",
				"app-extension",
				"xpc-service",
				"framework",
				"login-item",
				"system-extension",
				"driver-extension",
				"plug-in",
				"resource-bundle",
				"bundle",
				"helper-application",
				"nested-application"
			]),
			role_basis: z.literal("path-convention"),
			info_plist_path: pathSchema.nullable(),
			executable_candidates: z.array(pathSchema),
			signing_paths: z.array(pathSchema)
		});
		isMachOFormat = (format) => MACH_O_FORMATS.includes(format);
		isSidecar = (path) => {
			const segments = path.split("/");
			return segments.includes("__MACOSX") || (segments.at(-1) ?? "").startsWith("._");
		};
		isWithin = (path, root) => root === "." || path === root || path.startsWith(`${root}/`);
		anatomyNameIs = (actual, expected) => actual.toLocaleLowerCase("en-US") === expected.toLocaleLowerCase("en-US");
		anatomyChild = (names, expected) => {
			if (names === undefined) return null;
			let exact;
			let folded;
			for (const name of names) {
				if (name === expected) exact = name;
				else if (anatomyNameIs(name, expected) && (folded === undefined || compareUnicodeCodePoints(name, folded) < 0)) folded = name;
			}
			return exact ?? folded ?? null;
		};
		anatomyTailMatches = (path, expected) => {
			const actual = path.split("/");
			if (actual.length < expected.length) return false;
			const tail = actual.slice(-expected.length);
			return expected.every((name, index) => {
				const segment = tail[index];
				if (segment === undefined || segment.length === 0) return false;
				return name === "*" || anatomyNameIs(segment, name);
			});
		};
		projectAppleBundleAnatomy = (entries, subject) => {
			const tree = indexTree(entries);
			const roots = applicationRoots(tree, subject);
			return {
				roots,
				bundles: detectBundles(tree, roots)
			};
		};
		applicationRoots = (tree, subject) => {
			if (subject.format === "directory" && /\.app$/iu.test(subject.name)) return ["."];
			const found = new Set();
			for (const path of directoryPaths(tree)) {
				const segments = path.split("/");
				const app = segments[1];
				if (subject.format === "ipa") {
					if (anatomyNameIs(segments[0] ?? "", "Payload") && app !== undefined && /\.app$/iu.test(app)) found.add(`${segments[0]}/${app}`);
					continue;
				}
				const index = segments.findIndex((segment, position) => /\.app$/iu.test(segment) && anatomyNameIs(segments[position + 1] ?? "", "Contents"));
				if (index >= 0) found.add(segments.slice(0, index + 1).join("/"));
			}
			const roots = [...found];
			return roots.filter((root) => !roots.some((other) => other !== root && isWithin(root, other))).sort(compareUnicodeCodePoints);
		};
		detectBundles = (tree, roots) => {
			const paths = new Set(roots);
			for (const path of directoryPaths(tree)) {
				if (APPLE_BUNDLE_EXTENSION.test(path.split("/").at(-1) ?? "") && roots.some((root) => isWithin(path, root))) paths.add(path);
			}
			return [...paths].sort(compareUnicodeCodePoints).map((path) => {
				const layout = bundleLayout(path, tree);
				return {
					path,
					parent_path: enclosingBundle(path, paths),
					layout,
					role: roots.includes(path) ? "application" : bundleRole(path),
					role_basis: "path-convention",
					info_plist_path: infoPlistPath(path, layout, tree),
					executable_candidates: executableCandidates(path, layout, tree),
					signing_paths: signingPaths(path, layout, tree)
				};
			});
		};
		indexTree = (entries) => {
			const directories = new Map();
			const files = new Map();
			for (const entry of entries) {
				const { path, kind } = entry;
				if (isSidecar(path)) continue;
				const segments = path.split("/");
				let parent = "";
				for (const [index, segment] of segments.entries()) {
					const leaf = index === segments.length - 1;
					if (!leaf || kind === "directory") {
						const names = directories.get(parent) ?? new Set();
						names.add(segment);
						directories.set(parent, names);
					} else if (kind === "file") {
						const children = files.get(parent) ?? new Map();
						children.set(segment, entry);
						files.set(parent, children);
					}
					parent = joinPath(parent, segment);
				}
			}
			return {
				directories,
				files
			};
		};
		joinPath = (directory, name) => directory === "" ? name : `${directory}/${name}`;
		directoryOf = (bundle) => bundle === "." ? "" : bundle;
		parentDirectory = (path) => path.slice(0, Math.max(0, path.lastIndexOf("/")));
		enclosingBundle = (path, bundles) => {
			if (path === ".") return null;
			const segments = path.split("/");
			for (let length = segments.length - 1; length > 0; length--) {
				const candidate = segments.slice(0, length).join("/");
				if (bundles.has(candidate)) return candidate;
			}
			return bundles.has(".") ? "." : null;
		};
		bundleLayout = (bundle, tree) => {
			const directory = directoryOf(bundle);
			if (namedDirectory(tree, directory, "Contents") !== null) return "macos-deep";
			if (namedDirectory(tree, directory, "Versions") !== null) return "versioned-framework";
			return "shallow";
		};
		bundleRole = (bundle) => {
			const segments = bundle.split("/");
			const name = (segments.at(-1) ?? "").toLowerCase();
			const container = segments.at(-2);
			if (name.endsWith(".appex")) return "app-extension";
			if (name.endsWith(".xpc")) return "xpc-service";
			if (name.endsWith(".framework")) return "framework";
			if (name.endsWith(".systemextension")) return "system-extension";
			if (name.endsWith(".dext")) return "driver-extension";
			if (name.endsWith(".bundle")) {
				if (anatomyNameIs(container ?? "", "PlugIns")) return "plug-in";
				return anatomyNameIs(container ?? "", "Resources") ? "resource-bundle" : "bundle";
			}
			if (!name.endsWith(".app")) return "plug-in";
			if (anatomyNameIs(container ?? "", "LoginItems") && anatomyNameIs(segments.at(-3) ?? "", "Library")) return "login-item";
			if (anatomyNameIs(container ?? "", "Helpers")) return "helper-application";
			return "nested-application";
		};
		directFiles = (directory, tree) => [...tree.files.get(directory)?.values() ?? []].sort((left, right) => compareUnicodeCodePoints(left.path, right.path));
		contentDirectories = (bundle, layout, tree) => {
			const directory = directoryOf(bundle);
			if (layout === "macos-deep") {
				const contents = namedDirectory(tree, directory, "Contents");
				return contents === null ? [] : [contents];
			}
			if (layout === "shallow") return [directory];
			const versions = namedDirectory(tree, directory, "Versions");
			if (versions === null) return [];
			return [...tree.directories.get(versions) ?? []].filter((version) => !anatomyNameIs(version, "Current")).map((version) => joinPath(versions, version)).sort(compareUnicodeCodePoints);
		};
		namedDirectory = (tree, directory, expected) => {
			const name = anatomyChild(tree.directories.get(directory), expected);
			return name === null ? null : joinPath(directory, name);
		};
		namedFile = (tree, directory, expected) => {
			const name = anatomyChild(tree.files.get(directory)?.keys(), expected);
			return name === null ? null : joinPath(directory, name);
		};
		infoPlistPath = (bundle, layout, tree) => {
			const directories = contentDirectories(bundle, layout, tree);
			if (directories.length !== 1) return null;
			const directory = directories[0];
			if (directory === undefined) return null;
			if (layout === "macos-deep") return namedFile(tree, directory, "Info.plist");
			const resources = namedDirectory(tree, directory, "Resources");
			const resourcePlist = resources === null ? null : namedFile(tree, resources, "Info.plist");
			if (layout === "versioned-framework") return resourcePlist;
			return namedFile(tree, directory, "Info.plist") ?? resourcePlist;
		};
		executableCandidates = (bundle, layout, tree) => contentDirectories(bundle, layout, tree).flatMap((directory) => {
			const executableDirectory = layout === "macos-deep" ? namedDirectory(tree, directory, "MacOS") : directory;
			return executableDirectory === null ? [] : directFiles(executableDirectory, tree);
		}).filter(({ component }) => component !== undefined && isMachOFormat(component.format)).map(({ path }) => path);
		signingPaths = (bundle, layout, tree) => contentDirectories(bundle, layout, tree).flatMap((directory) => {
			const signature = namedDirectory(tree, directory, "_CodeSignature");
			return [
				signature === null ? null : namedFile(tree, signature, "CodeResources"),
				namedFile(tree, directory, "embedded.provisionprofile"),
				namedFile(tree, directory, "embedded.mobileprovision")
			];
		}).filter((path) => path !== null).sort(compareUnicodeCodePoints);
		platformsOf = (bundles) => [...new Set(bundles.flatMap(({ path, role, layout, info_plist_path: plist }) => {
			if (role !== "application") return [];
			if (layout === "macos-deep") return ["macos"];
			if (layout === "shallow" && plist !== null && parentDirectory(plist) === directoryOf(path)) return ["ios"];
			return [];
		}))].sort(compareUnicodeCodePoints);
	})))();
}

//#endregion
//#region dist/domain/apple/appleApplication.js
var APPLE_ROOT_FORMATS, appleApplicationProjectionResultSchema, projectAppleInventory, appleProjectionId, attributeComponents, appleRootFormat, isNativeLibrary, launchdDomain, classifyComponents, identifyRuntimeFamilies, identifyBridgeCandidates, bridgeBasis, projectionLimitations;
function init_appleApplication() {
	return (init_appleApplication = __esmMin((() => {
		init_evidence();
		init_analysisErrorCore();
		init_appleBundleAnatomy();
		init_nativeConvention();
		init_artifactInventoryEvidence();
		init_digests();
		init_canonicalDigest();
		init_bridgeCandidateProjection();
		init_mobileApplicationGraphProjection();
		init_canonicalOrdering();
		init_unicodeCodePointOrder();
		init_result();
		APPLE_ROOT_FORMATS = [
			"ipa",
			"directory",
			"zip",
			"dmg"
		];
		appleApplicationProjectionResultSchema = z.strictObject({
			projection_id: prefixedDigestSchema("aap"),
			root_sha256: digestSchema,
			root_format: z.enum(APPLE_ROOT_FORMATS),
			platforms: z.array(z.enum(["ios", "macos"])),
			source_evidence_ids: z.array(projectionEvidenceIdSchema).min(1),
			application_roots: z.array(projectionPathSchema),
			bundles: z.array(appleBundleSchema),
			components: z.strictObject({
				bundle_metadata: z.array(projectedComponentSchema),
				executables: z.array(projectedComponentSchema),
				frameworks: z.array(projectedComponentSchema),
				native_libraries: z.array(projectedComponentSchema),
				javascript: z.array(projectedComponentSchema),
				signing: z.array(projectedComponentSchema),
				privileged_helpers: z.array(projectedComponentSchema),
				launchd_plists: z.array(projectedComponentSchema.extend({ domain: z.enum(["agent", "daemon"]) })),
				helpers: z.array(projectedComponentSchema)
			}),
			unavailable_components: z.array(unavailableComponentSchema),
			symlinks: z.array(projectionPathSchema),
			runtime_families: z.array(z.enum([
				"native",
				"swift-objective-c",
				"javascript",
				"react-native",
				"flutter",
				"unity"
			])),
			bridge_candidates: z.array(z.strictObject({
				source_path: projectionPathSchema,
				native_path: projectionPathSchema,
				basis: z.enum([
					"javascript-and-native-content",
					"react-native-convention",
					"flutter-convention",
					"unity-convention"
				])
			})),
			bridge_candidate_coverage: bridgeCandidateCoverageSchema,
			coverage: z.strictObject({
				status: z.enum(["complete-within-inventory", "partial"]),
				inventory_complete: z.boolean()
			}),
			limitations: z.array(z.string())
		});
		projectAppleInventory = (source) => {
			const { evidence, inventory } = source;
			const rootFormatResult = appleRootFormat(inventory.manifest.root_format);
			if (!rootFormatResult.ok) return rootFormatResult;
			const rootFormat = rootFormatResult.value;
			const { entries, limitations: unresolved } = projectedInventoryEntries(inventory);
			const inventoried = projectedFileComponents(entries);
			const { roots, bundles } = projectAppleBundleAnatomy(entries, {
				name: evidenceSubjectDisplay(evidence[0] ?? {})?.name ?? "",
				format: rootFormat
			});
			const { all, unattributed } = attributeComponents(inventoried, roots, rootFormat);
			const unavailable = attributeComponents(entries.flatMap(({ kind, unavailable }) => (kind === "file" || kind === "slice") && unavailable !== undefined ? [unavailable] : []), roots, rootFormat);
			const classified = classifyComponents(entries, all, roots, bundles);
			const runtimeFamilies = identifyRuntimeFamilies(all);
			const bridgeProjection = identifyBridgeCandidates(classified.javascript, uniqueSortedBy([...classified.executables, ...classified.native_libraries], (component) => component.path), roots);
			const uninventoriedImage = rootFormat === "dmg" && inventory.occurrences.length === 1;
			const inventoryComplete = hasCompleteInventoryCoverage(inventory, "container-entries");
			const complete = inventoryComplete && !uninventoriedImage;
			const limitations = [
				...unresolved,
				...inventory.limitations,
				...projectionLimitations({
					complete: inventoryComplete,
					uninventoriedImage,
					roots,
					bundles,
					sidecars: entries.some(({ path }) => isSidecar(path)),
					symlinks: entries.some(({ kind }) => kind === "symlink"),
					unattributed: unattributed + unavailable.unattributed,
					unavailable: unavailable.all.length > 0,
					bridgeCandidateCoverage: bridgeProjection.coverage
				})
			];
			const withoutId = {
				root_sha256: inventory.manifest.root_sha256,
				root_format: rootFormat,
				platforms: platformsOf(bundles),
				source_evidence_ids: evidence.map(({ evidence_id: id }) => id).sort(compareUnicodeCodePoints),
				application_roots: roots,
				bundles,
				components: classified,
				unavailable_components: unavailable.all,
				symlinks: entries.filter(({ kind }) => kind === "symlink").map(({ path }) => path).sort(compareUnicodeCodePoints),
				runtime_families: runtimeFamilies,
				bridge_candidates: bridgeProjection.candidates,
				bridge_candidate_coverage: bridgeProjection.coverage,
				coverage: {
					status: complete && unavailable.all.length === 0 && bridgeProjection.coverage.status === "complete" ? "complete-within-inventory" : "partial",
					inventory_complete: inventory.complete
				},
				limitations
			};
			return ok(appleApplicationProjectionResultSchema.parse({
				...withoutId,
				projection_id: appleProjectionId(withoutId)
			}));
		};
		appleProjectionId = (projection) => `aap_${digestCanonicalValue(projection, "Apple application projection")}`;
		attributeComponents = (inventoried, roots, rootFormat) => {
			const visible = inventoried.filter(({ path }) => !isSidecar(path));
			if (rootFormat === "ipa") return {
				all: visible,
				unattributed: 0
			};
			const all = visible.filter(({ path }) => roots.some((root) => isWithin(path, root)));
			return {
				all,
				unattributed: visible.length - all.length
			};
		};
		appleRootFormat = (format) => {
			const root = APPLE_ROOT_FORMATS.find((candidate) => candidate === format);
			if (root === undefined) return err(new AnalysisInputError("project_apple_application_graph", {}, [{
				path: [
					"inventory_evidence",
					0,
					"normalized_result",
					"manifest",
					"root_format"
				],
				reason: "invalid_value",
				message: `Apple application projection requires IPA, directory, ZIP, or DMG inventory Evidence (got ${format})`
			}]));
			return ok(root);
		};
		isNativeLibrary = (path) => /\.(?:dylib|so)$/iu.test(path);
		launchdDomain = (path) => {
			if (anatomyTailMatches(path, [
				"Contents",
				"Library",
				"LaunchAgents",
				"*"
			])) return "agent";
			if (anatomyTailMatches(path, [
				"Contents",
				"Library",
				"LaunchDaemons",
				"*"
			])) return "daemon";
			return undefined;
		};
		classifyComponents = (entries, all, roots, bundles) => {
			const frameworkRoots = bundles.filter(({ role }) => role === "framework").map(({ path }) => path);
			const withinApp = (path) => roots.some((root) => isWithin(path, root));
			const matching = (predicate) => entries.flatMap(({ path, kind, component }) => kind === "file" && component !== undefined && !isSidecar(path) && withinApp(path) && predicate(path) ? [component] : []);
			const lastSegment = (path) => path.split("/").at(-1) ?? "";
			return {
				bundle_metadata: all.filter(({ path }) => anatomyNameIs(lastSegment(path), "Info.plist")),
				executables: all.filter(({ path, format }) => isMachOFormat(format) && (withinApp(path) || !isNativeLibrary(path))),
				frameworks: all.filter(({ path }) => frameworkRoots.some((root) => isWithin(path, root))),
				native_libraries: all.filter(({ path }) => isNativeLibrary(path)),
				javascript: all.filter(({ format }) => format === "javascript-bundle"),
				signing: all.filter(({ path }) => anatomyTailMatches(path, ["_CodeSignature", "CodeResources"]) || anatomyNameIs(lastSegment(path), "embedded.mobileprovision") || anatomyNameIs(lastSegment(path), "embedded.provisionprofile")),
				privileged_helpers: matching((path) => anatomyTailMatches(path, [
					"Contents",
					"Library",
					"LaunchServices",
					"*"
				])),
				launchd_plists: matching((path) => path.endsWith(".plist")).flatMap((component) => {
					const domain = launchdDomain(component.path);
					return domain === undefined ? [] : [{
						...component,
						domain
					}];
				}),
				helpers: matching((path) => anatomyTailMatches(path, [
					"Contents",
					"Helpers",
					"*"
				]))
			};
		};
		identifyRuntimeFamilies = (all) => {
			const families = new Set();
			if (all.some(({ format }) => ["mach-o", "mach-o-universal"].includes(format))) families.add("native");
			if (all.some(({ path }) => isSwiftRuntimeLibrary(path))) families.add("swift-objective-c");
			if (all.some(({ format }) => format === "javascript-bundle")) families.add("javascript");
			for (const { path } of all) {
				const convention = nativeRuntimeConvention(path);
				if (convention !== null) families.add(convention);
			}
			return [...families].sort(compareUnicodeCodePoints);
		};
		identifyBridgeCandidates = (scripts, native, roots) => {
			const owner = (path) => roots.find((root) => isWithin(path, root)) ?? null;
			const scriptGroups = [];
			for (const script of scripts) {
				const root = owner(script.path);
				const last = scriptGroups.at(-1);
				if (last?.root === root) last.left.push(script);
				else scriptGroups.push({
					root,
					left: [script]
				});
			}
			const nativeByRoot = new Map();
			for (const item of native) {
				const root = owner(item.path);
				const scoped = nativeByRoot.get(root) ?? [];
				scoped.push(item);
				nativeByRoot.set(root, scoped);
			}
			const groups = scriptGroups.map(({ root, left }) => ({
				left,
				right: nativeByRoot.get(root) ?? []
			}));
			return projectCartesianCandidates({
				groups,
				createCandidate: (source_path, item) => ({
					source_path,
					native_path: item.path,
					basis: bridgeBasis(item.path)
				})
			});
		};
		bridgeBasis = (path) => {
			const convention = nativeRuntimeConvention(path);
			if (convention === "react-native") return "react-native-convention";
			if (convention === "flutter") return "flutter-convention";
			if (convention === "unity") return "unity-convention";
			return "javascript-and-native-content";
		};
		projectionLimitations = (facts) => [
			...!facts.complete ? ["Source inventory coverage is partial; absence is unknown."] : [],
			...facts.uninventoriedImage ? ["The DMG's contents were not inventoried on this host; bundle absence is unknown."] : [],
			...facts.roots.length === 0 ? ["No application bundle (Payload/*.app or *.app/Contents) was present in the supplied inventory pages."] : [],
			...facts.bundles.some(({ layout, info_plist_path: plist }) => layout === "versioned-framework" && plist === null) ? ["A versioned framework has several version directories or no Versions/*/Resources/Info.plist; the Info.plist that Versions/Current selects is unknown because symlink targets are not inventoried."] : [],
			...facts.symlinks ? ["Symlinks are reported by path only; their targets are not inventoried, so bundles are reported at their real paths."] : [],
			...facts.unattributed > 0 ? [`${facts.unattributed} inventoried entries outside every application root are not attributed to the application.`] : [],
			...facts.sidecars ? ["AppleDouble sidecar entries (._* files and __MACOSX/) describe neighbouring files and are excluded from bundle roles."] : [],
			...facts.bridgeCandidateCoverage.status === "partial" ? [`Bridge candidate pairs exceeded the projection safety budget; ${facts.bridgeCandidateCoverage.omitted_candidates} hypotheses are omitted. Component arrays still include every component from the supplied inventory pages.`] : [],
			...facts.unavailable ? ["Some inventoried files have no authenticated content identity. Their paths and limitations are retained in unavailable_components; component absence is unknown."] : [],
			"Bundle roles follow path conventions. Read each info_plist_path with inspect_plist for CFBundleExecutable, identifiers, and declared services.",
			"Bundle identifiers and signing claims require dedicated plist and CMS parsing; this projection reports only exact paths and hashes.",
			"Runtime families are inferred from inventory formats and bounded framework path conventions, not observed runtime loading.",
			"Generic framework and dylib paths do not establish Swift or Objective-C; this inventory projection does not decode language metadata.",
			"Bridge candidates are path-based hypotheses, not observed runtime calls.",
			"A bridge basis is inferred from the native path and is repeated for every managed component."
		];
	})))();
}

//#endregion
//#region dist/domain/harmony/harmonyApplication.js
var HARMONY_ROOT_FORMATS, harmonyApplicationProjectionResultSchema, PKG_CONTEXT_NOT_READ, pkgContextDeclared, projectHarmonyInventory, harmonyRootFormat, classifyManifests, classify, isResourcePath, runtimeFamilies, bridgeCandidates, napiBasis;
function init_harmonyApplication() {
	return (init_harmonyApplication = __esmMin((() => {
		init_bridgeCandidateProjection();
		init_analysisErrorCore();
		init_artifactInventoryEvidence();
		init_digests();
		init_canonicalDigest();
		init_nativeConvention();
		init_mobileApplicationGraphProjection();
		init_unicodeCodePointOrder();
		init_result();
		HARMONY_ROOT_FORMATS = [
			"hap",
			"hsp",
			"app-pack"
		];
		harmonyApplicationProjectionResultSchema = z.strictObject({
			projection_id: prefixedDigestSchema("hmp"),
			root_sha256: digestSchema,
			root_format: z.enum(HARMONY_ROOT_FORMATS),
			source_evidence_ids: z.array(projectionEvidenceIdSchema).min(1),
			packaging_model: z.enum([
				"stage",
				"fa",
				"unknown"
			]),
			components: z.strictObject({
				manifests: z.array(projectedComponentSchema),
				bytecode: z.array(projectedComponentSchema),
				resources: z.array(projectedComponentSchema),
				native_libraries: z.array(projectedComponentSchema),
				javascript: z.array(projectedComponentSchema),
				signing: z.array(projectedComponentSchema)
			}),
			unclassified_components: z.array(projectedComponentSchema),
			unavailable_components: z.array(unavailableComponentSchema),
			app_pack_children: z.array(z.union([projectedComponentSchema, unavailableComponentSchema])),
			runtime_families: z.array(z.enum([
				"ark",
				"native",
				"javascript",
				"react-native",
				"flutter",
				"unity"
			])),
			bridge_candidates: z.array(projectedBridgeCandidateSchema(["managed-and-native-content", "napi-library-convention"])),
			bridge_candidate_coverage: bridgeCandidateCoverageSchema,
			coverage: z.strictObject({
				status: z.enum(["complete-within-inventory", "partial"]),
				inventory_complete: z.boolean()
			}),
			limitations: z.array(z.string())
		});
		PKG_CONTEXT_NOT_READ = "pkgContextInfo.json is inventoried but not read, so bridge_candidates are not narrowed by its isSO declarations; narrowing requires parsed file content that this projection does not receive.";
		pkgContextDeclared = (files) => files.some(({ path }) => /(?:^|\/)pkgContextInfo\.json$/iu.test(path));
		projectHarmonyInventory = (source) => {
			const { evidence, inventory } = source;
			const rootFormatResult = harmonyRootFormat(inventory.manifest.root_format);
			if (!rootFormatResult.ok) return rootFormatResult;
			const rootFormat = rootFormatResult.value;
			const { entries, limitations: unresolved } = projectedInventoryEntries(inventory);
			const all = projectedFileComponents(entries);
			const fileEntries = entries.filter(({ kind }) => kind === "file" || kind === "slice");
			const unavailable = fileEntries.flatMap(({ unavailable }) => unavailable === undefined ? [] : [unavailable]);
			const children = [];
			if (rootFormat === "app-pack") {
				for (const entry of fileEntries) {
					if (!/\.(?:hap|hsp)$/iu.test(entry.path)) continue;
					const child = entry.component ?? entry.unavailable;
					if (child !== undefined) children.push(child);
				}
			}
			const manifests = classifyManifests(fileEntries);
			const classified = classify(all, manifests.components);
			const classifiedFiles = new Set([...Object.values(classified).flat(), ...children]);
			const bridgeProjection = bridgeCandidates(classified.bytecode, classified.native_libraries);
			const limitations = [
				...unresolved,
				...inventory.limitations,
				...!hasCompleteInventoryCoverage(inventory, "container-entries") ? ["Source inventory coverage is partial; absence is unknown."] : [],
				...unavailable.length > 0 ? ["Some inventoried files or slices have no authenticated content identity. Their paths and limitations are retained in unavailable_components; component and runtime absence is unknown."] : [],
				"Manifest, module, resource, and signing semantics require a dedicated HarmonyOS provider; this projection reports exact inventory paths and hashes only.",
				"The packaging model is a path-presence heuristic: root module.json indicates Stage and root config.json indicates FA. Both declarations can coexist in unusual layouts.",
				"Runtime families are inferred from inventory formats and paths; filename suffixes do not establish valid Ark bytecode.",
				"The signing component lists META-INF certificate-entry suffixes only; signatures applied by the packaging tool live in the ZIP signing block rather than archive entries, so an empty signing list does not mean the package is unsigned.",
				"Bridge candidates are path-based hypotheses, not decoded N-API declarations or observed runtime calls.",
				...pkgContextDeclared(fileEntries) ? [PKG_CONTEXT_NOT_READ] : [],
				...rootFormat === "app-pack" ? ["App Pack child packages are listed by inventory path only; their contents are not recursively inventoried by this projection.", "The app-pack root classification is a verified-ZIP-magic plus .app suffix rule; the projection does not require pack.info or child packages before reporting the root format."] : [],
				"HarmonyOS .har shared libraries are not identified by this projection; the .har suffix also names HTTP Archive JSON, so that classification requires verified ZIP bytes.",
				...bridgeProjection.coverage.status === "partial" ? [`Bridge candidate pairs exceeded the projection safety budget; ${bridgeProjection.coverage.omitted_candidates} hypotheses are omitted. Component arrays still include every component from the supplied inventory pages.`] : []
			];
			const withoutId = {
				root_sha256: inventory.manifest.root_sha256,
				root_format: rootFormat,
				source_evidence_ids: evidence.map(({ evidence_id: id }) => id).sort(compareUnicodeCodePoints),
				packaging_model: manifests.packagingModel,
				components: classified,
				unclassified_components: all.filter((component) => !classifiedFiles.has(component)),
				unavailable_components: unavailable,
				app_pack_children: children,
				runtime_families: runtimeFamilies(all, classified),
				bridge_candidates: bridgeProjection.candidates,
				bridge_candidate_coverage: bridgeProjection.coverage,
				coverage: projectionCoverage(inventory, bridgeProjection.coverage.status === "complete" && unavailable.length === 0),
				limitations
			};
			return ok(harmonyApplicationProjectionResultSchema.parse({
				...withoutId,
				projection_id: `hmp_${digestCanonicalValue(withoutId, "HarmonyOS application projection")}`
			}));
		};
		harmonyRootFormat = (format) => {
			const root = HARMONY_ROOT_FORMATS.find((candidate) => candidate === format);
			if (root === undefined) return err(new AnalysisInputError("project_harmony_application_graph", {}, [{
				path: [
					"inventory_evidence",
					0,
					"normalized_result",
					"manifest",
					"root_format"
				],
				reason: "invalid_value",
				message: `HarmonyOS application projection requires HAP, HSP, or App Pack inventory Evidence (got ${format})`
			}]));
			return ok(root);
		};
		classifyManifests = (entries) => {
			const components = [];
			let packagingModel = "unknown";
			for (const { path, sourcePath, component } of entries) {
				if ((sourcePath ?? path) !== path) continue;
				if (path !== "module.json" && path !== "config.json" && path !== "pack.info") continue;
				if (component !== undefined) components.push(component);
				if (path === "module.json") packagingModel = "stage";
				else if (path === "config.json" && packagingModel === "unknown") packagingModel = "fa";
			}
			return {
				components,
				packagingModel
			};
		};
		classify = (all, manifests) => ({
			manifests,
			bytecode: all.filter(({ path }) => /\.(?:abc|pa)$/iu.test(path)),
			resources: all.filter(({ path }) => isResourcePath(path)),
			native_libraries: all.filter(({ path, format }) => format === "elf" || /(?:^|\/)libs\/[^/]+\/[^/]+\.so$/iu.test(path)),
			javascript: all.filter(({ path, format }) => format === "javascript-bundle" || /\.(?:m?js|cjs)$/iu.test(path)),
			signing: all.filter(({ path }) => /^META-INF\/[^/]+\.(?:p7b|sig|cer|crt|pem|provision|rsa|dsa|ec)$/iu.test(path))
		});
		isResourcePath = (path) => /(?:^|\/)resources\.index$/iu.test(path) || /^(?:resources\/|assets\/[^/]+\/resources\/)/iu.test(path);
		runtimeFamilies = (all, components) => {
			const families = new Set();
			if (components.bytecode.length > 0) families.add("ark");
			if (all.some(({ format }) => format === "elf")) families.add("native");
			if (components.javascript.length > 0) families.add("javascript");
			for (const { path } of all) {
				const convention = nativeRuntimeConvention(path);
				if (convention !== null) families.add(convention);
			}
			return [...families].sort(compareUnicodeCodePoints);
		};
		bridgeCandidates = (managed, native) => {
			return projectCartesianCandidates({
				groups: [{
					left: managed,
					right: native
				}],
				createCandidate: (managed_path, target) => ({
					managed_path,
					native_path: target.path,
					basis: napiBasis(target.path)
				})
			});
		};
		napiBasis = (path) => /(?:^|\/)libs\/[^/]+\/lib[^/]+\.so$/iu.test(path) ? "napi-library-convention" : "managed-and-native-content";
	})))();
}

//#endregion
//#region dist/contracts/guidedWorkflowSchemas.js
var guidedWorkflowsInputSchema, guidedWorkflowItemSchema, guidedWorkflowsOutputSchema;
function init_guidedWorkflowSchemas() {
	return (init_guidedWorkflowSchemas = __esmMin((() => {
		init_schemaAnnotations();
		guidedWorkflowsInputSchema = z.discriminatedUnion("action", [z.strictObject({ action: z.literal("list") }), z.strictObject({
			action: z.literal("render"),
			workflow_id: z.string().min(1).refine((value) => value.trim().length > 0).describe("Exact guided workflow identifier from the list result"),
			arguments: z.record(z.string(), z.string()).optional().describe("Caller-supplied string values for the selected workflow")
		})]);
		guidedWorkflowItemSchema = z.strictObject({
			workflow_id: z.string(),
			description: z.string(),
			arguments: z.array(z.strictObject({
				name: z.string(),
				description: z.string(),
				required: z.boolean()
			}))
		});
		guidedWorkflowsOutputSchema = presentObjectRoot(z.discriminatedUnion("action", [z.strictObject({
			action: z.literal("list"),
			workflows: z.array(guidedWorkflowItemSchema)
		}), z.strictObject({
			action: z.literal("render"),
			workflow_id: z.string(),
			rendered_prompt: z.string()
		})]));
	})))();
}

//#endregion
//#region dist/contracts/javascript/javascriptApplicationWorkflowExamples.js
var reconciliationInput, reconciliation, reconciliationEvidence, TRACE_SEED, JAVASCRIPT_FEATURE_TRACE_EXAMPLE, JAVASCRIPT_APPLICATION_VERSION_COMPARISON_EXAMPLE, SOURCE_TO_BUNDLE_COMPARISON_EXAMPLE;
function init_javascriptApplicationWorkflowExamples() {
	return (init_javascriptApplicationWorkflowExamples = __esmMin((() => {
		init_targetIdentity();
		init_evidence();
		init_javascriptRuntimeReconciliation();
		init_javascriptRuntimeReconciliationExample();
		init_referenceSourceGraph();
		init_javascriptRuntimeReconciliationSchemas();
		reconciliationInput = readRuntimeReconciliationInput(reconcileJavaScriptRuntimeInputSchema.parse(JAVASCRIPT_RUNTIME_RECONCILIATION_EXAMPLE));
		if (!reconciliationInput.ok) throw new Error("The JavaScript runtime reconciliation contract example is invalid", { cause: reconciliationInput.error });
		reconciliation = reconcileJavaScriptRuntime(reconciliationInput.value);
		reconciliationEvidence = createEvidence(unknownTarget("derived-from-linked-evidence"), {
			id: "rea-javascript-runtime-reconciliation",
			name: "REA JavaScript runtime reconciliation",
			version: "1"
		}, {
			predicateType: "rea.javascript-runtime-reconciliation",
			operation: "reconcile_javascript_runtime",
			parameters: {
				static_layers: JAVASCRIPT_RUNTIME_RECONCILIATION_EXAMPLE.static_layers.map(({ analysis }) => ({
					role: "application",
					evidence_id: analysis.evidence_id,
					runtime_mappings: []
				})),
				runtime_evidence_ids: JAVASCRIPT_RUNTIME_RECONCILIATION_EXAMPLE.runtime_observations.map(({ evidence_id: id }) => id)
			},
			result: reconciliation,
			confidence: "inferred",
			authority: "analyst-inference",
			limitations: reconciliation.limitations,
			evidenceLinks: reconciliation.evidence_links
		});
		TRACE_SEED = {
			kind: "module",
			value: "renderer.js",
			match: "exact",
			case_sensitive: false
		};
		JAVASCRIPT_FEATURE_TRACE_EXAMPLE = {
			application: JAVASCRIPT_APPLICATION_EVIDENCE_EXAMPLE,
			seed: TRACE_SEED,
			direction: "both"
		};
		JAVASCRIPT_APPLICATION_VERSION_COMPARISON_EXAMPLE = {
			left: JAVASCRIPT_APPLICATION_EVIDENCE_EXAMPLE,
			right: reconciliationEvidence
		};
		SOURCE_TO_BUNDLE_COMPARISON_EXAMPLE = {
			reference: createHistoricalSourceGraph({
				schema: "HistoricalSourceGraph",
				authority: "historical-reference",
				root_alias: "$REFERENCE_ROOT",
				inventory_state: "complete",
				entries: [{
					path: "src",
					kind: "directory",
					classifications: ["source"],
					tree_state: "enumerated",
					limitations: []
				}, {
					path: "src/main.ts",
					kind: "file",
					sha256: "2".repeat(64),
					size: 128,
					language: "TypeScript",
					classifications: ["source"],
					content_state: "hashed",
					limitations: []
				}],
				relationships: [],
				parse_failures: [],
				exclusions: [],
				languages: ["TypeScript"],
				manifests: [],
				vcs: {
					kind: "none",
					head: null,
					dirty: null
				},
				provenance: {
					importer: "rea",
					importer_version: "1",
					caller: "contract-example"
				},
				limitations: []
			}),
			application: JAVASCRIPT_APPLICATION_EVIDENCE_EXAMPLE
		};
	})))();
}

//#endregion
//#region dist/contracts/javascript/javascriptExportShapeComparisonExample.js
var captures, summary, statistics, modulePath, limitations, exampleEvidence, JAVASCRIPT_EXPORT_SHAPE_COMPARISON_EXAMPLE;
function init_javascriptExportShapeComparisonExample() {
	return (init_javascriptExportShapeComparisonExample = __esmMin((() => {
		init_evidence();
		init_webContentArtifact();
		init_javascriptSemanticAnalysis();
		init_javascriptExportReturnShapeProjection();
		init_javascriptApplicationEvidenceSchemas();
		init_javascriptApplicationGraph();
		init_javascriptSemanticGraph();
		init_javascriptSemanticGraphSchemas();
		init_javascriptApplicationAnalysis();
		captures = {
			count: {
				input_path: "/examples/javascript-export-presence/left",
				root_artifact_sha256: "5005ebc2f35719a2fc014f19a81c669f3a1ab471b7245ef6985a111b6845a747",
				inventory_manifest_id: "agm_f30ded9a83d43a3980417bbe63dfad569e83386f243c4d6a01af0166372cb9e6",
				inventory_graph_sha256: "4b8aceaf67e43fd8317ec1f5fd1df5235f8fa402335accf011683e008c6bc62c",
				integrity_contradictions: []
			},
			total: {
				input_path: "/examples/javascript-export-presence/right",
				root_artifact_sha256: "269ae72a601ad5ac02f1c2dda6ff9accffa2d2e4f4a9e406facee0d5a78a5377",
				inventory_manifest_id: "agm_d3ceaa1af38fb3474070ca25c0d4644282e5fb7d5824cee3e3a81391481e9fc1",
				inventory_graph_sha256: "3e9bc926951480c35385efe5650d9d781631bd74c37a523d543b5fbe06b01ce6",
				integrity_contradictions: []
			}
		};
		summary = {
			browser_windows: 0,
			explicit_web_preferences: 0,
			preload_entrypoints: 0,
			context_bridge_apis: 0,
			exposed_api_members: 0,
			ipc: {
				operations: 0,
				literal_channels: 0,
				dynamic_channel_operations: 0,
				renderer_transmissions: 0,
				renderer_listeners: 0,
				main_handlers: 0,
				paired_renderer_transmissions: 0,
				ambiguous_renderer_transmissions: 0,
				unpaired_literal_renderer_transmissions: 0
			},
			sender_validation_observations: 0,
			utility_processes: 0,
			resolved_utility_entrypoints: 0,
			native_addon_bindings: 0,
			resolved_native_addon_bindings: 0,
			protocol_registrations: 0
		};
		statistics = {
			relevant_files: 1,
			nested_asar_containers: 0,
			text_bytes_read: 60,
			invalid_utf8_files: 0,
			parsed_javascript_files: 1,
			skipped_javascript_files: 0,
			visited_ast_nodes: 12,
			findings: 1,
			modules: 0,
			parse_failures: 0
		};
		modulePath = "parser.mjs";
		limitations = ["This example retains export and return-shape facts only; other application and semantic relationships are omitted."];
		exampleEvidence = (property) => {
			const metadata = captures[property];
			const source = `export default () => ({ kind: "results", ${property}: query() });\n`;
			const artifact = createWebTextArtifact(source, "text/javascript");
			const ir = analyzeJavaScriptSemantics(source);
			const link = ir.moduleLinks.find(({ exportedName }) => exportedName === "default");
			if (link === undefined) throw new Error("Example source must define a default export");
			const coverage = ir.coverage.status === "complete" ? completeApplicationCoverage() : partialApplicationCoverage([], ir.coverage.omittedCount);
			const projection = projectJavaScriptExportReturnShapes({
				ir,
				link,
				modulePath,
				baseCoverage: coverage
			});
			if (projection === null) throw new Error("Example export must retain return shapes");
			const evidence = {
				artifact: {
					available: true,
					artifact_id: `art_${artifact.sha256}`,
					sha256: artifact.sha256
				},
				location: {
					available: true,
					value: {
						kind: "source-range",
						source: modulePath,
						...link.location
					}
				},
				extractor: {
					name: "rea-javascript-artifact-reconstruction",
					version: "1",
					operation: "recover-module-export",
					executable_sha256: null
				},
				coverage,
				limitations: ir.limitations,
				evidence_ids: []
			};
			const exported = createJavaScriptApplicationNode({
				kind: "javascript-module",
				identity: {
					strategy: "artifact-local-key",
					stability: "artifact-version",
					artifact_sha256: artifact.sha256,
					namespace: "module-export",
					key: `${metadata.root_artifact_sha256}:${modulePath}:default`
				},
				observations: [{
					label: `${modulePath}:default`,
					properties: {
						semantic_role: "export-binding",
						module_path: modulePath,
						relationship_kind: link.kind,
						exported_name: link.exportedName,
						local_name: link.localName,
						imported_name: link.importedName,
						declared_specifier: link.specifier
					},
					evidence: {
						...evidence,
						authority: "ast-static-analysis",
						state: "observed",
						confidence: "exact"
					}
				}, {
					label: `${modulePath}:default:return-shapes`,
					properties: projection.properties,
					evidence: {
						...evidence,
						authority: "static-relationship-inference",
						state: "inferred",
						confidence: "high",
						location: {
							available: true,
							value: {
								kind: "source-range",
								source: modulePath,
								...projection.range
							}
						},
						extractor: {
							...evidence.extractor,
							operation: "recover-export-return-shapes"
						},
						coverage: projection.coverage,
						limitations: projection.limitations
					}
				}]
			});
			const graph = createJavaScriptApplicationGraph({
				schema: "JavaScriptApplicationGraph",
				root_node_ids: [exported.node_id],
				nodes: [exported],
				edges: [],
				coverage: partialApplicationCoverage([], null),
				limitations
			});
			const evidenceContexts = new JavaScriptSemanticEvidenceContextRegistry();
			const module = createJavaScriptSemanticGraphNode({
				kind: "module",
				identity: {
					artifact_sha256: artifact.sha256,
					module_path: modulePath,
					source_range: null,
					role_key: "example-module"
				},
				function_node_id: null,
				application_node_ids: [exported.node_id],
				label: modulePath,
				properties: {},
				evidence: {
					...evidence,
					authority: "ast-static-analysis",
					state: "observed",
					confidence: "exact"
				}
			}, evidenceContexts);
			const semanticGraph = createJavaScriptSemanticGraph({
				schema: "JavaScriptSemanticRelationGraph",
				root_artifact_sha256: metadata.root_artifact_sha256,
				application_graph_id: graph.graph_id,
				root_node_ids: [module.node_id],
				evidence_contexts: evidenceContexts.contexts,
				nodes: [module],
				relations: [],
				fingerprints: [],
				unknowns: [],
				coverage: {
					status: "unknown",
					truncated: false,
					omitted_nodes: null,
					omitted_relations: null,
					limits: [],
					families: JAVASCRIPT_SEMANTIC_RELATION_FAMILIES.map((family) => ({
						family,
						status: "unknown",
						retained_relations: 0,
						omitted_relations: null,
						unknown_ids: []
					}))
				},
				limitations
			});
			const result = javascriptApplicationAnalysisResultSchema.parse({
				...metadata,
				format: "directory",
				graph,
				semantic_graph: semanticGraph,
				summary,
				statistics,
				limitations
			});
			return createEvidence({
				path: result.input_path,
				sha256: result.root_artifact_sha256,
				format: "directory"
			}, {
				id: "rea-javascript-application",
				name: "REA JavaScript application analyzer",
				version: "1"
			}, {
				predicateType: "rea.javascript-application-analysis",
				operation: "analyze_javascript_application",
				parameters: {},
				result,
				confidence: "derived",
				authority: "shipped-artifact",
				limitations
			});
		};
		JAVASCRIPT_EXPORT_SHAPE_COMPARISON_EXAMPLE = {
			left: exampleEvidence("count"),
			right: exampleEvidence("total"),
			left_module_path: modulePath,
			left_export_name: "default",
			right_module_path: modulePath,
			right_export_name: "default"
		};
	})))();
}

//#endregion
//#region dist/contracts/mobileApplicationGraphExamples.js
var inventory, provider, ANDROID_APPLICATION_GRAPH_EXAMPLE, APPLE_APPLICATION_GRAPH_EXAMPLE, MACOS_APPLICATION_GRAPH_EXAMPLE, HARMONY_APPLICATION_GRAPH_EXAMPLE;
function init_mobileApplicationGraphExamples() {
	return (init_mobileApplicationGraphExamples = __esmMin((() => {
		init_evidence();
		init_artifactGraph();
		init_artifactIdentity();
		inventory = (format, digit) => {
			const sha = digit.repeat(64);
			const artifactId = artifactIdForContent(sha);
			const rootEntryKind = format === "directory" ? "directory" : "file";
			const occurrenceId = occurrenceIdForLocation({
				rootArtifactId: artifactId,
				logicalPath: ".",
				entryKind: rootEntryKind
			});
			const nodes = [{
				artifact_id: artifactId,
				format: format === "directory" ? "directory" : "zip",
				sha256: sha,
				size: 1,
				media_type: null,
				architecture: null,
				content_state: "materialized",
				limitations: []
			}];
			const occurrences = [{
				occurrence_id: occurrenceId,
				artifact_id: artifactId,
				parent_occurrence_id: null,
				logical_path: ".",
				entry_kind: rootEntryKind,
				artifact_kind: "resource",
				artifact_format: format,
				declared_size: 1,
				compressed_size: null,
				executable: false,
				encrypted: false,
				hash_status: "verified",
				source_location: null,
				limitations: []
			}];
			const graphSha256 = artifactGraphDigest({
				nodes,
				occurrences,
				edges: [],
				contradictions: []
			});
			return artifactInventoryResultSchema.parse({
				manifest: {
					manifest_id: artifactManifestId(artifactId, graphSha256),
					root_artifact_id: artifactId,
					root_sha256: sha,
					root_format: format,
					graph_sha256: graphSha256,
					node_count: nodes.length,
					occurrence_count: occurrences.length,
					edge_count: 0
				},
				nodes,
				occurrences,
				edges: [],
				provenance: [],
				integrity_contradictions: [],
				coverage: {
					scope: "root",
					status: "complete"
				},
				limitations: []
			});
		};
		provider = {
			id: "rea-artifact-graph",
			name: "REA safe artifact graph provider",
			version: "1"
		};
		ANDROID_APPLICATION_GRAPH_EXAMPLE = { inventory_evidence: [createEvidence({
			path: "Fixture.apk",
			sha256: "a".repeat(64),
			format: "apk"
		}, provider, {
			operation: "inventory_artifact",
			parameters: {},
			result: inventory("apk", "a"),
			confidence: "observed",
			authority: "shipped-artifact"
		})] };
		APPLE_APPLICATION_GRAPH_EXAMPLE = { inventory_evidence: [createEvidence({
			path: "Fixture.ipa",
			sha256: "b".repeat(64),
			format: "ipa"
		}, provider, {
			operation: "inventory_artifact",
			parameters: {},
			result: inventory("ipa", "b"),
			confidence: "observed",
			authority: "shipped-artifact"
		})] };
		MACOS_APPLICATION_GRAPH_EXAMPLE = { inventory_evidence: [createEvidence({
			path: "Fixture.app",
			sha256: "c".repeat(64),
			format: "directory"
		}, provider, {
			operation: "inventory_artifact",
			parameters: {},
			result: inventory("directory", "c"),
			confidence: "observed",
			authority: "shipped-artifact"
		})] };
		HARMONY_APPLICATION_GRAPH_EXAMPLE = { inventory_evidence: [createEvidence({
			path: "Fixture.hap",
			sha256: "d".repeat(64),
			format: "hap"
		}, provider, {
			operation: "inventory_artifact",
			parameters: {},
			result: inventory("hap", "d"),
			confidence: "observed",
			authority: "shipped-artifact"
		})] };
	})))();
}

//#endregion
//#region dist/contracts/applicationToolContracts.js
var traceOutputSchema, semanticTraceOutputSchema, comparisonOutputSchema, sourceToBundleOutputSchema, exportShapeComparisonOutputSchema, reconstructionObligationLedgerOutputSchema, HASH, retained, APPLICATION_TOOL_CONTRACTS;
function init_applicationToolContracts() {
	return (init_applicationToolContracts = __esmMin((() => {
		init_playwrightTraceToolContracts();
		init_apiContractToolContracts();
		init_ntfsJournalToolContracts();
		init_mobileApplicationGraphProjection();
		init_evidenceFormat();
		init_analysisViewResult();
		init_staticObservedEndpointSchemas();
		init_staticObservedEndpointExample();
		init_javascriptApplicationVersionComparisonSchemas();
		init_javascriptFeatureTraceSchemas();
		init_javascriptSemanticTraceSchemas();
		init_javascriptExportShapeComparisonSchemas();
		init_sourceToBundleComparisonSchemas();
		init_applicationWorkflowInputContracts();
		init_reconstructionCoverageInput();
		init_reconstructionCoverage();
		init_reconstructionObligationLedgerSchemas();
		init_androidApplication();
		init_appleApplication();
		init_harmonyApplication();
		init_toolEffects();
		init_guidanceContracts();
		init_guidedWorkflowSchemas();
		init_toolOutputSchemaPrimitives();
		init_javascriptApplicationWorkflowExamples();
		init_javascriptExportShapeComparisonExample();
		init_mobileApplicationGraphExamples();
		traceOutputSchema = evidenceResultOf(z.union([
			applicationFeatureTraceResultSchema,
			featureTraceSummaryViewResultSchema,
			featureTraceViewResultSchema
		]));
		semanticTraceOutputSchema = evidenceResultOf(javaScriptSemanticTraceResultSchema);
		comparisonOutputSchema = evidenceResultOf(applicationVersionComparisonResultSchema);
		sourceToBundleOutputSchema = evidenceResultOf(z.union([
			sourceToBundleComparisonResultSchema,
			sourceToBundleSummaryViewResultSchema,
			sourceToBundlePageViewResultSchema
		]));
		exportShapeComparisonOutputSchema = evidenceResultOf(javaScriptExportShapeComparisonResultSchema);
		reconstructionObligationLedgerOutputSchema = evidenceResultOf(reconstructionObligationLedgerSchema);
		HASH = "0".repeat(64);
		retained = (evidence_id) => ({
			kind: "retained-evidence",
			evidence_id
		});
		APPLICATION_TOOL_CONTRACTS = [
			...API_CONTRACT_TOOL_CONTRACTS,
			...NTFS_JOURNAL_TOOL_CONTRACTS,
			...PLAYWRIGHT_TRACE_TOOL_CONTRACTS,
			{
				name: "search_guidance",
				...toolContractMetadata("search_guidance", toolEffects()),
				description: "Find installed REA workflow guidance by query words. Returns ranked sections, pages and locators for read_guidance_section; every non-generic word must match, with direct section matches ranked before matches spread across children. Reads documentation only, without accessing a target or provider.",
				kind: "application",
				inputSchema: searchGuidanceInputSchema,
				outputSchema: searchGuidanceOutputSchema,
				examples: [{
					title: "Find exact JavaScript module guidance",
					input: { query: "exact JavaScript module" }
				}]
			},
			{
				name: "guided_workflows",
				cli: true,
				...toolContractMetadata("guided_workflows", toolEffects()),
				description: "List or render REA's existing guided workflows. Rendering returns guidance only; it does not inspect targets, start analysis, or change session state.",
				kind: "application",
				inputSchema: guidedWorkflowsInputSchema,
				outputSchema: guidedWorkflowsOutputSchema,
				examples: [{
					title: "List the available guided workflows",
					input: { action: "list" }
				}, {
					title: "Render feature investigation guidance",
					input: {
						action: "render",
						workflow_id: "investigate_feature",
						arguments: { feature: "offline search" }
					}
				}]
			},
			{
				name: "read_guidance_section",
				...toolContractMetadata("read_guidance_section", toolEffects()),
				description: "Retrieve a section selected by search_guidance from the installed REA guidance bundle. Reports stale locators and unavailable bundles explicitly. Returns documentation, not target observations or Evidence.",
				kind: "application",
				inputSchema: readGuidanceSectionInputSchema,
				outputSchema: readGuidanceSectionOutputSchema,
				examples: []
			},
			{
				name: "trace_application_feature",
				cli: true,
				...toolContractMetadata("trace_application_feature", evidenceEffects),
				description: "Trace a typed literal seed through every reachable part of an authenticated JavaScript Application Graph supplied as inline Evidence or exact same-session retained references. Original static, native, passive-runtime, inferred, and unknown authorities remain distinct; native addon handoffs never open a provider or execute the application. An optional view returns selected facts and retains the complete trace.",
				kind: "application",
				inputSchema: traceApplicationFeatureToolRequestSchema,
				outputSchema: traceOutputSchema,
				examples: [{
					title: "Trace one module seed through a retained application graph",
					input: JAVASCRIPT_FEATURE_TRACE_EXAMPLE
				}, {
					title: "Use exact Evidence already retained in this session",
					input: {
						...JAVASCRIPT_FEATURE_TRACE_EXAMPLE,
						application: retained(JAVASCRIPT_FEATURE_TRACE_EXAMPLE.application.evidence_id)
					}
				}]
			},
			{
				name: "trace_javascript_semantics",
				cli: true,
				...toolContractMetadata("trace_javascript_semantics", evidenceEffects),
				description: "Trace static JavaScript data-flow, direct call/return, and closure relations from inline application Evidence or an exact same-session retained reference. Dynamic or unsupported semantics remain explicit unknowns; static reachability never claims runtime execution.",
				kind: "application",
				inputSchema: traceJavaScriptSemanticsRequestSchema,
				outputSchema: semanticTraceOutputSchema,
				examples: [{
					title: "Trace backward provenance from one semantic node",
					input: {
						application: JAVASCRIPT_FEATURE_TRACE_EXAMPLE.application,
						query: {
							seed: {
								kind: "semantic-node",
								node_id: `jsrg_node_${HASH}`
							},
							direction: "backward-provenance"
						}
					}
				}]
			},
			{
				name: "compare_application_versions",
				cli: true,
				...toolContractMetadata("compare_application_versions", evidenceEffects),
				description: "Compare two authenticated JavaScript Application Graph versions, supplied inline or by exact retained reference. Returns added, removed, changed, ambiguous and unknown entities with the full changed_from graph. Pairing uses unique exact digest, source-map, structural or semantic-key tiers; no fuzzy or module-ordinal pairing.",
				kind: "application",
				inputSchema: compareApplicationVersionsRequestSchema,
				outputSchema: comparisonOutputSchema,
				examples: [{
					title: "Compare authenticated static and reconciled application graphs",
					input: JAVASCRIPT_APPLICATION_VERSION_COMPARISON_EXAMPLE
				}, {
					title: "Use exact Evidence already retained in this session",
					input: {
						...JAVASCRIPT_APPLICATION_VERSION_COMPARISON_EXAMPLE,
						left: retained(JAVASCRIPT_APPLICATION_VERSION_COMPARISON_EXAMPLE.left.evidence_id),
						right: retained(JAVASCRIPT_APPLICATION_VERSION_COMPARISON_EXAMPLE.right.evidence_id)
					}
				}]
			},
			{
				name: "compare_static_and_observed_endpoints",
				cli: true,
				...toolContractMetadata("compare_static_and_observed_endpoints", evidenceEffects),
				description: "Compare static JavaScript endpoints with requests recorded in HAR Evidence, supplied inline or retained; acquires no files, targets or URLs. Returns exact or inferred template pairings and explicit unknowns; root-relative targets need a declared origin. Not-observed requires an exercised origin, all parent records retained and none excluded; it never means hidden, unused or inaccessible. Default summary retains the full comparison for inspect_analysis_view kind endpoint-comparison (static-endpoints, observed-groups, matches); a selected view overrides detail, and detail complete returns all facts. Copies no query strings, fragments, headers or bodies. Sensitive-declaration parents are refused; the 96 MiB representation budget covers source admission and derived state.",
				kind: "application",
				inputSchema: compareStaticObservedEndpointsRequestSchema,
				outputSchema: evidenceResultOf(z.union([
					staticObservedEndpointComparisonSchema,
					endpointComparisonSummaryViewResultSchema,
					endpointComparisonPageViewResultSchema
				])),
				examples: [{
					title: "Compare retained static endpoints with an offline HAR",
					input: STATIC_OBSERVED_ENDPOINT_COMPARISON_EXAMPLE
				}]
			},
			{
				name: "compare_source_to_bundle",
				cli: true,
				...toolContractMetadata("compare_source_to_bundle", evidenceEffects),
				description: "Map committed historical source to an authenticated JavaScript Application Graph. Supply HistoricalSourceGraph inline or as {kind:\"file\",path:\"/absolute/source.json\"}, and graph Evidence inline or retained. Uses explicit digest, source-map and path signals to classify unchanged, modified, removed, split, merged, duplicated or unknown; incomplete coverage and ambiguous weak matches never establish absence or force pairing. Candidate signals are opt-in. Omitted view returns the full report; view {kind:\"summary\"} or {kind:\"source-to-bundle\",collection:\"mappings\"} retains it for later inspect_analysis_view pages. Filters intersect, empty filters select none, and page coverage never upgrades source coverage.",
				kind: "application",
				inputSchema: compareSourceToBundleRequestSchema,
				outputSchema: sourceToBundleOutputSchema,
				examples: [{
					title: "Compare committed historical source with a shipped bundle graph",
					input: SOURCE_TO_BUNDLE_COMPARISON_EXAMPLE
				}]
			},
			{
				name: "compare_javascript_export_shapes",
				cli: true,
				...toolContractMetadata("compare_javascript_export_shapes", evidenceEffects),
				description: "Compare static return-property shapes for one exact module/export on each authenticated JavaScript Application Graph, inline or retained. Variants pair only by reciprocal unique literal discriminants. Returns JSON Pointer changes while keeping property presence separate from value resolution: complete property coverage can establish an addition/removal even when values are unresolved. Dynamic values, incomplete coverage and unpaired variants stay unknown. Does not execute JavaScript; runtime behavior needs a separate probe.",
				kind: "application",
				inputSchema: compareJavaScriptExportShapesRequestSchema,
				outputSchema: exportShapeComparisonOutputSchema,
				examples: [{
					title: "Report observed return-property presence when static values stay unknown",
					input: JAVASCRIPT_EXPORT_SHAPE_COMPARISON_EXAMPLE
				}, {
					title: "Use exact Evidence already retained in this session",
					input: {
						...JAVASCRIPT_EXPORT_SHAPE_COMPARISON_EXAMPLE,
						left: retained(JAVASCRIPT_EXPORT_SHAPE_COMPARISON_EXAMPLE.left.evidence_id),
						right: retained(JAVASCRIPT_EXPORT_SHAPE_COMPARISON_EXAMPLE.right.evidence_id)
					}
				}]
			},
			{
				name: "build_reconstruction_obligation_ledger",
				cli: true,
				...toolContractMetadata("build_reconstruction_obligation_ledger", evidenceEffects),
				description: "Build a deterministic reconstruction-obligation ledger from an authenticated Evidence bundle, reviewed obligations and an explicit reconstruction manifest. Returns the complete ledger, closure digest and typed diagnostics. Duplicate owners, missing cases or parser/type, weak verifier authority, unenumerated claims, contradictions, dependencies and residual unknowns fail closed; static candidates remain candidates.",
				kind: "application",
				inputSchema: reconstructionObligationLedgerInputSchema,
				outputSchema: reconstructionObligationLedgerOutputSchema,
				examples: [{
					title: "Generate the complete obligation ledger",
					input: {
						evidence_bundle: {
							evidence_format: 2,
							artifacts: [],
							providers: [],
							environments: [],
							scenarios: [],
							captures: [],
							unknowns: [],
							records: []
						},
						reviewed_obligations: [],
						manifest: {
							bindings: [],
							contradictions: []
						}
					}
				}]
			},
			{
				name: "evaluate_reconstruction_coverage",
				cli: true,
				...toolContractMetadata("evaluate_reconstruction_coverage", toolEffects()),
				description: "Check evidence-backed reconstruction coverage for one named boundary. Missing ownership or inventory is partial; stale, weak, truncated, skipped, unresolved or conflicting verifier proof is unknown. Contradictions, failed proof, missing owners and authority-routing failures fail closed.",
				kind: "application",
				inputSchema: reconstructionCoverageEvaluationInputSchema,
				outputSchema: reconstructionClosureResultSchema,
				examples: [{
					title: "Evaluate one replacement boundary",
					input: {
						coverage: {
							evidence_bundle: {
								evidence_format: 2,
								artifacts: [],
								providers: [],
								environments: [],
								scenarios: [],
								captures: [],
								unknowns: [],
								records: []
							},
							artifacts: [],
							surfaces: [],
							owners: [],
							claims: [],
							verifier_contracts: [],
							verifier_results: [],
							residual_unknown_ids: [],
							contradictions: [],
							package_proofs: [],
							boundaries: [{
								boundary_id: "replacement.cli",
								title: "CLI replacement",
								required_surface_ids: ["cli.help"],
								required_claim_ids: ["claim.cli.help"],
								required_package_proof_kinds: ["clean-install", "authority-independence"],
								allowed_dispositions: [],
								allowed_unknown_ids: []
							}]
						},
						boundary_id: "replacement.cli"
					}
				}]
			},
			{
				name: "project_android_application_graph",
				cli: true,
				...toolContractMetadata("project_android_application_graph", evidenceEffects),
				description: "Build a static Android application inventory from the authenticated nested inventory Evidence returned by inspect_artifact for an APK. Returns component paths/hashes, runtime-family hints and path-based bridge hypotheses. Does not decode DEX, execute the APK or establish runtime calls.",
				kind: "application",
				inputSchema: applicationInventoryProjectionInputSchema,
				outputSchema: evidenceResultOf(androidApplicationProjectionResultSchema),
				examples: [{
					title: "Project APK inventory Evidence into an Android application graph",
					input: ANDROID_APPLICATION_GRAPH_EXAMPLE
				}]
			},
			{
				name: "project_apple_application_graph",
				cli: true,
				...toolContractMetadata("project_apple_application_graph", evidenceEffects),
				description: "Build a static Apple application inventory from the authenticated nested inventory Evidence returned by inspect_artifact for an IPA, .app directory, ZIP or DMG. Returns application roots, nested-bundle roles, launchd plists, component paths/hashes, runtime hints and bridge hypotheses. Roles follow path conventions; plist/CMS semantics and runtime calls are not established.",
				kind: "application",
				inputSchema: applicationInventoryProjectionInputSchema,
				outputSchema: evidenceResultOf(appleApplicationProjectionResultSchema),
				examples: [{
					title: "Project IPA inventory Evidence into an Apple application graph",
					input: APPLE_APPLICATION_GRAPH_EXAMPLE
				}, {
					title: "Project a macOS .app directory inventory into its bundle anatomy",
					input: MACOS_APPLICATION_GRAPH_EXAMPLE
				}]
			},
			{
				name: "project_harmony_application_graph",
				cli: true,
				...toolContractMetadata("project_harmony_application_graph", evidenceEffects),
				description: "Build a static HarmonyOS inventory from the authenticated nested inventory Evidence returned by inspect_artifact for a HAP, HSP or App Pack. Returns packaging hints, component paths/hashes, child packages, runtime hints, unclassified components and path-based N-API bridge hypotheses. Does not decode Ark bytecode, parse manifest semantics or establish runtime calls.",
				kind: "application",
				inputSchema: applicationInventoryProjectionInputSchema,
				outputSchema: evidenceResultOf(harmonyApplicationProjectionResultSchema),
				examples: [{
					title: "Project HAP inventory Evidence into a HarmonyOS application graph",
					input: HARMONY_APPLICATION_GRAPH_EXAMPLE
				}]
			}
		];
	})))();
}

//#endregion
export { API_CONTRACT_TOOL_CONTRACTS, APPLICATION_TOOL_CONTRACTS, NTFS_JOURNAL_FILE_BYTES, NTFS_JOURNAL_OPERATION, NTFS_JOURNAL_PROVIDER, NTFS_JOURNAL_TOOL_CONTRACTS, PLAYWRIGHT_TRACE_TOOL_CONTRACTS, applicationVersionIdentitiesSchema, evaluateParsedReconstructionClosure, guidedWorkflowsInputSchema, hasReconstructionObligationDiagnostic, init_androidApplication, init_apiContractToolContracts, init_appleApplication, init_applicationToolContracts, init_guidedWorkflowSchemas, init_harmonyApplication, init_javascriptApplicationVersionComparisonSchemas, init_ntfsJournalQuery, init_ntfsJournalToolContracts, init_ntfsUsnJournal, init_playwrightTraceToolContracts, init_reconstructionCoverage, init_reconstructionCoverageInput, init_reconstructionObligationLedgerIntegrity, init_reconstructionObligationLedgerSchemas, ntfsJournalInputSchema, ntfsJournalResultSchema, obligationCaseKindSchema, ownedApplicationVersionComparisonResultSchema, projectAndroidInventory, projectAppleInventory, projectHarmonyInventory, readReconstructionCoverageData, readUsnJournal, reconstructionCoverageRequestSchema, reconstructionObligationCoverage, reconstructionObligationDependencyGraph, reconstructionObligationEvidenceIds, reconstructionObligationLedgerClosureDigest, reconstructionObligationLedgerInputSchema, reconstructionObligationLedgerSchema, reconstructionObligationLedgerStatus, reconstructionObligationOwnershipGraph, reconstructionObligationReports, summarizeReconstructionObligations };