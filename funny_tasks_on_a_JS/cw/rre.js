/*
A string is considered to be in title case if each word in the string is either (a) capitalised (that is, only the first letter of the word is in upper case) or (b) considered to be an exception and put entirely into lower case unless it is the first word, which is always capitalised.

Write a function that will convert a string into title case, given an optional list of exceptions (minor words). The list of minor words will be given as a string with each word separated by a space. Your function should ignore the case of the minor words string -- it should behave in the same way even if the case of the minor word string is changed.

###Arguments (Haskell)

First argument: space-delimited list of minor words that must always be lowercase except for the first word in the string.
Second argument: the original string to be converted.
###Arguments (Other languages)

First argument (required): the original string to be converted.
Second argument (optional): space-delimited list of minor words that must always be lowercase except for the first word in the string. The JavaScript/CoffeeScript tests will pass undefined when this argument is unused.
###Example

titleCase('a clash of KINGS', 'a an the of') // should return: 'A Clash of Kings'
titleCase('THE WIND IN THE WILLOWS', 'The In') // should return: 'The Wind in the Willows'
titleCase('the quick brown fox') // should return: 'The Quick Brown Fox'
*/

function titleCase(title, minorWords) {
    if (!minorWords) {
        return title
            .split(' ')
            .map((el) => [...el.toLowerCase()].map((e, i) => (i === 0 ? e.toUpperCase() : e)).join(''))
            .join(' ');
    }

    title = title.toLowerCase().split(' ');
    minorWords = minorWords.toLowerCase().split(' ');

    for (let i = 0; i < title.length; i++) {
        if (i === 0) {
            title[i] = title[i].replace(/\b[a-z]/g, (match) => match.toUpperCase());
        } else if (minorWords.includes(title[i])) {
            continue;
        } else {
            title[i] = title[i].replace(/\b[a-z]/g, (match) => match.toUpperCase());
        }
    }

    return title.join(' ');
}

console.log(titleCase('a clash of KINGS', 'a an the of'), 'A Clash of Kings');

// ======================================================

function titleCase(title, minorWords) {
    var minorWords = typeof minorWords !== 'undefined' ? minorWords.toLowerCase().split(' ') : [];
    return title
        .toLowerCase()
        .split(' ')
        .map(function (v, i) {
            if (v != '' && (minorWords.indexOf(v) === -1 || i == 0)) {
                v = v.split('');
                v[0] = v[0].toUpperCase();
                v = v.join('');
            }
            return v;
        })
        .join(' ');
}
// =====================================================
const titleCase = (title, minorWords) => {
    if (!title) return title;

    let cap = (word) => word[0].toUpperCase() + word.slice(1);

    let minors = (minorWords || '').toLowerCase().split(' ');

    let result = title.toLowerCase().replace(/\S+/g, (w) => (minors.indexOf(w) === -1 ? cap(w) : w));

    return cap(result);
};
// ===========================================================
function titleCase(title, minorWords) {
    minorWords = (minorWords || '').toLowerCase().split(' ');
    title = title.toLowerCase();
    return title.replace(/(\w)\w*/g, (word, firstChar, index) => {
        if (index === 0 || minorWords.indexOf(word) === -1) word = word.replace(firstChar, firstChar.toUpperCase());
        return word;
    });
}
// ===========================
function titleCase(title, minorWords) {
    const minorArr = minorWords ? minorWords.toLowerCase().split(' ') : [];
    return title
        .toLowerCase()
        .split(' ')
        .map((word, i) => {
            if (!word) return word;
            if (minorArr.indexOf(word) !== -1 && i !== 0) return word;

            return word[0].toUpperCase() + word.slice(1);
        })
        .join(' ');
}
// ======================
const titleCase = (title, minorWords) =>
    title
        .replace(/\w+/g, (val) => val[0].toUpperCase() + val.slice(1).toLowerCase())
        .replace(new RegExp(` ${(minorWords || ``).split(` `).join(`| `)}`, `gi`), (val) => val.toLowerCase());
// =====================================================
function titleCase(title, minorWords = '-') {
    return eval(
        'title.toLowerCase().replace(/^\\S|\\b(?!' +
            minorWords.toLowerCase().split(' ').join('|') +
            ')\\S/g, function(s){ return s.toUpperCase(); });',
    );
}
