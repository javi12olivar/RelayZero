import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisOutputError, ArtifactOperationError, decodeLimit, errorMessage, fixedAllowanceOptions, init_analysisErrorCore, init_artifactOperationError, init_errorMessage, init_fixedAllowanceRemediation, init_isRecord, init_parseFailure, isRecord, malformedInput, unsupportedInput } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_parseFailureAnalysisError, init_strictUtf8, isParseLimit, parseFailureAnalysisError, parseLimitConstraint } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ArtifactReaderFailure, ArtifactResourceScope, artifactFilePrimaryFacts, init_ArtifactFileOperation, init_ArtifactOperationFailure, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_readStableArtifact, init_resources, projectArtifactCloseFailure, projectOwnedArtifactIdentityFailure, projectOwnedArtifactInputFailure, projectSelectedArtifactFileFailure, projectStableArtifactFailure, readStableArtifact, translateArtifactFailure } from "./resources-B3P64jvH.js";
import { init_jsonDuplicateMember, parseJsonWithDuplicatePolicy } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, inspectWithService, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { callerAnalysisParameters, init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { init_recordedTransportUrl, redactRecordedTransportUrl } from "./browserObservation-BVcDYwHI.js";
import { countXmlNodes, init_xmlDocument, opensLikeXml, parseXmlDocument } from "./xmlDocument-DuM0TF5n.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { MAVEN_GRADLE_METADATA_DEPENDENCY_ROWS, MAVEN_GRADLE_METADATA_EXCLUSIONS, MAVEN_GRADLE_METADATA_REPEATED_VARIANT_NAME_CHARS, MAVEN_GRADLE_METADATA_TOOL_CONTRACTS, MAVEN_GRADLE_METADATA_UNRESOLVED_RECORDS, MAVEN_GRADLE_METADATA_VARIANTS, MAVEN_GRADLE_METADATA_XML_NODES, MAX_INSPECT_MAVEN_GRADLE_METADATA_FILE_BYTES, init_mavenGradleMetadata as init_mavenGradleMetadata$1, init_mavenGradleMetadataToolContracts, inspectMavenGradleMetadataInputSchema, mavenGradleMetadataSchema, mavenPropertyOccurrences, requestedVersionKind } from "./mavenGradleMetadataToolContracts-JP_1Nbrs.js";

//#region dist/application/java/MavenGradleMetadataService.js
var OPERATION$1, MavenGradleMetadataService, validReport;
function init_MavenGradleMetadataService() {
	return (init_MavenGradleMetadataService = __esmMin((() => {
		init_analysisErrorCore();
		init_evidence();
		init_mavenGradleMetadata$1();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		OPERATION$1 = "inspect_maven_gradle_metadata";
		MavenGradleMetadataService = class {
			provider;
			constructor(provider) {
				this.provider = provider;
			}
			close() {
				return this.provider.close();
			}
			async inspect(rawInput, options) {
				const selectedParameters = callerAnalysisParameters(rawInput);
				const input = parseAnalysisInput(OPERATION$1, rawInput, inspectMavenGradleMetadataInputSchema, options?.signal);
				if (!input.ok) return input;
				const result = await this.provider.inspect(input.value, options);
				if (!result.ok) return result;
				const report = mavenGradleMetadataSchema.safeParse(result.value);
				if (!report.success || report.data.artifact.path !== input.value.path || !validReport(report.data, input.value)) return err(new AnalysisOutputError(OPERATION$1, "Maven/Gradle metadata provider returned malformed output or changed artifact identity."));
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
					}, {
						kind: "file-offset-range",
						start: 0,
						end: value.artifact.bytes
					}]
				}), options?.signal);
			}
		};
		validReport = (report, input) => {
			if (report.artifact.bytes > input.max_file_bytes) return false;
			if (report.coverage.examined_bytes !== report.artifact.bytes) return false;
			if (report.format === "maven-pom" && report.gradle !== null) return false;
			if (report.format === "gradle-module" && report.parent !== null) return false;
			return true;
		};
	})))();
}

