"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
Прислал Serega Mangushev.
В функцию realizeDistance передается дистанция, которую должен проехать человек,
вторым параметром передается дистанция после которой необходимо сделать 
остановку. Необходимо вывести лог всего пути внутри функции, как в примере.
*/
function realizeDistance(distance, stopAfter) {
  if (distance < stopAfter) return "\u0412\u044B \u043F\u0440\u043E\u0435\u0445\u0430\u043B\u0438 ".concat(distance, " \u0438 \u0434\u043E\u0435\u0445\u0430\u043B\u0438 \u0434\u043E \u0442\u043E\u0447\u043A\u0438.");
  var num = 0;
  var sum = 0;

  function steps(d, s) {
    sum += s;
    num += 1;
    console.log("\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u2116".concat(num, ". \u0412\u044B \u043F\u0440\u043E\u0435\u0445\u0430\u043B\u0438 ").concat(sum, " \u043C\u0435\u0442\u0440\u043E\u0432."));
    if (sum + s < distance) steps(d - sum, s);
    return "\u0412\u044B \u043F\u0440\u043E\u0435\u0445\u0430\u043B\u0438 \u0435\u0449\u0435 ".concat(d - sum, " \u043C\u0435\u0442\u0440\u043E\u0432 \u0438 \u0434\u043E\u0435\u0445\u0430\u043B\u0438 \u0434\u043E \u0442\u043E\u0447\u043A\u0438.");
  }

  return steps(distance, stopAfter);
} // Вы проехали 100 метров и доехали до точки.


console.log(realizeDistance(100, 150));
/*
Остановка №1. Вы проехали 300 метров.
Остановка №2. Вы проехали 600 метров.
Остановка №3. Вы проехали 900 метров.
Вы проехали еще 100 метров и доехали до точки.
*/

console.log(realizeDistance(1000, 300)); // * ============================================================================

/*
Дан массив возрастов в семье, вернуть
массив c возрастом самого младшего, самого старшего и разницу между самым
старшим и младшим. Если ребенку 9 месяцев, считаем как 0. P.S. Желательно
не использовать встроенные функции типа sort и т.п.
*/

function differenceInAges(ages) {
  for (var i = 0; i < ages.length; i++) {
    for (var j = i; ages[j] < ages[j - 1]; j--) {
      var _ref = [ages[j - 1], ages[j]];
      ages[j] = _ref[0];
      ages[j - 1] = _ref[1];
    }
  }

  if (ages[0] === 9) ages[0] = 0;
  return [ages[0], ages[ages.length - 1], ages[ages.length - 1] - ages[0]];
}

console.log(differenceInAges([82, 15, 6, 38, 35])); // [6, 82, 76]

console.log(differenceInAges([57, 99, 14, 32])); // [14, 99, 85]
// * ===================================================================================

/*
В функцию mostFrequentDays передается год (целое число), необходимо реализовать
функцию так, чтобы из нее вернулся массив с наиболее часто встречаемыми днями
недели в году, что был передан. Массив должен быть отсортирован по дням недели
(от понедельника к воскресенью).

В данном варианте правильные ответы, задача верна.
*/

function mostFrequentDays(year) {
  return new Date(year, 1, 29).getMonth() === 1 ? [new Date(year, 0, 2), new Date(year, 0, 1)].sort(function (a, b) {
    return (a.getDay() === 0 ? 7 : a.getDay()) - (b.getDay() === 0 ? 7 : b.getDay());
  }).map(function (val) {
    return val.toLocaleString('ru', {
      weekday: 'long'
    });
  }) : [new Date(year, 0, 1).toLocaleString('ru', {
    weekday: 'long'
  })];
}

console.log(mostFrequentDays(2016)); // ["пятница", "суббота"]

console.log(mostFrequentDays(2019)); // ["вторник"]

console.log(mostFrequentDays(2020)); // ["среда", "четверг"]
// * ========================================================================================

