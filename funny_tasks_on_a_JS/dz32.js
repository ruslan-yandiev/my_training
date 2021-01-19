/*
Реализовать функцию leftPad, которая добавляет слева к строке пробелы.
Функция принимает два аргумента: число, обозначающее минимальную длину
результата, и строку, которую нужно дополнить, если её длина меньше.
*/
function leftPad(symbolsCount, str) {
    if (symbolsCount <= str) return str;

    for (let i = 0; i < symbolsCount - str.length; i++) str = ' ' + str;

    return str;
}

console.log(leftPad(6, 'test')); // Вернет "  test"
console.log(leftPad(3, 'test')); // Вернет "test"

function leftPad2(symbolsCount, str) {
    return str.padStart(symbolsCount, ' ');
}

console.log(leftPad2(6, 'test')); // Вернет "  test"
console.log(leftPad2(3, 'test')); // Вернет "test"


// function leftPad3(symbolsCount, str) {
//     if (symbolsCount <= str) return str;

//     return " ".repeat(symbolsCount - str.length) + str;
// }

// console.log(leftPad3(6, 'test')); // Вернет "  test"
// console.log(leftPad3(3, 'test')); // Вернет "test"

// * ===========================================================================

/*
! С ркального сабеса
Создать функцию objCreator(arr), в которую передается массив строк. Функция
должна вернуть объект с вложенными объектами под свойствами, переданными в
массиве.
*/
function objCreator(arr) {
    const obj = {};

    function  add(key, obj2, index) {
        if (index === arr.length) return obj;
        
        obj2[key] = {};
        
        return add(arr[index + 1], obj2[key], index + 1);
    }

    return add(arr[0], obj, 0);
}

console.log(objCreator(['a', 'b', 'c'])); // {a:{b:{c:{}}}}
console.log(objCreator(['a', 'b', 'c', 'd'])); // {a:{b:{c:{d:{}}}}}
console.log(objCreator([])); // {}

function objCreator2(arr) {
    if (!arr.length) return {}
    return { [arr.splice(0, 1)]: objCreator2(arr) };
}

console.log(objCreator2(['a', 'b', 'c'])); // {a:{b:{c:{}}}}
console.log(objCreator2(['a', 'b', 'c', 'd'])); // {a:{b:{c:{d:{}}}}}
console.log(objCreator2([])); // {}

// * ========================================================================

/*
Необходимо реализовать функцию accum, которая принимает строку, а возвращает
другую строку, как показано в примерах.

аккумулятор ("abcd") -> "A-Bb-Ccc-Dddd"
аккумулятор ("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
аккумулятор ("cwAt") -> "C-Ww-Aaa-Tttt"
Параметр аккумулятора - это строка, которая включает только буквы от a..z и A..Z.
*/
function accum(str) {
    str = str.toLowerCase();
    let accum = '';

    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (!j) {
                accum += str[i].toUpperCase();
            } else accum += str[i];
        }

        if (str.length - 1 !== i) accum += '-';
    }

    return accum;
}

console.log(accum("abcd")); // "A-Bb-Ccc-Dddd"
console.log(accum("RqaEzty")); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
console.log(accum("cwAt")); // "C-Ww-Aaa-Tttt"

function accum2(str) {
    str = str.toLowerCase();
    let result = '';

    function bueld(letter, count) {
        result += letter.toUpperCase();

        for (let i = 1; i < count; i++) result += letter;

        if (count === str.length) return result;

        result += '-';

        return bueld(str[count], count + 1);
    }

    return bueld(str[0], 1)
}

console.log(accum2("abcd")); // "A-Bb-Ccc-Dddd"
console.log(accum2("RqaEzty")); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
console.log(accum2("cwAt")); // "C-Ww-Aaa-Tttt"

const accum3 = (str) => [...str.toLowerCase()].reduce((a, l, i) => a + l.toUpperCase().padEnd(i + 1, l) + '-', '').slice(0, -1);

console.log(accum3("abcd")); // "A-Bb-Ccc-Dddd"
console.log(accum3("RqaEzty")); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
console.log(accum3("cwAt")); // "C-Ww-Aaa-Tttt"

// * ==========================================================================
/*
Завершите решение так, чтобы оно разбило строку на пары из двух символов.
Если строка содержит нечетное количество символов, она должна заменить
отсутствующий второй символ последней пары символом подчеркивания ('_').
*/

function solution(str) {
    const arr = [];

    function  create(str2, index) {
        arr.push(str2);

        if (str2.length === 1) arr[arr.length - 1] = str2 + '_';
        if (index >= str.length) return arr;

        return create(str.substring(index, index + 2), index + 2);
    }

    return create(str.substring(0, 2), 2);
}

console.log(solution('abc')); // should return ['ab', 'c_']
console.log(solution('abcdef')); // should return ['ab', 'cd', 'ef']

// * ========================================================================================

/*
Реализовать debounce-функцию. Функция debounce принимает функцию - `f`, также 
число миллисекунд - `ms`. Функция debounce должна вернуть другую функцию, 
которая будет вызывать функцию `f` только если с момента последнего вызова 
функции `f` прошло `ms` миллисекунд.
*/

function debounce(f, ms) {
    let detect = true;

    return function (str) {
        if (detect) {
            f(str);
            // f.call(this, str); // * если вдруг потребуется сохранить контекст вызова
            detect = false;
            setTimeout(() => detect = true, ms);
        }
    }
}

let debounceFunc = debounce(console.log, 1000);
// выполняется немедленно
debounceFunc('MockInterview 1');
// ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
debounceFunc('MockInterview 2');
// ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
setTimeout(() => debounceFunc('MockInterview 500'), 500);
// Выполнится
setTimeout(() => debounceFunc('MockInterview 1200'), 1200);
// ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
setTimeout(() => debounceFunc('MockInterview 1500'), 1500);
// выполнится
setTimeout(() => debounceFunc('MockInterview 2210'), 2210);