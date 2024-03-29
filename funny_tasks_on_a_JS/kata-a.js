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
/*
Prototypes Decorator
Необходимо добавить возможность логирования в функцию add класса Addition

Используя прототип класса Addition добавить декоратор к функции add, дающий возможность логировать ее вызов
При этом результат выполнения add должен быть как и в оригинале, но дополнительно при вызове выводить в консоль 'called'

Менять изначальную функцию, класс или созданный объект нельзя.
Код можно писать только в обозначенной зоне.

Пример:
const startedValue = new Addition(5);
const result = startedValue.add(3,5,6) //В консоль выводится "called"
console.log(result) //В консоль выводится 19
*/

class Addition {
  constructor(num) {
    this.num = num;
  }

  add(...nums) {
    const sum = (a, b) => a + b;
    return this.num + nums.reduce(sum);
  }
}

function deck(f) {
  return function (...nums) {
    console.log("called");
    return f.bind(this)(...nums);
  };
}

Addition.prototype.add = deck(Addition.prototype.add);

// Пример:
const startedValue = new Addition(5);
const result = startedValue.add(3, 5, 6); //В консоль выводится "called"
console.log(result); //В консоль выводится 19

const startedValue2 = new Addition(5);
const result2 = startedValue.add(3, 5, 6, 10); //В консоль выводится "called"
console.log(result2); //В консоль выводится 29
// * ========================================================
/*
Object Create
В данном задании вам нужно будет реализовать полифл Object.create.

Реализуйте аналог стандартной фунции Object.create - создаёт и возвращает новый объект, прототипом которого является первый аргумент, переданный в функцию. 
Если передан второй аргумент - устанавливает его в качестве свойств для нового объекта. 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

Ваша функция должна принимать два параметра:

prototype (обязательный) - объект или null (но не undefined), который будет являтся прототипом для созданного объекта.
properties (optional) - аргумент, который установит свойства для нового объекта (будет передан в Object.defineProperties).
Если параметры фунции отсутствуют или prototype НЕ является объектом или null, то необходимо пробросить TypeError.

В результате Object.create вернет созданный объект с внутренним свойством [[Prototype]], установленным в значение переданного в аргументе prototype. Если properties передан и НЕ является undefined, то будет вызван Object.defineProperties(obj, properties), где obj - объект,который должен быть возвращен из Object.create.

Подсказки:

Для доступа к внутреннему свойству объекта [[Prototype]] используйте методы Object.getPrototypeOf/Object.setPrototypeOf.
В JavaScript все является объектом, кроме: null и undefined.
NaN, Infinity, /regular expression literals/, function(){} - это всё тоже объекты.
*/
Object.myCreate = function (proto, propertiesObject) {
  if (typeof proto !== "object") throw new TypeError("TypeError");

  const obj = {};
  obj.__proto__ = proto;

  if (typeof propertiesObject !== "object" || propertiesObject === null) {
    return obj;
  } else {
    for (let key in propertiesObject) {
      obj[key] = propertiesObject[key].value;
    }

    return obj;
  }
};

const A = {
  objectName: "Object A",
  getObjectName: function () {
    return `This is ${this.objectName}!`;
  },
};

const B = Object.myCreate(A, {
  objectName: {
    value: "Object B",
  },
});

console.log(A.getObjectName()); // This is Object A!
console.log(B.getObjectName()); // This is Object B!

console.log(A.hasOwnProperty("getObjectName")); // true
console.log(A.hasOwnProperty("objectName")); // true

console.log(B.hasOwnProperty("getObjectName")); // false
console.log(B.hasOwnProperty("objectName")); // true
console.log(B.objectName); // true

