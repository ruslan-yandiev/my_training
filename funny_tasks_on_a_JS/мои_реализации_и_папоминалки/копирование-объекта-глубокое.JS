const myObj = {
    level: () => console.log('level 1'),
    hi: console.log('Hi 1'),

    obj2: {
        level: () => console.log('level 2'),
        hi2: console.log('Hi 2'),

        'obj2-1': {
            level: () => console.log('level 2-1'),
            'hi2-1': console.log('Hi 2-1'),
        },

        'obj2-2': {
            level: () => console.log('level 2-2'),
            hi22: console.log('Hi 2-2'),
        },
    },
};

// console.log(myObj.obj2['obj2-2'].level());

function copy(obj) {
    let result = {};

    for (let key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            result[key] = copy(obj[key]);
        } else {
            result[key] = obj[key];
        }
    }

    return result;
}
console.log(myObj.obj2 === copy(myObj).obj2);

// ! глубокое копирование объекта (функции тоже копирует как совершенно новые)
console.log(myObj.level === JSON.parse(JSON.stringify(myObj)).level);
