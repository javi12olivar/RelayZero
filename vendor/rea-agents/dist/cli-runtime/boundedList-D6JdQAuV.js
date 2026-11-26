import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/boundedList.js
var boundedList, BoundedListCollector, describeBoundedList;
function init_boundedList() {
	return (init_boundedList = __esmMin((() => {
		boundedList = (items, maximum, omitted = 0) => ({
			items: items.slice(0, maximum),
			omitted: omitted + Math.max(0, items.length - maximum)
		});
		BoundedListCollector = class {
			maximum;
			#items = [];
			#omitted = 0;
			constructor(maximum) {
				this.maximum = maximum;
			}
			push(item) {
				if (this.#items.length < this.maximum) this.#items.push(item);
				else this.#omitted += 1;
			}
			/** Whether a retained item equals `item`; omitted items are not kept. */
			retains(item) {
				return this.#items.includes(item);
			}
			toList() {
				return {
					items: [...this.#items],
					omitted: this.#omitted
				};
			}
		};
		describeBoundedList = (list, separator) => {
			if (list.omitted === 0) return list.items.join(separator);
			const rest = `and ${String(list.omitted)} more`;
			return list.items.length === 0 ? rest : `${list.items.join(separator)}${separator}${rest}`;
		};
	})))();
}

//#endregion
export { BoundedListCollector, boundedList, describeBoundedList, init_boundedList };