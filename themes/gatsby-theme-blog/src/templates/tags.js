import React from 'react';

import Preview from '../components/preview';
import SEO from '../components/seo';
import TagHeader from '../components/tag-header';

export default function Tags({ pageContext }) {
  const { tags, tagName } = pageContext;
  const len = tags.length;
  return (
    <React.Fragment>
      <SEO title={`Posts tagged with "${tagName}"`} />
      <TagHeader text={`${len} post${len > 1 ? 's' : ''} about "${tagName}"`} />
      {tags.map(post => (
        <Preview
          key={post.id}
          html={post.frontmatter.excerpt || post.excerpt}
          date={post.frontmatter.date}
          title={post.frontmatter.title}
          to={post.fields.slug}
        />
      ))}
    </React.Fragment>
  );
}
