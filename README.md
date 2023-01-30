# Await Protocol

Website, search, [crawler](src/crawler/README.md).

## Requirements

- [Node.js LTS](https://nodejs.org)
- [TypeScript](https://code.visualstudio.com/docs/languages/typescript), [ESLint](https://eslint.org/docs/user-guide/integrations), [Prettier](https://prettier.io/docs/en/editors.html), [EditorConfig](https://editorconfig.org).

## Dev

First, set `.env.local` file. Example:

```sh
SEARCH_API_HOST=167.72.41.5
SEARCH_API_KEY=3YE6uUg
```

Run the development server:

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
