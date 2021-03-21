// Метод
Function.prototype.myBind1 = function (context, ...argum) {
    // ! либо стрелочная так-как у нее нет своего свойства this, и берет чужой, внешний всегда
    return (...args) => {
        this.apply(context, argum.concat(args));
    };

    // ! иначе обычную функцию и декларативную придется передать this через переменную, так-как у них они свойство this свое и переназначится только в месте вызова.
    // let a = this;
    // return function (...args) {
    //     a.call(context, ...argum.concat(args));
    // };
};

// Функция
function myBind2(f, context, ...argum) {
    return function (...args) {
        f.call(context, ...[...argum, ...args]);
    };
}

function func(a, b, c, d) {
    console.log(this, a, b, c, d);
}

const person = {
    name: 'Андрей',
};

func.myBind1(person, 'Ruslan')(5, 4, 3);
myBind2(func, person, 'Ruslan')(5, 4, 3);

// ===================
const bind3 = (fn, context, ...rest) => {
    return (...args) => {
        const uniqId = Date.now().toString();

        context[uniqId] = fn;

        //  concat объединяет массивы
        const result = context[uniqId](...rest.concat(args));

        delete context[uniqId];

        return result;
    };
};
// Пример:
function greeting2(greeting, punctuation) {
    return `${greeting} ${this.userName}${punctuation}`;
}

const alex2 = { userName: 'Alex2' };
const alexBound2 = bind2(greeting2, alex2);

console.log(alexBound2('Hello', '!')); // 'Hello Alex2!'