//#endregion
//#region dist/java/MavenGradleMetadata.errors.js
var MAVEN_GRADLE_METADATA_FORMAT, REPORT_REFUSALS, metadataReportLimit;
function init_MavenGradleMetadata_errors() {
	return (init_MavenGradleMetadata_errors = __esmMin((() => {
		init_parseFailure();
		MAVEN_GRADLE_METADATA_FORMAT = "maven-gradle-metadata";
		REPORT_REFUSALS = {
			repeated_variant_name_chars: (required, limit) => `Gradle module metadata would repeat ${String(required)} characters of variant names across its dependency rows, above the ${String(limit)}-character report allowance.`,
			dependency_rows: (required, limit) => `Metadata declares ${String(required)} dependency and constraint rows, above the ${String(limit)}-row report allowance.`,
			variants: (required, limit) => `Gradle module metadata declares ${String(required)} variants, above the ${String(limit)}-variant report allowance.`,
			exclusions: (required, limit) => `Metadata declares ${String(required)} dependency exclusions, above the ${String(limit)}-exclusion report allowance.`,
			unresolved_records: (required, limit) => `Metadata needs at least ${String(required)} unresolved reference and coordinate records, above the ${String(limit)}-record report allowance.`,
			xml_nodes: (required, limit) => `Maven POM holds more than ${String(limit)} XML nodes (at least ${String(required)} counted), above the ${String(limit)}-node allowance for its document tree.`
		};
		metadataReportLimit = (allowance, maximum, required) => decodeLimit(MAVEN_GRADLE_METADATA_FORMAT, REPORT_REFUSALS[allowance](required, maximum), {
			name: allowance,
			maximum,
			required
		});
	})))();
}

//#endregion
//#region dist/java/MavenGradleMetadataProviderIdentity.js
var MAVEN_GRADLE_METADATA_PROVIDER_IDENTITY;
function init_MavenGradleMetadataProviderIdentity() {
	return (init_MavenGradleMetadataProviderIdentity = __esmMin((() => {
		MAVEN_GRADLE_METADATA_PROVIDER_IDENTITY = {
			id: "rea-maven-gradle-metadata",
			name: "REA Maven POM and Gradle module metadata reader",
			version: "1"
		};
	})))();
}

//#endregion
//#region dist/java/MavenGradleUnresolvedCollector.js
var MavenGradleUnresolvedCollector;
function init_MavenGradleUnresolvedCollector() {
	return (init_MavenGradleUnresolvedCollector = __esmMin((() => {
		init_budget();
		init_mavenGradleMetadata$1();
		init_MavenGradleMetadata_errors();
		MavenGradleUnresolvedCollector = class {
			#records = [];
			#budget;
			constructor(maximum = MAVEN_GRADLE_METADATA_UNRESOLVED_RECORDS) {
				this.#budget = new Budget(maximum);
			}
			#reserve() {
				this.#budget.charge(1, () => metadataReportLimit("unresolved_records", this.#budget.maximum, this.#budget.used + 1));
			}
			properties(fields, owner, index) {
				for (const [field, value] of fields) {
					const seen = new Set();
					for (const reference of mavenPropertyOccurrences(value)) {
						if (seen.has(reference)) continue;
						this.#reserve();
						seen.add(reference);
						this.#records.push({
							kind: "property",
							reference,
							field,
							owner,
							index
						});
					}
				}
			}
			coordinates(coordinates, owner, index, parentPresent) {
				const fields = [
					["group_id", coordinates.group_id],
					["artifact_id", coordinates.artifact_id],
					["version", coordinates.version]
				];
				for (const [field, value] of fields) {
					if (value !== null) {
						this.properties([[field, value]], owner, index);
						continue;
					}
					const inherited = parentPresent && owner === "project" && field !== "artifact_id";
					this.#reserve();
					this.#records.push({
						kind: inherited ? "parent-coordinate" : "missing-coordinate",
						reference: inherited ? `parent.${field}` : `${owner}.${field}`,
						field,
						owner,
						index
					});
				}
			}
			/** Transfer the bounded records into the completed report. */
			finish() {
				return this.#records;
			}
		};
	})))();
}

