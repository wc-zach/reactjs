# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Toolchain

Node is managed by [mise](https://mise.jdx.dev) via `mise.toml`, pinned to the Node 24 major (`node = "24"`); bump it deliberately, together with `@types/node`. In non-interactive shells where mise isn't activated, prefix commands with `mise x --` (e.g. `mise x -- npm run build`) so the pinned Node is used.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — type-check (`tsc -b`) then production build to `dist/`
- `npm run lint` — Oxlint (config in `.oxlintrc.json`)
- `npm run format` / `npm run format:check` — Prettier (no semicolons, single quotes)
- `npm test` — Vitest, single run; `npm run test:watch` for watch mode
- `npx vitest run src/App.test.tsx` — one file; add `-t "<name>"` to filter by test name
- `npm run preview` — serve the built `dist/`

`npm run build` is the type-check gate; use `npx tsc -b` to type-check without building. CI (`.github/workflows/ci.yml`) runs `npm audit --audit-level=moderate`, lint, format check, tests and build on pushes to `main` and on PRs, using the Node version from `mise.toml`.

## Testing

Vitest is configured in `vite.config.ts` (`test` block) with jsdom and React Testing Library. Test files live next to the code as `*.test.tsx`. Vitest globals are off, so import `describe`/`it`/`expect` from `vitest`. `src/test/setup.ts` registers the jest-dom matchers (`toHaveTextContent`, etc.), turns on `reactStrictMode` (tests render under StrictMode like `main.tsx`), and runs Testing Library's `cleanup` after each test. Prefer `userEvent` over `fireEvent` for interactions.

## Architecture

Vite 8 + React 19 + TypeScript 6 single-page app, styled with Tailwind CSS v4 and shadcn/ui (Radix-based, "radix-nova" style).

- `index.html` is the entry point and loads `src/main.tsx`, which mounts `<App />` into `#root` under `StrictMode`.
- TypeScript uses project references: `tsconfig.json` → `tsconfig.app.json` (browser code in `src/`) and `tsconfig.node.json` (`vite.config.ts`). Bundler resolution with `noEmit` — Vite does the transpiling, `tsc` only type-checks.
- Strictness to keep in mind: `verbatimModuleSyntax` (type-only imports must use `import type`), `erasableSyntaxOnly` (no `enum`, `namespace`, or constructor parameter properties), `noUnusedLocals`/`noUnusedParameters`.
- `@/` is an alias for `src/`, defined once as `paths` in `tsconfig.app.json` (mirrored in the root `tsconfig.json`, which the shadcn CLI reads). Vite and Vitest pick it up via `resolve.tsconfigPaths: true`; don't add a separate `resolve.alias`.
- Lint is Oxlint, not ESLint. `react/only-export-components` warns when a component file exports non-components (breaks Fast Refresh); it's turned off for `src/components/ui/**` because shadcn components export variant helpers.
- Static files in `public/` are served at `/` as-is; assets imported from `src/` are hashed and bundled.

## UI: Tailwind + shadcn/ui

- Tailwind v4 runs through the `@tailwindcss/vite` plugin; there is no `tailwind.config.js`. Theme tokens (colors, radius, fonts) are CSS variables in `src/index.css` (`:root` for light, `.dark` for dark, mapped to Tailwind via `@theme inline`).
- Dark mode is class-based (`.dark` on `<html>`). An inline script in `index.html` sets it from `prefers-color-scheme` before first paint and follows OS changes.
- shadcn components are source files we own in `src/components/ui/`; edit them freely. `cn()` (class merging) comes from the `cn` package, re-exported by `src/lib/utils.ts`. Icons are `lucide-react`.
- Add components with `npx shadcn@latest add <name>` (config in `components.json`). Afterwards run `npm run format` and check `package.json`: the `shadcn` CLI package is deliberately **not** a dependency (its transitive deps fail `npm audit`), so remove it if `add` re-installs it, and keep `src/index.css` importing `./styles/shadcn-tailwind.css` rather than `shadcn/tailwind.css`.
- `src/styles/shadcn-tailwind.css` is vendored from the `shadcn` package (custom variants like `data-open`, plus utilities); it's excluded from Prettier so updates can be copied over verbatim.
