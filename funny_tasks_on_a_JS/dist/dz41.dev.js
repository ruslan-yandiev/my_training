"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function User(name, birthday) {
  this.name = name;
  this.birthday = birthday; // возраст рассчитывается из текущей даты и дня рождения
  // ! один из способов устанавливать геттер и сеттер в конструкторе, да и любые свойства

  Object.defineProperty(this, 'age', {
    get: function get() {
      return new Date().getFullYear() - this.birthday.getFullYear();
    }
  });
}

var john = new User('John', new Date(1992, 6, 1));
alert(john.birthday); // доступен как день рождения

alert(john.age); // ...так и возраст
// ! классовый аналог

var User2 =
/*#__PURE__*/
function () {
  function User2(name, birthday) {
    _classCallCheck(this, User2);

    this.name = name;
    this.birthday = birthday;
  }

  _createClass(User2, [{
    key: "age",
    get: function get() {
      return new Date().getFullYear() - this.birthday.getFullYear();
    }
  }]);

  return User2;
}();

var john2 = new User2('John2', new Date(1992, 6, 1));
alert(john2.birthday); // доступен как день рождения

alert(john2.age); // ...так и возраст
// ============================================================================

function Score() {
  this.arr = [];
  this.one = 0;
  this.two = 0;
  Object.defineProperty(this, 'firstPlayerScore', {
    set: function set(arg) {
      this.one = arg;
      this.arr.push({
        firstPlayerScore: this.one,
        secondPlayerScore: this.two
      });
    },
    get: function get() {
      return this.one;
    }
  });
  Object.defineProperty(this, 'secondPlayerScore', {
    set: function set(arg) {
      this.two = arg;
      this.arr.push({
        firstPlayerScore: this.one,
        secondPlayerScore: this.two
      });
    },
    get: function get() {
      return this.two;
    }
  });

  this.getHistory = function () {
    return this.arr;
  };
}

var score = new Score();
score.firstPlayerScore = 1;
score.firstPlayerScore = 2;
score.secondPlayerScore = 1;
console.log(score.getHistory());
console.log(score.firstPlayerScore);
console.log(score.secondPlayerScore);