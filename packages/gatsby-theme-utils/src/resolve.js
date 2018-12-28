module.exports = function(name, resolver = require.resolve) {
  try {
    return resolver(name)
  } catch (e) {
    // handles symlinks
    return name
  }
};
