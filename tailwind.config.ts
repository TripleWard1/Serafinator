import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        serafim: {
          orange: '#F67611',
          darkOrange: '#C44607',
          cream: '#F3F1EE',
          black: '#181410',
          gold: '#E6AC5B',
        },
      },
    },
  },
  plugins: [],
};
export default config;
