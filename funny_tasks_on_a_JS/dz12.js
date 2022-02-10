/*
Функция принимает строку и два числа. Функция должна возвращать строку, но в строке должна быть
перевернута строка от индекса первого числа до второго числа.
*/
function reverse(str, from, to) {
    const arr = str.split('');
    const arr2 = arr.slice(from, to + 1).reverse();
    arr.splice(from, arr2.length, ...arr2).join('');
    return arr.join('');
}

console.log(reverse('mockinterview', 1, 5)); // 'mnikcoterview' - перевернуто "ocrin"
console.log(reverse('codingIsFun', 2, 100)); // 'conuFsIgnid' - перевернуто 'dingIsFun'

// вариант 2
function reverse2(str, from, to) {
    const arr = [...str].splice(from, to);
    return str.replace(arr.join(''), arr.reverse().join(''));
}

console.log(reverse2('mockinterview', 1, 5)); // 'mnikcoterview' - перевернуто "ocrin"
console.log(reverse2('codingIsFun', 2, 100)); // 'conuFsIgnid' - перевернуто 'dingIsFun'

function reverse(str, num1, num2) {
    let str2 = [...str.substring(num1, num2)].reverse().join('');
    let result = '';

    for (let i = 0; i < str.length; i++) {
        if (i === num1) {
            result += str2;
            i = num2;
        } else {
            result += str[i];
        }
    }

    return result;
}

console.log(reverse('mockinterview', 1, 5)); // 'mnikcoterview' - перевернуто "ocrin"
console.log(reverse('codingIsFun', 2, 100)); // 'conuFsIgnid' - перевернуто 'dingIsFun'

// * =========================================================================================
/*
В функцию передается строка, нужно вкрнуть перевернутую строку, однако все пробелы должны оставаться
на своих местах.
*/
function reverseA(str) {
    const pointArrIndex = [];
    const arr = str.split('');

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === ' ') {
            pointArrIndex.push(i);
        }
    }

    arr.reverse().filter((elem) => {
        if (elem === ' ') {
            arr.splice(arr.indexOf(elem), 1);
        }
    });

    for (let i = 0; i < pointArrIndex.length; i++) {
        arr.splice(pointArrIndex[i], 0, ' ');
    }

    return arr.join('');
}

console.log(reverseA('привет')); // 'тевирп'
console.log(reverseA('Как дела?')); // "?ал едкаК"
console.log(reverseA('Как дела Антон? Я'));

// вариант два
function reverseB(str) {
    // взяли в массив все символы кроме пробелов
    const arr = [...str].filter((x) => x !== ' ');
    // а далее возвращаем строку где заменяем все непробельные символы на то что вернет функция
    return str.replace(/\S/g, () => arr.pop());
}

console.log(reverseB('привет')); // 'тевирп'
console.log(reverseB('Как дела?')); // "?ал едкаК"
console.log(reverseB('Как дела Антон? Я'));

function reverse(str) {
    let myIndex = [...str].reduce((arr, el, i) => {
        if (el === ' ') {
            arr.push(i);
        }

        return arr;
    }, []);

    let arr = [...str.split(' ').join('')].reverse();

    for (let i = 0; i < myIndex.length; i++) {
        arr.splice(myIndex[i], 0, ' ');
    }

    return arr.join('');
}

console.log(reverse('привет'));
console.log(reverse('Как дела брат?'));


function reverseA(str) {
    let indexProb = [...str].reduce((arr, el, index) => {
        if (el === ' ') arr.push(index);
        return arr;
    }, []);

    str = [...str].reverse().reduce((arr, el) => {
        if (el !== ' ') arr.push(el);
        return arr;
    }, []);

    indexProb.forEach((el) => str.splice(el, 0, ' '));

    return str.join('');
}

console.log(reverseA('привет')); // 'тевирп'
console.log(reverseA('Как дела?')); // "?ал едкаК"
console.log(reverseA('Как дела Антон? Я'));

// * ==================================================================
/*
Функция принимает двумерный массив чисел. Определить, сколько раз встречается
цифра 7 среди элементов двумерного массива. Функцию необходимо реализовать в
функциональном стиле
*/
function f(arr) {
    // схлопнем в один массив все вложенные массивы, объеденим в одну строку, разобъем строку по элементам и пройдемся reduce -ом
    return [].concat
        .apply([], arr)
        .join('')
        .split('')
        .reduce((accum, elem) => {
            if (elem === '7') {
                accum += 1;
            }
            return accum;
        }, 0);
}

function f(arr) {
    return [...arr.flat(Infinity).join('')].reduce((sum, el) => (+el === 7 ? sum + 1 : sum), 0);
}

function f(arr) {
    return [...arr.flat(Infinity).join('')].filter((el) => el === '7').length;
}

