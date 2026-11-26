import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { equalJsonValues, init_isRecord, init_jsonValue, isRecord } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ellipsisExcerpt, init_exactJsonNumber, init_excerpt, parseExactJson } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { escapeJsonPointerToken, init_jsonPointer } from "./jsonPointer-aolC6MvJ.js";
import { compareOffsetDateTimeInstants, init_offsetDateTime, readRecordedStart } from "./nativeValueFlow-13oOEkkJ.js";
import { boundedList, init_boundedList } from "./boundedList-D6JdQAuV.js";
import { init_webNetworkRouteTemplates, readRecordedRequestLine, segmentRule } from "./featureTraceView-CDxdbO2M.js";
import { bulkCollectionOf, composedPartText, composedValue, decodedSegment, init_environmentManifestOrigin, init_environmentStatePaging, init_environmentStateRules, init_environmentStateWriteAddress, init_environmentStateWriteClockFormats, init_environmentStateWriteComposed, init_environmentStateWriteValues, init_recordedExchangeBody, isPagingParameter, isUuid, likeGeneratedInteger, matchesClockFormat, ownMember, primaryOrigin, readClock, readRecordedRequestBody, segmentsOf } from "./analysisViewResult-vDCF9Pxo.js";
import { init_recordedMediaType, isJsonLike, mediaTypeEssence } from "./recordedMediaType-ClPIrW1i.js";
import { init_environmentSource, inputError, parseCaptureEvidence, recordedExchange, replayedBody } from "./environmentSource-DB8Dg2zx.js";
import { EnvironmentStateStore, environmentToolArguments, init_environmentState, init_environmentStateStore, init_environmentTools, prepareServedState, servedCatalog } from "./environmentState-CB2jw8yQ.js";
import { environmentToolAnswer, init_environmentReplay, init_environmentToolAnswer, selectsRecordedLine } from "./environmentToolAnswer-Ddinc_N9.js";
import { z } from "zod";
import { fromJsonSchema } from "@modelcontextprotocol/server";

//#region dist/application/environment/environmentCompareIds.js
var ID_FIELD, isScalarId, IDENTITY_FIELD, IdMap, keyCandidates, pairing, pairElements, keyedByIds, keyedByLearnedIds, learnKeyedEntries, idPair, childPointer, learnAt, learnIds, translateScalarId, translateValue, translateBulkBody, environmentArguments, translatePath;
function init_environmentCompareIds() {
	return (init_environmentCompareIds = __esmMin((() => {
		init_jsonPointer();
		init_environmentStateWriteValues();
		ID_FIELD = /^(id|uuid|guid)$|(_id|Id|ID|_uuid|Uuid)$/u;
		isScalarId = (value) => typeof value === "string" && value !== "" || typeof value === "number" && Number.isFinite(value);
		IDENTITY_FIELD = /^(id|uuid|guid)$/u;
		IdMap = class {
			#toEnv = new Map();
			#toLive = new Map();
			#scoped = new Map();
			#envValues = new Set();
			#stateReferenceFields = new Map();
			#ambiguousEnvValues = new Set();
			#conflicts = 0;
			/**
			* Pair a live value with an environment value. The first pairing of either side wins; if a conflict includes an equal
			* pair, the accepted global destination is withheld from translation so raw equality cannot hide that conflict. A
			* collection keeps its own first pairing, including equal values. `size` counts usable non-identity translations.
			*/
			learn(live, env, scope, stateReferenceField) {
				const liveKey = String(live);
				const envKey = String(env);
				if (scope !== undefined && !this.#pairScoped(scope, liveKey, env, envKey)) return;
				if (scope !== undefined && liveKey === envKey) return;
				const known = this.#toEnv.get(liveKey);
				if (known !== undefined) {
					if (String(known) !== envKey) {
						this.#conflicts += 1;
						if (liveKey === envKey) this.#ambiguousEnvValues.add(String(known));
					} else if (stateReferenceField !== undefined) this.#noteStateReference(liveKey, stateReferenceField);
					return;
				}
				const knownLive = this.#toLive.get(envKey);
				if (knownLive !== undefined) {
					this.#conflicts += 1;
					if (String(knownLive) === envKey || liveKey === envKey) this.#ambiguousEnvValues.add(envKey);
					return;
				}
				this.#toEnv.set(liveKey, env);
				this.#toLive.set(envKey, live);
				this.#envValues.add(envKey);
				if (stateReferenceField !== undefined) this.#noteStateReference(liveKey, stateReferenceField);
			}
			/** Store one collection's pairing. False when it conflicts with a pairing that collection already kept. */
			#pairScoped(scope, liveKey, env, envKey) {
				const scoped = this.#scoped.get(scope) ?? new Map();
				const known = scoped.get(liveKey);
				if (known !== undefined) {
					if (String(known) !== envKey) this.#conflicts += 1;
					return false;
				}
				for (const value of scoped.values()) {
					if (String(value) === envKey) {
						this.#conflicts += 1;
						return false;
					}
				}
				scoped.set(liveKey, env);
				this.#scoped.set(scope, scoped);
				this.#envValues.add(envKey);
				return true;
			}
			/** The environment's value for a live one: the collection's own when a scope is given and it knows one, else the probe's. */
			env(live, scope) {
				const liveKey = String(live);
				const scoped = scope === undefined ? undefined : this.#scoped.get(scope)?.get(liveKey);
				if (scoped !== undefined) return scoped;
				const global = this.#toEnv.get(liveKey);
				return global !== undefined && !this.#ambiguousEnvValues.has(String(global)) ? global : undefined;
			}
			hasLive(value) {
				const key = String(value);
				return this.#toEnv.has(key) || [...this.#scoped.values()].some((scoped) => scoped.has(key));
			}
			hasEnv(value) {
				return this.#envValues.has(String(value));
			}
			#noteStateReference(value, field) {
				const fields = this.#stateReferenceFields.get(value) ?? new Set();
				fields.add(field);
				this.#stateReferenceFields.set(value, fields);
			}
			/** A non-identifier string field that learning proved is an id in environment state. */
			isStateReference(value, field) {
				return this.#stateReferenceFields.get(String(value))?.has(field) ?? false;
			}
			get size() {
				return [...this.#toEnv].filter(([live, env]) => live !== String(env) && !this.#ambiguousEnvValues.has(String(env))).length;
			}
			get conflicts() {
				return this.#conflicts;
			}
		};
		keyCandidates = (items) => {
			const candidates = new Set();
			const first = items[0];
			if (first === undefined) return candidates;
			for (const key of Object.keys(first)) {
				if (ID_FIELD.test(key)) continue;
				const values = items.map((item) => item[key]);
				if (values.every((value) => typeof value === "string" && value !== "") && new Set(values).size === values.length) candidates.add(key);
			}
			return candidates;
		};
		pairing = (live, env) => {
			const byPosition = (by) => ({
				pairs: Array.from({ length: Math.min(live.length, env.length) }, (_, index) => [index, index]),
				by
			});
			if (!live.every(isRecord) || !env.every(isRecord)) return byPosition("position");
			const liveItems = live;
			const envItems = env;
			const envKeys = keyCandidates(envItems);
			const shared = [...keyCandidates(liveItems)].filter((key) => envKeys.has(key));
			let best = [];
			for (const key of shared.sort()) {
				const envIndex = new Map(envItems.map((item, index) => [item[key], index]));
				const pairs = [];
				for (const [index, item] of liveItems.entries()) {
					const match = envIndex.get(item[key]);
					if (match !== undefined) pairs.push([index, match]);
				}
				if (pairs.length > best.length) best = pairs;
			}
			if (best.length > 0) return {
				pairs: best,
				by: "key"
			};
			return byPosition(shared.length > 0 ? "unmatched" : "position");
		};
		pairElements = (live, env) => pairing(live, env).pairs;
		keyedByIds = (entries) => entries.every(([key, value]) => /^\d+$/u.test(key) || isUuid(key) || isRecord(value) && Object.entries(value).some(([field, held]) => IDENTITY_FIELD.test(field) && isScalarId(held) && String(held) === key));
		keyedByLearnedIds = (live, env, map) => {
			const entries = Object.entries(live);
			if (!entries.some(([key]) => map.hasLive(key))) return false;
			return entries.some(([key]) => Object.hasOwn(env, key)) ? keyedByIds(entries) : entries.every(([, value]) => isRecord(value)) || keyedByIds(entries);
		};
		learnKeyedEntries = (live, env, context, own, at) => {
			const liveEntries = Object.entries(live);
			const envEntries = Object.entries(env);
			const shared = liveEntries.filter(([key]) => Object.hasOwn(env, key)).length;
			if (liveEntries.length === 0 || envEntries.length === 0 || shared === liveEntries.length || !liveEntries.every(([, value]) => isRecord(value)) || !envEntries.every(([, value]) => isRecord(value))) return false;
			const paired = pairing(liveEntries.map(([, value]) => value), envEntries.map(([, value]) => value));
			if (paired.by !== "key" || shared > 0 && (paired.pairs.length !== liveEntries.length || !keyedByIds(liveEntries) || !keyedByIds(envEntries))) return false;
			for (const [left, right] of paired.pairs) {
				const [liveKey, liveValue] = liveEntries[left];
				const [envKey, envValue] = envEntries[right];
				context.map.learn(liveKey, envKey, own ? context.scope : undefined);
				learnAt(liveValue, envValue, context, {
					at: childPointer(at, liveKey),
					own
				});
			}
			return true;
		};
		idPair = (key, value, other, heldIds) => isScalarId(value) && isScalarId(other) && (ID_FIELD.test(key) || typeof value === "string" && typeof other === "string" && heldIds.has(other)) ? [value, other] : undefined;
		childPointer = (at, key) => `${at}/${escapeJsonPointerToken(String(key))}`;
		learnAt = (live, env, context, place) => {
			if (Array.isArray(live) && Array.isArray(env)) {
				const paired = pairing(live, env);
				if (paired.by === "unmatched" || paired.by === "position" && live.length !== env.length) return;
				for (const [left, right] of paired.pairs) learnAt(live[left], env[right], context, {
					at: childPointer(place.at, left),
					own: place.at === context.entityAt
				});
				return;
			}
			if (!isRecord(live) || !isRecord(env)) {
				if (context.identity && place.at === context.entityAt && isScalarId(live) && isScalarId(env)) context.map.learn(live, env, context.scope);
				return;
			}
			const own = place.own || place.at === context.entityAt;
			if (learnKeyedEntries(live, env, context, own, place.at)) return;
			for (const [key, value] of Object.entries(live)) {
				if (!Object.hasOwn(env, key)) continue;
				const other = env[key];
				const pair = idPair(key, value, other, context.heldIds);
				if (pair !== undefined) {
					const stateReferenceField = !ID_FIELD.test(key) && typeof value === "string" && typeof other === "string" && context.heldIds.has(other);
					context.map.learn(...pair, own && IDENTITY_FIELD.test(key) ? context.scope : undefined, stateReferenceField ? key : undefined);
				} else learnAt(value, other, context, {
					at: childPointer(place.at, key),
					own: false
				});
			}
		};
		learnIds = (live, env, map, known) => learnAt(live, env, {
			map,
			heldIds: known.heldIds,
			scope: known.scope,
			entityAt: known.entityAt ?? "",
			identity: known.identity === true
		}, {
			at: "",
			own: false
		});
		translateScalarId = (value, map, scope) => {
			if (!isScalarId(value)) return value;
			const env = map.env(value, scope);
			if (env === undefined) return value;
			return typeof value === "string" ? String(env) : typeof env === "number" ? env : value;
		};
		translateValue = (value, map) => {
			if (Array.isArray(value)) return value.map((item) => translateValue(item, map));
			if (isRecord(value)) return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateValue(item, map)]));
			return translateScalarId(value, map);
		};
		translateBulkBody = (body, map, bulk) => {
			const { address, idField, scope } = bulk;
			const id = (value) => translateScalarId(value, map, scope);
			const entries = (value) => Array.isArray(value) ? value.map((entry) => address.by === "ids" ? id(entry) : isRecord(entry) && Object.hasOwn(entry, idField) ? {
				...translateValue(entry, map),
				[idField]: id(entry[idField])
			} : translateValue(entry, map)) : translateValue(value, map);
			if (address.member === null) return entries(body);
			return isRecord(body) ? Object.fromEntries(Object.entries(body).map(([key, value]) => [key, key === address.member ? entries(value) : translateValue(value, map)])) : translateValue(body, map);
		};
		environmentArguments = (call, map, bulk) => Object.fromEntries(Object.entries(call.args).map(([name, value]) => [name, call.pathArguments.includes(name) || call.pagingArguments.includes(name) ? value : bulk !== undefined && name === bulk.body ? translateBulkBody(value, map, bulk) : translateValue(value, map)]));
		translatePath = (path, map, scopeAt = () => undefined, literalAt = () => false) => path.split("/").map((segment, index) => {
			const position = index - 1;
			if (literalAt(position)) return segment;
			let decoded = segment;
			try {
				decoded = decodeURIComponent(segment);
			} catch {
				return segment;
			}
			const env = decoded === "" ? undefined : map.env(decoded, scopeAt(position));
			return env === undefined ? segment : encodeURIComponent(String(env));
		}).join("/");
	})))();
}

