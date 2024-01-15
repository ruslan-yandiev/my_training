function func(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
    }
  }

  return arr;
}

console.log(func([14, -44, 1, -33, 2, 11, 2, 14, -4, 5, 2, 0]));
