import { decodeLimit } from "../../domain/parseFailure.js";
/** The ParseFailure format of an Apple DiagnosticReports `.ips` crash report. */
export const APPLE_IPS_FORMAT = "apple-ips";
/** Resource boundary exceeded while walking an IPS crash report. */
export const appleIpsLimit = (name, maximum, detail) => decodeLimit(APPLE_IPS_FORMAT, detail, { name, maximum });
