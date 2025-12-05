// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';

export default tseslint.config(
  // Global ignores
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**', 'screenshots/**'],
  },

  // Base JavaScript rules
  eslint.configs.recommended,

  // TypeScript configuration (non-Astro files)
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Common rules
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // Config files - Node.js globals and disable type checking
  {
    files: ['**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
    },
  },

  // Astro configuration
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],

  // Astro files - add astroHTML global
  {
    files: ['**/*.astro'],
    languageOptions: {
      globals: {
        astroHTML: 'readonly',
      },
    },
  }
);
