/*
Результатом декоратора debounce(f, ms) должна быть обёртка, 
которая передаёт вызов f не более одного раза в ms миллисекунд. 
Другими словами, когда мы вызываем debounce, 
это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.

На практике debounce полезен для функций, которые получают/обновляют данные, 
и мы знаем, что повторный вызов в течение короткого промежутка времени не даст ничего нового. 
Так что лучше не тратить на него ресурсы.
*/
// function debounce(f, ms) {
//   let detect = true;

// const { relativeTimeRounding } = require("moment");

//   return function (arg) {
//     if (detect) {
//       f(arg);
//       detect = false;
//     }

//     setTimeout(() => (detect = true), ms);
//   };
// }

// let f = debounce(console.log, 1000);

// f(1); // выполняется немедленно
// f(2); // проигнорирован

// setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout(() => f(4), 1100); // выполняется
// setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
// setTimeout(() => f(6), 2300); // выполняется

//* =======================================================================================================================

//! 39
// const video = {
//   title: 'title',
//   tags: ['a', 'b', 'c'],
//   showTags() {
//     this.tags.forEach((tag) => {
//       console.log(this.title, tag);
//     });
//   }
// }

// video.showTags();
//* =======================================================================================================================
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
