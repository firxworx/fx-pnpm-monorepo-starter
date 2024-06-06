import type { Config } from 'tailwindcss'

const tailwindConfig = {
  darkMode: 'class',
  // presets: [],
  // plugins: [],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
} satisfies Config

export default tailwindConfig
