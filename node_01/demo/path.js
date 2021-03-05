const path = require('path'); // стандартная бибилиотека ноды, но все равно подключим

console.log('Название файла:', path.basename(__filename));

console.log('Имя директории:', path.dirname(__filename));

console.log('Расширение файла:', path.extname(__filename));

console.log('Parse:', path.parse(__filename).name);

console.log('Соединение директории:', path.join(__dirname, 'server', 'index.html'));
