const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware({
  target: 'https://apiko-intensive-backend.herokuapp.com/',
  pathRewrite: {
    '^/api': '',
  },
  changeOrigin: true,
});

const wsProxy = createProxyMiddleware({
  target: 'https://apiko-intensive-backend.herokuapp.com/',
  // pathRewrite: {
  //   '^/api': '',
  // },
  ws: true,
  changeOrigin: true,
});

module.exports = (app) => {
  app.use('/api', proxy);
  app.use('/socket.io', wsProxy);
};
