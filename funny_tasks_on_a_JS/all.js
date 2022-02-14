/*
! Все функции-конструкторы, созданные с помощью 'new', будут иметь тип 'object'
var str = new String('String');
var num = new Number(100);

typeof str; // Вернёт 'object'
typeof num; // Вернёт 'object'

! Но существует исключение для конструктора Function

var func = new Function();

typeof func; // Вернёт 'function'

! Это было определено с рождения JavaScript
typeof null === 'object';

!Исключения
!Во всех текущих браузерах существует нестандартный host-объект document.all, который имеет тип Undefined.

typeof document.all === 'undefined';
*/
// *========================================================================================================
/*
! Все свойства(ключи) в объекте приводятся к строке.

! Объект сортирует свои свойства выставляя сначала положительные-целочисленные значение по возрастанию
! а затем выставит все остальные по порядку создания(добавления) в объект(е)
*/
let obj = {
    '2asd': '2asd',
    35: 35,
    333: 333,
    '90': 90,
    22: 22,
    '-1': -1,
    1: 1
}
console.log(Object.keys(obj));//['1', '22', '35', '90', '333' '2asd', '-1']
//* ========================================================================================================

// TODO Самый быстрый математический способ получить ближайшее целое число без остатка делящееся на 5
function round5(val) {
	// ! используя математический объект округлим деление числа val на 5, и умножаем на 5
	// математическая формула для получения ближайшего целого числа, можно и на 2, 3, 4...
	return Math.round(val/5)*5;
}

//* ========================================================================================================
const arr = [3, 7, 15, 18, 22, 47];
arr.sort(); // ! изменяет исходный массив всегда. отсортирует подефолту как строки по первому символу. исправить передав колбек с кодом arr.sort((a, b) => a > b) или arr.sort((a, b) => a - b);
console.log(arr); // [15, 18, 22, 3, 47, 7]
//* ========================================================================================================
/*
Карирование
*/
// ! Использовали ЗАМЫКАНИЯ. Возвращали новую функцию которая по очереди принимала параметры и
// ! плюсовала к счетчику currentValue в созданном нами замыкании(области видимости) КАРРИРОВАНИЕ
function add(num) {
    if (!num) return 0;

    return function f(number) {
        if (!number) return num;
        num += number;
        return f;
    }
}

console.log(add()); // 0
console.log(add(2)(1)()); // 3
console.log(add(5)(-1)(2)()); // 6

// ! рекурсивный вариант
function add(num) {
    if (num === undefined) return 0;

    return function(num2) {
        if (num2 === undefined) return num;
            num += num2;
            return add(num);
    };
}

console.log(add()); // 0
console.log(add(10)()); // 10
console.log(add(2)(1)()); // 3
console.log(add(5)(-1)(2)()); // 6
//* =======================================================================================================
/*
В функцию sumAge передается структура, в которой описан человек и его дети.
Функция должна возвращать сумму возрвста человека и сумму возрвстов всех его детей.
*/
function sumAge(user) {
    let sum = user.age;
    // !  (?) тут выполняет схожую работу как и в ruby не позволяя выбросить исключение если будет undefined
    for (let i = 0; i < user.children?.length; i++) {
        sum += sumAge(user.children[i]);
    }
    return sum;
}

// ! хорошее решение с рекурсией
const sumAge = (user) => user.children ? user.children.reduce((sum, child) => sum + sumAge(child), user.age) : user.age;

const user = {
    name: 'Петр',
    age: 49,
    children: [
        {
            name: 'Nina',
            age: 25,
            children: [
                {
                    name: 'Andray',
                    age: 3,
                },
                {
                    name: 'Oleg',
                    age: 1,
                },
            ],
        },
        {
            name: 'Aleksandr',
            age: 22,
        },
    ],
};

console.log(sumAge(user));
//* =====================================================================================================

const btn = document.getElementById("my-btn");

btn.addEventListener('click', () => {
    setTimeout(() => console.log('setTimeout 1'));
    Promise.resolve().then(() => console.log('Promise 1'));
    console.log('console.log 1');
});

