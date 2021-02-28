"use strict";

/*
Напишите функцию на, которая принимает массив, состоящий из чисел
натурального ряда, идущих по возрастанию, и возвращает массив,
состоящий из чередующихся четных и нечетных чисел, идущих по убыванию.
Если массив, который принимает функция, начинается с четного числа,
то и массив, который она возвращает, тоже должен начинаться с четного, 
и наоборот.
*/
function sort(arr) {
  if (arr.length % 2 === 1) return arr.reverse();
  var one = [],
      two = [],
      result = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      i = _step.value;
      i % 2 === 0 ? two.push(i) : one.push(i);
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

  for (var _i = one.length - 1; _i >= 0; _i--) {
    arr[0] % 2 === 0 ? result.push(two[_i], one[_i]) : result.push(one[_i], two[_i]);
  }

  return result;
}

console.log(sort([1, 2, 3, 4, 5, 6, 7, 8])); // [7,8,5,6,3,4,1,2]

console.log(sort([2, 3, 4, 5, 6])); // [6,5,4,3,2]

console.log(sort([2, 3, 4, 5, 6, 7])); // [6,7,4,5,2,3]

function sort2(arr) {
  return arr.map(function (el, i, arr) {
    return arr[arr.length % 2 === 1 ? arr.length - i - 1 : i % 2 === 0 ? arr.length - i - 2 : arr.length - i];
  });
}

console.log(sort2([1, 2, 3, 4, 5, 6, 7, 8])); // [7,8,5,6,3,4,1,2]

console.log(sort2([2, 3, 4, 5, 6])); // [6,5,4,3,2]

console.log(sort2([2, 3, 4, 5, 6, 7])); // [6,7,4,5,2,3]
// * ==================================================================================

var arr = [1, 4, 9];
var result = 2 in arr;
console.log(result); // true потому, что оператор in смотрит только а ключи а индекс(ключ, свойство) 2 сть в массиве.
// * ====================================================

var w1 = window;
var w2 = self;
var w3 = window.window;
var w4 = window.self; // Значения переменных w1, w2, w3, w4 строго равны между собой
// Но только переменная w2 будет работать в workers
// * ======================================================================
// ! Побитовые операторы

console.log(14 & 9); // 8 (1000)
// 1110 (14)
// 1001 (9)
// 1000 (8)

console.log(14 | 9); // 15 (1111)
// 1110 (14)
// 1001 (9)
// 1111 (15)

console.log(14 ^ 9); // 7 (111)
// 1110 (14)
// 1001 (9)
// 0111 (7)

console.log(~9); // меняет нули на единицы, а единицы на нули
// 9 на самом деле будет 0000000000000000000000000000000000001001
// превратит в           1111111111111111111111111111111111110110
// но в консоле покажет -1010 а в десятичной системе -10
// есть еще операторы сдвигов:
// >>
// <<
// >>>
// * ========================================================

/*
! Реального собеса.
Implement function check(str, bracketsConfig), that for given brackets
sequence will return true if it is correct and false otherwise.

In the second param there is bracketsConfig - the array of pairs
open-closed brackets. Each subarray includes only 2 elements - opening
and closing bracket.


Реализовать функцию check(str, bracketsConfig), что для заданных скобок
последовательность вернет истину, если она верна, и ложь в противном случае.

Во втором параметре есть bracketsConfig - массив пар
открытые-закрытые скобки. Каждый подмассив включает всего 2 элемента - открытие
и закрывающая скобка.
*/

function check(str, bracketsConfig) {
  if (str.length % 2 > 0) return false; // в этих вариантах не нужно, но будет правильно указать

  var detect = 0;
  var brackets = bracketsConfig.flat(Infinity);

  for (var _i2 = 0; _i2 < brackets.length; _i2 += 2) {
    for (var j = 0; j < str.length; j++) {
      if (brackets[_i2] !== '|') {
        if (detect === 0 && str[j] === brackets[_i2 + 1]) return false;
        if (str[j] === brackets[_i2]) detect += 1;
        if (str[j] === brackets[_i2 + 1]) detect -= 1;
      }
    }

    if (str.startsWith(brackets[_i2]) && !str.endsWith(brackets[_i2 + 1]) && str.indexOf(brackets[_i2]) + 1 !== str.indexOf(brackets[_i2 + 1])) {
      return false;
    }
  }

  return detect === 0;
}

