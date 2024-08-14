const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  pluginSearchDirs: ['./node_modules/.pnpm', './node_modules'],
};
