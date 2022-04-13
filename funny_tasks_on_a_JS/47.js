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
          Array.isArray(arr[i]) ? flating(arr[i]) : result.push(arr[i]);
      }
  }

  flating(array);
  return result;
}

function flatten(array) {
  return [...array.reduce((acc, el) => Array.isArray(el) ? acc + flatten(el) : acc + el, '')].filter((el) => el !== ',').map((el) => +el);
}

console.log(flatten([[1], [[2, 3]], [[[4]]]])) // -> [1, 2, 3, 4]

// * =============================================================================
/*
### Удаление всех повторяющихся значений в строке

Напишите функцию, которая принимает строку и возвращает новую, в которой все дублирующиеся символы будут удалены.

**Input**: String

**Output**: String
*/
function removeDupes(str) {
  return [...new Set(str)].join('');
}

function removeDupes(str) {
  return Object.keys([...str].reduce((obj, el) => {
      obj[el] = el;
      return obj;
  }, {})).join('');
}

function removeDupes(str) {
  let result = '';
  const detect = {};

  for (let i = 0; i < str.length; i++) {
      if (detect[str[i]]) {
          continue;
      } else {
          detect[str[i]] = true;
          result += str[i];
      }
  }

  return result;
}

console.log(removeDupes('abcd')) // -> 'abcd'
console.log(removeDupes('aabbccdd')) // -> 'abcd'
console.log(removeDupes('abcddbca')) // -> 'abcd'
console.log(removeDupes('abababcdcdcd')) // -> 'abcd'

// * ===============================================================

/*
### Какая строка встречается чаще всего

Напишите функцию, которая принимает массив строк и возвращает самую частовстречающуюся строку в этом массиве. Если таких строк несколько, то нужно вернуть первую, идя слева на право.

**Input**: String[]

**Output**: String
*/
function highestFrequency(array) {
  return Object.entries(array.reduce((obj, str) => {
      obj[str] ? obj[str] += 1 : obj[str] = 1;
      return obj;
  }, {})).reduce((obj, el) => {
      if(el[1] > obj['detect']) {
          obj['detect'] = el[1];
          obj['result'] = el[0];
      }
      return obj;
  }, {'detect': 0})['result'];
}

function highestFrequency(array) {
  const collection = {};
  
  for (let i = 0; i < array.length; i++) {
      collection[array[i]] ? collection[array[i]] += 1 : collection[array[i]] = 1;
  }

  let detect = 0, result;

  for (key in collection) {
      if (collection[key] > detect) {
          detect = collection[key];
          result = key;
      }
  }

  return result;
}

console.log(highestFrequency(['a', 'b', 'c', 'c', 'd', 'e'])) // -> c
console.log(highestFrequency(['abc', 'def', 'abc', 'def', 'abc'])) // -> abc
console.log(highestFrequency(['abc', 'def'])) // -> abc
console.log(highestFrequency(['abc', 'abc', 'def', 'def', 'def', 'ghi', 'ghi', 'ghi', 'ghi' ])) // -> ghi

// * =========================================================================
/*
ЗАДАЧА: Есть массив [1,2,3,4,5] развернуть массив не создавая новый массив и не использовать revers
*/

const arr = [1,2,3,4,5];
let accumStr = '';

for (let i = 0; arr.length; i++) {
    accumStr += arr.pop()
}

for (let i = 0; i < accumStr.length; i++) {
    arr.push(+accumStr[i])
}

console.log(arr);


// =============================================================================



// * ===========================================================================


