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
          900: '#0b1023',
        },
        primary: {
          500: '#2563eb',
          600: '#1d4ed8',
        },
        accent: {
          500: '#22c55e',
          600: '#16a34a',
        },
      },
      boxShadow: {
        soft: '0 20px 40px rgba(15, 23, 42, 0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      animation: {
        slideUp: 'slideUp 0.25s ease-out',
      },
      keyframes: {
        slideUp: {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
