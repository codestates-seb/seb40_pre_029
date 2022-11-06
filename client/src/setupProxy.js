const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      [
        "/api",
        "/auth",
        "/auth/questions",
        "/auth/register",
        "/api/auth/login",
        "/auth/logout",
        "/auth/members",
        "/auth/member",
        "/answer/post",
        "/auth/verify",
        "/auth/withdraw",
      ],
      {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    ),
  );
};
