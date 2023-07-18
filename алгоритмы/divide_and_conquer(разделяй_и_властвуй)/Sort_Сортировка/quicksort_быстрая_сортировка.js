// ! временная сложность алгоритма O(n log n) или (log n * n) (log n ^ 2)
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];
  const min = [];
  const max = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;
    arr[i] < pivot ? min.push(arr[i]) : max.push(arr[i]);
  }

  return [...quickSort(min), pivot, ...quickSort(max)];
}

console.log(quickSort([11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15, 11, 11, 11, 11]));