//#endregion
//#region dist/application/environment/environmentIdentifierListSurvivors.js
var identifierListKeys, completePairingByLiteral, conflictComponents, groupOf, fill, matchingGroups, fillComponent, residualGraph, source, sink, sparseForcedInversion, hasForcedIdentifierListInversion, recoverIdentifierListSurvivors;
function init_environmentIdentifierListSurvivors() {
	return (init_environmentIdentifierListSurvivors = __esmMin((() => {
		identifierListKeys = ({ literal, mapped }) => [literal, mapped].filter((key) => key !== undefined);
		completePairingByLiteral = (identities, available, survivors, liveIndices, limit) => {
			const literal = new Map();
			const occupied = new Set();
			for (const [left, right] of survivors) {
				const key = identities[left].literal;
				if (key !== undefined && available.has(key)) continue;
				literal.set(left, right);
				occupied.add(right);
			}
			const next = new Map();
			for (const left of liveIndices) {
				const key = identities[left].literal;
				if (key === undefined || literal.has(left)) continue;
				const candidates = available.get(key)?.indices ?? [];
				let index = next.get(key) ?? 0;
				while (index < candidates.length && occupied.has(candidates[index])) index++;
				const right = candidates[index];
				next.set(key, right === undefined ? index : index + 1);
				if (right === undefined) continue;
				literal.set(left, right);
				if (literal.size === limit) return literal;
			}
			return undefined;
		};
		conflictComponents = (identities, envIdentities, available, survivors, assigned) => {
			const parent = Int32Array.from(envIdentities, (_, index) => index);
			const rank = new Uint8Array(envIdentities.length);
			const find = (index) => {
				while (parent[index] !== index) {
					parent[index] = parent[parent[index]];
					index = parent[index];
				}
				return index;
			};
			const join = (one, two) => {
				const a = find(one);
				const b = find(two);
				if (a === b) return;
				if (rank[a] < rank[b]) parent[a] = b;
				else {
					parent[b] = a;
					if (rank[a] === rank[b]) rank[a] = rank[a] + 1;
				}
			};
			const first = (key) => key === undefined ? undefined : available.get(key)?.indices[0];
			for (const [index, { literal, mapped }] of envIdentities.entries()) join(index, first(mapped ?? literal));
			const liveAnchor = identities.map(({ literal, mapped }) => {
				const raw = first(literal);
				const learned = first(mapped);
				if (raw !== undefined && learned !== undefined) join(raw, learned);
				return raw ?? learned;
			});
			const freeEnv = new Set();
			for (const index of envIdentities.keys()) if (!assigned.has(index)) freeEnv.add(find(index));
			const components = new Map();
			for (const [index, anchor] of liveAnchor.entries()) {
				if (anchor === undefined || survivors.has(index)) continue;
				const root = find(anchor);
				if (freeEnv.has(root) && !components.has(root)) components.set(root, {
					live: [],
					env: []
				});
			}
			for (const [index, anchor] of liveAnchor.entries()) if (anchor !== undefined) components.get(find(anchor))?.live.push(index);
			for (const index of envIdentities.keys()) components.get(find(index))?.env.push(index);
			return components.values();
		};
		groupOf = (groups, key, index) => {
			let group = groups.get(key);
			if (group === undefined) {
				group = {
					indices: [],
					edges: [],
					free: 0,
					cursor: 0
				};
				groups.set(key, group);
			}
			group.indices.push(index);
			group.free++;
			return group;
		};
		fill = (start, blocked) => {
			const pending = [start];
			const from = new Map();
			const fromEnv = new Map();
			let end;
			for (const live of pending) {
				for (const edge of live.edges) {
					const env = edge.env;
					if (fromEnv.has(env)) continue;
					fromEnv.set(env, edge);
					if (env.free > 0) {
						end = edge;
						break;
					}
					for (const previous of env.edges) {
						const source = previous.live;
						if (previous.used === 0 || source === start || from.has(source) || blocked.has(source)) continue;
						from.set(source, previous);
						pending.push(source);
					}
				}
				if (end !== undefined) break;
			}
			if (end === undefined) {
				for (const group of pending) blocked.add(group);
				return false;
			}
			const path = [];
			let amount = Math.min(start.free, end.env.free);
			for (let add = end; add !== undefined;) {
				const remove = from.get(add.live);
				path.push({
					add,
					remove
				});
				if (remove !== undefined) amount = Math.min(amount, remove.used);
				add = remove === undefined ? undefined : fromEnv.get(remove.env);
			}
			start.free -= amount;
			end.env.free -= amount;
			for (const { add, remove } of path) {
				add.used += amount;
				if (remove !== undefined) remove.used -= amount;
			}
			blocked.clear();
			return true;
		};
		matchingGroups = (positions, identities, envIdentities, survivors) => {
			const liveGroups = new Map();
			const liveByIndex = new Map();
			for (const index of positions.live) {
				const { literal, mapped } = identities[index];
				liveByIndex.set(index, groupOf(liveGroups, JSON.stringify([literal, mapped]), index));
			}
			const envGroups = new Map();
			const envByKey = new Map();
			const envByIndex = new Map();
			for (const index of positions.env) {
				const identity = envIdentities[index];
				const group = groupOf(envGroups, identity.literal, index);
				envByIndex.set(index, group);
				if (group.indices.length === 1) for (const key of identifierListKeys(identity)) {
					const candidates = envByKey.get(key);
					if (candidates === undefined) envByKey.set(key, [group]);
					else candidates.push(group);
				}
			}
			for (const live of liveGroups.values()) {
				const identity = identities[live.indices[0]];
				const candidates = new Set(identifierListKeys(identity).flatMap((key) => envByKey.get(key) ?? []));
				for (const env of candidates) {
					const edge = {
						live,
						env,
						used: 0
					};
					live.edges.push(edge);
					env.edges.push(edge);
				}
			}
			const matchEdge = (left, right) => liveByIndex.get(left).edges.find((edge) => edge.env === envByIndex.get(right));
			for (const [left, right] of survivors) {
				const edge = matchEdge(left, right);
				edge.used++;
				edge.live.free--;
				edge.env.free--;
			}
			return {
				liveGroups,
				envGroups,
				matchEdge
			};
		};
		fillComponent = (component, identities, envIdentities, survivors, assigned) => {
			const { liveGroups, matchEdge } = matchingGroups(component, identities, envIdentities, survivors);
			const blocked = new Set();
			let changed = false;
			for (const group of liveGroups.values()) while (group.free > 0 && !blocked.has(group) && fill(group, blocked)) changed = true;
			if (!changed) return;
			for (const [left, right] of survivors) {
				const edge = matchEdge(left, right);
				if (edge.used > 0) edge.used--;
				else {
					survivors.delete(left);
					assigned.delete(right);
				}
			}
			for (const live of liveGroups.values()) for (const { env, used } of live.edges) for (let index = 0; index < used; index++) {
				while (survivors.has(live.indices[live.cursor])) live.cursor++;
				while (assigned.has(env.indices[env.cursor])) env.cursor++;
				const left = live.indices[live.cursor++];
				const right = env.indices[env.cursor++];
				survivors.set(left, right);
				assigned.add(right);
			}
		};
		residualGraph = (vertices, edgeLimit) => {
			const forward = new Int32Array(vertices).fill(-1);
			const reverse = new Int32Array(vertices).fill(-1);
			const nextForward = new Int32Array(edgeLimit);
			const nextReverse = new Int32Array(edgeLimit);
			const origins = new Int32Array(edgeLimit);
			const destinations = new Int32Array(edgeLimit);
			let count = 0;
			const components = () => {
				const visited = new Uint8Array(vertices);
				const cursor = forward.slice();
				const finish = new Int32Array(vertices);
				const pending = [];
				let finished = 0;
				for (let start = 0; start < vertices; start++) {
					if (visited[start] !== 0) continue;
					pending.push(start);
					visited[start] = 1;
					while (pending.length > 0) {
						const vertex = pending.at(-1);
						const edge = cursor[vertex];
						if (edge === -1) {
							finish[finished++] = vertex;
							pending.pop();
							continue;
						}
						cursor[vertex] = nextForward[edge];
						const neighbor = destinations[edge];
						if (visited[neighbor] !== 0) continue;
						visited[neighbor] = 1;
						pending.push(neighbor);
					}
				}
				const component = new Int32Array(vertices).fill(-1);
				for (let index = finished - 1; index >= 0; index--) {
					const start = finish[index];
					if (component[start] !== -1) continue;
					pending.push(start);
					component[start] = start;
					while (pending.length > 0) {
						const vertex = pending.pop();
						for (let edge = reverse[vertex]; edge !== -1; edge = nextReverse[edge]) {
							const neighbor = origins[edge];
							if (component[neighbor] !== -1) continue;
							component[neighbor] = start;
							pending.push(neighbor);
						}
					}
				}
				return component;
			};
			return {
				connect(from, to) {
					origins[count] = from;
					destinations[count] = to;
					nextForward[count] = forward[from];
					nextReverse[count] = reverse[to];
					forward[from] = count;
					reverse[to] = count++;
				},
				components
			};
		};
		source = 0;
		sink = 1;
		sparseForcedInversion = (identities, envCount, available, survivors, assigned) => {
			const envStart = identities.length + 2;
			const graph = residualGraph(envStart + envCount, identities.length * 5 + envCount);
			for (const [left, identity] of identities.entries()) {
				const live = left + 2;
				const matched = survivors.get(left);
				if (matched === undefined) graph.connect(source, live);
				else graph.connect(live, source);
				for (const key of identifierListKeys(identity)) for (const right of available.get(key)?.indices ?? []) {
					const env = envStart + right;
					if (right === matched) graph.connect(env, live);
					else graph.connect(live, env);
				}
			}
			for (let right = 0; right < envCount; right++) {
				const env = envStart + right;
				if (assigned.has(right)) graph.connect(sink, env);
				else graph.connect(env, sink);
			}
			const component = graph.components();
			let last = -1;
			for (const left of identities.keys()) {
				const right = survivors.get(left);
				if (right === undefined || component[left + 2] === component[envStart + right]) continue;
				if (right < last) return true;
				last = right;
			}
			return false;
		};
		hasForcedIdentifierListInversion = (identities, envIdentities, available, survivors, assigned) => {
			if ([...available.values()].every(({ indices }) => indices.length <= 2)) return sparseForcedInversion(identities, envIdentities.length, available, survivors, assigned);
			const { liveGroups, envGroups, matchEdge } = matchingGroups({
				live: identities.keys(),
				env: envIdentities.keys()
			}, identities, envIdentities, survivors);
			const groups = [...liveGroups.values(), ...envGroups.values()];
			const index = new Map(groups.map((group, position) => [group, position + 2]));
			let edgeLimit = groups.length * 2;
			for (const group of liveGroups.values()) edgeLimit += group.edges.length * 2;
			const graph = residualGraph(groups.length + 2, edgeLimit);
			for (const group of liveGroups.values()) {
				const live = index.get(group);
				if (group.free > 0) graph.connect(source, live);
				if (group.free < group.indices.length) graph.connect(live, source);
				for (const { env, used } of group.edges) {
					const right = index.get(env);
					if (used < Math.min(group.indices.length, env.indices.length)) graph.connect(live, right);
					if (used > 0) graph.connect(right, live);
				}
			}
			for (const group of envGroups.values()) {
				const env = index.get(group);
				if (group.free > 0) graph.connect(env, sink);
				if (group.free < group.indices.length) graph.connect(sink, env);
			}
			const component = graph.components();
			let last = -1;
			for (const left of identities.keys()) {
				const right = survivors.get(left);
				if (right === undefined) continue;
				const { live, env } = matchEdge(left, right);
				if (live.indices.length !== 1 || env.indices.length !== 1) continue;
				if (component[index.get(live)] === component[index.get(env)]) continue;
				if (right < last) return true;
				last = right;
			}
			return false;
		};
		recoverIdentifierListSurvivors = (identities, envIdentities, available, survivors, assigned) => {
			for (const component of conflictComponents(identities, envIdentities, available, survivors, assigned)) {
				const local = new Map();
				for (const left of component.live) {
					const right = survivors.get(left);
					if (right !== undefined) local.set(left, right);
				}
				const limit = Math.min(component.live.length, component.env.length);
				const literal = completePairingByLiteral(identities, available, local, component.live, limit);
				const recovered = literal ?? local;
				if (literal === undefined) fillComponent(component, identities, envIdentities, recovered, new Set(local.values()));
				for (const left of component.live) {
					const right = survivors.get(left);
					if (right === undefined) continue;
					survivors.delete(left);
					assigned.delete(right);
				}
				for (const [left, right] of recovered) {
					survivors.set(left, right);
					assigned.add(right);
				}
			}
		};
	})))();
}

