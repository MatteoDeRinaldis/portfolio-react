# Matteo De Rinaldis — Portfolio

Personal portfolio presenting my professional experience, technical skills, and work as a Frontend Engineer. Built with React and TypeScript, with a responsive interface, interactive animations, and English and Italian content.

## Overview

- **Interactive home page** with animated Frontend and Engineer sections.
- **Professional background** presented through dedicated About, Projects, and Skills pages and an experience timeline.
- **Light and dark themes**, with the selected theme saved locally.
- **English and Italian translations**, with a persistent language preference.
- **Integrated PDF viewer** for reading and downloading the CV.
- **Contact form** with email submission, field validation, loading feedback, and success and error notifications.

## Technology

| Area | Tools |
| --- | --- |
| Interface | React 19, TypeScript |
| Routing | React Router 7 |
| Styling | styled-components, shared theme tokens |
| Animation | Motion |
| Icons and documents | React Icons, React PDF |
| Email delivery | Web3Forms |
| Development and build | Create React App / react-scripts |
| Testing | Jest, React Testing Library |

## Getting Started

Install Node.js and npm, then run the following commands from the project root:

```bash
npm ci
npm start
```

`npm ci` installs dependencies from the committed lockfile. The development server opens at **http://localhost:3000** by default and reloads when source files change.

## Available Commands

The following scripts are defined in [package.json](package.json):

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server |
| `npm run build` | Generate the production bundle in `build/` |
| `npm test` | Run tests in interactive watch mode |
| `npm run eject` | Expose the underlying build configuration; this operation is irreversible |

To run tests once, without watch mode:

```bash
npm test -- --watchAll=false
```

To run the contact form tests only:

```bash
npm test -- --watchAll=false --runInBand --runTestsByPath src/pages/Contact.test.js
```

## Project Structure

```text
public/                 Static public assets and HTML entry point
src/
├── assets/             Images and CV document
├── components/         Shared interface components, header, and footer
├── data/               Portfolio and professional experience content
├── i18n/               Language provider and translation dictionaries
├── pages/              Page components, page styles, and tests
├── styles/             Global styles and theme definitions
├── types/              Asset type declarations
├── App.tsx             Application layout, routing, and theme selection
└── index.tsx           React entry point
```

## Content and Configuration

- **Routes and layout:** [src/App.tsx](src/App.tsx).
- **Colors, typography, and spacing:** [src/styles/theme.ts](src/styles/theme.ts).
- **Translations:** [src/i18n/translations](src/i18n/translations).
- **Professional experience:** [src/data](src/data).
- **CV document:** [src/assets/docs](src/assets/docs), referenced by the footer.

The application includes `/`, `/about`, `/projects`, `/skills`, `/contact`, and `/privacy-policy` routes.

## Contact Form

The contact page submits requests directly to Web3Forms over HTTPS, without opening the visitor's email application or requiring a dedicated application backend.

The public form identifier is configured as `contactAccessKey` in [src/pages/Contact.tsx](src/pages/Contact.tsx). When adapting this project, replace it with the access key for your own verified Web3Forms form.

Submission behavior:

- Required fields and email format are validated before sending.
- Leading whitespace is removed while typing; spaces within the text are preserved.
- Fields and the submit button are disabled while a request is pending.
- A successful service response displays a subtle green notification and clears the form.
- Service errors, network failures, and requests exceeding 30 seconds display an error notification and retain the draft for retry.

The contact tests use simulated service responses to verify validation, successful submission, duplicate submission prevention, and failure handling. Actual inbox delivery can be checked by submitting the form from the running application.

## Production Deployment

Generate the static production files:

```bash
npm run build
```

Publish the contents of `build/` to your static hosting provider. Configure a fallback to `index.html` for application routes so that direct navigation and page refreshes work with React Router.

Before publishing, confirm the Web3Forms recipient and website settings, review the contact and privacy information, and check that the CV and portfolio content are up to date.