/*
Задача генерацию случайного постфикса
На вход получаем значение, для которого нужно сгенерировать постфикс. Если
постфикс уже запрашивался ранее - возвращаем его.
Если нет - генерируем строку заданной длины, с заданным префиксом. В качестве
рандомных символов могут быть буквы латинского алфавита в малом регистре и цифры.
*/

function genRandomPostfix(prefix, num) {
  var obj = {};
  var pref = prefix;
  var size = num;
  var rand = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return function (str) {
    if (str in obj) return obj[str];
    var randSum = '';

    for (var i = 0; i < size; i++) {
      randSum += rand[Math.floor(Math.random() * rand.length)];
    }

    return obj[str] = pref + randSum;
  };
}

var getRandomString = genRandomPostfix('_prefix_', 4); //_prefix_ag6t - это пример, последние 4 цифры могут быть любые

console.log(getRandomString('5689u')); //_prefix_56po  - это пример, последние 4 цифры могут быть любые

console.log(getRandomString('1iuo')); // _prefix_ag6t - это пример, последние 4 цифры могут быть любые, но должно
// совпадать с первым console.log

console.log(getRandomString('5689u'));
console.log(getRandomString('1iuo444'));
console.log(getRandomString('1iuo'));
console.log('==========================================='); // 2 Используя глобальный объект window Разобраться почему не верно работает и как оно работает.

function genRandomPostfix2(prefix, num) {
  var obj = {};
  return function (str) {
    if (!obj.hasOwnProperty(str)) obj[str] = window.btoa(str).slice(0, num);
    return "".concat(prefix).concat(obj[str]);
  };
}

var getRandomString2 = genRandomPostfix2('_prefix_', 4); //_prefix_ag6t - это пример, последние 4 цифры могут быть любые

console.log(getRandomString2('5689u')); //_prefix_56po  - это пример, последние 4 цифры могут быть любые

console.log(getRandomString2('1iuo')); // _prefix_ag6t - это пример, последние 4 цифры могут быть любые, но должно
// совпадать с первым console.log

console.log(getRandomString2('5689u'));
console.log(getRandomString2('1iuo444'));
console.log(getRandomString2('1iuo')); // * ==============================================================================
// ! МЕТОДЫ МАССИВА: =============== ///////////////////////////////////// ==============================

var arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.slice(1, 3)); // [2, 3]

console.log(arr.concat(['a', 'b', 'c'])); // [1, 2, 3, 4, 5, 6, 7, 'a', 'b', 'c']

console.log([].concat(_toConsumableArray(arr), ['a', 'b', 'c'])); // [1, 2, 3, 4, 5, 6, 7, 'a', 'b', 'c']

console.log(arr.join('')); // '1234567'

console.log(arr.join(' ')); // '1 2 3 4 5 6 7'

console.log(arr.join(', ')); // '1, 2, 3, 4, 5, 6, 7'

console.log(arr.join('').split('')); // [ "1", "2", "3", "4", "5", "6", "7" ]

console.log(arr.join('').split(' ')); // ['1234567'];

console.log(arr.join('').split()); // ['1234567'];

console.log(arr.includes(5)); // true

console.log(arr.indexOf(3)); // 2 ищит с начала массива, если не найдет вернет -1

console.log(arr.lastIndexOf(3)); // 2 ищит с конца массива если не найдет вернет -1

console.log(arr.find(function (elem, index) {
  return elem === 4;
})); // 4

console.log(arr.filter(function (elem, index) {
  return elem > 3;
})); // [4, 5, 6, 7]

console.log(arr.sort(function (a, b) {
  return a < b;
})); // [7, 6, 5, 4, 3, 2, 1] изменяет текущий массив

console.log(arr.sort()); // [1, 2, 3, 4, 5, 6, 7]; изменяет текущий массив

