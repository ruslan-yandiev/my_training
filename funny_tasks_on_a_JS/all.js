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


