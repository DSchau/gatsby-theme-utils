import babel from 'rollup-plugin-babel'

const config = {
  input: 'src/index.js',
  output: {
    file: 'index.js',
    format: 'cjs'
  },
  plugins: [
    babel()
  ]
}

export default config
