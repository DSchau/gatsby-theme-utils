import React from 'react';
import { graphql, Link } from 'gatsby';

export default function Tags({ data }) {
  return (
    <div>
      <h1>All tags</h1>
      <ul>
        {data.tags.group.map(({ name }) => {
          return (
            <li key={name}>
              <Link to={`/tags/${name}`}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
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
