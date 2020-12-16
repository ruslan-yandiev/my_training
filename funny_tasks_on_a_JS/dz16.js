/*
Верните максимальную прибыль от котировок акций. Котировки акций хранятся в
массиве по дате.Прибыль от акций - это разница в ценах на покупку и продажу
акций. Каждый день вы можете купить одну единицу акций, продать любое
количество единиц, которые вы уже купили, или ничего не делать.
Следовательно, наибольшая прибыль - это максимальная разница всех пар в
последовательности курсов акций.
*/

function calc(arr) {
    let profit = 0;

    function findMaxProfit(newArr) {
        const maxPrice = Math.max(...newArr);

        const indexMaxPrice = newArr.indexOf(maxPrice);

        for (let i = 0; i < indexMaxPrice; i++) profit += maxPrice - newArr[i];

        if (newArr.length > 1) findMaxProfit(newArr.slice(indexMaxPrice + 1));

        return profit;
    }

    return findMaxProfit(arr);
}

console.log(calc([1, 2, 3, 4, 5, 6])); // 15 (покупка 1, 2, 3, 4, 5 и продажа на 6)
console.log(calc([6, 5, 4, 3, 2, 1])); // 0 (тут нечего покупать, не можем заработать на покупке)
console.log(calc([1, 6, 5, 10, 8, 7])); // 18 (покупка 1, 6, 5 и продажа на 10)
console.log(calc([1, 2, 10, 2, 4, 6])); // 23 (покупка 1, 2 продажа на 10; покупка 2, 4 продажа на 6)
console.log(calc([1, 2, 10, 2, 4])); // 19
console.log(calc([1, 2, 10, 2, 4, 6, 2, 4, 6])); // 29

// * ========================================================================================================
/*
Функция принимает строку, которая содержит только английские буквы и вторым аргументам принимает своеобразное регулярное выражение,
функция должна вернуть правду, в случае если строка совпадает с регулярным выражением учитывая правила, инпче ложь.
Правила своеобразного регулярного выражения:
'H' - строка должна состоять из буквы 'H'.
'.' - любой символ.
'H*' - звездочка используется только в сочетании с предыдущим символом, означает, что в строке может быть сколько угодно букв 'H'.
Использовать нативные регулярные выражения запрещено.
Регулярное выражение проверять на правильность не нужно, предположим, что оно всегда верно.
*/
function reg(str, regex) {
    if (str.length === 0 && regex.length === 0) return true;
    if (str.length === 0 && regex.length > 0) return false;
    if (str === regex) return true;
    if (str.length > regex.length && !regex.includes('*')) return false;
    if (
        !regex.includes('.') &&
        !regex.includes('*') &&
        str.length < regex.length
    ) {
        return false;
    }

    if (regex[0] === '.' && regex[1] === '*') {
        if (
            str[3] === regex[2] &&
            regex[regex.length - 1] === str[str.length - 1] &&
            regex[regex.length - 2] === str[str.length - 2]
        ) {
            return true;
        } else if (
            str[3] === regex[2] &&
            ((regex[regex.length - 1] === str[str.length - 1] &&
                regex[regex.length - 2] === str[str.length - 2] &&
                regex[regex.length - 3] === str[str.length - 3]) ||
                (regex[regex.length - 1] === '.' &&
                    regex[regex.length - 2] === '.' &&
                    regex[regex.length - 3] === str[str.length - 3]))
        ) {
            return true;
        }
    }

    if (
        str[0] === regex[0] &&
        regex[1] === '*' &&
        regex[regex.length - 1] === '*'
    ) {
        return false;
    }

    if (regex[1] === '*') {
        if (
            (str[0] === regex[0] || regex[0] === '.') &&
            (str[2] === regex[2] || regex[2] === '.')
        ) {
            return reg(str.substr(3), regex.substr(3));
        }
    }

    if (regex[2] === '*' && regex[1] === regex[0]) {
        if (str[0] === regex[0] && str[1] === regex[1] && str[2] === regex[3]) {
            return reg(str.substr(3), regex.substr(4));
        }
    }

    if (regex[3] === '*' && regex[2] === regex[1] && regex[1] === regex[0]) {
        if (
            str[0] === regex[0] &&
            str[1] === regex[1] &&
            str[1] === regex[2] &&
            str[2] === regex[4]
        ) {
            return reg(str.substr(3), regex.substr(5));
        }
    }

    if (str[0] === regex[0] || regex[0] === '.') {
        return reg(str.substr(1), regex.substr(1));
    }

    return false;
}

