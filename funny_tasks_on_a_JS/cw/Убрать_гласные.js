"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function disemvowel(str) {
  var arr = ['a', 'e', 'i', 'o', 'u', 'y'];

  var arrStr = _toConsumableArray(str);

  for (var i = 0; i < arrStr.length; i++) {
    if (arr.includes(arrStr[i].toLowerCase())) {
      arrStr.splice(i, 1);
      i--;
    }
  }

  return arrStr.join('');
}

console.log(disemvowel('This website is for losers LOL!')); // 'Ths wbst s fr lsrs LL!'
// =================================================