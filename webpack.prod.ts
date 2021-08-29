import * as webpack from "webpack";
import HtmlWebPackPlugin from "html-webpack-plugin";
import path from "path";

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html"
});

const config: webpack.Configuration = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
      rules: [
        {
         test: /\.(ts|tsx)$/,
         loader: "ts-loader",
         options: {
            compilerOptions: {
              "noEmit": false
            }
         },
         exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles SASS to CSS
          }]
        }
      ]
    },
    plugins: [htmlPlugin]
};

export default config;