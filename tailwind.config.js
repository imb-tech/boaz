/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate"

export const darkMode = ["class"]
export const content = ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"]
export const theme = {
    extend: {
        zIndex: {
            60: "60",
            70: "70",
            80: "80",
            90: "90",
            100: "100",
        },
        borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
        },
        colors: {
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            card: {
                DEFAULT: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))",
            },
            popover: {
                DEFAULT: "hsl(var(--popover))",
                foreground: "hsl(var(--popover-foreground))",
            },
            primary: {
                DEFAULT: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
                DEFAULT: "hsl(var(--secondary))",
                foreground: "hsl(var(--secondary-foreground))",
            },
            muted: {
                DEFAULT: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
                DEFAULT: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))",
            },
            destructive: {
                DEFAULT: "hsl(var(--destructive))",
                foreground: "hsl(var(--destructive-foreground))",
            },
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            chart: {
                1: "hsl(var(--chart-1))",
                2: "hsl(var(--chart-2))",
                3: "hsl(var(--chart-3))",
                4: "hsl(var(--chart-4))",
                5: "hsl(var(--chart-5))",
            },
        },
        transitionTimingFunction: {
            "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
        keyframes: {
            "accordion-down": {
                from: { height: "0" },
                to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: "0" },
            },
            mover: {
                "0%": { transform: "translateX(0)" },
                "70%": { transform: "translateX(10px)" },
                "100%": { transform: "translateX(0)" },
            },
            marquee: {
                "0%": { transform: "translateX(0%)" },
                "100%": { transform: "translateX(-100%)" },
            },
            marquee2: {
                "0%": { transform: "translateX(100%)" },
                "100%": { transform: "translateX(0%)" },
            },
        },
        animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            mover: "mover 1s infinite ease-in-out",
            marquee: "marquee 60s linear infinite",
            marquee2: "marquee2 60s linear infinite",
        },
        screens: {
            sm: "400px",
            xsm: "300px",
            xmd: "450px",
            lg_md: "800px",
        },
    },
}
export const plugins = [tailwindcssAnimate]