//#endregion
//#region dist/java/MavenGradleMetadataParser.js
var BASE_LIMITATIONS, GRADLE_MODULE_METADATA_VERSION, isElement, childElements, childrenNamed, soleNamed, MAVEN_POM_NAMESPACE, isMavenProjectRoot, admit, nonempty, elementText, childText, textOf, boolOf, emptyGradleVersion, gradleArray, gradleObject, gradleObjects, gradleVersionOf, requestedFromGradle, mavenExclusionElements, parseMavenDependency, parsePom, parseGradleDependency, parseGradle, parseMavenGradleMetadata;
function init_MavenGradleMetadataParser() {
	return (init_MavenGradleMetadataParser = __esmMin((() => {
		init_MavenGradleUnresolvedCollector();
		init_budget();
		init_strictUtf8();
		init_jsonDuplicateMember();
		init_parseFailure();
		init_xmlDocument();
		init_mavenGradleMetadata$1();
		init_recordedTransportUrl();
		init_MavenGradleMetadata_errors();
		BASE_LIMITATIONS = ["This workflow reads a Maven POM or Gradle module-metadata document without running Maven or Gradle, resolving a dependency tree, or contacting a repository.", "Requested versions, ranges, and property spellings are recorded as written; interpolation and parent/BOM inheritance are not performed."];
		GRADLE_MODULE_METADATA_VERSION = "1.1";
		isElement = (node) => node !== null && node.nodeType === 1;
		childElements = (element) => {
			const children = [];
			for (let child = element.firstChild; child !== null; child = child.nextSibling) if (isElement(child)) children.push(child);
			return children;
		};
		childrenNamed = (element, ...names) => childElements(element).filter((child) => (child.namespaceURI ?? "") === (element.namespaceURI ?? "") && child.localName !== null && names.includes(child.localName));
		soleNamed = (element, local) => {
			const matches = childrenNamed(element, local);
			if (matches.length <= 1) return matches[0];
			throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, `Maven POM declares <${local}> more than once in one <${element.localName}>.`);
		};
		MAVEN_POM_NAMESPACE = "http://maven.apache.org/POM/4.0.0";
		isMavenProjectRoot = (root) => {
			if (!isElement(root) || root.localName !== "project") return false;
			if (root.namespaceURI === MAVEN_POM_NAMESPACE) return true;
			return (root.namespaceURI === null || root.namespaceURI === "") && childrenNamed(root, "modelVersion", "artifactId").length > 0;
		};
		admit = (allowance, limit, required) => {
			if (required > limit) throw metadataReportLimit(allowance, limit, required);
		};
		nonempty = (value) => {
			if (value === null || value === undefined) return null;
			const trimmed = value.trim();
			return trimmed === "" ? null : trimmed;
		};
		elementText = (element) => {
			const parts = [];
			for (let child = element.firstChild; child !== null; child = child.nextSibling) if (child.nodeType === 3 || child.nodeType === 4) parts.push(child.nodeValue ?? "");
			return parts.join("");
		};
		childText = (element, local) => {
			const child = soleNamed(element, local);
			if (child === undefined) return null;
			const text = elementText(child);
			let start = 0;
			let end = text.length;
			while (start < end && text.charCodeAt(start) <= 32) start += 1;
			while (end > start && text.charCodeAt(end - 1) <= 32) end -= 1;
			return start === end ? null : text.slice(start, end);
		};
		textOf = (value) => typeof value === "string" ? nonempty(value) : null;
		boolOf = (value) => {
			if (value === null) return null;
			const folded = value.toLowerCase();
			if (folded === "true") return true;
			if (folded === "false") return false;
			return null;
		};
		emptyGradleVersion = {
			requires: null,
			prefers: null,
			strictly: null,
			rejects: []
		};
		gradleArray = (value, field) => {
			if (value === undefined) return [];
			if (Array.isArray(value)) return value;
			throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, `Gradle module metadata ${field} is present but is not a JSON array.`);
		};
		gradleObject = (value, field) => {
			if (value === undefined) return null;
			if (isRecord(value)) return value;
			throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, `Gradle module metadata ${field} is present but is not a JSON object.`);
		};
		gradleObjects = (value, field) => gradleArray(value, field).map((entry, index) => {
			if (isRecord(entry)) return entry;
			throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, `Gradle module metadata ${field}[${String(index)}] is not a JSON object.`);
		});
		gradleVersionOf = (value) => {
			if (typeof value === "string") {
				const requires = nonempty(value);
				return requires === null ? { ...emptyGradleVersion } : {
					...emptyGradleVersion,
					requires
				};
			}
			if (value === undefined) return { ...emptyGradleVersion };
			if (!isRecord(value)) throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, "Gradle module metadata version is present but is neither a string nor a JSON object.");
			const versionText = (field) => {
				const entry = value[field];
				if (entry === undefined || typeof entry === "string") return textOf(entry);
				throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, `Gradle module metadata version.${field} is present but is not a string.`);
			};
			const rejects = gradleArray(value.rejects, "version.rejects").map((entry, index) => {
				const text = textOf(entry);
				if (text !== null) return text;
				throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, `Gradle module metadata version.rejects[${String(index)}] is not a non-empty string.`);
			});
			return {
				requires: versionText("requires"),
				prefers: versionText("prefers"),
				strictly: versionText("strictly"),
				rejects
			};
		};
		requestedFromGradle = (version) => {
			if (version === null) return null;
			return version.requires ?? version.strictly ?? version.prefers;
		};
		mavenExclusionElements = (element) => {
			const container = soleNamed(element, "exclusions");
			return container === undefined ? [] : childrenNamed(container, "exclusion");
		};
		parseMavenDependency = (element, origin, index, unresolved) => {
			const group_id = childText(element, "groupId");
			const artifact_id = childText(element, "artifactId");
			const version = childText(element, "version");
			const type = childText(element, "type");
			const scope = childText(element, "scope");
			const bom_import = type === "pom" && scope === "import";
			const exclusions = mavenExclusionElements(element).map((exclusion) => ({
				group_id: childText(exclusion, "groupId"),
				artifact_id: childText(exclusion, "artifactId")
			}));
			const owner = origin === "dependencies" ? "dependency" : "dependency_management";
			unresolved.coordinates({
				group_id,
				artifact_id,
				version
			}, owner, index, false);
			const optional_spelling = childText(element, "optional");
			const classifier = childText(element, "classifier");
			unresolved.properties([
				["scope", scope],
				["type", type],
				["classifier", classifier],
				["optional", optional_spelling]
			], owner, index);
			return {
				group_id,
				artifact_id,
				version,
				version_kind: requestedVersionKind(version, "maven-pom"),
				gradle_version: null,
				scope,
				type,
				optional: boolOf(optional_spelling),
				optional_spelling,
				classifier,
				exclusions,
				origin,
				variant: null,
				bom_import,
				platform: false
			};
		};
		parsePom = (xml, artifact) => {
			const limitations = [...BASE_LIMITATIONS];
			const nodes = countXmlNodes(xml, MAVEN_GRADLE_METADATA_XML_NODES);
			if (nodes > 1048576) throw metadataReportLimit("xml_nodes", MAVEN_GRADLE_METADATA_XML_NODES, nodes);
			const parsed = parseXmlDocument(xml, {
				doctype: "reject",
				lineEndings: "normalize"
			});
			if (!parsed.ok) throw parsed.error.kind === "unsupported" ? unsupportedInput(MAVEN_GRADLE_METADATA_FORMAT, "Maven POM declares a document type, which is unsupported.") : malformedInput(MAVEN_GRADLE_METADATA_FORMAT, "Maven POM is not well-formed XML.");
			const root = parsed.value.documentElement;
			if (!isMavenProjectRoot(root)) throw unsupportedInput(MAVEN_GRADLE_METADATA_FORMAT, "Selected XML document is not a Maven project POM.");
			const unresolved = new MavenGradleUnresolvedCollector();
			const parentElement = soleNamed(root, "parent");
			const parent = parentElement === undefined ? null : {
				group_id: childText(parentElement, "groupId"),
				artifact_id: childText(parentElement, "artifactId"),
				version: childText(parentElement, "version"),
				packaging: null,
				relative_path: childText(parentElement, "relativePath"),
				relative_path_declared: soleNamed(parentElement, "relativePath") !== undefined
			};
			if (parent !== null) unresolved.coordinates(parent, "parent", null, false);
			const coordinates = {
				group_id: childText(root, "groupId"),
				artifact_id: childText(root, "artifactId"),
				version: childText(root, "version"),
				packaging: childText(root, "packaging")
			};
			unresolved.coordinates(coordinates, "project", null, parent !== null);
			unresolved.properties([["packaging", coordinates.packaging]], "project", null);
			const propertiesElement = soleNamed(root, "properties");
			const properties = propertiesElement === undefined ? [] : childElements(propertiesElement).map((property) => {
				const { url: value, url_credentials_redacted: value_credentials_redacted } = redactRecordedTransportUrl(nonempty(elementText(property)));
				return {
					name: property.tagName,
					value,
					value_credentials_redacted
				};
			});
			const dependencyManagementElement = soleNamed(root, "dependencyManagement");
			const managedContainer = dependencyManagementElement ? soleNamed(dependencyManagementElement, "dependencies") : undefined;
			const managedElements = managedContainer === undefined ? [] : childrenNamed(managedContainer, "dependency");
			const dependenciesContainer = soleNamed(root, "dependencies");
			const dependencyElements = dependenciesContainer === undefined ? [] : childrenNamed(dependenciesContainer, "dependency");
			admit("dependency_rows", MAVEN_GRADLE_METADATA_DEPENDENCY_ROWS, managedElements.length + dependencyElements.length);
			admit("exclusions", MAVEN_GRADLE_METADATA_EXCLUSIONS, [...managedElements, ...dependencyElements].reduce((count, element) => count + mavenExclusionElements(element).length, 0));
			const dependency_management = managedElements.map((element, index) => parseMavenDependency(element, "dependencyManagement", index, unresolved));
			const dependencies = dependencyElements.map((element, index) => parseMavenDependency(element, "dependencies", index, unresolved));
			if (parent !== null) limitations.push("Parent coordinates are recorded as spelled; the parent POM was not read and inheritance was not applied.");
			if (soleNamed(root, "repositories") !== undefined) limitations.push("Declared repositories are recorded as unread; they were not contacted.");
			if (soleNamed(root, "profiles") !== undefined) limitations.push("POM profiles are present and were not activated; profile-scoped declarations remain unread.");
			if (coordinates.packaging === null) limitations.push("Packaging was not declared; Maven would default to jar, but that default was not applied.");
			return {
				artifact: {
					path: artifact.path,
					sha256: artifact.sha256,
					bytes: artifact.bytes
				},
				format: "maven-pom",
				coordinates,
				parent,
				properties,
				dependencies,
				dependency_management,
				gradle: null,
				unresolved: unresolved.finish(),
				coverage: {
					status: "complete",
					examined_bytes: artifact.bytes
				},
				limitations
			};
		};
		parseGradleDependency = (value, origin, variant, platform, index, unresolved) => {
			if (!isRecord(value)) throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, `Gradle ${origin === "variant-dependencies" ? "dependency" : "dependency constraint"} ${String(index)} is not a JSON object.`);
			const record = value;
			const group_id = textOf(record.group);
			const artifact_id = textOf(record.module);
			const gradle_version = gradleVersionOf(record.version);
			const version = requestedFromGradle(gradle_version);
			unresolved.coordinates({
				group_id,
				artifact_id,
				version
			}, "variant", index, false);
			const excludes = gradleObjects(record.excludes, "excludes");
			return {
				group_id,
				artifact_id,
				version,
				version_kind: requestedVersionKind(version, "gradle-module"),
				gradle_version,
				scope: null,
				type: null,
				optional: null,
				optional_spelling: null,
				classifier: null,
				exclusions: excludes.map((entry) => ({
					group_id: textOf(entry.group),
					artifact_id: textOf(entry.module)
				})),
				origin,
				variant,
				bom_import: false,
				platform
			};
		};
		parseGradle = (source, artifact) => {
			const json = parseJsonWithDuplicatePolicy(source, "reject");
			if (!json.ok) {
				if (json.duplicate !== undefined) throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, `Gradle module metadata declares a field more than once in one object (offset ${String(json.duplicate.offset)}).`);
				throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, "Gradle module metadata is not well-formed JSON.", { cause: json.cause });
			}
			const parsed = json.value;
			if (!isRecord(parsed)) throw unsupportedInput(MAVEN_GRADLE_METADATA_FORMAT, "Gradle module metadata root must be a JSON object.");
			const format_version = textOf(parsed.formatVersion);
			if (format_version === null) throw unsupportedInput(MAVEN_GRADLE_METADATA_FORMAT, "Selected JSON document is not Gradle module metadata (missing a string formatVersion).");
			if (json.firstObjectMember !== "formatVersion") throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, "Gradle module metadata formatVersion must be the first object member.");
			const component = gradleObject(parsed.component, "component");
			const variantsValue = parsed.variants;
			const knownVersion = parsed.formatVersion === GRADLE_MODULE_METADATA_VERSION;
			if (!knownVersion && component === null && !Array.isArray(variantsValue)) throw unsupportedInput(MAVEN_GRADLE_METADATA_FORMAT, "Unrecognized Gradle module metadata formatVersion without component or variants.");
			const limitations = [
				...BASE_LIMITATIONS,
				"Gradle variant attributes other than category and usage are not decoded.",
				"available-at coordinates are recorded as spelled; the named module file was not fetched."
			];
			if (!knownVersion) limitations.push(`Recognized fields in this unfamiliar format version were interpreted using Gradle module metadata ${GRADLE_MODULE_METADATA_VERSION}. Version-specific declarations may be unreported.`);
			const unresolved = new MavenGradleUnresolvedCollector();
			const coordinates = {
				group_id: component === null ? null : textOf(component.group),
				artifact_id: component === null ? null : textOf(component.module),
				version: component === null ? null : textOf(component.version),
				packaging: null
			};
			unresolved.coordinates(coordinates, "project", null, false);
			const createdBy = gradleObject(parsed.createdBy, "createdBy");
			const createdGradle = gradleObject(createdBy?.gradle, "createdBy.gradle");
			admit("variants", MAVEN_GRADLE_METADATA_VARIANTS, gradleArray(variantsValue, "variants").length);
			const variants = gradleObjects(variantsValue, "variants");
			const rowLists = variants.flatMap((variant) => [gradleArray(variant.dependencies, "dependencies"), gradleArray(variant.dependencyConstraints, "dependencyConstraints")]);
			admit("dependency_rows", MAVEN_GRADLE_METADATA_DEPENDENCY_ROWS, rowLists.reduce((count, rows) => count + rows.length, 0));
			let exclusions = 0;
			for (const rows of rowLists) for (const row of rows) if (isRecord(row)) exclusions += gradleArray(row.excludes, "excludes").length;
			admit("exclusions", MAVEN_GRADLE_METADATA_EXCLUSIONS, exclusions);
			const dependencies = [];
			const dependency_management = [];
			const gradleVariants = [];
			let nextIndex = 0;
			const repeatedVariantNames = new Budget(MAVEN_GRADLE_METADATA_REPEATED_VARIANT_NAME_CHARS);
			const variantNameIndices = new Map();
			for (const [index, variant] of variants.entries()) {
				const declaredName = variant.name;
				if (declaredName !== undefined && typeof declaredName !== "string") throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, `Gradle module metadata variant.name at index ${String(index)} is not a string.`);
				const name = declaredName === undefined || declaredName === "" ? null : declaredName;
				if (name !== null) {
					const previous = variantNameIndices.get(name);
					if (previous !== undefined) throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, `Gradle module metadata declares a duplicate variant name at indices ${String(previous)} and ${String(index)}.`);
					variantNameIndices.set(name, index);
				}
				const attributes = gradleObject(variant.attributes, "variant.attributes");
				const category = textOf(attributes?.["org.gradle.category"]);
				const usage = textOf(attributes?.["org.gradle.usage"]);
				const platform = category === "platform" || category === "enforced-platform";
				const available = gradleObject(variant["available-at"], "available-at");
				const variantDependencies = gradleArray(variant.dependencies, "dependencies");
				const constraints = gradleArray(variant.dependencyConstraints, "dependencyConstraints");
				const repeated = (name?.length ?? 0) * (variantDependencies.length + constraints.length);
				repeatedVariantNames.charge(repeated, () => metadataReportLimit("repeated_variant_name_chars", repeatedVariantNames.maximum, repeatedVariantNames.used + repeated));
				for (const dependency of variantDependencies) dependencies.push(parseGradleDependency(dependency, "variant-dependencies", name, platform, nextIndex++, unresolved));
				for (const constraint of constraints) dependency_management.push(parseGradleDependency(constraint, "variant-constraints", name, platform, nextIndex++, unresolved));
				gradleVariants.push({
					name,
					category,
					usage,
					available_at: available === null ? null : {
						group_id: textOf(available.group),
						artifact_id: textOf(available.module),
						version: textOf(available.version),
						...redactRecordedTransportUrl(textOf(available.url))
					},
					dependency_count: variantDependencies.length,
					constraint_count: constraints.length
				});
			}
			return {
				artifact: {
					path: artifact.path,
					sha256: artifact.sha256,
					bytes: artifact.bytes
				},
				format: "gradle-module",
				coordinates,
				parent: null,
				properties: [],
				dependencies,
				dependency_management,
				gradle: {
					format_version,
					created_by_gradle: createdGradle === null ? null : textOf(createdGradle.version),
					variants: gradleVariants
				},
				unresolved: unresolved.finish(),
				coverage: {
					status: "complete",
					examined_bytes: artifact.bytes
				},
				limitations
			};
		};
		parseMavenGradleMetadata = (bytes, artifact) => {
			if (bytes.length !== artifact.bytes) throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, "Selected artifact length disagrees with the retained bytes.");
			if (bytes.length === 0) throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, "Selected file is empty.");
			let source;
			try {
				source = decodeStrictUtf8(bytes, "strip-signature");
			} catch {
				throw malformedInput(MAVEN_GRADLE_METADATA_FORMAT, "Selected file is not valid UTF-8.");
			}
			const trimmed = source.trimStart();
			if (trimmed.startsWith("{") || trimmed.startsWith("[")) return parseGradle(source, artifact);
			if (opensLikeXml(trimmed) || trimmed.startsWith("<")) return parsePom(source, artifact);
			throw unsupportedInput(MAVEN_GRADLE_METADATA_FORMAT, "Selected file is not a Maven POM or Gradle module-metadata document.");
		};
	})))();
}

