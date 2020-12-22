// благодаря галпу сможем собирать файлы (плагин include) без использования JS модулей
@@include('utelit.js');

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
});
