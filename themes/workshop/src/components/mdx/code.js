import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import styled from '@emotion/styled';
import codeTheme from 'prism-react-renderer/themes/vsDarkPlus';

const Title = styled.div`
  margin: 0;
  background-color: #4a4a4a;
  border-bottom: 1px solid #000;
  color: ${codeTheme.plain.color};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  font-size: 14px;
  padding: 0.5rem 1rem;
  margin-top: 1.5rem;
`;

const prismMap = {
  sh: 'bash',
  shell: 'bash',
};

export default ({ children, lang, title }) => {
  return (
    <Highlight
      {...defaultProps}
      theme={codeTheme}
      code={children.trim()}
      language={prismMap[lang] || lang}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <React.Fragment>
          {title && <Title>{title}</Title>}
          <pre
            className={className}
            style={{
              ...style,
              ...(title && {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }),
            }}
            css={{
              overflow: 'auto',
              padding: '1rem',
              marginTop: title ? 0 : '1.5rem',
            }}
          >
            {tokens.map((line, i) => (
              <div key="fake-key" {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key="fake-key" {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        </React.Fragment>
      )}
    </Highlight>
  );
};
