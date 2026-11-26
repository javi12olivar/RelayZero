import { metadataRowCursor, metadataToken, readRequiredMetadataName, } from "../domain/managed/managedMetadataHeaps.js";
const METHOD_CODE_TYPES = ["il", "native", "optil", "runtime"];
/** Scalar MethodDef facts; consumers own heap admission and method selection. */
export const readMethodDefinitionRow = (bytes, layout, row) => {
    // Layout admission bounds the whole fixed-width row before a cursor is created.
    const cursor = metadataRowCursor(bytes, layout, 6, row);
    const rva = cursor.u32();
    const implFlags = cursor.u16();
    const flags = cursor.u16();
    return {
        token: metadataToken(6, row),
        rowOffset: cursor.start,
        rva,
        implFlags,
        flags,
        nameOffset: cursor.offset,
        nameIndex: cursor.readIndex(layout.stringIndexSize),
        signatureIndex: cursor.readIndex(layout.blobIndexSize),
        implementation: {
            codeType: METHOD_CODE_TYPES[(implFlags & 0x0003)],
            managedKind: (implFlags & 0x0004) === 0 ? "managed" : "unmanaged",
            pinvokeFlag: (flags & 0x2000) !== 0,
            internalCall: (implFlags & 0x1000) !== 0,
        },
    };
};
export const readMethodDefinitionName = (bytes, layout, definition) => readRequiredMetadataName(bytes, layout, "MethodDef", definition.token, definition);