console.log(arr.map(function (elem, index) {
  return elem;
}), arr); // [1, 2, 3, 4, 5, 6, 7] вернет новый массив, arr является arr (удобно при вызове на ананимном массиве)
// ! при написании в одну строку return можно опустить. И можно вместо краткого присвоения += -= *= /= когда в одну строку писать просто + - * / вроде работает и присвоение

console.log(arr.reduce(function (accum, elem, index) {
  return accum + elem;
})); // 28 сложит все числа. accum изначально равен первому значению в массиве

console.log(arr.reduce(function (accum, elem, index) {
  return accum + elem;
}, 10)); // 38 сложит все числа. accum присвоем изначально значение 10

console.log(arr.reduce(function (accum, elem, index) {
  return accum + elem;
}, 10)); // 38 сложит все числа. accum присвоем изначально значение 10

console.log(arr.reduce(function (accum, elem, index) {
  accum += elem;
  return accum;
}, 20)); // 48 сложит все числа. accum присвоем изначально значение 10

console.log(arr.reduce(function (accum, elem, index) {
  accum.push(elem);
  return accum;
}, [])); // [1, 2, 3, 4, 5, 6, 7] вернет новый массив. accum будет массивом. Видать нельзя в одну строку.

console.log(arr.reduce(function (accum, elem, index) {
  accum[index] = elem;
  return accum;
}, {})); // {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7}
// ! Метод reduceRight() применяет функцию к аккумулятору и каждому значению массива (справа-налево), сводя его к одному значению.

arr.forEach(function (elem, index) {
  return elem;
}); // переберет массив, лучше при этом массив не изменять!

for (var _i = 0, _arr = arr; _i < _arr.length; _i++) {
  elem = _arr[_i];
  elem;
} // переберет массив инициализацию elem с помощью let и var можно опустить


console.log(arr.reverse()); // [7, 6, 5, 4, 3, 2, 1] перевернет местами элементы изменяет сам массив его элементы

console.log(arr.reverse()); // [1, 2, 3, 4, 5, 6, 7];

console.log(arr.every(function (elem, index) {
  return elem < 10 && index < 10;
})); // true  проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции. метод возвращает true при любом условии для пустого массива.

console.log(arr.some(function (elem, index) {
  return elem == 3;
})); // true. проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции. метод возвращает false при любом условии для пустого массива.

console.log(Array.isArray(arr)); // true. возвращает true, если объект является массивом и false, если он массивом не является.

console.log(Array.from('123')); // [ "1", "2", "3" ]. Array.from() позволяет вам создавать массивы из: массивоподобных объектов (объектов со свойством length и элементами по индексным ключам) или итерируемых объектов (объектов, из которых вы можете достать их элементы, например Map или Set).

console.log([1, 2, 3, [4, 5, [6, [7]]]].flat(Infinity)); // [1,2,3,4,5,6,7] возвращает новый массив, в котором все элементы вложенных подмассивов были рекурсивно "подняты" на указанный уровень в аргументе.

console.log([1, 2, 3].fill(4, 1)); // [1, 4, 4]  заполняет все элементы массива от начального до конечного индексов одним значением.

console.log(arr.unshift(-2, -1, 0), arr); // вернет новую длинну массива 10 и изменит массив arr добавив ему один или более елемент в начало [ -2, -1, 0, 1, 2, 3, 4, 5, 6, 7 ]

console.log(arr.push('a', 'b', 'c')); // вернет новую длинну массива 10 и изменит массив arr добавив ему один или более елемент в конец [ -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 'a', 'b', 'c']

console.log(arr.pop()); // 'c' удаляет последний элемент из массива и возвращает его значение. Этот метод изменяет длину массива. Если вы вызовете pop() на пустом массиве, он вернёт значение undefined.

console.log(arr.shift()); // -2 удаляет первый элемент из массива и возвращает его значение. Этот метод изменяет длину массива.

