let Component = (props) => {
    return '<h1>Hello</h1>';
};

function Component2(props) {
    return '<h1>Hello</h1>';
}

class Foobar {}
class Foobar2 {}

function fnbar() {
    number = 223;
}

const testStr = 'foobar';
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