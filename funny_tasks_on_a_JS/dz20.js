let a = {};
console.log(a instanceof Object); // true // Исключением только созданный объект без прототипа. Когда он не экземпляр класса Object, но объект
let b = new Object;
console.log(b instanceof Object); // true
let c = Object.create(Object.prototype);
console.log(c instanceof Object); // true

// ! Такой способ создания объекта имеет свои преимущества, например, можно быть уверенным,
// ! что в таком объекте будут только те свойства, которые мы туда положим. Можно смело итерироваться по такому объекту.
let d = Object.create(null);
console.log(d instanceof Object); // false // объект создан без прототипа, тоесть не является экземпляром глобального объекта Object
console.log(typeof d); // 'object'


//* ==============================================================================

const obj = {
 	m: function (arg) {console.log(this)},
 	m2(arg) {console.log(this)},
 	m3: (arg) => { console.log(this)},
}

console.log(obj.m('Hi'));
console.log(obj.m2('Hi')); // нет prototype, есть только __proto__ . То есть нет функции конструктора, и на основе этой функции нельзя создать новый объект, экземпляр этой функции в отличии от верхней.
console.log(obj.m3('Hi')); // this будет у стрелочной глобальный объект Window и придется вручную биндить
console.log(obj.__proto__ === Object.prototype); // true


// * ===============================================================


/*
Необходимо реализовать функцию getCompressedString, которая вернет сжатую строку
в формате букваЦифра, как в примере.
*/

function getCompressedString(str) {
	const obj = {};
	const arr = str.toLowerCase().split('');

	for (let i = 0; i < arr.length; i++) Object.keys(obj).includes(arr[i]) ? obj[arr[i]] += 1 : obj[arr[i]] = 1;

	let result = '';

	for (key in obj) result += `${key}${obj[key]}`;

	return result;
}

console.log(getCompressedString('aaAaBbBbDFFFff')); // "a4b4d1f5"

function getCompressedString2(str) {
	const obj = [...str.toLowerCase()].reduce((accum, elem) => {
		Object.keys(accum).includes(elem) ? accum[elem] += 1 : accum[elem] = 1;
		return accum;
	}, {});

	let result = '';

	for (key in obj) result += `${key}${obj[key]}`;

	return result;
}

console.log(getCompressedString2('aaAaBbBbDFFFff')); // "a4b4d1f5"


// * =======================================================================================
/*
Напишите функцию invert(obj), которая принимает в себя объект, и возвращает 
объект с инвертированными ключами и значениями. В случае если одинаковые 
значения встречаются несколько раз - берем последний ключ.
*/
function invert(obj) {
	const arr = [];

	for (key in obj) {
		arr.push(obj[key]);
		arr.push(key);
	}

	const obj2 = {};

	for (let i = 0; i < arr.length - 1; i += 2) obj2[arr[i]] = arr[i + 1];

	return obj2;
}

console.log(invert({ a: 1, b: 2, c: 3 })); // {1: "a", 2: "b", 3: "c"}
console.log(invert({ a: 1, b: 2, c: 1 })); // {1: "c", 2: "b"}

function invert2(obj) {
	const arr = [];
	for (let [key, value] of Object.entries(obj)) arr.push([value, key]);
	return Object.fromEntries(arr);
}

console.log(invert2({ a: 1, b: 2, c: 3 })); // {1: "a", 2: "b", 3: "c"}
console.log(invert2({ a: 1, b: 2, c: 1 })); // {1: "c", 2: "b"}


// * =========================================================================================
/*
Напишите функцию optionalChaining(obj, arr ), которая принимает первым 
параметром объект, вторым - массив из цепочки свойств, по которому нужно пройти, 
чтобы получить значение. Если значение в объекте по ключу находится - возвращаем 
значение, если нет - возвращаем undefined. Для решения необходимо использовать 
рекурсию.
*/

function optionalChaining(obj, arr) {
   return typeof obj[arr[0]] === 'object' ? optionalChaining(obj[arr[0]], arr.slice(1)) : arr.length > 1 ? undefined : obj[arr[0]];
}

const objc = {
  a: {
    b: {
      c: {
        d: 'Привет!'
      }
    }
  }
};

console.log(optionalChaining(objc, ["a", "b", "c", "d"])); // Привет
console.log(optionalChaining(objc, ["a", "b", "c", "d", "e"])); // undefined
console.log(optionalChaining(objc, ["a", "c", "d"])); // undefined
console.log(optionalChaining(objc, ["b", "d", "a"])); // undefined


// * ==========================================================================================================================
/*
В функцию longestCommonPrefix передается массив слов, необходимо реализовать
функцию так, чтобы она возвращала самый длинных префикс (первые буквы), который 
содержится во всех словах.
*/

function longestCommonPrefix(words) {
	if (words[0][0] !== words[1][0]) return '""';

	let result = '';
	
	function find(letter, index, arrWords) {
		let detect = 0;

		for (let i = 1; i < arrWords.length; i++) {
			arrWords[i][index] === letter ? detect : detect += 1;
		}

		if (detect > 0) return result;

		result += letter;

		return find(arrWords[0][index + 1], index + 1, arrWords);
	}

	return find(words[0][0], 0, words);
}

console.log(longestCommonPrefix(["привет", "правила", "проезд"])); // "пр"
console.log(longestCommonPrefix(["очень", "плохая", "музыка"])); // ""

// 2
function longestCommonPrefix2(words) {
	return words[0].split('').reduce((a, i, n) =>  
		words.slice(1).reduce((b, j) => b && j[n] === i, true) 
		? (a.push(i), a) 
		: a,
		[] 
	).join('');
}

console.log(longestCommonPrefix2(["привет", "правила", "проезд"])); // "пр"
console.log(longestCommonPrefix2(["очень", "плохая", "музыка"])); // ""