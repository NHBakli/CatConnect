import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient":
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,0,52,1) 100%)",
      },
      colors: {
        customBlue: "#000034",
        hoverCustomBlue: "#000044",
        customIndigo: "#091999",
        hoverCustomIndigo: "#092999",
        navbarBg: "#11116c",
        hoverNavbarBg: "#11114c",
      },
    },
  },
  plugins: [],
};

export default config;
