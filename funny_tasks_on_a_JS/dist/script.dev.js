"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
Результатом декоратора debounce(f, ms) должна быть обёртка, 
которая передаёт вызов f не более одного раза в ms миллисекунд. 
Другими словами, когда мы вызываем debounce, 
это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.

На практике debounce полезен для функций, которые получают/обновляют данные, 
и мы знаем, что повторный вызов в течение короткого промежутка времени не даст ничего нового. 
Так что лучше не тратить на него ресурсы.
*/
// function debounce(f, ms) {
//   let detect = true;
//   return function (arg) {
//     if (detect) {
//       f(arg);
//       detect = false;
//     }
//     setTimeout(() => (detect = true), ms);
//   };
// }
// let f = debounce(console.log, 1000);
// f(1); // выполняется немедленно
// f(2); // проигнорирован
// setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout(() => f(4), 1100); // выполняется
// setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
// setTimeout(() => f(6), 2300); // выполняется
var myObj = {
  level: function level() {
    return console.log('level 1');
  },
  hi: console.log('Hi 1'),
  obj2: {
    level: function level() {
      return console.log('level 2');
    },
    hi2: console.log('Hi 2'),
    'obj2-1': {
      level: function level() {
        return console.log('level 2-1');
      },
      'hi2-1': console.log('Hi 2-1')
    },
    'obj2-2': {
      level: function level() {
        return console.log('level 2-2');
      },
      hi22: console.log('Hi 2-2')
    }
  }
}; // console.log(myObj.obj2['obj2-2'].level());

function copy(obj) {
  var result = {};

  for (var key in obj) {
    if (_typeof(obj[key]) === 'object' && !Array.isArray(obj[key])) {
      result[key] = copy(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}

console.log(myObj.obj2 === copy(myObj).obj2); // ! глубокое копирование объекта (функции тоже копирует как совершенно новые)

console.log(myObj.level === JSON.parse(JSON.stringify(myObj)).level);