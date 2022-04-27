module.exports = {
  root: true,
  extends: require.resolve('eslint-plugin-airbnb-react'),
  globals: {
    React: false,
  },
  settings: {
    'react': {
      version: 'detect',
    },
    'import/resolver':{
      typescript: {},
      alias: {
        map: [],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
    'import/order': ['error'],
  },
  rules: {},
}