// Для проверки:
console.log(reg('Hello', 'Hello')); // true
console.log(reg('Hello', 'Hel.o')); // true
console.log(reg('Hello', '.....')); // true
console.log(reg('Hello', 'Helllo')); // false
console.log(reg('Hello', 'He.o')); // false
console.log(reg('Hello', 'Hell')); // false

console.log(reg('Hellolo', 'Hel*olo')); // true
console.log(reg('Hellolo', 'Hell*olo')); // true
console.log(reg('Hellolo', 'Helll*olo')); // ture
console.log(reg('Hellolo', 'He.*lo')); // true
console.log(reg('Hellolo', 'He.*olo')); // true
console.log(reg('Hellolo', 'He.*lolo')); // true
console.log(reg('Hellolo', 'He.*llo..')); //true
console.log(reg('Hellolo', 'Hel*ol*')); // false
console.log(reg('Hellolo', 'Hell*ol')); // false
console.log(reg('Hellolo', 'Hellll*olo')); // false
console.log(reg('Hellolo', 'He.*lol')); // false
console.log(reg('Hellolo', 'He.*olo.')); // false
console.log(reg('Hellolo', 'He.*lol..')); // false
console.log(reg('Hellolo', 'He.*llo...')); // false

// * =========================================================================
/*
Необходимо реализовать функцию sum так, чтобы при каждом вызове функции в 
console.log выводилось число с суммой всех предыдущих вызовов как в примере.
*/

function sum(number) {
    let accum = number;
    console.log(accum);

    return function f(num) {
        accum += num;
        console.log(accum);
        return f;
    };
}

sum(1)(2); // 1 3
sum(1)(5)(10); // 1 6 16

// Вариант 2
function sum2(number) {
    let accum = number;
    console.log(accum);

    return function (num) {
        return sum2(accum + num);
    };
}

sum2(1)(2); // 1 3
sum2(1)(5)(10); // 1 6 16

/*
 * 1) JWT (правильно - JSON Web Token, а я назвал JavaScript Web Token'ом, виноват  - что это?
 * Это не хэш токена, там хэшируется только сумма (чтобы сервер мог свериться с с суммой и подтвердить
 * что не было подмены токена), но при этом он в себе хранит обычные данные, например id пользователя,
 * имя или что-то еще (что захочешь) и эти данные не захешированы, по сути их любой может получить и прочитать.
 * Суть в том, что используя такой токен на стороне сервера не нужно будет лезть в БД для проверки этого токена, достаточно
 * просто проверить сумму, это очень удобно при использовании микросервисов.

 *  2) Чем отличаются односвязный список и двусвязный список? тем, что односвязный хранит в ячейке данне и информацию о месте нахождения следующей ячейке в списке,
        * а если следующей нет то хранит просто сами данные и NULL вместо адреса следующей.
        * Двусвязный список все тоже самое что односвязные, плюс хранит информацию о месте нахождения предыдущей ячейки памяти и если предыдущей нет то будет адрес будет NULL
 */

for (var i = 0; i < 10; ++i) {
    setTimeout(() => console.log(i), 1000);
} // через секунду вернет 10 десяток, так как var имеет функуиональную область видимости и всплывет иницализировавшить в undefided

for (let i = 0; i < 10; ++i) {
    setTimeout(() => console.log(i), 1000);
} // секунду выведит цифры от 0 до 9, так как let имеет блочную область видимости и будет инициализироваться при каждом
// проходжении цикла. То есть let будет объявленно для конкретного замыкания(области видимости исключительно для цикла)
