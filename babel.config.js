module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          electron: '19.0.2'
        }
      }
    ],
    '@babel/preset-react'
  ]
}
