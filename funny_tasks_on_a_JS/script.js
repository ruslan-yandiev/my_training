/*
Задание с https://learn.javascript.ru/

Создайте декоратор spy(func), который должен возвращать обёртку,
которая сохраняет все вызовы функции в своём свойстве calls.
Каждый вызов должен сохраняться как массив аргументов.
*/
function spy(func) {}

function work(a, b) {
    console.log(a + b);
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
    console.log('call:' + args.join()); // "call:1,2", "call:4,5"
}
