import express, { request } from 'express'; // установили через npm и заимпортили нашу библиотеку
import path from 'path'; // для работы с путями
import fs from 'fs'; // для работы с файлами

import serverRoutes from './routes/servers.js'; // импортируем изолированные маршруты в наше приложение

// const cors = require('cors');
// import cors from 'cors'; // Для отключения CORS в Node.js воспользуемся библиотекой cors (npm install cors)
import { requestTime, logger } from './middlewares.js'; //! Импортируем наши мидлверы

const __dirname = path.resolve(); // изза использования import при подключении express придеьтся так получить полный путь используя библиотеку path

const app = express(); // проинициализировали наше веб приложение

/* зададим номер порта в зависимости от среды запуска (разработка или продакшен)
const PORT = process.env.PORT || 3000;
системную переменную можем задать вручную через консоль и запустим наш сервак: export PORT=4200 && node index   Для винды export заменим на set
(??) новый синтаксис в замен || так как в отличии от || работает корректно с 0 и '' не преобразуя их в логическое false*/
const PORT = process.env.PORT ?? 3000;

// app.use(cors()); // активируем в нашем приложении отключение cors()
// ========================================================================================/
app.use(express.json()); // ! научим наш express работать с json и распаршивать json в обычный объект для всех входящих json запросов
app.use(express.urlencoded({ extended: false })); // ! научим наш express работать с данными полученными через POST запрос
// ----------------------------------------------------------------------------------------/

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
app.use(serverRoutes); //! добавим к приложению наши изолированные маршруты. serverRouters по сути является нашим мидлвером и мы его зарегистрируем в нашем приложении
app.use('/app/javascript', express.static(path.resolve(__dirname, 'javascript')));
app.use('/app/styles', express.static(path.resolve(__dirname, 'styles')));

// =======================================================================================/
/* Реализуем скачку по указанному маршруту в браузере страницы индекса */
app.get('/download', (request, response) => {
    console.log(request.requestTime); // В итоге выведим в баш консоль при скачке текущее время в секундах. Тем самым расширили наш объект request созданным нами мидлвером
    response.download(path.resolve(__dirname, 'static', 'index.html'));
});
// --------------------------------------------------------------------------------------/

app.post('/', (request, response) => {
    if (!request.body) return response.sendStatus(400);

    // Мы можем отправить объект и с помощью стандартного метода response.send(request.body).
    // В реальности метод response.json() устанавливает для заголовка Content-Type значение application/json, серилизует данные в json с помощью функции JSON.stringify() и затем отправляет данные с помощью response.send().
    response.json(request.body);
});

//? ================/ИЗ ПАПКИ DEMO/===============================/
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

// ! Указав необходимые настройки заголовков и файлов, в качестве маршрута будет использоваться корень и имя файлв /demo_index без учета имени директори где он находится
// app.use(
//     express.static(path.resolve(__dirname, 'demo'), {
//         dotfiles: 'ignore',
//         etag: false,
//         extensions: ['htm', 'html', 'js', 'css'],
//         index: false,
//         maxAge: '1d',
//         redirect: false,
//         setHeaders: function (response, path, stat) {
//             response.set({
//                 'x-timestamp': Date.now(),
//                 // специально для разработки установим заголовок запрещающий браузеру кэшировать все файлы из нашего статик
//                 'Cache-Control': 'no-cache, no-store, must-revalidate',
//             });
//         },
//     }),
// );

// ! можем создать не существующий url маршрут начинающийся для всез статичных файлов: /demo-route/file_name.html
app.use('/demo-route', express.static(path.resolve(__dirname, 'demo')));
app.use('/a', express.static(path.resolve(__dirname, 'a')));

// ! позволит построить цепочку из запросов (all, get, post, put, delete)
// ! заменить на '/demo-route/demo2' если мы создали для статики свой url маршрут
// app.route('/demo2').post(function (req, res, next) {
//     console.log('POST request to the homepage');

//     res.send('POST request to the homepage');
// });

// ! просто отдельное использование обработки одного запроса
// ! заменить на '/demo-route/demo2' если мы создали для статики свой url маршрут
// app.post('/demo2', (req, res) => {
//     console.log('POST request to the homepage 2');

