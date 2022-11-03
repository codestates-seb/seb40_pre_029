const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/*", {
      target: "https://a568-49-142-46-205.jp.ngrok.io",
      changeOrigin: true,
    }),
  );
};
