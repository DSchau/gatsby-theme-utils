import React from 'react';
import { graphql, Link } from 'gatsby';

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <React.Fragment>
      <ul>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => (
            <li key={post.id}>
              <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
            </li>
          ))}
      </ul>
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          id
          html
          excerpt(pruneLength: 160)
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            rawDate: date
            draft
            excerpt
            tags
            title
          }
        }
      }
    }
  }
`;
