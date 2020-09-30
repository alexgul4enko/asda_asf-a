module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [{
    exclude: /node_modules\/(?!ds-)/,
    plugins: [
      'react-require',
      'import-graphql',
      [
        'auto-import', {
          declarations: [
            { members: ['gettext'], path: '@ds-frontend/i18n' },
          ],
        },
      ],
      [
        'module-resolver', {
          root: ['./src/app'],
          alias: {
            assets: './src/assets',
            '@ds-frontend/cache': 'ds-frontend/packages/cache',
            '@ds-frontend/api': 'ds-frontend/packages/api',
            '@ds-frontend/i18n': 'ds-frontend/packages/i18n',
            '@ds-frontend/queryParams': 'ds-frontend/packages/queryParams',
            '@ds-frontend/redux-helpers': 'ds-frontend/packages/redux-helpers',
            '@ds-frontend/resource': 'ds-frontend/packages/resource',
          },
        },
      ],
    ],
  }],
}
