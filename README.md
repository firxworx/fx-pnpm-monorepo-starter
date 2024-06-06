# fx-pnpm-monorepo-starter

Embrace the joy of a fast and lightweight monorepo with [pnpm workspaces](https://pnpm.io/workspaces)!

This repo is a starter/boilerplate for new projects that's free from extraneous tooling such as Nx, TurboRepo, Lerna, and others that add complexity to your workflow. Such optimizations are premature and unnecessary for most projects and often they create more problems than they solve.

This workspace is **100% ESM** and comes with two example projects to keep or delete:

- `apps/demo` - example React app with react-router and tailwind powered by Vite
- `packages/common` - example shared package that exports some utilities

Thanks to `pnpm` this setup can easily handle several large-framework apps _and_ dozens of packages on a relatively modest developer laptop running a high-resource-consuming editor like VSCode.

> [!NOTE]
> The scripts in `package.json` are intended for unix/linux environments. Windows users can use WSL2 or must revise the commands.

## Goodies included in this repo

- 🚀 [example projects](#example-projects)
- 🏗️ [tsup](#tsup) for building packages
- 🧪 [vitest](#vitest) for testing
- 🔍 [eslint + prettier](#eslint--prettier) for linting and formatting
- 🤝 [syncpack](#syncpack) for consistent package versions
- 🍻 [well-commented config files](#configuration-files) with tips and examples

### Example projects

The example projects showcase how to use a shared package that can be imported by many projects in the workspace.

- `apps/demo` (`demo`): React + Tailwind + TypeScript app with React Router and powered by Vite
- `packages/common` (`@workspace/common`): A shared internal package that exports a few utilities that can be imported by other apps or packages

The `@workspace/common` package is configured as an internal package that exports `*.ts` files from its `package.json`.

Note how `@workspace/common`'s `tsconfig.json` extends `tsconfig.base.json` in the workspace root. This is a common pattern for sharing a base `tsconfig.json` across all projects in a workspace and can help enforce consistent settings across all projects.

### tsup

`@workspace/common` includes an example `tsup` configuration to build a publishable versions of the package and output CJS + ESM to the `dist/` directory.

Running `pnpm --filter @workspace/common build` will build the package to its `dist/` directory.

This example is configured for internal use within the workspace and is not configured for publishing to a repository like npm.

To make the package publishable you would need to revise `package.json` in several places including defining exports that point to the `dist/` directory instead of the `src/` directory. The nuances of publishing packages is outside the scope of this example. 

Note that pre-building packages can also help with large monorepos to help reduce build times and lessen the resource load on TypeScript and code editors like VSCode with appropriate configuration changes.

You are welcome to delete the `build` script from the `@workspace/common`'s `package.json` if you won't use the feature.

### vitest

Vitest is included and `pnpm test` will run the "test" target on all projects in the workspace that have one in their `package.json`.

If you run `pnpm ci:test` the command will exit on its own. If you run `pnpm test` you will need to use `CTRL+C` (`CMD+C`) to exit.

Vitest's workspace configuration is in `vitest.workspace.ts`.

The `@workspace/common` package includes an example of extending a base workspace configuration in the context of a monorepo.

Note how `@workspace/common`'s `vitest.config.ts` imports `vitest.config.ts` from the workspace root and how it defines its own configuration using `mergeConfig` instead of `defineConfig` as one would use in a standalone project repo.

### eslint + prettier

A shared eslint v9 configuration is included at the workspace level to improve performance and avoid OOM issues that impact this tooling particularly in monorepos. Refer to `eslint.config.js` and `eslint.ignores.js` which is imported by the config.

Prettier is configured by `prettier.config.js` and its ignore file is `.prettierignore`. The config includes configuration for `prettier-plugin-tailwindcss` that you can remove if your project doesn't use TailwindCSS.

Eslint is configured to cooperate with prettier using `eslint-config-prettier` and `eslint-plugin-prettier`.

```sh
# lint all projects in the workspace
pnpm lint

# auto-fix fixable lint issues in the workspace
pnpm lint:fix

# format all projects in the workspace with dedicated passes by prettier and eslint
pnpm format
```

Eslint is configured to use its own tsconfig at `tsconfig.eslint.json`.

A global eslint configuration is used for the workspace to improve performance and avoid OOM issues such as [#1192](https://github.com/typescript-eslint/typescript-eslint/issues/1192) (among others) encountered with current versions of eslint when each package has its own eslint config.

For more details on using typescript-eslint in a monorepo see: https://typescript-eslint.io/getting-started/typed-linting/monorepos/

### syncpack

Refer to [Ensuring consistent package versions](#ensuring-consistent-package-versions) for details on how to use syncpack to ensure consistent package versions across all projects in the workspace.

This is important to ensure that all projects in the workspace are using the same versions of dependencies. This eliminates issues arising from different versions of the same package being used in the workspace. This also helps apps to produce smaller builds.

### Configuration files

- `.editorconfig` provides a consistent coding style across different editors and IDEs.
- `.gitignore` is well-commented and includes common patterns for monorepos.
- `.npmrc` has a ton of well-commented options for you to review and customize including tips to enable consistent configurations of `pnpm` across all developers and in CI/CD environments
- `.vscode/settings` is well-commented and includes optimizations for VSCode users that improve performance and the developer experience including running the eslint extension for workspace root, using the the new v9 flat config format, using the workstation's `node` instead of its own, and using the workspace version of `typescript`.

## Getting Started

### First steps

Set your own `name` in `package.json` along with `author` and `license` details.

Review `pnpm-workspace.yaml` to review the workspace configuration.

The existence of this file tells `pnpm` that this repo is a _workspace_ or monorepo. It simply lists directories that contain _projects_ (apps or packages) that `pnpm` should manage as part of the shared workspace.

Always run `pnpm install` after making any changes to `pnpm-workspace.yaml` or adding or removing any apps/packages.

Docs: [pnpm workspaces](https://pnpm.io/workspaces)

Review the `scripts` in the workspace root `package.json` to see how they are used to target specific projects in the workspace or run commands across all projects.

### Workspace layout

The directory names `apps/` and `packages/` are arbitrary (though this is a common naming convention) and they can be changed to anything you like. You can have as many or as few directories as you like.

The example shows how to specifically exclude directories using the `!` syntax.

### Adding and removing projects

You can simply delete any _projects_ (apps or packages) in the _workspace_ under `apps/` or `packages/` that you don't need.

Add new _projects_ by creating a directory then running either `pnpm init` in it to create a new `package.json` or running `pnpm create ...` to scaffold a new project based on a template.

You can also simply copy-and-paste one of the examples to create a new project. If you do remember to make a couple changes:

- Change the `name` in `package.json` to something unique in the workspace
- Delete the `dist/` and `node_modules/` directories for a clean slate

Always remember to run `pnpm install` after making changes to the workspace configuration or adding/removing projects.

When adding a package from within the workspace as a dependency to another package its important to understand the `workspace:` protocol. Note the example in the demo app's `package.json` for how `@workspace/common` is added.

Refer to the [pnpm workspace docs](https://pnpm.io/workspaces#workspace-protocol-workspace) for details on the `workspace:` protocol.

> [!TIP]
> If you delete the example package but keep the example app remember to remove the dependency from the app's `package.json` and refactor the code to remove references to it.

## Managing a workspace with `pnpm`

To run commands that target individual projects in the workspace you can use `pnpm --filter` with the `name` defined in the target(s) respective `package.json` files. This option also accepts patterns (refer to the [docs](https://pnpm.io/filtering)). For example:

```sh
# run 'dev' script defined in the package.json of the 'demo' project
pnpm --filter demo run dev

# add a dev dependency to the 'demo' project
pnpm --filter demo add -D example-dev-dependency

# run 'build' script defined in the package.json of the '@workspace/common' package
pnpm --filter @workspace/common run build
```

Add the `--recursive` (`-r`) option to target all projects in the workspace.

When running recursive commands the `--stream` option is a common addition to stream the output of all projects and interleave it in the terminal.

To target the workspace root `package.json` use the `-w` option.
The following example installs a dev dependency (`-D` or `--save-dev`) for the workspace (`-w`):

```sh
pnpm add -wD eslint-plugin-react
```

### Updating dependencies

To update all dependencies in the monorepo:

```sh
# update all packages using interactive mode
pnpm up -r --interactive

# update all packages to latest release versions using interactive mode 
pnpm up -r --interactive --latest
```

### Deduplicating dependencies

From time-to-time you can check for and remove duplicate packages to streamline dependencies:

```sh
# scan and report packages that could be deduplicated (this is a safe operation that only reports)
pnpm dedupe --check

# perform the deplication
pnpm dedupe
```

### Ensuring consistent package versions

Syncpack is a powerful tool to help ensure consistent package versions across all projects in a workspace.

Review the config file at `syncpack.config.js` as it has been specifically configured for this workspace and to respect the `workspace:` protocol for internal packages.

Note how you may want to customize syncpack further or add additional package names to the ignored list.

```sh
# carefully review the output of list-mismatches to ensure the desired operations will be performed
pnpm syncpack list-mismatches

# fix any mismatches (will write to package.json files)
pnpm syncpack fix-mismatches
```

Always run `pnpm install` after making any changes to `package.json` files in the workspace.

Refer to the [syncpack docs](https://jamiemason.github.io/syncpack/) for more details.

## Good to know

> [!TIP]
> A key feature of `pnpm` is that all `devDependencies` in the workspace root `package.json` are available to the entire workspace. Tools like `eslint`, `prettier`, `typescript`, etc. do not need to be installed in each package.

> [!TIP]
> If you are publishing packages to npm then its a good idea to also add all dependencies to the individual packages' `package.json` files so they are "self-contained" and published with a complete set of dependencies.

> [!TIP]
> `pnpm` uses symlinks to link packages in the workspace so if you have common dependencies between the workspace root and any package(s) they are only stored on disk once. With `pnpm` there is no performance penalty to listing the same dependency in multiple packages in the workspace.

> [!TIP]
> When reading the docs or asking for help note that its common for individual apps and packages in a workspace to be referred to as _projects_ whereas the whole thing is the _workspace_.

> [!TIP]
> Take care to avoid circular depenencies. Try to think of a linear dependency chain where each package depends on the next. 

> [!TIP]
> Understand tree-shaking and how defining `sideEffects` in `package.json` can help bundlers like Vite and Rollup remove unused code from the final bundle.
