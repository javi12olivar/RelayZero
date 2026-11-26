import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { EvidenceIntegrityError, artifactDfuCrc32PairSchema, artifactIntegrityPairOf, artifactMd5PairSchema, artifactSha256PairSchema, canBorrowParsedJsonSnapshot, freezeJsonSnapshot, immutableJsonSnapshotMember, init_artifactIntegrity, init_evidenceErrors, init_immutableJson, init_jsonValue, isImmutableJsonSnapshot, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { artifactContradictionId, artifactEdgeId, artifactGraphDigest, artifactIdForContent, artifactIdForNode, artifactManifestId, digestCanonicalValue, init_artifactIdentity, init_canonicalDigest, occurrenceIdForLocation } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { canonicalJson, evidenceFileTarget, evidenceSchema, init_comparisonSemantics, init_evidence, init_evidenceFormat, init_evidenceValidation, isUnsupportedEvidenceFormat, parseEvidence, readEvidence, readEvidencePayload, safeParseEvidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_canonicalOrdering, uniqueSorted } from "./canonicalOrdering-C7Yzy62j.js";
import { admitRawBinary, init_digests, init_rawBinary, prefixedDigestSchema } from "./targetIdentity-rKLLVwEj.js";
import { artifactInventoryResultSchema, init_artifactGraph } from "./artifactGraph-D-c8dgaG.js";
import { init_javascriptArtifactFiles, isJavaScriptSourcePath } from "./javascriptArtifactFiles-DG1s4eez.js";
import { init_espImageStructures, offsetText } from "./espImageStructures-Dt191T9V.js";
import { init_textSchemas, nonEmptyTextSchema } from "./textSchemas-UeTwLioW.js";
import { z } from "zod";

//#region dist/domain/artifactInspection.js
var evidenceIdSchema, artifactIdSchema, inspectionObservationSchema, inspectionHypothesisSchema, inspectionContradictionBaseSchema, inspectionContradictionSchema, nextProbeSchema, unexploredBranchSchema, artifactInspectionResultSchema, createArtifactInspection, parseInventoryEvidence, allObservations, observation, allHypotheses, contradictions, probesFor, espFlashDumpProbes, fitProbes, DIRECTORY_MEMBER_FORMATS, directoryProbes, probesForFormat, allUnexploredBranches, branch, inspectionCoverage, artifactInspectionSources, readArtifactInspectionSources;
function init_artifactInspection() {
	return (init_artifactInspection = __esmMin((() => {
		init_evidenceValidation();
		init_result();
		init_immutableJson();
		init_artifactIntegrity();
		init_artifactGraph();
		init_canonicalDigest();
		init_javascriptArtifactFiles();
		init_rawBinary();
		init_canonicalOrdering();
		init_evidence();
		init_espImageStructures();
		init_jsonValue();
		init_digests();
		init_textSchemas();
		evidenceIdSchema = prefixedDigestSchema("ev");
		artifactIdSchema = prefixedDigestSchema("art");
		inspectionObservationSchema = z.strictObject({
			observation_id: prefixedDigestSchema("aio"),
			kind: z.enum([
				"root-manifest",
				"integrity",
				"container-header",
				"reconstruction"
			]),
			subject: nonEmptyTextSchema,
			value: jsonValueSchema,
			evidence_id: evidenceIdSchema
		});
		inspectionHypothesisSchema = z.strictObject({
			hypothesis_id: prefixedDigestSchema("aih"),
			statement: nonEmptyTextSchema,
			confidence: z.enum(["medium", "low"]),
			basis_evidence_ids: z.array(evidenceIdSchema).min(1),
			limitation: nonEmptyTextSchema
		});
		inspectionContradictionBaseSchema = z.strictObject({
			contradiction_id: prefixedDigestSchema("aic"),
			statement: nonEmptyTextSchema,
			occurrence_id: prefixedDigestSchema("occ"),
			evidence_id: evidenceIdSchema
		});
		inspectionContradictionSchema = z.union([
			inspectionContradictionBaseSchema.extend(artifactSha256PairSchema.shape),
			inspectionContradictionBaseSchema.extend(artifactMd5PairSchema.shape),
			inspectionContradictionBaseSchema.extend(artifactDfuCrc32PairSchema.shape)
		]);
		nextProbeSchema = z.strictObject({
			operation: nonEmptyTextSchema,
			rationale: nonEmptyTextSchema,
			authority: z.enum([
				"artifact-bytes",
				"managed-static-analysis",
				"native-analysis-provider",
				"ast-static-analysis"
			])
		});
		unexploredBranchSchema = z.strictObject({
			branch_id: prefixedDigestSchema("aib"),
			reason: z.enum(["format-specific-analysis-required", "unknown-format"]),
			detail: nonEmptyTextSchema,
			next_probe: nextProbeSchema.nullable(),
			evidence_id: evidenceIdSchema
		});
		artifactInspectionResultSchema = z.strictObject({
			inspection_id: prefixedDigestSchema("ai"),
			subject: z.strictObject({
				manifest_id: prefixedDigestSchema("agm"),
				root_artifact_id: artifactIdSchema,
				root_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
				root_format: nonEmptyTextSchema
			}),
			substeps: z.array(z.strictObject({
				substep_id: prefixedDigestSchema("ais"),
				operation: z.literal("inventory_artifact"),
				status: z.literal("completed"),
				evidence_id: evidenceIdSchema,
				evidence: evidenceSchema.safeExtend({
					operation: z.literal("inventory_artifact"),
					normalized_result: artifactInventoryResultSchema
				})
			})).min(1),
			observations: z.array(inspectionObservationSchema),
			hypotheses: z.array(inspectionHypothesisSchema),
			contradictions: z.array(inspectionContradictionSchema),
			unexplored_branches: z.array(unexploredBranchSchema),
			next_probes: z.array(nextProbeSchema),
			coverage: z.strictObject({
				status: z.enum([
					"complete-within-substeps",
					"partial",
					"truncated"
				]),
				substeps_completed: z.int().min(1),
				observations_retained: z.int().min(0),
				observations_omitted: z.int().min(0),
				hypotheses_retained: z.int().min(0),
				hypotheses_omitted: z.int().min(0),
				unexplored_branches_retained: z.int().min(0),
				unexplored_branches_omitted: z.int().min(0),
				next_probes_retained: z.int().min(0),
				next_probes_omitted: z.int().min(0)
			}),
			evidence_links: z.array(evidenceIdSchema).min(1),
			limitations: z.array(nonEmptyTextSchema)
		});
		createArtifactInspection = (inventoryInput) => {
			const inventoryEvidence = parseInventoryEvidence(inventoryInput);
			const inventory = artifactInventoryResultSchema.parse(inventoryEvidence.normalized_result);
			const observations = allObservations(inventory, inventoryEvidence.evidence_id);
			const hypotheses = allHypotheses(inventory, inventoryEvidence.evidence_id);
			const nextProbes = probesFor(inventory);
			const branches = allUnexploredBranches(inventory, inventoryEvidence.evidence_id, nextProbes);
			const retained = {
				observations,
				hypotheses,
				branches,
				probes: nextProbes
			};
			const omissions = {
				observations: 0,
				hypotheses: 0,
				branches: 0,
				probes: 0
			};
			const semantic = {
				subject: {
					manifest_id: inventory.manifest.manifest_id,
					root_artifact_id: inventory.manifest.root_artifact_id,
					root_sha256: inventory.manifest.root_sha256,
					root_format: inventory.manifest.root_format
				},
				substeps: [{
					substep_id: `ais_${digestCanonicalValue({
						operation: "inventory_artifact",
						evidence_id: inventoryEvidence.evidence_id
					}, "Artifact inspection")}`,
					operation: "inventory_artifact",
					status: "completed",
					evidence_id: inventoryEvidence.evidence_id,
					evidence: inventoryEvidence
				}],
				observations: retained.observations,
				hypotheses: retained.hypotheses,
				contradictions: contradictions(inventory, inventoryEvidence.evidence_id),
				unexplored_branches: retained.branches,
				next_probes: retained.probes,
				coverage: {
					status: inspectionCoverage(inventory, omissions),
					substeps_completed: 1,
					observations_retained: retained.observations.length,
					observations_omitted: omissions.observations,
					hypotheses_retained: retained.hypotheses.length,
					hypotheses_omitted: omissions.hypotheses,
					unexplored_branches_retained: retained.branches.length,
					unexplored_branches_omitted: omissions.branches,
					next_probes_retained: retained.probes.length,
					next_probes_omitted: omissions.probes
				},
				evidence_links: [inventoryEvidence.evidence_id],
				limitations: uniqueSorted([...inventory.limitations, "Inspection derives bounded static hypotheses and next probes; it does not execute the artifact or claim format-specific semantics."])
			};
			return artifactInspectionResultSchema.parse({
				...semantic,
				inspection_id: `ai_${digestCanonicalValue(semantic, "Artifact inspection")}`
			});
		};
		parseInventoryEvidence = (input) => {
			const evidence = parseEvidence(input);
			if (evidence.operation !== "inventory_artifact") throw new TypeError("Artifact inspection substep requires inventory_artifact Evidence");
			return evidence;
		};
		allObservations = (inventory, evidenceId) => [
			observation("root-manifest", inventory.manifest.root_artifact_id, inventory.manifest, evidenceId),
			...inventory.integrity_contradictions.map((value) => observation("integrity", value.contradiction_id, value, evidenceId)),
			...inventory.ines === undefined ? [] : [observation("container-header", inventory.manifest.root_artifact_id, inventory.ines.header, evidenceId), observation("reconstruction", inventory.manifest.root_artifact_id, inventory.ines.reconstruction, evidenceId)]
		];
		observation = (kind, subject, value, evidenceId) => {
			const semantic = {
				kind,
				subject,
				value: jsonValueSchema.parse(value),
				evidence_id: evidenceId
			};
			return {
				observation_id: `aio_${digestCanonicalValue(semantic, "Artifact inspection")}`,
				...semantic
			};
		};
		allHypotheses = (inventory, evidenceId) => {
			const statements = inventory.manifest.root_format === "pe" ? ["The PE artifact may contain managed CLI metadata or native code; inventory bytes alone do not distinguish them."] : ["asar", "javascript-bundle"].includes(inventory.manifest.root_format) ? ["The artifact may contain a recoverable JavaScript application graph."] : [];
			return statements.map((statement) => {
				const semantic = {
					statement,
					confidence: "low",
					basis_evidence_ids: [evidenceId],
					limitation: "Format classification proposes a bounded follow-up; it is not semantic proof."
				};
				return {
					hypothesis_id: `aih_${digestCanonicalValue(semantic, "Artifact inspection")}`,
					...semantic
				};
			});
		};
		contradictions = (inventory, evidenceId) => inventory.integrity_contradictions.map((value) => {
			const semantic = {
				statement: value.logical_path === "." ? "The container's declared integrity contradicts its observed bytes." : `Declared integrity for ${value.logical_path} contradicts observed bytes.`,
				occurrence_id: value.occurrence_id,
				...artifactIntegrityPairOf(value),
				evidence_id: evidenceId
			};
			return {
				contradiction_id: `aic_${digestCanonicalValue(semantic, "Artifact inspection")}`,
				...semantic
			};
		});
		probesFor = (inventory) => {
			const format = inventory.manifest.root_format;
			if (format === "node-sea") return inventory.occurrences.some((row) => row.format_metadata?.kind === "node-sea-entry" && row.format_metadata.role === "main-script" && isJavaScriptSourcePath(row.logical_path)) ? [{
				operation: "analyze_javascript_application",
				rationale: "Extract the SEA main script with extract_artifact, then analyze the extracted JavaScript application.",
				authority: "ast-static-analysis"
			}] : [];
			if (format === "intel-hex" || format === "srec" || format === "uf2" || format === "dfuse") return inventory.occurrences.some((row) => row.format_metadata?.kind === "hex-record-region" || row.format_metadata?.kind === "uf2-region" || row.format_metadata?.kind === "dfuse-element") ? [{
				operation: "open_binary",
				rationale: "Extract regions with extract_artifact, then open one with format raw-binary, a caller-chosen architecture, and entry_point set to the region start address (raw-binary maps file offset 0 at entry_point).",
				authority: "native-analysis-provider"
			}] : [];
			if (format === "esp-image") return espFlashDumpProbes(inventory);
			if (format === "fit") return fitProbes(inventory);
			return format === "directory" ? directoryProbes(inventory) : probesForFormat(format);
		};
		espFlashDumpProbes = (inventory) => {
			const root = inventory.occurrences.find(({ logical_path }) => logical_path === ".")?.format_metadata;
			if (root?.kind !== "esp-image") return [];
			const dump = root.flash_dump;
			if (dump === null) return [];
			const offset = offsetText(dump.flash_offset);
			return [{
				operation: "open_binary",
				rationale: `Reopen the file with format esp-flash-image and flash_offset ${offset}, then inspect_artifact: it is a flash dump read from flash ${offset}, with a partition table at file offset ${offsetText(dump.table_file_offset)}.`,
				authority: "artifact-bytes"
			}];
		};
		fitProbes = (inventory) => {
			const images = inventory.occurrences.flatMap((row) => row.format_metadata?.kind === "fit-image" && row.format_metadata.compression === "none" && row.format_metadata.cipher_present === false ? [{
				row,
				image: row.format_metadata
			}] : []);
			let rawProbe;
			for (const { row, image } of images) {
				if (row.declared_size === null) continue;
				if (image.entry !== null && image.entry !== image.load) continue;
				if (image.unreadable_fields.includes("entry")) continue;
				const admitted = admitRawBinary({
					architecture: image.arch,
					entryPoint: image.load,
					fileBytes: row.declared_size
				});
				if (!admitted.ok) continue;
				rawProbe = {
					operation: "open_binary",
					rationale: `Extract ${JSON.stringify(row.logical_path)} with extract_artifact, then open those uncompressed, unciphered bytes with format raw-binary, architecture ${admitted.value.architecture} and entry_point ${admitted.value.entryPoint}. This maps offset 0 and seeds analysis at that address; the declared entry is absent or equal to load.`,
					authority: "native-analysis-provider"
				};
				break;
			}
			return [...images.some(({ image }) => image.type === "flat_dt") ? [{
				operation: "inspect_devicetree",
				rationale: "Extract images with extract_artifact, then inspect uncompressed, unciphered flat_dt images with inspect_devicetree.",
				authority: "artifact-bytes"
			}] : [], ...rawProbe === undefined ? [] : [rawProbe]];
		};
		DIRECTORY_MEMBER_FORMATS = [
			"asar",
			"javascript-bundle",
			"mach-o-universal",
			"mach-o",
			"elf",
			"pe",
			"plist"
		];
		directoryProbes = (inventory) => {
			const present = new Set(inventory.occurrences.filter(({ entry_kind, artifact_format }) => entry_kind !== "symlink" || artifact_format !== "javascript-bundle").map(({ artifact_format }) => artifact_format));
			const members = DIRECTORY_MEMBER_FORMATS.filter((memberFormat) => present.has(memberFormat));
			const probes = members.flatMap(probesForFormat);
			return probes.filter((probe, index) => probes.findIndex(({ operation }) => operation === probe.operation) === index);
		};
		probesForFormat = (format) => {
			if (format === "bun-standalone") return [{
				operation: "extract_artifact",
				authority: "artifact-bytes",
				rationale: "Extract the stored module regions into a fresh owned directory, then inspect compatible source separately. Bytecode and source-map regions remain stored evidence; they are not decoded or executed."
			}];
			if (format === "deno-standalone") return [{
				operation: "extract_artifact",
				authority: "artifact-bytes",
				rationale: "Extract the stored virtual files into a fresh owned directory, then inspect compatible source separately. Environment-file values and CA certificate bytes remain in local Evidence with their counts and byte lengths, the npm snapshot stays undecoded, and the executable stays unrun."
			}];
			if (format === "dotnet-bundle") return [{
				operation: "extract_artifact",
				rationale: "Extract members into a fresh owned directory, then inspect candidate files separately; bundle declarations do not establish their format.",
				authority: "artifact-bytes"
			}];
			if (["asar", "javascript-bundle"].includes(format)) return [{
				operation: "analyze_javascript_application",
				rationale: "Recover bounded JavaScript modules, source maps, Electron boundaries, and application relationships.",
				authority: "ast-static-analysis"
			}];
			if (format === "pe") return [{
				operation: "inspect_managed_artifact",
				rationale: "Check execution-free CLI metadata before choosing a deep native provider.",
				authority: "managed-static-analysis"
			}, {
				operation: "open_binary",
				rationale: "Open as native code only when managed inspection reports a native or mixed boundary.",
				authority: "native-analysis-provider"
			}];
			if ([
				"mach-o",
				"mach-o-universal",
				"elf"
			].includes(format)) return [{
				operation: "open_binary",
				rationale: "Bind one deep native provider before function-level analysis.",
				authority: "native-analysis-provider"
			}];
			if (format === "plist") return [{
				operation: "inspect_plist",
				rationale: "Parse property-list values without executing the artifact.",
				authority: "artifact-bytes"
			}];
			return [];
		};
		allUnexploredBranches = (inventory, evidenceId, nextProbes) => {
			const branches = [];
			branches.push(...nextProbes.map((probe) => branch("format-specific-analysis-required", `${probe.operation} was not run by provider-neutral artifact inspection.`, probe, evidenceId)));
			if (inventory.manifest.root_format === "unknown") branches.push(branch("unknown-format", "Artifact bytes did not match an admitted format classifier.", null, evidenceId));
			return branches;
		};
		branch = (reason, detail, nextProbe, evidenceId) => {
			const semantic = {
				reason,
				detail,
				next_probe: nextProbe,
				evidence_id: evidenceId
			};
			return {
				branch_id: `aib_${digestCanonicalValue(semantic, "Artifact inspection")}`,
				...semantic
			};
		};
		inspectionCoverage = (inventory, omissions) => {
			if (Object.values(omissions).some((count) => count > 0)) return "truncated";
			if (inventory.coverage.status !== "complete") return "partial";
			return "complete-within-substeps";
		};
		artifactInspectionSources = (inspection) => {
			const substeps = immutableJsonSnapshotMember(inspection, "substeps");
			return Object.freeze(inspection.substeps.map((step, index) => {
				const ownedStep = immutableJsonSnapshotMember(substeps, String(index));
				immutableJsonSnapshotMember(ownedStep, "evidence");
				return step.evidence;
			}));
		};
		readArtifactInspectionSources = (result) => {
			const parsed = readEvidencePayload(artifactInspectionResultSchema, result);
			if (!parsed.ok) return parsed;
			const inspection = canBorrowParsedJsonSnapshot(result, parsed.value) ? result : parsed.value;
			return ok(artifactInspectionSources(inspection));
		};
	})))();
}

//#endregion
//#region dist/domain/artifactInventoryEvidence.js
var hasCompleteInventoryCoverage, ArtifactInventoryValidationError, ArtifactInventoryCompositionError, ArtifactInventoryCarrierError, parseArtifactInventoryEvidence, parseInspectionEvidencePayload, parseArtifactInspectionInventoryResult, parseInspectionInventoryPayload, validateInspectionSubject, parseArtifactInventoryResult, parseInventoryPage, parseInventoryEvidencePage, subjectMatchesInventoryRoot, validateArtifactInventorySubject, validateInventoryPage, assembleInventoryResults, orderedInventory, orderOccurrences, validateCompleteInventory, validateOccurrence, validateEdge, mergeExact, assertUnique;
function init_artifactInventoryEvidence() {
	return (init_artifactInventoryEvidence = __esmMin((() => {
		init_immutableJson();
		init_artifactGraph();
		init_unicodeCodePointOrder();
		init_comparisonSemantics();
		init_artifactIdentity();
		init_evidence();
		init_evidenceErrors();
		init_evidenceValidation();
		init_evidenceFormat();
		init_artifactInspection();
		hasCompleteInventoryCoverage = (inventory, requiredScope) => inventory.complete && inventory.coverage.scope === requiredScope && inventory.coverage.status === "complete";
		ArtifactInventoryValidationError = class extends TypeError {
			constructor(message, options) {
				super(message, options);
				this.name = "ArtifactInventoryValidationError";
			}
		};
		ArtifactInventoryCompositionError = class extends ArtifactInventoryValidationError {};
		ArtifactInventoryCarrierError = class extends Error {
			index;
			constructor(message, index = undefined, options) {
				super(message, options);
				this.index = index;
				this.name = "ArtifactInventoryCarrierError";
			}
		};
		parseArtifactInventoryEvidence = (input) => {
			const carriers = Array.isArray(input) ? input : [input];
			if (carriers.length === 0) throw new ArtifactInventoryCarrierError("Artifact inventory requires at least one Evidence carrier");
			const evidence = carriers.map((carrier) => {
				const parsed = readEvidence(carrier);
				if (!parsed.ok) throw parsed.error;
				return parsed.value;
			});
			try {
				const pageGroups = evidence.map((carrier, index) => {
					if (carrier.operation === "inventory_artifact") return [parseInventoryEvidencePage(carrier)];
					if (carrier.operation !== "inspect_artifact") throw new ArtifactInventoryCarrierError("Artifact inventory requires inventory_artifact or inspect_artifact Evidence", index);
					return parseInspectionEvidencePayload(carrier.normalized_result, carrier.subject);
				});
				for (const pages of pageGroups) if (pages.length > 1) assembleInventoryResults(pages);
				try {
					return {
						evidence,
						inventory: assembleInventoryResults(pageGroups.flat())
					};
				} catch (cause) {
					if (!(cause instanceof ArtifactInventoryCompositionError)) throw cause;
					if (pageGroups.length === 1) throw cause;
					throw new ArtifactInventoryCarrierError(cause.message, undefined, { cause });
				}
			} catch (cause) {
				if (cause instanceof ArtifactInventoryCarrierError) throw cause;
				if (!(cause instanceof ArtifactInventoryValidationError)) throw cause;
				throw new EvidenceIntegrityError(cause.message, {
					cause,
					userMessage: cause.message
				});
			}
		};
		parseInspectionEvidencePayload = (input, subject) => {
			try {
				return parseInspectionInventoryPayload(input, subject).pages;
			} catch (cause) {
				if (!(cause instanceof z.ZodError)) throw cause;
				throw new ArtifactInventoryValidationError(cause.message, { cause });
			}
		};
		parseArtifactInspectionInventoryResult = (input, subject) => {
			const parsed = parseInspectionInventoryPayload(input, subject);
			return {
				inspection: parsed.inspection,
				inventory: assembleInventoryResults(parsed.pages),
				evidenceIds: parsed.evidenceIds
			};
		};
		parseInspectionInventoryPayload = (input, subject) => {
			const parsedInspection = artifactInspectionResultSchema.parse(input);
			const inspection = canBorrowParsedJsonSnapshot(input, parsedInspection) ? input : isImmutableJsonSnapshot(input) ? freezeJsonSnapshot(parsedInspection) : parsedInspection;
			const sealedSubsteps = immutableJsonSnapshotMember(inspection, "substeps");
			if (inspection.coverage.substeps_completed !== inspection.substeps.length) throw new ArtifactInventoryValidationError("Artifact inspection substep count does not match its coverage declaration");
			const substeps = inspection.substeps.map((step, index) => {
				const sealedStep = immutableJsonSnapshotMember(sealedSubsteps, String(index));
				const sourceEvidence = immutableJsonSnapshotMember(sealedStep, "evidence") ?? step.evidence;
				const parsedEvidence = safeParseEvidence(sourceEvidence);
				if (!parsedEvidence.ok) {
					if (isUnsupportedEvidenceFormat(parsedEvidence.error)) throw parsedEvidence.error;
					throw Object.assign(new z.ZodError(parsedEvidence.error.issues.map((issue) => ({
						...issue,
						path: [
							"substeps",
							index,
							"evidence",
							...issue.path
						]
					}))), { cause: parsedEvidence.error });
				}
				const evidence = canBorrowParsedJsonSnapshot(sourceEvidence, parsedEvidence.value) ? sourceEvidence : parsedEvidence.value;
				immutableJsonSnapshotMember(evidence, "normalized_result");
				if (step.evidence_id !== evidence.evidence_id) throw new ArtifactInventoryValidationError("Artifact inspection substep evidence ID does not match nested Evidence");
				return {
					evidenceId: evidence.evidence_id,
					page: parseInventoryEvidencePage(evidence)
				};
			});
			const firstPage = substeps[0]?.page;
			if (firstPage === undefined) throw new ArtifactInventoryValidationError("Artifact inspection requires inventory substeps");
			validateInspectionSubject(subject, inspection, firstPage.manifest);
			return {
				inspection,
				pages: substeps.map(({ page }) => page),
				evidenceIds: substeps.map(({ evidenceId }) => evidenceId)
			};
		};
		validateInspectionSubject = (subject, inspection, manifest) => {
			if (inspection.subject.manifest_id !== manifest.manifest_id || inspection.subject.root_artifact_id !== manifest.root_artifact_id || inspection.subject.root_sha256 !== manifest.root_sha256 || inspection.subject.root_format !== manifest.root_format) throw new ArtifactInventoryValidationError("Artifact inspection subject does not match its inventory manifest");
			if (!subjectMatchesInventoryRoot(subject, manifest)) throw new ArtifactInventoryValidationError("Artifact inspection Evidence subject does not match its root manifest");
		};
		parseArtifactInventoryResult = (input, subject) => assembleInventoryResults([parseInventoryPage(input, subject)]);
		parseInventoryPage = (input, subject) => {
			const parsed = artifactInventoryResultSchema.parse(input);
			const inventory = canBorrowParsedJsonSnapshot(input, parsed) ? input : isImmutableJsonSnapshot(input) ? freezeJsonSnapshot(parsed) : parsed;
			validateArtifactInventorySubject(subject, inventory.manifest);
			validateInventoryPage(inventory);
			return inventory;
		};
		parseInventoryEvidencePage = (evidence) => {
			if (evidence.operation !== "inventory_artifact") throw new ArtifactInventoryValidationError("Artifact inventory page must be inventory_artifact Evidence");
			try {
				return parseInventoryPage(evidence.normalized_result, evidence.subject);
			} catch (cause) {
				if (!(cause instanceof z.ZodError)) throw cause;
				throw new ArtifactInventoryValidationError(cause.message, { cause });
			}
		};
		subjectMatchesInventoryRoot = (subject, manifest) => {
			const target = evidenceFileTarget({ subject });
			return target !== undefined && target.sha256 === manifest.root_sha256 && target.format === manifest.root_format;
		};
		validateArtifactInventorySubject = (subject, manifest) => {
			if (!subjectMatchesInventoryRoot(subject, manifest)) throw new ArtifactInventoryValidationError("Artifact inventory Evidence subject does not match its root digest");
		};
		validateInventoryPage = (inventory) => {
			const manifest = inventory.manifest;
			if (manifest.root_artifact_id !== artifactIdForContent(manifest.root_sha256)) throw new ArtifactInventoryValidationError("Artifact root identity does not match its manifest digest");
			if (manifest.manifest_id !== artifactManifestId(manifest.root_artifact_id, manifest.graph_sha256)) throw new ArtifactInventoryValidationError("Artifact manifest ID does not match its commitment");
			for (const occurrence of inventory.occurrences) {
				if (occurrence.logical_path !== ".") continue;
				if (occurrence.artifact_id !== manifest.root_artifact_id || occurrence.artifact_format !== manifest.root_format || occurrence.parent_occurrence_id !== null || occurrence.entry_kind !== (manifest.root_format === "directory" ? "directory" : "file")) throw new ArtifactInventoryValidationError("Artifact root occurrence does not match its manifest representation");
				if (occurrence.occurrence_id !== occurrenceIdForLocation({
					rootArtifactId: manifest.root_artifact_id,
					logicalPath: ".",
					entryKind: occurrence.entry_kind
				})) throw new ArtifactInventoryValidationError("Artifact occurrence ID does not match its identity");
			}
			assertUnique(inventory.nodes.map(({ artifact_id: id }) => id), "node ID");
			assertUnique(inventory.occurrences.map(({ occurrence_id: id }) => id), "occurrence ID");
			assertUnique(inventory.edges.map(({ edge_id: id }) => id), "edge ID");
			for (const node of inventory.nodes) if (node.artifact_id !== artifactIdForNode(node) && !(node.content_state === "virtual" && node.artifact_id === artifactIdForContent(node.sha256))) throw new ArtifactInventoryValidationError("Artifact node ID is not content-addressed");
		};
		assembleInventoryResults = (pages) => {
			const first = pages[0];
			if (first === undefined) throw new ArtifactInventoryValidationError("Artifact inventory requires Evidence pages");
			const manifestJson = canonicalJson(first.manifest, "Artifact inventory");
			const coverageJson = canonicalJson(first.coverage, "Artifact inventory coverage");
			const nodes = new Map();
			const occurrences = new Map();
			const edges = new Map();
			for (const page of pages) {
				if (canonicalJson(page.effective_limits ?? null, "Artifact reader policy") !== canonicalJson(first.effective_limits ?? null, "Artifact reader policy")) throw new ArtifactInventoryCompositionError("Artifact inventory pages do not share one accepted reader policy");
				if (canonicalJson(page.manifest, "Artifact inventory") !== manifestJson) throw new ArtifactInventoryCompositionError("Artifact inventory pages do not share one manifest");
				if (canonicalJson(page.coverage, "Artifact inventory coverage") !== coverageJson) throw new ArtifactInventoryCompositionError("Artifact inventory pages do not share one coverage declaration");
				if (canonicalJson(page.integrity_contradictions, "Artifact inventory") !== canonicalJson(first.integrity_contradictions, "Artifact inventory")) throw new ArtifactInventoryCompositionError("Artifact inventory pages do not share integrity contradictions");
				for (const node of page.nodes) mergeExact(nodes, node.artifact_id, node, "node");
				for (const occurrence of page.occurrences) {
					mergeExact(occurrences, occurrence.occurrence_id, occurrence, "occurrence");
				}
				for (const edge of page.edges) mergeExact(edges, edge.edge_id, edge, "edge");
			}
			const inventory = orderedInventory(first, pages, {
				nodes,
				occurrences,
				edges
			});
			if (inventory.nodes.length > inventory.manifest.node_count || inventory.occurrences.length > inventory.manifest.occurrence_count || inventory.edges.length > inventory.manifest.edge_count) throw new ArtifactInventoryValidationError("Artifact inventory members exceed their manifest counts");
			const occurrencesById = new Map(inventory.occurrences.map((occurrence) => [occurrence.occurrence_id, occurrence]));
			for (const edge of inventory.edges) {
				const occurrence = occurrencesById.get(edge.occurrence_id);
				if (occurrence === undefined) continue;
				if (occurrence.artifact_id === null) throw new ArtifactInventoryValidationError("Artifact edge references a missing graph member");
				if (edge.edge_id !== artifactEdgeId(edge, occurrence)) throw new ArtifactInventoryValidationError("Artifact edge ID does not match its identity");
			}
			if (inventory.complete) validateCompleteInventory(inventory);
			return inventory;
		};
		orderedInventory = (first, pages, values) => {
			const nodes = [...values.nodes.values()].sort((left, right) => compareUnicodeCodePoints(left.artifact_id, right.artifact_id));
			const occurrences = orderOccurrences(first.manifest.root_artifact_id, [...values.occurrences.values()]);
			const edges = [...values.edges.values()].sort((left, right) => compareUnicodeCodePoints(left.edge_id, right.edge_id));
			const limitations = [...new Set(pages.flatMap((inventory) => inventory.limitations))].sort(compareUnicodeCodePoints);
			return {
				manifest: first.manifest,
				...first.effective_limits === undefined ? {} : { effectiveLimits: first.effective_limits },
				nodes,
				occurrences,
				edges,
				integrityContradictions: first.integrity_contradictions,
				limitations,
				coverage: first.coverage,
				complete: nodes.length === first.manifest.node_count && occurrences.length === first.manifest.occurrence_count && edges.length === first.manifest.edge_count
			};
		};
		orderOccurrences = (rootArtifactId, occurrences) => {
			const groups = new Map();
			for (const occurrence of occurrences) {
				const group = groups.get(occurrence.logical_path);
				if (group === undefined) groups.set(occurrence.logical_path, [occurrence]);
				else group.push(occurrence);
			}
			return [...groups].sort(([left], [right]) => compareUnicodeCodePoints(left, right)).flatMap(([path, group]) => {
				if (group.length < 2) return group;
				const ordinalById = new Map();
				const kinds = new Set(group.map(({ entry_kind }) => entry_kind));
				for (let ordinal = 0; ordinal < group.length; ordinal++) {
					for (const entryKind of kinds) ordinalById.set(occurrenceIdForLocation({
						rootArtifactId,
						logicalPath: path,
						entryKind,
						...ordinal === 0 ? {} : { duplicateOrdinal: ordinal }
					}), ordinal);
				}
				return group.sort((left, right) => (ordinalById.get(left.occurrence_id) ?? Number.MAX_SAFE_INTEGER) - (ordinalById.get(right.occurrence_id) ?? Number.MAX_SAFE_INTEGER) || compareUnicodeCodePoints(left.occurrence_id, right.occurrence_id));
			});
		};
		validateCompleteInventory = (inventory) => {
			const nodeIds = new Set(inventory.nodes.map(({ artifact_id: id }) => id));
			const occurrenceIds = new Set(inventory.occurrences.map(({ occurrence_id: id }) => id));
			const rootNode = inventory.nodes.find(({ artifact_id: id }) => id === inventory.manifest.root_artifact_id);
			if (rootNode?.sha256 !== inventory.manifest.root_sha256) throw new ArtifactInventoryValidationError("Artifact root node does not match its manifest digest");
			const rootOccurrence = inventory.occurrences.find(({ logical_path }) => logical_path === ".");
			if (rootOccurrence === undefined) throw new ArtifactInventoryValidationError("Artifact root occurrence does not match its manifest representation");
			const duplicateOrdinalByPath = new Map();
			for (const occurrence of inventory.occurrences) {
				const ordinal = duplicateOrdinalByPath.get(occurrence.logical_path) ?? 0;
				duplicateOrdinalByPath.set(occurrence.logical_path, ordinal + 1);
				validateOccurrence(occurrence, inventory, nodeIds, occurrenceIds, ordinal);
			}
			const occurrencesById = new Map(inventory.occurrences.map((occurrence) => [occurrence.occurrence_id, occurrence]));
			for (const edge of inventory.edges) validateEdge(edge, nodeIds, occurrencesById);
			for (const contradiction of inventory.integrityContradictions) {
				if (!nodeIds.has(contradiction.parent_artifact_id) || !occurrenceIds.has(contradiction.occurrence_id)) throw new ArtifactInventoryValidationError("Integrity contradiction references a missing graph member");
				const expectedId = artifactContradictionId({
					rootArtifactId: inventory.manifest.root_artifact_id,
					logicalPath: contradiction.logical_path,
					integrity: contradiction
				});
				if (contradiction.contradiction_id !== expectedId) throw new ArtifactInventoryValidationError("Integrity contradiction ID does not match its identity");
			}
			const graphSha256 = artifactGraphDigest({
				nodes: inventory.nodes,
				occurrences: inventory.occurrences,
				edges: inventory.edges,
				contradictions: inventory.integrityContradictions
			});
			if (graphSha256 !== inventory.manifest.graph_sha256) throw new ArtifactInventoryValidationError("Artifact graph commitment does not match its members");
		};
		validateOccurrence = (occurrence, inventory, nodeIds, occurrenceIds, duplicateOrdinal) => {
			if (occurrence.artifact_id !== null && !nodeIds.has(occurrence.artifact_id)) throw new ArtifactInventoryValidationError("Artifact occurrence references a missing node");
			if (occurrence.parent_occurrence_id !== null && !occurrenceIds.has(occurrence.parent_occurrence_id)) throw new ArtifactInventoryValidationError("Artifact occurrence references a missing parent");
			const expectedId = occurrenceIdForLocation({
				rootArtifactId: inventory.manifest.root_artifact_id,
				logicalPath: occurrence.logical_path,
				entryKind: occurrence.entry_kind,
				...duplicateOrdinal === 0 ? {} : { duplicateOrdinal }
			});
			if (occurrence.occurrence_id !== expectedId) throw new ArtifactInventoryValidationError("Artifact occurrence ID does not match its identity");
		};
		validateEdge = (edge, nodeIds, occurrences) => {
			const occurrence = occurrences.get(edge.occurrence_id);
			if (!nodeIds.has(edge.parent_artifact_id) || occurrence?.artifact_id === null || occurrence === undefined || !nodeIds.has(occurrence.artifact_id)) throw new ArtifactInventoryValidationError("Artifact edge references a missing graph member");
		};
		mergeExact = (output, key, value, label) => {
			const previous = output.get(key);
			if (previous !== undefined && canonicalJson(previous, "Artifact inventory") !== canonicalJson(value, "Artifact inventory")) throw new ArtifactInventoryCompositionError(`Artifact inventory has conflicting ${label} pages`);
			output.set(key, value);
		};
		assertUnique = (values, label) => {
			if (new Set(values).size !== values.length) throw new ArtifactInventoryValidationError(`Artifact inventory contains a duplicate ${label}`);
		};
	})))();
}

//#endregion
export { ArtifactInventoryCarrierError, ArtifactInventoryValidationError, artifactInspectionResultSchema, artifactInspectionSources, createArtifactInspection, hasCompleteInventoryCoverage, init_artifactInspection, init_artifactInventoryEvidence, parseArtifactInspectionInventoryResult, parseArtifactInventoryEvidence, parseArtifactInventoryResult, readArtifactInspectionSources, validateArtifactInventorySubject };