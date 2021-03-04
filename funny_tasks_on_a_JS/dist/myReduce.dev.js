"use strict";

Array.prototype.myReduce = function (callback) {
  var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[0];
  if (typeof callback !== 'function') throw new TypeError("".concat(callback, " is not a function")); // if (typeof callback !== 'function') throw new Error(`${callback} is not a function`);

  var startIndex = initialValue === this[0] ? 1 : 0;

  for (var i = startIndex, size = this.length; i < size; i++) {
    initialValue = callback(initialValue, this[i], i, this);
  }

  return initialValue;
};

console.log([1, 2, 3, 4, 5].myReduce(function (acc, elem, index, arr) {
  if (index % 2) {
    return acc + elem;
  }

  return acc;
}, 0)); // => 6

console.log([1, 2, 3, 4, 5].myReduce(function (acc, elem, index, arr) {
  if (index % 2) {
    acc.push(elem, arr[index + 1]);
  }

  return acc;
}, [])); // => [2, 3, 4, 5]