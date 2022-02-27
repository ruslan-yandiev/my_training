/*
В строке найти длину самой большей подстроки с повторяющимися символами
*/
// ! Более простой по памяти и скорости код сложность временная O(n)
function findStr(str) {
  let result = 1, step = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== str[i + 1]) {
      if (result < step) result = step;
      step = 1;
    } else {
      step += 1;
    }
  }
  
  return result;
}

console.log(findStr('abcdaadpppcdgddddpacewwe')); // 4

// ! Плохой вариант как по памяти так и временная сложность O(n * 2)
function f(str) {
  let arr = [];
  let detect = 1;

  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      detect += 1;
    } else {
      arr.push(detect);
      detect = 1;
    }
  }

  return Math.max(...arr);
}

console.log(f("paralleeeeelepipeуууt"));

/*
В строке найти длину самой большей подстроки с повторяющимися символами и вывести символ и длинну
*/
// ! Хорошее решение. Более простой по памяти и скорости код сложность временная O(n)
function f2(str) {
  let result = 1, step = 1, result2;

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== str[i + 1]) {
      if (result < step) {
        result = step;
        result2 = str[i];
      }
      step = 1;
    } else {
      step += 1;
    }
  }
  
  return `${result2}: ${result}`;
}

console.log(f2("paralleeeeelepipeуttttttууt")); // t: 6

// ! Плохое очень решение как по памяти, так и по временной сложности O(n * 2)!!!!
function f2(str) {
  let obj = {};
  let arr = [];
  let detect = 1;

  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      detect += 1;
    } else {
      obj[str[i]] = detect;
      arr.push(obj); //? узнать почему arr.push(obj[str[i]] = detect) или arr.push({}[str[i]] = detect) просто запушить число из detect в массив без объекта?
      detect = 1;
      obj = {};
    }
  }

  let result = arr.reduce((acc, el) => {
    if (Object.values(el)[0] > Object.values(acc)[0]) {
      acc = el;
    }
    return acc;
  });

  return `${Object.keys(result)[0]}: ${Object.values(result)[0]}`;
}

console.log(f2("paralleeeeelepipeуttttttууt"));

/*
! Простая
В строке состоящей из нулей и единиц нужно найти самую длинную подстроку,
состоящую только из единиц и вернуть длину этой подстроки
*/
function finds(str) {
  let result = 1;
  let detect = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "1") {
      detect += 1;
    } else {
      if (detect > result) result = detect;
      detect = 0;
    }
  }

  return detect > result ? detect : result;
}

console.log(finds("111001100100101010100001110111110001111001111000111001111111000001110001010101111101111111111"));
/*
  Найти самую длинную подстроку идущую подряд.
  Вывести ее длину.
*/
function findStr(str) {
  let result = 1, step = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== str[i + 1]) {
      if (result < step) result = step;
      step = 1;
    } else {
      step += 1;
    }
  }
  
  return result;
}

console.log(findStr('0101001110100110011111000111111111111010100000001010101001')); // 12


// вернуть длину самой длинной подстроки
function f(str) {
  let result = 1;
  let step = 1;

  for (let i = 0; i < str.length; i++) {
      if (str[i] === str[i + 1]) {
          step += 1;
      } else {
          if (result < step) result = step;
          step = 1;
      }
  }
  return result
}

console.log(f('01001101111100100101011111001001000111111111101111111100111001100110000100000000000000001110101')); // 16 


