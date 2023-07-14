// ! временная сложность алгоритма O(n log n)
function qSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const mid = arr[Math.floor(Math.random() * arr.length)];
  const min = arr.filter((el) => el < mid);
  const max = arr.filter((el) => el > mid);

  return [...qSort(min), mid, ...qSort(max)];
}

console.log(qSort([4, 8, 15, 1, 0, 11, 3, 6, 22, 1, 4, 8, 15]));
