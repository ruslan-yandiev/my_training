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
    const result = { result: true, errors: [] };
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!Object.keys(rules).length) return { result: true, errors: [] };

    for (let key in rules) {
        for (let rule in rules[key]) {
            if (data[key] === undefined && key === 'value' || data[key] !== undefined) {
                let detect = false;

                if (rule === 'isString') {
                    if (data[key] !== undefined && typeof data[key] !== 'string' && !('required' in rules[key])) detect = true;
                } else if (rule === 'required') {
                    if (data[key] === undefined || data[key] === null) detect = true;
                } else if (rule === 'isNumber') {
                    if (Number.isNaN(data[key]) || typeof data[key] !== 'number') detect = true;
                } else if (rule === 'isBoolean') {
                    if (typeof data[key] !== 'boolean') detect = true;
                } else if (rule === 'minLength') {
                    if (typeof data[key] !== 'string' || data[key].length < rules[key][rule]) detect = true;
                } else if (rule === 'maxLength') {
                    if (typeof data[key] !== 'string' || data[key].length > rules[key][rule]) detect = true;
                } else if (rule === 'min') {
                    if (Number.isNaN(data[key]) ||data[key] < rules[key][rule]) detect = true;
                } else if (rule === 'max') {
                    if (Number.isNaN(data[key]) || data[key] > rules[key][rule]) detect = true;
                } else if (rule === 'isEmail') {
                    if (!data[key] || !data[key].toLowerCase().match(re)) detect = true;
                }

                if (detect) result.errors.push({ value: data[key], field: key, rule: rule });
            }
        }
    }

    if (result.errors.length) result.result = false;
    return result;
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
