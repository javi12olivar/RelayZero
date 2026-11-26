import { readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { aptListFileName, aptIndexSourceSuite, entryForTarget, isUbuntuProRepository, parseAptConfigShell, parseAptIndexTargets, parseDeb822Sources, parseOneLineSources, } from "../domain/desktop/aptRepositories.js";
import { DEFAULT_DPKG_STATUS_SOURCE } from "../domain/desktop/linuxPackages.js";
import { isStrictUtf8 } from "../domain/strictUtf8.js";
import { withGpgvKeyCheck, } from "./GpgvKeyCheck.js";
import { hostFileKind, readHostFile } from "./HostFileRead.js";
import { queryUtf8Text } from "./HostQuery.js";
export const APT_LOCATIONS = {
    trustedParts: "/etc/apt/trusted.gpg.d",
    trusted: "/etc/apt/trusted.gpg",
    lists: "/var/lib/apt/lists",
    status: DEFAULT_DPKG_STATUS_SOURCE,
};
/**
 * apt's folders as `apt-config` resolves them under `Dir`, which an
 * `APT_CONFIG` file can move, as a user-space `apt-get update` does with its
 * lists. Each is the fallback's when apt-config is missing, fails or does not
 * name it. APT::Architecture requires a successful configuration query.
 */
export const resolveAptLocations = async (runQuery, signal, fallback = APT_LOCATIONS) => {
    const output = await queryUtf8Text(runQuery, "apt-config", [
        "shell",
        "LISTS",
        "Dir::State::Lists/d",
        "PARTS",
        "Dir::Etc::TrustedParts/d",
        "TRUSTED",
        "Dir::Etc::Trusted/f",
        "STATUS",
        "Dir::State::status/f",
        "ARCH",
        "APT::Architecture",
    ], signal);
    const values = parseAptConfigShell(output.kind === "read" ? output.text : "");
    const architecture = values.get("ARCH");
    const value = (name) => {
        const found = values.get(name);
        return found?.startsWith("/") === true ? found : undefined;
    };
    return {
        lists: value("LISTS") ?? fallback.lists,
        trustedParts: value("PARTS") ?? fallback.trustedParts,
        trusted: value("TRUSTED") ?? fallback.trusted,
        status: value("STATUS") ?? fallback.status ?? DEFAULT_DPKG_STATUS_SOURCE,
        // Debian architecture words use letters, digits, and hyphens. GNU CPU
        // names such as x86_64 also use underscores. APT substitutes either form
        // for $(ARCH). Dots, slashes, and whitespace are not architecture tokens.
        ...(architecture !== undefined &&
            /^[a-z0-9][a-z0-9_-]*$/u.test(architecture)
            ? { configuredArchitecture: architecture }
            : {}),
    };
};
const FILE_MAX_BYTES = 1024 * 1024;
const MAX_CANDIDATE_KEYS = 64;
const UBUNTU_PRO = "not checked: it is an Ubuntu Pro (ESM) repository, which apt reaches only with the host's Ubuntu Pro credentials, and the computer has none";
/** apt's Packages indexes by the text `apt-cache policy` prints for each; undefined when apt-get could not list them. */
const indexTargets = async (runQuery, signal, configuredArchitecture) => {
    const query = await runQuery("apt-get", ["indextargets", "Created-By: Packages"], signal, { preserveStdoutBytes: true });
    if (typeof query !== "object" || query.exitCode !== 0)
        return undefined;
    const output = query.stdoutBuffer ?? query.stdout;
    const targets = new Map();
    for (const target of parseAptIndexTargets(output, configuredArchitecture))
        if (!targets.has(target.description))
            targets.set(target.description, target);
    return {
        entries: targets,
        incomplete: typeof output !== "string" && !isStrictUtf8(output),
    };
};
/** The stanzas of each sources file apt names, read once; files that could not be read are kept for the limitations. */
const sourcesFiles = (signal) => {
    const parsed = new Map();
    const unreadable = [];
    const incomplete = [];
    const read = async (file) => {
        const cached = parsed.get(file);
        if (cached !== undefined)
            return cached;
        const bytes = await readHostFile(file, FILE_MAX_BYTES, signal);
        if (bytes === "unreadable")
            unreadable.push(file);
        if (typeof bytes !== "string" && !isStrictUtf8(bytes))
            incomplete.push(file);
        const stanzas = typeof bytes === "string"
            ? []
            : (file.endsWith(".sources")
                ? parseDeb822Sources
                : parseOneLineSources)(bytes, file);
        parsed.set(file, stanzas);
        return stanzas;
    };
    return { read, unreadable, incomplete };
};
const fileNames = async (directory) => (await readdir(directory).catch(() => [])).sort();
/** The entry's Signed-By keyrings, or every key apt trusts for all repositories. */
const candidateKeys = async (entry, apt) => {
    if (entry.signedBy.length > 0)
        return entry.signedBy;
    return [
        ...(await fileNames(apt.trustedParts))
            .filter((name) => name.endsWith(".gpg") || name.endsWith(".asc"))
            .map((name) => join(apt.trustedParts, name)),
        apt.trusted,
    ];
};
/**
 * The index's signed release beside it in apt's lists folder: InRelease, or
 * Release.gpg with the Release it signs; null when no release representation
 * could be established because a check could not tell.
 */
const signedRelease = async (target) => {
    const prefix = join(dirname(target.filename), aptListFileName(target.baseUri));
    const inRelease = await hostFileKind(`${prefix}InRelease`);
    if (inRelease)
        return [`${prefix}InRelease`];
    // An InRelease that could not be probed does not rule out the detached pair,
    // so keep looking rather than losing a signature apt still holds. It also
    // rules out absence: only an InRelease known to be missing lets a missing
    // detached pair settle that apt holds no signed release here.
    const noSignedRelease = () => inRelease === false ? undefined : null;
    const signed = await hostFileKind(`${prefix}Release.gpg`);
    if (!signed && signed !== null)
        return noSignedRelease();
    const release = await hostFileKind(`${prefix}Release`);
    // A detached release needs both members, so a Release known to be absent
    // settles the pair even when Release.gpg could not be probed.
    if (release === false)
        return noSignedRelease();
    if (signed === null || release === null)
        return null;
    return [`${prefix}Release.gpg`, `${prefix}Release`];
};
/** Why a source's key could not be checked, or the release and candidate keys gpgv checks. */
const keyCheck = async (target, entry, context) => {
    if (target === undefined)
        return {
            reason: context.targets === undefined
                ? "apt-get indextargets did not list apt's indexes"
                : context.targets.incomplete
                    ? "apt-get indextargets contained unreadable UTF-8 and did not establish an index for this source"
                    : "apt-get indextargets lists no index with this source",
        };
    if (entry === undefined)
        return {
            reason: `no sources entry at ${target.sourcesFile}:${String(target.position)} configures it`,
        };
    const selectors = entry.signedBy.filter((value) => !value.startsWith("/"));
    if (selectors.length > 0)
        return {
            reason: `Signed-By selectors ${selectors.map((value) => JSON.stringify(value)).join(", ")} are not supported; REA cannot verify this repository's fingerprint restrictions, so no signing key is retained`,
        };
    const release = await signedRelease(target);
    if (release === null)
        return {
            reason: `apt's release files for it in ${dirname(target.filename)} could not be checked`,
        };
    if (release === undefined)
        return {
            reason: `apt holds no signed release file for it in ${dirname(target.filename)}`,
        };
    // apt trusts only the key an entry holds, never the keys it trusts for all repositories.
    if (entry.inlineKey !== null)
        return {
            release,
            candidates: { path: entry.file, bytes: Buffer.from(entry.inlineKey) },
        };
    const candidates = await candidateKeys(entry, context.apt);
    return candidates.length > MAX_CANDIDATE_KEYS
        ? { reason: `more than ${String(MAX_CANDIDATE_KEYS)} candidate keys` }
        : { release, candidates };
};
/** A repository's facts from apt's index target and the sources entry it names, before its key is checked. */
const repositoryBase = (source, target, entry) => ({
    source,
    sources_file: entry?.file ?? null,
    // When APT decoded credentials that the authored token did not delimit,
    // retaining that token could retain the encoded credentials.
    uri: target?.repoUriCredentialsRemoved === true && entry?.credentials !== true
        ? null
        : (entry?.uri ?? null),
    ...(target === undefined ? {} : { repo_uri: target.repoUri }),
    uri_credentials_removed: entry?.credentials === true || target?.repoUriCredentialsRemoved === true,
    suite: entry?.suite ?? null,
    ...(target === undefined ||
        entry === undefined ||
        entry.suite === aptIndexSourceSuite(target)
        ? {}
        : { repo_suite: aptIndexSourceSuite(target) }),
    components: [...(entry?.components ?? [])],
    ...(entry?.repoComponents === undefined
        ? {}
        : { repo_components: [...entry.repoComponents] }),
    architectures: [...(entry?.architectures ?? [])],
    release: target?.suite ?? target?.codename ?? null,
});
/** One vendor source with the entry apt read it from and the key gpgv verified its release with. */
const repositoryFacts = async (vendor, context) => {
    const target = context.targets?.entries.get(vendor.source);
    const entry = target === undefined
        ? undefined
        : entryForTarget(target, await context.sources(target.sourcesFile));
    const base = repositoryBase(vendor.source, target, entry);
    const unverified = (reason) => ({
        repository: { ...base, signing_key: null, signing_key_reason: reason },
        key: undefined,
    });
    const origin = vendor.origin ?? target?.origin ?? null;
    if (isUbuntuProRepository(origin, base.repo_uri ?? base.uri))
        return unverified(UBUNTU_PRO);
    const check = await keyCheck(target, entry, context);
    if ("reason" in check)
        return unverified(check.reason);
    const verified = await context.verify(check.candidates, check.release);
    if ("reason" in verified)
        return unverified(verified.reason);
    const { path, sha256, format, fingerprint } = verified;
    return {
        repository: { ...base, signing_key: { path, sha256, format, fingerprint } },
        key: verified,
    };
};
/**
 * The apt repositories other than Ubuntu's that list the installed version.
 * `apt-get indextargets` names each source's sources entry, release and
 * signed release file; the key is the one whose signature over that release
 * gpgv verified: the key the entry's Signed-By holds, its Signed-By keyrings,
 * or every key apt trusts.
 */
export const inspectAptRepositories = async (installed, host, signal) => {
    const vendor = installed.sources.flatMap((source, index) => {
        const origin = installed.origins?.[index] ?? null;
        return origin === "Ubuntu" ? [] : [{ source, origin }];
    });
    if (vendor.length === 0)
        return {
            repositories: [],
            keys: new Map(),
            indexTargets: new Map(),
            limitations: [],
        };
    const targets = await indexTargets(host.runQuery, signal, host.apt.configuredArchitecture);
    const files = sourcesFiles(signal);
    return withGpgvKeyCheck(host.runQuery, signal, async (check) => {
        const context = {
            apt: host.apt,
            targets,
            sources: files.read,
            verify: (candidates, release) => "bytes" in candidates
                ? check.heldVerifying(candidates, release)
                : check.firstVerifying(candidates, release),
        };
        const keys = new Map();
        const repositories = [];
        for (const source of vendor) {
            const facts = await repositoryFacts(source, context);
            repositories.push(facts.repository);
            if (facts.key !== undefined)
                keys.set(facts.key.sha256, facts.key.bytes);
        }
        return {
            repositories,
            keys,
            indexTargets: targets?.entries ?? new Map(),
            limitations: [
                ...files.unreadable.map((file) => `The apt sources file ${file} could not be read, so repositories it lists are not matched.`),
                ...files.incomplete.map((file) => `The apt sources file ${file} contains unreadable UTF-8. Any affected source entries were withheld.`),
                ...(targets?.incomplete !== true
                    ? []
                    : [
                        "apt-get indextargets contained unreadable UTF-8. Any affected index paragraphs were withheld.",
                    ]),
            ],
        };
    });
};
