import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AsyncLocalStorage } from "node:async_hooks";

//#region dist/cli/cliEvidencePublication.js
var publication, withCliEvidencePublication, recordCliEvidencePublication, cliEvidencePublicationReceipt, retainCliPublicationOnError;
function init_cliEvidencePublication() {
	return (init_cliEvidencePublication = __esmMin((() => {
		publication = new AsyncLocalStorage();
		withCliEvidencePublication = (run) => publication.run({}, run);
		recordCliEvidencePublication = (receipt) => {
			const context = publication.getStore();
			if (context !== undefined) context.receipt = receipt;
		};
		cliEvidencePublicationReceipt = () => publication.getStore()?.receipt;
		retainCliPublicationOnError = (error, receipt = cliEvidencePublicationReceipt()) => {
			return receipt === undefined ? error : error.retainDiagnostics({ evidence_bundle: { ...receipt } });
		};
	})))();
}

//#endregion
export { cliEvidencePublicationReceipt, init_cliEvidencePublication, recordCliEvidencePublication, retainCliPublicationOnError, withCliEvidencePublication };