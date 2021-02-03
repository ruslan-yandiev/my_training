// // Физический перенос элемента от одного родителя другому
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
// ! отключил, так-как можно реализовать подобное на чистом html и css