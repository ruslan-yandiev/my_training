/*
Дан массив строк arr.
Требуется написать функцию, которая принимает произвольную строку.
Функция должна проверить, существует ли как минимум два значения в
массиве, которые являются анаграммами к переданной в функцию строке,
если такие строки существуют, тогда функция должна вернуть первую
встретившуюся в массиве строку-анаграмму.
В случае если анаграмм в массиве менее 2, необходимо вернуть null.
*/
const arr = ['linkkk1', 'k1nkil', 'asfd', 'asd', 'dsa', '1nkil', 'asd', 'fhk', 'lfd', 'link', 'link1', 'linkk1'];

const getFirstAnagram = (str) => {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let detect = 0;

        for (let j = 0; j < str.length; j++) {
            if (arr[i].length === str.length && arr[i].includes(str[j])) {
                detect += 1;
            }
        }

        if (detect === str.length) result.push(arr[i]);

        if (result.length > 1) return result[0];
    }

    return null;
};

console.log(getFirstAnagram('asd')); // "asd"
console.log(getFirstAnagram('link')); // null
console.log(getFirstAnagram('link1')); // "1nkil"
console.log(getFirstAnagram('linkk1')); // "k1nkil"
console.log(getFirstAnagram('linkkk1')); // "null"
console.log('===================================');

const getFirstAnagram2 = (str) => {
    let arr2 = arr.filter((el) => el.length === str.length);

    str = [...str].sort().join('');
    let index = arr2
        .map((elem) => [...elem].sort().join(''))
        .reduce((acc, elem, index) => {
            if (elem === str) {
                acc.push(index);
            }
            return acc;
        }, []);

    return index.length > 1 ? arr2[index[0]] : null;
};

console.log(getFirstAnagram2('asd')); // "asd"
console.log(getFirstAnagram2('link')); // null
console.log(getFirstAnagram2('link1')); // "1nkil"
console.log(getFirstAnagram2('linkk1')); // "k1nkil"
console.log(getFirstAnagram2('linkkk1')); // "null"
console.log('===================================');

/*
Представьте что вы попали на собеседование в Гугл, так-вот у Гугла
очень крутая система защиты от взлома серверов. Каждый сервер
расположен на разном уровне от 0 к N, но не всё так просто чтобы
попасть на N уровень нужно пройти все N-1 уровней защиты. Ваша задача,
как собеседуемого, состоит в том чтобы получить все данные с i-го
уровня защиты.
*/
function getDataFromSecurityNumber(arr, floor) {
    let result = [];

    if (floor === 0) {
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] === 'number') {
                result.push(arr[i]);
            }
        }
        return result;
    }

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result.push(getDataFromSecurityNumber(arr[i], floor - 1));
        }
    }

    return result.flat(Infinity);
}

const arr = [1, 2, 3, [4, 5], [6, [7]], [8, 9]];

console.log(getDataFromSecurityNumber(arr, 0)); // [1, 2, 3]
console.log(getDataFromSecurityNumber(arr, 1)); // [4, 5, 6, 8, 9]
console.log(getDataFromSecurityNumber(arr, 2)); // [7]
console.log(getDataFromSecurityNumber(arr, 3)); // []
