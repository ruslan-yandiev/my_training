// Есть объект на вход. ключи которого буквы, а значения массивы содержащие положение этих букв в
// финальной строке, все числа идут по порядку. 

const input = {
	' ': [5],
	d: [10],
	e: [1],
	H: [0],
	l: [2, 3, 9],
	o: [4, 7],
	r: [8],
	w: [6]
};

const buildString = (m) => {
	if (!m) {
		return '';
	}

	let arr = [];

	for (let prop in m) {
		if (m[prop].length > 1) {
			for (let i = 0; i < m[prop].length; i++) {
				arr[m[prop][i]] = prop;
			}
		}

		arr[m[prop][0]] = prop;
	}

	return arr.join("");
};

'Hello world' === buildString(input) && console.log("First Case")
'' === buildString() && console.log("Second Case");


// * ==========================================================

// более короткий вариант
const buildString2 = (obj) => {
	if (!obj) {
		return '';
	}

	let arr = [];

	// проитерируем объект
	for (let prop in obj) {
		// проитерируем массив
		for (let prop2 of obj[prop]) {
			arr[prop2] = prop;
		}
	}
	
	return arr.join("");
};

'Hello world' === buildString2(input) && console.log("First Case")
'' === buildString2() && console.log("Second Case")

// * ==========================================================

// более короткий вариант
const buildString3 = (obj) => {
	if (!obj) {
		return '';
	}

	// ! Object.keys(obj) вернет массив с ключами объекта
	return Object.keys(obj).reduce((accum, key) => {
		obj[key].forEach(el => {
			accum[el] = key;
		});

		return accum;
	}, []).join(''); // ! вторым аргументом передали пустой массив, чтобы reduce сакумулировал все в массив, а не одним значением. Можно передавать числа и строки, но в других случаях для сложения переданного.
};

'Hello world' === buildString3(input) && console.log("First Case")
'' === buildString3() && console.log("Second Case")