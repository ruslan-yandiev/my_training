"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Прислал Тимур Гутнов
Мы разрабатываем банкомат.
В банкомате купюры могут быть разного номинала, например - 50, 100,
500, 1000, 5000 руб.
Есть ограничение на количество каждой из купюр (объект limitsobjMap).
Нужно вернуть купюры и их количество, которыми можно выдать
запрашиваемую сумму, в виде строки указанного формата. Начинать с
самой крупной.
Если выдать запрашиваемую сумму не получается, выбросить ошибку.
*/
var getMoney = function getMoney(sum, limits) {
  var limits2 = _objectSpread({}, limits);

  var myLimit = 0; // с аккумулируем общую сумму денег в банкомате

  for (key in limits2) {
    myLimit += +key * limits2[key];
  } // проаерим на соответствие минимальной и максимальной возможных сумм


  if (sum > 49 && sum <= myLimit) {
    var arrKeys = Object.keys(limits2);
    var result = '';
    var objMap = new Map();
    var accum; // в обратном порядке пройдемся по объекту, из-за специфики внутренней сортировки в объекте

    for (var i = arrKeys.length - 1; i >= 0; i--) {
      accum = +arrKeys[i] * limits2[arrKeys[i]]; // проверим общую сумму одной банкноты и запрашиваемой суммы

      if (sum >= accum) {
        sum -= accum;
        objMap.set(arrKeys[i], limits2[arrKeys[i]]);
        limits2[arrKeys[i]] = false;
      } // проверим больше или равна запрашиваемая сумма одной банкноты


      if (limits2[arrKeys[i]] && sum >= +arrKeys[i]) {
        objMap.set(arrKeys[i], 0);

        for (var j = 0, size = limits2[arrKeys[i]]; j < size; j++) {
          if (sum - +arrKeys[i] < 0) break;
          sum -= +arrKeys[i];
          objMap.set(arrKeys[i], objMap.get(arrKeys[i]) + 1);
        }
      }
    } // если есть хоть какой то остаток, то вернем ошибку


    if (sum) return 'Uncaught Error: Not enough bank notes.'; // сформируем результат

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = objMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            _key = _step$value[0],
            value = _step$value[1];

        result += "".concat(value, "x").concat(_key, " ");
      }
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

    return result;
  }

  return 'Uncaught Error: Not enough bank notes.';
};

var limitsobjMap = {
  5000: 4,
  1000: 5,
  500: 2,
  100: 7,
  50: 100
};
console.log(getMoney(3600, limitsobjMap)); // "3x1000 1x500 1x100"

console.log(getMoney(6650, limitsobjMap)); // "1x5000 1x1000 1x500 1x100 1x50"

console.log(getMoney(22000, limitsobjMap)); // "4x5000 2x1000"

console.log(getMoney(26250, limitsobjMap)); // "4x5000 5x1000 2x500 2x100 1x50"

console.log(getMoney(26260, limitsobjMap)); // Uncaught Error: Not enough bank notes.

console.log(getMoney(100000, limitsobjMap)); // Uncaught Error: Not enough bank notes.

console.log(getMoney(49, limitsobjMap)); // Uncaught Error: Not enough bank notes.
// ===========================================================================