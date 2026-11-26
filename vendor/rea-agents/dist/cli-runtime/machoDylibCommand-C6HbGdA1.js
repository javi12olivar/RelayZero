import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { BinaryReader, init_binaryContainer } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { LC, init_machoLoadCommandCodes, init_machoLoadCommands, readMachoCommandStringBytes } from "./machoLoadCommands-DCQgk7s-.js";

//#region dist/domain/apple/machoDylibCommand.js
var DEPENDENCY_COMMANDS, machoDependencyCommand, MACHO_DYLIB_FIELDS_OFFSET, MACHO_DYLIB_NAME_MIN, MACHO_DYLIB_USE_NAME_OFFSET, DYLIB_USE_MARKER, canUseDylibFlags, machoDylibFieldsSize, readMachoDylibFields, readMachoDylibCommandFacts;
function init_machoDylibCommand() {
	return (init_machoDylibCommand = __esmMin((() => {
		init_binaryContainer();
		init_machoLoadCommandCodes();
		init_result();
		init_machoLoadCommands();
		DEPENDENCY_COMMANDS = new Map([
			[LC.LOAD_DYLIB, "LC_LOAD_DYLIB"],
			[LC.LOAD_WEAK_DYLIB, "LC_LOAD_WEAK_DYLIB"],
			[LC.REEXPORT_DYLIB, "LC_REEXPORT_DYLIB"],
			[LC.LAZY_LOAD_DYLIB, "LC_LAZY_LOAD_DYLIB"],
			[LC.LOAD_UPWARD_DYLIB, "LC_LOAD_UPWARD_DYLIB"]
		]);
		machoDependencyCommand = (code) => DEPENDENCY_COMMANDS.get(code) ?? null;
		MACHO_DYLIB_FIELDS_OFFSET = 12;
		MACHO_DYLIB_NAME_MIN = 24;
		MACHO_DYLIB_USE_NAME_OFFSET = 28;
		DYLIB_USE_MARKER = 443815936;
		canUseDylibFlags = (command, nameOffset) => nameOffset === MACHO_DYLIB_USE_NAME_OFFSET && (command === LC.LOAD_DYLIB || command === LC.LOAD_WEAK_DYLIB || command === LC.REEXPORT_DYLIB || command === LC.LOAD_UPWARD_DYLIB);
		machoDylibFieldsSize = (command, nameOffset) => (canUseDylibFlags(command, nameOffset) ? MACHO_DYLIB_USE_NAME_OFFSET : 24) - 12;
		readMachoDylibFields = (bytes, command, nameOffset, littleEndian) => {
			const reader = new BinaryReader(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength), littleEndian, "macho");
			const timestamp = reader.u32(0);
			return {
				nameOffset,
				currentVersion: reader.u32(4),
				compatibilityVersion: reader.u32(8),
				encoding: canUseDylibFlags(command, nameOffset) && timestamp === DYLIB_USE_MARKER ? {
					kind: "use",
					flags: reader.u32(12)
				} : {
					kind: "timestamp",
					timestamp
				}
			};
		};
		readMachoDylibCommandFacts = (body, command, littleEndian) => {
			if (body.byteLength < 24) return err({
				_tag: "InvalidMachoDylibCommand",
				reason: "truncated-header"
			});
			const name = readMachoCommandStringBytes(body, 24, littleEndian);
			if (!name.ok) return name;
			const offset = name.value.offset;
			const { encoding, currentVersion, compatibilityVersion } = readMachoDylibFields(body.subarray(12, 12 + machoDylibFieldsSize(command, offset)), command, offset, littleEndian);
			return ok({
				encoding: encoding.kind === "use" ? "dylib_use_command" : "dylib_command",
				flags: encoding.kind === "use" ? encoding.flags : null,
				currentVersion,
				compatibilityVersion,
				nameOffset: offset,
				nameBytes: name.value.bytes
			});
		};
	})))();
}

//#endregion
export { init_machoDylibCommand, machoDependencyCommand, machoDylibFieldsSize, readMachoDylibCommandFacts, readMachoDylibFields };