// Перевернуть числа по убыванию
function descendingOrder(n) {
    if (Number.isInteger(n) && n >= 0 && !Number.isNaN(n) && String(parseFloat(n, 10)) === String(n)) {
        return Number([...String(n)].sort((a, b) => a < b).join(''));
    }
}
console.log(descendingOrder(1012));
// ============================================
function descendingOrder(n) {
    return parseInt(String(n).split('').sort().reverse().join(''));
}
// ==============================================
