import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { JAVASCRIPT_STATIC_FACT_BYTES, coverageStatusSchema, freezeJsonSnapshot, freezeOwnedJsonSnapshotSteps, init_coverage, init_immutableJson, init_javascriptAnalysisResourceControls, init_jsonValue, jsonValueSchema, knownCoverageStatusSchema } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { canonicalJson, canonicalJsonDigestSteps, init_canonicalJsonDigestSteps, init_comparisonSemantics } from "./nativeValueFlow-13oOEkkJ.js";
import { init_canonicalOrdering, uniqueSorted } from "./canonicalOrdering-C7Yzy62j.js";
import { digestSchema, init_digests, prefixedDigestSchema } from "./targetIdentity-rKLLVwEj.js";
import { init_textSchemas, nonEmptyTextSchema } from "./textSchemas-UeTwLioW.js";
import { init_jsonValueByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { applicationCoverageSchema, applicationGraphEvidenceSchema, applicationNodeIdentitySchema, init_javascriptApplicationEvidenceSchemas, init_javascriptRouteFacts, init_javascriptSourceCoordinates, javaScriptRouteCandidateSchema, javaScriptRouteMechanismSchema, javaScriptRouteSegmentSchema, javaScriptRouteSourceFactsSchema, javascriptSourceRangeSchema } from "./javascriptSemanticGraphSchemas-Cmwji5L9.js";
import { posix } from "node:path";
import { domainToASCII, fileURLToPath, pathToFileURL } from "node:url";
import { z } from "zod";

//#region dist/domain/javascript/javascriptRoutePaths.js
var packageIdentitySchema, nextAppSourceContextSchema, routePath, isPageShapedPath, classifyNextAppRoutePath, nextScriptBasePath;
function init_javascriptRoutePaths() {
	return (init_javascriptRoutePaths = __esmMin((() => {
		init_digests();
		packageIdentitySchema = z.strictObject({
			path: z.string().min(1),
			sha256: digestSchema,
			container_sha256: digestSchema
		});
		nextAppSourceContextSchema = z.discriminatedUnion("kind", [
			z.strictObject({
				kind: z.literal("app-directory"),
				directory: z.string().min(1),
				package: packageIdentitySchema
			}),
			z.strictObject({
				kind: z.literal("compiled-directory"),
				directory: z.string().min(1),
				package: packageIdentitySchema
			}),
			z.strictObject({
				kind: z.literal("outside-app-directory"),
				package: packageIdentitySchema
			}),
			z.strictObject({
				kind: z.literal("unknown"),
				reason: z.string(),
				package: packageIdentitySchema.nullable()
			})
		]);
		routePath = (value, options = {}) => {
			const end = options.navigation ? value.search(/[?#]/u) : -1;
			const path = end < 0 ? value : value.slice(0, end);
			if (!path || /[\u0000-\u0020\u007f\\]/u.test(path) || path.startsWith("//")) return;
			if (!path.startsWith("/") && !options.relative) return;
			if (/^[a-z][a-z0-9+.-]*:/iu.test(path)) return;
			return path.startsWith("/") ? path : `/${path}`;
		};
		isPageShapedPath = (value) => {
			const app = /(?:^|\/)app\//u.exec(value);
			if (app === null) return false;
			const tail = value.slice(app.index + app[0].length);
			const lastLineStart = Math.max(tail.lastIndexOf("\n"), tail.lastIndexOf("\r"), tail.lastIndexOf("\u2028"), tail.lastIndexOf("\u2029")) + 1;
			for (const page of tail.matchAll(/(?:^|\/)page(?:\.[cm]?[jt]sx?|-[^/?#]+\.js|)(?=[?#]|$)/gu)) if (page.index + page[0].length >= lastLineStart) return true;
			return false;
		};
		classifyNextAppRoutePath = (raw, context) => {
			if (raw.includes("\\") || context.kind === "source-reference") return;
			let value = raw;
			const urlPath = context.kind === "script-url" || context.kind === "source-literal" && raw.includes("://");
			if (urlPath) {
				try {
					value = new URL(raw).pathname;
				} catch {
					return;
				}
			}
			let relative;
			let chunk = false;
			if (context.kind === "source-path") {
				if (context.source.kind === "outside-app-directory") return;
				if (context.source.kind === "app-directory" || context.source.kind === "compiled-directory") {
					const prefix = `${context.source.directory}/`;
					if (!value.startsWith(prefix)) return;
					relative = value.slice(prefix.length);
					chunk = context.source.kind === "compiled-directory";
				}
			} else if (context.kind === "script-url" || context.runtime === "next") {
				const boundary = "/_next/static/chunks/app/";
				const assetRoot = value.indexOf(boundary);
				const localChunk = ["static/chunks/app/", ".next/static/chunks/app/"].find((prefix) => value.startsWith(prefix));
				if (assetRoot >= 0) {
					relative = value.slice(assetRoot + boundary.length);
					chunk = true;
				} else if (context.kind === "source-literal" && localChunk !== undefined) {
					relative = value.slice(localChunk.length);
					chunk = true;
				} else if (context.kind === "source-literal") {
					const prefix = value.startsWith("src/app/") ? "src/app/" : "app/";
					if (value.startsWith(prefix)) relative = value.slice(prefix.length);
				}
			}
			if (relative === undefined) {
				if (isPageShapedPath(value)) return {
					kind: "unknown",
					reason: context.kind === "source-path" && context.source.kind === "unknown" ? context.source.reason : "The page-shaped path has no established Next App Router root or runtime context."
				};
				return;
			}
			if (urlPath) {
				if (/%(?:2f|5c)/iu.test(relative)) return {
					kind: "unknown",
					reason: "A Next script URL contains an encoded path separator."
				};
				try {
					relative = decodeURIComponent(relative);
				} catch (cause) {
					if (!(cause instanceof URIError)) throw cause;
					return {
						kind: "unknown",
						reason: "A Next script URL contains malformed percent encoding."
					};
				}
			}
			const match = /^(?:([\s\S]*?)\/)?page(?:-([^/?#]+)\.js|\.(?:[cm]?jsx?|tsx?)|)([?#].*)?$/u.exec(relative);
			if (match === null || match[2] !== undefined && !chunk || match[3] !== undefined && (urlPath || context.kind === "source-path")) return;
			if (/[\u0000-\u001f\u007f]/u.test(relative)) return {
				kind: "unknown",
				reason: "A Next page filename contains a control character."
			};
			const sourceSegments = (match[1] ?? "").split("/");
			if (sourceSegments.some((segment) => segment.startsWith("_"))) return;
			const segments = [];
			for (const sourceSegment of sourceSegments) {
				const segment = sourceSegment.replace(/%5F/gu, "_");
				if (/^\([^)]*\)$/u.test(segment) || segment.startsWith("@")) continue;
				if (segment.startsWith("(")) return {
					kind: "unknown",
					reason: "An intercepted Next page route requires parent routing context unavailable from its filename."
				};
				if (segment.includes("/") || segment === "." || segment === "..") return;
				const optional = /^\[\[\.\.\.([^\]]+)\]\]$/u.exec(segment);
				const catchAll = /^\[\.\.\.([^\]]+)\]$/u.exec(segment);
				const parameter = /^\[([^\]]+)\]$/u.exec(segment);
				segments.push(optional ? `:${optional[1]}*` : catchAll ? `:${catchAll[1]}+` : parameter ? `:${parameter[1]}` : segment);
			}
			return {
				kind: "known",
				path: `/${segments.filter(Boolean).join("/")}`
			};
		};
		nextScriptBasePath = (source) => {
			let path = source;
			if (/^https?:\/\//iu.test(source)) {
				try {
					path = new URL(source).pathname;
				} catch {
					return;
				}
			} else if (!source.startsWith("/")) return;
			const at = path.indexOf("/_next/");
			return at < 0 ? undefined : path.slice(0, at);
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptRouteInventory.js
/** Join only owned syntax facts and source metadata; never fetch or reinterpret source text. */
function* buildJavaScriptRouteInventorySteps(inputs, byteBudget = JAVASCRIPT_STATIC_FACT_BYTES, captureOmissions = []) {
	const sources = [], occurrences = [], unknowns = [];
	const routes = new Map(), sourceIdsByRoute = new Map(), seenOccurrences = new Set(), seenGaps = new Set();
	const contexts = [];
	const headerBytes = jsonValueByteLength({
		inventory_id: `jsri:${"f".repeat(64)}`,
		source_manifest_sha256: "f".repeat(64),
		sources: [],
		routes: [],
		occurrences: [],
		unknowns: [],
		capacity: {
			limit_bytes: Number.MAX_SAFE_INTEGER,
			accounted_bytes: Number.MAX_SAFE_INTEGER
		},
		coverage: {
			scope: "provided-code-sources",
			source_parsing: "complete",
			candidate_enumeration: "complete",
			application_routes: "unknown"
		},
		statistics: Object.fromEntries([
			"sources_seen",
			"sources_retained",
			"route_patterns",
			"occurrences",
			"unanchored_literals_excluded"
		].map((key) => [key, Number.MAX_SAFE_INTEGER])),
		limitations: [...INVENTORY_LIMITATIONS]
	});
	if (!Number.isSafeInteger(byteBudget) || byteBudget < headerBytes) throw new RangeError(`Route inventory budget must fit its ${headerBytes}-byte envelope.`);
	let accounted = headerBytes, capacity = null, partial = false, unanchored = 0;
	const reserve = (value) => {
		if (capacity !== null) return false;
		const bytes = jsonValueByteLength(value, byteBudget - accounted) + 1;
		if (bytes > byteBudget - accounted) {
			capacity = {
				limit_bytes: byteBudget,
				accounted_bytes: accounted
			};
			partial = true;
			return false;
		}
		accounted += bytes;
		return true;
	};
	const retainGap = (body) => {
		const value = {
			id: routeGapId(body),
			...body
		};
		if (!seenGaps.has(value.id) && reserve(value)) {
			unknowns.push(value);
			seenGaps.add(value.id);
		}
	};
	const gap = (source, kind, reason, source_range = null) => retainGap({
		source_id: source.id,
		kind,
		source_range,
		reason
	});
	for (const { unit, count, reason } of captureOmissions) {
		yield;
		partial = true;
		retainGap({
			source_id: null,
			kind: "capture-omission",
			source_range: null,
			reason,
			capture_omission: {
				unit,
				count
			}
		});
	}
	const manifestIds = [];
	for (const input of inputs) {
		yield;
		const metadata = classifyNextAppRoutePath(input.url ?? input.path ?? "", input.url !== null ? { kind: "script-url" } : {
			kind: "source-path",
			source: input.next_app_context ?? {
				kind: "unknown",
				package: null,
				reason: "Next App Router source applicability was not measured."
			}
		});
		const nextContext = metadata === undefined ? undefined : input.next_app_context;
		const id = lookupId("jss", [
			input.key,
			input.path,
			input.url,
			input.sha256,
			input.container_sha256,
			...nextContext === undefined ? [] : [nextContext]
		]);
		manifestIds.push(id);
		const prefix = input.url === null ? undefined : nextScriptBasePath(input.url);
		const source = {
			id,
			key: input.key,
			path: input.path,
			url: input.url,
			sha256: input.sha256,
			container_sha256: input.container_sha256,
			status: input.status,
			...nextContext === undefined ? {} : { next_app_context: nextContext },
			reported_route_capacity: input.facts?.capacity ?? null,
			reason: input.reason,
			base_path: prefix ? {
				value: prefix,
				basis: "next-script-url",
				status: "inferred"
			} : null
		};
		if (!reserve(source)) continue;
		sources.push(source);
		const metadataPath = metadata?.kind === "known" ? metadata.path : undefined;
		contexts.push({
			input,
			source,
			metadataPath
		});
		if (metadata?.kind === "unknown") {
			partial = true;
			gap(source, "interpretation", metadata.reason);
		}
		if (input.status !== "complete" || input.facts === null) {
			partial = true;
			gap(source, "source-unavailable", input.reason ?? "Route syntax was not fully measured for this source.");
		}
		if (source.base_path !== null) gap(source, "inferred-base", "A Next script URL prefix is an inferred routing base; assetPrefix may differ from the deployed route base.");
		if (input.facts?.capacity !== null && input.facts?.capacity !== undefined) {
			partial = true;
			gap(source, "capacity", input.facts.capacity.kind === "result-bytes" ? `Route facts exceeded the ${input.facts.capacity.limit_bytes}-byte remaining serialized-result budget; additional candidates remain unknown.` : `Source route work/facts reached ${input.facts.capacity.limit_bytes} accounted bytes; additional candidates remain unknown.`);
		}
		for (const unknown of input.facts?.unresolved ?? []) {
			partial = true;
			gap(source, "interpretation", unknown.reason, unknown.location);
		}
	}
	const prefixPath = (path, source, applicationRelative) => {
		const base = source.base_path?.value;
		return base === undefined || !applicationRelative && (path === base || path.startsWith(`${base}/`)) ? path : path === "/" ? base : `${base}${path}`;
	};
	const applicationRoot = (path, source, applicationRelative) => {
		const base = source.base_path?.value;
		const start = !applicationRelative && base !== undefined && (path === base || path.startsWith(`${base}/`)) ? base.length + 1 : 1;
		const end = path.indexOf("/", start);
		return path.slice(start, end < 0 ? undefined : end);
	};
	const roots = new Set();
	for (const { input, source, metadataPath } of contexts) {
		yield;
		if (metadataPath !== undefined) {
			const root = applicationRoot(metadataPath, source, true);
			if (root) roots.add(root);
		}
		for (const candidate of input.facts?.candidates ?? []) if (candidate.mechanism !== "route-string-constant") {
			const root = applicationRoot(candidate.path, source, candidate.mechanism === "next-app-chunk");
			if (root) roots.add(root);
		}
	}
	const append = (source, candidate, origin) => {
		if (capacity !== null) return;
		const applicationRelative = candidate.mechanism === "next-app-chunk";
		const path = prefixPath(candidate.path, source, applicationRelative);
		if (candidate.mechanism === "route-string-constant" && !roots.has(applicationRoot(candidate.path, source, applicationRelative))) {
			unanchored++;
			return;
		}
		const route_id = routeId(path), inferredBase = path === candidate.path ? null : source.base_path.value;
		const identity = [
			source.id,
			path,
			candidate.mechanism,
			origin,
			candidate.location,
			candidate.segments
		];
		const id = lookupId("jso", identity);
		if (seenOccurrences.has(id)) return;
		const occurrence = {
			id,
			route_id,
			source_id: source.id,
			mechanism: candidate.mechanism,
			confidence: inferredBase === null ? candidate.confidence : "low",
			derivation: inferredBase === null ? candidate.derivation : "inferred",
			source_range: origin === "source-syntax" ? candidate.location : null,
			origin,
			unprefixed_path: candidate.path,
			inferred_base_path: inferredBase,
			segments: origin === "source-syntax" ? candidate.segments : []
		};
		let route = routes.get(path);
		if (route === undefined) {
			route = {
				id: route_id,
				path,
				...classify(path, [candidate.mechanism]),
				confidence: occurrence.confidence,
				mechanisms: [],
				occurrence_count: 0,
				source_count: 0,
				primary_occurrence_id: id
			};
			if (!reserve({
				...route,
				classification_basis: "router-configuration",
				confidence: "medium",
				mechanisms: javaScriptRouteMechanismSchema.options,
				occurrence_count: Number.MAX_SAFE_INTEGER,
				source_count: Number.MAX_SAFE_INTEGER
			})) return;
		}
		if (!reserve(occurrence)) return;
		if (!routes.has(path)) {
			routes.set(path, route);
			sourceIdsByRoute.set(route_id, new Set());
		}
		occurrences.push(occurrence);
		seenOccurrences.add(id);
		route.occurrence_count++;
		const routeSources = sourceIdsByRoute.get(route_id);
		routeSources.add(source.id);
		route.source_count = routeSources.size;
		if (!route.mechanisms.includes(candidate.mechanism)) {
			route.mechanisms.push(candidate.mechanism);
			Object.assign(route, classify(path, route.mechanisms));
		}
		if (ranks[occurrence.confidence] > ranks[route.confidence] || ranks[occurrence.confidence] === ranks[route.confidence] && id < route.primary_occurrence_id) {
			route.confidence = occurrence.confidence;
			route.primary_occurrence_id = id;
		}
	};
	for (const { input, source, metadataPath } of contexts) {
		yield;
		if (metadataPath !== undefined) append(source, {
			path: metadataPath,
			mechanism: "next-app-chunk",
			confidence: "medium",
			derivation: "joined",
			location: null,
			segments: []
		}, source.url === null ? "source-path" : "source-url");
		for (const candidate of input.facts?.candidates ?? []) {
			yield;
			append(source, candidate, "source-syntax");
			if (capacity !== null) break;
		}
	}
	sources.sort((a, b) => order(a.key, b.key) || order(a.id, b.id));
	occurrences.sort((a, b) => order(a.id, b.id));
	const items = [...routes.values()].sort((a, b) => order(a.path, b.path));
	for (const route of items) route.mechanisms.sort(order);
	unknowns.sort((a, b) => order(a.source_id ?? "", b.source_id ?? "") || order(a.kind, b.kind) || (a.source_range?.start.line ?? 0) - (b.source_range?.start.line ?? 0) || (a.source_range?.start.column ?? 0) - (b.source_range?.start.column ?? 0) || (a.source_range?.end.line ?? 0) - (b.source_range?.end.line ?? 0) || (a.source_range?.end.column ?? 0) - (b.source_range?.end.column ?? 0) || order(a.reason, b.reason));
	const source_manifest_sha256 = hash(manifestIds.sort(order));
	const result = {
		source_manifest_sha256,
		sources,
		routes: items,
		occurrences,
		unknowns,
		capacity,
		coverage: {
			scope: "provided-code-sources",
			source_parsing: sources.length === 0 ? "unknown" : sources.some((source) => source.status !== "complete") || capacity !== null ? "partial" : "complete",
			candidate_enumeration: partial ? "partial" : "complete",
			application_routes: "unknown"
		},
		statistics: {
			sources_seen: inputs.length,
			sources_retained: sources.length,
			route_patterns: items.length,
			occurrences: occurrences.length,
			unanchored_literals_excluded: unanchored
		},
		limitations: [...INVENTORY_LIMITATIONS]
	};
	return {
		inventory_id: `jsri:${hash(["javascript-routes-v1", result])}`,
		...result
	};
}
var sourceStatus, confidence, sourceShape, javaScriptRouteInventorySourceSchema, javaScriptRouteOccurrenceSchema, javaScriptInventoryRouteSchema, javaScriptRouteCaptureOmissionSchema, javaScriptRouteGapSchema, capacitySchema, inventoryShape, javaScriptRouteInventorySchema, hash, lookupId, routeGapId, routeId, order, ranks, classify, INVENTORY_LIMITATIONS;
function init_javascriptRouteInventory() {
	return (init_javascriptRouteInventory = __esmMin((() => {
		init_coverage();
		init_javascriptSourceCoordinates();
		init_canonicalDigest();
		init_jsonValueByteLength();
		init_digests();
		init_javascriptAnalysisResourceControls();
		init_javascriptRouteFacts();
		init_javascriptRoutePaths();
		sourceStatus = z.enum([...coverageStatusSchema.options, "unavailable"]);
		confidence = javaScriptRouteCandidateSchema.shape.confidence;
		sourceShape = {
			id: z.string().regex(/^jss:[a-f0-9]{32}$/u),
			key: z.string(),
			path: z.string().nullable(),
			url: z.string().nullable(),
			sha256: digestSchema.nullable(),
			container_sha256: digestSchema.nullable(),
			status: sourceStatus,
			reported_route_capacity: javaScriptRouteSourceFactsSchema.shape.capacity,
			reason: z.string().nullable(),
			next_app_context: nextAppSourceContextSchema.exactOptional(),
			base_path: z.strictObject({
				value: z.string(),
				basis: z.literal("next-script-url"),
				status: z.literal("inferred")
			}).nullable()
		};
		javaScriptRouteInventorySourceSchema = z.strictObject(sourceShape);
		javaScriptRouteOccurrenceSchema = z.strictObject({
			id: z.string().regex(/^jso:[a-f0-9]{32}$/u),
			route_id: z.string().regex(/^jsr:[a-f0-9]{32}$/u),
			source_id: sourceShape.id,
			mechanism: javaScriptRouteMechanismSchema,
			confidence,
			derivation: javaScriptRouteCandidateSchema.shape.derivation,
			source_range: javascriptSourceRangeSchema.nullable(),
			origin: z.enum([
				"source-syntax",
				"source-path",
				"source-url"
			]),
			unprefixed_path: z.string(),
			inferred_base_path: z.string().nullable(),
			segments: z.array(javaScriptRouteSegmentSchema)
		});
		javaScriptInventoryRouteSchema = z.strictObject({
			id: z.string().regex(/^jsr:[a-f0-9]{32}$/u),
			path: z.string().regex(/^\//u),
			classification: z.enum([
				"page",
				"system",
				"unknown"
			]),
			classification_basis: z.enum([
				"next-app-page",
				"router-configuration",
				"path-name-heuristic",
				"unknown"
			]),
			confidence,
			mechanisms: z.array(javaScriptRouteMechanismSchema),
			occurrence_count: z.int().nonnegative(),
			source_count: z.int().nonnegative(),
			primary_occurrence_id: javaScriptRouteOccurrenceSchema.shape.id
		});
		javaScriptRouteCaptureOmissionSchema = z.strictObject({
			unit: z.enum(["script-records", "script-sources"]),
			count: z.int().nonnegative().nullable()
		});
		javaScriptRouteGapSchema = z.strictObject({
			id: z.string().regex(/^jsg:[a-f0-9]{32}$/u),
			source_id: sourceShape.id.nullable(),
			kind: z.enum([
				"source-unavailable",
				"interpretation",
				"inferred-base",
				"capacity",
				"capture-omission"
			]),
			source_range: javascriptSourceRangeSchema.nullable(),
			reason: z.string(),
			capture_omission: javaScriptRouteCaptureOmissionSchema.exactOptional()
		});
		capacitySchema = z.strictObject({
			limit_bytes: z.int().nonnegative(),
			accounted_bytes: z.int().nonnegative()
		});
		inventoryShape = z.strictObject({
			inventory_id: z.string().regex(/^jsri:[a-f0-9]{64}$/u),
			source_manifest_sha256: digestSchema,
			sources: z.array(javaScriptRouteInventorySourceSchema),
			routes: z.array(javaScriptInventoryRouteSchema),
			occurrences: z.array(javaScriptRouteOccurrenceSchema),
			unknowns: z.array(javaScriptRouteGapSchema),
			coverage: z.strictObject({
				scope: z.literal("provided-code-sources"),
				source_parsing: coverageStatusSchema,
				candidate_enumeration: knownCoverageStatusSchema,
				application_routes: z.literal("unknown")
			}),
			statistics: z.strictObject({
				sources_seen: z.int().nonnegative(),
				sources_retained: z.int().nonnegative(),
				route_patterns: z.int().nonnegative(),
				occurrences: z.int().nonnegative(),
				unanchored_literals_excluded: z.int().nonnegative()
			}),
			capacity: capacitySchema.nullable(),
			limitations: z.array(z.string())
		});
		javaScriptRouteInventorySchema = inventoryShape.superRefine((value, context) => {
			const sources = new Set(), routes = new Map(), occurrences = new Map();
			for (const source of value.sources) {
				if (sources.has(source.id) || source.id !== lookupId("jss", [
					source.key,
					source.path,
					source.url,
					source.sha256,
					source.container_sha256,
					...source.next_app_context === undefined ? [] : [source.next_app_context]
				])) context.addIssue({
					code: "custom",
					path: ["sources"],
					message: "Route source identity must be unique and bind source/content/applicability fields"
				});
				sources.add(source.id);
			}
			for (const route of value.routes) {
				if (routes.has(route.id) || route.id !== routeId(route.path)) context.addIssue({
					code: "custom",
					path: ["routes"],
					message: "Route identity must uniquely bind its exact pattern"
				});
				routes.set(route.id, route);
			}
			const byRoute = new Map();
			for (const occurrence of value.occurrences) {
				if (occurrences.has(occurrence.id) || !sources.has(occurrence.source_id) || !routes.has(occurrence.route_id) || occurrence.id !== lookupId("jso", [
					occurrence.source_id,
					routes.get(occurrence.route_id)?.path ?? null,
					occurrence.mechanism,
					occurrence.origin,
					occurrence.source_range,
					occurrence.segments
				])) context.addIssue({
					code: "custom",
					path: ["occurrences"],
					message: "Route occurrences require unique identities and retained source/route owners"
				});
				occurrences.set(occurrence.id, occurrence);
				let rows = byRoute.get(occurrence.route_id);
				if (rows === undefined) {
					rows = [];
					byRoute.set(occurrence.route_id, rows);
				}
				rows.push(occurrence);
			}
			for (const route of value.routes) {
				const rows = byRoute.get(route.id) ?? [], primary = occurrences.get(route.primary_occurrence_id);
				if (rows.length !== route.occurrence_count || new Set(rows.map((row) => row.source_id)).size !== route.source_count || primary?.route_id !== route.id || rows.some((row) => !route.mechanisms.includes(row.mechanism)) || new Set(rows.map((row) => row.mechanism)).size !== new Set(route.mechanisms).size || new Set(route.mechanisms).size !== route.mechanisms.length || route.confidence !== primary?.confidence || rows.some((row) => ranks[row.confidence] > ranks[route.confidence]) || route.classification !== classify(route.path, route.mechanisms).classification || route.classification_basis !== classify(route.path, route.mechanisms).classification_basis) context.addIssue({
					code: "custom",
					path: ["routes"],
					message: "Route aggregates and primary provenance must match their occurrences"
				});
			}
			if (value.statistics.sources_retained !== value.sources.length || value.statistics.route_patterns !== value.routes.length || value.statistics.occurrences !== value.occurrences.length) context.addIssue({
				code: "custom",
				path: ["statistics"],
				message: "Route statistics must count retained facts"
			});
			const gaps = new Set();
			for (const gap of value.unknowns) {
				if (gaps.has(gap.id) || gap.id !== routeGapId(gap) || gap.source_id !== null && !sources.has(gap.source_id)) context.addIssue({
					code: "custom",
					path: ["unknowns"],
					message: "An attributed route gap requires a unique content-bound identity and retained source"
				});
				if (gap.kind === "capture-omission" !== (gap.capture_omission !== undefined) || gap.kind === "capture-omission" && (gap.source_id !== null || gap.source_range !== null)) context.addIssue({
					code: "custom",
					path: ["unknowns"],
					message: "Capture omissions keep capture-level counts and have no invented source or range."
				});
				gaps.add(gap.id);
			}
			const { inventory_id, ...body } = value;
			if (inventory_id !== `jsri:${hash(["javascript-routes-v1", body])}`) context.addIssue({
				code: "custom",
				path: ["inventory_id"],
				message: "Inventory identity must bind all retained facts and coverage."
			});
		});
		hash = (value) => digestCanonicalValue(value, "JavaScript route fact");
		lookupId = (prefix, value) => `${prefix}:${hash(value).slice(0, 32)}`;
		routeGapId = (gap) => lookupId("jsg", [
			gap.source_id,
			gap.kind,
			gap.source_range,
			gap.reason,
			...gap.capture_omission === undefined ? [] : [gap.capture_omission]
		]);
		routeId = (path) => lookupId("jsr", path);
		order = (a, b) => a < b ? -1 : a > b ? 1 : 0;
		ranks = {
			low: 0,
			medium: 1,
			high: 2
		};
		classify = (path, mechanisms) => {
			if (/(?:^|\/)(?:auth|login|logout|signin|signup|billing|callback|callbacks|oauth|sso)(?:\/|$)/iu.test(path)) return {
				classification: "system",
				classification_basis: "path-name-heuristic"
			};
			if (mechanisms.includes("next-app-chunk")) return {
				classification: "page",
				classification_basis: "next-app-page"
			};
			if (mechanisms.includes("nested-route-object") || mechanisms.includes("typed-route-tree")) return {
				classification: "page",
				classification_basis: "router-configuration"
			};
			return {
				classification: "unknown",
				classification_basis: "unknown"
			};
		};
		INVENTORY_LIMITATIONS = [
			"Routes are static candidates from the provided code sources. Reachability, permissions, server-only routes and the complete application route set are unverified.",
			"Pattern IDs are exact path identities within this inventory. Occurrence and source IDs retain source/content identity and precise syntax ranges; metadata-only discoveries have no AST range.",
			"System classification is a path-name heuristic. Asset URL prefixes can differ from routing bases; inferred prefixes retain the original unprefixed path.",
			"Unbound path strings require a top-level segment supported by structural routes or navigation candidates. Unknown or missing source facts do not establish route absence."
		];
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSyntheticUrlRoot.js
var createSyntheticUrlRoot, parentPrefixLength;
function init_javascriptSyntheticUrlRoot() {
	return (init_javascriptSyntheticUrlRoot = __esmMin((() => {
		createSyntheticUrlRoot = (reference) => {
			const depth = reference.split(/[\\/]/u).length + 1;
			const root = `/${"source/".repeat(depth)}`;
			return {
				root,
				relativePath(resolvedPath, resolveAlternative) {
					const alternativeRoot = `/${"anchor/".repeat(depth)}`;
					const alternativePath = resolveAlternative(alternativeRoot);
					if (alternativePath === null) return null;
					const primary = posix.relative(root, resolvedPath);
					const alternative = posix.relative(alternativeRoot, alternativePath);
					return parentPrefixLength(alternative) > parentPrefixLength(primary) ? alternative : primary;
				}
			};
		};
		parentPrefixLength = (path) => /^(?:\.\.\/)*(?:\.\.$)?/u.exec(path)?.[0].length ?? 0;
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSourceMapPaths.js
var javascriptSourceMapReferenceSchema, resolveJavaScriptSourceMapReference, resolveJavaScriptSourceMapUrl, sourceMapReference, resolveJavaScriptSourceMapPath, invalidDecodedPath, nulPath, unusableHost, carriesUsableHost, windowsFileUrl, decodedUrlPath;
function init_javascriptSourceMapPaths() {
	return (init_javascriptSourceMapPaths = __esmMin((() => {
		init_javascriptSyntheticUrlRoot();
		javascriptSourceMapReferenceSchema = z.strictObject({
			source_name: z.string(),
			source_root: z.string().nullable(),
			map_path: z.string().min(1),
			resolution: z.discriminatedUnion("kind", [z.strictObject({
				kind: z.enum(["artifact-relative", "suffix"]),
				path: z.string().min(1)
			}), z.strictObject({
				kind: z.literal("unresolved"),
				reason: z.string().min(1)
			})])
		});
		resolveJavaScriptSourceMapReference = (sourceName, sourceRoot, mapPath) => {
			if (sourceName === null) return null;
			return {
				source_name: sourceName,
				source_root: sourceRoot,
				map_path: mapPath,
				resolution: resolveJavaScriptSourceMapPath(sourceMapReference(sourceName, sourceRoot), mapPath)
			};
		};
		resolveJavaScriptSourceMapUrl = (source, sourceRoot, mapUrl) => {
			if (source === null) return null;
			return URL.parse(sourceMapReference(source, sourceRoot), mapUrl)?.href ?? null;
		};
		sourceMapReference = (source, sourceRoot) => {
			if (sourceRoot == null || sourceRoot === "") return source;
			return `${sourceRoot}${sourceRoot.endsWith("/") ? "" : "/"}${source}`;
		};
		resolveJavaScriptSourceMapPath = (source, mapPath) => {
			const portable = source.replaceAll("\\", "/");
			const windowsPath = /^[a-z]:\//iu.test(portable) || source.startsWith("\\\\");
			const declaredText = windowsPath ? source : source.split(/[?#]/u, 1)[0] ?? "";
			if (declaredText.includes("\0")) return nulPath();
			const anchor = createSyntheticUrlRoot(source);
			const mapDirectory = posix.dirname(mapPath);
			const resolve = (root) => URL.parse(source, pathToFileURL(`${posix.join(root, mapDirectory)}/`, { windows: false }));
			const absolute = windowsPath ? windowsFileUrl(source) : URL.parse(source);
			const resolved = windowsPath ? absolute : resolve(anchor.root);
			if (resolved === null) return {
				kind: "unresolved",
				reason: "Source reference is not a valid URL or filesystem path."
			};
			if (!resolved.pathname.startsWith("/")) return {
				kind: "unresolved",
				reason: "Source reference uses a non-hierarchical URL without a file pathname."
			};
			if (resolved.pathname.endsWith("/")) return {
				kind: "unresolved",
				reason: "Source reference names a directory rather than a file."
			};
			const declaredPath = windowsPath ? absolute?.pathname ?? "" : URL.parse(source, "file:///")?.pathname ?? "";
			if (/%(?:2f|5c)/iu.test(declaredPath)) return {
				kind: "unresolved",
				reason: "Source reference contains an encoded path separator."
			};
			const relative = absolute === null ? !portable.startsWith("/") : absolute.href !== resolved.href;
			const path = decodedUrlPath(resolved);
			if (path === null) return invalidDecodedPath();
			if (path.includes("\0")) return nulPath();
			const value = relative ? anchor.relativePath(path, (root) => {
				const alternate = resolve(root);
				return alternate === null ? null : decodedUrlPath(alternate);
			}) : path.replace(/^\/+/, "");
			if (value === null) return invalidDecodedPath();
			if (value === "" || value === ".." || value.startsWith("../")) return {
				kind: "unresolved",
				reason: "Source reference resolves outside the inventoried artifact."
			};
			return {
				path: value,
				kind: relative ? "artifact-relative" : "suffix"
			};
		};
		invalidDecodedPath = () => ({
			kind: "unresolved",
			reason: "Source reference has malformed URL encoding or an invalid file URL."
		});
		nulPath = () => ({
			kind: "unresolved",
			reason: "Source reference contains a NUL byte and cannot name a filesystem path."
		});
		unusableHost = /[\0\t\n\r #/:<>?@[\\\]^|%]/u;
		carriesUsableHost = (host) => !unusableHost.test(host) && domainToASCII(host) !== "";
		windowsFileUrl = (path) => {
			if (path.startsWith("\\\\") && !carriesUsableHost(path.slice(2).split("\\")[0] ?? "")) return null;
			try {
				return pathToFileURL(path, { windows: true });
			} catch (cause) {
				if (cause instanceof TypeError) return null;
				throw cause;
			}
		};
		decodedUrlPath = (url) => {
			try {
				if (url.protocol === "file:") {
					const windows = url.hostname !== "" && url.hostname !== "localhost";
					const path = fileURLToPath(url, { windows });
					return windows ? path.replaceAll("\\", "/") : path;
				}
				return `${url.host}${decodeURIComponent(url.pathname)}`;
			} catch (cause) {
				if (cause instanceof URIError || cause instanceof TypeError) return null;
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptApplicationGraphSchemas.js
var IPC_COVERAGE_LIMITED_PAIRING_BASIS, JAVASCRIPT_APPLICATION_NODE_KINDS, applicationNodeKindSchema, JAVASCRIPT_APPLICATION_RELATIONS, applicationRelationSchema, applicationPropertiesSchema, applicationNodeObservationBaseSchema, applicationNodeObservationInputSchema, applicationNodeObservationSchema, applicationNodeInputSchema, applicationNodeSchema, applicationEdgeInputSchema, applicationEdgeSchema, javascriptApplicationGraphInputSchema, javascriptApplicationGraphRecordSchema;
function init_javascriptApplicationGraphSchemas() {
	return (init_javascriptApplicationGraphSchemas = __esmMin((() => {
		init_javascriptSourceMapPaths();
		init_javascriptApplicationEvidenceSchemas();
		init_jsonValue();
		init_digests();
		init_textSchemas();
		IPC_COVERAGE_LIMITED_PAIRING_BASIS = "observed-literal-channel-incomplete-coverage";
		JAVASCRIPT_APPLICATION_NODE_KINDS = [
			"package",
			"installer",
			"artifact",
			"asar-entry",
			"electron-main",
			"electron-preload",
			"electron-renderer",
			"electron-utility",
			"javascript-asset",
			"javascript-chunk",
			"javascript-module",
			"javascript-expression",
			"source-map",
			"source-module",
			"browser-window",
			"frame",
			"target",
			"context-bridge-api",
			"ipc-channel",
			"ipc-handler",
			"url-scheme",
			"worker",
			"service-worker",
			"endpoint",
			"storage",
			"native-addon",
			"native-export",
			"managed-assembly",
			"managed-module",
			"managed-type",
			"managed-method",
			"managed-field",
			"managed-pinvoke-import",
			"managed-native-implementation",
			"runtime-script-instance",
			"unknown"
		];
		applicationNodeKindSchema = z.enum(JAVASCRIPT_APPLICATION_NODE_KINDS);
		JAVASCRIPT_APPLICATION_RELATIONS = [
			"contains",
			"loads",
			"imports",
			"maps_to",
			"exposes",
			"sends",
			"invokes",
			"handles",
			"calls",
			"accesses",
			"persists_to",
			"observed_as",
			"changed_from"
		];
		applicationRelationSchema = z.enum(JAVASCRIPT_APPLICATION_RELATIONS);
		applicationPropertiesSchema = z.record(z.string().min(1), jsonValueSchema);
		applicationNodeObservationBaseSchema = z.strictObject({
			label: z.string().min(1).nullable(),
			source_map_reference: javascriptSourceMapReferenceSchema.nullable(),
			properties: applicationPropertiesSchema,
			evidence: applicationGraphEvidenceSchema
		});
		applicationNodeObservationInputSchema = applicationNodeObservationBaseSchema.extend({ source_map_reference: javascriptSourceMapReferenceSchema.nullable().default(null) });
		applicationNodeObservationSchema = applicationNodeObservationBaseSchema.extend({
			observation_id: prefixedDigestSchema("jag_observation"),
			identifier_strategy: z.strictObject({
				strategy: z.literal("semantic-content-sha256"),
				stability: z.literal("observation-exact")
			})
		});
		applicationNodeInputSchema = z.strictObject({
			kind: applicationNodeKindSchema,
			identity: applicationNodeIdentitySchema,
			observations: z.array(applicationNodeObservationInputSchema).min(1)
		});
		applicationNodeSchema = z.strictObject({
			node_id: prefixedDigestSchema("jag_node"),
			kind: applicationNodeKindSchema,
			identity: applicationNodeIdentitySchema,
			observations: z.array(applicationNodeObservationSchema).min(1)
		});
		applicationEdgeInputSchema = z.strictObject({
			source_node_id: prefixedDigestSchema("jag_node"),
			target_node_id: prefixedDigestSchema("jag_node"),
			relation: applicationRelationSchema,
			properties: applicationPropertiesSchema,
			evidence: applicationGraphEvidenceSchema
		});
		applicationEdgeSchema = applicationEdgeInputSchema.extend({
			edge_id: prefixedDigestSchema("jag_edge"),
			identifier_strategy: z.strictObject({
				strategy: z.literal("semantic-content-sha256"),
				stability: z.literal("relationship-exact")
			})
		});
		javascriptApplicationGraphInputSchema = z.strictObject({
			schema: z.literal("JavaScriptApplicationGraph"),
			root_node_ids: z.array(prefixedDigestSchema("jag_node")).min(1),
			nodes: z.array(applicationNodeSchema).min(1),
			edges: z.array(applicationEdgeSchema),
			coverage: applicationCoverageSchema,
			limitations: z.array(nonEmptyTextSchema)
		});
		javascriptApplicationGraphRecordSchema = javascriptApplicationGraphInputSchema.extend({ graph_id: prefixedDigestSchema("jag") });
	})))();
}

//#endregion
//#region dist/domain/zodCollectionSteps.js
/** Elements validated between yields, in the issues and paths a whole-array parse reports. */
function* parseElementSteps(element, values, path, issues, isPrevalidated) {
	const parsed = [];
	for (const [index, value] of values.entries()) {
		if (index % 64 === 0) yield;
		if (isPrevalidated?.(value) === true) {
			parsed.push(value);
			continue;
		}
		const result = element.safeParse(value);
		if (result.success) parsed.push(result.data);
		else issues.push(...result.error.issues.map((issue) => ({
			...issue,
			path: [
				...path,
				index,
				...issue.path
			]
		})));
	}
	return parsed;
}
var arrayContainerSchema;
function init_zodCollectionSteps() {
	return (init_zodCollectionSteps = __esmMin((() => {
		arrayContainerSchema = (array) => array.clone({
			...array.def,
			element: z.unknown()
		});
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptApplicationGraph.js
function* checkGraphContentSteps(graph, context) {
	sortedUniqueIssue(graph.root_node_ids, ["root_node_ids"], "Root nodes", context);
	sortedUniqueIssue(graph.nodes.map(({ node_id: id }) => id), ["nodes"], "Nodes", context);
	sortedUniqueIssue(graph.edges.map(({ edge_id: id }) => id), ["edges"], "Edges", context);
	sortedUniqueIssue(graph.limitations, ["limitations"], "Graph limitations", context);
	sortedUniqueIssue(graph.coverage.limits.map(limitKey), ["coverage", "limits"], "Graph limits", context);
	if (graph.coverage.status !== "complete" && graph.limitations.length === 0) context.addIssue({
		code: "custom",
		message: "Non-complete graph coverage requires an explicit limitation",
		path: ["limitations"]
	});
	const nodesById = new Map(graph.nodes.map((node) => [node.node_id, node]));
	for (const root of graph.root_node_ids) if (!nodesById.has(root)) context.addIssue({
		code: "custom",
		message: "Root identifier must name a graph node",
		path: ["root_node_ids"]
	});
	for (const [index, node] of graph.nodes.entries()) {
		if (index % 64 === 0) yield;
		checkNode(node, index, context);
	}
	for (const [index, edge] of graph.edges.entries()) {
		if (index % 64 === 0) yield;
		const { edge_id: identifier, ...semantic } = edge;
		if (identifier !== edgeId(semantic)) context.addIssue({
			code: "custom",
			message: "Edge identifier does not match its semantic content",
			path: [
				"edges",
				index,
				"edge_id"
			]
		});
		if (!nodesById.has(edge.source_node_id) || !nodesById.has(edge.target_node_id)) context.addIssue({
			code: "custom",
			message: "Edge endpoints must name graph nodes",
			path: ["edges", index]
		});
		if (edge.source_node_id === edge.target_node_id) context.addIssue({
			code: "custom",
			message: "Application graph edges cannot be self-referential",
			path: ["edges", index]
		});
		if (edge.relation === "changed_from" && nodesById.get(edge.source_node_id)?.kind !== nodesById.get(edge.target_node_id)?.kind) context.addIssue({
			code: "custom",
			message: "changed_from endpoints must have the same node kind",
			path: [
				"edges",
				index,
				"relation"
			]
		});
		checkEvidenceNormalization(edge.evidence, [
			"edges",
			index,
			"evidence"
		], context);
	}
}
function* parseAndSealApplicationGraphSteps(container) {
	const issues = [];
	const parsed = {
		...container,
		nodes: yield* parseElementSteps(applicationGraphShape.nodes.element, container.nodes, ["nodes"], issues),
		edges: yield* parseElementSteps(applicationGraphShape.edges.element, container.edges, ["edges"], issues)
	};
	if (issues.length > 0) throw new z.ZodError(issues);
	const content = normalizeGraphInput(parsed);
	let invalid = false;
	yield* checkGraphContentSteps(content, { addIssue: () => {
		invalid = true;
	} });
	if (invalid) {
		javascriptApplicationGraphContentSchema.parse(content);
		throw new TypeError("Application graph checks disagree with its schema");
	}
	return yield* sealValidatedApplicationGraphSteps({
		...content,
		graph_id: `jag_${yield* canonicalJsonDigestSteps(content)}`
	});
}
function* sealValidatedApplicationGraphSteps(graph) {
	yield* freezeOwnedJsonSnapshotSteps(graph);
	validatedImmutableApplicationGraphs.add(graph);
	return graph;
}
var OBSERVATION_IDENTIFIER_STRATEGY, EDGE_IDENTIFIER_STRATEGY, limitKey, normalizeLimits, normalizeEvidence, normalizeIdentity, nodeSemantic, nodeId, observationSemantic, observationId, edgeId, sortedUniqueIssue, checkEvidenceNormalization, sourceMapObservationMatchesIdentity, observationMatchesIdentity, checkNode, checkGraphContent, checkGraphInvariants, javascriptApplicationGraphSchema, javascriptApplicationGraphContentSchema, createJavaScriptApplicationNode, mergeJavaScriptApplicationNodes, createJavaScriptApplicationEdge, createJavaScriptApplicationGraph, normalizeGraphInput, validatedImmutableApplicationGraphs, createImmutableJavaScriptApplicationGraphSteps, applicationGraphShape, applicationGraphContainerSchema, sealTransferredJavaScriptApplicationGraphSteps, isValidatedImmutableJavaScriptApplicationGraph, parseJavaScriptApplicationGraph, computeJavaScriptApplicationGraphSha256, serializeJavaScriptApplicationGraph;
function init_javascriptApplicationGraph() {
	return (init_javascriptApplicationGraph = __esmMin((() => {
		init_zodCollectionSteps();
		init_canonicalJsonDigestSteps();
		init_comparisonSemantics();
		init_canonicalDigest();
		init_canonicalOrdering();
		init_unicodeCodePointOrder();
		init_immutableJson();
		init_javascriptApplicationGraphSchemas();
		OBSERVATION_IDENTIFIER_STRATEGY = {
			strategy: "semantic-content-sha256",
			stability: "observation-exact"
		};
		EDGE_IDENTIFIER_STRATEGY = {
			strategy: "semantic-content-sha256",
			stability: "relationship-exact"
		};
		limitKey = (limit) => canonicalJson(limit, "JavaScript Application Graph");
		normalizeLimits = (limits) => [...new Map(limits.map((limit) => [limitKey(limit), limit])).values()].sort((left, right) => compareUnicodeCodePoints(limitKey(left), limitKey(right)));
		normalizeEvidence = (evidence) => ({
			...evidence,
			coverage: {
				...evidence.coverage,
				limits: normalizeLimits(evidence.coverage.limits)
			},
			limitations: uniqueSorted(evidence.limitations),
			evidence_ids: uniqueSorted(evidence.evidence_ids)
		});
		normalizeIdentity = (identity) => identity.strategy === "structural-fingerprint" ? {
			...identity,
			basis: uniqueSorted(identity.basis)
		} : identity;
		nodeSemantic = (node) => ({
			kind: node.kind,
			identity: node.identity
		});
		nodeId = (node) => `jag_node_${digestCanonicalValue(nodeSemantic(node), "JavaScript Application Graph")}`;
		observationSemantic = (nodeIdentifier, observation) => ({
			node_id: nodeIdentifier,
			...observation
		});
		observationId = (nodeIdentifier, observation) => `jag_observation_${digestCanonicalValue(observationSemantic(nodeIdentifier, observation))}`;
		edgeId = (edge) => `jag_edge_${digestCanonicalValue(edge, "JavaScript Application Graph")}`;
		sortedUniqueIssue = (values, path, label, context) => {
			for (let index = 1; index < values.length; index += 1) {
				if (compareUnicodeCodePoints(values[index - 1] ?? "", values[index] ?? "") < 0) continue;
				context.addIssue({
					code: "custom",
					message: `${label} must be sorted and unique by Unicode code point`,
					path: [...path, index]
				});
				return;
			}
		};
		checkEvidenceNormalization = (evidence, path, context) => {
			sortedUniqueIssue(evidence.limitations, [...path, "limitations"], "Evidence limitations", context);
			sortedUniqueIssue(evidence.evidence_ids, [...path, "evidence_ids"], "Evidence identifiers", context);
			sortedUniqueIssue(evidence.coverage.limits.map(limitKey), [
				...path,
				"coverage",
				"limits"
			], "Evidence limits", context);
			const runtimeLocation = evidence.location.available && evidence.location.value.kind === "runtime";
			const staticAuthority = [
				"artifact-bytes",
				"ast-static-analysis",
				"static-relationship-inference",
				"native-analysis-provider",
				"managed-static-analysis"
			].includes(evidence.authority);
			if (runtimeLocation && staticAuthority) context.addIssue({
				code: "custom",
				message: "Static and native authorities cannot claim a runtime location",
				path: [...path, "location"]
			});
		};
		sourceMapObservationMatchesIdentity = (identity, observation) => {
			const { evidence, source_map_reference: reference } = observation;
			const sourceDigests = [observation.properties.content_sha256, observation.properties.source_sha256];
			const hasKnownSourceDigest = identity.source_sha256 !== null;
			const sourceDigestMatches = sourceDigests.every((digest) => digest === undefined || digest === null || digest === identity.source_sha256) && (!hasKnownSourceDigest || sourceDigests.includes(identity.source_sha256));
			const contentAvailabilityMatches = (observation.properties.content_available !== true || hasKnownSourceDigest) && (observation.properties.content_available !== false || !hasKnownSourceDigest);
			return sourceDigestMatches && contentAvailabilityMatches && reference !== null && evidence.state === "observed" && evidence.artifact.available && evidence.artifact.sha256 === identity.source_map_sha256 && reference.source_name === identity.original_source && reference.source_root === identity.source_root && evidence.location.available && evidence.location.value.kind === "artifact-path" && reference.map_path === evidence.location.value.path;
		};
		observationMatchesIdentity = (node, observation) => {
			const { identity } = node;
			const { evidence } = observation;
			if (identity.strategy === "content-digest") return evidence.state === "observed" && evidence.artifact.available && evidence.artifact.sha256 === identity.sha256;
			if (identity.strategy === "source-map-original") return sourceMapObservationMatchesIdentity(identity, observation);
			if (identity.strategy === "canonical-path") return evidence.artifact.available && evidence.artifact.sha256 === identity.artifact_sha256 && evidence.location.available && evidence.location.value.kind === "artifact-path" && evidence.location.value.path === identity.path;
			if (identity.strategy === "artifact-local-key") return evidence.artifact.available && evidence.artifact.sha256 === identity.artifact_sha256;
			if (identity.strategy === "runtime-instance") {
				if (!["passive-cdp-runtime", "controlled-replay"].includes(evidence.authority) || !evidence.location.available || evidence.location.value.kind !== "runtime") return false;
				const location = evidence.location.value;
				return evidence.evidence_ids.includes(identity.capture_evidence_id) && location.capture_sha256 === identity.capture_sha256 && [
					location.target_key,
					location.frame_key,
					location.script_key
				].includes(identity.runtime_key);
			}
			if (identity.strategy === "structural-fingerprint") return evidence.state === "inferred";
			return evidence.state === "observed";
		};
		checkNode = (node, index, context) => {
			if (node.node_id !== nodeId(node)) context.addIssue({
				code: "custom",
				message: "Node identifier does not match its kind and identity",
				path: [
					"nodes",
					index,
					"node_id"
				]
			});
			if (node.identity.strategy === "structural-fingerprint" && canonicalJson(node.identity.basis, "JavaScript Application Graph") !== canonicalJson(uniqueSorted(node.identity.basis), "JavaScript Application Graph")) context.addIssue({
				code: "custom",
				message: "Structural fingerprint basis must be sorted and unique",
				path: [
					"nodes",
					index,
					"identity",
					"basis"
				]
			});
			sortedUniqueIssue(node.observations.map(({ observation_id: id }) => id), [
				"nodes",
				index,
				"observations"
			], "Node observations", context);
			for (const [observationIndex, observation] of node.observations.entries()) {
				const { observation_id: identifier, ...semantic } = observation;
				if (identifier !== observationId(node.node_id, semantic)) context.addIssue({
					code: "custom",
					message: "Observation identifier does not match its semantic content",
					path: [
						"nodes",
						index,
						"observations",
						observationIndex,
						"observation_id"
					]
				});
				if (node.identity.strategy === "source-map-original" && !observationMatchesIdentity(node, observation)) context.addIssue({
					code: "custom",
					message: "Source-map observation must retain its exact declaration and map location",
					path: [
						"nodes",
						index,
						"observations",
						observationIndex,
						"source_map_reference"
					]
				});
				checkEvidenceNormalization(observation.evidence, [
					"nodes",
					index,
					"observations",
					observationIndex,
					"evidence"
				], context);
			}
			if (!node.observations.some((observation) => observationMatchesIdentity(node, observation))) context.addIssue({
				code: "custom",
				message: "Node identity is not supported by a compatible observation",
				path: [
					"nodes",
					index,
					"identity"
				]
			});
		};
		checkGraphContent = (graph, context) => {
			const steps = checkGraphContentSteps(graph, context);
			while (steps.next().done !== true);
		};
		checkGraphInvariants = (graph, context) => {
			checkGraphContent(graph, context);
			const { graph_id: identifier, ...semantic } = graph;
			if (identifier !== `jag_${digestCanonicalValue(semantic, "JavaScript Application Graph")}`) context.addIssue({
				code: "custom",
				message: "Graph identifier does not match its semantic content",
				path: ["graph_id"]
			});
		};
		javascriptApplicationGraphSchema = javascriptApplicationGraphRecordSchema.superRefine(checkGraphInvariants);
		javascriptApplicationGraphContentSchema = javascriptApplicationGraphInputSchema.superRefine(checkGraphContent);
		createJavaScriptApplicationNode = (input, qualifyEvidence) => {
			const parsed = applicationNodeInputSchema.parse(input);
			for (const observation of parsed.observations) freezeJsonSnapshot(observation.properties);
			const identity = normalizeIdentity(parsed.identity);
			const identifier = nodeId({
				kind: parsed.kind,
				identity
			});
			const observations = parsed.observations.map((observation) => {
				const semantic = {
					...observation,
					evidence: normalizeEvidence(qualifyEvidence?.(observation.evidence) ?? observation.evidence),
					identifier_strategy: OBSERVATION_IDENTIFIER_STRATEGY
				};
				return applicationNodeObservationSchema.parse({
					...semantic,
					observation_id: observationId(identifier, semantic)
				});
			}).sort((left, right) => compareUnicodeCodePoints(left.observation_id, right.observation_id));
			return applicationNodeSchema.parse({
				node_id: identifier,
				kind: parsed.kind,
				identity,
				observations
			});
		};
		mergeJavaScriptApplicationNodes = (nodes) => {
			const groups = new Map();
			for (const node of nodes) {
				const group = groups.get(node.node_id);
				if (group === undefined) {
					groups.set(node.node_id, {
						node,
						observations: new Map(node.observations.map((observation) => [observation.observation_id, observation]))
					});
					continue;
				}
				if (node.kind !== group.node.kind || canonicalJson(node.identity) !== canonicalJson(group.node.identity)) throw new TypeError("Colliding JAG node identifiers disagree");
				for (const observation of node.observations) group.observations.set(observation.observation_id, observation);
			}
			return [...groups.values()].map(({ node, observations }) => createJavaScriptApplicationNode({
				kind: node.kind,
				identity: node.identity,
				observations: [...observations.values()].map(({ observation_id: _id, identifier_strategy: _strategy, ...value }) => value)
			}));
		};
		createJavaScriptApplicationEdge = (input, qualifyEvidence) => {
			const parsed = applicationEdgeInputSchema.parse(input);
			freezeJsonSnapshot(parsed.properties);
			const semantic = {
				...parsed,
				evidence: normalizeEvidence(qualifyEvidence?.(parsed.evidence) ?? parsed.evidence),
				identifier_strategy: EDGE_IDENTIFIER_STRATEGY
			};
			return applicationEdgeSchema.parse({
				...semantic,
				edge_id: edgeId(semantic)
			});
		};
		createJavaScriptApplicationGraph = (input) => {
			const semantic = normalizeGraphInput(javascriptApplicationGraphInputSchema.parse(input));
			const content = javascriptApplicationGraphContentSchema.parse(semantic);
			return {
				...content,
				graph_id: `jag_${digestCanonicalValue(content, "JavaScript Application Graph")}`
			};
		};
		normalizeGraphInput = (parsed) => ({
			...parsed,
			root_node_ids: uniqueSorted(parsed.root_node_ids),
			nodes: [...parsed.nodes].sort((left, right) => compareUnicodeCodePoints(left.node_id, right.node_id)),
			edges: [...parsed.edges].sort((left, right) => compareUnicodeCodePoints(left.edge_id, right.edge_id)),
			coverage: {
				...parsed.coverage,
				limits: normalizeLimits(parsed.coverage.limits)
			},
			limitations: uniqueSorted(parsed.limitations)
		});
		validatedImmutableApplicationGraphs = new WeakSet();
		createImmutableJavaScriptApplicationGraphSteps = (input) => sealValidatedApplicationGraphSteps(createJavaScriptApplicationGraph(input));
		applicationGraphShape = javascriptApplicationGraphInputSchema.shape;
		applicationGraphContainerSchema = javascriptApplicationGraphInputSchema.extend({
			nodes: arrayContainerSchema(applicationGraphShape.nodes),
			edges: arrayContainerSchema(applicationGraphShape.edges)
		});
		sealTransferredJavaScriptApplicationGraphSteps = (input) => parseAndSealApplicationGraphSteps(applicationGraphContainerSchema.parse(input));
		isValidatedImmutableJavaScriptApplicationGraph = (value) => typeof value === "object" && value !== null && validatedImmutableApplicationGraphs.has(value);
		parseJavaScriptApplicationGraph = (input) => javascriptApplicationGraphSchema.parse(input);
		computeJavaScriptApplicationGraphSha256 = (input) => digestCanonicalValue(parseJavaScriptApplicationGraph(input), "JavaScript Application Graph");
		serializeJavaScriptApplicationGraph = (input) => canonicalJson(parseJavaScriptApplicationGraph(input), "JavaScript Application Graph");
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSourceSelection.js
var javaScriptSourcePathsSchema, javaScriptSourceSelectionSchema;
function init_javascriptSourceSelection() {
	return (init_javascriptSourceSelection = __esmMin((() => {
		javaScriptSourcePathsSchema = z.array(z.string().min(1)).min(1).describe("Exact relevant file paths from the artifact inventory, relative to the application root, analyzed in first-request order before unselected scopes; no globs or implicit dependencies. Omit to analyze all sources.");
		javaScriptSourceSelectionSchema = z.strictObject({
			requested_paths: javaScriptSourcePathsSchema,
			unselected_files: z.int().min(0)
		});
	})))();
}

//#endregion
export { IPC_COVERAGE_LIMITED_PAIRING_BASIS, JAVASCRIPT_APPLICATION_NODE_KINDS, applicationEdgeSchema, applicationNodeObservationSchema, applicationNodeSchema, arrayContainerSchema, buildJavaScriptRouteInventorySteps, createImmutableJavaScriptApplicationGraphSteps, createJavaScriptApplicationEdge, createJavaScriptApplicationGraph, createJavaScriptApplicationNode, createSyntheticUrlRoot, init_javascriptApplicationGraph, init_javascriptApplicationGraphSchemas, init_javascriptRouteInventory, init_javascriptSourceMapPaths, init_javascriptSourceSelection, init_javascriptSyntheticUrlRoot, init_zodCollectionSteps, isValidatedImmutableJavaScriptApplicationGraph, javaScriptInventoryRouteSchema, javaScriptRouteCaptureOmissionSchema, javaScriptRouteGapSchema, javaScriptRouteInventorySchema, javaScriptRouteInventorySourceSchema, javaScriptRouteOccurrenceSchema, javaScriptSourcePathsSchema, javaScriptSourceSelectionSchema, javascriptApplicationGraphSchema, mergeJavaScriptApplicationNodes, parseElementSteps, resolveJavaScriptSourceMapReference, resolveJavaScriptSourceMapUrl, sealTransferredJavaScriptApplicationGraphSteps };