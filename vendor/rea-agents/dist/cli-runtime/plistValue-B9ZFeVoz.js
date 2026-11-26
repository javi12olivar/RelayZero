import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { MAX_JSON_DEPTH, ParseFailureError, init_jsonValue, init_parseFailure } from "./jsonSerialization-DAF9DVXC.js";
import { init_internalInvariant, invariantViolation } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { z } from "zod";
import { types } from "node:util";

//#region dist/domain/apple/plistUid.js
var plistUidValues, markPlistDictionary, copyPlistUidIdentity, plistUidValue;
function init_plistUid() {
	return (init_plistUid = __esmMin((() => {
		plistUidValues = new WeakMap();
		markPlistDictionary = (value, uid) => {
			plistUidValues.set(value, uid);
		};
		copyPlistUidIdentity = (source, projected) => {
			if (plistUidValues.has(source)) plistUidValues.set(projected, plistUidValues.get(source));
		};
		plistUidValue = (value) => {
			if (value === null || typeof value !== "object" || Array.isArray(value)) return undefined;
			if (plistUidValues.has(value)) return plistUidValues.get(value);
			const fields = Object.keys(value);
			if (fields.length !== 1) return undefined;
			const key = fields[0];
			if (key !== "CF$UID") return undefined;
			const descriptor = Object.getOwnPropertyDescriptor(value, key);
			return typeof descriptor?.value === "number" ? descriptor.value : undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/apple/plistNumbers.js
var incompletePlistNumberLimitation, createPlistNumberCollector, resolvePlistNumberSource, createPlistNumberProjection;
function init_plistNumbers() {
	return (init_plistNumbers = __esmMin((() => {
		init_plistUid();
		incompletePlistNumberLimitation = "Property-list number metadata could not be completely observed; decoded numbers may lose integer precision and exact integer/real association is unavailable.";
		createPlistNumberCollector = () => {
			const integers = new Map();
			const reals = new Set();
			let unsafeIntegerLiterals = 0;
			return {
				integer: (exact) => {
					if (exact >= BigInt(Number.MIN_SAFE_INTEGER) && exact <= BigInt(Number.MAX_SAFE_INTEGER)) return;
					unsafeIntegerLiterals++;
					const rounded = Number(exact);
					integers.set(rounded, (integers.get(rounded) ?? new Set()).add(exact.toString()));
				},
				real: (value) => {
					reals.add(value);
				},
				result: (incomplete = false) => ({
					integers,
					reals,
					unsafeIntegerLiterals,
					incomplete
				})
			};
		};
		resolvePlistNumberSource = (value, literals, sourceDecimal) => {
			if (literals === undefined || literals.incomplete) return { kind: "unknown" };
			const decimals = literals.integers.get(value);
			const real = literals.reals.has(value);
			const integer = sourceDecimal === undefined ? decimals !== undefined : decimals?.has(sourceDecimal) === true;
			if (real) return { kind: integer ? "unknown" : "real" };
			if (!integer) return { kind: "unknown" };
			const decimal = sourceDecimal ?? (decimals?.size === 1 ? [...decimals][0] : undefined);
			return decimal === undefined ? { kind: "unknown" } : {
				kind: "integer",
				decimal
			};
		};
		createPlistNumberProjection = (literals) => {
			let exactIntegerCount = 0;
			let ambiguousNumberCount = 0;
			const mapNumber = (item) => {
				if (Number.isSafeInteger(item) || !Number.isInteger(item)) return item;
				const source = resolvePlistNumberSource(item, literals);
				if (source.kind !== "integer") {
					if (source.kind === "unknown") ambiguousNumberCount += 1;
					return item;
				}
				exactIntegerCount += 1;
				return {
					$plist_type: "integer",
					decimal: source.decimal
				};
			};
			const map = (item) => {
				if (typeof item === "number") return mapNumber(item);
				if (Array.isArray(item)) return item.map(map);
				if (item !== null && typeof item === "object") {
					const marker = plistUidValue(item);
					const reference = marker !== undefined;
					if (reference) {
						if (typeof marker === "number" && !Number.isSafeInteger(marker) && (literals.integers.has(marker) || !literals.reals.has(marker))) ambiguousNumberCount += 1;
						return item;
					}
					const projected = Object.fromEntries(Object.entries(item).map(([key, child]) => [key, map(child)]));
					copyPlistUidIdentity(item, projected);
					return projected;
				}
				return item;
			};
			return {
				project: map,
				limitations: () => [
					...literals.incomplete ? [incompletePlistNumberLimitation] : [],
					...literals.unsafeIntegerLiterals === 0 ? [] : [`${String(literals.unsafeIntegerLiterals)} observed integer literal(s) in the original archive exceed the exact range of a JSON number. Decoded numbers may lose integer precision unless represented as { "$plist_type": "integer", "decimal": "<exact digits>" }; the original archive bytes retain those literals.`],
					...exactIntegerCount === 0 ? [] : [`${String(exactIntegerCount)} unambiguous integer value(s) are reported with exact decimal text as { "$plist_type": "integer", "decimal": "<exact digits>" }.`],
					...ambiguousNumberCount === 0 ? [] : [`${String(ambiguousNumberCount)} number(s) beyond the exact integer range remain as decoded because their source integer/real type or reference marker cannot be associated unambiguously; integer precision loss remains possible.`]
				]
			};
		};
	})))();
}

//#endregion
//#region dist/domain/apple/unknownPlistScalar.js
var UnknownPlistScalar;
function init_unknownPlistScalar() {
	return (init_unknownPlistScalar = __esmMin((() => {
		UnknownPlistScalar = class {
			element;
			rawLiteral;
			reason;
			constructor(element, rawLiteral, reason) {
				this.element = element;
				this.rawLiteral = rawLiteral;
				this.reason = reason;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/apple/plistValue.js
var jsonScalarSchema, MAX_PLIST_DEPTH, MAX_NATIVE_PLIST_NESTING_DEPTH, plistNestingLimitMessage, PlistNestingLimitError, unknownDateLimitation, binaryDatePrecisionOverlapLimitation, unknownScalarLimitation, nonFiniteRealLimitation, negativeZeroReal, negativeZeroRealLimitation, projectPlistValue;
function init_plistValue() {
	return (init_plistValue = __esmMin((() => {
		init_internalInvariant();
		init_jsonValue();
		init_parseFailure();
		init_plistUid();
		init_unknownPlistScalar();
		jsonScalarSchema = z.union([
			z.string(),
			z.number(),
			z.boolean(),
			z.null()
		]);
		MAX_PLIST_DEPTH = 128;
		MAX_NATIVE_PLIST_NESTING_DEPTH = MAX_JSON_DEPTH - 3;
		plistNestingLimitMessage = (maximumDepth = 128) => `Plist exceeds ${String(maximumDepth)} nesting levels. This release has no runtime override for this ${String(maximumDepth)}-level nesting allowance.`;
		PlistNestingLimitError = class extends ParseFailureError {
			maximumDepth;
			constructor(maximumDepth) {
				super({
					kind: "limit",
					format: "plist",
					detail: plistNestingLimitMessage(maximumDepth),
					limit: {
						name: "plist-nesting-depth",
						maximum: maximumDepth
					}
				});
				this.maximumDepth = maximumDepth;
				this.name = "PlistNestingLimitError";
			}
		};
		unknownDateLimitation = (count) => `${String(count)} date value(s) are reported as { "$plist_type": "date", "iso8601": null } because the decoder could not represent their timestamps.`;
		binaryDatePrecisionOverlapLimitation = (count) => `${String(count)} date value(s) are reported with unknown timestamps because their sub-millisecond source records overlap another reachable binary object and the public date projection cannot express their exact instants.`;
		unknownScalarLimitation = (count) => `${String(count)} XML scalar value(s) could not be established; their exact literals and reasons are retained in { "$plist_type": "unknown", "element": ..., "literal": ..., "reason": ... } wrappers.`;
		nonFiniteRealLimitation = (count) => `${String(count)} non-finite real value(s) are reported as { "$plist_type": "real", "value": "<spelling>" } using canonical numeric labels nan, +infinity or -infinity because a JSON number cannot carry them.`;
		negativeZeroReal = () => ({
			$plist_type: "real",
			value: "-0"
		});
		negativeZeroRealLimitation = (count) => `${String(count)} negative-zero real value(s) are reported as { "$plist_type": "real", "value": "-0" } because a JSON number cannot carry the sign of zero.`;
		projectPlistValue = (value, onWrappedScalar, maximumDepth = 128) => {
			let nonFiniteRealCount = 0;
			let negativeZeroRealCount = 0;
			let unknownDateCount = 0;
			let unknownScalarCount = 0;
			const scalar = (value) => {
				onWrappedScalar?.(value);
				return value;
			};
			const project = (item, depth) => {
				if (depth > maximumDepth) throw new PlistNestingLimitError(maximumDepth);
				if (item !== null && typeof item === "object" && types.isProxy(item)) throw invariantViolation("Plist values cannot contain proxies");
				if (item instanceof Uint8Array) return scalar({
					$plist_type: "data",
					base64: Buffer.from(item).toString("base64")
				});
				if (item instanceof UnknownPlistScalar) {
					unknownScalarCount += 1;
					return scalar({
						$plist_type: "unknown",
						element: item.element,
						literal: item.rawLiteral,
						reason: item.reason
					});
				}
				if (item instanceof Date) {
					if (!Number.isNaN(Date.prototype.getTime.call(item))) return scalar({
						$plist_type: "date",
						iso8601: Date.prototype.toISOString.call(item)
					});
					unknownDateCount += 1;
					return scalar({
						$plist_type: "date",
						iso8601: null
					});
				}
				if (typeof item === "number" && !Number.isFinite(item)) {
					nonFiniteRealCount += 1;
					const label = Number.isNaN(item) ? "nan" : item > 0 ? "+infinity" : "-infinity";
					return scalar({
						$plist_type: "real",
						value: label
					});
				}
				if (typeof item === "number" && Object.is(item, -0)) {
					negativeZeroRealCount += 1;
					return scalar(negativeZeroReal());
				}
				if (typeof item === "bigint") return scalar({
					$plist_type: "integer",
					decimal: item.toString()
				});
				if (Array.isArray(item)) {
					const result = [];
					for (let index = 0; index < item.length; index++) {
						const descriptor = Object.getOwnPropertyDescriptor(item, index);
						if (descriptor === undefined || !Object.hasOwn(descriptor, "value")) throw invariantViolation("Plist arrays require dense data properties without accessors");
						result.push(project(descriptor.value, depth + 1));
					}
					return result;
				}
				if (item !== null && typeof item === "object") {
					const entries = [];
					for (const key of Reflect.ownKeys(item)) {
						const descriptor = Object.getOwnPropertyDescriptor(item, key);
						if (descriptor?.enumerable !== true) continue;
						if (typeof key !== "string" || !Object.hasOwn(descriptor, "value")) throw invariantViolation("Plist dictionary entries require string keys and data properties");
						entries.push([key, project(descriptor.value, depth + 1)]);
					}
					const result = Object.fromEntries(entries);
					copyPlistUidIdentity(item, result);
					return result;
				}
				return jsonScalarSchema.parse(item);
			};
			const projected = project(value, 0);
			return {
				value: projected,
				nonFiniteRealCount,
				negativeZeroRealCount,
				unknownDateCount,
				unknownScalarCount
			};
		};
	})))();
}

//#endregion
export { MAX_NATIVE_PLIST_NESTING_DEPTH, PlistNestingLimitError, UnknownPlistScalar, binaryDatePrecisionOverlapLimitation, createPlistNumberCollector, createPlistNumberProjection, incompletePlistNumberLimitation, init_plistNumbers, init_plistUid, init_plistValue, init_unknownPlistScalar, markPlistDictionary, negativeZeroReal, negativeZeroRealLimitation, nonFiniteRealLimitation, plistUidValue, projectPlistValue, resolvePlistNumberSource, unknownDateLimitation, unknownScalarLimitation };