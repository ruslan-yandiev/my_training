// Кратность

// ! Плохое решение
function divisibleBy(arr, div) {
    const result = [];
    let acc = div;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === acc) {
            result.push(acc);
            acc += div;
        }
    }

    return result;
}

console.log(divisibleBy([1,2,3,4,5,6,8,9], 2)); // [2, 4, 6, 8]
console.log(divisibleBy([1,2,3,4,5,6,8,9], 3)); // [3, 6, 9]
console.log(divisibleBy([1,2,3,4,5,6,8,9], 1)); // [1,2,3,4,5,6,8,9]
console.log(divisibleBy([1,2,3,4,5,6,8,9], 4)); // [4, 8]
console.log(divisibleBy([1,2,3,4,5,6,8,9], 5)); // [5]

function divisibleBy(arr, div) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % div === 0) result.push(arr[i]);
    }

    return result;
}

console.log(divisibleBy([1,2,3,4,5,6,8,9], 2)); // [2, 4, 6, 8]
console.log(divisibleBy([1,2,3,4,5,6,8,9], 3)); // [3, 6, 9]
console.log(divisibleBy([1,2,3,4,5,6,8,9], 1)); // [1,2,3,4,5,6,8,9]
console.log(divisibleBy([1,2,3,4,5,6,8,9], 4)); // [4, 8]
console.log(divisibleBy([1,2,3,4,5,6,8,9], 5)); // [5]

//! лучшее решение
const divisibleBy = (arr, div) => arr.filter((el) => el % div === 0);

console.log(divisibleBy([1,2,3,4,5,6,8,9], 2)); // [2, 4, 6, 8]
console.log(divisibleBy([1,2,3,4,5,6,8,9], 3)); // [3, 6, 9]
console.log(divisibleBy([1,2,3,4,5,6,8,9], 1)); // [1,2,3,4,5,6,8,9]
console.log(divisibleBy([1,2,3,4,5,6,8,9], 4)); // [4, 8]
console.log(divisibleBy([1,2,3,4,5,6,8,9], 5)); // [5]