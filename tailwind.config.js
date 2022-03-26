module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        'Inter' /* , "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" */,
      ],
    },
    fontSize: {
      '2xs': '0.5rem',
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
        day: {
          100: '#FFFFFF',
          150: 'var(--theme-150, #f5faff)',
          200: '#F7F7F7',
          250: 'var(--theme-250, #e6eff7)',
          300: '#E5E5E5',
          400: '#909090',
          500: '#688091',
          600: '#EFF1F4',
          700: '#333333',
        },
        night: {
          100: '#252A2E',
          150: 'var(--theme-150-dark, #1e3140)',
          200: '#363e45',
          250: 'var(--theme-250-dark, #354b5c)',
          300: '#535c63',
          400: '#909090',
          500: '#748A9A',
          600: '#3D4249',
          700: '#FFFFFF',
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
        theme: {
          100: 'var(--theme-100, #DBE9FF)',
          200: 'var(--theme-200, #3D7AD6)',
          300: 'var(--theme-300, #73A2D0)',
          400: 'var(--theme-400, #5E90BE)',
          500: 'var(--theme-500, #5886B0)',
          600: 'var(--theme-600, #4F86D9)',
          700: 'var(--theme-700, #7C4FB6)',
          800: 'var(--theme-800, #3330B2)',
        },
        // warm: {
        //   100: '#FCF7DD',
        //   200: '#EE6417',
        //   300: '#E2800C',
        //   400: 'linear-gradient(90deg, #F89C13, #E77A15)',
        //   500: 'linear-gradient(90deg, #DF7D21, #B61D1D)',
        //   600: '#EE6417',
        // },
        // cool: {
        //   100: '#DBE9FF',
        //   200: '#3D7AD6',
        //   300: '#73A2D0',
        //   400: 'linear-gradient(90deg, #5E90BE, #5886B0)',
        //   500: 'linear-gradient(90deg, #4F86D9, #7C4FB6)',
        //   600: '#3330B2',
        // },
        // rose: {
        //   100: '#FCDDEC',
        //   200: '#EF5DA8',
        //   300: '#A03669',
        //   400: 'linear-gradient(90deg, #BE5E8C, #B05883)',
        //   500: 'linear-gradient(90deg, #D94FC3, #CC3156)',
        //   600: '#8B1842',
        // },
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
      transitionProperty: {
        'opacity-transform': 'opacity, transform',
      },
      lineHeight: {
        loose: 1.8,
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
