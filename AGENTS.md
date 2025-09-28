# Repository Guidelines

## Dos and Don'ts
- Do install dependencies with `yarn` (classic Yarn v1) after checkout so postinstall scripts set up Electron and Husky hooks correctly.
- Do run targeted Jest suites first, e.g. `yarn test app/lib/__tests__/loadThemes.spec.js`, before running the full suite.
- Do follow the existing two-space indentation and no-semicolon style when editing JavaScript/TypeScript files.
- Do reference existing Webpack aliases (e.g. `main/...`, `lib/...`, `plugins/...`) instead of rewriting import paths.
- Don't switch package managers or bump Node/Electron versions without coordinating updates to `package.json`, `electron-builder.json`, and CI workflows.
- Don't mass-reformat files or reorganize modules; keep diffs minimal and scoped to the task at hand.

## Project Structure and Module Organization
- Electron app with React renderer lives under `app/`; `app/main` is the primary renderer UI, `app/background` handles background tasks, and `app/lib` hosts shared utilities.
- Core and external plugin logic resides in `app/plugins`; `app/plugins/core` contains built-in plugins and supporting helpers.
- Webpack, Babel, Jest, and TypeScript configs are defined at the repo root (`webpack.config.*.js`, `babel.config.js`, `jest.config.js`, `tsconfig.json`).
- Release assets, icons, and installer scripts live in `build/`; Electron Builder configuration is in `electron-builder.json`.
- Continuous Integration workflows that run tests and releases are under `.github/workflows/` (`pr.yml`, `build.yml`).
- Top-level entry points include `server.js` (hot-reload dev server) and `app/main.development.js` (Electron main process during development).

## Build, Test, and Development Commands
- Install dependencies with `yarn`; this also runs `electron-builder install-app-deps` and enables Husky commit hooks.
- Launch the hot-reload development loop with `yarn dev` (spawns the Webpack hot server and a development Electron window).
- For production smoke tests run `yarn build` first (emits `app/main.js` and `app/dist` bundles), then launch Electron with `yarn start`.
- Build artifacts with `yarn build` (renders both main and renderer bundles) or package distributables with `yarn package` / `yarn release` as defined in `package.json`.
- Run focused Jest suites via `yarn test <path-or-pattern>`; for example `yarn test app/main/actions/__tests__/search.spec.js` exercises action creators. The default `yarn test` executes all suites with coverage (`collectCoverage: true`).
- Linting uses ESLint with the Airbnb base: `yarn lint` runs against `app/background app/lib app/main app/plugins *.js`. Keep new code compliant and retain the inline suppressions where we forward plugin props (ResultsList rows, FormItem form controls).

## Coding Style and Naming Conventions
- `.editorconfig` enforces spaces (size 2) for JavaScript/TypeScript and tabs elsewhere; trim trailing whitespace except in Markdown.
- ESLint (Airbnb rules) is the baseline; notable overrides include `semi: ['error', 'never']`, disabled dangling commas, and relaxed import extension checks. Maintain single quotes. Do not add new trailing commas; you may leave existing trailing commas in legacy code unchanged.
- Shared modules rely on Webpack/TypeScript path resolution (`app` treated as the module root). Preserve aliases like `import config from 'lib/config'` and directory `index.(js|ts)` entrypoints.
- React components primarily live in `app/main/components`, with styles handled via CSS modules (`*.module.css`). Follow existing patterns for component structure and CSS naming.
- Comments are short English line comments (`//`) or block comments where clarification is required; prefer matching the current files' commenting style.

## Testing Guidelines
- Jest is configured via `jest.config.js` with coverage enabled and a custom module mapper for static assets and CSS; tests live alongside source in `__tests__` directories and `*.spec.js` files.
- Use `yarn test <file>` for scoped runs while iterating, then run `yarn test` before submitting to ensure coverage numbers stay intact.
- When adding UI logic, favor lightweight Jest tests around reducers, actions, or utilities; UI components typically rely on snapshot-free, behavior-focused tests.
- Tests rely on the Electron renderer environment; include `@jest-environment jsdom` when DOM APIs are needed, mirroring existing suites.

## Commit and Pull Request Guidelines
- Conventional Commits are enforced by Husky + Commitlint (`.commitlintrc.json` extends `@commitlint/config-conventional`). Keep subjects imperative and under 50 characters when possible.
- Use `yarn commit` (Commitizen) if you need help crafting compliant messages; otherwise ensure manual commits follow the same format (`feat:`, `fix:`, `chore:` etc.).
- Keep pull requests focused and ensure `yarn test <scope>` passes locally before pushing; CI (`.github/workflows/pr.yml`) re-runs `yarn` and `yarn test --detectOpenHandles --forceExit` on Ubuntu.
- Link related issues in PR descriptions and include screenshots/gifs when UI behavior changes, matching past contributions in the history.

## Safety and Permissions
- Ask before adding dependencies, modifying build/CI configuration, or deleting/renaming files that affect Electron packaging or plugin contracts.
- Reading files, inspecting configs, and running scoped tests (`yarn test <file>`) or targeted builds (`yarn build-main`) are safe by default.
- Avoid destructive git operations, manual cleanups in `release/`, or editing generated bundles under `app/dist`; regenerate via the provided scripts instead.
- Do not store secrets or environment credentials in the repo; follow `.env.example` when local overrides are required.
