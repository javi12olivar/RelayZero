import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, inspectWithService, registerContractCommand } from "./contractCommand-Di2ugplH.js";
import { createSqliteDatabaseService, init_sqlite } from "./sqlite-BpLyNhmr.js";
import { SQLITE_TOOL_CONTRACTS, init_sqliteToolContracts } from "./sqliteToolContracts-BxIT0LzG.js";

//#region dist/cli/sqliteCommands.js
var sqliteCommands_exports = /* @__PURE__ */ __exportAll({ registerSqliteCommands: () => registerSqliteCommands });
var registerSqliteCommands;
function init_sqliteCommands() {
	return (init_sqliteCommands = __esmMin((() => {
		init_sqlite();
		init_sqliteToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		registerSqliteCommands = (cli, logger, environment) => {
			const service = createSqliteDatabaseService(environment);
			const contract = contractNamed(SQLITE_TOOL_CONTRACTS, "inspect_sqlite_database");
			registerContractCommand(cli, logger, contract, {
				description: "Inspect SQLite schema and optional ordinary-table rows from a local snapshot",
				positionals: ["path"],
				callerPaths: ["path"],
				crossFieldRules: "argv",
				fields: {
					path: { description: "Local SQLite database snapshot" },
					table: { description: "Exact ordinary table name to read" },
					columns: {
						name: "column",
						description: "Repeat to select exact row columns in the requested order; requires table"
					},
					schema_scope: { description: "Compact inventory by default, or selected-table details when table is supplied; database requests full schema" },
					row_limit: { description: "Positive safe integer row count; default 20; requires table" },
					row_offset: { description: "Non-negative safe integer rows to skip before the window; default 0; requires table" }
				}
			}, inspectWithService(() => service, "sqlite"));
		};
	})))();
}

//#endregion
export { init_sqliteCommands, sqliteCommands_exports };