module.exports = {
  presets: [
    ['@babel/preset-env', {
      loose: true,
      modules: false
    }],
    '@babel/preset-react',
    ['@emotion/babel-preset-css-prop', {
      sourceMap: false,
      autoLabel: true
    }]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ]
}
