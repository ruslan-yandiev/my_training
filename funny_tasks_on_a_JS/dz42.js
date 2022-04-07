/*
Бэкенд еще не готов и вам необходимо написать генератор установочных
данных лиц (Фамилия, Имя, Отчество, Дата рожденья).
Возраст лиц должен быть от 18 до 50 лет.
В ходе разработки понадобится две функции.
1. getRandomPers()  - должна вернуть объект с установочными данными
одного лица, пол лица так же выбирается случайно.
2. getNRandomPers(n) - должна вернуть объект из N случайно
сгенерированных лиц в следующем виде {count : n, pers : [....]}
*/
const ManIM = ['Андрей', 'Борис', 'Егор', 'Валерий', 'Петр'];
const WomanIM = ['Алла', 'Виктория', 'Татьяна', 'Марина', 'Яна'];

const ManFM = ['Князев', 'Самойлов', 'Кипелов', 'Васильев', 'Шевчук'];
const WomanFM = ['Звягинцева', 'Волкова', 'Гусева', 'Наливкина', 'Дроздова'];

const ManOT = ['Анатольевич', 'Иванович', 'Петрович', 'Григорьевич', 'Дмитриевич'];
const WomanOT = ['Анатольевна', 'Ивановна', 'Петровна', 'Григорьевна', 'Дмитриевна'];

function getRandomPers() {
    const M = [ManFM, ManIM, ManOT];
    const W = [WomanFM, WomanIM, WomanOT];

    // Случайное целое число в диапазоне, включая минимальное и максимальное.
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    function randomDate(date1, date2) {
        let d = new Date();
        let year50 = d.setFullYear(d.getFullYear() - 50);
        d = new Date();
        let year18 = d.setFullYear(d.getFullYear() - 18);
        return new Date(rand(year50, year18)).toLocaleDateString('ru');
    }

    function createPers(num) {
        let marker = ['FM', 'IM', 'OT'];
        let arr = num === 0 ? M : W;
        let obj = arr.reduce((obj, el, i) => {
            obj[marker[i]] = el[rand(0, el.length - 1)];
            return obj;
        }, {});

        obj.DR = randomDate();
        return obj;
    }

    return createPers(rand(0, 1));
}

function getNRandomPers(n) {
    const obj = { count: n };
    const arr = [];

    for (let i = 0; i < n; i++) arr.push(getRandomPers());

    obj.pers = arr;

    return obj;
}

// {FM : 'ИВАНОВ', IM : 'ИВАН', OT: 'ИВАНОВИЧ', DR: '21.05.1985'}
console.log(getRandomPers());

// {count : n, pers : [pers1, pers2, ..., persN]}
console.log(getNRandomPers(5));

// =====================================
class A {
    type = 'class';
    constructor() {
        return { type: 'object' };
    }
}

class B extends A {
    data = 'somedata';
    constructor() {
        super();
    }
}
console.log(new B()); // {data: 'somedata', type: 'object'}

// ========================================
/*
Прислал Andriy Oleksievets

Представьте что вы попали на собеседование в Гугл, так-вот у Гугла
очень крутая система защиты от взлома серверов. Каждый сервер
расположен на разном уровне от 0 к N, но не всё так просто чтобы
попасть на N уровень нужно пройти все N-1 уровней защиты. Ваша задача,
как собеседуемого, состоит в том чтобы получить все данные с i-го
уровня защиты.
*/
function getDataFromSecurityNumber(arr, floor) {
    return floor ? getDataFromSecurityNumber(arr.filter((el) => typeof el === 'object').flat(1), floor - 1) : arr.filter((el) => typeof el !== 'object')
}

const arr = [1, 2, 3, [4, 5], [6, [7]], [8, 9]];

console.log(getDataFromSecurityNumber(arr, 0)); // [1, 2, 3]
console.log(getDataFromSecurityNumber(arr, 1)); // [4, 5, 6, 8, 9]
console.log(getDataFromSecurityNumber(arr, 2)); // [7]
console.log(getDataFromSecurityNumber(arr, 3)); // []