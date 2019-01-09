import React from 'react';
import styled from '@emotion/styled';

import { rhythm } from '../utils/typography';

const Header = styled.h1`
  background-color: white;
  color: black;
  border-radius: ${rhythm(1)};
  margin: ${rhythm(1)} auto;
  padding: ${rhythm(1 / 4)};
  text-align: center;
  @media only screen and (min-width: 768px) {
    max-width: 65%;
  }
`;

const TagHeader = ({ text }) => {
  return <Header text={text}>{text}</Header>;
};

export default TagHeader;
