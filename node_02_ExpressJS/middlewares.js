import colors from 'colors';

/* 
! Главное правило в мидлверах то, что эти функции вызываются последовательно
! и для того, чтобы express понял, что какаято мидлверФункция закончила свою работу
! и необходимо вызывать другой мидлверФункцию, для этого нам и необходим третий параметр next 
! В мидлверах можно реализовывать любой функционал который мы захотим
*/
export function requestTime(request, response, next) {
    request.requestTime = Date.now();

    // фуекция котороя говорит express, что заканчиваем и идим к следующему мидлверу
    next();
}

export function logger(request, response, next) {
    console.log(colors.bgGreen.black(`Request.time: ${request.requestTime}`));
    next();
}
