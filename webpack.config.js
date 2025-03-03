const path = require("path"); // Подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Подключаем плагин html
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Подключаем плагин CleanWebpack
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключаем к проекту mini-css-extract-plugin

module.exports = {
  // Точка входа
  entry: {
    main: "./src/index.js",
  },

  // Точка выхода
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/", // Нужен для подключения изображений, шрифтов и других ресурсов во время разработки
  },

  mode: "development", // Добавили режим разработчика

  devServer: {
    static: path.resolve(__dirname, "./dist"), // Путь, куда "смотрит" режим разработчика
    compress: true, // Ускорит загрузку в режиме разработки
    port: 8080, // Порт, чтобы открывать сайт по адресу localhost:8080
    open: true, // Сайт будет открываться сам при запуске npm run start
  },

  module: {
    // Массив правил
    rules: [
      // Регулярное выражение, которое ищет все js файлы
      {
        test: /\.js$/,
        use: "babel-loader", // При обработке этих файлов нужно использовать babel-loader
        exclude: "/node_modules/", // Исключает папку node_modules, файлы в ней обрабатывать не нужно
      },

      // Регулярное выражение, которое ищет все файлы с картинками и шрифтами
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },

      // Регулярное выражение, которое ищет все CSS-файлы
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 }, // Значение 1 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader
          },
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Путь к файлу index.html
    }),

    new CleanWebpackPlugin(), // Плагин очистки папки dist перед каждой сборке

    new MiniCssExtractPlugin(), // Плагин для для объединения css-файлов
  ],
};
