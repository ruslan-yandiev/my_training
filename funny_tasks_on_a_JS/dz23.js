/*
Реализовать функцию так, чтобы она возвращала массив в 100 элементов,
заполненный случайными натуральными числами от 1 до 200, так, чтобы они не повторялись
*/
function getRandomArr() {
	const arr = [];

	while(arr.length < 100) {
		// случайное число от 1 до 200
		let randNum = Math.floor(Math.random() * (200 + 1) + 1);

		if (!arr.includes(randNum)) arr.push(randNum);
	}

	return arr;
}
console.log(getRandomArr());


// * =====================================================================
/*
Реализовать функцию так, чтобы она возвращала массив в 100 элементов,
заполненный случайными простыми числами от 1 до 200, так, чтобы они не повторялись.
Если же простые числа закончились оставшее место заполнить пустыми строками.
*/
function getRandomArr2() {
	const arr = [];
	let detect = 0;
	let max = 200;
	let min = 1;

	while(arr.length < 100) {
		// случайное число от 1 до 200
		let randNum = Math.floor(Math.random() * (max + 1) + min)

		if (!arr.includes(randNum) && randNum !== 1) {
			for (let i = 1; i <= randNum; i++) {
				if (randNum % i === 0) detect += 1;
			}

			if (detect === 2) arr.push(randNum);
		}
		detect = 0;
		if (max === min) arr.push('');
		if (max === randNum) max -= 1;
		if (min === randNum) min += 1;
	}
	return arr;
}
console.log(getRandomArr2());


// * =============================================================================
/*
Дан массив, в 10 элементов, в котором заполнены первые 5 какими то значениями, написать прогу,
которые эти 5 значений распределит по всему массиву продублировав их. без промежуточного массива
*/
function myF(arr) {
	arr.splice(arr.length / 2);

	for (let i = 0; i < arr.length; i++) {
		arr.splice(i, 0, arr[i]);
		i++;
	}

	return arr;
}
console.log(myF([1,2,3,4,5,0,0,0,0,0])); // [1,1,2,2,3,3,4,4,5,5]

// * ===============================================================
/*
Функция принимает массив целых чисел, найдите, содержит ли массив какие-либо повторяющиеся элементы.
Функция вернет истину, если если какое то значение появляется не менее двух раз, лож, если каждый элемент уникален.
*/
function exists(num) {
	let detect = 0;

	function f(elem, index, arr) {
		for (let i = 0; i < arr.length; i++) {
			if (elem === arr[i]) detect += 1;
			if (detect > 1) return true;
		}

		index += 1;
		detect = 0;

		if (index === arr.length - 1) return false;

		return f(arr[index], index, arr);
	}

	return f(num[0], 0, num);
}
console.log(exists([4,6,7,7,1])); // true
console.log(exists([4,6,7,1,8])); // false

function exists2(num) {
    return num.length !== new Set(num).size;
}
console.log(exists2([4,6,7,7,1])); // true
console.log(exists2([4,6,7,1,8])); // false


// * ================================================================================
/*
Расширьте прототип у класса Array функцией, возвращающей все элементы этого массива, кроме тех, у которых индексы переданы в параметре.
Функция должна принимать в качестве параметров массив или одно целое число.
*/
Array.prototype.ecept = function (arg) {
    if (typeof arg === 'number' && !Number.isNaN(arg)) {
        return this.filter((elem, index) => index !== arg);
    } else if (Array.isArray(arg)) {
        return this.filter((elem, index) => !arg.includes(index));
    }
}

const array = ['a', 'b', 'c', 'd', 'e'];

console.log(array.ecept([1, 3])); // ['a', 'c', 'e']
console.log(array.ecept(1)); // ['a', 'c', 'd' 'e']


// * ================================================================================
/*
Дан объект со свойствами без значений
Верните новый объект у которого свойства зеркально значению
*/
function mirror(obj) {
	const newObj = {};

	for (key in obj) {
		newObj[key] = key.split('').reverse().join('');
	}
	return newObj;
}

console.log(mirror({
	abc: undefined,
	hello: undefined
})); // {abc: 'cba', hello: 'olleh'}


/* !!!!!!!!!!!!!!!
function Teach() {}
function Stud() {}
console.log(Teach.__proto__ === Stud.__proto__); // true (ссылка __proto__ ссылается на общий Object)
console.log(Teach.prototype === Stud.prototype); // false (у каждого из их разный прототип в их конструкторах. На основе их прототипа и будут создаваться и унаследоваться их экземпляры)
(__proto__ это ссылка на класс с помощью которой создается объект.
А prototype хранит свойства и методы, которые влетят(передадутся по наследству) в новый объект(экземпляр) (наследование))
!!!!!!!!!!!!!!!!*/