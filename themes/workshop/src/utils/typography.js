import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';

const headerFontFamily = [
  `Futura PT`,
  `-apple-system`,
  `BlinkMacSystemFont`,
  `Segoe UI`,
  `Roboto`,
  `Oxygen`,
  `Ubuntu`,
  `Cantarell`,
  `Fira Sans`,
  `Droid Sans`,
  `Helvetica Neue`,
  `Arial`,
  `sans-serif`,
];

const bodyFontFamily = [
  `Spectral`,
  `Georgia`,
  `Times New Roman`,
  `Times`,
  `serif`,
];

const options = {
  headerFontFamily,
  bodyFontFamily,
  baseLineHeight: 1.4,
  baseFontSize: `16px`,
  headerLineHeight: 1.075,
  headerColor: `#222`,
  bodyColor: `#444`,
  blockMarginBottom: 0.75,
  scaleRatio: 2,
  plugins: [new CodePlugin()],
};

export { headerFontFamily, bodyFontFamily };

export default new Typography(options);