// ! =================================================================================================
/*
В строке состоящей из нулей и единиц нужно найти самую длинную подстроку,
состоящую только из единиц, если в исходной строке вы можете удалить один ноль в любой позиции
и вернуть длину этой подстроки
*/
function finds(str) {
  let maxResult = 0;
  let count = 0;
  let lastResult = 0;

  for (let i = 0; i < str.length; i++) {
      if (str[i] === '1') {
          count += 1;
      } else if (str[i] === '0' && str[i + 1] === '1') {
          if (lastResult === 0) {
              lastResult = count;
              count = 0;
          } else {
              if (maxResult < lastResult + count) maxResult = lastResult + count;
              lastResult = count;
              count = 0;
          }
      } else if (str[i] === '0' & str[i + 1] === '0') {
          if (maxResult < lastResult + count) maxResult = lastResult + count;
          lastResult = 0;
          count = 0;
      }
  }

  return maxResult > count + lastResult ? maxResult : count + lastResult;
}

console.log(finds("0000000")); // 0
console.log(finds("00010001")); // 1
console.log(finds("000001010101010100000")); // 2
console.log(finds("11111")); // 5
console.log(finds("011111")); // 5
console.log(finds("011111011111")); // 10
console.log(finds("0111110111110")); // 10
console.log(finds("001111101111100")); // 10
console.log(finds("0011111011111")); // 10
console.log(finds("11111001111101010101")); // 6
console.log(finds("0111110111110011111001111101111111111")); // 15
console.log(finds("0000011111011111011111111110111111111100111110111111111111111111110")); // 25
console.log(finds("01001101111100100101011111001001000111111111101111111100111001100110000100000000000000001110101")); // 18
console.log(finds("11100110010010101010000111011111000111100111100011100111111100000111000101010111110111111111101111111")); // 17


// ! более простой и изящный вариант
function finds(str) {
  let result = 0;
  const arr = str.split('0')

  for (let i = 0; i < arr.length; i++) {
      if (arr[i] && arr[i + 1]) {
          if(result < arr[i].length + arr[i + 1].length) {
              result = arr[i].length + arr[i + 1].length;
          }
      } else if (arr[i]) { // ну или указать просто else все равно пустая строка покажет длину 0, но так нагляднее будет
          if(result < arr[i].length) {
              result = arr[i].length;
          }
      }
  }

  return result;
}

console.log(finds("0000000")); // 0
console.log(finds("00010001")); // 1
console.log(finds("000001010101010100000")); // 2
console.log(finds("11111")); // 5
console.log(finds("011111")); // 5
console.log(finds("011111011111")); // 10
console.log(finds("0111110111110")); // 10
console.log(finds("001111101111100")); // 10
console.log(finds("0011111011111")); // 10
console.log(finds("11111001111101010101")); // 6
console.log(finds("0111110111110011111001111101111111111")); // 15
console.log(finds("0000011111011111011111111110111111111100111110111111111111111111110")); // 25
console.log(finds("01001101111100100101011111001001000111111111101111111100111001100110000100000000000000001110101")); // 18
console.log(finds("11100110010010101010000111011111000111100111100011100111111100000111000101010111110111111111101111111")); // 17


// ! еще более изящное решение
function finds(str) {
  return str.split('0').reduce((count, e, index, arr) => {
      if (e && arr[index + 1]) {
          if (count < e.length + arr[index + 1].length) count = e.length + arr[index + 1].length;
      } else {
          if (count < e.length) count = e.length;
      }
      return count;
  }, 0)
}

console.log(finds("0000000")); // 0
console.log(finds("00010001")); // 1
console.log(finds("000001010101010100000")); // 2
console.log(finds("11111")); // 5
console.log(finds("011111")); // 5
console.log(finds("011111011111")); // 10
console.log(finds("0111110111110")); // 10
console.log(finds("001111101111100")); // 10
console.log(finds("0011111011111")); // 10
console.log(finds("11111001111101010101")); // 6
console.log(finds("0111110111110011111001111101111111111")); // 15
console.log(finds("0000011111011111011111111110111111111100111110111111111111111111110")); // 25
console.log(finds("01001101111100100101011111001001000111111111101111111100111001100110000100000000000000001110101")); // 18
console.log(finds("11100110010010101010000111011111000111100111100011100111111100000111000101010111110111111111101111111")); // 17
