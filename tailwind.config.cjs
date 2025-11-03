/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Roxo como cor principal
        primary: '#6B46C1', // Roxo moderno
        secondary: '#9333EA', // Roxo mais claro
        accent: {
          purple: '#8B5CF6', // Roxo vibrante
          pink: '#EC4899', // Rosa complementar
          blue: '#3B82F6', // Azul tech
          cyan: '#06B6D4', // Ciano moderno
          indigo: '#6366F1', // Índigo suave
        },
        // Cores neutras com toque roxo
        dark: {
          900: '#0F0A1A', // Quase preto com toque roxo
          800: '#1E1B3A', // Roxo muito escuro
          700: '#2D2655', // Roxo escuro
        }
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'tech-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236B46C1' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out',
        'fade-in': 'fade-in 1s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(107, 70, 193, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(107, 70, 193, 0.8)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    }
  },
  plugins: []
}
