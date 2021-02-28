Array.prototype.myMap = function (f) {
    if (typeof f === 'function') {
        let result = [];

        for (let i = 0; i < this.length; i++) {
            result.push(f(this[i], i, this));
        }

        return result;
    }
};

console.log([1, 2, 3, 4, 5].myMap((elem, index, arr) => elem + index));

console.log([1, 2, 3, 4, 5].map((elem, index, arr) => elem + index));
