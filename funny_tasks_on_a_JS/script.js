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

//* =======================================================================================================================
/*
  Дан массив из нулей и единиц. Нужно определить, какой максимальный по длине подинтервал единиц можно получить, 
  удалив ровно один элемент массива.
  [1, 1, 0]
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]
*/
function maxOness(arr) {
  // detect и index можно заменить на один объкт
  let detect;
  let index;

  let result = 0;
  let step = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      step += 1;
    } else if (arr[i] === 0 && !detect) {
      index = i;
      detect = true;
    } else {
      if (result < step) result = step;
      step = 0;
      i = index;
      detect = false;
    }
  }

  if (result < step) result = step;

  return result;
}

console.log(maxOness([1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]), 6);
console.log(maxOness([1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1]), 10);
console.log(maxOness([1, 1, 0]), 2);
