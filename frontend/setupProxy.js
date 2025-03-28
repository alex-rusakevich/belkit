const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8000/api/',
            changeOrigin: true,
        })
    );
    app.use(
        '/admin',
        createProxyMiddleware({
            target: 'http://localhost:8000/admin/',
            changeOrigin: true,
        })
    );

    app.use(
        '/sitemap.xml',
        createProxyMiddleware({
            target: 'http://localhost:8000/sitemap.xml',
            changeOrigin: true,
            ignorePath: true
        })
    );
};
