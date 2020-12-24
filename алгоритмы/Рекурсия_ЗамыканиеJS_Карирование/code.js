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

// * ========================================================================
// Замыкание
function f() {
    let sum = 0;

    return function () {
        return (sum += 3);
    };
}
let a = f();
console.log(a()); // 3
console.log(a()); // 6
console.log(a()); // 9

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

// * ====================================================================

/*
Функция принимает строку, на английском, возвращает массив, содержащий все возможные комбинации букв.
не должно быть повторяющихся строк в массиве.
*/
// ! итеративная функция использующая РЕКУРСИВНЫЙ подход.
function getLettersVariants(str) {
    if (str.length === 1) {
        return [str];
    }

    const arr = [str];

    function start(strArr) {
        for (let i = 0; i < strArr.length - 1; i++) {
            for (let j = i + 1; j < strArr.length; j++) {
                [strArr[i], strArr[j]] = [strArr[j], strArr[i]];

                if (arr.includes(strArr.join(''))) {
                    return arr;
                }

                arr.push(strArr.join(''));
            }
        }

        return start(strArr);
    }

    return start(str.split(''));
}
console.log(getLettersVariants('asd')); // ['asd', 'ads', 'sad', 'das', 'dsa', 'sda']
// ? Вторым способом можно было бы решить с помощью бесконечного цикла (while) и счетчиками, которые обнуляются по достижению
// ? определенного значения от размера массива, и повторять до тех пор пока не встретится повтор.


// * ======================================================================================
/*
n! означает n * (n - 1) * ... * 3 * 2 * 1
Например, 10! = 10 * 9 * ... * 3 * 2 * 1 = 3628800, сумма цифр в полученном
числе 10! равна 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
Найдите сумму цифр в числе 100.
Решение не должно использовать циклы, необходимо использовать методы массивов
*/
// ! Используем РЕКУРСИЮ (итеративная функция с рекурсивным подходом)
// ! Используем РЕКУРСИЮ (итеративная функция с рекурсивным подходом)
// ! Используем РЕКУРСИЮ (итеративная функция с рекурсивным подходом)
// ! Используем РЕКУРСИЮ (итеративная функция с рекурсивным подходом)
function myCalc(num) {
    function myRecurs(arg) {
        // ! при не строгом сравнении BigInt равен number, а при строгом нет, так как это два разных примитивных типа данных
        if (arg == 1) {
            return arg;
        }
        // ! вычитать, прибавлять, делить и усножать можно только BigInt с BigInt и нельзя между BigInt и number
        return arg * myRecurs(arg - BigInt(1));
    }

    // ! пришлось в рекурсию передать преобразованное чило в BigInt, так-как уж слишком большие числа будут возвращены, а затем преобразовать в строку в десятичной системе счислений
    return (BigInt(num) * myRecurs(BigInt(num - 1)))
        .toString(10)
        .split('')
        .reduce((accum, elem) => +accum + +elem);
}

console.log(myCalc(100)); // 648


// * ==========================================================================
// ! с реального сабеса в крупную компанию
/*
Функция принимает массив банеров (объектов как в примере) и число, обозначающее количество банеров,
которое нужно выбрать из массива. Необходимо реализовать функцию так, чтобы функция выбирала переданное
количество случайных банеров (банеры уникальны, не должны повторяться в результате), учитывая их вес
(свойство weight в объектах банеров). Чем больший вес имеет банер, тем больше шансов того, что этот банер
должен быть выбран.
Если массив банеров содержит меньше или столько же элементов, сколькко было запрошено, то функция должна
вернуть все элементы массива.
*/
function selectBanners(banners, count) {
    if (count >= banners.length) return [...banners];

    const bannersWeight = [];

    const allSumWeight = banners.reduce((accum, banner) => {
        bannersWeight.push(accum + banner.weight);
        return accum + banner.weight;
    }, 0); // можем задать чему будет равень изначально accum, иначе он будет равен первому элементу и сложется со вторым

    const arr = new Set();

    while (arr.size < count) {
        const rand = Math.random() * allSumWeight;
        const findind = banners.findIndex((item, index) => {
            return bannersWeight[index] >= rand;
        });
        arr.add(banners[findind]);
    }

    return [...arr];
}

// const banners = [
//     { id: 2, weight: 10 },
//     { id: 4, weight: 5 },
//     { id: 8, weight: 15 },
//     { id: 22, weight: 18 },
//     { id: 41, weight: 41 },
//     { id: 53, weight: 1 },
//     { id: 69, weight: 9 },
// ];

// console.log(selectBanners(banners, 3));

console.log(
    selectBanners(
        [
            { id: 1, weight: 1 },
            { id: 2, weight: 1000 },
            { id: 3, weight: 1000 },
            { id: 4, weight: 1000 },
        ],
        2,
    ),
);

// * Мой вариант переделать!!!!
function selectBanners2(banners, count) {
    if (count >= banners.length) return [...banners];

    const arrResulte = [];
    let maxWeight = 0;
    let rand;

    for (let obj of banners) {
        if (obj.weight > maxWeight) {
            maxWeight = obj.weight;
        }
    }

    // Случайное целое число в диапазоне от 0 включительно и до максимального указанного числа включительно.
    rand = Math.floor(Math.random() * (maxWeight + 1));

    for (let i = 0; i < banners.length; i++) {
        if (banners[i].weight >= rand) {
            arrResulte.push(banners[i]);
            banners.splice(banners[i], 1);
            i--;
        }
    }

    if (arrResulte.length < count) {
        selectBanners2(banners, count).forEach((elem) => {
            if (!arrResulte.find((e) => e.id === elem.id)) {
                arrResulte.push(elem);
            }
        });
    }

    while (arrResulte.length > count) {
        // рандомное значение индекса
        rand = Math.floor(Math.random() * (arrResulte.length + 1));
        arrResulte.splice(rand, 1);
    }

    return arrResulte;
}

// const banners = [
//     { id: 2, weight: 10 },
//     { id: 4, weight: 5 },
//     { id: 8, weight: 15 },
//     { id: 22, weight: 18 },
//     { id: 41, weight: 41 },
//     { id: 53, weight: 1 },
//     { id: 69, weight: 9 },
// ];

