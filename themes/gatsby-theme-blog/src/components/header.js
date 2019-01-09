import React, { Component } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';

import NavigationButton from './navigation-button';

import particlesConfig from '../json/particles-config.json';

import { animateBackground, animateShake } from '../style/animations';

const Header = styled.header`
  height: ${props => (props.isPost ? '15vh' : '25vh')};
  background-color: #ffa81f;
  color: blue;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#ffa81f, #d85d15);
  background-size: 250% 250%;
  animation: ${animateBackground} 10s ease infinite;
  font-weight: 400;
  transition: height 250ms ease-in-out;
  user-select: none;
  @media only screen and (min-width: 768px) {
    height: ${props => (props.isPost ? '30vh' : '45vh')};
  }

  > .particles-js-canvas-el {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const Name = styled.h1`
  display: flex;
  flex-wrap: wrap;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 700;
  align-items: center;
  transition: font-size 250ms ease-in-out, padding 150ms ease-in;
  background-color: #002635;
  color: white;
  padding: 0.5rem 1rem;
  margin: 0;
  width: auto;
  user-select: text;
  @media only screen and (min-width: 375px) {
    font-size: 2.5rem;
  }
  @media only screen and (min-width: 768px) {
    font-size: 4.5rem;
    padding: 1rem 2rem;
  }
`;

const Letter = styled.span`
  display: inline-block;
  position: relative;
  z-index: 3;
  &:hover {
    animation: ${animateShake} 1000ms ease-in-out;
  }
`;

const First = styled.span`
  font-weight: 700;
  white-space: nowrap;
`;

const Last = styled.span`
  font-weight: 400;
  white-space: nowrap;
`;

const StyledLink = styled(Link)`
  color: inherit;
`;

const BackContainer = styled.div`
  position: fixed;
  z-index: 2;
  top: 4px;
  left: 0;
`;

class BlogHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBackButton: false,
    };
  }

  async componentDidMount() {
    this.setState({
      showBackButton: document.referrer.match('dustinschau'),
    });

    this.Particles = await import(/* webpackChunkName: "dschau/particles.js" */ '@dschau/particles.js').then(
      ({ default: Particles }) => Particles
    );

    this.Particles('blog-header', particlesConfig);
  }

  render() {
    const { showBackButton } = this.state;
    return (
      <StaticQuery
        query={graphql`
          {
            site {
              siteMetadata {
                author
              }
            }
          }
        `}
        render={data => {
          const name = data.site.siteMetadata.author.split(' ');
          return (
            <Header id="blog-header" {...this.props}>
              {showBackButton && (
                <BackContainer>
                  <NavigationButton
                    to="https://www.dustinschau.com"
                    absolute
                    prev
                    target="_self"
                  >
                    Back to Home
                  </NavigationButton>
                </BackContainer>
              )}
              <Name className="name">
                <StyledLink to="/">
                  {name.map((part, index) => {
                    const Wrapper = index === 0 ? First : Last;
                    return (
                      <Wrapper
                        key={part}
                        css={
                          index === 0 && name.length > 1
                            ? {
                                paddingRight: '2vw',
                              }
                            : {}
                        }
                      >
                        {part.split('').map((letter, index) => (
                          <Letter key={`${letter}-${index}`}>{letter}</Letter>
                        ))}
                      </Wrapper>
                    );
                  })}
                </StyledLink>
              </Name>
            </Header>
          );
        }}
      />
    );
  }
}

export default BlogHeader;
