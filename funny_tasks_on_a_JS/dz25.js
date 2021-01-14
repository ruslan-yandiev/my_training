/*
let Component = (props) => {
    return '<h1>Hello</h1>';
};

function Component2(props) {
    return '<h1>Hello</h1>';
}

class Foobar {}
class Foobar2 {}

function fnbar() {
    number = 223;
}

const testStr = 'foobar';

// ! только у функций конструкторов(классов) есть свой объект прототипа object.prototype
console.log(Component.prototype === Function.prototype); // false. Component у стрелочных функций нет prototype и нет своего this
console.log(Component.__proto__ === Function.prototype); // true. Component сслылка __proto__ будет вести на объект Function.prototype (покажет от кого он наследует свои свойства и методы)
console.log(Component2.prototype === Function.prototype); // false. Component2 у класса(конструктора) свой собственный объект прототипа Objrct.prototype который хранит методы и свойства его экземпляров (их будут унаследовать его экземпляры)
console.log(Component.__proto__ === Function.prototype); // true. Component2 сслылка __proto__ будет вести на объект Function.prototype (покажет от кого он наследует свои свойства и методы)
console.log(Foobar.__proto__ === Function.prototype); // true. сслылка __proto__ будет вести на объект Function.prototype (покажет от кого он наследует свои свойства и методы)
console.log(Foobar.__proto__ === fnbar.__proto__); // true. сслылка __proto__ будет вести у обоих на один объект Function.prototype (покажет от кого он наследует свои свойства и методы)
console.log(Function.__proto__.prototype === fnbar.__proto__.prototype); // true. Function.prototype (Function.__proto__) нет прототипа
console.log(testStr.__proto__ === Object.prototype); // false. у строки прототип будет String.prototype
console.log(testStr.prototype === String.prototype); // false. строка не конструктор и у него нет своего prototype для создания экземпляров, а только ссыка __proto__
console.log(testStr.__proto__ === String.prototype); // true
console.log(Foobar.prototype.prototype === testStr.prototype); // true. потому, что Foobar.prototype === Object.prototype нет своего прототипа!!!!
console.log(Foobar.prototype === Object.prototype); // false. потому ,что один Object.prototype не равен другому Object.prototype
console.log(Foobar.__proto__ === Foobar2.__proto__); // true у обоих классов ссылка на один и тот же Function.prototype
console.log(Foobar.__proto__.__proto__ === Foobar2.__proto__.__proto__); // true у обоих классов ссылка на один и тот же Function.prototype а тот ссылается на глобальный Object
console.log(
    Foobar.__proto__.__proto__.__proto__ ===
        Foobar2.__proto__.__proto__.__proto__,
); // Глобальный Object будет ссылаться на null
*/

// * =========================================================================================
/*
Подсчитайте количество вхождений каждого символа и верните его в виде списка
массивов в порядке появления (Строго в той же последовательности). Для пустого вывода верните пустой список.
*/

function orderedCount(text) {
    let objMap = new Map();

    for (let i = 0; i < text.length; i++) {
        if (!objMap.has(text[i])) {
            objMap.set(text[i], 1);
        } else {
            objMap.set(text[i], objMap.get(text[i]) + 1);
        }
    }

    return Array.from(objMap);
}
// [['a', 5], ['b', 2], ['r', 2], ['c', 1], ['d', 1]]
console.log(orderedCount('abracadabra'));

// [['2', 2], ['3', 3], ['1', 1 ]]
console.log(orderedCount('233312'));

// * ===========================================================================================
/*
Учитывая строку слов (x), вам необходимо вернуть массив слов, отсортированных
в алфавитном порядке по последнему символу в каждом.
Если два слова имеют одинаковую последнюю букву, возвращаемый массив должен
показывать их в том порядке, в котором они появились в данной строке.
*/

function last(x) {
    const str = 'абвгдеёжзийклмнопрстуфхцщъьыюя';
    return x
        .split(' ')
        .sort(
            (a, b) =>
                str.indexOf(a[a.length - 1]) - str.indexOf(b[b.length - 1]),
        );
}

