// Способы перенаправить клиента с одной страницы на другую и чем отличаются?
// Пример:
setTimeout(() => {
    // window.location.href = 'https://google.com'; // тут иметируется переход по ссылке
    // или
    // window.location.replace('https://google.com'); // иметация перенаправления (rederect)
}, 5000) // перенаправим через пять секунд. +-


// * ==========================================================================
/*
Реализовать функцию removeDuplicates, куда передается массив со строками.
Необходимо реализовать функцию так, чтобы она возвращала новый массив с 
теми же строками, в том же порядке, из которого убраны все дубликаты.
Set и Map использовать запрещено.
Примечание: массив может быть большого размера.
*/

function removeDuplicates(arr) {
    return arr.reduce((accum, elem) => {
        if (!accum.includes(elem)) accum.push(elem);
        return accum;
    }, [])
}

console.log(
  removeDuplicates([
    "string",
    "3",
    "0",
    "string",
    "string",
    "number",
    "number",
    "3",
    "constructor",
    "0"
  ])
); // ["string", "3", "0", "number", "constructor"]


// * ==========================================================================
/*
Есть кусок кода, который должен приветствовать пользователя, но работает он 
некорректно. Исправь пожалуйста. 
*/
setTimeout(() => user.logName.bind(user)(), 1000);

let user = {
    name: "Павел",
    logName() {
        console.log(`Привет, ${this.name}!`);
    }
};
// ! Стот напомнить, что у стрелочных функций не просто нет своего контекста, но и они используют контекс места своего вызова и уже не изменяют его даже принудительно(недьзя будет забиндить, эплаить или заколить)