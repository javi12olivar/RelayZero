import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisOutputError, ArtifactOperationError, ParseFailureError, decodeLimit, errorMessage, fixedCeilingConstraint, init_analysisErrorCore, init_artifactOperationError, init_errorMessage, init_parseFailure, malformedInput, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { init_parseFailureAnalysisError, isParseLimit, parseFailureAnalysisError, parseLimitConstraint } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ArtifactReaderFailure, ArtifactResourceScope, ZIP_READER_OPTIONS, accountZipMemberRegion, artifactFilePrimaryFacts, assertArtifactReadActive, decodeZipEntryText, init_ArtifactFileOperation, init_ArtifactOperationFailure, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_ZipArtifactReader, init_readStableArtifact, init_resources, init_zipMemberRegion, projectArtifactCloseFailure, projectOwnedArtifactIdentityFailure, projectOwnedArtifactInputFailure, projectSelectedArtifactFileFailure, projectStableArtifactFailure, readStableArtifact, translateArtifactFailure, typedZipFailure, zipEntryNameLimitations, zipEntryPath, zipListingCoverage } from "./resources-B3P64jvH.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { hasZipSignature, init_zipPackageFormat } from "./canonicalOrdering-C7Yzy62j.js";
import { contractNamed, deliverWithService, init_contractCliDescription, init_contractCommand, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { callerAnalysisParameters, init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { init_recordedTransportUrl, redactRecordedTransportUrl } from "./browserObservation-BVcDYwHI.js";
import { NUGET_NUPKG_FORMAT, NUGET_NUPKG_LIMIT_MAXIMA, init_nupkg, inspectNugetNupkgInputSchema, nugetNupkgEntryRole, nugetNupkgLogicalPath, nugetNupkgSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { decodeXmlPlistText, init_propertyListXmlText } from "./propertyListXmlText-8rMzCv3L.js";
import { init_xmlDocument, parseXmlDocument } from "./xmlDocument-DuM0TF5n.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { NUGET_NUPKG_TOOL_CONTRACTS, init_nupkgToolContracts } from "./nupkgToolContracts-BZjZoR7l.js";
import { Uint8ArrayReader, Uint8ArrayWriter, ZipReader } from "@zip.js/zip.js";

//#region dist/application/nuget/NugetNupkgService.js
var OPERATION$1, NugetNupkgService, validReport;
function init_NugetNupkgService() {
	return (init_NugetNupkgService = __esmMin((() => {
		init_analysisErrorCore();
		init_evidence();
		init_nupkg();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		OPERATION$1 = "inspect_nuget_nupkg";
		NugetNupkgService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close();
			}
			async inspect(rawInput, options) {
				const selectedParameters = callerAnalysisParameters(rawInput);
				const input = parseAnalysisInput(OPERATION$1, rawInput, inspectNugetNupkgInputSchema, options?.signal);
				if (!input.ok) return input;
				const result = await this.provider.inspect(input.value, options);
				if (!result.ok) return result;
				const report = nugetNupkgSchema.safeParse(result.value);
				if (!report.success || report.data.artifact.path !== input.value.path || !validReport(report.data, input.value)) return err(new AnalysisOutputError(OPERATION$1, "NuGet nupkg provider returned malformed output or changed artifact identity."));
				const value = report.data;
				return completeProviderEvidence(createEvidence({
					path: value.artifact.path,
					format: "file",
					sha256: value.artifact.sha256
				}, this.provider.identity, {
					operation: OPERATION$1,
					parameters: selectedParameters(input.value),
					result: value,
					confidence: "observed",
					limitations: value.limitations,
					locations: [{
						kind: "artifact-path",
						path: value.artifact.path
					}]
				}), options?.signal);
			}
		};
		validReport = (report, input) => {
			if (report.artifact.bytes > input.max_file_bytes || report.coverage.entries > input.max_entries || report.contents.length > input.max_entries || report.coverage.examined_nuspec_bytes > input.max_nuspec_bytes) return false;
			if (report.nuspec?.bytes !== null && report.nuspec !== null && report.nuspec.bytes > input.max_nuspec_bytes) return false;
			return report.coverage.entries === report.contents.length;
		};
	})))();
}

//#endregion
//#region dist/nuget/NugetNupkgProviderIdentity.js
var NUGET_NUPKG_PROVIDER_IDENTITY;
function init_NugetNupkgProviderIdentity() {
	return (init_NugetNupkgProviderIdentity = __esmMin((() => {
		NUGET_NUPKG_PROVIDER_IDENTITY = {
			id: "rea-nuget-nupkg",
			name: "REA NuGet nupkg reader",
			version: "1"
		};
	})))();
}

//#endregion
//#region dist/nuget/NugetNupkgParser.js
var NUPKG_LIMITATIONS, BASE_LIMITATIONS, isElement, childElements, childrenNamed, firstNamed, nonempty, attribute, elementText, zipSize, indexedMetadataText, asFileEntry, wrapZipFailure, BoundedUint8ArrayWriter, readMemberBytes, resolvePackageTarget, targetLabel, OPC_RELATIONSHIP_NAMESPACE, NUGET_MANIFEST_RELATIONSHIP, opcManifestTargets, parseBooleanAttribute, parseDependencies, parseNuspecDocument, distinctTargetMatches, opcPartNameKey, findNuspec, parseNugetNupkg;
function init_NugetNupkgParser() {
	return (init_NugetNupkgParser = __esmMin((() => {
		init_zipMemberRegion();
		init_parseFailure();
		init_resources();
		init_xmlDocument();
		init_propertyListXmlText();
		init_zipPackageFormat();
		init_nupkg();
		init_recordedTransportUrl();
		init_budget();
		NUPKG_LIMITATIONS = {
			memberRoles: "Member roles are derived from NuGet folder conventions in the ZIP names; they are not restore-time asset selection.",
			noNuspec: "No .nuspec was selected.",
			ambiguousRootNuspec: "Multiple root .nuspec members are present; identity was not decoded.",
			malformedNuspec: "The selected .nuspec is not well-formed XML.",
			ungroupedBesideGroups: (count) => `${String(count)} ungrouped <dependency> element(s) beside <group> elements were omitted: NuGet's restore-time NuspecReader reads only the groups when any group is present, and nuget pack refuses this mix.`
		};
		BASE_LIMITATIONS = [
			"This workflow reads the .nupkg ZIP and .nuspec metadata without restoring, executing, or contacting a NuGet feed.",
			NUPKG_LIMITATIONS.memberRoles,
			"Dependency version ranges are recorded as spelled in the .nuspec; restore results are unknown.",
			"Directory ZIP markers are omitted from contents; only file members are listed."
		];
		isElement = (node) => node !== null && node.nodeType === 1;
		childElements = (element) => {
			const children = [];
			for (let child = element.firstChild; child !== null; child = child.nextSibling) if (isElement(child)) children.push(child);
			return children;
		};
		childrenNamed = (element, local, namespace) => childElements(element).filter((child) => child.localName === local && (namespace === undefined || (child.namespaceURI ?? "") === namespace));
		firstNamed = (element, local, namespace) => childrenNamed(element, local, namespace)[0];
		nonempty = (value) => {
			if (value === null || value === undefined) return null;
			const trimmed = value.trim();
			return trimmed === "" ? null : trimmed;
		};
		attribute = (element, name) => nonempty(element.getAttribute(name));
		elementText = (element) => {
			const parts = [];
			for (let child = element.firstChild; child !== null; child = child.nextSibling) if (child.nodeType === 3 || child.nodeType === 4) parts.push(child.nodeValue ?? "");
			return nonempty(parts.join(""));
		};
		zipSize = (value) => typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : null;
		indexedMetadataText = (metadata, name) => {
			for (const child of childElements(metadata)) {
				if (child.localName?.toLowerCase() !== name || childElements(child).length > 0) continue;
				const text = child.textContent ?? "";
				if (!text) continue;
				if (/[^\t\r\n ]/u.test(text)) return nonempty(text);
				if (Array.from(child.childNodes).some((node) => node.nodeType === 4 && node.nodeValue)) return null;
				for (let scope = child; isElement(scope); scope = scope.parentNode) {
					const space = scope.getAttribute("xml:space");
					if (space === "preserve") return null;
					if (space === "default") break;
				}
			}
			return null;
		};
		asFileEntry = (entry) => !entry.directory && "getData" in entry;
		wrapZipFailure = (cause, compressionMethod) => {
			if (cause instanceof ArtifactReaderFailure || cause instanceof ParseFailureError) throw cause;
			const typed = typedZipFailure(cause, compressionMethod);
			if (typed instanceof ArtifactReaderFailure && typed.reason === "limit") throw typed;
			if (typed instanceof ArtifactReaderFailure && typed.reason === "unavailable") throw unsupportedInput(NUGET_NUPKG_FORMAT, `NuGet package ZIP uses an unsupported layout: ${typed.message}`, { cause: typed });
			if (typed instanceof ArtifactReaderFailure && typed.reason === "format") throw malformedInput(NUGET_NUPKG_FORMAT, typed.message, { cause: typed });
			throw cause;
		};
		BoundedUint8ArrayWriter = class extends Uint8ArrayWriter {
			exceeded;
			#budget;
			constructor(maximum, exceeded) {
				super();
				this.exceeded = exceeded;
				this.#budget = new Budget(maximum);
			}
			async init(size) {
				if (size !== undefined && size > this.#budget.maximum) throw this.exceeded(size);
				await super.init?.(size);
			}
			async writeUint8Array(array) {
				this.#budget.charge(array.length, () => this.exceeded(this.#budget.used + array.length));
				await super.writeUint8Array(array);
			}
		};
		readMemberBytes = async (entry, signal, maximum, label) => {
			const exceeded = (required) => decodeLimit(NUGET_NUPKG_FORMAT, `${label} exceeds the ${String(maximum)}-byte budget.`, {
				name: "max_nuspec_bytes",
				maximum,
				required
			});
			const declared = zipSize(entry.uncompressedSize);
			if (declared !== null && declared > maximum) throw exceeded(declared);
			try {
				return await entry.getData(new BoundedUint8ArrayWriter(maximum, exceeded), {
					checkSignature: true,
					...signal === undefined ? {} : { signal }
				});
			} catch (cause) {
				return wrapZipFailure(cause, entry.compressionMethod);
			}
		};
		resolvePackageTarget = (target) => {
			const segments = [];
			for (const segment of target.replaceAll("\\", "/").split("/")) {
				if (segment === "" || segment === ".") continue;
				if (segment === "..") {
					if (segments.pop() === undefined) return undefined;
					continue;
				}
				segments.push(segment);
			}
			return segments.length === 0 ? undefined : segments.join("/");
		};
		targetLabel = (display) => display === null ? "[URL withheld]" : JSON.stringify(display);
		OPC_RELATIONSHIP_NAMESPACE = "http://schemas.openxmlformats.org/package/2006/relationships";
		NUGET_MANIFEST_RELATIONSHIP = "http://schemas.microsoft.com/packaging/2010/07/manifest";
		opcManifestTargets = (xml, limitations) => {
			const parsed = parseXmlDocument(xml, {
				doctype: "reject",
				lineEndings: "normalize"
			});
			if (!parsed.ok) {
				limitations.push(parsed.error.kind === "unsupported" ? "OPC relationships declare a document type, which is unsupported; the .nuspec was selected by ZIP name when possible." : "OPC relationships are not well-formed XML; the .nuspec was selected by ZIP name when possible.");
				return [];
			}
			const root = parsed.value.documentElement;
			if (!isElement(root) || root.localName !== "Relationships" || root.namespaceURI !== OPC_RELATIONSHIP_NAMESPACE) {
				limitations.push("OPC relationships root is not Relationships in the OPC namespace; the .nuspec was selected by ZIP name when possible.");
				return [];
			}
			const targets = new Map();
			for (const relationship of childrenNamed(root, "Relationship")) {
				if (relationship.namespaceURI !== OPC_RELATIONSHIP_NAMESPACE) continue;
				const type = attribute(relationship, "Type");
				if (type !== NUGET_MANIFEST_RELATIONSHIP) continue;
				const target = attribute(relationship, "Target");
				if (target === null) continue;
				const displayedTarget = redactRecordedTransportUrl(target).url;
				const mode = relationship.getAttributeNS(null, "TargetMode");
				if (mode === "External") {
					limitations.push(`OPC manifest relationship Target ${targetLabel(displayedTarget)} is external and was not followed.`);
					continue;
				}
				if (mode !== null && mode !== "Internal") {
					limitations.push(`OPC manifest relationship Target ${targetLabel(displayedTarget)} has an invalid TargetMode and was not followed.`);
					continue;
				}
				if (/^[a-z][a-z0-9+.-]*:/iu.test(target) || target.startsWith("//")) {
					limitations.push(`OPC manifest relationship Target ${targetLabel(displayedTarget)} has a URI scheme or authority and was not followed.`);
					continue;
				}
				const logical = resolvePackageTarget(target);
				if (logical === undefined) {
					limitations.push(`OPC manifest relationship Target ${targetLabel(displayedTarget)} leaves the package and was not followed.`);
					continue;
				}
				if (!targets.has(logical)) targets.set(logical, {
					lookup: logical,
					display: displayedTarget
				});
			}
			return [...targets.values()];
		};
		parseBooleanAttribute = (value) => {
			if (value === null) return null;
			const folded = value.toLowerCase();
			if (folded === "true") return true;
			if (folded === "false") return false;
			return null;
		};
		parseDependencies = (metadata, namespace, limitations) => {
			const containers = childrenNamed(metadata, "dependencies", namespace);
			const groups = containers.flatMap((container) => childrenNamed(container, "group", namespace));
			const ungrouped = containers.flatMap((container) => childrenNamed(container, "dependency", namespace));
			const readDependency = (element) => ({
				id: attribute(element, "id"),
				version: attribute(element, "version"),
				include: attribute(element, "include"),
				exclude: attribute(element, "exclude"),
				development_dependency: parseBooleanAttribute(attribute(element, "developmentDependency"))
			});
			const fromGroup = (element) => ({
				target_framework: attribute(element, "targetFramework"),
				dependencies: childrenNamed(element, "dependency", namespace).map(readDependency)
			});
			if (groups.length > 0) {
				if (ungrouped.length > 0) limitations.push(NUPKG_LIMITATIONS.ungroupedBesideGroups(ungrouped.length));
				return groups.map(fromGroup);
			}
			if (ungrouped.length === 0) return [];
			return [{
				target_framework: null,
				dependencies: ungrouped.map(readDependency)
			}];
		};
		parseNuspecDocument = (xml, limitations) => {
			const empty = {
				identity: null,
				license: null,
				repository: null,
				dependency_groups: []
			};
			const parsed = parseXmlDocument(xml, {
				doctype: "reject",
				lineEndings: "normalize"
			});
			if (!parsed.ok) {
				limitations.push(parsed.error.kind === "unsupported" ? "The selected .nuspec declares a document type, which is unsupported." : NUPKG_LIMITATIONS.malformedNuspec);
				return empty;
			}
			const root = parsed.value.documentElement;
			if (!isElement(root) || root.localName !== "package") {
				limitations.push("The selected .nuspec root element is not package.");
				return empty;
			}
			const metadata = firstNamed(root, "metadata");
			if (metadata === undefined) {
				limitations.push("The selected .nuspec has no metadata element.");
				return empty;
			}
			const metadataNamespace = metadata.lookupNamespaceURI("") ?? "";
			const metadataText = (local) => {
				const element = firstNamed(metadata, local, metadataNamespace);
				return element === undefined ? null : elementText(element);
			};
			const licenseElement = firstNamed(metadata, "license", metadataNamespace);
			const licenseType = licenseElement ? attribute(licenseElement, "type")?.toLowerCase() : undefined;
			const repositoryElement = firstNamed(metadata, "repository", metadataNamespace);
			return {
				identity: {
					id: metadataText("id"),
					version: metadataText("version"),
					authors: indexedMetadataText(metadata, "authors"),
					description: indexedMetadataText(metadata, "description")
				},
				license: licenseElement === undefined ? null : {
					type: licenseType === "expression" || licenseType === "file" ? licenseType : null,
					value: elementText(licenseElement)
				},
				repository: repositoryElement === undefined ? null : {
					type: attribute(repositoryElement, "type"),
					...redactRecordedTransportUrl(attribute(repositoryElement, "url")),
					commit: attribute(repositoryElement, "commit"),
					branch: attribute(repositoryElement, "branch")
				},
				dependency_groups: parseDependencies(metadata, metadataNamespace, limitations)
			};
		};
		distinctTargetMatches = (targets, match) => {
			const found = new Set();
			for (const target of targets) for (const member of match(target)) {
				found.add(member);
				if (found.size > 1) return [...found];
			}
			return [...found];
		};
		opcPartNameKey = (name) => name.replace(/[A-Z]/gu, (letter) => letter.toLowerCase());
		findNuspec = (files, relsXml, limitations) => {
			const partNames = new Map();
			for (const file of files) {
				const key = opcPartNameKey(file.name);
				const members = partNames.get(key);
				if (members === undefined) partNames.set(key, [file]);
				else members.push(file);
			}
			if (relsXml !== undefined) {
				const targets = opcManifestTargets(relsXml, limitations);
				const resolved = distinctTargetMatches(targets.map((target) => target.lookup), (target) => partNames.get(opcPartNameKey(target)) ?? []);
				if (resolved.length > 1) {
					limitations.push("OPC manifest relationships resolve to more than one .nuspec ZIP member; identity was not decoded.");
					return {
						member: undefined,
						source: undefined
					};
				}
				if (resolved.length === 1) {
					const member = resolved[0];
					if (!targets.some((target) => target.lookup === member.name)) limitations.push("The OPC manifest relationship matched a .nuspec member by case-insensitive ZIP name.");
					return {
						member,
						source: "opc-relationship"
					};
				}
				if (targets.length === 1) limitations.push(`OPC manifest relationship Target ${targetLabel(targets[0].display)} is missing from the package; identity was not decoded from that path.`);
			}
			const rootNuspecs = files.filter((file) => !file.name.includes("/") && file.name.toLowerCase().endsWith(".nuspec"));
			if (rootNuspecs.length > 1) {
				limitations.push(NUPKG_LIMITATIONS.ambiguousRootNuspec);
				return {
					member: undefined,
					source: undefined
				};
			}
			if (rootNuspecs.length === 1) return {
				member: rootNuspecs[0],
				source: "root-nuspec"
			};
			limitations.push(NUPKG_LIMITATIONS.noNuspec);
			return {
				member: undefined,
				source: undefined
			};
		};
		parseNugetNupkg = async (bytes, artifact, input, signal) => {
			if (bytes.length !== artifact.bytes) throw malformedInput(NUGET_NUPKG_FORMAT, "Selected artifact length disagrees with the retained bytes.");
			if (!hasZipSignature(bytes)) throw malformedInput(NUGET_NUPKG_FORMAT, "Selected file is not a ZIP archive (NuGet .nupkg).");
			const reader = new ZipReader(new Uint8ArrayReader(bytes), ZIP_READER_OPTIONS);
			const limitations = [...BASE_LIMITATIONS];
			const zipAbort = signal === undefined ? undefined : new AbortController();
			const zipSignal = zipAbort?.signal;
			const onAbort = () => zipAbort?.abort(new ArtifactReaderFailure("cancelled", "Artifact read cancelled", { cause: signal?.reason }));
			if (signal?.aborted) onAbort();
			else signal?.addEventListener("abort", onAbort, { once: true });
			try {
				assertArtifactReadActive(signal);
				const entries = [];
				try {
					for await (const entry of reader.getEntriesGenerator({ decodeText: decodeZipEntryText })) {
						assertArtifactReadActive(signal);
						if (entries.length >= input.max_entries) throw decodeLimit(NUGET_NUPKG_FORMAT, `NuGet package ZIP exceeds the ${String(input.max_entries)}-entry budget.`, {
							name: "max_entries",
							maximum: input.max_entries,
							required: entries.length + 1
						});
						entries.push(entry);
					}
				} catch (cause) {
					return wrapZipFailure(cause);
				}
				assertArtifactReadActive(signal);
				const directoryOffset = reader.directoryOffset;
				const listing = zipListingCoverage(directoryOffset === undefined ? undefined : await accountZipMemberRegion(entries.map((entry) => ({
					offset: entry.offset,
					compressedSize: entry.compressedSize,
					uncompressedSize: entry.uncompressedSize,
					crc32: entry.crc32,
					zip64: entry.zip64,
					dataDescriptor: entry.bitFlag?.dataDescriptor ?? false
				})), directoryOffset, (at, length) => Promise.resolve(bytes.subarray(at, at + length))));
				limitations.push(...listing.limitations);
				const files = [];
				const contents = [];
				for (const entry of entries) {
					if (entry.directory) continue;
					if (!asFileEntry(entry)) continue;
					const sourceName = zipEntryPath(entry);
					const name = nugetNupkgLogicalPath(sourceName);
					if (name === "") continue;
					for (const limitation of zipEntryNameLimitations(entry)) limitations.push(`ZIP member ${JSON.stringify(sourceName)}: ${limitation}`);
					files.push({
						entry,
						name
					});
					contents.push({
						name: sourceName,
						path: name,
						uncompressed_size: zipSize(entry.uncompressedSize),
						compressed_size: zipSize(entry.compressedSize),
						role: nugetNupkgEntryRole(name),
						encrypted: entry.encrypted === true
					});
				}
				const relsMembers = files.filter((file) => opcPartNameKey(file.name) === "_rels/.rels");
				if (relsMembers.length > 1) limitations.push("More than one ZIP member is the OPC relationships part; relationships were not followed and the .nuspec was selected by ZIP name when possible.");
				const rels = relsMembers.length === 1 ? relsMembers[0] : undefined;
				let relsXml;
				if (rels !== undefined) {
					if (rels.entry.encrypted) limitations.push("OPC relationships member is encrypted and was not extracted.");
					else {
						const relsBytes = await readMemberBytes(rels.entry, zipSignal, input.max_nuspec_bytes, "OPC relationships member");
						try {
							relsXml = decodeXmlPlistText(relsBytes);
						} catch {
							limitations.push("OPC relationships member is not valid UTF-8 or BOM-marked UTF-16 XML text; the .nuspec was selected by ZIP name when possible.");
						}
					}
				}
				const selected = findNuspec(files, relsXml, limitations);
				if (selected.member === undefined || selected.source === undefined) return {
					artifact: {
						path: artifact.path,
						sha256: artifact.sha256,
						bytes: artifact.bytes
					},
					identity: null,
					license: null,
					repository: null,
					dependency_groups: [],
					contents,
					nuspec: null,
					coverage: {
						status: listing.status,
						entries: contents.length,
						examined_nuspec_bytes: 0
					},
					limitations
				};
				if (selected.member.entry.encrypted) {
					limitations.push(`Selected .nuspec ${JSON.stringify(selected.member.name)} is encrypted and was not extracted.`);
					return {
						artifact: {
							path: artifact.path,
							sha256: artifact.sha256,
							bytes: artifact.bytes
						},
						identity: null,
						license: null,
						repository: null,
						dependency_groups: [],
						contents,
						nuspec: {
							path: selected.member.name,
							bytes: null,
							source: selected.source
						},
						coverage: {
							status: listing.status,
							entries: contents.length,
							examined_nuspec_bytes: 0
						},
						limitations
					};
				}
				const nuspecBytes = await readMemberBytes(selected.member.entry, zipSignal, input.max_nuspec_bytes, "Selected .nuspec");
				let xml;
				try {
					xml = decodeXmlPlistText(nuspecBytes);
				} catch {
					limitations.push("The selected .nuspec is not valid UTF-8 or BOM-marked UTF-16 XML text.");
					return {
						artifact: {
							path: artifact.path,
							sha256: artifact.sha256,
							bytes: artifact.bytes
						},
						identity: null,
						license: null,
						repository: null,
						dependency_groups: [],
						contents,
						nuspec: {
							path: selected.member.name,
							bytes: nuspecBytes.length,
							source: selected.source
						},
						coverage: {
							status: listing.status,
							entries: contents.length,
							examined_nuspec_bytes: nuspecBytes.length
						},
						limitations
					};
				}
				const decoded = parseNuspecDocument(xml, limitations);
				if (decoded.identity !== null && decoded.identity.id === null && decoded.identity.version === null && decoded.identity.authors === null && decoded.identity.description === null) limitations.push("The selected .nuspec metadata did not include id, version, authors, or description.");
				return {
					artifact: {
						path: artifact.path,
						sha256: artifact.sha256,
						bytes: artifact.bytes
					},
					...decoded,
					contents,
					nuspec: {
						path: selected.member.name,
						bytes: nuspecBytes.length,
						source: selected.source
					},
					coverage: {
						status: listing.status,
						entries: contents.length,
						examined_nuspec_bytes: nuspecBytes.length
					},
					limitations
				};
			} finally {
				signal?.removeEventListener("abort", onAbort);
				await reader.close().catch(() => undefined);
			}
		};
	})))();
}

//#endregion
//#region dist/nuget/NugetNupkgProvider.js
var OPERATION, budgetRecovery, nupkgFailurePrimary, nupkgFailure, NugetNupkgProvider;
function init_NugetNupkgProvider() {
	return (init_NugetNupkgProvider = __esmMin((() => {
		init_NugetNupkgProviderIdentity();
		init_resources();
		init_parseFailureAnalysisError();
		init_parseFailure();
		init_analysisErrorCore();
		init_artifactOperationError();
		init_nupkg();
		init_result();
		init_errorMessage();
		init_NugetNupkgParser();
		OPERATION = "inspect_nuget_nupkg";
		budgetRecovery = (parameter, selected) => selected >= NUGET_NUPKG_LIMIT_MAXIMA[parameter] ? `${parameter} is at this operation's maximum of ${String(NUGET_NUPKG_LIMIT_MAXIMA[parameter])}; select a complete artifact within that bound.` : `Raise ${parameter} above ${String(selected)}, up to ${String(NUGET_NUPKG_LIMIT_MAXIMA[parameter])}, or select a smaller artifact. The budget applies on the next call; repeating the unchanged request does not raise it.`;
		nupkgFailurePrimary = (facts, input) => {
			const { cause, origin } = facts;
			const identityFailure = projectOwnedArtifactIdentityFailure(facts, OPERATION, input.path);
			if (identityFailure !== undefined) return identityFailure;
			if (isParseLimit(cause, "nuget-nupkg")) {
				const parameter = Object.keys(NUGET_NUPKG_LIMIT_MAXIMA).find((name) => name === cause.failure.limit.name);
				return parseLimitConstraint(OPERATION, cause.failure.limit.name === "max_entries" ? "capacity" : "memory", cause, {
					path: input.path,
					retryable: false,
					...parameter === undefined ? {} : { remediationAction: budgetRecovery(parameter, cause.failure.limit.maximum) }
				});
			}
			const formatFailure = parseFailureAnalysisError(OPERATION, input.path, cause);
			if (formatFailure !== undefined) return formatFailure;
			const inputFailure = projectOwnedArtifactInputFailure(facts, OPERATION, input.path);
			if (inputFailure !== undefined) return inputFailure;
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure) {
				if (cause.reason === "limit" && cause.fixedAllowance !== undefined) return fixedCeilingConstraint(OPERATION, cause.boundary ?? "memory", cause.message, cause.fixedAllowance, { cause });
				if (cause.reason === "limit" && cause.boundary === "file-size") return parseLimitConstraint(OPERATION, "file-size", decodeLimit(NUGET_NUPKG_FORMAT, cause.message, {
					name: "max_file_bytes",
					maximum: input.max_file_bytes
				}, { cause }), {
					retryable: false,
					remediationAction: budgetRecovery("max_file_bytes", input.max_file_bytes)
				});
				return translateArtifactFailure(OPERATION, cause);
			}
			const fileFailure = projectSelectedArtifactFileFailure(cause, OPERATION, input.path, "NuGet package");
			if (fileFailure !== undefined) return fileFailure;
			return new ArtifactOperationError(OPERATION, "io", undefined, errorMessage(cause), { cause });
		};
		nupkgFailure = (cause, input, snapshot) => projectStableArtifactFailure(cause, nupkgFailurePrimary(artifactFilePrimaryFacts(cause), input), input.path, NUGET_NUPKG_PROVIDER_IDENTITY.id, OPERATION, snapshot);
		NugetNupkgProvider = class {
			identity = NUGET_NUPKG_PROVIDER_IDENTITY;
			#resources = new ArtifactResourceScope();
			async close() {
				try {
					await this.#resources.close();
				} catch (cause) {
					throw projectArtifactCloseFailure(cause, NUGET_NUPKG_PROVIDER_IDENTITY.id, OPERATION);
				}
			}
			async inspect(input, options) {
				let snapshot;
				try {
					return await this.#resources.run(async () => {
						snapshot = await readStableArtifact(input.path, input.max_file_bytes, options?.signal, undefined, this.#resources);
						return ok(await parseNugetNupkg(snapshot.bytes, {
							path: input.path,
							sha256: snapshot.sha256,
							bytes: snapshot.bytes.length
						}, input, options?.signal));
					});
				} catch (cause) {
					return err(nupkgFailure(cause, input, snapshot));
				}
			}
		};
	})))();
}

