// * Деструтурирование массива: =============================================

let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];

console.log('a', ...arr1, 'b', ...arr2); // a 1 2 3 b 1 2 3
console.log(['a', ...arr1, 'b', ...arr2]); //[ "a", 1, 2, 3, "b", 1, 2, 3 ]

const fib = [1, 1, 2, 3, 5, 8, 13];
const [a1, b1, c1, , , , , d1 = 'параметр по умолчанию'] = fib; //
console.log(a1, b1, c1, d1); // 1 1 2 параметр по умолчанию
const [, a2, , b2] = fib; // достаем значение через один или более шагов
console.log(a2, b2); //1 3

const line = [
    [10, 17],
    [14, 7],
];
const [[p1x, p1y], [p2x, p2y]] = line;
console.log(p1x, p1y, p2x, p2y); // 10 17 14 7

const men = ['ruslan,', 'sultan', 'moohamed'];
const [men1, ...othersMen] = men;
console.log(men1, othersMen); // ruslan, [ "sultan", "moohamed" ]

const dict = {
    duck: 'quack',
    dog: 'wuff',
    mouse: 'squeak',
    hamster: 'squeak',
};

const res = Object.entries(dict)
    .filter(([, value]) => value === 'squeak')
    .map(([key]) => key);
console.log(res); // [ "mouse", "hamster" ]

// * Деструтурирование просто объекта =======================================
let obj1 = { a: 1, b: 2, c: 3 };
let obj2 = { d: 4, e: 5, f: 6 };
let obj = { ...obj1, ...obj2 };

console.log(obj); // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }

let obj3 = { d: 0, e: 0, f: 0 };

console.log({ ...obj, ...obj3 }); // { a: 1, b: 2, c: 3, d: 0, e: 0, f: 0 }

const { a, ...other } = obj1; // в а констатту запишим знаяение свойства а, в константу other создадим объект и запишем остальные свойства из объекта obj1 за исключением свойства а
console.log(a, other); // 1 { b: 2, c: 3 }

const person = {
    firstName: 'Ruslan',
    lastName: 'Yandiev',
    age: 35,
};

// const firstName = person.firstName;
// const lastName = person.lastName;
const { firstName, lastName } = person;
console.log(firstName, lastName); // Ruslan Yandiev

const person2 = {
    name: {
        first: 'Ruslan',
        last: 'Yandiev',
    },

    age: 35,
};

const {
    name: { first, last },
} = person2;
console.log(first, last); // Ruslan Yandiev

const {
    name: { first: firstName2, last: lastName2 },
} = person2;
console.log(firstName2, lastName2); // Ruslan Yandiev

// const role = person.role || 'user';
// console.log(role);
// const role = person.role ?? 'user'; // коректно работает с 0 и "" не преобразуя их в false
// console.log(role);
// извлечние значений с установкой значения по умолчанию
const { role = 'user' } = person; // извлечь значение свойства role, если такого нет то создать константу role со значением 'user'
console.log(role); // "user"

const { permissions: { role2 = 'user2' } = {} } = person; // если нужно извлечь вложенные данные установив дефолтное значение
console.log(role2); // 'user2

// укажем функции параметры по умолчанию через диструктурирование объекта, при получении функцией в аргументы объекта
// {....} = {} так мы делаем, чтобы не возникала ошибка если объект для диструктурирования не был, тогда он будет использовать наш пустой объект для дефолтной деструктуризации и не возникнет ошибки
function connect(a, { host = 'localhost', port = 3000, user = 'Ruslan' } = {}) {
    console.log(a, 'user:', user, 'port:', port, 'host:', host);
}
connect('Как в Ruby.', { port: 1111 }); // Как в Ruby. user: Ruslan port: 1111 host: localhost

// ! Комбинированный способ диструктурирования объекта и массива
const shape = {
    type: 'segment',
    coordinates: {
        start: [10, 15],
        end: [17, 15],
    },
};

const {
    coordinates: {
        start: [startX, startY],
        end: [endX, endY],
    },
} = shape;

console.log(startX, startY, endX, endY); // 10 15 17 15
