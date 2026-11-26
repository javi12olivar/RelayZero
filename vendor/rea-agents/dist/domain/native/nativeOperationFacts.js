import { nativeInventoryRowsSchemas } from "./nativeInventory.js";
const factContract = (operation, subject, schema) => Object.freeze({ operation, subject, schema });
export const listNamesFact = factContract("list_names", "name inventory", nativeInventoryRowsSchemas.names);
export const listProceduresFact = factContract("list_procedures", "procedure inventory", nativeInventoryRowsSchemas.names);
export const searchProceduresFact = factContract("search_procedures", "procedure search result", nativeInventoryRowsSchemas.names);
export const listStringsFact = factContract("list_strings", "string inventory", nativeInventoryRowsSchemas.strings);
export const searchStringsFact = factContract("search_strings", "string search result", nativeInventoryRowsSchemas.strings);