//     res.send('POST request to the homepage 2');
// });

app.post('/demo-route/demo2', (request, response) => {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body); // в баш консоль
    let myData = `${request.body.userName} - ${request.body.userAge}\n`;

    // создадим если нет и запишем новые данные, а если есть то добавим без перезаписи
    fs.appendFile(path.resolve(__dirname, 'demo/demo.txt'), myData, (error) => {
        if (error) throw error;

        // ! синхронный вариант работы по считыванию файла
        // console.log('Запись файла завершена. Содержимое файла:');
        // let data = fs.readFileSync(path.resolve(__dirname, 'demo/demo.txt'), 'utf8'); // ! Считаем данные из файла синхронно
        // console.log(data); // выводим считанные данные из файла

        //! асинхронный вариант чтения файла. Выше указан синхронный вариант.
        fs.readFile(path.resolve(__dirname, 'demo/demo.txt'), (error, content) => {
            if (error) throw error;

            console.log('Запись файла завершена. Содержимое файла:');
            console.log(content.toString()); // выводим считанные данные из файла
        });
    });

    response.send(myData);
});

app.post('/demo-route/demo_index', (request, response) => {
    if (!request.body) return response.sendStatus(400);

    let myData = `${request.body.userName} - ${request.body.userAge}`;

    // response.send(`<h1>${myData}</h1>`);
    // response.sendFile(path.resolve(__dirname, 'a', 'rederect_demo_index.html')); // откроем без перехода на новый url файл html

    response.redirect('/a/rederect_demo_index.html'); // ! Если во вложенных  маршрутах с методами (get, post..) или redirect путь указать начиная без '/' то маршрут будет продлен и будет вложенный, а не строиться от корня приложения

    app.get('/a/rederect_demo', (req, res) => {
        console.log(myData, 'Событие');

        res.send(myData);
    });
});

//? ----------------/ИЗ ПАПКИ DEMO/------------------------------------------------/

//? ================/ИЗ ПАПКИ PUBLIC/===============================/
// app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/page', (request, response) => {
    // response.set({
    //     'Content-Type': 'text/html',
    //     'Cache-Control': 'no-cache, no-store, must-revalidate',
    // });

    // response.sendFile(path.resolve(__dirname, 'public', 'page.html'));

    // ! второй вариант передачи с момощью библиотеки (fs), не используя мидлвер express.static
    fs.readFile(path.resolve(__dirname, 'public', 'page.html'), (err, content) => {
        response.writeHead(200, { 'Content-Type': 'text/html' });

        response.end(content);
    });
});

//? ----------------/ИЗ ПАПКИ PUBLIC/------------------------------------------------/

//? ================/ИЗ ПАПКИ VIEVS (шаблонизаторы)/===============================/
app.set('view engine', 'pug'); // установим значение переменной 'view engine' с помощью сеттера, указав, что будм использовать шаблонизатор
console.log(app.get('view engine')); // выведим в консоль значение переменной с помощью геттера
console.log(app.get('views')); // полный путь автоматически установится к данному каталогу: /home/ruslan/Документы/thinknetica/my_training/node_02_ExpressJS/views
// app.set('views', path.resolve(__dirname, 'templates')); // Можем изменить папку с шаблонизаторами

app.get('/pug_page', function (req, res) {
    // полны путь path.resolve(__dirname, 'views', 'pug_page.pug') не обязательно так-как в автоматом будет искать полный путь во views: console.log(app.get('views'));
    // ! укажем название файла (можно без расширения)
    res.render('pug_page', { title: 'Hey Pug', message: 'Hello there!', emails: ['gavgav@mycorp.com', 'mioaw@mycorp.com'], serverData: [] });
});

//? ----------------/ИЗ ПАПКИ VIEVS (шаблонизаторы)/------------------------------------------------/

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
 * Установим пакет npm install pug --save

? console.log(__dirname); //Переменная с именем текущей директори
? console.log(__filename); // Переменная с именем нашего файла с послным путем
? path.resolve(__dirname, 'public/contact.html' способ построения абсолютного пути
? path.resolve(__dirname, 'static', 'index.html' способ построения абсолютного пути 2
*/
