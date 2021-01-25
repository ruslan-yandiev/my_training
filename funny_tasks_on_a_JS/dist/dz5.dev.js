"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
Необходимо преобразовать массив с конца в начало и вывести в консоль сообщения вида:
"Под свойством 5 лежит значение 35" (свойства это индекс в массиве, а в объекте это ключ)
"Под свойством 4 лежит значение 2"
...и т.д.
*/
var arr = [51, 8, 99, 71, 2, 35];

function myFunction(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    console.log("\u041F\u043E\u0434 \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u043E\u043C ".concat(i, " \u043B\u0435\u0436\u0438\u0442 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ").concat(arr[i]));
  }
}

myFunction(arr); // * =======================================================================================

/*
Необходимо реализовать функцию так, чтобы она возвращала массив, в котором будут записанны числа в
убывающем порядке, которые кратны 3, до нуля включительно
*/

function getArr(num) {
  var arr = [0];
  var sum = 3;

  while (sum <= num) {
    arr.push(sum);
    sum += 3;
  }

  return arr.reverse();
}

console.log(getArr(15)); // [15, 12, 9, 6, 3, 0]

console.log(getArr(17)); // [15, 12, 9, 6, 3, 0]

console.log(getArr(22)); // [21, 18, 15, 12, 9, 6, 3, 0]

function getArr2(num) {
  var arr = [];

  for (var i = num; i >= 0; i--) {
    if (i % 3 === 0) arr.push(i);
  }

  return arr;
}

console.log(getArr2(15)); // [15, 12, 9, 6, 3, 0]

console.log(getArr2(17)); // [15, 12, 9, 6, 3, 0]

console.log(getArr2(22)); // [21, 18, 15, 12, 9, 6, 3, 0]
// * ====================================================================

/*
Функция принимает массив с целыми числами, необходимо, чтобы функция возвращала
сумму чисел массива, которые записаны в четных индексах включая 0
*/

function getEvenElementsSum(arr) {
  var result = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;

      if (arr.indexOf(elem) % 2 === 0) {
        result += elem;
      }
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

console.log(getEvenElementsSum([5, 7, -1, 12, 3, 0])); // 7

console.log(getEvenElementsSum([4, -12, 29, 6, 31, 2, -50])); // 14

function getEvenElementsSum4(arr) {
  var result = 0;

  for (var i = 0; i < arr.length; i++) {
    if (i % 2 === 0) result += arr[i];
  }

  return result;
}

console.log(getEvenElementsSum4([5, 7, -1, 12, 3, 0])); // 7

console.log(getEvenElementsSum4([4, -12, 29, 6, 31, 2, -50])); // 14
// Второй вариант

function getEvenElementsSum2(arr) {
  return arr.reduce(function (accum, elem, index) {
    if (index % 2 === 0) {
      accum += elem;
    }

    return accum;
  });
}

console.log(getEvenElementsSum2([5, 7, -1, 12, 3, 0])); // 7

console.log(getEvenElementsSum2([4, -12, 29, 6, 31, 2, -50])); // 14

function getEvenElementsSum3(arr) {
  return arr.reduce(function (acc, elem, index) {
    return index % 2 === 0 ? acc + elem : acc;
  }, 0);
}

console.log(getEvenElementsSum3([5, 7, -1, 12, 3, 0])); // 7

console.log(getEvenElementsSum3([4, -12, 29, 6, 31, 2, -50])); // 14
// * ====================================================================

/*
Функция должна принимать три числа, 'a, b, c', и возвращает массив чисел, которые лежат в промежутке
между числом 'a' включительно и 'b' включительно делящиеся без остатка на число 'c'
*/

function myFilter(a, b, c) {
  var arr = [];

  if (a < b) {
    for (var i = a; i <= b; i++) {
      if (i % c === 0) {
        arr.push(i);
      }
    }
  } else {
    for (var _i = a; _i >= b; _i--) {
      if (_i % c === 0) {
        arr.push(_i);
      }
    }
  }

  return arr;
}

console.log(myFilter(5, 15, 3)); // [6, 9, 12, 15]

function myFilter2(a, b, c) {
  var arr = [];

  for (var i = a; true;) {
    if (i % c === 0) arr.push(i);
    if (i === b) return arr;
    a < b ? i++ : i--;
  }
}

console.log(myFilter2(5, 15, 3)); // [6, 9, 12, 15]

console.log(myFilter2(15, 5, 3)); // [15, 12, 9, 6]
// * ====================================================================

/*
Написать функцию принимающую строку, должна вернуть булевое значение, является ли строка палиндромом
*/

function pal(str) {
  str = str.toLowerCase();
  var str2 = str.split('').reverse().join(''); // ! когда нужно вернуть правду или лож, то проще просто вернуть результат выполнения условия, а он всегда либо true либо false

  return str === str2;
}

console.log(pal('топот'));
console.log(pal('Топот'));
console.log(pal('Колобок'));

function pal2(str) {
  return str.toLowerCase() === _toConsumableArray(str.toLowerCase()).reverse().join(''); // return str.toLowerCase() === str.toLowerCase().split('').reverse().join('');
}

console.log(pal2('топот'));
console.log(pal2('Топот'));
console.log(pal2('Колобок')); // * ====================================================================

/*
! Интересная задача
Функция принимает строку, на английском, возвращает массив, содержащий все возможные комбинации букв.
не должно быть повторяющихся строк в массиве.
*/

function getLettersVariants(str) {
  if (!str || str.length === 1) return str;
  var arr = [str];

  function start(strArr) {
    for (var i = 0; i < strArr.length - 1; i++) {
      for (var j = i + 1; j < strArr.length; j++) {
        var _ref = [strArr[j], strArr[i]];
        strArr[i] = _ref[0];
        strArr[j] = _ref[1];
        if (arr.includes(strArr.join(''))) return arr;
        arr.push(strArr.join(''));
      }
    }

    return start(strArr);
  }

  return start(str.split(''));
}

console.log(getLettersVariants('asd')); // ['asd', 'ads', 'sad', 'das', 'dsa', 'sda']
// ? Вторым способом можно было бы решить с помощью бесконечного цикла (while) и счетчиками, которые обнуляются по достижению
// ? определенного значения от размера массива, и повторять до тех пор пока не встретится повтор.
// * ====================================================================

/*
Функция принимает массив с целыми числами, функция должна возвращать значение большего эелемента массива,
который записан в четном индексе включая 0.
*/

function getMaxEvenElement(arr) {
  var maxElem = arr[0];

  for (var i = 2; i < arr.length; i += 2) {
    if (maxElem < arr[i]) maxElem = arr[i];
  }

  return maxElem;
}

console.log(getMaxEvenElement([5, 7, -1, 12, 3, 0])); // 5

console.log(getMaxEvenElement([4, -12, 29, 6, 31, 92, -50])); // 31
// Второй способ

function getMaxEvenElement2(arr) {
  return arr.find(function (elem, index) {
    return index % 2 === 0 && elem > arr[index + 2];
  });
}

console.log(getMaxEvenElement2([5, 7, -1, 12, 3, 0])); // 5

console.log(getMaxEvenElement2([4, -12, 29, 6, 31, 92, -50])); // 31

function getMaxEvenElement3(arr) {
  return arr.reduce(function (result, elem, index) {
    return index % 2 === 0 && result < elem ? result = elem : result;
  }, 0);
}

console.log(getMaxEvenElement3([5, 7, -1, 12, 3, 0])); // 5

console.log(getMaxEvenElement3([4, -12, 29, 6, 31, 92, -50])); // 31