console.log(check('()', [['(', ')']]), true); // -> true

console.log(check('((()))()', [['(', ')']]), true); // -> true

console.log(check('())(', [['(', ')']]), false); // -> false

console.log(check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]), true); // -> true

console.log(check('[(])', [['(', ')'], ['[', ']']]), false); // -> false

console.log(check('[]()', [['(', ')'], ['[', ']']]), true); // -> true

console.log(check('[]()(', [['(', ')'], ['[', ']']]), false); // -> false
// special case: opening and closing bracket can be the same :)

console.log(check('||', [['|', '|']]), true); // -> true

console.log(check('|()|', [['(', ')'], ['|', '|']]), true); // -> true

console.log(check('|(|)', [['(', ')'], ['|', '|']]), false); // -> false

console.log(check('|()|(||)||', [['(', ')'], ['|', '|']]), true); // -> true

console.log(check('|(||||(||)||)|', [['(', ')'], ['|', '|']]), true); // -> true

function check2(str, bracketsConfig) {
  var parsedBracketsConfig = bracketsConfig.map(function (r) {
    return "".concat(r[0]).concat(r[1]);
  });
  var prevLength = str.length;

  while (str !== '') {
    parsedBracketsConfig.forEach(function (r) {
      str = str.replace(r, '');
    });
    if (prevLength === str.length) return false;
    prevLength = str.length;
  }

  return true;
}

console.log(check2('()', [['(', ')']]), true); // -> true

console.log(check2('((()))()', [['(', ')']]), true); // -> true

console.log(check2('())(', [['(', ')']]), false); // -> false

console.log(check2('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]), true); // -> true

console.log(check2('[(])', [['(', ')'], ['[', ']']]), false); // -> false

console.log(check2('[]()', [['(', ')'], ['[', ']']]), true); // -> true

console.log(check2('[]()(', [['(', ')'], ['[', ']']]), false); // -> false
// special case: opening and closing bracket can be the same :)

console.log(check2('||', [['|', '|']]), true); // -> true

console.log(check2('|()|', [['(', ')'], ['|', '|']]), true); // -> true

console.log(check2('|(|)', [['(', ')'], ['|', '|']]), false); // -> false

console.log(check2('|()|(||)||', [['(', ')'], ['|', '|']]), true); // -> true

console.log(check2('|(||||(||)||)|', [['(', ')'], ['|', '|']]), true); // -> true

var check3 = function check3(str, arrayPars) {
  if (str.length % 2) return false;
  var mapPars = new Map(arrayPars);
  var newArr = Array.from(str);
  var nextPar = '';
  var isRight = false;
  newArr.forEach(function (item) {
    if (!nextPar.startsWith(item)) {
      isRight = false;
      nextPar = mapPars.get(item) + nextPar;
    } else {
      isRight = true;
      nextPar = nextPar.slice(1, nextPar.length);
    }
  });
  return isRight;
};

console.log(check3('()', [['(', ')']]), true); // -> true

console.log(check3('((()))()', [['(', ')']]), true); // -> true

console.log(check3('())(', [['(', ')']]), false); // -> false

console.log(check3('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]), true); // -> true

console.log(check3('[(])', [['(', ')'], ['[', ']']]), false); // -> false

console.log(check3('[]()', [['(', ')'], ['[', ']']]), true); // -> true

console.log(check3('[]()(', [['(', ')'], ['[', ']']]), false); // -> false
// special case: opening and closing bracket can be the same :)

console.log(check3('||', [['|', '|']]), true); // -> true

console.log(check3('|()|', [['(', ')'], ['|', '|']]), true); // -> true

console.log(check3('|(|)', [['(', ')'], ['|', '|']]), false); // -> false

console.log(check3('|()|(||)||', [['(', ')'], ['|', '|']]), true); // -> true

console.log(check3('|(||||(||)||)|', [['(', ')'], ['|', '|']]), true); // -> true
// * ==================================================================