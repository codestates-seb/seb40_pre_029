const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      [
        "/auth/question",
        "/auth/questions",
        "/api/members",
        "/auth/register",
        "/auth/login",
        "/auth/logout",
        "/auth/members",
        "/auth/myprofile",
        "/answer/post",
      ],
      {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    ),
  );
};
