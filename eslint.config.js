// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintIgnores from './eslint.ignores.js'
import globals from 'globals'

import configPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginEslintComments from 'eslint-plugin-eslint-comments'

// @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile}

/**
 * @see https://typescript-eslint.io/packages/typescript-eslint/
 * @see https://typescript-eslint.io/users/configs/#strict
 *
 * @todo plugin:react-hooks/recommended (when its v9+ compatible)
 * @todo add react-refresh and rules (refer to eslintrc.deprecated.cjs of react-core)
 */
export default tseslint.config(
  // add ignore patterns (replaces .eslintignore of pre-v9 eslint)
  eslintIgnores,

  // recommended base configuration for javascript per eslint
  eslint.configs.recommended,

  // recommended plus additional strict rules from typescript-eslint TypeChecked configuration
  // rules: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict-type-checked.ts
  ...tseslint.configs.strictTypeChecked,

  // more opinionated rules that impact style but not program logic
  // rules: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic-type-checked.ts
  ...tseslint.configs.stylisticTypeChecked,

  // prettier
  eslintPluginPrettierRecommended,

  // general configuration that customizes/overrides the recommended base configuration
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'eslint-comments': eslintPluginEslintComments,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: 'tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          modules: true,
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    // settings: {
    //   react: {
    //     version: 'detect',
    //   },
    // },
    rules: {
      // disable `no-unused-vars` or else this rule may conflict with `@typescript-eslint/no-unused-vars`
      // prevents `AssertionError [ERR_ASSERTION]: Node must be provided when reporting error if location is not provided`
      'no-unused-vars': 'off',

      // require curly braces around all blocks to avoid recreating famous bugs and maintain code consistency
      curly: 'error',

      // require evidence that you know what's up when you disable a lint rule and document for future reference
      'eslint-comments/require-description': 'error',

      // typescript is a fancy linter with a type system that's only as strong as its weakest link
      '@typescript-eslint/no-explicit-any': 'error',

      // carve out an exception for cases such as `onSubmit` (expects void) re async handlers that return a promise
      // @see https://github.com/typescript-eslint/typescript-eslint/issues/4619
      // @see https://typescript-eslint.io/rules/no-misused-promises/#checksvoidreturn-true
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],

      // require unused vars to be prefixed with an underscore so it's clear they're intentionally unuseds
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],

      // avoid unnecessary boolean casts
      'no-extra-boolean-cast': 'warn',

      // indexed access can be useful in various cases especially with certain library patterns
      // this is an opionated rule that possibly conflicts with noUncheckedIndexedAccess and others in tsconfig
      '@typescript-eslint/dot-notation': 'off',

      // there are cases where we use || vs. ?? for real-world runtime-safe code (empty strings, 0, etc. fallbacks)
      '@typescript-eslint/prefer-nullish-coalescing': 'off',

      // allow numbers in template literals for flexibility and readability
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],

      // there are differences in behaviour of Record<string, ...> vs. { [key: string]: ... } and vice-versa
      '@typescript-eslint/consistent-indexed-object-style': 'off',

      // there are cases where interfaces vs. types are preferred and vice-versa
      '@typescript-eslint/consistent-type-definitions': 'off',

      // intentionally redundant type consituents are sometimes helpful to make code and IntelliSense readable
      // e.g. `'production' | 'development' | string` can convey likely values while retaining flexibility or other cases
      '@typescript-eslint/no-redundant-type-constituents': 'off',

      // tsconfig strictFunctionTypes is enabled on top of this lint rule
      '@typescript-eslint/explicit-function-return-type': 'warn',

      // annoyingly complains about real-world runtime safety checks that are a good practice for defensive programming
      '@typescript-eslint/no-unnecessary-condition': 'off',

      // we follow a convention for react components to always export a props type/interface even if it extends from elsewhere
      '@typescript-eslint/no-empty-interface': 'off',

      // sometimes we use explicit types to set intentional 'type traps' for maintainability
      // and protect against regressions in future that may be caused in various cases such as dep updates
      '@typescript-eslint/no-inferrable-types': 'off',

      // nice ideas however we have false positives with current eslint with post-zod-parsed types and other cases
      '@typescript-eslint/no-unsafe-argument': 'off', // @future revisit in future after eslint updates
      '@typescript-eslint/no-unsafe-member-access': 'off', // @future revisit in future after eslint updates
      '@typescript-eslint/no-unsafe-assignment': 'off', // @future revisit in future after eslint updates
      '@typescript-eslint/no-unsafe-return': 'off', // @future revisit in future after eslint updates

      // require `import type` for type imports (may also be enforced via tsconfig)
      '@typescript-eslint/consistent-type-imports': 'error',

      // nice idea however we have false positives due to issues with path aliases and monorepo/workspace
      '@typescript-eslint/no-unsafe-call': 'off',

      // no-unnecessary-type-assertion has edge cases that can trigger false positives
      // `as const` may be desired so a type can be derived and this is also preferred for zod enums
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',

      // prefer `type` vs. `interface` off for flexibility in certain cases (disabled for now; depends on codebase)
      // '@typescript-eslint/consistent-type-imports': 'off',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules', 'dist'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'eslint-comments': eslintPluginEslintComments,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          modules: true,
          jsx: true,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },

  // disable type-aware linting on JS files
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
  },

  // use more relaxed rules that allow naughty things that may be required for tests
  {
    files: ['**/*.{test,spec,fixture}.{ts,tsx}'],
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    rules: {
      'no-unused-vars': 'off',
      'no-proto': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
    },
  },

  // vite and astro use triple-slash references (uncomment if required)
  // {
  //   files: ['**/env.d.ts'],
  //   rules: {
  //     '@typescript-eslint/triple-slash-reference': 'off',
  //   },
  // },

  // ensure rules work with prettier (keep this last in the list of configs)
  // https://github.com/prettier/eslint-config-prettier
  configPrettier,
)
