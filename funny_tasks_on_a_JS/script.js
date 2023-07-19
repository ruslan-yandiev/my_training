function quickSort(arr) {
  const mid = Math.floor(arr.length / 2);
  let pivotIndex = mid;
  let rightIndex = arr.length - 1;
  let leftIndex = 0;

  for (; pivotIndex > 0; ) {
    for (let i = leftIndex; i <= pivotIndex; i++) {
      if (arr[i] < pivotIndex) continue;

      for (j = pivotIndex; j < rightIndex; j++) {
        if (arr[i] > arr[j]) [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    rightIndex = pivotIndex;
    pivotIndex = Math.floor(pivotIndex / 2);
  }

  return arr;
}

console.log(quickSort([11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15]));
