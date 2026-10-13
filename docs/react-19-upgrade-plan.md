# Upgrade plan: `cards` → React 19.3 + React Compiler

Status legend: `[ ]` pending · `[~]` in progress · `[x]` done

## Scope

Full-toolchain upgrade (React 19.3, Vite 8, TypeScript 6, ESLint 10 flat config),
enable React Compiler (Babel pipeline), remove now-redundant manual memoization,
fix concrete bugs/anti-patterns, and add `AGENTS.md`,
`docs/react-19-best-practices.md`, and `opencode.json` (Context7 MCP).

## Dependency targets (verified on npm)

| Package | From | To |
|---|---|---|
| react / react-dom | 18.2 | **19.3.0** |
| @types/react / @types/react-dom | 18.2 | **19.3.0** |
| @reduxjs/toolkit | 2.2.2 | **2.13.0** |
| react-redux | 9.1.0 | **9.3.0** |
| @vercel/analytics | 1.3.1 | **2.0.1** |
| lucide-react | 0.555.0 | **1.56.0** |
| react-swipeable | 7.0.1 | **7.0.2** |
| bootstrap | 5.3.3 | **5.3.8** |
| vite | 5.2 | **8.3.4** |
| @vitejs/plugin-react-swc | 3.6 | **remove** |
| @vitejs/plugin-react | — | **6.1.2** (add) |
| @rolldown/plugin-babel | — | **0.2.4** (add) |
| babel-plugin-react-compiler | — | **1.0.0** (add) |
| vite-plugin-pwa | 0.19.7 | **2.0.0** |
| typescript | 5.4.3 | **6.0.3**¹ |
| eslint | 8.57 | **10.12.0** |
| @typescript-eslint/* | 7.4 | **8.71.2** |
| eslint-plugin-react-hooks | 4.6 | **7.1.1** |
| eslint-plugin-react-refresh | 0.4 | **0.5.7** |
| eslint-config-prettier / eslint-plugin-prettier / prettier | 9.1 / 5.1 / 3.2 | **10.1.8 / 5.5.7 / 3.9.10** |
| sass | 1.72 | **1.105.1** |

Unchanged already-latest: `@popperjs/core`, `exceljs`, `file-saver`.

---

## Phase 1 — Documentation + MCP config

- [x] `AGENTS.md` — stack, commands, React 19.3 + compiler rules, structure, verification.
- [x] `docs/react-19-best-practices.md` — React 19.3 features, compiler usage, memoization guidance, RTK/Vite/TS/ESLint notes.
- [x] `opencode.json` — `$schema`, `instructions`, Context7 MCP server.

## Phase 2 — Toolchain migration

- [x] `package.json` — apply version table; swap SWC plugin for Babel plugin + compiler devDeps.
- [x] `vite.config.ts` — `react()` + `@rolldown/plugin-babel` + `reactCompilerPreset()`; re-check PWA v2 options.
- [x] ESLint flat config — delete `.eslintrc.cjs`, create `eslint.config.js`, keep `--max-warnings 0`.
- [x] `tsconfig.json` / `tsconfig.node.json` — bump target/lib, keep bundler resolution.

> Deviation: TypeScript pinned to **6.0.3**, not 7.0.2. `typescript-eslint@8` declares
> peer `typescript >=4.8.4 <6.1.0`, so TS 7 cannot be used with linting. Revisit when
> `typescript-eslint` supports TS 7.

## Phase 3 — React 19 migration + compiler prerequisites

- [x] `src/main.tsx` — `import { StrictMode } from 'react'`; optional `onCaughtError`/`onUncaughtError`.
- [x] `src/components/Route/Route.tsx` — `JSX.Element` → `ReactNode`.
- [x] Ref types — `MutableRefObject` → `RefObject`; type refs as `HTMLDivElement`.
- [x] `DialogContext.tsx` — resolver in `useRef`; `<DialogContext value={...}>`.
- [x] `App.tsx` — move render-time localStorage/dispatch/URL work into effects.
- [x] `SpeakerComponent.tsx` — utterance + rate refs; load voices via effect, not render.
- [x] `MenuComponent.tsx` — guard `window.PayPal` access.

## Phase 4 — Memoization cleanup + targeted fixes

- [x] Remove redundant `useCallback`/`useMemo` (`CardComponent`, others); keep only where identity must persist for non-React consumers.
- [x] `utils/compress.ts` — chunk byte→char conversion (avoid call-stack overflow).
- [x] `store/cardsSlice.ts` — bounds-check `setCardIndex` against payload; index-based `removeCurrentCard`; snapshot sort decision.
- [x] `AddComponent.tsx` — `structuredClone`, stop sharing `emptyCard` reference.
- [x] `SearchComponent.tsx` — index-based card selection, stable keys.
- [x] `hooks/hooks.ts` — delete unused hooks.
- [x] Route mounting — reduce always-mounted routes / lazy-load.
- [x] `CardComponent.tsx` — document `dangerouslySetInnerHTML` XSS surface.
- [x] `README.md` — update tech stack versions.

> Notes:
> - `CardComponent` keeps `useCallback` for `slideCard`/`handleKeyDown`: their
>   identity is written to a ref and consumed by `react-swipeable` and
>   `window.addEventListener` outside React, so stable identity is required by
>   the repo's memoization policy.
> - `Route` now renders only the active route instead of CSS-hiding all six.
> - `DialogContext` split into `DialogContextValue.ts` (context only) so the
>   component file satisfies `react-refresh/only-export-components`.
> - A few compiler-rule hits are suppressed with justification
>   (`AddComponent` store→form sync; `MenuComponent` ref read in an onClick).
> - lucide-react 1.x dropped brand icons, so `Github`/`Linkedin` are now local
>   SVG components in `Icons/BrandIcons.tsx`.

## Phase 5 — Verification

- [x] `npm install`
- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run dev` manual smoke test (theme, flip/swipe/keys, CRUD, groups, xlsx, search, TTS).
- [x] Confirm compiler active — build output contains `react.memo_cache_sentinel`.

## Follow-up fixes (found during smoke testing)

- **PayPal SDK on demand.** Removed the global `<script>` from `index.html`; the
  donation SDK is now loaded lazily via `src/utils/paypal.ts` only when the
  donate UI is used. Fixes the Chrome `unload` Permissions-Policy violation
  (third-party `componentV2.jsx`) and drops ~283 KB from startup.
- **Text-to-speech is a real play/stop toggle.** `SpeakerComponent` drives the
  icon (green Play / red Square stop) from `isSpeaking`; a second press stops
  instead of queueing, pending starts are cancelled, and playback rate alternates
  on each start.
- **Brand icons.** lucide 1.x dropped brand icons, so `Icons/BrandIcons.tsx`
  provides solid GitHub/LinkedIn SVGs (forced fill, since `ClayIcon` defaults to
  stroked line icons). Unused `iconMapping` keys removed.
- **Shadow/shape consistency.** Icon action buttons (Play/Stop/Edit/Delete) are
  circular by default and rounded-square on hover, keeping the small flat shadow;
  dialog and dialog-button shadows reduced; tooltip offsets tuned.
- **Vite config.** Uses `import.meta.dirname` and explicit import extensions
  (native-loader friendly); Bootstrap's Dart Sass deprecations silenced via
  `quietDeps` + `silenceDeprecations`.

