"use strict";

Array.prototype.myMap = function (callback) {
  if (typeof callback === 'function') {
    var result = [];

    for (var i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
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