/*
### Уникальность всех символов в строке

Напишите функцию, которая определяет уникальны ли все символы в строке. Регистр должен учитываться: `‘a’` и `‘A’` разные символы.

**Input**: String

**Output**: Boolean
*/
function isUnique(string) {
	const detect = {};

    for (let i = 0; i < string.length; i++) {
        if (detect[string[i]]) return false;
        detect[string[i]] = true;
    }

    return true
}

function isUnique(str) {
    for (let i = 0; i < str.length; i++) {
      if (str.lastIndexOf(str[i]) !== i) {
        return false
      }
    }
    return true
}

function isUnique(str) {

    const chars = new Set()

    for (let i = 0; i < str.length; i++) {
      const current = str[i]
    
      if (chars.has(current)) {
        return false
      }
    
      chars.add(current)
    }
    return true
}

function isUnique(str) {
  return new Set(str).size === str.length
}


console.log(isUnique('abcdef')) // -> true
console.log(isUnique('1234567')) // -> true
console.log(isUnique('abcABC')) // -> true
console.log(isUnique('abcadef')) // -> false
// * ===================================================================

/*
### Плоский массив

Напишите функцию, принимающая массив с вложенными массивами и распакуйте в результирующий плоский массов. В результате должны получить новый одномерный массив.

**Input**: Array

**Output**: Array
*/
function flatten(array) {
  return array.flat(Infinity)
}

function flatten(array) {
  const result = [];

  function flating(arr) {
      for (let i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i])) {
              flating(arr[i]);
          } else {
              result.push(arr[i]);
          }
      }
  }

  flating(array);
  return result;
}



console.log(flatten([[1], [[2, 3]], [[[4]]]])) // -> [1, 2, 3, 4]