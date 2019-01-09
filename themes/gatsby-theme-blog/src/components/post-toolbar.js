import React from 'react';
import styled from '@emotion/styled';

import { rhythm } from '../utils/typography';

import NavigationButton from './navigation-button';
import PostDate from './date';

const ToolbarContainer = styled.div`
  display: flex;
  padding-bottom: ${rhythm(1 / 4)};
`;

export default function PostToolbar({ date, isPost, next, prev, title }) {
  const Buttons = () => {
    if (isPost) {
      return (
        <div>
          {prev && (
            <NavigationButton title={title} to={prev.fields.slug} prev>
              {prev.frontmatter.title}
            </NavigationButton>
          )}
          {next && (
            <NavigationButton title={title} to={next.fields.slug} next>
              {next.frontmatter.title}
            </NavigationButton>
          )}
        </div>
      );
    }
    return null;
  };
  return (
    <ToolbarContainer>
      <Buttons />
      <PostDate date={date} />
    </ToolbarContainer>
  );
}