btn.addEventListener('click', () => {
    setTimeout(() => console.log('setTimeout 2'));
    Promise.resolve().then(() => console.log('Promise 2'));
    console.log('console.log 2');
});

btn.click();
/*
При програмном вызове фугкций обработки событий btn.click() в консоль будет выведено:
console.log 1
console.log 2

Promise 1
Promise 2

setTimeout 1
setTimeout 2

console.log это просто код и он исполняется первым в порядке инициализации.
Сам же обрабодчик событий Это таска(макро таска) - которая выполняется последней после того как выпонятся все микро таски
Promise (зарезервреный resolve) - это как я понял микро таска выполняем его после всех console.log и любого обычного кода.
setTimeout это таска (макро таска) выполняется отдельно последними.

Если же мы в браузере кликним на кнопку, то в консоль уже выведится другой результат выполнения:
console.log 1
Promise 1

console.log 2
Promise 2

setTimeout 1
setTimeout 2

click - при клике через браузер эта таска (макро таска) будет выполняться сначала код в первой фынкции обработчика событий. console.log в просто код пойдет первым
на выполнение, затем выполнятся все микро таски  Promise 1 (зарезервреный resolve), а setTimeout 1 встанет в очередь на выполнение так как таска(макро таска).
Когда завершается Таска (макро таск) то выполняются все накомпленные микротаски (которые были инициализированны внутри него какя понял)
Затем начнется выполняться код во втором обработчике по той же схеме console.log 2 и затем промис Promise 2, а setTimeout 2 встанет в
очередь на исполнение за setTimeout 1 и начнут выполняться когда весь основной код и микро таски будут выполнены.
*/

//* =======================================================================================================================================
/*
? const array = [1, 2];
? что будет если массиву указать длину больше, чем элементов в нем array.length = 100
?     - Отвечаю, что массив заполнится элементами в значении undefined.


!Вообще говоря у элементов действительно будет значение undefined. Но в комментах была замечательная поправка: массив на самом деле заполнится пустыми ячейками, у которых уже будет значение undefined.
!Это важное отличие, потому что такие ячейки будут пропускаться в циклах map, forEach и т.д.

!А такой undefined пропущен не будет
!const array = [1, 2, undefined]; 
*/

//* ========================================================================================================================================

/*
    Если захотим удалить все элементы из массива или часть элементов отсекая их с конца, и оставить при это м тот же массив(объект) в ячейке памяти
    то:
    const arr = [1, 2, 3, 4, 5];
    arr.length = 2;
    console.log(arr) // [1, 2];
*/

//* ========================================================================================================================================

/*
    ! Декларативный или функциональный подход в программировании отвечает на вопрос: Что нужно сделать в рамках кода (что мы хотим сделать) (перебрать массив, отсортировать, вывести)
    ! Императивный подход отвечает в первую очередь на вопрос: как это нужно сделать (как именно перебираем массив контроль всего процесса перебора, как отсортировать его, как вывести)
*/
//* ========================================================================================================================================

/*
   ! CORS - Cross-Origin Resource Sharing (CORS) — механизм, использующий дополнительные HTTP-заголовки, чтобы дать возможность агенту пользователя получать разрешения на доступ к выбранным ресурсам с сервера на источнике (домене), отличном от того, что сайт использует в данный момент.
*/
//* ========================================================================================================================================

function func() {
    console.log(this);
}

const person = {
    name: 'Andray',
};

func.bind(person)(); // с помощью бинд принудительно задали контекст вызова функции в рамках объекта person, а не Window
func(); // контекст вызова  Window если не задан 'use strict' иначе undefined
const bindedFunct = func.bind(person); // забиндили контекст вызова функции и сохранили эту функцию с этим контекстом в новой переменной, для повторного использования
bindedFunct(); // контекст person

//* ========================================================================================================================================

/*
Реализовать метод sum
*/
// для любого созданного объекта массива в программе
Array.prototype.sum = function () {
    return this.reduce((accum, elem) => accum + elem);
};

const arr = [1, 2, 3, 4, 5];
const sum = arr.sum();
console.log(sum);

