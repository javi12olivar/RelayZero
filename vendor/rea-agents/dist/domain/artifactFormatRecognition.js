import { hasAndroidBootImageMagic } from "./androidBootImageFormat.js";
import { hasBinaryPlistSignature } from "./apple/appleArchiveFormat.js";
import { hasDfuSePrefix, isDfuSeFile } from "./firmware/dfuse.js";
import { ESP8266_REFUSAL, recognizeEspImage } from "./firmware/espImage.js";
import { hasFitImagesNode } from "./firmware/fitImage.js";
import { detectHexRecordEncoding } from "./firmware/hexRecords.js";
import { hasUf2Block } from "./firmware/uf2.js";
import { hasGodotPckHeader } from "./godotPckFormat.js";
import { nesContainerFormat, parseInesLayout } from "./inesContainer.js";
import { recognizeAndroidOtaPayload } from "./firmware/androidOtaPayload.js";
import { hasUImageMagic } from "./uimageFormat.js";
import { hasUnityFsHeader } from "./unityfsFormat.js";
import { hasMftFileRecordHeader } from "./windows/ntfsMft.js";
import { hasWxapkgEncryptedMagic, hasWxapkgHeader } from "./wxapkgFormat.js";
import { hasZipSignature } from "./zipPackageFormat.js";
const when = (format, claims) => ({ prefix }) => claims(prefix) ? { state: "recognized", format } : undefined;
/**
 * The one ordered recognizer table. Inventory classification and binary
 * target resolution both walk it, so the same bytes reach the same verdict;
 * each route decides only what a refusal or a missing input means for it.
 */
export const ARTIFACT_FORMAT_RECOGNIZERS = [
    ({ prefix, fileSize }) => {
        if (nesContainerFormat(prefix) === undefined)
            return undefined;
        const layout = parseInesLayout(prefix, fileSize);
        return layout.ok
            ? { state: "recognized", format: "ines" }
            : { state: "refused", format: "ines", reason: layout.error.detail };
    },
    when("zip", hasZipSignature),
    when("godot-pck", hasGodotPckHeader),
    when("unityfs", hasUnityFsHeader),
    when("wxapkg", (prefix) => hasWxapkgEncryptedMagic(prefix) || hasWxapkgHeader(prefix)),
    when("uimage", hasUImageMagic),
    when("android-boot-image", hasAndroidBootImageMagic),
    ({ prefix }) => {
        const ota = recognizeAndroidOtaPayload(prefix);
        if (ota === undefined)
            return undefined;
        return ota.state === "recognized"
            ? { state: "recognized", format: "android-ota-payload" }
            : {
                state: "refused",
                format: "android-ota-payload",
                reason: ota.reason,
            };
    },
    ({ prefix }) => {
        const format = detectHexRecordEncoding(prefix);
        return format === undefined ? undefined : { state: "recognized", format };
    },
    when("uf2", hasUf2Block),
    ({ prefix, suffix, fileSize }) => {
        if (!hasDfuSePrefix(prefix))
            return undefined;
        if (suffix === undefined)
            return { state: "needs-input", format: "dfuse" };
        return isDfuSeFile(prefix, suffix, fileSize)
            ? { state: "recognized", format: "dfuse" }
            : undefined;
    },
    // A C3 or S3 flash dump begins with its bootloader image, so the flash
    // layout is decided before the image header.
    ({ espFlashLayout }) => espFlashLayout === undefined
        ? { state: "needs-input", format: "esp-flash-image" }
        : espFlashLayout
            ? { state: "recognized", format: "esp-flash-image" }
            : undefined,
    ({ prefix, fileSize }) => {
        const esp = recognizeEspImage(prefix, fileSize);
        if (esp === undefined)
            return undefined;
        return esp === "esp-image"
            ? { state: "recognized", format: "esp-image" }
            : { state: "refused", format: "esp-image", reason: ESP8266_REFUSAL };
    },
    when("fit", hasFitImagesNode),
    when("ntfs-mft", hasMftFileRecordHeader),
    // Binary plists, including keyed archives, often use other extensions.
    when("plist", hasBinaryPlistSignature),
];
/**
 * The first recognizer at or after `from` whose format the bytes claim, or
 * `undefined` when none does.
 */
export const recognizeArtifactFormat = (input, from = 0) => {
    for (let index = from; index < ARTIFACT_FORMAT_RECOGNIZERS.length; index++) {
        const recognition = ARTIFACT_FORMAT_RECOGNIZERS[index](input);
        if (recognition !== undefined)
            return { ...recognition, index };
    }
    return undefined;
};