console.log(arr.splice(0, 2)); // вернет массив удаленных элементов [-1, 0] и изменит массив arr удалив два значения начиная с индекса 0. Сзлопывает удаленные места [ 1, 2, 3, 4, 5, 6, 7, "a", "b" ]

console.log(arr.splice(7, 0, 8, 9, 10)); // вернет пустой массив и добавит в массив arr новые числа начиная с индекса 7 добавит 8, 9, 10 при этом сдвинет 'a', 'b' направо!

arr = [1, 2, 3, 33]; // ! Math не работает с числами типа BigInt.

console.log(Math.max.apply(Math, _toConsumableArray(arr))); // найдет максимальное число в массиве, предварительно деструктурируем массив

console.log(Math.min.apply(Math, _toConsumableArray(arr))); // найдет минимальное число в массиве, предварительно деструктурируем массив
// ! МЕТОДЫ Object: ================= ///////////////////////////////////////////////// ======================
// * Object.create() создаёт новый объект с указанным прототипом и свойствами.

var obj = {
  a: 1,
  b: 2,
  c: 3
};
console.log(Object.values(obj)); // [1, 2, 3] возвращает массив значений перечисляемых свойств объекта в том же порядке что и цикл for...in. Разница между циклом и методом в том, что цикл перечисляет свойства и из цепочки прототипов.

console.log(Object.keys(obj)); // ['a', 'b', 'c'] возвращает массив из собственных перечисляемых свойств переданного объекта, в том же порядке, в котором они бы обходились циклом for...in (разница между циклом и методом в том, что цикл перечисляет свойства и из цепочки прототипов).

console.log(Object.getOwnPropertyNames(obj)); // ['a', 'b', 'c'] возвращает массив со всеми свойствами (независимо от того, перечисляемые они или нет), найденными непосредственно в переданном объекте.

console.log(obj.hasOwnProperty('a')); // true. возвращает логическое значение, указывающее, содержит ли объект указанное свойство. В отличие от оператора in, этот метод не проверяет существование свойств в цепочке прототипов объекта.

console.log('a' in obj); // true. возвращает логическое значение, указывающее, содержит ли объект указанное свойство. В отличие от метода hasOwnProperty(), проверяет существование свойств в цепочке прототипов объекта.

for (key in obj) {
  obj[key];
} // проитерируется по каждому значению каждого свойства в объекте


Object.seal(obj); // запечатывает объект, предотвращая добавление новых свойств к объекту и делая все существующие свойства не настраиваемыми. Значения представленных свойств всё ещё могут изменяться, поскольку они остаются записываемыми.

console.log(Object.freeze({})); // замораживает объект: это значит, что он предотвращает добавление новых свойств к объекту, удаление старых свойств из объекта и изменение существующих свойств или значения их атрибутов перечисляемости, настраиваемости и записываемости. В сущности, объект становится эффективно неизменным. Метод возвращает замороженный объект.

console.log(Object.isFrozen(obj)); // false.  Oпределяет, был ли объект заморожен.

console.log(Object.isSealed(obj)); // true. Oпределяет, является ли объект запечатанным.

for (var _i2 = 0, _Object$entries = Object.entries(obj); _i2 < _Object$entries.length; _i2++) {
  var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
      _key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];

  console.log("".concat(_key, ": ").concat(value)); // метод возвращает массив собственных перечисляемых свойств указанного объекта в формате [key, value], в том же порядке, что и в цикле for...in (разница в том, что for-in перечисляет свойства из цепочки прототипов). Порядок элементов в массиве который возвращается Object.entries() не зависит от того как объект обьявлен. Если существует необходимость в определенном порядке, то  массив должен быть отсортирован до вызова метода, например Object.entries(obj).sort((a, b) => a[0] - b[0]);.
} // Object.entries(obj); или просто передать объект без итерации и он преобразует


console.log(Object.fromEntries([['name', 'Rusl'], ['age', 34]])); // Object { name: "Rusl", age: 34 } преобразует список пар ключ-значение в объект. Итерируемый объект, такой как Array или Map или другие объекты, реализующие iterable протокол.

