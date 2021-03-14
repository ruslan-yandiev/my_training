// const check = (str, arrayPars) => {
//     if (str.length % 2) return false;
//     const mapPars = new Map(arrayPars);
//     const newArr = Array.from(str);
//     let nextPar = '';
//     let isRight = false;
//     newArr.forEach((item) => {
//         if (!nextPar.startsWith(item)) {
//             isRight = false;
//             nextPar = mapPars.get(item) + nextPar;
//         } else {
//             isRight = true;
//             nextPar = nextPar.slice(1, nextPar.length);
//         }
//     });
//     return isRight;
// };

// console.log(check('()', [['(', ')']]), true); // -> true
// console.log(check('((()))()', [['(', ')']]), true); // -> true
// console.log(check('())(', [['(', ')']]), false); // -> false
// console.log(
//     check('([{}])', [
//         ['(', ')'],
//         ['[', ']'],
//         ['{', '}'],
//     ]),
//     true,
// ); // -> true
// console.log(
//     check('[(])', [
//         ['(', ')'],
//         ['[', ']'],
//     ]),
//     false,
// ); // -> false
// console.log(
//     check('[]()', [
//         ['(', ')'],
//         ['[', ']'],
//     ]),
//     true,
// ); // -> true
// console.log(
//     check('[]()(', [
//         ['(', ')'],
//         ['[', ']'],
//     ]),
//     false,
// ); // -> false

// // special case: opening and closing bracket can be the same :)

// console.log(check('||', [['|', '|']]), true); // -> true
// console.log(
//     check('|()|', [
//         ['(', ')'],
//         ['|', '|'],
//     ]),
//     true,
// ); // -> true
// console.log(
//     check('|(|)', [
//         ['(', ')'],
//         ['|', '|'],
//     ]),
//     false,
// ); // -> false
// console.log(
//     check('|()|(||)||', [
//         ['(', ')'],
//         ['|', '|'],
//     ]),
//     true,
// ); // -> true
// console.log(
//     check('|(||||(||)||)|', [
//         ['(', ')'],
//         ['|', '|'],
//     ]),
//     true,
// ); // -> true

// // Дано неупорядоченный массив целых чисел и значение sum. Верните true,
// // если сумма любых двух элементов равняется значению sum. В противном случае верните false.
// const findSum = (arr, val) => {
//     let searchValues = new Set();
//     searchValues.add(val - arr[0]);
//     for (let i = 1, length = arr.length; i < length; i++) {
//         let searchVal = val - arr[i];
//         if (searchValues.has(arr[i])) {
//             return true;
//         } else {
//             searchValues.add(searchVal);
//         }
//     }
//     return false;
// };

// const findSum = (arr, sum) => arr.some(((set) => (n) => set.has(n) || !set.add(sum - n))(new Set()));

/*
Реализуйте функцию squareDigits, функция принимает число, 
вернуть функция должна также число, которое получается 
при конкатенировании возведенных в квадрат цифр переданного 
внутрь функции числа.
*/
// ============================================
// console.log('How quickly daft jumping zebras vex.'.toLowerCase());
// function isPangram(string) {
//     let arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//     let sizeResult = arr_en.length;
//     string = string.toLowerCase();

//     for (let i = 0; i < arr_en.length; i++) {
//         if (string.includes(arr_en[i])) {
//             sizeResult -= 1;
//             arr_en.splice(i, 1);
//             i--;
//         }
//     }

//     return sizeResult === 0;
// }
