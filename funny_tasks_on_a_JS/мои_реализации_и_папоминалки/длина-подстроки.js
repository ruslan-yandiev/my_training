/*
В строке найти длину самой большей подстроки с повторяющимися символами
*/
function f(str) {
    let arr = [];
    let detect = 1;
  
    for (let i = 0; i < str.length - 1; i++) {
      if (str[i] === str [i + 1]) {
        detect += 1;
      } else {
        arr.push(detect);
        detect = 1;
      }
    }
  
    return Math.max(...arr);
  }
  
  console.log(f('paralleeeeelepipeуууt'));

/*
В строке найти длину самой большей подстроки с повторяющимися символами и вывести символ и длинну
*/
  function f2(str) {
    let obj = {};
    let arr = [];
    let detect = 1;
  
    for (let i = 0; i < str.length - 1; i++) {
      if (str[i] === str [i + 1]) {
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
  
    return `${Object.keys(result)[0]}: ${Object.values(result)[0]}`
  }
  
  console.log(f2('paralleeeeelepipeуttttttууt'));