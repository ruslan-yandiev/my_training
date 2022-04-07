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

// ===============

Array.prototype.myReduce = function (callBack, acc) {
  let result = acc === undefined ? this[0] : acc;
  let startIndex = acc === undefined ? 1 : 0;

  for (let i = startIndex; i < this.length; i++) {
      result = callBack(result, this[i], i, this)
  }

  return result;
}
// ================

Array.prototype.myReduce = function(callBack, acc) {
  let index = acc === undefined ? 1 : 0;
  acc = acc === undefined ? this[0] : acc;

  for (let i = index; i < this.length; i++) {
      acc = callBack(acc, this[i], i, this);
  }

  return acc;
}
// ==================

Array.prototype.myReduce = function() {
  arguments[1] = arguments.length === 1 ? this[0] : arguments[1]; 

  for (let i = arguments.length === 1 ? 1 : 0; i < this.length; i++) {
      arguments[1] = arguments[0](arguments[1], this[i], i, this);
  }

  return arguments[1];
}
