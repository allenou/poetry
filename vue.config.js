module.exports = {
    publicPath: process.env.BASE_URL,
    devServer: {
        proxy: {
            '/api': {
                target: process.env.VUE_APP_PROXY_URL,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}