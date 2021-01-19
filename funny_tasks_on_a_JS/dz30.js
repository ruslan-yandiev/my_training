/*
Создайте функцию, которая получает (квадратную) матрицу и вычисляет сумму обеих
диагоналей (основной и дополнительной)
*/

function sum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) sum += arr[i][i] + arr[i][arr.length - 1 - i];
    return sum;
}

console.log(sum([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
])); // 30

console.log(sum([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
])); // 68

const sum2 = arr => arr.reduce((acc, el, i) => acc + el[i], arr.reduce((acc, el, i) => acc + el[arr.length - 1 - i], 0));

console.log(sum2([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
])); // 30

console.log(sum2([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
])); // 68

// * ====================================================================================
/*
Необходимо реализовать функцию spacey, которая принимает массив строк, а
возвращать должна массив с тем же колчиеством строк, только слепленных их всех
предыдущих значений вместе с текущим (см. примеры).
к созданию ['i', 'ihave', 'ihaveno', 'ihavenospace'].
*/

function spacey(arr) {
    const arr2 = [];
    let str = '';

    for (let i = 0; i < arr.length; i++) arr2.push(str += arr[i]);

    return arr2;
}

// ["я", "яОчень", "яОченьЛюблю", "яОченьЛюблюПрограммирование"]
console.log(spacey(["я", "Очень", "Люблю", "Программирование"]));

function spacey2(arr) {
    return arr.reduce((accum, elem, index) => {
        if (index === 0) accum.push(elem);
        if (index > 0) accum.push(accum[accum.length - 1] + elem);
        return accum;
    }, []);
}

// ["я", "яОчень", "яОченьЛюблю", "яОченьЛюблюПрограммирование"]
console.log(spacey2(["я", "Очень", "Люблю", "Программирование"]));

function spacey3(arr) {
    const arr2 = [];
    let str = '';

    function create(elem, index) {
        str += elem;
        arr2.push(str);

        return index === arr.length - 1 ? arr2 : create(arr[index + 1], index + 1);
    }

    return create(arr[0], 0);
}

// ["я", "яОчень", "яОченьЛюблю", "яОченьЛюблюПрограммирование"]
console.log(spacey3(["я", "Очень", "Люблю", "Программирование"]));