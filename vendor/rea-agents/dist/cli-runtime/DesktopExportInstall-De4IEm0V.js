import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisInputError, cancelledBy, carriedReason, init_analysisErrorBase, init_analysisErrorCore } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { RegularFileCleanupFailure, init_OwnedRegularFile } from "./resources-B3P64jvH.js";
import { RegularFileReadFailure, init_RegularFileRead, readRegularFileText } from "./RegularFileRead-CRu2Ia6l.js";
import { INSTALL_SCRIPT, computerArchitecture, exportInstall, init_appExportInstall, withExtraPackages } from "./x11Windows-Cx5-JOUb.js";
import { downloadInstallFiles, downloadInstallSchema, downloadPrefix, environmentName, init_appDownloadInstall, init_appExport, renderInstallScript } from "./appExport-CjCA74-5.js";
import { init_portableBundleName, isPortableBundleName } from "./portableBundleName-DrrdjNIx.js";

//#region dist/domain/desktop/appExportDownload.js
var refusal, downloadExportInstall;
function init_appExportDownload() {
	return (init_appExportDownload = __esmMin((() => {
		init_result();
		init_appDownloadInstall();
		init_appExportInstall();
		refusal = (reason, field, remediation) => ({
			field,
			reason,
			remediation
		});
		downloadExportInstall = (application, hostArchitecture, download, packageUrl) => {
			const remediation = "Capture the app the build computer installed from this download, launched from its desktop entry, and export it with the same --download-install.";
			if (packageUrl !== undefined) return err(refusal("--package-url and --download-install each name how the computer installs the app; an app comes from one of them.", "package_url", "Pass --download-install for an app a build computer unpacked from an AppImage or tarball, or --package-url for one installed from a .deb file."));
			const entry = application.desktop_entry?.id ?? null;
			if (entry !== download.desktop_entry) return err(refusal(`--download-install installs the desktop entry ${download.desktop_entry}, but the capture launched ${entry === null ? "no desktop entry" : entry}.`, "download_install", remediation));
			const prefix = downloadPrefix(download);
			const program = application.executable.resolved_path ?? application.executable.path;
			if (!program.startsWith(`${prefix}/`)) return err(refusal(`The captured program ${program} is not under ${prefix}, where the download is unpacked, so the capture is not of the app it installs.`, "download_install", remediation));
			if (computerArchitecture(hostArchitecture) !== download.architecture) return err(refusal(`The download is built for ${download.architecture}, but the capture ran on ${hostArchitecture}.`, "download_install", "Export with the download the capture host's build computer installed."));
			return ok({
				aptPackage: download.desktop_entry,
				release: null,
				libraryPackages: [],
				sources: [],
				skipped: [],
				architectures: [download.architecture],
				packageFile: null,
				download
			});
		};
	})))();
}

//#endregion
//#region dist/application/desktop/DesktopExportInstall.js
var OPERATION, MAX_DOWNLOAD_INSTALL_BYTES, refuse, exportEnvironmentName, readDownloadInstall, admitApplication, installFiles;
function init_DesktopExportInstall() {
	return (init_DesktopExportInstall = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_OwnedRegularFile();
		init_RegularFileRead();
		init_appDownloadInstall();
		init_appExport();
		init_appExportDownload();
		init_appExportInstall();
		init_portableBundleName();
		OPERATION = "export_desktop_application";
		MAX_DOWNLOAD_INSTALL_BYTES = 64 * 1024;
		refuse = (userMessage, field, remediationAction) => new AnalysisInputError(OPERATION, {
			userMessage,
			remediationAction,
			conformsToInputContract: true
		}, [{
			path: [field],
			reason: "invalid_value",
			message: userMessage
		}]);
		exportEnvironmentName = (capture, name) => {
			const { application } = capture;
			const source = name ?? environmentName(application.desktop_entry?.id ?? application.executable.path.split("/").at(-1) ?? "app", isPortableBundleName);
			if (!isPortableBundleName(source)) throw refuse(`${source} is not a portable environment name.`, "name", "Pass --name with lowercase letters, digits and hyphens.");
			return source;
		};
		readDownloadInstall = async (path, signal) => {
			if (path === undefined) return undefined;
			const field = "download_install";
			const remediation = "Pass --download-install with a JSON file naming kind (appimage or tarball), desktop_entry, url, sha256 and architecture, and a tarball's program, as the build request named them.";
			const unreadable = () => refuse(`--download-install ${path} is not a readable file of at most ${String(MAX_DOWNLOAD_INSTALL_BYTES)} bytes.`, field, remediation);
			let text;
			try {
				text = await readRegularFileText(path, {
					signal,
					cancellationFailure: (reason) => cancelledBy(OPERATION, carriedReason(reason)),
					admit: (state) => {
						if (state.size > MAX_DOWNLOAD_INSTALL_BYTES) throw unreadable();
					}
				});
			} catch (cause) {
				const failure = cause instanceof RegularFileReadFailure ? cause.operationCause : cause;
				if (failure instanceof AnalysisError || failure instanceof RegularFileCleanupFailure) throw failure;
				throw unreadable();
			}
			let value;
			try {
				value = JSON.parse(text);
			} catch {
				throw refuse(`--download-install ${path} does not hold JSON.`, field, remediation);
			}
			const parsed = downloadInstallSchema.safeParse(value);
			if (!parsed.success) throw refuse(`--download-install ${path} names no AppImage or tarball install: ${parsed.error.issues.map((issue) => `${issue.path.join(".") || "file"}: ${issue.message}`).join("; ")}.`, field, remediation);
			return parsed.data;
		};
		admitApplication = (capture, environment, { packageUrl, extraPackages = [], download }) => {
			const packaged = download === undefined ? exportInstall(capture.application.package, environment, capture.host.architecture, packageUrl) : downloadExportInstall(capture.application, capture.host.architecture, download, packageUrl);
			const install = packaged.ok ? withExtraPackages(packaged.value, extraPackages) : packaged;
			if (!install.ok) throw refuse(install.error.reason, install.error.field, install.error.remediation);
			const window = capture.session.window_match;
			if (window === null) throw refuse("The capture saw no application window, so the export cannot match the app's window to tell when it is ready.", "capture", "Capture again and wait for the application window to open.");
			return {
				install: install.value,
				windowClass: window.class
			};
		};
		installFiles = (plan) => [...plan.packageFile === null ? [] : [{
			path: INSTALL_SCRIPT,
			content: renderInstallScript(plan.packageFile)
		}], ...plan.download === undefined ? [] : downloadInstallFiles(plan.download)];
	})))();
}

//#endregion
export { admitApplication, exportEnvironmentName, init_DesktopExportInstall, installFiles, readDownloadInstall, refuse };