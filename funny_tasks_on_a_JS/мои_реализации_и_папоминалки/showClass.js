//! Функция которая возвращает класс объекта
function showClass(object) {
  return Object.prototype.toString.call(object).slice(8, -1);
}

console.log(showClass("")); // String
console.log(showClass(true)); // Boolen
console.log(showClass(null)); // Null  //!- покажет верно в отличии от typeof // object
