# Upstream pull request (seokju-na/react-thermal-printer)

Proposed contribution for https://github.com/seokju-na/react-thermal-printer

## Title

fix: remove react-dom/server from browser bundle

## Summary

`reactNodeToString` used `renderToStaticMarkup` from `react-dom/server`, which pulls Node-only APIs (`AsyncLocalStorage`, `util.TextEncoder`) into Vite/browser bundles and crashes client apps.

Replace with a small recursive React child walker (strings, numbers, arrays, elements). `<Text>` and `<Row>` only allow text nodes, so this is sufficient.

## Files to cherry-pick

- `packages/react-thermal-printer/src/utils/reactNodeToString.tsx`
- `packages/react-thermal-printer/package.json` (drop `react-dom` from `peerDependencies`)

## Optional second PR

- `packages/image/src/transforms/floydSteinberg.ts` — inline Floyd–Steinberg dithering instead of CJS `floyd-steinberg` default import (fixes ESM browser consumers)

## Open PR

```bash
git remote add upstream https://github.com/seokju-na/react-thermal-printer.git
git fetch upstream
git checkout -b fix/browser-no-react-dom-server upstream/main
# cherry-pick or apply the two file changes above
git push origin fix/browser-no-react-dom-server
# Open PR on GitHub: sh0umik/react-thermal-printer → seokju-na/react-thermal-printer
```
