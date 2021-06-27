"use strict";

/*
Задание с https://learn.javascript.ru/

Создайте декоратор spy(func), который должен возвращать обёртку,
которая сохраняет все вызовы функции в своём свойстве calls.
Каждый вызов должен сохраняться как массив аргументов.
*/
function spy(func) {}

function work(a, b) {
  console.log(a + b);
}

work = spy(work);
work(1, 2); // 3

work(4, 5); // 9

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = work.calls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var args = _step.value;
    console.log('call:' + args.join()); // "call:1,2", "call:4,5"
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}