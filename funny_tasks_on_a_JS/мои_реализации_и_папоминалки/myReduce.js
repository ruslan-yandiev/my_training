Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);
  //  if (typeof callback !== 'function') throw new Error(`${callback} is not a function`);

  let startIndex = initialValue === undefined ? 1 : 0;
  if (initialValue === undefined) initialValue = this[0];

  for (let i = startIndex; i < this.length; i++) {
    initialValue = callback(initialValue, this[i], i, this);
  }

  return initialValue;
};

console.log([1, 2, 3, 4, 5].myReduce((acc, elem) => acc + elem, 1)); // => 16

console.log([1, 2, 3, 4, 5].myReduce((acc, elem, index, arr) => acc + elem)); // 15

console.log(
  [1, 2, 3, 4, 5].myReduce((acc, elem, index, arr) => {
    if (index % 2) {
      return acc + elem;
    }
    return acc;
  }, 0)
); // => 6

console.log(
  [1, 2, 3, 4, 5].myReduce((acc, elem, index, arr) => {
    if (index % 2) {
      acc.push(elem, arr[index + 1]);
    }
    return acc;
  }, [])
); // => [2, 3, 4, 5]

console.log(
  [1, 2, 3, 4, 5].myReduce((acc, el, index) => {
    acc[el] = index;
    return acc;
  }, {})
); // {1: 0, 2: 1, 3: 2, 4: 3, 5: 4}

// Более быстрый вариант.
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== "function") throw new TypeError(`${callback} is not a function`);

  //  if (typeof callback !== 'function') throw new Error(`${callback} is not a function`);
  // let startIndex

  if (initialValue === undefined) {
    var startIndex = 1;
    initialValue = this[0];
  } else {
    var startIndex = 0;
  }

  for (let i = startIndex, size = this.length; i < size; i++) {
    initialValue = callback(initialValue, this[i], i, this);
  }

  return initialValue;
};
