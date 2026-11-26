import { Budget } from "../domain/budget.js";
import { MAVEN_GRADLE_METADATA_UNRESOLVED_RECORDS, mavenPropertyOccurrences, } from "../domain/java/mavenGradleMetadata.js";
import { metadataReportLimit } from "./MavenGradleMetadata.errors.js";
/** One report-wide admission owner for references and missing-coordinate facts. */
export class MavenGradleUnresolvedCollector {
    #records = [];
    #budget;
    constructor(maximum = MAVEN_GRADLE_METADATA_UNRESOLVED_RECORDS) {
        this.#budget = new Budget(maximum);
    }
    #reserve() {
        this.#budget.charge(1, () => metadataReportLimit("unresolved_records", this.#budget.maximum, this.#budget.used + 1));
    }
    properties(fields, owner, index) {
        for (const [field, value] of fields) {
            const seen = new Set();
            for (const reference of mavenPropertyOccurrences(value)) {
                if (seen.has(reference))
                    continue;
                // Admit before retaining either the distinct reference or its record.
                this.#reserve();
                seen.add(reference);
                this.#records.push({
                    kind: "property",
                    reference,
                    field,
                    owner,
                    index,
                });
            }
        }
    }
    coordinates(coordinates, owner, index, parentPresent) {
        const fields = [
            ["group_id", coordinates.group_id],
            ["artifact_id", coordinates.artifact_id],
            ["version", coordinates.version],
        ];
        for (const [field, value] of fields) {
            if (value !== null) {
                this.properties([[field, value]], owner, index);
                continue;
            }
            // Maven's parent may supply group/version, but never the child's artifactId.
            const inherited = parentPresent && owner === "project" && field !== "artifact_id";
            this.#reserve();
            this.#records.push({
                kind: inherited ? "parent-coordinate" : "missing-coordinate",
                reference: inherited ? `parent.${field}` : `${owner}.${field}`,
                field,
                owner,
                index,
            });
        }
    }
    /** Transfer the bounded records into the completed report. */
    finish() {
        return this.#records;
    }
}
