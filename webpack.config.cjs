const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotEnv = require("dotenv");
const fs = require('fs');

const env = dotEnv.config().parsed || {} ;

var keyCloakJson = `{
  "realm": "${env.webContext || meveo}",
  "auth-server-url": "${env.authServer || 'http://localhost:8080/auth/'}",
  "ssl-required": "external",
  "resource": "meveo-web",
  "public-client": true,
  "verify-token-audience": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0
}`;

fs.writeFileSync("./dist/keycloak.json", keyCloakJson);

module.exports = (params) => {
  return {
    entry: "./MainApp.js",
    mode: params.production ? "production" : "development",
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      preferRelative: true
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: './',
      filename: 'MainApp.js',
    },
    plugins: [new HtmlWebpackPlugin({
      title: "mv-template",
      filename: "index.html",
      template: "./index-template.html"
    }), 
  ],
    devServer: {
      open: ['/index.html'],
      static: {
        directory: path.join(__dirname, ''),
      },
      proxy: {
        '/meveo/**' : {
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