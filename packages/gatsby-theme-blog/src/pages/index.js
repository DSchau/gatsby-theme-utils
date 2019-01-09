import React from 'react';
import { graphql } from 'gatsby';

import Preview from '../components/preview';
import SEO from '..//components/seo';

const getParams = (search = '') => {
  return search
    .replace('?', '')
    .split('&')
    .reduce((params, keyValue) => {
      const [key, value = ''] = keyValue.split('=');
      if (key && value) {
        params[key] = value.match(/^\d+$/) ? +value : value;
      }
      return params;
    }, {});
};

export default function Index({ data, location }) {
  const { edges: posts } = data.allMarkdownRemark;
  const { start = 0, end = 10 } = getParams(location.search);
  return (
    <React.Fragment>
      <SEO title="All posts" />
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .slice(start, end)
        .map(({ node: post }) => (
          <Preview
            key={post.id}
            excerpt={post.frontmatter.excerpt || post.excerpt}
            date={post.frontmatter.date}
            title={post.frontmatter.title}
            to={post.fields.slug}
          />
        ))}
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
