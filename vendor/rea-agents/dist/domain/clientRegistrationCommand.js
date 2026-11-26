import { err, ok } from "./result.js";
import { processArgumentSchema } from "./process/processArgument.js";
/**
 * Registration text separates words with ASCII spaces. Single/double quotes
 * delimit adjacent fragments, including empty arguments. Backslashes and shell
 * punctuation are literal data. Structured defaults bypass text tokenization.
 */
export const parseClientRegistrationCommand = (input) => {
    let words;
    if (typeof input === "string") {
        const parsed = registrationWords(input);
        if (!parsed.ok)
            return parsed;
        words = parsed.value;
    }
    else if (Array.isArray(input) &&
        input.every((word) => typeof word === "string")) {
        words = input;
    }
    else
        return err({
            kind: "invalid_type",
            message: "The registration command must be command text or string arguments.",
        });
    const [command, ...args] = words;
    if (command === undefined || command === "")
        return err({
            kind: "empty_command",
            message: "The registration command needs a nonempty executable.",
        });
    if (words.some((word) => !processArgumentSchema.safeParse(word).success))
        return err({
            kind: "invalid_argument",
            message: "The registration executable and arguments cannot contain NUL characters. Remove them before registering the client.",
        });
    const source = URL.parse(command);
    if (source?.protocol === "http:" || source?.protocol === "https:")
        return err({
            kind: "unsupported_transport",
            message: "This command registers stdio launchers. HTTP(S) URLs are not executable commands; configure the remote MCP server in the client's settings instead.",
        });
    return ok({ command, args });
};
const registrationWords = (text) => {
    const words = [];
    let word;
    let quote;
    for (const character of text) {
        if (quote !== undefined) {
            if (character === quote)
                quote = undefined;
            else
                word = `${word ?? ""}${character}`;
        }
        else if (character === "'" || character === '"') {
            quote = character;
            word ??= "";
        }
        else if (character === " ") {
            if (word !== undefined)
                words.push(word);
            word = undefined;
        }
        else
            word = `${word ?? ""}${character}`;
    }
    if (quote !== undefined)
        return err({
            kind: "unterminated_quote",
            message: "The registration command has an unclosed quote.",
        });
    if (word !== undefined)
        words.push(word);
    return ok(words);
};
