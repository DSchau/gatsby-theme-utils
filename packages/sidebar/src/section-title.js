import React from 'react';

import ChevronSvg from './chevron-svg';
import { fonts } from './presets';

const paddingLeft = level => (level === 0 ? level + 1 * 40 : level + 1 * 20);

const Chevron = ({ isExpanded }) => (
  <span
    css={{
      alignItems: `center`,
      display: `flex`,
      flexShrink: 0,
      marginLeft: `auto`,
      minHeight: 40,
      position: `relative`,
      width: 40,
      '&:before': {
        ...styles.ulHorizontalDivider,
        bottom: 0,
        left: `0 !important`,
        top: `auto`,
      },
    }}
  >
    <ChevronSvg
      cssProps={{
        color: isExpanded ? '#8c65b3' : '#8c65b3',
        marginLeft: `auto`,
        marginRight: `auto`,
        transform: isExpanded ? `rotateX(180deg)` : `rotateX(0deg)`,
        transition: `transform 0.2s ease`,
      }}
    />
  </span>
);

const TitleButton = ({
  isActive,
  isExpanded,
  item,
  level,
  onSectionTitleClick,
  title,
  uid,
}) => (
  <button
    aria-expanded={isExpanded}
    aria-controls={uid}
    css={{
      ...styles.resetButton,
      ...styles.button,
      paddingLeft: level === 0 ? 40 : 0,
      paddingRight: `0 !important`,
      minHeight: 40,
      '&:before': {
        ...styles.ulHorizontalDivider,
        bottom: 0,
        left: level === 0 ? 40 : 0,
        top: `auto`,
      },
    }}
    onClick={() => onSectionTitleClick(item)}
  >
    <SectionTitle isExpanded={isExpanded} isActive={isActive} level={level}>
      {title}
      <Chevron isExpanded={isExpanded} />
    </SectionTitle>
  </button>
);

const SplitButton = ({
  createLink,
  isActive,
  isExpanded,
  isParentOfActiveItem,
  item,
  level,
  location,
  onLinkClick,
  onSectionTitleClick,
  uid,
}) => (
  <span
    css={{
      alignItems: `flex-end`,
      display: `flex`,
      paddingLeft: level === 0 ? 40 : 0,
      position: `relative`,
      width: `100%`,
    }}
  >
    <span
      css={{
        flexGrow: 1,
        borderRight: `1px solid #ede7f3`,
      }}
    >
      {createLink({
        isActive,
        isExpanded,
        isParentOfActiveItem,
        item,
        location,
        onLinkClick,
        customCSS:
          level === 0
            ? {
                '&&': {
                  ...styles.smallCaps,
                  color: isExpanded ? '#1fa9f4' : false,
                  fontWeight: isActive ? `bold` : `normal`,
                },
              }
            : false,
      })}
    </span>
    {/* @todo this should cover 100% of the item's height */}
    <button
      aria-controls={uid}
      aria-expanded={isExpanded}
      css={{
        ...styles.resetButton,
        marginLeft: `auto`,
        '&:hover': {
          background: `white`,
        },
      }}
      onClick={() => onSectionTitleClick(item)}
    >
      <Chevron isExpanded={isExpanded} />
    </button>
  </span>
);

const Title = ({ title, level, isActive, isExpanded }) => (
  <div
    css={{
      alignItems: `center`,
      display: `flex`,
      paddingLeft: paddingLeft(level),
      minHeight: 40,
    }}
  >
    <SectionTitle
      disabled
      isActive={isActive}
      isExpanded={isExpanded}
      level={level}
    >
      {title}
    </SectionTitle>
  </div>
);

const SectionTitle = ({ children, isExpanded, isActive, disabled, level }) => (
  <h3
    css={{
      alignItems: `center`,
      display: `flex`,
      fontFamily: fonts.system.join(','),
      fontSize: `100%`,
      fontWeight: isActive ? `bold` : `normal`,
      margin: 0,
      ...(level === 0 && { ...styles.smallCaps }),
      color: isExpanded ? '#1fa9f4' : false,
      '&:hover': {
        color: disabled ? false : '#1fa9f4',
      },
    }}
  >
    {children}
  </h3>
);

export { Title, TitleButton, SplitButton };

const styles = {
  resetButton: {
    backgroundColor: `transparent`,
    border: 0,
    cursor: `pointer`,
    padding: 0,
  },
  button: {
    position: `relative`,
    textAlign: `left`,
    width: `100%`,
  },
  ulHorizontalDivider: {
    background: '#ede7f3',
    top: 0,
    content: `''`,
    height: 1,
    position: `absolute`,
    right: 0,
    left: 40,
  },
  smallCaps: {
    fontFamily: fonts.header.join(','),
    letterSpacing: `.075em`,
    textTransform: `uppercase`,
  },
};
