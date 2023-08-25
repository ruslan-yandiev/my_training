function quickSort(arr) {
  console.log(arr);
  if (arr.length > 1) {
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    quickSort(left);
    quickSort(right);

    let l = 0;
    let r = 0;
    let k = 0;

    while (l < left.length && r < right.length) {
      if (left[l] <= right[r]) {
        arr[k] = left[l];
        l++;
      } else {
        arr[k] = right[r];
        r++;
      }
      k++;
    }

    while (l < left[l]) {
      arr[k] = left[l];
      k++;
      l++;
    }

    while (r < right[r]) {
      arr[k] = right[r];
      r++;
      k++;
    }
  }
  console.log(arr);
  return arr;
}
console.log(quickSort([4, 3, 2, 1]));
// console.log(quickSort([11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15]));
// console.log(quickSort([5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0]));
// console.log(quickSort([5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5]));
// console.log(quickSort([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]));
// console.log(quickSort([0, 1, 2, 3, -6, 14, 4, 5, 0, 1, -33, 2, 3, 4, 5]));
