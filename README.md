# Welcome

A small React app: a "welcome" heading and a button that counts clicks. It's a starting point built on a modern, fully checked toolchain.

## Stack

- [Vite 8](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com) components (Radix-based)
- [Vitest](https://vitest.dev) + React Testing Library for tests
- [Oxlint](https://oxc.rs) for linting, [Prettier](https://prettier.io) for formatting
- GitHub Actions CI running `npm audit`, lint, format check, tests and build

## Getting started

Node is pinned to the 24 major in `mise.toml`. With [mise](https://mise.jdx.dev) installed:

```sh
mise install   # installs the pinned Node version
npm install
npm run dev    # http://localhost:5173
```

Without mise, use any Node 24 install.

## Scripts

| Command           | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                           |
| `npm run build`   | Type-check, then build to `dist/`                    |
| `npm run preview` | Serve the production build                           |
| `npm test`        | Run the tests once (`npm run test:watch` to watch)   |
| `npm run lint`    | Lint with Oxlint                                     |
| `npm run format`  | Format with Prettier (`format:check` to verify only) |

## Adding UI components

```sh
npx shadcn@latest add <component>
npm run format
```

Components are copied into `src/components/ui/` and are ours to edit. The `shadcn` CLI is intentionally not a project dependency; see [CLAUDE.md](CLAUDE.md) for why, and for the project's other conventions.
