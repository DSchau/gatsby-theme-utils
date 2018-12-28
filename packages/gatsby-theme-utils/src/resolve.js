const path = require('path')

module.exports = function(name, resolver = require.resolve) {
  try {
    return resolver(name)
  } catch (e) {
    // handle symlink
    return path.join(__dirname, name)
  }
};
