/*
В функцию checkMaxTime передается массив со значениями времени в которое звенит
каждый день будильник. Будильник звенит ровно одну минуту, необходимо найти самый 
большой промежуток времени, когда будильник звенеть не будет.
*/
function checkMaxTime(arr) {
    let allTime = 86400;

    let arr2 = [];

    for (let i = 0; i < arr.length; i++) {
        arr2.push(arr[i].split(':'));
    }

    for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr2[i].length; j++) {
            arr2[i][j] = +arr2[i][j];
            if (j === 0) {
                arr2[i][j] = +arr2[i][j] * 3600;
            } else {
                arr2[i][j] = +arr2[i][j] * 60;
                arr2[i][j - 1] = arr2[i][j - 1] + arr2[i][j];
                arr2[i].splice(j, 1);
            }
        }
    }

    let arr3 = [];

    for (let i = 0; i < arr2.length; i++) {
        arr3.push(arr2[i][0]);
    }

    for (let i = 0; i < arr3.length; i++) {
        for (let j = i; arr3[j] > arr3[j - 1]; j--) {
            [arr3[j], arr3[j - 1]] = [arr3[j - 1], arr3[j]];
        }
    }

    let result = allTime - arr3[0] + arr3[arr3.length - 1];

    for (let i = 0; i < arr3.length - 1; i++) {
        if (result < arr3[i] - arr3[i + 1]) {
            result = arr3[i] - arr3[i + 1];
        }
    }

    result -= 60;

    let m = Math.floor(result / 60);
    let h = Math.floor(m / 60);
    m = m % 60;

    return `${h}:${m}`;
}

console.log(checkMaxTime(['14:51'])); // "23:59"
console.log(checkMaxTime(['23:00', '04:22', '18:05', '06:24'])); // "11:40"
console.log(checkMaxTime(['21:14', '15:34', '14:51', '06:25', '15:30'])); // "09:10"

// * =============================================================================================================
/*
Реализовать функцию iqTest, которая среди заданных чисел найдёт одно, 
отличающееся по чётности, и вернёт позицию (не индекс, а позицию по счету) этого 
числа из первоначальной строки.
*/
function iqTest(numbers) {
    const arr = numbers.split(' ');
    let a = [];
    let b = [];

    for (let i = 0; i < arr.length; i++) {
        +arr[i] % 2 === 0 ? a.push(arr[i]) : b.push(arr[i]);
    }

    return a.length === 1 ? arr.indexOf(a[0]) + 1 : arr.indexOf(b[0]) + 1;
}

console.log(iqTest('2 4 7 8 10')); // 3
console.log(iqTest('1 2 2')); // 1
console.log(iqTest('1 3 12 7 13')); // 3

// 2
function iqTest2(numbers) {
    let arr = numbers.split(' ');
    let oddCount = (arr[0] % 2) + (arr[1] % 2) + (arr[2] % 2); // тут мы проверим сразу половину на соответствии уменьшив работу. (лучше автоматизирвать)
    return oddCount < 2
        ? arr.findIndex((item) => item % 2) + 1
        : arr.findIndex((item) => !(item % 2)) + 1;
}

console.log(iqTest2('2 4 7 8 10')); // 3
console.log(iqTest2('1 2 2')); // 1
console.log(iqTest2('1 3 12 7 13')); // 3
console.log('=============================================');

function iqTest(str) {
    const arr = str.split(' ');
    const chet = arr.filter((el) => el % 2 === 0);
    const notChet = arr.filter((el) => el % 2 === 1);
    return chet.length < notChet.length ? arr.indexOf(chet[0]) + 1 : arr.indexOf(notChet[0]) + 1 
}

console.log(iqTest('2 4 7 8 10')); // 3
console.log(iqTest('1 2 2')); // 1
console.log(iqTest('1 3 12 7 13')); // 3

// * ==========================================================================================
/*
Реализовать функцию findNearestPrimeNumber, которая возвращает ближайшее простое
число. На вход функция получает целое число, рядом с которой нужно найти 
ближайшее значение простого числа. Если разница между значениями равна, выбрать 
меньшее найденное значение.
*/

function findNearestPrimeNumber(num) {
    if (num <= 2) return 2;
    if (num % 2 > 0) return num;

    let num1 = (num2 = num);
    let lengths1 = (lengths2 = detect = 0);

    while (detect !== 2) {
        num1 += 1;
        lengths1 += 1;
        let step = 1;
        detect = 0;

        while (step <= num1) {
            if (num1 % step === 0) {
                detect += 1;
            }
            step += 1;
        }
    }

    detect = 0;

    while (detect !== 2) {
        num2 -= 1;
        lengths2 += 1;
        let step = 1;
        detect = 0;

        while (step <= num2) {
            if (num2 % step === 0) {
                detect += 1;
            }
            step += 1;
        }
    }

    return lengths1 < lengths2 ? num1 : num2;
}

