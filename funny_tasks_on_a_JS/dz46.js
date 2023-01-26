/*
Прислал Тимур Гутнов
Мы разрабатываем банкомат.
В банкомате купюры могут быть разного номинала, например - 50, 100,
500, 1000, 5000 руб.
Есть ограничение на количество каждой из купюр (объект limitsobjMap).
Нужно вернуть купюры и их количество, которыми можно выдать
запрашиваемую сумму, в виде строки указанного формата. Начинать с
самой крупной.
Если выдать запрашиваемую сумму не получается, выбросить ошибку.
*/

const getMoney = function (sum, limits) {
    const limits2 = { ...limits };
    let myLimit = 0;

    // с аккумулируем общую сумму денег в банкомате
    for (key in limits2) myLimit += +key * limits2[key];

    // проаерим на соответствие минимальной и максимальной возможных сумм
    if (sum > 49 && sum <= myLimit) {
        const arrKeys = Object.keys(limits2);
        let result = '';
        const objMap = new Map();
        let accum;

        // в обратном порядке пройдемся по объекту, из-за специфики внутренней сортировки в объекте
        for (let i = arrKeys.length - 1; i >= 0; i--) {
            accum = +arrKeys[i] * limits2[arrKeys[i]];

            // проверим общую сумму одной банкноты и запрашиваемой суммы
            if (sum >= accum) {
                sum -= accum;
                objMap.set(arrKeys[i], limits2[arrKeys[i]]);
                limits2[arrKeys[i]] = false;
            }

            // проверим больше или равна запрашиваемая сумма одной банкноты
            if (limits2[arrKeys[i]] && sum >= +arrKeys[i]) {
                objMap.set(arrKeys[i], 0);

                for (let j = 0, size = limits2[arrKeys[i]]; j < size; j++) {
                    if (sum - +arrKeys[i] < 0) break;
                    sum -= +arrKeys[i];
                    objMap.set(arrKeys[i], objMap.get(arrKeys[i]) + 1);
                }
            }
        }

        // если есть хоть какой то остаток, то вернем ошибку
        if (sum) return 'Uncaught Error: Not enough bank notes.';

        // сформируем результат
        for (let [key, value] of objMap) result += `${value}x${key} `;

        return result;
    }

    return 'Uncaught Error: Not enough bank notes.';
};

const limitsobjMap = {
    5000: 4,
    1000: 5,
    500: 2,
    100: 7,
    50: 100,
};

console.log(getMoney(3600, limitsobjMap)); // "3x1000 1x500 1x100"
console.log(getMoney(6650, limitsobjMap)); // "1x5000 1x1000 1x500 1x100 1x50"
console.log(getMoney(22000, limitsobjMap)); // "4x5000 2x1000"
console.log(getMoney(26250, limitsobjMap)); // "4x5000 5x1000 2x500 2x100 1x50"
console.log(getMoney(26260, limitsobjMap)); // Uncaught Error: Not enough bank notes.
console.log(getMoney(100000, limitsobjMap)); // Uncaught Error: Not enough bank notes.
console.log(getMoney(49, limitsobjMap)); // Uncaught Error: Not enough bank notes.

// ===========================================================================
/*
Перевести сумму десятичного числа в двоичное
1, 1 --> "10" (1 + 1 = 2 in decimal or 10 in binary)
5, 9 --> "1110" (5 + 9 = 14 in decimal or 1110 in binary)
*/
function addBinary(a,b) {
    let result = '';

    for (let sum = a + b; sum > 0;) {
        result = sum % 2 ? 1 + result : 0 + result;
        sum = Math.floor(sum / 2);
    }

    return result;
}

function addBinary(a,b) {
    return (a+b).toString(2)
}


console.log(addBinary(1, 1)); // 10
console.log(addBinary(5, 9)); // 1110
