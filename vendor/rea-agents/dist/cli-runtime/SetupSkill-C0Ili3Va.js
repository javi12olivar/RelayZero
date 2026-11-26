import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { errorMessage, init_errorMessage } from "./jsonSerialization-DAF9DVXC.js";
import { appendCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { AnalysisCleanupLease, ArtifactReaderFailure, NonRegularFileReadError, OwnedFileHandle, OwnedStagedOutput, RegularFileChangedError, RegularFileCleanupFailure, init_AnalysisCleanupLease, init_ArtifactReader, init_OwnedFileHandle, init_OwnedRegularFile, init_OwnedStagedOutput, init_RegularFile, init_resources, sameRegularFileState } from "./resources-B3P64jvH.js";
import { init_BoundedFileBytes, init_RegularFileRead, readBoundedFileBytes, withRegularFile } from "./RegularFileRead-CRu2Ia6l.js";
import { fileHandleMatchesBytes, init_SetupRecoveryBackup, init_fileHandleMatchesBytes, preserveCurrentRecoveryBackup } from "./fileHandleMatchesBytes-D-nLHXBv.js";
import { clientSkillDirectories, init_SupportedClients } from "./SupportedClients-C1oeYZNH.js";
import { constants } from "node:fs";
import { basename, dirname, join } from "node:path";
import { copyFile, link, lstat, mkdir, mkdtemp, open, readFile, realpath, rename } from "node:fs/promises";
import { isMap, parseDocument } from "yaml";

//#region dist/domain/skillManifest.js
var SkillManifestMetadataError, emptyMetadata, readFrontmatter, metadataOf, parseSkillManifestMetadata, readAuthoredSkillManifest, parseAuthoredSkillManifest, addSkillManifestToolCount;
function init_skillManifest() {
	return (init_skillManifest = __esmMin((() => {
		init_result();
		SkillManifestMetadataError = class extends Error {
			metadata;
			_tag = "SkillManifestMetadataError";
			constructor(message, metadata) {
				super(message);
				this.metadata = metadata;
			}
		};
		emptyMetadata = () => ({
			version: null,
			toolCount: null,
			hasToolCount: false,
			hasCatalogDigest: false
		});
		readFrontmatter = (content) => {
			const opening = /^---\r?\n/u.exec(content);
			if (opening === null) return err(new SkillManifestMetadataError("Skill manifest has no YAML frontmatter", emptyMetadata()));
			const remainder = content.slice(opening[0].length);
			const closing = /^---(?:\r?\n|$)/mu.exec(remainder);
			if (closing === null) return err(new SkillManifestMetadataError("Skill manifest YAML frontmatter is unterminated", emptyMetadata()));
			const document = parseDocument(remainder.slice(0, closing.index), { logLevel: "silent" });
			if (document.errors.length > 0) return err(new SkillManifestMetadataError(`Invalid skill YAML frontmatter: ${document.errors.map((error) => error.message).join("; ")}`, emptyMetadata()));
			if (document.warnings.length > 0) return err(new SkillManifestMetadataError(`Unsupported skill YAML frontmatter: ${document.warnings.map((warning) => warning.message).join("; ")}`, emptyMetadata()));
			if (!isMap(document.contents)) return err(new SkillManifestMetadataError("Skill YAML frontmatter must be a mapping", emptyMetadata()));
			return ok({
				document,
				body: remainder.slice(closing.index + closing[0].length)
			});
		};
		metadataOf = (document) => {
			const metadata = document.get("metadata", true);
			if (metadata === undefined) return ok(emptyMetadata());
			if (!isMap(metadata)) return err(new SkillManifestMetadataError("Skill metadata must be a mapping", emptyMetadata()));
			const version = document.getIn(["metadata", "version"]);
			const toolCount = document.getIn(["metadata", "tool_count"]);
			const facts = {
				version: typeof version === "string" && version.length > 0 ? version : null,
				toolCount: typeof toolCount === "number" && Number.isSafeInteger(toolCount) && toolCount >= 0 ? toolCount : null,
				hasToolCount: metadata.has("tool_count"),
				hasCatalogDigest: metadata.has("catalog_digest")
			};
			const issues = [];
			if (metadata.has("version") && facts.version === null) issues.push("version must be a nonempty string");
			if (facts.hasToolCount && facts.toolCount === null) issues.push("tool_count must be a safe nonnegative integer");
			return issues.length === 0 ? ok(facts) : err(new SkillManifestMetadataError(`Invalid skill metadata: ${issues.join("; ")}`, facts));
		};
		parseSkillManifestMetadata = (content) => {
			const frontmatter = readFrontmatter(content);
			return frontmatter.ok ? metadataOf(frontmatter.value.document) : frontmatter;
		};
		readAuthoredSkillManifest = (content) => {
			const frontmatter = readFrontmatter(content);
			if (!frontmatter.ok) return frontmatter;
			const { document, body } = frontmatter.value;
			const metadata = metadataOf(document);
			if (!metadata.ok) return metadata;
			const { version, hasToolCount, hasCatalogDigest } = metadata.value;
			if (version === null) return err(new SkillManifestMetadataError("Missing authored skill version", metadata.value));
			if (hasToolCount || hasCatalogDigest) return err(new SkillManifestMetadataError("Catalog metadata belongs in the generated skill, not the authored source", metadata.value));
			const name = document.get("name");
			const description = document.get("description");
			if (typeof name !== "string" || name.trim() === "" || typeof description !== "string" || description.trim() === "") return err(new SkillManifestMetadataError("An authored skill needs a nonempty name and description", metadata.value));
			return ok({
				document,
				body,
				metadata: metadata.value,
				fields: {
					name,
					description,
					version
				}
			});
		};
		parseAuthoredSkillManifest = (content) => {
			const manifest = readAuthoredSkillManifest(content);
			return manifest.ok ? ok(manifest.value.fields) : manifest;
		};
		addSkillManifestToolCount = (content, toolCount) => {
			const manifest = readAuthoredSkillManifest(content);
			if (!manifest.ok) return manifest;
			const { document, body, metadata } = manifest.value;
			if (!Number.isSafeInteger(toolCount) || toolCount < 0) return err(new SkillManifestMetadataError("Generated tool_count must be a safe nonnegative integer", metadata));
			document.setIn(["metadata", "tool_count"], toolCount);
			return ok(`---\n${document.toString({ lineWidth: 0 })}---\n${body}`);
		};
	})))();
}

//#endregion
//#region dist/application/SkillFilePublication.js
var SkillDestinationChangedError, SkillFilePreparationFailure, SkillFilePublication, optionalState;
function init_SkillFilePublication() {
	return (init_SkillFilePublication = __esmMin((() => {
		init_resources();
		init_fileHandleMatchesBytes();
		init_OwnedFileHandle();
		init_OwnedStagedOutput();
		init_RegularFile();
		init_errorMessage();
		SkillDestinationChangedError = class extends Error {
			path;
			_tag = "SkillDestinationChangedError";
			constructor(path, cause) {
				super(`Skill destination appeared or changed during installation: ${path}`, { cause });
				this.path = path;
			}
		};
		SkillFilePreparationFailure = class extends Error {
			publication;
			primary;
			cleanupCause;
			_tag = "SkillFilePreparationFailure";
			constructor(publication, primary, cleanupCause) {
				super(`Skill staging cleanup failed for ${publication.path}: ${errorMessage(primary)}; cleanup: ${errorMessage(cleanupCause)}`, { cause: new AggregateError([primary, cleanupCause]) });
				this.publication = publication;
				this.primary = primary;
				this.cleanupCause = cleanupCause;
			}
		};
		SkillFilePublication = class SkillFilePublication {
			path;
			bytes;
			original;
			staging;
			owner;
			stagedPath;
			#attempted = false;
			#restored = false;
			#publishedState;
			kind = "lease";
			resource;
			lease;
			constructor(path, bytes, original, staging, owner, stagedPath) {
				this.path = path;
				this.bytes = bytes;
				this.original = original;
				this.staging = staging;
				this.owner = owner;
				this.stagedPath = stagedPath;
				this.resource = staging.directory;
				this.lease = new AnalysisCleanupLease(() => staging.close(), [staging.directory]);
			}
			static async prepare(path, bytes, original) {
				const parent = await realpath(dirname(path));
				const destination = join(parent, basename(path));
				const directory = await mkdtemp(join(parent, ".rea-skill-"));
				const staging = await OwnedStagedOutput.create(directory);
				let publication;
				try {
					const stagedPath = join(directory, "content");
					const owner = new OwnedFileHandle(await open(stagedPath, constants.O_RDWR | constants.O_CREAT | constants.O_EXCL | (constants.O_NOFOLLOW ?? 0), 384));
					staging.setFile(owner);
					publication = new SkillFilePublication(destination, Buffer.from(bytes), original, staging, owner, stagedPath);
					await owner.handle.writeFile(bytes);
					const created = await owner.handle.stat();
					if (original !== undefined && (created.uid !== original.state.uid || created.gid !== original.state.gid)) await owner.handle.chown(original.state.uid, original.state.gid);
					await owner.handle.chmod(original?.mode ?? 384);
					await owner.handle.sync();
					await staging.assertReadyForPublication(stagedPath);
					return publication;
				} catch (primary) {
					try {
						await staging.close();
					} catch (cleanupCause) {
						if (publication === undefined) {
							const lease = new AnalysisCleanupLease(() => staging.close(), [directory]);
							throw new SkillFilePreparationFailure({
								path: destination,
								kind: "lease",
								resource: directory,
								lease,
								close: () => lease.release()
							}, primary, cleanupCause);
						}
						throw new SkillFilePreparationFailure(publication, primary, cleanupCause);
					}
					throw primary;
				}
			}
			async publish() {
				await this.staging.assertReadyForPublication(this.stagedPath);
				await this.#assertSelected();
				this.#attempted = true;
				if (this.original === undefined) {
					try {
						await link(this.stagedPath, this.path);
					} catch (cause) {
						if (cause instanceof Error && "code" in cause && cause.code === "EEXIST") {
							this.#attempted = false;
							throw new SkillDestinationChangedError(this.path, cause);
						}
						throw cause;
					}
				} else {
					await rename(this.stagedPath, this.path);
					this.staging.recordPublishedRename();
				}
				this.#publishedState = await this.owner.handle.stat();
			}
			async assertCurrent() {
				const before = this.#publishedState;
				if (before === undefined || !sameRegularFileState(before, await this.owner.handle.stat())) throw new SkillDestinationChangedError(this.path);
				await this.#assertNamed(before);
				if (!await fileHandleMatchesBytes(this.owner.handle, this.bytes)) throw new SkillDestinationChangedError(this.path);
				if (!sameRegularFileState(before, await this.owner.handle.stat())) throw new SkillDestinationChangedError(this.path);
				await this.#assertNamed(before);
			}
			/** Restore through the owned descriptor; a changed name never grants write authority. */
			async restore() {
				if (!this.#attempted || this.#restored) return;
				const named = await optionalState(this.path);
				if (this.original !== undefined && named !== undefined && sameRegularFileState(this.original.state, named)) return;
				if (this.original === undefined && named === undefined) return;
				await this.assertCurrent();
				if (this.original === undefined) throw new Error("First-install skill recovery requires manual removal; pathname deletion cannot prove ownership");
				const original = this.original;
				for (let position = 0; position < original.bytes.length;) {
					const { bytesWritten } = await this.owner.handle.write(original.bytes, position, original.bytes.length - position, position);
					if (bytesWritten === 0) throw new Error("Skill restoration made no write progress");
					position += bytesWritten;
				}
				await this.owner.handle.truncate(original.bytes.length);
				await this.owner.handle.chmod(original.mode);
				await this.owner.handle.sync();
				await this.#assertNamed(await this.owner.handle.stat());
				if (!await fileHandleMatchesBytes(this.owner.handle, original.bytes)) throw new SkillDestinationChangedError(this.path);
				this.#restored = true;
			}
			close() {
				return this.lease.release();
			}
			async #assertNamed(expected) {
				const named = await optionalState(this.path);
				if (expected.ino === 0 || named === undefined || named.isSymbolicLink() || !sameRegularFileState(expected, named)) throw new SkillDestinationChangedError(this.path);
			}
			async #assertSelected() {
				const current = await optionalState(this.path);
				if (this.original === undefined ? current !== undefined : current === undefined || current.isSymbolicLink() || !sameRegularFileState(this.original.state, current)) throw new SkillDestinationChangedError(this.path);
			}
		};
		optionalState = async (path) => {
			try {
				return await lstat(path);
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return undefined;
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/application/SetupSkill.js
var MANAGED_SKILL_FILES, isManagedSkillManifest, readSkillFile, readSkillFileSnapshot, canonicalSkillContent, SetupSkillInstallError, systemSkillInstallFileOperations, skillDestinationSelection, skillDestinations, existingSkillDestinations, readOptionalSkillState, inspectSkillDirectory, skillDirectoryIssues, skillDirectoryFailure, validateCanonicalSkillDirectories, canonicalSkillFiles, inspectCanonicalSkill, canonicalSkillNeedsInstall, causePath, closeSkillPublications, installCanonicalSkill, readInstalledSkillIdentity;
function init_SetupSkill() {
	return (init_SetupSkill = __esmMin((() => {
		init_callerPath();
		init_result();
		init_skillManifest();
		init_BoundedFileBytes();
		init_resources();
		init_identity();
		init_RegularFile();
		init_OwnedRegularFile();
		init_RegularFileRead();
		init_SupportedClients();
		init_SetupRecoveryBackup();
		init_SkillFilePublication();
		init_errorMessage();
		MANAGED_SKILL_FILES = [
			"SKILL.md",
			"references/connection-and-recovery.md",
			"references/native-and-artifacts.md",
			"references/javascript-applications.md",
			"references/android-applications.md",
			"references/runtime-observation.md",
			"references/evidence-workflows.md",
			"references/environments.md",
			"references/desktop-build.md"
		];
		isManagedSkillManifest = (content) => content.startsWith(`---\nname: ${PRODUCT_IDENTITY.skillName}\n`) || content.startsWith(`---\r\nname: ${PRODUCT_IDENTITY.skillName}\r\n`);
		readSkillFile = (path, resources, maxBytes = Number.MAX_SAFE_INTEGER) => readSkillFileSnapshot(path, resources, maxBytes).then(({ bytes }) => bytes.toString("utf8"));
		readSkillFileSnapshot = async (path, resources, maxBytes = Number.MAX_SAFE_INTEGER) => withRegularFile(path, async (handle, stats) => {
			const bytes = await readBoundedFileBytes(handle, Math.min(stats.size, maxBytes), { expectedSize: stats.size });
			if (bytes === undefined || bytes.length !== stats.size) throw new RegularFileChangedError(path);
			return {
				bytes,
				mode: stats.mode & 4095,
				state: stats
			};
		}, {
			symlinks: "reject",
			...resources === undefined ? {} : { resources }
		});
		canonicalSkillContent = (relativePath) => readFile(new URL(`../../skills/${PRODUCT_IDENTITY.skillName}/${relativePath}`, new URL("../application/SetupSkill.js", import.meta.url).href), "utf8");
		SetupSkillInstallError = class extends Error {
			_tag = "SetupSkillInstallError";
			path;
			stage;
			reason;
			rollbackFailures;
			recoveryBackupPaths;
			/** All selected files were published and verified before cleanup failed. */
			completed;
			cleanupOwners;
			remediationAction;
			/** Retry only retained staging cleanup; never reapply a pathname rollback. */
			async retryCleanup() {
				return closeSkillPublications(this.cleanupOwners);
			}
			constructor(input) {
				const message = [
					input.completed === true ? "REA skill files were installed and verified, but staging cleanup remains incomplete." : `REA skill ${input.stage} failed at ${input.path}.`,
					`Reason: ${input.reason}`,
					...input.rollbackFailures.length === 0 ? [] : [`${input.completed === true ? "Cleanup" : "Rollback"} also failed for ${input.rollbackFailures.map(({ path, reason }) => `${path} (${reason})`).join(", ")}.`],
					...input.recoveryBackupPaths.length === 0 ? [] : [`Existing-file backups remain at ${input.recoveryBackupPaths.join(", ")}.`]
				].join("\n");
				super(message, { cause: input.cause });
				this.path = input.path;
				this.stage = input.stage;
				this.reason = input.reason;
				this.rollbackFailures = input.rollbackFailures;
				this.recoveryBackupPaths = input.recoveryBackupPaths;
				this.completed = input.completed ?? false;
				this.cleanupOwners = input.cleanupOwners ?? [];
				this.remediationAction = input.remediationAction ?? (input.completed === true ? "Resolve the reported retained staging cleanup before continuing; the skill files were already installed and verified." : "Correct the reported skill installation failure and rerun setup.");
			}
			get remediation() {
				if (this.cause instanceof SkillDestinationChangedError) return `${this.message}\nStop concurrent setup activity, inspect the destination and any reported rollback failures, then retry setup.`;
				return `${this.message}\n${this.remediationAction}`;
			}
		};
		systemSkillInstallFileOperations = {
			mkdir: async (path) => {
				await mkdir(path, { recursive: true });
			},
			backup: (source, destination) => copyFile(source, destination, constants.COPYFILE_EXCL),
			prepare: SkillFilePublication.prepare
		};
		skillDestinationSelection = (home, clientIds, environment = {}, platform) => {
			const selection = clientSkillDirectories(home, clientIds, environment, platform);
			return {
				destinations: selection.directories.map(({ client, directory }) => ({
					client,
					path: appendCallerPath(directory, PRODUCT_IDENTITY.skillName, platform)
				})),
				issues: selection.unresolved.map(({ client, path, detail }) => ({
					client,
					path,
					detail,
					kind: "unresolved"
				}))
			};
		};
		skillDestinations = (home, clientIds, environment = {}, platform) => {
			const selection = skillDestinationSelection(home, clientIds, environment, platform);
			if (selection.issues.length > 0) throw skillDirectoryFailure(selection.issues);
			return selection.destinations;
		};
		existingSkillDestinations = async (home, environment = {}, platform, resources) => {
			const selection = skillDestinationSelection(home, undefined, environment, platform);
			const issues = [...selection.issues];
			const existing = [];
			for (const destination of selection.destinations) {
				try {
					const pathIssues = await skillDirectoryIssues([destination]);
					if (pathIssues.some(({ kind }) => kind === "unreadable")) {
						issues.push(...pathIssues);
						continue;
					}
					if (pathIssues.length > 0) continue;
					const manifest = appendCallerPath(destination.path, "SKILL.md");
					const content = await readSkillFile(manifest, resources);
					if (isManagedSkillManifest(content)) existing.push(destination);
				} catch (cause) {
					if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") continue;
					if (cause instanceof RegularFileCleanupFailure || cause instanceof ArtifactReaderFailure) throw cause;
					if (cause instanceof NonRegularFileReadError) continue;
					issues.push({
						client: destination.client,
						path: destination.path,
						kind: "unreadable",
						detail: errorMessage(cause)
					});
				}
			}
			return {
				destinations: existing,
				issues
			};
		};
		readOptionalSkillState = async (path, resources) => {
			try {
				return await readSkillFileSnapshot(path, resources);
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return undefined;
				throw cause;
			}
		};
		inspectSkillDirectory = async (path) => {
			try {
				const directory = await lstat(path);
				if (directory.isSymbolicLink()) return err({
					path,
					kind: "symbolic_link",
					detail: "Skill directory is a symbolic link."
				});
				if (!directory.isDirectory()) return err({
					path,
					kind: "not_directory",
					detail: "Skill path is not a directory."
				});
				return ok(undefined);
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return ok(undefined);
				if (cause instanceof Error && "code" in cause && cause.code === "ENOTDIR") return err({
					path,
					kind: "not_directory",
					detail: "A component of the skill path is not a directory (ENOTDIR)."
				});
				return err({
					path,
					kind: "unreadable",
					detail: errorMessage(cause)
				});
			}
		};
		skillDirectoryIssues = async (destinations) => {
			const issues = [];
			for (const { path } of destinations) {
				const root = await inspectSkillDirectory(path);
				if (!root.ok) {
					issues.push(root.error);
					continue;
				}
				const references = await inspectSkillDirectory(appendCallerPath(path, "references"));
				if (!references.ok) issues.push(references.error);
			}
			return issues;
		};
		skillDirectoryFailure = (issues) => new SetupSkillInstallError({
			path: issues[0]?.path ?? "skill bundle",
			stage: "prepare",
			reason: issues.map(({ path, detail }, index) => index === 0 ? detail : `${path}: ${detail}`).join("\n"),
			remediationAction: issues.some(({ kind }) => kind === "unreadable" || kind === "unresolved") ? "Resolve the reported skill directory inspection failure, or run setup with --skill=false to configure the client without installing the skill." : "Use a regular skill directory, or run setup with --skill=false to configure the client without installing the skill.",
			rollbackFailures: [],
			recoveryBackupPaths: [],
			cause: issues
		});
		validateCanonicalSkillDirectories = async (home, clientIds, environment = {}, platform) => {
			const selection = skillDestinationSelection(home, clientIds, environment, platform);
			const issues = [...selection.issues, ...await skillDirectoryIssues(selection.destinations)];
			return issues.length === 0 ? ok(undefined) : err(skillDirectoryFailure(issues));
		};
		canonicalSkillFiles = async (home, clientIds, environment, platform, resources) => {
			const destinations = skillDestinations(home, clientIds, environment, platform);
			const admission = await validateCanonicalSkillDirectories(home, clientIds, environment, platform);
			if (!admission.ok) throw admission.error;
			return Promise.all(destinations.flatMap(({ path: root }) => MANAGED_SKILL_FILES.map(async (relativePath) => {
				const destination = appendCallerPath(root, relativePath);
				return {
					destination,
					content: await canonicalSkillContent(relativePath),
					original: await readOptionalSkillState(destination, resources)
				};
			})));
		};
		inspectCanonicalSkill = async (home, clientIds, environment, platform, resources) => {
			const selection = skillDestinationSelection(home, clientIds, environment, platform);
			const destinations = selection.destinations;
			const issues = [...selection.issues];
			let canonical = true;
			let manifest;
			let failureCause = issues.length > 0 ? issues : undefined;
			let installedDestination = false;
			for (const destination of destinations) {
				const { path: root } = destination;
				const pathIssues = await skillDirectoryIssues([destination]);
				if (pathIssues.length > 0) {
					issues.push(...pathIssues);
					if (failureCause === undefined) failureCause = pathIssues;
					installedDestination = true;
					canonical = false;
					continue;
				}
				let rootCanonical = true;
				let rootHasFiles = false;
				const rootIssues = [];
				for (const relativePath of MANAGED_SKILL_FILES) {
					const destination = appendCallerPath(root, relativePath);
					let original;
					try {
						original = await readOptionalSkillState(destination, resources);
					} catch (cause) {
						if (cause instanceof RegularFileCleanupFailure || cause instanceof ArtifactReaderFailure) throw cause;
						rootIssues.push({
							path: destination,
							kind: "unreadable",
							detail: errorMessage(cause)
						});
						if (failureCause === undefined) failureCause = cause;
						rootCanonical = false;
						rootHasFiles = true;
						continue;
					}
					if (original !== undefined) rootHasFiles = true;
					if (relativePath === "SKILL.md" && manifest === undefined) manifest = original?.bytes.toString("utf8");
					if (original === undefined) rootCanonical = false;
					else if (rootCanonical) {
						const content = await canonicalSkillContent(relativePath);
						rootCanonical = original.bytes.equals(Buffer.from(content, "utf8"));
					}
				}
				if (clientIds !== undefined || rootHasFiles || rootIssues.length > 0) {
					installedDestination ||= rootHasFiles;
					canonical = canonical && rootCanonical;
					issues.push(...rootIssues);
					if (!rootCanonical && rootIssues.length === 0) issues.push({
						client: destination.client,
						path: root,
						kind: rootHasFiles ? "stale" : "missing",
						detail: `Selected skill copy is ${rootHasFiles ? "stale" : "missing"}`
					});
				}
			}
			return issues.length === 0 ? ok({
				canonical,
				manifest,
				installedDestination
			}) : err({
				_tag: "SkillInspectionFailure",
				issues,
				cause: failureCause,
				manifest
			});
		};
		canonicalSkillNeedsInstall = async (home, clientIds = [], environment = {}, platform, resources) => {
			try {
				const inspection = await inspectCanonicalSkill(home, clientIds, environment, platform, resources);
				return !inspection.ok || !inspection.value.canonical;
			} catch (cause) {
				if (cause instanceof RegularFileCleanupFailure || cause instanceof ArtifactReaderFailure) throw cause;
				void cause;
				return true;
			}
		};
		causePath = (cause) => cause instanceof Error && "path" in cause && typeof cause.path === "string" ? cause.path : undefined;
		closeSkillPublications = async (publications, resources) => {
			const failures = [];
			for (const publication of publications) {
				if (publication.lease.released) continue;
				try {
					if (resources === undefined) await publication.close();
					else {
						const released = await resources.release(publication);
						if (released.kind === "failed") throw released.cause;
					}
				} catch (cause) {
					failures.push({
						path: publication.resource,
						reason: errorMessage(cause)
					});
				}
			}
			return failures;
		};
		installCanonicalSkill = async (home, clientIds = [], environment = {}, platform, operations = systemSkillInstallFileOperations, resources) => {
			const publications = [];
			const preparedCleanupOwners = [];
			let verified = false;
			let stage = "prepare";
			let failingPath = "skill bundle";
			const recoveryPaths = new Map();
			try {
				const canonical = await canonicalSkillFiles(home, clientIds, environment, platform, resources);
				const changed = canonical.filter(({ content, original }) => original?.bytes.equals(Buffer.from(content, "utf8")) !== true);
				if (changed.length === 0) return ok("unchanged");
				stage = "backup";
				for (const { destination, original } of changed) {
					failingPath = destination;
					await operations.mkdir(dirname(destination));
					if (original !== undefined) {
						const preserved = await preserveCurrentRecoveryBackup(`${destination}.rea.backup`, destination, original.bytes, {
							copy: operations.backup,
							...resources === undefined ? {} : { resources }
						});
						if (!preserved.ok) throw new Error(preserved.error.detail);
						recoveryPaths.set(destination, preserved.value);
					}
				}
				stage = "write";
				for (const file of changed) {
					failingPath = file.destination;
					const publication = await operations.prepare(file.destination, Buffer.from(file.content, "utf8"), file.original);
					publications.push(publication);
					await publication.publish();
				}
				stage = "readback";
				for (const publication of publications) {
					failingPath = publication.path;
					await publication.assertCurrent();
				}
				verified = true;
				const cleanupFailures = await closeSkillPublications(publications, resources);
				if (cleanupFailures.length > 0) throw new Error(`Skill publication cleanup incomplete: ${cleanupFailures.map(({ path, reason }) => `${path} (${reason})`).join(", ")}`);
				return ok("installed");
			} catch (cause) {
				if (stage === "prepare" && cause instanceof SetupSkillInstallError) return err(cause);
				failingPath = causePath(cause) ?? failingPath;
				if (cause instanceof SkillFilePreparationFailure) preparedCleanupOwners.push(cause.publication);
				const rollbackFailures = [];
				if (!verified) {
					for (const publication of [...publications].reverse()) {
						try {
							await publication.restore();
						} catch (rollbackCause) {
							rollbackFailures.push({
								path: publication.path,
								reason: errorMessage(rollbackCause)
							});
						}
					}
				}
				const cleanupOwners = [...publications, ...preparedCleanupOwners];
				rollbackFailures.push(...await closeSkillPublications(cleanupOwners, resources));
				if (verified && rollbackFailures.length === 0) return ok("installed");
				return err(new SetupSkillInstallError({
					path: failingPath,
					stage,
					reason: errorMessage(cause),
					rollbackFailures,
					recoveryBackupPaths: [...recoveryPaths.values()],
					completed: verified,
					cleanupOwners,
					cause
				}));
			}
		};
		readInstalledSkillIdentity = async (home, clientIds, environment = {}, platform, resources) => {
			const inspection = await inspectCanonicalSkill(home, clientIds, environment, platform, resources);
			if (inspection.ok && !inspection.value.installedDestination) return undefined;
			const content = inspection.ok ? inspection.value.manifest : inspection.error.manifest;
			const issues = inspection.ok ? [] : inspection.error.issues;
			const parsedMetadata = content === undefined ? undefined : parseSkillManifestMetadata(content);
			const metadata = parsedMetadata?.ok ? parsedMetadata.value : parsedMetadata?.error.metadata;
			return {
				canonical: inspection.ok && inspection.value.canonical,
				version: metadata?.version ?? null,
				toolCount: metadata?.toolCount ?? null,
				...issues.length === 0 ? {} : { issues }
			};
		};
	})))();
}

//#endregion
export { MANAGED_SKILL_FILES, SetupSkillInstallError, canonicalSkillNeedsInstall, existingSkillDestinations, init_SetupSkill, installCanonicalSkill, isManagedSkillManifest, readInstalledSkillIdentity, readSkillFile, skillDestinationSelection, skillDestinations, validateCanonicalSkillDirectories };