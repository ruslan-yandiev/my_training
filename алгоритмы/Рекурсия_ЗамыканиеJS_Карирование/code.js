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
