/*
Результатом декоратора debounce(f, ms) должна быть обёртка, 
которая передаёт вызов f не более одного раза в ms миллисекунд. 
Другими словами, когда мы вызываем debounce, 
это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.

На практике debounce полезен для функций, которые получают/обновляют данные, 
и мы знаем, что повторный вызов в течение короткого промежутка времени не даст ничего нового. 
Так что лучше не тратить на него ресурсы.
*/
// function debounce(f, ms) {
//   let detect = true;

//   return function (arg) {
//     if (detect) {
//       f(arg);
//       detect = false;
//     }

//     setTimeout(() => (detect = true), ms);
//   };
// }

// let f = debounce(console.log, 1000);

// f(1); // выполняется немедленно
// f(2); // проигнорирован

// setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout(() => f(4), 1100); // выполняется
// setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
// setTimeout(() => f(6), 2300); // выполняется

//* =======================================================================================================================

//! 39
/*
Задача Calculator
Описание
Создайте функцию calculate. Функция должна принимать арифметические операции двух чисел в виде строки и возвращать строку с результатом их выполнения.
Функция принимает данные из аргументов и возвращает с помощью return.

Требования
Решение должно пройти все тесты.
Калькулятор умеет выполнять операции сложения, вычитания, умножения и деления с двумя числами: a + b, a - b, a * b, a / b. Данные передаются в виде одной строки!
Калькулятор умеет работать как с арабскими (1,2,3,4,5…), так и с римскими (I,II,III,IV,V…) числами. Оба операнда должны быть либо арабскими, либо римскими.
Операнды должны лежать в диапазоне от 1 до 10 включительно, без ноля. Ответ может быть больше 10.
Калькулятор умеет работать только с целыми числами, принимает и возвращает.
Результат на выходе всегда строка с целым числом. В делении учитываем только целую часть - десятичную отбрасываем, например 2 / 4 = 0,5 - вернём 0.
Калькулятор умеет работать только с арабскими или римскими цифрами одновременно, при вводе пользователем строки вроде 3 + II калькулятор должен выбросить исключение (ошибку) и прекратить свою работу.
Поскольку в римской системе счисления нет нуля и отрицательных чисел, то вместо них возвращаем пустую строку. (например I - II = '')
При вызове калькулятора с неподходящими числами, функция выбрасывает исключение и завершает свою работу.
При вызове калькулятора со строкой, которая не является математическим примером с одной из арифметических операций, описанных в требовании, приложение выбрасывает исключение и завершает свою работу.
*/
function calculate(str) {
    /*
        TODO - Может быть вернуть просто драбление по split(' ')
        TODO - усовершенствовать функцию decoding
        TODO - 
    */

    str = [...str].filter((el) => el !== ' ').join(''); // распарсим варианты когда строка может быть "1+1" или "1 + 1" или "1+ 1"
    
    const elements = [];

    function decoding(num) {
        const decod = {'C': 100, 'XC': 90, 'L': 50, 'XL': 40, 'X': 10, 'IX': 9, 'V': 5, 'IV': 4, 'I': 1};

        if (typeof num === 'string') {
            return decod[num] ? decod[num] : [...num.toString()].reduce((acc, e) => acc + decod[e], 0);
        }

        let result = '';

        for (key in decod) {
            while(decod[key] <= num) {
                result += key;
                num -= decod[key];
            }
        }

        return result;
    }

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/') {
            elements.push(str.substring(0, i), str[i], str.substring(i + 1));
            break;
        }
    }
    
    if (elements.length > 3) throw new Error('Формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)');
    if (elements.length < 3) throw new Error('Cтрока не является математической операцией');
    if (Number.isNaN(+elements[0]) && !Number.isNaN(+elements[2]) || !Number.isNaN(+elements[0]) && Number.isNaN(+elements[2])) {
        throw new Error('Используются одновременно разные системы счисления');
    }

    let result;

    if (elements[1] === '+') {
        result = Number.isNaN(+elements[0]) ? decoding(elements[0]) + decoding(elements[2]) : +elements[0] + +elements[2];
    } else if (elements[1] === '-') {
        result = Number.isNaN(+elements[0]) ? decoding(elements[0]) - decoding(elements[2]) : +elements[0] - +elements[2];
    } else if (elements[1] === '*') {
        result = Number.isNaN(+elements[0]) ? decoding(elements[0]) * decoding(elements[2]) : +elements[0] * +elements[2];
    } else {
        result = Number.isNaN(+elements[0]) ? decoding(elements[0]) / decoding(elements[2]) : +elements[0] / +elements[2];
    }

    if (result === 0 && Number.isNaN(+elements[0])) return '';
    if (result === 0) return '0';

    result = Math.floor(result);

    return Number.isNaN(+elements[0]) ? decoding(result).toString() : result.toString();
}

// console.log(calculate('XCVIII + I')); // вернётся строка XCIX'
console.log(calculate('IX - VIII')); // вернётся строка I'
console.log(calculate('IX + VIII')); // вернётся строка XVII'
console.log(calculate('X * X')); // вернется строка 'C'
console.log(calculate('X + X')); // вернется строка 'XX'
console.log(calculate('1+1')); // вернется строка '2'
console.log(calculate('1 + 2')); // вернется строка '3'
console.log(calculate('VI / III')); // вернется строка 'II'
console.log(calculate('VII / III')); // вернётся строка II'
console.log(calculate('I + II')); // вернется строка 'III'
console.log(calculate('I - II')); // вернётся строка '' (пустая строка) т.к. в римской системе нет отрицательных чисел
console.log(calculate('I + 1')); // вернётся исключение (ошибка) throws Error т.к. используются одновременно разные системы счисления
console.log(calculate('I')); // вернётся исключение throws Error т.к. строка не является математической операцией
console.log(calculate('1 + 1 + 1')); // вернётся исключение throws Error т.к. формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)
