// ! Сложность бинарного поиска O(log n):

/*
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
найти 2
Делим массив пополам и смотрим [1, 2, 3, 4]. Отбрасываем => [5, 6, 7, 8]
делим снова [1, 2]. Отбрасываем => [3, 4]
делим снова [2]. Отбрасываем [1]
Логорифмическая сложность поиска
*/
function myFind(arr, num) {
    if (arr.length > 1) {
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        return num > left[left.length - 1] ? myFind(right, num) : myFind(left, num);
    }

    return arr[0];
}

console.log(myFind([1, 2, 3, 4, 5, 6, 7, 8], 2));

//* ==========================================================================================
/*
  Вернуть true если такое число есть в массиве и false если нет
*/
function myFind(arr, num) {
  if (arr.length > 1) {
      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);

      return num > left[left.length - 1] ? myFind(right, num) : myFind(left, num);
  }

  return arr[0] === num;
}

console.log(myFind([1, 2, 3, 4, 5, 6, 7, 8], 7));


//* ==========================================================================================

/*
### Простой поиск

Напишите функцию, которая принимает отсортированный массив с числами и число. 
Необходимо вернуть индекс числа, если оно есть в массиве. Иначе вернуть `-1`.

**Input**: Number[], Number

**Output**: Number
*/
// O(log n) - Рекурсивно
function search(array, target) {
  function myFind(arr, index) {
    if (arr.length > 1) {
      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);

      return target > left[left.length - 1] ? myFind(right, index + left.length) : myFind(left, index - right.length);
    }

    return index;
  }

  let index = Math.floor(myFind(array, array.length) / 2);

  return array[index] === target ? index : -1;
}
  
console.log(search([1, 3, 6, 13, 17], 13)) // -> 3
console.log(search([1, 3, 6, 13, 17, 22, 25, 30], 3)) // -> 1
console.log(search([1, 3, 6, 13, 17, 22, 25, 30], 17)) // -> 4
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 25)) // -> 7
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 3)) // -> 1
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 22)) // -> 6
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 1)) // -> 0
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 30)) // -> 8
console.log(search([1, 3, 6, 13, 17, 22, 25, 30], 6)) // -> 2
console.log(search([1, 3, 6, 13, 17], 12)) // -> -1
console.log(search([1, 3, 6, 13, 17], 3)) // -> 1
console.log(search([1, 3, 6, 13, 17], 6)) // - > 2


// O(log n) - Через цикл
function search(array, target) {
  let index = array.length;
  let arr = [...array];

  while(arr.length > 1) {
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    if (target > left[left.length - 1]) {
      arr = right;
      index += left.length;
    } else {
      arr = left;
      index -= right.length;
    }
  }

  index = Math.floor(index / 2)

  return array[index] === target ? index : -1;
}

console.log(search([1, 3, 6, 13, 17], 13)) // -> 3
console.log(search([1, 3, 6, 13, 17, 22, 25, 30], 3)) // -> 1
console.log(search([1, 3, 6, 13, 17, 22, 25, 30], 17)) // -> 4
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 25)) // -> 7
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 3)) // -> 1
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 22)) // -> 6
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 1)) // -> 0
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 30)) // -> 8
console.log(search([1, 3, 6, 13, 17, 22, 25, 30], 6)) // -> 2
console.log(search([1, 3, 6, 13, 17], 12)) // -> -1
console.log(search([1, 3, 6, 13, 17], 3)) // -> 1
console.log(search([1, 3, 6, 13, 17], 6)) // - > 2


// O(log n)
function search(array, target) {
  let start = 0
  let end = array.length - 1

  if (target < array[start] || target > array[end]) {
    return -1
  }

  while (true) {
    if (target === array[start]) {
      return start
    }

    if (target === array[end]) {
      return end
    }

    if (end - start <= 1) {
      return -1
    }

    const middle = Math.floor((start + end) / 2)

    if (target > array[middle]) {
      start = middle + 1
    } else if (target < array[middle]) {
      end = middle - 1
    } else {
      return middle
    }
  }
}

console.log(search([1, 3, 6, 13, 17], 13)) // -> 3
console.log(search([1, 3, 6, 13, 17, 22, 25, 30], 3)) // -> 1
console.log(search([1, 3, 6, 13, 17, 22, 25, 30], 17)) // -> 4
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 25)) // -> 7
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 3)) // -> 1
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 22)) // -> 6
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 1)) // -> 0
console.log(search([1, 3, 6, 13, 17, 19, 22, 25, 30], 30)) // -> 8
console.log(search([1, 3, 6, 13, 17, 22, 25, 30], 6)) // -> 2
console.log(search([1, 3, 6, 13, 17], 12)) // -> -1
console.log(search([1, 3, 6, 13, 17], 3)) // -> 1
console.log(search([1, 3, 6, 13, 17], 6)) // - > 2

// ============================================================================================