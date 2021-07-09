"use strict";

/*
Результатом декоратора debounce(f, ms) должна быть обёртка, 
которая передаёт вызов f не более одного раза в ms миллисекунд. 
Другими словами, когда мы вызываем debounce, 
это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.

На практике debounce полезен для функций, которые получают/обновляют данные, 
и мы знаем, что повторный вызов в течение короткого промежутка времени не даст ничего нового. 
Так что лучше не тратить на него ресурсы.
*/
function debounce(f, ms) {
  var detect = true;
  return function (arg) {
    if (detect) {
      f(arg);
      detect = false;
    }

    setTimeout(function () {
      return detect = true;
    }, ms);
  };
}

var f = debounce(console.log, 1000);
f(1); // выполняется немедленно

f(2); // проигнорирован

setTimeout(function () {
  return f(3);
}, 100); // проигнорирован (прошло только 100 мс)

setTimeout(function () {
  return f(4);
}, 1100); // выполняется

setTimeout(function () {
  return f(5);
}, 1500); // проигнорирован (прошло только 400 мс от последнего вызова)

setTimeout(function () {
  return f(6);
}, 2300); // выполняется