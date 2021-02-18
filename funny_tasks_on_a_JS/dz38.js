// ! преобразовать строку в чило:
// Number('4');
// Number.porseInt(); но только до целых чисел (он округлит)
// +'4'
// ! преобразовать в строку
// String(4)
// 4..toString();
// (4).toString();
// '' + 4;

// ===================================================================================
/*
! Задача с реального собеседования.

В функцию sumNumbers передается массив, содержащий все подряд (любые
типы данных). Необходимо реализовать функцию так, чтобы она вернула
среднее арифметическое всех элементов, которые могут быть нативно
представлены в javascript в виде числа, т.е. мы считаем значение, если
при прверащении в число, значение не является NaN.
*/
function sumNumbers(arr) {
    let step = 0,
        sum = 0;

    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'symbol' && !Number.isNaN(Number(arr[i]))) {
            step += 1;
            sum += Number(arr[i]);
        }
    }

    return sum / step;
}

console.log(sumNumbers([1, '9', NaN, 9.5, true, 'WebInterview', Symbol('5'), null, 5n, undefined, { a: 5 }, () => 100])); // 4.25

// ==================================================================
/*
Прислал Владислав Аткишкин

На вход нам приходит url товара из магазина.
Все URL-адреса имеют одинаковый формат, сначала это домен exampleshop.com,
затем у нас есть название продукта, разделенное тире (-), после чего есть буква
p, указывающая начало идентификатора продукта, после которого следует
фактический идентификатор (без ограничения по длине) и, наконец, 8-значное
представление даты добавления товара, за которым следует .html.

Необходимо получить идентификатор продукта (см. примеры).
*/
function getProductId(url) {
    for (let i = url.length; i > 0; i--) {
        if (url[i - 1] === '-' && url[i - 2] === 'p') {
            return Number.parseInt(url.substring(i));
        }
    }
}

console.log(getProductId('exampleshop.com/fancy-coffee-cup-p-90764-12052019.html')); // 90764
console.log(getProductId('exampleshop.com/c-3-p-0-p-654-11112011.html')); // 654

// еще более простой вариант:
function getProductId(url) {
    const arr = url.split('-');
    return arr[arr.length - 2];
}

console.log(getProductId('exampleshop.com/fancy-coffee-cup-p-90764-12052019.html')); // 90764
console.log(getProductId('exampleshop.com/c-3-p-0-p-654-11112011.html')); // 654
