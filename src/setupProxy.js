const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/graphql", "/accounts", "/api", "/media/"],
        createProxyMiddleware({
            target: "http://192.168.1.162:8000",
            changeOrigin: true,
        })
    );
};