console.log(obj.toString()); //[object Object] преобразует объект в строку у ФУНКЦИЙ вернет код функции в виде строки!!!
// ! String

console.log('abcd'.substring(1, 3)); // 'bc' вернет новую строку вырезав от индекса 1 включительно и до 3 не включительно замена substr()

console.log('abcd'.substring(1)); // 'bcd' вернет новую строку вырезав от индекса 1 включительно и до конца substr()

console.log('abcd'.slice(1, 3)); // извлекает часть строки и возвращает новую строку без изменения оригинальной строки.

console.log('abcd'.split(''));
['a', 'b', 'c', 'd']; // разбивает объект String на массив строк путём разделения строки указанной подстрокой. Первым аргументом может быть регулярка которая определит по каким символам разбивать, вторым ограничени в количестве элементов в массиве
// toLowerCase() возвращает значение строки, на которой он был вызван, преобразованное в нижний регистр.
// toUpperCase() возвращает значение строки, на которой он был вызван, преобразованное в верхний регистр.
// toLocaleUpperCase() возвращает значение строки, на которой он был вызван, преобразованное в верхний регистр согласно правилам преобразования регистра локали.
// toLocaleLowerCase() возвращает значение строки, на которой он был вызван, преобразованное в нижний регистр согласно правилам преобразования регистра локали.

var orig = '   foo  ';
console.log(orig.trim()); // 'foo' удаляет пробельные символы с начала и конца строки. Пробельными символами в этом контексте считаются все собственно пробельные символы (пробел, табуляция, неразрывный пробел и прочие) и все символы конца строки (LF, CR и прочие). возвращает строку с вырезанными пробельными символами с её концов. не изменяет значение самой строки.

console.log(orig); // trim() не изменил значение основной строки
// trimRight() удаляет пробельные символы с правого конца строки. возвращает строку с вырезанными пробельными символами с её правого конца. Метод trimRight() не изменяет значение самой строки.
// trimLeft() удаляет пробельные символы с левого конца строки. возвращает строку с вырезанными пробельными символами с её левого конца. Метод trimLeft() не изменяет значение самой строки.
// ! Number: =================//////////////////////////////////////////////////////////////==========================

console.log(Number.isNaN(NaN)); // определяет, является ли переданное значение NaN. Это более надёжная версия оригинальной глобальной функции isNaN().

console.log(Number.isInteger(0.1)); // false. Если целевое значение является целым числом, возвращает true. Если значение NaN или Infinity, то возвращает false. Метод также возвращает true, если это вещественное число с точкой, которое может быть представлено в целочисленном виде.
// ! Math: ======================//////////////////////////////////////////////////////////============================

console.log(Math.floor(1.9)); // 1 округление вниз. Округляет аргумент до ближайшего меньшего целого.

console.log(Math.round(1.9)); // 2 возвращает число, округлённое к ближайшему целому.

console.log(Math.sqrt(4)); // 2 возвращает квадратный корень числа, то есть \forall x \geq 0, \mathtt{Math.sqrt(x)} = \sqrt{x} = \text{уникальный} \; y \geq 0 \; \text{такой, что} \; y^2 = x

console.log(Math.abs('-1')); // 1 возвращает абсолютное значение числа.

console.log(Math.max(-10, 20, 3, 8)); // 20  возвращает наибольшее из нуля или более чисел.

console.log(Math.min(-10, 20, 6, -4)); // -10  возвращает наименьшее из нуля или более чисел.
// * Метод Math.random() возвращает псевдослучайное число с плавающей запятой из диапазона [0, 1), то есть, от 0 (включительно) до 1 (но не включая 1), которое затем можно отмасштабировать до нужного диапазона. Реализация сама выбирает начальное зерно для алгоритма генерации случайных чисел; оно не может быть выбрано или сброшено пользователем.