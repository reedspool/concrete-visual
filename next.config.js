// next.config.js
const withTM = require('next-transpile-modules')([
    'concrete-parser/', 'inverted-promise/', 'concrete-interpreter/']);

module.exports = withTM({
  future: {
    webpack5: false, // you want to keep using Webpack 4
  },
});
