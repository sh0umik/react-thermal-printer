# Consuming this fork (GitHub installs)

Fork: [sh0umik/react-thermal-printer](https://github.com/sh0umik/react-thermal-printer)

Use a **release tag** (recommended) or a **git ref** (`main`, branch name, or tag). This is the npm/pnpm equivalent of pinning a Flutter/Dart `pubspec` git dependency with `ref: v0.22.1`.

## Recommended: release tarball (works like a registry)

After [releases](https://github.com/sh0umik/react-thermal-printer/releases) are published, pin the version in `package.json`:

```json
{
  "dependencies": {
    "react-thermal-printer": "https://github.com/sh0umik/react-thermal-printer/releases/download/v0.22.1/react-thermal-printer-0.22.1.tgz"
  },
  "pnpm": {
    "overrides": {
      "@react-thermal-printer/image": "https://github.com/sh0umik/react-thermal-printer/releases/download/v0.22.1/react-thermal-printer-image-0.14.1.tgz"
    }
  }
}
```

The `pnpm.overrides` entry ensures the forked image package (Floyd–Steinberg ESM fix) is used instead of the npm copy.

Then:

```bash
pnpm install
```

### npm / yarn

```json
{
  "dependencies": {
    "react-thermal-printer": "https://github.com/sh0umik/react-thermal-printer/releases/download/v0.22.1/react-thermal-printer-0.22.1.tgz"
  },
  "overrides": {
    "@react-thermal-printer/image": "https://github.com/sh0umik/react-thermal-printer/releases/download/v0.22.1/react-thermal-printer-image-0.14.1.tgz"
  }
}
```

(`overrides` is npm; yarn uses `resolutions`.)

## Git URL with tag (pnpm)

Install the package subdirectory from a tag (clones the monorepo; slower, builds from source):

```bash
pnpm add "react-thermal-printer@github:sh0umik/react-thermal-printer#v0.22.1&path:packages/react-thermal-printer"
```

Or in `package.json`:

```json
"react-thermal-printer": "github:sh0umik/react-thermal-printer#v0.22.1&path:packages/react-thermal-printer"
```

Track `main` for bleeding edge:

```json
"react-thermal-printer": "github:sh0umik/react-thermal-printer#main&path:packages/react-thermal-printer"
```

## Peer dependency

This fork only requires **React** (no `react-dom` peer):

```json
"peerDependencies": {
  "react": "^18 || ^19"
}
```

## Releasing a new version (maintainers)

```bash
git tag v0.22.1
git push origin v0.22.1
```

Pushing a `v*` tag runs `.github/workflows/github-release.yml`, which builds packages and uploads tarballs to GitHub Releases.
