import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import Sidebar from '@dschau/sidebar';

import { Navigation } from '../components/navigation';

function Layout({ children, location }) {
  return (
    <StaticQuery
      query={graphql`
        {
          sidebar: allSidebarYaml {
            edges {
              node {
                title
                link
                items {
                  title
                  link
                }
              }
            }
          }
        }
      `}
      render={data => (
        <React.Fragment>
          <Navigation />
          <Sidebar
            itemList={data.sidebar.edges.map(({ node }) => node)}
            location={location}
          />
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              @media only screen and (max-width: 50rem) {
                display: block;
              }
            `}
          >
            <main
              css={css`
                display: flex;
                flex-grow: 1;
                justify-content: center;
                margin: 0;
                padding-left: 20rem;
                width: 100%;
                @media only screen and (max-width: 50rem) {
                  padding-left: 0;
                }
              `}
            >
              <div
                css={css`
                  max-width: 100%;
                  width: 50rem;
                  padding: 2rem;
                  margin-top: 50px;
                  @media only screen and (max-width: 50rem) {
                    width: 100%;
                    position: relative;
                  }
                `}
              >
                {children}
              </div>
            </main>
          </div>
        </React.Fragment>
      )}
    />
  );
}

export default Layout;
