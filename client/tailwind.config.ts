import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': "var(--primary-red)",
        'primary-white': "var(--primary-white)",
        'primary-black': "var(--primary-black)",
        'primary-orange': "var(--primary-orange)",
      },
      height:{
        'screen-without-header': 'calc(100vh - 96px)',
      }
    },
  },
  plugins: [],
} satisfies Config;
