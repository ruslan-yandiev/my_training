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

//! 39
/*
Описание
Нужно реализовать функцию validate для проверки данных в объекте. На вход приходит набор данных (например, данные формы) и набор правил для валидации, описанных в определенном формате. Нужно понять, соответствуют ли данные этим правилам и, если нет, выдать информацию - какие данные каким правилам не соответствуют.

Входные данные
data - объект, где ключи - имена полей, а значения - значения притивных типов (не массивы/объекты)
rules - объект набором правил, где ключи - имена полей, а значения - объект с правилами валидации. Правила записаны
Выходные данные - объект с полями:
result - булево значение, если ошибок не было - true, были - false
errors - если не было ошибок - пустой массив, если были - массив объектов формата с полями:
field - название поля
value - значение поля
rule - имя правила, которому не соответсвовало поле
Пример:

var data = {
    name: 'Alex',
    age: 30,
    profession: 
};
var rules = {
    name: { required: true, minLength: 1, maxLength: 3 },
    age: { min: 18, max: 60 },
}

validate(data, rules); // { result: true, errors: [] }
data.age = 5;
validate(data, rules); // { result: false, errors: [{field: 'age', value: 30, error: 'max'}] }


Набор возможных правил (в скобках - параметр):

required (bool) - поле содержится в объекте и не равно null. Если required в правилах нет - поле считается опциональным.
isString (bool) - поле - это строка
isNumber (bool) - поле - это корректное число
isBoolean (bool) - поле - это булево значение
minLength (number) - поле - это строка с длиной больше или равной параметру
maxLength (number) - поле - это строка с длиной меньше или равной параметру
min (number) - поле - это число больше или равное параметру
max (number) - поле - это число меньше или равное параметру
isEmail (bool) - поле - корректный email (базовая проверка на корректность, без сложных случаев)
*/

function validate(data, rules) {
    // code here
}

console.log(validate(
{ name: "Alex", age: 41, city: null }, 
{},
), { result: true, errors: [] });

console.log(validate(
{ name: "Alex", age: 41, city: null }, 
{ name: {}, age: {}, city: {} },
), { result: true, errors: [] });

console.log(validate(
{ name: "Alex" }, 
{ name: { isString: true } },
), { result: true, errors: [] });

console.log(validate(
{ name: "" }, 
{ name: { isString: true } },
), { result: true, errors: [] });

console.log(validate(
{ name: NaN }, 
{ name: { isString: true } },
), { result: false, errors: [{ value: NaN, field: 'name', rule: 'isString' }] });

console.log(validate(
{ name: 3 }, 
{ name: { isString: true } },
), { result: false, errors: [{ value: 3, field: 'name', rule: 'isString' }] });

console.log(validate(
{ age: 10 }, 
{ age: { isNumber: true } },
), { result: true, errors: [] });

console.log(validate(
{ age: 0 }, 
{ age: { isNumber: true } },
), { result: true, errors: [] });

console.log(validate(
{ age: NaN }, 
{ age: { isNumber: true } },
), { result: false, errors: [{ value: NaN, field: 'age', rule: 'isNumber' }] });

console.log(validate(
{ age: '4' }, 
{ age: { isNumber: true } },
), { result: false, errors: [{ value: '4', field: 'age', rule: 'isNumber' }] });

console.log(validate(
{ value: true }, 
{ value: { isBoolean: true } },
), { result: true, errors: [] });

console.log(validate(
{ value: false }, 
{ value: { isBoolean: true } },
), { result: true, errors: [] });

console.log(validate(
{ value: 1 }, 
{ value: { isBoolean: true } },
), { result: false, errors: [{ value: 1, field: 'value', rule: 'isBoolean' }] });

console.log(validate(
{ age: 10 }, 
{ age: { min: 5, max: 20 } },
), { result: true, errors: [] });

console.log(validate(
{ age: 10 }, 
{ age: { min: 10, max: 10 } },
), { result: true, errors: [] });

console.log(validate(
{ age: 11 }, 
{ age: { min: 10, max: 10 } },
), { result: false, errors: [{ value: 11, field: 'age', rule: 'max' }] });

console.log(validate(
{ age: 9 }, 
{ age: { min: 10, max: 10 } },
), { result: false, errors: [{ value: 9, field: 'age', rule: 'min' }] });

console.log(validate(
{ age: NaN }, 
{ age: { min: 10, max: 10 } },
), { 
result: false, 
errors: [
    { value: NaN, field: 'age', rule: 'min' }, 
    { value: NaN, field: 'age', rule: 'max' },
],
});

console.log(validate(
{ name: "Alex" }, 
{ name: { minLength: 3, maxLength: 5 } },
), { result: true, errors: [] });

console.log(validate(
{ name: "Alex" }, 
{ name: { minLength: 4, maxLength: 4 } },
), { result: true, errors: [] });

console.log(validate(
{ name: 1 }, 
{ name: { minLength: 4, maxLength: 4 } },
), { 
result: false, 
errors: [
    { value: 1, field: 'name', rule: 'minLength' }, 
    { value: 1, field: 'name', rule: 'maxLength' },
],
});

console.log(validate(
{ name: "Alex1" }, 
{ name: { minLength: 4, maxLength: 4 } },
), { result: false, errors: [{ value: "Alex1", field: 'name', rule: 'maxLength' }] });

console.log(validate(
{ name: "Ale" }, 
{ name: { minLength: 4, maxLength: 4 } },
), { result: false, errors: [{ value: "Ale", field: 'name', rule: 'minLength' }] });

console.log(validate(
{ value: true }, 
{ value: { required: true } },
), { result: true, errors: [] });

console.log(validate(
{ value: false }, 
{ value: { required: true } },
), { result: true, errors: [] });

console.log(validate(
{ value: '' }, 
{ value: { required: true } },
), { result: true, errors: [] });

console.log(validate(
{}, 
{ value: { required: true } },
), { result: false, errors: [{ value: undefined, field: 'value', rule: 'required' }] });

console.log(validate(
{ value: null }, 
{ value: { required: true } },
), { result: false, errors: [{ value: null, field: 'value', rule: 'required' }] });

console.log(validate(
{ name: 'Alex' }, 
{ name: { isString: true, required: true } },
), { result: true, errors: [] });

console.log(validate(
{ name: null }, 
{ name: { isString: true, required: true } },
), { result: false, errors: [{ value: null, field: 'name', rule: 'required' }] });

console.log(validate(
{}, 
{ name: { isString: true } },
), { result: true, errors: [] });

console.log(validate(
{}, 
{ name: { isNumber: true } },
), { result: true, errors: [] });

console.log(validate(
{ email: 'mail@example.com' }, 
{ naemailmemaile: { isEmail: true } },
), { result: true, errors: [] });

console.log(validate(
{ email: 'fred-cooper@mail.spb.com' }, 
{ email: { isEmail: true } },
), { result: true, errors: [] });

console.log(validate(
{ email: 'example.com' }, 
{ email: { isEmail: true } },
), { result: false, errors: [{ value: 'example.com', field: 'email', rule: 'isEmail' }] });

console.log(validate(
{ email: 'pix@' }, 
{ email: { isEmail: true } },
), { result: false, errors: [{ value: 'pix@', field: 'email', rule: 'isEmail' }] });
