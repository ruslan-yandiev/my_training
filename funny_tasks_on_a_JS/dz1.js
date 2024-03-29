// вернуть сложение всех нечетных чисел больше нуля
function f1(arr) {
	let result = 0;
	for(let i of arr) {
		if (i > 0 && i % 2) {
			result += i;
		}
	}

	return result; 
}

console.log(f1([5, 0, -5, 20, 88, 17, -32])); // 22

// 2
function f2(arr) {
	return arr.reduce((accum, elem) => {
		if (elem > 0 && elem % 2) {
			accum += elem
		}

		return accum;
	}, 0)
}

console.log(f2([5, 0, -5, 20, 88, 17, -32])); // 22

// 3
function f3(arr) {
	return arr.reduce((accum, elem) => elem > 0 && elem % 2 ? accum + elem : accum, 0);
}

console.log(f3([5, 0, -5, 20, 88, 17, -32])); // 22

// * =======================================================================================

/*
В функцию передается массив целых чисел и число r. Написать функцию которая вернет булевое значение,
true в случае если в переданном массиве есть два числа, сумма которых равна r, иначе вернет false
*/

// ! Лучший способ, временная сложность алгоритма O(n)
function check(arr, num) {
    const obj = {};

    for (let i = 0; i < arr.length; i++) {
        if (obj[num - arr[i]]) {
            return true;
        } else {
            obj[arr[i]] = num - arr[i];
        }
    }

    return false;
}

console.log(check([10, 15, 3, 7], 17)); // true
console.log(check([10, 15, 3, 7], 20)); // false

// ! Лучший способ, временная сложность алгоритма O(n). поиск в Set имеет сложность O(1)
function check(arr, num) {
    const set = new Set();

    for (let i = 0; i < arr.length; i++) {
        if (set.has(num - arr[i])) {
            return true;
        } else {
            set.add(arr[i]);
        }
    }

    return false;
}

console.log(check([10, 15, 3, 7], 17)); // true
console.log(check([10, 15, 3, 7], 20)); // false

// ! Лучший способ, временная сложность алгоритма O(n).
function check(arr, num) {
    const map = new Map();

    for (let i = 0; i < arr.length; i++) {
		// можно как вариант не получать а поискать через map.has(.......)
        if (map.get(num - arr[i])) {
            return true;
        } else {
            map.set(arr[i], num - arr[i]);
        }
    }

    return false;
}

console.log(check([10, 15, 3, 7], 17)); // true
console.log(check([10, 15, 3, 7], 20)); // false


function check(arr, num) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === num) return true;
        }
    }

    return false;
}

console.log(check([10, 15, 3, 7], 17)); // true
console.log(check([10, 15, 3, 7], 20)); // false

function check(arr, num) {

	const size = arr.length;

	for (let step = 0; step < size - 1; step++) {
		for (let i = 1; i < size; i++) {
			if (arr[step] + arr[i] === num) {
				return true;
			}
		}
	}

	return false;
}

console.log(check([10, 15, 3, 7], 17)); // true
console.log(check([10, 15, 3, 7], 20)); // false

function check2(arr, num) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) if (i !== j && arr[i] + arr[j] === num) return true;
    }
    return false;
}

console.log(check2([10, 15, 3, 7], 17)); // true
console.log(check2([10, 15, 3, 7], 20)); // false

function check3(arr, num) {
    
    function find(elem, index) {
        for (let i = 0; i < arr.length; i++) if (i !== index && arr[i] + elem === num) return true;

        return index === arr.length - 1 ? false : find(arr[index + 1], index + 1);
    }
    return find(arr[0], 0);
}

console.log(check3([10, 15, 3, 7], 17)); // true
console.log(check3([10, 15, 3, 7], 20)); // false

// * =======================================================================================

/*
В функцию передается целое положительное число. Сделать так, 
чтобы функция возвращала сумму всех цифр в переданном числе.
*/

function sumDigits(num) {
	if (num >= 0 && num < 10) {
		return num
	}

	// обернем число в строку, преобразуем этот массив в строку и преобразуем в массив со строками ['9', '0', ...]
	// * // num = [num].join('').split('');
	// второй вариант неявного преобразования
	// * // num = (num + '').split('');
	// * // третий вариант преобразования числа в сторок (явное преобразование)
	// num = num.toString().split('');
	// num = String(num).split('');
	// еще способ преобразовать строку в массив из разбитой строки ['9', '0', ...] ES6
	num = [...num.toString()];


	return num.reduce((accum, elem) => accum + +elem, 0);
}

console.log(sumDigits(123)); // 6
console.log(sumDigits(904)); // 13
console.log(sumDigits(3)); // 3

// более быстрый способ с помощью остатка от деления
function sumDigits2(num) {
	if (num >= 0 && num < 10) {
		return num
	}

	let sum = 0;
	let accum;

	// будем получать последнюю цифру путем получения остатка от деления на 10 и вычитать ее сохраняя и деления на 10
	while (num > 0) {
		accum = num % 10;
		sum += accum;
		num = (num - accum) / 10;
	}

	return sum;
}

console.log(sumDigits2(123)); // 6
console.log(sumDigits2(904)); // 13
console.log(sumDigits2(3)); // 3

function sumDigits3(num) {
    return num.toString().split('').reduce((accum, num) => accum + +num , 0);
}

console.log(sumDigits3(123)); // 6
console.log(sumDigits3(904)); // 13
console.log(sumDigits3(3)); // 3

function sumDigits(num) {
    return [...num.toString()].reduce((acc, el) => +acc + Number(el)) // Явное преобразование всегда быстрее
}

console.log(sumDigits(123)); // 6
console.log(sumDigits(904)); // 13
console.log(sumDigits(3)); // 3

function sumDigits(num) {
    return [...String(num)].reduce((acc, el) => +acc + +(el))
}

console.log(sumDigits(123)); // 6
console.log(sumDigits(904)); // 13
console.log(sumDigits(3)); // 3

/*
! Все функции-конструкторы (экземпляры), созданные с помощью 'new', будут иметь тип 'object'
var str = new String('String');
var num = new Number(100);

typeof str; // Вернёт 'object'
typeof num; // Вернёт 'object'

! Но существует исключение для конструктора Function

var func = new Function();

typeof func; // Вернёт 'function'

! Это было определено с рождения JavaScript
typeof null === 'object';

!Исключения
!Во всех текущих браузерах существует нестандартный host-объект document.all, который имеет тип Undefined.

typeof document.all === 'undefined';
*/