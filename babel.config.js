module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env', {
        /** Targets must match the versions supported by electron.
         * See https://www.electronjs.org/
        */
        targets: {
          node: '16',
          chrome: '102'
        }
      }
    ],
    '@babel/preset-react'
  ]
}
