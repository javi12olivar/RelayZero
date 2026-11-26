import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";

//#region dist/server/transportOwnerClose.js
var ownerClosedTransports, markTransportOwnerClose, transportClosedByOwner;
function init_transportOwnerClose() {
	return (init_transportOwnerClose = __esmMin((() => {
		ownerClosedTransports = new WeakSet();
		markTransportOwnerClose = (transport) => {
			ownerClosedTransports.add(transport);
		};
		transportClosedByOwner = (transport) => ownerClosedTransports.has(transport);
	})))();
}

//#endregion
export { markTransportOwnerClose as n, transportClosedByOwner as r, init_transportOwnerClose as t };