import React from 'react';
import styled from '@emotion/styled';
import { rhythm } from '../utils/typography';
import { MdList } from 'react-icons/md';

import PostTitle from './post-title';
import Toolbar from './post-toolbar';
import StyledLink from './link';

const Post = styled.section`
  position: relative;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
  background-color: white;
  outline: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${rhythm(1)};
  :last-child {
    border-bottom-width: 0;
  }
  @media only screen and (min-width: 768px) {
    margin-bottom: ${props => (props.preview ? rhythm(2) : 0)};
    padding-bottom: ${rhythm(2)};
  }

  h1.post-title {
    text-align: center;
    font-weight: 700;
    display: inline-block;
  }
`;

const PostContents = styled.div`
  max-width: 100%;
  padding: ${rhythm(3 / 4)} ${rhythm(1)};
  @media only screen and (min-width: 768px) {
    padding: ${rhythm(1)} ${rhythm(2)};
    padding-top: ${rhythm(1)};
  }
`;

const PostContent = styled.div`
  > h2 {
    color: #333;
    margin: ${rhythm(1 / 4)} 0;
    padding: ${rhythm(1 / 4)} 0;
    border-bottom: 2px solid #ddd;
    font-weight: 400;
  }

  > h3 {
    display: inline-block;
    color: #444;
    margin: ${rhythm(1 / 6)} 0;
    padding: ${rhythm(1 / 6)};
    padding-left: 0;
    border-bottom: 1px solid #ddd;
    font-weight: 400;
  }

  > p {
    margin: ${rhythm(3 / 4)} auto;
    color: #333;
    line-height: ${rhythm(1.25)};
  }

  a:not(.anchor) {
    display: inline;
    color: #d85d15;
    position: relative;
    text-decoration: none;
    padding: 2px;
    transition: all 175ms ease-in-out;

    :before,
    :after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 1px;
      background-color: #d85d15;
    }

    :after {
      bottom: -2px;
      transition: 200ms ease-out;
    }

    :before {
      top: -2px;
      transform: translateY(24px);
      opacity: 0;
      transition: 200ms ease-out;
    }

    :hover {
      background-color: rgba(216, 93, 21, 0.05);

      :before {
        transform-origin: center top;
        transform: translateY(0) scaleX(1.025);
        opacity: 1;
      }

      :after {
        transform-origin: center bottom;
        transform: scaleX(1.025);
      }
    }
  }

  > blockquote {
    margin-left: 0.75rem;
    padding-left: 1.5rem;
    border-left: 4px solid #ddd;
  }

  > video.responsive {
    max-width: 100%;
    max-height: 100%;
  }

  .gatsby-code-title {
    margin-bottom: -0.6rem;
    padding: 0.5em 1em;
    font-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
      'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
      'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier,
      monospace;

    background-color: black;
    color: white;
    z-index: 0;

    border-top-left-radius: 0.3em;
    border-top-right-radius: 0.3em;
  }

  .gatsby-code-title + .gatsby-highlight {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .gatsby-highlight-code-line {
    background-color: #0e0e0e;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #96cbfe;
  }

  .gatsby-highlight {
    background-color: #1d1f21;
    border-radius: 0.3em;
    margin: 0.5em 0;
    padding: 1em;
    overflow: auto;
  }

  .gatsby-highlight pre[class*='language-'] {
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left;
    min-width: 100%;
  }
`;

const Divider = styled.hr`
  border: 0;
  width: 75%;
  margin: ${rhythm(1 / 2)} auto;
  border-bottom: 1px solid #eee;
`;

const ListIcon = styled(MdList)`
  font-size: 32px;
  margin-right: 0.5rem;
`;

const AllPostsContainer = styled.span`
  display: flex;
  align-items: center;
`;

export default function({
  children,
  className,
  date,
  html: __html,
  linkTo,
  title,
  next,
  prev,
  ...rest
}) {
  const isPost = (truthy, falsy = null) => {
    if (linkTo === '/') {
      return truthy;
    }
    return falsy;
  };
  return (
    <Post className={[`post`].concat(className || []).join(' ')} {...rest}>
      <PostTitle title={title} to={isPost(undefined, linkTo)}>
        <Toolbar
          title={title}
          date={date}
          isPost={isPost(true, false)}
          linkTo={linkTo}
          next={next}
          prev={prev}
        />
      </PostTitle>
      <PostContents>
        <PostContent dangerouslySetInnerHTML={{ __html }} />
        {children}
        <Divider />
      </PostContents>
      <StyledLink to={linkTo} title={title}>
        {isPost(
          <AllPostsContainer>
            <ListIcon />
            All posts
          </AllPostsContainer>,
          'Read more'
        )}
      </StyledLink>
    </Post>
  );
}
