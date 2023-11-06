/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '2.4rem',
        },

        maxWidth: {
          sm: '1280px',
        },
      },
      colors: {
        dark: '#000',
        white: '#FFF',
        light: '#FCF7E6',
        red: '#f12',
      },
      backgroundColor: {
        white: '#fff',
        light: '#FCF7E6',
        red: '#f12',
      },
      borderRadius: {
        DEFAULT: '4px',
      },
      borderWidth: {
        DEFAULT: '1px',
      },
      fontSize: {
        sm: ['1.4rem'],
        base: ['1.4rem'],
        lg: ['1.6rem'],
        xl: ['1.8rem'],
      },
      fontFamily: {
        main: ['Space Grotesk'],
        secondary: ['Space Mono'],
        pagination: ['Inter'],
      },
    },
  },
  plugins: [],
};
