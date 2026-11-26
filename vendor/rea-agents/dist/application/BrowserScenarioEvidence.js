import { unknownTarget } from "../domain/targetIdentity.js";
import { isDeepStrictEqual } from "node:util";
import { digestCanonicalValue } from "../domain/canonicalDigest.js";
import { createEvidence, } from "../domain/evidence.js";
import { jsonObjectSchema } from "../domain/jsonValue.js";
const browserScenarioParameters = (scenario) => {
    return {
        ...jsonObjectSchema.parse(scenario),
        scenario_sha256: digestCanonicalValue(scenario, "Browser scenario"),
    };
};
/** Create Evidence without retaining resolved scenario secret values. */
export const createBrowserScenarioEvidence = (scenario, report, provider) => {
    const capture = report.facts;
    return createEvidence(unknownTarget("not-observed"), provider, {
        predicateType: "rea.browser-scenario-capture",
        operation: "capture_browser_scenario",
        parameters: browserScenarioParameters(scenario),
        result: capture,
        rawResult: isDeepStrictEqual(report.source, capture) ? null : report.source,
        confidence: "observed",
        authority: "controlled-replay",
        environment: {
            id: `${capture.browser.product}@${capture.browser.version}`,
            platform: "unknown",
            architecture: "unknown",
            isolation: capture.browser.process_ownership === "provider-owned"
                ? "process"
                : "none",
        },
        limitations: [
            ...capture.limitations,
            "Browser host platform and architecture were not observed.",
        ],
    });
};
