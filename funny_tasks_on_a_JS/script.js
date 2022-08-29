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
/*
Написать функцию applyFn, которая принимает на вход 2 параметра:

Массив с входными данными
Функцию, которую нужно применить к каждому элементу массива входных данных applyFn(dataArr, callback);
Функция должна возвращать объект в котором 2 массива массив результатов succeeded и массив ошибок errors с правильными call stacks

{
  succeeded: [...], // Массив данных после функции обработчика, как при вызове .map
  errors: [...],    // Массив инстансов ExecutionError
}
Создать класс ошибки ExecutionError с методом .getArgData(), по которому можно получить входные данные, на которых упала функция-коллбэк, 
то есть возвращать element входного массива dataArr, если вызов callback(element) сгенерирует ошибку

Стек трейс должен указывать на корректную позицию в функции-коллбэке Примечание: класс ExecutionError нужно сделать наследником другого класса
*/
class ExecutionError extends Error {
  constructor(elem) {
    super("ExecutionError");
    this.name = "ExecutionError";
    this.elem = elem;
  }

  getArgData() {
    return this.elem;
  }
}

function applyFn(dataArr, callback) {
  const result = { succeeded: [], errors: [] };
  let detect;
  let error;
  let step = 1;

  for (let i = 0; i < dataArr.length; i++) {
    try {
      detect = callback(dataArr[i]);
      result.succeeded.push(detect);
    } catch (err) {
      error = new ExecutionError(dataArr[i]);
      error.stack = `not ok ${step}`;
      step += 1;
      result.errors.push(error);
    }
  }

  return result;
}

var { succeeded, errors } = applyFn([1, 2, 3], (arg) => arg + 1);
console.log(succeeded); //   succeeded: [2, 3, 4],
console.log(errors); //   errors: [],

const dataArr = ['{"login":"login","password":"password"}', "{{}"];
const callback = JSON.parse;
var { succeeded, errors } = applyFn(dataArr, callback);
console.log(succeeded); //   succeeded2: [{ login: 'login', password: "password" }],
console.log(errors); //   errors2: [ExecutionError],
console.log(errors[0].getArgData()); // '{{}'
