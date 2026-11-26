import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, ConfigurationError, cancelledBy, carriedReason, errorMessage, init_analysisErrorCore, init_configurationErrors, init_errorMessage, init_isRecord, isRecord } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_strictUtf8 } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, appendCallerPath, compareUnicodeCodePoints, init_callerPath, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, mergeEnvironmentOverrides, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { PRODUCT_IDENTITY, init_identity } from "./identity-5e2nCwLT.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { init_analysisSettings, inspectAnalysisSettingSeeds } from "./analysisSettings-MZ1xRfTM.js";
import { init_environment, parseEnvironment, parseEnvironmentValues } from "./environment-BysPqLj9.js";
import { ExecFileOutputCancelledError, execFileBytes, init_ExecFileOutput } from "./ExecFileOutput-YDVPmL3I.js";
import { existsSync, lstatSync, opendirSync, readFileSync, readdirSync, realpathSync, statSync } from "node:fs";
import { basename, dirname, isAbsolute, join, posix, relative, resolve, sep, win32 } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { isDeepStrictEqual } from "node:util";
import { lstat, realpath } from "node:fs/promises";
import { userInfo } from "node:os";
import { parse, stringify } from "smol-toml";
import { Alias, Document, Pair, Schema, YAMLMap, isAlias, isMap, isNode, isScalar, isSeq, parseDocument, visit } from "yaml";
import { applyEdits, createScanner, format, getNodeValue, parseTree, printParseErrorCode } from "jsonc-parser";

//#region dist/application/YamlConfigurationAliases.js
var resolveYamlEditPath, copyAliasComments, aliasTarget, validateAliasValue, newAnchorName, survivingAlias, copyAliasValue, preserveYamlAliasValues, copyYamlAliasSource;
function init_YamlConfigurationAliases() {
	return (init_YamlConfigurationAliases = __esmMin((() => {
		init_configurationErrors();
		resolveYamlEditPath = (document, path) => {
			const resolved = [];
			let current = document.contents;
			for (const name of path) {
				if (isAlias(current)) current = current.resolve(document);
				if (!isMap(current)) {
					resolved.push(name);
					current = undefined;
					continue;
				}
				const matches = current.items.filter((pair) => {
					const key = isAlias(pair.key) ? pair.key.resolve(document) : pair.key;
					return isScalar(key) && key.value === name;
				});
				if (matches.length > 1) throw new ConfigurationError(`YAML mapping contains more than one key resolving to ${JSON.stringify(name)}.`);
				const pair = matches[0];
				resolved.push(pair !== undefined && isNode(pair.key) ? pair.key : name);
				current = pair?.value;
			}
			return resolved;
		};
		copyAliasComments = (source, copy) => {
			for (const key of ["commentBefore", "comment"]) {
				const comment = source[key];
				if (comment === undefined) continue;
				copy[key] = copy[key] === undefined ? comment : `${copy[key]}\n${comment}`;
			}
			return copy;
		};
		aliasTarget = (source, context) => {
			const target = context.targets.get(source);
			if (target === undefined) throw new TypeError("Cannot preserve an unresolved YAML alias");
			return target;
		};
		validateAliasValue = (source, context) => {
			if (context.validated.has(source)) return;
			if (context.visiting.has(source)) throw new TypeError("Cannot preserve cyclic YAML aliases");
			context.visiting.add(source);
			visit(source, { Alias: (_key, node) => validateAliasValue(aliasTarget(node, context), context) });
			context.visiting.delete(source);
			context.validated.add(source);
		};
		newAnchorName = (anchor, context) => {
			let index = 1;
			let name = `${anchor}_rea_preserved`;
			while (context.names.has(name)) name = `${anchor}_rea_preserved_${index++}`;
			context.names.add(name);
			return name;
		};
		survivingAlias = (target, context) => {
			if (isAlias(target) || target.anchor === undefined) throw new TypeError("Invalid YAML alias target");
			if (!context.reusedNames.has(target.anchor)) return new Alias(target.anchor);
			let name = context.survivingNames.get(target);
			if (name === undefined) {
				name = newAnchorName(target.anchor, context);
				context.survivingNames.set(target, name);
			}
			return new Alias(name);
		};
		copyAliasValue = (source, context, cloned) => {
			if (isAlias(source)) {
				const target = aliasTarget(source, context);
				return copyAliasComments(source, context.removed.has(target) ? copyAliasValue(target, context) : survivingAlias(target, context));
			}
			if (context.visiting.has(source)) throw new TypeError("Cannot preserve cyclic YAML aliases");
			const retained = context.retained.get(source);
			if (retained !== undefined && !isAlias(retained) && retained.anchor !== undefined) return new Alias(retained.anchor);
			const copy = cloned ?? source.clone();
			if (!isNode(copy) || isAlias(copy)) throw new TypeError("Invalid YAML value copy");
			context.copied.add(source);
			if (source.anchor !== undefined) {
				copy.anchor = newAnchorName(source.anchor, context);
				context.retained.set(source, copy);
			}
			context.visiting.add(source);
			const child = (value, copied) => isNode(value) ? copyAliasValue(value, context, isNode(copied) ? copied : undefined) : copied;
			if (isMap(source) && isMap(copy)) {
				for (const [index, pair] of source.items.entries()) {
					const copied = copy.items[index];
					if (copied === undefined) continue;
					copied.key = child(pair.key, copied.key);
					copied.value = child(pair.value, copied.value);
				}
			} else if (isSeq(source) && isSeq(copy)) {
				copy.items = source.items.map((value, index) => child(value, copy.items[index]));
			}
			context.visiting.delete(source);
			return copy;
		};
		preserveYamlAliasValues = (document, previous) => {
			const roots = previous.filter(isNode);
			const removed = new Set();
			for (const root of roots) visit(root, { Value: (_key, node) => {
				if (node.anchor !== undefined) removed.add(node);
			} });
			if (removed.size === 0) return new Set();
			const targets = new Map();
			const names = new Set();
			const reusedNames = new Set();
			visit(document, {
				Alias: (_key, node) => {
					targets.set(node, node.resolve(document));
				},
				Value: (_key, node) => {
					if (node.anchor === undefined) return;
					if (names.has(node.anchor)) reusedNames.add(node.anchor);
					names.add(node.anchor);
				}
			});
			const context = {
				targets,
				removed,
				retained: new Map(),
				copied: new Set(),
				survivingNames: new Map(),
				visiting: new Set(),
				validated: new Set(),
				names,
				reusedNames
			};
			const replacements = new Map();
			visit(document, { Alias: (_key, node, path) => {
				if (!roots.some((root) => path.includes(root))) {
					const target = targets.get(node);
					if (target === undefined || !removed.has(target)) return;
					validateAliasValue(target, context);
					replacements.set(node, copyAliasComments(node, copyAliasValue(target, context)));
				}
			} });
			for (const [target, name] of context.survivingNames) if (!isAlias(target)) target.anchor = name;
			visit(document, { Alias: (_key, node) => {
				const replacement = replacements.get(node);
				if (replacement !== undefined) return replacement;
				const target = targets.get(node);
				const name = target === undefined ? undefined : context.survivingNames.get(target);
				return name === undefined ? undefined : copyAliasComments(node, new Alias(name));
			} });
			return context.copied;
		};
		copyYamlAliasSource = (source, document, visiting = new Set()) => {
			const node = isAlias(source) ? source.resolve(document) : source;
			if (isAlias(source) && node === undefined) throw new TypeError("Cannot edit an unresolved YAML alias");
			if (!isNode(node)) return node;
			if (visiting.has(node)) throw new TypeError("Cannot edit cyclic YAML aliases");
			visiting.add(node);
			const copied = node.clone();
			if (isScalar(copied) || isMap(copied) || isSeq(copied)) delete copied.anchor;
			if (isSeq(node) && isSeq(copied)) copied.items = node.items.map((item) => copyYamlAliasSource(item, document, visiting));
			else if (isMap(node) && isMap(copied)) copied.items.forEach((pair, index) => {
				const original = node.items[index];
				if (original === undefined) return;
				pair.key = copyYamlAliasSource(original.key, document, visiting);
				pair.value = copyYamlAliasSource(original.value, document, visiting);
			});
			if (isAlias(source)) {
				delete copied.commentBefore;
				delete copied.comment;
				if (source.commentBefore !== undefined) copied.commentBefore = source.commentBefore;
				if (source.comment !== undefined) copied.comment = source.comment;
			}
			visiting.delete(node);
			return copied;
		};
	})))();
}

//#endregion
//#region dist/application/YamlSequenceAnnotations.js
var retainYamlSequenceAnnotations;
function init_YamlSequenceAnnotations() {
	return (init_YamlSequenceAnnotations = __esmMin((() => {
		retainYamlSequenceAnnotations = (previous, next, valueOf, retain, ownsComments) => {
			const sourceCounts = new Map();
			const targetCounts = new Map();
			const targets = new Map();
			for (const item of previous.items) {
				const value = valueOf(item);
				if (typeof value === "string") sourceCounts.set(value, (sourceCounts.get(value) ?? 0) + 1);
			}
			next.items.forEach((item, index) => {
				const value = valueOf(item);
				if (typeof value !== "string" || !isNode(item)) return;
				targetCounts.set(value, (targetCounts.get(value) ?? 0) + 1);
				targets.set(value, index);
			});
			const orphaned = [];
			for (const source of previous.items) {
				if (!isNode(source)) continue;
				const value = valueOf(source);
				const index = typeof value === "string" && sourceCounts.get(value) === 1 && targetCounts.get(value) === 1 ? targets.get(value) : undefined;
				const target = index === undefined ? undefined : next.items[index];
				if (index !== undefined && isNode(target)) next.items[index] = retain(source, target);
				else if (ownsComments(source)) {
					for (const comment of [source.commentBefore, source.comment]) if (typeof comment === "string") orphaned.push(comment);
				}
			}
			if (orphaned.length > 0) next.commentBefore = [next.commentBefore, ...orphaned].filter((comment) => typeof comment === "string").join("\n");
		};
	})))();
}

//#endregion
//#region dist/application/YamlConfigurationSource.js
var yamlNumericValuesEqual, normalizeYamlInteger, containsRetainedSource, yamlAliasValues, materializeUnresolvedYamlAliases, retainYamlConfigurationSource, retainYamlSequenceSource, resolvedStringKeys, retainYamlMapSource, isYamlMergeKey, retainYamlMergeSources, retainProjectedYamlKeys, sameResolvedScalarValue, retainYamlScalarSource;
function init_YamlConfigurationSource() {
	return (init_YamlConfigurationSource = __esmMin((() => {
		init_configurationErrors();
		init_YamlSequenceAnnotations();
		yamlNumericValuesEqual = (left, right) => {
			if (typeof left === "bigint" && typeof right === "bigint") return left === right;
			if (typeof left === "number" && typeof right === "number") return left === right || Number.isNaN(left) && Number.isNaN(right);
			const integer = typeof left === "bigint" ? left : right;
			const number = typeof left === "number" ? left : right;
			return Number.isFinite(number) && Number.isInteger(number) && BigInt(number) === integer;
		};
		normalizeYamlInteger = (_key, value) => typeof value === "bigint" && Number.isSafeInteger(Number(value)) ? Number(value) : value;
		containsRetainedSource = (roots, retainedSources) => {
			if (retainedSources.size === 0) return false;
			let found = false;
			for (const root of roots) {
				if (!isNode(root)) continue;
				visit(root, { Value: (_key, node) => {
					if (retainedSources.has(node)) found = true;
				} });
			}
			return found;
		};
		yamlAliasValues = (root, document) => {
			const bindings = new Map();
			if (!isNode(root)) return bindings;
			visit(root, { Alias: (_key, alias) => {
				const target = alias.resolve(document);
				if (target !== undefined) bindings.set(alias, {
					target,
					value: target.toJS(document)
				});
			} });
			return bindings;
		};
		materializeUnresolvedYamlAliases = (document, bindings) => {
			if (bindings.size === 0) return;
			visit(document, { Alias: (_key, alias) => {
				const binding = bindings.get(alias);
				if (binding === undefined || alias.resolve(document) === binding.target) return undefined;
				const replacement = document.createNode(binding.value);
				if (alias.comment !== undefined) replacement.comment = alias.comment;
				if (alias.commentBefore !== undefined) replacement.commentBefore = alias.commentBefore;
				if (alias.spaceBefore !== undefined) replacement.spaceBefore = alias.spaceBefore;
				return replacement;
			} });
		};
		retainYamlConfigurationSource = (previous, next, retainedSources, document) => {
			if ((isMap(previous) || isSeq(previous)) && (isMap(previous) && isMap(next) || isSeq(previous) && isSeq(next))) {
				if (!containsRetainedSource([previous], retainedSources) && isDeepStrictEqual(previous.toJS(document, { reviver: normalizeYamlInteger }), next.toJS(document, { reviver: normalizeYamlInteger }))) return previous;
			}
			if (isScalar(previous) && isScalar(next) && (previous.value === next.value || typeof previous.value === "bigint" && typeof next.value === "number" && yamlNumericValuesEqual(previous.value, next.value))) {
				if (!retainedSources.has(previous)) return previous;
				const copied = previous.clone();
				if (!isScalar(copied)) throw new TypeError("Invalid YAML scalar copy");
				delete copied.anchor;
				delete copied.comment;
				delete copied.commentBefore;
				delete copied.spaceBefore;
				return copied;
			}
			if (isNode(previous) && !retainedSources.has(previous)) {
				if (previous.comment !== undefined) next.comment = previous.comment;
				if (previous.commentBefore !== undefined) next.commentBefore = previous.commentBefore;
				if (previous.spaceBefore !== undefined) next.spaceBefore = previous.spaceBefore;
			}
			if (isMap(previous) && isMap(next)) {
				retainYamlMapSource(previous, next, retainedSources, document);
			} else if (isSeq(previous) && isSeq(next)) {
				retainYamlSequenceSource(previous, next, retainedSources, document);
			}
			return next;
		};
		retainYamlSequenceSource = (previous, next, retainedSources, document) => {
			const stringItems = (items) => items.every((item) => isScalar(item) && typeof item.value === "string");
			if (stringItems(previous.items) && stringItems(next.items)) {
				retainYamlSequenceAnnotations(previous, next, (item) => isScalar(item) ? item.value : undefined, (source, target) => retainYamlConfigurationSource(source, target, retainedSources, document), (source) => !retainedSources.has(source));
				return;
			}
			next.items = next.items.map((item, index) => isNode(item) ? retainYamlConfigurationSource(previous.items[index], item, retainedSources, document) : item);
		};
		resolvedStringKeys = (map, document) => {
			const resolved = new Map();
			const aliased = new Map();
			for (const pair of map.items) {
				if (isScalar(pair.key) && typeof pair.key.value === "string") resolved.set(pair, pair.key.value);
				else if (isAlias(pair.key)) {
					const target = pair.key.resolve(document);
					if (isScalar(target) && typeof target.value === "string") aliased.set(pair, target.value);
				}
			}
			const counts = new Map();
			for (const key of [...resolved.values(), ...aliased.values()]) counts.set(key, (counts.get(key) ?? 0) + 1);
			for (const [pair, key] of aliased) if (counts.get(key) === 1) resolved.set(pair, key);
			return resolved;
		};
		retainYamlMapSource = (previous, next, retainedSources, document) => {
			const hasMerges = retainYamlMergeSources(previous, next, document);
			const hasSourceOnlyKeys = retainProjectedYamlKeys(previous, next, retainedSources, document);
			const previousKeys = resolvedStringKeys(previous, document);
			const matched = new Map();
			const entries = new Map([...previousKeys].map(([pair, key]) => [key, pair]));
			for (const pair of next.items) {
				if (previous.items.includes(pair)) continue;
				const key = isScalar(pair.key) ? pair.key.value : undefined;
				const prior = typeof key === "string" ? entries.get(key) : undefined;
				if (prior === undefined) continue;
				matched.set(pair, prior);
				pair.key = isAlias(prior.key) ? prior.key : isNode(pair.key) ? retainYamlConfigurationSource(prior.key, pair.key, retainedSources, document) : prior.key;
				if (isNode(pair.value)) pair.value = retainYamlConfigurationSource(prior.value, pair.value, retainedSources, document);
			}
			if (hasSourceOnlyKeys || hasMerges) {
				const positions = new Map(previous.items.map((pair, index) => [pair, index]));
				const position = (pair) => {
					const key = isScalar(pair.key) ? pair.key.value : undefined;
					const original = positions.has(pair) ? pair : matched.get(pair) ?? (typeof key === "string" ? entries.get(key) : undefined);
					return original === undefined ? Infinity : positions.get(original) ?? Infinity;
				};
				next.items.sort((left, right) => position(left) - position(right));
			}
		};
		isYamlMergeKey = (key) => isScalar(key) && typeof key.value === "symbol" && key.source === "<<";
		retainYamlMergeSources = (previous, next, document) => {
			const merges = previous.items.filter((pair) => isYamlMergeKey(pair.key));
			if (merges.length === 0) return false;
			const inherited = new YAMLMap(document.schema);
			inherited.items = merges;
			const direct = new YAMLMap(document.schema);
			direct.items = previous.items.filter((pair) => !isYamlMergeKey(pair.key));
			const project = (map) => map.toJS(document, { reviver: normalizeYamlInteger });
			const inheritedValues = project(inherited);
			const directValues = project(direct);
			const desired = project(next);
			const inheritedUnchanged = new Set();
			for (const [key, value] of Object.entries(inheritedValues)) {
				if (!Object.hasOwn(desired, key)) throw new ConfigurationError(`Cannot remove inherited YAML setting ${JSON.stringify(key)} while retaining its merge.`);
				if (Object.hasOwn(directValues, key)) continue;
				if (isDeepStrictEqual(value, desired[key])) inheritedUnchanged.add(key);
			}
			next.items = [...merges, ...next.items.filter((pair) => {
				const key = isScalar(pair.key) ? pair.key.value : undefined;
				return typeof key !== "string" || !inheritedUnchanged.has(key);
			})];
			return true;
		};
		retainProjectedYamlKeys = (previous, next, retainedSources, document) => {
			const groups = new Map();
			const sourceOnlyKeys = new Set();
			const stringKeys = resolvedStringKeys(previous, document);
			for (const pair of previous.items) {
				if (isYamlMergeKey(pair.key)) continue;
				let key;
				const stringKey = stringKeys.get(pair);
				if (stringKey !== undefined) key = stringKey;
				else {
					const singleton = new YAMLMap(document.schema);
					singleton.items.push(new Pair(pair.key, null));
					const projected = singleton.toJS(document);
					if (typeof projected !== "object" || projected === null) throw new ConfigurationError("YAML mapping key could not be resolved safely");
					const [projectedKey] = Object.keys(projected);
					if (projectedKey === undefined || Object.keys(projected).length !== 1) throw new ConfigurationError("YAML mapping key could not be resolved safely");
					key = projectedKey;
					sourceOnlyKeys.add(key);
				}
				const group = groups.get(key) ?? [];
				group.push(pair);
				groups.set(key, group);
			}
			if (sourceOnlyKeys.size > 0) {
				const oldValue = previous.toJS(document, { reviver: normalizeYamlInteger });
				const newValue = next.toJS(document, { reviver: normalizeYamlInteger });
				if (typeof oldValue !== "object" || oldValue === null || typeof newValue !== "object" || newValue === null) throw new ConfigurationError("YAML mapping could not be compared safely");
				const oldProperties = oldValue;
				const newProperties = newValue;
				const replacements = new Map();
				for (const key of sourceOnlyKeys) {
					const group = groups.get(key);
					if (group === undefined) continue;
					if (!Object.hasOwn(newProperties, key) || !isDeepStrictEqual(oldProperties[key], newProperties[key])) throw new ConfigurationError(`Cannot safely change YAML mapping key ${JSON.stringify(key)} because its source identity is not a plain string key.`);
					if (containsRetainedSource(group.flatMap((pair) => [pair.key, pair.value]), retainedSources)) throw new ConfigurationError(`Cannot safely preserve YAML mapping key ${JSON.stringify(key)} while its anchor is moved.`);
					replacements.set(key, group);
				}
				next.items = next.items.flatMap((pair) => {
					const key = isScalar(pair.key) ? pair.key.value : undefined;
					const replacement = typeof key === "string" ? replacements.get(key) : undefined;
					return replacement ?? [pair];
				});
			}
			return sourceOnlyKeys.size > 0;
		};
		sameResolvedScalarValue = (left, right) => Object.is(left, right) || left instanceof Date && right instanceof Date && left.getTime() === right.getTime();
		retainYamlScalarSource = (tag) => {
			if (typeof tag === "string" || tag.collection !== undefined) return tag;
			const { stringify } = tag;
			if (stringify === undefined) return tag;
			return {
				...tag,
				stringify: (item, context, ...rest) => {
					const { source } = item;
					if (source === undefined) return stringify(item, context, ...rest);
					const reader = context.doc.schema.tags.find((candidate) => candidate.default === true && candidate.test?.test(source) === true);
					const read = reader?.resolve(source, () => undefined, context.doc.options);
					return sameResolvedScalarValue(isScalar(read) ? read.value : read, item.value) ? source : stringify(item, context, ...rest);
				}
			};
		};
	})))();
}

