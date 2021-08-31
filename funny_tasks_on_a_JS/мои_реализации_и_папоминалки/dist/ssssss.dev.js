"use strict";

/*
Даны два массива: [1, 2, 3, 2, 0] и [5, 1, 2, 7, 3, 2]
Надо вернуть [1, 2, 2, 3] (порядок неважен)
Фактически нам нужно вернуть пересечение множеств, но с повторением элементов.
*/
// function f(a, b) {
//   let c, d;
//   const result = [];
//   if (a.length > b.length) {
//     c = a;
//     d = b;
//   } else {
//     c = b;
//     d = a;
//   }
//   for (let i = 0; i < c.length; i++) {
//     if (!d.includes(c[i])) {
//       continue;
//     } else if (d.includes(c[i])) {
//       result.push(c[i]);
//       d.splice(d.indexOf(c[i]), 1);
//     }
//   }
//   return result;
// }
// ! Сложность алгоритма O(n)
function f(a, b) {
  var obj = {};
  var result = [];

  for (var i = 0; true; i++) {
    if (!a[i] && !b[i]) break;

    if (a[i] === b[i]) {
      result.push(a[i]);
      continue;
    }

    if (!obj[a[i]]) {
      obj[a[i]] = 1;
    } else {
      obj[a[i]] += 1;
    }

    if (obj[b[i]]) {
      obj[b[i]] -= 1;
      result.push(b[i]);
    }
  }

  return result;
}

console.log(f([1, 2, 3, 2, 0], [5, 1, 2, 7, 3, 2, 3, 3, 3, 3, 3, 3, 3]), [1, 2, 2, 3]);