/*
Результатом декоратора debounce(f, ms) должна быть обёртка, 
которая передаёт вызов f не более одного раза в ms миллисекунд. 
Другими словами, когда мы вызываем debounce, 
это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.

На практике debounce полезен для функций, которые получают/обновляют данные, 
и мы знаем, что повторный вызов в течение короткого промежутка времени не даст ничего нового. 
Так что лучше не тратить на него ресурсы.
*/
// function debounce(f, ms) {
//   let detect = true;

//   return function (arg) {
//     if (detect) {
//       f(arg);
//       detect = false;
//     }

//     setTimeout(() => (detect = true), ms);
//   };
// }

// let f = debounce(console.log, 1000);

// f(1); // выполняется немедленно
// f(2); // проигнорирован

// setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout(() => f(4), 1100); // выполняется
// setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
// setTimeout(() => f(6), 2300); // выполняется

// // http://espressocode.top/length-of-the-longest-substring-without-repeating-characters/

// /*
// В строке найти длину самой большей подстроки с повторяющимися символами
// */
// function f(str) {
//   let arr = [];
//   let detect = 1;

//   for (let i = 0; i < str.length - 1; i++) {
//     if (str[i] === str [i + 1]) {
//       detect += 1;
//     } else {
//       arr.push(detect);
//       detect = 1;
//     }
//   }

//   return Math.max(...arr);
// }

// console.log(f('paralleeeeelepipeуууt'));

// /*
// В строке найти длину самой большей подстроки с повторяющимися символами и вывести символ и длинну
// */
// function f2(str) {
//   let obj = {};
//   let arr = [];
//   let detect = 1;

//   for (let i = 0; i < str.length - 1; i++) {
//     if (str[i] === str [i + 1]) {
//       detect += 1;
//     } else {
//       obj[str[i]] = detect;
//       arr.push(obj); //? узнать почему arr.push(obj[str[i]] = detect) или arr.push({}[str[i]] = detect) просто запушить число из detect в массив без объекта?
//       detect = 1;
//       obj = {};
//     }
//   }

//   let result = arr.reduce((acc, el) => {
//     if (Object.values(el)[0] > Object.values(acc)[0]) {
//       acc = el;
//     }
//     return acc;
//   });

//   return `${Object.keys(result)[0]}: ${Object.values(result)[0]}`
// }

// console.log(f2('paralleeeeelepipeуууt'));

// Array.prototype.myFilter = function (f) {
//   const arr = [];

//   for (let i = 0; i < this.length; i++) {
//     if (f(this[i])) arr.push(this[i]);
//   }

//   return arr;
// }

// console.log([1,2,3,4,5].myFilter((n) => n < 3));