/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0F19',
        obsidian2: '#0E1424',
        obsidian3: '#131B2E',
        electric: '#06B6D4',
        corporate: '#4F46E5',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGlow: { '0%,100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        scan: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(200%)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        marqueeSlow: 'marquee 60s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        blink: 'blink 1.2s steps(1) infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        scan: 'scan 5s linear infinite',
      },
    },
  },
  plugins: [],
}
