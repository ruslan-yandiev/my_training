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