// ! Функционально
Object.create = function (proto, propertiesObject) {
  if (typeof proto !== "object") throw new TypeError("TypeError");

  const obj = {};
  Object.setPrototypeOf(obj, proto);

  return typeof propertiesObject !== "object" || propertiesObject === null ? obj : Object.defineProperties(obj, propertiesObject);
};
//* =====================================================================================
/*
Транслятор событий
Cоздайте класс EventEmitter для управления событиями. У этого класса должны быть следующие методы:
.on(event, callback) - добавить обработчик события

.off(event, callback) - удалить обработчик события

.once(event, callback) - добавить обработчик события, который сработает единожды

.emit(event, [...arg]) - вызвать все обработчики события event, можно передать аргументы

Расширьте EventEmitter классом BroadcastEventEmitter так, чтобы была возможность вызвать все обработчики всех событий:
emit("*", [...arg]) - вызвать все обработчики событий, можно передать аргументы
Event Emitter можно перевести как “транслятор” событий.

Представьте себе такую ситуацию: происходит какое-то событие, например пользователь кликнул на кнопку, 
на которое должны отреагировать разные участки программы. Чтобы проще организовать такую логику, 
используют шаблон Event Emitter, который можно реализовать разными способами. Основная идея в том, 
чтобы грамотно создать основу для управления событиями и реализовать возможность любым элементам “подписаться” на него 
(и быть в курсе происходящего).
*/

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (this.events[eventName] === undefined) {
      this.events[eventName] = [];
      this.events[eventName].push(callback);
    } else {
      this.events[eventName].push(callback);
    }
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((el) => el !== callback);
    }
  }

  once(eventName, callback) {
    const oncing = (fn) => {
      const f = (arg) => {
        this.off(eventName, f);
        return fn(arg);
      };

      return f;
    };

    this.on(eventName, oncing(callback));
  }

  emit(eventName, args) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        this.events[eventName][i].call(null, args);
      }
    }
  }
}

class BroadcastEventEmitter extends EventEmitter {
  emit(eventName, ...args) {
    if (eventName !== "*") {
      if (this.events[eventName]) {
        for (let i = 0; i < this.events[eventName].length; i++) {
          this.events[eventName][i].apply(null, args);
        }
      }
    } else {
      for (let key in this.events) {
        for (let i = 0; i < this.events[key].length; i++) {
          this.events[key][i].apply(null, args);
        }
      }
    }
  }
}

let emitter = new EventEmitter();

const multiplyTwo = (num) => num * 2;
const multiplyThree = (num) => num * 3;

const divideTwo = (num) => num / 2;
const divideThree = (num) => num / 3;

// Добавляем для события multiplication два обработчка
emitter.on("multiplication", multiplyTwo);
emitter.on("multiplication", multiplyThree);
emitter.emit("multiplication", 2); // 4  // 6

// Удалим обработчик multiplyThree для события multiplication
emitter.off("multiplication", multiplyThree);

// Еще раз вызываем событие multiplication, теперь срабатывает только один обработчик multiplyTwo
emitter.emit("multiplication", 2);
// -> 4

// Создадим новое событие divideTwo и добавим два обработчика:
// divideTwo - срабатывает всегда, когда вызывается событие division (до тех пор, пока не удалим этот обработчик)
//  divideThree - сработает только ОДИН раз, во время первого ВЫЗОВА события division
emitter.on("division", divideTwo);
emitter.once("division", divideThree);

// Вызываем событие division - срабатывают обработчики divideTwo и divideThree
emitter.emit("division", 6);
// -> 3
// -> 2

// Вызываем еще раз событие division - срабатывает ТОЛЬКО обработчики divideTwo
emitter.emit("division", 6);
// -> 3

// Вызываем еще раз событие division - срабатывает ТОЛЬКО обработчики divideTwo
emitter.emit("division", 6);
//-> 3

let broadcastEmitter = new BroadcastEventEmitter();

broadcastEmitter.on("multiplication", multiplyTwo);
broadcastEmitter.on("multiplication", multiplyThree);
broadcastEmitter.on("division", divideTwo);
broadcastEmitter.on("division", divideThree);

// Вызываем все события (multiplication и division) => все обработчики для всех событий будут вызваны.
// Для события multiplication - вызовутся обработчики multiplyTwo и multiplyThree.
// Для события division - вызовутся обработчики divideTwo и divideThree.
broadcastEmitter.emit("*", 6);
// -> 12
// -> 18
// -> 3
// -> 2

broadcastEmitter.emit("multiplication", 6);
// -> 12
// -> 18
// * =================================================================================================================
/*
Нужно написать функцию, которая переводит двумерный массив (массив массивов) в CSV формат и возвращать строку О формате: https://ru.wikipedia.org/wiki/CSV (детали в разделе "Спецификация")

Допустимые значения в качестве элементов массива - числа и строки Если встречается функция - выбрасывать ошибку с текстом "Unexpected value"

Функция принимает: data - массив массивов, содержашие числа или строки

Функция возвращает: Строку в формате CSV

Пример:

arrayToCsv([[1, 2], ['a', 'b']]) // '1,2
a,b'
arrayToCsv([[1, 2], ['a,b', 'c,d']]) // '1,2
"a,b","c,d"'
*/
// function arrayToCsv(data) {
//   let finalResult = "";

