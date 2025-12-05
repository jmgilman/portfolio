// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import snapshot from '@twocaretcat/astro-snapshot';

const enableSnapshot = process.env.ASTRO_SNAPSHOT === 'true';

// Snapshot configuration for AI review screenshots
/** @type {import('@twocaretcat/astro-snapshot').Config} */
const snapshotConfig = {
  defaults: {
    width: 1440,
    height: 900,
    overwrite: true,
  },
  pages: {
    '/': [
      { outputPath: 'screenshots/home-desktop.png' },
      { outputPath: 'screenshots/home-mobile.png', width: 390, height: 844 },
      {
        outputPath: 'screenshots/home-full.png',
        height: 3000,
        screenshotOptions: { fullPage: true },
      },
    ],
    '/blog': [
      { outputPath: 'screenshots/blog-desktop.png' },
      { outputPath: 'screenshots/blog-mobile.png', width: 390, height: 844 },
    ],
    '/blog/kubernetes-at-scale': [
      { outputPath: 'screenshots/blog-kubernetes-desktop.png' },
      { outputPath: 'screenshots/blog-kubernetes-full.png', screenshotOptions: { fullPage: true } },
    ],
    '/blog/terraform-best-practices': [
      { outputPath: 'screenshots/blog-terraform-desktop.png' },
      { outputPath: 'screenshots/blog-terraform-full.png', screenshotOptions: { fullPage: true } },
    ],
    '/blog/sre-career-path': [
      { outputPath: 'screenshots/blog-sre-career-desktop.png' },
      { outputPath: 'screenshots/blog-sre-career-full.png', screenshotOptions: { fullPage: true } },
    ],
    '/projects': [
      { outputPath: 'screenshots/projects-desktop.png' },
      { outputPath: 'screenshots/projects-mobile.png', width: 390, height: 844 },
    ],
    '/resume': [
      { outputPath: 'screenshots/resume-desktop.png' },
      { outputPath: 'screenshots/resume-mobile.png', width: 390, height: 844 },
      { outputPath: 'screenshots/resume-full.png', screenshotOptions: { fullPage: true } },
    ],
    '/contact': [
      { outputPath: 'screenshots/contact-desktop.png' },
      { outputPath: 'screenshots/contact-mobile.png', width: 390, height: 844 },
    ],
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://jmgilman.com',
  output: 'static',

  integrations: [
    expressiveCode({
      themes: ['one-dark-pro'],
      styleOverrides: {
        codeFontFamily: 'JetBrains Mono, monospace',
        uiFontFamily: 'Inter, sans-serif',
        borderRadius: '0.5rem',
      },
    }),
    sitemap(),
    ...(enableSnapshot ? [snapshot(snapshotConfig)] : []),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
