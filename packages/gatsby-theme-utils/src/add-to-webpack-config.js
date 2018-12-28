const path = require('path');

const resolve = require('./resolve');

module.exports = function addThemeToWebpackConfig(name, callback) {
  return function onCreateWebpackConfig(...args) {
    const [{ actions, loaders }] = args;

    if (callback && typeof callback === 'function') {
      callback(...args);
    }

    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\.js$/,
            include: path.dirname(resolve(name)),
            use: [loaders.js()],
          },
        ],
      },
    });
  };
};
