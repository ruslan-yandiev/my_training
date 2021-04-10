"use strict";

/*
Бэкенд еще не готов и вам необходимо написать генератор установочных
данных лиц (Фамилия, Имя, Отчество, Дата рожденья).
Возраст лиц должен быть от 18 до 50 лет.
В ходе разработки понадобится две функции.
1. getRandomPers()  - должна вернуть объект с установочными данными
одного лица, пол лица так же выбирается случайно.
2. getNRandomPers(n) - должна вернуть объект из N случайно
сгенерированных лиц в следующем виде {count : n, pers : [....]}
*/
var ManIM = ['Андрей', 'Борис', 'Егор', 'Валерий', 'Петр'];
var WomanIM = ['Алла', 'Виктория', 'Татьяна', 'Марина', 'Яна'];
var ManFM = ['Князев', 'Самойлов', 'Кипелов', 'Васильев', 'Шевчук'];
var WomanFM = ['Звягинцева', 'Волкова', 'Гусева', 'Наливкина', 'Дроздова'];
var ManOT = ['Анатольевич', 'Иванович', 'Петрович', 'Григорьевич', 'Дмитриевич'];
var WomanOT = ['Анатольевна', 'Ивановна', 'Петровна', 'Григорьевна', 'Дмитриевна'];

function getRandomPers() {
  var M = [ManFM, ManIM, ManOT];
  var W = [WomanFM, WomanIM, WomanOT]; // Случайное целое число в диапазоне, включая минимальное и максимальное.

  var rand = function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function randomDate(date1, date2) {
    var d = new Date();
    var year50 = d.setFullYear(d.getFullYear() - 50);
    d = new Date();
    var year18 = d.setFullYear(d.getFullYear() - 18);
    return new Date(rand(year50, year18)).toLocaleDateString('ru');
  }

  function createPers(num) {
    var marker = ['FM', 'IM', 'OT'];
    var arr = num === 0 ? M : W;
    var obj = arr.reduce(function (obj, el, i) {
      obj[marker[i]] = el[rand(0, el.length - 1)];
      return obj;
    }, {});
    obj.DR = randomDate();
    return obj;
  }

  return createPers(rand(0, 1));
}

function getNRandomPers(n) {
  var obj = {
    count: n
  };
  var arr = [];

  for (var i = 0; i < n; i++) {
    arr.push(getRandomPers());
  }

  obj.pers = arr;
  return obj;
} // {FM : 'ИВАНОВ', IM : 'ИВАН', OT: 'ИВАНОВИЧ', DR: '21.05.1985'}


console.log(getRandomPers()); // {count : n, pers : [pers1, pers2, ..., persN]}

console.log(getNRandomPers(5));