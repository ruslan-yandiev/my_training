// ! Мнемоизация (кеширование результата выполнения функции)
/*
    Мемоизация - это сохранение уже вычисленных значений. 
    Когда функция повторно вызывается с теми же аргументами, 
    она должна вернуть готовое значение, не выполняя повторных вычислений. 
    var calc = (function () { var results = {};
*/
function mn(f) {
    const results = {}; // лучше с Map

    return function (arg) {
        if (results[arg]) {
            console.log('Результат из Кэша');
            return results[arg];
        }

        const result = f.call(this, arg);
        results[arg] = result;
        console.log('Закешированно');

        return result;
    };
}

function sum(arg) {
    return arg + arg;
}

const mySum = mn(sum);

console.log(mySum(10)); // Вернуть 10 и закешировать
console.log(mySum(20)); // Вернуть 20 и закешировать
console.log(mySum(20)); // Извлечет из кеша 20