// console.log(selectBanners2(banners, 4));

console.log(
    selectBanners2(
        [
            { id: 1, weight: 1 },
            { id: 2, weight: 1000 },
            { id: 3, weight: 1000 },
            { id: 4, weight: 1000 },
        ],
        2,
    ),
);


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

// * ===================================================================
/*
реализовать функцию, она должна работать как в примере.
функция считает среднее значение суммы деленное на количсетво переданных
рейтингов, результат должен округляться до ближайшего целого числа.
*/
// Создадим замыкание
function rate() {
	let count = 0;
	let arr = [];

	return function(arg) {
		count += 1;
		arr.push(arg);
		return (arr.reduce((accum, elem) => accum + elem)) / count;
	}
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
Array.prototype.sum = function(){
	return this.reduce((accum, elem) => accum + elem);
};

const arr = [1, 2, 3, 4, 5];
const sum = arr.sum();
console.log(sum);

// только для одного массива arr
arr.sum2 = function() {
	return this.reduce((accum, elem) => accum + elem);
}
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
	return Object.values(arr.reduce((accum, elem) => {
		accum[elem] = (accum[elem]) ? accum[elem] + 1 : 1;
		return accum
	}, {})).find((a, b) => a > b);


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

console.log(func([0, 1, 3, 0, 0, 9])); // 3
console.log(func([2, 13, 5, 9, 7])); // 1


// * =================================================================================
// ! С РЕАЛЬНОГО СОБЕСЕДОВАНИЯ
/*
В функцию передается название города (как в примерах), функция должна
вернуть строку, которая показывает какие буквы и количество содержатся в строку.
*/
function getChars(city) {
	// ! регулярка replace (все, что не от а до я заменить на пустую строку)
	let arr = city.toLowerCase().replace(/[^а-я]+/g, '').split('');
	const obj = {};

	for (let i = 0; i < arr.length; i++) {
		Object.keys(obj).includes(arr[i]) ? obj[arr[i]] += '*' : obj[arr[i]] = `${arr[i]}:*`;
	}

	return Object.values(obj).join(',');
}

// "c:*,a:**,р:*,т:*,о:*,в:*"
console.log(getChars('Саратов'));

// "н:**,о:**,в:*,ы:*,й:**,у:*,р:*,е:*,г*:"
console.log(getChars('Новый Уренгой'));

// с:*,а:*,н*,к:*,т:**,п:*,е:**,р:**,б:*,у:*,г:*
console.log(getChars('Санкт-Петербург'));


// ! С РЕАЛЬНОГО СОБЕСЕДОВАНИЯ
/*
В функцию передается название города (как в примерах), функция должна
вернуть строку, которая показывает какие буквы и количество содержатся в строку.
*/
// В Функциональном стиле. Вариант 2
function getChars2(city) {
	return Object.values(city.toLowerCase().replace(/[^а-я]+/g, '').split('').reduce((accum, elem) => {
		Object.keys(accum).includes(elem) ? accum[elem] += '*' : accum[elem] = `${elem}:*`;
		return accum;
	}, {})).join(',');
}

// "c:*,a:**,р:*,т:*,о:*,в:*"
console.log(getChars2('Саратов'));

// "н:**,о:**,в:*,ы:*,й:**,у:*,р:*,е:*,г*:"
console.log(getChars2('Новый Уренгой'));

// с:*,а:*,н*,к:*,т:**,п:*,е:**,р:**,б:*,у:*,г:*
console.log(getChars2('Санкт-Петербург'));



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
			arr.splice(arr.indexOf(elem), 1)
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
	const arr = [...str].filter( x => x !== ' ');
	// а далее возвращаем строку где заменяем все непробельные символы на то что вернет функция
	return str.replace(/\S/g, () => arr.pop());
}

console.log(reverseB('привет')); // 'тевирп'
console.log(reverseB('Как дела?')); // "?ал едкаК"
console.log(reverseB('Как дела Антон? Я')); //

// * ==================================================================
/*
Функция принимает двумерный массив чисел. Определить, сколько раз встречается
цифра 7 среди элементов двумерного массива. Функцию необходимо реализовать в
функциональном стиле
*/
function f(arr) {
	// схлопнем в один массив все вложенные массивы, объеденим в одну строку, разобъем строку по элементам и пройдемся reduce -ом
	return [].concat.apply([], arr).join('').split('').reduce((accum, elem) => {
		if (elem === '7') {
			accum += 1;
		}
		return accum;
	}, 0);
}

const arr = [
	[4, 7.7, 81.4],
	[-17, 4.8, 171],
	[15, 2.27, -3]
];

console.log(f(arr)); // 5


// * ===================================================================================
/*
Дана кнопка и span в html, необходимо в is добавить обработчик события с замыканием (без глобальных переменных).
Обработчик события должен при клике на кнопку добавлять в span одно случайное неповторяющееся
целое число от 1 включительно до 10 включительно через зяпятую. Если все числа уже
были выведены, обработчик должен вывести "конец." и снять обработчик события.
*/
// // вариант 2
document.querySelector('button').addEventListener('click', (() => {
	let span = document.querySelector('span');
	let rand;
	const arr = [];

	const start = () => {

		if (arr.length === 10) {	
			span.textContent += ' конец.';
			this.removeEventListener("click", start);
			return;
		}


		function randoms() {
			// случайное целое число от минимального включительно и до максимального включительно
			return Math.floor(Math.random() * 10) + 1;
		}

		rand = randoms();

		while(arr.includes(rand)) {
			rand = randoms();
		}

		arr.push(rand);
		
		span.textContent = arr.join(',');
	}

	return start;
})());

// вариант 1
document.querySelector('button').addEventListener('click', () => {
	let span = document.querySelector('span');
	let rand;
	const arr = [];
	start();

	document.querySelector('button').addEventListener('click', function myFunction() {
		if (arr.length === 10) {	
			span.textContent += ' конец.';
			this.removeEventListener("click", myFunction);
			return;
		}

		start();
	});

	function start() {
		function randoms() {
			// случайное целое число от минимального включительно и до максимального включительно
			return Math.floor(Math.random() * 10) + 1;
		}

		rand = randoms();

		while(arr.includes(rand)) {
			rand = randoms();
		}

		arr.push(rand);
		
		span.textContent = arr.join(',');
	}
}, {once: true});



