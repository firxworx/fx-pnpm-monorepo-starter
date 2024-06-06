# React + TypeScript + Vite

Demo app with React + React Router built in TypeScript and powered by Vite.

To rename this app:

- Rename the folder `demo` to your preferred app name
- Revise the `name` in `package.json` to match the new folder name
- Revise the `title` in `public/index.html` to match the new app name
- Add any relevant meta tags to `public/index.html` to suit your project

In `vite.config.ts` the plugin `@vitejs/plugin-react` is used to support React.

Vite currently supports two official plugins for React:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Replace `@vitejs/plugin-react` with `@vitejs/plugin-react-swc` in `vite.config.ts` if you prefer to use SWC.
