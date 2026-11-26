/** The home the seed spells, which the computer respells to its own at boot; the computer's user is `user`. */
export const SEED_HOME = "/home/user";
const SEED_HOST = "localhost";
const SEED_LOGIN = `user@${SEED_HOST}`;
/** What the scrub writes, which a search for what is left must not take for what it replaced. */
const REPLACEMENTS = [SEED_LOGIN, SEED_HOME, SEED_HOST];
const WORD = String.raw `\p{L}\p{N}_`;
/** A home path ends where no file name character follows, as the computer's boot respelling reads it. */
const HOME_END = String.raw `(?![${WORD}.@+~-])`;
/** A host name ends where no name character or `.name` follows, so `host.example.com` is left whole. */
const HOST_END = String.raw `(?![${WORD}-]|\.[${WORD}])`;
const escaped = (text) => text.replace(/[\\^$.*+?()[\]{}|/]/gu, "\\$&");
/** The captured home, unless it is the root or the seed's own home. */
const homeOf = ({ home }) => home.length > 1 && home !== SEED_HOME ? home : undefined;
/** The captured `user@host`, unless it is already what the scrub writes. */
const loginOf = ({ hostname, user }) => hostname === null || user === null || `${user}@${hostname}` === SEED_LOGIN
    ? undefined
    : `${user}@${hostname}`;
/** The host name, unless it is `localhost`, which every host calls itself. */
const hostOf = ({ hostname }) => hostname === null || hostname === SEED_HOST ? undefined : hostname;
/** The spellings a bundle must not hold: the captured home, `user@host` and the host name. */
export const identitySpellings = (identity) => [homeOf(identity), loginOf(identity), hostOf(identity)].filter((spelling) => spelling !== undefined);
/**
 * The identity's spellings the scrub replaces: the home path where a whole
 * path segment ends after it, as the computer respells it at boot;
 * `user@host`; and the host name as a whole name. The user name alone is
 * never matched, since a short one such as `ada` is also ordinary text.
 */
const identityPattern = (identity) => {
    const home = homeOf(identity);
    const login = loginOf(identity);
    const host = hostOf(identity);
    const alternatives = [
        ...(home === undefined ? [] : [`(?<home>${escaped(home)})${HOME_END}`]),
        ...(login === undefined
            ? []
            : [`(?<![${WORD}.+-])(?<login>${escaped(login)})${HOST_END}`]),
        ...(host === undefined
            ? []
            : [`(?<![${WORD}.-])(?<host>${escaped(host)})${HOST_END}`]),
    ];
    return alternatives.length === 0
        ? undefined
        : new RegExp(alternatives.join("|"), "gu");
};
/** The text with the identity replaced: `/home/user` for the home, `user@localhost` and `localhost` for the host. */
export const scrubHostIdentity = (text, identity) => {
    const pattern = identityPattern(identity);
    return pattern === undefined
        ? text
        : text.replace(pattern, (...match) => {
            const groups = match.at(-1);
            if (groups.home !== undefined)
                return SEED_HOME;
            return groups.login === undefined ? SEED_HOST : SEED_LOGIN;
        });
};
/**
 * The first of the identity's spellings a text still holds, by the rule for
 * what a bundle may not ship and a check may not name: the captured home where
 * a whole path segment ends after it, and `user@host` and the host name
 * anywhere, as in `host.local` or `host-notes.txt`. The scrub's own
 * replacements are set aside first, so a host named `host` is not found in
 * `localhost`.
 */
export const identityLeftIn = (text, identity) => {
    const home = homeOf(identity);
    return identitySpellings(identity).find((spelling) => {
        const rest = REPLACEMENTS.filter((own) => own.includes(spelling)).reduce((remaining, own) => remaining.replaceAll(own, "\u0000"), text);
        return spelling === home
            ? new RegExp(`${escaped(home)}${HOME_END}`, "u").test(rest)
            : rest.includes(spelling);
    });
};
