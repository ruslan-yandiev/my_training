/*
В функцию передается строка в которой находятся круглые скобки, функция должна возвращать правду если скобки парные
(открывающие и закрывающие), а также порядок открывающих и закрывающих скобок верно соблюден
*/
function validParentheses(str) {
    if (str.length % 2 !== 0) {
        return false;
    }

    let count = 0;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            count++;
        } else {
            count--;
        }

        if (count < 0) return false;
    }

    return !count;
}

function validParentheses(str) {
    let detect = 0;

    for (let i = 0; i < str.length; i++) {
        if (detect <= 0 && str[i] === ')') return false;
        if (str[i] === '(') detect += 1;
        if (str[i] === ')') detect -= 1;
    }

    return detect === 0;
}

console.log(validParentheses('()')); // true
console.log(validParentheses('())')); // false
console.log(validParentheses('())(')); // false
console.log(validParentheses('(())')); // true


function validParentheses(str) {
    let detect = 0;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            detect += 1;
        } else {
            detect -= 1;
        }

        if (detect < 0) return false;
    }

    return true;
}

console.log(validParentheses('()')); // true
console.log(validParentheses('())')); // false
console.log(validParentheses('())(')); // false
console.log(validParentheses('(())')); // true
// * ===================================================================
/*
реализовать функцию, она должна работать как в примере.
функция считает среднее значение суммы деленное на количсетво переданных
рейтингов, результат должен округляться до ближайшего целого числа.
*/
function rate() {
    let count = 0;
    let sum = 0;

    return function (arg) {
        count += 1;
        sum += arg;
        return Math.round(sum / count);
    };
}

const setRate = rate();
console.log(setRate(5)); // 5 === 5 / 1
console.log(setRate(3)); // 4 === (5 + 3) / 2
console.log(setRate(4)); // 4 === (5 + 3 + 4) / 3
console.log(setRate(0)); // 3 === (5 + 3 + 4 + 0) / 4

/* ===============================================
/*
Реализовать метод sum
*/
// для любого созданного объекта массива в программе
Array.prototype.sum = function () {
    return this.reduce((accum, elem) => accum + elem);
};

const arr = [1, 2, 3, 4, 5];
const sum = arr.sum();
console.log(sum);

// только для одного массива arr
arr.sum2 = function () {
    return this.reduce((accum, elem) => accum + elem);
};
const sum2 = arr.sum2();
console.log(sum2);
const arr2 = [1, 2, 3, 4, 5];
console.log(arr2.sum()); // 15
// console.log(arr2.sum2()); //  arr2.sum2 is not a function

// * ========================================================================
/*
Реализовать функцию func в функциональном стиле. Функция принимает массив, необходимо
из функции вернуть максимальное количество одинаковых элементов.
*/
function func(arr) {
    // Функциональный стиль
    return Object.values(
        arr.reduce((accum, elem) => {
            accum[elem] = accum[elem] ? accum[elem] + 1 : 1;
            return accum;
        }, {}),
    ).find((a, b) => a > b);

    // Функциональный стиль вариант 2
    // return Math.max(...Object.values(arr.reduce((accum, elem) => {
    // 	accum[elem] = (accum[elem]) ? accum[elem] + 1 : 1;
    // 	return accum
    // }, {})))

    // TODO императивное решение
    // let value = 0;
    // let result = 0;

    // for (let i = 0; i < arr.length; i++) {
    // 	for (let j = 0; j < arr.length; j++) {
    // 		if (arr[i] === arr[j]) {
    // 			value += 1;
    // 		}
    // 	}
    // 	if (value > result) {
    // 		result = value;
    // 	}
    // 	value = 0;
    // }

    // return result;
}

// function func(arr) {
//     let obj = {};

//     arr.forEach((el) => obj[el] === undefined ? obj[el] = 1 : obj[el] += 1);

//     let result = 1;

//     for (let key in obj) {
//         if (result < obj[key]) result = obj[key];
//     }

//     return result;
// }

// console.log(func([0, 1, 3, 0, 0, 9])); // 3
// console.log(func([2, 13, 5, 9, 7])); // 1

function func(arr) {
    return Math.max(
        ...Object.values(
            arr.reduce((obj, elem) => {
                if (elem.toString() in obj) {
                    obj[elem] += 1;
                } else {
                    obj[elem] = 1;
                }
                return obj;
            }, {}),
        ),
    );
}

console.log(func([0, 1, 3, 0, 0, 9])); // 3
console.log(func([2, 13, 5, 9, 7])); // 1

function func(arr) {
    let size;

    return arr.reduce((count, el, index) =>  {
        size = arr.filter((e) => e === el).length;

        return size > count ? count = size : count;
    }, 1);
}

console.log(func([0, 1, 3, 0, 0, 9])); // 3
console.log(func([2, 13, 5, 9, 7])); // 1


function func(arr) {
    return arr.reduce((count, el, index) =>  arr.filter((e) => e === el).length > count ? count = arr.filter((e) => e === el).length : count, 1);
}

console.log(func([0, 1, 3, 0, 0, 9])); // 3
console.log(func([2, 13, 5, 9, 7])); // 1

/*
	* 1) shadow-dom - это у элемента может быть свой теневой дом в котором есть свои div и стили которые не выходят за приделы этого элемента
		* это веб технология для определения области видимости переменных css и веб компонентов

	* 2) LIFO и FIFO - LIFO(последний пришел, первый ушел (СТЕК)) когда вызываем функцию, внутри нее вызываем другую функцию и в нутри нее вызываем другую функцию, то вызовы будут изнутри на ружу
		*    FIFO(первый пришел, первый ушел (ОЧЕРЕДЬ)) класитческая очередь f1().f2().f3() f1 первый вернет результат выполнения и далее по очереди.

	* 3) Что такое полифилл - помогает сделать нам доступные свойства для разных браузеров.

	* 4) Что такое CDN - это специальный сервер который используется для уменьшения времени загрузки данных. На пример загрузка гугл шрифтов, если на пример клиент очень далеко от основного сервера
		* то сервер может перенаправить клиента для загрузки крупных данных на ближайший к клиенту CDN сервер и подгружать эти данные к клиенту с него.

	* 5) Web-worker - это фактически полноценный отдельный поток помогающий загружать или выполнять какуюто работу (сложные вещи) в браузере в реальном времени не подвисая страницу.
		* это отдельный скрипт запускаемый в отдельном потоке, на заднем фоне не тормозястраницу и работает на заднем плане.
*/
