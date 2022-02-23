/*
Напишите алгоритм, который берет массив и перемещает все нули в конец, 
сохраняя порядок других элементов.
*/

const moveZeros = arr => {
	for (let i = 0; i < arr.length; i++) {
		if (typeof arr[i] === 'number' && arr[i] === 0) arr.push(arr.splice(i, 1)[0]);
	}
	return arr;
};

console.log(moveZeros([false,1,0,1,2,0,1,3,"a"])); // [false,1,1,2,1,3,"a",0,0]

const moveZeros = arr => {
    return arr.filter((el) => el !== 0).concat(arr.filter((el) => el === 0));
    // return [...arr.filter((el) => el !== 0), ...arr.filter((el) => el === 0)];
};

console.log(moveZeros([false,1,0,1,2,0,1,3,"a"])); // [false,1,1,2,1,3,"a",0,0]


// * =====================================================================================
/*
Дано число n, вернуть количество положительных нечетных чисел меньше n.
*/

function oddCount(n) {
	let detect = [];

	for (let i = 0; i < n - 1; i++) {
		if (i !== 0 && i % 2 !== 0) {
			detect.push(i);
		}
	}
	return detect; 
}

// 3 - нечетные числа меньше 7, это - [1, 3, 5]
console.log(oddCount(7));
// 7, - нечетные числа меньше 15, это - [1, 3, 5, 7, 9, 11, 13]
console.log(oddCount(15));

// 2 если просто количество, то проще вот так.
function oddCount2(n) {
	return n > 0 ? Math.floor(n / 2) : 0;
}

// 3 - нечетные числа меньше 7, это - [1, 3, 5]
console.log(oddCount2(7));
// 7, - нечетные числа меньше 15, это - [1, 3, 5, 7, 9, 11, 13]
console.log(oddCount2(15));


/*
	* {}.prototype === {}.__proto__ будет false (так как {}.prototype будет undefinid а {}.__proto__ вернет Object)
	* У готового объекта нет prototype, он есть только у функций конструкторов. Object, Array и прочих класов, втом числе созданных нами 
*/