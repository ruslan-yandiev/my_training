/*
Сравнить объекты с учетом вложенности.
*/
// ! Плохое решение
function deepEqual(f, s) {
  let result = true;

  function check(first, second) {
    if (typeof first !== typeof second) {
      result = false;
      return;
    }

    if (first !== null && second !== null && typeof first === "object") {
      if (Object.keys(first).length !== Object.keys(second).length) {
        result = false;
        return;
      }

      for (let key in first) {
        if (typeof first[key] === typeof second[key]) {
          if (first[key] !== null && second[key] !== null && typeof first[key] === "object") {
            check(first[key], second[key]);
          } else if (!Number.isNaN(first[key]) && !Number.isNaN(second[key]) && first[key] !== second[key]) {
            result = false;
            return;
          }
        } else {
          result = false;
          return;
        }
      }
    } else if (!Number.isNaN(first) && !Number.isNaN(second) && first !== second) {
      result = false;
      return;
    }
  }

  check(f, s);

  return result;
}

const firstObject = {
  a: {
    b: {
      c: 1,
      d: "string",
      e: {
        num: 1,
      },
    },
  },
};

const secondObject = {
  a: {
    b: {
      e: {
        num: 1,
      },
      d: "string",
      c: 1,
    },
  },
};

const a = {
  name: "Misha",
  order: {
    price: 20,
    count: 1,
    taxes: { vat: { name: "vat", amount: { uah: 10, usd: 0.37 } } },
    total: { withoutTaxes: { uah: 20, usd: 0.74 }, withTaxes: { vat: { uah: 30, usd: 1.11 } } },
  },
};
const b = {
  name: "Misha",
  order: {
    price: 20,
    count: 1,
    taxes: { vat: { name: "vat", amount: { uah: 10, usd: 0.37 } } },
    total: { withoutTaxes: { uah: 20, usd: 0.74 }, withTaxes: { vat: { uah: 30, usd: 1.11, eur: null } } },
  },
};

const c = { cc: 1, dd: { cc: { cc: 1, dd: 2 } } };
const d = { cc: 1, dd: { cc: { cc: 1, dd: 2, ee: 3 } } };

const e = { cc: 1, dd: { cc: { cc: 1, dd: 2 }, a: { a: {} } } };
const f = { cc: 1, dd: { cc: { cc: 1, dd: 2 }, a: { a: {}, b: 1 } } };

const g = { a: { a: NaN } };
const h = { a: { a: NaN } };

console.log(deepEqual(firstObject, secondObject)); // true
console.log(deepEqual({ a: 1, b: 3 }, { b: 2, a: 1 })); // false
console.log(deepEqual(1, 2)); // false
console.log(deepEqual(true, false)); // false
console.log(deepEqual(null, null)); // true
console.log(deepEqual(null, 1)); // false
console.log(deepEqual({}, null)); // false
console.log(deepEqual(c, d)); // false
console.log(deepEqual(e, f)); // false
console.log(deepEqual(a, b)); // false
console.log(deepEqual(3, 3)); // true
console.log(deepEqual(NaN, NaN)); // true
console.log(deepEqual(g, h)); // true
// =========================================================================================================

// ! Лучшее решение
function deepEqual(a, b) {
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a !== "object" || a === null || b === null) {
    return a === b;
  }

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (const key of Object.keys(a)) {
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

console.log(deepEqual(firstObject, secondObject)); // true
console.log(deepEqual({ a: 1, b: 3 }, { b: 2, a: 1 })); // false
console.log(deepEqual(1, 2)); // false
console.log(deepEqual(true, false)); // false
console.log(deepEqual(null, null)); // true
console.log(deepEqual(null, 1)); // false
console.log(deepEqual({}, null)); // false
console.log(deepEqual(c, d)); // false
console.log(deepEqual(e, f)); // false
console.log(deepEqual(a, b)); // false
console.log(deepEqual(3, 3)); // true
console.log(deepEqual(NaN, NaN)); // true
console.log(deepEqual(g, h)); // true
// * =================================================================================
/*
years = Math.floor(t / (1000 * 60 * 60 * 24 * 30 * 12)),
months = Math.floor(t / (1000 * 60 * 60 * 24 * 30) % 12),
days = Math.floor(t / (1000 * 60 * 60 * 24) % 30),
hours = Math.floor((t / (1000 * 60 * 60)) % 24),
minutes = Math.floor((t / (1000 * 60)) % 60),
seconds = Math.floor((t / 1000) % 60);
*/

function getDaysBetweenDates(date1, date2) {
  if (arguments.length < 2) throw new Error("Пустой аргумент функции");

  date1 = Date.parse(new Date(date1));
  date2 = Date.parse(new Date(date2));

  if (!date1 || !date2 || date1 < 0 || date2 < 0) return NaN;

  const result = date2 > date1 ? date2 - date1 : date1 - date2;

  return Math.floor(result / (86400 * 1000));
}

console.log(Date.parse(null));
console.log(getDaysBetweenDates("1-1-2020", "1-2-2020")); // 1
console.log(getDaysBetweenDates(new Date(2011, 6, 2, 6, 0), new Date(2012, 6, 2, 6, 0))); // 366
console.log(getDaysBetweenDates(1409796000000, 1409925600000)); // 1

//* =======================================================================================================================
