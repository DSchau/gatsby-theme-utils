import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';

import Post from '../components/post';
import Tags from '../components/tags';
import About from '../components/about';
import SEO from '../components/seo';

import { fadeInBottom } from '../style/animations';

import 'prism-themes/themes/prism-atom-dark.css';

const Container = styled.div`
  max-width: 100%;
  transform: translateY(16px) scale(0.99);
  transform-origin: 50% 0;
  opacity: 0;
  animation: ${fadeInBottom} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) forwards;

  twitterwidget,
  .twitter-tweet {
    margin: 1rem auto;
  }
`;

export default function BlogPost({ data = {}, pageContext }) {
  const { markdownRemark: post } = data;
  const { next, prev } = pageContext;

  const description = post.frontmatter.excerpt
    ? post.frontmatter.excerpt
    : post.excerpt;
  const image = post.frontmatter.featured
    ? post.frontmatter.featured.image.resize
    : null;

  const meta = [
    {
      name: `og:type`,
      content: `article`,
    },
    {
      name: `twitter:label1`,
      content: `Reading time`,
    },
    {
      name: `twitter:data1`,
      content: `${post.timeToRead} min read`,
    },
    {
      name: `article:published_time`,
      content: post.frontmatter.rawDate,
    },
  ];

  return (
    <Container>
      <SEO
        title={post.frontmatter.title}
        description={description}
        image={image}
        meta={meta}
      />
      <Post
        className="blog-post"
        html={post.html}
        date={post.frontmatter.date}
        linkTo={post.frontmatter.link || '/'}
        title={post.frontmatter.title}
        next={next}
        prev={prev}
      >
        <Tags list={post.frontmatter.tags} />
        <About image={data.image.childImageSharp} />
      </Post>
    </Container>
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
