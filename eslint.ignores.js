// @ts-check

/**
 * eslint next-generation 'flat config' ignores configuration object for import by `eslint.config.js`.
 */
export default {
  ignores: [
    // common ignore patterns
    '**/.*',
    '.git/',
    '**/node_modules/',

    // build artifacts
    '**/build/',
    '**/dist/',
    '**/output/',
    '**/cdk.out/',

    // third-party modules in app public paths (minified vendor js can crash eslint)
    'apps/**/public/**',

    // patterns related to test and coverage
    '**/fixtures/**',
    '**/coverage/**',
    '**/__snapshots__/**',

    // popular frameworks
    '**/.vite/',
    '**/.svelte-kit/',
    '**/.next/',
    '**/.nuxt/',
    '**/.astro/*',
    '.astro/types.d.ts',

    // common tooling
    '**/coverage/',
    '**/template/',
    '**/storybook-static/',
    '**/types.generated.d.ts',

    // misc
    '**/.cache/',
    '**/.history/',
    '**/.idea/',

    // workflow
    '**/temp/',
    '**/tmp/',
    '**/wip/',
    'notes/*',

    // documentation (uncomment if you wish to lint this directory)
    'docs/*',

    // ci/cd pipeline files
    // '**/.github/*',
  ],
}