const arr = [
    [4, 7.7, 81.4],
    [-17, 4.8, 171],
    [15, 2.27, -3],
];

console.log(f(arr)); // 5

// * ===================================================================================
/*
Дана кнопка и span в html, необходимо в is добавить обработчик события с замыканием (без глобальных переменных).
Обработчик события должен при клике на кнопку добавлять в span одно случайное неповторяющееся
целое число от 1 включительно до 10 включительно через зяпятую. Если все числа уже
были выведены, обработчик должен вывести "конец." и снять обработчик события.
*/
// ! Лучший вариант решения
const btn = document.querySelector('#my-btn');
const span = document.querySelector('span');

btn.addEventListener('click', (() => {
    const detect = new Set();
    let randNum;

    const rand = () => Math.floor(Math.random() * 10) + 1;

    return function f() {
        randNum = rand();

        for (let i = 0; detect.has(randNum); i++) {
            randNum = rand();
        }

        detect.add(randNum);
        span.textContent += randNum + ',';

        if (detect.size ===  10) {
            span.textContent += ' КОНЕЦ';
            btn.removeEventListener('click', f);
        }
    }
})());


// Вариант 4
const btn = document.querySelector('#my-btn');
const span = document.querySelector('span');

btn.addEventListener('click', function f() {
    const detectArr = span.textContent.split(',');
    let randNum;

    const rand = () => { 
        randNum = Math.floor(Math.random() * 10) + 1;
        if (detectArr.includes(randNum.toString())) rand();
    }
    
    rand();
    span.textContent += randNum + ',';

    if (detectArr.length ===  10) {
        span.textContent += ' КОНЕЦ';
        btn.removeEventListener('click', f);
    }
});


// вариант 3
(function () {
    const btn = document.querySelector('#my-btn');
    const span = document.querySelector('span');
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let size = arr.length;

    function start() {
        let randNum = Math.floor(Math.random() * (size - 0));
        span.textContent += arr[randNum] + ',';
        arr.splice(randNum, 1);
        size -= 1;
    
        if (!arr.length) {
            span.textContent += ' КОНЕЦ';
            btn.removeEventListener('click', start);
        }
    }

    btn.addEventListener('click', start);
})();

// вариант 1
// document.querySelector('button').addEventListener('click', () => {
// 	let span = document.querySelector('span');
// 	let rand;
// 	const arr = [];
// 	start();

// 	document.querySelector('button').addEventListener('click', function myFunction() {
// 		if (arr.length === 10) {
// 			span.textContent += ' конец.';
// 			this.removeEventListener("click", myFunction);
// 			return;
// 		}

// 		start();
// 	});

// 	function start() {
// 		function randoms() {
// 			// случайное целое число от минимального включительно и до максимального включительно
// 			return Math.floor(Math.random() * 10) + 1;
// 		}

// 		rand = randoms();

// 		while(arr.includes(rand)) {
// 			rand = randoms();
// 		}

// 		arr.push(rand);

// 		span.textContent = arr.join(',');
// 	}
// }, {once: true});

// // вариант 2
document.querySelector('button').addEventListener(
    'click',
    (() => {
        let span = document.querySelector('span');
        let rand;
        const arr = [];

        const start = () => {
            if (arr.length === 10) {
                span.textContent += ' конец.';
                this.removeEventListener('click', start);
                return;
            }

            function randoms() {
                // случайное целое число от минимального включительно и до максимального включительно
                return Math.floor(Math.random() * 10) + 1;
            }

            rand = randoms();

            while (arr.includes(rand)) {
                rand = randoms();
            }

            arr.push(rand);

            span.textContent = arr.join(',');
        };

        return start;
    })(),
);

/*
	* 1) zz = 99 // при 'use strict' будет ошибка, а иначе будет присвоено глобальному window.zz = 99
		* console.log(zz);
	
	* 2) Какой селектор использовать для выбора input'ов с типом radio? - input[type="radio"] можем по присваивать стили как всем тегам так и отсеять по одному из атрибутов

	* 3) Спрайты, что это такое? - Когда есть к примеру множество картинок смайликов и для оптимизации загрузки
		* объединим картинки в одну большую картинку из множества смайлов и стилями выберем нужный нам смайл по пикселям

	* 4) Как получить url в чистом javascript? - а) document.URL   b) window.location.href

	* 5)  Что такое IIFE? - когда делаем самовызывающуюся функцию обернув ее (код функции)() и ее самовызов.

	* 6) package-lock.json для чего он нужен? - при работе с npm, будет хранить все покеты версий которые мы подтягивали
		* чтобы при командной разработки можно будет согласовать одни и те же версии библиотек
		* То есть хранин все версии подтянутых библиотек и все зовисимости между друг другом
*/
