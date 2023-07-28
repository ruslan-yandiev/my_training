function quickSort(arr) {
  return quickSortHelper(arr, 0, arr.length - 1);
}

function quickSortHelper(arr, left, right) {
  if (arr.length < 2) return arr;

  const index = partition(arr, left, right);

  if (left < index - 1) quickSortHelper(arr, left, index - 1);
  if (index < right) quickSortHelper(arr, index, right);

  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[Math.floor((left + right) / 2)];

  while (left <= right) {
    while (arr[left] < pivot) {
      left++;
    }

    while (arr[right] > pivot) {
      right--;
    }

    if (left <= right) {
      swap(arr, left, right);
      left++;
      right--;
    }
  }

  return left;
}

function swap(arr, i, j) {
  const item = arr[i];
  arr[i] = arr[j];
  arr[j] = item;
}

console.log(quickSort([11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15]));
console.log(quickSort([5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0]));
console.log(quickSort([5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5]));
console.log(quickSort([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]));
console.log(quickSort([0, 1, 2, 3, -6, 14, 4, 5, 0, 1, -33, 2, 3, 4, 5]));
