import React from 'react';

export default function Tags({ pageContext }) {
  const { tags, tagName } = pageContext;
  return (
    <React.Fragment>
      <h1>{tagName}</h1>
      {tags.map(post => JSON.stringify(post, null, 2))}
    </React.Fragment>
  );
}
