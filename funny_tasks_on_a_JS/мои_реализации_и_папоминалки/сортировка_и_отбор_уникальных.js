const arr = [55, 13, 55, 88, 1, 1, 1, 2, 2, 3, 88, 88, 99];

function func(arr) {
  arr.sort((a, b) => a - b);
  let index = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[index] !== arr[i]) {
      index++;
      arr[index] = arr[i];
    }
  }

  return arr.slice(0, index + 1);
}

console.log(func(arr));

// уберет дубликаты и отсортирует
function qSortNotDublicut(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pivot = arr[Math.floor(Math.random() * arr.length)];
  const min = arr.filter((el) => el < pivot);
  const max = arr.filter((el) => el > pivot);

  return [...qSortNotDublicut(min), pivot, ...qSortNotDublicut(max)];
}

console.log(qSortNotDublicut([11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15, 11, 11, 11, 11]));
