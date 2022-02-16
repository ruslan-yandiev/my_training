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


function solve(arr) {
    const detect = arr.reduce((obj, el) => {
        obj[el] ? obj[el] += 1 : obj[el] = 1;
        return obj;
    }, {});
    
    const result = [];
    const valuesCollection = Array.from(new Set(Object.values(detect))).sort((a, b) => a - b);
    
    for (let i = 0; i < valuesCollection.length; i++) {
        let arr2 = [];

        for (let j = 0; j < arr.length; j++) {
            if (detect[arr[j]] === valuesCollection[i]) arr2.push(arr[j]);
        }

        result.push(arr2.sort((a, b) => a - b));
    }

    return result.reverse().flat(Infinity);
}

console.log(solve([2,3,5,3,7,9,5,3,7])); // [3,3,3,5,5,7,7,2,9]
console.log(solve([4,9,5,0,7,3,8,4,9,0])); // [0,0,4,4,9,9,3,5,7,8]
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