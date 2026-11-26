import { err, ok } from "../result.js";
import { isUnqualifiedXmlElement, parseXmlDocument, } from "../xmlDocument.js";
/** Read the decoded root and its package without validating package-name syntax. */
export const parseDecodedAndroidManifest = (source, doctype) => {
    const parsed = parseXmlDocument(source, { doctype, lineEndings: "preserve" });
    if (!parsed.ok)
        return parsed;
    const root = parsed.value.documentElement;
    if (!isUnqualifiedXmlElement(root) || root.localName !== "manifest")
        return err({ kind: "unexpected-root" });
    return ok({
        root,
        packageName: root.getAttributeNS(null, "package") || null,
    });
};
