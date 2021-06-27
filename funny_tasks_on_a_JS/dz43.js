/*
Необходимо реализовать printUser так, чтоб код ниже работал и выводил верный результат.
Код ниже менять нельзя.
*/
const printer = printUser`Пользователь ${'fullName'}, возраст: ${'age'}`;
// Доделать
function printUser(...arr) {
    return function (obj) {
        return `${arr[0][0]} ${obj.name} ${obj.surname}${arr[0][1]} ${obj.age} год`;
    };
}

const user1 = { name: 'Павел', surname: 'Тарасов', age: 31 };
// Пользователь Павел Тарасов, возраст: 31 год
console.log(printer(user1));

const user2 = { name: 'Антон', age: 20 };
// Пользователь Антон, возраст: 20 лет
console.log(printer(user2));

const user3 = { name: 'Иван', surname: 'Иванов', age: 44 };
// Пользователь Иван Иванов, возраст: 44 года
console.log(printer(user3));

/*
Прислал Purflix

На вход подается число value и n - количество знаков после запятой. 
Необходимо привести число к n знаков после запятой. 
Функция normalize должна возвращать строку.
*/
const normalize = (value, n) => {
    return value.toFixed(n);
};

console.log(normalize(3.1415, 2)); // 3.14
console.log(normalize(0.5, 2)); // 0.50
console.log(normalize(2021, 0)); // 2021
console.log(normalize(0, 3)); // 0.000
console.log(normalize(1.1, 1)); // 1.1

// ===========================================================
/*
Прислал: yurec ~, задача с собеседования.

Один покупатель старинных уникальных часов хочет приобрести для музея 
двое часов. В магазине у хозяйки есть n разных часов с соответствующими 
ценами [p1, ..., pn]. Покупатель хочет полностью использовать свой 
бюджет. Необходимо выяснить получится ли это.
*/
function f(clockArr, money) {
    const set = new Set();

    for (let i of clockArr) {
        if (set.has(Number((money - i).toFixed(2)))) return true;
        set.add(Number(i.toFixed(2)));
    }

    return false;
}

console.log(f([8.74, 3.12, 9.5, 2.35], 2.35)); // false
console.log(f([1.1, 4.2, 7.5, 0.4], 8.4)); // false
console.log(f([54.1, 20.0, 18.51, 97.75, 35.2, 76.42], 89.3)); // true
