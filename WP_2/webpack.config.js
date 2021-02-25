const path = require('path'); // подключим библиотеку для помощи в построении пути

// ! Наши плагины для webpack (добавляют удобную дополнительную функциональность или какие-то действия над файлами) предварительно установим их в package.json
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Создает в выходной директории файл в который уже встроены импорты наших скриптов
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Извлекает css в отдельные css файлы
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Очищает выходную директорию при каждом запуске вебпака
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // Позволяет посмотреть визуализированно из чего приложение состоит. Анализирует размер бандла
const CopyWebpackPlugin = require('copy-webpack-plugin'); // плагин позволяет переносить файлы и папки
const OpmizeCssAssetWebpackPligin = require('optimize-css-assets-webpack-plugin'); // нужен для оптимизации(сжатия) css
const TerserWebpackPlugin = require('terser-webpack-plugin');

// в линуксе, в консоле как вариант бозно задать значение системной переменной на пример: export NODE_ENV=development  Как вариант можно просто установить пакет npm i -D cross-env
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('IS DEV:', isDev); // выводит в баш консоль

// функция вернет объект настроек оптимизации в зовисимости в разработке или продпкшене мы щас находимся
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    };

    if (isProd) {
        config.minimizer = [new OpmizeCssAssetWebpackPligin(), new TerserWebpackPlugin()];
    }

    return config;
};

// TODO для удобства авто обновления браузера поставим пакет: npm i --save-dev webpack-dev-server
// TODO и в package.json добавим элиас с баш командой:"start": "webpack-dev-server --config webpack.config.js --open"

// Функция для возврата шаблона для имени в зовисимости от режима разработки или продакшена
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

// Функция возвращает массив плагинов в зовисимости от режима разработки или продакшена
const plugins = () => {
    const basePlugins = [
        // new BundleAnalyzerPlugin(), // пока закоментируем чтобы не мешал
        new HtmlWebpackPlugin({
            // укажим путь где у нас лежит наш html
            template: './html/index.html',

            // позволит подключить js именно вконец "body", по дефолту подключит в 'head'
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            filename: 'new-index2.html',
            template: './html/new-index2.html',
            // inject: 'body',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            //  [name] - подставит имя из объекта переданного в entry: {.....}
            filename: `styles/${filename('css')}`,
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: path.resolve(__dirname, './src/assets'), to: path.resolve(__dirname, 'dist') }],
        }),
    ];

    // ! условие для добавления плагина если сборка в режиме Продакшн
    // if (isProd) {
    //     basePlugins.push();
    // }

    return basePlugins;
};

