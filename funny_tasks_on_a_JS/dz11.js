/*
Написать функцию Фибаначи
*/
function fibo(num) {
	let a = 0, b = 1;
	for (let i = 2; i <= num; i++) {
		[a, b] = [b, a + b];
	}
	return b;
}

console.log(fibo(3)); // 2
console.log(fibo(7)); // 7
console.log(fibo(77)); // 5527939700884757

// * ====================================================================
/*
Функция принимает массив и число, функция должна возвращать новый массив циклически сдвинутый
на количество шагов в равный переданному числу. Если передано отрицательное число, двигать влево,
положительное в право
*/
function moveArr(arr, step) {
	if (step === 0 || !step) {
		return arr;
	}

	// ! Math.abs(step) преобразует любое число в положительное!
	for (let i = 0; i < Math.abs(step); i++) {
		if (step > 0) {
			arr.unshift(arr.pop());
		} else {
			arr.push(arr.shift());
		}
	}

	return arr;
}

console.log(moveArr([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]
console.log(moveArr([1, 2, 3, 4, 5], -6)); // [3, 4, 5, 1, 2]
console.log(moveArr([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]

// Второй вариант функциональный подход
function moveArr(arr, step) {
	if (step === 0 || !step) {
		return arr;
	}

	return arr.slice(-(step % arr.length)).concat(arr.slice(0, -(step % arr.length)));
}

console.log(moveArr([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]
console.log(moveArr([1, 2, 3, 4, 5], -6)); // [3, 4, 5, 1, 2]
console.log(moveArr([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]


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

/*
	*1) 
*/