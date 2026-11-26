import { HOST_PLATFORM } from "../platform/HostPlatform.js";
import { currentClientRegistrationCommand } from "../application/ClientRegistrationIdentity.js";
import { parseCliGlobalArguments } from "../cliBuiltinArguments.js";
import { parseLogLevel } from "../config/processStart.js";
import { parseClientRegistrationCommand } from "../domain/clientRegistrationCommand.js";
import { PRODUCT_IDENTITY } from "../identity.js";
import { createLogger } from "../logger.js";
import { snapshotEnvironment } from "../process/snapshotEnvironment.js";
import { runCliCommand } from "./runCliCommand.js";
import { completionHelpNote, createCliCompletions } from "./completions.js";
import { serveDiscovery } from "./discovery.js";
import { reportUnknownMcpSubcommand } from "./mcpBuiltinCommands.js";
import { serveMcpRegistration } from "./mcpRegistration.js";
import { presentOmittableDefaults } from "./omittableDefaults.js";
/** Run each registrar, creating analysis once for those that declare it. */
const registerCommands = (context, options) => {
    let analysis;
    for (const { registration, module } of options.registrations) {
        if (!registration.analysis) {
            registration.register(module, context);
            continue;
        }
        if (options.createAnalysis === undefined)
            throw new Error("A CLI registrar needs analysis that was not provided");
        analysis ??= options.createAnalysis(context.environment);
        registration.register(module, { ...context, analysis });
    }
};
/**
 * Build REA's CLI around the given registrars. Identity, global options,
 * argument policy, completions, and registration builtins are the same for
 * every set of registrars; they apply to whichever commands were registered.
 */
export const createCliShell = (options) => {
    const environment = snapshotEnvironment(options.selectedEnvironment, HOST_PLATFORM.platform);
    const defaultRegistration = parseClientRegistrationCommand(currentClientRegistrationCommand({ environment }));
    // The executable reports an invalid level before every command except doctor.
    // Doctor keeps going so its readiness report can name REA_LOG_LEVEL.
    const level = environment.REA_LOG_LEVEL === undefined
        ? undefined
        : parseLogLevel(environment.REA_LOG_LEVEL);
    const logger = createLogger("cli", level?.ok === true ? level.value : "silent");
    const cli = {
        name: PRODUCT_IDENTITY.cliBinary,
        serve,
    };
    registerCommands({
        cli,
        logger,
        environment,
        fridaInstrumentation: options.fridaInstrumentation,
    }, options);
    presentOmittableDefaults(cli);
    const updateEnvironment = {
        variables: environment,
        platform: HOST_PLATFORM.platform,
    };
    const completions = createCliCompletions(cli, environment);
    function serve(arguments_ = process.argv.slice(2), serveOptions) {
        if (completions.complete(arguments_, serveOptions ?? {}))
            return Promise.resolve();
        const global = parseCliGlobalArguments(arguments_);
        if (completions.writeScript(global, serveOptions ?? {}))
            return Promise.resolve();
        const registration = serveMcpRegistration(global, environment, defaultRegistration, serveOptions ?? {});
        if (registration !== undefined)
            return registration;
        const result = reportUnknownMcpSubcommand(cli.name, global, serveOptions ?? {})
            ? Promise.resolve()
            : (serveDiscovery(cli, global.arguments, serveOptions ?? {}, updateEnvironment, global) ??
                runCliCommand(cli, global, serveOptions ?? {}, updateEnvironment, options.resultOutput));
        const note = completionHelpNote(global);
        if (note === undefined)
            return result;
        return result.then(() => {
            const write = serveOptions?.stdout ?? ((text) => process.stdout.write(text));
            write(`\n${note}`);
        });
    }
    return cli;
};
