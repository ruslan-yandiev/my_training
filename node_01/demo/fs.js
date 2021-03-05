// File System
const fs = require('fs'); // стандартный модуль ноды. Позволяет работать с различными файлами
const path = require('path');

// // * создадим новую директорию
// fs.mkdir(path.join(__dirname, 'test'), (err) => {
//     if (err) throw err;

//     console.log('Папка создана');
// });

// создадим строковое предстваление нашего пути
const filePath = path.join(__dirname, 'test', 'text.txt');
// создадим наш файл. Будем использовать асинхронные функции
fs.writeFile(filePath, 'Hello Ruslan', (err) => {
    if (err) throw err;

    console.log('Файл создан');
});

// добавим текст к уже созданному файлу без перезатираня
fs.appendFile(filePath, '\nHello Ruslan 2', (err) => {
    if (err) throw err;

    console.log('Добавлена новая запись в файл');
});

// * считаем файл
// fs.readFile(filePath, (err, content) => {
//     if (err) throw err;

//     console.log('Текст из файла text.txt:\n', content.toString());
// });
// или
fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) throw err;

    console.log('Текст из файла text.txt:\n', content);
});
