/*
Написать функцию которая будет принимать строку на английском и заменять гласные
буквы на цифры, функция вернет строку с но уже с замененными гласными буквами.

a -> 1
e -> 2
....

Реализовать функцию дешефратора, принимает зашифрованную строку и возвращает расшифрованную
*/

function encode(str) {
    let arr = str.split('');
    let letter = { a: 1, e: 2, i: 3, o: 4, u: 5, y: 6 };

    for (key in letter) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === key) {
                arr[i] = letter[key];
            }
        }
    }
    return arr.join('');
}

function decode(str) {
    let arr = str.split('');
    const letter = { a: 1, e: 2, i: 3, o: 4, u: 5, y: 6 };

    for (key in letter) {
        for (let i = 0; i < arr.length; i++) {
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
    if (num === undefined) {
        return 0;
    }

    let sum = num;

    return function f(arg) {
        if (arg === undefined) {
            return sum;
        }

        sum += arg;
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
function sumAge(user) {
    let sum = user.age;

    user.children.forEach((elem) => {
        sum += elem.age;

        if (elem.children) {
            elem.children.forEach((el) => {
                sum += el.age;
            });
        }
    });

    return sum;
}

const user = {
    name: 'Петр',
    age: 49,
    children: [
        {
            name: 'Nina',
            age: 25,
            children: [
                {
                    name: 'Andray',
                    age: 3,
                },
                {
                    name: 'Oleg',
                    age: 1,
                },
            ],
        },
        {
            name: 'Aleksandr',
            age: 22,
        },
    ],
};

console.log(sumAge(user));

// * =========================================================================
/*
Написать функцию создания генератора. Возвращает другуюфункцию-генератор, которая при каждом
вызове дает число на шаг больше, и так до бесконечности. Начальное число, с которого начинается отсчет
, и шаг, задается при создании генератора. Шаг можно не указывать, тогда шаг будет 1.
Начальное значение по умолчанию равно 0. Генераторов можно создавать сколько угодно.
*/
// ! ЗАМЫКАНИЕ
function sequence(val = 0, step = 1) {
    let sum = val;

    return function () {
        sum += step;
        return sum - step;
    };
}

const generator = sequence(10, 3);
const generator2 = sequence(7, 1);

console.log(generator()); // 10
console.log(generator()); // 13

console.log(generator2()); // 7

console.log(generator()); // 16

console.log(generator2()); // 8
