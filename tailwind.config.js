/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{html,js,jsx,ts,tsx}'];
export const theme = {
	extend: {
		colors: {
			red: 'hsl(14, 86%, 42%)',
			green: 'hsl(159, 69%, 38%)',
			brownActive: 'rgba(201,61,14,255)',
			rose: {
				50: 'hsl(20, 50%, 98%)',
				100: 'hsl(13, 31%, 94%)',
				300: 'hsl(14, 25%, 72%)',
				400: 'hsl(7, 20%, 60%)',
				500: 'hsl(12, 20%, 44%)',
				900: 'hsl(14, 65%, 9%)',
			},
		},
		fontFamily: {
			sans: ['Red Hat Text', 'sans-serif'],
		},
		fontsize: {
			product: '16px',
		},
	},
};
export const plugins = [];
