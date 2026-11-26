import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_localPath, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { evidenceLocationSchema, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { PE_CODEVIEW_PREFIX_BYTES, init_binaryTargetTypes } from "./binaryTargetTypes-CrE-Muhh.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/domain/releaseExposure.js
var MAX_RELEASE_EXPOSURE_FILE_BYTES, MAX_RELEASE_EXPOSURE_INVENTORY_ENTRIES, MAX_RELEASE_EXPOSURE_INVENTORY_BYTES, MAX_RELEASE_EXPOSURE_TEXT_MEMBER_BYTES, MAX_RELEASE_EXPOSURE_TEXT_BYTES, MAX_RELEASE_EXPOSURE_SCRIPT_TARGET_BYTES, MAX_RELEASE_EXPOSURE_MAP_TARGET_BYTES, MAX_RELEASE_EXPOSURE_SOURCE_MAPS, MAX_RELEASE_EXPOSURE_SOURCE_MAP_BYTES, MAX_RELEASE_EXPOSURE_MEMBER_PROBE_BYTES, MAX_RELEASE_EXPOSURE_PACKAGED_PE_BYTES, MAX_RELEASE_EXPOSURE_PACKAGED_PE_READS, MAX_RELEASE_EXPOSURE_NATIVE_IMAGES, MAX_RELEASE_EXPOSURE_SAMPLES, RELEASE_EXPOSURE_OPERATION, RELEASE_EXPOSURE_LIMITATION, RELEASE_EXPOSURE_ALLOWANCES, RELEASE_EXPOSURE_STATUSES, RELEASE_EXPOSURE_SEVERITIES, RELEASE_EXPOSURE_FAIL_LEVELS, RELEASE_EXPOSURE_CHECK_IDS, statusSchema, severitySchema, CHECK_TABLE, pdbPathBytesSchema, observationSchema, releaseExposureCheckSchema, countSchema, severityCountSchema, releaseExposureReportSchema, auditReleaseExposureInputSchema, PACKAGED_NATIVE_IMAGES, SEVERITY_RANK, FAIL_RANK, boundSamples, boundLocations, makeCheck, targetLocation, findingLocations, sourceMapCheck, FUSE_SUBJECTS, RELEASE_EXPOSURE_FUSE_SUBJECTS, nativeImagesMayBeUnread, packagedNativeImagesUnread, fuseCheck, extractableCheck, companionCheck, pdbCheck, metadataStatus, retainsBuildPaths, goCheck, rustCheck, credentialCheck, notAssessed, assembleReleaseExposureReport, summarizeReleaseExposureChecks, exposureMeetsFailOn;
function init_releaseExposure() {
	return (init_releaseExposure = __esmMin((() => {
		init_binaryTargetTypes();
		init_digests();
		init_evidence();
		init_localPath();
		MAX_RELEASE_EXPOSURE_FILE_BYTES = 256 * 1024 * 1024;
		MAX_RELEASE_EXPOSURE_INVENTORY_ENTRIES = 65536;
		MAX_RELEASE_EXPOSURE_INVENTORY_BYTES = 2 * 1024 * 1024 * 1024;
		MAX_RELEASE_EXPOSURE_TEXT_MEMBER_BYTES = 256 * 1024;
		MAX_RELEASE_EXPOSURE_TEXT_BYTES = 4 * 1024 * 1024;
		MAX_RELEASE_EXPOSURE_SCRIPT_TARGET_BYTES = 1024 * 1024;
		MAX_RELEASE_EXPOSURE_MAP_TARGET_BYTES = 1024 * 1024;
		MAX_RELEASE_EXPOSURE_SOURCE_MAPS = 32;
		MAX_RELEASE_EXPOSURE_SOURCE_MAP_BYTES = 1024 * 1024;
		MAX_RELEASE_EXPOSURE_MEMBER_PROBE_BYTES = 4096;
		MAX_RELEASE_EXPOSURE_PACKAGED_PE_BYTES = 256 * 1024;
		MAX_RELEASE_EXPOSURE_PACKAGED_PE_READS = 64;
		MAX_RELEASE_EXPOSURE_NATIVE_IMAGES = 4;
		MAX_RELEASE_EXPOSURE_SAMPLES = 8;
		RELEASE_EXPOSURE_OPERATION = "audit_release_exposure";
		RELEASE_EXPOSURE_LIMITATION = "This report states what static analysis of the selected artifact recovered. It does not establish that the application is secure.";
		RELEASE_EXPOSURE_ALLOWANCES = [
			`Selected file reads stop at ${String(MAX_RELEASE_EXPOSURE_FILE_BYTES)} bytes.`,
			`Text member scans read at most ${String(MAX_RELEASE_EXPOSURE_TEXT_MEMBER_BYTES)} bytes each and ${String(MAX_RELEASE_EXPOSURE_TEXT_BYTES)} bytes in total.`,
			`HTML script targets keep at most ${String(MAX_RELEASE_EXPOSURE_SCRIPT_TARGET_BYTES)} bytes of resolved paths. Later targets stay unassessed.`,
			`Local source map targets keep at most ${String(MAX_RELEASE_EXPOSURE_MAP_TARGET_BYTES)} bytes of resolved paths. Later targets stay unassessed.`,
			`Source map scans read at most ${String(32)} maps and ${String(MAX_RELEASE_EXPOSURE_SOURCE_MAP_BYTES)} bytes each. sourcesContent text is counted and then dropped.`,
			`Other files and package members are identified from their first ${String(MAX_RELEASE_EXPOSURE_MEMBER_PROBE_BYTES)} bytes, and those without a NUL byte in that prefix are scanned as text. Up to ${String(64)} packaged PE images are read for debug records, ${String(MAX_RELEASE_EXPOSURE_PACKAGED_PE_BYTES)} bytes each.`,
			"Packaged ELF, Mach-O, and PE images are read in full and copied to a temporary file to probe for an embedded package. They share one max_file_bytes allowance, and an image that does not fit is not probed.",
			`Go, Rust, and Electron fuse readers run on at most ${String(4)} native images.`
		];
		RELEASE_EXPOSURE_STATUSES = [
			"exposed",
			"not_observed",
			"not_applicable",
			"unknown",
			"not_assessed"
		];
		RELEASE_EXPOSURE_SEVERITIES = [
			"high",
			"medium",
			"low",
			"info"
		];
		RELEASE_EXPOSURE_FAIL_LEVELS = [
			"high",
			"medium",
			"low"
		];
		RELEASE_EXPOSURE_CHECK_IDS = [
			"javascript.source_map_sources",
			"javascript.source_maps",
			"electron.run_as_node",
			"electron.asar_integrity",
			"electron.only_load_from_asar",
			"electron.node_cli_inspect",
			"packaging.extractable_payload",
			"native.debug_companions",
			"native.pdb_path",
			"go.build_paths",
			"rust.dependency_metadata",
			"text.credential_markers",
			"native.hardening",
			"macho.hardened_runtime",
			"android.manifest"
		];
		statusSchema = z.enum(RELEASE_EXPOSURE_STATUSES);
		severitySchema = z.enum(RELEASE_EXPOSURE_SEVERITIES);
		CHECK_TABLE = {
			"javascript.source_map_sources": {
				severity: "high",
				remediation: "Ship the release without sourcesContent. Remove the source maps or omit sourcesContent from maps that ship.",
				next_probe: null
			},
			"javascript.source_maps": {
				severity: "medium",
				remediation: "Do not ship source maps beside the release.",
				next_probe: null
			},
			"electron.run_as_node": {
				severity: "high",
				remediation: "Set FuseV1Options.RunAsNode to false with @electron/fuses before packaging.",
				next_probe: "inspect_electron_fuses"
			},
			"electron.asar_integrity": {
				severity: "medium",
				remediation: "Set FuseV1Options.EnableEmbeddedAsarIntegrityValidation to true with @electron/fuses. Electron compiles this check for macOS and Windows; an ELF byte stays unknown.",
				next_probe: "inspect_electron_fuses"
			},
			"electron.only_load_from_asar": {
				severity: "medium",
				remediation: "Set FuseV1Options.OnlyLoadAppFromAsar to true with @electron/fuses so the packaged app loads application code from app.asar.",
				next_probe: "inspect_electron_fuses"
			},
			"electron.node_cli_inspect": {
				severity: "medium",
				remediation: "Set FuseV1Options.EnableNodeCliInspectArguments to false with @electron/fuses so the packaged app ignores --inspect.",
				next_probe: "inspect_electron_fuses"
			},
			"packaging.extractable_payload": {
				severity: "low",
				remediation: "Readable members are part of this package format. Treat packaged sources as public. This check does not rewrite the artifact.",
				next_probe: "inspect_artifact"
			},
			"native.debug_companions": {
				severity: "medium",
				remediation: "Do not ship .pdb, .dSYM, .debug, or linker map files beside the release.",
				next_probe: null
			},
			"native.pdb_path": {
				severity: "low",
				remediation: "Rebuild without a CodeView PDB path, or accept that the path string is recoverable from the PE. The PDB file itself is a separate check.",
				next_probe: null
			},
			"go.build_paths": {
				severity: "low",
				remediation: "Rebuild with -trimpath so file paths are not written into the binary. Module names can remain.",
				next_probe: "inspect_go_binary"
			},
			"rust.dependency_metadata": {
				severity: "low",
				remediation: "Omit cargo-auditable metadata from the release if the crate list should not ship.",
				next_probe: "inspect_rust_binary"
			},
			"text.credential_markers": {
				severity: "high",
				remediation: "Remove the provider-prefixed credential from the shipped text and rotate it if it is real. This check reports the rule id and location only.",
				next_probe: null
			},
			"native.hardening": {
				severity: "info",
				remediation: "This audit does not assess native hardening. Use inspect_binary_hardening when that tool is available.",
				next_probe: "inspect_binary_hardening"
			},
			"macho.hardened_runtime": {
				severity: "info",
				remediation: "This audit does not assess the Mach-O hardened runtime. inspect_signature reads code signatures and would change this tool's effects, so it stays a next probe.",
				next_probe: "inspect_signature"
			},
			"android.manifest": {
				severity: "info",
				remediation: "This audit does not read Android manifests. Use inspect_android_package, which needs JADX.",
				next_probe: "inspect_android_package"
			}
		};
		pdbPathBytesSchema = z.strictObject({
			image_path: localPathStringSchema,
			bytes_hex: z.string().max(PE_CODEVIEW_PREFIX_BYTES * 2).regex(/^(?:[0-9a-f]{2})+$/u),
			encoding: z.literal("unknown")
		});
		observationSchema = z.strictObject({
			counts: z.record(z.string().min(1), z.int().nonnegative()),
			samples: z.array(z.string().min(1)).max(8),
			pdb_path_bytes: z.array(pdbPathBytesSchema).min(1).max(8).exactOptional().describe("CodeView locator bytes with unknown text encoding.")
		});
		releaseExposureCheckSchema = z.strictObject({
			id: z.enum(RELEASE_EXPOSURE_CHECK_IDS),
			status: statusSchema,
			severity: severitySchema.nullable(),
			confidence: z.enum(["observed", "inferred"]),
			observation: observationSchema,
			locations: z.array(evidenceLocationSchema).max(8),
			remediation: z.string().min(1),
			next_probe: z.string().min(1).nullable()
		});
		countSchema = z.strictObject({
			exposed: z.int().nonnegative(),
			not_observed: z.int().nonnegative(),
			not_applicable: z.int().nonnegative(),
			unknown: z.int().nonnegative(),
			not_assessed: z.int().nonnegative()
		});
		severityCountSchema = z.strictObject({
			high: z.int().nonnegative(),
			medium: z.int().nonnegative(),
			low: z.int().nonnegative(),
			info: z.int().nonnegative()
		});
		releaseExposureReportSchema = z.strictObject({
			target: z.strictObject({
				selected_path: localPathStringSchema,
				kind: z.enum([
					"app",
					"directory",
					"asar",
					"executable",
					"file"
				]),
				format: z.string().min(1),
				sha256: digestSchema.nullable()
			}),
			checks: z.array(releaseExposureCheckSchema),
			summary: z.strictObject({
				by_status: countSchema,
				by_severity: severityCountSchema,
				highest_exposed_severity: severitySchema.nullable(),
				no_exposure_observed_in_assessed_checks: z.boolean()
			}),
			coverage: z.strictObject({
				allowances: z.array(z.string().min(1)),
				omitted: z.array(z.strictObject({
					subject: z.string().min(1),
					count: z.int().nonnegative(),
					reason: z.string().min(1)
				}))
			}),
			limitations: z.array(z.string().min(1))
		}).superRefine((report, context) => {
			if (report.checks.length !== RELEASE_EXPOSURE_CHECK_IDS.length || report.checks.some((check, index) => check.id !== RELEASE_EXPOSURE_CHECK_IDS[index])) context.addIssue({
				code: "custom",
				path: ["checks"],
				message: "Checks must be the fixed release-exposure table, in order."
			});
			for (const [index, check] of report.checks.entries()) {
				const policy = CHECK_TABLE[check.id];
				if (check.remediation !== policy.remediation || check.next_probe !== policy.next_probe) context.addIssue({
					code: "custom",
					path: ["checks", index],
					message: "Remediation and next probe are fixed per check."
				});
				if (check.status === "exposed" && check.severity !== policy.severity) context.addIssue({
					code: "custom",
					path: [
						"checks",
						index,
						"severity"
					],
					message: "Exposed severity comes from the check policy."
				});
				if (check.status !== "exposed" && check.severity !== null) context.addIssue({
					code: "custom",
					path: [
						"checks",
						index,
						"severity"
					],
					message: "Severity is null unless the check is exposed."
				});
			}
			const summary = summarizeReleaseExposureChecks(report.checks);
			if (JSON.stringify(summary) !== JSON.stringify(report.summary) || report.limitations[0] !== RELEASE_EXPOSURE_LIMITATION) context.addIssue({
				code: "custom",
				path: ["summary"],
				message: "Summary and the leading limitation do not match the checks."
			});
		});
		auditReleaseExposureInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute path to a shipped .app bundle, install directory, ASAR, or executable"),
			max_file_bytes: z.int().positive().max(MAX_RELEASE_EXPOSURE_FILE_BYTES).default(MAX_RELEASE_EXPOSURE_FILE_BYTES).describe("Selected-file, on-disk PE, and shared packaged-image read ceiling. Text, source-map, and other package members use the smaller allowances in coverage.allowances.")
		});
		PACKAGED_NATIVE_IMAGES = "packaged native images";
		SEVERITY_RANK = {
			info: 1,
			low: 2,
			medium: 3,
			high: 4
		};
		FAIL_RANK = {
			low: 2,
			medium: 3,
			high: 4
		};
		boundSamples = (samples) => {
			const unique = [];
			for (const sample of samples) {
				if (sample.length === 0 || unique.includes(sample)) continue;
				unique.push(sample);
				if (unique.length === 8) break;
			}
			return unique;
		};
		boundLocations = (locations) => locations.slice(0, 8);
		makeCheck = (id, status, confidence, counts, samples, locations) => {
			const policy = CHECK_TABLE[id];
			return {
				id,
				status,
				severity: status === "exposed" ? policy.severity : null,
				confidence,
				observation: {
					counts,
					samples: boundSamples(samples)
				},
				locations: boundLocations(locations),
				remediation: policy.remediation,
				next_probe: policy.next_probe
			};
		};
		targetLocation = (path) => [{
			kind: "artifact-path",
			path
		}];
		findingLocations = (paths, fallback) => {
			const locations = [...new Set(paths.filter((path) => path.length > 0))].slice(0, 8).map((path) => ({
				kind: "artifact-path",
				path
			}));
			return locations.length > 0 ? locations : targetLocation(fallback);
		};
		sourceMapCheck = (id, present, scan) => {
			const { source_maps: maps, coverage, target } = scan;
			const unresolved = maps.unparsed + maps.skipped > 0 || coverage === "unknown";
			const status = present > 0 ? "exposed" : unresolved ? "unknown" : "not_observed";
			const findingPaths = id === "javascript.source_map_sources" ? maps.embedded_paths ?? (present > 0 ? maps.samples : []) : maps.plain_paths ?? (present > 0 ? maps.samples : []);
			return makeCheck(id, status, status === "unknown" ? "inferred" : "observed", {
				embedded: maps.embedded,
				without_sources: maps.without_sources,
				unparsed: maps.unparsed,
				skipped: maps.skipped
			}, maps.samples, status === "exposed" ? findingLocations(findingPaths, target.selected_path) : targetLocation(target.selected_path));
		};
		FUSE_SUBJECTS = {
			"electron.run_as_node": {
				subject: "electron_run_as_node",
				exposed: "honored",
				safe: "not_honored"
			},
			"electron.node_cli_inspect": {
				subject: "node_cli_inspect_arguments",
				exposed: "honored",
				safe: "not_honored"
			},
			"electron.asar_integrity": {
				subject: "embedded_asar_integrity_validation",
				exposed: "not_enforced",
				safe: "enforced"
			},
			"electron.only_load_from_asar": {
				subject: "only_load_app_from_asar",
				exposed: "not_restricted_to_app_asar",
				safe: "restricted_to_app_asar"
			}
		};
		RELEASE_EXPOSURE_FUSE_SUBJECTS = Object.values(FUSE_SUBJECTS).map((spec) => spec.subject);
		nativeImagesMayBeUnread = (scan) => scan.coverage === "unknown" || scan.omitted.some((item) => (item.subject === "native images" || item.subject === "packaged native images") && item.count > 0);
		packagedNativeImagesUnread = (scan) => scan.omitted.some((item) => item.subject === "packaged native images" && item.count > 0);
		fuseCheck = (id, scan, owners) => {
			const path = scan.target.selected_path;
			const spec = FUSE_SUBJECTS[id];
			const images = owners.fuse_images;
			const outcomes = images.flatMap((image) => image.kind === "report" ? (image.implications ?? []).filter((item) => item.subject === spec.subject).map((item) => item.outcome) : []);
			const failed = images.some((image) => image.kind === "failed");
			const hostUnresolved = images.some((image) => image.kind !== "failed" && (image.role === "app-bundle" || image.path !== undefined && owners.electron_host_paths?.includes(image.path) === true) && !(image.implications ?? []).some((item) => item.subject === spec.subject));
			const partialFuseSample = owners.electron_layouts_complete === false || packagedNativeImagesUnread(scan) || nativeImagesMayBeUnread(scan) && owners.electron_executable_included !== true;
			let status;
			if (outcomes.includes(spec.exposed)) status = "exposed";
			else if (owners.electron_family === "not_electron") status = nativeImagesMayBeUnread(scan) ? "unknown" : "not_applicable";
			else if (outcomes.includes("unknown") || failed || hostUnresolved) status = "unknown";
			else if (outcomes.length > 0 && outcomes.every((item) => item === spec.safe)) status = partialFuseSample ? "unknown" : "not_observed";
			else if (owners.electron_family === "not_a_directory") status = nativeImagesMayBeUnread(scan) ? "unknown" : "not_applicable";
			else status = "unknown";
			const familyReason = owners.electron_family_reason;
			const exposedPaths = images.flatMap((image) => {
				if (image.kind !== "report" || image.path === undefined) return [];
				const hit = (image.implications ?? []).some((item) => item.subject === spec.subject && item.outcome === spec.exposed);
				return hit ? [image.path] : [];
			});
			return makeCheck(id, status, "inferred", {
				images: images.length,
				implications: outcomes.length
			}, [...images.flatMap((image) => image.reason === undefined ? [] : [image.reason]), ...status === "unknown" && familyReason !== undefined && familyReason !== null ? [familyReason] : []], status === "exposed" ? findingLocations(exposedPaths, path) : targetLocation(path));
		};
		extractableCheck = (scan) => {
			const { extractable, coverage, target } = scan;
			let status;
			if (extractable.readable_members > 0) status = "exposed";
			else if (extractable.unreadable_members > 0 || extractable.formats.length > 0 || coverage !== "complete") status = "unknown";
			else status = "not_observed";
			return makeCheck("packaging.extractable_payload", status, status === "unknown" ? "inferred" : "observed", {
				readable_members: extractable.readable_members,
				unreadable_members: extractable.unreadable_members,
				formats: extractable.formats.length
			}, [...extractable.formats, ...extractable.samples], status === "exposed" ? findingLocations(extractable.samples, target.selected_path) : targetLocation(target.selected_path));
		};
		companionCheck = (scan) => {
			const { debug_companions: companions, coverage, target } = scan;
			const status = companions.paths.length > 0 ? "exposed" : companions.skipped > 0 || coverage === "unknown" ? "unknown" : "not_observed";
			return makeCheck("native.debug_companions", status, status === "not_observed" ? "observed" : "inferred", {
				companions: companions.paths.length,
				skipped: companions.skipped
			}, companions.paths, status === "exposed" ? findingLocations(companions.paths, target.selected_path) : targetLocation(target.selected_path));
		};
		pdbCheck = (scan) => {
			const { pdb, coverage, target } = scan;
			const rawPaths = pdb.path_bytes ?? [];
			const paths = pdb.paths.length + rawPaths.length;
			let status;
			if (paths > 0) status = "exposed";
			else if (pdb.failed > 0 || coverage !== "complete") status = "unknown";
			else if (pdb.examined === 0) status = "not_applicable";
			else status = "not_observed";
			const imagePaths = pdb.image_paths ?? [];
			const check = makeCheck("native.pdb_path", status, status === "unknown" ? "inferred" : "observed", {
				examined: pdb.examined,
				paths,
				failed: pdb.failed
			}, pdb.paths, status === "exposed" ? findingLocations(imagePaths, target.selected_path) : targetLocation(target.selected_path));
			return rawPaths.length === 0 ? check : {
				...check,
				observation: {
					...check.observation,
					pdb_path_bytes: [...rawPaths]
				}
			};
		};
		metadataStatus = (images, present, unresolved) => {
			if (images.some(present)) return "exposed";
			if (unresolved || images.some((image) => image.kind === "failed" || image.kind === "absent")) return "unknown";
			if (images.every((image) => image.kind === "unsupported")) return "not_applicable";
			return "not_observed";
		};
		retainsBuildPaths = (image) => image.kind === "paths" && image.paths.length > 0;
		goCheck = (scan, images) => {
			const path = scan.target.selected_path;
			const paths = images.flatMap((image) => image.kind === "paths" ? image.paths : []);
			const reasons = images.flatMap((image) => image.kind === "failed" ? [image.reason] : []);
			const imagePaths = images.flatMap((image) => retainsBuildPaths(image) && image.path !== undefined ? [image.path] : []);
			const status = metadataStatus(images, retainsBuildPaths, nativeImagesMayBeUnread(scan) || images.some((image) => image.kind === "paths" && image.complete === false));
			return makeCheck("go.build_paths", status, status === "unknown" ? "inferred" : "observed", {
				images: images.length,
				paths: paths.length
			}, [...paths, ...reasons], status === "exposed" ? findingLocations(imagePaths, path) : targetLocation(path));
		};
		rustCheck = (scan, images) => {
			const path = scan.target.selected_path;
			const packages = images.flatMap((image) => image.kind === "packages" ? image.packages : []);
			const reasons = images.flatMap((image) => image.kind === "failed" ? [image.reason] : []);
			const imagePaths = images.flatMap((image) => image.kind === "packages" && image.path !== undefined ? [image.path] : []);
			const status = metadataStatus(images, (image) => image.kind === "packages", nativeImagesMayBeUnread(scan));
			return makeCheck("rust.dependency_metadata", status, status === "unknown" ? "inferred" : "observed", {
				images: images.length,
				packages: packages.length
			}, [...packages, ...reasons], status === "exposed" ? findingLocations(imagePaths, path) : targetLocation(path));
		};
		credentialCheck = (scan, markers) => {
			const { text_members: members, coverage, target } = scan;
			const counts = {
				scanned_members: members.scanned,
				skipped_members: members.skipped,
				omitted_hits: markers.omitted_hits
			};
			for (const hit of markers.hits) counts[hit.rule_id] = (counts[hit.rule_id] ?? 0) + 1;
			const status = markers.hits.length > 0 ? "exposed" : members.skipped > 0 || coverage === "unknown" ? "unknown" : members.scanned === 0 ? "not_applicable" : "not_observed";
			return makeCheck("text.credential_markers", status, status === "unknown" ? "inferred" : "observed", counts, markers.hits.map((hit) => `${hit.rule_id} ${hit.path}:${String(hit.line)}`), status === "exposed" ? findingLocations(markers.hits.map((hit) => hit.path), target.selected_path) : targetLocation(target.selected_path));
		};
		notAssessed = (id, path) => makeCheck(id, "not_assessed", "inferred", { assessed: 0 }, [], targetLocation(path));
		assembleReleaseExposureReport = (scan, owners) => {
			const path = scan.target.selected_path;
			const checks = [
				sourceMapCheck("javascript.source_map_sources", scan.source_maps.embedded, scan),
				sourceMapCheck("javascript.source_maps", scan.source_maps.without_sources, scan),
				fuseCheck("electron.run_as_node", scan, owners),
				fuseCheck("electron.asar_integrity", scan, owners),
				fuseCheck("electron.only_load_from_asar", scan, owners),
				fuseCheck("electron.node_cli_inspect", scan, owners),
				extractableCheck(scan),
				companionCheck(scan),
				pdbCheck(scan),
				goCheck(scan, owners.go_images),
				rustCheck(scan, owners.rust_images),
				credentialCheck(scan, owners.credential_markers),
				notAssessed("native.hardening", path),
				notAssessed("macho.hardened_runtime", path),
				notAssessed("android.manifest", path)
			];
			return releaseExposureReportSchema.parse({
				target: scan.target,
				checks,
				summary: summarizeReleaseExposureChecks(checks),
				coverage: {
					allowances: [...RELEASE_EXPOSURE_ALLOWANCES],
					omitted: scan.omitted.filter((item) => item.count > 0)
				},
				limitations: [
					RELEASE_EXPOSURE_LIMITATION,
					...scan.limitations.filter((item) => item !== RELEASE_EXPOSURE_LIMITATION),
					...owners.go_images.flatMap((image) => image.kind === "paths" ? image.limitations ?? [] : [])
				]
			});
		};
		summarizeReleaseExposureChecks = (checks) => {
			const byStatus = {
				exposed: 0,
				not_observed: 0,
				not_applicable: 0,
				unknown: 0,
				not_assessed: 0
			};
			const bySeverity = {
				high: 0,
				medium: 0,
				low: 0,
				info: 0
			};
			let highest = null;
			for (const check of checks) {
				byStatus[check.status] += 1;
				if (check.status !== "exposed" || check.severity === null) continue;
				bySeverity[check.severity] += 1;
				if (highest === null || SEVERITY_RANK[check.severity] > SEVERITY_RANK[highest]) highest = check.severity;
			}
			return {
				by_status: byStatus,
				by_severity: bySeverity,
				highest_exposed_severity: highest,
				no_exposure_observed_in_assessed_checks: byStatus.exposed === 0
			};
		};
		exposureMeetsFailOn = (report, level) => report.checks.some((check) => check.status === "exposed" && check.severity !== null && SEVERITY_RANK[check.severity] >= FAIL_RANK[level]);
	})))();
}

