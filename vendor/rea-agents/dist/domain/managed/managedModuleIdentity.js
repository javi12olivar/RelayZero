/** Select the sole admitted Module row shape, independent of its name. */
export const managedModuleRow = (result) => result.module ?? result.metadata?.unresolved_module_name ?? null;
