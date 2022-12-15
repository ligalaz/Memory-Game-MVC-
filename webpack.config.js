const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const EslintPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const baseConfig = {
    entry: path.resolve(__dirname, "./src/Game.ts"),
    mode: "development",
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: "ts-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/i,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "Game.js",
        path: path.resolve(__dirname, "./dist"),
        assetModuleFilename: "resources/logo/[name][ext]",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/game.html"),
            filename: "game.html",
            favicon: path.resolve(__dirname, "./src/resources/icons/favicons/game-favicon.png"),
        }),
        new CleanWebpackPlugin(),
        new EslintPlugin({ extensions: "ts" }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./src/resources/"),
                    to: path.resolve(__dirname, "./dist/resources/"),
                },
            ],
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === "prod";
    const envConfig = isProductionMode ? require("./webpack.prod.config") : require("./webpack.dev.config.js");

    return merge(baseConfig, envConfig);
};
