const path = require('path');

module.exports = function themeConfig({ root } = {}) {
  return {
    plugins: [
      'gatsby-plugin-emotion',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: path.join(__dirname, 'src', 'images'),
          name: 'images',
        },
      },
      {
        resolve: 'gatsby-plugin-google-analytics',
        options: {
          trackingId: 'UA-102928446-2',
        },
      },
      {
        resolve: 'gatsby-plugin-typography',
        options: {
          omitGoogleFont: true,
          pathToConfigModule: path.relative(
            root,
            require.resolve('./src/utils/typography.js')
          ),
        },
      },
    ],
  };
};