// только для одного массива arr
arr.sum2 = function () {
    return this.reduce((accum, elem) => accum + elem);
};
const sum2 = arr.sum2();
console.log(sum2);
const arr2 = [1, 2, 3, 4, 5];
console.log(arr2.sum()); // 15
// console.log(arr2.sum2()); //  arr2.sum2 is not a function

//* ========================================================================================================================================


/*
	* 1) shadow-dom - это у элемента может быть свой теневой дом в котором есть свои div и стили которые не выходят за приделы этого элемента
		* это веб технология для определения области видимости переменных css и веб компонентов

	* 2) LIFO и FIFO - LIFO(последний пришел, первый ушел (СТЕК)) когда вызываем функцию, внутри нее вызываем другую функцию и в нутри нее вызываем другую функцию, то вызовы будут изнутри на ружу
		*    FIFO(первый пришел, первый ушел (ОЧЕРЕДЬ)) класитческая очередь f1().f2().f3() f1 первый вернет результат выполнения и далее по очереди.

	* 3) Что такое полифилл - помогает сделать нам доступные свойства для разных браузеров.

	* 4) Что такое CDN - это специальный сервер который используется для уменьшения времени загрузки данных. На пример загрузка гугл шрифтов, если на пример клиент очень далеко от основного сервера
		* то сервер может перенаправить клиента для загрузки крупных данных на ближайший к клиенту CDN сервер и подгружать эти данные к клиенту с него.

	* 5) Web-worker - это фактически полноценный отдельный поток помогающий загружать или выполнять какуюто работу (сложные вещи) в браузере в реальном времени не подвисая страницу.
		* это отдельный скрипт запускаемый в отдельном потоке, на заднем фоне не тормозястраницу и работает на заднем плане.

    * 6) IIFE (Immeiate Invoked Function Expression) - Функция которая при инициализации немедленно выполнятся (Function(arg,...){....})(arg,...);
*/

//* ========================================================================================================================================

/*
	*1) Тег datalist позволяет создать список автодополнения

	*2) Мы js скрипты в html обычно подключаем в body, но есть вариант подключить в head
		* такие скрипты с атрибутами в теге как async и defer
		* async позволит паралельно подгрузать js скрипты в отдельном потоке вместе с html и исполнять его прогруженную чать
		* defer подгружает скрипт в паралельном потоке, но скрипт будет исполняться только после полной его загрузки и втом порядке котором мы указали вне зависимости кто первый загрузится

	*3) Object.freeze(obj) - заморозит объект и его никогда нельзя будет изменить
*/

//* ========================================================================================================================================

/*
 ! Дескрипторы свойств, присутствующие в объектах, бывают двух основных типов: дескрипторы данных и дескрипторы доступа. 
 ! Дескриптор данных — это свойство, имеющее значение, которое может быть (а может и не быть) записываемым. 
 ! Дескриптор доступа — это свойство, описываемое парой функций — геттером и сеттером.
*/

//* ========================================================================================================================================

/*
    * '1 a-г ***    (...333'.replace(/[^а-я]+/g, '') 'aг' // вс что не от а до я мы убираем (заменяем на пустую строку-убираем)
*/

//* ========================================================================================================================================

// выведите 1, если первый аргумент есть, и 0 - если нет
function f(x) {
	return arguments.length ? 1 : 0
}

console.log(f(undefined)); // 1
console.log(f()); // 0

// Напишите функцию sum(...), которая возвращает сумму всех своих аргументов:
function sum(a) {
	if (!arguments.length) return 0
	return Array.from(arguments).reduce((acc, el) => acc + el);
}

console.log(sum())// 0
console.log(sum(1)) // 1
console.log(sum(1, 2)) // 2
console.log(sum(1, 2, 3)) // 6
console.log(sum(1, 2, 3, 4)) // 10

//* ========================================================================================================================================

