import { z } from "zod";
const annotations = z.registry();
/** The annotations declared on this schema or the schema it was cloned from. */
export const schemaAnnotations = (schema) => annotations.get(schema);
/**
 * Advertise a root union of two strict objects as one object keyed on
 * `discriminator`: the alternative requiring it, otherwise the other one.
 */
export const presentRootDiscriminator = (schema, discriminator) => {
    annotations.add(schema, {
        ...annotations.get(schema),
        rootDiscriminator: discriminator,
    });
    return schema;
};
/**
 * Advertise a copy of `schema` as a complete producer result to pass back
 * unchanged. The shared result schema itself keeps its full advertised form
 * wherever else it appears, such as the producer's output schema.
 */
export const presentCompleteObservation = (schema) => {
    // The clone inherits the source's annotations and description.
    const annotated = schema.clone();
    annotations.add(annotated, { completeObservation: true });
    return annotated;
};
/**
 * Record how `schema`'s pattern-only declaration relates to its runtime
 * predicate. `schemaConstraints.ts` owns the declaration itself.
 */
export const annotatePatternDeclaration = (schema, relation) => {
    annotations.add(schema, {
        ...annotations.get(schema),
        patternDeclaration: relation,
    });
    return schema;
};
/** Advertise an output union of objects with an object root type. */
export const presentObjectRoot = (schema) => {
    annotations.add(schema, { ...annotations.get(schema), objectRoot: true });
    return schema;
};