/*
Функция принимает число, функция должна вернуть маскимально число,
содержащее те цифры, что и в переданном числе. Если было передано некоректное число,
Вернуть NaN.
*/
function getMax(num) {
	if (typeof num !== 'number') {
		return NaN;
	}

	const arr = ('' + num).split('');
	let maxNum = 0;
	let result = '';

	arr.forEach(elem => {
		if (elem === '.') {
			arr.splice(arr.indexOf(elem), 1);
		}
	});

	while(arr.length > 0) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] > maxNum) {
				maxNum = arr[i];
			}
		}

		result += maxNum;
		arr.splice(arr.indexOf(maxNum), 1);
		maxNum = 0;
	}

	return result;
}

console.log(getMax(6118)); // 8611
console.log(getMax(17)); // 71
console.log(getMax(17.5)); // 751
console.log(getMax('Hi')); // NaN

// №2
function getMax2(num) {
	if (typeof num !== 'number') return NaN;

	return [...('' + num)].sort().reverse().reduce((accum, elem) => elem !== '.' ? accum += elem : accum += '');
}

console.log(getMax2(6118)); // 8611
console.log(getMax2(17)); // 71
console.log(getMax2(17.5)); // 751
console.log(getMax2('Hi')); // NaN

// №3
function getMax3(num) {
	return Number([...String(num)].sort((a, b) => b - a).join("")); // // коректно будет работать только в хроме
	// return [...('' + num)].sort((a, b) => b - a).join(''); //// коректно будет работать только в хроме
}

console.log(getMax3(6118)); // 8611
console.log(getMax3(17)); // 71
console.log(getMax3(17.5)); // 751 // коректно будет работать только в хроме
console.log(getMax3('Hi')); // NaN

// * ===========================================================================================
/*
Функция принимает строку, в которой содержатся буквы/цифры и может содержаться знак "#",
этот знак означает, что человек нажал backspace, то есть стёр предыдущий знак,
необходимо собрать получившуюся строку.
*/
function cleanString(s) {
	const arr = [...s];

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === '#') {
			arr.splice(i - 1, 2);
			i -= 2;
		}
	}

	return arr.join("");
}

console.log(cleanString('авб#г##д')); // "ад"
console.log(cleanString('Прив###ока')); // "Пока"

// №2
function cleanString2(s) {
	return [...s].reduce((accum, elem) => elem === '#' ? accum.slice(0, -1) : accum += elem, '');
}

console.log(cleanString2('авб#г##д')); // "ад"
console.log(cleanString2('Прив###ока')); // "Пока"


/*
Функция принимает массив, в котором записаны целые числа в возвращающем порядке.
Все числа в массиве должны возрастать на единицу, однако есть нарушения последовательности
и некоторые числа возрастают на большее значение, необходимо найти все числа и их индексы, которые нарушают
последовательность.
*/
function findNonConsecutive(arr) {
	const collectionObj = [];

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] + 1 < arr[i + 1]) {
			collectionObj.push({index: i + 1, number: arr[i + 1]});
		}
	}
	return collectionObj;
}

// [{index: 4, number: 6}, {imdex: 7, number: 10}]
console.log(findNonConsecutive([1, 2, 3, 4, 6, 7, 8, 10, 11]));

// №2
function findNonConsecutive2(arr) {
	return arr.reduce((accum, elem, index) => {
		if (elem > arr[index - 1] + 1) {
			accum.push({index: index, number: elem});
		}
		return accum;
	}, []);
}

// [{index: 4, number: 6}, {imdex: 7, number: 10}]
console.log(findNonConsecutive2([1, 2, 3, 4, 6, 7, 8, 10, 11]));


// * ==================================================================================
/*
Функция принимает массив чисел и должна вернуть сумму двух самых маленьких чисел в массиве.
// Методы массива нельзя использовать и нельзя сортировать и нельзя использовать больше одного цикла.
*/
function sumSmallest(arr) {
	let a = Infinity, b = Infinity;

	for (let elem of arr) {
		if (elem > a && elem < b) b = elem;
		if (elem <= a && elem <= b) [b, a] = [a, elem];
		if (elem < a) a = elem;
	}

	return a + b;
}

console.log(sumSmallest([5, 8, 12, 19, 22])); // 13
console.log(sumSmallest([15, 28, 4, 2, 43])); // 6
console.log(sumSmallest([5, 8, 12, 19, 22, 0, 3, 44, 32, 11, 1])); // 1
console.log(sumSmallest([5, 8, 12, 19, 22, 0, 3, 44, 32, 11, 0])); // 0

// * ====================================================================================
/*
Напишите функцию, которая вернет true, в случае если переданное в функцию число простое, иначе false.
Простое число - это натуральное число, имеющее ровно два два различных натуральных делителя - единицы и самого себя.
Число является простым если оно больше единицы, целое и делится без остатка только на 1 и на самого себя, но не на другие числа
*/
function isPrime(num) {
    if (num === 0 || num === 1 || typeof num !== 'number' || Number.isNaN(num)) {
        return false;
    }

    let detect = 0;

    for (let i = 1; i < num; i++) {
        if (num % i === 0) detect += 1;
        if (detect > 2) return false;
    }

    return true;
}

console.log(isPrime(12)); // false
console.log(isPrime(23)); // true
console.log(isPrime(1)); // false
console.log(isPrime(0)); // false
console.log(isPrime('1212')); // false
console.log(isPrime(NaN)); // false


