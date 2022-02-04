module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        neutral: {
          100: '#FFFFFF',
          200: '#F7F7F7',
          300: '#EFF1F4',
          400: '#E5E5E5',
          500: '#9A9A9A',
          600: '#688091',
          700: '#333333',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
      },
      animation: {
        'tooltip-appear': 'tooltip-appear 0.15s ease-in',
      },
      keyframes: {
        'tooltip-appear': {
          '0%': {
            opacity: '0%',
            transform:
              'translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(0.5) scaleY(0.5)',
          },
          '100%': {
            opacity: '100%',
            transform:
              'translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(1)) scaleY(1)',
          },
        },
      },
    },
  },
  variants: {},
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwindcss-scoped-groups')({
      groups: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    }),
  ],
};
