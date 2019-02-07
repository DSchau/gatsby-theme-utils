import React from 'react';
import { graphql, Link } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/tag';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import MDXComponents from '../components/mdx';
import SEO from '../components/seo';

const Container = styled.div`
  details {
    margin: 1rem 0;
    padding: 1rem 0;
    border: 1px solid #eee;
    border-left-width: 0;
    border-right-width: 0;
  }
`;

const LabLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;

  background-color: black;
  font-size: 16px;
  padding: 0.5rem 0;
  margin: 0.5rem auto;
  color: white;
  text-decoration: none;

  > svg {
    transition: 175ms ease-in-out;
  }

  :hover svg {
    transform: ${props =>
      props.prev ? `translateX(-4px)` : `translateX(4px)`};
  }

  @media only screen and (min-width: 768px) {
    float: ${props => (props.prev ? 'left' : 'right')};
  }
`;

const LabLinkText = styled.span`
  padding: 0 1rem;
`;

function Lab({ data, pageContext }) {
  const { lab } = data;
  const { prev, next } = pageContext;
  return (
    <Container>
      <MDXProvider components={MDXComponents}>
        <SEO title={lab.frontmatter.title} description={lab.excerpt} />
        <h1>{lab.frontmatter.title}</h1>
        <MDXRenderer>{lab.code.body}</MDXRenderer>
        {prev && (
          <LabLink to={prev.fields.slug} prev={true}>
            <MdChevronLeft size={32} />
            <LabLinkText>{prev.frontmatter.title}</LabLinkText>
          </LabLink>
        )}
        {next && (
          <LabLink to={next.fields.slug}>
            <LabLinkText>{next.frontmatter.title}</LabLinkText>{' '}
            <MdChevronRight size={32} />
          </LabLink>
        )}
      </MDXProvider>
    </Container>
  );
}

export const labQuery = graphql`
  query LabQuery($slug: String!) {
    lab: mdx(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`;

export default Lab;
