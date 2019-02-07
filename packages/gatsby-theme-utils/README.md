# @dschau/gatsby-theme-utils

## Install

```sh
npm i @dschau/gatsby-theme-utils
```

## Usage

The utility exposes a number of helpful utilities, particularly:

### `addToWebpackConfig`

A utility to add the current theme to webpack so that the theme does not have to be transpiled.

#### Usage

In `gatsby-node.js`:

```js
const { addToWebpackConfig } = require('@dschau/gatsby-theme-utils');

const { name } = require('./package.json'); // the theme name

exports.onCreateWebpackConfig = addToWebpackConfig(name);
```

additionally, the utility exposes a callback that can be used to add any additional webpack configuation, e.g.

```js
const { addToWebpackConfig } = require('@dschau/gatsby-theme-utils');

const { name } = require('./package.json'); // the theme name

exports.onCreateWebpackConfig = addToWebpackConfig(
  name,
  ({ actions, loaders }) => {
    // note: this is just an example; don't add this loader :)
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: 'my-css',
            use: [loaders.style(), loaders.css()],
          },
        ],
      },
    });
  }
);
```
