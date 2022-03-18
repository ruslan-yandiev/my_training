// Что будет в консоли?
var promise = new Promise((res, rej) => {
    res(promise);
});
console.log(promise); //<fulfilled>: undefined будет в промисе, а при let выбросит ошибку

// Назвать четко состояние промиса в console.log
let promise3 = new Promise((res, rej) => {
    setTimeout(() => res(promise3), 1000)
});

console.log(promise3); // состояние pending
// ! Промисы выполняются после каждого таска(после каждой задачи, каждого кода) причем все до конца, а уже всякие setTimeout евентлуп тягает по одному за каждый проход

// ! при сравнении разных типов JS приводит все к числам
console.log([] == ''); // true (при нестрогом будет сравнивать только по значению, а там везде пусто 0 == 0)
console.log(Boolean([]) == Boolean("")); // false (true == false) тут мы принудительн опривели к буливому

// * ==============================================================================================
/*
Доминантные элементы массива.
Доминантным является элемент массива, который больше, чем все элементы, 
следующих за ним. 
Напишите функцию, которая принимает массив чисел и возвращает массив из 
доминантных чисел.
*/
function solve(arr) {
    const result = [];

    function find(num, index) {
        if (num > Math.max(...arr.slice(index + 1))) result.push(num);
        return index === arr.length - 1 ? result : find(arr[index + 1], index + 1);
    }

    return find(arr[0], 0);
}

console.log(solve([16,17,14,3,14,5,2])); // [17, 14, 5, 2]
console.log(solve([92,52,93,31,89,87,77,105])); // [105]
console.log(solve([75,47,42,56,13,55])); // [75, 56, 55]
console.log(solve([67,54,27,85,66,88,31,24,49])); // [88, 49]

function solve2(arr) {
    const result = [];

    function find(num, index) {
        let detect = false;

        for (let i = index + 1; i < arr.length; i++) if(num <= arr[i]) detect = true;

        if (!detect) result.push(num);

        return index === arr.length - 1 ? result : find(arr[index + 1], index + 1);
    }

    return find(arr[0], 0);
}

console.log(solve2([16,17,14,3,14,5,2])); // [17, 14, 5, 2]
console.log(solve2([92,52,93,31,89,87,77,105])); // [105]
console.log(solve2([75,47,42,56,13,55])); // [75, 56, 55]
console.log(solve2([67,54,27,85,66,88,31,24,49])); // [88, 49]


function solve3(arr) {
    return arr.reduce((acc, num, index) => {
        if (num > Math.max(...arr.slice(index + 1))) acc.push(num);
        return acc;
    }, []);
}

console.log(solve3([16,17,14,3,14,5,2])); // [17, 14, 5, 2]
console.log(solve3([92,52,93,31,89,87,77,105])); // [105]
console.log(solve3([75,47,42,56,13,55])); // [75, 56, 55]
console.log(solve3([67,54,27,85,66,88,31,24,49])); // [88, 49]

function solve4(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) if (arr[i] > Math.max(...arr.slice(i + 1))) result.push(arr[i]);

    return result;
}

console.log(solve4([16,17,14,3,14,5,2])); // [17, 14, 5, 2]
console.log(solve4([92,52,93,31,89,87,77,105])); // [105]
console.log(solve4([75,47,42,56,13,55])); // [75, 56, 55]
console.log(solve4([67,54,27,85,66,88,31,24,49])); // [88, 49]

function solve(arr) {
    const result = [];

    a: for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] <= arr[j]) continue a;
        }
        result.push(arr[i]);
    }

    return result;
}

console.log(solve([16,17,14,3,14,5,2])); // [17, 14, 5, 2]
console.log(solve([92,52,93,31,89,87,77,105])); // [105]
console.log(solve([75,47,42,56,13,55])); // [75, 56, 55]
console.log(solve([67,54,27,85,66,88,31,24,49])); // [88, 49]

function solve(arr) {
    return arr.reduce((acc, el, index) => {
        if (el > Math.max(...arr.slice(index + 1))) acc.push(el);
        return acc;
    }, []);
}

console.log(solve([16,17,14,3,14,5,2])); // [17, 14, 5, 2]
console.log(solve([92,52,93,31,89,87,77,105])); // [105]
console.log(solve([75,47,42,56,13,55])); // [75, 56, 55]
console.log(solve([67,54,27,85,66,88,31,24,49])); // [88, 49]
// * ===========================================================================================

function intersect(arr) {
    if (arr.length === 0) return arr;

    const arr2 = [];

    for (let i = 0; i < arr.length; i++) arr2.push(arr[i].split('-'));

    function find(elem, index) {
        for (let i = index + 1; i < arr2.length; i++) {
            if (+elem[1] < +arr2[i][1] && +elem[1] >= +arr2[i][0]) {
                elem[1] = arr2[i][1];
                if (+elem[0] > +arr2[i][0]) elem[0] = arr2[i][0];
                arr2.splice(i, 1);
                i--;
            }
        }

        return index === arr2.length - 1 ? arr2 : find(arr2[index + 1], index + 1);
    }

    return find(arr2[0], 0).reduce((acc, elem) => {
        acc.push(elem.join('-'));
        return acc;
    }, []);
}

console.log(intersect(['1-5', '7-9', '2-6']));     // ['1-6', '7-9']
console.log(intersect(['2-4', '5-5', '5-15']));    // ['2-4', '5-15']
console.log(intersect([]));



function intersect2(arr) {
    if (arr.length === 0) return arr;

    const arr2 = [];

    for (let i = 0; i < arr.length; i++) arr2.push(arr[i].split('-'));
    
    for (let i = 0; i < arr2.length; i++) {
        for (let j = i + 1; j < arr2.length; j++) {
            if (+arr2[i][1] < +arr2[j][1] && +arr2[i][1] >= +arr2[j][0]) {
                arr2[i][1] = arr2[j][1];
                if (+arr2[i][0] > +arr2[j][0]) arr2[i][0] = arr2[j][0];
                arr2.splice(j, 1);
                j--;
            }
        }
    }

    return arr2.reduce((acc, elem) => {
        acc.push(elem.join('-'));
        return acc;
    }, []);
}

console.log(intersect2(['1-5', '7-9', '2-6']));     // ['1-6', '7-9']
console.log(intersect2(['2-4', '5-5', '5-15']));    // ['2-4', '5-15']
console.log(intersect2([]));    


function intersect(arr) {
    const result = [];
    arr.sort((a, b) => +a[0] - +b[0]);

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === arr[i][2] && arr.some((el) => el[0] === arr[i][0] || el[2] === arr[i][0])) continue;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i][0] < arr[j][0] && arr[i][2] > arr[j][0] && arr[i][2] < arr[j][2]) {
                arr[i] = arr[i][0] + '-' + arr[j][2]; // ну или arr.splice(i, 1,  arr[i][0] + '-' + arr[j][2]);
                arr.splice(j, 1);
                j--;
            }
        }

        result.push(arr[i]);
    }

    return result;
}

console.log(intersect(['1-5', '7-9', '2-6']));     // ['1-6', '7-9']
console.log(intersect(['2-4', '5-5', '5-15']));    // ['2-4', '5-15']
console.log(intersect([]));
console.log(intersect(['1-5', '7-9', '2-6', '4-7']));     // ['1-7', '7-9']
