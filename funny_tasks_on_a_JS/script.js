function my(arr) {
  let result = [];
  let detect = {};

  for (let i = 0; i < arr.length; i++) {
    detect[arr[i]] ? result.push(arr[i]) : (detect[arr[i]] = 1);
  }

  return result;
}

console.log(my([1, 3, 4, 3, 2, 5, 6, 2, 7, 8]));
