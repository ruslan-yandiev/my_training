// ! Сортировка пузырьком

// let arr = [4, 2, 8, 2, 2, 2, 3, 1, 55, 6, 6, 12, 3];
// let i = 0;
// let a = null;
// let b = null;
// let c = 0;

// while (c < arr.length - 1) {
//     c = 0;

//     if (arr[i] > arr[i + 1]) {
//         a = arr[i];
//         b = arr[i + 1];
//         arr[i + 1] = a;
//         arr[i] = b;
//     }

//     i = i + 1;

//     if (i === arr.length - 1) {
//         i = 0;
//     }

//     for (let ii = 0; ii < arr.length - 1; ii++) {
//         if (arr[ii] < arr[ii + 1] || arr[ii] === arr[ii + 1]) {
//             c = c + 1;
//         }
//     }
// }

// console.log(arr);

// ===========================================================================
function f(arr) {
  let bull;

  do {
    bull = false;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i + 1]) {
        bull = true;
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  } while (bull);

  return arr;
}

let arr = [23, 12, 33, -11, 0, 0, -11, -3, 44, 1];
console.log(f(arr));

let arr2 = [4, 2, 8, 2, 2, 2, 3, 1, 55, 6, 6, 12, 3];

function bubbleSort(a) {
  let swapped;

  do {
    swapped = false;

    for (let i = 0, c = a.length - 1; i < c; i++) {
      if (a[i] > a[i + 1]) {
        // * более краткий способ произвести замену значений из ES6
        [a[i], a[i + 1]] = [a[i + 1], a[i]];

        swapped = true;
      }
    }
  } while (swapped);

  return a;
}

console.log(bubbleSort(arr2));
