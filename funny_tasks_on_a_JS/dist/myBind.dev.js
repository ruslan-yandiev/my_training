"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Метод
Function.prototype.myBind1 = function (context) {
  var _this = this;

  for (var _len = arguments.length, argum = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    argum[_key - 1] = arguments[_key];
  }

  // ! либо стрелочная так-как у нее нет своего свойства this, и берет чужой, внешний всегда
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this.apply(context, argum.concat(args));
  }; // ! иначе обычную функцию и декларативную придется передать this через переменную, так-как у них они свойство this свое и переназначится только в месте вызова.
  // let a = this;
  // return function (...args) {
  //     a.call(context, ...argum.concat(args));
  // };
}; // Функция


function myBind2(f, context) {
  for (var _len3 = arguments.length, argum = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    argum[_key3 - 2] = arguments[_key3];
  }

  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    f.call.apply(f, [context].concat([].concat(argum, args)));
  };
}

function func(a, b, c, d) {
  console.log(this, a, b, c, d);
}

var person = {
  name: 'Андрей'
};
func.myBind1(person, 'Ruslan')(5, 4, 3);
myBind2(func, person, 'Ruslan')(5, 4, 3); // ===================

var bind3 = function bind3(fn, context) {
  for (var _len5 = arguments.length, rest = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
    rest[_key5 - 2] = arguments[_key5];
  }

  return function () {
    var uniqId = Date.now().toString();
    context[uniqId] = fn; //  concat объединяет массивы

    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    var result = context[uniqId].apply(context, _toConsumableArray(rest.concat(args)));
    delete context[uniqId];
    return result;
  };
}; // Пример:


function greeting2(greeting, punctuation) {
  return "".concat(greeting, " ").concat(this.userName).concat(punctuation);
}

var alex2 = {
  userName: 'Alex2'
};
var alexBound2 = bind2(greeting2, alex2);
console.log(alexBound2('Hello', '!')); // 'Hello Alex2!'