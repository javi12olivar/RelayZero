import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { UnknownRegistryError, init_unknownRegistryError } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_residualUnknown, recordUnknownInputSchema } from "./evidenceBundle-CWOVHJ6o.js";

//#region dist/application/investigation/WorkflowUnknown.js
var workflowUnknownInput;
function init_WorkflowUnknown() {
	return (init_WorkflowUnknown = __esmMin((() => {
		init_residualUnknown();
		init_result();
		init_unknownRegistryError();
		workflowUnknownInput = (evidenceId, input) => {
			const question = recordUnknownInputSchema.shape.question.safeParse(input.question);
			if (!question.success) return err(new UnknownRegistryError("invalid-transition", { cause: question.error }));
			return ok({
				...input,
				question: `${question.data} (Evidence ${evidenceId})`,
				supporting_evidence_ids: [evidenceId],
				contradicting_evidence_ids: []
			});
		};
	})))();
}

//#endregion
export { init_WorkflowUnknown, workflowUnknownInput };