//   for (let i = 0; i < data.length; i++) {
//     let value = data[i];

//     for (let j = 0; j < value.length; j++) {
//       try {

//       } catch(error) {

//       }
//       let innerValue = value[j] === null ? "" : value[j].toString();
//       let result = innerValue.replace(/\"/g, '""');
//       if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
//       if (j > 0) finalResult += ',';
//       finalResult += result;
//     }

//     finalResult += "\n";
//   }

//   return finalResult;
// }

function arrayToCsv(data) {
  return data
    .map((v) =>
      v
        .map((x) => {
          try {
            if (Number.isNaN(x) || x.length > 1) {
              return `"${x.replace(/\"/g, '""')}"`;
            } else if (typeof x === "number" || typeof x === "string") {
              return x;
            } else {
              throw new TypeError("Unexpected value");
            }
          } catch (error) {
            console.log(error.message);
          }
        })
        .join(",")
    )
    .join("\n");
}

console.log(
  arrayToCsv([
    [1, 2],
    ["a", "b"],
  ])
);

console.log(
  arrayToCsv([
    [1, 2],
    ["a,b", "c,d"],
  ])
);
//                                                           """text""","other ""long"" text"
console.log(arrayToCsv([['"text"', 'other "long" text']]));

console.log(
  arrayToCsv([
    [1, 2],
    [3, 4],
    ["a", "b"],
  ])
);

console.log(
  arrayToCsv([
    [1, 2],
    [3, 4],
    ["a", "b"],
    [1, {}],
  ])
);
// * ==================================================================================
/*
В localStorage по ключу "counters" находится JSON c объектом, полями которого являются имена счётчиков, 
а значениями - числовое значение счётчика. Напишите функцию incrementCounter, которой на вход первым параметром передаётся counterName - имя счётчика.

Задача функцции увеличить значение счётчика counterName на 1 и обновить данные в localStorage. 
В localStorage может находится невалидный JSON, чтение которого может првести к ошибке, 
в этом случае функция должна записывать новые данные, где у указанного счетчика будет значение 1. 
В конце функция должна возвращать значение счетчика после инкремента.
*/
function incrementCounter(counterName) {
  let obj;

  try {
    obj = JSON.parse(localStorage.getItem("counters"));
    obj[counterName] ? (obj[counterName] += 1) : (obj[counterName] = 1);
    localStorage.setItem("counters", JSON.stringify(obj));
  } catch (err) {
    obj = {};
    obj[counterName] = 1;
    localStorage.setItem("counters", JSON.stringify(obj));
  }

  return obj[counterName];
}

// в localStorage 1 счетчик: bannerClick = 5
incrementCounter("bannerClick"); // 6
incrementCounter("bannerClose"); // 1
// в localStorage 2 счетчика: bannerClick = 6, bannerClose = 1
// * ============================================================================================================
/*
getRepeatableData
Написать функцию getRepeatableData, котрая принимает на вход три параметра:

getData- функция, возвращающая данные со стороннего источника. Может генерировать ошибки (см ниже)
key - аргумент, с которым нужно вызвать getData
maxRequestsNumber- максимальное количество вызовов getData функции. Если этот параметр отсутствует - повторяем бесконечное количество раз.
getRepeatableData(getData, key, maxRequestNumber);

Функция getRepeatableData должна вызывать getData и обрабатывать ошибки по условию:

Если вызов getData возвращает ошибку NotFoundError, то мы пробрасываем исключение.
Если вызов getData возвращает ошибку TemporaryError, то мы должны делать повторный вызов getData функции. Кол-во таких вызовов не должно превышать значение maxRequestsNumber. Если кол-во повторого вызыва превышает maxRequestsNumber, то функция getRepeatableData должна пробрасывать ошибку AttemtsLimitExceeded.
Если getData выполняется без ошибок - функция должна вернуть то, что вернула getData. Пример:
*/
class AttemptsLimitExceeded extends Error {
  constructor() {
    super("Max attempts limit exceed");
    this.name = "AttemptsLimitExceeded";
  }
}

