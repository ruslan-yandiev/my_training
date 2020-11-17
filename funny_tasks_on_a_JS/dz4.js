/*
функция принимает массив и возвращает значения отличающиеся от наибольшего елемента в массиве
не более чем на 10%
*/

function func(arr) {
	let result = []
	let max;
	let min;

	// используем сортировку слиянием O(log n)
	function sortMerge(arr) {
		if (arr.length > 1) {
			let mid = Math.floor(arr.length / 2);
			let left = arr.slice(0, mid);
			let right = arr.slice(mid);

			sortMerge(left);
			sortMerge(right);

			let l = r = k = 0;

			while (l < left.length && r < right.length) {
			 	if(left[l] <= right[r]) {
			 		arr[k] = left[l];
			 		l++
			 	} else {
			 		arr[k] = right[r];
			 		r++
			 	}
			 	k++
			}

			while(l < left.length) {
				arr[k] = left[l];
			 	l++
			 	k++
			}

			while(r < right.length) {
				arr[k] = right[r];
			 	r++
			 	k++
			}
		}

		return arr
	}

	let maxElem = sortMerge(arr).pop();
	min = maxElem - (maxElem / 100 * 10)
	max = maxElem + (maxElem / 100 * 10)

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] >= min && arr[i] <= max) {
			result.push(arr[i]);
		}
	}

	return result;
}

console.log(func([5, 88, 95, 100, 77, 21, 92])); // [95, 92]
console.log(func([2, 13, 55, 29, 19, 5, -5])); // []

// используя метод грубой силы линейный поиск 2
function func2(arr) {
	let result = []
	let maxElem = arr[0];

	for (i = 1; i < arr.length; i++) {
		if(maxElem < arr[i]) {
			maxElem = arr[i];
		}
	}

	// найдем индекс элемента по его значению и затем удалим его
	arr.splice(arr.indexOf(maxElem, 0), 1)

	min = maxElem - (maxElem / 100 * 10)
	max = maxElem + (maxElem / 100 * 10)

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] >= min && arr[i] <= max) {
			result.push(arr[i]);
		}
	}

	return result;
}

console.log(func2([5, 88, 95, 100, 77, 21, 92])); // [95, 92]
console.log(func2([2, 13, 55, 29, 19, 5, -5])); // []


// используя метод грубой силы линейный поиск 3
function func3(arr) {

	// вернет наибольший элемент из массива Math.min(...arr) - минимальное Math.max(1, 2, 3) #=> 3;
	let maxElem = Math.max(...arr); // передали элементы разбив массив

	// найдем индекс элемента по его значению и затем удалим его
	arr.splice(arr.indexOf(maxElem, 0), 1)

	min = maxElem - (maxElem / 100 * 10)
	max = maxElem + (maxElem / 100 * 10)

	// отфильтруем все элементыв масиве по условию и вернем массив со всеми отфильтрованными
	return arr.filter(elem => elem >= min && elem <= max);
}

console.log(func3([5, 88, 95, 100, 77, 21, 92])); // [95, 92]
console.log(func3([2, 13, 55, 29, 19, 5, -5])); // []


// * =======================================================================


/*
Функция принимает массив и вторым пареметром аргумента число.
Возвращает массив равный по размеру равный цифре принятой в аргументе
*/

function fillArr(arr, len) {

	let upSize = len - arr.length;

	for (let i = upSize; i > 0; i--) {
		arr.push(0);
	}
}

const arr6 = [2, 6, 8];
fillArr(arr6, 5);
console.log(arr6); // [2, 6, 8, 0, 0]

// * =======================================================================

/*
Реализовать функцию, в которую передается массив с числами,
а функция возвращает массив очищенный от дублей
*/

function unique(arr) {
	// ! Если перед знаками равно поставить восклицательный знак !==, то мы получим противоположный эффект. В новом массиве останутся только дубли.
	return arr.filter((elem, index) => arr.indexOf(elem) === index);
}

console.log(unique([1, 8, 1, 5, 9, 5, 8])); //[1, 8, 5, 9]


function unique2(arr) {
	return arr.reduce((result, item) => {
		return result.includes(item) ? result : [... result, item];
	}, [])
}

console.log(unique2([1, 8, 1, 5, 9, 5, 8])); //[1, 8, 5, 9]


function unique3(arr) {
	// ! Объект set может содержать в себе только уникальные элементы.
	// ! Метод new Set создает новую коллекцию. В результате мы получили новый набор (коллекцию) с уникальными числами, а все дубли исчезли.
	// ! преобразуем объект Set в объектный тип данных массив. Это можно сделать двумя способами: через оператор расширения spreаd (...) или через метод Array.from() ==Array.from(new Set(arr))==
	return [...new Set(arr)];
}

console.log(unique3([1, 8, 1, 5, 9, 5, 8])); //[1, 8, 5, 9]


function unique4(arr) {
	let sum = 0;

	while(sum < arr.length - 1) {
		for (let i = sum + 1; i < arr.length; i++) {
			if(arr[sum] === arr[i]) {
				arr.splice(i, 1);
			}
		}

		sum += 1;
	}
	return arr;
}

console.log(unique4([1, 8, 1, 5, 9, 5, 8])); //[1, 8, 5, 9]


// function dubl(arr) {
// 	return arr.reduce((accum, elem) => {
// 		// бинарное сравнение бинарным оператором, вернет дублирующий элемент
// 		// бинарный поиск, очень быстро (побитовое сравнение)
// 		return accum ^= elem;
// 	})
// }

// console.log(dubl([1, 8, 1, 5, 9, 5, 8])); //[9]