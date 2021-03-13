"use strict";

/*
Task
You will be given an array of numbers. You have to sort the odd numbers in ascending order while leaving the even numbers at their original positions.

Examples
[7, 1]  =>  [1, 7]
[5, 8, 6, 3, 4]  =>  [3, 8, 6, 5, 4]
[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  =>  [1, 8, 3, 6, 5, 4, 7
*/
function sortArray(array) {
  if (array.length <= 1) return array;
  var arr = [];

  for (var i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      arr.push(array[i]);
      array[i] = 'x';
    }
  }

  arr.sort(function (a, b) {
    return a < b;
  });

  for (var _i = 0; _i < array.length; _i++) {
    if (array[_i] === 'x') {
      array[_i] = arr[arr.length - 1];
      arr.pop();
    }
  }

  return array;
}

console.log(sortArray([-22, -37, -21, -30, -17, -3, 28, 11, 15, 15, 29, 21, 19, 42, 3, 34, 47, 43, -13, 32])); // Expected: [-22, -37, -21, -30, -17, -13, 28, -3, 3, 11, 15, 15, 19, 42, 21, 34, 29, 43, 47, 32],