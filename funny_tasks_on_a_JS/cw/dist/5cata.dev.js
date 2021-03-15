"use strict";

/*
The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:

maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// should be 6: [4, -1, 2, 1]
Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. If the list is made up of only negative numbers, return 0 instead.

Empty list is considered to have zero greatest sum. Note that the empty list or array is also a valid sublist/subarray.
*/
var maxSequence = function maxSequence(arr) {
  if (arr.length === 0) return 0;
  var result = arr.reduce(function (acc, num) {
    return acc + num;
  });
  var sum;

  for (var i = 1; i < arr.length; i++) {
    sum = arr.slice(i).reduce(function (acc, num) {
      return acc + num;
    });
    if (result < sum) result = sum;
    sum = arr.slice(0, i).reduce(function (acc, num) {
      return acc + num;
    });
    if (result < sum) result = sum;
  }

  sum = maxSequence(arr.slice(1, arr.length - 1));
  return result < sum ? result = sum : result;
};

console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4, -1, 1, 100, -5, 3]), 100);