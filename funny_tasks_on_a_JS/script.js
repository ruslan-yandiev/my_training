function func(str) {
  const obj = {
    A: "a",
    B: "b",
    C: "c",
    D: "d",
    E: "e",
    F: "f",
  };

  let result = "";

  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) {
      result += obj[str[i]];
    } else {
      result += str[i];
    }
  }

  return result;
}

console.log(func("eeEEfFFFaAAA  1212`e ppp"));
