/*
 *Даны два массива: [1, 2, 3, 2, 0] и [5, 1, 2, 7, 3, 2]
 *Надо вернуть [1, 2, 2, 3] (порядок неважен)
 *Фактически нам нужно вернуть пересечение множеств, но с повторением элементов.
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
  const obj = {};
  const result = [];

  for (let i = 0; true; i++) {
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

// =============================================================================================================
/*
  Дана строка (возможно, пустая), состоящая из букв A-Z: AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB
  Нужно написать функцию RLE, которая на выходе даст строку вида: A4B3C2XYZD4E3F3A6B28
  И сгенерирует ошибку, если на вход пришла невалидная строка.
  Пояснения: Если символ встречается 1 раз, он остается без изменений; 
  Если символ повторяется более 1 раза, к нему добавляется количество повторений.
*/

function rle(str) {
  if (typeof str !== "string") throw new TypeError("Не является строкой");
  if (str.length < 2) throw new Error("Слишком короткая строка");
  if (str.toUpperCase() !== str) throw new Error("Невалидная строка. Функция принимает строку только в верхнем регистре!");

  let step = 1;
  let detect = str[0];
  let result = "";

  for (let i = 1; i < str.length; i++) {
    if (detect === str[i]) {
      step += 1;
    } else {
      step > 1 ? (result = result + detect + step) : (result += detect);
      step = 1;
      detect = str[i];
    }
  }

  return result + detect + step;
}

console.log(rle("AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB"), "A4B3C2XYZD4E3F3A6B28");

// ===========================================================================================================
/*
  Дан список интов, повторяющихся элементов в списке нет. Нужно преобразовать это множество в строку, 
  сворачивая соседние по числовому ряду числа в диапазоны. Примеры:
  [1,4,5,2,3,9,8,11,0] => "0-5,8-9,11"
  [1,4,3,2] => "1-4"
  [1,4] => "1,4"
*/

function myF(arr) {
  arr = arr.sort((a, b) => a - b);

  let result = "";
  const collections = [];
  let collection = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[i + 1] - 1 || arr[i] === undefined) {
      collection.push(arr[i]);
      collections.push(collection);
      collection = [];
    } else {
      collection.push(arr[i]);
    }
  }

  collections.push(collection);

  for (let i = 0; i < collections.length; i++) {
    collections[i].length === 1
      ? (result += collections[i][0])
      : (result = result + collections[i][0] + "-" + collections[i][collections[i].length - 1]);

    if (i !== collections.length - 1) result += ",";
  }

  return result;
}

console.log(myF([1, 4, 5, 2, 3, 9, 8, 11, 0]), ".....", "0-5,8-9,11");
console.log(myF([1, 4, 3, 2]), ".......", "1-4");
console.log(myF([1, 4]), ".........", "1,4");

// ==================================================================================================================
/*
  Дан массив из нулей и единиц. Нужно определить, какой максимальный по длине подинтервал единиц можно получить, 
  удалив ровно один элемент массива.
  [1, 1, 0]
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]
*/
function maxOness(arr) {
  // detect и index можно заменить на один объкт
  let detect;
  let index;

  let result = 0;
  let step = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      step += 1;
    } else if (arr[i] === 0 && !detect) {
      index = i;
      detect = true;
    } else {
      if (result < step) result = step;
      step = 0;
      i = index;
      detect = false;
    }
  }

  if (result < step) result = step;

  return result;
}

console.log(maxOness([1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]), 6);
console.log(maxOness([1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1]), 10);
console.log(maxOness([1, 1, 0]), 2);
// =======================================================================================================================
/*
  Даны даты заезда и отъезда каждого гостя. Для каждого гостя дата заезда строго раньше даты отъезда 
  (то есть каждый гость останавливается хотя бы на одну ночь). 
  В пределах одного дня считается, что сначала старые гости выезжают, 
  а затем въезжают новые. Найти максимальное число постояльцев, которые одновременно проживали в гостинице 
  (считаем, что измерение количества постояльцев происходит в конце дня).

sample = [ [1, 2], [1, 3], [2, 4], [2, 3], ] // 4  (второго числа прожи)
*/
function findMax(arr) {
  const obj = {};

  for (let i = 0; i < arr.length; i++) {
    for (let j = arr[i][0]; j < arr[i][1] + 1; j++) {
      if (obj[j]) {
        obj[j] += 1;
      } else {
        obj[j] = 1;
      }
    }
  }

  console.log();

  return Math.max(...Object.values(obj));
}

