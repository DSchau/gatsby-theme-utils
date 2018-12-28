jest.mock('../resolve', () => {
  return jest.fn().mockImplementation(name => `${name}/something.js`);
});

const transpiler = require('../add-to-webpack-config');

const getArguments = () => ({
  actions: {
    setWebpackConfig: jest.fn(),
  },
  loaders: {
    js: jest.fn(),
  },
});

const setup = (...args) => {
  const gatsbyArgs = getArguments();
  transpiler(...args)(gatsbyArgs);

  return [gatsbyArgs, transpiler];
};

test('it invokes setWebpackConfig', () => {
  const name = 'gatsby-theme-whatever';
  const [{ actions }] = setup('gatsby-theme-whatever');

  expect(actions.setWebpackConfig).toHaveBeenCalledTimes(1);
  expect(actions.setWebpackConfig).toHaveBeenCalledWith({
    module: {
      rules: [
        {
          include: name,
          test: /\.js$/,
          use: expect.any(Array),
        },
      ],
    },
  });
});

test('it invokes callback with gatsby arguments', () => {
  const callback = jest.fn();

  const [args] = setup('gatsby-theme-whatever', callback);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith(args);
});

test('it does not error on non-function second argument', () => {
  expect(() => setup('gatsby-theme-whatever', null)).not.toThrow();
});
