Array.prototype.myReduce = function (callback, initialValue = this[0]) {
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`);
    if (typeof callback !== 'function') throw new Error(`${callback} is not a function`);
    let startIndex = initialValue === this[0] ? 1 : 0;

    for (let i = startIndex, size = this.length; i < size; i++) {
        initialValue = callback(initialValue, this[i], i, this);
    }

    return initialValue;
};

console.log(
    [1, 2, 3, 4, 5].myReduce((acc, elem, index, arr) => {
        if (index % 2) {
            return acc + elem;
        }
        return acc;
    }, 0),
); // => 6

console.log(
    [1, 2, 3, 4, 5].myReduce((acc, elem, index, arr) => {
        if (index % 2) {
            acc.push(elem, arr[index + 1]);
        }
        return acc;
    }, []),
); // => [2, 3, 4, 5]

/*
Реализуйте функцию squareDigits, функция принимает число, 
вернуть функция должна также число, которое получается 
при конкатенировании возведенных в квадрат цифр переданного 
внутрь функции числа.
*/

const squareDigits = (num) => [...num.toString()].reduce((acc, elem) => acc + (+elem) ** 2, '');
console.log(squareDigits(9119)); // 9^2=81, 1^2=1 => 811181
// =================================
function squareDigits(num) {
    return +[...num.toString()].reduce((acc, el) => acc + el ** 2, '')
}
console.log(squareDigits(9119)); // 9^2=81, 1^2=1 => 811181
