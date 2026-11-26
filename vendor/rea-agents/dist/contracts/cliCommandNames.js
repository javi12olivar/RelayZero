/**
 * The CLI command of a contract that declares `cli: true`. The contract
 * registry owns these names; `CLI_COMMANDS` holds only the commands no
 * contract names.
 */
export const cliCommandFor = (name) => name.replaceAll("_", "-");
/** Names of the CLI commands that no contract names. */
export const CLI_COMMANDS = Object.freeze({
    analyze: "analyze",
    inspect: "inspect",
    decompile: "decompile",
    setup: "setup",
    doctor: "doctor",
    uninstall: "uninstall",
    update: "update",
    trace: "trace",
    capabilities: "capabilities",
    providers: "providers",
    guidance: "guidance",
    function: "function",
    instructions: "instructions",
    search: "search",
    importReferenceSource: "import-reference-source",
    listObjdumpArchitectures: "list-objdump-architectures",
    debugWithGdb: "debug-with-gdb",
    debugWithRizin: "debug-with-rizin",
    inspectEvidenceBundle: "inspect-evidence-bundle",
    evidenceImport: "evidence-import",
    evidenceExport: "evidence-export",
    environmentServe: "environment-serve",
    environmentExport: "environment-export",
    environmentCompare: "environment-compare",
    environmentBuild: "environment-build",
    compare: "compare",
    captureProcess: "capture-process",
    captureDesktopApplication: "capture-desktop-application",
    inspectDesktopApplicationState: "inspect-desktop-application-state",
    exportDesktopApplication: "export-desktop-application",
    describeDesktopApplicationTask: "describe-desktop-application-task",
    validateBrowserScenario: "validate-browser-scenario",
});
/**
 * Commands that announce their progress at info level when REA_LOG_LEVEL is
 * unset, like `rea mcp --http`. Their logger writes to stderr directly.
 */
export const DEFAULT_INFO_LOGGING_COMMANDS = new Set([
    CLI_COMMANDS.environmentServe,
    CLI_COMMANDS.environmentBuild,
]);
