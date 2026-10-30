const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 1. Імпортуємо плагін

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.ts',
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'inline-source-map',

    // Налаштування сервера розробки
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,          // Порт, на якому підніметься сервер (http://localhost:3000)
      open: true,          // Автоматично відкривати браузер при запуску
      hot: true,           // Вмикає Hot Module Replacement (оновлення без перезавантаження)
      historyApiFallback: true, // Потрібно для single-page apps (SPA) з маршрутизацією
    },

    module: {
      rules: [
        // 1. TypeScript
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        // 2. CSS / SCSS
        // {
        //   test: /\.s?[ac]ss$/i,
        //    // Відокремлюємо CSS у файли в production, або вбудовуємо в JS в development
        //   use: [
        //     isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
        //     'css-loader',
        //     'sass-loader',
        //   ],
        // },
        // css-loader — зчитує вміст файлу style.css та перетворює його на JS-модуль.
        // style-loader — бере цей CSS і автоматично вставляє його в тег <style> всередині вашої HTML-сторінки під час запуску.
        // правило (rule) для роботи з .css файлами у секцію module.rules:
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          // // Важливо: порядок має бути саме такий! Webpack читає їх справа наліво.

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

    stats: {
      children: true,      // Tells webpack to show child compilation details
      errorDetails: true,  // Tells webpack to show the full error stack traces
    }
  };
};
