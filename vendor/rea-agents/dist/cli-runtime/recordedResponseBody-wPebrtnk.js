import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_strictUtf8, strictUtf8Decoder } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { browserResponseStatusSchema, init_browserObservation } from "./browserObservation-BVcDYwHI.js";
import { z } from "zod";

//#region dist/domain/analysisView/recordedResponseBody.js
var responseDeclarationSchema, responseContentDeclarationSchema, readRecordedResponseDeclaration, strictUtf8, base64PrefixChars, decodeRetainedBase64, sameHarBase64, readRecordedResponseBody, recordedResponseBodyIsEmpty;
function init_recordedResponseBody() {
	return (init_recordedResponseBody = __esmMin((() => {
		init_browserObservation();
		init_strictUtf8();
		responseDeclarationSchema = z.object({ response: z.object({
			status: browserResponseStatusSchema.nullable().optional().catch(null),
			content: z.unknown().optional()
		}) });
		responseContentDeclarationSchema = z.object({
			text: z.unknown().optional(),
			encoding: z.unknown().optional(),
			size: z.unknown().optional(),
			mimeType: z.unknown().optional()
		});
		readRecordedResponseDeclaration = (reported) => {
			const parsed = responseDeclarationSchema.safeParse(reported);
			if (!parsed.success) return undefined;
			const { status, content } = parsed.data.response;
			const parsedContent = responseContentDeclarationSchema.safeParse(content);
			return {
				status: status ?? null,
				content: parsedContent.success ? parsedContent.data : content === null ? null : undefined
			};
		};
		strictUtf8 = () => strictUtf8Decoder("preserve");
		base64PrefixChars = (limitBytes) => Math.ceil((limitBytes + 4) / 3) * 4;
		decodeRetainedBase64 = (encoded, limitBytes) => {
			const prefixChars = base64PrefixChars(limitBytes);
			const cut = encoded.length > prefixChars;
			const prefix = cut ? encoded.slice(0, prefixChars) : encoded;
			const flags = cut ? { bodyCut: true } : {};
			try {
				const text = strictUtf8().decode(Buffer.from(prefix, "base64"), { stream: cut });
				return {
					bodyText: text,
					...flags
				};
			} catch {
				return {
					bodyText: prefix,
					bodyEncoding: "base64",
					...flags
				};
			}
		};
		sameHarBase64 = (reported, retained) => {
			if (reported === retained) return true;
			let at = 0;
			for (let index = 0; index < reported.length; index++) {
				const code = reported.charCodeAt(index);
				if (code === 9 || code === 10 || code === 13 || code === 32) continue;
				if (code !== retained.charCodeAt(at++)) return false;
			}
			return at === retained.length;
		};
		readRecordedResponseBody = (record, limitBytes, declaration = readRecordedResponseDeclaration(record.reported)) => {
			const content = declaration?.content;
			if (content == null) return { bodyText: null };
			const bodyCoordinates = ["/response/content/text", "/response/content/encoding"];
			const within = (pointer, ancestor) => pointer.startsWith(ancestor) && (pointer.length === ancestor.length || pointer[ancestor.length] === "/");
			if (record.redactions.some((redaction) => !("scope" in redaction) && bodyCoordinates.some((pointer) => within(pointer, redaction.pointer))) || record.binary_fields.some((field) => field.state === "redacted" && bodyCoordinates.some((pointer) => within(pointer, field.pointer)))) return { bodyText: null };
			const { text, encoding } = content;
			if (typeof text !== "string") return { bodyText: null };
			if (encoding === undefined) {
				const hiddenNames = record.redactions.some((redaction) => "scope" in redaction && redaction.pointer === "/response/content");
				return { bodyText: hiddenNames ? null : text };
			}
			if (encoding !== "base64") return { bodyText: null };
			const binary = record.binary_fields.find((field) => field.pointer === "/response/content/text" && field.state === "retained");
			if (binary === undefined || binary.representation !== "har-base64-content" || binary.content_base64 === null || !sameHarBase64(text, binary.content_base64)) return {
				bodyText: null,
				sourceUnavailable: true
			};
			return decodeRetainedBase64(binary.content_base64, limitBytes);
		};
		recordedResponseBodyIsEmpty = (record, declaration = readRecordedResponseDeclaration(record.reported)) => {
			const body = readRecordedResponseBody(record, 0, declaration);
			return body.bodyText === "" && body.bodyEncoding === undefined && body.bodyCut !== true;
		};
	})))();
}

//#endregion
export { base64PrefixChars, decodeRetainedBase64, init_recordedResponseBody, readRecordedResponseBody, readRecordedResponseDeclaration, recordedResponseBodyIsEmpty };