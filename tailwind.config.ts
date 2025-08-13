import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				/* SanjayOS AI Color System */
				os: {
					background: 'hsl(var(--os-background))',
					surface: 'hsl(var(--os-surface))',
					'surface-glass': 'hsl(var(--os-surface-glass))',
					foreground: 'hsl(var(--os-foreground))',
				},
				ai: {
					primary: 'hsl(var(--ai-primary))',
					secondary: 'hsl(var(--ai-secondary))',
					glow: 'hsl(var(--ai-glow))',
					pulse: 'hsl(var(--ai-pulse))',
				},
				glass: {
					bg: 'hsl(var(--glass-bg))',
					border: 'hsl(var(--glass-border))',
					shadow: 'hsl(var(--glass-shadow))',
				},
				/* Legacy shadcn support */
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			backgroundImage: {
				'gradient-os': 'var(--gradient-os)',
				'gradient-glass': 'var(--gradient-glass)',
				'gradient-ai': 'var(--gradient-ai)',
			},
			boxShadow: {
				'glass': 'var(--shadow-glass)',
				'glow': 'var(--shadow-glow)',
				'ambient': 'var(--shadow-ambient)',
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-10px) rotate(1deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--ai-glow) / 0.2)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--ai-glow) / 0.4)' }
				},
				'particle-drift': {
					'0%': { transform: 'translateY(100vh) translateX(0px) scale(0)' },
					'10%': { transform: 'translateY(90vh) translateX(10px) scale(1)' },
					'90%': { transform: 'translateY(10vh) translateX(-10px) scale(1)' },
					'100%': { transform: 'translateY(0vh) translateX(0px) scale(0)' }
				},
				'ai-think': {
					'0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.8' },
					'50%': { transform: 'scale(1.1) rotate(180deg)', opacity: '1' }
				},
				'dock-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'particle': 'particle-drift 15s linear infinite',
				'ai-think': 'ai-think 2s ease-in-out infinite',
				'dock-bounce': 'dock-bounce 0.6s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
