let arr = [3, 22, 3, -1, 11, 12, 4, 1, 8, 14];

// ! Сортировка слиянием
function sortMerge(arr) {
  let len = arr.length;

  if (len > 1) {
    // высчитаем среднюю длину округлив к минимальному значению
    let mid = Math.floor(len / 2);

    // срежем часть массива по индексу от 0 включительно и до mid не включительно (вернет новый массив)
    let leftArr = arr.slice(0, mid);
    // срежем от mid включительно и до конца (вернет новый массив)
    let rightArr = arr.slice(mid);

    // после разделения на две части продолжим дробление массива до тех пор пока не останется один элемент (рекурсия)
    sortMerge(leftArr);
    sortMerge(rightArr);

    let l = (r = k = 0); // ! 'use strict' не будет работать если установлен в документе;

    while (l < leftArr.length && r < rightArr.length) {
      if (leftArr[l] <= rightArr[r]) {
        arr[k] = leftArr[l];
        l += 1;
      } else {
        arr[k] = rightArr[r];
        r += 1;
      }

      k += 1;
    }

    // добить при необходимости
    while (l < leftArr.length) {
      arr[k] = leftArr[l];
      l += 1;
      k += 1;
    }

    // добить при необходимости
    while (r < rightArr.length) {
      arr[k] = rightArr[r];
      r += 1;
      k += 1;
    }
  }

  return arr;
}

console.log(sortMerge(arr));

// * =========================================================================================

let arr2 = [3, 22, 3, -1, 11, 12, 4, 1, 8, 14];

// ! Сортировка слиянием
function sortMerge(arr) {
  let len = arr.length;

  if (len > 1) {
    let mid = Math.floor(len / 2);

    let leftArr = arr.slice(0, mid);

    let rightArr = arr.slice(mid);

    sortMerge(leftArr);
    sortMerge(rightArr);

    let l = (r = k = 0); // ! 'use strict' не будет работать если установлен в документе;

    while (k < len) {
      if (leftArr[l] <= rightArr[r]) {
        arr[k] = leftArr[l];
        l += 1;
      } else if (leftArr[l] > rightArr[r]) {
        arr[k] = rightArr[r];
        r += 1;

        // leftArr[l] == undefined //  leftArr[l] == false
      } else if (!leftArr[l]) {
        arr[k] = rightArr[r];
        r += 1;

        // rightArr[r] == undefined остается только один вариант по этому можно и else указать
      } else {
        arr[k] = leftArr[l];
        l += 1;
      }

      k += 1;
    }
  }

  return arr;
}

console.log(sortMerge(arr2));
