module.exports = {
  presets: ['babel-preset-expo'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    'transform-inline-environment-variables',
    [
      'dotenv-import',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['.'],
        alias: {
          '@apis': './src/apis',
          '@context': './src/context',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@routes': './src/routes',
          '@theme': './src/theme',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
