// ? вернуть уникальное число
arr = [1, 1, 2, 3, 4, 4, 3, 5, 2];

// побитовое сравнение функционально
function findElement(arr) {
    return arr.reduce((accum, elem) => accum ^ elem);
}
console.log(findElement(arr)); // 5

// побитовое сравнение императивный стиль
function findElement2(arr) {
    let elem = arr[0];

    for (let i = 1; i < arr.length; i++) elem ^= arr[i];

    return elem;
}
console.log(findElement2(arr));

function findElement3(arr) {
    let a;

    for (let i = 0; i < arr.length; i++) {
        arr.find((elem) => {
            if (elem !== a && elem !== arr[i]) {
                a = elem;
            }
        });
    }
    return a;
}
console.log(findElement3(arr));

// Итеративная рекурсия (то есть рекурсия с сохранением промежуточного результата)
function findElement4(arr) {
    let a;

    function find(elem, index) {
        let detect = 0;

        for (let i = 0; i < arr.length; i++) if (elem === arr[i]) detect += 1;

        return detect > 1 ? find(arr[index + 1], index + 1) : (a = elem);
    }

    return find(arr[0], 0);
}
console.log(findElement4(arr));

function findElement5(arr) {
    for (let i = 0; i < arr.length; i++) {
        let detect = 0;

        for (let j = 0; j < arr.length; j++) if (arr[i] === arr[j]) detect += 1;

        if (detect === 1) return arr[i];
    }
}
console.log(findElement5(arr));

function findElement6(arr) {
    return arr.reduce((accum, elem) => {
        if (arr.filter((item) => item === elem).length === 1) accum = elem;
        return accum;
    });
}
console.log(findElement6(arr));

function findElement7(arr) {
    for (let i = 0; i < arr.length; i++)
        if (arr.filter((elem) => elem === arr[i]).length === 1) return arr[i];
}
console.log(findElement7(arr));
// * ======================================================================================

// ? вернуть массив содержащий уникальные значения каждого из элементов
arr2 = [1, 1, 2, 3, 4, 4, 3, 5, 2, 'a', 'a', -2, -1, 3];

function findUn(arr) {
    return [...new Set(arr)];
}
console.log(findUn(arr2)); // [1, 2, 3, 4, 5, 'a', -2, -1]

function findUn6(arr) {
    return arr.filter((elem, index) => index == arr.indexOf(elem));
}
console.log(findUn6(arr2)); // [1, 2, 3, 4, 5, 'a', -2, -1]

function findUn2(arr) {
    let hh = {};

    for (let i = 0; i < arr.length; i++) hh[`${arr[i]}`] = arr[i];

    return Object.values(hh);
}
console.log(findUn2(arr2)); // [1, 2, 3, 4, 5, 'a', -2, -1]

function findUn3(arr) {
    let map = new Map();
    for (let i = 0; i < arr.length; i++) map.set(arr[i], arr[i]);
    return [...map.values()];
}
console.log(findUn3(arr2)); // [1, 2, 3, 4, 5, 'a', -2, -1]

function findUn4(arr) {
    let newArr = [];

    for (let elem of arr) if (!newArr.includes(elem)) newArr.push(elem);

    return newArr;
}
console.log(findUn4(arr2)); // [1, 2, 3, 4, 5, 'a', -2, -1]

function findUn5(arr) {
    let newArr = [];

    function find(elem, myArr) {
        if (myArr.length === 0) return newArr;

        if (!newArr.includes(elem)) newArr.push(elem);

        return find(myArr[0], myArr.slice(1));
    }

    return find(arr[0], arr.slice(1));
}
console.log(findUn5(arr2)); // [1, 2, 3, 4, 5, 'a', -2, -1]

function findUn5(arr) {
    let newArr = [];

    function find(elem) {
        if (!arr.includes(elem)) newArr.push(elem);
        return arr.length === 0
            ? newArr.reverse()
            : find(arr.splice(arr.length - 1, 1)[0]);
    }

    return find(arr.splice(arr.length - 1, 1)[0]);
}
console.log(findUn5(arr2)); //  [1, 2, 3, 4, 5, 'a', -2, -1]
// * ======================================================================================

// ? вернуть массив с уникальными значениями
arr3 = [1, 1, 1, 1, 3, 4, 1, 4, 2, 2, 4, 9, 'a', 9, 11, 1, 'b', 1, 'a'];

