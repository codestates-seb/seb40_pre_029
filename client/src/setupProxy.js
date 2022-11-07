const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      [
        "/api",
        "/auth",
        "/auth/questions",
        "/auth/question",
        "/auth/register",
        "/api/auth/login",
        "/auth/logout",
        "/auth/members",
        "/auth/member",
        "/answer/post",
        "/auth/verify",
        "/auth/withdraw",
        "question",
        "questions",
      ],
      {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    ),
  );
};
