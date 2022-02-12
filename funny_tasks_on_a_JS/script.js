/*
Результатом декоратора debounce(f, ms) должна быть обёртка, 
которая передаёт вызов f не более одного раза в ms миллисекунд. 
Другими словами, когда мы вызываем debounce, 
это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.

На практике debounce полезен для функций, которые получают/обновляют данные, 
и мы знаем, что повторный вызов в течение короткого промежутка времени не даст ничего нового. 
Так что лучше не тратить на него ресурсы.
*/
// function debounce(f, ms) {
//   let detect = true;

//   return function (arg) {
//     if (detect) {
//       f(arg);
//       detect = false;
//     }

//     setTimeout(() => (detect = true), ms);
//   };
// }

// let f = debounce(console.log, 1000);

// f(1); // выполняется немедленно
// f(2); // проигнорирован

// setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout(() => f(4), 1100); // выполняется
// setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
// setTimeout(() => f(6), 2300); // выполняется

//* =======================================================================================================================
/*
Даны две строки.
Написать функцию, которая вернёт True, если из первой строки можно получить вторую, совершив не более 1 изменения 
(== удаление / замена символа).
*/

//! собес #15
function addStr(str1, str2) {
    const arr1 = [...str1];
    const arr2 = [...str2];
    let result = '';

    const buildWeight = (arr) => {
        return arr.reduce((obj, el) => {
            obj[el] ? obj[el] += 1 : obj[el] = 1;
            return obj;
        }, {});
    }

    const weight1 = buildWeight(arr1);
    const weight2 = buildWeight(arr2);

    for (let i = 0; arr1.length && arr2.length; i++) {
        if (weight1[arr1[i]] === weight2[arr2[i]]) {
            arr1[i] < arr2[i] ? result += arr1.splice(i, 1) : result += arr2.splice(i, 1);
        } else {
            weight1[arr1[i]] < weight2[arr2[i]] ? result += arr1.splice(i, 1) : result += arr2.splice(i, 1);
        }
        i--;
    }

    return !arr1.length && !arr2.length ? result : !arr1.length ? result + arr2.join('') : result + arr1.join('');
}

console.log(addStr('super', 'tower')); // stouperwer
console.log(addStr('dce', 'cccbd'));   // dcecccbd
