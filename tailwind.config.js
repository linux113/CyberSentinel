/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Geist', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
      colors: {
        sentinel: {
          bg: '#070a0f',
          panel: '#0f1720',
          panel2: '#111d2a',
          border: '#1c2e42',
          border2: '#233a52',
          text: '#e6edf3',
          muted: '#8a9bb0',
          dim: '#5a6d85',
        },
        risk: {
          critical: '#ef4444',
          high: '#f97316',
          medium: '#eab308',
          low: '#3b82f6',
          healthy: '#22c55e',
          info: '#0ea5e9',
        }
      },
      boxShadow: {
        'glow-critical': '0 0 20px rgba(239,68,68,0.15)',
        'glow-high': '0 0 20px rgba(249,115,22,0.15)',
        'glow-medium': '0 0 20px rgba(234,179,8,0.12)',
        'panel': '0 0 0 1px rgba(255,255,255,0.03) inset, 0 1px 2px rgba(0,0,0,0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slide-in 0.3s ease-out',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
