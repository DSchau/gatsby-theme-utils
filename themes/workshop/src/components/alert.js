import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { MdError, MdInfo, MdWarning } from 'react-icons/md';

const Container = styled.div`
  display: flex;
  margin: 1rem auto;

  ${props => {
    const typeStyle = style.colors[props.type];
    return css`
      background-color: ${typeStyle.bg};
      color: ${typeStyle.text};

      > .icon-base {
        background-color: ${typeStyle.text};
        color: ${typeStyle.bg};
      }
    `;
  }}
`;

const IconBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
`;

const Message = styled.p`
  align-self: center;
  padding: 1rem 0.25rem;
  margin: 0;
  margin-left: 0.5rem;
`;

const icons = {
  error: MdError,
  info: MdInfo,
  warn: MdWarning,
};

export default function Alert({ children, type = `info` }) {
  const Icon = icons[type] || icons.info;
  return (
    <Container type={type}>
      <IconBase className="icon-base">
        <Icon size={32} />
      </IconBase>
      <Message>{children}</Message>
    </Container>
  );
}

const style = {
  colors: {
    error: {
      bg: `#ffe2e2`,
      text: `#7c1d1d`,
    },
    info: {
      bg: `#e2edff`,
      text: `#161459`,
    },
    warn: {
      bg: `#efe9b3`,
      text: `#595218`,
    },
  },
};
