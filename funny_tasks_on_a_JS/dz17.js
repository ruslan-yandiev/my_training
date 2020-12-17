function isInteger(num) {
    if (typeof num !== 'number') return false;
    if (
        typeof num === 'number' &&
        !`${num}`.includes('.') &&
        !Number.isNaN(num)
    )
        return true;
    return false;
}

console.log(isInteger('123')); // false
console.log(isInteger(5.555)); // false
console.log(isInteger(NaN)); // false
console.log(isInteger(56)); // true

function isInteger2(num) {
    return typeof num === 'number' && !Number.isNaN(num) && num % 1 === 0;
}

console.log(isInteger2('123')); // false
console.log(isInteger2(5.555)); // false
console.log(isInteger2(NaN)); // false
console.log(isInteger2(56)); // true

// * =====================================================================================================
let user = {
    name: 'Павел',
    sayName() {
        console.log(`My name is ${this.name}`);
    },
};

setTimeout(user.sayName.bind(user), 1000); // забиндим ,чтобы не потерять контекст из-за setTimeout, принудительно ео зададим

// * ==============================================================================================================
/*
В функцию numering передается массив где каждый элемент - строка текста, 
необходимо реализовать функцию так, чтоб она пронумеровала строки начиная с 
единицы как показано в примере.
*/
function numering(array) {
    for (let i = 0; i < array.length; i++) {
        array[i] = `${i + 1}: ${array[i]}`;
    }
    return array;
}

console.log(numering(['a', 'b', 'c'])); // ["1: a", "2: b", "3: c"]

//2
function numering2(array) {
    return array.map((elem, index) => `${index + 1}: ${elem}`);
}

console.log(numering2(['a', 'b', 'c'])); // ["1: a", "2: b", "3: c"]

// * ================================================================================================
/*
Необходимо реализовать функцию pluck, которая вернет массив со значениями 
свойств всех объектов, содержащихся в массиве arr с названием переданным в 
аргумент key.
*/

function pluck(arr, key) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i][key];
    }
    return arr;
}

console.log(pluck([{ a: 1 }, { a: 2 }], 'a')); // [1, 2]
console.log(pluck([{ a: 1, b: 3 }, { a: 2 }], 'b')); // [3, undefined];

//2
function pluck2(arr, key) {
    return arr.map(obj => obj[key]);
}

console.log(pluck2([{ a: 1 }, { a: 2 }], 'a')); // [1, 2]
console.log(pluck2([{ a: 1, b: 3 }, { a: 2 }], 'b')); // [3, undefined];
