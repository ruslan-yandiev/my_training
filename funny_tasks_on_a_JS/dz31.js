/*
Прислал 👑A One👑 задача с реального собеседования, с англоязычного канала.

Задача:
1. Переписать на ES6.
2. Нужно вернуть значение из метода после 2-х секунд.
*/
var john = {
  name: 'John Doe',
  balance: 1500,
  deduct: function(amount) {
    this.balance = this.balance - amount;
    return this.name + ' has a balance of ' + this.balance;
  },
};

console.log(john.deduct(200));

const john2 = {
    name: 'John Doe',
    balance: 1500,
    deduct(amount) {
        this.balance = this.balance - amount;
        return `${this.name} has a balance of ${this.balance}`
    }
}

setTimeout(() => console.log(john2.deduct(200)), 2000);

// codesignal.com

const arr  = [1, 2, 3];
arr.__proto__['2'] = 55;

for (let elem of arr) console.log(elem);