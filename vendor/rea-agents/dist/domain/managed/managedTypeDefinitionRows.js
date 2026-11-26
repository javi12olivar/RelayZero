import { metadataRowCursor } from "./managedMetadataHeaps.js";
import { memberListIndexSize } from "./managedMemberPointers.js";
export const readTypeDefinitionRowFacts = (bytes, layout, row) => {
    const cursor = metadataRowCursor(bytes, layout, 2, row);
    const flags = cursor.u32();
    const nameOffset = cursor.offset;
    const nameIndex = cursor.readIndex(layout.stringIndexSize);
    const namespaceOffset = cursor.offset;
    const namespaceIndex = cursor.readIndex(layout.stringIndexSize);
    const extendsOffset = cursor.offset;
    const extendsRaw = cursor.readIndex(layout.codedIndexSize("TypeDefOrRef"));
    const fieldListOffset = cursor.offset;
    const fieldListRaw = cursor.readIndex(memberListIndexSize(layout, 4));
    const methodListOffset = cursor.offset;
    const methodListRaw = cursor.readIndex(memberListIndexSize(layout, 6));
    return {
        rowOffset: cursor.start,
        flags,
        nameIndex,
        nameOffset,
        namespaceIndex,
        namespaceOffset,
        extendsRaw,
        extendsOffset,
        fieldListRaw,
        fieldListOffset,
        methodListRaw,
        methodListOffset,
    };
};