// * ===================================================================================
/*
Функция принимает массив слов, а также искомое слово. Необходимо вернуть правду, если такое слово можно составить
из того пазоа, что передали внутрь функции, ложь, если такое слово невозможно составить.
1. Направление от букв должно быть влево, вправо, вниз, вверх. переходить с одного конца слова в другой конеу запрещено
2. В слове все символы должны быть уникальны, то есть нельзя из паззла использовать одну и ту же букву на том же самом месте.
Короче. Двигаться можно только к соседним буквам в двух направления вперед и назад, вверх и вниз.
*/
function findWord(puzzle, word) {
    const arr = [...puzzle.join('')],
        arrWord = [...word];

    let letter = arrWord.splice(0, 1)[0],
        step = arrWord.length - 1;

    while (arrWord.length > 0 && step > 0) {
        arr.find((elem, i) => {
            if (
                elem === letter &&
                (arr[i + 1] === arrWord[0] ||
                    arr[i - 1] === arrWord[0] ||
                    arr[i + 7] === arrWord[0] ||
                    arr[i - 7] === arrWord[0])
            ) {
                letter = arrWord.splice(0, 1)[0];
            }
        });
        step -= 1;
    }

    return arrWord.length === 0;
}

const puzzle = ['ANGULAR', 'REDNCAE', 'RFIDTCL', 'AGNEGSA', 'YTIRTSP'];

console.log(findWord(puzzle, 'ANGULAR')); //true
console.log(findWord(puzzle, 'REACT')); //true
console.log(findWord(puzzle, 'ARRAY')); //true
console.log(findWord(puzzle, 'UNDEFINED')); //true
console.log(findWord(puzzle, 'RED')); //true
console.log(findWord(puzzle, 'STRING')); //true
console.log(findWord(puzzle, 'CLASS')); //true
console.log(findWord(puzzle, 'FUNCTION')); //false
console.log(findWord(puzzle, 'NULL')); //false

/*
Верните максимальную прибыль от котировок акций. Котировки акций хранятся в
массиве по дате.Прибыль от акций - это разница в ценах на покупку и продажу
акций. Каждый день вы можете купить одну единицу акций, продать любое
количество единиц, которые вы уже купили, или ничего не делать.
Следовательно, наибольшая прибыль - это максимальная разница всех пар в
последовательности курсов акций.
*/
function calc(arr) {
    let profit = 0;

    function findMaxProfit(newArr) {
        const maxPrice = Math.max(...newArr);

        const indexMaxPrice = newArr.indexOf(maxPrice);

        for (let i = 0; i < indexMaxPrice; i++) profit += maxPrice - newArr[i];

        if (newArr.length > 1) findMaxProfit(newArr.slice(indexMaxPrice + 1));

        return profit;
    }

    return findMaxProfit(arr);
}

console.log(calc([1, 2, 3, 4, 5, 6])); // 15 (покупка 1, 2, 3, 4, 5 и продажа на 6)
console.log(calc([6, 5, 4, 3, 2, 1])); // 0 (тут нечего покупать, не можем заработать на покупке)
console.log(calc([1, 6, 5, 10, 8, 7])); // 18 (покупка 1, 6, 5 и продажа на 10)
console.log(calc([1, 2, 10, 2, 4, 6])); // 23 (покупка 1, 2 продажа на 10; покупка 2, 4 продажа на 6)
console.log(calc([1, 2, 10, 2, 4])); // 19

// * =========================================================================
/*
Необходимо реализовать функцию sum так, чтобы при каждом вызове функции в 
console.log выводилось число с суммой всех предыдущих вызовов как в примере.
*/

function sum(number) {
    let accum = number;
    console.log(accum);

    return function f(num) {
        accum += num;
        console.log(accum);
        return f;
    };
}

sum(1)(2); // 1 3
sum(1)(5)(10); // 1 6 16

// Вариант 2
function sum2(number) {
    let accum = number;
    console.log(accum);

    return function (num) {
        return sum2(accum + num);
    };
}

sum2(1)(2); // 1 3
sum2(1)(5)(10); // 1 6 16


// * ==========================================================================================
/*
Реализовать функцию findNearestPrimeNumber, которая возвращает ближайшее простое
число. На вход функция получает целое число, рядом с которой нужно найти 
ближайшее значение простого числа. Если разница между значениями равна, выбрать 
меньшее найденное значение.
*/

function findNearestPrimeNumber(num) {
    if (num <= 2) return 2;
    if (num % 2 > 0) return num;

    let num1 = (num2 = num);
    let lengths1 = (lengths2 = detect = 0);

    while (detect !== 2) {
        num1 += 1;
        lengths1 += 1;
        let step = 1;
        detect = 0;

        while (step <= num1) {
            if (num1 % step === 0) {
                detect += 1;
            }
            step += 1;
        }
    }

    detect = 0;

    while (detect !== 2) {
        num2 -= 1;
        lengths2 += 1;
        let step = 1;
        detect = 0;

        while (step <= num2) {
            if (num2 % step === 0) {
                detect += 1;
            }
            step += 1;
        }
    }

    return lengths1 < lengths2 ? num1 : num2;
}

console.log(findNearestPrimeNumber(4)); // 3 Разница равна - берем меньшее.
console.log(findNearestPrimeNumber(3)); // 3
console.log(findNearestPrimeNumber(11)); // 11
console.log(findNearestPrimeNumber(125)); // 127
console.log(findNearestPrimeNumber(110)); // 109
console.log(findNearestPrimeNumber(1110)); // 1109
console.log(findNearestPrimeNumber(350000)); // 350003
console.log(findNearestPrimeNumber(-4000)); // 2

// Вариант 2 (быстрее)
function findNearestPrimeNumber2(num) {
    if (num < 2) return 2;

    function isPrime(number) {
        for (let i = 2; i < number; i++) {
            if (number % i === 0) return false;
        }
        return true;
    }

    if (isPrime(num)) return num;

    for (let i = 1; true; i++) {
        if (isPrime(num - i)) return num - i;
        if (isPrime(num + i)) return num + i;
    }
}

console.log(findNearestPrimeNumber2(4)); // 3 Разница равна - берем меньшее.
console.log(findNearestPrimeNumber2(3)); // 3
console.log(findNearestPrimeNumber2(11)); // 11
console.log(findNearestPrimeNumber2(125)); // 127
console.log(findNearestPrimeNumber2(110)); // 109
console.log(findNearestPrimeNumber2(1110)); // 1109
console.log(findNearestPrimeNumber2(350000)); // 350003
console.log(findNearestPrimeNumber2(-4000)); // 2

