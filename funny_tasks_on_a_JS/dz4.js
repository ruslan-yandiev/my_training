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


