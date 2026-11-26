import { compositeKey } from "../unicodeCodePointOrder.js";
/** Key an entity by its type, collection, and caller-supplied identifier. */
export const environmentEntityKey = (type, collection, id) => compositeKey([type, collection, id]);
/** Key a collection by its type and caller-supplied collection path. */
export const environmentCollectionKey = (type, collection) => compositeKey([type, collection]);
