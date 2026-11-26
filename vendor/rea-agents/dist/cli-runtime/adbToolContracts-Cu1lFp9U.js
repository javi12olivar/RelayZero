import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { IDENTIFIER_PATTERN, init_coverage, init_localPath, init_stringPatterns, knownCoverageStatusSchema, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/domain/adb/adbTransportIdentity.js
var MAX_TRANSPORT_ID, adbTransportIdSchema, adbTransportIdentitySchema, parseAdbTransportIdentity;
function init_adbTransportIdentity() {
	return (init_adbTransportIdentity = __esmMin((() => {
		MAX_TRANSPORT_ID = "18446744073709551615";
		adbTransportIdSchema = z.string().regex(/^[1-9]\d*$/u).refine((value) => value.length < MAX_TRANSPORT_ID.length || value.length === MAX_TRANSPORT_ID.length && value <= MAX_TRANSPORT_ID, "Transport ID exceeds the unsigned 64-bit range").brand();
		adbTransportIdentitySchema = z.discriminatedUnion("status", [
			z.strictObject({
				status: z.literal("reported"),
				decimal: adbTransportIdSchema,
				source_token: z.string(),
				source_line: z.string()
			}),
			z.strictObject({
				status: z.literal("not_reported"),
				source_token: z.null(),
				source_line: z.string()
			}),
			z.strictObject({
				status: z.literal("invalid"),
				source_token: z.string(),
				source_line: z.string(),
				reason: z.enum([
					"invalid_decimal",
					"reserved_zero",
					"outside_uint64"
				])
			})
		]);
		parseAdbTransportIdentity = (source_token, source_line) => {
			if (source_token === null) return {
				status: "not_reported",
				source_token,
				source_line
			};
			if (!/^\d+$/u.test(source_token)) return {
				status: "invalid",
				source_token,
				source_line,
				reason: "invalid_decimal"
			};
			const decimal = source_token.replace(/^0+(?=\d)/u, "");
			if (decimal === "0") return {
				status: "invalid",
				source_token,
				source_line,
				reason: "reserved_zero"
			};
			const admitted = adbTransportIdSchema.safeParse(decimal);
			return admitted.success ? {
				status: "reported",
				decimal: admitted.data,
				source_token,
				source_line
			} : {
				status: "invalid",
				source_token,
				source_line,
				reason: "outside_uint64"
			};
		};
	})))();
}

//#endregion
//#region dist/domain/adb/adbDeviceAnalysis.js
var ADB_DEVICE_OBSERVATION_AUTHORITY, deviceSerialSchema, packageNameSchema, ADB_DEVICE_STATES, adbDeviceStateSchema, MAX_ADB_KEY_LENGTH, keyStringSchema, keyCharacter, keyPattern, activityExtraKeySchema, MAX_ADB_ACTIVITY_EXTRA_VALUE_LENGTH, activityExtraStringValueSchema, activityExtraNonEmptyValueSchema, javaDecimalExtraValuePattern, javaDecimalExtraValueSchema, MAX_ADB_ACTIVITY_EXTRAS, javaFloatValuePattern, activityExtraBooleanPattern, activityExtraSchema, activityExtraCliKey, patternBody, activityExtraCliPattern, activityExtraCliEntrySchema, adbInputSchemas, adbRequestSchema, client, adbDeviceObservationSchema, adbDeviceListObservationSchema, device, pulledArtifact, pullFailure, adbWindowFocusContextSchema, displayNumericReason, displayNumericIssue, adbDisplayNumericIssuesSchema, adbPackageNumericIssuesSchema, adbResultSchemas, adbDisplayPartialObservationSchema;
function init_adbDeviceAnalysis() {
	return (init_adbDeviceAnalysis = __esmMin((() => {
		init_adbTransportIdentity();
		init_coverage();
		init_localPath();
		init_stringPatterns();
		ADB_DEVICE_OBSERVATION_AUTHORITY = "external-service";
		deviceSerialSchema = z.string().min(1).max(256).regex(/^[^\x00\s"']+$/u, "Device serial cannot contain whitespace or quotes");
		packageNameSchema = z.string().min(1).max(256).regex(/^[A-Za-z][A-Za-z0-9_]*(\.[A-Za-z][A-Za-z0-9_]*)*$/u, "Package name must be dot-separated Java identifiers");
		ADB_DEVICE_STATES = [
			"no permissions",
			"unauthorized",
			"authorizing",
			"offline",
			"recovery",
			"sideload",
			"connecting",
			"bootloader",
			"device",
			"unknown",
			"host",
			"rescue",
			"detached"
		];
		adbDeviceStateSchema = z.enum(ADB_DEVICE_STATES);
		MAX_ADB_KEY_LENGTH = 256;
		keyStringSchema = z.string().min(1).max(MAX_ADB_KEY_LENGTH);
		keyCharacter = String.raw`[A-Za-z0-9._\x2d]`;
		keyPattern = new RegExp(`^${keyCharacter}+$`, "u");
		activityExtraKeySchema = keyStringSchema.regex(keyPattern, "Extra keys are identifiers").describe("Extra key");
		MAX_ADB_ACTIVITY_EXTRA_VALUE_LENGTH = 2048;
		activityExtraStringValueSchema = z.string().max(MAX_ADB_ACTIVITY_EXTRA_VALUE_LENGTH).regex(/^[^\x00]*$/u, "Extra values cannot contain NUL");
		activityExtraNonEmptyValueSchema = activityExtraStringValueSchema.min(1);
		javaDecimalExtraValuePattern = /^-?\d+$/u;
		javaDecimalExtraValueSchema = (bits) => {
			const upperBound = 1n << BigInt(bits - 1);
			const range = `signed ${String(bits)}-bit`;
			return z.string().max(MAX_ADB_ACTIVITY_EXTRA_VALUE_LENGTH, { abort: true }).regex(javaDecimalExtraValuePattern, {
				message: "Integer extra values must be signed decimal text",
				abort: true
			}).refine((value) => {
				const decimal = BigInt(value);
				return decimal >= -upperBound && decimal < upperBound;
			}, `Integer extra value is outside the ${range} range`).describe(`Integer extra value as ${range} decimal text`);
		};
		MAX_ADB_ACTIVITY_EXTRAS = 16;
		javaFloatValuePattern = /^[\x01-\x20]*(?:\+|-)?(?:NaN|Infinity|(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eE](?:\+|-)?\d+)?[fFdD]?|0[xX](?:[\da-fA-F]+(?:\.[\da-fA-F]*)?|\.[\da-fA-F]+)[pP](?:\+|-)?\d+[fFdD]?))[\x01-\x20]*$/u;
		activityExtraBooleanPattern = /^(true|false)$/u;
		activityExtraSchema = z.discriminatedUnion("type", [
			z.strictObject({
				key: activityExtraKeySchema,
				type: z.literal("string").describe("String extra value type"),
				value: activityExtraStringValueSchema.describe("String extra value as text; an explicitly empty value is preserved")
			}),
			z.strictObject({
				key: activityExtraKeySchema,
				type: z.literal("boolean").describe("Boolean extra value type"),
				value: activityExtraNonEmptyValueSchema.regex(activityExtraBooleanPattern, "Boolean extra values must be true or false").describe("Boolean extra value as true or false text")
			}),
			z.strictObject({
				key: activityExtraKeySchema,
				type: z.literal("int").describe("Integer extra value type"),
				value: javaDecimalExtraValueSchema(32)
			}),
			z.strictObject({
				key: activityExtraKeySchema,
				type: z.literal("long").describe("Long extra value type"),
				value: javaDecimalExtraValueSchema(64)
			}),
			z.strictObject({
				key: activityExtraKeySchema,
				type: z.literal("float").describe("Float extra value type"),
				value: activityExtraNonEmptyValueSchema.regex(javaFloatValuePattern, "Float extra value must be valid Java float text").describe("Float extra text parsed by Android am without changing its spelling")
			})
		]);
		activityExtraCliKey = `${keyCharacter}{1,${MAX_ADB_KEY_LENGTH}}`;
		patternBody = (pattern) => pattern.source.slice(1, -1);
		activityExtraCliPattern = (type, value) => new RegExp(`^${type}:${activityExtraCliKey}:(?=[^\\x00]{0,${MAX_ADB_ACTIVITY_EXTRA_VALUE_LENGTH}}$)(?:${value})$`, "u");
		activityExtraCliEntrySchema = z.union([
			z.string().regex(activityExtraCliPattern("string", String.raw`[^\x00]*`)),
			z.string().regex(activityExtraCliPattern("boolean", patternBody(activityExtraBooleanPattern))),
			z.string().regex(activityExtraCliPattern("int", patternBody(javaDecimalExtraValuePattern))),
			z.string().regex(activityExtraCliPattern("long", patternBody(javaDecimalExtraValuePattern))),
			z.string().regex(activityExtraCliPattern("float", patternBody(javaFloatValuePattern)))
		]).pipe(z.preprocess((entry) => {
			const typeEnd = entry.indexOf(":");
			const keyEnd = entry.indexOf(":", typeEnd + 1);
			return {
				type: entry.slice(0, typeEnd),
				key: entry.slice(typeEnd + 1, keyEnd),
				value: entry.slice(keyEnd + 1)
			};
		}, activityExtraSchema));
		adbInputSchemas = {
			inspect_adb_client: z.strictObject({}),
			list_adb_devices: z.strictObject({}),
			inspect_adb_device: z.strictObject({ serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it") }),
			list_adb_packages: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				scope: z.enum([
					"all",
					"third_party",
					"system"
				]).default("all").describe("Package scope: all packages, third-party only (-3), or system only (-s)")
			}),
			pull_adb_package: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				package: packageNameSchema.describe("Installed package name whose APK set is pulled"),
				output_directory: localPathStringSchema.describe("Local directory for the pulled APK set; REA creates a package-named subdirectory inside it")
			}),
			read_adb_logcat: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				count: z.int().min(1).max(1e4).default(500).describe("Number of most recent lines to read (logcat -d -t)"),
				buffer: z.enum([
					"main",
					"system",
					"radio",
					"events",
					"crash"
				]).default("main").describe("Log buffer to read (logcat -b)"),
				pid: z.int().positive().optional().describe("Restrict to one process id (logcat --pid)")
			}),
			inspect_adb_package: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				package: packageNameSchema.describe("Installed package to inspect")
			}),
			pull_adb_file: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				device_path: z.string().min(1).regex(/^\/[^\x00]*$/u, "Device path must be absolute").describe("Absolute device filesystem path to pull"),
				output_directory: localPathStringSchema.describe("Local directory for the pulled file; must not already contain the file")
			}),
			push_adb_file: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				local_path: localPathStringSchema.describe("Existing local regular file to push"),
				device_path: z.string().min(1).regex(/^\/[^\x00]*$/u, "Device path must be absolute").describe("Absolute destination path on the device"),
				overwrite: z.boolean().default(false).describe("Allow replacing an existing device file; refused by default")
			}),
			capture_adb_screen: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				output_directory: localPathStringSchema.describe("Local directory for the captured PNG; must not already contain it")
			}),
			list_adb_processes: z.strictObject({ serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it") }),
			list_adb_directory: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				device_path: z.string().min(1).regex(/^\/[^\x00]*$/u, "Device path must be absolute").describe("Absolute device directory path to list, including hidden children")
			}),
			list_adb_features: z.strictObject({ serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it") }),
			list_adb_services: z.strictObject({ serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it") }),
			inspect_adb_display: z.strictObject({ serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it") }),
			inspect_adb_window: z.strictObject({ serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it") }),
			read_adb_setting: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				namespace: z.enum([
					"system",
					"secure",
					"global"
				]).describe("Settings namespace to read"),
				key: keyStringSchema.regex(keyPattern, "Setting keys are restricted to identifiers").describe("Setting key to read")
			}),
			collect_adb_bugreport: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				output_directory: localPathStringSchema.describe("Local directory for the bugreport archive; REA writes exactly one new zip into it")
			}),
			resolve_adb_packages: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				query: z.string().min(2).max(256).describe("Case-insensitive substring matched against installed package names (e.g. whatsapp)")
			}),
			install_adb_package: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				apk_path: localPathStringSchema.describe("Existing local APK file to install"),
				replace: z.boolean().default(false).describe("Request replacement mode and keep existing app data if present (adb install -r); does not establish whether the app was already installed")
			}),
			uninstall_adb_package: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				package: packageNameSchema.describe("Installed package to uninstall")
			}),
			start_adb_app: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				package: packageNameSchema.describe("Installed package whose launcher activity is started")
			}),
			start_adb_activity: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				action: z.string().min(1).max(256).regex(IDENTIFIER_PATTERN, "Intent action must be a dotted identifier such as android.intent.action.VIEW").describe("Intent action to start"),
				data_uri: z.string().min(1).max(2048).regex(/^[^\x00\s]+$/u, "Data URI cannot contain whitespace or NUL").optional().describe("Intent data URI (-d)"),
				component: z.string().min(1).max(512).regex(/^[A-Za-z0-9._\x2d]+\/[A-Za-z0-9._$\x2d]+$/u, "Component must be package/activity form").optional().describe("Explicit component to start (-n)"),
				extras: z.array(activityExtraSchema).max(16).default([]).describe("Typed intent extras (--es/--ez/--ei/--el/--ef)")
			}),
			stop_adb_app: z.strictObject({
				serial: deviceSerialSchema.describe("Device serial exactly as `adb devices` reports it"),
				package: packageNameSchema.describe("Package whose processes are force-stopped")
			})
		};
		adbRequestSchema = z.discriminatedUnion("operation", [
			z.strictObject({
				operation: z.literal("inspect_adb_client"),
				input: adbInputSchemas.inspect_adb_client
			}),
			z.strictObject({
				operation: z.literal("list_adb_devices"),
				input: adbInputSchemas.list_adb_devices
			}),
			z.strictObject({
				operation: z.literal("inspect_adb_device"),
				input: adbInputSchemas.inspect_adb_device
			}),
			z.strictObject({
				operation: z.literal("list_adb_packages"),
				input: adbInputSchemas.list_adb_packages
			}),
			z.strictObject({
				operation: z.literal("pull_adb_package"),
				input: adbInputSchemas.pull_adb_package
			}),
			z.strictObject({
				operation: z.literal("read_adb_logcat"),
				input: adbInputSchemas.read_adb_logcat
			}),
			z.strictObject({
				operation: z.literal("inspect_adb_package"),
				input: adbInputSchemas.inspect_adb_package
			}),
			z.strictObject({
				operation: z.literal("pull_adb_file"),
				input: adbInputSchemas.pull_adb_file
			}),
			z.strictObject({
				operation: z.literal("push_adb_file"),
				input: adbInputSchemas.push_adb_file
			}),
			z.strictObject({
				operation: z.literal("capture_adb_screen"),
				input: adbInputSchemas.capture_adb_screen
			}),
			z.strictObject({
				operation: z.literal("list_adb_processes"),
				input: adbInputSchemas.list_adb_processes
			}),
			z.strictObject({
				operation: z.literal("list_adb_directory"),
				input: adbInputSchemas.list_adb_directory
			}),
			z.strictObject({
				operation: z.literal("list_adb_features"),
				input: adbInputSchemas.list_adb_features
			}),
			z.strictObject({
				operation: z.literal("list_adb_services"),
				input: adbInputSchemas.list_adb_services
			}),
			z.strictObject({
				operation: z.literal("inspect_adb_display"),
				input: adbInputSchemas.inspect_adb_display
			}),
			z.strictObject({
				operation: z.literal("inspect_adb_window"),
				input: adbInputSchemas.inspect_adb_window
			}),
			z.strictObject({
				operation: z.literal("read_adb_setting"),
				input: adbInputSchemas.read_adb_setting
			}),
			z.strictObject({
				operation: z.literal("collect_adb_bugreport"),
				input: adbInputSchemas.collect_adb_bugreport
			}),
			z.strictObject({
				operation: z.literal("resolve_adb_packages"),
				input: adbInputSchemas.resolve_adb_packages
			}),
			z.strictObject({
				operation: z.literal("install_adb_package"),
				input: adbInputSchemas.install_adb_package
			}),
			z.strictObject({
				operation: z.literal("uninstall_adb_package"),
				input: adbInputSchemas.uninstall_adb_package
			}),
			z.strictObject({
				operation: z.literal("start_adb_app"),
				input: adbInputSchemas.start_adb_app
			}),
			z.strictObject({
				operation: z.literal("start_adb_activity"),
				input: adbInputSchemas.start_adb_activity
			}),
			z.strictObject({
				operation: z.literal("stop_adb_app"),
				input: adbInputSchemas.stop_adb_app
			})
		]);
		client = z.strictObject({
			binary_path: z.string().min(1),
			path_source: z.enum(["environment", "path"]),
			version: z.string().min(1).nullable(),
			installed_path: z.string().min(1).nullable()
		});
		adbDeviceObservationSchema = z.strictObject({
			serial: z.string().min(1),
			state: adbDeviceStateSchema,
			transport: z.enum([
				"usb",
				"tcp",
				"unknown"
			]),
			product: z.string().nullable(),
			model: z.string().nullable(),
			device: z.string().nullable(),
			transport_identity: adbTransportIdentitySchema,
			/**
			* Inferred device kind with its evidence basis. The serial prefix and the
			* `device:` metadata line are observations; the kind itself is derived.
			*/
			kind: z.enum([
				"emulator",
				"physical",
				"unknown"
			]),
			kind_basis: z.enum([
				"emulator_serial_prefix",
				"usb_transport",
				"none"
			])
		});
		adbDeviceListObservationSchema = z.strictObject({
			client,
			devices: z.array(adbDeviceObservationSchema),
			may_have_started_adb_server: z.boolean()
		});
		device = adbDeviceObservationSchema.omit({ transport_identity: true }).extend({
			transport_id: z.int().positive().nullable().describe("Exact numeric projection when safely representable; otherwise null. transport_id_text retains the full reported identity."),
			transport_id_text: adbTransportIdSchema.nullable().describe("Canonical positive unsigned 64-bit transport ID as decimal text; null when invalid or not reported."),
			transport_id_status: z.enum([
				"reported",
				"not_reported",
				"invalid"
			])
		});
		pulledArtifact = z.strictObject({
			device_path: z.string().min(1),
			file_name: z.string().min(1),
			local_path: z.string().min(1),
			bytes: z.int().nonnegative(),
			sha256: z.string().regex(/^[a-f0-9]{64}$/u),
			role: z.enum([
				"base",
				"split",
				"unknown"
			]),
			role_basis: z.literal("file_name")
		});
		pullFailure = z.strictObject({
			device_path: z.string().min(1).nullable(),
			stage: z.enum([
				"resolve_paths",
				"pull",
				"digest"
			]),
			message: z.string().min(1)
		});
		adbWindowFocusContextSchema = z.strictObject({
			scope: z.enum(["display", "unscoped"]),
			display_id: z.string().nullable(),
			header_line: z.string().nullable(),
			declarations: z.array(z.strictObject({
				field: z.enum(["mCurrentFocus", "mFocusedApp"]),
				value: z.string().nullable(),
				raw_line: z.string().min(1)
			}))
		});
		displayNumericReason = z.enum([
			"invalid_format",
			"unsafe_integer",
			"nonpositive"
		]);
		displayNumericIssue = z.discriminatedUnion("command", [z.strictObject({
			command: z.literal("wm size"),
			field: z.enum(["physical_size", "override_size"]),
			reason: displayNumericReason,
			raw_line: z.string().min(1)
		}), z.strictObject({
			command: z.literal("wm density"),
			field: z.enum(["physical_density", "override_density"]),
			reason: displayNumericReason,
			raw_line: z.string().min(1)
		})]);
		adbDisplayNumericIssuesSchema = z.strictObject({
			sample: z.array(displayNumericIssue),
			total: z.int().nonnegative()
		});
		adbPackageNumericIssuesSchema = z.strictObject({
			sample: z.array(z.discriminatedUnion("field", [z.strictObject({
				command: z.literal("dumpsys package"),
				field: z.literal("user_id"),
				reason: z.enum(["invalid_format", "unsafe_integer"]),
				raw_line: z.string().min(1)
			}), z.strictObject({
				command: z.literal("dumpsys package"),
				field: z.literal("version_code"),
				reason: z.literal("invalid_format"),
				raw_line: z.string().min(1)
			})])),
			total: z.int().nonnegative()
		});
		adbResultSchemas = {
			inspect_adb_client: z.strictObject({
				client,
				/**
				* `adb version` never contacts the adb server; this tool starts nothing.
				* Recorded explicitly so the session keeps the distinction observable.
				*/
				contacted_adb_server: z.literal(false)
			}),
			list_adb_devices: z.strictObject({
				client,
				devices: z.array(device),
				/**
				* Starting the local adb server is an adb client behavior on first use;
				* REA observes whichever server state the caller's environment has.
				*/
				may_have_started_adb_server: z.boolean()
			}),
			inspect_adb_device: z.strictObject({
				client,
				serial: z.string().min(1),
				properties: z.array(z.strictObject({
					name: z.string().min(1),
					value: z.string()
				})),
				property_count: z.int().nonnegative(),
				emulator_observed: z.boolean().nullable()
			}),
			list_adb_packages: z.strictObject({
				client,
				serial: z.string().min(1),
				scope: z.enum([
					"all",
					"third_party",
					"system"
				]),
				packages: z.array(z.strictObject({
					package_name: packageNameSchema,
					/** Device filesystem path; not a host-local path. */
					base_apk_device_path: z.string().min(1)
				})),
				unparsed_lines: z.array(z.string().min(1)),
				coverage: knownCoverageStatusSchema
			}),
			pull_adb_package: z.strictObject({
				client,
				serial: z.string().min(1),
				package_name: packageNameSchema,
				output_directory: z.string().min(1),
				artifacts: z.array(pulledArtifact),
				failures: z.array(pullFailure),
				coverage: knownCoverageStatusSchema
			}),
			read_adb_logcat: z.strictObject({
				client,
				serial: z.string().min(1),
				count: z.int().positive(),
				buffer: z.enum([
					"main",
					"system",
					"radio",
					"events",
					"crash"
				]),
				pid: z.int().positive().nullable(),
				lines: z.array(z.string()),
				total_bytes: z.int().nonnegative(),
				coverage: knownCoverageStatusSchema
			}),
			inspect_adb_package: z.strictObject({
				client,
				serial: z.string().min(1),
				package_name: packageNameSchema,
				version_name: z.string().nullable(),
				version_code: z.string().regex(/^-?\d+$/u).nullable().describe("Long version code exactly as dumpsys package prints it; may exceed the JSON safe-integer range"),
				first_install_time: z.string().nullable(),
				last_update_time: z.string().nullable(),
				installer_package_name: z.string().nullable(),
				user_id: z.int().nonnegative().nullable(),
				pkg_flags: z.string().nullable(),
				requested_permissions_count: z.int().nonnegative().nullable(),
				numeric_issues: adbPackageNumericIssuesSchema,
				coverage: knownCoverageStatusSchema
			}),
			pull_adb_file: z.strictObject({
				client,
				serial: z.string().min(1),
				device_path: z.string().min(1),
				local_path: z.string().min(1),
				bytes: z.int().nonnegative(),
				sha256: z.string().regex(/^[a-f0-9]{64}$/u)
			}),
			push_adb_file: z.strictObject({
				client,
				serial: z.string().min(1),
				local_path: z.string().min(1),
				device_path: z.string().min(1),
				bytes: z.int().nonnegative(),
				sha256: z.string().regex(/^[a-f0-9]{64}$/u),
				device_sha256: z.string().regex(/^[a-f0-9]{64}$/u).nullable(),
				overwritten: z.boolean(),
				device_digest_source: z.enum(["device_sha256sum", "unavailable"])
			}),
			capture_adb_screen: z.strictObject({
				client,
				serial: z.string().min(1),
				local_path: z.string().min(1),
				bytes: z.int().nonnegative(),
				sha256: z.string().regex(/^[a-f0-9]{64}$/u),
				width: z.int().positive().nullable(),
				height: z.int().positive().nullable()
			}),
			list_adb_processes: z.strictObject({
				client,
				serial: z.string().min(1),
				columns: z.string().nullable(),
				processes: z.array(z.strictObject({
					user: z.string(),
					pid: z.int().nonnegative(),
					ppid: z.int().nullable(),
					rss: z.int().nullable(),
					state: z.string().nullable(),
					name: z.string()
				})),
				unparsed_lines: z.array(z.string().min(1)),
				coverage: knownCoverageStatusSchema
			}),
			list_adb_directory: z.strictObject({
				client,
				serial: z.string().min(1),
				device_path: z.string().min(1),
				entries: z.array(z.strictObject({
					name: z.string().min(1),
					kind: z.enum([
						"directory",
						"file",
						"symlink",
						"other"
					]),
					permissions: z.string().nullable(),
					owner: z.string().nullable(),
					group: z.string().nullable(),
					bytes: z.int().nullable(),
					date: z.string().nullable(),
					link_target: z.string().nullable()
				})),
				unparsed_lines: z.array(z.string().min(1)),
				coverage: knownCoverageStatusSchema
			}),
			list_adb_features: z.strictObject({
				client,
				serial: z.string().min(1),
				features: z.array(z.strictObject({
					name: z.string().min(1),
					version: z.int().nullable()
				})),
				unparsed_lines: z.array(z.string().min(1)),
				coverage: knownCoverageStatusSchema
			}),
			list_adb_services: z.strictObject({
				client,
				serial: z.string().min(1),
				services: z.array(z.strictObject({
					name: z.string().min(1),
					interface: z.string().nullable()
				})),
				unparsed_lines: z.array(z.string().min(1)),
				coverage: knownCoverageStatusSchema
			}),
			inspect_adb_display: z.strictObject({
				client,
				serial: z.string().min(1),
				physical_size: z.strictObject({
					width: z.int().positive(),
					height: z.int().positive()
				}),
				override_size: z.strictObject({
					width: z.int().positive(),
					height: z.int().positive()
				}).nullable(),
				physical_density: z.int().positive().nullable(),
				override_density: z.int().positive().nullable(),
				numeric_issues: adbDisplayNumericIssuesSchema,
				coverage: knownCoverageStatusSchema
			}),
			inspect_adb_window: z.strictObject({
				client,
				serial: z.string().min(1),
				source_section: z.enum(["windows", "displays"]),
				focus_contexts: z.array(adbWindowFocusContextSchema),
				focus_summary: z.enum([
					"single_context",
					"ambiguous",
					"unavailable"
				]),
				focused_window: z.string().nullable(),
				focused_app: z.string().nullable(),
				observed_lines: z.array(z.string().min(1))
			}),
			read_adb_setting: z.strictObject({
				client,
				serial: z.string().min(1),
				namespace: z.enum([
					"system",
					"secure",
					"global"
				]),
				key: z.string().min(1),
				value: z.string().nullable(),
				device_reported_null: z.boolean()
			}),
			collect_adb_bugreport: z.strictObject({
				client,
				serial: z.string().min(1),
				local_path: z.string().min(1),
				bytes: z.int().nonnegative(),
				sha256: z.string().regex(/^[a-f0-9]{64}$/u),
				adb_reported_path: z.string().nullable()
			}),
			resolve_adb_packages: z.strictObject({
				client,
				serial: z.string().min(1),
				query: z.string().min(1),
				matches: z.array(z.strictObject({
					package_name: packageNameSchema,
					base_apk_device_path: z.string().min(1)
				})),
				exact_match: z.boolean(),
				unparsed_lines: z.array(z.string().min(1)),
				coverage: knownCoverageStatusSchema
			}),
			install_adb_package: z.strictObject({
				client,
				serial: z.string().min(1),
				apk_path: z.string().min(1),
				bytes: z.int().nonnegative(),
				sha256: z.string().regex(/^[a-f0-9]{64}$/u),
				replace_requested: z.boolean(),
				replaced: z.boolean().nullable()
			}),
			uninstall_adb_package: z.strictObject({
				client,
				serial: z.string().min(1),
				package_name: packageNameSchema
			}),
			start_adb_app: z.strictObject({
				client,
				serial: z.string().min(1),
				package_name: packageNameSchema,
				component: z.string().min(1),
				started_activity: z.string().nullable(),
				reported_activity: z.string().nullable().optional(),
				reported_status: z.string().nullable().optional()
			}),
			start_adb_activity: z.strictObject({
				client,
				serial: z.string().min(1),
				action: z.string().min(1),
				data_uri: z.string().nullable(),
				component: z.string().nullable(),
				extras: z.array(z.strictObject({
					key: z.string().min(1),
					type: z.enum([
						"string",
						"boolean",
						"int",
						"long",
						"float"
					]),
					value: z.string()
				})),
				started_activity: z.string().nullable(),
				reported_activity: z.string().nullable().optional(),
				reported_status: z.string().nullable().optional()
			}),
			stop_adb_app: z.strictObject({
				client,
				serial: z.string().min(1),
				package_name: packageNameSchema
			})
		};
		adbDisplayPartialObservationSchema = z.strictObject({
			provider_id: z.literal("adb"),
			operation: z.literal("inspect_adb_display"),
			reason: z.enum(["physical_size_absent", "physical_size_malformed"]),
			result: adbResultSchemas.inspect_adb_display.extend({
				physical_size: z.null(),
				coverage: z.literal("partial")
			})
		});
	})))();
}

