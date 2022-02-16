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
/*
Даны две строки.
Написать функцию, которая вернёт True, если из первой строки можно получить вторую, совершив не более 1 изменения 
(== удаление / замена символа).
*/

//! собес #20
/*
! Функция генератор
Напиши функцию создания генератора sequence(start, step). Она при вызове возвращает другую функцию-генератор, 
которая при каждом вызове дает число на 1 больше, и так до бесконечности. Начальное число, с которого начинать отсчет, и шаг, 
задается при создании генератора. Шаг можно не указывать, тогда он будет равен одному. 
Начальное значение по умолчанию равно 0. Генераторов можно создать сколько угодно.
*/
function sequence(start = 0, step = 1) {
    return function () {
        start += step;
        return start - step;
    }
}

var generator = sequence(10, 3);
var generator2 = sequence(7, 1);

console.log(generator()); // 10
console.log(generator()); // 13

console.log(generator2()); // 7

console.log(generator()); // 16

console.log(generator2()); // 8
// =============================================================================
/*
Также, нужна функция take(gen, x) которая вызвает функцию gen заданное число (x) раз и 
возвращает массив с результатами вызовов. Она нам пригодится для отладки:
*/
function take(f, count) {
    const result = [];

    for (let i = 0; i < count; i++) {
        result.push(f());
    }

    return result;
}

var gen2 = sequence(0, 2);
console.log(take(gen2, 5)); // [0, 2, 4, 6, 8 ]
// =================================================================================
/*
Напиши функцию map(fn, array), которая принимает на вход функцию и массив, 
и обрабатывает каждый элемент массива этой функцией, возвращая новый массив. Пример:
function square(x) { return x * x; } // возведение в квадрат
console.log(map(square, [1, 2, 3, 4])); // [1, 4, 9, 16]
console.log(map(square, [])); // []
*/
function map(f, arr) {
    return arr.reduce((acc, el) => {
        acc.push(f(el));
        return acc;
    }, [])
}

function square(x) { return x * x; } // возведение в квадрат
console.log(map(square, [1, 2, 3, 4])); // [1, 4, 9, 16]
console.log(map(square, [])); // []
// ===================================================================================
/*
Напиши функцию fmap(a, gen), которая принимает на вход 2 функции, a и gen, где gen — функция-генератор вроде той, 
что была в первом задании. fmap возвращает новую функцию-генератор, 
которая при каждом вызове берет следующее значение из gen и пропускает его через функцию a. Пример:
*/
function fmap(f1, fGen) {
    return function () {
        return arguments.length ? f1(fGen(...arguments)) : f1(fGen());
    }
    return function (...arg) {
        return arg.length ? f1(fGen(...arg)) : f1(fGen());
    }
}

var gen = sequence(1, 1);
function square(x) { return x * x; }
var squareGen = fmap(square, gen);

console.log(squareGen()); // 1
console.log(squareGen()); // 4
console.log(squareGen()); // 9
console.log(squareGen()); // 16
// ===================================================================================
/*
А, еще, сделай тогда, чтобы в качестве gen можно было указать функцию с аргументами, и при вызове
*/
function add(a, b) { 
    return a + b; 
}

// Мы получаем новую функцию, которая вызвает add, и результат пропускает через функцию square
var squareAdd = fmap(square, add);
console.log(squareAdd(2, 3)); // 25 = (2 + 3) ^ 2
console.log(squareAdd(5, 7)); // 144 = (5 + 7) ^ 2
// ===================================================================================
/*
Напиши функцию partial(fn, a1, a2, ....), которая позволяет зафиксировать один или несколько аргументов функции. Пример:
*/
function partial(f, ...nums) {
    return function () {
        return f(...nums, ...arguments);
    }
}

function add(a, b) { return a + b; }
function mult(a, b, c, d) { return a * b * c * d; }

var add5 = partial(add, 5); // Мы получили функцию с 1 аргументом, которая прибавляет к любому числу 5

console.log(add5(2)); // 7
console.log(add5(10)); // 15
console.log(add5(8)); // 13