//#endregion
//#region dist/application/environment/environmentCompareListIds.js
var ID_LIST_FIELD, scalar, literalKey, identityKey, environmentIdentity, compareIdentifierList;
function init_environmentCompareListIds() {
	return (init_environmentCompareListIds = __esmMin((() => {
		init_environmentIdentifierListSurvivors();
		ID_LIST_FIELD = /^(ids|uuids|guids)$/u;
		scalar = (value) => value === null || typeof value !== "object";
		literalKey = (value) => `literal:${JSON.stringify(value)}`;
		identityKey = (value) => `id:${value}`;
		environmentIdentity = (value) => ({
			literal: literalKey(value),
			mapped: typeof value === "number" || typeof value === "string" ? identityKey(value) : undefined
		});
		compareIdentifierList = (live, env, field, map, ownedScope) => {
			if (field === undefined) return undefined;
			const named = ID_LIST_FIELD.test(field);
			if (!named && !live.some((value) => typeof value === "string" && map.isStateReference(value, field)) || !live.every(scalar) || !env.every(scalar)) return undefined;
			const scope = named ? ownedScope : undefined;
			const hasMapping = new Set();
			const identities = live.map((value, index) => {
				const id = (typeof value === "number" || typeof value === "string") && named || typeof value === "string" && map.isStateReference(value, field);
				const mapped = id ? map.env(value, scope) : undefined;
				if (mapped !== undefined) hasMapping.add(index);
				return {
					literal: scope !== undefined && mapped !== undefined && String(mapped) !== String(value) ? undefined : literalKey(value),
					mapped: mapped === undefined ? undefined : identityKey(mapped)
				};
			});
			if (!named && hasMapping.size === 0) return undefined;
			let survivors = new Map();
			let assigned = new Set();
			const replacements = new Map();
			const envIdentities = env.map(environmentIdentity);
			if (live.length === env.length && identities.every(({ literal, mapped }, index) => literal !== undefined && literal === envIdentities[index].literal || mapped !== undefined && mapped === envIdentities[index].mapped)) {
				for (const index of live.keys()) survivors.set(index, index);
				return {
					survivors,
					replacements,
					hasMapping,
					reordered: false
				};
			}
			const available = new Map();
			for (const [index, identity] of envIdentities.entries()) for (const key of identifierListKeys(identity)) {
				const bucket = available.get(key);
				if (bucket === undefined) available.set(key, {
					indices: [index],
					next: 0
				});
				else bucket.indices.push(index);
			}
			const pair = (left, key) => {
				if (key === undefined || survivors.has(left)) return;
				const bucket = available.get(key);
				if (bucket === undefined) return;
				while (bucket.next < bucket.indices.length) {
					const right = bucket.indices[bucket.next++];
					if (assigned.has(right)) continue;
					survivors.set(left, right);
					assigned.add(right);
					return;
				}
			};
			for (const [index, { mapped, literal }] of identities.entries()) if (mapped === undefined) pair(index, literal);
			for (const [index, { mapped }] of identities.entries()) pair(index, mapped);
			for (const [index, { literal }] of identities.entries()) pair(index, literal);
			const upperBound = Math.min(live.length, env.length);
			if (survivors.size < upperBound && identities.some((identity, index) => !survivors.has(index) && identifierListKeys(identity).some((key) => available.has(key)))) {
				const literal = completePairingByLiteral(identities, available, survivors, identities.keys(), upperBound);
				if (literal === undefined) recoverIdentifierListSurvivors(identities, envIdentities, available, survivors, assigned);
				else {
					survivors = literal;
					assigned = new Set(literal.values());
				}
			}
			if (live.length === env.length && survivors.size === live.length) return {
				survivors,
				replacements,
				hasMapping,
				reordered: true
			};
			const occurrences = new Map();
			for (const identity of identities) for (const key of identifierListKeys(identity)) occurrences.set(key, (occurrences.get(key) ?? 0) + 1);
			let replacement = 0;
			let last = -1;
			let furthest = -1;
			let possibleInversion = false;
			let reordered = false;
			for (const [index, identity] of identities.entries()) {
				const right = survivors.get(index);
				if (right === undefined) {
					while (assigned.has(replacement)) replacement++;
					if (replacement < env.length) replacements.set(index, replacement++);
					continue;
				}
				if (available.get(envIdentities[right].literal).indices.length === 1) {
					possibleInversion ||= right < furthest;
					furthest = Math.max(furthest, right);
				}
				if (identifierListKeys(identity).some((key) => available.get(key)?.indices.some((candidate) => candidate !== right)) || identifierListKeys(envIdentities[right]).some((key) => (occurrences.get(key) ?? 0) > Number(key === identity.literal || key === identity.mapped))) continue;
				reordered ||= right < last;
				last = right;
			}
			if (!reordered && possibleInversion) reordered = hasForcedIdentifierListInversion(identities, envIdentities, available, survivors, assigned);
			return {
				survivors,
				replacements,
				hasMapping,
				reordered
			};
		};
	})))();
}