//Реализуем поиск простых чисел с помощью алгоритма Эратосфена
// Пример для n = 30
// Запишем натуральные числа, начиная от 2, до 30 в ряд:
// 2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
// Первое число в списке, 2 — простое. Пройдём по ряду чисел, зачёркивая все числа, кратные 2 (то есть, каждое второе, начиная с 22 = 4):
// 2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
// Следующее незачеркнутое число, 3 — простое. Пройдём по ряду чисел, зачёркивая все числа, кратные 3 (то есть, каждое третье, начиная с 32 = 9):
// 2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
// Следующее незачеркнутое число, 5 — простое. Пройдём по ряду чисел, зачёркивая все числа, кратные 5 (то есть, каждое пятое, начиная с 52 = 25):
// 2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
// Следующее незачеркнутое число — 7. Его квадрат, 49 — больше 30, поэтому на этом работа завершена. Все составные числа уже зачеркнуты:
// 2  3     5     7           11    13          17    19          23                29
// алгоритм получения всех натуральных чисел от 2 до num включительно
function findPrimeNumber(num) {
    if (num <= 2) return 2;

    let optionOne = [];
    let optionTwo = [2];

    // отберем в массив все числа от 2 до num
    for (let i = 3; i <= num; i += 2) {
        optionOne.push(i);
    }

    let index = 3;

    while (index * index < num) {
        for (let i = index; i !== null && i <= num; i += index) {
            delete optionOne[i];
        }

        optionTwo.push(optionOne.splice(0, 1)[0]);
        optionOne[0] ? (index = optionOne[0]) : (index = null);
    }

    // return optionTwo.concat(optionOne).filter(Number);
    return [...optionTwo, ...optionOne].filter(Number);
}

// console.log(findPrimeNumber(4)); // 3
// console.log(findPrimeNumber(3)); // 3
// console.log(findPrimeNumber(11)); // 11
// console.log(findPrimeNumber(110)); // 109
// console.log(findPrimeNumber(1110)); // 1109
// console.log(findPrimeNumber(-4000)); // 2

// //* ===========================================================================

/*
Новый фильм "Мстители" только что вышел! В кассе кинотеатра много людей, стоящих в огромной очереди. Каждый из них имеет по одной купюре, номиналом 100, 50 или 25 $. 
Билет "Мстители" стоит 25 $.
Вася сейчас работает клерком. Он хочет продать билет каждому человеку в этой очереди.
Может ли Вася продать билет каждому человеку и дать сдачу, если у него изначально нет денег и он продает билеты строго в порядке очереди?
Верните YES, если Вася сможет продать билет каждому человеку и дать сдачу. В противном случае верните NO.

Примеры:
console.log(tickets([25, 25, 50])) //  YES
console.log(tickets([25, 100])) // NO (У Васи нет сдачи со 100)
console.log(tickets([25, 25, 50, 50, 100])) // NO
*/
// Это наиболее лучший алгоритм решения, еще используют объекты, но принцип то же.
function tickets(people) {
	let bills_25 = bills_50 = 0;
	const peoples = people.filter(Number);

	for (let i = 0; i < peoples.length; i++) {
		if (peoples[i] === 25) {
			bills_25 += 1;
		} else if (peoples[i] === 50 && bills_25 > 0) {
			bills_50 += 1;
			bills_25 -= 1;
		} else if (peoples[i] === 100 && (bills_25 >= 3 || (bills_50 > 0 && bills_25 > 0))) {
			if (bills_50 > 0) {
				bills_50 -= 1;
				bills_25 -= 1;
			} else {
				bills_25 -= 3;
			}
		} else {
			return 'NO';
		}
	}

	return 'YES';
}

console.log(tickets([25, 25, 50])) //  YES
console.log(tickets([25, 100])) // NO (У Васи нет сдачи со 100)
console.log(tickets([25, 25, 50, 50, 100])) // NO
console.log(tickets([25, 25, 25, 25, 25, 100, 100])) // no
console.log(tickets([25,25,50,100,25,50,25,100,25,25,25,100])) // yes
console.log(tickets([25,25,25,100,25,25,50,100,25,25,25,100])) // yes
console.log(tickets([25, 25, 25, 25, 25, 25, 25, 50, 50, 50, 100, 100, 100, 100])) // => no
console.log(tickets([25, 25, 50])) // yes
console.log(tickets([25, 100])) // no
console.log(tickets([25, 25, 50, 50, 100])) //no
console.log(tickets([25, 50, 25, 100])) // yes
console.log(tickets([25, 50, 50])) // no
console.log(tickets([25, 25, 25, 100])) // yes
console.log(tickets([25, 25, 25, 25, 25, 50, 100])) // yes
console.log(tickets([25, 100])) // no
console.log(tickets([undefined, '', null, 50, 25])) // no
console.log(tickets([100, undefined, 50, 25])) // no

//* ===========================================================================
/*
Имеется массив чисел, все числа повторяются по три раза, а одно нет. Нужно найти это одно уникальное.
Желательно не сортировать.
*/
// не самое быстрое решение, но вроде норм.
function single_number(nums) {
	for (let i = 0; i < nums.length; i++) {
		if (nums.indexOf(nums[i]) === nums.lastIndexOf(nums[i])) return nums[i];
	}
}

console.log(single_number([-2, -2, 1, 1, -3, 1, -3, -3, -4, -2])); // -4
console.log(single_number([-2, -2, 1, 1, -3, 1, -3, -3, -4, -2, -4, -4, 33])); // 33
console.log(single_number([-2, -2, 1, 0, 1, -3, 1, -3, -3, -4, -2, -4, -4, 33, 33, 33])); // 0

// * ===============================================================================================================
/*
Дан массив вида `[1, 2, [3,4,[5]], 6, 7, [[8]]]`, необходимо получить массив
без вложенных массивов, то есть: `[1, 2, 3, 4, 5, 6, 7, 8]`.
*/
let arr = [1, 2, [3, 4, [5]], 6, 7, [[8]]];

// решение 1
function compact(arr) {
	return [...[].concat.apply([], arr).join('')].map(e => +e);
}

console.log(compact(arr));

