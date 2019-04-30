const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

module.exports = withImages(
    withSass({
        sassLoaderOptions: {
            includePaths: ['./static/styles/']
        },
        cssModules: true,
        cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]'
        }
    })
)