//#endregion
//#region dist/application/environment/environmentCompareDiff.js
var DIFFERENCE_CATEGORIES, STEP_DIFFERENCE_LIMIT, VALUE_CHARS, TIME_FIELD, TIME_FIELD_CAMEL, shown, formatKey, clockReading, characterClasses, generatedPair, Differ, compareAnswers;
function init_environmentCompareDiff() {
	return (init_environmentCompareDiff = __esmMin((() => {
		init_excerpt();
		init_jsonPointer();
		init_environmentStateWriteClockFormats();
		init_environmentStateWriteComposed();
		init_environmentStateWriteValues();
		init_environmentCompareIds();
		init_environmentCompareListIds();
		DIFFERENCE_CATEGORIES = [
			"status",
			"missing-field",
			"extra-field",
			"value",
			"length",
			"order",
			"clock-format",
			"refused",
			"not-served",
			"no-tool",
			"unmapped-id"
		];
		STEP_DIFFERENCE_LIMIT = 20;
		VALUE_CHARS = 120;
		TIME_FIELD = /(?:^|[_-])(?:at|time|date|timestamp|created|updated|modified)$/iu;
		TIME_FIELD_CAMEL = /(?:At|Time|Date|Timestamp|Created|Updated|Modified)$/u;
		shown = (value) => {
			const text = value === undefined ? "<absent>" : JSON.stringify(value);
			return ellipsisExcerpt(text, VALUE_CHARS);
		};
		formatKey = (format) => format.kind === "epoch" ? `epoch-${format.unit}` : `iso${format.separator}${String(format.fraction)}${format.zone === "" ? "" : format.zone === "Z" ? "Z" : "offset"}`;
		clockReading = (value, key) => {
			if (typeof value === "number" && (key === undefined || !TIME_FIELD.test(key) && !TIME_FIELD_CAMEL.test(key))) return undefined;
			return readClock(value);
		};
		characterClasses = (text) => [...new Set(text.replaceAll(/\d/gu, "0").replaceAll(/[a-z]/gu, "a").replaceAll(/[A-Z]/gu, "A"))].sort().join("");
		generatedPair = (live, env, generation) => {
			if (generation === undefined) return false;
			const { rule, pointer } = generation;
			if (rule.rule === "unique" && pointer === "" && likeGeneratedInteger(live, env)) return true;
			if (typeof live !== "string" || typeof env !== "string") return false;
			if (rule.rule === "renewed") return rule.pointers.includes(pointer) && isUuid(live) && isUuid(env);
			if (pointer !== "") return false;
			if (rule.rule === "unique" || rule.rule === "identity" && rule.generator === "uuid") return isUuid(live) && isUuid(env);
			if (rule.rule !== "sequence" && rule.rule !== "identity") return false;
			return live.length === env.length && live.length >= 8 && /\d/u.test(live) && /\d/u.test(env) && characterClasses(live) === characterClasses(env);
		};
		Differ = class {
			map;
			entity;
			#rules;
			#composedRules;
			#generatedToEnv = new Map();
			#generatedToLive = new Map();
			differences = [];
			normalised = {
				ids: 0,
				clocks: 0,
				generated: 0,
				large_bodies: 0,
				unobserved_bodies: 0
			};
			/** The answer's own entities: where they sit (the object, or the array of them, at `at`) and the collection the call names, whose own mapping their identities compare by. `identity` marks a write that answers with only the new id, at `at`. */
			constructor(map, entity) {
				this.map = map;
				this.entity = entity;
				this.#rules = new Map(entity.rules.map((rule) => [rule.field, rule]));
				this.#composedRules = entity.rules.filter((rule) => rule.rule === "composed");
			}
			add(difference) {
				this.differences.push(difference);
			}
			/** One answer's generated identities must rename consistently in both directions. */
			#pairGenerated(live, env, rule) {
				const uuid = rule.rule === "unique" || rule.rule === "renewed" || rule.rule === "identity" && rule.generator === "uuid";
				const identity = (value) => typeof value === "number" ? `number:${String(value)}` : uuid ? `uuid:${value.toLowerCase()}` : `string:${value}`;
				const liveKey = identity(live);
				const envKey = identity(env);
				const knownEnv = this.#generatedToEnv.get(liveKey);
				const knownLive = this.#generatedToLive.get(envKey);
				if (knownEnv !== undefined && knownEnv !== envKey || knownLive !== undefined && knownLive !== liveKey) return false;
				this.#generatedToEnv.set(liveKey, envKey);
				this.#generatedToLive.set(envKey, liveKey);
				return true;
			}
			/** Whether a value compares within the call's collection, as an entity's own identity or a create's bare id does; other ids compare by the probe's mapping. */
			#inCollection(pointer, at) {
				return this.entity.identity && pointer === this.entity.at || at.own === true && at.key !== undefined && IDENTITY_FIELD.test(at.key);
			}
			/** Whether an identity both sides hold verbatim is one its collection's mapping gives to another environment entity; a reference's collection is unknown, so it is not judged. */
			#reassigned(value, pointer, at) {
				if (typeof value !== "string" && typeof value !== "number") return false;
				if (!this.#inCollection(pointer, at)) return false;
				const mapped = this.map.env(value, this.entity.scope);
				return mapped !== undefined && String(mapped) !== String(value);
			}
			scalar(live, env, pointer, at = {}, generation) {
				const key = at.clockKey ?? at.key;
				const liveClock = clockReading(live, key);
				const envClock = clockReading(env, key);
				const generatedMatch = generation !== undefined && (typeof live === "string" || typeof live === "number") && (typeof env === "string" || typeof env === "number") && liveClock === undefined && envClock === undefined && !this.map.hasLive(live) && !this.map.hasEnv(env) && generatedPair(live, env, generation) ? this.#pairGenerated(live, env, generation.rule) : undefined;
				if (live === env) {
					if (generatedMatch === false || this.#reassigned(live, pointer, at)) this.add({
						category: "value",
						pointer,
						live: shown(live),
						env: shown(env)
					});
					return;
				}
				const field = at.key;
				if ((typeof live === "string" || typeof live === "number") && (typeof env === "string" || typeof env === "number")) {
					const mapsAsId = field !== undefined && ID_FIELD.test(field) || this.#inCollection(pointer, at) || typeof live === "string" && field !== undefined && this.map.isStateReference(live, field);
					const mapped = mapsAsId ? this.map.env(live, this.#inCollection(pointer, at) ? this.entity.scope : undefined) : undefined;
					if (mapped !== undefined && String(mapped) === String(env)) {
						this.normalised.ids += 1;
						return;
					}
					if (liveClock !== undefined && envClock !== undefined) {
						const rule = generation?.pointer === "" ? generation.rule : undefined;
						const format = rule?.rule === "clock" || rule?.rule === "held-clock" ? rule.format : undefined;
						const matches = format?.kind === "iso" && format.trimmed === true ? matchesClockFormat(format, liveClock) && matchesClockFormat(format, envClock) : formatKey(liveClock.format) === formatKey(envClock.format);
						if (matches) this.normalised.clocks += 1;
						else this.add({
							category: "clock-format",
							pointer,
							live: shown(live),
							env: shown(env)
						});
						return;
					}
					if (generatedMatch === true) {
						this.normalised.generated += 1;
						return;
					}
				}
				this.add({
					category: "value",
					pointer,
					live: shown(live),
					env: shown(env)
				});
			}
			array(live, env, pointer, at, generation) {
				const own = pointer === this.entity.at;
				const clockKey = at.clockKey ?? at.key;
				const ids = compareIdentifierList(live, env, at.key, this.map, own || at.own === true ? this.entity.scope : undefined);
				if (ids === undefined && this.sameItems(live, env, pointer)) {
					if (generation !== undefined) for (const [index, item] of live.entries()) this.scalar(item, item, `${pointer}/${String(index)}`, {
						own,
						clockKey
					}, {
						...generation,
						pointer: `${generation.pointer}/*`
					});
					return;
				}
				const pairs = ids === undefined ? pairElements(live, env) : live.flatMap((_, index) => {
					const right = ids.survivors.get(index) ?? ids.replacements.get(index);
					return right === undefined ? [] : [[index, right]];
				});
				if (live.length !== env.length || pairs.length !== live.length) this.add({
					category: "length",
					pointer,
					live: `${String(live.length)} items`,
					env: `${String(env.length)} items (${String(pairs.length)} paired)`
				});
				const envOrder = pairs.map(([, right]) => right);
				if (ids?.reordered ?? envOrder.some((right, index) => index > 0 && right < envOrder[index - 1])) this.add({
					category: "order",
					pointer
				});
				for (const [left, right] of pairs) {
					const liveValue = live[left];
					const envValue = env[right];
					const atItem = `${pointer}/${String(left)}`;
					if (ids?.survivors.has(left) && liveValue !== envValue) {
						this.normalised.ids += 1;
						continue;
					}
					if (ids?.replacements.has(left) && ids.hasMapping.has(left)) {
						this.add({
							category: "value",
							pointer: atItem,
							live: shown(liveValue),
							env: shown(envValue)
						});
						continue;
					}
					this.value(liveValue, envValue, atItem, {
						own,
						clockKey
					}, generation === undefined ? undefined : {
						...generation,
						pointer: `${generation.pointer}/*`
					});
				}
			}
			/** Arrays of scalars holding the same items in another order differ only in order, as sets an application returns unordered do. */
			sameItems(live, env, pointer) {
				const scalar = (item) => item === null || typeof item !== "object";
				if (live.length !== env.length || !live.every(scalar) || !env.every(scalar)) return false;
				const key = (items) => JSON.stringify(items.map((item) => JSON.stringify(item)).sort());
				if (key(live) !== key(env)) return false;
				if (JSON.stringify(live) !== JSON.stringify(env)) this.add({
					category: "order",
					pointer
				});
				return true;
			}
			object(live, env, pointer, own = false, generation) {
				const self = own || pointer === this.entity.at;
				const keyed = keyedByLearnedIds(live, env, this.map);
				const envKey = (key) => {
					const mapped = keyed ? this.map.env(key, self ? this.entity.scope : undefined) : undefined;
					return mapped !== undefined && Object.hasOwn(env, String(mapped)) ? String(mapped) : key;
				};
				const matched = new Set();
				const composed = self && this.#composedRules.length > 0 ? {
					agreed: new Set(),
					fields: new Map()
				} : undefined;
				for (const [key, value] of Object.entries(live)) {
					const child = `${pointer}/${escapeJsonPointerToken(key)}`;
					const other = envKey(key);
					if (!Object.hasOwn(env, other) || matched.has(other)) this.add({
						category: "missing-field",
						pointer: child,
						live: shown(value)
					});
					else {
						matched.add(other);
						const rule = self ? this.#rules.get(key) : undefined;
						if (rule?.rule === "composed" && composed !== undefined) {
							composed.fields.set(key, other);
							continue;
						}
						const before = this.differences.length;
						this.value(value, env[other], child, {
							key,
							own: self,
							keyed: self && keyed
						}, rule !== undefined ? {
							rule,
							pointer: ""
						} : generation === undefined ? undefined : {
							...generation,
							pointer: `${generation.pointer}/${escapeJsonPointerToken(key)}`
						});
						if (this.differences.length === before) composed?.agreed.add(key);
					}
				}
				if (composed !== undefined) {
					for (const rule of this.#composedRules) {
						const other = composed.fields.get(rule.field);
						if (other === undefined) continue;
						const coherent = composedValue(rule.parts, live) === live[rule.field] && composedValue(rule.parts, env) === env[other];
						if (coherent && rule.parts.every((part) => !("from" in part) || composed.agreed.has(part.from) || composedPartText(part, live) === composedPartText(part, env))) {
							composed.agreed.add(rule.field);
							if (live[rule.field] !== env[other]) this.normalised.generated += 1;
						} else this.add({
							category: "value",
							pointer: `${pointer}/${escapeJsonPointerToken(rule.field)}`,
							live: shown(live[rule.field]),
							env: shown(env[other])
						});
					}
				}
				for (const [key, value] of Object.entries(env)) if (!matched.has(key)) this.add({
					category: "extra-field",
					pointer: `${pointer}/${escapeJsonPointerToken(key)}`,
					env: shown(value)
				});
			}
			/** `own` marks an item of the entity array, or with `key` a field of an own entity; a field's own children are not. */
			value(live, env, pointer, at = {}, generation) {
				if (Array.isArray(live) && Array.isArray(env)) this.array(live, env, pointer, at, generation);
				else if (isRecord(live) && isRecord(env)) this.object(live, env, pointer, at.own === true && (at.key === undefined || at.keyed === true), generation);
				else if (Array.isArray(live) || Array.isArray(env) || isRecord(live) || isRecord(env)) this.add({
					category: "value",
					pointer,
					live: shown(live),
					env: shown(env)
				});
				else this.scalar(live, env, pointer, at, generation);
			}
		};
		compareAnswers = (live, env, map, entity = {}) => {
			const differ = new Differ(map, {
				scope: entity.scope,
				at: entity.at ?? "",
				identity: entity.identity === true,
				rules: entity.rules ?? []
			});
			if (live.status !== env.status) differ.add({
				category: "status",
				pointer: "",
				live: String(live.status),
				env: String(env.status)
			});
			if (live.body.kind === "cut" || live.body.kind === "base64" && !live.body.whole) differ.normalised.large_bodies += 1;
			else if (live.unobserved === true) differ.normalised.unobserved_bodies += 1;
			else if (live.body.kind === "none" && env.body.kind === "json" && env.body.value === null || env.body.kind === "none" && live.body.kind === "json" && live.body.value === null) {} else if (live.body.kind === "base64" || env.body.kind === "base64") {
				const bytes = (body) => {
					if (body.kind === "base64") return Buffer.from(body.encoded, "base64");
					if (body.kind === "text") return Buffer.from(body.text, "utf8");
					return undefined;
				};
				const liveBytes = bytes(live.body);
				const envBytes = bytes(env.body);
				if (liveBytes === undefined || envBytes === undefined || !liveBytes.equals(envBytes)) differ.add({
					category: "value",
					pointer: "",
					live: shown(live.body),
					env: shown(env.body)
				});
			} else if (live.body.kind !== env.body.kind) differ.add({
				category: "value",
				pointer: "",
				live: shown(live.body),
				env: shown(env.body)
			});
			else if (live.body.kind === "json" && env.body.kind === "json") differ.value(live.body.value, env.body.value, "");
			else if (live.body.kind === "text" && env.body.kind === "text") differ.value(live.body.text, env.body.text, "");
			return {
				differences: differ.differences,
				normalised: differ.normalised
			};
		};
	})))();
}