// По умолчанию webpack использует Нодовский модуль.
module.exports = {
    //  облегчим задачу для вебпака прямо указав контекст папки от которой ему нужно отталкиваться (обсолютный путь)
    context: path.resolve(__dirname, 'src'),

    //  свойство (mode) позволит установить в каком режиме мы хотим работать (production(будет сжимать собранный файлы) или development(не будет сжимать файлы))
    mode: 'development',

    // ! Точки входа в нашe приложениe
    // entry: './src/index.js',
    entry: {
        //  можем теперь не указыватв пути имя папки src так как мы установили context: 'src'
        // '@babel/polyfill' - полифил для обработки баблом асинхронного кода
        main: ['@babel/polyfill', './javascript/index.js'],
        analytics: './javascript/analytics.js',
        testing_bable_code: './javascript/testing_bable.js',
    },

    // Для исключения как вариант дублирования кода, например если одна и таже библиотека подключена в разных файлах
    optimization: optimization(),

    // исключительно для режима разработки (development), для отлаживания кода в браузере. Создаст набор исходных карт js и css(scss) файлов (можно убрать закомитив)
    // карты удобны для нас так как в браузере мы сможем точно показать место в непревращенном исходном коде и в каком именно файле произогла ошибка, или просто посмотреть код
    devtool: isDev ? 'source-map' : false,

    //  Свойство (output) сконфигурирует то, куда будет выводиться результат нашей сборки и в каком виде.
    output: {
        //  [hash] позволит перед именем файла поставить зашифрованный хэшь определенный от содержимого файла. это нам дает то, что если мы поменяли хоть один символ
        //  в нашем исходном файле то у нас значение [hash] - хэша в имени файла поменяется и тогда у нас кэш браузера не сработает для этого файла. И браузер гарантированно будет обновлять содержимое
        //  [name] - подставит имя из объекта переданного в entry: {.....}
        filename: filename('js'),

        //  использовать нужно только обсолютный путь. сократим код использовав для построения обсолютного пути библиотеку path
        //  __dirname - элиас показывающий текущию директорию где мы надодимся
        //  'dist' - папка куда мы будем выводить наш результат (сборку)
        path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        //  говорим webpack какие расширения понимать по умолчанию. То есть можно импортировать файлы без указания расширения если оно указано в дефолте
        extensions: ['.js', '.json'],

        // можем создавать элиасы с путями до нужных нам директорий, очень удобно
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@img': path.resolve(__dirname, 'src/assets/img'),
        },
    },

    //  настроим наш webpack-dev-server (нужен нам для автоматического обновления браузера)
    devServer: {
        historyApiFallback: true,

        // путь к нашим обработаным файлам
        contentBase: path.resolve(__dirname, 'dist'),

        // автоматом открывать браузер или  нет
        open: true,

        // // если isDev === true то будет изменять стили без перезагрузки страницы
        // hot: isDev,

        // сжатие
        compress: true,

        // номер порта коорый использовать
        port: 3000,
    },

    //  Свойство (module)-(loader) специальная настройка которая добавляет поддержку работы с разными типами файлов
    module: {
        //  набор правил содержащее в себе объекты
        rules: [
            {
                test: /\.m?js$/,

                //  exclude говорит, что не нужно транспилировать node_modules
                exclude: /node_modules/,

                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },

            {
                //  укажим регулярку на которое проверяется имя файла (как пример проверим, что имя файла заканчивается на css)
                //  если это так то начнет их понимать и перейдет к следующему (к use)
                test: /\.css$/,

                //  Укажим массив ЛОАУДЕРОВ(преобразователей) которые будут применяться
                //  если верхнее правило успешно то применить последовательно указанные в массиве преобразователи (лоудеры)
                //  и позволит использовать его в виде импорта в наш js файл. пример импорта в ключевой js файл: import './style.css';
                // css-loader - умеет обращаться с css. style-loader - импортирует наши стили в js. Если захотим css в отдельный файл то заменим style-loader на MiniCssExtractPlugin.loader из нашего подключенного плагина
                //  лоудеры(преобразователи) применяются из массива справа на лево!!! (css-loader затем style-loader)
                //  Незабуть СНАЧАЛА установить лоудеры(преобразователи) в бандл(package.json), если используем npm: npm i --save-dev style-loader и npm i --save-dev css-loader Ну или добавит вручную в файл package.json и прописать в консоли npm install
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //     // для возможности обновления стилей без перезагрузки страницы браузера isDev === true
                        //     hmr: isDev,
                        //     reloadAll: true,
                        // },
                    },
                    'css-loader',
                ],
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            //  позволит нам устанавливать правильный путь и возможность подключать картинки через css
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            },
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },

            //  добавим лоудер распознавание и обработку файлов
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: ['file-loader'],
            },

            {
                test: /\.(woff|woff2|ttf|eot)$/,
                use: ['file-loader'],
            },
        ],
    },

    //  Добавим подключенные плагины
    plugins: plugins(),
};

// TODO npm run webpack запуск webpack (npm run - стандартная команда ЭЛИАС или прямо баш команду)

// ! webpack сначала проходится по нашим импортам в основном файле точки входа entry: './src/index.js', заем прогоняет файлы через наши правила и смотрит, что подходит
// ! если правило подходит, то тогда прогоняет файл через соответствующие ЛОУДЕРЫ и так проходит по всему дереву импортов и импортов в импортах и тп.

// ! webpack раньше точно плохо работал с цыкличными зовисимостями (это когда первый модуль зовисит от второго, а второй от первого или может быть через длинную цепочку но цикл замкнется от предпоследнего к первому)
