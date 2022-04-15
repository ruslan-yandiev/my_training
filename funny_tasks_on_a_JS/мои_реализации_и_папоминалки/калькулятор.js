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

TODO - улучшить калькулятор ,чтобы он принимао и выводил числа свыше 1000.
TODO - чтобы мог принимать строку любой длины и парсить даже такие конструкции "1+ 1+1+ 2*3/4 -100"
*/
function calculate(str) {
    str = [...str].filter((el) => el !== ' ').join(''); // распарсим варианты когда строка может быть "1+1" или "1 + 1" или "1+ 1"
    
    const elements = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/') {
            elements.push(str.substring(0, i), str[i], str.substring(i + 1));
            break;
        }
    }

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
    
    if (elements.length > 3) throw new Error('Формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)');
    if (elements.length < 3) throw new Error('Cтрока не является математической операцией');
    if (elements.some((el) => el === '')) throw new Error('Cтрока не является математической операцией');
    if (elements.some((el) => +el > 10 || +el < 1 || decoding(el) > 10)) throw new Error('Диапазон должен быть от 0 до 10');
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
    } else if (elements[1] === '/') {
        result = Number.isNaN(+elements[0]) ? decoding(elements[0]) / decoding(elements[2]) : +elements[0] / +elements[2];
    } else {
        throw new Error('Формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)');
    }

    if (result === 0 && Number.isNaN(+elements[0])) return '';
    if (result === 0) return '0';

    result = Math.floor(result);

    return Number.isNaN(+elements[0]) ? decoding(result).toString() : result.toString();
}

console.log(calculate('XI + I'));
// console.log(calculate('XCVIII + I')); // вернётся строка XCIX'
// console.log(calculate('0 + 1'));
// console.log(calculate('11 + 1'));
// console.log(calculate('+'));
// console.log(calculate('++1'));
// console.log(calculate('+1'));
// console.log(calculate('1+'));
// console.log(calculate('IX - VIII')); // вернётся строка I'
// console.log(calculate('IX + VIII')); // вернётся строка XVII'
// console.log(calculate('X * X')); // вернется строка 'C'
// console.log(calculate('X + X')); // вернется строка 'XX'
// console.log(calculate('1+1')); // вернется строка '2'
// console.log(calculate('1 + 2')); // вернется строка '3'
// console.log(calculate('VI / III')); // вернется строка 'II'
// console.log(calculate('VII / III')); // вернётся строка II'
// console.log(calculate('I + II')); // вернется строка 'III'
// console.log(calculate('I - II')); // вернётся строка '' (пустая строка) т.к. в римской системе нет отрицательных чисел
// console.log(calculate('I + 1')); // вернётся исключение (ошибка) throws Error т.к. используются одновременно разные системы счисления
// console.log(calculate('I')); // вернётся исключение throws Error т.к. строка не является математической операцией
// console.log(calculate('1 + 1 + 1')); // вернётся исключение throws Error т.к. формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)
