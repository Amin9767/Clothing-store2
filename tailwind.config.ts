import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./_contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./_services/**/*.{js,ts,jsx,tsx,mdx}",
    "./serverTypes/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        vazir: ["vazir"],
        lincoln: ["lincoln"],
      },
      backgroundImage: {
        "brands-bg": "url('/products/men/brandsLogo/brands-bg.png')",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-fast": "spin 1s linear infinite",
      },
      container: {
        center: true, // کانتینر به صورت خودکار وسط‌چین شود
        padding: "1rem", // فاصله داخلی کانتینر
      },
      screens: {
        xs: "475px", // بریک‌پوینت سفارشی
      },
    },
  },
  plugins: [],
} satisfies Config;
