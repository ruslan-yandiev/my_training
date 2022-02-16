// * =================================================================================
/*
Напиши функцию глубокого копирования объектов и массивов. Она должна делать не только копию переданного объекта/массива, 
но и копии вложенных них объектов/массивов. Также, копироваться должны объекты встроенного в JS конструктора Date
*/
// ! Глубокое копирование всего, но кроме объекта Set, Map, true, false, RegExp,  (релизовать)
function deepCopy(obj) {
  const result =  Array.isArray(obj) ? [] : {};

  for (let key in obj) {
      if (Array.isArray(obj[key])) {
          result[key] = [...deepCopy(obj[key])];
      } else if (obj[key] instanceof Date) {
          result[key] = new Date(obj[key]);
      } else if (obj[key] === null) {
          result[key] = obj[key];
      } else if (typeof obj[key] === 'object') {
          result[key] = deepCopy(obj[key]);
      } else if (typeof obj[key] === 'function') {
          result[key] = obj[key].bind(result);
      } else {
          result[key] = obj[key];
      }
  }

  return result;
}

var a = { x: 1, y: 2, z: [1, 2, 3, {a:1, b: 2}, [9, 8, function(a, b) {return a + b}, 7, [10, {a: 10, b:11}, 11, null, undefined]]], u: undefined, v: null, w: new Date(2014, 1, 1, 12, 0, 0), f() {return 'Hi'}};
var b = deepCopy(a); // b — это отдельный объект
b.x = 10;
console.log(a.x); // 1

// a.z и b.z указывают на разные массивы: 
b.z.push(4);
console.log(a.z); // [1, 2, 3]
console.log(b.z[4][2](1, 1));
console.log(b.z[4][4][3]); // null
console.log(b.u); // undefined
console.log(b.f());
console.log(b.f === a.f); // false
// a.w и b.w независимы друг от друга
b.w.setFullYear(2015);
console.log(b.w);
console.log(a.w.getFullYear()); // 2014

// * ======================================================================================================
function clone(thing, opts) { 
  var newObject = {}; 
  if (thing instanceof Array) { 
  return thing.map(function (i) { return clone(i, opts); }); 
  } else if (thing instanceof Date) { 
  return new Date(thing); 
  } else if (thing instanceof RegExp) { 
  return new RegExp(thing); 
  } else if (thing instanceof Function) { 
  return opts && opts.newFns ? new Function('return ' + thing.toString())() : thing; 
  } else if (thing instanceof Object) { 
  Object.keys(thing).forEach(function (key) { newObject[key] = clone(thing[key], opts); }); 
  return newObject; 
  } else if ([ undefined, null ].indexOf(thing) > -1) { 
  return thing; 
  } else { 
  if (thing.constructor.name === 'Symbol') { 
  return Symbol(thing.toString().replace(/^Symbol\(/, '').slice(0, -1)); 
  } 
  return thing.__proto__.constructor(thing); 
  } 
} 
// * ======================================================================================================


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

// ! глубокое копирование объекта (функции тоже копирует как совершенно новые)
console.log(myObj.level === JSON.parse(JSON.stringify(myObj)).level); //! не копирует объект Date вроде бы