console.log(
  findMax([
    [1, 2],
    [1, 3],
    [2, 4],
    [2, 3],
  ])
);
// =========================================================================
/*
  Sample Input ["eat", "tea", "tan", "ate", "nat", "bat"]
  Sample Output [ ["ate", "eat", "tea"], ["nat", "tan"], ["bat"] ]

  Т.е. сгруппировать слова по "общим буквам".
*/
function myFunction(arr) {
  const result = [];

  a: for (let i = 0; i < arr.length; i++) {
    if (!result.length) {
      result.push([arr[i]]);
    } else {
      for (let j = 0; j < result.length; j++) {
        let detect = result[j][0].length;

        for (let x = 0; x < arr[i].length; x++) {
          if (result[j][0].includes(arr[i][x])) {
            detect -= 1;
          }
        }

        if (detect === 0) {
          result[j].push(arr[i]);
          continue a;
        }

        if (j === result.length - 1) {
          result.push([arr[i]]);
          continue a;
        }
      }
    }
  }

  return result;
}

console.log(myFunction(["eat", "tea", "tan", "ate", "nat", "bat"]), [["ate", "eat", "tea"], ["nat", "tan"], ["bat"]]);

// =========================================================================
/*
Слияние отрезков:
Передается строка
Вход: [1, 3] [100, 200] [2, 4]
Вернуть строку
Выход: [1, 4] [100, 200]
*/
function myF(str) {
  const arrs = [];
  let arr = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "[") {
      let num = "";

      for (let j = i + 1; str[j] !== "]"; j++) {
        if (str[j] === ",") {
          arr.push(Number(num));
          num = "";
        } else {
          num += str[j];
        }

        if (str[j + 1] === "]") {
          i = j;
        }
      }

      arr.push(Number(num));
      arrs.push(arr);
      arr = [];
    }
  }

  arr = arrs.flat(Infinity).sort((a, b) => a - b);

  let result = ``;
  let step = [];

  for (let i = 0; i < arr.length; i++) {
    if (!step.length) step.push(arr[i]);

    if (arr[i + 1] === undefined || arr[i].toString().length < arr[i + 1].toString().length) {
      step.push(arr[i]);
      result += `[${step[0]}, ${step[1]}]`;
      step = [];
    }
  }

  return result;
}

console.log(myF("[1, 3] [100, 200] [2, 4]")); // => [1, 4] [100, 200]
console.log(myF("[1, 3] [100, 200] [2, 4] [13, 16] [433, 566] [7, 9] [33, 99]")); // => [1, 9] [13 99] [100, 566]
// =========================================================================
/*
Дан список интов и число-цель. Нужно найти такой range, чтобы сумма его элементов давала число-цель.

elements = [1, -3, 4, 5]

target = 9
*/
function findRage(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === num) {
        return `${arr[i]} + ${arr[j]} = ${num}`;
      }
    }
  }

  return false;
}

console.log(findRage([1, -3, 4, 5], 9)); // 4 + 5
console.log(findRage([1, -3, 4, 5], 1)); // -3 + 4
/*
Сложность алгоритма должна быть не выше чем O(n)
Дан список интов и число-цель. Нужно найти такой range, чтобы сумма его элементов давала число-цель.

elements = [1, -3, 4, 5]

target = 9
*/
function findRage2(arr, num) {
  const obj = {};

  for (let i = 0; i < arr.length; i++) {
    if (obj[num - arr[i]]) return `${obj[num - arr[i]]} + ${arr[i]} = ${num}`;
    obj[arr[i]] = arr[i];
  }

  return false;
}

