"use strict";

// ! найти сумму двух ближайших чисел которая равна s. Сложность алгоритма должна быть O(n)
// не подходит так как сложность O(n*n) тоесть n в квадрате
// function sumPairs(ints, s) {
//     let a;
//     let b = ints.length - 1;
//     check: for (let i = 0, size = ints.length; i < size; i++) {
//         for (let j = i + 1; j < size; j++) {
//             if (ints[i] + ints[j] === s) {
//                 if (j <= b) {
//                     a = i;
//                     b = j;
//                     continue check;
//                 }
//             }
//         }
//     }
//     return a !== undefined ? [ints[a], ints[b]] : undefined;
// }

/*
Для ускорения работы можно использовать структуру данных Set. Эта структура хранит в себе только не повторяющиеся элементы. 
Так например в массиве миллион десяток будет миллион десяток :), а вот в Set всего одна десятка.
Так же преимущество Set перед обычным массивом в том, что сложность функций has и add это O(1), 
когда у массива поиск элемента занимает O(n). Получается используя структуру Set наш алгоритм имеет сложность O(n), 
когда с массивом он имел O(n^2)
*/
function sumPairs(ints, s) {
  //Если чисел < 2 то пару мы точно не сможем найти
  if (ints.length < 2) return undefined; //Объявляем структуру данных Set

  var temp = new Set(); //Сразу закинем первый элемент, т.к. для него пока что пары точно нет

  temp.add(ints[0]); //Проходимся по всему массиву начиная со 2 элемента

  for (var i = 1; i < ints.length; ++i) {
    //Функция has возвращает true если элемент `s - ints[i]` находится в temp, иначе false
    if (temp.has(s - ints[i])) {
      return [s - ints[i], ints[i]];
    }

    temp.add(ints[i]);
  } //Если по итогу мы так и не наши


  return undefined;
} // var sum_pairs = function (ints, s) {
//     var seen = {};
//     for (var i = 0; i < ints.length; ++i) {
//         if (seen[s - ints[i]]) return [s - ints[i], ints[i]];
//         seen[ints[i]] = true;
//     }
// };
// function sum_pairs(ints, s) {
//     let seen = new Set();
//     for (let i of ints) {
//         if (seen.has(s - i)) return [s - i, i];
//         seen.add(i);
//     }
// }
// let sum_pairs = (a, s) => {
//     let mem = {};
//     for (x of a)
//         if (mem[s - x]) return [s - x, x];
//         else mem[x] = 1;
// };
// var sum_pairs = function (ints, s) {
//     set = new Set();
//     for (let i of ints) {
//         if (set.has(s - i)) {
//             return [s - i, i];
//         }
//         set.add(i);
//     }
// };


console.log(sumPairs([1, 4, 8, 7, 3, 15], 8), [1, 7], '         Basic: [1, 4, 8, 7, 3, 15] should return [1, 7] for sum = 8');
console.log(sumPairs([1, -2, 3, 0, -6, 1], -6), [0, -6], '      Negatives: [1, -2, 3, 0, -6, 1] should return [0, -6] for sum = -6');
console.log(sumPairs([20, -13, 40], -7), undefined, '           No Match: [20, -13, 40] should return undefined for sum = -7');
console.log(sumPairs([1, 2, 3, 4, 1, 0], 2), [1, 1], '          First Match From Left: [1, 2, 3, 4, 1, 0] should return [1, 1] for sum = 2');
console.log(sumPairs([10, 5, 2, 3, 7, 5], 10), [3, 7], '        First Match From Left REDUX!: [10, 5, 2, 3, 7, 5] should return [3, 7] for sum = 10');
console.log(sumPairs([4, -2, 3, 3, 4], 8), [4, 4], '            Duplicates: [4, -2, 3, 3, 4] should return [4, 4] for sum = 8');
console.log(sumPairs([0, 2, 0], 0), [0, 0], '                   Zeroes: [0, 2, 0] should return [0, 0] for sum = 0');
console.log(sumPairs([5, 9, 13, -3], 10), [13, -3], '           Subtraction: [5, 9, 13, -3] should return [13, -3] for sum = 10');
console.log(sumPairs([10, 5, 2, 5, 3, 7, 5], 10), [5, 5]); // ! Не следует возвращать пару с кратчайшего расстояния. Вы должны вернуть пару, в которой оба элемента идут раньше любой другой полной пары.

console.log(sumPairs([10, 5, 2, 1, 1, 3, 5, 7, 5], 10), [5, 5]);