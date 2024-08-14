/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    'postcss-nested': {},
    'tailwindcss/nesting': 'postcss-nested',
    tailwindcss: {},
    autoprefixer: {
      flexbox: 'no-2009',
    },
  },
};
