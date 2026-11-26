import { createJavaScriptSourceAnalysis } from "../javascript/analysis/JavaScriptSourceAnalysis.js";
/** Bind JavaScript artifact analysis to the provider's isolated worker. */
export const javascriptSourceAnalysis = createJavaScriptSourceAnalysis;
