// ! Сортировка вставками

let arr = [4, 4, 3, 1, 5, 6, 3, 15, 8, 0, -1, -3, -2];

function f1(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let a = i; arr[a - 1] > arr[a]; a--) {
            [arr[a - 1], arr[a]] = [arr[a], arr[a - 1]];
        }
    }

    return arr;
}

console.log(f1(arr));

// function insertSort(a) {
//     for (var sortedN = 1; sortedN < a.length; sortedN++) {
//         for (var i = sortedN; i > 0 && a[i] < a[i - 1]; i--) {
//             [a[i - 1], a[i]] = [a[i], a[i - 1]];
//         }
//     }

//     return a;
// }

// console.log(insertSort(arr));
