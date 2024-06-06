# fx-pnpm-monorepo

Embrace the simplicity and joy of a fast and lightweight monorepo with pnpm workspaces!

This repo is home to a boilerplate for new projects that's free of extraneous monorepo tooling such as Nx, TurboRepo, Lerna, and others that add complexity to your development workflow.

- `apps/demo` - example React app that imports a shared package from `packages/common`
- `packages/common` - example shared package that exports some utilities

This setup can easily handle several large-framework apps _and_ dozens of packages on a relatively modest developer workstation running the demonic resource hog known as VSCode.

## What's included

- `apps/demo`: React + Tailwind + TypeScript app with React Router and powered by Vite
- `packages/common`: A shared internal package that exports a few utilities that can be imported by other apps or packages

A common eslint v9 configuration is included at the workspace level to improve performance and avoid OOM issues currently impacting recent versions.

`.vscode/settings` is well-commented and includes optimizations for VSCode users that improve performance and the developer experience. 

## Benefits of cruft-free monorepos

Nx, Turbo, and friends are premature optimization -- _the root of all evil_!

These tools are arguably only popular because they spend piles of money paying YouTubers and Twitter influencers, producing slick yet frequently outdated documentation, and providing fountains of tutorials + examples + templates to copy-and-paste from.

This repo offers the community a simpler and more lightweight alternative. 

`pnpm` without the cruft has many benefits:

- No new CLI tools or commands to learn
- No proprietary configuration files or formats -- avoid lock-in
- No extensions or plugins for your IDE -- both of the Nx and Turbo VSCode extensions are notorious resource hogs
- Throw away entire websites worth of outdated and incomplete documentation
- No waiting for issues to be fixed or support to be added for new tools or frameworks
- Gone are tooling upgrades that run "migrations" and make-work by breaking working configs and clobbering comments (Nx!)
- Fewer dependencies equals fewer things to go wrong or face security vulnerabilities (and smaller `node_modules`)
- Save headaches and wasted time troubleshooting caching issues and build pipeline gremlins introduced by these tools
- Sigificantly faster and easier to keep an entire monorepo up-to-date to the _latest release_ of dependencies
- 100% ESM with no CJS/ESM compatibility issues or similar headaches that both Nx and Turbo are known to introduce
- CI/CD is easier and more reliable with a simpler and more predictable setup

## Getting Started

Review `pnpm-workspace.yaml` to review the workspace configuration.

This is where you list directories that contain apps and/or packages that `pnpm` should manage as part of the workspace.

Always run `pnpm install` after making any changes to `pnpm-workspace.yaml` or adding or removing any apps/packages.

### Monorepo layout

The directory names `apps/` and `packages/` are arbitrary and can actually be changed to anything you like. You can also have as many or as few workspace directories as you like.

### Adding and removing packages

You can simply delete any _projects_ in the _workspace_ under `apps/` or `packages/` that you don't need.

You can add new _projects_ by creating a directory then running `pnpm init` to create a new `package.json` or `pnpm create ...` to scaffold a new project from a template.

You can also simply copy-and-paste one of the examples to create a new project. If you do remember to make a couple changes:

- Change the `name` in `package.json` to something unique in the workspace
- Delete the `dist/` and `node_modules/` directories for a clean slate

Always remember to run `pnpm install` after making changes to the workspace configuration or adding/removing projects.

> Specific to this boilerplate: if you delete the example package but keep the app make sure you remove the dependency from the app's `package.json` and refactor the code to remove references to the deleted package.

### Good to know

A key feature of `pnpm` is that all `devDependencies` in the workspace root `package.json` are available to the entire workspace. Tools like `eslint`, `prettier`, `typescript`, etc. do not need to be installed in each package.

> **TIP** If you are publishing packages to npm then its a good idea to also add all dependencies to the individual packages' `package.json` files so they are "self-contained" and published with a complete set of dependencies.

> **TIP** `pnpm` uses symlinks to link packages in the workspace so if you have common dependencies between the workspace root and any package(s) they are only stored on disk once. With `pnpm` there is no performance penalty to listing the same dependency in multiple packages in the workspace.

> **TIP** When reading the docs or asking for help note that its common for individual apps and packages in a workspace to be referred to as _projects_ whereas the whole thing is the _workspace_.

## eslint

This project uses eslint with the new v9 "flat config syntax".
Editor support for this syntax is enabled for VSCode in `.vscode/settings.json`.

A global eslint configuration is used for the workspace to improve performance and avoid [OOM issues (#1192)](https://github.com/typescript-eslint/typescript-eslint/issues/1192) seen with current versions of eslint when each package has its own eslint config.

For more details on using typescript-eslint in a monorepo see: https://typescript-eslint.io/getting-started/typed-linting/monorepos/
