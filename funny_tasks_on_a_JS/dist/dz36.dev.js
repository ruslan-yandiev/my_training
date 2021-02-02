"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Что будет в консоли?
var promise = new Promise(function (res, rej) {
  res(promise);
});
console.log(promise); //<fulfilled>: undefined будет в промисе, а при let выбросит ошибку
// Назвать четко состояние промиса в console.log

var promise3 = new Promise(function (res, rej) {
  setTimeout(function () {
    return res(promise3);
  }, 1000);
});
console.log(promise3); // состояние pending
// ! Промисы выполняются после каждого таска(после каждой задачи, каждого кода) причем все до конца, а уже всякие setTimeout евентлуп тягает по одному за каждый проход
// ! при сравнении разных типов JS приводит все к числам

console.log([] == ''); // true (при нестрогом будет сравнивать только по значению, а там везде пусто 0 == 0)

console.log(Boolean([]) == Boolean("")); // false (true == false) тут мы принудительн опривели к буливому
// * ==============================================================================================

/*
Доминантные элементы массива.
Доминантным является элемент массива, который больше, чем все элементы, 
следующих за ним. 
Напишите функцию, которая принимает массив чисел и возвращает массив из 
доминантных чисел.
*/

function solve(arr) {
  var result = [];

  function find(num, index) {
    if (num > Math.max.apply(Math, _toConsumableArray(arr.slice(index + 1)))) result.push(num);
    return index === arr.length - 1 ? result : find(arr[index + 1], index + 1);
  }

  return find(arr[0], 0);
}

console.log(solve([16, 17, 14, 3, 14, 5, 2])); // [17, 14, 5, 2]

console.log(solve([92, 52, 93, 31, 89, 87, 77, 105])); // [105]

console.log(solve([75, 47, 42, 56, 13, 55])); // [75, 56, 55]

console.log(solve([67, 54, 27, 85, 66, 88, 31, 24, 49])); // [88, 49]

function solve2(arr) {
  var result = [];

  function find(num, index) {
    var detect = false;

    for (var i = index + 1; i < arr.length; i++) {
      if (num <= arr[i]) detect = true;
    }

    if (!detect) result.push(num);
    return index === arr.length - 1 ? result : find(arr[index + 1], index + 1);
  }

  return find(arr[0], 0);
}

console.log(solve2([16, 17, 14, 3, 14, 5, 2])); // [17, 14, 5, 2]

console.log(solve2([92, 52, 93, 31, 89, 87, 77, 105])); // [105]

console.log(solve2([75, 47, 42, 56, 13, 55])); // [75, 56, 55]

console.log(solve2([67, 54, 27, 85, 66, 88, 31, 24, 49])); // [88, 49]

function solve3(arr) {
  return arr.reduce(function (acc, num, index) {
    if (num > Math.max.apply(Math, _toConsumableArray(arr.slice(index + 1)))) acc.push(num);
    return acc;
  }, []);
}

console.log(solve3([16, 17, 14, 3, 14, 5, 2])); // [17, 14, 5, 2]

console.log(solve3([92, 52, 93, 31, 89, 87, 77, 105])); // [105]

console.log(solve3([75, 47, 42, 56, 13, 55])); // [75, 56, 55]

console.log(solve3([67, 54, 27, 85, 66, 88, 31, 24, 49])); // [88, 49]

function solve4(arr) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > Math.max.apply(Math, _toConsumableArray(arr.slice(i + 1)))) result.push(arr[i]);
  }

  return result;
}

console.log(solve4([16, 17, 14, 3, 14, 5, 2])); // [17, 14, 5, 2]

console.log(solve4([92, 52, 93, 31, 89, 87, 77, 105])); // [105]

console.log(solve4([75, 47, 42, 56, 13, 55])); // [75, 56, 55]

console.log(solve4([67, 54, 27, 85, 66, 88, 31, 24, 49])); // [88, 49]
// * ===========================================================================================

function intersect(arr) {
  if (arr.length === 0) return arr;
  var arr2 = [];

  for (var i = 0; i < arr.length; i++) {
    arr2.push(arr[i].split('-'));
  }

  function find(elem, index) {
    for (var _i = index + 1; _i < arr2.length; _i++) {
      if (+elem[1] < +arr2[_i][1] && +elem[1] >= +arr2[_i][0]) {
        elem[1] = arr2[_i][1];
        if (+elem[0] > +arr2[_i][0]) elem[0] = arr2[_i][0];
        arr2.splice(_i, 1);
        _i--;
      }
    }

    return index === arr2.length - 1 ? arr2 : find(arr2[index + 1], index + 1);
  }

  return find(arr2[0], 0).reduce(function (acc, elem) {
    acc.push(elem.join('-'));
    return acc;
  }, []);
}

console.log(intersect(['1-5', '7-9', '2-6'])); // ['1-6', '7-9']

console.log(intersect(['2-4', '5-5', '5-15'])); // ['2-4', '5-15']

console.log(intersect([]));

function intersect2(arr) {
  if (arr.length === 0) return arr;
  var arr2 = [];

  for (var i = 0; i < arr.length; i++) {
    arr2.push(arr[i].split('-'));
  }

  for (var _i2 = 0; _i2 < arr2.length; _i2++) {
    for (var j = _i2 + 1; j < arr2.length; j++) {
      if (+arr2[_i2][1] < +arr2[j][1] && +arr2[_i2][1] >= +arr2[j][0]) {
        arr2[_i2][1] = arr2[j][1];
        if (+arr2[_i2][0] > +arr2[j][0]) arr2[_i2][0] = arr2[j][0];
        arr2.splice(j, 1);
        j--;
      }
    }
  }

  return arr2.reduce(function (acc, elem) {
    acc.push(elem.join('-'));
    return acc;
  }, []);
}

console.log(intersect2(['1-5', '7-9', '2-6'])); // ['1-6', '7-9']

console.log(intersect2(['2-4', '5-5', '5-15'])); // ['2-4', '5-15']

console.log(intersect2([]));