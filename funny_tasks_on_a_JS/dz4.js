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

function func4(arr) {
    let num = arr.sort((a, b) => a - b)[arr.length - 1];
    return arr.reduce((acc, elem) =>  {
       if (elem !== num && elem >= num - num / 10) acc.push(elem);
       return acc;
    }, [])
}

console.log(func4([5, 88, 95, 100, 77, 21, 92])); // [95, 92]
console.log(func4([2, 13, 55, 29, 19, 5, -5])); // []

function func5(arr) {
    let num = Math.max(...arr);
    return arr.reduce((acc, elem) =>  {
       if (elem !== num && elem >= num - num / 10) acc.push(elem);
       return acc;
    }, [])
}

console.log(func5([5, 88, 95, 100, 77, 21, 92])); // [95, 92]
console.log(func5([2, 13, 55, 29, 19, 5, -5])); // []
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


function fillArr2(arr, len) {
    for (let i = arr.length; i < len; i++) arr.push(0);
}

const arr7 = [2, 6, 8];
fillArr2(arr7, 5);
console.log(arr7); // [2, 6, 8, 0, 0]
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

function unique5(arr) {
    return arr.reduce((acc, num) => {
        if (!acc.includes(num)) acc.push(num);
        return acc;
    },[])
}

console.log(unique5([1, 8, 1, 5, 9, 5, 8])); //[1, 8, 5, 9]
// * =======================================================================

function dubl(arr) {
	return arr.reduce((accum, elem) => {
		// бинарное сравнение бинарным оператором, вернет дублирующий элемент
		// бинарный поиск, очень быстро (побитовое сравнение)
		return accum ^= elem;
	})
}

console.log(dubl([1, 8, 1, 5, 9, 5, 8])); //[9]

// * =====================================================================


/*
Реализовать функцию, которой передается число, функция должна
возвращать ближайшее целое число к тому, что было передано, без остатка делящееся на 5
*/

function round5(val) {
	if (val % 5 === 0) {
		return val;
	}

	let firstStep = 0;
	let lastStep = 0;
	let result;
	let result2;

	while(result === undefined) {
		firstStep += 1;

		if ((val + firstStep) % 5 === 0) {
			result = val + firstStep;
		}
	}

	while(result2 === undefined) {
		lastStep += 1;

		if ((val - lastStep) % 5 === 0) {
			result2 = val - lastStep;
		}
	}

	if (firstStep >= lastStep) {
		return result2;
	} else {
		return result;
	}
}

console.log(round5(0)); // 0
console.log(round5(2)); // 0
console.log(round5(3)); // 5
console.log(round5(11)); // 10
console.log(round5(14)); // 15
console.log(round5(50)); // 50
console.log(round5(-2)); // 0
console.log(round5(-3)); // -5

// TODO Самый быстрый математический способ получить ближайшее целое число без остатка делящееся на 5
function round5(val) {
	// ! используя математический объект округлим деление числа val на 5, и умножаем на 5
	// математическая формула для получения ближайшего целого числа, можно и на 2, 3, 4...
	return Math.round(val/5)*5;
}

console.log(round5(0)); // 0
console.log(round5(2)); // 0
console.log(round5(3)); // 5
console.log(round5(11)); // 10
console.log(round5(14)); // 15
console.log(round5(50)); // 50
console.log(round5(-2)); // 0
console.log(round5(-3)); // -5



function round6(val) {
    if (val % 5 === 0) return val;

    const obj = {step: 0}, obj2 = {step: -2};
    
    function find(detect) {
        for (let i = val; true;) {
            i > val ? obj.step += 1 : obj2.step += 1;

            if (i % 5 === 0) {
                if (detect === 1) {
                    obj.value = i;
                    return find(2);
                } else {
                    obj2.value = i;
                    return obj.step <= obj2.step ? obj.value : obj2.value;
                }
            }

            detect === 1 ? i++ : i--;
        }
    }

    return find(1);
}

console.log(round6(0)); // 0
console.log(round6(2)); // 0
console.log(round6(3)); // 5
console.log(round6(11)); // 10
console.log(round6(14)); // 15
console.log(round6(50)); // 50
console.log(round6(-2)); // 0
console.log(round6(-3)); // -5

// * =====================================================================

/*
Функция принимает массив с объектами, с записанными координатами. Сделать так,
чтобы возвращался массив, очищенный от дублей.
*/

function uniquePoints(arr) {
	let obj;

	for (let i = 0; i < arr.length; i++) {
		obj = arr[i];

		for (let j = i + 1; j < arr.length - 1; j++) {
			if (obj.x === arr[j].x && obj.y === arr[j].y) {
				arr.splice(j, 1)
			}
		}		
	}

	return arr;
}

let arr = [
	{x: 5, y: 10},
	{x: 1, y: 15},
	{x: 7, y: -5},
	{x: 16, y: 33},
	{x: 1, y: 15},
	{x: 7, y: -5},
	{x: 4, y: 12},
]


console.log(uniquePoints(arr));

// Второй способ
function uniquePoints2(arr) {
	let result = [arr[0]];

	for (let i = 0; i < arr.length; i++) {
		// в более функциональном стиле
		if (!result.some(val => arr[i].x == val.x && arr[i].y === val.y)) {
			result.push(arr[i]);
		}	
	}

	return result;
}

const arr2 = [
	{x: 5, y: 10},
	{x: 1, y: 15},
	{x: 7, y: -5},
	{x: 16, y: 33},
	{x: 1, y: 15},
	{x: 7, y: -5},
	{x: 4, y: 12},
]


console.log(uniquePoints2(arr2));

function uniquePoints3(arr) {
    return arr.reduce((acc, obj) => {
        let detect = true;
        for (let elem of acc) if (elem.x === obj.x && elem.y === obj.y) detect = false;
        if (detect) acc.push(obj);
        return acc;
    }, []);
}

const arr3 = [
	{x: 5, y: 10},
	{x: 1, y: 15},
	{x: 7, y: -5},
	{x: 16, y: 33},
	{x: 1, y: 15},
	{x: 7, y: -5},
	{x: 4, y: 12},
]
console.log(uniquePoints3(arr));

function uniquePoints4(arr) {
    return arr.reduce((acc, obj) => acc.some(val => obj.x === val.x && obj.y === val.y) ? acc : [...acc, obj], []);
}

const arr = [
	{x: 5, y: 10},
	{x: 1, y: 15},
	{x: 7, y: -5},
	{x: 16, y: 33},
	{x: 1, y: 15},
	{x: 7, y: -5},
	{x: 4, y: 12},
]


console.log(uniquePoints4(arr));

// ? Как сортируются свойства(ключи) объектов?
// ! Сортируются: Сначала будут идти целочисленные положительные ключи (1, 2, 33, 100 и т.п.)
// ! если жу в объекте есть свойства(ключи), в виде отрицательных чисел или числа смешанные со строкой
// ! То они уже будут отсортированы в том порядке в котором указаны ('2add', -1)
// ! Само собой все свойство(ключи) будут строками.