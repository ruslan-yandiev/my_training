/*
Написать код, который сделает из массива объект
*/
function transform(arr) {
    const hh = {};

    for (let i = 0; i < arr.length; i++) {
        hh[arr[i].name] = arr[i].value;
    }
    return hh;
}

function transform2(arr) {
    return arr.reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
    }, {});
}

const arr = [
    { name: 'name', value: 'Anatoly' },
    { name: 'age', value: 40 },
];

console.log(transform(arr)); // {name: 'Anatoly', age: 40}
console.log(transform2(arr)); // {name: 'Anatoly', age: 40}

// * ======================================================================================
/*
n! означает n * (n - 1) * ... * 3 * 2 * 1
Например, 10! = 10 * 9 * ... * 3 * 2 * 1 = 3628800, сумма цифр в полученном
числе 10! равна 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
Найдите сумму цифр в числе 100.
Решение не должно использовать циклы, необходимо использовать методы массивов
*/
// ! Используем РЕКУРСИЮ (итеративная функция с рекурсивным подходом)
function myCalc(num) {
    function myRecurs(arg) {
        // ! при не строгом сравнении BigInt равен number, а при строгом нет, так как это два разных примитивных типа данных
        // ! при строго нужно будет написать вот так: if (arg === BigInt(1))
        if (arg == 1) {
            return arg;
        }
        // ! вычитать, прибавлять, делить и усножать можно только BigInt с BigInt и нельзя между BigInt и number
        return arg * myRecurs(arg - BigInt(1));
    }

    // ! пришлось в рекурсию передать преобразованное чило в BigInt, так-как уж слишком большие числа будут возвращены, а затем преобразовать в строку в десятичной системе счислений
    return (BigInt(num) * myRecurs(BigInt(num - 1)))
        .toString(10)
        .split('')
        .reduce((accum, elem) => +accum + +elem);
}

console.log(myCalc(100)); // 648

// * ======================================================================================
/*
Функция принимает двумерный массив в виде треугольника (горки), необходимо найти наибольшую сумму от вершины до низа
треугольника. Массив может иметь очень большое количество вложенных массивов.
Проверять на правильность массива не нужно. передается всегда правильно составленный массив.
*/
function maxSum(arr) {
    let arrSize = arr.length;
    let maxSum = 0;

    function sortMerge(elemArr) {
        const size = elemArr.length;

        if (size > 1) {
            const mid = Math.floor(size / 2);
            const leftPart = elemArr.slice(0, mid);
            const rightPart = elemArr.slice(mid);

            sortMerge(leftPart);
            sortMerge(rightPart);

            let l = (r = k = 0);
            const sizeLeft = leftPart.length;
            const sizeRight = rightPart.length;

            while (l < sizeLeft && r < sizeRight) {
                if (leftPart[l] <= rightPart[r]) {
                    elemArr[k] = leftPart[l];
                    l++;
                } else {
                    elemArr[k] = rightPart[r];
                    r++;
                }

                k++;
            }

            while (l < sizeLeft) {
                elemArr[k] = leftPart[l];
                l++;
                k++;
            }

            while (r < sizeRight) {
                elemArr[k] = rightPart[r];
                r++;
                k++;
            }
        }
        return elemArr;
    }

    for (let i = 0; i < arrSize; i++) {
        arr[i] = sortMerge(arr[i]).reverse();
    }

    for (let i = 0; i < arrSize; i++) {
        maxSum += arr[i][0];
    }

    return maxSum;
}

console.log(maxSum([[1], [4, 8], [1, 5, 3]])); // 14
console.log(maxSum([[1], [-3, -4], [2, 1, 9]])); //7

// * ======================================================================================
/*
Функция принимает двумерный массив в виде треугольника (горки), необходимо найти наибольшую сумму от вершины до низа
треугольника. С числа сверху мы можем переходить лишь на нижнее число и его соседей.
Массив может иметь очень большое количество вложенных массивов.
Проверять на правильность массива не нужно. передается всегда правильно составленный массив.
*/
function maxSum2(arr) {
    let sum = 0;
    let index = 0;
    sum += arr[0][index];

    for (let i = 1; i < arr.length; i++) {
        if (
            arr[i][index - 1] === undefined &&
            arr[i][index] >= arr[i][index + 1]
        ) {
            sum += arr[i][index];
        } else if (
            arr[i][index + 1] === undefined &&
            arr[i][index] >= arr[i][index - 1]
        ) {
            sum += arr[i][index];
        } else if (
            arr[i][index] >= arr[i][index + 1] &&
            arr[i][index] >= arr[i][index - 1]
        ) {
            sum += arr[i][index];
        } else if (
            arr[i][index - 1] !== undefined &&
            arr[i][index + 1] !== undefined &&
            arr[i][index - 1] >= arr[i][index + 1] &&
            arr[i][index - 1] > arr[i][index]
        ) {
            sum += arr[i][index - 1];
            index -= 1;
        } else {
            sum += arr[i][index + 1];
            index += 1;
        }
    }
    return sum;
}

console.log(maxSum2([[1], [4, 8], [1, 5, 3]])); // 14
console.log(maxSum2([[1], [-3, -4], [2, 1, 9]])); //0

// * ======================================================================================
/*
Дана матрица, содержащая как положительные, так и отрицательные элементы.
Удвлить все ее столбцы, содержащие только положительные элементы
*/
const arr3 = [
    [2, 55, 8, 10],
    [-1, 4, -9, 1],
    [2, 4, -3, 50],
    [7, 9, 7, 108],
];

let detect = 0;

for (let i = 0; i < arr3[0].length; i++) {
    for (let j = 0; j < arr3.length; j++) {
        if (arr3[j][i] < 0) {
            detect += 1;
        }
    }

    if (detect === 0) {
        for (let a = 0; a < arr3.length; a++) {
            arr3[a].splice(arr3[a].indexOf(arr3[a][i]), 1);
        }
    }

    detect = 0;
}

console.log(arr3);
/*
[
    [2, 8],
    [-1, -9],
    [2, -3],
    [7, 7]
]
*/
