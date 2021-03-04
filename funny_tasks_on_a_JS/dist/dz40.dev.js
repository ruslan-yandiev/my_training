"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Array.prototype.myReduce = function (callback) {
  var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[0];
  if (typeof callback !== 'function') throw new TypeError("".concat(callback, " is not a function"));
  if (typeof callback !== 'function') throw new Error("".concat(callback, " is not a function"));
  var startIndex = initialValue === this[0] ? 1 : 0;

  for (var i = startIndex, size = this.length; i < size; i++) {
    initialValue = callback(initialValue, this[i], i, this);
  }

  return initialValue;
};

console.log([1, 2, 3, 4, 5].myReduce(function (acc, elem, index, arr) {
  if (index % 2) {
    return acc + elem;
  }

  return acc;
}, 0)); // => 6

console.log([1, 2, 3, 4, 5].myReduce(function (acc, elem, index, arr) {
  if (index % 2) {
    acc.push(elem, arr[index + 1]);
  }

  return acc;
}, [])); // => [2, 3, 4, 5]

/*
Реализуйте функцию squareDigits, функция принимает число, 
вернуть функция должна также число, которое получается 
при конкатенировании возведенных в квадрат цифр переданного 
внутрь функции числа.
*/

var squareDigits = function squareDigits(num) {
  return _toConsumableArray(num.toString()).reduce(function (acc, elem) {
    return acc + Math.pow(+elem, 2);
  }, '');
};

console.log(squareDigits(9119)); // 9^2=81, 1^2=1 => 811181