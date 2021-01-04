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
            { members: ['gettext'], path: '@cranium/i18n' },
          ],
        },
      ],
      [
        'module-resolver', {
          root: ['./src/app'],
          alias: {
            assets: './src/assets',
          },
        },
      ],
    ],
  }],
}
