module.exports = function(name, resolver = require.resolve) {
  return resolver(name);
};
