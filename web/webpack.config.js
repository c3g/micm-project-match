const webpackMerge = require('webpack-merge');
const commonConfig = require('./build/webpack.common.config');

const addons = addons =>
  []
    .concat(addons)
    .filter(Boolean)
    .map(name => require(`./build/addons/webpack.${name}`));

module.exports = env =>
  webpackMerge(
    commonConfig,
    require(`./build/webpack.${(env && env.env) || 'dev'}.config`),
    ...addons(env && env.addons)
  );
