# React 19.3 best practices

Long-form guidance for this repo. `AGENTS.md` is the short version.

---

## 1. React 19.3 features

### Things this app should use

- **`ref` as a prop.** Function components receive `ref` like any other prop;
  `forwardRef` is no longer needed (and will be deprecated). Not currently used
  here, but use it when a new wrapper around a DOM node is needed.
- **`<Context value={...}>`.** Render the context object itself as the provider
  instead of `<Context.Provider>`. `DialogContext` is a good candidate.
- **Async Actions.** `useTransition`, `useActionState`, and `useOptimistic`
  replace hand-rolled `isPending`/`error` state for async mutations. The
  confirm-dialog flow is imperative today; if it grows, model it as an action.
- **`use` for reading context** (conditionally, after early returns) once a
  component needs that flexibility.
- **Document metadata** (`<title>`, `<meta>`, `<link>`) can be rendered inside
  components and React hoists them to `<head>`. Useful for a per-route title.

### Behavior changes to remember

- `ref` callbacks may return a cleanup function; returning anything else is now
  a type error. Use block bodies: `ref={(el) => { instance = el; }}`.
- Hydration and error reporting are more precise; `onCaughtError` /
  `onUncaughtError` root options exist.
- React DOM static APIs (`prerender`) exist but are irrelevant for this
  client-only PWA.

### TypeScript migration notes (`@types/react` 19)

- The global `JSX` namespace is gone. Use `React.JSX.Element` / `ReactNode`
  (e.g. `Route.tsx`).
- `MutableRefObject` is deprecated in favour of `RefObject`. `useRef(init)`
  returns `RefObject`.
- `useRef` now requires an initial argument.

---

## 2. React Compiler

### What it does

The compiler statically analyses components and hooks and inserts memoization
automatically. It replaces most manual `useMemo`/`useCallback`/`React.memo`.

### Setup in this repo

`vite.config.ts`:

```ts
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
```

- The compiler must run **first** in the Babel pipeline; the preset handles it.
- React 19 ships the compiler runtime (`react/compiler-runtime`), so
  `react-compiler-runtime` is **not** installed.
- The SWC React plugin (`@vitejs/plugin-react-swc`) cannot run the compiler.

### Rules of React (compiler bails if broken)

1. **Components must be idempotent.** No side effects during render.
   - Do not `dispatch`, read/write `localStorage`, or mutate the DOM in render.
   - Redux `initialState` may read storage at module load (outside render).
   - Move initialization into `useEffect` or event handlers.
2. **No mutation of props/state** or of values created outside the component.
   Clone before editing (`structuredClone` beats `JSON.parse(JSON.stringify())`).
3. **Hooks are unconditional and top-level.** Never inside loops/conditions.
4. **Values are immutable** unless they are local state/refs you own.

### Verifying

- React DevTools shows a **"Memo ✨"** badge on optimized components.
- Build output contains `import { c as _c } from "react/compiler-runtime"`.

### Opting out

```ts
function Problematic() {
  "use no memo";
  // ...
}
```

Use only temporarily; fix the underlying violation.

### Linting

`eslint-plugin-react-hooks@7` exposes the compiler rules via the
`recommended-latest` preset. A violation means that component is skipped — not
a build failure. Fix at your own pace.

---

## 3. Memoization decision guide

| Situation | Use |
|---|---|
| Derived value used in render | Nothing — compiler memoizes |
| Callback passed to a child | Nothing — compiler memoizes |
| Child that should not re-render | Nothing — compiler memoizes |
| Identity must be stable **across** renders for a non-React API (ref written in render, effect dep calling an imperative API) | `useMemo`/`useCallback`, with a comment |
| Expensive computation the compiler cannot see (impure call) | Extract a pure function first, then rely on the compiler |

Do not “just in case” memoize.

---

## 4. Redux Toolkit 2.13

- Reducers must be **pure**. Moving `localStorage` writes out of reducers into a
  store listener is the correct long-term shape; the reducers here currently
  write storage inline (works, but impure).
- Prefer index-based identity for list mutations; filtering by object identity
  is fragile when cards are cloned.
- `react-redux` 9.3: keep using the typed `useAppDispatch`/`useAppSelector`
  wrappers (`src/store/hooks.ts`).
- `useSelector` runs during render — keep selectors pure and cheap.

---

## 5. Vite 8 / TypeScript 6 / ESLint 10

- **Vite 8** uses rolldown. Node `^20.19 || >=22.12` required.
- **TypeScript 6.0.3** is pinned deliberately: `typescript-eslint@8` declares a
  peer range of `>=4.8.4 <6.1.0`, so TypeScript 7 cannot be used while linting
  with typescript-eslint. Revisit when typescript-eslint supports TS 7.
- **ESLint 10** uses flat config only. `.eslintrc.*` is ignored — configuration
  lives in `eslint.config.js`.
- **react-hooks v7** ships the compiler-aware rules (`react-hooks/refs`,
  `react-hooks/immutability`, `react-hooks/set-state-in-effect`) plus
  `recommended-latest`.
- `vite.config.ts` avoids `__dirname` (uses `import.meta.dirname`) and imports
  local modules with explicit extensions, to keep working with Vite's native
  config loader.
- Bootstrap 5's `@import`-based SCSS triggers Dart Sass deprecations; they are
  silenced for dependencies in `vite.config.ts` (`quietDeps` +
  `silenceDeprecations`) until Bootstrap 6.
- `vite-plugin-pwa@2` — re-check option names when editing the PWA config.

---

## 6. Performance checklist

- Do not mount heavy routes that are hidden. Use conditional rendering or
  `React.lazy` + `Suspense` for `AddComponent`/`AboutComponent`.
- Cache `localStorage` reads; never do them in render.
- Keep imported HTML treated as untrusted when using `dangerouslySetInnerHTML`.
- Prefer `index`-based lookups over `Array.prototype.indexOf` on objects.
