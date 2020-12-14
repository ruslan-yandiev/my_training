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