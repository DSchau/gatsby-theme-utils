import React from 'react';
import { graphql } from 'gatsby';

export default function BlogPost({ data = {} }) {
  const { markdownRemark: post } = data;

  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    image: file(absolutePath: { regex: "/me.jpg/" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 160)
      timeToRead
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        featured {
          image: childImageSharp {
            resize(width: 1500) {
              height
              width
              src
            }
          }
        }
        rawDate: date
        draft
        excerpt
        tags
        title
      }
    }
  }
`;