//#endregion
//#region dist/contracts/adb/adbToolContracts.js
var ADB_TOOL_CONTRACTS;
function init_adbToolContracts() {
	return (init_adbToolContracts = __esmMin((() => {
		init_adbDeviceAnalysis();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		ADB_TOOL_CONTRACTS = [
			{
				name: "inspect_adb_client",
				cli: true,
				...toolContractMetadata("inspect_adb_client", toolEffects({
					mutatesSession: true,
					launchesProcess: true
				})),
				description: "Inspect the caller-selected adb client: resolved binary, version, and install path. Never contacts devices and never starts the adb server. REA never installs platform tools; select a binary with REA_ADB_PATH (absolute) or adb on PATH.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.inspect_adb_client,
				outputSchema: evidenceResultOf(adbResultSchemas.inspect_adb_client),
				examples: [{
					title: "Check the adb client",
					input: {}
				}]
			},
			{
				name: "list_adb_devices",
				cli: true,
				...toolContractMetadata("list_adb_devices", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "List attached devices exactly as `adb devices -l` reports them: serial, state, transport, model metadata, and an inferred emulator/physical kind with its evidence basis. Emulators and USB or network devices appear alike; REA neither starts nor manages them. transport_id_text preserves exact full-range transport identity; transport_id is its safe numeric projection or null. May start the local adb server on first use.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.list_adb_devices,
				outputSchema: evidenceResultOf(adbResultSchemas.list_adb_devices),
				examples: [{
					title: "List attached devices",
					input: {}
				}]
			},
			{
				name: "inspect_adb_device",
				cli: true,
				...toolContractMetadata("inspect_adb_device", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "Inspect one device's build identity through a fixed `getprop` whitelist: Android and SDK versions, security patch, fingerprint, product identity, CPU ABIs, and debuggable flag, plus the observed emulator indicator ro.kernel.qemu. Present properties retain empty values; omitted keys were not reported. Read-only with respect to the device.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.inspect_adb_device,
				outputSchema: evidenceResultOf(adbResultSchemas.inspect_adb_device),
				examples: [{
					title: "Inspect one device",
					input: { serial: "emulator-5554" }
				}]
			},
			{
				name: "list_adb_packages",
				cli: true,
				...toolContractMetadata("list_adb_packages", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "List installed packages on one device with each base APK's device path, optionally scoped to third-party or system packages. Paths are device filesystem paths, not host-local. Read-only.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.list_adb_packages,
				outputSchema: evidenceResultOf(adbResultSchemas.list_adb_packages),
				examples: [{
					title: "List third-party packages",
					input: {
						serial: "emulator-5554",
						scope: "third_party"
					}
				}]
			},
			{
				name: "pull_adb_package",
				cli: true,
				...toolContractMetadata("pull_adb_package", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					writesFilesystem: true,
					accessesNetwork: true,
					idempotent: false
				})),
				description: "Pull one installed package's complete APK set (base plus every split, as `pm path` reports) from the device into a caller-selected output directory, creating a package-named subdirectory that must not already exist. Every pulled file is digested with SHA-256; partial pulls keep successful artifacts and per-file failure reasons. The device keeps the originals.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.pull_adb_package,
				outputSchema: evidenceResultOf(adbResultSchemas.pull_adb_package),
				examples: [{
					title: "Pull a package APK set",
					input: {
						serial: "emulator-5554",
						package: "com.example.app",
						output_directory: "/tmp/rea-pulls"
					}
				}]
			},
			{
				name: "read_adb_logcat",
				cli: true,
				...toolContractMetadata("read_adb_logcat", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "Read a bounded dump of the device log (`logcat -d -t`) for one buffer, optionally restricted to a process id. No streaming, no clearing; the newest lines are kept when the count cap trims. Read-only.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.read_adb_logcat,
				outputSchema: evidenceResultOf(adbResultSchemas.read_adb_logcat),
				examples: [{
					title: "Read the last 200 main-buffer lines",
					input: {
						serial: "emulator-5554",
						count: 200,
						buffer: "main"
					}
				}]
			},
			{
				name: "inspect_adb_package",
				cli: true,
				...toolContractMetadata("inspect_adb_package", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "Inspect installed-package versions, install times, installer, user id, flags, and requested-permission count through read-only `dumpsys package`. Malformed numeric declarations are retained in bounded numeric_issues and make coverage partial; version_code stays exact text. Unknown sections are not inferred.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.inspect_adb_package,
				outputSchema: evidenceResultOf(adbResultSchemas.inspect_adb_package),
				examples: [{
					title: "Inspect an installed package",
					input: {
						serial: "emulator-5554",
						package: "com.example.app"
					}
				}]
			},
			{
				name: "pull_adb_file",
				cli: true,
				...toolContractMetadata("pull_adb_file", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					writesFilesystem: true,
					accessesNetwork: true,
					idempotent: false
				})),
				description: "Pull one absolute device path (a database, shared-preferences XML, or any readable file) into a caller-selected output directory, digesting it with SHA-256. The local copy must not already exist. Read-only with respect to the device.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.pull_adb_file,
				outputSchema: evidenceResultOf(adbResultSchemas.pull_adb_file),
				examples: [{
					title: "Pull an app database",
					input: {
						serial: "emulator-5554",
						device_path: "/data/data/com.example.app/databases/app.db",
						output_directory: "/tmp/rea-pulls"
					}
				}]
			},
			{
				name: "push_adb_file",
				cli: true,
				...toolContractMetadata("push_adb_file", toolEffects({
					mutatesTarget: true,
					mutatesSession: true,
					launchesProcess: true,
					writesFilesystem: true,
					accessesNetwork: true,
					mutatesDevice: true,
					idempotent: false
				})),
				description: "Push one local file to an absolute device path. If the destination is an existing directory, adb places the file inside it under the local basename and the result reports that file path. A device-mutating tool: checks for an existing destination file before transfer and refuses it unless overwrite is explicitly requested; this check is not atomic and another process can create the path before adb writes. The private staged copy remains non-writable and preserves source executable bits. When the device provides sha256sum, the transfer is verified by comparing it with the local digest.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.push_adb_file,
				outputSchema: evidenceResultOf(adbResultSchemas.push_adb_file),
				examples: [{
					title: "Push a script to tmp",
					input: {
						serial: "emulator-5554",
						local_path: "/tmp/frida-server",
						device_path: "/data/local/tmp/frida-server"
					}
				}]
			},
			{
				name: "capture_adb_screen",
				cli: true,
				...toolContractMetadata("capture_adb_screen", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					writesFilesystem: true,
					accessesNetwork: true,
					idempotent: false
				})),
				description: "Capture one frame of the device screen as a PNG (`screencap -p` through exec-out, no device-side file) into a caller-selected output directory, digesting it and reporting its dimensions. No recording or interaction.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.capture_adb_screen,
				outputSchema: evidenceResultOf(adbResultSchemas.capture_adb_screen),
				examples: [{
					title: "Capture the current screen",
					input: {
						serial: "emulator-5554",
						output_directory: "/tmp/rea-captures"
					}
				}]
			},
			{
				name: "list_adb_processes",
				cli: true,
				...toolContractMetadata("list_adb_processes", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "List running processes exactly as `ps -A` reports them: user, pid, ppid, rss, state, and name. Useful for pairing with instrumentation lanes. Read-only.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.list_adb_processes,
				outputSchema: evidenceResultOf(adbResultSchemas.list_adb_processes),
				examples: [{
					title: "List processes",
					input: { serial: "emulator-5554" }
				}]
			},
			{
				name: "list_adb_directory",
				cli: true,
				...toolContractMetadata("list_adb_directory", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "List the immediate children of one absolute device directory, including hidden entries: names, kinds, permissions, owner, group, sizes, dates, and symlink targets. Names and targets preserve embedded newlines. Recognizes the standard errors for absent paths and denied reads. Read-only.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.list_adb_directory,
				outputSchema: evidenceResultOf(adbResultSchemas.list_adb_directory),
				examples: [{
					title: "List an app's data directory",
					input: {
						serial: "emulator-5554",
						device_path: "/data/data/com.example.app"
					}
				}]
			},
			{
				name: "list_adb_features",
				cli: true,
				...toolContractMetadata("list_adb_features", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "List the device's declared hardware and software features (`pm list features`) for device fingerprinting. Read-only.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.list_adb_features,
				outputSchema: evidenceResultOf(adbResultSchemas.list_adb_features),
				examples: [{
					title: "List features",
					input: { serial: "emulator-5554" }
				}]
			},
			{
				name: "list_adb_services",
				cli: true,
				...toolContractMetadata("list_adb_services", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "List the device's binder services with their interfaces (`service list`). Read-only.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.list_adb_services,
				outputSchema: evidenceResultOf(adbResultSchemas.list_adb_services),
				examples: [{
					title: "List services",
					input: { serial: "emulator-5554" }
				}]
			},
			{
				name: "inspect_adb_display",
				cli: true,
				...toolContractMetadata("inspect_adb_display", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "Read physical and override size/density from `wm size` and `wm density`. Malformed numeric declarations are retained in numeric_issues with partial coverage; optional values remain null. Required physical-size failures retain partial display facts. Read-only.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.inspect_adb_display,
				outputSchema: evidenceResultOf(adbResultSchemas.inspect_adb_display),
				examples: [{
					title: "Inspect the display",
					input: { serial: "emulator-5554" }
				}]
			},
			{
				name: "inspect_adb_window",
				cli: true,
				...toolContractMetadata("inspect_adb_window", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "Report the window manager's focus declarations with display context, original lines and explicit summary status. Reads `dumpsys window windows`, falling back to `displays` only when no focus field is declared. Singular fields are unknown for multiple contexts or repeated declarations; inspect focus_contexts for every observation. Read-only; no interaction occurs.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.inspect_adb_window,
				outputSchema: evidenceResultOf(adbResultSchemas.inspect_adb_window),
				examples: [{
					title: "Inspect window focus",
					input: { serial: "emulator-5554" }
				}]
			},
			{
				name: "read_adb_setting",
				cli: true,
				...toolContractMetadata("read_adb_setting", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "Read one settings value (`settings get`) from the system, secure, or global namespace. Absent keys report the device's own null observation. Read-only; writing settings is not exposed.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.read_adb_setting,
				outputSchema: evidenceResultOf(adbResultSchemas.read_adb_setting),
				examples: [{
					title: "Read the ADB-enabled setting",
					input: {
						serial: "emulator-5554",
						namespace: "secure",
						key: "adb_enabled"
					}
				}]
			},
			{
				name: "collect_adb_bugreport",
				cli: true,
				...toolContractMetadata("collect_adb_bugreport", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					writesFilesystem: true,
					accessesNetwork: true,
					idempotent: false
				})),
				description: "Collect one device-generated bugreport archive (`adb bugreport`) into a caller-selected output directory, digesting the zip. The archive contains the device's own dumpstate, dumpsys, and logcat report; collection can take minutes. Read-only with respect to configuration.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.collect_adb_bugreport,
				outputSchema: evidenceResultOf(adbResultSchemas.collect_adb_bugreport),
				examples: [{
					title: "Collect a bugreport",
					input: {
						serial: "emulator-5554",
						output_directory: "/tmp/rea-bugreports"
					}
				}]
			},
			{
				name: "resolve_adb_packages",
				cli: true,
				...toolContractMetadata("resolve_adb_packages", toolEffects({
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true
				})),
				description: "Find installed packages by case-insensitive package-name substring and return each base APK device path. Pass an exact returned name to pull_adb_package to retrieve its base and split APKs. Read-only.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.resolve_adb_packages,
				outputSchema: evidenceResultOf(adbResultSchemas.resolve_adb_packages),
				examples: [{
					title: "Find a package by partial name",
					input: {
						serial: "emulator-5554",
						query: "whatsapp"
					}
				}]
			},
			{
				name: "install_adb_package",
				cli: true,
				...toolContractMetadata("install_adb_package", toolEffects({
					mutatesTarget: true,
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true,
					mutatesDevice: true,
					idempotent: false
				})),
				description: "Install one local APK on the device (`adb install [-r]`), recording the APK's host digest and byte size. A device-mutating tool: `replace_requested` records whether `-r` was selected; `replaced` is null because install success does not establish prior package state. The device's own Success/Failure verdict is preserved with its reason.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.install_adb_package,
				outputSchema: evidenceResultOf(adbResultSchemas.install_adb_package),
				examples: [{
					title: "Install an APK",
					input: {
						serial: "emulator-5554",
						apk_path: "/tmp/app.apk"
					}
				}, {
					title: "Request reinstall mode to keep existing app data",
					input: {
						serial: "emulator-5554",
						apk_path: "/tmp/app.apk",
						replace: true
					}
				}]
			},
			{
				name: "uninstall_adb_package",
				cli: true,
				...toolContractMetadata("uninstall_adb_package", toolEffects({
					mutatesTarget: true,
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true,
					mutatesDevice: true,
					idempotent: false
				})),
				description: "Request package removal for user 0 (`adb shell pm uninstall --user 0`) without data retention. A device-mutating tool; absent packages report the device's own refusal reason.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.uninstall_adb_package,
				outputSchema: evidenceResultOf(adbResultSchemas.uninstall_adb_package),
				examples: [{
					title: "Uninstall a package",
					input: {
						serial: "emulator-5554",
						package: "com.example.app"
					}
				}]
			},
			{
				name: "start_adb_app",
				cli: true,
				...toolContractMetadata("start_adb_app", toolEffects({
					mutatesTarget: true,
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true,
					mutatesDevice: true,
					idempotent: false
				})),
				description: "Start one installed app's resolved launcher activity with `am start -W -n`. A device-mutating tool for dynamic analysis. The full wait report determines success; failures retain launch-attempt facts and raw output. Pair with `read_adb_logcat` (pid filter) and `list_adb_processes` to observe the app, and `stop_adb_app` to end the run.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.start_adb_app,
				outputSchema: evidenceResultOf(adbResultSchemas.start_adb_app),
				examples: [{
					title: "Start an app",
					input: {
						serial: "emulator-5554",
						package: "com.example.app"
					}
				}]
			},
			{
				name: "start_adb_activity",
				cli: true,
				...toolContractMetadata("start_adb_activity", toolEffects({
					mutatesTarget: true,
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true,
					mutatesDevice: true,
					idempotent: false
				})),
				description: "Start an intent with `am start -W`: one action, optional data URI, optional explicit component, and up to 16 typed extras (string, boolean, int, long, float). A device-mutating tool; the full wait report determines success, with failed-attempt facts and raw output retained.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.start_adb_activity,
				outputSchema: evidenceResultOf(adbResultSchemas.start_adb_activity),
				examples: [{
					title: "Open a deep link",
					input: {
						serial: "emulator-5554",
						action: "android.intent.action.VIEW",
						data_uri: "https://example.com/path"
					}
				}, {
					title: "Start with typed extras",
					input: {
						serial: "emulator-5554",
						action: "com.example.APP_ACTION",
						extras: [{
							key: "level",
							type: "int",
							value: "3"
						}]
					}
				}]
			},
			{
				name: "stop_adb_app",
				cli: true,
				...toolContractMetadata("stop_adb_app", toolEffects({
					mutatesTarget: true,
					mutatesSession: true,
					launchesProcess: true,
					accessesNetwork: true,
					mutatesDevice: true,
					idempotent: false
				})),
				description: "Force-stop every process of one package (`am force-stop`), ending a dynamic-analysis run. A device-mutating tool; it succeeds whether or not the package had running processes.",
				kind: "adb-provider",
				inputSchema: adbInputSchemas.stop_adb_app,
				outputSchema: evidenceResultOf(adbResultSchemas.stop_adb_app),
				examples: [{
					title: "Stop an app",
					input: {
						serial: "emulator-5554",
						package: "com.example.app"
					}
				}]
			}
		];
	})))();
}

//#endregion
export { ADB_DEVICE_OBSERVATION_AUTHORITY, ADB_DEVICE_STATES, ADB_TOOL_CONTRACTS, activityExtraCliEntrySchema, adbDeviceListObservationSchema, adbDisplayPartialObservationSchema, adbRequestSchema, adbResultSchemas, init_adbDeviceAnalysis, init_adbToolContracts, init_adbTransportIdentity, parseAdbTransportIdentity };