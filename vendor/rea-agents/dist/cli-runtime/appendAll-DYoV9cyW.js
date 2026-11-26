import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";

//#region dist/domain/appendAll.js
var appendAll;
function init_appendAll() {
	return (init_appendAll = __esmMin((() => {
		appendAll = (target, items) => {
			for (const item of items) target.push(item);
			return target;
		};
	})))();
}

//#endregion
export { appendAll, init_appendAll };