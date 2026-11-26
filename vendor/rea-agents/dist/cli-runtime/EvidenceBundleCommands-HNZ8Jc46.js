import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, EvidenceFileError, cancelledBy, init_analysisErrorCore, init_evidenceErrors, init_jsonValue, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ArtifactResourceScope, init_ArtifactResourceScope, init_resources } from "./resources-B3P64jvH.js";
import { init_analysisErrorCleanup, withInheritedCleanupOwnership } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { evidenceBundleExportReceipt, init_EvidenceBundleFiles, readComparisonEvidenceBundles, readEvidenceBundle, readImmutableEvidenceBundle, writeEvidenceBundle } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { init_InvestigationEvidence, resolveInvestigationEvidenceClosure } from "./InvestigationEvidence-BFl9Xj1M.js";
import { dispatchQueuedInterrupts, init_queuedInterrupts } from "./queuedInterrupts-gxezF6I5.js";
import { compareBundles, init_bundleComparison, init_evidenceRecordSummary, inspectEvidenceLinks, selectEvidenceRecords, summarizeEvidenceBundle } from "./evidenceRecordSummary-B3n4elFj.js";
import { finalizedResult, init_runOwned, runOwned } from "./runOwned-BkKv5e_3.js";

//#region dist/application/investigation/InspectEvidenceBundle.js
var DELIVERY_FIELDS, inspectEvidenceBundle;
function init_InspectEvidenceBundle() {
	return (init_InspectEvidenceBundle = __esmMin((() => {
		init_analysisErrorCore();
		init_result();
		init_evidenceRecordSummary();
		DELIVERY_FIELDS = [
			["offset", ["records", "links"]],
			["limit", ["records", "links"]],
			["traversal", ["links"]],
			["link_status", ["links"]]
		];
		inspectEvidenceBundle = (bundle, options) => {
			if (options.detail === "complete" && options.filters !== undefined) return err(new AnalysisInputError("get_evidence_bundle", undefined, [{
				path: ["filters"],
				reason: "invalid_value",
				message: "Record filters require detail: summary, records or links; complete returns the canonical bundle.",
				expected: "detail: summary, records or links"
			}]));
			const misplaced = DELIVERY_FIELDS.filter(([field, details]) => options[field] !== undefined && !details.includes(options.detail));
			if (misplaced.length > 0) return err(new AnalysisInputError("get_evidence_bundle", undefined, misplaced.map(([field, details]) => {
				const expected = details.map((detail) => `detail: ${detail}`).join(" or ");
				return {
					path: [field],
					reason: "invalid_value",
					message: `${field} requires ${expected}.`,
					expected
				};
			})));
			if (options.detail === "records") return ok(selectEvidenceRecords(bundle, options.filters, {
				offset: options.offset,
				limit: options.limit
			}));
			if (options.detail === "links") return ok(inspectEvidenceLinks(bundle, options.filters, {
				traversal: options.traversal,
				linkStatus: options.link_status,
				offset: options.offset,
				limit: options.limit
			}));
			return ok(options.detail === "summary" ? summarizeEvidenceBundle(bundle, options.filters) : bundle);
		};
	})))();
}

