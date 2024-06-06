import type { Config } from 'tailwindcss'

const tailwindConfig = {
  darkMode: 'class',
  // presets: [], // do not uncomment with an empty array
  // plugins: [],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
} satisfies Config

export default tailwindConfig
