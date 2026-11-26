import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_jsonValue, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { init_relationshipCoverage, relationshipCoverageSchema } from "./relationshipCoverage-2rn3-vch.js";
import { init_pseudocodeAbsence, pseudocodeAbsenceSchema } from "./pseudocodeAbsence-BV9XJ6rk.js";
import { analysisSourceDescriptorSchema, init_analysisSource } from "./analysisSource-DxhSgcPs.js";

//#region dist/ports/AnalysisProvider.js
function createAnalysisExecution(result, provider, options = {}) {
	return {
		result: jsonValueSchema.parse(result),
		rawResult: options.rawResult === undefined ? null : jsonValueSchema.parse(options.rawResult),
		provider,
		...options.pseudocodeAbsence === undefined ? {} : { pseudocodeAbsence: pseudocodeAbsenceSchema.parse(options.pseudocodeAbsence) },
		...options.sourceDescriptor === undefined ? {} : { sourceDescriptor: analysisSourceDescriptorSchema.parse(options.sourceDescriptor) },
		...options.cachePolicy === undefined ? {} : { cachePolicy: options.cachePolicy },
		...options.analysisProfile === undefined ? {} : { analysisProfile: structuredClone(options.analysisProfile) },
		limitations: [...options.limitations ?? []],
		...options.relationshipCoverage === undefined ? {} : { relationshipCoverage: relationshipCoverageSchema.parse(options.relationshipCoverage) },
		...options.referencesTruncated === undefined ? {} : { referencesTruncated: options.referencesTruncated },
		...options.requiresSourceEvidence === undefined ? {} : { requiresSourceEvidence: options.requiresSourceEvidence },
		...options.referenceCoverageGaps === undefined ? {} : { referenceCoverageGaps: options.referenceCoverageGaps },
		...options.referenceClassifications === undefined ? {} : { referenceClassifications: options.referenceClassifications },
		...options.siblingUnavailability === undefined ? {} : { siblingUnavailability: options.siblingUnavailability },
		locations: [...options.locations ?? []],
		...options.sourceEvidence === undefined ? {} : { sourceEvidence: Object.freeze([...options.sourceEvidence]) },
		...options.subject === undefined ? {} : { subject: options.subject },
		...options.authority === undefined ? {} : { authority: options.authority }
	};
}
function init_AnalysisProvider() {
	return (init_AnalysisProvider = __esmMin((() => {
		init_jsonValue();
		init_pseudocodeAbsence();
		init_analysisSource();
		init_relationshipCoverage();
	})))();
}

//#endregion
export { createAnalysisExecution, init_AnalysisProvider };