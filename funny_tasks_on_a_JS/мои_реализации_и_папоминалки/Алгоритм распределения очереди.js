/*
Напишите функцию которая принимает первым аргументом массив положительных, целых чисел, представляющий из себя очередь людей,
Каждый индекс массива это конкретный человек, а значение массива это время которое будет затрачено на его обслуживание.
Вторым аргументом функция принимает количество касс которые обслуживают очередь людей.
Количество касс всегда больше положительное целое число. Количество людей в очереди, то есть массив может быть пустым.
а) Есть только ОДНА очередь, обслуживающая много касс. 
б) Порядок очереди НИКОГДА не меняется,
в) Первый человек в очереди (то есть первый элемент в массиве) направляется к кассе, как только она становится свободой.
PS Ситуацию можно сравнить с идеей пула потоков, связанной с одновременным запуском нескольких процессов.


Пример:

queueTime([5,3,4], 1) // => 12

queueTime([10,2,3,3], 2) // => 10

queueTime([2,3,10], 2) // => 12

*/
// Алгоритм:
// queueTime([16, 14, 10, 3, 13, 9, 8, 19, 18, 20, 3, 7, 4, 16, 3], 6)  //=> 32
// 1= 16(16 - 3) |13| (13 - 6)  |7 | ......
// 2= 14(14 - 3) |11| (11 - 6)  |5 | ......
// 3= 10(10 - 3) |7 | (7 - 6)   |1 | ......
// 4= 3 + 8      |8 | (8 - 6)   |2 | ......
// 5= 13(13 - 3) |10| (10 - 6)  |4 | ......
// 6= 9(9 - 3)   |6 | + 19      |19| ......

function queueTime(customers, n) {
    if (customers.length === 0) return 0;
    if (customers.length <= n) return Math.max(...customers);

    if (n === 1) {
        let sum = 0;
        for (let i = 0; i < customers.length; i++) {
            sum += customers[i];
        }
        return sum;
    }

    let obj = {};

    for (let i = 1; i <= n; i++) {
        obj[i] = {
            allTime: customers[i - 1],
            timeLeft: customers[i - 1],
        };
    }

    for (let i = n; i < customers.length; i++) {
        let detect = Infinity;
        let freeCashier;

        for (let key in obj) {
            if (obj[key].timeLeft < detect) {
                freeCashier = obj[key];
                detect = obj[key].timeLeft;
            }
        }

        freeCashier.timeLeft = customers[i];
        freeCashier.allTime += customers[i];

        for (let key in obj) {
            if (obj[key] !== freeCashier) {
                obj[key].timeLeft -= detect;
            }
        }
    }

    let result = 0;
    console.log(obj);

    for (let key in obj) {
        if (obj[key].allTime > result) {
            result = obj[key].allTime;
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
// =========================================================================================================
function queueTime(customers, n) {
    // Формируем массив с нашими кассами, где каждое значение это общее время работы кассы
    var arrX = new Array(n).fill(0);

    for (let time of customers) {
        // находим индекс кассы с минимальным временем работы
        let index = arrX.indexOf(Math.min(...arrX));

        // добавляем к кассе с минимальным временем время обслуживания клиента
        arrX[index] += time;
    }

    return Math.max(...arrX); // ну и выводим максимальное время
}
// =========================================================================================================
function queueTime(customers, n) {
    var w = new Array(n).fill(0);
    for (let t of customers) {
        let idx = w.indexOf(Math.min(...w));
        w[idx] += t;
    }
    return Math.max(...w);
}
// ===================================================================================================
function queueTime(customers, n) {
    let tills = Array(n).fill(0);

    customers.forEach((customer) => {
        let nextTill = tills.indexOf(Math.min(...tills));
        tills[nextTill] += customer;
    });

    return Math.max(...tills);
}
// ================================================================================================
function queueTime(customers, n) {
    return Math.max(
        ...customers.reduce((prev, next) => {
            prev[prev.indexOf(Math.min(...prev))] += next;
            return prev;
        }, Array(n).fill(0)),
    );
}
// =================================================================================================
function queueTime(customers, registers) {
    let arr = [];

    for (let i = 0; i < registers; i++) arr[i] = 0;

    for (let i = 0; i < customers.length; i++) {
        arr[0] += customers[i];
        arr.sort((a, b) => a - b);
    }

    return arr[arr.length - 1];
}
// ================================================================================================
function queueTime(customers, n) {
    return Math.max(
        ...customers.reduce((acc, c) => {
            let i = acc.indexOf(Math.min(...acc));
            acc[i] = acc[i] + c;
            return acc;
        }, Array(n).fill(0)),
    );
}
// =====================================================
function queueTime(customers, n) {
    let arr = Array(n).fill(0);
    for (let i = 0; i < customers.length; i++) {
        arr[arr.indexOf(Math.min(...arr))] += customers[i];
    }
    return Math.max(...arr);
}
