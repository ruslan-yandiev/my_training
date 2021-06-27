/*
В функцию передается массив с целыми положительными числами,
расположеными в порядке возрастания, а также число n.
Необходимо найти n-oe по счету пропущенное в массиве число, начиная с 1.
*/

function findMissingNumber(arr, n) {
    const collection = [];

    for (let i = 1; i < arr[arr.length - 1]; i++) {
        if (!arr.includes(i)) collection.push(i);
    }

    return collection.length <= n ? arr[arr.length - 1] + n : collection[n - 1];
}

// Пропущеные числа [5, 6, 7, 8, ...], второе пропущеное число - 6
console.log(findMissingNumber([1, 2, 3, 4], 2)); // 6

console.log(findMissingNumber([2, 3, 4, 7, 11], 5)); // 9

// ======================================================
function isSorted(arr) {
    if (arr.length < 2) return true;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }

    return true;
}

console.log(isSorted([])); // true
console.log(isSorted([-Infinity, -5, 0, 3, 9])); // true
console.log(isSorted([3, 9, -3, 10])); // false
