const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    outputDir: 'docs',

    configureWebpack: {
        plugins: [
            new CompressionPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: ['js'],
                threshold: 10240,
                minRatio: 0.8
            })
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                })
            ]
        }
    }
}