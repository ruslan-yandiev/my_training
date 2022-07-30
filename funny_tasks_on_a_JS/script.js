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

// const { relativeTimeRounding } = require("moment");

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

//* =======================================================================================================================

//! 39
// const video = {
//   title: 'title',
//   tags: ['a', 'b', 'c'],
//   showTags() {
//     this.tags.forEach((tag) => {
//       console.log(this.title, tag);
//     });
//   }
// }

// video.showTags();
//* =======================================================================================================================
function getDaysBetweenDates(date1, date2) {
  if (arguments.length < 2) throw new TypeError("TypeError");
  if (date1 === null || date2 === null) return 365;

  date1 = Date.parse(new Date(date1));
  date2 = Date.parse(new Date(date2));

  if (!date1 || !date2) return NaN;

  let result;

  if (date1 > date2) {
    result = Math.ceil((date2 - date1) / (86400 * 1000));
    return result === -0 ? 0 : result;
  }

  result = date2 > date1 ? date2 - date1 : date1 - date2;

  return Math.floor(result / (86400 * 1000));
}

console.log(Date.parse(null));
console.log(getDaysBetweenDates("1-1-2020", "1-2-2020")); // 1
console.log(getDaysBetweenDates(new Date(2011, 6, 2, 6, 0), new Date(2012, 6, 2, 6, 0))); // 366
console.log(getDaysBetweenDates(1409796000000, 1409925600000)); // 1
console.log(getDaysBetweenDates(new Date(2011, 6, 2, 6, 0), new Date(2012, 6, 2, 18, 0))); // 366
