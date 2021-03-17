"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
Дан массив строк arr.
Требуется написать функцию, которая принимает произвольную строку.
Функция должна проверить, существует ли как минимум два значения в
массиве, которые являются анаграммами к переданной в функцию строке,
если такие строки существуют, тогда функция должна вернуть первую
встретившуюся в массиве строку-анаграмму.
В случае если анаграмм в массиве менее 2, необходимо вернуть null.
*/
var arr = ['linkkk1', 'k1nkil', 'asfd', 'asd', 'dsa', '1nkil', 'asd', 'fhk', 'lfd', 'link', 'link1', 'linkk1'];

var getFirstAnagram = function getFirstAnagram(str) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    var detect = 0;

    for (var j = 0; j < str.length; j++) {
      if (arr[i].length === str.length && arr[i].includes(str[j])) {
        detect += 1;
      }
    }

    if (detect === str.length) result.push(arr[i]);
    if (result.length > 1) return result[0];
  }

  return null;
};

console.log(getFirstAnagram('asd')); // "asd"

console.log(getFirstAnagram('link')); // null

console.log(getFirstAnagram('link1')); // "1nkil"

console.log(getFirstAnagram('linkk1')); // "k1nkil"

console.log(getFirstAnagram('linkkk1')); // "null"

console.log('===================================');

var getFirstAnagram2 = function getFirstAnagram2(str) {
  var arr2 = arr.filter(function (el) {
    return el.length === str.length;
  });
  str = _toConsumableArray(str).sort().join('');
  var index = arr2.map(function (elem) {
    return _toConsumableArray(elem).sort().join('');
  }).reduce(function (acc, elem, index) {
    if (elem === str) {
      acc.push(index);
    }

    return acc;
  }, []);
  return index.length > 1 ? arr2[index[0]] : null;
};

console.log(getFirstAnagram2('asd')); // "asd"

console.log(getFirstAnagram2('link')); // null

console.log(getFirstAnagram2('link1')); // "1nkil"

console.log(getFirstAnagram2('linkk1')); // "k1nkil"

console.log(getFirstAnagram2('linkkk1')); // "null"

console.log('===================================');