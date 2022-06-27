module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          node: '16',
          chrome: '102'
        }
      }
    ],
    '@babel/preset-react'
  ]
}
