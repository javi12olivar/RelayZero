import { AnalysisCapabilityUnavailableError } from "../../domain/analysisErrorCore.js";
import { ProviderSelectionError } from "../../domain/providerSelectionError.js";
import { err, ok } from "../../domain/result.js";
import { AnalysisProviderRegistry, } from "./AnalysisProviderRegistry.js";
import { CompositeProvider } from "./CompositeProvider.js";
/** Resolve one registry-selected deep provider and disjoint auxiliary families. */
export class SessionProviderRouter {
    registry;
    auxiliaryProviders;
    route;
    constructor(registry, auxiliaryProviders, route) {
        this.registry = registry;
        this.auxiliaryProviders = auxiliaryProviders;
        this.route = route;
    }
    /** Create selection-aware routing while keeping auxiliary families disjoint. */
    static selectable(registry, auxiliaryProviders) {
        const identities = [
            ...registry.identities(),
            ...auxiliaryProviders.map((provider) => provider.identity()),
        ];
        assertUniqueProviderIds(identities);
        const auxiliaryOperations = assertDisjoint(auxiliaryProviders);
        for (const operation of registry.declaredOperations())
            if (auxiliaryOperations.has(operation))
                throw new TypeError(`Deep and auxiliary providers both declare operation ${operation}`);
        const initialRoute = selectableRoute(auxiliaryProviders, undefined);
        return new SessionProviderRouter(registry, [...auxiliaryProviders], initialRoute);
    }
    /** Target-free routes and discovery metadata. */
    initialRoute() {
        return this.route;
    }
    /** Auxiliary-only router for target-selected operations that do not select a deep provider. */
    auxiliaryOnly() {
        return new SessionProviderRouter(new AnalysisProviderRegistry([]), this.auxiliaryProviders, this.route);
    }
    /** Close provider owners not represented by the currently bound client. */
    closeOwnedResources() {
        return this.registry.closeOwnedResources();
    }
    /** Report retained candidate cleanup without performing cleanup work. */
    hasPendingOwnedResources() {
        return this.registry.hasPendingOwnedResources();
    }
    /** Resolve target routes before any provider client is created. */
    async resolve(target, providerId, signal) {
        const resolutionOptions = signal === undefined ? undefined : { signal };
        const selected = await this.registry.select(target, providerId, resolutionOptions);
        return selected.ok
            ? ok(selectableRoute(this.auxiliaryProviders, selected.value))
            : selected;
    }
    /** Refresh only provider selections whose state can be published by close. */
    async refreshAfterRetirement(route, target, signal) {
        if (route.refreshAfterRetirement !== true || route.binding === null)
            return ok(route);
        const refreshed = await this.registry.select(target, route.binding.identity.id, signal === undefined ? {} : { signal });
        if (!refreshed.ok)
            return refreshed;
        return ok(selectableRoute(this.auxiliaryProviders, {
            ...refreshed.value,
            requestedProviderId: route.selection?.requestedProviderId ??
                refreshed.value.requestedProviderId,
            binding: refreshed.value.binding === null
                ? null
                : {
                    ...refreshed.value.binding,
                    selectionSource: route.binding.selectionSource,
                },
        }));
    }
    /** Preserve selection observations unless a caller requests a fresh inspection. */
    async candidateStatuses(route, options = {}) {
        const { signal, target, refresh = false } = options;
        const candidates = refresh && route.selection !== undefined
            ? await this.registry.candidates(target, signal === undefined ? {} : { signal })
            : (route.selection?.candidates ??
                (await this.registry.candidates(undefined, signal === undefined ? {} : { signal })));
        const binding = route.binding;
        if (binding === null)
            return candidates;
        return candidates.map((candidate) => {
            const selected = candidate.provider.id === binding.identity.id;
            return {
                ...candidate,
                selected,
                selectionSource: selected ? binding.selectionSource : null,
            };
        });
    }
    /** Produce exact candidate rejections for an intentionally unbound route. */
    unboundOperationError(operation, route) {
        if (route.binding !== null ||
            route.selection === undefined ||
            !this.registry.declaredOperations().includes(operation))
            return undefined;
        return this.registry.unboundOperationError(operation, route.selection);
    }
}
const selectableRoute = (auxiliaryProviders, selection) => {
    const binding = selection?.binding ?? null;
    const providers = [
        ...auxiliaryProviders,
        ...(binding === null ? [] : [binding.provider]),
    ];
    const provider = binding === null && providers.length === 1
        ? providers[0]
        : providers.length === 0
            ? undefined
            : new CompositeProvider(providers, binding?.createClient === undefined
                ? new Map()
                : new Map([[binding.identity.id, binding.createClient]]));
    const identity = provider?.identity() ?? emptyProviderIdentity();
    // The binding attributes deep-provider capabilities to the resolved version.
    const capabilities = capabilityMap([
        ...auxiliaryProviders.flatMap((auxiliary) => auxiliary.capabilities()),
        ...(binding?.capabilities ?? []),
    ]);
    return {
        identity,
        capabilities,
        profile: binding?.profile ?? null,
        ...(binding?.refreshAfterRetirement === undefined
            ? {}
            : { refreshAfterRetirement: binding.refreshAfterRetirement }),
        binding,
        selection,
        createClient: (target, context) => provider?.createClient(target, binding?.profile, context) ??
            emptyClient(identity),
    };
};
const emptyClient = (identity) => ({
    execute: (operation) => operation === "health"
        ? Promise.resolve(ok({
            result: null,
            rawResult: null,
            provider: identity,
            limitations: [],
            locations: [],
            subject: null,
        }))
        : Promise.resolve(err(new AnalysisCapabilityUnavailableError(identity.id, operation, "operation is not declared by this provider set"))),
    close: () => Promise.resolve(ok(null)),
});
const emptyProviderIdentity = () => ({
    id: "composite:none",
    name: "REA composite analysis provider",
    version: null,
});
const capabilityMap = (capabilities) => new Map(capabilities.map((descriptor) => [descriptor.operation, descriptor]));
const assertDisjoint = (providers) => {
    const routes = new Set();
    for (const provider of providers)
        for (const { operation } of provider.capabilities()) {
            if (routes.has(operation))
                throw new TypeError(`Multiple auxiliary providers declare operation ${operation}`);
            routes.add(operation);
        }
    return routes;
};
const assertUniqueProviderIds = (identities) => {
    const ids = new Set();
    for (const identity of identities) {
        if (ids.has(identity.id))
            throw new TypeError(`Duplicate configured provider ID: ${identity.id}`);
        ids.add(identity.id);
    }
};
