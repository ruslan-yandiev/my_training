let Component = (props) => {
  return "<h1>Hello</h1>";
};

function Component2(props) {
  return "<h1>Hello</h1>";
}

class Foobar {}
class Foobar2 {}

function fnbar() {
  number = 223;
}

const testStr = "foobar";
// ! только у функций конструкторов(классов) есть свой объект прототипа object.prototype
console.log(Component.prototype === Function.prototype);
console.log(Component.__proto__ === Function.prototype);
console.log(Component2.prototype === Function.prototype);
console.log(Foobar.__proto__ === Function.prototype);
console.log(Foobar.__proto__ === fnbar.__proto__);
console.log(Function.__proto__.prototype === fnbar.__proto__.prototype);
console.log(testStr.__proto__ === Object.prototype);
console.log(testStr.prototype === String.prototype);
console.log(testStr.__proto__ === String.prototype);
console.log(Foobar.prototype.prototype === testStr.prototype);
console.log(Foobar.prototype === Object.prototype);
console.log(Foobar.__proto__ === Foobar2.__proto__);
console.log(Foobar.__proto__.__proto__ === Foobar2.__proto__.__proto__);
console.log(Foobar.__proto__.__proto__.__proto__ === Foobar2.__proto__.__proto__.__proto__);
class F {}
console.log(F.__proto__ === Function.prototype);

const obj = {};
const obj2 = Object.create;
const obj3 = Object.create(null);
const obj4 = new Object();
console.log(obj2.__proto__ === Object.__proto__); //! true     ƒ () { [native code] } === ƒ () { [native code] }
// ! Мы не можем вывести код JS функции в консоль, потому что функции являются частью скомпилированного исполняемого файла браузера ... или, скорее, его движка JavaScript. Это нативный код.
console.log(Object.__proto__); // ƒ () { [native code] } //! базовая конструкция функции в доичном коде, нет смысла отображать двочиный код во и пишет ƒ () { [native code] }
console.log(obj3.__proto__ === Object.__proto__); // false
console.log(obj3.__proto__); // undefined
console.log(Object.prototype.__proto__); // null

// ======================================================================================

function F1() {}
F1.__proto__.name1 = "Ruslan";
console.log(F1.name1); //Ruslan
Function.prototype.name2 = "Ruslan2"; // и на чтение и на запись
console.log(F1.name2); // Ruslan2

function F2() {}
console.log(F2.name1); //Ruslan
console.log(F2.name2); // Ruslan2

// ============================================================================================================================

function A() {
  this.a = 1;
  this.b = {
    c: 2,
  };
}

A.prototype = {
  a: 200,
  b: {
    c: 500,
  },
};

const myA = new A();

console.log(myA); // {a: 1, b: {c: 2}} //! все равно в экземпляр передались при создании определенные в теле функции свойства.
console.log(myA.__proto__); // {a: 200, b: {c: 500}} // ! однако A.prototype теперь другой и будет {a: 200, b: {c: 500}}

delete myA.a; // Удалим свойство а у экземпляра
console.log(myA.a); // 200  //! не найдя у себя свойство (а), объект по __proro__ вызовет свойство (а) у объекта конструктора(родителя) A.prototype

delete myA.a; // Удалить так свойство у A.prototype не получится.
console.log(myA.a); // 200

delete myA.__proto__.a; // а так получится )))
console.log(myA.a); // undefined

/*
  !  То есть конструктор или класс (объект) имеющий возможность создавать свои экземпляры, сначала передает своему экземпляру методы и свойства
  !  определенные (инициализированные) в его коде (теле), а только затем ставит экземпляру в качетве родителя сылку ...__proto__
  !  Откуда экземпляр может использовать методы и свойства которых у него нет.
  !  Если JS не находит нужное свойство и метод в самом экземпляре, он лезет выше по линии наследования по ссылке __proto__ и так до Object.prototype
  !  Удалить у объекта можно только то свойство которое вызвано (имеется) напрямую у объекта, а не полученное по наследству от родителя. Ну или удалить у родителя напрямую через delete экземпляр.__proto__.a или delete Родител.prototype.a
*/

// * ====================================================================
const newObj = Object.create(
  {},
  {
    name: {
      value: "Ruslan",
      enumerable: true,
      writable: true,
    },

    age: {
      value: 36,
      enumerable: true,
    },

    text: {
      value:
        "Мы не сможем это свойство итерировать, перезаписать или удалить из-за дискриптеров, подефолту находящитхся в false (enumerable: false, writable: false ....)",
    },

    sayName: {
      letter: ".....",

      get() {
        return this.name;
      },

      set(arg) {
        this.name = arg;
      },
    },
  }
);

console.log(Object.keys(newObj)); // ['name', 'age']
console.log(newObj.text); // "Мы не сможем это свойство итерировать, перезаписать или удалить из-за дискриптеров, подефолту находящитхся в false (enumerable: false, writable: false ....)
console.log(newObj.sayName); // Ruslan
newObj.sayName = "Sultan";
console.log(newObj.sayName); // Sultan
newObj.name = "Toma";
console.log(newObj.sayName); // Toma