class NotFoundError extends Error {
  constructor() {
    super("Not found");
    this.name = "NotFoundError";
  }
}

class TemporaryError extends Error {
  constructor() {
    super("TemporaryError");
    this.name = "TemporaryError";
  }
}

function getRepeatableData(getData, key, maxRequestsNumber) {
  try {
    getData(key);
    return key;
  } catch (error) {
    if (error.message === "NotFoundError") {
      throw new Error("NotFoundError");
    } else if (error.message === "TemporaryError") {
      if (maxRequestsNumber === 1) throw new AttemptsLimitExceeded("AttemptsLimitExceeded");
    } else {
      throw error;
    }
  }

  if (maxRequestsNumber === undefined) getRepeatableData(getData, key);
  return maxRequestsNumber > 1 ? getRepeatableData(getData, key, maxRequestsNumber - 1) : key;
}

const getData = (key) => {
  return "hello" + key;
};
const res = getRepeatableData(getData, "1", 3); // 'hello1'
console.log(res);

console.log(undefined === undefined);
// * ===============================================================================================
/*
Написать функцию applyFn, которая принимает на вход 2 параметра:

Массив с входными данными
Функцию, которую нужно применить к каждому элементу массива входных данных applyFn(dataArr, callback);
Функция должна возвращать объект в котором 2 массива массив результатов succeeded и массив ошибок errors с правильными call stacks

{
  succeeded: [...], // Массив данных после функции обработчика, как при вызове .map
  errors: [...],    // Массив инстансов ExecutionError
}
Создать класс ошибки ExecutionError с методом .getArgData(), по которому можно получить входные данные, на которых упала функция-коллбэк, 
то есть возвращать element входного массива dataArr, если вызов callback(element) сгенерирует ошибку

Стек трейс должен указывать на корректную позицию в функции-коллбэке Примечание: класс ExecutionError нужно сделать наследником другого класса
*/
class ExecutionError extends Error {
  constructor(elem, stack) {
    super();
    this.name = "ExecutionError";
    this.elem = elem;
    this.stack = stack;
  }

  getArgData() {
    return this.elem;
  }
}

function applyFn(dataArr, callback) {
  const result = { succeeded: [], errors: [] };

  for (let i = 0; i < dataArr.length; i++) {
    try {
      result.succeeded.push(callback(dataArr[i]));
    } catch (err) {
      result.errors.push(new ExecutionError(dataArr[i], err.stack));
    }
  }

  return result;
}

var { succeeded, errors } = applyFn([1, 2, 3], (arg) => arg + 1);
console.log(succeeded); //   succeeded: [2, 3, 4],
console.log(errors); //   errors: [],

const dataArr = ['{"login":"login","password":"password"}', "{{}", "[]["];
const callback = JSON.parse;
var { succeeded, errors } = applyFn(dataArr, callback);
console.log(succeeded); //   succeeded: [{ login: 'login', password: "password" }],
console.log(errors); //   errors: [ExecutionError],
console.log(errors[0].getArgData()); // '{{}'
console.log(errors[1].stack); // '{{}'
// * =============================================================================================================================
/*
SumFileSizes
Напишите функцию, которая принимает имена двух файлов и вызывает функцию, переданную третьим параметром и передает ей первым агрументом сумму их размеров.

Для получения рамзера файла необходимо использовать функцию getFileSize(filename, cb).
*/
let fileSizes = {
  testFile1: 65,
  testFile2: 48,
};

function getFileSize(filename, cb) {
  setTimeout(() => cb(fileSizes[filename]), Math.random() * 500);
}

function sumFileSizes(filename1, filename2, cb) {
  getFileSize(filename1, (arg) => {
    getFileSize(filename2, (arg2) => {
      cb(arg + arg2);
    });
  });
}

sumFileSizes("testFile1", "testFile2", (arg) => {
  console.log(arg);
});
// * ==================================================================================================
/*
getUsersInfo
Вам нужно написать функцию, которая получает массив всех пользователей и передает его в функцию коллбэк.

Пример использования

getUsersInfo((users) => {
  console.log(users); // [ { name: 'Alex', age: 70 }, { name: 'Elon' } ]
});
Для получения данных вам предоставлены 2 асинхронные функции

getUsersIds - Возвращает массив с идентификаторами пользователей
getUserInfo - Возвращает данные пользователя по заданному идентификатору
getUsersIds((ids) => {
  console.log(ids); // ['id2', 'id6']
});

getUserInfo('someUserId', (userInfo) => {
  console.log(userInfo); // { name: 'Alex', age: 70 }
});
Функция должна вызвать callback, переданный первым агрументом и передать туда массив данных о пользователях.

Порядок пользователей в результирующем массиве должен соответствовать порядку идентификаторов в массиве из getUsersIds

Hint: Вне платформы вы можете создать эти функции с помощью setTimeout и какого-то общего хранилица данных.
*/
const { getUserInfo, getUsersIds } = db;

