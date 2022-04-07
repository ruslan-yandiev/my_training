/*
 в JS есть два вида свойств.
Первые обычные свойства, вторые свойства ассессоры.
У обычных свойств(ключей) имеются 4 дескриптора: ("value": 'тут должно быть значение в виде примитива или объектного типа---функции, объекты, массивы....', 
"writable":  true или false (по умолчанию true что позволит перезаписывать значение свойства. соответственно false запретит делать перезапись ив строгом режиме выбросит исключение, а не в строгом просто проигнорирует операцию нового присвоения),  
"enumerable": true или false (по умолчанию true, что позволяет перебирать свойство в цикле и false не позволит этого),  
"configurable": true или false (изначально ture, что позволяет нам удалять свойство, если установить false то обратной дороги не будет, свойство уже будет навсегда неизменным и 
специальными методами Object.defineProperty() нам уже никак не изменить свойство вообще, практически аналог заморозки свойства объекта)ю
У свойств объекта Ассесоров имеются 4 дескриптора: функция get (которая возвращает значение), функция set (которая принимает один аргумент и возвращает undefined), "enumerable": (работает аналогично для обоих видов свойств), 
"configurable":  (работает аналогично для обоих видов свойств), дескриптора значения у свойства ассесора нет.
Для того, чтобы установить свойства ассесоры для экземпляра функции конструктора необходимо пользоваться спектральными методами:  Object.defineProperty() и Object.defineProperties()-позволяет определить множество свойств сразу()
Чтобы получить все дескрипторы свойств сразу, можно воспользоваться методом Object.getOwnPropertyDescriptors(obj).
Для классов все упрощено и можно устанавливать геттеры и сеттеры сразу прописав get name() {....}
Впрочем геттеры и сеттеры можно заменить на простые методы, но придется делать вызов функции и задавать условие. что если значение аргумента не передано то провести операцию по возврату значения, 
а если значение аргумента при вызове функции передано то провести операцию set и вернуть undefined. Думаю это имитируется поведение геттера и сеттера с использованием одного имени метода экземпляра класса, 
но такой подход не верный с точки зрения SOLID так как нарушается принцип единственной обязанности функции.
*/

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


// ==================================================================================
function Score() {
    this.collection = [];
    this.ferst = 0, this.second = 0;

    this.add = function() {
        this.collection.push({ferstPlayerScore: this.ferst, secondPlayerScore: this.second})
    };

    this.getHistory = function() {
        return this.collection;
    }

    Object.defineProperties(this, {
        'ferstPlayerScore': {
            get: function() {
                return this.ferst;
            },

            set: function(num) {
                this.ferst = num;
                this.add();
            }
        },

        'secondPlayerScore': {
            get() {
                return this.second;
            },

            set(num) {
                this.second = num;
                this.add();
            }
        }
    })
}

const score = new Score();

score.ferstPlayerScore = 1;
score.ferstPlayerScore = 2;
score.secondPlayerScore = 1;

console.log(score.ferstPlayerScore);
console.log(score.secondPlayerScore);

console.log(score.getHistory());
//* ==============================================================================================================

class Developer {
    constructor(name, skills, favoriteFramework) {
        this.name = name;
        this.skills = skills;
        this.favoriteFramework = favoriteFramework;
    }
}

class DeveloperBuilder {
    constructor(name) {
        this.name = name;
        this.skills = [];
        this.favoriteFramework;
    }

    addSkill(skill) {
        this.skills.push(skill);
        return this;
    }

    setFavoriteFramework(framework) {
        this.favoriteFramework = framework;
        return this;
    }

    build() {
        let dev = new Developer(this.name, [...this.skills], this.favoriteFramework);
        this.skills.length = 0;
        return dev;
    }
}

const developer = new DeveloperBuilder('Павел').addSkill('ES6').addSkill('TypeScript').setFavoriteFramework('React');
console.log(developer.build());

const dev2 = developer.addSkill('ES9').addSkill('NodeJS').setFavoriteFramework('Vue js').build()
dev2.name = 'Ivan';
console.log(dev2);

// ====================================================
function Developer(name, skills, favoriteFramework) {
    this.name = name;
    this.skills = skills;
    this.favoriteFramework = favoriteFramework;
}

function DeveloperBuilder(name) {
    this.name = name;
    this.skills = [];
    this.favoriteFramework;

    this.addSkill = function(skill) {
        this.skills.push(skill);
        return this;
    }

    this.setFavoriteFramework = function(framework) {
        this.favoriteFramework = framework;
        return this;
    }

    this.build = function() {
        let dev = new Developer(this.name, [...this.skills], this.favoriteFramework);
        this.skills.length = 0;
        return dev;
    }
}

const developer = new DeveloperBuilder('Павел').addSkill('ES6').addSkill('TypeScript').setFavoriteFramework('React');
console.log(developer.build());

const dev2 = developer.addSkill('ES9').addSkill('NodeJS').setFavoriteFramework('Vue js').build()
dev2.name = 'Ivan';
console.log(dev2);