import { z } from "zod";
import { ok } from "../result.js";
import { AnalysisOutputError } from "../analysisErrorCore.js";
import { invalidNativeOutput } from "./nativeProviderOutput.js";
import { addressDistance } from "./addressCoordinate.js";
const availableMemoryPermissions = z.object({
    available: z.literal(true),
    source: z.literal("ghidra-memory-block"),
});
/** One reported memory region with its permission availability and provenance. */
const nativeMemoryRegionSchema = z.object({
    name: z.string(),
    start: z.string(),
    end: z.string(),
    readable: z.boolean().nullable(),
    writable: z.boolean().nullable(),
    executable: z.boolean().nullable(),
    permissions: z.union([
        z.object({ available: z.literal(false), reason: z.string() }),
        availableMemoryPermissions,
    ]),
    provenance: z.enum(["hopper-public-python-api", "ghidra-memory-block"]),
    address_space: z.string().optional(),
    image_base: z.string().optional(),
    initialized: z.boolean().optional(),
    overlay: z.boolean().optional(),
});
/** Provider segment list with nested sections, as delivered by list_segments. */
export const nativeSegmentListSchema = z.array(nativeMemoryRegionSchema.extend({
    sections: z.array(nativeMemoryRegionSchema),
}));
const segmentSchema = z.object({
    name: z.string(),
    start: z.string(),
    end: z.string(),
    readable: z.boolean().nullable(),
    writable: z.boolean().nullable(),
    executable: z.boolean().nullable(),
    image_base: z.string().min(1).exactOptional(),
    address_space: z.string().min(1).exactOptional(),
});
/** Preserve reported address context in the provider segment array. */
export const parseSegments = (value, operation = "list_segments") => {
    const parsed = z.array(segmentSchema).safeParse(value);
    return parsed.success
        ? ok(parsed.data)
        : invalidNativeOutput(operation, "segment list", parsed.error);
};
/** Return a reported overview base only when every parsed segment agrees. */
export const parseSegmentImageBase = (segments) => {
    const base = segments[0]?.image_base;
    return base !== undefined &&
        segments.every((segment) => segment.image_base === base)
        ? base
        : undefined;
};
/** Project the same overview from complete lists or provider-owned aggregates. */
export const projectBinaryOverview = (input) => {
    const { document, procedure_count, string_count, segments } = input;
    const imageBase = segments === undefined ? undefined : parseSegmentImageBase(segments);
    return {
        document,
        ...(imageBase === undefined ? {} : { image_base: imageBase }),
        ...(segments === undefined
            ? {}
            : {
                segments: segments.map(({ name, start, end, image_base, address_space }) => ({
                    name,
                    start,
                    end,
                    length: addressDistance(start, end),
                    ...(image_base === undefined ? {} : { image_base }),
                    ...(address_space === undefined ? {} : { address_space }),
                })),
                segment_count: segments.length,
            }),
        procedure_count,
        string_count,
    };
};
