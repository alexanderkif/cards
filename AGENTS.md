# AGENTS.md

Guidance for agents working in this repository.

## What this is

A React + TypeScript flash-card PWA. State lives in Redux Toolkit, styling in
SCSS + Bootstrap, offline support via `vite-plugin-pwa`. There is **no test
framework** — correctness is checked with the build and lint.

## Commands

```bash
npm install       # install deps
npm run dev       # vite dev server (--host)
npm run lint      # eslint, --max-warnings 0
npm run build     # tsc && vite build
npm run preview   # preview the production build
```

Always run `npm run lint` and `npm run build` before considering a change done.

## Stack (all latest)

- React **19.3** + react-dom 19.3 (`@types/react*` 19.3)
- React Compiler **1.0** via `@vitejs/plugin-react` + `@rolldown/plugin-babel`
- Vite **8** (rolldown), TypeScript **6**, ESLint **10** (flat config)
- Redux Toolkit **2.13** + react-redux **9.3**
- SCSS + Bootstrap 5, `vite-plugin-pwa` 2

## React Compiler rules (important)

Memoization is **automatic**. Do **not** add `useMemo`, `useCallback`, or
`React.memo` by default. The compiler must be able to optimize a component, and
it bails out when the Rules of React are broken.

Only keep manual memoization when identity must be stable **outside** React's
render cycle (e.g. a value written to a ref and read by a non-React API, or an
effect dependency that calls a non-React imperative API). When you do, leave a
comment explaining why.

Rules to respect in every component/hook:

- No side effects during render — no `dispatch`, no `localStorage`, no
  `document`/`window` mutation, no object construction that must persist.
- Don't mutate props, state, or values created outside the component.
- Hooks must be called unconditionally and at the top level.
- Keep render pure; put effects in `useEffect` / event handlers.

Escape hatch: add `"use no memo"` as the first statement of a component to
opt it out temporarily, then fix the underlying violation.

Verification: components optimized by the compiler show a **"Memo ✨"** badge in
React DevTools.

## Code conventions

- TypeScript strict; `noUnusedLocals`/`noUnusedParameters` are on.
- Import alias `@/` → `src/`. Prefer it over long relative paths.
- One component per folder: `ComponentName/ComponentName.tsx` + `.scss`.
- Function components with default exports.
- SCSS, no inline styles except dynamic values.
- No comments unless they explain non-obvious intent.

## Performance notes

- Only the active route is mounted (`Route` returns `null` otherwise). Keep heavy
  views out of the initial tree, or `React.lazy` them with `Suspense`.
- Cache `localStorage` reads; never read/write it during render.
- Load third-party scripts on demand rather than in `index.html` (the PayPal
  donation SDK is loaded lazily via `src/utils/paypal.ts`).
- `dangerouslySetInnerHTML` is used for card content (imported from URL/xlsx).
  Treat that content as untrusted.

See `docs/react-19-best-practices.md` for the long form.
