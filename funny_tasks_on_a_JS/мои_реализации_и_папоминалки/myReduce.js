Array.prototype.myReduce = function (callback, initialValue = this[0]) {
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`);
    // if (typeof callback !== 'function') throw new Error(`${callback} is not a function`);
    let startIndex = initialValue === this[0] ? 1 : 0;

    for (let i = startIndex, size = this.length; i < size; i++) {
        initialValue = callback(initialValue, this[i], i, this);
    }

    return initialValue;
};

console.log(
    [1, 2, 3, 4, 5].myReduce((acc, elem, index, arr) => {
        if (index % 2) {
            return acc + elem;
        }
        return acc;
    }, 0),
); // => 6

console.log(
    [1, 2, 3, 4, 5].myReduce((acc, elem, index, arr) => {
        if (index % 2) {
            acc.push(elem, arr[index + 1]);
        }
        return acc;
    }, []),
); // => [2, 3, 4, 5]
