import { metadataRowCursor, metadataToken, readRequiredMetadataName, } from "../domain/managed/managedMetadataHeaps.js";
/** Scalar Field facts; consumers own heap admission and field selection. */
export const readFieldDefinitionRow = (bytes, layout, row) => {
    // Layout admission bounds the complete row independently of its heap values.
    const cursor = metadataRowCursor(bytes, layout, 4, row);
    return {
        token: metadataToken(4, row),
        rowOffset: cursor.start,
        flags: cursor.u16(),
        nameOffset: cursor.offset,
        nameIndex: cursor.readIndex(layout.stringIndexSize),
        signatureIndex: cursor.readIndex(layout.blobIndexSize),
    };
};
export const readFieldDefinitionName = (bytes, layout, definition) => readRequiredMetadataName(bytes, layout, "Field", definition.token, definition);
