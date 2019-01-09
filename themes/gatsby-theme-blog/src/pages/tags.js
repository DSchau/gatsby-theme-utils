import React from 'react';
import styled from '@emotion/styled';
import { graphql, Link } from 'gatsby';

import SEO from '../components/seo';
import TagHeader from '../components/tag-header';
import { rhythm } from '../utils/typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  padding: ${rhythm(1)};
  padding-left: ${rhythm(2)};
  margin: 0;
`;
const ListItem = styled.li``;

export default function Tags({ data }) {
  return (
    <Container>
      <SEO title="Tags" />
      <TagHeader text="All tags" />
      <List>
        {data.tags.group.map(({ name }) => {
          return (
            <ListItem key={name}>
              <Link to={`/tags/${name}`}>{name}</Link>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export const pageQuery = graphql`
  {
    tags: allMarkdownRemark {
      group(field: frontmatter___tags) {
        name: fieldValue
        totalCount
      }
    }
  }
`;
