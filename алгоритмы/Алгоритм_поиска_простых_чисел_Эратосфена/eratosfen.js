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
function findNearestPrimeNumber2(num) {
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

console.log(findNearestPrimeNumber2(4)); // 3
console.log(findNearestPrimeNumber2(3)); // 3
console.log(findNearestPrimeNumber2(11)); // 11
console.log(findNearestPrimeNumber2(110)); // 109
console.log(findNearestPrimeNumber2(1110)); // 1109
console.log(findNearestPrimeNumber2(-4000)); // 2