console.log(findNearestPrimeNumber(4)); // 3 Разница равна - берем меньшее.
console.log(findNearestPrimeNumber(3)); // 3
console.log(findNearestPrimeNumber(11)); // 11
console.log(findNearestPrimeNumber(125)); // 127
console.log(findNearestPrimeNumber(110)); // 109
console.log(findNearestPrimeNumber(1110)); // 1109
console.log(findNearestPrimeNumber(350000)); // 350003
console.log(findNearestPrimeNumber(-4000)); // 2

// Вариант 2 (быстрее)
function findNearestPrimeNumber2(num) {
    if (num < 2) return 2;

    function isPrime(number) {
        for (let i = 2; i < number; i++) {
            if (number % i === 0) return false;
        }
        return true;
    }

    if (isPrime(num)) return num;

    for (let i = 1; true; i++) {
        if (isPrime(num - i)) return num - i;
        if (isPrime(num + i)) return num + i;
    }
}

console.log(findNearestPrimeNumber2(4)); // 3 Разница равна - берем меньшее.
console.log(findNearestPrimeNumber2(3)); // 3
console.log(findNearestPrimeNumber2(11)); // 11
console.log(findNearestPrimeNumber2(125)); // 127
console.log(findNearestPrimeNumber2(110)); // 109
console.log(findNearestPrimeNumber2(1110)); // 1109
console.log(findNearestPrimeNumber2(350000)); // 350003
console.log(findNearestPrimeNumber2(-4000)); // 2

//Реализуем поиск простых чисел с помощью алгоритма Эратосфена
// Пример для n = 30
// Запишем натуральные числа, начиная от 2, до 30 в ряд:
// 2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
// Первое число в списке, 2 — простое. Пройдём по ряду чисел, зачёркивая все числа, кратные 2 (то есть, каждое второе, начиная с 22 = 4):
// 2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
// Следующее незачеркнутое число, 3 — простое. Пройдём по ряду чисел, зачёркивая все числа, кратные 3 (то есть, каждое третье, начиная с 32 = 9):
// 2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
// Следующее незачеркнутое число, 5 — простое. Пройдём по ряду чисел, зачёркивая все числа, кратные 5 (то есть, каждое пятое, начиная с 52 = 25):
// 2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
// Следующее незачеркнутое число — 7. Его квадрат, 49 — больше 30, поэтому на этом работа завершена. Все составные числа уже зачеркнуты:
// 2  3     5     7           11    13          17    19          23                29
// алгоритм получения всех натуральных чисел от 2 до num включительно
function findPrimeNumber(num) {
    if (num <= 2) return 2;

    let optionOne = [];
    let optionTwo = [2];

    // отберем в массив все числа от 2 до num
    for (let i = 3; i <= num; i += 2) {
        optionOne.push(i);
    }

    let index = 3;

    while (index * index < num) {
        for (let i = index; i !== null && i <= num; i += index) {
            delete optionOne[i];
        }

        optionTwo.push(optionOne.splice(0, 1)[0]);
        optionOne[0] ? (index = optionOne[0]) : (index = null);
    }

    // return optionTwo.concat(optionOne).filter(Number);
    return [...optionTwo, ...optionOne].filter(Number);
}

// console.log(findPrimeNumber(4)); // 3
// console.log(findPrimeNumber(3)); // 3
// console.log(findPrimeNumber(11)); // 11
// console.log(findPrimeNumber(110)); // 109
// console.log(findPrimeNumber(1110)); // 1109
// console.log(findPrimeNumber(-4000)); // 2

/*
    ? 1) HOC в реакте использовал?
        * HOC это элемент который возвращает другой элемент немного переделанный(тоесть он оборачивает, как дикоратор функция)
    
    ? 2) Для чего ставим ключи в реакте при выводе списка?
        * могут быть ошибки и проблемы если не поставить ключи
    
    ? 3) Как сообщить о том что у пользователя выключен JavaScript?
        * В HTML есть тег <noscript>Вруби JS утырок!!!</noscript> 

    ? 4) Какие дескрипторы для свойств объектов есть?
        * get, set, readable, writable, configurable

    ? 5) Что такое функции-генераторы? (function* a {yield "Привет"; yield "Пока";})
        * Обычные функции возвращают только одно-единственное значение (или ничего).
        * Генераторы могут порождать (yield) множество значений одно за другим, 
        * по мере необходимости. Генераторы отлично работают с перебираемыми объектами 
        * и позволяют легко создавать потоки данных.
        * Функции-генераторы ведут себя не так, как обычные. 
        * Когда такая функция вызвана, она не выполняет свой код. 
        * Вместо этого она возвращает специальный объект, так называемый «генератор», 
        * для управления её выполнением.
        * Подробнее о генераторе: https://learn.javascript.ru/generators

    ? 4) Какие группы ответов в http, за что отвечают?
        * Имеется группа ответов о статусе 200, 201, 400, 404, 403, 500 ....
    
    ? 4) Про паттерны.т?
        * Одиночка, стратегия, фабрики, абстрактные фабрики, дикораторы (адаптор) 
*/