function getUsersInfo(onLoad) {
  const result = [];

  function callBack(arr, fn) {
    if (arr.length > 0) {
      fn(arr[0], (userInfo) => {
        result.push(userInfo);
        callBack(arr.slice(1), getUserInfo);
      });
    } else {
      onLoad(result);
    }
  }

  getUsersIds((ids) => {
    callBack(ids, getUserInfo);
  });
}
// * ========================================================================================================================
/*
increaseSalary
Давайте напишем функцию, которая будет увеличивать зарплату сотруднику с наименьшей зарплатой.

Вам нужно

Получает данные по всем работникам
Находит работника с наименьшей зарплатой
Отправляет запрос на повышение зарплаты этому сотруднику на 20%
Если запрос прошел успешно - отправить сотруднику уведомление об увеличении ЗП тектом: Hello, <имя>! Congratulations, your new salary is <новая ЗП>!
Если запрос завершился неудачей - отправить данные об ошибке администратору
Должна всегда возвращать resolved промис с boolean значением:

true если увеличение прошло успешно
false если нет
Все функции для получения/изменения данных асинхронны и возвращают промисы.
Вам предоставлены функции:

api.getEmployees(); // Возвращает массив с объектами {id: 343, name: 'Alex', salary: 20000}
api.setEmployeeSalary(employeeId, newSalary); // Принимает id сотрудника и новую зарплату. Возвращает новые данные по сотруднику.
api.notifyEmployee(employeeId, text); // Принимает id сотрудника и текст уведомления
api.notifyAdmin(error); // Принимает ошибку
*/
function increaseSalary() {
  return Promise.resolve()
    .then((data) => {
      return api.getEmployees();
    })
    .then((data) => {
      const minSalary = Math.min(...data.map((el) => el.salary));
      const employee = data.find((el) => el.salary === minSalary);
      const newSalary = minSalary * (1 + 20 / 100);

      return api.setEmployeeSalary(employee.id, newSalary);
    })
    .then((data) => {
      api.notifyEmployee(data.id, `Hello, ${data.name}! Congratulations, your new salary is ${data.salary}!`);

      return true;
    })
    .catch((err) => {
      api.notifyAdmin(err);

      return false;
    });
}

const api = {
  _employees: [
    { id: 1, name: "Alex", salary: 120000 },
    { id: 2, name: "Fred", salary: 110000 },
    { id: 3, name: "Bob", salary: 80000 },
  ],

  getEmployees() {
    return new Promise((resolve) => {
      resolve(this._employees.slice());
    });
  },

  setEmployeeSalary(employeeId, newSalary) {
    return new Promise((resolve) => {
      this._employees = this._employees.map((employee) =>
        employee.id !== employeeId
          ? employee
          : {
              ...employee,
              salary: newSalary,
            }
      );
      resolve(this._employees.find(({ id }) => id === employeeId));
    });
  },

  notifyEmployee(employeeId, text) {
    return new Promise((resolve) => {
      resolve(true);
    });
  },

  notifyAdmin(error) {
    return new Promise((resolve) => {
      resolve(true);
    });
  },

  setEmployees(newEmployees) {
    return new Promise((resolve) => {
      this._employees = newEmployees;
      resolve();
    });
  },
};
// * ==================================================================================================
/*
PromiseRace
Напишите функцию, которая принимает массив промисов и возвращает результат того, который завершился первым. При этом если первый промис выдал ошибку - необходимо вернуть ее.

Пример:

const firstPromise = new Promise((resolve) =>
  setTimeout(() => resolve(300), 300)
);

const secondPromise = new Promise((resolve) =>
  setTimeout(() => resolve(200), 200)
);

const thirdPromise = new Promise((resolve) =>
  setTimeout(() => resolve(100), 100)
);

promiseRace([firstPromise, secondPromise, thirdPromise]); // 100
*/
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((el) => {
      el.then((data) => {
        resolve(el);
      }).catch((err) => {
        reject(err);
      });
    });
  });
}

