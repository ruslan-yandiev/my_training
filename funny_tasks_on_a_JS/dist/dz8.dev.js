"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
Функция принимает массив, реализовать функцию так, чтобы она возвращала сумму чисел
под главной диаганалью матрицы.
*/
function calculate(arr) {
  var sum = 0;

  for (var i = 1; i < arr.length; i++) {
    for (var j = 0; j < i; j++) {
      sum += arr[i][j];
    }
  }

  return sum;
}

var arr = [[5, 9, -1], [1, 7, 2], [6, 4, 14]];
console.log(calculate(arr)); // 1 + 6 + 4 = 11

var arr2 = [[5, 73, 9, 81, -6], [1, 8, 22, 18, -66], [57, 7, -19, 8, 0], [2, -7, 54, 1, 33], [6, 21, 38, -4, 11]];
console.log(calculate(arr2)); // 1 + 57 + 7 + 2 + -7 + 54 + 6 + 21 + 38 + -4 = 175
// * ==========================================================================

/*
Функция принимает строку, возвращает true, если строка содержит только буквы и цифры,
иначе false.
*/

function alphanumerica(string) {
  return string.includes('_') || !string || string.includes(' ') ? false : true;
}

console.log(alphanumerica('JavaScript')); // true

console.log(alphanumerica('hello_')); // false

console.log(alphanumerica('R0bOT')); // true

console.log(alphanumerica('    ')); // false

console.log(alphanumerica('')); // false
// * ==========================================================================
// ! с реального сабеса в крупную компанию

/*
Функция принимает массив банеров (объектов как в примере) и число, обозначающее количество банеров,
которое нужно выбрать из массива. Необходимо реализовать функцию так, чтобы функция выбирала переданное
количество случайных банеров (банеры уникальны, не должны повторяться в результате), учитывая их вес
(свойство weight в объектах банеров). Чем больший вес имеет банер, тем больше шансов того, что этот банер
должен быть выбран.
Если массив банеров содержит меньше или столько же элементов, сколькко было запрошено, то функция должна
вернуть все элементы массива.
*/

function selectBanners(banners, count) {
  if (count >= banners.length) return _toConsumableArray(banners);
  var bannersWeight = [];
  var allSumWeight = banners.reduce(function (accum, banner) {
    bannersWeight.push(accum + banner.weight);
    return accum + banner.weight;
  }, 0); // можем задать чему будет равень изначально accum, иначе он будет равен первому элементу и сложется со вторым

  var arr = new Set();

  var _loop = function _loop() {
    var rand = Math.random() * allSumWeight;
    var findind = banners.findIndex(function (item, index) {
      return bannersWeight[index] >= rand;
    });
    arr.add(banners[findind]);
  };

  while (arr.size < count) {
    _loop();
  }

  return _toConsumableArray(arr);
} // const banners = [
//     { id: 2, weight: 10 },
//     { id: 4, weight: 5 },
//     { id: 8, weight: 15 },
//     { id: 22, weight: 18 },
//     { id: 41, weight: 41 },
//     { id: 53, weight: 1 },
//     { id: 69, weight: 9 },
// ];
// console.log(selectBanners(banners, 3));


console.log(selectBanners([{
  id: 1,
  weight: 1
}, {
  id: 2,
  weight: 1000
}, {
  id: 3,
  weight: 1000
}, {
  id: 4,
  weight: 1000
}], 2)); // * Мой вариант

function selectBanners2(banners, count) {
  if (count >= banners.length) return _toConsumableArray(banners);
  var arrResulte = [];
  var maxWeight = 0;
  var rand;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = banners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var obj = _step.value;

      if (obj.weight > maxWeight) {
        maxWeight = obj.weight;
      }
    } // Случайное целое число в диапазоне от 0 включительно и до максимального указанного числа включительно.

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  rand = Math.floor(Math.random() * (maxWeight + 1));

  for (var i = 0; i < banners.length; i++) {
    if (banners[i].weight >= rand) {
      arrResulte.push(banners[i]);
      banners.splice(banners[i], 1);
      i--;
    }
  }

  if (arrResulte.length < count) {
    selectBanners2(banners, count).forEach(function (elem) {
      if (!arrResulte.find(function (e) {
        return e.id === elem.id;
      })) {
        arrResulte.push(elem);
      }
    });
  }

  while (arrResulte.length > count) {
    // рандомное значение индекса
    rand = Math.floor(Math.random() * (arrResulte.length + 1));
    arrResulte.splice(rand, 1);
  }

  return arrResulte;
} // const banners = [
//     { id: 2, weight: 10 },
//     { id: 4, weight: 5 },
//     { id: 8, weight: 15 },
//     { id: 22, weight: 18 },
//     { id: 41, weight: 41 },
//     { id: 53, weight: 1 },
//     { id: 69, weight: 9 },
// ];
// console.log(selectBanners2(banners, 4));


console.log(selectBanners2([{
  id: 1,
  weight: 1
}, {
  id: 2,
  weight: 1000
}, {
  id: 3,
  weight: 1000
}, {
  id: 4,
  weight: 1000
}], 2));