//#endregion
//#region dist/application/environment/environmentCompareMatch.js
var FORMAT_RULES, collectionAt, collectionScope, bulkIds, parameterScopes, literalPositions, fitOf, probeArguments, bodyTools, matchProbeRequest;
function init_environmentCompareMatch() {
	return (init_environmentCompareMatch = __esmMin((() => {
		init_environmentStateRules();
		init_environmentStateWriteAddress();
		init_environmentStatePaging();
		init_webNetworkRouteTemplates();
		init_environmentTools();
		FORMAT_RULES = new Set([
			"numeric",
			"uuid",
			"hex",
			"iso-date"
		]);
		collectionAt = (tool, end, segments) => {
			const params = new Set(tool.params.map((param) => param.index));
			return `/${segmentsOf(tool.path_template).slice(0, end).map((segment, index) => {
				if (!params.has(index)) return segment;
				const value = segments?.[index];
				return value === undefined || value === "" ? "{}" : encodeURIComponent(decodedSegment(value));
			}).join("/")}`;
		};
		collectionScope = (tool, segments) => {
			const length = segmentsOf(tool.path_template).length;
			return collectionAt(tool, tool.params.some((param) => param.index === length - 1) ? length - 1 : length, segments);
		};
		bulkIds = (run, call, segments) => {
			const plan = run.store?.state.writes.get(call.tool.name);
			const target = plan?.target ?? null;
			const address = plan?.address;
			const body = probeArguments(call.tool, run.bodies).body;
			if (target === null || address === undefined || address.by === "action" || body === undefined) return undefined;
			const scope = collectionAt(call.tool, segmentsOf(target).length, segments);
			return {
				body,
				address,
				idField: run.store?.type(target)?.id_field ?? "",
				scope: `/${bulkCollectionOf(target, scope.slice(1).split("/"), (text) => text).join("/")}`
			};
		};
		parameterScopes = (tool, segments) => new Map(tool.params.map((param) => [param.index, collectionAt(tool, param.index, segments)]));
		literalPositions = (tool) => {
			const params = new Set(tool.params.map((param) => param.index));
			return new Set(tool.path_template.slice(1).split("/").flatMap((_, index) => params.has(index) ? [] : [index]));
		};
		fitOf = (tool, segments) => {
			const template = tool.path_template.slice(1).split("/");
			if (template.length !== segments.length) return undefined;
			const params = new Map(tool.params.map((param) => [param.index, param]));
			let literals = 0;
			for (const [index, part] of template.entries()) {
				const segment = segments[index];
				const param = params.get(index);
				if (param === undefined) {
					if (part !== segment && part !== decodedSegment(segment)) return undefined;
					literals += 1;
				} else if (FORMAT_RULES.has(param.rule) && segmentRule(decodedSegment(segment)) !== param.rule) return undefined;
				else if (segment === "") return undefined;
			}
			return {
				tool,
				literals
			};
		};
		probeArguments = (tool, bodies) => environmentToolArguments(tool, bodies.has(tool.name) ? true : undefined);
		bodyTools = (definitions) => new Set(definitions.flatMap((definition) => Object.hasOwn(definition.inputSchema.properties, environmentToolArguments(definition.tool, true).body) ? [definition.name] : []));
		matchProbeRequest = (manifest, request, bodies = new Set()) => {
			const segments = request.path.slice(1).split("/");
			let best;
			for (const tool of manifest.tools) {
				if (tool.method !== request.method) continue;
				const fit = fitOf(tool, segments);
				if (fit !== undefined && (best === undefined || fit.literals > best.literals)) best = fit;
			}
			if (best === undefined) return undefined;
			const { tool } = best;
			const names = probeArguments(tool, bodies);
			const args = new Map();
			const pathArguments = [];
			for (const param of tool.params) {
				const name = names.path.get(param.name) ?? param.name;
				args.set(name, segments[param.index]);
				pathArguments.push(name);
			}
			const ignoredQuery = [];
			const pagingArguments = [];
			const queryValues = new Map();
			if (request.query !== null) for (const [key, value] of new URLSearchParams(request.query.slice(1))) {
				const name = names.query.get(key);
				if (name === undefined) ignoredQuery.push(key);
				else {
					const values = queryValues.get(name) ?? [];
					values.push(value);
					queryValues.set(name, values);
					if (isPagingParameter(key)) pagingArguments.push(name);
				}
			}
			for (const [name, values] of queryValues) args.set(name, values.length === 1 ? values[0] : values);
			if (names.body !== undefined && request.body !== undefined) args.set(names.body, request.body);
			return {
				tool,
				args: Object.fromEntries(args),
				pathArguments,
				pagingArguments,
				ignoredQuery,
				observedQuery: request.query
			};
		};
	})))();
}