/*
	* 1) zz = 99 // при 'use strict' будет ошибка, а иначе будет присвоено глобальному window.zz = 99
		* console.log(zz);
	
	* 2) Какой селектор использовать для выбора input'ов с типом radio? - input[type="radio"] можем по присваивать стили как всем тегам так и отсеять по одному из атрибутов

	* 3) Спрайты, что это такое? - Когда есть к примеру множество картинок смайликов и для оптимизации загрузки
		* объединим картинки в одну большую картинку из множества смайлов и стилями выберем нужный нам смайл по пикселям

	* 4) Как получить url в чистом javascript? - а) document.URL   b) window.location.href

	* 5)  Что такое IIFE? - когда делаем самовызывающуюся функцию обернув ее (код функции)() и ее самовызов.

	* 6) package-lock.json для чего он нужен? - при работе с npm, будет хранить все покеты версий которые мы подтягивали
		* чтобы при командной разработки можно будет согласовать одни и те же версии библиотек
		* То есть хранин все версии подтянутых библиотек и все зовисимости между друг другом
*/

//* ========================================================================================================================================

Math.floor(Math.random() * 10) + 1; //! случайное целое число от минимального включительно и до максимального включительно от 1 до 10

//* ========================================================================================================================================

/*
    * 1) placeholder-shown псевдокласс, для чего он? - когда виден placeholder он показывает или подсвечивает нужным цветом если бэеграунд задан, а когда начинаем заполнять поле, то исчезает

    * 2)  1 < 2 < 3 // true;  3 > 2 > 1 false; - потому что (true) преобрауется в (1) а (false) в (0)
*/

//* ========================================================================================================================================

/*
В JS есть два вида свойств.
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

//* ========================================================================================================================================

/*
 * 1) JWT (правильно - JSON Web Token, а я назвал JavaScript Web Token'ом, виноват  - что это?
 * Это не хэш токена, там хэшируется только сумма (чтобы сервер мог свериться с с суммой и подтвердить
 * что не было подмены токена), но при этом он в себе хранит обычные данные, например id пользователя,
 * имя или что-то еще (что захочешь) и эти данные не захешированы, по сути их любой может получить и прочитать.
 * Суть в том, что используя такой токен на стороне сервера не нужно будет лезть в БД для проверки этого токена, достаточно
 * просто проверить сумму, это очень удобно при использовании микросервисов.

 *  2) Чем отличаются односвязный список и двусвязный список? тем, что односвязный хранит в ячейке данне и информацию о месте нахождения следующей ячейке в списке,
        * а если следующей нет то хранит просто сами данные и NULL вместо адреса следующей.
        * Двусвязный список все тоже самое что односвязные, плюс хранит информацию о месте нахождения предыдущей ячейки памяти и если предыдущей нет то будет адрес будет NULL

 * 3) Сервис Воркеры в JS - В идеале, правильная организация взаимодействия приложения с сервис-воркером и кэшем позволит пользователю нормально работать с приложением даже без подключения к сети.
 *          В целом можно сказать, что сервис-воркеры — это разновидность веб-воркеров, а если точнее, то они похожи на разделяемые воркеры. 
 *          В частности, можно выделить следующие важные особенности сервис-воркеров:

 *           Они выполняются в собственном глобальном контексте, ServiceWorkerGlobalScope.
 *           Они не привязаны к конкретной странице.
 *           Они не имеют доступа к DOM.

 *           Особого внимания API сервис-воркеров заслуживает по той причине, что оно позволяет приложениям поддерживать оффлайновые сценарии работы, давая программисту полный контроль над тем, как приложение взаимодействует с внешними ресурсами.
 *           Более подробно:  https://developer.mozilla.org/ru/docs/Web/API/Cache
*/

//* ========================================================================================================================================

for (var i = 0; i < 10; ++i) {
    setTimeout(() => console.log(i), 1000);
} // через секунду вернет 10 десяток, так как var имеет функуиональную область видимости и всплывет иницализировавшить в undefided

for (let i = 0; i < 10; ++i) {
    setTimeout(() => console.log(i), 1000);
} // секунду выведит цифры от 0 до 9, так как let имеет блочную область видимости и будет инициализироваться при каждом
// проходжении цикла. То есть let будет объявленно для конкретного замыкания(области видимости исключительно для цикла)

//* ========================================================================================================================================

