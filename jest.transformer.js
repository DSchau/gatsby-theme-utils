const babelPreset = require(`babel-preset-gatsby-package`)();
const babelJest = require(`babel-jest`);

module.exports = babelJest.createTransformer(babelPreset);
