/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f4f6fb',
          100: '#e4e8f5',
          500: '#1d2b53',
          700: '#111939',
          900: '#020617',
        },
        primary: {
          500: '#6366f1',
          600: '#4f46e5',
        },
        accent: {
          500: '#22c55e',
          600: '#16a34a',
        },
        neon: {
          500: '#22d3ee',
          600: '#06b6d4',
        },
      },
      boxShadow: {
        soft: '0 20px 40px rgba(15, 23, 42, 0.35)',
        glow: '0 0 80px rgba(56, 189, 248, 0.45)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        slideUp: 'slideUp 0.25s ease-out',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        slideUp: {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
};
