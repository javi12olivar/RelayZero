import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, AnalysisError, AnalysisInputError, EvidenceFileError, MAX_JSON_DEPTH, cancelledBy, carriedReason, equalJsonValues, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, init_evidenceErrors, init_isRecord, init_jsonValue, init_localPath, init_sha256Hex, isPathWithinRoot, isRecord, jsonValueSchema, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform, init_safeJson, init_strictUtf8, safeParseUtf8Json, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { ArtifactResourceScope, SafeOutputTree, SafeOutputTreeCreationFailure, SafeOutputTreeDestinationRefusal, init_ArtifactResourceScope, init_SafeOutputTree, init_SafeOutputTreeAdmission, init_SafeOutputTreeCreationFailure, init_resources, outputDirectoryAdmissionRefusal } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCloseRejection, ellipsisExcerpt, init_analysisErrorCleanup, init_excerpt, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { init_jsonRecord, jsonRecordSchema } from "./jsonRecord-Cuy_NNu4.js";
import { createEvidence, describeValidationFailure, init_evidence, init_validationFailure } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_JsonFiles, readJsonFile } from "./JsonFiles-CvkLtuRa.js";
import { init_xmlDocument, xmlElementRanges } from "./xmlDocument-DuM0TF5n.js";
import { DarwinProcessOwnershipInspectionError, init_DarwinProcessRunTokenReader, init_ProcessInspectionCleanup, processInspectionCleanupFailures } from "./ProcessOwnershipEvidence-RnQ-V3H9.js";
import { AnalysisCleanupRelease, init_analysisCleanupRelease } from "./analysisCleanupRelease-ME3hxZPc.js";
import { OwnedCommandFailure, init_OwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { init_OwnedWorkerRuntime, processWorkerCleanup } from "./OwnedWorkerRuntime-_ZkKBS_4.js";
import { DESKTOP_PROVIDER, canonicalCallerPath, desktopOperationFailure, init_DesktopCaptureRefusals, init_canonicalCallerPath } from "./desktopCaptureCommands-MBIrn49f.js";
import { DESKTOP_VIEW_DEFAULTS, PYTHON_ECMASCRIPT_TRIM_CHARACTERS, STATE_PATH_INPUTS, decodeStateUtf16, desktopApplicationStateSchema, desktopViewFileLimitMessage, desktopViewPolicy, detectStateFormat, electronLaunchArguments, heldOpenLimitation, init_appExportInstall, init_appExportUnowned, init_buildCapture, init_desktopEntry, init_desktopState, init_desktopStateDiff, init_desktopTextSyntax, init_desktopViewPolicy, init_stateFormats, init_stateTextEncoding, isTextualFormat, isWithinAny, leftOutLocksLimitation, runtimeSeeds, runtimeSeedsLimitation, textSyntaxFormat, textualView, trashedFiles, unownedChangedFolders, unownedFoldersLimitation, unreadDconfLimitation, unwrapDesktopCommand, versionAt } from "./x11Windows-Cx5-JOUb.js";
import { READER_TIMEOUT_S, compressionOf, gunzip, gzipDeterministic, hasExtraField, init_appTask, init_gzipDocument, init_viewSelector, isGzip, isPointerCheck, openStateDocument, parseDesktopTask } from "./stateChanges-DKaIbxqq.js";
import { DESKTOP_EXPORT_FRAMEWORK_VERSION, PYTHON_EXACT_JSON_NUMBER, appModuleFile, className, downloadPrefix, exportedStateFiles, identityLeftIn, identitySpellings, init_appDownloadInstall, init_appExport, init_hostIdentity, init_pythonExactJsonNumber, init_seedDocument, launchCommand, launchDocumentLimitation, openSeedDocument, renderAppClass, renderEnvToml, renderReadme, renderSkill, renderSmokeTask, scrubHostIdentity } from "./appExport-CjCA74-5.js";
import { SETTLE_TIMING, init_appSettle } from "./appSettle-CupYK5Tz.js";
import { MAX_WITHHELD_BYTES, SIGN_IN_END, SIGN_IN_START, consentFileSchema, evaluateTaskChecks, init_appTaskChecks, init_appWithheld, namedWithheldPaths, versionView, withheldFiles, withheldSettings } from "./appWithheld-WlVw2GpU.js";
import { init_DesktopApplicationState, init_DesktopRetainedContent, init_DesktopStateVersions, init_DesktopZipView, inspectDesktopApplicationState, readDesktopCapture, readZipView, selectStateEnds, withRetainedContent } from "./DesktopApplicationState-DwjkVBfu.js";
import { admitApplication, exportEnvironmentName, init_DesktopExportInstall, installFiles, readDownloadInstall, refuse } from "./DesktopExportInstall-De4IEm0V.js";
import { constants } from "node:fs";
import { basename, dirname, isAbsolute, join } from "node:path";
import { z } from "zod";
import { Readable } from "node:stream";
import { createHash } from "node:crypto";
import { access, lstat, mkdtemp, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";

//#region dist/domain/desktop/appExportInstallLimitations.js
var unmappedLibraries, packageFileLimitations, downloadLimitations, installLimitations;
function init_appExportInstallLimitations() {
	return (init_appExportInstallLimitations = __esmMin((() => {
		init_appDownloadInstall();
		unmappedLibraries = (installed, stranded) => [
			...installed.library_packages_reason === undefined ? [] : [installed.library_packages_reason],
			...installed.missing_libraries?.length ? [`not found on the capture host: ${installed.missing_libraries.join(", ")}`] : [],
			...installed.unpackaged_libraries?.length ? [`owned by no package: ${installed.unpackaged_libraries.join(", ")}`] : [],
			...installed.uninstallable_library_packages?.length ? [`in packages neither the Ubuntu 24.04 archive nor a declared repository offers: ${installed.uninstallable_library_packages.join(", ")}`] : [],
			...stranded.length > 0 ? [`in packages only the apt repositories left out offer: ${stranded.join(", ")}`] : []
		];
		packageFileLimitations = (file, installed) => [
			`The computer downloads the package from ${file.url} once, when the bundle is put, and refuses the download unless its SHA-256 is ${file.sha256}, the captured file's; the bundle does not contain the package. It installs exactly that file's version, ${installed.version ?? "unknown"}, with dpkg after the apt packages it depends on, and the bundle supports only its architecture, ${file.architecture}.`,
			"Vendor sites may refuse automated downloads, so the URL must point at a copy of the file the operator may use, and the package's licence, such as a trial's terms, is the operator's to check.",
			...file.unreadDependencies.length === 0 ? [] : [`REA could not read a package name from these dependencies, so the computer does not install them: ${file.unreadDependencies.join(", ")}.`]
		];
		downloadLimitations = (download) => [`The computer downloads the ${download.kind === "appimage" ? "AppImage" : "tarball"} from ${download.url} once, when the bundle is put, refuses it unless its SHA-256 is ${download.sha256}, and unpacks it under ${downloadPrefix(download)} with the network off; the bundle does not contain the application and supports only ${download.architecture}.`, "The URL must keep serving those bytes, or point at a copy of them the operator may use, and the application's licence is the operator's to check."];
		installLimitations = (install, installed, electron) => {
			const unmapped = unmappedLibraries(installed, install.strandedPackages ?? []);
			const vendor = install.sources.length > 0 || install.packageFile !== null;
			return [
				...install.download !== undefined ? downloadLimitations(install.download) : install.packageFile !== null ? packageFileLimitations(install.packageFile, installed) : [install.sources.length > 0 ? `The application is installed as ${install.aptPackage}${install.release === null ? "" : `/${install.release}`} from ${install.sources.map((source) => source.uri).join(", ")}, trusting the key that verified it on the capture host, so the computer installs the version that repository offers then, which may differ from the one captured; the bundle supports only the capture host's architecture, ${install.architectures.join(", ")}.` : "The application is installed from the distribution archive by name, so the computer may install a different version than the one captured."],
				...install.extraPackages === undefined ? [] : [`The computer installs ${install.extraPackages.join(", ")} beside the application because the export was asked for them with --extra-package, as a build computer asks for the packages its request named.`],
				...install.skipped.map((repository) => `The apt repository ${repository} was left out.`),
				...vendor && installed.library_packages === undefined ? ["The capture did not record the executable's library packages, so the computer installs only what the package depends on."] : [],
				...!vendor || unmapped.length === 0 ? [] : [`Not every library the executable loads is installed with it (${unmapped.join("; ")}), so the computer may lack some.`],
				...electron ? ["Chromium's sandbox is off inside the computer (--no-sandbox): it needs user namespaces the computer's container does not grant, and Electron exits without them."] : []
			];
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/seedScrub.js
var MAX_SCRUBBED_BYTES, JSON_SPACE, stringEnd, isMemberName, scrubJson, XML_MARKUP, XML_VALUE, XML_REFERENCE, XML_ENTITIES, referenced, decodeXml, encodeXml, scrubXml, GVARIANT_ESCAPES, GVARIANT_ESCAPE, GVARIANT_PATH_OR_SIGNATURE, isCharacter, decodeGVariant, encodeGVariant, isBytestring, scrubGVariant, scrubDconf, plainScrub, seedText, holdsIdentity, scrubDocument, scrubSeed;
function init_seedScrub() {
	return (init_seedScrub = __esmMin((() => {
		init_gzipDocument();
		init_hostIdentity();
		init_stateFormats();
		init_stateTextEncoding();
		init_strictUtf8();
		MAX_SCRUBBED_BYTES = 256 * 1024 * 1024;
		JSON_SPACE = new Set([
			" ",
			"	",
			"\n",
			"\r"
		]);
		stringEnd = (text, start) => {
			const mark = text[start] ?? "";
			for (let quote = text.indexOf(mark, start + 1); quote !== -1;) {
				let slashes = 0;
				while (text[quote - 1 - slashes] === "\\") slashes += 1;
				if (slashes % 2 === 0) return quote + 1;
				quote = text.indexOf(mark, quote + 1);
			}
			return -1;
		};
		isMemberName = (text, end) => {
			let next = end;
			while (JSON_SPACE.has(text[next] ?? "")) next += 1;
			return text[next] === ":";
		};
		scrubJson = (text, identity) => {
			const parts = [];
			const strings = [];
			let copied = 0;
			for (let start = text.indexOf("\""); start !== -1;) {
				const end = stringEnd(text, start);
				if (end === -1) break;
				const value = JSON.parse(text.slice(start, end));
				const clean = isMemberName(text, end) ? value : scrubHostIdentity(value, identity);
				strings.push(clean);
				if (clean !== value) {
					parts.push(text.slice(copied, start), JSON.stringify(clean));
					copied = end;
				}
				start = text.indexOf("\"", end);
			}
			parts.push(text.slice(copied));
			const scrubbed = parts.join("");
			return {
				text: scrubbed,
				decoded: [scrubbed, ...strings].join("\n")
			};
		};
		XML_MARKUP = /<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)\]\]>|<\?[\s\S]*?\?>|<[^>"']*(?:(?:"[^"]*"|'[^']*')[^>"']*)*>/gu;
		XML_VALUE = /"([^"]*)"|'([^']*)'/gu;
		XML_REFERENCE = /&(?:#x([0-9a-fA-F]+)|#([0-9]+)|(lt|gt|amp|quot|apos));/gu;
		XML_ENTITIES = {
			lt: "<",
			gt: ">",
			amp: "&",
			quot: "\"",
			apos: "'"
		};
		referenced = (whole, point) => point <= 1114111 ? String.fromCodePoint(point) : whole;
		decodeXml = (text, quote) => {
			const normalized = quote !== undefined ? text.replace(/\r\n|[\r\n\t]/gu, " ") : text.replace(/\r\n|\r/gu, "\n");
			return normalized.replace(XML_REFERENCE, (whole, hex, decimal, name) => hex !== undefined ? referenced(whole, Number.parseInt(hex, 16)) : decimal !== undefined ? referenced(whole, Number(decimal)) : XML_ENTITIES[name ?? ""] ?? whole);
		};
		encodeXml = (text, quote) => text.replace(/[&<>\r\t\n"']/gu, (character) => {
			if (character === "&") return "&amp;";
			if (character === "<") return "&lt;";
			if (character === ">") return "&gt;";
			if (character === "\r") return "&#13;";
			if (quote === undefined || character !== quote && character.trim() !== "") return character;
			return `&#${String(character.codePointAt(0))};`;
		});
		scrubXml = (text, identity) => {
			const data = (raw, quote) => {
				const value = decodeXml(raw, quote);
				const clean = scrubHostIdentity(value, identity);
				return clean === value ? raw : encodeXml(clean, quote);
			};
			const parts = [];
			let copied = 0;
			/** Replace the span at `start` written `raw` with `clean` when they differ. */
			const replace = (start, raw, clean) => {
				if (clean === raw) return;
				parts.push(text.slice(copied, start), clean);
				copied = start + raw.length;
			};
			let end = 0;
			for (const match of text.matchAll(XML_MARKUP)) {
				const [markup, comment, cdata] = match;
				const characters = text.slice(end, match.index);
				replace(end, characters, data(characters));
				end = match.index + markup.length;
				if (comment !== undefined) replace(match.index, markup, `<!--${scrubHostIdentity(comment, identity)}-->`);
				else if (cdata !== undefined) replace(match.index, markup, `<![CDATA[${scrubHostIdentity(cdata, identity)}]]>`);
				else if (!markup.startsWith("<?")) replace(match.index, markup, markup.replace(XML_VALUE, (_value, double, single) => double === undefined ? `'${data(single ?? "", "'")}'` : `"${data(double, "\"")}"`));
			}
			const rest = text.slice(end);
			replace(end, rest, data(rest));
			parts.push(text.slice(copied));
			const scrubbed = parts.join("");
			return {
				text: scrubbed,
				decoded: decodeXml(scrubbed)
			};
		};
		GVARIANT_ESCAPES = {
			a: "\x07",
			b: "\b",
			f: "\f",
			n: "\n",
			r: "\r",
			t: "	",
			v: "\v",
			"\n": ""
		};
		GVARIANT_ESCAPE = /\\(?:u([0-9a-fA-F]{4})|U([0-9a-fA-F]{8})|([\s\S]))/gu;
		GVARIANT_PATH_OR_SIGNATURE = /\b(?:objectpath|signature)\b|@[a-z(){}]*[og]/u;
		isCharacter = (point) => point > 0 && point <= 1114111 && (point < 55296 || point >= 57344);
		decodeGVariant = (body) => {
			let refused = body.includes("\0");
			const value = body.replace(GVARIANT_ESCAPE, (_escape, short, long, other) => {
				if (other !== undefined) {
					refused ||= other === "u" || other === "U";
					return GVARIANT_ESCAPES[other] ?? other;
				}
				const point = Number.parseInt(short ?? long ?? "0", 16);
				if (isCharacter(point)) return String.fromCodePoint(point);
				refused = true;
				return "";
			});
			return refused ? undefined : value;
		};
		encodeGVariant = (value, quote) => `${quote}${value.replace(/[\\'"\p{Cc}]/gu, (character) => {
			if (character === "\\" || character === quote) return `\\${character}`;
			if (character === "'" || character === "\"") return character;
			return `\\u${(character.codePointAt(0) ?? 0).toString(16).padStart(4, "0")}`;
		})}${quote}`;
		isBytestring = (text, start) => text[start - 1] === "b" && !/[A-Za-z0-9]/u.test(text[start - 2] ?? "");
		scrubGVariant = (text, identity) => {
			const parts = [];
			const strings = [];
			const quotes = /['"]/gu;
			let outside = "";
			let last = 0;
			let copied = 0;
			for (let match = quotes.exec(text); match !== null; match = quotes.exec(text)) {
				const start = match.index;
				const end = stringEnd(text, start);
				if (end === -1) return undefined;
				outside += ` ${text.slice(last, start)}`;
				last = end;
				quotes.lastIndex = end;
				if (isBytestring(text, start)) continue;
				const value = decodeGVariant(text.slice(start + 1, end - 1));
				if (value === undefined) return undefined;
				const clean = isMemberName(text, end) ? value : scrubHostIdentity(value, identity);
				strings.push(clean);
				if (clean !== value) {
					parts.push(text.slice(copied, start), encodeGVariant(clean, match[0]));
					copied = end;
				}
			}
			if (GVARIANT_PATH_OR_SIGNATURE.test(`${outside} ${text.slice(last)}`)) return undefined;
			parts.push(text.slice(copied));
			const scrubbed = parts.join("");
			return {
				text: scrubbed,
				decoded: [scrubbed, ...strings].join("\n")
			};
		};
		scrubDconf = (groups, identity) => {
			const lines = [];
			const decoded = [];
			for (const [group, keys] of Object.entries(groups)) {
				if (!isRecord(keys)) continue;
				lines.push(`[${group}]`);
				for (const [key, value] of Object.entries(keys)) {
					if (typeof value !== "string") continue;
					const scrub = scrubGVariant(value, identity);
					lines.push(`${key}=${scrub?.text ?? value}`);
					if (scrub !== undefined) decoded.push(scrub.decoded);
				}
				lines.push("");
			}
			const text = lines.join("\n");
			return {
				text,
				holdsIdentity: identityLeftIn([text, ...decoded].join("\n"), identity) !== undefined
			};
		};
		plainScrub = (text, identity) => {
			const scrubbed = scrubHostIdentity(text, identity);
			return {
				text: scrubbed,
				decoded: scrubbed
			};
		};
		seedText = (bytes, { home, format }) => {
			if (bytes.length > MAX_SCRUBBED_BYTES) return undefined;
			const utf16 = decodeStateUtf16(bytes);
			if (utf16 !== undefined) {
				return {
					text: utf16.text,
					format: textSyntaxFormat(home, utf16.text),
					encode: (scrubbed) => {
						const encoded = Buffer.from(scrubbed, "utf16le");
						if (utf16.order === "be") encoded.swap16();
						return Buffer.concat([bytes.subarray(0, 2), encoded]);
					}
				};
			}
			if (!isTextualFormat(format)) return undefined;
			try {
				const text = strictUtf8Decoder("preserve").decode(bytes);
				return {
					text,
					encode: (scrubbed) => Buffer.from(scrubbed, "utf8"),
					format: format === "text" ? textSyntaxFormat(home, text) : format
				};
			} catch {
				return undefined;
			}
		};
		holdsIdentity = (bytes, identity) => {
			if (bytes.length > MAX_SCRUBBED_BYTES) return identitySpellings(identity).some((spelling) => bytes.includes(spelling));
			const latin1 = (value) => value === null ? null : Buffer.from(value).toString("latin1");
			return identityLeftIn(bytes.toString("latin1"), {
				home: latin1(identity.home) ?? "",
				hostname: latin1(identity.hostname),
				user: latin1(identity.user)
			}) !== undefined;
		};
		scrubDocument = (bytes, seed, identity) => {
			const decoded = seedText(bytes, seed);
			if (decoded === undefined) return {
				bytes: undefined,
				holdsIdentity: holdsIdentity(bytes, identity)
			};
			const scrub = decoded.format === "json" ? scrubJson(decoded.text, identity) : decoded.format === "xml" ? scrubXml(decoded.text, identity) : plainScrub(decoded.text, identity);
			return {
				bytes: scrub.text === decoded.text ? undefined : decoded.encode(scrub.text),
				holdsIdentity: identityLeftIn(scrub.decoded, identity) !== undefined
			};
		};
		scrubSeed = (bytes, seed, identity) => {
			if (!isGzip(bytes)) return scrubDocument(bytes, seed, identity);
			const document = gunzip(bytes, MAX_SCRUBBED_BYTES);
			if (!document.ok) return {
				bytes: undefined,
				holdsIdentity: holdsIdentity(bytes, identity)
			};
			const documentSeed = seed.format === null ? {
				...seed,
				format: detectStateFormat(seed.home, document.value)
			} : seed;
			const scrub = scrubDocument(document.value, documentSeed, identity);
			if (scrub.bytes === undefined && hasExtraField(bytes)) return {
				bytes: undefined,
				holdsIdentity: scrub.holdsIdentity || holdsIdentity(bytes, identity)
			};
			const shipped = gzipDeterministic(scrub.bytes ?? document.value);
			if (shipped.equals(bytes)) return {
				bytes: undefined,
				holdsIdentity: scrub.holdsIdentity
			};
			return {
				bytes: shipped,
				holdsIdentity: scrub.holdsIdentity,
				...scrub.bytes === undefined ? { recompressed: true } : {}
			};
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopOutputTree.js
var nearestExisting, planOutputTree, outputCancellation, writeOutputTree, desktopOutputFailure;
function init_DesktopOutputTree() {
	return (init_DesktopOutputTree = __esmMin((() => {
		init_HostPlatform();
		init_resources();
		init_canonicalCallerPath();
		init_callerPath();
		init_analysisErrorCore();
		init_analysisErrorCancellation();
		init_providerAdapterError();
		init_errorMessage();
		nearestExisting = async (physical) => {
			let current = dirname(physical);
			for (;;) {
				const found = await lstat(current).then(() => true, (cause) => {
					if (cause.code === "ENOENT") return false;
					throw cause;
				});
				if (found || dirname(current) === current) return current;
				current = dirname(current);
			}
		};
		planOutputTree = async (requested, refusal) => {
			try {
				if (!isAbsolute(requested)) throw new SafeOutputTreeDestinationRefusal("Output root must be absolute");
				if (basename(requested) === ".." || basename(requested) === ".") throw new SafeOutputTreeDestinationRefusal("Invalid output directory");
				const physical = await canonicalCallerPath(requested);
				const absolute = absoluteCallerPath(requested);
				const selected = absolute.length > 1 ? absolute.replace(/\/$/u, "") : absolute;
				const existing = await lstat(selected).then((value) => value, (cause) => {
					if (cause.code === "ENOENT") return undefined;
					throw cause;
				});
				if (existing?.isSymbolicLink()) throw new SafeOutputTreeDestinationRefusal("Output root cannot be a symbolic link");
				if (existing !== undefined && !existing.isDirectory()) throw new SafeOutputTreeDestinationRefusal("Output root must be a directory");
				if (existing !== undefined && (await readdir(selected)).length > 0) throw new SafeOutputTreeDestinationRefusal("Output directory is not empty");
				const parent = dirname(physical);
				const writable = existing === undefined ? await nearestExisting(physical) : physical;
				await access(writable, constants.W_OK | constants.X_OK).catch((cause) => {
					throw new SafeOutputTreeDestinationRefusal(existing === undefined ? "Output parent is not writable" : "Output directory is not writable", { cause });
				});
				if (existing !== undefined || writable === parent) await access(parent, constants.R_OK).catch((cause) => {
					throw new SafeOutputTreeDestinationRefusal("Output parent is not readable", { cause });
				});
				return Object.freeze({
					requested,
					physical
				});
			} catch (cause) {
				const error = cause instanceof SafeOutputTreeDestinationRefusal ? cause : new SafeOutputTreeDestinationRefusal("Output destination cannot be resolved", { cause });
				throw outputDirectoryAdmissionRefusal(refusal.operation, refusal.field, error);
			}
		};
		outputCancellation = (operation, signal) => signal?.aborted === true ? cancelledBy(operation, signal) : undefined;
		writeOutputTree = async (plan, write, refusal, signal) => {
			const cancelled = outputCancellation(refusal.operation, signal);
			if (cancelled !== undefined) throw cancelled;
			const resources = new ArtifactResourceScope();
			let tree;
			let outcome;
			try {
				try {
					tree = await SafeOutputTree.create(plan.physical, HOST_PLATFORM.platform, {
						acceptExistingEmpty: true,
						createParents: true
					});
				} catch (cause) {
					if (cause instanceof SafeOutputTreeCreationFailure) tree = cause.tree;
					throw cause;
				}
				await write(tree);
				await tree.commit(signal);
				outcome = { kind: "completed" };
			} catch (cause) {
				outcome = {
					kind: "failed",
					cause
				};
			}
			if (tree !== undefined) {
				const released = await resources.release({
					kind: "output-tree",
					resource: plan.requested,
					tree
				});
				if (tree.published) return {
					kind: "published",
					release: released.kind === "failed" ? released : undefined,
					cancellation: outputCancellation(refusal.operation, signal)
				};
				if (released.kind === "failed") throw resources.cleanupFailure(outcome, [released]);
			}
			if (outcome.kind === "failed") throw outputDirectoryAdmissionRefusal(refusal.operation, refusal.field, outcome.cause);
			throw new Error("Output tree completed without publication");
		};
		desktopOutputFailure = (context, directory, completion, evidence) => {
			const { release, cancellation } = completion;
			if (cancellation !== undefined && evidence !== undefined) cancellation.retainPartialObservation(evidence);
			if (release === undefined) return cancellation;
			const reason = errorMessage(release.cause);
			const error = new ProviderAdapterError(context.provider, context.operation, {
				cause: release.cause,
				userMessage: `The ${context.what} was written to ${directory} and is complete, but its output handles could not be closed: ${reason}.`,
				remediationAction: `Use the written ${context.what}; the handles are released when this process exits.`,
				cleanup: {
					reason,
					resources: [directory]
				},
				...evidence === undefined ? {} : { partialObservation: evidence },
				diagnostics: { output_directory: directory }
			});
			release.lease.bindCleanupError(error);
			return cancellation === undefined ? error : analysisErrorWithCancellation(error, cancellation);
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/seedRecoveryList.js
var REGISTRY, REGISTRY_NAMESPACE, RECOVERY_LIST, withoutRecoveryList, recoveryListLimitation;
function init_seedRecoveryList() {
	return (init_seedRecoveryList = __esmMin((() => {
		init_xmlDocument();
		init_strictUtf8();
		REGISTRY = "registrymodifications.xcu";
		REGISTRY_NAMESPACE = "http://openoffice.org/2001/registry";
		RECOVERY_LIST = "/org.openoffice.Office.Recovery/RecoveryList";
		withoutRecoveryList = (home, bytes) => {
			if (home.split("/").at(-1) !== REGISTRY) return undefined;
			let text;
			try {
				text = strictUtf8Decoder("preserve").decode(bytes);
			} catch {
				return undefined;
			}
			const items = xmlElementRanges(text, (element) => element.uri === "" && element.local === "item" && element.attribute(REGISTRY_NAMESPACE, "path") === RECOVERY_LIST, { doctype: "reject" });
			if (!items.ok || items.value.length === 0) return undefined;
			let kept = "";
			let from = 0;
			for (const { start, end } of items.value) {
				kept += text.slice(from, start);
				from = end;
			}
			return Buffer.from(kept + text.slice(from), "utf8");
		};
		recoveryListLimitation = (seeds) => seeds.length === 0 ? undefined : `Left out of ${seeds.join(", ")}: LibreOffice's list of the documents it had open, written while it ran, which would start it into document recovery instead of its window.`;
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopExportFiles.js
var retainedCopies, retainedBytes, shippedSeed, shippedSeedBytes, shippedSeedViews$1, writeFiles;
function init_DesktopExportFiles() {
	return (init_DesktopExportFiles = __esmMin((() => {
		init_analysisErrorCore();
		init_desktopViewPolicy();
		init_gzipDocument();
		init_hostIdentity();
		init_seedRecoveryList();
		init_seedScrub();
		init_stateFormats();
		init_result();
		init_DesktopExportInstall();
		init_DesktopZipView();
		init_sha256Hex();
		retainedCopies = (plan, seeds) => [...[...seeds].map(([seed, { sha256, format }]) => ({
			path: `envs/${plan.name}/seed/${seed}`,
			digest: sha256,
			name: `~/${seed}`,
			seed: {
				home: seed,
				format
			}
		})), ...[...new Map(plan.aptSources.map((source) => [source.keyFile, source.keySha256]))].map(([keyFile, digest]) => ({
			path: `envs/${plan.name}/${keyFile}`,
			digest,
			name: `the apt key ${keyFile}`
		}))];
		retainedBytes = async (content, copy, signal) => {
			if (signal?.aborted === true) throw cancelledBy("export_desktop_application", signal);
			const bytes = await content.read(copy.digest, signal);
			if (!bytes.ok) throw refuse(`The retained content of ${copy.name} ${bytes.error}.`, "capture", "Capture the application again, leaving a seed file out of its state paths if it cannot be retained.");
			return bytes.value;
		};
		shippedSeed = (bytes, seed, identity) => {
			const recovered = withoutRecoveryList(seed.home, bytes);
			const scrub = scrubSeed(recovered ?? bytes, seed, identity);
			return {
				bytes: scrub.bytes ?? recovered,
				holdsIdentity: scrub.holdsIdentity,
				scrubbed: scrub.bytes !== undefined && scrub.recompressed !== true,
				recompressed: scrub.recompressed === true,
				recovered: recovered !== undefined
			};
		};
		shippedSeedBytes = async (content, copy, identity, signal) => {
			const bytes = await retainedBytes(content, copy, signal);
			return copy.seed === undefined ? bytes : shippedSeed(bytes, copy.seed, identity).bytes ?? bytes;
		};
		shippedSeedViews$1 = async (content, copies, identity, signal, policy = DESKTOP_VIEW_DEFAULTS) => {
			const views = new Map();
			for (const copy of copies) {
				const seed = copy.seed;
				if (seed === undefined || seed.format !== null && !isTextualFormat(seed.format)) continue;
				const bytes = await retainedBytes(content, copy, signal);
				const shipped = shippedSeed(bytes, seed, identity).bytes;
				if (shipped === undefined) continue;
				if (shipped.length > policy.file_bytes) {
					views.set(seed.home, {
						format: null,
						view: null,
						error: desktopViewFileLimitMessage(policy)
					});
					continue;
				}
				const document = openStateDocument(seed.home, shipped, policy);
				const { format } = document;
				const view = "error" in document ? err(document.error) : format === "zip" ? await readZipView(document.bytes, signal, policy) : isTextualFormat(format) ? textualView(format, document.bytes, policy) : undefined;
				views.set(seed.home, {
					format,
					...compressionOf(document),
					...view === undefined || view.ok ? { view: view?.value ?? null } : {
						view: null,
						error: view.error
					}
				});
			}
			return views;
		};
		writeFiles = async (tree, content, bundle, signal) => {
			const scrubbed = [];
			const recompressed = [];
			const unscrubbed = [];
			const recovered = [];
			const write = async (path, bytes, shipped) => {
				await tree.write(path, Readable.from([bytes]), {
					bytes: bytes.length,
					sha256: shipped.sha256 ?? sha256Hex(bytes)
				}, signal);
				if (shipped.holdsIdentity || identityLeftIn(path, bundle.identity) !== undefined) unscrubbed.push(path);
			};
			const generated = (file) => write(file.path, file.bytes, { holdsIdentity: file.holdsIdentity === true || identityLeftIn(file.bytes.toString("utf8"), bundle.identity) !== undefined });
			for (const file of bundle.generated) await generated(file);
			for (const copy of bundle.copies) {
				const bytes = await retainedBytes(content, copy, signal);
				const shipped = copy.seed === undefined ? undefined : shippedSeed(bytes, copy.seed, bundle.identity);
				const holdsIdentity = shipped?.holdsIdentity === true;
				if (shipped?.recovered === true) recovered.push(copy.name);
				if (shipped?.bytes === undefined) await write(copy.path, bytes, {
					sha256: copy.digest,
					holdsIdentity
				});
				else {
					if (shipped.scrubbed) scrubbed.push(copy.path);
					else if (shipped.recompressed) recompressed.push(copy.path);
					await write(copy.path, shipped.bytes, { holdsIdentity });
				}
			}
			await generated(bundle.readme({
				scrubbed,
				recompressed,
				unscrubbed: [...unscrubbed],
				recovered
			}));
			return {
				scrubbed,
				recompressed,
				unscrubbed,
				recovered
			};
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopExportWithheld.js
var OPERATION$3, SEED_MAX_BYTES$1, EMPTY_SHA256, refused, readConsent, refuseWithheldCopies, planWithheld, dconfKeys, refuseSignInDconf, readWithheld, writeWithheldCopy, refuseCopyInBundle, withheldCopy;
function init_DesktopExportWithheld() {
	return (init_DesktopExportWithheld = __esmMin((() => {
		init_analysisErrorCore();
		init_localPath();
		init_appWithheld();
		init_desktopState();
		init_desktopStateDiff();
		init_safeJson();
		init_DesktopOutputTree();
		init_DesktopRetainedContent();
		init_sha256Hex();
		OPERATION$3 = "export_desktop_application";
		SEED_MAX_BYTES$1 = 1024 * 1024 * 1024;
		EMPTY_SHA256 = createHash("sha256").digest("hex");
		refused = (field, userMessage, remediationAction) => new AnalysisInputError(OPERATION$3, {
			userMessage,
			remediationAction,
			conformsToInputContract: true
		}, [{
			path: [field],
			reason: "invalid_value",
			message: userMessage
		}]);
		readConsent = async (path) => {
			if (path === undefined) return undefined;
			const bytes = await readFile(path).catch(() => undefined);
			const parsed = bytes === undefined ? undefined : safeParseUtf8Json(bytes);
			const consent = parsed?.ok === true ? consentFileSchema.safeParse(parsed.value) : undefined;
			if (consent?.success !== true) throw refused("consent", `The consent file ${path} is not a consent record REA writes.`, "Pass the consent.json record_build_consent's records were written to.");
			return consent.data;
		};
		refuseWithheldCopies = (seeds, left) => {
			const withheld = new Map([...left].flatMap((file) => {
				const digest = seeds.get(file)?.sha256;
				return digest === undefined || digest === EMPTY_SHA256 ? [] : [[digest, file]];
			}));
			const copies = [...seeds].flatMap(([home, { sha256 }]) => {
				const original = withheld.get(sha256);
				return left.has(home) || original === undefined ? [] : [`${home} (a copy of ${original})`];
			});
			if (copies.length > 0) throw refused("withhold", `The seed holds withheld bytes under another name: ${copies.join(", ")}, so REA wrote no bundle.`, "Trash each copy in the app or the file manager before marking seed and capture again, or name it in withhold too, then export again.");
		};
		planWithheld = async (request, capture, state) => {
			const files = withheldFiles(capture.state.checkpoints, state.homePath, state.paths, request.withhold ?? {});
			if (!files.ok) throw refused("withhold", `REA cannot withhold the sign-in state: ${files.error}.`, `Mark ${SIGN_IN_START} before signing in and ${SIGN_IN_END} after it, and name only files under the owned paths.`);
			const seedFiles = [...state.seeds.keys()];
			const named = namedWithheldPaths(request.withhold?.paths ?? [], state.homePath, state.paths);
			const unmatched = (named.ok ? named.value : []).filter((path) => !seedFiles.some((file) => isWithinAny(file, [path])));
			if (unmatched.length > 0) throw refused("withhold", `${unmatched.join(", ")} names no file the seed holds, so REA cannot tell what to withhold.`, "Name each file, or the folder holding it, as the draft's files list them.");
			const consent = await readConsent(request.consent);
			const seeded = seedFiles.filter((file) => isWithinAny(file, files.value)).sort();
			const shipped = consent === undefined ? undefined : `${JSON.stringify(consent, null, 2)}\n`;
			if (request.seedWithheld === true) {
				if (consent?.consents.some(({ kind }) => kind === "seed_sign_in") !== true) throw refused("seed_withheld", "Seeding the withheld sign-in state needs the person's consent to it, and the consent file holds none.", "Ask the person whether the bundle may hold their signed-in state, record their answer with record_build_consent, kind seed_sign_in, and export again; or export without seeding it.");
				return {
					...state,
					withheld: [],
					consented: seeded,
					consent: shipped
				};
			}
			const left = new Set(seeded);
			refuseWithheldCopies(state.seeds, left);
			return {
				seeds: new Map([...state.seeds].filter(([home]) => !left.has(home))),
				textSeeds: state.textSeeds.filter((home) => !left.has(home)),
				withheld: withheldSettings(state.app, seeded),
				consented: [],
				consent: shipped
			};
		};
		dconfKeys = (version) => {
			const view = version?.present === true ? version.view : null;
			const groups = isRecord(view) ? view.groups : undefined;
			if (typeof groups !== "object" || groups === null || Array.isArray(groups)) return new Map();
			return new Map(Object.entries(groups).flatMap(([group, keys]) => isRecord(keys) ? Object.entries(keys).map(([key, value]) => [`${group}/${key}`, JSON.stringify(value)]) : []));
		};
		refuseSignInDconf = (request, state, seed) => {
			const { from, to } = request.withhold ?? {};
			if (from === undefined || to === undefined || request.seedWithheld === true) return;
			const database = state.paths.find((path) => path.format === "dconf" && path.role === "application_state");
			if (database === undefined) return;
			const at = (index) => dconfKeys(versionAt(database, index));
			const { checkpoints } = state.capture;
			const before = at(checkpoints.indexOf(from));
			const after = at(checkpoints.indexOf(to));
			const changed = [...at(seed)].filter(([key, value]) => after.get(key) !== before.get(key) && value !== before.get(key)).map(([key]) => key);
			if (changed.length > 0) throw refused("withhold", `The app's dconf keys ${changed.join(", ")} changed between ${from} and ${to}, and the seed holds them, but REA withholds files, not dconf keys, so it wrote no bundle.`, "If the person consents to ship them, record it with record_build_consent, kind seed_sign_in, and export with seed_sign_in; otherwise capture again on a new build computer, signing out of the app before marking seed.");
		};
		readWithheld = async (content, withheld, seeds, signal) => {
			const bytes = new Map();
			for (const { file } of withheld) {
				const digest = seeds.get(file)?.sha256;
				const read = digest === undefined ? undefined : await content.read(digest, signal);
				if (read?.ok !== true) throw refused("withhold", `The retained content of ~/${file} could not be read.`, "Capture again.");
				if (read.value.length > 49152) throw refused("withhold", `~/${file} holds ${String(read.value.length)} bytes, more than the ${String(MAX_WITHHELD_BYTES)} a setting can take back at run time.`, "Withhold only the file that holds the sign-in or licence, or seed it with the person's consent.");
				bytes.set(file, read.value);
			}
			return bytes;
		};
		writeWithheldCopy = (directory, files, signal) => writeOutputTree(directory, async (tree) => {
			for (const [file, bytes] of files) await tree.write(file, Readable.from([bytes]), {
				bytes: bytes.length,
				sha256: sha256Hex(bytes)
			}, signal);
		}, {
			operation: OPERATION$3,
			field: "withheld_copy"
		}, signal);
		refuseCopyInBundle = (copy, bundle) => {
			if (isPathWithinRoot(bundle.physical, copy.physical) || isPathWithinRoot(copy.physical, bundle.physical)) throw refused("withheld_copy", `The withheld copy ${copy.requested} lies in the bundle ${bundle.requested}, or holds it, so the withheld files would ship with it.`, "Name a copy folder outside the bundle's folder.");
		};
		withheldCopy = async (request, plan, captured, signal) => {
			const directory = request.withheldCopy;
			const withheld = plan.withheld ?? [];
			const bundle = await planOutputTree(request.directory, {
				operation: OPERATION$3,
				field: "directory"
			});
			const copy = directory === undefined ? undefined : await planOutputTree(directory, {
				operation: OPERATION$3,
				field: "withheld_copy"
			});
			if (copy !== undefined) refuseCopyInBundle(copy, bundle);
			if (withheld.length === 0) return {
				bundle,
				write: () => Promise.resolve(undefined)
			};
			const files = await withRetainedContent(request.capture, (content) => readWithheld(content, withheld, captured, signal), SEED_MAX_BYTES$1);
			return {
				bundle,
				write: () => copy === undefined ? Promise.resolve(undefined) : writeWithheldCopy(copy, files, signal)
			};
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopExportLimitations.js
var trashedFilesLimitation, seedLimitation, SCRUB_LIMITATION, exportLimitations;
function init_DesktopExportLimitations() {
	return (init_DesktopExportLimitations = __esmMin((() => {
		init_appExport();
		init_appExportUnowned();
		init_seedRecoveryList();
		trashedFilesLimitation = (files) => files.length === 0 ? undefined : `The desktop Trash held ${String(files.length)} file(s) at the seed checkpoint, which are not seeded: ${files.map((home) => `~/${home}`).join(", ")}. Restore one the task needs and capture again.`;
		seedLimitation = (syntheticSeed) => syntheticSeed ? "The seed was made for the task, not taken from a user's own data; read it before publishing the bundle." : "The seed is the user's real state at the seed checkpoint; keep the bundle local.";
		SCRUB_LIMITATION = "Binary state files are seeded as captured; only text files, UTF-8 or UTF-16 with a byte-order mark, and gzip documents, scrubbed inside, have the capture host's name, user@host and home path replaced. A gzip document so rewritten is compressed again as one member with no extra field, so a BGZF or dictzip file loses the blocks its index names.";
		exportLimitations = (capture, plan, facts) => {
			const opened = heldOpenLimitation(capture.state.unretained_opened_directories, capture.host.home, plan.seedFiles.flatMap((seed) => {
				const source = facts.files.get(seed)?.path;
				return source === undefined ? [] : [{
					seed,
					source
				}];
			}));
			const opens = launchDocumentLimitation(plan.opens);
			const unowned = unownedFoldersLimitation(plan.unownedFolders);
			const runtime = runtimeSeedsLimitation(plan.runtimeSeeds);
			const locks = leftOutLocksLimitation(plan.leftOutLocks);
			const recovered = recoveryListLimitation(facts.recovered);
			const trashed = trashedFilesLimitation(facts.trashed);
			return [
				seedLimitation(plan.syntheticSeed),
				SCRUB_LIMITATION,
				...opens === undefined ? [] : [opens],
				...facts.install,
				...plan.unseededFiles.length === 0 ? [] : [`${String(plan.unseededFiles.length)} file(s) under the owned paths existed at the seed but were not retained, so they are not seeded.`],
				...locks === undefined ? [] : [locks],
				...recovered === undefined ? [] : [recovered],
				...unowned === undefined ? [] : [unowned],
				...runtime === undefined ? [] : [runtime],
				...trashed === undefined ? [] : [trashed],
				...facts.identity.hostname === null || facts.identity.user === null ? ["The capture does not record the host's name and user, so only the captured home is removed from the seed; capture again to remove them too."] : [],
				...opened === undefined ? [] : [opened],
				...facts.collisions.map(({ home, kept, dropped }) => `${dropped} and ${kept} both map to ~/${home}; the export uses ${kept} and leaves out ${dropped}.`),
				...facts.task
			];
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopExportLaunch.js
var seedVersions, seedModes, capturedLaunchPaths, planLaunch;
function init_DesktopExportLaunch() {
	return (init_DesktopExportLaunch = __esmMin((() => {
		init_appExport();
		init_analysisErrorCore();
		init_appExportInstall();
		init_desktopState();
		init_desktopStateDiff();
		init_desktopEntry();
		init_seedDocument();
		init_stateFormats();
		seedVersions = (files, paths, seed, isLeftOut) => {
			const seeds = new Map();
			const textSeeds = [];
			const locks = [];
			for (const [home, path] of files) {
				const version = versionAt(path, seed);
				if (!isWithinAny(home, paths) || version?.present !== true) continue;
				if (isLeftOut(home)) locks.push(home);
				else if (version.sha256 !== null) {
					seeds.set(home, {
						sha256: version.sha256,
						format: version.format
					});
					if (isTextualFormat(version.format) && version.compression === undefined) textSeeds.push(home);
				}
			}
			return {
				seeds,
				textSeeds: textSeeds.sort(),
				locks: locks.sort()
			};
		};
		seedModes = (capture, seeds, files, seed) => {
			const modes = new Map();
			capture.state.checkpoints.forEach(({ changes }, index) => {
				for (const { path, before, after } of changes) if (index <= seed) modes.set(path, after?.mode ?? null);
				else if (!modes.has(path)) modes.set(path, before?.mode ?? null);
			});
			return Object.fromEntries([...seeds.keys()].sort().flatMap((home) => {
				const mode = modes.get(files.get(home)?.path ?? "");
				return mode === undefined || mode === null || (mode & 511) === 420 ? [] : [[home, mode & 511]];
			}));
		};
		capturedLaunchPaths = (capture, files, homeOf) => {
			const { home } = capture.host;
			const captured = new Set(files.keys());
			const remember = (absolute) => {
				if (!absolute.startsWith(`${home}/`)) return;
				const relative = absolute.slice(home.length + 1);
				captured.add(relative);
				const spelled = homeOf(absolute);
				if (spelled !== null) captured.add(spelled);
			};
			for (const entry of capture.application.state_directories) remember(entry.path);
			for (const directory of capture.state.state_directories ?? []) remember(directory);
			for (const selected of capture.state.selected_paths ?? []) {
				remember(selected.path);
				remember(selected.physical);
			}
			for (const file of files.values()) remember(file.path);
			const known = [...captured];
			return (path) => captured.has(path) || known.some((file) => isWithinAny(file, [path]));
		};
		planLaunch = (capture, electron, seeds, replay) => {
			const { application, host } = capture;
			const { files, homePath: homeOf } = replay;
			const isDocument = (home) => files.get(home)?.role === "document";
			const retained = new Map();
			for (const home of replay.restoredFiles) {
				const file = files.get(home);
				if (file !== undefined) retained.set(file.path, home);
			}
			const fileSources = [...files.values()].map((file) => file.path);
			const observedFile = (path) => fileSources.some((physical) => isWithinAny(physical, [path]));
			const mapTraversal = (path, as) => {
				const mapped = replay.launchPath(path, retained, as === "inferred" ? observedFile : undefined);
				if (mapped === null) throw new AnalysisInputError("export_desktop_application", {
					userMessage: `Captured paths under ${JSON.stringify(path)} do not agree on a replay location.`,
					remediationAction: "Capture the app again with an explicit state directory that does not traverse parent segments.",
					conformsToInputContract: true
				});
				return mapped;
			};
			const capturedDirectory = application.application_working_directory ?? application.working_directory;
			const seedDirectory = (directory) => {
				const mapped = mapTraversal(directory, "explicit");
				if (mapped?.kind === "mapped") return mapped.path === "" ? host.home : `${host.home}/${mapped.path}`;
				if (!directory.startsWith(`${host.home}/`)) return directory;
				const relative = directory.slice(host.home.length + 1);
				const seed = homeOf(directory) ?? relative;
				return seed === relative ? directory : `${host.home}/${seed}`;
			};
			const selectedSeed = application.application_working_directory === undefined ? null : homeOf(capturedDirectory);
			const workingDirectory = selectedSeed === null ? seedDirectory(capturedDirectory) : `${host.home}/${selectedSeed}`;
			const chdir = application.application_working_directory === undefined ? undefined : unwrapDesktopCommand(application.argv).chdir;
			const argv = chdir !== undefined ? [
				...application.argv.slice(0, chdir.start),
				...chdir.includesClearEnvironment ? ["-i"] : [],
				"-C",
				workingDirectory,
				...application.argv.slice(chdir.end)
			] : application.argv;
			const launch = openSeedDocument(electronLaunchArguments(argv, electron), {
				home: host.home,
				workingDirectory: capturedDirectory,
				launchDirectory: workingDirectory,
				exec: application.desktop_entry?.exec ?? null,
				documents: [...seeds.keys()].filter(isDocument).sort(),
				isDocument,
				isCaptured: capturedLaunchPaths(capture, files, homeOf),
				spell: (path) => homeOf(`${host.home}/${path}`) ?? path,
				mapOutside: homeOf,
				mapTraversal
			});
			return {
				command: launchCommand(launch.argv, host.home, seedDirectory(application.working_directory), chdir === undefined ? undefined : workingDirectory),
				opens: launch.opens
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appStateViews.js
var fileViewSchema, statePartSchema, appStateViews, renderPythonAppStateViews;
function init_appStateViews() {
	return (init_appStateViews = __esmMin((() => {
		init_jsonRecord();
		init_jsonValue();
		init_result();
		fileViewSchema = z.object({
			format: z.string().nullable(),
			view: jsonValueSchema.nullable(),
			error: z.string().nullish().transform((error) => error ?? null)
		});
		statePartSchema = z.looseObject({
			kind: z.literal("data"),
			data: z.looseObject({ state: jsonRecordSchema(fileViewSchema) })
		});
		appStateViews = (parts) => {
			for (const part of parts) {
				const parsed = statePartSchema.safeParse(part);
				if (parsed.success) return ok(new Map(Object.entries(parsed.data.data.state)));
			}
			return err("The app's data/get returned no state views; witness a bundle exported by REA, whose app serves them.");
		};
		renderPythonAppStateViews = () => {
			const { properties, required } = z.toJSONSchema(fileViewSchema, { io: "input" });
			if (properties === undefined || required === undefined) throw new TypeError("Expected the app state file view to define its fields.");
			const nullableTextFields = Object.entries(properties).filter(([, property]) => {
				const type = typeof property === "object" ? property.type : undefined;
				return Array.isArray(type) && type.includes("string");
			}).map(([field]) => field);
			return String.raw`
_STATE_REQUIRED_FIELDS = ${JSON.stringify(required)}
_STATE_TEXT_FIELDS = ${JSON.stringify(nullableTextFields)}


def _valid_state_json(state) -> bool:
    # Stack of iterators avoids copying the decoded reply or relying on Python's
    # recursion limit. The state map is the root of the same bound as in REA.
    frames = [iter((state,))]
    while frames:
        value = next(frames[-1], MISSING)
        if value is MISSING:
            frames.pop()
            continue
        if len(frames) - 1 > ${String(MAX_JSON_DEPTH)}:
            return False
        if isinstance(value, dict):
            if not all(isinstance(key, str) for key in value):
                return False
            frames.append(iter(value.values()))
        elif isinstance(value, list):
            frames.append(iter(value))
        elif isinstance(value, (int, float)):
            try:
                if not math.isfinite(value):
                    return False
            except OverflowError:
                return False
        elif value is not None and not isinstance(value, str):
            return False
    return True


def _app_state_views(parts):
    for part in parts:
        if part.kind != "data":
            continue
        data = getattr(part, "data", None)
        state = data.get("state") if isinstance(data, dict) else None
        if not isinstance(state, dict):
            continue
        if all(isinstance(view, dict)
               and all(field in view for field in _STATE_REQUIRED_FIELDS)
               and all(view.get(field) is None or isinstance(view[field], str) for field in _STATE_TEXT_FIELDS)
               for view in state.values()) and _valid_state_json(state):
            return state
    return None
`;
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskPythonPointer.js
var PYTHON_POINTER;
function init_appTaskPythonPointer() {
	return (init_appTaskPythonPointer = __esmMin((() => {
		init_viewSelector();
		PYTHON_POINTER = String.raw`def _is_element(value) -> bool:
    return (isinstance(value, dict) and isinstance(value.get("name"), str) and isinstance(value.get("attributes"), dict)
            and isinstance(value.get("children"), list))


def _element_text(element, attribute=None, omit_stamps=False) -> str:
    """An element's text as XPath's string() reads it from what the view keeps: every text node among its children
    and its descendants', in document order. With attribute, the values of that attribute on it and its descendants
    instead, in document order, and no text node. With omit_stamps, skip text nodes recognized as save times."""
    parts, pending = [], [element]
    while pending:
        node = pending.pop()
        if isinstance(node, str):
            if attribute is None and (not omit_stamps or not _is_saved_time(node)):
                parts.append(node)
        elif _is_element(node):
            if attribute is not None and isinstance(node["attributes"].get(attribute), str):
                parts.append(node["attributes"][attribute])
            pending.extend(reversed(node["children"]))
    return "".join(parts)


def _bracketed(token: str) -> bool:
    return len(token) >= 2 and token.startswith("[") and token.endswith("]")


def _selector(token: str):
    """A selector's conditions, [KEY=VALUE], [@KEY=VALUE] or [>PATH=VALUE] one or more times, or None when the token
    is not one, or a path has an empty step or more than ${String(3)}."""
    if not _bracketed(token):
        return None
    conditions = []
    for part in token[1:-1].split("]["):
        key, equals, value = part.partition("=")
        prefix = key[:1] if key[:1] in ("@", ">") else ""
        name = key[len(prefix):]
        steps = name.split("/")
        if not equals or not name or (prefix == ">" and (len(steps) > ${String(3)} or "" in steps)):
            return None
        conditions.append((prefix, name, value))
    return conditions


_ISO_STAMP = re.compile(
    r"^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(?::\d{2}(?:[.,]\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?$", re.ASCII
)
_ASCTIME_STAMP = re.compile(
    r"^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) [ 0-3]?\d \d{2}:\d{2}:\d{2} \d{4}$", re.ASCII
)


def _is_saved_time(text: str) -> bool:
    stripped = _trim(text)
    return _ISO_STAMP.fullmatch(stripped) is not None or _ASCTIME_STAMP.fullmatch(stripped) is not None


def _text_without_stamps(node) -> str:
    """An element's text with save-time leaves removed, matching the selector that named it."""
    return _element_text(node, omit_stamps=True)


def _condition_text(child) -> str:
    """A child's text as a condition reads it: whitespace collapsed, without a nested save time unless it is only
    a time."""
    plain = _collapse_whitespace(_text_without_stamps(child))
    return plain if plain else _collapse_whitespace(_element_text(child))


def _element_holds(element, steps, value: str) -> bool:
    """Whether an element has a child element named the first step that holds value along the rest: at the last step
    its text, whitespace collapsed, or with NAME@ATTR its attribute ATTR. Each element on the way is visited once."""
    step, rest = steps[0], steps[1:]
    name, at, attribute = step.partition("@") if not rest else (step, "", "")
    for child in element["children"]:
        if not _is_element(child) or child["name"] != name:
            continue
        if rest:
            if _element_holds(child, rest, value):
                return True
        elif at:
            if child["attributes"].get(attribute) == value:
                return True
        elif _condition_text(child) == value:
            return True
    return False


def _holds_inside(member, path: str, value: str, form) -> bool:
    """Whether a >PATH condition's path inside a member holds value: in an XML element as _element_holds reads it, in
    a JSON record the string at those keys."""
    steps = path.split("/")
    if form == "xml":
        return _is_element(member) and (
            _collapse_whitespace(_element_text(member)) == value if steps == ["text()"]
            else _element_holds(member, steps, value)
        )
    found = member
    for step in steps:
        if not isinstance(found, dict) or step not in found:
            return False
        found = found[step]
    return isinstance(found, str) and found == value


def _selects(member, conditions, form) -> bool:
    """Whether an array member meets every condition; selectors compare strings only."""
    if not isinstance(member, dict):
        return False
    for prefix, key, value in conditions:
        if prefix == ">":
            if not _holds_inside(member, key, value, form):
                return False
            continue
        fields = member.get("attributes") if prefix == "@" else member
        if not isinstance(fields, dict) or not isinstance(fields.get(key), str) or fields[key] != value:
            return False
    return True


def _step(items: list, token: str, last: bool, form):
    """One step into an array, by index or by a selector that must match one member, or none when it is the last."""
    if INDEX.fullmatch(token):
        # A canonical decimal longer than the array length cannot name a member.
        if len(token) > len(str(len(items))):
            return "none", None
        index = int(token)
        return ("member", items[index]) if index < len(items) else ("none", None)
    conditions = _selector(token)
    if conditions is None:
        return ("unresolved", f"{token} is not a selector of the form [KEY=VALUE]") if _bracketed(token) else (
            "none", None)
    matched = [item for item in items if _selects(item, conditions, form)]
    if len(matched) == 1:
        return "member", matched[0]
    if len(matched) > 1:
        return "unresolved", f"{token} matches {len(matched)} members, not one"
    return ("none" if last else "unresolved"), f"{token} matches no member"


def _locate(view, pointer: str, form):
    """Where a pointer leads: ("value", value), ("none", why or None) or ("unresolved", problem), with the pointers
    to the arrays a selector searched on the way."""
    current, searched = view, []
    root_form = form
    segments = pointer[1:].split("/")
    for position, segment in enumerate(segments):
        token = segment.replace("~1", "/").replace("~0", "~")
        if isinstance(current, list):
            if not INDEX.fullmatch(token) and _selector(token) is not None:
                searched.append("".join("/" + part for part in segments[:position]))
            kind, found = _step(current, token, position == len(segments) - 1, form)
            if kind != "member":
                return kind, found, searched
            current = found
        elif isinstance(current, dict) and token in current:
            if root_form == "zip" and position == 2 and segments[0] == "entries" and token == "view":
                form = current.get("format")
            current = current[token]
        else:
            return "none", None, searched
    return "value", current, searched
`;
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskReaders.js
var READER_RUNNER_SLACK_S, PYTHON_READER_RUNNER, PYTHON_READER_CLEANUP, readerCommand, readerArguments, readerArgumentChunks, readerTimeout, answerSchema, readerAnswerView, PYTHON_READER_VIEWS, renderReaderConstants;
function init_appTaskReaders() {
	return (init_appTaskReaders = __esmMin((() => {
		init_jsonValue();
		init_appTask();
		init_pythonExactJsonNumber();
		READER_RUNNER_SLACK_S = 30;
		PYTHON_READER_RUNNER = String.raw`"""REA's reader runner: one task reader, an app's own headless command, run on a private copy of a file.

It joins its JSON argument chunks and prints one JSON line: {"view": ...}, {"absent": true} when the file is not there, or
{"error": ...}. The command runs in a temporary folder with a fresh home, without the desktop's display (unless the
reader asks for it), the session bus or the computer's AGENTENV_ variables, so it reads none of the user's settings,
cannot hand the file to the running app and holds no control token; it can change only its copy, which goes with the
folder. Lines it prints starting with MARKER make its view; everything else it prints is left out.
"""
import json
import math
import os
import re
import shutil
import signal
import stat
import subprocess
import sys
import tempfile
import threading
import time

MARKER = "REA "
PLACEHOLDER = "{file}"
OUTPUT_BYTES = 1 << 20
ANSWER_BYTES = OUTPUT_BYTES - (64 << 10)
STDERR_BYTES = 1024
#: How often the runner looks whether the reader exited, and how long it waits for its streams to close after.
POLL_S = 0.05
DRAIN_S = 2.0
MAX_LINES = 5000
MAX_SAFE_INTEGER = 2**53 - 1
SESSION = ("DISPLAY", "WAYLAND_DISPLAY", "XAUTHORITY")
NEVER = ("DBUS_SESSION_BUS_ADDRESS", "SESSION_MANAGER", "XDG_RUNTIME_DIR")
FRESH = (("XDG_CONFIG_HOME", ".config"), ("XDG_DATA_HOME", ".local/share"), ("XDG_CACHE_HOME", ".cache"),
         ("XDG_STATE_HOME", ".local/state"))


${PYTHON_EXACT_JSON_NUMBER}

def _say(answer: dict) -> int:
    line = json.dumps(answer)
    if len(line) > ANSWER_BYTES:
        line = json.dumps({"error": f"the reader's view is larger than the {ANSWER_BYTES >> 10} KiB an answer holds"})
    print(line, flush=True)
    return 0


def _environment(home: str, display: bool) -> dict:
    """The session's environment without what ties a command to the session or the computer, in a fresh home."""
    kept = {name: value for name, value in os.environ.items()
            if not name.startswith("AGENTENV_") and name not in NEVER and (display or name not in SESSION)}
    if display and "XAUTHORITY" not in kept and os.path.isfile(os.path.expanduser("~/.Xauthority")):
        kept["XAUTHORITY"] = os.path.expanduser("~/.Xauthority")
    kept["HOME"] = home
    for name, folder in FRESH:
        kept[name] = os.path.join(home, folder)
    return kept


def _not_json(text: str):
    raise ValueError(f"{text} is not JSON")


def _view(output: str, lines: list) -> dict:
    if output == "lines":
        return {"view": {"format": "text", "view": {"lines": lines[:MAX_LINES], "line_count": len(lines),
                                                    "truncated": len(lines) > MAX_LINES}}}
    try:
        value = json.loads("\n".join(lines), parse_int=_number_or_mark, parse_float=_number_or_mark, parse_constant=_not_json)
    except (ValueError, RecursionError) as error:
        return {"error": f"the reader's marked lines are not one JSON value: {error}"}
    if _holds_inexact(value):
        return {"error": "a number in the reader's view cannot be read exactly, such as an integer above 2^53"}
    return {"view": {"format": "json", "view": value}}


def _tail(stderr: bytearray) -> str:
    text = bytes(stderr).decode("utf-8", "replace").strip()
    return f"; its stderr ends: {text}" if text else ""


def _drain(stream, kept: bytearray, limit: int, tail: bool, full: threading.Event) -> None:
    """Read a stream to its end holding at most limit bytes: the first, setting full past them, or the last."""
    while chunk := stream.read1(1 << 16):
        kept += chunk
        if tail:
            del kept[:-limit]
        elif len(kept) > limit:
            del kept[limit + 1:]
            full.set()


def _feed(stream, text) -> None:
    try:
        if text is not None:
            stream.write(text.encode())
        stream.close()
    except OSError:
        pass


def _run(arguments: dict, source: str, work: str) -> dict:
    # The copy has a folder of its own, so no file name meets the runner's home.
    copy = os.path.join(work, "file", arguments["name"])
    os.makedirs(os.path.dirname(copy))
    shutil.copyfile(source, copy)
    home = os.path.join(work, "home")
    os.makedirs(home)
    argv = [part.replace(PLACEHOLDER, copy) for part in arguments["argv"]]
    stdin = arguments.get("stdin")
    timeout = arguments["timeout_s"]
    try:
        process = subprocess.Popen(argv, cwd=os.path.dirname(copy), env=_environment(home, arguments.get("display") is True),
                                   stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                                   start_new_session=True)
    except OSError as error:
        return {"error": f"could not start {argv[0]}: {error.strerror or error}"}
    printed, stderr, full = bytearray(), bytearray(), threading.Event()
    threads = [threading.Thread(target=_drain, args=(process.stdout, printed, OUTPUT_BYTES, False, full), daemon=True),
               threading.Thread(target=_drain, args=(process.stderr, stderr, STDERR_BYTES, True, full), daemon=True),
               threading.Thread(target=_feed, args=(process.stdin, None if stdin is None else stdin.replace(PLACEHOLDER, copy)),
                                daemon=True)]
    for thread in threads:
        thread.start()
    deadline = time.monotonic() + timeout
    try:
        while process.poll() is None and not full.is_set() and time.monotonic() < deadline:
            time.sleep(POLL_S)
        timed_out = process.poll() is None and not full.is_set()
    finally:
        # The app may leave helpers running, such as a document server: end its whole session.
        try:
            os.killpg(process.pid, signal.SIGKILL)
        except (ProcessLookupError, PermissionError):
            pass
        process.wait()
        for thread in threads:
            thread.join(DRAIN_S)
    if full.is_set():
        return {"error": "the reader printed more than 1 MiB"}
    if timed_out:
        return {"error": f"the reader ran past its {timeout} s{_tail(stderr)}"}
    if process.returncode != 0:
        return {"error": f"the reader exited {process.returncode}{_tail(stderr)}"}
    # Unmarked startup text is not observation data. Decode only marked rows,
    # without replacing malformed bytes with characters the reader never gave.
    try:
        marker = MARKER.encode("ascii")
        lines = [line[len(marker):].removesuffix(b"\r").decode("utf-8")
                 for line in printed.split(b"\n") if line.startswith(marker)]
    except UnicodeDecodeError:
        return {"error": "the reader's marked output is not valid UTF-8"}
    if not lines:
        return {"error": f"the reader printed no line starting with {json.dumps(MARKER)}{_tail(stderr)}"}
    return _view(arguments["output"], lines)


def main(arguments: dict) -> int:
    home = os.path.expanduser("~")
    source = arguments["path"] if os.path.isabs(arguments["path"]) else os.path.join(home, arguments["path"])
    try:
        mode = os.stat(source).st_mode
    except (FileNotFoundError, NotADirectoryError):
        return _say({"absent": True})
    except OSError as error:
        return _say({"error": f"cannot inspect the reader's source: {error.strerror or error}"})
    if not stat.S_ISREG(mode):
        return _say({"error": "the reader's source is not a regular file"})
    # A remote caller owns this exact folder before starting the command, and
    # removes it only after the command has settled.
    lease = arguments.get("lease")
    if lease is not None:
        work = lease["path"]
        os.mkdir(work, 0o700)
        with open(work + ".owner", "x", encoding="ascii") as owner:
            owner.write(lease["token"])
        return _say(_run(arguments, source, work))
    # A caller that names a work folder removes it itself, even when this runner is killed.
    work = os.path.realpath(tempfile.mkdtemp(prefix="rea-reader-", dir=arguments.get("work")))
    try:
        return _say(_run(arguments, source, work))
    finally:
        shutil.rmtree(work, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main(json.loads("".join(sys.argv[1:]))))
`;
		PYTHON_READER_CLEANUP = String.raw`
import json, os, shutil, sys
lease = json.loads(sys.argv[1])
path = lease["path"]
marker = path + ".owner"
if os.path.lexists(path) or os.path.lexists(marker):
    with open(marker, encoding="ascii") as owner:
        if owner.read() != lease["token"]:
            raise RuntimeError("reader folder ownership does not match")
    if os.path.lexists(path):
        shutil.rmtree(path)
    os.unlink(marker)
`;
		readerCommand = (reader, path, work, lease) => [
			"python3",
			"-I",
			"-c",
			PYTHON_READER_RUNNER,
			...readerArgumentChunks(reader, path, work, lease)
		];
		readerArguments = (reader, path, work, lease) => JSON.stringify({
			id: reader.id,
			path: path ?? reader.file,
			name: reader.file.split("/").at(-1) ?? reader.file,
			argv: reader.argv,
			stdin: reader.stdin ?? null,
			output: reader.output,
			timeout_s: readerTimeout(reader),
			display: reader.display ?? false,
			...work === undefined ? {} : { work },
			...lease === undefined ? {} : { lease }
		});
		readerArgumentChunks = (reader, path, work, lease) => {
			const characters = Array.from(readerArguments(reader, path, work, lease));
			const chunks = [];
			for (let index = 0; index < characters.length; index += 8192) chunks.push(characters.slice(index, index + 8192).join(""));
			return chunks;
		};
		readerTimeout = (reader) => reader.timeout_s ?? READER_TIMEOUT_S.default;
		answerSchema = z.union([
			z.strictObject({ absent: z.literal(true) }),
			z.strictObject({ error: z.string() }),
			z.strictObject({ view: z.union([z.strictObject({
				format: z.literal("json"),
				view: jsonValueSchema
			}), z.strictObject({
				format: z.literal("text"),
				view: z.strictObject({
					lines: z.array(z.string()),
					line_count: z.int().nonnegative(),
					truncated: z.boolean()
				})
			})]) })
		]);
		readerAnswerView = (stdout) => {
			const last = stdout.trim().split("\n").at(-1) ?? "";
			let parsed;
			try {
				parsed = JSON.parse(last);
			} catch {
				parsed = undefined;
			}
			const answer = answerSchema.safeParse(parsed);
			if (!answer.success) throw new Error(`REA's reader runner did not answer; it printed: ${stdout.slice(-512)}`);
			const { data } = answer;
			if ("absent" in data) return undefined;
			if ("error" in data) return {
				format: null,
				view: null,
				error: data.error
			};
			return data.view;
		};
		PYTHON_READER_VIEWS = String.raw`

# agentenv loads a fresh verifier module for every execution. Keep abandoned
# leases in the hosting process, so a later module can retry their cleanup.
_reader_registry = sys.modules.setdefault("_rea_desktop_reader_leases_v1", types.ModuleType("_rea_desktop_reader_leases_v1"))
_PENDING_READERS = _reader_registry.__dict__.setdefault("pending", {})


def _owned_task(awaitable):
    task = asyncio.create_task(awaitable)
    task.add_done_callback(lambda done: None if done.cancelled() else done.exception())
    return task


async def _finish_reader(env_url, card, pending):
    if not pending["settled"]:
        if pending["task"].cancelled():
            raise RuntimeError(f"Reader {pending['request_id']} has an unknown outcome; retained {pending['lease']['path']}")
        try:
            result = await asyncio.shield(pending["task"])
        except Exception as error:
            raise RuntimeError(f"Reader {pending['request_id']} may still own {pending['lease']['path']}: {error}") from error
        if not isinstance(result, dict) or result.get("timed_out"):
            raise RuntimeError(f"Reader {pending['request_id']} may still be running; retained {pending['lease']['path']}")
        pending["settled"] = True
    if pending.get("cleanup_uncertain"):
        raise RuntimeError(f"Cleanup may still be running; retained {pending['lease']['path']}")
    pending.setdefault("cleanup_id", f"rea-reader-cleanup-{uuid.uuid4().hex}")
    cleanup = {"argv": ["python3", "-I", "-c", READER_CLEANUP, json.dumps(pending["lease"])],
               "request_id": pending["cleanup_id"], "timeout_s": RUNNER_SLACK_S}
    if "cleanup_task" not in pending:
        pending["cleanup_task"] = _owned_task(
            protocol.invoke_extension(env_url, card, EXEC, cleanup, method="run", timeout=2 * RUNNER_SLACK_S))
    if pending["cleanup_task"].cancelled():
        raise RuntimeError(f"Cleanup has an unknown outcome; retained {pending['lease']['path']}")
    try:
        answer = await asyncio.shield(pending["cleanup_task"])
    except Exception as error:
        pending.pop("cleanup_task", None)
        raise RuntimeError(f"Cleanup of owned reader folder {pending['lease']['path']} is unconfirmed: {error}") from error
    if not isinstance(answer, dict) or answer.get("timed_out"):
        pending["cleanup_uncertain"] = True
        raise RuntimeError(f"Cleanup may still be running; retained {pending['lease']['path']}")
    if answer.get("exit_code") != 0:
        pending.pop("cleanup_id", None)
        pending.pop("cleanup_task", None)
        raise RuntimeError(f"Could not remove owned reader folder {pending['lease']['path']}: {answer}")


async def _cleanup_readers(env_url, card, current=None):
    for token, pending in list(_PENDING_READERS.items()):
        if pending["env_url"] != env_url or (not pending["abandoned"] if current is None else token != current):
            continue
        if "finishing" not in pending:
            pending["finishing"] = _owned_task(_finish_reader(env_url, card, pending))
        if pending["finishing"].cancelled():
            raise RuntimeError(f"Reader cleanup has an unknown outcome; retained {pending['lease']['path']}")
        try:
            await asyncio.shield(pending["finishing"])
        except Exception:
            pending.pop("finishing", None)
            raise
        _PENDING_READERS.pop(token, None)


async def _reader_views(env_url, card):
    """Each reader's view of its file, by its id, read by REA's reader runner in the computer; a file the home lacks
    has none. A runner that does not answer raises, so the run fails rather than scoring the agent."""
    if not READERS:
        return {}
    if protocol.find_extension(card, EXEC) is None:
        raise RuntimeError(f"the computer at {env_url} offers no {EXEC}, which runs the task's readers")
    await _cleanup_readers(env_url, card)
    views, absent = {}, []
    try:
        for reader in READERS:
            token = uuid.uuid4().hex
            lease = {"path": f"/tmp/rea-reader-{token}", "token": token}
            arguments = json.loads("".join(reader["arguments"]))
            arguments["lease"] = lease
            encoded = json.dumps(arguments)
            params = {"argv": ["python3", "-I", "-c", READER_RUNNER,
                               *(encoded[i:i + 8192] for i in range(0, len(encoded), 8192))],
                      "request_id": f"rea-reader-{token}",
                      "timeout_s": reader["timeout_s"] + RUNNER_SLACK_S}
            task = _owned_task(protocol.invoke_extension(
                env_url, card, EXEC, params, method="run", timeout=reader["timeout_s"] + 2 * RUNNER_SLACK_S))
            _PENDING_READERS[token] = {"env_url": env_url, "lease": lease, "task": task,
                                       "request_id": params["request_id"], "settled": False, "abandoned": False}
            try:
                answer = await asyncio.shield(task)
            except BaseException as error:
                _PENDING_READERS[token]["abandoned"] = True
                error.add_note(f"Reader command {params['request_id']} and folder {lease['path']} remain owned for retry.")
                raise
            if not isinstance(answer, dict) or answer.get("timed_out"):
                _PENDING_READERS[token]["abandoned"] = True
                raise RuntimeError(f"Reader {params['request_id']} may still be running; retained {lease['path']}")
            _PENDING_READERS[token]["settled"] = True
            failure = None
            try:
                view = _reader_answer(reader["id"], answer)
                if view is None:
                    absent.append(reader["id"])
                else:
                    views[reader["id"]] = view
            except BaseException as error:
                failure = error
            try:
                await _cleanup_readers(env_url, card, token)
            except BaseException as error:
                _PENDING_READERS[token]["abandoned"] = True
                if failure is not None:
                    if isinstance(error, asyncio.CancelledError):
                        error.add_note(f"Reader cleanup remains owned for {lease['path']}; reader failure: {type(failure).__name__}: {failure}")
                        raise error from failure
                    failure.add_note(f"Reader cleanup remains owned for {lease['path']}: {type(error).__name__}: {error}")
                    raise failure from error
                error.add_note(f"Reader cleanup remains owned for {lease['path']}")
                raise
            if failure is not None:
                raise failure
        return views
    except BaseException as error:
        error.add_note(f"completed reader views: {json.dumps(views)}; completed reader absent: {json.dumps(absent)}")
        raise


def evaluate_with_readers(checks: list, views: dict, readers: dict) -> list:
    """One result per check as evaluate gives it, a check with reader graded on that reader's view of its file."""
    results = []
    for check in checks:
        entry = views.get(check["file"]) if check.get("reader") is None else readers.get(check["reader"])
        passed, description = _verdict(check, entry)
        results.append({"id": check["id"], "result": passed, "description": description})
    return results


def _reader_answer(name, answer):
    """The view the runner's last line gives: None for an absent file, one with an error for a failed reader."""
    stdout = answer.get("stdout") if isinstance(answer, dict) and isinstance(answer.get("stdout"), str) else ""
    try:
        said = json.loads(stdout.strip().split("\n")[-1])
    except ValueError:
        said = None
    if isinstance(answer, dict) and answer.get("exit_code") == 0 and isinstance(said, dict):
        if said == {"absent": True}:
            return None
        if set(said) == {"error"} and isinstance(said["error"], str):
            return {"format": None, "view": None, "error": said["error"]}
        view = said.get("view") if set(said) == {"view"} else None
        if isinstance(view, dict) and view.get("format") in ("json", "text") and "view" in view:
            return view
    raise RuntimeError(f"REA's reader runner did not answer for {name}; it printed: {stdout[-512:]}")
`;
		renderReaderConstants = (readers) => `#: The computer route the readers run through, and how long past a reader's own timeout its runner may take.
EXEC = "urn:agentenv:computer-exec/v1"
RUNNER_SLACK_S = ${String(30)}
#: REA's reader runner, which runs each reader on a private copy of its file in a fresh home.
READER_RUNNER = ${JSON.stringify(PYTHON_READER_RUNNER)}
READER_CLEANUP = ${JSON.stringify(PYTHON_READER_CLEANUP)}
READERS = [
${readers.map((reader) => `    {"id": ${JSON.stringify(reader.id)}, "arguments": ${JSON.stringify(readerArgumentChunks(reader, undefined))}, "timeout_s": ${String(readerTimeout(reader))}},`).join("\n")}
]
`;
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskScreen.js
var DEFAULT_JUDGE_MODEL, SCREEN_SETTLE_MS, SCREEN_EXAMPLE_MAX_BYTES, SCREEN_JUDGE_VOTES, isScreenTask, readable, readableChanges, EXAMPLES_LINE, screenExamplesOf, PYTHON_SCREEN_JUDGE, renderScreenVerifier;
function init_appTaskScreen() {
	return (init_appTaskScreen = __esmMin((() => {
		init_jsonValue();
		DEFAULT_JUDGE_MODEL = "anthropic/claude-sonnet-5-5";
		SCREEN_SETTLE_MS = 1e3;
		SCREEN_EXAMPLE_MAX_BYTES = 2 * 1024 * 1024;
		SCREEN_JUDGE_VOTES = 3;
		isScreenTask = (task) => task.checks.some(({ kind }) => kind === "screen_judge");
		readable = (view) => view === undefined || view.format !== null && view.format !== "binary" && typeof view.error !== "string";
		readableChanges = (seed, end) => [...new Set([...seed.keys(), ...end.keys()])].filter((file) => {
			const [before, after] = [seed.get(file), end.get(file)];
			return readable(before) && readable(after) && (before === undefined !== (after === undefined) || !equalJsonValues(before?.view ?? null, after?.view ?? null));
		}).sort();
		EXAMPLES_LINE = /^EXAMPLES = (\{.*\})$/mu;
		screenExamplesOf = (verifier) => {
			const line = EXAMPLES_LINE.exec(verifier)?.[1];
			if (line === undefined) return undefined;
			try {
				const parsed = JSON.parse(line);
				if (typeof parsed === "object" && parsed !== null && "fail" in parsed && "pass" in parsed && typeof parsed.fail === "string" && typeof parsed.pass === "string") return {
					fail: parsed.fail,
					pass: parsed.pass
				};
			} catch {}
			return undefined;
		};
		PYTHON_SCREEN_JUDGE = String.raw`
#: Calls a vote makes before the judge counts as not answering.
ATTEMPTS = 3
VERDICT = {"type": "object", "additionalProperties": False, "required": ["verdict", "reason"],
           "properties": {"verdict": {"type": "boolean"}, "reason": {"type": "string"}}}
INSTRUCTIONS = ("You check a desktop app's screen against one yes-or-no question. Answer from the screenshot alone: when "
                "it does not show the answer, the verdict is false. Two labelled screenshots of the same app come first.")


def _image(data: str) -> dict:
    return {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64," + data}}


def _endpoint():
    """The judge's model and the call's settings; no endpoint raises, so the run fails rather than scoring."""
    config = get_config()
    model = config.get_model_for_role("judge") or DEFAULT_JUDGE_MODEL
    try:
        config.get_litellm_base_url()
        settings = config.resolve_model_call(model).client_kwargs()
    except Exception as error:
        raise RuntimeError(f"the screen judge has no model endpoint: {error}") from error
    return model, settings


async def _vote(model: str, settings: dict, question: str, screenshot: str):
    content = [{"type": "text", "text": INSTRUCTIONS},
               {"type": "text", "text": f"The app before the task; for the question {json.dumps(question)} the verdict is false:"},
               _image(EXAMPLES["fail"]),
               {"type": "text", "text": "The app with the task done; the verdict is true:"},
               _image(EXAMPLES["pass"]),
               {"type": "text", "text": f"Question: {question}\nThe screenshot to judge:"},
               _image(screenshot)]
    failure = None
    for _ in range(ATTEMPTS):
        try:
            response = await litellm.acompletion(
                model=model, messages=[{"role": "user", "content": content}],
                response_format={"type": "json_schema", "json_schema": {"name": "screen_judge", "schema": VERDICT,
                                                                        "strict": True}}, **settings)
            answer = json.loads(response.choices[0].message.content or "")
            if isinstance(answer, dict) and isinstance(answer.get("verdict"), bool):
                return answer["verdict"], str(answer.get("reason", ""))
            failure = ValueError(f"the judge answered {answer!r}")
        except Exception as error:
            failure = error
    raise RuntimeError(f"the screen judge did not answer: {failure}")


async def judge_screen(check, screenshot: str) -> dict:
    """One check's result on a screenshot, base64 JPEG: it passes when most of VOTES votes say yes."""
    model, settings = _endpoint()
    votes = [await _vote(model, settings, check["question"], screenshot) for _ in range(VOTES)]
    yes = sum(1 for verdict, _ in votes if verdict)
    passed = 2 * yes > VOTES
    reason = next(reason for verdict, reason in votes if verdict == passed)
    said = yes if passed else VOTES - yes
    return {"id": check["id"], "result": passed,
            "description": f"the judge ({model}) said {'yes' if passed else 'no'} in {said} of {VOTES} votes: {reason}"}


async def _screenshot(mcp_url: str) -> str:
    async with ToolSession(mcp_url=mcp_url) as session:
        shot = await session.call_tool("computer_screenshot", {"format": "jpeg", "quality": 70})
    images = [block for block in shot.content if block.get("type") == "image"]
    if shot.isError or not images:
        raise RuntimeError("the computer took no screenshot for the screen judge")
    return images[0]["data"]


async def verify(mcp_url, env_url):
    await asyncio.sleep(SCREEN_SETTLE_S)
    screenshot = await _screenshot(mcp_url)
    return [await judge_screen(check, screenshot) for check in CHECKS]


if __name__ == "__main__":
    # REA's witness runs the judge on a screenshot it took: judge <check as JSON> <JPEG file>.
    with open(sys.argv[3], "rb") as handle:
        shot = base64.b64encode(handle.read()).decode()
    print(json.dumps(asyncio.run(judge_screen(json.loads(sys.argv[2]), shot))))
`;
		renderScreenVerifier = (task, app, examples) => `"""Checks of the task ${task.name} against the ${app} app's screen, exported by REA from a desktop application capture.

It takes a screenshot of the computer's display through its MCP tools and asks a model, the judge, each check's
yes-or-no question about it VOTES times, after two labelled examples from the build: the screen at the seed, where the
answer is no, and at the end, where it is yes. A check passes when most votes say yes. The judge's model is the runner
config's [model.roles] judge, else its [model] default, else DEFAULT_JUDGE_MODEL, called through LITELLM_BASE_URL and
LITELLM_API_KEY or [model] base_url and api_key; agent-env run's --judge-model does not reach it. Without an endpoint it
raises, so the run fails rather than scoring the agent.
"""
import asyncio
import base64
import json
import sys

import litellm
from agent_env.config import get_config
from agentenv_protocol.tool_client import ToolSession

APP = ${JSON.stringify(app)}
CHECKS = [
${task.checks.map((check) => `    ${JSON.stringify(check)},`).join("\n")}
]
VOTES = ${String(3)}
#: Seconds the display is left to draw the agent's last action before the screenshot.
SCREEN_SETTLE_S = ${(SCREEN_SETTLE_MS / 1e3).toFixed(1)}
DEFAULT_JUDGE_MODEL = ${JSON.stringify(DEFAULT_JUDGE_MODEL)}
#: The build's screenshots, base64 JPEG: the seed's, where the answer is no, and the end's, where it is yes.
EXAMPLES = ${JSON.stringify({
			fail: examples.fail,
			pass: examples.pass
		})}
${PYTHON_SCREEN_JUDGE}`;
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskPython.js
var PYTHON_TASK_EVALUATOR, pythonLiteral, pythonSeconds, PYTHON_SETTLE, sameTaskVerifier, renderTaskVerifier, renderFileVerifier, taskVerifierArtifact, renderTaskSteps, renderTaskEval;
function init_appTaskPython() {
	return (init_appTaskPython = __esmMin((() => {
		init_appSettle();
		init_appStateViews();
		init_appTaskPythonPointer();
		init_desktopTextSyntax();
		init_appTaskReaders();
		init_appTaskScreen();
		PYTHON_TASK_EVALUATOR = String.raw`
MISSING = object()
INDEX = re.compile(r"0|[1-9][0-9]*")
VIEW_FORMATS = ("text", "json", "keyfile", "xml")
NUMERAL = re.compile(r"[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?")
WHITESPACE_RUN = re.compile(r"[ \t\r\n]+")


def _trim(text: str) -> str:
    """ECMAScript String.trim(), as REA uses for numeral and saved-time recognition."""
    return text.strip(${PYTHON_ECMASCRIPT_TRIM_CHARACTERS})


def _shown(value) -> str:
    text = json.dumps(value, ensure_ascii=False, separators=(",", ":"))
    return text if len(text) <= 200 else text[:200] + "…"


def _same(actual, expected) -> bool:
    """JSON equality: numbers by value but never a boolean for a number, objects by their keys, arrays in order."""
    if isinstance(expected, list):
        return (isinstance(actual, list) and len(actual) == len(expected)
                and all(_same(item, wanted) for item, wanted in zip(actual, expected)))
    if isinstance(expected, dict):
        return (isinstance(actual, dict) and len(actual) == len(expected)
                and all(key in actual and _same(actual[key], value) for key, value in expected.items()))
    if isinstance(expected, bool) or isinstance(actual, bool):
        return isinstance(expected, bool) and isinstance(actual, bool) and actual == expected
    if isinstance(expected, (int, float)):
        return isinstance(actual, (int, float)) and actual == expected
    return type(actual) is type(expected) and actual == expected


${PYTHON_POINTER}

def _number(value):
    """A number, or a whitespace-trimmed numeral; None for anything else, a boolean, or a numeral past the doubles."""
    if isinstance(value, bool):
        return None
    if isinstance(value, (int, float)):
        return value
    if not isinstance(value, str):
        return None
    value = _trim(value)
    if not NUMERAL.fullmatch(value):
        return None
    number = float(value)
    return number if math.isfinite(number) else None


def _entry_leaves_out(entry) -> bool:
    return isinstance(entry, dict) and (isinstance(entry.get("view_error"), str) or (
        entry.get("format") in ("text", "xml") and isinstance(entry.get("view"), dict)
        and entry["view"].get("truncated") is True))


def _viewless_entry(view, pointer: str):
    """The name of the entry whose view a pointer goes into when it has none, so its null is no JSON value, and
    why: binary, unread, or of a format without a view; None when it has one."""
    parts = pointer[1:].split("/")
    if len(parts) < 3 or parts[0] != "entries" or parts[2] != "view":
        return None
    kind, item, _ = _locate(view, "/entries/" + parts[1], "zip")
    if kind != "value" or not isinstance(item, dict):
        return None
    if isinstance(item.get("view_error"), str):
        reason = f"has no view: {item['view_error']}"
    elif item.get("format") == "binary":
        reason = "is binary and has no view"
    elif item.get("format") not in VIEW_FORMATS:
        reason = "has no view"
    else:
        return None
    return (item["name"] if isinstance(item.get("name"), str) else ""), reason


def _array_leaves_out(form, view, array: str) -> bool:
    """Whether an array a selector searched may lack members: in a zip the listing or its entry's view, else the
    view's own truncation."""
    if form != "zip":
        return _truncated(form, view)
    if array == "/entries":
        return isinstance(view, dict) and view.get("truncated") is True
    return _zip_leaves_out(view, array)


def _zip_leaves_out(view, pointer: str) -> bool:
    """Whether a zip view leaves out what a pointer reaches: for a pointer into one listed entry, only that entry."""
    if not isinstance(view, dict):
        return False
    parts = pointer[1:].split("/")
    if parts[0] == "entries" and len(parts) > 1:
        kind, entry, _ = _locate(view, "/entries/" + parts[1], "zip")
        return _entry_leaves_out(entry) if kind == "value" else view.get("truncated") is True
    entries = view.get("entries") if isinstance(view.get("entries"), list) else []
    return view.get("truncated") is True or any(_entry_leaves_out(entry) for entry in entries)


def _truncated(form, view) -> bool:
    if not isinstance(view, dict):
        return False
    if form in ("text", "xml"):
        return view.get("truncated") is True
    if form != "sqlite":
        return False
    tables = view.get("tables")
    return view.get("tables_truncated") is True or any(
        isinstance(table, dict) and (table.get("truncated") is True or isinstance(table.get("error"), str))
        for table in (tables.values() if isinstance(tables, dict) else []))


def _selector_format(entry, view, pointer):
    if not isinstance(entry, dict) or entry.get("format") != "zip":
        return None if entry is None else entry.get("format")
    parts = pointer[1:].split("/")
    if len(parts) < 2 or parts[0] != "entries":
        return "zip"
    kind, item, _ = _locate(view, "/entries/" + parts[1], "zip")
    return item.get("format", "zip") if kind == "value" and isinstance(item, dict) else "zip"


def _view_of(check, entry, form):
    """The view, whether it is truncated, and why the check cannot read it; an absent file reads as empty."""
    if entry is None:
        return None, False, None
    if isinstance(entry.get("error"), str):
        return None, False, f"{check['file']} has no view: {entry['error']}"
    if entry.get("format") in (None, "binary"):
        return None, False, f"{check['file']} is binary and has no view"
    if form is not None and entry.get("format") != form:
        return None, False, f"{check['file']} is read as {entry.get('format')}, not {form}"
    return entry.get("view"), _truncated(entry.get("format"), entry.get("view")), None


def _undecided(check):
    return False, f"the view of {check['file']} is truncated, so what it leaves out is unknown"


def _compared(check, n: int, what: str):
    operator = next(key for key in ("equals", "at_least", "at_most") if check.get(key) is not None)
    expected = check[operator]
    met = n == expected if operator == "equals" else n >= expected if operator == "at_least" else n <= expected
    return met, f"{n} {what}, expected {operator.replace('_', ' ')} {expected}"


def _lines(check, entry):
    view, truncated, problem = _view_of(check, entry, "text")
    if problem is not None:
        return False, problem
    lines = view.get("lines") if isinstance(view, dict) and isinstance(view.get("lines"), list) else []
    lines = [line for line in lines if isinstance(line, str)]
    file = check["file"]
    if check["kind"] == "lines_present":
        missing = next((line for line in check["lines"] if line not in lines), None)
        return (True, f"{file} has the line(s) {_shown(check['lines'])}") if missing is None else (
            False, f"{file} has no line {_shown(missing)}")
    if truncated:
        return _undecided(check)
    if check["kind"] == "lines_absent":
        found = next((line for line in check["lines"] if line in lines), None)
        return (True, f"{file} has none of the lines {_shown(check['lines'])}") if found is None else (
            False, f"{file} still has the line {_shown(found)}")
    if check.get("contains") is not None:
        n = sum(1 for line in lines if check["contains"] in line)
        return _compared(check, n, f"line(s) of {file} contain {_shown(check['contains'])}")
    n = sum(1 for line in lines if line == check["exact"])
    return _compared(check, n, f"line(s) of {file} match {_shown(check['exact'])}")


def _xml_text(entry, view, pointer: str, found) -> bool:
    """Whether found is an XML element whose joined text is the number: an XML file, or an XML entry of a zip.
    A JSON object with the same shape is the value itself."""
    if not _is_element(found) or entry is None:
        return False
    form = entry.get("format")
    if form == "xml":
        return True
    if form != "zip":
        return False
    parts = pointer[1:].split("/")
    if len(parts) < 2 or parts[0] != "entries":
        return False
    kind, item, _ = _locate(view, "/entries/" + parts[1], "zip")
    return kind == "value" and isinstance(item, dict) and item.get("format") == "xml"


def _near(at: str, found, expected, tolerance, join: bool):
    """A value compared within a tolerance: numbers, and numeral strings, by their difference. An element's text is
    joined only when join says the view is XML."""
    read = _element_text(found) if join else found
    number = _number(read)
    within = f"within {_shown(tolerance)} of {_shown(expected)}"
    if number is None:
        return False, f"{at} is {_shown(found)}, not a number"
    if abs(number - expected) <= tolerance:
        return True, f"{at} is {_shown(found)}, {within}"
    return False, f"{at} is {_shown(found)}, not {within}"


def _value(check, entry):
    view, truncated, problem = _view_of(check, entry, None)
    if problem is not None:
        return False, problem
    kind, found, searched = ("none", None, []) if entry is None else _locate(view, check["pointer"], entry.get("format"))
    at = f"{check['file']} at {check['pointer']}"
    viewless = _viewless_entry(view, check["pointer"]) if entry is not None and entry.get("format") == "zip" else None
    if viewless is not None:
        return False, f"{check['file']} entry {viewless[0]} {viewless[1]}"
    # A selector tells one member from several only in an array the view holds whole.
    if any(_array_leaves_out(entry.get("format"), view, array) for array in searched):
        return _undecided(check)
    if kind == "unresolved":
        return False, f"{at}: {found}"
    if entry is not None and entry.get("format") == "zip":
        truncated = _zip_leaves_out(view, check["pointer"])
    if check["kind"] == "value_equals" and isinstance(check["value"], (dict, list)) and truncated:
        return _undecided(check)
    if check["kind"] == "value_equals":
        if kind == "none":
            return False, f"{at} has no value" if found is None else f"{at}: {found}"
        expected = check["value"]
        if check.get("tolerance") is not None and isinstance(expected, (int, float)) and not isinstance(expected, bool):
            # A cut element's kept runs can join into a number the file never held.
            join = _xml_text(entry, view, check["pointer"], found)
            if join and truncated:
                return _undecided(check)
            return _near(at, found, expected, check["tolerance"], join)
        if _same(found, check["value"]):
            return True, f"{at} is {_shown(check['value'])}"
        return False, f"{at} is {_shown(found)}, not {_shown(check['value'])}"
    if truncated:
        return _undecided(check)
    return (True, f"{at} has no value") if kind == "none" else (False, f"{at} is {_shown(found)}")


def _collapse_whitespace(text: str) -> str:
    """Each run of XML whitespace (space, tab, CR, LF) made one space, none at either end, as normalize-space()."""
    return WHITESPACE_RUN.sub(" ", text).strip(" ")


def _text_at(view, pointer: str, form) -> bool:
    """Whether a string a pointer reaches is text of the document: a member of an element's children (a text node)
    or attributes (an attribute's value), rather than an element's name or a field of the DOCTYPE."""
    segments = pointer.split("/")
    if len(segments) < 3 or segments[-2] not in ("children", "attributes"):
        return False
    kind, owner, _ = _locate(view, "/".join(segments[:-2]), form)
    return kind == "value" and _is_element(owner)


def _not_xml_entry(check, view):
    """Why a text check's pointer into an archive goes into no XML entry's view, or None when it does or names an
    entry not listed."""
    parts = check["pointer"].split("/")
    if len(parts) < 4 or parts[3] != "view":
        return f"{check['file']} at {check['pointer']} does not point into an entry's view"
    if parts[1] != "entries":
        return None
    kind, item, _ = _locate(view, "/entries/" + parts[2], "zip")
    if kind != "value" or not isinstance(item, dict) or item.get("format") == "xml":
        return None
    # An entry without a view failed before this, so its format is one with a view.
    name, form = (value if isinstance(value, str) else "" for value in (item.get("name"), item.get("format")))
    return f"{check['file']} entry {name} is read as {form}, not xml"


def _whole_text(check, entry):
    """An element's whole text, or a text node's, compared with the value or searched for it."""
    view, truncated, problem = _view_of(check, entry, None)
    if problem is not None:
        return False, problem
    at = f"{check['file']} at {check['pointer']}"
    if entry is None:
        return False, f"{at} has no value"
    form = entry.get("format")
    if form not in ("xml", "zip"):
        return False, f"{check['file']} is read as {form}, not xml"
    kind, found, searched = _locate(view, check["pointer"], entry.get("format"))
    viewless = _viewless_entry(view, check["pointer"]) if form == "zip" else None
    if viewless is not None:
        return False, f"{check['file']} entry {viewless[0]} {viewless[1]}"
    if any(_array_leaves_out(form, view, array) for array in searched):
        return _undecided(check)
    problem = _not_xml_entry(check, view) if form == "zip" else None
    if problem is not None:
        return False, problem
    if kind == "unresolved":
        return False, f"{at}: {found}"
    if form == "zip":
        truncated = _zip_leaves_out(view, check["pointer"])
    if kind == "none":
        if truncated:
            return False, f"the view of {check['file']} is truncated, so what it leaves out is unknown ({check['pointer']})"
        return False, f"{at} has no value" if found is None else f"{at}: {found}"
    # Only an element has attributes of its own and of its descendants to join.
    attribute = check.get("text_attribute")
    if not ((attribute is None and _text_at(view, check["pointer"], entry.get("format"))) if isinstance(found, str) else _is_element(found)):
        what = "an element, a text node or an attribute value" if attribute is None else "an element"
        return False, f"{at} is {_shown(found)}, not {what}"
    # A text node is whole. An element's text in a cut view may lack what the cut dropped from its middle.
    if not isinstance(found, str) and truncated:
        return _undecided(check)
    return _compared_text(check, at, _element_text(found, attribute))


def _compared_text(check, at: str, found: str):
    """A text found at a pointer compared with the check's value or searched for it, both collapsed when it asks."""
    collapse = check.get("normalize_whitespace") is True
    text = _collapse_whitespace(found) if collapse else found
    value = _collapse_whitespace(check["value"]) if collapse else check["value"]
    attribute = check.get("text_attribute")
    read = "" if attribute is None else f" in its {attribute} values"
    how = read + (" with whitespace collapsed" if collapse else "")
    if check["kind"] == "text_equals":
        if text == value:
            return True, f"{at} has the text {_shown(value)}{how}"
        return False, f"{at} has the text {_shown(text)}{how}, not {_shown(value)}"
    if value in text:
        return True, f"{at} has text containing {_shown(value)}{how}"
    return False, f"{at} has the text {_shown(text)}{how}, without {_shown(value)}"


def _members(check, entry):
    """How many members of the array at a pointer, or of those a selector matches, compared with the expected
    number."""
    matching, pointer = check.get("matching"), check["pointer"]
    view, truncated, problem = _view_of(check, entry, None)
    if problem is not None:
        return False, problem
    form = None if entry is None else entry.get("format")
    # The empty pointer names the whole view, as a JSON file whose top level is an array.
    kind, found, searched = (("none", None, []) if entry is None else ("value", view, []) if pointer == ""
                             else _locate(view, pointer, form))
    at = check["file"] if pointer == "" else f"{check['file']} at {pointer}"
    viewless = _viewless_entry(view, pointer) if form == "zip" else None
    if viewless is not None:
        return False, f"{check['file']} entry {viewless[0]} {viewless[1]}"
    if any(_array_leaves_out(form, view, array) for array in searched):
        return _undecided(check)
    if kind == "unresolved":
        return False, f"{at}: {found}"
    if kind == "none":
        if _array_leaves_out(form, view, pointer):
            return _undecided(check)
        return False, f"{at} has no value" if found is None else f"{at}: {found}"
    if not isinstance(found, list):
        return False, f"{at} is {_shown(found)}, not an array"
    # A count is decided only on an array the view holds whole.
    if _array_leaves_out(form, view, pointer):
        return _undecided(check)
    # The parser refuses a matching that is no selector.
    conditions = None if matching is None else _selector(matching)
    matching_form = _selector_format(entry, view, pointer) if matching is not None else None
    n = len(found) if matching is None else sum(1 for item in found if conditions and _selects(item, conditions, matching_form))
    return _compared(check, n, f"member(s) of {at}" + ("" if matching is None else f" matching {matching}"))


def _rows(check, entry):
    view, _, problem = _view_of(check, entry, "sqlite")
    if problem is not None:
        return False, problem
    view = view if isinstance(view, dict) else {}
    tables = view.get("tables") if isinstance(view.get("tables"), dict) else {}
    table = tables[check["table"]] if check["table"] in tables else MISSING
    name = f"{check['file']} table {check['table']}"
    if table is MISSING and view.get("tables_truncated") is True:
        return _undecided(check)
    table = table if isinstance(table, dict) else {}
    if isinstance(table.get("error"), str):
        return False, f"{name} could not be read: {table['error']}"
    columns = table.get("columns") if isinstance(table.get("columns"), list) else []
    rows = table.get("rows") if isinstance(table.get("rows"), list) else []
    where = check.get("where") or {}

    def matches(row) -> bool:
        return isinstance(row, list) and all(
            column in columns and columns.index(column) < len(row) and _same(row[columns.index(column)], value)
            for column, value in where.items())

    n = sum(1 for row in rows if matches(row))
    if check["kind"] == "row_present":
        return (n > 0, f"{name} has a row with {_shown(where)}" if n > 0 else f"{name} has no row with {_shown(where)}")
    if table.get("truncated") is True:
        return _undecided(check)
    if check["kind"] == "row_absent":
        return (True, f"{name} has no row with {_shown(where)}") if n == 0 else (
            False, f"{name} has {n} row(s) with {_shown(where)}")
    return _compared(check, n, f"row(s) of {name}" + (f" with {_shown(where)}" if "where" in check else ""))


def _verdict(check, entry):
    kind = check["kind"]
    if kind == "file_present":
        return (entry is not None, f"{check['file']} exists" if entry is not None else f"{check['file']} does not exist")
    if kind == "file_absent":
        return (entry is None, f"{check['file']} does not exist" if entry is None else f"{check['file']} exists")
    if kind in ("lines_present", "lines_absent", "line_count"):
        return _lines(check, entry)
    if kind in ("value_equals", "value_absent"):
        return _value(check, entry)
    if kind in ("text_equals", "text_contains"):
        return _whole_text(check, entry)
    if kind == "member_count":
        return _members(check, entry)
    return _rows(check, entry)


def evaluate(checks: list, views: dict) -> list:
    """One result per check against the views data/get returned, by home path."""
    results = []
    for check in checks:
        passed, description = _verdict(check, views.get(check["file"]))
        results.append({"id": check["id"], "result": passed, "description": description})
    return results
`;
		pythonLiteral = (value) => {
			if (value === null) return "None";
			if (typeof value === "boolean") return value ? "True" : "False";
			if (typeof value !== "object") return JSON.stringify(value);
			if (Array.isArray(value)) return `[${value.map(pythonLiteral).join(", ")}]`;
			return `{${Object.entries(value).filter(([, item]) => item !== undefined).map(([key, item]) => `${JSON.stringify(key)}: ${pythonLiteral(item)}`).join(", ")}}`;
		};
		pythonSeconds = (ms) => Number.isInteger(ms / 1e3) ? `${String(ms / 1e3)}.0` : String(ms / 1e3);
		PYTHON_SETTLE = String.raw`

def _files(answer) -> list:
    """Each file data/get returned, by its home path or its place among the parts, with the SHA-256 of its bytes as
    sent: what changes when the app saves."""
    files = []
    for index, part in enumerate(answer.parts):
        if part.kind != "file":
            continue
        marker = (getattr(part, "metadata", None) or {}).get(DATA_OBJECTS)
        path = marker.get("path") if isinstance(marker, dict) else None
        content = getattr(part.file, "bytes", None) or getattr(part.file, "uri", None) or ""
        files.append((path if isinstance(path, str) else f"#{index}", hashlib.sha256(content.encode()).hexdigest()))
    return sorted(files)


async def _read(url):
    answer = await protocol.get_data(url, timeout=120)
    views = _app_state_views(answer.parts)
    if views is None:
        raise RuntimeError(f"the {APP} app's data/get returned no state views")
    return views, _files(answer)


async def _settled_views(url):
    """The app's views once each file's bytes have held for SETTLE_WINDOW_S, counted from the read that returned them,
    read every SETTLE_INTERVAL_S; else the last completed read's. No read starts SETTLE_BOUND_S or more after the first
    began, and one still running then is cut. Also whether the files had held, and whether a read was cut."""
    start = time.monotonic()
    # The first read is the one a grade needs, so only its own timeout bounds it.
    views, files = await _read(url)
    # Offsets from the first read's start: when the last completed read began, and when a read first returned the
    # bytes it holds.
    began, since = 0.0, time.monotonic() - start
    while began - since < SETTLE_WINDOW_S:
        # Reads come an interval apart, and the one that can settle the files as soon as the window allows.
        at = max(min(began + SETTLE_INTERVAL_S, since + SETTLE_WINDOW_S), time.monotonic() - start)
        if at >= SETTLE_BOUND_S:
            return views, False, False
        await asyncio.sleep(max(0.0, at - (time.monotonic() - start)))
        at = max(at, time.monotonic() - start)
        if at >= SETTLE_BOUND_S:
            return views, False, False
        try:
            latest_views, latest = await asyncio.wait_for(_read(url), SETTLE_BOUND_S - at)
        except asyncio.TimeoutError:
            return views, False, True
        began, views = at, latest_views
        if latest != files:
            since, files = time.monotonic() - start, latest
    return views, True, False
`;
		sameTaskVerifier = (hosted, bundled) => hosted.includes("\nMISSING = object()\n") && hosted === bundled;
		renderTaskVerifier = (task, app, examples) => {
			if (!isScreenTask(task)) return renderFileVerifier(task, app);
			if (examples === undefined) throw new TypeError("A screen-judged task's verifier needs the build's examples.");
			return renderScreenVerifier(task, app, examples);
		};
		renderFileVerifier = (task, app) => `"""Checks of the task ${task.name} against the ${app} app's state, exported by REA from a desktop application capture.

It reads the app's data/get through the computer, takes the typed views of its files and evaluates each check: no
model, no code from the task. It grades once the app's files settle, since an app can save a few seconds after the
last change: each result's settled says whether they had held for SETTLE_WINDOW_S, or had not by SETTLE_BOUND_S and
the last completed read was graded, and read_cut whether a read still running at SETTLE_BOUND_S was cut. A failure to
reach the app raises, so the run fails rather than scoring the agent.
"""
import asyncio
import hashlib
import json
import math
import re
import time
${task.readers === undefined ? "" : "import sys\nimport types\nimport uuid\n"}
from agentenv_protocol import client as protocol
from agentenv_protocol.types import RPC_PATH

APP = ${JSON.stringify(app)}
CHECKS = [
${task.checks.map((check) => `    ${pythonLiteral(check)},`).join("\n")}
]
#: The app's data/get is read this often until its files settle.
SETTLE_INTERVAL_S = ${pythonSeconds(SETTLE_TIMING.intervalMs)}
#: How long each file's bytes must hold, from the read that returned them, before the views are graded.
SETTLE_WINDOW_S = ${pythonSeconds(SETTLE_TIMING.windowMs)}
#: After the first read began: no read starts then or later, one still running is cut, and the last completed read is
#: graded though the files are still changing.
SETTLE_BOUND_S = ${pythonSeconds(SETTLE_TIMING.boundMs)}
#: Where a data/get file part names its path in the home.
DATA_OBJECTS = "urn:agentenv:data-objects/v1"
${task.readers === undefined ? "" : renderReaderConstants(task.readers)}${PYTHON_TASK_EVALUATOR}${renderPythonAppStateViews()}${PYTHON_SETTLE}${task.readers === undefined ? "" : PYTHON_READER_VIEWS}

async def verify(mcp_url, env_url):
    card = await protocol.get_card(env_url)
    child = protocol.find_child(card, APP)
    if child is None:
        raise RuntimeError(f"the computer at {env_url} lists no app named {APP}")
    views, settled, read_cut = await _settled_views(env_url + (child.get("url") or RPC_PATH).removesuffix(RPC_PATH))
${task.readers === undefined ? "" : "    readers = await _reader_views(env_url, card)\n"}    return [{**result, "settled": settled, "read_cut": read_cut} for result in ${task.readers === undefined ? "evaluate(CHECKS, views)" : "evaluate_with_readers(CHECKS, views, readers)"}]
`;
		taskVerifierArtifact = (task) => `${task.name}-check`;
		renderTaskSteps = (task, app) => {
			const steps = [
				{
					id: "env",
					type: "deploy_env",
					env_id: app
				},
				{
					id: "agent",
					type: "deploy_agent",
					env_ids: [app]
				},
				{
					id: "skills",
					type: "add_skills",
					env_ids: [app]
				},
				{
					id: "record",
					type: "start_computer_recording",
					env_id: app,
					name: "agent",
					depends_on: ["env"]
				},
				{
					id: "task",
					type: "prompt_agent",
					depends_on: ["skills", "record"],
					prompt: task.prompt
				},
				{
					id: "check",
					type: "env_outcome_verifier",
					env_id: app,
					file_artifact_id: taskVerifierArtifact(task),
					verifier_id: task.name,
					depends_on: ["task"]
				},
				{
					id: "end",
					type: "end_computer_recording",
					name: "agent",
					depends_on: ["task"]
				}
			];
			return `[\n${steps.map((step) => `  ${JSON.stringify(step)}`).join(",\n")}\n]\n`;
		};
		renderTaskEval = (tasks) => `tasks = [${tasks.map((task) => JSON.stringify(task.name)).join(", ")}]\n`;
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopTaskExport.js
var OPERATION$2, REWRITE, DRAFT, taskFileFailure, readTaskFile, identityProblem, readerProblem, readerRead, valueStrings, targetProblem, shippedSeedCheckView, capturedViewsAt, shippedSeedViews, readersReadme, taskReadme, ids, refuseTargetProblems, readersAt, screenReadme, admitScreenTask, namesApp, nearCheckpoint, taskEndsOf, positionOf, admitTask, decidedFailures, undecided, changedFrom, admitDesktopTasks;
function init_DesktopTaskExport() {
	return (init_DesktopTaskExport = __esmMin((() => {
		init_excerpt();
		init_resources();
		init_appTask();
		init_appTaskChecks();
		init_appSettle();
		init_appTaskPython();
		init_appTaskScreen();
		init_buildCapture();
		init_desktopState();
		init_hostIdentity();
		init_analysisErrorCore();
		init_analysisErrorCleanup();
		init_evidenceErrors();
		init_result();
		init_validationFailure();
		init_desktopStateDiff();
		init_JsonFiles();
		init_DesktopCaptureRefusals();
		init_DesktopExportInstall();
		init_DesktopStateVersions();
		OPERATION$2 = "export_desktop_application";
		REWRITE = "Fix the task file and export again.";
		DRAFT = "each changed file's values in the task draft (describe-desktop-application-task, or stop_build_capture on a build computer) show what it held at the seed and at the end, at the pointer a check names it by";
		taskFileFailure = (path, error) => {
			if (!(error instanceof EvidenceFileError) || error.reason === "io") return error;
			const detail = describeValidationFailure(error.cause);
			const json = error.reason === "invalid-json";
			const userMessage = json ? `The task file ${path} is not valid UTF-8 JSON (${detail}).` : `The task file ${path} could not be read (${detail}).`;
			return new AnalysisInputError(OPERATION$2, {
				userMessage,
				remediationAction: json ? "Repair the task file, then export again." : "Pass a regular JSON file, such as the task describe-desktop-application-task drafts.",
				conformsToInputContract: true,
				cause: error
			}, [{
				path: ["task"],
				reason: "invalid_value",
				message: userMessage
			}]);
		};
		readTaskFile = async (path, signal) => {
			const resources = new ArtifactResourceScope();
			const loaded = await readJsonFile(path, signal, resources, OPERATION$2).catch((cause) => err(cause));
			const typed = (cause) => desktopOperationFailure(cause, signal, OPERATION$2, "Reading the task file");
			const closed = await resources.close().then(() => undefined, typed);
			const primary = loaded.ok ? undefined : taskFileFailure(path, typed(loaded.error));
			if (closed !== undefined) throw primary === undefined ? closed : analysisErrorWithCloseRejection(primary, closed, OPERATION$2);
			if (loaded.ok) return loaded.value;
			throw primary ?? typed(loaded.error);
		};
		identityProblem = (values, target) => {
			for (const value of values) {
				if (value.includes(target.capturedHome)) return `names the captured home ${target.capturedHome}, which the computer's home replaces`;
				const named = identityLeftIn(value, target.identity);
				if (named !== undefined) return `names ${named}, the capture host's name or user, which the export removes from the seed`;
			}
			return undefined;
		};
		readerProblem = (reader, target) => isWithinAny(reader.file, target.paths) ? identityProblem([...reader.argv, reader.stdin ?? ""], target) : `reads ${reader.file}, which is not under the app's owned paths (${target.paths.join(", ") || "none"}); data/get serves only those. For the bundle to own it, capture again naming it with ${STATE_PATH_INPUTS}`;
		readerRead = (check, readers) => {
			if (!("reader" in check) || check.reader === undefined) return "";
			const read = readers.get(check.reader);
			if (read === undefined || read.view === null) return "";
			const view = read.view;
			const lines = read.format === "text" && typeof view === "object" && !Array.isArray(view) && Array.isArray(view.lines) ? view.lines.map((line) => JSON.stringify(line)).join(", ") : JSON.stringify(view);
			const shown = ellipsisExcerpt(lines, 600);
			return `; reader ${check.reader} printed: ${shown}`;
		};
		valueStrings = (value) => {
			if (typeof value === "string") return [value];
			if (Array.isArray(value)) return value.flatMap(valueStrings);
			if (typeof value !== "object" || value === null) return [];
			return Object.entries(value).flatMap(([name, member]) => [name, ...valueStrings(member)]);
		};
		targetProblem = (check, target, views) => {
			if (check.kind === "screen_judge") return identityProblem([check.question], target);
			if (!isWithinAny(check.file, target.paths)) return `names ${check.file}, which is not under the app's owned paths (${target.paths.join(", ") || "none"}); data/get serves only those. For the bundle to own it, capture again naming it with ${STATE_PATH_INPUTS}`;
			if ((target.withheld ?? []).some(({ file }) => file === check.file)) return `names ${check.file}, which the bundle withholds from its seed as sign-in or licence state, and data/get never serves; check a file the bundle seeds`;
			const { id: _id, kind: _kind, ...fields } = check;
			const named = identityProblem(Object.values(fields).flatMap(valueStrings), target);
			if (named !== undefined) return named;
			if (!isPointerCheck(check) || "reader" in check && check.reader !== undefined) return undefined;
			return [views.seed, views.end].some((at) => at.get(check.file)?.format === "text") ? `points into ${check.file}, which is text; use lines_present, lines_absent or line_count` : undefined;
		};
		shippedSeedCheckView = (seeded, shipped, captured) => seeded ? shipped ?? captured : undefined;
		capturedViewsAt = (target, at) => {
			const views = new Map();
			for (const [home, path] of target.files) {
				const version = versionAt(path, at);
				const view = version === undefined ? undefined : versionView(version);
				if (view !== undefined) views.set(home, view);
			}
			return views;
		};
		shippedSeedViews = (target, captured) => {
			const views = new Map();
			for (const [home, path] of target.files) {
				const version = versionAt(path, target.ends.seed);
				if (version?.present === true && version.sha256 === null) continue;
				const view = shippedSeedCheckView(target.seeded.has(home), target.seedViews.get(home), captured.get(home));
				if (view !== undefined) views.set(home, view);
			}
			return views;
		};
		readersReadme = (task) => task.readers === undefined ? "" : `
Readers, each run in the computer on a private copy of its file in a fresh home, without the display unless it asks
for it; the lines it prints starting with \`REA \` are its view:

${task.readers.map((reader) => `- \`${reader.id}\` reads \`${reader.file}\` as ${reader.output}: \`${JSON.stringify(reader.argv)}\`${reader.stdin === undefined ? "" : `, with stdin \`${JSON.stringify(reader.stdin)}\``}`).join("\n")}
`;
		taskReadme = (task, app, summary) => `
## Task \`${task.name}\`

\`tasks/${task.name}.json\` deploys the app, has the agent work through the computer from the prompt below, and grades
the outcome with \`artifacts/${taskVerifierArtifact(task)}/verify.py\`, which reads the app's \`data/get\` views${task.readers === undefined ? "" : " and runs its readers in the computer"} and needs
no model. It grades once the app's files have held for ${String(SETTLE_TIMING.windowMs / 1e3)} s, so a save the app makes on its own within that
time of the agent stopping counts; each result's \`settled\` is false when they were still changing ${String(SETTLE_TIMING.boundMs / 1e3)} s after the
first read. \`evals/${app}.toml\` names it, so a run of the bundle runs it.

${task.prompt.split("\n").map((line) => `> ${line}`).join("\n")}

Checks, each of which must pass:

${task.checks.map(({ id, ...check }) => `- \`${id}\`: \`${JSON.stringify(check)}\``).join("\n")}
${readersReadme(task)}
REA kept the task because its checks fail on the seed (${ids(summary.failing_on_seed)}) and all
pass at the captured end state, checkpoint \`${summary.end_checkpoint}\`${summary.near_checkpoint === null ? "" : `, and its near miss, checkpoint \`${summary.near_checkpoint}\`, fails ${ids(summary.failing_on_near)}`}.

To measure a solve rate, run the task k times (3 by default) with the agent and model to measure, and count the runs
whose summary line says \`passed\`; a run that says \`failed\` did not finish and is run again rather than counted:

    agent-env run <this folder> --task ${task.name} --agent claude-code --model MODEL
`;
		ids = (checks) => checks.map((id) => `\`${id}\``).join(", ");
		refuseTargetProblems = (task, target, views, lead) => {
			for (const check of task.checks) {
				const problem = targetProblem(check, target, views);
				if (problem !== undefined) throw refuse(`${lead}Check ${JSON.stringify(check.id)} ${problem}.`, "task", REWRITE);
			}
			for (const reader of task.readers ?? []) {
				const problem = readerProblem(reader, target);
				if (problem !== undefined) throw refuse(`${lead}Reader ${JSON.stringify(reader.id)} ${problem}.`, "task", REWRITE);
			}
		};
		readersAt = async (task, target, at) => {
			const readers = task.readers ?? [];
			return readers.length === 0 ? new Map() : target.readerViews(readers, at);
		};
		screenReadme = (task, app) => `
## Task \`${task.name}\`

\`tasks/${task.name}.json\` deploys the app, has the agent work through the computer from the prompt below, and grades
the outcome with \`artifacts/${taskVerifierArtifact(task)}/verify.py\`, which takes a screenshot of the computer once the
agent stops and asks a model, the judge, each question below ${String(3)} times; a check passes when most answers are yes. The
judge sees two labelled screenshots from the build first: the app at the seed, where the answer is no, and with the
task done, where it is yes. \`evals/${app}.toml\` names the task, so a run of the bundle runs it.

${task.prompt.split("\n").map((line) => `> ${line}`).join("\n")}

Questions, each of which must be answered yes:

${task.checks.map((check) => `- \`${check.id}\`: ${check.kind === "screen_judge" ? check.question : ""}`).join("\n")}

The judge's model is \`[model.roles] judge\` in the runner's \`.agentenv/config.toml\`, else its \`[model] default\`, else
\`${DEFAULT_JUDGE_MODEL}\`, called through \`LITELLM_BASE_URL\` and \`LITELLM_API_KEY\` or \`[model] base_url\` and \`api_key\`.
\`agent-env run --judge-model\` does not reach it. Without an endpoint the verifier raises, so the run fails rather than
scoring the agent. The export judged no screen; REA's witness ran this judge on a fresh screenshot at each stage.

To measure a solve rate, run the task k times (3 by default) and count the runs whose summary line says \`passed\`:

    agent-env run <this folder> --task ${task.name} --agent claude-code --model MODEL
`;
		admitScreenTask = async (task, target, at, lead) => {
			const owned = (all) => new Map([...all].filter(([file]) => isWithinAny(file, target.paths)));
			const changed = readableChanges(owned(capturedViewsAt(target, at.before)), owned(capturedViewsAt(target, at.end)));
			if (changed.length > 0) throw refuse(`${lead}A screen_judge judges state no file shows, but ${changed.join(", ")} changed between ${at.before === target.ends.seed ? "the seed and the end" : `${target.checkpoints[at.before] ?? "the task before"} and ${target.checkpoints[at.end] ?? "its end"}`} in a way a check can read.`, "task", `Check what changed in those files instead; ${DRAFT}.`);
			const [seed, end] = await Promise.all([target.screens("seed"), target.screens(at.end)]);
			if (seed === undefined || end === undefined) throw refuse(`${lead}A screen_judge needs the screenshots a build computer takes at the seed and end checkpoints, its judge's examples, and the capture has no ${seed === undefined ? "seed" : "end"} screenshot.`, "task", "Capture the app in a build computer, marking seed and end there, and export from it.");
			if (seed === "too-large" || end === "too-large") throw refuse(`${lead}The ${seed === "too-large" ? "seed" : "end"} screenshot is larger than the ${String(SCREEN_EXAMPLE_MAX_BYTES / 1024 / 1024)} MiB a judge's example may take.`, "task", "Capture again with a simpler screen at that checkpoint.");
			const examples = {
				fail: seed.toString("base64"),
				pass: end.toString("base64")
			};
			return {
				screenJudged: true,
				summary: {
					name: task.name,
					checks: task.checks.length,
					end_checkpoint: target.checkpoints[at.end] ?? "baseline",
					failing_on_seed: [],
					near_checkpoint: null,
					failing_on_near: []
				},
				limitations: [...namesApp(task.prompt, target) ? [] : [`The prompt of task ${task.name} does not name the app (${target.title}), so start it with "In ${target.title}, ".`], `The export judges no screen, so it did not check task ${task.name}'s screen_judge questions on the seed, the end or a near miss: the witness does, running the bundle's own judge on a fresh screenshot at each stage, which needs a model endpoint.`],
				readme: screenReadme(task, target.name),
				verifier: renderTaskVerifier(task, target.name, examples)
			};
		};
		namesApp = (prompt, { title, name, aptPackage }) => {
			return [
				title,
				name,
				aptPackage
			].some((app) => {
				const spelled = app.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
				return new RegExp(`(?<![\\p{L}\\p{N}_])${spelled}(?![\\p{L}\\p{N}_])`, "iu").test(prompt);
			});
		};
		nearCheckpoint = (task) => `near-${task}`;
		taskEndsOf = (given, names) => {
			const ends = new Map();
			for (const entry of given) {
				const at = entry.indexOf("=");
				const name = entry.slice(0, at);
				const checkpoint = entry.slice(at + 1);
				if (at <= 0 || checkpoint === "") throw refuse(`The task end ${JSON.stringify(entry)} is not NAME=CHECKPOINT.`, "task_end", "Give each task end as the task's name, =, and the checkpoint it is checked at.");
				if (!names.has(name) || ends.has(name)) throw refuse(`The task end ${JSON.stringify(entry)} names ${JSON.stringify(name)}, ${ends.has(name) ? "whose end is already given" : "which is none of the tasks given"}.`, "task_end", "Give one end for each task, by the name in its task file.");
				ends.set(name, checkpoint);
			}
			return ends;
		};
		positionOf = (target, checkpoint) => selectStateEnds(target.checkpoints, {
			seed: target.checkpoints[target.ends.seed],
			end: checkpoint
		}, OPERATION$2).end;
		admitTask = async (task, at, target) => {
			const { end } = at;
			const endName = target.checkpoints[end] ?? "baseline";
			const nearName = nearCheckpoint(task.name);
			const near = target.checkpoints.includes(nearName) ? positionOf(target, nearName) : undefined;
			const views = {
				seed: shippedSeedViews(target, capturedViewsAt(target, target.ends.seed)),
				end: capturedViewsAt(target, end),
				near: near === undefined ? undefined : capturedViewsAt(target, near)
			};
			const lead = `Task ${JSON.stringify(task.name)}, checked at ${endName}: `;
			refuseTargetProblems(task, target, views, lead);
			if (isScreenTask(task)) return admitScreenTask(task, target, at, lead);
			const read = {
				end: await readersAt(task, target, end),
				seed: await readersAt(task, target, "seed"),
				near: near === undefined ? undefined : await readersAt(task, target, near)
			};
			const failing = evaluateTaskChecks(task.checks, views.end, read.end).find((outcome) => !outcome.passed);
			if (failing !== undefined) {
				const check = task.checks.find(({ id }) => id === failing.id);
				throw refuse(`${lead}Check ${JSON.stringify(failing.id)} fails on the captured end state: ${failing.description}${check === undefined ? "" : readerRead(check, read.end)}.`, "task", `Write checks that the captured end state passes, or check the task at the checkpoint taken once its change was saved; ${DRAFT}.`);
			}
			const seed = evaluateTaskChecks(task.checks, views.seed, read.seed).filter((outcome) => !outcome.passed);
			if (seed.length === 0) throw refuse(`${lead}Every check already passes on the seed, so the task would be done before the agent starts.`, "task", "Add a check that the change the user made is needed for.");
			const failingOnSeed = decidedFailures(seed);
			if (failingOnSeed.length === 0) throw refuse(`${lead}No check fails on what the seed's views show: each failure there may come from a view that could not be read or is cut short (${undecided(seed)}).`, "task", `Add a check that fails on what the seed's views hold, such as a line or row of a file read whole; ${DRAFT}.`);
			const missed = views.near === undefined ? [] : evaluateTaskChecks(task.checks, views.near, read.near).filter((outcome) => !outcome.passed);
			const failingOnNear = decidedFailures(missed);
			if (views.near !== undefined && failingOnNear.length === 0) throw refuse(missed.length === 0 ? `${lead}Every check passes at ${nearName}, its near miss, so the checks would accept that almost-right change.` : `${lead}No check fails on what ${nearName}'s views show, its near miss: each failure there may come from a view that could not be read or is cut short (${undecided(missed)}).`, "task", `Tighten the checks so the near miss fails one, or take ${nearName} again on a near miss the task's checks are meant to catch.`);
			const summary = {
				name: task.name,
				checks: task.checks.length,
				end_checkpoint: endName,
				failing_on_seed: failingOnSeed,
				near_checkpoint: near === undefined ? null : nearName,
				failing_on_near: failingOnNear
			};
			return {
				summary,
				screenJudged: false,
				limitations: namesApp(task.prompt, target) ? [] : [`The prompt of task ${task.name} does not name the app (${target.title}): a solving agent's own shell cannot see the computer's files, and the app's name sends it to the screen, so start the prompt with "In ${target.title}, ".`],
				readme: taskReadme(task, target.name, summary),
				verifier: renderTaskVerifier(task, target.name)
			};
		};
		decidedFailures = (failed) => failed.filter((outcome) => outcome.undecided !== true).map((outcome) => outcome.id);
		undecided = (failed) => failed.map(({ id, description }) => `${JSON.stringify(id)}: ${description}`).join("; ");
		changedFrom = (end, seed, ends) => Math.max(seed, ...ends.filter((other) => other < end));
		admitDesktopTasks = async (given, target, signal) => {
			const tasks = [];
			for (const path of given.paths) {
				const parsed = parseDesktopTask(await readTaskFile(path, signal));
				if (!parsed.ok) throw refuse(`The task file ${path} is refused: ${parsed.error}`, "task", REWRITE);
				if (tasks.some((task) => task.name === parsed.value.name)) throw refuse(`Two tasks are named ${JSON.stringify(parsed.value.name)}; the bundle names each task's files after it.`, "task", "Give each task its own name.");
				tasks.push(parsed.value);
			}
			const ends = taskEndsOf(given.ends, new Set(tasks.map((task) => task.name)));
			if (tasks.length === 0) return undefined;
			const positions = tasks.map((task) => {
				const named = ends.get(task.name);
				return named === undefined ? target.ends.end : positionOf(target, named);
			});
			const admitted = [];
			for (const [index, task] of tasks.entries()) {
				const end = positions[index];
				admitted.push(await admitTask(task, {
					end,
					before: changedFrom(end, target.ends.seed, positions)
				}, target));
			}
			return {
				summaries: admitted.map(({ summary }) => summary),
				...admitted.some(({ screenJudged }) => screenJudged) ? { screenJudged: true } : {},
				limitations: admitted.flatMap(({ limitations }) => limitations),
				readme: admitted.map(({ readme }) => readme).join(""),
				files: [...tasks.flatMap((task, index) => [{
					path: `tasks/${task.name}.json`,
					content: renderTaskSteps(task, target.name)
				}, {
					path: `artifacts/${taskVerifierArtifact(task)}/verify.py`,
					content: admitted[index].verifier
				}]), {
					path: `evals/${target.name}.toml`,
					content: renderTaskEval(tasks)
				}]
			};
		};
	})))();
}

//#endregion
//#region dist/process/RetainedCommandCleanup.js
var RetainedCommandCleanup;
function init_RetainedCommandCleanup() {
	return (init_RetainedCommandCleanup = __esmMin((() => {
		init_DarwinProcessRunTokenReader();
		init_ProcessInspectionCleanup();
		init_OwnedCommand();
		RetainedCommandCleanup = class {
			folder;
			#owner;
			#preparation;
			#processResources;
			#stopped;
			#prepared = new Set();
			#folderPresent = true;
			constructor(folder, cause) {
				this.folder = folder;
				this.#owner = cause instanceof OwnedCommandFailure ? cause.cleanupOwner : undefined;
				this.#preparation = processInspectionCleanupFailures(cause instanceof OwnedCommandFailure ? cause.preparationFailure : cause);
				this.#processResources = cause instanceof OwnedCommandFailure ? cause.resources : [];
				this.#stopped = this.#owner === undefined;
			}
			get hasPendingCommandResources() {
				return !this.#stopped || this.#preparation.some((failure) => !this.#prepared.has(failure));
			}
			get cleanupResources() {
				return [...new Set([
					...!this.#stopped ? this.#processResources : [],
					...this.#preparation.flatMap((failure) => this.#prepared.has(failure) ? [] : failure instanceof DarwinProcessOwnershipInspectionError ? failure.cleanupFailure?.cleanupResources ?? [] : [failure.path]),
					...this.#folderPresent ? [this.folder] : []
				])];
			}
			async close() {
				if (!this.#stopped && this.#owner !== undefined) {
					const result = await this.#owner.stop();
					if (result.status === "incomplete") throw new Error(result.reason);
					this.#owner.dispose();
					this.#stopped = true;
				}
				const failures = [];
				for (const failure of this.#preparation) {
					if (this.#prepared.has(failure)) continue;
					try {
						if (failure instanceof DarwinProcessOwnershipInspectionError) {
							if (failure.cleanupOwner === undefined) throw failure;
							await failure.cleanupOwner.close();
						} else await failure.owner.close();
						this.#prepared.add(failure);
					} catch (cause) {
						failures.push(cause);
					}
				}
				if (failures.length > 0) throw new AggregateError(failures, "Command inspection cleanup remains incomplete");
				if (this.#folderPresent) {
					await rm(this.folder, {
						recursive: true,
						force: true
					});
					this.#folderPresent = false;
				}
			}
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopTaskReaderCleanup.js
var OPERATION$1, primaryFailure, readerDiagnostics, readerFailure, ReaderCleanup, retainReaderCleanup;
function init_DesktopTaskReaderCleanup() {
	return (init_DesktopTaskReaderCleanup = __esmMin((() => {
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_providerAdapterError();
		init_providerCleanupError();
		init_analysisCleanupRelease();
		init_OwnedCommand();
		init_RetainedCommandCleanup();
		init_OwnedWorkerRuntime();
		init_DesktopCaptureRefusals();
		init_errorMessage();
		OPERATION$1 = "export_desktop_application";
		primaryFailure = (cause) => {
			if (cause instanceof AnalysisError) return cause;
			if (cause === undefined) return undefined;
			return cause instanceof OwnedCommandFailure && cause.reason === "cancelled" ? cancelledBy(OPERATION$1, carriedReason(cause.cancellation?.reason)) : new ProviderAdapterError(DESKTOP_PROVIDER.id, OPERATION$1, {
				cause,
				userMessage: `The task reader could not complete: ${errorMessage(cause)}`
			});
		};
		readerDiagnostics = ({ views, absent }) => ({
			...views.size === 0 ? {} : { completed_reader_views: Object.fromEntries([...views].map(([id, view]) => [id, {
				format: view.format,
				view: view.view,
				...view.compression === undefined ? {} : { compression: view.compression },
				...view.error === undefined ? {} : { error: view.error }
			}])) },
			...absent.length === 0 ? {} : { completed_reader_absent: [...absent] }
		});
		readerFailure = (cause, facts) => (primaryFailure(cause) ?? new ProviderAdapterError(DESKTOP_PROVIDER.id, OPERATION$1, { cause })).retainDiagnostics(readerDiagnostics(facts));
		ReaderCleanup = class {
			owner;
			failure;
			#retry;
			#released = new AnalysisCleanupRelease();
			constructor(owner, failure) {
				this.owner = owner;
				this.failure = failure;
				this.#released.bind(failure.bindCleanupResourceOwner(owner));
			}
			retryRetainedCleanup() {
				if (this.#retry !== undefined) return this.#retry;
				const attempt = this.#release();
				this.#retry = attempt;
				void attempt.finally(() => {
					this.#retry = undefined;
				}).catch(() => {});
				return attempt;
			}
			async #release() {
				try {
					await this.owner.close();
					processWorkerCleanup.delete(this);
					this.#released.confirm();
				} catch (cause) {
					this.failure.retainDiagnostics({ retry_failure: errorMessage(cause) });
					throw this.failure;
				}
			}
		};
		retainReaderCleanup = (folder, cause, facts, folderFailure) => {
			const owner = new RetainedCommandCleanup(folder, cause);
			if (!owner.hasPendingCommandResources && folderFailure === undefined) return undefined;
			const original = primaryFailure(cause);
			const resources = owner.cleanupResources;
			const problem = folderFailure?.cause ?? (cause instanceof OwnedCommandFailure ? cause.cleanupFailure : undefined) ?? cause;
			const failure = new ProviderCleanupError(DESKTOP_PROVIDER.id, resources, {
				reason: errorMessage(problem),
				...readerDiagnostics(facts)
			}, {
				operation: OPERATION$1,
				cause,
				...original === undefined ? {} : { cleanupPrimary: original },
				remediationAction: "Retry cleanup in this REA process before starting another reader; if it exits first, inspect the reported local resources."
			});
			processWorkerCleanup.add(new ReaderCleanup(owner, failure));
			return failure;
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopTaskReaders.js
var completedReaderAnswer, readerViewsOfBytes;
function init_DesktopTaskReaders() {
	return (init_DesktopTaskReaders = __esmMin((() => {
		init_OwnedWorkerRuntime();
		init_OwnedCommand();
		init_DesktopTaskReaderCleanup();
		init_appTaskReaders();
		completedReaderAnswer = (cause) => {
			if (!(cause instanceof OwnedCommandFailure) || cause.collectionFailure || cause.snapshot?.exitCode !== 0 || cause.snapshot.outputIncomplete === true) return undefined;
			const stdout = cause.snapshot.stdout;
			if (stdout.invalidUtf8 || stdout.bytes !== stdout.observedBytes) return undefined;
			try {
				return { view: readerAnswerView(stdout.text) };
			} catch {
				return undefined;
			}
		};
		readerViewsOfBytes = async (readers, bytesOf, run) => {
			const views = new Map();
			if (readers.length > 0) await processWorkerCleanup.retry();
			const absent = [];
			for (const reader of readers) {
				let file;
				try {
					file = await bytesOf(reader);
				} catch (cause) {
					throw readerFailure(cause, {
						views,
						absent
					});
				}
				if (file.kind === "absent") {
					absent.push(reader.id);
					continue;
				}
				if (file.kind === "error") {
					views.set(reader.id, {
						format: null,
						view: null,
						error: file.error
					});
					continue;
				}
				const folder = await mkdtemp(join(tmpdir(), "rea-reader-bytes-")).catch((cause) => {
					throw readerFailure(cause, {
						views,
						absent
					});
				});
				let failure;
				try {
					const path = join(folder, reader.file.split("/").at(-1) ?? "file");
					await writeFile(path, file.bytes);
					const result = await run(readerCommand(reader, path, folder), readerTimeout(reader) + 30);
					if (result.exit_code !== 0 || result.timed_out) throw new Error(`REA's reader runner for ${reader.id} ${result.timed_out ? "timed out" : `exited ${String(result.exit_code)}`}: ${result.stderr.slice(-1024) || result.stdout.slice(-1024)}`);
					const view = readerAnswerView(result.stdout);
					if (view === undefined) absent.push(reader.id);
					else views.set(reader.id, view);
				} catch (cause) {
					failure = { cause };
					const completed = completedReaderAnswer(cause);
					if (completed !== undefined) {
						if (completed.view === undefined) absent.push(reader.id);
						else views.set(reader.id, completed.view);
					}
				}
				const facts = {
					views,
					absent
				};
				const retained = retainReaderCleanup(folder, failure?.cause, facts);
				if (retained !== undefined) throw retained;
				try {
					await rm(folder, {
						recursive: true,
						force: true
					});
				} catch (cause) {
					throw retainReaderCleanup(folder, failure?.cause, facts, { cause });
				}
				if (failure !== undefined) throw readerFailure(failure.cause, facts);
			}
			return views;
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopExportReaders.js
var screenAt, readerFile, exportReaderViews, taskReads, readsOf;
function init_DesktopExportReaders() {
	return (init_DesktopExportReaders = __esmMin((() => {
		init_desktopViewPolicy();
		init_appTaskScreen();
		init_desktopState();
		init_DesktopExportFiles();
		init_DesktopRetainedContent();
		init_DesktopTaskReaders();
		screenAt = async (sources, at) => {
			const name = sources.checkpoints[at === "seed" ? sources.ends.seed : at];
			if (sources.screens === undefined || name === undefined) return undefined;
			const path = join(sources.screens, `${name}.jpg`);
			const found = await stat(path).catch(() => undefined);
			if (found?.isFile() !== true) return undefined;
			return found.size > 2097152 ? "too-large" : readFile(path);
		};
		readerFile = async (sources, content, file, at) => {
			const { copies, files, checkpoints, identity, signal } = sources;
			if (at === "seed") {
				const copy = copies.find(({ seed }) => seed?.home === file);
				return copy === undefined ? { kind: "absent" } : {
					kind: "bytes",
					bytes: await shippedSeedBytes(content, copy, identity, signal)
				};
			}
			const path = files.get(file);
			const version = path === undefined ? undefined : versionAt(path, at);
			if (version?.present !== true) return { kind: "absent" };
			if (version.sha256 === null) return {
				kind: "error",
				error: `~/${file} was not retained at the ${checkpoints[at] ?? "end"} checkpoint, so there is nothing to read`
			};
			const read = await content.read(version.sha256, signal);
			return read.ok ? {
				kind: "bytes",
				bytes: read.value
			} : {
				kind: "error",
				error: `the retained content of ~/${file} ${read.error}`
			};
		};
		exportReaderViews = (sources) => (readers, at) => withRetainedContent(sources.capture, (content) => readerViewsOfBytes(readers, (reader) => readerFile(sources, content, reader.file, at), (argv, timeoutS) => sources.taskReader(argv, timeoutS, sources.signal)), sources.maxBytes);
		taskReads = async (request, maxBytes, found) => {
			const sources = {
				...found,
				capture: request.capture,
				screens: request.screens,
				viewPolicy: request.viewPolicy,
				maxBytes
			};
			return readsOf(request.tasks.length, sources);
		};
		readsOf = async (tasks, sources) => ({
			seedViews: tasks === 0 ? new Map() : await withRetainedContent(sources.capture, (content) => shippedSeedViews$1(content, sources.copies, sources.identity, sources.signal, desktopViewPolicy(sources.viewPolicy)), sources.maxBytes),
			readerViews: exportReaderViews(sources),
			screens: (at) => screenAt(sources, at)
		});
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopApplicationExport.js
var OPERATION, SEED_MAX_BYTES, seedDconf, unseededFiles, planExport, bundleText, NO_SCRUB, runExport, publishedExportFailure, exportDesktopApplication;
function init_DesktopApplicationExport() {
	return (init_DesktopApplicationExport = __esmMin((() => {
		init_targetIdentity();
		init_analysisErrorBase();
		init_appExport();
		init_appExportUnowned();
		init_appExportInstallLimitations();
		init_desktopState();
		init_desktopStateDiff();
		init_seedScrub();
		init_evidence();
		init_analysisErrorCore();
		init_analysisErrorCancellation();
		init_providerAdapterError();
		init_DesktopApplicationState();
		init_DesktopCaptureRefusals();
		init_DesktopExportInstall();
		init_DesktopOutputTree();
		init_DesktopExportFiles();
		init_DesktopExportWithheld();
		init_DesktopExportLimitations();
		init_DesktopRetainedContent();
		init_DesktopExportLaunch();
		init_DesktopStateVersions();
		init_DesktopTaskExport();
		init_DesktopExportReaders();
		OPERATION = "export_desktop_application";
		SEED_MAX_BYTES = 1024 * 1024 * 1024;
		seedDconf = (state, seed, identity) => {
			const database = state.paths.find((path) => path.format === "dconf" && path.role === "application_state");
			const version = database === undefined ? undefined : versionAt(database, seed);
			const view = version?.view;
			if (version?.present !== true || !isRecord(view) || !isRecord(view.groups)) return {
				text: "",
				groups: 0,
				holdsIdentity: false
			};
			const groups = Object.keys(view.groups).length;
			return {
				...scrubDconf(view.groups, identity),
				groups
			};
		};
		unseededFiles = (capture, homePath, files, { paths, seed }) => {
			const listed = [...files].filter(([home, path]) => {
				const version = versionAt(path, seed);
				return isWithinAny(home, paths) && version?.present === true && version.sha256 === null;
			}).map(([home]) => home);
			const omitted = capture.state.omitted_content.map(({ path }) => homePath(path)).filter((home) => home !== null && isWithinAny(home, paths) && !files.has(home));
			return [...new Set([...listed, ...omitted])].sort();
		};
		planExport = async (request, capture, state, context) => {
			const { application, host } = capture;
			const source = exportEnvironmentName(capture, request.name);
			const { install, windowClass } = admitApplication(capture, source, {
				...request,
				download: context.download
			});
			const electron = application.executable.electron_markers.length > 0;
			const stateFiles = exportedStateFiles(capture, state);
			const { homePath, stateAliases, files, collisions, paths, isLeftOut } = stateFiles;
			const { text: dconf, ...dconfScrub } = seedDconf(state, context.seed, context.identity);
			const versions = seedVersions(files, paths, context.seed, isLeftOut);
			const app = {
				app: source,
				homePath,
				paths,
				...versions
			};
			const { seeds, textSeeds, ...held } = await planWithheld(request, capture, app);
			refuseSignInDconf(request, state, context.seed);
			const { locks } = versions;
			const unseeded = unseededFiles(capture, homePath, files, {
				paths,
				seed: context.seed
			});
			const launch = planLaunch(capture, electron, seeds, {
				...stateFiles,
				restoredFiles: versions.seeds.keys()
			});
			const plan = {
				viewPolicy: request.viewPolicy,
				name: source,
				className: className(source),
				title: application.desktop_entry?.name ?? source,
				aptPackage: install.aptPackage,
				aptRelease: install.release,
				packageVersion: application.package.version,
				libraryPackages: install.libraryPackages,
				aptSources: install.sources,
				architectures: install.architectures,
				packageFile: install.packageFile,
				...install.download === undefined ? {} : { download: install.download },
				...install.executablePackage === undefined ? {} : { executablePackage: install.executablePackage },
				...install.extraPackages === undefined ? {} : { extraPackages: install.extraPackages },
				electron,
				command: launch.command,
				opens: launch.opens,
				windowClass,
				paths,
				capturedHome: host.home,
				seedCheckpoint: state.capture.checkpoints[context.seed] ?? "baseline",
				syntheticSeed: request.syntheticSeed === true,
				seedFiles: [...seeds.keys()].sort(),
				textSeeds,
				seedModes: seedModes(capture, seeds, files, context.seed),
				stateAliases,
				unseededFiles: unseeded.filter((file) => !isLeftOut(file)),
				leftOutLocks: [...new Set([...locks, ...unseeded.filter(isLeftOut)])].sort(),
				unownedFolders: unownedChangedFolders(files, paths, isLeftOut),
				runtimeSeeds: runtimeSeeds([...seeds.keys()]),
				dconf,
				captureEvidenceId: context.evidenceId,
				withheld: held.withheld,
				consentedFiles: held.consented
			};
			const unreadDconf = unreadDconfLimitation(stateFiles.dconf, context.seed);
			const limitations = [...installLimitations(install, application.package, electron), ...unreadDconf === undefined ? [] : [unreadDconf]];
			return {
				plan,
				seeds,
				held: {
					captured: versions.seeds,
					consent: held.consent
				},
				limitations,
				collisions,
				files,
				trashed: trashedFiles(files, context.seed),
				dconf: dconfScrub
			};
		};
		bundleText = (plan, admitted, dconfHoldsIdentity, consent) => {
			const environment = `envs/${plan.name}`;
			const text = (path, content, holdsIdentity = false) => ({
				path,
				bytes: Buffer.from(content),
				holdsIdentity
			});
			return {
				readme: (scrub) => text("README.md", renderReadme(plan, admitted?.readme, scrub)),
				generated: [
					text(`${environment}/env.toml`, renderEnvToml(plan)),
					text(`${environment}/${appModuleFile(plan.name)}`, renderAppClass({
						...plan,
						relaunchOnReset: admitted?.screenJudged === true
					}), dconfHoldsIdentity),
					text(`${environment}/SKILL.md`, renderSkill(plan)),
					...installFiles(plan).map(({ path, content }) => text(`${environment}/${path}`, content)),
					text("tasks/smoke.json", renderSmokeTask(plan)),
					...consent === undefined ? [] : [text("consent.json", consent)],
					...(admitted?.files ?? []).map((file) => text(file.path, file.content))
				]
			};
		};
		NO_SCRUB = {
			scrubbed: [],
			recompressed: [],
			unscrubbed: []
		};
		runExport = async (request, readers, signal) => {
			const { evidence, capture } = await readDesktopCapture(request.capture, signal);
			const stateEvidence = await inspectDesktopApplicationState(request.capture, readers, signal, { viewPolicy: request.viewPolicy });
			if (stateEvidence instanceof AnalysisError) throw stateEvidence;
			const state = desktopApplicationStateSchema.parse(stateEvidence.normalized_result);
			const { checkpoints } = state.capture;
			const ends = selectStateEnds(checkpoints, {
				seed: request.seedCheckpoint,
				end: request.endCheckpoint
			}, OPERATION);
			const { home, hostname, user } = capture.host;
			const identity = {
				home,
				hostname: hostname ?? null,
				user: user ?? null
			};
			const { plan, seeds, held, collisions, files, trashed, dconf, ...install } = await planExport(request, capture, state, {
				evidenceId: evidence.evidence_id,
				seed: ends.seed,
				identity,
				download: await readDownloadInstall(request.downloadInstall, signal)
			});
			const copies = retainedCopies(plan, seeds);
			const reads = await taskReads(request, SEED_MAX_BYTES, {
				copies,
				files,
				ends,
				identity,
				checkpoints,
				taskReader: readers.taskReader,
				signal
			});
			const admitted = await admitDesktopTasks({
				paths: request.tasks,
				ends: request.taskEnds ?? []
			}, {
				...plan,
				files,
				identity,
				ends,
				checkpoints,
				...reads,
				seeded: new Set(seeds.keys())
			}, signal);
			const copy = await withheldCopy(request, plan, held.captured, signal);
			const text = bundleText(plan, admitted, dconf.holdsIdentity, held.consent);
			const { generated, readme } = text;
			let scrub = NO_SCRUB;
			const completion = await writeOutputTree(copy.bundle, (tree) => withRetainedContent(request.capture, async (content) => {
				const bundle = {
					generated,
					copies,
					identity,
					readme
				};
				scrub = await writeFiles(tree, content, bundle, signal);
			}, SEED_MAX_BYTES), {
				operation: OPERATION,
				field: "directory"
			}, signal);
			const limitations = exportLimitations(capture, plan, {
				install: install.limitations,
				collisions,
				identity,
				trashed,
				recovered: scrub.recovered ?? [],
				task: admitted?.limitations ?? [],
				files
			});
			const result = {
				directory: request.directory,
				environment: plan.name,
				framework_version: DESKTOP_EXPORT_FRAMEWORK_VERSION,
				checkpoints: {
					seed: checkpoints[ends.seed] ?? "baseline",
					end: checkpoints[ends.end] ?? "baseline"
				},
				paths: plan.paths,
				seed_files: plan.seedFiles,
				unseeded_files: plan.unseededFiles,
				scrubbed_files: [...scrub.scrubbed].sort(),
				recompressed_files: [...scrub.recompressed].sort(),
				unscrubbed_files: [...scrub.unscrubbed].sort(),
				dconf_groups: dconf.groups,
				files: [
					"README.md",
					...generated.map((file) => file.path),
					...copies.map((copy) => copy.path)
				],
				limitations,
				tasks: admitted?.summaries ?? [],
				withheld_files: plan.withheld ?? [],
				consented_files: plan.consentedFiles ?? []
			};
			let copyCompletion = undefined;
			let copyFailure;
			try {
				copyCompletion = await copy.write();
			} catch (cause) {
				copyFailure = { cause };
			}
			return {
				result,
				captureEvidenceId: evidence.evidence_id,
				completion,
				copyCompletion,
				copyFailure
			};
		};
		publishedExportFailure = (request, evidence, { completion, copyCompletion, copyFailure }, signal) => {
			const bundleFailure = desktopOutputFailure({
				provider: DESKTOP_PROVIDER.id,
				operation: OPERATION,
				what: "bundle"
			}, request.directory, completion, evidence);
			const copyOutputFailure = copyCompletion === undefined ? undefined : desktopOutputFailure({
				provider: DESKTOP_PROVIDER.id,
				operation: OPERATION,
				what: "withheld copy"
			}, request.withheldCopy ?? "", copyCompletion, evidence);
			if (copyFailure !== undefined) {
				const failure = desktopOperationFailure(copyFailure.cause, signal, OPERATION, "Desktop export");
				if (completion.cancellation !== undefined) analysisErrorWithCancellation(failure, completion.cancellation);
				failure.retainPartialObservation(evidence);
				if (bundleFailure?.cleanupIncomplete !== true) return failure;
				if (copyFailure.cause instanceof AnalysisCancelledError) return analysisErrorWithCancellation(bundleFailure, copyFailure.cause);
				const cleanup = bundleFailure;
				const combined = new ProviderAdapterError(DESKTOP_PROVIDER.id, OPERATION, {
					cause: failure,
					cleanupPrimary: failure,
					partialObservation: evidence,
					userMessage: `The bundle was written to ${request.directory}, but the withheld copy failed and bundle handles could not be closed.`,
					cleanup: {
						reason: "Bundle output handles could not be closed.",
						resources: [request.directory]
					}
				});
				combined.retainSecondaryFailure(cleanup);
				combined.bindCleanupDependencies([cleanup, failure]);
				return combined;
			}
			const failures = [bundleFailure, copyOutputFailure].filter((failure) => failure !== undefined);
			if (failures.length === 0) return undefined;
			const cleanupFailures = failures.filter((failure) => !(failure instanceof AnalysisCancelledError));
			if (cleanupFailures.length === 0) return failures[0];
			for (const failure of failures) if (failure instanceof AnalysisCancelledError) analysisErrorWithCancellation(cleanupFailures[0], failure);
			if (cleanupFailures.length === 1) return cleanupFailures[0];
			const combined = new ProviderAdapterError(DESKTOP_PROVIDER.id, OPERATION, {
				userMessage: "The bundle and withheld copy were written, but their output handles could not be closed.",
				partialObservation: evidence,
				cleanup: {
					reason: "Output handles could not be closed.",
					resources: cleanupFailures.flatMap((failure) => failure.cleanupResources ?? [])
				}
			});
			for (const failure of cleanupFailures) combined.retainSecondaryFailure(failure);
			combined.bindCleanupDependencies(cleanupFailures);
			for (const cancellation of [completion.cancellation, copyCompletion?.cancellation]) if (cancellation !== undefined) analysisErrorWithCancellation(combined, cancellation);
			return combined;
		};
		exportDesktopApplication = async (request, readers, signal) => {
			try {
				const { result, captureEvidenceId, completion, copyCompletion, copyFailure } = await runExport(request, readers, signal);
				const evidence = createEvidence(unknownTarget("not-observed"), DESKTOP_PROVIDER, {
					predicateType: "rea.desktop-application-export",
					operation: OPERATION,
					parameters: {
						capture_evidence_id: captureEvidenceId,
						named: request.name !== undefined,
						tasks: request.tasks.length,
						task_ends: [...request.taskEnds ?? []],
						package_url: request.packageUrl !== undefined,
						download_install: request.downloadInstall !== undefined,
						extra_packages: [...request.extraPackages ?? []],
						seed_checkpoint: request.seedCheckpoint ?? null,
						end_checkpoint: request.endCheckpoint ?? null,
						synthetic_seed: request.syntheticSeed === true,
						withhold_from: request.withhold?.from ?? null,
						withhold_to: request.withhold?.to ?? null,
						withhold_paths: [...request.withhold?.paths ?? []],
						seed_withheld: request.seedWithheld === true,
						...request.viewPolicy === undefined ? {} : { view_policy: { ...request.viewPolicy } }
					},
					result: {
						...result,
						checkpoints: { ...result.checkpoints },
						paths: [...result.paths],
						seed_files: [...result.seed_files],
						unseeded_files: [...result.unseeded_files],
						scrubbed_files: [...result.scrubbed_files],
						recompressed_files: [...result.recompressed_files],
						unscrubbed_files: [...result.unscrubbed_files],
						files: [...result.files],
						limitations: [...result.limitations],
						withheld_files: result.withheld_files.map((file) => ({ ...file })),
						consented_files: [...result.consented_files]
					},
					confidence: "derived",
					authority: "analyst-inference",
					limitations: [...result.limitations]
				});
				return publishedExportFailure(request, evidence, {
					completion,
					copyCompletion,
					copyFailure
				}, signal) ?? evidence;
			} catch (cause) {
				return desktopOperationFailure(cause, signal, OPERATION, "Desktop export");
			}
		};
	})))();
}

//#endregion
init_DesktopApplicationExport();
export { exportDesktopApplication };