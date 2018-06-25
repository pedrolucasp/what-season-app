const webpack = require('webpack')
/**
 * After the next require you can use process.env to get your secrets
 */
if (process.env.NODE_ENV !== 'production') {
  require('now-env')
}

console.log({
  SECRET: process.env.UNSPLASH_API_KEY,
  ANOTHER_SECRET: process.env.UNSPLASH_API_SECRET,
})

module.exports = {
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.UNSPLASH_API_KEY': JSON.stringify(process.env.UNSPLASH_API_KEY),
        'process.env.UNSPLASH_API_SECRET': JSON.stringify(process.env.UNSPLASH_API_SECRET)
      }),
      // Same as above
      // new webpack.EnvironmentPlugin({
      //   'process.env.UNSPLASH_API_KEY': JSON.stringify(process.env.UNSPLASH_API_KEY),
      //   'process.env.UNSPLASH_API_SECRET': JSON.stringify(process.env.UNSPLASH_API_SECRET)
      // })
    )
    return config
  }
}

