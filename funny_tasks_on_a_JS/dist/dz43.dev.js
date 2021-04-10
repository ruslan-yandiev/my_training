"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ", ", \u0432\u043E\u0437\u0440\u0430\u0441\u0442: ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/*
Необходимо реализовать printUser так, чтоб код ниже работал и выводил верный результат.
Код ниже менять нельзя.
*/
var printer = printUser(_templateObject(), 'fullName', 'age'); // Доделать

function printUser() {
  for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }

  return function (obj) {
    return "".concat(arr[0][0], " ").concat(obj.name, " ").concat(obj.surname).concat(arr[0][1], " ").concat(obj.age, " \u0433\u043E\u0434");
  };
}

var user1 = {
  name: 'Павел',
  surname: 'Тарасов',
  age: 31
}; // Пользователь Павел Тарасов, возраст: 31 год

console.log(printer(user1));
var user2 = {
  name: 'Антон',
  age: 20
}; // Пользователь Антон, возраст: 20 лет

console.log(printer(user2));
var user3 = {
  name: 'Иван',
  surname: 'Иванов',
  age: 44
}; // Пользователь Иван Иванов, возраст: 44 года

console.log(printer(user3));
/*
Прислал Purflix

На вход подается число value и n - количество знаков после запятой. 
Необходимо привести число к n знаков после запятой. 
Функция normalize должна возвращать строку.
*/

var normalize = function normalize(value, n) {
  return value.toFixed(n);
};

console.log(normalize(3.1415, 2)); // 3.14

console.log(normalize(0.5, 2)); // 0.50

console.log(normalize(2021, 0)); // 2021

console.log(normalize(0, 3)); // 0.000

console.log(normalize(1.1, 1)); // 1.1