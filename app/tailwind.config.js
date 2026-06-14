/** @type {import('tailwindcss').Config} */
// Paleta operacional AIEP — espejo de tools/slides-system/theme/tokens.js
// y de docs/guia-visual-aiep.md. Vibe institucional sobrio, sin logos.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F8F3EC',
        navy: '#102A43',
        'navy-soft': '#284B75',
        red: '#D62027',
        'red-pale': '#F8E4E5',
        ink: '#243B53',
        slate: '#52606D',
        guide: '#96A3B2',
        line: '#D8CFC4',
        'soft-blue': '#E6EEF7',
        'soft-neutral': '#EDE6DA',
        mist: '#EEF2F6',
        gold: '#E0BC5A',
        'gold-soft': '#FBF3DE',
        // Semáforo de llenado (calza con el dispositivo: umbrales 40 / 80)
        verde: '#3FAE6A',
        'verde-soft': '#E9F6EE',
        amarillo: '#E0BC5A',
        rojo: '#D62027',
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 42, 67, 0.04), 0 8px 24px -12px rgba(16, 42, 67, 0.18)',
        float: '0 12px 40px -12px rgba(16, 42, 67, 0.28)',
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
