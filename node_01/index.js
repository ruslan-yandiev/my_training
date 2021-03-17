// const chalk = require('chalk');
// const myText = require('./data.js');
// console.log(chalk.blue(myText));
// ! console.log(__dirname); //Переменная с именем текущей директори
// ! console.log(__filename); // Переменная с именем нашего файла с послным путем
// ======================================================

// Специальный модуль для создания веб сервера http https можем также
const http = require('http');
const path = require('path'); // для работы с путями
const fs = require('fs'); // для работы с файлами

// теперь создадим сервер
const server = http.createServer((request, response) => {
    // // ! Можем передавать статусы ответа и прочие парметры заголовков
    // // response.writeHead(200, {
    // //     'Content-Type': 'text/html',
    // // });
    // // ! request.url показывает url пути(адреса) в зависимости на какую страницу мы делаем запрос
    // // console.log(request.url);
    // // ! зададим маршруты роутинги в зависимости на какой адрес сделан запрос (request)
    // // ! мы сказали если url адрес запроса (request) будет '/' то прочитать данные из файла по адреск (имя текущей директории с обсолютным путем, + папка, + название файлв ) далее колбек с обработкой ошибки и возратом данных
    // // ! а path.join приведет путь к строке (а еще path.resolve(__dirname, 'public') также может построить нам обсолютный путь с учетом текущей директории)
    // // * пока обработка идет get запросо
    // if (request.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
    //         if (err) throw err;
    //         response.writeHead(200, {
    //             'Content-Type': 'text/html',
    //         });
    //         response.end(data); // отдадим нашу html страницу теперь
    //     });
    //     // зададим второй марсшрут в зависимости от полученного запроса
    // } else if (request.url === '/contact') {
    //     // path.resolve второй способ построения абсолютного пути
    //     fs.readFile(path.resolve(__dirname, 'public/contact.html'), (err, data) => {
    //         if (err) throw err;
    //         response.writeHead(200, {
    //             'Content-Type': 'text/html',
    //         });
    //         response.end(data);
    //     });
    // } else {
    //     fs.readFile(path.resolve(__dirname, 'public/error.html'), (err, data) => {
    //         if (err) {
    //             response.writeHead(500);
    //             response.end('Error');
    //         } else {
    //             response.writeHead(200, { 'Content-Type': 'text/html' });
    //             response.end(data);
    //         }
    //     });
    // }
    // // ! Завершаем ответ с сервера
    // // ! помимо текста можем передавать html
    // // response.end('<h1>Hello Nodejs !!!</h1>');

    let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url);
    const ext = path.extname(filePath);
    let contentType = 'text/html';

    if (ext === '.css') {
        contentType = 'text/css';
    } else if (ext === '.js') {
        contentType = 'text/javascript';
    } else {
        contentType = 'text/html';
    }

    if (!ext) filePath += '.html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.resolve(__dirname, 'public/error.html'), (err, data) => {
                if (err) {
                    response.writeHead(500);
                    response.end('Error');
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data);
                }
            });
        } else {
            response.writeHead(200, { 'Content-Type': contentType });

            response.end(content);
        }
    });
});
// в случае если у нас есть системная переменная порт иначе поставить порт по умолчанию
// системную переменную можем задать вручную через консоль и запустим наш сервак: export PORT=4200 && node index  Для винды export заменим на set
// const PORT = process.env.PORT || 3000;
// (??) новый синтаксис в замен || так как в отличии от || работает корректно с 0 и '' не преобразуя их в логическое false
const PORT = process.env.PORT ?? 3000;

// ! запустим сервер на указанном порту (точнее будем его слушать по данному порту)
// ! теперь в браузере по адресу http://localhost:3000 мы увидим сообщение: Hello Nodejs или иное, что передадим в качестве ответа
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT} ...`);
});

/*
Чтобы постоянно не перезапускать сервер когда вносим изменения
установили npm пакет: npm install --save-dev nodemon
написали скрипт в  package.json:  "dev": "nodemon index.js" после чего запускаем не как node index.js а как npm run dev
 */
