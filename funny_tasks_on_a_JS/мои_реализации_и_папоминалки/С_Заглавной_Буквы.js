// Сделать в каждом начало с заглавной буквы
let str = "How can mirrors be real if our eyes aren't real";

String.prototype.toCapitalize = function () {
    return this.toLowerCase().replace(/^.|\s\S/g, (a) => a.toUpperCase());
};

console.log(str.toCapitalize());

// ! 2 Не во всех случаях нормально пашет
'your string'.replace(/\b\w/g, (l) => l.toUpperCase());

// ! 3
'your string'.replace(/\b[a-z]/g, (match) => match.toUpperCase());

// ! 4
const toMyCapitalize = (s) =>
    s
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

console.log('aaaaa bbbbb cccc c/c'.toMyCapitalize());
