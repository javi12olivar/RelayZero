import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { INVALID_BASE64_CHARACTER_PATTERN, INVALID_BASE64_PADDING_PATTERN, INVALID_CANONICAL_BASE64_PAD_BITS_PATTERN, init_isRecord, init_stringPatterns, isRecord } from "./jsonSerialization-DAF9DVXC.js";
import { ADVERTISED_BOUND_LIMIT, ADVERTISED_DESCRIPTION_MAX_CHARACTERS, advertisedInputDialectViolations, init_advertisedDialect, init_compactJsonSchema, inlineWithinBudget, isSchemaObject, jsonValueSchema, portablePatternViolations, reduceToShallowProperties, schemaDepth, serializedBytes, stripAnnotations } from "./advertisedDialect-nPNOAZyy.js";
import { byteToHex, init_byteToHex } from "./byteToHex-N4MIskWf.js";
import { isDeepStrictEqual } from "node:util";

//#region dist/contracts/portablePattern.js
var Unexpressible, ANY_STRING, UNBOUNDED_BASE64_PROBES, ANY_CHARACTER, NON_ASCII, ALNUM, LITERAL_OUTSIDE_CLASS, ESCAPED_OUTSIDE_CLASS, LITERAL_IN_CLASS, ESCAPED_IN_CLASS, MAX_REPEAT, hex, emitOutside, emitInClass, emitAsciiMembers, unionNonAscii, ASCII_CODES, emitClass, SHORTHAND_NON_ASCII, Projector, projections, projectPortablePattern;
function init_portablePattern() {
	return (init_portablePattern = __esmMin((() => {
		init_advertisedDialect();
		init_stringPatterns();
		init_byteToHex();
		Unexpressible = class extends Error {};
		ANY_STRING = "[^\\x00]*(?:\\x00[^\\x00]*)*";
		UNBOUNDED_BASE64_PROBES = new Set([
			INVALID_BASE64_CHARACTER_PATTERN.source,
			INVALID_BASE64_PADDING_PATTERN.source,
			INVALID_CANONICAL_BASE64_PAD_BITS_PATTERN.source
		]);
		ANY_CHARACTER = "(?:[^\\x00]|\\x00)";
		NON_ASCII = "[^\\x00-\\x7f]";
		ALNUM = /^[A-Za-z0-9]$/u;
		LITERAL_OUTSIDE_CLASS = new Set("_ !#%&,:;<=>@`~'\"-/");
		ESCAPED_OUTSIDE_CLASS = new Set("^$\\.*+?()[]{}|/");
		LITERAL_IN_CLASS = new Set("!#%&,:;<=>@`~'\" _.+*?$");
		ESCAPED_IN_CLASS = new Set("^$\\.*+?()[]{}|/-");
		MAX_REPEAT = 1e3;
		hex = (code) => `\\x${byteToHex(code)}`;
		emitOutside = (code) => {
			const character = String.fromCodePoint(code);
			if (ALNUM.test(character) || LITERAL_OUTSIDE_CLASS.has(character)) return character;
			if (ESCAPED_OUTSIDE_CLASS.has(character)) return `\\${character}`;
			return hex(code);
		};
		emitInClass = (code, rangeEndpoint) => {
			const character = String.fromCodePoint(code);
			if (ALNUM.test(character)) return character;
			if (!rangeEndpoint && LITERAL_IN_CLASS.has(character)) return character;
			if (!rangeEndpoint && character !== "/" && ESCAPED_IN_CLASS.has(character)) return `\\${character}`;
			return hex(code);
		};
		emitAsciiMembers = (members) => {
			const sorted = [...members].sort((left, right) => left - right);
			let emitted = "";
			for (let index = 0; index < sorted.length;) {
				let end = index;
				while (end + 1 < sorted.length && sorted[end + 1] === sorted[end] + 1) end++;
				const first = sorted[index];
				const last = sorted[end];
				if (last - first >= 2) emitted += `${emitInClass(first, true)}-${emitInClass(last, true)}`;
				else for (let code = first; code <= last; code++) emitted += emitInClass(code, false);
				index = end + 1;
			}
			return emitted;
		};
		unionNonAscii = (left, right) => left === "all" || right === "all" ? "all" : left === "some" || right === "some" ? "some" : "none";
		ASCII_CODES = Array.from({ length: 128 }, (_, code) => code);
		emitClass = (ascii, nonAscii, negated, widen) => {
			if (nonAscii === "some") widen();
			if (!negated) {
				if (nonAscii === "none") {
					if (ascii.size === 0) throw new Unexpressible();
					return `[${emitAsciiMembers(ascii)}]`;
				}
				if (ascii.size === 0) return NON_ASCII;
				const missing = new Set(ASCII_CODES.filter((code) => !ascii.has(code)));
				return missing.size === 0 ? ANY_CHARACTER : `[^${emitAsciiMembers(missing)}]`;
			}
			if (nonAscii === "all") {
				const rest = new Set(ASCII_CODES.filter((code) => !ascii.has(code)));
				if (rest.size === 0) throw new Unexpressible();
				return `[${emitAsciiMembers(rest)}]`;
			}
			return ascii.size === 0 ? ANY_CHARACTER : `[^${emitAsciiMembers(ascii)}]`;
		};
		SHORTHAND_NON_ASCII = {
			d: "none",
			w: "none",
			s: "some",
			D: "all",
			W: "all",
			S: "some"
		};
		Projector = class {
			source;
			#index = 0;
			#widenings = 0;
			constructor(source) {
				this.source = source;
			}
			project() {
				const alternatives = this.#disjunction();
				if (this.#index !== this.source.length) throw new Unexpressible();
				const completed = alternatives.map((terms) => {
					const first = terms[0] === "^" ? 1 : 0;
					const anchoredEnd = terms.length > first && terms.at(-1) === "$";
					const body = terms.slice(first, anchoredEnd ? -1 : undefined).join("");
					return `${first === 1 ? "" : ANY_STRING}${body}${anchoredEnd ? "" : ANY_STRING}`;
				});
				const pattern = completed.length === 1 ? `^${completed[0]}$` : `^(?:${completed.join("|")})$`;
				return {
					kind: this.#widenings > 0 ? "wider" : "exact",
					pattern
				};
			}
			#peek(offset = 0) {
				return this.source[this.#index + offset] ?? "";
			}
			#widen = () => {
				this.#widenings++;
			};
			#disjunction() {
				const wideningsBefore = this.#widenings;
				const alternatives = [this.#alternative()];
				while (this.#peek() === "|") {
					this.#index++;
					alternatives.push(this.#alternative());
				}
				if (alternatives.length > 1 && this.#widenings > wideningsBefore) throw new Unexpressible();
				return alternatives;
			}
			#group() {
				return this.#disjunction().map((terms) => terms.join("")).join("|");
			}
			#alternative() {
				const terms = [];
				while (this.#index < this.source.length) {
					const character = this.#peek();
					if (character === "|" || character === ")") break;
					const atom = this.#term();
					if (atom === undefined) continue;
					const quantifier = this.#quantifier();
					if (atom.kind === "assertion") {
						if (quantifier !== "") throw new Unexpressible();
						terms.push(atom.text);
					} else terms.push(atom.text === ANY_CHARACTER && quantifier === "*" ? ANY_STRING : atom.text + quantifier);
				}
				return terms;
			}
			#term() {
				const character = this.#peek();
				if (character === "^" || character === "$") {
					this.#index++;
					return {
						kind: "assertion",
						text: character
					};
				}
				if (character === "(") return this.#parenthesized();
				if (character === "[") return {
					kind: "atom",
					text: this.#class()
				};
				if (character === ".") {
					this.#index++;
					return {
						kind: "atom",
						text: emitClass(new Set([10, 13]), "some", true, this.#widen)
					};
				}
				if (character === "\\") return this.#atomEscape();
				const code = this.source.codePointAt(this.#index);
				this.#index += String.fromCodePoint(code).length;
				return {
					kind: "atom",
					text: this.#literal(code)
				};
			}
			#literal(code) {
				if (code < 128) return emitOutside(code);
				if (code > 65535) throw new Unexpressible();
				this.#widen();
				return NON_ASCII;
			}
			#parenthesized() {
				const rest = this.source.slice(this.#index);
				const lookAround = /^\(\?<?[=!]/u.exec(rest);
				if (lookAround !== null) {
					this.#index += lookAround[0].length;
					this.#group();
					this.#expect(")");
					this.#widen();
					this.#quantifier();
					return undefined;
				}
				let open = "(";
				if (rest.startsWith("(?:")) {
					open = "(?:";
					this.#index += 3;
				} else {
					const named = /^\(\?<[A-Za-z_$][\w$]*>/u.exec(rest);
					if (named !== null) this.#index += named[0].length;
					else if (rest.startsWith("(?")) throw new Unexpressible();
					else this.#index++;
				}
				const inner = this.#group();
				this.#expect(")");
				return {
					kind: "atom",
					text: `${open}${inner})`
				};
			}
			#expect(character) {
				if (this.#peek() !== character) throw new Unexpressible();
				this.#index++;
			}
			#quantifier() {
				const character = this.#peek();
				let quantifier = "";
				if (character === "*" || character === "+" || character === "?") {
					this.#index++;
					quantifier = character;
				} else if (character === "{") {
					const repeat = /^\{(\d+)(?:(,)(\d*))?\}/u.exec(this.source.slice(this.#index));
					if (repeat === null) throw new Unexpressible();
					this.#index += repeat[0].length;
					let lower = Number(repeat[1]);
					let upper = repeat[2] === undefined ? lower : repeat[3] === "" ? undefined : Number(repeat[3]);
					if (lower > MAX_REPEAT) {
						lower = MAX_REPEAT;
						upper = undefined;
						this.#widen();
					}
					if (upper !== undefined && upper > MAX_REPEAT) {
						upper = undefined;
						this.#widen();
					}
					quantifier = upper === lower ? `{${String(lower)}}` : `{${String(lower)},${upper === undefined ? "" : String(upper)}}`;
				} else return "";
				if (this.#peek() === "?") this.#index++;
				return quantifier;
			}
			/** One escaped code point, or a shorthand class letter. */
			#escape(inClass) {
				this.#index++;
				const character = this.#peek();
				this.#index++;
				if (character in SHORTHAND_NON_ASCII) return { shorthand: character };
				if (character === "p" || character === "P") {
					const property = /^\{[^}]*\}/u.exec(this.source.slice(this.#index));
					if (property === null) throw new Unexpressible();
					this.#index += property[0].length;
					return { shorthand: `${character}${property[0]}` };
				}
				const controls = {
					t: 9,
					n: 10,
					v: 11,
					f: 12,
					r: 13
				};
				if (Object.hasOwn(controls, character)) return controls[character];
				if (character === "0" && !/^[0-9]$/u.test(this.#peek())) return 0;
				if (character === "b" && inClass) return 8;
				if (character === "-" && inClass) return 45;
				if (character === "c") {
					const letter = this.#peek();
					if (!/^[A-Za-z]$/u.test(letter)) throw new Unexpressible();
					this.#index++;
					return letter.charCodeAt(0) % 32;
				}
				if (character === "x") {
					const digits = /^[0-9A-Fa-f]{2}/u.exec(this.source.slice(this.#index));
					if (digits === null) throw new Unexpressible();
					this.#index += 2;
					return Number.parseInt(digits[0], 16);
				}
				if (character === "u") {
					const braced = /^\{([0-9A-Fa-f]+)\}/u.exec(this.source.slice(this.#index));
					if (braced !== null) {
						this.#index += braced[0].length;
						return Number.parseInt(braced[1], 16);
					}
					const digits = /^[0-9A-Fa-f]{4}/u.exec(this.source.slice(this.#index));
					if (digits === null) throw new Unexpressible();
					this.#index += 4;
					const unit = Number.parseInt(digits[0], 16);
					const low = /^\\u([Dd][C-Fc-f][0-9A-Fa-f]{2})/u.exec(this.source.slice(this.#index));
					if (unit >= 55296 && unit <= 56319 && low !== null) {
						this.#index += low[0].length;
						return (unit - 55296) * 1024 + (Number.parseInt(low[1], 16) - 56320) + 65536;
					}
					return unit;
				}
				if (ESCAPED_IN_CLASS.has(character) && character !== "-") {
					return character.charCodeAt(0);
				}
				throw new Unexpressible();
			}
			#atomEscape() {
				const next = this.#peek(1);
				if (next === "b" || next === "B") {
					this.#index += 2;
					this.#widen();
					this.#quantifier();
					return undefined;
				}
				if (/^[1-9k]$/u.test(next)) throw new Unexpressible();
				const escaped = this.#escape(false);
				if (typeof escaped === "number") return {
					kind: "atom",
					text: this.#literal(escaped)
				};
				const { ascii, nonAscii } = this.#membership(`[\\${escaped.shorthand}]`, [escaped]);
				return {
					kind: "atom",
					text: emitClass(ascii, nonAscii, false, this.#widen)
				};
			}
			/** Parse a class at the cursor and re-emit it. */
			#class() {
				const start = this.#index;
				this.#index++;
				const negated = this.#peek() === "^";
				if (negated) this.#index++;
				const members = [];
				while (this.#peek() !== "]") {
					if (this.#index >= this.source.length) throw new Unexpressible();
					const low = this.#classAtom();
					if (typeof low === "number" && this.#peek() === "-" && this.#peek(1) !== "]" && this.#peek(1) !== "") {
						this.#index++;
						const high = this.#classAtom();
						if (typeof high !== "number") throw new Unexpressible();
						members.push([low, high]);
					} else members.push(low);
				}
				this.#index++;
				if (members.some((member) => typeof member === "number" ? member > 65535 : Array.isArray(member) && member[1] > 65535)) throw new Unexpressible();
				const source = this.source.slice(start, this.#index);
				const { ascii: matched, nonAscii } = this.#membership(source, members);
				const ascii = negated ? new Set(ASCII_CODES.filter((code) => !matched.has(code))) : matched;
				return emitClass(ascii, nonAscii, negated, this.#widen);
			}
			#classAtom() {
				if (this.#peek() === "\\") return this.#escape(true);
				const code = this.source.codePointAt(this.#index);
				this.#index += String.fromCodePoint(code).length;
				return code;
			}
			#membership(classSource, members) {
				const expression = new RegExp(`^${classSource}$`, "u");
				const ascii = new Set(ASCII_CODES.filter((code) => expression.test(String.fromCharCode(code))));
				let nonAscii = "none";
				for (const member of members) {
					if (typeof member === "number") nonAscii = unionNonAscii(nonAscii, member >= 128 ? "some" : "none");
					else if (Array.isArray(member)) nonAscii = unionNonAscii(nonAscii, member[1] < 128 ? "none" : member[0] <= 128 && member[1] >= 1114111 ? "all" : "some");
					else nonAscii = unionNonAscii(nonAscii, SHORTHAND_NON_ASCII[member.shorthand] ?? "some");
				}
				return {
					ascii,
					nonAscii
				};
			}
		};
		projections = new Map();
		projectPortablePattern = (pattern) => {
			const cached = projections.get(pattern);
			if (cached !== undefined) return cached;
			let projection;
			try {
				if (UNBOUNDED_BASE64_PROBES.has(pattern)) throw new Unexpressible();
				new RegExp(pattern, "u");
				const projected = new Projector(pattern).project();
				projection = portablePatternViolations(projected.pattern).length > 0 ? { kind: "unexpressible" } : projected;
			} catch (cause) {
				if (!(cause instanceof Unexpressible || cause instanceof SyntaxError)) throw cause;
				projection = { kind: "unexpressible" };
			}
			projections.set(pattern, projection);
			return projection;
		};
	})))();
}

//#endregion
//#region dist/contracts/advertisedDialectProjection.js
var isStringList, literalType, literalsType, dependencyGuidance, truncatedDescription, mergeAllOf, TUPLE_TAIL_KEYS, tuplePositions, isTupleTail, branchType, onlyKeys, distinct, label, inclusiveBounds, scalarBounds, literalKeywords, isStringEnum, nullableForm, DialectProjection, projectToAdvertisedDialect;
function init_advertisedDialectProjection() {
	return (init_advertisedDialectProjection = __esmMin((() => {
		init_advertisedDialect();
		init_portablePattern();
		isStringList = (value) => Array.isArray(value) && value.every((item) => typeof item === "string");
		literalType = (value) => {
			if (typeof value === "string") return "string";
			if (typeof value === "boolean") return "boolean";
			if (typeof value === "number") return Number.isInteger(value) ? "integer" : "number";
			return undefined;
		};
		literalsType = (values) => {
			const types = new Set(values.map(literalType));
			if (types.has(undefined)) return undefined;
			if (types.size === 1) return [...types][0];
			return types.size === 2 && types.has("integer") && types.has("number") ? "number" : undefined;
		};
		dependencyGuidance = (schema) => {
			const dependencies = isRecord(schema.dependentRequired) ? schema.dependentRequired : isRecord(schema.dependencies) ? schema.dependencies : {};
			return Object.entries(dependencies).flatMap(([property, partners]) => isStringList(partners) && partners.length > 0 ? [`When ${property} is provided, also provide ${partners.join(" and ")}.`] : []);
		};
		truncatedDescription = (text) => {
			if (text.length <= 1024) return text;
			let kept = text.slice(0, ADVERTISED_DESCRIPTION_MAX_CHARACTERS - 1);
			const last = kept.charCodeAt(kept.length - 1);
			if (last >= 55296 && last <= 56319) kept = kept.slice(0, -1);
			return `${kept}…`;
		};
		mergeAllOf = (schema) => {
			if (!Array.isArray(schema.allOf)) return schema;
			const { allOf, ...merged } = schema;
			const tails = new Map();
			for (const key of TUPLE_TAIL_KEYS) if (isTupleTail(merged, key)) tails.set(key, merged);
			for (const member of allOf) {
				if (!isRecord(member)) continue;
				const flattened = mergeAllOf(member);
				for (const [key, value] of Object.entries(flattened)) {
					if (!Object.hasOwn(merged, key)) {
						merged[key] = value;
						if (isTupleTail(flattened, key)) tails.set(key, flattened);
					} else if (key === "required" && isStringList(merged.required)) {
						if (isStringList(value)) merged.required = [...new Set([...merged.required, ...value])];
					}
				}
			}
			delete merged.additionalProperties;
			for (const [key, owner] of tails) if (tuplePositions(owner)?.length !== tuplePositions(merged)?.length) delete merged[key];
			return merged;
		};
		TUPLE_TAIL_KEYS = ["items", "additionalItems"];
		tuplePositions = (schema) => Array.isArray(schema.prefixItems) ? schema.prefixItems : Array.isArray(schema.items) ? schema.items : undefined;
		isTupleTail = (schema, key) => key === "additionalItems" && Array.isArray(schema.items) || key === "items" && Array.isArray(schema.prefixItems) && !Array.isArray(schema.items);
		branchType = (branch) => isRecord(branch) && typeof branch.type === "string" ? branch.type : undefined;
		onlyKeys = (schema, keys) => Object.keys(schema).every((key) => keys.includes(key));
		distinct = (schemas) => {
			const kept = [];
			for (const schema of schemas) if (!kept.some((known) => isDeepStrictEqual(known, schema))) kept.push(schema);
			return kept;
		};
		label = (path) => path === "" ? "The input" : `\`${path}\``;
		inclusiveBounds = (source, out) => {
			const { type } = source;
			const integral = type === "integer" || isStringList(type) && type.includes("integer") && !type.includes("number");
			let { minimum, maximum } = source;
			if (typeof source.exclusiveMinimum === "number") {
				const lower = integral ? Math.floor(source.exclusiveMinimum) + 1 : source.exclusiveMinimum;
				minimum = typeof minimum === "number" ? Math.max(minimum, lower) : lower;
			}
			if (typeof source.exclusiveMaximum === "number") {
				const upper = integral ? Math.ceil(source.exclusiveMaximum) - 1 : source.exclusiveMaximum;
				maximum = typeof maximum === "number" ? Math.min(maximum, upper) : upper;
			}
			if (typeof minimum === "number") out.minimum = minimum;
			if (typeof maximum === "number") out.maximum = maximum;
		};
		scalarBounds = (source, out) => {
			for (const bound of [
				"minLength",
				"maxLength",
				"minItems",
				"maxItems"
			]) if (Number.isSafeInteger(source[bound]) && source[bound] < 1999) out[bound] = source[bound];
			if (typeof source.pattern === "string") {
				const projected = projectPortablePattern(source.pattern);
				if (projected.kind !== "unexpressible") out.pattern = projected.pattern;
			}
			inclusiveBounds(source, out);
		};
		literalKeywords = (source, out) => {
			const literals = Object.hasOwn(source, "const") ? [source.const] : Array.isArray(source.enum) && source.enum.length > 0 ? source.enum : undefined;
			if (literals === undefined) return;
			const literal = literalsType(literals);
			if (literal === "string" && !literals.includes("") && (out.type === undefined || out.type === "string")) {
				out.type = "string";
				out.enum = [...new Set(literals)];
			} else if (literal !== undefined && out.type === undefined) out.type = literal;
		};
		isStringEnum = (branch) => isRecord(branch) && branch.type === "string" && Array.isArray(branch.enum) && onlyKeys(branch, [
			"type",
			"enum",
			"description"
		]);
		nullableForm = (out) => {
			if (!isStringList(out.type) || out.type.length !== 2 || !out.type.includes("null")) return out;
			const { type, description, ...constraints } = out;
			const nonNull = type.find((member) => member !== "null");
			return {
				...description === undefined ? {} : { description },
				anyOf: [{
					type: nonNull,
					...constraints
				}, { type: "null" }]
			};
		};
		DialectProjection = class DialectProjection {
			notes = [];
			note(sentence) {
				if (!this.notes.includes(sentence)) this.notes.push(sentence);
			}
			project(value, path) {
				if (!isRecord(value)) return value;
				const source = mergeAllOf(value);
				const out = {};
				if (typeof source.type === "string" || isStringList(source.type)) out.type = source.type;
				if (typeof source.description === "string") out.description = truncatedDescription(source.description);
				this.objectKeywords(source, out, path);
				this.arrayKeywords(source, out, path);
				scalarBounds(source, out);
				literalKeywords(source, out);
				if (isRecord(source.not) && isStringList(source.not.enum)) this.note(`${label(path)} must not be ${source.not.enum.map((item) => JSON.stringify(item)).join(" or ")}.`);
				this.unionKeywords(source, out, path);
				return nullableForm(out);
			}
			/** Name and count constraints are dropped; an object's own cross-field
			* rules precede those of its properties. */
			objectKeywords(source, out, path) {
				for (const sentence of dependencyGuidance(source)) this.note(path === "" ? sentence : `In ${label(path)}: ${sentence}`);
				if (isRecord(source.properties)) {
					const properties = Object.fromEntries(Object.entries(source.properties).filter(([, child]) => child !== false).map(([name, child]) => [name, this.project(child, path === "" ? name : `${path}.${name}`)]));
					out.properties = properties;
					if (isStringList(source.required)) {
						const required = source.required.filter((name) => Object.hasOwn(properties, name));
						if (required.length > 0) out.required = required;
					}
				}
				if (source.additionalProperties === false && (!isRecord(source.patternProperties) || Object.keys(source.patternProperties).length === 0)) out.additionalProperties = false;
			}
			/** A tuple advertises the union of its positions. */
			arrayKeywords(source, out, path) {
				const tuple = Array.isArray(source.prefixItems) ? source.prefixItems : Array.isArray(source.items) ? source.items : undefined;
				if (tuple !== undefined) {
					const restSchema = Array.isArray(source.prefixItems) ? source.items : source.additionalItems;
					const bounded = typeof source.maxItems === "number" && source.maxItems <= tuple.length;
					const rest = restSchema === false || bounded ? [] : [restSchema === undefined ? true : restSchema];
					out.items = this.elementUnion([...tuple, ...rest], `${path}[]`);
				} else if (isRecord(source.items)) out.items = this.project(source.items, `${path}[]`);
				if (source.uniqueItems === true) this.note(`${label(path)} entries must be distinct.`);
			}
			/** One element schema accepting every member; any-value members stay open. */
			elementUnion(members, path) {
				return members.some((member) => member === true || isRecord(member) && Object.keys(member).length === 0) ? {} : this.project({ anyOf: members.filter(isRecord) }, path);
			}
			/** `oneOf` widens to `anyOf`; string-literal unions merge into one enum. */
			unionKeywords(source, out, path) {
				const alternatives = Array.isArray(source.anyOf) ? source.anyOf : Array.isArray(source.oneOf) ? source.oneOf : undefined;
				if (alternatives === undefined) return;
				const branches = this.unionBranches(alternatives, path, out.type);
				if (branches.length > 0 && out.enum === undefined && (out.type === undefined || out.type === "string") && branches.every(isStringEnum)) {
					out.type = "string";
					out.enum = [...new Set(branches.flatMap((branch) => branch.enum))];
					return;
				}
				if (branches.length === 1 && isRecord(branches[0])) {
					const branch = branches[0];
					const scoped = Object.hasOwn(out, "properties") && Object.hasOwn(branch, "properties");
					for (const [key, keyword] of Object.entries(branch)) if (!Object.hasOwn(out, key)) out[key] = keyword;
					if (scoped) delete out.additionalProperties;
					return;
				}
				if (branches.length < 2) return;
				out.anyOf = branches;
				const types = new Set(branches.map(branchType));
				if (out.type === undefined && types.size === 1 && !types.has(undefined)) out.type = [...types][0];
				if (out.type === "array" && out.items === undefined && branches.every((branch) => isRecord(branch) && isRecord(branch.items))) out.items = this.elementUnion(branches.map((branch) => branch.items), `${path}[]`);
			}
			/** Flattened, typed from their parent and deduplicated. */
			unionBranches(branches, path, parentType) {
				const branchNotes = [];
				const projectedBranches = distinct(branches.flatMap((branch) => {
					const typed = typeof parentType === "string" && isRecord(branch) && branch.type === undefined && branch.anyOf === undefined && branch.oneOf === undefined ? {
						...branch,
						type: parentType
					} : branch;
					const projection = new DialectProjection();
					const projected = projection.project(typed, path);
					branchNotes.push(projection.notes);
					return isRecord(projected) && Array.isArray(projected.anyOf) && onlyKeys(projected, ["anyOf"]) ? projected.anyOf : [projected];
				}));
				for (const note of branchNotes[0] ?? []) if (branchNotes.every((notes) => notes.includes(note))) this.note(note);
				return projectedBranches;
			}
		};
		projectToAdvertisedDialect = (root) => {
			const projection = new DialectProjection();
			const { description, ...rest } = root;
			const projected = projection.project(rest, "");
			return {
				schema: {
					type: "object",
					...isRecord(projected) ? projected : {}
				},
				guidance: [...typeof description === "string" && description !== "" ? [description] : [], ...projection.notes]
			};
		};
	})))();
}

//#endregion
//#region dist/contracts/compactInputSchema.js
var INPUT_REDUCED_ANNOTATION, retainedRootPropertyDescriptions, retainRootPropertyGuidance, withinDialect, compactAdvertisedInputSchema, compacted, presentAdvertisedInput;
function init_compactInputSchema() {
	return (init_compactInputSchema = __esmMin((() => {
		init_advertisedDialect();
		init_advertisedDialectProjection();
		init_compactJsonSchema();
		INPUT_REDUCED_ANNOTATION = "Advertised in reduced form by the compact input schema profile; the server still validates complete canonical inputs.";
		retainedRootPropertyDescriptions = ["detail"];
		retainRootPropertyGuidance = (schema, stripped) => {
			if (!isSchemaObject(schema.properties) || !isSchemaObject(stripped.properties)) return stripped;
			const properties = { ...stripped.properties };
			for (const name of retainedRootPropertyDescriptions) {
				const source = schema.properties[name];
				const kept = properties[name];
				if (isSchemaObject(source) && isSchemaObject(kept) && typeof source.description === "string") properties[name] = {
					...kept,
					description: source.description
				};
			}
			return {
				...stripped,
				properties
			};
		};
		withinDialect = (schema) => advertisedInputDialectViolations({
			name: "input",
			inputSchema: schema
		}).length === 0;
		compactAdvertisedInputSchema = (schema, budgetBytes) => {
			const expanded = inlineWithinBudget(stripAnnotations(schema), budgetBytes);
			const inline = expanded === undefined ? undefined : projectToAdvertisedDialect(retainRootPropertyGuidance(schema, expanded));
			if (inline !== undefined && serializedBytes(inline.schema) <= budgetBytes && schemaDepth(inline.schema) <= 10 && withinDialect(inline.schema)) return {
				...inline,
				presentation: "inline"
			};
			const reduced = projectToAdvertisedDialect(reduceToShallowProperties(schema, INPUT_REDUCED_ANNOTATION));
			if (serializedBytes(reduced.schema) <= budgetBytes) return {
				...reduced,
				presentation: "reduced"
			};
			return {
				...projectToAdvertisedDialect(reduceToShallowProperties({ type: "object" }, INPUT_REDUCED_ANNOTATION)),
				presentation: "reduced"
			};
		};
		compacted = new WeakMap();
		presentAdvertisedInput = (schema, compactPresentation) => {
			const { budgetBytes } = compactPresentation;
			let byBudget = compacted.get(schema);
			if (byBudget === undefined) compacted.set(schema, byBudget = new Map());
			let presented = byBudget.get(budgetBytes);
			if (presented === undefined) byBudget.set(budgetBytes, presented = compactAdvertisedInputSchema(schema, budgetBytes));
			return presented;
		};
	})))();
}

//#endregion
//#region dist/contracts/compactOutputSchema.js
var OUTPUT_REDUCED_ANNOTATION, withoutContentBoundIdentity, compactAdvertisedOutputSchema, presentAdvertisedOutputSchema;
function init_compactOutputSchema() {
	return (init_compactOutputSchema = __esmMin((() => {
		init_compactJsonSchema();
		OUTPUT_REDUCED_ANNOTATION = "Advertised in reduced form by the compact output schema profile; the server still validates complete canonical results.";
		withoutContentBoundIdentity = (schema) => {
			const { $id: _id, $anchor: _anchor, ...advertised } = schema;
			return advertised;
		};
		compactAdvertisedOutputSchema = (schema, budgetBytes) => {
			const inline = inlineWithinBudget(stripAnnotations(schema), budgetBytes);
			if (inline !== undefined && schemaDepth(inline) <= 10) return {
				schema: withoutContentBoundIdentity(inline),
				presentation: "inline"
			};
			const reduced = schema.type === "object" || isSchemaObject(schema.properties) ? reduceToShallowProperties(schema, OUTPUT_REDUCED_ANNOTATION) : jsonValueSchema();
			if (serializedBytes(reduced) <= budgetBytes) return {
				schema: withoutContentBoundIdentity(reduced),
				presentation: "reduced"
			};
			const minimal = reduceToShallowProperties({ type: "object" }, OUTPUT_REDUCED_ANNOTATION);
			return {
				schema: serializedBytes(minimal) <= budgetBytes ? minimal : jsonValueSchema(),
				presentation: "reduced"
			};
		};
		presentAdvertisedOutputSchema = (schema, compactPresentation) => compactPresentation === undefined ? schema : compactAdvertisedOutputSchema(schema, compactPresentation.budgetBytes).schema;
	})))();
}

//#endregion
//#region dist/contracts/advertisedTool.js
var describe, annotated, presentInput, advertiseToolInput, compactedOutput, advertiseToolOutput, advertiseTool;
function init_advertisedTool() {
	return (init_advertisedTool = __esmMin((() => {
		init_advertisedDialectProjection();
		init_compactInputSchema();
		init_compactOutputSchema();
		describe = (description, guidance) => {
			if (guidance.length === 0) return description;
			const input = guidance.join(" ");
			return description === undefined || description === "" ? input : `${description}\n\n${input}`;
		};
		annotated = new WeakMap();
		presentInput = (schema, presentation) => {
			if (presentation !== "annotated") return presentAdvertisedInput(schema, presentation);
			let projected = annotated.get(schema);
			if (projected === undefined) annotated.set(schema, projected = projectToAdvertisedDialect(schema));
			return projected;
		};
		advertiseToolInput = (description, inputSchema, presentation) => {
			const input = presentInput(inputSchema, presentation);
			return {
				description: describe(description, input.guidance),
				inputSchema: input.schema
			};
		};
		compactedOutput = new WeakMap();
		advertiseToolOutput = (outputSchema, presentation) => {
			if (presentation === undefined) return undefined;
			let byBudget = compactedOutput.get(outputSchema);
			if (byBudget === undefined) compactedOutput.set(outputSchema, byBudget = new Map());
			let advertised = byBudget.get(presentation.budgetBytes);
			if (advertised === undefined) byBudget.set(presentation.budgetBytes, advertised = presentAdvertisedOutputSchema(outputSchema, presentation));
			return advertised;
		};
		advertiseTool = (canonical, presentation) => {
			const input = canonical.inputSchema === undefined ? { description: canonical.description } : advertiseToolInput(canonical.description, canonical.inputSchema, presentation.input);
			const outputSchema = canonical.outputSchema === undefined ? undefined : advertiseToolOutput(canonical.outputSchema, presentation.output);
			return {
				...input.description === undefined ? {} : { description: input.description },
				..."inputSchema" in input ? { inputSchema: input.inputSchema } : {},
				...outputSchema === undefined ? {} : { outputSchema }
			};
		};
	})))();
}

//#endregion
export { advertiseTool, advertiseToolInput, init_advertisedTool, init_portablePattern, projectPortablePattern };