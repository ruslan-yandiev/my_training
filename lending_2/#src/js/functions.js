// var ua = window.navigator.userAgent;
// var msie = ua.indexOf('MSIE ');
// var isMobile = {
//     Android() {
//         return navigator.userAgent.match(/Android/i);
//     },
// };

// function isIE() {
//     ua = navigator.userAgent;
//     var is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
//     return is_ie;
// }

// if (isIE()) {
//     document.querySelector('body').classList.add('ie');
// }

// if (isMobile.any()) {
//     document.querySelector('body').classList.add('touch');
// }

// function testWebP(callback) {
//     var webP = new Image();
//     webP.onload = webP.onerror = function () {
//         callback(webP.height == 2);
//     };
//     webP.src = 'data:image/webp;base64,UklGRjo и чтото еще хз';
// }

// testWebP(function (support) {
//     if (support == true) {
//         document.querySelector('body').classList.add('webp');
//     }
// });

///.................................

// // ActionsOnHash
// if (location.hash) {
//     var hsh = location.hash.replace('#', '');

//     if (document.querySelector('.popup' + hsh)) {
//         popup_open(hsh);
//     } else if (document.querySelector('div.' + hsh)) {
//         Geolocation(document.querySelector('.' + hsh), 500, '');
//     }
// }
// // =======================

// //Menu
// let iconMenu = document.querySelector('.icon-menu');
// if (iconMenu != null) {
//     let delay = 500;
//     let body = document.querySelector('body');
//     let menuBody = document.querySelector('.menu__body');

//     iconMenu.addEventListener('click', () => {
//         if (body.classList.contains('_wait')) {
//             body_lock(delay); // ??????
//             iconMenu.classList.toggle('_active');
//             menuBody.classList.toggle('_active');
//         }
//     });
// }
// // ????????
// function menu_close() {
//     document.querySelector('.icon-menu').classList.remove('_active');
//     document.querySelector('.menu_body').classList.remove('_active');
// }
