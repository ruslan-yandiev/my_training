Array.prototype.myMap = function (callback) {
    if (typeof callback === 'function') {
        let result = [];

        for (let i = 0; i < this.length; i++) {
            result.push(callback(this[i], i, this));
        }

        return result;
    }
};

console.log([1, 2, 3, 4, 5].myMap((elem, index, arr) => elem + index));

console.log([1, 2, 3, 4, 5].map((elem, index, arr) => elem + index));