const firstPromise = new Promise((resolve) => setTimeout(() => resolve(300), 300));

const secondPromise = new Promise((resolve) => setTimeout(() => resolve(200), 200));

const thirdPromise = new Promise((resolve) => setTimeout(() => resolve(100), 100));

promiseRace([firstPromise, secondPromise, thirdPromise]); // 100
// * ===============================================================================================================
/*
SumFileSizes
Напишите функцию, которая принимает имена двух файлов и вызывает функцию, переданную третьим параметром и передает ей первым агрументом сумму их размеров.

Для получения рамзера файла необходимо использовать функцию getFileSize(filename, cb).
*/
// let fileSizes = {
//   testFile1: 65,
//   testFile2: 48,
// };

// function getFileSize(filename, cb) {
//   setTimeout(() => cb(fileSizes[filename]), Math.random() * 500);
// }

// function sumFileSizes(filename1, filename2, cb) {
//   getFileSize(filename1, (arg) => {
//     getFileSize(filename2, (arg2) => {
//       cb(arg + arg2);
//     });
//   });
// }

// sumFileSizes("testFile1", "testFile2", (arg) => {
//   console.log(arg);
// });

function promiseAll(promises) {
  const arr = [];
  let index = 0;

  return new Promise((resolve, reject) => {
    function go(promis) {
      if (promis !== undefined) {
        promis.then((data) => {
          arr.push(data);
          index += 1;
          go(promises[index]);
        });
      } else {
        resolve(arr);
      }
    }

    go(promises[index]);
  });
}

const firstPromise = new Promise((resolve) => setTimeout(() => resolve(300), 300));

const secondPromise = new Promise((resolve) => setTimeout(() => resolve(200), 200));

const thirdPromise = new Promise((resolve) => setTimeout(() => resolve(100), 100));

promiseAll([firstPromise, secondPromise, thirdPromise]).then((data) => {
  console.log(data);
}); // [300, 200, 100]
// * =====================================================================================================================================
/*
increaseSalary
Давайте доработаем нашу функцию увеличения зарплат, но теперь будем увеличивать ЗП всем сотрудникам и добавим к ней дополнительный функционал.
Теперь будем использовать функционал async/await для решения этой задачи.

Вам нужно написать функцию, которая

Получает данные по всем работникам
Считаем среднее-арифметическое по ЗП
Тем сотрудникам, у которых ЗП меньше средней - повышаем на 20%, у кого больше - на 10%
Если запрос прошел успешно - отправлять сотруднику уведомление об увеличении ЗП тектом: Hello, <имя>! Congratulations, your new salary is <новая ЗП>!
Если запрос завершился неудачей - отправлять данные ошибки администратору
По итогу отправить суммарное ЗП работников после повышения в бухгалтерию
Должна всегда возвращать resolved промис с числовым значением, сколько зарплат успешно повышено.

Все функции для получения/изменения данных асинхронны и возвращают промисы.
Вам предоставлены функции:

api.getEmployees(); // Возвращает массив с объектами {id: 343, name: 'Alex', salary: 20000}
api.setEmployeeSalary(employeeId, newSalary); // Принимает id сотрудника и новую зарплату. Возвращает новые данные по сотруднику.
api.notifyEmployee(employeeId, text); // Принимает id сотрудника и текст уведомления
api.notifyAdmin(error); // Принимает ошибку
api.sendBudgetToAccounting(summarySalaries); // Принимает суммарную ЗП
*/
function increaseSalary() {
  return new Promise((resolve, reject) => {
    let detect = 0;
    let summarySalaries = 0;
    let index = 0;

    function go(employees, arithmeticMean) {
      if (employees[index] !== undefined) {
        let newSalary =
          employees[index].salary < arithmeticMean ? employees[index].salary * (1 + 20 / 100) : employees[index].salary * (1 + 10 / 100);

        api
          .setEmployeeSalary(employees[index].id, newSalary)
          .then((employee) => {
            detect += 1;
            summarySalaries += employee.salary;
            api.notifyEmployee(employee.id, `Hello, ${employee.name}! Congratulations, your new salary is ${employee.salary}!`);
          })
          .catch((err) => {
            api.notifyAdmin(err);
          })
          .finally(() => {
            index += 1;
            go(employees, arithmeticMean);
          });
      } else {
        api.sendBudgetToAccounting(summarySalaries).then((data) => {
          resolve(detect);
        });
      }
    }

    api
      .getEmployees()
      .then((arr) => {
        go(arr, arr.reduce((acc, el) => acc + el.salary, 0) / arr.length);
      })
      .catch((err) => {
        api.notifyAdmin(err);
      });
  });
}

