import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { init_analysisErrorCore, init_sha256Hex, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { CLI_COMMANDS, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { init_commandRegistry, registerCliCommand } from "./commandRegistry-DHcPW-cJ.js";
import { init_cliLogging, logCliCommand } from "./cliLogging-DAqnc-c2.js";
import { AnalysisCleanupLease, ArtifactReaderFailure, ArtifactResourceScope, init_AnalysisCleanupLease, init_ArtifactReader, init_ArtifactResourceScope, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { init_cliResources, ownCliProcessResource } from "./cliResources-Bw83MG-j.js";
import { RetainedRegularFileCleanupFailure, bindRegularFileCleanup, init_RegularFileRead } from "./RegularFileRead-CRu2Ia6l.js";
import { boundedList, init_boundedList } from "./boundedList-D6JdQAuV.js";
import { cliDecimalField, init_options } from "./options-BYpy7iiK.js";
import { MANAGED_SKILL_FILES, init_SetupSkill, readSkillFile } from "./SetupSkill-C0Ili3Va.js";
import { init_guidanceContracts, readGuidanceSectionInputSchema, readGuidanceSectionOutputSchema, searchGuidanceInputSchema, searchGuidanceLimitSchema, searchGuidanceOutputSchema } from "./guidanceContracts-CzjL8u61.js";
import { fileURLToPath } from "node:url";
import { z } from "zod";

//#region dist/application/GuidanceSections.js
var MAX_SECTIONS, MAX_EXPANDED_CHARACTERS, blank, headingTitle, atxHeading, readHeadings, parseGuidanceSections;
function init_GuidanceSections() {
	return (init_GuidanceSections = __esmMin((() => {
		MAX_SECTIONS = 4096;
		MAX_EXPANDED_CHARACTERS = 6 * 4194304;
		blank = (value) => value === " " || value === "	";
		headingTitle = (raw) => {
			let start = 0;
			let end = raw.length;
			while (start < end && blank(raw[start])) start += 1;
			while (end > start && blank(raw[end - 1])) end -= 1;
			let hashes = end;
			while (hashes > start && raw[hashes - 1] === "#") hashes -= 1;
			if (hashes < end && (hashes === start || blank(raw[hashes - 1]))) {
				end = hashes;
				while (end > start && blank(raw[end - 1])) end -= 1;
			}
			return raw.slice(start, end);
		};
		atxHeading = (line) => {
			const match = /^ {0,3}(#{1,6})(?:[ \t]+(.*)|$)/u.exec(line);
			if (match?.[1] === undefined) return undefined;
			const raw = match[2] ?? "";
			const title = headingTitle(raw);
			return {
				level: match[1].length,
				title
			};
		};
		readHeadings = (content, remaining) => {
			const headings = [];
			const enclosing = [];
			let fence;
			let start = 0;
			while (start < content.length) {
				const newline = content.indexOf("\n", start);
				const end = newline < 0 ? content.length : newline;
				const line = content.slice(start, end);
				const fenceMatch = /^ {0,3}(`{3,}|~{3,})(.*)$/u.exec(line);
				const marker = fenceMatch?.[1];
				if (fence !== undefined) {
					if (marker?.[0] === fence.marker && marker.length >= fence.length && /^[ \t]*$/u.test(fenceMatch?.[2] ?? "")) fence = undefined;
				} else if (marker !== undefined && !(marker[0] === "`" && fenceMatch?.[2]?.includes("`"))) {
					fence = {
						marker: marker[0] ?? "",
						length: marker.length
					};
				} else {
					const parsed = atxHeading(line);
					if (parsed !== undefined) {
						if (headings.length >= remaining) return undefined;
						while ((enclosing.at(-1)?.level ?? 0) >= parsed.level) {
							const parent = enclosing.pop();
							if (parent !== undefined) parent.end = start;
						}
						const heading = {
							...parsed,
							start,
							end: content.length,
							ordinal: headings.length,
							parent: enclosing.at(-1)?.ordinal
						};
						headings.push(heading);
						enclosing.push(heading);
					}
				}
				start = newline < 0 ? content.length : newline + 1;
			}
			return headings;
		};
		parseGuidanceSections = (files) => {
			const documents = [];
			let count = 0;
			let expanded = 0;
			for (const [guide, content] of files) {
				const headings = readHeadings(content, MAX_SECTIONS - count);
				if (headings === undefined) return undefined;
				count += headings.length;
				for (const heading of headings) {
					expanded += heading.end - heading.start;
					if (expanded > MAX_EXPANDED_CHARACTERS) return undefined;
				}
				documents.push({
					guide,
					content,
					headings
				});
			}
			const sections = [];
			for (const { guide, content, headings } of documents) {
				const guideSections = [];
				for (const [ordinal, heading] of headings.entries()) {
					const ownEnd = headings[ordinal + 1]?.start ?? heading.end;
					const section = {
						guide,
						ordinal,
						heading: heading.title,
						content: content.slice(heading.start, heading.end).trim(),
						ownContent: content.slice(heading.start, ownEnd).trim(),
						parent: heading.parent === undefined ? undefined : guideSections[heading.parent]
					};
					guideSections.push(section);
					sections.push(section);
				}
			}
			return sections;
		};
	})))();
}

//#endregion
//#region dist/application/GuidanceAccess.js
var SKILL_ROOT, SOURCE, MAX_GUIDE_FILE_BYTES, MAX_GUIDE_BUNDLE_BYTES, readPackagedGuide, guidanceCleanupFailure, readBundle, words, GENERIC_QUERY_WORDS, sectionLocator, runGuidanceOperation, searchGuidanceWithReader, readGuidanceSectionWithReader, invalidInput, searchGuidance, searchGuidanceInScope, rankSections, isWithin, subsectionPointers, presentMatch, readGuidanceSection, readGuidanceSectionInScope, encodeGuidanceCursor, decodeGuidanceCursor, decodeLocator, contextFor, compareText;
function init_GuidanceAccess() {
	return (init_GuidanceAccess = __esmMin((() => {
		init_boundedList();
		init_resources();
		init_SetupSkill();
		init_identity();
		init_guidanceContracts();
		init_analysisErrorCore();
		init_providerCleanupError();
		init_RegularFileRead();
		init_inputIssueProjection();
		init_result();
		init_GuidanceSections();
		init_sha256Hex();
		SKILL_ROOT = `../../skills/${PRODUCT_IDENTITY.skillName}/`;
		SOURCE = "installed_rea_guidance";
		MAX_GUIDE_FILE_BYTES = 1048576;
		MAX_GUIDE_BUNDLE_BYTES = 4194304;
		readPackagedGuide = (relativePath, resources) => readSkillFile(fileURLToPath(new URL(`${SKILL_ROOT}${relativePath}`, new URL("../application/GuidanceAccess.js", import.meta.url).href)), resources, MAX_GUIDE_FILE_BYTES);
		guidanceCleanupFailure = (cause, resources, operation) => {
			const observation = ArtifactReaderFailure.cleanupObservation(cause, resources.cleanupResources);
			const error = new ProviderCleanupError("rea", resources.cleanupResources, {
				phase: "managed_guidance_read",
				reason: observation.reason
			}, {
				operation,
				cause,
				cleanup: observation,
				remediationAction: "Close REA so it can retry releasing the retained guidance file handle. Do not repeat the request until cleanup completes."
			});
			bindRegularFileCleanup(cause, error);
			return error;
		};
		readBundle = async (readGuide, resources, operation) => {
			const files = new Map();
			let bundleBytes = 0;
			try {
				for (const relativePath of MANAGED_SKILL_FILES) {
					const content = await readGuide(relativePath);
					bundleBytes += Buffer.byteLength(content, "utf8");
					if (bundleBytes > MAX_GUIDE_BUNDLE_BYTES) return {
						kind: "unavailable",
						message: "Installed REA guidance exceeds the 4 MiB bundle allowance; no partial bundle was indexed."
					};
					files.set(relativePath, content.replaceAll("\r\n", "\n"));
				}
			} catch (cause) {
				return cause instanceof RetainedRegularFileCleanupFailure || cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined ? {
					kind: "cleanup",
					error: guidanceCleanupFailure(cause, resources, operation)
				} : {
					kind: "unavailable",
					message: "Installed REA guidance is missing or unreadable; no complete bundle could be indexed."
				};
			}
			const digest = sha256Hex([...files].map(([path, content]) => `${path}\0${sha256Hex(content)}\n`).join(""));
			const sections = parseGuidanceSections(files);
			if (sections === undefined) return {
				kind: "unavailable",
				message: "Installed REA guidance exceeds the 4,096-section or 25,165,824 expanded UTF-16-code-unit index allowance; no partial index was used."
			};
			return {
				kind: "available",
				bundle: {
					digest,
					sections
				}
			};
		};
		words = (text) => [...new Set(text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])];
		GENERIC_QUERY_WORDS = new Set([
			"a",
			"about",
			"an",
			"and",
			"are",
			"as",
			"at",
			"be",
			"been",
			"by",
			"can",
			"could",
			"did",
			"do",
			"does",
			"for",
			"from",
			"how",
			"i",
			"in",
			"is",
			"it",
			"my",
			"of",
			"on",
			"or",
			"should",
			"so",
			"that",
			"the",
			"their",
			"there",
			"they",
			"this",
			"to",
			"was",
			"we",
			"were",
			"what",
			"when",
			"where",
			"which",
			"who",
			"why",
			"will",
			"with",
			"would",
			"you",
			"your"
		]);
		sectionLocator = (bundle, section) => {
			const identity = JSON.stringify({
				v: 1,
				bundle: bundle.digest,
				guide: section.guide,
				ordinal: section.ordinal,
				section: sha256Hex(section.content)
			});
			return `rea-guide-v1.${Buffer.from(identity).toString("base64url")}`;
		};
		runGuidanceOperation = async (resources, operationName, operation) => {
			try {
				return await resources.run(async () => {
					const child = new ArtifactResourceScope();
					try {
						return await operation(child);
					} finally {
						if (child.hasPending) resources.retain({
							kind: "lease",
							resource: "managed guidance operation",
							lease: new AnalysisCleanupLease(() => child.close(), { get cleanupResources() {
								return child.cleanupResources;
							} })
						});
						else await child.close();
					}
				});
			} catch (cause) {
				if (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined) return err(guidanceCleanupFailure(cause, resources, operationName));
				throw cause;
			}
		};
		searchGuidanceWithReader = (input, readGuide, resources) => runGuidanceOperation(resources, "search_guidance", (child) => searchGuidanceInScope(input, (path) => readGuide(path, child), child));
		readGuidanceSectionWithReader = (input, readGuide, resources) => runGuidanceOperation(resources, "read_guidance_section", (child) => readGuidanceSectionInScope(input, (path) => readGuide(path, child), child));
		invalidInput = (operation, input, issues) => err(analysisInputErrorFromIssues(operation, issues, input));
		searchGuidance = async (input, resources) => searchGuidanceWithReader(input, readPackagedGuide, resources);
		searchGuidanceInScope = async (input, readGuide, resources) => {
			const parsed = searchGuidanceInputSchema.safeParse(input);
			if (!parsed.success) return invalidInput("search_guidance", input, parsed.error.issues);
			const cursor = parsed.data.cursor === undefined ? undefined : decodeGuidanceCursor(parsed.data.cursor);
			if (parsed.data.cursor !== undefined && cursor === undefined) return invalidInput("search_guidance", input, [{
				code: "custom",
				path: ["cursor"],
				message: "Invalid guidance continuation token"
			}]);
			const queryDigest = sha256Hex(parsed.data.query);
			if (cursor !== undefined && cursor.query !== queryDigest) return invalidInput("search_guidance", input, [{
				code: "custom",
				path: ["cursor"],
				message: "The continuation token belongs to a different query"
			}]);
			const loaded = await readBundle(readGuide, resources, "search_guidance");
			if (loaded.kind === "cleanup") return err(loaded.error);
			if (loaded.kind === "unavailable") return ok(searchGuidanceOutputSchema.parse({
				status: "bundle_unavailable",
				source: SOURCE,
				content_kind: "documentation",
				message: loaded.message
			}));
			const bundle = loaded.bundle;
			if (cursor !== undefined && cursor.bundle !== bundle.digest) return ok(searchGuidanceOutputSchema.parse({
				status: "stale_continuation",
				source: SOURCE,
				content_kind: "documentation",
				message: "The installed guidance changed since this search page was issued. Restart the search to continue with current content."
			}));
			const queryWords = words(parsed.data.query);
			const { coverage, ranked } = rankSections(bundle.sections, queryWords, queryWords.filter((word) => !GENERIC_QUERY_WORDS.has(word)));
			if (ranked.length === 0) return ok(searchGuidanceOutputSchema.parse({
				status: "no_matches",
				source: SOURCE,
				content_kind: "documentation",
				query: parsed.data.query,
				message: "No bundled guidance sections matched this query. This does not indicate whether an analysis capability is available.",
				total_matches: 0
			}));
			const offset = cursor?.offset ?? 0;
			if (cursor !== undefined && offset >= ranked.length) return invalidInput("search_guidance", input, [{
				code: "custom",
				path: ["cursor"],
				message: "The continuation token does not select a remaining result page"
			}]);
			const page = ranked.slice(offset, offset + parsed.data.limit);
			const hasMore = offset + page.length < ranked.length;
			return ok(searchGuidanceOutputSchema.parse({
				status: "matches",
				source: SOURCE,
				content_kind: "documentation",
				package: `${PRODUCT_IDENTITY.packageName}@${PRODUCT_IDENTITY.packageVersion}`,
				bundle_sha256: bundle.digest,
				query: parsed.data.query,
				matches: page.map((match) => presentMatch(bundle, match, coverage)),
				total_matches: ranked.length,
				offset,
				limit: parsed.data.limit,
				has_more: hasMore,
				...hasMore ? { next_cursor: encodeGuidanceCursor({
					v: 1,
					bundle: bundle.digest,
					query: queryDigest,
					offset: offset + page.length
				}) } : {}
			}));
		};
		rankSections = (sections, queryWords, specificWords) => {
			if (specificWords.length === 0) return {
				coverage: [],
				ranked: []
			};
			const bySection = new Map();
			const coverage = sections.map((section) => {
				const own = new Set(words(section.ownContent));
				const present = queryWords.filter((word) => own.has(word));
				const fact = {
					section,
					own: present,
					subtree: new Set(present),
					childCovers: false
				};
				bySection.set(section, fact);
				return fact;
			});
			const covers = (terms) => specificWords.every((word) => terms.has(word));
			for (const fact of coverage.toReversed()) {
				const parent = fact.section.parent === undefined ? undefined : bySection.get(fact.section.parent);
				if (parent === undefined) continue;
				for (const word of fact.subtree) parent.subtree.add(word);
				if (covers(fact.subtree)) parent.childCovers = true;
			}
			const ranked = coverage.flatMap((fact, index) => {
				if (!covers(fact.subtree)) return [];
				const own = new Set(fact.own);
				const focused = covers(own);
				if (!focused && fact.childCovers) return [];
				const matched = focused ? fact.own : queryWords.filter((word) => fact.subtree.has(word));
				const headingWords = new Set(words(fact.section.heading));
				return [{
					section: fact.section,
					scope: focused ? "section" : "subsections",
					matched,
					score: matched.length + matched.filter((word) => headingWords.has(word)).length * 2,
					own: fact.own,
					scattered: specificWords.filter((word) => !own.has(word)),
					index
				}];
			}).sort((left, right) => Number(left.scope === "subsections") - Number(right.scope === "subsections") || right.score - left.score || left.section.content.length - right.section.content.length || compareText(left.section.guide, right.section.guide) || left.section.ordinal - right.section.ordinal);
			return {
				coverage,
				ranked
			};
		};
		isWithin = (section, ancestor) => {
			for (let parent = section.parent; parent !== undefined;) {
				if (parent === ancestor) return true;
				parent = parent.parent;
			}
			return false;
		};
		subsectionPointers = (match, coverage) => {
			const descendants = [];
			for (let index = match.index + 1; index < coverage.length; index += 1) {
				const fact = coverage[index];
				if (fact === undefined || !isWithin(fact.section, match.section)) break;
				descendants.push(fact);
			}
			const remaining = new Set(match.scattered);
			const pointers = [];
			while (remaining.size > 0) {
				let best;
				let bestCount = 0;
				for (const fact of descendants) {
					const count = fact.own.filter((word) => remaining.has(word)).length;
					if (count > bestCount) {
						best = fact;
						bestCount = count;
					}
				}
				if (best === undefined) break;
				for (const word of best.own) remaining.delete(word);
				pointers.push(best);
			}
			return boundedList(pointers, 8);
		};
		presentMatch = (bundle, match, coverage) => {
			const { section, scope, matched } = match;
			const common = {
				guide: section.guide,
				heading: section.heading,
				locator: sectionLocator(bundle, section),
				match_scope: scope,
				matched_terms: matched,
				content_length: section.content.length
			};
			if (scope === "section") return {
				...common,
				relevance: `Matched ${matched.join(", ")} in this section's own text.`,
				context: contextFor(section.ownContent, matched)
			};
			const { items: pointers, omitted } = subsectionPointers(match, coverage);
			return {
				...common,
				relevance: `Matched ${matched.join(", ")} only across different subsections; no single subsection contains every term.`,
				context: contextFor(section.content, matched),
				own_text_terms: match.own,
				subsections: pointers.map((pointer) => ({
					heading: pointer.section.heading,
					locator: sectionLocator(bundle, pointer.section),
					matched_terms: pointer.own
				})),
				...omitted === 0 ? {} : { omitted_subsections: omitted }
			};
		};
		readGuidanceSection = async (input, resources) => readGuidanceSectionWithReader(input, readPackagedGuide, resources);
		readGuidanceSectionInScope = async (input, readGuide, resources) => {
			const parsed = readGuidanceSectionInputSchema.safeParse(input);
			if (!parsed.success) return invalidInput("read_guidance_section", input, parsed.error.issues);
			const identity = decodeLocator(parsed.data.locator);
			if (identity === undefined) return invalidInput("read_guidance_section", input, [{
				code: "custom",
				path: ["locator"],
				message: "Malformed or unsupported guidance locator"
			}]);
			const loaded = await readBundle(readGuide, resources, "read_guidance_section");
			if (loaded.kind === "cleanup") return err(loaded.error);
			if (loaded.kind === "unavailable") return ok(readGuidanceSectionOutputSchema.parse({
				status: "bundle_unavailable",
				source: SOURCE,
				content_kind: "documentation",
				message: loaded.message
			}));
			const bundle = loaded.bundle;
			if (identity.bundle !== bundle.digest) return ok(readGuidanceSectionOutputSchema.parse({
				status: "stale_locator",
				source: SOURCE,
				content_kind: "documentation",
				message: "The installed guidance changed since this locator was issued. Search again for a current locator."
			}));
			const section = bundle.sections.find((candidate) => candidate.guide === identity.guide && candidate.ordinal === identity.ordinal && sha256Hex(candidate.content) === identity.section);
			if (section === undefined) return ok(readGuidanceSectionOutputSchema.parse({
				status: "stale_locator",
				source: SOURCE,
				content_kind: "documentation",
				message: "The selected section is no longer present in the installed guidance. Search again."
			}));
			return ok(readGuidanceSectionOutputSchema.parse({
				status: "section",
				source: SOURCE,
				content_kind: "documentation",
				package: `${PRODUCT_IDENTITY.packageName}@${PRODUCT_IDENTITY.packageVersion}`,
				bundle_sha256: bundle.digest,
				guide: section.guide,
				heading: section.heading,
				locator: parsed.data.locator,
				content: section.content
			}));
		};
		encodeGuidanceCursor = (cursor) => `rea-guidance-page-v1.${Buffer.from(JSON.stringify(cursor)).toString("base64url")}`;
		decodeGuidanceCursor = (cursor) => {
			const prefix = "rea-guidance-page-v1.";
			if (!cursor.startsWith(prefix)) return undefined;
			try {
				const value = JSON.parse(Buffer.from(cursor.slice(prefix.length), "base64url").toString("utf8"));
				if (typeof value !== "object" || value === null) return undefined;
				const item = value;
				if (item.v !== 1 || typeof item.bundle !== "string" || !/^[a-f0-9]{64}$/u.test(item.bundle) || typeof item.query !== "string" || !/^[a-f0-9]{64}$/u.test(item.query) || typeof item.offset !== "number" || !Number.isInteger(item.offset) || item.offset < 1) return undefined;
				return item;
			} catch {
				return undefined;
			}
		};
		decodeLocator = (locator) => {
			if (!locator.startsWith("rea-guide-v1.")) return undefined;
			try {
				const value = JSON.parse(Buffer.from(locator.slice("rea-guide-v1.".length), "base64url").toString("utf8"));
				if (typeof value !== "object" || value === null) return undefined;
				const item = value;
				if (item.v !== 1 || typeof item.bundle !== "string" || !/^[a-f0-9]{64}$/u.test(item.bundle) || typeof item.guide !== "string" || !MANAGED_SKILL_FILES.includes(item.guide) || !Number.isInteger(item.ordinal) || typeof item.section !== "string" || !/^[a-f0-9]{64}$/u.test(item.section)) return undefined;
				return item;
			} catch {
				return undefined;
			}
		};
		contextFor = (content, matched) => {
			const lines = content.split("\n");
			const heading = lines[0] ?? "";
			const terms = new Set(matched);
			let bestIndex = -1;
			let bestScore = 0;
			lines.slice(1).forEach((line, index) => {
				const score = words(line).filter((word) => terms.has(word)).length;
				if (score > bestScore) {
					bestScore = score;
					bestIndex = index + 1;
				}
			});
			const excerptStart = bestIndex < 0 ? 1 : Math.max(1, bestIndex - 1);
			const excerptEnd = bestIndex < 0 ? 4 : bestIndex + 2;
			return [heading, ...lines.slice(excerptStart, excerptEnd)].join(" ").replaceAll(/\s+/gu, " ").slice(0, 500);
		};
		compareText = (left, right) => left < right ? -1 : left > right ? 1 : 0;
	})))();
}

//#endregion
//#region dist/cli/guidanceCommands.js
var guidanceCommands_exports = /* @__PURE__ */ __exportAll({ registerGuidanceCommands: () => registerGuidanceCommands });
var retainedResources, registerGuidanceCommands;
function init_guidanceCommands() {
	return (init_guidanceCommands = __esmMin((() => {
		init_resources();
		init_GuidanceAccess();
		init_guidanceContracts();
		init_cliCommandNames();
		init_cliLogging();
		init_analysisErrorProjection();
		init_commandRegistry();
		init_options();
		init_cliResources();
		;
		/** Release CLI-owned guidance descriptors, retaining failed cleanup for retry. */
		ownCliProcessResource("guidance", async () => {
			const resources = retainedResources;
			if (resources === undefined) return;
			await resources.close();
			if (retainedResources === resources) retainedResources = undefined;
		});
		registerGuidanceCommands = (cli, logger) => {
			registerCliCommand(cli, CLI_COMMANDS.guidance, {
				description: "Search or read the installed REA workflow guidance",
				args: z.object({}),
				options: z.object({
					action: z.enum(["search", "read"]).default("search").describe("Guidance action to perform: search or read"),
					query: searchGuidanceInputSchema.shape.query.optional().describe("Required with search; all non-generic query words must match"),
					locator: readGuidanceSectionInputSchema.shape.locator.optional().describe("Required with --action read; locator returned by search"),
					limit: cliDecimalField(searchGuidanceLimitSchema.optional()).describe("Maximum search matches; search only, defaults to 8"),
					cursor: searchGuidanceInputSchema.shape.cursor.optional().describe("Continue a search page; search only")
				}).superRefine((options, context) => {
					if (options.action === "search") {
						if (options.query === undefined) context.addIssue({
							code: "custom",
							path: ["query"],
							message: "--query is required with --action search"
						});
						if (options.locator !== undefined) context.addIssue({
							code: "custom",
							path: ["locator"],
							message: "--locator can only be used with --action read"
						});
					} else {
						if (options.locator === undefined) context.addIssue({
							code: "custom",
							path: ["locator"],
							message: "--locator is required with --action read"
						});
						for (const option of [
							"query",
							"limit",
							"cursor"
						]) if (options[option] !== undefined) context.addIssue({
							code: "custom",
							path: [option],
							message: `--${option} can only be used with --action search`
						});
					}
				}),
				run: ({ options }) => logCliCommand(logger, CLI_COMMANDS.guidance, async () => {
					const resources = retainedResources ??= new ArtifactResourceScope();
					const result = options.action === "search" ? await searchGuidance({
						...options.query === undefined ? {} : { query: options.query },
						...options.limit === undefined ? {} : { limit: options.limit },
						...options.cursor === undefined ? {} : { cursor: options.cursor }
					}, resources) : await readGuidanceSection({ locator: options.locator }, resources);
					return result.ok ? result.value : projectAnalysisError(result.error);
				})
			}, { operations: [{
				name: "search_guidance",
				flags: {
					query: "--query",
					limit: "--limit",
					cursor: "--cursor"
				}
			}, {
				name: "read_guidance_section",
				flags: { locator: "--locator" }
			}] });
		};
	})))();
}

//#endregion
export { guidanceCommands_exports, init_guidanceCommands };