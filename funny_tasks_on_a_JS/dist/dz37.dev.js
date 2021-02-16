"use strict";

var a = 5; // ! сработают одинаково с задержкой в секундой

setTimeout(function () {
  return console.log(a);
}, 1000);
setTimeout(console.log.bind(void 0, a), 1000); // ========================================================================================================
// ! var b = 33 все равно что window.b = 33

var b = 33;
console.log(window.b); // 33
// ========================================================================================================
// ! переписать данный код на промисы:

var printSeconds = function printSeconds(number, callback) {
  setTimeout(function () {
    console.log("\u041F\u0440\u043E\u0448\u043B\u043E \u0441\u0435\u043A\u0443\u043D\u0434 ".concat(number));
    callback();
  }, 1000);
};

printSeconds(1, function () {
  printSeconds(2, function () {
    printSeconds(3, function () {});
  });
}); // мой вариант

new Promise(function (resolve, reject) {
  var time = 0;
  resolve(function (number) {
    setTimeout(function () {
      return console.log("\u041F\u0440\u043E\u0448\u043B\u043E \u0441\u0435\u043A\u0443\u043D\u0434 ".concat(number));
    }, time += 1000);
  });
}).then(function (result) {
  result(1);
  return result;
}).then(function (result) {
  result(2);
  return result;
}).then(function (result) {
  result(3);
  return result;
}); // еще вариант

var printSeconds2 = function printSeconds2(number) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("\u041F\u0440\u043E\u0448\u043B\u043E \u0441\u0435\u043A\u0443\u043D\u0434 ".concat(number));
      resolve();
    }, 1000);
  });
};

printSeconds2(1).then(function () {
  return printSeconds2(2);
}).then(function () {
  return printSeconds2(3);
}); // ==============================================================================================