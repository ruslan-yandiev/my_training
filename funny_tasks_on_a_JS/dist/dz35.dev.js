"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function f(n) {
  var sum = n;

  function f2(num) {
    if (num === 1) return sum;

    if (num % 2 === 0) {
      sum += num / 2;
      num /= 2;
      return f2(num);
    }

    return f2(num - 1);
  }

  return f2(n);
}

console.log(f(25)); // 47

function ff(n) {
  if (n === 1) return n;
  return n + ff(Math.floor(n / 2));
}

console.log(ff(25)); // 47
// * =====================================================================

/*
В функцию getNumber передается целое положительное число. Необходимо внутри 
функции создать массив `[1, n]`, из которого мы постепенно будем убирать 
значения. 
Каждый раз мы будем убирать значения нечетные, начиная отсчет сначала с левой 
стороны, затем с правой и дальше повторяя действия до тех пор, пока в массиве 
не окажется лишь одно значение, которое и нужно вернуть из функции.

Пример:

Передали в функцию 9, получили массив:
[1, 2, 3, 4, 5, 6, 7, 8, 9] отбираем все нечетные интексы с лева на право

[2, 4, 6, 8]  отбираем все нечетные интексы с права на лево

[2, 6] отбираем все нечетные интексы с лева на право

[6]
Возвращаем последнюю оставшуюся цифру 6.
*/

function getNumber(n) {
  var arr = [];

  for (var i = 1; i <= n; i++) {
    arr.push(i);
  }

  function f(newArr) {
    if (newArr.length === 1) return newArr[0];
    arr = [];

    for (var _i = 0; _i < newArr.length; _i++) {
      if (_i % 2 === 1) arr.push(newArr[_i]);
    }

    return f(arr.reverse());
  }

  return f(arr);
}

console.log(getNumber(9)); // 6

console.log(getNumber(15)); // 8

function getNumber2(n) {
  function f(newArr) {
    if (newArr.length === 1) return newArr;
    return f(newArr.filter(function (elem, index) {
      return index % 2 > 0 ? elem : false;
    }).reverse());
  }

  return f(Array.from({
    length: n
  }, function (_, i) {
    return i + 1;
  })); // передадим в аргументы сгенерированный заполненный массив от [1 до n включительно]
}

console.log(getNumber2(9)); // 6

console.log(getNumber2(15)); // 8
// *  ==========================================================================================

/*
Мы детективы и нам предстоит взломать сейф. Сейф цифровой:

 ┌───┬───┬───┐
 │ 1 │ 2 │ 3 │
 ├───┼───┼───┤
 │ 4 │ 5 │ 6 │
 ├───┼───┼───┤
 │ 7 │ 8 │ 9 │
 └───┼───┼───┘
     │ 0 │
     └───┘

У нас есть свидетель, человек, который видел как этот сейф открывают. Этот
свидетель знает какие примерно цифры были нажаты, нужно реализовать функцию
getPINs, которая принимает строку с примерным набором цифр, которые видел 
свидетель, а возвращает набор возможных PIN-кодов к сейфу в виде массива строк.
Свидетель знает в какой области была нажата кнопка, но точно не может сказать 
какая. Однако свидетель уверен что его максимальная ошибка составляет одну цифру 
в сторону (вверх, вниз, вправо или влево). То есть если свидетель говорит что
была нажата 2, значит могла быть нажата любая клавиша из `[1, 2, 3, 5]`.
*/

function getPINs(observed) {
  var obj = {
    1: '24',
    2: '135',
    3: '26',
    4: '157',
    5: '2468',
    6: '359',
    7: '48',
    8: '0579',
    9: '68',
    0: '8'
  }; // можно сгрупировать через массив разместив строки чисел под индексами ['08', '124', '2135', '326', '4157', '52468', .....]

  if (observed.length === 1) return [observed].concat(_toConsumableArray(obj[observed]));
  var arr = [],
      arr2 = [];

  for (var i = 0; i < observed.length; i++) {
    arr.push([observed[i]].concat(_toConsumableArray(obj[observed[i]])));
  }

  function build(numArr) {
    for (var _i2 = 0; _i2 < numArr.length; _i2++) {
      for (var j = 0; j < arr[1].length; j++) {
        arr2.push(numArr[_i2] + arr[1][j]);
      }
    }

    arr.splice(0, 2);

    if (arr.length) {
      arr.unshift(arr2);
      arr2 = [];
    }

    return arr.length === 0 ? arr2 : build(arr[0]);
  }

  return build(arr[0]);
}

console.log(getPINs("8")); // ["5", "7", "8", "9", "0"]

console.log(getPINs("11")); // ["11", "22", "44", "12", "21", "14", "41", "24", "42"]

console.log(getPINs("12")); // ["12", "11", "13", "15", "22", "21", "23", "25", "42", "41", "43", "45"]

console.log(getPINs("13")); // [12, 13, 16, 22, 23, 26, 42, 43, 46]

console.log(getPINs("130")); // [120, 130, 160, 128, 138, 168, 220, 230, 260, 228, 238, 268, 420, 430, 460, 428, 438, 468]

console.log(getPINs("132"));
console.log(getPINs("1300")); // * ========================================================================================