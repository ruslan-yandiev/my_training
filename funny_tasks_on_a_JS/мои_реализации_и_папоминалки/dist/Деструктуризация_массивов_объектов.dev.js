"use strict";

var _console;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// * Деструтурирование массива: =============================================
var arr1 = [1, 2, 3];
var arr2 = [1, 2, 3];

(_console = console).log.apply(_console, ['a'].concat(arr1, ['b'], arr2)); // a 1 2 3 b 1 2 3


console.log(['a'].concat(arr1, ['b'], arr2)); //[ "a", 1, 2, 3, "b", 1, 2, 3 ]

var fib = [1, 1, 2, 3, 5, 8, 13];
var a1 = fib[0],
    b1 = fib[1],
    c1 = fib[2],
    _fib$ = fib[7],
    d1 = _fib$ === void 0 ? 'параметр по умолчанию' : _fib$; //

console.log(a1, b1, c1, d1); // 1 1 2 параметр по умолчанию

var a2 = fib[1],
    b2 = fib[3]; // достаем значение через один или более шагов

console.log(a2, b2); //1 3

var line = [[10, 17], [14, 7]];

var _line$ = _slicedToArray(line[0], 2),
    p1x = _line$[0],
    p1y = _line$[1],
    _line$2 = _slicedToArray(line[1], 2),
    p2x = _line$2[0],
    p2y = _line$2[1];

console.log(p1x, p1y, p2x, p2y); // 10 17 14 7

var men = ['ruslan,', 'sultan', 'moohamed'];
var men1 = men[0],
    othersMen = men.slice(1);
console.log(men1, othersMen); // ruslan, [ "sultan", "moohamed" ]

var dict = {
  duck: 'quack',
  dog: 'wuff',
  mouse: 'squeak',
  hamster: 'squeak'
};
var res = Object.entries(dict).filter(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      value = _ref2[1];

  return value === 'squeak';
}).map(function (_ref3) {
  var _ref4 = _slicedToArray(_ref3, 1),
      key = _ref4[0];

  return key;
});
console.log(res); // [ "mouse", "hamster" ]
// * Деструтурирование просто объекта =======================================

var obj1 = {
  a: 1,
  b: 2,
  c: 3
};
var obj2 = {
  d: 4,
  e: 5,
  f: 6
};

var obj = _objectSpread({}, obj1, {}, obj2);

console.log(obj); // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }

var obj3 = {
  d: 0,
  e: 0,
  f: 0
};
console.log(_objectSpread({}, obj, {}, obj3)); // { a: 1, b: 2, c: 3, d: 0, e: 0, f: 0 }

var a = obj1.a,
    other = _objectWithoutProperties(obj1, ["a"]); // в а констатту запишим знаяение свойства а, в константу other создадим объект и запишем остальные свойства из объекта obj1 за исключением свойства а


console.log(a, other); // 1 { b: 2, c: 3 }

var person = {
  firstName: 'Ruslan',
  lastName: 'Yandiev',
  age: 35
}; // const firstName = person.firstName;
// const lastName = person.lastName;

var firstName = person.firstName,
    lastName = person.lastName;
console.log(firstName, lastName); // Ruslan Yandiev

var person2 = {
  name: {
    first: 'Ruslan',
    last: 'Yandiev'
  },
  age: 35
};
var _person2$name = person2.name,
    first = _person2$name.first,
    last = _person2$name.last;
console.log(first, last); // Ruslan Yandiev

var _person2$name2 = person2.name,
    firstName2 = _person2$name2.first,
    lastName2 = _person2$name2.last;
console.log(firstName2, lastName2); // Ruslan Yandiev
// const role = person.role || 'user';
// console.log(role);
// const role = person.role ?? 'user'; // коректно работает с 0 и "" не преобразуя их в false
// console.log(role);
// извлечние значений с установкой значения по умолчанию

var _person$role = person.role,
    role = _person$role === void 0 ? 'user' : _person$role; // извлечь значение свойства role, если такого нет то создать константу role со значением 'user'

console.log(role); // "user"

var _person$permissions = person.permissions;
_person$permissions = _person$permissions === void 0 ? {} : _person$permissions;
var _person$permissions$r = _person$permissions.role2,
    role2 = _person$permissions$r === void 0 ? 'user2' : _person$permissions$r; // если нужно извлечь вложенные данные установив дефолтное значение

console.log(role2); // 'user2
// укажем функции параметры по умолчанию через диструктурирование объекта, при получении функцией в аргументы объекта
// {....} = {} так мы делаем, чтобы не возникала ошибка если объект для диструктурирования не был, тогда он будет использовать наш пустой объект для дефолтной деструктуризации и не возникнет ошибки

function connect(a) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$host = _ref5.host,
      host = _ref5$host === void 0 ? 'localhost' : _ref5$host,
      _ref5$port = _ref5.port,
      port = _ref5$port === void 0 ? 3000 : _ref5$port,
      _ref5$user = _ref5.user,
      user = _ref5$user === void 0 ? 'Ruslan' : _ref5$user;

  console.log(a, 'user:', user, 'port:', port, 'host:', host);
}

connect('Как в Ruby.', {
  port: 1111
}); // Как в Ruby. user: Ruslan port: 1111 host: localhost
// ! Комбинированный способ диструктурирования объекта и массива

var shape = {
  type: 'segment',
  coordinates: {
    start: [10, 15],
    end: [17, 15]
  }
};

var _shape$coordinates = shape.coordinates,
    _shape$coordinates$st = _slicedToArray(_shape$coordinates.start, 2),
    startX = _shape$coordinates$st[0],
    startY = _shape$coordinates$st[1],
    _shape$coordinates$en = _slicedToArray(_shape$coordinates.end, 2),
    endX = _shape$coordinates$en[0],
    endY = _shape$coordinates$en[1];

console.log(startX, startY, endX, endY); // 10 15 17 15