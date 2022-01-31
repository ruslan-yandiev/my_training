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

function calculate(arr) {
    return arr.reduce((acc, elem, index) => (index !== 0 ? acc + elem.slice(0, index).reduce((ac, el) => ac + el) : false), 0);
}

function calculate(arr) {
    return arr.reduce((acc, el, index) => acc + el.slice(0, index).reduce((ac, e) => ac + e, 0), 0)
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
    return string.includes('_') || !string || string.includes(' ') ? false : true;
}

function alphanumerica(string) {
    return [...string].every((let) => let !== ' ' && let !== '_') && [...string].length ? true : false;
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

    const bannersWeight = [];

    const allSumWeight = banners.reduce((accum, banner) => {
        bannersWeight.push(accum + banner.weight);
        return accum + banner.weight;
    }, 0); // можем задать чему будет равень изначально accum, иначе он будет равен первому элементу и сложется со вторым

    const arr = new Set();

    while (arr.size < count) {
        const rand = Math.random() * allSumWeight;
        const findind = banners.findIndex((item, index) => {
            return bannersWeight[index] >= rand;
        });
        arr.add(banners[findind]);
    }

    return [...arr];
}

// const banners = [
//     { id: 2, weight: 10 },
//     { id: 4, weight: 5 },
//     { id: 8, weight: 15 },
//     { id: 22, weight: 18 },
//     { id: 41, weight: 41 },
//     { id: 53, weight: 1 },
//     { id: 69, weight: 9 },
// ];

// console.log(selectBanners(banners, 3));

console.log(
    selectBanners(
        [
            { id: 1, weight: 1 },
            { id: 2, weight: 1000 },
            { id: 3, weight: 1000 },
            { id: 4, weight: 1000 },
        ],
        2,
    ),
);

// ! Мой хороший и быстрый вариант
function selectBanners(banners, num) {
    if (banners.length <= num) return banners;

    const collectionID = banners.reduce((arr, obj) => {
        for (let i = 0; i < obj.weight; i++) arr.push(obj.id);
        return arr;
    }, []);

    const randCollection = new Set();

    for (let i = 0; num > randCollection.size;) {
        randCollection.add(collectionID[Math.floor(Math.random() * (collectionID.length))]);
    }

    return banners.filter((obj) => randCollection.has(obj.id));
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

// * Мой вариант
function selectBanners2(banners, count) {
    if (count >= banners.length) return [...banners];

    const arrResulte = [];
    let maxWeight = 0;
    let rand;

    for (let obj of banners) {
        if (obj.weight > maxWeight) {
            maxWeight = obj.weight;
        }
    }

    // Случайное целое число в диапазоне от 0 включительно и до максимального указанного числа включительно.
    rand = Math.floor(Math.random() * (maxWeight + 1));

    for (let i = 0; i < banners.length; i++) {
        if (banners[i].weight >= rand) {
            arrResulte.push(banners[i]);
            banners.splice(banners[i], 1);
            i--;
        }
    }

    if (arrResulte.length < count) {
        selectBanners2(banners, count).forEach((elem) => {
            if (!arrResulte.find((e) => e.id === elem.id)) {
                arrResulte.push(elem);
            }
        });
    }

    while (arrResulte.length > count) {
        // рандомное значение индекса
        rand = Math.floor(Math.random() * (arrResulte.length + 1));
        arrResulte.splice(rand, 1);
    }

    return arrResulte;
}

// const banners = [
//     { id: 2, weight: 10 },
//     { id: 4, weight: 5 },
//     { id: 8, weight: 15 },
//     { id: 22, weight: 18 },
//     { id: 41, weight: 41 },
//     { id: 53, weight: 1 },
//     { id: 69, weight: 9 },
// ];

// console.log(selectBanners2(banners, 4));

console.log(
    selectBanners2(
        [
            { id: 1, weight: 1 },
            { id: 2, weight: 1000 },
            { id: 3, weight: 1000 },
            { id: 4, weight: 1000 },
        ],
        2,
    ),
);
