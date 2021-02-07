function sumTo (num) {
    let sum = 0;

    for (let i = 0; i <= num; i++) {
        sum += i;
    }

    return sum;
}

function sumTo2 (num) {
    return num === 1 ? num : num + sumTo(num - 1);
}

function sumTo3(n) {
    return n * (n + 1) / 2;
}

console.log(sumTo(1));// = 1
console.log(sumTo(2)); //= 2 + 1 = 3
console.log(sumTo(3)); //= 3 + 2 + 1 = 6
console.log(sumTo(4)); //= 4 + 3 + 2 + 1 = 10
console.log(sumTo(100)); // = 100 + 99 + ... + 2 + 1 = 5050

// * ========================================================================================
// * вычислить Факториал