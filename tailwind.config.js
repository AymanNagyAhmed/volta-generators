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
  			sans: [
  				'var(--font-sans)'
  			],
  			mono: [
  				'var(--font-mono)'
  			]
  		},
  		colors: {
  			primary: {
  				'200': '#bfdbfe',
  				'900': '#1e3a8a',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			modern: {
  				'50': '#f8fafc',
  				'100': '#f1f5f9',
  				'200': '#e2e8f0',
  				'300': '#cbd5e1',
  				'400': '#94a3b8',
  				'500': '#64748b',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1e293b',
  				'900': '#0f172a',
  				'950': '#020617',
  				DEFAULT: '#f8fafc'
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
  				'900': '#002B5B'
  			},
  			brand: {
  				primary: {
  					DEFAULT: '#1e40af',
  					hover: '#1d4ed8'
  				},
  				secondary: {
  					DEFAULT: '#facc15',
  					hover: '#fbbf24'
  				},
  				surface: {
  					light: {
  						DEFAULT: '#f9fafb',
  						hover: '#f3f4f6'
  					},
  					dark: {
  						DEFAULT: '#111827',
  						hover: '#1f2937'
  					}
  				},
  				text: {
  					light: {
  						primary: '#1e3a8a',
  						secondary: '#374151'
  					},
  					dark: {
  						primary: '#ffffff',
  						secondary: '#d1d5db'
  					}
  				}
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			corporate: {
  				blue: {
  					DEFAULT: '#002F69',
  					transparent: '#002F69CC',
  					dark: '#001F46'
  				},
  				gray: {
  					light: {
  						DEFAULT: '#F8F9FACC',
  						darker: '#E9ECEFCC'
  					}
  				}
  			}
  		},
  		backgroundImage: {
  			'gradient-pattern': 'url("/images/background-dubai.jpg")'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontSize: {
  			'nav': ['1.75rem !important', { // Added !important
  				lineHeight: '2rem',
  				fontWeight: '500'
  			}],
  		},
  	}
  },
  darkMode: ["class", 'class'],
  plugins: [nextui(), require("tailwindcss-animate")],
};
