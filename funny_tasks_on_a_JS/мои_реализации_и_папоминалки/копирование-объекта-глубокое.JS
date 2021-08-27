const myObj = {
  level: () => "level 1",
  hi: "Hi 1",

  obj2: {
    level: () => "level 2",
    hi2: "Hi 2",

    "obj2-1": {
      level: () => "level 2-1",
      "hi2-1": "Hi 2-1",
    },

    "obj2-2": {
      level: () => "level 2-2",
      hi22: "Hi 2-2",
    },
  },
};

// ! моя реализация
function copy(obj) {
  let result = {};

  for (let key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      result[key] = copy(obj[key]);
      continue;
    } else if (typeof obj[key] === "function") {
      result[key] = obj[key].bind(result);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}
console.log(myObj.level === copy(myObj).level);

// ! глубокое копирование объекта (функции тоже копирует как совершенно новые)
console.log(myObj.level === JSON.parse(JSON.stringify(myObj)).level);

const Z = {
  a: 5,
  b: { g: 8, y: 9, t: { q: 48 } },
  x: 47,
  l: { f: 85, p: { u: 89, m: 7 }, s: 71 },
  r: { h: 9, a: "test", s: "test2" },
};

// ! без учета клонирования функции, плохой способ
function deepClone(obj) {
  const clObj = {};

  for (const i in obj) {
    if (obj[i] instanceof Object) {
      clObj[i] = deepClone(obj[i]);
      continue;
    }
    clObj[i] = obj[i];
  }

  return clObj;
}

console.log(deepClone(myObj));
