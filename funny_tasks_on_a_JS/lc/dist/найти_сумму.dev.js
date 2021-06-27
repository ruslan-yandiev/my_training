"use strict";

/*
Учитывая массив целых чисел nums и целое число target, верните индексы двух чисел так, чтобы они в сумме равнялисьtarget .

Вы можете предположить, что каждый вход будет иметь ровно одно решение , и вы не можете использовать один и тот же элемент дважды.

Вы можете вернуть ответ в любом порядке.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:

2 <= nums.length <= 103
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.
*/
// ! сложность алгоритма O(n)
var twoSum = function twoSum(nums, target) {
  var obj = {};

  for (var i = 0; i < nums.length; i++) {
    if (obj[target - nums[i]] === 0 || obj[target - nums[i]]) return [obj[target - nums[i]], i];
    obj[nums[i]] = i;
  }
};

console.log(twoSum([2, 7, 11, 15], 9)); // [0,1]