console.log(findRage2([1, -3, 4, 5], 9)); // 4 + 5
console.log(findRage2([1, -3, 4, 5], 1)); // -3 + 4
// =========================================================================
/*
Дан список интов и число-цель. Нужно найти такой range, чтобы сумма его элементов давала число-цель.

elements = [1, -3, 4, 5]

target = 9
*/
function findRage(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === num) {
        return `${arr[i]} + ${arr[j]} = ${num}`;
      }
    }
  }

  return false;
}

console.log(findRage([1, -3, 4, 5], 9)); // 4 + 5
console.log(findRage([1, -3, 4, 5], 1)); // -3 + 4
/*
Сложность алгоритма должна быть не выше чем O(n)
Дан список интов и число-цель. Нужно найти такой range, чтобы сумма его элементов давала число-цель.

elements = [1, -3, 4, 5]

target = 9
*/
function findRage2(arr, num) {
  const obj = {};

  for (let i = 0; i < arr.length; i++) {
    if (obj[num - arr[i]]) return `${num - arr[i]} + ${arr[i]} = ${num}`;
    obj[arr[i]] = arr[i];
  }

  return false;
}

console.log(findRage2([1, -3, 4, 5], 9)); // 4 + 5
console.log(findRage2([1, -3, 4, 5], 1)); // -3 + 4
// =========================================================================

/*
В строке найти длину самой большей подстроки с повторяющимися символами и вывести символ и длинну
*/
// ! Хорошее решение. Более простой по памяти и скорости код сложность временная O(n)
function f2(str) {
  let result = 1, step = 1, result2;

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== str[i + 1]) {
      if (result < step) {
        result = step;
        result2 = str[i];
      }
      step = 1;
    } else {
      step += 1;
    }
  }
  
  return `${result2}: ${result}`;
}

console.log(f2("paralleeeeelepipeуttttttууt")); // t: 6
// ==========================================================================================
/*
В строке состоящей из нулей и единиц нужно найти самую длинную подстроку,
состоящую только из единиц, если в исходной строке вы можете удалить один ноль в любой позиции
и вернуть длину этой подстроки
*/

function finds(str) {
  let result = 1;
  let detect = 0;
  let detect2 = 0;
  let bull = true;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "1") {
      detect += 1;
    } else if (str[i] === "0" && detect2 > 0) {
      if (detect + detect2 > result) result = detect + detect2;
      detect2 = detect;
      detect = 0;
    } else if (str[i] === "0" && str[i + 1] === "1" && bull) {
      bull = false;
      detect2 = detect;
      detect = 0;
    } else {
      if (detect > result) result = detect;
      detect = 0;
      bull = true;
    }
  }

  return detect + detect2 > result ? detect + detect2 : result;
}

console.log(finds("11100110010010101010000111011111000111100111100011100111111100000111000101010111110111111111101111111")); // 17

// ==============================================================================

/*
! Задача с реального собеседования.

В функцию sumNumbers передается массив, содержащий все подряд (любые
типы данных). Необходимо реализовать функцию так, чтобы она вернула
среднее арифметическое всех элементов, которые могут быть нативно
представлены в javascript в виде числа, т.е. мы считаем значение, если
при прверащении в число, значение не является NaN.
*/
function sumNumbers(arr) {
  let step = 0,
      sum = 0;

  for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== 'symbol' && !Number.isNaN(Number(arr[i]))) {
          step += 1;
          sum += Number(arr[i]);
      }
  }

  return sum / step;
}

console.log(sumNumbers([1, '9', NaN, 9.5, true, 'WebInterview', Symbol('5'), null, 5n, undefined, { a: 5 }, () => 100])); // 4.25


function sumNumbers(arr) {
  let count = 0;
  return arr.reduce((sum, el) => {
      if (typeof el !== 'symbol' && !Number.isNaN(Number(el))) {
          sum += Number(el);
          count += 1;
      }
      return sum;
  }, 0) / count;
}
