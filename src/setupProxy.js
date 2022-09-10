const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/graphql", "/accounts", "/api", "/media/"],
        createProxyMiddleware({
            target: "http://localhost:8000",
            changeOrigin: true,
        })
    );
};
