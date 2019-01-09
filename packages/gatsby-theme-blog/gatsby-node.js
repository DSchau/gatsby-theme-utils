const path = require('path')
const slugify = require('limax')
const { addToWebpackConfig } = require('@dschau/gatsby-theme-utils')

const { name: packageName } = require('./package.json')

const getType = node => {
  const { fileAbsolutePath } = node
  const [, type] = fileAbsolutePath
    .split(path.resolve('content'))
    .pop()
    .split('/')
  return type
}

exports.onCreateNode = function onCreateNode({
  actions: { createNodeField },
  node,
}) {
  switch (node.internal.type) {
    case 'MarkdownRemark':
      createNodeField({
        node,
        name: 'slug',
        value: `/${slugify(node.frontmatter.title)}`,
      })
      createNodeField({
        node,
        name: 'type',
        value: getType(node),
      })
      break
    default:
      break
  }
}

const createTagPages = (createPage, edges) => {
  const tagTemplate = require.resolve(`./src/templates/tags.js`)
  const posts = {}

  edges.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!posts[tag]) {
          posts[tag] = []
        }
        posts[tag].push(node)
      })
    }
  })

  Object.keys(posts).forEach(tagName => {
    createPage({
      path: `/tags/${tagName}`,
      component: tagTemplate,
      context: {
        tags: posts[tagName],
        tagName,
      },
    })
  })
}

exports.createPages = function createPages({ actions, graphql }) {
  const { createPage } = actions

  const blogPostTemplate = require.resolve(`./src/templates/blog-post.js`)

  const draftFilter = `
    filter: {
      frontmatter: { draft: { ne: true }}
    }
  `

  return graphql(`{
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      ${process.env.NODE_ENV === 'production' ? draftFilter : ''}
      limit: 1000
    ) {
      edges {
        node {
          excerpt(pruneLength: 160)
          html
          id
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            excerpt
            draft
            tags
            title
          }
        }
      }
    }
  }`).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    createTagPages(createPage, posts)

    // Create pages for each markdown file.
    posts.forEach(({ node }, index) => {
      const {
        fields: { slug },
      } = node
      createPage({
        path: slug,
        component: blogPostTemplate,
        context: {
          prev: index === 0 ? null : posts[index - 1].node,
          next: index === posts.length - 1 ? null : posts[index + 1].node,
          slug,
        },
      })
    })

    return posts
  })
}

exports.onCreateWebpackConfig = addToWebpackConfig(packageName)
