function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;

    // возраст рассчитывается из текущей даты и дня рождения
    // ! один из способов устанавливать геттер и сеттер в конструкторе, да и любые свойства
    Object.defineProperty(this, 'age', {
        get() {
            return new Date().getFullYear() - this.birthday.getFullYear();
        },
    });
}

let john = new User('John', new Date(1992, 6, 1));

alert(john.birthday); // доступен как день рождения
alert(john.age); // ...так и возраст

// ! классовый аналог
class User2 {
    constructor(name, birthday) {
        this.name = name;
        this.birthday = birthday;
    }

    get age() {
        return new Date().getFullYear() - this.birthday.getFullYear();
    }
}

let john2 = new User2('John2', new Date(1992, 6, 1));

alert(john2.birthday); // доступен как день рождения
alert(john2.age); // ...так и возраст

// ============================================================================

function Score() {
    this.arr = [];
    this.one = 0;
    this.two = 0;

    Object.defineProperty(this, 'firstPlayerScore', {
        set(arg) {
            this.one = arg;
            this.arr.push({ firstPlayerScore: this.one, secondPlayerScore: this.two });
        },

        get() {
            return this.one;
        },
    });

    Object.defineProperty(this, 'secondPlayerScore', {
        set(arg) {
            this.two = arg;
            this.arr.push({ firstPlayerScore: this.one, secondPlayerScore: this.two });
        },

        get() {
            return this.two;
        },
    });

    this.getHistory = function () {
        return this.arr;
    };
}
const score = new Score();
score.firstPlayerScore = 1;
score.firstPlayerScore = 2;
score.secondPlayerScore = 1;
console.log(score.getHistory());
console.log(score.firstPlayerScore);
console.log(score.secondPlayerScore);