//#endregion
//#region dist/java/MavenGradleMetadataProvider.js
var OPERATION, MavenGradleMetadataProvider, inputBudgetRemediation, REPORT_ALLOWANCE_SUBJECTS, mavenGradleMetadataFailurePrimary, mavenGradleMetadataFailure;
function init_MavenGradleMetadataProvider() {
	return (init_MavenGradleMetadataProvider = __esmMin((() => {
		init_resources();
		init_parseFailureAnalysisError();
		init_parseFailure();
		init_errorMessage();
		init_artifactOperationError();
		init_mavenGradleMetadata$1();
		init_result();
		init_MavenGradleMetadata_errors();
		init_fixedAllowanceRemediation();
		init_MavenGradleMetadataProviderIdentity();
		init_MavenGradleMetadataParser();
		OPERATION = "inspect_maven_gradle_metadata";
		MavenGradleMetadataProvider = class {
			identity = MAVEN_GRADLE_METADATA_PROVIDER_IDENTITY;
			#resources = new ArtifactResourceScope();
			async close() {
				try {
					await this.#resources.close();
				} catch (cause) {
					throw projectArtifactCloseFailure(cause, MAVEN_GRADLE_METADATA_PROVIDER_IDENTITY.id, OPERATION);
				}
			}
			async inspect(input, options) {
				let snapshot;
				try {
					return await this.#resources.run(async () => {
						snapshot = await readStableArtifact(input.path, input.max_file_bytes, options?.signal, undefined, this.#resources);
						return ok(parseMavenGradleMetadata(snapshot.bytes, {
							path: input.path,
							sha256: snapshot.sha256,
							bytes: snapshot.bytes.length
						}));
					});
				} catch (cause) {
					return err(mavenGradleMetadataFailure(cause, input, snapshot));
				}
			}
		};
		inputBudgetRemediation = (input) => input.max_file_bytes >= 16777216 ? `The file exceeds the ${String(MAX_INSPECT_MAVEN_GRADLE_METADATA_FILE_BYTES)}-byte input ceiling this operation accepts; select a smaller artifact.` : `Raise max_file_bytes above ${String(input.max_file_bytes)} bytes, up to ${String(MAX_INSPECT_MAVEN_GRADLE_METADATA_FILE_BYTES)}, or select a smaller artifact; this is the caller-selected input read budget.`;
		REPORT_ALLOWANCE_SUBJECTS = {
			dependency_rows: (limit) => `The ${String(limit)}-row allowance for dependency and constraint rows`,
			variants: (limit) => `The ${String(limit)}-variant allowance for Gradle module variants`,
			exclusions: (limit) => `The ${String(limit)}-exclusion allowance for dependency exclusions`,
			unresolved_records: (limit) => `The ${String(limit)}-record allowance for unresolved references and coordinates`,
			xml_nodes: (limit) => `The ${String(limit)}-node allowance for a Maven POM document tree`,
			repeated_variant_name_chars: (limit) => `The ${String(limit)}-character allowance for variant names repeated across Gradle dependency rows`
		};
		mavenGradleMetadataFailurePrimary = (facts, input) => {
			const { cause, origin } = facts;
			if (isParseLimit(cause, "maven-gradle-metadata")) {
				const { name, maximum } = cause.failure.limit;
				return parseLimitConstraint(OPERATION, "memory", cause, {
					path: input.path,
					...fixedAllowanceOptions(Object.entries(REPORT_ALLOWANCE_SUBJECTS).find(([key]) => key === name)?.[1](maximum) ?? name, name === "xml_nodes" ? "parser" : "report", {
						limit: maximum,
						unit: name === "repeated_variant_name_chars" ? "UTF-16 code units" : name === "unresolved_records" ? "records" : name === "dependency_rows" ? "rows" : name === "xml_nodes" ? "nodes" : name
					})
				});
			}
			const identityFailure = projectOwnedArtifactIdentityFailure(facts, OPERATION, input.path);
			if (identityFailure !== undefined) return identityFailure;
			const formatFailure = parseFailureAnalysisError(OPERATION, input.path, cause);
			if (formatFailure !== undefined) return formatFailure;
			const inputFailure = projectOwnedArtifactInputFailure(facts, OPERATION, input.path);
			if (inputFailure !== undefined) return inputFailure;
			if (origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure) {
				if (cause.reason === "limit" && cause.boundary === "file-size") return parseLimitConstraint(OPERATION, "file-size", decodeLimit(MAVEN_GRADLE_METADATA_FORMAT, cause.message, {
					name: "max_file_bytes",
					maximum: input.max_file_bytes
				}, { cause }), {
					retryable: false,
					remediationAction: inputBudgetRemediation(input)
				});
				return translateArtifactFailure(OPERATION, cause);
			}
			const fileFailure = projectSelectedArtifactFileFailure(cause, OPERATION, input.path, "Maven POM or Gradle module metadata");
			if (fileFailure !== undefined) return fileFailure;
			return new ArtifactOperationError(OPERATION, origin === "owned-or-classified" && cause instanceof ArtifactReaderFailure ? cause.reason : "io", undefined, errorMessage(cause), { cause });
		};
		mavenGradleMetadataFailure = (cause, input, snapshot) => {
			const primary = mavenGradleMetadataFailurePrimary(artifactFilePrimaryFacts(cause), input);
			return projectStableArtifactFailure(cause, primary, input.path, MAVEN_GRADLE_METADATA_PROVIDER_IDENTITY.id, OPERATION, snapshot);
		};
	})))();
}

