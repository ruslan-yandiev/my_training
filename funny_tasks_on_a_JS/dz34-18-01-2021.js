/*
! задача с реального собеседования.

Напишите функцию, которая найдет все наборы анаграмм в строке.
Анаграммы - слова, составленные из одного и того же набора букв, например
рост, сорт, трос.
Функция должна вернуть массив, в котором содержатся массивы, содержащие слова 
анаграммы. Если для слова не нашлось анаграммы, значит это слово включать в 
результат не нужно.
*/
function getAnagrams(string) {
    const arr = string.split(' '), result = [];
    
    function find(word, indexWord) {
        let collection = [];
        let detect = 0;

        for (let i = indexWord + 1; i < arr.length; i++) {
            let word2 = arr[i];

            if (word.length === word2.length) {
                for (let j = 0; j < word2.length; j++) if(word.includes(word2[j])) detect += 1;

                if (detect === word.length) {
                    collection.push(word2);
                    arr.splice(i, 1);
                    i--;
                }
            }

            detect = 0;
        }

        if (collection.length) {
            collection.push(word);
            result.push(collection);
        }

        return indexWord + 1 === arr.length ? result : find(arr[indexWord + 1], indexWord + 1);
    }

    return find(arr[0], 0);
}

const str = 'адрес карп кума мир мука парк рим среда стук рост сорт трос';

// [
//  ["адрес", "среда"],
//  ["карп", "парк"],
//  ["кума", "мука"],
//  ["мир", "рим"],
//  ["рост", "сорт", "трос"]
// ];
console.log(getAnagrams(str));

// * ==================================================================
/*
Необходимо реализовать функцию getDigitsSum, которая будет складывать 
все цифры в числе, пока не останется лишь одна какая-то цифра. 
Необходимо сделать два варианта решения, первый вариант решения не 
должен использовать рекурсию, второй вариант должен быть рекурсивным.

Примеры:
5  ==>  5

57  ==>  5 + 7 = 12  
    ==>  1 + 2 = 3  
    ==>  3

87653  ==>  8 + 7 + 6 + 5 + 3 = 29  
       ==>  2 + 9 = 11  
       ==>  1 + 1 = 2  
       ==>  2
*/

// Вариант без рекурсии
function digitsSum(value) {
    let num = value.toString().split('');
    if (num.length === 1) return num[0];

    while (true) {
        let result = num.reduce((acc, elem) => acc + +elem, 0);
        if (result > 0 && result < 10) return result;
        num = result.toString().split('');
    }
}

// Вариант с рекурсией
function digitsSumRec(value) {
    let num = value.toString().split('');
    if (num.length === 1) return num[0];
    let result = num.reduce((acc, elem) => acc + +elem, 0);
    return digitsSumRec(result);
}

console.log(digitsSum(5)); // 5
console.log(digitsSumRec(5)); // 5
console.log(digitsSum(57)); // 3
console.log(digitsSumRec(57)); // 3
console.log(digitsSum(876512)); // 2
console.log(digitsSumRec(876512)); // 2
console.log(digitsSum(651635135038123654981557411091658121n)); // 7
console.log(digitsSumRec(651635135038123654981557411091658121n)); // 7

// *  ====================================================================
