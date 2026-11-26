import { boundedList } from "../../domain/boundedList.js";
import { utf8HeadExcerpt } from "../../domain/utf8HeadExcerpt.js";
/** Bytes the log keeps of each string in an action's arguments, such as type's text. */
export const LOGGED_TEXT_BYTES = 1024;
/** Items the log keeps of each list in an action's arguments, such as drag's path. */
export const LOGGED_LIST_ITEMS = 64;
/** The latest actions the log keeps, and the JSON bytes they may take together. */
export const LOGGED_ACTIONS = 256;
export const LOGGED_BYTES = 256 * 1024;
/** A value within the log's allowance, redacted, and whether it was cut. */
const bounded = (value, redact) => {
    if (typeof value === "string") {
        const { text, truncated } = utf8HeadExcerpt(redact(value), LOGGED_TEXT_BYTES);
        return { value: text, cut: truncated };
    }
    if (Array.isArray(value)) {
        const kept = boundedList(value, LOGGED_LIST_ITEMS);
        const items = kept.items.map((item) => bounded(item, redact));
        return {
            value: items.map((item) => item.value),
            cut: kept.omitted > 0 || items.some((item) => item.cut),
        };
    }
    if (value === null || typeof value !== "object")
        return { value, cut: false };
    const fields = Object.entries(value).map(([name, field]) => [redact(name), bounded(field, redact)]);
    return {
        value: Object.fromEntries(fields.map(([name, field]) => [name, field.value])),
        cut: fields.some(([, field]) => field.cut),
    };
};
const jsonBytes = (entry) => Buffer.byteLength(JSON.stringify(entry));
/**
 * A build computer's action log. It counts every action and keeps the index
 * of the last applied action of each kind, so rules over a whole session hold
 * however long it runs, and keeps the latest actions themselves within
 * `LOGGED_ACTIONS` and `LOGGED_BYTES`, dropping the oldest first.
 */
export class BuildComputerActionLog {
    redact;
    #kept = [];
    #lastApplied = {};
    #lastUnsettled = {};
    #total = 0;
    #bytes = 0;
    /** `redact` takes each string the log keeps, so no known secret's value stays in it. */
    constructor(redact = (text) => text) {
        this.redact = redact;
    }
    /** Every action logged, kept or not; the next one's index. */
    get total() {
        return this.#total;
    }
    /** How many of the earliest actions are no longer kept. */
    get dropped() {
        return this.#total - this.#kept.length;
    }
    /** The kept actions, oldest first, indexed on from `dropped`. */
    get entries() {
        return this.#kept.map(({ entry }) => entry);
    }
    /** The index of the last applied action of each kind, kept or not. */
    get lastApplied() {
        return { ...this.#lastApplied };
    }
    /** The index of the last action whose reply was lost, kept or not. */
    get lastUnsettled() {
        return { ...this.#lastUnsettled };
    }
    /** Log an action as it is sent, pending, and how to record how it ended. */
    begin(action, tool, args) {
        const index = this.#total;
        const fields = Object.entries(args).map(([name, value]) => [name, bounded(value, this.redact)]);
        const truncated = fields.flatMap(([name, field]) => field.cut ? [name] : []);
        const entry = {
            index,
            action,
            tool,
            arguments: Object.fromEntries(fields.map(([name, field]) => [name, field.value])),
            ...(truncated.length === 0 ? {} : { truncated_arguments: truncated }),
            started_at: new Date().toISOString(),
            ended_at: null,
            outcome: "pending",
        };
        this.#total += 1;
        this.#keep(this.#kept.length, entry);
        return {
            index,
            settle: (outcome, observation) => {
                if (outcome === "applied")
                    this.#lastApplied[action] = Math.max(index, this.#lastApplied[action] ?? index);
                if (observation?.unsettled === true)
                    this.#lastUnsettled[action] = Math.max(index, this.#lastUnsettled[action] ?? index);
                // An action dropped while pending leaves only its outcome above.
                const slot = index - this.dropped;
                if (this.#kept[slot] !== undefined)
                    this.#keep(slot, {
                        ...entry,
                        outcome,
                        ended_at: new Date().toISOString(),
                    });
            },
        };
    }
    /** Put an entry in its slot, then drop the oldest until the rest fit the allowance. */
    #keep(slot, entry) {
        const bytes = jsonBytes(entry);
        this.#bytes += bytes - (this.#kept[slot]?.bytes ?? 0);
        this.#kept[slot] = { entry, bytes };
        while (this.#kept.length > LOGGED_ACTIONS || this.#bytes > LOGGED_BYTES)
            this.#bytes -= this.#kept.shift()?.bytes ?? 0;
    }
}
