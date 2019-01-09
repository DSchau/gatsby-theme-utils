import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Global } from '@emotion/core';

import Content from '../components/content';
import Footer from '../components/footer';
import Header from '../components/header';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children, location } = this.props;
    const isPost =
      location.pathname !== '/' && !location.pathname.match(/^\/blog\/?$/);

    return (
      <React.Fragment>
        <Global
          styles={{
            'html, body, #___gatsby': {
              height: '100%',
            },
            body: {
              backgroundColor: '#002635',
            },
            '::selection': {
              background: '#FF6138',
              color: 'white',
            },
          }}
        />
        <Root>
          <Header isPost={isPost} />
          <Content isPost={isPost} Footer={Footer}>
            {children}
          </Content>
        </Root>
      </React.Fragment>
    );
  }
}
