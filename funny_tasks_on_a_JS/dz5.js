/*
Необходимо преобразовать массив с конца в начало и вывести в консоль сообщения вида:
"Под свойством 5 лежит значение 35" (свойства это индекс в массиве, а в объекте это ключ)
"Под свойством 4 лежит значение 2"
...и т.д.
*/

const arr = [51, 8, 99, 71, 2, 35];

function myFunction(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        console.log(`Под свойством ${i} лежит значение ${arr[i]}`);
    }
}

myFunction(arr);

// * =======================================================================================

/*
Необходимо реализовать функцию так, чтобы она возвращала массив, в котором будут записанны числа в
убывающем порядке, которые кратны 3, до нуля включительно
*/

function getArr(num) {
    const arr = [0];
    let sum = 3;

    while (sum <= num) {
        arr.push(sum);
        sum += 3;
    }

    return arr.reverse();
}

console.log(getArr(15)); // [15, 12, 9, 6, 3, 0]
console.log(getArr(17)); // [15, 12, 9, 6, 3, 0]
console.log(getArr(22)); // [21, 18, 15, 12, 9, 6, 3, 0]

// * ====================================================================

/*
Функция принимает массив с целыми числами, необходимо, чтобы функция возвращала
сумму чисел массива, которые записаны в четных индексах включая 0
*/
function getEvenElementsSum(arr) {
    let result = 0;

    for (let elem of arr) {
        if (arr.indexOf(elem) % 2 === 0) {
            result += elem;
        }
    }

    return result;
}
console.log(getEvenElementsSum([5, 7, -1, 12, 3, 0])); // 7
console.log(getEvenElementsSum([4, -12, 29, 6, 31, 2, -50])); // 14

// Второй вариант
function getEvenElementsSum2(arr) {
    return arr.reduce((accum, elem, index) => {
        if (index % 2 === 0) {
            accum += elem;
        }
        return accum;
    });
}
console.log(getEvenElementsSum2([5, 7, -1, 12, 3, 0])); // 7
console.log(getEvenElementsSum2([4, -12, 29, 6, 31, 2, -50])); // 14

// * ====================================================================

/*
Функция должна принимать три числа, 'a, b, c', и возвращает массив чисел, которые лежат в промежутке
между числом 'a' включительно и 'b' включительно делящиеся без остатка на число 'c'
*/

function myFilter(a, b, c) {
    const arr = [];

    if (a < b) {
        for (let i = a; i <= b; i++) {
            if (i % c === 0) {
                arr.push(i);
            }
        }
    } else {
        for (let i = a; i >= b; i--) {
            if (i % c === 0) {
                arr.push(i);
            }
        }
    }

    return arr;
}

console.log(myFilter(5, 15, 3)); // [6, 9, 12, 15]

// * ====================================================================

/*
Написать функцию принимающую строку, должна вернуть булевое значение, является ли строка палиндромом
*/

function pal(str) {
    str = str.toLowerCase();
    let str2 = str.split('').reverse().join('');

    // ! когда нужно вернуть правду или лож, то проще просто вернуть результат выполнения условия, а он всегда либо true либо false
    return str === str2;
}

console.log(pal('топот'));
console.log(pal('Топот'));
console.log(pal('Колобок'));

// * ====================================================================

/*
Функция принимает строку, на английском, возвращает массив, содержащий все возможные комбинации букв.
не должно быть повторяющихся строк в массиве.
*/

function getLettersVariants(str) {
    if (str.length === 1) {
        return [str];
    }

    const arr = [str];

    function start(strArr) {
        for (let i = 0; i < strArr.length - 1; i++) {
            for (let j = i + 1; j < strArr.length; j++) {
                [strArr[i], strArr[j]] = [strArr[j], strArr[i]];

                if (arr.includes(strArr.join(''))) {
                    return arr;
                }

                arr.push(strArr.join(''));
            }
        }

        return start(strArr);
    }

    return start(str.split(''));
}
console.log(getLettersVariants('asd')); // ['asd', 'ads', 'sad', 'das', 'dsa', 'sda']
// ? Вторым способом можно было бы решить с помощью бесконечного цикла (while) и счетчиками, которые обнуляются по достижению
// ? определенного значения от размера массива, и повторять до тех пор пока не встретится повтор.

// * ====================================================================

/*
Функция принимает массив с целыми числами, функция должна возвращать значение большего эелемента массива,
который записан в четном индексе включая 0.
*/
function getMaxEvenElement(arr) {
    let maxElem = arr[0];

    for (let i = 2; i < arr.length; ) {
        if (maxElem < arr[i]) {
            maxElem = arr[i];
        }

        i += 2;
    }

    return maxElem;
}

console.log(getMaxEvenElement([5, 7, -1, 12, 3, 0])); // 5
console.log(getMaxEvenElement([4, -12, 29, 6, 31, 92, -50])); // 31

// Второй способ
function getMaxEvenElement2(arr) {
    return arr.find((elem, index) => {
        if (index % 2 === 0) {
            return elem > arr[index + 2];
        }
    });
}

console.log(getMaxEvenElement2([5, 7, -1, 12, 3, 0])); // 5
console.log(getMaxEvenElement2([4, -12, 29, 6, 31, 92, -50])); // 31
