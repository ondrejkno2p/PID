import { join } from 'path'
import type { Config } from 'tailwindcss'
import { skeleton } from '@skeletonlabs/tw-plugin'
import {pidTheme} from './theme'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {

		},
		screens: {
			'sm': '580px',
			'md': '640px',
			'lg': '1000px',
			'xl': '1420px',
		  },
	},
	plugins: [
		skeleton({
			themes: {
				custom: [
					pidTheme
				]
			}
		})
	],
} satisfies Config;
