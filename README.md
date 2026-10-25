# Matteo De Rinaldis — Portfolio

A bilingual personal portfolio built with React and TypeScript. It presents professional experience, selected projects, skills, and contact information through a responsive single-page application.

## Tech stack

- React 19 and TypeScript
- Vite for development and production builds
- React Router for client-side routes
- styled-components for component styling and themes
- Motion and GSAP for interface animation
- React Hook Form for contact form handling
- React PDF, React Icons, and Hugeicons
- Vitest, Testing Library, and jsdom for tests

## Architecture

The application starts in `src/index.tsx`, which mounts the app, and `src/App.tsx` composes the language and theme providers, router, shared layout, and page routes. Shared UI lives in components; page views, portfolio data, translations, and theme/global styles are kept in their respective directories.

The in-app **Technical Overview** modal provides a concise, developer-oriented summary of the portfolio architecture and project structure.

## Project structure

```text
public/                 Static assets and Netlify redirects
src/
├─ assets/              Images, fonts, and documents
├─ components/          Shared UI, header, and footer
│  └─ react-bits/       React Bits-derived components and effects
├─ constants/           Shared constants and external links
├─ data/                Portfolio content
├─ i18n/translations/   English and Italian translations
├─ pages/               Route views and related tests
├─ styles/              Global styles and theme
├─ App.tsx               Providers, layout, and routes
└─ index.tsx             Application entry point
```

## Development

Requires Node.js and npm. From the project root:

```bash
npm ci
npm run dev
```

Vite prints the local development URL when the server starts.

## Testing

Run the tests in watch mode:

```bash
npm test
```

Run them once:

```bash
npm run test:run
```

Vitest runs tests in jsdom with Testing Library matchers set up from `src/setupTests.ts`.

## Build

Create the production bundle in `dist/`:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment & external services

The static site is hosted and deployed on Netlify, which also manages its custom domain. The `public/_redirects` rule routes requests to `index.html` so client-side routes work on direct visits and refreshes.

- **Cloudflare Web Analytics** — website analytics.
- **Supabase Storage** — public storage and delivery of the CV/document only; it is not used as a database or application backend.
- **Web3Forms** — contact form submission delivery.
