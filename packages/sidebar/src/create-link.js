import React from 'react';
import { Link } from 'gatsby';
import presets from './presets';

const _getTitle = (title, isDraft) => (isDraft ? title.slice(0, -1) : title);
const _isDraft = title => title.slice(-1) === `*`;

const createLink = ({
  item,
  onLinkClick,
  isActive,
  isParentOfActiveItem,
  stepsUI,
  customCSS,
}) => {
  const isDraft = _isDraft(item.title);
  const title = _getTitle(item.title, isDraft);

  return (
    <span
      css={{
        display: `flex`,
        alignItems: `center`,
        position: `relative`,
        '&:before': {
          background: '#ede7f3',
          bottom: 0,
          top: `auto`,
          content: `''`,
          height: 1,
          position: `absolute`,
          right: 0,
          left: 0,
        },
      }}
    >
      <Link
        css={[
          styles.link,
          isDraft && styles.draft,
          isActive && styles.activeLink,
          isParentOfActiveItem && styles.parentOfActiveLink,
          customCSS && customCSS,
        ]}
        onClick={onLinkClick}
        to={item.link}
      >
        {stepsUI && <span css={{ ...styles.subsectionLink }} />}
        {title}
      </Link>
    </span>
  );
};

const bulletOffset = {
  default: {
    left: -25,
    top: `1.15em`,
  },
  desktop: {
    top: `1.2em`,
  },
};

const bulletSize = 8;

const styles = {
  draft: {
    '&&': {
      color: 'gray', // TODO: change this
    },
  },
  parentOfActiveLink: {
    '&&': {
      color: '#1fa9f4',
      fontWeight: `bold`,
    },
  },
  activeLink: {
    '&&': {
      color: '#1fa9f4',
      fontWeight: `bold`,
    },
    '&:before': {
      background: '#1fa9f4',
      transform: `scale(1)`,
    },
    '&:after': {
      width: 200,
      opacity: 1,
    },
  },
  link: {
    paddingRight: 40,
    minHeight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    position: `relative`,
    zIndex: 1,
    width: `100%`,
    '&&': {
      border: 0,
      boxShadow: `none`,
      fontWeight: `normal`,
      '&:hover': {
        background: `transparent`,
        color: '#1fa9f4',
        '&:before': {
          background: '#1fa9f4',
          transform: `scale(1)`,
        },
      },
    },
    '&:before, &:after': {
      ...bulletOffset.default,
      height: bulletSize,
      position: `absolute`,
      transition: `all 250ms cubic-bezier(0.4, 0, 0.2, 1)`,
    },
    '&:before': {
      borderRadius: `100%`,
      content: `''`,
      transform: `scale(0.1)`,
      width: bulletSize,
      [presets.Tablet]: {
        ...bulletOffset.desktop,
      },
    },
    '&:after': {
      background: '#1fa9f4',
      borderRadius: 4,
      content: `''`,
      left: bulletOffset.default.left + 7,
      opacity: 0,
      transform: `translateX(-200px)`,
      width: 1,
      [presets.Tablet]: {
        ...bulletOffset.desktop,
      },
    },
  },
  subsectionLink: {
    ...bulletOffset.default,
    background: `#fff`,
    border: `1px solid gray`, // TODO: change this
    borderRadius: `100%`,
    display: `block`,
    fontWeight: `normal`,
    height: bulletSize,
    position: `absolute`,
    width: bulletSize,
    zIndex: -1,
    [presets.Tablet]: {
      ...bulletOffset.desktop,
    },
  },
};

export default createLink;
