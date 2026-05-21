module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 50: '#f4f6fb', 100: '#e4e8f5', 400: '#6b7db3', 500: '#1d2b53', 700: '#111939', 900: '#0b1023' },
        brand: { 500: '#2563eb', 600: '#1d4ed8' },
        accent: { 400: '#4ade80', 500: '#22c55e', 600: '#16a34a' },
      },
      fontFamily: { sans: ['Manrope', 'system-ui', 'sans-serif'] },
      boxShadow: { soft: '0 20px 40px rgba(15,23,42,0.22)', glow: '0 0 30px rgba(34,197,94,0.15)' },
      animation: { slideUp: 'slideUp 0.3s ease-out', fadeIn: 'fadeIn 0.4s ease-out', pulse2: 'pulse2 2s ease-in-out infinite' },
      keyframes: {
        slideUp: { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        pulse2: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.5 } },
      },
    },
  },
  plugins: [],
}