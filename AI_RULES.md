# AI Rules — Resh

Guidelines for AI assistants working in this codebase.

## Tech Stack

- **Framework:** Next.js 16 with the App Router (`src/app/`) and React 19.
- **Language:** TypeScript 5 with strict settings enabled.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`; custom theme tokens live in `src/app/globals.css`.
- **UI Components:** shadcn/ui — pre-built components are in `src/components/ui/` and must be imported from there.
- **Icons:** Lucide React is the default icon library; `react-icons` is available for brand or platform-specific icons.
- **Forms:** React Hook Form combined with Zod schemas and `@hookform/resolvers` for validation.
- **Data Fetching & State:** React Query (TanStack Query) for server state; local state uses React hooks.
- **Animation:** Framer Motion for component animations, GSAP for complex timelines, and Three.js for 3D scenes.
- **Charts:** Recharts for data visualizations.
- **Carousels:** Embla Carousel via the shadcn/ui Carousel wrapper.
- **Notifications:** Sonner for toast notifications.

## Library Usage Rules

- **Routing & pages:** Use Next.js App Router conventions. Route files go in `src/app/`. Keep route pages thin and put the main view content in `src/views/` (e.g. `src/app/about-us/page.tsx` imports `AboutView` from `src/views/about.tsx`).
- **UI components:** Always prefer `src/components/ui/` shadcn/ui components before building custom ones. Do not edit existing shadcn/ui component source files; compose or extend them in new components when needed.
- **Styling:** Prefer Tailwind utility classes. Avoid arbitrary values; extend the theme in `src/app/globals.css` if a token is missing. Use `cn()` from `src/lib/utils.ts` to merge class names conditionally.
- **Icons:** Use `lucide-react` for all interface icons. Only reach for `react-icons` when Lucide does not have the required brand or platform icon.
- **Forms:** Build every form with `react-hook-form`, validate with Zod, and wire validation through `@hookform/resolvers/zod`. Use the shadcn/ui `Form`, `Field`, `Input`, `Textarea`, `Select`, etc. primitives.
- **Server data:** Use React Query for caching, background refetching, and mutation handling. Avoid manual `fetch` state management inside components.
- **Dates:** Use `date-fns` for parsing, formatting, and manipulation. Use `react-day-picker` for date-picking UI.
- **Animation:** Use Framer Motion for entrance, layout, and gesture animations. Use GSAP only when timelines or scroll-triggered pinning are required. Keep Three.js usage isolated to dedicated scene components.
- **Charts:** Use Recharts for all charts. Avoid bringing in additional chart libraries.
- **Notifications:** Use `sonner` for toast messages via the `Toaster` in `src/app/layout.tsx` or the `toast()` helper.
- **Dialogs & overlays:** Use shadcn/ui `Dialog`, `Sheet`, or `Drawer` instead of custom modal markup.
- **Email:** Client-side email flows use `src/lib/emailjs.ts`. Server-side email should follow existing backend patterns if added.
- **New dependencies:** Do not install new libraries if the same problem can be solved with an already installed package. When in doubt, prefer the library already used elsewhere in the codebase.