function findElements(arr) {
    let newArr = [];

    function find(elem, index) {
        let detect = 0;

        for (let i = 0; i < arr.length; i++) if (elem === arr[i]) detect += 1;

        if (detect === 1) newArr.push(elem);

        return index === arr.length - 1
            ? newArr
            : find(arr[index + 1], index + 1);
    }

    return find(arr[0], 0);
}
console.log(findElements(arr3)); // [3, 11, "b"]

function findElements2(arr) {
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
        let detect = 0;

        for (let j = 0; j < arr.length; j++) {
            if (arr[i] === arr[j]) detect += 1;
        }

        if (detect === 1) newArr.push(arr[i]);
    }

    return newArr;
}
console.log(findElements2(arr3)); // [3, 11, "b"]

// * ======================================================================================

// ? веррнуть схлопнутый массив
arr4 = ['a', 1, [15, [4, [15, 'a', [1]]], ['a', 1, [15, 'b']]]];

function myFindFunction(arr) {
    return arr.flat(Infinity);
}
console.log(myFindFunction(arr4)); // ["a", 1, 15, 4, 15, "a", 1, "a", 1, 15, "b"]

function myFindFunction2(arr) {
    let newArr = [];

    function find(myArr) {
        for (let i = 0; i < myArr.length; i++) {
            if (Array.isArray(myArr[i])) {
                find(myArr[i]); // ! если поставим return(то будет только одно разветвление погружения, а нам нужно два и более), то итерация не закончится и получится ["a", 1, 15, 4, 15, "a", 1]
            } else newArr.push(myArr[i]);
        }

        return newArr;
    }

    return find(arr);
}
console.log(myFindFunction2(arr4)); // ["a", 1, 15, 4, 15, "a", 1, "a", 1, 15, "b"]
// * ======================================================================================
// Вывести элемент повторяющийся три раха. Сложность алгоритма должна быть O(n) линейной.
function exists(arr) {
    const detect = {};

    for (let i = 0; i < arr.length; i++) {
        if (!detect[arr[i]]) {
            detect[arr[i]] = 1;
        } else if (detect[arr[i]] && detect[arr[i]] === 2) {
            return arr[i];
        }

        detect[arr[i]] += 1;
    }
}
//* ==============================================================================================
/*
    Вернуть больше всех повторяющееся число
*/
function exists(arr) {
    return Object.entries(arr.reduce((obj, el) => {
        obj[el] ? obj[el] += 1 : obj[el] = 1;
        return obj;
    }, {})).reduce((max, el) => max[1] < el[1] ? max = el : max)[0]
}

console.log(exists([4, 6, 7, 7, 1, 4, 6, 1, 7])); 
console.log(exists([4,6,7, 6, 6, 1,8, 4, 8, 8, 8]));

//* ==============================================================================================
/*
Функция принимает массив целых чисел, найдите, содержит ли массив какие-либо повторяющиеся элементы.
Функция вернет истину, если если какое то значение появляется не менее двух раз, лож, если каждый элемент уникален.
*/
function exists(arr) {
    return arr.length !== new Set(arr).size;
}

console.log(exists([4,6,7,7,1])); // true
console.log(exists([4,6,7,1,8])); // false

// * ===========================================
const arr = [2, 2, 1, 3, 3, 4, 1, 5, 4, 0, 9, 7, 9, 7, 5];

function f(arr) {
    return arr.find((el) => arr.indexOf(el) === arr.lastIndexOf(el))
}

console.log(f(arr));

// Вернуть число повторяющееся 2 раза
const arr = [2, 2, 1, 2, 8, 1, 3, 3, 3, 4, 8, 4, 0, 0, 1, 5, 5, 4, 0, 9, 9, 7, 7, 0, 9, 7, 5];

function f(arr) {
    return Object.entries(arr.reduce((acc, el) => {
        acc[el] ? acc[el] += 1 : acc[el] = 1;
        return acc;
    }, {})).find((el) => el[1] === 2)[0]
}

console.log(f(arr));

// * ==============================================================

// Вернуть новый массив чисел повторяющихся 2 раза
const arr2 = [6, 2, 2, 1, 2, 8, 1, 3, 3, 6, 3, 4, 8, 4, 0, 0, 1, 5, 5, 4, 0, 9, 9, 7, 7, 0, 9, 11, 11, 7, 5];

function f2(arr) {
    return Object.entries(arr.reduce((acc, el) => {
        acc[el] ? acc[el] += 1 : acc[el] = 1;
        return acc;
    }, {}))
    .filter((el) => el[1] === 2)
    .flat(Infinity)
    .filter((el) => typeof el === 'string');
}

console.log(f2(arr2));