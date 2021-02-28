"use strict";

var check = function check(str, arrayPars) {
  if (str.length % 2) return false;
  var mapPars = new Map(arrayPars);
  var newArr = Array.from(str);
  var nextPar = '';
  var isRight = false;
  newArr.forEach(function (item) {
    if (!nextPar.startsWith(item)) {
      isRight = false;
      nextPar = mapPars.get(item) + nextPar;
    } else {
      isRight = true;
      nextPar = nextPar.slice(1, nextPar.length);
    }
  });
  return isRight;
};

console.log(check('()', [['(', ')']]), true); // -> true

console.log(check('((()))()', [['(', ')']]), true); // -> true

console.log(check('())(', [['(', ')']]), false); // -> false

console.log(check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]), true); // -> true

console.log(check('[(])', [['(', ')'], ['[', ']']]), false); // -> false

console.log(check('[]()', [['(', ')'], ['[', ']']]), true); // -> true

console.log(check('[]()(', [['(', ')'], ['[', ']']]), false); // -> false
// special case: opening and closing bracket can be the same :)

console.log(check('||', [['|', '|']]), true); // -> true

console.log(check('|()|', [['(', ')'], ['|', '|']]), true); // -> true

console.log(check('|(|)', [['(', ')'], ['|', '|']]), false); // -> false

console.log(check('|()|(||)||', [['(', ')'], ['|', '|']]), true); // -> true

console.log(check('|(||||(||)||)|', [['(', ')'], ['|', '|']]), true); // -> true