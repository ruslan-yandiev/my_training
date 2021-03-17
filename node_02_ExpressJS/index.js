import express, { request } from 'express'; // установили через npm и заимпортили нашу библиотеку
import path from 'path'; // для работы с путями
import { requestTime, logger } from './middlewares.js'; //! Импортируем наши мидлверы

const __dirname = path.resolve(); // изза использования import при подключении express придеьтся так получить полный путь используя библиотеку path

const app = express(); // проинициализировали наше веб приложение

/* зададим номер порта в зависимости от среды запуска (разработка или продакшен)
const PORT = process.env.PORT || 3000;
системную переменную можем задать вручную через консоль и запустим наш сервак: export PORT=4200 && node index   Для винды export заменим на set
(??) новый синтаксис в замен || так как в отличии от || работает корректно с 0 и '' не преобразуя их в логическое false*/
const PORT = process.env.PORT ?? 3000;

/* 
! Oбработаем входящий get запрос по корневому адресу В БРАУЗЕРЕ а не локалый путь на ПК (REST API)
передадим в метод get путь по которому будет обрабатываться ГЕТ запрос и передадим
колбек принимающий в качестве параметров запрос и ответ
    app.get('/', (request, response) => {
        response.send('<h1>Hello Express</h1>');
    });
*/

/* реализуем встроенный мидлвер(функции) чемто похоже на rak интерфейсна Рубях ри построении сетевого приложения с нуля, сделав статичными все файлы в папке из которой мы ходим
теперь когда я буду делать ГЕТ запросы к index.html он будет брать файлы для загрузки из статик, что позволит нам сократить код 
Теперь можем убрать:
    app.get('/', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'static', 'index.html'));
    });

    app.get('/new_page', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'static', 'new_page.html'));
    });

    !При app.use(express.static(путь до папки) незабуть теперь в ссылка в html указвать путь с расширением new_page.html
    !так как теперь он уже будет искать не по url пути а по названию файла
    !Благодаря тому ,что мы стелали папку статичной нам теперь не обязательно прописывать путь и маршрут до каждого файла, express сам будет понимать кде и какой путь установить и использовать
    ! в последствии мы можем в статичную папку добавлять любые скрипты, картинки, стили и html, express будет их понимать 

*/
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(requestTime); //! Tак мы используем наш мидлвер, передав его без вызова и расширяем наш функционал request и response объектов
app.use(logger); // ! зарегесрируем в нашем приложении еще один созданный нами мидлвер

// ========================================================================================/
// ! научим наш express работать с json
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// ----------------------------------------------------------------------------------------/

// =======================================================================================/
/* Реализуем скачку по указанному маршруту в браузере страницы индекса */
app.get('/download', (request, response) => {
    console.log(request.requestTime); // В итоге выведим в баш консоль при скачке текущее время в секундах. Тем самым расширили наш объект request созданным нами мидлвером
    response.download(path.resolve(__dirname, 'static', 'index.html'));
});
// --------------------------------------------------------------------------------------/

// ================/ИЗ ПАПКИ DEMO/===============================/
// ! подключим через static наши css и JS так как наш html не index.html то ниже зададим путь к странице */
// app.use(express.static(path.resolve(__dirname, 'demo')));
// ! напишем прямую обработку (get-post-...) для файлов в папке demo, без использования route, express.Router() и без автоматической обработки указанных нами статичных файлов: app.use(express.static(path.resolve(__dirname, 'static')));
// app.get('/demo_index', (request, response) => {
// ! заголовок 'Content-Type': 'text/html' exprees определяет самостоятельно
// ! но вот в режиме разработки при такой задаче маршрута укажем заголовок браузеру не кэшировать данные ресурса: //! 'Cache-Control': 'no-cache, no-store, must-revalidate'
//     response.set({
//         'Content-Type': 'text/html',
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//     });
//     // response.redirect('/'); // можем перенаправить наш запрос постоянно и + можем указать статус res.redirect(301, '/go-there') 301 временное перенаправление, 302 постоянное
//     response.sendFile(path.resolve(__dirname, 'demo', 'demo_index.html'));
// });

app.use(
    express.static(path.resolve(__dirname, 'demo'), {
        dotfiles: 'ignore',
        etag: false,
        extensions: ['htm', 'html', 'js', 'css'],
        index: false,
        maxAge: '1d',
        redirect: false,
        setHeaders: function (response, path, stat) {
            response.set({
                'x-timestamp': Date.now(),
                // специально для разработки установим заголовок запрещающий браузеру кэшировать все файлы из нашего статик
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            });
        },
    }),
);
// ----------------/ИЗ ПАПКИ DEMO/------------------------------------------------/

/* запустили наш веб сервер на нужном нам порте и вторымпараметром можем передать callBack
для передачи функционала после запуска онного */
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});

/*
 * Добавили в package.json: "type": "module" чтобы была возможность работать с модулями в express
 * Установили пакет чтобы наша среда понимала с какими типами работает express:  npm install -D @types/express
 * Установим пакет npm install -D nodemon который позволит при изменении кода автоматом перезагружать наш сервер для применения новых изменений и добавим в package.json в раздел script наши элиасы для запуска баш команд: "start": "node index.js", "dev": "nodemon index.js" После чего будем запускать сервер через npm run "НАЗВАНИЕ ЭЛИАСА"
 * Установим пакет npm install colors для красивого отображения в когсоль данных, интересен для вывода лого

? console.log(__dirname); //Переменная с именем текущей директори
? console.log(__filename); // Переменная с именем нашего файла с послным путем
? path.resolve(__dirname, 'public/contact.html' способ построения абсолютного пути
? path.resolve(__dirname, 'static', 'index.html' способ построения абсолютного пути 2
*/
