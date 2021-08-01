const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./ts/main.ts",
    output: {
        path: path.resolve(__dirname, './../dist/'),
        filename: "main.js"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                        loader: 'ts-loader',
                    }]
            },{
              test: /\.scss$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader' , 'sass-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '../dist/[name].css',
        }),
        // 創建實例 (第二步)
        new HtmlWebpackPlugin({
          // 配置 HTML 模板路徑與生成名稱 (第三步)
          template: './index.html',
          filename: './../dist/index.html',
        })
    ]
}