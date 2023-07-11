// вывести факториал числа последовательно в качестве строки
function any(arr, callback) {
  let detect = false;

  for (let i = 0; i < arr.length; i++) {
    if (detect) return detect;
    detect = callback(arr[i], i);
  }

  return detect;
}

console.log(any([1, 2, 3, 4], (el, i) => el === 4));
/*
  5 * 4 = 20
  20 * 3 = 60
  60 * 2 = 120
  120 * 1 = 120
*/
// ========================================
