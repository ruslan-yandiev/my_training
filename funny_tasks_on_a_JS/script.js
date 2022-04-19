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
function validate(data, rules) {
    let result = true;
    let errors = [];

    for (let field of Object.keys(rules)) {
        let fieldRules = rules[field];
        let fieldVal = data[field];
        let rulesArr = [];
        let rulesOrder = ['required', 'isString', 'isNumber', 'isBoolean', 'minLength', 'maxLength', 'min', 'max', 'isEmail'];

        for (let rule of rulesOrder) {
            if (Object.keys(fieldRules).includes(rule)) {
                rulesArr.push(rule);
            }
        }

        for (let rule of rulesArr) {
            let ruleVal = fieldRules[rule];

            if (rule === 'required' && ruleVal === true) {
                if (fieldVal === undefined || fieldVal === null) {
                    result = false;
                    errors.push({field: field, value: fieldVal, rule: rule});
                    break;
                }
            }

            if (rule === 'isString' && ruleVal === true && fieldVal !== undefined) {
                if (!(fieldVal instanceof String || typeof fieldVal === 'string')) {
                    result = false;
                    errors.push({field: field, value: fieldVal, rule: rule})
                    break;
                }
            }

            if (rule === 'isNumber' && ruleVal === true && fieldVal !== undefined) {
                if (!(fieldVal instanceof Number || typeof fieldVal === 'number') || isNaN(fieldVal)) {
                    result = false;
                    errors.push({field: field, value: fieldVal, rule: rule})
                    break;
                }
            }

            if (rule === 'isBoolean' && ruleVal === true & fieldVal !== undefined) {
                if (fieldVal !== true && fieldVal !== false) {
                    result = false;
                    errors.push({field: field, value: fieldVal, rule: rule})
                    break;
                }
            }

            if (rule === 'minLength') {
                if (String(fieldVal).length < Number(ruleVal) || !isNaN(fieldVal)) {
                    result = false;
                    errors.push({field: field, value: fieldVal, rule: rule})
                }
            }

            if (rule === 'maxLength') {
                if (String(fieldVal).length > Number(ruleVal) || !isNaN(fieldVal)) {
                    result = false;
                    errors.push({field: field, value: fieldVal, rule: rule})
                    break;
                }
            }

            if (rule === 'min') {
                if (Number(fieldVal) < Number(ruleVal) || isNaN(fieldVal)) {
                    result = false;
                    errors.push({field: field, value: fieldVal, rule: rule})
                }
            }

            if (rule === 'max') {
                if (Number(fieldVal) > Number(ruleVal) || isNaN(fieldVal)) {
                    result = false;
                    errors.push({field: field, value: fieldVal, rule: rule})
                    break;
                }
            }

            if (rule === 'isEmail' && ruleVal === true && fieldVal !== undefined) {
                let isEmail = true;
                if (!(String(fieldVal).includes('@') && String(fieldVal).includes('.'))) {
                    result = false;
                    errors.push({field: field, value: fieldVal, rule: rule})
                    break;
                }
            }
        }
    }

    return {result: result, errors: errors};
}