// решение 2
function compact2(arr) {
	const newArr = [];

	function extractElement(arg) {
		for (let i = 0; i < arg.length; i++) {
			if (Array.isArray(arg[i])) {
				extractElement(arg[i]);
			} else {
				newArr.push(arg[i]);
			}
		}
		return newArr;
	}

	return extractElement(arr);
}

console.log(compact2(arr));

// решение 3
function compact3(arr) {
	return arr.flat(Infinity);
}

console.log(compact3(arr));

// решение 4
function compact4(arr) {
	return arr.toString().split(",").map(x => +x);
}

console.log(compact4(arr));

// * =====================================================================
// * =====================================================================
const obj = {
	str: "hello",
	a() {
		console.log(this.str);
	}
};

console.log(obj.a()); // hello
let temp = obj.a;
console.log(temp()); // undefined (контекст потерян)

// ! ну или сразу при присвоении забиндить let temp = obj.a.bind(obj); console.log(temp());
console.log(temp.bind(obj)()); // hello (вручную присвоим контекст, bind вернет функцию)

// * ===========================================================================
/*
	leetcode.com №4 
	сложность: Hard
	общая сложность времени выполнения должна быть O(log (m+n)).

	Основное условие: Имеются два отсартированных массива, длинною m и n. вернуть медианное значение двух отсортированных массивов. 

	Ограничения:
	nums1.length == m
	nums2.length == n
	0 <= m <= 1000
	0 <= n <= 1000
	1 <= m + n <= 2000
	-106 <= nums1[i], nums2[i] <= 106
*/
function findMedianSortedArrays(nums1, nums2) {
    const arr = [...nums1, ...nums2]; // nums1.concat(nums2) - будет быстрее чем [...nums1, ...nums2]
    const size = arr.length;

    // сортировка вставками
    for (let i = 0; i < size; i++) {
    	for (let j = i; arr[j] <  arr[j - 1]; j--) {
    		[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
    	}
    }

    const mid = Math.floor(size / 2);

    return size % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
};
/*
	Данное решение прошло успешно тесты на leetcode.com
	Аналитическая оценка:
	Runtime: 192 ms, faster than 17.52% of JavaScript online submissions for Median of Two Sorted Arrays.
	Memory Usage: 45.1 MB, less than 56.31% of JavaScript online submissions for Median of Two Sorted Arrays.
*/

console.log(findMedianSortedArrays([1, 3], [2])); // 2.0000 (объединенный массив = [1,2,3] и медиана равна 2.)
console.log(findMedianSortedArrays([1, 2], [3, 4])); // 2,50000 (объединенный массив = [1,2,3,4], а медиана равна (2 + 3) / 2 = 2,5.)
console.log(findMedianSortedArrays([0, 0], [0, 0])); // 0,00000
console.log(findMedianSortedArrays([], [1])); // 1.00000
console.log(findMedianSortedArrays([2], [])); // 2.00000

// более быстрый вариант за счет сортировки слиянием
function findMedianSortedArrays2(nums1, nums2) {
    const arr = nums1.concat(nums2); // nums1.concat(nums2); concat быстрее будет чем [...nums1, ...nums2]
    const size = arr.length;

    function sortMerge(arr) {
    	if (arr.length > 1) {
    		const mid = Math.floor(arr.length / 2);
    		let left = arr.slice(0, mid);
    		let right = arr.slice(mid);

    		sortMerge(left);
    		sortMerge(right);

    		let l = r = k = 0;

    		while(l < left.length && r < right.length) {
    			if (left[l] <= right[r]) {
    				arr[k] = left[l];
    				l++;
    			} else {
    				arr[k] = right[r];
    				r++;
    			}
    			k++;
    		}

    		while(l < left.length) {
    			arr[k] = left[l];
    			l++;
    			k++;
    		}

    		while(r < right.length) {
    			arr[k] = right[r];
    			r++;
    			k++;
    		}
    	}
    	return arr;
    }

    sortMerge(arr);

    const mid = Math.floor(size / 2);

    return size % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
};
/*
	Данное решение прошло успешно тесты на leetcode.com
	Аналитическая оценка:
	Runtime: 144 ms, faster than 44.45% of JavaScript online submissions for Median of Two Sorted Arrays.
	Memory Usage: 45.9 MB, less than 20.54% of JavaScript online submissions for Median of Two Sorted Arrays.

	Runtime: 136 ms, faster than 69.59% of JavaScript online submissions for Median of Two Sorted Arrays.
	Memory Usage: 47.8 MB, less than 16.56% of JavaScript online submissions for Median of Two Sorted Arrays.
*/

console.log(findMedianSortedArrays2([1, 3], [2])); // 2.0000 (объединенный массив = [1,2,3] и медиана равна 2.)
console.log(findMedianSortedArrays2([1, 2], [3, 4])); // 2,50000 (объединенный массив = [1,2,3,4], а медиана равна (2 + 3) / 2 = 2,5.)
console.log(findMedianSortedArrays2([0, 0], [0, 0])); // 0,00000
console.log(findMedianSortedArrays2([], [1])); // 1.00000
console.log(findMedianSortedArrays2([2], [])); // 2.00000

// Еще быстрее вариант, не мое решение
function findMedianSortedArrays3(nums1, nums2) {
	let m = nums1.length;
    let n = nums2.length;
    let a=0,b=0;

    for(let k=0;k<(m+n+1)/2;k++){
        let i = nums1[0];
        let j = nums2[0];
        a=b;
        if(i!=undefined && (j==undefined ||i<j)){
            b = nums1.shift();
        }
        else {
            b = nums2.shift();
        }
    }  
    return (m+n)%2===0 ? (a+b)/2:b;

    	// * еще вариант
	  // const len = nums1.length + nums2.length;
	  // const nums = [];
	  // let l = 0, r = 0;
	  // // Merge arrays
	  // while (nums.length < len) {
	  //   if (nums1[l] < nums2[r] || r >= nums2.length) {
	  //     nums.push(nums1[l++]);
	  //   }
	  //   else if (nums1[l] >= nums2[r] || l >= nums1.length) {
	  //     nums.push(nums2[r++]);
	  //   }
	  // }
	  // // Calculate and return median
	  // return (len % 2
	  //   ? nums[Math.floor(len / 2)]
	  //   : (nums[len / 2 - 1] + nums[len / 2]) / 2);
};
/*
	Данное решение прошло успешно тесты на leetcode.com
	Аналитическая оценка:
	Runtime: 132 ms, faster than 81.05% of JavaScript online submissions for Median of Two Sorted Arrays.
	Memory Usage: 43.2 MB, less than 94.27% of JavaScript online submissions for Median of Two Sorted Arrays.
*/

console.log(findMedianSortedArrays3([1, 3], [2])); // 2.0000 (объединенный массив = [1,2,3] и медиана равна 2.)
console.log(findMedianSortedArrays3([1, 2], [3, 4])); // 2,50000 (объединенный массив = [1,2,3,4], а медиана равна (2 + 3) / 2 = 2,5.)
console.log(findMedianSortedArrays3([0, 0], [0, 0])); // 0,00000
console.log(findMedianSortedArrays3([], [1])); // 1.00000
console.log(findMedianSortedArrays3([2], [])); // 2.00000

// Самый быстрый вариант  !!!!
function findMedianSortedArrays4(nums1, nums2) {
    const arr = nums1.concat(nums2).sort((a, b) => a - b);
    const size = arr.length;

    const mid = Math.floor(size / 2);

    return size % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
};
/*
	Данное решение прошло успешно тесты на leetcode.com
	Аналитическая оценка:
	Runtime: 128 ms, faster than 90.49% of JavaScript online submissions for Median of Two Sorted Arrays.
	Memory Usage: 44.8 MB, less than 61.71% of JavaScript online submissions for Median of Two Sorted Arrays.
*/

console.log(findMedianSortedArrays4([1, 3], [2])); // 2.0000 (объединенный массив = [1,2,3] и медиана равна 2.)
console.log(findMedianSortedArrays4([1, 2], [3, 4])); // 2,50000 (объединенный массив = [1,2,3,4], а медиана равна (2 + 3) / 2 = 2,5.)
console.log(findMedianSortedArrays4([0, 0], [0, 0])); // 0,00000
console.log(findMedianSortedArrays4([], [1])); // 1.00000
console.log(findMedianSortedArrays4([2], [])); // 2.00000


// * =================================================================================================
let a = {};
console.log(a instanceof Object); // true // Исключением только созданный объект без прототипа. Когда он не экземпляр класса Object, но объект
let b = new Object;
console.log(b instanceof Object); // true
let c = Object.create(Object.prototype);
console.log(c instanceof Object); // true

// ! Такой способ создания объекта имеет свои преимущества, например, можно быть уверенным,
// ! что в таком объекте будут только те свойства, которые мы туда положим. Можно смело итерироваться по такому объекту.
let d = Object.create(null);
console.log(d instanceof Object); // false // объект создан без прототипа, тоесть не является экземпляром глобального объекта Object
console.log(typeof d); // 'object'


//* ==============================================================================

const obj = {
     m: function (arg) {console.log(this)},
     m2(arg) {console.log(this)},
     m3: (arg) => { console.log(this)},
}

console.log(obj.m('Hi'));
console.log(obj.m2('Hi')); // нет prototype, есть только __proto__ . То есть нет функции конструктора, и на основе этой функции нельзя создать новый объект, экземпляр этой функции в отличии от верхней.
console.log(obj.m3('Hi')); // this будет у стрелочной глобальный объект Window и придется вручную биндить
console.log(obj.__proto__ === Object.prototype); // true


// * ===============================================================


/*
Необходимо реализовать функцию getCompressedString, которая вернет сжатую строку
в формате букваЦифра, как в примере.
*/

function getCompressedString(str) {
    const obj = {};
    const arr = str.toLowerCase().split('');

    for (let i = 0; i < arr.length; i++) Object.keys(obj).includes(arr[i]) ? obj[arr[i]] += 1 : obj[arr[i]] = 1;

    let result = '';

    for (key in obj) result += `${key}${obj[key]}`;

    return result;
}

console.log(getCompressedString('aaAaBbBbDFFFff')); // "a4b4d1f5"

function getCompressedString2(str) {
    const obj = [...str.toLowerCase()].reduce((accum, elem) => {
        Object.keys(accum).includes(elem) ? accum[elem] += 1 : accum[elem] = 1;
        return accum;
    }, {});

    let result = '';

    for (key in obj) result += `${key}${obj[key]}`;

    return result;
}

console.log(getCompressedString2('aaAaBbBbDFFFff')); // "a4b4d1f5"


// * =======================================================================================
/*
Напишите функцию invert(obj), которая принимает в себя объект, и возвращает 
объект с инвертированными ключами и значениями. В случае если одинаковые 
значения встречаются несколько раз - берем последний ключ.
*/
function invert(obj) {
    const arr = [];

    for (key in obj) {
        arr.push(obj[key]);
        arr.push(key);
    }

    const obj2 = {};

    for (let i = 0; i < arr.length - 1; i += 2) obj2[arr[i]] = arr[i + 1];

    return obj2;
}

console.log(invert({ a: 1, b: 2, c: 3 })); // {1: "a", 2: "b", 3: "c"}
console.log(invert({ a: 1, b: 2, c: 1 })); // {1: "c", 2: "b"}

function invert2(obj) {
    const arr = [];
    for (let [key, value] of Object.entries(obj)) arr.push([value, key]);
    return Object.fromEntries(arr);
}

console.log(invert2({ a: 1, b: 2, c: 3 })); // {1: "a", 2: "b", 3: "c"}
console.log(invert2({ a: 1, b: 2, c: 1 })); // {1: "c", 2: "b"}


// * =========================================================================================
/*
Напишите функцию optionalChaining(obj, arr ), которая принимает первым 
параметром объект, вторым - массив из цепочки свойств, по которому нужно пройти, 
чтобы получить значение. Если значение в объекте по ключу находится - возвращаем 
значение, если нет - возвращаем undefined. Для решения необходимо использовать 
рекурсию.
*/

function optionalChaining(obj, arr) {
   return typeof obj[arr[0]] === 'object' ? optionalChaining(obj[arr[0]], arr.slice(1)) : arr.length > 1 ? undefined : obj[arr[0]];
}

const objc = {
  a: {
    b: {
      c: {
        d: 'Привет!'
      }
    }
  }
};

console.log(optionalChaining(objc, ["a", "b", "c", "d"])); // Привет
console.log(optionalChaining(objc, ["a", "b", "c", "d", "e"])); // undefined
console.log(optionalChaining(objc, ["a", "c", "d"])); // undefined
console.log(optionalChaining(objc, ["b", "d", "a"])); // undefined


// * ==========================================================================================================================
/*
В функцию longestCommonPrefix передается массив слов, необходимо реализовать
функцию так, чтобы она возвращала самый длинных префикс (первые буквы), который 
содержится во всех словах.
*/

function longestCommonPrefix(words) {
    if (words[0][0] !== words[1][0]) return '""';

    let result = '';
    
    function find(letter, index, arrWords) {
        let detect = 0;

        for (let i = 1; i < arrWords.length; i++) {
            arrWords[i][index] === letter ? detect : detect += 1;
        }

        if (detect > 0) return result;

        result += letter;

        return find(arrWords[0][index + 1], index + 1, arrWords);
    }

    return find(words[0][0], 0, words);
}

console.log(longestCommonPrefix(["привет", "правила", "проезд"])); // "пр"
console.log(longestCommonPrefix(["очень", "плохая", "музыка"])); // ""

// 2
function longestCommonPrefix2(words) {
    return words[0].split('').reduce((a, i, n) =>  
        words.slice(1).reduce((b, j) => b && j[n] === i, true) 
        ? (a.push(i), a) 
        : a,
        [] 
    ).join('');
}

console.log(longestCommonPrefix2(["привет", "правила", "проезд"])); // "пр"
console.log(longestCommonPrefix2(["очень", "плохая", "музыка"])); // ""

// * ========================================================================
/*
В функцию передается массив с числами. Необходимо из функции вернуть новый 
массив, в котором все числа что были переданы внутрь функции будут отсортированы 
в порядке уменьшения количества цифры и в порядке увеличения самого числа.
*/

function solve(arr) {
    const newArr = [];

    function find(elem, index, myArr) {
        let detect = 0;

        for (let i = 0; i < myArr.length; i++) {
            elem === myArr[i] ? detect += 1 : detect;
        }

        if (detect === 1)  { 
            newArr.push(elem);
            arr.splice(index, 1);
            index -= 1;
        }

        if (myArr.length - 1 === index) return;

        return find(myArr[index + 1], index + 1, myArr);
    }

    find(arr[0], 0, arr);

    return [...arr.sort(), ...newArr.sort()];

    //return arr.sort().concat(newArr.sort()) // - значительно быстрее, но не так красиво)))
}

console.log(solve([2,3,5,3,7,9,5,3,7])); // [3,3,3,5,5,7,7,2,9]
console.log(solve([4,9,5,0,7,3,8,4,9,0])); // [0,0,4,4,9,9,3,5,7,8]
console.log(solve([4,9,5,0,7,3,8,4,9,0,-1,-1,-1])); // [-1,-1,-1,0,0,4,4,9,9,3,5,7,8]

//2
function solve2(arr) {
    const newArr = [];

    function find(elem, index, myArr) {
        let detect = 0;

        for (let i = 0; i < myArr.length; i++) {
            elem === myArr[i] ? detect += 1 : detect;
        }

        if (detect === 1)  { 
            newArr.push(elem);
            arr.splice(index, 1);
            index -= 1;
        }

        if (myArr.length - 1 === index) return;

        return find(myArr[index + 1], index + 1, myArr);
    }

    find(arr[0], 0, arr);

    return [...arr.sort(), ...newArr.sort()];

    //return arr.sort().concat(newArr.sort()) // - значительно быстрее, но не так красиво)))
}

console.log(solve2([2,3,5,3,7,9,5,3,7])); // [3,3,3,5,5,7,7,2,9]
console.log(solve2([4,9,5,0,7,3,8,4,9,0])); // [0,0,4,4,9,9,3,5,7,8]
console.log(solve2([4,9,5,0,7,3,8,4,9,0,-1,-1,-1])); // [-1,-1,-1,0,0,4,4,9,9,3,5,7,8]


// * ====================================================================================
/*
Реализовать функцию splitByValue так, чтобы она возвращала массив, состоящий из
тех же элементов что переданный, но отсортированный таким образом чтоб в начале 
шли элементы, которые меньше числа k, в остальном порядок элементов должен быть 
тот же. 
*/

function splitByValue(k, elements) {
    const arr = [];

    for (let i = 0; i < elements.length; i++) {
        if (elements[i] < k) {
            arr.push(elements.splice(i, 1)[0]);
            i--;
        }
    }

    return [...arr, ...elements];
}

console.log(splitByValue(5, [1, 3, 5, 7, 6, 4, 2])); // [1, 3, 4, 2, 5, 7, 6]
console.log(splitByValue(0, [5, 2, 7, 3, 2])); // [5, 2, 7, 3, 2]

// 2
function splitByValue2(k, elements) {
    return elements.sort((a, b) => (k > b) - (k > a));
}

console.log(splitByValue2(5, [1, 3, 5, 7, 6, 4, 2])); // [1, 3, 4, 2, 5, 7, 6]
console.log(splitByValue2(0, [5, 2, 7, 3, 2])); // [5, 2, 7, 3, 2]

/*
    * 1) Функции первого порядка - это то, про что в видео говорилось - функция принимает только простые значения или объекты, но не функции.
    * 2) Функции первого класса - это то про что вы описали, когда функция является значением и может быть использована в виде аргументов переданных например в функции высшего порядка.
    * 3) Функция высшего порядка - противоположность функции первого порядка, это функция, которая принимает другую функцию в качестве аргумента или возвращает другую функцию как значение.
    * 4) Функция-монада или унарная функция - это это функция принимающая один аргумент.
    * 5) Карироване - это когда функция принимает аргумент и возвращает другую функцию которая принимает аргументи так до возврата значения (попутно создается замыкание)
*/