const api = {
  _employees: [
    { id: 1, name: "Alex", salary: 120000 },
    { id: 2, name: "Fred", salary: 110000 },
    { id: 3, name: "Bob", salary: 80000 },
  ],

  getEmployees() {
    return new Promise((resolve) => {
      resolve(this._employees.slice());
    });
  },

  setEmployeeSalary(employeeId, newSalary) {
    return new Promise((resolve) => {
      const updatedEmployees = this._employees.map((employee) =>
        employee.id !== employeeId
          ? employee
          : {
              ...employee,
              salary: newSalary,
            }
      );
      this._employees = updatedEmployees;
      resolve(this._employees.find(({ id }) => id === employeeId));
    });
  },

  notifyEmployee(employeeId, text) {
    return new Promise((resolve) => {
      resolve(true);
    });
  },

  notifyAdmin(error) {
    return new Promise((resolve) => {
      resolve();
    });
  },

  setEmployees(newEmployees) {
    return new Promise((resolve) => {
      this._employees = newEmployees;
      resolve();
    });
  },

  sendBudgetToAccounting(newBudget) {
    return new Promise((resolve) => {
      resolve();
    });
  },
};
// ==============================================
// Второй вариант
async function increaseSalary() {
  try {
    const employees = await api.getEmployees();
    let detect = 0;
    let summarySalaries = 0;
    const arithmeticMean = employees.reduce((acc, el) => acc + el.salary, 0) / employees.length;

    for (let employee of employees) {
      let newSalary = employee.salary < arithmeticMean ? employee.salary * (1 + 20 / 100) : employee.salary * (1 + 10 / 100);

      try {
        employee = await api.setEmployeeSalary(employee.id, newSalary);
        detect += 1;
        summarySalaries += employee.salary;
        await api.notifyEmployee(employee.id, `Hello, ${employee.name}! Congratulations, your new salary is ${employee.salary}!`);
      } catch (err) {
        await api.notifyAdmin(err);
      }
    }

    await api.sendBudgetToAccounting(summarySalaries);
    return Promise.resolve(detect);
  } catch (err) {
    await api.notifyAdmin(err);
  }
}

increaseSalary().then((data) => {
  console.log(data);
});
// * ========================================================================================================
/*
PromisesInSeries
Напишите функцию, которая принимает массив асинхронных функций и последовательно(следующая начинается, когда закончилась предыдущая) вызывает их, передавая в аргументы результат вызова предыдущей функции.

Пример:

const firstPromise = () =>
  new Promise((resolve) => setTimeout(() => resolve(300)), 300);

const secondPromise = () =>
  new Promise((resolve) => setTimeout(() => resolve(200)), 200);

const thirdPromise = () =>
  new Promise((resolve) => setTimeout(() => resolve(100)), 100);

promisesInSeries([firstPromise, secondPromise, thirdPromise]);
// Выполнит resolve(300) через 300 мс, потом resolve(200) через 200 мс, потом resolve(100) через 100 мс
*/
async function promisesInSeries(asyncFns) {
  let result;

  for (let fn of asyncFns) {
    result = await fn(result);
  }

  return result;
}
// * ==========================================================================================
/*
Throttle
Реализуйте функции throttle.

Примечание: из-за особенностей тестирования реализация new Date() изменена так, что изначальная текущая дата (new Date() или Date.now()) будет равна нулю и будут вручную увеличиваться в тестах. Учтите это, если будете использовать дату в реализации функций.

Примечание: функции, полученные из throttle, должны передавать полученные аргументы и контекст вызова в оригинальную функцию

Примечание: функция throttle может быть реализована без использования таймеров

Функция должна принимать функцию и время задержки, а возвращать модифицированную функцию. Возвращенная функция должна следовать следующим правилам:

Функция throttle должна вызывать функцию и запускать таймер, равный времени задержки, в течение которого функция не может быть вызвана заново. Throttle необходим для того, чтобы обеспечить возможность вызова функции не чаще, чем указанное время задержки. Если время задержки равно 500 мс, то при вызове функции, возвращенной из throttle, каждые 100 мс 10 раз подряд функция будет вызвана лишь три раза:
первый вызов функции на 0мс (первая попытка вызова функции после 0 мс задержки),
второй на 500 мс (пятая попытка вызова функции после 500 мс задержки)
и третий на 1000 мс (десятая попытка вызова функции после 1000 мс задержки).
*/
const throttle = (fn, throttleTime) => {
  let bull = true;

  return function () {
    if (bull) {
      fn.call(this, ...arguments);
      bull = false;
      setTimeout(() => (bull = true), throttleTime);
    }
  };
};

