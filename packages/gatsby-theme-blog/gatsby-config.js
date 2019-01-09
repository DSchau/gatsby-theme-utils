const path = require('path')

module.exports = function themeConfig({
  blogContent = path.join('content', 'blog'),
  root,
} = {}) {
  return {
    siteMetadata: {
      title: 'Insert title here',
      description: 'Your great blog',
      author: 'Your name',
      siteUrl: 'https://yoursiteurl.com',
      social: {
        twitter: 'yourtwitterhandle',
      },
    },
    plugins: [
      {
        resolve: 'gatsby-plugin-manifest',
        options: {
          name: `Dustin Schau's Blog`,
          description: 'The blog of the developer, Dustin Schau',
          short_name: 'DSchau Blog',
          background_color: 'white',
          theme_color: '#002635',
          orientation: 'portrait',
          display: 'minimal-ui',
        },
      },
      'gatsby-plugin-catch-links',
      'gatsby-plugin-emotion',
      'gatsby-plugin-remove-trailing-slashes',
      'gatsby-plugin-twitter',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: path.join(root, blogContent),
          name: 'post',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: path.join(__dirname, 'src', 'images'),
          name: 'images',
        },
      },
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            'gatsby-remark-code-titles',
            'gatsby-remark-copy-linked-files',
            {
              resolve: 'gatsby-remark-images',
              options: {
                backgroundColor: 'transparent',
                linkImagesToOriginal: false,
                showCaptions: true,
              },
            },
            'gatsby-remark-prismjs',
            'gatsby-remark-smartypants',
            'gatsby-remark-autolink-headers',
          ],
        },
      },
      'gatsby-plugin-react-helmet',
      {
        resolve: 'gatsby-plugin-layout',
        options: {
          component: path.join(__dirname, 'src', 'layouts', 'index.js'),
        },
      },
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
      'gatsby-plugin-offline',
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
      {
        resolve: 'gatsby-plugin-google-analytics',
        options: {
          trackingId: 'UA-102928446-2',
        },
      },
      {
        resolve: `gatsby-plugin-page-creator`,
        options: {
          path: path.join(__dirname, 'src', 'pages'),
        },
      },
    ],
  }
}
