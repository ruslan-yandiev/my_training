/*
Напишите функцию, persistenceкоторая принимает положительный параметр numи возвращает его мультипликативную постоянство, то есть количество раз, которое вы должны умножить цифры, numпока не дойдете до единственной цифры.

Например:

 persistence(39) === 3 // because 3*9 = 27, 2*7 = 14, 1*4=4
                       // and 4 has only one digit

 persistence(999) === 4 // because 9*9*9 = 729, 7*2*9 = 126,
                        // 1*2*6 = 12, and finally 1*2 = 2
 persistence(4) === 0 // because 4 is already a one-digit number
*/

function f(num) {
    let step = 0;

    function f2(n) {
        if (n < 10) return step;
        let accum = 1;
        const arr = [...n.toString()];

        for (let i = 0; i < arr.length; i++) {
            accum *= +arr[i];
        }

        step += 1;

        return f2(accum);
    }

    return f2(num);
}

console.log(f(999));
// =====================
const persistence = (num) => {
    return `${num}`.length > 1 ? 1 + persistence(`${num}`.split('').reduce((a, b) => a * +b)) : 0;
};
// ===========
function persistence(num) {
    for (var i = 0; num > 9; i++) {
        num = num
            .toString()
            .split('')
            .reduce((t, c) => c * t);
    }
    return i;
}
// ================================
function persistence(num) {
    var times = 0;

    num = num.toString();

    while (num.length > 1) {
        times++;
        num = num
            .split('')
            .map(Number)
            .reduce((a, b) => a * b)
            .toString();
    }

    return times;
}
