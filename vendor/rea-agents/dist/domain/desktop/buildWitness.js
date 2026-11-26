import { err, ok } from "../result.js";
/**
 * The witness of an exported task, in order: the seed must fail a check, the
 * edit pass every one, a near miss fail one again, and the seed that
 * `data/reset` restores must give each check its seed result.
 */
export const WITNESS_STAGES = [
    "seed",
    "after_edit",
    "near_miss",
    "after_reset",
];
const EXPECTATIONS = {
    seed: "some_fail",
    after_edit: "all_pass",
    near_miss: "some_fail",
    after_reset: "some_fail",
};
/** Actions that change the app through its own interface; a reset restores the seed instead. */
const INPUT = [
    "click",
    "drag",
    "scroll",
    "type",
    "type_secret",
    "key",
];
export const stageExpectation = (stage) => EXPECTATIONS[stage];
const seedResults = (stages) => new Map(stages
    .find((filed) => filed.stage === "seed")
    ?.results.map((result) => [result.id, result]));
/**
 * The checks whose decided result after a reset differs from a decided seed
 * result. A seed result that was unreadable is not a failure to compare
 * against; a reset that restores the seed leaves none.
 */
export const unrestoredChecks = (stages, results) => {
    const seed = seedResults(stages);
    return results.filter((result) => {
        const filed = seed.get(result.id);
        if (filed === undefined)
            return true;
        if (filed.undecided === true)
            return false;
        return filed.passed !== result.passed;
    });
};
/**
 * Checks whose seed comparison is unknown: either the filed seed result or the
 * result after the reset was not read. An unreadable `false` is not the same
 * result as a decided `false`.
 */
export const unreadResetChecks = (stages, results) => {
    const seed = seedResults(stages);
    return results.filter((result) => {
        const filed = seed.get(result.id);
        if (filed === undefined)
            return false;
        return filed.undecided === true || result.undecided === true;
    });
};
/**
 * Whether a stage's results show what the witness needs of it, given the
 * stages filed before it. Only a check that failed on what its view shows
 * counts as a failure; one that failed for want of a readable or whole view
 * leaves the stage undecided when no such failure settles it. After a reset,
 * each check must also come out as it did on the seed.
 */
export const stageVerdict = (stage, results, stages = []) => {
    if (stage === "after_reset") {
        const unrestored = unrestoredChecks(stages, results);
        if (unrestored.some((result) => result.undecided !== true))
            return "not_held";
        if (unrestored.length > 0 || unreadResetChecks(stages, results).length > 0)
            return "undecided";
    }
    const failed = results.filter((result) => !result.passed);
    const shown = failed.some((result) => result.undecided !== true);
    if (EXPECTATIONS[stage] === "some_fail")
        return shown ? "held" : failed.length > 0 ? "undecided" : "not_held";
    if (shown || results.length === 0)
        return "not_held";
    return failed.length > 0 ? "undecided" : "held";
};
/** Why an edit or a near miss is not one: no input since the stage before, or a reset after the last input. */
const notAnEdit = (stage, since, latest) => {
    if (latest.input < latest.from)
        return `Before checking ${stage}, act on the app with act_on_build_computer: no click, drag, scroll, type, type_secret or key was applied since ${since}, and a reset does not count.`;
    if (latest.unsettledReset > latest.reset &&
        latest.unsettledReset > latest.input)
        return `A reset since ${since} lost its reply, so whether it restored the seed is unknown. Reset again, or act after a reset whose reply you have, before checking ${stage}.`;
    if (latest.reset > latest.input)
        return `A reset since ${since} put the seed back; act on the app after it before checking ${stage}.`;
    return undefined;
};
/**
 * Whether `stage` may be checked now, given the stages already checked and
 * the action log; its value is where this stage's actions end. The edit and
 * the near miss each need an applied click, drag, scroll, type, typed secret
 * or key since the stage before, with no reset after the last of them; the
 * check after reset needs a reset since the stage before as the last change.
 */
export const admitWitnessStage = (stages, stage, log) => {
    const expected = WITNESS_STAGES[stages.length];
    if (expected === undefined)
        return err("This witness has ended; start a fresh computer from the bundle to witness again.");
    if (stage !== expected)
        return err(`The witness checks ${WITNESS_STAGES.join(", ")} in that order; the next stage is ${expected}.`);
    const latest = {
        from: stages.at(-1)?.actions_before ?? 0,
        input: Math.max(-1, ...INPUT.map((kind) => log.lastApplied[kind] ?? -1)),
        reset: log.lastApplied.reset ?? -1,
        unsettledReset: log.lastUnsettled?.reset ?? -1,
    };
    const edit = stage === "after_edit" || stage === "near_miss"
        ? notAnEdit(stage, stages.at(-1)?.stage ?? "the start", latest)
        : undefined;
    if (edit !== undefined)
        return err(edit);
    if (stage === "after_reset" &&
        latest.unsettledReset > latest.reset &&
        latest.unsettledReset >= latest.from)
        return err("The last reset's reply was lost, so whether it restored the seed is unknown. Reset again, then check after_reset once that reset is applied.");
    if (stage === "after_reset" &&
        (latest.reset < latest.from || latest.reset < latest.input))
        return err("Before checking after_reset, reset the app with act_on_build_computer action reset, and change nothing after it.");
    return ok(log.total);
};
