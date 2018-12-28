const utils = require('..');

test('it has expected exports', () => {
  expect(Object.keys(utils)).toMatchSnapshot();
});
