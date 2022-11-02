// const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.jsx'],
  darkMode: 'media', // or 'class'
  theme: {
    colors: {
      primary: '#613eea',
      secondary: '#8c8c8c',
      tertiary: 'rgba(0, 0, 0, 0.25)',
      gray: '#bfbfbf',
      red: 'rgba(235, 56, 80, 1)',
      warning: '#faad14',
      heading: 'rgba(0, 0, 0, 0.85)',
    },
    extend: {
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
