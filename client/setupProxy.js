const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    //proxy가 필요한 path prameter를 입력합니다.
    createProxyMiddleware("/register", {
      target: "http://localhost:7080",
      changeOrigin: true,
    }),
  );
};
