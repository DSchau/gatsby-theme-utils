const path = require(`path`);

module.exports = function gatsbyConfig({ content }) {
  console.log('GOT HEREEEEE', content);
  return {
    siteMetadata: {
      title: `Your Great Workshop`,
      description: `A description of your workshop in about 160 characters or so`,
      author: `@schaudustin`,
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-emotion`,
      `gatsby-plugin-layout`,
      {
        resolve: `gatsby-plugin-typography`,
        options: {
          pathToConfigModule: path.join(
            __dirname,
            `src`,
            `utils`,
            `typography.js`
          ),
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `content`,
          path: content,
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-transformer-yaml`,
      {
        resolve: `gatsby-mdx`,
        options: {
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 590,
              },
            },
            {
              resolve: `gatsby-remark-autolink-headers`,
            },
          ],
        },
      },
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `gatsby-starter-default`,
          short_name: `starter`,
          start_url: `/`,
          background_color: `#663399`,
          theme_color: `#663399`,
          display: `minimal-ui`,
          icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
        },
      },
      {
        resolve: `gatsby-plugin-page-creator`,
        options: {
          path: path.join(__dirname, 'src', 'pages'),
        },
      },
    ],
  };
};
