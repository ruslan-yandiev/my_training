"use strict";

// Сделать в каждом начало с заглавной буквы
var str = "How can mirrors be real if our eyes aren't real";

String.prototype.toCapitalize = function () {
  return this.toLowerCase().replace(/^.|\s\S/g, function (a) {
    return a.toUpperCase();
  });
};

console.log(str.toCapitalize()); // ! 2 Не во всех случаях нормально пашет

'your string'.replace(/\b\w/g, function (l) {
  return l.toUpperCase();
}); // ! 3

'your string'.replace(/\b[a-z]/g, function (match) {
  return match.toUpperCase();
}); // ! 4

var toMyCapitalize = function toMyCapitalize(s) {
  return s.split(' ').map(function (w) {
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
};

console.log('aaaaa bbbbb cccc c/c'.toMyCapitalize());