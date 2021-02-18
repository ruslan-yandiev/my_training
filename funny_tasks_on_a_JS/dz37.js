let a = 5;
// ! сработают одинаково с задержкой в секундой
setTimeout(() => console.log(a), 1000);
setTimeout(console.log.bind(this, a), 1000);

// ========================================================================================================

// ! var b = 33 все равно что window.b = 33
var b = 33;
console.log(window.b); // 33

// ========================================================================================================

// ! переписать данный код на промисы:
const printSeconds = (number, callback) => {
    setTimeout(() => {
        console.log(`Прошло секунд ${number}`);
        callback();
    }, 1000);
};

printSeconds(1, () => {
    printSeconds(2, () => {
        printSeconds(3, () => {});
    });
});
// мой вариант
new Promise(function (resolve, reject) {
    let time = 0;

    resolve(function (number) {
        setTimeout(
            () => console.log(`Прошло секунд ${number}`),
            (time += 1000),
        );
    });
})
    .then((result) => {
        result(1);
        return result;
    })
    .then((result) => {
        result(2);
        return result;
    })
    .then((result) => {
        result(3);
        return result;
    });

// еще вариант
const printSeconds2 = (number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Прошло секунд ${number}`);
            resolve();
        }, 1000);
    });
};

printSeconds2(1)
    .then(() => {
        return printSeconds2(2);
    })
    .then(() => {
        return printSeconds2(3);
    });

// комбо
const printSeconds = (number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Прошло секунд ${number}`);
            resolve();
        }, 1000);
    });
};
(async function () {
    await printSeconds(1);
    await printSeconds(2);
    await printSeconds(3);
})();

// такой вариант
async function printSeconds() {
    let time = 0;
    return function (number) {
        setTimeout(() => {
            console.log(`Прошло секунд ${number}`);
        }, (time += 1000));
    };
}
(async function () {
    const start = await printSeconds();
    start(1);
    start(2);
    start(3);
})();

// ==============================================================================================

/*
В функцию findIndex передается число и отсортированный по возрастанию массив.
Функция должна вернуть сумму двух индексов массива, элементы которых в сумме
дают число переданное первым аргументом.
*/

// сложность алгоритма O(n ^ 2) константы на подобии (n - 1) не берем в расчет
function findIndexSum(val, arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === val) return i + j;
        }
    }
    return -1;
}

const arr = [2, 5, 8, 9, 22, 57, 94, 100, 127, 198, 345, 451];
console.log(findIndexSum(79, arr)); // 4 + 5 -> 9
console.log(findIndexSum(70, arr)); // -1

// будет работать только с отсортированными массивами
function findIndexSum(val, arr) {
    let left = 0,
        right = arr.length - 1;

    while (left !== right) {
        if (arr[left] + arr[right] > val) right--;
        else if (arr[left] + arr[right] < val) left++;
        else return left + right;
    }

    return -1;
}

const arr = [2, 5, 8, 9, 22, 57, 94, 100, 127, 198, 345, 451];
console.log(findIndexSum(79, arr)); // 4 + 5 -> 9
console.log(findIndexSum(70, arr)); // -1

// =============================================================================================================

/**
 * Прислал Дмитрий Кутыршин
 *
 * Returns the rectangle object with width and height parameters and
 * getArea() method.
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;

    // ! Функция(объект) будет создаваться для каждого экземпляра этого класса своя, пусть и стем же названием и кодом
    this.getArea = () => {
        return this.width * this.height;
    };
}

const r = new Rectangle(10, 20);
console.log(r.width); // 10
console.log(r.height); // 20
console.log(r.getArea()); // 200

// * Равносильно:
function Rectangle(width, height) {
    Rectangle.prototype.width = width;
    Rectangle.prototype.height = height;

    // ! каждый раз будет класть нофую функцию(объект) в  Rectangle.prototype (затратно)
    Rectangle.prototype.getArea = () => {
        return this.width * this.height;
    };
}

const r = new Rectangle(10, 20);
console.log(r.width); // 10
console.log(r.height); // 20
console.log(r.getArea()); // 200

// * Или равносильно:
function Rectangle() {}

Rectangle.prototype.width = 10;
Rectangle.prototype.height = 20;

// ! Функция(объект) будет общий(один) для всех экземпляров класса Rectangle (экономит память например если будет 1000 экземпляров)
Rectangle.prototype.getArea = function () {
    return this.width * this.height;
};

const r = new Rectangle();
console.log(r.width); // 10
console.log(r.height); // 20
console.log(r.getArea()); // 200
