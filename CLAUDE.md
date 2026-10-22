# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Toolchain

Node is managed by [mise](https://mise.jdx.dev) via `mise.toml` (`node = "lts"`). In non-interactive shells where mise isn't activated, prefix commands with `mise x --` (e.g. `mise x -- npm run build`) so the pinned Node is used.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — type-check (`tsc -b`) then production build to `dist/`
- `npm run lint` — Oxlint (config in `.oxlintrc.json`)
- `npm run format` / `npm run format:check` — Prettier (no semicolons, single quotes)
- `npm test` — Vitest, single run; `npm run test:watch` for watch mode
- `npx vitest run src/App.test.tsx` — one file; add `-t "<name>"` to filter by test name
- `npm run preview` — serve the built `dist/`

`npm run build` is the type-check gate; use `npx tsc -b` to type-check without building. CI (`.github/workflows/ci.yml`) runs lint, format check, tests and build on pushes to `main` and on PRs, using the Node version from `mise.toml`.

## Testing

Vitest is configured in `vite.config.ts` (`test` block) with jsdom and React Testing Library. Test files live next to the code as `*.test.tsx`. Vitest globals are off, so import `describe`/`it`/`expect` from `vitest`. `src/test/setup.ts` registers the jest-dom matchers (`toHaveTextContent`, etc.) and runs Testing Library's `cleanup` after each test. Prefer `userEvent` over `fireEvent` for interactions.

## Architecture

Vite 8 + React 19 + TypeScript 6 single-page app scaffolded from `create-vite`'s `react-ts` template.

- `index.html` is the entry point and loads `src/main.tsx`, which mounts `<App />` into `#root` under `StrictMode`.
- TypeScript uses project references: `tsconfig.json` → `tsconfig.app.json` (browser code in `src/`) and `tsconfig.node.json` (`vite.config.ts`). Bundler resolution with `noEmit` — Vite does the transpiling, `tsc` only type-checks.
- Strictness to keep in mind: `verbatimModuleSyntax` (type-only imports must use `import type`), `erasableSyntaxOnly` (no `enum`, `namespace`, or constructor parameter properties), `noUnusedLocals`/`noUnusedParameters`.
- Lint is Oxlint, not ESLint. `react/only-export-components` warns when a component file exports non-components (breaks Fast Refresh).
- Static files in `public/` are served at `/` as-is; assets imported from `src/assets/` are hashed and bundled.
