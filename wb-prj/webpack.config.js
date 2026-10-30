const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 1. Імпортуємо плагін

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    return {
        entry: './src/index.ts',
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        // entry: './src/index.ts',
        // mode: 'development',
        // devtool: 'inline-source-map',
        // Налаштування сервера розробки
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 3000, // Порт, на якому підніметься сервер (http://localhost:3000)
            open: true, // Автоматично відкривати браузер при запуску
            hot: true, // Вмикає Hot Module Replacement (оновлення без перезавантаження)
            historyApiFallback: true, // Потрібно для single-page apps (SPA) з маршрутизацією
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s?[ac]ss$/i,
                    use: [
                        // Відокремлюємо CSS у файли в production, або вбудовуємо в JS в development
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },

                // 3. Зображення (Asset Modules)
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[hash][ext][query]',
                    },
                },
            ],
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            extensionAlias: {
                '.js': ['.ts', '.js'],
                '.mjs': ['.mts', '.mjs'],
            },
        },
        // Плагіни
        plugins: [
            // Створює HTML-файл (працює і в dev, і в prod режимах)
            new HtmlWebpackPlugin({
                template: './src/index.html', // Шлях до вашого власного шаблону
                title: 'TypeScript Webpack App', // Заголовок сторінки (якщо немає шаблону або через тег <%= htmlWebpackPlugin.options.title %>)
            }),
            // Винос CSS в окремі файли лише для production
            ...(isProduction ? [new MiniCssExtractPlugin({ filename: 'css/style.css' })] : []),
        ],

        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
    };
};
// module.export  = {
//   entry: "./src/index.html",
//   output: {
//     // the page loads a `<script type="module">`, so emit ES modules to match
//     module: true,
//   },
// };