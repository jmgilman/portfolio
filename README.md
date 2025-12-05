# jmgilman.com

Personal portfolio site for Joshua Gilman. Built with [Astro](https://astro.build/), [Tailwind CSS v4](https://tailwindcss.com/), and TypeScript.

## Quick Start

```bash
git clone https://github.com/jmgilman/jmgilman.com.git
cd jmgilman.com
npm install
npm run dev
```

Open `http://localhost:4321`

## Scripts

| Command           | Description        |
| ----------------- | ------------------ |
| `npm run dev`     | Development server |
| `npm run build`   | Production build   |
| `npm run preview` | Preview build      |
| `npx astro check` | Type checking      |

## Adding Content

**Blog posts**: Create `.md` files in `src/content/blog/`

```markdown
---
title: 'Post Title'
excerpt: 'Brief description'
tags: ['Tag1', 'Tag2']
date: 2024-01-15
readTime: '5 min read'
featured: false
---
```

**Projects**: Edit `src/data/projects.ts`

## License

MIT
