import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",

        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",

        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",

        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",

        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        "text-main": "var(--foreground)",
        "text-subtle": "var(--muted-foreground)",
        "text-background": "var(--background)",

        "cta-light": "var(--primary)",
        "cta-hover": "var(--primary-foreground)",

        success: "var(--green-soft)",
        danger: "var(--destructive)",

        "yellow-muted": "var(--yellow-muted)",
        "green-soft": "var(--green-soft)",

        placeholder: "var(--text-subtle)",
      },
    },
  },
  plugins: [],
};

export default config;
