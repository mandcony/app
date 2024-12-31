const { withExpo } = require('@expo/next-adapter');
const withTM = require('next-transpile-modules')([
  'react-native',
  'react-native-web',
  'react-native-vector-icons',
  'react-native-reanimated',
  'react-native-gesture-handler',
  'react-native-safe-area-context',
  'react-native-screens',
]);

module.exports = withExpo(
  withTM({
    projectRoot: __dirname,
  })
);