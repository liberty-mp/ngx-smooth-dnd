const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, "./projects/demo/src/index.html"),
    join(__dirname, "./projects/demo/src/**/*.{html,ts}"),
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Pally', 'Comic Sans MS', 'sans-serif'],
        body: ['Pally', 'Comic Sans MS', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
				mono: ['Fira Code', 'monospace'],
        displayPro: ['PF DinDisplay Pro', 'sans-serif'],
        boogaloo: ['Boogaloo', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
			backgroundImage: {
				auth: "url('/assets/images/auth/background.png')",
				'auth-character': "url('/assets/images/auth/character.png')"
			},
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      backgroundColor: {
        'primary': '#251f4d',
        'secondary': '#312d50'
      },
      borderColor: {
        'primary': '#312d50'
      },
      textShadow: {
        sm: '0px 0px 2px var(--tw-shadow-color)',
        lg: '0 0px 3px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
      },
    }
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
