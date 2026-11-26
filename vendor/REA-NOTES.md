# Vendored REA notes

- Source package: `rea-agents` 6.10.1 from the official npm package; upstream: https://github.com/morluto/rea.
- The official published package source, `package.json`, `npm-shrinkwrap.json`, MIT license, third-party notices, licenses, and Windows native runtime are included together.
- `start.bat` installs the lockfile-pinned production dependencies into this folder on first run with `npm ci --omit=dev --omit=optional`. This requires internet access.
- The optional Frida dependency is omitted because ZeroScript's bridge allowlist exposes browser and artifact inspection tools, not Frida tools.
- Keep the `REA_TOOLS` allowlist in `bridge.py` aligned with this integration. The REA package contains a broader feature set than ZeroScript exposes.
