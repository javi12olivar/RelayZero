# RelayZero browser extension

RelayZero's Chrome and Edge extension adds a control panel to supported AI chat sites. It works with the local RelayZero bridge and the VS Code and REA MCP servers bundled/configured by the repository.

## Load the extension

1. Run `install-dependencies.bat` from the repository root.
2. Open `chrome://extensions` or `edge://extensions` and enable **Developer mode**.
3. Select **Load unpacked** and choose this `relayzero-extension/` directory.
4. Open VS Code with a workspace, start `start.bat` from the repository root, then open a supported AI chat site.

REA is a core part of RelayZero and provides the reverse-engineering and artifact-analysis MCP tools. See the root [README](../README.md) for setup, configuration, permissions, and licensing details.
