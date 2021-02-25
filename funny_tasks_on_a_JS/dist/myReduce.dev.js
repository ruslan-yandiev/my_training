"use strict";

Array.prototype.myReduce = function (f, a) {
  if (typeof f === 'function') {
    var result = a || this[0];
    var startIndex;
    a === undefined ? startIndex = 1 : startIndex = 0;

    for (var i = startIndex; i < this.length; i++) {
      result = f(result, this[i], i, this);
    }

    return result;
  }
};

console.log([1, 2, 3, 4, 5].myReduce(function (acc, elem, index, arr) {
  if (index % 2) {
    acc.push(elem, arr[index + 1]);
  }

  return acc;
}, [])); // => [2, 3, 4, 5]