//#endregion
//#region dist/application/environment/environmentCompareProbe.js
var BODYLESS_STATUSES, startedSchema, startedInstant, requestBody, liveAnswer, probeOrigin, probeRequests;
function init_environmentCompareProbe() {
	return (init_environmentCompareProbe = __esmMin((() => {
		init_recordedExchangeBody();
		init_recordedMediaType();
		init_environmentManifestOrigin();
		init_webNetworkRouteTemplates();
		init_exactJsonNumber();
		init_offsetDateTime();
		init_environmentSource();
		BODYLESS_STATUSES = new Set([
			204,
			205,
			304
		]);
		startedSchema = z.object({ startedDateTime: z.string() });
		startedInstant = (record) => {
			const started = startedSchema.safeParse(record.reported);
			if (!started.success) return undefined;
			return readRecordedStart(started.data.startedDateTime)?.instant;
		};
		requestBody = (record) => {
			const facts = readRecordedRequestBody(record.reported);
			if (facts.kind !== "request" || facts.postData.kind !== "object") return undefined;
			const { mimeType, text } = facts.postData;
			if (mimeType === undefined || text === undefined) return undefined;
			const value = isJsonLike(mediaTypeEssence(mimeType)) ? parseExactJson(text) : undefined;
			return value === undefined ? text : value;
		};
		liveAnswer = (method, status, body) => {
			if (body.kind === "none") return method === "HEAD" || BODYLESS_STATUSES.has(status) ? {
				status,
				body
			} : {
				status,
				body,
				unobserved: true
			};
			if (body.kind === "text" && body.text === "") return {
				status,
				body: { kind: "none" }
			};
			return {
				status,
				body
			};
		};
		probeOrigin = (lines) => {
			const origins = new Map();
			for (const line of lines.values()) {
				if (line?.kind !== "line") continue;
				const stats = origins.get(line.origin) ?? {
					records: 0,
					jsonLike: 0
				};
				stats.records += 1;
				if (isJsonLike(mediaTypeEssence(line.rawMime))) stats.jsonLike += 1;
				origins.set(line.origin, stats);
			}
			return primaryOrigin(origins);
		};
		probeRequests = (records) => {
			const steps = [];
			const unobserved = [];
			const starts = new Map(records.map((record) => [record.ordinal, startedInstant(record)]));
			const timed = [...starts.values()].every((instant) => instant !== undefined);
			const ordered = [...records].sort((left, right) => (timed ? compareOffsetDateTimeInstants(starts.get(left.ordinal), starts.get(right.ordinal)) : 0) || left.ordinal - right.ordinal);
			const lines = new Map(records.map((record) => [record.ordinal, readRecordedRequestLine(record.reported, true, () => true)]));
			const origin = probeOrigin(lines);
			for (const record of ordered) {
				const line = lines.get(record.ordinal);
				const { ordinal } = record;
				if (line?.kind === "line" && line.origin !== origin) unobserved.push({
					ordinal,
					reason: "other-origin"
				});
				else if (line?.kind !== "line") unobserved.push({
					ordinal,
					reason: line?.kind === "excluded" ? line.reason : "request-unavailable"
				});
				else {
					const exchange = recordedExchange(record, line);
					const request = {
						method: line.method,
						path: exchange.path,
						query: exchange.query,
						body: requestBody(record)
					};
					if (exchange.status === null) {
						unobserved.push({
							ordinal,
							reason: "no-response"
						});
						steps.push({
							ordinal,
							request
						});
					} else steps.push({
						ordinal,
						request,
						live: liveAnswer(line.method, exchange.status, replayedBody(exchange))
					});
				}
			}
			return {
				steps,
				unobserved
			};
		};
	})))();
}

