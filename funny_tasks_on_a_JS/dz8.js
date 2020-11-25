/*
Функция принимает массив, реализовать функцию так, чтобы она возвращала сумму чисел
под главной диаганалью матрицы.
*/
function calculate(arr) {
    let sum = 0;

    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            sum += arr[i][j];
        }
    }

    return sum;
}

const arr = [
    [5, 9, -1],
    [1, 7, 2],
    [6, 4, 14],
];
console.log(calculate(arr)); // 1 + 6 + 4 = 11

const arr2 = [
    [5, 73, 9, 81, -6],
    [1, 8, 22, 18, -66],
    [57, 7, -19, 8, 0],
    [2, -7, 54, 1, 33],
    [6, 21, 38, -4, 11],
];
console.log(calculate(arr2)); // 1 + 57 + 7 + 2 + -7 + 54 + 6 + 21 + 38 + -4 = 175

// * ==========================================================================
/*
Функция принимает строку, возвращает true, если строка содержит только буквы и цифры,
иначе false.
*/
function alphanumerica(string) {
    return string.includes('_') || !string || string.includes(' ')
        ? false
        : true;
}

console.log(alphanumerica('JavaScript')); // true
console.log(alphanumerica('hello_')); // false
console.log(alphanumerica('R0bOT')); // true
console.log(alphanumerica('    ')); // false
console.log(alphanumerica('')); // false

// * ==========================================================================
// ! с реального сабеса в крупную компанию
/*
Функция принимает массив банеров (объектов как в примере) и число, обозначающее количество банеров,
которое нужно выбрать из массива. Необходимо реализовать функцию так, чтобы функция выбирала переданное
количество случайных банеров (банеры уникальны, не должны повторяться в результате), учитывая их вес
(свойство weight в объектах банеров). Чем больший вес имеет банер, тем больше шансов того, что этот банер
должен быть выбран.
Если массив банеров содержит меньше или столько же элементов, сколькко было запрошено, то функция должна
вернуть все элементы массива.
*/
function selectBanners(banners, count) {
    if (count >= banners.length) return [...banners];

    const arrResulte = [];
    let maxWeight = 0;
    let step = 0;
    let rand;

    for (let obj of banners) {
        if (obj.weight > maxWeight) {
            maxWeight = obj.weight;
        }
    }

    function check(idNumber) {
        let result = true;

        if (arrResulte.length > 0) {
            for (let obj of arrResulte) {
                if (obj.id === idNumber) {
                    return (result = false);
                }
            }
        }

        return result;
    }

    while (true) {
        // Случайное целое число в диапазоне от 0 включительно и до максимального указанного числа включительно.
        rand = Math.floor(Math.random() * (maxWeight + 1));

        for (let obj of banners) {
            if (check(obj.id) && obj.weight > rand) {
                arrResulte.push(obj);
                step += 1;
            }

            if (step === count) return arrResulte;
        }
    }
}

const banners = [
    { id: 2, weight: 10 },
    { id: 4, weight: 5 },
    { id: 8, weight: 15 },
    { id: 22, weight: 18 },
    { id: 41, weight: 41 },
    { id: 53, weight: 1 },
    { id: 69, weight: 9 },
];

console.log(selectBanners(banners, 3));
