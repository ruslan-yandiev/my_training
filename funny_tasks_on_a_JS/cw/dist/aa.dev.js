"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
There is a queue for the self-checkout tills at the supermarket. Your task is write a function to calculate the total time required for all the customers to check out!

input
customers: an array of positive integers representing the queue. Each integer represents a customer, and its value is the amount of time they require to check out.
n: a positive integer, the number of checkout tills.
output
The function should return an integer, the total time required.

Important
Please look at the examples and clarifications below, to ensure you understand the task correctly :)

Examples
queueTime([5,3,4], 1)
// should return 12
// because when there is 1 till, the total time is just the sum of the times

queueTime([10,2,3,3], 2)
// should return 10
// because here n=2 and the 2nd, 3rd, and 4th people in the 
// queue finish before the 1st person has finished.

queueTime([2,3,10], 2)
// should return 12
Clarifications
There is only ONE queue serving many tills, and
The order of the queue NEVER changes, and
The front person in the queue (i.e. the first element in the array/list) proceeds to a till as soon as it becomes free.
N.B. You should assume that all the test input will be valid, as specified above.

P.S. The situation in this kata can be likened to the more-computer-science-related idea of a thread pool, with relation to running multiple processes at the same time: https://en.wikipedia.org/wiki/Thread_pool
*/
function queueTime(customers, n) {
  if (customers.length === 0) return 0;
  if (customers.length <= n) return Math.max.apply(Math, _toConsumableArray(customers));

  if (n === 1) {
    var sum = 0;

    for (var i = 0; i < customers.length; i++) {
      sum += customers[i];
    }

    return sum;
  }

  var obj = {};

  for (var _i = 1; _i <= n; _i++) {
    obj[_i] = {
      allTime: customers[_i - 1],
      timeLeft: customers[_i - 1],
      detect: true
    };
  }

  for (var _i2 = n; _i2 < customers.length; _i2++) {
    var detect = Infinity;
    var freeCashier = void 0;

    for (var key in obj) {
      if (obj[key].timeLeft < detect) {
        freeCashier = obj[key];
        detect = obj[key].timeLeft;
      }
    }

    freeCashier.timeLeft = customers[_i2];
    freeCashier.allTime += customers[_i2];

    for (var _key in obj) {
      if (obj[_key] !== freeCashier) {
        obj[_key].timeLeft -= detect;
      }
    }
  }

  var result = 0;
  console.log(obj);

  for (var _key2 in obj) {
    if (obj[_key2].allTime > result) {
      result = obj[_key2].allTime;
    }
  }

  return result;
}

console.log(queueTime([], 1), 0);
console.log(queueTime([1, 2, 3, 4], 1), 10);
console.log(queueTime([2, 2, 3, 3, 4, 4], 2), 9);
console.log(queueTime([1, 2, 3, 4, 5], 100), 5);
console.log(queueTime([15, 28, 23, 39, 28, 12, 19, 6, 46, 8, 2, 16, 32, 6, 28, 40, 11, 50, 6, 1, 10, 13, 6, 8], 5), 112);
console.log(queueTime([26, 41, 18, 15, 22, 20, 29, 39, 17, 46, 37, 7, 3, 3, 42, 21, 31, 43, 41, 38, 36, 44, 19, 39, 15, 28], 4), 187);
console.log(queueTime([16, 14, 10, 3, 13, 9, 8, 19, 18, 20, 3, 7, 4, 16, 3], 6), 32);
/*
[19, 18, 20, 3, 7, 4, 16, 3]

1= 16(16 - 3) |13|
2= 14(14 - 3) |11|
3= 10(10 - 3) |7|
4= 3 + 8      |8|
5= 13(13 - 3) |10|
6= 9(9 - 3)   |6| 
*/