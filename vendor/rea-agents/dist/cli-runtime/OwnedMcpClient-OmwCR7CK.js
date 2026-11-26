import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { Client } from "@modelcontextprotocol/client";

//#region dist/process/OwnedMcpClient.js
var OwnedMcpClient;
function init_OwnedMcpClient() {
	return (init_OwnedMcpClient = __esmMin((() => {
		OwnedMcpClient = class extends Client {
			close() {
				const closing = super.close();
				void closing.catch(() => undefined);
				return closing;
			}
		};
	})))();
}

//#endregion
export { OwnedMcpClient, init_OwnedMcpClient };