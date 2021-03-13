/*
A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).

Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.
*/
console.log('How quickly daft jumping zebras vex.'.toLowerCase());
function isPangram(string) {
    let arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let sizeResult = arr_en.length;
    string = string.toLowerCase();

    for (let i = 0; i < arr_en.length; i++) {
        if (string.includes(arr_en[i])) {
            sizeResult -= 1;
            arr_en.splice(i, 1);
            i--;
        }
    }

    return sizeResult === 0;
}
// ==============================================================
function isPangram(string) {
    string = string.toLowerCase();
    return 'abcdefghijklmnopqrstuvwxyz'.split('').every(function (x) {
        return string.indexOf(x) !== -1;
    });
}
// ==================================================================
function isPangram(string) {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').every((x) => string.toLowerCase().includes(x));
}
//===================================================================
function isPangram(string) {
    return (string.match(/([a-z])(?!.*\1)/gi) || []).length === 26;
}
// ====================================================================
