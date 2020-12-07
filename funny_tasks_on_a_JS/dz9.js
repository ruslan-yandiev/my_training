/*
Функция принимает две строки, необходимо вернуть из функции строку, в которой
будет записана меньшая строка, затем большая строка, затем снова меньшая.
*/

function func(a, b) {
    if (a > b) {
        return b + a + b;
    } else {
        return a + b + a;
    }
}
console.log(func('1', '22')); // '1221'
console.log(func('22', '1')); // '1221'

// * ============================================================================================
/*
В функцию передается массив с целыми числами, необходимо реализовать функцию
так, чтобы она возвращала сумму квадратных корней для всех четных чисел переданного массива
*/
function func2(arr) {
    return arr.reduce((accum, elem) => {
        if (elem % 2 === 0 && elem !== 0) {
            let a = 0;
            let b = elem;

            while (b !== 1) {
                a += 1;
                b /= 2;
            }
            accum += a;
        }
        return accum;
    }, 0); // ! незабыть указать, что accum должен изначально быть 0, а не значением первого элемента из массива!
}
console.log(func2([3, 4, 9, 16, 1, 0])); //6

function func3(arr) {
    return arr.reduce((accum, elem) => {
        if (elem % 2 === 0) {
            accum += Math.sqrt(elem); // еще проще получить квадратный корень с помощью мат объекта Math
        }
        return accum;
    }, 0); // ! незабыть указать, что accum должен изначально быть 0, а не значением первого элемента из массива!
}
console.log(func3([3, 4, 9, 16, 1, 0])); //6

// * ============================================================================================
/*
Функция принимает массив объектов, необходимо вернуть из
функции отсортированный массив в возвращающем порядке по значению свойства val объектов массива, 
при этом в возвращающем значении не должно присутсчтвовать объекты, которые имеют отрицательное значение val
*/

function sort(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].val < 0) {
            arr.splice(i, 1);
            i--;
        } else {
            for (
                let a = i;
                arr[a - 1] !== undefined && arr[a - 1].val > arr[a].val;
                a--
            ) {
                [arr[a - 1], arr[a]] = [arr[a], arr[a - 1]];
            }
        }
    }

    return arr;
}

let arr = [
    { id: 24, val: 5 },
    { id: 13, val: -17 },
    { id: 13, val: 98 },
    { id: 13, val: 2 },
    { id: 13, val: -1 },
    { id: 13, val: -19 },
    { id: 13, val: 117 },
    { id: 13, val: 333 },
    { id: 13, val: 1 },
    { id: 13, val: 0 },
];

console.log(sort(arr));

function sort2(arr) {
    return arr.filter((i) => i.val >= 0).sort((a, b) => a.val - b.val);
}

console.log(sort2(arr));

// * ============================================================================================
function func() {
    console.log(this);
}

const person = {
    name: 'Andray',
};

func.bind(person)(); // с помощью бинд принудительно задали контекст вызова функции в рамках объекта person, а не Window
func(); // контекст вызова  Window если не задан 'use strict' иначе undefined
const bindedFunct = func.bind(person); // забиндили контекст вызова функции и сохранили эту функцию с этим контекстом в новой переменной, для повторного использования
bindedFunct(); // контекст person

/*
    ! ВОПРОС с СОБЕСЕДОВАНИЙ
    ! реализуйте свой вариант функции bind самостоятельно!
*/
const bind = (fn, context, ...boundArgs) => (...args) =>
    fn.apply(context, [...boundArgs, ...args]);

// Пример:
function greeting(greeting, punctuation) {
    return `${greeting} ${this.userName}${punctuation}`;
}

const alex = { userName: 'Alex' };
const alexBound = bind(greeting, alex);

console.log(alexBound('Hello', '!')); // 'Hello Alex!'

// ! второй вариант
const bind2 = (fn, context, ...rest) => {
    return (...args) => {
        const uniqId = Date.now().toString();

        context[uniqId] = fn;

        //  concat объединяет массивы
        const result = context[uniqId](...rest.concat(args));

        delete context[uniqId];

        return result;
    };
};
// Пример:
function greeting2(greeting, punctuation) {
    return `${greeting} ${this.userName}${punctuation}`;
}

const alex2 = { userName: 'Alex2' };
const alexBound2 = bind2(greeting2, alex2);

console.log(alexBound2('Hello', '!')); // 'Hello Alex2!'
