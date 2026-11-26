import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_xmlDocument, isUnqualifiedXmlElement, parseXmlDocument } from "./xmlDocument-DuM0TF5n.js";

//#region dist/domain/android/decodedAndroidManifest.js
var parseDecodedAndroidManifest;
function init_decodedAndroidManifest() {
	return (init_decodedAndroidManifest = __esmMin((() => {
		init_result();
		init_xmlDocument();
		parseDecodedAndroidManifest = (source, doctype) => {
			const parsed = parseXmlDocument(source, {
				doctype,
				lineEndings: "preserve"
			});
			if (!parsed.ok) return parsed;
			const root = parsed.value.documentElement;
			if (!isUnqualifiedXmlElement(root) || root.localName !== "manifest") return err({ kind: "unexpected-root" });
			return ok({
				root,
				packageName: root.getAttributeNS(null, "package") || null
			});
		};
	})))();
}

//#endregion
export { init_decodedAndroidManifest, parseDecodedAndroidManifest };