import { insideArtifact } from "./artifactRange.js";
import { AnalysisOutputError } from "../../domain/analysisErrorCore.js";
import { createEvidence } from "../../domain/evidence.js";
import { inspectElfNotesInputSchema, elfNotesSchema, } from "../../domain/native/elfNotes.js";
import { elfArchitecture } from "../../domain/elfFixedHeader.js";
import { err } from "../../domain/result.js";
import { completeProviderEvidence } from "../ProviderOperationExecution.js";
import { parseAnalysisInput } from "../AnalysisInput.js";
const OPERATION = "inspect_elf_notes";
/** Shared caller validation, output parsing and Evidence provenance for CLI/MCP. */
export class ElfNotesService {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    close() {
        return this.provider.close?.() ?? Promise.resolve();
    }
    async inspect(rawInput, options) {
        const input = parseAnalysisInput(OPERATION, rawInput, inspectElfNotesInputSchema, options?.signal);
        if (!input.ok)
            return input;
        const result = await this.provider.inspect(input.value, options);
        if (!result.ok)
            return result;
        const report = elfNotesSchema.safeParse(result.value);
        if (!report.success ||
            report.data.artifact.path !== input.value.path ||
            !validReport(report.data, input.value.max_entries, input.value.max_file_bytes))
            return err(new AnalysisOutputError(OPERATION, "ELF note provider returned malformed output or changed artifact identity."));
        const value = report.data;
        const architecture = elfArchitecture(value.machine);
        const locations = [
            { kind: "artifact-path", path: value.artifact.path },
            ...value.tables.map((table) => ({
                kind: "file-offset-range",
                start: table.location.offset,
                end: table.location.offset + table.location.bytes,
            })),
        ];
        return completeProviderEvidence(createEvidence({
            path: value.artifact.path,
            format: "elf",
            sha256: value.artifact.sha256,
            ...(architecture === undefined ? {} : { architecture }),
        }, this.provider.identity, {
            operation: OPERATION,
            parameters: input.value,
            result: value,
            confidence: "observed",
            limitations: value.limitations,
            locations,
        }), options?.signal);
    }
}
const validReport = (report, maxEntries, maxBytes) => {
    const inside = insideArtifact(report.artifact.bytes);
    if (report.artifact.bytes > maxBytes ||
        report.coverage.examined_entries > maxEntries ||
        report.entries.length !== report.coverage.examined_entries ||
        report.tables.length !== report.coverage.examined_tables)
        return false;
    return (report.tables.every((table) => inside(table.location)) &&
        report.entries.every((entry) => inside(entry.location) && inside(entry.descriptor.location)));
};
