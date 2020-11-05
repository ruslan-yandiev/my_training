// ! npm install --save-dev gulp gulp-sass browser-sync gulp-file-include del gulp-autoprefixer gulp-group-css-media-queries gulp-clean-css gulp-rename gulp-uglify-es gulp-imagemin gulp-webp gulp-webp-html gulp-webpcss gulp-svg-sprite
// ! Ну или просто скопировать pakage.json, gulpfile.js и папку #src и запустить команду npm i или npm install из текущей директории куда скопированы данные. (установит все разом)
//(так мы сразу установим сам gulp и нужные плагины кнему в локальную директорию, главное, чтобы был ранее глобально установлен gulp -g)

// * npm cache clean --force (очистака npm)
// * npm i npm -g (установка npm)
// ? для подключения к галпу babel для компиляции в ES5 для старых браузеров руководство https://www.npmjs.com/package/gulp-babel
// ? для подключения к галпу typescript https://www.npmjs.com/package/gulp-typescript
// ? для подключения к галпу html шаблонизатора pug https://www.npmjs.com/package/gulp-pug
// https://gulpjs.com/

// ==========================================================================================

// ! так мы папку с куда выгружается результат автоматически назовем именем то директории где находимся, вместо стандартного dist
const project_folder = require('path').basename(__dirname);
// const project_folder = 'dist';

const source_folder = '#src';
const fs = require('fs');

const path = {
    // пути вывода, куда gulp будет выгружать обработанные файлы
    build: {
        html: `${project_folder}/`,
        css: `${project_folder}/css/`,
        js: `${project_folder}/js/`,
        img: `${project_folder}/img/`,
        fonts: `${project_folder}/fonts/`,
    },

    // пути к исходникам, откуда gulp и будет собирать проект
    src: {
        // `!${source_folder}/_*.html` так мы исключили все html файлы начинающиеся с символа подчеркивания
        html: [`${source_folder}/*.html`, `!${source_folder}/_*.html`],
        css: `${source_folder}/scss/style.scss`,
        js: `${source_folder}/js/script.js`,
        img: `${source_folder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
        fonts: `${source_folder}/fonts/*.{ttf,svg,woff,woff2,eot}`,
    },

    // объект который будет прослушиваться нодой постоянно и динамически применять изменения на лету для отображения в браузере
    //? (**)означает, что все папки(директории) и под директории. (*.html) что все файлы с расширением html
    watch: {
        html: `${source_folder}/**/*.html`,
        css: `${source_folder}/scss/**/*.scss`,
        js: `${source_folder}/js/**/*.js`,
        img: `${source_folder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    },

    // Будет содержать путь к папке проекта, для удаления(очищения директории), при запуске gulp
    clean: `./${project_folder}/`,
};

const { src, dest } = require('gulp'), // ! src загрузка для обработки, dest выгрузка результата обработки
    gulp = require('gulp'),
    // запускает браузер в реальном времени
    browsersync = require('browser-sync').create(),
    // плагин собирает файлы. Фактически может выступать шаблонизатором и позволит использовать переменые
    fileinclude = require('gulp-file-include'),
    // плагин удаляет автоматически удаляет файлы
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    // плагин собирает разбросанные по нашему css файлу наши медиа запросы @media и групирует их и ставит в конец файла
    groupMedia = require('gulp-group-css-media-queries'),
    // плагин будет чистить и сжимать наш css файл на выходе
    cleanCss = require('gulp-clean-css'),
    // плагин для переименования файлов
    rename = require('gulp-rename'),
    // плагин для сжатия javascript файлов
    uglify = require('gulp-uglify-es').default,
    // плагин сжимает картинки без потери качества
    imagemin = require('gulp-imagemin'),
    // плагин для современного веб формата изображений webp
    webp = require('gulp-webp'),
    // плагин для облегчения подключения картинок разных форматов в html файл. Подключаем картинку одного формата и он автоматом дополнит код другим фрматом
    webpHTML = require('gulp-webp-html'),
    // Современный формат для стилей
    // ! если вдруг не находит модуль gulp-webpcss то прописываем в консоли (npm i webp-converter@2.2.3 -D)
    webpСss = require('gulp-webpcss'),
    // плагин позволяет спрайтить(соединять вместе картинки svg формата)
    svgSprite = require('gulp-svg-sprite');

function browserSync(params) {
    // настроим сервер для работы с браузером
    browsersync.init({
        server: {
            // путь откуда запускать файлы в браузере
            baseDir: `./${project_folder}/`,
        },
        port: 3000,
        notify: false,
    });
}

// Функция для обработки html gulp-om
function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webpHTML())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());

    // 1. передадим импортированной функции из галпа в значение аргумента путь до html исходников
    // 2. используем плагин для удобства подключения картинок разных форматов
    // 3. собираем (инклудим) файлы из вышеуказанного пути исходников
    // 4. перебрасываем файлы из исходников в папку назначения
    // 5. обновим страницу браузера, застримим
}

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70,
            }),
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3, // 0 to 7
            }),
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                // в настройке укажем, чтобы scss файл формировался не сжатым и полностью развернутым
                outputStyle: 'expanded',
            }),
        )
        .pipe(groupMedia())
        .pipe(
            autoprefixer({
                // overrideBrowserslist: ['last 5 varsions'],
                cascade: true,
            }),
        )
        .pipe(webpСss())
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(
            rename({
                extname: '.mini.css',
            }),
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.mini.js',
            }),
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function fonts() {
    return src(path.src.fonts).pipe(dest(path.build.fonts));
}

// сделаем отдельно функцию для спрайтов
// ! Для запуска функции необходимо в новом процессе(терминале) запустить команду gulp svgSprite
// ! Удобно так выделять задачи которые не требуют постоянного запуска
gulp.task('svgSprite', function () {
    return gulp
        .src([`${source_folder}/iconsprite/*.svg`])
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: '../icons/icons.svg', // sprite file name
                        //example: true // для быстрого просмотра результата
                    },
                },
            }),
        )
        .pipe(dest(path.build.img));
});

// Функция для отслеживания файлов в реальном времени, позволит слушать и применять все изменения на лету
function watchFiles(params) {
    // фактически навешиваем обработчик событий ноды, но через gulp на указанные пути, вкачестве обработчика выступают созданные нами ранее функции
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

// функция будет реализовывать улаление директории
// * Можно закомитить функцию, чтобы удалять вручную не всю дриректорию я выбранное вручную
function clean(params) {
    return del(path.clean);
}

// в series будет исполнять функции попорядку
// серия выполняемых функций, процесс и порядок выполнения.
// ! gulp.parallel(...) позволяет паралельно(одновременно) выполнять задачи
// * Можно убрать из исполнения clean чтобы удалять только вручную нужное
const build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));

// как я понял позволяет паралельно запускать процессы
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
