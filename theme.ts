import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const pidTheme: CustomThemeConfig = {
    name: 'pid-theme',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "255 255 255",
		"--on-success": "255 255 255",
		"--on-warning": "255 255 255",
		"--on-error": "255 255 255",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #6600b3 
		"--color-primary-50": "232 217 244", // #e8d9f4
		"--color-primary-100": "224 204 240", // #e0ccf0
		"--color-primary-200": "217 191 236", // #d9bfec
		"--color-primary-300": "194 153 225", // #c299e1
		"--color-primary-400": "148 77 202", // #944dca
		"--color-primary-500": "102 0 179", // #6600b3
		"--color-primary-600": "92 0 161", // #5c00a1
		"--color-primary-700": "77 0 134", // #4d0086
		"--color-primary-800": "61 0 107", // #3d006b
		"--color-primary-900": "50 0 88", // #320058
		// secondary | #a20f17 
		"--color-secondary-50": "241 219 220", // #f1dbdc
		"--color-secondary-100": "236 207 209", // #eccfd1
		"--color-secondary-200": "232 195 197", // #e8c3c5
		"--color-secondary-300": "218 159 162", // #da9fa2
		"--color-secondary-400": "190 87 93", // #be575d
		"--color-secondary-500": "162 15 23", // #a20f17
		"--color-secondary-600": "146 14 21", // #920e15
		"--color-secondary-700": "122 11 17", // #7a0b11
		"--color-secondary-800": "97 9 14", // #61090e
		"--color-secondary-900": "79 7 11", // #4f070b
		// tertiary | #6c5db4 
		"--color-tertiary-50": "233 231 244", // #e9e7f4
		"--color-tertiary-100": "226 223 240", // #e2dff0
		"--color-tertiary-200": "218 215 236", // #dad7ec
		"--color-tertiary-300": "196 190 225", // #c4bee1
		"--color-tertiary-400": "152 142 203", // #988ecb
		"--color-tertiary-500": "108 93 180", // #6c5db4
		"--color-tertiary-600": "97 84 162", // #6154a2
		"--color-tertiary-700": "81 70 135", // #514687
		"--color-tertiary-800": "65 56 108", // #41386c
		"--color-tertiary-900": "53 46 88", // #352e58
		// success | #a23094 
		"--color-success-50": "241 224 239", // #f1e0ef
		"--color-success-100": "236 214 234", // #ecd6ea
		"--color-success-200": "232 203 228", // #e8cbe4
		"--color-success-300": "218 172 212", // #daacd4
		"--color-success-400": "190 110 180", // #be6eb4
		"--color-success-500": "162 48 148", // #a23094
		"--color-success-600": "146 43 133", // #922b85
		"--color-success-700": "122 36 111", // #7a246f
		"--color-success-800": "97 29 89", // #611d59
		"--color-success-900": "79 24 73", // #4f1849
		// warning | #8860c2 
		"--color-warning-50": "237 231 246", // #ede7f6
		"--color-warning-100": "231 223 243", // #e7dff3
		"--color-warning-200": "225 215 240", // #e1d7f0
		"--color-warning-300": "207 191 231", // #cfbfe7
		"--color-warning-400": "172 144 212", // #ac90d4
		"--color-warning-500": "136 96 194", // #8860c2
		"--color-warning-600": "122 86 175", // #7a56af
		"--color-warning-700": "102 72 146", // #664892
		"--color-warning-800": "82 58 116", // #523a74
		"--color-warning-900": "67 47 95", // #432f5f
		// error | #7533eb 
		"--color-error-50": "234 224 252", // #eae0fc
		"--color-error-100": "227 214 251", // #e3d6fb
		"--color-error-200": "221 204 250", // #ddccfa
		"--color-error-300": "200 173 247", // #c8adf7
		"--color-error-400": "158 112 241", // #9e70f1
		"--color-error-500": "117 51 235", // #7533eb
		"--color-error-600": "105 46 212", // #692ed4
		"--color-error-700": "88 38 176", // #5826b0
		"--color-error-800": "70 31 141", // #461f8d
		"--color-error-900": "57 25 115", // #391973
		// surface | #a97865 
		"--color-surface-50": "242 235 232", // #f2ebe8
		"--color-surface-100": "238 228 224", // #eee4e0
		"--color-surface-200": "234 221 217", // #eaddd9
		"--color-surface-300": "221 201 193", // #ddc9c1
		"--color-surface-400": "195 161 147", // #c3a193
		"--color-surface-500": "169 120 101", // #a97865
		"--color-surface-600": "152 108 91", // #986c5b
		"--color-surface-700": "127 90 76", // #7f5a4c
		"--color-surface-800": "101 72 61", // #65483d
		"--color-surface-900": "83 59 49", // #533b31
		
	}
}