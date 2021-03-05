// позволит полуать инфу по нашей ОС
const os = require('os');

console.log('Операционная система:', os.platform());
console.log('Архитектура процессора:', os.arch());
console.log('Инфа по процессорам:', os.cpus());
console.log('Свободная память:', os.freemem());
console.log('Всего память:', os.totalmem());
console.log('Домашняя дриректория:', os.homedir());
console.log('Система включена в сek:', os.uptime());
