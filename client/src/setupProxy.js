const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/question", "/register", "/login", "/logout", "/members"], {
      target: "http://localhost:8080/auth",
      changeOrigin: true,
    }),
  );
};
