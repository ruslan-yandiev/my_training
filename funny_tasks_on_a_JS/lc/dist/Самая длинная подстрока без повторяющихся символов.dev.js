"use strict";

/*
Для строки содержащейся в s найдите длину самой длинной подстроки без повторяющихся символов.

Пример 1:

Ввод: s = "abcabcbb"
Вывод: 3
Объяснение: Ответ - «abc», длина которого равна 3.

Пример 2:

Ввод: s = "bbbbb"
Выход: 1
Пояснение: Ответ - «b», длина которого равна 1.

Пример 3:

Ввод: s = "pwwkew"
Вывод: 3
Объяснение: Ответ - «wke», длина которого равна 3. 
Обратите внимание, что ответ должен быть подстрокой, «pwke» - это подпоследовательность, а не подстрока.

Пример 4:

Ввод: s = ""
Выход: 0
*/
var lengthOfLongestSubstring = function lengthOfLongestSubstring(s) {
  if (!s) return 0;
  var obj = {};
  var arr = [];
  var detect = 0;

  for (var i = 0; i < s.length; i++) {
    if (obj[s[i]] === 0 || obj[s[i]]) {
      arr.push(detect);
      detect = 0;
      i = obj[s[i]];
      obj = {};
    } else {
      obj[s[i]] = i;
      detect += 1;
    }
  }

  arr.push(detect);
  return Math.max.apply(Math, arr);
};

console.log(lengthOfLongestSubstring('pwwkew')); // 3

console.log(lengthOfLongestSubstring('aab')); // 2

console.log(lengthOfLongestSubstring('')); // 0

console.log(lengthOfLongestSubstring('abababab')); // 2

console.log(lengthOfLongestSubstring('aaaaaa')); // 1

console.log(lengthOfLongestSubstring('dweddddeedqwerttteeyuioplkjhggtggws')); // 11