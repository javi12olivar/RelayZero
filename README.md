# RelayZero

**RelayZero is free, open-source AI coding through supported browser chat sites, connected to VS Code and powered by [REA (Reverse Engineer Anything)](https://github.com/morluto/rea).** A Chrome or Edge extension provides the chat interface, a local Python bridge routes agent requests, and REA supplies the reverse-engineering and artifact-analysis capabilities.

> **REA is a core part of RelayZero.** Its MCP server is bundled in this repository, configured by default, and started locally alongside the VS Code MCP server. You do not need a separate global REA installation.

## How it works

1. The browser extension reads and writes messages on supported AI chat sites.
2. The local bridge connects the browser session to VS Code and the configured MCP servers.
3. VS Code provides workspace coding actions; bundled REA provides its MCP tools for inspecting browsers and analyzing supported artifacts.

The default MCP servers are `vscode` and `rea`. RelayZero exposes a limited REA tool set through the bridge. REA's optional Frida tools are not exposed by this configuration.

## Supported chat sites

DeepSeek, ChatGPT, Gemini, Kimi, GLM, Qwen, Arena, Claude, and FreedomGPT.

## What is included

- `relayzero-extension/` — unpacked Chrome and Edge extension.
- `bridge.py` and `sys_tools.py` — local WebSocket bridge and built-in VS Code agent tools.
- `launch_vscode_mcp.py` — VS Code MCP diagnostics and setup helper.
- `vendor/rea-agents/` — bundled REA 6.10.1 package, including its license and third-party notices.
- `config.example.json` — example configuration for VS Code and the bundled REA server.
- `install-dependencies.bat` — detects and installs required Windows dependencies.

REA is distributed under its MIT license; see `vendor/rea-agents/LICENSE` and `vendor/rea-agents/THIRD_PARTY_NOTICES.md`. Dependency details are in `vendor/REA-NOTES.md`.

## Requirements

- Windows 10 or newer.
- Chrome or Edge.
- Python 3.9 or newer.
- A supported Node.js release for REA.
- VS Code with the third-party `nabheet.vscode-ide-mcp` extension.

The included Windows installer detects existing dependencies and installs missing components with `winget`. It also installs REA's lockfile-pinned production dependencies on first run. `start.bat` only checks runtime prerequisites and starts the bridge; it does not install or update software. It does not configure macOS or Linux.

## Install and run

1. Download or clone this repository.
2. Run `install-dependencies.bat` once to detect and install missing dependencies.
3. In Chrome or Edge, open `chrome://extensions` or `edge://extensions`, enable **Developer mode**, choose **Load unpacked**, and select `relayzero-extension/`.
4. Open a folder in VS Code and run `start.bat` to start the local bridge.
5. Open a supported AI chat site and start the agent from the RelayZero panel.

The first setup needs internet access to install REA's production dependencies from the included `npm-shrinkwrap.json`. Installed dependencies are kept under `vendor/rea-agents/node_modules/` and excluded from Git.

## Configuration

On first run, RelayZero copies `config.example.json` to `config.json`. Edit that local file only if you need to customize MCP servers. `config.json`, logs, and generated dependencies are excluded from Git so machine-specific settings are not committed.

## Permissions and local actions

The extension needs access to the supported chat sites and the local bridge. The VS Code agent can use workspace tools and RelayZero's built-in local tools, which include file, terminal, and process operations. Review the code and the actions an agent proposes before using it on important data.

## License and credits

RelayZero is licensed under GPL-3.0-or-later. This fork derives from [ZeroScript-Free](https://github.com/sebattfg/ZeroScript-Free) by sebattfg; the original idea for connecting additional MCP servers came from [javnpa](https://github.com/javnpa). REA is a separate project by [morluto](https://github.com/morluto/rea). The VS Code MCP extension is a separate third-party project and is not made by Microsoft.

