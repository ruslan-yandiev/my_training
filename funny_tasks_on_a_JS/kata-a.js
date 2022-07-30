/*
Сравнить объекты с учетом вложенности.
*/
// ! Плохое решение
function deepEqual(f, s) {
  let result = true;

  function check(first, second) {
    if (typeof first !== typeof second) {
      result = false;
      return;
    }

    if (first !== null && second !== null && typeof first === "object") {
      if (Object.keys(first).length !== Object.keys(second).length) {
        result = false;
        return;
      }

      for (let key in first) {
        if (typeof first[key] === typeof second[key]) {
          if (first[key] !== null && second[key] !== null && typeof first[key] === "object") {
            check(first[key], second[key]);
          } else if (!Number.isNaN(first[key]) && !Number.isNaN(second[key]) && first[key] !== second[key]) {
            result = false;
            return;
          }
        } else {
          result = false;
          return;
        }
      }
    } else if (!Number.isNaN(first) && !Number.isNaN(second) && first !== second) {
      result = false;
      return;
    }
  }

  check(f, s);

  return result;
}

const firstObject = {
  a: {
    b: {
      c: 1,
      d: "string",
      e: {
        num: 1,
      },
    },
  },
};

const secondObject = {
  a: {
    b: {
      e: {
        num: 1,
      },
      d: "string",
      c: 1,
    },
  },
};

const a = {
  name: "Misha",
  order: {
    price: 20,
    count: 1,
    taxes: { vat: { name: "vat", amount: { uah: 10, usd: 0.37 } } },
    total: { withoutTaxes: { uah: 20, usd: 0.74 }, withTaxes: { vat: { uah: 30, usd: 1.11 } } },
  },
};
const b = {
  name: "Misha",
  order: {
    price: 20,
    count: 1,
    taxes: { vat: { name: "vat", amount: { uah: 10, usd: 0.37 } } },
    total: { withoutTaxes: { uah: 20, usd: 0.74 }, withTaxes: { vat: { uah: 30, usd: 1.11, eur: null } } },
  },
};

const c = { cc: 1, dd: { cc: { cc: 1, dd: 2 } } };
const d = { cc: 1, dd: { cc: { cc: 1, dd: 2, ee: 3 } } };

const e = { cc: 1, dd: { cc: { cc: 1, dd: 2 }, a: { a: {} } } };
const f = { cc: 1, dd: { cc: { cc: 1, dd: 2 }, a: { a: {}, b: 1 } } };

const g = { a: { a: NaN } };
const h = { a: { a: NaN } };

console.log(deepEqual(firstObject, secondObject)); // true
console.log(deepEqual({ a: 1, b: 3 }, { b: 2, a: 1 })); // false
console.log(deepEqual(1, 2)); // false
console.log(deepEqual(true, false)); // false
console.log(deepEqual(null, null)); // true
console.log(deepEqual(null, 1)); // false
console.log(deepEqual({}, null)); // false
console.log(deepEqual(c, d)); // false
console.log(deepEqual(e, f)); // false
console.log(deepEqual(a, b)); // false
console.log(deepEqual(3, 3)); // true
console.log(deepEqual(NaN, NaN)); // true
console.log(deepEqual(g, h)); // true
// =========================================================================================================

