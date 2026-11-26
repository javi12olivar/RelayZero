import { AnalysisInputError, cancelledBy, } from "../../domain/analysisErrorCore.js";
import { err, ok } from "../../domain/result.js";
const unknownComputer = (operation) => new AnalysisInputError(operation, {
    userMessage: "No build computer has this id in this REA server; start one with start_build_computer.",
    remediationAction: "Start one with start_build_computer.",
    conformsToInputContract: true,
});
/**
 * The build steps on a held computer: REA's capture of its app, the draft,
 * the export and the task's witness, each named by the computer's id.
 */
export class DesktopBuildSteps {
    computers;
    constructor(computers) {
        this.computers = computers;
    }
    /** Start REA's capture of the computer's app, inside the computer, and show the opened app. */
    async startCapture(input, signal) {
        const steps = this.computers.steps(input.computer_id);
        if (steps === undefined)
            return err(unknownComputer("start_build_capture"));
        // The screenshot of the opened app takes the same turn as the start.
        return steps.turns.run("start_build_capture", signal, async (turn) => {
            const { computer_id: _id, ...launch } = input;
            const started = await steps.capture.start(launch, turn);
            if (!started.ok)
                return started;
            // A failed screenshot only leaves it out, but a close or abort meanwhile cancels the start: it saved nothing to report.
            const shot = await steps.computer
                .callTool("computer_screenshot", {}, turn)
                .catch(() => undefined);
            if (turn.aborted) {
                steps.capture.abandon();
                return err(cancelledBy("start_build_capture", turn));
            }
            return ok({
                value: {
                    computer_id: input.computer_id,
                    ...started.value,
                    screenshot: shot === undefined || shot.isError ? null : shot.structured,
                },
                content: shot === undefined || shot.isError ? [] : shot.content,
            });
        });
    }
    markCheckpoint(input, signal) {
        return this.#on(input.computer_id, "mark_build_checkpoint", signal, async (steps, turn) => {
            const taken = await steps.capture.mark(input.name, turn);
            return taken.ok ? ok({ checkpoint: taken.value }) : taken;
        });
    }
    stopCapture(input, signal) {
        return this.#on(input.computer_id, "stop_build_capture", signal, (steps, turn) => steps.capture.stop(turn));
    }
    exportEnvironment(input, signal) {
        const { computer_id: id, ...request } = input;
        return this.#on(id, "export_build_environment", signal, (steps, turn) => steps.capture.export(request, turn));
    }
    recordConsent(input, signal) {
        const { computer_id: id, ...consent } = input;
        return this.#on(id, "record_build_consent", signal, (steps) => Promise.resolve(ok(steps.capture.recordConsent(consent))));
    }
    checkTask(input, signal, progress) {
        const { computer_id: id, ...request } = input;
        return this.#on(id, "check_build_task", signal, (steps, turn) => steps.witness.check(request, turn, progress));
    }
    /** Run one step on a held computer, on its turn among the computer's calls, and name the computer in its result. */
    async #on(id, operation, signal, run) {
        const steps = this.computers.steps(id);
        if (steps === undefined)
            return err(unknownComputer(operation));
        const result = await steps.turns.run(operation, signal, (turn) => run(steps, turn));
        return result.ok ? ok({ computer_id: id, ...result.value }) : result;
    }
}
