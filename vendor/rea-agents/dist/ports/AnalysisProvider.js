import { jsonValueSchema } from "../domain/jsonValue.js";
import { pseudocodeAbsenceSchema, } from "../domain/native/pseudocodeAbsence.js";
import { analysisSourceDescriptorSchema, } from "../domain/analysisSource.js";
import { relationshipCoverageSchema, } from "../domain/relationshipCoverage.js";
export function createAnalysisExecution(result, provider, options = {}) {
    return {
        result: jsonValueSchema.parse(result),
        rawResult: options.rawResult === undefined
            ? null
            : jsonValueSchema.parse(options.rawResult),
        provider,
        ...(options.pseudocodeAbsence === undefined
            ? {}
            : {
                pseudocodeAbsence: pseudocodeAbsenceSchema.parse(options.pseudocodeAbsence),
            }),
        ...(options.sourceDescriptor === undefined
            ? {}
            : {
                sourceDescriptor: analysisSourceDescriptorSchema.parse(options.sourceDescriptor),
            }),
        ...(options.cachePolicy === undefined
            ? {}
            : { cachePolicy: options.cachePolicy }),
        ...(options.analysisProfile === undefined
            ? {}
            : { analysisProfile: structuredClone(options.analysisProfile) }),
        limitations: [...(options.limitations ?? [])],
        ...(options.relationshipCoverage === undefined
            ? {}
            : {
                relationshipCoverage: relationshipCoverageSchema.parse(options.relationshipCoverage),
            }),
        ...(options.referencesTruncated === undefined
            ? {}
            : { referencesTruncated: options.referencesTruncated }),
        ...(options.requiresSourceEvidence === undefined
            ? {}
            : { requiresSourceEvidence: options.requiresSourceEvidence }),
        ...(options.referenceCoverageGaps === undefined
            ? {}
            : { referenceCoverageGaps: options.referenceCoverageGaps }),
        ...(options.referenceClassifications === undefined
            ? {}
            : { referenceClassifications: options.referenceClassifications }),
        ...(options.siblingUnavailability === undefined
            ? {}
            : { siblingUnavailability: options.siblingUnavailability }),
        locations: [...(options.locations ?? [])],
        ...(options.sourceEvidence === undefined
            ? {}
            : { sourceEvidence: Object.freeze([...options.sourceEvidence]) }),
        ...(options.subject === undefined ? {} : { subject: options.subject }),
        ...(options.authority === undefined
            ? {}
            : { authority: options.authority }),
    };
}
