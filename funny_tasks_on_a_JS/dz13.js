/*
Функция принимает число, функция должна вернуть маскимально число,
содержащее те цифры, что и в переданном числе. Если было передано некоректное число,
Вернуть NaN.
*/
function getMax(num) {
    if (typeof num !== 'number') {
        return NaN;
    }

    const arr = ('' + num).split('');
    let maxNum = 0;
    let result = '';

    arr.forEach((elem) => {
        if (elem === '.') {
            arr.splice(arr.indexOf(elem), 1);
        }
    });

    while (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > maxNum) {
                maxNum = arr[i];
            }
        }

        result += maxNum;
        arr.splice(arr.indexOf(maxNum), 1);
        maxNum = 0;
    }

    return result;
}

console.log(getMax(6118)); // 8611
console.log(getMax(17)); // 71
console.log(getMax(17.5)); // 751
console.log(getMax('Hi')); // NaN

// №2
function getMax2(num) {
    if (typeof num !== 'number') return NaN;

    return [...('' + num)]
        .sort()
        .reverse()
        .reduce((accum, elem) =>
            elem !== '.' ? (accum += elem) : (accum += ''),
        );
}

console.log(getMax2(6118)); // 8611
console.log(getMax2(17)); // 71
console.log(getMax2(17.5)); // 751
console.log(getMax2('Hi')); // NaN

// №3
function getMax3(num) {
    return Number([...String(num)].sort((a, b) => b - a).join('')); // коректно будет работать только в хроме
}

console.log(getMax3(6118)); // 8611
console.log(getMax3(17)); // 71
console.log(getMax3(17.5)); // 751 // коректно будет работать только в хроме
console.log(getMax3('Hi')); // NaN

// * ===========================================================================================
/*
Функция принимает строку, в которой содержатся буквы/цифры и может содержаться знак "#",
этот знак означает, что человек нажал backspace, то есть стёр предыдущий знак,
необходимо собрать получившуюся строку.
*/
function cleanString(s) {
    const arr = [...s];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '#') {
            arr.splice(i - 1, 2);
            i -= 2;
        }
    }

    return arr.join('');
}

console.log(cleanString('авб#г##д')); // "ад"
console.log(cleanString('Прив###ока')); // "Пока"

// №2
function cleanString2(s) {
    return [...s].reduce(
        (accum, elem) => (elem === '#' ? accum.slice(0, -1) : (accum += elem)),
        '',
    );
}

console.log(cleanString2('авб#г##д')); // "ад"
console.log(cleanString2('Прив###ока')); // "Пока" Hello world

/*
    * 1) placeholder-shown псевдокласс, для чего он? - когда виден placeholder он показывает или подсвечивает нужным цветом если бэеграунд задан, а когда начинаем заполнять поле, то исчезает

    * 2)  1 < 2 < 3 // true;  3 > 2 > 1 false;
*/