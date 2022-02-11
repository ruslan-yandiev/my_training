let a = NaN;

if (typeof a === 'number' && a + 1) {
    console.log('a это число');
} else if (typeof a === 'number' && !a + 1) {
    console.log('a это NaN');
}

console.log(Number.isNaN(a)); // true

// * ============================================================================================
/*
Реализовать функцию так, чтобы она возвращала строку "неверная строка", в случае если в функцию была передана сьрока
с одним символом или меньше, либо если символов в строке более 100.
В случае если количество символов надодится в диапозоне (1, 100), необходимо вернуть массив, в котором будут записаны все четные символы строки
*/
function getEvenChars(str) {
    return str.length < 2 || str.length > 100 ?  'неверная строка' : [...str].filter((el, index) => index % 2);
}


function getEvenChars(str) {
    if (str.length < 2 || str.length > 100) return 'неверная строка';
    return [...str].reduce((accum, elem, index) => {
        if (index % 2 !== 0) {
            accum.push(elem);
        }
        return accum;
    }, []);
}

console.log(getEvenChars('abcdefghijklm')); // ['b', 'd', 'f', 'h', 'j', 'l']
console.log(getEvenChars('a')); // 'неверная строка'

// * ====================================================================================
/*
Напишите функцию, которая вернет true, в случае если переданное в функцию число простое, иначе false.
Простое число - это натуральное число, имеющее ровно два два различных натуральных делителя - единицы и самого себя.
Число является простым если оно больше единицы, целое и делится без остатка только на 1 и на самого себя, но не на другие числа
*/
function isPrime(num) {
    if (
        num === 0 ||
        num === 1 ||
        typeof num !== 'number' ||
        Number.isNaN(num)
    ) {
        return false;
    }

    let detect = 0;

    for (let i = 1; i < num; i++) {
        if (num % i === 0) detect += 1;
        if (detect > 2) return false;
    }

    return true;
}

function isPrime(num) {
    if (Number.isNaN(num) || typeof num !== 'number' || num < 2) return false;
    let detect = 0;

    for (let i = 1; i <= num; i++) {
        if (num % i === 0) detect += 1;
        if (detect > 2) return false;
    }

    return true;
}

console.log(isPrime(12)); // false
console.log(isPrime(23)); // true
console.log(isPrime(1)); // false
console.log(isPrime(0)); // false
console.log(isPrime('1212')); // false
console.log(isPrime(NaN)); // false
console.log(
    '==========================================================================',
);
// * ===================================================================================
/*
Функция принимает массив слов, а также искомое слово. Необходимо вернуть правду, если такое слово можно составить
из того пазоа, что передали внутрь функции, ложь, если такое слово невозможно составить.
1. Направление от букв должно быть влево, вправо, вниз, вверх. переходить с одного конца слова в другой конеу запрещено
2. В слове все символы должны быть уникальны, то есть нельзя из паззла использовать одну и ту же букву на том же самом месте.
Короче. Двигаться можно только к соседним буквам в двух направления вперед и назад, вверх и вниз.
*/
function findWord(puzzle, word) {
    const arr = [...puzzle.join('')],
        arrWord = [...word];

    let letter = arrWord.splice(0, 1)[0],
        step = arrWord.length - 1;

    while (arrWord.length > 0 && step > 0) {
        arr.find((elem, i) => {
            if (
                elem === letter &&
                (arr[i + 1] === arrWord[0] ||
                    arr[i - 1] === arrWord[0] ||
                    arr[i + 7] === arrWord[0] ||
                    arr[i - 7] === arrWord[0])
            ) {
                letter = arrWord.splice(0, 1)[0];
            }
        });
        step -= 1;
    }

    return arrWord.length === 0;
}

const puzzle = ['ANGULAR', 'REDNCAE', 'RFIDTCL', 'AGNEGSA', 'YTIRTSP'];

console.log(findWord(puzzle, 'ANGULAR')); //true
console.log(findWord(puzzle, 'REACT')); //true
console.log(findWord(puzzle, 'ARRAY')); //true
console.log(findWord(puzzle, 'UNDEFINED')); //true
console.log(findWord(puzzle, 'RED')); //true
console.log(findWord(puzzle, 'STRING')); //true
console.log(findWord(puzzle, 'CLASS')); //true
console.log(findWord(puzzle, 'FUNCTION')); //false
console.log(findWord(puzzle, 'NULL')); //false
