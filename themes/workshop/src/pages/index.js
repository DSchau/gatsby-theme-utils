import React from 'react';

import SEO from '../components/seo';

const IndexPage = () => (
  <React.Fragment>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>
      Overwrite this file, e.g. with an <code>index.mdx</code> file!
    </h1>
  </React.Fragment>
);

export default IndexPage;