//#endregion
//#region dist/application/GooseConfigurationYaml.js
var nativeIntegerSyntax, leadingZeroDigits, finiteFloatSyntax, nativeFloatSyntax, minimumI64, maximumU64, minimumI128, maximumU128, nativeGooseInteger, nativeGooseFloat, implicitGooseNumber, gooseScalarTags, gooseYamlOptions, GooseConfigurationYamlError, emptyRoot, duplicatePath, parseGooseDocument, gooseDocumentValue, parseGooseConfigurationYaml, stringifyGooseConfigurationYaml, editGooseConfigurationYaml;
function init_GooseConfigurationYaml() {
	return (init_GooseConfigurationYaml = __esmMin((() => {
		init_configurationErrors();
		init_YamlConfigurationAliases();
		init_YamlConfigurationSource();
		nativeIntegerSyntax = /^[+-]?(?:0|[1-9][0-9]*|0b[01]+|0o[0-7]+|0x[0-9a-fA-F]+)$/;
		leadingZeroDigits = /^[+-]?0[0-9]+$/;
		finiteFloatSyntax = /^[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;
		nativeFloatSyntax = /^(?![+-]?0[0-9]+$)(?:[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?|[+-]?\.(?:inf|Inf|INF)|\.(?:nan|NaN|NAN))$/;
		minimumI64 = -(1n << 63n);
		maximumU64 = (1n << 64n) - 1n;
		minimumI128 = -(1n << 127n);
		maximumU128 = (1n << 128n) - 1n;
		nativeGooseInteger = (source) => {
			if (!nativeIntegerSyntax.test(source)) return undefined;
			const negative = source.startsWith("-");
			const unsigned = source.replace(/^[+-]/, "");
			const prefix = /^0[box]/.exec(unsigned)?.[0] ?? "";
			const radix = prefix === "0b" ? 2 : prefix === "0o" ? 8 : prefix === "0x" ? 16 : 10;
			const digits = unsigned.slice(prefix.length).replace(/^0+/, "") || "0";
			const maximumMagnitude = negative ? -minimumI128 : maximumU128;
			if (digits.length > maximumMagnitude.toString(radix).length) return undefined;
			const magnitude = BigInt(`${prefix}${digits}`);
			const value = negative ? -magnitude : magnitude;
			if (value < minimumI128 || value > maximumU128) return undefined;
			if (value < minimumI64 || value > maximumU64) throw new TypeError("Goose serde_yaml Value cannot represent an i128/u128 integer");
			return value;
		};
		nativeGooseFloat = (source) => {
			if (/^[+]?\.(?:inf|Inf|INF)$/.test(source)) return Infinity;
			if (/^-\.(?:inf|Inf|INF)$/.test(source)) return -Infinity;
			if (/^\.(?:nan|NaN|NAN)$/.test(source)) return NaN;
			if (!finiteFloatSyntax.test(source)) return undefined;
			const value = Number(source);
			return Number.isFinite(value) ? value : undefined;
		};
		implicitGooseNumber = (source) => {
			const integer = nativeGooseInteger(source);
			if (integer !== undefined) return integer;
			if (leadingZeroDigits.test(source)) return source;
			return nativeGooseFloat(source) ?? source;
		};
		gooseScalarTags = (tags) => {
			const scalar = (name) => {
				const tag = tags.find((candidate) => typeof candidate !== "string" && candidate.collection === undefined && candidate.tag === `tag:yaml.org,2002:${name}` && candidate.format === undefined);
				if (tag === undefined) throw new Error(`Missing YAML core ${name} scalar tag`);
				return tag;
			};
			const integer = scalar("int");
			const float = scalar("float");
			const explicit = (tag, resolve) => {
				const { test: _test, ...rest } = tag;
				return {
					...rest,
					default: false,
					resolve
				};
			};
			return [
				...tags.filter((tag) => typeof tag === "string" || tag.tag !== integer.tag && tag.tag !== float.tag),
				retainYamlScalarSource({
					...integer,
					test: nativeIntegerSyntax,
					resolve: implicitGooseNumber
				}),
				retainYamlScalarSource({
					...float,
					test: nativeFloatSyntax,
					resolve: implicitGooseNumber
				}),
				explicit(integer, (source) => {
					const value = nativeGooseInteger(source);
					if (value === undefined) throw new TypeError("Invalid Goose integer scalar");
					return value;
				}),
				explicit(float, (source) => {
					const value = nativeGooseFloat(source);
					if (value === undefined) throw new TypeError("Invalid Goose float scalar");
					return value;
				}),
				explicit(scalar("bool"), (source) => {
					if (/^(?:true|True|TRUE)$/.test(source)) return true;
					if (/^(?:false|False|FALSE)$/.test(source)) return false;
					throw new TypeError("Invalid Goose boolean scalar");
				}),
				explicit(scalar("null"), (source) => {
					if (/^(?:null|Null|NULL|~)$/.test(source)) return null;
					throw new TypeError("Invalid Goose null scalar");
				})
			];
		};
		gooseYamlOptions = {
			version: "1.2",
			schema: "core",
			intAsBigInt: true,
			logLevel: "error",
			customTags: gooseScalarTags
		};
		GooseConfigurationYamlError = class extends ConfigurationError {
			path;
			kind = "shadowed_member";
			constructor(path, cause) {
				super(`Goose YAML contains a duplicate mapping member at ${path.join(".") || "the document root"}`, { cause });
				this.path = path;
			}
		};
		emptyRoot = (root) => root === null || isScalar(root) && root.value === null && root.source === "" && root.tag === undefined && root.anchor === undefined;
		duplicatePath = (node, offset, path = []) => {
			if (isMap(node)) {
				for (const pair of node.items) {
					const key = isScalar(pair.key) ? pair.key : undefined;
					const next = key === undefined ? path : [...path, String(key.value)];
					if (key?.range?.[0] === offset) return next;
					const nested = duplicatePath(pair.value, offset, next);
					if (nested !== undefined) return nested;
				}
			} else if (isSeq(node)) {
				for (const [index, item] of node.items.entries()) {
					const nested = duplicatePath(item, offset, [...path, String(index)]);
					if (nested !== undefined) return nested;
				}
			}
			return undefined;
		};
		parseGooseDocument = (text) => {
			const document = parseDocument(text, gooseYamlOptions);
			const failure = document.errors[0] ?? document.warnings[0];
			if (failure?.code === "DUPLICATE_KEY") throw new GooseConfigurationYamlError(duplicatePath(document.contents, failure.pos[0]) ?? [], failure);
			if (failure !== undefined) throw new ConfigurationError("Invalid or unsupported Goose YAML", { cause: failure });
			return document;
		};
		gooseDocumentValue = (document) => {
			if (emptyRoot(document.contents)) return {};
			try {
				return document.toJS({ reviver: (_key, value) => typeof value === "bigint" && value >= BigInt(Number.MIN_SAFE_INTEGER) && value <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(value) : value });
			} catch (cause) {
				throw new ConfigurationError("Goose YAML values could not be resolved", { cause });
			}
		};
		parseGooseConfigurationYaml = (text) => gooseDocumentValue(parseGooseDocument(text));
		stringifyGooseConfigurationYaml = (document) => new Document(document, gooseYamlOptions).toString({ lineWidth: 0 });
		editGooseConfigurationYaml = (text, path, value) => {
			const document = parseGooseDocument(text);
			gooseDocumentValue(document);
			const root = document.contents;
			if (emptyRoot(root)) {
				const map = document.createNode({});
				if (isScalar(root)) map.commentBefore = [root.commentBefore, root.comment].filter((comment) => comment !== undefined).join("\n");
				document.contents = map;
			}
			if (!isMap(document.contents)) throw new ConfigurationError("Goose configuration root must be a mapping");
			for (let length = 1; length < path.length; length++) {
				const parent = resolveYamlEditPath(document, path.slice(0, length));
				let previous = document.getIn(parent, true);
				if (isAlias(previous)) {
					previous = copyYamlAliasSource(previous, document);
					document.setIn(parent, previous);
				}
				if (previous === undefined && !document.hasIn(parent)) {
					if (value === undefined) return text;
					document.setIn(parent, document.createNode({}));
				} else if (!isMap(previous)) throw new ConfigurationError(`Goose configuration ${path.slice(0, length).join(".")} must be a mapping`);
			}
			const sourcePath = resolveYamlEditPath(document, path);
			const previous = document.getIn(sourcePath, true);
			const parent = document.getIn(sourcePath.slice(0, -1), true);
			const removedKey = value === undefined && isMap(parent) ? parent.items.find((pair) => pair.key === sourcePath.at(-1))?.key : undefined;
			const aliasValues = yamlAliasValues(previous, document);
			const retained = preserveYamlAliasValues(document, [previous, removedKey]);
			if (value === undefined) {
				if (!document.deleteIn(sourcePath)) return text;
			} else {
				document.setIn(sourcePath, isMap(previous) || isSeq(previous) ? retainYamlConfigurationSource(previous, document.createNode(value), retained, document) : value);
				materializeUnresolvedYamlAliases(document, aliasValues);
			}
			return document.toString({ lineWidth: 0 });
		};
	})))();
}

//#endregion
//#region dist/application/RegistrationEnvironmentValidation.js
var validateRegistrationEnvironment;
function init_RegistrationEnvironmentValidation() {
	return (init_RegistrationEnvironmentValidation = __esmMin((() => {
		init_analysisSettings();
		init_environment();
		init_configurationErrors();
		init_result();
		init_snapshotEnvironment();
		validateRegistrationEnvironment = (values, expressionSettings, validation, platform) => {
			const runtimeEnvironment = snapshotEnvironment(values, platform);
			const unresolvedSettings = new Set(Object.keys(snapshotEnvironment(Object.fromEntries([...expressionSettings].map((name) => [name, ""])), platform)));
			const validated = validation === "fragment" ? parseEnvironmentValues(runtimeEnvironment, unresolvedSettings) : parseEnvironment(runtimeEnvironment, unresolvedSettings);
			if (!validated.ok) return validated;
			const seedIssues = inspectAnalysisSettingSeeds(runtimeEnvironment, unresolvedSettings);
			if (seedIssues.length > 0) return err(new ConfigurationError("Invalid REA environment configuration", { settings: seedIssues }));
			return ok({
				configuration: validated.value,
				unresolvedSettings
			});
		};
	})))();
}

//#endregion
//#region dist/application/DshCordisYaml.js
var CordisExpression, DshCordisYaml;
function init_DshCordisYaml() {
	return (init_DshCordisYaml = __esmMin((() => {
		init_YamlSequenceAnnotations();
		init_configurationErrors();
		CordisExpression = class {
			source;
			kind = "cordis-expression";
			constructor(source) {
				this.source = source;
			}
		};
		DshCordisYaml = class {
			document;
			#values = new Map();
			#visiting = new Set();
			constructor(text) {
				this.document = parseDocument(text, {
					customTags: [{
						tag: "tag:yaml.org,2002:js",
						resolve: (source) => source
					}],
					logLevel: "error"
				});
				if (this.document.errors.length > 0 || this.document.warnings.length > 0) throw new ConfigurationError("Invalid or unsupported Cordis YAML", { cause: this.document.errors[0] ?? this.document.warnings[0] });
				if (this.document.contents === null) this.document.contents = this.document.createNode([]);
				if (!isSeq(this.document.contents)) throw new ConfigurationError("Cordis patches must be a YAML operation list");
				this.value(this.document.contents);
				try {
					this.document.toJS();
				} catch (cause) {
					throw new ConfigurationError("Unsafe Cordis YAML alias expansion", { cause });
				}
			}
			resolve(node) {
				if (!isAlias(node)) return node;
				const resolved = node.resolve(this.document);
				if (resolved === undefined) throw new ConfigurationError("Cordis YAML contains an unresolved alias");
				return resolved;
			}
			value(node) {
				const resolved = this.resolve(node);
				if (!isNode(resolved)) return resolved;
				if (this.#values.has(resolved)) return this.#values.get(resolved);
				if (this.#visiting.has(resolved)) throw new ConfigurationError("Cyclic Cordis YAML cannot be safely edited");
				this.#visiting.add(resolved);
				let value;
				if (isScalar(resolved)) value = resolved.tag === "tag:yaml.org,2002:js" ? new CordisExpression(String(resolved.value)) : resolved.value;
				else if (isSeq(resolved)) value = resolved.items.map((item) => this.value(item));
				else if (isMap(resolved)) {
					const entries = [];
					for (const pair of resolved.items) {
						entries.push([this.key(pair.key), this.value(pair.value)]);
					}
					value = Object.fromEntries(entries);
				}
				this.#visiting.delete(resolved);
				this.#values.set(resolved, value);
				return value;
			}
			key(node) {
				const key = this.value(node);
				if (typeof key === "object" && key !== null) throw new ConfigurationError("Cordis YAML mapping keys must be literal scalars");
				return key === null ? "" : String(key);
			}
			/** A case-only rename retains source key/value comments on the chosen alias. */
			renameKey(map, pair, key) {
				const existing = map.items.find((item) => item !== pair && this.key(item.key) === key);
				const replacement = existing ?? pair;
				const carry = (source, target) => {
					if (!isNode(source) || !isNode(target) || source === target) return;
					for (const name of ["comment", "commentBefore"]) {
						const values = [target[name], source[name]].filter((value) => value !== undefined);
						if (values.length > 0) target[name] = [...new Set(values)].join("\n");
					}
				};
				if (existing !== undefined) {
					carry(pair.key, existing.key);
					carry(pair.value, existing.value);
					map.items = map.items.filter((item) => item !== pair);
				} else if (this.key(pair.key) !== key) {
					const renamed = this.document.createNode(key);
					carry(pair.key, renamed);
					replacement.key = renamed;
				}
			}
			field(map, key) {
				return map?.items.findLast((pair) => this.key(pair.key) === key)?.value;
			}
			/** Preserve unchanged nodes and carry their comments when replacing values. */
			setValue(map, key, value) {
				const pair = map.items.findLast((item) => this.key(item.key) === key);
				const original = pair?.value;
				if (isDeepStrictEqual(this.value(original), value)) return;
				const replacement = this.document.createNode(value);
				if (isNode(original) && isNode(replacement)) {
					if (original.comment !== undefined) replacement.comment = original.comment;
					if (original.commentBefore !== undefined) replacement.commentBefore = original.commentBefore;
				}
				if (isSeq(original) && isSeq(replacement)) {
					retainYamlSequenceAnnotations(original, replacement, (node) => this.value(node), (source, target) => {
						if (source.commentBefore !== undefined) target.commentBefore = source.commentBefore;
						if (source.comment !== undefined) target.comment = source.comment;
						if (source.spaceBefore !== undefined) target.spaceBefore = source.spaceBefore;
						return target;
					}, () => true);
				}
				if (pair === undefined) map.set(key, replacement);
				else pair.value = replacement;
			}
			/** Copy from the source before edits; materialized nodes own no anchors. */
			copy(node, invalidated) {
				if (isAlias(node)) {
					const target = this.resolve(node);
					return invalidated === undefined || isNode(target) && invalidated.has(target) ? this.copy(target) : node.clone();
				}
				if (!isNode(node)) return node;
				const copied = node.clone();
				if ((invalidated === undefined || invalidated.has(node)) && (isScalar(copied) || isMap(copied) || isSeq(copied))) delete copied.anchor;
				if (isSeq(node) && isSeq(copied)) copied.items = node.items.map((item) => this.copy(item, invalidated));
				if (isMap(node) && isMap(copied)) copied.items.forEach((pair, index) => {
					pair.key = this.copy(node.items[index].key, invalidated);
					pair.value = this.copy(node.items[index].value, invalidated);
				});
				return copied;
			}
			/** Replacing an anchor must not change untouched consumers of its old value. */
			detach(node, invalidated) {
				const copied = this.copy(node, invalidated);
				if (isNode(copied)) visit(copied, {
					Pair: (_key, pair) => {
						if (isAlias(pair.key)) pair.key = this.copy(this.resolve(pair.key));
					},
					Value: (_key, value) => {
						delete value.anchor;
					}
				});
				return copied;
			}
			anchors(node) {
				if (!isNode(node)) return [];
				const anchors = [];
				visit(node, { Value: (_key, value) => {
					if (value.anchor) anchors.push(value);
				} });
				return anchors;
			}
		};
	})))();
}

//#endregion
//#region dist/application/DshCordisPatch.js
var DSH_ENTRY_ID, DSH_CLIENT_PACKAGE, LAUNCHER_KEYS, SELECTOR_KEYS, isPatchRecord, DshCordisDocument, DshCordisEdit, dshDocument, parseDshCordisDocument, editDshDocument, serializeDshDocument, dshToolCallTimeout, dshClientRegistrationEntry;
function init_DshCordisPatch() {
	return (init_DshCordisPatch = __esmMin((() => {
		init_RegistrationEnvironmentValidation();
		init_configurationErrors();
		init_result();
		init_DshCordisYaml();
		init_snapshotEnvironment();
		DSH_ENTRY_ID = "rea-mcp";
		DSH_CLIENT_PACKAGE = "@deepseek-ai/dsh-mcp-client";
		LAUNCHER_KEYS = new Set([
			"serverName",
			"transport",
			"command",
			"args"
		]);
		SELECTOR_KEYS = new Set(["id", "name"]);
		isPatchRecord = (value) => isRecord(value) && !(value instanceof CordisExpression);
		DshCordisDocument = class {
			#yaml;
			#operations;
			#fields = new Map();
			#entryNode;
			#insertions;
			#unknownSelector = false;
			#unknownStructure = false;
			#editabilityError;
			config;
			constructor(text) {
				this.#yaml = new DshCordisYaml(text);
				const root = this.#yaml.document.contents;
				if (!isSeq(root)) throw new ConfigurationError("Cordis patches must be a list");
				const operations = [];
				let insertions = 0;
				let malformedStructure = false;
				for (const source of root.items) {
					const map = this.#map(source);
					if (map === undefined) {
						if (this.#yaml.value(source) instanceof CordisExpression) this.#unknownStructure = true;
						else malformedStructure = true;
						continue;
					}
					const inserted = this.#yaml.resolve(this.#yaml.field(map, "insert"));
					const targetId = this.#id(map);
					const unknownApplicability = targetId !== undefined;
					const insertedValue = this.#yaml.value(inserted);
					const invalidEntries = isSeq(inserted) ? inserted.items.filter((entry) => this.#map(entry) === undefined) : [];
					if (insertedValue instanceof CordisExpression || invalidEntries.some((entry) => this.#yaml.value(entry) instanceof CordisExpression)) this.#unknownStructure = true;
					else if (insertedValue != null && !isSeq(inserted)) malformedStructure = true;
					else if (invalidEntries.length > 0) malformedStructure = true;
					const ownedRows = isSeq(inserted) ? inserted.items.flatMap((entry, index) => this.#id(entry) === "rea-mcp" ? [index] : []) : [];
					const direct = !isSeq(inserted) && targetId === "rea-mcp";
					operations.push({
						source,
						map,
						ownedRows,
						direct,
						unknownApplicability
					});
					if (isSeq(inserted)) {
						for (const index of ownedRows) {
							const entry = this.#map(inserted.items[index]);
							if (entry === undefined) continue;
							insertions += 1;
							this.#entryNode = entry;
							this.#fields.clear();
							this.#unknownSelector = false;
							this.#readFields(entry);
						}
					} else if (direct) {
						if (insertions === 0) continue;
						const selector = this.#yaml.value(this.#yaml.field(map, "name"));
						if (selector instanceof CordisExpression || selector && this.#field("name") instanceof CordisExpression) {
							this.#unknownSelector = true;
							continue;
						}
						if (selector && selector !== this.#field("name")) continue;
						this.#readFields(map, new Set(["id", "name"]));
					}
				}
				this.#operations = operations;
				this.#insertions = insertions;
				this.#editabilityError = this.#unknownStructure ? new ConfigurationError("Expression-backed Cordis patches have unknown structure; use literal patches before setup") : malformedStructure ? new ConfigurationError("Malformed Cordis patches cannot be edited safely; use mapping entries and insert lists before setup") : operations.some((op) => op.unknownApplicability && op.ownedRows.length > 0) ? new ConfigurationError("Cordis REA insertion targets a group with unknown activity; use a direct insertion before setup") : this.#unknownSelector ? new ConfigurationError("Expression-backed Cordis name selectors have unknown applicability; use literal selectors before setup", { settings: [{
					setting: "name",
					constraint: "Use literal selectors before setup"
				}] }) : undefined;
				const config = this.#field("config");
				this.config = insertions === 0 ? undefined : isPatchRecord(config) ? config : {};
			}
			#map(node) {
				const map = this.#yaml.resolve(node);
				return isMap(map) ? map : undefined;
			}
			#id(node) {
				const id = this.#yaml.value(this.#yaml.field(this.#map(node), "id"));
				if (id instanceof CordisExpression) throw new ConfigurationError("Expression-backed Cordis IDs have unknown ownership; use literal IDs before changing registrations");
				return id;
			}
			#field(key) {
				return this.#yaml.value(this.#fields.get(key));
			}
			#readFields(map, omitted = new Set()) {
				for (const pair of map.items) {
					const key = this.#yaml.value(pair.key);
					if (typeof key === "string" && !omitted.has(key)) this.#fields.set(key, pair.value);
				}
			}
			get carriesEntry() {
				return this.#operations.some((op) => op.direct || op.ownedRows.length > 0);
			}
			get hasUnknownStructure() {
				return this.#unknownStructure;
			}
			get editabilityError() {
				return this.#editabilityError;
			}
			get ready() {
				const disabled = this.#field("disabled");
				return this.#insertions === 1 && this.#editabilityError === undefined && this.#field("name") === "@deepseek-ai/dsh-mcp-client" && (disabled === undefined || disabled === false);
			}
			/** Validate literals without treating expression source as an environment value. */
			environment(overrides, validation, platform) {
				const config = this.#field("config");
				if (config instanceof CordisExpression) return err(new ConfigurationError("Expression-backed Cordis config cannot be safely edited", { settings: [{
					setting: "config",
					constraint: "Use a literal mapping to preserve caller fields during setup"
				}] }));
				if (config !== undefined && !isPatchRecord(config)) return err(new ConfigurationError("Cordis REA config must be a mapping", { settings: [{
					setting: "config",
					constraint: "Use a literal mapping before setup"
				}] }));
				const raw = this.config?.env;
				if (raw !== undefined && !isPatchRecord(raw)) return err(new ConfigurationError("Cordis server environment must be a mapping"));
				const literals = Object.create(null);
				const unresolvedSettings = new Set();
				for (const [key, value] of Object.entries(mergeEnvironmentOverrides(raw ?? {}, overrides, platform))) {
					if (value instanceof CordisExpression) {
						unresolvedSettings.add(key);
						continue;
					}
					if (typeof value !== "string") return err(new ConfigurationError("Invalid Cordis server environment", { settings: [{
						setting: `env.${key}`,
						constraint: "Environment values must be strings or Cordis expressions"
					}] }));
					literals[key] = value;
				}
				const validated = validateRegistrationEnvironment(literals, unresolvedSettings, validation, platform);
				return validated.ok ? ok({
					values: literals,
					...validated.value
				}) : validated;
			}
			desired(command, overrides, platform, toolCallTimeoutMs) {
				if (this.#editabilityError !== undefined) return err(this.#editabilityError);
				const environment = this.environment(overrides, "effective", platform);
				if (!environment.ok) return environment;
				const env = mergeEnvironmentOverrides(isPatchRecord(this.config?.env) ? this.config.env : {}, overrides, platform);
				const desired = {
					...this.config,
					...dshClientRegistrationEntry(command)
				};
				delete desired.env;
				if (Object.keys(env).length > 0) desired.env = env;
				if (toolCallTimeoutMs !== undefined && dshToolCallTimeout(this.config?.toolCallTimeoutMs) === undefined) desired.toolCallTimeoutMs = toolCallTimeoutMs;
				return ok(desired);
			}
			/** Plan every replacement from source snapshots before changing an output tree. */
			serialize(edit) {
				const desired = edit?.desired;
				if (this.#editabilityError !== undefined && (this.#unknownStructure || desired !== undefined)) throw this.#editabilityError;
				const root = this.#yaml.document.contents;
				if (!isSeq(root)) throw new ConfigurationError("Cordis patches must be a list");
				const replacements = new Map();
				const invalidated = new Set(this.#operations.flatMap((op) => op.direct || op.ownedRows.length > 0 ? this.#yaml.anchors(op.source) : []));
				let carried = false;
				for (const op of this.#operations) {
					if (op.direct) {
						replacements.set(op.source, undefined);
						continue;
					}
					if (op.ownedRows.length === 0) continue;
					const copy = this.#yaml.detach(op.map, invalidated);
					if (!isMap(copy)) throw new ConfigurationError("Cordis operation is not a mapping");
					const inserted = this.#yaml.detach(this.#yaml.resolve(this.#yaml.field(op.map, "insert")), invalidated);
					if (!isSeq(inserted)) throw new ConfigurationError("Cordis insertion is not a list");
					copy.set("insert", inserted);
					const owned = new Set(op.ownedRows);
					inserted.items = inserted.items.flatMap((entry, index) => {
						if (!owned.has(index)) return [entry];
						if (carried || edit === undefined) return [];
						carried = true;
						return [this.#entry(edit.desired, edit.platform, invalidated)];
					});
					if (inserted.items.length === 0) copy.delete("insert");
					const kept = inserted.items.length > 0 || this.#id(op.map) !== "rea-mcp" && copy.items.some((pair) => !SELECTOR_KEYS.has(this.#yaml.value(pair.key)));
					replacements.set(op.source, kept ? copy : undefined);
				}
				const output = this.#yaml.document.clone();
				const outputRoot = output.contents;
				if (!isSeq(outputRoot)) throw new ConfigurationError("Cordis patches must be a list");
				outputRoot.items = root.items.flatMap((source) => {
					const copy = replacements.has(source) ? replacements.get(source) : this.#yaml.copy(source, invalidated);
					return copy === undefined ? [] : [copy];
				});
				if (!carried && desired !== undefined) outputRoot.items.push(output.createNode({ insert: [{
					id: DSH_ENTRY_ID,
					name: DSH_CLIENT_PACKAGE,
					config: desired
				}] }));
				return output.toString({ lineWidth: 0 });
			}
			#entry(desired, platform, invalidated) {
				const entry = this.#yaml.detach(this.#entryNode, invalidated);
				if (!isMap(entry)) throw new ConfigurationError("Cordis entry is not a mapping");
				this.#yaml.setValue(entry, "id", DSH_ENTRY_ID);
				this.#yaml.setValue(entry, "name", DSH_CLIENT_PACKAGE);
				entry.delete("disabled");
				for (const [key, value] of this.#fields) {
					if ([
						"id",
						"name",
						"config",
						"disabled"
					].includes(key)) continue;
					entry.set(key, this.#yaml.detach(value, invalidated));
				}
				const sourceConfig = this.#map(this.#fields.get("config"));
				const config = sourceConfig === undefined ? this.#yaml.document.createNode({}) : this.#yaml.detach(sourceConfig, invalidated);
				if (!isMap(config)) throw new ConfigurationError("Cordis registration config is not a mapping");
				for (const key of LAUNCHER_KEYS) this.#yaml.setValue(config, key, desired[key]);
				if (typeof desired.toolCallTimeoutMs === "number") this.#yaml.setValue(config, "toolCallTimeoutMs", desired.toolCallTimeoutMs);
				const env = this.#map(this.#yaml.field(sourceConfig, "env"));
				const desiredEnv = desired.env;
				if (isPatchRecord(desiredEnv)) {
					const nextEnv = env === undefined ? this.#yaml.document.createNode({}) : this.#yaml.detach(env, invalidated);
					if (!isMap(nextEnv)) throw new ConfigurationError("Cordis environment is not a mapping");
					for (const pair of [...nextEnv.items]) {
						const key = this.#yaml.key(pair.key);
						if (Object.hasOwn(desiredEnv, key)) {
							this.#yaml.renameKey(nextEnv, pair, key);
							continue;
						}
						const alias = platform === "win32" ? Object.keys(desiredEnv).find((name) => name.toUpperCase() === key.toUpperCase()) : undefined;
						if (alias === undefined) nextEnv.delete(pair.key);
						else this.#yaml.renameKey(nextEnv, pair, alias);
					}
					for (const [key, value] of Object.entries(desiredEnv)) {
						this.#yaml.setValue(nextEnv, key, value);
					}
					config.set("env", nextEnv);
				} else config.delete("env");
				entry.set("config", config);
				return entry;
			}
		};
		DshCordisEdit = class {
			source;
			registration;
			constructor(source, registration) {
				this.source = source;
				this.registration = registration;
			}
		};
		dshDocument = (document) => {
			if (!(document.cordis instanceof DshCordisDocument)) throw new ConfigurationError("Missing Cordis document owner");
			return document.cordis;
		};
		parseDshCordisDocument = (text) => {
			const source = new DshCordisDocument(text);
			return {
				document: { cordis: source },
				servers: source.config === undefined ? {} : { rea: source.config },
				serversPath: [],
				dialect: "dsh",
				environmentKey: "env",
				legacyServers: {}
			};
		};
		editDshDocument = (parsed, registration) => ({ cordis: new DshCordisEdit(dshDocument(parsed.document), registration) });
		serializeDshDocument = (document) => {
			if (!(document.cordis instanceof DshCordisEdit)) throw new ConfigurationError("Missing Cordis edit plan");
			return document.cordis.source.serialize(document.cordis.registration);
		};
		dshToolCallTimeout = (value) => {
			if (value instanceof CordisExpression) return null;
			return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;
		};
		dshClientRegistrationEntry = (command, environment = {}) => {
			const [executable = "rea", ...args] = command;
			return {
				serverName: "rea",
				transport: "stdio",
				command: executable,
				args,
				...Object.keys(environment).length === 0 ? {} : { env: { ...environment } }
			};
		};
	})))();
}

//#endregion
//#region dist/application/HermesConfigurationYaml.js
var SOURCE_SCALAR_TAGS, timestampTag, timestampSource, hermesTimestampImplicit, floorDivide, civilDay, parseHermesTimestamp, numericValue, createHermesYamlOptions, stringifyHermesConfigurationYaml, isEmptyYamlRoot, parseHermesDocument, projectedYamlValue, projectedYamlPathExists, inheritedRegistrationRemovalError, inheritedYamlValue, inheritedYamlMapOverride, parseHermesConfigurationYaml, editHermesConfigurationYaml;
function init_HermesConfigurationYaml() {
	return (init_HermesConfigurationYaml = __esmMin((() => {
		init_configurationErrors();
		init_YamlConfigurationAliases();
		init_YamlConfigurationSource();
		SOURCE_SCALAR_TAGS = new Set([
			"tag:yaml.org,2002:int",
			"tag:yaml.org,2002:float",
			"tag:yaml.org,2002:timestamp"
		]);
		timestampTag = new Schema({ schema: "yaml-1.1" }).tags.find((tag) => tag.tag === "tag:yaml.org,2002:timestamp" && tag.collection === undefined);
		if (timestampTag === undefined) throw new Error("The YAML 1.1 schema must provide its timestamp tag");
		timestampSource = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:(?:[Tt]|[ \t]+)(\d{1,2}):(\d{2}):(\d{2})(?:\.([0-9]*))?(?:[ \t]*(Z|([-+])(\d{1,2})(?::(\d{2}))?))?)?$/;
		hermesTimestampImplicit = /^(?:\d{4}-\d{2}-\d{2}|\d{4}-\d{1,2}-\d{1,2}(?:[Tt]|[ \t]+)\d{1,2}:\d{2}:\d{2}(?:\.[0-9]*)?(?:[ \t]*(?:Z|[-+]\d{1,2}(?::\d{2})?))?)$/;
		floorDivide = (value, divisor) => Math.floor(value / divisor);
		civilDay = (year, month, day) => {
			const adjustedYear = year - (month <= 2 ? 1 : 0);
			const era = floorDivide(adjustedYear, 400);
			const yearOfEra = adjustedYear - era * 400;
			const adjustedMonth = month + (month > 2 ? -3 : 9);
			const dayOfYear = floorDivide(153 * adjustedMonth + 2, 5) + day - 1;
			const dayOfEra = yearOfEra * 365 + floorDivide(yearOfEra, 4) - floorDivide(yearOfEra, 100) + dayOfYear;
			return era * 146097 + dayOfEra - 719468;
		};
		parseHermesTimestamp = (source) => {
			const match = timestampSource.exec(source);
			if (match === null) return undefined;
			const [, yearText, monthText, dayText, hourText, minuteText, secondText, fraction, zone, sign, zoneHourText, zoneMinuteText] = match;
			if (yearText === undefined || monthText === undefined || dayText === undefined) return undefined;
			const year = Number(yearText);
			const month = Number(monthText);
			const dayOfMonth = Number(dayText);
			if (year < 1 || year > 9999 || month < 1 || month > 12) return undefined;
			const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
			const monthDays = [
				31,
				leapYear ? 29 : 28,
				31,
				30,
				31,
				30,
				31,
				31,
				30,
				31,
				30,
				31
			];
			if (dayOfMonth < 1 || dayOfMonth > (monthDays[month - 1] ?? 0)) return undefined;
			const date = `${yearText}-${monthText.padStart(2, "0")}-${dayText.padStart(2, "0")}`;
			const day = civilDay(year, month, dayOfMonth);
			if (hourText === undefined) {
				const micros = BigInt(day) * 86400000000n;
				return {
					key: `date:${date}`,
					value: new Date(Number(micros / 1000n))
				};
			}
			const hour = Number(hourText);
			const minute = Number(minuteText);
			const second = Number(secondText);
			if (hour > 23 || minute > 59 || second > 59) return undefined;
			const zoneHour = Number(zoneHourText ?? 0);
			const zoneMinute = Number(zoneMinuteText ?? 0);
			if (zoneHour > 23 || zoneMinute > 59) return undefined;
			let microseconds = 0;
			if (fraction !== undefined && fraction.length > 0) {
				microseconds = Number((fraction.slice(0, 6) + "000000").slice(0, 6));
				if (fraction.length > 6 && Number(fraction[6]) > 4) microseconds += 1;
			}
			const wholeSeconds = hour * 3600 + minute * 60 + second;
			if (year === 9999 && month === 12 && dayOfMonth === 31 && wholeSeconds === 86399 && microseconds === 1e6) return undefined;
			let micros = BigInt(day) * 86400000000n + BigInt(wholeSeconds) * 1000000n + BigInt(microseconds);
			if (zone !== undefined && zone !== "Z") {
				const offset = (zoneHour * 60 + zoneMinute) * (sign === "+" ? 1 : -1);
				micros -= BigInt(offset) * 60000000n;
			}
			return {
				key: zone === undefined ? `datetime-local:${micros}` : `datetime-utc:${micros}`,
				value: new Date(Number(micros / 1000n - (micros % 1000n < 0n ? 1n : 0n)))
			};
		};
		numericValue = (value) => {
			if (typeof value === "boolean") return value ? 1n : 0n;
			if (typeof value === "bigint" || typeof value === "number") return value;
			return undefined;
		};
		createHermesYamlOptions = () => {
			const timestamps = new Map();
			const timestampFacts = (source) => {
				if (timestamps.has(source)) return timestamps.get(source);
				const facts = parseHermesTimestamp(source);
				timestamps.set(source, facts);
				return facts;
			};
			const hermesTimestampTag = {
				...timestampTag,
				test: hermesTimestampImplicit,
				resolve: (source) => {
					const facts = timestampFacts(source);
					if (facts === undefined) throw new Error(`Invalid Hermes YAML timestamp: ${source}`);
					return facts.value;
				}
			};
			const keyFacts = new WeakMap();
			const hermesKey = (node) => {
				const cached = keyFacts.get(node);
				if (cached !== undefined) return cached;
				if (!isScalar(node)) return {
					kind: "other",
					value: node
				};
				const numeric = numericValue(node.value);
				const key = numeric !== undefined ? {
					kind: "numeric",
					value: numeric
				} : node.value instanceof Date ? {
					kind: "timestamp",
					value: timestampFacts(node.source ?? "")?.key ?? `invalid:${node.source ?? ""}`
				} : {
					kind: "other",
					value: node.value
				};
				keyFacts.set(node, key);
				return key;
			};
			/** Python dict key equality is Hermes' duplicate-key behavior (bool is int). */
			const hermesKeysEqual = (leftNode, rightNode) => {
				const left = hermesKey(leftNode);
				const right = hermesKey(rightNode);
				if (left.kind !== right.kind) return false;
				if (left.kind === "numeric" && right.kind === "numeric") return yamlNumericValuesEqual(left.value, right.value);
				return left.value === right.value;
			};
			return {
				version: "1.1",
				intAsBigInt: true,
				customTags: (tags) => {
					const hasTimestamp = tags.some((tag) => typeof tag !== "string" && tag.tag === timestampTag.tag);
					const withHermesTimestamp = hasTimestamp ? tags.map((tag) => typeof tag !== "string" && tag.tag === timestampTag.tag ? hermesTimestampTag : tag) : [...tags, hermesTimestampTag];
					return withHermesTimestamp.map((tag) => typeof tag !== "string" && SOURCE_SCALAR_TAGS.has(tag.tag) ? retainYamlScalarSource(tag) : tag);
				},
				uniqueKeys: hermesKeysEqual
			};
		};
		stringifyHermesConfigurationYaml = (document) => new Document(document, createHermesYamlOptions()).toString({ lineWidth: 0 });
		isEmptyYamlRoot = (root) => root === null || isScalar(root) && root.value === null && root.source === "" && root.tag === undefined && root.anchor === undefined;
		parseHermesDocument = (text) => {
			const document = parseDocument(text, createHermesYamlOptions());
			const error = document.errors[0];
			if (error !== undefined) throw error;
			return document;
		};
		projectedYamlValue = (document, path) => {
			let current = document.toJS();
			for (const segment of path) {
				if (typeof current !== "object" || current === null || !Object.hasOwn(current, segment)) return "absent";
				current = current[segment];
			}
			return { value: current };
		};
		projectedYamlPathExists = (document, path) => projectedYamlValue(document, path) !== "absent";
		inheritedRegistrationRemovalError = () => new ConfigurationError("The registration is inherited from a YAML merge. Remove it at the shared source before rerunning uninstall");
		inheritedYamlValue = (document, source, name, visiting = new Set()) => {
			const node = isAlias(source) ? source.resolve(document) : source;
			if (!isMap(node) || visiting.has(node)) return undefined;
			visiting.add(node);
			try {
				const matches = node.items.filter((pair) => {
					const key = isAlias(pair.key) ? pair.key.resolve(document) : pair.key;
					return isScalar(key) && key.value === name;
				});
				if (matches.length > 1) throw new ConfigurationError(`YAML mapping contains more than one key resolving to ${JSON.stringify(name)}`);
				if (matches[0] !== undefined) return matches[0].value;
				for (const pair of node.items) {
					if (!isScalar(pair.key) || typeof pair.key.value !== "symbol" || pair.key.source !== "<<") continue;
					const merged = isAlias(pair.value) ? pair.value.resolve(document) : pair.value;
					const sources = isSeq(merged) ? merged.items : [merged];
					for (const candidate of sources) {
						const found = inheritedYamlValue(document, candidate, name, visiting);
						if (found !== undefined) return found;
					}
				}
				return undefined;
			} finally {
				visiting.delete(node);
			}
		};
		inheritedYamlMapOverride = (document, parent, name) => {
			const owner = parent.length === 1 ? document.contents : document.getIn(parent.slice(0, -1), true);
			let inherited = inheritedYamlValue(document, owner, name);
			if (isAlias(inherited)) inherited = inherited.resolve(document);
			if (!isMap(inherited)) throw new ConfigurationError(`Inherited YAML setting ${JSON.stringify(name)} is not a mapping`);
			const mergeDocument = parseHermesDocument("<<: {}\n");
			if (!isMap(mergeDocument.contents) || mergeDocument.contents.items[0] === undefined) throw new ConfigurationError("Cannot create a YAML merge key");
			const alias = document.createAlias(inherited, "rea_inherited");
			const override = new YAMLMap(document.schema);
			override.items.push(new Pair(mergeDocument.contents.items[0].key, alias));
			document.setIn(parent, override);
			if (alias.resolve(document) !== inherited) throw new ConfigurationError("The inherited YAML anchor is shadowed; edit its shared source before rerunning setup");
		};
		parseHermesConfigurationYaml = (text) => {
			const document = parseHermesDocument(text);
			return isEmptyYamlRoot(document.contents) ? {} : document.toJS({ reviver: (_key, value) => typeof value === "bigint" && Number.isSafeInteger(Number(value)) ? Number(value) : value });
		};
		editHermesConfigurationYaml = (text, path, value) => {
			const document = parseHermesDocument(text);
			const root = document.contents;
			if (isEmptyYamlRoot(root)) {
				const map = document.createNode({});
				if (isScalar(root)) map.commentBefore = [root.commentBefore, root.comment].filter((comment) => comment !== undefined).join("\n");
				document.contents = map;
			}
			for (let length = 1; length < path.length; length++) {
				const parent = resolveYamlEditPath(document, path.slice(0, length));
				const previous = document.getIn(parent, true);
				if (isAlias(previous)) {
					const copied = copyYamlAliasSource(previous, document);
					if (isMap(copied)) {
						document.setIn(parent, copied);
					}
				} else if (value !== undefined && !document.hasIn(parent)) {
					if (projectedYamlPathExists(document, path.slice(0, length))) {
						inheritedYamlMapOverride(document, parent, path[length - 1]);
						continue;
					}
					document.setIn(parent, document.createNode({}));
				}
			}
			const inheritedSourcePath = resolveYamlEditPath(document, path);
			const inheritedRegistration = document.hasIn(inheritedSourcePath) ? "absent" : projectedYamlValue(document, path);
			if (isRecord(value) && inheritedRegistration !== "absent" && typeof inheritedRegistration.value === "object" && inheritedRegistration.value !== null && Object.keys(inheritedRegistration.value).every((key) => Object.hasOwn(value, key))) inheritedYamlMapOverride(document, inheritedSourcePath, path.at(-1));
			const sourcePath = resolveYamlEditPath(document, path);
			const previous = document.getIn(sourcePath, true);
			const parent = value === undefined ? document.getIn(sourcePath.slice(0, -1), true) : undefined;
			if (value === undefined && !document.hasIn(sourcePath) && projectedYamlPathExists(document, path)) throw inheritedRegistrationRemovalError();
			const removedKey = isMap(parent) ? parent.items.find((pair) => pair.key === sourcePath.at(-1))?.key : undefined;
			const aliasValues = yamlAliasValues(previous, document);
			const retainedSources = preserveYamlAliasValues(document, [previous, removedKey]);
			if (value === undefined) {
				if (!document.deleteIn(sourcePath)) return text;
				if (projectedYamlPathExists(document, path)) throw inheritedRegistrationRemovalError();
			} else {
				document.setIn(sourcePath, isMap(previous) || isSeq(previous) ? retainYamlConfigurationSource(previous, document.createNode(value), retainedSources, document) : value);
				materializeUnresolvedYamlAliases(document, aliasValues);
			}
			return document.toString({
				lineWidth: 0,
				...document.directives?.yaml.version === "1.2" ? {
					defaultStringType: "QUOTE_DOUBLE",
					defaultKeyType: "QUOTE_DOUBLE"
				} : {}
			});
		};
	})))();
}

//#endregion
//#region dist/application/ClientConfigurationDocument.js
var clientConfigurationRecordSchema, clientConfigurationValuesEqual, normalizeConfigurationValue, clientConfigurationServersKey, isEmptyClientConfigurationText, INT64_MIN, INT64_MAX, parseClientToml, JSONC_READER, STRICT_JSON_REPAIRED_READER, STRICT_JSON_READER, CLIENT_CONFIGURATION_READERS, clientConfigurationReader, clientConfigurationSyntaxName, parseDocument$1, ClientConfigurationShapeError, requireObject, parseZcodeFallbackConfiguration, OPENCODE_V2_MCP_SETTINGS, strictJsonNeedsRewrite, fxConfigurationServersKey, parseClientConfiguration, effectiveClientServer, clientServerForEdit, withClientServers, valueAt, TOML_BASIC_ESCAPES, skipHorizontalSpace, decodeBasicEscape, parseQuotedKey, parseBareKey, parseTomlTableHeader, tomlStringModeAfter, closeMultiline, isBlankOrComment, looksLikeTomlHeader, isTomlServerTable, parseKeyPath, parseAssignment, skipWsAndComments, endOfTomlValue, endOfContainer, tomlBasicString, tomlInlineKey, tomlInlineValue, readTrivia, commasOutsideComments, hasSeparatorComma, editInlineServerTable, rebuildInlineTable, rebuildDelimitedEntries, tomlStringValue, tomlArrayWithoutString, disabledServerListEdit, disabledServerListLines, withoutTrailingLineFeeds, tomlCommentLines, upsertTomlServerSection, tomlServerEntry, grokServerListedDisabled, OMP_DISABLED_SERVERS_KEY, ompServerListedDisabled, OMP_ENABLED_SERVERS_KEY, clientServerForcedEnabled, clientServerListedDisabled, serializeGrokConfiguration, withoutEmptyServerTable, serializeCodexConfiguration, tomlTextHolds, JSON_COMMA, nextJsoncToken, isJsonMember, effectiveJsonProperty, effectiveJsonObject, NO_SHADOWED_SERVERS, JSON_STRING, JSON_EOF, hasRepeatedJsonString, shadowedJsonMembers, shadowedClientServers, applyFormattedJsonEdit, jsonChildRemovalEdits, deleteJsonMembers, jsonValueEdits, JSON_CLOSE_BRACE, JSON_CLOSE_BRACKET, JSON_LINE_COMMENT, JSON_BLOCK_COMMENT, strictJsonSyntax, editJsonMember, serializeClientConfiguration, clientServerPath, legacyClientServerPath, serializeHermesConfiguration, clientRegistrationLauncherEntry, clientRegistrationEntry, parseGeminiMcpPolicy, normalizeGeminiServerName, geminiServerPolicyBlock;
function init_ClientConfigurationDocument() {
	return (init_ClientConfigurationDocument = __esmMin((() => {
		init_GooseConfigurationYaml();
		init_DshCordisPatch();
		init_HermesConfigurationYaml();
		init_result();
		init_identity();
		init_unicodeCodePointOrder();
		clientConfigurationRecordSchema = z.custom((value) => {
			if (typeof value !== "object" || value === null) return false;
			const prototype = Object.getPrototypeOf(value);
			return prototype === null || prototype === Object.prototype;
		}).transform((value) => Object.fromEntries(Object.entries(value)));
		clientConfigurationValuesEqual = (left, right) => isDeepStrictEqual(normalizeConfigurationValue(left), normalizeConfigurationValue(right));
		normalizeConfigurationValue = (value) => {
			if (Array.isArray(value)) return value.map(normalizeConfigurationValue);
			if (typeof value !== "object" || value === null || value instanceof Date) return value;
			return Object.fromEntries(Object.entries(value).sort(([left], [right]) => compareUnicodeCodePoints(left, right)).map(([key, nested]) => [key, normalizeConfigurationValue(nested)]));
		};
		clientConfigurationServersKey = (format) => {
			switch (format) {
				case "toml":
				case "grok":
				case "hermes": return "mcp_servers";
				case "opencode":
				case "zcode":
				case "kilo": return "mcp";
				case "amp": return "amp.mcpServers";
				case "zed": return "context_servers";
				case "goose": return "extensions";
				case "vscode": return "servers";
				default: return "mcpServers";
			}
		};
		isEmptyClientConfigurationText = (text) => text.replace(/^\uFEFF/, "").trim() === "";
		INT64_MIN = -(2n ** 63n);
		INT64_MAX = 2n ** 63n - 1n;
		parseClientToml = (text) => {
			const parsed = parse(text, { integersAsBigInt: "asNeeded" });
			const pending = [parsed];
			for (let value = pending.pop(); value !== undefined; value = pending.pop()) {
				if (typeof value === "bigint") {
					if (value < INT64_MIN || value > INT64_MAX) throw new SyntaxError(`Invalid TOML document: integer ${String(value)} is outside the signed 64-bit range`);
				} else if (typeof value === "object" && value !== null && !(value instanceof Date)) for (const nested of Object.values(value)) pending.push(nested);
			}
			return parsed;
		};
		JSONC_READER = {
			syntax: "json",
			native: "jsonc",
			bom: "accept",
			emptyFile: "no-settings"
		};
		STRICT_JSON_REPAIRED_READER = {
			syntax: "json",
			native: "json",
			repairsJsonc: true,
			bom: "accept",
			emptyFile: "no-settings"
		};
		STRICT_JSON_READER = {
			syntax: "json",
			native: "json",
			bom: "reject",
			emptyFile: "no-settings"
		};
		CLIENT_CONFIGURATION_READERS = {
			json: JSONC_READER,
			vscode: JSONC_READER,
			opencode: JSONC_READER,
			commandcode: JSONC_READER,
			omp: JSONC_READER,
			amp: JSONC_READER,
			zed: JSONC_READER,
			kilo: JSONC_READER,
			copilot_cli: STRICT_JSON_REPAIRED_READER,
			copilot_cli_project: STRICT_JSON_REPAIRED_READER,
			fx: STRICT_JSON_REPAIRED_READER,
			claude_code: {
				...STRICT_JSON_READER,
				bom: "accept"
			},
			kimi: STRICT_JSON_READER,
			lm_studio: STRICT_JSON_READER,
			zcode: STRICT_JSON_READER,
			pi: {
				...STRICT_JSON_READER,
				emptyFile: "reject"
			},
			zcode_fallback: {
				...STRICT_JSON_READER,
				emptyFile: "reject"
			},
			toml: { syntax: "toml" },
			grok: { syntax: "toml" },
			goose: {
				syntax: "yaml",
				parse: parseGooseConfigurationYaml
			},
			hermes: {
				syntax: "yaml",
				parse: parseHermesConfigurationYaml
			},
			dsh: { syntax: "yaml" }
		};
		clientConfigurationReader = (format) => CLIENT_CONFIGURATION_READERS[format];
		clientConfigurationSyntaxName = (format) => {
			const reader = clientConfigurationReader(format);
			if (reader.syntax === "toml") return "TOML";
			if (reader.syntax === "yaml") return "YAML";
			return reader.native === "json" && reader.repairsJsonc !== true ? "JSON" : "JSONC";
		};
		parseDocument$1 = (text, format, root = "The configuration root") => {
			const reader = clientConfigurationReader(format);
			if (reader.syntax === "toml") return requireObject(parseClientToml(text), root);
			if ((reader.syntax === "yaml" || reader.emptyFile === "no-settings") && isEmptyClientConfigurationText(text)) return {};
			if (reader.syntax === "yaml") {
				if (reader.parse === undefined) throw new TypeError(`${format} configuration has a dedicated parser`);
				return requireObject(reader.parse(text), root);
			}
			if (reader.native === "json" && reader.repairsJsonc !== true) return requireObject(JSON.parse(reader.bom === "accept" ? text.replace(/^\uFEFF/, "") : text), root);
			const errors = [];
			const jsonText = text.startsWith("﻿") ? ` ${text.slice(1)}` : text;
			const tree = parseTree(jsonText, errors, { allowTrailingComma: true });
			const firstError = errors[0];
			if (firstError !== undefined) throw new SyntaxError(`Invalid JSON/JSONC at offset ${firstError.offset}: ${printParseErrorCode(firstError.error)}`);
			return requireObject(tree === undefined ? undefined : getNodeValue(tree), root);
		};
		ClientConfigurationShapeError = class extends TypeError {};
		requireObject = (value, description) => {
			const parsed = clientConfigurationRecordSchema.safeParse(value);
			if (parsed.success) return parsed.data;
			throw new ClientConfigurationShapeError(`${description} must be an object`, { cause: parsed.error });
		};
		parseZcodeFallbackConfiguration = (text) => {
			const document = parseDocument$1(text, "zcode_fallback", "ZCode fallback root");
			return {
				document,
				servers: document.mcpServers === undefined ? {} : requireObject(document.mcpServers, "ZCode fallback mcpServers"),
				serversPath: ["mcpServers"],
				dialect: "zcode_fallback",
				environmentKey: "env",
				legacyServers: {}
			};
		};
		OPENCODE_V2_MCP_SETTINGS = new Set(["servers", "timeout"]);
		strictJsonNeedsRewrite = (text) => {
			try {
				JSON.parse(text);
				return false;
			} catch {
				return true;
			}
		};
		fxConfigurationServersKey = (document) => {
			const legacy = Object.hasOwn(document, "mcp");
			if (legacy && Object.hasOwn(document, "mcpServers")) throw new ClientConfigurationShapeError("Fx profile contains both \"mcp\" and \"mcpServers\". Consolidate these into one server table before registering so existing servers remain visible.");
			return legacy ? "mcp" : "mcpServers";
		};
		parseClientConfiguration = (text, format) => {
			if (format === undefined || format === "unsupported") throw new TypeError("client does not have a supported MCP config format");
			if (format === "zcode_fallback") return parseZcodeFallbackConfiguration(text);
			if (format === "dsh") return parseDshCordisDocument(text);
			const document = parseDocument$1(text, format);
			const reader = clientConfigurationReader(format);
			const requiresRewrite = reader.syntax === "json" && reader.repairsJsonc === true && strictJsonNeedsRewrite(text) ? true : undefined;
			if (format === "copilot_cli_project" && !Object.hasOwn(document, "mcpServers")) {
				const serverLike = (value) => {
					const entry = clientConfigurationRecordSchema.safeParse(value);
					return entry.success && [
						"command",
						"url",
						"type"
					].some((key) => typeof entry.data[key] === "string");
				};
				const wrapper = clientConfigurationRecordSchema.safeParse(document.servers);
				if (wrapper.success && !serverLike(wrapper.data) && Object.values(wrapper.data).some(serverLike)) throw new ClientConfigurationShapeError("Copilot CLI reads mcpServers or a bare server map, not the VS Code \"servers\" wrapper. Select --agent vscode for that document.");
				const entries = Object.values(document);
				if (entries.length > 0 && entries.every(serverLike)) return {
					document,
					...requiresRewrite === undefined ? {} : { requiresRewrite },
					servers: document,
					serversPath: [],
					dialect: format,
					environmentKey: "env",
					legacyServers: {}
				};
			}
			const environmentKey = format === "opencode" || format === "fx" || format === "kilo" ? "environment" : format === "goose" ? "envs" : "env";
			const serversKey = format === "fx" ? fxConfigurationServersKey(document) : clientConfigurationServersKey(format);
			const value = document[serversKey];
			const servers = value === undefined ? {} : requireObject(value, `"${serversKey}"`);
			if (format === "zcode") {
				const nested = servers.servers;
				return {
					document,
					servers: nested === undefined ? {} : requireObject(nested, `"${serversKey}.servers"`),
					serversPath: [serversKey, "servers"],
					dialect: format,
					environmentKey,
					legacyServers: {}
				};
			}
			const native = servers.servers;
			if (format !== "opencode" || native === undefined || typeof native === "object" && native !== null && "type" in native && typeof native.type === "string") return {
				document,
				...requiresRewrite === undefined ? {} : { requiresRewrite },
				servers,
				serversPath: [serversKey],
				dialect: format,
				environmentKey,
				legacyServers: {}
			};
			return {
				document,
				servers: requireObject(native, `"${serversKey}.servers"`),
				serversPath: [serversKey, "servers"],
				dialect: "opencode_v2",
				environmentKey,
				legacyServers: Object.fromEntries(Object.entries(servers).filter(([name]) => !OPENCODE_V2_MCP_SETTINGS.has(name)))
			};
		};
		effectiveClientServer = (parsed, name) => {
			const native = Object.hasOwn(parsed.servers, name);
			const value = native ? parsed.servers[name] : Object.hasOwn(parsed.legacyServers, name) ? parsed.legacyServers[name] : undefined;
			if (parsed.dialect !== "opencode" && parsed.dialect !== "opencode_v2" || typeof value !== "object" || value === null || Array.isArray(value)) return value;
			const { enabled, ...registration } = value;
			return (parsed.dialect === "opencode" || !native) && typeof enabled === "boolean" ? {
				...registration,
				disabled: !enabled
			} : registration;
		};
		clientServerForEdit = (parsed, name) => Object.hasOwn(parsed.servers, name) ? parsed.servers[name] : parsed.dialect === "opencode_v2" ? effectiveClientServer(parsed, name) : undefined;
		withClientServers = (parsed, servers, platform, removeLegacy) => {
			if (parsed.dialect === "dsh") return Object.hasOwn(servers, PRODUCT_IDENTITY.mcpServerKey) ? editDshDocument(parsed, {
				desired: clientConfigurationRecordSchema.parse(servers[PRODUCT_IDENTITY.mcpServerKey]),
				platform
			}) : editDshDocument(parsed);
			if (parsed.serversPath.length === 0) return { ...servers };
			const [key = "", nested] = parsed.serversPath;
			if (nested === undefined) return {
				...parsed.document,
				[key]: servers
			};
			const outerValue = parsed.document[key];
			const outer = outerValue === undefined ? {} : clientConfigurationRecordSchema.parse(outerValue);
			if (parsed.dialect === "opencode_v2" && removeLegacy !== undefined && !OPENCODE_V2_MCP_SETTINGS.has(removeLegacy)) delete outer[removeLegacy];
			return {
				...parsed.document,
				[key]: {
					...outer,
					[nested]: servers
				}
			};
		};
		valueAt = (document, path) => {
			let current = document;
			for (const key of path) {
				const object = clientConfigurationRecordSchema.safeParse(current);
				if (!object.success || !Object.hasOwn(object.data, key)) return undefined;
				current = object.data[key];
			}
			return current;
		};
		TOML_BASIC_ESCAPES = {
			b: "\b",
			t: "	",
			n: "\n",
			f: "\f",
			r: "\r",
			e: "\x1B",
			"\"": "\"",
			"\\": "\\"
		};
		skipHorizontalSpace = (line, index) => {
			let next = index;
			while (line[next] === " " || line[next] === "	") next += 1;
			return next;
		};
		decodeBasicEscape = (line, slash) => {
			const escape = line[slash + 1];
			if (escape === undefined) return undefined;
			const simple = TOML_BASIC_ESCAPES[escape];
			if (simple !== undefined) return {
				value: simple,
				next: slash + 2
			};
			if (escape === "x") {
				const hex = line.slice(slash + 2, slash + 4);
				if (!/^[0-9A-Fa-f]{2}$/u.test(hex)) return undefined;
				return {
					value: String.fromCodePoint(Number.parseInt(hex, 16)),
					next: slash + 4
				};
			}
			if (escape !== "u" && escape !== "U") return undefined;
			const length = escape === "u" ? 4 : 8;
			const hex = line.slice(slash + 2, slash + 2 + length);
			if (!new RegExp(`^[0-9A-Fa-f]{${String(length)}}$`, "u").test(hex)) return undefined;
			const code = Number.parseInt(hex, 16);
			if (code > 1114111 || code >= 55296 && code <= 57343) return undefined;
			return {
				value: String.fromCodePoint(code),
				next: slash + 2 + length
			};
		};
		parseQuotedKey = (line, start) => {
			const quote = line[start];
			if (quote !== "\"" && quote !== "'" || line.startsWith(quote === "\"" ? "\"\"\"" : "'''", start)) return undefined;
			if (quote === "'") {
				const end = line.indexOf("'", start + 1);
				if (end < 0 || line.slice(start + 1, end).includes("\n")) return undefined;
				return {
					value: line.slice(start + 1, end),
					next: end + 1
				};
			}
			let value = "";
			let index = start + 1;
			while (index < line.length) {
				const char = line[index];
				if (char === "\n" || char === "\r") return undefined;
				if (char === "\"") return {
					value,
					next: index + 1
				};
				if (char !== "\\") {
					value += char ?? "";
					index += 1;
					continue;
				}
				const decoded = decodeBasicEscape(line, index);
				if (decoded === undefined) return undefined;
				value += decoded.value;
				index = decoded.next;
			}
			return undefined;
		};
		parseBareKey = (line, start) => {
			let index = start;
			while (/[A-Za-z0-9_-]/u.test(line[index] ?? "")) index += 1;
			if (index === start) return undefined;
			return {
				value: line.slice(start, index),
				next: index
			};
		};
		parseTomlTableHeader = (line) => {
			let index = skipHorizontalSpace(line, 0);
			const array = line.startsWith("[[", index);
			if (!array && line[index] !== "[") return undefined;
			index += array ? 2 : 1;
			const path = [];
			for (;;) {
				index = skipHorizontalSpace(line, index);
				const key = line[index] === "\"" || line[index] === "'" ? parseQuotedKey(line, index) : parseBareKey(line, index);
				if (key === undefined) return undefined;
				path.push(key.value);
				index = skipHorizontalSpace(line, key.next);
				if (line[index] !== ".") break;
				index += 1;
			}
			const close = array ? "]]" : "]";
			if (!line.startsWith(close, index)) return undefined;
			index = skipHorizontalSpace(line, index + close.length);
			if (index < line.length && line[index] !== "#") return undefined;
			return { path };
		};
		tomlStringModeAfter = (line, mode, start = 0) => {
			if (mode === "ml-basic" || mode === "ml-literal") {
				const delimiter = mode === "ml-basic" ? "\"\"\"" : "'''";
				const closed = closeMultiline(line, start, delimiter, mode === "ml-basic");
				if (closed === undefined) return mode;
				return tomlStringModeAfter(line, "none", closed);
			}
			let index = start;
			while (index < line.length) {
				if (line[index] === "#") return "none";
				if (line.startsWith("\"\"\"", index)) {
					const closed = closeMultiline(line, index + 3, "\"\"\"", true);
					if (closed === undefined) return "ml-basic";
					index = closed;
					continue;
				}
				if (line.startsWith("'''", index)) {
					const closed = closeMultiline(line, index + 3, "'''", false);
					if (closed === undefined) return "ml-literal";
					index = closed;
					continue;
				}
				const quote = line[index];
				if (quote === "\"" || quote === "'") {
					const quoted = parseQuotedKey(line, index);
					if (quoted === undefined) return "none";
					index = quoted.next;
					continue;
				}
				index += 1;
			}
			return "none";
		};
		closeMultiline = (line, start, delimiter, escapes) => {
			let index = start;
			while (index < line.length) {
				if (escapes && line[index] === "\\") {
					if (line[index + 1] === undefined) return undefined;
					index += 2;
					continue;
				}
				if (line.startsWith(delimiter, index)) {
					let end = index + delimiter.length;
					const quote = delimiter[0];
					let extra = 0;
					while (extra < 2 && line[end] === quote) {
						extra += 1;
						end += 1;
					}
					return end;
				}
				index += 1;
			}
			return undefined;
		};
		isBlankOrComment = (line) => {
			const trimmed = line.trimStart();
			return trimmed === "" || trimmed.startsWith("#");
		};
		looksLikeTomlHeader = (line) => line.trimStart().startsWith("[");
		isTomlServerTable = (path, serverKey) => path[0] === "mcp_servers" && path[1] === serverKey;
		parseKeyPath = (text, start) => {
			const segments = [];
			let index = start;
			for (;;) {
				index = skipHorizontalSpace(text, index);
				const current = text[index];
				if (current === undefined || current === "\n" || current === "\r") return undefined;
				const key = current === "\"" || current === "'" ? parseQuotedKey(text, index) : parseBareKey(text, index);
				if (key === undefined) return undefined;
				segments.push(key.value);
				index = skipHorizontalSpace(text, key.next);
				if (text[index] !== ".") return {
					segments,
					next: index
				};
				index += 1;
			}
		};
		parseAssignment = (line) => {
			const key = parseKeyPath(line, 0);
			if (key === undefined) return undefined;
			const equals = skipHorizontalSpace(line, key.next);
			if (line[equals] !== "=") return undefined;
			return {
				segments: key.segments,
				equals
			};
		};
		skipWsAndComments = (text, start) => {
			let index = start;
			while (index < text.length) {
				const char = text[index];
				if (char === " " || char === "	" || char === "\n" || char === "\r") {
					index += 1;
					continue;
				}
				if (char === "#") {
					while (index < text.length && text[index] !== "\n") index += 1;
					continue;
				}
				return index;
			}
			return index;
		};
		endOfTomlValue = (text, start) => {
			const index = skipWsAndComments(text, start);
			if (index >= text.length) return index;
			if (text.startsWith("\"\"\"", index)) {
				const closed = closeMultiline(text, index + 3, "\"\"\"", true);
				return closed ?? text.length;
			}
			if (text.startsWith("'''", index)) {
				const closed = closeMultiline(text, index + 3, "'''", false);
				return closed ?? text.length;
			}
			const quote = text[index];
			if (quote === "\"" || quote === "'") {
				const quoted = parseQuotedKey(text, index);
				return quoted === undefined ? text.length : quoted.next;
			}
			if (quote === "{" || quote === "[") return endOfContainer(text, index);
			let cursor = index;
			while (cursor < text.length) {
				const char = text[cursor];
				if (char === "\n" || char === "#" || char === "," || char === "}" || char === "]") break;
				cursor += 1;
			}
			return cursor;
		};
		endOfContainer = (text, open) => {
			const closers = [text[open] === "{" ? "}" : "]"];
			let index = open + 1;
			while (index < text.length && closers.length > 0) {
				if (text.startsWith("\"\"\"", index)) {
					const closed = closeMultiline(text, index + 3, "\"\"\"", true);
					if (closed === undefined) return text.length;
					index = closed;
					continue;
				}
				if (text.startsWith("'''", index)) {
					const closed = closeMultiline(text, index + 3, "'''", false);
					if (closed === undefined) return text.length;
					index = closed;
					continue;
				}
				const quote = text[index];
				if (quote === "\"" || quote === "'") {
					const quoted = parseQuotedKey(text, index);
					if (quoted === undefined) return text.length;
					index = quoted.next;
					continue;
				}
				if (quote === "#") {
					while (index < text.length && text[index] !== "\n") index += 1;
					continue;
				}
				if (quote === "{" || quote === "[") {
					closers.push(quote === "{" ? "}" : "]");
					index += 1;
					continue;
				}
				if (quote === closers[closers.length - 1]) {
					closers.pop();
					index += 1;
					continue;
				}
				index += 1;
			}
			return index;
		};
		tomlBasicString = (value) => JSON.stringify(value).replaceAll("", "\\u007f");
		tomlInlineKey = (key) => /^[A-Za-z0-9_-]+$/u.test(key) ? key : tomlBasicString(key);
		tomlInlineValue = (value) => {
			if (typeof value === "string") return tomlBasicString(value);
			if (typeof value === "boolean") return value ? "true" : "false";
			if (typeof value === "number") {
				if (Number.isNaN(value)) return "nan";
				if (value === Infinity) return "inf";
				if (value === -Infinity) return "-inf";
				if (Object.is(value, -0)) return "-0.0";
				return Number.isInteger(value) && !Number.isSafeInteger(value) ? value.toFixed(1) : String(value);
			}
			if (value instanceof Date) return value.toISOString();
			if (typeof value === "bigint") return String(value);
			if (Array.isArray(value)) return `[${value.map((item) => tomlInlineValue(item)).join(", ")}]`;
			if (typeof value === "object" && value !== null) {
				const body = Object.entries(value).map(([key, nested]) => `${tomlInlineKey(key)} = ${tomlInlineValue(nested)}`).join(", ");
				return `{ ${body} }`;
			}
			throw new TypeError("Unsupported TOML inline value");
		};
		readTrivia = (text, start, limit) => {
			let index = start;
			while (index < limit) {
				const char = text[index];
				if (char === " " || char === "	" || char === "\n" || char === "\r" || char === ",") {
					index += 1;
					continue;
				}
				if (char === "#") {
					while (index < limit && text[index] !== "\n") index += 1;
					continue;
				}
				break;
			}
			return {
				text: text.slice(start, index),
				next: index
			};
		};
		commasOutsideComments = (trivia) => trivia.split("\n").map((part) => {
			const comment = part.indexOf("#");
			if (comment < 0) return part.replaceAll(",", "");
			return `${part.slice(0, comment).replaceAll(",", "")}${part.slice(comment)}`;
		}).join("\n");
		hasSeparatorComma = (trivia) => trivia.split("\n").some((part) => {
			const comment = part.indexOf("#");
			const code = comment < 0 ? part : part.slice(0, comment);
			return code.includes(",");
		});
		editInlineServerTable = (table, serverKey, entry) => {
			if (!table.startsWith("{")) return undefined;
			const end = endOfContainer(table, 0);
			if (table[end - 1] !== "}") return undefined;
			const pairs = [];
			const comments = [];
			let index = 1;
			let trailing = "";
			while (index < end - 1) {
				const trivia = readTrivia(table, index, end - 1);
				if (trivia.next >= end - 1) {
					trailing = trivia.text;
					break;
				}
				const key = parseKeyPath(table, trivia.next);
				if (key === undefined) return undefined;
				const equals = skipWsAndComments(table, key.next);
				if (table[equals] !== "=") return undefined;
				const valueEnd = endOfTomlValue(table, equals + 1);
				if (valueEnd > end - 1) return undefined;
				const pairText = table.slice(trivia.next, valueEnd);
				const drop = key.segments[0] === serverKey;
				if (drop) for (const comment of tomlCommentLines(pairText)) comments.push(comment);
				pairs.push({
					leading: trivia.text,
					text: pairText,
					drop
				});
				index = valueEnd;
			}
			const insertion = entry === undefined ? undefined : `${tomlInlineKey(serverKey)} = ${tomlInlineValue(entry)}`;
			if (insertion === undefined && pairs.every((pair) => !pair.drop)) return {
				text: table,
				comments
			};
			return {
				text: rebuildInlineTable(pairs, trailing, insertion),
				comments
			};
		};
		rebuildInlineTable = (pairs, trailing, insertion) => rebuildDelimitedEntries(pairs, trailing, insertion, "{", "}");
		rebuildDelimitedEntries = (pairs, trailing, insertion, open, close) => {
			const parts = [open];
			let emitted = false;
			let separatorPending = false;
			for (const pair of pairs) {
				if (pair.drop) {
					if (!pair.leading.includes("#")) continue;
					const dropped = !emitted || separatorPending ? commasOutsideComments(pair.leading) : pair.leading;
					parts.push(dropped);
					separatorPending = separatorPending || hasSeparatorComma(dropped);
					continue;
				}
				const kept = emitted ? pair.leading : commasOutsideComments(pair.leading);
				parts.push(separatorPending ? commasOutsideComments(kept) : kept);
				if (emitted && !separatorPending && !pair.leading.includes(",")) parts.push(", ");
				separatorPending = false;
				parts.push(pair.text);
				emitted = true;
			}
			if (insertion !== undefined) {
				if (!(emitted && separatorPending)) parts.push(emitted ? ", " : " ");
				parts.push(insertion);
				emitted = true;
			}
			if (!emitted) {
				const retained = `${parts.slice(1).join("")}${commasOutsideComments(trailing)}`;
				return retained.includes("#") ? `${open}${retained}${close}` : `${open}${close}`;
			}
			const tail = commasOutsideComments(trailing);
			parts.push(tail);
			if (tail === "" && open === "{") parts.push(" ");
			parts.push(close);
			return parts.join("");
		};
		tomlStringValue = (text) => {
			try {
				const value = parseClientToml(`value = ${text}`)["value"];
				return typeof value === "string" ? value : undefined;
			} catch (cause) {
				void cause;
				return undefined;
			}
		};
		tomlArrayWithoutString = (array, serverKey) => {
			if (!array.startsWith("[")) return undefined;
			const end = endOfContainer(array, 0);
			if (end !== array.length || array[end - 1] !== "]") return undefined;
			const pairs = [];
			let index = 1;
			let trailing = "";
			while (index < end - 1) {
				const trivia = readTrivia(array, index, end - 1);
				if (trivia.next >= end - 1) {
					trailing = trivia.text;
					break;
				}
				const valueEnd = endOfTomlValue(array, trivia.next);
				if (valueEnd > end - 1) return undefined;
				const text = array.slice(trivia.next, valueEnd);
				pairs.push({
					leading: trivia.text,
					text,
					drop: tomlStringValue(text) === serverKey
				});
				index = valueEnd;
			}
			if (pairs.every((pair) => !pair.drop)) return array;
			const rebuilt = rebuildDelimitedEntries(pairs, trailing, undefined, "[", "]");
			return rebuilt === "[]" ? "" : rebuilt;
		};
		disabledServerListEdit = (input) => {
			if (input.entry === undefined || input.tablePath.length !== 0 || input.segments.length !== 1 || input.segments[0] !== "disabled_mcp_servers") return { kind: "ignore" };
			const open = skipWsAndComments(input.text, input.valueOffset);
			if (input.text[open] !== "[") return { kind: "ignore" };
			const arrayText = input.text.slice(open, input.valueEnd);
			const edited = tomlArrayWithoutString(arrayText, input.serverKey);
			if (edited === undefined || edited === arrayText) return { kind: "keep" };
			if (edited === "") {
				const suffix = input.text.slice(input.valueEnd, input.statementEnd);
				const hash = suffix.indexOf("#");
				return {
					kind: "delete",
					comment: hash < 0 ? undefined : suffix.slice(hash)
				};
			}
			return {
				kind: "replace",
				text: `${input.text.slice(input.lineStart, open)}${edited}${input.text.slice(input.valueEnd, input.statementEnd)}`
			};
		};
		disabledServerListLines = (edit, lines, lineIndex, endLine) => {
			switch (edit.kind) {
				case "ignore": return undefined;
				case "keep": return lines.slice(lineIndex, endLine + 1);
				case "replace": return edit.text.split("\n");
				case "delete": return edit.comment === undefined ? [] : [edit.comment];
				default: {
					const unreachable = edit;
					return unreachable;
				}
			}
		};
		withoutTrailingLineFeeds = (text) => {
			let end = text.length;
			while (end > 0 && text.charCodeAt(end - 1) === 10) end -= 1;
			return text.slice(0, end);
		};
		tomlCommentLines = (text) => {
			const comments = [];
			let index = 0;
			while (index < text.length) {
				if (text.startsWith("\"\"\"", index) || text.startsWith("'''", index)) {
					const basic = text[index] === "\"";
					index = closeMultiline(text, index + 3, basic ? "\"\"\"" : "'''", basic) ?? text.length;
				} else if (text[index] === "\"" || text[index] === "'") {
					index = parseQuotedKey(text, index)?.next ?? text.length;
				} else if (text[index] === "#") {
					const end = text.indexOf("\n", index);
					comments.push(text.slice(index, end < 0 ? text.length : end));
					index = end < 0 ? text.length : end + 1;
				} else index += 1;
			}
			return comments;
		};
		upsertTomlServerSection = (originalText, serverKey, entry, format) => {
			const bom = originalText.startsWith("﻿");
			const source = bom ? originalText.slice(1) : originalText;
			const crlf = source.includes("\r\n") && !source.replaceAll("\r\n", "").includes("\n");
			const text = source;
			const lines = text.split("\n");
			const lineStarts = [];
			let cursor = 0;
			for (const line of lines) {
				lineStarts.push(cursor);
				cursor += line.length + 1;
			}
			const kept = [];
			const pending = [];
			let skipping = false;
			let inlineServerTable = false;
			let mode = "none";
			let tablePath = [];
			const discardPending = () => {
				pending.length = 0;
			};
			const appendLines = (lines) => {
				for (const line of lines) kept.push(line);
			};
			const flushPending = () => {
				appendLines(pending);
				pending.length = 0;
			};
			let lineIndex = 0;
			while (lineIndex < lines.length) {
				const physical = lines[lineIndex] ?? "";
				const line = physical.endsWith("\r") ? physical.slice(0, -1) : physical;
				if (mode !== "none") {
					mode = tomlStringModeAfter(line, mode);
					if (skipping) discardPending();
					else kept.push(physical);
					lineIndex += 1;
					continue;
				}
				const header = parseTomlTableHeader(line);
				if (header !== undefined) {
					tablePath = header.path;
					if (isTomlServerTable(header.path, serverKey)) {
						discardPending();
						appendLines(tomlCommentLines(physical));
						skipping = true;
						lineIndex += 1;
						continue;
					}
					skipping = false;
					flushPending();
					kept.push(physical);
					lineIndex += 1;
					continue;
				}
				const assignment = parseAssignment(line);
				if (assignment !== undefined) {
					const lineStart = lineStarts[lineIndex] ?? 0;
					const valueOffset = lineStart + assignment.equals + 1;
					const valueEnd = endOfTomlValue(text, valueOffset);
					let statementEnd = valueEnd;
					while (statementEnd < text.length && text[statementEnd] !== "\n") statementEnd += 1;
					const lastOffset = Math.max(statementEnd - 1, lineStart);
					let endLine = lineIndex;
					while (endLine + 1 < lineStarts.length && (lineStarts[endLine + 1] ?? 0) <= lastOffset) endLine += 1;
					if (skipping) {
						discardPending();
						appendLines(tomlCommentLines(text.slice(lineStart, statementEnd)));
						lineIndex = endLine + 1;
						mode = "none";
						continue;
					}
					const disabledLines = format === "grok" ? disabledServerListLines(disabledServerListEdit({
						text,
						lineStart,
						valueOffset,
						valueEnd,
						statementEnd,
						tablePath,
						segments: assignment.segments,
						serverKey,
						entry
					}), lines, lineIndex, endLine) : undefined;
					if (disabledLines !== undefined) {
						flushPending();
						appendLines(disabledLines);
						lineIndex = endLine + 1;
						mode = "none";
						continue;
					}
					const absolute = [...tablePath, ...assignment.segments];
					const open = skipWsAndComments(text, valueOffset);
					const closesServerTable = absolute.length === 1 && absolute[0] === "mcp_servers" && text[open] === "{";
					if (closesServerTable || isTomlServerTable(absolute, serverKey)) {
						if (closesServerTable) {
							flushPending();
							const edited = editInlineServerTable(text.slice(open, valueEnd), serverKey, entry);
							const prefix = text.slice(lineStart, open);
							const suffix = text.slice(valueEnd, statementEnd);
							const replacement = edited === undefined ? text.slice(lineStart, statementEnd) : `${prefix}${edited.text}${suffix}`;
							appendLines(replacement.split("\n"));
							if (edited !== undefined) appendLines(edited.comments);
							inlineServerTable = true;
						} else {
							discardPending();
							appendLines(tomlCommentLines(text.slice(lineStart, statementEnd)));
						}
					} else {
						flushPending();
						for (let index = lineIndex; index <= endLine; index += 1) kept.push(lines[index] ?? "");
					}
					lineIndex = endLine + 1;
					mode = "none";
					continue;
				}
				if (isBlankOrComment(line)) {
					if (line.trimStart().startsWith("#")) {
						flushPending();
						kept.push(physical);
					} else pending.push(physical);
					lineIndex += 1;
					continue;
				}
				mode = tomlStringModeAfter(line, "none");
				if (skipping) {
					if (looksLikeTomlHeader(line)) {
						flushPending();
						skipping = false;
						tablePath = ["\0"];
						kept.push(physical);
					} else discardPending();
				} else {
					flushPending();
					kept.push(physical);
				}
				lineIndex += 1;
			}
			if (!skipping) flushPending();
			let body = kept.join("\n");
			if (body.endsWith("\r")) body += "\n";
			if (entry !== undefined && !inlineServerTable) {
				let fragment = withoutTrailingLineFeeds(stringify({ mcp_servers: { [serverKey]: entry } }));
				if (crlf) fragment = fragment.replaceAll("\n", "\r\n");
				const nl = crlf ? "\r\n" : "\n";
				const endedWithNewline = body.endsWith("\n");
				const base = withoutTrailingLineFeeds(body);
				const trimmed = endedWithNewline && base.endsWith("\r") ? base.slice(0, -1) : base;
				body = trimmed.length === 0 ? `${fragment}${nl}` : `${trimmed}${nl}${nl}${fragment}${nl}`;
			}
			if (originalText.endsWith("\n") && !body.endsWith("\n")) body += originalText.endsWith("\r\n") ? "\r\n" : "\n";
			return bom ? `\uFEFF${body}` : body;
		};
		tomlServerEntry = (document, serverKey) => {
			const servers = clientConfigurationRecordSchema.safeParse(document.mcp_servers);
			if (!servers.success || !Object.hasOwn(servers.data, serverKey)) return undefined;
			return servers.data[serverKey];
		};
		grokServerListedDisabled = (document, serverKey) => Array.isArray(document.disabled_mcp_servers) && document.disabled_mcp_servers.includes(serverKey);
		OMP_DISABLED_SERVERS_KEY = "disabledServers";
		ompServerListedDisabled = (document, serverKey) => {
			const listed = document[OMP_DISABLED_SERVERS_KEY];
			return Array.isArray(listed) && listed.includes(serverKey);
		};
		OMP_ENABLED_SERVERS_KEY = "enabledServers";
		clientServerForcedEnabled = (parsed, serverKey) => {
			if (parsed.dialect !== "omp") return false;
			const listed = parsed.document[OMP_ENABLED_SERVERS_KEY];
			return Array.isArray(listed) && listed.includes(serverKey);
		};
		clientServerListedDisabled = (parsed, serverKey) => parsed.dialect === "grok" && grokServerListedDisabled(parsed.document, serverKey) || parsed.dialect === "omp" && ompServerListedDisabled(parsed.document, serverKey);
		serializeGrokConfiguration = (document, originalText) => {
			const entry = tomlServerEntry(document, PRODUCT_IDENTITY.mcpServerKey);
			if (originalText === undefined) return stringify(document);
			return upsertTomlServerSection(originalText, PRODUCT_IDENTITY.mcpServerKey, entry, "grok");
		};
		withoutEmptyServerTable = (document) => {
			const servers = clientConfigurationRecordSchema.safeParse(document.mcp_servers);
			if (!servers.success || Object.keys(servers.data).length > 0) return document;
			const { mcp_servers: empty, ...rest } = document;
			void empty;
			return rest;
		};
		serializeCodexConfiguration = (document, originalText) => {
			if (originalText === undefined || isEmptyClientConfigurationText(originalText)) return stringify(document);
			const edited = upsertTomlServerSection(originalText, PRODUCT_IDENTITY.mcpServerKey, tomlServerEntry(document, PRODUCT_IDENTITY.mcpServerKey), "toml");
			return tomlTextHolds(edited, document) ? edited : stringify(document);
		};
		tomlTextHolds = (text, document) => {
			try {
				return clientConfigurationValuesEqual(withoutEmptyServerTable(clientConfigurationRecordSchema.parse(parseClientToml(text))), withoutEmptyServerTable(document));
			} catch (cause) {
				void cause;
				return false;
			}
		};
		JSON_COMMA = 5;
		nextJsoncToken = (text, offset) => {
			const scanner = createScanner(text, true);
			scanner.setPosition(offset);
			const kind = scanner.scan();
			return {
				kind,
				offset: scanner.getTokenOffset()
			};
		};
		isJsonMember = (property, key) => property.children?.length === 2 && property.children[0]?.value === key;
		effectiveJsonProperty = (object, key) => object.children?.findLast((property) => isJsonMember(property, key));
		effectiveJsonObject = (root, path) => {
			let node = root;
			for (const key of path) {
				if (node?.type !== "object") return undefined;
				node = effectiveJsonProperty(node, key)?.children?.[1];
			}
			return node?.type === "object" ? node : undefined;
		};
		NO_SHADOWED_SERVERS = Object.freeze({
			servers: [],
			legacyServers: []
		});
		JSON_STRING = 10;
		JSON_EOF = 17;
		hasRepeatedJsonString = (text, name) => {
			const scanner = createScanner(text, true);
			let matches = 0;
			for (let token = scanner.scan(); token !== JSON_EOF; token = scanner.scan()) {
				if (token === JSON_STRING && scanner.getTokenValue() === name) {
					matches += 1;
					if (matches === 2) return true;
				}
			}
			return false;
		};
		shadowedJsonMembers = (object, name) => (object?.children ?? []).filter((property) => isJsonMember(property, name)).slice(0, -1).map((property) => {
			const value = property.children?.[1];
			return value === undefined ? undefined : getNodeValue(value);
		});
		shadowedClientServers = (text, parsed, name) => {
			if (parsed.dialect === "toml" || parsed.dialect === "grok" || parsed.dialect === "hermes" || parsed.dialect === "dsh" || !hasRepeatedJsonString(text, name)) return NO_SHADOWED_SERVERS;
			const root = parseTree(text, [], { allowTrailingComma: true });
			return {
				servers: shadowedJsonMembers(effectiveJsonObject(root, parsed.serversPath), name),
				legacyServers: parsed.dialect === "opencode_v2" && !OPENCODE_V2_MCP_SETTINGS.has(name) ? shadowedJsonMembers(effectiveJsonObject(root, parsed.serversPath.slice(0, 1)), name) : []
			};
		};
		applyFormattedJsonEdit = (text, edit) => {
			const edited = applyEdits(text, [edit]);
			let begin = edit.offset;
			let end = edit.offset + edit.content.length;
			if (edit.length === 0) {
				while (begin > 0 && !"\r\n".includes(edited.charAt(begin - 1))) begin -= 1;
				while (end < edited.length && !"\r\n".includes(edited.charAt(end))) end += 1;
			}
			return applyEdits(edited, format(edited, {
				offset: begin,
				length: end - begin
			}, {
				insertSpaces: true,
				tabSize: 2,
				eol: "\n",
				keepLines: false
			}));
		};
		jsonChildRemovalEdits = (text, object, properties) => {
			const siblings = object.children ?? [];
			const removed = new Set(properties);
			const anyKept = siblings.some((member) => !removed.has(member));
			const edits = [];
			let earlierKept = false;
			for (const [index, member] of siblings.entries()) {
				if (removed.has(member)) edits.push({
					offset: member.offset,
					length: member.length,
					content: ""
				});
				else earlierKept = true;
				const separator = nextJsoncToken(text, member.offset + member.length);
				const next = siblings[index + 1];
				if (separator.kind !== JSON_COMMA && next !== undefined) throw new TypeError("JSON property separator was not found");
				const keepSeparator = next === undefined ? anyKept : earlierKept && !removed.has(next);
				if (separator.kind === JSON_COMMA && !keepSeparator) edits.push({
					offset: separator.offset,
					length: 1,
					content: ""
				});
			}
			return edits;
		};
		deleteJsonMembers = (text, object, properties) => applyEdits(text, jsonChildRemovalEdits(text, object, properties));
		jsonValueEdits = (text, node, value) => {
			if (node.type === "object") {
				const record = clientConfigurationRecordSchema.safeParse(value);
				if (record.success) {
					const members = node.children ?? [];
					const removed = members.filter((member) => {
						const key = member.children?.[0]?.value;
						return typeof key === "string" && (!Object.hasOwn(record.data, key) || record.data[key] === undefined);
					});
					const edits = jsonChildRemovalEdits(text, node, removed);
					const added = [];
					for (const [key, next] of Object.entries(record.data)) {
						if (next === undefined) continue;
						const child = effectiveJsonProperty(node, key)?.children?.[1];
						if (child === undefined) added.push(`${JSON.stringify(key)}:${JSON.stringify(next)}`);
						else edits.push(...jsonValueEdits(text, child, next));
					}
					if (added.length > 0) edits.push({
						offset: node.offset + 1,
						length: 0,
						content: added.join(",") + (members.some((member) => !removed.includes(member)) ? "," : "")
					});
					return edits;
				}
			}
			if (node.type === "array" && Array.isArray(value)) {
				const children = node.children ?? [];
				const edits = jsonChildRemovalEdits(text, node, children.slice(value.length));
				for (const [index, child] of children.slice(0, value.length).entries()) edits.push(...jsonValueEdits(text, child, value[index] ?? null));
				if (value.length > children.length) {
					const previous = children.at(-1);
					edits.push({
						offset: previous === undefined ? node.offset + 1 : previous.offset + previous.length,
						length: 0,
						content: (previous === undefined ? "" : ",") + value.slice(children.length).map((entry) => JSON.stringify(entry ?? null)).join(",")
					});
				}
				return edits;
			}
			return Object.is(node.value, value) ? [] : [{
				offset: node.offset,
				length: node.length,
				content: JSON.stringify(value)
			}];
		};
		JSON_CLOSE_BRACE = 2;
		JSON_CLOSE_BRACKET = 4;
		JSON_LINE_COMMENT = 12;
		JSON_BLOCK_COMMENT = 13;
		strictJsonSyntax = (source) => {
			const text = source.startsWith("﻿") ? source.slice(1) : source;
			const scanner = createScanner(text, false);
			const edits = [];
			for (let token = scanner.scan(); token !== JSON_EOF; token = scanner.scan()) {
				const offset = scanner.getTokenOffset();
				if (token === JSON_LINE_COMMENT || token === JSON_BLOCK_COMMENT) edits.push({
					offset,
					length: scanner.getTokenLength(),
					content: " "
				});
				else if (token === JSON_COMMA) {
					const next = nextJsoncToken(text, offset + 1);
					if (next.kind === JSON_CLOSE_BRACE || next.kind === JSON_CLOSE_BRACKET) edits.push({
						offset,
						length: 1,
						content: ""
					});
				}
			}
			return applyEdits(text, edits);
		};
		editJsonMember = (text, path, value, removeShadowedMembers) => {
			let object = parseTree(text, [], { allowTrailingComma: true });
			for (const [index, key] of path.entries()) {
				if (object?.type !== "object") throw new TypeError("JSON edit parent is not an object");
				const property = effectiveJsonProperty(object, key);
				const member = property?.children?.[1];
				if (property === undefined || member === undefined) {
					if (value === undefined) return ok(text);
					const content = `${JSON.stringify(key)}: ${JSON.stringify(path.slice(index + 1).reduceRight((nested, name) => ({ [name]: nested }), value))}`;
					const previous = object.children?.at(-1);
					return ok(applyFormattedJsonEdit(text, previous === undefined ? {
						offset: object.offset + 1,
						length: 0,
						content
					} : {
						offset: previous.offset + previous.length,
						length: 0,
						content: `,${content}`
					}));
				}
				if (index < path.length - 1) {
					object = member;
					continue;
				}
				if (value !== undefined) return ok(applyEdits(text, jsonValueEdits(text, member, value)));
				if (object.children?.some((sibling) => sibling !== property && isJsonMember(sibling, key))) return removeShadowedMembers ? ok(deleteJsonMembers(text, object, (object.children ?? []).filter((sibling) => isJsonMember(sibling, key)))) : err({
					kind: "shadowed_member",
					path
				});
				return ok(deleteJsonMembers(text, object, [property]));
			}
			throw new TypeError("JSON edit path is empty");
		};
		serializeClientConfiguration = (document, format, originalText, editedPaths, options = {}) => {
			if (format === undefined || format === "unsupported") throw new TypeError("client does not have a supported MCP config format");
			if (format === "toml") return ok(serializeCodexConfiguration(document, originalText));
			if (format === "grok") return ok(serializeGrokConfiguration(document, originalText));
			if (format === "hermes") return ok(serializeHermesConfiguration(document, originalText));
			if (format === "goose") {
				if (originalText === undefined || editedPaths === undefined) return ok(stringifyGooseConfigurationYaml(document));
				let text = originalText;
				for (const path of editedPaths) text = editGooseConfigurationYaml(text, path, valueAt(document, path));
				return ok(text);
			}
			if (format === "dsh") return ok(serializeDshDocument(document));
			if (originalText === undefined || isEmptyClientConfigurationText(originalText)) return ok(`${JSON.stringify(document, null, 2)}\n`);
			let text = originalText;
			if (editedPaths === undefined) {
				const root = parseTree(text, [], { allowTrailingComma: true });
				if (root === undefined) throw new TypeError("JSON document is missing");
				text = applyEdits(text, jsonValueEdits(text, root, document));
			}
			for (const path of editedPaths ?? []) {
				const edited = editJsonMember(text, path, valueAt(document, path), options.removeShadowedMembersAt?.some((allowed) => allowed.length === path.length && allowed.every((key, index) => key === path[index])) ?? false);
				if (!edited.ok) return edited;
				text = edited.value;
			}
			const reader = clientConfigurationReader(format);
			return ok(reader.syntax === "json" && reader.repairsJsonc === true ? strictJsonSyntax(text) : text);
		};
		clientServerPath = (parsed, name) => [...parsed.serversPath, name];
		legacyClientServerPath = (parsed, name) => Object.hasOwn(parsed.legacyServers, name) ? [parsed.serversPath[0] ?? "mcp", name] : undefined;
		serializeHermesConfiguration = (document, originalText) => {
			if (originalText === undefined || isEmptyClientConfigurationText(originalText)) return stringifyHermesConfigurationYaml(document);
			const serversKey = clientConfigurationServersKey("hermes");
			const servers = document[serversKey];
			const entry = typeof servers === "object" && servers !== null ? servers[PRODUCT_IDENTITY.mcpServerKey] : undefined;
			return editHermesConfigurationYaml(originalText, [serversKey, PRODUCT_IDENTITY.mcpServerKey], entry);
		};
		clientRegistrationLauncherEntry = (format, command) => {
			const [executable = "rea", ...args] = command;
			switch (format) {
				case "opencode":
				case "opencode_v2":
				case "fx":
				case "kilo": return {
					type: "local",
					command: [...command]
				};
				case "goose": return {
					type: "stdio",
					cmd: executable,
					args
				};
				case "vscode":
				case "omp":
				case "pi":
				case "copilot_cli":
				case "copilot_cli_project": return {
					type: "stdio",
					command: executable,
					args
				};
				case "commandcode": return {
					transport: "stdio",
					command: executable,
					args
				};
				default: return {
					command: executable,
					args
				};
			}
		};
		clientRegistrationEntry = (format, command, environment) => {
			if (format === "dsh") return dshClientRegistrationEntry(command, environment);
			const defaults = format === "opencode_v2" ? { disabled: false } : format === "copilot_cli" ? { tools: ["*"] } : format === "goose" ? {
				name: PRODUCT_IDENTITY.mcpServerKey,
				description: "",
				envs: {},
				enabled: true,
				timeout: 300
			} : [
				"opencode",
				"commandcode",
				"hermes",
				"fx",
				"kilo"
			].includes(format) ? { enabled: true } : {};
			const environmentKey = [
				"opencode",
				"opencode_v2",
				"fx",
				"kilo"
			].includes(format) ? "environment" : format === "goose" ? "envs" : "env";
			return {
				...clientRegistrationLauncherEntry(format, command),
				...defaults,
				...Object.keys(environment).length === 0 ? {} : { [environmentKey]: { ...environment } }
			};
		};
		parseGeminiMcpPolicy = (parsed) => z.object({
			allowed: z.array(z.string()).optional(),
			excluded: z.array(z.string()).optional()
		}).passthrough().parse(parsed.document.mcp ?? {});
		normalizeGeminiServerName = (name) => name.toLowerCase().trim();
		geminiServerPolicyBlock = (policies, serverKey) => {
			const key = normalizeGeminiServerName(serverKey);
			if (policies.some(({ excluded }) => excluded?.some((name) => normalizeGeminiServerName(name) === key))) return `Gemini mcp.excluded blocks ${serverKey}. Review the selected settings policies before rerunning setup.`;
			const allowlists = policies.flatMap(({ allowed }) => allowed === undefined ? [] : [allowed]);
			const allowed = allowlists.reduce((previous, current) => {
				if (previous === undefined) return current;
				const normalized = new Set(current.map(normalizeGeminiServerName));
				return previous.filter((name) => normalized.has(normalizeGeminiServerName(name)));
			}, undefined);
			if (allowed !== undefined && allowed.length > 0 && !allowed.some((name) => normalizeGeminiServerName(name) === key)) return `Gemini mcp.allowed does not include ${serverKey}. Review the selected settings policies before rerunning setup.`;
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/application/HermesClientHome.js
var HermesClientPathError, defaultDirectory, expandedDirectory, physicalPath, within, PROFILE_MARKERS, RESERVED_PROFILES, liveProfile, resolveHermesClientHome;
function init_HermesClientHome() {
	return (init_HermesClientHome = __esmMin((() => {
		init_callerPath();
		init_strictUtf8();
		HermesClientPathError = class extends Error {
			path;
			constructor(path, message) {
				super(message);
				this.path = path;
				this.name = "HermesClientPathError";
			}
		};
		defaultDirectory = (home, platform, env) => {
			const suffix = env.HERMES_DATA_DIR_SUFFIX ?? "";
			return platform === "win32" ? join(env.LOCALAPPDATA?.trim() || join(home, "AppData", "Local"), `hermes${suffix}`) : appendCallerPath(home, `.hermes${suffix}`, platform);
		};
		expandedDirectory = (home, platform, env) => {
			const override = env.HERMES_HOME?.trim();
			if (!override) return undefined;
			const variables = override.replace(/\$(\w+|\{[^}]*\})/gu, (match, variable) => {
				const key = variable.startsWith("{") ? variable.slice(1, -1) : variable;
				return env[key] ?? match;
			});
			const expanded = platform === "win32" ? variables.replace(/%([^%]+)%/gu, (match, variable) => env[variable] ?? match) : variables;
			if (expanded === "~") return home;
			if (expanded.startsWith("~/") || platform === "win32" && expanded.startsWith("~\\")) return absoluteCallerPath(appendCallerPath(home, expanded.slice(2), platform));
			if (expanded.startsWith("~")) {
				if (platform !== "win32") {
					const separator = expanded.indexOf("/");
					const username = expanded.slice(1, separator < 0 ? undefined : separator);
					let account;
					try {
						account = userInfo();
					} catch {
						throw new HermesClientPathError(override, "Cannot resolve the OS account for this named Hermes home. Set an absolute HERMES_HOME before configuring Hermes.");
					}
					if (account.username === username && isAbsolute(account.homedir)) return separator < 0 ? account.homedir : absoluteCallerPath(appendCallerPath(account.homedir, expanded.slice(separator + 1)));
				}
				throw new HermesClientPathError(override, "Cannot resolve this named Hermes home. Set an absolute HERMES_HOME before configuring Hermes.");
			}
			return absoluteCallerPath(expanded);
		};
		physicalPath = (path) => {
			let ancestor = absoluteCallerPath(path);
			const missing = [];
			try {
				while (true) {
					try {
						return join(realpathSync(ancestor), ...missing);
					} catch (cause) {
						if (!(cause instanceof Error) || !("code" in cause) || cause.code !== "ENOENT" || dirname(ancestor) === ancestor || basename(ancestor) === "..") throw cause;
						if (lstatSync(ancestor, { throwIfNoEntry: false })?.isSymbolicLink()) throw cause;
						missing.unshift(basename(ancestor));
						ancestor = dirname(ancestor);
					}
				}
			} catch {
				throw new HermesClientPathError(path, "Cannot resolve the Hermes home root. Restore access to this path before configuring Hermes.");
			}
		};
		within = (root, path) => {
			const difference = relative(physicalPath(root), physicalPath(path));
			return difference === "" || !isAbsolute(difference) && difference !== ".." && !difference.startsWith(`..${sep}`);
		};
		PROFILE_MARKERS = [
			"config.yaml",
			".env",
			"SOUL.md",
			"profile.yaml",
			"auth.json",
			"state.db"
		];
		RESERVED_PROFILES = new Set([
			"hermes",
			"test",
			"tmp",
			"root",
			"sudo"
		]);
		liveProfile = (path) => {
			try {
				if (!statSync(path).isDirectory()) return false;
				try {
					statSync(appendCallerPath(dirname(path), `.deleted/${basename(path)}`));
					return false;
				} catch {}
				return PROFILE_MARKERS.some((marker) => {
					try {
						const status = lstatSync(appendCallerPath(path, marker));
						return status.isFile() || status.isSymbolicLink();
					} catch {
						return false;
					}
				});
			} catch {
				return false;
			}
		};
		resolveHermesClientHome = (home, platform, env) => {
			const native = defaultDirectory(home, platform, env);
			const root = expandedDirectory(home, platform, env) ?? native;
			if (basename(dirname(root)) === "profiles") return root;
			const stickyRoot = within(native, root) ? native : root;
			let name;
			try {
				name = decodeStrictUtf8(readFileSync(appendCallerPath(stickyRoot, "active_profile")), "strip-signature").trim();
			} catch {
				return root;
			}
			if (name === "" || name === "default") return root;
			const canonical = name.toLowerCase();
			if (canonical === "default") return root;
			if (!/^[a-z0-9][a-z0-9_-]{0,63}$/u.test(canonical) || RESERVED_PROFILES.has(canonical)) throw new HermesClientPathError(appendCallerPath(stickyRoot, "active_profile"), `Invalid saved Hermes profile ${JSON.stringify(name)}. Run 'hermes profile use default' or repair active_profile.`);
			const selected = appendCallerPath(stickyRoot, `profiles/${canonical}`);
			if (!liveProfile(selected)) throw new HermesClientPathError(selected, `Saved Hermes profile ${JSON.stringify(name)} is missing, deleted, or has no profile identity. Run 'hermes profile use default' or restore that profile before configuring it.`);
			return selected;
		};
	})))();
}

//#endregion
//#region dist/application/MsixPackageStorage.js
var windowsAppDataRoots, msixPackagesDirectory, pathWithin$1, packagePrivateStorageFamily, packagePrivateLauncherBlocker, canonicalDestination, redirectedWriteBlocker, packageReadTargetChanged;
function init_MsixPackageStorage() {
	return (init_MsixPackageStorage = __esmMin((() => {
		init_result();
		init_errorMessage();
		windowsAppDataRoots = (home, env) => ({
			roaming: env.APPDATA || join(home, "AppData", "Roaming"),
			local: env.LOCALAPPDATA || join(home, "AppData", "Local")
		});
		msixPackagesDirectory = (home, env) => join(windowsAppDataRoots(home, env).local, "Packages");
		pathWithin$1 = (path, root) => {
			const inner = relative(root, path);
			return inner === "" || inner !== ".." && !inner.startsWith(`..${sep}`) && !isAbsolute(inner);
		};
		packagePrivateStorageFamily = (canonicalPath, packagesDirectory) => {
			if (!pathWithin$1(canonicalPath, packagesDirectory)) return undefined;
			const [family, storage] = relative(packagesDirectory, canonicalPath).split(/[\\/]/u);
			return family !== undefined && family !== "" && storage?.toLowerCase() === "localcache" ? family : undefined;
		};
		packagePrivateLauncherBlocker = (command, packagesDirectory, canonicalPath = realpathSync.native) => {
			let packages = packagesDirectory;
			try {
				packages = canonicalPath(packagesDirectory);
			} catch (cause) {
				void cause;
			}
			for (const part of command) {
				if (!isAbsolute(part)) continue;
				let resolved;
				try {
					resolved = canonicalPath(part);
				} catch (cause) {
					void cause;
					continue;
				}
				const family = packagePrivateStorageFamily(resolved, packages);
				if (family !== undefined) return `The REA launcher ${part} is stored at ${resolved}, inside the private storage of MSIX package ${family}. Only processes started by that app can see it at ${part}, and Windows removes it with the package, so other clients could not start this registration. Install REA from a terminal that the app did not start (for example with \`npm install -g rea-agents\`), then rerun setup from that terminal.`;
			}
			return undefined;
		};
		canonicalDestination = (path, canonicalPath) => {
			let ancestor = path;
			const missing = [];
			while (true) {
				try {
					return ok(join(canonicalPath(ancestor), ...missing));
				} catch (cause) {
					if (cause instanceof Error && "code" in cause && (cause.code === "ENOENT" || cause.code === "ENOTDIR") && dirname(ancestor) !== ancestor) {
						missing.unshift(basename(ancestor));
						ancestor = dirname(ancestor);
						continue;
					}
					return err({
						path,
						detail: errorMessage(cause)
					});
				}
			}
		};
		redirectedWriteBlocker = (view, targets, operation, canonicalPath = realpathSync.native) => {
			if (view?.processView !== "redirected" || targets.length === 0) return undefined;
			const roots = [];
			const redirected = [];
			for (const root of view.virtualizedRoots) {
				const resolved = canonicalDestination(root, canonicalPath);
				if (!resolved.ok) return `Cannot establish the MSIX write location for ${resolved.error.path}: ${resolved.error.detail}. Rerun ${operation} from a terminal that this app did not start.`;
				roots.push(resolved.value);
			}
			for (const target of targets) {
				const resolved = canonicalDestination(target, canonicalPath);
				if (!resolved.ok) return `Cannot establish the MSIX write location for ${resolved.error.path}: ${resolved.error.detail}. Rerun ${operation} from a terminal that this app did not start.`;
				if (roots.some((root) => pathWithin$1(resolved.value, root))) redirected.push(target);
			}
			if (redirected.length === 0) return undefined;
			return `This process was started by MSIX package ${view.packageFamilyName}, which redirects its writes under ${view.virtualizedRoots.join(" and ")} into the package's private storage. Changes to ${redirected.join(", ")} would not reach the files other apps read. Rerun ${operation} from a terminal that this app did not start.`;
		};
		packageReadTargetChanged = async (view, configPath) => {
			if (configPath !== view.appDataConfigPath) return ok(false);
			try {
				await lstat(view.privateConfigPath);
				return ok(true);
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && (cause.code === "ENOENT" || cause.code === "ENOTDIR")) return ok(false);
				return err({
					_tag: "MsixReadTargetInspectionFailure",
					path: view.privateConfigPath,
					detail: errorMessage(cause),
					cause
				});
			}
		};
	})))();
}

//#endregion
//#region dist/application/ClientConfigRoots.js
var xdgConfigHomeOrDefault, absoluteXdgConfigHome, mcporterExpandHome, mcporterXdgConfigHome, vscodeUserDirectory, clientPathDependence, absoluteClientRoot;
function init_ClientConfigRoots() {
	return (init_ClientConfigRoots = __esmMin((() => {
		init_result();
		init_MsixPackageStorage();
		xdgConfigHomeOrDefault = ({ home, env }) => env.XDG_CONFIG_HOME || join(home, ".config");
		absoluteXdgConfigHome = ({ home, env }) => {
			const value = env.XDG_CONFIG_HOME;
			return value !== undefined && posix.isAbsolute(value) ? value : join(home, ".config");
		};
		mcporterExpandHome = (value, home) => value === "~" ? home : value.startsWith("~/") || value.startsWith("~\\") ? join(home, value.slice(2)) : value;
		mcporterXdgConfigHome = ({ home, platform, env }) => {
			const value = mcporterExpandHome(env.XDG_CONFIG_HOME?.trim() ?? "", home);
			return (platform === "win32" ? win32 : posix).isAbsolute(value) ? value : undefined;
		};
		vscodeUserDirectory = ({ home, platform, env }, dataFolder = "Code") => {
			const userData = env.VSCODE_PORTABLE && dataFolder === "Code" ? join(env.VSCODE_PORTABLE, "user-data") : env.VSCODE_APPDATA ? join(env.VSCODE_APPDATA, dataFolder) : platform === "win32" ? join(windowsAppDataRoots(home, env).roaming, dataFolder) : platform === "darwin" ? join(home, "Library", "Application Support", dataFolder) : join(xdgConfigHomeOrDefault({
				home,
				env
			}), dataFolder);
			const absoluteUserData = platform === "win32" && win32.isAbsolute(userData) && !isAbsolute(userData) ? userData : isAbsolute(userData) ? resolve(userData) : resolve(env.VSCODE_CWD || process.cwd(), userData);
			return join(absoluteUserData, "User");
		};
		clientPathDependence = (path, platform) => {
			if (platform !== "win32") return posix.isAbsolute(path) ? undefined : "relative";
			if (!win32.isAbsolute(path)) return "relative";
			return /^[\\/](?![\\/])/u.test(path) ? "driveless" : undefined;
		};
		absoluteClientRoot = (path, variable, client, platform) => {
			const dependence = clientPathDependence(path, platform);
			return dependence === undefined ? ok(path) : err({
				path,
				message: dependence === "relative" ? `${variable} is relative, so the location ${client} reads depends on its working directory. Set an absolute ${variable} before configuring ${client}.` : `${variable} has no drive, so the location ${client} reads depends on its current drive. Set ${variable} to a path with a drive letter or a UNC path before configuring ${client}.`
			});
		};
	})))();
}

//#endregion
//#region dist/application/ClaudeDesktopConfigLocation.js
var CONFIG_FILE, PROCESS_VIEW_PROBES, ROAMING_DIRECTORY_LIMIT, ROAMING_DEPTH_LIMIT, ROAMING_ENTRY_LIMIT, PROBES_PER_DIRECTORY, CLAUDE_DESKTOP_PACKAGE_FAMILY, CLAUDE_PACKAGE_FAMILY, readNames, systemFileSystem, resolveWindowsClaudeDesktopLocation, processView, resolveAppData, claudeFolderProbes, roamingProbes, isPrivateFile, entryKind, present$1, isMissing;
function init_ClaudeDesktopConfigLocation() {
	return (init_ClaudeDesktopConfigLocation = __esmMin((() => {
		init_result();
		init_MsixPackageStorage();
		init_errorMessage();
		CONFIG_FILE = "claude_desktop_config.json";
		PROCESS_VIEW_PROBES = 8;
		ROAMING_DIRECTORY_LIMIT = 64;
		ROAMING_DEPTH_LIMIT = 4;
		ROAMING_ENTRY_LIMIT = 1024;
		PROBES_PER_DIRECTORY = 2;
		CLAUDE_DESKTOP_PACKAGE_FAMILY = "Claude_pzs8sxrjxfjjc";
		CLAUDE_PACKAGE_FAMILY = /^(?:AnthropicPBC\.)?Claude_[0-9a-hjkmnp-tv-z]{13}$/iu;
		readNames = (path, limit) => {
			const directory = opendirSync(path);
			const names = [];
			try {
				while (names.length < limit) {
					const entry = directory.readSync();
					if (entry === null) break;
					names.push(entry.name);
				}
			} finally {
				directory.closeSync();
			}
			return names;
		};
		systemFileSystem = {
			readdir: (path, limit) => limit === undefined ? readdirSync(path) : readNames(path, limit),
			lstat: (path) => lstatSync(path),
			realpath: (path) => realpathSync.native(path)
		};
		resolveWindowsClaudeDesktopLocation = (home, env, fileSystem = systemFileSystem) => {
			const roots = windowsAppDataRoots(home, env);
			const appDataDirectory = join(roots.roaming, "Claude");
			const appDataConfigPath = join(appDataDirectory, CONFIG_FILE);
			const packagesDirectory = join(roots.local, "Packages");
			let families;
			try {
				families = fileSystem.readdir(packagesDirectory).filter((name) => CLAUDE_PACKAGE_FAMILY.test(name));
			} catch (cause) {
				if (!isMissing(cause)) return err({
					path: packagesDirectory,
					message: `MSIX package storage ${packagesDirectory} could not be inspected, so REA cannot establish whether Claude Desktop reads ${appDataConfigPath} or a package-private copy: ${errorMessage(cause)}. Repair access to that directory, then rerun.`
				});
				families = [];
			}
			const foreign = families.filter((name) => name.toLowerCase() !== CLAUDE_DESKTOP_PACKAGE_FAMILY.toLowerCase());
			if (foreign.length > 0) return err({
				path: join(packagesDirectory, foreign[0] ?? ""),
				message: `MSIX package storage ${foreign.map((name) => join(packagesDirectory, name)).join(", ")} has an unrecognized Claude Desktop package identity or deployment (the supported identity is ${CLAUDE_DESKTOP_PACKAGE_FAMILY}). REA cannot establish which ${CONFIG_FILE} that package reads and does not fall back to ${appDataConfigPath}. Quit Claude Desktop fully and register REA in the configuration the installed app reads.`
			});
			const migratedDirectory = join(roots.local, "Claude-Data", CLAUDE_DESKTOP_PACKAGE_FAMILY.toLowerCase());
			const migrated = present$1(fileSystem, migratedDirectory);
			const migratedConfigPath = join(migratedDirectory, CONFIG_FILE);
			const migrationFailure = !migrated.ok ? migrated.error : migrated.value ? {
				path: migratedConfigPath,
				message: `Found migrated Claude Desktop storage at ${migratedDirectory}. REA cannot verify which configuration the installed app reads. Quit Claude Desktop fully, verify whether it reads ${migratedConfigPath}, then register REA manually in the active file.`
			} : undefined;
			const family = families[0];
			if (family === undefined) return migrationFailure === undefined ? ok({
				configPath: appDataConfigPath,
				markerPath: appDataDirectory
			}) : err(migrationFailure);
			const container = join(packagesDirectory, family);
			const privateRoaming = join(container, "LocalCache", "Roaming");
			const privateDirectory = join(privateRoaming, "Claude");
			const privateConfigPath = join(privateDirectory, CONFIG_FILE);
			const privateCopy = present$1(fileSystem, privateConfigPath);
			const packageView = () => ({
				packageFamilyName: family,
				privateConfigPath,
				appDataConfigPath,
				virtualizedRoots: [roots.roaming, roots.local],
				processView: processView(fileSystem, privateRoaming, roots.roaming, privateCopy.ok && privateCopy.value)
			});
			if (migrationFailure !== undefined) return err({
				...migrationFailure,
				msixPackage: packageView()
			});
			if (!privateCopy.ok) return privateCopy;
			const appDataCopy = privateCopy.value ? ok(false) : present$1(fileSystem, appDataConfigPath);
			if (!appDataCopy.ok) return appDataCopy;
			return ok({
				configPath: privateCopy.value || !appDataCopy.value ? privateConfigPath : appDataConfigPath,
				markerPath: container,
				msixPackage: packageView()
			});
		};
		processView = (fileSystem, privateRoaming, appDataRoaming, privateConfig) => {
			const entryBudget = { inspected: 0 };
			const ownProbes = privateConfig ? [join("Claude", CONFIG_FILE)] : claudeFolderProbes(fileSystem, privateRoaming, entryBudget);
			const probes = ownProbes.length > 0 ? ownProbes : roamingProbes(fileSystem, privateRoaming, entryBudget);
			let view = "unknown";
			for (const probe of probes) {
				let privateTarget;
				try {
					privateTarget = fileSystem.realpath(join(privateRoaming, probe));
				} catch (cause) {
					void cause;
					continue;
				}
				const appDataPath = join(appDataRoaming, probe);
				const first = resolveAppData(fileSystem, appDataPath);
				if (first === undefined) return "unknown";
				if (first === privateTarget) return "redirected";
				if (!isPrivateFile(fileSystem, privateRoaming, probe)) continue;
				const second = resolveAppData(fileSystem, appDataPath);
				if (second === undefined) return "unknown";
				if (second === privateTarget) return "redirected";
				if (second === first) view = "direct";
			}
			return view;
		};
		resolveAppData = (fileSystem, path) => {
			try {
				return fileSystem.realpath(path);
			} catch (cause) {
				return isMissing(cause) ? null : undefined;
			}
		};
		claudeFolderProbes = (fileSystem, privateRoaming, entryBudget) => {
			try {
				const remaining = ROAMING_ENTRY_LIMIT - entryBudget.inspected;
				if (remaining <= 0) return [];
				const names = fileSystem.readdir(join(privateRoaming, "Claude"), remaining);
				entryBudget.inspected += names.length;
				const probes = [];
				for (const name of names) {
					if (isPrivateFile(fileSystem, privateRoaming, join("Claude", name))) {
						probes.push(join("Claude", name));
						if (probes.length === PROCESS_VIEW_PROBES) break;
					}
				}
				return probes;
			} catch (cause) {
				void cause;
				return [];
			}
		};
		roamingProbes = (fileSystem, privateRoaming, entryBudget) => {
			const probes = [];
			const queue = [{
				path: "",
				depth: 0
			}];
			for (let listed = 0; listed < ROAMING_DIRECTORY_LIMIT && probes.length < PROCESS_VIEW_PROBES && entryBudget.inspected < ROAMING_ENTRY_LIMIT; listed++) {
				const directory = queue.shift();
				if (directory === undefined) break;
				let names;
				try {
					const enumerated = fileSystem.readdir(join(privateRoaming, directory.path), ROAMING_ENTRY_LIMIT - entryBudget.inspected);
					entryBudget.inspected += enumerated.length;
					names = [...enumerated].sort();
				} catch (cause) {
					void cause;
					continue;
				}
				let taken = 0;
				for (const name of names) {
					const wantsFile = taken < PROBES_PER_DIRECTORY;
					const wantsFolder = directory.depth < ROAMING_DEPTH_LIMIT && listed + queue.length < ROAMING_DIRECTORY_LIMIT - 1;
					if (!wantsFile && !wantsFolder) break;
					const path = join(directory.path, name);
					const entry = entryKind(fileSystem, join(privateRoaming, path));
					if (entry === "file" && wantsFile) {
						probes.push(path);
						taken += 1;
						if (probes.length === PROCESS_VIEW_PROBES) break;
					} else if (entry === "directory" && wantsFolder) queue.push({
						path,
						depth: directory.depth + 1
					});
				}
			}
			return probes;
		};
		isPrivateFile = (fileSystem, privateRoaming, path) => entryKind(fileSystem, join(privateRoaming, path)) === "file";
		entryKind = (fileSystem, path) => {
			try {
				const entry = fileSystem.lstat(path);
				return entry.isFile() ? "file" : entry.isDirectory() ? "directory" : undefined;
			} catch (cause) {
				void cause;
				return undefined;
			}
		};
		present$1 = (fileSystem, path) => {
			try {
				fileSystem.lstat(path);
				return ok(true);
			} catch (cause) {
				if (isMissing(cause)) return ok(false);
				return err({
					path,
					message: `${path} could not be inspected, so REA cannot establish which ${CONFIG_FILE} Claude Desktop's MSIX package reads: ${errorMessage(cause)}. Repair access to that path, then rerun.`
				});
			}
		};
		isMissing = (cause) => cause instanceof Error && "code" in cause && (cause.code === "ENOENT" || cause.code === "ENOTDIR");
	})))();
}

//#endregion
//#region dist/application/ClineCliLocation.js
var resolveClineCliSettingsPath;
function init_ClineCliLocation() {
	return (init_ClineCliLocation = __esmMin((() => {
		init_result();
		init_ClientConfigRoots();
		resolveClineCliSettingsPath = (context) => {
			const { environment, home, platform } = context;
			const pathApi = platform === "win32" ? win32 : posix;
			const explicit = (variable) => {
				const value = environment[variable]?.trim();
				return value ? absoluteClientRoot(value, variable, "Cline CLI", platform) : undefined;
			};
			const explicitPath = explicit("CLINE_MCP_SETTINGS_PATH");
			if (explicitPath) return explicitPath;
			const explicitData = explicit("CLINE_DATA_DIR");
			if (explicitData) return explicitData.ok ? ok(pathApi.join(explicitData.value, "settings", "cline_mcp_settings.json")) : explicitData;
			const explicitDirectory = explicit("CLINE_DIR");
			if (explicitDirectory) return explicitDirectory.ok ? ok(pathApi.join(explicitDirectory.value, "data", "settings", "cline_mcp_settings.json")) : explicitDirectory;
			const envHome = environment.HOME?.trim();
			const profile = environment.USERPROFILE?.trim();
			const drive = environment.HOMEDRIVE?.trim();
			const path = environment.HOMEPATH?.trim();
			const rejectedHome = platform !== "win32" && environment.HOME !== undefined;
			const fallbackUncertain = platform === "win32" && (environment.USERPROFILE !== undefined || Boolean(environment.HOMEDRIVE && environment.HOMEPATH) || Boolean(environment.HOME)) || platform !== "win32" && environment.HOME === undefined && environment.USERPROFILE !== undefined;
			const nativeHome = rejectedHome ? "~" : fallbackUncertain ? undefined : home.trim() || "~";
			const clineHome = (envHome && envHome !== "~" ? envHome : undefined) || profile || (drive && path ? `${drive}${path}` : undefined) || nativeHome;
			if (!clineHome) return err({
				path: "",
				message: "Cannot determine Cline CLI's system home from the selected environment. Set CLINE_MCP_SETTINGS_PATH, CLINE_DATA_DIR, or CLINE_DIR to select its configuration location."
			});
			return ok(pathApi.join(clineHome, ".cline", "data", "settings", "cline_mcp_settings.json"));
		};
	})))();
}

//#endregion
//#region dist/application/McpRegistrationLocations.js
var selectedPath, rootContext, present, firstExisting, fixedProjectLocation;
function init_McpRegistrationLocations() {
	return (init_McpRegistrationLocations = __esmMin((() => {
		init_configurationErrors();
		init_callerPath();
		selectedPath = (path, context) => absoluteCallerPath(path, {
			cwd: context.cwd,
			platform: context.platform
		});
		rootContext = ({ home, platform, environment }) => ({
			home,
			platform,
			env: environment
		});
		present = async (path) => {
			try {
				await lstat(path);
				return true;
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return false;
				throw new ConfigurationError(`Cannot determine the registration location at ${path}. Repair its access or path before registering.`, { cause });
			}
		};
		firstExisting = async (candidates, fallback) => {
			for (const candidate of candidates) if (await present(candidate)) return candidate;
			return fallback;
		};
		fixedProjectLocation = (candidates) => async (context) => {
			const paths = candidates.map((path) => selectedPath(path, context));
			return { configPath: await firstExisting(paths, selectedPath(candidates[0], context)) };
		};
	})))();
}

//#endregion
//#region dist/application/KiloClientLocation.js
var KILO_GLOBAL_FILES, KILO_DIRECTORY_FILES, observedFiles, kiloRoot, kiloHomeDirectories, directoryFiles, kiloExplicitFile, kiloExplicitDirectory, kiloInlineConfiguration, kiloExtensionStorage, kiloDefaultLocation, kiloGlobalLocation;
function init_KiloClientLocation() {
	return (init_KiloClientLocation = __esmMin((() => {
		init_ClientConfigRoots();
		init_McpRegistrationLocations();
		init_configurationErrors();
		init_ClientConfigurationDocument();
		KILO_GLOBAL_FILES = [
			"config.json",
			"kilo.json",
			"kilo.jsonc",
			"opencode.json",
			"opencode.jsonc"
		];
		KILO_DIRECTORY_FILES = [
			"kilo.jsonc",
			"kilo.json",
			"opencode.jsonc",
			"opencode.json"
		];
		observedFiles = async (directory, names, authority) => {
			const files = [];
			for (const name of names) {
				const path = join(directory, name);
				if (await present(path)) files.push({
					path,
					authority
				});
			}
			return files;
		};
		kiloRoot = ({ root, path }) => path(join(xdgConfigHomeOrDefault(root), "kilo"));
		kiloHomeDirectories = async ({ root, path }) => {
			const directories = [];
			for (const name of [".kilocode", ".kilo"]) {
				const directory = path(join(root.home, name));
				if (await present(directory)) directories.push({
					path: directory,
					authority: "global"
				});
			}
			return directories;
		};
		directoryFiles = async (directories, custom, planned) => {
			const seen = new Set();
			const layers = [];
			for (const directory of directories) {
				if (seen.has(directory.path)) continue;
				seen.add(directory.path);
				if (!directory.path.endsWith(".kilo") && !directory.path.endsWith(".kilocode") && directory.path !== custom) continue;
				if (planned !== undefined && dirname(planned.path) === directory.path) layers.push(planned);
				layers.push(...await observedFiles(directory.path, KILO_DIRECTORY_FILES, directory.authority));
			}
			return layers;
		};
		kiloExplicitFile = ({ root, path }) => root.env.KILO_CONFIG ? path(root.env.KILO_CONFIG) : undefined;
		kiloExplicitDirectory = ({ root, path }) => root.env.KILO_CONFIG_DIR ? path(root.env.KILO_CONFIG_DIR) : undefined;
		kiloInlineConfiguration = (root) => {
			const text = root.env.KILO_CONFIG_CONTENT;
			if (!text) return undefined;
			try {
				return {
					origin: "KILO_CONFIG_CONTENT",
					parsed: parseClientConfiguration(text, "kilo")
				};
			} catch (cause) {
				throw new ConfigurationError("KILO_CONFIG_CONTENT cannot be admitted as Kilo configuration. Repair that selected inline configuration; no settings were written.", { cause });
			}
		};
		kiloExtensionStorage = (root) => join(vscodeUserDirectory(root), "globalStorage", "kilocode.kilo-code");
		kiloDefaultLocation = (context) => {
			const root = kiloRoot(context);
			const explicit = kiloExplicitFile(context);
			const custom = kiloExplicitDirectory(context);
			const homes = [".kilocode", ".kilo"].map((name) => context.path(join(context.root.home, name)));
			return {
				configPath: join(root, "kilo.json"),
				configPaths: [
					...KILO_GLOBAL_FILES.map((name) => join(root, name)),
					...explicit === undefined ? [] : [explicit],
					...[...homes, ...custom === undefined ? [] : [custom]].flatMap((directory) => KILO_DIRECTORY_FILES.map((name) => join(directory, name)))
				],
				markerPath: root,
				discoveryPaths: [
					root,
					...homes,
					...explicit === undefined ? [] : [explicit],
					...custom === undefined ? [] : [custom],
					kiloExtensionStorage(context.root)
				]
			};
		};
		kiloGlobalLocation = async (context) => {
			const root = kiloRoot(context);
			const layers = await observedFiles(root, KILO_GLOBAL_FILES, "global");
			const explicit = kiloExplicitFile(context);
			if (explicit !== undefined) {
				await present(explicit);
				layers.push({
					path: explicit,
					authority: "global"
				});
			}
			const custom = kiloExplicitDirectory(context);
			const directories = [{
				path: root,
				authority: "global"
			}, ...await kiloHomeDirectories(context)];
			if (custom !== undefined) directories.push({
				path: custom,
				authority: "global"
			});
			const observed = await directoryFiles(directories, custom);
			let configPath = observed.at(-1)?.path ?? layers.at(-1)?.path;
			if (custom !== undefined && ![...layers, ...observed].some((layer) => dirname(layer.path) === custom)) {
				await present(custom);
				configPath = join(custom, "kilo.json");
				layers.push(...await directoryFiles(directories, custom, {
					path: configPath,
					authority: "global"
				}));
			} else layers.push(...observed);
			configPath ??= join(root, "kilo.json");
			const inlineConfiguration = kiloInlineConfiguration(context.root);
			return {
				configPath,
				configPaths: layers.length === 0 ? [configPath] : layers.map((layer) => layer.path),
				...inlineConfiguration === undefined ? {} : { inlineConfiguration },
				markerPath: root,
				discoveryPaths: [kiloExtensionStorage(context.root)]
			};
		};
	})))();
}

//#endregion
//#region dist/application/McpRegistrationGit.js
var pathWithin, GIT_METADATA_BYTES, gitFailure, gitOutput, gitPath, nearestGitDirectory, primaryRoot, directoryPath, resolveKiloRegistrationWorktree;
function init_McpRegistrationGit() {
	return (init_McpRegistrationGit = __esmMin((() => {
		init_analysisErrorCore();
		init_analysisErrorCancellation();
		init_configurationErrors();
		init_strictUtf8();
		init_callerPath();
		init_ExecFileOutput();
		pathWithin = (root, path) => {
			const part = relative(root, path);
			return part !== ".." && !part.startsWith(`..${sep}`) && !isAbsolute(part);
		};
		GIT_METADATA_BYTES = 1024 * 1024;
		gitFailure = (cause) => cause instanceof ExecFileOutputCancelledError ? cancelledBy("Kilo project root discovery", carriedReason(cause.cause)) : new ConfigurationError("Kilo project root could not be established by read-only Git metadata. Repair Git or repository access, or register globally; no client settings were written.", { cause });
		gitOutput = async (context, cwd, arguments_) => {
			let observation;
			try {
				observation = await execFileBytes("git", arguments_, {
					cwd,
					env: context.environment,
					timeout: 1e4,
					maxBuffer: GIT_METADATA_BYTES,
					stopSignal: "SIGTERM",
					windowsHide: true,
					...context.signal === undefined ? {} : { signal: context.signal }
				});
			} catch (cause) {
				throw gitFailure(cause);
			}
			try {
				return decodeStrictUtf8(observation.stdout, "strip-signature");
			} catch {
				throw gitFailure(new Error("Git did not provide a complete UTF-8 metadata observation.", { cause: observation }));
			}
		};
		gitPath = async (context, cwd, field) => {
			const text = await gitOutput(context, cwd, ["rev-parse", field]);
			if (!text.endsWith("\n")) throw new ConfigurationError("Git metadata path has no protocol terminator; Kilo project root remains unknown.");
			let value = text.slice(0, -1);
			if (context.platform === "win32" && value.endsWith("\r")) value = value.slice(0, -1);
			if (value.length === 0) throw new ConfigurationError("Git returned an empty path; Kilo project root remains unknown.");
			return absoluteCallerPath(value, {
				cwd,
				platform: context.platform
			});
		};
		nearestGitDirectory = async (cwd) => {
			let directory = cwd;
			while (true) {
				try {
					await lstat(`${directory}${directory.endsWith(sep) ? "" : sep}.git`);
					return directory;
				} catch (cause) {
					if (!(cause instanceof Error && "code" in cause && cause.code === "ENOENT")) throw cause;
				}
				const parent = dirname(directory);
				if (parent === directory) return undefined;
				directory = parent;
			}
		};
		primaryRoot = async (context, root, gitDirectory, commonDirectory) => {
			if (gitDirectory === commonDirectory) return root;
			const listing = await gitOutput(context, root, [
				"worktree",
				"list",
				"--porcelain",
				"-z"
			]);
			const record = listing.split("\0\0", 1)[0]?.split("\0");
			const field = record?.find((item) => item.startsWith("worktree "));
			if (field === undefined || record?.includes("bare")) throw new ConfigurationError("Kilo primary worktree is unknown; no project settings were written.");
			const value = field.slice("worktree ".length);
			if (value.length === 0 || !listing.includes("\0\0")) throw new ConfigurationError("Git returned incomplete worktree metadata; no project settings were written.");
			return directoryPath(absoluteCallerPath(value, {
				cwd: root,
				platform: context.platform
			}));
		};
		directoryPath = async (path) => {
			const resolved = await realpath(path);
			if (!(await lstat(resolved)).isDirectory()) throw new ConfigurationError("Git metadata did not identify a directory; repair repository access or register globally. No settings were written.");
			return resolved;
		};
		resolveKiloRegistrationWorktree = async (context) => {
			try {
				const activeDirectory = await directoryPath(absoluteCallerPath(context.cwd, { platform: context.platform }));
				const gitCwd = await nearestGitDirectory(activeDirectory);
				if (gitCwd === undefined) throw new ConfigurationError("Kilo project registration needs a verified Git worktree boundary. Open a repository or register globally; no client settings were written.");
				const root = await directoryPath(await gitPath(context, gitCwd, "--show-toplevel"));
				const gitDirectory = await directoryPath(await gitPath(context, gitCwd, "--git-dir"));
				const commonDirectory = await directoryPath(await gitPath(context, gitCwd, "--git-common-dir"));
				if (!pathWithin(root, activeDirectory)) throw new ConfigurationError("Git's worktree does not contain the selected directory; Kilo project scope remains unknown.");
				return {
					activeDirectory,
					root,
					primaryRoot: await primaryRoot(context, root, gitDirectory, commonDirectory)
				};
			} catch (cause) {
				const failure = cause instanceof ConfigurationError || cause instanceof AnalysisCancelledError ? cause : gitFailure(cause);
				if (context.signal?.aborted === true) analysisErrorWithCancellation(failure, cancelledBy("Kilo project root discovery", context.signal));
				throw failure;
			}
		};
	})))();
}

//#endregion
//#region dist/application/McpRegistrationKiloLocations.js
var kiloContext, ancestorsThrough, projectDirectories, kiloProjectLocation;
function init_McpRegistrationKiloLocations() {
	return (init_McpRegistrationKiloLocations = __esmMin((() => {
		init_configurationErrors();
		init_KiloClientLocation();
		init_McpRegistrationGit();
		init_McpRegistrationLocations();
		kiloContext = (context) => ({
			root: rootContext(context),
			path: (path) => selectedPath(path, context)
		});
		ancestorsThrough = (directory, root) => {
			const directories = [];
			let current = directory;
			while (true) {
				directories.push(current);
				if (current === root) return directories;
				const parent = dirname(current);
				if (parent === current) throw new ConfigurationError("Kilo worktree boundary is not an ancestor; no project settings were written.");
				current = parent;
			}
		};
		projectDirectories = async (directories, authority) => {
			const found = [];
			for (const directory of directories) for (const name of [".kilocode", ".kilo"]) {
				const path = join(directory, name);
				if (await present(path)) found.push({
					path,
					authority
				});
			}
			return found;
		};
		kiloProjectLocation = async (context) => {
			if (["true", "1"].includes(context.environment.KILO_DISABLE_PROJECT_CONFIG?.toLowerCase() ?? "")) throw new ConfigurationError("KILO_DISABLE_PROJECT_CONFIG disables project configuration. Remove that selected override or register globally; no project settings were written.");
			const worktree = await resolveKiloRegistrationWorktree(context);
			const active = ancestorsThrough(worktree.activeDirectory, worktree.root);
			const kilo = kiloContext(context);
			const root = kiloRoot(kilo);
			const layers = await observedFiles(root, KILO_GLOBAL_FILES, "readonly");
			const explicit = kiloExplicitFile(kilo);
			if (explicit !== undefined) {
				await present(explicit);
				layers.push({
					path: explicit,
					authority: pathWithin(worktree.root, explicit) ? "project" : "readonly"
				});
			}
			for (const name of ["kilo", "opencode"]) for (const directory of [...active].reverse()) layers.push(...await observedFiles(directory, [`${name}.json`, `${name}.jsonc`], "project"));
			const primary = [];
			if (worktree.primaryRoot !== worktree.root) {
				const mirrored = join(worktree.primaryRoot, relative(worktree.root, worktree.activeDirectory));
				primary.push(...await projectDirectories(ancestorsThrough(mirrored, worktree.primaryRoot), "readonly"));
			}
			const nativeProject = await projectDirectories(active, "project");
			const custom = kiloExplicitDirectory(kilo);
			const directories = [
				{
					path: root,
					authority: "readonly"
				},
				...primary,
				...nativeProject,
				...await kiloHomeDirectories(kilo).then((items) => items.map((item) => ({
					...item,
					authority: "readonly"
				})))
			];
			if (custom !== undefined) directories.push({
				path: custom,
				authority: pathWithin(worktree.root, custom) ? "project" : "readonly"
			});
			const directoryLayers = await directoryFiles(directories, custom);
			const writable = [...layers, ...directoryLayers].filter((layer) => layer.authority === "project");
			let configPath = writable.at(-1)?.path;
			if (configPath === undefined) {
				const planned = join(worktree.activeDirectory, ".kilo");
				const activeIndex = directories.findIndex((directory) => directory.authority === "project");
				directories.splice(activeIndex < 0 ? 1 + primary.length : activeIndex, 0, {
					path: planned,
					authority: "project"
				});
				configPath = join(planned, "kilo.jsonc");
				const ordered = [];
				const seen = new Set();
				for (const directory of directories) {
					if (seen.has(directory.path)) continue;
					seen.add(directory.path);
					if (directory.path === planned) ordered.push({
						path: configPath,
						authority: "project"
					});
					else ordered.push(...await directoryFiles([directory], custom));
				}
				layers.push(...ordered);
			} else layers.push(...directoryLayers);
			const inlineConfiguration = kiloInlineConfiguration(kilo.root);
			return {
				configPath,
				configPaths: layers.map((layer) => layer.path),
				...inlineConfiguration === undefined ? {} : { inlineConfiguration }
			};
		};
	})))();
}

//#endregion
//#region dist/application/SupportedClients.js
var traeUserDirectory, claudeDesktopLocation, claudeCodeConfigDirectory, claudeCodeMarkerDirectory, codexDirectory, kimiDirectory, lmStudioLocation, qoderDirectory, factoryDirectory, qwenCodeDirectory, grokDirectory, dshDirectory, dshHomeDirectory, dshPatchDirectory, hermesDirectory, grokBotDirectory, GROK_BOT_MANUAL_REGISTRATION_REMEDIATION, manualRegistrationRemediation, registrationPersistenceDetail, runningClientRewriteNotice, registrationWriteBlocker, appDataRedirection, OMP_PROFILE_NAME, OMP_RESERVED_PROFILE, ompAgentDirectory, piAgentDirectory, copilotDirectory, commandCodeDirectory, openCodeOverrideDirectory, opencodeDirectory, openCodeConfigurationPaths, existingOpenCodeConfigPath, geminiSettings, devinDirectory, clineSettingsDirectory, clineVscodeSettingsDirectory, ZED_FLATPAK_CONFIG, directoryPresent, sameDirectory, zedLocation, regularPathPresent, mcporterLocation, MCPORTER_URL_FIELDS, MCPORTER_STDIO_INCOMPATIBILITIES, ampLocation, fxLocation, junieLocation, gooseUserConfigPath, gooseAdditionalConfigFiles, gooseLocation, gooseConfigPaths, freebuffProfileDirectory, kiloTableContext, KiloPathDependenceError, kiloPathFailure, kiloLocation, kiloLayeredLocation, kiloCandidatePaths, kiloDiscoveryPaths, defineClient, SUPPORTED_CLIENT_DEFINITIONS, supportedClientDefinition, clientEvidencePaths, clientOwnershipEvidencePaths, clientSharedRegistrationPaths, resolvePath, resolveLocation, layerLoadOrder, supportedClients, resolveSupportedClients, clientSkillDirectories;
function init_SupportedClients() {
	return (init_SupportedClients = __esmMin((() => {
		init_result();
		init_HermesClientHome();
		init_unicodeCodePointOrder();
		init_callerPath();
		init_ClientConfigRoots();
		init_ClaudeDesktopConfigLocation();
		init_ClineCliLocation();
		init_configurationErrors();
		init_KiloClientLocation();
		init_MsixPackageStorage();
		init_McpRegistrationKiloLocations();
		init_errorMessage();
		traeUserDirectory = ({ home, platform, env }) => {
			if (platform === "win32") return join(windowsAppDataRoots(home, env).roaming, "Trae", "User");
			if (platform === "darwin") return join(home, "Library", "Application Support", "Trae", "User");
			return join(xdgConfigHomeOrDefault({
				home,
				env
			}), "Trae", "User");
		};
		claudeDesktopLocation = (context) => {
			if (context.platform === "win32") return resolveWindowsClaudeDesktopLocation(context.home, context.env);
			const directory = context.platform === "linux" ? join(xdgConfigHomeOrDefault(context), "Claude") : join(context.home, "Library", "Application Support", "Claude");
			return ok({
				configPath: join(directory, "claude_desktop_config.json"),
				markerPath: directory
			});
		};
		claudeCodeConfigDirectory = ({ home, env }) => env.CLAUDE_CONFIG_DIR || home;
		claudeCodeMarkerDirectory = ({ home, env }) => env.CLAUDE_CONFIG_DIR || join(home, ".claude");
		codexDirectory = ({ home, env }) => env.CODEX_HOME || join(home, ".codex");
		kimiDirectory = ({ home, env }) => env.KIMI_CODE_HOME || join(home, ".kimi-code");
		lmStudioLocation = ({ home }) => {
			const pointerPath = join(home, ".lmstudio-home-pointer");
			let directory;
			try {
				directory = readFileSync(pointerPath, "utf8").trim();
			} catch (cause) {
				if (!(cause instanceof Error && "code" in cause && cause.code === "ENOENT")) return err({
					path: pointerPath,
					message: `${pointerPath} could not be read, so REA cannot establish which LM Studio home holds mcp.json: ${errorMessage(cause)}. Repair access to that file, then rerun.`
				});
				const cache = join(home, ".cache", "lm-studio");
				directory = existsSync(cache) ? cache : join(home, ".lmstudio");
			}
			if (!isAbsolute(directory)) return err({
				path: pointerPath,
				message: `${pointerPath} does not hold an absolute LM Studio home path. Correct or remove that file, then rerun.`
			});
			return ok({
				configPath: join(directory, "mcp.json"),
				markerPath: directory
			});
		};
		qoderDirectory = ({ home, env }) => env.QODER_CONFIG_DIR || join(home, ".qoder");
		factoryDirectory = ({ home, env }) => join(env.FACTORY_HOME_OVERRIDE || home, ".factory");
		qwenCodeDirectory = ({ home, env }) => {
			const override = env.QWEN_HOME;
			if (!override) return join(home, ".qwen");
			const expanded = override === "~" ? home : override.startsWith("~/") || override.startsWith("~\\") ? join(home, ...override.slice(2).split(/[/\\]+/).filter(Boolean)) : override;
			return isAbsolute(expanded) ? expanded : resolve(expanded);
		};
		grokDirectory = ({ home, env }) => env.GROK_HOME || join(home, ".grok");
		dshDirectory = (home, override, fallback) => {
			const selected = override !== undefined && override.trim().length > 0 ? override : join(home, fallback);
			const expanded = selected === "~" ? home : selected.startsWith("~/") || selected.startsWith("~\\") ? join(home, selected.slice(2)) : selected;
			return resolve(expanded);
		};
		dshHomeDirectory = ({ home, env }) => dshDirectory(home, env.DSH_HOME, ".dsh");
		dshPatchDirectory = (context) => join(dshHomeDirectory(context), "cordis.patch.yml");
		hermesDirectory = ({ home, platform, env }) => resolveHermesClientHome(home, platform, env);
		grokBotDirectory = ({ home, env }) => {
			const root = env.SAND_DATA_ROOT;
			return root !== undefined && root !== "" && isAbsolute(root) ? root : join(home, ".grokbot");
		};
		GROK_BOT_MANUAL_REGISTRATION_REMEDIATION = "Grok Bot keeps connectors in the signed-in account and runs them on its hosted computer. Setup does not write that account store, and a data-directory mcp.json is not a registration. In the Grok Bot chat, add a custom MCP server named rea that runs on the Bot's computer with `npx -y rea-agents@<version> mcp`. Do not put credentials in the command or arguments. A stdio server on this machine is not attached.";
		manualRegistrationRemediation = (clientName) => clientName === "grok_bot" ? GROK_BOT_MANUAL_REGISTRATION_REMEDIATION : undefined;
		registrationPersistenceDetail = (client) => {
			const name = client.displayName ?? client.name;
			const msix = client.msixPackage;
			const packageDetail = msix === undefined ? undefined : client.configPath === msix.privateConfigPath ? `${name} is installed as MSIX package ${msix.packageFamilyName}, which reads this package-private file instead of ${msix.appDataConfigPath}.` : `${name} is installed as MSIX package ${msix.packageFamilyName}, which reads this file until it saves its own copy at ${msix.privateConfigPath}.`;
			const quitDetail = client.quitBeforeSetup === true ? `Quit ${name} fully before approving; closing its window is not enough. A running ${name} can rewrite this file from memory and drop the registration. Start it again after setup.` : undefined;
			const details = [packageDetail, quitDetail].filter((detail) => detail !== undefined);
			return details.length === 0 ? undefined : details.join(" ");
		};
		runningClientRewriteNotice = (client) => {
			if (client.quitBeforeSetup !== true) return undefined;
			const name = client.displayName ?? client.name;
			return `A running ${name} can rewrite its configuration from memory and drop the registration. If ${name} was running, quit it fully (closing its window is not enough), rerun rea mcp add, then start ${name} again.`;
		};
		registrationWriteBlocker = (client, operation) => {
			const msix = client.msixPackage;
			if (msix === undefined || msix.processView === "direct") return undefined;
			const name = client.displayName ?? client.name;
			if (msix.processView === "redirected") return `This process was started from ${name}'s MSIX package ${msix.packageFamilyName}: its AppData is redirected into that package, so ${name} is running and would overwrite ${msix.privateConfigPath} from memory. Quit ${name} fully, then rerun ${operation} from a terminal that ${name} did not start.`;
			const manualEdit = operation !== "uninstall" ? `Add REA's entry to ${client.configPath} by hand` : `Remove REA's entry by hand from each of ${msix.privateConfigPath} and ${msix.appDataConfigPath} that has one`;
			return `REA cannot tell whether ${name}'s MSIX package ${msix.packageFamilyName} started this process, because no private file under ${dirname(dirname(msix.privateConfigPath))} could be compared with ${dirname(dirname(msix.appDataConfigPath))}, and a ${name} that started it would overwrite the change from memory. ${manualEdit} while ${name} is fully quit, or rerun ${operation} from a terminal that ${name} did not start once REA can compare a private file there.`;
		};
		appDataRedirection = (clients) => clients.find(({ msixPackage }) => msixPackage?.processView === "redirected")?.msixPackage;
		OMP_PROFILE_NAME = /^[a-z0-9][a-z0-9._-]{0,63}$/u;
		OMP_RESERVED_PROFILE = /^(?:CON|PRN|AUX|NUL|COM[0-9]|LPT[0-9])(?:\..*)?$/iu;
		ompAgentDirectory = (context) => {
			const root = join(context.home, context.env.PI_CONFIG_DIR || ".omp");
			const profile = (context.env.OMP_PROFILE ?? context.env.PI_PROFILE)?.trim();
			if (profile !== undefined && profile !== "" && profile !== "default") {
				if (!OMP_PROFILE_NAME.test(profile) || profile.endsWith(".") || OMP_RESERVED_PROFILE.test(profile)) return err({
					path: root,
					message: `Invalid OMP profile ${JSON.stringify(profile)}: names must match ^[a-z0-9][a-z0-9._-]{0,63}$, cannot end with ".", and cannot be a Windows reserved device name (CON, PRN, AUX, NUL, COM0-9, LPT0-9, including extensions). Repair OMP_PROFILE or PI_PROFILE before configuring OMP.`
				});
				return ok(join(root, "profiles", profile, "agent"));
			}
			const override = context.env.PI_CODING_AGENT_DIR;
			return ok(override ? resolve(override) : join(root, "agent"));
		};
		piAgentDirectory = ({ home, platform, env }) => {
			const paths = platform === "win32" ? win32 : { join };
			let directory = env.PI_CODING_AGENT_DIR;
			if (!directory) return paths.join(home, ".pi", "agent");
			if (platform === "win32" && directory.startsWith("/") && !directory.startsWith("//") && !directory.includes("\\")) {
				const drive = /^\/(?:mnt\/|cygdrive\/)?([a-z])(?:\/(.*))?$/iu.exec(directory);
				if (drive !== null) directory = `${drive[1]?.toUpperCase()}:\\${drive[2]?.replaceAll("/", "\\") ?? ""}`;
			}
			if (directory === "~") return home;
			if (directory.startsWith("~/") || platform === "win32" && directory.startsWith("~\\")) return paths.join(home, directory.slice(2));
			if (directory.startsWith("file://")) return fileURLToPath(directory, { windows: platform === "win32" });
			return directory;
		};
		copilotDirectory = ({ home, env }) => env.COPILOT_HOME || join(home, ".copilot");
		commandCodeDirectory = ({ home }) => join(home, ".commandcode");
		openCodeOverrideDirectory = (env) => {
			const directory = env.OPENCODE_CONFIG_DIR;
			return directory === undefined || directory === "" ? undefined : directory;
		};
		opencodeDirectory = (context) => openCodeOverrideDirectory(context.env) ?? join(xdgConfigHomeOrDefault(context), "opencode");
		openCodeConfigurationPaths = (context) => {
			const directory = join(xdgConfigHomeOrDefault(context), "opencode");
			const overrideDirectory = openCodeOverrideDirectory(context.env);
			const paths = [
				join(directory, "config.json"),
				join(directory, "opencode.json"),
				join(directory, "opencode.jsonc"),
				...context.env.OPENCODE_CONFIG ? [context.env.OPENCODE_CONFIG] : [],
				...overrideDirectory !== undefined ? [join(overrideDirectory, "opencode.json"), join(overrideDirectory, "opencode.jsonc")] : []
			];
			const resolved = paths.map((path) => resolve(path));
			return resolved.filter((path, index) => resolved.lastIndexOf(path) === index);
		};
		existingOpenCodeConfigPath = (context) => {
			const overrideDirectory = openCodeOverrideDirectory(context.env);
			const candidates = overrideDirectory !== undefined ? [join(overrideDirectory, "opencode.json"), join(overrideDirectory, "opencode.jsonc")].map((path) => resolve(path)) : context.env.OPENCODE_CONFIG ? [resolve(context.env.OPENCODE_CONFIG)] : [join(opencodeDirectory(context), "opencode.json"), join(opencodeDirectory(context), "opencode.jsonc")].map((path) => resolve(path));
			return [...candidates].reverse().find((path) => {
				try {
					lstatSync(path);
					return true;
				} catch (cause) {
					return !(cause instanceof Error && "code" in cause && cause.code === "ENOENT");
				}
			}) ?? resolve(overrideDirectory !== undefined ? join(overrideDirectory, "opencode.json") : context.env.OPENCODE_CONFIG || join(opencodeDirectory(context), "opencode.json"));
		};
		geminiSettings = ({ home, platform, env }) => {
			const system = env.GEMINI_CLI_SYSTEM_SETTINGS_PATH || (platform === "darwin" ? "/Library/Application Support/GeminiCli/settings.json" : platform === "win32" ? "C:\\ProgramData\\gemini-cli\\settings.json" : "/etc/gemini-cli/settings.json");
			const trustOverride = env.GEMINI_RESTRICTED_MODE === "true" || env.GEMINI_CLI_TRUST_WORKSPACE === "false" ? false : env.GEMINI_CLI_TRUST_WORKSPACE === "true" ? true : undefined;
			return {
				systemPath: system,
				defaultsPath: env.GEMINI_CLI_SYSTEM_DEFAULTS_PATH || join(dirname(system), "system-defaults.json"),
				workspaceDirectory: process.cwd(),
				trustedFoldersPath: env.GEMINI_CLI_TRUSTED_FOLDERS_PATH || join(env.GEMINI_CLI_HOME || home, ".gemini", "trustedFolders.json"),
				...trustOverride === undefined ? {} : { trustOverride },
				platform
			};
		};
		devinDirectory = ({ home, platform, env }) => platform === "win32" ? join(windowsAppDataRoots(home, env).roaming, "devin") : join(xdgConfigHomeOrDefault({
			home,
			env
		}), "devin");
		clineSettingsDirectory = (dataFolder) => (context) => join(vscodeUserDirectory(context, dataFolder), "globalStorage", "saoudrizwan.claude-dev", "settings");
		clineVscodeSettingsDirectory = clineSettingsDirectory("Code");
		ZED_FLATPAK_CONFIG = [
			".var",
			"app",
			"dev.zed.Zed",
			"config"
		];
		directoryPresent = (path) => {
			try {
				lstatSync(path);
				return ok(true);
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return ok(false);
				return err({
					path,
					message: `Cannot determine whether ${path} exists: ${errorMessage(cause)}. Repair its access before configuring Zed.`
				});
			}
		};
		sameDirectory = (first, second) => {
			const identities = [];
			for (const path of [first, second]) {
				try {
					const { dev, ino } = statSync(path, { bigint: true });
					identities.push({
						dev,
						ino
					});
				} catch (cause) {
					return err({
						path,
						message: `Cannot resolve ${path}: ${errorMessage(cause)}. Repair it before configuring Zed.`
					});
				}
			}
			const [a, b] = identities;
			return ok(a !== undefined && b !== undefined && a.dev === b.dev && a.ino === b.ino);
		};
		zedLocation = ({ home, platform, env }) => {
			const at = (directory) => ({
				configPath: join(directory, "settings.json"),
				markerPath: directory
			});
			if (platform === "darwin") return ok(at(join(home, ".config", "zed")));
			if (platform === "win32") return ok(at(join(windowsAppDataRoots(home, env).roaming, "Zed")));
			const flatpakOverride = env.FLATPAK_XDG_CONFIG_HOME;
			if (flatpakOverride) {
				const selected = absoluteClientRoot(flatpakOverride, "FLATPAK_XDG_CONFIG_HOME", "Zed", platform);
				return selected.ok ? ok(at(join(selected.value, "zed"))) : selected;
			}
			const native = join(absoluteXdgConfigHome({
				home,
				env
			}), "zed");
			const sandboxed = join(home, ...ZED_FLATPAK_CONFIG, "zed");
			const flatpak = directoryPresent(sandboxed);
			if (!flatpak.ok) return flatpak;
			if (!flatpak.value) return ok(at(native));
			const nativePresent = directoryPresent(native);
			if (!nativePresent.ok) return nativePresent;
			if (!nativePresent.value) return ok(at(sandboxed));
			const same = sameDirectory(native, sandboxed);
			if (!same.ok) return same;
			return same.value ? ok(at(native)) : err({
				path: sandboxed,
				message: `Both ${native} and the Flatpak Zed folder ${sandboxed} exist, so REA cannot tell which Zed you use. Remove the configuration of the Zed you no longer use, then configure Zed again.`
			});
		};
		regularPathPresent = (path) => {
			try {
				lstatSync(path);
				return ok(true);
			} catch (cause) {
				if (cause instanceof Error && "code" in cause && cause.code === "ENOENT") return ok(false);
				return err({
					path,
					message: `Cannot determine whether ${path} exists: ${errorMessage(cause)}. Repair its access before configuring MCPorter.`
				});
			}
		};
		mcporterLocation = ({ home, platform, env }) => {
			const pathApi = platform === "win32" ? win32 : posix;
			const legacy = join(home, ".mcporter");
			const selected = env.MCPORTER_CONFIG?.trim();
			if (selected) {
				const path = mcporterExpandHome(selected, home);
				const absolute = absoluteClientRoot(path, "MCPORTER_CONFIG", "MCPorter", platform);
				return absolute.ok ? ok({
					configPath: pathApi.resolve(absolute.value),
					markerPath: pathApi.resolve(absolute.value)
				}) : absolute;
			}
			const configHome = mcporterXdgConfigHome({
				home,
				platform,
				env
			});
			const base = configHome === undefined ? legacy : join(configHome, "mcporter");
			const candidates = [base, ...base === legacy ? [] : [legacy]].flatMap((directory) => [join(directory, "mcporter.json"), join(directory, "mcporter.jsonc")]);
			for (const candidate of candidates) {
				const present = regularPathPresent(candidate);
				if (!present.ok) return present;
				if (present.value) return ok({
					configPath: candidate,
					markerPath: dirname(candidate)
				});
			}
			return ok({
				configPath: join(base, "mcporter.json"),
				markerPath: base
			});
		};
		MCPORTER_URL_FIELDS = [
			"baseUrl",
			"base_url",
			"url",
			"serverUrl",
			"server_url"
		];
		MCPORTER_STDIO_INCOMPATIBILITIES = [...MCPORTER_URL_FIELDS.map((field) => ({
			kind: "invalid-string",
			field
		})), ...MCPORTER_URL_FIELDS.map((field, index) => index === 0 ? {
			kind: "truthy",
			field
		} : {
			kind: "all",
			conditions: [...MCPORTER_URL_FIELDS.slice(0, index).map((prior) => ({
				kind: "nullish",
				field: prior
			})), {
				kind: "truthy",
				field
			}]
		})];
		ampLocation = ({ home }) => {
			const directory = join(home, ".config", "amp");
			const candidates = ["settings.json", "settings.jsonc"].map((name) => join(directory, name));
			const present = [];
			for (const candidate of candidates) {
				try {
					lstatSync(candidate);
					present.push(candidate);
				} catch (cause) {
					if (!(cause instanceof Error && "code" in cause && cause.code === "ENOENT")) return err({
						path: candidate,
						message: `Cannot determine whether ${candidate} exists: ${errorMessage(cause)}. Repair its access before configuring Amp.`
					});
				}
			}
			if (present.length > 1) return err({
				path: directory,
				message: `Both ${candidates[0]} and ${candidates[1]} exist, and Amp does not document which one it reads. Merge them into one file before configuring Amp.`
			});
			return ok({
				configPath: present[0] ?? join(directory, "settings.json"),
				markerPath: directory
			});
		};
		fxLocation = ({ home, platform, env }) => {
			const value = env.FX_HOME;
			const pathApi = platform === "win32" ? win32 : posix;
			if (!value) {
				const directory = join(home, ".fx");
				return ok({
					configPath: join(directory, "mcp.json"),
					markerPath: directory
				});
			}
			const trimmed = value.replace(/\/+$/u, "");
			const dotSegment = trimmed.split(/[\\/]/u).some((segment) => segment === "." || segment === "..");
			if (!pathApi.isAbsolute(value) || trimmed.length === 0 || dotSegment || pathApi.parse(trimmed).root === trimmed || trimmed === home.replace(/[\\/]+$/u, "")) return err({
				path: value,
				message: "FX_HOME must be an absolute path without . or .. segments, other than the root and home folders. Repair FX_HOME before configuring fx; no settings were written."
			});
			return ok({
				configPath: pathApi.join(trimmed, "mcp.json"),
				markerPath: trimmed
			});
		};
		junieLocation = ({ home, platform, env }) => {
			const selected = env.JUNIE_HOME ? absoluteClientRoot(env.JUNIE_HOME, "JUNIE_HOME", "Junie", platform) : ok(join(home, ".junie"));
			return selected.ok ? ok({
				configPath: join(selected.value, "mcp", "mcp.json"),
				markerPath: selected.value
			}) : selected;
		};
		gooseUserConfigPath = ({ home, platform, env }) => {
			const pathApi = platform === "win32" ? win32 : posix;
			const root = env.GOOSE_PATH_ROOT;
			if (root && pathApi.isAbsolute(root)) return pathApi.join(root, "config", "config.yaml");
			return platform === "win32" ? join(windowsAppDataRoots(home, env).roaming, "Block", "goose", "config", "config.yaml") : join(absoluteXdgConfigHome({
				home,
				env
			}), "goose", "config.yaml");
		};
		gooseAdditionalConfigFiles = ({ platform, env }) => {
			const value = env.GOOSE_ADDITIONAL_CONFIG_FILES ?? "";
			if (platform !== "win32") return value.split(":").filter((path) => path.length > 0);
			const paths = [];
			let current = "";
			let quoted = false;
			for (const character of value) {
				if (character === "\"") quoted = !quoted;
				else if (character === ";" && !quoted) {
					paths.push(current);
					current = "";
				} else current += character;
			}
			paths.push(current);
			return paths.filter((path) => path.length > 0);
		};
		gooseLocation = (context) => {
			const configPath = gooseUserConfigPath(context);
			for (const path of gooseAdditionalConfigFiles(context)) {
				const dependence = clientPathDependence(path, context.platform);
				if (dependence === "relative") return err({
					path,
					message: `GOOSE_ADDITIONAL_CONFIG_FILES names the relative path ${path}, which Goose resolves against its own working directory. Use absolute paths before configuring Goose.`
				});
				if (dependence === "driveless") return err({
					path,
					message: `GOOSE_ADDITIONAL_CONFIG_FILES names ${path}, which has no drive, so the file Goose reads depends on its current drive. Use a path with a drive letter or a UNC path before configuring Goose.`
				});
			}
			return ok({
				configPath,
				markerPath: configPath
			});
		};
		gooseConfigPaths = (context) => [
			context.systemPaths?.gooseSystemConfig ?? (context.platform === "win32" ? win32.join(context.env.PROGRAMDATA || "C:\\ProgramData", "goose", "config.yaml") : "/etc/goose/config.yaml"),
			...gooseAdditionalConfigFiles(context),
			gooseUserConfigPath(context)
		];
		freebuffProfileDirectory = ({ home }) => join(home, ".config", "freebuff-desktop");
		kiloTableContext = (context) => ({
			root: context,
			path: (path) => {
				const dependence = clientPathDependence(path, context.platform);
				if (dependence === undefined) return absoluteCallerPath(path, { platform: context.platform });
				throw new KiloPathDependenceError(path, dependence);
			}
		});
		KiloPathDependenceError = class extends Error {
			path;
			constructor(path, dependence) {
				super(dependence === "relative" ? `Kilo's configuration path ${path} is relative, so the file Kilo reads depends on its working directory. Set an absolute path before configuring Kilo.` : `Kilo's configuration path ${path} has no drive, so the file Kilo reads depends on its current drive. Set a path with a drive letter or a UNC path before configuring Kilo.`);
				this.path = path;
			}
		};
		kiloPathFailure = (cause) => {
			if (cause instanceof KiloPathDependenceError) return {
				path: cause.path,
				message: cause.message
			};
			throw cause;
		};
		kiloLocation = (context) => {
			try {
				const { configPath, markerPath } = kiloDefaultLocation(kiloTableContext(context));
				return ok({
					configPath,
					markerPath
				});
			} catch (cause) {
				return err(kiloPathFailure(cause));
			}
		};
		kiloLayeredLocation = async (context) => {
			const kilo = kiloTableContext(context);
			try {
				const { configPath, configPaths, inlineConfiguration } = await kiloGlobalLocation(kilo);
				return ok({
					configPath,
					configPaths,
					...inlineConfiguration === undefined ? {} : { inlineConfiguration }
				});
			} catch (cause) {
				if (cause instanceof ConfigurationError) return err({
					path: kiloDefaultLocation(kilo).markerPath,
					message: cause.message,
					failure: cause
				});
				return err(kiloPathFailure(cause));
			}
		};
		kiloCandidatePaths = (context) => {
			try {
				return kiloDefaultLocation(kiloTableContext(context)).configPaths;
			} catch (cause) {
				kiloPathFailure(cause);
				return [];
			}
		};
		kiloDiscoveryPaths = (context) => {
			try {
				return kiloDefaultLocation(kiloTableContext(context)).discoveryPaths;
			} catch (cause) {
				kiloPathFailure(cause);
				return [];
			}
		};
		defineClient = (definition) => {
			const { registrationConnection, ...metadata } = definition;
			return {
				...metadata,
				registrationProfile: {
					nativeClient: definition.name,
					connection: registrationConnection
				}
			};
		};
		SUPPORTED_CLIENT_DEFINITIONS = [
			defineClient({
				name: "claude_code",
				mcpAdd: { projectPaths: [".mcp.json"] },
				registrationConnection: {
					kind: "flat",
					fields: ["type", "url"],
					stdio: [{
						kind: "optional-enum",
						field: "type",
						values: ["stdio"]
					}, {
						kind: "present",
						field: "url"
					}]
				},
				displayName: "Claude Code",
				skillPath: (context) => join(claudeCodeMarkerDirectory(context), "skills"),
				configPath: (context) => join(claudeCodeConfigDirectory(context), ".claude.json"),
				markerPath: claudeCodeMarkerDirectory,
				format: "claude_code"
			}),
			defineClient({
				name: "claude_desktop",
				mcpAdd: {},
				registrationConnection: {
					kind: "flat",
					fields: ["type"],
					stdio: [{
						kind: "optional-enum",
						field: "type",
						values: ["stdio"]
					}]
				},
				displayName: "Claude Desktop",
				location: claudeDesktopLocation,
				quitBeforeSetup: true,
				format: "json"
			}),
			defineClient({
				name: "codex",
				mcpAdd: { projectPaths: [".codex/config.toml"] },
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "non-nullish",
						field: "url"
					}]
				},
				displayName: "Codex",
				configPath: (context) => appendCallerPath(codexDirectory(context), "config.toml"),
				markerPath: codexDirectory,
				format: "toml"
			}),
			defineClient({
				name: "cursor",
				mcpAdd: { projectPaths: [".cursor/mcp.json"] },
				registrationConnection: {
					kind: "flat",
					fields: ["type", "url"],
					stdio: [{
						kind: "optional-enum",
						field: "type",
						values: ["stdio"]
					}, {
						kind: "present",
						field: "url"
					}]
				},
				displayName: "Cursor",
				configPath: [".cursor", "mcp.json"],
				markerPath: [".cursor"],
				format: "json"
			}),
			defineClient({
				name: "codebuddy",
				registrationConnection: {
					kind: "stdio-only",
					documentedFields: ["env", "type"]
				},
				displayName: "CodeBuddy",
				skillPath: [".codebuddy", "skills"],
				configPath: [".codebuddy", "mcp.json"],
				markerPath: [".codebuddy"],
				format: "json"
			}),
			defineClient({
				name: "cline",
				mcpAdd: {},
				registrationConnection: { kind: "cline" },
				displayName: "Cline CLI",
				location: ({ home, env, platform }) => {
					const selected = resolveClineCliSettingsPath({
						home,
						platform,
						environment: env
					});
					const pathApi = platform === "win32" ? win32 : posix;
					return selected.ok ? ok({
						configPath: selected.value,
						markerPath: pathApi.dirname(selected.value)
					}) : selected;
				},
				format: "json"
			}),
			defineClient({
				name: "gemini_cli",
				mcpAdd: {
					aliases: ["gemini"],
					projectPaths: [".gemini/settings.json"]
				},
				registrationConnection: {
					kind: "flat",
					fields: [
						"type",
						"url",
						"httpUrl"
					],
					stdio: [{
						kind: "truthy",
						field: "httpUrl"
					}, {
						kind: "truthy",
						field: "url"
					}]
				},
				displayName: "Gemini CLI",
				geminiSettings,
				configPath: ({ home, env }) => join(env.GEMINI_CLI_HOME || home, ".gemini", "settings.json"),
				markerPath: ({ home, env }) => join(env.GEMINI_CLI_HOME || home, ".gemini"),
				discoveryPaths: (context) => {
					const root = join(context.env.GEMINI_CLI_HOME || context.home, ".gemini");
					return [
						join(root, "settings.json"),
						geminiSettings(context).trustedFoldersPath,
						join(root, "tmp")
					];
				},
				skillPath: ({ home, env }) => join(env.GEMINI_CLI_HOME || home, ".agents", "skills"),
				format: "json"
			}),
			defineClient({
				name: "windsurf",
				mcpAdd: { aliases: ["codeium", "cascade"] },
				registrationConnection: {
					kind: "flat",
					fields: ["serverUrl", "url"],
					stdio: [{
						kind: "present",
						field: "serverUrl"
					}, {
						kind: "present",
						field: "url"
					}]
				},
				displayName: "Windsurf",
				configPath: [
					".codeium",
					"windsurf",
					"mcp_config.json"
				],
				markerPath: [".codeium", "windsurf"],
				format: "json"
			}),
			defineClient({
				name: "devin",
				registrationConnection: {
					kind: "flat",
					fields: ["url", "transport"],
					stdio: [{
						kind: "optional-enum",
						field: "transport",
						values: ["stdio"]
					}, {
						kind: "present",
						field: "url"
					}]
				},
				displayName: "Devin",
				configPath: ({ home, platform, env }) => join(devinDirectory({
					home,
					platform,
					env
				}), "mcp_config.json"),
				markerPath: devinDirectory,
				format: "json"
			}),
			defineClient({
				name: "opencode",
				mcpAdd: { projectPaths: [
					"opencode.jsonc",
					"opencode.json",
					".opencode/opencode.jsonc",
					".opencode/opencode.json"
				] },
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "required-enum",
						field: "type",
						values: ["local"]
					}]
				},
				displayName: "OpenCode",
				configPath: existingOpenCodeConfigPath,
				configPaths: openCodeConfigurationPaths,
				markerPath: opencodeDirectory,
				format: "opencode"
			}),
			defineClient({
				name: "antigravity",
				mcpAdd: {},
				registrationConnection: {
					kind: "flat",
					fields: ["serverUrl", "url"],
					stdio: [{
						kind: "present",
						field: "serverUrl"
					}, {
						kind: "present",
						field: "url"
					}]
				},
				displayName: "Antigravity",
				skillPath: [
					".gemini",
					"config",
					"skills"
				],
				configPath: [
					".gemini",
					"config",
					"mcp_config.json"
				],
				markerPath: [".gemini", "config"],
				format: "json"
			}),
			defineClient({
				name: "copilot_cli",
				mcpAdd: {
					projectPaths: [".mcp.json", ".github/mcp.json"],
					projectFormat: "copilot_cli_project"
				},
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "optional-enum",
						field: "type",
						values: ["stdio", "local"]
					}, {
						kind: "present",
						field: "url"
					}]
				},
				displayName: "GitHub Copilot CLI",
				configPath: (context) => join(copilotDirectory(context), "mcp-config.json"),
				markerPath: copilotDirectory,
				format: "copilot_cli"
			}),
			defineClient({
				name: "commandcode",
				registrationConnection: { kind: "commandcode" },
				displayName: "Command Code",
				configPath: (context) => join(commandCodeDirectory(context), "mcp.json"),
				markerPath: commandCodeDirectory,
				format: "commandcode"
			}),
			defineClient({
				name: "qwen_code",
				registrationConnection: {
					kind: "flat",
					fields: [
						"type",
						"httpUrl",
						"url"
					],
					stdio: [
						{
							kind: "truthy",
							field: "httpUrl"
						},
						{
							kind: "truthy",
							field: "url"
						},
						{
							kind: "equals",
							field: "type",
							value: "sdk"
						}
					]
				},
				displayName: "Qwen Code",
				configPath: (context) => join(qwenCodeDirectory(context), "settings.json"),
				markerPath: qwenCodeDirectory,
				format: "json"
			}),
			defineClient({
				name: "kimi",
				mcpAdd: {
					aliases: ["kimi"],
					projectPaths: [".kimi-code/mcp.json"]
				},
				registrationConnection: {
					kind: "flat",
					fields: [
						"type",
						"url",
						"transport"
					],
					stdio: [
						{
							kind: "optional-enum",
							field: "type",
							values: ["stdio"]
						},
						{
							kind: "optional-enum",
							field: "transport",
							values: ["stdio"]
						},
						{
							kind: "present",
							field: "url"
						}
					]
				},
				displayName: "Kimi Code",
				configPath: (context) => join(kimiDirectory(context), "mcp.json"),
				markerPath: kimiDirectory,
				format: "kimi"
			}),
			defineClient({
				name: "vscode",
				mcpAdd: {
					aliases: ["github-copilot"],
					projectPaths: [".vscode/mcp.json"]
				},
				registrationConnection: {
					kind: "flat",
					fields: ["url", "transport"],
					stdio: [
						{
							kind: "required-enum",
							field: "type",
							values: ["stdio"]
						},
						{
							kind: "optional-enum",
							field: "transport",
							values: ["stdio"]
						},
						{
							kind: "present",
							field: "url"
						}
					]
				},
				displayName: "VS Code",
				configPath: (context) => join(vscodeUserDirectory(context), "mcp.json"),
				markerPath: vscodeUserDirectory,
				format: "vscode"
			}),
			defineClient({
				name: "trae",
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "present",
						field: "url"
					}]
				},
				displayName: "Trae",
				skillPath: [".trae", "skills"],
				configPath: (context) => join(traeUserDirectory(context), "mcp.json"),
				markerPath: traeUserDirectory,
				format: "json"
			}),
			defineClient({
				name: "workbuddy",
				registrationConnection: {
					kind: "stdio-only",
					documentedFields: ["env"]
				},
				displayName: "WorkBuddy",
				skillPath: [".workbuddy", "skills"],
				configPath: [".workbuddy", "mcp.json"],
				markerPath: [".workbuddy"],
				format: "json"
			}),
			defineClient({
				name: "lm_studio",
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "present",
						field: "url"
					}]
				},
				displayName: "LM Studio",
				location: lmStudioLocation,
				format: "lm_studio"
			}),
			defineClient({
				name: "grok_build",
				mcpAdd: {
					aliases: ["grok"],
					projectPaths: [".grok/config.toml"]
				},
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "non-nullish",
						field: "url"
					}]
				},
				displayName: "Grok Build",
				configPath: (context) => join(grokDirectory(context), "config.toml"),
				markerPath: grokDirectory,
				format: "grok"
			}),
			defineClient({
				name: "omp",
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "optional-enum",
						field: "type",
						values: ["stdio"]
					}]
				},
				displayName: "OMP",
				configPath: (context) => {
					const directory = ompAgentDirectory(context);
					return directory.ok ? ok(join(directory.value, "mcp.json")) : directory;
				},
				markerPath: ompAgentDirectory,
				format: "omp"
			}),
			defineClient({
				name: "pi",
				mcpAdd: {
					aliases: ["pi-agent"],
					projectPaths: [".pi/mcp.json"]
				},
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "optional-enum",
						field: "type",
						values: ["stdio"]
					}, {
						kind: "all",
						conditions: [{
							kind: "missing",
							field: "type"
						}, {
							kind: "string",
							field: "url"
						}]
					}]
				},
				displayName: "Pi",
				configPath: (context) => (context.platform === "win32" ? win32 : { join }).join(piAgentDirectory(context), "mcp.json"),
				markerPath: piAgentDirectory,
				format: "pi"
			}),
			defineClient({
				name: "hermes",
				mcpAdd: { aliases: ["hermes-agent"] },
				registrationConnection: {
					kind: "flat",
					fields: ["url", "transport"],
					stdio: [{
						kind: "optional-enum",
						field: "transport",
						values: ["stdio"]
					}, {
						kind: "present",
						field: "url"
					}]
				},
				displayName: "Hermes",
				skillPath: (context) => appendCallerPath(hermesDirectory(context), "skills"),
				configPath: (context) => appendCallerPath(hermesDirectory(context), "config.yaml"),
				markerPath: hermesDirectory,
				format: "hermes"
			}),
			defineClient({
				name: "qoder",
				registrationConnection: {
					kind: "flat",
					fields: [
						"type",
						"url",
						"qoder_url",
						"tcp"
					],
					stdio: [
						{
							kind: "optional-enum",
							field: "type",
							values: ["stdio"]
						},
						{
							kind: "present",
							field: "url"
						},
						{
							kind: "present",
							field: "qoder_url"
						},
						{
							kind: "present",
							field: "tcp"
						}
					]
				},
				displayName: "Qoder",
				skillPath: (context) => join(qoderDirectory(context), "skills"),
				configPath: (context) => join(qoderDirectory(context), "settings.json"),
				markerPath: qoderDirectory,
				format: "json"
			}),
			defineClient({
				name: "droid",
				mcpAdd: {
					aliases: ["droid", "factory"],
					projectPaths: [".factory/mcp.json"]
				},
				registrationConnection: {
					kind: "flat",
					fields: ["type", "url"],
					stdio: [{
						kind: "optional-enum",
						field: "type",
						values: ["stdio"]
					}, {
						kind: "present",
						field: "url"
					}]
				},
				displayName: "Factory Droid",
				skillPath: (context) => join(factoryDirectory(context), "skills"),
				configPath: (context) => join(factoryDirectory(context), "mcp.json"),
				markerPath: factoryDirectory,
				format: "json"
			}),
			defineClient({
				name: "zcode",
				registrationConnection: {
					kind: "flat",
					fields: ["type", "url"],
					stdio: [{
						kind: "optional-enum",
						field: "type",
						values: ["stdio"]
					}, {
						kind: "present",
						field: "url"
					}]
				},
				zcodeFallbackPath: ({ home }) => join(home, ".agents", "mcp.json"),
				displayName: "ZCode",
				configPath: [
					".zcode",
					"cli",
					"config.json"
				],
				markerPath: [".zcode", "cli"],
				skillPath: [".zcode", "skills"],
				discoveryPaths: ({ home }) => [join(home, ".zcode", "cli")],
				format: "zcode"
			}),
			defineClient({
				name: "dsh",
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "required-enum",
						field: "transport",
						values: ["stdio"]
					}]
				},
				displayName: "DeepSeek Harness",
				skillPath: ({ home, env }) => join(dshDirectory(home, env.DSH_AGENTS_HOME, ".agents"), "skills"),
				configPath: dshPatchDirectory,
				markerPath: dshHomeDirectory,
				format: "dsh"
			}),
			defineClient({
				name: "freebuff",
				registrationConnection: {
					kind: "flat",
					fields: ["type", "url"],
					stdio: [{
						kind: "optional-enum",
						field: "type",
						values: ["stdio"]
					}, {
						kind: "present",
						field: "url"
					}]
				},
				displayName: "FreeBuff",
				skillPath: ({ home }) => join(home, ".agents", "skills"),
				configPath: ({ home }) => join(home, ".agents", "mcp.json"),
				markerPath: freebuffProfileDirectory,
				discoveryPaths: (context) => [freebuffProfileDirectory(context)],
				sharedRegistration: true,
				format: "json"
			}),
			defineClient({
				name: "cline_vscode",
				mcpAdd: { aliases: ["cline-vscode"] },
				registrationConnection: { kind: "cline" },
				displayName: "Cline VS Code extension",
				configPath: (context) => join(clineVscodeSettingsDirectory(context), "cline_mcp_settings.json"),
				markerPath: clineVscodeSettingsDirectory,
				format: "json"
			}),
			defineClient({
				name: "cline_vscode_insiders",
				registrationConnection: { kind: "cline" },
				displayName: "Cline in VS Code Insiders",
				configPath: (context) => join(clineSettingsDirectory("Code - Insiders")(context), "cline_mcp_settings.json"),
				markerPath: clineSettingsDirectory("Code - Insiders"),
				format: "json"
			}),
			defineClient({
				name: "cline_vscodium",
				registrationConnection: { kind: "cline" },
				displayName: "Cline in VSCodium",
				configPath: (context) => join(clineSettingsDirectory("VSCodium")(context), "cline_mcp_settings.json"),
				markerPath: clineSettingsDirectory("VSCodium"),
				format: "json"
			}),
			defineClient({
				name: "cline_cursor",
				registrationConnection: { kind: "cline" },
				displayName: "Cline in Cursor",
				configPath: (context) => join(clineSettingsDirectory("Cursor")(context), "cline_mcp_settings.json"),
				markerPath: clineSettingsDirectory("Cursor"),
				format: "json"
			}),
			defineClient({
				name: "cline_windsurf",
				registrationConnection: { kind: "cline" },
				displayName: "Cline in Windsurf",
				configPath: (context) => join(clineSettingsDirectory("Windsurf")(context), "cline_mcp_settings.json"),
				markerPath: clineSettingsDirectory("Windsurf"),
				format: "json"
			}),
			defineClient({
				name: "kiro",
				mcpAdd: {
					aliases: ["kiro"],
					projectPaths: [".kiro/settings/mcp.json"]
				},
				registrationConnection: {
					kind: "flat",
					fields: ["type", "url"],
					stdio: [{
						kind: "optional-enum",
						field: "type",
						values: ["stdio"]
					}, {
						kind: "present",
						field: "url"
					}]
				},
				displayName: "Kiro",
				configPath: [
					".kiro",
					"settings",
					"mcp.json"
				],
				markerPath: [".kiro"],
				format: "json"
			}),
			defineClient({
				name: "mastracode",
				mcpAdd: {
					aliases: ["mastra"],
					projectPaths: [".mastracode/mcp.json"]
				},
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "string",
						field: "url"
					}]
				},
				displayName: "Mastra Code",
				configPath: [".mastracode", "mcp.json"],
				markerPath: [".mastracode"],
				format: "json"
			}),
			defineClient({
				name: "zed",
				mcpAdd: { projectPaths: [".zed/settings.json"] },
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "present",
						field: "url"
					}]
				},
				displayName: "Zed",
				location: zedLocation,
				format: "zed"
			}),
			defineClient({
				name: "amp",
				mcpAdd: {},
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "present",
						field: "url"
					}]
				},
				displayName: "Amp",
				location: ampLocation,
				format: "amp"
			}),
			defineClient({
				name: "mcporter",
				mcpAdd: { projectPaths: ["config/mcporter.json"] },
				registrationConnection: {
					kind: "flat",
					fields: [...MCPORTER_URL_FIELDS, "executable"],
					stdio: MCPORTER_STDIO_INCOMPATIBILITIES
				},
				displayName: "MCPorter",
				location: mcporterLocation,
				registrationApplicability: true,
				format: "json"
			}),
			defineClient({
				name: "fx",
				mcpAdd: {},
				registrationConnection: {
					kind: "flat",
					fields: ["url", "args"],
					stdio: [{
						kind: "optional-enum",
						field: "type",
						values: ["local", "stdio"]
					}, {
						kind: "all",
						conditions: [{
							kind: "missing",
							field: "type"
						}, {
							kind: "present",
							field: "url"
						}]
					}]
				},
				displayName: "fx",
				location: fxLocation,
				privateProfile: true,
				format: "fx"
			}),
			defineClient({
				name: "junie",
				mcpAdd: { projectPaths: [".junie/mcp/mcp.json"] },
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "present",
						field: "url"
					}]
				},
				displayName: "Junie",
				location: junieLocation,
				junieSettings: (context, { markerPath }) => ({
					userConfigPath: join(markerPath, "config.json"),
					...context.env.JUNIE_MCP_DEFAULT_LOCATIONS === undefined ? {} : { mcpDefaultLocations: context.env.JUNIE_MCP_DEFAULT_LOCATIONS },
					...context.env.JUNIE_CONFIG_LOCATION === undefined ? {} : { configLocation: context.env.JUNIE_CONFIG_LOCATION },
					...context.env.JUNIE_CONFIG_DEFAULT_LOCATIONS === undefined ? {} : { configDefaultLocations: context.env.JUNIE_CONFIG_DEFAULT_LOCATIONS }
				}),
				format: "json"
			}),
			defineClient({
				name: "goose",
				mcpAdd: {},
				registrationConnection: {
					kind: "flat",
					fields: ["uri"],
					stdio: [{
						kind: "required-enum",
						field: "type",
						values: ["stdio"]
					}]
				},
				displayName: "Goose",
				location: gooseLocation,
				configPaths: gooseConfigPaths,
				readOnlyLowerLayers: true,
				format: "goose"
			}),
			defineClient({
				name: "kilo",
				registrationConnection: {
					kind: "flat",
					fields: ["url"],
					stdio: [{
						kind: "required-enum",
						field: "type",
						values: ["local"]
					}]
				},
				displayName: "Kilo Code",
				mcpAdd: {
					aliases: ["kilo", "kilocode"],
					projectLocation: kiloProjectLocation
				},
				location: kiloLocation,
				configPaths: kiloCandidatePaths,
				discoveryPaths: kiloDiscoveryPaths,
				layeredLocation: kiloLayeredLocation,
				format: "kilo"
			}),
			defineClient({
				name: "grok_bot",
				registrationConnection: {
					kind: "unavailable",
					reason: "Grok Bot has no supported configuration writer. Configure its MCP connection manually."
				},
				displayName: "Grok Bot",
				configPath: grokBotDirectory,
				markerPath: grokBotDirectory,
				format: "unsupported"
			})
		];
		supportedClientDefinition = (name) => {
			const definitions = SUPPORTED_CLIENT_DEFINITIONS;
			const definition = definitions.find((candidate) => candidate.name === name);
			if (definition === undefined) throw new Error(`No supported client definition for ${name}`);
			return definition;
		};
		clientEvidencePaths = (client) => [...new Set((client.discoveryPaths ?? [
			client.configPath,
			...client.configPaths ?? [],
			client.markerPath
		]).filter((path) => path !== undefined && path.length > 0))];
		clientOwnershipEvidencePaths = (client) => client.sharedRegistration === true ? [client.configPath, ...client.configPaths ?? []].filter((path) => path !== undefined && path.length > 0) : [];
		clientSharedRegistrationPaths = (client) => new Set([...clientOwnershipEvidencePaths(client), ...client.zcodeFallbackPath === undefined ? [] : [client.zcodeFallbackPath]]);
		resolvePath = (path, context) => {
			const resolved = typeof path === "function" ? path(context) : join(context.home, ...path);
			return typeof resolved === "string" ? ok(resolved) : resolved;
		};
		resolveLocation = (definition, context) => {
			if (definition.location !== undefined) return definition.location(context);
			const config = resolvePath(definition.configPath, context);
			if (!config.ok) return config;
			const marker = resolvePath(definition.markerPath, context);
			return marker.ok ? ok({
				configPath: config.value,
				markerPath: marker.value
			}) : marker;
		};
		layerLoadOrder = (paths, configPath) => {
			const ordered = paths.includes(configPath) ? paths : [...paths, configPath];
			return ordered.filter((path, index) => ordered.lastIndexOf(path) === index);
		};
		supportedClients = (home, platform, env = process.env, systemPaths = {}) => {
			const context = {
				home,
				platform,
				env,
				systemPaths
			};
			const definitions = SUPPORTED_CLIENT_DEFINITIONS;
			return definitions.map((definition) => {
				try {
					const location = resolveLocation(definition, context);
					if (!location.ok) return {
						name: definition.name,
						registrationProfile: definition.registrationProfile,
						displayName: definition.displayName,
						format: definition.format,
						configPath: location.error.path,
						configPathError: location.error.message,
						...location.error.msixPackage === undefined ? {} : { msixPackage: location.error.msixPackage }
					};
					const { configPath, markerPath, msixPackage } = location.value;
					return {
						name: definition.name,
						registrationProfile: definition.registrationProfile,
						displayName: definition.displayName,
						configPath,
						...definition.geminiSettings === undefined ? {} : { geminiSettings: definition.geminiSettings(context) },
						...definition.junieSettings === undefined ? {} : { junieSettings: definition.junieSettings(context, location.value) },
						...definition.configPaths === undefined ? {} : { configPaths: layerLoadOrder(definition.configPaths(context), configPath) },
						...definition.zcodeFallbackPath === undefined ? {} : { zcodeFallbackPath: definition.zcodeFallbackPath(context) },
						markerPath,
						...msixPackage === undefined ? {} : { msixPackage },
						...definition.quitBeforeSetup === true ? { quitBeforeSetup: true } : {},
						...definition.discoveryPaths === undefined ? {} : { discoveryPaths: definition.discoveryPaths(context) },
						...definition.privateProfile === true ? { privateProfile: { home } } : {},
						...definition.readOnlyLowerLayers === true ? { readOnlyLowerLayers: true } : {},
						...definition.registrationApplicability === true ? { registrationApplicability: true } : {},
						...definition.sharedRegistration === true ? { sharedRegistration: true } : {},
						format: definition.format
					};
				} catch (cause) {
					if (cause instanceof HermesClientPathError) return {
						name: definition.name,
						registrationProfile: definition.registrationProfile,
						displayName: definition.displayName,
						format: definition.format,
						configPath: cause.path,
						configPathError: cause.message
					};
					if (definition.name !== "pi") throw cause;
					return {
						name: definition.name,
						registrationProfile: definition.registrationProfile,
						displayName: definition.displayName,
						format: definition.format,
						configPath: env.PI_CODING_AGENT_DIR ?? "",
						configPathError: `Invalid PI_CODING_AGENT_DIR: ${errorMessage(cause)}. Repair the override before configuring Pi.`
					};
				}
			});
		};
		resolveSupportedClients = async (home, platform, env = process.env, systemPaths = {}) => {
			const context = {
				home,
				platform,
				env,
				systemPaths
			};
			const definitions = SUPPORTED_CLIENT_DEFINITIONS;
			const rows = supportedClients(home, platform, env, systemPaths);
			return Promise.all(rows.map(async (row) => {
				const resolve = definitions.find(({ name }) => name === row.name)?.layeredLocation;
				if (resolve === undefined || row.configPathError !== undefined) return row;
				const location = await resolve(context);
				return location.ok ? {
					...row,
					...location.value
				} : {
					...row,
					configPath: location.error.path,
					configPathError: location.error.message,
					...location.error.failure === undefined ? {} : { configPathFailure: location.error.failure }
				};
			}));
		};
		clientSkillDirectories = (home, clientIds, environment, platform) => {
			const unresolved = [];
			const definitions = SUPPORTED_CLIENT_DEFINITIONS;
			const selected = clientIds === undefined ? ["shared", ...definitions.filter(({ skillPath }) => skillPath !== undefined).map(({ name }) => name)] : clientIds.length === 0 ? ["shared"] : clientIds;
			const sharedDirectory = appendCallerPath(home, ".agents/skills", platform);
			const destinations = new Map();
			for (const client of selected) {
				const definition = definitions.find(({ name }) => name === client);
				if (definition === undefined && client !== "shared") {
					unresolved.push({
						client,
						path: client,
						detail: `Unsupported skill client: ${client}`
					});
					continue;
				}
				let directory;
				try {
					const resolved = definition?.skillPath === undefined ? ok(sharedDirectory) : resolvePath(definition.skillPath, {
						home,
						platform,
						env: environment
					});
					if (!resolved.ok) {
						unresolved.push({
							client,
							path: resolved.error.path,
							detail: resolved.error.message
						});
						continue;
					}
					directory = resolved.value;
				} catch (cause) {
					if (cause instanceof HermesClientPathError) {
						unresolved.push({
							client,
							path: cause.path,
							detail: cause.message
						});
						continue;
					}
					throw cause;
				}
				if (!destinations.has(directory)) destinations.set(directory, {
					client: directory === sharedDirectory ? "shared" : client,
					directory
				});
			}
			return {
				directories: [...destinations.values()].sort((left, right) => compareUnicodeCodePoints(left.directory, right.directory)),
				unresolved
			};
		};
	})))();
}

