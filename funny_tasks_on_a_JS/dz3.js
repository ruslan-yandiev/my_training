/*
Напишите функцию, в которую передается число. Функция должна вывести горку с количеством линий,
равной переданному числу в параметры аргумента функции
*/

function printHill(lines) {
	if (lines < 1) {
		console.log('Переданно число меньше еденицы');
	}

	let line = '';

	for (let i = 0; i < lines; i++) {
		console.log(line += '#');
	}
}

printHill(5);

// второй способ
function printHill2(lines) {
	if (lines < 1) {
		console.log('Переданно число меньше еденицы');
	}

	for (let i = 1; i <= lines; i++) {
		console.log('#'.repeat(i));
	}
}

printHill2(5);

// Вариант в одну строку
function printHill3(lines) {
	if (lines < 1) {
		console.log('Переданно число меньше еденицы');
	}

	let line = '';
	let sch = 1;

	for (let j = 0; j < lines; j++) {
		for (let i = sch; i > 0; i--) {
			line += '#'
		}

		line += ' ';
		sch += 1;
	}

	console.log(line);
}

printHill3(5);

// Вариант в одну строку 2
function printHill4(lines) {
	if (lines < 1) {
		console.log('Переданно число меньше еденицы');
	}

	let line = '';

	for (let i = 1; i <= lines; i++) {
		line += '#'.repeat(i) + ' ';
	}

	console.log(line);
}

printHill4(5);

// * ==================================================================


// возвращает новый массив с четными числами
function getEven(arr) {
	let arr2 = []

	arr.forEach((elem) => {
		if (elem % 2 === 0) {
			arr2.push(elem);
		}
	})
	return arr2
}

console.log(getEven([5, 0, -5, 20, 88, 17, -32]));

// второй вариант
// возвращает новый массив с четными числами
function getEven2(arr) {
	return arr.filter(elem => !(elem % 2));
}

console.log(getEven2([5, 0, -5, 20, 88, 17, -32]));

// * ======================================================

// Сортировка Сталина )) удалить из массива все элементы стоящие не по порядку
function mySort(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] > arr[i + 1]) {
			// метод удаляет или заменяет елемент в исходном массиве меняя его.
			arr.splice(i + 1, 1);
			mySort(arr); // ! будем использовать рекурсию, иначе -7 просто пропустится.
		}
	}
}

let arr3 = [5, 18, 2, -7, 88, 20, 109];
mySort(arr3);
console.log(arr3); // [5, 18, 88, 109]


// Сортировка Сталина 2 )) удалить из массива все элементы стоящие не по порядку
function mySort2(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] > arr[i + 1]) {
			// метод удаляет или заменяет елемент в исходном массиве меняя его.
			arr.splice(i + 1, 1);
			i-- // ! сделаем шаг назад, чтобы остаться на том же самом индексе после удаления и сравним еще раз, так-как на месте удаленно элемента теперь другой.
		}
	}
}

let arr4 = [5, 18, 2, -7, 88, 20, 109];
mySort2(arr4);
console.log(arr4); // [5, 18, 88, 109]