let counter = 0;
const fn = () => {
  counter++;
};

const throttledFn = throttle(fn, 500); // функция может быть вызвана не чаще, чем раз в 500 мс
const intervalId = setInterval(throttledFn, 100);
setTimeout(() => clearInterval(intervalId), 1000); // удаляем интервал через 10 вызовов

setTimeout(() => console.log(counter), 1000); // 2
// * =============================================================================
/*
Debounce
Реализуйте функции debounce.

Примечание: функции, полученные из debounce, должны передавать полученные аргументы и контекст вызова в оригинальную функцию
Функция должна принимать функцию и время задержки, а возвращать модифицированную функцию. Возвращенная функция должна следовать следующим правилам:

Функция debounce должна запускать таймер, равный времени задержки, и игнорировать вызовы функции в течение времени задержки, 
а так же начинать отсчет задержки заново каждый раз, когда функция была вызвана. Как только пройдет время задержки с момента последнего вызова функции, 
дебаунс должен вызвать последнюю вызванную функцию. Debounce нужен для того, чтобы "собрать" многократные вызовы одной и той же функции в течение короткого промежутка времени и вызвать ее только единожды после окончания вызовов. 
При вызове функции, возвращенной из debounce (переданная в debounce задержка равна 200 мс), 100 раз подряд с задержкой в меньше, чем 200 мс, функция будет вызвана лишь единожды спустя 200 мс после последнего (сотого) вызова.
*/
const debounce = (fn, debounceTime) => {
  let timerId;

  return function () {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => fn.call(this, ...arguments), debounceTime);
  };
};

let counter = 0;
const fn = () => {
  counter++;
};

const debouncedFn = debounce(fn, 200);
debouncedFn(); // первый вызов
setTimeout(debouncedFn, 100); // вызов через 100 мс после последнего вызова
// первый вызов был заблокирован, второй ожидает окончания таймера
setTimeout(debouncedFn, 200); // вызов через 100 мс после последнего вызова
// второй вызов был заблокирован, третий ожидает окончания таймера
setTimeout(debouncedFn, 300); // ...
setTimeout(debouncedFn, 400); // после этого вызова не следует других вызовов
// только этот вызов сработает, т.к. после него прошло 200 мс и других вызовов не было
console.log(counter); // 1
setTimeout(() => console.log(counter), 1000); // 1
// =====================================================================================
/*
Результатом декоратора debounce(f, ms) должна быть обёртка, 
которая передаёт вызов f не более одного раза в ms миллисекунд. 
Другими словами, когда мы вызываем debounce, 
это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.

На практике debounce полезен для функций, которые получают/обновляют данные, 
и мы знаем, что повторный вызов в течение короткого промежутка времени не даст ничего нового. 
Так что лучше не тратить на него ресурсы.
*/
// function debounce(f, ms) {
//   let detect = true;

// const { relativeTimeRounding } = require("moment");

//   return function (arg) {
//     if (detect) {
//       f(arg);
//       detect = false;
//     }

//     setTimeout(() => (detect = true), ms);
//   };
// }

// let f = debounce(console.log, 1000);

// f(1); // выполняется немедленно
// f(2); // проигнорирован

// setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout(() => f(4), 1100); // выполняется
// setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
// setTimeout(() => f(6), 2300); // выполняется

//* =======================================================================================================================

//! 39
// const video = {
//   title: 'title',
//   tags: ['a', 'b', 'c'],
//   showTags() {
//     this.tags.forEach((tag) => {
//       console.log(this.title, tag);
//     });
//   }
// }

// video.showTags();
//* =======================================================================================================================
