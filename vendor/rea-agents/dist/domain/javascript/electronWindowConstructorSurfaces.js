export const ELECTRON_WINDOW_CONSTRUCTOR_SURFACES = {
    // A BrowserWindow is created with its own contents and preferences.
    BrowserWindow: { preferences: true, webContents: true, selfLoad: true },
    // BaseWindow owns native frame geometry; its contents live in separately
    // attached WebContentsViews, so it accepts no webPreferences and exposes no
    // webContents of its own.
    BaseWindow: { preferences: false, webContents: false, selfLoad: false },
    // A BrowserView is constructed with webPreferences and owns its webContents.
    BrowserView: { preferences: true, webContents: true, selfLoad: false },
    // A WebContentsView accepts preferences or an explicitly adopted webContents.
    WebContentsView: { preferences: true, webContents: true, selfLoad: false },
};
const CONSTRUCTOR_NAMES = new Set(Object.keys(ELECTRON_WINDOW_CONSTRUCTOR_SURFACES));
/** Narrow an Electron export path segment to a modeled window constructor. */
export const electronWindowConstructor = (name) => CONSTRUCTOR_NAMES.has(name) ? name : undefined;
