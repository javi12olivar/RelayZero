import { ApktoolResourceAnalysisService } from "../application/apktool/ApktoolResourceAnalysisService.js";
import { createApktoolResourceAnalysisProvider } from "../composition/apktool.js";
import { APKTOOL_TOOL_CONTRACTS } from "../contracts/apktool/apktoolToolContracts.js";
import { contractNamed } from "./contractCliDescription.js";
import { analyzeWithService, registerContractCommand, } from "./contractCommand.js";
import { finishCliEvidenceCommand } from "./cliEvidenceCallerPath.js";
import { projectCliAnalysisResult } from "./projectCliAnalysisResult.js";
/** Expose the same explicit Apktool requests through one-shot CLI commands. */
export const registerApktoolCommands = (cli, logger, environment, provider = createApktoolResourceAnalysisProvider(environment)) => {
    const service = new ApktoolResourceAnalysisService(provider);
    const run = (operation) => () => ({
        inspect: (input, { signal }) => service.execute(operation, input, { signal }),
        close: () => provider.close(),
    });
    registerContractCommand(cli, logger, contractNamed(APKTOOL_TOOL_CONTRACTS, "inspect_apktool_client"), {
        description: "Inspect the caller-selected apktool launcher without decoding anything",
    }, analyzeWithService(run("inspect_apktool_client"), "apktool"));
    registerContractCommand(cli, logger, contractNamed(APKTOOL_TOOL_CONTRACTS, "decode_android_resources"), {
        description: "Decode one APK's manifest, metadata, and string resources with apktool",
        // The contract admits a relative path, resolved by the provider from
        // the working directory, so the CLI passes it on as spelled.
        positionals: ["path"],
        fields: {
            include_strings: {
                name: "strings",
                description: "Include string resources; use --no-strings to skip projecting them",
            },
            locales: {
                description: "Repeat to project multiple localized string tables, e.g. --locales de --locales pt-BR",
            },
        },
    }, (input, { operation, signal }) => {
        const owned = run("decode_android_resources")();
        return finishCliEvidenceCommand(input.path, () => owned.inspect(input, { signal }), owned, "apktool", operation, signal).then(projectCliAnalysisResult);
    });
};
