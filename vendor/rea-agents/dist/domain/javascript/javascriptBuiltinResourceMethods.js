/** Supported native resource receivers, shared by acquisition and validity owners. */
export const BUILTIN_RESOURCE_METHODS = {
    fs: ["open", "openSync", "createReadStream", "createWriteStream"],
    "fs/promises": ["open"],
    net: ["connect", "createConnection"],
    tls: ["connect"],
};
const inherited = { owner: "prototype" };
// Each entry lists the release methods looked up inside the native call.
const releases = {
    "fs:createReadStream": {
        close: {
            owner: "prototype",
            definingPrototypeDepth: 1,
            delegates: ["destroy"],
        },
        destroy: { owner: "prototype", definingPrototypeDepth: 2 },
    },
    "fs:createWriteStream": {
        close: {
            owner: "prototype",
            definingPrototypeDepth: 1,
            delegates: ["end", "destroy"],
        },
        destroy: { owner: "prototype", definingPrototypeDepth: 2 },
        end: { owner: "prototype", definingPrototypeDepth: 2 },
    },
    "fs/promises:open": { close: { owner: "instance" } },
    "net:connect": { destroy: inherited, end: inherited },
    "net:createConnection": { destroy: inherited, end: inherited },
    "tls:connect": { destroy: inherited, end: inherited },
};
export const builtinResourceReleases = (specifier, method) => releases[`${specifier}:${method}`];
export const BUILTIN_RESOURCE_SPECIFIERS = Object.keys(BUILTIN_RESOURCE_METHODS);
