// благодаря галпу сможем собирать файлы (плагин include) без использования JS модулей
// ! Функция проверяет поддерживает ли браузер формат webp и если да то присваивает эедементу body  css класс webp
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});
;
// // // Физический перенос элемента от одного родителя другому
// (function() {
//     action();

//     window.addEventListener("resize", throttler, false);
    
//     let detectTimeout;

//     function throttler() {

//         // игнорировать события изменения размера, пока в очереди находится фактическое выполнение action.
//         if ( !detectTimeout ) {
//             action(); // выполнится сразу, затем задержка
//             detectTimeout = setTimeout(() => {
//             detectTimeout = null;
//             // action(); // выполнится после задержки
//             }, 55);
//         }
//     }

//     function action() {
//         let region = document.querySelector('.actions-header__region');
//         let menuBody = document.querySelector('.menu__body');
//         let actionsHeader = document.querySelector('.actions-header');

//         document.documentElement.clientWidth < 768 ? menuBody.append(region) : actionsHeader.prepend(region);
//     }
    
// }());
// ! отключил, так-как можно реализовать подобное на чистом html и css;

// ! Всплывающее меню 1
document.querySelector('.user-header__icon').addEventListener('click', () => {
    // ? Свойство classList возвращает псевдомассив DOMTokenList, содержащий все классы элемента. https://developer.mozilla.org/ru/docs/Web/API/Element/classList
    // ? У classList есть примитивная альтернатива - свойство className, которое содержит значение атрибута class элемента.
    // ? ClassList является геттером. Возвращаемый им объект имеет несколько методов:
    //      add( String [,String] ) Добавляет элементу указанные классы
    //      remove( String [,String] ) Удаляет у элемента указанные классы
    //      item ( Number ) Результат аналогичен вызову сlassList[Number]
    //    ? toggle ( String [, Boolean]) Если класс у элемента отсутствует - добавляет, иначе - убирает. Когда вторым параметром передано false - удаляет указанный класс, а если true - добавляет.
    //                                 ? Если вторым параметром передан undefined или переменная с typeof == 'undefined', поведение будет аналогичным передаче только первого параметра при вызове toggle.
    //      contains ( String ) Проверяет, есть ли данный класс у элемента (вернет true или false)
    //      length возвращает количество классов у элемента.
    document.querySelector('.user-header__menu').classList.toggle('_active');

    // Скроем бургер меню при появлении меню 1
    document.querySelector('.menu__body').classList.toggle('_active', false);
    // удалим у кнопки бургер меню класс _active, что позволит из крестика превратить обратно в бургер.
    document.querySelector('.icon-menu').classList.toggle('_active', false);
    // удалим блокировку со скрола контента
    document.querySelector('body').classList.toggle('_lock', false);
});

// ! Закрытие меню 1 при нажетии любого места экрана кроме меню
document.addEventListener('click', (e) => {
    if (e.target.offsetParent.parentElement.classList[1] !== 'user-header') {
        // удалим класс _active у элемента(тега)
        document
            .querySelector('.user-header__menu')
            .classList.toggle('_active', false);
    }

    // // ! такой вариант тоже работает
    // if (!e.target.closest('.user-header')) {
    //     // удалим класс _active у элемента(тега)
    //     document
    //         .querySelector('.user-header__menu')
    //         .classList.remove('_active');
    // }
});

// ! Всплывающее меню (бургера)
const iconMenu = document.querySelector('.icon-menu');
iconMenu.addEventListener('click', () => {
    iconMenu.classList.toggle('_active');
    document.querySelector('.menu__body').classList.toggle('_active');
    // ! при клике будет блокировка скрола(прокрутки основного контента), при повторном нажатии клас _lock удалится и блокировка пропадет
    document.querySelector('body').classList.toggle('_lock');
});

(function () {
    start();

    window.addEventListener('resize', timer, false);

    let detect;

    function timer() {
        if (!detect) {
            detect = setTimeout(() => {
                start();
                detect = null;
            }, 1000)
        }
    }

    function start() {
        console.log('HI');
    }
})();

