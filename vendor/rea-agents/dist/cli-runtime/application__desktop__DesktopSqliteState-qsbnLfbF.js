import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, init_analysisErrorCore } from "./jsonSerialization-DAF9DVXC.js";
import { init_jsonValueByteLength, jsonValueByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { init_sqliteDatabase, sqliteDatabaseSchema } from "./sqliteDatabase-bbzobPkZ.js";
import { DESKTOP_VIEW_DEFAULTS, desktopSqliteViewLimitMessage, init_desktopViewPolicy, init_stateFormats, plainRecord } from "./x11Windows-Cx5-JOUb.js";

//#region dist/application/desktop/DesktopSqliteState.js
var cellValue, report, readSqliteStateView;
function init_DesktopSqliteState() {
	return (init_DesktopSqliteState = __esmMin((() => {
		init_analysisErrorCore();
		init_jsonValueByteLength();
		init_sqliteDatabase();
		init_stateFormats();
		init_desktopViewPolicy();
		cellValue = (cell) => {
			switch (cell.type) {
				case "null": return null;
				case "integer": {
					const value = Number(cell.value);
					return Number.isSafeInteger(value) ? value : { integer: cell.value };
				}
				case "real": return typeof cell.value === "string" ? { real: cell.value } : cell.value;
				case "text": return cell.value.includes("�") ? {
					text: cell.value,
					bytes_hex: cell.bytes_hex
				} : cell.value;
				case "blob": return { blob_hex: cell.hex };
			}
		};
		report = async (service, input, signal) => {
			const inspected = await service.inspect(input, signal === undefined ? {} : { signal });
			if (!inspected.ok) {
				if (inspected.error instanceof AnalysisCancelledError || inspected.error.cleanupIncomplete) throw inspected.error;
				return inspected.error.message;
			}
			const parsed = sqliteDatabaseSchema.safeParse(inspected.value.normalized_result);
			return parsed.success ? parsed.data : "unexpected SQLite report";
		};
		readSqliteStateView = async (service, database, signal, policy = DESKTOP_VIEW_DEFAULTS) => {
			const inventory = await report(service, {
				path: database,
				schema_scope: "database"
			}, signal);
			if (typeof inventory === "string") return {
				ok: false,
				error: inventory
			};
			const tables = plainRecord();
			const ordinary = inventory.schema.tables.filter((table) => table.kind === "table");
			for (const table of ordinary.slice(0, policy.sqlite_tables)) {
				const selected = await report(service, {
					path: database,
					table: table.name,
					row_limit: policy.sqlite_rows
				}, signal);
				if (typeof selected === "string") {
					tables[table.name] = { error: selected };
					continue;
				}
				const rows = selected.rows;
				const view = {
					columns: rows?.columns ?? [],
					primary_key: table.columns.filter((column) => column.primary_key_position > 0).sort((left, right) => left.primary_key_position - right.primary_key_position).map((column) => column.name),
					rows: [],
					truncated: rows?.truncated ?? false
				};
				let bytes = jsonValueByteLength(view, policy.sqlite_view_bytes);
				for (const row of rows?.values ?? []) {
					if (bytes > policy.sqlite_view_bytes) break;
					const projected = row.map(cellValue);
					bytes += (view.rows.length === 0 ? 0 : 1) + jsonValueByteLength(projected, policy.sqlite_view_bytes - bytes);
					if (bytes <= policy.sqlite_view_bytes) view.rows.push(projected);
				}
				tables[table.name] = bytes > policy.sqlite_view_bytes ? { error: desktopSqliteViewLimitMessage(policy) } : view;
			}
			return {
				ok: true,
				view: {
					tables,
					tables_truncated: ordinary.length > policy.sqlite_tables
				}
			};
		};
	})))();
}

//#endregion
init_DesktopSqliteState();
export { readSqliteStateView };