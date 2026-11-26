import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/keyedCollection.js
var keyedBy, uniqueKeyed, allKeyed, firstKeyed;
function init_keyedCollection() {
	return (init_keyedCollection = __esmMin((() => {
		init_result();
		keyedBy = (values, keyOf) => {
			const entries = [];
			const seen = new Set();
			const duplicates = new Set();
			for (const value of values) {
				const key = keyOf(value);
				if (key === undefined || key === null) continue;
				if (seen.has(key)) duplicates.add(key);
				seen.add(key);
				entries.push({
					key,
					ordinal: entries.length,
					value
				});
			}
			return {
				entries,
				duplicates: [...duplicates]
			};
		};
		uniqueKeyed = (keyed, key) => {
			const matches = keyed.entries.filter((entry) => entry.key === key);
			if (matches.length > 1) return err({
				kind: "duplicate",
				key,
				ordinals: matches.map(({ ordinal }) => ordinal)
			});
			return ok(matches[0]?.value);
		};
		allKeyed = (keyed, key) => keyed.entries.flatMap((entry) => entry.key === key ? [entry.value] : []);
		firstKeyed = (keyed, key, precedence) => {
			if (precedence.trim() === "") throw new TypeError("A keyed precedence must state its format rule");
			return keyed.entries.find((entry) => entry.key === key)?.value;
		};
	})))();
}

//#endregion
export { allKeyed, firstKeyed, init_keyedCollection, keyedBy, uniqueKeyed };