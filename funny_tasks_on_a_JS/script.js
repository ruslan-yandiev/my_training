const check = (str, arrayPars) => {
    if (str.length % 2) return false;
    const mapPars = new Map(arrayPars);
    const newArr = Array.from(str);
    let nextPar = '';
    let isRight = false;
    newArr.forEach((item) => {
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
console.log(
    check('([{}])', [
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
    ]),
    true,
); // -> true
console.log(
    check('[(])', [
        ['(', ')'],
        ['[', ']'],
    ]),
    false,
); // -> false
console.log(
    check('[]()', [
        ['(', ')'],
        ['[', ']'],
    ]),
    true,
); // -> true
console.log(
    check('[]()(', [
        ['(', ')'],
        ['[', ']'],
    ]),
    false,
); // -> false

// special case: opening and closing bracket can be the same :)

console.log(check('||', [['|', '|']]), true); // -> true
console.log(
    check('|()|', [
        ['(', ')'],
        ['|', '|'],
    ]),
    true,
); // -> true
console.log(
    check('|(|)', [
        ['(', ')'],
        ['|', '|'],
    ]),
    false,
); // -> false
console.log(
    check('|()|(||)||', [
        ['(', ')'],
        ['|', '|'],
    ]),
    true,
); // -> true
console.log(
    check('|(||||(||)||)|', [
        ['(', ')'],
        ['|', '|'],
    ]),
    true,
); // -> true
