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
  Sample Input ["eat", "tea", "tan", "ate", "nat", "bat"]
  Sample Output [ ["ate", "eat", "tea"], ["nat", "tan"], ["bat"] ]

  Т.е. сгруппировать слова по "общим буквам".
*/
function myFunction(arr) {
  const result = [];

  a: for (let i = 0; i < arr.length; i++) {
    if (!result.length) {
      result.push([arr[i]]);
    } else {
      for (let j = 0; j < result.length; j++) {
        let detect = result[j][0].length;

        for (let x = 0; x < arr[i].length; x++) {
          if (result[j][0].includes(arr[i][x])) {
            detect -= 1;
          }
        }

        if (detect === 0) {
          result[j].push(arr[i]);
          continue a;
        }

        if (j === result.length - 1) {
          result.push([arr[i]]);
          continue a;
        }
      }
    }
  }

  return result;
}

console.log(myFunction(["eat", "tea", "tan", "ate", "nat", "bat"]), [["ate", "eat", "tea"], ["nat", "tan"], ["bat"]]);

// =========================================================================
