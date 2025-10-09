/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk color theme
        cyber: {
          pink: '#FF006E',
          purple: '#8338EC',
          blue: '#3A86FF',
          cyan: '#00F5FF',
          yellow: '#FFD60A',
          dark: '#0A0E27',
          darker: '#050816',
          light: '#E0E7FF',
        },
        neon: {
          pink: '#FF10F0',
          blue: '#00D9FF',
          purple: '#B026FF',
          green: '#39FF14',
          yellow: '#FFFF00',
          orange: '#FF6C11',
        },
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        cyber: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 5px theme("colors.neon.pink"), 0 0 20px theme("colors.neon.pink")',
        'neon-blue': '0 0 5px theme("colors.neon.blue"), 0 0 20px theme("colors.neon.blue")',
        'neon-purple': '0 0 5px theme("colors.neon.purple"), 0 0 20px theme("colors.neon.purple")',
        'neon-green': '0 0 5px theme("colors.neon.green"), 0 0 20px theme("colors.neon.green")',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flicker': 'flicker 0.15s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00D9FF, 0 0 20px #00D9FF' },
          '100%': { textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #00D9FF, 0 0 40px #00D9FF' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '41.99%': { opacity: '1' },
          '42%': { opacity: '0' },
          '43%': { opacity: '0' },
          '43.01%': { opacity: '1' },
          '47.99%': { opacity: '1' },
          '48%': { opacity: '0' },
          '49%': { opacity: '0' },
          '49.01%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(58, 134, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(58, 134, 255, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}
