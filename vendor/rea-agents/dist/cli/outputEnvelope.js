/*
 * The failure envelope, its terminal rendering and the token window of
 * dispatcher-written documents are adapted from Incur's CLI output.
 * Copyright (c) 2025-present weth, LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
import { estimateTokenCount } from "tokenx";
import { renderCliDocument } from "../cliOutput.js";
import { jsonLinesErrorRecord } from "./jsonLines.js";
import { sliceTextByTokenWindow } from "./tokenWindow.js";
/** `Error: message`, or `Error (CODE): message` for codes other than lookup failures. */
const humanError = ({ code, message }) => `${code === "UNKNOWN" || code === "COMMAND_NOT_FOUND" ? "Error" : `Error (${code})`}: ${message}`;
/** A blank line, the description, then each command with its aligned comment. */
export const formatCliCallToAction = ({ description, commands, }) => {
    const width = Math.max(...commands.map(({ command }) => command.length));
    return [
        "",
        description,
        ...commands.map(({ command, description: comment }) => `  ${command}${comment === undefined ? "" : `  ${"".padEnd(width - command.length)}# ${comment}`}`),
    ].join("\n");
};
/** One line of output: a trailing newline unless the text already ends with one. */
const line = (text) => text.endsWith("\n") ? text : `${text}\n`;
const tokenWindow = (text, { tokenLimit, tokenOffset }) => {
    if (tokenLimit === undefined && tokenOffset === undefined)
        return { truncated: false, text };
    const window = sliceTextByTokenWindow(text, tokenOffset ?? 0, tokenLimit);
    if (!window.truncated)
        return { truncated: false, text: window.text };
    return {
        truncated: true,
        text: `${window.text}\n[truncated: showing tokens ${window.start}–${window.end} of ${window.total}]`,
        nextOffset: window.end < window.total ? window.end : undefined,
    };
};
/**
 * Render a failure the dispatcher reports itself, such as an unknown command.
 * A person on a terminal reads the error and the suggested commands as text;
 * otherwise the error and its suggestions form one document, or the
 * `--full-output` envelope, in the chosen format and token window.
 */
export const renderFailure = (failure, { command, duration, }, cta, presentation) => {
    const { format } = presentation;
    const encode = (value) => renderCliDocument(value, format, process.stdout.isTTY === true).replace(/\n$/u, "");
    const meta = { command, ...(cta === undefined ? {} : { cta }), duration };
    const bare = cta === undefined ? failure : { ...failure, cta };
    if (format === "jsonl")
        return renderCliDocument(jsonLinesErrorRecord(presentation.fullOutput ? { ok: false, error: failure, meta } : bare), "jsonl", false);
    if (presentation.tokenCount) {
        const document = presentation.fullOutput
            ? { ok: false, error: failure, meta }
            : bare;
        return line(String(estimateTokenCount(encode(document))));
    }
    if (presentation.human &&
        !presentation.fullOutput &&
        presentation.tokenLimit === undefined &&
        presentation.tokenOffset === undefined)
        return (line(humanError(failure)) +
            (cta === undefined ? "" : line(formatCliCallToAction(cta))));
    if (presentation.fullOutput) {
        const window = tokenWindow(encode(failure), presentation);
        return line(encode(window.truncated
            ? {
                ok: false,
                error: window.text,
                meta: {
                    ...meta,
                    ...(window.nextOffset === undefined
                        ? {}
                        : { nextOffset: window.nextOffset }),
                },
            }
            : { ok: false, error: failure, meta }));
    }
    return line(tokenWindow(encode(bare), presentation).text);
};
