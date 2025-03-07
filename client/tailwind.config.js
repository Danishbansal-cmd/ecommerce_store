import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				primary: {
					light : '#000000',
					dark : '#ffffff'
				},
				colorMain : {
					light : '#FFE8C5'
				},
				colorMainShadeDark : {
					light : '#FFDEAB'
				},
				colorSecondary : {
					light : '#FFA27F'
				},
				cartItem : {
					light : '#ff0000',
				},
				backgroundMain: {
					light : '#FFEEEE'
				},
				backgroundSecondary: {
					light : '#FFD4D4'
				},
				backgroundSecondaryBorder: {
					light : '#E6ABAB'
				},
				littleSection : {
					light : '#97BE5A'
				},
				colorText : {
					light : '#A27E7E'
				},
				colorTextSecondary : {
					light : '#694343'
				},
				colorSort : {
					light : '#ffb3b3'
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
				}
			},
			height : {
				'navigation': '80px'
			},
			width : {
				'88' : '22rem',
			},
			boxShadow: {
				'custom': '0 4px 8px rgba(0, 0, 0, 0.06), 0 -4px 8px rgba(0, 0, 0, 0.06)',
				'customSection': '0 4px 8px rgba(0, 0, 0, 0.04), 0 -4px 8px rgba(0, 0, 0, 0.06)',
			},
			screens: {
				xs: '320px', // Custom breakpoint for 384px
			},
		}
	},
	plugins: [tailwindcssAnimate,function ({ addVariant }) {
      addVariant('autofill', '&:-webkit-autofill');
      addVariant('autofill-hover', '&:-webkit-autofill:hover');
      addVariant('autofill-focus', '&:-webkit-autofill:focus');
      addVariant('autofill-active', '&:-webkit-autofill:active');
    },],
}

