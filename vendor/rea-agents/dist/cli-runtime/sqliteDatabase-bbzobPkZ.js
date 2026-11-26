import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { absoluteLocalPathStringSchema, init_analysisResourceLimits, init_localPath, init_schemaConstraints, requirePresence, timerDurationMsSchema } from "./jsonSerialization-DAF9DVXC.js";
import { z } from "zod";

//#region dist/domain/sqlite/sqliteDatabase.js
var SQLITE_DATABASE_OUTPUT_BYTES, SQLITE_SCHEMA_TABLE_NAME, sqliteSchemaHasObjectDeclaration, SQLITE_ROW_LIMIT_DEFAULT, DEFAULT_SQLITE_WORKER_TIMEOUT_MS, nonnegative, hex, encoding, artifactSchema, SQLITE_TABLE_REQUIRED_SELECTION_FIELDS, sqliteTableSelectionSchema, inspectSqliteDatabaseInputSchema, sqliteValueSchema, sqliteDatabaseSchema, sqliteInspectionParameters, sqliteSchemaScope;
function init_sqliteDatabase() {
	return (init_sqliteDatabase = __esmMin((() => {
		init_analysisResourceLimits();
		init_schemaConstraints();
		init_localPath();
		SQLITE_DATABASE_OUTPUT_BYTES = 16 * 1024 * 1024;
		SQLITE_SCHEMA_TABLE_NAME = "sqlite_schema";
		sqliteSchemaHasObjectDeclaration = (name) => name !== SQLITE_SCHEMA_TABLE_NAME;
		SQLITE_ROW_LIMIT_DEFAULT = 20;
		DEFAULT_SQLITE_WORKER_TIMEOUT_MS = 3e4;
		nonnegative = z.int().nonnegative();
		hex = z.string().regex(/^(?:[0-9a-f]{2})*$/);
		encoding = z.enum([
			"UTF-8",
			"UTF-16le",
			"UTF-16be"
		]);
		artifactSchema = z.strictObject({
			path: z.string().min(1),
			sha256: z.string().regex(/^[0-9a-f]{64}$/),
			bytes: nonnegative
		});
		SQLITE_TABLE_REQUIRED_SELECTION_FIELDS = [
			"row_limit",
			"columns",
			"row_offset"
		];
		sqliteTableSelectionSchema = requirePresence(z.strictObject({
			table: z.string().optional().describe("Exact ordinary table name; views and virtual/shadow tables are not executed"),
			columns: z.array(z.string()).min(1).optional().describe("Exact row columns in caller-selected order; requires table. Omit to sample all visible columns."),
			schema_scope: z.enum([
				"inventory",
				"selected_table",
				"database"
			]).optional().describe("Default: compact inventory without a table, or detailed selected-table schema with a table. selected_table requires table. Database explicitly expands all stored declarations and supported columns."),
			row_limit: z.int().min(1).optional().describe("Selected-table sample size, default 20; subject to byte and worker resource limits"),
			row_offset: z.int().min(0).optional().describe("Rows to skip before the retained window; default 0; requires table")
		}), [...SQLITE_TABLE_REQUIRED_SELECTION_FIELDS.map((field) => ({
			when: field,
			requires: "table",
			message: `${field} requires an explicit table selection`
		})), {
			when: "schema_scope",
			equals: "selected_table",
			requires: "table",
			message: "selected_table schema scope requires table"
		}]);
		inspectSqliteDatabaseInputSchema = sqliteTableSelectionSchema.safeExtend({
			path: absoluteLocalPathStringSchema.describe("Absolute path to an offline SQLite database snapshot"),
			worker_timeout_ms: timerDurationMsSchema.optional().describe(`Deadline in milliseconds for worker startup, queries and reply writing (default ${String(DEFAULT_SQLITE_WORKER_TIMEOUT_MS)}), not snapshot acquisition or the whole call. Allow client headroom for acquisition, reply reads, cleanup and delivery. Fixed byte/heap limits do not change.`)
		}).describe("When schema_scope is selected_table, also provide table.").meta(sqliteTableSelectionSchema.meta() ?? {});
		sqliteValueSchema = z.discriminatedUnion("type", [
			z.strictObject({ type: z.literal("null") }),
			z.strictObject({
				type: z.literal("integer"),
				value: z.string().regex(/^-?(?:0|[1-9][0-9]*)$/)
			}),
			z.strictObject({
				type: z.literal("real"),
				value: z.union([z.number(), z.enum([
					"Infinity",
					"-Infinity",
					"-0"
				])])
			}),
			z.strictObject({
				type: z.literal("text"),
				value: z.string(),
				bytes_hex: hex,
				encoding
			}),
			z.strictObject({
				type: z.literal("blob"),
				hex
			})
		]);
		sqliteDatabaseSchema = z.strictObject({
			artifact: artifactSchema,
			wal: artifactSchema.nullable(),
			engine: z.strictObject({
				name: z.literal("SQLite"),
				version: z.string().min(1)
			}),
			worker_timeout_ms: timerDurationMsSchema.describe("Actual parent-supervised worker deadline in milliseconds."),
			database_encoding: encoding,
			schema: z.strictObject({
				scope: z.enum([
					"inventory",
					"selected_table",
					"database"
				]),
				completeness: z.literal("complete").describe("Complete within the indicated schema scope; inventory omits declarations and column details"),
				tables: z.array(z.strictObject({
					name: z.string(),
					sql: z.string().nullable().optional(),
					root_page: nonnegative,
					kind: z.enum([
						"table",
						"virtual",
						"shadow",
						"unknown"
					]).describe("Unknown means a possible shadow table of an unresolved virtual table; its rows cannot be inspected"),
					without_rowid: z.boolean(),
					strict: z.boolean(),
					column_count: nonnegative.nullable(),
					columns_completeness: z.enum([
						"complete",
						"unsupported",
						"not_requested"
					]),
					columns: z.array(z.strictObject({
						cid: nonnegative,
						name: z.string(),
						declared_type: z.string(),
						not_null: z.boolean(),
						default_sql: z.string().nullable(),
						primary_key_position: nonnegative,
						hidden: z.union([
							z.literal(0),
							z.literal(1),
							z.literal(2),
							z.literal(3)
						])
					}))
				})),
				indexes: z.array(z.strictObject({
					name: z.string(),
					table: z.string(),
					sql: z.string().nullable().optional(),
					root_page: nonnegative
				})),
				views: z.array(z.strictObject({
					name: z.string(),
					sql: z.string().nullable().optional()
				})),
				triggers: z.array(z.strictObject({
					name: z.string(),
					table: z.string(),
					sql: z.string().nullable().optional()
				}))
			}),
			rows: z.strictObject({
				table: z.string(),
				columns: z.array(z.string()),
				values: z.array(z.array(sqliteValueSchema)),
				row_limit: z.int().min(1),
				returned_rows: nonnegative,
				truncated: z.boolean(),
				order: z.enum([
					"rowid",
					"primary_key",
					"unspecified"
				]).describe("Unique order the retained window is read in; unspecified means the table shadows rowid, _rowid_ and oid and no primary key is declared"),
				row_offset: nonnegative.describe("Rows skipped before this window; 0 for the sample taken without a selection"),
				next_row_offset: nonnegative.nullable().describe("Offset to request for the following page; null when the sampled window reaches the end or the table has no stated order. Pages compose only while artifact.sha256 and wal.sha256 match")
			}).nullable(),
			limitations: z.array(z.string())
		}).superRefine((report, context) => {
			const rows = report.rows;
			if (rows !== null && (rows.returned_rows !== rows.values.length || rows.returned_rows > rows.row_limit || rows.values.some((row) => row.length !== rows.columns.length) || rows.next_row_offset !== (rows.truncated && rows.order !== "unspecified" ? rows.row_offset + rows.returned_rows : null))) context.addIssue({
				code: "custom",
				path: ["rows"],
				message: "Selected row counts, column dimensions and the next window must match the retained values"
			});
		});
		sqliteInspectionParameters = (input) => ({
			path: input.path,
			...input.worker_timeout_ms === undefined ? {} : { worker_timeout_ms: input.worker_timeout_ms },
			...input.table === undefined ? {} : { table: input.table },
			...input.columns === undefined ? {} : { columns: input.columns },
			...input.schema_scope === undefined ? {} : { schema_scope: input.schema_scope },
			...input.row_limit === undefined ? {} : { row_limit: input.row_limit },
			...input.row_offset === undefined ? {} : { row_offset: input.row_offset }
		});
		sqliteSchemaScope = (input) => input.schema_scope ?? (input.table === undefined ? "inventory" : "selected_table");
	})))();
}

//#endregion
export { DEFAULT_SQLITE_WORKER_TIMEOUT_MS, SQLITE_DATABASE_OUTPUT_BYTES, init_sqliteDatabase, inspectSqliteDatabaseInputSchema, sqliteDatabaseSchema, sqliteInspectionParameters, sqliteSchemaHasObjectDeclaration, sqliteSchemaScope };