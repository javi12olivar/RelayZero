import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { declaredByPatterns, init_schemaConstraints } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_httpHostname, normalizeHttpHostname } from "./httpHostname-CSn_t4iH.js";
import { z } from "zod";

//#region dist/domain/portableBundleName.js
var PORTABLE_BUNDLE_NAME_PATTERN, PORTABLE_BUNDLE_NAME_MAX_LENGTH, PORTABLE_BUNDLE_NAME_CONSTRAINT, WINDOWS_RESERVED_PART, WINDOWS_RESERVED_NAME, NUMERIC_HOSTNAME_NAME, parsePortableBundleName, isPortableBundleName, portableBundleNameSchema;
function init_portableBundleName() {
	return (init_portableBundleName = __esmMin((() => {
		init_httpHostname();
		init_schemaConstraints();
		init_result();
		PORTABLE_BUNDLE_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
		PORTABLE_BUNDLE_NAME_MAX_LENGTH = 63;
		PORTABLE_BUNDLE_NAME_CONSTRAINT = `a kebab-case label of at most ${String(63)} characters, excluding Windows device names, that remains unchanged as an HTTP service hostname`;
		WINDOWS_RESERVED_PART = "con|prn|aux|nul|com[1-9]|lpt[1-9]";
		WINDOWS_RESERVED_NAME = new RegExp(`^(?:${WINDOWS_RESERVED_PART})$`, "u");
		NUMERIC_HOSTNAME_NAME = /^(?:[0-9]+|0x[0-9a-f]*)$/u;
		parsePortableBundleName = (name) => {
			if (!PORTABLE_BUNDLE_NAME_PATTERN.test(name) || name.length > 63) return err("format");
			if (WINDOWS_RESERVED_NAME.test(name)) return err("reserved");
			if (normalizeHttpHostname(name) !== name) return err("hostname");
			return ok(name);
		};
		isPortableBundleName = (name) => parsePortableBundleName(name).ok;
		portableBundleNameSchema = declaredByPatterns(z.string().regex(PORTABLE_BUNDLE_NAME_PATTERN).max(63), isPortableBundleName, {
			excludes: [WINDOWS_RESERVED_NAME, NUMERIC_HOSTNAME_NAME],
			relation: "wider"
		}, { message: `Expected ${PORTABLE_BUNDLE_NAME_CONSTRAINT}` });
	})))();
}

//#endregion
export { PORTABLE_BUNDLE_NAME_CONSTRAINT, PORTABLE_BUNDLE_NAME_PATTERN, init_portableBundleName, isPortableBundleName, parsePortableBundleName, portableBundleNameSchema };