module.exports = {
    devServer: {
      proxy: {
        '/': {
          target: 'http://localhost:3001',
          ws: true,
          changeOrigin: true
        }
      }
    }
  }