var mult23 = partial(mult, 2, 3); // мы зафиксировали первые 2 аргумента mult() как 2 и 3

console.log(mult23(4, 5)); // 2*3*4*5 = 120
console.log(mult23(1, 1)); // 2*3*1*1 = 6
// ===================================================================================
/*
Наша функция partial позволяет фиксировать только первые аргументы. Усовершенствуй ее, чтобы зафиксировать можно было любые аргументы, пропущенные аргументы обозначаются с помощью undefined. 
Обрати внимание, что теперь мы переименовали ее в partialAny, чтобы не путать с предыдущей::
*/
function partialAny(f, ...nums) {
    return function () {
        nums = nums.reduce((arr, el) => {
            el === undefined ? arr.push(...arguments) : arr.push(el);
            return arr;
        }, []);

        return f(...nums, ...arguments);
    }
}

function test(a, b, c) { return 'a=' + a + ',b=' + b + ',c=' + c; }
var test1_3 = partialAny(test, 1, undefined, 3);
console.log(test1_3(5)); // a=1,b=5,c=3
// =================================================================================
/*
напиши функцию pluck, которая берет массив объектов и возвращает массив значений определенного поля:
*/
var characters = [
    { 'name': 'barney', 'age': 36 },
    { 'name': 'fred', 'age': 40 }
  ];

function pluck(arr, fild) {
    return arr.map((el) => el[fild])
}
  
  console.log(pluck(characters, 'name')); // ['barney', 'fred']
// =================================================================================
/*
напиши функцию filter, которая принимает функцию-предикат и массив. 
Возвращает она массив значений, для которых предикат вернет true.
*/
function filter(arr, f) {
    return arr.reduce((acc, el) => {
        if (f(el)) acc.push(el);
        return acc;
    }, []);
}

var input = [1, 2, 3, 4, 5, 6];
function isEven(x) { return x % 2 == 0; } // проверяет на четность
console.log(filter(input, isEven)); // [2, 4, 6]
// =================================================================================
/*
Напиши функцию, считающую число свойств в объекте:
*/
function count(obj) {
    return Object.keys(obj).length;
}

var a = { a: 1, b: 2 };
console.log(count(a)); // 2
var b = function () {};
console.log(count(b)); // 0
var c = [1, 2, 3];
console.log(count(c)); // 3
var d = [];
d[100] = 1;
console.log(count(d)); // 1
// =================================================================================
/*
Напиши функцию глубокого копирования объектов и массивов. Она должна делать не только копию переданного объекта/массива, 
но и копии вложенных них объектов/массивов. Также, копироваться должны объекты встроенного в JS конструктора Date
*/
function deepCopy(obj) {
    const result =  Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            result[key] = [...deepCopy(obj[key])];
        } else if (obj[key] instanceof Date) {
            result[key] = new Date(obj[key]);
        } else if (obj[key] === null) {
            result[key] = obj[key];
        } else if (typeof obj[key] === 'object') {
            result[key] = deepCopy(obj[key]);
        } else if (typeof obj[key] === 'function') {
            result[key] = obj[key].bind(result);
        } else {
            result[key] = obj[key];
        }
    }

    return result;
}

var a = { x: 1, y: 2, z: [1, 2, 3, {a:1, b: 2}, [9, 8, function(a, b) {return a + b}, 7, [10, {a: 10, b:11}, 11, null, undefined]]], u: undefined, v: null, w: new Date(2014, 1, 1, 12, 0, 0), f() {return 'Hi'}};
var b = deepCopy(a); // b — это отдельный объект
b.x = 10;
console.log(a.x); // 1

// a.z и b.z указывают на разные массивы: 
b.z.push(4);
console.log(a.z); // [1, 2, 3]
console.log(b.z[4][2](1, 1));
console.log(b.z[4][4][3]); // null
console.log(b.u); // undefined
console.log(b.f());
console.log(b.f === a.f); // false
// a.w и b.w независимы друг от друга
b.w.setFullYear(2015);
console.log(b.w);
console.log(a.w.getFullYear()); // 2014





















