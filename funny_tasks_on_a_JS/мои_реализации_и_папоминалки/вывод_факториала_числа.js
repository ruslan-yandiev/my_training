// вывести факториал числа последовательно в качестве строки
function solution(num) {
  let result = ``;

  for (let i = num - 1; i > 0; i--) {
    result += `${num} * ${i} = ${num * i}\n`;
    num *= i;
  }

  return result;
}

console.log(solution(5));
/*
    5 * 4 = 20
    20 * 3 = 60
    60 * 2 = 120
    120 * 1 = 120
  */