// ! Лучшее решение
function deepEqual(a, b) {
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a !== "object" || a === null || b === null) {
    return a === b;
  }

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (const key of Object.keys(a)) {
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

console.log(deepEqual(firstObject, secondObject)); // true
console.log(deepEqual({ a: 1, b: 3 }, { b: 2, a: 1 })); // false
console.log(deepEqual(1, 2)); // false
console.log(deepEqual(true, false)); // false
console.log(deepEqual(null, null)); // true
console.log(deepEqual(null, 1)); // false
console.log(deepEqual({}, null)); // false
console.log(deepEqual(c, d)); // false
console.log(deepEqual(e, f)); // false
console.log(deepEqual(a, b)); // false
console.log(deepEqual(3, 3)); // true
console.log(deepEqual(NaN, NaN)); // true
console.log(deepEqual(g, h)); // true

// =====================================================================================
function deepEqual(obj1, obj2) {
  if (Number.isNaN(obj1) && Number.isNaN(obj2)) return true;
  if (typeof obj1 !== typeof obj2) return false;
  if (typeof obj1 !== "object" || obj1 === null || obj2 === null) return obj1 === obj2;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (key in obj1) {
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

// * =================================================================================
/*
years = Math.floor(t / (1000 * 60 * 60 * 24 * 30 * 12)),
months = Math.floor(t / (1000 * 60 * 60 * 24 * 30) % 12),
days = Math.floor(t / (1000 * 60 * 60 * 24) % 30),
hours = Math.floor((t / (1000 * 60 * 60)) % 24),
minutes = Math.floor((t / (1000 * 60)) % 60),
seconds = Math.floor((t / 1000) % 60);
*/

function getDaysBetweenDates(date1, date2) {
  if (arguments.length < 2) throw new TypeError("TypeError");
  if (date1 === null || date2 === null) return 365;

  date1 = Date.parse(new Date(date1));
  date2 = Date.parse(new Date(date2));

  if (!date1 || !date2) return NaN;

  let result;

  if (date1 > date2) {
    result = Math.ceil((date2 - date1) / (86400 * 1000));
    return result === -0 ? 0 : result;
  }

  result = date2 > date1 ? date2 - date1 : date1 - date2;

  return Math.floor(result / (86400 * 1000));
}

console.log(Date.parse(null));
console.log(getDaysBetweenDates("1-1-2020", "1-2-2020")); // 1
console.log(getDaysBetweenDates(new Date(2011, 6, 2, 6, 0), new Date(2012, 6, 2, 6, 0))); // 366
console.log(getDaysBetweenDates(1409796000000, 1409925600000)); // 1

//* =======================================================================================================================
const x = [{ a: 1 }, 1, "a"];
const y = [[0, 1], "b", { b: 2 }, undefined];
const z = [null, 3, { c: 3 }, "c", { d: 4 }];

function myF(arr) {
  return arr.reduce((count, el) => {
    if (el !== null && !Array.isArray(el) && typeof el === "object") {
      count += 1;
    }
    return count;
  }, 0);
}

console.log(myF(x)); // 1
console.log(myF(y)); // 1
console.log(myF(z)); // 2
// * =======================================================================================================================
/*
compareWithPrecision
Напишите функцию, которая сравнивает два числа с определенной погрешностью.

Пример:

compareWithPrecision(0.1 + 0.2, 0.3, 0.0001) // true
*/
function compareWithPrecision(a, b, precision) {
  return +(Math.max(a, b) - Math.min(a, b)) <= precision;
}

console.log(compareWithPrecision(1, 0.5, 0.5)); // true
console.log(compareWithPrecision(10, 9.7001, 0.3)); // true
console.log(compareWithPrecision(10, 9.699, 0.3)); // false
// * =======================================================================================================================
/*
Capitalize
Реализуйте функцию capitalize, которая принимает строку в качестве аргумента и возвращает новую строку, в которой первые буквы слов заглавные, а все остальные - строчные.

Пример:

const str = 'sOme RanDoM sTRING';
console.log(capitalize(str)); // Some Random String
*/
function capitalize(str) {
  return str
    .split(" ")
    .map((el) => [...el.toLowerCase()].reduce((acc, lett, i) => (!i ? (acc += lett.toUpperCase()) : (acc += lett)), ""))
    .join(" ");
}

const str = "sOme RanDoM sTRING";
console.log(capitalize(str)); // Some Random String
// * =======================================================================================================================

/*
Are brackets balanced
Реализуйте функцию, которая принимает на вход строку, состоящую только из открывающих и закрывающих круглых скобок, и проверяет является ли эта строка корректной. Пустая строка (отсутствие скобок) считается корректной.

Строка считается корректной (сбалансированной), если содержащаяся в ней скобочная структура соответствует требованиям:

Скобки — это парные структуры. У каждой открывающей скобки должна быть соответствующая ей закрывающая скобка.
Закрывающая скобка не должна идти впереди открывающей.
*/

const areBracketsBalanced = (str) => {
  if (str === "") return true;
  if (str.length < 1 || [...str].filter((el) => el === ")" || el === "(").length < str.length) return false;

  let detect = 0;

  for (let i = 0; i < str.length; i++) {
    str[i] === "(" ? (detect += 1) : (detect -= 1);
    if (detect < 0) return false;
  }

  return detect === 0;
};

console.log(areBracketsBalanced(")(")); // false
console.log(areBracketsBalanced("())(")); // false
console.log(areBracketsBalanced("))))((((")); // false
console.log(areBracketsBalanced("()()((()))")); // true
console.log(areBracketsBalanced("()()((()))")); // false
// * =======================================================================================================================
/*
Реализуйте функцию moveToStart, которая принимает массив и число n. Функция должна переставить n элементов массива из конца в начало.

Если второй аргумент больше или равен длине массива, то должен быть возвращен новый массив, порядок элементов которого совпадает с изначальным.

Функция должна возвращать новый массив, а не мутировать старый.
*/
const moveToStart = (arr, n) => {
  if (arr.length <= n) return [...arr];

  const arr2 = [...arr];

  for (let i = 0; i < n; i++) {
    arr2.splice(0, 0, arr2.pop());
  }

  return arr2;
};

//! вариант в одну строку
const moveToStart = (arr, n) => {
  return arr.length <= n ? [...arr] : arr.slice(arr.length - n).concat(arr.slice(0, arr.length - n));
};

console.log(moveToStart([1, 2, 3, 4], 2)); // [3, 4, 1, 2]

console.log(moveToStart([1, 2, 3, 4, 5], 3)); // [3, 4, 5, 1, 2]

console.log(moveToStart([1, 2, 3, 4, 5], 3)); // [3, 4, 5, 1, 2]

console.log(moveToStart([1, 2, 3, 4, 5], 10)); // [1, 2, 3, 4, 5]
// * =======================================================================================================================
/*
Реализуйте функцию getNumbersByParity, которая принимает массив чисел в качестве первого аргумента и строку "even" или "odd" в качестве второго. Функция должна вернуть новый массив, состоящий из четных чисел, если вторым аргументом было передано "even" и нечетных, если было передано "odd".

Оба аргумента функции обязательны. Первый обязательно будет массивом, а второй - строкой "even"/"odd".
*/
const getNumbersByParity = (data, parity) => data.filter((el) => el % 2 === (parity === "even" ? 0 : 1));

const data = [1, 2, 3, 4, 5, 6];

console.log(getNumbersByParity(data, "even")); // [2, 4, 6];
console.log(getNumbersByParity(data, "odd")); // [1, 3, 5];
// * =======================================================================================================================
/*
Подсчитать сколько строк. Функция принимает массив или объект и возвращает число строк. 
*/
function getStringCount(object) {
  let count = 0;

  for (let i in object) {
    if (object[i] !== null && typeof object[i] === "object") count += getStringCount(object[i]);
    if (typeof object[i] === "string") count += 1;
  }

  return count;
}

console.log(
  getStringCount({
    first: "1",
    second: "2",
    third: false,
    fourth: ["anytime", 2, 3, 4],
    fifth: null,
  })
); // 3

console.log(getStringCount(["1", "2", ["3"]])); // 3
// * =======================================================================================================================
/*
Напишите функцию, которая принимает первым параметром объект, вторым - массив из цепочки свойств, по которому нужно пройти, чтобы получить значение.

Если какое-то из свойств не найдено - функция возвращает undefined.
*/
// ! рекурсия и декларативный подход используя функциональное программирование
function optionalChaining(obj, chain) {
  return obj === undefined ? undefined : chain.length === 1 ? obj[chain[0]] : optionalChaining(obj[chain[0]], chain.slice(1));
}

// ! линейный подход в императивном стилеж
function optionalChaining(obj, chain) {
  for (let i = 0; i < chain.length; i++) {
    if (obj[chain[i]] === undefined) return undefined;
    obj = obj[chain[i]];
  }

  return obj;
}

const obj = {
  a: {
    b: {
      c: {
        d: "Привет!",
      },
    },
  },
};

console.log(optionalChaining(obj, ["a", "b", "c", "d"])); // Привет
console.log(optionalChaining(obj, ["a", "b", "c", "d", "e"])); // undefined
console.log(optionalChaining(obj, ["a", "c", "d"])); // undefined
console.log(optionalChaining(obj, ["b", "d", "a"])); // undefined
// * =======================================================================================================================
/*
Partition
Задача реализовать функцию partition которая принимает на вход массив и коллбэк функцию, а возвращает массив в котором два массива.

partition(array, callback) => [trueArray, falseArray]
Во время выполнения функция должна вызвать callback для каждого элемента массива array.

Сигнатура функции callback

callback(element) => boolean
element - Элемент массива на котором была вызвана функция callback

Если callback вернёт true то element с которым была вызвана функция должен попасть в массив trueArray

Если callback вернёт false то element с которым была вызвана функция должен попасть в массив falseArray

Функция должна правильно отрабатывать если callback возвращает приводимые к true false значения:

Приводимые к true
{} => true
1 => true
...
совокупность таких значений называется truthy
Приводимые к false
undefined => false
"" => false
0 => false
...
совокупность таких значений называется falsey 
Если callback не передан то truthy значения попадают в trueArray а falsey значения попадают в falseArray

Функция не должна менять изначальный массив
*/

function partition(array, callback) {
  const trueArray = [];
  const falseArray = [];

  for (let i = 0; i < array.length; i++) {
    if (typeof callback === "function") {
      callback(array[i]) ? trueArray.push(array[i]) : falseArray.push(array[i]);
    } else {
      Boolean(array[i]) ? trueArray.push(array[i]) : falseArray.push(array[i]);
    }
  }

  return [trueArray, falseArray];
}

let numbers = [1, 2, 3, 4, 5, 6];

console.log(partition(numbers, (element) => element > 3));
// [
//     [4, 5, 6], // trueArray
//     [1, 2, 3]  // falseArray
// ];

numbers = [0, 1, 2, {}, false, "", "0"];

console.log(partition(numbers, (element) => element));
// [
//     [1, 2, {}, "0"], // trueArray
//     [0, false, ""]  // falseArray
// ];

console.log(partition(numbers));
// [
//     [1, 2, {}, "0"], // trueArray
//     [0, false, ""]  // falseArray
// ];

const users = [
  { user: "barney", age: 36, active: false },
  { user: "fred", age: 40, active: true },
  { user: "pebbles", age: 1, active: false },
];

console.log(partition(users, (element) => element.active));
// [
//     [
//         { 'user': 'fred',    'age': 40, 'active': true }
//     ],
//     [
//         { 'user': 'barney',  'age': 36, 'active': false },
//         { 'user': 'pebbles', 'age': 1,  'active': false }
//     ]
// ]
// * =======================================================================================================================
/*
Реализуйте функцию once, которая принимает функцию в качестве аргумента и возвращает новую функцию, которая вызывает функцию-аргумент, но только единожды. 
Повторный вызов функции-результата once не должен давать никакого эффекта.
*/
const once = (fn) => {
  return function () {
    if (fn) fn();
    fn = null;
  };
};

const f = () => console.log("hi!");
const onceF = once(f);
onceF(); // hi!
onceF(); // nothing
// * =======================================================================================================================
/*
Реализуйте набор готовых к использованию функций для arr.filter:

inRange(a, b) – число находится между a и b (включительно).
Если аргумент или элемент массива можно привести к числу,
то функция должна сначала приводить его к числу, а потом проверять условие.
Если a > b, то функция должна возвращать false для всех элементов массива

inArray([...]) – значение находится в данном массиве.

notInArray([...]) – значение не находится в данном массиве.
Они должны использоваться таким образом:

arr.filter(inRange(3,6)) – выбирает только значения между 3 и 6 (включительно).
arr.filter(inArray([1,2,3])) – выбирает только элементы, совпадающие с одним из элементов массива
arr.filter(notInArray([1,2,3])) – выбирает только те элементы,
которые не совпадают ни с одним из элементов массива
*/
const inRange = (a, b) => (el) => a > b ? false : Number(el) >= a && Number(el) <= b ? el : false;

const inArray = (arr) => (el) => arr.includes(el);

const notInArray = (arr) => (el) => !arr.includes(el);

let arr = [1, 2, 3, 4, 5, 6, 7, true, undefined, NaN];

console.log(arr.filter(inRange(3, 6))); // [3, 4, 5, 6]
console.log(arr.filter(inRange(7, 6))); // [3, 4, 5, 6]
console.log(arr.filter(inArray([1, 2, 10, undefined]))); // [1, 2, undefined]
console.log(arr.filter(notInArray([1, 2, 3, 4, 5, 6, 7, true]))); // [undefined, NaN]
// * =======================================================================================================================
/*
Дан массив пользователей. Необходимо преобразовать массив так, чтобы у каждого пользователя появился username. 
Поле username создается путем конкатенации firstName в нижнем регистре, первой буквы lastName в нижнем регистре и года рождения пользователя, 
который необходимо вычислить из текущей даты и возраста пользователя. Учтите, что функция должна работать даже в том случае, если вызвать ее, к примеру, через 10 лет.

Данные всегда будут передаваться в указаном ниже формате.
Возраст представлен в виде целого числа.
Фамилия всегда будет в формате "N.", где N - первая буква фамилии.
Порядок объектов в массиве должен сохраняться.
Порядок полей в объекте не важен.
Пример:

Данные на входе:

const data = [
{ firstName: 'Emily', lastName: 'N.', country: 'Ireland', continent: 'Europe', age: 30, language: 'Ruby' },
{ firstName: 'Nor', lastName: 'E.', country: 'Malaysia', continent: 'Asia', age: 20, language: 'Clojure' }
];
Данные на выходе:

Предположим, что функция была вызвана в 2020 году, тогда результатом работы этой фнукции было бы:

const processedData = createUsernames(data);
console.log(processedData); // [
// { firstName: 'Emily', lastName: 'N.', country: 'Ireland', continent: 'Europe', age: 30, language: 'Ruby',
//  username: 'emilyn1990' },
// { firstName: 'Nor', lastName: 'E.', country: 'Malaysia', continent: 'Asia', age: 20, language: 'Clojure',
//  username: 'nore2000' }
// ];
*/

const createUsernames = (users) => {
  return users.map((user) => {
    user.username = `${user.firstName.toLowerCase()}${user.lastName[0].toLowerCase()}${
      new Date().getFullYear() - new Date("00" + user.age).getFullYear()
    }`;

    return user;
  });
};

const data = [
  { firstName: "Emily", lastName: "N.", country: "Ireland", continent: "Europe", age: 30, language: "Ruby" },
  { firstName: "Nor", lastName: "E.", country: "Malaysia", continent: "Asia", age: 20, language: "Clojure" },
];

const processedData = createUsernames(data);
console.log(processedData); // [
// { firstName: 'Emily', lastName: 'N.', country: 'Ireland', continent: 'Europe', age: 30, language: 'Ruby',
//  username: 'emilyn1990' },
// { firstName: 'Nor', lastName: 'E.', country: 'Malaysia', continent: 'Asia', age: 20, language: 'Clojure',
//  username: 'nore2000' }
// ];
// * =======================================================================================================================
/*
Реализуйте функцию merge, которая будет принимать неограниченное количество объектов в качестве аргументов и возвращать новый объект, 
который должен содержать все поля со всех объектов. 
Если ключи в объектах повторяются, то каждый последующий объект при совпадении ключей должен иметь больший приоритет над предыдущим. 
Порядок полей в результирующем объекте не важен.
*/
const merge = (...collections) => {
  return collections.reduce((obj, el) => {
    for (key in el) obj[key] = el[key];
    return obj;
  }, {});
};

console.log(
  merge(
    {
      name: "John",
      age: 22,
    },
    {
      surname: "Klein",
      age: 20,
      profession: "student",
    },
    {
      profession: "frontend developer",
      country: "USA",
    }
  )
);

// {
//   name: 'John',
//   surname: 'Klein',
//   age: 20,
//   profession: 'frontend developer',
//   country: 'USA',
// }

const merge2 = (...collections) => {
  return { ...Object.assign(...collections) };
};

console.log(
  merge2(
    {
      name: "John",
      age: 22,
    },
    {
      surname: "Klein",
      age: 20,
      profession: "student",
    },
    {
      profession: "frontend developer",
      country: "USA",
    }
  )
);

// {
//   name: 'John',
//   surname: 'Klein',
//   age: 20,
//   profession: 'frontend developer',
//   country: 'USA',
// }
// * ===================================================================================================================================
/*
Реализуйте функцию getArraysCounts, которая принимает массив в качестве аргумента. 
Функция должна вернуть Map, в котором ключи - все уникальные элементы в массиве, а значения - количество этих элементов в массиве.
*/
const getArraysCounts = (arr) => {
  const result = new Map();

  for (let i = 0; i < arr.length; i++) {
    result.has(arr[i]) ? result.set(arr[i], result.get(arr[i]) + 1) : result.set(arr[i], 1);
  }

  return result;
};

const obj = { name: 123 };
const data = [1, 1, 1, 2, 2, 2, 2, true, true, obj, obj, { name: 123 }];
const counts = getArraysCounts(data); // экземпляр Map
console.log(counts.get(1)); // 3
console.log(counts.get(2)); // 4
console.log(counts.get(true)); // 2
console.log(counts.get(obj)); // 2

const getArraysCounts2 = (arr) => arr.reduce((map, el) => (map.has(el) ? map.set(el, map.get(el) + 1) : map.set(el, 1)), new Map());

const obj2 = { name: 123 };
const data2 = [1, 1, 1, 2, 2, 2, 2, true, true, obj2, obj2, { name: 123 }];
const counts2 = getArraysCounts2(data2); // экземпляр Map
console.log(counts2.get(1)); // 3
console.log(counts2.get(2)); // 4
console.log(counts2.get(true)); // 2
console.log(counts2.get(obj2)); // 2
// * ===================================================================================================================================