//#endregion
//#region dist/application/EvidenceBundleCommands.js
var importEvidenceBundleCommand, exportEvidenceBundleCommand, publishEvidenceDelivery, evidenceDeliveryCommitted, persistEvidenceBundleCommand, compareEvidenceBundlesCommand, projectWrite, inspectEvidenceBundleCommand, withBundleReadResources, finalizeBundleWork;
function init_EvidenceBundleCommands() {
	return (init_EvidenceBundleCommands = __esmMin((() => {
		init_InvestigationEvidence();
		init_queuedInterrupts();
		init_evidenceErrors();
		init_analysisErrorCleanup();
		init_analysisErrorCore();
		init_jsonValue();
		init_result();
		init_bundleComparison();
		init_resources();
		init_EvidenceBundleFiles();
		init_InspectEvidenceBundle();
		init_runOwned();
		importEvidenceBundleCommand = async (path, signal) => {
			return withBundleReadResources(async (resources) => {
				const loaded = await readEvidenceBundle(path, signal, resources, "import_evidence_bundle");
				if (!loaded.ok) return loaded;
				return ok({
					imported: loaded.value.records.length,
					unknowns_added: loaded.value.unknowns.length,
					total: loaded.value.records.length
				});
			}, "import_evidence_bundle", signal);
		};
		exportEvidenceBundleCommand = async (sourcePath, outputPath, overwrite, signal) => {
			const loaded = await withBundleReadResources((resources) => readImmutableEvidenceBundle(sourcePath, signal, resources, "export_evidence_bundle"), "export_evidence_bundle", signal);
			if (!loaded.ok) return loaded;
			const written = await finalizeBundleWork(() => persistEvidenceBundleCommand(loaded.value, outputPath, overwrite, signal, "export_evidence_bundle"), {
				providerId: "rea",
				operation: "export_evidence_bundle",
				signal,
				close: dispatchQueuedInterrupts,
				diagnostics: (receipt) => ({ evidence_bundle: { ...receipt } })
			});
			return projectWrite(loaded.value, written);
		};
		publishEvidenceDelivery = async (input) => {
			const { signal, operation } = input;
			const sources = new Map(input.bundle.records.map((record) => [record.evidence_id, record]));
			const closure = resolveInvestigationEvidenceClosure({ evidenceForAnalysis: (id) => sources.get(id) }, [input.complete.evidence_id]);
			if (!closure.ok) return err(closure.error.retainPartialObservation(input.complete));
			const written = await persistEvidenceBundleCommand(input.bundle, input.outputPath, false, signal, operation);
			await dispatchQueuedInterrupts();
			if (!written.ok) {
				const original = written.error;
				const failure = original instanceof EvidenceFileError && original.reason === "exists" ? withInheritedCleanupOwnership(new EvidenceFileError(original.operation, original.reason, {
					cause: original,
					...original.path === undefined ? {} : { path: original.path },
					userMessage: "Evidence file already exists. Choose another output path.",
					...original.cleanupIncomplete ? { cleanup: original.cleanup } : {},
					diagnostics: original.diagnostics
				}), original) : original;
				return err(failure.retainPartialObservation(input.complete));
			}
			if (signal?.aborted) return err(cancelledBy(operation, signal, {
				partialObservation: input.delivered,
				diagnostics: { evidence_bundle: { ...written.value } }
			}));
			return ok({
				delivered: input.delivered,
				evidenceBundle: written.value
			});
		};
		evidenceDeliveryCommitted = (error) => error.diagnostics?.evidence_bundle !== undefined || error instanceof EvidenceFileError && error.published !== undefined;
		persistEvidenceBundleCommand = async (bundle, outputPath, overwrite, signal, operation) => {
			const resources = new ArtifactResourceScope();
			const written = await writeEvidenceBundle(bundle, outputPath, overwrite, resources, signal, operation);
			if (written.ok) return written;
			await resources.close().catch(() => undefined);
			if (!written.error.cleanupIncomplete && written.error instanceof EvidenceFileError && written.error.published?.path !== undefined) {
				return ok({
					path: written.error.published.path,
					bytes: written.error.published.bytes
				});
			}
			return written;
		};
		compareEvidenceBundlesCommand = async (input) => {
			return withBundleReadResources(async (resources) => {
				const loaded = await readComparisonEvidenceBundles(input.leftPath, input.rightPath, input.signal, resources);
				if (!loaded.ok) return loaded;
				const { left, right } = loaded.value;
				try {
					return ok(jsonValueSchema.parse(compareBundles(left, right, input.recordPairs)));
				} catch (cause) {
					if (cause instanceof AnalysisInputError) return err(cause);
					throw cause;
				}
			}, "compare_bundles", input.signal);
		};
		projectWrite = (bundle, written) => written.ok ? ok(evidenceBundleExportReceipt(bundle, written.value)) : written;
		inspectEvidenceBundleCommand = async (input, signal) => {
			return withBundleReadResources(async (resources) => {
				const loaded = await readEvidenceBundle(input.path, signal, resources, "get_evidence_bundle");
				return loaded.ok ? inspectEvidenceBundle(loaded.value, input) : loaded;
			}, "get_evidence_bundle", signal);
		};
		withBundleReadResources = async (read, operation, signal) => {
			const resources = new ArtifactResourceScope();
			let readFailed = false;
			return finalizeBundleWork(() => read(resources), {
				providerId: "rea",
				operation,
				signal,
				inspectPrimary: (primary) => {
					readFailed = !primary.ok;
				},
				close: async () => {
					try {
						await resources.close();
					} catch (cause) {
						if (!readFailed) throw cause;
					} finally {
						await dispatchQueuedInterrupts();
					}
				},
				fallbackResource: `${operation} bundle read resources`,
				diagnostics: (value) => ({ completed_result: value })
			});
		};
		finalizeBundleWork = async (work, options) => {
			let defect;
			const finalized = await runOwned(async () => {
				try {
					return await work();
				} catch (cause) {
					defect = { cause };
					throw cause;
				}
			}, options);
			if (defect !== undefined) throw defect.cause;
			return finalizedResult(finalized);
		};
	})))();
}

//#endregion
export { compareEvidenceBundlesCommand, evidenceDeliveryCommitted, exportEvidenceBundleCommand, importEvidenceBundleCommand, init_EvidenceBundleCommands, inspectEvidenceBundleCommand, publishEvidenceDelivery };