//#endregion
export { ClientConfigurationShapeError, DshCordisDocument, OMP_DISABLED_SERVERS_KEY, SUPPORTED_CLIENT_DEFINITIONS, appDataRedirection, clientConfigurationRecordSchema, clientConfigurationServersKey, clientConfigurationSyntaxName, clientConfigurationValuesEqual, clientEvidencePaths, clientOwnershipEvidencePaths, clientRegistrationEntry, clientRegistrationLauncherEntry, clientServerForEdit, clientServerForcedEnabled, clientServerListedDisabled, clientServerPath, clientSharedRegistrationPaths, clientSkillDirectories, dshDocument, dshToolCallTimeout, effectiveClientServer, fixedProjectLocation, geminiServerPolicyBlock, init_ClientConfigurationDocument, init_DshCordisPatch, init_McpRegistrationLocations, init_MsixPackageStorage, init_RegistrationEnvironmentValidation, init_SupportedClients, legacyClientServerPath, manualRegistrationRemediation, msixPackagesDirectory, packagePrivateLauncherBlocker, packageReadTargetChanged, parseClientConfiguration, parseGeminiMcpPolicy, parseZcodeFallbackConfiguration, present, redirectedWriteBlocker, registrationPersistenceDetail, registrationWriteBlocker, resolveSupportedClients, runningClientRewriteNotice, selectedPath, serializeClientConfiguration, shadowedClientServers, supportedClientDefinition, validateRegistrationEnvironment, withClientServers };