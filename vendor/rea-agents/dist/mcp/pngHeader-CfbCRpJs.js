import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { At as analysisParameterLimitSchema, Lt as init_analysisSettingDefinitions, _n as init_javascriptSemanticPrecision, vn as javaScriptSemanticPrecisionSchema } from "./analysisErrorProjection-B0_t_nHz.js";
import { n as init_result, r as ok, t as err } from "./result-Dbqc_peo.js";
import { A as init_binaryContainer, R as digestSchema, S as BinaryReader, z as init_digests } from "./canonicalDigest-DUQN3Yyz.js";
import { c as javaScriptRefusedPhaseSchema, i as init_javascriptSemanticWorkAllowance } from "./javascriptSemanticWorkAllowance-DlKvoXR4.js";
import { posix } from "node:path";
import { domainToASCII, fileURLToPath, pathToFileURL } from "node:url";
import { z } from "zod";
import { crc32 } from "node:zlib";

//#region dist/domain/javascript/javascriptArtifactFiles.js
var javaScriptFileOccurrenceSchema, isJavaScriptSourcePath, javaScriptArtifactTextExclusion, javaScriptSemanticSourceExclusion;
function init_javascriptArtifactFiles() {
	return (init_javascriptArtifactFiles = __esmMin((() => {
		init_digests();
		javaScriptFileOccurrenceSchema = z.strictObject({
			container_sha256: digestSchema,
			path: z.string().min(1),
			sha256: digestSchema
		});
		isJavaScriptSourcePath = (path) => /\.(?:cjs|cts|mjs|mts|js|jsx|ts|tsx)$/iu.test(path);
		javaScriptArtifactTextExclusion = (file) => {
			if (file.text.included || file.text.reason === "not-applicable") return null;
			if (file.text.reason === "invalid-utf8" && file.kind !== "javascript") return null;
			return file.text.reason === "outside-analysis-scope" ? "Source was not analyzed because it is outside the caller-selected source_paths." : "Source bytes are not valid UTF-8; JavaScript semantics were not analyzed.";
		};
		javaScriptSemanticSourceExclusion = (file, parseStatus) => {
			if (file.kind !== "javascript") return null;
			return javaScriptArtifactTextExclusion(file) ?? (parseStatus === "failed" ? "JavaScript syntax could not be parsed; JavaScript semantics were not analyzed." : null);
		};
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
//#region dist/domain/javascript/javascriptSemanticValueTypes.js
var javaScriptSemanticResourceLimitSchema;
function init_javascriptSemanticValueTypes() {
	return (init_javascriptSemanticValueTypes = __esmMin((() => {
		javaScriptSemanticResourceLimitSchema = z.enum([
			"primitive-candidates",
			"primitive-bytes",
			"expression-depth",
			"getter-expansion",
			"alias-selections"
		]);
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptStaticCoverage.js
var javaScriptStaticCoverageSchema, javaScriptStaticParseStatus, unexaminedJavaScriptStaticCoverage;
function init_javascriptStaticCoverage() {
	return (init_javascriptStaticCoverage = __esmMin((() => {
		init_javascriptSemanticPrecision();
		init_analysisSettingDefinitions();
		init_javascriptSemanticValueTypes();
		init_javascriptSemanticWorkAllowance();
		javaScriptStaticCoverageSchema = z.strictObject({
			syntax: z.discriminatedUnion("status", [
				z.strictObject({
					status: z.literal("complete"),
					error_count: z.literal(0)
				}),
				z.strictObject({
					status: z.literal("recovered"),
					error_count: z.int().positive()
				}),
				z.strictObject({
					status: z.literal("failed"),
					error_count: z.null()
				}),
				z.strictObject({
					status: z.literal("not-examined"),
					error_count: z.null()
				})
			]),
			semantics: z.strictObject({
				unknown_findings: z.int().nonnegative().nullable(),
				uncertainty: z.array(z.enum([
					"dynamic-findings",
					"returned-reference-widening",
					"type-only-module-side-effect",
					"conditional-loader",
					"commonjs-wrapper-redeclaration"
				]))
			}),
			examination: z.strictObject({
				status: z.enum([
					"complete",
					"limited",
					"not-examined"
				]),
				semantic_resource_limits: z.array(javaScriptSemanticResourceLimitSchema),
				semantic_precision: javaScriptSemanticPrecisionSchema.optional(),
				electron_call_paths_limited: z.boolean(),
				/** The `semantic_precision` budgets that limited this source. */
				controls: z.array(analysisParameterLimitSchema).min(1).exactOptional(),
				/** The analysis phase whose work allowance refused this source. */
				refused_phase: javaScriptRefusedPhaseSchema.exactOptional()
			}),
			applicability: z.strictObject({ electron: z.enum(["observed", "unknown"]) }),
			unexamined_reason: z.string().min(1).exactOptional()
		});
		javaScriptStaticParseStatus = (coverage) => coverage.syntax.status === "failed" || coverage.syntax.status === "not-examined" ? "failed" : coverage.syntax.status === "recovered" || coverage.examination.status === "not-examined" || coverage.semantics.unknown_findings !== 0 || coverage.semantics.uncertainty.includes("conditional-loader") || coverage.examination.semantic_resource_limits.includes("alias-selections") ? "partial" : "complete";
		unexaminedJavaScriptStaticCoverage = (reason) => ({
			syntax: {
				status: "not-examined",
				error_count: null
			},
			semantics: {
				unknown_findings: null,
				uncertainty: []
			},
			examination: {
				status: "not-examined",
				semantic_resource_limits: [],
				electron_call_paths_limited: false
			},
			applicability: { electron: "unknown" },
			unexamined_reason: reason
		});
	})))();
}

//#endregion
//#region dist/domain/browserScenarioTransactions.js
var indexBrowserScenarioTransactions, append;
function init_browserScenarioTransactions() {
	return (init_browserScenarioTransactions = __esmMin((() => {
		indexBrowserScenarioTransactions = (events) => {
			const requestCounts = new Map();
			const responses = new Map();
			const contents = new Map();
			for (const event of events) {
				if (event.kind === "request") requestCounts.set(event.transaction_id, (requestCounts.get(event.transaction_id) ?? 0) + 1);
				else if (event.kind === "response") append(responses, event.transaction_id, event);
				else if (event.kind === "network-content") append(contents, event.source_event_sequence, event);
			}
			return {
				requestCounts,
				responses,
				contents
			};
		};
		append = (map, key, value) => {
			const existing = map.get(key);
			if (existing === undefined) map.set(key, [value]);
			else existing.push(value);
		};
	})))();
}

//#endregion
//#region dist/domain/pngHeader.js
var PNG_SIGNATURE, IHDR_DATA_BYTES, PNG_CHUNK_OVERHEAD, hasPngSignature, createPngChunkReader, readPngIhdrFacts, readPngHeaderDimensions;
function init_pngHeader() {
	return (init_pngHeader = __esmMin((() => {
		init_binaryContainer();
		init_result();
		PNG_SIGNATURE = Buffer.from([
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		]);
		IHDR_DATA_BYTES = 13;
		PNG_CHUNK_OVERHEAD = 12;
		hasPngSignature = (bytes) => bytes.subarray(0, 8).equals(PNG_SIGNATURE);
		createPngChunkReader = (bytes) => {
			const reader = new BinaryReader(bytes, false, "png");
			return (offset, maxDataBytes = 2147483647) => {
				const remaining = bytes.length - offset;
				if (remaining < PNG_CHUNK_OVERHEAD) return err("Truncated PNG chunk");
				const length = reader.u32(offset);
				if (length > maxDataBytes) return err("Invalid PNG chunk length");
				if (length > remaining - PNG_CHUNK_OVERHEAD) return err("Truncated PNG data");
				const typeAndData = reader.range(offset + 4, 4 + length, "PNG chunk");
				const checksumOffset = offset + 8 + length;
				if (crc32(typeAndData) !== reader.u32(checksumOffset)) return err("Invalid PNG chunk checksum");
				const type = typeAndData.toString("latin1", 0, 4);
				if (!/^[A-Za-z]{4}$/u.test(type) || type[2] !== type[2]?.toUpperCase()) return err("Invalid PNG chunk type");
				return ok({
					type,
					data: typeAndData.subarray(4),
					nextOffset: checksumOffset + 4
				});
			};
		};
		readPngIhdrFacts = (data) => {
			if (data.length !== IHDR_DATA_BYTES) return err("Invalid PNG header");
			const header = new BinaryReader(data, false, "png");
			const width = header.u32(0);
			const height = header.u32(4);
			if (width === 0 || height === 0 || width > 2147483647 || height > 2147483647) return err("Invalid PNG header");
			const bitDepth = header.u8(8);
			const colorType = header.u8(9);
			const interlaceMethod = header.u8(12);
			const validDepth = colorType === 0 && [
				1,
				2,
				4,
				8,
				16
			].includes(bitDepth) || colorType === 2 && [8, 16].includes(bitDepth) || colorType === 3 && [
				1,
				2,
				4,
				8
			].includes(bitDepth) || colorType === 4 && [8, 16].includes(bitDepth) || colorType === 6 && [8, 16].includes(bitDepth);
			if (!validDepth || header.u8(10) !== 0 || header.u8(11) !== 0 || interlaceMethod !== 0 && interlaceMethod !== 1) return err("Invalid PNG header");
			return ok({
				width,
				height,
				bitDepth,
				colorType,
				interlaceMethod
			});
		};
		readPngHeaderDimensions = (bytes) => {
			if (!hasPngSignature(bytes)) return undefined;
			const chunk = createPngChunkReader(bytes)(8, IHDR_DATA_BYTES);
			if (!chunk.ok || chunk.value.type !== "IHDR") return undefined;
			const facts = readPngIhdrFacts(chunk.value.data);
			return facts.ok ? {
				width: facts.value.width,
				height: facts.value.height
			} : undefined;
		};
	})))();
}

//#endregion
export { javaScriptSemanticSourceExclusion as C, javaScriptFileOccurrenceSchema as S, createSyntheticUrlRoot as _, readPngIhdrFacts as a, isJavaScriptSourcePath as b, init_javascriptStaticCoverage as c, init_javascriptSemanticValueTypes as d, javaScriptSemanticResourceLimitSchema as f, resolveJavaScriptSourceMapUrl as g, resolveJavaScriptSourceMapReference as h, readPngHeaderDimensions as i, javaScriptStaticCoverageSchema as l, javascriptSourceMapReferenceSchema as m, hasPngSignature as n, indexBrowserScenarioTransactions as o, init_javascriptSourceMapPaths as p, init_pngHeader as r, init_browserScenarioTransactions as s, createPngChunkReader as t, unexaminedJavaScriptStaticCoverage as u, init_javascriptSyntheticUrlRoot as v, javaScriptArtifactTextExclusion as x, init_javascriptArtifactFiles as y };