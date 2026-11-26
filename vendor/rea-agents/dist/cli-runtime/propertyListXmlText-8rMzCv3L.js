import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { ParseFailureError, init_parseFailure } from "./jsonSerialization-DAF9DVXC.js";
import { decodeStrictUtf8, init_strictUtf8 } from "./zstandardFrameAllowance-Bw-ySSsA.js";

//#region dist/domain/textByteOrderMark.js
var byteOrderMarkEncoding;
function init_textByteOrderMark() {
	return (init_textByteOrderMark = __esmMin((() => {
		byteOrderMarkEncoding = (bytes) => {
			if (bytes[0] === 255 && bytes[1] === 254 && bytes[2] === 0 && bytes[3] === 0 || bytes[0] === 0 && bytes[1] === 0 && bytes[2] === 254 && bytes[3] === 255) return "utf-32";
			if (bytes[0] === 255 && bytes[1] === 254) return "utf-16le";
			if (bytes[0] === 254 && bytes[1] === 255) return "utf-16be";
			return null;
		};
	})))();
}

//#endregion
//#region dist/domain/propertyListXmlText.js
var XML_PLIST_FORMAT, XmlPlistTextDecodeError, decodeXmlPlistText, declaredEncoding, asciiXmlDeclaration, verifyEncodingDeclaration;
function init_propertyListXmlText() {
	return (init_propertyListXmlText = __esmMin((() => {
		init_parseFailure();
		init_textByteOrderMark();
		init_strictUtf8();
		XML_PLIST_FORMAT = "xml-plist";
		XmlPlistTextDecodeError = class extends ParseFailureError {
			reason;
			declaredEncoding;
			constructor(reason, message, declaredEncoding, options) {
				super(reason === "unsupported-encoding" ? {
					kind: "unsupported",
					format: XML_PLIST_FORMAT,
					detail: message,
					undecodedContent: true
				} : {
					kind: "malformed",
					format: XML_PLIST_FORMAT,
					detail: message
				}, options);
				this.reason = reason;
				this.declaredEncoding = declaredEncoding;
				this.name = "XmlPlistTextDecodeError";
			}
		};
		decodeXmlPlistText = (bytes) => {
			const marked = byteOrderMarkEncoding(bytes);
			if (marked === "utf-32") throw new XmlPlistTextDecodeError("unsupported-encoding", "Unsupported XML encoding: UTF-32. Supported encodings are UTF-8 and BOM-marked UTF-16 in either byte order.", "UTF-32");
			const encoding = marked ?? "utf-8";
			const prolog = encoding === "utf-8" ? asciiXmlDeclaration(bytes) : undefined;
			const declaration = prolog === undefined ? undefined : declaredEncoding(prolog);
			if (prolog !== undefined) verifyEncodingDeclaration(declaration, encoding);
			let text;
			try {
				text = new TextDecoder(encoding, { fatal: true }).decode(bytes);
			} catch (cause) {
				throw new XmlPlistTextDecodeError("invalid-bytes", "XML text bytes are invalid for the detected encoding", undefined, { cause });
			}
			if (prolog === undefined) verifyEncodingDeclaration(declaredEncoding(text), encoding);
			return text;
		};
		declaredEncoding = (text) => /^<\?xml\s[^?]*\bencoding\s*=\s*["']([^"']+)["']/u.exec(text)?.[1];
		asciiXmlDeclaration = (bytes) => {
			const start = bytes[0] === 239 && bytes[1] === 187 && bytes[2] === 191 ? 3 : 0;
			if (bytes[start] !== 60 || bytes[start + 1] !== 63 || bytes[start + 2] !== 120 || bytes[start + 3] !== 109 || bytes[start + 4] !== 108) return undefined;
			for (let index = start + 5; index < bytes.length; index += 1) {
				if (bytes[index] > 127) return undefined;
				if (bytes[index] === 63 && bytes[index + 1] === 62) return decodeStrictUtf8(bytes.subarray(start, index + 2), "strip-signature");
			}
			return undefined;
		};
		verifyEncodingDeclaration = (declaration, encoding) => {
			const declared = declaration?.toLowerCase();
			if (declared !== undefined && ![
				"utf-8",
				"utf-16",
				"utf-16le",
				"utf-16be"
			].includes(declared)) throw new XmlPlistTextDecodeError("unsupported-encoding", `Unsupported XML encoding declaration: ${declaration}. Supported encodings are UTF-8 and BOM-marked UTF-16 in either byte order.`, declaration);
			if (declared !== undefined && declared !== encoding && !(encoding !== "utf-8" && declared === "utf-16")) throw new XmlPlistTextDecodeError("encoding-mismatch", "XML encoding declaration disagrees with its bytes", declaration);
		};
	})))();
}

//#endregion
export { XmlPlistTextDecodeError, byteOrderMarkEncoding, decodeXmlPlistText, init_propertyListXmlText, init_textByteOrderMark };