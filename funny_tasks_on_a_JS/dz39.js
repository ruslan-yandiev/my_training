/*
Напишите функцию на, которая принимает массив, состоящий из чисел
натурального ряда, идущих по возрастанию, и возвращает массив,
состоящий из чередующихся четных и нечетных чисел, идущих по убыванию.
Если массив, который принимает функция, начинается с четного числа,
то и массив, который она возвращает, тоже должен начинаться с четного, 
и наоборот.
*/
function sort(arr) {
    if (arr.length % 2 === 1) return arr.reverse();

    let one = [],
        two = [],
        result = [];

    for (i of arr) i % 2 === 0 ? two.push(i) : one.push(i);

    for (let i = one.length - 1; i >= 0; i--) {
        arr[0] % 2 === 0 ? result.push(two[i], one[i]) : result.push(one[i], two[i]);
    }

    return result;
}

console.log(sort([1, 2, 3, 4, 5, 6, 7, 8])); // [7,8,5,6,3,4,1,2]
console.log(sort([2, 3, 4, 5, 6])); // [6,5,4,3,2]
console.log(sort([2, 3, 4, 5, 6, 7])); // [6,7,4,5,2,3]

function sort2(arr) {
    return arr.map(
        (el, i, arr) =>
            arr[arr.length % 2 === 1 ? arr.length - i - 1 : i % 2 === 0 ? arr.length - i - 2 : arr.length - i],
    );
}

console.log(sort2([1, 2, 3, 4, 5, 6, 7, 8])); // [7,8,5,6,3,4,1,2]
console.log(sort2([2, 3, 4, 5, 6])); // [6,5,4,3,2]
console.log(sort2([2, 3, 4, 5, 6, 7])); // [6,7,4,5,2,3]
// * ==================================================================================

const arr = [1, 4, 9];
const result = 2 in arr;
console.log(result); // true потому, что оператор in смотрит только а ключи а индекс(ключ, свойство) 2 сть в массиве.

// * ====================================================

var w1 = window;
var w2 = self;
var w3 = window.window;
var w4 = window.self;
// Значения переменных w1, w2, w3, w4 строго равны между собой
// Но только переменная w2 будет работать в workers

// * ======================================================================

// ! Побитовые операторы
console.log(14 & 9); // 8 (1000)
// 1110 (14)
// 1001 (9)
// 1000 (8)
console.log(14 | 9); // 15 (1111)
// 1110 (14)
// 1001 (9)
// 1111 (15)
console.log(14 ^ 9); // 7 (111)
// 1110 (14)
// 1001 (9)
// 0111 (7)
console.log(~9); // меняет нули на единицы, а единицы на нули
// 9 на самом деле будет 0000000000000000000000000000000000001001
// превратит в           1111111111111111111111111111111111110110
// но в консоле покажет -1010 а в десятичной системе -10

// есть еще операторы сдвигов:
// >>
// <<
// >>>
// * ========================================================

/*
! Реального собеса.
Implement function check(str, bracketsConfig), that for given brackets
sequence will return true if it is correct and false otherwise.

In the second param there is bracketsConfig - the array of pairs
open-closed brackets. Each subarray includes only 2 elements - opening
and closing bracket.


Реализовать функцию check(str, bracketsConfig), что для заданных скобок
последовательность вернет истину, если она верна, и ложь в противном случае.

Во втором параметре есть bracketsConfig - массив пар
открытые-закрытые скобки. Каждый подмассив включает всего 2 элемента - открытие
и закрывающая скобка.
*/
function check(str, bracketsConfig) {
    if (str.length % 2 > 0) return false; // в этих вариантах не нужно, но будет правильно указать

    let detect = 0;
    let brackets = bracketsConfig.flat(Infinity);

    for (let i = 0; i < brackets.length; i += 2) {
        for (let j = 0; j < str.length; j++) {
            if (brackets[i] !== '|') {
                if (detect === 0 && str[j] === brackets[i + 1]) return false;
                if (str[j] === brackets[i]) detect += 1;
                if (str[j] === brackets[i + 1]) detect -= 1;
            }
        }

        if (
            str.startsWith(brackets[i]) &&
            !str.endsWith(brackets[i + 1]) &&
            str.indexOf(brackets[i]) + 1 !== str.indexOf(brackets[i + 1])
        ) {
            return false;
        }
    }

    return detect === 0;
}

