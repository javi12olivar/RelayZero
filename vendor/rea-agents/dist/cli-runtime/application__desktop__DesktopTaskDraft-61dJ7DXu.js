import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisInputError, cancelledBy, init_analysisErrorBase, init_analysisErrorCore } from "./jsonSerialization-DAF9DVXC.js";
import { createEvidence, init_evidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { DESKTOP_PROVIDER, desktopOperationFailure, init_DesktopCaptureRefusals } from "./desktopCaptureCommands-MBIrn49f.js";
import { desktopApplicationStateSchema, init_desktopState, init_desktopStateDiff, isWithinAny } from "./x11Windows-Cx5-JOUb.js";
import { DRAFT_PROMPT, init_appTask } from "./stateChanges-DKaIbxqq.js";
import { exportedStateFiles, init_appExport } from "./appExport-CjCA74-5.js";
import { draftNotes, draftTaskFiles, init_appTaskDraft, init_appTaskDraftNotes } from "./appTaskDraftNotes-B1V58heG.js";
import { init_appWithheld, withheldFiles } from "./appWithheld-WlVw2GpU.js";
import { init_DesktopApplicationState, init_DesktopStateVersions, inspectDesktopApplicationState, readDesktopCapture, selectStateEnds } from "./DesktopApplicationState-DwjkVBfu.js";
import { exportEnvironmentName, init_DesktopExportInstall } from "./DesktopExportInstall-De4IEm0V.js";

//#region dist/application/desktop/DesktopTaskDraft.js
var OPERATION, DRAFT_LIMITATIONS, numbered, draft, draftDesktopApplicationTask;
function init_DesktopTaskDraft() {
	return (init_DesktopTaskDraft = __esmMin((() => {
		init_targetIdentity();
		init_analysisErrorBase();
		init_appExport();
		init_appTask();
		init_appWithheld();
		init_analysisErrorCore();
		init_appTaskDraft();
		init_appTaskDraftNotes();
		init_desktopState();
		init_desktopStateDiff();
		init_evidence();
		init_DesktopApplicationState();
		init_DesktopCaptureRefusals();
		init_DesktopExportInstall();
		init_DesktopStateVersions();
		OPERATION = "describe_desktop_application_task";
		DRAFT_LIMITATIONS = [
			"Files are those under the paths the export owns, whose state differs between the seed and end checkpoints, by default the capture's first and last; data/get serves nothing else.",
			"Suggested checks, values, guards and views cover documents, or the app's own state when no document changed; each check is derived from the net change and is a starting point, not a task.",
			"Values cover XML, archives, JSON and key files: at most 20 entries and 8 KB a file and 24 KB a draft, each value cut at 600 characters (values_cut says when any is left out).",
			"Views longer than 200 items or strings longer than 2,000 characters are cut here (view_cut); inspect-desktop-application-state shows every view whole."
		];
		numbered = (prefix, checks) => checks.map((check, index) => ({
			id: `${prefix}-${String(index + 1)}`,
			...check
		}));
		draft = async (folder, readers, signal, selection, viewPolicy) => {
			const { evidence, capture } = await readDesktopCapture(folder, signal);
			const stateEvidence = await inspectDesktopApplicationState(folder, readers, signal, { viewPolicy });
			if (stateEvidence instanceof AnalysisError) throw stateEvidence;
			const state = desktopApplicationStateSchema.parse(stateEvidence.normalized_result);
			const { checkpoints } = state.capture;
			const ends = selectStateEnds(checkpoints, selection, OPERATION);
			const { files, dconf, paths, homePath, isLeftOut } = exportedStateFiles(capture, state);
			const withheld = withheldFiles(capture.state.checkpoints, homePath, paths, selection.withhold ?? {});
			if (!withheld.ok) throw new AnalysisInputError(OPERATION, {
				userMessage: `REA cannot withhold the sign-in state: ${withheld.error}.`,
				conformsToInputContract: true
			});
			const held = (home) => isWithinAny(home, withheld.value);
			const drafted = draftTaskFiles(files, (home) => isWithinAny(home, paths) && !held(home), ends, isLeftOut);
			const covered = (index) => {
				const point = capture.state.checkpoints[index];
				return point !== undefined && !point.truncated && point.unreadable_directories === 0 && point.unchecked_paths === 0 && point.unconfirmed_changes === 0;
			};
			const notes = draftNotes(files, {
				drafted,
				owned: paths,
				dconf,
				ends,
				checkpoints,
				observed: Array.from({ length: ends.end - ends.seed + 1 }, (_, offset) => ends.seed + offset).every(covered)
			});
			const environment = exportEnvironmentName(capture, undefined);
			const result = {
				effective_view_policy: state.effective_view_policy,
				application: {
					environment,
					title: capture.application.desktop_entry?.name ?? environment,
					window_class: capture.session.window_match?.class ?? null
				},
				owned_paths: [...paths],
				checkpoints: {
					baseline: checkpoints[ends.seed],
					final: checkpoints[ends.end]
				},
				files: drafted.map(({ file, role, baseline, final, change, values, values_cut }) => ({
					file,
					role,
					baseline,
					final,
					change,
					values,
					values_cut
				})),
				task: {
					name: "change",
					prompt: DRAFT_PROMPT,
					checks: numbered("check", drafted.flatMap((file) => file.suggested))
				},
				guards: numbered("guard", drafted.flatMap((file) => file.guards)),
				notes,
				withheld_files: [...files.keys()].filter((home) => isWithinAny(home, paths) && held(home)).sort()
			};
			if (signal?.aborted === true) throw cancelledBy(OPERATION, signal);
			return createEvidence(unknownTarget("not-observed"), DESKTOP_PROVIDER, {
				predicateType: "rea.desktop-application-task-draft",
				operation: OPERATION,
				parameters: {
					capture_evidence_id: evidence.evidence_id,
					seed_checkpoint: selection.seed ?? null,
					end_checkpoint: selection.end ?? null,
					...stateEvidence.parameters.view_policy === undefined ? {} : { view_policy: stateEvidence.parameters.view_policy }
				},
				result,
				confidence: "inferred",
				authority: "analyst-inference",
				limitations: [...DRAFT_LIMITATIONS, ...capture.limitations]
			});
		};
		draftDesktopApplicationTask = async (folder, readers, signal, selection = {}, viewPolicy) => {
			try {
				return await draft(folder, readers, signal, selection, viewPolicy);
			} catch (cause) {
				return desktopOperationFailure(cause, signal, OPERATION, "Desktop task draft");
			}
		};
	})))();
}

//#endregion
init_DesktopTaskDraft();
export { draftDesktopApplicationTask };