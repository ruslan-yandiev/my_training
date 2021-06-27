Array.prototype.myForEach = function (callback) {
    for (let i = 0, size = this.length; i < size; i++) {
        if (i in this) callback(this[i], i, this);
    }
};

let arr;

arr = [1, 2, 3, 4];
arr.myForEach((val) => console.log(val)); // 1 2 3 4

arr = [1, 2, 3, 4];
arr.myForEach((val, idx, arr) => {
    console.log(val);
    if (idx === 1) {
        arr.shift();
    }
}); // 1 2 4

arr = [1, 2, 3, 4];
arr.myForEach((val, idx, arr) => {
    if (idx === 1) {
        arr.splice(idx + 1, 0, 'Hello');
    }

    console.log(val);
}); // 1 2 Hello 3
