/** @type {import('postcss-load-config').Config} */
const config  = {
  plugins: {
    'postcss-nested': {},
    'tailwindcss/nesting': 'postcss-nested',
    tailwindcss: {},
    autoprefixer: {
      flexbox: 'no-2009',
    },
  },
};

module.exports = config