"use strict";

/*
Написать функцию которая будет принимать строку на английском и заменять гласные
буквы на цифры, функция вернет строку с но уже с замененными гласными буквами.

a -> 1
e -> 2
....

Реализовать функцию дешефратора, принимает зашифрованную строку и возвращает расшифрованную
*/
function encode(str) {
  var arr = str.split('');
  var letter = {
    a: 1,
    e: 2,
    i: 3,
    o: 4,
    u: 5,
    y: 6
  };

  for (key in letter) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === key) {
        arr[i] = letter[key];
      }
    }
  }

  return arr.join('');
}

function decode(str) {
  var arr = str.split('');
  var letter = {
    a: 1,
    e: 2,
    i: 3,
    o: 4,
    u: 5,
    y: 6
  };

  for (key in letter) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === '' + letter[key]) {
        arr[i] = key;
      }
    }
  }

  return arr.join('');
}

console.log(encode('hello')); // h2ll4

console.log(decode('h2ll4')); // hello
// * =========================================================================

/*
Напишите программу, которая выводит на экран числа от 1 до 100. При этом вместо
чисел, кратным трем, программа должна выводить слово "Fizz", а вместо чисел, кратных пяти
слово "Buzz". Если число кратно и 3, и 5, то программа должна выводить слово "FizzBuzz"
*/
// for (let i = 1; i < 101; i++) {
//     if (i % 3 === 0 && i % 5 === 0) {
//         console.log('FizzBuzz');
//     } else if (i % 3 === 0) {
//         console.log('Fizz');
//     } else if (i % 5 === 0) {
//         console.log('Buzz');
//     } else {
//         console.log(i);
//     }
// }
// * =========================================================================

/*
Реализовать функцию, которая будет работать при любом количестве вызовов верно.
Внутрь функций всегда передается число, проверять не нужно.
 */
// ! Использовали ЗАМЫКАНИЯ. Возвращали новую функцию которая по очереди принимала параметры и
// ! плюсовала к счетчику currentValue в созданном нами замыкании(области видимости) КАРРИРОВАНИЕ

function add(num) {
  if (!num) return 0;
  return function f(number) {
    if (!number) return num;
    num += number;
    return f;
  };
}

console.log(add()); // 0

console.log(add(2)(1)()); // 3

console.log(add(5)(-1)(2)()); // 6
// * =========================================================================

/*
В функцию sumAge передается счтруктура, в уоторой описан человек и его дети.
Функция должна возвращать сумму возрвста человека и сумму возрвстов всех его детей.
*/
// ! В функциональном стиле рекурсивное дерево

function sumAge(user) {
  return user.children.reduce(function (accum, elem) {
    return elem.children ? accum + sumAge(elem) : accum + elem.age;
  }, user.age);
} // (рекурсивное дерево)


function sumAge2(user) {
  var sum = user.age;

  function find(childrens) {
    if (Array.isArray(childrens)) {
      for (var i = 0; i < childrens.length; i++) {
        find(childrens[i]);
      }
    }

    if (childrens.age) sum += childrens.age;
    if (childrens.children) find(childrens.children);
  }

  find(user.children);
  return sum;
}

function sumAge3(user) {
  var sum = 0;

  function find(childrens) {
    if (childrens.age) sum += childrens.age;

    if (Array.isArray(childrens)) {
      for (var i = 0; i < childrens.length; i++) {
        find(childrens[i]);
      }
    }

    if (childrens.children) find(childrens.children);
  }

  find(user);
  return sum;
}

var user = {
  name: 'Петр',
  age: 49,
  children: [{
    name: 'Nina',
    age: 25,
    children: [{
      name: 'Andray',
      age: 3
    }, {
      name: 'Oleg',
      age: 1
    }]
  }, {
    name: 'Aleksandr',
    age: 22
  }]
};
console.log(sumAge(user));
console.log(sumAge2(user));
console.log(sumAge3(user)); // * =========================================================================

/*
Написать функцию создания генератора. Возвращает другуюфункцию-генератор, которая при каждом
вызове дает число на шаг больше, и так до бесконечности. Начальное число, с которого начинается отсчет
, и шаг, задается при создании генератора. Шаг можно не указывать, тогда шаг будет 1.
Начальное значение по умолчанию равно 0. Генераторов можно создавать сколько угодно.
*/
// ! ЗАМЫКАНИЕ

function sequence() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var sum = val;
  return function () {
    sum += step;
    return sum - step;
  };
}

var generator = sequence(10, 3);
var generator2 = sequence(7, 1);
console.log(generator()); // 10

console.log(generator()); // 13

console.log(generator2()); // 7

console.log(generator()); // 16

console.log(generator2()); // 8