console.log(last('держите меня семеро')); // ["держите", "семеро", "меня"]
console.log(last('её код сводит меня с ума')); // ["ума", "код", "её", "с", "сводит", "меня"]
console.log(last('мама ама криминал')); // ["мама", "ама", "криминал"]

// 2
function last2(x) {
    return x
        .split(' ')
        .sort((a, b) => a[a.length - 1].localeCompare(b[b.length - 1]));
}

console.log(last2('держите меня семеро')); // ["держите", "семеро", "меня"]
console.log(last2('её код сводит меня с ума')); // ["ума", "код", "её", "с", "сводит", "меня"]
console.log(last2('мама ама криминал')); // ["мама", "ама", "криминал"]

// * ==============================================================================
/*
Прислал Volodya Xurshudyan

Напишите функцию, которая объединяет два массива, поочередно выбирая элементы
из каждого массива. Массивы могут иметь разную длину.
*/

function mergeArrays(a, b) {
    let detect = 0;
    let step = a.length + b.length;
    const arr = [];

    for (let i = 0; i < step; i++) {
        if (a[i] && detect === 0) {
            arr.push(a[i]);
            a.splice(i, 1);
            step -= 1;
            detect = 1;
            i--;
        } else if (b[i] && detect === 1) {
            arr.push(b[i]);
            b.splice(i, 1);
            step -= 1;
            detect = 0;
            i--;
        } else if (!b[i]) {
            arr.push(a[i]);
        } else {
            arr.push(b[i]);
        }
    }
    return arr;
}

// [1, "a", 2, "b", 3, "c", 4, "d", 5, "e", 6, 7, 8]
console.log(mergeArrays([1, 2, 3, 4, 5, 6, 7, 8], ['a', 'b', 'c', 'd', 'e']));

// [1, 'a', 2, 'b', 3, 'c', 'd', 'e', 'f']
console.log(mergeArrays([1, 2, 3], ['a', 'b', 'c', 'd', 'e', 'f']));

function mergeArrays2(a, b) {
    let step = a.length > b.length ? a.length : b.length;
    const arr = [];

    for (let i = 0; i < step; i++) {
        if (a.length >= i + 1) arr.push(a[i]);
        if (b.length >= i + 1) arr.push(b[i]);
    }
    return arr;
}

// [1, "a", 2, "b", 3, "c", 4, "d", 5, "e", 6, 7, 8]
console.log(mergeArrays2([1, 2, 3, 4, 5, 6, 7, 8], ['a', 'b', 'c', 'd', 'e']));

// [1, 'a', 2, 'b', 3, 'c', 'd', 'e', 'f']
console.log(mergeArrays2([1, 2, 3], ['a', 'b', 'c', 'd', 'e', 'f']));

function mergeArrays3(a, b) {
    let step = a.length < b.length ? a.length : b.length;
    const big = a.length > b.length ? a : b;
    const arr = [];

    for (let i = 0; i < step; i++) {
        arr.push(a[i]);
        arr.push(b[i]);
    }

    return [...arr, ...big.splice(step)];
}

// [1, "a", 2, "b", 3, "c", 4, "d", 5, "e", 6, 7, 8]
console.log(mergeArrays3([1, 2, 3, 4, 5, 6, 7, 8], ['a', 'b', 'c', 'd', 'e']));

// [1, 'a', 2, 'b', 3, 'c', 'd', 'e', 'f']
console.log(mergeArrays3([1, 2, 3], ['a', 'b', 'c', 'd', 'e', 'f']));

// * ==========================================================================
/*
Учитывая строку в качестве входных данных, переместите все ее гласные
(a, e, i, o, u, y) в конец строки в том же порядке
*/

function moveVowel(input) {
    let str = 'aeiouy';

    return [...input]
        .sort((a, b) => str.includes(a) - str.includes(b))
        .join('');
}

console.log(moveVowel('day')); // "day"
console.log(moveVowel('apple')); // "pplae"
console.log(moveVowel('peace')); // "pceae"
