import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/nativeConvention.js
var foldSegment, REACT_NATIVE_SEGMENTS, FLUTTER_SEGMENTS, UNITY_SEGMENTS, DESKTOP_IL2CPP_LIBRARIES, UNITY_PREDEFINED_ASSEMBLIES, nativeRuntimeConvention, isSwiftRuntimeLibrary, UNITY_IL2CPP_BACKUP_SUFFIX, desktopPathConventions;
function init_nativeConvention() {
	return (init_nativeConvention = __esmMin((() => {
		foldSegment = (segment) => segment.toLocaleLowerCase("en-US");
		REACT_NATIVE_SEGMENTS = new Set([
			"react.framework",
			"reactnative.framework",
			"libreactnative.so",
			"libreactnativejni.so",
			"libhermes_executor.so",
			"libhermes.so",
			"hermes.framework"
		]);
		FLUTTER_SEGMENTS = new Set(["libflutter.so", "flutter.framework"]);
		UNITY_SEGMENTS = new Set(["libunity.so", "unityframework.framework"]);
		DESKTOP_IL2CPP_LIBRARIES = new Set([
			"gameassembly.dll",
			"gameassembly.so",
			"gameassembly.dylib",
			"libil2cpp.so"
		]);
		UNITY_PREDEFINED_ASSEMBLIES = new Set(["assembly-csharp.dll", "assembly-csharp-firstpass.dll"]);
		nativeRuntimeConvention = (path) => {
			const segments = path.split("/");
			for (const [index, segment] of segments.entries()) {
				const folded = foldSegment(segment);
				if (index !== segments.length - 1 && !folded.endsWith(".framework")) continue;
				if (REACT_NATIVE_SEGMENTS.has(folded)) return "react-native";
				if (FLUTTER_SEGMENTS.has(folded)) return "flutter";
				if (UNITY_SEGMENTS.has(folded)) return "unity";
			}
			return null;
		};
		isSwiftRuntimeLibrary = (path) => path.split("/").some((segment) => /^libswift.+\.dylib$/u.test(foldSegment(segment)));
		UNITY_IL2CPP_BACKUP_SUFFIX = "_backupthisfolder_butdontshipitwithyourgame";
		desktopPathConventions = (path, rootName) => {
			const segments = path.split("/");
			const folded = segments.map(foldSegment);
			let unityManagedDirectory = null;
			let unityManagedIndex = -1;
			for (let index = 0; index + 2 < folded.length; index++) {
				const segment = folded[index];
				const namedDataDirectory = segment !== undefined && segment.length > 5 && segment.endsWith("_data");
				const bundleDataDirectory = segment === "data" && folded[index - 1] === "resources" && folded[index - 2] === "contents";
				if ((namedDataDirectory || bundleDataDirectory) && folded[index + 1] === "managed") {
					unityManagedDirectory = segments.slice(0, index + 2).join("/");
					unityManagedIndex = index + 1;
				}
			}
			const rooted = rootName === undefined ? folded : [foldSegment(rootName), ...folded];
			const shift = rooted.length - folded.length;
			let unityIl2cppBackupDirectory = null;
			let unityIl2cppBackupIndex = -1;
			for (let index = 0; index + 1 < rooted.length; index++) {
				const segment = rooted[index] ?? "";
				if (segment.length > UNITY_IL2CPP_BACKUP_SUFFIX.length && segment.endsWith(UNITY_IL2CPP_BACKUP_SUFFIX)) {
					unityIl2cppBackupDirectory = index < shift ? "." : segments.slice(0, index - shift + 1).join("/");
					unityIl2cppBackupIndex = index - shift;
				}
			}
			const name = folded.at(-1) ?? "";
			return {
				unityIl2cppBackupDirectory,
				unityIl2cppBackupAssembly: unityIl2cppBackupIndex === segments.length - 3 && folded[unityIl2cppBackupIndex + 1] === "managed" && UNITY_PREDEFINED_ASSEMBLIES.has(name),
				unityManagedDirectory,
				unityPredefinedAssembly: unityManagedIndex === segments.length - 2 && UNITY_PREDEFINED_ASSEMBLIES.has(name),
				il2cppLibrary: DESKTOP_IL2CPP_LIBRARIES.has(name),
				electronArchive: folded.at(-2) === "resources" && (name === "app.asar" || name === "default_app.asar"),
				electronFramework: folded.includes("electron framework.framework"),
				unrealContainer: (name.endsWith(".pak") || name.endsWith(".utoc")) && folded.some((segment, index) => segment === "content" && folded[index + 1] === "paks" && index + 2 < folded.length)
			};
		};
	})))();
}

//#endregion
export { desktopPathConventions, init_nativeConvention, isSwiftRuntimeLibrary, nativeRuntimeConvention };