//#endregion
//#region dist/composition/nugetNupkg.js
var createNugetNupkgService;
function init_nugetNupkg() {
	return (init_nugetNupkg = __esmMin((() => {
		init_NugetNupkgService();
		init_NugetNupkgProvider();
		createNugetNupkgService = () => {
			const provider = new NugetNupkgProvider();
			return new NugetNupkgService(provider);
		};
	})))();
}

//#endregion
//#region dist/cli/nugetNupkgCommands.js
var nugetNupkgCommands_exports = /* @__PURE__ */ __exportAll({ registerNugetNupkgCommands: () => registerNugetNupkgCommands });
var registerNugetNupkgCommands;
function init_nugetNupkgCommands() {
	return (init_nugetNupkgCommands = __esmMin((() => {
		init_nugetNupkg();
		init_nupkgToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		registerNugetNupkgCommands = (cli, logger) => {
			registerContractCommand(cli, logger, contractNamed(NUGET_NUPKG_TOOL_CONTRACTS, "inspect_nuget_nupkg"), {
				description: "Inspect NuGet .nupkg identity, dependency groups and ZIP contents without restore or network",
				positionals: ["path"],
				callerPaths: ["path"],
				evidenceDelivery: true,
				fields: { path: { description: "Local NuGet .nupkg package" } }
			}, deliverWithService(createNugetNupkgService, "rea-nuget-nupkg"));
		};
	})))();
}

//#endregion
export { init_nugetNupkgCommands, nugetNupkgCommands_exports };