console.log(check('()', [['(', ')']]), true); // -> true
console.log(check('((()))()', [['(', ')']]), true); // -> true
console.log(check('())(', [['(', ')']]), false); // -> false
console.log(
    check('([{}])', [
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
    ]),
    true,
); // -> true
console.log(
    check('[(])', [
        ['(', ')'],
        ['[', ']'],
    ]),
    false,
); // -> false
console.log(
    check('[]()', [
        ['(', ')'],
        ['[', ']'],
    ]),
    true,
); // -> true
console.log(
    check('[]()(', [
        ['(', ')'],
        ['[', ']'],
    ]),
    false,
); // -> false

// special case: opening and closing bracket can be the same :)

console.log(check('||', [['|', '|']]), true); // -> true
console.log(
    check('|()|', [
        ['(', ')'],
        ['|', '|'],
    ]),
    true,
); // -> true
console.log(
    check('|(|)', [
        ['(', ')'],
        ['|', '|'],
    ]),
    false,
); // -> false
console.log(
    check('|()|(||)||', [
        ['(', ')'],
        ['|', '|'],
    ]),
    true,
); // -> true
console.log(
    check('|(||||(||)||)|', [
        ['(', ')'],
        ['|', '|'],
    ]),
    true,
); // -> true

function check2(str, bracketsConfig) {
    const parsedBracketsConfig = bracketsConfig.map((r) => {
        return `${r[0]}${r[1]}`;
    });

    let prevLength = str.length;

    while (str !== '') {
        parsedBracketsConfig.forEach((r) => {
            str = str.replace(r, '');
        });

        if (prevLength === str.length) return false;
        prevLength = str.length;
    }

    return true;
}

console.log(check2('()', [['(', ')']]), true); // -> true
console.log(check2('((()))()', [['(', ')']]), true); // -> true
console.log(check2('())(', [['(', ')']]), false); // -> false
console.log(
    check2('([{}])', [
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
    ]),
    true,
); // -> true
console.log(
    check2('[(])', [
        ['(', ')'],
        ['[', ']'],
    ]),
    false,
); // -> false
console.log(
    check2('[]()', [
        ['(', ')'],
        ['[', ']'],
    ]),
    true,
); // -> true
console.log(
    check2('[]()(', [
        ['(', ')'],
        ['[', ']'],
    ]),
    false,
); // -> false

// special case: opening and closing bracket can be the same :)

console.log(check2('||', [['|', '|']]), true); // -> true
console.log(
    check2('|()|', [
        ['(', ')'],
        ['|', '|'],
    ]),
    true,
); // -> true
console.log(
    check2('|(|)', [
        ['(', ')'],
        ['|', '|'],
    ]),
    false,
); // -> false
console.log(
    check2('|()|(||)||', [
        ['(', ')'],
        ['|', '|'],
    ]),
    true,
); // -> true
console.log(
    check2('|(||||(||)||)|', [
        ['(', ')'],
        ['|', '|'],
    ]),
    true,
); // -> true

const check3 = (str, arrayPars) => {
    if (str.length % 2) return false;
    const mapPars = new Map(arrayPars);
    const newArr = Array.from(str);
    let nextPar = '';
    let isRight = false;
    newArr.forEach((item) => {
        if (!nextPar.startsWith(item)) {
            isRight = false;
            nextPar = mapPars.get(item) + nextPar;
        } else {
            isRight = true;
            nextPar = nextPar.slice(1, nextPar.length);
        }
    });
    return isRight;
};

console.log(check3('()', [['(', ')']]), true); // -> true
console.log(check3('((()))()', [['(', ')']]), true); // -> true
console.log(check3('())(', [['(', ')']]), false); // -> false
console.log(
    check3('([{}])', [
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
    ]),
    true,
); // -> true
console.log(
    check3('[(])', [
        ['(', ')'],
        ['[', ']'],
    ]),
    false,
); // -> false
console.log(
    check3('[]()', [
        ['(', ')'],
        ['[', ']'],
    ]),
    true,
); // -> true
console.log(
    check3('[]()(', [
        ['(', ')'],
        ['[', ']'],
    ]),
    false,
); // -> false

// special case: opening and closing bracket can be the same :)

console.log(check3('||', [['|', '|']]), true); // -> true
console.log(
    check3('|()|', [
        ['(', ')'],
        ['|', '|'],
    ]),
    true,
); // -> true
console.log(
    check3('|(|)', [
        ['(', ')'],
        ['|', '|'],
    ]),
    false,
); // -> false
console.log(
    check3('|()|(||)||', [
        ['(', ')'],
        ['|', '|'],
    ]),
    true,
); // -> true
console.log(
    check3('|(||||(||)||)|', [
        ['(', ')'],
        ['|', '|'],
    ]),
    true,
); // -> true
// * ==================================================================
