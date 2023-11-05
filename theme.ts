import type { CustomThemeConfig } from "@skeletonlabs/tw-plugin";

export const pidTheme: CustomThemeConfig = {
  name: "pid-theme",
  properties: {
    // =~= Theme Properties =~=
    "--theme-font-family-base":
      "ui-serif, Georgia, Cambria, Times New Roman, Times, serif",
    "--theme-font-family-heading":
      "ui-serif, Georgia, Cambria, Times New Roman, Times, serif",
    "--theme-font-color-base": "var(--color-surface-700)",
    "--theme-font-color-dark": "var(--color-primary-200)",
    "--theme-rounded-base": "9999px",
    "--theme-rounded-container": "8px",
    "--theme-border-base": "1px",
    // =~= Theme On-X Colors =~=
    "--on-primary": "0 0 0",
    "--on-secondary": "255 255 255",
    "--on-tertiary": "0 0 0",
    "--on-success": "0 0 0",
    "--on-warning": "0 0 0",
    "--on-error": "255 255 255",
    "--on-surface": "255 255 255",
    // =~= Theme Colors  =~=
    // primary | #ffc579
    "--color-primary-50": "255 246 235", // #fff6eb
    "--color-primary-100": "255 243 228", // #fff3e4
    "--color-primary-200": "255 241 222", // #fff1de
    "--color-primary-300": "255 232 201", // #ffe8c9
    "--color-primary-400": "255 214 161", // #ffd6a1
    "--color-primary-500": "255 197 121", // #ffc579
    "--color-primary-600": "230 177 109", // #e6b16d
    "--color-primary-700": "191 148 91", // #bf945b
    "--color-primary-800": "153 118 73", // #997649
    "--color-primary-900": "125 97 59", // #7d613b
    // secondary | #ffe283
    "--color-secondary-50": "255 251 236", // #fffbec
    "--color-secondary-100": "255 249 230", // #fff9e6
    "--color-secondary-200": "255 248 224", // #fff8e0
    "--color-secondary-300": "255 243 205", // #fff3cd
    "--color-secondary-400": "255 235 168", // #ffeba8
    "--color-secondary-500": "255 226 131", // #ffe283
    "--color-secondary-600": "230 203 118", // #e6cb76
    "--color-secondary-700": "191 170 98", // #bfaa62
    "--color-secondary-800": "153 136 79", // #99884f
    "--color-secondary-900": "125 111 64", // #7d6f40
    // tertiary | #0e68e9
    "--color-tertiary-50": "219 232 252", // #dbe8fc
    "--color-tertiary-100": "207 225 251", // #cfe1fb
    "--color-tertiary-200": "195 217 250", // #c3d9fa
    "--color-tertiary-300": "159 195 246", // #9fc3f6
    "--color-tertiary-400": "86 149 240", // #5695f0
    "--color-tertiary-500": "14 104 233", // #0e68e9
    "--color-tertiary-600": "13 94 210", // #0d5ed2
    "--color-tertiary-700": "11 78 175", // #0b4eaf
    "--color-tertiary-800": "8 62 140", // #083e8c
    "--color-tertiary-900": "7 51 114", // #073372
    // success | #f7ced9
    "--color-success-50": "254 248 249", // #fef8f9
    "--color-success-100": "253 245 247", // #fdf5f7
    "--color-success-200": "253 243 246", // #fdf3f6
    "--color-success-300": "252 235 240", // #fcebf0
    "--color-success-400": "249 221 228", // #f9dde4
    "--color-success-500": "247 206 217", // #f7ced9
    "--color-success-600": "222 185 195", // #deb9c3
    "--color-success-700": "185 155 163", // #b99ba3
    "--color-success-800": "148 124 130", // #947c82
    "--color-success-900": "121 101 106", // #79656a
    // warning | #d17969
    "--color-warning-50": "248 235 233", // #f8ebe9
    "--color-warning-100": "246 228 225", // #f6e4e1
    "--color-warning-200": "244 222 218", // #f4deda
    "--color-warning-300": "237 201 195", // #edc9c3
    "--color-warning-400": "223 161 150", // #dfa196
    "--color-warning-500": "209 121 105", // #d17969
    "--color-warning-600": "188 109 95", // #bc6d5f
    "--color-warning-700": "157 91 79", // #9d5b4f
    "--color-warning-800": "125 73 63", // #7d493f
    "--color-warning-900": "102 59 51", // #663b33
    // error | #ac7546
    "--color-error-50": "243 234 227", // #f3eae3
    "--color-error-100": "238 227 218", // #eee3da
    "--color-error-200": "234 221 209", // #eaddd1
    "--color-error-300": "222 200 181", // #dec8b5
    "--color-error-400": "197 158 126", // #c59e7e
    "--color-error-500": "172 117 70", // #ac7546
    "--color-error-600": "155 105 63", // #9b693f
    "--color-error-700": "129 88 53", // #815835
    "--color-error-800": "103 70 42", // #67462a
    "--color-error-900": "84 57 34", // #543922
    // surface | #0065b3
    "--color-surface-50": "217 232 244", // #d9e8f4
    "--color-surface-100": "204 224 240", // #cce0f0
    "--color-surface-200": "191 217 236", // #bfd9ec
    "--color-surface-300": "153 193 225", // #99c1e1
    "--color-surface-400": "77 147 202", // #4d93ca
    "--color-surface-500": "0 101 179", // #0065b3
    "--color-surface-600": "0 91 161", // #005ba1
    "--color-surface-700": "0 76 134", // #004c86
    "--color-surface-800": "0 61 107", // #003d6b
    "--color-surface-900": "0 49 88", // #003158
  },
};
