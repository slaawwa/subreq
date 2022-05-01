// const { defineConfig } = require('@vue/cli-service')

module.exports = /* defineConfig( */{
  // transpileDependencies: true,
  devServer: {
    // proxy: 'http://localhost:8070',
    proxy: {
      '^/api': {
        target: 'http://localhost:8070',
        // ws: true,
        changeOrigin: true
      },
    },
  },
}/* ) */
