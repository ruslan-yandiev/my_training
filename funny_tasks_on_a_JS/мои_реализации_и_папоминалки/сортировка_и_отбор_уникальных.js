const arr = [55, 13, 55, 88, 1, 1, 1, 2, 2, 3, 88, 88, 99]

function func(arr) {
    arr.sort((a, b) => a - b)
    let index = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[index] !== arr[i]) {
            index++
            arr[index] = arr[i]
        }
    }

    return arr.slice(0, index + 1);
}

console.log(func(arr));