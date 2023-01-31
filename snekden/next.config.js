/** @type {import('next').NextConfig} */
// const withTM = require('next-transpile-modules')(['three']);
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // turbotrace: true,
    appDir: true,

  },
  webpack: {
    webpack: function (config) {
      // const experiments = config.experiments || {}
      config.output.webAssemblyModuleFilename = 'static/wasm/[modulehash].wasm';
      // config.experiments = { ...experiments, asyncWebAssembly: true }
      config.experiments = { asyncWebAssembly: true }
      // config.output.assetModuleFilename = 'static/[hash][ext]'
      // config.output.publicPath = '/_next/'
      // config.module.rules.push({
      //   test: /\.wasm/,
      //   type: 'asset/resource'
      // })
      return config
    }
  },
}

module.exports = nextConfig
