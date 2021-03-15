/*
Небходимо найти максимальную сумму непрерывной подпоследовательности в массиве с целыми числами:
maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]) вернет результат 6, так-как будем складывать последовательно => [4, -1, 2, 1]
Легкий случай - это когда массив состоит только из положительных чисел, а максимальная сумма - это сумма всего массива.
Если массив состоит только из отрицательных чисел, верните 0.
*/

// Мое не самое усное решение:
var maxSequence = function (arr) {
    if (arr.length === 0) return 0;
    let result = arr.reduce((acc, num) => acc + num);
    let sum;

    for (let i = 1; i < arr.length; i++) {
        sum = arr.slice(i).reduce((acc, num) => acc + num);
        if (result < sum) result = sum;

        sum = arr.slice(0, i).reduce((acc, num) => acc + num);
        if (result < sum) result = sum;
    }

    sum = maxSequence(arr.slice(1, arr.length - 1));
    return result < sum ? (result = sum) : result;
};
// =============================

// РЕШЕНИЯ ДРУГИХ:
// В одну строку
const maxSequence = (a, sum = 0) => a.reduce((max, v) => Math.max((sum = Math.max(sum + v, 0)), max), 0);
// ==============================
var maxSequence = function (arr) {
    var min = 0,
        ans = 0,
        sum = 0;
    for (var i = 0; i < arr.length; ++i) {
        sum += arr[i];
        min = Math.min(sum, min);
        ans = Math.max(ans, sum - min);
    }
    return ans;
};
// ===========================
var maxSequence = function (arr) {
    var currentSum = 0;
    return arr.reduce(function (maxSum, number) {
        currentSum = Math.max(currentSum + number, 0);
        return Math.max(currentSum, maxSum);
    }, 0);
};
//============================
var maxSequence = function (arr) {
    var max = 0;
    var cur = 0;
    arr.forEach(function (i) {
        cur = Math.max(0, cur + i);
        max = Math.max(max, cur);
    });
    return max;
};
// ==========================
function maxSequence(arr) {
    var max = 0;

    for (var i = 0; i < arr.length; i++) {
        for (var sum = 0, j = i; j < arr.length; j++) {
            sum += arr[j];
            if (sum > max) max = sum;
        }
    }

    return max;
}
// ==========================

// Варианты проверки кода:
console.log(maxSequence([]), 0);
console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4, -1, 1, 100, -5, 3]), 105);
