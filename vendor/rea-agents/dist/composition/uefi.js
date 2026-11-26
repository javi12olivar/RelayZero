import { UefiAnalysisProvider } from "../uefi/UefiAnalysisProvider.js";
/** Construct one UEFI provider; it needs no external tools. */
export const createUefiAnalysisProvider = () => new UefiAnalysisProvider();
