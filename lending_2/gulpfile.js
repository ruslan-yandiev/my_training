// ! npm install --save-dev gulp gulp-sass browser-sync gulp-file-include del gulp-autoprefixer gulp-group-css-media-queries gulp-clean-css gulp-rename gulp-uglify-es
//(так мы сразу установим сам gulp и нужные плагины кнему в локальную директорию, главное, чтобы был ранее глобально установлен gulp -g)

const project_folder = 'dist';
const source_folder = '#src';

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
        html: [`${source_folder}/*.html`, `!${source_folder}/_header.html`],
        css: `${source_folder}/scss/style.scss`,
        js: `${source_folder}/js/script.js`,
        img: `${source_folder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
        fonts: `${source_folder}/fonts/*.ttf`,
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

const { src, dest } = require('gulp'),
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
    uglify = require('gulp-uglify-es').default;

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
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());

    // 1. передадим импортированной функции из галпа в значение аргумента путь до html исходников
    // 2. собираем (инклудим) файлы из вышеуказанного пути исходников
    // 3. перебрасываем файлы из исходников в папку назначения
    // 4. обновим страницу браузера, застримим
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

// Функция для отслеживания файлов в реальном времени, позволит слушать и применять все изменения на лету
function watchFiles(params) {
    // фактически навешиваем обработчик событий ноды, но через gulp на указанные пути, вкачестве обработчика выступают созданные нами ранее функции
    gulp.watch([path.watch.html], html);

    gulp.watch([path.watch.css], css);

    gulp.watch([path.watch.js], js);
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
const build = gulp.series(clean, gulp.parallel(js, css, html));

// как я понял позволяет паралельно запускать процессы
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.js = js;
exports.scss = scss;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
