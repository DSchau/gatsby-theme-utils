const path = require(`path`);
const glob = require(`glob`);
const fs = require(`fs`);

const packages = glob
  .sync(`./packages/*`)
  .map(p => p.replace(/^\./, `<rootDir>`));

const builtTestsDirs = packages
  .filter(p => fs.existsSync(path.join(p, `src`)))
  .map(p => path.join(p, `__tests__`));
const distDirs = packages.map(p => path.join(p, `dist`));
const ignoreDirs = [].concat(builtTestsDirs, distDirs);

module.exports = {
  notify: true,
  verbose: true,
  roots: packages,
  modulePathIgnorePatterns: ignoreDirs,
  coveragePathIgnorePatterns: ignoreDirs,
  testPathIgnorePatterns: [
    `/examples/`,
    `/www/`,
    `/dist/`,
    `/node_modules/`,
    `__tests__/fixtures`,
  ],
  transform: { '^.+\\.js$': `<rootDir>/jest.transformer.js` },
};