//#endregion
//#region dist/composition/mavenGradleMetadata.js
var createMavenGradleMetadataService;
function init_mavenGradleMetadata() {
	return (init_mavenGradleMetadata = __esmMin((() => {
		init_MavenGradleMetadataService();
		init_MavenGradleMetadataProvider();
		createMavenGradleMetadataService = () => {
			const provider = new MavenGradleMetadataProvider();
			return new MavenGradleMetadataService(provider);
		};
	})))();
}

//#endregion
//#region dist/cli/mavenGradleMetadataCommands.js
var mavenGradleMetadataCommands_exports = /* @__PURE__ */ __exportAll({ registerMavenGradleMetadataCommands: () => registerMavenGradleMetadataCommands });
var registerMavenGradleMetadataCommands;
function init_mavenGradleMetadataCommands() {
	return (init_mavenGradleMetadataCommands = __esmMin((() => {
		init_mavenGradleMetadata();
		init_mavenGradleMetadataToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		registerMavenGradleMetadataCommands = (cli, logger) => {
			registerContractCommand(cli, logger, contractNamed(MAVEN_GRADLE_METADATA_TOOL_CONTRACTS, "inspect_maven_gradle_metadata"), {
				description: "Inspect a Maven POM or Gradle module-metadata document without running Maven or Gradle",
				positionals: ["path"],
				callerPaths: ["path"],
				fields: { path: { description: "Local Maven pom.xml or Gradle .module metadata file" } }
			}, inspectWithService(createMavenGradleMetadataService, "rea-maven-gradle-metadata"));
		};
	})))();
}

//#endregion
export { init_mavenGradleMetadataCommands, mavenGradleMetadataCommands_exports };