/*
    * 1) Вопрос про margin и flex - если родителю задан flex, то у первого дочернего элемента margin bottom 10px и следующего
        * дочернего элемента с значением margin top 20px значения внешних отступов сложатся и растояние между ними будет 30px.
        * Если же у родителя не задан flex то  marginы схлопнутся наехав один на другой и растояние между дочерними элементами будет 20px.

    * 2) Как проверить что в переменной массив? Вызвать Array.isArray(передать переменныю для проверки)

    * 3) Как проверить что в объекте есть свойство? {наш объект}.hasOwnProperty('asd') - вернет true если есть такое зсвойство(ключ) ищет свойство только у этого объекта и не лезет в прототип
        * "asd" in {наш объект}  - вернет истину или лож, будет искать свойство(ключ) и в самом объекте и всех прототипах по цепочке наследования.
        * Третий способ: Object.keys(object).includes('key')
*/

//* ========================================================================================================================================

function f() {
    console.log('Hi Ruslan');
}

window.f(); // Hi Ruslan
new f;      // Hi Ruslan
f();        // Hi Ruslan

//* ========================================================================================================================================

/*
    ? 1) HOC в реакте использовал?
        * HOC это элемент который возвращает другой элемент немного переделанный(тоесть он оборачивает, как дикоратор функция)
    
    ? 2) Для чего ставим ключи в реакте при выводе списка?
        * могут быть ошибки и проблемы если не поставить ключи
    
    ? 3) Как сообщить о том что у пользователя выключен JavaScript?
        * В HTML есть тег <noscript>Вруби JS утырок!!!</noscript> 

    ? 4) Какие дескрипторы для свойств объектов есть?
        * get, set, readable, writable, configurable

    ? 5) Что такое функции-генераторы? (function* a {yield "Привет"; yield "Пока";})
        * Обычные функции возвращают только одно-единственное значение (или ничего).
        * Генераторы могут порождать (yield) множество значений одно за другим, 
        * по мере необходимости. Генераторы отлично работают с перебираемыми объектами 
        * и позволяют легко создавать потоки данных.
        * Функции-генераторы ведут себя не так, как обычные. 
        * Когда такая функция вызвана, она не выполняет свой код. 
        * Вместо этого она возвращает специальный объект, так называемый «генератор», 
        * для управления её выполнением.
        * Подробнее о генераторе: https://learn.javascript.ru/generators

    ? 4) Какие группы ответов в http, за что отвечают?
        * Имеется группа ответов о статусе 200, 201, 400, 404, 403, 500 ....
    
    ? 4) Про паттерны.т?
        * Одиночка, стратегия, фабрики, абстрактные фабрики, дикораторы (адаптор) 
*/

//* ========================================================================================================================================

let a;
console.log(a); // undefined
console.log(b); // not defined 

//* ========================================================================================================================================

/*
Дан массив вида `[1, 2, [3,4,[5]], 6, 7, [[8]]]`, необходимо получить массив
без вложенных массивов, то есть: `[1, 2, 3, 4, 5, 6, 7, 8]`.
*/
let arr = [1, 2, [3, 4, [5]], 6, 7, [[8]]];

// решение 1
function compact(arr) {
	return [...[].concat.apply([], arr).join('')].map(e => +e);
}

console.log(compact(arr));

//! решение 5
function compact(arr) {
    return arr.reduce((acc, el) => {
        Array.isArray(el) ? acc.push(...compact(el)) : acc.push(el);
        return acc
    }, [])
}

console.log(compact(arr));

// решение 2
function compact2(arr) {
	const newArr = [];

	function extractElement(arg) {
		for (let i = 0; i < arg.length; i++) {
			if (Array.isArray(arg[i])) {
				extractElement(arg[i]);
			} else {
				newArr.push(arg[i]);
			}
		}
		return newArr;
	}

	return extractElement(arr);
}

console.log(compact2(arr));

//! решение 3
function compact3(arr) {
	return arr.flat(Infinity);
}

console.log(compact3(arr));

// решение 4
function compact4(arr) {
	return arr.toString().split(",").map(x => +x);
}

console.log(compact4(arr));

//* ========================================================================================================================================

