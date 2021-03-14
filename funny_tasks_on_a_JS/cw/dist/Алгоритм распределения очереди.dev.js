"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
Напишите функцию которая принимает первым аргументом массив положительных, целых чисел, представляющий из себя очередь людей,
Каждый индекс массива это конкретный человек, а значение массива это время которое будет затрачено на его обслуживание.
Вторым аргументом функция принимает количество касс которые обслуживают очередь людей.
Количество касс всегда больше положительное целое число. Количество людей в очереди, то есть массив может быть пустым.
а) Есть только ОДНА очередь, обслуживающая много касс. 
б) Порядок очереди НИКОГДА не меняется,
в) Первый человек в очереди (то есть первый элемент в массиве) направляется к кассе, как только она становится свободой.
PS Ситуацию можно сравнить с идеей пула потоков, связанной с одновременным запуском нескольких процессов.


Пример:

queueTime([5,3,4], 1) // => 12

queueTime([10,2,3,3], 2) // => 10

queueTime([2,3,10], 2) // => 12

queueTime([16, 14, 10, 3, 13, 9, 8, 19, 18, 20, 3, 7, 4, 16, 3], 6)  //=> 32
*/
// Алгоритм:
// 1= 16(16 - 3) |13| (13 - 6)  |7 | ......
// 2= 14(14 - 3) |11| (11 - 6)  |5 | ......
// 3= 10(10 - 3) |7 | (7 - 6)   |1 | ......
// 4= 3 + 8      |8 | (8 - 6)   |2 | ......
// 5= 13(13 - 3) |10| (10 - 6)  |4 | ......
// 6= 9(9 - 3)   |6 | + 19      |19| ......
function queueTime(customers, n) {
  if (customers.length === 0) return 0;
  if (customers.length <= n) return Math.max.apply(Math, _toConsumableArray(customers));

  if (n === 1) {
    var sum = 0;

    for (var i = 0; i < customers.length; i++) {
      sum += customers[i];
    }

    return sum;
  }

  var obj = {};

  for (var _i = 1; _i <= n; _i++) {
    obj[_i] = {
      allTime: customers[_i - 1],
      timeLeft: customers[_i - 1],
      detect: true
    };
  }

  for (var _i2 = n; _i2 < customers.length; _i2++) {
    var detect = Infinity;
    var freeCashier = void 0;

    for (var key in obj) {
      if (obj[key].timeLeft < detect) {
        freeCashier = obj[key];
        detect = obj[key].timeLeft;
      }
    }

    freeCashier.timeLeft = customers[_i2];
    freeCashier.allTime += customers[_i2];

    for (var _key in obj) {
      if (obj[_key] !== freeCashier) {
        obj[_key].timeLeft -= detect;
      }
    }
  }

  var result = 0;
  console.log(obj);

  for (var _key2 in obj) {
    if (obj[_key2].allTime > result) {
      result = obj[_key2].allTime;
    }
  }

  return result;
}

console.log(queueTime([], 1), 0);
console.log(queueTime([1, 2, 3, 4], 1), 10);
console.log(queueTime([2, 2, 3, 3, 4, 4], 2), 9);
console.log(queueTime([1, 2, 3, 4, 5], 100), 5);
console.log(queueTime([15, 28, 23, 39, 28, 12, 19, 6, 46, 8, 2, 16, 32, 6, 28, 40, 11, 50, 6, 1, 10, 13, 6, 8], 5), 112);
console.log(queueTime([26, 41, 18, 15, 22, 20, 29, 39, 17, 46, 37, 7, 3, 3, 42, 21, 31, 43, 41, 38, 36, 44, 19, 39, 15, 28], 4), 187);
console.log(queueTime([16, 14, 10, 3, 13, 9, 8, 19, 18, 20, 3, 7, 4, 16, 3], 6), 32);