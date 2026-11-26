import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ConfigurationError, init_configurationErrors } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";

//#region dist/domain/native/ghidraSeedFile.js
var MAX_GHIDRA_SEED_BYTES, MAX_GHIDRA_SEED_ENTRIES, MAX_GHIDRA_SEED_NAME_LENGTH, ghidraSeedLineError, parseGhidraSeeds, normalizedGhidraSeeds;
function init_ghidraSeedFile() {
	return (init_ghidraSeedFile = __esmMin((() => {
		init_configurationErrors();
		init_result();
		MAX_GHIDRA_SEED_BYTES = 32 * 1024 * 1024;
		MAX_GHIDRA_SEED_ENTRIES = 1e6;
		MAX_GHIDRA_SEED_NAME_LENGTH = 2e3;
		ghidraSeedLineError = (line, constraint) => new ConfigurationError("Invalid REA environment configuration", { settings: [{
			setting: "REA_GHIDRA_SEED_FILE",
			constraint: `line ${line}: ${constraint}`
		}] });
		parseGhidraSeeds = (text) => {
			const entries = [];
			const seen = new Set();
			let start = 0;
			for (let number = 1; start < text.length; number++) {
				const newline = text.indexOf("\n", start);
				const end = newline < 0 ? text.length : newline;
				const raw = text.slice(start, end);
				start = end + 1;
				const line = raw.endsWith("\r") ? raw.slice(0, -1) : raw;
				if (line.trim() === "" || line.startsWith("#")) continue;
				const fields = line.split("	");
				if (fields.length < 2 || fields.length > 3) return err(ghidraSeedLineError(number, "expected address<TAB>kind[<TAB>name]"));
				const [address, kind, name] = fields;
				if (address === undefined || !/^0x[0-9a-fA-F]{1,16}$/u.test(address)) return err(ghidraSeedLineError(number, "address must be 0x-prefixed hex"));
				if (kind !== "function" && kind !== "code" && kind !== "label") return err(ghidraSeedLineError(number, "kind must be function, code or label"));
				if (name !== undefined && (name.length === 0 || name.length > 2e3 || /[\s\0]/u.test(name))) return err(ghidraSeedLineError(number, `name must be 1..${MAX_GHIDRA_SEED_NAME_LENGTH} characters without whitespace`));
				if (kind === "label" && name === undefined) return err(ghidraSeedLineError(number, "a label seed requires a name"));
				if (kind === "code" && name !== undefined) return err(ghidraSeedLineError(number, "a code seed takes no name; add a label seed"));
				const value = BigInt(address);
				const key = `${value.toString(16)}:${kind}`;
				if (seen.has(key)) return err(ghidraSeedLineError(number, `duplicate ${kind} seed at ${address}`));
				seen.add(key);
				entries.push({
					address: value,
					kind,
					...name === undefined ? {} : { name }
				});
				if (entries.length > 1e6) return err(ghidraSeedLineError(number, `more than ${MAX_GHIDRA_SEED_ENTRIES} seed entries`));
			}
			return ok(entries);
		};
		normalizedGhidraSeeds = (entries) => entries.map((entry) => `0x${entry.address.toString(16)}\t${entry.kind}${entry.name === undefined ? "" : `\t${entry.name}`}\n`).join("");
	})))();
}

//#endregion
export { MAX_GHIDRA_SEED_BYTES, MAX_GHIDRA_SEED_ENTRIES, MAX_GHIDRA_SEED_NAME_LENGTH, ghidraSeedLineError, init_ghidraSeedFile, normalizedGhidraSeeds, parseGhidraSeeds };