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

//! собес #11
function Developer(......) {
    // ...
}

function DeveloperBuilder(name) {
    this.name = name;
    this.skills = [];
    this.favoriteFramework;

    this.addSkill = function(skill) {
        this.skills.push(skill);
        return this;
    }

    this.setFavoriteFramework = function(framework) {
        this.favoriteFramework = framework;
        return this;
    }

    this.build = function() {

    }
}

const developer = new DeveloperBuilder('Павел').addSkill('ES6').addSkill('TypeScript').setFavoriteFramework('React')//.build();
console.log(developer);
const developer2 = new DeveloperBuilder('Ivan').addSkill('ES9').addSkill('NodeJS').setFavoriteFramework('Vue js')//.build();
console.log(developer2);



