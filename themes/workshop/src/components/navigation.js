import React from 'react';
import styled from '@emotion/styled';
import { Link as GatsbyLink } from 'gatsby';
import { GoMarkGithub } from 'react-icons/go';
import { MdSlideshow } from 'react-icons/md';

import GatsbyLogo from './gatsby-logo';
import { color } from '../style/color';

const linkStyles = {
  cursor: 'pointer',
  color: color.gatsby,
  textDecoration: 'none',
  flex: 1,
  display: 'flex',
  borderBottom: `0px solid ${color.gatsby}`,
  height: '100%',
  padding: 12,
};

const Link = styled(GatsbyLink)(linkStyles);
const ExternalLink = styled.a(linkStyles);

ExternalLink.defaultProps = {
  target: '_blank',
  rel: `noopener noreferrer`,
};

export const Navigation = () => (
  <div
    css={{
      background: `rgba(255, 255, 255, 0.976)`,
      borderBottom: `1px solid ${color.white}`,
      color: color.gatsby,
      display: 'flex',
      height: 50,
      position: 'fixed',
      zIndex: 1,
      width: '100%',
    }}
  >
    <nav css={{ width: `100%` }}>
      <ul
        css={{
          display: 'flex',
          justifyContent: `space-between`,
          listStyleType: 'none',
          flex: 1,
          height: '100%',
        }}
      >
        <li>
          <Link
            css={{
              padding: '12px 4px',
              ':hover': {
                border: 'none',
              },
            }}
            to="/"
          >
            <GatsbyLogo css={{ height: 24 }} />
          </Link>
        </li>
        <li>
          <ExternalLink href="/slides" title="View the slidedeck">
            <MdSlideshow css={{ fontSize: 28 }} />
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://github.com/dschau/gatsby-drupal-workshop">
            <GoMarkGithub css={{ fontSize: 20 }} />
          </ExternalLink>
        </li>
      </ul>
    </nav>
  </div>
);
