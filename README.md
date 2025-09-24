# Mosaic

Mosaic is a small productivity dashboard built with Vue 3, TypeScript and Vite. It combines a compact set of UI components (timer, tasks, flashcards, PDF reader, and a mosaic visual) with a lightweight store using Pinia and routing via Vue Router.

This README documents how to run, build and understand the project's structure.

## Tech stack
- Vue 3 (composition API and `<script setup>`)
- TypeScript
- Vite for fast dev server and build
- Tailwind CSS for utility-first styling (configured via `@tailwindcss/vite`)
- Pinia for state management
- Vue Router for navigation

## Quick start

Requirements: Node.js (16+ recommended) and npm/yarn/pnpm.

From the project root in PowerShell:

```powershell
# install deps
npm install

# start dev server (Vite)
npm run dev
```

Open http://localhost:5173 (or the address Vite prints) in your browser.

Build for production:

```powershell
npm run build

# preview the production build locally
npm run preview
```

Notes:
- Type checking is run as part of the `build` script via `vue-tsc -b`.

## Available scripts (from package.json)
- `dev` — start Vite dev server
- `build` — type-check and build for production (`vue-tsc -b && vite build`)
- `preview` — preview the production build locally

## Project structure (important files)

- `index.html` - app entry HTML
- `src/main.ts` - app bootstrap (mounts Vue, Pinia and Router)
- `src/App.vue` - top-level app layout (renders `Navbar` + `RouterView`)
- `src/style.css` - global styles and custom design tokens (Tailwind + custom CSS variables)
- `src/router/router.ts` - application routes (`/`, `/profile`, `/login`)
- `src/stores/` - Pinia stores (timer, tasks, grid, etc.)
- `src/components/` - UI components (examples include `Navbar.vue`, `Mosaic.vue`, `FlashCard.vue`, `Modal.vue`, `Statistics.vue`, `Profile.vue`, `PdfReader.vue`, `Sidebar.vue`, `Timer.vue`, `Tasks.vue`)
- `src/views/` - pages (e.g. `HomeView.vue`, `ProfileView.vue`)

## Routes
- `/` — Home dashboard
- `/profile` — Profile and statistics view
- `/login` — Login view (stub)

## Design + UI notes
- The app uses Tailwind utilities and a small set of custom CSS variables defined in `src/style.css` (`--color-primary`, `--color-secondary`, `--color-light`, `--color-offwhite`, `--color-dark`).
- Many components follow a rounded-corner motif using classes like `rounded-r rounded-bl` to match the mosaic aesthetic.
- Components are currently mostly UI-only; several modal and card components include presentational markup ready to be wired to state.

## Flashcards (example)
- `src/components/FlashCard.vue` includes a flip animation and a Modal-based form for creating new cards. The Modal form is intentionally presentational (no persistence) and can be wired to a Pinia store or local state.

## Development tips
- To add global types or tweak TypeScript settings, edit `tsconfig.json` or `tsconfig.app.json`.
- Tailwind configuration is handled through `@tailwindcss/vite` and `tailwindcss` (check `src/style.css` for imports).
- Use `vue-tsc --noEmit` locally to run quick type checks.

## Contributing
- Open an issue or a PR on the repository. Keep changes small and focused. Include a short description and screenshots for UI changes.
