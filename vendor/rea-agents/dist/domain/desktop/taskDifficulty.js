/** Solves asked first; a task that passes none or all of them is decided. */
const FIRST_SOLVES = 3;
/** Solves in all for a task the first ones leave undecided. */
const ALL_SOLVES = 5;
/** The most passes of all the solves a task in the band has. */
const MOST_BAND_PASSES = 3;
/** Solves that did not finish, run again, before the measure stops. */
const MAX_UNFINISHED = 2;
const finished = (solve) => solve.outcome === "passed" || solve.outcome === "scored below 1";
const counts = (solves) => {
    const done = solves.filter(finished);
    return {
        done: done.length,
        passes: done.filter((solve) => solve.outcome === "passed").length,
    };
};
/** The band the finished solves place the task in: 0 or 3 of 3 decide it, else 1 to 3 of 5 keep it. */
const bandOf = (solves) => {
    const { done, passes } = counts(solves);
    if (done >= ALL_SOLVES)
        return passes === 0
            ? "too_hard"
            : passes <= MOST_BAND_PASSES
                ? "in_band"
                : "too_easy";
    if (done >= FIRST_SOLVES && passes === 0)
        return "too_hard";
    if (done >= FIRST_SOLVES && passes === done)
        return "too_easy";
    return "undecided";
};
/** The solves' costs, or null when any solve's cost is unknown. */
const costs = (solves) => {
    const known = [];
    for (const { usd } of solves) {
        if (usd === null)
            return null;
        known.push(usd);
    }
    return known;
};
/** The total cost of the solves, or null when any solve's cost is unknown. */
const spent = (solves) => costs(solves)?.reduce((total, usd) => total + usd, 0) ?? null;
/**
 * Whether to run another solve: not once the band is decided, after too many
 * unfinished solves, after a solve of unknown cost, or when the largest cost
 * so far would take the total past the budget.
 */
export const nextSolve = (solves, budgetUsd) => {
    if (bandOf(solves) !== "undecided")
        return { next: false, stopped: "decided" };
    if (solves.filter((solve) => !finished(solve)).length > MAX_UNFINISHED)
        return { next: false, stopped: "unfinished" };
    const known = costs(solves);
    if (known === null)
        return { next: false, stopped: "cost_unknown" };
    const projected = known.reduce((total, usd) => total + usd, 0) + Math.max(0, ...known);
    const rounding = Number.EPSILON * Math.max(projected, budgetUsd) * (solves.length + 2);
    return projected - budgetUsd > rounding
        ? { next: false, stopped: "budget" }
        : { next: true };
};
const cents = (usd) => Math.round(usd * 1e6) / 1e6;
export const difficultyRecord = (input) => {
    const done = input.solves.filter(finished);
    const total = spent(input.solves);
    // A Map, so a check named like an object's own member, such as constructor, counts as any other.
    const failures = new Map();
    for (const solve of done)
        for (const check of solve.failed_checks)
            failures.set(check, (failures.get(check) ?? 0) + 1);
    return {
        model: input.model,
        agent: input.agent,
        measured_at: input.measuredAt,
        band: bandOf(input.solves),
        stopped: input.stopped,
        k: done.length,
        passes: counts(input.solves).passes,
        unfinished: input.solves.length - done.length,
        usd: total === null ? null : cents(total),
        budget_usd: input.budgetUsd,
        turns: done.map((solve) => solve.turns),
        failures_per_check: Object.fromEntries(failures),
        solves: [...input.solves],
        task_sha256: input.taskSha256,
        versions: input.versions,
    };
};
const BAND_WORDS = {
    in_band: "in the band",
    too_easy: "too easy",
    too_hard: "too hard",
    undecided: "undecided",
};
const DIFFICULTY_HEADING = "## Measured difficulty";
/** The README section naming each measured task's model, passes, band and cost. */
export const difficultySection = (records) => `${DIFFICULTY_HEADING}

\`difficulty.json\` records each task's solves in fresh computers, by REA's \`measure_build_task\`: 3 solves, 2 more
unless they pass none or all, and a task is in the band when it passes 1 to 3 of 5.

${Object.entries(records)
    .map(([name, record]) => `- \`${name}\`: ${record.model} passed ${String(record.passes)} of ${String(record.k)}, ${BAND_WORDS[record.band]}, ${record.usd === null ? "cost unknown" : `$${record.usd.toFixed(2)} in all`}.`)
    .join("\n")}
`;
/** The README with its measured-difficulty section replaced, or added at the end. */
export const withDifficultySection = (readme, section) => {
    const start = readme.indexOf(`\n${DIFFICULTY_HEADING}\n`);
    if (start === -1)
        return `${readme.replace(/\n*$/u, "\n")}\n${section}`;
    const next = readme.indexOf("\n## ", start + 1);
    return `${readme.slice(0, start + 1)}${section}${next === -1 ? "" : readme.slice(next)}`;
};
