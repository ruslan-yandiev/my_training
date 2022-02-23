/*
Напишите функцию cakes(recipe, ingredients), которая принимает рецепт (объект)
и доступные ингредиенты (также объект) и возвращает максимальное количество
пирожных, которое можно испечь (целое число). Для простоты не существует единиц
измерения количества (например, 1 фунт муки или 200 г сахара - это просто 1 или
200). Ингредиенты, которых нет в предметах, можно рассматривать как 0.
*/
// ! Самое быстрое математическое решение со сложностью алгоритма О(n)
function cakes(recipe, ingredients) {
    let result = Infinity;

    for (let key in recipe) {
        if (ingredients[key] && ingredients[key] >= recipe[key]) {
            result > Math.floor(ingredients[key] / recipe[key]) ? result = Math.floor(ingredients[key] / recipe[key]) : false;
        } else {
            return 0;
        }
    }

    return result;
}

console.log(cakes(
  {flour: 500, sugar: 200, eggs: 1},
  {flour: 1200, sugar: 1200, eggs: 5, milk: 200})
); // 2

console.log(cakes(
  {apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100},
  {sugar: 500, flour: 2000, milk: 2000})
); // 0


function cakes(recipe, ingredients) {
    let result = 0;

    for (let key in recipe) {
        if (ingredients[key] && ingredients[key] >= recipe[key]) {
            ingredients[key] -= recipe[key];
        } else {
            return result;
        }
    }

    result += 1;
    return result + cakes(recipe, ingredients);
}

console.log(cakes(
  {flour: 500, sugar: 200, eggs: 1},
  {flour: 1200, sugar: 1200, eggs: 5, milk: 200})
); // 2

console.log(cakes(
  {apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100},
  {sugar: 500, flour: 2000, milk: 2000})
); // 0


function cakes(recipe, ingredients) {
    let result = 0;
    
    function start() {
        for (key in recipe) {
            if (!ingredients[key] || ingredients[key] < recipe[key]) return result;
            ingredients[key] -= recipe[key];
        }
        result += 1;
        return start();
    }

    return start();
}

console.log(cakes(
  {flour: 500, sugar: 200, eggs: 1},
  {flour: 1200, sugar: 1200, eggs: 5, milk: 200})
); // 2

console.log(cakes(
  {apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100},
  {sugar: 500, flour: 2000, milk: 2000})
); // 0

// * ==========================================================================
/*
В функцию restoreString передается строка и массив положительных целых чисел, 
необходимо реализовать функцию так, чтобы она возвращала новую строку, в которой
будут содержаться те же самые буквы, что и в переданной строке, но в другой
последовательности, последовательность указана в массиве arr в виде индексов 
букв str.
*/
function restoreString(str, arr) {
    return arr.reduce((acc, el) => acc + str[el], '');
}

console.log(restoreString("домик", [4, 1, 0, 3, 2])); // кодим
console.log(restoreString("украл", [1, 4, 3, 2, 0])); // клару

function restoreString(str, arr) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        result[i] = str[arr[i]];
    }
    return result.join('');
}

console.log(restoreString("домик", [4, 1, 0, 3, 2])); // кодим
console.log(restoreString("украл", [1, 4, 3, 2, 0])); // клару

function restoreString2(str, arr) {
    return arr.reduce((accum, elem, index) => accum + str[arr[index]], '');
}

console.log(restoreString2("домик", [4, 1, 0, 3, 2])); // кодим
console.log(restoreString2("украл", [1, 4, 3, 2, 0])); // клару


// * ===========================================================================
const f = (a, ...b) => b.join(a);
console.log(f('*', '55', 'привет', 'убубубу'));

const createString = (r, ...args) => args.reduce((acc, el, index) => args[index + 1] ? acc + el + r :  acc + el, '');
console.log(createString('*', '55', 'привет', 'убубубу')); // 55*привет*Убубубу
// * ==========================================================================
/*
Реализовать методы, которые в процессе выполнения строки (2).plus(3).minus(1) 
дали бы на выходе 4.
*/
Number.prototype.plus = function (num) {
    return +this + num;
}

Number.prototype.minus = function (num) {
    return +this - num;
}

// ! если написать 2.plus(3).minus(1) будет ошибка так как js думает, что после числа 2 идет точка не вызова функции
// ! а точка после которой должны идити цифры дроби 2.5 исправить косяк можно скобками или после точки поставить еще точку
// ! (2).plus(3).minus(1) или 2..plus(3).minus(1)
// * нужно отметить, что () создают некий объект обертку и имеют самый высокий приоритет в таблице приоритетов JS
console.log((2).plus(3).minus(1)); // 4


// * =========================================================================
/*
Почему в консоли будет цифра
Ответ: Число которое мы получаем является идентификатором, по которому можно будет прервать выполнение функции
*/
function a(h) {
    return `Дядя ${h}`
}
console.log(setTimeout(() => a('Дима'), 1000));