//#endregion
//#region dist/contracts/releaseExposureToolContracts.js
var RELEASE_EXPOSURE_TOOL_CONTRACTS;
function init_releaseExposureToolContracts() {
	return (init_releaseExposureToolContracts = __esmMin((() => {
		init_releaseExposure();
		init_toolEffects();
		init_toolOutputSchemaPrimitives();
		RELEASE_EXPOSURE_TOOL_CONTRACTS = [{
			name: "audit_release_exposure",
			availability: "standalone",
			cli: true,
			...toolContractMetadata("audit_release_exposure", toolEffects({
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true
			})),
			kind: "artifact-provider",
			description: "Report what static analysis of a shipped application artifact recovers. Accepts one local .app bundle, installation directory, ASAR, or executable. Each check has a stable id, a status, the observation behind it, and fixed remediation text. Unknown and unassessed checks stay in the report. This does not establish that an application is secure. Reads the selected artifact. When the selection is a file, the parent directory is listed for sibling .pdb, .dSYM, .debug, and .map debug companions.",
			inputSchema: auditReleaseExposureInputSchema,
			outputSchema: evidenceResultOf(releaseExposureReportSchema),
			examples: [{
				title: "Audit a shipped application",
				input: { path: "/artifacts/MyApp.app" }
			}]
		}];
	})))();
}

//#endregion
export { MAX_RELEASE_EXPOSURE_FILE_BYTES, MAX_RELEASE_EXPOSURE_INVENTORY_BYTES, MAX_RELEASE_EXPOSURE_INVENTORY_ENTRIES, MAX_RELEASE_EXPOSURE_MAP_TARGET_BYTES, MAX_RELEASE_EXPOSURE_MEMBER_PROBE_BYTES, MAX_RELEASE_EXPOSURE_PACKAGED_PE_BYTES, MAX_RELEASE_EXPOSURE_SCRIPT_TARGET_BYTES, MAX_RELEASE_EXPOSURE_SOURCE_MAP_BYTES, MAX_RELEASE_EXPOSURE_TEXT_BYTES, MAX_RELEASE_EXPOSURE_TEXT_MEMBER_BYTES, PACKAGED_NATIVE_IMAGES, RELEASE_EXPOSURE_FUSE_SUBJECTS, RELEASE_EXPOSURE_OPERATION, RELEASE_EXPOSURE_TOOL_CONTRACTS, assembleReleaseExposureReport, auditReleaseExposureInputSchema, exposureMeetsFailOn, init_releaseExposure, init_releaseExposureToolContracts, nativeImagesMayBeUnread, releaseExposureReportSchema };