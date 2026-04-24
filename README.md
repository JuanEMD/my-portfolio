# Juan Marmolejos — Portfolio

Personal portfolio built to showcase projects, skills, and professional experience. This document explains the technical decisions behind the implementation.

## Tech Stack

### Next.js 16 (Pages Router)

Next.js provides server-side rendering and static generation out of the box. The Pages Router was chosen over the App Router for compatibility with `next-i18next`, which does not support the App Router. For a single-page portfolio, the Pages Router is sufficient and reduces complexity.

### React 19

Latest stable version. No breaking changes for this use case. Used for component composition, local state (burger menu, theme toggle, contact form), and context (theme).

### Tailwind CSS v4

Utility-first CSS. Chosen for rapid development and consistent spacing/color scales without writing custom CSS for every component. v4 uses the `@theme` directive instead of a config file, which reduces project boilerplate. Dark mode is handled via the `.dark` class on the `<html>` element, toggled from a React context.

### next-i18next

Handles English/Spanish translations. Integrates directly with the Pages Router via `getStaticProps` + `serverSideTranslations`. Translations live in `public/locales/{lang}/translation.json`. Language is switched via Next.js locale routing (`router.push` with `locale` option).

### Resend

Used for the contact form API route (`pages/api/contact.js`). Sends emails server-side, keeping credentials out of the client bundle. Chosen over alternatives (Nodemailer, SendGrid) for its simple REST-based API and generous free tier.

## Architecture

### Layout Component

All pages share a single `src/layouts/index.jsx` component that wraps content with the gradient background, max-width container, Navbar, and Footer. This keeps page files focused on content and avoids duplicating structural markup. The layout also owns language-switching logic since it has access to `useRouter`.

### Feature-based Structure

Code is organized by feature (`src/features/`) rather than by type (components/containers). Each feature owns its JSX, logic, and styles. Shared UI primitives (buttons, inputs, pills) live in `src/components/common/`. This structure scales well and makes it easy to locate and modify a specific section of the portfolio.

## Practices

### WCAG 2.1 AA Accessibility

Semantic HTML throughout (`<main>`, `<nav>`, `<article>`, `<ul>`/`<li>` for nav links and skill lists). All interactive elements have visible focus styles via `:focus-visible`. The contact form uses `aria-required`, `aria-invalid`, `aria-describedby`, and `role="alert"` for inline error messages. A skip-to-content link is present for keyboard users. External links include `rel="noopener noreferrer"` and a visually hidden "(opens in new tab)" notice.

### Mobile-first Responsive Design

Default Tailwind classes target mobile. `sm:` (640px+) breakpoint adds tablet/desktop layout. Single-column card layouts stack vertically on mobile and switch to side-by-side grids on wider screens.

### SEO

`<Head>` in the layout injects `<title>`, `<meta name="description">`, `<meta name="keywords">`, and `<meta name="author">` with translated values on every render. Keywords and descriptions are stored in the translation JSON files alongside other copy, keeping all user-facing text in one place.

## Running Locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
pnpm start
```

