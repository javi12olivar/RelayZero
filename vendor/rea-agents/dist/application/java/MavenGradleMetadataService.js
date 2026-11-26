import { AnalysisOutputError } from "../../domain/analysisErrorCore.js";
import { createEvidence } from "../../domain/evidence.js";
import { inspectMavenGradleMetadataInputSchema, mavenGradleMetadataSchema, } from "../../domain/java/mavenGradleMetadata.js";
import { err } from "../../domain/result.js";
import { completeProviderEvidence } from "../ProviderOperationExecution.js";
import { callerAnalysisParameters, parseAnalysisInput, } from "../AnalysisInput.js";
const OPERATION = "inspect_maven_gradle_metadata";
/** Shared caller validation, output parsing and Evidence provenance for CLI/MCP. */
export class MavenGradleMetadataService {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    close() {
        return this.provider.close();
    }
    async inspect(rawInput, options) {
        const selectedParameters = callerAnalysisParameters(rawInput);
        const input = parseAnalysisInput(OPERATION, rawInput, inspectMavenGradleMetadataInputSchema, options?.signal);
        if (!input.ok)
            return input;
        const result = await this.provider.inspect(input.value, options);
        if (!result.ok)
            return result;
        const report = mavenGradleMetadataSchema.safeParse(result.value);
        if (!report.success ||
            report.data.artifact.path !== input.value.path ||
            !validReport(report.data, input.value))
            return err(new AnalysisOutputError(OPERATION, "Maven/Gradle metadata provider returned malformed output or changed artifact identity."));
        const value = report.data;
        return completeProviderEvidence(createEvidence({
            path: value.artifact.path,
            format: "file",
            sha256: value.artifact.sha256,
        }, this.provider.identity, {
            operation: OPERATION,
            parameters: selectedParameters(input.value),
            result: value,
            confidence: "observed",
            limitations: value.limitations,
            locations: [
                { kind: "artifact-path", path: value.artifact.path },
                {
                    kind: "file-offset-range",
                    start: 0,
                    end: value.artifact.bytes,
                },
            ],
        }), options?.signal);
    }
}
const validReport = (report, input) => {
    if (report.artifact.bytes > input.max_file_bytes)
        return false;
    if (report.coverage.examined_bytes !== report.artifact.bytes)
        return false;
    if (report.format === "maven-pom" && report.gradle !== null)
        return false;
    if (report.format === "gradle-module" && report.parent !== null)
        return false;
    return true;
};
