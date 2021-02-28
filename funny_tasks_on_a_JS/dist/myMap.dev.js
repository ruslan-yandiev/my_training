"use strict";

Array.prototype.myMap = function (f) {
  if (typeof f === 'function') {
    var result = [];

    for (var i = 0; i < this.length; i++) {
      result.push(f(this[i], i, this));
    }

    return result;
  }
};

console.log([1, 2, 3, 4, 5].myMap(function (elem, index, arr) {
  return elem + index;
}));
console.log([1, 2, 3, 4, 5].map(function (elem, index, arr) {
  return elem + index;
}));