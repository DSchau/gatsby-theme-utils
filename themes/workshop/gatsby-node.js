const { createFilePath } = require(`gatsby-source-filesystem`);
const { addToWebpackConfig } = require('@dschau/gatsby-theme-utils');

const { name: packageName } = require('./package.json');

exports.onCreateNode = function onCreateNode({
  actions: { createNodeField },
  node,
  getNode,
}) {
  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({
      node,
      getNode,
    });

    createNodeField({
      node,
      name: `lab`,
      value: !!node.fileAbsolutePath.match(/labs\//),
    });

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = async function createPages({
  actions: { createPage },
  graphql,
}) {
  const { labs, allMdx } = await graphql(`
    {
      labs: allMdx(
        filter: { fields: { lab: { eq: true } } }
        sort: { fields: [fields___slug], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }

      allMdx(filter: { fields: { slug: { ne: "/" }, lab: { eq: false } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      throw res.errors;
    }
    return res.data;
  });

  const labTemplate = require.resolve(`./src/templates/lab.js`);

  labs.edges.concat(allMdx.edges).forEach(({ node }, index) => {
    const prev =
      index === 0 || index === labs.edges.length
        ? null
        : labs.edges[index - 1].node;
    const next =
      index + 1 >= labs.edges.length ? null : labs.edges[index + 1].node;
    const { slug } = node.fields;
    createPage({
      component: labTemplate,
      path: slug,
      context: {
        slug: slug,
        prev,
        next,
      },
    });
  });
};

exports.onCreateWebpackConfig = addToWebpackConfig(packageName);
