const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const dotEnv = require("dotenv");
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');

const env = dotEnv.config().parsed || {} ;

var keyCloakJson = `{
  "realm": "${env.webContext || "meveo"}",
  "auth-server-url": "${env.authServer || 'http://localhost:8080/auth/'}",
  "ssl-required": "external",
  "resource": "meveo-web",
  "public-client": true,
  "verify-token-audience": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0
}`;

if (!fs.existsSync("./dist")) {
  fs.mkdirSync("./dist",);
}
fs.writeFileSync("./dist/keycloak.json", keyCloakJson);

process.env = {
  ... env,
  ... process.env
};

module.exports = (params) => {
  const basePath = params.WEBPACK_SERVE ? "/" : String(`/${env.webContext || "meveo"}/rest/webapp/${env.module}`);
  return {
    entry: { 
      "main" : "./MainApp.js",
      "polyfill": "./polyfill.js"
    },
    mode: params.production ? "production" : "development",
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        }
      ],
    },
    resolve: {
      preferRelative: true,
      modules: ['node_modules'],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: params.WEBPACK_SERVE ? '/' : './',
      filename: '[name].[contenthash].js',
    },
    optimization: {
      moduleIds: 'deterministic',
      minimize: true,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          lit: {
            test: /[\\/]node_modules[\\/](lit|lit-element|lit-html)[\\/]/,
            name: 'lit',
            chunks: 'all',
          },
          meveo: {
            test: /[\\/]node_modules[\\/](@meveo-org)[\\/]/,
            name: 'meveo',
            chunks: 'all',
          },
          // vendor: {
          //   test: /[\\/]node_modules[\\/]/,
          //   name: 'vendors',
          //   chunks: 'all',
          // },
        }
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
      title: "mv-template",
      filename: "index.html",
      template: "./index-template.html",
      base: basePath + "/"
    }),
    new webpack.DefinePlugin({
      WEBPACK_BASE_PATH: JSON.stringify(basePath)
    })
  ],
    devServer: {
      open: ['/index.html'],
      static: {
        directory: path.join(__dirname, ''),
      },
      historyApiFallback: true,
      proxy: {
        '/investigation-core/**' : {
          target: env.serverAddress || 'http://localhost:8080',
          pathRewrite: { '^/meveo': env.webContext || 'meveo'},
          secure: false
        }
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
      compress: true,
      port: 9000,
    }
  }
};