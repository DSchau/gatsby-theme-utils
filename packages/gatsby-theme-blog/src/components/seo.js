import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

function SEO({ author, description, lang, image, meta, keywords, title }) {
  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              author
              description
              siteUrl
              social {
                twitter
              }
            }
          }
        }
      `}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        const metaImage =
          image && image.src
            ? `${data.site.siteMetadata.siteUrl}${image.src}`
            : null;
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.author}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                property: `article:author`,
                content: author || data.site.siteMetadata.author,
              },
              {
                name: `twitter:creator`,
                content: `@${data.site.siteMetadata.social.twitter}`.replace(
                  /^@+/,
                  '@'
                ),
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(
                metaImage
                  ? [
                      {
                        property: 'og:image',
                        content: metaImage,
                      },
                      {
                        property: 'og:image:width',
                        content: image.width,
                      },
                      {
                        property: 'og:image:height',
                        content: image.height,
                      },
                      {
                        property: 'twitter:card',
                        content: 'summary_large_image',
                      },
                    ]
                  : [
                      {
                        name: `twitter:card`,
                        content: `summary`,
                      },
                    ]
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  author: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  twitter: PropTypes.string,
};

export default SEO;
