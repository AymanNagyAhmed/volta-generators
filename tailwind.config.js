import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: {
          200: '#bfdbfe',
          900: '#1e3a8a',
        },
        modern: {
          DEFAULT: '#f8fafc',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        layout: {
          navbar: {
            bg: {
              DEFAULT: 'rgba(255, 255, 255, 0.3)',
              dark: 'rgba(15, 23, 42, 0.3)'
            },
            border: {
              DEFAULT: 'rgba(226, 232, 240, 0.2)',
              dark: 'rgba(51, 65, 85, 0.2)'
            },
            text: {
              primary: {
                DEFAULT: '#1e293b',
                dark: '#f1f5f9'
              },
              secondary: {
                DEFAULT: '#334155',
                dark: '#cbd5e1'
              },
              hover: {
                DEFAULT: '#2563eb',
                dark: '#60a5fa'
              }
            }
          },
          footer: {
            bg: {
              DEFAULT: 'rgba(255, 255, 255, 0.9)',
              dark: 'rgba(15, 23, 42, 0.9)'
            },
            border: {
              DEFAULT: '#e2e8f0',
              dark: '#334155'
            },
            text: {
              primary: {
                DEFAULT: '#475569',
                dark: '#e2e8f0'
              },
              secondary: {
                DEFAULT: '#64748b',
                dark: '#94a3b8'
              },
              hover: {
                DEFAULT: '#3b82f6',
                dark: '#60a5fa'
              }
            }
          }
        },
        navy: {
          900: '#002B5B'
        }
      },
      backgroundImage: {
        'gradient-pattern': 'url("/images/background-dubai.jpg")',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
