import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { z } from "zod";

//#region dist/cli/optionFields.js
var optionFlagName, declaredOptionType, isCountOption;
function init_optionFields() {
	return (init_optionFields = __esmMin((() => {
		optionFlagName = (key) => key.replaceAll(/[A-Z]/gu, (letter) => `-${letter.toLowerCase()}`);
		declaredOptionType = (field) => {
			let current = field;
			for (let inner = Reflect.get(current.def, "innerType"); inner instanceof z.ZodType; inner = Reflect.get(current.def, "innerType")) current = inner;
			return current;
		};
		isCountOption = (field) => field.meta()?.count === true;
	})))();
}

//#endregion
export { declaredOptionType, init_optionFields, isCountOption, optionFlagName };