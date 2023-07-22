function quickSort(arr) {
  let mid = Math.floor(arr.length / 2);
  let pivotIndex = mid;
  let rightIndex = arr.length - 1;
  let leftIndex = 0;
  let d = 0;

  for (; mid < arr.length; ) {
    for (; pivotIndex > 0; ) {
      for (let i = leftIndex; i <= pivotIndex; i++) {
        if (arr[i] < arr[pivotIndex]) continue;

        for (j = rightIndex; j >= pivotIndex; j--) {
          if (arr[i] > arr[j]) [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }

      rightIndex = pivotIndex;
      pivotIndex = Math.floor(pivotIndex / 2);
    }

    d += 2;
    leftIndex = mid;
    mid = mid + Math.floor(mid / d);
    pivotIndex = mid;
    rightIndex = arr.length - 1;
  }

  return arr;
}

console.log(quickSort([11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15]));
console.log(quickSort([5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0]));
[];
console.log(quickSort([5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5]));
console.log(quickSort([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]));
