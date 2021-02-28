/**
 * В функцию передаются два целых числа, которые могут быть
 * положительными или отрицательными, найти сумму всех чисел между
 * ними, включая переданные числа, и верните эту сумму. Если два числа
 * равны, просто верните одно из этих чисел.
 *
 * @param {number} a - первое целое число
 * @param {number} b - второе целое число
 * @return {number}
 */
function sum(a, b) {
    return ((Math.abs(a - b) + 1) * (a + b)) / 2;
}

console.log(sum(1, 0)); // 1
console.log(sum(0, 1)); // 1
console.log(sum(1, 1)); // 1
console.log(sum(1, 4)); // 10
console.log(sum(-2, 0)); // -3
console.log(sum(-2, 2)); // 0
// =========================================

function sum(a, b) {
    return ((Math.max(a, b) - Math.min(a, b) + 1) * (a + b)) / 2;
}

console.log(sum(1, 0)); // 1
console.log(sum(0, 1)); // 1
console.log(sum(1, 1)); // 1
console.log(sum(1, 4)); // 10
console.log(sum(-2, 0)); // -3
console.log(sum(-2, 2)); // 0
// ===============================================================

function sum(a, b) {
    if (a === b) return a;

    let result = 0;

    for (let i = Math.min(a, b); i <= Math.max(a, b); i++) {
        result += i;
    }

    return result;
}

console.log(sum(1, 0)); // 1
console.log(sum(0, 1)); // 1
console.log(sum(1, 1)); // 1
console.log(sum(1, 4)); // 10     1 + 2 + 3 + 4
console.log(sum(-2, 0)); // -3    -2 + -1 + 0
console.log(sum(-2, 2)); // 0     -2 + -1 + 0 + 1 + 2
