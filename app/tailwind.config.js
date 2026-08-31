/** @type {import('tailwindcss').Config} */
// Paleta operacional AIEP — espejo de tools/slides-system/theme/tokens.js
// y de docs/guia-visual-aiep.md. Vibe institucional sobrio, sin logos.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F4F6F7',
        navy: '#071D33',
        'navy-soft': '#153A59',
        red: '#D62027',
        'red-pale': '#FBEAEC',
        ink: '#183247',
        slate: '#5D7182',
        guide: '#91A0AC',
        line: '#DCE3E8',
        'soft-blue': '#E8F1F6',
        'soft-neutral': '#EDF1F3',
        mist: '#F8FAFB',
        cyan: '#1EAFC2',
        'cyan-soft': '#E4F6F8',
        gold: '#E0BC5A',
        'gold-soft': '#FBF3DE',
        // Semáforo de llenado (calza con el dispositivo: umbrales 40 / 80)
        verde: '#3FAE6A',
        'verde-soft': '#E9F6EE',
        amarillo: '#E0BC5A',
        rojo: '#D62027',
      },
      fontFamily: {
        sans: ['"Segoe UI Variable"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        mono: ['"Cascadia Mono"', 'Consolas', 'monospace'],
      },
      borderRadius: {
        xl: '0.375rem',
        '2xl': '0.625rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(7, 29, 51, 0.05), 0 5px 18px -14px rgba(7, 29, 51, 0.26)',
        float: '0 18px 42px -20px rgba(7, 29, 51, 0.42)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'fade-in': 'fade-in 0.25s ease-out both',
        'slide-in-right': 'slide-in-right 0.32s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
