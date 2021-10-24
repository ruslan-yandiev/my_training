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

/*
В строке состоящей из нулей и единиц нужно найти самую длинную подстроку,
состоящую только из единиц, если в исходной строке вы можете удалить один ноль в любой позиции
и вернуть длину этой подстроки
*/

function finds(str) {
  let result = 1;
  let detect = 0;
  let detect2 = 0;
  let bull = true;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "1") {
      detect += 1;
    } else if (str[i] === "0" && detect2 > 0) {
      if (detect + detect2 > result) result = detect + detect2;
      detect2 = detect;
      detect = 0;
    } else if (str[i] === "0" && str[i + 1] === "1" && bull) {
      bull = false;
      detect2 = detect;
      detect = 0;
    } else {
      if (detect > result) result = detect;
      detect = 0;
      bull = true;
    }
  }

  return detect + detect2 > result ? detect + detect2 : result;
}

console.log(finds("11100110010010101010000111011111000111100111100011100111111100000111000101010111110111111111101111111")); // 17