//#endregion
//#region dist/application/environment/environmentCompare.js
var NORMALISED_KEYS, emptyNormalised, isSuccess, entityOf, fromState, identityValue, envBody, answersCall, inputCheck, heldIds, stepOf, PROBE_BODY_REQUIRED, compareStep, probeReport, summaryOf, toolsOf, compareEnvironment;
function init_environmentCompare() {
	return (init_environmentCompare = __esmMin((() => {
		init_boundedList();
		init_environmentStateRules();
		init_result();
		init_environmentCompareDiff();
		init_environmentCompareIds();
		init_environmentCompareMatch();
		init_environmentCompareProbe();
		init_environmentSource();
		init_environmentReplay();
		init_environmentState();
		init_environmentStateStore();
		init_environmentToolAnswer();
		NORMALISED_KEYS = [
			"ids",
			"clocks",
			"generated",
			"large_bodies",
			"unobserved_bodies"
		];
		emptyNormalised = () => ({
			ids: 0,
			clocks: 0,
			generated: 0,
			large_bodies: 0,
			unobserved_bodies: 0
		});
		isSuccess = (status) => status !== null && status >= 200 && status < 300;
		entityOf = (run, tool, segments, answer) => {
			const view = run.store?.state.views.get(tool.name);
			const plan = run.store?.state.writes.get(tool.name);
			const response = plan?.response;
			const scope = collectionScope(tool, segments);
			if (view?.shape === "item" || view?.shape === "list") return {
				scope,
				at: view.pointer,
				identity: false,
				rules: []
			};
			const identity = response?.shape === "identity";
			const at = identity ? response.pointer ?? "" : response?.pointer ?? plan?.observation?.pointer ?? "";
			const provenance = answer.state;
			const renderedWrite = provenance?.source === "state" && (provenance.view === "create" || provenance.view === "update" || provenance.view === "document-write" || provenance.view === "delete");
			const rules = plan?.served === true && response?.shape === "entity" && renderedWrite ? plan.rules : [];
			return {
				scope,
				at,
				identity,
				rules
			};
		};
		fromState = (answer) => {
			const state = answer.state;
			return state?.source === "state" && state.view !== "missing";
		};
		identityValue = (body) => {
			if (body.kind === "json") return body.value;
			if (body.kind === "text") return body.text;
			return undefined;
		};
		envBody = (run, answer) => {
			if (fromState(answer)) return {
				kind: "json",
				value: answer.body
			};
			const exchange = run.source.exchanges.get(answer.replay.record_ordinal);
			if (exchange === undefined) return answer.body === "" ? { kind: "none" } : {
				kind: "json",
				value: answer.body
			};
			const body = replayedBody(exchange);
			if (body.kind === "text" && body.text === "") return { kind: "none" };
			if (body.kind === "json") return {
				kind: "json",
				value: answer.body
			};
			if (body.kind === "text") return {
				kind: "text",
				text: typeof answer.body === "string" ? answer.body : body.text
			};
			if (body.kind === "base64") return {
				...body,
				encoded: typeof answer.body === "string" ? answer.body : body.encoded,
				whole: body.whole && !answer.replay.truncated
			};
			if (body.kind === "cut") return {
				kind: "cut",
				text: typeof answer.body === "string" ? answer.body : body.text
			};
			return body;
		};
		answersCall = (run, call, args, answer) => {
			if (fromState(answer)) return true;
			const exchange = run.source.exchanges.get(answer.replay.record_ordinal);
			if (!answer.replay.exact_match || exchange === undefined || !selectsRecordedLine(call.tool, exchange, args)) return false;
			const body = probeArguments(call.tool, run.bodies).body;
			if (body === undefined) return true;
			return equalJsonValues(run.recordedBodies.get(exchange.ordinal), ownMember(args, body));
		};
		inputCheck = (definition) => {
			const schema = fromJsonSchema(definition.inputSchema)["~standard"];
			return (args) => {
				const checked = schema.validate(args);
				return checked instanceof Promise ? undefined : checked.issues?.[0]?.message;
			};
		};
		heldIds = (store) => new Set(store?.snapshot().rea_state.entities.map((entity) => entity.id) ?? []);
		stepOf = (base, call, outcome) => {
			const categories = [...new Set(outcome.differences.map((d) => d.category))];
			const { items: differences, omitted } = boundedList(outcome.differences, 20);
			return {
				...base,
				tool: call?.tool.name ?? null,
				env_status: outcome.env_status,
				equal: outcome.differences.length === 0,
				equal_ignoring_order: outcome.differences.every((difference) => difference.category === "order"),
				categories,
				differences: [...differences],
				differences_total: outcome.differences.length,
				differences_omitted: omitted,
				differences_truncated: omitted > 0,
				ignored_query: [...call?.ignoredQuery ?? []]
			};
		};
		PROBE_BODY_REQUIRED = "a browser probe that makes POST, PUT or PATCH calls, or calls a served tool with a body argument, needs capture.network.request_body selected, or those calls would be made without their bodies.";
		compareStep = (run, manifest, probe) => {
			const { request, live } = probe;
			if (!run.requestBodies && [
				"POST",
				"PUT",
				"PATCH"
			].includes(request.method)) return err(PROBE_BODY_REQUIRED);
			const base = {
				ordinal: probe.ordinal,
				method: request.method,
				path: request.path,
				live_status: live?.status ?? null
			};
			const report = (call, outcome) => ok(live === undefined ? undefined : stepOf(base, call, outcome));
			const liveSegments = request.path.slice(1).split("/");
			const fitted = matchProbeRequest(manifest, request, run.bodies);
			const scopes = fitted === undefined ? undefined : parameterScopes(fitted.tool, liveSegments);
			const literals = fitted === undefined ? undefined : literalPositions(fitted.tool);
			const path = translatePath(request.path, run.map, (index) => scopes?.get(index), (index) => literals?.has(index) === true);
			const call = matchProbeRequest(manifest, {
				...request,
				path
			}, run.bodies);
			if (call === undefined) return report(call, {
				env_status: null,
				differences: [{
					category: "no-tool",
					pointer: ""
				}]
			});
			const check = run.served.get(call.tool.name);
			if (check === undefined) return report(call, {
				env_status: null,
				differences: [{
					category: "not-served",
					pointer: ""
				}]
			});
			if (!run.requestBodies && run.bodies.has(call.tool.name)) return err(PROBE_BODY_REQUIRED);
			const held = heldIds(run.store);
			const unknownPath = call.pathArguments.some((name) => {
				const value = ownMember(call.args, name);
				if (typeof value !== "string") return false;
				const id = decodedSegment(value);
				return !run.map.hasEnv(id) && !held.has(id);
			});
			const refusedWith = (message) => report(call, {
				env_status: null,
				differences: [{
					category: "refused",
					pointer: "",
					env: message.slice(0, 200)
				}]
			});
			const bulk = bulkIds(run, call, liveSegments);
			const args = environmentArguments(call, run.map, bulk);
			const problem = check(args);
			if (problem !== undefined) return refusedWith(`Invalid arguments: ${problem}`);
			const answered = run.answer(call.tool, args, call.observedQuery);
			if (!answered.ok) return refusedWith(answered.error.message);
			if (live === undefined) return ok(undefined);
			const env = {
				status: answered.value.status,
				body: envBody(run, answered.value)
			};
			const entity = entityOf(run, call.tool, liveSegments, answered.value);
			if (answersCall(run, call, args, answered.value)) learnIds(identityValue(live.body), identityValue(env.body), run.map, {
				heldIds: heldIds(run.store),
				scope: entity.scope,
				entityAt: entity.at,
				identity: entity.identity
			});
			const compared = compareAnswers(live, env, run.map, entity);
			for (const key of NORMALISED_KEYS) run.normalised[key] += compared.normalised[key];
			const differences = [...compared.differences];
			if (unknownPath && isSuccess(live.status) && !isSuccess(env.status)) differences.unshift({
				category: "unmapped-id",
				pointer: ""
			});
			return ok(stepOf(base, call, {
				env_status: env.status,
				differences
			}));
		};
		probeReport = (probe, run, results, unobserved) => ({
			label: probe.label,
			evidence_id: probe.evidenceId,
			steps: results.length,
			equal: results.filter((step) => step.equal).length,
			ids_mapped: run.map.size,
			id_conflicts: run.map.conflicts,
			normalised: run.normalised,
			results,
			unobserved
		});
		summaryOf = (probes) => {
			const steps = probes.flatMap((probe) => probe.results);
			const categories = Object.fromEntries(DIFFERENCE_CATEGORIES.map((category) => [category, 0]));
			for (const step of steps) for (const category of step.categories) categories[category] += 1;
			const equal = steps.filter((step) => step.equal).length;
			const ratio = (count) => steps.length === 0 ? null : Math.round(count / steps.length * 1e3) / 1e3;
			const normalised = emptyNormalised();
			for (const probe of probes) for (const key of NORMALISED_KEYS) normalised[key] += probe.normalised[key];
			return {
				probes: probes.length,
				steps: steps.length,
				equal,
				agreement: ratio(equal),
				agreement_ignoring_order: ratio(steps.filter((step) => step.equal_ignoring_order).length),
				unobserved: probes.reduce((sum, probe) => sum + probe.unobserved.length, 0),
				categories,
				normalised
			};
		};
		toolsOf = (probes) => {
			const tools = new Map();
			for (const step of probes.flatMap((probe) => probe.results)) {
				if (step.tool === null) continue;
				const entry = tools.get(step.tool) ?? {
					tool: step.tool,
					steps: 0,
					equal: 0
				};
				entry.steps += 1;
				if (step.equal) entry.equal += 1;
				tools.set(step.tool, entry);
			}
			return [...tools.values()].sort((left, right) => left.equal / left.steps - right.equal / right.steps || (left.tool < right.tool ? -1 : 1));
		};
		compareEnvironment = (input) => {
			const { source, operation } = input;
			const state = prepareServedState(source, input.captureValue, { operation }).state;
			const catalog = servedCatalog(source, state, source.manifest.name, operation);
			if (!catalog.ok) return catalog;
			const served = new Map(catalog.value.tools.map((definition) => [definition.name, inputCheck(definition)]));
			const bodies = bodyTools(catalog.value.tools);
			const recorded = parseCaptureEvidence(operation, input.captureValue, "manifest");
			const recordedBodies = new Map(recorded.ok ? recorded.value.records.map((record) => [record.ordinal, requestBody(record)]) : []);
			const probes = [];
			for (const [index, probe] of input.probes.entries()) {
				const probeError = (message) => err(inputError(operation, [{
					path: ["probe", index],
					reason: "invalid_value",
					message: `${probe.label}: ${message}`
				}], "A probe file cannot be compared."));
				const capture = parseCaptureEvidence(operation, probe.value, "manifest");
				if (!capture.ok) return probeError(capture.error.message);
				if (!capture.value.responseBodies) return probeError("a browser probe needs capture.network.response_body selected, or only statuses would compare.");
				const store = state === undefined ? undefined : new EnvironmentStateStore(state);
				const run = {
					source,
					recordedBodies,
					answer: environmentToolAnswer(source, store),
					store,
					served,
					bodies,
					requestBodies: capture.value.requestBodies,
					map: new IdMap(),
					normalised: emptyNormalised()
				};
				const { steps, unobserved } = probeRequests(capture.value.records);
				const results = [];
				for (const step of steps) {
					const compared = compareStep(run, source.manifest, step);
					if (!compared.ok) return probeError(compared.error);
					if (compared.value !== undefined) results.push(compared.value);
				}
				probes.push(probeReport({
					label: probe.label,
					evidenceId: capture.value.evidenceId
				}, run, results, unobserved));
			}
			return ok({
				status: "complete",
				environment: {
					name: source.manifest.name,
					manifest_evidence_id: source.manifestEvidenceId,
					evidence_id: source.evidenceId,
					state: state === undefined ? "replay-only" : "served"
				},
				summary: summaryOf(probes),
				tools: toolsOf(probes),
				probes
			});
		};
	})))();
}

//#endregion
init_environmentCompare();
export { compareEnvironment };