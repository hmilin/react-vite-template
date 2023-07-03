// const colors = require('tailwindcss/colors');

module.exports = {
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
    preflight: false,
  },
  content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.jsx'],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        heading: 'var(--text-color-heading)',
        main: 'var(--text-color-main)',
        tertiary: 'var(--text-color-tertiary)',
        quaternary: 'var(--text-color-quaternary)',
        gray: '#bfbfbf',
        red: 'var(--error-color)',
        warning: 'var(--warning-color)',
      },
      // By default the spacing scale is inherited by the padding, margin, width, height, maxHeight, gap, inset, space, and translate core plugins.
      spacing: {
        px: '1px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
