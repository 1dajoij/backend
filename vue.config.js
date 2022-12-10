module.exports = {
    devServer: {
        proxy: {
            "/request": {
                target: "http://43.142.96.61/",
                changedOrigin: true,
                pathRewrite: {
                    '/request': '/api'
                }
            }
        }
    }
}