import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      'primary-foreground': '#30694C',
      'primary-background': '#D9DAD5',
      whiteish: '#E9EAE5',
    },
  },
  plugins: [],
}
export default config;
