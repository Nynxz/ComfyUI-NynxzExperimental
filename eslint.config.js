// ESLint flat config — the TypeScript/Vue counterpart to ruff on the Python side.
// ESLint catches bugs; Prettier owns formatting (see .prettierrc.json). Run with
// `pnpm lint` (report) / `pnpm lint:fix`, and `pnpm format` to reformat.
//
// eslint-plugin-vue is what makes this worth ESLint over a faster JS-only linter
// (biome/oxlint): those don't parse `.vue` single-file components, and this pack's
// frontend lives in FusionGrid.vue.
import { defineConfig, globalIgnores } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier/flat'
import globals from 'globals'

export default defineConfig(
  // Built output, deps, and scratch dirs — never our source.
  globalIgnores(['node_modules/**', 'web/**', 'dist/**', 'temp/**']),

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // `essential` = Vue's error-prevention rules only. The `recommended` tier piles on
  // attribute-formatting opinions (one attr per line, self-closing style, …) that a
  // formatter should own — same split as ruff lint vs `ruff format` on the Python side.
  ...pluginVue.configs['flat/essential'],

  {
    // vue-eslint-parser handles the SFC; hand its <script> blocks to the TS parser.
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  {
    // Frontend runs in the browser (ComfyUI's page), so browser globals are in scope.
    files: ['src/**/*.{ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // ComfyUI's frontend types are loose: JSON route responses and node `output`
      // records arrive untyped, and `any` at those boundaries (immediately coerced with
      // String()/Number()) is idiomatic. Kept visible as a warning, not a hard failure —
      // bump to "error" if/when these boundaries get real types.
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  {
    // Declaration shims. The `declare module "*.vue"` block is Vite's own recommended
    // boilerplate — `DefineComponent<{}, {}, any>` is required there by design.
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Last: switch off any lint rules that would fight Prettier's formatting.
  prettier,
)
