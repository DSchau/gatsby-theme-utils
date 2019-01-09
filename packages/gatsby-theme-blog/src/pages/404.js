import React from 'react';
import styled from '@emotion/styled';
import Image from 'gatsby-image';
import { graphql, Link as GatsbyLink } from 'gatsby';

import SEO from '../components/seo';
import { fadeInBottom } from '../style/animations';

const Container = styled.div`
  max-width: 100%;
  transform: translateY(16px) scale(0.99);
  transform-origin: 50% 0;
  opacity: 0;
  animation: ${fadeInBottom} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

const Link = styled(GatsbyLink)`
  display: block;
  position: relative;
  transition: transform 175ms ease-in-out;
  &:hover {
    transform: scale(1.075);
  }
`;

const Header = styled.h1`
  color: white;
  padding: 1rem 2rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 2;
  font-size: 72px;
  text-transform: uppercase;
  text-align: center;
  line-height: 96px;
  pointer-events: none;
  width: 100%;
`;

const Description = styled.p`
  font-size: 0.9rem;
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  color: rgba(255, 255, 255, 0.8);
  z-index: 2;
  text-align: center;
  font-style: italic;
  width: 100%;
`;

export default function OnNoAFourOhFour({ data }) {
  return (
    <React.Fragment>
      <SEO title="404 - Not Found" />
      <Container>
        <Link to="/">
          <Header>Oh no! 404!</Header>
          <Image fluid={data.image.childImageSharp.fluid} />
          <Description>(Click this to go back to Home)</Description>
        </Link>
      </Container>
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  {
    image: file(absolutePath: { regex: "/404.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
