# Contributing

This is a pnpm monorepo containing the library and its demo site.

## 🗂 Repo structure

```
.
├── packages/
│   └── react-liquid-glass-svg/   ← the published npm package
│       ├── src/                   library source
│       ├── dist/                  build output (gitignored)
│       └── ...                    README/LICENSE/CHANGELOG/docs (copied at build time)
├── demo/                         ← Vite + Tailwind SSG demo site
│   ├── src/
│   └── dist/                      (gitignored)
├── docs/                         ← images used in README (banner, screenshots, mocks)
├── README.md                     ← single source of truth for library docs
├── LICENSE
├── CHANGELOG.md
└── pnpm-workspace.yaml
```

| Workspace                         | Purpose                                                    |
| --------------------------------- | ---------------------------------------------------------- |
| `packages/react-liquid-glass-svg` | The library — published to npm as `react-liquid-glass-svg` |
| `demo`                            | Marketing & playground site — deployed to GitHub Pages     |

## 🛠 Dev

```bash
pnpm install          # installs deps + git hooks (husky)

pnpm dev              # demo dev server (Vite, port 3000)

pnpm test:run         # run library tests once
pnpm test             # vitest watch mode

pnpm lint             # eslint
pnpm format           # prettier --write .

pnpm build:lib        # build the library (also syncs README/LICENSE/CHANGELOG/docs into the package)
pnpm build:demo       # build the demo (client + prerender + SSG)
pnpm build            # build everything

pnpm deploy           # build demo + push to gh-pages branch
```

Husky runs:

- **pre-commit** → `lint-staged` (eslint + prettier on staged files only)
- **pre-push** → full `lint` + `build`

## 📝 Editing docs

The single source of truth for **library documentation** is the **root** `README.md`. The image assets live in `docs/`.

When the library is built (`pnpm build:lib`), a pre-build script copies into the package folder:

- `README.md`
- `LICENSE`
- `CHANGELOG.md`
- `docs/`

Do **NOT** edit `packages/react-liquid-glass-svg/README.md` directly — it's overwritten on every build.

## 🚀 Stack

- **Package:** React 18+, TypeScript 6, Vite (lib mode), vitest, jsdom, testing-library
- **Demo:** Vite + Tailwind v4 + manual SSG via prerender script (server bundle → `renderToString` → static HTML)
- **Tooling:** pnpm workspaces, ESLint v10, Prettier 3, Husky 9, lint-staged 17

## 📤 Publishing

1. Bump version in `packages/react-liquid-glass-svg/package.json`
2. Update `CHANGELOG.md`
3. `cd packages/react-liquid-glass-svg && npm publish --dry-run` — verify what ships
4. `npm publish` — `prepublishOnly` will rebuild and copy meta files automatically
