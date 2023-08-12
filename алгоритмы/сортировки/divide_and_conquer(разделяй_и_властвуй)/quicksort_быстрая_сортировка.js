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

// =======================================================================================================
// ! Варианты без затрат по памяти
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

// =======================================================================================================
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
  const pivotIndex = left + right > arr.length - 1 ? Math.floor(right + left / 2) : Math.floor(right - left / 2);
  sorting(arr, left, pivotIndex, right);

  return pivotIndex;
}

function sorting(arr, left, pivotIndex, right) {
  for (let i = left; i <= pivotIndex; i++) {
    if (arr[i] < arr[pivotIndex]) continue;

    for (j = right; j >= pivotIndex; j--) {
      if (arr[i] > arr[j]) [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}

console.log(quickSort([11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15]));
console.log(quickSort([5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0]));
console.log(quickSort([5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5]));
console.log(quickSort([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]));
console.log(quickSort([0, 1, 2, 3, -6, 14, 4, 5, 0, 1, -33, 2, 3, 4, 5]));
// ==================================================================================================
