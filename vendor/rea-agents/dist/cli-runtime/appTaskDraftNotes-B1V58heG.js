import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { equalJsonValues, init_isRecord, init_jsonValue, isRecord, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { ellipsisExcerpt, init_excerpt } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { escapeJsonPointerToken, init_jsonPointer, jsonPointerTokens, unescapeJsonPointerToken } from "./jsonPointer-aolC6MvJ.js";
import { boundedList, init_boundedList } from "./boundedList-D6JdQAuV.js";
import { appendAll, init_appendAll } from "./appendAll-DYoV9cyW.js";
import { init_xmlDocument, isWellFormedXml, opensLikeXml, xmlAttributeQuoteRanges } from "./xmlDocument-DuM0TF5n.js";
import { STATE_PATH_INPUTS, XML_POLICY, doctypeHasInternalSubset, init_buildCapture, init_desktopState, init_stateFormats, versionAt } from "./x11Windows-Cx5-JOUb.js";
import { KIND_FIELD, VIEW_STATE, attributeTier, childConditions, collapseWhitespace, diffNamedMembers, diffStateViews, elementText, entryWithoutView, holdsTagOnly, init_appTask, init_attributeRank, init_jsonRecordPairing, init_memberPairing, init_positionalKeys, init_selectorCandidates, init_stateChanges, init_viewPointer, init_viewSelector, init_zipView, isAutomaticStyle, isGeneratedId, isIdentifyingAttribute, isNameLikeKey, isPlaceholder, isPositionalKey, isRecordIdField, isSaveNumberedId, isTimestamp, isViewStateName, isXmlElement, locatePointer as locatePointer$1, numberedInOrder, pairMembers, pairRecordsById, pairedAtSeed, positionalKeys, rankAttributes, resolvePointer as resolvePointer$1, selectorOf, spellCondition, sqliteRowIdentity, zipArrayLeavesOut, zipEntryAt, zipLeavesOutAt, zipView } from "./stateChanges-DKaIbxqq.js";
import { DRAFT_VIEW_CHARS, countTaskRows, init_appTaskChecks, init_valueCuts, numberOf } from "./appWithheld-WlVw2GpU.js";
import { z } from "zod";

//#region dist/domain/desktop/appTaskDraftMemberCount.js
var isMemberCount;
function init_appTaskDraftMemberCount() {
	return (init_appTaskDraftMemberCount = __esmMin((() => {
		init_viewPointer();
		init_appendAll();
		isMemberCount = (ends, pointer, key) => {
			const counter = pointer.replace(/\/children\/\d+$/u, "");
			const holder = resolvePointer$1(ends.final, counter, "xml");
			const scope = key === undefined ? counter !== pointer && isXmlElement(holder) && /count/iu.test(holder.name.split(":").at(-1) ?? holder.name) ? counter.replace(/\/children\/[^/]+$/u, "") : undefined : /count$/iu.test(key.split(":").at(-1) ?? key) ? pointer.split("/").slice(0, -2).join("/") : undefined;
			const [before, after] = [ends.baseline, ends.final].map((view) => resolvePointer$1(view, pointer, "xml"));
			const number = (value) => typeof value === "string" && /^\d+$/u.test(value) ? Number(value) : undefined;
			const [seedCount, endCount] = [number(before), number(after)];
			if (scope === undefined || endCount === undefined || seedCount === endCount || seedCount === undefined && before !== undefined) return false;
			const tallyAt = (view, deep) => {
				const tally = new Map();
				const own = key === undefined ? resolvePointer$1(view, counter, "xml") : undefined;
				const owner = resolvePointer$1(view, scope, "xml");
				const pending = isXmlElement(owner) ? [...owner.children] : [];
				for (let node = pending.pop(); node !== undefined; node = pending.pop()) if (isXmlElement(node) && node !== own) {
					tally.set(node.name, (tally.get(node.name) ?? 0) + 1);
					if (deep) appendAll(pending, node.children);
				}
				return tally;
			};
			if (seedCount === undefined) return [...tallyAt(ends.final, false).values()].some((count) => count > 1 && count === endCount);
			const seed = tallyAt(ends.baseline, true);
			const end = tallyAt(ends.final, true);
			return [...new Set([...seed.keys(), ...end.keys()])].some((tag) => (seed.get(tag) ?? 0) === seedCount && (end.get(tag) ?? 0) === endCount);
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftMirrors.js
var documentAt, fieldKeyOf, mirrorsOf, isRecordId, stepTag, sameRecord, isIdReference, idReferencesOf;
function init_appTaskDraftMirrors() {
	return (init_appTaskDraftMirrors = __esmMin((() => {
		init_jsonPointer();
		init_attributeRank();
		init_viewPointer();
		init_viewSelector();
		init_zipView();
		documentAt = (view, pointer) => {
			const entry = zipEntryAt(view, pointer);
			return typeof entry === "object" ? entry : view;
		};
		fieldKeyOf = (element) => selectorOf(unescapeJsonPointerToken(element.split("/").at(-1) ?? ""))?.find(({ prefix, key }) => prefix === "@" && isNameLikeKey(key))?.value;
		mirrorsOf = (change, ends) => {
			const texts = change.changed.flatMap((pointer) => {
				const [before, after] = [ends.baseline, ends.final].map((view) => resolvePointer$1(view, pointer, "xml"));
				const element = pointer.replace(/\/children\/\d+$/u, "");
				return element !== pointer && typeof before === "string" && typeof after === "string" ? [{
					pointer,
					element,
					before,
					after,
					document: documentAt(ends.final, pointer)
				}] : [];
			});
			const keys = new Map();
			for (const { pointer, element, before, after, document } of texts) {
				const key = fieldKeyOf(element);
				const alike = JSON.stringify([before, after]);
				if (key === undefined) continue;
				const group = keys.get(alike) ?? [];
				group.push({
					pointer,
					key,
					document
				});
				keys.set(alike, group);
			}
			const mirrored = new Set(texts.flatMap((mirror) => {
				const sources = keys.get(JSON.stringify([mirror.before, mirror.after]))?.filter(({ document }) => document === mirror.document);
				const record = sources?.some(({ pointer }) => pointer !== mirror.pointer) ? resolvePointer$1(ends.final, mirror.element.replace(/\/children\/[^/]+$/u, ""), "xml") : undefined;
				const shown = new Set((isXmlElement(record) ? record.children : []).map((field) => isXmlElement(field) ? elementText(field).trim() : ""));
				return (sources ?? []).some(({ pointer, key }) => pointer !== mirror.pointer && shown.has(key) && sameRecord(mirror.element, pointer)) ? [mirror.pointer] : [];
			}));
			return (pointer) => mirrored.has(pointer);
		};
		isRecordId = (key) => /^(?:[^:]*:)?(?:id|uid|uuid|guid|xid)$/iu.test(key);
		stepTag = (token) => /\[name=([^\][]+)/u.exec(token)?.[1];
		sameRecord = (left, right) => {
			const first = left.split("/");
			const second = right.split("/");
			let index = 0;
			while (index < first.length && index < second.length && first[index] === second[index]) index += 1;
			if (index >= first.length || index >= second.length) return true;
			if (first[index - 1] !== "children") return true;
			const leftTag = stepTag(first[index] ?? "");
			const rightTag = stepTag(second[index] ?? "");
			return leftTag === undefined || rightTag === undefined || leftTag !== rightTag;
		};
		isIdReference = (element) => {
			if (!isXmlElement(element)) return false;
			const [key, ...more] = Object.keys(element.attributes);
			return key !== undefined && more.length === 0 && isRecordId(key) && element.children.every((child) => typeof child === "string" && child.trim() === "");
		};
		idReferencesOf = (change, ends) => {
			const added = change.added.flatMap((pointer) => {
				const element = resolvePointer$1(ends.final, pointer, "xml");
				return isXmlElement(element) ? [{
					pointer,
					element,
					document: documentAt(ends.final, pointer)
				}] : [];
			});
			const mirrors = added.flatMap(({ pointer, element, document }) => {
				const [key = ""] = Object.keys(element.attributes);
				return isIdReference(element) && added.some((record) => record.document === document && record.element !== element && !isIdReference(record.element) && record.element.attributes[key] === element.attributes[key]) ? [pointer] : [];
			});
			return (pointer) => mirrors.some((mirror) => pointer === mirror || pointer.startsWith(`${mirror}/`));
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftNoise.js
var NOISE_REASONS, isViewStateValue, namesElement, UUID, isUuid, EPOCH_RANGE, ENCODED, isVolatileValue, TIME_OF_DAY, isStamp, DATE_PART, BOOKKEEPING, isBookkeepingName, isBookkeeping, isDateInParts, DURATION, META, COUNTER, attributeKeyOf, ownerOfAttribute, elementsAlong, stampedAlong, DATE_TEXT, stampedWhole, assignedId, isGarbled, ID_COUNTER, COUNTER_KEY, volatileAt$1, freshIds, isSlots, inSplitDate, holdsStamped, holdsSplitDate, showsView, VIEW_SETTING, metadataCount, positionalRenumbering, ENTRY_META, ENTRY_VIEW, upkeepOf, STYLE_AREA, COORDINATES, isCoordinates, MAX_LAYOUT_CLIMB, derivedLayout, DRAWING, drawingLayout, LAYOUT_WORD, isLayoutName, namesLayout, changeNoise;
function init_appTaskDraftNoise() {
	return (init_appTaskDraftNoise = __esmMin((() => {
		init_jsonPointer();
		init_appTask();
		init_attributeRank();
		init_appTaskDraftMemberCount();
		init_appTaskDraftMirrors();
		init_positionalKeys();
		init_viewPointer();
		NOISE_REASONS = [
			"view_state",
			"renumbered",
			"volatile",
			"timestamp",
			"upkeep",
			"layout"
		];
		isViewStateValue = (value) => /^[\p{L}\d]+(?:[-_:.][\p{L}\d]+)*$/u.test(value) && (/[-_:.]/u.test(value) || /\p{Ll}\p{Lu}/u.test(value)) && VIEW_STATE.test(value);
		namesElement = (key) => isNameLikeKey(key) || /^(?:[^:]*:)?key$/iu.test(key);
		UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/iu;
		isUuid = (value) => UUID.test(value);
		EPOCH_RANGE = [946684800, 4102444800];
		ENCODED = /^(?:iVBORw0KGgo[A-Za-z0-9+/=\r\n]*|(?=[^]*[a-z])(?=[^]*[A-Z])(?=[^]*\d)[A-Za-z0-9+/\r\n]{256,}={0,2})$/u;
		isVolatileValue = (value, bookkeeping = false) => {
			if (isUuid(value) || ENCODED.test(value.trim())) return true;
			if (!bookkeeping) return false;
			if (!/^\d{10}(?:\d{3})?$/u.test(value)) return false;
			const seconds = Number(value.slice(0, 10));
			if (!(seconds > EPOCH_RANGE[0] && seconds < EPOCH_RANGE[1])) return false;
			return true;
		};
		TIME_OF_DAY = /^\d{2}:\d{2}:\d{2}(?:[.,]\d+(?:Z|[+-]\d{2}:?\d{2})?|Z|[+-]\d{2}:?\d{2})$/u;
		isStamp = (value) => isTimestamp(value) || typeof value === "string" && TIME_OF_DAY.test(value.trim());
		DATE_PART = /^(?:year|month|day|hour|minute|second)$/u;
		BOOKKEEPING = /^[cm]date$|creat(?:ed|ion)|modif(?:ied|ication)|updated|saved|changed|accessed|entered|timestamp/u;
		isBookkeepingName = (name) => BOOKKEEPING.test((name.split(":").at(-1) ?? name).toLowerCase());
		isBookkeeping = (element) => isBookkeepingName(element.name);
		isDateInParts = (value) => {
			if (!isXmlElement(value)) return false;
			const parts = new Set();
			for (const child of value.children) {
				if (typeof child === "string" && /^[ \t\r\n]*$/u.test(child)) continue;
				const part = isXmlElement(child) ? (child.name.split(":").at(-1) ?? child.name).toLowerCase() : "";
				if (!DATE_PART.test(part) || !/^\s*\d+\s*$/u.test(elementText(child))) return false;
				parts.add(part);
			}
			return [
				"year",
				"month",
				"day"
			].every((part) => parts.has(part));
		};
		DURATION = /^P(?=\d|T\d)(?:\d+Y)?(?:\d+M)?(?:\d+W)?(?:\d+D)?(?:T(?=\d)(?:\d+H)?(?:\d+M)?(?:\d+(?:[.,]\d+)?S)?)?$/u;
		META = /^(?:[^:]*:)?meta(?:data)?$/iu;
		COUNTER = /count|cycles?|revision/iu;
		attributeKeyOf = (pointer) => {
			const segments = pointer.split("/");
			return segments.at(-2) === "attributes" ? unescapeJsonPointerToken(segments.at(-1)) : undefined;
		};
		ownerOfAttribute = (pointer) => pointer.split("/").slice(0, -2).join("/");
		elementsAlong = (view, pointer, format) => {
			if (format !== "xml") return [];
			const segments = pointer.split("/");
			const elements = [];
			for (let index = 2; index < segments.length; index += 1) {
				if (segments[index - 1] !== "children") continue;
				const element = resolvePointer$1(view, segments.slice(0, index + 1).join("/"), "xml");
				if (isXmlElement(element)) elements.push(element);
			}
			return elements;
		};
		stampedAlong = (elements) => {
			let named = false;
			return elements.some((element) => {
				named ||= isBookkeeping(element);
				return named && isDateInParts(element);
			});
		};
		DATE_TEXT = /^\s*\d{4}-\d{2}-\d{2}\b/u;
		stampedWhole = (elements, value) => elements.some(isBookkeeping) && DATE_TEXT.test(typeof value === "string" ? value : isXmlElement(value) ? elementText(value) : "");
		assignedId = (element) => /^(?:[^:]*:)?id$/iu.test(element.name) && isRecord(element.attributes) && element.attributes.type === "guid";
		isGarbled = (value) => [...value].some((character) => {
			const code = character.codePointAt(0) ?? 0;
			return code < 32 && code !== 9 && code !== 10 && code !== 13 || code === 127 || code === 65533;
		});
		ID_COUNTER = /^(?:next|unique|last)[-_]?(?:[\p{L}_-]*)id$/iu;
		COUNTER_KEY = /^(?:next|unique|last)[-_]?[\p{L}_-]*$/iu;
		volatileAt$1 = (elements, key, value, fresh, xml) => typeof value === "string" && (xml && isVolatileValue(value, elements.some(isBookkeeping) || key !== undefined && isBookkeepingName(key)) || isGarbled(value) || fresh) || key !== undefined && ID_COUNTER.test(key.split(":").at(-1) ?? key) || metadataCount(elements, key, value) || elements.some(assignedId) || xml && isXmlElement(value) && assignedId(value);
		freshIds = (change, ends) => new Set(change.added.flatMap((pointer) => {
			const element = resolvePointer$1(ends.final, pointer, ends.format(ends.final, pointer));
			return ends.format(ends.final, pointer) === "xml" && isXmlElement(element) ? Object.entries(element.attributes).flatMap(([key, value]) => /^(?:[^:]*:)?(?:x|uu|g)?id$/iu.test(key) && typeof value === "string" && value.length >= 4 && !/^\d+$/u.test(value) ? [value] : []) : [];
		}));
		isSlots = (element) => /^(?:[^:]*:)?slots$/u.test(element.name);
		inSplitDate = (view, pointer) => stampedAlong(elementsAlong(view, pointer, "xml"));
		holdsStamped = (value, named) => isXmlElement(value) && value.children.some((child) => {
			if (!isXmlElement(child)) return false;
			const inside = named || isBookkeeping(child);
			return inside && isDateInParts(child) || holdsStamped(child, inside);
		});
		holdsSplitDate = (view, pointer) => {
			const along = elementsAlong(view, pointer, "xml");
			const value = resolvePointer$1(view, pointer, "xml");
			return stampedAlong(along) || value !== undefined && holdsStamped(value, along.some(isBookkeeping));
		};
		showsView = (element) => isViewStateName(element.name) || Object.entries(isRecord(element.attributes) ? element.attributes : {}).some(([key, value]) => typeof value === "string" && namesElement(key) && (isViewStateValue(value) || VIEW_SETTING.test(value)));
		VIEW_SETTING = /^\/(?:[\w-]+\/)+(?:visible|hidden|shown?|expanded|collapsed|geometry|state|size|zoom)$/iu;
		metadataCount = (elements, key, value) => {
			if (typeof value !== "string" || !elements.some(({ name }) => META.test(name))) return false;
			if (DURATION.test(value.trim())) return true;
			const own = key ?? elements.at(-1)?.name ?? "";
			return /^\d+$/u.test(value.trim()) && COUNTER.test(own);
		};
		positionalRenumbering = (ends) => {
			const lists = new Map();
			return (pointer, key) => {
				const owner = ownerOfAttribute(pointer);
				const list = owner.split("/").slice(0, -1).join("/");
				const element = resolvePointer$1(ends.final, owner, ends.format(ends.final, owner)) ?? resolvePointer$1(ends.baseline, owner, ends.format(ends.baseline, owner));
				if (ends.format(ends.final, owner) !== "xml" || !list.endsWith("/children") || !isXmlElement(element)) return false;
				let keys = lists.get(list);
				if (keys === undefined) {
					const newer = resolvePointer$1(ends.final, list, ends.format(ends.final, list));
					const older = resolvePointer$1(ends.baseline, list, ends.format(ends.baseline, list));
					keys = Array.isArray(newer) && Array.isArray(older) ? positionalKeys(newer, older) : new Set();
					lists.set(list, keys);
				}
				return isPositionalKey(keys, element.name, key);
			};
		};
		ENTRY_META = /^\/entries\/[^/]+\/(?!view(?:\/|$))/u;
		ENTRY_VIEW = /^\/entries\/[^/]+\/view\//u;
		upkeepOf = (change, ends, noise) => {
			const added = new Set(change.added);
			const gained = (pointer) => ends.format(ends.final, pointer) === "xml" && added.has(pointer) && attributeKeyOf(pointer) === "loext:tab-stop-distance" && pointer.startsWith("/entries/[name=styles.xml]/view/") && [ends.baseline, ends.final].every((view) => isXmlElement(resolvePointer$1(view, ownerOfAttribute(pointer), ends.format(view, ownerOfAttribute(pointer)))));
			const edited = new Set();
			/** How many elements of an entry gained one attribute key. One gain is an edit; a repeated gain is the app filling a default in. */
			const filled = new Map();
			for (const pointer of [
				...change.added,
				...change.changed,
				...change.removed
			]) {
				const [entry] = ENTRY_VIEW.exec(pointer) ?? [];
				if (entry === undefined || noise(pointer) !== undefined) continue;
				const key = attributeKeyOf(pointer);
				if (!gained(pointer) || key === undefined) {
					edited.add(entry);
					continue;
				}
				const counts = filled.get(entry) ?? new Map();
				filled.set(entry, counts);
				counts.set(key, (counts.get(key) ?? 0) + 1);
			}
			const automatic = (pointer, key) => [ends.baseline, ends.final].every((view) => {
				const value = resolvePointer$1(view, pointer, ends.format(view, pointer));
				return value === undefined || typeof value === "string" && isAutomaticStyle(key, value);
			});
			const styled = (pointer) => {
				const key = attributeKeyOf(pointer);
				const view = resolvePointer$1(ends.final, pointer, ends.format(ends.final, pointer)) === undefined ? ends.baseline : ends.final;
				return ends.format(view, pointer) === "xml" && (ENTRY_VIEW.exec(pointer)?.[0] === "/entries/[name=styles.xml]/view/" || key !== undefined && /style-name$/iu.test(key) && automatic(pointer, key) || elementsAlong(view, pointer, ends.format(view, pointer)).some(({ name }) => STYLE_AREA.test(name)));
			};
			const elsewhere = [
				...change.added,
				...change.changed,
				...change.removed
			].some((pointer) => noise(pointer) === undefined && !styled(pointer) && !ENTRY_META.test(pointer));
			return (pointer) => {
				const [entry] = ENTRY_VIEW.exec(pointer) ?? [];
				const key = attributeKeyOf(pointer);
				const count = entry === undefined || key === undefined ? 0 : filled.get(entry)?.get(key) ?? 0;
				const view = resolvePointer$1(ends.final, pointer, ends.format(ends.final, pointer)) === undefined ? ends.baseline : ends.final;
				const inStyleArea = elementsAlong(view, pointer, ends.format(view, pointer)).some(({ name }) => STYLE_AREA.test(name));
				const automaticName = key !== undefined && /style-name$/iu.test(key) && automatic(pointer, key);
				return elsewhere && (automaticName || inStyleArea || styled(pointer) && count >= 2) || edited.size > 0 && entry !== undefined && !edited.has(entry) && gained(pointer) && count >= 2;
			};
		};
		STYLE_AREA = /^(?:office:(?:styles|automatic-styles|master-styles|font-face-decls)|style:(?:master-page|handout-master))$/u;
		COORDINATES = /^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(?:[,;] ?-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)*$/u;
		isCoordinates = (value) => typeof value === "string" && COORDINATES.test(value.trim());
		MAX_LAYOUT_CLIMB = 3;
		derivedLayout = (change, ends) => {
			const textAt = (view, pointer) => {
				const element = resolvePointer$1(view, pointer, ends.format(view, pointer));
				return ends.format(view, pointer) === "xml" && isXmlElement(element) ? elementText(element) : undefined;
			};
			const known = new Map();
			const retexted = (pointer) => {
				const before = textAt(ends.baseline, pointer);
				const found = known.get(pointer) ?? (before !== undefined && before !== textAt(ends.final, pointer));
				known.set(pointer, found);
				return found;
			};
			const layout = new Set(change.changed.filter((pointer) => {
				const value = resolvePointer$1(ends.final, pointer, ends.format(ends.final, pointer));
				const owner = ownerOfAttribute(pointer);
				if (attributeKeyOf(pointer) === undefined || !isCoordinates(value) || retexted(owner)) return false;
				const segments = owner.split("/");
				const above = Array.from({ length: MAX_LAYOUT_CLIMB }, (_, index) => segments.slice(0, -2 * (index + 1)).join("/"));
				const at = above.findIndex((element) => /\/children\/[^/]+$/u.test(element) && element.split("/").at(-3) !== "root" && retexted(element));
				return at >= 0 && (/[,;]/u.test(value) || namesLayout(ends.final, pointer, [owner, ...above.slice(0, at)]));
			}));
			return (pointer) => layout.has(pointer);
		};
		DRAWING = /(?:diagram|widget|canvas|scene)s?$/iu;
		drawingLayout = (change, ends, noise) => {
			const viewOf = (pointer) => resolvePointer$1(ends.final, pointer, ends.format(ends.final, pointer)) === undefined ? ends.baseline : ends.final;
			const drawn = (pointer) => elementsAlong(viewOf(pointer), pointer, ends.format(viewOf(pointer), pointer)).some(({ name }) => DRAWING.test(name.split(":").at(-1) ?? name));
			const elsewhere = [...change.added, ...change.removed].some((pointer) => noise(pointer) === undefined && !ENTRY_META.test(pointer) && !drawn(pointer));
			return (pointer) => {
				const value = resolvePointer$1(viewOf(pointer), pointer, ends.format(viewOf(pointer), pointer));
				return elsewhere && attributeKeyOf(pointer) !== undefined && isCoordinates(value) && drawn(pointer) && (/[,;]/u.test(value) || namesLayout(viewOf(pointer), pointer, [ownerOfAttribute(pointer)]));
			};
		};
		LAYOUT_WORD = /^(?:pos|position|x|y|z|point|bb|bbox|bounds|rect|rectangle|corner|width|height|w|h|left|top|right|bottom|offset|origin|coords?)$/u;
		isLayoutName = (name) => name.replaceAll(/(?<lower>\p{Ll})(?<upper>\p{Lu})/gu, "$<lower> $<upper>").toLowerCase().split(/[^\p{L}\d]+/u).some((word) => LAYOUT_WORD.test(word));
		namesLayout = (view, pointer, elements) => [attributeKeyOf(pointer) ?? "", ...elements.flatMap((at) => {
			const element = resolvePointer$1(view, at, "xml");
			return isXmlElement(element) ? [element.name, ...Object.entries(element.attributes).flatMap(([key, value]) => isNameLikeKey(key) && typeof value === "string" ? [value] : [])] : [];
		})].some(isLayoutName);
		changeNoise = (change, input, format) => {
			const ends = {
				...input,
				format
			};
			const isXmlPointer = (pointer) => {
				const view = resolvePointer$1(ends.final, pointer, ends.format(ends.final, pointer)) === undefined ? ends.baseline : ends.final;
				return ends.format(view, pointer) === "xml";
			};
			const xmlChange = {
				added: change.added.filter((pointer) => ends.format(ends.final, pointer) === "xml"),
				changed: change.changed.filter(isXmlPointer),
				removed: change.removed.filter((pointer) => ends.format(ends.baseline, pointer) === "xml")
			};
			const byPosition = positionalRenumbering(ends);
			const fresh = freshIds(xmlChange, ends);
			const added = new Set(change.added);
			const freshAt = (pointer, key, value) => typeof value === "string" && fresh.has(value) && (key !== undefined && COUNTER_KEY.test(key.split(":").at(-1) ?? key) || pointer.split("/").some((_, index, segments) => added.has(segments.slice(0, index + 1).join("/"))));
			const known = new Map();
			const base = (pointer) => {
				if (known.has(pointer)) return known.get(pointer);
				const view = resolvePointer$1(ends.final, pointer, ends.format(ends.final, pointer)) === undefined ? ends.baseline : ends.final;
				const isXml = ends.format(view, pointer) === "xml";
				const key = isXml ? attributeKeyOf(pointer) : undefined;
				const elements = elementsAlong(view, pointer, ends.format(view, pointer));
				const value = resolvePointer$1(view, pointer, ends.format(view, pointer));
				const reason = elements.some(showsView) || key !== undefined && isViewStateName(key) ? "view_state" : key !== undefined && isIdentifyingAttribute(key) && byPosition(pointer, key) ? "renumbered" : volatileAt$1(elements, key, value, isXml && freshAt(pointer, key, value), isXml) ? "volatile" : isStamp(value ?? null) || stampedAlong(elements) || stampedWhole(elements, value) ? "timestamp" : elements.some(isSlots) || isXml && isMemberCount(ends, pointer, key) ? "upkeep" : undefined;
				known.set(pointer, reason);
				return reason;
			};
			const upkeep = upkeepOf(change, ends, base);
			const layout = derivedLayout(change, ends);
			const drawing = drawingLayout(change, ends, base);
			const mirror = mirrorsOf(xmlChange, ends);
			const reference = idReferencesOf(xmlChange, ends);
			return (pointer) => base(pointer) ?? (isXmlPointer(pointer) && (upkeep(pointer) || mirror(pointer) || reference(pointer)) ? "upkeep" : isXmlPointer(pointer) && (layout(pointer) || drawing(pointer)) ? "layout" : undefined);
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftItems.js
var MIN_TEXT, MAX_KEPT, placeOf, NUMBER, placed, TEXT_RUN, isPlacedItem, siblingTexts, placedItemCheck;
function init_appTaskDraftItems() {
	return (init_appTaskDraftItems = __esmMin((() => {
		init_appTask();
		init_appTaskDraftNoise();
		init_viewPointer();
		MIN_TEXT = 3;
		MAX_KEPT = 4;
		placeOf = (pointer) => /^(?<owner>.+)\/children\/[^/]+$/u.exec(pointer)?.groups?.owner;
		NUMBER = /^-?\d+(?:\.\d+)?$/u;
		placed = (element) => isXmlElement(element) && ["x", "y"].every((key) => NUMBER.test(String(element.attributes[key] ?? "")));
		TEXT_RUN = /^(?:tspan|span)$/iu;
		isPlacedItem = (view, pointer) => {
			const element = resolvePointer$1(view, pointer, "xml");
			const local = isXmlElement(element) ? element.name.split(":").at(-1) ?? element.name : "";
			if (TEXT_RUN.test(local)) return false;
			const owner = placeOf(pointer);
			const list = owner === undefined ? undefined : resolvePointer$1(view, `${owner}/children`, "xml");
			return isXmlElement(element) && placed(element) && Array.isArray(list) && list.some((item) => item !== element && isXmlElement(item) && item.name === element.name && placed(item));
		};
		siblingTexts = (view, owner, item) => {
			const list = resolvePointer$1(view, `${owner}/children`, "xml");
			return (Array.isArray(list) ? list : []).flatMap((sibling, index) => sibling !== item && isXmlElement(sibling) && sibling.name === item.name ? [{
				text: collapseWhitespace(elementText(sibling)),
				index
			}] : []);
		};
		placedItemCheck = (context, pointer) => {
			const { ends, file } = context;
			const owner = placeOf(pointer);
			const at = owner === undefined ? undefined : context.name(owner);
			const item = resolvePointer$1(ends.final, pointer, "xml");
			const value = isXmlElement(item) ? collapseWhitespace(elementText(item)) : "";
			const seed = at === undefined ? undefined : resolvePointer$1(ends.baseline, at, "xml");
			if (owner === undefined || at === undefined || !isXmlElement(item) || !isXmlElement(seed) || value.length < MIN_TEXT || value.length > context.chars || isStamp(value) || value.includes("][") || siblingTexts(ends.baseline, owner, item).some((entry) => entry.text === value)) return undefined;
			const kept = new Set(siblingTexts(ends.baseline, owner, item).map(({ text }) => text));
			const list = resolvePointer$1(ends.final, `${owner}/children`, "xml");
			const here = Array.isArray(list) ? list.indexOf(item) : 0;
			const guards = siblingTexts(ends.final, owner, item).filter(({ text }) => text.length >= MIN_TEXT && !text.includes("][") && kept.has(text)).toSorted((left, right) => Math.abs(left.index - here) - Math.abs(right.index - here)).slice(0, MAX_KEPT).toSorted((left, right) => left.index - right.index).map(({ text }) => ({
				kind: "member_count",
				file,
				pointer: `${at}/children`,
				matching: `[name=${item.name}][>text()=${text}]`,
				at_least: 1
			}));
			return {
				element: pointer,
				check: {
					kind: "member_count",
					file,
					pointer: `${at}/children`,
					matching: `[name=${item.name}][>text()=${value}]`,
					at_least: 1
				},
				guards
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftScalars.js
var DECIMAL_TOLERANCE, decimalOf, nearBaseline, passesOn, valueEqualsCheck;
function init_appTaskDraftScalars() {
	return (init_appTaskDraftScalars = __esmMin((() => {
		init_jsonValue();
		init_appTaskChecks();
		DECIMAL_TOLERANCE = .001;
		decimalOf = (value) => {
			if (typeof value !== "string" || !/^-?\d+\.\d+$/u.test(value)) return undefined;
			const number = Number(value);
			return Number.isFinite(number) ? number : undefined;
		};
		nearBaseline = (number, before) => {
			const old = before === undefined ? undefined : numberOf(before);
			return old !== undefined && Math.abs(old - number) <= .001;
		};
		passesOn = (check, value) => {
			if (check.kind !== "value_equals" || value === undefined) return false;
			const number = numberOf(value);
			return check.tolerance !== undefined && typeof check.value === "number" ? number !== undefined && Math.abs(number - check.value) <= check.tolerance : equalJsonValues(value, check.value);
		};
		valueEqualsCheck = (file, pointer, value, before) => {
			const number = decimalOf(value);
			return number === undefined || nearBaseline(number, before) ? {
				kind: "value_equals",
				file,
				pointer,
				value
			} : {
				kind: "value_equals",
				file,
				pointer,
				value: number,
				tolerance: DECIMAL_TOLERANCE
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftText.js
var parentOf$1, isWhitespace, ownerOf, holdsText, parentBelowRoot, namedByAttribute$1, attributesOf$3, isIdentifier, namedByIdentifier, textlessAt, keptAt, mixedAt, byOwnAttribute, isField, MAX_TAG_CLIMB, RUN_TAG, tagOf, withoutRuns, holdsNoisyText, outsideRuns, abovePosition, recordLike, TEXT_TAG, INLINE_TAG, INLINE_PREFIX, isInline, holdsFields, inText, isRecordAt, listOf$2, keptAncestor, textHolder, isLaidOutLine, wholeTextCheck, candidateAt, textCheck, tooLong, textHolders, wholeTextSuggestions;
function init_appTaskDraftText() {
	return (init_appTaskDraftText = __esmMin((() => {
		init_jsonPointer();
		init_appTask();
		init_appTaskDraftNoise();
		init_appTaskDraftItems();
		init_appTaskDraftScalars();
		init_attributeRank();
		init_viewPointer();
		parentOf$1 = (pointer) => /^(?<parent>.+)\/children\/[^/]+$/u.exec(pointer)?.groups?.parent;
		isWhitespace = (text) => /^[ \t\r\n]*$/u.test(text);
		ownerOf = (pointer) => {
			const segments = pointer.split("/");
			if (segments.at(-2) === "attributes") return segments.slice(0, -2).join("/");
			const last = segments.at(-1);
			return last === "attributes" || last === "name" ? segments.slice(0, -1).join("/") : undefined;
		};
		holdsText = (value) => isXmlElement(value) && value.children.some((child) => typeof child === "string" && !isWhitespace(child));
		parentBelowRoot = (pointer) => {
			const parent = parentOf$1(pointer);
			return parent === undefined || parentOf$1(parent) === undefined ? undefined : parent;
		};
		namedByAttribute$1 = (pointer) => (pointer.split("/").at(-1) ?? "").includes("[@");
		attributesOf$3 = (value) => isXmlElement(value) && isRecord(value.attributes) ? value.attributes : {};
		isIdentifier = (key) => /^(?:[^:]*:)?x?id$/iu.test(key);
		namedByIdentifier = (pointer) => {
			const key = /\]\[@(?<key>[^=]+)=/u.exec(pointer.split("/").at(-1) ?? "")?.groups?.key;
			return key !== undefined && isIdentifier(key);
		};
		textlessAt = (pointer, ends) => [ends.baseline, ends.final].some((view) => {
			const value = resolvePointer$1(view, pointer, "xml");
			return isXmlElement(value) && elementText(value) === "";
		});
		keptAt = (element, ends) => [ends.baseline, ends.final].every((view) => isXmlElement(resolvePointer$1(view, element, "xml")));
		mixedAt = (element, ends) => [ends.baseline, ends.final].some((view) => holdsText(resolvePointer$1(view, element, "xml")));
		byOwnAttribute = (element, ends) => {
			const parent = parentOf$1(element);
			const before = resolvePointer$1(ends.baseline, element, "xml");
			const after = resolvePointer$1(ends.final, element, "xml");
			if (parent === undefined || !isXmlElement(before) || !isXmlElement(after)) return undefined;
			const attributes = attributesOf$3(after);
			const keys = Object.keys(attributes);
			for (const key of [...keys.filter(isIdentifier), ...rankAttributes(keys.filter((key) => !isIdentifier(key)).map((key) => {
				const value = attributes[key];
				return {
					key,
					value: typeof value === "string" ? value : ""
				};
			})).map(({ key }) => key)]) {
				const value = attributes[key];
				if (typeof value !== "string" || attributesOf$3(before)[key] !== value || /[=[\]]/u.test(key) || value.includes("][") || isStamp(value)) continue;
				const selector = `[name=${after.name}][@${key}=${value}]`;
				const pointer = `${parent}/children/${escapeJsonPointerToken(selector)}`;
				if (resolvePointer$1(ends.baseline, pointer, "xml") === before && resolvePointer$1(ends.final, pointer, "xml") === after) return {
					element,
					pointer,
					identifier: isIdentifier(key)
				};
			}
			return undefined;
		};
		isField = (pointer, ends) => {
			const parent = parentOf$1(pointer);
			const tag = /^\[name=(?<tag>[^\]]+)\]$/u.exec(pointer.split("/").at(-1) ?? "")?.groups?.tag;
			return parent !== undefined && tag !== undefined && [ends.baseline, ends.final].every((view) => {
				const record = resolvePointer$1(view, parent, "xml");
				const fields = isXmlElement(record) ? record.children.filter(isXmlElement) : [];
				return holdsFields(record) && fields.filter((field) => elementText(field).trim() !== "").length > 1 && fields.filter(({ name }) => name === tag).length === 1;
			});
		};
		MAX_TAG_CLIMB = 3;
		RUN_TAG = /^(?:a|b|c|em|i|span|strong|tspan|u)$/u;
		tagOf = (pointer) => (/\[name=(?<name>[^\][]+)/u.exec(pointer.split("/").at(-1) ?? "")?.groups?.name ?? "").split(":").at(-1) ?? "";
		withoutRuns = (chain, noisy) => {
			const clean = chain.filter((element) => !noisy(element));
			const content = clean.filter((element) => !RUN_TAG.test(tagOf(element)));
			return content.length > 0 ? content : clean;
		};
		holdsNoisyText = (value, bookkeeping = false) => {
			if (typeof value === "string") {
				const text = value.trim();
				return text.length > 0 && (isStamp(text) || isVolatileValue(text, bookkeeping));
			}
			return isXmlElement(value) && value.children.some((child) => holdsNoisyText(child, bookkeeping || isBookkeeping(value)));
		};
		outsideRuns = (pointer, ends) => {
			let current = pointer;
			for (let parent = parentOf$1(current); parent !== undefined && mixedAt(parent, ends); parent = parentOf$1(current)) current = parent;
			if (isField(current, ends)) return [{
				element: current,
				pointer: current,
				identifier: false
			}];
			const passed = [];
			let named = current;
			while (!namedByAttribute$1(named)) {
				const parent = parentBelowRoot(named);
				if (parent === undefined) {
					const stopped = parentOf$1(named);
					const chain = [...passed, named].filter((element, index, all) => all.indexOf(element) === index);
					if (stopped !== undefined && holdsNoisyText(resolvePointer$1(ends.final, stopped, "xml"))) {
						const narrower = withoutRuns(chain, (element) => holdsNoisyText(resolvePointer$1(ends.final, element, "xml")));
						if (narrower.length > 0) return narrower.map((element) => ({
							element,
							pointer: element,
							identifier: false
						}));
					}
					return [current, ...[...passed.slice(1), named].slice(0, MAX_TAG_CLIMB)].filter((element, index, all) => all.indexOf(element) === index).map((element) => ({
						element,
						pointer: element,
						identifier: false
					}));
				}
				passed.push(named);
				named = parent;
			}
			const noisy = (element) => holdsNoisyText(resolvePointer$1(ends.final, element, "xml"));
			if (noisy(named)) {
				const narrower = withoutRuns([...passed].filter((element, index, all) => all.indexOf(element) === index && element !== named), noisy);
				if (narrower.length > 0) return narrower.map((element) => ({
					element,
					pointer: element,
					identifier: false
				}));
			}
			const ranked = [{
				element: named,
				pointer: named,
				identifier: namedByIdentifier(named)
			}, ...passed.toReversed().flatMap((element) => byOwnAttribute(element, ends) ?? [])];
			return [...ranked.filter(({ identifier }) => identifier), ...ranked.filter(({ identifier }) => !identifier)];
		};
		abovePosition = (pointer, ends) => {
			const segments = pointer.split("/");
			const step = segments.findIndex((segment, index) => segments[index - 1] === "children" && /^\d+$/u.test(segment));
			if (step < 0) return [];
			const element = segments.slice(0, step - 1).join("/");
			if (parentOf$1(element) === undefined) return [];
			const own = byOwnAttribute(element, ends);
			return [...own === undefined ? [] : [own], {
				element,
				pointer: element,
				identifier: false
			}];
		};
		recordLike = (value) => isXmlElement(value) && value.children.some((child) => isXmlElement(child)) && value.children.every((child) => isXmlElement(child) || typeof child === "string" && isWhitespace(child));
		TEXT_TAG = /^(?:p|h|h[1-6]|para|simpara|li|text|tspan|span|a)$/u;
		INLINE_TAG = /^(?:b|i|u|s|em|strong|bold|italic|underline|strikethrough|emphasis|span|a|code|sub|sup|small|big|mark|font|tt|monospace|highlight|link)$/u;
		INLINE_PREFIX = /^(?:size|link):/u;
		isInline = (name) => INLINE_PREFIX.test(name) || INLINE_TAG.test((name.split(":").at(-1) ?? name).toLowerCase());
		holdsFields = (value) => recordLike(value) && isXmlElement(value) && !TEXT_TAG.test(value.name.split(":").at(-1) ?? value.name) && !value.children.every((child) => !isXmlElement(child) || isInline(child.name)) && !value.children.some((child) => {
			const text = isXmlElement(child) ? elementText(child) : "";
			return /^[ \t]+\S|\S[ \t]+$/u.test(text);
		});
		inText = (view, pointer) => {
			for (let parent = parentOf$1(pointer); parent !== undefined; parent = parentOf$1(parent)) {
				const element = resolvePointer$1(view, parent, "xml");
				if (isXmlElement(element) && TEXT_TAG.test(element.name.split(":").at(-1) ?? element.name)) return true;
			}
			return false;
		};
		isRecordAt = (view, pointer, value) => holdsFields(value) && !inText(view, pointer);
		listOf$2 = (holder, pointer, element, ends) => {
			if (!isXmlElement(element) || !isRecordAt(ends.final, pointer, element) || !isRecordAt(ends.baseline, pointer, element) || mixedAt(holder, ends)) return false;
			const like = (view) => {
				const list = resolvePointer$1(view, holder, "xml");
				return isXmlElement(list) ? list.children.flatMap((child) => isXmlElement(child) && child !== element && child.name === element.name ? [elementText(child)] : []) : [];
			};
			const before = new Set(like(ends.baseline));
			return like(ends.final).some((text) => !isWhitespace(text) && before.has(text));
		};
		keptAncestor = (pointer, ends) => {
			let parent = parentOf$1(pointer);
			while (parent !== undefined && !keptAt(parent, ends)) parent = parentOf$1(parent);
			return parent === undefined || parentOf$1(parent) === undefined && !mixedAt(parent, ends) ? undefined : parent;
		};
		textHolder = (pointer, element, ends, removed) => {
			const kept = keptAncestor(pointer, ends);
			const unnamed = removed && /^\d+$/u.test(pointer.split("/").at(-1) ?? "");
			const listed = kept !== undefined && !unnamed && listOf$2(kept, pointer, element, ends);
			return {
				holder: listed ? undefined : kept,
				listed
			};
		};
		isLaidOutLine = (value) => /[\r\n]/u.test(value) && !/[\r\n]/u.test(value.trim());
		wholeTextCheck = (file, pointer, value, before) => {
			const comparable = isLaidOutLine(value) ? value.trim() : value;
			const earlier = before !== undefined && isLaidOutLine(before) ? before.trim() : before;
			const numeric = valueEqualsCheck(file, pointer, comparable, earlier);
			if ("tolerance" in numeric) return numeric;
			const laidOut = isLaidOutLine(value) ? {
				value: collapseWhitespace(value),
				normalize_whitespace: true
			} : { value };
			return {
				kind: "text_equals",
				file,
				pointer,
				...laidOut
			};
		};
		candidateAt = ({ ends, place }, { pointer: named }) => {
			const pointer = place.name(named);
			const now = pointer === undefined ? undefined : resolvePointer$1(ends.final, pointer, "xml");
			return pointer === undefined || !isXmlElement(now) ? undefined : {
				pointer,
				now
			};
		};
		textCheck = (context, candidate, added) => {
			const found = candidateAt(context, candidate);
			if (found === undefined) return undefined;
			const { pointer, now } = found;
			const before = resolvePointer$1(context.ends.baseline, pointer, "xml");
			if (!added && !isXmlElement(before)) return undefined;
			if (holdsNoisyText(now)) return undefined;
			const value = elementText(now);
			const old = isXmlElement(before) ? elementText(before) : undefined;
			const relaidOut = old !== undefined && isLaidOutLine(value) && collapseWhitespace(old) === collapseWhitespace(value);
			return value !== old && !relaidOut && value.length <= context.place.limit.chars && !isStamp(value) && !holdsNoisyText(now) && !holdsSplitDate(context.ends.final, pointer) ? {
				element: candidate.element,
				check: wholeTextCheck(context.file, pointer, value, old)
			} : undefined;
		};
		tooLong = (context, candidate) => {
			const found = candidateAt(context, candidate);
			return found !== undefined && elementText(found.now).length > context.place.limit.chars;
		};
		textHolders = (change, ends, place) => {
			const holders = new Set();
			/** Elements added whole holding text, each with the ancestor checked for it, if any. */
			const added = new Map();
			/** Items placed by their own position, added whole. */
			const items = [];
			const note = (pointer, view, how) => {
				const value = resolvePointer$1(view, pointer, "xml");
				const parent = parentOf$1(pointer);
				if (place.noise(pointer)) return;
				if (typeof value === "string") {
					if (parent !== undefined && !isWhitespace(value) && !isStamp(value) && place.inTree(parent)) holders.add(parent);
				} else if (isXmlElement(value) && !isWhitespace(elementText(value)) && place.inTree(pointer)) {
					if (isPlacedItem(view, pointer)) {
						if (how === "added") items.push(pointer);
						return;
					}
					const { holder, listed } = textHolder(pointer, value, ends, how === "removed");
					if (holder !== undefined) holders.add(holder);
					if (how === "added" && !listed) added.set(pointer, holder);
				}
			};
			for (const pointer of change.changed) {
				note(pointer, ends.final, "changed");
				note(pointer, ends.baseline, "changed");
			}
			for (const pointer of change.added) note(pointer, ends.final, "added");
			for (const pointer of change.removed) note(pointer, ends.baseline, "removed");
			return {
				holders,
				added,
				items
			};
		};
		wholeTextSuggestions = (file, change, ends, place) => {
			const { holders, added, items } = textHolders(change, ends, place);
			const context = {
				file,
				ends,
				place
			};
			const checks = new Map();
			const check = (candidate) => {
				if (!checks.has(candidate.element)) checks.set(candidate.element, textCheck(context, candidate, false));
				return checks.get(candidate.element);
			};
			const climbs = new Map();
			/** Elements whose text changed and that no check took because every place for it held too much text. */
			const long = new Set();
			const climb = (holder) => {
				if (!climbs.has(holder)) {
					const candidates = [...outsideRuns(holder, ends), ...abovePosition(holder, ends)];
					const found = candidates.find((candidate) => check(candidate) !== undefined);
					if (found === undefined && candidates.some((candidate) => tooLong(context, candidate))) long.add(holder);
					climbs.set(holder, found === undefined ? undefined : check(found));
				}
				return climbs.get(holder);
			};
			const placed = [];
			const keep = (found) => {
				if (found !== undefined && !placed.includes(found)) placed.push(found);
			};
			for (const holder of holders) keep(climb(holder));
			for (const item of items) keep(placedItemCheck({
				file,
				ends,
				name: place.name,
				chars: place.limit.chars
			}, item));
			for (const [element, holder] of added) if (holder === undefined || climb(holder) === undefined) keep(textCheck(context, {
				element,
				pointer: element,
				identifier: false
			}, true));
			const suggested = placed.filter(({ element }) => !placed.some((other) => element.startsWith(`${other.element}/`))).slice(0, place.limit.suggestions);
			return {
				suggestions: suggested.map(({ check }) => check),
				guards: suggested.flatMap(({ guards }) => guards ?? []),
				long: [...long],
				covers: (pointer) => {
					if (!suggested.some(({ element }) => pointer === element || pointer.startsWith(`${element}/children/`))) return false;
					if (textlessAt(pointer, ends)) return false;
					const owner = ownerOf(pointer);
					return owner === undefined || !keptAt(owner, ends);
				}
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftSteps.js
var listSteps, namedAsField, sharedField, recordOfField;
function init_appTaskDraftSteps() {
	return (init_appTaskDraftSteps = __esmMin((() => {
		init_jsonPointer();
		init_attributeRank();
		init_viewPointer();
		init_viewSelector();
		listSteps = (pointer, positional = false) => {
			const segments = pointer.split("/");
			const steps = [];
			for (let index = segments.length - 1; index >= 2; index -= 1) {
				const member = segments[index] ?? "";
				if (segments[index - 1] === "children" && (positional || !/^\d+$/u.test(member))) steps.push({
					list: segments.slice(0, index).join("/"),
					member,
					rest: segments.slice(index + 1)
				});
			}
			return steps;
		};
		namedAsField = ({ member }) => {
			const [only, ...more] = (selectorOf(unescapeJsonPointerToken(member)) ?? []).filter(({ prefix }) => prefix !== "");
			return only !== undefined && more.length === 0 && only.prefix === "@" && isNameLikeKey(only.key);
		};
		sharedField = (view, step, outer) => {
			const records = resolvePointer$1(view, outer.list, "xml");
			const record = resolvePointer$1(view, `${outer.list}/${outer.member}`, "xml");
			const inner = outer.rest.slice(0, outer.rest.length - step.rest.length);
			return Array.isArray(records) && isXmlElement(record) && records.some((item) => item !== record && isXmlElement(item) && item.name === record.name && resolvePointer$1(item, `/${inner.join("/")}`, "xml") !== undefined);
		};
		recordOfField = (view, step, outer) => namedAsField(step) ? outer.find((candidate) => sharedField(view, step, candidate)) : undefined;
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftGuards.js
var MAX_GUARDS$1, MAX_GUARDS_PER_CHECK, MAX_SIBLINGS_READ, guardAt, sharing, siblingsOf, attributesOf$2, conditionsOf, attributeRead, readAt, selectsByRead, readsSelector, rekeyed, variesAmong, guardField, siblingGuard, guardSteps, guardsFor, draftGuards;
function init_appTaskDraftGuards() {
	return (init_appTaskDraftGuards = __esmMin((() => {
		init_jsonPointer();
		init_jsonValue();
		init_appTask();
		init_appTaskDraftNoise();
		init_appTaskDraftText();
		init_appTaskDraftScalars();
		init_attributeRank();
		init_memberPairing();
		init_appTaskDraftSteps();
		init_positionalKeys();
		init_viewPointer();
		init_viewSelector();
		init_selectorCandidates();
		MAX_GUARDS$1 = 4;
		MAX_GUARDS_PER_CHECK = 2;
		MAX_SIBLINGS_READ = 16;
		guardAt = (context, check, pointer) => {
			const { ends, file } = context;
			if (context.noisy(pointer) || !context.named(ends.baseline, pointer) || !context.named(ends.final, pointer)) return undefined;
			const before = resolvePointer$1(ends.baseline, pointer, "xml");
			const after = resolvePointer$1(ends.final, pointer, "xml");
			if (before === undefined || after === undefined) return undefined;
			if (check.kind === "value_equals" && "tolerance" in check && isXmlElement(before) && isXmlElement(after)) {
				const value = elementText(before);
				if (value.trim() === "" || value !== elementText(after) || value.length > context.chars || holdsNoisyText(before) || holdsNoisyText(after) || holdsSplitDate(ends.baseline, pointer) || holdsSplitDate(ends.final, pointer) || isStamp(value)) return undefined;
				return decimalOf(value) === undefined ? {
					kind: "text_equals",
					file,
					pointer,
					value
				} : valueEqualsCheck(file, pointer, value);
			}
			if (check.kind === "text_equals") {
				if (!isXmlElement(before) || !isXmlElement(after)) return undefined;
				const attribute = check.text_attribute;
				const collapsed = check.normalize_whitespace === true;
				const read = (element) => {
					const text = elementText(element, attribute);
					return collapsed ? collapseWhitespace(text) : text;
				};
				const value = read(before);
				return value.trim() !== "" && value === read(after) && value.length <= context.chars && (attribute !== undefined || !holdsNoisyText(before) && !holdsNoisyText(after) && !holdsSplitDate(ends.baseline, pointer) && !holdsSplitDate(ends.final, pointer)) && !isStamp(value) ? {
					kind: "text_equals",
					file,
					pointer,
					value,
					...attribute === undefined ? {} : { text_attribute: attribute },
					...collapsed ? { normalize_whitespace: true } : {}
				} : undefined;
			}
			return typeof before !== "object" && equalJsonValues(before, after) && !isStamp(before) && (typeof before !== "string" || before.length <= context.chars) ? valueEqualsCheck(file, pointer, before) : undefined;
		};
		sharing = (member, likes, key) => {
			const own = attributesOf$2(member);
			const selected = new Set((selectorOf(unescapeJsonPointerToken(key)) ?? []).map(({ key: name }) => name));
			const varying = Object.keys(own).filter((key) => (selected.has(key) || /type$/iu.test(key)) && new Set([member, ...likes].map((item) => isXmlElement(item) ? item.attributes[key] : undefined)).size > 1);
			return (item) => isXmlElement(item) ? varying.filter((key) => item.attributes[key] === own[key]).length : 0;
		};
		siblingsOf = (context, step) => {
			const newer = resolvePointer$1(context.ends.final, step.list, "xml");
			const older = resolvePointer$1(context.ends.baseline, step.list, "xml");
			const member = resolvePointer$1(context.ends.final, `${step.list}/${step.member}`, "xml");
			if (!Array.isArray(newer) || !Array.isArray(older) || !isXmlElement(member)) return {
				siblings: [],
				all: []
			};
			const at = newer.indexOf(member);
			const likes = newer.map((item, index) => ({
				item,
				index
			})).filter(({ item, index }) => index !== at && isXmlElement(item) && item.name === member.name);
			const shares = sharing(member, likes.map(({ item }) => item), step.member);
			likes.sort((left, right) => shares(right.item) - shares(left.item) || Math.abs(left.index - at) - Math.abs(right.index - at) || left.index - right.index);
			const all = older.filter((item) => isXmlElement(item) && item.name === member.name);
			if (likes.length === 0) return {
				siblings: [],
				all
			};
			const pairing = pairMembers(newer, older, holdsTagOnly(step.list), "xml");
			return {
				siblings: likes.flatMap(({ index }) => {
					const key = pairing.newer.keys[index];
					const partner = pairing.newer.partners[index];
					const element = partner === undefined ? undefined : older[partner];
					return key === undefined || /^\d+$/u.test(key) || partner === undefined || pairing.older.keys[partner] !== key || !isXmlElement(element) ? [] : [{
						member: escapeJsonPointerToken(key),
						element
					}];
				}),
				all
			};
		};
		attributesOf$2 = ({ attributes }) => isRecord(attributes) ? attributes : {};
		conditionsOf = (member) => selectorOf(unescapeJsonPointerToken(member)) ?? [];
		attributeRead = (rest) => rest.length === 2 && rest[0] === "attributes" ? unescapeJsonPointerToken(rest[1] ?? "") : undefined;
		readAt = (sibling, rest) => {
			const value = rest.length === 0 ? sibling.element : resolvePointer$1(sibling.element, `/${rest.join("/")}`, "xml");
			return (isXmlElement(value) ? elementText(value) : typeof value === "string" ? value : "").trim();
		};
		selectsByRead = (condition, read, text) => condition.prefix !== "" && (condition.prefix === "@" && condition.key === read || condition.value === text || text.length >= 3 && /\p{L}/u.test(text) && condition.value.includes(text));
		readsSelector = (sibling, rest) => {
			const [read, text] = [attributeRead(rest), readAt(sibling, rest)];
			return conditionsOf(sibling.member).some((condition) => selectsByRead(condition, read, text));
		};
		rekeyed = (context, step, sibling) => {
			const { element } = sibling;
			const tag = typeof element.name === "string" ? element.name : "";
			const [read, text] = [attributeRead(step.rest), readAt(sibling, step.rest)];
			const attributes = Object.entries(attributesOf$2(element)).flatMap(([key, value]) => typeof value === "string" && (isIdentifyingAttribute(key) || isNameLikeKey(key)) && !/[=[\]]/u.test(key) && !value.includes("][") && !isStamp(value) && !isPlaceholder(value) && !isSaveNumberedId(key, value) ? [{
				prefix: "@",
				key,
				value
			}] : []);
			const candidates = [
				...attributes.filter(({ key }) => isIdentifyingAttribute(key)),
				...attributes.filter(({ key }) => !isIdentifyingAttribute(key)),
				...childConditions(element).flatMap((spelled) => selectorOf(spelled) ?? [])
			].filter((condition) => !selectsByRead(condition, read, text));
			const at = (member, view) => resolvePointer$1(view, `${step.list}/${member}`, "xml");
			const end = at(sibling.member, context.ends.final);
			for (const condition of candidates) {
				const member = escapeJsonPointerToken(`[name=${tag}]${spellCondition(condition)}`);
				if (at(member, context.ends.baseline) === element && at(member, context.ends.final) === end) return {
					member,
					element
				};
			}
			return undefined;
		};
		variesAmong = (all) => {
			const known = new Map();
			return (rest) => {
				const pointer = `/${rest.join("/")}`;
				const varied = known.get(pointer) ?? new Set(all.map((item) => JSON.stringify(resolvePointer$1(item, pointer, "xml") ?? null))).size > 1;
				known.set(pointer, varied);
				return varied;
			};
		};
		guardField = (sibling, { all, varies }, rest) => {
			const own = !readsSelector(sibling, rest);
			if (rest.length > 0 && varies(rest) && own) return rest;
			const selected = new Set([...sibling.member.matchAll(/\[@(?<key>[^=\]]+)=/gu)].map(({ groups }) => groups?.key ?? ""));
			const [best] = rankAttributes(Object.entries(attributesOf$2(sibling.element)).flatMap(([key, value]) => typeof value === "string" && !selected.has(key) && !isIdentifyingAttribute(key) && !isStamp(value) && !numberedInOrder(all, String(sibling.element.name), key) && varies(["attributes", escapeJsonPointerToken(key)]) ? [{
				key,
				value
			}] : []));
			if (best !== undefined) return ["attributes", escapeJsonPointerToken(best.key)];
			return own ? rest : undefined;
		};
		siblingGuard = (context, check, place, selected) => {
			const { step, all, varies } = place;
			const sibling = readsSelector(selected, step.rest) ? rekeyed(context, step, selected) ?? selected : selected;
			const field = check.kind === "value_equals" && "tolerance" in check && step.rest.length === 0 ? [] : check.kind === "text_equals" ? step.rest : guardField(sibling, {
				all,
				varies
			}, step.rest);
			return field === undefined || readsSelector(sibling, field) ? undefined : guardAt(context, check, [
				step.list,
				sibling.member,
				...field
			].join("/"));
		};
		guardSteps = (context, pointer) => {
			const steps = listSteps(pointer);
			return steps.flatMap((step, index) => {
				const outer = recordOfField(context.ends.final, step, steps.slice(index + 1));
				return outer === undefined ? [step] : [outer, step];
			});
		};
		guardsFor = (context, check) => {
			if (check.kind !== "value_equals" && check.kind !== "text_equals") return [];
			for (const step of guardSteps(context, check.pointer)) {
				const { siblings, all } = siblingsOf(context, step);
				const varies = variesAmong(all);
				const guards = [];
				for (const sibling of siblings.slice(0, 16)) {
					if (guards.length === 2) break;
					const guard = siblingGuard(context, check, {
						step,
						all,
						varies
					}, sibling);
					if (guard !== undefined) guards.push(guard);
				}
				if (guards.length > 0) return guards;
			}
			return [];
		};
		draftGuards = (context, suggested) => {
			const taken = new Set(suggested.flatMap((check) => "pointer" in check ? [check.pointer] : []));
			const placed = (guard) => "value" in guard && isCoordinates(guard.value) ? 1 : 0;
			const guards = [];
			for (const check of suggested) {
				if (guards.filter((guard) => placed(guard) === 0).length >= 4) break;
				for (const guard of guardsFor(context, check)) if ("pointer" in guard && !taken.has(guard.pointer)) {
					taken.add(guard.pointer);
					guards.push(guard);
				}
			}
			return guards.toSorted((left, right) => placed(left) - placed(right)).slice(0, 4);
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftJson.js
var locatePointer, resolvePointer, generatedRecordId, generatedIdsInAdditions, MAX_COUNTS$1, MAX_COUNT_GUARDS$1, MAX_LISTED$1, ownNameRecord, ownNamesUnreadOtherwise, arrayOf, kindOf$2, membersOf$1, countOf, jsonCounts, addedRecordOf, isLikeDefault, selectsBy, recordGuard, recordGuards, outermost, decisive, positionalNotes;
function init_appTaskDraftJson() {
	return (init_appTaskDraftJson = __esmMin((() => {
		init_jsonPointer();
		init_jsonValue();
		init_appTaskDraftGuards();
		init_appTaskDraftNoise();
		init_appTaskDraftScalars();
		init_jsonRecordPairing();
		init_memberPairing();
		init_viewPointer();
		init_viewSelector();
		locatePointer = (view, pointer) => locatePointer$1(view, pointer, "json");
		resolvePointer = (view, pointer) => resolvePointer$1(view, pointer, "json");
		generatedRecordId = (ends, format) => {
			const lists = new Map();
			return (pointer) => {
				const segments = pointer.split("/");
				if (segments.length < 3) return false;
				const field = unescapeJsonPointerToken(segments.at(-1));
				if (!isRecordIdField(field)) return false;
				const member = unescapeJsonPointerToken(segments.at(-2));
				const list = segments.slice(0, -2).join("/");
				if (!lists.has(list)) {
					const after = resolvePointer$1(ends.final, list, format);
					const before = resolvePointer$1(ends.baseline, list, format);
					const paired = Array.isArray(after) ? pairRecordsById(after, Array.isArray(before) ? before : []) : undefined;
					lists.set(list, paired === undefined ? undefined : {
						field: paired.idField,
						generated: new Set(paired.newer.keys.filter((_, index) => paired.generated[index] === true))
					});
				}
				const paired = lists.get(list);
				if (paired === undefined || field !== paired.field || member === undefined) return false;
				return paired.generated.has(member);
			};
		};
		generatedIdsInAdditions = (ends, format, pointers, isJson, generatedId) => {
			const found = new Set();
			const pending = [];
			for (const pointer of pointers) {
				const value = resolvePointer$1(ends.final, pointer, format);
				if (value !== undefined && isJson(pointer)) pending.push({
					pointer,
					value
				});
			}
			while (pending.length > 0) {
				const item = pending.pop();
				if (item === undefined) break;
				const { pointer, value } = item;
				if (typeof value === "string" && generatedId(pointer)) found.add(value);
				else if (Array.isArray(value)) {
					const { keys } = pairMembers(value, [], undefined, "json").newer;
					value.forEach((child, index) => pending.push({
						pointer: `${pointer}/${escapeJsonPointerToken(keys[index] ?? String(index))}`,
						value: child
					}));
				} else if (value !== null && typeof value === "object") {
					for (const [key, child] of Object.entries(value)) pending.push({
						pointer: `${pointer}/${escapeJsonPointerToken(key)}`,
						value: child
					});
				}
			}
			return found;
		};
		MAX_COUNTS$1 = 2;
		MAX_COUNT_GUARDS$1 = 1;
		MAX_LISTED$1 = 5;
		ownNameRecord = (pointer) => {
			const spelled = pointer.split("/");
			const segments = spelled.map(unescapeJsonPointerToken);
			const at = segments.findIndex((segment, index) => {
				const conditions = selectorOf(segment) ?? [];
				const rest = segments.slice(index + 1).join("/");
				return conditions.some(({ prefix }) => prefix === ">") && conditions.some(({ prefix, key }) => prefix !== "@" && key === rest);
			});
			return at === -1 ? undefined : spelled.slice(0, at + 1).join("/");
		};
		ownNamesUnreadOtherwise = (checks) => {
			const records = checks.map((check) => "pointer" in check ? ownNameRecord(check.pointer) : undefined);
			const read = new Set();
			const reads = (pointer) => {
				const parts = pointer.split("/");
				for (let end = 1; end < parts.length; end += 1) read.add(parts.slice(0, end).join("/"));
			};
			const kept = checks.filter((check, index) => {
				if (records[index] !== undefined) return false;
				if ("pointer" in check) reads(check.pointer);
				return true;
			});
			checks.forEach((check, index) => {
				const record = records[index];
				if (record === undefined || read.has(record) || !("pointer" in check)) return;
				reads(check.pointer);
				kept.push(check);
			});
			return kept;
		};
		arrayOf = (view, pointer) => {
			const list = pointer.replace(/\/[^/]+$/u, "");
			if (list === pointer) return undefined;
			const items = list === "" ? view : resolvePointer(view, list);
			return Array.isArray(items) ? list : undefined;
		};
		kindOf$2 = (member, items) => {
			if (!isRecord(member)) return undefined;
			const key = Object.keys(member).find((field) => KIND_FIELD.test(field));
			const value = key === undefined ? undefined : member[key];
			return key === undefined || typeof value !== "string" || value.includes("][") || !items.every((item) => isRecord(item) && typeof item[key] === "string") ? undefined : {
				key,
				value
			};
		};
		membersOf$1 = (view, { list, kind }) => {
			const items = list === "" ? view : resolvePointer(view, list);
			return (Array.isArray(items) ? items : []).filter((item) => kind === undefined || isRecord(item) && item[kind.key] === kind.value);
		};
		countOf = (file, counted, view) => ({
			kind: "member_count",
			file,
			pointer: counted.list,
			...counted.kind === undefined ? {} : { matching: spellCondition({
				prefix: "",
				...counted.kind
			}) },
			equals: membersOf$1(view, counted).length
		});
		jsonCounts = (file, change, ends) => {
			const named = (list, view) => locatePointer(view, list).byPosition.length === 0;
			const lists = new Map();
			const note = (pointer, view) => {
				const list = arrayOf(view, pointer);
				const items = list === undefined ? [] : resolvePointer(view, list);
				const atEnd = list === undefined ? undefined : list === "" ? ends.final : resolvePointer(ends.final, list);
				if (list === undefined || !Array.isArray(atEnd) || !named(list, ends.baseline) || !named(list, ends.final)) return;
				const kind = kindOf$2(resolvePointer(view, pointer), Array.isArray(items) ? items : []);
				const counted = {
					list,
					...kind && { kind }
				};
				lists.set(JSON.stringify(counted), counted);
			};
			for (const pointer of change.added) note(pointer, ends.final);
			for (const pointer of change.removed) note(pointer, ends.baseline);
			const depth = ({ list }) => list.split("/").length;
			const checks = [...lists.values()].toSorted((left, right) => depth(left) - depth(right)).filter((counted) => {
				const [seed, end] = [ends.baseline, ends.final].map((view) => membersOf$1(view, counted).length);
				return seed !== end && Math.max(seed ?? 0, end ?? 0) > 1;
			}).map((counted) => countOf(file, counted, ends.final)).slice(0, MAX_COUNTS$1);
			const guards = [];
			const tried = new Set();
			for (const pointer of change.changed) {
				const segments = pointer.split("/");
				for (let index = segments.length - 1; index > 0; index -= 1) {
					const list = segments.slice(0, index).join("/");
					const counted = { list };
					if (tried.has(list)) continue;
					tried.add(list);
					const items = list === "" ? ends.final : resolvePointer(ends.final, list);
					if (Array.isArray(items) && !lists.has(JSON.stringify(counted)) && named(list, ends.baseline) && named(list, ends.final) && membersOf$1(ends.baseline, counted).length > 1 && membersOf$1(ends.baseline, counted).length === membersOf$1(ends.final, counted).length) {
						guards.push(countOf(file, counted, ends.baseline));
						break;
					}
				}
				if (guards.length === MAX_COUNT_GUARDS$1) break;
			}
			return {
				checks,
				guards
			};
		};
		addedRecordOf = (ends, added, pointer) => {
			const segments = pointer.split("/");
			for (let index = segments.length - 1; index >= 1; index -= 1) {
				const list = segments.slice(0, index).join("/");
				const items = resolvePointer(ends.final, list);
				const member = segments[index] ?? "";
				const record = resolvePointer(ends.final, `${list}/${member}`);
				if (!Array.isArray(items) || !isRecord(record)) continue;
				if (!added.has(`${list}/${member}`)) return undefined;
				const kind = kindOf$2(record, items);
				const like = (item) => item !== record && isRecord(item) && (kind === undefined || item[kind.key] === kind.value);
				const older = resolvePointer(ends.baseline, list);
				return {
					list,
					member,
					place: items.indexOf(record),
					field: `/${segments.slice(index + 1).join("/")}`,
					likes: {
						baseline: (Array.isArray(older) ? older : []).filter(like),
						final: items.flatMap((item, place) => like(item) ? [{
							item,
							place
						}] : [])
					}
				};
			}
			return undefined;
		};
		isLikeDefault = (ends, added, pointer, value) => {
			const record = addedRecordOf(ends, added, pointer);
			return record !== undefined && record.field !== "/" && record.likes.final.length > 0 && record.likes.final.every(({ item }) => equalJsonValues(resolvePointer(item, record.field), value));
		};
		selectsBy = (member, field) => {
			const path = jsonPointerTokens(field).join("/");
			return (selectorOf(member) ?? []).some(({ prefix, key }) => prefix !== "@" && key === path);
		};
		recordGuard = (file, ends, member, field) => {
			const pointer = `${member}${field}`;
			const [before, after] = [ends.baseline, ends.final].map((view) => locatePointer(view, pointer).byPosition.length === 0 ? resolvePointer(view, pointer) : undefined);
			return before !== undefined && after !== undefined && typeof before !== "object" && equalJsonValues(after, before) && !isStamp(before) ? valueEqualsCheck(file, pointer, before) : undefined;
		};
		recordGuards = (file, suggested, ends, added) => {
			const taken = new Set(suggested.flatMap((check) => "pointer" in check ? [check.pointer] : []));
			const pairings = new Map();
			const pairingOf = (list) => {
				const known = pairings.get(list);
				if (known !== undefined) return known;
				const [newer = [], older = []] = [ends.final, ends.baseline].map((view) => {
					const items = resolvePointer(view, list);
					return Array.isArray(items) ? items : [];
				});
				const pairing = pairMembers(newer, older, undefined, "json");
				pairings.set(list, pairing);
				return pairing;
			};
			const guards = [];
			for (const check of suggested) {
				if (guards.length >= 4) break;
				const record = check.kind === "value_equals" ? addedRecordOf(ends, added, check.pointer) : undefined;
				if (record === undefined || /^\d+$/u.test(record.member) || record.field === "/" || new Set(record.likes.baseline.map((item) => JSON.stringify(resolvePointer(item, record.field) ?? null))).size < 2) continue;
				const pairing = pairingOf(record.list);
				const siblings = record.likes.final.toSorted((left, right) => Math.abs(left.place - record.place) - Math.abs(right.place - record.place) || left.place - right.place).flatMap(({ place }) => {
					const key = pairing.newer.keys[place];
					const partner = pairing.newer.partners[place];
					return key === undefined || /^\d+$/u.test(key) || partner === undefined || pairing.older.keys[partner] !== key || selectsBy(key, record.field) ? [] : [`${record.list}/${escapeJsonPointerToken(key)}`];
				}).slice(0, 16);
				let found = 0;
				for (const member of siblings) {
					if (found === 2) break;
					const guard = recordGuard(file, ends, member, record.field);
					if (guard === undefined || !("pointer" in guard) || taken.has(guard.pointer)) continue;
					taken.add(guard.pointer);
					guards.push(guard);
					found += 1;
				}
			}
			return guards.slice(0, 4);
		};
		outermost = (pointers) => pointers.filter((pointer) => !pointers.some((other) => pointer.startsWith(`${other}/`)));
		decisive = (suggestions, ends) => suggestions.filter((check) => check.kind === "value_equals" ? !equalJsonValues(resolvePointer(ends.baseline, check.pointer), check.value) : check.kind !== "value_absent" || locatePointer(ends.final, check.pointer).kind === "none");
		positionalNotes = (file, suggestions, view) => {
			const pointers = suggestions.flatMap((check) => "pointer" in check && locatePointer(view, check.pointer).byPosition.length > 0 ? [check.pointer] : []);
			return pointers.length === 0 ? [] : [{
				code: "by_position",
				file,
				message: `${String(pointers.length)} suggested check(s) of ~/${file} reach their value only by position, as nothing names the record they read: another save may order its array otherwise, so check the record by a value another way, such as a count.`,
				pointers: pointers.slice(0, MAX_LISTED$1)
			}];
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftFileNotes.js
var FILE_NOTE_CODES, MAX_LISTED, generatedReferenceNotes, viewNotes, factNotes, fileNotes, OPENING_CHARS, textOpening, textOpensXml, readAsTextNotes;
function init_appTaskDraftFileNotes() {
	return (init_appTaskDraftFileNotes = __esmMin((() => {
		init_xmlDocument();
		init_stateFormats();
		FILE_NOTE_CODES = [
			"by_position",
			"view_state_only",
			"long_text",
			"cut_view",
			"unreadable_view",
			"volatile_lines",
			"generated_reference",
			"read_as_text"
		];
		MAX_LISTED = 5;
		generatedReferenceNotes = (file, pointers) => pointers.length === 0 ? [] : [{
			code: "generated_reference",
			file,
			message: "Some array values refer to newly generated record IDs and cannot be checked exactly across runs; review the relationship manually.",
			pointers: pointers.slice(0, MAX_LISTED)
		}];
		viewNotes = (file, change) => {
			const home = `~/${file}`;
			if (change.kind === "unreadable" || change.kind === "format" || change.kind === "content" && change.format === "binary") return [{
				code: "unreadable_view",
				file,
				message: change.format === "binary" ? `REA reads ${home} as binary, so no check can look inside it on its own: give the task one of its readers, the app's own headless command printing what the file holds, and check that reader's view; or save it in a format the app offers that REA reads, such as XML, JSON or text, plain or gzip-compressed, or a zip document, and capture again.` : `REA could not read ${home} at one end the same way as at the other, so no check can look inside it; its versions' view_error says why.`
			}];
			return change.kind === "content" || change.complete === false ? [{
				code: "cut_view",
				file,
				message: `REA's view of ${home} holds only part of it, so the change may lie outside what a check can see; check what the views do show, or keep the document smaller.`
			}] : [];
		};
		factNotes = (file, facts) => {
			const home = `~/${file}`;
			const notes = [];
			if (facts.positional > 0 || facts.changes === 0) {
				const elements = facts.positionalTags.slice(0, MAX_LISTED);
				notes.push({
					code: "by_position",
					file,
					message: facts.changes === 0 ? `${home} changed only in where its elements sit, which no check names; check a value an attribute names instead.` : `${String(facts.positional)} change(s) in ${home} reach their element only by position, so no check names them${elements.length === 0 ? "" : `: ${elements.join(", ")} has no attribute naming it alone among its siblings`}. Their values carry note by_position; check an ancestor's text or a value an attribute names, or give the element a name in the app.`,
					...elements.length === 0 ? {} : { elements }
				});
			}
			if (facts.changes > 0 && facts.noise === facts.changes) notes.push({
				code: "view_state_only",
				file,
				message: `Every change in ${home} is view state, a renumbered id, a volatile value or a time the app stamps, not an edit: ${facts.flagged.length === 0 ? "no check is suggested" : "the suggested checks are those, kept so the draft is not empty"}. Save the edit the task is about, then capture again.`,
				...facts.flagged.length === 0 ? {} : { pointers: facts.flagged.slice(0, MAX_LISTED) }
			});
			if (facts.long.length > 0) notes.push({
				code: "long_text",
				file,
				message: `${String(facts.long.length)} value(s) in ${home} exceed the 2,000-character check limit, so whole-value checks were omitted; use a smaller check where supported.`,
				pointers: facts.long.slice(0, MAX_LISTED)
			});
			return notes;
		};
		fileNotes = (file, change, facts) => [...viewNotes(file, change), ...facts === undefined ? [] : factNotes(file, facts)];
		OPENING_CHARS = 2048;
		textOpening = (lines) => {
			let opening = "";
			for (const line of lines) {
				opening += `${line}\n`;
				if (opening.length > OPENING_CHARS) break;
			}
			return opening.trimStart();
		};
		textOpensXml = (lines) => opensLikeXml(textOpening(lines));
		readAsTextNotes = (file, lines) => {
			const opening = textOpening(lines);
			if (!opensLikeXml(opening)) return [];
			if (!doctypeHasInternalSubset(opening) && isWellFormedXml(opening, XML_POLICY)) return [];
			const why = doctypeHasInternalSubset(opening) ? "its DOCTYPE has an internal subset, which can declare entities" : isWellFormedXml(opening, { doctype: "external" }) ? "its XML names are not supported by the exported reader" : "it is not well-formed XML";
			return [{
				code: "read_as_text",
				file,
				message: `~/${file} opens like XML but reads as text, since ${why}, so its checks compare lines, each holding its attributes in the order the app wrote them.`
			}];
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftLineGuards.js
var MAX_GUARD_LINES, NEIGHBOURHOOD, MAX_GUARD_TEXT, markerOf, isCommand, isMarkup, keywordOf, kindOf$1, tally, lineGuards, TOKEN, volatileAt, addedLineChecks;
function init_appTaskDraftLineGuards() {
	return (init_appTaskDraftLineGuards = __esmMin((() => {
		init_xmlDocument();
		init_appTaskDraftNoise();
		init_appTaskDraftFileNotes();
		MAX_GUARD_LINES = 2;
		NEIGHBOURHOOD = 6;
		MAX_GUARD_TEXT = 2e3;
		markerOf = (line) => /^\s*(?<marker>\[[ xX*>]?\]|[-*+•]|\d+[.)])\s/u.exec(line)?.groups?.marker;
		isCommand = (line) => /^\s*\\[\p{L}_]+\b/u.test(line);
		isMarkup = (line) => isCommand(line) || !/[\p{L}\d]/u.test(line.replaceAll(/<[^>]*>/gu, "").replace(/^\s*[^\s:]+:\s*$/u, ""));
		keywordOf = (line) => /^\s*(?<keyword>[A-Za-z_][\w.-]*)(?:\s*[:=]|\s+")/u.exec(line)?.groups?.keyword;
		kindOf$1 = (lines, index) => {
			const line = lines[index] ?? "";
			const marker = markerOf(line);
			const opener = lines[index - 1];
			const keyword = keywordOf(line);
			return marker !== undefined ? `marker\u0000${marker}` : opener !== undefined && isCommand(opener) ? `opens\u0000${opener.trim()}` : keyword === undefined ? undefined : `keyword\u0000${keyword}`;
		};
		tally = (lines) => {
			const counts = new Map();
			for (const line of lines) counts.set(line, (counts.get(line) ?? 0) + 1);
			return counts;
		};
		lineGuards = (file, before, after) => {
			const [seed, end] = [tally(before), tally(after)];
			const at = after.findIndex((line) => !seed.has(line));
			if (at < 0) return [];
			const kind = kindOf$1(after, at);
			const kept = after.map((line, index) => ({
				line,
				index
			})).filter(({ line, index }) => index !== at && seed.get(line) === 1 && end.get(line) === 1 && line.length <= MAX_GUARD_TEXT && /[\p{L}\d]/u.test(line) && !isMarkup(line)).toSorted((left, right) => Math.abs(left.index - at) - Math.abs(right.index - at) || left.index - right.index);
			const siblings = kept.filter(({ index }) => kind !== undefined && kindOf$1(after, index) === kind);
			const near = kept.filter(({ index }) => Math.abs(index - at) <= NEIGHBOURHOOD);
			const lines = (siblings.length > 0 ? siblings : near).slice(0, MAX_GUARD_LINES).toSorted((left, right) => left.index - right.index).map(({ line }) => line);
			return lines.length === 0 ? [] : [{
				kind: "lines_present",
				file,
				lines
			}];
		};
		TOKEN = /[\p{L}\d_-]+/gu;
		volatileAt = (line, xmlQuotes, enclosingQuote) => {
			let end = 0;
			let quote = enclosingQuote;
			let xmlAttribute = enclosingQuote !== undefined;
			let previous;
			let previousOutside = false;
			for (const { 0: token, index } of line.matchAll(TOKEN)) {
				const gap = line.slice(end, index);
				const key = quote === undefined && previousOutside && /^\s*=\s*["']?$/u.test(gap) ? previous : undefined;
				for (let at = 0; at < gap.length; at += 1) {
					const character = gap[at];
					if (character === "\\" && quote !== undefined && !xmlAttribute) {
						at += 1;
					} else if (character === quote) {
						quote = undefined;
						xmlAttribute = false;
					} else if (quote === undefined && (character === "\"" || character === "'" && /[\s=]/u.test(line[end + at - 1] ?? " "))) {
						quote = character;
						xmlAttribute = xmlQuotes.has(end + at);
					}
				}
				if (xmlAttribute && (isVolatileValue(token, key !== undefined && isBookkeepingName(key)) && !isUuid(token) || key !== undefined && /^(?:[^:]+:)?id$/iu.test(key) && /^\p{L}+_\d{6,}$/u.test(token))) return index;
				previous = token;
				previousOutside = quote === undefined;
				end = index + token.length;
			}
			return -1;
		};
		addedLineChecks = (file, lines, { added, counted }) => {
			const holding = (all, text) => all.filter((line) => line.includes(text)).length;
			const isXml = textOpensXml(lines.after);
			const source = isXml ? lines.after.join("\n") : "";
			const parsed = isXml ? xmlAttributeQuoteRanges(source) : undefined;
			const ranges = parsed === undefined ? [] : parsed.ok ? parsed.value : parsed.error.ranges;
			const examined = parsed?.ok === false ? parsed.error.examined : source.length;
			const addedSet = new Set(added);
			const classifications = new Map();
			const unexamined = new Set();
			let lineStart = 0;
			let nextRange = 0;
			for (const line of lines.after) {
				const quoteStarts = new Set();
				const lineEnd = lineStart + line.length;
				while (nextRange < ranges.length && ranges[nextRange].end < lineStart) nextRange += 1;
				let enclosingQuote;
				for (let index = nextRange; index < ranges.length; index += 1) {
					const range = ranges[index];
					if (range.start >= lineEnd) break;
					if (range.start < lineStart) enclosingQuote = source[range.start];
					else quoteStarts.add(range.start - lineStart);
				}
				if (addedSet.has(line)) {
					if (parsed?.ok === false && lineEnd > examined) {
						unexamined.add(line);
						lineStart = lineEnd + 1;
						continue;
					}
					const at = volatileAt(line, quoteStarts, enclosingQuote);
					const previous = classifications.get(line);
					if (previous === undefined || at >= 0 && (previous < 0 || at < previous)) classifications.set(line, at);
				}
				lineStart = lineEnd + 1;
			}
			const classified = added.filter((line) => !unexamined.has(line)).map((line) => ({
				line,
				at: classifications.get(line) ?? -1
			}));
			const whole = classified.filter(({ at }) => at < 0).map(({ line }) => line);
			const prefixes = new Set();
			let unnamed = 0;
			for (const { line, at } of classified.filter(({ at }) => counted && at >= 0)) {
				const prefix = line.slice(0, at).trimStart();
				const equals = holding(lines.after, prefix);
				if (prefix.trim().length >= 3 && /\p{L}/u.test(prefix) && equals !== holding(lines.before, prefix)) prefixes.add(prefix);
				else unnamed += 1;
			}
			return {
				checks: [...whole.length > 0 ? [{
					kind: "lines_present",
					file,
					lines: whole
				}] : [], ...[...prefixes].map((contains) => ({
					kind: "line_count",
					file,
					contains,
					equals: holding(lines.after, contains)
				}))],
				notes: [...unexamined.size === 0 ? [] : [{
					code: "read_as_text",
					file,
					message: `REA could not locate XML attributes in ${String(unexamined.size)} added line(s) of ~/${file}, so no checks are suggested for them; inspect the changed text and add checks manually.`
				}], ...unnamed === 0 ? [] : [{
					code: "volatile_lines",
					file,
					message: `${String(unnamed)} line(s) ~/${file} gained hold a value the app generates, an id or a time, and no text before it tells them apart, so no check of them is suggested: check what the line says with line_count and contains.`
				}]]
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftAdded.js
var MAX_ATTRIBUTE_CHECKS, MAX_FIELD_CHECKS, ID_FIELD, MIN_COPIED, MIN_FIELD_CHARS, checkFits, attributesOf$1, listOf$1, parentElementOf, likeCount, copiesSibling, idsIn, selectorKeys, attributeChecks, keptFieldPieces, plainText, keptNamedAncestor, fieldChecks, sharedFields, selectorFields, recordChecks, holdsIds, recordList, fieldsOf$1;
function init_appTaskDraftAdded() {
	return (init_appTaskDraftAdded = __esmMin((() => {
		init_jsonPointer();
		init_appTask();
		init_appTaskDraftNoise();
		init_appTaskDraftScalars();
		init_appTaskDraftText();
		init_attributeRank();
		init_memberPairing();
		init_viewPointer();
		init_viewSelector();
		MAX_ATTRIBUTE_CHECKS = 6;
		MAX_FIELD_CHECKS = 5;
		ID_FIELD = /^(?:[^:]*:)?x?id$/iu;
		MIN_COPIED = 2;
		MIN_FIELD_CHARS = 3;
		checkFits = (context, pointer, value) => {
			if (value.length <= context.chars) return true;
			context.long?.push(pointer);
			return false;
		};
		attributesOf$1 = (element) => isRecord(element.attributes) ? element.attributes : {};
		listOf$1 = (pointer) => pointer.replace(/\/[^/]+$/u, "");
		parentElementOf = (pointer) => /^(?<parent>.+)\/children\/[^/]+$/u.exec(pointer)?.groups?.parent;
		likeCount = (view, pointer, tag) => {
			const list = resolvePointer$1(view, listOf$1(pointer), "xml");
			return Array.isArray(list) ? list.filter((item) => isXmlElement(item) && item.name === tag).length : 0;
		};
		copiesSibling = ({ ends }, pointer, element, attributes) => attributes.length >= MIN_COPIED && [ends.baseline, ends.final].some((view) => {
			const list = resolvePointer$1(view, listOf$1(pointer), "xml");
			return Array.isArray(list) && list.some((item) => item !== element && isXmlElement(item) && item.name === element.name && attributes.every(({ key, value }) => attributesOf$1(item)[key] === value));
		});
		idsIn = (roots) => {
			const ids = new Set();
			const pending = [];
			for (const root of roots) pending.push(root);
			for (let node = pending.pop(); node !== undefined; node = pending.pop()) {
				if (isXmlElement(node)) {
					if (isViewStateName(node.name)) continue;
					for (const [key, value] of Object.entries(node.attributes)) if (typeof value === "string" && /^(?:[^:]*:)?(?:id|key)$/iu.test(key)) ids.add(value);
					for (const child of node.children) pending.push(child);
				} else if (isRecord(node)) {
					for (const child of Object.values(node)) pending.push(child);
				} else if (Array.isArray(node)) {
					for (const child of node) pending.push(child);
				}
			}
			return ids;
		};
		selectorKeys = (pointer) => {
			const segment = unescapeJsonPointerToken(pointer.split("/").at(-1) ?? "");
			return new Set([...segment.matchAll(/\[@(?<key>[^=\]]+)=/gu)].map((match) => match.groups?.key ?? ""));
		};
		attributeChecks = (context, pointer, element) => {
			const { ends, file } = context;
			if (likeCount(ends.final, pointer, element.name) < 2 && likeCount(ends.baseline, pointer, element.name) === 0) return [];
			const selected = selectorKeys(pointer);
			const own = Object.entries(isRecord(element.attributes) ? element.attributes : {}).flatMap(([key, value]) => typeof value === "string" && !selected.has(key) && !isIdentifyingAttribute(key) ? [{
				key,
				value
			}] : []);
			let fields = own;
			if (copiesSibling(context, pointer, element, own)) {
				const ids = idsIn(context.referenceRoots());
				fields = own.filter(({ value }) => ids.has(value) && !/^-?\d+$/u.test(value));
				if (fields.length === 0) return [];
			}
			const nested = element.children.some(isXmlElement);
			const list = resolvePointer$1(ends.final, listOf$1(pointer), "xml");
			const likes = (Array.isArray(list) ? list : []).filter((item) => item !== element && isXmlElement(item) && item.name === element.name);
			const everywhere = (key, value) => likes.every((item) => isXmlElement(item) && attributesOf$1(item)[key] === value);
			const usual = (key, value) => likes.length > 1 && everywhere(key, value) ? 1 : 0;
			const eligible = fields.filter(({ key, value }) => !(nested && everywhere(key, value)) && !isPlaceholder(value) && !isStamp(value) && !isVolatileValue(value, isBookkeeping(element) || isBookkeepingName(key)) && !isViewStateName(key));
			return rankAttributes(eligible.filter(({ key, value }) => checkFits(context, `${pointer}/attributes/${escapeJsonPointerToken(key)}`, value))).toSorted((left, right) => usual(left.key, left.value) - usual(right.key, right.value)).slice(0, MAX_ATTRIBUTE_CHECKS).map(({ key, value }) => valueEqualsCheck(file, `${pointer}/attributes/${escapeJsonPointerToken(key)}`, value));
		};
		keptFieldPieces = (node, bookkeeping = false) => {
			const pieces = [];
			let run = "";
			const flush = () => {
				if (run !== "") pieces.push(run);
				run = "";
			};
			const visit = (value, inBookkeeping) => {
				if (typeof value === "string") {
					if (isStamp(value) || isVolatileValue(value.trim(), inBookkeeping)) flush();
					else run += value;
					return;
				}
				if (!isXmlElement(value)) return;
				if (isStamp(elementText(value))) {
					flush();
					return;
				}
				const nestedBookkeeping = inBookkeeping || isBookkeeping(value);
				for (const child of value.children) visit(child, nestedBookkeeping);
			};
			visit(node, bookkeeping);
			flush();
			return pieces;
		};
		plainText = (node, bookkeeping = false) => {
			if (typeof node === "string") return isStamp(node) || isVolatileValue(node.trim(), bookkeeping) ? "" : node;
			if (!isXmlElement(node)) return "";
			if (isStamp(elementText(node))) return "";
			return node.children.map((child) => plainText(child, bookkeeping || isBookkeeping(node))).join("");
		};
		keptNamedAncestor = (context, pointer) => {
			const { ends } = context;
			for (let at = parentElementOf(pointer); at !== undefined; at = parentElementOf(at)) if (context.named(ends.final, at) && isXmlElement(resolvePointer$1(ends.baseline, at, "xml")) && isXmlElement(resolvePointer$1(ends.final, at, "xml"))) return at;
			return undefined;
		};
		fieldChecks = (context, pointer, element) => {
			const { ends, file } = context;
			if (!isRecordAt(ends.final, pointer, element) || likeCount(ends.final, pointer, element.name) < 2) return [];
			const at = keptNamedAncestor(context, pointer);
			if (at === undefined) return [];
			const onRecord = context.named(ends.final, pointer);
			const seen = onRecord ? "" : elementText(resolvePointer$1(ends.baseline, at, "xml") ?? null);
			const { keys } = pairMembers(element.children, [], undefined, "xml").newer;
			const texts = [];
			let alreadySeen = false;
			element.children.forEach((field, index) => {
				if (!isXmlElement(field)) return;
				const key = keys[index] ?? String(index);
				const fieldAt = `${pointer}/children/${key.startsWith("[") ? escapeJsonPointerToken(key) : key}`;
				if (ID_FIELD.test(field.name) || inSplitDate(ends.final, fieldAt) || context.noisy?.(fieldAt) === true) return;
				for (const value of keptFieldPieces(field)) {
					const text = value.trim();
					if (text.length < MIN_FIELD_CHARS || !/[\p{L}\d]/u.test(text) || isStamp(text) || isVolatileValue(text, isBookkeeping(field))) continue;
					if (seen.includes(text)) {
						alreadySeen = true;
						continue;
					}
					if (value.length > context.chars) {
						context.long?.push(fieldAt);
						continue;
					}
					texts.push(text);
				}
			});
			if (texts.length > 0) return [...new Set(texts)].slice(0, MAX_FIELD_CHECKS).map((value) => ({
				kind: "text_contains",
				file,
				pointer: onRecord ? pointer : at,
				value
			}));
			if (onRecord) return [];
			const holder = resolvePointer$1(ends.final, at, "xml");
			const before = resolvePointer$1(ends.baseline, at, "xml");
			const now = elementText(holder ?? null);
			const plain = plainText(holder ?? null);
			const seedPlain = plainText(before ?? null);
			if (!alreadySeen || plain === seedPlain || plain.length === 0 || plain.length > context.chars) return [];
			if (plain === now) return [{
				kind: "text_equals",
				file,
				pointer: at,
				value: now
			}];
			const addedPlain = plainText(element);
			const seed = elementText(before ?? null);
			return addedPlain.length >= MIN_FIELD_CHARS && now.includes(addedPlain) && !seed.includes(addedPlain) ? [{
				kind: "text_contains",
				file,
				pointer: at,
				value: addedPlain
			}] : [];
		};
		sharedFields = ({ ends }, pointer, element) => {
			const list = resolvePointer$1(ends.final, listOf$1(pointer), "xml");
			const likes = (Array.isArray(list) ? list : []).filter((item) => item !== element && isXmlElement(item) && item.name === element.name);
			const fields = likes.map((item) => new Set((isXmlElement(item) ? item.children : []).flatMap((field) => isXmlElement(field) ? [`${field.name}\u0000${elementText(field)}`] : [])));
			const [first, ...rest] = fields;
			return new Set([...first ?? []].filter((field) => rest.every((own) => own.has(field))));
		};
		selectorFields = (pointer) => new Set((selectorOf(unescapeJsonPointerToken(pointer.split("/").at(-1) ?? "")) ?? []).filter(({ prefix }) => prefix === ">").map(({ key, value }) => `${key}\u0000${value}`));
		recordChecks = (context, pointer, element) => {
			const { ends } = context;
			if (!isRecordAt(ends.final, pointer, element) || likeCount(ends.final, pointer, element.name) < 2 && likeCount(ends.baseline, pointer, element.name) === 0) return [];
			const fields = fieldsOf$1(context, pointer, element, { nested: true });
			return (fields.length > 0 ? fields : fieldsOf$1(context, pointer, element, {
				nested: true,
				selector: true
			})).slice(0, MAX_FIELD_CHECKS);
		};
		holdsIds = (element) => element.children.some((child) => isXmlElement(child) && (ID_FIELD.test(child.name) || holdsIds(child)));
		recordList = (field) => {
			const records = field.children.filter(isXmlElement);
			return records.length > 0 && records.every((record) => record.name === records[0]?.name && holdsFields(record));
		};
		fieldsOf$1 = (context, pointer, element, { nested, selector = false }) => {
			const { ends, file } = context;
			const { keys } = pairMembers(element.children, [], undefined, "xml").newer;
			const skipped = new Set([...sharedFields(context, pointer, element), ...selector ? [] : selectorFields(pointer)]);
			return element.children.flatMap((field, index) => {
				const key = keys[index] ?? "";
				const at = `${pointer}/children/${escapeJsonPointerToken(key)}`;
				if (!isXmlElement(field) || !key.startsWith("[") || ID_FIELD.test(field.name) || context.noisy?.(at) === true || [elementText(field), collapseWhitespace(elementText(field))].some((text) => skipped.has(`${field.name}\u0000${text}`)) || inSplitDate(ends.final, at) || !context.named(ends.final, at)) return [];
				if (nested && recordList(field)) {
					const records = pairMembers(field.children, [], undefined, "xml").newer.keys;
					return field.children.flatMap((record, place) => isXmlElement(record) ? fieldsOf$1(context, `${at}/children/${escapeJsonPointerToken(records[place] ?? "")}`, record, { nested: false }) : []);
				}
				const pieces = keptFieldPieces(field).filter((piece) => {
					const text = piece.trim();
					return text !== "" && !isStamp(text) && !isVolatileValue(text, isBookkeeping(field));
				});
				if (pieces.length === 0 || holdsIds(field)) return [];
				const whole = elementText(field);
				if (pieces.length === 1 && pieces[0]?.trim() === whole.trim()) {
					const value = whole;
					if (value.length > context.chars) {
						context.long?.push(at);
						return [];
					}
					return [wholeTextCheck(file, at, value, undefined)];
				}
				return pieces.flatMap((value) => value.length > context.chars ? [] : [{
					kind: "text_contains",
					file,
					pointer: at,
					value
				}]);
			});
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftAttributeText.js
var MAX_CLIMB, isFormattingAttribute, parentOf, namedByAttribute, textAt, isNamedRecord, runsOf, holdsRuns, attributeTextCheck, textAttributes, readsText;
function init_appTaskDraftAttributeText() {
	return (init_appTaskDraftAttributeText = __esmMin((() => {
		init_jsonPointer();
		init_appTaskDraftNoise();
		init_attributeRank();
		init_viewPointer();
		MAX_CLIMB = 3;
		isFormattingAttribute = (key) => /(?:font(?:name|size|family)?|face|features|colou?r|weight|size|family|style)$/iu.test(key.split(":").at(-1) ?? key);
		parentOf = (pointer) => /^(?<parent>.+)\/children\/[^/]+$/u.exec(pointer)?.groups?.parent;
		namedByAttribute = (pointer) => (pointer.split("/").at(-1) ?? "").includes("[@");
		textAt = (view, pointer, attribute) => {
			const element = resolvePointer$1(view, pointer, "xml");
			return isXmlElement(element) ? elementText(element, attribute) : undefined;
		};
		isNamedRecord = (node, key) => isXmlElement(node) && Object.keys(node.attributes).some((other) => other !== key && (isIdentifyingAttribute(other) || isNameLikeKey(other)));
		runsOf = (view, pointer, key) => {
			const element = resolvePointer$1(view, pointer, "xml");
			const holds = (node) => isXmlElement(node) && typeof node.attributes[key] === "string";
			let runs = 0;
			const pending = [{
				node: element ?? null,
				inside: false
			}];
			for (let next = pending.pop(); next !== undefined; next = pending.pop()) {
				const { node, inside } = next;
				if (!isXmlElement(node)) continue;
				if (holds(node) && (inside || node === element || isNamedRecord(node, key))) return undefined;
				runs += holds(node) ? 1 : 0;
				for (const child of node.children) pending.push({
					node: child,
					inside: inside || holds(node)
				});
			}
			return runs;
		};
		holdsRuns = ({ ends }, pointer, key) => {
			const views = [ends.baseline, ends.final];
			const runs = views.map((view) => runsOf(view, pointer, key));
			return runs.every((count) => count !== undefined) && (runs.some((count) => (count ?? 0) > 1) || /\s/u.test(textAt(ends.final, pointer, key) ?? "")) && views.every((view) => textAt(view, pointer)?.trim() === "");
		};
		attributeTextCheck = (context, owner, key) => {
			const { ends } = context;
			const element = [ends.final, ends.baseline].map((view) => resolvePointer$1(view, owner, "xml")).find(isXmlElement);
			const value = element?.attributes[key];
			if (isIdentifyingAttribute(key) || isFormattingAttribute(key) || typeof value !== "string" || !/\p{L}/u.test(value) || isStamp(value)) return undefined;
			let at = parentOf(owner);
			for (let climbed = 1; at !== undefined && !namedByAttribute(at) && climbed < MAX_CLIMB; climbed += 1) at = parentOf(at);
			if (at === undefined || parentOf(at) === undefined || !namedByAttribute(at)) return undefined;
			const ancestor = at;
			const after = textAt(ends.final, ancestor, key);
			return holdsRuns(context, ancestor, key) && context.named(ancestor) && after !== undefined && after !== textAt(ends.baseline, ancestor, key) && after.length <= context.chars ? {
				element: ancestor,
				check: {
					kind: "text_equals",
					file: context.file,
					pointer: ancestor,
					value: after,
					text_attribute: key
				}
			} : undefined;
		};
		textAttributes = (change, ends, noise) => {
			const own = (view, pointer) => {
				const element = resolvePointer$1(view, pointer, "xml");
				return isXmlElement(element) ? Object.keys(element.attributes).map((key) => ({
					owner: pointer,
					key
				})) : [];
			};
			return [
				...change.changed.flatMap((pointer) => {
					const key = attributeKeyOf(pointer);
					return key === undefined ? [] : [{
						owner: pointer.split("/").slice(0, -2).join("/"),
						key
					}];
				}),
				...change.added.flatMap((pointer) => own(ends.final, pointer)),
				...change.removed.flatMap((pointer) => own(ends.baseline, pointer))
			].filter(({ owner, key }) => noise(`${owner}/attributes/${escapeJsonPointerToken(key)}`) === undefined);
		};
		readsText = (checked) => (pointer, view) => checked.some(({ element, key }) => {
			const run = resolvePointer$1(view, pointer, "xml");
			return pointer.startsWith(`${element}/`) && (attributeKeyOf(pointer) === key || isXmlElement(run) && typeof run.attributes[key] === "string");
		});
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftCounts.js
var MAX_COUNTS, MAX_COUNT_GUARDS, KIND_KEY, listOf, membersOf, eachOwn, kindOf, keyOf, mixed, matchingOf, countAt, depth, editedList, draftCounts;
function init_appTaskDraftCounts() {
	return (init_appTaskDraftCounts = __esmMin((() => {
		init_appTaskDraftSteps();
		init_viewPointer();
		init_viewSelector();
		MAX_COUNTS = 2;
		MAX_COUNT_GUARDS = 1;
		KIND_KEY = /^(?:[^:]*:)?(?:type|kind|shape)$/iu;
		listOf = (pointer) => /^(?<list>.+\/children)\/[^/]+$/u.exec(pointer)?.groups?.list;
		membersOf = (view, { list, tag, kind }) => {
			const items = resolvePointer$1(view, list, "xml");
			return Array.isArray(items) ? items.filter((item) => isXmlElement(item) && item.name === tag && (kind === undefined || item.attributes[kind.key] === kind.value)) : [];
		};
		eachOwn = (items, tag, key) => {
			const values = (Array.isArray(items) ? items : []).flatMap((item) => isXmlElement(item) && item.name === tag ? [item.attributes[key]] : []);
			return values.length > 1 && new Set(values).size === values.length;
		};
		kindOf = (member, items, before) => {
			if (!isXmlElement(member)) return undefined;
			const key = Object.keys(member.attributes).find((name) => KIND_KEY.test(name));
			const value = key === undefined ? undefined : member.attributes[key];
			return key === undefined || typeof value !== "string" || value.includes("][") || eachOwn(items, member.name, key) || before !== undefined && (!isXmlElement(before) || before.attributes[key] !== value) ? undefined : {
				key,
				value
			};
		};
		keyOf = ({ list, tag, kind }) => JSON.stringify([
			list,
			tag,
			kind?.key,
			kind?.value
		]);
		mixed = ({ ends }, list) => [ends.baseline, ends.final].some((view) => {
			const owner = resolvePointer$1(view, list.slice(0, -"/children".length), "xml");
			return isXmlElement(owner) && owner.children.some((child) => typeof child === "string" && child.trim() !== "");
		});
		matchingOf = ({ tag, kind }) => `[name=${tag}]${kind === undefined ? "" : spellCondition({
			prefix: "@",
			...kind
		})}`;
		countAt = (context, counted, end) => {
			const { ends, file } = context;
			if (!context.whole(ends.baseline, counted.list) || !context.whole(ends.final, counted.list) || mixed(context, counted.list)) return undefined;
			return {
				kind: "member_count",
				file,
				pointer: counted.list,
				matching: matchingOf(counted),
				equals: membersOf(ends[end], counted).length
			};
		};
		depth = ({ list }) => list.split("/").length;
		editedList = ({ ends }, pointer) => {
			const steps = listSteps(pointer, true);
			for (const [index, step] of steps.entries()) {
				const { list } = step;
				const at = `${list}/${step.member}`;
				const member = resolvePointer$1(ends.final, at, "xml");
				const local = isXmlElement(member) ? member.name.split(":").at(-1) ?? member.name : "";
				if (/^(?:itext|tspan|span)$/iu.test(local)) continue;
				if (!isXmlElement(member) || recordOfField(ends.final, step, steps.slice(index + 1)) !== undefined) continue;
				const kind = kindOf(member, resolvePointer$1(ends.final, list, "xml") ?? null, resolvePointer$1(ends.baseline, at, "xml") ?? null);
				const counted = {
					list,
					tag: member.name,
					...kind && { kind }
				};
				if ([ends.baseline, ends.final].every((view) => membersOf(view, counted).length > 1)) return counted;
			}
			return undefined;
		};
		draftCounts = (context, change) => {
			const { ends } = context;
			const changed = new Map();
			const note = (pointer, view) => {
				const list = listOf(pointer);
				const value = resolvePointer$1(view, pointer, "xml");
				if (list === undefined || !isXmlElement(value) || context.noisy(pointer) || context.coveredRun(pointer, view) || context.covered(list.slice(0, -"/children".length))) return;
				const kind = kindOf(value, resolvePointer$1(view, list, "xml") ?? null);
				const counted = {
					list,
					tag: value.name,
					...kind && { kind }
				};
				changed.set(keyOf(counted), counted);
			};
			for (const pointer of change.added) note(pointer, ends.final);
			for (const pointer of change.removed) note(pointer, ends.baseline);
			const checks = [...changed.values()].toSorted((left, right) => depth(left) - depth(right)).filter((counted) => {
				const [seed, end] = [ends.baseline, ends.final].map((view) => membersOf(view, counted).length);
				return seed !== end && Math.max(seed ?? 0, end ?? 0) > 1;
			}).flatMap((counted) => countAt(context, counted, "final") ?? []).slice(0, MAX_COUNTS);
			const edited = new Map();
			for (const pointer of change.changed) {
				const counted = context.noisy(pointer) ? undefined : editedList(context, pointer);
				if (counted !== undefined && !context.covered(counted.list.slice(0, -"/children".length)) && ![...changed.values()].some(({ list, tag }) => list === counted.list && tag === counted.tag)) edited.set(keyOf(counted), counted);
			}
			const guards = [...edited.values()].toSorted((left, right) => depth(left) - depth(right)).filter((counted) => membersOf(ends.baseline, counted).length === membersOf(ends.final, counted).length).flatMap((counted) => countAt(context, counted, "baseline") ?? []).slice(0, MAX_COUNT_GUARDS);
			return {
				checks,
				guards
			};
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftNested.js
var MAX_NESTED_CHECKS, MAX_PER_RECORD, attributesOnly, recordsIn, recordListsOf, cousinsOf, selectable, recordKey, checkedKeys, nestedRecordChecks;
function init_appTaskDraftNested() {
	return (init_appTaskDraftNested = __esmMin((() => {
		init_jsonPointer();
		init_appTaskDraftNoise();
		init_appTaskDraftScalars();
		init_attributeRank();
		init_viewPointer();
		init_viewSelector();
		init_appTaskDraftAdded();
		MAX_NESTED_CHECKS = 6;
		MAX_PER_RECORD = 3;
		attributesOnly = (item) => isXmlElement(item) && Object.keys(item.attributes).length > 0 && item.children.every((child) => typeof child === "string" && child.trim() === "");
		recordsIn = (element) => {
			const items = isXmlElement(element) ? element.children.filter(isXmlElement) : [];
			const records = items.filter(attributesOnly);
			return records.length === items.length && records.every((record) => record.name === records[0]?.name) ? records : [];
		};
		recordListsOf = (element) => {
			const own = recordsIn(element);
			if (own.length > 0) return [{
				steps: [],
				records: own
			}];
			const children = isXmlElement(element) ? element.children.filter(isXmlElement) : [];
			const tags = new Map();
			for (const { name } of children) tags.set(name, (tags.get(name) ?? 0) + 1);
			return children.flatMap((child) => {
				const records = recordsIn(child);
				return records.length > 0 && tags.get(child.name) === 1 && !/[=[\]]/u.test(child.name) ? [{
					steps: ["children", escapeJsonPointerToken(`[name=${child.name}]`)],
					records
				}] : [];
			});
		};
		cousinsOf = (likes, steps, tag) => likes.flatMap((like) => recordsIn(steps.length === 0 ? like : resolvePointer$1(like, `/${steps.join("/")}`, "xml")).filter((record) => record.name === tag));
		selectable = (key, value) => typeof value === "string" && value !== "" && !/[=[\]]/u.test(key) && !value.includes("][") && !isStamp(value) && !isPlaceholder(value) && !isVolatileValue(value, isBookkeepingName(key));
		recordKey = (record, records, cousins, chars) => {
			const values = Object.entries(record.attributes).flatMap(([key, value]) => selectable(key, value) && typeof value === "string" && value.length <= chars ? [{
				key,
				value
			}] : []);
			const repeated = (key, value) => cousins.some((cousin) => cousin.attributes[key] === value);
			const [best] = [...values.filter(({ key, value }) => isIdentifyingAttribute(key) && !isGeneratedId(value) && !repeated(key, value)), ...rankAttributes(values.filter(({ key }) => !isIdentifyingAttribute(key))).filter(({ tier }) => tier < 3)].filter(({ key, value }) => records.filter((other) => other.attributes[key] === value).length === 1);
			return best === undefined ? undefined : {
				key: best.key,
				segment: escapeJsonPointerToken(`[name=${record.name}]${spellCondition({
					prefix: "@",
					...best
				})}`)
			};
		};
		checkedKeys = (record, likes, skip) => {
			const keys = [];
			for (const [key, value] of Object.entries(record.attributes)) {
				const all = likes.map((like) => like.attributes[key]);
				if (key === skip || typeof value !== "string" || isIdentifyingAttribute(key) || isPlaceholder(value) || isStamp(value) || isVolatileValue(value, isBookkeepingName(key)) || isViewStateName(key) || new Set(all).size < 2 || keys.some((earlier) => likes.every((like) => like.attributes[earlier] === like.attributes[key]))) continue;
				keys.push(key);
			}
			return keys;
		};
		nestedRecordChecks = (context, pointer, element) => {
			if (!isXmlElement(element)) return [];
			const list = resolvePointer$1(context.final, pointer.replace(/\/[^/]+$/u, ""), "xml");
			const likes = (Array.isArray(list) ? list : []).filter((item) => item !== element && isXmlElement(item) && item.name === element.name);
			if (likes.length === 0) return [];
			return recordListsOf(element).flatMap(({ steps, records }) => {
				const cousins = cousinsOf(likes, steps, records[0]?.name ?? "");
				return records.flatMap((record) => {
					const key = recordKey(record, records, cousins, context.chars);
					if (key === undefined) return [];
					const at = [
						pointer,
						...steps,
						"children",
						key.segment
					].join("/");
					return checkedKeys(record, [...records, ...cousins], key.key).filter((name) => {
						const value = record.attributes[name];
						return typeof value === "string" && checkFits(context, `${at}/attributes/${escapeJsonPointerToken(name)}`, value);
					}).slice(0, MAX_PER_RECORD).flatMap((name) => {
						const field = `${at}/attributes/${escapeJsonPointerToken(name)}`;
						const value = record.attributes[name];
						return context.named(field) && typeof value === "string" ? [valueEqualsCheck(context.file, field, value)] : [];
					});
				});
			}).slice(0, MAX_NESTED_CHECKS);
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftAlternatives.js
var MAX_ALTERNATIVES, alternativePointers;
function init_appTaskDraftAlternatives() {
	return (init_appTaskDraftAlternatives = __esmMin((() => {
		init_jsonPointer();
		init_appTaskDraftNoise();
		init_attributeRank();
		init_viewPointer();
		init_viewSelector();
		MAX_ALTERNATIVES = 3;
		alternativePointers = (view, pointer) => {
			const segments = pointer.split("/");
			for (let index = segments.length - 1; index >= 2; index -= 1) {
				const conditions = segments[index - 1] === "children" ? selectorOf(unescapeJsonPointerToken(segments[index] ?? "")) : undefined;
				if (conditions === undefined) continue;
				const tagOnly = conditions.every(({ prefix }) => prefix === "");
				const list = resolvePointer$1(view, segments.slice(0, index).join("/"), "xml");
				const element = resolvePointer$1(view, segments.slice(0, index + 1).join("/"), "xml");
				if (!Array.isArray(list) || !isXmlElement(element)) {
					if (tagOnly) continue;
					return [];
				}
				const used = new Set(conditions.flatMap(({ prefix, key }) => prefix === "@" ? [key] : []));
				const reads = segments[index + 1] === "attributes" && index + 3 === segments.length ? unescapeJsonPointerToken(segments[index + 2] ?? "") : undefined;
				const alone = (key, value) => list.filter((item) => isXmlElement(item) && item.name === element.name && item.attributes[key] === value).length === 1;
				const found = Object.entries(element.attributes).flatMap(([key, value]) => typeof value === "string" && (isIdentifyingAttribute(key) || attributeTier(key, value) === 0) && !used.has(key) && key !== reads && !/[=[\]]/u.test(key) && !value.includes("][") && value.trim() !== "" && !isStamp(value) && !isPlaceholder(value) && !isSaveNumberedId(key, value) && alone(key, value) ? [[
					...segments.slice(0, index),
					escapeJsonPointerToken(`[name=${element.name}]${spellCondition({
						prefix: "@",
						key,
						value
					})}`),
					...segments.slice(index + 1)
				].join("/")] : []).slice(0, MAX_ALTERNATIVES);
				if (found.length > 0 || !tagOnly) return found;
			}
			return [];
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/compactValue.js
var attributesOf, previewWriter, isArchiveEntry, compactValue;
function init_compactValue() {
	return (init_compactValue = __esmMin((() => {
		init_excerpt();
		init_viewPointer();
		attributesOf = (element) => {
			const { attributes } = element;
			return isRecord(attributes) ? attributes : {};
		};
		previewWriter = (max) => {
			const parts = [];
			let length = 0;
			const push = (text) => {
				const kept = text.slice(0, Math.max(0, max + 1 - length));
				parts.push(kept);
				length += kept.length;
				return length <= max;
			};
			const escaped = (text, attribute = false) => {
				for (let index = 0; index < text.length; index += 1) {
					const char = text[index] ?? "";
					if (!push(char === "&" ? "&amp;" : char === "<" ? "&lt;" : attribute && char === "\"" ? "&quot;" : char)) return false;
				}
				return true;
			};
			const jsonString = (text) => {
				if (!push("\"")) return false;
				for (let index = 0; index < text.length; index += 1) {
					const code = text.codePointAt(index);
					const width = code !== undefined && code > 65535 ? 2 : 1;
					const encoded = JSON.stringify(text.slice(index, index + width));
					if (!push(encoded.slice(1, -1))) return false;
					index += width - 1;
				}
				return push("\"");
			};
			const startTag = (element) => {
				if (!push("<") || !push(element.name)) return false;
				const attributes = attributesOf(element);
				for (const key in attributes) {
					if (!Object.hasOwn(attributes, key)) continue;
					if (!push(" ") || !push(key) || !push("=\"") || !escaped(String(attributes[key]), true) || !push("\"")) return false;
				}
				return true;
			};
			return {
				push,
				escaped,
				jsonString,
				startTag,
				result: () => ellipsisExcerpt(parts.join(""), max)
			};
		};
		isArchiveEntry = (value) => isRecord(value) && "sha256" in value && "view" in value && "name" in value;
		compactValue = (value, max, format) => {
			if (value === undefined) return null;
			if (typeof value === "string") return ellipsisExcerpt(value, max);
			if (value === null || typeof value !== "object") return value;
			const { push, escaped, jsonString, startTag, result } = previewWriter(max);
			const write = (node) => {
				if (format === "xml" && isXmlElement(node)) {
					if (!startTag(node)) return false;
					if (node.children.length === 0) return push("/>");
					return push(">") && node.children.every((child) => typeof child === "string" ? escaped(child) : write(child)) && push("</") && push(node.name) && push(">");
				}
				if (format === "archive" && isArchiveEntry(node)) return write({
					...node.name === undefined ? {} : { name: node.name },
					format: node.format ?? null,
					size: node.size ?? null
				});
				if (Array.isArray(node)) return push("[") && node.every((item, index) => (index === 0 || push(",")) && write(item)) && push("]");
				if (isRecord(node)) {
					if (!push("{")) return false;
					let first = true;
					for (const key in node) {
						if (!Object.hasOwn(node, key)) continue;
						if (!first && !push(",") || !jsonString(key) || !push(":") || !write(node[key] ?? null)) return false;
						first = false;
					}
					return push("}");
				}
				return typeof node === "string" ? jsonString(node) : push(JSON.stringify(node));
			};
			write(value);
			return result();
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftValues.js
var VALUE_NOTES, draftValueSchema, VALUE_LIMITS, MAX_REFERENCE_CHARS, referable, PER_TAG, indexUnder, referenceIndex, localOf, leafText, referenceTag, stemOf, referencesFrom, uniqueReferences, byteLength, MAX_NESTED_RECORDS, attributeReferences, referencesOf, seedValue, entryOf, fieldsOf, rank, draftValues, oneEnd, withinDraftBudget;
function init_appTaskDraftValues() {
	return (init_appTaskDraftValues = __esmMin((() => {
		init_jsonPointer();
		init_jsonValue();
		init_appTaskDraftNoise();
		init_attributeRank();
		init_appTaskDraftAlternatives();
		init_appTaskDraftMirrors();
		init_appTaskDraftNested();
		init_appTaskDraftText();
		init_compactValue();
		init_memberPairing();
		init_viewPointer();
		VALUE_NOTES = ["by_position", ...NOISE_REASONS];
		draftValueSchema = z.strictObject({
			pointer: z.string().describe("Where the value is, as a check names it: by selector, by position only where the note says by_position."),
			kind: z.enum([
				"added",
				"changed",
				"removed"
			]).describe("before is the value at the seed and after at the end: a scalar, or an element as compact XML, cut at 600 characters; null at the end that lacks it."),
			before: jsonValueSchema,
			after: jsonValueSchema,
			note: z.enum(VALUE_NOTES).optional().describe("by_position: no selector names it, so no check can use the pointer; view_state, renumbered, volatile, timestamp, upkeep or layout: noise the app writes, left out of the suggested checks."),
			refers_to: z.array(z.strictObject({
				attribute: z.string().optional(),
				value: z.string(),
				element: z.string()
			})).optional().describe("Other elements a value names by their key or id, such as category 44 naming <cat key=\"44\" name=\"Groceries\"/>."),
			alternatives: z.array(z.string()).optional().describe("A changed value's pointer naming its element by another identifier or name it holds alone, such as a shape's draw:name, for a check to use instead; at most three.")
		});
		VALUE_LIMITS = {
			entries: 20,
			fileBytes: 8 * 1024,
			draftBytes: 24 * 1024,
			chars: 600,
			references: 5
		};
		MAX_REFERENCE_CHARS = 64;
		referable = (value) => value.trim() !== "" && value.length <= MAX_REFERENCE_CHARS;
		PER_TAG = 3;
		indexUnder = (index, value, node) => {
			const byTag = index.get(value) ?? new Map();
			index.set(value, byTag);
			const tagged = byTag.get(node.name) ?? [];
			byTag.set(node.name, tagged);
			if (tagged.length < PER_TAG && !tagged.includes(node)) tagged.push(node);
		};
		referenceIndex = (roots) => {
			const index = new Map();
			const pending = [...roots];
			for (let node = pending.pop(); node !== undefined; node = pending.pop()) {
				if (isXmlElement(node) && isViewStateName(node.name)) continue;
				if (isXmlElement(node)) {
					for (const [key, value] of Object.entries(attributesOf(node))) if (typeof value === "string" && referable(value) && /^(?:key|id)$/iu.test(localOf(key))) indexUnder(index, value, node);
					for (const child of node.children) {
						const id = leafText(child);
						if (isXmlElement(child) && /^id$/iu.test(localOf(child.name)) && id !== undefined && referable(id)) indexUnder(index, id, node);
					}
				}
				const children = isXmlElement(node) ? node.children : Array.isArray(node) ? node : isRecord(node) ? Object.values(node) : [];
				for (const child of children) pending.push(child);
			}
			return index;
		};
		localOf = (name) => name.split(":").at(-1) ?? name;
		leafText = (node) => {
			const [only] = isXmlElement(node) ? node.children : [];
			return isXmlElement(node) && node.children.length === 1 && typeof only === "string" ? only : undefined;
		};
		referenceTag = (element) => {
			const writer = previewWriter(VALUE_LIMITS.chars);
			if (!writer.startTag(element)) return writer.result();
			const children = isXmlElement(element) ? element.children : [];
			if (children.length === 0) {
				writer.push("/>");
				return writer.result();
			}
			if (!writer.push(">")) return writer.result();
			const named = children.find((child) => isXmlElement(child) && /^(?:name|title|label)$/iu.test(localOf(child.name)) && leafText(child) !== undefined);
			if (isXmlElement(named)) {
				if (!writer.push("<") || !writer.push(named.name) || !writer.push(">") || !writer.escaped(leafText(named) ?? "") || !writer.push("</") || !writer.push(named.name) || !writer.push(">")) return writer.result();
			}
			writer.push("…");
			return writer.result();
		};
		stemOf = (attribute, tag) => {
			const [left, right] = [attribute, tag].map((name) => (name.split(":").at(-1) ?? name).toLowerCase());
			return left !== undefined && right !== undefined && Math.min(left.length, right.length) >= 3 && (left.startsWith(right) || right.startsWith(left));
		};
		referencesFrom = (index) => {
			const resolve = (value, attribute, self) => {
				if (!referable(value)) return undefined;
				const plain = /^-?\d+(?:\.\d+)?$/u.test(value);
				const found = [...index.get(value)?.values() ?? []].flat().filter((node) => node !== self && (!plain || attribute !== undefined && isXmlElement(node) && (stemOf(attribute, node.name) || /(?:id|ref|key)$/iu.test(localOf(attribute)))));
				const stemmed = found.length === 1 || attribute === undefined ? found : found.filter((node) => isXmlElement(node) && stemOf(attribute, node.name));
				const named = stemmed.filter((node) => isXmlElement(node) && localOf(node.name).toLowerCase() === localOf(attribute ?? "").toLowerCase());
				const hinted = stemmed.length > 1 && named.length === 1 ? named : stemmed;
				const [element] = hinted;
				return hinted.length === 1 && isXmlElement(element) ? {
					...attribute === undefined ? {} : { attribute },
					value,
					element: referenceTag(element)
				} : undefined;
			};
			return resolve;
		};
		uniqueReferences = (references) => {
			const seen = new Set();
			return references.filter(({ attribute, value }) => {
				const key = JSON.stringify([attribute, value]);
				if (seen.has(key)) return false;
				seen.add(key);
				return true;
			});
		};
		byteLength = (value) => new TextEncoder().encode(JSON.stringify(value)).length;
		MAX_NESTED_RECORDS = 10;
		attributeReferences = (resolve, element) => Object.entries(isXmlElement(element) ? element.attributes : {}).flatMap(([key, item]) => typeof item === "string" && (!isIdentifyingAttribute(key) && !/^key$/iu.test(key) || isIdReference(element)) ? resolve(item, key, element) ?? [] : []);
		referencesOf = (resolve, view, pointer) => {
			const value = resolvePointer$1(view, pointer, "xml");
			if (isXmlElement(value)) return uniqueReferences([
				...attributeReferences(resolve, value),
				...recordListsOf(value).flatMap(({ records }) => records).slice(0, MAX_NESTED_RECORDS).flatMap((record) => attributeReferences(resolve, record)),
				...[value, ...value.children].flatMap((field) => {
					const text = leafText(field);
					return isXmlElement(field) && text !== undefined && !/^id$/iu.test(localOf(field.name)) ? resolve(text, field.name, value) ?? [] : [];
				})
			]);
			if (typeof value !== "string") return [];
			const segments = pointer.split("/");
			const attribute = segments.at(-2) === "attributes" ? attributeKeyOf(pointer) : undefined;
			const owner = resolvePointer$1(view, segments.slice(0, -2).join("/"), "xml");
			return [resolve(value, attribute, owner) ?? []].flat();
		};
		seedValue = ({ ends, format }, pointer) => {
			const key = attributeKeyOf(pointer);
			const seen = resolvePointer$1(ends.baseline, pointer, format(ends.baseline, pointer));
			if (seen !== undefined || key === undefined || format(ends.final, pointer) !== "xml") return seen;
			const member = pairedAtSeed(ends, pointer.split("/").slice(0, -2).join("/"));
			return isXmlElement(member) ? member.attributes[key] : undefined;
		};
		entryOf = (context, references, pointer, kind) => {
			const { baseline, final } = context.ends;
			const view = kind === "removed" ? baseline : final;
			const located = locatePointer$1(view, pointer, context.format(view, pointer));
			const found = located.kind === "value";
			const listPointer = pointer.replace(/\/\d+$/u, "");
			const indexedText = found && context.format(view, pointer) === "xml" && kind !== "changed" && /\/children\/\d+$/u.test(pointer) && Array.isArray(resolvePointer$1(view, listPointer, "xml")) && isXmlElement(resolvePointer$1(view, listPointer.replace(/\/children$/u, ""), "xml"));
			const note = found && located.byPosition.length > 0 ? "by_position" : context.noise(pointer) ?? (indexedText ? "by_position" : undefined);
			const refers = context.format(view, pointer) === "xml" ? referencesOf(references(view), view, pointer).slice(0, VALUE_LIMITS.references) : [];
			const alternatives = kind === "changed" && note === undefined && context.format(view, pointer) === "xml" ? alternativePointers(view, pointer) : [];
			return {
				pointer,
				kind,
				before: kind === "added" ? null : compactValue(seedValue(context, pointer), VALUE_LIMITS.chars, context.format(baseline, pointer)),
				after: kind === "removed" ? null : compactValue(resolvePointer$1(final, pointer, context.format(final, pointer)), VALUE_LIMITS.chars, context.format(final, pointer)),
				...note === undefined ? {} : { note },
				...refers.length === 0 ? {} : { refers_to: refers },
				...alternatives.length === 0 ? {} : { alternatives }
			};
		};
		fieldsOf = (view, pointer) => {
			const value = resolvePointer$1(view, pointer, "xml");
			const list = resolvePointer$1(view, pointer.replace(/\/[^/]+$/u, ""), "xml");
			if (!isXmlElement(value) || !/\/children\/[^/]+$/u.test(pointer) || !Array.isArray(list) || list.filter((item) => isXmlElement(item) && item.name === value.name).length < 2 || !isRecordAt(view, pointer, value) || !value.children.some((child) => leafText(child) !== undefined)) return [pointer];
			const members = (element) => {
				const { keys } = pairMembers(isXmlElement(element) ? element.children : [], [], undefined, "xml").newer;
				return (isXmlElement(element) ? element.children : []).flatMap((child, index) => isXmlElement(child) ? [{
					child,
					key: escapeJsonPointerToken(keys[index] ?? String(index))
				}] : []);
			};
			return members(value).flatMap(({ child, key }) => {
				const at = `${pointer}/children/${key}`;
				const records = members(child);
				return records.length > 0 && records.every(({ child: record }) => record.name === records[0]?.child.name && holdsFields(record)) ? records.map((record) => `${at}/children/${record.key}`) : [at];
			});
		};
		rank = (entry) => entry.note === undefined ? typeof entry.after === "string" && !entry.after.startsWith("<") && /\/children\/\d+$/u.test(entry.pointer) ? 0 : 1 : entry.note === "by_position" ? 2 : 3;
		draftValues = (change, context) => {
			const indexes = new Map();
			const references = (view) => {
				const known = indexes.get(view);
				if (known !== undefined) return known;
				const made = referencesFrom(referenceIndex(context.referenceRoots(view)));
				indexes.set(view, made);
				return made;
			};
			const { baseline, final } = context.ends;
			const entries = [
				...change.added.filter((pointer) => context.listed(final, pointer)).flatMap((pointer) => context.format(final, pointer) === "xml" ? fieldsOf(final, pointer) : [pointer]).map((pointer) => entryOf(context, references, pointer, "added")),
				...change.changed.filter((pointer) => context.listed(final, pointer)).map((pointer) => entryOf(context, references, pointer, "changed")),
				...change.removed.filter((pointer) => context.listed(baseline, pointer)).map((pointer) => entryOf(context, references, pointer, "removed"))
			].toSorted((left, right) => rank(left) - rank(right));
			const values = [];
			let bytes = 2;
			for (const entry of entries) {
				const size = byteLength(entry) + (values.length === 0 ? 0 : 1);
				if (values.length >= VALUE_LIMITS.entries || bytes + size > VALUE_LIMITS.fileBytes) break;
				values.push(entry);
				bytes += size;
			}
			const listedAll = change.added.length === change.added_count && change.changed.length === change.changed_count && change.removed.length === change.removed_count;
			return {
				values,
				cut: values.length < entries.length || !listedAll
			};
		};
		oneEnd = (change, created) => ({
			...change,
			added: created ? change.added : [],
			added_count: created ? change.added_count : 0,
			removed: created ? [] : change.removed,
			removed_count: created ? 0 : change.removed_count,
			changed: [],
			changed_count: 0
		});
		withinDraftBudget = (files) => {
			let left = VALUE_LIMITS.draftBytes - files.length * 2;
			return files.map((file) => {
				const kept = [];
				for (const entry of file.values) {
					const size = byteLength(entry) + (kept.length === 0 ? 0 : 1);
					if (size > left) break;
					kept.push(entry);
					left -= size;
				}
				return kept.length === file.values.length ? file : {
					...file,
					values: kept,
					values_cut: true
				};
			});
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftTree.js
var readableEntry, checkRoot, ARCHIVE, truncatedXml, inXmlRoot, XML_FILE, valueFormat, referenceRoots, presenceValues;
function init_appTaskDraftTree() {
	return (init_appTaskDraftTree = __esmMin((() => {
		init_appTaskDraftNoise();
		init_appTaskDraftValues();
		init_stateChanges();
		init_zipView();
		readableEntry = (view, pointer) => {
			const entry = zipEntryAt(view, pointer);
			return typeof entry === "object" && entryWithoutView(entry) === undefined && (entry.format === "json" || entry.format === "keyfile" || entry.format === "xml") ? entry : undefined;
		};
		checkRoot = (view, pointer) => {
			const entry = readableEntry(view, pointer);
			const [entryPointer] = /^\/entries\/[^/]+/u.exec(pointer) ?? [];
			if (entry === undefined || entryPointer === undefined) return undefined;
			const inner = pointer.slice(entryPointer.length).split("/").slice(1);
			const root = entry.format === "xml" ? ["view", "root"] : ["view"];
			const prefix = (short, long) => short.length <= long.length && short.every((part, index) => long[index] === part);
			if (prefix(inner, root)) return `${entryPointer}/${root.join("/")}`;
			return prefix(root, inner) ? pointer : undefined;
		};
		ARCHIVE = {
			root: checkRoot,
			xml: (view, pointer) => readableEntry(view, pointer)?.format === "xml",
			leavesOut: zipLeavesOutAt,
			arrayLeavesOut: zipArrayLeavesOut,
			listed: (view, pointer) => /^\/entries\/[^/]+$/u.test(pointer) || checkRoot(view, pointer) !== undefined,
			empty: zipView([], 0)
		};
		truncatedXml = (view) => isRecord(view) && view.truncated === true;
		inXmlRoot = (pointer) => pointer === "/root" || pointer.startsWith("/root/");
		XML_FILE = {
			root: (_view, pointer) => inXmlRoot(pointer) ? pointer : undefined,
			xml: () => true,
			leavesOut: truncatedXml,
			arrayLeavesOut: truncatedXml,
			listed: (_view, pointer) => inXmlRoot(pointer),
			empty: null
		};
		valueFormat = (tree, view, pointer) => tree === ARCHIVE && /^\/entries\/[^/]+$/u.test(pointer) ? "archive" : tree.xml(view, pointer) ? "xml" : "json";
		referenceRoots = (tree, view) => {
			if (tree !== ARCHIVE) return view === null ? [] : [view];
			if (!isRecord(view) || !Array.isArray(view.entries)) return [];
			return view.entries.flatMap((entry) => isRecord(entry) && entry.format === "xml" && entry.view !== undefined && entry.view !== null ? [entry.view] : []);
		};
		presenceValues = (ends, tree, created) => {
			const from = created ? {
				baseline: tree.empty,
				final: ends.final
			} : {
				baseline: ends.baseline,
				final: tree.empty
			};
			const change = oneEnd(diffNamedMembers(from.baseline, from.final, tree === ARCHIVE ? "zip" : "xml"), created);
			return draftValues(change, {
				ends: from,
				listed: tree.listed,
				noise: changeNoise(change, from, (view, pointer) => valueFormat(tree, view, pointer)),
				format: (view, pointer) => valueFormat(tree, view, pointer),
				referenceRoots: (view) => referenceRoots(tree, view)
			});
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftNamed.js
var innermost, byName, elementName, isLayoutText, positionalTags, MAX_FLAGGED, MAX_GUARDS, isNoisy, named, unnamed, room, take, equals, elementChecks, addedChecks, removedCheck, atSeed, renamedFrom, collectChecks, xmlChange, attributeTexts, namedDraft, factsOf;
function init_appTaskDraftNamed() {
	return (init_appTaskDraftNamed = __esmMin((() => {
		init_jsonPointer();
		init_appTask();
		init_appTaskDraftAdded();
		init_appTaskDraftAttributeText();
		init_appTaskDraftCounts();
		init_appTaskDraftNested();
		init_appTaskDraftJson();
		init_appTaskDraftFileNotes();
		init_appTaskDraftGuards();
		init_appTaskDraftNoise();
		init_appTaskDraftScalars();
		init_attributeRank();
		init_appTaskDraftText();
		init_appTaskDraftValues();
		init_stateChanges();
		init_memberPairing();
		init_viewPointer();
		init_appTaskDraftTree();
		innermost = (pointers) => pointers.filter((pointer) => !pointers.some((other) => other.startsWith(`${pointer}/`)));
		byName = (view, pointer, tree) => {
			const located = locatePointer$1(view, pointer, valueFormat(tree, view, pointer));
			return located.kind !== "unresolved" && located.byPosition.length === 0 && !located.searched.some((array) => tree.arrayLeavesOut(view, array));
		};
		elementName = (value) => isXmlElement(value) ? value.name : undefined;
		isLayoutText = (tree, view, pointer, value) => typeof value === "string" && /^[ \t\r\n]*$/u.test(value) && /\/children\/[^/]+$/u.test(pointer) && tree.xml(view, pointer);
		positionalTags = (view, pointer, tree) => {
			if (!tree.xml(view, pointer)) return [];
			const segments = pointer.split("/");
			return segments.flatMap((segment, index) => {
				if (segments[index - 1] !== "children" || !/^\d+$/u.test(segment)) return [];
				const element = resolvePointer$1(view, segments.slice(0, index + 1).join("/"), valueFormat(tree, view, pointer));
				return isXmlElement(element) ? [element.name] : [];
			});
		};
		MAX_FLAGGED = 3;
		MAX_GUARDS = 4;
		isNoisy = (noise, check) => "pointer" in check && noise(check.pointer) !== undefined;
		named = ({ context }, view, pointer) => byName(view, pointer, context.tree);
		unnamed = (collected, view, pointer) => {
			if (collected.context.texts.covers(pointer) || locatePointer$1(view, pointer, valueFormat(collected.context.tree, view, pointer)).byPosition.length === 0) return;
			collected.positional.count += 1;
			if (collected.context.noise(pointer) === undefined) collected.positional.real += 1;
			for (const tag of positionalTags(view, pointer, collected.context.tree)) collected.positional.tags.add(tag);
		};
		room = ({ context }, list) => list.length < context.limit.suggestions;
		take = (collected, kind, checks) => {
			for (const check of checks) {
				const list = isNoisy(collected.context.noise, check) ? collected.noise[kind] : collected[kind];
				if (room(collected, list)) list.push(check);
			}
		};
		equals = (collected, pointer, value) => {
			const { file, ends, tree, texts, noise } = collected.context;
			const list = noise(pointer) === undefined ? collected.values : collected.noise.values;
			const before = resolvePointer$1(ends.baseline, pointer, valueFormat(tree, ends.baseline, pointer));
			const relaid = typeof value === "string" && typeof before === "string" && collapseWhitespace(value) === collapseWhitespace(before) && /\/children\/[^/]+$/u.test(pointer) && tree.xml(ends.final, pointer);
			const generatedReference = typeof value === "string" && collected.context.generatedIds.has(value) && Array.isArray(resolvePointer$1(ends.final, pointer.replace(/\/[^/]+$/u, ""), "zip"));
			if (generatedReference) collected.context.generatedReferences.push(pointer);
			if (!room(collected, list) || texts.covers(pointer) || value === undefined || isRecord(value) && Object.keys(value).length > 0 || isStamp(value) || valueFormat(tree, ends.final, pointer) === "json" && collected.context.generatedId(pointer) || generatedReference || tree.xml(ends.final, pointer) && inSplitDate(ends.final, pointer) || isLayoutText(tree, ends.final, pointer, value) || relaid) return;
			const check = valueEqualsCheck(file, pointer, value, before);
			if (!named(collected, ends.final, pointer)) unnamed(collected, ends.final, pointer);
			else if (!passesOn(check, before)) take(collected, "values", [check]);
		};
		elementChecks = (collected, pointer, value) => {
			const { file, ends, texts, tree } = collected.context;
			if (!isXmlElement(value) || inSplitDate(ends.final, pointer)) return;
			const added = {
				file,
				ends,
				named: (view, at) => named(collected, view, at) && !tree.leavesOut(view, at),
				chars: collected.context.limit.chars,
				referenceRoots: () => referenceRoots(tree, ends.baseline),
				noisy: (at) => collected.context.noise(at) !== undefined,
				long: collected.fieldLong
			};
			if (!named(collected, ends.final, `${pointer}/name`)) {
				const fields = fieldChecks(added, pointer, value);
				take(collected, "values", fields);
				if (fields.length === 0 && !texts.covers(pointer)) unnamed(collected, ends.final, pointer);
				return;
			}
			if (texts.covers(pointer) || !room(collected, collected.elements)) return;
			const records = recordChecks(added, pointer, value);
			const own = [
				...attributeChecks(added, pointer, value),
				...records.length > 0 ? records : fieldChecks(added, pointer, value),
				...nestedRecordChecks({
					file,
					final: ends.final,
					named: (at) => added.named(ends.final, at),
					chars: added.chars,
					long: added.long
				}, pointer, value)
			];
			take(collected, "elements", own.length > 0 ? own : [{
				kind: "value_equals",
				file,
				pointer: `${pointer}/name`,
				value: value.name
			}]);
		};
		addedChecks = (collected, pointer, value) => {
			if (!room(collected, collected.elements) && !room(collected, collected.values)) return;
			if (collected.context.tree.xml(collected.context.ends.final, pointer) && isXmlElement(value)) elementChecks(collected, pointer, value);
			else if (collected.context.texts.covers(pointer)) return;
			else if (Array.isArray(value) && value.length > 0) {
				const { keys } = pairMembers(value, [], undefined, valueFormat(collected.context.tree, collected.context.ends.final, pointer)).newer;
				value.forEach((item, index) => addedChecks(collected, `${pointer}/${escapeJsonPointerToken(keys[index] ?? String(index))}`, item));
			} else if (isRecord(value) && Object.keys(value).length > 0) for (const [key, item] of Object.entries(value)) addedChecks(collected, `${pointer}/${escapeJsonPointerToken(key)}`, item);
			else equals(collected, pointer, value);
		};
		removedCheck = (collected, pointer) => {
			const { file, ends, tree, texts } = collected.context;
			const before = resolvePointer$1(ends.baseline, pointer, valueFormat(tree, ends.baseline, pointer));
			if (texts.covers(pointer) || isLayoutText(tree, ends.baseline, pointer, before) || tree.root(ends.baseline, pointer) !== pointer || tree.root(ends.final, pointer) !== pointer) return;
			if (named(collected, ends.baseline, pointer) && named(collected, ends.final, pointer)) take(collected, elementName(before) === undefined ? "values" : "elements", [{
				kind: "value_absent",
				file,
				pointer
			}]);
			else unnamed(collected, ends.baseline, pointer);
		};
		atSeed = (ends, owner) => resolvePointer$1(ends.baseline, owner, "xml") ?? pairedAtSeed(ends, owner);
		renamedFrom = (collected, pointer) => {
			const { file, ends, tree } = collected.context;
			const key = attributeKeyOf(pointer) ?? "";
			const owner = pointer.split("/").slice(0, -2).join("/");
			const list = /^(?<list>.+\/children)\/[^/]+$/u.exec(owner)?.groups?.list;
			const before = atSeed(ends, owner);
			const old = isXmlElement(before) ? before.attributes[key] : undefined;
			if (!tree.xml(ends.baseline, owner) || list === undefined || !(owner.split("/").at(-1) ?? "").includes("][@") || !isIdentifyingAttribute(key) || /[=[\]]/u.test(key) || !isXmlElement(before) || typeof old !== "string" || old.includes("][")) return;
			const at = `${list}/${escapeJsonPointerToken(`[name=${before.name}][@${key}=${old}]`)}`;
			const seed = locatePointer$1(ends.baseline, at, "xml");
			if (seed.kind === "value" && seed.value === before && locatePointer$1(ends.final, at, "xml").kind === "none" && tree.root(ends.final, at) === at && named(collected, ends.baseline, at) && named(collected, ends.final, at)) take(collected, "values", [{
				kind: "value_absent",
				file,
				pointer: at
			}]);
		};
		collectChecks = (context, change) => {
			const collected = {
				context,
				elements: [],
				values: [],
				noise: {
					elements: [],
					values: []
				},
				positional: {
					count: 0,
					real: 0,
					tags: new Set()
				},
				fieldLong: []
			};
			const { ends, tree } = context;
			const runs = attributeTexts(collected, xmlChange(change, ends, tree));
			for (const pointer of change.added.filter((at) => !runs(at, ends.final))) {
				const root = tree.root(ends.final, pointer);
				if (root !== undefined) addedChecks(collected, root, resolvePointer$1(ends.final, root, valueFormat(tree, ends.final, root)));
			}
			for (const pointer of innermost(change.changed)) if (tree.root(ends.final, pointer) === pointer && !runs(pointer, ends.final)) {
				equals(collected, pointer, resolvePointer$1(ends.final, pointer, valueFormat(tree, ends.final, pointer)));
				if (context.noise(pointer) === undefined) renamedFrom(collected, pointer);
			}
			for (const pointer of change.removed.filter((at) => !runs(at, ends.baseline))) removedCheck(collected, pointer);
			return {
				...collected,
				runs
			};
		};
		xmlChange = (change, ends, tree) => ({
			...change,
			added: change.added.filter((pointer) => tree.xml(ends.final, pointer)),
			changed: change.changed.filter((pointer) => tree.xml(ends.final, pointer)),
			removed: change.removed.filter((pointer) => tree.xml(ends.baseline, pointer))
		});
		attributeTexts = (collected, change) => {
			const { file, ends, tree, limit } = collected.context;
			const covered = [];
			for (const { owner, key } of textAttributes(change, ends, collected.context.noise)) {
				const found = tree.root(ends.final, owner) === owner || tree.root(ends.baseline, owner) === owner ? attributeTextCheck({
					file,
					ends,
					named: (at) => named(collected, ends.final, at),
					chars: limit.chars
				}, owner, key) : undefined;
				if (found !== undefined && !covered.some(({ element }) => element === found.element)) {
					covered.push({
						element: found.element,
						key
					});
					take(collected, "elements", [found.check]);
				}
			}
			return readsText(covered);
		};
		namedDraft = (file, ends, tree, options) => {
			const change = diffNamedMembers(ends.baseline, ends.final, tree === ARCHIVE ? "zip" : "xml");
			const generatedId = tree === ARCHIVE ? generatedRecordId(ends, "zip") : () => false;
			const generatedIds = tree === ARCHIVE ? generatedIdsInAdditions(ends, "zip", change.added, (pointer) => valueFormat(tree, ends.final, pointer) === "json", generatedId) : new Set();
			const generatedReferences = [];
			const noise = changeNoise(change, ends, (view, pointer) => valueFormat(tree, view, pointer));
			const named = (view, pointer) => byName(view, pointer, tree) && !tree.leavesOut(view, pointer);
			const texts = wholeTextSuggestions(file, change, ends, {
				limit: options.limit,
				inTree: (pointer) => tree.xml(ends.final, pointer) && tree.root(ends.final, pointer) === pointer,
				name: (pointer) => named(ends.final, pointer) ? pointer : undefined,
				noise: (pointer) => noise(pointer) !== undefined
			});
			const checks = collectChecks({
				file,
				ends,
				tree,
				limit: options.limit,
				texts,
				noise,
				generatedId,
				generatedIds,
				generatedReferences
			}, change);
			const noisy = (check) => isNoisy(noise, check);
			const counts = draftCounts({
				file,
				ends,
				whole: (view, list) => named(view, list) && !tree.arrayLeavesOut(view, list),
				noisy: (pointer) => noise(pointer) !== undefined,
				covered: texts.covers,
				coveredRun: checks.runs
			}, xmlChange(change, ends, tree));
			const clean = [
				...texts.suggestions.filter((check) => !noisy(check)),
				...checks.elements,
				...checks.values,
				...counts.checks
			];
			const flaggable = [
				...texts.suggestions.filter(noisy),
				...checks.noise.elements,
				...checks.noise.values
			];
			const edited = clean.length > 0 || checks.positional.real > 0;
			const suggested = (edited ? clean : options.document ? flaggable.slice(0, MAX_FLAGGED) : flaggable).slice(0, options.limit.suggestions);
			const listed = [
				...change.added,
				...change.changed,
				...change.removed
			];
			const { values, cut } = draftValues(change, {
				ends,
				listed: tree.listed,
				noise,
				format: (view, pointer) => valueFormat(tree, view, pointer),
				referenceRoots: (view) => referenceRoots(tree, view)
			});
			const guards = edited ? [...texts.guards, ...draftGuards({
				file,
				ends,
				named,
				noisy: (pointer) => noise(pointer) !== undefined,
				chars: options.limit.chars
			}, suggested.filter((check) => "pointer" in check && tree.xml(ends.final, check.pointer)))].slice(0, MAX_GUARDS).concat(counts.guards) : [];
			return {
				suggested,
				values,
				valuesCut: cut,
				guards,
				notes: generatedReferenceNotes(file, generatedReferences),
				facts: factsOf(checks, texts, {
					listed,
					noise,
					flagged: edited ? [] : suggested
				})
			};
		};
		factsOf = (checks, texts, change) => ({
			positional: checks.positional.count,
			positionalTags: [...checks.positional.tags],
			long: [...new Set([...texts.long, ...checks.fieldLong])],
			changes: change.listed.length,
			noise: change.listed.filter((pointer) => change.noise(pointer) !== undefined).length,
			flagged: change.flagged.flatMap((check) => "pointer" in check ? [check.pointer] : [])
		});
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftRows.js
var tableViews, rowWhere, keyedRows, rowConditions, unkeyedRowSuggestions, rowSuggestions;
function init_appTaskDraftRows() {
	return (init_appTaskDraftRows = __esmMin((() => {
		init_appTask();
		init_appTaskChecks();
		init_stateChanges();
		init_appendAll();
		tableViews = (version) => {
			const tables = new Map();
			const view = version.present ? version.view : null;
			if (!isRecord(view) || !isRecord(view.tables)) return {
				tables,
				complete: false
			};
			for (const [name, table] of Object.entries(view.tables)) {
				tables.set(name, undefined);
				if (!isRecord(table) || table.truncated !== false) continue;
				const strings = (value) => Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
				tables.set(name, {
					columns: strings(table.columns),
					key: strings(table.primary_key),
					rows: Array.isArray(table.rows) ? table.rows.filter(Array.isArray) : []
				});
			}
			return {
				tables,
				complete: view.tables_truncated === false
			};
		};
		rowWhere = (table, row, keep) => Object.fromEntries(table.columns.flatMap((column, index) => {
			const value = row[index] ?? null;
			return keep(column) && !isTimestamp(value) ? [[column, value]] : [];
		}));
		keyedRows = (table) => new Map(table.rows.flatMap((row) => {
			const identity = sqliteRowIdentity(table.columns, table.key, row);
			return identity.keyed ? [[identity.value, row]] : [];
		}));
		rowConditions = (table) => {
			const conditions = new Map();
			for (const row of table.rows) {
				if (sqliteRowIdentity(table.columns, table.key, row).keyed) continue;
				const where = rowWhere(table, row, () => true);
				if (Object.keys(where).length === 0) continue;
				conditions.set(JSON.stringify(where), where);
			}
			return conditions;
		};
		unkeyedRowSuggestions = (file, table, baseline, final) => {
			const conditions = new Map([...rowConditions(final), ...rowConditions(baseline)]);
			const suggestions = [];
			for (const where of conditions.values()) {
				const previous = countTaskRows(baseline.columns, baseline.rows, where);
				const count = countTaskRows(final.columns, final.rows, where);
				if (previous === count) continue;
				if (count === 0) suggestions.push({
					kind: "row_absent",
					file,
					table,
					where
				});
				else if (previous === 0) suggestions.push({
					kind: "row_present",
					file,
					table,
					where
				});
				else suggestions.push({
					kind: "row_count",
					file,
					table,
					where,
					equals: count
				});
			}
			return suggestions;
		};
		rowSuggestions = (file, baseline, final) => {
			const before = tableViews(baseline);
			const suggestions = [];
			for (const [name, table] of tableViews(final).tables) {
				if (table === undefined) continue;
				const previousTable = before.tables.get(name);
				if (previousTable === undefined && (before.tables.has(name) || !before.complete)) continue;
				const old = previousTable ?? {
					...table,
					rows: []
				};
				const push = (kind, where, previousRow) => {
					if (Object.keys(where).length === 0) return;
					const previousRows = previousRow !== undefined && old.key.every((column) => Object.hasOwn(where, column)) ? [previousRow] : old.rows;
					if (kind === "row_present" ? countTaskRows(old.columns, previousRows, where) === 0 : countTaskRows(table.columns, table.rows, where) === 0) suggestions.push({
						kind,
						file,
						table: name,
						where
					});
				};
				const oldRows = keyedRows(old);
				const newRows = keyedRows(table);
				for (const [id, row] of newRows) {
					const previous = oldRows.get(id);
					if (previous === undefined) push("row_present", rowWhere(table, row, (column) => !table.key.includes(column)));
					else push("row_present", rowWhere(table, row, (column) => table.key.includes(column) || JSON.stringify(row[table.columns.indexOf(column)]) !== JSON.stringify(previous[old.columns.indexOf(column)])), previous);
				}
				for (const [id, row] of oldRows) if (!newRows.has(id)) push("row_absent", rowWhere(old, row, (column) => old.key.includes(column)));
				appendAll(suggestions, unkeyedRowSuggestions(file, name, old, table));
				if (old.rows.length !== table.rows.length) suggestions.push({
					kind: "row_count",
					file,
					table: name,
					equals: table.rows.length
				});
			}
			return suggestions;
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraft.js
var MAX_SUGGESTIONS, MAX_ITEMS, MAX_CHARS, LIMIT, versions, bounded, draftVersion, linesOf, counts, lineCounts, textSuggestions, keyPointers, NO_VALUES, plainChange, plainValues, presenceOnly, valueSuggestions, suggestedChecks, netChange, changedStateFiles, changeShape, draftTaskFiles;
function init_appTaskDraft() {
	return (init_appTaskDraft = __esmMin((() => {
		init_boundedList();
		init_excerpt();
		init_jsonPointer();
		init_appTask();
		init_appTaskDraftJson();
		init_appTaskDraftFileNotes();
		init_appTaskDraftLineGuards();
		init_appTaskDraftNamed();
		init_appTaskDraftTree();
		init_appTaskDraftRows();
		init_appTaskDraftValues();
		init_desktopState();
		init_stateChanges();
		init_valueCuts();
		init_viewPointer();
		MAX_SUGGESTIONS = 10;
		MAX_ITEMS = 200;
		MAX_CHARS = DRAFT_VIEW_CHARS;
		LIMIT = {
			suggestions: MAX_SUGGESTIONS,
			chars: MAX_CHARS
		};
		versions = (baseline, final) => ({
			baseline: baseline.view,
			final: final.view
		});
		bounded = (value) => {
			let cut = false;
			const visit = (node) => {
				if (typeof node === "string" && node.length > MAX_CHARS) {
					cut = true;
					return ellipsisExcerpt(node, MAX_CHARS);
				}
				if (Array.isArray(node)) {
					const kept = boundedList(node, MAX_ITEMS);
					cut ||= kept.omitted > 0;
					return kept.items.map(visit);
				}
				if (!isRecord(node)) return node;
				const kept = boundedList(Object.entries(node), MAX_ITEMS);
				cut ||= kept.omitted > 0;
				return Object.fromEntries(kept.items.map(([key, item]) => [key, visit(item)]));
			};
			return {
				value: value === null ? null : visit(value),
				cut
			};
		};
		draftVersion = (version, withView) => {
			const { value, cut } = bounded(withView ? version.view : null);
			return {
				checkpoint: version.checkpoint,
				present: version.present,
				format: version.format,
				...withView ? {
					view: value,
					view_cut: cut
				} : {},
				view_error: version.view_error
			};
		};
		linesOf = (version) => isRecord(version.view) && Array.isArray(version.view.lines) ? version.view.lines.filter((line) => typeof line === "string") : [];
		counts = (lines) => {
			const result = new Map();
			for (const line of lines) result.set(line, (result.get(line) ?? 0) + 1);
			return result;
		};
		lineCounts = (baseline, final) => {
			const before = counts(linesOf(baseline));
			return [...counts(linesOf(final))].filter(([line, n]) => (before.get(line) ?? n) !== n).map(([line, n]) => ({
				line,
				baseline: before.get(line) ?? 0,
				final: n
			}));
		};
		textSuggestions = (file, baseline, final) => {
			const before = new Set(baseline.present ? linesOf(baseline) : []);
			const after = new Set(linesOf(final));
			const added = [...after].filter((line) => !before.has(line));
			const gone = [...before].filter((line) => !after.has(line));
			const suggestions = [];
			const truncated = [baseline, final].some((version) => isRecord(version.view) && version.view.truncated === true);
			const gained = added.length > 0 && added.length <= MAX_SUGGESTIONS ? addedLineChecks(file, {
				before: baseline.present ? linesOf(baseline) : [],
				after: linesOf(final)
			}, {
				added,
				counted: !truncated
			}) : {
				checks: [],
				notes: []
			};
			suggestions.push(...gained.checks);
			const formatNotes = readAsTextNotes(file, linesOf(final));
			const unreadableAttributes = gained.notes.find(({ code }) => code === "read_as_text");
			const result = {
				suggestions,
				notes: [...gained.notes.filter(({ code }) => code !== "read_as_text"), ...unreadableAttributes !== undefined && formatNotes.length === 0 ? [unreadableAttributes] : formatNotes.map((note) => unreadableAttributes === undefined ? note : {
					...note,
					message: `${note.message} ${unreadableAttributes.message}`
				})]
			};
			if (truncated) return result;
			if (gone.length > 0 && gone.length <= MAX_SUGGESTIONS) suggestions.push({
				kind: "lines_absent",
				file,
				lines: gone
			});
			for (const { line, final: n } of lineCounts(baseline, final).filter(({ line }) => /\p{L}/u.test(line))) suggestions.push({
				kind: "line_count",
				file,
				exact: line,
				equals: n
			});
			return result;
		};
		keyPointers = (views) => new Map(views.flatMap((view) => Object.entries(isRecord(view) && isRecord(view.groups) ? view.groups : {}).flatMap(([group, keys]) => Object.keys(isRecord(keys) ? keys : {}).map((key) => [`${group}/${escapeJsonPointerToken(key)}`, `/groups/${escapeJsonPointerToken(group)}/${escapeJsonPointerToken(key)}`]))));
		NO_VALUES = {
			values: [],
			valuesCut: false,
			guards: []
		};
		plainChange = (format, baseline, final) => {
			if (format === "json") return diffNamedMembers(baseline.view, final.view, "json");
			const change = diffStateViews(format, baseline.view, final.view);
			const pointers = keyPointers([baseline.view, final.view]);
			const at = (entries) => entries.flatMap((entry) => pointers.get(entry) ?? []);
			return {
				...change,
				added: at(change.added),
				changed: at(change.changed),
				removed: at(change.removed)
			};
		};
		plainValues = (change, baseline, final) => draftValues(change, {
			ends: versions(baseline, final),
			listed: () => true,
			noise: () => undefined,
			format: () => "json",
			referenceRoots: () => []
		});
		presenceOnly = (baseline, final) => {
			const created = !baseline.present;
			const format = (created ? final : baseline).format;
			const listed = format === "zip" || format === "xml" ? presenceValues(versions(baseline, final), format === "zip" ? ARCHIVE : XML_FILE, created) : format === "json" || format === "keyfile" ? plainValues(oneEnd(plainChange(format, baseline, final), created), baseline, final) : {
				values: [],
				cut: false
			};
			return {
				values: listed.values,
				valuesCut: listed.cut
			};
		};
		valueSuggestions = (file, baseline, final, document) => {
			const format = final.format;
			if (format === "zip" || format === "xml") {
				return namedDraft(file, versions(baseline, final), format === "zip" ? ARCHIVE : XML_FILE, {
					limit: LIMIT,
					document
				});
			}
			if (format !== "json" && format !== "keyfile") return {
				suggested: [],
				...NO_VALUES
			};
			const change = diffStateViews(format, baseline.view, final.view, { named: true });
			const pointers = keyPointers([baseline.view, final.view]);
			const pointer = (entry) => format === "keyfile" ? pointers.get(entry) : entry;
			const leaves = (entries) => format === "keyfile" ? entries : innermost(entries);
			const wholes = (entries) => format === "keyfile" ? entries : outermost(entries);
			const edits = [];
			const ends = versions(baseline, final);
			const generatedId = format === "json" ? generatedRecordId(ends, "json") : () => false;
			const newRecordIds = new Set(change.added.flatMap((entry) => {
				const at = pointer(entry);
				const value = at === undefined ? undefined : resolvePointer$1(final.view, at, format);
				return at !== undefined && generatedId(at) && typeof value === "string" ? [value] : [];
			}));
			const added = new Set(change.added);
			const generatedReferences = [];
			for (const entry of leaves([...change.added, ...change.changed])) {
				const at = pointer(entry);
				const value = at === undefined ? undefined : resolvePointer$1(final.view, at, format);
				const generatedReference = at !== undefined && typeof value === "string" && newRecordIds.has(value) && Array.isArray(resolvePointer$1(final.view, at.replace(/\/[^/]+$/u, ""), format));
				if (generatedReference) generatedReferences.push(at);
				if (at !== undefined && at !== "" && value !== undefined && !isTimestamp(value) && !generatedId(at) && !generatedReference && !isLikeDefault(ends, added, at, value)) edits.push({
					kind: "value_equals",
					file,
					pointer: at,
					value
				});
			}
			const listed = ownNamesUnreadOtherwise(edits);
			for (const entry of wholes(change.removed)) {
				const at = pointer(entry);
				if (at !== undefined && at !== "") listed.push({
					kind: "value_absent",
					file,
					pointer: at
				});
			}
			const suggestions = decisive(listed, ends);
			const { values, cut } = plainValues(plainChange(format, baseline, final), baseline, final);
			if (format === "keyfile") return {
				suggested: suggestions,
				values,
				valuesCut: cut,
				guards: []
			};
			const counts = jsonCounts(file, change, ends);
			const suggested = [...suggestions, ...counts.checks];
			return {
				suggested,
				values,
				valuesCut: cut,
				guards: [...recordGuards(file, suggested.slice(0, MAX_SUGGESTIONS), ends, added), ...counts.guards],
				notes: [...positionalNotes(file, suggested, final.view), ...generatedReferenceNotes(file, generatedReferences)]
			};
		};
		suggestedChecks = (file, baseline, final, document) => {
			if (!final.present) return {
				suggested: [{
					kind: "file_absent",
					file
				}],
				...NO_VALUES,
				...presenceOnly(baseline, final)
			};
			const created = baseline.present ? [] : [{
				kind: "file_present",
				file
			}];
			const lines = final.format === "text" ? textSuggestions(file, baseline, final) : undefined;
			const content = lines !== undefined ? {
				...NO_VALUES,
				suggested: lines.suggestions,
				notes: lines.notes,
				guards: baseline.present ? lineGuards(file, linesOf(baseline), linesOf(final)) : []
			} : !baseline.present ? {
				suggested: [],
				...NO_VALUES,
				...presenceOnly(baseline, final)
			} : final.format === "sqlite" ? {
				suggested: rowSuggestions(file, baseline, final),
				...NO_VALUES
			} : valueSuggestions(file, baseline, final, document);
			return {
				...content,
				suggested: [...created, ...content.suggested].slice(0, MAX_SUGGESTIONS)
			};
		};
		netChange = (baseline, final) => {
			if (baseline.checkpoint_index === final.checkpoint_index) return undefined;
			if (!baseline.present && !final.present) return undefined;
			if (baseline.present && final.present && final.format !== "sqlite" && baseline.sha256 !== null && baseline.sha256 === final.sha256) return undefined;
			if (!baseline.present) return { kind: "created" };
			if (!final.present) return { kind: "deleted" };
			if (baseline.view_error !== null || final.view_error !== null || baseline.format === null || final.format === null) return { kind: "unreadable" };
			if (baseline.format !== final.format) return { kind: "format" };
			if (final.format === "binary") return { kind: "content" };
			const difference = diffStateViews(final.format, baseline.view, final.view, { named: true });
			if (difference.added_count + difference.removed_count + difference.changed_count === 0) return difference.complete ? undefined : { kind: "content" };
			if (final.format !== "text") return difference;
			return {
				...difference,
				added: [...new Set(difference.added)],
				removed: [...new Set(difference.removed)],
				line_counts: lineCounts(baseline, final).slice(0, 100)
			};
		};
		changedStateFiles = (files, ends, include = () => true) => [...files].filter(([home]) => include(home)).flatMap(([home, path]) => {
			const baseline = versionAt(path, ends.seed);
			const final = versionAt(path, ends.end);
			const change = baseline === undefined || final === undefined ? undefined : netChange(baseline, final);
			return change === undefined || baseline === undefined || final === undefined ? [] : [{
				home,
				path,
				baseline,
				final,
				change
			}];
		}).sort((left, right) => left.home < right.home ? -1 : 1);
		changeShape = (change, final) => ({
			kind: "kind" in change ? change.kind : "values",
			complete: "complete" in change ? change.complete : undefined,
			format: final.format
		});
		draftTaskFiles = (files, served, ends, isLeftOut) => {
			const changed = changedStateFiles(files, ends, served);
			const considered = changed.filter(({ home }) => !isLeftOut(home));
			const role = considered.some(({ path }) => path.role === "document") ? "document" : "application_state";
			return withinDraftBudget(changed.map(({ home, path, baseline, final, change }) => {
				const drafted = path.role === role && !isLeftOut(home);
				const draft = drafted ? suggestedChecks(home, baseline, final, role === "document") : {
					suggested: [],
					...NO_VALUES
				};
				return {
					file: home,
					role: path.role,
					baseline: draftVersion(baseline, drafted),
					final: draftVersion(final, drafted),
					change,
					suggested: draft.suggested,
					values: draft.values,
					values_cut: draft.valuesCut,
					guards: draft.guards,
					notes: drafted ? [...fileNotes(home, changeShape(change, final), draft.facts), ...draft.notes ?? []] : []
				};
			}));
		};
	})))();
}

//#endregion
//#region dist/domain/desktop/appTaskDraftNotes.js
var EMPTY_DRAFT_CODES, DRAFT_NOTE_CODES, draftNoteSchema, MAX_NOTED_FILES, ROLE_ORDER, homeList, dconfKeysChange, draftNotes;
function init_appTaskDraftNotes() {
	return (init_appTaskDraftNotes = __esmMin((() => {
		init_boundedList();
		init_appTaskDraft();
		init_appTaskDraftFileNotes();
		init_buildCapture();
		init_desktopState();
		init_stateChanges();
		EMPTY_DRAFT_CODES = [
			"no_change",
			"incomplete_capture",
			"unowned_changes",
			"uncheckable_changes",
			"unreadable_changes",
			"no_document"
		];
		DRAFT_NOTE_CODES = [...EMPTY_DRAFT_CODES, ...FILE_NOTE_CODES];
		draftNoteSchema = z.strictObject({
			code: z.enum(DRAFT_NOTE_CODES),
			message: z.string(),
			file: z.string().optional().describe("by_position, view_state_only, long_text, cut_view, unreadable_view, volatile_lines: the drafted file the note is about."),
			files: z.array(z.strictObject({
				file: z.string(),
				role: z.string()
			})).optional().describe("unowned_changes: changed home paths outside the owned paths, up to 5. uncheckable_changes: dconf databases whose app keys changed. unreadable_changes: dconf databases that changed but could not be read."),
			more: z.int().nonnegative().optional().describe("unowned_changes: how many more changed."),
			error: z.string().optional().describe("unreadable_changes: why REA could not read the dconf database."),
			elements: z.array(z.string()).optional().describe("by_position: tags of the elements no attribute names alone, up to 5."),
			pointers: z.array(z.string()).optional().describe("long_text: the elements whose text is too long to check whole; view_state_only: the noise checks kept. Up to 5.")
		});
		MAX_NOTED_FILES = 5;
		ROLE_ORDER = {
			document: 0,
			application_state: 1,
			unrelated: 2,
			shared_desktop: 3
		};
		homeList = (paths) => paths.map((path) => `~/${path}`).join(", ");
		dconfKeysChange = (baseline, final) => {
			const unread = [baseline, final].find((version) => version.present && (version.sha256 === null || version.view_error !== null || version.format !== "dconf"));
			if (unread !== undefined) return { error: unread.sha256 === null ? unread.view_error ?? "content not retained" : unread.view_error ?? `read as ${unread.format ?? "an unknown format"}, not a dconf database` };
			const keys = diffStateViews("dconf", baseline.present ? baseline.view : null, final.present ? final.view : null);
			return keys.added_count + keys.removed_count + keys.changed_count > 0 ? "keys" : undefined;
		};
		draftNotes = (files, facts) => {
			if (facts.drafted.length > 0) return facts.drafted.flatMap(({ notes }) => notes);
			const seed = facts.checkpoints[facts.ends.seed] ?? "the seed";
			const end = facts.checkpoints[facts.ends.end] ?? "the end";
			const changed = changedStateFiles(files, facts.ends).map(({ home, path }) => ({
				file: home,
				role: path.role
			})).sort((left, right) => ROLE_ORDER[left.role] - ROLE_ORDER[right.role] || (left.file < right.file ? -1 : 1));
			const settings = [];
			const unread = [];
			for (const { home, path, baseline, final } of changedStateFiles(facts.dconf, facts.ends)) {
				const keys = dconfKeysChange(baseline, final);
				if (keys === "keys") settings.push({
					file: home,
					role: path.role
				});
				else if (keys !== undefined) unread.push({
					file: home,
					role: path.role,
					error: keys.error
				});
			}
			const unresolvedFileChanges = [...files.values(), ...facts.dconf.values()].some((path) => {
				const baseline = versionAt(path, facts.ends.seed);
				const final = versionAt(path, facts.ends.end);
				if (baseline === undefined || final === undefined) return true;
				if (baseline.checkpoint_index === final.checkpoint_index) return false;
				if (!baseline.present && !final.present) return false;
				if (baseline.present !== final.present) return true;
				return baseline.sha256 === null || final.sha256 === null || baseline.sha256 !== final.sha256 || final.format === "sqlite";
			});
			const notes = [];
			if (!facts.observed) notes.push({
				code: "incomplete_capture",
				message: `Checkpoint ${seed} or ${end} did not cover the whole home, so a change can be missing from the list. Walk it again before treating an empty list as no change.`
			});
			if (facts.observed && changed.length === 0 && settings.length === 0 && unread.length === 0 && !unresolvedFileChanges) notes.push({
				code: "no_change",
				message: `No file under the home changed between checkpoints ${seed} and ${end}: save the change in the app before taking ${end}.`
			});
			if (facts.observed && unresolvedFileChanges && changed.length === 0 && settings.length === 0 && unread.length === 0) notes.push({
				code: "uncheckable_changes",
				message: `File identities changed or could not be compared between ${seed} and ${end}, but the captured values do not yield a draftable change. Inspect the files and write an appropriate check.`
			});
			if (changed.length > 0) {
				const { items: listed, omitted: more } = boundedList(changed, MAX_NOTED_FILES);
				notes.push({
					code: "unowned_changes",
					message: `${String(changed.length)} file(s) changed between ${seed} and ${end}, none under the paths the export owns (${homeList(facts.owned) || "none"}), so data/get serves none of them: ${listed.map(({ file, role }) => `~/${file} (${role})`).join(", ")}${more === 0 ? "" : `, and ${String(more)} more`}. If one is the app's document or data, capture again naming it with ${STATE_PATH_INPUTS}.`,
					files: listed,
					more
				});
			}
			if (settings.length > 0) notes.push({
				code: "uncheckable_changes",
				message: `The app's keys in dconf (${homeList(settings.map(({ file }) => file))}) changed between ${seed} and ${end}, and no check can read them: checks read files under the owned paths, and the export only writes the app's keys as they were at ${seed} when the app first starts. Make the task's change one the app saves in a file.`,
				files: settings
			});
			if (unread.length > 0) {
				const error = [...new Set(unread.map((entry) => entry.error))].join("; ");
				notes.push({
					code: "unreadable_changes",
					message: `${homeList(unread.map(({ file }) => file))} changed between ${seed} and ${end}, but REA could not read it (${error}), so whether the app's keys there changed is unknown. When dconf-cli is missing, install it or set REA_DCONF_COMMAND, and draft again.`,
					files: unread.map(({ file, role }) => ({
						file,
						role
					})),
					error
				});
			}
			if (![...files.values()].some((path) => path.role === "document")) notes.push({
				code: "no_document",
				message: `REA recognized no file as the app's document: no app window's title showed a file's name or ~/ path, and no state path named one. When the app saves a document, name it with ${STATE_PATH_INPUTS}.`
			});
			return notes;
		};
	})))();
}

//#endregion
export { draftNoteSchema, draftNotes, draftTaskFiles, draftValueSchema, init_appTaskDraft, init_appTaskDraftNotes, init_appTaskDraftValues };