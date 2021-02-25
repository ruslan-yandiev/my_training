const path = require('path'); // подключим библиотеку для помощи в построении пути

// ! Наши плагины для webpack (добавляют удобную дополнительную функциональность или какие-то действия над файлами) предварительно установим их в package.json
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Создает в выходной директории файл в который уже встроены импорты наших скриптов
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Извлекает css в отдельные css файлы
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Очищает выходную директорию при каждом запуске вебпака
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // Позволяет посмотреть визуализированно из чего приложение состоит. Анализирует размер бандла
const CopyWebpackPlugin = require('copy-webpack-plugin'); // плагин позволяет переносить файлы и папки

// TODO для удобства авто обновления браузера поставим пакет: npm i --save-dev webpack-dev-server
// TODO и в package.json добавим элиас с баш командой:"start": "webpack-dev-server --config webpack.config.js --open"

// По умолчанию webpack использует Нодовский модуль
module.exports = {
    // ! свойство (mode) позволит установить в каком режиме мы хотим работать (production(будет сжимать собранный файлы) или development(не будет сжимать файлы))
    mode: 'development',

    // ! одно из основных свойств (главныя точка входа в наше приложение)
    entry: './src/javascript/index.js',

    // ! влияет на то как будет выглядить содержание нашего выгружаемого собраного js файла (index_main.[hash].js)
    // ! исключительно для режима разработки (development), для отлаживания кода в браузере
    // devtool: "eval-source-map"

    // ! Свойство (output) сконфигурирует то, куда будет выводиться результат нашей сборки и в каком виде.
    output: {
        // ? [hash] позволит перед именем файла поставить зашифрованный хэшь определенный от содержимого файла. это нам дает то, что если мы поменяли хоть один символ
        // ? в нашем исходном файле то у нас значение [hash] - хэша в имени файла поменяется и тогда у нас кэш браузера не сработает для этого файла. И браузер гарантированно будет обновлять содержимое
        filename: 'javascript/index_main.[hash].js',

        //  использовать нужно только обсолютный путь. сократим код использовав для построения обсолютного пути библиотеку path
        // * __dirname - элиас показывающий текущию директорию где мы надодимся
        // * 'dist' - папка куда мы будем выводить наш результат (сборку)
        path: path.resolve(__dirname, 'dist'),
    },

    // ! настроим наш webpack-dev-server (нужен нам для автоматического обновления браузера)
    devServer: {
        historyApiFallback: true,

        // путь к нашим обработаным файлам
        contentBase: path.resolve(__dirname, 'dist'),

        // автоматом открывать браузер или  нет
        open: true,

        // сжатие
        compress: true,

        // номер порта коорый использовать
        port: 3000,
    },

    // ! Свойство (module)-(loader) специальная настройка которая добавляет поддержку работы с разными типами файлов
    module: {
        // * набор правил содержащее в себе объекты
        rules: [
            {
                test: /\.m?js$/,
                // ! exclude говорит, что не нужно транспилировать node_modules
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },

            {
                // * укажим регулярку на которое проверяется имя файла (как пример проверим, что имя файла заканчивается на css)
                // * если это так то начнет их понимать и перейдет к следующему (к use)
                test: /\.css$/,

                // * Укажим массив ЛОАУДЕРОВ(преобразователей) которые будут применяться
                // * если верхнее правило успешно то применить последовательно указанные в массиве преобразователи (лоудеры)
                // * и позволит использовать его в виде импорта в наш js файл. пример импорта в ключевой js файл: import './style.css';
                // css-loader - умеет обращаться с css. style-loader - импортирует наши стили в js. Если захотим css в отдельный файл то заменим style-loader на MiniCssExtractPlugin.loader из нашего подключенного плагина
                // ! лоудеры(преобразователи) применяются из массива справа на лево!!! (css-loader затем style-loader)
                // ! Незабуть СНАЧАЛА установить лоудеры(преобразователи) в бандл(package.json), если используем npm: npm i --save-dev style-loader и npm i --save-dev css-loader Ну или добавит вручную в файл package.json и прописать в консоли npm install
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // ! позволит нам устанавливать правильный путь и возможность подключать картинки через css
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            },
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },

            // * добавим лоудер распознавание и обработку файлов
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: ['file-loader'],
            },

            {
                test: /\.(?:|woff2)$/,
                use: ['file-loader'],
            },
        ],
    },

    // ! Добавим подключенные плагины
    plugins: [
        new HtmlWebpackPlugin({
            // укажим путь где у нас лежит наш html
            template: './src/html/index.html',
            title: 'Cats app',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/styles_main.[hash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'dist/assets') }],
        }),
        // new BundleAnalyzerPlugin(), // пока закоментируем чтобы не мешал
    ],
};

// TODO npm run webpack запуск webpack (npm run - стандартная команда ЭЛИАС или прямо баш команду)

// ! webpack сначала проходится по нашим импортам в основном файле точки входа entry: './src/index.js', заем прогоняет файлы через наши правила и смотрит, что подходит
// ! если правило подходит, то тогда прогоняет файл через соответствующие ЛОУДЕРЫ и так проходит по всему дереву импортов и импортов в импортах и тп.

// ! webpack раньше точно плохо работал с цыкличными зовисимостями (это когда первый модуль зовисит от второго, а второй от первого или может быть через длинную цепочку но цикл замкнется от предпоследнего к первому)
