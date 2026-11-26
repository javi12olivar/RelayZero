import { CdpBrowserProvider } from "../browser/CdpBrowserProvider.js";
import { resolveJavaScriptMemberMutationAllowance } from "../config/javascriptMemberMutationAllowance.js";
/**
 * Construct a fresh provider without opening a target or acquiring an engine.
 * Bundle analysis reads the member-mutation allowance from the accepted
 * operation's settings and the launch environment when it starts.
 */
export const createBrowserObservationProvider = (admission, environment, settings) => new CdpBrowserProvider(admission, () => resolveJavaScriptMemberMutationAllowance(environment, settings?.().overrides));
