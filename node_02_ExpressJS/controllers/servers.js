// ! Изолируем код в логики нашего колбека которй будем передавать в наши изолированные маршруты:

//! В иделе данные прилетали бы нам через модель из нашей базы данных
// ! Ну или из просто файла на диске
let servers = [
    { id: '1', name: 'AWS', status: 'working' },
    { id: '2', name: 'Google Cloud', status: 'working' },
    { id: '3', name: 'Yandex Cloud', status: 'working' },
    { id: '4', name: 'Microsoft', status: 'working' },
];

export const getAll = (req, res) => {
    res.status(200).json(servers);
};

export const create = (req, res) => {
    // Пока сервер не перезагрузится данные будут сохраняться в массиве servers
    // servers.push({ userData: req.body.text });
    // res.status(201).json(req.body);

    const newServer = {
        id: Date.now().toString(),
        ...req.body,
    }; // Оказывается мы можем и массивы и чистые объекты так диструктурировать [...[]], {...{}}

    servers.push(newServer);
    res.status(201).json(newServer);
};

export const remove = (req, res) => {
    console.log('ID', req.params.myId); // посмотрим значение придуманного нами динамического параметра myId
    let id = req.params.myId;

    for (let i = 0; i < servers.length; i++) {
        if (servers[i].id === id) {
            servers.splice(i, 1);
        }
    }

    res.json({ message: 'Данные были успешно удалины с сервера' });
};

// TODO Реализовать вместо базы txt файл для хранения данных вместо servers
// TODO Создать новый файл с маршрутами в данной директории и новый контроллер с подобным функционалом для pug_page2 НО изменять динамически данные через шаблонизатор PUG а не чисто через JS файл (то есть данные на странице динамически сформируем на стороне сервера а не клиента)
// TODO подключить базу данных могго или реляционную
// TODO Начать разработку приложения с переносом фронта на бэк.
